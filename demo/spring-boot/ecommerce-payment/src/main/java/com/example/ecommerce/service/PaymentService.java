package com.example.ecommerce.service;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.payment.RazorpayGateway;
import com.example.ecommerce.repository.*;
import com.fasterxml.jackson.databind.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import java.time.Instant;
import java.util.*;

@Service
public class PaymentService {
    private final OrderService store;
    private final RazorpayGateway gateway;
    private final WebhookEventRepository events;
    private final ObjectMapper mapper;
    private final TransactionTemplate tx;

    public PaymentService(OrderService s, RazorpayGateway g, WebhookEventRepository e, ObjectMapper m, TransactionTemplate tx) {
        store = s;
        gateway = g;
        events = e;
        mapper = m;
        this.tx = tx;
    }

    public Order initiate(User user, String token, String address) {
        OrderService.Initiation init = store.reserve(user, token, address);
        Order o = init.order();
        if (!init.created())
            return o;
        try {
            return attach(o.id, gateway.createOrder(o.totalMinorUnits, receipt(o)));
        } catch (Exception ex) {
            tx.executeWithoutResult(t -> {
                Order locked = store.orders.lockById(o.id).orElseThrow();
                if (locked.gatewayOrderId == null) {
                    locked.status = "INITIATION_UNKNOWN";
                    store.orders.save(locked);
                    store.audit(o.id, "GATEWAY", "Order creation outcome unconfirmed. Reconcile before retrying.");
                }
            });
            return store.orders.findById(o.id).orElseThrow();
        }
    }

    private static String receipt(Order order) {
        return "ff_" + order.requestToken;
    }

    private Order attach(Long id, JsonNode remote) {
        return tx.execute(t -> {
            Order o = store.orders.lockById(id).orElseThrow();
            if (!remote.path("receipt").asText().equals(receipt(o)) || remote.path("amount").asLong() != o.totalMinorUnits
                    || !remote.path("currency").asText().equals(o.currency))
                throw new IllegalArgumentException("Gateway order mismatch.");
            String remoteId = remote.path("id").asText();
            if (!remoteId.matches("order_[A-Za-z0-9]+"))
                throw new IllegalArgumentException("Invalid gateway order.");
            if (o.gatewayOrderId != null && !o.gatewayOrderId.equals(remoteId))
                throw new IllegalArgumentException("Conflicting gateway order.");
            if (o.gatewayOrderId == null) {
                o.gatewayOrderId = remoteId;
                o.status = "PENDING";
                store.orders.save(o);
                store.audit(id, "GATEWAY", "Test order linked. Awaiting captured payment.");
            }
            return o;
        });
    }

    public void verify(User user, Long orderId, String remoteOrder, String payment, String signature) {
        Order o = store.owned(orderId, user);
        if (o.gatewayOrderId == null || !o.gatewayOrderId.equals(remoteOrder) || !gateway.validCheckout(o.gatewayOrderId, payment, signature))
            throw new IllegalArgumentException("Payment verification failed. No success has been recorded.");
        // Signature authenticates IDs; only the independently fetched payment can confirm capture.
        JsonNode trusted = gateway.payment(payment);
        applyPayment(o.id, trusted);
        syncRefunds(payment);
    }

    public void reconcile(User user, Long orderId) {
        Order o = store.owned(orderId, user);
        if (o.gatewayOrderId == null) {
            JsonNode matches = gateway.findOrder(receipt(o));
            List<JsonNode> exact = new ArrayList<>();
            for (JsonNode n : matches.path("items"))
                if (n.path("receipt").asText().equals(receipt(o)))
                    exact.add(n);
            if (exact.size() != 1)
                throw new IllegalArgumentException("Gateway order is still unconfirmed. Do not create another order; reconcile again later.");
            o = attach(o.id, exact.getFirst());
        }
        JsonNode remote = gateway.orderPayments(o.gatewayOrderId);
        for (JsonNode n : remote.path("items")) {
            applyPayment(o.id, n);
            if (n.path("status").asText().equals("captured") || n.path("status").asText().equals("refunded"))
                syncRefunds(n.path("id").asText());
        }
    }

    public static String advancePayment(String current, String incoming) {
        if ("refunded".equals(current))
            return current;
        if ("captured".equals(current) && !"refunded".equals(incoming))
            return current;
        if ("authorized".equals(current) && ("created".equals(incoming) || "failed".equals(incoming)))
            return current;
        return incoming;
    }

    public Payment applyPayment(Long orderId, JsonNode n) {
        return tx.execute(t -> applyPaymentLocked(orderId, n));
    }

