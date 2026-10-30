// Focused lessons for modern Java language and platform features.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, note, code } = JT.h;
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_modern_java_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('jpms', 'Java modules (JPMS)',
    'The Java Platform Module System (JPMS), introduced in Java 9, lets an application group packages into named modules and declare dependencies and exported packages.',
    'Modules make dependencies explicit and support stronger encapsulation for larger applications and the JDK itself.',
    'A module declares its name, required modules and exported packages in module-info.java. A package is accessible to another module only when it is exported and the dependency is readable.',
    null, null,
    ['requires declares a module dependency.', 'exports makes a package available to other modules.', 'Classpath applications do not need module-info.java.'],
    'Do not confuse exporting a package with opening it for deep reflection.',
    h2('module-info.java shape') + code(`module com.example.billing {
    requires java.sql;
    exports com.example.billing.api;
}`));

  add('var_inference', 'var and type inference',
    '<code>var</code> lets the compiler infer the static type of a local variable from its initializer. It does not make Java dynamically typed.',
    'var can reduce repeated type names when the initializer makes the type clear.',
    'The compiler determines the type at compile time. A local var must have an initializer, and it cannot be used for fields, method parameters or return types.',
    `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        var names = new ArrayList<String>();
        names.add("Asha");
        System.out.println(names.get(0).toUpperCase());
    }
}`, 'ASHA',
    ['var is local-variable type inference, available since Java 10.', 'The inferred type remains fixed and statically checked.', 'Use a clear initializer.'],
    'Do not use var when it hides an important type or makes the code harder to understand.');

  add('switch_expressions', 'Switch expressions',
    'A switch expression evaluates to a value. Arrow cases avoid fall-through, and a block can use yield to return a value.',
    'Switch expressions keep value selection concise and make missing cases easier for the compiler to detect.',
    'Assign the result of switch to a variable. Cover all possible values or provide a default case. Switch expressions became final in Java 14.',
    `public class Main {
    public static void main(String[] args) {
        int day = 6;
        String kind = switch (day) {
            case 6, 7 -> "weekend";
            default -> "weekday";
        };
        System.out.println(kind);
    }
}`, 'weekend',
    ['Arrow cases do not fall through.', 'Use yield inside a block case that produces a value.', 'Switch expressions became final in Java 14.'],
    'Do not omit a value for one switch path; every expression path must produce a result.');

  add('text_blocks', 'Text blocks',
    'A text block is a multi-line String literal written with three double quotes. Text blocks became final in Java 15.',
    'They make multi-line SQL, JSON or other text easier to read without manually concatenating many lines.',
    'The opening delimiter must be followed by a line terminator. Java removes incidental indentation according to the closing delimiter and text-block rules.',
    `public class Main {
    public static void main(String[] args) {
        String json = """
            {
              "language": "Java"
            }
            """;
        System.out.println(json.contains("Java"));
    }
}`, 'true',
    ['A text block is still an ordinary String at runtime.', 'Indentation affects the resulting content.', 'Text blocks became final in Java 15.'],
    'Do not assume the source indentation is preserved exactly; learn how incidental indentation is removed.');

  add('records', 'Records',
    'A record is a concise class for transparent data carriers. The compiler provides component fields, accessors, equals, hashCode and toString.',
    'Records reduce boilerplate when a type’s main purpose is to hold a fixed set of values.',
    'Declare components in the record header. Records are implicitly final; compact constructors can validate or normalize component values. Records became final in Java 16.',
    `record Point(int x, int y) { }

public class Main {
    public static void main(String[] args) {
        Point point = new Point(3, 4);
        System.out.println(point);
        System.out.println(point.x() + point.y());
    }
}`, 'Point[x=3, y=4]\n7',
    ['Record components are final references.', 'Records can implement interfaces but cannot extend another class.', 'Records became final in Java 16.'],
    'A record is only shallowly immutable; a mutable object stored in a component may still change.');

  add('sealed_classes', 'Sealed classes',
    'A sealed class or interface restricts which types may directly extend or implement it. The permitted types must declare whether they are final, sealed or non-sealed.',
    'Sealed hierarchies make a known set of subtypes explicit and help model controlled domain alternatives.',
    'Use permits to list direct subtypes when needed. Sealed classes became final in Java 17.',
    `sealed interface Shape permits Circle, Rectangle { }
record Circle(int radius) implements Shape { }
record Rectangle(int width, int height) implements Shape { }

public class Main {
    public static void main(String[] args) {
        Shape shape = new Circle(3);
        System.out.println(shape instanceof Circle);
    }
}`, 'true',
    ['Permitted subtypes must follow the sealed hierarchy rules.', 'Use sealed when the subtype set should be controlled.', 'Sealed classes became final in Java 17.'],
    'Do not mark a subtype non-sealed unless you intentionally allow that branch to be extended freely.');

  add('pattern_matching', 'Pattern matching for instanceof and switch',
    'Pattern matching combines a type test with a variable binding. Pattern matching for instanceof became final in Java 16; pattern matching for switch became final in Java 21.',
    'It removes repeated casts and makes type-based branches easier to read.',
    'An instanceof pattern variable is available only where the compiler can prove the test succeeded. A switch type pattern matches and binds a value of that type.',
    `public class Main {
    static String describe(Object value) {
        if (value instanceof String text) return "text: " + text;
        return "other";
    }
    public static void main(String[] args) {
        System.out.println(describe("Java"));
    }
}`, 'text: Java',
    ['Pattern variables have flow-scoped visibility.', 'Use a guarded pattern when type alone is not enough.', 'Switch pattern matching is final from Java 21.'],
    'Do not use the pattern variable outside the branch where the match is known to be true.');

  add('record_patterns', 'Record patterns',
    'A record pattern tests whether a value is an instance of a record and extracts its components into local variables. Record patterns became final in Java 21.',
    'They make nested record data easier to inspect without repeated accessor calls.',
    'The pattern names the record type and component patterns. The compiler checks the record shape and scopes the component variables to the matched branch.',
    `record Point(int x, int y) { }

public class Main {
    static String describe(Object value) {
        if (value instanceof Point(int x, int y)) return x + "," + y;
        return "other";
    }
    public static void main(String[] args) {
        System.out.println(describe(new Point(2, 5)));
    }
}`, '2,5',
    ['Record patterns destructure record components.', 'Nested patterns can match nested records.', 'Record patterns became final in Java 21.'],
    'Record patterns apply to records; they do not unpack arbitrary classes.');

  add('sequenced_collections', 'Sequenced collections',
    'Sequenced collections are interfaces added in Java 21 for collections with a defined encounter order. They provide methods such as getFirst, getLast and reversed.',
    'The common interfaces let code work with the ends and reverse view of ordered collections consistently.',
    'List, Deque and LinkedHashSet implement sequenced interfaces in Java 21. Reversed returns a reverse-ordered view rather than a separately sorted copy.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Asha", "Ben", "Chen"));
        System.out.println(names.getFirst());
        System.out.println(names.reversed());
    }
}`, 'Asha\n[Chen, Ben, Asha]',
    ['SequencedCollection was added in Java 21.', 'The collection must define encounter order.', 'A reversed view reflects changes to its backing collection.'],
    'Do not call sequenced methods on an unordered collection that does not implement SequencedCollection.');

  add('modern_virtual_threads', 'Virtual threads in modern Java',
    'Virtual threads are lightweight Java threads finalized in Java 21. They make thread-per-task code practical for many blocking workloads.',
    'They can support many concurrent requests without dedicating one operating-system thread to every waiting task.',
    'Create a virtual thread per task or use a virtual-thread-per-task executor. Blocking operations can suspend a virtual thread while its carrier thread runs other work.',
    `public class Main {
    public static void main(String[] args) throws Exception {
        Thread thread = Thread.ofVirtual().start(() -> System.out.println("Virtual task"));
        thread.join();
    }
}`, 'Virtual task',
    ['Virtual threads are final since Java 21.', 'They improve scalability for blocking workloads, not CPU-bound speed.', 'Do not pool virtual threads; limit database or service concurrency separately.'],
    'Do not assume every blocking native call or synchronized region behaves identically across JDK versions; check current guidance.');

  add('modern_scoped_values', 'Scoped values',
    'ScopedValue provides a way to share an immutable value with code called during a bounded scope. It became final in Java 25.',
    'It can carry context such as a request ID without mutating thread-local state or adding the value to every method signature.',
    'Bind a value with ScopedValue.where and run a task in that scope. The value is only available in the dynamic scope and cannot be reassigned there.',
    `public class Main {
    private static final ScopedValue<String> REQUEST = ScopedValue.newInstance();
    static void handle() { System.out.println(REQUEST.get()); }
    public static void main(String[] args) {
        ScopedValue.where(REQUEST, "req-42").run(Main::handle);
    }
}`, 'req-42',
    ['ScopedValue is final in Java 25.', 'Bindings are immutable and bounded by a scope.', 'Scoped values work naturally with structured task lifetimes.'],
    'Do not assume Java 17 or Java 21 supports the final ScopedValue API; check the project JDK.');

  add('modern_structured_concurrency', 'Structured concurrency — preview/version status',
    'Structured concurrency groups related child tasks under a parent task so their lifetimes and failures can be managed together. It remains a preview API in Java 25.',
    'It can make cancellation and error propagation clearer when a request starts several related tasks.',
    'A StructuredTaskScope starts subtasks, waits for their outcomes and applies a policy. Preview code requires matching compiler and runtime preview flags.',
    null, null,
    ['Structured concurrency is preview in Java 25, not a final API.', 'Preview APIs may change or be removed.', 'This lesson runner does not enable preview compiler flags.'],
    'Do not copy preview code into a stable Java 17 build or imply that it is a final Java feature.',
    note('Version status: preview in Java 25. A runnable sample is omitted because JavaTrail’s runner does not enable preview flags.') + code(`// Preview API shape; check the exact Java release and enable preview flags:
// try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
//     var user = scope.fork(this::loadUser);
//     var orders = scope.fork(this::loadOrders);
//     scope.join().throwIfFailed();
// }`));
})();
