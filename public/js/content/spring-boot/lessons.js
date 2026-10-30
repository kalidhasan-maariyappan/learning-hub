// Spring Boot lessons, part 1: core, configuration, REST, security and testing.
// Every example is a complete Spring Boot 4.1 program that runs in the Maven lab.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('springboot_' + id, title, 'Spring Boot <span>' + esc(title) + '</span>', body);
  const boot = (code, out, module, title) => K.spring(code, out, { course: 'springboot', module, title });
  const topics = (id) => JT.springBootGroups.find((g) => g[0] === id)[2].map(([t, tt]) => ['springboot_' + t, tt]);

  // The lab programs start Boot quietly (no banner, warnings only) so the output shows only the lesson.
  const bootMain = (props, lines, extra = '') => `@SpringBootApplication
public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties(${['"spring.main.banner-mode=off"', '"logging.level.root=warn"', ...props].join(', ')})
                .run()) {
${lines}
        }
    }
${extra}}`;
  // Web examples start on a random free port and call themselves with RestClient.
  const webStart = `            String port = context.getEnvironment().getProperty("local.server.port");
            RestClient http = RestClient.create("http://localhost:" + port);`;
  const callHelper = `
    static String call(RestClient http, HttpMethod method, String path, String json) {
        RestClient.RequestBodySpec request = http.method(method).uri(path);
        if (json != null) request.contentType(MediaType.APPLICATION_JSON).body(json);
        return request.exchange((req, res) ->
            res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`;
  JT.bootLesson = { bootMain, webStart, callHelper };

  JT.def('springboot_home', { title: 'Spring Boot', h1: 'Spring <span>Boot</span>', body: () => [
    p('Spring Boot makes it fast to build production-ready Spring applications. It configures Spring for you based on the libraries you add, runs an embedded web server, and adds production features such as health checks and metrics.'),
    p('This course assumes you know the Spring Framework basics (beans, dependency injection, proxies, transactions). If not, start with the <a href="' + JT.url('spring_home') + '">Spring Framework course</a>.'),
    h2('Course map'),
    ...JT.springBootGroups.map(([id, title, list]) => '<h3><a href="' + JT.url('springboot_group_' + id) + '">' + esc(title) + '</a></h3>' +
      ul(list.map(([t, tt]) => '<a href="' + JT.url('springboot_' + t) + '">' + esc(tt) + '</a>'))),
    h2('Running the examples'),
    p('Examples are complete Spring Boot 4.1 applications. <strong>Run with Maven</strong> builds and starts them in a temporary project. Web examples start on a random local port, call themselves, print the result and stop. Database examples use an in-memory H2 database.'),
    note('To keep the output short, the examples turn off the banner and set <code>logging.level.root=warn</code>. A normal application prints startup logs.'),
  ].join('') });

  K.overview('springboot_group_core', 'Spring Boot Core', 'Spring Boot <span>Core</span>', [
    p('What Spring Boot adds on top of Spring Framework, how it decides what to configure, and what happens when the application starts.'),
  ], topics('core'));
  K.overview('springboot_group_config', 'Configuration', 'Spring Boot <span>Configuration</span>', [
    p('The same application artifact must run on a laptop, in CI and in production. Boot reads configuration from many sources so you can change settings without rebuilding.'),
  ], topics('config'));
  K.overview('springboot_group_rest', 'REST APIs', 'Spring Boot <span>REST APIs</span>', [
    p('Spring Boot web applications use Spring MVC. These lessons show a complete API: status codes, validation and the separation between API models and database entities. Error handling with <code>@RestControllerAdvice</code> and <code>ProblemDetail</code> is covered in the <a href="' + JT.url('spring_exception_handling') + '">Spring MVC course</a>.'),
  ], topics('rest'));
  K.overview('springboot_group_security', 'Security', 'Spring Boot <span>Security</span>', [
    p('How Spring Security is set up in a Boot application. For the vulnerabilities themselves — SQL injection, XSS, CSRF, CORS, sessions, JWT and IDOR — see the <a href="' + JT.url('security_home') + '">Security course</a>.'),
  ], topics('security'));
  K.overview('springboot_group_testing', 'Testing', 'Spring Boot <span>Testing</span>', [
    p('Fast tests use as little of Spring as possible. Boot provides test slices that start only the part of the application under test.'),
  ], topics('testing'));

  // ---------------------------------------------------------------- Core
  L('boot_vs_spring', 'Spring Boot vs Spring Framework', () => [
    h2('What is the difference?'),
    p('<strong>Spring Framework</strong> provides the container, dependency injection, AOP, transactions and Spring MVC. <strong>Spring Boot</strong> is built on Spring Framework. It does not replace it; it configures it for you.'),
    table(['', 'Spring Framework alone', 'With Spring Boot'], [
      ['Dependencies', 'Choose compatible versions of every library', 'Starters with tested versions'],
      ['Configuration', 'Declare DataSource, DispatcherServlet, Jackson, transaction manager…', 'Auto-configured from the classpath and properties'],
      ['Server', 'Deploy a WAR to Tomcat', 'Embedded Tomcat in an executable JAR'],
      ['Production features', 'Build yourself', 'Actuator: health, metrics, info'],
    ]),
    h2('Example: a complete web application'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@RestController
class HelloController {
    @GetMapping("/hello")
    String hello() { return "Hello from Spring Boot"; }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println(http.get().uri("/hello").retrieve().body(String.class));`),
    'Hello from Spring Boot', 'web', 'No configuration needed'),
    h2('How does it work?'),
    ol(['<code>@SpringBootApplication</code> combines <code>@Configuration</code>, <code>@ComponentScan</code> and <code>@EnableAutoConfiguration</code>.',
      'Boot sees Spring MVC and Tomcat on the classpath (from <code>spring-boot-starter-webmvc</code>), so it creates a <code>DispatcherServlet</code>, JSON converters and an embedded Tomcat.',
      '<code>server.port=0</code> picks a free port. Normally the default is 8080.',
      'In a real application, <code>main</code> is just <code>SpringApplication.run(Main.class, args);</code>.']),
    K.interview([
      ['What is the difference between Spring and Spring Boot?', 'Spring Framework provides the programming model and modules. Spring Boot is an opinionated layer on top: starters, auto-configuration, embedded servers, externalized configuration and Actuator. Your code still uses Spring Framework APIs.'],
      ['What does @SpringBootApplication do?', 'It is <code>@SpringBootConfiguration</code> (a <code>@Configuration</code>) + <code>@EnableAutoConfiguration</code> + <code>@ComponentScan</code> of the package of the annotated class.'],
      ['Can you deploy a Spring Boot application as a WAR?', 'Yes: package as WAR, mark the embedded server dependency as provided, and extend <code>SpringBootServletInitializer</code>. Executable JARs are the more common choice.'],
    ]),
  ]);

  L('auto_configuration', 'How auto-configuration works', () => [
    h2('What is auto-configuration?'),
    p('Auto-configuration is a set of Spring configuration classes inside Boot that create common beans for you — a <code>DataSource</code>, a <code>JdbcTemplate</code>, Jackson, a transaction manager — when the right libraries are present and you have not defined those beans yourself.'),
    h2('How does Boot decide?'),
    ol(['<code>@EnableAutoConfiguration</code> loads the class names listed in <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code> in each Boot JAR.',
      'Each class has conditions, for example <code>@ConditionalOnClass(JdbcTemplate.class)</code> and <code>@ConditionalOnSingleCandidate(DataSource.class)</code>.',
      'Most beans also have <code>@ConditionalOnMissingBean</code>: <strong>if you define the bean, Boot backs off</strong> and uses yours.',
      'Auto-configuration runs after your own configuration, so your beans are known when conditions are checked.']),
    h2('Example: replacing an auto-configured bean'),
    boot(`import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class Main {
    @Bean
    JdbcTemplate jdbcTemplate(DataSource dataSource) {   // our own JdbcTemplate
        JdbcTemplate template = new JdbcTemplate(dataSource);
        template.setFetchSize(500);
        return template;
    }

    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            System.out.println("DataSource (auto-configured): " + context.getBean(DataSource.class).getClass().getSimpleName());
            System.out.println("JdbcTemplate beans: " + context.getBeansOfType(JdbcTemplate.class).keySet());
            System.out.println("Fetch size: " + context.getBean(JdbcTemplate.class).getFetchSize());
        }
    }
}`, `DataSource (auto-configured): HikariDataSource
JdbcTemplate beans: [jdbcTemplate]
Fetch size: 500`, 'data', 'Boot backs off when you define a bean'),
    h2('How does it work?'),
    ul(['H2 and HikariCP are on the classpath and no <code>DataSource</code> is defined, so Boot creates a pooled in-memory database connection.',
      'We defined a <code>JdbcTemplate</code>, so Boot’s <code>JdbcTemplateAutoConfiguration</code> (guarded by <code>@ConditionalOnMissingBean</code>) does not create a second one.',
      'There is exactly one <code>JdbcTemplate</code>, and it has our fetch size.']),
    h2('Seeing what was configured'),
    ul(['Start with <code>--debug</code> (or <code>debug=true</code>) to print the <strong>condition evaluation report</strong>: which auto-configurations matched and why others did not.',
      'With Actuator, the <code>/actuator/conditions</code> endpoint shows the same report.',
      'Exclude an auto-configuration with <code>@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)</code> or <code>spring.autoconfigure.exclude</code>.']),
    K.interview([
      ['How does Spring Boot auto-configuration work?', 'Boot imports auto-configuration classes listed in <code>AutoConfiguration.imports</code>. Each is a configuration class with conditions (<code>@ConditionalOnClass</code>, <code>@ConditionalOnProperty</code>, <code>@ConditionalOnMissingBean</code>…), so beans are created only when the classpath and properties call for them and you have not defined your own.'],
      ['How do you override an auto-configured bean?', 'Define a bean of the same type. Most auto-configured beans are <code>@ConditionalOnMissingBean</code>, so Boot backs off. Many can also be tuned with properties or customizer beans.'],
      ['How do you find out why a bean was or was not auto-configured?', 'Run with <code>--debug</code> to see the condition evaluation report, or use the Actuator <code>conditions</code> endpoint.'],
      ['How would you write your own auto-configuration?', 'Create an <code>@AutoConfiguration</code> class with conditions, list it in <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code>, and package it with a starter.'],
    ]),
  ]);

  L('starters', 'Starters and dependency management', () => [
    h2('What is a starter?'),
    p('A starter is a dependency that brings a tested set of libraries for one feature. <code>spring-boot-starter-webmvc</code> brings Spring MVC, Jackson and embedded Tomcat; <code>spring-boot-starter-data-jpa</code> brings Spring Data JPA, Hibernate and HikariCP.'),
    h2('Why is it used?'),
    p('Without starters you must pick versions of many libraries that work together. The Boot parent POM (or BOM) manages these versions, so you add dependencies without version numbers.'),
    K.show(`<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>   <!-- no version: managed by Boot -->
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`, 'pom.xml'),
    h2('Common starters'),
    table(['Starter', 'For'], [
      ['<code>spring-boot-starter-webmvc</code>', 'REST APIs and MVC with embedded Tomcat'],
      ['<code>spring-boot-starter-validation</code>', 'Bean Validation (<code>@Valid</code>, <code>@NotBlank</code>)'],
      ['<code>spring-boot-starter-data-jpa</code>', 'JPA with Hibernate and HikariCP'],
      ['<code>spring-boot-starter-security</code>', 'Spring Security'],
      ['<code>spring-boot-starter-actuator</code>', 'Health, metrics and other production endpoints'],
      ['<code>spring-boot-starter-test</code> and <code>…-webmvc-test</code>, <code>…-data-jpa-test</code>', 'JUnit 5, AssertJ, Mockito and test slices'],
    ]),
    h2('Important points'),
    ul(['Spring Boot 4 splits many features into smaller modules and starters, including per-feature test starters such as <code>spring-boot-starter-webmvc-test</code>.',
      'To use a different version of a managed library, override its property (for example <code>&lt;jackson-bom.version&gt;</code>) rather than adding a version to the dependency.',
      'Run <code>mvn dependency:tree</code> to see what a starter actually brings in.']),
    K.interview([
      ['What is a Spring Boot starter?', 'A dependency descriptor that pulls in a curated, version-compatible set of libraries for a feature, usually together with the matching auto-configuration.'],
      ['How does Boot manage dependency versions?', 'Through the <code>spring-boot-dependencies</code> BOM, inherited via <code>spring-boot-starter-parent</code> or imported in <code>dependencyManagement</code>. Versions can be overridden with properties.'],
    ]),
  ]);

  L('startup', 'Startup, runners and events', () => [
    h2('What happens at startup?'),
    ol(['<code>SpringApplication.run</code> prepares the <code>Environment</code> (properties, profiles).',
      'It creates the <code>ApplicationContext</code>, registers your beans and auto-configuration, and refreshes the context: all singletons are created.',
      'For web applications, the embedded server starts.',
      '<code>CommandLineRunner</code> and <code>ApplicationRunner</code> beans run.',
      '<code>ApplicationReadyEvent</code> is published: the application is ready for traffic.']),
    h2('Example'),
    boot(`import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
class ProductCatalog {
    @PostConstruct
    void init() { System.out.println("1. @PostConstruct: the context is creating beans"); }
}

@Component
class ImportRunner implements CommandLineRunner {
    @Override
    public void run(String... args) {
        System.out.println("2. CommandLineRunner: args = " + Arrays.toString(args));
    }
}

@Component
class ReadyListener {
    @EventListener(ApplicationReadyEvent.class)
    void ready() { System.out.println("3. ApplicationReadyEvent: ready for traffic"); }
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run("--import=products.csv")) {
            System.out.println("4. run() returned");
        }
    }
}`, `1. @PostConstruct: the context is creating beans
2. CommandLineRunner: args = [--import=products.csv]
3. ApplicationReadyEvent: ready for traffic
4. run() returned`, 'core', 'Startup order'),
    h2('Important points'),
    ul(['Use a runner or <code>ApplicationReadyEvent</code> for startup work that needs the whole application, for example warming a cache. <code>@PostConstruct</code> runs before proxies and other beans may be ready.',
      'A runner that throws an exception stops the application from starting.',
      'Slow startup work delays readiness. Kubernetes readiness probes report “not ready” until <code>ApplicationReadyEvent</code>.',
      '<code>ApplicationRunner</code> receives parsed <code>ApplicationArguments</code>; <code>CommandLineRunner</code> receives the raw strings.']),
    K.interview([
      ['What happens when you call SpringApplication.run()?', 'It prepares the environment, creates and refreshes the application context (creating beans and applying auto-configuration), starts the embedded server, calls runners, and publishes startup events ending with <code>ApplicationReadyEvent</code>.'],
      ['How do you run code once at startup?', 'A <code>CommandLineRunner</code>/<code>ApplicationRunner</code> bean or an <code>ApplicationReadyEvent</code> listener.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Configuration
  L('configuration_properties', '@ConfigurationProperties vs @Value', () => [
    h2('What is @ConfigurationProperties?'),
    p('<code>@ConfigurationProperties("app.mail")</code> binds all properties that start with <code>app.mail</code> to one typed object. It is the recommended way to read a group of settings in Spring Boot.'),
    h2('Example'),
    boot(`import java.time.Duration;
