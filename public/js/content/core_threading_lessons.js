// Focused lessons for thread behavior and safe shared-state basics.
(function () {
  'use strict';
  const JT = window.JT;
  const { note, table } = JT.h;
  function add(id, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def('java_ca_threading_fundamentals_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('thread_lifecycle', 'Thread lifecycle and state transitions',
    'Java exposes thread states such as NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED. These states describe the thread’s JVM-visible condition, not every operating-system scheduling detail.',
    'Thread states help diagnose whether work has not started, is waiting, is blocked on a monitor, or has finished.',
    'A new Thread begins in NEW. Calling start makes it eligible to run. Waiting or sleeping can place it in a waiting state. Once run completes, the thread is TERMINATED.',
    `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> { });
        System.out.println(worker.getState());
        worker.start();
        worker.join();
        System.out.println(worker.getState());
    }
}`, 'NEW\nTERMINATED',
    ['A Thread object can be started only once.', 'RUNNABLE includes threads that may be running or ready to run.', 'join waits for another thread to finish.'],
    'Do not confuse Java thread states with a complete operating-system process state diagram.');

  add('thread_runnable_callable', 'Thread vs Runnable vs Callable',
    '<code>Thread</code> represents a thread of execution. <code>Runnable</code> describes work with no returned result. <code>Callable&lt;V&gt;</code> describes work that returns a value and may throw a checked exception.',
    'Separating a task from the thread that runs it makes work easier to test, submit to an executor and reuse.',
    'Create a Runnable or Callable for the task. A Thread can run a Runnable directly, while an ExecutorService can run both and return a Future for a Callable.',
    `import java.util.concurrent.Callable;

public class Main {
    public static void main(String[] args) throws Exception {
        Runnable message = () -> System.out.println("Runnable task");
        Callable<Integer> calculation = () -> 6 * 7;
        message.run();
        System.out.println("Callable result: " + calculation.call());
    }
}`, 'Runnable task\nCallable result: 42',
    ['Runnable.run returns no value.', 'Callable.call returns a value and can throw checked exceptions.', 'Running run() directly does not start a new thread.'],
    'Do not call Thread.run() when you intend to start a separate thread; call start() or submit a task to an executor.');

  add('race_conditions', 'Race conditions',
    'A race condition occurs when a program’s result depends on the timing or order of concurrent operations on shared state.',
    'Race conditions cause intermittent errors, such as lost updates, duplicate work or inconsistent reads. They may disappear during debugging and return under load.',
    'Identify the shared state and the operations that must be indivisible. Protect those operations with a lock, an atomic class, or a design that avoids shared mutation.',
    null, null,
    ['A compound operation such as count++ includes read, add and write steps.', 'The order of interleaved steps is not guaranteed.', 'Use synchronization to establish the required behavior.'],
    'Do not rely on the current scheduler or on a race failing in a small test; thread timing changes between runs.',
    note('A race-condition demo has timing-dependent output, so this lesson explains the unsafe interleaving instead of presenting one invented result.') + JT.h.code(`// Unsafe when multiple threads call this at the same time:
count++;

// Protect the whole read-modify-write operation:
synchronized (lock) {
    count++;
}`));

  add('thread_safety', 'Thread safety',
    'A class or operation is thread-safe when it behaves correctly under the concurrent use promised by its contract.',
    'Thread safety matters whenever multiple threads can access the same object, especially in servers and background workers.',
    'A design can avoid shared mutation, protect state with a lock, use atomic variables, or use thread-safe concurrent collections. The chosen approach must protect the complete invariant, not just one field.',
    `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger requests = new AtomicInteger();
        requests.incrementAndGet();
        requests.incrementAndGet();
        System.out.println(requests.get());
    }
}`, '2',
    ['Immutability is a simple way to share values safely.', 'Synchronized methods can protect invariants spanning multiple fields.', 'A thread-safe collection does not make unrelated surrounding logic atomic.'],
    'Do not assume a class is thread-safe just because it uses one concurrent collection. Check the whole sequence of operations.');

  add('critical_sections', 'Critical sections and atomicity',
    'A critical section is code that accesses shared state and must not interleave unsafely with another operation. An operation is atomic when other threads cannot observe it partway through.',
    'Protecting a critical section prevents partial updates from breaking an application invariant.',
    'A synchronized block acquires a monitor before entering its body and releases it on every exit path. Other threads using the same monitor must wait until it is released.',
    `public class Main {
    private static int balance = 0;
    private static final Object lock = new Object();
    static void deposit(int amount) {
        synchronized (lock) { balance += amount; }
    }
    public static void main(String[] args) {
        deposit(30);
        deposit(12);
        System.out.println("Balance: " + balance);
    }
}`, 'Balance: 42',
    ['Use the same lock for every access that must coordinate.', 'Keep critical sections small but protect the complete invariant.', 'Synchronization also provides visibility guarantees.'],
    'Locking only the write is not enough if related reads and decisions must be atomic with that write.');

  add('visibility_atomicity', 'Visibility vs atomicity',
    'Visibility means one thread can observe another thread’s write. Atomicity means an operation happens as one indivisible action. A volatile field provides visibility and ordering guarantees for reads and writes, but not atomic compound updates.',
    'Separating these ideas prevents a common bug where a developer uses volatile for a counter and still loses increments.',
    'Use volatile for a simple state flag when individual reads and writes are enough. Use an atomic class or a lock when the update combines several steps.',
    `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger count = new AtomicInteger();
        count.incrementAndGet();
        count.incrementAndGet();
        System.out.println("Atomic count: " + count.get());
    }
}`, 'Atomic count: 2',
    ['volatile supports visibility for a field.', 'count++ is not atomic just because count is volatile.', 'AtomicInteger provides atomic update operations.'],
    'Do not use volatile as a substitute for a lock when several fields must change together.');

  add('deadlock_livelock_starvation', 'Deadlocks, livelocks and starvation',
    'Deadlock is a cycle of threads waiting for locks held by one another. Livelock is repeated activity where threads keep reacting but make no progress. Starvation occurs when a thread rarely gets the resources or time it needs.',
    'These problems can make an application appear frozen or unfair even when threads are technically active.',
    'Reduce deadlock risk by acquiring locks in a consistent order and keeping lock scopes short. Avoid retry loops that cause livelock, and monitor whether some work is continually postponed.',
    null, null,
    ['Deadlocked threads wait indefinitely for each other’s locks.', 'Livelocked threads run but fail to make progress.', 'Starvation is unfair delay, often caused by resource competition.'],
    'Do not diagnose every stuck thread as deadlock. Inspect a thread dump and identify the actual wait and lock relationships.',
    table(['Problem', 'Thread behavior', 'Typical symptom'], [['Deadlock', 'Blocked waiting for a lock cycle.', 'No progress by the involved threads.'], ['Livelock', 'Active retries or state changes.', 'Activity without useful progress.'], ['Starvation', 'Repeatedly denied a resource.', 'One task waits much longer than others.']]));

  add('interruption_cancellation', 'Thread interruption and cancellation',
    'Interruption is a cooperative signal that a thread should stop or cancel its current work. Calling interrupt sets the interrupted status or causes some blocking methods to throw InterruptedException.',
    'Cooperative cancellation lets applications shut down tasks and services without forcibly stopping threads in an unsafe state.',
    'A task should check or respond to interruption, release resources, and finish promptly. If code catches InterruptedException but cannot propagate it, it should usually restore the status with Thread.currentThread().interrupt().',
    `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException error) {
                System.out.println("Cancellation requested");
            }
        });
        worker.start();
        worker.interrupt();
        worker.join();
        System.out.println("Worker stopped");
    }
}`, 'Cancellation requested\nWorker stopped',
    ['Interruption does not forcibly terminate a thread.', 'Blocking methods may clear the interrupt status when throwing InterruptedException.', 'Executors expose cancellation through Future.cancel(true).'],
    'Do not swallow InterruptedException and continue as if nothing happened. Preserve or propagate the cancellation signal.');
})();
