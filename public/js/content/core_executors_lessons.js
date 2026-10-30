// Focused lessons for task executors, futures and asynchronous Java.
(function () {
  'use strict';
  const JT = window.JT;
  const { note, table } = JT.h;
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_executors_async_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('executor_service', 'Executor and ExecutorService',
    'Executor is a small interface that accepts a task for execution. ExecutorService adds lifecycle management, task submission, Futures and shutdown operations.',
    'An executor separates task code from thread creation and management. This makes it easier to reuse workers and stop an application cleanly.',
    'Submit a Runnable or Callable to the service. The service decides when and on which worker the task runs. Shut it down when no more tasks should be accepted.',
    `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            pool.submit(() -> System.out.println("Task completed")).get();
        } finally {
            pool.shutdown();
            pool.awaitTermination(1, TimeUnit.SECONDS);
        }
    }
}`, 'Task completed',
    ['Executor executes tasks; ExecutorService also manages lifecycle and results.', 'Always define who owns shutdown.', 'Use try/finally so shutdown occurs when task code fails.'],
    'Do not create an executor and forget to shut it down; its worker threads can keep the JVM alive.');

  add('execute_submit', 'execute() vs submit()',
    '<code>execute(Runnable)</code> submits a task without returning a result. <code>submit</code> returns a Future and can accept either Runnable or Callable.',
    'The choice affects how the caller observes task completion and exceptions.',
    'Use execute when no result handle is needed. Use submit when you need to wait, cancel, or retrieve a result. Exceptions from a submitted task are normally observed through Future.get().',
    `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            pool.execute(() -> System.out.println("execute task"));
            Future<Integer> result = pool.submit(() -> 6 * 7);
            System.out.println("submit result: " + result.get());
        } finally { pool.shutdown(); }
    }
}`, 'execute task\nsubmit result: 42',
    ['execute returns void.', 'submit returns a Future.', 'A task submitted with submit may fail without printing a stack trace on the worker thread; inspect its Future.'],
    'Do not assume exceptions from submit are automatically printed. Calling get exposes them wrapped in ExecutionException.');

  add('future_task', 'Future and FutureTask',
    'Future represents a result that may become available later. FutureTask is a concrete Future that can wrap a Callable or Runnable and can itself be run by a thread or executor.',
    'A Future lets code wait for a result, check completion, or request cancellation without blocking at submission time.',
    'Call get to wait for completion and retrieve the value. Calling cancel requests cancellation; whether the task stops depends on interruption handling and the task implementation.',
    `import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class Main {
    public static void main(String[] args) throws Exception {
        Callable<Integer> work = () -> 20 + 22;
        FutureTask<Integer> task = new FutureTask<>(work);
        new Thread(task).start();
        System.out.println(task.get());
    }
}`, '42',
    ['get blocks until the result is ready.', 'A cancelled task may not have stopped if it ignores interruption.', 'ExecutionException wraps a failure thrown by the task.'],
    'Do not call get immediately after every submission if the goal was to overlap independent work; submit first, then collect results.');

  add('threadpoolexecutor', 'ThreadPoolExecutor internals',
    'ThreadPoolExecutor is a configurable executor with worker threads, a task queue, size limits and a rejection policy.',
    'It is useful when the application needs to control concurrency and queue growth instead of relying on a convenience factory’s defaults.',
    'When a task arrives, the executor may start a core worker, enqueue the task, create a worker up to the maximum size, or reject it if capacity is exhausted.',
    `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws Exception {
        var pool = new ThreadPoolExecutor(1, 2, 1, TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(2));
        try {
            pool.submit(() -> System.out.println("Workers: " + pool.getPoolSize())).get();
        } finally { pool.shutdown(); }
    }
}`, 'Workers: 1',
    ['ThreadPoolExecutor controls workers, queueing, keep-alive and rejection.', 'A bounded queue limits pending work.', 'Monitor active count, queue depth and rejected tasks in real applications.'],
    'Do not treat an unbounded queue as unlimited capacity; it can consume memory until the process fails.');

  add('pool_sizing_queue', 'Core pool size, maximum pool size and queue',
    'Core pool size is the normal worker target. Maximum pool size is an upper bound. The queue holds tasks waiting for a worker.',
    'Together, these settings determine how much work can run, how much can wait, and when overload is reported.',
    'With ThreadPoolExecutor, tasks are generally assigned to core workers first, then queued. Additional workers are created up to the maximum when the queue cannot accept more work.',
    null, null,
    ['Bound the queue when overload must be visible.', 'A larger pool can increase contention and downstream pressure.', 'Size pools according to workload and measured service time.'],
    'Do not pick a pool size from processor count alone for blocking workloads; measure CPU use, wait time and downstream limits.',
    table(['Setting', 'Controls', 'Risk if poorly chosen'], [['Core size', 'Normal worker count', 'Too few can limit throughput; too many can add contention.'], ['Maximum size', 'Burst concurrency ceiling', 'Too high can overload dependencies.'], ['Queue capacity', 'Pending work backlog', 'Unbounded queues can grow until memory is exhausted.']]));

  add('rejection_policies', 'Rejection policies',
    'A rejection policy decides what happens when a ThreadPoolExecutor cannot accept another task because worker and queue capacity are exhausted or the executor is shut down.',
    'A visible rejection lets the application apply backpressure, fail fast or route work elsewhere instead of silently accumulating overload.',
    'Common policies include AbortPolicy, CallerRunsPolicy, DiscardPolicy and DiscardOldestPolicy. Pick one based on the application’s delivery guarantees.',
    `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        var pool = new ThreadPoolExecutor(1, 1, 0, TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(1), new ThreadPoolExecutor.AbortPolicy());
        pool.shutdown();
        try { pool.execute(() -> { }); }
        catch (RejectedExecutionException error) { System.out.println("Task rejected"); }
    }
}`, 'Task rejected',
    ['AbortPolicy reports rejection with RejectedExecutionException.', 'CallerRunsPolicy can apply backpressure but changes which thread runs the task.', 'Discard policies lose work and need explicit justification.'],
    'Do not choose a discard policy for tasks that must not be lost. Make overload behavior part of the service contract.');

  add('scheduled_executor', 'ScheduledExecutorService',
    'ScheduledExecutorService runs a task after a delay or repeatedly at a fixed rate or with a fixed delay.',
    'It is useful for time-based work such as periodic cleanup, refreshing data or delayed retries without manually sleeping a thread.',
    'schedule runs once after a delay. scheduleAtFixedRate targets a regular cadence; scheduleWithFixedDelay waits between one run finishing and the next starting.',
    `import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws Exception {
        var scheduler = Executors.newSingleThreadScheduledExecutor();
        try {
            var task = scheduler.schedule(() -> "reminder", 10, TimeUnit.MILLISECONDS);
            System.out.println(task.get());
        } finally { scheduler.shutdown(); }
    }
}`, 'reminder',
    ['A scheduled task runs on an executor-managed thread.', 'Periodic tasks should handle exceptions; an uncaught failure can stop later executions.', 'Use fixed delay when each run should wait after the previous run completes.'],
    'Do not use Thread.sleep in a loop as a replacement for a scheduler; it occupies a thread while waiting.');

  add('completablefuture', 'CompletableFuture chains and composition',
    'CompletableFuture represents an asynchronous result and provides methods for transforming, combining and handling that result.',
    'Chaining makes dependent asynchronous work easier to express without manually blocking between every step.',
    '<code>thenApply</code> transforms a result. <code>thenCompose</code> chains another asynchronous operation that itself returns a CompletableFuture. <code>thenCombine</code> combines two independent results.',
    `import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        int result = CompletableFuture.supplyAsync(() -> 20)
            .thenCompose(value -> CompletableFuture.completedFuture(value + 22))
            .join();
        System.out.println(result);
    }
}`, '42',
    ['thenApply maps a value; thenCompose flattens a nested future.', 'Async methods without an explicit executor may use the common pool.', 'Avoid blocking joins inside tasks that depend on the same limited executor.'],
    'Do not use thenApply when the function returns another future; use thenCompose to avoid CompletableFuture<CompletableFuture<T>>.');

  add('async_exceptions', 'Exception handling in asynchronous tasks',
    'An asynchronous task can fail after the submitting method has returned. CompletableFuture represents that failure as an exceptional completion.',
    'Explicit error handling prevents failures from disappearing in background work and lets the application recover or report them at the right boundary.',
    'Use exceptionally to provide a fallback, handle to inspect success or failure, or whenComplete for observation while preserving the result state.',
    `import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        String result = CompletableFuture.<String>supplyAsync(() -> {
            throw new IllegalStateException("offline");
        }).exceptionally(error -> "fallback")
          .join();
        System.out.println(result);
    }
}`, 'fallback',
    ['join throws CompletionException when failure remains unhandled.', 'exceptionally converts a failure to a fallback result.', 'Log or propagate failures when a fallback would hide important data loss.'],
    'Do not attach a handler that silently returns a default value unless that fallback is valid for the business operation.');

  add('forkjoin_workstealing', 'ForkJoinPool and work stealing',
    'ForkJoinPool is designed for tasks that split into smaller subtasks and later combine their results. Idle workers can steal queued work from busy workers.',
    'Work stealing can balance recursive CPU work across processors without assigning every task manually to one thread.',
    'A RecursiveTask returns a result; a RecursiveAction does not. A task divides when large, forks one side, computes the other, then joins the first result.',
    `import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;

class SumTask extends RecursiveTask<Integer> {
    private final int from, to;
    SumTask(int from, int to) { this.from = from; this.to = to; }
    protected Integer compute() {
        if (to - from <= 2) {
            int sum = 0;
            for (int i = from; i < to; i++) sum += i;
            return sum;
        }
        int mid = (from + to) / 2;
        SumTask left = new SumTask(from, mid);
        left.fork();
        return new SumTask(mid, to).compute() + left.join();
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(ForkJoinPool.commonPool().invoke(new SumTask(1, 11)));
    }
}`, '55',
    ['Fork/join fits divide-and-conquer work with reasonably balanced tasks.', 'Very small tasks may cost more to schedule than to compute.', 'Blocking operations can reduce pool effectiveness.'],
    'Do not split work into tiny tasks without measuring scheduling overhead.');

  add('virtual_threads', 'Virtual threads',
    'Virtual threads are lightweight Java threads managed by the runtime. They became a final feature in Java 21 and are intended to make large numbers of blocking tasks easier to handle.',
    'They can simplify thread-per-request code when tasks spend much of their time waiting on I/O.',
    'The JVM schedules virtual threads over a smaller number of carrier platform threads. Blocking in supported operations can unmount a virtual thread so a carrier can run other work.',
    `import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            var result = executor.submit(() -> "handled by a virtual thread");
            System.out.println(result.get());
        }
    }
}`, 'handled by a virtual thread',
    ['Virtual threads are cheap to create compared with platform threads.', 'They help with high-concurrency blocking workloads, not CPU acceleration.', 'Do not pool virtual threads; create one per task and limit scarce downstream resources separately.'],
    'Do not use virtual threads as a reason to remove backpressure on a database or remote service.');

  add('structured_concurrency', 'Structured concurrency and version-specific status',
    'Structured concurrency treats related child tasks as one unit whose lifetime is bounded by a parent task. It can simplify cancellation, failure handling and result collection.',
    'Without structure, child tasks may outlive the request that created them or failures may be observed too late.',
    'The Java API has been a preview feature across releases. In Java 25 it remains preview and requires preview compiler and runtime options, which this tutorial runner does not enable.',
    null, null,
    ['Structured concurrency is not a final API in Java 25.', 'Preview APIs can change between releases.', 'Use a supported stable API unless the project explicitly accepts preview features.'],
    'Do not copy preview code into a build without checking the exact JDK release and enabling the matching preview flags.',
    note('Version status: preview in Java 25. No runnable sample is shown because JavaTrail’s runner does not compile with preview flags.'));

  add('scoped_values', 'Scoped values and version-specific status',
    'ScopedValue is a Java API for sharing an immutable value with callees during a bounded execution scope. It is designed for contextual data such as a request identifier.',
    'It can provide context across a call tree without manually threading a parameter through every method or using mutable ThreadLocal state.',
    'Bind a value for a lexical dynamic scope and run code inside that scope. In Java 25, Scoped Values are a final API.',
    `public class Main {
    private static final ScopedValue<String> REQUEST = ScopedValue.newInstance();
    static void handle() { System.out.println(REQUEST.get()); }
    public static void main(String[] args) {
        ScopedValue.where(REQUEST, "req-42").run(Main::handle);
    }
}`, 'req-42',
    ['Scoped values are immutable bindings for a bounded call scope.', 'Java 25 has the final ScopedValue API.', 'The value is available only within the bound scope.'],
    'Do not treat ScopedValue as a general mutable variable or a drop-in replacement for every ThreadLocal use case.');
})();
