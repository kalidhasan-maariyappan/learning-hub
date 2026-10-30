// Focused lessons for common object design patterns and JDBC workflows.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, note, code } = JT.h;
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_patterns_jdbc_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('singleton_pitfalls', 'Singleton and its concurrency pitfalls',
    'A Singleton design aims to provide one shared instance of a class. A Java enum with one constant is a simple thread-safe option for many singleton use cases.',
    'A single shared instance can be useful for stateless services or application-wide configuration, but global mutable state makes code harder to test and reason about.',
    'The JVM initializes enum constants safely. Other singleton implementations must handle safe publication, serialization and reflection concerns as appropriate.',
    `enum Settings { INSTANCE }

public class Main {
    public static void main(String[] args) {
        Settings first = Settings.INSTANCE;
        Settings second = Settings.INSTANCE;
        System.out.println(first == second);
    }
}`, 'true',
    ['Prefer dependency injection when object ownership should be explicit.', 'A singleton does not make mutable methods thread-safe.', 'Enum singletons are concise and serialization-safe.'],
    'Do not assume one instance automatically makes its mutable fields safe for concurrent access.');

  add('factory_patterns', 'Factory Method and Abstract Factory',
    'Factory Method lets a creator choose which product implementation to construct. Abstract Factory creates a family of related products through a shared interface.',
    'Factories reduce direct coupling to concrete classes when a choice depends on configuration, environment or product family.',
    'Client code asks a factory for an interface and uses that interface. The factory selects or constructs the concrete implementation.',
    `interface Notifier { String send(); }
class EmailNotifier implements Notifier { public String send() { return "email"; } }

public class Main {
    static Notifier createNotifier(String kind) {
        return kind.equals("email") ? new EmailNotifier() : () -> "console";
    }
    public static void main(String[] args) {
        System.out.println(createNotifier("email").send());
    }
}`, 'email',
    ['Factory Method selects a product implementation.', 'Abstract Factory creates related products as a family.', 'Keep factories simple; a conditional may be enough for a small choice.'],
    'Do not create several factory layers when they add no separation or changeability.');

  add('builder_prototype', 'Builder and Prototype',
    'Builder constructs an object step by step, often when there are many optional settings. Prototype creates a new object by copying a configured example.',
    'Builder improves readability for objects with many parameters. Prototype can help when configured templates are cheaper to copy than rebuild.',
    'A builder holds configuration until build creates the final object. A prototype needs an explicit copy policy, especially for nested mutable state.',
    `class Report {
    final String title;
    final boolean includeTotals;
    private Report(Builder b) { title = b.title; includeTotals = b.includeTotals; }
    static class Builder {
        String title;
        boolean includeTotals;
        Builder title(String value) { title = value; return this; }
        Builder includeTotals(boolean value) { includeTotals = value; return this; }
        Report build() { return new Report(this); }
    }
}

public class Main {
    public static void main(String[] args) {
        Report report = new Report.Builder().title("Quarterly").includeTotals(true).build();
        System.out.println(report.title + ": " + report.includeTotals);
    }
}`, 'Quarterly: true',
    ['Builder is useful for many optional parameters and validation.', 'Prototype requires a clear shallow/deep copy policy.', 'Do not expose partially built mutable state.'],
    'Do not use a builder for every small immutable value with only one or two required fields.');

  add('adapter_decorator_facade', 'Adapter, Decorator and Facade',
    'Adapter changes one interface into another the client expects. Decorator wraps an object to add behavior while keeping its interface. Facade provides a simpler entry point to a larger subsystem.',
    'These patterns help integrate incompatible APIs, add optional behavior and reduce the number of subsystem details a caller must understand.',
    'Adapter translates calls. Decorator forwards calls while adding work before or after them. Facade delegates a higher-level operation to multiple subsystem objects.',
    `interface Message { String text(); }
class PlainMessage implements Message { public String text() { return "hello"; } }
class UppercaseDecorator implements Message {
    private final Message inner;
    UppercaseDecorator(Message inner) { this.inner = inner; }
    public String text() { return inner.text().toUpperCase(); }
}

public class Main {
    public static void main(String[] args) {
        Message message = new UppercaseDecorator(new PlainMessage());
        System.out.println(message.text());
    }
}`, 'HELLO',
    ['Decorator preserves the wrapped interface.', 'Adapter changes an interface; decorator adds behavior.', 'Facade simplifies a subsystem for its callers.'],
    'Do not call every wrapper a decorator; it must add behavior while preserving the component contract.');

  add('proxy_strategy', 'Proxy and Strategy',
    'Proxy provides a stand-in for another object and controls access to it. Strategy packages an interchangeable algorithm behind a common interface.',
    'Proxy can add access control, lazy loading or remote boundaries. Strategy lets callers change behavior without a large conditional.',
    'A proxy forwards requests after applying its policy. A strategy object implements one algorithm and is selected or injected by the caller.',
    `import java.util.function.IntUnaryOperator;

public class Main {
    static int calculate(int value, IntUnaryOperator strategy) {
        return strategy.applyAsInt(value);
    }
    public static void main(String[] args) {
        int squared = calculate(5, n -> n * n);
        System.out.println(squared);
    }
}`, '25',
    ['Strategy changes how a task is performed.', 'Proxy controls access to another object.', 'Small lambdas can implement simple strategies.'],
    'Do not add a proxy or strategy hierarchy when one direct method is clearer.');

  add('observer_command_template', 'Observer, Command and Template Method',
    'Observer notifies subscribers when a subject changes. Command represents a request as an object. Template Method defines an algorithm outline and lets subclasses fill selected steps.',
    'These patterns help separate event producers from listeners, queue or log actions, and reuse a fixed workflow with varying steps.',
    'Observer calls registered listeners. Command exposes an operation such as execute. Template Method calls overridable hooks in a defined order.',
    `import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        List<Consumer<String>> listeners = new ArrayList<>();
        listeners.add(message -> System.out.println("Received: " + message));
        listeners.forEach(listener -> listener.accept("ready"));
    }
}`, 'Received: ready',
    ['Observer models one-to-many notification.', 'Command can support queuing, undo or logging actions.', 'Template Method fixes the high-level order of steps.'],
    'Do not let observer callbacks create hidden, uncontrolled dependency cycles.');

  add('chain_responsibility', 'Chain of Responsibility',
    'Chain of Responsibility passes a request through a sequence of handlers. Each handler can process the request or pass it to the next handler.',
    'It separates a caller from the exact handler and lets validation, authorization or processing steps be assembled in order.',
    'Each handler receives the request and either stops the chain or delegates. The order and termination behavior should be explicit.',
    `import java.util.function.Predicate;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Predicate<String>> checks = List.of(
            value -> !value.isBlank(),
            value -> value.length() >= 4);
        String input = "Java";
        boolean accepted = checks.stream().allMatch(check -> check.test(input));
        System.out.println(accepted);
    }
}`, 'true',
    ['A handler may process, reject or delegate.', 'Keep handler order visible and testable.', 'Avoid chains with no clear termination condition.'],
    'Do not use a chain when every condition must always run and a simple validation list is clearer.');

  add('jdbc_architecture', 'JDBC architecture and driver loading',
    'JDBC is Java’s standard API for connecting to relational databases. A JDBC driver translates standard JDBC calls into the database protocol.',
    'JDBC lets application code use common interfaces while database-specific drivers handle vendor communication.',
    'The application calls DriverManager or a DataSource, obtains a Connection, creates a statement, sends SQL through the driver and reads results. JDBC 4 drivers are commonly discovered through service-provider metadata; explicit Class.forName is usually not needed with modern drivers.',
    null, null,
    ['A JDBC URL identifies a driver and database endpoint.', 'DataSource is commonly preferred in managed applications.', 'A real connection requires a matching driver and reachable database.'],
    'Do not add a driver dependency or assume a database exists in this local lesson runner.',
    h2('Connection example (requires an installed driver and database)') + code(`try (Connection connection = DriverManager.getConnection(url, user, password)) {
    // Use the connection here.
}`));

  add('jdbc_lifecycle', 'Connection, Statement and ResultSet lifecycle',
    'A Connection represents a database session. A Statement executes SQL, and a ResultSet exposes rows returned by a query.',
    'Managing each resource lifecycle correctly avoids leaked database connections and cursors.',
    'Acquire the connection, create a statement, execute the query, read each row, then close resources in reverse order. try-with-resources closes AutoCloseable JDBC resources.',
    null, null,
    ['Connection and Statement are resources and should be closed.', 'ResultSet is usually closed when its owning statement closes.', 'Connection pools may return a connection to the pool on close.'],
    'Do not leave ResultSet or Connection open after an exception.',
    h2('Resource pattern (requires a JDBC driver and database)') + code(`try (Connection connection = dataSource.getConnection();
     PreparedStatement statement = connection.prepareStatement("SELECT id FROM orders");
     ResultSet result = statement.executeQuery()) {
    while (result.next()) System.out.println(result.getLong("id"));
}`));

  add('prepared_statement', 'PreparedStatement and parameter binding',
    'PreparedStatement represents parameterized SQL. Parameter values are bound separately from the SQL command text.',
    'Separating values from SQL syntax helps prevent SQL injection and handles quoting and type conversion correctly.',
    'Write placeholders with question marks, set each parameter using the matching setter, then execute. A real database driver is needed to run the query.',
    null, null,
    ['Bind values; do not concatenate user input into SQL.', 'Placeholders represent values, not table or column names.', 'Use an allowlist for dynamic identifiers that cannot be bound.'],
    'Do not put quotes around the ? placeholder or concatenate the value into the query.',
    h2('Parameterized query (requires a JDBC driver and database)') + code(`String sql = "SELECT id FROM users WHERE email = ?";
try (PreparedStatement statement = connection.prepareStatement(sql)) {
    statement.setString(1, email);
    try (ResultSet rows = statement.executeQuery()) {
        while (rows.next()) System.out.println(rows.getLong("id"));
    }
}`));

  add('jdbc_transactions', 'Transactions, commit and rollback',
    'A transaction groups database operations into one unit. Commit makes the changes permanent; rollback cancels uncommitted changes.',
    'Transactions keep related updates consistent when several statements must succeed or fail together.',
    'Disable auto-commit to control a transaction explicitly. Commit after all required operations succeed; rollback when an operation fails, then restore or close the connection.',
    null, null,
    ['A transaction usually belongs to one database connection.', 'Always decide how failures trigger rollback.', 'Keep transactions short to reduce lock duration.'],
    'Do not catch an error and commit partial work when the operation must be all-or-nothing.',
    h2('Transaction pattern (requires a JDBC driver and database)') + code(`connection.setAutoCommit(false);
try {
    debit(connection, fromAccount, amount);
    credit(connection, toAccount, amount);
    connection.commit();
} catch (SQLException error) {
    connection.rollback();
    throw error;
}`));

  add('jdbc_batch', 'Batch processing',
    'JDBC batching sends multiple parameter sets or statements to the database together using addBatch and executeBatch.',
    'Batching can reduce network round trips when inserting or updating many rows.',
    'Prepare one parameterized statement, bind values for each row, add each set to the batch, and execute the batch. Use a transaction when partial completion is not acceptable.',
    null, null,
    ['Batch sizes should be bounded for large input.', 'Check update counts and BatchUpdateException details.', 'Database drivers may handle batches differently.'],
    'Do not build one enormous unbounded batch that consumes too much memory or creates a long transaction.',
    h2('Batch pattern (requires a JDBC driver and database)') + code(`try (PreparedStatement statement = connection.prepareStatement(
        "INSERT INTO tags(name) VALUES (?)")) {
    for (String tag : tags) {
        statement.setString(1, tag);
        statement.addBatch();
    }
    int[] counts = statement.executeBatch();
}`));

  add('connection_pooling', 'Connection pooling',
    'A connection pool keeps a bounded set of database connections ready for reuse. Application code borrows a connection and returns it by closing the logical handle.',
    'Opening a database connection can be expensive. Reusing connections reduces setup work and allows the application to limit database concurrency.',
    'A DataSource obtains a pooled connection. Calling close normally returns it to the pool rather than closing the physical database session.',
    null, null,
    ['Size the pool according to database capacity and workload.', 'Always close borrowed connections so they return to the pool.', 'Use pool metrics and timeouts to detect exhaustion.'],
    'Do not create a new connection pool per request or set a huge pool without considering database limits.',
    note('Connection pooling is commonly provided by an application server or an external library. JavaTrail does not add a pool dependency or database service.'));

  add('jdbc_exceptions', 'JDBC exception handling',
    'SQLException reports a database access failure and can include a message, SQLState, vendor code and chained exceptions.',
    'These details help distinguish connection failures, constraint violations, timeouts and vendor-specific errors.',
    'Catch SQLException at a layer that can recover or translate it. Preserve the cause and avoid logging credentials or sensitive SQL parameter values.',
    null, null,
    ['Inspect SQLState and vendor code where appropriate.', 'BatchUpdateException can include partial update counts.', 'Use try-with-resources to close JDBC resources during failures.'],
    'Do not return raw database error details to a user or expose secrets in logs.',
    h2('Safe handling shape') + code(`try {
    repository.save(order);
} catch (SQLException error) {
    logger.error("Could not save order; SQLState={}", error.getSQLState(), error);
    throw new OrderStorageException("Could not save order", error);
}`));
})();
