// Focused lessons for JVM memory areas, reachability, garbage collection and diagnosis.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, table, code } = JT.h;
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_jvm_memory_gc_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('stack_heap_frames', 'Stack frames vs heap objects',
    'Each Java thread has a stack of method frames. A frame holds method execution data such as local variables and intermediate results. Objects are generally allocated on the shared heap, while local reference variables hold references to them.',
    'This distinction helps explain per-thread call state, object sharing, memory use and why stack overflows differ from heap exhaustion.',
    'A method call pushes a frame. Returning removes it. The object referenced by a local variable may continue to exist after that method returns if another live reference still reaches it.',
    `class Box { int value; Box(int value) { this.value = value; } }

public class Main {
    static Box makeBox() {
        int localNumber = 42;
        return new Box(localNumber);
    }
    public static void main(String[] args) {
        Box box = makeBox();
        System.out.println(box.value);
    }
}`, '42',
    ['Each thread has its own Java stack.', 'Heap objects can be referenced by multiple threads.', 'A local reference leaving scope does not by itself prove the object is unreachable.'],
    'Do not say that every local variable is always stored on the physical stack; JIT optimizations can change implementation details.');

  add('object_lifecycle', 'Object allocation and lifecycle',
    'An object is created when code constructs it, becomes usable after initialization, and may later become eligible for garbage collection when it is unreachable.',
    'Understanding the lifecycle helps prevent accidental retention and makes allocation costs easier to reason about.',
    'The JVM allocates and initializes the object, references keep it reachable, and a collector may reclaim its memory after no live path from a garbage-collection root reaches it.',
    `class Session { final String id; Session(String id) { this.id = id; } }

public class Main {
    static Session create() { return new Session("s-12"); }
    public static void main(String[] args) {
        Session session = create();
        System.out.println(session.id);
    }
}`, 's-12',
    ['Allocation does not imply that collection happens soon.', 'A reachable object is not eligible for ordinary garbage collection.', 'Finalization is deprecated for removal; do not use it for resource cleanup.'],
    'Do not depend on System.gc() or a particular collection time to release files, sockets or database connections. Use try-with-resources.');

  add('gc_roots', 'Garbage collection roots',
    'Garbage-collection roots are references the collector treats as starting points for finding live objects. They include references from active thread stacks and static state, along with JVM-specific roots.',
    'Root reachability explains why an object can remain in memory even when application code no longer considers it useful.',
    'The collector starts from roots and follows references. Objects reached by this traversal are live for that collection cycle; unvisited objects may be reclaimed.',
    null, null,
    ['A static collection can keep all of its elements reachable.', 'A thread-local value can remain reachable as long as a pooled thread lives.', 'Reachability is not the same as business-level usefulness.'],
    'Do not assume setting one local variable to null frees an object if another reference still points to it.',
    '<figure class="concept-diagram" aria-label="Garbage collector reachability"><figcaption><strong>How the collector finds live objects</strong><span>Objects reachable from roots remain live.</span></figcaption><div class="concept-flow"><div class="flow-node"><b>Roots</b><small>stacks, statics, JVM</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>References</b><small>trace object links</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Reachable</b><small>kept live</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Unreachable</b><small>eligible for collection</small></div></div></figure>');

  add('generational_gc', 'Generational garbage collection',
    'Generational garbage collection organizes heap objects by age, based on the observation that many objects become unreachable soon after allocation while some live much longer.',
    'Collecting young objects frequently can reclaim short-lived allocations without scanning the entire heap on every collection.',
    'Collectors may promote surviving objects into older regions or generations. Exact generation layout and collection behavior depend on the selected collector and JVM version.',
    null, null,
    ['Generational behavior is based on common object-lifetime patterns.', 'Surviving objects may be promoted.', 'Modern collectors can implement generations differently.'],
    'Do not assume every garbage collector has the same fixed young/old heap layout or promotion thresholds.',
    table(['Term', 'Meaning'], [['Young objects', 'Recently allocated objects, many of which may die quickly.'], ['Survivors', 'Objects that remain reachable across collections.'], ['Promotion', 'Moving or treating a survivor as older-generation data.']]));

  add('g1_gc', 'G1 GC',
    'G1 (Garbage-First) is a regional, generational garbage collector designed to balance throughput and pause-time goals. It became the default collector in HotSpot starting with JDK 9.',
    'G1 is a general-purpose choice for many server applications because it can collect selected regions instead of requiring every collection to process the whole heap.',
    'G1 divides the heap into regions, tracks their live data, and prioritizes regions with more reclaimable space while respecting its pause-time target as a goal, not a guarantee.',
    null, null,
    ['G1 is the default collector in common HotSpot JDKs since Java 9.', 'A pause-time goal is not a hard real-time guarantee.', 'Observe actual pauses and allocation behavior before tuning.'],
    'Do not switch collectors based only on a generic benchmark; test the application’s heap size, allocation rate and latency needs.',
    h2('Command-line example') + code(`// Start a program with G1 explicitly selected:
// java -XX:+UseG1GC -Xmx1g Main
// Observe collection details:
// java -Xlog:gc* Main`));

  add('z_gc', 'ZGC',
    'ZGC is a scalable low-latency garbage collector. It became a production feature in JDK 15; generational ZGC became a final feature in JDK 21.',
    'ZGC is designed for applications that need low pause times across large heaps, while still requiring workload-specific measurement.',
    'ZGC performs much of its work concurrently with application threads. The JVM version determines supported modes and options, so check the exact runtime documentation.',
    null, null,
    ['ZGC is not automatically faster for every workload.', 'Generational ZGC became a final feature in Java 21.', 'Java 24 made generational mode the default and removed the ZGenerational flag.'],
    'Do not compare collector pause claims without measuring throughput, allocation and end-to-end latency together.',
    h2('Version-specific commands') + code(`// Select ZGC on a supported JDK:
// java -XX:+UseZGC -Xmx4g Main
// Java 21–23: enable generational mode with -XX:+ZGenerational.
// Java 24+: generational mode is the default and ZGenerational was removed.`));

  add('reference_types', 'Strong, soft, weak and phantom references',
    'A strong reference keeps an object reachable normally. Soft, weak and phantom references provide different relationships that can be observed through their associated ReferenceQueue and garbage-collection behavior.',
    'These reference types support use cases such as weak-key associations and cleanup tracking, but they do not replace explicit resource management.',
    'A weakly reachable object may be cleared when the collector processes it. Soft references are treated more leniently but are not a reliable cache policy. Phantom references are used with queues to observe post-mortem cleanup eligibility.',
    `import java.lang.ref.WeakReference;

public class Main {
    public static void main(String[] args) {
        String value = new String("temporary");
        WeakReference<String> reference = new WeakReference<>(value);
        System.out.println(reference.get() != null);
    }
}`, 'true',
    ['Reference processing is tied to collector behavior and timing.', 'WeakReference.get may later return null.', 'Use try-with-resources for files and sockets, not reference queues.'],
    'Do not force garbage collection in a test and assume a soft or weak reference will clear at one exact time.');

  add('gc_memory_leaks', 'Memory leaks in garbage-collected applications',
    'A memory leak in a garbage-collected application occurs when objects that are no longer useful remain reachable, so the collector cannot reclaim them.',
    'Leaks can grow heap usage, increase collection work and eventually cause long pauses or OutOfMemoryError.',
    'Common causes include static collections that grow without bounds, listeners that are never removed, unbounded caches, and ThreadLocal values left in pooled threads.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    private static final List<byte[]> retained = new ArrayList<>();
    public static void main(String[] args) {
        retained.add(new byte[1024]);
        System.out.println("Retained items: " + retained.size());
    }
}`, 'Retained items: 1',
    ['A leak is about unintended reachability, not merely a high allocation rate.', 'Use heap dominator analysis to find objects retaining large graphs.', 'Bound caches and remove listeners when their owner is finished.'],
    'Do not try to fix a leak by calling System.gc() repeatedly. Find and remove the unwanted retaining reference.');

  add('outofmemoryerror', 'OutOfMemoryError scenarios',
    'OutOfMemoryError means the JVM could not satisfy a memory allocation request. It can result from heap exhaustion, excessive native memory use, too many threads or other limits.',
    'Identifying the type and context of the error points to the right resource limit and diagnostic artifact.',
    'Read the full message and logs, capture a heap dump when possible, and compare live data, allocation rate, thread count and JVM limits. The recovery safety depends on what failed.',
    null, null,
    ['OutOfMemoryError is an Error, not an ordinary recoverable exception.', 'Heap exhaustion is only one possible memory failure.', 'A heap dump can contain sensitive data.'],
    'Do not catch OutOfMemoryError and continue normal work unless the application has a carefully designed emergency strategy.',
    h2('Diagnostic startup options') + code(`java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./dumps Main