import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationProperties("app.mail")
record MailProperties(String host, int port, Duration timeout, List<String> admins) { }

@SpringBootApplication
@ConfigurationPropertiesScan
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn",
                            "app.mail.host=smtp.example.com",
                            "app.mail.port=587",
                            "app.mail.timeout=5s",
                            "app.mail.admins=ann@example.com,ben@example.com")
                .run()) {
            MailProperties mail = context.getBean(MailProperties.class);
            System.out.println(mail.host() + ":" + mail.port());
            System.out.println("Timeout: " + mail.timeout().toSeconds() + " seconds");
            System.out.println("Admins: " + mail.admins());
        }
    }
}`, `smtp.example.com:587
Timeout: 5 seconds
Admins: [ann@example.com, ben@example.com]`, 'core', 'Binding a group of properties'),
    h2('How does it work?'),
    ul(['<code>@ConfigurationPropertiesScan</code> finds the record and registers it as a bean.',
      'Each record component is bound from <code>app.mail.&lt;name&gt;</code>. Boot converts <code>"5s"</code> to a <code>Duration</code> and a comma-separated value to a <code>List</code>.',
      'In a real project these values are in <code>application.yml</code> or come from environment variables such as <code>APP_MAIL_HOST</code> (relaxed binding).']),
    K.show(`app:
  mail:
    host: smtp.example.com
    port: 587
    timeout: 5s
    admins:
      - ann@example.com
      - ben@example.com`, 'The same settings in application.yml'),
    h2('@ConfigurationProperties vs @Value'),
    table(['', '@ConfigurationProperties', '@Value'], [
      ['Reads', 'A group of related properties', 'One property'],
      ['Type safety', 'Typed object, nested types, lists, maps, durations', 'Simple conversions'],
      ['Relaxed binding (<code>APP_MAIL_HOST</code>, <code>app.mail-host</code>)', 'Yes', 'Limited'],
      ['Validation', 'Add <code>@Validated</code> and constraints; fails at startup', 'No'],
      ['SpEL expressions', 'No', 'Yes (<code>#{...}</code>)'],
    ]),
    K.interview([
      ['Why prefer @ConfigurationProperties over @Value?', 'It groups settings in one typed, immutable, testable object, supports relaxed binding, nested structures and validation at startup, and IDEs can auto-complete the properties.'],
      ['How do you validate configuration?', 'Annotate the properties class with <code>@Validated</code> and add constraints such as <code>@NotBlank</code> or <code>@Min</code>. Invalid configuration stops startup with a clear message.'],
      ['What is relaxed binding?', 'Boot matches <code>app.mail.host</code>, <code>app.mail-host</code>, and environment variable <code>APP_MAIL_HOST</code> to the same property.'],
    ]),
  ]);

  L('profiles', 'Profiles', () => [
    h2('What are profiles?'),
    p('A profile is a named set of configuration, such as <code>dev</code>, <code>test</code> or <code>prod</code>. When a profile is active, Boot also loads <code>application-{profile}.properties</code> (or <code>.yml</code>) and registers beans marked <code>@Profile("{profile}")</code>.'),
    h2('Example'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import java.util.Arrays;

interface FileStorage {
    String location();
}

@Component
@Profile("!prod")
class LocalFileStorage implements FileStorage {
    public String location() { return "local disk"; }
}

@Component
@Profile("prod")
class CloudFileStorage implements FileStorage {
    public String location() { return "cloud bucket"; }
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        for (String profile : new String[] {"dev", "prod"}) {
            try (var context = new SpringApplicationBuilder(Main.class)
                    .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                    .profiles(profile)
                    .run()) {
                System.out.println(Arrays.toString(context.getEnvironment().getActiveProfiles())
                    + " -> files stored on " + context.getBean(FileStorage.class).location());
            }
        }
    }
}`, `[dev] -> files stored on local disk
[prod] -> files stored on cloud bucket`, 'core', 'One bean per environment'),
    h2('Profile-specific properties'),
    K.show(`# application.yml: shared settings
app:
  cache-ttl: 10m
---
spring:
  config:
    activate:
      on-profile: prod
app:
  cache-ttl: 1h`, 'application.yml with a prod section'),
    p('Activate a profile with <code>SPRING_PROFILES_ACTIVE=prod</code>, <code>--spring.profiles.active=prod</code>, or in tests with <code>@ActiveProfiles("test")</code>.'),
    h2('Important points'),
    ul(['<code>@Profile("!prod")</code> means “any profile except prod”.',
      'Keep profiles for environment differences (URLs, storage, logging). Do not put secrets in profile files in Git.',
      'Avoid many combined profiles; the active configuration becomes hard to reason about.']),
    K.interview([
      ['How do profiles work in Spring Boot?', 'The active profiles decide which <code>application-{profile}</code> files and <code>on-profile</code> document sections are loaded and which <code>@Profile</code> beans are registered. Profile-specific values override the shared ones.'],
      ['How do you set the active profile in production?', 'Usually an environment variable (<code>SPRING_PROFILES_ACTIVE</code>) set by the deployment platform, so the same JAR runs everywhere.'],
    ]),
  ]);

  L('config_precedence', 'Externalized configuration order', () => [
    h2('What is externalized configuration?'),
    p('Spring Boot reads properties from many places. When the same property is set in several places, the source with the higher priority wins. This lets you build one JAR and change settings per environment.'),
    h2('The order (highest first, simplified)'),
    ol(['Command-line arguments: <code>--server.port=9000</code>',
      '<code>SPRING_APPLICATION_JSON</code>',
      'Java system properties: <code>-Dserver.port=9000</code>',
      'OS environment variables: <code>SERVER_PORT=9000</code>',
      'Profile-specific files: <code>application-prod.yml</code> (outside the JAR before inside)',
      '<code>application.yml</code> / <code>application.properties</code> (outside the JAR before inside)',
      '<code>@PropertySource</code> on configuration classes',
      'Default properties (<code>SpringApplication.setDefaultProperties</code>)']),
    h2('Example'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Main {
    static String greeting(String... commandLine) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn",
                            "app.greeting=default property")
                .run(commandLine)) {
            return context.getEnvironment().getProperty("app.greeting");
        }
    }

    public static void main(String[] args) {
        System.out.println("Only a default:      " + greeting());

        System.setProperty("app.greeting", "system property");
        System.out.println("Plus system property: " + greeting());

        System.out.println("Plus command line:    " + greeting("--app.greeting=command-line argument"));
        System.clearProperty("app.greeting");
    }
}`, `Only a default:      default property
Plus system property: system property
Plus command line:    command-line argument`, 'core', 'Higher sources override lower ones'),
    h2('Important points'),
    ul(['Environment variables use upper case with underscores: <code>spring.datasource.url</code> → <code>SPRING_DATASOURCE_URL</code>.',
      'Use <code>spring.config.import</code> to load extra files or a config server, for example <code>optional:file:./secrets.properties</code>.',
      'The Actuator <code>/actuator/env</code> endpoint (if exposed and secured) shows where each value came from.']),
    K.interview([
      ['A property is set in application.yml and as an environment variable. Which wins?', 'The environment variable. OS environment variables have higher priority than application property files.'],
      ['How do you pass secrets to a Boot application?', 'Through environment variables or mounted files from the platform’s secret store (Kubernetes secrets, Vault, cloud secret managers), never in files committed to Git.'],
    ]),
  ]);

  // ---------------------------------------------------------------- REST
  L('rest_api', 'Building a REST API', () => [
    h2('What makes a good REST API?'),
    ul(['URLs name resources: <code>/api/products</code>, <code>/api/products/42</code>.',
      'HTTP methods say what to do: GET reads, POST creates, PUT replaces, PATCH updates part, DELETE removes.',
      'Status codes say what happened: 200, 201 Created, 204 No Content, 400, 404, 409.']),
    h2('Example'),
    boot(`import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

