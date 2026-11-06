package com.example.ecommerce.service;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.util.*;

@Service
public class OrderService {
    final OrderRepository orders;
    final OrderItemRepository items;
    final PaymentRepository payments;
    final RefundRepository refunds;
    final ProductRepository products;
    final UserRepository users;
    final CartItemRepository carts;
    final AuditEntryRepository audits;
    final TransactionTemplate tx;

    public OrderService(OrderRepository o, OrderItemRepository i, PaymentRepository p, RefundRepository r, ProductRepository products, UserRepository u, CartItemRepository c, AuditEntryRepository a, TransactionTemplate tx) {
        orders = o;
        items = i;
        payments = p;
        refunds = r;
        this.products = products;
        users = u;
        carts = c;
        audits = a;
        this.tx = tx;
    }

    public Order owned(Long id, User user) {
        Order o = orders.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!o.userId.equals(user.id) && !user.role.equals("ADMIN"))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return o;
    }

    public List<Order> history(User u) {
        return orders.findByUserIdOrderByIdDesc(u.id);
    }

    public List<OrderItem> items(Long id) {
        return items.findByOrderIdOrderById(id);
    }

    public List<Payment> payments(Long id) {
        return payments.findByOrderIdOrderByIdDesc(id);
    }

    public List<AuditEntry> audit(Long id) {
        return audits.findByOrderIdOrderByIdDesc(id);
    }

    public List<Refund> refunds(Long orderId) {
        return payments(orderId).stream().flatMap(p -> refunds.findByPaymentIdOrderByIdDesc(p.id).stream()).toList();
    }

    public record Initiation(Order order, boolean created) {
    }

    public Initiation reserve(User user, String token, String address) {
        if (token == null || !token.matches("[0-9a-f-]{36}"))
            throw new IllegalArgumentException("Checkout expired. Review your cart again.");
        return tx.execute(s -> {
            users.lockById(user.id).orElseThrow();
            var existing = orders.findByRequestToken(token);
            if (existing.isPresent()) {
                if (!existing.get().userId.equals(user.id))
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                return new Initiation(existing.get(), false);
            }
            var cart = carts.findByUserIdOrderByProductId(user.id);
            if (cart.isEmpty())
                throw new IllegalArgumentException("Your bag is empty.");
            Order o = new Order();
            o.userId = user.id;
            o.requestToken = token;
            o.status = "INITIATING";
            o.currency = "INR";
            o.address = address;
            o.createdAt = Instant.now();
            List<OrderItem> snapshots = new ArrayList<>();
            for (CartItem c : cart) {
                Product p = products.lockById(c.productId).orElseThrow();
                if (!p.active || c.quantity > p.stockQuantity)
                    throw new IllegalArgumentException(p.title + " no longer has enough stock. Update your bag.");
                o.totalMinorUnits = Math.addExact(o.totalMinorUnits, Math.multiplyExact(p.priceMinorUnits, c.quantity));
                if (o.totalMinorUnits > 100_000_000)
                    throw new IllegalArgumentException("Order exceeds the test checkout limit of ₹10,00,000.");
                p.stockQuantity -= c.quantity;
                products.save(p);
                OrderItem item = new OrderItem();
                item.productId = p.id;
                item.productNameSnapshot = p.title;
                item.unitPriceMinorUnits = p.priceMinorUnits;
                item.quantity = c.quantity;
                snapshots.add(item);
            }
            orders.saveAndFlush(o);
            for (OrderItem i : snapshots) {
                i.orderId = o.id;
                items.save(i);
            }
            carts.deleteByUserId(user.id);
            audit(o.id, "ORDER", "Inventory reserved; server prices snapshotted.");
            return new Initiation(o, true);
        });
    }

    public void audit(Long order, String kind, String detail) {
        AuditEntry a = new AuditEntry();
        a.orderId = order;
        a.kind = kind;
        a.detail = detail;
        a.createdAt = Instant.now();
        audits.save(a);
    }
}
