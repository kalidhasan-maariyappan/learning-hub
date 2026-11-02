// Spring Framework course rebuilt from spring-chatgpt.txt and the learner's notes.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('spring_' + id, title, 'Spring <span>' + esc(title) + '</span>', body);
  const topics = (id) => JT.springGroups.find((g) => g[0] === id)[2].map(([t, tt]) => ['spring_' + t, tt]);

  JT.def('spring_home', { title: 'Spring Framework', h1: 'Spring <span>Framework</span>', body: () => [
    p('This course follows your learning notes: first understand why Spring exists and how it relates to Java and Jakarta EE; then study the Spring topics from the provided tutorial discussion: AOP, JDBC, transactions, Web MVC and logging.'),
    p('Every page explains what the idea is, why it is useful, how it works, and what the example is doing. Technical words are explained before they are used.'),
    h2('Learning order'),
    ...JT.springGroups.map(([id, title, list]) => '<h3><a href="' + JT.url('spring_group_' + id) + '">' + esc(title) + '</a></h3>' +
      ul(list.map(([t, tt]) => '<a href="' + JT.url('spring_' + t) + '">' + esc(tt) + '</a>'))),
    note('Spring is optional for Java web development. You can use Servlets directly. Spring MVC is another way to build the web layer and commonly uses the Servlet API underneath.'),
  ].join('') });

  K.overview('spring_group_foundations', 'Spring Foundations', 'Spring <span>Foundations</span>', [
    p('Begin here if Spring or enterprise Java terms are unfamiliar. These lessons explain the problem Spring addresses before introducing its tools.'),
  ], topics('foundations'));
  K.overview('spring_group_aop', 'Spring AOP', 'Spring <span>AOP</span>', [
    p('AOP lets one shared behavior, such as logging, run around selected methods. Learn the vocabulary first, then see the XML and annotation configuration styles from the source discussion.'),
  ], topics('aop'));
  K.overview('spring_group_jdbc', 'Spring JDBC', 'Spring <span>JDBC</span>', [
    p('JDBC is Java’s database connection API. Spring JDBC removes repetitive resource cleanup and exception handling while you write SQL and map results.'),
  ], topics('jdbc'));
  K.overview('spring_group_transactions', 'Transaction Management', 'Spring <span>Transaction Management</span>', [
    p('Transactions make related database work succeed or fail together. These pages explain the database idea first, then Spring’s declarative and programmatic ways to manage it.'),
  ], topics('transactions'));
  K.overview('spring_group_mvc', 'Spring Web MVC', 'Spring <span>Web MVC</span>', [
    p('Spring MVC receives web requests, selects a controller, and turns its result into a response or rendered page. The examples follow the classic XML and JSP arrangement in your source notes.'),
  ], topics('mvc'));
  K.overview('spring_group_logging', 'Logging with Log4j 2', 'Spring <span>Logging</span>', [
    p('Logging records application events for debugging and operations. These pages explain levels and the main logging components, then show a modern Log4j 2 configuration.'),
  ], topics('logging'));

  // Spring Foundations
  L('benefits', 'Why Spring? Eight benefits explained', () => [
    h2('What is Spring?'),
    p('Spring is a framework: a set of reusable Java tools that helps assemble an application. In a hospital application, for example, the program must handle patient data, database access, errors, transactions and web requests. Spring provides building blocks for these jobs.'),
    h2('What are the benefits, and why do they matter?'),
    table(['Benefit', 'Plain meaning', 'How it helps'], [
      ['POJO based', 'Business classes can be ordinary Java classes.', 'Less code tied to a framework parent class; easier to understand and test.'],
      ['Modular', 'Spring is divided into parts with different jobs.', 'Use Spring Core for object management without adding Spring MVC to a non-web app.'],
      ['Integration', 'Spring can work with tools such as Hibernate, PostgreSQL and Quartz.', 'Keep useful technologies and let Spring help connect their objects and transactions.'],
      ['Testability', 'Give a class its dependencies from outside.', 'A test can pass a fake repository instead of contacting a database.'],
      ['Web MVC', 'Separate request handling, application work and presentation.', 'A controller handles the request while other classes handle business rules and data.'],
      ['Central exception handling', 'Handle common web errors in one shared place.', 'Avoid copying the same error response code across controllers.'],
      ['Lightweight core', 'The core container can run without a full enterprise application server.', 'Deploy a web app to a servlet container such as Tomcat; actual app resource use still depends on its libraries.'],
      ['Transaction management', 'Treat related database operations as one unit.', 'Commit all changes together or roll them back together when required.'],
    ]),
    h2('How do the parts fit together?'),
    K.show(`Browser → Spring MVC → PatientController → PatientService
                                      ↓
                               PatientRepository → PostgreSQL

Spring's container creates and connects the application objects.`, 'A hospital application example', 'text'),
    p('This is an example arrangement, not a requirement. A Spring program may be a command-line tool with no browser or database.'),
    h2('Where should a beginner go next?'),
    ol(['Read <a href="' + JT.url('spring_pojo_beans') + '">POJOs and Spring beans</a> to understand “plain old Java object.”',
      'Read <a href="' + JT.url('spring_ioc_di') + '">IoC and dependency injection</a> to understand how Spring creates objects and gives them what they need.',
      'Then compare Java, Jakarta EE and Spring before studying the technical modules.']),
  ]);

  L('pojo_beans', 'POJOs and Spring beans', () => [
    h2('What is a POJO?'),
    p('POJO means “Plain Old Java Object.” It is a regular Java class. “Plain old” emphasizes that the class does not have to inherit from a special framework class just to hold your application data or logic. POJO is a descriptive phrase, not a Java keyword.'),
    K.show(`public class Patient {
    String name;
    int age;
}`, 'A normal Java class', 'java'),
    p('This class has fields and uses ordinary Java syntax. It does not extend a Spring class or implement a Spring interface.'),
    h2('What does “instead of writing framework classes” mean?'),
    p('Some older enterprise programming styles required a class to follow a framework-specific contract, such as extending a base class. This made the class depend on that framework. The following example is hypothetical: <code>FrameworkService</code> is not a real Spring class.'),
    K.show(`// Hypothetical: the framework forces your class to inherit from its base class
public class PatientService extends FrameworkService {
    public void savePatient() { }
}`, 'A framework-specific base class example', 'java'),
    h2('How does Spring use a POJO?'),
    p('Spring can create and manage an ordinary class as a <strong>bean</strong>. A bean is simply an object that the Spring container looks after.'),
    K.show(`public class PatientService {
    public void savePatient() {
        System.out.println("Patient saved");
    }
}

@Configuration
class AppConfig {
    @Bean
    PatientService patientService() {
        return new PatientService();
    }
}`, 'Plain class registered with Spring', 'java'),
    p('The <code>@Bean</code> method tells Spring to call the method and manage the returned object. The class itself remains a regular Java class.'),
    h2('Why is this useful?'),
    ul(['You can test the class by creating it directly with <code>new</code>.',
      'You can reuse it in code that does not start a Spring container.',
      'Your application logic is less tied to framework-specific base classes.',
      'Spring can still inject dependencies or add services around a managed bean.']),
    note('POJO does not mean Spring cannot manage an object. It describes the class; “Spring bean” describes how the container manages an object. The same object can be both.'),
  ]);

  L('ioc_di', 'IoC and dependency injection', () => [
    h2('Start with a dependency'),
    p('A dependency is another object a class needs to do its work. A patient service may need a patient repository to save patient records.'),
    h2('What is the problem with creating dependencies inside a class?'),
    K.show(`class PatientService {
    private final PatientRepository repository = new PatientRepository();
}`, 'The service chooses and constructs its own repository', 'java'),
    p('The service is stuck with that exact repository implementation. A test that wants a fake repository, or an application that needs a different database implementation, has difficulty replacing it.'),
    h2('What is dependency injection?'),
    p('Dependency Injection (DI) means a class receives the objects it needs from somewhere else instead of constructing them itself. A constructor makes that relationship visible:'),
    K.show(`class PatientService {
    private final PatientRepository repository;

    PatientService(PatientRepository repository) {
        this.repository = repository;
    }
}`, 'Dependency arrives through the constructor', 'java'),
    h2('What is Inversion of Control?'),
    p('Inversion of Control (IoC) is the broader idea that your application does not control every object-creation step itself. The framework or container takes over that job. DI is one way the container gives objects to each other.'),
    h2('How does Spring help?'),
    K.show(`@Configuration
class AppConfig {
    @Bean PatientRepository patientRepository() {
        return new InMemoryPatientRepository();
    }

    @Bean PatientService patientService(PatientRepository repository) {
        return new PatientService(repository);
    }
}`, 'Spring creates both objects and connects them', 'java'),
    ol(['Spring reads the configuration and sees the two bean methods.',
      'It creates the repository object.',
      'It passes that object into the service bean method.',
      'Application code asks Spring for the service and calls it.']),
    p('During a test, you can pass a fake repository to <code>PatientService</code>. In the running application, Spring can provide the real repository. That is why DI improves testability.'),
  ]);

  L('enterprise_java', 'What are J2EE, Java EE and Jakarta EE?', () => [
    h2('What are these names?'),
    p('They are successive names for the enterprise Java platform. The platform defines standard APIs and rules that Java applications can use for tasks such as web requests, persistence, messaging and transactions.'),
    table(['Name', 'Plain explanation'], [
      ['J2EE', 'The original name: Java 2 Platform, Enterprise Edition.'],
      ['Java EE', 'The later name used as the platform evolved.'],
      ['Jakarta EE', 'The current name after the platform moved to the Eclipse Foundation.'],
    ]),
    h2('What does “standard API” mean?'),
    p('An API is a set of names and operations that code can call. A standard means different compatible implementations agree on what those calls do. The Servlet API describes how a Java component can handle a web request. A servlet container provides the runtime that calls the component.'),
    K.show(`Browser ── HTTP request ──> Servlet container (such as Tomcat)
                                 │ calls the Servlet API
                                 ▼
                             Your Servlet`, 'Standard API and implementing software', 'text'),
    p('Tomcat implements servlet-container functionality; it is not the entire Jakarta EE platform. An application server implements a broader set of enterprise specifications.'),
    h2('Examples of enterprise Java technologies'),
    table(['Technology', 'Job'], [
      ['Servlet', 'Receive HTTP requests and write HTTP responses.'],
      ['JSP', 'Create dynamic server-rendered pages in traditional web apps.'],
      ['JPA', 'Standardize persistence of Java objects to relational databases.'],
      ['JTA', 'Provide transaction coordination APIs.'],
      ['JMS', 'Provide a standard messaging API.'],
      ['EJB', 'Provide an enterprise component model and services.'],
    ]),
    note('Jakarta EE is not a programming language or one program you open. It is a platform of specifications and APIs. An application uses only the parts it needs.'),
  ]);

  L('spring_vs_enterprise_java', 'Java, Jakarta EE and Spring', () => [
    h2('What are the three things?'),
    table(['Name', 'What it is', 'Example'], [
      ['Java', 'A programming language and runtime ecosystem.', 'Write a <code>Patient</code> class.'],
      ['Jakarta EE (formerly Java EE/J2EE)', 'Enterprise specifications and APIs.', 'Servlet defines a way to receive web requests.'],
      ['Spring', 'A separate Java application framework with its own container and libraries.', 'Spring MVC maps a URL to a controller method.'],
    ]),
    h2('Can you build a web application without Spring?'),
    p('<strong>Yes.</strong> You can build a Java web app using Servlets directly, plus database and page technologies as needed. Spring is optional. It provides a higher-level way to connect application objects and organize common jobs.'),
    h2('How does Spring relate to Jakarta EE?'),
    p('A Servlet container receives HTTP requests. A direct Servlet application writes its own Servlet. With Spring MVC, the container calls Spring’s <code>DispatcherServlet</code>; Spring then finds your controller and handles much of the request processing. Spring MVC commonly uses the Servlet API underneath, but Spring and Jakarta EE are not the same thing.'),
    K.show(`Without Spring:
Browser → Servlet container → Your Servlet → HTTP response

With Spring MVC:
Browser → Servlet container → DispatcherServlet → Controller → response`, 'Two ways to build a Java web layer', 'text'),
    h2('Why choose Spring?'),
    ul(['Let a container create application objects and supply dependencies.',
      'Organize web handling with controllers rather than writing all request plumbing yourself.',
      'Use common facilities for data access, exceptions and transactions.',
      'Integrate with existing technologies instead of replacing them.']),
    note('You do not need to learn J2EE, Java EE and Jakarta EE as three separate frameworks. They are successive names for the enterprise Java platform. Java is the language; Spring is a framework; Jakarta EE is a set of enterprise specifications and APIs.'),
  ]);

  L('exception_handling', 'Central exception handling', () => [
    h2('What is an exception?'),
    p('An exception is an object that signals something went wrong while a program was running, such as a patient record not being found or a database operation failing.'),
    h2('Why handle errors centrally?'),
    p('If every controller repeats code for the same error, responses become inconsistent and changes must be repeated. Spring MVC can send matching controller exceptions to a shared handler.'),
    K.show(`@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(PatientNotFoundException.class)
    ResponseEntity<String> patientMissing(PatientNotFoundException ex) {
        return ResponseEntity.status(404).body("Patient not found");
    }
}`, 'Shared Spring MVC exception handler', 'java'),
    h2('How does it work?'),
    ol(['A controller calls application code and an exception is thrown.',
      'Spring MVC looks for a matching <code>@ExceptionHandler</code>.',
      '<code>@RestControllerAdvice</code> makes the handler available across controllers.',
      'The handler returns a consistent HTTP status and response body.']),
    p('Spring also translates many database-specific errors into a common Spring data-access exception hierarchy, so application code does not always need to inspect vendor-specific exception classes.'),
    note('Handle expected errors explicitly. Do not expose stack traces, credentials or private data in an HTTP error response.'),
  ]);

  // Spring AOP
  L('aop_concepts', 'AOP concepts and advice types', () => [
    h2('What is AOP?'),
    p('Aspect-Oriented Programming (AOP) puts a behavior used by many methods in one place. Logging is a simple example: many business methods may need a log line before and after they run.'),
    h2('Why use it?'),
    p('If every method contains the same logging or auditing code, the business logic gets cluttered and a change must be copied everywhere. An aspect lets Spring apply that shared behavior to selected method calls.'),
    table(['Term', 'Plain meaning'], [
      ['Aspect', 'The class or configuration containing shared behavior.'],
      ['Advice', 'The action to run, for example before or after a method.'],
      ['Pointcut', 'A rule that selects which methods receive advice.'],
      ['Join point', 'The point where advice could run. In Spring AOP this is a method execution.'],
      ['Target object', 'The original object whose method is called.'],
      ['Proxy', 'A wrapper object Spring places in front of the target to run advice.'],
    ]),
    h2('Advice types in the source examples'),
    table(['Advice', 'When it runs'], [
      ['Before', 'Before the target method.'],
      ['After returning', 'After the target completes successfully.'],
      ['After throwing', 'When the target throws an exception.'],
      ['After (finally)', 'After completion, on success or failure.'],
      ['Around', 'Wraps the call and controls whether and when the target proceeds.'],
    ]),
    K.show(`Caller → Spring proxy → before advice → Student method
                              ← after advice ←`, 'Simplified proxy call', 'text'),
    note('Spring AOP advises calls that go through a Spring proxy. Creating an object with <code>new</code> outside the container bypasses that proxy.'),
  ]);

  L('xml_aop', 'AOP with XML schema configuration', () => [
    h2('What is XML schema based AOP?'),
    p('It configures aspects in a Spring XML file instead of putting AOP annotations on Java classes. The business class stays ordinary Java; XML connects a logging bean, a pointcut and advice methods.'),
    h2('Example classes'),
    K.show(`public class Student {
    public String getName() {
        System.out.println("Name: Zara");
        return "Zara";
    }
    public void fail() {
        throw new IllegalArgumentException("bad profile");
    }
}

public class Logging {
    public void before() { System.out.println("before"); }
    public void returned(Object value) { System.out.println("returned: " + value); }
    public void thrown(IllegalArgumentException ex) { System.out.println("error: " + ex.getMessage()); }
    public void finished() { System.out.println("finished"); }
}`, 'Target and plain Java advice class', 'java'),
    h2('How does the XML connect them?'),
    K.show(`<aop:config>
  <aop:aspect ref="logging">
    <aop:pointcut id="studentMethods"
      expression="execution(* com.example.Student.*(..))" />
    <aop:before pointcut-ref="studentMethods" method="before" />
    <aop:after-returning pointcut-ref="studentMethods"
      returning="value" method="returned" />
    <aop:after-throwing pointcut-ref="studentMethods"
      throwing="ex" method="thrown" />
    <aop:after pointcut-ref="studentMethods" method="finished" />
  </aop:aspect>
</aop:config>`, 'Beans.xml AOP configuration', 'xml'),
    K.show(`public Object around(ProceedingJoinPoint call) throws Throwable {
    System.out.println("before");
    try {
        return call.proceed();
    } finally {
        System.out.println("finished");
    }
}`, 'Around advice calls proceed() to run the target method', 'java'),
    ul(['<code>ref="logging"</code> points to the aspect bean.',
      'The pointcut expression selects methods declared on <code>Student</code>.',
      '<code>returning="value"</code> binds the target return value to the advice parameter.',
      '<code>throwing="ex"</code> binds the thrown exception to the advice parameter.']),
    h2('What happens when it runs?'),
    ol(['The container reads the beans and AOP configuration.',
      'Spring creates a proxy for the matching Student bean.',
      'A call to <code>getName()</code> runs before advice, target code, after-returning advice and after-finally advice.',
      'A call to <code>fail()</code> runs before advice, target code, after-throwing advice and after-finally advice.']),
    note('The XML needs the Spring beans and AOP namespaces, the <code>spring-aop</code> module and AspectJ Weaver. Keep the namespace/schema declaration in your project XML; it is omitted from this focused snippet.'),
    h2('Common mistakes'),
    ul(['Forgetting to register the target and advice objects as beans.',
      'Using a pointcut that matches no methods.',
      'Expecting self-calls or objects created outside Spring to be intercepted.']),
  ]);

  L('aspectj_aop', 'AOP with @AspectJ annotations', () => [
    h2('What does @AspectJ mean here?'),
    p('It is a Spring AOP style that describes aspects with Java annotations. Spring reads annotations such as <code>@Aspect</code>, <code>@Pointcut</code> and <code>@Before</code> and applies them using proxies. This does not mean the AspectJ bytecode compiler is being used.'),
    K.show(`@Aspect
public class Logging {
    @Pointcut("execution(* com.example.Student.*(..))")
    private void studentMethods() { }

    @Before("studentMethods()")
    public void before() {
        System.out.println("before student method");
    }

    @AfterReturning(pointcut = "studentMethods()", returning = "value")
    public void afterSuccess(Object value) {
        System.out.println("returned: " + value);
    }

    @After("studentMethods()")
    public void afterFinally() {
        System.out.println("finished, whether the call succeeded or failed");
    }

    @AfterThrowing(pointcut = "studentMethods()", throwing = "ex")
    public void afterFailure(IllegalArgumentException ex) {
        System.out.println("failed: " + ex.getMessage());
    }
}`, 'Aspect class with annotations', 'java'),
    K.show(`<aop:aspectj-autoproxy />
<bean id="student" class="com.example.Student" />
<bean id="logging" class="com.example.Logging" />`, 'XML enables proxies and registers both beans', 'xml'),
    p('In Java configuration, <code>@EnableAspectJAutoProxy</code> enables the same proxy support. The aspect must still be registered as a Spring bean; <code>@Aspect</code> by itself does not register it.'),
    h2('How does the call work?'),
    ol(['Spring finds the aspect bean and reads its pointcut and advice annotations.',
      'A post-processor creates a proxy for beans matched by the pointcut.',
      'The caller invokes the proxy; it runs advice around the target method.']),
    h2('XML and annotation styles'),
    table(['XML schema style', '@AspectJ style'], [
      ['Advice mappings are in XML.', 'Advice annotations are beside the Java methods.'],
      ['The aspect class can be plain Java.', '<code>@Aspect</code> marks the aspect class.'],
      ['Uses Spring proxy-based AOP.', 'Also uses Spring proxy-based AOP.'],
    ]),
    note('Both styles need Spring AOP and AspectJ Weaver. Spring AOP uses AspectJ annotations and pointcut syntax but only intercepts calls that pass through Spring proxies.'),
  ]);

  // Spring JDBC
  L('jdbc_template', 'JDBC and JdbcTemplate', () => [
    h2('What is JDBC?'),
    p('JDBC means Java Database Connectivity. It is the Java API used to send SQL statements to relational databases such as PostgreSQL, MySQL and H2.'),
    h2('What is the problem Spring JDBC solves?'),
    p('Raw JDBC code must acquire a connection, create statements, run SQL, read results, handle SQL exceptions and close resources. Repeating this safely is tedious.'),
    p('<code>JdbcTemplate</code> is Spring’s helper for this work. It manages routine resource handling and exception translation so you can focus on SQL and mapping rows to Java objects.'),
    h2('How does a query work?'),
    K.show(`JdbcTemplate jdbc = new JdbcTemplate(dataSource);

List<String> names = jdbc.query(
    "SELECT name FROM student WHERE age >= ? ORDER BY name",
    (row, rowNumber) -> row.getString("name"),
    18
);`, 'Query with a bound parameter and row mapper', 'java'),
    ol(['The SQL uses <code>?</code> for a value supplied by the caller.',
      '<code>JdbcTemplate</code> obtains a connection and prepares the statement.',
      'It binds the age value safely and executes the query.',
      'The row-mapping callback turns each result row into a Java value.',
      'Spring closes the routine JDBC resources and returns the list.']),
    h2('Why use JdbcTemplate?'),
    ul(['Less connection, statement and result-set cleanup code.',
      'Prepared parameters reduce SQL injection risk.',
      'SQL errors are translated into Spring’s consistent unchecked data-access exceptions.',
      'Operations can participate in a Spring-managed transaction.']),
    note('JdbcTemplate does not invent SQL for you. You still write and review the query and decide how results become application objects.'),
  ]);

  L('jdbc_dao', 'DataSource and DAO pattern', () => [
    h2('What is a DataSource?'),
    p('A <code>DataSource</code> is an object that supplies database connections. It separates connection setup from the code that runs SQL. Real applications normally use a connection pool; simple tutorials may use a basic driver-based DataSource.'),
    h2('What is a DAO?'),
    p('A Data Access Object (DAO) puts database operations behind a small class or interface. For example, a <code>StudentDao</code> can provide <code>findById</code> and <code>save</code>, while the service uses those operations without containing SQL itself.'),
    K.show(`@Repository
class StudentDao {
    private final JdbcTemplate jdbc;
    StudentDao(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    Student findById(int id) {
        return jdbc.queryForObject(
            "SELECT id, name FROM student WHERE id = ?",
            (rs, row) -> new Student(rs.getInt("id"), rs.getString("name")),
            id);
    }
}
record Student(int id, String name) { }`, 'DAO with JdbcTemplate', 'java'),
    h2('How are the objects connected?'),
    K.show(`DataSource → JdbcTemplate → StudentDao → StudentService`, 'Dependency chain', 'text'),
    p('Spring creates the DataSource and JdbcTemplate beans and injects JdbcTemplate into the DAO. <code>@Repository</code> marks a data-access class and enables exception translation when the required infrastructure is present.'),
    h2('Why use this structure?'),
    ul(['SQL stays out of controllers and business services.',
      'A DAO provides a focused place to review database behavior.',
      'A test can replace the DAO or use an in-memory database.']),
    note('Do not use an unpooled DriverManagerDataSource as a production connection pool. Choose a production-ready pooled DataSource and keep credentials outside source code.'),
  ]);

  L('jdbc_operations', 'Queries and SQL operations', () => [
    h2('What SQL can JdbcTemplate run?'),
    p('It can execute data queries, data changes and database definition statements. The method you choose depends on what the SQL returns.'),
    table(['Operation', 'Common JdbcTemplate method', 'Typical use'], [
      ['Read rows', '<code>query</code>', 'SELECT returning zero or more rows; map each row.'],
      ['Read one value or row', '<code>queryForObject</code>', 'COUNT, one column or a row expected to exist.'],
      ['Insert, update or delete', '<code>update</code>', 'DML; returns the number of affected rows.'],
      ['DDL or a statement without mapped results', '<code>execute</code>', 'CREATE TABLE or other setup statements.'],
    ]),
    h2('Example: create, insert, update, read and delete'),
    K.show(`jdbc.execute("CREATE TABLE student (id INT PRIMARY KEY, name VARCHAR(80))");

int inserted = jdbc.update(
    "INSERT INTO student(id, name) VALUES (?, ?)", 1, "Ravi");
int changed = jdbc.update(
    "UPDATE student SET name = ? WHERE id = ?", "Ravi K", 1);
String name = jdbc.queryForObject(
    "SELECT name FROM student WHERE id = ?", String.class, 1);
int deleted = jdbc.update("DELETE FROM student WHERE id = ?", 1);`, 'Common CRUD and DDL methods', 'java'),
    h2('How do you handle many rows?'),
    p('Use <code>query</code> with a <code>RowMapper</code>. The mapper receives one row at a time and returns the object to keep. For named parameters, Spring also provides <code>NamedParameterJdbcTemplate</code>; for batches, use <code>batchUpdate</code>.'),
    h2('Why not concatenate values into SQL?'),
    p('Values must be bound as parameters. Do not build a query by joining raw user input into the SQL text; that can change the meaning of the SQL and create injection vulnerabilities.'),
    K.interview([
      ['What does JdbcTemplate.update return?', 'The number of rows affected by the INSERT, UPDATE or DELETE.'],
      ['What is a RowMapper?', 'A callback that converts one ResultSet row into an application object.'],
      ['What does Spring do with SQLException?', 'It translates JDBC exceptions into Spring’s consistent DataAccessException hierarchy.'],
    ]),
  ]);

  // Transactions
  L('transaction_foundations', 'Transactions and ACID', () => [
    h2('What is a database transaction?'),
    p('A transaction groups database operations into one unit of work. Imagine a patient pays ₹2,000: the application inserts a payment, marks the invoice paid and updates the patient ledger. If the last step fails after the first two were saved, the data disagrees.'),
    h2('How does a transaction help?'),
    p('The database keeps the operations inside a transaction pending. The application commits when the unit completes successfully, or rolls it back when configured failure rules say the work must be undone.'),
    h2('What does ACID mean?'),
    table(['Property', 'Plain explanation'], [
      ['Atomicity', 'All included operations succeed together or none of them are kept.'],
      ['Consistency', 'The transaction preserves the database rules and constraints.'],
      ['Isolation', 'Concurrent work follows the isolation level instead of seeing invalid intermediate states.'],
      ['Durability', 'Committed data is preserved according to the database’s guarantees.'],
    ]),
    h2('Local and global transactions'),
    p('A local transaction controls one resource, such as one JDBC database. A global or distributed transaction coordinates multiple transactional resources. Distributed coordination is more complex; using multiple services does not automatically mean they share one atomic transaction.'),
    note('ACID is a way to describe transaction guarantees. The exact isolation behavior and durability details depend on the database and its configuration.'),
  ]);

  L('transaction_management', 'Spring transaction management', () => [
    h2('What does Spring transaction management provide?'),
    p('Spring provides a common transaction API so application code can work with transactions without manually repeating begin, commit and rollback calls around every operation.'),
    h2('What is a transaction manager?'),
    p('A <code>PlatformTransactionManager</code> performs transaction operations for a resource. For one JDBC DataSource, a common choice is <code>DataSourceTransactionManager</code>.'),
    h2('Declarative and programmatic transactions'),
    table(['Style', 'How you set the boundary'], [
      ['Declarative', 'Mark a service method with <code>@Transactional</code>; Spring applies transaction behavior around the call.'],
      ['Programmatic', 'Use <code>TransactionTemplate</code> and place the work inside its callback.'],
    ]),
    K.show(`@Transactional
public void processPayment() {
    paymentDao.insertPayment(...);
    invoiceDao.markPaid(...);
    ledgerDao.update(...);
}`, 'Declarative transaction boundary', 'java'),
    K.show(`transactionTemplate.execute(status -> {
    paymentDao.insertPayment(...);
    invoiceDao.markPaid(...);
    ledgerDao.update(...);
    return null;
});`, 'Programmatic transaction boundary', 'java'),
    h2('How does declarative management work?'),
    ol(['Enable transaction management and register a transaction manager.',
      'Spring provides the service through a proxy that intercepts calls to the transactional method.',
      'The transaction manager begins or joins a transaction before the method body runs.',
      'On normal return, Spring commits. On a rollback-triggering failure, Spring rolls back.']),
    h2('The transaction manager interfaces'),
    table(['Name', 'What it represents'], [
      ['<code>PlatformTransactionManager</code>', 'Main Spring interface for starting/joining, committing and rolling back a transaction.'],
      ['<code>TransactionDefinition</code>', 'Settings such as propagation, isolation, timeout, read-only intent and transaction name.'],
      ['<code>TransactionStatus</code>', 'Current status, including whether it is new, completed, marked rollback-only or has a savepoint.'],
    ]),
    p('For one JDBC DataSource, <code>DataSourceTransactionManager</code> is a common implementation. Spring must have a transaction manager and transaction management must be enabled; an <code>@Transactional</code> annotation alone does not start anything.'),
    h2('Propagation: what if another transaction already exists?'),
    table(['Setting', 'Meaning'], [
      ['REQUIRED', 'Join an existing transaction or create one. This is the default.'],
      ['REQUIRES_NEW', 'Suspend the current transaction and always create an independent one.'],
      ['SUPPORTS', 'Join one if present; otherwise run without a transaction.'],
      ['MANDATORY', 'Require an existing transaction; fail if there is none.'],
      ['NOT_SUPPORTED', 'Suspend an existing transaction and run without one.'],
      ['NEVER', 'Run without a transaction; fail if one exists.'],
      ['NESTED', 'Use a nested transaction/savepoint when supported by the manager and resource.'],
    ]),
    p('For example, an audit operation using <code>REQUIRED</code> shares the surrounding business transaction. Using <code>REQUIRES_NEW</code> gives it an independent commit/rollback outcome.'),
    h2('Isolation: what can concurrent work see?'),
    table(['Setting', 'Meaning'], [
      ['DEFAULT', 'Use the database default.'],
      ['READ_UNCOMMITTED', 'May allow reading another transaction’s uncommitted changes.'],
      ['READ_COMMITTED', 'Prevents dirty reads.'],
      ['REPEATABLE_READ', 'Prevents dirty reads and non-repeatable reads.'],
      ['SERIALIZABLE', 'Strongest standard level; also prevents phantom reads, with higher concurrency cost.'],
    ]),
    p('A <strong>dirty read</strong> occurs when one transaction reads a value another transaction later rolls back. Isolation is implemented by the database, so exact behavior and performance depend on that database.'),
    h2('How do you configure declarative transactions in XML?'),
    K.show(`<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
  <property name="url" value="jdbc:h2:mem:clinic" />
  <property name="username" value="sa" />
</bean>
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
  <constructor-arg ref="dataSource" />
</bean>
<bean id="transactionManager"
      class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <constructor-arg ref="dataSource" />
</bean>
<tx:annotation-driven transaction-manager="transactionManager" />`, 'XML transaction infrastructure (inside a configured beans document)', 'xml'),
    note('Declare the Spring <code>tx</code> namespace and schema on the XML root for <code>&lt;tx:annotation-driven&gt;</code>. The DataSource, JDBC driver and database tables must also be available.'),
    h2('Important default'),
    p('By default, Spring rolls back for unchecked exceptions (<code>RuntimeException</code> and <code>Error</code>). A checked exception does not trigger rollback unless rollback rules are configured.'),
    note('Proxy-based transactions require the call to pass through the Spring proxy. A direct call from one method to another method on the same object can bypass the proxy. Put transaction boundaries on service operations and keep the bean managed by Spring.'),
    K.interview([
      ['What is the difference between declarative and programmatic transaction management?', 'Declarative uses metadata such as <code>@Transactional</code>; programmatic code uses an API such as <code>TransactionTemplate</code> directly.'],
      ['When does Spring roll back by default?', 'For unchecked exceptions and errors, not checked exceptions.'],
      ['What do propagation and isolation control?', 'Propagation controls how a method participates when a transaction exists; isolation controls how concurrent transaction changes are observed.'],
    ]),
  ]);

  // Spring Web MVC
  L('mvc_basics', 'Model–View–Controller and request flow', () => [
    h2('What is MVC?'),
    p('MVC means Model–View–Controller. It is a way to divide an application: the controller receives a request, the model/service represents or retrieves application data, and the view presents the result.'),
    h2('Why split the work?'),
    p('If one class receives HTTP requests, queries the database, applies business rules and builds HTML, every change affects the same code. MVC separates those responsibilities so each part has a clearer job.'),
    K.show(`Browser requests /patients/10
          ↓
Controller receives the HTTP request
          ↓
Service / model finds patient data
          ↓
View renders the page (or a response body is returned)`, 'A request in an MVC application', 'text'),
    h2('What is Spring Web MVC?'),
    p('Spring MVC is Spring’s servlet-based web framework. Its central component, <code>DispatcherServlet</code>, receives requests and coordinates with Spring components that find a controller, bind request values and create the response.'),
    h2('How does a Spring MVC request flow?'),
    ol(['The servlet container sends the request to <code>DispatcherServlet</code>.',
      'A handler mapping finds the controller method that matches the path and HTTP method.',
      'A handler adapter resolves method arguments and calls the controller.',
      'A message converter writes a response body, or a view resolver locates a view such as a JSP.',
      'Spring sends the response back through the servlet container.']),
    table(['Component', 'Job'], [
      ['DispatcherServlet', 'Front controller that coordinates the request.'],
      ['HandlerMapping', 'Find the matching controller/handler.'],
      ['HandlerAdapter', 'Invoke the selected handler with resolved arguments.'],
      ['ViewResolver', 'Map a logical view name to a page resource.'],
      ['MessageConverter', 'Convert a controller result to an HTTP body such as JSON.'],
    ]),
  ]);

  L('mvc_xml_views', 'XML configuration and JSP views', () => [
    h2('What does the classic XML setup do?'),
    p('The source discussion uses a traditional Spring MVC deployment: the servlet container maps requests to <code>DispatcherServlet</code>; Spring XML configures controller discovery and a view resolver; a controller returns a logical view name.'),
    K.show(`<servlet>
  <servlet-name>app</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
</servlet>
<servlet-mapping>
  <servlet-name>app</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>`, 'web.xml maps requests to DispatcherServlet', 'xml'),
    K.show(`<beans>
  <context:component-scan base-package="com.example.web" />
  <mvc:annotation-driven />
  <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/views/" />
    <property name="suffix" value=".jsp" />
  </bean>
</beans>`, 'Spring XML configures controller detection and JSP lookup', 'xml'),
    K.show(`@Controller
class PatientController {
    @GetMapping("/patients")
    String list(Model model) {
        model.addAttribute("patients", patientService.findAll());
        return "patients";
    }
}`, 'Controller returns a logical page name', 'java'),
    K.show(`<h2>${message}</h2>`, 'JSP reads a model attribute and renders HTML', 'html'),
    p('A controller returns a logical view name such as <code>"patients"</code>, not the page text. The view resolver maps that name to a JSP. In a JSP, <code>${message}</code> is an Expression Language expression that displays the model value.'),
    h2('How does the view get selected?'),
    ol(['A request such as <code>/patients</code> reaches the mapped controller.',
      'The controller adds data to the model and returns <code>"patients"</code>.',
      'The view resolver adds the configured prefix and suffix.',
      'Spring renders <code>/WEB-INF/views/patients.jsp</code> and returns the resulting HTML.']),
    note('This is the classic XML/JSP style represented in the provided discussion. New applications commonly use Java configuration and a maintained view technology. JSP deployment depends on the servlet container; this lesson is a configuration example, not a runnable Maven lab sample.'),
  ]);

  // Logging
  L('logging_basics', 'Logging concepts and levels', () => [
    h2('What is logging?'),
    p('Logging is recording useful events while an application runs. It helps a developer understand what happened without inserting temporary <code>System.out.println</code> calls throughout the application.'),
    h2('Why use logging levels?'),
    p('Different messages have different importance. A configured level controls which messages are written, so production logs can focus on useful events while developers can temporarily enable more detail.'),
    table(['Level', 'Typical meaning'], [
      ['TRACE', 'Very detailed execution details.'],
      ['DEBUG', 'Developer diagnostics.'],
      ['INFO', 'Normal application events.'],
      ['WARN', 'Unexpected condition; work may continue.'],
      ['ERROR', 'A failure stopped an operation or needs attention.'],
      ['FATAL', 'A severe failure level supported by Log4j 2.'],
    ]),
    h2('Main logging components'),
    table(['Component', 'Job'], [
      ['Logger', 'Application code uses it to record a message.'],
      ['Level', 'Classifies the message by importance.'],
      ['Appender', 'Chooses where messages go, such as console or file.'],
      ['Layout', 'Formats a message for output.'],
      ['Configuration file', 'Sets levels, appenders and layouts.'],
    ]),
    K.show(`import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

private static final Logger log = LogManager.getLogger(PatientService.class);

log.info("Patient {} was registered", patientId);
log.error("Could not save patient", exception);`, 'Logging from a Java class', 'java'),
    note('Never write passwords, access tokens or sensitive patient data to logs. Keep messages useful and avoid logging every detail by default.'),
  ]);

  L('log4j2_config', 'Configure Log4j 2', () => [
    h2('What is Log4j 2?'),
    p('Log4j 2 is a logging implementation: it receives log events from application code, filters them by level, and writes them through appenders using a selected layout.'),
    h2('Why configure it?'),
    p('Configuration controls which events appear, where they are written and how each line is formatted. This makes it possible to use concise console output locally and different destinations in another environment.'),
    K.show(`<Configuration status="WARN">
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{HH:mm:ss} %-5level %logger - %msg%n" />
    </Console>
    <File name="File" fileName="application.log">
      <PatternLayout pattern="%d{HH:mm:ss} %-5level %logger - %msg%n" />
    </File>
  </Appenders>
  <Loggers>
    <Root level="info">
      <AppenderRef ref="Console" />
      <AppenderRef ref="File" />
    </Root>
  </Loggers>
</Configuration>`, 'Illustrative log4j2.xml configuration', 'xml'),
    K.show(`<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-api</artifactId>
<version>${log4j2.version}</version>
</dependency>
<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-core</artifactId>
<version>${log4j2.version}</version>
</dependency>`, 'Maven dependencies (use one current supported version for both)', 'xml'),
    p('Define <code>log4j2.version</code> in the project POM and keep API and Core aligned. A Maven BOM or dependency management section can centralize the selected version.'),
    h2('How is a message processed?'),
    ol(['Application code asks a logger to write a message.',
      'The configured logger checks whether that message’s level is enabled.',
      'An appender sends an accepted message to its destination.',
      'A layout formats the timestamp, level, logger name and message.']),
    p('With the root level set to <code>info</code>, INFO, WARN and ERROR messages are written; DEBUG and TRACE are filtered out. Changing the level to <code>debug</code> also enables DEBUG messages, including potentially noisy messages from other libraries.'),
    h2('Important version note'),
    p('The original discussion starts from an older Log4j tutorial. New projects should use Log4j 2 rather than Log4j 1.x. Add the Log4j 2 API and runtime implementation/provider that match your project’s dependency setup; keep the configuration file on the application classpath.'),
    note('Spring Boot supplies a default logging setup. In plain Spring, add and configure a logging implementation explicitly. The Spring lesson runner does not add Log4j to every example, so this configuration is shown for a project rather than presented as executed output.'),
  ]);
})();
