# Original study solutions for the incomplete prompts in fourteen.txt.
# Standard assumptions are stated per method; these are NOT missing source text.

# 1. F(0) = 0, F(1) = 1; n must be a nonnegative Integer.
def fibonacci(n)
  raise ArgumentError unless n.is_a?(Integer) && n >= 0
  a, b = 0, 1
  n.times { a, b = b, a + b }
  a
end

# 2. Nodes respond to next. Identity comparison is deliberate.
def cyclic?(head)
  slow = fast = head
  while fast && fast.next
    slow = slow.next
    fast = fast.next.next
    return true if slow.equal?(fast)
  end
  false
end

# 3. Unordered combinations; unlimited copies of positive integer denominations.
def change_ways(amount, coins)
  raise ArgumentError unless amount.is_a?(Integer) && amount >= 0
  raise ArgumentError unless coins.all? { |c| c.is_a?(Integer) && c.positive? }
  ways = Array.new(amount + 1, 0)
  ways[0] = 1
  coins.uniq.each do |coin|
    coin.upto(amount) { |sum| ways[sum] += ways[sum - coin] }
  end
  ways[amount]
end

# 4. Amortized O(1) enqueue/dequeue; a transfer can take O(n).
class TwoStackQueue
  def initialize
    @incoming, @outgoing = [], []
  end
  def push(value)
    @incoming.push(value)
    self
  end
  def shift
    if @outgoing.empty?
      @outgoing << @incoming.pop until @incoming.empty?
    end
    raise IndexError, 'empty queue' if @outgoing.empty?
    @outgoing.pop
  end
end

# 5. Rectangles use x, y, width, height; dimensions must be nonnegative.
def overlap_area(a, b)
  [a, b].each { |r| raise ArgumentError if r[:width] < 0 || r[:height] < 0 }
  width = [[a[:x] + a[:width], b[:x] + b[:width]].min - [a[:x], b[:x]].max, 0].max
  height = [[a[:y] + a[:height], b[:y] + b[:height]].min - [a[:y], b[:y]].max, 0].max
  width * height
end

# 6. Arbitrary comparable numeric input; ties choose the earliest mode to lead.
class TemperatureTracker
  attr_reader :min, :max, :mode
  def initialize
    @count, @sum, @mode_count = 0, 0, 0
    @counts = Hash.new(0)
  end
  def insert(value)
    @count += 1
    @sum += value
    @min = value if @min.nil? || value < @min
    @max = value if @max.nil? || value > @max
    @counts[value] += 1
    if @counts[value] > @mode_count
      @mode, @mode_count = value, @counts[value]
    end
    self
  end
  def mean
    return nil if @count.zero?
    @sum.fdiv(@count)
  end
end

# Shared tree shape: nodes expose value, left and right.
# 7. Assumption: "superbalanced" means max leaf depth - min leaf depth <= 1.
def superbalanced?(root)
  return true unless root
  depths = []
  stack = [[root, 0]]
  until stack.empty?
    node, depth = stack.pop
    if !node.left && !node.right
      depths << depth unless depths.include?(depth)
      return false if depths.length > 2 || (depths.max - depths.min) > 1
    else
      stack << [node.left, depth + 1] if node.left
      stack << [node.right, depth + 1] if node.right
    end
  end
  true
end

# 8. Strict BST: duplicate keys are not allowed.
def valid_bst?(root)
  stack = [[root, nil, nil]]
  until stack.empty?
    node, lower, upper = stack.pop
    next unless node
    return false if lower && node.value <= lower
    return false if upper && node.value >= upper
    stack << [node.left, lower, node.value]
    stack << [node.right, node.value, upper]
  end
  true
end

# 9. Strict BST with at least two nodes.
def second_largest(root)
  raise ArgumentError unless root && (root.left || root.right)
  node = root
  loop do
    if !node.right && node.left
      node = node.left
      node = node.right while node.right
      return node.value
    end
    return node.value if node.right && !node.right.left && !node.right.right
    node = node.right
  end
end

# 10. A trie is one possible exact-membership structure, not a full search engine.
def trie_insert(trie, word)
  node = trie
  word.each_char { |char| node = (node[char] ||= {}) }
  node[:terminal] = true
end
def trie_include?(trie, word)
  node = trie
  word.each_char do |char|
    node = node[char]
    return false unless node
  end
  node[:terminal] == true
end

# 11. Sorted ascending comparable values.
def binary_include?(array, target)
  low, high = 0, array.length - 1
  while low <= high
    mid = (low + high) / 2
    return true if array[mid] == target
    array[mid] < target ? low = mid + 1 : high = mid - 1
  end
  false
end

# 12. Rotated sorted distinct values: O(log n). Duplicates may force O(n).
def rotation_index(array)
  return nil if array.empty?
  low, high = 0, array.length - 1
  while low < high
    mid = (low + high) / 2
    if array[mid] > array[high]
      low = mid + 1
    elsif array[mid] < array[high]
      high = mid
    else
      high -= 1
    end
  end
  low
