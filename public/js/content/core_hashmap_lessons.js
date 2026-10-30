// Focused lessons for HashMap hashing, buckets, collisions, resizing and lookup.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, note, table } = JT.h;
  function add(id, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def('java_ca_hashmap_internals_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('hash_spreading', 'Hashing and hash spreading',
    'HashMap calls a key’s <code>hashCode()</code> and mixes some of its bits to calculate an internal hash. In OpenJDK’s HashMap implementation, the spread operation is based on <code>h ^ (h &gt;&gt;&gt; 16)</code>.',
    'The table uses a power-of-two length. Mixing high bits into low bits helps those bits affect the bucket index.',
    'HashMap computes the key hash, spreads it, and later masks it with the table length minus one. The exact implementation is a library detail; application code should provide a correct hashCode rather than depend on the spread formula.',
    `public class Main {
    static int spread(int hash) {
        return hash ^ (hash >>> 16);
    }
    public static void main(String[] args) {
        int hash = 0x12340005;
        System.out.printf("%08X%n", spread(hash));
    }
}`, '12341231',
    ['A hash code may use all bits of an integer.', 'Hash spreading is an implementation detail of HashMap.', 'Equal keys must still produce equal hash codes.'],
    'Do not copy a particular JDK’s internal hash formula into application logic. Only the key contract is part of the public Map behavior.');

  add('bucket_index', 'Bucket index calculation',
    'A bucket index selects one slot in HashMap’s internal table. In common OpenJDK implementations, the table size is a power of two and the index is calculated with <code>(capacity - 1) &amp; hash</code>.',
    'The bucket index narrows a lookup to a small part of the table instead of scanning every entry.',
    'For a table of length 16, the mask is binary 1111. AND-ing the spread hash with that mask selects an index from 0 through 15.',
    `public class Main {
    public static void main(String[] args) {
        int capacity = 16;
        int spreadHash = 42;
        int bucket = (capacity - 1) & spreadHash;
        System.out.println("Bucket: " + bucket);
    }
}`, 'Bucket: 10',
    ['The index is within the table bounds.', 'Colliding keys can select the same bucket.', 'The formula describes a common implementation, not a Map API guarantee.'],
    'Do not assume a bucket index remains stable across resize operations or JDK implementations.');

  add('hash_collisions', 'Hash collisions',
    'A hash collision occurs when different keys produce the same bucket index. A collision does not mean the keys are equal.',
    'Hash codes are integers but the set of possible keys is much larger. A map must remain correct even when several keys share a bucket.',
    'HashMap searches entries in the chosen bucket and uses equality to identify a matching key. If no equal key exists, it adds another entry to that bucket.',
    `import java.util.HashMap;
import java.util.Map;

class Item {
    final String name;
    Item(String name) { this.name = name; }
    public int hashCode() { return 7; }
    public boolean equals(Object o) { return o instanceof Item i && name.equals(i.name); }
}

public class Main {
    public static void main(String[] args) {
        Map<Item, Integer> counts = new HashMap<>();
        counts.put(new Item("tea"), 2);
        counts.put(new Item("rice"), 5);
        System.out.println(counts.size());
        System.out.println(counts.get(new Item("rice")));
    }
}`, '2\n5',
    ['Different keys can have the same hash code.', 'equals() distinguishes keys that collide.', 'Good hash functions spread common key values across buckets.'],
    'A collision does not overwrite an existing value unless the new key is equal to the existing key.');

  add('tree_bins', 'Linked-list bins and red-black tree bins',
    'A bucket with collisions can store entries in a list. In modern OpenJDK HashMap implementations, a heavily populated bucket may be converted into a red-black tree when implementation thresholds and table-size conditions are met.',
    'Tree bins reduce lookup work in pathological collision-heavy buckets. They are an implementation defense, not a reason to use a poor hash function.',
    'OpenJDK’s implementation uses thresholds (commonly treeify at 8 entries when table capacity is at least 64, and untreeify at 6) to decide when to change the bucket structure. These values are not part of the HashMap API contract.',
    null, null,
    ['Most buckets remain small lists.', 'Tree conversion has memory and comparison costs.', 'The thresholds are implementation-specific and may vary by JDK version.'],
    'Do not write application logic that assumes a bucket is a list or tree, or relies on a specific threshold.',
    h2('Bucket structure comparison') + table(['Bucket form', 'Lookup behavior', 'Typical use'], [['List bin', 'Checks entries in sequence.', 'Ordinary small collision groups.'], ['Tree bin', 'Uses tree ordering to narrow comparisons.', 'Large collision groups in supported implementations.']]));

  add('capacity_load_factor', 'Capacity, load factor and threshold',
    'Capacity is the table length. The load factor controls how full the table may become before it resizes. The resize threshold is commonly the capacity multiplied by the load factor.',
    'Choosing an initial capacity can reduce repeated resizing when the expected number of entries is known. A very high load factor uses less table space but can increase collisions.',
    'In OpenJDK HashMap, the default load factor is 0.75. The table is lazily allocated in common versions; after allocation, a threshold determines when insertion triggers growth.',
    `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>(32, 0.75f);
        scores.put("Asha", 91);
        scores.put("Ben", 84);
        System.out.println(scores.size());
    }
}`, '2',
    ['Capacity and number of mappings are different quantities.', 'The load factor is a performance and space trade-off.', 'The default load factor is an implementation default, not a requirement for custom Map classes.'],
    'The constructor’s initial capacity is not necessarily the final internal table length immediately; implementation allocation and rounding rules apply.');

  add('hashmap_resize', 'Resizing and entry redistribution',
    'HashMap resizes its internal table when its size passes the threshold. It allocates a larger table and redistributes existing entries into buckets for the new capacity.',
    'Resizing keeps buckets from growing too large as the map grows, preserving expected fast lookup for well-distributed keys.',
    'When capacity doubles in OpenJDK implementations, an entry often stays at its old index or moves by the old capacity, based on one hash bit. The table is rebuilt as needed; exact mechanics are implementation details.',
    `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> names = new HashMap<>();
        for (int i = 1; i <= 20; i++) names.put(i, "item-" + i);
        System.out.println("Entries: " + names.size());
        System.out.println("Lookup: " + names.get(12));
    }
}`, 'Entries: 20\nLookup: item-12',
    ['Resizing preserves mappings.', 'Resizing costs time because entries must be redistributed.', 'An appropriate initial capacity can reduce resize work when the expected size is known.'],
    'Do not rely on iteration order staying the same after a resize. HashMap does not promise an iteration order.');

  add('put_get_flow', 'put() and get() internal flow',
    '<code>put(key, value)</code> stores or replaces the value associated with an equal key. <code>get(key)</code> returns the mapped value or null when no matching mapping exists.',
    'Understanding the lookup flow explains why hashCode and equals must agree and why mutating a key can make it hard to find.',
    'The map spreads the key hash, calculates a bucket, checks entries in that bucket, then updates an equal key or adds a new entry. A get follows the same search and returns the matching value.',
    `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("pen", 4);
        inventory.put("pen", 6);
        System.out.println(inventory.get("pen"));
        System.out.println(inventory.containsKey("book"));
    }
}`, '6\nfalse',
    ['Putting an equal key replaces its mapping rather than adding a duplicate key.', 'get() returning null can mean there is no mapping or that null is mapped.', 'Use containsKey() when that distinction matters.'],
    'Do not use get(key) alone to distinguish a missing key from a key mapped to null.');

  add('hashmap_complexity', 'HashMap time complexity',
    'HashMap get and put operations are expected to take constant time when hashes are well distributed. Their worst-case cost can be higher because of collisions and other implementation details.',
    'Complexity helps compare data structures and predict how an operation may scale as the number of mappings grows.',
    'A lookup computes a hash and checks one bucket. With short buckets, work stays small on average. Poor or adversarial hashes can increase the amount of work.',
    null, null,
    ['Average expected get and put are O(1) under suitable hash distribution.', 'Iteration over a HashMap depends on table capacity plus size in common implementations.', 'Complexity claims should state their assumptions.'],
    'Do not describe HashMap operations as guaranteed O(1) in every case.',
    table(['Operation', 'Expected cost', 'Important caveat'], [['get / put', 'O(1) average', 'Depends on hash distribution and resizing.'], ['containsKey', 'O(1) average', 'Performs a key lookup.'], ['Iteration', 'O(capacity + size)', 'A sparse oversized table may cost more to traverse.']]));

  const challengeSlug = 'java_ca_hashmap_internals_hashmap_exercise';
  const challenge = {
    intro: '',
    task: '<p>Complete a small integer-key map using separate chaining. Store each key-value pair in a bucket list. <code>put</code> should add or replace a key, and <code>get</code> should return the value or <code>null</code>.</p>',
    expected: 'one\ntwo\nnull',
    starter: `import java.util.ArrayList;
import java.util.List;

class Entry {
    int key;
    String value;
    Entry next;
    Entry(int key, String value, Entry next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class IntMap {
    private final Entry[] buckets = new Entry[4];

    void put(int key, String value) {
        // TODO: find the bucket, replace an existing key, or add an entry
    }

    String get(int key) {
        // TODO: search the bucket and return the matching value
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        IntMap map = new IntMap();
        map.put(1, "one");
        map.put(5, "two"); // Same bucket as key 1 when capacity is 4
        System.out.println(map.get(1));
        System.out.println(map.get(5));
        System.out.println(map.get(9));
    }
}`,
    hint: 'Use <code>key % buckets.length</code> as the bucket index. Walk the linked list and compare the integer key before adding a new Entry.',
  };
  const exercisePage = JT.pages[challengeSlug];
  if (exercisePage) {
    exercisePage.title = 'HashMap implementation coding exercise';
    exercisePage.h1 = 'Java <span>HashMap implementation coding exercise</span>';
    exercisePage.body = () => [
      h2('What will you build?'),
      p('Implement a small integer-key map using an array of buckets. Each bucket holds a linked list of entries, so different keys that map to the same bucket can both be stored.'),
      h2('Why build a small map?'),
      p('Writing a small version makes the core ideas concrete: calculate a bucket, search for an equal key, update or add an entry, and handle collisions.'),
      h2('How to solve it'),
      JT.h.ol([
        'Calculate the bucket index with <code>key % buckets.length</code>.',
        'Walk the linked list at that index.',
        'If the key already exists, replace its value.',
        'Otherwise, add a new Entry to the bucket chain.',
        'In <code>get</code>, search the same chain and return null when no key matches.',
      ]),
      note('This exercise is intentionally small: it teaches collision handling, but it does not include resizing, generic keys, null-key support or production safeguards.'),
    ].join('');
    exercisePage.challenge = challenge;
  }
})();
