require_relative 'algorithms'
require 'tempfile'
CHECKS = []
def check(name)
  raise "FAILED: #{name}" unless yield
  CHECKS << name
end
Node = Struct.new(:value, :next)
Tree = Struct.new(:value, :left, :right)
check('1 fibonacci') { fibonacci(0) == 0 && fibonacci(10) == 55 }
begin
  fibonacci(-1)
  raise 'negative Fibonacci accepted'
rescue ArgumentError
  CHECKS << '1 negative input'
end
check('2 cycle detection') do
  a = Node.new(1); b = Node.new(2); a.next = b
  acyclic = !cyclic?(a)
  b.next = a
  acyclic && cyclic?(a) && !cyclic?(nil)
end
check('3 coin combinations') { change_ways(4, [1, 2, 3]) == 4 && change_ways(0, [2]) == 1 && change_ways(3, [2]) == 0 }
check('4 queue order across transfer') do
  q = TwoStackQueue.new
  q.push(1).push(2)
  first = q.shift
  q.push(3)
  [first, q.shift, q.shift] == [1, 2, 3]
end
check('5 rectangle overlap') do
  a = {x: 0, y: 0, width: 3, height: 3}
  b = {x: 2, y: 1, width: 3, height: 3}
  overlap_area(a, b) == 2 && overlap_area(a, b.merge(x: 3)) == 0
end
check('6 temperature summaries') do
  t = TemperatureTracker.new
  empty = t.mean.nil?
  [10, 20, 20].each { |n| t.insert(n) }
  empty && t.min == 10 && t.max == 20 && t.mode == 20 && (t.mean - 50.0/3).abs < 0.00001
end
root = Tree.new(5, Tree.new(3, Tree.new(1), Tree.new(4)), Tree.new(8, Tree.new(7), Tree.new(9)))
check('7 superbalanced standard variant') do
  valid = superbalanced?(root)
  chain = Tree.new(0, Tree.new(1, Tree.new(2, Tree.new(3))), Tree.new(4))
  valid && !superbalanced?(chain)
end
check('8 BST global bounds') do
  invalid = Tree.new(5, Tree.new(3, nil, Tree.new(6)), Tree.new(8))
  valid_bst?(root) && !valid_bst?(invalid)
end
check('9 second largest') { second_largest(root) == 8 && second_largest(Tree.new(2, Tree.new(1))) == 1 }
check('10 trie exact membership') do
  t = {}; trie_insert(t, 'ruby'); trie_insert(t, '')
  trie_include?(t, 'ruby') && !trie_include?(t, 'rub') && trie_include?(t, '')
end
check('11 binary search') { binary_include?([1,3,5], 3) && !binary_include?([1,3,5], 2) && !binary_include?([], 1) }
check('12 rotation') { rotation_index([4,5,6,1,2,3]) == 3 && rotation_index([1,2,3]) == 0 && rotation_index([]).nil? }
check('13 movies distinct indices') { movie_pair?([60,90,120],180) && !movie_pair?([90],180) && movie_pair?([90,90],180) }
check('14 unbounded knapsack and zero weights') { cake_value([[3,40],[5,70]],10) == 140 && cake_value([[0,1]],0).infinite? && cake_value([[0,0]],5) == 0 }
check('15 repeated stack maxima') do
  s = MaxStack.new; s.push(3).push(7).push(7)
  s.pop; first=s.max; s.pop
  first == 7 && s.max == 3
end
check('16 xor uniqueness') { unique_id([4,2,4,7,2]) == 7 }
check('17 deletion by successor copy') do
  c = Node.new(3); b = Node.new(2,c); a=Node.new(1,b)
  delete_non_tail(b)
  a.next.value == 3 && a.next.next.nil?
end
check('18 linked list reversal') do
  c=Node.new(3);b=Node.new(2,c);a=Node.new(1,b)
  h=reverse_list(a)
  h.equal?(c) && h.next.equal?(b) && b.next.equal?(a) && a.next.nil?
