// Lessons: wrapper classes, generics, annotations, regex, threads, lambdas, advanced sorting,
// plus the Projects and How To pages.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, note, syn, table, ex } = JT.h;

  JT.def('java_wrapper_classes', {
    body: () => [
      h2('Wrapper classes'),
      p('Each primitive type has a matching class that "wraps" the value in an object. Collections and generics only work with objects, so you need wrappers there. Wrappers also provide useful constants and conversion methods.'),
      table(['Primitive', 'Wrapper'], [
        ['<code>byte</code>, <code>short</code>, <code>int</code>, <code>long</code>', '<code>Byte</code>, <code>Short</code>, <code>Integer</code>, <code>Long</code>'],
        ['<code>float</code>, <code>double</code>', '<code>Float</code>, <code>Double</code>'],
        ['<code>boolean</code>', '<code>Boolean</code>'],
        ['<code>char</code>', '<code>Character</code>'],
      ]),
      h2('Autoboxing and unboxing'),
      p('Java converts automatically between a primitive and its wrapper: <b>boxing</b> (int → Integer) and <b>unboxing</b> (Integer → int).'),
      ex(`
        List<Integer> marks = new ArrayList<>();
        marks.add(87);              // int boxed to Integer
        int first = marks.get(0);   // Integer unboxed to int
        System.out.println(first + 3);

        Integer big = Integer.MAX_VALUE;
        System.out.println("max int: " + big);
        System.out.println("parsed: " + (Integer.parseInt("250") + Double.parseDouble("0.5")));
        System.out.println("binary of 10: " + Integer.toBinaryString(10));
        System.out.println("is digit: " + Character.isDigit('7') + ", upper: " + Character.toUpperCase('q'));`),
      h2('Pitfalls'),
      p('Wrappers are objects, so they can be <code>null</code>, and <code>==</code> compares references, not values. Use <code>equals()</code> to compare wrapper values.'),
      ex(`
        Integer a = 1000, b = 1000;
        System.out.println(a == b);        // compares references: false
        System.out.println(a.equals(b));   // compares values: true

        Integer missing = null;
        try {
            int n = missing;               // unboxing null
        } catch (NullPointerException e) {
            System.out.println("Cannot unbox null");
        }`),
      note('Small values (−128 to 127) are cached, so <code>==</code> may <i>appear</i> to work for them. Do not rely on it.'),
    ].join(''),
    exercise: { q: 'Convert the text <code>"42"</code> to an <code>int</code>.', code: 'int n = Integer.___("42");', options: ['parseInt', 'valueOf', 'toInt', 'convert'], answer: ['parseInt'] },
  });

  JT.def('java_generics', {
    body: () => [
      h2('Generics'),
      p('Generics let classes and methods work with <b>any type</b> while keeping full type safety. You have already used them: <code>ArrayList&lt;String&gt;</code>. The type in angle brackets is a <b>type parameter</b>, conventionally a single capital letter such as <code>T</code> (type), <code>E</code> (element), <code>K</code>/<code>V</code> (key/value).'),
      h2('A generic class'),
      ex(`
        class Box<T> {
            private T content;
            void put(T item) { content = item; }
            T take() { return content; }
        }

        public class Main {
            public static void main(String[] args) {
                Box<String> letter = new Box<>();
                letter.put("Dear Amara, …");
                String text = letter.take();           // no cast needed
                System.out.println(text);

                Box<Integer> coins = new Box<>();
                coins.put(25);
                System.out.println(coins.take() * 2);
                // coins.put("ten");  // compile error: String is not Integer
            }
        }`),
      h2('Generic methods'),
      ex(`
        import java.util.*;

        public class Main {
            static <T> T lastOf(List<T> list) {
                return list.get(list.size() - 1);
            }

            static <K, V> void printPairs(Map<K, V> map) {
                map.forEach((k, v) -> System.out.println(k + " = " + v));
            }

            public static void main(String[] args) {
                System.out.println(lastOf(List.of("north", "east", "south")));
                System.out.println(lastOf(List.of(3.5, 9.25)));
                printPairs(new TreeMap<>(Map.of("width", 1920, "height", 1080)));
            }
        }`),
      h2('Bounded types'),
      p('<code>&lt;T extends Number&gt;</code> restricts <code>T</code> to <code>Number</code> or its subclasses, so you may call <code>Number</code> methods on it. In parameters, the wildcard <code>? extends Number</code> accepts a list of any numeric type.'),
      ex(`
        import java.util.*;

        public class Main {
            static double sum(List<? extends Number> values) {
                double total = 0;
                for (Number n : values) total += n.doubleValue();
                return total;
            }

            static <T extends Comparable<T>> T largest(T a, T b) {
                return a.compareTo(b) >= 0 ? a : b;
            }

            public static void main(String[] args) {
                System.out.println(sum(List.of(1, 2, 3)));
                System.out.println(sum(List.of(0.5, 0.25)));
                System.out.println(largest("pear", "apple"));
                System.out.println(largest(17, 42));
            }
        }`),
    ].join(''),
    exercise: { q: 'Declare a generic class with type parameter <code>T</code>.', code: 'class Holder___ {\n    T value;\n}', options: ['<T>', '(T)', '[T]', '{T}'], answer: ['<T>'] },
  });

  JT.def('java_annotations', {
    body: () => [
      h2('Annotations'),
      p('Annotations are labels that start with <code>@</code> and attach extra information to code. They do not change what the code does by themselves, but the compiler, tools and frameworks read them.'),
      table(['Annotation', 'Meaning'], [
        ['<code>@Override</code>', 'this method overrides one from a superclass or interface; the compiler checks it'],
        ['<code>@Deprecated</code>', 'this should no longer be used; callers get a warning'],
        ['<code>@SuppressWarnings("unchecked")</code>', 'silence a specific compiler warning'],
        ['<code>@FunctionalInterface</code>', 'this interface must have exactly one abstract method'],
      ]),
      h2('@Override catches mistakes'),
      ex(`
        class Animal {
            String sound() { return "..."; }
        }

        class Owl extends Animal {
            @Override
            String Sound() { return "hoot"; }   // typo: capital S
        }

        public class Main {
            public static void main(String[] args) {
                System.out.println(new Owl().sound());
            }
        }`, { desc: 'This example fails to compile on purpose: the annotation reveals that <code>Sound</code> does not override anything. Fix the typo and run it again.' }),
      h2('@Deprecated and @FunctionalInterface'),
      ex(`
        @FunctionalInterface
        interface Discount {
            double apply(double price);
        }

        public class Main {
            @Deprecated
            static double oldTax(double p) { return p * 1.2; }

            public static void main(String[] args) {
                Discount summerSale = price -> price * 0.8;
                System.out.println(summerSale.apply(50));
                System.out.println(oldTax(10));   // still works, but the compiler warns
            }
        }`),
      h2('Your own annotations'),
      p('Frameworks define their own annotations (for example <code>@Test</code> in JUnit). You can declare one with <code>@interface</code> and read it at run time through reflection:'),
      ex(`
        import java.lang.annotation.*;
        import java.lang.reflect.Method;

        @Retention(RetentionPolicy.RUNTIME)
        @interface Todo {
            String value();
        }

        public class Main {
            @Todo("add input validation")
            static void register() { }

            @Todo("cache the result")
            static void report() { }

            public static void main(String[] args) {
                for (String name : new String[] { "register", "report" }) {
                    try {
                        Method m = Main.class.getDeclaredMethod(name);
                        System.out.println(name + ": " + m.getAnnotation(Todo.class).value());
                    } catch (NoSuchMethodException e) {
                        System.out.println("missing " + name);
                    }
                }
            }
        }`),
    ].join(''),
    exercise: { q: 'Mark the method as overriding a superclass method.', code: '___\npublic String toString() {\n    return "Car";\n}', options: ['@Override', '@Deprecated', '#override', 'override'], answer: ['@Override'] },
  });

  JT.def('java_regex', {
    body: () => [
      h2('Regular expressions'),
      p('A regular expression (regex) is a pattern that describes text: "three digits", "an email address", "a word starting with a capital". Java supports them through <code>java.util.regex</code> and a few <code>String</code> methods.'),
      table(['Pattern', 'Matches'], [
        ['<code>.</code>', 'any character'],
        ['<code>\\d</code>, <code>\\w</code>, <code>\\s</code>', 'digit, word character (letter, digit, _), whitespace'],
        ['<code>[abc]</code>, <code>[a-z]</code>, <code>[^0-9]</code>', 'one of, a range, anything but'],
        ['<code>*</code>, <code>+</code>, <code>?</code>, <code>{2,4}</code>', 'zero or more, one or more, optional, 2 to 4 times'],
        ['<code>^</code>, <code>$</code>', 'start, end of the text'],
        ['<code>( )</code>', 'a group you can extract'],
        ['<code>|</code>', 'or'],
      ]),
      note('In Java source code a backslash must be doubled: the regex <code>\\d</code> is written <code>"\\\\d"</code>.'),
      h2('Checking a whole string'),
      ex(`
        String[] codes = { "AB-1234", "ab-1234", "AB-12", "XY-9876" };
        for (String c : codes) {
            System.out.println(c + " valid? " + c.matches("[A-Z]{2}-\\\\d{4}"));
        }`),
      h2('Finding matches'),
      ex(`
        import java.util.regex.*;

        public class Main {
            public static void main(String[] args) {
                String text = "Call 555-0142 or 555-0199; fax 555-0100.";
                Pattern phone = Pattern.compile("(\\\\d{3})-(\\\\d{4})");
                Matcher m = phone.matcher(text);
                while (m.find()) {
                    System.out.println("found " + m.group() + " (last four digits: " + m.group(2) + ")");
                }
            }
        }`),
      h2('Replacing and splitting'),
      ex(`
        String messy = "too    many   spaces here";
        System.out.println(messy.replaceAll("\\\\s+", " "));

        String csv = "red, green ;blue;  yellow";
        System.out.println(Arrays.toString(csv.split("\\\\s*[,;]\\\\s*")));

        String date = "2031-07-04";
        System.out.println(date.replaceAll("(\\\\d{4})-(\\\\d{2})-(\\\\d{2})", "$3/$2/$1"));`),
    ].join(''),
    exercise: { q: 'Check whether the whole string matches the pattern.', code: 'boolean ok = zip.___("\\\\d{5}");', options: ['matches', 'equals', 'contains', 'find'], answer: ['matches'] },
  });

  JT.def('java_threads', {
    body: () => [
      h2('Threads'),
      p('A thread is a separate path of execution. Several threads let a program do things at the same time, such as downloading while the user keeps typing. Every program starts with one thread, the <b>main</b> thread.'),
      h2('Creating threads'),
      p('Pass a <code>Runnable</code> (often a lambda) to <code>new Thread(...)</code> and call <code>start()</code>. <code>join()</code> waits for a thread to finish.'),
      ex(`
        Thread worker = new Thread(() -> {
            long sum = 0;
            for (int i = 1; i <= 1_000_000; i++) sum += i;
            System.out.println("worker finished: " + sum);
        });
        worker.start();
        System.out.println("main keeps going while the worker runs");
        worker.join();                 // wait for it
        System.out.println("both done");`, { desc: 'The first two lines may appear in either order; that is the nature of threads. "both done" always comes last because of <code>join()</code>.' }),
      h2('Race conditions'),
      p('When threads change the same variable, updates can get lost: <code>count++</code> is really "read, add, write", and two threads can interleave those steps. <code>synchronized</code> lets only one thread at a time run a block; atomic classes do the same for single variables.'),
      ex(`
        import java.util.concurrent.atomic.AtomicInteger;

        public class Main {
            static int unsafe = 0;
            static int safe = 0;
            static final AtomicInteger atomic = new AtomicInteger();

            static synchronized void incSafe() { safe++; }

            public static void main(String[] args) throws InterruptedException {
                Runnable job = () -> {
                    for (int i = 0; i < 100_000; i++) {
                        unsafe++;
                        incSafe();
                        atomic.incrementAndGet();
                    }
                };
                Thread a = new Thread(job), b = new Thread(job);
                a.start(); b.start();
                a.join(); b.join();
                System.out.println("expected:     200000");
                System.out.println("synchronized: " + safe);
                System.out.println("atomic:       " + atomic.get());
                System.out.println("unsafe:       " + (unsafe == 200_000 ? "200000 (lucky this time)" : unsafe + " (updates were lost)"));
            }
        }`),
      h2('Executors'),
      p('Real programs rarely create threads by hand. An <code>ExecutorService</code> manages a pool of threads and returns <code>Future</code> results.'),
      ex(`
        import java.util.*;
        import java.util.concurrent.*;

        public class Main {
            public static void main(String[] args) throws Exception {
                ExecutorService pool = Executors.newFixedThreadPool(3);
                List<Future<Integer>> results = new ArrayList<>();
                for (String word : List.of("alpha", "be", "gamma", "delta")) {
                    results.add(pool.submit(() -> word.length()));
                }
                int total = 0;
                for (Future<Integer> f : results) total += f.get();   // waits for each result
                pool.shutdown();
                System.out.println("total letters: " + total);
            }
        }`),
    ].join(''),
    exercise: { q: 'Start the thread <code>t</code>, then wait for it to finish.', code: 't.___();\nt.___();', options: ['start', 'join', 'run', 'wait', 'stop'], answer: ['start', 'join'] },
  });

  JT.def('java_lambda', {
    body: () => [
      h2('Lambda expressions'),
      p('A lambda is a short, unnamed function you can store in a variable or pass to a method. It implements an interface that has exactly one abstract method (a <b>functional interface</b>).'),
      syn(`parameter -> expression\n(a, b) -> expression\n(a, b) -> { statements; return result; }`),
      ex(`
        List<String> names = new ArrayList<>(List.of("Rosa", "Abdul", "Lin", "Margarethe"));
        names.forEach(n -> System.out.println("Hello, " + n));

        names.removeIf(n -> n.length() > 5);
        System.out.println(names);

        names.sort((a, b) -> a.compareTo(b));
        System.out.println(names);`),
      h2('Built-in functional interfaces'),
      table(['Interface', 'Takes → returns', 'Method'], [
        ['<code>Function&lt;T,R&gt;</code>', 'T → R', '<code>apply</code>'],
        ['<code>Predicate&lt;T&gt;</code>', 'T → boolean', '<code>test</code>'],
        ['<code>Consumer&lt;T&gt;</code>', 'T → nothing', '<code>accept</code>'],
        ['<code>Supplier&lt;T&gt;</code>', 'nothing → T', '<code>get</code>'],
        ['<code>BinaryOperator&lt;T&gt;</code>', '(T, T) → T', '<code>apply</code>'],
      ]),
      ex(`
        Function<Double, Double> toKm = miles -> miles * 1.609;
        Predicate<Integer> isAdult = age -> age >= 18;
        BinaryOperator<Integer> larger = (a, b) -> Math.max(a, b);
        Supplier<String> greeting = () -> "Good morning";

        System.out.printf("%.1f km%n", toKm.apply(26.2));
        System.out.println(isAdult.test(16));
        System.out.println(larger.apply(8, 13));
        System.out.println(greeting.get());`),
      h2('Method references and streams'),
      p('<code>Class::method</code> is a shorthand for a lambda that just calls one method. Lambdas shine with the Stream API, which processes collections in a pipeline.'),
      ex(`
        List<String> words = List.of("kiwi", "Avocado", "fig", "banana", "Cherry");
        List<String> result = words.stream()
            .filter(w -> w.length() > 3)
            .map(String::toLowerCase)
            .sorted()
            .toList();
        System.out.println(result);

        int totalLetters = words.stream().mapToInt(String::length).sum();
        System.out.println("letters: " + totalLetters);`),
      note('A lambda may use local variables from the surrounding code only if they are never reassigned ("effectively final").'),
    ].join(''),
    exercise: { q: 'Complete the lambda that doubles a number.', code: 'Function<Integer, Integer> twice = n ___ n * 2;', options: ['->', '=>', '::', '='], answer: ['->'] },
  });

  JT.def('java_advanced_sorting', {
    body: () => [
      h2('Comparable: the natural order'),
      p('A class that implements <code>Comparable&lt;T&gt;</code> defines its own natural order in <code>compareTo</code>: return a negative number if <code>this</code> comes first, positive if it comes after, and 0 if equal. Then <code>Collections.sort</code>, <code>TreeSet</code> and friends know how to order it.'),
      ex(`
        import java.util.*;

        class Song implements Comparable<Song> {
            String title;
            int seconds;
            Song(String title, int seconds) { this.title = title; this.seconds = seconds; }

            @Override
            public int compareTo(Song other) {
                return Integer.compare(this.seconds, other.seconds);   // shortest first
            }

            @Override
            public String toString() { return title + " (" + seconds + "s)"; }
        }

        public class Main {
            public static void main(String[] args) {
                List<Song> songs = new ArrayList<>(List.of(
                    new Song("Mbube", 160), new Song("Take Five", 324), new Song("Ojos Así", 238)));
                Collections.sort(songs);
                System.out.println(songs);
            }
        }`),
      note('Use <code>Integer.compare(a, b)</code> rather than <code>a - b</code>: subtraction can overflow for large values and give the wrong sign.'),
      h2('Comparator: any other order'),
      p('A <code>Comparator</code> defines an order from outside the class, so one class can be sorted in many ways.'),
      ex(`
        import java.util.*;

        record Product(String name, double price, int rating) { }

        public class Main {
            public static void main(String[] args) {
                List<Product> shop = new ArrayList<>(List.of(
                    new Product("Lamp", 39.0, 4), new Product("Mug", 9.5, 5),
                    new Product("Rug", 120.0, 4), new Product("Vase", 39.0, 3)));

                shop.sort(Comparator.comparingDouble(Product::price));
                System.out.println("by price:  " + names(shop));

                shop.sort(Comparator.comparingInt(Product::rating).reversed()
                        .thenComparing(Product::name));
                System.out.println("by rating: " + names(shop));

                shop.sort(Comparator.comparing(Product::name, Comparator.reverseOrder()));
                System.out.println("Z to A:    " + names(shop));
            }

            static List<String> names(List<Product> ps) {
                List<String> out = new ArrayList<>();
                for (Product p : ps) out.add(p.name());
                return out;
            }
        }`),
      h2('Nulls and arrays'),
      ex(`
        List<String> withGaps = new ArrayList<>(Arrays.asList("pear", null, "apple", null, "fig"));
        withGaps.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println(withGaps);

        Integer[] boxed = { 5, 1, 4 };
        Arrays.sort(boxed, Collections.reverseOrder());
        System.out.println(Arrays.toString(boxed));`),
    ].join(''),
    exercise: { q: 'Implement the interface that gives a class its natural order.', code: 'class Player implements ___<Player> {\n    public int compareTo(Player o) { ... }\n}', options: ['Comparable', 'Comparator', 'Sortable', 'Ordered'], answer: ['Comparable'] },
  });

  // Small starter projects: each one runs as-is and lists ideas for extending it.
  const project = (title, desc, src, ideas, stdin) =>
    h3(title) + p(desc) + ex(src, { title: title + ': starter', stdin }) + p('<b>Ideas to extend it:</b>') + ul(ideas);

  JT.def('java_projects', {
    body: () => [
      p('Projects are the best way to make the lessons stick. Each starter below already runs. Open it with <b>Try it Yourself</b> and grow it with the ideas listed. When it gets bigger, move it to your own JDK or IDE.'),
      h2('Beginner'),
      project('Number guessing game', 'The program picks a secret number and the player guesses until they find it. Practises loops, conditions and input.', `
        import java.util.*;

        public class Main {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                int secret = new Random(2031).nextInt(100) + 1;   // seeded so the sample input works
                int tries = 0;
                while (in.hasNextInt()) {
                    int guess = in.nextInt();
                    tries++;
                    if (guess < secret) System.out.println(guess + " is too low");
                    else if (guess > secret) System.out.println(guess + " is too high");
                    else { System.out.println(guess + " is right! Tries: " + tries); return; }
                }
                System.out.println("Out of guesses. It was " + secret);
            }
        }`, ['Remove the seed so the number changes every game.', 'Limit the player to 7 guesses.', 'Keep a best score across several rounds.'], '50\n25\n37\n31\n28\n'),
      project('Tip calculator', 'Reads a bill amount and a party size and prints what everyone pays. Practises arithmetic and formatting.', `
        import java.util.*;

        public class Main {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                double bill = in.nextDouble();
                int people = in.nextInt();
                for (int pct : new int[] { 10, 15, 20 }) {
                    double total = bill * (1 + pct / 100.0);
                    System.out.printf("%d%% tip: total %.2f, each %.2f%n", pct, total, total / people);
                }
            }
        }`, ['Round each share up to the next whole coin.', 'Let the user type their own tip percentage.', 'Reject negative or zero input with a clear message.'], '86.40\n3\n'),
      h2('Intermediate'),
      project('To-do list manager', 'Commands are read from input: <code>add</code>, <code>done</code>, <code>list</code>. Practises lists, string parsing and switch.', `
        import java.util.*;

        public class Main {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                List<String> todo = new ArrayList<>();
                while (in.hasNextLine()) {
                    String line = in.nextLine().trim();
                    String cmd = line.split(" ", 2)[0];
                    String arg = line.contains(" ") ? line.split(" ", 2)[1] : "";
                    switch (cmd) {
                        case "add" -> { todo.add(arg); System.out.println("added: " + arg); }
                        case "done" -> System.out.println("finished: " + todo.remove(Integer.parseInt(arg) - 1));
                        case "list" -> { for (int i = 0; i < todo.size(); i++) System.out.println((i + 1) + ". " + todo.get(i)); }
                        default -> System.out.println("unknown command: " + cmd);
                    }
                }
            }
        }`, ['Save the list to a file and load it at start-up.', 'Add priorities and sort by them.', 'Handle a wrong task number without crashing.'], 'add water the plants\nadd call the bank\nadd book train tickets\ndone 2\nlist\n'),
      project('Word frequency counter', 'Counts the words in a text and prints the most common ones. Practises maps, sorting and streams.', `
        import java.util.*;

        public class Main {
            public static void main(String[] args) {
                String text = """
                    It was the best of times, it was the worst of times,
                    it was the age of wisdom, it was the age of foolishness
                    """;
                Map<String, Integer> counts = new TreeMap<>();
                for (String w : text.toLowerCase().split("[^a-z]+")) {
                    if (!w.isEmpty()) counts.merge(w, 1, Integer::sum);
                }
                counts.entrySet().stream()
                    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                    .limit(5)
                    .forEach(e -> System.out.println(e.getValue() + "  " + e.getKey()));
            }
        }`, ['Read the text from standard input instead.', 'Ignore common "stop words" such as <i>the</i> and <i>of</i>.', 'Print a simple bar chart using <code>*</code> characters.']),
      h2('Advanced'),
      project('Bank account simulator', 'Accounts with deposits, withdrawals and transfers, with an exception for insufficient funds. Practises classes, encapsulation and exceptions.', `
        import java.util.*;

        class Account {
            private final String owner;
            private double balance;
            private final List<String> history = new ArrayList<>();

            Account(String owner, double opening) { this.owner = owner; this.balance = opening; }

            void withdraw(double amount) {
                if (amount > balance) throw new IllegalStateException(owner + " has only " + balance);
                balance -= amount;
                history.add("-" + amount);
            }

            void deposit(double amount) { balance += amount; history.add("+" + amount); }

            void transferTo(Account other, double amount) { withdraw(amount); other.deposit(amount); }

            public String toString() { return owner + ": " + balance + " " + history; }
        }

        public class Main {
            public static void main(String[] args) {
                Account a = new Account("Nia", 200), b = new Account("Theo", 50);
                a.transferTo(b, 75);
                try {
                    b.transferTo(a, 500);
                } catch (IllegalStateException e) {
                    System.out.println("Refused: " + e.getMessage());
                }
                System.out.println(a);
                System.out.println(b);
            }
        }`, ['Add interest that is paid every month.', 'Give each account an ID and keep them in a <code>Map</code>.', 'Write the transaction history to a CSV file.']),
    ].join(''),
  });

  // Each how-to is a heading, one sentence, and a runnable example.
  const howto = (title, desc, src) => h2(title) + p(desc) + ex(src, { title });

  JT.def('java_howtos', {
    body: () => [
      p('Short recipes for everyday tasks. Each one runs as-is; copy what you need.'),
      howto('Reverse a string', '<code>StringBuilder</code> has a built-in <code>reverse()</code>.', `
        String word = "stressed";
        System.out.println(new StringBuilder(word).reverse());`),
      howto('Check for a palindrome', 'Compare the cleaned text with its reverse.', `
        String s = "A man, a plan, a canal: Panama";
        String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        System.out.println(clean.equals(new StringBuilder(clean).reverse().toString()));`),
      howto('Count words', 'Split on runs of whitespace after trimming.', `
        String text = "  Java is   fun to learn ";
        System.out.println(text.trim().split("\\\\s+").length);`),
      howto('Count vowels', 'Loop over the characters and test each one.', `
        String s = "Programming in Java";
        int vowels = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(c) >= 0) vowels++;
        }
        System.out.println(vowels);`),
      howto('Sum and average of an array', 'Use a loop, or a stream in one line.', `
        int[] values = { 12, 7, 30, 5, 16 };
        int sum = 0;
        for (int v : values) sum += v;
        System.out.println("sum " + sum + ", average " + (double) sum / values.length);
        System.out.println("stream: " + Arrays.stream(values).average().orElse(0));`),
      howto('Find the largest and smallest element', 'Start from the first element and compare the rest.', `
        int[] t = { 14, -3, 22, 9, 0 };
        int max = t[0], min = t[0];
        for (int x : t) { max = Math.max(max, x); min = Math.min(min, x); }
        System.out.println("max " + max + ", min " + min);`),
      howto('Check if a number is prime', 'Only divisors up to the square root need testing.', `
        public class Main {
            static boolean isPrime(int n) {
                if (n < 2) return false;
                for (int d = 2; (long) d * d <= n; d++) if (n % d == 0) return false;
                return true;
            }

            public static void main(String[] args) {
                for (int n = 1; n <= 30; n++) if (isPrime(n)) System.out.print(n + " ");
                System.out.println();
            }
        }`),
      howto('Even or odd', 'The remainder after dividing by 2 tells you.', `
        for (int n : new int[] { 4, 7, 0, -3 }) {
            System.out.println(n + (n % 2 == 0 ? " is even" : " is odd"));
        }`),
      howto('Fibonacci sequence', 'Each number is the sum of the two before it.', `
        long a = 0, b = 1;
        for (int i = 0; i < 12; i++) {
            System.out.print(a + " ");
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println();`),
      howto('Factorial', 'Use <code>long</code>: factorials grow very fast.', `
        long f = 1;
        for (int i = 2; i <= 15; i++) f *= i;
        System.out.println("15! = " + f);`),
      howto('Random number in a range', '<code>nextInt(origin, bound)</code> includes the origin and excludes the bound.', `
        Random r = new Random(99);   // remove the seed for different numbers each run
        for (int i = 0; i < 5; i++) System.out.print(r.nextInt(1, 7) + " ");   // dice: 1..6
        System.out.println();`),
      howto('Convert between strings and numbers', 'Parse with the wrapper class, format with <code>String.valueOf</code>.', `
        int n = Integer.parseInt("1250");
        double d = Double.parseDouble("3.75");
        String s = String.valueOf(n + d);
        System.out.println(s + " has " + s.length() + " characters");`),
      howto('Remove duplicates from a list', 'Pass the list through a <code>LinkedHashSet</code> to keep the original order.', `
        List<String> tags = List.of("java", "web", "java", "api", "web");
        List<String> unique = new ArrayList<>(new LinkedHashSet<>(tags));
        System.out.println(unique);`),
      howto('Get the current date and time', 'Format it with a pattern.', `
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now.format(DateTimeFormatter.ofPattern("EEEE d MMMM yyyy, HH:mm")));`),
      howto('Measure how long code takes', '<code>System.nanoTime()</code> is meant for measuring durations.', `
        long start = System.nanoTime();
        long total = 0;
        for (int i = 0; i < 5_000_000; i++) total += i % 7;
        long ms = (System.nanoTime() - start) / 1_000_000;
        System.out.println("result " + total + " in about " + ms + " ms");`),
    ].join(''),
  });
})();
