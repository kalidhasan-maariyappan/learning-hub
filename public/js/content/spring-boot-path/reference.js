// Spring Boot Learning Path, part 7: reference pages, interview questions, exercises and the quiz.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const BP = JT.bootPath;
  const { page } = BP;
  const c = (s) => '<code>' + esc(s) + '</code>';

  page('sbp_versions', () => [
    p('The versions this learning path uses, verified on October 31, 2026. Spring Boot manages most library versions for you; only the platform pieces below are chosen by hand.'),
    table(['Component', 'Version', 'Notes'], [
      ['Java', '21 LTS', 'Boot 4.1.2 needs Java 17+ and supports up to Java 27'],
      ['Spring Boot', '4.1.2', 'Current stable; 4.2.0-RC1 is a preview'],
      ['Spring Framework', '7.0.10+', 'Required by Boot 4.1.2'],
      ['Spring Cloud', '2025.1.4', 'The 2025.1.x train supports Boot 4.0.x and 4.1.x'],
      ['Spring Cloud Gateway', '5.0.x', 'WebFlux and Web MVC flavors'],
      ['Spring for Apache Kafka', '4.1.x', 'Managed by Boot'],
      ['Spring for GraphQL / Spring gRPC', '2.0.x / 1.1.x', 'Managed by Boot'],
      ['Maven', '3.6.3+ (3.9 recommended)', ''],
      ['PostgreSQL', '18', '19 was still a release candidate'],
      ['Apache Kafka', '4.4.0', 'Image <code>apache/kafka:4.4.0</code>'],
      ['RabbitMQ', '4.2.x', 'Image <code>rabbitmq:4.2-management</code>'],
      ['Redis', '8.10.3', ''],
      ['Testcontainers', '2.0.x', 'Module packages such as <code>org.testcontainers.postgresql</code>'],
      ['Resilience4j', '2.4.0', 'First release with Boot 4 support'],
    ]),
    h2('Upgrading'),
    ul(['Upgrade one minor version at a time and read the release notes\' “deprecations” section.', 'Fix deprecation warnings before the next major upgrade; they become removals.',
      'Spring Cloud must match the Boot line: check the Spring Cloud compatibility table before upgrading Boot.']),
    p('In this site\'s Maven lab, examples run on Spring Boot 4.1.2 with Java 17 bytecode, so they also work on a Java 17 installation.'),
  ]);

  page('sbp_modernize', () => [
    p('Many tutorials online were written for Spring Boot 2 or 3. These are the patterns to replace when you copy older code into a Boot 4 project.'),
    table(['Older pattern', 'Use instead'], [
      [c('spring-boot-starter-web'), c('spring-boot-starter-webmvc') + ' (the old name still works but is deprecated)'],
      [c('spring-boot-starter-oauth2-resource-server') + ', ' + c('…-oauth2-client'), c('spring-boot-starter-security-oauth2-resource-server') + ', ' + c('…-security-oauth2-client')],
      [c('RestTemplate') + ' for new code', c('RestClient') + ' or HTTP Service Clients (' + JT.link('sbp_rest_client', 'lesson') + ')'],
      ['New OpenFeign clients', 'HTTP Service Clients — OpenFeign is feature-complete'],
      [c('WebSecurityConfigurerAdapter'), 'A ' + c('SecurityFilterChain') + ' bean (' + JT.link('sbp_security', 'lesson') + ')'],
      [c('antMatchers(...)') + ', ' + c('authorizeRequests()'), c('requestMatchers(...)') + ', ' + c('authorizeHttpRequests()')],
      [c('@MockBean'), c('@MockitoBean') + ' (Spring Framework test support)'],
      [c('ChainedKafkaTransactionManager'), c('KafkaTransactionManager') + ' / Boot\'s ' + c('transaction-id-prefix') + ', plus the outbox for DB + Kafka'],
      [c('org.testcontainers.containers.KafkaContainer'), c('org.testcontainers.kafka.KafkaContainer') + ' or ' + c('ConfluentKafkaContainer')],
      [c('bootstrap.yml') + ' for Config Client', c('spring.config.import: configserver:…')],
      [c('spring.cloud.gateway.routes'), c('spring.cloud.gateway.server.webflux.routes') + ' (or ' + c('.webmvc') + ')'],
      [c('ddl-auto=update') + ' in production', 'Flyway or Liquibase with ' + c('ddl-auto=validate')],
      ['Field injection with ' + c('@Autowired'), 'Constructor injection'],
      [c('javax.*') + ' imports', c('jakarta.*') + ' (since Boot 3)'],
      [c('com.fasterxml.jackson.databind.ObjectMapper'), 'Jackson 3: ' + c('tools.jackson.databind.ObjectMapper') + ' / ' + c('JsonMapper')],
    ]),
  ]);

  page('sbp_starters', () => [
    p('Starters are dependency bundles. Add one and Boot\'s auto-configuration for that feature activates. All versions come from the Spring Boot parent.'),
    table(['Starter', 'Gives you', 'Lesson'], [
      ['spring-boot-starter-webmvc', 'Spring MVC, embedded Tomcat, Jackson', JT.link('sbp_rest', 'REST')],
      ['spring-boot-starter-validation', 'Bean Validation (Hibernate Validator)', JT.link('sbp_validation', 'Validation')],
      ['spring-boot-starter-restclient', 'Auto-configured <code>RestClient.Builder</code>', JT.link('sbp_rest_client', 'RestClient')],
      ['spring-boot-starter-data-jpa', 'Spring Data JPA, Hibernate, HikariCP', JT.link('sbp_jpa', 'JPA')],
      ['spring-boot-starter-jdbc', 'JdbcClient, JdbcTemplate, HikariCP', JT.link('sbp_jdbc', 'JDBC')],
      ['spring-boot-starter-flyway / -liquibase', 'Database migrations', JT.link('sbp_postgres', 'Flyway')],
      ['spring-boot-starter-security', 'Spring Security', JT.link('sbp_security', 'Security')],
      ['spring-boot-starter-security-oauth2-resource-server', 'JWT / opaque token validation', JT.link('sbp_jwt', 'JWT')],
      ['spring-boot-starter-kafka', 'Spring for Apache Kafka', JT.link('sbp_kafka', 'Kafka')],
      ['spring-boot-starter-amqp', 'Spring AMQP for RabbitMQ', JT.link('sbp_rabbitmq', 'RabbitMQ')],
      ['spring-boot-starter-data-redis', 'Lettuce client, RedisTemplate, Redis cache', JT.link('sbp_redis', 'Redis')],
      ['spring-boot-starter-cache', 'Cache abstraction', JT.link('sbp_caching', 'Caching')],
      ['spring-boot-starter-batch (+ -batch-jdbc)', 'Spring Batch', JT.link('sbp_batch', 'Batch')],
      ['spring-boot-starter-actuator', 'Health, metrics, info endpoints', JT.link('sbp_actuator', 'Actuator')],
      ['spring-boot-starter-opentelemetry', 'Tracing and metrics export via OTLP', JT.link('sbp_metrics', 'Observability')],
      ['spring-boot-starter-webflux', 'WebFlux on Reactor Netty', JT.link('sbp_webflux', 'WebFlux')],
      ['spring-boot-starter-websocket', 'WebSocket and STOMP', JT.link('sbp_websocket', 'WebSocket')],
      ['spring-boot-starter-graphql', 'Spring for GraphQL', JT.link('sbp_graphql', 'GraphQL')],
      ['spring-boot-starter-grpc-server / -client', 'Spring gRPC', JT.link('sbp_grpc', 'gRPC')],
      ['spring-boot-starter-test', 'JUnit, Mockito, AssertJ, Spring test', JT.link('sbp_testing', 'Testing')],
      ['spring-boot-testcontainers', 'Testcontainers integration and @ServiceConnection', JT.link('sbp_testcontainers', 'Testcontainers')],
      ['spring-boot-docker-compose', 'Start compose.yaml services in development', JT.link('sbp_docker', 'Docker')],
    ].map(([a, b, l]) => [c(a), b, l])),
  ]);

  page('sbp_annotations', () => [
    table(['Annotation', 'Purpose'], [
      ['@SpringBootApplication', 'Main class: configuration + auto-configuration + component scan'],
      ['@Component, @Service, @Repository', 'Register a class as a bean'], ['@Configuration + @Bean', 'Declare beans in code'],
      ['@Primary, @Qualifier', 'Choose between several beans of one type'], ['@Profile', 'Bean only for some profiles'],
      ['@ConfigurationProperties, @Value', 'Read configuration'], ['@RestController, @RequestMapping', 'REST controller and URL prefix'],
      ['@GetMapping, @PostMapping, @PutMapping, @DeleteMapping', 'Map HTTP methods'], ['@PathVariable, @RequestParam, @RequestHeader, @RequestBody', 'Read request data'],
      ['@Valid, @NotBlank, @Email, @Size…', 'Validation'], ['@RestControllerAdvice, @ExceptionHandler', 'Global error handling'],
      ['@Entity, @Id, @GeneratedValue, @Column, @Version', 'JPA mapping'], ['@OneToMany, @ManyToOne', 'JPA relationships'],
      ['@Query, @EntityGraph', 'Custom repository queries'], ['@Transactional', 'Transaction boundary'],
      ['@EventListener, @TransactionalEventListener', 'In-process events'], ['@KafkaListener, @RabbitListener', 'Message consumers'],
      ['@Scheduled + @EnableScheduling', 'Periodic jobs'], ['@Async + @EnableAsync', 'Background methods'],
      ['@Cacheable, @CachePut, @CacheEvict + @EnableCaching', 'Caching'], ['@Retryable, @ConcurrencyLimit + @EnableResilientMethods', 'Resilience (Spring Framework 7)'],
      ['@PreAuthorize + @EnableMethodSecurity', 'Method security'], ['@AuthenticationPrincipal', 'Inject the current user / JWT'],
      ['@SpringBootTest, @WebMvcTest, @DataJpaTest', 'Tests: whole app, web slice, JPA slice'], ['@MockitoBean', 'Replace a bean with a mock in a test'],
      ['@Testcontainers, @Container, @ServiceConnection', 'Real infrastructure in tests'],
    ].map(([a, b]) => [a.split(/, | \+ /).map((x) => x.startsWith('@') ? c(x) : esc(x)).join(', '), b])),
  ]);

  page('sbp_properties', () => [
    p('Frequently used settings. Put them in <code>application.yml</code>, a profile file, an environment variable (<code>SERVER_PORT=9090</code>) or a command-line argument (<code>--server.port=9090</code>).'),
    table(['Property', 'Example', 'Effect'], [
      ['spring.application.name', 'patient-service', 'Name in logs, metrics and traces'], ['server.port', '8080', 'HTTP port (0 = random)'],
      ['spring.profiles.active', 'prod', 'Active profiles'], ['logging.level.<package>', 'debug', 'Log level per package'],
      ['logging.structured.format.console', 'ecs', 'JSON logs'], ['spring.datasource.url / username / password', 'jdbc:postgresql://…', 'Database connection'],
      ['spring.datasource.hikari.maximum-pool-size', '10', 'Connection pool size'], ['spring.jpa.hibernate.ddl-auto', 'validate', 'Schema handling'],
      ['spring.jpa.open-in-view', 'false', 'No lazy loading during view rendering'], ['spring.jpa.show-sql', 'true', 'Print SQL (development only)'],
      ['spring.threads.virtual.enabled', 'true', 'Virtual threads (Java 21+)'], ['spring.cache.type', 'redis', 'Cache provider'],
      ['spring.cache.redis.time-to-live', '10m', 'Redis cache TTL'], ['spring.kafka.bootstrap-servers', 'localhost:9092', 'Kafka brokers'],
      ['spring.kafka.consumer.group-id', 'claim-service', 'Consumer group'], ['spring.rabbitmq.host', 'localhost', 'RabbitMQ host'],
      ['spring.security.oauth2.resourceserver.jwt.issuer-uri', 'https://idp/realms/app', 'JWT issuer'], ['management.endpoints.web.exposure.include', 'health,info,prometheus', 'Exposed Actuator endpoints'],
      ['management.endpoint.health.probes.enabled', 'true', 'Liveness/readiness'], ['server.shutdown', 'graceful', 'Finish in-flight requests on shutdown'],
      ['spring.servlet.multipart.max-file-size', '10MB', 'Upload limit'], ['spring.batch.job.enabled', 'false', 'Do not run jobs at startup'],
    ].map(([a, b, e]) => [c(a), c(b), e])),
  ]);

  // ------------------------------------------------------------------ Interview questions
  const interview = [
    ['Spring Boot core', [
      ['How does Spring Boot auto-configuration decide whether to create a bean?', 'It loads auto-configuration classes listed in <code>AutoConfiguration.imports</code>. Each is guarded by conditions — classes on the classpath, properties, and especially <code>@ConditionalOnMissingBean</code> — evaluated after your own configuration. If your bean exists, Boot backs off.', 'sbp_auto_config'],
      ['Why is constructor injection preferable?', 'Dependencies are explicit, fields can be final, objects are always fully initialized, circular dependencies are detected early, and tests can use <code>new</code> without Spring.', 'sbp_ioc'],
      ['BeanFactory vs ApplicationContext?', '<code>ApplicationContext</code> builds on <code>BeanFactory</code> and adds events, environment and profiles, resource loading, i18n and eager singleton creation.', 'sbp_ioc'],
      ['@ConfigurationProperties or @Value?', '<code>@ConfigurationProperties</code> for groups of typed, validated settings; <code>@Value</code> for one simple value.', 'sbp_config'],
    ]],
    ['Web', [
      ['Walk through an HTTP request from Tomcat to a @RestController.', 'Tomcat accepts the connection and passes the request through the servlet filter chain (including Spring Security) to <code>DispatcherServlet</code>. A <code>HandlerMapping</code> finds the controller method; argument resolvers bind path variables, parameters and the JSON body (with validation); the method runs; a message converter writes the return value as JSON; exceptions go to <code>@ExceptionHandler</code> methods.', 'sbp_first_app'],
      ['What is ProblemDetail?', 'Spring\'s implementation of RFC 9457: a standard JSON error body with <code>type</code>, <code>title</code>, <code>status</code>, <code>detail</code>, <code>instance</code> and custom properties.', 'sbp_errors'],
      ['Why accept DTOs rather than entities in controllers?', 'To control exactly which fields clients may set (mass assignment), to keep the API stable when the schema changes, and to avoid serializing lazy JPA proxies.', 'sbp_request'],
    ]],
    ['Data', [
      ['What happens inside @Transactional, and why can self-invocation be surprising?', 'A proxy opens a transaction (binding a connection to the thread) before the method and commits or rolls back after it. A call on <code>this</code> skips the proxy, so the annotation on the called method has no effect.', 'sbp_transactions'],
      ['How do lazy loading and the N+1 problem arise?', 'Associations load on first access; iterating N parents and touching each lazy association runs N extra queries. Fix with fetch joins, entity graphs, batch fetching or DTO projections.', 'sbp_n_plus_one'],
      ['When would you choose JDBC over JPA?', 'For reporting and aggregation queries, bulk operations, and performance-critical paths where you want exact SQL — often alongside JPA for the domain model.', 'sbp_jdbc'],
      ['What is optimistic locking?', 'A <code>@Version</code> column is checked and incremented on each update; an update with a stale version fails, so concurrent edits do not silently overwrite each other.', 'sbp_project_patient'],
    ]],
    ['Messaging', [
      ['What guarantee does a Kafka consumer-group offset provide?', 'It records the group\'s progress per partition. After restart or rebalance, consumption resumes from the last committed offset, so records after it may be processed again: at-least-once.', 'sbp_kafka'],
      ['Why does Kafka ordering exist only within a partition?', 'Partitions are independent logs processed in parallel; only records in the same partition (same key) keep their order.', 'sbp_kafka'],
      ['Retry vs DLT vs idempotency?', 'Retry handles temporary failures; a dead-letter topic parks records that keep failing; idempotency makes duplicate deliveries harmless.', 'sbp_kafka'],
      ['How do RabbitMQ exchange types differ?', 'Direct: exact routing key; topic: wildcard patterns; fanout: every bound queue; headers: header values.', 'sbp_rabbitmq'],
      ['Publisher confirm vs consumer acknowledgement?', 'A confirm says the broker accepted the publish; an ack says the consumer finished processing the delivery.', 'sbp_kafka_vs_rabbit'],
      ['What problems does a transactional outbox solve?', 'The dual write between a database and a broker: the event is saved in the same local transaction as the change and published afterwards by a relay.', 'sbp_outbox'],
    ]],
    ['Security', [
      ['Authentication vs authorization; 401 vs 403?', 'Authentication establishes who you are (failure: 401). Authorization decides what you may do (failure: 403).', 'sbp_security'],
      ['When should an API use OAuth2 resource-server JWT validation?', 'When clients obtain tokens from an identity provider: the API validates signature, issuer, expiry and audience locally and authorizes by scopes or roles, without handling passwords.', 'sbp_jwt'],
      ['When is it safe to disable CSRF protection?', 'For stateless APIs authenticated by tokens in headers, not cookies. Browser apps using session cookies need CSRF protection.', 'sbp_security'],
    ]],
    ['Operations and architecture', [
      ['Why does @Scheduled run more than once in a multi-replica deployment?', 'Each instance has its own scheduler. Use a distributed lock (ShedLock), a Kubernetes CronJob or an external scheduler for single execution.', 'sbp_scheduling'],
      ['Why can distributed retries make an outage worse?', 'Retries multiply load on a struggling dependency across layers. Use timeouts, bounded retries with backoff at one layer, and circuit breakers.', 'sbp_resilience'],
      ['What should be a metric label versus a trace attribute?', 'Low-cardinality dimensions (status, endpoint template, region) are metric tags; high-cardinality values (user id, order id) belong in traces and logs.', 'sbp_metrics'],
      ['Liveness vs readiness?', 'Readiness controls traffic (include dependencies); liveness triggers restarts (only the app itself).', 'sbp_kubernetes'],
      ['When is WebFlux genuinely preferable to MVC?', 'For streaming, gateways and very high concurrency where the whole path is non-blocking. With virtual threads, MVC handles many blocking calls well, so measure first.', 'sbp_webflux'],
      ['When would you choose SSE over WebSocket?', 'When updates flow only from server to client: SSE is plain HTTP with automatic reconnect. Choose WebSocket for frequent two-way messages.', 'sbp_sse'],
      ['Why is Testcontainers more trustworthy than mocking a repository?', 'It runs the real database or broker, so SQL, migrations, serialization and broker semantics are actually tested.', 'sbp_testcontainers'],
      ['Monolith or microservices for a new system?', 'Usually a modular monolith first; split when team ownership, deployment independence or scaling needs justify the operational cost.', 'sbp_microservices'],
    ]],
  ];
  page('sbp_interview', () => [
    p('Questions a 3–5 year backend developer should be able to <em>explain</em>, not just define. Click a question to see a model answer; each links to the lesson that teaches it.'),
    '<p class="qa-toc">' + interview.map(([g], i) => '<a href="#sbp-q' + i + '">' + esc(g) + '</a>').join('') + '</p>',
    ...interview.map(([group, qs], i) => '<h2 class="qa-section" id="sbp-q' + i + '">' + esc(group) + '</h2><div class="qa-list">' + qs.map(([q, a, slug]) =>
      '<details class="qa"><summary>' + q + '</summary><div><p>' + a + '</p><p class="qa-also">Lesson: ' + JT.link(slug) + '</p></div></details>').join('') + '</div>'),
  ]);

  // ------------------------------------------------------------------ Exercises index
  page('sbp_exercises', () => {
    const rows = JT.bootPathOrder.filter((s) => JT.pages[s] && JT.pages[s].exercise)
      .map((s) => [JT.link(s), JT.pages[s].exercise.q]);
    return [
      p('Each of these lessons ends with a fill-in-the-blank exercise. Click an option into the slot and choose <strong>Submit Answer</strong>. Your progress is remembered in this browser.'),
      table(['Lesson', 'Exercise'], rows),
      p('Finished them all? Take the ' + JT.link('sbp_quiz', 'Spring Boot Quiz') + '.'),
    ];
  });

  // ------------------------------------------------------------------ Quiz
  const quiz = K.mixQuiz([
    { q: 'What does @SpringBootApplication combine?', options: ['@SpringBootConfiguration, @EnableAutoConfiguration and @ComponentScan', '@Configuration, @Bean and @Import', '@Controller, @Service and @Repository', '@EnableWebMvc, @EnableJpa and @ComponentScan'], answer: 0 },
    { q: 'Which Spring Boot 4 starter gives you Spring MVC with embedded Tomcat?', options: ['spring-boot-starter-webmvc', 'spring-boot-starter-tomcat-mvc', 'spring-mvc-boot', 'spring-boot-starter-servlet'], answer: 0 },
    { q: 'You define your own DataSource bean. What does Boot do?', options: ['Backs off and uses yours', 'Fails with two DataSource beans', 'Uses its own and ignores yours', 'Wraps yours in a second pool'], answer: 0 },
    { q: 'Which status should a successful POST that creates a resource return?', options: ['201 Created', '200 OK', '202 Accepted', '204 No Content'], answer: 0 },
    { q: 'Validation annotations on a request record are ignored. What is most likely missing?', options: ['@Valid on the parameter', '@Entity on the record', '@Transactional on the controller', '@ResponseStatus on the method'], answer: 0 },
    { q: 'A @Transactional method is called as this.save() from another method of the same bean. What happens?', options: ['No transaction is started for that call', 'A new nested transaction starts', 'The call fails at startup', 'It joins a transaction automatically'], answer: 0 },
    { q: 'Loading 50 authors and touching author.getBooks() for each runs how many queries without a fetch join?', options: ['51', '1', '2', '50'], answer: 0 },
    { q: 'Which property should production use with Flyway?', options: ['spring.jpa.hibernate.ddl-auto=validate', 'ddl-auto=update', 'ddl-auto=create-drop', 'ddl-auto=none with show-sql=true'], answer: 0 },
    { q: 'A user is logged in but lacks the required role. Which status?', options: ['403 Forbidden', '401 Unauthorized', '404 Not Found', '400 Bad Request'], answer: 0 },
    { q: 'A JWT has scope "patients.read". Which authority does Spring Security create by default?', options: ['SCOPE_patients.read', 'ROLE_patients.read', 'patients.read', 'AUTH_patients.read'], answer: 0 },
    { q: 'Kafka guarantees ordering…', options: ['within a partition', 'across the whole topic', 'across all topics', 'only with one consumer group'], answer: 0 },
    { q: 'Why must consumers be idempotent?', options: ['Messages can be delivered more than once', 'Brokers lose every second message', 'Idempotency makes consumers faster', 'Spring requires it to start'], answer: 0 },
    { q: 'What does a transactional outbox store in the same transaction as the business change?', options: ['The event to publish later', 'The Kafka offset', 'A copy of the whole database', 'The HTTP response'], answer: 0 },
    { q: 'You run three replicas of a service with @Scheduled(cron = "0 0 2 * * *"). How often does the job run at 02:00?', options: ['Three times, once per replica', 'Once', 'Never', 'It depends on the leader election built into @Scheduled'], answer: 0 },
    { q: 'Which annotation stores a method result in a cache?', options: ['@Cacheable', '@CacheEvict', '@CachePut', '@EnableCaching'], answer: 0 },
    { q: 'What should be done first to protect a service from a slow dependency?', options: ['Set timeouts on the calls', 'Add more retries', 'Increase the thread pool', 'Cache every response forever'], answer: 0 },
    { q: 'Which probe should NOT include the database check?', options: ['Liveness', 'Readiness', 'Startup', 'None of them'], answer: 0 },
    { q: 'Which is a poor metric tag because of high cardinality?', options: ['userId', 'HTTP status', 'endpoint template', 'region'], answer: 0 },
    { q: 'Which property turns on virtual threads in Spring Boot?', options: ['spring.threads.virtual.enabled=true', 'server.virtual-threads=on', 'spring.task.virtual=true', 'java.virtual.enabled=true'], answer: 0 },
    { q: 'Which is the best fit for one-way server-to-browser progress updates?', options: ['Server-Sent Events', 'gRPC', 'A database trigger', 'RabbitMQ in the browser'], answer: 0 },
  ]);
  page('sbp_quiz', () => [
    p('20 questions covering the whole learning path. The pass mark is 70%. Correct answers are highlighted after you submit.'),
    JT.renderQuiz(quiz, { id: 'sbp-quiz' }),
  ], { after: (main, { wireQuiz }) => wireQuiz(quiz, 70, 'sbp-quiz') });
})();
