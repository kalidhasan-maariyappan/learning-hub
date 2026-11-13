package hub.workflow;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/workflows")
public class WorkflowController {
  private final WorkflowStore store;
  private final JdbcTemplate db;
  private final String role;

  public WorkflowController(
      WorkflowStore store, JdbcTemplate db, @Value("${node.role}") String role) {
    this.store = store;
    this.db = db;
    this.role = role;
  }

  public record Start(String id, boolean failPayment, boolean failConfirm) {}

  @PostMapping
  public Map<String, Object> start(
      @RequestBody Start r,
      @RequestHeader(value = "X-Correlation-ID", required = false) String correlation) {
    if (!role.equals("order")) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    String id = UUID.fromString(r.id()).toString();
    store.create(
        id,
        r.failPayment(),
        r.failConfirm(),
        correlation == null ? UUID.randomUUID().toString() : correlation);
    return store.get(id);
  }

  @GetMapping("/{id}")
  public Map<String, Object> status(@PathVariable String id) {
    return store.get(id);
  }

  @GetMapping("/{id}/events")
  public List<Map<String, Object>> events(@PathVariable String id) {
    return db.queryForList("select * from outbox where order_id=?", id);
  }
}