record Product(long id, String name, int price) { }
record CreateProduct(String name, int price) { }

@RestController
@RequestMapping("/api/products")
class ProductController {
    private final Map<Long, Product> products = new ConcurrentHashMap<>();
    private final AtomicLong ids = new AtomicLong();

    @PostMapping
    ResponseEntity<Product> create(@RequestBody CreateProduct request) {
        Product product = new Product(ids.incrementAndGet(), request.name(), request.price());
        products.put(product.id(), product);
        return ResponseEntity.created(URI.create("/api/products/" + product.id())).body(product);
    }

    @GetMapping("/{id}")
    ResponseEntity<Product> get(@PathVariable long id) {
        Product product = products.get(id);
        return product == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable long id) {
        return products.remove(id) == null ? ResponseEntity.notFound().build() : ResponseEntity.noContent().build();
    }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println("POST   " + call(http, HttpMethod.POST, "/api/products", "{\\"name\\":\\"Keyboard\\",\\"price\\":40}"));
            System.out.println("GET    " + call(http, HttpMethod.GET, "/api/products/1", null));
            System.out.println("DELETE " + call(http, HttpMethod.DELETE, "/api/products/1", null));
            System.out.println("GET    " + call(http, HttpMethod.GET, "/api/products/1", null));`, callHelper),
    `POST   201 {"id":1,"name":"Keyboard","price":40}
GET    200 {"id":1,"name":"Keyboard","price":40}
DELETE 204
GET    404`, 'web', 'Create, read and delete'),
    h2('How does it work?'),
    ul(['<code>@RequestMapping("/api/products")</code> sets the base path for every method.',
      '<code>ResponseEntity.created(uri)</code> returns 201 with a <code>Location</code> header pointing at the new resource.',
      'A missing product returns 404 instead of <code>null</code> or an empty 200.',
      'DELETE returns 204 No Content: success, nothing to send back.',
      'The controller is a singleton used by many threads, so it uses a <code>ConcurrentHashMap</code> and <code>AtomicLong</code>. A real API stores data through a service and repository.']),
    h2('Important points'),
    ul(['Keep controllers thin: map HTTP to a service call and back. Business rules go in services.',
      'GET, PUT and DELETE should be idempotent: repeating them has the same effect as doing them once.',
      'Version an API when you must make a breaking change (<code>/api/v2/...</code> or a header), and prefer adding fields over changing them.']),
    K.interview([
      ['PUT vs PATCH vs POST?', 'POST creates (or triggers an action) and is not idempotent. PUT replaces the whole resource and is idempotent. PATCH changes part of a resource.'],
      ['Which status code for a validation error, a missing resource and a duplicate?', '400 Bad Request (or 422), 404 Not Found, and 409 Conflict.'],
      ['What does idempotent mean?', 'Making the same request several times leaves the server in the same state as making it once. GET, PUT and DELETE are idempotent; POST is not.'],
    ]),
  ]);

  L('validation', 'Request validation', () => [
    h2('What is Bean Validation?'),
    p('Bean Validation lets you declare rules on request classes with annotations such as <code>@NotBlank</code>, <code>@Email</code> and <code>@Positive</code>. Adding <code>@Valid</code> to a controller parameter makes Spring check the rules before your method runs.'),
    h2('Example'),
    boot(`import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.Map;
import java.util.TreeMap;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

record RegisterRequest(
    @NotBlank String name,
    @Email @NotBlank String email,
    @Min(18) int age) { }

@RestController
class RegistrationController {
    @PostMapping("/api/users")
    ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body("Registered " + request.name());
    }
}

