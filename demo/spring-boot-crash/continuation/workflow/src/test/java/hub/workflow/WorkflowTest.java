package hub.workflow;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest(
    properties = {
      "workflow.secret=test-only-long-secret",
      "spring.datasource.url=jdbc:h2:mem:workflow;DB_CLOSE_DELAY=-1",
      "node.role=inventory"
    })
class WorkflowTest {
  @Autowired Participant participant;
  @Autowired JdbcTemplate db;

  @BeforeEach
  void clean() {
    db.update("delete from effect");
  }

  @Test
  void duplicateReserveDoesNotCreateAnotherEffect() {
    for (int i = 0; i < 2; i++)
      participant.apply(new Participant.Command("a", "reserve", false, -1));
    assertEquals(1, db.queryForObject("select count(*) from effect", Integer.class));
  }

  @Test
  void staleCommandCannotReverseRelease() {
    participant.apply(new Participant.Command("a", "reserve", false, -1));
    participant.apply(new Participant.Command("a", "release", false, -1));
    assertThrows(
        Exception.class,
        () -> participant.apply(new Participant.Command("a", "reserve", false, -1)));
  }

  @Test
  void versionRejectsConcurrentChange() {
    participant.apply(new Participant.Command("a", "reserve", false, -1));
    assertThrows(
        Exception.class, () -> participant.apply(new Participant.Command("a", "commit", false, 2)));
  }
}
