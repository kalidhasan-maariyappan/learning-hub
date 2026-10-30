// Focused lessons for lambdas, functional interfaces and stream pipelines.
(function () {
  'use strict';
  const JT = window.JT;
  const { note, code } = JT.h;
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_functional_programming_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('lambda_implementation', 'Lambda implementation concepts',
    'A lambda is a concise way to provide an implementation of a functional interface. The compiler checks its parameter and result types from the target interface.',
    'Lambdas make small pieces of behavior easy to pass to methods such as sort, map, filter or an executor.',
    'The lambda is converted into an instance compatible with its target functional interface. Modern Java compilers commonly use invokedynamic machinery, but the exact runtime object representation is an implementation detail.',
    `import java.util.function.IntUnaryOperator;

public class Main {
    public static void main(String[] args) {
        IntUnaryOperator triple = value -> value * 3;
        System.out.println(triple.applyAsInt(7));
    }
}`, '21',
    ['A lambda needs a target functional-interface type.', 'Captured local variables must be final or effectively final.', 'Use a method reference when it makes the same behavior clearer.'],
    'Do not assume each evaluation of a lambda creates a distinct object; identity and allocation are not part of the lambda contract.');

  add('functional_composition', 'Functional interfaces and composition',
    'A functional interface has one abstract method and can be implemented with a lambda. Standard interfaces include Predicate, Function, Consumer and Supplier.',
    'Small functions can be combined and passed as values, making validation and data transformation reusable.',
    'Function.andThen runs one function and passes its result to the next. Function.compose runs the supplied function first. Predicate provides and, or and negate.',
    `import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> length = String::length;
        Function<Integer, Integer> doubleIt = n -> n * 2;
        int result = length.andThen(doubleIt).apply("Java");
        System.out.println(result);
    }
}`, '8',
    ['Predicate<T> returns boolean.', 'Function<T,R> transforms a value.', 'Consumer<T> accepts a value without returning one; Supplier<T> produces one.'],
    'Do not give a functional interface multiple unrelated abstract methods; it would no longer have one unambiguous lambda target.');

  add('method_references', 'Method references',
    'A method reference is a shorter form of a lambda that calls an existing method or constructor.',
    'It can make a pipeline easier to read when the lambda only forwards its arguments to another method.',
    'The compiler checks the referenced method against the target functional interface. Common forms include a static method, an instance method on a particular object, an instance method on an arbitrary object of a type, and a constructor reference.',
    `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("asha", "ben");
        names.stream().map(String::toUpperCase).forEach(System.out::println);
    }
}`, 'ASHA\nBEN',
    ['A method reference still needs a target functional interface.', 'Use a lambda when it communicates the behavior more clearly.', 'Constructor references use the form Type::new.'],
    'Do not replace a clear lambda with a method reference that makes parameter flow harder to understand.');

  add('stream_pipeline', 'Stream pipeline internals',
    'A Stream pipeline consists of a source, zero or more intermediate operations, and a terminal operation. A stream describes processing; it does not store the elements.',
    'This model explains why operations are lazy and why a stream normally cannot be reused after a terminal operation.',
    'Intermediate operations such as filter and map build the pipeline. A terminal operation such as collect, count or forEach triggers traversal and produces a result or side effect.',
    `import java.util.List;

public class Main {
    public static void main(String[] args) {
        long count = List.of("ant", "bear", "cat").stream()
            .filter(word -> word.length() >= 3)
            .count();
        System.out.println("Count: " + count);
    }
}`, 'Count: 3',
    ['A Stream is normally consumed once.', 'Intermediate operations are lazy.', 'Avoid changing the source while a stream pipeline is using it.'],
    'Do not expect filter or map to execute before a terminal operation is called.');

  add('stream_map_filter_flatmap', 'map(), filter() and flatMap()',
    '<code>map</code> transforms each element. <code>filter</code> keeps elements that match a predicate. <code>flatMap</code> transforms each element into a stream and combines those streams into one pipeline.',
    'These operations express common transformations without manually managing intermediate lists and loops.',
    'Each operation receives one element at a time. flatMap is useful when each input has zero or more output values, such as splitting sentences into words.',
    `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = List.of("Java streams", "make data clear");
        List<String> result = words.stream()
            .flatMap(line -> List.of(line.split(" ")).stream())
            .map(String::toUpperCase)
            .filter(word -> word.length() >= 4)
            .toList();
        System.out.println(result);
    }
}`, '[JAVA, STREAMS, MAKE, DATA, CLEAR]',
    ['map keeps one output per input.', 'filter can remove an input.', 'flatMap flattens nested streams into one stream.'],
    'Do not use map when the mapper returns a stream and you intend one flat sequence; use flatMap.');

  add('stream_reduce_collect', 'reduce() and collect()',
    'reduce combines stream elements into one value. collect accumulates elements into a mutable result container using a Collector.',
    'Use reduce for operations such as summing values. Use collect for building lists, maps, grouped results or other containers.',
    'A reduction combines values using an identity and accumulator. A collector defines how to create, add to and combine result containers.',
    `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = List.of(2, 3, 4);
        int sum = values.stream().reduce(0, Integer::sum);
        List<Integer> doubled = values.stream().map(n -> n * 2).toList();
        System.out.println("Sum: " + sum);
        System.out.println("Doubled: " + doubled);
    }
}`, 'Sum: 9\nDoubled: [4, 6, 8]',
    ['A reduce operation should be associative for parallel correctness.', 'collect is designed for structured mutable reduction.', 'Prefer a specialized numeric stream when it improves clarity.'],
    'Do not use reduce with a mutable identity such as one shared ArrayList; use collect for mutable accumulation.');

  add('downstream_collectors', 'Collectors and downstream collectors',
    'A Collector describes how stream values are accumulated into a result. A downstream collector performs additional work on the values of each group.',
    'Downstream collectors can group records and directly map, count, sum or collect each group without building unnecessary intermediate structures.',
    'Collectors.groupingBy accepts a classifier and optionally a downstream collector such as counting, mapping, summingInt or toList.',
    `import java.util.List;
import java.util.stream.Collectors;

record Book(String category, String title) { }

public class Main {
    public static void main(String[] args) {
        var books = List.of(new Book("Java", "Streams"),
                            new Book("Java", "Threads"),
                            new Book("SQL", "Queries"));
        var titles = books.stream().collect(Collectors.groupingBy(
            Book::category,
            Collectors.mapping(Book::title, Collectors.toList())));
        System.out.println(titles.get("Java"));
    }
}`, '[Streams, Threads]',
    ['Downstream collectors operate on each group.', 'mapping can transform values before collecting.', 'Use counting or summing collectors when a full list is not needed.'],
    'Do not collect every group into a list if the application only needs a count or summary.');

  add('grouping_partitioning', 'groupingBy() and partitioningBy()',
    '<code>groupingBy</code> groups elements by a classifier key. <code>partitioningBy</code> divides elements into two groups based on a predicate: true and false.',
    'These collectors make category summaries and yes/no splits concise and keep each result associated with its key.',
    'Both operations return a Map. groupingBy uses the classifier result as keys; partitioningBy uses Boolean keys.',
    `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = List.of(1, 2, 3, 4, 5);
        var groups = values.stream().collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("Even: " + groups.get(true));
        System.out.println("Odd: " + groups.get(false));
    }
}`, 'Even: [2, 4]\nOdd: [1, 3, 5]',
    ['partitioningBy always has true and false partitions.', 'groupingBy can use a downstream collector.', 'Map iteration order depends on the map collector chosen.'],
    'Do not assume the returned map has a particular iteration order unless you choose an ordered map supplier.');

  add('lazy_shortcircuit', 'Lazy evaluation and short-circuiting',
    'Stream intermediate operations are lazy. Short-circuiting terminal operations such as findFirst, anyMatch and limit can stop processing once enough information is available.',
    'Laziness avoids processing elements that cannot affect the result and allows pipelines to work with large or even unbounded sources.',
    'A terminal operation pulls values through the pipeline. A short-circuiting operation signals that no more values are required.',
    `import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        int first = IntStream.rangeClosed(1, 100)
            .filter(n -> n % 7 == 0)
            .findFirst()
            .orElse(-1);
        System.out.println(first);
    }
}`, '7',
    ['Intermediate operations do not run until a terminal operation starts.', 'findFirst preserves encounter order when the stream has one.', 'anyMatch may stop after its first match.'],
    'Do not put required side effects in intermediate operations; short-circuiting can mean they run only for some elements.');

  add('parallel_streams', 'Parallel streams and common-pool risks',
    'A parallel stream divides work across multiple threads, commonly using the shared ForkJoin common pool.',
    'Parallel processing can reduce elapsed time for sufficiently large, independent CPU-bound work, but it can also add scheduling and coordination overhead.',
    'The stream partitions source data, processes partitions concurrently, and combines partial results. Correctness requires stateless operations and an associative reduction.',
    null, null,
    ['Parallelism is not guaranteed to make a pipeline faster.', 'Avoid blocking I/O and shared mutable state in parallel stream operations.', 'The common pool is shared with other work in the process.'],
    'Do not call parallel() automatically for every collection. Benchmark with representative data and account for common-pool contention.',
    note('Concurrent execution order and timing vary, so this lesson does not show a fixed output for a parallel operation.') + code(`long total = values.parallelStream()
    .mapToLong(this::cpuWork)
    .sum();`));

  add('optional_design', 'Optional design and misuse',
    'Optional represents a result that may be present or absent. It provides methods to transform a present value, supply a fallback or run an action when present.',
    'Optional makes absence explicit in many return types and reduces accidental null dereferences at API boundaries.',
    'Use map and flatMap to transform optional values. Use orElseGet for a lazily computed fallback. Prefer returning Optional over returning null from a lookup method.',
    `import java.util.Optional;

public class Main {
    static Optional<String> findName(int id) {
        return id == 7 ? Optional.of("Mina") : Optional.empty();
    }
    public static void main(String[] args) {
        String label = findName(7).map(String::toUpperCase).orElse("UNKNOWN");
        System.out.println(label);
    }
}`, 'MINA',
    ['Optional should not itself be null.', 'orElse evaluates its fallback immediately; orElseGet evaluates lazily.', 'Use Optional primarily for return values rather than every field or parameter.'],
    'Do not call get without checking presence or providing a fallback; use map, ifPresent, orElse or orElseThrow.');
})();
