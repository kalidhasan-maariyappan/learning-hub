// Lessons: errors, debugging, exceptions, file handling and I/O streams.
// File examples always create their own files first: each run starts in an empty temp directory.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, note, syn, table, ex } = JT.h;

  JT.def('java_errors', {
    body: () => [
      h2('Three kinds of errors'),
      table(['Kind', 'When it shows up', 'Example'], [
        ['<b>Compile-time error</b>', '<code>javac</code> refuses to build the program', 'missing semicolon, misspelled name, wrong type'],
        ['<b>Runtime error</b> (exception)', 'the program compiles but crashes while running', 'dividing by zero, index out of bounds, <code>null</code> access'],
        ['<b>Logic error</b>', 'the program runs but gives a wrong result', '<code>&lt;</code> instead of <code>&lt;=</code>, wrong formula'],
      ]),
      h2('Compile-time errors'),
      p('The compiler tells you the file, the line number and what it expected. Always read the <b>first</b> error first: later errors are often caused by it.'),
      ex(`
        int count = 10
        String label = "items";
        System.out.println(count + " " + lable);`, { desc: 'This example fails to compile on purpose: there are two mistakes. Fix them and run it again.' }),
      h2('Runtime errors'),
      p('A runtime error throws an <b>exception</b>. If nothing catches it, the program stops and prints the exception type, a message and a <b>stack trace</b> showing where it happened.'),
      ex(`
        int[] scores = { 70, 85, 92 };
        System.out.println("Before");
        System.out.println(scores[3]);
        System.out.println("After");   // never reached`, { desc: 'This example throws an exception on purpose. Look for the line number in the stack trace.' }),
      h2('Logic errors'),
      p('Logic errors are the hardest because nothing complains. Test with values whose answer you already know.'),
      ex(`
        // Intended: average of 4 and 5 is 4.5
        int a = 4, b = 5;
        double wrong = (a + b) / 2;      // integer division happens first
        double right = (a + b) / 2.0;
        System.out.println(wrong + " vs " + right);`),
    ].join(''),
    exercise: { q: 'Which kind of error is a missing semicolon?', code: 'A missing semicolon is a ___ error.', options: ['compile-time', 'runtime', 'logic', 'network'], answer: ['compile-time'] },
  });

  JT.def('java_debugging', {
    body: () => [
      h2('What is debugging?'),
      p('Debugging is finding out <b>why</b> a program does not do what you expect, then fixing it. A good routine:'),
      ul([
        '<b>Reproduce</b> the problem with the smallest input that shows it.',
        '<b>Read</b> the error message and stack trace. The topmost line in <i>your</i> code is usually the place to look.',
        '<b>Inspect</b> values while the program runs, with print statements or a debugger.',
        '<b>Change one thing</b> at a time and re-run.',
      ]),
      h2('Print debugging'),
      p('The quickest technique: print variables at key points and compare them with what you expected.'),
      ex(`
        int[] prices = { 12, 30, 8, 45 };
        int max = 0;
        for (int i = 1; i < prices.length; i++) {      // bug: starts at 1
            System.out.println("i=" + i + " price=" + prices[i] + " max=" + max);
            if (prices[i] > max) max = prices[i];
        }
        System.out.println("Max: " + max);`, { desc: 'The trace output shows that index 0 is never checked. It goes unnoticed here because 12 is not the maximum. Change <code>i = 1</code> to <code>i = 0</code>.' }),
      h2('Reading a stack trace'),
      ex(`
        public class Main {
            static int parseAge(String text) {
                return Integer.parseInt(text.trim());
            }

            static void register(String name, String age) {
                System.out.println(name + " is " + parseAge(age));
            }

            public static void main(String[] args) {
                register("Yusuf", "41");
                register("Mei", "forty");
            }
        }`, { desc: 'This example throws an exception on purpose. Read the trace from the top: the exception type and message, then the chain of method calls from <code>parseAge</code> down to <code>main</code>.' }),
      h2('Using a debugger'),
      p('IDEs such as IntelliJ IDEA, Eclipse and VS Code let you set <b>breakpoints</b>, pause the program, look at every variable and step through the code line by line. The command-line JDK includes <code>jdb</code> for the same job. Learning a debugger pays off quickly once programs grow.'),
      note('Remove or disable debug prints when you are done. Larger programs use a logging library so that messages can be switched on and off.'),
    ].join(''),
  });

  JT.def('java_try_catch', {
    body: () => [
      h2('try and catch'),
      p('Put code that might fail in a <code>try</code> block. If an exception is thrown, Java jumps to the matching <code>catch</code> block instead of crashing.'),
      syn(`try {\n    // code that may throw\n} catch (ExceptionType e) {\n    // handle it\n}`),
      ex(`
        String[] inputs = { "12", "seven", "30" };
        int total = 0;
        for (String s : inputs) {
            try {
                total += Integer.parseInt(s);
            } catch (NumberFormatException e) {
                System.out.println("Skipping \\"" + s + "\\": not a number");
            }
        }
        System.out.println("Total: " + total);`),
      h2('finally'),
      p('A <code>finally</code> block always runs, whether or not an exception occurred. It is used for clean-up.'),
      ex(`
        try {
            System.out.println("Opening connection");
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Closing connection");
        }`),
      h2('throw'),
      p('Use <code>throw</code> to signal a problem yourself, usually with a built-in exception type and a clear message.'),
      ex(`
        public class Main {
            static void checkAge(int age) {
                if (age < 0) {
                    throw new IllegalArgumentException("Age cannot be negative: " + age);
                }
                System.out.println("Age " + age + " accepted");
            }

            public static void main(String[] args) {
                checkAge(25);
                try {
                    checkAge(-3);
                } catch (IllegalArgumentException e) {
                    System.out.println("Caught: " + e.getMessage());
                }
            }
        }`),
      h2('Checked and unchecked exceptions'),
      p('<b>Checked</b> exceptions (such as <code>IOException</code>) must be caught or declared with <code>throws</code> in the method signature; the compiler enforces it. <b>Unchecked</b> exceptions (subclasses of <code>RuntimeException</code>, such as <code>NullPointerException</code>) usually indicate bugs and need not be declared.'),
      ex(`
        public class Main {
            static String readConfig(String name) throws java.io.IOException {
                if (!name.endsWith(".cfg")) throw new java.io.IOException("Not a config file: " + name);
                return "ok";
            }

            public static void main(String[] args) {
                try {
                    System.out.println(readConfig("app.cfg"));
                    System.out.println(readConfig("photo.png"));
                } catch (java.io.IOException e) {
                    System.out.println("Problem: " + e.getMessage());
                }
            }
        }`),
      h2('Your own exception'),
      ex(`
        class InsufficientFundsException extends Exception {
            InsufficientFundsException(String message) { super(message); }
        }

        public class Main {
            static double balance = 50;

            static void withdraw(double amount) throws InsufficientFundsException {
                if (amount > balance) throw new InsufficientFundsException("Balance " + balance + " is less than " + amount);
                balance -= amount;
            }

            public static void main(String[] args) {
                try {
                    withdraw(20);
                    withdraw(100);
                } catch (InsufficientFundsException e) {
                    System.out.println(e.getMessage());
                }
                System.out.println("Left: " + balance);
            }
        }`),
    ].join(''),
    exercise: { q: 'Complete the code so the error is handled.', code: '___ {\n    int x = 5 / 0;\n} ___ (ArithmeticException e) {\n    System.out.println("Oops");\n}', options: ['try', 'catch', 'throw', 'finally', 'except'], answer: ['try', 'catch'] },
  });

  JT.def('java_exceptions_multiple', {
    body: () => [
      h2('Several catch blocks'),
      p('A <code>try</code> can be followed by several <code>catch</code> blocks. Java uses the <b>first</b> one whose type matches, so put specific types before general ones.'),
      ex(`
        String[] data = { "8", null, "x", "4" };
        for (int i = 0; i <= data.length; i++) {
            try {
                int n = Integer.parseInt(data[i].trim());
                System.out.println("100 / " + n + " = " + 100 / n);
            } catch (NumberFormatException e) {
                System.out.println(i + ": not a number");
            } catch (NullPointerException e) {
                System.out.println(i + ": missing value");
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println(i + ": past the end of the array");
            }
        }`),
      h2('Multi-catch'),
      p('When several exception types are handled the same way, list them in one <code>catch</code> separated by <code>|</code>.'),
      ex(`
        String[] tries = { "12", "abc", "0" };
        for (String t : tries) {
            try {
                System.out.println(60 / Integer.parseInt(t));
            } catch (NumberFormatException | ArithmeticException e) {
                System.out.println("Cannot use \\"" + t + "\\": " + e.getClass().getSimpleName());
            }
        }`),
      h2('Order matters'),
      p('Catching a superclass before its subclass is a compile error, because the second block could never run.'),
      ex(`
        try {
            int[] a = new int[2];
            a[5] = 1;
        } catch (RuntimeException e) {
            System.out.println("general");
        } catch (ArrayIndexOutOfBoundsException e) {   // error: already caught
            System.out.println("specific");
        }`, { desc: 'This example fails to compile on purpose. Swap the two catch blocks to fix it.' }),
    ].join(''),
    exercise: { q: 'Catch two exception types in one block.', code: 'catch (NumberFormatException ___ ArithmeticException e) { }', options: ['|', '||', ',', '&'], answer: ['|'] },
  });

  JT.def('java_try_catch_resources', {
    body: () => [
      h2('try-with-resources'),
      p('Files, network connections and similar <b>resources</b> must be closed after use. Declaring them in parentheses after <code>try</code> closes them automatically, even if an exception is thrown. Any class that implements <code>AutoCloseable</code> works.'),
      syn(`try (ResourceType r = new ResourceType()) {\n    // use r\n} // r.close() is called here automatically`),
      ex(`
        class Door implements AutoCloseable {
            String name;
            Door(String name) { this.name = name; System.out.println("open " + name); }
            void walkThrough() { System.out.println("walking through " + name); }
            @Override public void close() { System.out.println("close " + name); }
        }

        public class Main {
            public static void main(String[] args) {
                try (Door front = new Door("front"); Door back = new Door("back")) {
                    front.walkThrough();
                    back.walkThrough();
                }
                System.out.println("done");
            }
        }`, { desc: 'Resources are closed in reverse order of opening.' }),
      h2('With a real file'),
      ex(`
        Files.writeString(Path.of("notes.txt"), "first line\\nsecond line\\n");

        try (BufferedReader reader = Files.newBufferedReader(Path.of("notes.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("> " + line);
            }
        } catch (IOException e) {
            System.out.println("Could not read: " + e.getMessage());
        }`),
      h2('Closing even on error'),
      ex(`
        class Connection implements AutoCloseable {
            Connection() { System.out.println("connected"); }
            void send(String msg) {
                if (msg.isEmpty()) throw new IllegalStateException("empty message");
                System.out.println("sent: " + msg);
            }
            @Override public void close() { System.out.println("disconnected"); }
        }

        public class Main {
            public static void main(String[] args) {
                try (Connection c = new Connection()) {
                    c.send("hello");
                    c.send("");
                } catch (IllegalStateException e) {
                    System.out.println("error: " + e.getMessage());
                }
            }
        }`, { desc: 'Notice that "disconnected" is printed before the catch block runs.' }),
    ].join(''),
  });

  JT.def('java_files', {
    body: () => [
      h2('Working with files'),
      p('Java has two file APIs:'),
      table(['API', 'Package', 'Main types', 'Notes'], [
        ['Classic', '<code>java.io</code>', '<code>File</code>, <code>FileReader</code>, <code>FileWriter</code>, streams', 'available since Java 1.0'],
        ['NIO.2', '<code>java.nio.file</code>', '<code>Path</code>, <code>Files</code>', 'since Java 7; clearer errors, one-line helpers'],
      ]),
      p('New code usually uses <code>Path</code> and <code>Files</code>, but you will meet <code>File</code> in plenty of existing code, so both are shown.'),
      h2('Getting file information'),
      ex(`
        Files.writeString(Path.of("report.txt"), "Quarterly numbers");

        File f = new File("report.txt");
        System.out.println("exists:   " + f.exists());
        System.out.println("name:     " + f.getName());
        System.out.println("size:     " + f.length() + " bytes");
        System.out.println("readable: " + f.canRead());

        Path p = Path.of("report.txt");
        System.out.println("NIO size: " + Files.size(p));
        System.out.println("missing:  " + Files.exists(Path.of("nope.txt")));`),
      note('Relative paths such as <code>report.txt</code> are resolved against the program\'s working directory. On this site every run gets a fresh, empty, temporary directory that is deleted afterwards.'),
      p('The next pages cover creating, writing, reading and deleting files.'),
    ].join(''),
    exercise: { q: 'Create a <code>File</code> object for <code>data.csv</code>.', code: 'File f = new ___("data.csv");', options: ['File', 'Path', 'Files', 'FileReader'], answer: ['File'] },
  });

  JT.def('java_files_create', {
    body: () => [
      h2('Create a file'),
      p('<code>File.createNewFile()</code> creates an empty file and returns <code>false</code> if it already exists. It throws a checked <code>IOException</code>, so it needs <code>try/catch</code> or <code>throws</code>.'),
      ex(`
        import java.io.File;
        import java.io.IOException;

        public class Main {
            public static void main(String[] args) {
                try {
                    File f = new File("todo.txt");
                    if (f.createNewFile()) {
                        System.out.println("Created " + f.getName());
                    } else {
                        System.out.println("Already exists");
                    }
                    System.out.println("Second try: " + f.createNewFile());
                } catch (IOException e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }
        }`),
      h2('With NIO'),
      p('<code>Files.createFile</code> throws <code>FileAlreadyExistsException</code> instead of returning <code>false</code>. <code>Files.createDirectories</code> creates a whole folder path.'),
      ex(`
        Path dir = Files.createDirectories(Path.of("data", "2031"));
        Path file = Files.createFile(dir.resolve("log.txt"));
        System.out.println("Created " + file);
        try {
            Files.createFile(file);
        } catch (FileAlreadyExistsException e) {
            System.out.println("Already there: " + e.getFile());
        }`),
    ].join(''),
  });

  JT.def('java_files_write', {
    body: () => [
      h2('Write to a file'),
      p('<code>FileWriter</code> writes text. By default it replaces the file\'s contents; pass <code>true</code> as a second argument to <b>append</b> instead.'),
      ex(`
        import java.io.*;

        public class Main {
            public static void main(String[] args) throws IOException {
                try (FileWriter w = new FileWriter("shopping.txt")) {
                    w.write("rice\\n");
                    w.write("lentils\\n");
                }
                try (FileWriter w = new FileWriter("shopping.txt", true)) {   // append
                    w.write("cumin\\n");
                }
                System.out.print(new String(java.nio.file.Files.readAllBytes(java.nio.file.Path.of("shopping.txt"))));
            }
        }`),
      h2('One-liners with Files'),
      ex(`
        Path p = Path.of("poem.txt");
        Files.writeString(p, "Roses are red\\n");
        Files.writeString(p, "Violets are blue\\n", StandardOpenOption.APPEND);
        Files.write(p, List.of("Java is fun", "and so are you"), StandardOpenOption.APPEND);
        System.out.print(Files.readString(p));`),
      note('Text is written using a character encoding. <code>Files</code> methods default to UTF-8. Specify the encoding explicitly when exchanging files with other systems.'),
    ].join(''),
    exercise: { q: 'Open the file in <b>append</b> mode.', code: 'new FileWriter("log.txt", ___)', options: ['true', 'false', '"a"', 'APPEND'], answer: ['true'] },
  });

  JT.def('java_files_read', {
    body: () => [
      h2('Read a file'),
      p('A <code>Scanner</code> can read a file line by line, just like it reads keyboard input.'),
      ex(`
        import java.io.*;
        import java.nio.file.*;
        import java.util.Scanner;

        public class Main {
            public static void main(String[] args) throws IOException {
                Files.writeString(Path.of("cities.txt"), "Lagos\\nLima\\nLyon\\n");

                try (Scanner sc = new Scanner(new File("cities.txt"))) {
                    int n = 1;
                    while (sc.hasNextLine()) {
                        System.out.println(n++ + ". " + sc.nextLine());
                    }
                } catch (FileNotFoundException e) {
                    System.out.println("File not found");
                }
            }
        }`),
      h2('Read everything at once'),
      ex(`
        Files.writeString(Path.of("scores.csv"), "name,score\\nIda,81\\nRavi,94\\nSol,77\\n");

        List<String> lines = Files.readAllLines(Path.of("scores.csv"));
        int best = 0;
        String bestName = "";
        for (String line : lines.subList(1, lines.size())) {   // skip header
            String[] parts = line.split(",");
            int score = Integer.parseInt(parts[1]);
            if (score > best) { best = score; bestName = parts[0]; }
        }
        System.out.println("Top score: " + bestName + " with " + best);`),
      h2('When the file is missing'),
      ex(`
        try {
            System.out.println(Files.readString(Path.of("missing.txt")));
        } catch (NoSuchFileException e) {
            System.out.println("No such file: " + e.getFile());
        }`),
      note('<code>readAllLines</code> and <code>readString</code> load the whole file into memory. For very large files, read line by line with a <a href="' + JT.url('java_bufferedreader') + '">BufferedReader</a> or <code>Files.lines</code>.'),
    ].join(''),
  });

  JT.def('java_files_delete', {
    body: () => [
      h2('Delete a file'),
      p('<code>File.delete()</code> returns <code>true</code> on success. <code>Files.delete</code> throws an exception explaining why it failed, and <code>Files.deleteIfExists</code> does not complain about a missing file.'),
      ex(`
        File f = new File("temp.txt");
        f.createNewFile();
        System.out.println("exists before: " + f.exists());
        System.out.println("deleted: " + f.delete());
        System.out.println("exists after: " + f.exists());
        System.out.println("delete again: " + f.delete());`),
      ex(`
        Path p = Path.of("cache.bin");
        Files.write(p, new byte[] { 1, 2, 3 });
        Files.delete(p);
        System.out.println("deleteIfExists: " + Files.deleteIfExists(p));
        try {
            Files.delete(p);
        } catch (NoSuchFileException e) {
            System.out.println("Cannot delete, not found: " + e.getFile());
        }`, { title: 'With NIO' }),
      h2('Delete a folder'),
      p('A folder can only be deleted when it is empty, so delete its contents first.'),
      ex(`
        Path dir = Files.createDirectories(Path.of("build"));
        Files.writeString(dir.resolve("a.txt"), "a");
        Files.writeString(dir.resolve("b.txt"), "b");

        try (var entries = Files.list(dir)) {
            for (Path e : entries.toList()) {
                Files.delete(e);
                System.out.println("deleted " + e.getFileName());
            }
        }
        Files.delete(dir);
        System.out.println("folder gone: " + !Files.exists(dir));`),
      note('Deleted files do not go to the recycle bin. Be careful with delete code that runs on real data.'),
    ].join(''),
  });

  JT.def('java_io_streams', {
    body: () => [
      h2('Streams of data'),
      p('An I/O stream is a sequence of data flowing from a source (input stream) or to a destination (output stream). The source can be a file, the keyboard, memory or the network. The code that reads or writes looks the same in every case.'),
      table(['', 'Bytes (binary)', 'Characters (text)'], [
        ['Input', '<code>InputStream</code> → <code>FileInputStream</code>', '<code>Reader</code> → <code>FileReader</code>, <code>BufferedReader</code>'],
        ['Output', '<code>OutputStream</code> → <code>FileOutputStream</code>', '<code>Writer</code> → <code>FileWriter</code>, <code>BufferedWriter</code>'],
      ]),
      ul([
        'Use <b>byte streams</b> for images, audio, ZIP files and any non-text data.',
        'Use <b>character streams</b> for text; they handle the character encoding for you.',
        'Wrap streams in <b>buffered</b> versions to read or write in chunks, which is much faster.',
        'Always close streams, ideally with <a href="' + JT.url('java_try_catch_resources') + '">try-with-resources</a>.',
      ]),
      note('These I/O streams have nothing to do with the <code>java.util.stream</code> API (<code>list.stream().filter(...)</code>). The names are just similar.'),
      h2('Streams you already use'),
      p('<code>System.out</code> is a <code>PrintStream</code> (an output stream) and <code>System.in</code> is an <code>InputStream</code>.'),
      ex(`
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        PrintStream ps = new PrintStream(buffer);
        ps.print("captured text");
        ps.flush();
        System.out.println("Buffer holds " + buffer.size() + " bytes: " + buffer);`, { desc: 'A stream can also write into memory instead of a file.' }),
    ].join(''),
  });

  JT.def('java_fileinputstream', {
    body: () => [
      h2('FileInputStream'),
      p('<code>FileInputStream</code> reads raw <b>bytes</b> from a file. <code>read()</code> returns one byte as an <code>int</code> from 0 to 255, or <code>-1</code> at the end of the file.'),
      ex(`
        Files.write(Path.of("tiny.bin"), new byte[] { 72, 105, 33, 10 });

        try (FileInputStream in = new FileInputStream("tiny.bin")) {
            int b;
            while ((b = in.read()) != -1) {
                System.out.println(b + "  '" + (b == 10 ? "\\\\n" : String.valueOf((char) b)) + "'");
            }
        }`),
      h2('Reading in chunks'),
      p('Reading one byte at a time is slow. Pass a <code>byte[]</code> buffer; <code>read(buffer)</code> returns how many bytes it filled.'),
      ex(`
        Files.write(Path.of("data.bin"), new byte[1000]);

        try (FileInputStream in = new FileInputStream("data.bin")) {
            byte[] buffer = new byte[256];
            int n, chunks = 0, total = 0;
            while ((n = in.read(buffer)) != -1) {
                chunks++;
                total += n;
            }
            System.out.println(total + " bytes in " + chunks + " chunks");
        }`),
      ex(`
        Files.writeString(Path.of("hello.txt"), "Olá, mundo");
        try (FileInputStream in = new FileInputStream("hello.txt")) {
            byte[] all = in.readAllBytes();
            System.out.println(all.length + " bytes");
            System.out.println(new String(all, java.nio.charset.StandardCharsets.UTF_8));
        }`, { title: 'Read all bytes', desc: '"á" takes two bytes in UTF-8, so 10 characters give 11 bytes.' }),
    ].join(''),
  });

  JT.def('java_fileoutputstream', {
    body: () => [
      h2('FileOutputStream'),
      p('<code>FileOutputStream</code> writes raw bytes to a file. Like <code>FileWriter</code>, it overwrites by default and appends when you pass <code>true</code>.'),
      ex(`
        try (FileOutputStream out = new FileOutputStream("bytes.bin")) {
            out.write(65);                            // one byte: 'A'
            out.write(new byte[] { 66, 67, 68 });     // several bytes
        }
        try (FileOutputStream out = new FileOutputStream("bytes.bin", true)) {
            out.write("EFG".getBytes());
        }
        System.out.println(Files.readString(Path.of("bytes.bin")));
        System.out.println(Files.size(Path.of("bytes.bin")) + " bytes");`),
      h2('Copying a file'),
      p('Combine an input and an output stream to copy any file, text or binary.'),
      ex(`
        byte[] original = new byte[5000];
        new Random(7).nextBytes(original);
        Files.write(Path.of("photo.jpg"), original);

        try (FileInputStream in = new FileInputStream("photo.jpg");
             FileOutputStream out = new FileOutputStream("photo-copy.jpg")) {
            byte[] buf = new byte[1024];
            int n;
            while ((n = in.read(buf)) != -1) {
                out.write(buf, 0, n);    // write only the bytes actually read
            }
        }
        byte[] copy = Files.readAllBytes(Path.of("photo-copy.jpg"));
        System.out.println("identical: " + Arrays.equals(original, copy));`),
      note('<code>in.transferTo(out)</code> and <code>Files.copy(source, target)</code> do the same job in one call.'),
    ].join(''),
  });

  JT.def('java_bufferedreader', {
    body: () => [
      h2('BufferedReader'),
      p('<code>BufferedReader</code> wraps another reader and reads text in large chunks. Its <code>readLine()</code> method returns one line at a time, or <code>null</code> at the end. It is the standard way to read big text files efficiently.'),
      ex(`
        Files.writeString(Path.of("log.txt"), "INFO start\\nWARN disk 91%\\nINFO request\\nERROR timeout\\nINFO stop\\n");

        int warnings = 0;
        try (BufferedReader br = new BufferedReader(new FileReader("log.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (!line.startsWith("INFO")) {
                    System.out.println(line);
                    warnings++;
                }
            }
        }
        System.out.println(warnings + " problems found");`),
      h2('Reading standard input'),
      p('Wrapped around <code>System.in</code>, it is a fast alternative to <code>Scanner</code>, often used in programming contests.'),
      ex(`
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(in.readLine().trim());
        long sum = 0;
        for (int i = 0; i < n; i++) sum += Long.parseLong(in.readLine().trim());
        System.out.println("Sum of " + n + " numbers: " + sum);`, { stdin: '3\n15\n27\n100\n' }),
      h2('lines()'),
      ex(`
        Files.writeString(Path.of("words.txt"), "pear\\napple\\nfig\\nbanana\\n");
        try (BufferedReader br = Files.newBufferedReader(Path.of("words.txt"))) {
            br.lines().sorted().forEach(System.out::println);
        }`),
    ].join(''),
    exercise: { q: 'Read the next line from <code>br</code>.', code: 'String line = br.___();', options: ['readLine', 'nextLine', 'read', 'getLine'], answer: ['readLine'] },
  });

  JT.def('java_bufferedwriter', {
    body: () => [
      h2('BufferedWriter'),
      p('<code>BufferedWriter</code> collects text in memory and writes it in chunks, which is much faster than many small writes. <code>newLine()</code> writes the platform\'s line separator.'),
      ex(`
        String[][] rows = { { "Item", "Qty" }, { "Notebook", "3" }, { "Pen", "12" } };
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("order.csv"))) {
            for (String[] r : rows) {
                bw.write(String.join(",", r));
                bw.newLine();
            }
        }
        Files.readAllLines(Path.of("order.csv")).forEach(System.out::println);`),
      h2('Flushing'),
      p('Buffered data reaches the file only when the buffer is full, when you call <code>flush()</code>, or when the writer is closed. Forgetting to close a writer is a common reason for empty files.'),
      ex(`
        BufferedWriter bw = new BufferedWriter(new FileWriter("draft.txt"));
        bw.write("Hello");
        System.out.println("before flush: " + Files.size(Path.of("draft.txt")) + " bytes");
        bw.flush();
        System.out.println("after flush:  " + Files.size(Path.of("draft.txt")) + " bytes");
        bw.close();`),
      ex(`
        try (BufferedWriter bw = Files.newBufferedWriter(Path.of("squares.txt"))) {
            for (int i = 1; i <= 5; i++) {
                bw.write(i + " squared is " + i * i);
                bw.newLine();
            }
        }
        System.out.print(Files.readString(Path.of("squares.txt")));`, { title: 'With Files.newBufferedWriter' }),
    ].join(''),
    exercise: { q: 'Write a line separator with the buffered writer <code>bw</code>.', code: 'bw.___();', options: ['newLine', 'println', 'nextLine', 'endl'], answer: ['newLine'] },
  });
})();
