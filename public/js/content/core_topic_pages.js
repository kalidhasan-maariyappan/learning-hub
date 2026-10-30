// Section overview pages for Java Core Advanced. Like a W3Schools chapter intro,
// each one gives a short introduction and lists the lessons in the section.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul } = JT.h;
  const esc = JT.esc;
  const overviewSlug = {
    runtime_compilation: 'java_ca_group_runtime_compilation', object_internals: 'java_ca_oop',
    hashmap_internals: 'java_ca_collections', advanced_collections: 'java_ca_group_advanced_collections',
    generics_internals: 'java_ca_generics', advanced_exceptions: 'java_ca_exceptions',
    threading_fundamentals: 'java_ca_concurrency', executors_async: 'java_ca_group_executors_async',
    synchronization_utilities: 'java_ca_group_synchronization_utilities', functional_programming: 'java_ca_functional',
    jvm_memory_gc: 'java_ca_memory_gc', modern_java: 'java_ca_modern', advanced_io_nio: 'java_ca_io_nio',
    reflection_annotations_proxies: 'java_ca_reflection', datetime_networking: 'java_ca_datetime',
    performance_engineering: 'java_ca_performance',
    debugging_diagnostics: 'java_ca_diagnostics', patterns_jdbc: 'java_ca_patterns',
  };
  const explanations = {
    runtime_compilation: {
      intro: 'Java programs move through source code, bytecode, class loading, and JVM execution. These lessons explain what happens at each stage and how the runtime uses it.',
      why: 'Understanding the runtime helps you diagnose startup, classpath, compatibility, visibility and performance issues instead of treating the JVM as a black box.',
      points: ['Separate compile-time work from run-time work.', 'Class loading, linking and initialization are related but distinct phases.', 'JIT decisions depend on the running workload.'],
    },
    object_internals: {
      intro: 'Java variables may hold primitive values or references to objects. Identity, equality, copying and mutability determine whether two references describe the same object or equivalent data.',
      why: 'These rules matter when objects are compared, copied, stored as map keys, shared between callers or retained in memory.',
      points: ['Use equals() for logical equality and == for reference identity.', 'Equal objects must have equal hash codes.', 'Prefer immutable state when objects are shared or used as keys.'],
    },
    hashmap_internals: {
      intro: 'HashMap stores key-value pairs in a table of buckets. A key hash narrows the search to a bucket, and equality identifies the matching key there.',
      why: 'Knowing this behavior helps explain lookup speed, collisions, resizing, key requirements and why changing a key after insertion breaks lookups.',
      points: ['HashMap iteration order is unspecified.', 'Collisions are handled within a bucket.', 'Never mutate fields used by a key’s equals() or hashCode() while it is stored.'],
    },
    advanced_collections: {
      intro: 'Java collection implementations trade off ordering, lookup speed, insertion cost, memory and concurrency behavior.',
      why: 'Choosing a collection by its operations and guarantees helps avoid slow list traversal, accidental ordering assumptions and unsafe concurrent access.',
      points: ['ArrayList gives fast indexed access; LinkedList indexed access is linear.', 'TreeMap keeps keys sorted.', 'Fail-fast behavior detects some bugs but does not make a collection thread-safe.'],
    },
    generics_internals: {
      intro: 'Generics let Java express and check relationships between types at compile time. Wildcards and bounds describe safe ways to read from and write to values of related types.',
      why: 'Generics reduce casts and runtime type errors while allowing reusable classes and methods.',
      points: ['Use bounded type parameters to require capabilities.', 'Use extends for producers and super for consumers.', 'Raw types and unsafe generic varargs can cause heap pollution.'],
    },
    advanced_exceptions: {
      intro: 'Exceptions carry failure information up the call stack. Good exception handling adds useful context, preserves the original cause and handles only failures a layer can meaningfully recover from.',
      why: 'Clear exception boundaries make errors easier to diagnose and prevent low-level implementation details from leaking through every application layer.',
      points: ['Catch exceptions only when you can recover, translate or add useful context.', 'Preserve the original cause when wrapping.', 'Errors usually represent serious JVM or environment problems, not ordinary recovery cases.'],
    },
    threading_fundamentals: {
      intro: 'A thread is an independent path of execution. When threads share mutable state, correctness depends on coordinating access and making updates visible.',
      why: 'Concurrency lets applications handle overlapping work, but unsynchronized shared state can produce intermittent and difficult-to-reproduce bugs.',
      points: ['A race condition depends on timing between threads.', 'Visibility and atomicity are different guarantees.', 'Interruption is a cooperative signal that code should handle or preserve.'],
    },
    executors_async: {
      intro: 'Executor APIs separate task submission from the threads that perform the work. Futures represent results that may become available later.',
      why: 'Executors make thread reuse, bounded capacity, scheduling, cancellation and asynchronous composition easier to manage than creating threads manually.',
      points: ['Choose queue and pool limits together.', 'Handle task failures when retrieving or composing results.', 'Virtual threads suit many blocking tasks; they do not make CPU-heavy work faster.'],
    },
    synchronization_utilities: {
      intro: 'Java synchronization tools coordinate access to shared state or allow threads to wait for events. Different tools provide different combinations of exclusion, visibility and coordination.',
      why: 'The right primitive can prevent lost updates, bound resource use, or let worker threads coordinate without busy-waiting.',
      points: ['volatile provides visibility but not atomic read-modify-write.', 'Locks must be released reliably, usually in finally.', 'ThreadLocal values need cleanup in pooled threads.'],
    },
    functional_programming: {
      intro: 'Functional-style Java represents behavior with functions and composes operations over data. Streams describe a pipeline that can transform and aggregate a source.',
      why: 'Lambdas and streams can make data transformations more direct, especially when each step has a clear input and output.',
      points: ['A stream is not a collection and is normally consumed once.', 'Parallel streams use shared execution resources and need suitable workloads.', 'Optional represents a possibly absent result; it is not a general replacement for every field or parameter.'],
    },
    jvm_memory_gc: {
      intro: 'Each Java thread has its own stack of method frames, while objects are generally allocated on the shared heap. Garbage collection reclaims heap objects that can no longer be reached.',
      why: 'Knowing object reachability, collection behavior and memory diagnostics helps explain high memory use, leaks and out-of-memory failures.',
      points: ['Garbage collection does not prevent memory leaks caused by retained references.', 'Heap and stack exhaustion have different causes.', 'Tune only after using measurements such as GC logs or a heap dump.'],
    },
    modern_java: {
      intro: 'Modern Java releases add language and platform features that reduce boilerplate or improve safety. Each feature has a minimum release, and some newer concurrency APIs remain preview features.',
      why: 'Knowing feature versions helps developers choose clear language constructs while keeping builds compatible with their supported JDKs.',
      points: ['Records model data transparently.', 'Sealed types restrict permitted subtypes.', 'Scoped Values are final in Java 25; Structured Concurrency remains preview in Java 25.'],
    },
    advanced_io_nio: {
      intro: 'Java I/O APIs move bytes and characters between programs and files, sockets or other streams. NIO adds paths, channels, buffers and non-blocking operations.',
      why: 'Choosing the right I/O abstraction can improve throughput, handle large files safely and avoid data corruption caused by incorrect character decoding.',
      points: ['Bytes are not characters; specify a charset for text.', 'Close resources deterministically.', 'Serialization formats need compatibility and security review.'],
    },
    reflection_annotations_proxies: {
      intro: 'Reflection inspects classes and members at runtime. Annotations attach metadata, and dynamic proxies can intercept interface calls.',
      why: 'Frameworks use these features for dependency injection, testing, serialization and interception, while ordinary application code often benefits from direct calls instead.',
      points: ['Reflection can be slower and harder to analyze than direct calls.', 'Module boundaries may restrict reflective access.', 'Use compile-time checks or ordinary interfaces when runtime discovery is unnecessary.'],
    },
    datetime_networking: {
      intro: 'The modern date/time API separates calendar dates, local wall-clock values and timeline instants. The Java HTTP Client sends HTTP requests and reads responses, synchronously or asynchronously.',
      why: 'The distinction prevents timezone bugs and keeps HTTP calls bounded by timeouts instead of hanging.',
      points: ['A LocalDateTime has no time zone or offset.', 'Use Period for calendar dates and Duration for elapsed time.', 'Use HTTPS with certificate validation for protected HTTP traffic.'],
    },
    performance_engineering: {
      intro: 'Performance engineering measures where time and memory go, then changes the dominant cost. Big-O describes how work grows with input size, while profilers reveal actual runtime behavior.',
      why: 'Measurement prevents teams from optimizing code that is not limiting the application and helps validate whether a change improves the real workload.',
      points: ['Use JMH for JVM microbenchmarks.', 'Use JFR or a profiler to investigate production-like behavior.', 'Avoid drawing conclusions from one noisy timing run.'],
    },
    debugging_diagnostics: {
      intro: 'Diagnostics combine symptoms, logs, stack traces, thread dumps, heap dumps and JVM metrics to explain what an application was doing when a problem occurred.',
      why: 'A repeatable diagnostic process helps distinguish an application bug, blocked thread, memory-retention problem or dependency failure during incidents.',
      points: ['A stack trace shows the call path at a failure point.', 'Thread dumps can reveal blocked locks and deadlocks.', 'Heap dumps may contain sensitive application data; handle them carefully.'],
    },
    patterns_jdbc: {
      intro: 'Design patterns name reusable object collaborations. JDBC is the standard Java API for working with relational databases through drivers, connections, statements and result sets.',
      why: 'Patterns help communicate structure, while JDBC knowledge helps applications bind parameters safely and control transaction and resource lifecycles.',
      points: ['A pattern is a design vocabulary, not a required class hierarchy.', 'Use PreparedStatement for values supplied to SQL.', 'Use transactions when several updates must succeed or fail together.'],
    },
  };

  for (const [groupId, groupTitle, topics] of JT.coreAdvGroups) {
    const info = explanations[groupId];
    const lessons = topics.map(([topicId, title]) => [JT.coreAdvTopicSlug(groupId, topicId), title]);
    JT.def(overviewSlug[groupId], {
      title: groupTitle,
      h1: 'Java <span>' + esc(groupTitle) + '</span>',
      body: () => [
        h2(esc(groupTitle)), p(info.intro), p(info.why),
        '<div class="note"><p><strong>In this section</strong></p>' + ul(info.points) + '</div>',
        h2('Lessons'),
        '<ol class="topic-link-list">' + lessons.map(([slug, title]) => '<li><a href="' + JT.url(slug) + '">' + esc(title) + '</a></li>').join('') + '</ol>',
        '<p><a class="btn" href="' + JT.url(lessons[0][0]) + '">Start with ' + esc(lessons[0][1]) + ' ❯</a></p>',
      ].join(''),
    });
  }
})();
