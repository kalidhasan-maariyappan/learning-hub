// Spring Boot Learning Path, part 2: REST APIs with Spring MVC and data access with JPA and JDBC.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table } = JT.h;
  const K = JT.kit;
  const BP = JT.bootPath;
  const { page, run, shown, main, webStart, callHelper } = BP;

  const webImports = `import java.net.URI;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
`;

  // ------------------------------------------------------------------ REST controllers
  page('sbp_rest', () => [
    BP.goals(['what a REST API is', 'mapping HTTP methods to Java methods', 'returning JSON']),
    h2('What is a REST API?'),
    p('A REST API exposes <strong>resources</strong> (patients, orders) at URLs and uses HTTP methods to act on them. Spring MVC turns Java records into JSON and back automatically.'),
    table(['HTTP', 'URL', 'Meaning', 'Typical status'], [
      ['GET', '/api/patients', 'List patients', '200 OK'], ['GET', '/api/patients/1', 'Read one', '200 or 404'],
      ['POST', '/api/patients', 'Create', '201 Created'], ['PUT', '/api/patients/1', 'Replace', '200 or 404'],
      ['DELETE', '/api/patients/1', 'Delete', '204 No Content'],
    ]),
    h2('Example: a patient API'),
    p('The data is kept in a map so the lesson can focus on the web layer. ' + JT.link('sbp_jpa', 'JPA Entities') + ' moves it into a database.'),
    run(webImports + `
record Patient(long id, String name, String email) { }
record PatientRequest(String name, String email) { }

@RestController
@RequestMapping("/api/patients")
class PatientController {
    private final Map<Long, Patient> patients = new ConcurrentHashMap<>();
    private final AtomicLong ids = new AtomicLong();

    @GetMapping
    List<Patient> list() {
        return patients.values().stream().sorted(Comparator.comparing(Patient::id)).toList();
    }

    @GetMapping("/{id}")
    ResponseEntity<Patient> find(@PathVariable long id) {
        return ResponseEntity.of(Optional.ofNullable(patients.get(id)));
    }

    @PostMapping
    ResponseEntity<Patient> create(@RequestBody PatientRequest request) {
        long id = ids.incrementAndGet();
        Patient patient = new Patient(id, request.name(), request.email());
        patients.put(id, patient);
        return ResponseEntity.created(URI.create("/api/patients/" + id)).body(patient);
    }

    @PutMapping("/{id}")
    ResponseEntity<Patient> replace(@PathVariable long id, @RequestBody PatientRequest request) {
        if (!patients.containsKey(id)) return ResponseEntity.notFound().build();
        Patient patient = new Patient(id, request.name(), request.email());
        patients.put(id, patient);
        return ResponseEntity.ok(patient);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable long id) {
        return patients.remove(id) == null ? ResponseEntity.notFound().build() : ResponseEntity.noContent().build();
    }
}

` + main(['"server.port=0"'], webStart + `
            System.out.println("POST   " + call(http, HttpMethod.POST, "/api/patients", "{\\"name\\":\\"Jane Doe\\",\\"email\\":\\"jane@example.com\\"}"));
            System.out.println("POST   " + call(http, HttpMethod.POST, "/api/patients", "{\\"name\\":\\"Omar Ali\\",\\"email\\":\\"omar@example.com\\"}"));
            System.out.println("GET    " + call(http, HttpMethod.GET, "/api/patients", null));
            System.out.println("PUT    " + call(http, HttpMethod.PUT, "/api/patients/2", "{\\"name\\":\\"Omar Ali\\",\\"email\\":\\"omar.ali@example.com\\"}"));
            System.out.println("DELETE " + call(http, HttpMethod.DELETE, "/api/patients/1", null));
            System.out.println("GET    " + call(http, HttpMethod.GET, "/api/patients/1", null));`, callHelper),
    `POST   201 {"id":1,"name":"Jane Doe","email":"jane@example.com"}
POST   201 {"id":2,"name":"Omar Ali","email":"omar@example.com"}
GET    200 [{"id":1,"name":"Jane Doe","email":"jane@example.com"},{"id":2,"name":"Omar Ali","email":"omar@example.com"}]
PUT    200 {"id":2,"name":"Omar Ali","email":"omar.ali@example.com"}
DELETE 204
GET    404`, 'web', 'Create, read, update, delete'),
    BP.explained([
      '<code>@RequestMapping("/api/patients")</code> on the class is the common prefix of every method.',
      '<code>@GetMapping</code>, <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code> pick the HTTP method.',
      '<code>@RequestBody</code> converts the JSON body to a <code>PatientRequest</code> record; returning a record converts it to JSON.',
      '<code>ResponseEntity</code> lets you choose the status: <code>created</code> (201 + Location header), <code>noContent</code> (204), <code>notFound</code> (404).',
      '<code>ResponseEntity.of(optional)</code> returns 200 with the body, or 404 when the optional is empty.',
      'The <code>call</code> helper prints the status code and body so you can see each response.',
    ]),
    shown(`curl -i -H "Content-Type: application/json" \\
  -d '{"name":"Jane Doe","email":"jane@example.com"}' \\
  http://localhost:8080/api/patients`, { title: 'The same request with curl', lang: 'text', label: 'Response', result: `HTTP/1.1 201
Location: /api/patients/1
Content-Type: application/json

{"id":1,"name":"Jane Doe","email":"jane@example.com"}` }),
    BP.remember(['Use nouns in URLs (<code>/patients</code>), and HTTP methods for verbs.', 'Return the right status code; clients and monitoring depend on it.']),
    BP.next('sbp_request'),
  ], { exercise: { q: 'Map this method to HTTP POST.', code: '@___\nResponseEntity<Patient> create(@RequestBody PatientRequest request) { ... }', options: ['PostMapping', 'GetMapping', 'PutMapping', 'RequestBody'], answer: ['PostMapping'] } });

  // ------------------------------------------------------------------ Request data
  page('sbp_request', () => [
    BP.goals(['path variables', 'query parameters (required, optional, lists)', 'headers and JSON bodies']),
    h2('Where request data comes from'),
    table(['Annotation', 'Reads', 'Example URL / header'], [
      ['<code>@PathVariable</code>', 'Part of the path', '<code>/patients/<strong>42</strong></code>'],
      ['<code>@RequestParam</code>', 'Query string', '<code>?<strong>city=Oslo</strong></code>'],
      ['<code>@RequestHeader</code>', 'An HTTP header', '<code>X-Tenant: acme</code>'],
      ['<code>@RequestBody</code>', 'The JSON body', '<code>{"name":"Jane"}</code>'],
    ]),
    run(webImports + `
record SearchResult(String tenant, String city, int page, List<String> tags) { }
record NoteRequest(String text, int priority) { }

@RestController
class RequestDemoController {
    @GetMapping("/patients/{id}/notes/{noteId}")
    String note(@PathVariable long id, @PathVariable("noteId") int note) {
        return "patient " + id + ", note " + note;
    }

    @GetMapping("/patients/search")
    SearchResult search(@RequestHeader("X-Tenant") String tenant,
                        @RequestParam String city,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(required = false) List<String> tag) {
        return new SearchResult(tenant, city, page, tag == null ? List.of() : tag);
    }

    @PostMapping("/patients/{id}/notes")
    String addNote(@PathVariable long id, @RequestBody NoteRequest body) {
        return "patient " + id + " got note '" + body.text() + "' with priority " + body.priority();
    }
}

` + main(['"server.port=0"', '"logging.level.org.springframework.web=error"'], webStart + `
            System.out.println(http.get().uri("/patients/42/notes/7").retrieve().body(String.class));
            System.out.println(http.get().uri("/patients/search?city=Oslo&tag=vip&tag=new")
                .header("X-Tenant", "acme").retrieve().body(String.class));
            System.out.println(http.post().uri("/patients/42/notes").contentType(MediaType.APPLICATION_JSON)
                .body("{\\"text\\":\\"Allergic to penicillin\\",\\"priority\\":1}").retrieve().body(String.class));
            System.out.println(call(http, HttpMethod.GET, "/patients/search?city=Oslo", null));`, callHelper),
    `patient 42, note 7
{"tenant":"acme","city":"Oslo","page":0,"tags":["vip","new"]}
patient 42 got note 'Allergic to penicillin' with priority 1
400 {"timestamp":"2026-10-31T18:21:47.626Z","status":400,"error":"Bad Request","path":"/patients/search"}`, 'web', 'Path, query, header and body'),
    BP.explained([
      'The path variable name must match the parameter name, or be given explicitly: <code>@PathVariable("noteId") int note</code>.',
      'Spring converts text to the parameter type: <code>"42"</code> becomes a <code>long</code>.',
      '<code>defaultValue</code> makes a parameter optional with a default; <code>required = false</code> makes it optional and <code>null</code> when missing.',
      'A repeated parameter (<code>tag=vip&amp;tag=new</code>) binds to a <code>List</code>.',
      'The last request has no <code>X-Tenant</code> header, which is required, so Spring answers <strong>400 Bad Request</strong> before your method runs. The timestamp changes on every run.',
    ]),
    BP.mistake('Accepting a JPA entity as <code>@RequestBody</code>. A client could then set fields you never meant to expose, such as <code>id</code> or <code>role</code>. Always accept a request DTO (a record) instead.'),
    BP.next('sbp_response'),
  ], { exercise: { q: 'Read the query parameter <code>?page=2</code>, defaulting to 0.', code: 'List<Patient> list(@___(defaultValue = "0") int page) { ... }', options: ['RequestParam', 'PathVariable', 'RequestBody', 'RequestHeader'], answer: ['RequestParam'] } });

  // ------------------------------------------------------------------ Responses
  page('sbp_response', () => [
    BP.goals(['choosing status codes', 'setting headers', 'shaping JSON with response DTOs']),
    h2('Status codes you will use'),
    table(['Code', 'Name', 'Use when'], [
      ['200', 'OK', 'A successful read or update with a body'], ['201', 'Created', 'POST created something; add a <code>Location</code> header'],
      ['202', 'Accepted', 'Work was queued and will finish later'], ['204', 'No Content', 'Success with no body (DELETE)'],
      ['400', 'Bad Request', 'Invalid input'], ['401', 'Unauthorized', 'Not logged in'], ['403', 'Forbidden', 'Logged in but not allowed'],
      ['404', 'Not Found', 'The resource does not exist'], ['409', 'Conflict', 'Duplicate or version conflict'], ['500', 'Internal Server Error', 'A bug or an unhandled failure'],
    ]),
    h2('Example'),
    run(webImports + `
import java.time.LocalDate;

record AppointmentResponse(String id, String patient, LocalDate date) { }

@RestController
@RequestMapping("/appointments")
class AppointmentController {
    @PostMapping
    ResponseEntity<AppointmentResponse> book() {
        var body = new AppointmentResponse("APT-7", "Jane Doe", LocalDate.of(2026, 11, 3));
        return ResponseEntity.created(URI.create("/appointments/APT-7")).body(body);
    }

    @PostMapping("/reminders")
    ResponseEntity<Void> sendReminders() {
        return ResponseEntity.accepted().header("X-Queued-Jobs", "12").build();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    AppointmentResponse find(@PathVariable String id) {
        return new AppointmentResponse(id, "Jane Doe", LocalDate.of(2026, 11, 3));
    }
}

` + main(['"server.port=0"'], webStart + `
            ResponseEntity<String> created = http.post().uri("/appointments").retrieve().toEntity(String.class);
            System.out.println(created.getStatusCode().value() + " Location=" + created.getHeaders().getLocation());
            System.out.println(created.getBody());

            ResponseEntity<Void> queued = http.post().uri("/appointments/reminders").retrieve().toBodilessEntity();
            System.out.println(queued.getStatusCode().value() + " X-Queued-Jobs=" + queued.getHeaders().getFirst("X-Queued-Jobs"));

            System.out.println(http.get().uri("/appointments/APT-7").retrieve().body(String.class));`),
    `201 Location=/appointments/APT-7
{"id":"APT-7","patient":"Jane Doe","date":"2026-11-03"}
202 X-Queued-Jobs=12
{"id":"APT-7","patient":"Jane Doe","date":"2026-11-03"}`, 'web', 'Status codes and headers'),
    BP.explained([
      '<code>ResponseEntity</code> gives full control: status, headers and body.',
      '<code>@ResponseStatus</code> sets a fixed status when you return the body directly.',
      'Dates are written in ISO-8601 format (<code>2026-11-03</code>) by default.',
      'The response is a dedicated record, so the API shape does not change when the database entity changes.',
    ]),
    BP.remember(['201 for create, 204 for delete, 202 for “queued”.', 'Response DTOs decouple the API from the database.']),
    BP.next('sbp_validation'),
  ]);

  // ------------------------------------------------------------------ Validation
  page('sbp_validation', () => [
    BP.goals(['Bean Validation annotations', '<code>@Valid</code> on request bodies', 'returning readable field errors']),
    h2('What is validation?'),
    p('Never trust input. With the <code>spring-boot-starter-validation</code> starter you put constraints such as <code>@NotBlank</code> and <code>@Email</code> on the request record and add <code>@Valid</code>. Spring checks the body <em>before</em> your method runs and rejects bad input with 400.'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`, 'pom.xml', 'xml'),
    h2('Example'),
    run(`import java.util.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

record CreatePatientRequest(
        @NotBlank String name,
        @NotBlank @Email String email,
        @Min(0) @Max(150) int age) { }

@RestController
class PatientController {
    @PostMapping("/patients")
    @ResponseStatus(HttpStatus.CREATED)
    String create(@Valid @RequestBody CreatePatientRequest request) {
        return "created " + request.name();
    }
}

@RestControllerAdvice
class ValidationErrors {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> invalid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new TreeMap<>();
        ex.getBindingResult().getFieldErrors()
          .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return errors;
    }
}

` + main(['"server.port=0"'], webStart + `
            System.out.println(call(http, HttpMethod.POST, "/patients", "{\\"name\\":\\"Jane\\",\\"email\\":\\"jane@example.com\\",\\"age\\":34}"));
            System.out.println(call(http, HttpMethod.POST, "/patients", "{\\"name\\":\\"\\",\\"email\\":\\"not-an-email\\",\\"age\\":200}"));`, callHelper),
    `201 created Jane
400 {"age":"must be less than or equal to 150","email":"must be a well-formed email address","name":"must not be blank"}`, 'validation', 'Reject invalid input with 400'),
    BP.explained([
      'Constraints live on the record components: <code>@NotBlank</code> (not null and not only spaces), <code>@Email</code>, <code>@Min</code>/<code>@Max</code>.',
      '<code>@Valid</code> on the parameter triggers validation. Without it the constraints are ignored.',
      'When validation fails Spring throws <code>MethodArgumentNotValidException</code> and the method never runs.',
      'The <code>@RestControllerAdvice</code> turns the exception into a map of field → message. A <code>TreeMap</code> keeps the fields in a stable order.',
    ]),
    h2('Common constraints'),
    table(['Annotation', 'Checks'], [
      ['<code>@NotNull</code>', 'Not null'], ['<code>@NotBlank</code>', 'String not null and has non-space text'], ['<code>@NotEmpty</code>', 'Collection or string not empty'],
      ['<code>@Size(min, max)</code>', 'Length of a string or size of a collection'], ['<code>@Min</code>, <code>@Max</code>, <code>@Positive</code>', 'Number ranges'],
      ['<code>@Email</code>, <code>@Pattern(regexp)</code>', 'Format'], ['<code>@Past</code>, <code>@Future</code>', 'Dates'], ['<code>@Valid</code> on a field', 'Validate a nested object too'],
    ]),
    BP.mistake('Forgetting <code>@Valid</code>, or forgetting the validation starter. Both compile fine and silently accept invalid data.'),
    BP.next('sbp_errors'),
  ], { exercise: { q: 'Make Spring validate the request body.', code: 'String create(@___ @RequestBody CreatePatientRequest request)', options: ['Valid', 'NotNull', 'Validated', 'Check'], answer: ['Valid'] } });

  // ------------------------------------------------------------------ Errors
  page('sbp_errors', () => [
    BP.goals(['custom exceptions for business errors', 'one global handler with <code>@RestControllerAdvice</code>', 'the standard <code>ProblemDetail</code> error format (RFC 9457)']),
    h2('Why a global error handler?'),
    p('Without one, each controller handles errors its own way and clients get a mix of formats. A <code>@RestControllerAdvice</code> class catches exceptions from every controller and turns them into one consistent JSON format. Spring\'s <code>ProblemDetail</code> follows the standard <code>application/problem+json</code> format.'),
    run(webImports + `
class PatientNotFoundException extends RuntimeException {
    PatientNotFoundException(long id) { super("Patient " + id + " not found"); }
}

class DuplicateEmailException extends RuntimeException {
    DuplicateEmailException(String email) { super("Email " + email + " is already registered"); }
}

@RestController
@RequestMapping("/api/patients")
class PatientController {
    @GetMapping("/{id}")
    String find(@PathVariable long id) {
        if (id != 1) throw new PatientNotFoundException(id);
        return "Jane Doe";
    }

    @PostMapping
    String create(@RequestParam String email) {
        throw new DuplicateEmailException(email);
    }

    @GetMapping("/crash")
    String crash() {
        throw new IllegalStateException("database password is wrong");   // must not leak to clients
    }
}

@RestControllerAdvice
class ApiExceptionHandler {
    @ExceptionHandler(PatientNotFoundException.class)
    ProblemDetail notFound(PatientNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Patient not found");
        problem.setProperty("errorCode", "PATIENT_NOT_FOUND");
        return problem;
    }

    @ExceptionHandler(DuplicateEmailException.class)
    ProblemDetail conflict(DuplicateEmailException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problem.setProperty("errorCode", "DUPLICATE_EMAIL");
        return problem;
    }

    @ExceptionHandler(Exception.class)
    ProblemDetail unexpected(Exception ex) {
        // Log ex with its stack trace here; send the client a generic message.
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error");
    }
}

` + main(['"server.port=0"'], webStart + `
            System.out.println(call(http, HttpMethod.GET, "/api/patients/1", null));
            System.out.println(call(http, HttpMethod.GET, "/api/patients/99", null));
            System.out.println(call(http, HttpMethod.POST, "/api/patients?email=jane@example.com", null));
            System.out.println(call(http, HttpMethod.GET, "/api/patients/crash", null));`, callHelper),
    `200 Jane Doe
404 {"detail":"Patient 99 not found","instance":"/api/patients/99","status":404,"title":"Patient not found","errorCode":"PATIENT_NOT_FOUND"}
409 {"detail":"Email jane@example.com is already registered","instance":"/api/patients","status":409,"title":"Conflict","errorCode":"DUPLICATE_EMAIL"}
500 {"detail":"Unexpected error","instance":"/api/patients/crash","status":500,"title":"Internal Server Error"}`, 'web', 'ProblemDetail for every error'),
    BP.explained([
      'Business problems are plain exceptions with clear names. Controllers and services just <code>throw</code> them.',
      '<code>@ExceptionHandler</code> methods choose the status and body for each exception type.',
      '<code>ProblemDetail</code> fills in the standard fields — <code>status</code>, <code>title</code>, <code>detail</code>, <code>instance</code> (the request path) — and <code>setProperty</code> adds your own, such as a stable <code>errorCode</code> clients can test against.',
      'The catch-all handler hides internal messages: the client sees “Unexpected error”, not the database password.',
    ]),
    BP.remember(['One <code>@RestControllerAdvice</code> for the whole API.', 'Give clients a stable machine-readable code; keep stack traces in the logs.']),
    BP.mistake('Returning <code>ex.getMessage()</code> for unexpected exceptions. Internal messages can reveal SQL, file paths or secrets.'),
    BP.interview([
      ['@ExceptionHandler vs @RestControllerAdvice?', '<code>@ExceptionHandler</code> inside a controller handles that controller\'s exceptions. In a <code>@RestControllerAdvice</code> class the same methods apply to every controller.'],
      ['What is ProblemDetail?', 'Spring\'s implementation of RFC 9457 “Problem Details for HTTP APIs”: a standard JSON error body with type, title, status, detail and instance, plus custom properties.'],
    ]),
    BP.next('sbp_rest_client'),
  ]);

  // ------------------------------------------------------------------ RestClient
  page('sbp_rest_client', () => [
    BP.goals(['calling another HTTP API with <code>RestClient</code>', 'handling error statuses', 'declarative HTTP Service Clients', 'why timeouts are required']),
    h2('RestClient'),
    p('<code>RestClient</code> is the modern synchronous HTTP client in Spring (it replaces new uses of <code>RestTemplate</code>). For a typed interface instead of hand-written calls, Spring\'s <strong>HTTP Service Clients</strong> turn an annotated interface into a client — the recommended replacement for new OpenFeign code.'),
    p('In this example the same application plays both roles: <code>QuoteApi</code> is the “remote” service, and the client calls it over HTTP.'),
    run(`import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

record Quote(String symbol, double price) { }

@RestController
class QuoteApi {                                   // pretend this runs somewhere else
    @GetMapping("/quotes/{symbol}")
    Quote quote(@PathVariable String symbol) {
        if (symbol.equals("NOPE")) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND);
        return new Quote(symbol, 187.5);
    }
}

class QuoteNotFoundException extends RuntimeException {
    QuoteNotFoundException(String message) { super(message); }
}

interface QuoteClient {                            // HTTP Service Client: just an interface
    @GetExchange("/quotes/{symbol}")
    Quote get(@PathVariable String symbol);
}

` + main(['"server.port=0"'], `            String port = context.getEnvironment().getProperty("local.server.port");

            var requestFactory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build());
            requestFactory.setReadTimeout(Duration.ofSeconds(3));

            RestClient quotes = RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .requestFactory(requestFactory)
                .defaultHeader("X-Client", "portfolio-service")
                .defaultStatusHandler(HttpStatusCode::is4xxClientError, (req, res) -> {
                    throw new QuoteNotFoundException(req.getURI().getPath() + " returned " + res.getStatusCode().value());
                })
                .build();

            Quote quote = quotes.get().uri("/quotes/{s}", "ACME").retrieve().body(Quote.class);
            System.out.println("RestClient: " + quote);

            try {
                quotes.get().uri("/quotes/{s}", "NOPE").retrieve().body(Quote.class);
            } catch (QuoteNotFoundException ex) {
                System.out.println("Handled: " + ex.getMessage());
            }

            QuoteClient client = HttpServiceProxyFactory
                .builderFor(RestClientAdapter.create(quotes)).build()
                .createClient(QuoteClient.class);
            System.out.println("HTTP Service Client: " + client.get("SPRG"));`),
    `RestClient: Quote[symbol=ACME, price=187.5]
