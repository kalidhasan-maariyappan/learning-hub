// Spring Boot Learning Path, part 6: the "All Examples" index and complete example projects.
// Each project combines several lessons into one application that runs in the Maven lab.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const BP = JT.bootPath;
  const { page, run, shown, main, webStart, callHelper } = BP;

  // ------------------------------------------------------------------ All examples
  // Built from the pages themselves, so it always lists exactly the examples the lessons contain.
  page('sbp_examples', () => {
    const out = [
      p('Every example in the Spring Boot Learning Path, grouped like the sidebar. <span class="badge-run">Run</span> examples are complete Spring Boot 4.1 programs you can edit and run with Maven on the lesson page; <span class="badge-show">Read</span> examples need infrastructure the lab does not start (Kafka, RabbitMQ, PostgreSQL, Docker) and show what they print.'),
    ];
    let runnable = 0, shownCount = 0;
    const sections = [];
    for (const [group, items] of JT.bootPathGroups) {
      const rows = [];
      for (const [slug, title] of items) {
        if (slug === 'sbp_examples' || !JT.pages[slug]) continue;
        const { html } = JT.renderBody(slug);
        // Runnable labs, plus shown programs that come with their output; plain config files are left out.
        const found = html.split('<div class="example"><h3>').slice(1)
          .map((box) => ({ title: box.slice(0, box.indexOf('</h3>')), run: box.includes('spring-project-lab'), output: box.includes('<pre class="output"') }))
          .filter((e) => e.run || e.output);
        if (!found.length) continue;
        found.forEach((e) => (e.run ? runnable++ : shownCount++));
        rows.push('<li>' + JT.link(slug, esc(title)) + '<ul class="example-index">' + found.map((e) =>
          '<li><span class="' + (e.run ? 'badge-run">Run' : 'badge-show">Read') + '</span> ' + e.title + '</li>').join('') + '</ul></li>');
      }
      if (rows.length) sections.push(h2(esc(group.replace(/^Spring Boot /, ''))) + '<ul class="example-pages">' + rows.join('') + '</ul>');
    }
    out.push(p('<strong>' + (runnable + shownCount) + ' examples</strong>: ' + runnable + ' runnable, ' + shownCount + ' to read.'));
    out.push(h2('Complete projects'), table(['Project', 'Combines', 'Runs here'], [
      [JT.link('sbp_project_patient', 'Patient API'), 'REST, validation, JPA, transactions, paging, optimistic locking, ProblemDetail', 'Yes'],
      [JT.link('sbp_project_secure', 'Secured API'), 'OAuth2 resource server, JWT roles, ownership checks', 'Yes'],
      [JT.link('sbp_project_claims', 'Claims Events'), 'Outbox, event relay, idempotent consumer, Kafka mapping', 'Yes (in-memory broker)'],
      [JT.link('sbp_project_notifications', 'Notifications'), 'RabbitMQ exchanges, workers, retries, DLQ, Testcontainers', 'Needs RabbitMQ'],
      [JT.link('sbp_project_catalog', 'Cached Catalog'), 'Caching with eviction, query counts, Actuator caches endpoint', 'Yes'],
      [JT.link('sbp_project_production', 'Production Service'), 'Request ids in logs, health, metrics, info, deployment checklist', 'Yes'],
    ]));
    return out.concat(sections);
  });

  const appImports = `import java.net.URI;
import java.util.*;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
`;
  const quietWeb = ['"server.port=0"', '"spring.jpa.open-in-view=false"', '"logging.level.org.springframework.web=error"'];

  // ------------------------------------------------------------------ Patient API
  page('sbp_project_patient', () => [
    p('A complete CRUD service for patients — the first thing most Spring Boot developers build at work. It brings together ' +
      [['sbp_rest', 'REST'], ['sbp_validation', 'validation'], ['sbp_jpa', 'JPA'], ['sbp_transactions', 'transactions'], ['sbp_queries', 'paging'], ['sbp_errors', 'error handling']].map(([s, t]) => JT.link(s, t)).join(', ') + ', plus optimistic locking.'),
    h2('Project layout'),
    BP.file(`patient-api/
├── pom.xml                         webmvc, validation, data-jpa, flyway, postgresql, test
└── src/main/java/com/example/patients/
    ├── PatientApiApplication.java
    └── patient/
        ├── Patient.java            entity with @Version
        ├── PatientRepository.java
        ├── PatientService.java     @Transactional business rules
        ├── PatientController.java  HTTP only
        ├── PatientDtos.java        request/response records with validation
        └── ApiErrors.java          ProblemDetail for every error`, 'Files (combined into one file below so it runs in the lab)'),
    h2('The application'),
    run(appImports + `import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.MethodArgumentNotValidException;

// ---------------------------------------------------------------- persistence
@Entity
@Table(name = "patients")
class Patient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @Column(nullable = false) String name;
    @Column(nullable = false, unique = true) String email;
    @Version long version;                       // incremented on every update
    protected Patient() { }
    Patient(String name, String email) { this.name = name; this.email = email; }
}

interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByEmail(String email);
    Page<Patient> findByNameContainingIgnoreCase(String name, Pageable pageable);
}

// ---------------------------------------------------------------- API models
record CreatePatientRequest(@NotBlank @Size(max = 100) String name, @NotBlank @Email String email) { }
record RenamePatientRequest(@NotBlank String name, long version) { }
record PatientResponse(long id, String name, String email, long version) {
    static PatientResponse of(Patient p) { return new PatientResponse(p.id, p.name, p.email, p.version); }
}
record PageResponse<T>(List<T> items, int page, int size, long total) { }

class PatientNotFoundException extends RuntimeException {
    PatientNotFoundException(long id) { super("Patient " + id + " not found"); }
}
class DuplicateEmailException extends RuntimeException {
    DuplicateEmailException(String email) { super("Email " + email + " is already registered"); }
}

// ---------------------------------------------------------------- business layer
@Service
class PatientService {
    private final PatientRepository patients;
    PatientService(PatientRepository patients) { this.patients = patients; }

    @Transactional
    public PatientResponse create(CreatePatientRequest request) {
        if (patients.existsByEmail(request.email())) throw new DuplicateEmailException(request.email());
        return PatientResponse.of(patients.save(new Patient(request.name(), request.email())));
    }

    @Transactional(readOnly = true)
    public PatientResponse get(long id) {
        return PatientResponse.of(patients.findById(id).orElseThrow(() -> new PatientNotFoundException(id)));
    }

    @Transactional(readOnly = true)
    public PageResponse<PatientResponse> search(String name, Pageable pageable) {
        Page<Patient> page = patients.findByNameContainingIgnoreCase(name, pageable);
        return new PageResponse<>(page.map(PatientResponse::of).getContent(), page.getNumber(), page.getSize(), page.getTotalElements());
    }

    @Transactional
    public PatientResponse rename(long id, RenamePatientRequest request) {
        Patient patient = patients.findById(id).orElseThrow(() -> new PatientNotFoundException(id));
        if (patient.version != request.version()) throw new ObjectOptimisticLockingFailureException(Patient.class, id);
        patient.name = request.name();
        return PatientResponse.of(patients.saveAndFlush(patient));
    }
}

// ---------------------------------------------------------------- web layer
@RestController
@RequestMapping("/api/patients")
class PatientController {
    private final PatientService service;
    PatientController(PatientService service) { this.service = service; }

    @PostMapping
    ResponseEntity<PatientResponse> create(@Valid @RequestBody CreatePatientRequest request) {
        PatientResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/patients/" + created.id())).body(created);
    }

    @GetMapping("/{id}")
    PatientResponse get(@PathVariable long id) { return service.get(id); }

    @GetMapping
    PageResponse<PatientResponse> search(@RequestParam(defaultValue = "") String name,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size) {
        return service.search(name, PageRequest.of(page, Math.min(size, 100), Sort.by("name")));
    }

    @PutMapping("/{id}")
    PatientResponse rename(@PathVariable long id, @Valid @RequestBody RenamePatientRequest request) {
        return service.rename(id, request);
    }
}

@RestControllerAdvice
class ApiErrors {
    @ExceptionHandler(PatientNotFoundException.class)
    ProblemDetail notFound(PatientNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(DuplicateEmailException.class)
    ProblemDetail duplicate(DuplicateEmailException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    ProblemDetail staleVersion(ObjectOptimisticLockingFailureException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Patient was changed by someone else; reload and try again");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail invalid(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Request has invalid fields");
        Map<String, String> errors = new TreeMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        problem.setProperty("errors", errors);
        return problem;
    }
}

` + main(quietWeb, webStart + `
            String jane = "{\\"name\\":\\"Jane Doe\\",\\"email\\":\\"jane@example.com\\"}";
            System.out.println("create        " + call(http, HttpMethod.POST, "/api/patients", jane));
            System.out.println("create        " + call(http, HttpMethod.POST, "/api/patients", "{\\"name\\":\\"Omar Ali\\",\\"email\\":\\"omar@example.com\\"}"));
            System.out.println("duplicate     " + call(http, HttpMethod.POST, "/api/patients", jane));
            System.out.println("invalid       " + call(http, HttpMethod.POST, "/api/patients", "{\\"name\\":\\"\\",\\"email\\":\\"nope\\"}"));
            System.out.println("get           " + call(http, HttpMethod.GET, "/api/patients/1", null));
            System.out.println("search        " + call(http, HttpMethod.GET, "/api/patients?name=a&size=1", null));
            System.out.println("rename v0     " + call(http, HttpMethod.PUT, "/api/patients/1", "{\\"name\\":\\"Jane Smith\\",\\"version\\":0}"));
            System.out.println("rename v0 again " + call(http, HttpMethod.PUT, "/api/patients/1", "{\\"name\\":\\"Jane X\\",\\"version\\":0}"));
            System.out.println("missing       " + call(http, HttpMethod.GET, "/api/patients/99", null));`, callHelper),
    `create        201 {"id":1,"name":"Jane Doe","email":"jane@example.com","version":0}
create        201 {"id":2,"name":"Omar Ali","email":"omar@example.com","version":0}
duplicate     409 {"detail":"Email jane@example.com is already registered","instance":"/api/patients","status":409,"title":"Conflict"}
invalid       400 {"detail":"Request has invalid fields","instance":"/api/patients","status":400,"title":"Bad Request","errors":{"email":"must be a well-formed email address","name":"must not be blank"}}
get           200 {"id":1,"name":"Jane Doe","email":"jane@example.com","version":0}
search        200 {"items":[{"id":1,"name":"Jane Doe","email":"jane@example.com","version":0}],"page":0,"size":1,"total":2}
rename v0     200 {"id":1,"name":"Jane Smith","email":"jane@example.com","version":1}
rename v0 again 409 {"detail":"Patient was changed by someone else; reload and try again","instance":"/api/patients/1","status":409,"title":"Conflict"}
missing       404 {"detail":"Patient 99 not found","instance":"/api/patients/99","status":404,"title":"Not Found"}`, 'app', 'Patient API: every request type'),
    h2('What to notice'),
    ul(['<strong>Layers:</strong> the controller only maps HTTP; rules (unique email, version check) live in the service; the service returns DTOs, never entities.',
      '<strong>Validation</strong> rejects bad input before the service runs; the error lists each field.',
      '<strong>Optimistic locking:</strong> the client sends back the <code>version</code> it read. A second update with the old version gets 409 instead of silently overwriting the first change.',
      '<strong>Paging</strong> is capped at 100 rows, and the response says how many rows exist in total.',
      '<strong>Errors</strong> share one <code>ProblemDetail</code> format.']),
    h2('Make it production-ready'),
    ol(['Switch to PostgreSQL and Flyway as in ' + JT.link('sbp_postgres', 'PostgreSQL and Flyway') + '; set <code>ddl-auto=validate</code>.',
      'Add a <code>@DataJpaTest</code> with Testcontainers for the repository and a <code>@WebMvcTest</code> for the controller.',
      'Protect it with the ' + JT.link('sbp_project_secure', 'Secured API') + ' configuration.']),
    BP.tip('Try it yourself: add <code>DELETE /api/patients/{id}</code> returning 204, and a <code>city</code> field with a search parameter.'),
  ], { title: 'Project: Patient API', h1: 'Project: <span>Patient API</span>' });

  // ------------------------------------------------------------------ Secured API
  page('sbp_project_secure', () => [
    p('An API protected as most companies do it: users log in at an identity provider, and the API checks the JWT. Roles come from a <code>roles</code> claim; patients may only read their own record, while staff may read everyone\'s. Builds on ' + JT.link('sbp_jwt', 'OAuth2 Resource Server') + ' and ' + JT.link('sbp_security_rules', 'Authorization Rules') + '.'),
    run(`import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.List;
import com.nimbusds.jose.jwk.*;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

record MedicalRecord(String patient, String summary) { }

@RestController
@RequestMapping("/api")
class RecordController {
    @GetMapping("/patients/{patient}/record")
    @PreAuthorize("hasRole('STAFF') or #patient == authentication.name")
    MedicalRecord record(@PathVariable String patient) {
        return new MedicalRecord(patient, "no known allergies");
    }

    @DeleteMapping("/patients/{patient}/record")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> delete(@PathVariable String patient) { return ResponseEntity.noContent().build(); }
}

@Configuration
@EnableMethodSecurity
class SecurityConfig {
    static final String ISSUER = "https://identity.example.com/realms/clinic";

    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth -> oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(rolesFromClaim())))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable());
        return http.build();
    }

    // "roles": ["STAFF"]  ->  authority ROLE_STAFF
    JwtAuthenticationConverter rolesFromClaim() {
        JwtGrantedAuthoritiesConverter authorities = new JwtGrantedAuthoritiesConverter();
        authorities.setAuthoritiesClaimName("roles");
        authorities.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(authorities);
        return converter;
    }

    @Bean KeyPair signingKeys() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        return generator.generateKeyPair();
    }

    @Bean JwtDecoder jwtDecoder(KeyPair keys) {
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withPublicKey((RSAPublicKey) keys.getPublic()).build();
        decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(ISSUER));
        return decoder;
    }
}

` + main(['"server.port=0"'], webStart + `
            KeyPair keys = context.getBean(KeyPair.class);
            JwtEncoder idp = new NimbusJwtEncoder(new ImmutableJWKSet<>(new JWKSet(
                new RSAKey.Builder((RSAPublicKey) keys.getPublic()).privateKey((RSAPrivateKey) keys.getPrivate()).build())));
            String jane = token(idp, "jane", List.of("PATIENT"));
            String nurse = token(idp, "nurse-kim", List.of("STAFF"));
            String admin = token(idp, "admin", List.of("STAFF", "ADMIN"));

            System.out.println("jane  reads jane's record   " + call(http, HttpMethod.GET, "/api/patients/jane/record", jane));
            System.out.println("jane  reads omar's record   " + call(http, HttpMethod.GET, "/api/patients/omar/record", jane));
            System.out.println("nurse reads omar's record   " + call(http, HttpMethod.GET, "/api/patients/omar/record", nurse));
            System.out.println("nurse deletes a record      " + call(http, HttpMethod.DELETE, "/api/patients/omar/record", nurse));
            System.out.println("admin deletes a record      " + call(http, HttpMethod.DELETE, "/api/patients/omar/record", admin));
            System.out.println("no token                    " + call(http, HttpMethod.GET, "/api/patients/jane/record", null));`, `
    static String token(JwtEncoder idp, String user, List<String> roles) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer(SecurityConfig.ISSUER).subject(user)
            .claim("roles", roles).issuedAt(now).expiresAt(now.plusSeconds(300)).build();
        return idp.encode(JwtEncoderParameters.from(JwsHeader.with(SignatureAlgorithm.RS256).build(), claims)).getTokenValue();
    }

    static String call(RestClient http, HttpMethod method, String path, String token) {
        var request = http.method(method).uri(path);
        if (token != null) request.headers(h -> h.setBearerAuth(token));
        return request.exchange((req, res) -> res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`),
    `jane  reads jane's record   200 {"patient":"jane","summary":"no known allergies"}
jane  reads omar's record   403
nurse reads omar's record   200 {"patient":"omar","summary":"no known allergies"}
nurse deletes a record      403
admin deletes a record      204
no token                    401 `, 'oauth2', 'Secured API: roles and ownership'),
    h2('What to notice'),
    ul(['A <code>JwtAuthenticationConverter</code> maps the identity provider\'s <code>roles</code> claim to Spring roles. (Keycloak puts roles in <code>realm_access.roles</code>; adapt the converter to your provider.)',
      'The ownership rule <code>#patient == authentication.name</code> stops patients from reading each other\'s records (an IDOR vulnerability).',
      'Deny by default: everything except health requires a token.',
      'In production replace the key pair and decoder with one line: <code>spring.security.oauth2.resourceserver.jwt.issuer-uri</code>.']),
    BP.tip('Try it yourself: add an <code>audience</code> check with <code>JwtValidators.createDefaultWithValidators(...)</code> and a <code>JwtClaimValidator</code> for <code>aud</code>.'),
  ], { title: 'Project: Secured API', h1: 'Project: <span>Secured API</span>' });

  // ------------------------------------------------------------------ Claims Events
  page('sbp_project_claims', () => [
    p('An event-driven insurance claims flow: an API accepts a claim, a transactional outbox publishes <code>ClaimSubmitted</code>, a processor decides and publishes <code>ClaimDecided</code>, and a notifier reacts. The broker here is an in-memory stand-in so the whole flow runs in the lab; the mapping to Kafka follows the code.'),
    BP.file(`POST /claims ──▶ ClaimService (one transaction: claim row + outbox row)
                     │
               OutboxRelay ──▶ "claim-submitted" ──▶ ClaimProcessor (idempotent)
                                                       │ decides, writes outbox row
               OutboxRelay ──▶ "claim-decided"   ──▶ CustomerNotifier`, 'The flow'),
    run(appImports + `import java.time.Instant;
import java.util.function.Consumer;
import tools.jackson.databind.ObjectMapper;

// ---------------------------------------------------------------- events
record ClaimSubmitted(String claimId, String policyId, long amountCents) { }
record ClaimDecided(String claimId, String decision) { }

// ---------------------------------------------------------------- persistence
@Entity class Claim {
    @Id String id; String policyId; long amountCents; String status;
    protected Claim() { }
    Claim(String id, String policyId, long amountCents) { this.id = id; this.policyId = policyId; this.amountCents = amountCents; this.status = "SUBMITTED"; }
}
@Entity class OutboxEvent {
    @Id @GeneratedValue Long id; String topic; String messageKey; @Column(length = 2000) String payload; Instant publishedAt;
    protected OutboxEvent() { }
    OutboxEvent(String topic, String key, String payload) { this.topic = topic; this.messageKey = key; this.payload = payload; }
}
@Entity class ProcessedMessage {
    @Id String id;
    protected ProcessedMessage() { }
    ProcessedMessage(String id) { this.id = id; }
}
interface ClaimRepository extends JpaRepository<Claim, String> { }
interface OutboxRepository extends JpaRepository<OutboxEvent, Long> { List<OutboxEvent> findByPublishedAtIsNullOrderByIdAsc(); }
interface ProcessedRepository extends JpaRepository<ProcessedMessage, String> { }

// ---------------------------------------------------------------- broker (KafkaTemplate + @KafkaListener in production)
@Component
class InMemoryBroker {
    private final Map<String, List<Consumer<String>>> listeners = new HashMap<>();
    private String lastTopic, lastPayload;
    void subscribe(String topic, Consumer<String> listener) { listeners.computeIfAbsent(topic, t -> new ArrayList<>()).add(listener); }
    void send(String topic, String key, String payload) {
        lastTopic = topic; lastPayload = payload;
        listeners.getOrDefault(topic, List.of()).forEach(l -> l.accept(payload));
    }
    void redeliverLast() { listeners.getOrDefault(lastTopic, List.of()).forEach(l -> l.accept(lastPayload)); }
}

@Component
class Outbox {
    private final OutboxRepository events; private final ObjectMapper json;
    Outbox(OutboxRepository events, ObjectMapper json) { this.events = events; this.json = json; }
    void add(String topic, String key, Object event) { events.save(new OutboxEvent(topic, key, json.writeValueAsString(event))); }
}

@Component
class OutboxRelay {
    private final OutboxRepository events; private final InMemoryBroker broker;
    OutboxRelay(OutboxRepository events, InMemoryBroker broker) { this.events = events; this.broker = broker; }

    @Transactional                                     // @Scheduled(fixedDelay = 500) in production
    public int publishPending() {
        List<OutboxEvent> pending = events.findByPublishedAtIsNullOrderByIdAsc();
        pending.forEach(e -> { broker.send(e.topic, e.messageKey, e.payload); e.publishedAt = Instant.now(); });
        return pending.size();
    }
}

// ---------------------------------------------------------------- business
@Service
class ClaimService {
    private final ClaimRepository claims; private final Outbox outbox;
    ClaimService(ClaimRepository claims, Outbox outbox) { this.claims = claims; this.outbox = outbox; }

    @Transactional
    public void submit(ClaimSubmitted claim) {
        claims.save(new Claim(claim.claimId(), claim.policyId(), claim.amountCents()));
        outbox.add("claim-submitted", claim.claimId(), claim);
    }
}

@Service
class ClaimProcessor {
    static final long AUTO_APPROVE_LIMIT = 500_000;
    private final ClaimRepository claims; private final ProcessedRepository processed; private final Outbox outbox; private final ObjectMapper json;
    ClaimProcessor(ClaimRepository claims, ProcessedRepository processed, Outbox outbox, ObjectMapper json) {
        this.claims = claims; this.processed = processed; this.outbox = outbox; this.json = json;
    }

    @Transactional
    public void onSubmitted(String payload) {
        ClaimSubmitted event = json.readValue(payload, ClaimSubmitted.class);
        String messageId = "claim-submitted:" + event.claimId();
        if (processed.existsById(messageId)) {             // at-least-once delivery: ignore duplicates
            System.out.println("  duplicate " + messageId + " ignored");
            return;
        }
        Claim claim = claims.findById(event.claimId()).orElseThrow();
        claim.status = event.amountCents() <= AUTO_APPROVE_LIMIT ? "APPROVED" : "NEEDS_REVIEW";
        processed.save(new ProcessedMessage(messageId));
        outbox.add("claim-decided", claim.id, new ClaimDecided(claim.id, claim.status));
        System.out.println("  processor: " + claim.id + " -> " + claim.status);
    }
}

@Component
class Subscriptions {                                   // the proxied beans are injected, so @Transactional applies
    Subscriptions(InMemoryBroker broker, ClaimProcessor processor) {
        broker.subscribe("claim-submitted", processor::onSubmitted);
        broker.subscribe("claim-decided", payload -> System.out.println("  notifier: tell customer " + payload));
    }
}

@RestController
@RequestMapping("/claims")
class ClaimController {
    private final ClaimService service; private final ClaimRepository claims;
    ClaimController(ClaimService service, ClaimRepository claims) { this.service = service; this.claims = claims; }

    @PostMapping
    ResponseEntity<Void> submit(@RequestBody ClaimSubmitted claim) {
        service.submit(claim);
        return ResponseEntity.accepted().location(URI.create("/claims/" + claim.claimId())).build();
    }

    @GetMapping("/{id}")
    Map<String, String> status(@PathVariable String id) {
        return Map.of("status", claims.findById(id).map(c -> c.status).orElse("UNKNOWN"));
    }
}

` + main(quietWeb, webStart + `
            OutboxRelay relay = context.getBean(OutboxRelay.class);
            System.out.println("POST CLM-1  " + call(http, HttpMethod.POST, "/claims", "{\\"claimId\\":\\"CLM-1\\",\\"policyId\\":\\"POL-9\\",\\"amountCents\\":150000}"));
            System.out.println("POST CLM-2  " + call(http, HttpMethod.POST, "/claims", "{\\"claimId\\":\\"CLM-2\\",\\"policyId\\":\\"POL-3\\",\\"amountCents\\":900000}"));
            System.out.println("status CLM-1 before relay " + call(http, HttpMethod.GET, "/claims/CLM-1", null));

            System.out.println("relay: published " + relay.publishPending());
            System.out.println("broker redelivers the last claim-submitted message:");
            context.getBean(InMemoryBroker.class).redeliverLast();
            System.out.println("relay: published " + relay.publishPending());

            System.out.println("status CLM-1 " + call(http, HttpMethod.GET, "/claims/CLM-1", null));
            System.out.println("status CLM-2 " + call(http, HttpMethod.GET, "/claims/CLM-2", null));`, callHelper),
    `POST CLM-1  202
POST CLM-2  202
status CLM-1 before relay 200 {"status":"SUBMITTED"}
  processor: CLM-1 -> APPROVED
  processor: CLM-2 -> NEEDS_REVIEW
relay: published 2
broker redelivers the last claim-submitted message:
  duplicate claim-submitted:CLM-2 ignored
  notifier: tell customer {"claimId":"CLM-1","decision":"APPROVED"}
  notifier: tell customer {"claimId":"CLM-2","decision":"NEEDS_REVIEW"}
relay: published 2
status CLM-1 200 {"status":"APPROVED"}
status CLM-2 200 {"status":"NEEDS_REVIEW"}`, 'app', 'Claims: outbox, relay and idempotent processing'),
    h2('What to notice'),
    ul(['The API answers <strong>202 Accepted</strong>: the claim is stored, the decision comes later.',
      'Nothing is sent to the broker inside the request; the outbox row is committed with the claim, then the relay publishes it.',
      'The processor records the message id in <code>ProcessedMessage</code> in the same transaction as its decision, so a redelivered message is ignored.',
      'Events are JSON records — a contract other teams depend on. Add fields compatibly; never rename or remove them silently.']),
    h2('The same flow on Kafka'),
    shown(`// Relay: send through Kafka and wait for the broker acknowledgement before marking the row
kafka.send(event.topic, event.messageKey, event.payload).get(5, TimeUnit.SECONDS);
event.publishedAt = Instant.now();

// Processor: a listener instead of the in-memory subscription
@KafkaListener(topics = "claim-submitted", groupId = "claim-processor")
public void onSubmitted(String payload) { ... same idempotent, transactional body ... }`, { title: 'Kafka version', label: 'Dependencies', result: 'spring-boot-starter-kafka · KafkaTemplate<String, String> · DefaultErrorHandler + DeadLetterPublishingRecoverer' }),
    BP.tip('Try it yourself: make claims above 2,000,000 cents publish <code>ClaimRejected</code>, and add a <code>GET /claims/{id}/events</code> endpoint that lists the outbox rows for one claim.'),
  ], { title: 'Project: Claims Events', h1: 'Project: <span>Claims Events</span>' });

  // ------------------------------------------------------------------ Notifications (RabbitMQ)
  page('sbp_project_notifications', () => [
    p('A notification service on RabbitMQ: the order service publishes to one exchange; email and SMS workers consume their own queues; failures retry and then go to dead-letter queues. RabbitMQ is not available in the lab, so this project runs on your machine with Docker.'),
    BP.file(`order-service ──▶ notification.exchange (topic)
                        ├── "notify.email.*" ──▶ notification.email ──▶ EmailWorker ──(fails 3×)──▶ notification.dlx ──▶ notification.email.dlq
                        └── "notify.sms.*"   ──▶ notification.sms   ──▶ SmsWorker`, 'Topology'),
    h2('1. Run RabbitMQ'),
    K.show(`services:
  rabbitmq:
    image: rabbitmq:4.2-management
    ports: ["5672:5672", "15672:15672"]`, 'compose.yaml', 'yaml'),
    h2('2. Configuration'),
    K.show(`spring:
  rabbitmq:
    host: localhost
    publisher-confirm-type: correlated
    publisher-returns: true
    listener:
      simple:
        prefetch: 10
        retry: { enabled: true, max-attempts: 3, initial-interval: 1s, multiplier: 2 }
        default-requeue-rejected: false`, 'application.yml', 'yaml'),
    h2('3. Code'),
    shown(`@Configuration
class NotificationTopology {
    static final String EXCHANGE = "notification.exchange", DLX = "notification.dlx";

    @Bean TopicExchange notifications() { return new TopicExchange(EXCHANGE); }
    @Bean DirectExchange deadLetters() { return new DirectExchange(DLX); }

    @Bean Queue email() { return QueueBuilder.durable("notification.email").deadLetterExchange(DLX).deadLetterRoutingKey("email").build(); }
    @Bean Queue sms()   { return QueueBuilder.durable("notification.sms").deadLetterExchange(DLX).deadLetterRoutingKey("sms").build(); }
    @Bean Queue emailDlq() { return QueueBuilder.durable("notification.email.dlq").build(); }

    @Bean Binding emailBinding() { return BindingBuilder.bind(email()).to(notifications()).with("notify.email.*"); }
    @Bean Binding smsBinding()   { return BindingBuilder.bind(sms()).to(notifications()).with("notify.sms.*"); }
    @Bean Binding emailDlqBinding() { return BindingBuilder.bind(emailDlq()).to(deadLetters()).with("email"); }

    @Bean MessageConverter json() { return new JacksonJsonMessageConverter(); }
}

record Notification(String id, String to, String text) { }

@Service
class NotificationPublisher {
    private final RabbitTemplate rabbit;
    NotificationPublisher(RabbitTemplate rabbit) { this.rabbit = rabbit; }

    void email(Notification n) { rabbit.convertAndSend(NotificationTopology.EXCHANGE, "notify.email.order", n, new CorrelationData(n.id())); }
    void sms(Notification n)   { rabbit.convertAndSend(NotificationTopology.EXCHANGE, "notify.sms.order", n, new CorrelationData(n.id())); }
}

@Component
class EmailWorker {
    private final Set<String> sent = ConcurrentHashMap.newKeySet();   // use a database table in production

    @RabbitListener(queues = "notification.email")
    void handle(Notification n) {
        if (!sent.add(n.id())) return;                                  // idempotent
        if (n.to().isBlank()) throw new AmqpRejectAndDontRequeueException("no address");
        System.out.println("EMAIL " + n.to() + ": " + n.text());
    }
}

@Component
class SmsWorker {
    @RabbitListener(queues = "notification.sms", concurrency = "2-4")
    void handle(Notification n) { System.out.println("SMS " + n.to() + ": " + n.text()); }
}`, { title: 'Topology, publisher and workers', label: 'Application log', result: `EMAIL jane@example.com: Order A-100 shipped
SMS +4790000000: Order A-100 shipped
# a message with an empty address is rejected and lands in notification.email.dlq` }),
    h2('4. Integration test'),
    K.show(`@SpringBootTest
@Testcontainers
class NotificationFlowIT {
    @Container @ServiceConnection
    static RabbitMQContainer rabbit = new RabbitMQContainer("rabbitmq:4.2-management");

    @Autowired NotificationPublisher publisher;
    @Autowired RabbitTemplate rabbitTemplate;

    @Test
    void invalidEmailEndsInDeadLetterQueue() {
        publisher.email(new Notification("n-1", "", "hello"));

        await().atMost(Duration.ofSeconds(10)).untilAsserted(() ->
            assertThat(rabbitTemplate.receive("notification.email.dlq")).isNotNull());
    }
}`, 'NotificationFlowIT.java (org.testcontainers.rabbitmq.RabbitMQContainer)', 'java'),
    h2('What to notice'),
    ul(['A topic exchange lets new notification types (<code>notify.email.invoice</code>) reuse the same queues.', 'Malformed messages are rejected without requeue and dead-lettered; temporary failures are retried with backoff.',
      'Workers are idempotent by notification id because RabbitMQ can redeliver.', 'Publisher confirms (<code>CorrelationData</code>) tell the publisher which messages the broker accepted.']),
  ], { title: 'Project: Notifications', h1: 'Project: <span>Notifications</span>' });

  // ------------------------------------------------------------------ Cached catalog
  page('sbp_project_catalog', () => [
    p('A product catalog where reads are frequent and writes are rare — the classic cache use case. The program counts SQL statements so you can see the cache working, and shows the Actuator <code>caches</code> endpoint.'),
    run(appImports + `import org.hibernate.SessionFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;

@Entity class Product {
    @Id String sku; String name; int priceCents;
    protected Product() { }
    Product(String sku, String name, int priceCents) { this.sku = sku; this.name = name; this.priceCents = priceCents; }
}
interface ProductRepository extends JpaRepository<Product, String> { }

record ProductView(String sku, String name, int priceCents) {
    static ProductView of(Product p) { return new ProductView(p.sku, p.name, p.priceCents); }
}

@Service
class CatalogService {
    private final ProductRepository products;
    CatalogService(ProductRepository products) { this.products = products; }

    @Cacheable(cacheNames = "products", key = "#sku", sync = true)     // sync: one loader per key (no stampede)
    @Transactional(readOnly = true)
    public ProductView find(String sku) {
        return products.findById(sku).map(ProductView::of).orElseThrow();
    }

    @CacheEvict(cacheNames = "products", key = "#sku")                // runs after a successful update
    @Transactional
    public void changePrice(String sku, int priceCents) {
        products.findById(sku).orElseThrow().priceCents = priceCents;
    }
}

@RestController
@RequestMapping("/products")
class ProductController {
    private final CatalogService catalog;
    ProductController(CatalogService catalog) { this.catalog = catalog; }

    @GetMapping("/{sku}") ProductView get(@PathVariable String sku) { return catalog.find(sku); }

    @PutMapping("/{sku}/price") ResponseEntity<Void> price(@PathVariable String sku, @RequestBody int priceCents) {
        catalog.changePrice(sku, priceCents);
        return ResponseEntity.noContent().build();
    }
}

@EnableCaching
` + main([...quietWeb, '"spring.jpa.properties.hibernate.generate_statistics=true"', '"logging.level.org.hibernate.engine.internal.StatisticalLoggingSessionEventListener=off"',
      '"management.endpoints.web.exposure.include=caches"'], webStart + `
            context.getBean(ProductRepository.class).save(new Product("A-1", "Desk lamp", 2_999));
            var stats = context.getBean(EntityManagerFactory.class).unwrap(SessionFactory.class).getStatistics();
            stats.clear();

            for (int i = 1; i <= 3; i++)
                System.out.println("GET #" + i + "  " + call(http, HttpMethod.GET, "/products/A-1", null) + "  SQL so far: " + stats.getPrepareStatementCount());
            System.out.println("PUT price " + call(http, HttpMethod.PUT, "/products/A-1/price", "2499") + "  SQL so far: " + stats.getPrepareStatementCount());
            System.out.println("GET #4  " + call(http, HttpMethod.GET, "/products/A-1", null) + "  SQL so far: " + stats.getPrepareStatementCount());
            System.out.println("caches " + call(http, HttpMethod.GET, "/actuator/caches", null));`, callHelper),
    `GET #1  200 {"sku":"A-1","name":"Desk lamp","priceCents":2999}  SQL so far: 1
GET #2  200 {"sku":"A-1","name":"Desk lamp","priceCents":2999}  SQL so far: 1
GET #3  200 {"sku":"A-1","name":"Desk lamp","priceCents":2999}  SQL so far: 1
PUT price 204   SQL so far: 3
GET #4  200 {"sku":"A-1","name":"Desk lamp","priceCents":2499}  SQL so far: 4
caches 200 {"cacheManagers":{"cacheManager":{"caches":{"products":{"target":"java.util.concurrent.ConcurrentHashMap"}}}}}`, 'app', 'Catalog: cache hits, eviction and query counts'),
    h2('What to notice'),
    ul(['Only the first GET touches the database; GETs 2 and 3 are served from the cache.', 'The price change runs 2 statements (select + update) and evicts the entry, so GET 4 loads the new price.',
      'The cache stores an immutable <code>ProductView</code>, not the JPA entity.', '<code>sync = true</code> makes concurrent misses for the same key wait for one database load.',
      'Switching to Redis is configuration only (' + JT.link('sbp_redis', 'Redis Cache') + '); then all instances share the cache and see the eviction.']),
    BP.mistake('Caching JPA entities. They can hold lazy proxies and session state, and a caller can modify the cached object for everyone.'),
  ], { title: 'Project: Cached Catalog', h1: 'Project: <span>Cached Catalog</span>' });

  // ------------------------------------------------------------------ Production service
  page('sbp_project_production', () => [
    p('The pieces that turn a working service into one you can run and support: a request id on every log line and response, business metrics, health with a dependency check, build info, and safe defaults. The checklist below is what reviewers look for before a first production release.'),
    run(appImports + `import java.io.IOException;
import io.micrometer.core.instrument.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.slf4j.*;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
class RequestIdFilter extends OncePerRequestFilter {           // correlate logs, traces and support tickets
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String id = Optional.ofNullable(request.getHeader("X-Request-Id")).orElse(UUID.randomUUID().toString());
        MDC.put("requestId", id);
        response.setHeader("X-Request-Id", id);
        try { chain.doFilter(request, response); } finally { MDC.remove("requestId"); }
    }
}

@RestController
class BookingController {
    private static final Logger log = LoggerFactory.getLogger(BookingController.class);
    private final Counter bookings;
    BookingController(MeterRegistry registry) { bookings = registry.counter("bookings.created", "type", "online"); }

    @PostMapping("/bookings")
    ResponseEntity<Void> book() {
        log.info("Booking created");
        bookings.increment();
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

` + main([...quietWeb, '"logging.pattern.console=%-5level [%X{requestId:-none}] %logger{0} - %msg%n"', '"logging.level.javatrail.lab.BookingController=info"',
      '"management.endpoints.web.exposure.include=health,info,metrics"', '"management.endpoint.health.group.readiness.include=readinessState,db"',
      '"management.info.env.enabled=true"', '"info.app.name=booking-service"', '"info.app.version=2.3.1"'], webStart + `
            var created = http.post().uri("/bookings").header("X-Request-Id", "req-7f3a").retrieve().toBodilessEntity();
            System.out.println("POST /bookings -> " + created.getStatusCode().value() + ", X-Request-Id=" + created.getHeaders().getFirst("X-Request-Id"));
            http.post().uri("/bookings").header("X-Request-Id", "req-91bc").retrieve().toBodilessEntity();

            System.out.println("readiness " + call(http, HttpMethod.GET, "/actuator/health/readiness", null));
            System.out.println("info      " + call(http, HttpMethod.GET, "/actuator/info", null));
            System.out.println("metric    " + call(http, HttpMethod.GET, "/actuator/metrics/bookings.created", null));`, callHelper),
    `INFO  [req-7f3a] BookingController - Booking created
POST /bookings -> 201, X-Request-Id=req-7f3a
INFO  [req-91bc] BookingController - Booking created
readiness 200 {"status":"UP"}
info      200 {"app":{"version":"2.3.1","name":"booking-service"}}
metric    200 {"availableTags":[{"tag":"type","values":["online"]}],"measurements":[{"statistic":"COUNT","value":2.0}],"name":"bookings.created"}`, 'app', 'Production service: request ids, health and metrics'),
    h2('What to notice'),
    ul(['The filter puts the request id in the logging <strong>MDC</strong>, so every log line of that request carries it, and returns it to the client. With OpenTelemetry, the trace id plays this role.',
      'Boot already provides a <code>db</code> health indicator for the <code>DataSource</code>. Adding it to the readiness group makes Kubernetes stop sending traffic when the database is unreachable — but liveness leaves it out, so pods are not restarted for an outage they cannot fix.',
      'A business metric (<code>bookings.created</code>) is often the best alert: “zero bookings in 10 minutes” catches problems no technical metric sees.']),
    h2('Production readiness checklist'),
    table(['Area', 'Check'], [
      ['Configuration', 'No secrets in the repo or image; everything environment-specific comes from env vars / secrets'],
      ['Database', 'Flyway migrations reviewed; <code>ddl-auto=validate</code>; connection pool sized; <code>open-in-view=false</code>'],
      ['API', 'Validation on every input; ProblemDetail errors; paging limits; request size limits'],
      ['Security', 'Deny by default; JWT issuer/audience validated; ownership checks; Actuator exposure minimal'],
      ['Resilience', 'Timeouts on every outbound call; retries only for idempotent operations; circuit breakers for critical dependencies'],
      ['Messaging', 'Idempotent consumers; DLT/DLQ monitored; outbox for events that must not be lost'],
      ['Observability', 'Structured logs with request/trace id; RED metrics (rate, errors, duration); traces exported; alerts defined'],
      ['Operations', 'Readiness/liveness probes; graceful shutdown; resource requests and limits; non-root container'],
      ['Testing', 'Unit + slice tests; Testcontainers integration tests in CI; smoke test after deploy'],
    ]),
    p('Deployment files for this service: ' + JT.link('sbp_docker', 'Dockerfile') + ', ' + JT.link('sbp_kubernetes', 'Kubernetes Deployment') + ', ' + JT.link('sbp_ci', 'CI pipeline') + '.'),
  ], { title: 'Project: Production Service', h1: 'Project: <span>Production Service</span>' });
})();