java -Xmx2g Main`));

  add('stackoverflowerror', 'StackOverflowError analysis',
    'StackOverflowError occurs when a thread uses more stack space than the configured limit, often because of unbounded recursion or very deep call chains.',
    'Recognizing the call pattern helps distinguish stack exhaustion from heap memory pressure.',
    'Inspect the repeating frames in the stack trace. Fix missing recursion base cases or convert deep recursion to an iterative algorithm where appropriate.',
    null, null,
    ['StackOverflowError is usually specific to one thread’s stack.', 'A repeating stack trace often identifies recursive cycles.', 'Increasing -Xss may delay failure but does not fix unbounded recursion.'],
    'Do not present a recursive function with no termination condition as a safe runnable example.',
    h2('Unsafe recursion example') + code(`static int sumDown(int value) {
    if (value == 0) return 0;
    return value + sumDown(value - 1);
}
// Deep input can exhaust the thread stack; use an iterative loop for unbounded depth.`));

  add('heap_dump_profiling', 'Heap dumps and memory profiling',
    'A heap dump records objects and references in the heap at a point in time. A profiler can show allocation rates, retaining paths and which objects dominate memory.',
    'Heap analysis helps find retained object graphs and distinguish a leak from a legitimate large working set.',
    'Capture a dump under a useful workload, inspect dominators and paths to GC roots, and compare snapshots to see what continues to grow.',
    null, null,
    ['A heap dump can pause or stress an application.', 'Dumps may contain credentials or customer data.', 'Compare more than one snapshot when looking for growth.'],
    'Do not share heap dumps publicly; they can contain private application data.',
    h2('Capture command') + code(`jcmd <pid> GC.heap_dump ./heap.hprof
# Open the file with a compatible heap analyzer.`));

  add('gc_logs_tuning', 'GC logs and tuning',
    'GC logging records garbage-collection events, pauses, heap changes and collector activity. Tuning changes JVM options based on those measurements.',
    'Logs help determine whether pauses, allocation pressure, promotion or heap sizing contribute to a performance problem.',
    'Enable unified logging, collect it during representative load, inspect pause and allocation patterns, and change one relevant setting at a time.',
    null, null,
    ['Record the JDK version and full JVM flags with the logs.', 'Measure both pause time and throughput.', 'Avoid copying tuning values from a different workload.'],
    'Do not tune from one isolated pause or an unrepresentative local run.',
    h2('Java 9+ unified logging') + code(`java -Xlog:gc*:file=gc.log:time,uptime,level,tags Main
# Review the log before changing heap or collector options.`));
})();
