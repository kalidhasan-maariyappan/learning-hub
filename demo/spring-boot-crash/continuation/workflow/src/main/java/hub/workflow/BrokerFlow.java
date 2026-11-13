package hub.workflow;

import java.util.concurrent.TimeUnit;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@Profile("broker")
public class BrokerFlow {
  @Bean
  TopicExchange exchange() {
    return new TopicExchange("checkout.events", true, false);
  }

  @Bean
  Queue incoming(@Value("${node.role}") String role) {
    return QueueBuilder.durable("checkout." + role)
        .deadLetterExchange("")
        .deadLetterRoutingKey("checkout." + role + ".dead")
        .build();
  }

  @Bean
  Queue dead(@Value("${node.role}") String role) {
    return QueueBuilder.durable("checkout." + role + ".dead").build();
  }

  @Bean
  Binding binding(Queue incoming, TopicExchange exchange) {
    return BindingBuilder.bind(incoming).to(exchange).with("#");
  }

  @Bean
  Jackson2JsonMessageConverter json() {
    return new Jackson2JsonMessageConverter();
  }

  @Bean
  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {
    return new Relay(db, rabbit);
  }

  @Bean
  Handler handler(
      JdbcTemplate db,
      Participant participant,
      WorkflowStore store,
      @Value("${node.role}") String role,
      @Value("${workflow.mode}") String mode) {
    return new Handler(db, participant, store, role, mode);
  }

  public record Event(
      String id,
      String orderId,
      String kind,
      String correlation,
      boolean failPayment,
      boolean failConfirm) {}

  public static class Relay {
    private final JdbcTemplate db;
    private final RabbitTemplate rabbit;

    Relay(JdbcTemplate db, RabbitTemplate rabbit) {
      this.db = db;
      this.rabbit = rabbit;
    }

    @Scheduled(fixedDelay = 1000)
    public void publish() {
      for (var row : db.queryForList("select * from outbox where sent=false")) {
        String id = (String) row.get("ID"), order = (String) row.get("ORDER_ID");
        var flow = db.queryForList("select * from workflow where id=?", order);
        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get("FAIL_PAYMENT"),
            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get("FAIL_CONFIRM");
        var correlation = new CorrelationData(id);
        try {
          rabbit.convertAndSend(
              "checkout.events",
              (String) row.get("KIND"),
              new Event(
                  id, order, (String) row.get("KIND"), (String) row.get("CORRELATION"), fp, fc),
              correlation);
          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);
          if (confirm.isAck() && correlation.getReturned() == null)
            db.update("update outbox set sent=true where id=?", id);
        } catch (Exception retryLater) {
          System.err.println("Outbox pending: " + id);
        }
      }
    }
  }

  public static class Handler {
    private final JdbcTemplate db;
    private final Participant participant;
    private final WorkflowStore store;
    private final String role, mode;

    Handler(
        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {
      this.db = db;
      this.participant = participant;
      this.store = store;
      this.role = role;
      this.mode = mode;
    }

    @RabbitListener(queues = "#{incoming.name}")
    @Transactional
    public void receive(Event e) {
      if (!mode.equals("choreography")) return;
      if (!db.queryForList("select id from inbox where id=?", String.class, e.id()).isEmpty())
        return;
      db.update("insert into inbox values (?)", e.id());
      String next = null;
      if (role.equals("inventory")) {
        switch (e.kind()) {
          case "OrderCreated" -> {
            participant.apply(new Participant.Command(e.orderId(), "reserve", false, -1));
            next = "StockReserved";
          }
          case "PaymentDeclined", "PaymentRefunded" -> {
            participant.apply(new Participant.Command(e.orderId(), "release", false, -1));
            next = "StockReleased";
          }
          case "CommitRequested" -> {
            participant.apply(new Participant.Command(e.orderId(), "commit", false, -1));
            next = "StockCommitted";
          }
        }
      }
      if (role.equals("payment")) {
        switch (e.kind()) {
          case "StockReserved" -> {
            var result =
                participant.apply(
                    new Participant.Command(e.orderId(), "charge", e.failPayment(), -1));
            Object state = result.containsKey("STATE") ? result.get("STATE") : result.get("state");
            next = "DECLINED".equals(state) ? "PaymentDeclined" : "PaymentCharged";
          }
          case "RefundRequested" -> {
            participant.apply(new Participant.Command(e.orderId(), "refund", false, -1));
            next = "PaymentRefunded";
          }
        }
      }
      if (role.equals("order")) {
        String phase = (String) store.get(e.orderId()).get("PHASE");
        if (phase.equals("COMPLETED") || phase.equals("CANCELLED")) return;
        switch (e.kind()) {
          case "PaymentCharged" -> {
            store.transition(
                e.orderId(), phase, e.failConfirm() ? "REFUNDING" : "CHARGED", e.correlation());
            next = e.failConfirm() ? "RefundRequested" : "CommitRequested";
          }
          case "StockCommitted" ->
              store.transition(e.orderId(), phase, "COMPLETED", e.correlation());
          case "StockReleased" ->
              store.transition(e.orderId(), phase, "CANCELLED", e.correlation());
        }
      }
      if (next != null) {
        if (!role.equals("order")
            && db.queryForList("select id from workflow where id=?", String.class, e.orderId())
                .isEmpty())
          db.update(
              "insert into workflow values (?,'NEW',0,0,?,?,?)",
              e.orderId(),
              e.failPayment(),
              e.failConfirm(),
              e.correlation());
        store.event(e.orderId(), next, e.correlation());
      }
    }
  }
}
