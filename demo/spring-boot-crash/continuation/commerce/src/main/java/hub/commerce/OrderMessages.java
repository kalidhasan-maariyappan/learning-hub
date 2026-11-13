package hub.commerce;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Configuration
@Profile("broker")
public class OrderMessages {
  @Bean
  Queue receipts() {
    return QueueBuilder.durable("commerce.receipts")
        .deadLetterExchange("")
        .deadLetterRoutingKey("commerce.receipts.dead")
        .build();
  }

  @Bean
  Queue deadReceipts() {
    return QueueBuilder.durable("commerce.receipts.dead").build();
  }

  @Bean
  Consumer consumer(JdbcTemplate db) {
    return new Consumer(db);
  }

  public static class Consumer {
    private final JdbcTemplate db;

    Consumer(JdbcTemplate db) {
      this.db = db;
    }

    @RabbitListener(queues = "commerce.receipts")
    @Transactional
    public void receive(String eventId) {
      if (db.queryForList(
              "select id from payment_event where id=?", String.class, "receipt-" + eventId)
          .isEmpty()) {
        db.update("insert into payment_event values (?)", "receipt-" + eventId);
        System.out.println("Receipt work recorded: " + eventId);
      }
    }
  }
}
