// Spring Framework lessons, part 1: container, beans, configuration and AOP.
// Every example is a complete program that runs in the Spring Maven lab.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('spring_' + id, title, 'Spring <span>' + esc(title) + '</span>', body);
  const run = (code, out, title) => K.spring(code, out, { course: 'spring', title });
  const topics = (id) => JT.springGroups.find((g) => g[0] === id)[2].map(([t, tt]) => ['spring_' + t, tt]);

  JT.def('spring_home', { title: 'Spring Framework', h1: 'Spring <span>Framework</span>', body: () => [
    p('Spring Framework is a Java framework that creates your application objects, connects them together, and adds services such as transactions, security and web request handling.'),
    p('This course teaches the parts of Spring that you use every day and that interviewers ask about: the container, beans, configuration, proxies, transactions and Spring MVC. Spring Boot is a separate course that builds on this one.'),
    h2('Course map'),
    ...JT.springGroups.map(([id, title, list]) => '<h3><a href="' + JT.url('spring_group_' + id) + '">' + esc(title) + '</a></h3>' +
      ul(list.map(([t, tt]) => '<a href="' + JT.url('spring_' + t) + '">' + esc(tt) + '</a>'))),
    h2('Running the examples'),
    p('Each example is a complete program. Choose <strong>Run with Maven</strong> to build it in a temporary project with Spring Framework 7.0 and Java 17+. The first run may download dependencies. Database examples use an in-memory H2 database.'),
    note('The examples create the Spring container by hand with <code>new AnnotationConfigApplicationContext(...)</code>. This shows what Spring does. In a Spring Boot application, Boot creates the container for you.'),
  ].join('') });

  K.overview('spring_group_ioc', 'IoC and Dependency Injection', 'Spring <span>IoC and Dependency Injection</span>', [
    p('The Spring container creates objects (beans) and gives each one the other objects it needs. These lessons explain how it chooses and injects dependencies.'),
  ], topics('ioc'));
  K.overview('spring_group_beans', 'Beans', 'Spring <span>Beans</span>', [
    p('A bean is an object created and managed by the Spring container. These lessons cover how many instances Spring creates, when it calls your code, and what that means for thread safety.'),
  ], topics('beans'));
  K.overview('spring_group_configuration', 'Configuration', 'Spring <span>Configuration</span>', [
    p('Configuration tells Spring which beans to create. You can declare beans with <code>@Bean</code> methods or let Spring find annotated classes, and choose beans by profile, property or condition.'),
  ], topics('configuration'));
  K.overview('spring_group_aop', 'AOP and Proxies', 'Spring <span>AOP and Proxies</span>', [
    p('Many Spring features — <code>@Transactional</code>, <code>@Async</code>, <code>@Cacheable</code>, method security — work by wrapping your bean in a proxy. Understanding proxies explains most “why didn’t my annotation work?” problems.'),
  ], topics('aop'));

  // ---------------------------------------------------------------- IoC & DI
  L('ioc_di', 'IoC and dependency injection', () => [
    h2('What is dependency injection?'),
    p('<strong>Dependency injection (DI)</strong> means an object receives the objects it needs (its dependencies) from outside, instead of creating them itself.'),
    p('<strong>Inversion of Control (IoC)</strong> is the bigger idea: your code no longer controls object creation. The Spring container creates the objects and connects them.'),
    h2('Why is it used?'),
    p('When a class creates its own dependencies, it is tied to one implementation. You cannot replace it with a test double or a different implementation without changing the class.'),
    K.java(`class StripeGateway {
    String pay(int amount) { return "Paid " + amount + " via Stripe"; }
}

class OrderService {
    private final StripeGateway gateway = new StripeGateway();   // fixed choice

    String checkout(int amount) { return gateway.pay(amount); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new OrderService().checkout(500));
    }
}`, 'Paid 500 via Stripe', 'Without DI: the class creates its dependency'),
    h2('Example with Spring'),
    run(`import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

interface PaymentGateway {
    String pay(int amount);
}

class FakeGateway implements PaymentGateway {
    public String pay(int amount) { return "Paid " + amount + " via fake gateway"; }
}

class OrderService {
    private final PaymentGateway gateway;

    OrderService(PaymentGateway gateway) {   // dependency comes from outside
        this.gateway = gateway;
    }

    String checkout(int amount) { return gateway.pay(amount); }
}

@Configuration
class AppConfig {
    @Bean
    PaymentGateway paymentGateway() { return new FakeGateway(); }

    @Bean
    OrderService orderService(PaymentGateway gateway) { return new OrderService(gateway); }
}

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            OrderService orders = context.getBean(OrderService.class);
            System.out.println(orders.checkout(500));
        }
    }
}`, 'Paid 500 via fake gateway', 'Spring creates and connects the objects'),
    h2('How does it work?'),
    ol(['<code>OrderService</code> depends on the <code>PaymentGateway</code> interface, not on a concrete class.',
      '<code>@Configuration</code> marks <code>AppConfig</code> as a source of bean definitions. Each <code>@Bean</code> method describes one bean.',
      '<code>new AnnotationConfigApplicationContext(AppConfig.class)</code> starts the container. It calls <code>paymentGateway()</code>, then passes that bean to <code>orderService(...)</code>.',
      '<code>getBean(OrderService.class)</code> returns the ready-to-use object. Closing the context (try-with-resources) shuts the beans down.']),
    h2('When should you use it?'),
    p('For application services, repositories, clients and anything with a dependency you might replace in a test. Simple value objects such as <code>Order</code> or <code>Money</code> are created with <code>new</code> as usual; they are not beans.'),
    h2('Important points'),
    ul(['Depend on interfaces or abstractions where you expect more than one implementation.',
      'In a unit test you can call <code>new OrderService(new FakeGateway())</code> with no Spring at all.',
      'Calling <code>context.getBean()</code> in business code is the Service Locator pattern. Let Spring inject dependencies instead.']),
    K.interview([
      ['What is the difference between IoC and DI?', 'IoC is the principle that a framework, not your code, controls object creation and the flow of calls. DI is one way to achieve it: dependencies are passed in through constructors, setters or fields.'],
      ['What are the benefits of DI?', 'Loose coupling, easier unit testing with test doubles, a single place to configure implementations, and dependencies that are visible in the constructor.'],
      ['Is every object in a Spring application a bean?', 'No. Only objects the container creates or registers are beans. Entities, DTOs and other objects created with <code>new</code> are not managed by Spring.'],
    ]),
  ]);

  L('application_context', 'ApplicationContext vs BeanFactory', () => [
    h2('What are they?'),
    p('<code>BeanFactory</code> is Spring’s basic container interface: it creates beans and returns them. <code>ApplicationContext</code> extends it and adds the features an application needs.'),
    table(['Feature', 'BeanFactory', 'ApplicationContext'], [
      ['Creates and injects beans', 'Yes', 'Yes'],
      ['Singleton creation', 'Lazy: when first requested', 'Eager: at startup'],
      ['Registers BeanPostProcessors automatically', 'No', 'Yes (needed for @Autowired, AOP, @Transactional)'],
      ['Events, messages (i18n), resources, Environment', 'No', 'Yes'],
    ]),
    h2('Example'),
    run(`import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

class ReportEngine {
    ReportEngine() { System.out.println("ReportEngine created"); }
}

@Configuration
class AppConfig {
    @Bean
    ReportEngine reportEngine() { return new ReportEngine(); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Starting ApplicationContext");
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println("ApplicationContext ready");
            context.getBean(ReportEngine.class);
        }

        System.out.println("Starting BeanFactory");
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        factory.registerBeanDefinition("reportEngine", new RootBeanDefinition(ReportEngine.class));
        System.out.println("BeanFactory ready");
        factory.getBean(ReportEngine.class);
    }
}`, `Starting ApplicationContext
ReportEngine created
ApplicationContext ready
Starting BeanFactory
BeanFactory ready
ReportEngine created`, 'Eager vs lazy singleton creation'),
    h2('How does it work?'),
    ul(['The <code>ApplicationContext</code> creates every non-lazy singleton during startup, so “ReportEngine created” appears before “ready”.',
      'The plain <code>BeanFactory</code> creates the bean only when <code>getBean()</code> is called.',
      'Eager creation is a feature: configuration mistakes (a missing bean, a bad property) fail at startup instead of during the first user request.']),
    h2('When should you use it?'),
    p('Use <code>ApplicationContext</code> in practically every application. Spring Boot creates one for you. <code>BeanFactory</code> appears mainly in framework code and in interview questions.'),
    K.interview([
      ['Difference between BeanFactory and ApplicationContext?', '<code>ApplicationContext</code> is a <code>BeanFactory</code> plus eager singleton creation, automatic registration of post-processors, events, internationalization, resource loading and the <code>Environment</code>.'],
      ['Why does Spring create singletons eagerly?', 'To detect configuration errors at startup and to avoid slow first requests. You can opt out per bean with <code>@Lazy</code>.'],
      ['What happens when the context is closed?', 'Spring calls destroy callbacks (<code>@PreDestroy</code>, <code>DisposableBean</code>, destroy methods) on singletons in reverse dependency order, so resources such as pools are released.'],
    ]),
  ]);

  L('injection_types', 'Constructor, setter and field injection', () => [
    h2('What are the injection types?'),
    table(['Type', 'How', 'Use for'], [
      ['Constructor', 'Dependencies are constructor parameters', 'Required dependencies (recommended default)'],
      ['Setter', 'Spring calls a setter after construction', 'Optional or changeable dependencies'],
      ['Field', '<code>@Autowired</code> on a field; Spring sets it with reflection', 'Avoid in production code'],
    ]),
    h2('Example'),
    run(`import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
class PriceCalculator {
    int withTax(int amount) { return amount * 120 / 100; }
}

@Component
class ConstructorInvoice {
    private final PriceCalculator calculator;

    ConstructorInvoice(PriceCalculator calculator) {   // no @Autowired needed with one constructor
        this.calculator = calculator;
    }
    String total() { return "constructor: " + calculator.withTax(100); }
}

@Component
class SetterInvoice {
    private PriceCalculator calculator;

    @Autowired
    void setCalculator(PriceCalculator calculator) { this.calculator = calculator; }
    String total() { return "setter: " + calculator.withTax(100); }
}

@Component
class FieldInvoice {
    @Autowired
    private PriceCalculator calculator;

    String total() { return "field: " + calculator.withTax(100); }
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println(context.getBean(ConstructorInvoice.class).total());
            System.out.println(context.getBean(SetterInvoice.class).total());
            System.out.println(context.getBean(FieldInvoice.class).total());
        }

        // A unit test without Spring:
        System.out.println(new ConstructorInvoice(new PriceCalculator()).total());
        try {
            new FieldInvoice().total();
        } catch (NullPointerException e) {
            System.out.println("field injection in a plain unit test: NullPointerException");
        }
    }
}`, `constructor: 120
setter: 120
field: 120
constructor: 120
field injection in a plain unit test: NullPointerException`, 'Three ways to inject the same dependency'),
    h2('How does it work?'),
    ul(['All three work inside the container.',
      'Outside the container, the constructor version cannot be created without its dependency, so it can never be half-built.',
      'The field version can be created with <code>new</code>, but its field stays <code>null</code>. You need reflection or a Spring test to fill it.',
      'If a class has exactly one constructor, Spring uses it automatically. With several constructors, mark the one to use with <code>@Autowired</code>.']),
    h2('Why constructor injection is the default'),
    ul(['Fields can be <code>final</code>, so the object is immutable and safe to share between threads.',
      'Required dependencies are explicit. A constructor with eight parameters is a visible sign that the class does too much.',
      'Plain unit tests are easy: call the constructor with test doubles.',
      'Constructor cycles fail fast at startup instead of being hidden.']),
    K.interview([
      ['Which injection type do you prefer and why?', 'Constructor injection for required dependencies: final fields, no partially built objects, easy unit tests, and visible dependencies. Setter injection only for truly optional dependencies.'],
      ['Why is field injection discouraged?', 'It hides dependencies, prevents <code>final</code> fields, needs reflection or a Spring context for tests, and makes it easy to add too many dependencies unnoticed.'],
      ['Is @Autowired required on a constructor?', 'No, not when the class has a single constructor (since Spring 4.3). It is needed to choose among several constructors.'],
    ]),
  ]);

  L('qualifier_primary', 'Multiple beans: @Qualifier and @Primary', () => [
    h2('What is the problem?'),
    p('Spring injects by type. If two beans implement the same interface, Spring cannot decide which one to inject and startup fails with <code>NoUniqueBeanDefinitionException: expected single matching bean but found 2: email,sms</code>.'),
    h2('The options'),
    table(['Option', 'Effect'], [
      ['<code>@Primary</code>', 'This bean is the default when several match'],
      ['<code>@Qualifier("name")</code>', 'At the injection point: inject this specific bean'],
      ['<code>List&lt;T&gt;</code> or <code>Map&lt;String, T&gt;</code>', 'Inject all matching beans (the map key is the bean name)'],
    ]),
    h2('Example'),
    run(`import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

interface Notifier {
    String send(String message);
}

@Component("email")
@Primary
class EmailNotifier implements Notifier {
    public String send(String message) { return "Email: " + message; }
}

@Component("sms")
class SmsNotifier implements Notifier {
    public String send(String message) { return "SMS: " + message; }
}

@Component
class AlertService {
    final Notifier defaultNotifier;
    final Notifier urgentNotifier;
    final Map<String, Notifier> all;

    AlertService(Notifier defaultNotifier,
                 @Qualifier("sms") Notifier urgentNotifier,
                 Map<String, Notifier> all) {
        this.defaultNotifier = defaultNotifier;
        this.urgentNotifier = urgentNotifier;
        this.all = all;
    }
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            AlertService alerts = context.getBean(AlertService.class);
            System.out.println(alerts.defaultNotifier.send("Order shipped"));
            System.out.println(alerts.urgentNotifier.send("Payment failed"));
            System.out.println("All notifiers: " + alerts.all.keySet().stream().sorted().toList());
        }
    }
}`, `Email: Order shipped
SMS: Payment failed
All notifiers: [email, sms]`, 'Choosing between two implementations'),
    h2('How does it work?'),
    ul(['The first constructor parameter has no qualifier. Two beans match, so Spring uses the <code>@Primary</code> one: <code>email</code>.',
      '<code>@Qualifier("sms")</code> picks the bean named <code>sms</code>, ignoring <code>@Primary</code>.',
      'A <code>Map&lt;String, Notifier&gt;</code> receives every <code>Notifier</code> bean. This is a clean way to implement a strategy lookup by name.']),
    h2('Important points'),
    ul(['<code>@Qualifier</code> wins over <code>@Primary</code>.',
      'As a last resort Spring matches the parameter name to a bean name. Do not rely on that: it breaks silently when someone renames a parameter.',
      'For a list in a fixed order, add <code>@Order</code> to the implementations.']),
    K.interview([
      ['How does Spring resolve a dependency when several beans match?', 'It looks for a <code>@Qualifier</code> at the injection point, then a <code>@Primary</code> bean, then a bean whose name matches the parameter name. If none decides, it throws <code>NoUniqueBeanDefinitionException</code>.'],
      ['@Primary vs @Qualifier?', '<code>@Primary</code> is declared on the bean and sets a default for everyone. <code>@Qualifier</code> is declared where the bean is injected and selects a specific bean.'],
      ['How would you implement a strategy pattern with Spring?', 'Make each strategy a bean implementing one interface and inject <code>Map&lt;String, Strategy&gt;</code> or <code>List&lt;Strategy&gt;</code>, then choose at runtime.'],
    ]),
  ]);

  L('circular_dependencies', 'Circular dependencies', () => [
    h2('What is a circular dependency?'),
    p('A circular dependency exists when bean A needs bean B and bean B needs bean A. With constructor injection, Spring cannot create either one first.'),
    h2('Example'),
    run(`import org.springframework.beans.factory.BeanCreationException;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Component
class OrderService {
    OrderService(CustomerService customers) { }
}

@Component
class CustomerService {
    CustomerService(OrderService orders) { }
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println("Started");
        } catch (BeanCreationException e) {
            System.out.println("Startup failed: " + e.getMostSpecificCause().getClass().getSimpleName());
        }
    }
}`, 'Startup failed: BeanCurrentlyInCreationException', 'Constructor cycle'),
    h2('How does it work?'),
    ul(['Spring starts creating <code>CustomerService</code> and sees that it needs <code>OrderService</code>.',
      'To create <code>OrderService</code>, it needs <code>CustomerService</code>, which is already “in creation”.',
      'Spring stops with <code>BeanCurrentlyInCreationException</code> instead of looping forever.']),
    h2('How to fix it'),
    p('A cycle usually means responsibilities are mixed. The best fix is a design change:'),
    ul(['Move the shared logic into a third bean that both can use.',
      'Let one side publish an application event instead of calling the other directly.',
      'Pass the needed value as a method argument instead of injecting the whole service.']),
    p('As a short-term workaround, <code>@Lazy</code> on one constructor parameter injects a proxy and creates the real bean on first use:'),
    K.show(`@Component
class OrderService {
    OrderService(@Lazy CustomerService customers) { }   // a proxy, resolved on first call
}`, 'Workaround with @Lazy', 'java'),
    h2('Important points'),
    ul(['Plain Spring can resolve cycles between setter- or field-injected singletons using early references. That hides the design problem.',
      'Spring Boot (since 2.6) rejects all circular references by default. <code>spring.main.allow-circular-references=true</code> turns this off, but fixing the design is better.']),
    K.interview([
      ['How does Spring handle circular dependencies?', 'Constructor cycles fail with <code>BeanCurrentlyInCreationException</code>. For setter/field injection of singletons, Spring can expose an early reference through its singleton caches, but Spring Boot disables this by default.'],
      ['How do you fix a circular dependency?', 'Refactor: extract the shared part into a new bean, use events, or pass data as parameters. <code>@Lazy</code> or setter injection are workarounds, not fixes.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Beans
  L('bean_scopes', 'Bean scopes', () => [
    h2('What is a bean scope?'),
    p('A scope decides how many instances of a bean Spring creates and how long each instance lives.'),
    table(['Scope', 'Instances', 'Typical use'], [
      ['<code>singleton</code> (default)', 'One per container', 'Stateless services, repositories, clients'],
      ['<code>prototype</code>', 'A new one every time it is requested', 'Stateful helper objects'],
      ['<code>request</code>', 'One per HTTP request', 'Request-specific data in web apps'],
      ['<code>session</code>', 'One per HTTP session', 'User session data (use carefully)'],
    ]),
    h2('Example'),
    run(`import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Component
class PricingService { }

@Component
@Scope("prototype")
class ReportBuilder { }

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            boolean sameService = context.getBean(PricingService.class) == context.getBean(PricingService.class);
            boolean sameBuilder = context.getBean(ReportBuilder.class) == context.getBean(ReportBuilder.class);
            System.out.println("singleton: same instance = " + sameService);
            System.out.println("prototype: same instance = " + sameBuilder);
        }
    }
}`, `singleton: same instance = true
prototype: same instance = false`, 'Singleton vs prototype'),
    h2('Important points'),
    ul(['A Spring singleton means one instance <em>per container</em>, not one per JVM like the GoF Singleton pattern.',
      'Spring does not call destroy callbacks on prototype beans. The code that asked for the bean owns its cleanup.',
      'Request and session scopes need a web application context. Injecting them into a singleton requires a scoped proxy (Spring sets this up for <code>@RequestScope</code> and <code>@SessionScope</code>).']),
    K.interview([
      ['What is the default scope?', 'Singleton: one shared instance per container, created at startup.'],
      ['Spring singleton vs the Singleton design pattern?', 'The pattern enforces one instance per class loader through a private constructor. A Spring singleton is one instance per bean definition per container; you can still create others with <code>new</code>.'],
      ['Does Spring manage the full lifecycle of a prototype bean?', 'No. It creates and initializes it, then hands it over. Destroy callbacks are not called.'],
    ]),
  ]);

  L('prototype_in_singleton', 'Prototype bean inside a singleton', () => [
    h2('What is the problem?'),
    p('A singleton is created once, so its dependencies are injected once. If you inject a prototype bean into a singleton, the singleton keeps the same prototype instance forever.'),
    h2('Example'),
    run(`import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
class ShoppingCart {
    private static int created = 0;
    final int id = ++created;
}

@Component
class BrokenCheckout {
    private final ShoppingCart cart;   // injected once, at startup
    BrokenCheckout(ShoppingCart cart) { this.cart = cart; }
    int cartId() { return cart.id; }
}

@Component
class FixedCheckout {
    private final ObjectProvider<ShoppingCart> carts;
    FixedCheckout(ObjectProvider<ShoppingCart> carts) { this.carts = carts; }
    int cartId() { return carts.getObject().id; }   // new cart on every call
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            BrokenCheckout broken = context.getBean(BrokenCheckout.class);
            FixedCheckout fixed = context.getBean(FixedCheckout.class);
            System.out.println("Broken: " + broken.cartId() + ", " + broken.cartId());
            System.out.println("Fixed: " + fixed.cartId() + ", " + fixed.cartId());
        }
    }
}`, `Broken: 1, 1
Fixed: 2, 3`, 'Fresh prototype on every call'),
    h2('How does it work?'),
    ul(['At startup Spring creates <code>BrokenCheckout</code> and one <code>ShoppingCart</code> (id 1) for it. Every call returns that cart.',
      '<code>ObjectProvider</code> is a small factory injected by Spring. Each <code>getObject()</code> asks the container again, so a prototype returns a new instance (ids 2 and 3).',
      'Other solutions: a <code>@Lookup</code> method, or <code>@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)</code>.']),
    K.interview([
      ['How do you inject a prototype bean into a singleton and get a new instance each time?', 'Inject <code>ObjectProvider&lt;T&gt;</code> (or <code>jakarta.inject.Provider</code>) and call <code>getObject()</code> when needed, use a <code>@Lookup</code> method, or use a scoped proxy.'],
      ['How does a request-scoped bean work inside a singleton controller?', 'Spring injects a scoped proxy. Each method call on the proxy finds the bean instance for the current request.'],
    ]),
  ]);

  L('bean_lifecycle', 'Bean lifecycle callbacks', () => [
    h2('What is the bean lifecycle?'),
    p('The bean lifecycle is the sequence of steps Spring follows from creating a bean to destroying it. You can run your own code at the start (initialization) and at the end (destruction).'),
    h2('Example'),
    run(`import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Component
class Settings { }

@Component
class CacheWarmer {
    private Settings settings;

    CacheWarmer() {
        System.out.println("1. constructor");
    }

    @Autowired
    void setSettings(Settings settings) {
        this.settings = settings;
        System.out.println("2. dependencies injected");
    }

    @PostConstruct
    void init() {
        System.out.println("3. @PostConstruct: settings ready = " + (settings != null));
    }

    @PreDestroy
    void shutdown() {
        System.out.println("5. @PreDestroy");
    }
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println("4. bean in use");
        }
    }
}`, `1. constructor
2. dependencies injected
3. @PostConstruct: settings ready = true
4. bean in use
5. @PreDestroy`, 'Lifecycle order'),
    h2('The full order'),
    ol(['Instantiate the bean (call the constructor).',
      'Inject dependencies (setters and fields).',
      'Call <code>Aware</code> methods, such as <code>setBeanName</code>.',
      '<code>BeanPostProcessor.postProcessBeforeInitialization</code>.',
      'Initialization: <code>@PostConstruct</code>, then <code>InitializingBean.afterPropertiesSet()</code>, then a custom <code>initMethod</code>.',
      '<code>BeanPostProcessor.postProcessAfterInitialization</code> — proxies for AOP and <code>@Transactional</code> are created here.',
      'The bean is ready. On shutdown: <code>@PreDestroy</code>, <code>DisposableBean.destroy()</code>, custom <code>destroyMethod</code>.']),
    h2('Important points'),
    ul(['Use <code>@PostConstruct</code> for work that needs injected fields; they are still <code>null</code> in the constructor if field or setter injection is used.',
      '<code>@PostConstruct</code> runs before proxies are created, so calling a <code>@Transactional</code> method of the same bean there does not start a transaction. Use an <code>ApplicationReadyEvent</code> or <code>SmartInitializingSingleton</code> listener for that.',
      '<code>@PostConstruct</code> and <code>@PreDestroy</code> come from the <code>jakarta.annotation-api</code> library, which Spring Boot includes.',
      'For third-party classes you cannot annotate, use <code>@Bean(initMethod = "start", destroyMethod = "stop")</code>.']),
    K.interview([
      ['Describe the Spring bean lifecycle.', 'Instantiate, populate properties, Aware callbacks, BeanPostProcessor before-init, init callbacks (<code>@PostConstruct</code>, <code>afterPropertiesSet</code>, init-method), BeanPostProcessor after-init (proxies), ready, then destroy callbacks on shutdown.'],
      ['Why not put initialization code in the constructor?', 'Setter- and field-injected dependencies are not yet set, and the object is not yet proxied. <code>@PostConstruct</code> runs after injection.'],
      ['Are destroy methods called for prototype beans?', 'No. Spring does not track prototype instances after creating them.'],
    ]),
  ]);

  L('bean_post_processor', 'BeanPostProcessor', () => [
    h2('What is a BeanPostProcessor?'),
    p('A <code>BeanPostProcessor</code> is a special bean that Spring calls for every other bean, just before and just after initialization. It can inspect the bean or return a different object, such as a proxy that wraps it.'),
    h2('Why does it matter?'),
    p('Much of Spring is built this way. <code>@Autowired</code> is handled by <code>AutowiredAnnotationBeanPostProcessor</code>. <code>@Transactional</code>, <code>@Async</code> and aspects work because a post-processor replaces your bean with a proxy.'),
    h2('Example: wrap beans in a proxy'),
    run(`import java.lang.annotation.*;
import java.lang.reflect.Proxy;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Logged { }

interface Greeter {
    String greet(String name);
}

@Component
@Logged
class SimpleGreeter implements Greeter {
    public String greet(String name) { return "Hello, " + name; }
}

@Component
class LoggingPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (!bean.getClass().isAnnotationPresent(Logged.class)) return bean;
        return Proxy.newProxyInstance(bean.getClass().getClassLoader(), bean.getClass().getInterfaces(),
            (proxy, method, args) -> {
                System.out.println("Before " + method.getName());
                Object result = method.invoke(bean, args);
                System.out.println("After " + method.getName());
                return result;
            });
    }
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            Greeter greeter = context.getBean(Greeter.class);
            System.out.println(greeter.greet("Ada"));
            System.out.println("Is a proxy: " + Proxy.isProxyClass(greeter.getClass()));
        }
    }
}`, `Before greet
After greet
Hello, Ada
Is a proxy: true`, 'A post-processor that adds logging'),
    h2('How does it work?'),
    ul(['Spring calls <code>postProcessAfterInitialization</code> for each bean after its init callbacks.',
      'For beans marked <code>@Logged</code>, it returns a JDK dynamic proxy instead of the original object. The container stores and injects the proxy.',
      'Every call on the proxy runs the logging code, then the real method. This is the same idea Spring AOP uses.']),
    h2('Important points'),
    ul(['A <code>BeanFactoryPostProcessor</code> is different: it runs earlier and changes bean <em>definitions</em> (for example, resolving <code>${...}</code> placeholders), not bean instances.',
      'Post-processors are created before ordinary beans. Beans they depend on are created too early and may not be processed by other post-processors. Keep post-processors free of dependencies, and declare them with <code>static @Bean</code> methods in configuration classes.']),
    K.interview([
      ['What is a BeanPostProcessor used for?', 'To customize or wrap bean instances during initialization. Spring uses it for dependency injection annotations, lifecycle annotations, and creating AOP proxies.'],
      ['BeanPostProcessor vs BeanFactoryPostProcessor?', 'A BeanFactoryPostProcessor modifies bean definitions before any bean is created. A BeanPostProcessor works on each created bean instance.'],
      ['At which step are @Transactional proxies created?', 'In <code>postProcessAfterInitialization</code>, by an auto-proxy creator post-processor.'],
    ]),
  ]);

  L('singleton_thread_safety', 'Singleton beans and thread safety', () => [
    h2('What is the problem?'),
    p('A singleton bean is shared by every request. In a web application, many threads call it at the same time. If the bean stores request data in a field, one request can see another request’s data.'),
    h2('Example'),
    p('The two calls below are made one after the other, but they show what can happen when two requests overlap.'),
    run(`import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

@Component
class StatefulGreeting {
    private String currentUser;   // shared by every request!

    void start(String user) { currentUser = user; }
    String finish() { return "Hello, " + currentUser; }
}

@Component
class StatelessGreeting {
    String greet(String user) { return "Hello, " + user; }   // data stays in parameters and locals
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            StatefulGreeting forAlice = context.getBean(StatefulGreeting.class);
            StatefulGreeting forBob = context.getBean(StatefulGreeting.class);
            System.out.println("Same instance for both requests: " + (forAlice == forBob));

            forAlice.start("alice");   // request 1 starts
            forBob.start("bob");       // request 2 starts before request 1 finishes
            System.out.println("Request 1 sees: " + forAlice.finish());

            System.out.println("Stateless: " + context.getBean(StatelessGreeting.class).greet("alice"));
        }
    }
}`, `Same instance for both requests: true
Request 1 sees: Hello, bob
Stateless: Hello, alice`, 'Request data in a singleton field'),
    h2('How to make singletons safe'),
    ul(['Keep singletons stateless: request data goes in method parameters and local variables.',
      'Final fields that hold other beans or immutable configuration are fine.',
      'If shared mutable state is required (a counter, a cache), use thread-safe types such as <code>AtomicLong</code> or <code>ConcurrentHashMap</code>.',
      'For per-request data, use a request-scoped bean or pass a context object.']),
    K.interview([
      ['Are Spring singleton beans thread-safe?', 'No. Spring does not synchronize anything. A singleton is safe only if it is stateless or its shared state is immutable or thread-safe.'],
      ['How would you store per-request data?', 'In method parameters, a request-scoped bean, or request attributes. Avoid <code>ThreadLocal</code> unless it is always cleared, because server threads are reused.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Configuration
  L('configuration_vs_component', '@Configuration and @Bean methods', () => [
    h2('What is @Configuration?'),
    p('<code>@Configuration</code> marks a class whose <code>@Bean</code> methods create beans. Use <code>@Bean</code> for objects you cannot annotate, such as library classes, or when creation needs code.'),
    h2('Why does @Configuration matter?'),
    p('Spring creates a CGLIB subclass of a <code>@Configuration</code> class. When one <code>@Bean</code> method calls another, the subclass returns the existing singleton instead of running the method again. With <code>proxyBeanMethods = false</code> (or a <code>@Bean</code> method in a <code>@Component</code>), the call is a normal Java call and creates a new object.'),
    h2('Example'),
    run(`import org.springframework.context.annotation.*;

class Database { }

record Repository(Database database) { }

@Configuration
class FullConfig {
    @Bean Database database() { return new Database(); }
    @Bean Repository users() { return new Repository(database()); }
    @Bean Repository orders() { return new Repository(database()); }
}

@Configuration(proxyBeanMethods = false)
class LiteConfig {
    @Bean Database database() { return new Database(); }
    @Bean Repository users() { return new Repository(database()); }
    @Bean Repository orders() { return new Repository(database()); }
}

public class Main {
    static boolean sameDatabase(Class<?> config) {
        try (var context = new AnnotationConfigApplicationContext(config)) {
            Repository users = context.getBean("users", Repository.class);
            Repository orders = context.getBean("orders", Repository.class);
            return users.database() == orders.database();
        }
    }

    public static void main(String[] args) {
        System.out.println("@Configuration: same Database = " + sameDatabase(FullConfig.class));
        System.out.println("proxyBeanMethods = false: same Database = " + sameDatabase(LiteConfig.class));
    }
}`, `@Configuration: same Database = true
proxyBeanMethods = false: same Database = false`, 'Calling one @Bean method from another'),
    h2('How does it work?'),
    ul(['In <code>FullConfig</code>, the call <code>database()</code> goes through the CGLIB subclass, which returns the singleton from the container.',
      'In <code>LiteConfig</code>, <code>database()</code> is a plain method call. Each repository gets its own new <code>Database</code>, which is not a Spring bean at all.',
      'In lite mode, inject the dependency as a method parameter instead: <code>@Bean Repository users(Database database)</code>. This works in both modes and is the clearest style.']),
    h2('Important points'),
    ul(['<code>@Configuration</code> classes and <code>@Bean</code> methods must not be <code>final</code> or <code>private</code>, because CGLIB must override them.',
      'Spring Boot’s own auto-configuration classes use <code>proxyBeanMethods = false</code> to start faster.',
      'Use <code>static</code> <code>@Bean</code> methods for post-processors, so they can be created before the configuration class itself.']),
    K.interview([
      ['What is the difference between @Bean in a @Configuration class and in a @Component class?', 'In a <code>@Configuration</code> class (full mode), calls between <code>@Bean</code> methods are intercepted to return singletons. In a <code>@Component</code> (lite mode), they are plain Java calls that create new objects.'],
      ['When do you use @Bean instead of @Component?', 'For third-party classes you cannot annotate, for beans that need construction logic, or to choose an implementation in one configuration place.'],
    ]),
  ]);

  L('component_scanning', 'Component scanning and stereotypes', () => [
    h2('What is component scanning?'),
    p('Component scanning searches packages for classes annotated with <code>@Component</code> (or an annotation built on it) and registers each one as a bean.'),
    table(['Annotation', 'Layer', 'Extra behavior'], [
      ['<code>@Component</code>', 'Any', 'None'],
      ['<code>@Service</code>', 'Business logic', 'None; documents intent'],
      ['<code>@Repository</code>', 'Data access', 'Translates database exceptions into Spring’s <code>DataAccessException</code> types (with a translation post-processor)'],
      ['<code>@Controller</code> / <code>@RestController</code>', 'Web', 'Detected by Spring MVC as request handlers'],
    ]),
    h2('Example'),
    run(`import java.util.Arrays;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

@Repository
class OrderRepository { }

@Service
class OrderService {
    OrderService(OrderRepository repository) { }
}

@Controller
class OrderController {
    OrderController(OrderService service) { }
}

@Configuration
@ComponentScan   // scans this class's package and its sub-packages
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            Arrays.stream(context.getBeanDefinitionNames())
                  .filter(name -> name.startsWith("order"))
                  .sorted()
                  .forEach(System.out::println);
        }
    }
}`, `orderController
orderRepository
orderService`, 'Beans found by scanning'),
    h2('How does it work?'),
    ul(['Without <code>basePackages</code>, <code>@ComponentScan</code> scans the package of the class that declares it.',
      'The default bean name is the simple class name with a lower-case first letter.',
      'Spring Boot’s <code>@SpringBootApplication</code> includes <code>@ComponentScan</code>, which is why the main class should be in the root package.']),
    K.interview([
      ['@Component vs @Service vs @Repository?', 'All register beans. <code>@Service</code> only documents intent. <code>@Repository</code> also enables exception translation to <code>DataAccessException</code>. <code>@Controller</code> marks web handlers.'],
      ['A bean is not found at startup. What do you check?', 'That the class is in a scanned package (below the main class in Boot), that it has a stereotype annotation, and that it is not excluded by a profile or condition.'],
    ]),
  ]);

  L('properties_profiles', '@Value, Environment and @Profile', () => [
    h2('What are they?'),
    ul(['The <strong>Environment</strong> holds configuration properties from system properties, environment variables and property files, plus the active profiles.',
      '<strong><code>@Value("${name}")</code></strong> injects one property into a bean.',
      '<strong><code>@Profile("dev")</code></strong> registers a bean only when that profile is active.']),
    h2('Example'),
    run(`import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

interface MailSender {
    String send(String to);
}

@Component
@Profile("dev")
class ConsoleMailSender implements MailSender {
    public String send(String to) { return "DEV: would email " + to; }
}

@Component
@Profile("prod")
class SmtpMailSender implements MailSender {
    public String send(String to) { return "Sent email to " + to; }
}

@Component
class AppInfo {
    @Value("\${app.name}")
    String name;

    @Value("\${app.timeout-seconds:30}")   // 30 is the default
    int timeoutSeconds;
}

@Configuration
@ComponentScan
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        System.setProperty("app.name", "Shop");

        try (var context = new AnnotationConfigApplicationContext()) {
            context.getEnvironment().setActiveProfiles("dev");
            context.register(AppConfig.class);
            context.refresh();

            System.out.println(context.getBean(MailSender.class).send("ada@example.com"));
            AppInfo info = context.getBean(AppInfo.class);
            System.out.println("App: " + info.name + ", timeout " + info.timeoutSeconds + "s");
        }
    }
}`, `DEV: would email ada@example.com
App: Shop, timeout 30s`, 'Profile-specific beans and property injection'),
    h2('How does it work?'),
    ul(['The profile must be set before <code>refresh()</code>, which is when beans are created.',
      'Only the <code>dev</code> bean is registered, so injecting <code>MailSender</code> is not ambiguous.',
      '<code>app.name</code> is read from a system property. <code>app.timeout-seconds</code> is missing, so the default after the colon is used.',
      'Spring converts the text <code>"30"</code> to an <code>int</code>.']),
    h2('Important points'),
    ul(['A missing property without a default fails at startup, which is usually what you want.',
      'For a group of related properties, Spring Boot’s <code>@ConfigurationProperties</code> is safer than many <code>@Value</code> fields (see the Spring Boot course).',
      'Use profiles to switch infrastructure (mail, storage), not to change business rules.']),
    K.interview([
      ['How do you activate a profile?', 'With <code>spring.profiles.active</code> (property, environment variable <code>SPRING_PROFILES_ACTIVE</code>, or command line), or programmatically with <code>setActiveProfiles</code> before the context refreshes.'],
      ['What happens if a @Value placeholder cannot be resolved?', 'Startup fails with an <code>IllegalArgumentException</code> about the unresolved placeholder, unless a default is given with <code>${name:default}</code>.'],
    ]),
  ]);

  L('conditional', '@Conditional', () => [
    h2('What is @Conditional?'),
    p('<code>@Conditional</code> registers a bean only if a condition is true when the context starts. The condition is a class that implements <code>Condition</code>.'),
    h2('Why does it matter?'),
    p('This is the mechanism behind Spring Boot auto-configuration. Boot’s <code>@ConditionalOnClass</code>, <code>@ConditionalOnProperty</code> and <code>@ConditionalOnMissingBean</code> are all built on <code>@Conditional</code>.'),
    h2('Example'),
    run(`import org.springframework.context.annotation.*;
import org.springframework.core.type.AnnotatedTypeMetadata;

class CacheEnabledCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        return "true".equals(context.getEnvironment().getProperty("cache.enabled"));
    }
}

class CacheService { }

@Configuration
class AppConfig {
    @Bean
    @Conditional(CacheEnabledCondition.class)
    CacheService cacheService() { return new CacheService(); }
}

public class Main {
    public static void main(String[] args) {
        for (String value : new String[] {"true", "false"}) {
            System.setProperty("cache.enabled", value);
            try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
                System.out.println("cache.enabled=" + value + " -> CacheService registered: "
                    + context.containsBean("cacheService"));
            }
        }
    }
}`, `cache.enabled=true -> CacheService registered: true
cache.enabled=false -> CacheService registered: false`, 'A property-based condition'),
    h2('How does it work?'),
    ul(['Spring evaluates the condition while it reads bean definitions, before beans are created.',
      'If <code>matches</code> returns false, the bean definition is skipped completely.',
      'In Spring Boot the same bean would be <code>@ConditionalOnProperty(name = "cache.enabled", havingValue = "true")</code>.']),
    K.interview([
      ['How is @Conditional related to Spring Boot auto-configuration?', 'Auto-configuration classes are ordinary configuration classes guarded by conditions such as <code>@ConditionalOnClass</code> and <code>@ConditionalOnMissingBean</code>, which are built on <code>@Conditional</code>.'],
      ['@Profile vs @Conditional?', '<code>@Profile</code> is itself implemented with <code>@Conditional</code>. Profiles switch named environments; <code>@Conditional</code> can test anything: properties, classes on the classpath, existing beans.'],
    ]),
  ]);

  // ---------------------------------------------------------------- AOP
  L('aop_concepts', 'AOP concepts', () => [
    h2('What is AOP?'),
    p('Aspect-Oriented Programming (AOP) lets you add behavior around many methods without changing them. Logging, auditing, security checks, transactions and retries are typical examples. They are called <strong>cross-cutting concerns</strong> because they cut across many classes.'),
    table(['Term', 'Meaning'], [
      ['Aspect', 'A class that holds the cross-cutting code (<code>@Aspect</code>)'],
      ['Join point', 'A point where advice can run. In Spring AOP: a method execution'],
      ['Pointcut', 'An expression that selects join points, e.g. <code>execution(* com.shop.service.*.*(..))</code>'],
      ['Advice', 'The code to run: <code>@Before</code>, <code>@AfterReturning</code>, <code>@AfterThrowing</code>, <code>@After</code>, <code>@Around</code>'],
      ['Weaving', 'Linking aspects to targets. Spring AOP does it at runtime with proxies'],
    ]),
    h2('Example'),
    run(`package javatrail.lab;

import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

@Service
class PaymentService {
    public String pay(int amount) {
        System.out.println("Paying " + amount);
        return "OK";
    }
}

@Aspect
@Component
class AuditAspect {
    @Before("execution(* javatrail.lab.PaymentService.*(..))")
    void before(JoinPoint joinPoint) {
        System.out.println("Before " + joinPoint.getSignature().getName() + Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "execution(* javatrail.lab.PaymentService.*(..))", returning = "result")
    void afterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("After " + joinPoint.getSignature().getName() + " returned " + result);
    }
}

@Configuration
@ComponentScan
@EnableAspectJAutoProxy
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            context.getBean(PaymentService.class).pay(500);
        }
    }
}`, `Before pay[500]
Paying 500
After pay returned OK`, '@Before and @AfterReturning advice'),
    h2('How does it work?'),
    ul(['<code>@EnableAspectJAutoProxy</code> registers a post-processor that creates proxies for beans matched by any aspect. Spring Boot enables this automatically.',
      'The pointcut <code>execution(* javatrail.lab.PaymentService.*(..))</code> means: any method of <code>PaymentService</code>, any return type, any arguments.',
      '<code>getBean</code> returns the proxy. Calling <code>pay</code> runs the before advice, the real method, then the after-returning advice.',
      'Spring AOP uses AspectJ’s annotations and pointcut language, but not the AspectJ compiler.']),
    h2('Important points'),
    ul(['Spring AOP only advises <strong>method calls on Spring beans that go through the proxy</strong>. It cannot advise field access, constructors, or calls inside the same object.',
      'Full AspectJ weaving (compile-time or load-time) has no such limits, but is rarely needed.',
      'Keep pointcuts narrow, for example by matching a custom annotation: <code>@annotation(com.shop.Audited)</code>.']),
    K.interview([
      ['Explain aspect, advice, pointcut and join point.', 'An aspect groups cross-cutting code. A join point is a method execution. A pointcut selects join points. Advice is the code that runs before, after or around the selected join points.'],
      ['Spring AOP vs AspectJ?', 'Spring AOP is proxy-based, runtime-only and limited to public bean method calls through the proxy. AspectJ weaves bytecode and can advise any join point, including self-calls and constructors.'],
      ['Which Spring features are built on AOP?', '<code>@Transactional</code>, <code>@Async</code>, <code>@Cacheable</code>, <code>@PreAuthorize</code>, <code>@Retryable</code> and others.'],
    ]),
  ]);

  L('around_advice', '@Around advice', () => [
    h2('What is @Around advice?'),
    p('<code>@Around</code> advice wraps a method call completely. It decides whether to call the method, can call it more than once, can change the arguments or the result, and can catch exceptions. It is the most powerful advice type.'),
    h2('Example: a retry aspect'),
    run(`import java.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Retry {
    int attempts() default 3;
}

@Service
class ExchangeRateClient {
    private int calls = 0;

    @Retry(attempts = 3)
    public String fetchRate() {
        calls++;
        System.out.println("Attempt " + calls);
        if (calls < 3) throw new IllegalStateException("timeout");
        return "1 EUR = 1.08 USD";
    }
}

@Aspect
@Component
class RetryAspect {
    @Around("@annotation(retry)")
    Object retry(ProceedingJoinPoint call, Retry retry) throws Throwable {
        for (int attempt = 1; ; attempt++) {
            try {
                return call.proceed();
            } catch (IllegalStateException e) {
                if (attempt == retry.attempts()) throw e;
                System.out.println("Retrying after: " + e.getMessage());
            }
        }
    }
}

@Configuration
@ComponentScan
@EnableAspectJAutoProxy
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println(context.getBean(ExchangeRateClient.class).fetchRate());
        }
    }
}`, `Attempt 1
Retrying after: timeout
Attempt 2
Retrying after: timeout
Attempt 3
1 EUR = 1.08 USD`, 'Retry a failing call'),
    h2('How does it work?'),
    ul(['<code>@annotation(retry)</code> matches methods annotated with <code>@Retry</code> and passes the annotation into the <code>retry</code> parameter, so the aspect can read <code>attempts()</code>.',
      '<code>call.proceed()</code> runs the real method. If you forget to call it, the method never runs. If you forget to return its value, the caller gets <code>null</code>.',
      'The first two attempts throw, the aspect catches and retries, the third returns normally.']),
    h2('Important points'),
    ul(['Use the simplest advice that works. Use <code>@Around</code> only when you need to control the call.',
      'Only retry operations that are safe to repeat (idempotent).',
      'In real projects, Spring Retry or Resilience4j provide tested retry and backoff aspects.']),
    K.interview([
      ['What must an @Around advice do?', 'Call <code>proceed()</code> (unless it deliberately skips the method), return its result, and either handle or rethrow exceptions.'],
      ['How would you measure the execution time of every service method?', 'An <code>@Around</code> aspect with a pointcut on the service package or a custom annotation, recording the time before and after <code>proceed()</code> in a <code>finally</code> block, ideally to a metrics library such as Micrometer.'],
    ]),
  ]);

  L('jdk_vs_cglib', 'JDK dynamic proxy vs CGLIB', () => [
    h2('What are they?'),
    p('Spring creates proxies in two ways:'),
    table(['', 'JDK dynamic proxy', 'CGLIB proxy'], [
      ['How', 'A new class that implements the bean’s interfaces', 'A generated subclass of the bean’s class'],
      ['Requires', 'At least one interface', 'A class that is not <code>final</code>'],
      ['Can proxy', 'Interface methods only', 'Non-final, non-private methods'],
      ['Injectable as', 'The interface type only', 'The interface or the class'],
    ]),
    h2('Example'),
    run(`import org.aspectj.lang.annotation.*;
import org.springframework.aop.support.AopUtils;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

interface Greeter {
    String greet();
}

@Service
class GreeterImpl implements Greeter {
    public String greet() { return "hi"; }
}

@Service
class Calculator {
    public int add(int a, int b) { return a + b; }
}

@Aspect
@Component
class TraceAspect {
    @Before("bean(greeterImpl) || bean(calculator)")
    void trace() { }
}

@Configuration
@ComponentScan
@EnableAspectJAutoProxy   // proxyTargetClass = false by default
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            Object greeter = context.getBean("greeterImpl");
            Object calculator = context.getBean("calculator");
            System.out.println("greeterImpl uses JDK proxy: " + AopUtils.isJdkDynamicProxy(greeter));
            System.out.println("calculator uses CGLIB: " + AopUtils.isCglibProxy(calculator));
            try {
                context.getBean(GreeterImpl.class);
            } catch (Exception e) {
                System.out.println("getBean(GreeterImpl.class) fails: " + e.getClass().getSimpleName());
            }
        }
    }
}`, `greeterImpl uses JDK proxy: true
calculator uses CGLIB: true
getBean(GreeterImpl.class) fails: NoSuchBeanDefinitionException`, 'Which proxy does Spring create?'),
    h2('How does it work?'),
    ul(['<code>GreeterImpl</code> implements an interface, so plain Spring creates a JDK proxy. The proxy implements <code>Greeter</code> but is not a <code>GreeterImpl</code>, so looking it up by the class fails.',
      '<code>Calculator</code> has no interface, so Spring creates a CGLIB subclass.',
      '<code>@EnableAspectJAutoProxy(proxyTargetClass = true)</code> forces CGLIB for every bean. <strong>Spring Boot uses CGLIB by default</strong> (<code>spring.aop.proxy-target-class=true</code>), which avoids this injection problem.']),
    h2('Important points'),
    ul(['CGLIB cannot override <code>final</code> methods or classes, so advice on them is silently skipped. Kotlin classes are final by default; Spring’s Kotlin plugin opens them.',
      'Private methods are never proxied with either approach.',
      'Since Spring 4, CGLIB proxies are created with Objenesis, so your constructor is not called a second time for the proxy.']),
    K.interview([
      ['When does Spring use a JDK proxy and when CGLIB?', 'In plain Spring, a JDK proxy if the bean implements an interface, otherwise CGLIB. With <code>proxyTargetClass=true</code> — the Spring Boot default — always CGLIB.'],
      ['Why does @Transactional not work on a final method?', 'A CGLIB proxy is a subclass and cannot override a final method, so the call goes straight to the target without the transaction interceptor.'],
      ['Why did injecting the implementation class fail with a JDK proxy?', 'The bean in the container is the proxy, which only implements the interface. Inject the interface, or switch to class-based proxies.'],
    ]),
  ]);

  L('self_invocation', 'The self-invocation problem', () => [
    h2('What is self-invocation?'),
    p('Self-invocation is when a method of a bean calls another method of the <strong>same</strong> bean, through <code>this</code>. That call does not go through the Spring proxy, so advice on the second method — logging, <code>@Transactional</code>, <code>@Async</code>, <code>@Cacheable</code> — does not run.'),
    h2('Example'),
    run(`import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

@Service
class ReportService {
    public void generate() {
        System.out.println("generate()");
        this.audit();   // plain Java call on the target object
    }

    public void audit() {
        System.out.println("audit()");
    }
}

@Aspect
@Component
class TraceAspect {
    @Before("bean(reportService)")
    void trace(JoinPoint joinPoint) {
        System.out.println("[advice] " + joinPoint.getSignature().getName());
    }
}

@Configuration
@ComponentScan
@EnableAspectJAutoProxy
class AppConfig { }

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            ReportService service = context.getBean(ReportService.class);
            service.generate();
            System.out.println("---");
            service.audit();
        }
    }
}`, `[advice] generate
generate()
audit()
---
[advice] audit
audit()`, 'The inner call skips the advice'),
    h2('How does it work?'),
    ol(['<code>service</code> is the proxy. Calling <code>generate()</code> on it runs the advice, then calls the real object.',
      'Inside the real object, <code>this</code> is the target, not the proxy. <code>this.audit()</code> runs without advice.',
      'Calling <code>audit()</code> directly on the proxy (after <code>---</code>) does run the advice.']),
    h2('How to fix it'),
    ul(['<strong>Best:</strong> move the method into a separate bean and inject it. The call then crosses a proxy.',
      'Inject the bean into itself (<code>@Lazy ReportService self</code>) and call <code>self.audit()</code>. Works, but is harder to read.',
      'Use <code>TransactionTemplate</code> for programmatic transactions when the boundary must be inside one class.',
      'Use AspectJ weaving, which changes the bytecode and has no proxy.']),
    K.interview([
      ['Why doesn’t @Transactional work when I call the method from the same class?', 'Spring transactions are applied by a proxy. A call through <code>this</code> bypasses the proxy, so the transaction interceptor never runs.'],
      ['How do you fix the self-invocation problem?', 'Move the method into another bean, inject a self-reference (often <code>@Lazy</code>), use <code>TransactionTemplate</code>, or use AspectJ mode.'],
    ]),
  ]);
})();