end
check('19 kth from end') do
  c=Node.new(3);b=Node.new(2,c);a=Node.new(1,b)
  kth_last(a,1).equal?(c) && kth_last(a,3).equal?(a)
end
check('20 ASCII string reversal') { reverse_ascii!(+'ruby') == 'ybur' && reverse_ascii!(+'') == '' }
check('21 ASCII words') { reverse_words_ascii!(+'cake thief') == 'thief cake' && reverse_words_ascii!(+' a  b ') == ' b  a ' }
check('22 matching parenthesis') { closing_parenthesis('a(b(c)d)e',1) == 7 }
check('23 bracket nesting') { valid_brackets?('{a:[()]}') && !valid_brackets?('([)]') && !valid_brackets?('(') }
check('24 palindrome permutations') { palindrome_permutation?('civic') && !palindrome_permutation?('civil') && palindrome_permutation?('') }
check('25 unique recursive permutations') { permutations('aba').sort == ['aab','aba','baa'] && permutations('') == [''] }
check('26 bounded score sort') { sort_scores([30,10,30,20],100) == [30,30,20,10] }
check('27 single extra duplicate') { one_duplicate_sum([1,2,3,2]) == 2 }
check('28 word count policy') { word_counts('Ruby, ruby!') == {'ruby'=>2} && word_counts('It’s useful.') == {'it’s'=>1,'useful'=>1} }
check('29 shuffle preserves elements') { shuffle!([1,2,3,4],Random.new(123)).sort == [1,2,3,4] }
check('30 cafe order') { first_come_first_served?([1,3],[2,4],[1,2,3,4]) && !first_come_first_served?([1,3],[2,4],[3,1,2,4]) }
check('31 rejection sampling 7 to 5') do
  values=[7,6,4]
  five_from_seven(-> { values.shift }) == 4
end
check('32 rejection and uniform accepted pairs 5 to 7') do
  results=(0...21).map do |number|
    values=[number/5+1,number%5+1]
    seven_from_five(-> { values.shift })
  end
  values=[5,5,1,1]
  results.tally == (1..7).to_h { |n| [n,3] } && seven_from_five(-> {values.shift}) == 1
end
check('33 two eggs') { two_egg_worst_case(100) == 14 && two_egg_worst_case(0) == 0 && two_egg_worst_case(1) == 1 }
check('34 pigeonhole duplicate') { duplicate_low_space([1,3,4,2,2]) == 2 }
check('35 Floyd duplicate') { duplicate_floyd([1,3,4,2,2]) == 2 && duplicate_floyd([3,1,3,4,2]) == 3 }
check('36 read-only duplicate file candidates') do
  a=Tempfile.new('duplicate-a',__dir__); b=Tempfile.new('duplicate-b',__dir__); c=Tempfile.new('duplicate-c',__dir__)
  begin
    a.write('same');b.write('same');c.write('diff')
    [a,b,c].each(&:flush)
    duplicate_file_candidates([a.path,b.path,c.path]).map(&:sort) == [[a.path,b.path].sort]
  ensure
    [a,b,c].each(&:close!)
  end
end
check('37 stock profit positive and negative') { maximum_stock_profit([10,7,5,8,11,9]) == 6 && maximum_stock_profit([9,7,3]) == -2 }
check('38 prefix suffix products with zeros') { products_except_self([1,2,3,4]) == [24,12,8,6] && products_except_self([1,0,3]) == [0,3,0] && products_except_self([0,0]) == [0,0] }
check('39 highest product with negatives') { highest_product_three([-10,-10,1,3,2]) == 300 && highest_product_three([-5,-4,-3,-2]) == -24 }
check('40 merged intervals') { merge_meetings([[0,1],[3,5],[4,8],[8,9]]) == [[0,1],[3,9]] }
puts "#{CHECKS.length} named validation checks passed across 40 executable coding variants; ticket-site design is not an executable integration test."
