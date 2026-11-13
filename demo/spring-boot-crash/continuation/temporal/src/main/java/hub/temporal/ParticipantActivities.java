package hub.temporal;

import java.util.Map;
import org.springframework.web.client.RestClient;

public class ParticipantActivities implements CheckoutActivities {
  private final RestClient client;
  private final String inventory, payment;

  public ParticipantActivities(String secret, String inventory, String payment) {
    client = RestClient.builder().defaultHeader("X-Workflow-Key", secret).build();
    this.inventory = inventory;
    this.payment = payment;
  }

  private String call(String base, String id, String action, boolean fail) {
    Map<?, ?> r =
        client
            .post()
            .uri(base + "/effects")
            .body(Map.of("id", id, "action", action, "fail", fail, "expectedVersion", -1))
            .retrieve()
            .body(Map.class);
    return String.valueOf(r.containsKey("STATE") ? r.get("STATE") : r.get("state"));
  }

  public void reserve(String id) {
    call(inventory, id, "reserve", false);
  }

  public String charge(String id, boolean decline) {
    return call(payment, id, "charge", decline);
  }

  public void release(String id) {
    call(inventory, id, "release", false);
  }

  public void commit(String id) {
    call(inventory, id, "commit", false);
  }
}
