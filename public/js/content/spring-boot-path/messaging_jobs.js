// Spring Boot Learning Path, part 4: events and messaging (Kafka, RabbitMQ, outbox, Redis Streams),
// scheduled and asynchronous work, Spring Batch and caching.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table } = JT.h;
  const K = JT.kit;
  const BP = JT.bootPath;
  const { page, run, shown, main } = BP;

  // ------------------------------------------------------------------ Messaging overview
  page('sbp_messaging', () => [
    BP.goals(['why services send messages instead of calling each other', 'events vs commands', 'the delivery guarantees you must design for']),
    h2('Why messaging?'),
    p('With an HTTP call, the caller waits and fails when the other service is down. With a message, the sender writes to a <strong>broker</strong> (Kafka, RabbitMQ) and continues; the receiver processes it when it can. This decouples services in time and lets several consumers react to the same fact.'),
    table(['', 'Synchronous HTTP', 'Asynchronous messages'], [
      ['Caller waits', 'Yes', 'No'], ['Receiver down', 'Caller fails', 'Message waits in the broker'], ['Several receivers', 'Caller calls each one', 'Each subscribes'],
      ['Good for', 'Queries that need an answer now', 'Notifications, workflows, integration, analytics'],
    ]),
    h2('Events and commands'),
    ul(['<strong>Event</strong> — a fact that happened, named in the past tense: <code>ClaimSubmitted</code>, <code>PaymentFailed</code>. The sender does not know who listens.',
      '<strong>Command</strong> — a request to do something: <code>SendEmail</code>. One specific receiver is expected to act.']),
    h2('Delivery guarantees'),
    p('Real brokers and networks give <strong>at-least-once</strong> delivery: a message can arrive twice (after a retry, a rebalance, a crash before the offset was saved). Consumers must therefore be <strong>idempotent</strong> — processing the same message twice must have the same effect as once, for example by recording processed message ids.'),
    p('The path through this section: ' + JT.link('sbp_events', 'in-process events') + ' → ' + JT.link('sbp_kafka', 'Kafka') + ' → ' + JT.link('sbp_rabbitmq', 'RabbitMQ') + ' → ' + JT.link('sbp_kafka_vs_rabbit', 'choosing between them') + ' → ' + JT.link('sbp_outbox', 'publishing reliably') + '.'),
    BP.remember(['Assume every message can be delivered more than once.', 'Message formats are a public contract: version them and change them compatibly.']),
    BP.next('sbp_events'),
  ]);

  // ------------------------------------------------------------------ Application events
  page('sbp_events', () => [
    BP.goals(['publishing events inside one application', '<code>@EventListener</code> vs <code>@TransactionalEventListener</code>', 'why “after commit” matters']),
    p('Before reaching for a broker, Spring has in-process events. A service publishes an event object; listeners in other packages react. This keeps features decoupled inside a modular monolith.'),
    run(`import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

@Entity
class PurchaseOrder {
    @Id Long id;
    long amount;
    protected PurchaseOrder() { }
    PurchaseOrder(Long id, long amount) { this.id = id; this.amount = amount; }
}

interface OrderRepository extends JpaRepository<PurchaseOrder, Long> { }

record OrderPlaced(long orderId) { }

@Service
class OrderService {
    private final OrderRepository orders;
    private final ApplicationEventPublisher events;
    OrderService(OrderRepository orders, ApplicationEventPublisher events) { this.orders = orders; this.events = events; }

    @Transactional
    public void place(long id, long amount) {
        System.out.println("placing order " + id);
        orders.save(new PurchaseOrder(id, amount));
        events.publishEvent(new OrderPlaced(id));
        if (amount > 1000) throw new IllegalStateException("payment declined");
    }
}

@Component
class OrderListeners {
    @EventListener
    void audit(OrderPlaced event) {
        System.out.println("  @EventListener: order " + event.orderId() + " (still inside the transaction)");
    }

    @TransactionalEventListener                 // default phase: AFTER_COMMIT
    void sendConfirmation(OrderPlaced event) {
        System.out.println("  @TransactionalEventListener: order " + event.orderId() + " committed -> send email");
    }
}

` + main([], `            OrderService service = context.getBean(OrderService.class);
            service.place(1, 250);
            try {
                service.place(2, 5000);
            } catch (IllegalStateException ex) {
                System.out.println("order 2 rolled back: " + ex.getMessage());
            }
            System.out.println("orders in database: " + context.getBean(OrderRepository.class).count());`),
    `placing order 1
  @EventListener: order 1 (still inside the transaction)
  @TransactionalEventListener: order 1 committed -> send email
placing order 2
  @EventListener: order 2 (still inside the transaction)
order 2 rolled back: payment declined
orders in database: 1`, 'data', 'Events before and after commit'),
    BP.explained([
      '<code>publishEvent</code> calls every listener whose parameter type matches the event.',
      '<code>@EventListener</code> runs immediately, in the same thread and transaction.',
      '<code>@TransactionalEventListener</code> waits until the transaction <strong>commits</strong>. Order 2 rolled back, so no confirmation email was sent for an order that does not exist.',
      'The listener lives in a different class (and could be in a different feature package) — <code>OrderService</code> does not know it exists.',
    ]),
    BP.mistake('Sending emails or broker messages from a plain <code>@EventListener</code> inside a transaction. If the transaction later rolls back, the message is already gone.'),
    BP.next('sbp_kafka'),
  ]);

  // ------------------------------------------------------------------ Kafka
  page('sbp_kafka', () => [
    BP.goals(['topics, partitions, keys and consumer groups', 'a producer and a consumer with Spring Kafka', 'retries and dead-letter topics']),
    h2('Kafka in one picture'),
    BP.file(`producer ──send(key=CLM-1)──▶ topic "claim-submitted"
                                ├── partition 0: [r0][r1][r2]…   ◀── consumer A (group "claim-service")
                                ├── partition 1: [r0][r1]…       ◀── consumer B (group "claim-service")
                                └── partition 2: [r0][r1][r2]…   ◀── consumer B
                                         ▲
                     a second group ("analytics") reads the same records independently`, 'Topics, partitions and consumer groups'),
    ul(['A <strong>topic</strong> is a durable, append-only log split into <strong>partitions</strong>. Records stay for the retention period and can be re-read (replayed).',
      'The record <strong>key</strong> decides the partition. Same key → same partition → <strong>ordered</strong> for that key. There is no order across partitions.',
      'Consumers in one <strong>group</strong> share the partitions; each record is processed by one member of the group. Each group tracks its own <strong>offsets</strong> (its position in each partition).']),
    h2('1. Start Kafka locally'),
    K.show(`services:
  kafka:
    image: apache/kafka:4.4.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1`, 'compose.yaml', 'yaml'),
    h2('2. Dependency and configuration'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-kafka</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    K.show(`spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      value-serializer: org.springframework.kafka.support.serializer.JacksonJsonSerializer
      acks: all                          # wait until the record is replicated
    consumer:
      group-id: claim-service
      auto-offset-reset: earliest
      value-deserializer: org.springframework.kafka.support.serializer.JacksonJsonDeserializer
      properties:
        spring.json.trusted.packages: com.example.claims`, 'application.yml', 'yaml'),
    h2('3. Producer, consumer and error handling'),
    shown(`public record ClaimSubmitted(String claimId, String policyId, long amountCents) { }

@Service
class ClaimProducer {
    private final KafkaTemplate<String, ClaimSubmitted> kafka;
    ClaimProducer(KafkaTemplate<String, ClaimSubmitted> kafka) { this.kafka = kafka; }

    void publish(ClaimSubmitted event) {
        kafka.send("claim-submitted", event.claimId(), event)          // key = claimId keeps one claim in order
             .whenComplete((result, ex) -> {
                 if (ex != null) log.error("Send failed for {}", event.claimId(), ex);
             });
    }
}

@Component
class ClaimConsumer {
    private final ProcessedMessages processed;                         // table of handled ids → idempotency
    ClaimConsumer(ProcessedMessages processed) { this.processed = processed; }

    @KafkaListener(topics = "claim-submitted")
    void consume(ClaimSubmitted event) {
        if (!processed.markIfNew(event.claimId())) return;              // duplicate delivery: ignore
        System.out.println("Processing claim " + event.claimId());
    }
}

@Configuration
class KafkaErrorConfig {
    @Bean
    DefaultErrorHandler errorHandler(KafkaTemplate<Object, Object> template) {
        var recoverer = new DeadLetterPublishingRecoverer(template);    // sends to "claim-submitted-dlt"
        return new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 3)); // 3 retries, 1 s apart
    }
}`, { title: 'Claims over Kafka', label: 'Application log', result: `Processing claim CLM-1
# a record that keeps failing:
Retrying record claim-submitted-0@17 (attempt 2 of 4)…
Record claim-submitted-0@17 published to claim-submitted-dlt` }),
    shown(`docker compose up -d
curl -i -H 'Content-Type: application/json' \\
  -d '{"claimId":"CLM-1","policyId":"POL-9","amountCents":150000}' \\
  http://localhost:8080/claims`, { title: 'Try it', lang: 'text', label: 'Response', result: 'HTTP/1.1 202' }),
    BP.explained([
      '<code>KafkaTemplate.send(topic, key, value)</code> is asynchronous; it returns a future. Log or handle failures.',
      'Boot auto-configures the template and listener containers from <code>spring.kafka.*</code>.',
      '<code>@KafkaListener</code> methods are called for each record. The offset is committed after the method returns normally.',
      '<code>DefaultErrorHandler</code> retries a failing record and then hands it to the <code>DeadLetterPublishingRecoverer</code>, which publishes it to <code>&lt;topic&gt;-dlt</code> so one bad record does not block the partition.',
      'The consumer checks a processed-ids table first, because the same record can be delivered again.',
    ]),
    p('Kafka transactions (<code>spring.kafka.producer.transaction-id-prefix</code>) can make “consume, then produce” atomic within Kafka. They do <em>not</em> make a database commit and a Kafka send atomic — that is what the ' + JT.link('sbp_outbox', 'transactional outbox') + ' is for. In tests, use <code>org.testcontainers.kafka.KafkaContainer</code>.'),
    BP.remember(['Choose keys deliberately: they decide ordering and load spreading.', 'Consumers must be idempotent.', 'Watch <strong>consumer lag</strong>: how far a group is behind the end of the log.']),
    BP.mistake('Copying old tutorials that use <code>ChainedKafkaTransactionManager</code> (deprecated) or the old Testcontainers <code>org.testcontainers.containers.KafkaContainer</code> (deprecated).'),
    BP.interview([
      ['Why does Kafka ordering exist only within a partition?', 'Each partition is an independent log consumed by one group member at a time. Different partitions are processed in parallel by different consumers, so there is no global order. Use the same key for records that must stay in order.'],
      ['What guarantee does a consumer-group offset provide?', 'It records how far the group has processed each partition. After a restart or rebalance, consumption resumes from the committed offset — so records after the last commit may be processed again (at-least-once).'],
      ['Retry vs DLT vs idempotency?', 'Retry handles temporary failures; a DLT parks records that keep failing so the partition can continue; idempotency makes duplicate deliveries harmless. You need all three.'],
    ]),
    BP.next('sbp_rabbitmq'),
  ]);

  // ------------------------------------------------------------------ RabbitMQ
  page('sbp_rabbitmq', () => [
    BP.goals(['exchanges, queues, bindings and routing keys', 'a publisher and a consumer with Spring AMQP', 'acknowledgements, retries and dead-letter queues']),
    h2('RabbitMQ in one picture'),
    BP.file(`publisher ──(routing key "notification.email")──▶ exchange "notification.exchange" (direct)
                                                   ├── binding "notification.email" ──▶ queue "notification.email" ──▶ email worker
                                                   └── binding "notification.sms"   ──▶ queue "notification.sms"   ──▶ sms worker`, 'Exchanges route, queues hold'),
    table(['Exchange type', 'Routes to'], [
      ['direct', 'Queues whose binding key equals the routing key'], ['topic', 'Pattern match: <code>order.*.created</code>, <code>order.#</code>'],
      ['fanout', 'Every bound queue (broadcast)'], ['headers', 'Matching message headers'],
    ]),
    K.show(`services:
  rabbitmq:
    image: rabbitmq:4.2-management
    ports:
      - "5672:5672"      # AMQP
      - "15672:15672"    # management UI: http://localhost:15672 (guest/guest)`, 'compose.yaml', 'yaml'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    K.show(`spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    publisher-confirm-type: correlated     # broker confirms each publish
    listener:
      simple:
        acknowledge-mode: auto             # ack when the listener returns, reject when it throws
        prefetch: 10
        retry:
          enabled: true
          max-attempts: 3
        default-requeue-rejected: false    # after retries, send to the dead-letter exchange`, 'application.yml', 'yaml'),
    shown(`@Configuration
class RabbitConfig {
    static final String EXCHANGE = "notification.exchange";
    static final String QUEUE = "notification.email";
    static final String ROUTING_KEY = "notification.email";

    @Bean DirectExchange notificationExchange() { return new DirectExchange(EXCHANGE); }

    @Bean DirectExchange deadLetterExchange() { return new DirectExchange("notification.dlx"); }

    @Bean Queue emailQueue() {
        return QueueBuilder.durable(QUEUE)
            .deadLetterExchange("notification.dlx")        // rejected messages go here
            .build();
    }

    @Bean Queue emailDeadLetters() { return QueueBuilder.durable(QUEUE + ".dlq").build(); }

    @Bean Binding emailBinding(Queue emailQueue, DirectExchange notificationExchange) {
        return BindingBuilder.bind(emailQueue).to(notificationExchange).with(ROUTING_KEY);
    }

    @Bean Binding deadLetterBinding(Queue emailDeadLetters, DirectExchange deadLetterExchange) {
        return BindingBuilder.bind(emailDeadLetters).to(deadLetterExchange).with(ROUTING_KEY);
    }

    @Bean MessageConverter json() { return new JacksonJsonMessageConverter(); }
}

record EmailNotification(String to, String subject) { }

@Service
class NotificationPublisher {
    private final RabbitTemplate rabbit;
    NotificationPublisher(RabbitTemplate rabbit) { this.rabbit = rabbit; }

    void send(EmailNotification email) {
        rabbit.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, email);
    }
}

@Component
class EmailWorker {
    @RabbitListener(queues = RabbitConfig.QUEUE)
    void receive(EmailNotification email) {
        System.out.println("Email notification to " + email.to() + ": " + email.subject());
    }
}`, { title: 'Notifications over RabbitMQ', label: 'Application log', result: 'Email notification to jane@example.com: Your appointment is confirmed' }),
    BP.explained([
      'Spring declares the exchanges, queues and bindings from the <code>@Bean</code>s when it first connects.',
      '<code>convertAndSend(exchange, routingKey, object)</code> converts the record to JSON and publishes it.',
      '<code>@RabbitListener</code> consumes from a queue. Returning normally <strong>acknowledges</strong> the message; throwing rejects it.',
      'After the retries, a rejected message is <strong>dead-lettered</strong> to <code>notification.email.dlq</code> instead of being requeued forever.',
      '<strong>Publisher confirms</strong> tell the sender the broker has taken the message; <strong>consumer acks</strong> tell the broker the message was processed. They solve different problems.',
    ]),
    BP.mistake('Requeueing a message that fails because it is malformed. It fails again immediately, forever, and blocks the queue. Dead-letter it and alert.'),
    BP.next('sbp_kafka_vs_rabbit'),
  ]);

  page('sbp_kafka_vs_rabbit', () => [
    BP.goals(['how Kafka and RabbitMQ differ', 'how to choose for a use case']),
    table(['Characteristic', 'Kafka', 'RabbitMQ'], [
      ['Core idea', 'Durable, partitioned log', 'Exchanges route messages into queues'], ['After consumption', 'Records stay until retention expires', 'Acknowledged messages are removed'],
      ['Replay', 'Built in: reset the offset', 'Not normal queue behavior'], ['Routing', 'Topic + key → partition', 'Rich: direct, topic, fanout, headers'],
      ['Consumer model', 'Consumer groups with offsets', 'Competing consumers with acks'], ['Ordering', 'Per partition', 'Per queue, weakened by requeues and parallel consumers'],
      ['Failure handling', 'Retry topics, DLT, replay', 'Retry, requeue, DLX'], ['What to watch', 'Partition count, retention, consumer lag', 'Queue depth, unacked messages, prefetch'],
      ['Strong fit', 'Event streaming, integration, analytics, event sourcing', 'Work queues, task distribution, flexible routing'],
    ]),
    h2('Choosing'),
    table(['Use case', 'Good choice', 'Why'], [
      ['Several services react to “order placed”, new ones added later', 'Kafka', 'New consumer groups can read the history'],
      ['Distribute image-resize jobs to workers', 'RabbitMQ', 'Classic work queue with acks and prefetch'],
      ['Route alerts by severity and region', 'RabbitMQ', 'Topic exchanges with pattern bindings'],
      ['Clickstream to analytics, rebuild projections', 'Kafka', 'High throughput and replay'],
      ['A light event log when you already run Redis', 'Redis Streams', 'Fewer moving parts (' + JT.link('sbp_redis_streams', 'Redis Streams') + ')'],
    ]),
    BP.remember(['Neither is “better”: they optimize for different models.', 'Pick by the delivery and replay semantics you need, then by what your team can operate.']),
    BP.interview([
      ['What is the difference between a publisher confirm and a consumer acknowledgement?', 'A publisher confirm is the broker telling the producer it has safely accepted a message. A consumer ack is the consumer telling the broker it has finished processing a delivery, so the broker may remove it.'],
      ['How do RabbitMQ exchange types differ?', 'Direct routes on an exact routing key, topic on wildcard patterns, fanout to every bound queue, headers on header values.'],
    ]),
    BP.next('sbp_outbox'),
  ]);

  // ------------------------------------------------------------------ Outbox
  page('sbp_outbox', () => [
    BP.goals(['the dual-write problem', 'the transactional outbox pattern', 'a working relay that publishes after commit']),
    h2('The dual-write problem'),
    p('A service saves a claim in its database <em>and</em> sends <code>ClaimSubmitted</code> to Kafka. These are two systems; no transaction covers both. If the database commits and the send fails, other services never hear about the claim. If the send succeeds and the database rolls back, they hear about a claim that does not exist.'),
    h2('The outbox pattern'),
    ol(['In the <strong>same database transaction</strong> as the business change, insert a row into an <code>outbox</code> table describing the event.',
      'A separate <strong>relay</strong> reads unpublished outbox rows, sends them to the broker, and marks them published.',
      'If the relay crashes after sending but before marking, it sends again later — so consumers stay idempotent (at-least-once).']),
    run(`import java.time.Instant;
import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;

@Entity
class Claim {
    @Id String id;
    long amountCents;
    protected Claim() { }
    Claim(String id, long amountCents) { this.id = id; this.amountCents = amountCents; }
}

@Entity
class OutboxEvent {
    @Id @GeneratedValue Long id;
    String topic;
    String messageKey;
    String payload;
    Instant publishedAt;
    protected OutboxEvent() { }
    OutboxEvent(String topic, String key, String payload) { this.topic = topic; this.messageKey = key; this.payload = payload; }
}

interface ClaimRepository extends JpaRepository<Claim, String> { }
interface OutboxRepository extends JpaRepository<OutboxEvent, Long> {
    List<OutboxEvent> findTop100ByPublishedAtIsNullOrderByIdAsc();
}

interface Broker { void send(String topic, String key, String payload); }   // KafkaTemplate in real life

@Component
class PrintingBroker implements Broker {
    public void send(String topic, String key, String payload) {
        System.out.println("  -> " + topic + " key=" + key + " " + payload);
    }
}

@Service
class ClaimService {
    private final ClaimRepository claims;
    private final OutboxRepository outbox;
    ClaimService(ClaimRepository claims, OutboxRepository outbox) { this.claims = claims; this.outbox = outbox; }

    @Transactional
    public void submit(String id, long amountCents) {
        claims.save(new Claim(id, amountCents));
        outbox.save(new OutboxEvent("claim-submitted", id,
            "{\\"claimId\\":\\"" + id + "\\",\\"amountCents\\":" + amountCents + "}"));
        if (amountCents <= 0) throw new IllegalArgumentException("amount must be positive");
    }
}

@Component
class OutboxRelay {
    private final OutboxRepository outbox;
    private final Broker broker;
    OutboxRelay(OutboxRepository outbox, Broker broker) { this.outbox = outbox; this.broker = broker; }

    // In production: @Scheduled(fixedDelay = 500) and a lock so only one instance relays.
    @Transactional
    public int publishPending() {
        List<OutboxEvent> pending = outbox.findTop100ByPublishedAtIsNullOrderByIdAsc();
        for (OutboxEvent event : pending) {
            broker.send(event.topic, event.messageKey, event.payload);
            event.publishedAt = Instant.now();
        }
        return pending.size();
    }
}

` + main([], `            ClaimService claims = context.getBean(ClaimService.class);
            OutboxRelay relay = context.getBean(OutboxRelay.class);

            claims.submit("CLM-1", 150_000);
            claims.submit("CLM-2", 42_000);
            try {
                claims.submit("CLM-3", 0);
            } catch (IllegalArgumentException ex) {
                System.out.println("CLM-3 rejected: " + ex.getMessage());
            }
            System.out.println("claims saved: " + context.getBean(ClaimRepository.class).count()
                + ", outbox rows: " + context.getBean(OutboxRepository.class).count());

            System.out.println("relay run 1:");
            System.out.println("  published " + relay.publishPending());
            System.out.println("relay run 2:");
            System.out.println("  published " + relay.publishPending());`),
    `CLM-3 rejected: amount must be positive
claims saved: 2, outbox rows: 2
relay run 1:
  -> claim-submitted key=CLM-1 {"claimId":"CLM-1","amountCents":150000}
  -> claim-submitted key=CLM-2 {"claimId":"CLM-2","amountCents":42000}
  published 2
relay run 2:
  published 0`, 'data', 'A working transactional outbox'),
    BP.explained([
      '<code>submit</code> writes the claim and its outbox row in one transaction: both or neither. CLM-3 failed, so it left no claim and no event.',
      'The relay reads unpublished rows in id order, sends each one, and sets <code>publishedAt</code>; the change is saved when its transaction commits.',
      'The second relay run finds nothing to send.',
      'The broker is an interface; in the real service it wraps <code>KafkaTemplate</code> and waits for the send result before marking the row.',
    ]),
    h2('Production notes'),
    ul(['Run the relay with <code>@Scheduled</code> and a distributed lock (for example ShedLock), or use change-data-capture (Debezium) to stream the outbox table.',
      'Delete or archive published rows regularly.', 'Keep the payload a versioned, documented event schema.']),
    BP.interview([
      ['What problem does a transactional outbox solve?', 'It makes “change the database” and “publish an event” consistent without a distributed transaction: the event is stored in the same local transaction and published afterwards, at least once.'],
      ['When would you use a Saga?', 'When one business operation spans several services, each with its own database. Each step commits locally and publishes an event; failures trigger compensating actions instead of a global rollback.'],
    ]),
    BP.next('sbp_redis_streams'),
  ]);

  page('sbp_redis_streams', () => [
    BP.goals(['what a Redis Stream is', 'appending and reading records with Spring Data Redis', 'when Streams are enough']),
    p('A <strong>Redis Stream</strong> is a persistent, append-only log stored in Redis — unlike Pub/Sub, records are kept and can be read later. Consumer groups give each record to one consumer and track acknowledgements, similar to Kafka on a smaller scale.'),
    shown(`@Service
class AuditStreamPublisher {
    private final StringRedisTemplate redis;
    AuditStreamPublisher(StringRedisTemplate redis) { this.redis = redis; }

    RecordId publish(String action, String user) {
        MapRecord<String, String, String> record = StreamRecords.newRecord()
            .ofMap(Map.of("action", action, "user", user))
            .withStreamKey("audit-events");
        return redis.opsForStream().add(record);
    }
}

@Component
class AuditStreamReader {
    private final StringRedisTemplate redis;
    AuditStreamReader(StringRedisTemplate redis) { this.redis = redis; }

    void printAll() {
        redis.opsForStream().read(StreamOffset.fromStart("audit-events"))
             .forEach(r -> System.out.println(r.getId() + " " + r.getValue()));
    }
}`, { title: 'Append and read', label: 'Output', result: `1761904800000-0 {action=login, user=jane}
1761904800123-0 {action=export, user=jane}` }),
    p('For continuous consumption use a <code>StreamMessageListenerContainer</code> with a consumer group (<code>XREADGROUP</code>) and acknowledge each record after processing.'),
    BP.remember(['Use Streams for a lightweight persistent log when Redis is already part of the system.', 'Choose Kafka when you need high throughput, long retention, many consumer groups or a large ecosystem.']),
    BP.next('sbp_scheduling', 'run work on a schedule.'),
  ]);

  // ================================================================== Jobs
  page('sbp_scheduling', () => [
    BP.goals(['<code>@Scheduled</code> with fixed delay, fixed rate and cron', 'why scheduled jobs run on every instance', 'making jobs safe to rerun']),
    run(`import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
class CleanupJob {
    static final CountDownLatch THREE_RUNS = new CountDownLatch(3);
    private final AtomicInteger runs = new AtomicInteger();

    @Scheduled(fixedDelayString = "PT0.2S", initialDelay = 100)
    void removeExpiredSessions() {
        int run = runs.incrementAndGet();
        if (run <= 3) {
            System.out.println("cleanup run " + run + " on " + Thread.currentThread().getName().replaceAll("\\\\d+$", "N"));
            THREE_RUNS.countDown();
        }
    }
}

@EnableScheduling
` + main([], `            boolean done = CleanupJob.THREE_RUNS.await(5, TimeUnit.SECONDS);
            System.out.println("three runs finished: " + done);`),
    `cleanup run 1 on scheduling-N
cleanup run 2 on scheduling-N
cleanup run 3 on scheduling-N
three runs finished: true`, 'core', 'A repeating job'),
    BP.explained([
      '<code>@EnableScheduling</code> turns on the scheduler; Boot provides a thread pool named <code>scheduling-…</code>.',
      '<code>fixedDelayString = "PT0.2S"</code> waits 200 ms after each run <em>finishes</em>. <code>fixedRate</code> starts runs at a fixed interval regardless of duration.',
      'The latch only lets the program stop after three runs; a real job runs until the application stops.',
    ]),
    table(['Option', 'Example', 'Meaning'], [
      ['fixedDelay', '<code>@Scheduled(fixedDelayString = "PT1M")</code>', '1 minute after the previous run ended'],
      ['fixedRate', '<code>@Scheduled(fixedRateString = "PT1M")</code>', 'Every minute'],
      ['cron', '<code>@Scheduled(cron = "0 0 2 * * *", zone = "Europe/Oslo")</code>', 'Every day at 02:00 (sec min hour day month weekday)'],
      ['From config', '<code>@Scheduled(cron = "${jobs.cleanup.cron}")</code>', 'Change the schedule without rebuilding'],
    ]),
    h2('Running more than one instance'),
    p('<code>@Scheduled</code> runs in <strong>every</strong> application instance. With three replicas, the nightly report runs three times. For “exactly one instance”, use a distributed lock (ShedLock with a database table), a Kubernetes <code>CronJob</code>, or a job scheduler.'),
    BP.mistake('Assuming a scheduled job runs once in a cluster, or writing jobs that break when run twice. Make jobs idempotent (for example “mark invoices due before today”, not “add one day”).'),
    BP.next('sbp_async'),
  ]);

  page('sbp_async', () => [
    BP.goals(['running methods in the background with <code>@Async</code>', 'combining results with <code>CompletableFuture</code>', 'turning on Java 21 virtual threads']),
    run(`import java.util.concurrent.CompletableFuture;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
class PriceLookup {
    @Async
    public CompletableFuture<String> priceFrom(String supplier) throws InterruptedException {
        Thread.sleep(500);                                   // a slow blocking HTTP call
        boolean virtual = Thread.currentThread().toString().startsWith("VirtualThread");
        return CompletableFuture.completedFuture(supplier + " (virtual thread: " + virtual + ")");
    }
}

@EnableAsync
` + main(['"spring.threads.virtual.enabled=true"'], `            PriceLookup lookup = context.getBean(PriceLookup.class);
            long start = System.nanoTime();
            var a = lookup.priceFrom("supplier-a");
            var b = lookup.priceFrom("supplier-b");
            var c = lookup.priceFrom("supplier-c");
            CompletableFuture.allOf(a, b, c).join();
            long ms = (System.nanoTime() - start) / 1_000_000;

            System.out.println(a.join());
            System.out.println(b.join());
            System.out.println(c.join());
            System.out.println("three 500 ms calls finished in under 1 second: " + (ms < 1000));`),
    `supplier-a (virtual thread: true)
supplier-b (virtual thread: true)
supplier-c (virtual thread: true)
three 500 ms calls finished in under 1 second: true`, 'core', '@Async on virtual threads'),
    BP.explained([
      '<code>@EnableAsync</code> + <code>@Async</code>: calling the method through the Spring proxy returns immediately and the body runs on another thread.',
      'The three calls run in parallel, so the total time is about 500 ms instead of 1.5 s.',
      '<code>spring.threads.virtual.enabled=true</code> makes Boot use <strong>virtual threads</strong> for <code>@Async</code>, Tomcat request handling, scheduling and more. It needs Java 21+; on Java 17 the line prints <code>false</code>.',
      'Like <code>@Transactional</code>, <code>@Async</code> does nothing when the method is called on <code>this</code>.',
    ]),
    h2('What virtual threads change'),
    p('A virtual thread is cheap: blocking it on I/O does not block an operating-system thread. Ordinary blocking code (JDBC, <code>RestClient</code>) can then handle many concurrent requests — often removing the reason to rewrite a service with WebFlux.'),
    BP.remember(['Virtual threads make waiting cheap, not resources infinite: the database pool, rate limits and CPU still cap throughput.', 'Exceptions in <code>void</code> <code>@Async</code> methods are only logged; return a <code>CompletableFuture</code> to see them.']),
    BP.next('sbp_batch'),
  ]);

  page('sbp_batch', () => [
    BP.goals(['jobs, steps and chunks', 'reader → processor → writer', 'skipping bad records and restarting']),
    h2('When to use Spring Batch'),
    p('Use <strong>Spring Batch</strong> for large, restartable bulk work: importing a million-row file, nightly billing, data migration. It processes items in <strong>chunks</strong> (read N, process N, write N, commit) and records progress, so a failed job can restart where it stopped.'),
    BP.file(`Job "importPatients"
 └── Step "load"     chunk size 2
      ├── ItemReader     reads one item at a time (file, database, queue)
      ├── ItemProcessor  validates / transforms; return null to filter
      └── ItemWriter     writes a whole chunk in one transaction`, 'The model'),
    run(`import java.util.List;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.listener.JobExecutionListener;
import org.springframework.batch.core.job.JobExecution;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.Step;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.infrastructure.item.ItemProcessor;
import org.springframework.batch.infrastructure.item.ItemWriter;
import org.springframework.batch.infrastructure.item.support.ListItemReader;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;

record PatientRow(String name, String email) { }

@Configuration
class ImportJobConfig {
    @Bean
    Step load(JobRepository jobs) {
        ItemProcessor<String, PatientRow> parse = line -> {
            String[] parts = line.split(",");
            if (!parts[1].contains("@")) throw new IllegalArgumentException("bad email: " + parts[1]);
            return new PatientRow(parts[0].trim(), parts[1].trim().toLowerCase());
        };
        ItemWriter<PatientRow> write = chunk -> System.out.println("write chunk " + chunk.getItems());

        return new StepBuilder("load", jobs)
            .<String, PatientRow>chunk(2)
            .reader(new ListItemReader<>(List.of("Jane, JANE@example.com", "Omar, omar@example.com",
                                                 "Li, not-an-email", "Eva, eva@example.com", "Ben, ben@example.com")))
            .processor(parse)
            .writer(write)
            .faultTolerant().skip(IllegalArgumentException.class).skipLimit(10)
            .build();
    }

    @Bean
    Job importPatients(JobRepository jobs, Step load) {
        return new JobBuilder("importPatients", jobs)
            .start(load)
            .listener(new JobExecutionListener() {
                @Override public void afterJob(JobExecution job) {
                    job.getStepExecutions().forEach(s -> System.out.println("job " + job.getStatus()
                        + ": read=" + s.getReadCount() + " written=" + s.getWriteCount() + " skipped=" + s.getSkipCount()));
                }
            })
            .build();
    }
}

` + main([], `            // Boot runs every Job bean at startup (spring.batch.job.enabled=true by default).`),
    `write chunk [PatientRow[name=Jane, email=jane@example.com], PatientRow[name=Omar, email=omar@example.com]]
write chunk [PatientRow[name=Eva, email=eva@example.com]]
write chunk [PatientRow[name=Ben, email=ben@example.com]]
job COMPLETED: read=5 written=4 skipped=1`, 'batch', 'Import with a skip policy'),
    BP.explained([
      'The reader returns one line at a time; the processor turns each line into a <code>PatientRow</code>; the writer receives a chunk of up to 2 rows.',
      'Li\'s line throws in the processor. <code>faultTolerant().skip(...)</code> skips it (up to the skip limit) instead of failing the whole job.',
      'Each chunk is one transaction. If the job crashed in the middle, a restart would continue after the last committed chunk.',
      'Spring Boot starts every <code>Job</code> bean when the application starts; set <code>spring.batch.job.enabled=false</code> and use <code>JobOperator</code> to start jobs yourself.',
      'In Spring Boot 4 the plain batch starter keeps job metadata in memory. Add <code>spring-boot-starter-batch-jdbc</code> to store it in the database so restarts survive a crash.',
    ]),
    table(['Need', 'Tool'], [['Run a small task every few minutes', '<code>@Scheduled</code>'], ['Do something in the background now', '<code>@Async</code>'], ['Process a large dataset, restartable, with skip/retry', 'Spring Batch']]),
    BP.next('sbp_caching'),
  ]);

  // ================================================================== Caching
  page('sbp_caching', () => [
    BP.goals(['the cache abstraction: <code>@Cacheable</code>, <code>@CachePut</code>, <code>@CacheEvict</code>', 'cache keys', 'what makes caching hard']),
    run(`import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

record Price(String sku, int cents) { }

@Service
class PriceService {
    private final AtomicInteger databaseCalls = new AtomicInteger();

    public int databaseCalls() { return databaseCalls.get(); }

    @Cacheable(cacheNames = "prices", key = "#sku")
    public Price find(String sku) {
        databaseCalls.incrementAndGet();               // the slow part we want to avoid
        return new Price(sku, 1999);
    }

    @CachePut(cacheNames = "prices", key = "#sku")
    public Price update(String sku, int cents) {
        return new Price(sku, cents);                  // save to the database, then refresh the cache
    }

    @CacheEvict(cacheNames = "prices", key = "#sku")
    public void delete(String sku) { }
}

@EnableCaching
` + main([], `            PriceService prices = context.getBean(PriceService.class);
            System.out.println(prices.find("A-1") + " database calls=" + prices.databaseCalls());
            System.out.println(prices.find("A-1") + " database calls=" + prices.databaseCalls() + "  (cache hit)");
            System.out.println(prices.update("A-1", 1499));
            System.out.println(prices.find("A-1") + " database calls=" + prices.databaseCalls() + "  (updated value from cache)");
            prices.delete("A-1");
            System.out.println(prices.find("A-1") + " database calls=" + prices.databaseCalls() + "  (evicted, loaded again)");`),
    `Price[sku=A-1, cents=1999] database calls=1
Price[sku=A-1, cents=1999] database calls=1  (cache hit)
Price[sku=A-1, cents=1499]
Price[sku=A-1, cents=1499] database calls=1  (updated value from cache)
Price[sku=A-1, cents=1999] database calls=2  (evicted, loaded again)`, 'cache', 'Cache hits, updates and eviction'),
    BP.explained([
      '<code>@EnableCaching</code> turns on caching proxies. Without Redis, Boot uses a simple in-memory map.',
      '<code>@Cacheable</code>: the first call runs the method and stores the result under the key <code>#sku</code>; later calls return the stored value without running it.',
      '<code>@CachePut</code> always runs the method and replaces the cached value — use it on updates.',
      '<code>@CacheEvict</code> removes the entry, so the next read loads fresh data.',
    ]),
    h2('The hard part'),
    ul(['<strong>Invalidation:</strong> every write path must update or evict the entry, or users see stale data.', '<strong>TTL:</strong> decide how stale a value may be and expire it.',
      '<strong>Stampede:</strong> when a hot key expires, many requests hit the database at once; use <code>@Cacheable(sync = true)</code> or refresh early.',
      '<strong>Keys:</strong> include everything that changes the result (tenant, locale, user).']),
    BP.mistake('Caching per-user data under a key without the user or tenant id. One customer then sees another customer\'s data.'),
    BP.mistake('Reading a <em>field</em> of a cached (or <code>@Transactional</code>) bean from outside, such as <code>prices.databaseCalls</code>. You are talking to a generated proxy subclass whose fields are never set, so you get <code>null</code>. Always go through methods — that is why the example has <code>databaseCalls()</code>.'),
    BP.next('sbp_redis'),
  ], { exercise: { q: 'Store the method result in the <code>prices</code> cache.', code: '@___(cacheNames = "prices", key = "#sku")\npublic Price find(String sku) { ... }', options: ['Cacheable', 'CacheEvict', 'CachePut', 'EnableCaching'], answer: ['Cacheable'] } });

  page('sbp_redis', () => [
    BP.goals(['using Redis as the cache store', 'TTL and serialization settings', 'when a shared cache is needed']),
    p('The in-memory cache lives inside one JVM: each instance has its own copy, and it is lost on restart. <strong>Redis</strong> is a shared, external cache for all instances. The <code>@Cacheable</code> code does not change — only the dependency and configuration.'),
    K.show(`services:
  redis:
    image: redis:8.10.3
    ports:
      - "6379:6379"`, 'compose.yaml', 'yaml'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    K.show(`spring:
  data:
    redis:
      host: localhost
      port: 6379
  cache:
    type: redis
    cache-names: prices,patients
    redis:
      time-to-live: 10m            # every entry expires after 10 minutes
      key-prefix: "catalog::"      # keep keys of different apps apart`, 'application.yml', 'yaml'),
    shown(`@Configuration
@EnableCaching
class CacheConfig {
    // Store values as JSON instead of Java serialization, so they are readable and survive class changes.
    @Bean
    RedisCacheManagerBuilderCustomizer jsonValues() {
        return builder -> builder.cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(GenericJacksonJsonRedisSerializer.builder().build())));
    }
}`, { title: 'Optional: JSON values', label: 'redis-cli', result: `127.0.0.1:6379> KEYS *
1) "catalog::prices::A-1"
127.0.0.1:6379> TTL "catalog::prices::A-1"
(integer) 597` }),
    BP.remember(['Redis cache = same annotations, shared between instances.', 'Always set a TTL.', 'Monitor hit ratio and memory; set an eviction policy such as <code>allkeys-lru</code>.']),
    BP.mistake('Using Java serialization for cached values. A renamed field makes old entries unreadable after a deploy. Use JSON and plan for old entries.'),
    BP.next('sbp_actuator', 'get ready for production.'),
  ]);
})();
