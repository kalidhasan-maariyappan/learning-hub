// Spring Framework lessons, part 2: data access, transactions, Spring MVC, events and @Async.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('spring_' + id, title, 'Spring <span>' + esc(title) + '</span>', body);
  const run = (code, out, title) => K.spring(code, out, { course: 'spring', title });
  const topics = (id) => JT.springGroups.find((g) => g[0] === id)[2].map(([t, tt]) => ['spring_' + t, tt]);

  K.overview('spring_group_data', 'Data Access and Transactions', 'Spring <span>Data Access and Transactions</span>', [
    p('Spring removes JDBC boilerplate with <code>JdbcTemplate</code> and manages transactions declaratively with <code>@Transactional</code>. Transactions are one of the most common senior interview topics: how they work, propagation, isolation, rollback rules and the pitfalls.'),
  ], topics('data'));
  K.overview('spring_group_mvc', 'Spring MVC', 'Spring <span>MVC</span>', [
    p('Spring MVC handles HTTP requests in servlet-based web applications. Spring Boot’s web support is Spring MVC with automatic setup, so everything here applies to Boot applications too.'),
    note('The MVC examples run with MockMvc, which sends requests through the real <code>DispatcherServlet</code> without starting a web server.'),
  ], topics('mvc'));
  K.overview('spring_group_events_async', 'Events and Async', 'Spring <span>Events and Async</span>', [
    p('Application events decouple the code that does something from the code that reacts to it. <code>@Async</code> runs a method on another thread.'),
  ], topics('events_async'));

  // Shared H2 + transaction configuration used by the transaction examples.
  const txConfig = `@Configuration
@ComponentScan
@EnableTransactionManagement
class AppConfig {
    @Bean
    DataSource dataSource() {
        return new DriverManagerDataSource("jdbc:h2:mem:shop;DB_CLOSE_DELAY=-1");
    }

    @Bean
    JdbcTemplate jdbcTemplate(DataSource dataSource) { return new JdbcTemplate(dataSource); }

    @Bean
    PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}`;
  const txImports = `import javax.sql.DataSource;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.*;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.*;`;

  // ---------------------------------------------------------------- JdbcTemplate
  L('jdbc_template', 'JdbcTemplate', () => [
    h2('What is JdbcTemplate?'),
    p('<code>JdbcTemplate</code> is Spring’s helper for plain JDBC. You write the SQL and map rows; it opens and closes connections, statements and result sets, and converts <code>SQLException</code> into clear Spring exceptions.'),
    h2('Why is it used?'),
    p('Raw JDBC needs <code>try</code>/<code>finally</code> blocks for every resource and gives you one checked <code>SQLException</code> with a vendor error code. <code>JdbcTemplate</code> removes that code and joins Spring transactions automatically.'),
    h2('Example'),
    run(`import java.util.List;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

record Product(int id, String name, int price) { }

public class Main {
    public static void main(String[] args) {
        JdbcTemplate jdbc = new JdbcTemplate(new DriverManagerDataSource("jdbc:h2:mem:shop;DB_CLOSE_DELAY=-1"));
        jdbc.execute("CREATE TABLE product(id INT PRIMARY KEY, name VARCHAR(50), price INT)");

        jdbc.update("INSERT INTO product VALUES (?, ?, ?)", 1, "Keyboard", 40);
        jdbc.update("INSERT INTO product VALUES (?, ?, ?)", 2, "Mouse", 20);

        List<Product> cheap = jdbc.query(
            "SELECT id, name, price FROM product WHERE price < ? ORDER BY id",
            (row, rowNumber) -> new Product(row.getInt("id"), row.getString("name"), row.getInt("price")),
            50);
        cheap.forEach(System.out::println);

        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM product", Integer.class);
        System.out.println("Count: " + count);

        try {
            jdbc.update("INSERT INTO product VALUES (?, ?, ?)", 1, "Duplicate", 10);
        } catch (DuplicateKeyException e) {
            System.out.println("Translated to: " + e.getClass().getSimpleName());
        }
    }
}`, `Product[id=1, name=Keyboard, price=40]
Product[id=2, name=Mouse, price=20]
Count: 2
Translated to: DuplicateKeyException`, 'Insert, query and exception translation'),
    h2('How does it work?'),
    ul(['<code>update</code> runs INSERT/UPDATE/DELETE with <code>?</code> placeholders, so values are bound safely (no SQL injection).',
      '<code>query</code> calls the lambda (<code>RowMapper</code>) once per row to build an object.',
      '<code>queryForObject</code> expects exactly one row and throws <code>EmptyResultDataAccessException</code> if there is none.',
      'The primary-key violation becomes <code>DuplicateKeyException</code>, a subclass of the unchecked <code>DataAccessException</code>, the same for every database.']),
    h2('Important points'),
    ul(['<code>NamedParameterJdbcTemplate</code> supports <code>:name</code> parameters, which are easier to read in long queries.',
      'Use <code>batchUpdate</code> for many inserts; it sends them in one round trip.',
      'In real applications the <code>DataSource</code> is a connection pool such as HikariCP, not <code>DriverManagerDataSource</code>.']),
    K.interview([
      ['What does JdbcTemplate do for you?', 'Acquires and releases connections, creates and closes statements and result sets, binds parameters, joins the current Spring transaction, and translates <code>SQLException</code> into <code>DataAccessException</code>.'],
      ['Why is DataAccessException unchecked?', 'Most database errors cannot be handled by the caller. Unchecked exceptions avoid useless catch blocks and keep the service layer independent of JDBC.'],
      ['When would you choose JdbcTemplate over JPA?', 'For complex or performance-critical SQL, reporting queries, bulk operations, or simple applications where an ORM adds more complexity than it removes.'],
    ]),
  ]);

  // ---------------------------------------------------------------- @Transactional
  L('transactional', 'How @Transactional works', () => [
    h2('What is @Transactional?'),
    p('<code>@Transactional</code> runs a method inside a database transaction. If the method finishes normally, Spring commits. If it throws an unchecked exception, Spring rolls back. All the SQL in between succeeds or fails together.'),
    h2('Example: a money transfer'),
    run(txImports + `
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Service
class BankService {
    private final JdbcTemplate jdbc;
    BankService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @Transactional
    public void transfer(String from, String to, int amount) {
        System.out.println("In transaction: " + TransactionSynchronizationManager.isActualTransactionActive());
        jdbc.update("UPDATE account SET balance = balance - ? WHERE name = ?", amount, from);
        if (amount > 100) throw new IllegalStateException("Limit exceeded");
        jdbc.update("UPDATE account SET balance = balance + ? WHERE name = ?", amount, to);
    }
}

` + txConfig + `

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            JdbcTemplate jdbc = context.getBean(JdbcTemplate.class);
            jdbc.execute("CREATE TABLE account(name VARCHAR(20), balance INT)");
            jdbc.update("INSERT INTO account VALUES ('alice', 100), ('bob', 100)");

            BankService bank = context.getBean(BankService.class);
            bank.transfer("alice", "bob", 50);
            try {
                bank.transfer("alice", "bob", 500);
            } catch (IllegalStateException e) {
                System.out.println("Failed: " + e.getMessage());
            }
            jdbc.query("SELECT name, balance FROM account ORDER BY name",
                row -> { System.out.println(row.getString(1) + " = " + row.getInt(2)); });
        }
    }
}`, `In transaction: true
In transaction: true
Failed: Limit exceeded
alice = 50
bob = 150`, 'Commit on success, rollback on exception'),
    h2('How does it work?'),
    ol(['<code>@EnableTransactionManagement</code> makes Spring wrap <code>BankService</code> in a proxy. (Spring Boot enables this for you.)',
      'The call reaches the proxy’s <code>TransactionInterceptor</code>. It asks the <code>PlatformTransactionManager</code> to start a transaction: it takes a connection, sets auto-commit off, and binds the connection to the current thread.',
      '<code>JdbcTemplate</code> finds the bound connection, so both updates use the same connection and transaction.',
      'The first transfer returns normally, so the interceptor commits.',
      'The second transfer throws after the debit. The interceptor rolls back, so alice’s 500 is not lost: the final balances show only the first transfer.']),
    h2('Important points'),
    ul(['The transaction is bound to the <strong>thread</strong>. Work started in another thread (<code>@Async</code>, <code>CompletableFuture</code>) is not part of it.',
      'Put <code>@Transactional</code> on service methods that represent one business operation, not on controllers or every repository method.',
      'Keep transactions short. Do not call slow remote services inside them; they hold database connections and locks.',
      'For JPA, Spring Boot uses <code>JpaTransactionManager</code>; the idea is the same.']),
    K.interview([
      ['How does @Transactional work internally?', 'A proxy around the bean runs <code>TransactionInterceptor</code>, which uses a <code>PlatformTransactionManager</code> to begin a transaction, binds the connection to the thread with <code>TransactionSynchronizationManager</code>, calls the method, and commits or rolls back based on the outcome.'],
      ['Where should @Transactional go: controller, service or repository?', 'On the service method that defines the unit of work. Spring Data repository methods are already transactional individually, but a service needs one transaction around several calls.'],
      ['Does @Transactional work across threads?', 'No. The transaction context is thread-bound. A new thread runs outside it.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Propagation
  L('propagation', 'Transaction propagation', () => [
    h2('What is propagation?'),
    p('Propagation decides what happens when a transactional method is called while a transaction is already running.'),
    table(['Propagation', 'If a transaction exists', 'If none exists'], [
      ['<code>REQUIRED</code> (default)', 'Join it', 'Start a new one'],
      ['<code>REQUIRES_NEW</code>', 'Suspend it and start a new, independent one', 'Start a new one'],
      ['<code>NESTED</code>', 'Create a savepoint inside it (JDBC only)', 'Start a new one'],
      ['<code>SUPPORTS</code>', 'Join it', 'Run without a transaction'],
      ['<code>MANDATORY</code>', 'Join it', 'Throw an exception'],
      ['<code>NEVER</code> / <code>NOT_SUPPORTED</code>', 'Throw / suspend it', 'Run without a transaction'],
    ]),
    h2('Example: keep an audit record even if the order fails'),
    run(txImports + `
import org.springframework.transaction.annotation.Propagation;

@Service
class AuditService {
    private final JdbcTemplate jdbc;
    AuditService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logInNewTransaction(String message) {
        jdbc.update("INSERT INTO audit_log VALUES (?)", message);
    }

    @Transactional   // REQUIRED: joins the caller's transaction
    public void logInSameTransaction(String message) {
        jdbc.update("INSERT INTO audit_log VALUES (?)", message);
    }
}

@Service
class OrderService {
    private final JdbcTemplate jdbc;
    private final AuditService audit;
    OrderService(JdbcTemplate jdbc, AuditService audit) { this.jdbc = jdbc; this.audit = audit; }

    @Transactional
    public void placeOrder(boolean newAuditTransaction) {
        jdbc.update("INSERT INTO orders VALUES ('book')");
        if (newAuditTransaction) audit.logInNewTransaction("order attempted");
        else audit.logInSameTransaction("order attempted");
        throw new IllegalStateException("Payment declined");
    }
}

` + txConfig + `

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            JdbcTemplate jdbc = context.getBean(JdbcTemplate.class);
            jdbc.execute("CREATE TABLE orders(item VARCHAR(20))");
            jdbc.execute("CREATE TABLE audit_log(message VARCHAR(50))");
            OrderService orders = context.getBean(OrderService.class);

            for (boolean newTransaction : new boolean[] {true, false}) {
                jdbc.update("DELETE FROM audit_log");
                try { orders.placeOrder(newTransaction); } catch (IllegalStateException ignored) { }
                System.out.println((newTransaction ? "REQUIRES_NEW" : "REQUIRED") + ": orders="
                    + jdbc.queryForObject("SELECT COUNT(*) FROM orders", Integer.class)
                    + ", audit_log=" + jdbc.queryForObject("SELECT COUNT(*) FROM audit_log", Integer.class));
            }
        }
    }
}`, `REQUIRES_NEW: orders=0, audit_log=1
REQUIRED: orders=0, audit_log=0`, 'REQUIRED vs REQUIRES_NEW'),
    h2('How does it work?'),
    ul(['With <code>REQUIRES_NEW</code>, the outer transaction is suspended. The audit insert runs in its own transaction on a second connection and commits immediately. When the order fails, only the order insert is rolled back.',
      'With <code>REQUIRED</code>, the audit insert joins the order transaction, so the rollback removes both rows.',
      'The audit service is a separate bean. If the method were in <code>OrderService</code> and called through <code>this</code>, the propagation setting would be ignored (self-invocation).']),
    h2('Important points'),
    ul(['<code>REQUIRES_NEW</code> uses a second database connection while the first is held. Many nested calls under load can exhaust the connection pool and deadlock.',
      'If an inner <code>REQUIRED</code> method throws, it marks the shared transaction rollback-only, even if the caller catches the exception. See “Transaction pitfalls”.']),
    K.interview([
      ['REQUIRED vs REQUIRES_NEW?', '<code>REQUIRED</code> joins an existing transaction, so everything commits or rolls back together. <code>REQUIRES_NEW</code> suspends it and runs an independent transaction that commits or rolls back on its own.'],
      ['When would you use REQUIRES_NEW?', 'For work that must be saved regardless of the outer result: audit logs, failure records, sequence or outbox entries.'],
      ['REQUIRES_NEW vs NESTED?', '<code>NESTED</code> uses a savepoint in the same physical transaction: the inner part can roll back alone, but it commits only if the outer commits. <code>REQUIRES_NEW</code> is a separate transaction that commits independently. NESTED is not supported by JPA.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Isolation
  L('isolation', 'Isolation levels', () => [
    h2('What is isolation?'),
    p('Isolation controls how much one transaction can see of other transactions running at the same time. Stronger isolation prevents more anomalies but allows less concurrency.'),
    table(['Anomaly', 'What happens'], [
      ['Dirty read', 'You read data another transaction has not committed (and may roll back)'],
      ['Non-repeatable read', 'You read a row twice and get different values because another transaction committed a change'],
      ['Phantom read', 'You run the same query twice and get new rows inserted by another transaction'],
      ['Lost update', 'Two transactions read the same value and both write; one update overwrites the other'],
    ]),
    table(['Level', 'Dirty read', 'Non-repeatable read', 'Phantom read'], [
      ['<code>READ_UNCOMMITTED</code>', 'Possible', 'Possible', 'Possible'],
      ['<code>READ_COMMITTED</code>', 'Prevented', 'Possible', 'Possible'],
      ['<code>REPEATABLE_READ</code>', 'Prevented', 'Prevented', 'Possible (database-dependent)'],
      ['<code>SERIALIZABLE</code>', 'Prevented', 'Prevented', 'Prevented'],
    ]),
    p('Defaults differ: PostgreSQL, Oracle and SQL Server use <code>READ COMMITTED</code>; MySQL InnoDB uses <code>REPEATABLE READ</code>. Spring’s <code>Isolation.DEFAULT</code> uses the database default.'),
    h2('Example: non-repeatable read'),
    p('Two JDBC connections play two transactions. Transaction A reads a balance twice; between the reads, transaction B changes it and commits.'),
    run(`import java.sql.*;

public class Main {
    static int read(Connection connection) throws SQLException {
        try (ResultSet rows = connection.createStatement().executeQuery("SELECT balance FROM account")) {
            rows.next();
            return rows.getInt(1);
        }
    }

    static void demo(int level, String name) throws SQLException {
        String url = "jdbc:h2:mem:iso" + level + ";DB_CLOSE_DELAY=-1";
        try (Connection a = DriverManager.getConnection(url); Connection b = DriverManager.getConnection(url)) {
            a.createStatement().execute("CREATE TABLE account(balance INT)");
            a.createStatement().execute("INSERT INTO account VALUES (100)");

            a.setTransactionIsolation(level);
            a.setAutoCommit(false);
            int first = read(a);                                             // transaction A reads
            b.createStatement().executeUpdate("UPDATE account SET balance = 50");   // B commits a change
            int second = read(a);                                            // A reads again
            a.commit();
            System.out.println(name + ": first read " + first + ", second read " + second);
        }
    }

    public static void main(String[] args) throws SQLException {
        demo(Connection.TRANSACTION_READ_COMMITTED, "READ_COMMITTED");
        demo(Connection.TRANSACTION_REPEATABLE_READ, "REPEATABLE_READ");
    }
}`, `READ_COMMITTED: first read 100, second read 50
REPEATABLE_READ: first read 100, second read 100`, 'The same read under two isolation levels'),
    h2('How does it work?'),
    ul(['Connection <code>b</code> is in auto-commit mode, so its update commits at once.',
      'Under <code>READ_COMMITTED</code>, each statement sees the latest committed data, so A’s second read sees 50.',
      'Under <code>REPEATABLE_READ</code>, A keeps seeing the snapshot from its first read, so it sees 100 again.',
      'In Spring you set the level per method: <code>@Transactional(isolation = Isolation.REPEATABLE_READ)</code>.']),
    h2('Important points'),
    ul(['Higher isolation does not automatically prevent lost updates in every database. For “read, change, write” logic, use optimistic locking (<code>@Version</code>), <code>SELECT ... FOR UPDATE</code>, or an atomic update such as <code>UPDATE ... SET stock = stock - 1 WHERE stock &gt; 0</code>.',
      '<code>SERIALIZABLE</code> transactions may fail with serialization errors under load; the application must retry them.']),
    K.interview([
      ['Explain the four isolation levels.', 'READ UNCOMMITTED allows dirty reads; READ COMMITTED prevents them; REPEATABLE READ also guarantees the same row reads the same within the transaction; SERIALIZABLE makes concurrent transactions behave as if run one after another.'],
      ['How do you prevent two users from buying the last item at the same time?', 'An atomic conditional update (<code>UPDATE ... WHERE stock &gt; 0</code> and check the row count), optimistic locking with <code>@Version</code> and retry, or a pessimistic lock with <code>SELECT ... FOR UPDATE</code>.'],
      ['What is the default isolation in PostgreSQL and MySQL?', 'PostgreSQL: READ COMMITTED. MySQL InnoDB: REPEATABLE READ.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Rollback rules
  L('rollback_rules', 'Rollback rules', () => [
    h2('What are rollback rules?'),
    p('By default, Spring rolls back a transaction only for <strong>unchecked</strong> exceptions (<code>RuntimeException</code> and <code>Error</code>). A <strong>checked</strong> exception, such as <code>IOException</code> or your own <code>InsufficientFundsException extends Exception</code>, causes a <strong>commit</strong>.'),
    h2('Example'),
    run(txImports + `

class PaymentException extends Exception {   // checked exception
    PaymentException(String message) { super(message); }
}

@Service
class OrderService {
    private final JdbcTemplate jdbc;
    OrderService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @Transactional
    public void placeWithDefaultRules() throws PaymentException {
        jdbc.update("INSERT INTO orders VALUES ('default')");
        throw new PaymentException("Card declined");
    }

    @Transactional(rollbackFor = Exception.class)
    public void placeWithRollbackFor() throws PaymentException {
        jdbc.update("INSERT INTO orders VALUES ('rollbackFor')");
        throw new PaymentException("Card declined");
    }
}

` + txConfig + `

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            JdbcTemplate jdbc = context.getBean(JdbcTemplate.class);
            jdbc.execute("CREATE TABLE orders(rule VARCHAR(20))");
            OrderService orders = context.getBean(OrderService.class);

            try { orders.placeWithDefaultRules(); } catch (PaymentException ignored) { }
            try { orders.placeWithRollbackFor(); } catch (PaymentException ignored) { }

            System.out.println("Saved orders: " + jdbc.queryForList("SELECT rule FROM orders", String.class));
        }
    }
}`, 'Saved orders: [default]', 'A checked exception commits by default'),
    h2('How does it work?'),
    ul(['Both methods insert a row and then throw the same checked exception.',
      'With default rules, Spring treats a checked exception as an expected business outcome and commits, so the <code>default</code> row is saved even though the method failed.',
      'With <code>rollbackFor = Exception.class</code>, the same exception triggers a rollback, so the <code>rollbackFor</code> row is gone.']),
    h2('Important points'),
    ul(['This default comes from EJB conventions and surprises many developers. Many teams use unchecked exceptions for business errors, or set <code>rollbackFor</code> explicitly.',
      '<code>noRollbackFor</code> does the opposite: commit even for a specific runtime exception.',
      'An exception that you catch inside the method does not cause a rollback at all, because the proxy never sees it.']),
    K.interview([
      ['Does @Transactional roll back on checked exceptions?', 'No, not by default. Only <code>RuntimeException</code> and <code>Error</code> cause rollback. Use <code>rollbackFor</code> for checked exceptions.'],
      ['I catch an exception inside a @Transactional method and log it. Is the transaction rolled back?', 'No. The interceptor only sees exceptions that leave the method. To roll back without throwing, call <code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()</code>, or rethrow.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Pitfalls
  L('transaction_pitfalls', 'Transaction pitfalls', () => [
    h2('Common reasons @Transactional “does not work”'),
    table(['Pitfall', 'Why', 'Fix'], [
      ['Self-invocation', 'The call through <code>this</code> skips the proxy', 'Call through another bean'],
      ['<code>private</code> or <code>final</code> method', 'The proxy cannot intercept it', 'Make it public and non-final'],
      ['Object created with <code>new</code>', 'It is not a Spring bean, so there is no proxy', 'Inject the bean'],
      ['Checked exception', 'Default rules commit', '<code>rollbackFor</code> or unchecked exceptions'],
      ['Exception caught inside the method', 'The proxy never sees it', 'Rethrow or mark rollback-only'],
      ['Work on another thread', 'The transaction is thread-bound', 'Start a transaction in that thread'],
      ['Inner REQUIRED method failed, caller caught it', 'The shared transaction is rollback-only', 'See the example below'],
    ]),
    h2('Example: UnexpectedRollbackException'),
    p('This is a classic production surprise. An inner transactional method fails, the outer method catches the exception and wants to continue, but the commit fails anyway.'),
    run(txImports + `
import org.springframework.transaction.UnexpectedRollbackException;

@Service
class InventoryService {
    @Transactional   // REQUIRED: joins the caller's transaction
    public void reserve(String item) {
        throw new IllegalStateException("Inventory unavailable");
    }
}

@Service
class OrderService {
    private final JdbcTemplate jdbc;
    private final InventoryService inventory;
    OrderService(JdbcTemplate jdbc, InventoryService inventory) { this.jdbc = jdbc; this.inventory = inventory; }

    @Transactional
    public void placeOrder() {
        jdbc.update("INSERT INTO orders VALUES ('book')");
        try {
            inventory.reserve("book");
        } catch (IllegalStateException e) {
            System.out.println("Outer caught: " + e.getMessage() + " - continuing");
        }
    }
}

` + txConfig + `

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            JdbcTemplate jdbc = context.getBean(JdbcTemplate.class);
            jdbc.execute("CREATE TABLE orders(item VARCHAR(20))");
            try {
                context.getBean(OrderService.class).placeOrder();
            } catch (UnexpectedRollbackException e) {
                System.out.println("Commit failed: " + e.getClass().getSimpleName());
            }
            System.out.println("Orders saved: " + jdbc.queryForObject("SELECT COUNT(*) FROM orders", Integer.class));
        }
    }
}`, `Outer caught: Inventory unavailable - continuing
Commit failed: UnexpectedRollbackException
Orders saved: 0`, 'Catching an exception from an inner transactional method'),
    h2('How does it work?'),
    ol(['<code>reserve</code> joins the outer transaction (REQUIRED). When it throws, its proxy marks the <em>shared</em> transaction as rollback-only.',
      'The outer method catches the exception and returns normally, so its proxy tries to commit.',
      'The transaction is rollback-only, so Spring rolls back and throws <code>UnexpectedRollbackException</code> to tell the caller the work was not saved.']),
    p('Fixes: let the exception propagate; or make the inner method not transactional; or use <code>REQUIRES_NEW</code> (or <code>NESTED</code> with JDBC) if the inner work really is independent.'),
    h2('Other practical points'),
    ul(['<code>@Transactional(readOnly = true)</code> on queries lets Hibernate skip dirty checking and lets some drivers route to read replicas.',
      'Turn on <code>logging.level.org.springframework.transaction=DEBUG</code> (or <code>org.springframework.orm.jpa</code>) to see when transactions begin, join, commit and roll back.',
      'Avoid remote HTTP calls inside a transaction; publish an event after commit instead.']),
    K.interview([
      ['What is UnexpectedRollbackException?', 'It is thrown when a transaction was marked rollback-only (usually by an inner REQUIRED method that threw) but the outer code tried to commit. Spring rolls back and reports it.'],
      ['List reasons @Transactional might be ignored.', 'Self-invocation, non-public or final methods, the bean not being Spring-managed, transaction management not enabled, the wrong transaction manager, or the work happening on a different thread.'],
      ['What does readOnly = true do?', 'It is a hint: Hibernate sets flush mode to manual and skips dirty checking, and the JDBC connection may be marked read-only. It does not by itself stop writes in every database.'],
    ]),
  ]);

  // ---------------------------------------------------------------- MVC
  const mvcImports = `import org.springframework.context.annotation.*;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.config.annotation.*;`;
  const mvcContext = `        try (var context = new AnnotationConfigWebApplicationContext()) {
            context.setServletContext(new MockServletContext());
            context.register(WebConfig.class);
            context.refresh();`;

  L('dispatcher_servlet', 'DispatcherServlet request flow', () => [
    h2('What is the DispatcherServlet?'),
    p('<code>DispatcherServlet</code> is Spring MVC’s front controller: one servlet that receives every request and sends it to the right controller method. It then turns the method’s return value into the HTTP response.'),
    h2('The request flow'),
    ol(['Servlet <strong>filters</strong> run first (for example Spring Security).',
      '<code>DispatcherServlet</code> asks the <strong>HandlerMapping</strong> which controller method matches the URL and HTTP method.',
      '<strong>Interceptors</strong> run their <code>preHandle</code> method.',
      'A <strong>HandlerAdapter</strong> calls the controller method. Argument resolvers fill parameters such as <code>@PathVariable</code> and <code>@RequestBody</code>.',
      'The return value is written by an <strong>HttpMessageConverter</strong> (for example to JSON), or a <strong>ViewResolver</strong> renders a template.',
      'Interceptors run <code>postHandle</code> and <code>afterCompletion</code>. If an exception was thrown, <strong>HandlerExceptionResolvers</strong> (including <code>@ExceptionHandler</code>) build the error response.']),
    h2('Example'),
    run(mvcImports + `
import jakarta.servlet.http.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.mock.web.MockHttpServletResponse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RestController
class GreetingController {
    @GetMapping("/greet/{name}")
    String greet(@PathVariable String name) {
        System.out.println("4. controller method runs");
        return "Hello, " + name;
    }
}

class TraceInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        HandlerMethod method = (HandlerMethod) handler;
        System.out.println("2. HandlerMapping chose " + method.getBeanType().getSimpleName() + "." + method.getMethod().getName());
        System.out.println("3. interceptor preHandle");
        return true;   // false would stop the request here
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("5. interceptor afterCompletion");
    }
}

@Configuration
@EnableWebMvc
@ComponentScan
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new TraceInterceptor());
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
` + mvcContext + `
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).build();
            System.out.println("1. GET /greet/Ada reaches DispatcherServlet");
            MockHttpServletResponse response = mvc.perform(get("/greet/Ada")).andReturn().getResponse();
            System.out.println("6. response: " + response.getStatus() + " " + response.getContentAsString());
        }
    }
}`, `1. GET /greet/Ada reaches DispatcherServlet
2. HandlerMapping chose GreetingController.greet
3. interceptor preHandle
4. controller method runs
5. interceptor afterCompletion
6. response: 200 Hello, Ada`, 'Tracing one request'),
    h2('How does it work?'),
    ul(['<code>@EnableWebMvc</code> registers the MVC infrastructure: handler mappings, adapters, converters and resolvers. Spring Boot configures the same things automatically (do not add <code>@EnableWebMvc</code> in Boot; it turns off Boot’s MVC auto-configuration).',
      'The <code>handler</code> passed to the interceptor is a <code>HandlerMethod</code>: the controller method chosen by <code>RequestMappingHandlerMapping</code>.',
      'The <code>String</code> return value of a <code>@RestController</code> is written to the body by <code>StringHttpMessageConverter</code>.']),
    K.interview([
      ['Explain the Spring MVC request lifecycle.', 'Filters → DispatcherServlet → HandlerMapping finds the handler → interceptors preHandle → HandlerAdapter resolves arguments and invokes the controller → return value handled by a message converter or view resolver → postHandle/afterCompletion; exceptions go to HandlerExceptionResolvers.'],
      ['What is the role of HandlerAdapter?', 'It knows how to invoke a particular kind of handler. <code>RequestMappingHandlerAdapter</code> resolves method arguments, calls the annotated method and processes its return value.'],
      ['What do you get as 404 vs 405 vs 415?', '404: no handler matches the path. 405: the path matches but not the HTTP method. 415: the request <code>Content-Type</code> is not accepted by the method (no suitable converter).'],
    ]),
  ]);

  L('rest_controller', '@Controller vs @RestController', () => [
    h2('What is the difference?'),
    p('<code>@RestController</code> is <code>@Controller</code> plus <code>@ResponseBody</code> on every method. The return value is written directly to the response body, usually as JSON. A plain <code>@Controller</code> method returns a view name that a template engine renders as HTML.'),
    table(['', '@Controller', '@RestController'], [
      ['Return value means', 'A view name (e.g. <code>"orders"</code> → <code>orders.html</code>)', 'The response body'],
      ['Typical use', 'Server-side HTML pages (Thymeleaf)', 'REST/JSON APIs'],
      ['Body for one method', 'Add <code>@ResponseBody</code>', 'Default'],
    ]),
    h2('Example: a small REST API'),
    run(mvcImports + `
import java.net.URI;
import org.springframework.http.*;
import org.springframework.mock.web.MockHttpServletResponse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

record Product(int id, String name) { }
record NewProduct(String name) { }

@RestController
@RequestMapping("/api/products")
class ProductController {
    @GetMapping("/{id}")
    Product get(@PathVariable int id) {
        return new Product(id, "Keyboard");
    }

    @PostMapping
    ResponseEntity<Product> create(@RequestBody NewProduct request) {
        Product saved = new Product(2, request.name());
        return ResponseEntity.created(URI.create("/api/products/" + saved.id())).body(saved);
    }
}

@Configuration
@EnableWebMvc
@ComponentScan
class WebConfig { }

public class Main {
    public static void main(String[] args) throws Exception {
` + mvcContext + `
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).build();

            MockHttpServletResponse get = mvc.perform(get("/api/products/1")).andReturn().getResponse();
            System.out.println("GET  -> " + get.getStatus() + " " + get.getContentAsString());

            MockHttpServletResponse post = mvc.perform(post("/api/products")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\\"name\\":\\"Mouse\\"}"))
                .andReturn().getResponse();
            System.out.println("POST -> " + post.getStatus() + " " + post.getContentAsString()
                + " Location: " + post.getHeader("Location"));
        }
    }
}`, `GET  -> 200 {"id":1,"name":"Keyboard"}
POST -> 201 {"id":2,"name":"Mouse"} Location: /api/products/2`, 'GET and POST with JSON'),
    h2('How does it work?'),
    ul(['<code>@PathVariable</code> takes <code>1</code> from the URL and converts it to an <code>int</code>.',
      'The returned record is converted to JSON by the Jackson message converter, which Spring registers when Jackson is on the classpath.',
      '<code>@RequestBody</code> reads the JSON request body into a <code>NewProduct</code> record.',
      '<code>ResponseEntity</code> lets you choose the status (201 Created) and headers (<code>Location</code>) as well as the body.']),
    h2('Important points'),
    ul(['Use the right status codes: 200 OK, 201 Created (with <code>Location</code>), 204 No Content, 400 Bad Request, 404 Not Found, 409 Conflict.',
      'Return DTOs (records like these), not JPA entities.',
      'The client’s <code>Accept</code> header and the method’s <code>produces</code> setting decide the response format (content negotiation).']),
    K.interview([
      ['@Controller vs @RestController?', '<code>@RestController</code> = <code>@Controller</code> + <code>@ResponseBody</code>: return values are serialized into the body. With <code>@Controller</code> they are view names.'],
      ['How is a Java object turned into JSON?', 'An <code>HttpMessageConverter</code> chosen by the return type and the requested media type; for JSON, the Jackson converter.'],
      ['@RequestParam vs @PathVariable?', '<code>@PathVariable</code> reads a part of the URL path (<code>/products/{id}</code>), usually to identify a resource. <code>@RequestParam</code> reads a query parameter (<code>?page=2</code>), usually for filtering or options.'],
    ]),
  ]);

  L('exception_handling', 'Exception handling with @RestControllerAdvice', () => [
    h2('What is it?'),
    p('<code>@ExceptionHandler</code> methods turn an exception into an HTTP response. Put them in a <code>@RestControllerAdvice</code> class and they apply to all controllers, so every endpoint returns errors in the same format.'),
    h2('Why is it used?'),
    p('Without it, an unhandled exception becomes a generic 500 error. With it, a “not found” exception becomes a clean 404 with a useful message, and controllers stay free of try/catch blocks.'),
    h2('Example'),
    run(mvcImports + `
import org.springframework.http.*;
import org.springframework.mock.web.MockHttpServletResponse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

class ProductNotFoundException extends RuntimeException {
    ProductNotFoundException(int id) { super("Product " + id + " not found"); }
}

@RestController
class ProductController {
    @GetMapping("/api/products/{id}")
    String get(@PathVariable int id) {
        if (id != 1) throw new ProductNotFoundException(id);
        return "Keyboard";
    }
}

@RestControllerAdvice
class ApiErrors {
    @ExceptionHandler(ProductNotFoundException.class)
    ProblemDetail notFound(ProductNotFoundException e) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problem.setTitle("Product not found");
        return problem;
    }
}

@Configuration
@EnableWebMvc
@ComponentScan
class WebConfig { }

public class Main {
    public static void main(String[] args) throws Exception {
` + mvcContext + `
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).build();
            for (String path : new String[] {"/api/products/1", "/api/products/99"}) {
                MockHttpServletResponse response = mvc.perform(get(path)).andReturn().getResponse();
                System.out.println(response.getStatus() + " " + response.getContentType());
                System.out.println(response.getContentAsString());
            }
        }
    }
}`, `200 text/plain;charset=ISO-8859-1
Keyboard
404 application/problem+json
{"title":"Product not found","status":404,"detail":"Product 99 not found","instance":"/api/products/99"}`, 'Turning an exception into a 404'),
    h2('How does it work?'),
    ul(['The controller throws <code>ProductNotFoundException</code> and does not handle it.',
      '<code>ExceptionHandlerExceptionResolver</code> finds the matching <code>@ExceptionHandler</code> in the advice class.',
      'The handler returns a <code>ProblemDetail</code>, the standard error format from RFC 9457, sent as <code>application/problem+json</code>. Spring fills in <code>instance</code> with the request path and leaves out <code>type</code> when it is the default <code>about:blank</code>.']),
    h2('Important points'),
    ul(['Spring picks the handler for the most specific exception type.',
      'Add a fallback handler for <code>Exception</code> that logs the error and returns a generic 500 message. Never return stack traces to clients.',
      'Extend <code>ResponseEntityExceptionHandler</code> to get <code>ProblemDetail</code> responses for Spring’s own exceptions (validation errors, unsupported media type and so on). Spring Boot can do this with <code>spring.mvc.problemdetails.enabled=true</code>.']),
    K.interview([
      ['How do you implement global exception handling in Spring?', 'A <code>@RestControllerAdvice</code> class with <code>@ExceptionHandler</code> methods per exception type, returning a consistent error body such as <code>ProblemDetail</code>, plus a fallback for unexpected exceptions.'],
      ['@ControllerAdvice vs @RestControllerAdvice?', '<code>@RestControllerAdvice</code> adds <code>@ResponseBody</code>, so handler return values are written to the body. With <code>@ControllerAdvice</code>, they are view names unless annotated.'],
      ['What is ProblemDetail?', 'Spring’s class for RFC 9457 “Problem Details for HTTP APIs”: a standard JSON error with <code>type</code>, <code>title</code>, <code>status</code>, <code>detail</code> and <code>instance</code>, extensible with custom properties.'],
    ]),
  ]);

  L('filters_interceptors', 'Filters vs interceptors', () => [
    h2('What are they?'),
    p('Both run code before and after a request is handled. A <strong>filter</strong> belongs to the Servlet API and runs around the whole <code>DispatcherServlet</code>. A Spring MVC <strong>interceptor</strong> runs inside the <code>DispatcherServlet</code>, around the chosen controller method.'),
    table(['', 'Filter', 'HandlerInterceptor'], [
      ['Part of', 'Servlet container', 'Spring MVC'],
      ['Runs', 'Before/after the DispatcherServlet, for every request (also static files, errors)', 'Before/after the controller method'],
      ['Knows the controller method', 'No', 'Yes (<code>HandlerMethod</code>)'],
      ['Can change the request/response objects', 'Yes (wrap them)', 'No'],
      ['Typical use', 'Security, CORS, compression, request logging, correlation IDs', 'Checks or data that depend on the handler, e.g. locale, custom annotations'],
    ]),
    h2('Example: order of execution'),
    run(mvcImports + `
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.web.servlet.HandlerInterceptor;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RestController
class PingController {
    @GetMapping("/ping")
    String ping() {
        System.out.println("    controller");
        return "pong";
    }
}

class TimingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws java.io.IOException, ServletException {
        System.out.println("filter: before");
        chain.doFilter(request, response);   // continue to the DispatcherServlet
        System.out.println("filter: after");
    }
}

class AuditInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("  interceptor: preHandle");
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("  interceptor: afterCompletion");
    }
}

@Configuration
@EnableWebMvc
@ComponentScan
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuditInterceptor()).addPathPatterns("/**");
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
` + mvcContext + `
            MockMvc mvc = MockMvcBuilders.webAppContextSetup(context).addFilters(new TimingFilter()).build();
            mvc.perform(get("/ping"));
        }
    }
}`, `filter: before
  interceptor: preHandle
    controller
  interceptor: afterCompletion
filter: after`, 'Filter around interceptor around controller'),
    h2('Important points'),
    ul(['Spring Security is a filter chain, so it runs before any interceptor or controller.',
      'In Spring Boot, a <code>Filter</code> bean is registered automatically for all URLs. Use <code>FilterRegistrationBean</code> to set URL patterns and order.',
      'Extend <code>OncePerRequestFilter</code> so a filter runs only once per request, even after internal forwards.']),
    K.interview([
      ['Filter vs interceptor: when would you use each?', 'A filter for concerns that apply to every HTTP request and may need to wrap the request or response (security, CORS, logging, compression). An interceptor when you need the selected handler, for example to read an annotation on the controller method.'],
      ['Which runs first?', 'Filters, because they run before the request reaches the DispatcherServlet. Interceptors run inside it, around the controller.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Events & async
  L('events', 'Application events', () => [
    h2('What are application events?'),
    p('An application event is a message inside your application: one bean publishes “an order was placed” and other beans listen and react. The publisher does not know who the listeners are.'),
    h2('Why is it used?'),
    p('It keeps services loosely coupled. <code>OrderService</code> does not need to depend on the email, analytics and loyalty services; it publishes one event, and each feature adds a listener.'),
    h2('Example'),
    run(txImports + `
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.transaction.event.TransactionalEventListener;

record OrderPlaced(int orderId) { }

@Service
class OrderService {
    private final ApplicationEventPublisher events;
    OrderService(ApplicationEventPublisher events) { this.events = events; }

    @Transactional
    public void place(int orderId, boolean fail) {
        System.out.println("Placing order " + orderId);
        events.publishEvent(new OrderPlaced(orderId));
        if (fail) throw new IllegalStateException("Payment declined");
    }
}

@Component
class OrderListeners {
    @EventListener
    void updateStatistics(OrderPlaced event) {
        System.out.println("  @EventListener: order " + event.orderId() + " (runs immediately)");
    }

    @TransactionalEventListener   // phase = AFTER_COMMIT
    void sendConfirmation(OrderPlaced event) {
        System.out.println("  @TransactionalEventListener: email for order " + event.orderId() + " (after commit)");
    }
}

` + txConfig + `

public class Main {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            OrderService orders = context.getBean(OrderService.class);
            orders.place(1, false);
            try {
                orders.place(2, true);
            } catch (IllegalStateException e) {
                System.out.println("Order 2 rolled back: " + e.getMessage());
            }
        }
    }
}`, `Placing order 1
  @EventListener: order 1 (runs immediately)
  @TransactionalEventListener: email for order 1 (after commit)
Placing order 2
  @EventListener: order 2 (runs immediately)
Order 2 rolled back: Payment declined`, 'Listeners before and after commit'),
    h2('How does it work?'),
    ul(['<code>publishEvent</code> calls every <code>@EventListener</code> for that event type <strong>synchronously</strong>, on the same thread and inside the same transaction.',
      '<code>@TransactionalEventListener</code> waits until the transaction commits. Order 2 rolled back, so no confirmation email is sent for it.',
      'This is the right place for side effects that must not happen if the data was not saved: emails, messages to other systems, cache updates.']),
    h2('Important points'),
    ul(['An exception in a normal <code>@EventListener</code> propagates to the publisher and can roll back its transaction.',
      'Add <code>@Async</code> to a listener to run it on another thread.',
      'Events are in memory. If the application stops after commit but before the listener finishes, the event is lost. For guaranteed delivery to other systems, use the transactional outbox pattern.']),
    K.interview([
      ['Are Spring events synchronous or asynchronous?', 'Synchronous by default: listeners run on the publisher’s thread before <code>publishEvent</code> returns. Use <code>@Async</code> on the listener, or a multicaster with an executor, for asynchronous handling.'],
      ['@EventListener vs @TransactionalEventListener?', '<code>@EventListener</code> runs immediately, inside the transaction. <code>@TransactionalEventListener</code> runs at a transaction phase, by default after a successful commit.'],
      ['What is the transactional outbox pattern?', 'Save the event in an outbox table in the same transaction as the business data; a separate process reads the table and publishes to the message broker. This guarantees the event is sent if and only if the data was committed.'],
    ]),
  ]);

  L('async', '@Async', () => [
    h2('What is @Async?'),
    p('<code>@Async</code> makes a method run on another thread. The caller continues immediately. The method can return <code>void</code> or a <code>CompletableFuture</code> with the result.'),
    h2('Example'),
    run(`import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import org.springframework.context.annotation.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

@Service
class EmailService {
    @Async
    public CompletableFuture<String> send(String to) {
        System.out.println("Sending email on: " + Thread.currentThread().getName());
        return CompletableFuture.completedFuture("sent to " + to);
    }
}

@Configuration
@ComponentScan
@EnableAsync
class AppConfig {
    @Bean
    Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("mail-");
        return executor;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            System.out.println("Caller runs on a mail- thread: " + Thread.currentThread().getName().startsWith("mail-"));
            CompletableFuture<String> result = context.getBean(EmailService.class).send("ada@example.com");
            System.out.println("Result: " + result.get());
        }
    }
}`, `Caller runs on a mail- thread: false
Sending email on: mail-1
Result: sent to ada@example.com`, 'Running a method on a thread pool'),
    h2('How does it work?'),
    ul(['<code>@EnableAsync</code> wraps beans with <code>@Async</code> methods in a proxy. The proxy submits the call to an executor and returns at once.',
      'Spring uses the bean named <code>taskExecutor</code>. The thread name prefix makes it easy to find in logs and thread dumps.',
      '<code>result.get()</code> waits for the other thread to finish.']),
    h2('Important points'),
    ul(['Self-invocation: calling an <code>@Async</code> method through <code>this</code> runs it synchronously.',
      'Always configure a bounded thread pool. Spring Boot provides one (<code>spring.task.execution.pool.*</code>); in plain Spring without an executor bean, a new thread may be created for every call.',
      'Exceptions from <code>void</code> async methods are not seen by the caller. Handle them in an <code>AsyncUncaughtExceptionHandler</code>, or return a <code>CompletableFuture</code>.',
      'The async method does not run in the caller’s transaction, and thread-local data (security context, MDC logging values) is not copied unless you configure a <code>TaskDecorator</code>.']),
    K.interview([
      ['How does @Async work?', 'A proxy intercepts the call and submits it to a <code>TaskExecutor</code>. The proxy returns immediately: <code>null</code> for void methods or a future for <code>CompletableFuture</code> methods.'],
      ['Why is my @Async method running synchronously?', 'Usually self-invocation, async not enabled, or the method being private/final, so the proxy is bypassed.'],
      ['What happens to exceptions in @Async methods?', 'For <code>CompletableFuture</code> methods they complete the future exceptionally. For <code>void</code> methods they go to the <code>AsyncUncaughtExceptionHandler</code>, which only logs by default.'],
    ]),
  ]);
})();
