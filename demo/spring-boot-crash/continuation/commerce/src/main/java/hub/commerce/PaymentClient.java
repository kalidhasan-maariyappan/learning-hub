package hub.commerce;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

@Component
public class PaymentClient {
  private final RestClient client;
  private final String key, url;

  public Map<?, ?> session(String id) {
    return client
        .get()
        .uri("/v1/checkout/sessions/{id}", id)
        .headers(h -> h.setBasicAuth(key, ""))
        .retrieve()
        .body(Map.class);
  }

  public Map<?, ?> refundStatus(String id) {
    return client
        .get()
        .uri("/v1/refunds/{id}", id)
        .headers(h -> h.setBasicAuth(key, ""))
        .retrieve()
        .body(Map.class);
  }

  public PaymentClient(
      @Value("${payment.base-url}") String base,
      @Value("${payment.key}") String key,
      @Value("${app.public-url}") String url) {
    var factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout(2000);
    factory.setReadTimeout(5000);
    this.client = RestClient.builder().baseUrl(base).requestFactory(factory).build();
    this.key = key;
    this.url = url;
  }

  public record Checkout(String id, String url) {}

  public Checkout checkout(PurchaseOrder order) {
    if (!key.startsWith("sk_test_"))
      throw new ResponseStatusException(
          HttpStatus.SERVICE_UNAVAILABLE, "Set a Stripe test-mode key first");
    var form = new LinkedMultiValueMap<String, String>();
    form.add("mode", "payment");
    form.add("success_url", url + "/swagger-ui/index.html");
    form.add("cancel_url", url + "/swagger-ui/index.html");
    form.add("client_reference_id", order.id.toString());
    form.add("metadata[orderId]", order.id.toString());
    form.add("line_items[0][price_data][currency]", "usd");
    form.add("line_items[0][price_data][product_data][name]", order.product);
    form.add("line_items[0][price_data][unit_amount]", "2500");
    form.add("line_items[0][quantity]", String.valueOf(order.quantity));
    Map<?, ?> result =
        client
            .post()
            .uri("/v1/checkout/sessions")
            .headers(h -> h.setBasicAuth(key, ""))
            .header("Idempotency-Key", "checkout-" + order.id)
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(form)
            .retrieve()
            .body(Map.class);
    return new Checkout((String) result.get("id"), (String) result.get("url"));
  }

  public Map<?, ?> refund(Long orderId, String intent) {
    return client
        .post()
        .uri("/v1/refunds")
        .headers(h -> h.setBasicAuth(key, ""))
        .header("Idempotency-Key", "refund-" + orderId)
        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        .body("payment_intent=" + intent)
        .retrieve()
        .body(Map.class);
  }
}
