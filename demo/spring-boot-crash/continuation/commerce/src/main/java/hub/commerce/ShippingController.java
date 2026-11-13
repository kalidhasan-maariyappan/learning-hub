package hub.commerce;

import org.springframework.web.bind.annotation.*;

@RestController
public class ShippingController {
  private final ShippingClient client;

  public ShippingController(ShippingClient client) {
    this.client = client;
  }

  @GetMapping("/api/v1/shipping")
  public String quote() {
    return client.quote();
  }
}
