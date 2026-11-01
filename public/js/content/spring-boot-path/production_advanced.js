// Spring Boot Learning Path, part 5: production (Actuator, observability, resilience, containers,
// CI, debugging) and advanced topics (microservices, Spring Cloud, WebFlux, SSE, WebSocket, GraphQL, gRPC).
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table } = JT.h;
  const K = JT.kit;
  const BP = JT.bootPath;
  const { page, run, shown, main, webStart } = BP;

  // ------------------------------------------------------------------ Actuator
  page('sbp_actuator', () => [
    BP.goals(['health, info and metrics endpoints', 'a custom health indicator', 'liveness and readiness probes']),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    run(`import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
class PaymentProviderHealthIndicator implements HealthIndicator {
    static final AtomicBoolean reachable = new AtomicBoolean(true);

    @Override
    public Health health() {
        return reachable.get()
            ? Health.up().withDetail("provider", "stripe-sandbox").build()
            : Health.down().withDetail("provider", "stripe-sandbox").withDetail("error", "connect timed out").build();
    }
}

` + main(['"server.port=0"', '"management.endpoints.web.exposure.include=health,info"', '"management.endpoint.health.show-details=always"',
      '"management.health.diskspace.enabled=false"', '"management.health.ssl.enabled=false"', '"management.info.env.enabled=true"', '"info.app.name=patient-service"', '"info.app.version=1.4.0"'],
    webStart + `
            System.out.println("info:      " + get(http, "/actuator/info"));
            System.out.println("health:    " + get(http, "/actuator/health"));
            System.out.println("liveness:  " + get(http, "/actuator/health/liveness"));
            PaymentProviderHealthIndicator.reachable.set(false);
            System.out.println("health:    " + get(http, "/actuator/health"));`, `
    static String get(RestClient http, String path) {
        return http.get().uri(path).exchange((req, res) ->
            res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`),
    `info:      200 {"app":{"version":"1.4.0","name":"patient-service"}}
health:    200 {"components":{"livenessState":{"status":"UP"},"paymentProvider":{"details":{"provider":"stripe-sandbox"},"status":"UP"},"ping":{"status":"UP"},"readinessState":{"status":"UP"}},"groups":["liveness","readiness"],"status":"UP"}
liveness:  200 {"status":"UP"}
health:    503 {"components":{"livenessState":{"status":"UP"},"paymentProvider":{"details":{"provider":"stripe-sandbox","error":"connect timed out"},"status":"DOWN"},"ping":{"status":"UP"},"readinessState":{"status":"UP"}},"groups":["liveness","readiness"],"status":"DOWN"}`, 'actuator', 'Health, info and a custom indicator'),
    BP.explained([
      'Actuator adds endpoints under <code>/actuator</code>. Only <code>health</code> is exposed over HTTP by default; <code>management.endpoints.web.exposure.include</code> adds others.',
      'Every <code>HealthIndicator</code> bean becomes a component named after the bean, without the <code>HealthIndicator</code> suffix (<code>PaymentProviderHealthIndicator</code> → <code>paymentProvider</code>). Boot adds its own indicators too — <code>db</code>, <code>diskSpace</code>, <code>ssl</code>, <code>redis</code>… — two are switched off here to keep the output short.',
      'If any component is DOWN, the overall status is DOWN and the HTTP status is <strong>503</strong>, so load balancers stop sending traffic.',
      '<code>/actuator/health/liveness</code> and <code>/readiness</code> are the probe <em>groups</em> Kubernetes calls; the response lists them under <code>groups</code>.',
      '<code>show-details=always</code> is for learning. In production use <code>when-authorized</code>.',
    ]),
    h2('Useful endpoints'),
    table(['Endpoint', 'Shows'], [
      ['<code>/actuator/health</code>', 'UP/DOWN with components'], ['<code>/actuator/info</code>', 'Build and app information'], ['<code>/actuator/metrics</code>', 'Micrometer metrics'],
      ['<code>/actuator/prometheus</code>', 'Metrics in Prometheus format (needs <code>micrometer-registry-prometheus</code>)'], ['<code>/actuator/loggers</code>', 'Read and change log levels at runtime'],
      ['<code>/actuator/threaddump</code>, <code>/heapdump</code>', 'Diagnostics — protect them!'], ['<code>/actuator/conditions</code>', 'The auto-configuration report'],
    ]),
    BP.mistake('Exposing every endpoint (<code>include: "*"</code>) on the public port. <code>heapdump</code> contains secrets from memory. Expose only what you need, ideally on a separate management port.'),
    BP.next('sbp_metrics'),
  ]);

  // ------------------------------------------------------------------ Metrics
  page('sbp_metrics', () => [
    BP.goals(['the three pillars: logs, metrics, traces', 'custom metrics with Micrometer', 'low vs high cardinality']),
    table(['Pillar', 'Answers', 'Spring Boot tool'], [
      ['Logs', 'What exactly happened in this request?', 'SLF4J + structured logging'],
      ['Metrics', 'How many, how fast, how often — over time?', 'Micrometer → Prometheus'],
      ['Traces', 'Where did the time go across services?', 'Micrometer Observation → OpenTelemetry'],
    ]),
    run(`import java.time.Duration;
import io.micrometer.core.instrument.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
class AppointmentService {
    private final Counter booked;
    private final Timer bookingTime;

    AppointmentService(MeterRegistry registry) {
        this.booked = Counter.builder("appointments.booked")
            .description("Appointments booked").tag("channel", "web").register(registry);
        this.bookingTime = Timer.builder("appointments.booking.time").register(registry);
    }

    void book() {
        bookingTime.record(Duration.ofMillis(120));          // or: bookingTime.record(() -> work())
        booked.increment();
    }
}

` + main(['"server.port=0"', '"management.endpoints.web.exposure.include=metrics"'], webStart + `
            AppointmentService service = context.getBean(AppointmentService.class);
            for (int i = 0; i < 3; i++) service.book();

            MeterRegistry registry = context.getBean(MeterRegistry.class);
            System.out.println("counter = " + registry.get("appointments.booked").counter().count());
            System.out.println("timer count = " + registry.get("appointments.booking.time").timer().count());
            System.out.println(http.get().uri("/actuator/metrics/appointments.booked").retrieve().body(String.class));`),
    `counter = 3.0
timer count = 3
{"availableTags":[{"tag":"channel","values":["web"]}],"description":"Appointments booked","measurements":[{"statistic":"COUNT","value":3.0}],"name":"appointments.booked"}`, 'actuator', 'A counter and a timer'),
    BP.explained([
      'Boot creates a <code>MeterRegistry</code>; inject it and register meters once (in the constructor).',
      'A <strong>counter</strong> only goes up; a <strong>timer</strong> records how long something took and how often; a <strong>gauge</strong> reports a current value such as queue size.',
      'Tags (<code>channel=web</code>) let dashboards split a metric. Spring already records <code>http.server.requests</code>, JVM, pool and cache metrics for you.',
    ]),
    h2('Prometheus and tracing'),
    K.show(`<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-opentelemetry</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    K.show(`management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus
  tracing:
    sampling:
      probability: 0.1          # trace 10% of requests
  opentelemetry:
    tracing:
      export:
        otlp:
          endpoint: http://otel-collector:4318/v1/traces`, 'application.yml', 'yaml'),
    BP.file(`Spring Boot ──metrics──▶ /actuator/prometheus ◀── scraped by Prometheus ──▶ Grafana
            ──traces───▶ OTLP ──▶ OpenTelemetry Collector ──▶ Tempo / Jaeger
            ──logs─────▶ stdout (JSON, with traceId) ──▶ Loki / ELK`, 'A typical production setup'),
    BP.remember(['Put the trace id in every log line so you can jump from a log to the trace.', 'Alert on symptoms users feel: error rate, latency, saturation.']),
    BP.mistake('Using user ids, order ids or full URLs as metric tags. Each distinct value creates a new time series (high cardinality) and can overload the metrics system. Put such values in traces or logs.'),
    BP.next('sbp_resilience'),
  ]);

  // ------------------------------------------------------------------ Resilience
  page('sbp_resilience', () => [
    BP.goals(['why timeouts come first', 'retries with Spring Framework 7\'s <code>@Retryable</code>', 'circuit breakers, bulkheads and why blind retries hurt']),
    h2('Failure handling, in order'),
    ol(['<strong>Timeouts</strong> on every remote call (see ' + JT.link('sbp_rest_client', 'RestClient') + '). Without them nothing else helps.',
      '<strong>Retry</strong> only temporary failures, only idempotent operations, with backoff and a limit.',
      '<strong>Circuit breaker</strong>: after many failures, stop calling for a while and fail fast.',
      '<strong>Bulkhead / concurrency limit</strong>: cap concurrent calls so one slow dependency cannot use every thread.',
      '<strong>Fallback</strong>: a degraded answer (cached value, “try later”) instead of an error, where it makes sense.']),
    h2('Example: built-in retries and concurrency limits'),
    p('Spring Framework 7 includes basic resilience annotations; no extra library is needed.'),
    run(`import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.resilience.annotation.ConcurrencyLimit;
import org.springframework.resilience.annotation.EnableResilientMethods;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Service;

class TemporaryFailure extends RuntimeException {
    TemporaryFailure(String message) { super(message); }
}

@Service
class ExchangeRateClient {
    private final AtomicInteger attempts = new AtomicInteger();

    public void resetAttempts() { attempts.set(0); }

    @Retryable(includes = TemporaryFailure.class, maxRetries = 3, delay = 100, multiplier = 2)
    public double rate(String currency) {
        int attempt = attempts.incrementAndGet();
        System.out.println("attempt " + attempt + " for " + currency);
        if (currency.equals("NOK") && attempt < 3) throw new TemporaryFailure("503 from rates API");
        if (currency.equals("XXX")) throw new TemporaryFailure("rates API down");
        return 11.2;
    }

    @ConcurrencyLimit(2)                          // at most 2 callers at the same time
    public String report() { return "report generated"; }
}

@EnableResilientMethods
` + main([], `            ExchangeRateClient client = context.getBean(ExchangeRateClient.class);
            System.out.println("NOK rate = " + client.rate("NOK"));

            client.resetAttempts();
            try {
                client.rate("XXX");
            } catch (Exception ex) {
                System.out.println("gave up: " + ex.getClass().getSimpleName() + " - " + ex.getMessage());
            }
            System.out.println(client.report());`),
    `attempt 1 for NOK
attempt 2 for NOK
attempt 3 for NOK
NOK rate = 11.2
attempt 1 for XXX
attempt 2 for XXX
attempt 3 for XXX
attempt 4 for XXX
gave up: TemporaryFailure - rates API down
report generated`, 'core', '@Retryable and @ConcurrencyLimit'),
    BP.explained([
      '<code>@EnableResilientMethods</code> turns on the proxies for <code>@Retryable</code> and <code>@ConcurrencyLimit</code>.',
      '<code>includes</code> limits retries to the temporary failure type — never retry a 400 Bad Request.',
      '<code>maxRetries = 3</code> means up to 4 attempts. <code>delay</code> and <code>multiplier</code> give exponential backoff: 100 ms, 200 ms, 400 ms.',
      'When every attempt fails, the caller gets the <em>original</em> exception from the last attempt (<code>TemporaryFailure</code>), so it can return a fallback or an error.',
    ]),
    h2('Circuit breakers with Resilience4j'),
    shown(`// pom.xml: io.github.resilience4j:resilience4j-spring-boot4 (2.4.0+)
@Service
class InsuranceClient {
    @CircuitBreaker(name = "insurance", fallbackMethod = "unknownCoverage")
    @Bulkhead(name = "insurance")
    public Coverage coverage(String policyId) {
        return restClient.get().uri("/policies/{id}/coverage", policyId).retrieve().body(Coverage.class);
    }

    Coverage unknownCoverage(String policyId, Throwable ex) {
        return Coverage.unknown(policyId);         // degraded but useful answer
    }
}`, { title: 'Resilience4j', label: 'application.yml', result: `resilience4j:
  circuitbreaker:
    instances:
      insurance:
        sliding-window-size: 20
        failure-rate-threshold: 50       # open after 50% failures
        wait-duration-in-open-state: 30s
  bulkhead:
    instances:
      insurance:
        max-concurrent-calls: 10` }),
    BP.interview([
      ['Why can distributed retries make an outage worse?', 'Every layer multiplies the load: 3 retries at 3 layers is up to 27 calls for one user request, all hitting a service that is already struggling. Use timeouts, limited retries with jittered backoff, retry at one layer only, and circuit breakers.'],
      ['What does a circuit breaker do?', 'It counts failures. When the failure rate passes a threshold it “opens” and fails calls immediately for a while, giving the dependency time to recover; then it lets a few trial calls through (half-open) before closing again.'],
    ]),
    BP.next('sbp_docker'),
  ]);

  // ------------------------------------------------------------------ Docker
  page('sbp_docker', () => [
    BP.goals(['packaging a Spring Boot app as a container image', 'a multi-stage Dockerfile', 'buildpacks with no Dockerfile']),
    h2('Option 1: a Dockerfile'),
    K.show(`FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw -q dependency:go-offline          # cached layer: dependencies change rarely
COPY src src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
USER 10001                                   # never run as root
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "/app/app.jar"]`, 'Dockerfile', 'text'),
    shown(`docker build -t patient-service:1.0 .
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod -e DB_PASSWORD=secret patient-service:1.0`, { title: 'Build and run', lang: 'text', label: 'Output', result: `Started PatientServiceApplication in 3.2 seconds (process running for 3.9)` }),
    h2('Option 2: buildpacks'),
    p('Spring Boot\'s Maven plugin builds an optimized, layered OCI image with Cloud Native Buildpacks — no Dockerfile:'),
    shown(`./mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=patient-service:1.0`, { title: 'Terminal', lang: 'text', label: 'Output', result: `Successfully built image 'docker.io/library/patient-service:1.0'` }),
    h2('Docker Compose for development'),
    p('With <code>spring-boot-docker-compose</code> on the classpath, <code>mvn spring-boot:run</code> starts the services in <code>compose.yaml</code> and connects to them automatically. This is for development only, not production orchestration.'),
    BP.remember(['Configuration comes from environment variables, not baked into the image.', 'Use a JRE base image, a non-root user and a memory percentage instead of a fixed <code>-Xmx</code>.']),
    BP.next('sbp_kubernetes'),
  ]);

  page('sbp_kubernetes', () => [
    BP.goals(['a Deployment with probes and resources', 'graceful shutdown', 'configuration and secrets']),
    K.show(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: patient-service
spec:
  replicas: 3
  selector:
    matchLabels: { app: patient-service }
  template:
    metadata:
      labels: { app: patient-service }
    spec:
      terminationGracePeriodSeconds: 40
      containers:
        - name: app
          image: registry.example.com/patient-service:1.4.0
          ports: [{ containerPort: 8080 }]
          env:
            - name: SPRING_PROFILES_ACTIVE
              value: prod
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef: { name: patient-db, key: password }
          resources:
            requests: { cpu: "500m", memory: "768Mi" }
            limits:   { memory: "768Mi" }
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8080 }
            periodSeconds: 5
          livenessProbe:
            httpGet: { path: /actuator/health/liveness, port: 8080 }
            initialDelaySeconds: 20
            periodSeconds: 10`, 'deployment.yaml', 'yaml'),
    K.show(`server:
  shutdown: graceful                # default in Boot: finish in-flight requests
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
management:
  endpoint:
    health:
      probes:
        enabled: true`, 'application-prod.yml', 'yaml'),
    BP.explained([
      '<strong>Readiness</strong> false → Kubernetes stops routing traffic to the pod (during startup, or while a dependency is down).',
      '<strong>Liveness</strong> false → Kubernetes restarts the container. Keep it simple: do not include the database in liveness, or a database outage restarts every pod.',
      'On shutdown, Boot stops accepting requests, waits for in-flight ones (graceful shutdown), then exits — within the grace period.',
      'Secrets come from Kubernetes Secrets as environment variables; the image is the same in every environment.',
    ]),
    BP.next('sbp_ci'),
  ]);

  page('sbp_ci', () => [
    BP.goals(['a CI pipeline that builds and tests every change', 'where integration tests run']),
    K.show(`name: build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'
          cache: maven
      - name: Build and run all tests        # Testcontainers works: Docker is available on ubuntu runners
        run: ./mvnw -B verify
      - name: Build image
        if: github.ref == 'refs/heads/main'
        run: ./mvnw -B spring-boot:build-image -DskipTests`, '.github/workflows/build.yml', 'yaml'),
    h2('What a good pipeline checks'),
    ol(['Compile and unit tests on every push.', 'Integration tests with Testcontainers (<code>mvn verify</code> runs <code>*IT</code> classes via Failsafe).', 'Dependency vulnerability scan.',
      'Build and push an image tagged with the commit SHA.', 'Deploy to staging; run smoke tests against <code>/actuator/health</code>.', 'Promote the <em>same</em> image to production.']),
    BP.mistake('Building a new image for production instead of promoting the tested one. Then you deploy something that was never tested.'),
    BP.next('sbp_debugging'),
  ]);

  page('sbp_debugging', () => [
    BP.goals(['a step-by-step way to investigate a failing service', 'what to check for databases, Kafka, RabbitMQ and Redis', 'JVM diagnostics']),
    h2('Work from the outside in'),
    ol(['Is it up? <code>/actuator/health</code> and readiness; recent deploys and config changes.',
      'What do users see? Error rate and latency by endpoint (<code>http.server.requests</code>).',
      'Find one failing request: its trace id → the trace → the log lines with that id.',
      'Read the exception and its <em>root cause</em> (the last “Caused by”).',
      'Check dependencies: DB pool saturation (<code>hikaricp.connections.pending</code>), slow queries, downstream timeouts.',
      'Check messaging: Kafka consumer lag, RabbitMQ queue depth and unacked messages, DLT/DLQ contents.',
      'Check the JVM: CPU, heap after GC, GC pauses, thread states.']),
    table(['Area', 'Look at'], [
      ['JPA', 'Number of queries per request (N+1), slow query log, missing indexes, transaction length'],
      ['Kafka', 'Partition assignment, offsets and lag, rebalances, deserialization errors, DLT records'],
      ['RabbitMQ', 'Queue depth, consumers, unacked messages, redeliveries, publisher confirms, DLX routing'],
      ['Redis', 'Hit ratio, TTLs, memory and eviction policy, serialization errors'],
      ['HTTP clients', 'Timeouts configured? Retries multiplying load? Circuit breaker state'],
    ]),
    shown(`jcmd <pid> Thread.print                 # thread dump: who is blocked on what
jcmd <pid> GC.heap_info                  # heap usage
jcmd <pid> JFR.start duration=60s filename=app.jfr   # Flight Recorder profile
curl localhost:8080/actuator/loggers/org.hibernate.SQL \\
     -H 'Content-Type: application/json' -d '{"configuredLevel":"DEBUG"}'   # temporary SQL logging`, { title: 'Diagnostic commands', lang: 'text', label: 'Thread dump excerpt', result: `"http-nio-8080-exec-37" waiting on HikariPool.getConnection
   at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:181)
   → 40 request threads waiting for 10 connections: the pool is exhausted` }),
    BP.remember(['Change one thing at a time and measure.', 'Turn verbose logging back off after the investigation.']),
    BP.next('sbp_microservices'),
  ]);

  // ================================================================== Advanced
  page('sbp_microservices', () => [
    BP.goals(['what microservices cost', 'when to split a modular monolith', 'how services talk to each other']),
    p('A microservice architecture replaces in-process method calls with network calls between separately deployed applications. You gain independent deployment and scaling; you take on network latency, partial failure, version compatibility, service-to-service security, distributed tracing and data consistency across databases.'),
    BP.file(`               Client
                 │
        Spring Cloud Gateway  (routing, auth, rate limits)
          ┌──────┼───────────┐
     Patient   Appointment   Billing      each service owns its database
        │          │            │
     Postgres   Postgres     Postgres
        └──── events via Kafka ────┘      traces + metrics → OpenTelemetry`, 'A typical system'),
    table(['', 'Modular monolith', 'Microservices'], [
      ['Deployment', 'One unit', 'Many units'], ['Transactions', 'Local, simple', 'Across services: outbox, sagas'], ['Debugging', 'One process', 'Needs distributed tracing'],
      ['Operations', 'Lower', 'Much higher'], ['Team autonomy', 'Moderate', 'High'], ['Independent scaling', 'Limited', 'Strong'], ['Best default for', 'Most new systems', 'Clear domain, team and scale boundaries'],
    ]),
    h2('Rules of thumb'),
    ul(['Start with one well-structured service; split along business capabilities when a team or scaling need forces it.', 'Each service owns its data. No shared tables between services.',
      'Prefer asynchronous events between services; use synchronous calls for queries that need an answer now — with timeouts.', 'Keep APIs and event schemas backward compatible.']),
    BP.mistake('A “distributed monolith”: services that share a database or must be deployed together. You pay the costs of both styles and get the benefits of neither.'),
    BP.next('sbp_spring_cloud'),
  ]);

  page('sbp_spring_cloud', () => [
    BP.goals(['what Spring Cloud provides', 'the release-train BOM', 'Gateway routes, central config and service discovery']),
    p('Spring Cloud is a set of projects for distributed-system patterns: API gateway, central configuration, service discovery, client-side load balancing and circuit breakers. Use it when you actually run several services. The <strong>2025.1.x</strong> release train works with Spring Boot 4.0 and 4.1.'),
    K.show(`<properties>
    <java.version>21</java.version>
    <spring-cloud.version>2025.1.4</spring-cloud.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>\${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>`, 'pom.xml', 'xml'),
    h2('API Gateway'),
    K.show(`spring:
  cloud:
    gateway:
      server:
        webflux:
          routes:
            - id: patients
              uri: lb://patient-service          # lb:// = load-balanced via discovery
              predicates:
                - Path=/api/patients/**
              filters:
                - name: CircuitBreaker
                  args: { name: patients, fallbackUri: forward:/fallback/patients }
            - id: billing
              uri: http://billing:8080
              predicates:
                - Path=/api/billing/**`, 'Gateway application.yml (spring-cloud-starter-gateway-server-webflux)', 'yaml'),
    p('Spring Cloud Gateway 5 has a WebFlux and a Web MVC flavor. Its route properties now live under <code>spring.cloud.gateway.server.webflux</code> (or <code>.webmvc</code>).'),
    h2('Central configuration'),
    K.show(`spring:
  application:
    name: patient-service
  config:
    import: optional:configserver:http://config-server:8888`, 'Client application.yml — no bootstrap.yml needed', 'yaml'),
    h2('Service-to-service calls'),
    p('Use HTTP Service Clients (' + JT.link('sbp_rest_client', 'RestClient lesson') + ') with a <code>@LoadBalanced RestClient.Builder</code> to call <code>http://patient-service/...</code> by name. Spring Cloud OpenFeign is feature-complete; prefer HTTP Service Clients for new code.'),
    BP.remember(['Spring Cloud versions follow a release train; import the BOM that matches your Boot version.', 'On Kubernetes, the platform already gives you discovery and config; you may need less of Spring Cloud.']),
    BP.next('sbp_webflux'),
  ]);

  page('sbp_webflux', () => [
    BP.goals(['what reactive and non-blocking mean', '<code>Mono</code> and <code>Flux</code>', 'when WebFlux is the right choice']),
    p('<strong>Spring WebFlux</strong> is Spring\'s non-blocking web stack, built on Project Reactor and usually run on Netty. A small number of event-loop threads serve many connections because no thread ever waits for I/O. It supports backpressure: a slow consumer can tell a fast producer to slow down.'),
    shown(`// pom.xml: spring-boot-starter-webflux
@RestController
class QuoteController {
    private final WebClient rates = WebClient.create("https://rates.example.com");

    @GetMapping("/quotes/{symbol}")
    Mono<Quote> quote(@PathVariable String symbol) {                 // 0 or 1 value, later
        return rates.get().uri("/v1/{s}", symbol).retrieve()
            .bodyToMono(Quote.class)
            .timeout(Duration.ofSeconds(2));
    }

    @GetMapping(value = "/ticks", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    Flux<String> ticks() {                                             // 0..N values over time
        return Flux.interval(Duration.ofSeconds(1)).map(i -> "tick-" + i).take(3);
    }
}`, { title: 'Mono and Flux', label: 'curl -N localhost:8080/ticks', result: `data:tick-0

data:tick-1

data:tick-2` }),
    table(['', 'Spring MVC', 'WebFlux'], [
      ['Style', 'Imperative', 'Reactive pipelines'], ['Server', 'Tomcat (servlet)', 'Reactor Netty'], ['Blocking JDBC/JPA', 'Natural', 'Must be isolated off the event loop'],
      ['Backpressure', 'No', 'Yes'], ['Learning curve', 'Lower', 'Higher'], ['Best default', 'Typical business APIs', 'Streaming, gateways, very high concurrency with non-blocking drivers'],
    ]),
    p('With Java 21 virtual threads (' + JT.link('sbp_async', 'lesson') + '), ordinary MVC code also handles many concurrent blocking calls. Measure your workload before rewriting a service in reactive style.'),
    BP.mistake('Calling a blocking method (JDBC, <code>Thread.sleep</code>, <code>RestClient</code>) inside a WebFlux handler. It blocks an event-loop thread and stalls every connection on it.'),
    BP.next('sbp_sse'),
  ]);

  page('sbp_sse', () => [
    BP.goals(['streaming events from server to browser', '<code>SseEmitter</code> in Spring MVC', 'SSE vs WebSocket']),
    p('<strong>Server-Sent Events</strong> keep one HTTP response open and push text events through it: progress bars, notifications, live dashboards. The browser reconnects automatically. It is one-way: server → client.'),
    run(`import java.io.IOException;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.task.TaskExecutor;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
class ExportProgressController {
    private final TaskExecutor taskExecutor;                       // Boot's managed pool, closed on shutdown
    ExportProgressController(TaskExecutor taskExecutor) { this.taskExecutor = taskExecutor; }

    @GetMapping("/exports/42/progress")
    SseEmitter progress() {
        SseEmitter emitter = new SseEmitter(60_000L);              // timeout for the open connection
        taskExecutor.execute(() -> {
            try {
                for (int percent = 0; percent <= 100; percent += 50) {
                    emitter.send(SseEmitter.event().name("progress").id(String.valueOf(percent)).data(percent));
                    Thread.sleep(100);
                }
                emitter.send(SseEmitter.event().name("done").data("export-42.csv"));
                emitter.complete();
            } catch (IOException | InterruptedException ex) {
                emitter.completeWithError(ex);                     // the client went away
            }
        });
        return emitter;
    }
}

` + main(['"server.port=0"'], webStart + `
            String stream = http.get().uri("/exports/42/progress")
                .exchange((req, res) -> new String(res.getBody().readAllBytes()));   // reads until complete()
            System.out.print(stream);`),
    `event:progress
id:0
data:0

event:progress
id:50
data:50

event:progress
id:100
data:100

event:done
data:export-42.csv`, 'web', 'Progress events with SseEmitter'),
    BP.explained([
      'The controller returns the <code>SseEmitter</code> immediately; the request thread is released while a thread from Boot\'s <code>TaskExecutor</code> sends events. (Use Boot\'s executor rather than your own thread pool: it is sized by configuration and shut down cleanly.)',
      'Each event has an optional <code>id</code> (the browser sends it back as <code>Last-Event-ID</code> when it reconnects), a <code>name</code> and <code>data</code>.',
      '<code>complete()</code> ends the response. If the client disconnects, <code>send</code> throws and you stop.',
    ]),
    K.show(`const events = new EventSource('/exports/42/progress');
events.addEventListener('progress', e => bar.value = e.data);
events.addEventListener('done', e => { link.href = '/files/' + e.data; events.close(); });`, 'Browser JavaScript', 'text'),
    BP.remember(['Send a heartbeat comment every ~15 s for long streams; proxies close idle connections.', 'Choose SSE for one-way updates, WebSocket for frequent two-way messages.']),
    BP.next('sbp_websocket'),
  ]);

  page('sbp_websocket', () => [
    BP.goals(['what WebSocket is', 'a STOMP message broker with Spring', 'when WebSocket is worth it']),
    p('A <strong>WebSocket</strong> starts as an HTTP request that is “upgraded” to a long-lived, two-way TCP connection. Use it for low-latency, high-frequency, bidirectional messages: chat, collaborative editing, multiplayer games. Many lower-volume cases are simpler with SSE or polling.'),
    shown(`// pom.xml: spring-boot-starter-websocket
@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws");                         // clients connect here
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry broker) {
        broker.setApplicationDestinationPrefixes("/app");    // client → @MessageMapping
        broker.enableSimpleBroker("/topic");                 // server → subscribers
    }
}

record ChatMessage(String from, String text) { }

@Controller
class ChatController {
    @MessageMapping("/chat.send")                            // client sends to /app/chat.send
    @SendTo("/topic/room-1")                                 // result goes to every subscriber
    ChatMessage send(ChatMessage message) {
        return new ChatMessage(message.from(), message.text().strip());
    }
}`, { title: 'A STOMP chat room', label: 'Browser console (two tabs)', result: `tab A sends {"from":"jane","text":"Hi!"}
tab A receives on /topic/room-1: {"from":"jane","text":"Hi!"}
tab B receives on /topic/room-1: {"from":"jane","text":"Hi!"}` }),
    BP.explained([
      '<strong>STOMP</strong> is a simple messaging protocol on top of WebSocket with destinations, subscriptions and headers.',
      'Messages to <code>/app/...</code> go to <code>@MessageMapping</code> methods; their return value is broadcast to <code>/topic/...</code> subscribers.',
      'The simple in-memory broker works for one instance. With several instances, relay to RabbitMQ or another STOMP broker so every user receives every message.',
    ]),
    table(['', 'SSE', 'WebSocket'], [['Direction', 'Server → client', 'Both'], ['Protocol', 'Plain HTTP', 'Upgraded TCP connection'], ['Reconnect', 'Automatic', 'You implement it'], ['Best for', 'Notifications, progress, feeds', 'Chat, collaboration, games']]),
    BP.mistake('Forgetting authentication on the WebSocket handshake and on subscriptions. Check who may subscribe to each destination.'),
    BP.next('sbp_graphql'),
  ]);

  page('sbp_graphql', () => [
    BP.goals(['what GraphQL is', 'a schema and controller with Spring for GraphQL', 'the N+1 and complexity risks']),
    p('<strong>GraphQL</strong> lets the client choose exactly which fields it wants, in one request, from a typed schema. Spring for GraphQL maps schema fields to annotated controller methods.'),
    K.show(`type Query {
    patient(id: ID!): Patient
}

type Patient {
    id: ID!
    name: String!
    appointments: [Appointment!]!
}

type Appointment {
    id: ID!
    date: String!
}`, 'src/main/resources/graphql/schema.graphqls', 'text'),
    shown(`// pom.xml: spring-boot-starter-graphql + spring-boot-starter-webmvc
@Controller
class PatientGraphQlController {
    private final PatientService patients;
    PatientGraphQlController(PatientService patients) { this.patients = patients; }

    @QueryMapping                                         // Query.patient
    Patient patient(@Argument long id) {
        return patients.find(id);
    }

    @BatchMapping                                         // Patient.appointments for ALL patients in one call
    Map<Patient, List<Appointment>> appointments(List<Patient> list) {
        return patients.appointmentsFor(list);
    }
}`, { title: 'Controller', label: 'POST /graphql', result: `request:  { patient(id: 1) { name appointments { date } } }
response: {"data":{"patient":{"name":"Jane Doe","appointments":[{"date":"2026-11-03"}]}}}` }),
    BP.explained([
      '<code>@QueryMapping</code> handles the <code>patient</code> field of <code>Query</code>; <code>@Argument</code> binds its arguments.',
      '<code>@BatchMapping</code> loads a nested field for many parents at once — the GraphQL answer to N+1 queries.',
      'The client asked only for <code>name</code> and <code>date</code>, so nothing else is sent.',
    ]),
    BP.remember(['Limit query depth and complexity so one request cannot ask for the whole database.', 'Authorize per field or per resolver, not just per endpoint.']),
    BP.next('sbp_grpc'),
  ]);

  page('sbp_grpc', () => [
    BP.goals(['what gRPC and Protocol Buffers are', 'a gRPC service with Spring Boot 4.1', 'REST vs gRPC']),
    p('<strong>gRPC</strong> is a fast RPC framework: you define services and messages in a <code>.proto</code> file, generate typed Java code, and exchange compact binary Protocol Buffers over HTTP/2. Spring Boot 4.1 has first-class gRPC starters.'),
    K.show(`syntax = "proto3";

package greeting;

option java_multiple_files = true;
option java_package = "com.example.demo.grpc";

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;          // field numbers are the wire contract: never reuse them
}

message HelloReply {
  string message = 1;
}`, 'src/main/proto/greeter.proto', 'text'),
    shown(`// pom.xml: spring-boot-starter-grpc-server (+ protobuf-maven-plugin to generate the classes)
@Service
class GreeterService extends GreeterGrpc.GreeterImplBase {     // generated base class
    @Override
    public void sayHello(HelloRequest request, StreamObserver<HelloReply> responses) {
        responses.onNext(HelloReply.newBuilder().setMessage("Hello, " + request.getName()).build());
        responses.onCompleted();
    }
}`, { title: 'Server', label: 'grpcurl -plaintext -d \'{"name":"Alex"}\' localhost:9090 greeting.Greeter/SayHello', result: `{
  "message": "Hello, Alex"
}` }),
    p('Boot finds every bean that implements <code>BindableService</code> (the generated base classes do) and serves it. A client uses <code>spring-boot-starter-grpc-client</code> and an injected generated stub.'),
    table(['', 'REST / JSON', 'gRPC'], [
      ['Format', 'JSON text', 'Protocol Buffers (binary)'], ['Contract', 'OpenAPI (optional)', '<code>.proto</code> (required)'], ['Browsers', 'Excellent', 'Needs a proxy (gRPC-Web)'],
      ['Streaming', 'Limited (SSE, chunked)', 'Built in, both directions'], ['Best for', 'Public APIs', 'Internal service-to-service calls'],
    ]),
    BP.next('sbp_examples', 'see every example and the complete projects.'),
  ]);
})();
