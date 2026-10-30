// Java Core Advanced: the JDK/JRE/JVM and pass-by-value lessons.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, ex } = JT.h;

  JT.def('java_ca_jdk_jre_jvm', {
    title: 'JDK vs JRE vs JVM',
    h1: 'Java <span>JDK, JRE and JVM</span>',
    body: () => [
      h2('What are the JDK, JRE and JVM?'),
      p('These three names describe different parts of how Java programs are developed and run. The <b>JDK</b> (Java Development Kit) is the set of development tools. The <b>JRE</b> (Java Runtime Environment) describes the components needed to run a Java application. The <b>JVM</b> (Java Virtual Machine) is the engine that loads and executes Java bytecode.'),
      h3('JDK: tools for building Java programs'),
      p('The JDK includes the Java compiler, <code>javac</code>, and other development tools. You use it when you write or compile Java source code. A JDK also includes runtime components, so one installation is enough to develop and run Java programs.'),
      h3('JRE: components for running programs'),
      p('The JRE is a useful name for the runtime package: the JVM, core Java libraries, and supporting files. A program can run with those runtime components without needing the compiler. Current Java distributions do not all ship a separate JRE download, so the term describes the role of the components as well as older standalone packages.'),
      h3('JVM: the bytecode execution engine'),
      p('The JVM loads compiled <code>.class</code> files, checks their bytecode, and executes their instructions. It can interpret instructions and compile frequently used code to native machine code while the program runs. Each operating system needs a compatible JVM implementation; the Java bytecode format lets the same compiled class run on those different implementations.'),
      h2('Why are they used?'),
      p('The separation lets developers build a program with development tools and deploy it to a machine that only needs runtime components. The JVM handles the platform-specific work of executing bytecode, while Java libraries provide common features such as collections, files, and networking.'),
      p('For example, a developer can compile <code>Main.java</code> on one operating system, then run the resulting class on another system with a compatible Java runtime.'),
      h2('How compilation and execution work'),
      ol([
        'You write Java source code in <code>Main.java</code>.',
        'The JDK compiler <code>javac</code> checks the source and translates it to bytecode in <code>Main.class</code>.',
        'The <code>java</code> launcher starts a JVM and asks it to load the requested class.',
        'The JVM checks and executes the bytecode, using the Java runtime libraries when needed.',
        'Calls such as <code>System.out.println</code> send text to the program output.',
      ]),
      '<figure class="concept-diagram jdk-diagram" aria-labelledby="jdk-diagram-title">' +
        '<figcaption id="jdk-diagram-title"><strong>From Java source code to program output</strong><span>The JDK supplies the compiler; runtime components launch the JVM that executes bytecode.</span></figcaption>' +
        '<div class="jdk-flow" role="img" aria-label="Main.java source code flows to javac, the JDK compiler, which creates Main.class bytecode. The java launcher starts a JVM, which executes the bytecode and produces program output.">' +
          '<div class="diagram-node source-node"><span class="diagram-kicker">1 · Source</span><code>Main.java</code><small>Java text you write</small></div>' +
          '<span class="diagram-arrow" aria-hidden="true"></span>' +
          '<div class="diagram-node compiler-node"><span class="diagram-kicker">2 · JDK tool</span><code>javac</code><small>checks and compiles source</small></div>' +
          '<span class="diagram-arrow" aria-hidden="true"></span>' +
          '<div class="diagram-node bytecode-node"><span class="diagram-kicker">3 · Bytecode</span><code>Main.class</code><small>compiled Java instructions</small></div>' +
          '<span class="diagram-arrow" aria-hidden="true"></span>' +
          '<div class="diagram-runtime"><span class="diagram-kicker">4–5 · Runtime (JRE concept)</span><div class="runtime-steps">' +
            '<div class="diagram-node launcher-node"><code>java</code><small>launcher starts the JVM</small></div>' +
            '<span class="diagram-arrow" aria-hidden="true"></span>' +
            '<div class="diagram-node jvm-node"><b>JVM</b><small>loads and executes bytecode</small></div>' +
          '</div><small class="runtime-library">Core Java libraries support the running program.</small></div>' +
          '<span class="diagram-arrow" aria-hidden="true"></span>' +
          '<div class="diagram-node output-node"><span class="diagram-kicker">6 · Result</span><b>Output</b><small>text or other program results</small></div>' +
        '</div>' +
        '<p class="diagram-note">A JDK installation also includes runtime components. This diagram separates the compiler and runtime by their roles in the process.</p>' +
      '</figure>',
      h2('Run a small Java program'),
      p('This complete program prints two lines. The displayed output below is the output produced by running this example with JavaTrail’s local JDK runner.'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                System.out.println("Source code is compiled by the JDK.");
                System.out.println("The JVM runs the resulting bytecode.");
            }
        }`, { title: 'Main.java' }),
      h3('What the code does'),
      ul([
        '<code>public class Main</code> declares the class. Its name matches the file name <code>Main.java</code>.',
        '<code>public static void main(String[] args)</code> is the entry point the Java launcher asks the JVM to run.',
        'Each <code>System.out.println</code> call writes one line to standard output.',
      ]),
      '<pre class="output">Source code is compiled by the JDK.\nThe JVM runs the resulting bytecode.</pre>',
      h2('The terminal commands'),
      p('From the directory containing <code>Main.java</code>, compile first and then run the class by name. The class name is used without the <code>.class</code> extension.'),
      '<pre class="code">javac Main.java\njava Main</pre>',
      h2('JDK, JRE and JVM compared'),
      table(['Part', 'Main job', 'Typical tool or file'], [
        ['JDK', 'Develop, compile, and run Java applications', '<code>javac</code> and other development tools; also includes runtime components'],
        ['JRE', 'Provide the runtime environment for an application', 'JVM, core libraries, and supporting runtime files; not always a separate download'],
        ['JVM', 'Load and execute Java bytecode', 'The virtual machine implementation for a platform'],
      ]),
      '<div class="note"><p><strong>Remember</strong></p>' + ul([
        'The JDK provides development tools such as <code>javac</code> and includes runtime components.',
        'The JRE is the runtime environment: the JVM plus libraries and supporting files.',
        'The JVM executes bytecode and relies on a platform-specific implementation.',
        'The usual workflow is source file → compiler → bytecode → JVM → program output.',
      ]) + '</div>',
      '<div class="note warn"><p><strong>Common mistake:</strong> The JVM does not compile <code>Main.java</code> in the usual two-command workflow. <code>javac</code> compiles source code into bytecode, and the JVM executes that bytecode. Also, a <code>.class</code> file is not Java source code.</p></div>',
      h2('Interview question'),
      p('<b>What is the difference between the JDK, JRE and JVM?</b> The JDK provides tools to develop Java applications and includes runtime components. The JRE describes the components used to run applications. The JVM is the engine within the runtime that executes bytecode.'),
      p('<b>Why can the same Java class run on different operating systems?</b> It contains bytecode, and each system can provide a compatible JVM implementation to execute that bytecode.'),
    ].join(''),
    exercise: {
      q: 'Fill in the development tool and the bytecode runtime.',
      code: 'The ___ provides javac. The ___ executes Java bytecode.',
      options: ['JDK', 'JVM', 'JRE', 'JAR'],
      answer: ['JDK', 'JVM'],
      explain: '<code>javac</code> is part of the JDK, while the JVM executes compiled bytecode.',
    },
  });

  JT.def('java_ca_fundamentals', {
    title: 'Pass-by-value and references',
    h1: 'Java <span>Pass-by-value and references</span>',
    body: () => JT.kit.coreLesson({
      title: 'Pass-by-value and references',
      what: 'Java is always <b>pass-by-value</b>. When you call a method, Java copies each argument into the method parameter.',
      why: 'For a primitive such as <code>int</code>, the copy is the number itself. For an object, the copy is the <em>reference</em> to the object, so the caller and the method point to the same object.',
      code: `
        public class Main {
            static void update(int count, StringBuilder message) {
                count = 99;
                message.append("!");
                message = new StringBuilder("Other text");
            }

            public static void main(String[] args) {
                int visits = 5;
                StringBuilder greeting = new StringBuilder("Hello");
                update(visits, greeting);
                System.out.println("Visits: " + visits);
                System.out.println("Greeting: " + greeting);
            }
        }`,
      output: 'Visits: 5\nGreeting: Hello!',
      how: 'Changing <code>count</code> only changes the method’s own copy, so <code>visits</code> stays 5. <code>message.append("!")</code> changes the shared object, so the caller sees <code>Hello!</code>. Assigning <code>message = new StringBuilder(...)</code> only points the local copy at another object; the caller’s <code>greeting</code> is not replaced.',
      diagram: '<figure class="concept-diagram" aria-labelledby="pass-value-title"><figcaption id="pass-value-title"><strong>What a method receives</strong><span>Both primitive values and object references are copied as arguments.</span></figcaption><div class="concept-choice"><div class="choice-card"><b>Primitive argument</b><span>Caller value → copied number → method changes its local copy</span></div><div class="choice-card"><b>Object argument</b><span>Caller reference → copied reference → both can reach the same object</span></div></div></figure>',
      points: ['A method can change an object it receives, through the copied reference.', 'A method cannot make the caller’s variable point to a different object.', 'Primitives are copied, so the caller never sees changes made to them.'],
      mistake: 'Saying “objects are passed by reference”. Java copies the reference value, which is why reassigning a parameter has no effect on the caller.',
    }),
  });
})();
