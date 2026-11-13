package hub.commerce;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ShippingClient {
  private final RestClient client;

  public ShippingClient(@Value("${shipping.url:http://localhost:9999}") String url) {
    var f = new SimpleClientHttpRequestFactory();
    f.setConnectTimeout(1000);
    f.setReadTimeout(1000);
    client = RestClient.builder().baseUrl(url).requestFactory(f).build();
  }

  @CircuitBreaker(name = "shipping", fallbackMethod = "unavailable")
  @RateLimiter(name = "shipping")
  public String quote() {
    return client.get().uri("/quote").retrieve().body(String.class);
  }

  public String unavailable(Throwable error) {
    return "Shipping quote unavailable; try later";
  }
}
