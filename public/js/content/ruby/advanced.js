// Ruby advanced topics, interview questions and the Ruby quiz.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Ruby');

  page('ruby_exceptions', () => [
    h2('begin / rescue'),
    p('When something goes wrong, Ruby raises an exception. Handle it with <code>rescue</code>. <code>ensure</code> always runs, error or not.'),
    K.ruby(`
      begin
        result = 10 / 0
      rescue ZeroDivisionError => e
        puts "Error: #{e.message}"
      ensure
        puts "Finished"
      end`, 'Error: divided by 0\nFinished'),
    h2('rescue in a method'),
    p('Inside a method you do not need <code>begin</code>; <code>rescue</code> and <code>ensure</code> can go directly in the method body:'),
    K.ruby(`
      def parse_age(text)
        Integer(text)
      rescue ArgumentError
        nil
      end

      p parse_age("42")
      p parse_age("forty")`, '42\nnil'),
    h2('raise and retry'),
    K.ruby(`
      attempts = 0
      begin
        attempts += 1
        raise "network timeout" if attempts < 3
        puts "Succeeded after #{attempts} attempts"
      rescue RuntimeError
        retry
      end`, 'Succeeded after 3 attempts'),
    h2('The exception hierarchy'),
    p('A bare <code>rescue</code> catches <code>StandardError</code> and its subclasses. Errors such as <code>NoMemoryError</code>, <code>SignalException</code> and <code>SystemExit</code> are not subclasses of StandardError, so they still stop the program.'),
    K.warn('Writing <code>rescue Exception</code>. It also catches Ctrl+C and <code>exit</code>. Rescue <code>StandardError</code> or a specific class instead.'),
  ]);

  page('ruby_custom_exceptions', () => [
    h2('Define your own exception'),
    p('Inherit from <code>StandardError</code> (not <code>Exception</code>). A small hierarchy lets callers rescue one error or the whole family.'),
    K.ruby(`
      class PaymentError < StandardError; end

      class CardDeclined < PaymentError
        attr_reader :code

        def initialize(code)
          @code = code
          super("Card declined (#{code})")
        end
      end

      def charge(amount)
        raise CardDeclined.new("insufficient_funds") if amount > 100
        "charged #{amount}"
      end

      puts charge(50)
      begin
        charge(500)
      rescue PaymentError => e
        puts "#{e.class}: #{e.message} [#{e.code}]"
      end`, 'charged 50\nCardDeclined: Card declined (insufficient_funds) [insufficient_funds]'),
    h2('Keep the original cause'),
    p('When you raise a new error inside <code>rescue</code>, Ruby stores the original exception in <code>cause</code>:'),
    K.ruby(`
      class ConfigError < StandardError; end

      begin
        begin
          Integer("abc")
        rescue ArgumentError
          raise ConfigError, "PORT must be a number"
        end
      rescue ConfigError => e
        puts e.message
        puts e.cause.class
      end`, 'PORT must be a number\nArgumentError'),
  ]);

  page('ruby_files', () => [
    h2('Write and read a file'),
    p('<code>File.write</code> and <code>File.read</code> handle the whole file in one call. With a block, <code>File.open</code> closes the file automatically, even if an error happens.'),
    K.ruby(`
      File.write("notes.txt", "first line\\nsecond line\\n")

      File.open("notes.txt", "a") { |f| f.puts "third line" }

      puts File.read("notes.txt")
      puts File.readlines("notes.txt", chomp: true).length
      puts File.exist?("notes.txt")`, 'first line\nsecond line\nthird line\n3\ntrue'),
    h2('Process a large file line by line'),
    p('<code>File.foreach</code> reads one line at a time, so it does not load the whole file into memory:'),
    K.ruby(`
      File.write("access.log", "200 /home\\n500 /pay\\n200 /about\\n500 /pay\\n")
      errors = File.foreach("access.log").count { |line| line.start_with?("500") }
      puts "Errors: #{errors}"`, 'Errors: 2'),
    table(['Mode', 'Meaning'], [['<code>"r"</code>', 'Read (default)'], ['<code>"w"</code>', 'Write, replacing the file'], ['<code>"a"</code>', 'Append to the end']]),
    K.warn('Calling <code>File.open</code> without a block and forgetting <code>close</code>. Use the block form so the file is always closed.'),
  ]);

  page('ruby_struct_data', () => [
    h2('Struct'),
    p('<code>Struct</code> quickly builds a class with attributes, a constructor, equality and a readable <code>inspect</code>.'),
    K.ruby(`
      Point = Struct.new(:x, :y) do
        def distance_to_origin = Math.sqrt(x**2 + y**2)
      end

      pt = Point.new(3, 4)
      p pt
      puts pt.distance_to_origin
      puts pt == Point.new(3, 4)
      pt.x = 10
      p pt.to_a`, '#<struct Point x=3, y=4>\n5.0\ntrue\n[10, 4]'),
    h2('Data (Ruby 3.2+)'),
    p('<code>Data</code> is like Struct but <b>immutable</b>: there are no setters. Use <code>with</code> to make a changed copy. It is a good fit for value objects.'),
    K.ruby(`
      Money = Data.define(:amount, :currency)

      price = Money.new(amount: 10, currency: "EUR")
      p price
      sale = price.with(amount: 8)
      p sale
      p price.respond_to?(:amount=)
      p Money.new(10, "EUR") == price`, '#<data Money amount=10, currency="EUR">\n#<data Money amount=8, currency="EUR">\nfalse\ntrue'),
    K.tip('Choose <code>Data</code> when the value should never change after it is created, and <code>Struct</code> when you need setters.'),
  ]);

  page('ruby_pattern_matching', () => [
    h2('case ... in'),
    p('Pattern matching (Ruby 3.0+) checks the <b>shape</b> of data and pulls values out of it in one step. It is useful for JSON-like hashes and arrays.'),
    K.ruby(`
      def handle(response)
        case response
        in { status: 200, body: { user: { name: String => name } } }
          "Welcome, #{name}"
        in { status: 404 }
          "Not found"
        in { status: 500.. => code }
          "Server error #{code}"
        end
      end

      puts handle({ status: 200, body: { user: { name: "Ada" } } })
      puts handle({ status: 404 })
      puts handle({ status: 503 })`, 'Welcome, Ada\nNot found\nServer error 503'),
    h2('Arrays and guards'),
    K.ruby(`
      def classify(point)
        case point
        in [0, 0] then "origin"
        in [x, 0] then "on the x axis at #{x}"
        in [x, y] if x == y then "on the diagonal"
        in [Integer, Integer] then "somewhere else"
        end
      end

      puts classify([0, 0])
      puts classify([5, 0])
      puts classify([2, 2])
      puts classify([1, 7])`, 'origin\non the x axis at 5\non the diagonal\nsomewhere else'),
    h2('Check without case'),
    K.ruby(`
      config = { db: { host: "localhost", port: 5432 } }
      config => { db: { port: } }
      puts port
      has_host = (config in { db: { host: String } })
      puts has_host`, '5432\ntrue'),
    K.warn('Forgetting a fallback branch. If no pattern matches, <code>case ... in</code> raises <code>NoMatchingPatternError</code>; add <code>in _</code> or <code>else</code> when other input is possible.'),
  ]);

  page('ruby_frozen', () => [
    h2('freeze'),
    p('<code>freeze</code> makes an object read-only. Changing a frozen object raises <code>FrozenError</code>.'),
    K.ruby(`
      COLORS = %w[red green].freeze
      begin
        COLORS << "blue"
      rescue FrozenError => e
        puts e.message
      end
      p COLORS.frozen?
      p COLORS.first.frozen?`, "can't modify frozen Array: [\"red\", \"green\"]\ntrue\nfalse"),
    p('<code>freeze</code> is shallow: the array is frozen, but the strings inside it are not.'),
    h2('Frozen string literals'),
    p('Symbols, integers and <code>nil</code> are always frozen. With the <code># frozen_string_literal: true</code> comment, every string literal in the file is frozen too, which saves memory because identical literals share one object. Use <code>+""</code> or <code>dup</code> when you need a mutable copy:'),
    K.ruby(`
      # frozen_string_literal: true
      a = "hello"
      b = "hello"
      p a.equal?(b)
      buffer = +""
      buffer << "built "
      buffer << "up"
      p buffer`, 'true\n"built up"'),
    K.tip('Freeze constants that hold arrays or hashes, so no code can change shared configuration by accident.'),
  ]);

  page('ruby_metaprogramming', () => [
    h2('What is metaprogramming?'),
    p('Metaprogramming is code that writes or changes code while the program runs. Rails uses it everywhere: <code>has_many</code>, <code>attr_accessor</code> and <code>validates</code> are ordinary methods that define other methods.'),
    h2('send and public_send'),
    K.ruby(`
      action = "upcase"
      puts "hello".public_send(action)
      puts 5.send(:+, 3)`, 'HELLO\n8'),
    h2('define_method'),
    p('<code>define_method</code> creates methods from data, which removes repetitive code:'),
    K.ruby(`
      class Order
        STATES = %i[pending paid shipped]
        attr_accessor :state

        STATES.each do |s|
          define_method("#{s}?") { state == s }
        end
      end

      order = Order.new
      order.state = :paid
      p order.paid?
      p order.pending?
      p Order.instance_methods(false).sort`, 'true\nfalse\n[:paid?, :pending?, :shipped?, :state, :state=]'),
    h2('Writing a class macro'),
    p('A “macro” is a class method called in the class body. This is how Rails-style declarations work:'),
    K.ruby(`
      module Defaults
        def default(name, value)
          define_method(name) do
            instance_variable_get("@#{name}") || value
          end
        end
      end

      class Settings
        extend Defaults
        default :theme, "light"
        default :page_size, 25
      end

      s = Settings.new
      puts s.theme
      puts s.page_size`, 'light\n25'),
    K.warn('Calling <code>send</code> with a method name that comes from user input. <code>send</code> can call private methods; use <code>public_send</code> and an allow-list.'),
  ]);

  page('ruby_method_missing', () => [
    h2('method_missing'),
    p('When an object receives a message it has no method for, Ruby calls <code>method_missing</code>. Overriding it lets an object answer methods that were never defined.'),
    K.ruby(`
      class Config
        def initialize(values) = @values = values

        def method_missing(name, *args)
          key = name.to_s
          return @values[key] if @values.key?(key)
          super
        end

        def respond_to_missing?(name, include_private = false)
          @values.key?(name.to_s) || super
        end
      end

      cfg = Config.new("host" => "localhost", "port" => 3000)
      puts cfg.host
      puts cfg.respond_to?(:port)
      begin
        cfg.password
      rescue NoMethodError => e
        puts "NoMethodError: #{e.name}"
      end`, 'localhost\ntrue\nNoMethodError: password'),
    K.remember(['Always call <code>super</code> for names you do not handle, so real typos still raise <code>NoMethodError</code>.', 'Always define <code>respond_to_missing?</code> together with <code>method_missing</code>.', 'Prefer <code>define_method</code> when the names are known up front: it is faster and easier to debug.']),
  ]);

  page('ruby_gems', () => [
    h2('What is a gem?'),
    p('A gem is a packaged Ruby library. <code>gem install</code> installs one gem; <b>Bundler</b> installs the exact versions a project needs, listed in its <code>Gemfile</code>.'),
    K.rails(`
      source "https://rubygems.org"

      gem "rails", "~> 8.1"
      gem "puma", ">= 5.0"

      group :development, :test do
        gem "debug"
      end`, { title: 'Gemfile' }),
    K.rails(`
      bundle install
      bundle exec rails --version`, { title: 'Terminal', lang: 'text', result: 'Bundle complete! ...\nRails 8.1.4', label: 'Terminal' }),
    h2('Version constraints'),
    table(['Constraint', 'Means'], [
      ['<code>"8.1.4"</code>', 'Exactly 8.1.4'],
      ['<code>"~&gt; 8.1"</code>', 'At least 8.1 and below 9.0'],
      ['<code>"~&gt; 8.1.2"</code>', 'At least 8.1.2 and below 8.2'],
      ['<code>"&gt;= 5.0"</code>', 'Any version from 5.0 up'],
    ]),
    h2('Gemfile.lock'),
    p('<code>bundle install</code> writes the exact versions it chose to <code>Gemfile.lock</code>. Commit this file, so every developer and the production server run the same versions.'),
    K.tip('Prefix commands with <code>bundle exec</code> (or use the <code>bin/</code> scripts in a Rails app) so they use the project’s gem versions.'),
  ]);

  const quiz = K.mixQuiz([
    { q: 'Which values are falsy in Ruby?', options: ['Only false and nil', 'false, nil, 0 and ""', 'false and 0', 'Only false'], answer: 0 },
    { q: 'What does [1, 2, 3].map { |n| n * 2 } return?', options: ['[2, 4, 6]', '[1, 2, 3]', '12', 'nil'], answer: 0 },
    { q: 'Which keyword closes a method definition?', options: ['end', '}', 'done', 'return'], answer: 0 },
    { q: 'What does attr_accessor :name create?', options: ['name and name= methods', 'Only name', 'Only name=', 'A class variable'], answer: 0 },
    { q: 'What does "abc".equal?("abc") return without frozen string literals?', options: ['false', 'true', 'nil', 'It raises an error'], answer: 0 },
    { q: 'How do you add a module’s methods as instance methods of a class?', options: ['include', 'extend', 'require', 'import'], answer: 0 },
    { q: 'What does a bare rescue catch?', options: ['StandardError and its subclasses', 'Every Exception', 'Only RuntimeError', 'Nothing'], answer: 0 },
    { q: 'What does yield do inside a method?', options: ['Calls the block passed to the method', 'Returns from the method', 'Pauses the thread', 'Defines a block'], answer: 0 },
    { q: 'Which class creates immutable value objects (Ruby 3.2+)?', options: ['Data', 'Struct', 'OpenStruct', 'Hash'], answer: 0 },
    { q: 'What does x ||= 5 do when x is 0?', options: ['Keeps x as 0', 'Sets x to 5', 'Raises an error', 'Sets x to nil'], answer: 0 },
  ]);
  page('ruby_quiz', () => [
    h2('Ruby Quiz'),
    p('Test what you learned in the Ruby tutorial. Choose one answer for each question, then submit.'),
    JT.renderQuiz(quiz, { id: 'ruby-quiz' }),
  ], { after: (main, { wireQuiz }) => wireQuiz(quiz, 70, 'ruby-quiz') });
})();