Handled: /quotes/NOPE returned 404
HTTP Service Client: Quote[symbol=SPRG, price=187.5]`, 'web', 'RestClient and an HTTP Service Client'),
    BP.explained([
      '<code>RestClient.builder()</code> sets a base URL, default headers and a request factory once; reuse the built client (it is thread-safe).',
      'The request factory sets a <strong>connect timeout</strong> and a <strong>read timeout</strong>. Without them, a slow remote service can hold your threads forever.',
      '<code>retrieve().body(Quote.class)</code> sends the request and converts the JSON into a record.',
      '<code>defaultStatusHandler</code> turns 4xx responses into your own exception, so callers do not deal with HTTP details.',
      '<code>HttpServiceProxyFactory</code> implements <code>QuoteClient</code> for you; each method call becomes an HTTP request.',
    ]),
    BP.remember(['Always set timeouts on outbound calls.', 'Wrap remote errors in your own exceptions at the client boundary.', 'Prefer HTTP Service Clients over new OpenFeign clients.']),
    BP.mistake('Creating a new <code>RestClient</code> for every request inside a loop. Build it once (for example as a <code>@Bean</code>) and reuse it.'),
    BP.next('sbp_jpa', 'store data in a real database.'),
  ]);

  // ================================================================== Data
  const dataImports = `import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
