// Lessons: data structures and the Collections Framework — lists, sets, maps, iterators, algorithms.
// HashSet/HashMap iteration order is unspecified, so examples never rely on it (they sort, or use a
// Linked/Tree variant) to keep output meaningful on every JDK.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, note, table, ex } = JT.h;
  const link = (slug, text) => '<a href="' + JT.url(slug) + '">' + text + '</a>';

  JT.def('java_data_structures', {
    body: () => [
      h2('What is a data structure?'),
      p('A data structure is a way of organising data so that the operations you need are easy and fast. An array is the simplest one: a fixed number of slots in a row. Real programs often need more: a list that grows, a collection without duplicates, or a lookup from a key to a value.'),
      table(['Need', 'Structure', 'Java type'], [
        ['ordered items, may repeat, access by position', 'list', link('java_arraylist', '<code>ArrayList</code>') + ', ' + link('java_linkedlist', '<code>LinkedList</code>')],
        ['unique items, fast "is it there?"', 'set', link('java_hashset', '<code>HashSet</code>') + ', ' + link('java_treeset', '<code>TreeSet</code>') + ', ' + link('java_linkedhashset', '<code>LinkedHashSet</code>')],
        ['look up a value by a key', 'map', link('java_hashmap', '<code>HashMap</code>') + ', ' + link('java_treemap', '<code>TreeMap</code>') + ', ' + link('java_linkedhashmap', '<code>LinkedHashMap</code>')],
        ['first in, first out', 'queue', '<code>ArrayDeque</code>, <code>LinkedList</code>'],
        ['last in, first out', 'stack', '<code>ArrayDeque</code> (push/pop)'],
        ['always take the smallest first', 'priority queue', '<code>PriorityQueue</code>'],
      ]),
      h2('Array vs. ArrayList'),
      ex(`
        String[] fixed = new String[2];
        fixed[0] = "Monday";
        fixed[1] = "Tuesday";
        // fixed[2] = "Wednesday";  // would throw: the array is full

        ArrayList<String> growing = new ArrayList<>();
        growing.add("Monday");
        growing.add("Tuesday");
        growing.add("Wednesday");   // grows automatically

        System.out.println(Arrays.toString(fixed) + " length " + fixed.length);
        System.out.println(growing + " size " + growing.size());`),
      h2('Queue and stack'),
      ex(`
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.offer("first customer");
        queue.offer("second customer");
        System.out.println("serving: " + queue.poll());

        ArrayDeque<String> stack = new ArrayDeque<>();
        stack.push("page 1");
        stack.push("page 2");
        stack.push("page 3");
        System.out.println("back to: " + stack.pop());
        System.out.println("then: " + stack.pop());`),
    ].join(''),
  });

  JT.def('java_collections', {
    body: () => [
      h2('The Collections Framework'),
      p('The <code>java.util</code> package offers a family of interfaces and classes for storing groups of objects. Code is written against the <b>interface</b> (<code>List</code>, <code>Set</code>, <code>Map</code>), and you choose the <b>implementation</b> that fits your performance needs.'),
      table(['Interface', 'Describes', 'Common implementations'], [
        ['<code>Collection</code>', 'any group of elements', '(parent of List, Set, Queue)'],
        ['<code>List</code>', 'ordered, indexed, duplicates allowed', '<code>ArrayList</code>, <code>LinkedList</code>'],
        ['<code>Set</code>', 'no duplicates', '<code>HashSet</code>, <code>LinkedHashSet</code>, <code>TreeSet</code>'],
        ['<code>Queue</code> / <code>Deque</code>', 'processing order (FIFO, LIFO, priority)', '<code>ArrayDeque</code>, <code>PriorityQueue</code>'],
        ['<code>Map</code>', 'key → value pairs (not a <code>Collection</code>)', '<code>HashMap</code>, <code>LinkedHashMap</code>, <code>TreeMap</code>'],
      ]),
      h2('Generics: the type in angle brackets'),
      p('<code>List&lt;String&gt;</code> means "a list of strings". The compiler then refuses anything else, and you never need casts when reading elements. Collections store objects, so for primitives you use wrapper types: <code>List&lt;Integer&gt;</code>, not <code>List&lt;int&gt;</code>.'),
      ex(`
        List<String> names = new ArrayList<>();   // program to the interface
        names.add("Farah");
        names.add("Diego");
        // names.add(42);  // compile error: not a String

        Collection<String> c = names;             // a List is also a Collection
        System.out.println(c.size() + " " + c.contains("Diego"));

        List<Integer> numbers = new ArrayList<>(List.of(3, 1, 2));
        int first = numbers.get(0);               // automatic unboxing
        System.out.println(first + 10);`),
      h2('Immutable collections'),
      p('<code>List.of</code>, <code>Set.of</code> and <code>Map.of</code> create small collections that can never change. That is ideal for constants and safe sharing.'),
      ex(`
        List<String> planets = List.of("Mercury", "Venus", "Earth");
        System.out.println(planets);
        try {
            planets.add("Mars");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify an immutable list");
        }`),
    ].join(''),
  });

  JT.def('java_list', {
    body: () => [
      h2('The List interface'),
      p('A <code>List</code> keeps elements in insertion order and lets you access them by index, starting at 0. Duplicates are allowed. The two main implementations are ' + link('java_arraylist', '<code>ArrayList</code>') + ' and ' + link('java_linkedlist', '<code>LinkedList</code>') + '. Both support all the methods below.'),
      table(['Method', 'Does'], [
        ['<code>add(e)</code>, <code>add(i, e)</code>', 'append, or insert at index'],
        ['<code>get(i)</code>, <code>set(i, e)</code>', 'read or replace at index'],
        ['<code>remove(i)</code>, <code>remove(obj)</code>', 'remove by index or by value'],
        ['<code>size()</code>, <code>isEmpty()</code>', 'count / empty check'],
        ['<code>contains(e)</code>, <code>indexOf(e)</code>', 'search'],
        ['<code>subList(from, to)</code>', 'a view of part of the list'],
      ]),
      ex(`
        List<String> tasks = new ArrayList<>();
        tasks.add("write report");
        tasks.add("email Sven");
        tasks.add(0, "buy coffee");          // insert at the front
        tasks.set(2, "email Sven and Kaito");
        System.out.println(tasks);
        System.out.println("Second task: " + tasks.get(1));
        tasks.remove("buy coffee");
        System.out.println(tasks + ", " + tasks.size() + " left");
        System.out.println("index of report: " + tasks.indexOf("write report"));`),
      note('<code>remove(1)</code> on a <code>List&lt;Integer&gt;</code> removes the element at <b>index</b> 1. To remove the value 1, write <code>remove(Integer.valueOf(1))</code>.'),
    ].join(''),
  });

  JT.def('java_arraylist', {
    body: () => [
      h2('ArrayList'),
      p('<code>ArrayList</code> is a resizable array, and the list you will use most often. Reading by index is very fast; inserting or removing in the middle is slower because later elements must shift.'),
      ex(`
        ArrayList<String> cities = new ArrayList<>();
        cities.add("Accra");
        cities.add("Hanoi");
        cities.add("Quito");
        System.out.println(cities);
        System.out.println(cities.get(1));
        cities.set(1, "Hue");
        cities.remove(0);
        System.out.println(cities + " (" + cities.size() + ")");
        cities.clear();
        System.out.println("empty: " + cities.isEmpty());`),
      h2('Looping'),
      ex(`
        ArrayList<Integer> temps = new ArrayList<>(List.of(18, 22, 25, 19, 30));
        int sum = 0;
        for (int t : temps) {
            sum += t;
        }
        System.out.println("average: " + (double) sum / temps.size());

        for (int i = 0; i < temps.size(); i++) {
            if (temps.get(i) >= 25) System.out.println("day " + (i + 1) + " was hot");
        }

        temps.removeIf(t -> t < 20);   // remove all matching elements
        System.out.println(temps);`),
      h2('Sorting'),
      ex(`
        ArrayList<String> fruit = new ArrayList<>(List.of("plum", "kiwi", "apple", "mango"));
        Collections.sort(fruit);
        System.out.println(fruit);
        fruit.sort(Comparator.reverseOrder());
        System.out.println(fruit);`),
      p('More on sorting in ' + link('java_sort_list', 'List Sorting') + '.'),
    ].join(''),
    exercise: { q: 'Add <code>"Lima"</code> to the list and print its size.', code: 'ArrayList<String> c = new ArrayList<>();\nc.___("Lima");\nSystem.out.println(c.___());', options: ['add', 'size', 'push', 'length', 'count'], answer: ['add', 'size'] },
  });

  JT.def('java_linkedlist', {
    body: () => [
      h2('LinkedList'),
      p('<code>LinkedList</code> stores each element in a node that points to the next and previous nodes. It implements both <code>List</code> and <code>Deque</code>, so it has extra methods for working at both ends.'),
      ex(`
        LinkedList<String> line = new LinkedList<>();
        line.add("Bea");
        line.add("Cyrus");
        line.addFirst("Ade");     // front
        line.addLast("Dana");     // back
        System.out.println(line);
        System.out.println("first: " + line.getFirst() + ", last: " + line.getLast());
        line.removeFirst();
        line.removeLast();
        System.out.println(line);`),
      h2('ArrayList or LinkedList?'),
      table(['Operation', 'ArrayList', 'LinkedList'], [
        ['get(i) by index', 'fast', 'slow (walks the nodes)'],
        ['add at the end', 'fast', 'fast'],
        ['add / remove at the front', 'slow (shifts everything)', 'fast'],
        ['memory per element', 'small', 'larger (two links per node)'],
      ]),
      note('In practice <code>ArrayList</code> is the right default. For a queue or stack, <code>ArrayDeque</code> is usually faster than <code>LinkedList</code>.'),
    ].join(''),
    exercise: { q: 'Insert <code>"start"</code> at the very beginning of the linked list.', code: 'list.___("start");', options: ['addFirst', 'addLast', 'push_front', 'insert'], answer: ['addFirst'] },
  });

  JT.def('java_sort_list', {
    body: () => [
      h2('Sorting lists'),
      p('<code>Collections.sort(list)</code> and <code>list.sort(null)</code> sort elements in their <b>natural order</b>: numbers ascending, strings alphabetically (upper case before lower case). Pass a <code>Comparator</code> to choose another order.'),
      ex(`
        List<Integer> nums = new ArrayList<>(List.of(42, 7, 19, 3, 25));
        Collections.sort(nums);
        System.out.println(nums);
        nums.sort(Comparator.reverseOrder());
        System.out.println(nums);

        List<String> words = new ArrayList<>(List.of("banana", "apple", "Cherry"));
        Collections.sort(words);
        System.out.println(words);                       // 'C' sorts before 'a'
        words.sort(String.CASE_INSENSITIVE_ORDER);
        System.out.println(words);`),
      h2('Sorting by a property'),
      p('<code>Comparator.comparing</code> builds a comparator from a "key" function. Chain <code>thenComparing</code> for ties and <code>reversed()</code> to flip the order.'),
      ex(`
        import java.util.*;

        record Runner(String name, int minutes) { }

        public class Main {
            public static void main(String[] args) {
                List<Runner> results = new ArrayList<>(List.of(
                    new Runner("Tariq", 41), new Runner("Elin", 38),
                    new Runner("Mona", 41), new Runner("Jun", 36)));

                results.sort(Comparator.comparingInt(Runner::minutes).thenComparing(Runner::name));
                for (Runner r : results) System.out.println(r.minutes() + "  " + r.name());
            }
        }`),
      p('More techniques, including writing your own <code>Comparable</code>, are in ' + link('java_advanced_sorting', 'Advanced Sorting') + '.'),
    ].join(''),
  });

  JT.def('java_set', {
    body: () => [
      h2('The Set interface'),
      p('A <code>Set</code> holds each element at most once. Adding a duplicate is simply ignored (<code>add</code> returns <code>false</code>). Sets are ideal for "have I seen this before?" questions.'),
      table(['Implementation', 'Order when iterating', 'Speed'], [
        [link('java_hashset', '<code>HashSet</code>'), 'unspecified', 'fastest'],
        [link('java_linkedhashset', '<code>LinkedHashSet</code>'), 'insertion order', 'fast'],
        [link('java_treeset', '<code>TreeSet</code>'), 'sorted', 'slower (log n)'],
      ]),
      ex(`
        Set<String> visited = new LinkedHashSet<>();
        String[] trail = { "home", "shop", "park", "shop", "home", "cafe" };
        for (String place : trail) {
            boolean isNew = visited.add(place);
            System.out.println(place + (isNew ? " (new)" : " (again)"));
        }
        System.out.println("Distinct places: " + visited);`),
      h2('Set operations'),
      ex(`
        Set<String> alice = new TreeSet<>(Set.of("chess", "hiking", "jazz", "cooking"));
        Set<String> bob = new TreeSet<>(Set.of("jazz", "football", "cooking"));

        Set<String> both = new TreeSet<>(alice);
        both.retainAll(bob);             // intersection
        Set<String> either = new TreeSet<>(alice);
        either.addAll(bob);              // union
        Set<String> onlyAlice = new TreeSet<>(alice);
        onlyAlice.removeAll(bob);        // difference

        System.out.println("both:   " + both);
        System.out.println("either: " + either);
        System.out.println("only Alice: " + onlyAlice);`),
    ].join(''),
  });

  JT.def('java_hashset', {
    body: () => [
      h2('HashSet'),
      p('<code>HashSet</code> stores elements in a hash table, so <code>add</code>, <code>remove</code> and <code>contains</code> are very fast regardless of size. The order you get when looping is <b>not</b> defined: do not depend on it.'),
      ex(`
        HashSet<String> guests = new HashSet<>();
        guests.add("Hana");
        guests.add("Omar");
        guests.add("Hana");      // duplicate, ignored
        guests.add("Luca");
        System.out.println("count: " + guests.size());
        System.out.println("Omar invited? " + guests.contains("Omar"));
        guests.remove("Omar");
        System.out.println("Omar invited? " + guests.contains("Omar"));`),
      h2('Removing duplicates from a list'),
      ex(`
        List<Integer> rolls = List.of(4, 2, 6, 4, 1, 2, 6, 6, 3);
        Set<Integer> distinct = new HashSet<>(rolls);
        System.out.println(distinct.size() + " different values");

        List<Integer> sorted = new ArrayList<>(distinct);
        Collections.sort(sorted);       // sort for a predictable display
        System.out.println(sorted);`),
      note('Objects stored in a <code>HashSet</code> (or used as <code>HashMap</code> keys) need correct <code>equals()</code> and <code>hashCode()</code> methods. <code>String</code>, wrapper types and <code>record</code>s have them already.'),
    ].join(''),
    exercise: { q: 'Check whether the set contains <code>"Kim"</code>.', code: 'boolean found = names.___("Kim");', options: ['contains', 'has', 'get', 'indexOf'], answer: ['contains'] },
  });

  JT.def('java_treeset', {
    body: () => [
      h2('TreeSet'),
      p('<code>TreeSet</code> keeps its elements <b>sorted</b> at all times. Besides normal set operations it can answer "smallest", "largest", "next above x" and range questions.'),
      ex(`
        TreeSet<Integer> scores = new TreeSet<>(List.of(72, 95, 60, 88, 95, 79));
        System.out.println(scores);                    // sorted, no duplicates
        System.out.println("lowest:  " + scores.first());
        System.out.println("highest: " + scores.last());
        System.out.println("first >= 80: " + scores.ceiling(80));
        System.out.println("below 80: " + scores.headSet(80));
        System.out.println("descending: " + scores.descendingSet());`),
      h2('Custom order'),
      ex(`
        TreeSet<String> byLength = new TreeSet<>(Comparator.comparingInt(String::length).thenComparing(s -> s));
        byLength.addAll(List.of("fig", "banana", "kiwi", "date", "apple"));
        System.out.println(byLength);`),
      note('A <code>TreeSet</code> treats two elements as duplicates when its comparator returns 0 for them. That is why the example adds <code>thenComparing</code>: without it, "kiwi" and "date" (both length 4) would count as the same.'),
    ].join(''),
  });

  JT.def('java_linkedhashset', {
    body: () => [
      h2('LinkedHashSet'),
      p('<code>LinkedHashSet</code> is a <code>HashSet</code> that also remembers <b>insertion order</b>. It is almost as fast and gives predictable iteration, which makes it the natural choice for "unique, in the order first seen".'),
      ex(`
        String sentence = "the cat saw the dog and the cat ran";
        Set<String> words = new LinkedHashSet<>(Arrays.asList(sentence.split(" ")));
        System.out.println(words);
        System.out.println(String.join(" ", words));`),
      ex(`
        Set<Character> seen = new LinkedHashSet<>();
        for (char ch : "programming".toCharArray()) seen.add(ch);
        StringBuilder sb = new StringBuilder();
        for (char ch : seen) sb.append(ch);
        System.out.println(sb);`, { title: 'Distinct letters in order' }),
    ].join(''),
  });

  JT.def('java_map', {
    body: () => [
      h2('The Map interface'),
      p('A <code>Map</code> stores <b>key → value</b> pairs. Each key appears once; putting an existing key replaces its value. Use a map whenever you look things up by name, ID or code.'),
      table(['Method', 'Does'], [
        ['<code>put(k, v)</code>', 'add or replace'],
        ['<code>get(k)</code>', 'value for key, or <code>null</code>'],
        ['<code>getOrDefault(k, d)</code>', 'value, or <code>d</code> if missing'],
        ['<code>containsKey(k)</code>', 'is the key present?'],
        ['<code>remove(k)</code>', 'delete a pair'],
        ['<code>keySet()</code>, <code>values()</code>, <code>entrySet()</code>', 'views for looping'],
      ]),
      table(['Implementation', 'Key order', 'Speed'], [
        [link('java_hashmap', '<code>HashMap</code>'), 'unspecified', 'fastest'],
        [link('java_linkedhashmap', '<code>LinkedHashMap</code>'), 'insertion order', 'fast'],
        [link('java_treemap', '<code>TreeMap</code>'), 'sorted by key', 'slower (log n)'],
      ]),
      ex(`
        Map<String, String> capitals = new TreeMap<>();
        capitals.put("Kenya", "Nairobi");
        capitals.put("Peru", "Lima");
        capitals.put("Japan", "Tokyo");
        System.out.println(capitals.get("Peru"));
        System.out.println(capitals.getOrDefault("Chad", "unknown"));
        for (Map.Entry<String, String> e : capitals.entrySet()) {
            System.out.println(e.getKey() + " → " + e.getValue());
        }`),
    ].join(''),
  });

  JT.def('java_hashmap', {
    body: () => [
      h2('HashMap'),
      p('<code>HashMap</code> is the everyday map: fast lookups by key, with no guaranteed order.'),
      ex(`
        HashMap<String, Integer> stock = new HashMap<>();
        stock.put("apples", 40);
        stock.put("pears", 12);
        stock.put("apples", 35);          // replaces 40
        System.out.println("apples: " + stock.get("apples"));
        System.out.println("plums: " + stock.get("plums"));
        System.out.println("has pears? " + stock.containsKey("pears"));
        stock.remove("pears");
        System.out.println("items: " + stock.size());`),
      h2('Counting with a map'),
      p('A very common pattern: count how often each thing occurs. <code>merge</code> adds 1 to the existing count, or starts at 1.'),
      ex(`
        String text = "to be or not to be that is the question";
        Map<String, Integer> counts = new HashMap<>();
        for (String w : text.split(" ")) {
            counts.merge(w, 1, Integer::sum);
        }
        // sort the keys for a predictable display
        for (String w : new TreeSet<>(counts.keySet())) {
            System.out.println(w + ": " + counts.get(w));
        }`),
      h2('Values that are collections'),
      ex(`
        Map<String, List<String>> byTeam = new HashMap<>();
        String[][] people = { { "Ola", "red" }, { "Kai", "blue" }, { "Ren", "red" }, { "Ivy", "blue" }, { "Zed", "red" } };
        for (String[] p : people) {
            byTeam.computeIfAbsent(p[1], k -> new ArrayList<>()).add(p[0]);
        }
        System.out.println("red:  " + byTeam.get("red"));
        System.out.println("blue: " + byTeam.get("blue"));`),
    ].join(''),
    exercise: { q: 'Store the price 2.5 under the key <code>"milk"</code>, then read it.', code: 'prices.___("milk", 2.5);\ndouble p = prices.___("milk");', options: ['put', 'get', 'add', 'set', 'fetch'], answer: ['put', 'get'] },
  });

  JT.def('java_treemap', {
    body: () => [
      h2('TreeMap'),
      p('<code>TreeMap</code> keeps its keys sorted. Like <code>TreeSet</code>, it can find the first or last key and the nearest key above or below a value, which is useful for ranges, schedules and price bands.'),
      ex(`
        TreeMap<Integer, String> grades = new TreeMap<>();
        grades.put(90, "A");
        grades.put(80, "B");
        grades.put(70, "C");
        grades.put(60, "D");
        grades.put(0, "F");

        int[] marks = { 95, 83, 70, 61, 42 };
        for (int m : marks) {
            System.out.println(m + " → " + grades.floorEntry(m).getValue());
        }`, { desc: '<code>floorEntry(m)</code> finds the largest key that is ≤ m.' }),
      ex(`
        TreeMap<String, Integer> population = new TreeMap<>(Map.of(
            "Oslo", 709000, "Bergen", 291000, "Tromsø", 78000, "Stavanger", 146000));
        System.out.println(population);
        System.out.println("first: " + population.firstKey());
        System.out.println("A–O: " + population.headMap("P"));`),
    ].join(''),
  });

  JT.def('java_linkedhashmap', {
    body: () => [
      h2('LinkedHashMap'),
      p('<code>LinkedHashMap</code> remembers the order in which keys were first inserted. Choose it when you need a map and also want predictable output, such as a menu or a settings file.'),
      ex(`
        Map<String, Double> menu = new LinkedHashMap<>();
        menu.put("Soup of the day", 5.50);
        menu.put("Falafel wrap", 8.00);
        menu.put("Mango lassi", 3.75);
        menu.put("Soup of the day", 5.90);   // update keeps the original position
        menu.forEach((dish, price) -> System.out.printf("%-16s %5.2f%n", dish, price));`),
      h2('Access order: a tiny cache'),
      p('Constructed with <code>accessOrder = true</code>, the order becomes "least recently used first". Overriding <code>removeEldestEntry</code> then gives a fixed-size LRU cache.'),
      ex(`
        Map<String, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
                return size() > 3;
            }
        };
        cache.put("a", "1"); cache.put("b", "2"); cache.put("c", "3");
        cache.get("a");            // "a" is now the most recently used
        cache.put("d", "4");       // evicts the least recently used: "b"
        System.out.println(cache.keySet());`),
    ].join(''),
  });

  JT.def('java_iterator', {
    body: () => [
      h2('Iterator'),
      p('An <code>Iterator</code> walks through any collection one element at a time with <code>hasNext()</code> and <code>next()</code>. The for-each loop uses one behind the scenes.'),
      ex(`
        List<String> colours = List.of("red", "green", "blue");
        Iterator<String> it = colours.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }`),
      h2('Removing while looping'),
      p('Removing elements inside a for-each loop throws <code>ConcurrentModificationException</code>. Use the iterator\'s own <code>remove()</code> instead (or <code>removeIf</code>).'),
      ex(`
        List<Integer> nums = new ArrayList<>(List.of(5, 12, 8, 21, 3, 16));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 1) it.remove();   // drop odd numbers
        }
        System.out.println(nums);`),
      ex(`
        List<Integer> nums = new ArrayList<>(List.of(5, 12, 8, 21));
        for (Integer n : nums) {
            if (n > 10) nums.remove(n);
        }`, { title: 'The wrong way', desc: 'This example throws an exception on purpose.' }),
      h2('Iterating a map'),
      ex(`
        Map<String, Integer> ages = new TreeMap<>(Map.of("Ines", 34, "Raj", 29, "Uma", 41));
        Iterator<Map.Entry<String, Integer>> it = ages.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Integer> e = it.next();
            if (e.getValue() < 30) it.remove();
        }
        System.out.println(ages);`),
    ].join(''),
    exercise: { q: 'Loop through the collection with an iterator.', code: 'Iterator<String> it = list.iterator();\nwhile (it.___()) {\n    System.out.println(it.___());\n}', options: ['hasNext', 'next', 'more', 'get'], answer: ['hasNext', 'next'] },
  });

  JT.def('java_algorithms', {
    body: () => [
      h2('Ready-made algorithms'),
      p('The <code>Collections</code> class (note the <i>s</i>) has static methods that work on any list or collection, so you do not have to write common algorithms yourself. <code>Arrays</code> has the same kind of helpers for arrays.'),
      ex(`
        List<Integer> data = new ArrayList<>(List.of(14, 3, 27, 3, 9, 41, 3));
        System.out.println("max: " + Collections.max(data));
        System.out.println("min: " + Collections.min(data));
        System.out.println("frequency of 3: " + Collections.frequency(data, 3));

        Collections.sort(data);
        System.out.println("sorted: " + data);
        System.out.println("index of 27: " + Collections.binarySearch(data, 27));

        Collections.reverse(data);
        System.out.println("reversed: " + data);

        Collections.shuffle(data, new Random(1));   // seeded, so the result is repeatable
        System.out.println("shuffled: " + data);

        Collections.swap(data, 0, data.size() - 1);
        System.out.println("swapped ends: " + data);`),
      h2('Searching by hand'),
      p('It still helps to know how these work. Binary search halves the search range at every step, so it needs the list to be <b>sorted</b>. It finds an item among a million in about 20 steps, where a linear search may need a million.'),
      ex(`
        public class Main {
            static int binarySearch(int[] sorted, int target) {
                int lo = 0, hi = sorted.length - 1, steps = 0;
                while (lo <= hi) {
                    steps++;
                    int mid = (lo + hi) >>> 1;
                    if (sorted[mid] == target) { System.out.println("steps: " + steps); return mid; }
                    if (sorted[mid] < target) lo = mid + 1; else hi = mid - 1;
                }
                System.out.println("steps: " + steps);
                return -1;
            }

            public static void main(String[] args) {
                int[] big = new int[1_000_000];
                for (int i = 0; i < big.length; i++) big[i] = i * 2;
                System.out.println("found at " + binarySearch(big, 1_337_000));
                System.out.println("found at " + binarySearch(big, 7));
            }
        }`),
      ul([
        '<code>Collections.unmodifiableList(list)</code>: a read-only view.',
        '<code>Collections.nCopies(3, "x")</code>: a list of repeated values.',
        '<code>Collections.addAll(list, a, b, c)</code>: add several elements at once.',
        '<code>Arrays.sort</code>, <code>Arrays.binarySearch</code>, <code>Arrays.fill</code>: the same ideas for arrays.',
      ]),
    ].join(''),
    exercise: { q: 'Find the largest element of <code>list</code>.', code: 'int biggest = Collections.___(list);', options: ['max', 'largest', 'top', 'sort'], answer: ['max'] },
  });
})();
