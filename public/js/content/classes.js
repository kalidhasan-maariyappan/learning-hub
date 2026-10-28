// Lessons: object-oriented programming — classes, objects, constructors, modifiers, encapsulation,
// packages, inheritance, interfaces, enums, user input and dates.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, note, code, syn, table, ex } = JT.h;

  JT.def('java_oop', {
    body: () => [
      h2('What is OOP?'),
      p('Object-oriented programming (OOP) organises a program around <b>objects</b>: bundles of data together with the code that works on that data. Procedural code is a list of steps; OOP code is a set of cooperating objects.'),
      p('A <b>class</b> is a blueprint and an <b>object</b> is one thing built from it. <code>Recipe</code> could be a class; "Grandma\'s lentil soup" and "Quick pancakes" are objects of that class.'),
      table(['Class', 'Possible objects'], [
        ['<code>Planet</code>', 'Earth, Mars, Jupiter'],
        ['<code>BankAccount</code>', 'Asha\'s savings, Tomás\'s current account'],
        ['<code>Song</code>', '"Clair de Lune", "Bohemian Rhapsody"'],
      ]),
      h2('Why use it?'),
      ul([
        'Code that belongs together stays together, so programs are easier to read and change.',
        'A class is written once and reused for as many objects as you need.',
        'Details can be hidden behind methods, so other code cannot put an object into a broken state.',
        'New classes can build on existing ones (inheritance) instead of copying code.',
      ]),
      p('Every Java program you have written so far already lived inside a class called <code>Main</code>. The next pages show how to write classes of your own.'),
      ex(`
        class Planet {
            String name;
            int moons;
        }

        public class Main {
            public static void main(String[] args) {
                Planet earth = new Planet();
                earth.name = "Earth";
                earth.moons = 1;

                Planet mars = new Planet();
                mars.name = "Mars";
                mars.moons = 2;

                System.out.println(earth.name + " has " + earth.moons + " moon");
                System.out.println(mars.name + " has " + mars.moons + " moons");
            }
        }`, { desc: 'One class, two independent objects.' }),
    ].join(''),
    exercise: { q: 'Fill in the words: a ___ is a blueprint, an ___ is built from it.', code: 'A ___ is a blueprint.\nAn ___ is one thing built from it.', options: ['class', 'object', 'method', 'package'], answer: ['class', 'object'] },
  });

  JT.def('java_classes', {
    body: () => [
      h2('Create a class'),
      p('Declare a class with the <code>class</code> keyword followed by a name that starts with a capital letter.'),
      syn(`class ClassName {\n    // attributes and methods\n}`),
      h2('Create an object'),
      p('Use <code>new</code> to build an object from the class. The variable holds a <b>reference</b> to the new object.'),
      ex(`
        class Lamp {
            boolean on = false;
        }

        public class Main {
            public static void main(String[] args) {
                Lamp desk = new Lamp();
                Lamp hall = new Lamp();
                hall.on = true;
                System.out.println("desk: " + desk.on);
                System.out.println("hall: " + hall.on);
            }
        }`),
      h2('Several classes in one program'),
      p('A source file may contain many classes, but only one may be <code>public</code>, and its name must match the file name. In this tutorial that public class is always <code>Main</code>. In bigger projects each class usually lives in its own file (<code>Lamp.java</code>, <code>Main.java</code>) and they are compiled together.'),
      note('Two variables can refer to the <b>same</b> object. Changing it through one variable is visible through the other.'),
      ex(`
        class Lamp {
            boolean on = false;
        }

        public class Main {
            public static void main(String[] args) {
                Lamp a = new Lamp();
                Lamp b = a;          // same object, second name
                b.on = true;
                System.out.println(a.on);
            }
        }`, { title: 'Shared reference' }),
    ].join(''),
    exercise: { q: 'Create an object of class <code>Car</code> called <code>myCar</code>.', code: 'Car myCar = ___ Car();', options: ['new', 'create', 'object', 'make'], answer: ['new'] },
  });

  JT.def('java_class_attributes', {
    body: () => [
      h2('Attributes'),
      p('Variables declared inside a class (but outside any method) are called <b>attributes</b> or <b>fields</b>. Every object gets its own copy. Read and write them with dot notation: <code>object.attribute</code>.'),
      ex(`
        class Book {
            String title;
            int pages = 100;   // default value
        }

        public class Main {
            public static void main(String[] args) {
                Book b = new Book();
                b.title = "The Little Prince";
                System.out.println(b.title + ": " + b.pages + " pages");
                b.pages = 96;  // overwrite
                System.out.println(b.title + ": " + b.pages + " pages");
            }
        }`),
      h2('Default values'),
      p('Fields you do not initialise get a default: <code>0</code> for numbers, <code>false</code> for <code>boolean</code>, <code>\'\\u0000\'</code> for <code>char</code> and <code>null</code> for objects such as <code>String</code>. Local variables inside methods get no default and must be assigned before use.'),
      ex(`
        class Defaults {
            int count;
            double price;
            boolean active;
            String label;
        }

        public class Main {
            public static void main(String[] args) {
                Defaults d = new Defaults();
                System.out.println(d.count + " " + d.price + " " + d.active + " " + d.label);
            }
        }`),
      h2('Final attributes'),
      p('Mark a field <code>final</code> when it must never change after it is set.'),
      ex(`
        class Circle {
            final double PI_APPROX = 3.14;
        }

        public class Main {
            public static void main(String[] args) {
                Circle c = new Circle();
                // c.PI_APPROX = 3; // would not compile
                System.out.println(c.PI_APPROX);
            }
        }`),
    ].join(''),
    exercise: { q: 'Print the <code>title</code> attribute of the object <code>b</code>.', code: 'System.out.println(___);', options: ['b.title', 'b->title', 'title.b', 'b[title]'], answer: ['b.title'] },
  });

  JT.def('java_class_methods', {
    body: () => [
      h2('Methods inside a class'),
      p('Methods describe what an object can <b>do</b>. A method without <code>static</code> is an <b>instance method</b>: it needs an object and can use that object\'s attributes directly.'),
      ex(`
        class Counter {
            int value = 0;

            void increment() {
                value++;
            }

            void show() {
                System.out.println("Count: " + value);
            }
        }

        public class Main {
            public static void main(String[] args) {
                Counter clicks = new Counter();
                clicks.increment();
                clicks.increment();
                clicks.increment();
                clicks.show();
            }
        }`),
      h2('static vs. instance'),
      p('A <code>static</code> method belongs to the class itself and is called through the class name. It cannot use instance attributes because there is no particular object.'),
      ex(`
        class Temperature {
            double celsius;

            static double toFahrenheit(double c) {
                return c * 9 / 5 + 32;
            }

            void describe() {
                System.out.println(celsius + " °C = " + toFahrenheit(celsius) + " °F");
            }
        }

        public class Main {
            public static void main(String[] args) {
                System.out.println(Temperature.toFahrenheit(100)); // no object needed
                Temperature today = new Temperature();
                today.celsius = 21.5;
                today.describe();                                 // needs an object
            }
        }`),
      note('Rule of thumb: if a method uses the object\'s data, make it an instance method; if it only uses its parameters, it can be <code>static</code>.'),
    ].join(''),
    exercise: { q: 'Call the instance method <code>increment</code> on the object <code>clicks</code>.', code: '___;', options: ['clicks.increment()', 'Counter.increment()', 'increment(clicks)', 'clicks.increment'], answer: ['clicks.increment()'] },
  });

  JT.challenge('class', {
    intro: p('Put classes, attributes and methods together.'),
    task: p('Complete the class <code>Rectangle</code> with two <code>int</code> attributes <code>width</code> and <code>height</code> and an instance method <code>area()</code> that returns <code>width * height</code>. In <code>main</code>, create a rectangle 7 by 3 and print <code>Area: 21</code>.'),
    starter: `
      class Rectangle {
          // attributes and area() here
      }

      public class Main {
          public static void main(String[] args) {

          }
      }`,
    expected: 'Area: 21',
    hint: 'Create the object with <code>new Rectangle()</code>, set both attributes, then print <code>"Area: " + r.area()</code>.',
  });

  JT.def('java_constructors', {
    body: () => [
      h2('What is a constructor?'),
      p('A constructor is a special method that runs when an object is created with <code>new</code>. It has the <b>same name as the class</b> and <b>no return type</b>. Use it to give the object a valid starting state.'),
      ex(`
        class Player {
            String name;
            int level;

            Player(String startName) {
                name = startName;
                level = 1;
            }
        }

        public class Main {
            public static void main(String[] args) {
                Player p = new Player("Kenji");
                System.out.println(p.name + " starts at level " + p.level);
            }
        }`),
      h2('Several constructors'),
      p('Constructors can be overloaded just like methods. If you write no constructor at all, Java supplies an empty, parameterless one. As soon as you write any constructor, that default disappears.'),
      ex(`
        class Ticket {
            String film;
            int seat;

            Ticket(String film, int seat) {
                this.film = film;
                this.seat = seat;
            }

            Ticket(String film) {
                this(film, 0);       // call the other constructor; 0 = unassigned
            }
        }

        public class Main {
            public static void main(String[] args) {
                Ticket a = new Ticket("Spirited Away", 14);
                Ticket b = new Ticket("Spirited Away");
                System.out.println(a.film + " seat " + a.seat);
                System.out.println(b.film + " seat " + b.seat);
            }
        }`),
      ex(`
        class Point {
            int x, y;
            Point(int x, int y) { this.x = x; this.y = y; }
        }

        public class Main {
            public static void main(String[] args) {
                Point p = new Point(); // error: no parameterless constructor
            }
        }`, { title: 'Missing default constructor', desc: 'This example fails to compile on purpose.' }),
    ].join(''),
    exercise: { q: 'Complete the constructor of class <code>Dog</code>.', code: 'class Dog {\n    String name;\n    ___(String n) {\n        name = n;\n    }\n}', options: ['Dog', 'void Dog', 'constructor', 'new'], answer: ['Dog'] },
  });

  JT.def('java_this', {
    body: () => [
      h2('The this keyword'),
      p('Inside an instance method or constructor, <code>this</code> refers to the current object. It is most often used when a parameter has the same name as an attribute: <code>this.name</code> is the attribute, plain <code>name</code> is the parameter.'),
      ex(`
        class City {
            String name;
            int population;

            City(String name, int population) {
                this.name = name;
                this.population = population;
            }
        }

        public class Main {
            public static void main(String[] args) {
                City c = new City("Nairobi", 4397073);
                System.out.println(c.name + ": " + c.population);
            }
        }`),
      p('Forgetting <code>this</code> is a classic bug: <code>name = name;</code> just assigns the parameter to itself and the attribute stays <code>null</code>.'),
      ex(`
        class City {
            String name;
            City(String name) {
                name = name;   // bug: assigns the parameter to itself
            }
        }

        public class Main {
            public static void main(String[] args) {
                System.out.println(new City("Oslo").name);
            }
        }`, { title: 'The bug' }),
      h2('Other uses'),
      ul([
        '<code>this(...)</code> calls another constructor of the same class (it must be the first statement).',
        'Pass <code>this</code> to another method to hand over the current object.',
        'Return <code>this</code> to allow method chaining.',
      ]),
      ex(`
        class Order {
            StringBuilder items = new StringBuilder();

            Order add(String item) {
                items.append(item).append(" ");
                return this;   // allows chaining
            }
        }

        public class Main {
            public static void main(String[] args) {
                Order o = new Order().add("tea").add("scone").add("jam");
                System.out.println(o.items.toString().trim());
            }
        }`, { title: 'Method chaining' }),
    ].join(''),
    exercise: { q: 'Assign the parameter to the attribute with the same name.', code: 'Car(String model) {\n    ___ = model;\n}', options: ['this.model', 'model', 'Car.model', 'self.model'], answer: ['this.model'] },
  });

  JT.def('java_modifiers', {
    body: () => [
      h2('Access modifiers'),
      p('Access modifiers control <b>who</b> can see a class, attribute, method or constructor.'),
      table(['Modifier', 'Visible in'], [
        ['<code>public</code>', 'every class, everywhere'],
        ['<code>protected</code>', 'the same package and subclasses'],
        ['<i>(none)</i> — package-private', 'the same package only'],
        ['<code>private</code>', 'the same class only'],
      ]),
      p('Top-level classes may only be <code>public</code> or package-private. Members (attributes, methods, constructors, nested classes) may use all four.'),
      ex(`
        class Safe {
            private int code = 4821;
            public String label = "Office safe";

            public boolean tryCode(int guess) {
                return guess == code;   // private is fine inside the class
            }
        }

        public class Main {
            public static void main(String[] args) {
                Safe s = new Safe();
                System.out.println(s.label);
                System.out.println(s.tryCode(1111));
                System.out.println(s.tryCode(4821));
                // System.out.println(s.code); // error: code has private access
            }
        }`),
      note('Start with the most restrictive modifier that works (usually <code>private</code> for attributes) and open things up only when needed.'),
    ].join(''),
    exercise: { q: 'Make the attribute visible only inside its own class.', code: '___ double balance;', options: ['private', 'public', 'protected', 'static'], answer: ['private'] },
  });

  JT.def('java_non_modifiers', {
    body: () => [
      h2('Non-access modifiers'),
      p('These modifiers change <b>how</b> something behaves rather than who can see it.'),
      table(['Modifier', 'Used on', 'Meaning'], [
        ['<code>final</code>', 'class / method / variable', 'class cannot be extended; method cannot be overridden; variable cannot be reassigned'],
        ['<code>static</code>', 'attribute / method / nested class', 'belongs to the class instead of each object'],
        ['<code>abstract</code>', 'class / method', 'class cannot be instantiated; method has no body and must be implemented by a subclass'],
        ['<code>transient</code>', 'attribute', 'skipped when the object is serialized'],
        ['<code>synchronized</code>', 'method / block', 'only one thread at a time may run it'],
        ['<code>volatile</code>', 'attribute', 'always read from main memory, so all threads see the latest value'],
      ]),
      h2('static attributes'),
      p('A <code>static</code> attribute is shared by all objects. A classic use is counting how many objects were created.'),
      ex(`
        class Visitor {
            static int total = 0;   // shared
            String name;            // per object

            Visitor(String name) {
                this.name = name;
                total++;
            }
        }

        public class Main {
            public static void main(String[] args) {
                new Visitor("Ana");
                new Visitor("Bilal");
                new Visitor("Chen");
                System.out.println("Visitors today: " + Visitor.total);
            }
        }`),
      h2('final'),
      ex(`
        final class Config {                     // cannot be extended
            static final int MAX_USERS = 50;     // a constant
        }

        public class Main {
            public static void main(String[] args) {
                final int limit = Config.MAX_USERS;
                System.out.println("Limit: " + limit);
                // limit = 60;  // error: cannot assign a value to final variable
            }
        }`),
      p('<code>abstract</code> is covered on the <a href="' + JT.url('java_abstract') + '">Abstraction</a> page and <code>synchronized</code>/<code>volatile</code> on the <a href="' + JT.url('java_threads') + '">Threads</a> page.'),
    ].join(''),
    exercise: { q: 'Declare a constant shared by the whole class.', code: '___ ___ int MAX_SPEED = 120;', options: ['static', 'final', 'private', 'void'], answer: ['static', 'final'] },
  });

  JT.def('java_encapsulation', {
    body: () => [
      h2('Encapsulation'),
      p('Encapsulation means hiding an object\'s data and allowing access only through methods. You make attributes <code>private</code> and offer public <b>getters</b> (read) and <b>setters</b> (write). The setter can reject invalid values, so the object always stays valid.'),
      ex(`
        class Thermostat {
            private double target = 20.0;

            public double getTarget() {
                return target;
            }

            public void setTarget(double value) {
                if (value < 5 || value > 30) {
                    System.out.println("Rejected: " + value);
                    return;
                }
                target = value;
            }
        }

        public class Main {
            public static void main(String[] args) {
                Thermostat t = new Thermostat();
                t.setTarget(22.5);
                t.setTarget(80);
                System.out.println("Target: " + t.getTarget());
            }
        }`),
      h2('Read-only properties'),
      p('Provide only a getter to make a value read-only from outside.'),
      ex(`
        class Account {
            private final String owner;
            private double balance;

            Account(String owner) { this.owner = owner; }

            public String getOwner() { return owner; }
            public double getBalance() { return balance; }

            public void deposit(double amount) {
                if (amount > 0) balance += amount;
            }
        }

        public class Main {
            public static void main(String[] args) {
                Account acc = new Account("Leila");
                acc.deposit(150);
                acc.deposit(-40);   // ignored
                System.out.println(acc.getOwner() + ": " + acc.getBalance());
            }
        }`),
      ul([
        'Callers cannot break the rules you enforce in setters.',
        'You can change the internal representation later without changing code that uses the class.',
        'Getter and setter names follow the convention <code>getX</code>/<code>setX</code> (<code>isX</code> for booleans).',
      ]),
    ].join(''),
    exercise: { q: 'Complete the getter for the private attribute <code>name</code>.', code: 'public String ___() {\n    return name;\n}', options: ['getName', 'name', 'setName', 'get'], answer: ['getName'] },
  });

  JT.def('java_packages', {
    body: () => [
      h2('Packages'),
      p('A package groups related classes, like a folder groups files. It prevents name clashes (two libraries may both have a <code>Parser</code> class) and controls access. The Java standard library itself is organised in packages: <code>java.util</code>, <code>java.time</code>, <code>java.io</code> and many more. Together they are called the <b>Java API</b>.'),
      h2('Importing'),
      p('Use <code>import</code> to refer to a class by its short name. Import a single class, or every class of a package with <code>*</code>. Classes in <code>java.lang</code> (<code>String</code>, <code>Math</code>, <code>System</code>…) are imported automatically.'),
      syn(`import java.util.ArrayList;   // one class\nimport java.time.*;           // whole package`, 'Import syntax'),
      ex(`
        import java.time.LocalDate;
        import java.util.List;

        public class Main {
            public static void main(String[] args) {
                LocalDate d = LocalDate.of(2030, 1, 15);
                List<String> tags = List.of("java", "api");
                System.out.println(d.getDayOfWeek());
                System.out.println(tags);
            }
        }`),
      p('Without an import you can still use a class by its <b>fully qualified name</b>:'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                java.util.Random dice = new java.util.Random(42);
                System.out.println(dice.nextInt(6) + 1);
            }
        }`),
      h2('Your own packages'),
      p('Put a <code>package</code> statement as the very first line of a file. The folder structure must match the package name, and the class is then compiled and run by its full name.'),
      code(`
        // file: com/example/shop/Cart.java
        package com.example.shop;

        public class Cart {
            public static void main(String[] args) {
                System.out.println("Cart ready");
            }
        }`),
      code(`
        javac com/example/shop/Cart.java
        java com.example.shop.Cart`),
      note('The runner on this site compiles a single file, so the examples here use only packages from the Java API. To try your own packages, use a local JDK or an IDE.'),
      p('By convention, package names are lower case and start with a reversed domain name you control, e.g. <code>org.mycity.library</code>.'),
    ].join(''),
    exercise: { q: 'Import the <code>Scanner</code> class from the <code>java.util</code> package.', code: '___ java.util.Scanner;', options: ['import', 'package', 'include', 'using'], answer: ['import'] },
  });

  JT.def('java_inheritance', {
    body: () => [
      h2('Inheritance'),
      p('A class can <b>inherit</b> attributes and methods from another class with <code>extends</code>. The class being inherited from is the <b>superclass</b> (parent); the new class is the <b>subclass</b> (child). The subclass gets everything that is not <code>private</code> and can add its own members.'),
      ex(`
        class Vehicle {
            String brand = "Generic";
            int wheels;

            void honk() {
                System.out.println("Beep!");
            }
        }

        class Bicycle extends Vehicle {
            boolean hasBell = true;

            Bicycle() {
                wheels = 2;
            }
        }

        public class Main {
            public static void main(String[] args) {
                Bicycle bike = new Bicycle();
                bike.brand = "Brompton";
                System.out.println(bike.brand + ", " + bike.wheels + " wheels, bell: " + bike.hasBell);
                bike.honk();   // inherited
            }
        }`),
      h2('Overriding'),
      p('A subclass can replace an inherited method by declaring one with the same signature. Add <code>@Override</code> so the compiler checks that you really are overriding something.'),
      ex(`
        class Vehicle {
            void honk() { System.out.println("Beep!"); }
        }

        class Truck extends Vehicle {
            @Override
            void honk() { System.out.println("HOOONK!"); }
        }

        public class Main {
            public static void main(String[] args) {
                new Vehicle().honk();
                new Truck().honk();
            }
        }`),
      h2('Rules'),
      ul([
        'A class can extend only <b>one</b> class (single inheritance). Use interfaces to combine several types.',
        'Every class ultimately extends <code>Object</code>, which is where <code>toString()</code>, <code>equals()</code> and <code>hashCode()</code> come from.',
        'A <code>final</code> class cannot be extended, and a <code>final</code> method cannot be overridden.',
        'Use inheritance for "is a" relationships (a bicycle <i>is a</i> vehicle). For "has a" relationships use a field instead.',
      ]),
    ].join(''),
    exercise: { q: 'Make <code>Cat</code> inherit from <code>Animal</code>.', code: 'class Cat ___ Animal {\n}', options: ['extends', 'implements', 'inherits', ':'], answer: ['extends'] },
  });

  JT.def('java_polymorphism', {
    body: () => [
      h2('Polymorphism'),
      p('Polymorphism ("many forms") means one variable of a superclass type can refer to objects of different subclasses, and calling a method runs the version belonging to the <b>actual</b> object. This is decided at run time.'),
      ex(`
        class Shape {
            double area() { return 0; }
            String name() { return "shape"; }
        }

        class Circle extends Shape {
            double r;
            Circle(double r) { this.r = r; }
            @Override double area() { return Math.PI * r * r; }
            @Override String name() { return "circle"; }
        }

        class Square extends Shape {
            double side;
            Square(double side) { this.side = side; }
            @Override double area() { return side * side; }
            @Override String name() { return "square"; }
        }

        public class Main {
            public static void main(String[] args) {
                Shape[] shapes = { new Circle(1), new Square(3), new Circle(2.5) };
                double total = 0;
                for (Shape s : shapes) {
                    System.out.printf("%-7s %6.2f%n", s.name(), s.area());
                    total += s.area();
                }
                System.out.printf("total   %6.2f%n", total);
            }
        }`),
      p('The loop does not know or care which concrete shape it holds. Adding a <code>Triangle</code> class later needs no change to the loop.'),
      h2('Checking the real type'),
      p('Use <code>instanceof</code> to test an object\'s type. Since Java 16 it can also declare a variable of that type in one step (pattern matching).'),
      ex(`
        Object[] things = { "hello", 42, 3.5, List.of(1, 2) };
        for (Object o : things) {
            if (o instanceof String s) {
                System.out.println("String of length " + s.length());
            } else if (o instanceof Integer i) {
                System.out.println("Integer, doubled: " + i * 2);
            } else {
                System.out.println("Something else: " + o);
            }
        }`),
    ].join(''),
    exercise: { q: 'Store a <code>Dog</code> object in a variable of its superclass type <code>Animal</code>.', code: '___ pet = new Dog();', options: ['Animal', 'Dog()', 'super', 'Object()'], answer: ['Animal'] },
  });

  JT.def('java_super', {
    body: () => [
      h2('The super keyword'),
      p('<code>super</code> refers to the superclass. Use it to call the parent\'s version of an overridden method, or the parent\'s constructor.'),
      ex(`
        class Employee {
            String name;
            Employee(String name) { this.name = name; }

            String describe() { return name; }
        }

        class Manager extends Employee {
            int teamSize;

            Manager(String name, int teamSize) {
                super(name);           // must be the first statement
                this.teamSize = teamSize;
            }

            @Override
            String describe() {
                return super.describe() + " (manages " + teamSize + ")";
            }
        }

        public class Main {
            public static void main(String[] args) {
                System.out.println(new Employee("Priya").describe());
                System.out.println(new Manager("Olu", 6).describe());
            }
        }`),
      h2('Constructor chaining'),
      p('Every constructor first runs a superclass constructor. If you do not write <code>super(...)</code>, Java inserts <code>super()</code> automatically, which fails if the parent has no parameterless constructor.'),
      ex(`
        class A { A() { System.out.println("A constructor"); } }
        class B extends A { B() { System.out.println("B constructor"); } }
        class C extends B { C() { System.out.println("C constructor"); } }

        public class Main {
            public static void main(String[] args) {
                new C();
            }
        }`, { desc: 'Constructors run from the top of the hierarchy down.' }),
    ].join(''),
    exercise: { q: 'Call the superclass constructor with the argument <code>name</code>.', code: 'Student(String name) {\n    ___(name);\n}', options: ['super', 'this', 'parent', 'base'], answer: ['super'] },
  });

  JT.def('java_inner_classes', {
    body: () => [
      h2('Nested classes'),
      p('A class can be declared inside another class. This groups helpers with the only class that uses them and keeps them out of the way.'),
      table(['Kind', 'Declared as', 'Needs an outer object?'], [
        ['Inner class', '<code>class Inner { }</code> inside a class', 'yes, and it can use the outer object\'s fields'],
        ['Static nested class', '<code>static class Nested { }</code>', 'no'],
        ['Local class', 'inside a method', 'lives only within that method'],
        ['Anonymous class', '<code>new Type() { ... }</code>', 'see the <a href="' + JT.url('java_anonymous') + '">Anonymous</a> page'],
      ]),
      h2('Inner class'),
      ex(`
        class Playlist {
            String title;
            Playlist(String title) { this.title = title; }

            class Track {
                String song;
                Track(String song) { this.song = song; }
                void print() {
                    System.out.println(title + " → " + song);  // uses the outer field
                }
            }
        }

        public class Main {
            public static void main(String[] args) {
                Playlist road = new Playlist("Road trip");
                Playlist.Track t = road.new Track("Africa");
                t.print();
            }
        }`),
      h2('Static nested class'),
      ex(`
        class Geometry {
            static class Point {
                final int x, y;
                Point(int x, int y) { this.x = x; this.y = y; }
                double distanceTo(Point o) { return Math.hypot(x - o.x, y - o.y); }
            }
        }

        public class Main {
            public static void main(String[] args) {
                Geometry.Point a = new Geometry.Point(0, 0);
                Geometry.Point b = new Geometry.Point(3, 4);
                System.out.println(a.distanceTo(b));
            }
        }`),
      note('Prefer <code>static</code> nested classes unless the nested class really needs the outer object. Inner objects keep a hidden reference to their outer object.'),
    ].join(''),
    exercise: { q: 'Create an object of the static nested class <code>Outer.Helper</code>.', code: 'Outer.Helper h = new ___();', options: ['Outer.Helper', 'Helper.Outer', 'outer.new Helper', 'Outer'], answer: ['Outer.Helper'] },
  });

  JT.def('java_abstract', {
    body: () => [
      h2('Abstract classes and methods'),
      p('Abstraction means showing only what something does and hiding how. An <code>abstract</code> class cannot be instantiated; it exists to be extended. An <code>abstract</code> method has no body. Every non-abstract subclass must provide one.'),
      ex(`
        abstract class Notification {
            String recipient;
            Notification(String recipient) { this.recipient = recipient; }

            abstract String channel();          // no body

            void send(String text) {            // normal method using the abstract one
                System.out.println("[" + channel() + "] to " + recipient + ": " + text);
            }
        }

        class EmailNotification extends Notification {
            EmailNotification(String r) { super(r); }
            @Override String channel() { return "email"; }
        }

        class SmsNotification extends Notification {
            SmsNotification(String r) { super(r); }
            @Override String channel() { return "sms"; }
        }

        public class Main {
            public static void main(String[] args) {
                Notification[] list = {
                    new EmailNotification("ines@example.org"),
                    new SmsNotification("+351 900 000 000")
                };
                for (Notification n : list) n.send("Your parcel has shipped");
                // new Notification("x"); // error: Notification is abstract
            }
        }`),
      ul([
        'An abstract class can have instance fields, constructors and ordinary methods. An interface cannot have instance fields or constructors.',
        'If a class has even one abstract method, the class itself must be declared <code>abstract</code>.',
        'Use an abstract class when subclasses share code and state; use an <a href="' + JT.url('java_interface') + '">interface</a> when unrelated classes only share a capability.',
      ]),
    ].join(''),
    exercise: { q: 'Declare a method without a body that subclasses must implement.', code: 'abstract class Animal {\n    ___ void sound();\n}', options: ['abstract', 'final', 'static', 'void'], answer: ['abstract'] },
  });

  JT.def('java_interface', {
    body: () => [
      h2('Interfaces'),
      p('An interface lists methods a class promises to provide. A class <code>implements</code> an interface and must then supply bodies for its abstract methods. Interfaces define a <b>capability</b> that unrelated classes can share.'),
      ex(`
        interface Payable {
            double amountDue();
        }

        class Invoice implements Payable {
            double total;
            Invoice(double total) { this.total = total; }
            public double amountDue() { return total; }
        }

        class Salary implements Payable {
            double monthly;
            Salary(double monthly) { this.monthly = monthly; }
            public double amountDue() { return monthly; }
        }

        public class Main {
            public static void main(String[] args) {
                Payable[] bills = { new Invoice(320.50), new Salary(2800), new Invoice(79.99) };
                double sum = 0;
                for (Payable p : bills) sum += p.amountDue();
                System.out.printf("To pay this month: %.2f%n", sum);
            }
        }`),
      note('Interface methods are <code>public</code> automatically, so the implementing method must also be <code>public</code>.'),
      h2('Several interfaces, default methods'),
      p('A class may implement many interfaces, which is Java\'s answer to multiple inheritance. Interfaces can also contain <code>default</code> methods (with a body) and <code>static</code> methods, plus constants.'),
      ex(`
        interface Swimmer {
            default String swim() { return "paddles"; }
        }

        interface Flyer {
            String fly();
        }

        class Duck implements Swimmer, Flyer {
            public String fly() { return "flaps away"; }
        }

        public class Main {
            public static void main(String[] args) {
                Duck d = new Duck();
                System.out.println("The duck " + d.swim() + " and " + d.fly());
            }
        }`),
    ].join(''),
    exercise: { q: 'Make <code>Robot</code> implement the interface <code>Movable</code>.', code: 'class Robot ___ Movable {\n}', options: ['implements', 'extends', 'uses', 'inherits'], answer: ['implements'] },
  });

  JT.def('java_anonymous', {
    body: () => [
      h2('Anonymous classes'),
      p('An anonymous class is declared and instantiated in one expression, without a name. It is handy for a one-off implementation of an interface or a subclass that is used in only one place.'),
      ex(`
        interface Greeter {
            String greet(String name);
        }

        public class Main {
            public static void main(String[] args) {
                Greeter formal = new Greeter() {
                    @Override
                    public String greet(String name) {
                        return "Good evening, " + name + ".";
                    }
                };
                System.out.println(formal.greet("Ms. Okafor"));
            }
        }`),
      p('You can also subclass a normal class anonymously and override one of its methods:'),
      ex(`
        class Task {
            void run() { System.out.println("default task"); }
        }

        public class Main {
            public static void main(String[] args) {
                Task backup = new Task() {
                    @Override void run() { System.out.println("backing up files…"); }
                };
                backup.run();
            }
        }`),
      h2('Anonymous class or lambda?'),
      p('When the interface has exactly one abstract method (a <b>functional interface</b>), a <a href="' + JT.url('java_lambda') + '">lambda</a> is shorter. Anonymous classes are still needed when you must override several methods or keep state in fields.'),
      ex(`
        List<String> names = new ArrayList<>(List.of("Zoe", "amir", "Bo"));

        // anonymous class
        names.sort(new Comparator<String>() {
            public int compare(String a, String b) { return a.compareToIgnoreCase(b); }
        });
        System.out.println(names);

        // the same with a lambda
        names.sort((a, b) -> b.compareToIgnoreCase(a));
        System.out.println(names);`),
    ].join(''),
  });

  JT.def('java_enums', {
    body: () => [
      h2('Enums'),
      p('An <code>enum</code> is a type with a fixed set of named constants, such as days of the week or the states of an order. Using an enum instead of strings or numbers means the compiler rejects invalid values.'),
      ex(`
        enum Level { LOW, MEDIUM, HIGH }

        public class Main {
            public static void main(String[] args) {
                Level risk = Level.MEDIUM;
                System.out.println(risk);
                System.out.println(risk.ordinal());          // position, from 0
                System.out.println(Level.valueOf("HIGH"));   // from text
            }
        }`),
      h2('Enums in switch'),
      ex(`
        enum Signal { RED, AMBER, GREEN }

        public class Main {
            public static void main(String[] args) {
                for (Signal s : Signal.values()) {
                    String action = switch (s) {
                        case RED -> "stop";
                        case AMBER -> "get ready";
                        case GREEN -> "go";
                    };
                    System.out.println(s + ": " + action);
                }
            }
        }`),
      note('<code>values()</code> returns all constants in declaration order. A switch expression over an enum must cover every constant, so the compiler warns you when a new one is added.'),
    ].join(''),
    exercise: { q: 'Declare an enum <code>Size</code> with three constants.', code: '___ Size { SMALL, MEDIUM, LARGE }', options: ['enum', 'class', 'const', 'final'], answer: ['enum'] },
  });

  JT.def('java_enum_constructor', {
    body: () => [
      h2('Enums with fields and constructors'),
      p('Enums are full classes. Each constant can carry data passed to a constructor, and the enum can have methods. The constructor is always <code>private</code> (implicitly), because only the listed constants may exist.'),
      ex(`
        enum Coin {
            PENNY(1), NICKEL(5), DIME(10), QUARTER(25);

            private final int cents;

            Coin(int cents) {
                this.cents = cents;
            }

            int cents() {
                return cents;
            }
        }

        public class Main {
            public static void main(String[] args) {
                Coin[] pocket = { Coin.QUARTER, Coin.DIME, Coin.DIME, Coin.PENNY };
                int total = 0;
                for (Coin c : pocket) total += c.cents();
                System.out.println("Total: " + total + " cents");
            }
        }`),
      ex(`
        enum Planet {
            MERCURY(0.38), EARTH(1.0), JUPITER(2.53);

            final double gravity;   // relative to Earth
            Planet(double gravity) { this.gravity = gravity; }

            double weigh(double earthKg) { return earthKg * gravity; }
        }

        public class Main {
            public static void main(String[] args) {
                for (Planet p : Planet.values()) {
                    System.out.printf("%-8s %.1f kg%n", p, p.weigh(70));
                }
            }
        }`, { title: 'Methods on enum constants' }),
      note('The list of constants must come first and end with a semicolon when more members follow.'),
    ].join(''),
  });

  JT.def('java_user_input', {
    body: () => [
      h2('Reading input with Scanner'),
      p('The <code>Scanner</code> class from <code>java.util</code> reads text typed by the user (standard input). Create one around <code>System.in</code>, then call a method for the kind of value you expect.'),
      ex(`
        import java.util.Scanner;

        public class Main {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                System.out.print("What is your name? ");
                String name = in.nextLine();
                System.out.print("How old are you? ");
                int age = in.nextInt();
                System.out.println();
                System.out.println("Hi " + name + ", next year you will be " + (age + 1) + ".");
            }
        }`, { stdin: 'Mateus Silva\n29\n', desc: 'This example receives the input <code>Mateus Silva</code> and <code>29</code>. In Try it Yourself you can change the input in the <b>Program input</b> box.' }),
      table(['Method', 'Reads'], [
        ['<code>nextLine()</code>', 'the rest of the line as a <code>String</code>'],
        ['<code>next()</code>', 'one word'],
        ['<code>nextInt()</code>, <code>nextLong()</code>', 'a whole number'],
        ['<code>nextDouble()</code>', 'a decimal number'],
        ['<code>nextBoolean()</code>', '<code>true</code> or <code>false</code>'],
        ['<code>hasNextInt()</code>, <code>hasNextLine()</code>…', 'whether such a value is available (does not consume it)'],
      ]),
      h2('Reading until the input ends'),
      ex(`
        import java.util.Scanner;

        public class Main {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                int count = 0;
                double sum = 0;
                while (in.hasNextDouble()) {
                    sum += in.nextDouble();
                    count++;
                }
                System.out.printf("%d numbers, average %.2f%n", count, sum / count);
            }
        }`, { stdin: '4.5 7 9.25\n3\n6.75\n' }),
      note('Mixing <code>nextInt()</code> and <code>nextLine()</code> is a common trap: <code>nextInt()</code> leaves the line break behind, so a following <code>nextLine()</code> returns an empty string. Call an extra <code>nextLine()</code> to skip it.'),
      p('Typing the wrong kind of value (e.g. letters for <code>nextInt()</code>) throws an <code>InputMismatchException</code>. See <a href="' + JT.url('java_try_catch') + '">Exceptions</a> for how to handle it.'),
    ].join(''),
    exercise: { q: 'Read a whole line of text from the scanner <code>in</code>.', code: 'String line = in.___();', options: ['nextLine', 'nextInt', 'readLine', 'getLine'], answer: ['nextLine'] },
  });

  JT.def('java_date', {
    body: () => [
      h2('Dates and times'),
      p('The <code>java.time</code> package has immutable classes for dates and times. The main ones are:'),
      table(['Class', 'Represents', 'Example value'], [
        ['<code>LocalDate</code>', 'a date', '2031-03-14'],
        ['<code>LocalTime</code>', 'a time of day', '09:30:15'],
        ['<code>LocalDateTime</code>', 'date and time', '2031-03-14T09:30:15'],
        ['<code>ZonedDateTime</code>', 'date and time in a time zone', '2031-03-14T09:30+09:00[Asia/Tokyo]'],
        ['<code>Duration</code> / <code>Period</code>', 'an amount of time / of days, months, years', 'PT1H30M / P2M10D'],
        ['<code>DateTimeFormatter</code>', 'formatting and parsing', '<code>dd/MM/yyyy</code>'],
      ]),
      h2('Current date and time'),
      ex(`
        System.out.println(LocalDate.now());
        System.out.println(LocalTime.now());
        System.out.println(LocalDateTime.now());`, { desc: 'The output depends on when you run it.' }),
      h2('Creating and calculating'),
      ex(`
        LocalDate launch = LocalDate.of(2031, 3, 14);
        LocalDate review = launch.plusWeeks(6);
        System.out.println(launch.getDayOfWeek());
        System.out.println(review);
        System.out.println(review.isAfter(launch));

        Period gap = Period.between(LocalDate.of(1998, 7, 2), launch);
        System.out.println(gap.getYears() + " years, " + gap.getMonths() + " months");`),
      h2('Formatting'),
      ex(`
        LocalDateTime meeting = LocalDateTime.of(2031, 11, 5, 14, 30);
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        System.out.println(meeting.format(f));

        LocalDate parsed = LocalDate.parse("24/12/2031", DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        System.out.println(parsed.getMonth());

        Duration film = Duration.ofMinutes(142);
        System.out.println(film.toHours() + "h " + film.toMinutesPart() + "min");`),
      note('Every "change" such as <code>plusDays()</code> returns a <b>new</b> object; the original is never modified. Remember to use the result.'),
    ].join(''),
    exercise: { q: 'Create a <code>LocalDate</code> for 1 May 2030.', code: 'LocalDate d = LocalDate.___(2030, 5, 1);', options: ['of', 'new', 'create', 'parse'], answer: ['of'] },
  });
})();
