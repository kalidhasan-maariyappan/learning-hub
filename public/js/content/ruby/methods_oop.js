// Ruby methods, blocks, procs and lambdas, and object-oriented Ruby.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Ruby');

  page('ruby_methods', () => [
    h2('Create a method'),
    p('A method is defined with <code>def</code> and closed with <code>end</code>. The value of the last expression is returned automatically.'),
    K.ruby(`
      def square(n)
        n * n
      end

      puts square(4)
      puts square(9)`, '16\n81'),
    h2('Early return'),
    p('Use <code>return</code> to leave a method early:'),
    K.ruby(`
      def discount(price)
        return 0 if price < 100
        price * 0.1
      end

      puts discount(50)
      puts discount(200)`, '0\n20.0'),
    h2('Naming conventions'),
    table(['Ending', 'Meaning', 'Example'], [
      ['<code>?</code>', 'Returns true or false', '<code>empty?</code>, <code>valid?</code>'],
      ['<code>!</code>', 'A more dangerous version: changes the object or raises an error', '<code>sort!</code>, <code>save!</code>'],
      ['<code>=</code>', 'A setter, called with assignment syntax', '<code>name=</code>'],
    ]),
    K.warn('Adding <code>return</code> to every method. Idiomatic Ruby lets the last expression be the return value and uses <code>return</code> only to leave early.'),
  ], { exercise: { q: 'Define a method named <code>greet</code>.', code: '___ greet\n  "Hello"\nend', options: ['def', 'function', 'method', 'fn'], answer: ['def'], explain: 'Methods are defined with <code>def</code>.' } });

  page('ruby_arguments', () => [
    h2('Default arguments'),
    K.ruby(`
      def greet(name, greeting = "Hello")
        "#{greeting}, #{name}!"
      end

      puts greet("Ada")
      puts greet("Ada", "Welcome")`, 'Hello, Ada!\nWelcome, Ada!'),
    h2('Keyword arguments'),
    p('Keyword arguments are named at the call site, which makes calls with several options easy to read. A keyword without a default is required.'),
    K.ruby(`
      def create_user(name:, role: "member", active: true)
        "#{name} (#{role}, active=#{active})"
      end

      puts create_user(name: "Ada")
      puts create_user(role: "admin", name: "Lin")
      begin
        create_user(role: "admin")
      rescue ArgumentError => e
        puts e.message
      end`, 'Ada (member, active=true)\nLin (admin, active=true)\nmissing keyword: :name'),
    h2('Any number of arguments'),
    p('<code>*args</code> collects extra positional arguments into an array, and <code>**opts</code> collects extra keywords into a hash:'),
    K.ruby(`
      def log(level, *messages, **context)
        puts "[#{level}] #{messages.join(' ')} #{context}"
      end

      log(:info, "User", "signed in", user_id: 7)`, '[info] User signed in {user_id: 7}'),
    K.tip('The splat also works the other way: <code>sum(*[1, 2, 3])</code> passes an array as separate arguments.'),
  ]);

  page('ruby_blocks', () => [
    h2('What is a block?'),
    p('A block is a chunk of code passed to a method, written with <code>{ }</code> or <code>do ... end</code>. The method runs the block with <code>yield</code>.'),
    K.ruby(`
      def twice
        yield
        yield
      end

      twice { puts "Hi!" }`, 'Hi!\nHi!'),
    h2('Passing values to a block'),
    K.ruby(`
      def each_pair_sum(a, b)
        yield a + b, a * b
      end

      each_pair_sum(3, 4) { |sum, product| puts "sum=#{sum} product=#{product}" }`, 'sum=7 product=12'),
    h2('Optional blocks'),
    p('<code>block_given?</code> tells a method whether a block was passed:'),
    K.ruby(`
      def fetch_name
        name = nil
        return name || yield if block_given?
        name || "unknown"
      end

      puts fetch_name
      puts fetch_name { "from block" }`, 'unknown\nfrom block'),
    h2('Blocks for setup and cleanup'),
    p('Blocks let a method run code before and after your code. <code>File.open</code> uses this to close the file for you. Here is the same idea for timing:'),
    K.ruby(`
      def measure(label)
        puts "start #{label}"
        result = yield
        puts "end #{label}"
        result
      end

      value = measure("sum") { (1..100).sum }
      puts value`, 'start sum\nend sum\n5050'),
  ]);

  page('ruby_procs_lambdas', () => [
    h2('Proc and lambda'),
    p('A block is not an object, but you can turn one into an object with <code>proc</code> or <code>lambda</code>. Both are instances of <code>Proc</code> and are called with <code>.call</code> (or <code>.()</code>).'),
    K.ruby(`
      double = ->(n) { n * 2 }
      shout = proc { |s| s.upcase }
      puts double.call(5)
      puts double.(6)
      puts shout.call("hi")
      p [1, 2, 3].map(&double)`, '10\n12\nHI\n[2, 4, 6]'),
    h2('Differences between proc and lambda'),
    p('This is a classic interview question. A lambda checks its arguments and <code>return</code> leaves only the lambda. A proc ignores missing arguments and <code>return</code> leaves the method that created it.'),
    K.ruby(`
      l = ->(a, b) { "#{a}-#{b}" }
      pr = proc { |a, b| "#{a}-#{b.inspect}" }
      puts pr.call(1)
      begin
        l.call(1)
      rescue ArgumentError => e
        puts "lambda: #{e.message}"
      end

      def run_lambda
        ->() { return 1 }.call
        "method continues"
      end

      def run_proc
        proc { return "proc returned" }.call
        "never reached"
      end

      puts run_lambda
      puts run_proc`, '1-nil\nlambda: wrong number of arguments (given 1, expected 2)\nmethod continues\nproc returned'),
    table(['', 'lambda', 'proc'], [
      ['Argument count', 'Strict, like a method', 'Loose: missing values are nil'],
      ['<code>return</code>', 'Returns from the lambda', 'Returns from the enclosing method'],
    ]),
    h2('Closures'),
    p('Procs and lambdas remember the variables around them where they were created:'),
    K.ruby(`
      def counter
        count = 0
        -> { count += 1 }
      end

      c = counter
      c.call
      c.call
      puts c.call`, '3'),
  ]);

  page('ruby_classes', () => [
    h2('Create a class'),
    p('A class is a blueprint for objects. <code>initialize</code> runs when you call <code>new</code>, and instance variables (<code>@name</code>) store each object’s state.'),
    K.ruby(`
      class Dog
        def initialize(name, breed)
          @name = name
          @breed = breed
        end

        def describe
          "#{@name} is a #{@breed}"
        end
      end

      rex = Dog.new("Rex", "beagle")
      puts rex.describe
      puts rex.class`, 'Rex is a beagle\nDog'),
    h2('to_s and inspect'),
    p('Define <code>to_s</code> to control how <code>puts</code> and interpolation show the object:'),
    K.ruby(`
      class Money
        def initialize(cents)
          @cents = cents
        end

        def to_s
          format("$%.2f", @cents / 100.0)
        end
      end

      price = Money.new(1999)
      puts price
      puts "Total: #{price}"`, '$19.99\nTotal: $19.99'),
    K.warn('Trying to read <code>rex.name</code> from outside the class. Instance variables are private to the object; add a reader method — see ' + JT.link('ruby_attributes', 'Ruby Attributes') + '.'),
  ], { exercise: { q: 'Create a new Car object.', code: 'class Car\nend\n\ncar = Car.___', options: ['new', 'create', 'build', 'init'], answer: ['new'], explain: '<code>new</code> creates the object and calls <code>initialize</code>.' } });

  page('ruby_attributes', () => [
    h2('Getters and setters'),
    p('<code>attr_reader</code>, <code>attr_writer</code> and <code>attr_accessor</code> generate methods to read and write instance variables.'),
    K.ruby(`
      class Person
        attr_reader :name
        attr_accessor :email

        def initialize(name, email)
          @name = name
          @email = email
        end
      end

      ada = Person.new("Ada", "ada@example.com")
      puts ada.name
      ada.email = "ada@math.org"
      puts ada.email`, 'Ada\nada@math.org'),
    table(['Macro', 'Creates'], [
      ['<code>attr_reader :name</code>', '<code>name</code>'],
      ['<code>attr_writer :name</code>', '<code>name=</code>'],
      ['<code>attr_accessor :name</code>', '<code>name</code> and <code>name=</code>'],
    ]),
    h2('Custom setter with validation'),
    K.ruby(`
      class Account
        attr_reader :balance

        def initialize
          @balance = 0
        end

        def balance=(amount)
          raise ArgumentError, "balance cannot be negative" if amount.negative?
          @balance = amount
        end
      end

      acct = Account.new
      acct.balance = 50
      puts acct.balance
      begin
        acct.balance = -5
      rescue ArgumentError => e
        puts e.message
      end`, '50\nbalance cannot be negative'),
    K.warn('Inside a method, writing <code>balance = 10</code> creates a local variable. To call the setter, write <code>self.balance = 10</code>.'),
  ]);

  page('ruby_class_methods', () => [
    h2('Class methods'),
    p('A class method belongs to the class itself, not to an object. Define it with <code>def self.name</code>.'),
    K.ruby(`
      class Temperature
        def self.from_fahrenheit(f)
          new((f - 32) * 5 / 9.0)
        end

        attr_reader :celsius

        def initialize(celsius)
          @celsius = celsius
        end
      end

      t = Temperature.from_fahrenheit(212)
      puts t.celsius`, '100.0'),
    h2('Class-level state'),
    p('Prefer a class-level instance variable over <code>@@</code> class variables, because <code>@@</code> variables are shared with every subclass:'),
    K.ruby(`
      class Order
        @count = 0

        class << self
          attr_reader :count

          def create
            @count += 1
            new
          end
        end
      end

      Order.create
      Order.create
      puts Order.count`, '2'),
    K.tip('<code>class &lt;&lt; self</code> opens the class’s singleton class, so every method inside it is a class method.'),
  ]);

  page('ruby_inheritance', () => [
    h2('Inheritance'),
    p('A class can inherit from one parent class with <code>&lt;</code>. The child gets the parent’s methods and can override them. <code>super</code> calls the parent version.'),
    K.ruby(`
      class Animal
        def initialize(name)
          @name = name
        end

        def speak
          "#{@name} makes a sound"
        end
      end

      class Cat < Animal
        def speak
          super + " — meow"
        end
      end

      puts Cat.new("Tom").speak
      puts Cat.superclass
      p Cat.ancestors.take(3)`, 'Tom makes a sound — meow\nAnimal\n[Cat, Animal, Object]'),
    h2('super with and without parentheses'),
    p('<code>super</code> on its own passes the same arguments the method received. <code>super()</code> passes none.'),
    K.ruby(`
      class Base
        def initialize(name = "none")
          @name = name
        end
        attr_reader :name
      end

      class Child < Base
        def initialize(name)
          super
        end
      end

      puts Child.new("Kai").name`, 'Kai'),
    K.tip('Ruby has single inheritance. To share behavior between unrelated classes, use a module — see ' + JT.link('ruby_mixins', 'Ruby Mixins') + '.'),
  ]);

  page('ruby_visibility', () => [
    h2('public, private and protected'),
    p('Methods are public by default. Methods after <code>private</code> can be called only without an explicit receiver, from inside the object. <code>protected</code> methods can also be called on other objects of the same class.'),
    K.ruby(`
      class Employee
        def initialize(salary)
          @salary = salary
        end

        def earns_more_than?(other)
          salary > other.salary
        end

        def summary
          "Salary band: #{band}"
        end

        protected

        attr_reader :salary

        private

        def band
          @salary > 50_000 ? "senior" : "junior"
        end
      end

      a = Employee.new(60_000)
      b = Employee.new(40_000)
      puts a.earns_more_than?(b)
      puts a.summary
      begin
        a.salary
      rescue NoMethodError => e
        puts e.message
      end`, "true\nSalary band: senior\nprotected method 'salary' called for an instance of Employee"),
    K.warn('Thinking <code>private</code> is a security boundary. <code>object.send(:band)</code> still calls a private method. Visibility is about design, not protection.'),
  ]);

  page('ruby_modules', () => [
    h2('Modules as namespaces'),
    p('A module groups related classes, methods and constants under one name, so names do not clash. Use <code>::</code> to reach inside.'),
    K.ruby(`
      module Billing
        TAX_RATE = 0.2

        class Invoice
          def total(amount)
            amount * (1 + TAX_RATE)
          end
        end
      end

      puts Billing::TAX_RATE
      puts Billing::Invoice.new.total(100)`, '0.2\n120.0'),
    h2('Module functions'),
    p('A module can hold utility methods that do not need an object:'),
    K.ruby(`
      module Slug
        def self.from(title)
          title.downcase.strip.gsub(/[^a-z0-9]+/, "-")
        end
      end

      puts Slug.from("  Hello Ruby World ")`, 'hello-ruby-world'),
    K.remember(['You cannot create an instance of a module.', 'Modules are used as namespaces and as mixins.', 'Rails uses namespaces for folders: <code>app/models/billing/invoice.rb</code> defines <code>Billing::Invoice</code>.']),
  ]);

  page('ruby_mixins', () => [
    h2('include: add instance methods'),
    p('Including a module in a class adds the module’s methods to every object of that class. This is how Ruby shares behavior without multiple inheritance.'),
    K.ruby(`
      module Greeting
        def greet
          "Hello, I am #{name}"
        end
      end

      class User
        include Greeting
        attr_reader :name
        def initialize(name) = @name = name
      end

      puts User.new("Ada").greet
      p User.ancestors.take(3)`, 'Hello, I am Ada\n[User, Greeting, Object]'),
    h2('Comparable and Enumerable'),
    p('The standard library has powerful mixins. Define <code>&lt;=&gt;</code> and include <code>Comparable</code> to get <code>&lt;</code>, <code>&gt;</code>, <code>between?</code> and <code>clamp</code>. Define <code>each</code> and include <code>Enumerable</code> to get <code>map</code>, <code>select</code>, <code>sort</code> and the rest.'),
    K.ruby(`
      class Version
        include Comparable
        attr_reader :parts

        def initialize(text) = @parts = text.split(".").map(&:to_i)
        def <=>(other) = parts <=> other.parts
        def to_s = parts.join(".")
      end

      class Playlist
        include Enumerable
        def initialize(*songs) = @songs = songs
        def each(&block) = @songs.each(&block)
      end

      puts Version.new("1.10.0") > Version.new("1.9.3")
      puts [Version.new("2.0"), Version.new("1.2")].min
      list = Playlist.new("b-side", "anthem", "ballad")
      p list.sort
      p list.select { |s| s.start_with?("b") }`, 'true\n1.2\n["anthem", "b-side", "ballad"]\n["b-side", "ballad"]'),
    h2('extend and prepend'),
    table(['Keyword', 'Effect'], [
      ['<code>include M</code>', 'M’s methods become instance methods; M is placed after the class in the lookup chain.'],
      ['<code>prepend M</code>', 'Like include, but M comes before the class, so it can wrap the class’s methods and call <code>super</code>.'],
      ['<code>extend M</code>', 'M’s methods are added to one object — used on a class, they become class methods.'],
    ]),
    K.ruby(`
      module Loud
        def speak = super.upcase + "!"
      end

      class Parrot
        prepend Loud
        def speak = "hello"
      end

      puts Parrot.new.speak
      p Parrot.ancestors.take(2)`, 'HELLO!\n[Loud, Parrot]'),
    K.tip('<code>def name = expression</code> is the one-line (“endless”) method syntax added in Ruby 3.0.'),
  ]);

  page('ruby_duck_typing', () => [
    h2('Duck typing'),
    p('“If it walks like a duck and quacks like a duck, it is a duck.” Ruby code usually cares whether an object responds to a method, not what class it is.'),
    K.ruby(`
      class EmailNotifier
        def deliver(msg) = "email: #{msg}"
      end

      class SmsNotifier
        def deliver(msg) = "sms: #{msg}"
      end

      [EmailNotifier.new, SmsNotifier.new].each do |notifier|
        puts notifier.deliver("Order shipped")
      end`, 'email: Order shipped\nsms: Order shipped'),
    p('The two classes share no parent and no interface declaration; they both have a <code>deliver</code> method, and that is enough.'),
    h2('respond_to?'),
    K.ruby(`
      def print_count(obj)
        if obj.respond_to?(:each)
          puts "count #{obj.count}"
        else
          puts "#{obj.class} cannot be iterated"
        end
      end

      print_count([1, 2, 3])
      print_count({ a: 1 })
      print_count(42)`, 'count 3\ncount 1\nInteger cannot be iterated'),
    K.warn('Checking <code>obj.is_a?(Array)</code> before calling a method. It rejects objects that would have worked; check behavior with <code>respond_to?</code>, or just call the method.'),
  ]);

  page('ruby_equality', () => [
    h2('Four kinds of equality'),
    p('Ruby has four equality methods. Knowing the difference is a common senior interview question.'),
    table(['Method', 'Meaning', 'Used by'], [
      ['<code>==</code>', 'Same value (classes override it)', 'Everyday comparisons'],
      ['<code>eql?</code>', 'Same value and same type', 'Hash keys (with <code>hash</code>)'],
      ['<code>equal?</code>', 'The very same object', 'Identity checks — never override it'],
      ['<code>===</code>', '“Belongs to” / matches', '<code>case ... when</code>'],
    ]),
    K.ruby(`
      a = "ruby"
      b = "ruby"
      p a == b
      p a.equal?(b)
      p 1 == 1.0
      p 1.eql?(1.0)
      p Integer === 5
      p (1..10) === 5`, 'true\nfalse\ntrue\nfalse\ntrue\ntrue'),
    h2('Value objects as hash keys'),
    p('To use your own objects as hash keys, override <code>==</code>, <code>eql?</code> and <code>hash</code> together, so equal objects have equal hash codes:'),
    K.ruby(`
      class Point
        attr_reader :x, :y
        def initialize(x, y) = (@x, @y = x, y)
        def ==(other) = other.is_a?(Point) && x == other.x && y == other.y
        alias eql? ==
        def hash = [x, y].hash
      end

      visits = { Point.new(1, 2) => "home" }
      puts visits[Point.new(1, 2)]
      puts Point.new(1, 2) == Point.new(1, 2)`, 'home\ntrue'),
    K.tip('<code>Struct</code> and <code>Data</code> classes give you <code>==</code>, <code>eql?</code> and <code>hash</code> for free — see ' + JT.link('ruby_struct_data', 'Ruby Struct and Data') + '.'),
  ]);
})();