@RestControllerAdvice
class ValidationErrors {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail invalid(MethodArgumentNotValidException e) {
        Map<String, String> errors = new TreeMap<>();
        e.getBindingResult().getFieldErrors().forEach(f -> errors.put(f.getField(), f.getDefaultMessage()));
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Invalid request");
        problem.setProperty("errors", errors);
        return problem;
    }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println(call(http, HttpMethod.POST, "/api/users",
                "{\\"name\\":\\"Ada\\",\\"email\\":\\"ada@example.com\\",\\"age\\":36}"));
            System.out.println(call(http, HttpMethod.POST, "/api/users",
                "{\\"name\\":\\"\\",\\"email\\":\\"not-an-email\\",\\"age\\":12}"));`, callHelper),
    `201 Registered Ada
400 {"detail":"Invalid request","instance":"/api/users","status":400,"title":"Bad Request","errors":{"age":"must be greater than or equal to 18","email":"must be a well-formed email address","name":"must not be blank"}}`, 'validation', 'Rejecting an invalid request'),
    h2('How does it work?'),
    ul(['The validation starter (<code>spring-boot-starter-validation</code>) adds Hibernate Validator.',
      '<code>@Valid</code> makes Spring validate the record after reading the JSON. If any rule fails, the controller method is not called and Spring throws <code>MethodArgumentNotValidException</code>.',
      'The advice converts the field errors into one 400 response that lists every problem, so a client can show all messages at once.',
      'A <code>TreeMap</code> keeps the fields sorted in the output.']),
    h2('Important points'),
    ul(['Validate at the API boundary (request DTOs). Business rules that need the database, such as “email already registered”, belong in the service.',
      '<code>@Validated</code> on a class enables validation of method parameters such as <code>@RequestParam @Min(1) int page</code>; those failures raise <code>HandlerMethodValidationException</code> (or <code>ConstraintViolationException</code> on services).',
      'Use <code>@Valid</code> on nested objects and list elements so their rules are checked too.',
      'Write a custom constraint (an annotation plus a <code>ConstraintValidator</code>) for reusable rules.']),
    K.interview([
      ['@Valid vs @Validated?', '<code>@Valid</code> (Jakarta) triggers validation of an argument or nested object. <code>@Validated</code> (Spring) also supports validation groups and, on a class, enables method-level validation through a proxy.'],
      ['What happens when validation fails on a @RequestBody?', 'Spring throws <code>MethodArgumentNotValidException</code>; by default it becomes a 400 response. A <code>@RestControllerAdvice</code> can format the field errors.'],
      ['Where should validation live?', 'Format and required-field checks on request DTOs at the boundary; business invariants in the service or domain model.'],
    ]),
  ]);

  L('dto_vs_entity', 'DTOs vs entities', () => [
    h2('What is a DTO?'),
    p('A Data Transfer Object (DTO) is a simple class or record that defines exactly what an API receives or returns. An <strong>entity</strong> is a JPA class mapped to a database table. They change for different reasons and should be separate.'),
    h2('Why not return entities?'),
    ul(['<strong>Data leaks:</strong> every field is serialized, including <code>passwordHash</code> or internal flags.',
      '<strong>Mass assignment:</strong> binding a request to an entity lets clients set fields like <code>role</code>.',
      '<strong>Lazy loading:</strong> JSON serialization touches relations, causing extra queries or <code>LazyInitializationException</code>.',
      '<strong>Coupling:</strong> renaming a column changes the public API.']),
    h2('Example'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

class UserEntity {   // imagine this is a JPA @Entity
    public long id = 7;
    public String email = "ada@example.com";
    public String passwordHash = "$2a$10$abcdefghijklmnopqrstuv";
    public boolean admin = false;
}

record UserResponse(long id, String email) {
    static UserResponse from(UserEntity user) { return new UserResponse(user.id, user.email); }
}

@RestController
class UserController {
    @GetMapping("/entity")
    UserEntity entity() { return new UserEntity(); }

    @GetMapping("/dto")
    UserResponse dto() { return UserResponse.from(new UserEntity()); }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println("Entity: " + http.get().uri("/entity").retrieve().body(String.class));
            System.out.println("DTO:    " + http.get().uri("/dto").retrieve().body(String.class));`),
    `Entity: {"admin":false,"email":"ada@example.com","id":7,"passwordHash":"$2a$10$abcdefghijklmnopqrstuv"}
DTO:    {"id":7,"email":"ada@example.com"}`, 'web', 'Returning an entity leaks fields'),
    h2('How does it work?'),
    ul(['Jackson serializes every public field or getter of the entity, including the password hash.',
      'The DTO contains only what the client needs. Adding a field to the entity no longer changes the API by accident.',
      'Spring Boot 4 uses Jackson 3. It sorts ordinary properties alphabetically, while a record keeps its component order. Clients should never depend on property order.']),
    h2('Mapping'),
    p('A static factory such as <code>UserResponse.from(entity)</code> is simple and explicit. MapStruct generates mappers at compile time for larger models. Spring Data JPA can also return DTO projections directly from a query, which avoids loading whole entities.'),
    K.interview([
      ['Why use DTOs instead of exposing JPA entities?', 'They control exactly which data leaves and enters the API, prevent mass assignment and lazy-loading problems, and let the database model change without breaking clients.'],
      ['Where should mapping between DTOs and entities happen?', 'At the boundary, typically in the service layer or a dedicated mapper, so controllers deal with DTOs and the domain deals with entities.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Security
  L('api_security', 'Securing a REST API', () => [
    h2('What does Boot do for security?'),
    p('Adding <code>spring-boot-starter-security</code> secures every endpoint immediately: all requests need authentication, and Boot creates a user named <code>user</code> with a random password printed in the log. You then replace these defaults with your own <code>SecurityFilterChain</code> and user source.'),
    h2('Example'),
    boot(`import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@RestController
@RequestMapping("/api/orders")
class OrderController {
    @GetMapping
    List<String> list() { return List.of("order-1", "order-2"); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Void> delete(@PathVariable String id) { return ResponseEntity.noContent().build(); }
}

@Configuration
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable())   // stateless API: credentials are sent in a header, not a cookie
            .build();
    }

    @Bean
    UserDetailsService users() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        return new InMemoryUserDetailsManager(
            User.withUsername("alice").password(encoder.encode("alice-pw")).roles("USER").build(),
            User.withUsername("admin").password(encoder.encode("admin-pw")).roles("ADMIN").build());
    }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println("Anonymous GET:   " + call(http, HttpMethod.GET, "/api/orders", null, null));
            System.out.println("alice GET:       " + call(http, HttpMethod.GET, "/api/orders", "alice", "alice-pw"));
            System.out.println("alice DELETE:    " + call(http, HttpMethod.DELETE, "/api/orders/1", "alice", "alice-pw"));
            System.out.println("admin DELETE:    " + call(http, HttpMethod.DELETE, "/api/orders/1", "admin", "admin-pw"));`, `
    static String call(RestClient http, HttpMethod method, String path, String user, String password) {
        return http.method(method).uri(path)
            .headers(headers -> { if (user != null) headers.setBasicAuth(user, password); })
            .exchange((req, res) -> String.valueOf(res.getStatusCode().value()));
    }
`),
    `Anonymous GET:   401
alice GET:       200
alice DELETE:    403
admin DELETE:    204`, 'security', 'URL and method security together'),
    h2('How does it work?'),
    ul(['Defining a <code>SecurityFilterChain</code> bean replaces Boot’s default chain; defining a <code>UserDetailsService</code> replaces the generated user.',
      'Every request must be authenticated, so the anonymous call gets 401.',
      '<code>@EnableMethodSecurity</code> enables <code>@PreAuthorize</code>. alice is authenticated but not an admin, so DELETE returns 403.',
      'The API is stateless: no session is created, and credentials are checked on every request. That is why CSRF protection can be disabled here.',
      'Real APIs usually accept a JWT bearer token instead of HTTP Basic: <code>.oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))</code> with <code>spring-boot-starter-security-oauth2-resource-server</code>. See the <a href="' + JT.url('security_jwt') + '">JWT lesson</a>.']),
    K.interview([
      ['What happens when you add spring-boot-starter-security?', 'All endpoints require authentication, a default user with a generated password is created, form login and HTTP Basic are enabled, and protections such as CSRF and security headers are on.'],
      ['How do you secure a stateless REST API in Spring Boot?', 'A <code>SecurityFilterChain</code> with stateless sessions, token authentication (OAuth2 resource server with JWT), URL rules plus <code>@PreAuthorize</code> for fine-grained checks, CSRF disabled only because no cookies are used, and proper CORS settings for browser clients.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Testing
  L('test_slices', '@SpringBootTest vs test slices', () => [
    h2('What are the options?'),
    table(['Test type', 'Starts', 'Speed', 'Use for'], [
      ['Plain unit test', 'No Spring', 'Milliseconds', 'Business logic in services and domain classes'],
      ['<code>@WebMvcTest</code>', 'MVC layer only: controllers, advice, filters, converters', 'Fast', 'Request mapping, validation, JSON, status codes, security rules'],
      ['<code>@DataJpaTest</code>', 'JPA: entities, repositories, a test database; each test rolls back', 'Fast', 'Queries, mappings, constraints'],
      ['<code>@SpringBootTest</code>', 'The whole application', 'Slowest', 'End-to-end flows across layers'],
    ]),
    h2('Why use slices?'),
    p('A full <code>@SpringBootTest</code> loads every bean, connects to databases and starts schedulers. Slices load only what one layer needs, so tests are faster and failures point at the right place. Spring caches contexts between tests with the same configuration, so avoid giving every test class a slightly different setup.'),
    K.show(`import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ProductRepositoryTest {
    @Autowired ProductRepository products;

    @Test
    void findsProductsCheaperThanAPrice() {
        products.save(new Product("Keyboard", 40));
        products.save(new Product("Monitor", 200));

        assertThat(products.findByPriceLessThan(100))
            .extracting(Product::getName)
            .containsExactly("Keyboard");
    }
}`, '@DataJpaTest (spring-boot-starter-data-jpa-test)', 'java'),
    K.show(`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class OrderFlowIT {
    @Container
    @ServiceConnection   // Boot reads the container's URL, user and password
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:17");

    @Autowired TestRestTemplate rest;

    @Test
    void placesAnOrder() {
        var response = rest.postForEntity("/api/orders", new CreateOrder("book", 1), String.class);
        assertThat(response.getStatusCode().value()).isEqualTo(201);
    }
}`, 'Integration test with a real PostgreSQL in Docker (Testcontainers)', 'java'),
    h2('Important points'),
    ul(['Test against the same database engine you use in production (Testcontainers) for anything that depends on SQL features. H2 does not behave exactly like PostgreSQL or MySQL.',
      'Spring Boot 4 moved test slices into feature modules, for example <code>org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest</code> and <code>org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest</code>.',
      'Use <code>@MockitoBean</code> (Spring Framework 6.2+) to replace a bean with a Mockito mock in a Spring test; <code>@MockBean</code> is deprecated.']),
    K.interview([
      ['@SpringBootTest vs @WebMvcTest vs @DataJpaTest?', '<code>@SpringBootTest</code> loads the full application context. <code>@WebMvcTest</code> loads only the web layer, with services mocked. <code>@DataJpaTest</code> loads only JPA components with a test database and transactional rollback.'],
      ['How do you keep a Spring test suite fast?', 'Most tests as plain unit tests; slices instead of full contexts; few distinct context configurations so the context cache is reused; Testcontainers with reusable containers for integration tests.'],
      ['What is Testcontainers?', 'A library that starts real dependencies (databases, Kafka, Redis) in Docker for tests. With <code>@ServiceConnection</code>, Boot configures the connection automatically.'],
    ]),
  ]);

  L('controller_tests', 'Controller tests with MockMvc and mocks', () => [
    h2('What is a controller test?'),
    p('A controller test sends a fake HTTP request to a controller and checks the status code and JSON. The service behind the controller is replaced with a <strong>mock</strong>, so the test checks only the web layer.'),
    h2('Example: what @WebMvcTest does'),
    p('This program builds the same pieces a <code>@WebMvcTest</code> gives you — a Mockito mock and MockMvc — without JUnit, so it can run here.'),
    boot(`import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;

interface PriceService {
    int priceOf(String sku);
}

record PriceResponse(String sku, int price) { }

@RestController
class PriceController {
    private final PriceService prices;
    PriceController(PriceService prices) { this.prices = prices; }

    @GetMapping("/prices/{sku}")
    PriceResponse price(@PathVariable String sku) {
        return new PriceResponse(sku, prices.priceOf(sku));
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        PriceService prices = mock(PriceService.class);
        when(prices.priceOf("A1")).thenReturn(42);

        MockMvc mvc = MockMvcBuilders.standaloneSetup(new PriceController(prices)).build();
        MockHttpServletResponse response = mvc.perform(get("/prices/A1")).andReturn().getResponse();

        System.out.println(response.getStatus() + " " + response.getContentAsString());
        verify(prices).priceOf("A1");
        System.out.println("Service was called once with A1");
    }
}`, `200 {"sku":"A1","price":42}
Service was called once with A1`, 'test', 'Mock the service, test the controller'),
    p('MockMvc also prints a few INFO log lines while it initializes its test servlet; they are left out above.'),
    h2('How does it work?'),
    ul(['<code>mock(PriceService.class)</code> creates an object that returns default values; <code>when(...).thenReturn(42)</code> sets the answer for one call.',
      'MockMvc sends the request through Spring MVC — mapping, argument conversion, JSON — without a server.',
      '<code>verify</code> checks that the controller called the service as expected.']),
    h2('The same test with JUnit and @WebMvcTest'),
    K.show(`import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PriceController.class)
class PriceControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean PriceService prices;   // replaces the real bean with a mock

    @Test
    void returnsPrice() throws Exception {
        when(prices.priceOf("A1")).thenReturn(42);

        mvc.perform(get("/prices/A1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.price").value(42));
    }

    @Test
    void unknownSkuReturns404() throws Exception {
        when(prices.priceOf("ZZ")).thenThrow(new PriceNotFoundException("ZZ"));
        mvc.perform(get("/prices/ZZ")).andExpect(status().isNotFound());
    }
}`, 'PriceControllerTest.java (spring-boot-starter-webmvc-test)', 'java'),
    h2('Important points'),
    ul(['<code>@WebMvcTest</code> also loads <code>@RestControllerAdvice</code> classes and Spring Security, so you can test error responses and 401/403 rules. Use <code>@WithMockUser</code> for an authenticated user.',
      'Test the cases that matter: success, validation failure (400), not found (404), and forbidden (403).',
      'Do not mock everything: repository queries are better tested with <code>@DataJpaTest</code> against a real database.']),
    K.interview([
      ['@MockitoBean vs @Mock?', '<code>@Mock</code> (Mockito) creates a mock in a plain unit test. <code>@MockitoBean</code> creates a mock and puts it into the Spring application context, replacing the real bean.'],
      ['What would you test in a controller test?', 'URL and method mapping, request binding and validation, status codes, JSON shape, error handling and security rules. Business logic is tested in service unit tests.'],
    ]),
  ]);
})();
