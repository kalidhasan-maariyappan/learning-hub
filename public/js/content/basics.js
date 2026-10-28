// Lessons: home, intro, setup, syntax, output, comments, variables, data types, casting, operators, strings, math, booleans.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, hr, ul, ol, note, syn, table, ex } = JT.h;
  const L = JT.link;

  JT.def('default', {
    title: 'Java Tutorial',
    h1: 'Java <span>Tutorial</span>',
    body: () => [
      '<div class="intro-panel">', h2('Learn Java step by step'),
      p('Java powers Android apps, bank back-ends, big-data tools and millions of server applications. It is free, it runs on Windows, macOS and Linux, and its strict, readable syntax makes it a great first "serious" language.'),
      p('<a class="btn" href="' + JT.url('java_intro') + '">Start learning Java ❯</a>'), '</div>',
      h2('Edit and run every example'),
      p('Each lesson contains small, focused programs. Press <b>Try it Yourself »</b> to open the example in an editor, change it and run it. Code is compiled and executed for real by the Java Development Kit on your machine — nothing is simulated.'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                System.out.println("Welcome to JavaTrail!");
            }
        }`),
      hr(),
      h2('Practice as you go'),
      p('Many lessons finish with a short fill-in-the-blank exercise, and every topic group ends with a <b>Code Challenge</b> where your program\'s output is checked automatically.'),
      '<div class="card-grid">',
      '<a class="card" href="' + JT.url('java_exercises') + '"><b>Exercises</b><small>Quick drag-and-drop checks</small></a>',
      '<a class="card" href="' + JT.url('java_challenges') + '"><b>Code Challenges</b><small>Write code, we run and grade it</small></a>',
      '<a class="card" href="' + JT.url('java_quiz') + '"><b>Quiz</b><small>25 multiple-choice questions</small></a>',
      '<a class="card" href="' + JT.url('java_compiler') + '"><b>Compiler</b><small>An empty editor to experiment in</small></a>',
      '</div>',
      hr(),
      h2('What this tutorial covers'),
      ul(['Syntax, output, variables and data types', 'Operators, strings and the Math class', 'Decisions and loops', 'Arrays and methods', 'Classes, objects, inheritance, interfaces and enums', 'Exceptions and debugging', 'Files and I/O streams', 'Collections: lists, sets, maps and iterators', 'Generics, lambdas, threads, regular expressions and more']),
      h2('Reference pages'),
      p('Look up keywords and the most used methods of <code>String</code>, <code>Math</code>, <code>Arrays</code>, <code>ArrayList</code>, <code>HashMap</code>, <code>Scanner</code> and more in the ' + L('java_ref_reference', 'Java Reference') + '.'),
    ].join(''),
    exercise: { q: 'Choose the method that prints a line of text.', code: 'System.out.___("Hello Java");', options: ['echo', 'println', 'printLine', 'write'], answer: ['println'], explain: '<code>System.out.println()</code> prints the text followed by a line break.' },
  });

  JT.def('java_intro', {
    body: () => [
      h2('What is Java?'),
      p('Java is a general-purpose, object-oriented programming language first released by Sun Microsystems in 1995 and now maintained by Oracle together with the OpenJDK community. A new version ships every six months, with a long-term-support (LTS) release every two years.'),
      p('Java source code is compiled into <b>bytecode</b>, a compact instruction format that runs on the <b>Java Virtual Machine (JVM)</b>. Because every operating system has a JVM, the same compiled program runs everywhere — the famous "write once, run anywhere" idea.'),
      h2('Where is Java used?'),
      ul(['Android applications', 'Web servers and REST APIs (Spring, Jakarta EE, Quarkus)', 'Financial and enterprise systems', 'Big-data tools such as Hadoop, Kafka and Spark', 'Desktop tools, including popular IDEs', 'Games and embedded devices']),
      h2('Why learn Java?'),
      ul(['It is one of the most requested languages in job listings.', 'Strong static typing catches many mistakes before the program runs.', 'A huge standard library: collections, networking, dates, files, concurrency.', 'Excellent free tools and a very large community.', 'Ideas you learn here transfer directly to C#, Kotlin and C++.']),
      note('You do not need any previous programming experience to follow this tutorial.'),
      h2('A first look'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                System.out.println("Java runs on the JVM.");
                System.out.println("Version: " + Runtime.version().feature());
            }
        }`, { desc: 'This program prints two lines; the second shows the major Java version that ran it.' }),
    ].join(''),
  });

  JT.def('java_getstarted', {
    body: () => [
      h2('Installing Java'),
      p('To write Java programs on your own computer you need a <b>JDK</b> (Java Development Kit). It contains the compiler <code>javac</code> and the launcher <code>java</code>. Free builds are available from OpenJDK distributors such as Eclipse Temurin, Microsoft, Amazon Corretto and Oracle.'),
      p('Check whether Java is already installed by opening a terminal and typing:'),
      syn(`java -version\njavac -version`, 'Terminal'),
      h2('Your first program'),
      p('Create a file called <code>Main.java</code>. The file name must match the name of the public class inside it, including upper and lower case.'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }`, { title: 'Main.java' }),
      h2('Compile and run'),
      ol(['<code>javac Main.java</code> compiles the source and creates <code>Main.class</code> (bytecode).', '<code>java Main</code> starts the JVM and runs the <code>main</code> method.']),
      p('Since Java 11 you can also run a single source file directly with <code>java Main.java</code>; it is compiled in memory first.'),
      note('In this tutorial you do not need to type terminal commands: the <b>Run</b> buttons send your code to a local runner that performs exactly these two steps for you.'),
    ].join(''),
  });

  JT.def('java_syntax', {
    body: () => [
      h2('The structure of a Java program'),
      p('Every line of Java code that runs must live inside a <b>class</b>. Programs start at a method with this exact signature:'),
      syn(`public static void main(String[] args)`),
      ex(`
        public class Main {
            public static void main(String[] args) {
                System.out.println("Inside main");
            }
        }`),
      h2('Explaining the parts'),
      table(['Part', 'Meaning'], [
        ['<code>public class Main</code>', 'Declares a class named <code>Main</code>. A public class must be saved in a file with the same name: <code>Main.java</code>.'],
        ['<code>{ }</code>', 'Curly braces mark the beginning and end of a block of code.'],
        ['<code>public static void main(String[] args)</code>', 'The entry point. The JVM calls it when the program starts.'],
        ['<code>System.out.println()</code>', 'Prints text to the console followed by a new line.'],
        ['<code>;</code>', 'Each statement ends with a semicolon.'],
      ]),
      h2('Rules worth remembering'),
      ul(['Java is <b>case-sensitive</b>: <code>Main</code> and <code>main</code> are different names.', 'Class names start with an uppercase letter by convention.', 'Whitespace and line breaks are ignored by the compiler — indent code to keep it readable.']),
    ].join(''),
    exercise: { q: 'Complete the entry point of a Java program.', code: 'public ___ void ___(String[] args) {\n}', options: ['static', 'main', 'start', 'final'], answer: ['static', 'main'] },
  });

  JT.def('java_statements', {
    body: () => [
      h2('Statements'),
      p('A <b>statement</b> is one instruction that the computer executes. Statements run one after another, from top to bottom, and each one ends with a semicolon.'),
      ex(`
        System.out.println("Step 1");
        System.out.println("Step 2");
        System.out.println("Step 3");`),
      h2('Forgetting the semicolon'),
      p('If a semicolon is missing the compiler stops with an error such as <code>\';\' expected</code>. Try it: remove a semicolon in the example and run it again.'),
      ex(`
        System.out.println("This line is fine");
        System.out.println("This one is missing a semicolon")`, { desc: 'This example fails to compile on purpose.' }),
      h2('Blocks'),
      p('Curly braces group several statements into a <b>block</b>. Blocks appear in classes, methods, conditions and loops.'),
    ].join(''),
  });

  JT.def('java_output', {
    body: () => [
      h2('Printing text'),
      p('<code>System.out.println()</code> writes a value to the console and then moves to a new line. Text must be wrapped in double quotes.'),
      ex(`
        System.out.println("Java is fun.");
        System.out.println("Each call starts a new line.");`),
      h2('print() without a line break'),
      p('<code>System.out.print()</code> works the same way but stays on the current line.'),
      ex(`
        System.out.print("Hello ");
        System.out.print("from ");
        System.out.println("one line!");
        System.out.println("Next line.");`),
      h2('Formatted output'),
      p('<code>System.out.printf()</code> inserts values into a template. <code>%s</code> stands for text, <code>%d</code> for whole numbers, <code>%.2f</code> for a decimal with two digits and <code>%n</code> for a line break.'),
      ex(`
        String item = "Coffee";
        int qty = 3;
        double price = 2.5;
        System.out.printf("%d x %s = %.2f EUR%n", qty, item, qty * price);`),
    ].join(''),
    exercise: { q: 'Print text on the same line, then finish the line.', code: 'System.out.___("Score: ");\nSystem.out.___(42);', options: ['println', 'print', 'printf', 'echo'], answer: ['print', 'println'] },
  });

  JT.def('java_output_numbers', {
    body: () => [
      h2('Printing numbers'),
      p('Numbers are printed without quotes. Java calculates the expression first and prints the result.'),
      ex(`
        System.out.println(7);
        System.out.println(7 + 5);
        System.out.println(7 * 5);`),
      h2('Numbers inside text'),
      p('Inside quotes a number is just text. Watch what happens when <code>+</code> meets a string: everything after it is joined as text, unless you use parentheses.'),
      ex(`
        System.out.println("7 + 5");
        System.out.println("Sum: " + 7 + 5);
        System.out.println("Sum: " + (7 + 5));`),
    ].join(''),
  });

  JT.challenge('syntax', {
    task: p('Write a complete program that prints exactly the two lines shown below.'),
    starter: `
      public class Main {
          public static void main(String[] args) {
              // print the two lines here
          }
      }`,
    expected: 'I am learning Java\nOne statement per line',
    hint: 'Use two <code>System.out.println()</code> statements, each ending with a semicolon.',
  });
  JT.challenge('output', {
    task: p('Print <code>Total: </code> followed by the result of <code>19 * 3</code>, then on the next line print three stars <code>***</code> using three separate <code>print()</code> calls.'),
    starter: `
      public class Main {
          public static void main(String[] args) {

          }
      }`,
    expected: 'Total: 57\n***',
    hint: 'Use parentheses or a separate calculation: <code>"Total: " + (19 * 3)</code>. After the stars you do not need a new line.',
  });

  JT.def('java_comments', {
    body: () => [
      h2('Why comment code?'),
      p('Comments are notes for humans. The compiler ignores them completely. Use them to explain <i>why</i> something is done, or to temporarily switch off a line while testing.'),
      h2('Single-line comments'),
      p('Everything after <code>//</code> until the end of the line is ignored.'),
      ex(`
        // Greet the user
        System.out.println("Hi!"); // this prints a greeting
        // System.out.println("This line never runs");`),
      h2('Multi-line comments'),
      p('Text between <code>/*</code> and <code>*/</code> can span several lines.'),
      ex(`
        /* The next statement prints a farewell.
           It is the last thing the program does. */
        System.out.println("Bye!");`),
      h2('Documentation comments'),
      p('Comments that start with <code>/**</code> are read by the <code>javadoc</code> tool to generate HTML documentation for classes and methods.'),
    ].join(''),
    exercise: { q: 'Turn the first line into a single-line comment.', code: '___ This line is a note\nSystem.out.println("Done");', options: ['#', '//', '<!--', '--'], answer: ['//'] },
  });

  // ---- Variables ----
  JT.def('java_variables', {
    body: () => [
      h2('What is a variable?'),
      p('A variable is a named box that holds a value. In Java every variable has a <b>type</b>, which decides what kind of value fits in the box:'),
      ul(['<code>int</code> — whole numbers such as <code>42</code> or <code>-7</code>', '<code>double</code> — decimal numbers such as <code>3.75</code>', '<code>char</code> — one character in single quotes, like <code>\'Q\'</code>', '<code>boolean</code> — <code>true</code> or <code>false</code>', '<code>String</code> — text in double quotes, like <code>"Oslo"</code>']),
      h2('Declaring a variable'),
      syn(`type name = value;`),
      ex(`
        String city = "Lisbon";
        int population = 545000;
        System.out.println(city);
        System.out.println(population);`),
      p('You can declare first and assign later:'),
      ex(`
        int level;
        level = 3;
        System.out.println(level);`),
      h2('Changing a value'),
      p('Assigning a new value replaces the old one.'),
      ex(`
        int lives = 3;
        lives = 2; // lost a life
        System.out.println(lives);`),
      note('A variable must be given a value before it is read; the compiler reports <code>variable might not have been initialized</code> otherwise.'),
    ].join(''),
    exercise: { q: 'Declare an integer variable named <code>age</code>.', code: '___ age = 30;\nSystem.out.println(age);', options: ['integer', 'int', 'num', 'Int'], answer: ['int'] },
  });

  JT.def('java_variables_print', {
    body: () => [
      h2('Printing variables'),
      p('Pass a variable to <code>println()</code> to print its value. Join text and variables with <code>+</code>.'),
      ex(`
        String language = "Java";
        System.out.println("I am learning " + language);`),
      p('Two strings joined with <code>+</code> become one string:'),
      ex(`
        String first = "Ada";
        String last = "Lovelace";
        String full = first + " " + last;
        System.out.println(full);`),
      p('With two numbers, <code>+</code> adds them:'),
      ex(`
        int a = 8;
        int b = 13;
        System.out.println(a + b);`),
    ].join(''),
  });

  JT.def('java_variables_multiple', {
    body: () => [
      h2('Several variables in one line'),
      p('Variables of the same type can be declared together, separated by commas.'),
      ex(`
        int x = 4, y = 9, z = 1;
        System.out.println(x + y + z);`),
      h2('One value for many variables'),
      p('Chained assignment gives several variables the same value.'),
      ex(`
        int red, green, blue;
        red = green = blue = 255;
        System.out.println(red + ", " + green + ", " + blue);`),
      note('Declaring one variable per line is usually easier to read, especially when each needs a comment.'),
    ].join(''),
  });

  JT.def('java_variables_identifiers', {
    body: () => [
      h2('Identifiers'),
      p('The name you give a variable, method or class is called an <b>identifier</b>. Good names make code self-explaining.'),
      ex(`
        // Clear
        int secondsPerMinute = 60;
        // Legal but cryptic
        int spm = 60;
        System.out.println(secondsPerMinute == spm);`),
      h2('Naming rules'),
      ul(['Names may contain letters, digits, <code>_</code> and <code>$</code>.', 'A name cannot start with a digit.', 'Names are case-sensitive: <code>total</code> and <code>Total</code> are different.', 'Reserved words such as <code>int</code>, <code>class</code> or <code>if</code> cannot be used.', 'Spaces are not allowed.']),
      h2('Conventions'),
      p('Variables and methods use <b>camelCase</b> (<code>maxSpeed</code>), classes use <b>PascalCase</b> (<code>BankAccount</code>), and constants use <b>UPPER_SNAKE_CASE</b> (<code>MAX_USERS</code>).'),
    ].join(''),
  });

  JT.def('java_variables_final', {
    body: () => [
      h2('Constants with final'),
      p('Mark a variable <code>final</code> when its value must never change after it is set. Trying to reassign it is a compile-time error.'),
      ex(`
        final double VAT_RATE = 0.21;
        double net = 50;
        System.out.println(net * (1 + VAT_RATE));`),
      ex(`
        final int DAYS_IN_WEEK = 7;
        DAYS_IN_WEEK = 8; // error: cannot assign a value to final variable
        System.out.println(DAYS_IN_WEEK);`, { desc: 'This example fails to compile on purpose.' }),
    ].join(''),
  });

  JT.def('java_variables_reallife', {
    body: () => [
      h2('Variables in practice'),
      p('A small receipt calculation uses several types together:'),
      ex(`
        String product = "Headphones";
        int quantity = 2;
        double unitPrice = 39.90;
        double total = quantity * unitPrice;
        char currency = '$';
        System.out.println(product + " x" + quantity);
        System.out.println("Total: " + currency + total);`),
      h3('Area of a rectangle'),
      ex(`
        int width = 12;
        int height = 5;
        int area = width * height;
        System.out.println("Area = " + area + " m2");`),
    ].join(''),
  });

  JT.challenge('variables', {
    task: p('Create a <code>String</code> variable <code>name</code> with the value <code>Mia</code> and an <code>int</code> variable <code>points</code> with the value <code>120</code>. Then add <code>30</code> to <code>points</code> and print the line shown below using both variables.'),
    starter: `
      public class Main {
          public static void main(String[] args) {

          }
      }`,
    expected: 'Mia has 150 points',
    hint: '<code>points = points + 30;</code> then <code>System.out.println(name + " has " + points + " points");</code>',
  });

  // ---- Data types ----
  JT.def('java_data_types', {
    body: () => [
      h2('Two families of types'),
      p('Java has eight <b>primitive</b> types that hold simple values directly, and <b>reference</b> (non-primitive) types such as <code>String</code>, arrays and classes, which refer to objects.'),
      table(['Type', 'Size', 'Holds'], [
        ['<code>byte</code>', '1 byte', 'whole numbers from -128 to 127'],
        ['<code>short</code>', '2 bytes', 'whole numbers from -32,768 to 32,767'],
        ['<code>int</code>', '4 bytes', 'whole numbers up to about ±2.1 billion'],
        ['<code>long</code>', '8 bytes', 'very large whole numbers (suffix <code>L</code>)'],
        ['<code>float</code>', '4 bytes', 'decimals with ~7 significant digits (suffix <code>f</code>)'],
        ['<code>double</code>', '8 bytes', 'decimals with ~15 significant digits'],
        ['<code>boolean</code>', '—', '<code>true</code> or <code>false</code>'],
        ['<code>char</code>', '2 bytes', 'one UTF-16 character'],
      ]),
      ex(`
        int year = 2026;
        double temperature = 21.5;
        char grade = 'A';
        boolean raining = false;
        String note = "Sunny";
        System.out.println(year + " " + temperature + " " + grade + " " + raining + " " + note);`),
    ].join(''),
    exercise: { q: 'Pick the correct types.', code: '___ distance = 12.75;\n___ initial = \'J\';', options: ['double', 'char', 'int', 'String'], answer: ['double', 'char'] },
  });

  JT.def('java_data_types_numbers', {
    body: () => [
      h2('Whole numbers'),
      p('Use <code>int</code> for everyday counting. Use <code>long</code> when values may exceed about 2 billion and add an <code>L</code> to literals.'),
      ex(`
        byte small = 100;
        short medium = 30000;
        int normal = 2_000_000; // underscores improve readability
        long huge = 9_000_000_000L;
        System.out.println(small + " " + medium + " " + normal + " " + huge);
        System.out.println("int max: " + Integer.MAX_VALUE);`),
      h2('Decimal numbers'),
      p('<code>double</code> is the default for decimals. <code>float</code> literals need an <code>f</code> suffix. Scientific notation uses <code>e</code>.'),
      ex(`
        float f = 3.14159f;
        double d = 3.141592653589793;
        double lightSpeed = 2.998e8;
        System.out.println(f);
        System.out.println(d);
        System.out.println(lightSpeed);`),
      note('Floating-point numbers are approximations: <code>0.1 + 0.2</code> prints <code>0.30000000000000004</code>. Use <code>java.math.BigDecimal</code> for money.'),
    ].join(''),
  });

  JT.def('java_data_types_boolean', {
    body: () => [
      h2('boolean'),
      p('A <code>boolean</code> holds one of two values, <code>true</code> or <code>false</code>. Comparisons produce booleans, and conditions and loops consume them.'),
      ex(`
        boolean loggedIn = true;
        boolean isAdmin = false;
        System.out.println(loggedIn);
        System.out.println(isAdmin);
        System.out.println(10 > 3);`),
      p('You will use booleans constantly in ' + L('java_conditions', 'if statements') + '.'),
    ].join(''),
  });

  JT.def('java_data_types_characters', {
    body: () => [
      h2('char'),
      p('A <code>char</code> stores a single character in single quotes. Internally it is a number (its Unicode code), so you can do arithmetic with it.'),
      ex(`
        char letter = 'K';
        char next = (char) (letter + 1);
        int code = letter;
        System.out.println(letter + " -> " + next);
        System.out.println("Unicode value of K: " + code);`),
      ex(`
        char euro = '\\u20AC';
        System.out.println("Price in " + euro);`, { desc: 'Characters can also be written as Unicode escapes.' }),
    ].join(''),
  });

  JT.def('java_data_types_reallife', {
    body: () => [
      h2('Choosing types for a real task'),
      p('A shop item could be described with several types at once:'),
      ex(`
        String name = "USB-C cable";
        int stock = 87;
        double price = 7.49;
        boolean onSale = true;
        char sizeCode = 'M';
        System.out.println(name + " (" + sizeCode + ")");
        System.out.println("In stock: " + stock);
        System.out.println("Price: " + price + (onSale ? " — on sale!" : ""));`),
    ].join(''),
  });

  JT.def('java_data_types_non-prim', {
    body: () => [
      h2('Non-primitive (reference) types'),
      p('Strings, arrays, classes and interfaces are reference types. A reference variable stores <i>where</i> an object lives, not the object itself.'),
      ul(['Primitive types are predefined; reference types are mostly created by programmers (and the Java library).', 'Reference types can call methods: <code>name.length()</code>.', 'A reference can be <code>null</code> — pointing at nothing. A primitive always has a value.', 'Primitive type names start with a lowercase letter; class names start with an uppercase letter.']),
      ex(`
        String word = "variable";
        int[] scores = {7, 9, 4};
        System.out.println(word.toUpperCase());
        System.out.println(scores.length);
        String nothing = null;
        System.out.println(nothing == null);`),
    ].join(''),
  });

  JT.def('java_var', {
    body: () => [
      h2('The var keyword'),
      p('Since Java 10, local variables can be declared with <code>var</code>. The compiler infers the type from the value on the right; the variable is still strongly typed.'),
      ex(`
        var count = 10;          // int
        var ratio = 0.75;        // double
        var title = "Report";    // String
        var list = new java.util.ArrayList<String>();
        list.add(title);
        System.out.println(count + " " + ratio + " " + list);`),
      note('<code>var</code> needs an initial value and only works for local variables, not fields or method parameters.'),
    ].join(''),
  });

  JT.challenge('data_types', {
    task: p('Declare a <code>long</code> with the value <code>8000000000</code>, a <code>double</code> with <code>2.5</code> and a <code>char</code> with <code>Z</code>. Print each one on its own line in that order.'),
    starter: `
      public class Main {
          public static void main(String[] args) {

          }
      }`,
    expected: '8000000000\n2.5\nZ',
    hint: 'A long literal this large needs the <code>L</code> suffix: <code>8000000000L</code>.',
  });

  JT.def('java_type_casting', {
    body: () => [
      h2('Converting between types'),
      p('<b>Casting</b> converts a value from one primitive type to another.'),
      ul(['<b>Widening</b> (automatic): smaller to larger — <code>byte → short → char → int → long → float → double</code>.', '<b>Narrowing</b> (manual): larger to smaller, written with the target type in parentheses. Information may be lost.']),
      ex(`
        int whole = 42;
        double wide = whole;      // automatic
        System.out.println(wide);

        double precise = 9.87;
        int cut = (int) precise;  // manual, decimals are dropped
        System.out.println(cut);`),
      h2('A practical case'),
      p('Integer division drops the remainder. Cast one operand to <code>double</code> to get an exact percentage.'),
      ex(`
        int correct = 17;
        int total = 20;
        System.out.println(correct / total * 100);
        System.out.println((double) correct / total * 100);`),
    ].join(''),
    exercise: { q: 'Convert the double into an int.', code: 'double price = 19.99;\nint rounded = ___ price;', options: ['(int)', 'int()', '[int]', 'toInt'], answer: ['(int)'] },
  });

  // ---- Operators ----
  JT.def('java_operators', {
    body: () => [
      h2('Operators'),
      p('Operators perform actions on values (operands). Java groups them into arithmetic, assignment, comparison, logical and bitwise operators.'),
      ex(`
        int apples = 12;
        int eaten = 5;
        int left = apples - eaten;
        System.out.println(left);
        System.out.println(left > 5);`),
      p('Each group is explained on its own page: ' + ['java_operators_arithmetic', 'java_operators_assign', 'java_operators_comparison', 'java_operators_logical', 'java_operators_precedence'].map((s) => L(s, JT.navInfo[s].title)).join(', ') + '.'),
    ].join(''),
  });

  JT.def('java_operators_arithmetic', {
    body: () => [
      h2('Arithmetic operators'),
      table(['Operator', 'Name', 'Example'], [
        ['<code>+</code>', 'Addition', '<code>a + b</code>'], ['<code>-</code>', 'Subtraction', '<code>a - b</code>'], ['<code>*</code>', 'Multiplication', '<code>a * b</code>'],
        ['<code>/</code>', 'Division', '<code>a / b</code>'], ['<code>%</code>', 'Remainder (modulus)', '<code>a % b</code>'], ['<code>++</code>', 'Increment by 1', '<code>a++</code>'], ['<code>--</code>', 'Decrement by 1', '<code>a--</code>'],
      ]),
      ex(`
        int a = 17, b = 5;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);   // integer division
        System.out.println(a % b);   // remainder
        System.out.println(17.0 / 5); // decimal division`),
      h2('Prefix and postfix'),
      ex(`
        int n = 5;
        System.out.println(n++); // prints 5, then n becomes 6
        System.out.println(++n); // n becomes 7, then prints 7`),
    ].join(''),
  });

  JT.def('java_operators_assign', {
    body: () => [
      h2('Assignment operators'),
      p('<code>=</code> stores a value. Compound operators combine a calculation with assignment.'),
      table(['Operator', 'Same as'], [['<code>x += 3</code>', '<code>x = x + 3</code>'], ['<code>x -= 3</code>', '<code>x = x - 3</code>'], ['<code>x *= 3</code>', '<code>x = x * 3</code>'], ['<code>x /= 3</code>', '<code>x = x / 3</code>'], ['<code>x %= 3</code>', '<code>x = x % 3</code>']]),
      ex(`
        int balance = 100;
        balance += 50;
        balance -= 30;
        balance *= 2;
        System.out.println(balance);`),
    ].join(''),
  });

  JT.def('java_operators_comparison', {
    body: () => [
      h2('Comparison operators'),
      p('Comparisons return a <code>boolean</code>.'),
      table(['Operator', 'Meaning'], [['<code>==</code>', 'equal to'], ['<code>!=</code>', 'not equal'], ['<code>&gt;</code>', 'greater than'], ['<code>&lt;</code>', 'less than'], ['<code>&gt;=</code>', 'greater than or equal'], ['<code>&lt;=</code>', 'less than or equal']]),
      ex(`
        int age = 18;
        System.out.println(age >= 18);
        System.out.println(age == 21);
        System.out.println(age != 21);`),
      note('Compare <code>String</code> contents with <code>equals()</code>, not <code>==</code>. See ' + L('java_strings') + '.'),
    ].join(''),
  });

  JT.def('java_operators_logical', {
    body: () => [
      h2('Logical operators'),
      table(['Operator', 'Name', 'True when'], [['<code>&amp;&amp;</code>', 'and', 'both sides are true'], ['<code>||</code>', 'or', 'at least one side is true'], ['<code>!</code>', 'not', 'the value is false']]),
      ex(`
        int hour = 14;
        boolean weekend = false;
        System.out.println(hour >= 9 && hour < 17);
        System.out.println(weekend || hour > 20);
        System.out.println(!weekend);`),
      p('<code>&amp;&amp;</code> and <code>||</code> <b>short-circuit</b>: the right side is skipped when the left side already decides the result.'),
    ].join(''),
  });

  JT.def('java_operators_precedence', {
    body: () => [
      h2('Operator precedence'),
      p('When an expression has several operators, Java evaluates them in a fixed order: unary operators, then <code>* / %</code>, then <code>+ -</code>, then comparisons, then <code>&amp;&amp;</code>, then <code>||</code>, and assignment last.'),
      ex(`
        System.out.println(2 + 3 * 4);     // multiplication first
        System.out.println((2 + 3) * 4);   // parentheses first
        System.out.println(10 - 4 - 3);    // left to right
        System.out.println(5 > 3 && 2 > 4 || true);`),
      note('When in doubt, add parentheses. They cost nothing and make intent obvious.'),
    ].join(''),
  });

  JT.challenge('operators', {
    task: p('Given <code>int minutes = 135;</code>, print how many whole hours and remaining minutes that is, in the format below. Use <code>/</code> and <code>%</code>.'),
    starter: `
      public class Main {
          public static void main(String[] args) {
              int minutes = 135;

          }
      }`,
    expected: '2 h 15 min',
    hint: '<code>minutes / 60</code> gives the hours and <code>minutes % 60</code> the rest.',
  });

  // ---- Strings ----
  JT.def('java_strings', {
    body: () => [
      h2('Strings'),
      p('A <code>String</code> is a sequence of characters in double quotes. Strings are objects with many useful methods, and they are <b>immutable</b>: methods return new strings instead of changing the original.'),
      ex(`
        String msg = "Java Strings";
        System.out.println(msg.length());
        System.out.println(msg.toUpperCase());
        System.out.println(msg.toLowerCase());
        System.out.println(msg.charAt(0));
        System.out.println(msg.indexOf("Str"));`),
      h2('Comparing strings'),
      p('Use <code>equals()</code> to compare contents. <code>==</code> only checks whether two variables refer to the same object.'),
      ex(`
        String a = "hello";
        String b = new String("hello");
        System.out.println(a.equals(b));
        System.out.println(a == b);
        System.out.println("HELLO".equalsIgnoreCase(a));`),
      h2('More useful methods'),
      ex(`
        String s = "  red,green,blue  ";
        String t = s.trim();
        System.out.println(t);
        System.out.println(t.contains("green"));
        System.out.println(t.replace(",", " | "));
        System.out.println(t.substring(4, 9));
        System.out.println(String.join("-", t.split(",")));`),
      p('All methods are listed in the ' + L('java_ref_string', 'String reference') + '.'),
    ].join(''),
    exercise: { q: 'Get the number of characters in the string.', code: 'String word = "compiler";\nSystem.out.println(word.___());', options: ['size', 'length', 'count', 'len'], answer: ['length'] },
  });

  JT.def('java_strings_concat', {
    body: () => [
      h2('Joining strings'),
      p('The <code>+</code> operator joins strings. The <code>concat()</code> method does the same.'),
      ex(`
        String greeting = "Good";
        String time = "morning";
        System.out.println(greeting + " " + time);
        System.out.println(greeting.concat(" evening"));`),
      h2('Building strings in a loop'),
      p('Each <code>+</code> creates a new string. When you join many pieces, a <code>StringBuilder</code> is faster.'),
      ex(`
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append(i).append(i < 5 ? "," : "");
        }
        System.out.println(sb.toString());`),
    ].join(''),
  });

  JT.def('java_strings_numbers', {
    body: () => [
      h2('Numbers and strings'),
      p('<code>+</code> adds numbers but joins strings. If either side is a string, the other side is converted to text.'),
      ex(`
        int x = 4, y = 6;
        String s1 = "4", s2 = "6";
        System.out.println(x + y);
        System.out.println(s1 + s2);
        System.out.println(s1 + y);`),
      h2('Converting'),
      ex(`
        int parsed = Integer.parseInt("250");
        double d = Double.parseDouble("2.75");
        String back = String.valueOf(parsed + 1);
        System.out.println(parsed * 2);
        System.out.println(d + 1);
        System.out.println(back.length());`),
    ].join(''),
  });

  JT.def('java_strings_specchars', {
    body: () => [
      h2('Escape sequences'),
      p('Some characters cannot be typed directly inside a string. A backslash starts an <b>escape sequence</b>.'),
      table(['Escape', 'Result'], [['<code>\\"</code>', 'double quote'], ['<code>\\\'</code>', 'single quote'], ['<code>\\\\</code>', 'backslash'], ['<code>\\n</code>', 'new line'], ['<code>\\t</code>', 'tab']]),
      ex(`
        System.out.println("She said \\"hi\\".");
        System.out.println("C:\\\\Users\\\\dev");
        System.out.println("Name:\\tAlex\\nAge:\\t31");`),
      h2('Text blocks'),
      p('Since Java 15, triple quotes create multi-line strings without escapes.'),
      ex(`
        String json = """
            {
              "lang": "Java",
              "fun": true
            }
            """;
        System.out.print(json);`),
    ].join(''),
  });

  JT.challenge('strings', {
    task: p('Given <code>String word = "Programming";</code> print, on separate lines: its length, the word in upper case, and its first three letters.'),
    starter: `
      public class Main {
          public static void main(String[] args) {
              String word = "Programming";

          }
      }`,
    expected: '11\nPROGRAMMING\nPro',
    hint: '<code>length()</code>, <code>toUpperCase()</code> and <code>substring(0, 3)</code>.',
  });

  JT.def('java_math', {
    body: () => [
      h2('The Math class'),
      p('<code>Math</code> offers static methods for common calculations — no object is needed.'),
      ex(`
        System.out.println(Math.max(8, 13));
        System.out.println(Math.min(8, 13));
        System.out.println(Math.sqrt(81));
        System.out.println(Math.abs(-4.5));
        System.out.println(Math.pow(2, 10));
        System.out.println(Math.round(2.5));
        System.out.println(Math.floor(2.9) + " " + Math.ceil(2.1));`),
      h2('Random numbers'),
      p('<code>Math.random()</code> returns a double between 0.0 (inclusive) and 1.0 (exclusive). Scale it to get a range.'),
      ex(`
        int dice = (int) (Math.random() * 6) + 1;
        System.out.println("You rolled " + dice);`),
      p('More in the ' + L('java_ref_math', 'Math reference') + '.'),
    ].join(''),
    exercise: { q: 'Find the larger of two numbers.', code: 'int big = Math.___(4, 9);', options: ['max', 'top', 'larger', 'high'], answer: ['max'] },
  });

  JT.def('java_booleans', {
    body: () => [
      h2('Boolean expressions'),
      p('A boolean expression evaluates to <code>true</code> or <code>false</code>. They are the basis of every decision a program makes.'),
      ex(`
        int speed = 72;
        int limit = 50;
        boolean speeding = speed > limit;
        System.out.println(speeding);
        System.out.println(speed == limit);`),
    ].join(''),
  });
  JT.def('java_booleans_reallife', {
    body: () => [
      h2('Example: can this person vote?'),
      ex(`
        int age = 19;
        int votingAge = 18;
        if (age >= votingAge) {
            System.out.println("Old enough to vote.");
        } else {
            System.out.println("Not old enough yet.");
        }`),
    ].join(''),
  });
  JT.challenge('booleans', {
    task: p('Given <code>int temperature = 23;</code> create a boolean <code>pleasant</code> that is true when the temperature is between 18 and 26 (inclusive). Print it.'),
    starter: `
      public class Main {
          public static void main(String[] args) {
              int temperature = 23;

          }
      }`,
    expected: 'true',
    hint: 'Combine two comparisons with <code>&amp;&amp;</code>.',
  });
})();
