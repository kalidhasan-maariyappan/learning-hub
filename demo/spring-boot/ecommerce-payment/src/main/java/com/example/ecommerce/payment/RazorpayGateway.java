package com.example.ecommerce.payment;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import java.net.http.HttpClient;
import java.time.Duration;
import java.util.Map;

@Component
public class RazorpayGateway {
    private final RestClient client;
    private final String keyId;
    private final String secret;
    private final String webhookSecret;

    public RazorpayGateway(@Value("${razorpay.key-id}") String keyId, @Value("${razorpay.key-secret}") String secret, @Value("${razorpay.webhook-secret:}") String webhookSecret) {
        if (!keyId.startsWith("rzp_test_") || secret.isBlank())
            throw new IllegalStateException("Only Razorpay Test Mode is allowed.");
        this.keyId = keyId;
        this.secret = secret;
        this.webhookSecret = webhookSecret;
        var factory = new JdkClientHttpRequestFactory(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build());
        factory.setReadTimeout(Duration.ofSeconds(20));
        client = RestClient.builder().baseUrl("https://api.razorpay.com/v1").requestFactory(factory).defaultHeaders(h -> h.setBasicAuth(keyId, secret)).build();
    }

    public String publicKey() {
        return keyId;
    }

    public boolean webhookConfigured() {
        return !webhookSecret.isBlank();
    }

    public boolean validCheckout(String order, String payment, String signature) {
        return SignatureVerifier.checkout(order, payment, signature, secret);
    }

    public boolean validWebhook(byte[] raw, String signature) {
        return SignatureVerifier.verify(raw, signature, webhookSecret);
    }

    public JsonNode createOrder(long amount, String receipt) {
        return client.post().uri("/orders").body(Map.of("amount", amount, "currency", "INR", "receipt", receipt, "partial_payment", false)).retrieve()
                .body(JsonNode.class);
    }

    public JsonNode payment(String id) {
        checkId(id, "pay_");
        return client.get().uri("/payments/{id}", id).retrieve().body(JsonNode.class);
    }

    public JsonNode order(String id) {
        checkId(id, "order_");
        return client.get().uri("/orders/{id}", id).retrieve().body(JsonNode.class);
    }

    public JsonNode orderPayments(String id) {
        checkId(id, "order_");
        return client.get().uri("/orders/{id}/payments", id).retrieve().body(JsonNode.class);
    }

    public JsonNode findOrder(String receipt) {
        return client.get().uri(b -> b.path("/orders").queryParam("receipt", receipt).queryParam("count", 100).build()).retrieve().body(JsonNode.class);
    }

    public JsonNode refund(String payment, long amount, String token) {
        checkId(payment, "pay_");
        return client.post().uri("/payments/{id}/refund", payment).header("X-Refund-Idempotency", token)
                .body(Map.of("amount", amount, "speed", "normal", "receipt", token)).retrieve().body(JsonNode.class);
    }

    public JsonNode refunds(String payment, int skip) {
        checkId(payment, "pay_");
        return client.get().uri(b -> b.path("/payments/{id}/refunds").queryParam("count", 100).queryParam("skip", skip).build(payment)).retrieve()
                .body(JsonNode.class);
    }

    public JsonNode fetchRefund(String id) {
        checkId(id, "rfnd_");
        return client.get().uri("/refunds/{id}", id).retrieve().body(JsonNode.class);
    }

    private static void checkId(String id, String prefix) {
        if (id == null || !id.startsWith(prefix) || !id.matches("[A-Za-z0-9_]+"))
            throw new IllegalArgumentException("Invalid gateway identifier.");
    }
}