end

# 13. Distinct movie indices; one movie may not be reused.
def movie_pair?(lengths, flight)
  seen = {}
  lengths.each do |length|
    return true if seen.key?(flight - length)
    seen[length] = true
  end
  false
end

# 14. Cakes are [integer_weight, value]; weights >= 0, capacity integer >= 0.
def cake_value(cakes, capacity)
  raise ArgumentError unless capacity.is_a?(Integer) && capacity >= 0
  raise ArgumentError unless cakes.all? { |w, _| w.is_a?(Integer) && w >= 0 }
  return Float::INFINITY if cakes.any? { |weight, value| weight.zero? && value.positive? }
  useful = cakes.select { |weight, _| weight.positive? }
  best = Array.new(capacity + 1, 0)
  1.upto(capacity) do |space|
    useful.each do |weight, value|
      best[space] = [best[space], best[space - weight] + value].max if weight <= space
    end
  end
  best[capacity]
end

# 15. A parallel maxima stack handles repeated maximum values.
class MaxStack
  def initialize
    @items, @maxima = [], []
  end
  def push(value)
    @items << value
    @maxima << value if @maxima.empty? || value >= @maxima.last
    self
  end
  def pop
    raise IndexError, 'empty stack' if @items.empty?
    value = @items.pop
    @maxima.pop if value == @maxima.last
    value
  end
  def max = @maxima.last
end

# 16. Integer IDs, every other ID occurs exactly twice.
def unique_id(ids)
  ids.reduce(0, :^)
end

# 17. Only a non-tail node is supplied; copies the next node's contents.
def delete_non_tail(node)
  raise ArgumentError, 'tail cannot be deleted without predecessor' unless node&.next
  node.value = node.next.value
  node.next = node.next.next
end

# 18. Nodes expose a writable next property.
def reverse_list(head)
  previous = nil
  while head
    following = head.next
    head.next = previous
    previous, head = head, following
  end
  previous
end

# 19. k=1 means the last node; reject out-of-range k.
def kth_last(head, k)
  raise ArgumentError unless k.is_a?(Integer) && k.positive?
  lead = head
  k.times do
    raise ArgumentError, 'k exceeds list length' unless lead
    lead = lead.next
  end
  follow = head
  while lead
    lead, follow = lead.next, follow.next
  end
  follow
end

# 20. ASCII-only mutable String. Byte swapping is unsafe for UTF-8 characters.
def reverse_ascii_range!(string, left, right)
  while left < right
    a, b = string.getbyte(left), string.getbyte(right)
    string.setbyte(left, b)
    string.setbyte(right, a)
    left += 1
    right -= 1
  end
  string
end
def reverse_ascii!(string)
  raise ArgumentError, 'ASCII required' unless string.ascii_only?
  reverse_ascii_range!(string, 0, string.bytesize - 1)
end

# 21. ASCII words separated by literal spaces; preserves runs of spaces, reversed.
def reverse_words_ascii!(string)
  reverse_ascii!(string)
  start = 0
  0.upto(string.bytesize) do |index|
    if index == string.bytesize || string.getbyte(index) == 32
      reverse_ascii_range!(string, start, index - 1)
      start = index + 1
    end
  end
  string
end

# 22. opening_index points to '('; returns matching index, raises if absent.
def closing_parenthesis(string, opening_index)
  raise ArgumentError unless string[opening_index] == '('
  depth = 0
  opening_index.upto(string.length - 1) do |index|
    depth += 1 if string[index] == '('
    depth -= 1 if string[index] == ')'
    return index if depth.zero?
  end
  raise ArgumentError, 'no matching closing parenthesis'
end

# 23. Ignore non-bracket characters; match (), [] and {}.
def valid_brackets?(string)
  closing = { ')' => '(', ']' => '[', '}' => '{' }
  stack = []
  string.each_char do |char|
    if closing.value?(char)
      stack << char
    elsif closing.key?(char)
      return false unless stack.pop == closing[char]
    end
  end
  stack.empty?
end

# 24. Literal characters; case and whitespace matter in this variant.
def palindrome_permutation?(string)
  odd = {}
  string.each_char { |char| odd.key?(char) ? odd.delete(char) : odd[char] = true }
  odd.size <= 1
end

# 25. Unique permutations; output size is inherently factorial in the worst case.
def permutations(string)
  return [''] if string.empty?
  chars = string.chars
  chars.uniq.flat_map do |char|
    index = chars.index(char)
    rest = chars[0...index] + chars[index + 1..]
    permutations(rest.join).map { |suffix| char + suffix }
  end
end

# 26. Integer scores in 0..maximum, returned in descending order.
def sort_scores(scores, maximum)
  raise ArgumentError unless maximum.is_a?(Integer) && maximum >= 0
  counts = Array.new(maximum + 1, 0)
  scores.each do |score|
    raise ArgumentError unless score.is_a?(Integer) && score.between?(0, maximum)
    counts[score] += 1
  end
  maximum.downto(0).flat_map { |score| Array.new(counts[score], score) }
