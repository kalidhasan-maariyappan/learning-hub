// Focused lessons for collection implementation behavior and trade-offs.
(function () {
  'use strict';
  const JT = window.JT;
  const { note, table } = JT.h;
  function add(id, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def('java_ca_advanced_collections_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('arraylist_resizing', 'ArrayList resizing internals',
    'ArrayList stores its elements in an internal array. When an add would exceed the array’s current capacity, the implementation allocates a larger array and copies the existing references.',
    'Resizing explains why appending is usually fast but can occasionally take longer. Supplying a reasonable initial capacity can reduce copying when the expected size is known.',
    'The list checks whether its backing array has room. If not, it grows the array, copies existing elements, and then stores the new value. The exact growth factor is an implementation detail.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(2);
        names.add("Asha");
        names.add("Ben");
        names.add("Chen");
        System.out.println(names.size());
        System.out.println(names);
    }
}`, '3\n[Asha, Ben, Chen]',
    ['ArrayList capacity is not the same as its size.', 'Appending is amortized O(1); an individual growth operation copies elements.', 'Use ensureCapacity when it is available and a large size is known in advance.'],
    'Do not use reflection to depend on ArrayList’s private backing array or exact growth factor.');

  add('arraylist_linkedlist', 'ArrayList vs LinkedList performance',
    'ArrayList stores elements in a resizable array. LinkedList stores nodes linked to neighboring nodes. Their access and update costs differ.',
    'Choosing by the operation pattern avoids a common performance mistake: using a linked list for frequent indexed reads.',
    'ArrayList gets an element by calculating its array index. LinkedList must follow node links to reach an index. Inserting at a known linked-list iterator position is cheap, but locating that position still takes time.',
    `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> array = new ArrayList<>(List.of("A", "B", "C"));
        List<String> linked = new LinkedList<>(array);
        System.out.println(array.get(1));
        System.out.println(linked.get(1));
    }
}`, 'B\nB',
    ['ArrayList indexed get is O(1).', 'LinkedList indexed get is O(n).', 'For most general list use, ArrayList is a good starting choice.'],
    'Do not assume LinkedList is faster for every insert. Finding the insertion position can dominate the cost.');

  add('hashset_internals', 'HashSet internals',
    'HashSet stores unique elements. In common OpenJDK implementations, it uses a HashMap internally and stores each set element as a map key.',
    'This explains why hashCode and equals affect set membership, and why HashSet does not promise iteration order.',
    'When add is called, the set checks whether an equal key is already present. It adds the element only if no equal element is stored.',
    `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();
        tags.add("java");
        tags.add("java");
        tags.add("backend");
        System.out.println(tags.size());
        System.out.println(tags.contains("java"));
    }
}`, '2\ntrue',
    ['Set uniqueness follows equals and hashCode for hash-based sets.', 'HashSet has no guaranteed display order.', 'HashSet’s backing-map implementation is not part of the Set contract.'],
    'Do not compare HashSet output text in an order-sensitive way. Sort values or use an ordered set if order matters.');

  add('treemap_redblack', 'TreeMap and red-black trees',
    'TreeMap is a sorted map. In OpenJDK it uses a red-black tree, a self-balancing binary search tree, to keep keys in sorted order.',
    'TreeMap is useful when keys must remain sorted or when code needs range views such as keys between two values.',
    'Each key is positioned according to its natural ordering or a supplied Comparator. Tree rotations keep the tree balanced after insertions and removals.',
    `import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> ranks = new TreeMap<>();
        ranks.put(30, "third");
        ranks.put(10, "first");
        ranks.put(20, "second");
        System.out.println(ranks.keySet());
    }
}`, '[10, 20, 30]',
    ['TreeMap iteration follows sorted key order.', 'get and put are O(log n).', 'Keys must be mutually comparable under the map’s ordering.'],
    'A Comparator that returns zero treats keys as the same map position, even if equals() says they differ.');

  add('comparable_comparator', 'Comparable vs Comparator in complex sorting',
    '<code>Comparable</code> defines a type’s natural ordering through <code>compareTo</code>. <code>Comparator</code> defines an ordering outside the type and can be composed for multiple sort keys.',
    'A Comparator is useful when a class needs several valid orderings, such as sorting employees by department, then salary, then name.',
    'Build a comparator with <code>comparing</code>, then add tie-breakers with <code>thenComparing</code>. Use primitive-specific methods such as <code>comparingInt</code> when appropriate.',
    `import java.util.Comparator;
import java.util.List;

record Employee(String team, int salary, String name) { }

