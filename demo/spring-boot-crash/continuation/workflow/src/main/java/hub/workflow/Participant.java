package hub.workflow;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/effects")
public class Participant {
  private final JdbcTemplate db;
  private final String role;

  public Participant(JdbcTemplate db, @Value("${node.role}") String role) {
    this.db = db;
    this.role = role;
  }

  public record Command(String id, String action, boolean fail, long expectedVersion) {}

  @PostMapping
  @Transactional
  public Map<String, Object> apply(@RequestBody Command c) {
    if (!Set.of("inventory", "payment").contains(role))
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Run a participant role");
    String key = role + ":" + c.id();
    var existing = db.queryForList("select * from effect where id=? for update", key);
    String target =
        switch (c.action()) {
          case "reserve" -> "RESERVED";
          case "commit" -> "COMMITTED";
          case "release" -> "RELEASED";
          case "charge" -> "CHARGED";
          case "refund" -> "REFUNDED";
          default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        };
    if (role.equals("inventory") && !Set.of("reserve", "commit", "release").contains(c.action())
        || role.equals("payment") && !Set.of("charge", "refund").contains(c.action()))
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    if (existing.isEmpty()) {
      if (!Set.of("reserve", "charge").contains(c.action()))
        throw new ResponseStatusException(HttpStatus.CONFLICT);
      db.update(
          "insert into effect values (?,?,0,?)",
          key,
          c.fail() ? "DECLINED" : target,
          System.currentTimeMillis() + 60000);
    } else {
      String state = (String) existing.getFirst().get("STATE");
      long version = ((Number) existing.getFirst().get("VERSION")).longValue();
      if (state.equals(target)) return Map.of("state", state, "version", version);
      if (state.equals("DECLINED")) return Map.of("state", state, "version", version);
      if (c.expectedVersion() >= 0 && version != c.expectedVersion())
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Stale version");
      if (!(state.equals("RESERVED") && Set.of("commit", "release").contains(c.action())
          || state.equals("CHARGED") && c.action().equals("refund")))
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Illegal or stale transition");
      db.update("update effect set state=?,version=version+1 where id=?", target, key);
    }
    return db.queryForMap("select state,version from effect where id=?", key);
  }

  @GetMapping("/{id}")
  public List<Map<String, Object>> status(@PathVariable String id) {
    return db.queryForList("select * from effect where id=?", role + ":" + id);
  }
}
