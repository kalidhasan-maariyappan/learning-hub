// Reference pages: method tables written in our own words, each with one or two runnable examples.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, note, table, ex } = JT.h;
  const c = (s) => '<code>' + JT.esc(s) + '</code>';
  // rows: [signature, description, return type]
  const methods = (rows) => table(['Method', 'Description', 'Returns'], rows.map(([m, d, r]) => [c(m), d, r ? c(r) : '']));
  const ref = (slug, intro, rows, examples = []) => JT.def(slug, {
    body: () => [p(intro), h2('Methods'), methods(rows), examples.length ? h2('Examples') : '', ...examples.map(([src, o]) => ex(src, o))].join(''),
  });

  JT.def('java_ref_reference', {
    body: () => [
      p('Quick-lookup tables for the parts of Java used most in this tutorial. Every page lists the common methods with a short description, plus a runnable example. For the complete list of every class and method, see the official Java SE API documentation that comes with your JDK.'),
      h2('Language'),
      table(['Page', 'Covers'], [
        [JT.link('java_ref_keywords', 'Keywords'), 'all reserved words and what they do'],
        [JT.link('java_ref_errors', 'Errors & Exceptions'), 'common exception types and their causes'],
      ]),
      h2('Core classes'),
      table(['Page', 'Covers'], [
        [JT.link('java_ref_string', 'String Methods'), 'searching, slicing, comparing, transforming text'],
        [JT.link('java_ref_math', 'Math Methods'), 'rounding, powers, roots, trigonometry, random'],
        [JT.link('java_ref_output', 'Output Methods'), '<code>print</code>, <code>println</code>, <code>printf</code> and format codes'],
        [JT.link('java_ref_system', 'System Methods'), 'time, properties, environment, exit'],
        [JT.link('java_ref_scanner', 'Scanner Methods'), 'reading typed input'],
      ]),
      h2('Arrays and collections'),
      table(['Page', 'Covers'], [
        [JT.link('java_ref_arrays', 'Arrays Methods'), 'sorting, searching, filling and printing arrays'],
        [JT.link('java_ref_arraylist', 'ArrayList Methods'), 'the resizable list'],
        [JT.link('java_ref_linkedlist', 'LinkedList Methods'), 'list plus queue/deque operations'],
        [JT.link('java_ref_hashmap', 'HashMap Methods'), 'key-value lookups'],
        [JT.link('java_ref_iterators', 'Iterator Methods'), 'stepping through a collection'],
        [JT.link('java_ref_collections', 'Collections Methods'), 'algorithms that work on any collection'],
      ]),
      h2('Files and I/O'),
      table(['Page', 'Covers'], [
        [JT.link('java_ref_file', 'File Methods'), 'file and folder information and management'],
        [JT.link('java_ref_fileinputstream', 'FileInputStream'), 'reading bytes'],
        [JT.link('java_ref_fileoutputstream', 'FileOutputStream'), 'writing bytes'],
        [JT.link('java_ref_bufferedreader', 'BufferedReader'), 'reading text efficiently, line by line'],
        [JT.link('java_ref_bufferedwriter', 'BufferedWriter'), 'writing text efficiently'],
      ]),
    ].join(''),
  });

  const KEYWORDS = [
    ['abstract', 'class or method that must be completed by a subclass'],
    ['assert', 'checks a condition during testing (enabled with <code>-ea</code>)'],
    ['boolean', 'primitive type: <code>true</code> or <code>false</code>'],
    ['break', 'leaves a loop or switch'],
    ['byte', 'primitive type: 8-bit whole number'],
    ['case', 'one branch of a switch'],
    ['catch', 'handles an exception thrown in a <code>try</code> block'],
    ['char', 'primitive type: one 16-bit character'],
    ['class', 'declares a class'],
    ['const', 'reserved but unused (use <code>final</code>)'],
    ['continue', 'skips to the next loop iteration'],
    ['default', 'fallback branch of a switch; method with a body in an interface'],
    ['do', 'starts a do/while loop'],
    ['double', 'primitive type: 64-bit decimal number'],
    ['else', 'alternative branch of an if'],
    ['enum', 'declares a fixed set of constants'],
    ['extends', 'inherits from a class, or bounds a type parameter'],
    ['final', 'cannot be changed, overridden or extended'],
    ['finally', 'block that always runs after try/catch'],
    ['float', 'primitive type: 32-bit decimal number'],
    ['for', 'starts a for or for-each loop'],
    ['goto', 'reserved but unused'],
    ['if', 'runs code when a condition is true'],
    ['implements', 'a class promises to provide an interface\'s methods'],
    ['import', 'makes classes from other packages available by short name'],
    ['instanceof', 'tests whether an object has a given type'],
    ['int', 'primitive type: 32-bit whole number'],
    ['interface', 'declares an interface'],
    ['long', 'primitive type: 64-bit whole number'],
    ['native', 'method implemented in another language'],
    ['new', 'creates an object or array'],
    ['package', 'declares the package of a file'],
    ['private', 'visible only inside the same class'],
    ['protected', 'visible in the same package and subclasses'],
    ['public', 'visible everywhere'],
    ['return', 'ends a method, optionally giving back a value'],
    ['short', 'primitive type: 16-bit whole number'],
    ['static', 'belongs to the class rather than to objects'],
    ['strictfp', 'obsolete: floating-point is always strict since Java 17'],
    ['super', 'refers to the superclass'],
    ['switch', 'chooses a branch by value'],
    ['synchronized', 'only one thread at a time may run the code'],
    ['this', 'refers to the current object'],
    ['throw', 'throws an exception'],
    ['throws', 'declares the exceptions a method may throw'],
    ['transient', 'field skipped by serialization'],
    ['try', 'starts a block whose exceptions can be caught'],
    ['void', 'method returns nothing'],
    ['volatile', 'field is always read from main memory (visible to all threads)'],
    ['while', 'loop that repeats while a condition holds'],
  ];
  const CONTEXTUAL = [
    ['var', 'lets the compiler infer a local variable\'s type (Java 10)'],
    ['record', 'declares a compact, immutable data class (Java 16)'],
    ['yield', 'returns a value from a switch expression block (Java 14)'],
    ['sealed', 'restricts which classes may extend a class (Java 17)'],
    ['non-sealed', 'reopens a subclass of a sealed class (Java 17)'],
    ['permits', 'lists the allowed subclasses of a sealed class (Java 17)'],
  ];

  JT.def('java_ref_keywords', {
    body: () => [
      p('Keywords have a fixed meaning and cannot be used as names for variables, methods or classes. <code>true</code>, <code>false</code> and <code>null</code> are literals and are also off-limits as names.'),
      h2('Reserved keywords'),
      table(['Keyword', 'Meaning'], KEYWORDS.map(([k, d]) => [c(k), d])),
      h2('Contextual keywords'),
      p('These words only have a special meaning in certain places, so older code that uses them as names still compiles.'),
      table(['Keyword', 'Meaning'], CONTEXTUAL.map(([k, d]) => [c(k), d])),
      ex(`
        sealed interface Shape permits Circle, Square { }
        record Circle(double r) implements Shape { }
        record Square(double side) implements Shape { }

        public class Main {
            static double area(Shape s) {
                return switch (s) {
                    case Circle c -> Math.PI * c.r() * c.r();
                    case Square q -> {
                        double a = q.side() * q.side();
                        yield a;
                    }
                };
            }

            public static void main(String[] args) {
                var shapes = new Shape[] { new Circle(1), new Square(2) };
                for (var s : shapes) System.out.printf("%s → %.2f%n", s, area(s));
            }
        }`, { title: 'Modern keywords together', desc: '<code>sealed</code>, <code>permits</code>, <code>record</code>, <code>yield</code> and <code>var</code> in one program.' }),
    ].join(''),
  });

  ref('java_ref_string', 'Strings are immutable: every method that seems to change a string actually returns a new one. Indexes start at 0.', [
    ['length()', 'number of characters', 'int'],
    ['charAt(int i)', 'character at index i', 'char'],
    ['isEmpty() / isBlank()', 'no characters / only whitespace', 'boolean'],
    ['substring(int from, int to)', 'part from <i>from</i> up to (not including) <i>to</i>', 'String'],
    ['indexOf(String s) / lastIndexOf(String s)', 'first / last position of s, or -1', 'int'],
    ['contains(CharSequence s)', 'whether s occurs', 'boolean'],
    ['startsWith(String p) / endsWith(String s)', 'checks the beginning / end', 'boolean'],
    ['equals(Object o) / equalsIgnoreCase(String s)', 'same characters (optionally ignoring case)', 'boolean'],
    ['compareTo(String s)', 'alphabetical comparison: negative, 0 or positive', 'int'],
    ['toUpperCase() / toLowerCase()', 'changes letter case', 'String'],
    ['trim() / strip()', 'removes surrounding whitespace (strip also handles Unicode spaces)', 'String'],
    ['replace(old, new)', 'replaces every occurrence of a character or text', 'String'],
    ['replaceAll(String regex, String r)', 'replaces every regex match', 'String'],
    ['split(String regex)', 'cuts the string into parts', 'String[]'],
    ['join(sep, parts...)', 'static: glues parts together with a separator', 'String'],
    ['repeat(int n)', 'the string n times', 'String'],
    ['format(String fmt, args...)', 'static: builds formatted text like printf', 'String'],
    ['valueOf(x)', 'static: text form of any value', 'String'],
    ['toCharArray()', 'all characters as an array', 'char[]'],
    ['chars()', 'characters as an IntStream', 'IntStream'],
    ['matches(String regex)', 'whether the whole string matches', 'boolean'],
  ], [[`
        String s = "  Hello, Java World  ";
        String t = s.trim();
        System.out.println("[" + t + "] length " + t.length());
        System.out.println(t.toUpperCase());
        System.out.println(t.indexOf("Java") + " " + t.charAt(7));
        System.out.println(t.substring(7, 11));
        System.out.println(t.replace("World", "Learners"));
        System.out.println(String.join(" | ", t.split(",\\\\s*")));
        System.out.println("ab".repeat(3) + " " + "apple".compareTo("banana"));`]]);

  ref('java_ref_math', 'All <code>Math</code> methods are <code>static</code>: call them as <code>Math.name(...)</code>. Angles are in radians.', [
    ['abs(x)', 'absolute value', 'same as x'],
    ['max(a, b) / min(a, b)', 'larger / smaller value', 'same as args'],
    ['pow(double a, double b)', 'a raised to the power b', 'double'],
    ['sqrt(double x) / cbrt(double x)', 'square / cube root', 'double'],
    ['round(x)', 'nearest whole number (.5 rounds up)', 'long / int'],
    ['floor(double x) / ceil(double x)', 'round down / up', 'double'],
    ['random()', 'pseudo-random number from 0.0 (inclusive) to 1.0 (exclusive)', 'double'],
    ['hypot(double x, double y)', 'length of the hypotenuse √(x²+y²)', 'double'],
    ['sin / cos / tan(double rad)', 'trigonometric functions', 'double'],
    ['toRadians(double deg) / toDegrees(double rad)', 'angle conversion', 'double'],
    ['log(double x) / log10(double x)', 'natural / base-10 logarithm', 'double'],
    ['exp(double x)', 'e raised to x', 'double'],
    ['signum(double x)', '-1.0, 0.0 or 1.0 depending on the sign', 'double'],
    ['floorDiv(a, b) / floorMod(a, b)', 'division / remainder rounding toward negative infinity', 'int / long'],
    ['addExact(a, b) / multiplyExact(a, b)', 'like + and *, but throw on overflow', 'int / long'],
    ['clamp(value, min, max)', 'keeps a value inside a range (Java 21)', 'same as value'],
    ['PI / E', 'constants π and e', 'double'],
  ], [[`
        System.out.println(Math.max(4, 9) + " " + Math.abs(-7.5));
        System.out.println(Math.pow(2, 10) + " " + Math.sqrt(144));
        System.out.println(Math.round(2.5) + " " + Math.floor(2.7) + " " + Math.ceil(2.1));
        System.out.println(Math.hypot(3, 4));
        System.out.printf("%.4f%n", Math.sin(Math.toRadians(30)));
        System.out.println(Math.floorMod(-7, 3) + " vs " + (-7 % 3));
        try {
            Math.multiplyExact(1_000_000, 1_000_000);
        } catch (ArithmeticException e) {
            System.out.println("overflow detected");
        }`]]);

  JT.def('java_ref_output', {
    body: () => [
      p('<code>System.out</code> is a <code>PrintStream</code>. These are its everyday methods.'),
      h2('Methods'),
      methods([
        ['print(x)', 'prints the value with no line break', 'void'],
        ['println(x)', 'prints the value and a line break', 'void'],
        ['println()', 'prints an empty line', 'void'],
        ['printf(String fmt, args...)', 'prints formatted text (no automatic line break)', 'PrintStream'],
        ['format(String fmt, args...)', 'same as printf', 'PrintStream'],
        ['flush()', 'forces buffered output out', 'void'],
      ]),
      h2('Format specifiers'),
      table(['Specifier', 'Formats', 'Example → output'], [
        [c('%d'), 'whole number', c('printf("%d", 42)') + ' → 42'],
        [c('%f'), 'decimal (6 places by default)', c('printf("%.2f", 3.14159)') + ' → 3.14'],
        [c('%s'), 'any value as text', c('printf("%s", "hi")') + ' → hi'],
        [c('%c'), 'character', c("printf(\"%c\", 'A')") + ' → A'],
        [c('%b'), 'boolean', c('printf("%b", true)') + ' → true'],
        [c('%e'), 'scientific notation', c('printf("%.2e", 12345.0)') + ' → 1.23e+04'],
        [c('%x'), 'hexadecimal', c('printf("%x", 255)') + ' → ff'],
        [c('%n'), 'line break', ''],
        [c('%%'), 'a literal % sign', ''],
      ]),
      p('Between <code>%</code> and the letter you can add a width (<code>%8d</code>), left alignment (<code>%-8s</code>), zero padding (<code>%05d</code>), a thousands separator (<code>%,d</code>) and precision (<code>%.3f</code>).'),
      ex(`
        System.out.print("no newline, ");
        System.out.println("then a newline");
        System.out.printf("%-10s|%6d|%8.2f%n", "widgets", 1500, 3.5);
        System.out.printf("%-10s|%6d|%8.2f%n", "gadgets", 42, 129.999);
        System.out.printf("%,d people, %05d code, %x hex, 75%% done%n", 8100000, 42, 255);
        String s = String.format("%s is %d years old", "Kofi", 33);
        System.out.println(s);`),
    ].join(''),
  });

  ref('java_ref_arrays', 'The <code>java.util.Arrays</code> class has static helpers for working with arrays.', [
    ['toString(array)', 'readable text such as [1, 2, 3]', 'String'],
    ['deepToString(array)', 'readable text for nested arrays', 'String'],
    ['sort(array)', 'sorts in ascending order', 'void'],
    ['sort(array, comparator)', 'sorts object arrays in a custom order', 'void'],
    ['binarySearch(array, key)', 'index of key in a sorted array (negative if missing)', 'int'],
    ['fill(array, value)', 'sets every element to value', 'void'],
    ['copyOf(array, newLength)', 'copy, truncated or padded', 'array'],
    ['copyOfRange(array, from, to)', 'copy of part of the array', 'array'],
    ['equals(a, b)', 'same length and same elements', 'boolean'],
    ['asList(values...)', 'fixed-size List view of the values', 'List'],
    ['stream(array)', 'stream for sum, average, filter…', 'Stream / IntStream'],
  ], [[`
        int[] nums = { 9, 2, 7, 4 };
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));
        System.out.println("index of 7: " + Arrays.binarySearch(nums, 7));
        int[] bigger = Arrays.copyOf(nums, 6);
        System.out.println(Arrays.toString(bigger));
        int[] zeros = new int[4];
        Arrays.fill(zeros, -1);
        System.out.println(Arrays.toString(zeros));
        System.out.println(Arrays.equals(nums, new int[] { 2, 4, 7, 9 }));
        System.out.println(Arrays.stream(nums).sum());
        System.out.println(Arrays.deepToString(new int[][] { { 1, 2 }, { 3, 4 } }));`]]);

  ref('java_ref_arraylist', '<code>ArrayList&lt;E&gt;</code> is a resizable list. <i>E</i> is the element type.', [
    ['add(E e) / add(int i, E e)', 'append / insert at index', 'boolean / void'],
    ['addAll(Collection c)', 'append all elements of c', 'boolean'],
    ['get(int i)', 'element at index', 'E'],
    ['set(int i, E e)', 'replace at index, returning the old element', 'E'],
    ['remove(int i) / remove(Object o)', 'remove by index / first occurrence of o', 'E / boolean'],
    ['removeIf(Predicate p)', 'remove all matching elements', 'boolean'],
    ['clear()', 'remove everything', 'void'],
    ['size() / isEmpty()', 'number of elements / whether there are none', 'int / boolean'],
    ['contains(Object o)', 'whether o is in the list', 'boolean'],
    ['indexOf(Object o) / lastIndexOf(Object o)', 'position of o, or -1', 'int'],
    ['sort(Comparator c)', 'sorts the list (null = natural order)', 'void'],
    ['forEach(Consumer action)', 'runs action for every element', 'void'],
    ['subList(int from, int to)', 'view of part of the list', 'List<E>'],
    ['toArray(T[] a)', 'copies into an array', 'T[]'],
    ['iterator() / listIterator()', 'iterator over the elements', 'Iterator<E>'],
    ['stream()', 'stream over the elements', 'Stream<E>'],
  ], [[`
        ArrayList<String> list = new ArrayList<>(List.of("tea", "coffee", "juice"));
        list.add(1, "water");
        list.set(0, "green tea");
        System.out.println(list + " size " + list.size());
        System.out.println(list.contains("juice") + " " + list.indexOf("coffee"));
        list.removeIf(s -> s.startsWith("w"));
        list.sort(null);
        System.out.println(list);
        System.out.println(list.subList(0, 2));
        String[] arr = list.toArray(new String[0]);
        System.out.println(arr.length);`]]);

  ref('java_ref_linkedlist', '<code>LinkedList&lt;E&gt;</code> supports every <a href="' + JT.url('java_ref_arraylist') + '">ArrayList method</a> plus the queue and deque operations below.', [
    ['addFirst(E e) / addLast(E e)', 'insert at the front / back', 'void'],
    ['getFirst() / getLast()', 'first / last element (throws if empty)', 'E'],
    ['removeFirst() / removeLast()', 'remove and return the first / last element', 'E'],
    ['peekFirst() / peekLast()', 'first / last element, or null if empty', 'E'],
    ['offer(E e)', 'add at the back (queue)', 'boolean'],
    ['poll()', 'remove and return the front, or null', 'E'],
    ['peek()', 'look at the front without removing', 'E'],
    ['push(E e) / pop()', 'stack operations at the front', 'void / E'],
    ['descendingIterator()', 'iterates from back to front', 'Iterator<E>'],
  ], [[`
        LinkedList<Integer> dq = new LinkedList<>();
        dq.offer(2); dq.offer(3);
        dq.addFirst(1);
        dq.addLast(4);
        System.out.println(dq + " first " + dq.getFirst() + " last " + dq.getLast());
        System.out.println("poll " + dq.poll() + ", pop " + dq.pop() + ", left " + dq);
        Iterator<Integer> back = dq.descendingIterator();
        while (back.hasNext()) System.out.print(back.next() + " ");
        System.out.println();`]]);

  ref('java_ref_hashmap', '<code>HashMap&lt;K, V&gt;</code> maps keys of type K to values of type V. Iteration order is not specified.', [
    ['put(K k, V v)', 'add or replace; returns the previous value or null', 'V'],
    ['get(Object k)', 'value for k, or null', 'V'],
    ['getOrDefault(Object k, V d)', 'value for k, or d', 'V'],
    ['putIfAbsent(K k, V v)', 'adds only if k has no value yet', 'V'],
    ['remove(Object k)', 'delete k; returns the old value', 'V'],
    ['containsKey(Object k) / containsValue(Object v)', 'search keys / values', 'boolean'],
    ['size() / isEmpty() / clear()', 'count / empty check / remove all', 'int / boolean / void'],
    ['keySet() / values() / entrySet()', 'views of keys / values / pairs', 'Set / Collection / Set'],
    ['merge(K k, V v, BiFunction f)', 'combine v with the existing value (great for counting)', 'V'],
    ['computeIfAbsent(K k, Function f)', 'create a value for k only when missing', 'V'],
    ['replace(K k, V v)', 'replace only if k is present', 'V'],
    ['forEach(BiConsumer action)', 'runs action for every pair', 'void'],
  ], [[`
        HashMap<String, Integer> votes = new HashMap<>();
        for (String v : "red blue red green red blue".split(" ")) votes.merge(v, 1, Integer::sum);
        System.out.println("red: " + votes.get("red"));
        System.out.println("purple: " + votes.getOrDefault("purple", 0));
        votes.putIfAbsent("purple", 0);
        votes.replace("green", 10);
        System.out.println(votes.containsKey("purple") + " " + votes.size());
        new TreeMap<>(votes).forEach((k, v) -> System.out.println(k + " = " + v));`, { desc: 'Copying into a <code>TreeMap</code> prints the keys in sorted order.' }]]);

  ref('java_ref_scanner', '<code>java.util.Scanner</code> reads and parses text from the keyboard, a string or a file. Input is split into tokens at whitespace.', [
    ['nextLine()', 'rest of the current line', 'String'],
    ['next()', 'next token (word)', 'String'],
    ['nextInt() / nextLong()', 'next token as a whole number', 'int / long'],
    ['nextDouble()', 'next token as a decimal number', 'double'],
    ['nextBoolean()', 'next token as true/false', 'boolean'],
    ['hasNext() / hasNextLine()', 'whether more input exists', 'boolean'],
    ['hasNextInt() / hasNextDouble()', 'whether the next token has that type', 'boolean'],
    ['useDelimiter(String regex)', 'changes what separates tokens', 'Scanner'],
    ['close()', 'releases the underlying source', 'void'],
  ], [[`
        Scanner sc = new Scanner("Amina 27 1.68 true\\nlikes chess and tea");
        String name = sc.next();
        int age = sc.nextInt();
        double height = sc.nextDouble();
        boolean member = sc.nextBoolean();
        sc.nextLine();                       // finish the first line
        String hobby = sc.nextLine();
        System.out.println(name + ", " + age + ", " + height + "m, member=" + member);
        System.out.println(hobby);

        Scanner csv = new Scanner("5;10;15").useDelimiter(";");
        int sum = 0;
        while (csv.hasNextInt()) sum += csv.nextInt();
        System.out.println("sum " + sum);`, { desc: 'A <code>Scanner</code> can read from a <code>String</code>, which is handy for testing.' }]]);

  ref('java_ref_file', '<code>java.io.File</code> represents a path to a file or folder. Creating a <code>File</code> object does not create anything on disk.', [
    ['exists()', 'whether the path exists', 'boolean'],
    ['createNewFile()', 'creates an empty file; false if it already exists', 'boolean'],
    ['mkdir() / mkdirs()', 'creates a folder / with all missing parents', 'boolean'],
    ['delete()', 'deletes a file or empty folder', 'boolean'],
    ['getName() / getPath() / getAbsolutePath()', 'name / path as given / full path', 'String'],
    ['getParent()', 'path of the containing folder', 'String'],
    ['isFile() / isDirectory()', 'what kind of entry it is', 'boolean'],
    ['length()', 'size in bytes', 'long'],
    ['canRead() / canWrite()', 'permission checks', 'boolean'],
    ['list() / listFiles()', 'contents of a folder', 'String[] / File[]'],
    ['renameTo(File dest)', 'renames or moves', 'boolean'],
    ['lastModified()', 'last change time in milliseconds since 1970', 'long'],
    ['toPath()', 'converts to an NIO Path', 'Path'],
  ], [[`
        File dir = new File("docs");
        System.out.println("mkdir: " + dir.mkdir());
        File f = new File(dir, "readme.txt");
        System.out.println("create: " + f.createNewFile());
        Files.writeString(f.toPath(), "hello");
        System.out.println(f.getPath() + " is file? " + f.isFile() + ", size " + f.length());
        System.out.println("folder contains: " + Arrays.toString(dir.list()));
        File renamed = new File(dir, "README.md");
        System.out.println("rename: " + f.renameTo(renamed));
        System.out.println("delete: " + renamed.delete() + ", " + dir.delete());`]]);

  ref('java_ref_fileinputstream', '<code>java.io.FileInputStream</code> reads raw bytes from a file.', [
    ['FileInputStream(String name)', 'constructor: opens the file (throws FileNotFoundException)', ''],
    ['read()', 'next byte (0–255), or -1 at the end', 'int'],
    ['read(byte[] b)', 'fills b; returns the count, or -1', 'int'],
    ['read(byte[] b, int off, int len)', 'reads up to len bytes into b at off', 'int'],
    ['readAllBytes()', 'everything that is left', 'byte[]'],
    ['readNBytes(int n)', 'up to n bytes', 'byte[]'],
    ['skip(long n)', 'skips n bytes', 'long'],
    ['available()', 'estimate of bytes readable without blocking', 'int'],
    ['transferTo(OutputStream out)', 'copies everything left to out', 'long'],
    ['close()', 'closes the file', 'void'],
  ], [[`
        Files.write(Path.of("abc.bin"), "ABCDEFGHIJ".getBytes());
        try (FileInputStream in = new FileInputStream("abc.bin")) {
            System.out.println((char) in.read());
            in.skip(3);
            System.out.println(new String(in.readNBytes(2)));
            System.out.println("left: " + in.available());
            System.out.println(new String(in.readAllBytes()));
            System.out.println(in.read());
        }`]]);

  ref('java_ref_fileoutputstream', '<code>java.io.FileOutputStream</code> writes raw bytes to a file.', [
    ['FileOutputStream(String name)', 'constructor: creates or overwrites the file', ''],
    ['FileOutputStream(String name, boolean append)', 'constructor: appends when append is true', ''],
    ['write(int b)', 'writes one byte (the low 8 bits)', 'void'],
    ['write(byte[] b)', 'writes all bytes of b', 'void'],
    ['write(byte[] b, int off, int len)', 'writes len bytes starting at off', 'void'],
    ['flush()', 'forces data to the operating system', 'void'],
    ['close()', 'closes the file', 'void'],
  ], [[`
        try (FileOutputStream out = new FileOutputStream("out.bin")) {
            out.write('H');
            out.write("ello".getBytes());
            byte[] buf = " world!!!".getBytes();
            out.write(buf, 0, 7);
        }
        try (FileOutputStream out = new FileOutputStream("out.bin", true)) {
            out.write('\\n');
        }
        System.out.print(Files.readString(Path.of("out.bin")));
        System.out.println(Files.size(Path.of("out.bin")) + " bytes");`]]);

  ref('java_ref_bufferedreader', '<code>java.io.BufferedReader</code> wraps another <code>Reader</code> and reads text in large chunks.', [
    ['BufferedReader(Reader in)', 'constructor: wraps another reader', ''],
    ['readLine()', 'next line without the line break, or null at the end', 'String'],
    ['read()', 'next character, or -1', 'int'],
    ['read(char[] buf, int off, int len)', 'reads characters into an array', 'int'],
    ['lines()', 'remaining lines as a stream', 'Stream<String>'],
    ['ready()', 'whether reading will not block', 'boolean'],
    ['skip(long n)', 'skips characters', 'long'],
    ['mark(int limit) / reset()', 'remembers a position / returns to it', 'void'],
    ['close()', 'closes the reader and the wrapped one', 'void'],
  ], [[`
        BufferedReader br = new BufferedReader(new StringReader("alpha\\nbeta\\ngamma\\ndelta"));
        System.out.println(br.readLine());
        br.mark(100);
        System.out.println(br.readLine());
        br.reset();                                   // back to "beta"
        System.out.println(br.lines().map(String::toUpperCase).toList());
        System.out.println(br.readLine());            // null: nothing left
        br.close();`, { desc: 'A <code>StringReader</code> stands in for a file here; the methods behave the same.' }]]);

  ref('java_ref_bufferedwriter', '<code>java.io.BufferedWriter</code> wraps another <code>Writer</code> and writes text in large chunks.', [
    ['BufferedWriter(Writer out)', 'constructor: wraps another writer', ''],
    ['write(String s)', 'writes text', 'void'],
    ['write(int c)', 'writes one character', 'void'],
    ['write(String s, int off, int len)', 'writes part of a string', 'void'],
    ['newLine()', 'writes the platform line separator', 'void'],
    ['append(CharSequence s)', 'writes text and returns the writer, for chaining', 'Writer'],
    ['flush()', 'pushes buffered text to the wrapped writer', 'void'],
    ['close()', 'flushes and closes', 'void'],
  ], [[`
        StringWriter target = new StringWriter();
        try (BufferedWriter bw = new BufferedWriter(target)) {
            bw.write("line one");
            bw.newLine();
            bw.append("line ").append("two");
            bw.newLine();
            bw.write("ignored part: line three", 14, 10);
            System.out.println("before flush: " + target.toString().length() + " chars");
        }
        System.out.println("after close:");
        System.out.print(target);
        System.out.println();`]]);

  ref('java_ref_iterators', '<code>Iterator&lt;E&gt;</code> steps through a collection. <code>ListIterator&lt;E&gt;</code>, from <code>list.listIterator()</code>, can also go backwards and modify elements.', [
    ['hasNext()', 'whether another element follows', 'boolean'],
    ['next()', 'the next element', 'E'],
    ['remove()', 'removes the element last returned by next()', 'void'],
    ['forEachRemaining(Consumer action)', 'runs action on all remaining elements', 'void'],
    ['hasPrevious() / previous()', 'ListIterator only: move backwards', 'boolean / E'],
    ['set(E e)', 'ListIterator only: replace the last returned element', 'void'],
    ['add(E e)', 'ListIterator only: insert at the current position', 'void'],
    ['nextIndex() / previousIndex()', 'ListIterator only: positions', 'int'],
  ], [[`
        List<String> names = new ArrayList<>(List.of("ana", "BEN", "cleo", "DEV"));
        ListIterator<String> it = names.listIterator();
        while (it.hasNext()) {
            String n = it.next();
            if (n.equals(n.toUpperCase())) it.set(n.toLowerCase());
            if (n.equals("cleo")) it.add("cleo's friend");
        }
        System.out.println(names);
        while (it.hasPrevious()) System.out.print(it.previous() + " ");
        System.out.println();`]]);

  ref('java_ref_collections', 'The <code>java.util.Collections</code> class contains static algorithms and factory methods for collections.', [
    ['sort(List l) / sort(List l, Comparator c)', 'sorts a list', 'void'],
    ['reverse(List l)', 'reverses the order', 'void'],
    ['shuffle(List l) / shuffle(List l, Random r)', 'random order (seeded for repeatability)', 'void'],
    ['max(Collection c) / min(Collection c)', 'largest / smallest element', 'T'],
    ['frequency(Collection c, Object o)', 'how many times o occurs', 'int'],
    ['binarySearch(List l, T key)', 'index of key in a sorted list', 'int'],
    ['swap(List l, int i, int j)', 'exchanges two elements', 'void'],
    ['fill(List l, T value)', 'replaces every element', 'void'],
    ['nCopies(int n, T value)', 'immutable list of n copies', 'List<T>'],
    ['addAll(Collection c, T... values)', 'adds several values', 'boolean'],
    ['unmodifiableList / Set / Map(x)', 'read-only view', 'List / Set / Map'],
    ['emptyList() / singletonList(T o)', 'immutable empty / one-element list', 'List<T>'],
    ['reverseOrder()', 'comparator for descending natural order', 'Comparator<T>'],
    ['disjoint(Collection a, Collection b)', 'true if no element is shared', 'boolean'],
  ], [[`
        List<Integer> nums = new ArrayList<>();
        Collections.addAll(nums, 5, 3, 8, 3, 1);
        System.out.println(Collections.max(nums) + " " + Collections.min(nums) + " " + Collections.frequency(nums, 3));
        Collections.sort(nums, Collections.reverseOrder());
        System.out.println(nums);
        Collections.swap(nums, 0, 4);
        System.out.println(nums);
        System.out.println(Collections.nCopies(3, "ha"));
        System.out.println(Collections.disjoint(nums, List.of(7, 9)));
        List<Integer> ro = Collections.unmodifiableList(nums);
        try { ro.add(0); } catch (UnsupportedOperationException e) { System.out.println("read-only"); }`]]);

  ref('java_ref_system', 'The <code>java.lang.System</code> class gives access to the standard streams and to information about the running program and its environment.', [
    ['out / err / in', 'standard output, error output and input streams', 'PrintStream / InputStream'],
    ['currentTimeMillis()', 'milliseconds since 1 January 1970 (wall clock)', 'long'],
    ['nanoTime()', 'high-resolution timer for measuring durations', 'long'],
    ['arraycopy(src, srcPos, dest, destPos, len)', 'fast copy between arrays', 'void'],
    ['getProperty(String key)', 'JVM property such as java.version or os.name', 'String'],
    ['getenv(String name)', 'operating-system environment variable', 'String'],
    ['lineSeparator()', 'the platform line break', 'String'],
    ['exit(int status)', 'ends the program (0 = success)', 'void'],
    ['identityHashCode(Object o)', 'default hash code, ignoring overrides', 'int'],
  ], [[`
        int[] src = { 1, 2, 3, 4, 5 };
        int[] dest = new int[7];
        System.arraycopy(src, 1, dest, 2, 3);
        System.out.println(Arrays.toString(dest));

        System.out.println("Java " + System.getProperty("java.specification.version"));
        System.out.println("line separator length: " + System.lineSeparator().length());

        long t0 = System.nanoTime();
        double x = 0;
        for (int i = 1; i < 1_000_000; i++) x += Math.sqrt(i);
        System.out.println("took " + (System.nanoTime() - t0) / 1_000_000 + " ms");

        System.err.println("this goes to the error stream");
        System.exit(0);
        System.out.println("never printed");`, { desc: 'Output that depends on the machine (timing, line separator) may differ for you.' }]]);

  JT.def('java_ref_errors', {
    body: () => [
      p('Exceptions are objects describing what went wrong. Unchecked exceptions (subclasses of <code>RuntimeException</code>) usually point to a bug. Checked exceptions must be caught or declared with <code>throws</code>. <code>Error</code>s signal serious problems that programs normally do not handle.'),
      h2('Common runtime exceptions'),
      table(['Exception', 'Typical cause'], [
        [c('ArithmeticException'), 'integer division by zero'],
        [c('ArrayIndexOutOfBoundsException'), 'array index below 0 or ≥ length'],
        [c('StringIndexOutOfBoundsException'), 'bad index in <code>charAt</code> or <code>substring</code>'],
        [c('IndexOutOfBoundsException'), 'bad index in a <code>List</code>'],
        [c('NullPointerException'), 'calling a method or reading a field on <code>null</code>'],
        [c('NumberFormatException'), 'parsing text that is not a valid number'],
        [c('ClassCastException'), 'casting an object to a type it does not have'],
        [c('NegativeArraySizeException'), 'creating an array with a negative length'],
        [c('IllegalArgumentException'), 'a method received an unacceptable argument'],
        [c('IllegalStateException'), 'a method was called at the wrong time'],
        [c('UnsupportedOperationException'), 'modifying an immutable collection'],
        [c('ConcurrentModificationException'), 'changing a collection while looping over it'],
        [c('InputMismatchException'), '<code>Scanner</code> found the wrong kind of token'],
        [c('NoSuchElementException'), 'asking an iterator or Scanner for more when there is none'],
      ]),
      h2('Common checked exceptions'),
      table(['Exception', 'Typical cause'], [
        [c('IOException'), 'general input/output failure'],
        [c('FileNotFoundException'), 'opening a file that does not exist or cannot be opened'],
        [c('NoSuchFileException'), 'NIO: the path does not exist'],
        [c('FileAlreadyExistsException'), 'NIO: creating something that already exists'],
        [c('InterruptedException'), 'a sleeping or waiting thread was interrupted'],
        [c('ClassNotFoundException'), 'loading a class by name that cannot be found'],
      ]),
      h2('Errors'),
      table(['Error', 'Typical cause'], [
        [c('StackOverflowError'), 'recursion with no (reachable) base case'],
        [c('OutOfMemoryError'), 'the program needs more memory than allowed'],
      ]),
      h2('Useful exception methods'),
      methods([
        ['getMessage()', 'the detail message', 'String'],
        ['toString()', 'class name plus message', 'String'],
        ['printStackTrace()', 'prints the stack trace to System.err', 'void'],
        ['getCause()', 'the exception that caused this one', 'Throwable'],
        ['getStackTrace()', 'the call stack as an array', 'StackTraceElement[]'],
      ]),
      ex(`
        Runnable[] mistakes = {
            () -> System.out.println(10 / 0),
            () -> System.out.println(new int[-1].length),
            () -> System.out.println("abc".charAt(9)),
            () -> System.out.println(((String) null).length()),
            () -> System.out.println(Integer.parseInt("12a")),
            () -> System.out.println((String) (Object) Integer.valueOf(3)),
            () -> List.of(1).add(2),
        };
        for (Runnable r : mistakes) {
            try {
                r.run();
            } catch (RuntimeException e) {
                System.out.println(e.getClass().getSimpleName() + ": " + e.getMessage());
            }
        }`, { title: 'Triggering and catching common exceptions' }),
      note('Catch exceptions where you can actually do something about them. Catching everything just to hide errors makes bugs harder to find.'),
    ].join(''),
  });
})();