    private Payment applyPaymentLocked(Long orderId, JsonNode n) {
        Order o = store.orders.lockById(orderId).orElseThrow();
        String id = n.path("id").asText(), status = n.path("status").asText();
        if (!id.matches("pay_[A-Za-z0-9]+") || !Objects.equals(o.gatewayOrderId, n.path("order_id").asText()) || n.path("amount").asLong() != o.totalMinorUnits
                || !n.path("currency").asText().equals(o.currency))
            throw new IllegalArgumentException("Payment amount, currency or order mismatch.");
        if (!Set.of("created", "authorized", "captured", "failed", "refunded").contains(status))
            throw new IllegalArgumentException("Unknown payment state.");
        Payment p = store.payments.findByGatewayPaymentId(id).orElseGet(() -> {
            Payment v = new Payment();
            v.orderId = o.id;
            v.gatewayPaymentId = id;
            v.gatewayOrderId = o.gatewayOrderId;
            v.amountMinorUnits = o.totalMinorUnits;
            v.currency = o.currency;
            v.status = "created";
            v.createdAt = Instant.now();
            return v;
        });
        if (!p.orderId.equals(o.id))
            throw new IllegalArgumentException("Payment belongs to a different order.");
        String next = advancePayment(p.status, status);
        if (!next.equals(p.status) || p.id == null) {
            p.status = next;
            store.payments.saveAndFlush(p);
            store.audit(o.id, "PAYMENT", id + ": " + next);
        }
        if (Set.of("captured", "refunded").contains(p.status) && !Set.of("PAID", "PARTIALLY_REFUNDED", "REFUNDED").contains(o.status)) {
            o.status = "PAID";
            store.orders.save(o);
            store.audit(o.id, "ORDER", "Paid: captured payment confirmed by Razorpay.");
        }
        return p;
    }

    public Refund requestRefund(Long paymentId, long amount, String token) {
        if (token == null || !token.matches("[0-9a-f-]{36}"))
            throw new IllegalArgumentException("Invalid refund request.");
        // Reconcile external refunds before calculating the remaining balance.
        Payment source = store.payments.findById(paymentId).orElseThrow(() -> new IllegalArgumentException("Payment not found."));
        applyPayment(source.orderId, gateway.payment(source.gatewayPaymentId));
        syncRefunds(source.gatewayPaymentId);
        Refund r = tx.execute(t -> {
            store.orders.lockById(source.orderId).orElseThrow();
            Payment p = store.payments.lockById(paymentId).orElseThrow();
            var existing = store.refunds.findByRequestToken(token);
            if (existing.isPresent()) {
                Refund old = existing.get();
                if (!old.paymentId.equals(paymentId) || old.amountMinorUnits != amount)
                    throw new IllegalArgumentException("Refund retry details changed.");
                return old;
            }
            if (!p.status.equals("captured"))
                throw new IllegalArgumentException("Only captured payments can be refunded.");
            long held = store.refunds.findByPaymentIdOrderByIdDesc(paymentId).stream().filter(v -> !v.status.equals("failed"))
                    .mapToLong(v -> v.amountMinorUnits).sum();
            if (amount < 100 || amount > p.amountMinorUnits - held)
                throw new IllegalArgumentException("Refund exceeds the remaining refundable amount (minimum ₹1).");
            Refund v = new Refund();
            v.paymentId = p.id;
            v.requestToken = token;
            v.amountMinorUnits = amount;
            v.status = "submitting";
            v.createdAt = Instant.now();
            store.refunds.saveAndFlush(v);
            store.audit(p.orderId, "REFUND", "Refund reserved: " + Money.format(amount));
            return v;
        });
        if (r.gatewayRefundId != null || Set.of("processed", "failed").contains(r.status))
            return r;
        try {
            JsonNode response = gateway.refund(source.gatewayPaymentId, amount, token);
            applyRefund(response);
        } catch (Exception ex) {
            boolean rejected = ex instanceof org.springframework.web.client.HttpClientErrorException http
                    && !Set.of(408, 409, 429).contains(http.getStatusCode().value());
            String reason = rejected
                    ? rejectionReason((org.springframework.web.client.HttpClientErrorException) ex)
                    : "Gateway outcome unconfirmed. Retry only this refund request.";
            tx.executeWithoutResult(t -> {
                store.orders.lockById(source.orderId).orElseThrow();
                Refund v = store.refunds.findById(r.id).orElseThrow();
                if (v.gatewayRefundId == null) {
                    v.status = rejected ? "failed" : "unknown";
                    store.refunds.save(v);
                    store.audit(source.orderId, "REFUND", reason);
                }
            });
        }
        return store.refunds.findById(r.id).orElseThrow();
    }

    private String rejectionReason(org.springframework.web.client.HttpClientErrorException ex) {
        String reason = "REQUEST_REJECTED";
        try {
            String candidate = mapper.readTree(ex.getResponseBodyAsByteArray()).path("error").path("reason").asText();
            if (candidate.matches("[a-zA-Z0-9_]{1,100}"))
                reason = candidate;
        } catch (Exception ignored) {
            /* Never persist the complete error body. */ }
        return "Razorpay rejected the refund (HTTP " + ex.getStatusCode().value() + "): " + reason
                + ". Check the test account/payment before making a new request.";
    }

