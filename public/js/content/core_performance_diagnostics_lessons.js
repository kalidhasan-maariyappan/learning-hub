// Focused lessons for measuring performance and diagnosing JVM applications.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, note, table, code } = JT.h;
  function add(group, id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_' + group + '_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('performance_engineering', 'big_o_applications', 'Big-O analysis in real applications',
    'Big-O describes how an operation’s work grows as input size grows. It focuses on growth rate rather than exact elapsed time.',
    'It helps predict how algorithms behave when data grows and highlights operations that may become bottlenecks.',
    'Count how often the important operation runs. A single pass is O(n), nested passes over the same input are often O(n²), and a balanced tree lookup is O(log n). Also account for memory and constants.',
    `import java.util.List;

public class Main {
    static boolean contains(List<String> values, String target) {
        for (String value : values) if (value.equals(target)) return true;
        return false;
    }
    public static void main(String[] args) {
        System.out.println(contains(List.of("a", "b", "c"), "c"));
    }
}`, 'true',
    ['Big-O describes growth, not a wall-clock promise.', 'Identify the input size and the operation being analyzed.', 'Real performance also depends on memory access, allocation and workload.'],
    'Do not optimize from Big-O alone when inputs are small or the constant costs differ greatly.',
    table(['Pattern', 'Typical growth'], [['One loop over n items', 'O(n)'], ['Two nested loops over n items', 'O(n²)'], ['Repeatedly halve the search space', 'O(log n)'], ['HashMap lookup', 'O(1) average under suitable hashing']]));

  add('performance_engineering', 'allocation_optimization', 'Allocation and memory optimization',
    'Allocation optimization reduces unnecessary object creation or retained memory when measurements show allocation is a meaningful cost.',
    'High allocation rates can increase garbage-collection work and affect latency, especially on frequently executed paths.',
    'Profile allocations first. Then remove avoidable intermediate objects, reuse expensive resources where safe, or choose a representation that fits the access pattern.',
    `public class Main {
    static String joinNames(String first, String second) {
        return new StringBuilder().append(first).append(" ").append(second).toString();
    }
    public static void main(String[] args) {
        System.out.println(joinNames("Asha", "Ben"));
    }
}`, 'Asha Ben',
    ['Measure allocation rate and retained size separately.', 'Do not reuse mutable objects across threads without coordination.', 'Modern JVMs can eliminate some short-lived allocations.'],
    'Do not replace clear code with object pools for small objects without measuring; pooling can increase memory retention and contention.');

  add('performance_engineering', 'cpu_jvm_profiling', 'CPU and JVM profiling',
    'CPU profiling samples where a program spends execution time. JVM profiling can also examine allocations, locks, threads, garbage collection and method activity.',
    'Profiling identifies the actual hot paths so optimization work targets the dominant cost.',
    'Capture a representative workload with a sampling profiler or Java Flight Recorder. Inspect hot methods, call trees and allocation or lock events, then verify a change against the same workload.',
    null, null,
    ['Profile representative production-like behavior.', 'Sampling is usually less intrusive than tracing every call.', 'Compare before and after with the same workload.'],
    'Do not infer a bottleneck from one stack sample or a synthetic workload that does not resemble production.',
    h2('JFR command shape') + code(`java -XX:StartFlightRecording=filename=app.jfr,duration=60s Main
jfr summary app.jfr`));

  add('performance_engineering', 'jit_optimization', 'JIT optimization concepts',
    'The just-in-time compiler optimizes frequently executed Java code using runtime profiling. Common optimizations include inlining, devirtualization, loop transformations and escape analysis.',
    'Understanding JIT behavior explains warm-up effects and why microbenchmarks must allow code to reach representative steady-state behavior.',
    'The JVM observes execution, compiles hot methods and may deoptimize if assumptions change. Optimization choices depend on the runtime profile and implementation.',
    null, null,
    ['JIT optimization is dynamic and workload-dependent.', 'Inlining can remove call overhead and expose more optimization opportunities.', 'Escape analysis may eliminate some allocations.'],
    'Do not assume a particular method is inlined or a particular object is stack-allocated; these are implementation decisions.');

  add('performance_engineering', 'gc_tuning', 'Garbage-collection tuning',
    'Garbage-collection tuning changes heap sizing or collector settings to improve measured latency, throughput or memory use.',
    'A suitable configuration can improve service behavior when GC is a demonstrated bottleneck.',
    'Collect GC logs and workload metrics, identify whether the problem is allocation, live-set size, pause time or memory limits, then change one setting and remeasure.',
    null, null,
    ['Start with collector defaults and measurements.', 'Heap size affects both GC behavior and process memory.', 'Different collectors trade throughput, latency and footprint differently.'],
    'Do not copy tuning flags from a different application or JDK release.',
    h2('Start with unified GC logs') + code(`java -Xlog:gc*:file=gc.log:time,uptime,level,tags -Xmx2g Main`));

  add('performance_engineering', 'threadpool_sizing', 'Thread-pool sizing',
    'Thread-pool sizing chooses how many tasks can run concurrently and how many may wait in a queue.',
    'A suitable pool can keep CPUs or I/O resources busy without overwhelming downstream systems or accumulating an unbounded backlog.',
    'Consider task CPU time, wait time, processor count, dependency limits and queue capacity. Measure throughput, latency, active workers, queue depth and rejection count.',
    null, null,
    ['CPU-bound pools often start near available processor count.', 'Blocking workloads may need more concurrent tasks, but downstream capacity still limits useful concurrency.', 'Use bounded queues and explicit rejection behavior.'],
    'Do not use one universal pool size formula for CPU work, database calls and remote I/O.',
    table(['Workload', 'Starting consideration'], [['CPU-bound', 'Keep runnable worker count near available processors, then measure.'], ['Blocking I/O', 'Allow more concurrent tasks while limiting downstream calls.'], ['Any workload', 'Bound the queue and observe latency, queueing and rejection.']]));

  add('performance_engineering', 'lock_contention', 'Lock contention analysis',
    'Lock contention occurs when multiple threads wait to acquire the same lock. It can reduce throughput and increase response time.',
    'Identifying a contended lock helps decide whether to shorten the critical section, reduce shared state or change the data partitioning.',
    'Use a profiler or JFR lock events to find the lock and call path. Measure wait time, owner work and concurrency before changing synchronization.',
    null, null,
    ['A lock may be correct but still be a throughput bottleneck.', 'Keep synchronized work small and avoid blocking I/O while holding a lock.', 'Lock striping or immutable snapshots may help some designs.'],
    'Do not remove a lock before preserving the invariant it protects.',
    h2('JFR recording example') + code(`java -XX:StartFlightRecording=filename=locks.jfr,settings=profile,duration=60s Main`));

  add('performance_engineering', 'jmh', 'JMH microbenchmarking',
    'JMH is a harness for benchmarking Java code on the JVM. It manages warm-up, repeated measurement, forks and result reporting.',
    'Microbenchmarking helps compare small operations when the benchmark is designed to reflect the question being asked.',
    'Put benchmark methods in a JMH benchmark class, configure warm-up and measurement iterations, run multiple forks, and inspect results with variance.',
    null, null,
    ['JMH is an external dependency and build tool, not part of the JDK.', 'Use forks to isolate JVM compilation state.', 'Return or consume results so the JIT cannot remove the work.'],
    'Do not time one method call with System.nanoTime in a loop and treat it as a reliable JVM benchmark.',
    note('JMH is intentionally not added as a project dependency. A benchmark requires a separate JMH-enabled project.') + code(`@Benchmark
public int addValues() {
    return 100 + 200;
}`));

  add('performance_engineering', 'jfr', 'Java Flight Recorder (JFR)',
    'Java Flight Recorder records low-overhead runtime events such as CPU samples, allocations, locks, threads and garbage collection.',
    'JFR provides a time-ordered view of application behavior that helps investigate performance and production incidents.',
    'Start a recording with JVM options, the jcmd tool or a monitoring application. Open the resulting recording in JDK Mission Control or another compatible viewer.',
    null, null,
    ['JFR is included in modern JDK distributions.', 'Recording settings determine event detail and overhead.', 'Protect recordings because they may contain sensitive data.'],
    'Do not assume one short recording represents all workload phases.',
    h2('Start and inspect a recording') + code(`jcmd <pid> JFR.start name=profile settings=profile duration=60s filename=app.jfr
jfr summary app.jfr`));

  add('performance_engineering', 'visualvm_jconsole', 'VisualVM and JConsole',
    'VisualVM and JConsole are JDK-related monitoring tools that can inspect JVM processes, memory, threads and management data.',
    'They provide interactive views that help developers observe local or remotely configured JVM behavior.',
    'Connect to a JVM process with appropriate permissions, inspect the needed metrics or threads, and use a profiler or dump only when necessary.',
    null, null,
    ['Tool availability varies by JDK distribution.', 'Remote monitoring needs secure JMX configuration.', 'A profiler can add overhead.'],
    'Do not expose unauthenticated JMX ports to an untrusted network.',
    note('These are external diagnostic tools. JavaTrail does not bundle them or connect to a running process from lesson pages.'));

  add('performance_engineering', 'benchmark_pitfalls', 'Benchmarking pitfalls',
    'Benchmarking pitfalls are design choices that make a performance test measure something other than the application behavior of interest.',
    'Avoiding these pitfalls prevents teams from optimizing based on misleading numbers.',
    'Use representative inputs, warm up the JVM, separate setup from measured work, avoid dead-code elimination, repeat runs and report variance.',
    null, null,
    ['Warm-up and JIT compilation affect timings.', 'Garbage collection and CPU frequency can add noise.', 'Measure end-to-end behavior as well as isolated operations.'],
    'Do not compare results from different machines, JDK versions or workloads as if only one code change differed.',
    table(['Pitfall', 'Better practice'], [['One run', 'Repeat measurements and report variance.'], ['Tiny artificial input', 'Use representative data sizes and distributions.'], ['Unused result', 'Consume or return benchmark results.'], ['Mixed setup and work', 'Separate setup from measured operation.']]));

  add('debugging_diagnostics', 'stack_traces', 'Reading complex stack traces',
    'A stack trace lists the method calls active when an exception was created or thrown. The top frames are closest to the throw site; later frames show callers.',
    'Reading from the failure outward helps identify the failing operation and the application path that led to it.',
    'Find the exception type and message, inspect the first relevant application frame, follow the cause chain, and distinguish framework frames from your code.',
    `public class Main {
    static void parse() { throw new IllegalArgumentException("bad input"); }
    static void service() { parse(); }
    public static void main(String[] args) {
        try { service(); }
        catch (IllegalArgumentException error) {
            System.out.println(error.getClass().getSimpleName());
            System.out.println(error.getStackTrace()[0].getMethodName());
        }
    }
}`, 'IllegalArgumentException\nparse',
    ['Read the exception type and message first.', 'Follow Caused by sections to the root cause.', 'Line numbers identify source locations for the compiled class.'],
    'Do not focus only on the last stack frame; it often shows the thread entry point, not the failure.');

  add('debugging_diagnostics', 'debugger_breakpoints', 'Debugger breakpoints and watch expressions',
    'A breakpoint pauses program execution at a chosen location. A watch expression evaluates a value while execution is paused.',
    'Debuggers let developers inspect state and step through control flow without adding temporary print statements.',
    'Set a breakpoint, run the program in debug mode, inspect the call stack and variables, then step over, into or out of a method. Conditional breakpoints pause only when a condition is true.',
    null, null,
    ['Use conditional breakpoints for frequently visited loops.', 'Watch expressions should avoid changing state.', 'Debugger timing can affect concurrent behavior.'],
    'Do not assume a race condition that disappears under a debugger has been fixed; the pause changes thread timing.');

  add('debugging_diagnostics', 'heap_dump_analysis', 'Heap-dump analysis',
    'Heap-dump analysis inspects objects and references captured from a JVM to find large retained graphs, duplicate data or leaks.',
    'It helps answer which objects occupy memory and what reference path keeps them reachable.',
    'Inspect dominator trees, retained size and paths to GC roots. Compare dumps from different times when investigating growth.',
    null, null,
    ['Shallow size is the object itself; retained size includes objects it keeps reachable.', 'Look for unexpected owners such as static caches or listeners.', 'Heap dumps can contain sensitive data.'],
    'Do not assume the largest object is the cause; find the retaining path and growth pattern.',
    note('Capture and command examples are in the <a href="' + JT.url('java_ca_jvm_memory_gc_heap_dump_profiling') + '">Heap dumps and memory profiling</a> lesson.'));

  add('debugging_diagnostics', 'thread_dump_analysis', 'Thread-dump analysis',
    'A thread dump records thread names, states, stack traces and often lock information at a point in time.',
    'It helps identify blocked requests, deadlocks, thread-pool saturation and threads waiting on external work.',
    'Capture multiple dumps a short time apart. Compare states and stack traces to see which threads progress, remain blocked or repeatedly wait.',
    null, null,
    ['One dump is a snapshot; repeated dumps reveal whether a thread is stuck.', 'Look for blocked threads and lock owners.', 'Thread names help connect stacks to executors and request types.'],
    'Do not diagnose a deadlock from a thread in WAITING state alone; inspect the lock cycle.');

  add('debugging_diagnostics', 'deadlock_detection', 'Deadlock detection',
    'Deadlock detection looks for a cycle where each thread waits for a lock held by another thread in that cycle.',
    'Finding the lock cycle identifies which acquisition order or critical sections prevent progress.',
    'Use jstack, jcmd Thread.print or a monitoring tool to capture thread and lock ownership. Look for a JVM deadlock report or trace the cycle manually.',
    null, null,
    ['A deadlock is a cycle, not simply a long wait.', 'Acquire locks in a consistent global order to reduce risk.', 'Use timeouts or lock avoidance where appropriate.'],
    'Do not attempt to “fix” a deadlock by killing an arbitrary thread; release and recovery semantics may be unsafe.',
    code(`jcmd <pid> Thread.print
jstack <pid>`));

  add('debugging_diagnostics', 'jvm_cli_tools', 'jstack, jmap and jcmd',
    'jstack, jmap and jcmd are command-line tools for inspecting a running Java process. jcmd provides diagnostic commands; jstack captures threads; jmap can inspect heap-related state.',
    'These tools provide evidence about a JVM without requiring application code changes.',
    'Find the target process ID, check supported commands with jcmd, then capture the smallest useful diagnostic artifact. Tool availability and exact options can vary by JDK.',
    null, null,
    ['Prefer jcmd where it provides the needed command.', 'Heap dumps and some diagnostics can affect the target process.', 'Use a compatible JDK and suitable operating-system permissions.'],
    'Do not run a destructive or high-impact diagnostic command on production without understanding its effect.',
    code(`jcmd <pid> help
jcmd <pid> Thread.print
jcmd <pid> GC.heap_dump ./heap.hprof`));

  add('debugging_diagnostics', 'jvm_monitoring', 'JVM monitoring',
    'JVM monitoring observes process health through memory, garbage collection, thread, class loading and runtime metrics.',
    'Monitoring can reveal changes before users report a failure and provide context during incident investigation.',
    'Use JMX, JFR, application metrics or an approved monitoring agent. Correlate JVM metrics with request latency, errors and dependency health.',
    null, null,
    ['Monitor trends and saturation, not only current values.', 'JVM metrics need application-level context.', 'Secure remote management endpoints.'],
    'Do not expose unauthenticated JMX access on a public or untrusted network.',
    table(['Signal', 'What it can reveal'], [['Heap after GC', 'Growing live set or retention.'], ['Thread count and states', 'Pool growth, blocking or deadlock.'], ['GC pause and allocation', 'Memory pressure or allocation churn.'], ['Class count', 'Dynamic loading or class-loader retention.']]));

  add('debugging_diagnostics', 'structured_logging', 'Structured application logging',
    'Structured logging records events as named fields such as timestamp, level, request ID, operation and outcome instead of embedding everything in free-form text.',
    'Structured fields make logs easier to search, aggregate and correlate across services.',
    'Use a maintained logging framework and emit consistent fields. Include a correlation identifier while excluding passwords, tokens and unnecessary personal data.',
    `public class Main {
    public static void main(String[] args) {
        String requestId = "r-104";
        String outcome = "accepted";
        System.out.println("event=order_created requestId=" + requestId + " outcome=" + outcome);
    }
}`, 'event=order_created requestId=r-104 outcome=accepted',
    ['Use stable field names and values.', 'Include enough context to connect related events.', 'Redact credentials and sensitive data.'],
    'Do not log secrets or rely on parsing unstable human sentences for production metrics.');

  add('debugging_diagnostics', 'production_incidents', 'Production incident diagnosis',
    'Production incident diagnosis is the process of narrowing a live service failure using symptoms, telemetry and controlled investigation.',
    'A repeatable process reduces guesswork and helps restore service while preserving evidence for a later root-cause analysis.',
    'Confirm user impact and time window, compare recent changes, inspect service and dependency metrics, capture relevant logs or JVM artifacts, form a testable hypothesis, and verify recovery.',
    null, null,
    ['Protect customer data when collecting diagnostic artifacts.', 'Record timestamps and versions with dumps and logs.', 'Mitigate impact before pursuing a perfect explanation.'],
    'Do not make several unrelated production changes at once; it becomes difficult to know what fixed or worsened the incident.',
    '<figure class="concept-diagram" aria-label="Production incident workflow"><figcaption><strong>Incident investigation flow</strong><span>Start with impact, then use evidence to test one explanation at a time.</span></figcaption><div class="concept-flow"><div class="flow-node"><b>Impact</b><small>users and scope</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Evidence</b><small>metrics and logs</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Hypothesis</b><small>test the cause</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Mitigate</b><small>verify recovery</small></div></div></figure>');
})();