`;
  const patientEntity = `
@Entity
@Table(name = "patients")
class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String city;

    protected Patient() { }                 // JPA needs a no-argument constructor

    Patient(String name, String email, String city) {
        this.name = name;
        this.email = email;
        this.city = city;
    }

    Long getId() { return id; }
    String getName() { return name; }
    String getEmail() { return email; }
    String getCity() { return city; }
    void setCity(String city) { this.city = city; }

    @Override public String toString() { return "Patient(" + id + ", " + name + ", " + city + ")"; }
}
`;
  JT.bootPathData = { dataImports, patientEntity };

  page('sbp_jpa', () => [
    BP.goals(['what JPA and Hibernate are', 'mapping a class to a table with <code>@Entity</code>', 'the SQL Hibernate runs for you']),
    h2('What is JPA?'),
    p('<strong>JPA</strong> (Jakarta Persistence) is the standard Java API for mapping objects to relational tables. <strong>Hibernate</strong> is the implementation Spring Boot uses. <strong>Spring Data JPA</strong> adds repositories so you rarely write data-access code by hand.'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>            <!-- in-memory database for learning and tests -->
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>`, 'pom.xml', 'xml'),
    h2('Example: an entity and the SQL behind it'),
    run(dataImports + patientEntity + `
interface PatientRepository extends JpaRepository<Patient, Long> { }

` + main(['"spring.jpa.show-sql=true"'], `            PatientRepository repository = context.getBean(PatientRepository.class);
            Patient saved = repository.save(new Patient("Jane Doe", "jane@example.com", "Oslo"));
            System.out.println("saved with id " + saved.getId());
            System.out.println("found: " + repository.findById(saved.getId()).orElseThrow());`),
    `Hibernate: drop table if exists patients cascade
Hibernate: create table patients (id bigint generated by default as identity, city varchar(255), email varchar(255) not null unique, name varchar(255) not null, primary key (id))
Hibernate: insert into patients (city,email,name,id) values (?,?,?,default)
saved with id 1
Hibernate: select p1_0.id,p1_0.city,p1_0.email,p1_0.name from patients p1_0 where p1_0.id=?
found: Patient(1, Jane Doe, Oslo)
Hibernate: drop table if exists patients cascade`, 'data', 'Save and load an entity'),
    BP.explained([
      '<code>@Entity</code> maps the class to a table; <code>@Table(name = "patients")</code> names it.',
      '<code>@Id</code> is the primary key; <code>GenerationType.IDENTITY</code> lets the database generate it.',
      '<code>@Column(nullable = false, unique = true)</code> describes constraints. For an in-memory database Boot uses <code>ddl-auto=create-drop</code>: you can see Hibernate create the table from the entity at startup and drop it at shutdown.',
      'JPA needs a no-argument constructor; making it <code>protected</code> keeps your own code from using it.',
      '<code>spring.jpa.show-sql=true</code> prints each SQL statement so you can see what Hibernate does. Use it while learning, not in production.',
    ]),
    BP.remember(['Entities are database models, not API models: keep DTOs for the web layer.', 'In production, create tables with migrations (' + JT.link('sbp_postgres', 'Flyway') + '), not from entities.']),
    BP.mistake('Using <code>spring.jpa.hibernate.ddl-auto=update</code> in production. It cannot rename or safely migrate columns and changes the schema without review. Use <code>validate</code> plus Flyway.'),
    BP.next('sbp_repositories'),
  ], { exercise: { q: 'Mark the primary key field.', code: '@Entity\nclass Patient {\n    @___\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n}', options: ['Id', 'Key', 'Column', 'Primary'], answer: ['Id'] } });

  page('sbp_repositories', () => [
    BP.goals(['the methods <code>JpaRepository</code> gives you', 'derived queries from method names', 'returning <code>Optional</code>']),
    h2('What is a repository?'),
    p('A Spring Data repository is an <strong>interface</strong>. You extend <code>JpaRepository&lt;Entity, IdType&gt;</code> and Spring generates the implementation at startup — including queries derived from method names such as <code>findByEmail</code>.'),
    run(dataImports + patientEntity + `
interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    List<Patient> findByCity(String city);
    boolean existsByEmail(String email);
}

` + main([], `            PatientRepository patients = context.getBean(PatientRepository.class);
            patients.saveAll(List.of(
                new Patient("Jane Doe", "jane@example.com", "Oslo"),
                new Patient("Omar Ali", "omar@example.com", "Bergen"),
                new Patient("Li Wei", "li@example.com", "Oslo")));

            System.out.println("count: " + patients.count());
            System.out.println("by email: " + patients.findByEmail("omar@example.com").orElseThrow());
            System.out.println("missing: " + patients.findByEmail("nobody@example.com").isPresent());
            System.out.println("in Oslo: " + patients.findByCity("Oslo"));
            System.out.println("exists: " + patients.existsByEmail("li@example.com"));

            patients.deleteById(2L);
            System.out.println("after delete: " + patients.findAll());`),
    `count: 3
by email: Patient(2, Omar Ali, Bergen)
missing: false
in Oslo: [Patient(1, Jane Doe, Oslo), Patient(3, Li Wei, Oslo)]
exists: true
after delete: [Patient(1, Jane Doe, Oslo), Patient(3, Li Wei, Oslo)]`, 'data', 'CRUD and derived queries'),
    BP.explained([
      '<code>JpaRepository</code> provides <code>save</code>, <code>saveAll</code>, <code>findById</code>, <code>findAll</code>, <code>count</code>, <code>deleteById</code> and more.',
      'Spring parses method names: <code>findByEmail</code> becomes <code>where email = ?</code>; <code>existsByEmail</code> returns a boolean.',
      'Return <code>Optional</code> for “zero or one” results so the caller must handle the missing case.',
      'You never write an implementation class.',
    ]),
    BP.mistake('Calling <code>findById(id).get()</code>. It throws a vague <code>NoSuchElementException</code>. Use <code>orElseThrow(() -> new PatientNotFoundException(id))</code> so the API can answer 404.'),
    BP.next('sbp_queries'),
  ], { exercise: { q: 'Declare a derived query that finds a patient by email.', code: 'interface PatientRepository extends JpaRepository<Patient, Long> {\n    Optional<Patient> ___(String email);\n}', options: ['findByEmail', 'selectEmail', 'queryEmail', 'getEmailWhere'], answer: ['findByEmail'] } });

  page('sbp_queries', () => [
    BP.goals(['more derived query keywords', 'JPQL with <code>@Query</code>', 'pagination and sorting']),
    run(`import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
` + patientEntity + `
interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByCityOrderByNameAsc(String city);
    List<Patient> findByNameContainingIgnoreCase(String part);
    long countByCity(String city);
    Page<Patient> findByCity(String city, Pageable pageable);

    @Query("select p.city, count(p) from Patient p group by p.city order by p.city")
    List<Object[]> countPerCity();

    @Query("select p from Patient p where lower(p.email) like lower(concat('%', :domain))")
    List<Patient> withEmailDomain(@Param("domain") String domain);
}

` + main([], `            PatientRepository patients = context.getBean(PatientRepository.class);
            patients.saveAll(List.of(
                new Patient("Mia", "mia@clinic.org", "Oslo"), new Patient("Ola", "ola@example.com", "Oslo"),
                new Patient("Ann", "ann@clinic.org", "Oslo"), new Patient("Ben", "ben@example.com", "Bergen"),
                new Patient("Eva", "eva@example.com", "Oslo")));

            System.out.println("sorted:   " + patients.findByCityOrderByNameAsc("Oslo"));
            System.out.println("contains: " + patients.findByNameContainingIgnoreCase("A"));
            System.out.println("count:    " + patients.countByCity("Oslo"));
            for (Object[] row : patients.countPerCity()) System.out.println("city:     " + row[0] + " = " + row[1]);
            System.out.println("domain:   " + patients.withEmailDomain("@clinic.org"));

            Page<Patient> page = patients.findByCity("Oslo", PageRequest.of(0, 2, Sort.by("name")));
            System.out.println("page 1 of " + page.getTotalPages() + " (" + page.getTotalElements() + " rows): " + page.getContent());
            page = patients.findByCity("Oslo", page.nextPageable());
            System.out.println("page 2: " + page.getContent() + " hasNext=" + page.hasNext());`),
    `sorted:   [Patient(3, Ann, Oslo), Patient(5, Eva, Oslo), Patient(1, Mia, Oslo), Patient(2, Ola, Oslo)]
contains: [Patient(1, Mia, Oslo), Patient(2, Ola, Oslo), Patient(3, Ann, Oslo), Patient(5, Eva, Oslo)]
count:    4
city:     Bergen = 1
city:     Oslo = 4
domain:   [Patient(1, Mia, Oslo), Patient(3, Ann, Oslo)]
page 1 of 2 (4 rows): [Patient(3, Ann, Oslo), Patient(5, Eva, Oslo)]
page 2: [Patient(1, Mia, Oslo), Patient(2, Ola, Oslo)] hasNext=false`, 'data', 'Queries, JPQL and paging'),
    BP.explained([
      'Keywords combine: <code>OrderBy…Asc</code>, <code>Containing</code>, <code>IgnoreCase</code>, <code>countBy</code>, <code>And</code>, <code>Or</code>, <code>Between</code>, <code>In</code>…',
      '<code>@Query</code> holds <strong>JPQL</strong>: it uses entity and field names (<code>Patient p</code>), not table names. Named parameters use <code>:domain</code> and <code>@Param</code>.',
      'A <code>Pageable</code> parameter adds <code>limit</code>/<code>offset</code> and a count query; the <code>Page</code> result knows the total.',
      '<code>page.nextPageable()</code> asks for the following page with the same size and sort.',
    ]),
    p('In a controller, add a <code>Pageable</code> parameter and Spring fills it from <code>?page=0&amp;size=20&amp;sort=name</code>.'),
    BP.mistake('Long derived names such as <code>findByCityAndAgeGreaterThanAndStatusOrderByNameAsc</code>. Once a name stops being readable, switch to <code>@Query</code>.'),
    BP.next('sbp_transactions'),
  ]);

  page('sbp_transactions', () => [
    BP.goals(['what <code>@Transactional</code> guarantees', 'rollback on exceptions', 'why calling a method on <code>this</code> skips the transaction']),
    h2('What is a transaction?'),
    p('A transaction makes several database changes <strong>all-or-nothing</strong>. Put <code>@Transactional</code> on a service method: Spring starts a transaction before it runs and commits after it returns, or rolls back if it throws a runtime exception.'),
    run(`import java.util.*;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Entity
class Account {
    @Id String id;
    long balance;
    protected Account() { }
    Account(String id, long balance) { this.id = id; this.balance = balance; }
}

interface AccountRepository extends JpaRepository<Account, String> { }

@Service
class TransferService {
    private final AccountRepository accounts;
    TransferService(AccountRepository accounts) { this.accounts = accounts; }

    @Transactional
    public void transfer(String from, String to, long amount) {
        Account source = accounts.findById(from).orElseThrow();
        Account target = accounts.findById(to).orElseThrow();
        source.balance -= amount;                     // change 1
        target.balance += amount;                     // change 2
        if (source.balance < 0) throw new IllegalStateException("Insufficient funds");
    }

    public void transferViaThis(String from, String to, long amount) {
        this.audit();                                 // self-invocation: no proxy, no transaction
    }

    @Transactional
    public void audit() {
        System.out.println("transaction active inside audit(): " + TransactionSynchronizationManager.isActualTransactionActive());
    }
}

` + main([], `            AccountRepository accounts = context.getBean(AccountRepository.class);
            TransferService service = context.getBean(TransferService.class);
            accounts.saveAll(List.of(new Account("alice", 100), new Account("bob", 0)));

            service.transfer("alice", "bob", 30);
            print(accounts);

            try {
                service.transfer("alice", "bob", 500);
            } catch (IllegalStateException ex) {
                System.out.println("failed: " + ex.getMessage());
            }
            print(accounts);

            service.audit();
            service.transferViaThis("alice", "bob", 1);`, `
    static void print(AccountRepository accounts) {
        accounts.findAll().stream().sorted(java.util.Comparator.comparing(a -> a.id))
            .forEach(a -> System.out.print(a.id + "=" + a.balance + " "));
        System.out.println();
    }
`),
    `alice=70 bob=30
failed: Insufficient funds
alice=70 bob=30
transaction active inside audit(): true
transaction active inside audit(): false`, 'data', 'Commit, rollback and self-invocation'),
    BP.explained([
      'The first transfer commits: both balances change, and Hibernate writes the changed entities at commit without any <code>save</code> call (<em>dirty checking</em>).',
      'The second transfer changes both accounts in memory, then throws. Spring rolls back, so the database still shows 70 and 30.',
      'Spring applies <code>@Transactional</code> through a <strong>proxy</strong> around the bean. Calling <code>service.audit()</code> goes through the proxy, so a transaction is active.',
      '<code>transferViaThis</code> calls <code>this.audit()</code>, which bypasses the proxy: no transaction. This is the classic self-invocation trap.',
    ]),
    h2('Rules to remember'),
    ul(['Put <code>@Transactional</code> on <strong>service</strong> methods — one business operation, one transaction.', 'By default only <em>unchecked</em> exceptions roll back. Use <code>@Transactional(rollbackFor = Exception.class)</code> for checked ones.',
      'Use <code>@Transactional(readOnly = true)</code> for read methods; it lets Hibernate skip dirty checking.', 'Do not call slow external APIs inside a transaction: it holds a database connection the whole time.']),
    BP.interview([
      ['Why can self-invocation be surprising with @Transactional?', 'Transactions are added by a proxy. A call from inside the bean on <code>this</code> does not pass through the proxy, so the annotation on the called method is ignored. Move the method to another bean or restructure the call.'],
      ['Which exceptions trigger rollback?', 'By default <code>RuntimeException</code> and <code>Error</code>. Checked exceptions commit unless <code>rollbackFor</code> says otherwise.'],
      ['What does REQUIRES_NEW do?', 'Suspends the current transaction and runs the method in a new, independent one — used, for example, for an audit record that must be saved even if the outer transaction rolls back.'],
    ]),
    BP.next('sbp_jdbc'),
  ], { exercise: { q: 'Make the whole method one all-or-nothing database operation.', code: '@Service\nclass TransferService {\n    @___\n    public void transfer(String from, String to, long amount) { ... }\n}', options: ['Transactional', 'Atomic', 'Commit', 'Repository'], answer: ['Transactional'] } });

  page('sbp_jdbc', () => [
    BP.goals(['writing SQL directly with <code>JdbcClient</code>', 'mapping rows to records', 'when to choose JDBC over JPA']),
    h2('JdbcClient'),
    p('<code>JdbcClient</code> is Spring\'s fluent API for plain SQL. You write the SQL, bind parameters, and map each row to a record. Boot creates it automatically when a <code>DataSource</code> exists.'),
    run(`import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.jdbc.core.simple.JdbcClient;

record Invoice(long id, String customer, BigDecimal amount) { }
record CustomerTotal(String customer, BigDecimal total) { }

` + main([], `            JdbcClient jdbc = context.getBean(JdbcClient.class);
            jdbc.sql("create table invoice (id bigint primary key, customer varchar(50), amount decimal(10,2))").update();

            int rows = 0;
            for (Object[] r : List.of(new Object[] {1, "acme", "120.50"}, new Object[] {2, "acme", "80.00"}, new Object[] {3, "globex", "42.10"}))
                rows += jdbc.sql("insert into invoice (id, customer, amount) values (:id, :customer, :amount)")
                    .param("id", r[0]).param("customer", r[1]).param("amount", new BigDecimal((String) r[2]))
                    .update();
            System.out.println("inserted " + rows + " rows");

            Invoice one = jdbc.sql("select id, customer, amount from invoice where id = ?")
                .param(2).query(Invoice.class).single();
            System.out.println(one);

            List<CustomerTotal> totals = jdbc.sql("""
                    select customer, sum(amount) as total
                    from invoice group by customer order by total desc""")
                .query(CustomerTotal.class).list();
            totals.forEach(System.out::println);`),
    `inserted 3 rows
Invoice[id=2, customer=acme, amount=80.00]
CustomerTotal[customer=acme, total=200.50]
CustomerTotal[customer=globex, total=42.10]`, 'data', 'SQL with JdbcClient'),
    BP.explained([
      '<code>.sql(...)</code> takes the SQL; <code>.param("name", value)</code> binds a named parameter (or <code>.param(value)</code> for <code>?</code>). Parameters are always sent separately from the SQL, which prevents SQL injection.',
      '<code>.query(Invoice.class)</code> maps columns to record components by name; <code>single()</code> expects exactly one row, <code>list()</code> returns all.',
      'Reporting queries with <code>group by</code> are natural in SQL and awkward in JPA.',
    ]),
    h2('JPA or JDBC?'),
    table(['Question', 'JPA / Hibernate', 'JdbcClient'], [
      ['You write', 'Entities and repositories', 'SQL'], ['CRUD on a domain model', 'Excellent', 'More code'], ['Reports and bulk SQL', 'Often awkward', 'Natural'],
      ['N+1 risk', 'Yes', 'You control each query'], ['Best fit', 'Transactional business data', 'Reporting, bulk and performance-critical paths'],
    ]),
    p('Most applications use both: JPA for the domain, <code>JdbcClient</code> for the few queries that need precise SQL.'),
    BP.mistake('Building SQL with string concatenation: <code>"... where name = \'" + name + "\'"</code>. That is SQL injection. Always use parameters.'),
    BP.next('sbp_n_plus_one'),
  ]);

  page('sbp_n_plus_one', () => [
    BP.goals(['how lazy relationships cause N+1 queries', 'measuring query counts', 'fixing it with a fetch join or <code>@EntityGraph</code>']),
    h2('What is the N+1 problem?'),
    p('You load a list of N authors with one query. Then, for each author, you touch <code>author.getBooks()</code> — and Hibernate runs one more query per author. That is 1 + N queries. With 500 rows it is 501 queries, and the page becomes slow.'),
    run(`import java.util.*;
import jakarta.persistence.*;
import org.hibernate.SessionFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.support.TransactionTemplate;

@Entity
class Author {
    @Id @GeneratedValue Long id;
    String name;
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    List<Book> books = new ArrayList<>();
    protected Author() { }
    Author(String name, String... titles) {
        this.name = name;
        for (String t : titles) books.add(new Book(t, this));
    }
}

@Entity
class Book {
    @Id @GeneratedValue Long id;
    String title;
    @ManyToOne(fetch = FetchType.LAZY) Author author;
    protected Book() { }
    Book(String title, Author author) { this.title = title; this.author = author; }
}

interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("select distinct a from Author a join fetch a.books")
    List<Author> findAllWithBooks();

    @EntityGraph(attributePaths = "books")
    List<Author> findByNameStartingWith(String prefix);
}

` + main(['"spring.jpa.properties.hibernate.generate_statistics=true"', '"logging.level.org.hibernate.engine.internal.StatisticalLoggingSessionEventListener=off"'], `            AuthorRepository authors = context.getBean(AuthorRepository.class);
            TransactionTemplate tx = context.getBean(TransactionTemplate.class);
            var stats = context.getBean(jakarta.persistence.EntityManagerFactory.class)
                .unwrap(SessionFactory.class).getStatistics();
            authors.saveAll(List.of(new Author("Austen", "Emma", "Persuasion"),
                new Author("Achebe", "Things Fall Apart"), new Author("Atwood", "Surfacing", "Alias Grace")));

            measure("findAll + getBooks()", stats, tx, () -> authors.findAll());
            measure("join fetch", stats, tx, () -> authors.findAllWithBooks());
            measure("@EntityGraph", stats, tx, () -> authors.findByNameStartingWith("A"));`, `
    static void measure(String label, org.hibernate.stat.Statistics stats, TransactionTemplate tx,
                        java.util.function.Supplier<List<Author>> load) {
        stats.clear();
        tx.executeWithoutResult(status -> {
            int books = 0;
            for (Author a : load.get()) books += a.books.size();     // touches each lazy collection
            System.out.printf("%-22s %d books, %d SQL queries%n", label, books, stats.getPrepareStatementCount());
        });
    }
`),
    `findAll + getBooks()   5 books, 4 SQL queries
join fetch             5 books, 1 SQL queries
@EntityGraph           5 books, 1 SQL queries`, 'data', 'Counting queries: 1 + N versus 1'),
    BP.explained([
      '<code>@OneToMany</code> collections are <strong>lazy</strong>: books are loaded only when you first touch <code>a.books</code>.',
      '<code>findAll()</code> runs 1 query for the authors, then 1 per author for the books: 1 + 3 = 4.',
      '<code>join fetch</code> loads authors and books in one SQL join. <code>distinct</code> removes duplicate authors from the result.',
      '<code>@EntityGraph(attributePaths = "books")</code> does the same on a derived query without writing JPQL.',
      'Hibernate statistics count the statements; in a real app, look at the SQL log or an APM tool.',
    ]),
    BP.remember(['Measure query counts in tests for important endpoints.', 'Fetch what the use case needs in one query: fetch join, entity graph or a DTO projection.', 'Keep <code>spring.jpa.open-in-view=false</code> so lazy loading cannot happen silently during JSON rendering.']),
    BP.mistake('Fixing N+1 by switching relationships to <code>FetchType.EAGER</code>. Every query then loads the whole graph, even when it is not needed, and N+1 can still happen.'),
    BP.interview([
      ['How do lazy loading and the N+1 problem arise?', 'Associations are loaded on first access. Iterating a list and touching each item\'s lazy association triggers one query per item, on top of the query that loaded the list.'],
      ['How do you fix it?', 'Use a fetch join, an <code>@EntityGraph</code>, batch fetching (<code>hibernate.default_batch_fetch_size</code>) or a DTO projection query that selects exactly the needed columns.'],
    ]),
    BP.next('sbp_postgres'),
  ]);

  page('sbp_postgres', () => [
    BP.goals(['running PostgreSQL locally with Docker Compose', 'connecting Spring Boot to it', 'versioned schema changes with Flyway']),
    h2('1. Start PostgreSQL'),
    K.show(`services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_DB: patientdb
      POSTGRES_USER: patient
      POSTGRES_PASSWORD: patient
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:`, 'compose.yaml', 'yaml'),
    p('Run <code>docker compose up -d</code>. With the <code>spring-boot-docker-compose</code> dependency, Spring Boot even starts the file for you during development and connects automatically.'),
    h2('2. Dependencies'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-postgresql</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>`, 'pom.xml', 'xml'),
    h2('3. Configuration'),
    K.show(`spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/patientdb
    username: \${DB_USER:patient}
    password: \${DB_PASSWORD:patient}
  jpa:
    hibernate:
      ddl-auto: validate      # Hibernate only checks the schema; Flyway owns it
    open-in-view: false`, 'application.yml', 'yaml'),
    h2('4. Migrations'),
    p('Flyway runs every SQL file in <code>src/main/resources/db/migration</code> once, in version order, and records it in the <code>flyway_schema_history</code> table. Never edit a migration that has run; add a new one.'),
    K.show(`-- V1__create_patients.sql
create table patients (
    id     bigint generated always as identity primary key,
    name   varchar(100) not null,
    email  varchar(200) not null unique,
    city   varchar(100)
);

-- V2__index_patients_city.sql
create index idx_patients_city on patients (city);`, 'db/migration', 'text'),
    shown(`mvn spring-boot:run`, { title: 'Startup log', lang: 'text', label: 'Log excerpt', result: `Flyway Community Edition by Redgate
Database: jdbc:postgresql://localhost:5432/patientdb (PostgreSQL 18.0)
Successfully validated 2 migrations
Migrating schema "public" to version "1 - create patients"
Migrating schema "public" to version "2 - index patients city"
Successfully applied 2 migrations to schema "public", now at version v2` }),
    BP.remember(['<code>ddl-auto=validate</code> in every real environment; Flyway (or Liquibase) creates and changes tables.', 'Test against real PostgreSQL with ' + JT.link('sbp_testcontainers', 'Testcontainers') + '; H2 behaves differently.']),
    BP.mistake('Editing <code>V1__...sql</code> after it ran somewhere. Flyway detects the checksum change and refuses to start. Write <code>V3__...</code> instead.'),
    BP.next('sbp_testing', 'test what you built.'),
  ]);
})();