    public void syncRefunds(String payment) {
        int skip = 0;
        while (true) {
            JsonNode page = gateway.refunds(payment, skip);
            JsonNode rows = page.path("items");
            for (JsonNode n : rows)
                applyRefund(n);
            if (rows.size() < 100)
                break;
            skip += 100;
        }
    }

    public void applyRefund(JsonNode n) {
        tx.executeWithoutResult(t -> applyRefundLocked(n));
    }

    private void applyRefundLocked(JsonNode n) {
        Payment source = store.payments.findByGatewayPaymentId(n.path("payment_id").asText())
                .orElseThrow(() -> new IllegalArgumentException("Refund payment is not yet known; retry the event."));
        Order o = store.orders.lockById(source.orderId).orElseThrow();
        store.payments.lockById(source.id).orElseThrow();
        String id = n.path("id").asText(), status = n.path("status").asText();
        long amount = n.path("amount").asLong();
        if (!id.matches("rfnd_[A-Za-z0-9]+") || !n.path("currency").asText().equals(source.currency) || amount < 100 || amount > source.amountMinorUnits
                || !Set.of("pending", "processed", "failed").contains(status))
            throw new IllegalArgumentException("Invalid refund evidence.");
        Refund r = store.refunds.findByGatewayRefundId(id).orElseGet(() -> store.refunds.findByRequestToken(n.path("receipt").asText()).orElseGet(() -> {
            Refund v = new Refund();
            v.paymentId = source.id;
            v.requestToken = "external_" + id;
            v.amountMinorUnits = amount;
            v.status = "pending";
            v.createdAt = Instant.now();
            return v;
        }));
        if (!r.paymentId.equals(source.id) || r.amountMinorUnits != amount || (r.gatewayRefundId != null && !r.gatewayRefundId.equals(id)))
            throw new IllegalArgumentException("Refund details mismatch.");
        boolean changed = r.gatewayRefundId == null || !r.status.equals(status);
        r.gatewayRefundId = id;
        if (status.equals("processed") || !Set.of("processed", "failed").contains(r.status))
            r.status = status;
        store.refunds.saveAndFlush(r);
        if (changed)
            store.audit(o.id, "REFUND", id + ": " + r.status);
        long refunded = store.payments.findByOrderIdOrderByIdDesc(o.id).stream().flatMap(p -> store.refunds.findByPaymentIdOrderByIdDesc(p.id).stream())
                .filter(v -> v.status.equals("processed")).mapToLong(v -> v.amountMinorUnits).sum();
        if (refunded > 0) {
            o.status = refunded >= o.totalMinorUnits ? "REFUNDED" : "PARTIALLY_REFUNDED";
            store.orders.save(o);
        }
    }

    public void webhook(byte[] raw, String signature, String eventId) {
        if (!gateway.webhookConfigured())
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
                    "Webhook is not configured.");
        if (!gateway.validWebhook(raw, signature))
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid signature.");
        if (eventId == null || !eventId.matches("[A-Za-z0-9_-]{1,200}"))
            throw new IllegalArgumentException("Missing event identifier.");
        if (events.existsByGatewayEventId(eventId))
            return;
        final JsonNode envelope;
        try {
            envelope = mapper.readTree(raw);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid webhook payload.");
        }
        String type = envelope.path("event").asText();
        // Fetch current authoritative state, so stale/out-of-order events cannot regress state.
        JsonNode trusted = null;
        Long orderId = null;
        if (type.startsWith("payment.") || type.equals("order.paid")) {
            String payment = envelope.path("payload").path("payment").path("entity").path("id").asText();
            trusted = gateway.payment(payment);
            orderId = store.orders.findByGatewayOrderId(trusted.path("order_id").asText())
                    .orElseThrow(() -> new IllegalArgumentException("Local order is not linked yet. Retry delivery.")).id;
        } else if (type.startsWith("refund.")) {
            trusted = gateway.fetchRefund(envelope.path("payload").path("refund").path("entity").path("id").asText());
            JsonNode payment = gateway.payment(trusted.path("payment_id").asText());
            orderId = store.orders.findByGatewayOrderId(payment.path("order_id").asText())
                    .orElseThrow(() -> new IllegalArgumentException("Local order not found. Retry delivery.")).id;
            applyPayment(orderId, payment);
        }
        final JsonNode evidence = trusted;
        final Long localOrder = orderId;
        tx.executeWithoutResult(t -> {
            if (localOrder != null)
                store.orders.lockById(localOrder).orElseThrow();
            if (events.existsByGatewayEventId(eventId))
                return;
            if (evidence != null) {
                if (type.startsWith("refund."))
                    applyRefundLocked(evidence);
                else
                    applyPaymentLocked(localOrder, evidence);
            }
            WebhookEvent e = new WebhookEvent();
            e.gatewayEventId = eventId;
            e.eventType = type;
            e.processedAt = Instant.now();
            e.status = evidence == null ? "IGNORED" : "PROCESSED";
            events.saveAndFlush(e);
        });
    }
}
