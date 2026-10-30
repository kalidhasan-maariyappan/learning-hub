// Ruby Tutorial: getting started, syntax, variables, data types, strings and operators.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Ruby');

  page('ruby_home', () => [
    h2('Learn Ruby'),
    p('Ruby is a dynamic, object-oriented programming language designed to make programmers happy. It is the language behind Ruby on Rails, and it is used for web applications, scripts, automation and command-line tools.'),
    p('This tutorial teaches Ruby from the first line of code to the topics experienced developers are asked about in interviews: blocks, modules, mixins, metaprogramming and object equality.'),
    K.ruby(`
      puts "Hello, World!"`, 'Hello, World!', 'Example'),
    p('Click <b>Run here</b> to run the example with the Ruby installed on this computer, or <b>Try it Yourself</b> to edit it.'),
    h2('Learning path'),
    ul([
      '<b>Ruby Tutorial</b> — syntax, variables, strings, numbers and operators.',
      '<b>Control Flow</b> — conditions, loops and iterators.',
      '<b>Collections</b> — arrays, hashes, ranges and the Enumerable methods.',
      '<b>Methods and Blocks</b> — arguments, blocks, procs and lambdas.',
      '<b>Object-Oriented Ruby</b> — classes, modules, mixins and equality.',
      '<b>Ruby Advanced</b> — exceptions, files, pattern matching and metaprogramming.',
    ]),
    p('When you finish, continue with the ' + JT.link('rails_home', 'Ruby on Rails tutorial') + '.'),
  ]);

  page('ruby_intro', () => [
    h2('What is Ruby?'),
    p('Ruby is a programming language created by Yukihiro “Matz” Matsumoto and first released in 1995. It is:'),
    ul(['<b>Interpreted</b> — you run a <code>.rb</code> file directly; there is no separate compile step.',
      '<b>Dynamically typed</b> — a variable can hold any kind of value, and types are checked while the program runs.',
      '<b>Purely object-oriented</b> — every value, even <code>5</code> or <code>nil</code>, is an object with methods.',
      '<b>Expressive</b> — blocks and iterators let you write short, readable code.']),
    K.ruby(`
      puts 5.class
      puts 5.even?
      puts nil.class
      puts "ruby".upcase`, 'Integer\nfalse\nNilClass\nRUBY'),
    h2('What can Ruby do?'),
    ul(['Build web applications with Ruby on Rails or Sinatra.', 'Write scripts that process files and automate tasks.', 'Create command-line tools and DevOps tooling.', 'Write tests and test frameworks (RSpec, Minitest).']),
    K.tip('In Ruby, methods that return true or false usually end with <code>?</code>, like <code>even?</code> and <code>empty?</code>.'),
  ]);

  page('ruby_get_started', () => [
    h2('Install Ruby'),
    p('Check whether Ruby is installed by opening a terminal and typing:'),
    K.rails('ruby -v', { title: 'Terminal', lang: 'text', result: 'ruby 3.4.10 (2026-06-30 revision 2b0b7728dc) +PRISM [x64-mingw-ucrt]', label: 'Terminal' }),
    p('If it is not installed: on Windows use <a href="https://rubyinstaller.org/">RubyInstaller</a> (choose the version <i>with Devkit</i>); on macOS and Linux use a version manager such as <code>rbenv</code> or <code>mise</code>. Rails 8.1 needs Ruby 3.2 or newer.'),
    h2('Run a Ruby file'),
    p('Save this code as <code>hello.rb</code>:'),
    K.ruby(`
      puts "Hello from a file!"`, 'Hello from a file!'),
    p('Then run it from the terminal:'),
    K.rails('ruby hello.rb', { title: 'Terminal', lang: 'text', result: 'Hello from a file!', label: 'Terminal' }),
    h2('Interactive Ruby (irb)'),
    p('<code>irb</code> runs Ruby one line at a time and prints the value of each expression. It is the quickest way to try something:'),
    K.rails(`
      irb
      irb(main):001> 2 + 3
      => 5
      irb(main):002> "abc".reverse
      => "cba"`, { title: 'Terminal', lang: 'text' }),
    K.tip('Type <code>exit</code> to leave irb.'),
  ]);

  page('ruby_syntax', () => [
    h2('Ruby Syntax'),
    p('A Ruby program is a list of statements, usually one per line. You do not need semicolons or a <code>main</code> method.'),
    K.ruby(`
      name = "Ruby"
      year = 1995
      puts "#{name} was released in #{year}"`, 'Ruby was released in 1995'),
    h2('Blocks of code end with end'),
    p('Ruby does not use curly braces for methods, classes and conditions. A block starts with a keyword such as <code>def</code>, <code>if</code> or <code>class</code> and ends with <code>end</code>. Indent with two spaces.'),
    K.ruby(`
      def greet(name)
        if name.empty?
          "Hello, stranger"
        else
          "Hello, #{name}"
        end
      end

      puts greet("Ada")
      puts greet("")`, 'Hello, Ada\nHello, stranger'),
    h2('Parentheses are optional'),
    p('Parentheses around method arguments can be left out when the code stays clear. <code>puts("Hi")</code> and <code>puts "Hi"</code> do the same thing.'),
    K.remember(['Ruby is case-sensitive: <code>name</code> and <code>Name</code> are different.', 'Local variables and methods use <code>snake_case</code>; classes and modules use <code>CamelCase</code>.', 'The last expression in a method is its return value.']),
  ], { exercise: { q: 'Complete the method so it ends correctly.', code: 'def hello\n  puts "Hi"\n___', options: ['end', '}', 'done', 'fi'], answer: ['end'], explain: 'Every <code>def</code>, <code>if</code>, <code>class</code> and <code>do</code> block is closed with <code>end</code>.' } });

  page('ruby_output', () => [
    h2('Print text'),
    p('Ruby has three common ways to print:'),
    table(['Method', 'What it does'], [
      ['<code>puts</code>', 'Prints each argument followed by a new line.'],
      ['<code>print</code>', 'Prints without adding a new line.'],
      ['<code>p</code>', 'Prints the <code>inspect</code> form — strings keep their quotes. Useful for debugging.'],
    ]),
    K.ruby(`
      puts "Hello"
      print "One "
      print "line"
      puts
      p "Hello"
      p [1, nil, "two"]`, 'Hello\nOne line\n"Hello"\n[1, nil, "two"]'),
    h2('puts with arrays'),
    p('<code>puts</code> prints each element of an array on its own line:'),
    K.ruby(`
      puts ["red", "green", "blue"]`, 'red\ngreen\nblue'),
    K.tip('Use <code>p</code> when you want to see exactly what a value is, for example the difference between <code>nil</code> and an empty string.'),
  ]);

  page('ruby_comments', () => [
    h2('Single-line comments'),
    p('A comment starts with <code>#</code>. Ruby ignores everything after it on that line.'),
    K.ruby(`
      # This line is a comment
      puts "Hello" # a comment after code`, 'Hello'),
    h2('Multi-line comments'),
    p('Use several <code>#</code> lines. Ruby also supports <code>=begin</code> / <code>=end</code>, but most Ruby code uses <code>#</code> on each line.'),
    K.ruby(`
      # Calculates the total price
      # including 20% tax.
      price = 50
      puts price * 1.2`, '60.0'),
    h2('The magic comment'),
    p('A special comment on the first line changes how the file behaves. The most common one makes every string literal in the file frozen (read-only):'),
    K.ruby(`
      # frozen_string_literal: true
      name = "ruby"
      puts name.frozen?`, 'true'),
  ]);

  page('ruby_variables', () => [
    h2('Create a variable'),
    p('A variable is created the first time you assign a value to it. There is no type declaration.'),
    K.ruby(`
      name = "Alice"
      age = 30
      puts name
      puts age`, 'Alice\n30'),
    h2('Variables can change type'),
    p('A variable holds a reference to an object, and you can point it at a different object of any type:'),
    K.ruby(`
      x = 10
      puts x.class
      x = "ten"
      puts x.class`, 'Integer\nString'),
    h2('Kinds of variables'),
    p('The first character of the name tells you the scope of a variable:'),
    table(['Form', 'Kind', 'Example'], [
      ['<code>name</code>', 'Local variable', '<code>count = 1</code>'],
      ['<code>@name</code>', 'Instance variable (one per object)', '<code>@balance = 0</code>'],
      ['<code>@@name</code>', 'Class variable (shared by a class and its subclasses)', '<code>@@count = 0</code>'],
      ['<code>$name</code>', 'Global variable', '<code>$stdout</code>'],
      ['<code>NAME</code>', 'Constant (starts with a capital letter)', '<code>MAX_SIZE = 100</code>'],
    ]),
    h2('Multiple assignment'),
    K.ruby(`
      a, b = 1, 2
      a, b = b, a
      puts "a=#{a} b=#{b}"`, 'a=2 b=1'),
    K.warn('Reassigning a constant only prints a warning; it does not stop the program. Constants are a convention, not a guarantee.'),
  ], { exercise: { q: 'Create a variable called <code>city</code> with the value "Paris".', code: '___ = "Paris"\nputs city', options: ['city', '@city', 'City', '$city'], answer: ['city'], explain: 'A local variable starts with a lowercase letter or underscore.' } });

  page('ruby_data_types', () => [
    h2('Built-in data types'),
    p('Every value in Ruby is an object, and <code>.class</code> tells you its type:'),
    K.ruby(`
      p 42.class
      p 3.14.class
      p "text".class
      p :status.class
      p true.class
      p nil.class
      p [1, 2].class
      p({ a: 1 }.class)
      p (1..5).class`, 'Integer\nFloat\nString\nSymbol\nTrueClass\nNilClass\nArray\nHash\nRange'),
    table(['Type', 'Example', 'Used for'], [
      ['Integer', '<code>42</code>', 'Whole numbers of any size'], ['Float', '<code>3.14</code>', 'Decimal numbers'],
      ['String', '<code>"hello"</code>', 'Text'], ['Symbol', '<code>:status</code>', 'Names and hash keys'],
      ['true / false', '<code>true</code>', 'Booleans'], ['nil', '<code>nil</code>', 'No value'],
      ['Array', '<code>[1, 2, 3]</code>', 'Ordered lists'], ['Hash', '<code>{ name: "Ada" }</code>', 'Key-value pairs'],
      ['Range', '<code>1..5</code>', 'Sequences of values'],
    ]),
    K.tip('Use <code>is_a?</code> to check a type: <code>42.is_a?(Integer)</code> returns <code>true</code>.'),
  ]);

  page('ruby_numbers', () => [
    h2('Integers and floats'),
    K.ruby(`
      puts 7 + 3
      puts 7 / 2
      puts 7 / 2.0
      puts 7 % 3
      puts 2 ** 10`, '10\n3\n3.5\n1\n1024'),
    p('Dividing two integers gives an integer (the result is rounded down). Make one side a float to get a decimal result.'),
    h2('Number methods'),
    K.ruby(`
      puts 3.7.round
      puts 3.14159.round(2)
      puts 3.7.floor
      puts -5.abs
      puts 10.between?(1, 20)
      puts 1_000_000`, '4\n3.14\n3\n5\ntrue\n1000000'),
    h2('Floats are not exact'),
    p('Floats use binary floating point, so some decimals cannot be stored exactly. Use <code>BigDecimal</code> or integer cents for money:'),
    K.ruby(`
      require "bigdecimal"
      puts 0.1 + 0.2
      puts BigDecimal("0.1") + BigDecimal("0.2") == BigDecimal("0.3")`, '0.30000000000000004\ntrue'),
    K.warn('Storing prices as floats. Use integer cents or <code>BigDecimal</code> (Rails maps <code>decimal</code> columns to BigDecimal).'),
  ]);

  page('ruby_strings', () => [
    h2('Create a string'),
    p('Strings can use double or single quotes. Only double-quoted strings support <b>interpolation</b> with <code>#{...}</code> and escape sequences such as <code>\\n</code>.'),
    K.ruby(`
      name = "Ruby"
      puts "Hello, #{name}!"
      puts 'Hello, #{name}!'
      puts "Tab:\\tdone"`, 'Hello, Ruby!\nHello, #{name}!\nTab:\tdone'),
    h2('Join strings'),
    K.ruby(`
      first = "Ada"
      last = "Lovelace"
      puts first + " " + last
      puts "#{first} #{last}"
      puts "ha" * 3`, 'Ada Lovelace\nAda Lovelace\nhahaha'),
    h2('Strings are mutable'),
    p('<code>&lt;&lt;</code> appends to the same string object, while <code>+</code> creates a new string:'),
    K.ruby(`
      text = "Hello"
      text << " World"
      puts text
      puts text.length`, 'Hello World\n11'),
    h2('Multi-line strings (heredoc)'),
    K.ruby(`
      message = <<~TEXT
        Dear user,
        Your order has shipped.
      TEXT
      puts message`, 'Dear user,\nYour order has shipped.'),
    K.tip('<code>&lt;&lt;~</code> removes the common indentation, so the heredoc can be indented with your code.'),
  ]);

  page('ruby_string_methods', () => [
    h2('Common string methods'),
    K.ruby(`
      s = "  Hello Ruby  "
      p s.strip
      p s.strip.upcase
      p s.strip.downcase
      p s.strip.length
      p s.include?("Ruby")
      p s.strip.start_with?("Hello")
      p s.strip.sub("Ruby", "World")
      p s.split`, '"Hello Ruby"\n"HELLO RUBY"\n"hello ruby"\n10\ntrue\ntrue\n"Hello World"\n["Hello", "Ruby"]'),
    h2('Access characters'),
    K.ruby(`
      word = "Ruby"
      p word[0]
      p word[-1]
      p word[1, 2]
      p word.chars
      p word.reverse`, '"R"\n"y"\n"ub"\n["R", "u", "b", "y"]\n"ybuR"'),
    h2('Bang methods (!)'),
    p('Many methods have a version ending in <code>!</code> that changes the string itself instead of returning a new one:'),
    K.ruby(`
      name = "ada"
      name.capitalize
      p name
      name.capitalize!
      p name`, '"ada"\n"Ada"'),
    K.warn('Expecting <code>name.capitalize</code> to change <code>name</code>. Without <code>!</code> the method returns a new string and leaves the original alone.'),
  ]);

  page('ruby_symbols', () => [
    h2('What is a symbol?'),
    p('A symbol is a name written with a leading colon, like <code>:status</code>. Symbols are immutable, and every use of the same symbol is the same object.'),
    K.ruby(`
      p :status.object_id == :status.object_id
      p "status".object_id == "status".object_id
      p :status.to_s
      p "status".to_sym`, 'true\nfalse\n"status"\n:status'),
    h2('Symbols as hash keys'),
    p('Symbols are the usual choice for hash keys and option names, because they are cheap to compare:'),
    K.ruby(`
      user = { name: "Ada", role: :admin }
      puts user[:name]
      puts user[:role] == :admin`, 'Ada\ntrue'),
    K.remember(['Use a symbol for an identifier or name; use a string for text that is displayed or changed.', '<code>{ name: "Ada" }</code> is short for <code>{ :name => "Ada" }</code>.']),
  ]);

  page('ruby_booleans', () => [
    h2('true, false and nil'),
    p('In a condition, Ruby treats only <code>false</code> and <code>nil</code> as false. Everything else is <b>truthy</b> — including <code>0</code>, <code>""</code> and <code>[]</code>.'),
    K.ruby(`
      [0, "", [], nil, false].each do |value|
        puts "#{value.inspect} is #{value ? "truthy" : "falsy"}"
      end`, '0 is truthy\n"" is truthy\n[] is truthy\nnil is falsy\nfalse is falsy'),
    h2('nil and safe navigation'),
    p('<code>nil</code> means “no value”. Calling a method on <code>nil</code> raises <code>NoMethodError</code>. The safe navigation operator <code>&amp;.</code> returns <code>nil</code> instead:'),
    K.ruby(`
      user = nil
      p user&.name
      p user.nil?
      name = user&.name || "Guest"
      puts name`, 'nil\ntrue\nGuest'),
    K.warn('Coming from other languages and testing <code>if count == 0</code> by writing <code>if count</code>. In Ruby <code>0</code> is truthy, so <code>if count</code> is always true for a number.'),
  ]);

  page('ruby_operators', () => [
    h2('Comparison operators'),
    K.ruby(`
      p 5 == 5.0
      p 5.eql?(5.0)
      p 5 != 3
      p 5 <=> 3
      p 3 <=> 5
      p "a" < "b"`, 'true\nfalse\ntrue\n1\n-1\ntrue'),
    p('<code>&lt;=&gt;</code> (the “spaceship” operator) returns -1, 0 or 1. Sorting and <code>Comparable</code> are built on it.'),
    h2('Logical operators'),
    K.ruby(`
      p true && false
      p true || false
      p !true
      p nil || "default"
      p "first" && "second"`, 'false\ntrue\nfalse\n"default"\n"second"'),
    p('<code>||</code> and <code>&amp;&amp;</code> return one of their operands, not just true or false. That is why <code>value || "default"</code> works.'),
    h2('Assignment shortcuts'),
    K.ruby(`
      count = 1
      count += 2
      puts count
      cache = nil
      cache ||= "computed"
      cache ||= "ignored"
      puts cache`, '3\ncomputed'),
    K.tip('<code>a ||= b</code> assigns only when <code>a</code> is <code>nil</code> or <code>false</code>. It is the common way to memoize a value.'),
  ]);

  page('ruby_conversion', () => [
    h2('Convert between types'),
    K.ruby(`
      p "42".to_i
      p "3.5".to_f
      p 42.to_s
      p "abc".to_i
      p [1, 2].to_s
      p nil.to_a`, '42\n3.5\n"42"\n0\n"[1, 2]"\n[]'),
    p('The <code>to_*</code> methods never raise: <code>"abc".to_i</code> quietly returns 0.'),
    h2('Strict conversion'),
    p('Use <code>Integer()</code> and <code>Float()</code> when invalid input should be an error:'),
    K.ruby(`
      p Integer("42")
      begin
        Integer("abc")
      rescue ArgumentError => e
        puts e.message
      end`, '42\ninvalid value for Integer(): "abc"'),
    K.warn('Using <code>to_i</code> on user input and treating 0 as a real value. Use <code>Integer(input, exception: false)</code>, which returns <code>nil</code> for invalid input.'),
  ]);

  page('ruby_input', () => [
    h2('Read input'),
    p('<code>gets</code> reads one line from standard input, including the trailing new line. <code>chomp</code> removes it.'),
    K.ruby(`
      print "What is your name? "
      name = gets.chomp
      puts "Hello, #{name}!"`, 'What is your name? Hello, Ada!', 'Example', { stdin: 'Ada' }),
    p('In the example, the input <code>Ada</code> is sent to the program. Open the example with <b>Try it Yourself</b> and change the text in <i>Program input</i>.'),
    h2('Read numbers'),
    K.ruby(`
      a = gets.to_i
      b = gets.to_i
      puts "Sum: #{a + b}"`, 'Sum: 12', 'Example', { stdin: '5\n7' }),
  ]);
})();
