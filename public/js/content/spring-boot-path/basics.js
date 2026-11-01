// Spring Boot Learning Path, part 1: the tutorial basics, from the first application to
// configuration and logging. Every runnable example is a complete Spring Boot 4.1 program.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;

  // Shared helpers for every Learning Path file.
  const BP = {
    // Registers a page whose heading is "Spring Boot <span>Title</span>".
    page(slug, body, extra = {}) {
      const title = JT.navInfo[slug] ? JT.navInfo[slug].title : slug;
      const rest = title.startsWith('Spring Boot ') ? title.slice(12) : title;
      JT.def(slug, Object.assign({ title: 'Spring Boot ' + rest, h1: 'Spring Boot <span>' + esc(rest) + '</span>', body: () => body().join('') }, extra));
    },
    // A complete program that runs in the Maven lab. module chooses the starters (see server.js).
    run: (code, out, module, title) => K.spring(code, out, { course: 'springboot', module: module || 'core', title }),
    // Code that needs infrastructure the lab does not start (Kafka, PostgreSQL…): shown with what it prints.
    shown: (code, { title, lang = 'java', result, label = 'Output' } = {}) => K.rails(code, { title, lang, result, label }),
    file: (code, title) => K.show(code, title, 'text'),
    // The start of main(): run the application quietly (no banner, warnings only) and close it at the end.
    main(props, lines, extra = '') {
      return `@SpringBootApplication
public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties(${['"spring.main.banner-mode=off"', '"logging.level.root=warn"', ...props].join(', ')})
                .run()) {
${lines}
        }
    }
${extra}}`;
    },
    // Web examples start on a free port and call themselves with RestClient.
    webStart: `            String port = context.getEnvironment().getProperty("local.server.port");
            RestClient http = RestClient.create("http://localhost:" + port);`,
    // call(...) returns "STATUS body" even for 4xx/5xx responses, so error examples can print them.
    callHelper: `
    static String call(RestClient http, HttpMethod method, String path, String json) {
        RestClient.RequestBodySpec request = http.method(method).uri(path);
        if (json != null) request.contentType(MediaType.APPLICATION_JSON).body(json);
        return request.exchange((req, res) ->
            res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`,
    explained: (items) => h2('Example explained') + ol(items),
    remember: K.remember,
    mistake: K.warn,
    tip: K.tip,
    interview: K.interview,
    // "You will learn" box shown at the top of a lesson.
    goals: (items) => '<div class="note"><p><strong>In this lesson you will learn</strong></p>' + ul(items) + '</div>',
    next: (slug, why) => p('<strong>Next:</strong> ' + JT.link(slug) + (why ? ' — ' + why : '')),
  };
  JT.bootPath = BP;
  const { page, run, shown, main, webStart } = BP;

  // ------------------------------------------------------------------ Home
  page('sbp_home', () => [
    p('Spring Boot is the most popular way to build Java back-end services. This learning path teaches it step by step, the way you would learn it on the job: one small concept per page, a complete example you can run and change, and the reason behind every line.'),
    '<div class="note"><p><strong>Learn by running.</strong> Almost every page has an example with a <strong>Run with Maven</strong> button. It builds a real Spring Boot 4.1 application in a temporary Maven project, runs it, and shows what it printed. Change the code and run it again.</p></div>',
    h2('The learning path'),
    p('Follow the sidebar from top to bottom. Each stage builds on the one before it; the order follows what you need to build one production-quality service before you need distributed systems.'),
    table(['Stage', 'You learn', 'Start here'], JT.bootPathGroups.map(([title, items], i) => [
      String(i + 1), esc(title.replace(/^Spring Boot /, '')),
      items.slice(0, 3).map(([s, t]) => JT.link(s, esc(t))).join(', ') + (items.length > 3 ? ', …' : ''),
    ])),
    h2('What you need'),
    ul(['<strong>Java 17 or newer</strong> (Java 21 LTS is the recommended baseline; Spring Boot 4.1 supports Java 17–27).',
      '<strong>Maven 3.9</strong> to run the examples. Maven downloads Spring Boot the first time, so the first run takes longer.',
      'Basic Java: classes, interfaces, records, lists and maps. If you need a refresher, see the ' + JT.link('default', 'Java Tutorial') + '.']),
    h2('Technology baseline'),
    table(['Component', 'Version used here'], [
      ['Java', '21 LTS (17+ works)'], ['Spring Boot', '4.1.2'], ['Spring Framework', '7.0.x'], ['Spring Cloud', '2025.1.x'],
      ['Build tool', 'Maven'], ['Database', 'PostgreSQL 18 in production, H2 in the examples'],
    ]),
    p('See ' + JT.link('sbp_versions', 'Versions and Compatibility') + ' for the full matrix and ' + JT.link('sbp_modernize', 'Deprecated Patterns') + ' for older tutorial code you should not copy.'),
    h2('Examples and projects'),
    p('Every example on every page is listed on ' + JT.link('sbp_examples', 'All Examples') + '. The <strong>Project</strong> pages combine several lessons into one realistic application: a patient REST API, a secured API, an event-driven claims service, a cached catalog and a production-ready service.'),
    BP.next('sbp_intro', 'what Spring Boot is and why it exists.'),
  ], { title: 'Spring Boot Tutorial', h1: 'Spring Boot <span>Tutorial</span>' });

  // ------------------------------------------------------------------ Intro
  page('sbp_intro', () => [
    BP.goals(['what Spring Framework and Spring Boot each do', 'what problems Spring Boot solves', 'what you can build with it']),
    h2('What is Spring Boot?'),
    p('<strong>Spring Framework</strong> is a Java framework that creates your objects, connects them together and adds features such as web handling, transactions and security. <strong>Spring Boot</strong> sits on top of Spring Framework and sets it up for you: it picks compatible library versions, configures sensible defaults, and runs your application as a single executable JAR with an embedded web server.'),
    table(['Task', 'Plain Java', 'Spring Framework', 'Spring Boot'], [
      ['Create and connect objects', 'You call <code>new</code> everywhere', 'The container does it', 'The container does it'],
      ['Choose library versions', 'You', 'You', 'Starters choose tested versions'],
      ['Configure a web server and JSON', 'You', 'You declare the beans', 'Automatic'],
      ['Run the application', 'Your own launcher', 'Deploy to a server', '<code>java -jar app.jar</code>'],
      ['Health checks and metrics', 'Build them', 'Build them', 'Actuator'],
    ]),
    h2('Why use Spring Boot?'),
    ul(['<strong>Fast start:</strong> a working REST API is one class and one dependency.',
      '<strong>Production ready:</strong> health checks, metrics, graceful shutdown and externalized configuration are built in.',
      '<strong>One ecosystem:</strong> databases, security, messaging, caching and batch jobs all follow the same style.',
      '<strong>You can still override everything:</strong> when you define your own bean, Spring Boot steps back.']),
    h2('What can you build?'),
    ul(['REST and GraphQL APIs', 'Event-driven services with Kafka or RabbitMQ', 'Scheduled and batch jobs', 'Back ends for web and mobile apps', 'Microservices']),
    BP.remember(['Spring Boot does not replace Spring Framework; your code still uses Spring Framework annotations and APIs.',
      'Spring Boot = Spring Framework + starters + auto-configuration + embedded server + production features.']),
    BP.interview([
      ['What is the difference between Spring and Spring Boot?', 'Spring Framework provides the programming model: dependency injection, MVC, transactions. Spring Boot is an opinionated layer that configures Spring for you through starters, auto-configuration, an embedded server and Actuator.'],
      ['Is Spring Boot only for microservices?', 'No. It is equally good for a single modular application. Most new systems should start as one well-structured service.'],
    ]),
    BP.next('sbp_get_started'),
  ]);

  // ------------------------------------------------------------------ Get started
  page('sbp_get_started', () => [
    BP.goals(['how to create a Spring Boot project', 'what goes in <code>pom.xml</code>', 'the Maven commands you use every day']),
    h2('Create a project'),
    p('The quickest way is <strong>Spring Initializr</strong> at <code>start.spring.io</code> (also built into IntelliJ IDEA and VS Code). Choose <em>Maven</em>, <em>Java</em>, Spring Boot <em>4.1.2</em>, Java <em>21</em>, and add the <em>Spring Web</em> dependency. Download the ZIP and open it in your IDE.'),
    h2('The pom.xml'),
    p('The parent POM gives you tested versions for every Spring library, so dependencies inside it have <strong>no version</strong>.'),
    K.show(`<project>
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.1.2</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>spring-lab</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`, 'pom.xml', 'xml'),
    BP.tip('In Spring Boot 4 the web starter is <code>spring-boot-starter-webmvc</code>. The old name <code>spring-boot-starter-web</code> still works but is deprecated.'),
    h2('Everyday commands'),
    shown(`mvn clean test          # compile and run the tests
mvn spring-boot:run     # start the application
mvn clean package       # build target/spring-lab-0.0.1-SNAPSHOT.jar
java -jar target/spring-lab-0.0.1-SNAPSHOT.jar`, { title: 'Terminal', lang: 'text', label: 'Terminal', result: `Tomcat started on port 8080 (http) with context path '/'
Started DemoApplication in 1.4 seconds (process running for 1.7)` }),
    BP.remember(['Use the Spring Boot parent (or the <code>spring-boot-dependencies</code> BOM) and leave Spring library versions out.',
      'A Spring Boot JAR contains your code, all libraries and the web server; one <code>java -jar</code> runs it.']),
    BP.mistake('Pinning versions of Hibernate, Jackson or Spring Security by hand. Boot tests one coherent set; mixing versions causes <code>NoSuchMethodError</code> at runtime.'),
    BP.next('sbp_first_app'),
  ], { exercise: { q: 'Complete the dependency for a Spring MVC web application in Spring Boot 4.', code: '<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>___</artifactId>\n</dependency>', options: ['spring-boot-starter-webmvc', 'spring-webmvc-boot', 'spring-boot-web-server', 'spring-mvc-starter'], answer: ['spring-boot-starter-webmvc'], explain: 'Boot 4 names the MVC starter <code>spring-boot-starter-webmvc</code>.' } });

  // ------------------------------------------------------------------ First application
  page('sbp_first_app', () => [
    BP.goals(['the main class and <code>@SpringBootApplication</code>', 'a service and a controller', 'how a request reaches your code']),
    h2('A complete application'),
    p('A Spring Boot application is a normal Java class with a <code>main</code> method. Below are the three classes every beginner project has: the application, a service with the logic, and a controller for HTTP.'),
    run(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@Service
class GreetingService {
    String greet(String name) {
        return "Hello, " + name;
    }
}

@RestController
class GreetingController {
    private final GreetingService greetingService;

    GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/hello")
    String hello(@RequestParam(defaultValue = "Spring") String name) {
        return greetingService.greet(name);
    }
}

` + main(['"server.port=0"'], webStart + `
            System.out.println(http.get().uri("/hello?name=Alex").retrieve().body(String.class));
            System.out.println(http.get().uri("/hello").retrieve().body(String.class));`),
    `Hello, Alex
Hello, Spring`, 'web', 'Hello, Spring Boot'),
    BP.explained([
      '<code>@SpringBootApplication</code> marks the main class. It turns on component scanning and auto-configuration.',
      '<code>@Service</code> and <code>@RestController</code> tell Spring to create one object of each class (a <em>bean</em>).',
      'Spring sees that <code>GreetingController</code> needs a <code>GreetingService</code> in its constructor and passes it in. This is <strong>dependency injection</strong>.',
      '<code>@GetMapping("/hello")</code> maps HTTP GET <code>/hello</code> to the method; <code>@RequestParam</code> reads <code>?name=</code> and uses the default when it is missing.',
      'The lab starts on a free port (<code>server.port=0</code>) and calls itself so you can see the response. In your own project <code>main</code> is just <code>SpringApplication.run(DemoApplication.class, args);</code> and you call it with a browser or curl.',
    ]),
    h2('The normal way to run it'),
    K.show(`@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`, 'DemoApplication.java', 'java'),
    shown(`mvn spring-boot:run
curl "http://localhost:8080/hello?name=Alex"`, { title: 'Terminal', lang: 'text', label: 'Response', result: 'Hello, Alex' }),
    h2('How a request reaches your method'),
    ol(['Embedded Tomcat receives <code>GET /hello?name=Alex</code>.', 'Spring MVC\'s <code>DispatcherServlet</code> finds the controller method mapped to <code>/hello</code>.',
      'It converts the query parameter to the <code>String name</code> argument.', 'Your method returns a value; Spring writes it to the response body.']),
    BP.mistake('Putting controllers in a package that is <em>not</em> below the main class (for example main class in <code>com.example.app</code>, controller in <code>com.example.web</code>). Component scanning starts at the main class package, so the controller is never found and you get 404.'),
    BP.interview([
      ['What does @SpringBootApplication combine?', '<code>@SpringBootConfiguration</code> (a <code>@Configuration</code>), <code>@EnableAutoConfiguration</code> and <code>@ComponentScan</code> of the main class package.'],
      ['What is the difference between @Controller and @RestController?', '<code>@RestController</code> = <code>@Controller</code> + <code>@ResponseBody</code>: return values are written to the response body (usually JSON) instead of naming a view template.'],
    ]),
    BP.next('sbp_project_structure'),
  ], { exercise: { q: 'Map the method to HTTP GET <code>/hello</code>.', code: '@RestController\nclass GreetingController {\n    @___("/hello")\n    String hello() { return "Hi"; }\n}', options: ['GetMapping', 'GetRoute', 'Get', 'RequestParam'], answer: ['GetMapping'] } });

  // ------------------------------------------------------------------ Project structure
  page('sbp_project_structure', () => [
    BP.goals(['the standard Maven folder layout', 'packaging by feature', 'which layer does what']),
    h2('The standard layout'),
    BP.file(`patient-service/
├── pom.xml
├── compose.yaml                      local PostgreSQL/Kafka for development
└── src/
    ├── main/
    │   ├── java/com/example/patients/
    │   │   ├── PatientServiceApplication.java   main class (top package)
    │   │   ├── patient/                         one package per feature
    │   │   │   ├── PatientController.java       HTTP: request/response only
    │   │   │   ├── PatientService.java          business rules + @Transactional
    │   │   │   ├── PatientRepository.java       database access
    │   │   │   ├── Patient.java                 JPA entity
    │   │   │   └── CreatePatientRequest.java    DTO with validation
    │   │   └── common/
    │   │       └── ApiExceptionHandler.java     errors for every controller
    │   └── resources/
    │       ├── application.yml                  configuration
    │       └── db/migration/V1__patients.sql    Flyway migrations
    └── test/java/com/example/patients/...       tests mirror the main packages`, 'Project layout'),
    h2('Layers'),
    table(['Layer', 'Annotation', 'Responsibility', 'Must not'], [
      ['Controller', '<code>@RestController</code>', 'Map HTTP to Java, validate input, choose status codes', 'Contain business rules or SQL'],
      ['Service', '<code>@Service</code>', 'Business rules, transactions, orchestration', 'Know about HTTP request objects'],
      ['Repository', '<code>@Repository</code> / Spring Data interface', 'Load and save data', 'Contain business decisions'],
      ['DTO', 'record', 'Shape of the API request/response', 'Be a JPA entity'],
    ]),
    h2('Package by feature'),
    p('Group classes by feature (<code>patient</code>, <code>billing</code>) rather than by type (<code>controllers</code>, <code>services</code>). A feature package keeps related code together and lets you make classes package-private, so other features can only use what you expose.'),
    BP.remember(['The main class goes in the top package; everything else goes below it.', 'Controllers are thin: they translate HTTP to a service call and back.']),
    BP.next('sbp_ioc'),
  ]);

  // ------------------------------------------------------------------ IoC
  page('sbp_ioc', () => [
    BP.goals(['what Inversion of Control means', 'constructor injection', 'that beans are singletons by default']),
    h2('What is IoC?'),
    p('Without Spring, each class creates the objects it needs with <code>new</code>. With <strong>Inversion of Control</strong>, the Spring <em>container</em> (the <code>ApplicationContext</code>) creates the objects, called <strong>beans</strong>, and hands each one the beans it depends on. Your class only declares what it needs.'),
    h2('Example'),
    run(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

interface Notifier {
    String send(String to, String text);
}

@Component
class EmailNotifier implements Notifier {
    public String send(String to, String text) {
        return "EMAIL to " + to + ": " + text;
    }
}

@Service
class WelcomeService {
    private final Notifier notifier;

    WelcomeService(Notifier notifier) {      // Spring passes the Notifier bean in
        this.notifier = notifier;
    }

    String welcome(String user) {
        return notifier.send(user, "Welcome aboard!");
    }
}

` + main([], `            WelcomeService service = context.getBean(WelcomeService.class);
            System.out.println(service.welcome("ada@example.com"));
            System.out.println("Notifier used: " + context.getBean(Notifier.class).getClass().getSimpleName());
            System.out.println("Same object every time: " + (service == context.getBean(WelcomeService.class)));`),
    `EMAIL to ada@example.com: Welcome aboard!
Notifier used: EmailNotifier
Same object every time: true`, 'core', 'Constructor injection'),
    BP.explained([
      'Component scanning finds <code>EmailNotifier</code> and <code>WelcomeService</code> and creates one bean of each.',
      '<code>WelcomeService</code> asks for a <code>Notifier</code> — an interface. Spring finds the only bean that implements it.',
      '<code>WelcomeService</code> never mentions <code>EmailNotifier</code>, so you can swap in an SMS notifier or a test fake without changing it.',
      'Beans are <strong>singletons</strong> by default: the context returns the same object every time.',
    ]),
    h2('Why constructor injection?'),
    ul(['Dependencies are visible in one place and fields can be <code>final</code>.', 'The object is never half-built: it cannot exist without its dependencies.',
      'Tests can call the constructor directly with a fake — no Spring needed.', 'With a single constructor, no <code>@Autowired</code> is needed.']),
    BP.mistake('Field injection (<code>@Autowired private Notifier notifier;</code>). It hides dependencies, prevents <code>final</code>, and forces tests to use reflection or a Spring context.'),
    BP.interview([
      ['What is the difference between BeanFactory and ApplicationContext?', '<code>BeanFactory</code> is the basic container that creates beans. <code>ApplicationContext</code> extends it with events, internationalization, resource loading, environment/profiles and eager creation of singletons. Applications use <code>ApplicationContext</code>.'],
      ['Why prefer constructor injection?', 'Required dependencies are explicit, fields can be final, the object is always fully initialized, and tests can create it with plain <code>new</code>.'],
      ['What happens if two beans implement the same interface?', 'Startup fails with <code>NoUniqueBeanDefinitionException</code> unless one is <code>@Primary</code> or the injection point uses <code>@Qualifier</code>. See ' + JT.link('sbp_beans', 'Beans and @Configuration') + '.'],
    ]),
    BP.next('sbp_beans'),
  ], { exercise: { q: 'Which kind of injection makes dependencies explicit and lets fields be <code>final</code>?', code: 'class OrderService {\n    private final PaymentClient client;\n    ___(PaymentClient client) { this.client = client; }\n}', options: ['OrderService', '@Autowired void set', 'static', 'new'], answer: ['OrderService'], explain: 'A constructor that takes the dependency: constructor injection.' } });

  // ------------------------------------------------------------------ Beans
  page('sbp_beans', () => [
    BP.goals(['creating beans with <code>@Bean</code> methods', 'choosing between two beans with <code>@Primary</code> and <code>@Qualifier</code>', 'prototype scope']),
    h2('Two ways to create beans'),
    table(['Way', 'Use it for'], [
      ['<code>@Component</code>, <code>@Service</code>, <code>@Repository</code>, <code>@RestController</code> on your class', 'Your own classes'],
      ['A <code>@Bean</code> method in a <code>@Configuration</code> class', 'Library classes you cannot annotate (<code>Clock</code>, <code>RestClient</code>) or beans that need setup code'],
    ]),
    h2('Example'),
    run(`import java.time.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Service;

interface Notifier { String send(String text); }

@Configuration
class AppConfig {
    @Bean
    Clock clock() {                          // a library class becomes a bean
        return Clock.fixed(Instant.parse("2026-10-31T09:00:00Z"), ZoneOffset.UTC);
    }

    @Bean @Primary
    Notifier emailNotifier() { return text -> "email: " + text; }

    @Bean
    Notifier smsNotifier() { return text -> "sms: " + text; }

    @Bean @Scope("prototype")
    StringBuilder reportBuffer() { return new StringBuilder(); }
}

@Service
class ReminderService {
    private final Clock clock;
    private final Notifier defaultNotifier;
    private final Notifier urgentNotifier;

    ReminderService(Clock clock, Notifier defaultNotifier,
                    @Qualifier("smsNotifier") Notifier urgentNotifier) {
        this.clock = clock;
        this.defaultNotifier = defaultNotifier;
        this.urgentNotifier = urgentNotifier;
    }

    void remind() {
        System.out.println(defaultNotifier.send("appointment at " + LocalTime.now(clock)));
        System.out.println(urgentNotifier.send("appointment moved"));
    }
}

` + main([], `            context.getBean(ReminderService.class).remind();
            var a = context.getBean("reportBuffer");
            var b = context.getBean("reportBuffer");
            System.out.println("prototype gives a new object each time: " + (a != b));`),
    `email: appointment at 09:00
sms: appointment moved
prototype gives a new object each time: true`, 'core', '@Bean, @Primary, @Qualifier and scopes'),
    BP.explained([
      'Each <code>@Bean</code> method runs once; its return value becomes a bean named after the method.',
      'Two beans implement <code>Notifier</code>. <code>@Primary</code> makes <code>emailNotifier</code> the default.',
      '<code>@Qualifier("smsNotifier")</code> picks a specific bean by name for one injection point.',
      'A fixed <code>Clock</code> bean makes time-dependent code testable: inject <code>Clock</code> instead of calling <code>LocalTime.now()</code>.',
      '<code>@Scope("prototype")</code> creates a new object for every lookup. Singleton (one per context) is the default and the right choice for stateless services.',
    ]),
    BP.remember(['Beans should be stateless; a singleton is shared by every request thread.', 'Inject <code>Clock</code> rather than calling <code>now()</code> directly.']),
    BP.mistake('Storing per-request data (a current user, a running total) in a field of a singleton bean. Two concurrent requests overwrite each other.'),
    BP.next('sbp_auto_config'),
  ], { exercise: { q: 'Choose the bean named <code>smsNotifier</code> for this parameter.', code: 'ReminderService(@___("smsNotifier") Notifier urgent) { ... }', options: ['Qualifier', 'Primary', 'Named', 'Bean'], answer: ['Qualifier'] } });

  // ------------------------------------------------------------------ Auto-configuration
  page('sbp_auto_config', () => [
    BP.goals(['how Spring Boot decides which beans to create', 'what "backing off" means', 'how to see the decisions']),
    h2('What is auto-configuration?'),
    p('Spring Boot contains hundreds of configuration classes. Each one has <strong>conditions</strong>: “create a <code>DataSource</code> if a JDBC driver is on the classpath <em>and</em> the application has not defined its own <code>DataSource</code>.” Adding a starter adds libraries, the conditions become true, and the beans appear.'),
    h2('Example: a database with no configuration'),
    p('This lab project has the JPA starter and the H2 driver. The program declares no database beans at all.'),
    run(`import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.jdbc.core.simple.JdbcClient;

` + main([], `            DataSource dataSource = context.getBean(DataSource.class);
            System.out.println("DataSource: " + dataSource.getClass().getSimpleName());
            JdbcClient jdbc = context.getBean(JdbcClient.class);
            System.out.println("1 + 1 = " + jdbc.sql("select 1 + 1").query(Integer.class).single());`),
    `DataSource: HikariDataSource
1 + 1 = 2`, 'data', 'Boot creates the DataSource'),
    h2('Example: define your own bean and Boot backs off'),
    run(`import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.core.simple.JdbcClient;

` + main([], `            DataSource dataSource = context.getBean(DataSource.class);
            System.out.println("DataSource: " + dataSource.getClass().getSimpleName());
            JdbcClient jdbc = context.getBean(JdbcClient.class);
            System.out.println("Database: " + jdbc.sql("select database()").query(String.class).single());`, `
    @Bean
    DataSource dataSource() {
        return new DriverManagerDataSource("jdbc:h2:mem:custom;DB_CLOSE_DELAY=-1", "sa", "");
    }
`),
    `DataSource: DriverManagerDataSource
Database: CUSTOM`, 'data', 'Your bean wins'),
    BP.explained([
      'Boot\'s <code>DataSourceAutoConfiguration</code> is annotated with conditions such as <code>@ConditionalOnClass</code> and <code>@ConditionalOnMissingBean(DataSource.class)</code>.',
      'In the first program no <code>DataSource</code> exists, so Boot creates a pooled <code>HikariDataSource</code> for an in-memory H2 database, plus a <code>JdbcClient</code>.',
      'In the second program you declared a <code>DataSource</code>. The “missing bean” condition is false, so Boot <strong>backs off</strong> and builds <code>JdbcClient</code> on top of yours.',
    ]),
    h2('Seeing the decisions'),
    p('Start the application with <code>--debug</code> (or <code>debug=true</code> in <code>application.yml</code>) to print the <strong>condition evaluation report</strong>: which auto-configurations matched, and why the others did not. Actuator\'s <code>/actuator/conditions</code> endpoint shows the same report.'),
    shown(`java -jar app.jar --debug`, { title: 'Terminal', lang: 'text', label: 'Excerpt', result: `Positive matches:
   DataSourceAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'javax.sql.DataSource', 'org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType'

Negative matches:
   RedisAutoConfiguration:
      Did not match:
         - @ConditionalOnClass did not find required class 'org.springframework.data.redis.core.RedisOperations'` }),
    BP.remember(['Starters add libraries; auto-configuration reacts to libraries and properties.', 'Your own bean of the same type usually replaces Boot\'s (“back off”).']),
    BP.interview([
      ['How does auto-configuration decide whether to create a bean?', 'Boot loads the classes listed in <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code>. Each is guarded by conditions — <code>@ConditionalOnClass</code>, <code>@ConditionalOnProperty</code>, <code>@ConditionalOnMissingBean</code> — evaluated after your own configuration is registered.'],
      ['What does “back off” mean?', 'When you define a bean that an auto-configuration would create, its <code>@ConditionalOnMissingBean</code> condition fails and Boot uses your bean instead.'],
      ['How do you exclude an auto-configuration?', '<code>@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)</code> or the <code>spring.autoconfigure.exclude</code> property.'],
    ]),
    BP.next('sbp_config'),
  ]);

  // ------------------------------------------------------------------ Configuration
  page('sbp_config', () => [
    BP.goals(['<code>application.yml</code>', 'type-safe settings with <code>@ConfigurationProperties</code>', 'where values can come from']),
    h2('application.yml'),
    p('Settings live in <code>src/main/resources/application.yml</code> (or <code>application.properties</code>). Boot\'s own settings start with <code>spring.</code>, <code>server.</code> or <code>management.</code>; you can add your own.'),
    K.show(`spring:
  application:
    name: payment-service

server:
  port: 8080

payment:
  provider: stripe-sandbox
  timeout: 2s
  retries: 3
  currencies: EUR,USD`, 'application.yml', 'yaml'),
    h2('Example: bind settings to a record'),
    run(`import java.time.Duration;
import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@ConfigurationProperties(prefix = "payment")
record PaymentProperties(String provider, Duration timeout, int retries, List<String> currencies) { }

@Service
class PaymentService {
    private final PaymentProperties props;
    private final String appName;

    PaymentService(PaymentProperties props, @Value("\${spring.application.name:unknown}") String appName) {
        this.props = props;
        this.appName = appName;
    }

    void describe() {
        System.out.println(appName + " uses " + props.provider());
        System.out.println("timeout = " + props.timeout().toMillis() + " ms, retries = " + props.retries());
        System.out.println("currencies = " + props.currencies());
    }
}

@ConfigurationPropertiesScan
` + main(['"spring.application.name=payment-service"', '"payment.provider=stripe-sandbox"', '"payment.timeout=2s"', '"payment.retries=3"', '"payment.currencies=EUR,USD"'],
      `            context.getBean(PaymentService.class).describe();`),
    `payment-service uses stripe-sandbox
timeout = 2000 ms, retries = 3
currencies = [EUR, USD]`, 'core', '@ConfigurationProperties'),
    BP.explained([
      'In a real project the values come from <code>application.yml</code>; the lab passes the same keys with <code>.properties(...)</code>.',
      '<code>@ConfigurationProperties(prefix = "payment")</code> binds every <code>payment.*</code> key to the record\'s components.',
      'Boot converts types for you: <code>2s</code> becomes a <code>Duration</code>, <code>EUR,USD</code> becomes a <code>List</code>.',
      '<code>@ConfigurationPropertiesScan</code> registers the record as a bean so it can be injected.',
      '<code>@Value("${key:default}")</code> reads one value, with a default after the colon.',
    ]),
    h2('Where values come from'),
    p('The same key can be set in several places. Later sources in this list override earlier ones, so production can change a value without rebuilding:'),
    ol(['<code>application.yml</code> inside the JAR', '<code>application-{profile}.yml</code> for active profiles', 'An <code>application.yml</code> next to the JAR or in <code>config/</code>',
      'Environment variables: <code>PAYMENT_RETRIES=5</code> sets <code>payment.retries</code>', 'Command-line arguments: <code>--payment.retries=5</code>']),
    table(['', '<code>@ConfigurationProperties</code>', '<code>@Value</code>'], [
      ['Best for', 'A group of related settings', 'One simple value'], ['Type conversion', 'Durations, lists, nested objects', 'Simple types'],
      ['Validation', 'Add <code>@Validated</code> + constraints', 'No'], ['IDE autocomplete', 'Yes, with the configuration processor', 'No'],
    ]),
    BP.mistake('Committing passwords and API keys to <code>application.yml</code>. Put a placeholder such as <code>${PAYMENT_API_KEY}</code> in the file and set the real value as an environment variable or a secret.'),
    BP.next('sbp_profiles'),
  ], { exercise: { q: 'Bind every <code>payment.*</code> key to this record.', code: '@___(prefix = "payment")\nrecord PaymentProperties(String provider, int retries) { }', options: ['ConfigurationProperties', 'Value', 'PropertySource', 'Configuration'], answer: ['ConfigurationProperties'] } });

  // ------------------------------------------------------------------ Profiles
  page('sbp_profiles', () => [
    BP.goals(['what profiles are for', 'profile-specific beans and files', 'how to activate a profile']),
    h2('What is a profile?'),
    p('A <strong>profile</strong> is a named set of configuration — <code>dev</code>, <code>test</code>, <code>prod</code>. The same JAR runs everywhere; the active profile decides which extra beans and settings apply.'),
    h2('Example: a different bean per profile'),
    run(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

interface PaymentGateway { String charge(int cents); }

@Component
@Profile("dev")
class FakeGateway implements PaymentGateway {
    public String charge(int cents) { return "FAKE charge of " + cents + " cents (nothing sent)"; }
}

@Component
@Profile("prod")
class CardGateway implements PaymentGateway {
    public String charge(int cents) { return "REAL charge of " + cents + " cents sent to the card provider"; }
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        for (String profile : new String[] {"dev", "prod"}) {
            try (var context = new SpringApplicationBuilder(Main.class)
                    .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                    .profiles(profile)
                    .run()) {
                System.out.println(profile + " -> " + context.getBean(PaymentGateway.class).charge(1500));
            }
        }
    }
}`, `dev -> FAKE charge of 1500 cents (nothing sent)
prod -> REAL charge of 1500 cents sent to the card provider`, 'core', 'One application, two profiles'),
    BP.explained([
      '<code>@Profile("dev")</code> means “only create this bean when the dev profile is active”.',
      'The program starts the application twice, once per profile, and each run gets a different <code>PaymentGateway</code>.',
      'In real life you activate a profile with <code>--spring.profiles.active=prod</code> or the environment variable <code>SPRING_PROFILES_ACTIVE=prod</code>.',
    ]),
    h2('Profile-specific files'),
    K.show(`# application.yml          — used by every profile
spring:
  datasource:
    url: jdbc:h2:mem:dev

---
# application-prod.yml     — only when "prod" is active; overrides the values above
spring:
  datasource:
    url: jdbc:postgresql://db:5432/payments
    username: \${DB_USER}
    password: \${DB_PASSWORD}`, 'application.yml and application-prod.yml', 'yaml'),
    BP.remember(['Profiles change configuration, not code paths inside methods.', 'Keep production secrets out of every file; read them from the environment.']),
    BP.mistake('Using <code>if (profile.equals("prod"))</code> inside business code. Put the difference in a bean or a property instead, so each environment is a configuration choice.'),
    BP.next('sbp_logging'),
  ]);

  // ------------------------------------------------------------------ Logging
  page('sbp_logging', () => [
    BP.goals(['logging with SLF4J', 'log levels per package', 'what to log and what never to log']),
    h2('Logging in Spring Boot'),
    p('Spring Boot uses <strong>SLF4J</strong> with <strong>Logback</strong> by default. You get a logger for your class and call <code>info</code>, <code>warn</code>, <code>debug</code>… Boot decides which levels are printed from <code>logging.level.*</code> settings.'),
    run(`import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.stereotype.Service;

@Service
class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    void place(String orderId, int items) {
        log.info("Placing order {} with {} items", orderId, items);
        log.debug("Checking stock for order {}", orderId);
        if (items > 10) log.warn("Large order {} needs manual review", orderId);
    }
}

` + main(['"logging.pattern.console=%-5level %logger{0} - %msg%n"', '"logging.level.javatrail.lab.OrderService=debug"'],
      `            OrderService orders = context.getBean(OrderService.class);
            orders.place("A-100", 2);
            orders.place("A-101", 25);`),
    `INFO  OrderService - Placing order A-100 with 2 items
DEBUG OrderService - Checking stock for order A-100
INFO  OrderService - Placing order A-101 with 25 items
DEBUG OrderService - Checking stock for order A-101
WARN  OrderService - Large order A-101 needs manual review`, 'core', 'Log levels and placeholders'),
    BP.explained([
      '<code>{}</code> placeholders are filled in only if the message is actually logged — cheaper than string concatenation.',
      '<code>logging.level.root=warn</code> hides Spring\'s own INFO lines; <code>logging.level.javatrail.lab.OrderService=debug</code> turns on DEBUG for one class. A package name (<code>logging.level.com.example.orders=debug</code>) covers a whole feature.',
      'The pattern is shortened for the lab. Normal output also has a timestamp, thread and process id.',
    ]),
    h2('Levels'),
    table(['Level', 'Use for'], [['ERROR', 'Something failed and needs attention'], ['WARN', 'Unexpected but handled'], ['INFO', 'Important business events (order placed, job finished)'], ['DEBUG', 'Details for developers, off in production'], ['TRACE', 'Very detailed, rarely used']]),
    h2('Structured logs for production'),
    p('Log aggregation tools (ELK, Loki, Cloud Logging) prefer JSON. Spring Boot can write structured logs with one property:'),
    K.show(`logging:
  structured:
    format:
      console: ecs        # or logstash, gelf`, 'application.yml', 'yaml'),
    BP.mistake('Logging passwords, tokens, card numbers or full request bodies with personal data. Logs are copied to many systems and kept for a long time.'),
    BP.next('sbp_rest', 'build a real REST API.'),
  ]);
})();
