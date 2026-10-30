require 'json'
records = JSON.parse(File.read(File.join(__dir__, 'records.json')))
checked = 0
records.each do |record|
  next unless record['exampleLanguage'] == 'ruby'
  RubyVM::InstructionSequence.compile(record['example'])
  checked += 1
end
checks = 0
def assert_equal(expected, actual)
  raise "Expected #{expected.inspect}, received #{actual.inspect}" unless expected == actual
end
assert_equal(%w[banana orange grapes kiwi], %w[apple banana orange grapes kiwi].select { |s| s.length.even? }); checks += 1
assert_equal(6, 'Ruby is a powerful programming language'.split.length); checks += 1
counts = 'This is a sample sentence. This is another sample sentence.'.split.map(&:downcase).tally
assert_equal(2, counts['sentence.']); checks += 1
x = 10; reader = proc { x }; x = 20
assert_equal(20, reader.call); checks += 1
a = true and false
b = true && false
assert_equal([true, false], [a, b]); checks += 1
original = ['x'].freeze
assert_equal([false, true, true], [original.dup.frozen?, original.clone.frozen?, original.clone[0].equal?(original[0])]); checks += 1
class Parent
  def call; helper; end
  private
  def helper; :parent; end
end
class Child < Parent
  private
  def helper; :child; end
end
assert_equal(:child, Child.new.call); checks += 1
class Person; end
Person.class_eval { def greet; :instance; end }
Person.instance_eval { def kind; :class_object; end }
assert_equal([:instance, :class_object], [Person.new.greet, Person.kind]); checks += 1
n = 10
fib = (0...n).reduce([]) { |values, _| values << (values.length < 2 ? values.length : values[-1] + values[-2]) }
assert_equal([0,1,1,2,3,5,8,13,21,34], fib); checks += 1
def prime?(n)
  return false unless n.is_a?(Integer) && n >= 2
  (2..Integer.sqrt(n)).none? { |d| n % d == 0 }
end
assert_equal([2,3,5,7], (0..10).select { |n| prime?(n) }); checks += 1
module ClosureOwner
  def self.make; proc { self }; end
end
assert_equal(ClosureOwner, ClosureOwner.make.call); checks += 1
puts JSON.generate({ruby_version: RUBY_VERSION, ruby_engine: RUBY_ENGINE, syntax_checked: checked, correction_assertions: checks, failures: 0})