public class Main {
    public static void main(String[] args) {
        var employees = new java.util.ArrayList<>(List.of(
            new Employee("API", 90, "Mina"),
            new Employee("API", 90, "Ari"),
            new Employee("Web", 95, "Noah")
        ));
        employees.sort(Comparator.comparing(Employee::team)
            .thenComparingInt(Employee::salary)
            .thenComparing(Employee::name));
        employees.forEach(e -> System.out.println(e.team() + " " + e.name()));
    }
}`, 'API Ari\nAPI Mina\nWeb Noah',
    ['compareTo and Comparator.compare should be consistent and transitive.', 'thenComparing provides deterministic tie-breakers.', 'Prefer comparingInt/Long/Double to avoid unnecessary boxing.'],
    'Do not write a comparator by subtracting integers; subtraction can overflow and produce the wrong ordering.');

  add('priorityqueue_internals', 'PriorityQueue internals',
    'PriorityQueue is a heap-based queue that returns the least element according to natural ordering or a Comparator. It does not keep the whole queue sorted during iteration.',
    'A priority queue is useful when the next item should be chosen by priority, such as selecting the next earliest task.',
    'The head is the smallest element by default. Adding or removing an item rearranges the heap to preserve the heap property. Poll repeatedly to retrieve items in priority order.',
    `import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        var jobs = new PriorityQueue<Integer>();
        jobs.add(30);
        jobs.add(10);
        jobs.add(20);
        while (!jobs.isEmpty()) System.out.println(jobs.poll());
    }
}`, '10\n20\n30',
    ['offer/add and poll are O(log n).', 'peek reads the highest-priority item in O(1).', 'Iteration order is not sorted.'],
    'Do not expect iterating over a PriorityQueue to produce sorted order; repeatedly poll when sorted priority order is required.');

  add('iterator_failfast', 'Iterator internals and fail-fast behavior',
    'An Iterator tracks a position while traversing a collection. Some standard collection iterators are fail-fast: they may detect structural modification made outside that iterator and throw ConcurrentModificationException.',
    'Understanding iterator rules helps avoid accidental modification during traversal and distinguishes bug detection from thread safety.',
    'Use the iterator’s own remove method when removing the current element during traversal, or use collection operations such as removeIf. Fail-fast checks are best-effort.',
    `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = new ArrayList<>(List.of(1, 2, 3, 4));
        Iterator<Integer> iterator = values.iterator();
        while (iterator.hasNext()) {
            if (iterator.next() % 2 == 0) iterator.remove();
        }
        System.out.println(values);
    }
}`, '[1, 3]',
    ['Iterator.remove is the supported removal path during iteration when available.', 'ListIterator also supports backward traversal and list updates.', 'Fail-fast is not a synchronization mechanism.'],
    'Do not remove from a collection directly inside its for-each loop. Use the iterator’s remove or a dedicated collection method.');

  add('weakly_consistent', 'Weakly consistent iterators',
    'An iterator over some concurrent collections is weakly consistent. It can proceed while the collection changes and may reflect some, all or none of the concurrent updates made after iteration began.',
    'This behavior lets code traverse concurrent collections without locking the entire collection or throwing ConcurrentModificationException for ordinary concurrent updates.',
    'The collection defines its consistency guarantees. For example, ConcurrentHashMap iterators are weakly consistent and do not provide a snapshot of one exact moment.',
    null, null,
    ['Weak consistency is safe for concurrent traversal but is not a snapshot guarantee.', 'The iterator may observe updates depending on timing.', 'Use synchronization or a snapshot when an exact consistent view is required.'],
    'Do not write a test that expects a weakly consistent iterator to include or exclude a concurrent update at a particular point.',
    note('Concurrent output depends on timing, so this concept is best demonstrated with a small code sketch rather than a fixed expected output.') + JT.h.code(`ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("A", 1);
for (var entry : map.entrySet()) {
    // Another thread may update the map during this traversal.
    System.out.println(entry.getKey() + "=" + entry.getValue());
}`));

  add('collection_complexity', 'Collection time and space complexity',
    'Time complexity describes how the work of an operation grows as a collection grows. Space complexity describes how much extra storage an implementation needs.',
    'Comparing complexity helps choose a data structure for the operations the application performs most often.',
    'State the expected case and assumptions. For example, HashMap lookup is expected O(1) with good hash distribution, while TreeMap lookup is O(log n). An ArrayList insertion near the front shifts later references.',
    null, null,
    ['ArrayList get(index): O(1); middle insert/remove: O(n).', 'HashMap get/put: O(1) average; depends on hash distribution.', 'TreeMap get/put: O(log n); keeps keys sorted.', 'LinkedList get(index): O(n).'],
    'Big-O does not include every constant cost or memory overhead. Measure realistic workloads before choosing based on small theoretical differences.',
    table(['Structure', 'Lookup', 'Insert/remove', 'Extra storage'], [['ArrayList', 'O(1) by index', 'O(n) in middle', 'Backing array'], ['HashMap', 'O(1) average by key', 'O(1) average', 'Buckets and entries'], ['TreeMap', 'O(log n)', 'O(log n)', 'Tree nodes'], ['LinkedList', 'O(n) by index', 'O(1) at known node', 'Node links']]));
})();
