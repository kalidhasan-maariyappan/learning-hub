# Standalone verification of corrected Ruby coding answers in this review.
def check(label, expected, actual)
  raise "#{label}: expected #{expected.inspect}, got #{actual.inspect}" unless expected == actual
  puts "PASS #{label}"
end

check('array sum', 72, [1, 2, 34, 5, 6, 7, 8, 9].sum)
check('empty sum', 0, [].sum)
check('odd/even partition', [[1, 3, 5], [2, 4]], [1, 2, 3, 4, 5].partition(&:odd?))

def flatten_hash(hash, prefix = [], out = {})
  hash.each do |key, value|
    parts = prefix + [key.to_s]
    if value.is_a?(Hash)
      flatten_hash(value, parts, out)
    else
      joined = parts.join('_').to_sym
      raise ArgumentError, 'key collision' if out.key?(joined)
      out[joined] = value
    end
  end
  out
end
check('nested flatten', {a_b_c: 42, a_b_d: 'foo', a_d: 'bar', e: 'baz'}, flatten_hash({a: {b: {c: 42, d: 'foo'}, d: 'bar'}, e: 'baz'}))
check('array leaf retained', {a: [1, 2]}, flatten_hash({a: [1, 2]}))

def symbol_callable(name)
  proc { |receiver, *args, **kwargs, &block| receiver.public_send(name, *args, **kwargs, &block) }
end
check('symbol reduction', 120, (1..5).reduce(&symbol_callable(:*)))
check('symbol map', ['RUBY', 'RAILS'], %w[ruby rails].map(&symbol_callable(:upcase)))

input = [{a1: 42, b1: {c1: 'foo'}}, {a2: 43, b2: {c2: 'bar'}}, {a3: 44, b3: {c3: 'baz'}}]
values = input.each_with_index.map do |row, index|
  n = index + 1
  row.dig("b#{n}".to_sym, "c#{n}".to_sym)
end
check('nested values', %w[foo bar baz], values)

class Foo
  class << self
    @foo = 42
  end
end
check('eigenclass state', 42, Foo.singleton_class.instance_variable_get(:@foo))
check('class state distinct', nil, Foo.instance_variable_get(:@foo))
check('class membership', Class, Foo.class)

def hello(name = 'World')
  "Hello, #{name}!"
end
check('explicit default arg', 'Hello, Rails!', hello('Rails'))
check('omitted default arg', 'Hello, World!', hello)

x = [{'a' => 10}, {'b' => 20}, {'c' => 30}]
check('flatten keys', %w[a b c], x.flat_map(&:keys))
check('flatten values', [10, 20, 30], x.flat_map(&:values))
check('int average', 40, (12 + 36 + 72) / 3)
check('intended quoted string', 'YBUR', 'Ruby'.reverse.upcase)
begin
  Ruby.reverse.upcase
  raise 'Expected missing constant NameError'
rescue NameError
  puts 'PASS literal MCQ NameError'
end
puts "Verified using Ruby #{RUBY_VERSION}; Rails examples were reviewed but not executed against an installed Rails application."
