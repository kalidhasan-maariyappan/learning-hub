// Focused lessons for generic type safety and the Java type system.
(function () {
  'use strict';
  const JT = window.JT;
  
  function add(id, title, what, why, how, code, output, points, mistake, extra = '') {
    JT.def('java_ca_generics_internals_' + id, { title, h1: 'Java <span>' + title + '</span>', body: () => JT.kit.coreLesson({ title, what, why, how, code, output, points, mistake, extra }) });
  }

  add('generic_classes_methods', 'Generic classes and methods at an advanced level',
    'A generic class or method declares type parameters so the compiler can check that related inputs and outputs use compatible types.',
    'Generics let one implementation work with many types without losing compile-time type checking or requiring callers to cast every result.',
    'A class declares parameters after its name, such as <code>Box&lt;T&gt;</code>. A generic method declares its own parameters before its return type, such as <code>&lt;T&gt; T first(...)</code>.',
    `import java.util.List;

class Box<T> {
    private final T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

public class Main {
    static <T> T first(List<T> items) { return items.get(0); }
    public static void main(String[] args) {
        Box<String> box = new Box<>("Java");
        System.out.println(first(List.of(box.get(), "types")));
    }
}`, 'Java',
    ['Type parameters express relationships between arguments and results.', 'The compiler can infer many type arguments.', 'Generics work with reference types; use wrapper classes for primitives.'],
    'A generic type such as List<int> is invalid. Use List<Integer>; Java boxes primitive values when needed.');

  add('bounded_types', 'Bounded type parameters',
    'A bounded type parameter restricts which types can be used for a generic variable. An upper bound such as <code>&lt;T extends Number&gt;</code> requires T to be Number or a subtype.',
    'Bounds let generic code safely use methods provided by the required supertype or interface.',
    'The compiler checks the bound at each use. Multiple interface bounds are written with ampersands, such as <code>&lt;T extends Number &amp; Comparable&lt;T&gt;&gt;</code>.',
    `public class Main {
    static <T extends Number> double twice(T value) {
        return value.doubleValue() * 2;
    }
    public static void main(String[] args) {
        System.out.println(twice(4));
        System.out.println(twice(2.5));
    }
}`, '8.0\n5.0',
    ['Use extends for both class and interface bounds.', 'A type parameter can have one class bound and multiple interface bounds.', 'Bounds document the capabilities generic code needs.'],
    'A bound does not make a type covariant. List<Integer> is still not a subtype of List<Number>.');

  add('wildcards_pecs', 'Wildcards and PECS',
    'A wildcard type argument, written <code>?</code>, represents an unknown type. A bounded wildcard describes a safe relationship: <code>? extends T</code> produces T values, while <code>? super T</code> accepts T values.',
    'Wildcards make APIs flexible without pretending that Java generic types are covariant. PECS means Producer Extends, Consumer Super.',
    'Read from a producer declared as <code>List&lt;? extends Number&gt;</code>. Add Integer values to a consumer declared as <code>List&lt;? super Integer&gt;</code>.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    static void copy(List<? extends Number> source,
                     List<? super Number> target) {
        for (Number value : source) target.add(value);
    }
    public static void main(String[] args) {
        List<Integer> source = List.of(3, 8);
        List<Number> target = new ArrayList<>();
        copy(source, target);
        System.out.println(target);
    }
}`, '[3, 8]',
    ['An extends wildcard is safe to read as its upper bound.', 'A super wildcard is safe to write values of its lower bound.', 'An unbounded wildcard is useful when the exact element type does not matter.'],
    'Do not add a Number to a List<? extends Number>; the actual list might be a List<Integer>.');

  add('type_erasure', 'Type erasure',
    'Type erasure is the compiler’s translation of generic types into bytecode compatible with Java’s erased runtime type model. Most type arguments are not present as distinct runtime classes.',
    'Erasure preserves compatibility with older Java bytecode and explains limitations such as generic type tests and overloads that differ only by type argument.',
    'The compiler replaces type parameters with their bounds (or Object), inserts casts where needed, and may generate bridge methods to preserve polymorphism.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Asha");
        String name = names.get(0); // Compiler inserts a cast after erasure.
        System.out.println(name);
    }
}`, 'Asha',
    ['Generic checks happen at compile time.', 'Most parameterized types share the same runtime class.', 'Generic type arguments cannot usually be checked with instanceof.'],
    'Do not expect <code>new T()</code> or <code>value instanceof List&lt;String&gt;</code> to work; the runtime does not know the erased type argument.');

  add('bridge_methods', 'Bridge methods',
    'A bridge method is a compiler-generated method that preserves overriding behavior after generic type erasure or covariant return types.',
    'Without bridge methods, a method that overrides a generic parent method could have a different erased signature and polymorphic calls could fail.',
    'The compiler emits a method with the erased signature and forwards it to the specialized implementation. Reflection can identify such methods with <code>Method.isBridge()</code>.',
    `import java.lang.reflect.Method;

interface Box<T> { T get(); }
class StringBox implements Box<String> {
    public String get() { return "value"; }
}

public class Main {
    public static void main(String[] args) {
        boolean hasBridge = false;
        for (Method method : StringBox.class.getDeclaredMethods()) {
            hasBridge |= method.isBridge();
        }
        System.out.println("Bridge method generated: " + hasBridge);
    }
}`, 'Bridge method generated: true',
    ['Bridge methods are generated by the compiler.', 'They preserve dispatch across erased signatures.', 'Most application code should not call bridge methods directly.'],
    'A bridge method is not an extra method you should write by hand. The compiler creates it to preserve language semantics.');

  add('heap_pollution', 'Heap pollution and generic varargs',
    'Heap pollution occurs when a variable with a parameterized type refers to an object that does not match that type. Unsafe raw types and generic varargs can create it.',
    'Heap pollution can bypass compile-time checks and cause a ClassCastException later, far from the code that introduced the bad value.',
    'A generic varargs parameter is represented as an array. Because arrays retain their component type at runtime while generic type arguments are erased, mixing the two can be unsafe. Use <code>@SafeVarargs</code> only when the implementation truly respects the promise.',
    `import java.util.List;

public class Main {
    @SafeVarargs
    static <T> List<T> asList(T... values) {
        return List.of(values);
    }
    public static void main(String[] args) {
        System.out.println(asList("red", "blue"));
    }
}`, '[red, blue]',
    ['Warnings about unchecked operations point to lost type-safety guarantees.', 'Do not store a generic varargs array where callers can corrupt it.', '@SafeVarargs is a promise that the method does not perform unsafe operations.'],
    'Do not add @SafeVarargs just to silence a warning. First prove that the method cannot expose or misuse the varargs array.');

  add('raw_types', 'Raw types and unchecked warnings',
    'A raw type uses a generic class without its type argument, such as <code>List</code> instead of <code>List&lt;String&gt;</code>. Raw types remain for compatibility with pre-generics Java code.',
    'Legacy APIs may still expose raw types, but new code should preserve type information so the compiler can catch invalid values early.',
    'A raw reference can accept values of unrelated types. A later typed read may insert a cast that fails at runtime.',
    `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List raw = new ArrayList();
        raw.add("text");
        Object value = raw.get(0);
        System.out.println(value);
    }
}`, 'text',
    ['Raw types trigger unchecked warnings because type checking is weakened.', 'Prefer parameterized types at API boundaries.', 'When forced to call a legacy API, contain and validate the unchecked conversion.'],
    'Do not treat an unchecked warning as harmless noise. It points to a place where the compiler cannot guarantee the declared type.');

  add('generic_creation_limits', 'Why Java cannot create new T() or generic arrays',
    'Java cannot normally instantiate a type parameter with <code>new T()</code> or create an array of T because type arguments are erased and the runtime does not know which concrete type T represents.',
    'Understanding this limit helps design generic factories and APIs without unsafe casts or hidden runtime type assumptions.',
    'Pass a constructor function such as Supplier&lt;T&gt; when code needs to create a T. Pass an array factory such as IntFunction&lt;T[]&gt; when a caller needs a typed array.',
    `import java.util.function.IntFunction;

public class Main {
    static <T> T[] makeArray(IntFunction<T[]> factory, int size) {
        return factory.apply(size);
    }
    public static void main(String[] args) {
        String[] names = makeArray(String[]::new, 2);
        names[0] = "Asha";
        System.out.println(names.length + ": " + names[0]);
    }
}`, '2: Asha',
    ['Use Supplier<T> to provide object construction behavior.', 'Use an array factory when the runtime component type is needed.', 'Avoid unchecked generic array creation.'],
    'Do not create Object[] and cast it to T[]; the runtime array type may not match and can fail with ClassCastException.');
})();
