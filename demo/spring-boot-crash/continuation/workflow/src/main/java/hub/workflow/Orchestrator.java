package hub.workflow;

import java.util.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class Orchestrator {
  private final JdbcTemplate db;
  private final WorkflowStore store;
  private final RestClient http;
  private final String inventory, payment, role, mode;
  private final Logger log = LoggerFactory.getLogger(getClass());

  public Orchestrator(
      JdbcTemplate db,
      WorkflowStore store,
      @Value("${inventory.url}") String inventory,
      @Value("${payment.url}") String payment,
      @Value("${node.role}") String role,
      @Value("${workflow.mode}") String mode,
      @Value("${workflow.secret}") String secret) {
    this.db = db;
    this.store = store;
    this.inventory = inventory;
    this.payment = payment;
    this.role = role;
    this.mode = mode;
    var f = new SimpleClientHttpRequestFactory();
    f.setConnectTimeout(500);
    f.setReadTimeout(1000);
    http = RestClient.builder().requestFactory(f).defaultHeader("X-Workflow-Key", secret).build();
  }

  public String effect(String url, String id, String action, boolean fail, String correlation) {
    Map<?, ?> result =
        http.post()
            .uri(url + "/effects")
            .header("X-Correlation-ID", correlation)
            .body(new Participant.Command(id, action, fail, -1))
            .retrieve()
            .body(Map.class);
    Object value = result.containsKey("STATE") ? result.get("STATE") : result.get("state");
    return String.valueOf(value);
  }

  @Scheduled(fixedDelay = 500)
  public void tick() {
    if (!role.equals("order") || !mode.equals("orchestration")) return;
    for (var row :
        db.queryForList(
            "select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')"
                + " and next_attempt<=?",
            System.currentTimeMillis())) advance(row);
  }

  public void advance(Map<String, Object> row) {
    String id = (String) row.get("ID"),
        phase = (String) row.get("PHASE"),
        correlation = (String) row.get("CORRELATION");
    String next = phase;
    try {
      switch (phase) {
        case "NEW" -> {
          effect(inventory, id, "reserve", false, correlation);
          next = "RESERVED";
        }
        case "RESERVED" -> {
          String state =
              effect(payment, id, "charge", (Boolean) row.get("FAIL_PAYMENT"), correlation);
          next = state.equals("DECLINED") ? "RELEASING" : "CHARGED";
        }
        case "CHARGED" -> {
          if ((Boolean) row.get("FAIL_CONFIRM")) next = "REFUNDING";
          else {
            effect(inventory, id, "commit", false, correlation);
            next = "COMPLETED";
          }
        }
        case "REFUNDING" -> {
          effect(payment, id, "refund", false, correlation);
          next = "RELEASING";
        }
        case "RELEASING" -> {
          effect(inventory, id, "release", false, correlation);
          next = "CANCELLED";
        }
        default -> throw new IllegalStateException(phase);
      }
      store.transition(id, phase, next, correlation);
      log.info("correlation={} order={} {} -> {}", correlation, id, phase, next);
    } catch (Exception failure) {
      int attempts = ((Number) row.get("ATTEMPTS")).intValue() + 1;
      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));
      db.update(
          "update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?",
          attempts,
          System.currentTimeMillis() + delay,
          attempts >= 5 ? "MANUAL_REVIEW" : phase,
          id,
          phase);
      log.warn(
          "correlation={} order={} phase={} attempt={} outcome=unknown",
          correlation,
          id,
          phase,
          attempts);
    }
  }
}
