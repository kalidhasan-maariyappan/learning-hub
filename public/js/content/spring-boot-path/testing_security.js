// Spring Boot Learning Path, part 3: testing (unit, web layer, real infrastructure) and security.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table } = JT.h;
  const K = JT.kit;
  const BP = JT.bootPath;
  const { page, run, shown, main, webStart, callHelper } = BP;

  // ------------------------------------------------------------------ Testing overview
  page('sbp_testing', () => [
    BP.goals(['the kinds of tests in a Spring Boot project', 'what <code>spring-boot-starter-test</code> contains', 'which test to write for which question']),
    h2('The testing pyramid'),
    BP.file(`          few   ▲   end-to-end tests        (whole system, slow)
                │   @SpringBootTest + Testcontainers   (real DB / broker)
                │   slice tests: @WebMvcTest, @DataJpaTest
         many   │   unit tests: plain JUnit + Mockito   (milliseconds)`, 'Many fast tests at the bottom, few slow ones at the top'),
    table(['Test', 'Starts', 'Answers', 'Speed'], [
      ['Unit test', 'Nothing — just <code>new</code>', 'Is the business rule correct?', 'ms'],
      ['<code>@WebMvcTest</code>', 'MVC only: controllers, advice, JSON', 'Correct URL, status, JSON, validation?', '~1 s'],
      ['<code>@DataJpaTest</code>', 'JPA + a database', 'Do my queries and mappings work?', 'seconds'],
      ['<code>@SpringBootTest</code>', 'The whole application', 'Do the pieces work together?', 'seconds'],
      ['+ Testcontainers', 'Real PostgreSQL/Kafka in Docker', 'Does it work with the real infrastructure?', 'seconds'],
    ]),
    h2('The test starter'),
    p('<code>spring-boot-starter-test</code> brings JUnit Jupiter, Mockito, AssertJ, Hamcrest, JSONPath, Awaitility and Spring\'s test support. In Spring Boot 4 there are also feature-specific test starters such as <code>spring-boot-starter-webmvc-test</code> and <code>spring-boot-starter-data-jpa-test</code>.'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>`, 'pom.xml', 'xml'),
    BP.remember(['Most tests should be unit tests.', 'Use real infrastructure where behavior matters: SQL, serialization, broker semantics.']),
    BP.mistake('Starting the whole application with <code>@SpringBootTest</code> for every test. The suite becomes slow, so people stop running it.'),
    BP.next('sbp_unit_tests'),
  ]);

  // ------------------------------------------------------------------ Unit tests
  page('sbp_unit_tests', () => [
    BP.goals(['testing a service without Spring', 'mocks with Mockito: <code>when</code>, <code>verify</code>, <code>ArgumentCaptor</code>', 'readable assertions with AssertJ']),
    h2('The JUnit test you write'),
    K.show(`import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class InvoiceServiceTest {
    InvoiceRepository repository = mock(InvoiceRepository.class);
    InvoiceService service = new InvoiceService(repository);   // plain constructor, no Spring

    @Test
    void appliesTenPercentDiscountForLoyalCustomers() {
        when(repository.ordersCount("c-1")).thenReturn(12);

        long total = service.total("c-1", 10_000);

        assertThat(total).isEqualTo(9_000);
    }

    @Test
    void savesTheInvoice() {
        service.total("c-2", 5_000);

        ArgumentCaptor<Invoice> saved = ArgumentCaptor.forClass(Invoice.class);
        verify(repository).save(saved.capture());
        assertThat(saved.getValue().amountCents()).isEqualTo(5_000);
    }

    @Test
    void rejectsNegativeAmounts() {
        assertThatThrownBy(() -> service.total("c-3", -1))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("negative");
    }
}`, 'src/test/java/.../InvoiceServiceTest.java', 'java'),
    h2('Run the same checks here'),
    p('The lab cannot run JUnit, so this program runs exactly the same three test bodies with Mockito and AssertJ and prints <code>PASS</code> after each one. A failed assertion would throw and stop the program.'),
    run(`import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.ArgumentCaptor;

record Invoice(String customer, long amountCents) { }

interface InvoiceRepository {
    int ordersCount(String customer);
    void save(Invoice invoice);
}

class InvoiceService {
    private final InvoiceRepository repository;
    InvoiceService(InvoiceRepository repository) { this.repository = repository; }

    long total(String customer, long amountCents) {
        if (amountCents < 0) throw new IllegalArgumentException("amount must not be negative");
        long total = repository.ordersCount(customer) >= 10 ? amountCents * 90 / 100 : amountCents;
        repository.save(new Invoice(customer, total));
        return total;
    }
}

public class Main {
    public static void main(String[] args) {
        // appliesTenPercentDiscountForLoyalCustomers
        InvoiceRepository repository = mock(InvoiceRepository.class);
        InvoiceService service = new InvoiceService(repository);
        when(repository.ordersCount("c-1")).thenReturn(12);
        assertThat(service.total("c-1", 10_000)).isEqualTo(9_000);
        System.out.println("PASS appliesTenPercentDiscountForLoyalCustomers");

        // savesTheInvoice
        service.total("c-2", 5_000);
        ArgumentCaptor<Invoice> saved = ArgumentCaptor.forClass(Invoice.class);
        verify(repository, times(2)).save(saved.capture());
        assertThat(saved.getValue()).isEqualTo(new Invoice("c-2", 5_000));
        System.out.println("PASS savesTheInvoice");

        // rejectsNegativeAmounts
        assertThatThrownBy(() -> service.total("c-3", -1))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("negative");
        verify(repository, never()).ordersCount("c-3");     // rejected before touching the repository
        System.out.println("PASS rejectsNegativeAmounts");
    }
}`, `PASS appliesTenPercentDiscountForLoyalCustomers
PASS savesTheInvoice
PASS rejectsNegativeAmounts`, 'test', 'Mockito + AssertJ'),
    BP.explained([
      '<code>mock(InvoiceRepository.class)</code> creates a fake whose methods return defaults (0, null, false) until you stub them.',
      '<code>when(...).thenReturn(12)</code> stubs one call. Unstubbed <code>ordersCount("c-2")</code> returns 0, so no discount.',
      '<code>ArgumentCaptor</code> grabs the object passed to <code>save</code> so you can check it.',
      '<code>assertThatThrownBy</code> checks the exception type and message.',
      'Because <code>InvoiceService</code> uses constructor injection, the test simply calls <code>new</code>. No Spring context, so it runs in milliseconds.',
    ]),
    BP.remember(['Test behavior (the returned total, the saved invoice), not private details.', 'One reason to fail per test; name the test after the rule it checks.']),
    BP.mistake('Mocking the class under test, or mocking value objects such as records. Mock only collaborators at the boundary (repositories, clients).'),
    BP.next('sbp_mockmvc'),
  ], { exercise: { q: 'Make the mock return 12 when <code>ordersCount("c-1")</code> is called.', code: '___(repository.ordersCount("c-1")).thenReturn(12);', options: ['when', 'verify', 'given', 'mock'], answer: ['when'] } });

  // ------------------------------------------------------------------ MockMvc
  page('sbp_mockmvc', () => [
    BP.goals(['testing controllers without a server', 'checking status codes and JSON with JSONPath', 'what <code>@WebMvcTest</code> and <code>@MockitoBean</code> do']),
    h2('The test you write'),
    K.show(`@WebMvcTest(PatientController.class)       // starts only the MVC layer
class PatientControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean PatientService service;      // replaces the real bean with a mock

    @Test
    void returnsPatient() throws Exception {
        when(service.find(1)).thenReturn(new PatientResponse(1, "Jane Doe"));

        mvc.perform(get("/api/patients/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.name").value("Jane Doe"));
    }

    @Test
    void rejectsBlankName() throws Exception {
        mvc.perform(post("/api/patients").contentType(APPLICATION_JSON).content("{\\"name\\":\\"\\"}"))
           .andExpect(status().isBadRequest())
           .andExpect(jsonPath("$.name").value("must not be blank"));
        verifyNoInteractions(service);
    }
}`, 'PatientControllerTest.java', 'java'),
    h2('Run the same checks here'),
    run(`import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Map;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

record PatientResponse(long id, String name) { }
record CreatePatient(@jakarta.validation.constraints.NotBlank String name) { }

interface PatientService {
    PatientResponse find(long id);
    PatientResponse create(String name);
}

@Service
class DatabasePatientService implements PatientService {     // the real bean; the test replaces it with a mock
    public PatientResponse find(long id) { throw new UnsupportedOperationException("needs a database"); }
    public PatientResponse create(String name) { throw new UnsupportedOperationException("needs a database"); }
}

@RestController
@RequestMapping("/api/patients")
class PatientController {
    private final PatientService service;
    PatientController(PatientService service) { this.service = service; }

    @GetMapping("/{id}") PatientResponse find(@PathVariable long id) { return service.find(id); }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    PatientResponse create(@jakarta.validation.Valid @RequestBody CreatePatient body) { return service.create(body.name()); }

    @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> invalid(MethodArgumentNotValidException ex) {
        var error = ex.getBindingResult().getFieldErrors().get(0);
        return Map.of(error.getField(), error.getDefaultMessage());
    }
}

` + main([], `            var validator = new LocalValidatorFactoryBean();
            validator.afterPropertiesSet();

            // returnsPatient
            PatientService service = mock(PatientService.class);
            MockMvc mvc = MockMvcBuilders.standaloneSetup(new PatientController(service)).setValidator(validator).build();
            when(service.find(1)).thenReturn(new PatientResponse(1, "Jane Doe"));
            mvc.perform(get("/api/patients/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.name").value("Jane Doe"));
            System.out.println("PASS returnsPatient");

            // rejectsBlankName
            mvc.perform(post("/api/patients").contentType(MediaType.APPLICATION_JSON).content("{\\"name\\":\\"\\"}"))
               .andExpect(status().isBadRequest())
               .andExpect(jsonPath("$.name").value("must not be blank"));
            verify(service, never()).create(anyString());
            System.out.println("PASS rejectsBlankName");

            // createsPatient
            when(service.create("Omar")).thenReturn(new PatientResponse(2, "Omar"));
            String body = mvc.perform(post("/api/patients").contentType(MediaType.APPLICATION_JSON).content("{\\"name\\":\\"Omar\\"}"))
               .andExpect(status().isCreated())
               .andReturn().getResponse().getContentAsString();
            System.out.println("PASS createsPatient " + body);`),
    `PASS returnsPatient
PASS rejectsBlankName
PASS createsPatient {"id":2,"name":"Omar"}`, 'test', 'MockMvc with a mocked service'),
    BP.explained([
      'MockMvc sends a request through the real Spring MVC machinery — URL mapping, JSON conversion, validation, exception handlers — but without a network or server.',
      '<code>jsonPath("$.name")</code> reads a field from the JSON response.',
      'The application has a real <code>DatabasePatientService</code>, but the test builds the controller with a mock instead, so it checks only the web layer: if validation fails, the service is never called.',
      'In a real test class, <code>@WebMvcTest</code> builds this for you and <code>@MockitoBean</code> puts the mock into the context.',
    ]),
    BP.tip('Spring Framework also offers <code>MockMvcTester</code>, an AssertJ-style API: <code>assertThat(mvc.get().uri("/api/patients/1")).hasStatusOk()</code>.'),
    BP.next('sbp_testcontainers'),
  ]);

  // ------------------------------------------------------------------ Testcontainers
  page('sbp_testcontainers', () => [
    BP.goals(['why tests should use the real database', 'starting PostgreSQL in Docker from a test', 'how <code>@ServiceConnection</code> wires it into Spring Boot']),
    h2('Why Testcontainers?'),
    p('H2 is fast but it is not PostgreSQL: SQL dialect, JSON columns, locking and constraint behavior differ. <strong>Testcontainers</strong> starts a real database (or Kafka, RabbitMQ, Redis) in Docker for the test and removes it afterwards. Docker must be running on the machine.'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-testcontainers</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>testcontainers-junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>testcontainers-postgresql</artifactId>
    <scope>test</scope>
</dependency>`, 'pom.xml (versions come from Spring Boot)', 'xml'),
    shown(`import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

@Testcontainers
@SpringBootTest
class PatientRepositoryIT {

    @Container
    @ServiceConnection                        // Boot reads the URL, user and password from the container
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18");

    @Autowired PatientRepository repository;

    @Test
    void savesAndFindsByEmail() {
        repository.save(new Patient("Jane", "jane@example.com", "Oslo"));

        assertThat(repository.findByEmail("jane@example.com")).isPresent();
    }
}`, { title: 'PatientRepositoryIT.java', label: 'mvn verify', result: `Creating container for image: postgres:18
Container postgres:18 started in PT2.1S
Successfully applied 2 migrations to schema "public", now at version v2
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0` }),
    BP.explained([
      '<code>@Container</code> on a static field starts the container once for the class and stops it at the end.',
      '<code>@ServiceConnection</code> tells Boot to build its <code>DataSource</code> from the container — no <code>@DynamicPropertySource</code> or hard-coded URL.',
      'Flyway migrations run against the container, so the test also proves the migrations work.',
      'Testcontainers 2.x uses module packages such as <code>org.testcontainers.postgresql</code> and <code>org.testcontainers.kafka</code>. Older tutorials use <code>org.testcontainers.containers.PostgreSQLContainer&lt;?&gt;</code> and the deprecated <code>org.testcontainers.containers.KafkaContainer</code>.',
    ]),
    h2('Use the same containers while developing'),
    p('A test-side main class can start your application with the containers attached, so <code>./mvnw spring-boot:test-run</code> gives you a local app with a real database and no manual setup:'),
    K.show(`public class TestPatientServiceApplication {
    public static void main(String[] args) {
        SpringApplication.from(PatientServiceApplication::main)
            .with(ContainersConfig.class)          // a @TestConfiguration declaring @ServiceConnection beans
            .run(args);
    }
}`, 'src/test/java/.../TestPatientServiceApplication.java', 'java'),
    BP.mistake('Mocking the repository in an “integration” test. You then never test the SQL, the mapping or the migrations — the parts most likely to break.'),
    BP.next('sbp_security', 'protect the API.'),
  ]);

  // ================================================================== Security
  const securityImports = `import java.util.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
`;
  const users = `
    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();   // bcrypt by default
    }

    @Bean
    InMemoryUserDetailsManager users(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
            User.withUsername("jane").password(encoder.encode("jane-pass")).roles("USER").build(),
            User.withUsername("admin").password(encoder.encode("admin-pass")).roles("USER", "ADMIN").build());
    }`;
  const basicCall = `
    static String call(RestClient http, HttpMethod method, String path, String user, String password) {
        RestClient.RequestHeadersSpec<?> request = http.method(method).uri(path);
        if (user != null) request.headers(h -> h.setBasicAuth(user, password));
        // Error bodies contain a timestamp, so only successful responses print their body.
        return request.exchange((req, res) -> res.getStatusCode().value()
            + (res.getStatusCode().is2xxSuccessful() ? " " + new String(res.getBody().readAllBytes()) : ""));
    }
`;

  page('sbp_security', () => [
    BP.goals(['authentication vs authorization', 'the security filter chain', 'protecting an API with users and passwords']),
    h2('Two questions'),
    table(['', 'Question', 'Failure'], [['<strong>Authentication</strong>', 'Who are you?', '401 Unauthorized'], ['<strong>Authorization</strong>', 'Are you allowed to do this?', '403 Forbidden']]),
    p('Adding <code>spring-boot-starter-security</code> protects every endpoint immediately. You then describe the rules in a <code>SecurityFilterChain</code> bean. Each request passes through a chain of servlet filters <em>before</em> it reaches a controller.'),
    BP.file(`request → [ CORS ] → [ CSRF ] → [ authentication: Basic / JWT / session ] → [ authorization rules ] → DispatcherServlet → controller
                                                │ no or bad credentials → 401             │ not allowed → 403`, 'The filter chain'),
    run(securityImports + `
@RestController
class AccountController {
    @GetMapping("/public/status")
    String status() { return "up"; }

    @GetMapping("/api/me")
    String me(Authentication auth) {
        List<String> roles = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).filter(a -> a.startsWith("ROLE_")).toList();
        return auth.getName() + " " + roles;
    }
}

@Configuration
class SecurityConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable());        // a stateless API without cookies has no CSRF risk
        return http.build();
    }
` + users + `
}

` + main(['"server.port=0"'], webStart + `
            System.out.println("public, no login:    " + call(http, HttpMethod.GET, "/public/status", null, null));
            System.out.println("no login:            " + call(http, HttpMethod.GET, "/api/me", null, null));
            System.out.println("wrong password:      " + call(http, HttpMethod.GET, "/api/me", "jane", "guess"));
            System.out.println("jane:                " + call(http, HttpMethod.GET, "/api/me", "jane", "jane-pass"));`, basicCall),
    `public, no login:    200 up
no login:            401
wrong password:      401
jane:                200 jane [ROLE_USER]`, 'security', 'A protected API'),
    BP.explained([
      '<code>authorizeHttpRequests</code> lists rules from most specific to least specific: <code>/public/**</code> is open, everything else needs a logged-in user.',
      '<code>httpBasic</code> reads the <code>Authorization: Basic …</code> header. Real systems more often use JWT (next lessons) or a login session for browsers.',
      'Passwords are stored as bcrypt hashes through a <code>PasswordEncoder</code>; the plain password is never stored.',
      'The controller receives the <code>Authentication</code>: the user name and the authorities. Roles become <code>ROLE_…</code> authorities. Spring Security 7 also adds a <code>FACTOR_PASSWORD</code> authority recording <em>how</em> the user signed in (used for multi-factor rules), so the example prints only the roles.',
      'A missing or wrong password is rejected with 401 before the controller runs.',
    ]),
    BP.remember(['Deny by default: end the rules with <code>anyRequest().authenticated()</code>.', 'Disable CSRF only for stateless token-based APIs; keep it for browser apps that use session cookies.']),
    BP.mistake('Writing your own filter to parse passwords or tokens. Use Spring Security\'s built-in mechanisms; hand-written auth code is where vulnerabilities come from.'),
    BP.next('sbp_security_rules'),
  ]);

  page('sbp_security_rules', () => [
    BP.goals(['URL rules with roles', 'method security with <code>@PreAuthorize</code>', 'checking ownership (who may see which record)']),
    run(securityImports + `
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.stereotype.Service;

@Service
class ReportService {
    @PreAuthorize("hasRole('ADMIN')")
    String revenue() { return "revenue: 1.2M"; }

    @PreAuthorize("#owner == authentication.name or hasRole('ADMIN')")
    String ordersOf(String owner) { return "orders of " + owner; }
}

@RestController
class ReportController {
    private final ReportService reports;
    ReportController(ReportService reports) { this.reports = reports; }

    @GetMapping("/api/admin/users") String users() { return "2 users"; }
    @GetMapping("/api/reports/revenue") String revenue() { return reports.revenue(); }
    @GetMapping("/api/users/{owner}/orders") String orders(@PathVariable String owner) { return reports.ordersOf(owner); }
}

@Configuration
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable());
        return http.build();
    }
` + users + `
}

` + main(['"server.port=0"'], webStart + `
            System.out.println("jane  /api/admin/users      " + call(http, HttpMethod.GET, "/api/admin/users", "jane", "jane-pass"));
            System.out.println("admin /api/admin/users      " + call(http, HttpMethod.GET, "/api/admin/users", "admin", "admin-pass"));
            System.out.println("jane  /api/reports/revenue  " + call(http, HttpMethod.GET, "/api/reports/revenue", "jane", "jane-pass"));
            System.out.println("jane  /api/users/jane/...   " + call(http, HttpMethod.GET, "/api/users/jane/orders", "jane", "jane-pass"));
            System.out.println("jane  /api/users/omar/...   " + call(http, HttpMethod.GET, "/api/users/omar/orders", "jane", "jane-pass"));
            System.out.println("admin /api/users/omar/...   " + call(http, HttpMethod.GET, "/api/users/omar/orders", "admin", "admin-pass"));`, basicCall),
    `jane  /api/admin/users      403
admin /api/admin/users      200 2 users
jane  /api/reports/revenue  403
jane  /api/users/jane/...   200 orders of jane
jane  /api/users/omar/...   403
admin /api/users/omar/...   200 orders of omar`, 'security', 'Roles, method security and ownership'),
    BP.explained([
      'URL rules protect whole areas: <code>/api/admin/**</code> needs the ADMIN role.',
      '<code>@EnableMethodSecurity</code> turns on <code>@PreAuthorize</code>, which checks a rule before a service method runs.',
      'The expression <code>#owner == authentication.name</code> compares a method argument with the logged-in user: jane can read her own orders but not Omar\'s.',
      'Logged-in users who break a rule get <strong>403</strong>, not 401.',
    ]),
    BP.remember(['Check ownership on every request that takes an id (“IDOR” bugs come from forgetting this).', 'Put important rules on the service, so every caller is protected, not only one controller.']),
    BP.mistake('Hiding a button in the UI and assuming the endpoint is safe. Attackers call the API directly; the server must check every request.'),
    BP.next('sbp_jwt'),
  ]);

  page('sbp_jwt', () => [
    BP.goals(['what OAuth2, OIDC and JWT access tokens are', 'configuring a resource server', 'scopes as authorities, and what happens with expired tokens']),
    h2('How token-based APIs work'),
    ol(['A user logs in at an <strong>authorization server</strong> (Keycloak, Okta, Entra ID, Auth0, Spring Authorization Server).',
      'The client receives a signed <strong>JWT access token</strong> listing the subject, issuer, expiry and scopes.',
      'The client sends <code>Authorization: Bearer &lt;token&gt;</code> to your API, the <strong>resource server</strong>.',
      'Your API checks the signature with the issuer\'s public key, checks expiry and issuer, then applies authorization rules. It never sees the password.']),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security-oauth2-resource-server</artifactId>
</dependency>`, 'pom.xml (Spring Boot 4 name)', 'xml'),
    K.show(`spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://identity.example.com/realms/app   # Boot downloads the public keys from here`, 'application.yml', 'yaml'),
    h2('Example'),
    p('The lab has no identity provider, so the program creates an RSA key pair, signs tokens itself (playing the authorization server) and gives the API a <code>JwtDecoder</code> with the public key. Your production API only needs the <code>issuer-uri</code> above.'),
    run(`import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import com.nimbusds.jose.jwk.*;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@RestController
class PatientApi {
    @GetMapping("/api/patients")
    String list(@AuthenticationPrincipal Jwt jwt) {
        return jwt.getSubject() + " may read patients";
    }
}

@Configuration
class SecurityConfig {
    static final String ISSUER = "https://identity.example.com/realms/app";

    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/patients/**").hasAuthority("SCOPE_patients.read")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    KeyPair signingKeys() throws Exception {             // in real life: owned by the authorization server
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        return generator.generateKeyPair();
    }

    @Bean
    JwtDecoder jwtDecoder(KeyPair keys) {                 // in real life: built from issuer-uri
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withPublicKey((RSAPublicKey) keys.getPublic()).build();
        decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(ISSUER));
        return decoder;
    }
}

` + main(['"server.port=0"'], webStart + `
            KeyPair keys = context.getBean(KeyPair.class);
            RSAKey jwk = new RSAKey.Builder((RSAPublicKey) keys.getPublic()).privateKey((RSAPrivateKey) keys.getPrivate()).build();
            JwtEncoder issuer = new NimbusJwtEncoder(new ImmutableJWKSet<>(new JWKSet(jwk)));
            Instant now = Instant.now();

            String reader = token(issuer, SecurityConfig.ISSUER, "patients.read", now.plus(5, ChronoUnit.MINUTES));
            String writer = token(issuer, SecurityConfig.ISSUER, "patients.write", now.plus(5, ChronoUnit.MINUTES));
            String expired = token(issuer, SecurityConfig.ISSUER, "patients.read", now.minus(5, ChronoUnit.MINUTES));
            String foreign = token(issuer, "https://evil.example.com", "patients.read", now.plus(5, ChronoUnit.MINUTES));

            System.out.println("no token:        " + call(http, null));
            System.out.println("read scope:      " + call(http, reader));
            System.out.println("wrong scope:     " + call(http, writer));
            System.out.println("expired token:   " + call(http, expired));
            System.out.println("other issuer:    " + call(http, foreign));`, `
    static String token(JwtEncoder encoder, String issuer, String scope, Instant expiresAt) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer(issuer).subject("jane").claim("scope", scope)
            .issuedAt(expiresAt.minus(10, ChronoUnit.MINUTES)).expiresAt(expiresAt).build();
        JwsHeader header = JwsHeader.with(SignatureAlgorithm.RS256).build();
        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }

    static String call(RestClient http, String token) {
        var request = http.get().uri("/api/patients");
        if (token != null) request.headers(h -> h.setBearerAuth(token));
        return request.exchange((req, res) -> res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`),
    `no token:        401
read scope:      200 jane may read patients
wrong scope:     403
expired token:   401
other issuer:    401 `, 'oauth2', 'A JWT resource server'),
    BP.explained([
      '<code>oauth2ResourceServer(oauth -> oauth.jwt(...))</code> makes Spring read the Bearer token and validate it with the <code>JwtDecoder</code>.',
      'The decoder checks the RSA signature, the expiry (<code>exp</code>) and — because of <code>createDefaultWithIssuer</code> — the issuer (<code>iss</code>).',
      'Each value in the <code>scope</code> claim becomes an authority with the <code>SCOPE_</code> prefix, so the rule is <code>hasAuthority("SCOPE_patients.read")</code>.',
      'A valid token with the wrong scope is <strong>403</strong>; a missing, expired or foreign token is <strong>401</strong>.',
      '<code>@AuthenticationPrincipal Jwt jwt</code> gives the controller the verified claims.',
    ]),
    h2('Sessions or tokens?'),
    table(['', 'Server session (cookie)', 'OAuth2 access token (JWT)'], [
      ['Typical client', 'Server-rendered browser app', 'SPA, mobile app, other services'], ['State', 'Stored on the server', 'In the signed token'],
      ['Logout / revoke', 'Delete the session', 'Short expiry + refresh tokens'], ['CSRF protection', 'Required', 'Not needed for header tokens'],
    ]),
    BP.remember(['Validate issuer, expiry and (when you have one) audience.', 'Keep access tokens short-lived.', 'Use an existing authorization server; do not invent a token format.']),
    BP.mistake('Signing tokens with a shared secret hard-coded in <code>application.yml</code>, or decoding a JWT without checking its signature. Anyone could forge a token.'),
    BP.next('sbp_messaging', 'connect services with messages.'),
  ]);
})();
