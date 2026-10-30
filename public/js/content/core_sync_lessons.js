// Focused lessons for Java locks, atomic state and coordination utilities.
(function () {
  'use strict';
  const JT = window.JT;
  
  function add(id, title, what, why, how, sample, output, points, mistake, extra = '') {
    JT.def('java_ca_synchronization_utilities_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code: sample, output, points, mistake, extra }) });
  }

  add('synchronized_monitors', 'synchronized and monitor locks',
    'Every Java object can act as a monitor lock. A synchronized method or block acquires that monitor before entering and releases it when the code exits.',
    'A monitor protects a critical section so only one thread at a time can execute code synchronized on the same object.',
    'The thread enters the synchronized region after acquiring the monitor. An unlock happens when it leaves, including when an exception exits the block. A later lock of the same monitor also establishes visibility.',
    `public class Main {
    private static int total;
    private static final Object lock = new Object();
    static void add(int value) {
        synchronized (lock) { total += value; }
    }
    public static void main(String[] args) {
        add(10);
        add(5);
        System.out.println(total);
    }
}`, '15',
    ['Use one consistent lock for all accesses to the protected state.', 'Prefer a private lock object when locking a class invariant.', 'Intrinsic monitors are reentrant.'],
    'Do not synchronize on public objects, string literals or boxed values; unrelated code can use the same lock and block you.');

  add('volatile_visibility', 'volatile and visibility guarantees',
    'A volatile field provides visibility and ordering guarantees between a write and later reads of that field. It does not make compound updates atomic.',
    'Volatile is useful for simple state flags or publishing a replacement reference when no multi-step invariant needs protection.',
    'A write to a volatile field happens-before a subsequent read of that field. This establishes visibility for actions before the write as well.',
    `public class Main {
    private static volatile boolean ready;
    private static int value;
    public static void main(String[] args) throws InterruptedException {
        Thread writer = new Thread(() -> { value = 42; ready = true; });
        writer.start();
        writer.join();
        if (ready) System.out.println(value);
    }
}`, '42',
    ['A volatile read observes a visible write according to JMM rules.', 'volatile does not make count++ atomic.', 'Use a lock or atomic type for compound updates.'],
    'Do not use volatile as a counter synchronization strategy when increments can overlap.');

  add('atomic_cas', 'AtomicInteger and compare-and-set',
    'AtomicInteger provides atomic operations on an int value. compareAndSet updates the value only if it still equals the expected value.',
    'Atomic variables support counters and state transitions without an explicit lock when the operation fits their API.',
    'compareAndSet reads the current value and conditionally writes the new value as one atomic operation. If another thread changed the value first, it returns false and leaves it unchanged.',
    `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger stock = new AtomicInteger(5);
        boolean reserved = stock.compareAndSet(5, 4);
        System.out.println("Reserved: " + reserved);
        System.out.println("Remaining: " + stock.get());
    }
}`, 'Reserved: true\nRemaining: 4',
    ['Use incrementAndGet or updateAndGet for atomic updates.', 'A compareAndSet operation can fail because the value changed.', 'Atomicity of one variable does not protect a multi-field invariant.'],
    'Do not read an AtomicInteger, calculate a value, and set it later if another thread can update between those steps; use an atomic update method.');

  add('cas_lockfree', 'CAS and lock-free concepts',
    'Compare-and-set (CAS) is an atomic operation that changes a value only when it matches an expected value. Lock-free algorithms use atomic operations so that system-wide progress does not depend on one thread holding a lock.',
    'CAS can reduce lock contention for small state updates, but lock-free code is harder to design and prove correct.',
    'A thread reads a value and tries to replace it with a new value if the old value is unchanged. If it fails, it retries using the latest value. The ABA problem can occur when a value changes away and later returns to the same representation.',
    `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger state = new AtomicInteger(0);
        boolean changed = state.compareAndSet(0, 1);
        System.out.println("Changed: " + changed + ", state: " + state.get());
    }
}`, 'Changed: true, state: 1',
    ['CAS is atomic for the target variable.', 'Retries can consume CPU under heavy contention.', 'Use established atomic classes before writing a custom lock-free algorithm.'],
    'Do not equate lock-free with wait-free; lock-free guarantees system progress, not that every individual thread finishes promptly.');

  add('reentrantlock', 'ReentrantLock',
    'ReentrantLock is an explicit mutual-exclusion lock. Reentrant means a thread that already owns the lock can acquire it again without deadlocking itself.',
    'It offers features beyond synchronized, such as interruptible acquisition, timed attempts and optional fairness.',
    'Call lock before accessing protected state and unlock in a finally block. Every successful lock acquisition must have a matching unlock.',
    `import java.util.concurrent.locks.ReentrantLock;

public class Main {
    private static final ReentrantLock lock = new ReentrantLock();
    private static int total;
    static void add(int n) {
        lock.lock();
        try { total += n; }
        finally { lock.unlock(); }
    }
    public static void main(String[] args) {
        add(20);
        add(22);
        System.out.println(total);
    }
}`, '42',
    ['Use try/finally to guarantee unlocking.', 'tryLock can avoid waiting forever or support timeouts.', 'Fair locks may reduce throughput and do not guarantee perfect scheduling fairness.'],
    'Do not return or throw before unlocking a ReentrantLock. A forgotten unlock can block every other thread.');

  add('readwritelock', 'ReadWriteLock',
    'ReadWriteLock separates a shared read lock from an exclusive write lock. Multiple readers can hold the read lock together, while a writer needs exclusive access.',
    'This can help read-heavy workloads where reads are frequent and writes are relatively rare.',
    'Acquire the read lock around a consistent read. Acquire the write lock for updates. Measure before using it because lock bookkeeping can cost more than it saves for small or write-heavy workloads.',
    `import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Main {
    private static final varLock LOCK = new varLock();
    private static int value = 7;
    static int read() {
        LOCK.read.lock();
        try { return value; }
        finally { LOCK.read.unlock(); }
    }
    public static void main(String[] args) { System.out.println(read()); }
    static class varLock {
        final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
        final java.util.concurrent.locks.Lock read = lock.readLock();
    }
}`, '7',
    ['Read locks may be held concurrently.', 'A write lock excludes readers and other writers.', 'Lock downgrading is possible; upgrading a read lock to a write lock can deadlock.'],
    'Do not assume a read-write lock is always faster than synchronized. Benchmark the real read/write ratio.');

  add('stampedlock', 'StampedLock',
    'StampedLock offers write, read and optimistic-read modes. An optimistic read does not acquire a traditional read lock and must be validated before its result is trusted.',
    'It can improve some read-heavy workloads, but its API requires careful validation and has no reentrant ownership model.',
    'Obtain an optimistic stamp, read the fields, then validate the stamp. If a writer changed state during the read, acquire a read lock and repeat the read.',
    `import java.util.concurrent.locks.StampedLock;

public class Main {
    private static final StampedLock lock = new StampedLock();
    private static int x = 3, y = 4;
    static int sum() {
        long stamp = lock.tryOptimisticRead();
        int a = x, b = y;
        if (!lock.validate(stamp)) {
            stamp = lock.readLock();
            try { a = x; b = y; }
            finally { lock.unlockRead(stamp); }
        }
        return a + b;
    }
    public static void main(String[] args) { System.out.println(sum()); }
}`, '7',
    ['Validate every optimistic read before using it.', 'Stamps are tokens for a lock mode, not thread ownership.', 'StampedLock is not reentrant.'],
    'Do not skip validate after an optimistic read; a concurrent writer may have changed the values.');

  add('countdownlatch', 'CountDownLatch',
    'CountDownLatch lets one or more threads wait until a count reaches zero. The count cannot be reset.',
    'It is useful when a task should proceed only after a fixed set of initialization or worker steps has completed.',
    'Create the latch with the number of events to wait for. Each completed event calls countDown. Waiting threads unblock when the count becomes zero.',
    `import java.util.concurrent.CountDownLatch;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch ready = new CountDownLatch(1);
        Thread worker = new Thread(ready::countDown);
        worker.start();
        ready.await();
        worker.join();
        System.out.println("Worker is ready");
    }
}`, 'Worker is ready',
    ['await blocks until the count is zero.', 'countDown does nothing after the count reaches zero.', 'Use a new latch for a new coordination cycle.'],
    'Do not wait forever without a timeout when the event might never happen.');

  add('cyclicbarrier', 'CyclicBarrier',
    'CyclicBarrier makes a fixed number of threads wait for one another at a common point. After all arrive, they can continue, and the barrier can be reused.',
    'It is useful for iterative parallel work where each phase must finish before the next begins.',
    'Each participant calls await. The final arrival trips the barrier and may run a barrier action before releasing participants.',
    `import java.util.concurrent.CyclicBarrier;

public class Main {
    public static void main(String[] args) throws Exception {
        CyclicBarrier barrier = new CyclicBarrier(1,
            () -> System.out.println("Phase complete"));
        barrier.await();
    }
}`, 'Phase complete',
    ['A barrier can be reused after it trips.', 'The participant count must match the tasks that arrive.', 'A broken barrier indicates an interrupted, timed-out or failed wait.'],
    'Do not configure more parties than the number of participants that will reach await; the rest can block forever.');

  add('semaphore', 'Semaphore',
    'Semaphore manages a number of permits. A thread must acquire a permit before entering a limited-resource section and release it afterward.',
    'It is useful for limiting concurrent access to a resource such as a small connection pool or a rate-limited operation.',
    'Initialize the semaphore with the permit count. acquire waits when no permits remain; release returns a permit.',
    `import java.util.concurrent.Semaphore;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Semaphore permits = new Semaphore(2);
        permits.acquire();
        System.out.println("Available: " + permits.availablePermits());
        permits.release();
        System.out.println("Available: " + permits.availablePermits());
    }
}`, 'Available: 1\nAvailable: 2',
    ['A semaphore can allow more than one thread into a section.', 'Release in finally when acquisition succeeded.', 'A semaphore does not have ownership like a lock.'],
    'Do not release a permit that was never acquired; permit counts can then exceed the intended limit.');

  add('blockingqueue', 'BlockingQueue',
    'BlockingQueue is a thread-safe queue whose put and take operations can wait when the queue is full or empty.',
    'It supports producer-consumer designs without requiring application code to build wait/notify coordination.',
    'A producer puts an item; a consumer takes one. A bounded queue provides backpressure by blocking producers when capacity is reached.',
    `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(2);
        queue.put("job-1");
        System.out.println(queue.take());
    }
}`, 'job-1',
    ['BlockingQueue methods define behavior for full and empty queues.', 'Bounded queues limit pending work.', 'Poison-pill or shutdown protocols must be designed for the number of consumers.'],
    'Do not use an unbounded queue when producers can permanently outpace consumers.');

  add('concurrenthashmap_internals', 'ConcurrentHashMap internals',
    'ConcurrentHashMap is a map designed for concurrent access. It supports concurrent retrieval and updates without synchronizing every operation on the whole map.',
    'It lets threads safely share a map and provides atomic compound methods such as computeIfAbsent for common update patterns.',
    'The JDK implementation uses fine-grained coordination and compare-and-set techniques. Its internal details vary; use documented Map operations rather than relying on a particular bin layout.',
    `import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> visits = new ConcurrentHashMap<>();
        visits.merge("home", 1, Integer::sum);
        visits.merge("home", 1, Integer::sum);
        System.out.println(visits.get("home"));
    }
}`, '2',
    ['Use atomic map methods for read-modify-write logic.', 'Its iterators are weakly consistent.', 'Null keys and values are not supported.'],
    'Do not combine separate get and put calls when the whole update must be atomic; use merge, compute or putIfAbsent.');

  add('threadlocal_leaks', 'ThreadLocal and memory-leak risks',
    'ThreadLocal gives each thread its own value for a variable. The values stay associated with the thread while it remains alive or until they are removed.',
    'Thread-local state can simplify request context or per-thread temporary data, but pooled worker threads live a long time and may retain values across tasks.',
    'Set a value before using it and call remove in a finally block when the task is complete, especially in thread pools.',
    `public class Main {
    private static final ThreadLocal<String> USER = new ThreadLocal<>();
    public static void main(String[] args) {
        try {
            USER.set("Asha");
            System.out.println(USER.get());
        } finally {
            USER.remove();
        }
    }
}`, 'Asha',
    ['ThreadLocal values are separate per thread.', 'A pooled thread may serve many unrelated tasks over time.', 'remove prevents stale values from leaking into later tasks.'],
    'Do not assume a request-local ThreadLocal disappears when the request finishes if the worker thread is reused.');
})();
