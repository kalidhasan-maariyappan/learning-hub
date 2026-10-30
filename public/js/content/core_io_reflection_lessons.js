// Focused lessons for NIO, stream handling, reflection and annotations.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, table, code } = JT.h;
  function add(group, id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_' + group + '_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('advanced_io_nio', 'buffered_io', 'Buffered I/O performance',
    'Buffered I/O reads or writes data in larger chunks instead of making a lower-level operation for every small byte or character.',
    'Buffering reduces repeated system calls and is useful when processing files or streams sequentially.',
    'A buffered wrapper keeps a block of data in memory and refills or flushes it as needed. Always close or flush output streams to send remaining buffered data.',
    `import java.io.BufferedReader;
import java.io.StringReader;

public class Main {
    public static void main(String[] args) throws Exception {
        try (var reader = new BufferedReader(new StringReader("first\\nsecond"))) {
            System.out.println(reader.readLine());
            System.out.println(reader.readLine());
        }
    }
}`, 'first\nsecond',
    ['Buffering can improve sequential I/O throughput.', 'Choose buffer size based on workload measurements.', 'Use try-with-resources to close streams.'],
    'Do not wrap an already buffered stream repeatedly without a reason.');

  add('advanced_io_nio', 'charset_bugs', 'Character encoding and charset bugs',
    'A charset defines how characters are encoded as bytes and decoded back into text. UTF-8 is a common Unicode encoding.',
    'Using different default charsets on different systems can corrupt files, logs or network messages.',
    'Choose a charset explicitly when converting bytes and characters. Use StandardCharsets constants instead of the platform default for stable formats.',
    `import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        String text = "café";
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
        String restored = new String(bytes, StandardCharsets.UTF_8);
        System.out.println(restored);
    }
}`, 'café',
    ['Bytes do not identify their charset by themselves.', 'Use the same charset at both ends of a text format.', 'Specify UTF-8 for portable text files and protocols when required by the format.'],
    'Do not decode UTF-8 bytes using the platform default charset.');

  add('advanced_io_nio', 'path_files', 'Path and Files APIs',
    'Path represents a file-system path. Files provides operations for reading, writing, copying, moving and inspecting files.',
    'These APIs make file operations more portable and expressive than manual path-string concatenation.',
    'Build paths with Path methods, check or create directories, and use Files operations. Use try-with-resources for streams returned by Files.',
    `import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws Exception {
        Path file = Files.createTempFile("lesson-", ".txt");
        try {
            Files.writeString(file, "Java Files API");
            System.out.println(Files.readString(file));
        } finally { Files.deleteIfExists(file); }
    }
}`, 'Java Files API',
    ['Use resolve instead of joining path strings manually.', 'Handle IOException at a useful boundary.', 'Check whether a path is user-controlled before accessing it.'],
    'Do not assume a path separator or current working directory is the same on every operating system.');

  add('advanced_io_nio', 'channels_bytebuffer', 'Channels and ByteBuffer',
    'A Channel transfers data to or from a buffer. ByteBuffer stores bytes and tracks position, limit and capacity while data moves between a channel and code.',
    'Channels and buffers support efficient file and network I/O, including non-blocking operations.',
    'Write bytes into a buffer, call flip to prepare it for reading, consume bytes, and call clear or compact before reusing the buffer for more input.',
    `import java.nio.ByteBuffer;

public class Main {
    public static void main(String[] args) {
        ByteBuffer buffer = ByteBuffer.allocate(4);
        buffer.put((byte) 65).put((byte) 66);
        buffer.flip();
        System.out.println((char) buffer.get());
        System.out.println((char) buffer.get());
    }
}`, 'A\nB',
    ['flip changes the buffer from writing mode to reading mode.', 'clear resets position and limit; it does not erase bytes.', 'compact preserves unread bytes for later processing.'],
    'Do not call get after writing without flipping the buffer; its limit may still prevent reading.');

  add('advanced_io_nio', 'blocking_nonblocking', 'Blocking vs non-blocking I/O',
    'Blocking I/O waits for an operation to complete. Non-blocking I/O lets a thread check readiness and do other work while a channel has no data available.',
    'Non-blocking I/O can serve many connections with fewer threads, but it requires explicit state and readiness management.',
    'A non-blocking SocketChannel can be registered with a Selector. The selector reports channels ready for connect, read or write operations.',
    null, null,
    ['Blocking code is often simpler and can work well with virtual threads.', 'Non-blocking code needs a selector loop and per-connection state.', 'Choose based on measured concurrency and operational complexity.'],
    'Do not assume non-blocking I/O is always faster or easier to maintain.',
    h2('Selector API shape') + code(`Selector selector = Selector.open();
channel.configureBlocking(false);
channel.register(selector, SelectionKey.OP_READ);
while (selector.select() > 0) {
    // Process ready channels and update interest operations.
}`));

  add('advanced_io_nio', 'direct_heap_buffers', 'Direct vs heap buffers',
    'A heap ByteBuffer stores bytes in the Java heap. A direct ByteBuffer stores data outside the normal Java heap and may reduce copying for some native I/O operations.',
    'Direct buffers can help specific high-throughput I/O workloads, but allocation and reclamation are more expensive and usage consumes native memory.',
    'Create a heap buffer with allocate and a direct buffer with allocateDirect. Measure with the actual channel and workload before choosing.',
    `import java.nio.ByteBuffer;

public class Main {
    public static void main(String[] args) {
        ByteBuffer heap = ByteBuffer.allocate(8);
        ByteBuffer direct = ByteBuffer.allocateDirect(8);
        System.out.println(heap.isDirect());
        System.out.println(direct.isDirect());
    }
}`, 'false\ntrue',
    ['Direct buffers are not automatically faster in every use.', 'Direct memory is outside the ordinary Java heap limit.', 'Reuse buffers where appropriate rather than allocating them for every small operation.'],
    'Do not allocate many large direct buffers without monitoring native memory use.');

  add('advanced_io_nio', 'serialization_compatibility', 'Serialization compatibility',
    'Java serialization compatibility concerns whether serialized data can be read by a later version of a class or application.',
    'Stored serialized data can outlive the code version that created it, so class evolution and serialVersionUID affect compatibility.',
    'Serializable classes can declare an explicit serialVersionUID. Changing fields or class shape may require custom migration or a versioned external format.',
    `import java.io.Serializable;

class UserRecord implements Serializable {
    private static final long serialVersionUID = 1L;
    final String name;
    UserRecord(String name) { this.name = name; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(UserRecord.class.isAssignableFrom(UserRecord.class));
    }
}`, 'true',
    ['serialVersionUID is part of Java serialization compatibility checks.', 'Use an explicit versioning and migration policy for long-lived data.', 'Many applications prefer schema-based formats for durable interchange.'],
    'Do not treat default Java serialization as a stable public data format.');

  add('advanced_io_nio', 'serialization_security', 'Serialization security',
    'Native Java deserialization reconstructs object graphs and can invoke behavior while reading data. Untrusted streams can expose dangerous classes or resource-exhaustion paths.',
    'Serialization filters and safer data formats reduce the risk of executing unintended object behavior from attacker-controlled data.',
    'Avoid native deserialization for untrusted input. If required, install a restrictive ObjectInputFilter and bound depth, references, array sizes and accepted classes.',
    null, null,
    ['Prefer explicit data transfer formats with validation.', 'Use class allowlists and graph limits when filtering.', 'Keep deserialization libraries and JDKs current.'],
    'Do not rely on a signature alone as a substitute for safe deserialization; signed data can still contain unsafe object graphs.',
    h2('Filter example shape') + code(`ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
    "maxdepth=10;maxrefs=1000;com.example.dto.*;!*"
);
input.setObjectInputFilter(filter);`));

  add('advanced_io_nio', 'large_file_processing', 'Efficient large-file processing',
    'Efficient large-file processing reads input incrementally instead of loading the entire file into memory at once.',
    'Streaming bounds memory use and lets an application process files larger than the available heap.',
    'Use a buffered reader or a stream-based Files API, process one line or bounded chunk at a time, and close the stream after completion.',
    `import java.io.BufferedReader;
import java.io.StringReader;

public class Main {
    public static void main(String[] args) throws Exception {
        int lines = 0;
        try (BufferedReader reader = new BufferedReader(
                new StringReader("one\\ntwo\\nthree"))) {
            while (reader.readLine() != null) lines++;
        }
        System.out.println("Lines: " + lines);
    }
}`, 'Lines: 3',
    ['Avoid Files.readAllLines for inputs that may exceed available memory.', 'Process records incrementally and release large temporary objects.', 'Choose a line or byte buffer size based on the format and workload.'],
    'Do not collect every input line into a List when the task can process one line at a time.');

  add('reflection_annotations_proxies', 'class_reflection', 'Class objects and reflection',
    'Every loaded Java class has a Class object that describes its runtime type, including its name, constructors, methods and fields.',
    'Class objects let frameworks inspect types dynamically for dependency injection, serializers, tests and plugin discovery.',
    'Obtain a Class object with Type.class, object.getClass or Class.forName. Use the most direct option available; Class.forName can initialize the target class.',
    `public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> type = Class.forName("java.util.ArrayList");
        System.out.println(type.getSimpleName());
        System.out.println(type.isInterface());
    }
}`, 'ArrayList\nfalse',
    ['Class objects describe loaded runtime types.', 'Class.forName can trigger initialization.', 'Generics are mostly erased from runtime class information.'],
    'Do not use reflection when a direct interface or ordinary method call is sufficient.');

  add('reflection_annotations_proxies', 'method_field_reflection', 'Method and field inspection',
    'Reflection can inspect declared methods and fields, including their names, types and modifiers.',
    'Inspection is useful for frameworks and development tools that need to discover class metadata at runtime.',
    'Use getDeclaredMethods or getDeclaredFields for members declared on one class, and getMethods or getFields for public inherited members. Access may be restricted by Java modules.',
    `import java.lang.reflect.Field;

class Account { private int balance; }

public class Main {
    public static void main(String[] args) {
        for (Field field : Account.class.getDeclaredFields())
            System.out.println(field.getName() + ": " + field.getType().getSimpleName());
    }
}`, 'balance: int',
    ['Declared members include private members of that class.', 'Reflection access may be restricted by module boundaries.', 'Member ordering is not guaranteed.'],
    'Do not rely on the order returned by getDeclaredMethods or getDeclaredFields.');

  add('reflection_annotations_proxies', 'dynamic_class_loading', 'Dynamic class loading',
    'Dynamic class loading loads a class by name at runtime, often because the implementation is selected from configuration or a plugin directory.',
    'It lets an application discover optional implementations without directly naming each concrete class in its source code.',
    'Load through a ClassLoader, verify the expected interface, and use a documented constructor or factory. Validate origins and permissions for plugin code.',
    `public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> type = Class.forName("java.util.LinkedList");
        Object value = type.getConstructor().newInstance();
        System.out.println(value.getClass().getSimpleName());
    }
}`, 'LinkedList',
    ['Prefer ServiceLoader for standard provider discovery.', 'Check the loaded type before casting.', 'Do not load untrusted classes as if reflection made them safe.'],
    'Do not assume a class name from user input is safe to load.');

  add('reflection_annotations_proxies', 'custom_annotations', 'Custom annotations and retention',
    'An annotation attaches structured metadata to a declaration. Retention controls whether the annotation is kept in source only, in class files or at runtime.',
    'Annotations let tools and frameworks read configuration without adding separate string-based metadata files.',
    'Declare an annotation with @interface. Use @Target to restrict where it applies and @Retention(RUNTIME) when code must inspect it at runtime.',
    `import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@interface Important { }

@Important class Task { }

public class Main {
    public static void main(String[] args) {
        System.out.println(Task.class.isAnnotationPresent(Important.class));
    }
}`, 'true',
    ['SOURCE retention is removed by the compiler.', 'CLASS retention remains in the class file but is not necessarily available through runtime reflection.', 'RUNTIME retention is required for reflective lookup.'],
    'Do not use runtime retention when the annotation is only needed by a compile-time tool.');

  add('reflection_annotations_proxies', 'annotation_processing', 'Annotation processing',
    'Annotation processing runs during compilation and can inspect annotations to validate code or generate source files.',
    'It moves checks and boilerplate generation to build time instead of relying on runtime reflection.',
    'A processor implements the annotation-processing API and is discovered by the compiler. Build tools configure processor paths and generated-source directories.',
    null, null,
    ['Annotation processors run at compile time.', 'Generated code should be deterministic and reviewable.', 'Processors can slow builds and should report actionable diagnostics.'],
    'Do not confuse annotation processing with runtime reflection; they happen at different stages.',
    h2('Processor type shape') + code(`@SupportedAnnotationTypes("com.example.GenerateMapper")
public final class MapperProcessor extends AbstractProcessor {
    // Inspect annotated elements and write generated source through Filer.
}`));

  add('reflection_annotations_proxies', 'dynamic_proxies', 'Dynamic proxies',
    'A dynamic proxy creates an object at runtime that implements one or more interfaces and routes method calls to an InvocationHandler.',
    'Proxies support cross-cutting behavior such as logging, authorization checks and transaction interception without changing the target class.',
    'Create a proxy with Proxy.newProxyInstance and an InvocationHandler. The handler receives each invoked Method and its arguments.',
    `import java.lang.reflect.Proxy;

interface Greeting { String message(String name); }

public class Main {
    public static void main(String[] args) {
        Greeting proxy = (Greeting) Proxy.newProxyInstance(
            Greeting.class.getClassLoader(), new Class<?>[]{Greeting.class},
            (instance, method, values) -> "Hello, " + values[0]);
        System.out.println(proxy.message("Mina"));
    }
}`, 'Hello, Mina',
    ['JDK dynamic proxies work with interfaces.', 'Invocation handlers should preserve method contracts.', 'Use proxy libraries or bytecode tools when class proxying is required.'],
    'Do not assume a JDK dynamic proxy can subclass a concrete class; it implements interfaces.');

  add('reflection_annotations_proxies', 'reflection_performance_security', 'Reflection performance and security',
    'Reflection performs dynamic inspection or invocation and may cost more than direct calls. It can also cross access boundaries only when module and security rules allow it.',
    'Understanding the costs and access checks helps keep frameworks reliable and prevents reflective access from becoming an accidental security bypass.',
    'Cache metadata when repeated discovery is needed, use accessible public APIs, and avoid opening packages broadly just to simplify reflection.',
    null, null,
    ['Modern JVMs optimize some reflective operations, but benchmark the actual use.', 'Strong encapsulation restricts access to internal packages.', 'Reflection is not a sandbox.'],
    'Do not make private fields accessible from arbitrary application code without a deliberate design reason.',
    table(['Approach', 'Best fit'], [['Direct call', 'Known types and ordinary application logic.'], ['Reflection', 'Runtime discovery or framework infrastructure.'], ['Annotation processor', 'Validation or code generation during compilation.']]));

  add('reflection_annotations_proxies', 'avoid_reflection', 'When reflection should be avoided',
    'Reflection should be avoided when ordinary types, interfaces, generics or generated code can express the same behavior more clearly.',
    'Direct code is easier for compilers, IDEs, refactoring tools and readers to understand and validate.',
    'Use dependency injection, ServiceLoader, sealed hierarchies or explicit registries when the set of implementations or operations is known.',
    `interface Formatter { String format(String value); }

public class Main {
    public static void main(String[] args) {
        Formatter formatter = value -> value.toUpperCase();
        System.out.println(formatter.format("java"));
    }
}`, 'JAVA',
    ['Prefer compile-time checking for known relationships.', 'Reserve reflection for genuine runtime discovery needs.', 'Generated code can offer flexibility with stronger compile-time visibility.'],
    'Do not introduce reflection just to avoid writing a small explicit factory or interface.');
})();
