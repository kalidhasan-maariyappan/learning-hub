// Focused lessons for exception flow, API boundaries and resource cleanup.
(function () {
  'use strict';
  const JT = window.JT;
  const { table } = JT.h;
  function add(id, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def('java_ca_advanced_exceptions_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('exception_propagation', 'Exception propagation through call stacks',
    'When a method throws an exception and does not handle it, Java searches up the current call stack for a matching catch block. This movement is called propagation or stack unwinding.',
    'Propagation lets lower-level code report a failure to a layer that has enough context to recover, add useful information or show an error to a user.',
    'Java checks catch blocks around the throw site first, then returns through callers until it finds a compatible handler. If none handles it, the thread ends with an uncaught exception.',
    `public class Main {
    static int parse(String text) {
        return Integer.parseInt(text);
    }
    static int readCount() {
        return parse("12");
    }
    public static void main(String[] args) {
        try {
            System.out.println("Count: " + readCount());
        } catch (NumberFormatException error) {
            System.out.println("Invalid count");
        }
    }
}`, 'Count: 12',
    ['The exception keeps its original stack trace as it propagates.', 'Catch at the layer that can make a useful decision.', 'Checked exceptions must be caught or declared by each method boundary.'],
    'Do not catch an exception in every method just to print it and continue. That hides the failure from code that might recover.');

  add('exception_chaining', 'Exception chaining and root-cause analysis',
    'Exception chaining wraps a lower-level exception in a higher-level exception while preserving the original as its cause.',
    'A service can report a meaningful domain failure while still giving logs and diagnostics the database, file or parsing cause that led to it.',
    'Create the higher-level exception with the lower-level exception as its cause. Later, inspect the cause chain rather than discarding the original details.',
    `public class Main {
    static int loadPort(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException cause) {
            throw new IllegalArgumentException("Port must be a number", cause);
        }
    }
    public static void main(String[] args) {
        try {
            loadPort("http");
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
            System.out.println(error.getCause().getClass().getSimpleName());
        }
    }
}`, 'Port must be a number\nNumberFormatException',
    ['Add context at a meaningful abstraction boundary.', 'Preserve the original exception as the cause.', 'Log the exception once at the boundary that owns the failure response.'],
    'Do not replace an exception with a new one that drops its cause; doing so loses the root-cause trace.');

  add('exception_hierarchy', 'Custom exception hierarchy design',
    'A custom exception is an application-defined type that describes a failure more precisely than a general exception. Related failures can share a common parent type.',
    'A small exception hierarchy lets callers handle failures at the level they understand, such as distinguishing a missing customer from a temporary service outage.',
    'Choose checked exceptions when callers are expected to recover and the API can reasonably declare the failure. Use unchecked exceptions for programming errors or failures that callers cannot usefully handle at every call site.',
    `class OrderException extends Exception {
    OrderException(String message) { super(message); }
}
class UnknownOrderException extends OrderException {
    UnknownOrderException(String id) { super("Unknown order: " + id); }
}

public class Main {
    static void loadOrder(String id) throws OrderException {
        throw new UnknownOrderException(id);
    }
    public static void main(String[] args) {
        try { loadOrder("A-17"); }
        catch (OrderException error) { System.out.println(error.getMessage()); }
    }
}`, 'Unknown order: A-17',
    ['Name exceptions after meaningful failure conditions.', 'Avoid deep hierarchies with no distinct handling behavior.', 'Include causes when translating a lower-level failure.'],
    'Do not create a custom exception for every method. Add a type when callers benefit from recognizing that failure.');

  add('suppressed_exceptions', 'Suppressed exceptions',
    'A suppressed exception is an additional failure recorded while another exception is already being thrown. try-with-resources uses suppression when both the body and resource closing fail.',
    'Suppression preserves cleanup failures without replacing the main failure that caused the operation to fail.',
    'The body exception remains the primary exception. Exceptions thrown while closing resources are attached to it and can be read with <code>getSuppressed()</code>.',
    `class Resource implements AutoCloseable {
    public void close() { throw new IllegalStateException("close failed"); }
}

public class Main {
    public static void main(String[] args) {
        try (Resource resource = new Resource()) {
            throw new IllegalArgumentException("work failed");
        } catch (IllegalArgumentException error) {
            System.out.println(error.getMessage());
            System.out.println(error.getSuppressed()[0].getMessage());
        }
    }
}`, 'work failed\nclose failed',
    ['The primary exception is the one thrown from the try body.', 'Closing failures are attached as suppressed exceptions.', 'Inspect suppressed exceptions when diagnosing resource cleanup failures.'],
    'Do not assume that a failure from close always replaces the exception thrown by the try body.');

  add('try_resources_internals', 'try-with-resources internals',
    'try-with-resources automatically closes each resource that implements AutoCloseable when control leaves the try block.',
    'Automatic cleanup prevents resource leaks and makes code safer when an exception occurs between opening and closing a file, stream, socket or database handle.',
    'Resources are closed in reverse order of declaration. Java effectively places cleanup in a finally path and preserves a body exception while recording close failures as suppressed exceptions.',
    `import java.io.StringReader;

public class Main {
    public static void main(String[] args) throws Exception {
        try (StringReader reader = new StringReader("Java")) {
            System.out.println((char) reader.read());
        }
        System.out.println("Reader closed");
    }
}`, 'J\nReader closed',
    ['Declare resources in the try parentheses.', 'Resources close even when the body throws.', 'Multiple resources close from right to left.'],
    'Do not close the same resource manually in finally after using try-with-resources; that duplicates cleanup and complicates error handling.');

  add('layered_exception_design', 'Exception-handling design in layered applications',
    'A layered application separates responsibilities such as user input, business rules, persistence and transport. Each layer should handle or translate an exception only when it can add useful meaning.',
    'Clear boundaries keep database-specific errors from leaking into user-facing APIs and avoid swallowing failures before the responsible layer sees them.',
    'The persistence layer reports its failure with the cause. The service layer may translate it to a domain failure. The API boundary maps that failure to an appropriate response and logs it once.',
    `class StorageException extends RuntimeException {
    StorageException(String message, Throwable cause) { super(message, cause); }
}

public class Main {
    static void service() {
        try {
            throw new IllegalStateException("disk unavailable");
        } catch (IllegalStateException cause) {
            throw new StorageException("Could not save order", cause);
        }
    }
    public static void main(String[] args) {
        try { service(); }
        catch (StorageException error) {
            System.out.println(error.getMessage());
            System.out.println(error.getCause().getMessage());
        }
    }
}`, 'Could not save order\ndisk unavailable',
    ['Translate exceptions only when crossing a meaningful layer boundary.', 'Preserve the cause and useful context.', 'Avoid catching and returning null for unexpected failures.'],
    'Do not expose SQL text, file paths or internal exception details directly in a public response. Log safe diagnostic context separately.');

  add('errors_recoverable', 'Errors vs recoverable exceptions',
    'Exception describes conditions application code may be able to handle. Error represents serious problems that most application code should not try to recover from, such as many JVM resource failures.',
    'Distinguishing them helps avoid unsafe broad catches and keeps recovery logic focused on failures the application can actually resolve.',
    'Catch a specific exception such as IOException or NumberFormatException when there is a recovery path. Do not catch Throwable just to keep the process running.',
    `public class Main {
    public static void main(String[] args) {
        String input = "not-a-number";
        try {
            Integer.parseInt(input);
        } catch (NumberFormatException error) {
            System.out.println("Please enter digits");
        }
    }
}`, 'Please enter digits',
    ['RuntimeException is unchecked; checked exceptions must be handled or declared.', 'Errors are generally not ordinary business failures.', 'Recover only when the program can return to a valid state.'],
    'Do not catch Error or Throwable as a general recovery strategy. It can hide failures from which the process cannot safely continue.',
    table(['Type', 'Typical meaning', 'Usual application response'], [['Exception', 'An operation failed.', 'Handle if there is a valid recovery or translation.'], ['RuntimeException', 'Unchecked failure, often invalid state or input.', 'Handle at an appropriate boundary.'], ['Error', 'Serious JVM or environment problem.', 'Usually allow it to propagate; do not assume recovery is safe.']]));
})();
