// Ruby control flow (conditions, loops, iterators) and collections (arrays, hashes, ranges, Enumerable).
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Ruby');

  page('ruby_if', () => [
    h2('Ruby If...Else'),
    p('<code>if</code> runs code when a condition is truthy. Add <code>elsif</code> and <code>else</code> for other cases, and close with <code>end</code>.'),
    K.ruby(`
      temperature = 18
      if temperature > 25
        puts "Hot"
      elsif temperature > 15
        puts "Mild"
      else
        puts "Cold"
      end`, 'Mild'),
    h2('if returns a value'),
    p('In Ruby, <code>if</code> is an expression, so you can assign its result:'),
    K.ruby(`
      score = 72
      grade = if score >= 50 then "pass" else "fail" end
      puts grade
      puts score >= 50 ? "pass" : "fail"`, 'pass\npass'),
    K.tip('For a short choice between two values, the ternary operator <code>condition ? a : b</code> is the most common style.'),
    K.warn('Writing <code>else if</code>. Ruby uses <code>elsif</code> (no second “e”).'),
  ], { exercise: { q: 'Print "Adult" when age is 18 or more.', code: '___ age >= 18\n  puts "Adult"\n___', options: ['if', 'end', 'when', 'then'], answer: ['if', 'end'], explain: 'An <code>if</code> block is closed with <code>end</code>.' } });

  page('ruby_unless', () => [
    h2('unless'),
    p('<code>unless</code> is the opposite of <code>if</code>: the code runs when the condition is <b>false</b>.'),
    K.ruby(`
      logged_in = false
      unless logged_in
        puts "Please log in"
      end`, 'Please log in'),
    h2('Statement modifiers'),
    p('A condition can be written after a single statement. This reads like English and is very common for guard clauses:'),
    K.ruby(`
      def withdraw(balance, amount)
        return "Insufficient funds" if amount > balance
        "New balance: #{balance - amount}"
      end

      puts withdraw(100, 30)
      puts withdraw(100, 300)
      puts "Done" unless false`, 'New balance: 70\nInsufficient funds\nDone'),
    K.warn('Using <code>unless</code> with <code>else</code> or with a negative condition (<code>unless !valid</code>). Both are hard to read; use <code>if</code> instead.'),
  ]);

  page('ruby_case', () => [
    h2('case...when'),
    p('<code>case</code> compares one value with several <code>when</code> branches. It replaces long <code>if</code> / <code>elsif</code> chains.'),
    K.ruby(`
      day = "Sat"
      type = case day
             when "Sat", "Sun" then "Weekend"
             when "Mon".."Fri" then "Weekday"
             else "Unknown"
             end
      puts type`, 'Weekend'),
    h2('Matching ranges and classes'),
    p('<code>when</code> uses the <code>===</code> operator, so a branch can be a range, a class or a regular expression:'),
    K.ruby(`
      def describe(value)
        case value
        when Integer then "an integer"
        when 0.0..1.0 then "a fraction"
        when /\\A\\d+\\z/ then "a numeric string"
        when String then "a string"
        else "something else"
        end
      end

      puts describe(5)
      puts describe(0.5)
      puts describe("42")
      puts describe("hi")
      puts describe(nil)`, 'an integer\na fraction\na numeric string\na string\nsomething else'),
    K.tip('For matching the structure of arrays and hashes, see ' + JT.link('ruby_pattern_matching', 'Ruby Pattern Matching') + ' (<code>case ... in</code>).'),
  ]);

  page('ruby_loops', () => [
    h2('while loop'),
    p('<code>while</code> repeats code as long as a condition is true:'),
    K.ruby(`
      i = 1
      while i <= 3
        puts "Count #{i}"
        i += 1
      end`, 'Count 1\nCount 2\nCount 3'),
    h2('until loop'),
    p('<code>until</code> repeats while the condition is false:'),
    K.ruby(`
      stock = 3
      until stock.zero?
        puts "Selling one, #{stock} left"
        stock -= 1
      end
      puts "Sold out"`, 'Selling one, 3 left\nSelling one, 2 left\nSelling one, 1 left\nSold out'),
    h2('loop'),
    p('<code>loop</code> runs forever until you <code>break</code>:'),
    K.ruby(`
      n = 0
      loop do
        n += 1
        break if n == 4
      end
      puts n`, '4'),
    K.tip('Ruby developers rarely write <code>while</code> or <code>for</code> loops to walk through a collection. They use iterators such as <code>each</code> — see the next lesson.'),
  ]);

  page('ruby_iterators', () => [
    h2('Iterators'),
    p('An iterator is a method that calls a block once for each item. This is the normal way to loop in Ruby.'),
    K.ruby(`
      3.times { |i| puts "Hello #{i}" }

      ["tea", "coffee"].each do |drink|
        puts "I like #{drink}"
      end`, 'Hello 0\nHello 1\nHello 2\nI like tea\nI like coffee'),
    h2('Counting iterators'),
    K.ruby(`
      1.upto(3) { |n| print n, " " }
      puts
      10.step(30, 10) { |n| print n, " " }
      puts
      %w[a b c].each_with_index { |letter, i| puts "#{i}: #{letter}" }`, '1 2 3 \n10 20 30 \n0: a\n1: b\n2: c'),
    h2('{ } or do...end?'),
    p('Both create a block. By convention, use <code>{ }</code> for a one-line block and <code>do ... end</code> for a block with several lines.'),
    K.remember(['<code>each</code> returns the original collection, not the block results.', 'Use <code>map</code> when you want a new array of results (see ' + JT.link('ruby_enumerable', 'Enumerable') + ').', '<code>%w[a b c]</code> is a short way to write <code>["a", "b", "c"]</code>.']),
  ]);

  page('ruby_break_next', () => [
    h2('break'),
    p('<code>break</code> stops the loop immediately. It can also return a value from the loop:'),
    K.ruby(`
      numbers = [3, 8, 12, 5]
      first_big = numbers.each do |n|
        break n if n > 10
      end
      puts first_big`, '12'),
    h2('next'),
    p('<code>next</code> skips to the next item:'),
    K.ruby(`
      (1..6).each do |n|
        next if n.odd?
        puts n
      end`, '2\n4\n6'),
    K.tip('Inside a block, use <code>next</code> to finish the current item early. Using <code>return</code> there returns from the method that contains the block.'),
  ]);

  page('ruby_arrays', () => [
    h2('Ruby Arrays'),
    p('An array is an ordered list. It can hold values of any type, and it grows as you add items.'),
    K.ruby(`
      fruits = ["apple", "banana", "cherry"]
      puts fruits[0]
      puts fruits[-1]
      puts fruits.length
      p fruits.first(2)`, 'apple\ncherry\n3\n["apple", "banana"]'),
    h2('Add and remove items'),
    K.ruby(`
      stack = [1, 2]
      stack << 3
      stack.push(4)
      p stack
      p stack.pop
      p stack.shift
      stack.unshift(0)
      p stack`, '[1, 2, 3, 4]\n4\n1\n[0, 2, 3]'),
    h2('Reading outside the array'),
    p('Reading an index that does not exist returns <code>nil</code>. <code>fetch</code> raises an error instead, or returns a default:'),
    K.ruby(`
      list = [10, 20]
      p list[5]
      p list.fetch(5, "none")`, 'nil\n"none"'),
  ], { exercise: { q: 'Add "kiwi" to the end of the array.', code: 'fruits = ["apple"]\nfruits ___ "kiwi"', options: ['<<', '+=', '>>', '.add'], answer: ['<<'], explain: '<code>&lt;&lt;</code> (or <code>push</code>) appends to an array.' } });

  page('ruby_array_methods', () => [
    h2('Useful array methods'),
    K.ruby(`
      nums = [5, 3, 8, 3, 1]
      p nums.sort
      p nums.uniq
      p nums.include?(8)
      p nums.sum
      p nums.max
      p nums.count(3)
      p nums.reverse`, '[1, 3, 3, 5, 8]\n[5, 3, 8, 1]\ntrue\n20\n8\n2\n[1, 3, 8, 3, 5]'),
    h2('Combine arrays'),
    K.ruby(`
      a = [1, 2, 3]
      b = [2, 3, 4]
      p a + b
      p a - b
      p a & b
      p a | b
      p [[1, 2], [3]].flatten
      p a.join("-")`, '[1, 2, 3, 2, 3, 4]\n[1]\n[2, 3]\n[1, 2, 3, 4]\n[1, 2, 3]\n"1-2-3"'),
    h2('Slicing and grouping'),
    K.ruby(`
      letters = %w[a b c d e]
      p letters[1..3]
      p letters.each_slice(2).to_a
      p [nil, 1, nil, 2].compact`, '["b", "c", "d"]\n[["a", "b"], ["c", "d"], ["e"]]\n[1, 2]'),
  ]);

  page('ruby_hashes', () => [
    h2('Ruby Hashes'),
    p('A hash stores key-value pairs. Keys are usually symbols. Hashes keep the order in which keys were inserted.'),
    K.ruby(`
      user = { name: "Ada", age: 36 }
      puts user[:name]
      user[:city] = "London"
      user[:age] += 1
      p user
      p user[:email]`, 'Ada\n{name: "Ada", age: 37, city: "London"}\nnil'),
    h2('Loop through a hash'),
    K.ruby(`
      prices = { tea: 3, cake: 5 }
      prices.each do |item, price|
        puts "#{item} costs #{price}"
      end`, 'tea costs 3\ncake costs 5'),
    h2('Default values'),
    p('<code>Hash.new(0)</code> returns 0 for missing keys, which makes counting easy:'),
    K.ruby(`
      counts = Hash.new(0)
      "banana".each_char { |c| counts[c] += 1 }
      p counts`, '{"b" => 1, "a" => 3, "n" => 2}'),
    K.warn('Mixing string and symbol keys. <code>user["name"]</code> and <code>user[:name]</code> are different keys.'),
  ]);

  page('ruby_hash_methods', () => [
    h2('Useful hash methods'),
    K.ruby(`
      stock = { apples: 4, pears: 0, plums: 7 }
      p stock.keys
      p stock.values
      p stock.key?(:pears)
      p stock.fetch(:kiwis, 0)
      p stock.select { |_, qty| qty > 0 }
      p stock.transform_values { |qty| qty * 2 }
      p stock.sum { |_, qty| qty }`, '[:apples, :pears, :plums]\n[4, 0, 7]\ntrue\n0\n{apples: 4, plums: 7}\n{apples: 8, pears: 0, plums: 14}\n11'),
    h2('Merge and dig'),
    K.ruby(`
      defaults = { color: "blue", size: "M" }
      options = defaults.merge(size: "L")
      p options
      config = { db: { primary: { host: "localhost" } } }
      p config.dig(:db, :primary, :host)
      p config.dig(:db, :replica, :host)`, '{color: "blue", size: "L"}\n"localhost"\nnil'),
    K.tip('<code>dig</code> safely reads nested hashes. It returns <code>nil</code> instead of raising when a level is missing.'),
  ]);

  page('ruby_ranges', () => [
    h2('Ruby Ranges'),
    p('A range represents a sequence from a start to an end. <code>..</code> includes the end; <code>...</code> excludes it.'),
    K.ruby(`
      p (1..5).to_a
      p (1...5).to_a
      p ("a".."e").to_a
      p (1..10).include?(7)
      p (1..10).step(3).to_a`, '[1, 2, 3, 4, 5]\n[1, 2, 3, 4]\n["a", "b", "c", "d", "e"]\ntrue\n[1, 4, 7, 10]'),
    h2('Endless ranges'),
    p('A range can leave out its start or end. This is handy for slicing and for conditions:'),
    K.ruby(`
      list = [10, 20, 30, 40]
      p list[2..]
      age = 70
      puts "senior" if (65..).cover?(age)`, '[30, 40]\nsenior'),
  ]);

  page('ruby_enumerable', () => [
    h2('Enumerable'),
    p('<code>Enumerable</code> is a module included by Array, Hash and Range. It gives every collection the same set of methods.'),
    K.ruby(`
      nums = [1, 2, 3, 4, 5, 6]
      p nums.map { |n| n * n }
      p nums.select(&:even?)
      p nums.reject(&:even?)
      p nums.find { |n| n > 3 }
      p nums.reduce(:+)
      p nums.partition { |n| n < 4 }`, '[1, 4, 9, 16, 25, 36]\n[2, 4, 6]\n[1, 3, 5]\n4\n21\n[[1, 2, 3], [4, 5, 6]]'),
    p('<code>&amp;:even?</code> is a short form of <code>{ |n| n.even? }</code>.'),
    h2('Grouping and sorting'),
    K.ruby(`
      words = %w[apple avocado banana blueberry cherry]
      p words.group_by { |w| w[0] }
      p words.sort_by(&:length)
      p words.map(&:length).tally
      p words.each_with_object(Hash.new(0)) { |w, h| h[w.size] += 1 }`, '{"a" => ["apple", "avocado"], "b" => ["banana", "blueberry"], "c" => ["cherry"]}\n["apple", "banana", "cherry", "avocado", "blueberry"]\n{5 => 1, 7 => 1, 6 => 2, 9 => 1}\n{5 => 1, 7 => 1, 6 => 2, 9 => 1}'),
    h2('Lazy enumerators'),
    p('<code>lazy</code> processes items one at a time, so it works with very large or infinite sequences:'),
    K.ruby(`
      p (1..Float::INFINITY).lazy.map { |n| n * 2 }.select { |n| n % 3 == 0 }.first(3)`, '[6, 12, 18]'),
    K.remember(['<code>map</code> transforms, <code>select</code>/<code>reject</code> filter, <code>reduce</code> combines.', '<code>find</code> stops at the first match.', 'Any class with an <code>each</code> method can include Enumerable — see ' + JT.link('ruby_mixins', 'Ruby Mixins') + '.']),
  ]);
})();
