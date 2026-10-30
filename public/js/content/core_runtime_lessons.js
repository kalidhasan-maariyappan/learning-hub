// Topic-by-topic lessons for Java runtime and compilation.
(function () {
  'use strict';
  const JT = window.JT;
  

  const lesson = ({ slug, title, what, why, steps, code, output, points, mistake, diagram }) => {
    JT.def(slug, {
      title,
      h1: 'Java <span>' + title + '</span>',
      body: () => JT.kit.coreLesson({ title, what, why, steps, code, output, points, mistake, diagram }),
    });
  };

  lesson({
    slug: 'java_ca_runtime_compilation_bytecode', title: 'Java compilation and bytecode',
    what: 'Java source code is the text in a <code>.java</code> file. The compiler checks that source and translates it into bytecode, which is stored in a <code>.class</code> file. Bytecode is an instruction format for the JVM, not machine code for one specific processor.',
    why: 'Bytecode lets a compiled class run on different systems that provide a compatible JVM. Compilation also catches many syntax and type errors before the program starts.',
    steps: ['Write a source file such as <code>Main.java</code>.', 'Run <code>javac Main.java</code>; the compiler checks the program and writes <code>Main.class</code>.', 'Run <code>java Main</code>; the launcher starts a JVM, which loads and executes the class file.'],
    diagram: '<figure class="concept-diagram" aria-label="Java compilation flow"><figcaption><strong>From source code to a running program</strong><span>The compiler creates bytecode; the JVM executes it.</span></figcaption><div class="concept-flow"><div class="flow-node"><b>Main.java</b><small>source code</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>javac</b><small>compile and check</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Main.class</b><small>bytecode</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>JVM</b><small>execute</small></div></div></figure>',
    code: `public class Main {
    public static void main(String[] args) {
        int total = 12 + 8;
        System.out.println("Total: " + total);
    }
}`,
    output: 'Total: 20',
    points: ['Source files end in <code>.java</code>; compiled class files end in <code>.class</code>.', 'The JVM executes bytecode; <code>javac</code> compiles source code.', 'A class file can contain more than one class definition.'],
    mistake: 'A <code>.class</code> file does not contain Java source text. Do not pass a source file to the JVM when you mean to compile it; compile with <code>javac</code> first, or use the source-file launch mode intentionally.',
  });

  lesson({
    slug: 'java_ca_runtime_compilation_class_loading', title: 'Class loading, linking and initialization',
    what: 'Before a class can be used, the JVM loads its definition, links it, and initializes it when required. Linking includes verification, preparation and resolution. Initialization runs static field initializers and static initializer blocks in order.',
    why: 'This staged process lets Java load classes when needed, check bytecode before execution, and prepare static state safely. It also explains errors such as <code>ClassNotFoundException</code> and <code>NoClassDefFoundError</code>.',
    steps: ['A class loader finds the class bytes and creates a class definition.', 'The JVM verifies bytecode, prepares static fields with default values, and resolves symbolic references as needed.', 'On the first active use, the JVM runs static field initializers and static blocks in textual order.'],
    diagram: '<figure class="concept-diagram" aria-label="Class loading lifecycle"><figcaption><strong>Class lifecycle in the JVM</strong><span>Initialization happens after a class has been loaded and linked.</span></figcaption><div class="concept-flow"><div class="flow-node"><b>Load</b><small>find class bytes</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Link</b><small>verify, prepare, resolve</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Initialize</b><small>run static initializers</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Use</b><small>create or call</small></div></div></figure>',
    code: `class Settings {
    static {
        System.out.println("Settings initialized");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Before use");
        new Settings();
        System.out.println("After use");
    }
}`,
    output: 'Before use\nSettings initialized\nAfter use',
    points: ['Loading, linking and initialization are different stages.', 'Preparation gives static fields their default values; initialization runs their declared initializers.', 'The JVM initializes a class before its first active use.'],
    mistake: 'Do not assume that merely mentioning a class name always runs its static initializer. Class literals and some reflective operations do not necessarily trigger initialization.',
  });

  lesson({
    slug: 'java_ca_runtime_compilation_jvm_architecture', title: 'JVM architecture and execution engine',
    what: 'The JVM is the runtime that loads class files and executes bytecode. Its main parts include class loaders, runtime memory areas, and an execution engine. The execution engine interprets bytecode and may compile frequently used code to native instructions.',
    why: 'Knowing these parts helps explain where classes come from, where data lives, and how Java code runs. It is useful when investigating startup problems, memory use and performance.',
    steps: ['A class loader loads class definitions.', 'The JVM creates runtime areas for class metadata, objects, stacks and other execution state.', 'The execution engine runs bytecode, while runtime libraries provide common Java APIs.', 'The garbage collector reclaims reachable-graph objects that are no longer reachable.'],
    diagram: '<figure class="concept-diagram" aria-label="JVM components"><figcaption><strong>Main JVM components</strong><span>Class loading supplies code to the runtime; the engine executes it using runtime memory.</span></figcaption><div class="concept-flow"><div class="flow-node"><b>Class loaders</b><small>load classes</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Runtime areas</b><small>stacks, heap, metadata</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Execution engine</b><small>interpreter and JIT</small></div><span class="flow-arrow" aria-hidden="true"></span><div class="flow-node"><b>Program</b><small>runs on the host</small></div></div></figure>',
    code: `class Price {
    static int withTax(int amount) {
        return amount + amount / 10;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Price.withTax(100));
    }
}`,
    output: '110',
    points: ['The JVM specification describes behavior; JVM implementations provide the runtime.', 'The heap stores objects; each thread has its own JVM stack.', 'The execution engine includes interpretation and may use just-in-time compilation.'],
    mistake: 'The JVM is not the Java compiler. The Java compiler normally creates bytecode before the application starts; the JVM loads and executes that bytecode.',
  });

  lesson({
    slug: 'java_ca_runtime_compilation_jit_compilation', title: 'JIT compilation and runtime optimization',
    what: 'A just-in-time compiler (JIT) compiles selected bytecode into native machine code while a Java program is running. The JVM can focus optimization on code that runs often, called hot code.',
    why: 'Interpreting every instruction forever can be slower for long-running applications. Runtime compilation lets the JVM use observations from the running program to optimize frequently used paths.',
    steps: ['The JVM starts by loading and executing bytecode.', 'Runtime profiling gathers information about code paths and types that occur often.', 'A JIT compiler may compile hot methods and apply optimizations.', 'If observed behavior changes, the JVM can deoptimize compiled code and return to a less optimized path.'],
    code: `public class Main {
    static long squareSum(int limit) {
        long sum = 0;
        for (int i = 1; i <= limit; i++) {
            sum += (long) i * i;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println("Sum: " + squareSum(100));
    }
}`,
    output: 'Sum: 338350',
    points: ['JIT compilation happens at runtime and is managed by the JVM.', 'Hot code is a candidate for compilation; not every method must be compiled.', 'Exact optimization decisions differ across JVMs and workloads.'],
    mistake: 'Do not claim that a short example definitely gets JIT-compiled. Compilation thresholds and optimization choices depend on the JVM, runtime profile and execution duration.',
  });

  lesson({
    slug: 'java_ca_runtime_compilation_classloader_hierarchy', title: 'ClassLoader hierarchy and custom ClassLoaders',
    what: 'A <code>ClassLoader</code> locates class bytes and defines the classes used by the JVM. Standard Java uses parent delegation: a loader normally asks its parent first, then tries to find the class itself. The bootstrap, platform and application loaders form the common built-in hierarchy.',
    why: 'This design avoids loading duplicate core classes and supports applications that load plug-ins or code from separate locations. Servers and plug-in systems use custom loaders when classes need separate loading boundaries.',
    steps: ['A request asks a loader for a class by name.', 'The loader delegates the request to its parent.', 'If the parent cannot find the class, the requesting loader searches its own sources.', 'The JVM identifies a class by both its binary name and defining class loader.'],
    code: `public class Main {
    public static void main(String[] args) {
        ClassLoader appLoader = Main.class.getClassLoader();
        ClassLoader stringLoader = String.class.getClassLoader();
        System.out.println("Main has application loader: " + (appLoader != null));
        System.out.println("String uses bootstrap loader: " + (stringLoader == null));
    }
}`,
    output: 'Main has application loader: true\nString uses bootstrap loader: true',
    points: ['The bootstrap loader defines core platform classes.', 'The platform and application loaders handle additional platform and application classes.', 'Two classes with the same name but different defining loaders are different JVM types.'],
    mistake: 'A custom ClassLoader does not automatically make code safe or isolated. Loading untrusted code needs a proper process or container security boundary.',
  });

  lesson({
    slug: 'java_ca_runtime_compilation_memory_model', title: 'Java Memory Model and happens-before',
    what: 'The Java Memory Model (JMM) defines how threads may observe reads and writes to shared variables. A happens-before relationship guarantees that actions before one event are visible to actions after a related event in another thread.',
    why: 'Without coordination, one thread may not see another thread’s latest write, and operations can appear in an unexpected order. The JMM gives developers rules for safe communication between threads.',
    steps: ['A thread changes shared state.', 'A synchronization action such as unlocking a monitor publishes the preceding changes.', 'A later lock of the same monitor acquires those changes.', 'The happens-before relationship makes the protected data visible to the acquiring thread.'],
    code: `public class Main {
    private static int value;
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread writer = new Thread(() -> {
            synchronized (lock) {
                value = 42;
            }
        });
        writer.start();
        writer.join();
        synchronized (lock) {
            System.out.println("Value: " + value);
        }
    }
}`,
    output: 'Value: 42',
    points: ['Program order within one thread contributes to happens-before.', 'Unlocking a monitor happens-before a later lock of that same monitor.', 'A correctly used volatile field also provides visibility and ordering guarantees.'],
    mistake: 'Declaring a variable volatile does not make compound operations such as <code>count++</code> atomic. Use synchronization or an atomic class when updates must not be lost.',
  });
})();
