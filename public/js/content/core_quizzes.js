// Short understanding checks for each Java Core Advanced lesson page.
(function () {
  'use strict';
  const JT = window.JT;
  const questions = {
    java_ca_fundamentals: [
      { q: 'What does “Java passes arguments by value” mean?', options: ['A method receives a copy of each argument value.', 'Objects are always copied before a call.', 'Primitive arguments are references.', 'Methods can change the caller’s local variable.'], answer: 0 },
      { q: 'A method runs param = new StringBuilder("x"). What happens to the caller’s variable?', options: ['Nothing; only the method’s copy of the reference changes', 'It now points to the new StringBuilder', 'It becomes null', 'The code does not compile'], answer: 0 },
    ],
    java_ca_jdk_jre_jvm: [
      { q: 'Which tool normally compiles Java source into bytecode?', options: ['java launcher', 'javac from the JDK', 'JVM garbage collector', 'JAR tool only'], answer: 1 },
      { q: 'What does the JVM execute?', options: ['Java source files directly', 'Java bytecode', 'Only native machine code written by developers', 'The JDK installer'], answer: 1 },
    ],
    java_ca_oop: [
      { q: 'If a.equals(b) is true, what must be true of their hash codes?', options: ['a.hashCode() == b.hashCode()', 'They must be different', 'Nothing; hashCode() is unrelated to equals()', 'Both must be zero'], answer: 0 },
      { q: 'What happens if you change a field used by hashCode() after putting the object into a HashSet?', options: ['contains() may no longer find it', 'The set rehashes it automatically', 'The JVM throws IllegalStateException', 'Nothing changes'], answer: 0 },
    ],
    java_ca_collections: [
      { q: 'What does a HashMap use after selecting a bucket to identify an equal key?', options: ['equals()', 'compareTo() only', 'Object identity only', 'toString()'], answer: 0 },
      { q: 'With the default load factor of 0.75, when does a HashMap with capacity 16 resize?', options: ['When the 13th entry is added', 'When all 16 buckets are full', 'After every put()', 'Never; capacity is fixed'], answer: 0 },
    ],
    java_ca_generics: [
      { q: 'In PECS, when is “extends” commonly used?', options: ['When a parameter produces values that are read', 'When a parameter only consumes values', 'To make a generic type mutable', 'To disable type checking'], answer: 0 },
      { q: 'What is a common risk of raw types?', options: ['They bypass generic compile-time checks and can lead to ClassCastException.', 'They make all operations thread-safe.', 'They preserve every generic type at runtime.', 'They prevent collections from storing null.'], answer: 0 },
    ],
    java_ca_exceptions: [
      { q: 'What does try-with-resources do when the block finishes?', options: ['Closes its AutoCloseable resources automatically', 'Retries the block until it succeeds', 'Converts every exception to an Error', 'Skips resource cleanup'], answer: 0 },
      { q: 'Which statement about finally is generally correct?', options: ['It is intended for cleanup that should run after try/catch.', 'It runs only when an exception occurs.', 'It declares a checked exception.', 'It replaces try-with-resources for every resource.'], answer: 0 },
    ],
    java_ca_concurrency: [
      { q: 'Two threads run count++ 1000 times each on a shared int. What can the final value be?', options: ['2000 or less, because count++ is not atomic', 'Always exactly 2000', 'Always 1000', 'The program does not compile'], answer: 0 },
      { q: 'What should code usually do after catching InterruptedException it cannot handle?', options: ['Restore the flag with Thread.currentThread().interrupt()', 'Ignore it and keep looping', 'Call System.exit()', 'Throw an Error'], answer: 0 },
    ],
    java_ca_group_executors_async: [
      { q: 'When are virtual threads a useful fit?', options: ['Many tasks that spend time waiting on blocking I/O', 'Making CPU-heavy calculations faster automatically', 'Replacing every data structure', 'Running only one task in a process'], answer: 0 },
      { q: 'What happens to an exception thrown inside a task passed to submit()?', options: ['It is stored in the Future and rethrown from get() as ExecutionException', 'It is printed and lost', 'It stops the executor', 'It is thrown in the caller immediately'], answer: 0 },
    ],
    java_ca_group_synchronization_utilities: [
      { q: 'What does volatile guarantee for a variable?', options: ['Visibility and ordering guarantees, but not atomic compound updates', 'That every operation is atomic', 'That only one thread can access the object', 'That the thread is scheduled immediately'], answer: 0 },
      { q: 'Why is lock.unlock() placed in a finally block?', options: ['So the lock is released even when the code throws', 'Because unlock() is slow', 'Because the compiler requires it', 'So the lock can be reacquired automatically'], answer: 0 },
    ],
    java_ca_group_advanced_collections: [
      { q: 'Which collection is a common choice for FIFO queue behavior without capacity limits?', options: ['ArrayDeque', 'TreeMap', 'HashSet', 'StringBuilder'], answer: 0 },
      { q: 'What does a fail-fast iterator do when the list is structurally modified outside the iterator?', options: ['Throws ConcurrentModificationException on a best-effort basis', 'Silently skips the new element', 'Makes the list thread-safe', 'Copies the list'], answer: 0 },
    ],
    java_ca_functional: [
      { q: 'When does a normal Stream pipeline perform its work?', options: ['When a terminal operation is invoked', 'When the first intermediate operation is written', 'When the stream variable is declared', 'Only on a background thread'], answer: 0 },
      { q: 'What is flatMap commonly used for?', options: ['Mapping each input to a stream and flattening the results', 'Sorting without a comparator', 'Making a stream reusable', 'Converting every value to Optional'], answer: 0 },
    ],
    java_ca_group_runtime_compilation: [
      { q: 'What is the main role of a class loader?', options: ['Load class definitions into the JVM', 'Collect unreachable heap objects', 'Compile Java source files', 'Create operating-system users'], answer: 0 },
      { q: 'What does a JIT compiler do?', options: ['Compiles frequently executed bytecode to native code at runtime', 'Turns source files into .class files before launch', 'Manages Java packages on disk', 'Replaces the garbage collector'], answer: 0 },
    ],
    java_ca_memory_gc: [
      { q: 'When can an ordinary heap object be reclaimed by garbage collection?', options: ['When it is no longer reachable from live references', 'As soon as a method returns, in every case', 'Whenever System.gc() is called', 'Only when the JVM exits'], answer: 0 },
      { q: 'What does a memory leak usually mean in a garbage-collected program?', options: ['Unneeded objects remain reachable and cannot be collected', 'The garbage collector has been removed', 'Every object is allocated on the stack', 'The heap is automatically unlimited'], answer: 0 },
    ],
    java_ca_io_nio: [
      { q: 'Which API is a convenient modern way to read and write files by Path?', options: ['Files', 'Thread', 'Pattern', 'Runtime'], answer: 0 },
      { q: 'What does a character encoding define?', options: ['How text characters are represented as bytes', 'How objects are synchronized', 'How a Path is sorted', 'How a stream is closed'], answer: 0 },
    ],
    java_ca_reflection: [
      { q: 'What does reflection let a program do?', options: ['Inspect class metadata at runtime', 'Skip Java access checks in all cases', 'Compile source without a compiler', 'Make private APIs permanently stable'], answer: 0 },
      { q: 'Which retention policy keeps an annotation available at runtime?', options: ['RUNTIME', 'SOURCE', 'CLASSFILE_ONLY', 'COMPILE'], answer: 0 },
    ],
    java_ca_modern: [
      { q: 'What does a record automatically provide?', options: ['A canonical constructor, accessors, equals(), hashCode() and toString()', 'Setters for every field', 'A no-argument constructor only', 'Mutable fields'], answer: 0 },
      { q: 'Why can a switch over a sealed interface omit the default branch?', options: ['The compiler knows every permitted subtype and checks the switch is exhaustive', 'default is never allowed in switch expressions', 'Sealed types cannot be used in switch', 'The JVM adds a default at runtime'], answer: 0 },
    ],
    java_ca_datetime: [
      { q: 'Which type represents a point on the UTC timeline?', options: ['Instant', 'LocalDate', 'LocalTime', 'Period'], answer: 0 },
      { q: 'Which type carries a date and a time zone?', options: ['ZonedDateTime', 'LocalDate', 'Duration', 'YearMonth'], answer: 0 },
    ],
    java_ca_performance: [
      { q: 'What is a sound first step when investigating a performance problem?', options: ['Measure and profile the workload', 'Rewrite the entire application', 'Increase every thread pool', 'Assume the garbage collector is at fault'], answer: 0 },
      { q: 'What is JMH designed for?', options: ['Microbenchmarking Java/JVM code', 'Editing heap dumps', 'Managing SQL connections', 'Creating TLS certificates'], answer: 0 },
    ],
    java_ca_diagnostics: [
      { q: 'Which tool can capture a Java thread dump?', options: ['jstack', 'javac', 'javadoc', 'jar'], answer: 0 },
      { q: 'What information is especially useful in a thread dump when diagnosing deadlock?', options: ['Thread states, held locks and lock waits', 'Source file encodings', 'The contents of every local variable', 'Only heap capacity'], answer: 0 },
    ],
    java_ca_patterns: [
      { q: 'Which pattern encapsulates a family of interchangeable behaviors?', options: ['Strategy', 'Singleton', 'Prototype', 'Facade'], answer: 0 },
      { q: 'Which pattern adds behavior around an object while keeping its interface?', options: ['Decorator', 'Builder', 'Observer', 'Factory Method'], answer: 0 },
      { q: 'What should be used for SQL containing user-provided values?', options: ['PreparedStatement parameters', 'String concatenation', 'A log message', 'CallableStatement for every query'], answer: 0 },
      { q: 'What does rollback do in a transaction?', options: ['Undo uncommitted changes in that transaction', 'Commit changes twice', 'Close the JDBC driver', 'Create a connection pool'], answer: 0 },
    ],
  };

  for (const [slug, quiz] of Object.entries(questions)) {
    const page = JT.pages[slug];
    if (!page) continue;
    const body = page.body;
    const id = 'core-advanced-' + slug;
    page.body = () => body() + '<h2>Quick quiz</h2><p>Check your understanding of this section.</p>' + JT.renderQuiz(quiz, { id });
    page.after = (main, { wireQuiz }) => wireQuiz(quiz, null, id);
  }
})();
