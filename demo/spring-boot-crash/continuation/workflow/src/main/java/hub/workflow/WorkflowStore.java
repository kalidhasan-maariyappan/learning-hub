package hub.workflow;

import java.util.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkflowStore {
  private final JdbcTemplate db;

  public WorkflowStore(JdbcTemplate db) {
    this.db = db;
  }

  @Transactional
  public String create(String id, boolean failPayment, boolean failConfirm, String correlation) {
    if (db.queryForList("select id from workflow where id=?", String.class, id).isEmpty()) {
      db.update(
          "insert into workflow values (?,'NEW',0,0,?,?,?)",
          id,
          failPayment,
          failConfirm,
          correlation);
      event(id, "OrderCreated", correlation);
    }
    return id;
  }

  public void event(String id, String kind, String correlation) {
    db.update(
        "insert into outbox values (?,?,?,false,?)",
        UUID.randomUUID().toString(),
        id,
        kind,
        correlation);
  }

  @Transactional
  public void transition(String id, String expected, String next, String correlation) {
    if (db.update(
            "update workflow set phase=?,attempts=0,next_attempt=0 where id=? and phase=?",
            next,
            id,
            expected)
        == 1) event(id, next, correlation);
  }

  public Map<String, Object> get(String id) {
    return db.queryForMap("select * from workflow where id=?", id);
  }
}
