package hub.commerce;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.time.Instant;
import java.util.*;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class Payments {
  private final PaymentService service;
  private final ObjectMapper json;
  private final String secret;

  public Payments(
      PaymentService service,
      ObjectMapper json,
      @Value("${payment.webhook-secret}") String secret) {
    this.service = service;
    this.json = json;
    this.secret = secret;
  }

  @PostMapping("/api/v1/orders/{id}/checkout")
  public PaymentClient.Checkout checkout(@PathVariable Long id, java.security.Principal p) {
    return service.checkout(id, p.getName());
  }

  @PostMapping("/api/v1/orders/{id}/reconcile")
  public PurchaseOrder reconcile(@PathVariable Long id, java.security.Principal p) {
    return service.reconcile(id, p.getName());
  }

  @PostMapping("/api/v1/orders/{id}/refund")
  public Map<?, ?> refund(@PathVariable Long id, java.security.Principal p) {
    return service.refund(id, p.getName());
  }

  static boolean valid(String raw, String header, String secret, long now) {
    try {
      String timestamp = null;
      List<String> signatures = new ArrayList<>();
      for (String part : header.split(",")) {
        String[] pair = part.split("=", 2);
        if (pair[0].equals("t")) timestamp = pair[1];
        if (pair[0].equals("v1")) signatures.add(pair[1]);
      }
      if (timestamp == null || Math.abs(now - Long.parseLong(timestamp)) > 300 || secret.isBlank())
        return false;
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
      byte[] expected = mac.doFinal((timestamp + "." + raw).getBytes(StandardCharsets.UTF_8));
      for (String signature : signatures)
        if (MessageDigest.isEqual(expected, HexFormat.of().parseHex(signature))) return true;
      return false;
    } catch (Exception e) {
      return false;
    }
  }

  @PostMapping("/webhooks/stripe")
  public void webhook(@RequestBody String raw, @RequestHeader("Stripe-Signature") String signature)
      throws Exception {
    if (!valid(raw, signature, secret, Instant.now().getEpochSecond()))
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid webhook signature");
    var event = json.readTree(raw);
    if (event.path("type").asText().equals("checkout.session.completed")) {
      var o = event.path("data").path("object");
      if (o.path("payment_status").asText().equals("paid"))
        service.paid(
            event.path("id").asText(),
            Long.valueOf(o.path("metadata").path("orderId").asText()),
            o.path("id").asText(),
            o.path("payment_intent").asText(),
            o.path("amount_total").asLong(),
            o.path("currency").asText());
    }
  }
}
