// Focused lessons on Java object identity, equality, copying and immutability.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, table } = JT.h;
  function add(slug, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def(slug, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('java_ca_object_internals_identity_equality', 'Object identity vs logical equality',
    'Object identity asks whether two references point to the exact same object. Logical equality asks whether two objects represent the same value according to their class’s equality rule.',
    'Choose the right comparison for the question you are asking. Identity is useful when you need to know whether state is shared; logical equality is useful for values such as names, dates or identifiers.',
    '<code>==</code> compares primitive values, but for object references it tests identity. <code>equals()</code> can compare object contents when the class overrides it.',
    `public class Main {
    public static void main(String[] args) {
        String first = new String("Java");
        String second = new String("Java");
        System.out.println(first == second);
        System.out.println(first.equals(second));
    }
}`, 'false\ntrue',
    ['Use <code>==</code> to compare object identity.', 'Use a well-defined <code>equals()</code> implementation to compare logical values.', 'Do not use <code>==</code> to compare String contents.'],
    'Two references can point to different objects with equal values. Conversely, two references to one object are always identical, even if that class inherits Object’s default equals method.');

  add('java_ca_object_internals_equals_hashcode', 'equals() and hashCode() contract',
    'The <code>equals()</code> method defines logical equality. The <code>hashCode()</code> method supplies an integer used by hash-based collections to find a likely bucket.',
    'HashMap and HashSet need both methods to find equal keys reliably. If a class changes equals but leaves an incompatible hashCode, lookups can fail.',
    'When two objects are equal according to equals, they must return the same hash code. Unequal objects may still have the same hash code, so a collection checks equality after hashing.',
    `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

record UserId(String value) { }

public class Main {
    public static void main(String[] args) {
        Set<UserId> ids = new HashSet<>();
        ids.add(new UserId("u-17"));
        System.out.println(ids.contains(new UserId("u-17")));
    }
}`, 'true',
    ['Equal objects must have equal hash codes.', 'Hash collisions are allowed; hash codes do not prove equality.', 'Records generate equals and hashCode from their components.'],
    'Do not implement equals without a compatible hashCode. A HashSet may then store values that appear equal but search in different buckets.');

  add('java_ca_object_internals_mutable_hashmap_keys', 'HashMap mutable-key problems',
    'A mutable key is an object whose equality or hash-relevant fields can change after it is inserted into a HashMap.',
    'HashMap chooses a bucket when a key is inserted. If the key later reports a different hash code, a lookup can search the new bucket while the entry remains in its old bucket.',
    'Keep key equality state immutable. If a key must change, remove it before changing that state and insert it again afterward.',
    `import java.util.HashMap;
import java.util.Map;

class Key {
    int id;
    Key(int id) { this.id = id; }
    public int hashCode() { return id; }
    public boolean equals(Object other) {
        return other instanceof Key key && id == key.id;
    }
}

public class Main {
    public static void main(String[] args) {
        Key key = new Key(1);
        Map<Key, String> map = new HashMap<>();
        map.put(key, "saved");
        key.id = 2;
        System.out.println(map.get(key));
    }
}`, 'null',
    ['Hash-based collections do not relocate an entry when a key changes.', 'Use immutable key fields such as record components.', 'A failed lookup does not mean the entry was removed.'],
    'Do not change fields used by equals() or hashCode() while the object is a map key. The entry can become effectively unreachable through normal lookup.');

  add('java_ca_object_internals_object_cloning', 'Object cloning and copy strategies',
    'Copying creates another object with some or all of an original object’s state. Java offers mechanisms such as copy constructors and factory methods; Object.clone is a legacy mechanism that performs a field-by-field shallow copy.',
    'Copying is useful when a caller needs an independent value it can change without altering the original.',
    'A copy constructor or named factory makes the copied fields and copy depth explicit. Cloneable and Object.clone have special rules and do not automatically clone nested objects.',
    `class Point {
    final int x;
    final int y;
    Point(int x, int y) { this.x = x; this.y = y; }
    Point(Point source) { this(source.x, source.y); }
}

public class Main {
    public static void main(String[] args) {
        Point original = new Point(3, 4);
        Point copy = new Point(original);
        System.out.println(original != copy);
        System.out.println(original.x == copy.x && original.y == copy.y);
    }
}`, 'true\ntrue',
    ['Prefer explicit copy constructors or factories for ordinary application classes.', 'Decide whether nested mutable values should be shared or copied.', 'Object.clone does not automatically make a deep copy.'],
    'Implementing Cloneable alone does not add a public clone method or recursively copy referenced objects. Document the copy behavior clearly.');

  add('java_ca_object_internals_shallow_deep_copy', 'Shallow copy vs deep copy',
    'A shallow copy duplicates the outer object but shares references to nested objects. A deep copy also creates independent copies of the mutable objects inside it.',
    'The distinction matters when callers expect to edit a copy independently. A shallow copy may still expose changes through both objects.',
    'For a shallow copy, fields are copied as-is. For a deep copy, copy each mutable nested value according to its own copy rules. Immutable values can safely be shared.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> original = new ArrayList<>(List.of("red"));
        List<String> shallow = original;
        List<String> independent = new ArrayList<>(original);
        shallow.add("blue");
        System.out.println(original);
        System.out.println(independent);
    }
}`, '[red, blue]\n[red]',
    ['Copying a reference does not copy the referenced object.', 'A collection copy constructor copies the collection structure, not mutable elements recursively.', 'Deep copy behavior should be designed for the object graph, not guessed.'],
    'A new outer collection is not automatically a deep copy. Its mutable elements may still be shared with the source.');

  add('java_ca_object_internals_immutability_copying', 'Immutability and defensive copying',
    'An immutable object cannot be observably changed after construction. Defensive copying prevents outside code from changing a mutable value that an object stores or returns.',
    'Immutable values are easier to share between threads, use as map keys and reason about because their state does not change unexpectedly.',
    'Make fields private and final, validate constructor inputs, avoid mutators, and copy mutable inputs or outputs. For collections, <code>List.copyOf</code> creates an unmodifiable copy of the collection structure.',
    `import java.util.List;

final class Team {
    private final List<String> members;
    Team(List<String> members) { this.members = List.copyOf(members); }
    List<String> members() { return members; }
}

public class Main {
    public static void main(String[] args) {
        var source = new java.util.ArrayList<>(List.of("Asha"));
        Team team = new Team(source);
        source.add("Ben");
        System.out.println(team.members());
    }
}`, '[Asha]',
    ['Final fields prevent reassignment, but do not make referenced objects immutable.', 'Copy mutable inputs before storing them.', 'An unmodifiable collection view and an immutable copy are different things.'],
    'Declaring a collection field final does not stop callers from mutating the collection. A final reference cannot be reassigned, but its object may still be mutable.');

  add('java_ca_object_internals_object_layout', 'Object layout and memory considerations',
    'An object’s memory layout is the JVM-specific arrangement of object headers, fields, alignment and padding. The Java language does not promise an exact byte size or field order for ordinary objects.',
    'Layout matters when a program creates very large numbers of objects, but estimates should come from measurements on the target JVM rather than assumptions about source fields.',
    'The JVM implementation chooses object representation. Field types, compressed references, alignment, VM flags and runtime version can all affect measured size.',
    null, null,
    ['The Java specification does not define the exact in-memory size of an object.', 'Use a profiler or a dedicated object-layout tool when measurement is needed.', 'Reducing allocations or using suitable data structures can matter more than rearranging fields.'],
    'Do not claim that an object occupies a fixed number of bytes based only on its Java fields. The answer varies by JVM and configuration.',
    h2('Comparison: language guarantees and implementation details') + table(['Question', 'Java guarantee?'], [['Can code access an object through a reference?', 'Yes, through Java language semantics.'], ['Is an object header exactly a fixed size?', 'No; this is JVM implementation-specific.'], ['Can a profiler measure a particular runtime?', 'Yes; interpret results for that JVM and configuration.']]));
})();