end

# 27. Assumption: array contains 1..n once plus exactly one extra duplicate.
def one_duplicate_sum(numbers)
  n = numbers.length - 1
  numbers.sum - n * (n + 1) / 2
end

# 28. Chosen policy: case-insensitive Unicode letter words, internal apostrophes.
def word_counts(text)
  text.downcase.scan(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/).tally
end

# 29. Fisher-Yates; RNG must produce uniform integers in 0...bound.
def shuffle!(array, random = Random.new)
  (array.length - 1).downto(1) do |index|
    other = random.rand(index + 1)
    array[index], array[other] = array[other], array[index]
  end
  array
end

# 30. Orders have distinct IDs, are partitioned into two given streams.
def first_come_first_served?(takeout, dinein, served)
  return false unless served.length == takeout.length + dinein.length
  i = j = 0
  served.each do |order|
    if i < takeout.length && order == takeout[i]
      i += 1
    elsif j < dinein.length && order == dinein[j]
      j += 1
    else
      return false
    end
  end
  i == takeout.length && j == dinein.length
end

# 31. die7.call returns a uniform integer in 1..7.
def five_from_seven(die7)
  loop do
    value = die7.call
    return value if value <= 5
  end
end

# 32. Two die5 rolls make 0..24; reject 21..24, map remaining 21 evenly.
def seven_from_five(die5)
  loop do
    value = (die5.call - 1) * 5 + die5.call - 1
    return value % 7 + 1 if value < 21
  end
end

# 33. Two eggs: smallest k with k*(k+1)/2 >= floors.
def two_egg_worst_case(floors)
  raise ArgumentError unless floors.is_a?(Integer) && floors >= 0
  drops = 0
  coverage = 0
  while coverage < floors
    drops += 1
    coverage += drops
  end
  drops
end

# 34. n+1 values in 1..n with at least one duplicate; no mutation, O(n log n).
def duplicate_low_space(numbers)
  low, high = 1, numbers.length - 1
  while low < high
    mid = (low + high) / 2
    count = numbers.count { |number| number <= mid }
    count > mid ? high = mid : low = mid + 1
  end
  low
end

# 35. Same bounded-domain assumptions; Floyd's cycle algorithm, O(n), O(1).
def duplicate_floyd(numbers)
  slow = fast = numbers[0]
  loop do
    slow = numbers[slow]
    fast = numbers[numbers[fast]]
    break if slow == fast
  end
  slow = numbers[0]
  until slow == fast
    slow, fast = numbers[slow], numbers[fast]
  end
  slow
end

# 36. Read-only candidate detection. Never automatically deletes files.
require 'digest'
def duplicate_file_candidates(paths)
  paths.select { |p| File.file?(p) && !File.symlink?(p) }
       .group_by { |p| File.size(p) }
       .values.select { |group| group.size > 1 }
       .flat_map do |group|
    group.group_by { |p| Digest::SHA256.file(p).hexdigest }.values.select { |same| same.size > 1 }
  end
end

# 37. One buy before one sell is required, even if every return is negative.
def maximum_stock_profit(prices)
  raise ArgumentError, 'at least two prices required' if prices.length < 2
  minimum, best = prices[0], prices[1] - prices[0]
  prices.each_with_index do |price, index|
    next if index.zero?
    best = [best, price - minimum].max
    minimum = [minimum, price].min
  end
  best
end

# 38. Output array plus O(1) extra state; no division, handles zeros.
def products_except_self(numbers)
  result = Array.new(numbers.length, 1)
  prefix = 1
  numbers.each_with_index { |number, i| result[i] = prefix; prefix *= number }
  suffix = 1
  (numbers.length - 1).downto(0) { |i| result[i] *= suffix; suffix *= numbers[i] }
  result
end

# 39. Track three largest and two smallest values; negatives can win.
def highest_product_three(numbers)
  raise ArgumentError if numbers.length < 3
  largest, smallest = [], []
  numbers.each do |number|
    largest = (largest + [number]).sort.last(3)
    smallest = (smallest + [number]).sort.first(2)
  end
  [largest.inject(:*), largest.last * smallest.inject(:*)].max
end

# 40. Half-open intervals; this variant also merges touching intervals.
def merge_meetings(intervals)
  raise ArgumentError unless intervals.all? { |start, finish| start <= finish }
  intervals.sort_by(&:first).each_with_object([]) do |(start, finish), merged|
    if merged.empty? || start > merged.last[1]
      merged << [start, finish]
    else
      merged.last[1] = [merged.last[1], finish].max
    end
  end
end

# 41. Ticket Sales Site is a design problem; see the detailed record, not a
# misleading standalone implementation with no real transaction/lock backend.
