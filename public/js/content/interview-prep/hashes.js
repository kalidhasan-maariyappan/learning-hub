(function () {
  'use strict';
  const JT = window.JT;
  function add(id, data) { JT.codingProblem('hashes', id, { ...data, summary: data.idea, exercise: data.followup, answer: data.guidance, edges: data.edges || ['Empty hashes or arrays', 'Overlapping keys', 'Missing keys versus nil/false values'], steps: data.steps || ['Initialize a new result and any explicit presence state.', 'Traverse inputs with while or basic each_pair traversal.', 'Apply the stated conflict rule and return the result.'] }); }
  add('frequency', {
    question: 'Count occurrences of each array value without tally.', contract: 'Primitive hashable values; output maps value to count.', idea: 'A hash counter avoids rescanning the input for every value.',
    code: `def solve(items)
  counts = {}
  i = 0
  while i < items.length
    value = items[i]
    counts[value] = 0 if counts[value] == nil
    counts[value] += 1
    i += 1
  end
  counts
end`, tests: [[[['red','red','blue']],{red:2,blue:1}], [[[]],{}], [[['x']],{x:1}]], trace: 'red starts at 1 and increases to 2; blue starts at 1.', complexity: 'O(n) expected time and O(k) space for k distinct keys.', invariant: 'Counts equal occurrences in the processed prefix.', mistake: 'Using an array position as the hash key instead of the actual value.', followup: 'How would you count integers without a hash if the domain is 0–9?', guidance: 'Use a fixed ten-slot counter array, after validating the domain.'
  });
  add('words', {
    question: 'Count word tokens without group_by or tally.', contract: 'Input is already an array of exact, case-sensitive words; tokenization is outside this exercise.', idea: 'Increment one counter per token while preserving case distinctions.',
    code: `def solve(words)
  counts = {}
  i = 0
  while i < words.length
    word = words[i]
    counts[word] = 0 if counts[word] == nil
    counts[word] += 1
    i += 1
  end
  counts
end`, tests: [[[['rails','ruby','rails']],{rails:2,ruby:1}], [[[]],{}], [[['Ruby','ruby']],{Ruby:1,ruby:1}]], trace: 'The second rails changes only its existing counter.', complexity: 'O(n) expected hash operations; O(k) entries, excluding token byte storage/hashing costs.', invariant: 'Every processed token contributes exactly one to its own key.', mistake: 'Assuming case-insensitive normalization was requested.', followup: 'Normalize ASCII words before counting.', guidance: 'Use an explicit uppercase/lowercase mapping like the string exercise, and state the punctuation policy.'
  });
  add('merge', {
    question: 'Merge two hashes, with right values replacing left values on matching keys.', contract: 'Shallow merge; preserve nil and false values; do not mutate either input.', idea: 'Copy left entries, then assign all right entries.',
    code: `def solve(left, right)
  result = {}
  left.each_pair { |key, value| result[key] = value }
  right.each_pair { |key, value| result[key] = value }
  result
end`, tests: [[[{a:1,b:2},{b:9,c:3}],{a:1,b:9,c:3}], [[{},{}],{}], [[{a:1},{a:null}],{a:null}]], trace: 'Left writes b:2; right overwrites that same key with b:9.', complexity: 'O(n+m) expected time and O(n+m) result space.', invariant: 'After the right pass, every right key has exactly its right-side value.', mistake: 'Assigning only truthy right values loses intentional false or nil replacements.', followup: 'How would you implement left-side priority?', guidance: 'Copy right first and left second, or maintain explicit presence while adding right entries.'
  });
  add('sum', {
    question: 'Merge numeric counters, adding values for common keys.', contract: 'Numeric values only; absent keys start at zero.', idea: 'Copy one hash, then add each entry from the other.',
    code: `def solve(left, right)
  result = {}
  left.each_pair { |key, value| result[key] = value }
  right.each_pair do |key, value|
    result[key] = 0 if result[key] == nil
    result[key] += value
  end
  result
end`, tests: [[[{a:2,b:1},{a:3,c:4}],{a:5,b:1,c:4}], [[{},{}],{}], [[{a:-2},{a:2}],{a:0}]], trace: 'a combines 2+3=5; b and c retain their independent values.', complexity: 'O(n+m) expected time; O(n+m) space.', invariant: 'Each result key equals the total of processed contributions for that key.', mistake: 'Using replacement merge instead of adding common counters.', followup: 'Merge many counter hashes.', guidance: 'Apply the same update rule through an outer loop over the hashes; avoid rebuilding the entire result each time.'
  });
  add('invert', {
    question: 'Swap keys and values without invert, rejecting collisions.', contract: 'Values are hashable; duplicate values raise ArgumentError instead of silently losing data.', idea: 'Track which output keys have already been used before inserting an inverted pair.',
    code: `def solve(input)
  result = {}
  seen = {}
  input.each_pair do |key, value|
    raise ArgumentError, "duplicate value" if seen[value]
    result[value] = key
    seen[value] = true
  end
  result
end`, tests: [[[{a:'one',b:'two'}],{one:'a',two:'b'}], [[{}],{}], [[{a:'x'}],{x:'a'}]], errorTests: [[[{a:1,b:1}],'ArgumentError']], trace: 'a→one becomes one→a; a second one value would collide and be rejected.', complexity: 'O(n) expected time; O(n) result/presence storage.', invariant: 'Each emitted value has exactly one original key.', mistake: 'Assuming inversion is lossless when source values repeat.', followup: 'Support duplicate values without losing keys.', guidance: 'Map each value to an array of original keys rather than to one key.'
  });
  add('group', {
    question: 'Group non-empty words by their first character without group_by.', contract: 'Array of strings; empty words are skipped; case-sensitive grouping.', idea: 'Create an array for each group on first use, then append the word manually.',
    code: `def solve(words)
  result = {}
  i = 0
  while i < words.length
    word = words[i]
    if word.length > 0
      key = word[0]
      result[key] = [] if result[key] == nil
      bucket = result[key]
      bucket[bucket.length] = word
    end
    i += 1
  end
  result
end`, tests: [[[['ruby','rails','api','']],{r:['ruby','rails'],a:['api']}], [[[]],{}], [[['A','a']],{A:['A'],a:['a']}]], trace: 'ruby creates r; rails appends to that bucket; api creates a.', complexity: 'O(n) expected grouping operations plus stored references; O(n+k) space.', invariant: 'Each visited non-empty word appears once in its correct bucket.', mistake: 'Sharing one mutable default array across every group.', followup: 'Group by word length instead.', guidance: 'Use word.length as the key and explicitly decide whether empty words form a zero-length bucket.'
  });
  add('highest', {
    question: 'Return [key,value] for the highest numeric value without max_by.', contract: 'Empty hash returns nil; ties choose first insertion order.', idea: 'Track one best pair, updating only for a strictly greater value.',
    code: `def solve(input)
  best = nil
  input.each_pair do |key, value|
    best = [key, value] if best == nil || value > best[1]
  end
  best
end`, tests: [[[{a:4,b:7,c:7}],['b',7]], [[{}],null], [[{a:-4,b:-8}],['a',-4]]], trace: 'For a:4,b:7,c:7, b becomes best and c does not replace it.', complexity: 'O(n) time; O(1) auxiliary state.', invariant: 'best is the first maximum in the visited entries.', mistake: 'Initializing the maximum to zero fails for negative values.', followup: 'Return every tied highest key.', guidance: 'Reset a list on a strictly larger value; append on equality.'
  });
  add('filter', {
    question: 'Keep only entries whose numeric value is at least a threshold.', contract: 'Numeric hash values; input remains unchanged.', idea: 'Traverse entries and conditionally copy matching pairs.',
    code: `def solve(input, threshold)
  result = {}
  input.each_pair do |key, value|
    result[key] = value if value >= threshold
  end
  result
end`, tests: [[[{a:5,b:2,c:5},5],{a:5,c:5}], [[{},0],{}], [[{a:-2,b:0},-1],{b:0}]], trace: 'At threshold 5, values 5 qualify while 2 is skipped.', complexity: 'O(n) time; O(r) space for r retained entries.', invariant: 'All result entries satisfy the threshold and come from visited input.', mistake: 'Using > when the stated threshold is inclusive.', followup: 'Filter by both key prefix and value.', guidance: 'Add a clearly defined key predicate, implemented manually if shortcut methods are disallowed.'
  });
  add('contains', {
    question: 'Test key presence without key? or has_key?.', contract: 'Presence must be distinguished from a stored nil or false.', idea: 'Compare target with every key, not with the value returned by a lookup.',
    code: `def solve(input, target)
  input.each_pair do |key, _value|
    return true if key == target
  end
  false
end`, tests: [[[{a:null},'a'],true], [[{a:false},'a'],true], [[{},'a'],false]], trace: 'a:nil still contains a, because the key comparison succeeds.', complexity: 'O(n) time; O(1) space. In real code the native key? is normally preferable.', invariant: 'Every previously visited key differs from target if no result has returned.', mistake: 'input[target] != nil cannot distinguish a missing key from a present nil value.', followup: 'Why use key? in production?', guidance: 'It expresses presence directly and normally uses expected constant-time hash lookup.'
  });
  add('remove', {
    question: 'Return a copy without one target key, using no delete or reject.', contract: 'Missing target leaves equivalent content; shallow copy.', idea: 'Copy only entries whose key differs from the target.',
    code: `def solve(input, target)
  result = {}
  input.each_pair do |key, value|
    result[key] = value if key != target
  end
  result
end`, tests: [[[{a:1,b:2},'a'],{b:2}], [[{},'a'],{}], [[{a:null},'x'],{a:null}]], trace: 'Copy b:2 and skip a:1 when target is a.', complexity: 'O(n) time and O(n) result space.', invariant: 'Result contains all visited non-target pairs unchanged.', mistake: 'Removing by matching value instead of matching key.', followup: 'Remove an array of forbidden keys.', guidance: 'Use a manually built presence hash for forbidden keys, then filter by key membership.'
  });
  add('keys', {
    question: 'Build an array of hash keys without keys.', contract: 'Preserve insertion order; values can be anything.', idea: 'Basic each_pair traversal exposes each key; append it by index.',
    code: `def solve(input)
  result = []
  input.each_pair { |key, _value| result[result.length] = key }
  result
end`, tests: [[[{b:2,a:1}],['b','a']], [[{}],[]], [[{a:null}],['a']]], trace: 'b was inserted before a, so output is [b,a] regardless of lexical order.', complexity: 'O(n) time and O(n) output space.', invariant: 'Output keys match the traversal prefix in order.', mistake: 'Promising sorted keys when only insertion order is maintained.', followup: 'Return keys in ascending ASCII order without sort.', guidance: 'Build the key array, then apply a manual comparison sort; document the allowed key type.'
  });
  add('values', {
    question: 'Build an array of values without values.', contract: 'Keep duplicates, nil and false in insertion order.', idea: 'Visit each pair and append its value without filtering.',
    code: `def solve(input)
  result = []
  input.each_pair { |_key, value| result[result.length] = value }
  result
end`, tests: [[[{a:2,b:2,c:null}],[2,2,null]], [[{}],[]], [[{a:false}],[false]]], trace: 'Both 2 values and the nil value are included; no deduplication occurs.', complexity: 'O(n) time and O(n) output space.', invariant: 'There is one output element per visited pair.', mistake: 'Dropping false or nil with a truthiness check.', followup: 'Produce distinct values manually.', guidance: 'Use a presence hash or scan the output before appending; discuss the time/space tradeoff.'
  });
  add('equal', {
    question: 'Compare two shallow hashes by keys and values without using hash equality.', contract: 'Primitive values; key order does not matter; missing differs from nil.', idea: 'Compare sizes, build explicit right-key presence, then compare each left value.',
    code: `def solve(left, right)
  return false if left.length != right.length
  present = {}
  right.each_pair { |key, _value| present[key] = true }
  left.each_pair do |key, value|
    return false unless present[key]
    return false if right[key] != value
  end
  true
end`, tests: [[[{a:1,b:null},{b:null,a:1}],true], [[{a:null},{b:null}],false], [[{},{}],true]], trace: 'a:nil and b:nil have equal sizes and lookup values but different keys, so presence rejects them.', complexity: 'O(n+m) expected time; O(m) presence space.', invariant: 'All visited left pairs have an existing equal-valued right pair.', mistake: 'Comparing only lookup values makes missing and nil look identical.', followup: 'How would deeply nested hashes differ?', guidance: 'Use recursive type-aware comparison, clarify arrays/order, and handle cycles if the domain permits them.'
  });
  add('common', {
    question: 'Find keys present in both hashes without intersection helpers.', contract: 'Return keys in left insertion order; values do not affect presence.', idea: 'Build a right-key presence hash, then traverse left keys.',
    code: `def solve(left, right)
  present = {}
  right.each_pair { |key, _value| present[key] = true }
  result = []
  left.each_pair do |key, _value|
    result[result.length] = key if present[key]
  end
  result
end`, tests: [[[{a:1,b:2},{b:null,c:3}],['b']], [[{},{}],[]], [[{a:false},{a:null}],['a']]], trace: 'b is common even when its right-side value is nil.', complexity: 'O(n+m) expected time; O(m+r) space.', invariant: 'Every output key exists on both sides and follows left order.', mistake: 'Using right[key] as a presence flag loses keys with nil/false values.', followup: 'Return common key/value pairs from the left.', guidance: 'Assign left values into a result hash for common keys instead of appending only keys.'
  });
  add('difference', {
    question: 'Find keys in the left hash that are absent from the right.', contract: 'Return left-only keys in left insertion order.', idea: 'Build right-key membership and append only keys that do not appear there.',
    code: `def solve(left, right)
  present = {}
  right.each_pair { |key, _value| present[key] = true }
  result = []
  left.each_pair do |key, _value|
    result[result.length] = key unless present[key]
  end
  result
end`, tests: [[[{a:1,b:2},{b:9}],['a']], [[{},{}],[]], [[{a:null},{}],['a']]], trace: 'a is absent from the right and is emitted; b is skipped.', complexity: 'O(n+m) expected time; O(m+r) space.', invariant: 'Output contains only visited keys with no right-side membership.', mistake: 'Returning differing values for shared keys when the question is about key-set difference.', followup: 'Return the symmetric key difference.', guidance: 'Collect left-only and right-only keys in separately defined order; do not confuse it with value changes.'
  });
  add('rename', {
    question: 'Rename one hash key without losing data on collision.', contract: 'Missing old key returns a copy; existing different destination raises ArgumentError; same key is unchanged.', idea: 'Determine old/destination presence, then copy with one key substitution.',
    code: `def solve(input, old_key, new_key)
  old_exists = false
  new_exists = false
  input.each_pair do |key, _value|
    old_exists = true if key == old_key
    new_exists = true if key == new_key
  end
  if old_exists && old_key != new_key && new_exists
    raise ArgumentError, "destination exists"
  end
  result = {}
  input.each_pair do |key, value|
    destination = key == old_key ? new_key : key
    result[destination] = value
  end
  result
end`, tests: [[[{name:'Ruby'},'name','language'],{language:'Ruby'}], [[{},'a','b'],{}], [[{a:null},'a','a'],{a:null}]], errorTests: [[[{a:1,b:2},'a','b'],'ArgumentError']], trace: 'name→language changes the key while retaining Ruby as its value.', complexity: 'O(n) time and O(n) space.', invariant: 'All pairs survive with at most one non-colliding key substitution.', mistake: 'Silently overwriting the destination key.', followup: 'Allow collisions with an explicit policy.', guidance: 'Choose replace, preserve or combine and document it before implementing the assignment order.'
  });
  add('normalize', {
    question: 'Lowercase ASCII string keys without downcase or transform_keys.', contract: 'String keys only; preserve other characters; normalization collisions raise ArgumentError.', idea: 'Map uppercase key characters through parallel alphabets and track normalized key presence.',
    code: `def solve(input)
  upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  lower = "abcdefghijklmnopqrstuvwxyz"
  seen = {}
  result = {}
  input.each_pair do |key, value|
    normalized = +""
    i = 0
    while i < key.length
      char = key[i]
      j = 0
      while j < 26
        char = lower[j] if key[i] == upper[j]
        j += 1
      end
      normalized += char
      i += 1
    end
    raise ArgumentError, "normalized collision" if seen[normalized]
    seen[normalized] = true
    result[normalized] = value
  end
  result
end`, tests: [[[{Name:'Ruby',AGE:4}],{name:'Ruby',age:4}], [[{}],{}], [[{x:false}],{x:false}]], errorTests: [[[{A:1,a:2}],'ArgumentError']], trace: 'Name maps N→n and keeps ame, yielding name.', complexity: 'O(L) character checks with a fixed 26-letter alphabet, plus potentially quadratic per-key concatenation; O(L+n) output/presence space.', invariant: 'Every output key is normalized and no previous normalized key is overwritten.', mistake: 'Ignoring collisions such as A and a.', followup: 'How would Unicode key normalization change this?', guidance: 'Use an explicit Unicode normalization/case-folding policy in production; this ASCII algorithm is not equivalent.'
  });
  add('nested', {
    question: 'Look up a nested key path without dig.', contract: 'JSON-style nested hashes; return [found,value]. Empty path returns [true,input].', idea: 'Traverse one level at a time and check actual key presence so nil remains a valid final value.',
    code: `def solve(input, path)
  current = input
  i = 0
  while i < path.length
    return [false, nil] unless current.is_a?(Hash)
    found = false
    value = nil
    current.each_pair do |key, candidate|
      if key == path[i]
        found = true
        value = candidate
      end
    end
    return [false, nil] unless found
    current = value
    i += 1
  end
  [true, current]
end`, tests: [[[{user:{name:'Ada'}},['user','name']],[true,'Ada']], [[{a:null},['a']],[true,null]], [[{a:null},['a','b']],[false,null]], [[{},[]],[true,{}]]], trace: 'user locates an inner hash, then name locates Ada. A nil before the last level cannot be traversed.', complexity: 'O(sum of inspected hash widths) time; O(1) traversal state excluding the path/result.', invariant: 'current is the value reached by the already consumed path prefix.', mistake: 'Returning nil alone cannot distinguish an absent path from a present nil value.', followup: 'How would native key? improve lookup?', guidance: 'It avoids scanning each hash’s keys, giving expected O(path length) lookup under normal hashing assumptions.'
  });
  add('index', {
    question: 'Index record hashes by their id field without index_by.', contract: 'Every record has a non-nil string-keyed id; duplicate IDs raise ArgumentError.', idea: 'Use IDs as result keys and explicit presence to reject duplicates.',
    code: `def solve(records)
  result = {}
  present = {}
  i = 0
  while i < records.length
    record = records[i]
    id = record["id"]
    raise ArgumentError, "missing id" if id == nil
    raise ArgumentError, "duplicate id" if present[id]
    result[id] = record
    present[id] = true
    i += 1
  end
  result
end`, tests: [[[ [{id:'a',name:'Ada'},{id:'b',name:'Bo'}] ],{a:{id:'a',name:'Ada'},b:{id:'b',name:'Bo'}}], [[[]],{}], [[[ {id:'x'} ]],{x:{id:'x'}}]], errorTests: [[[ [{id:'x'},{id:'x'}] ],'ArgumentError'], [[[{}]],'ArgumentError']], trace: 'The record with id a is stored under a, allowing direct later lookup.', complexity: 'O(n) expected time and O(n) references; records are not deeply copied.', invariant: 'Each processed ID maps to exactly one original record.', mistake: 'Claiming an independent deep copy when result still references the source records.', followup: 'Group duplicates instead of rejecting them.', guidance: 'Store an array per ID and append records; this changes the result contract to one-to-many.'
  });
  add('aggregate', {
    question: 'Total order amounts per customer without group_by or sum.', contract: 'Each record has string keys customer_id and amount_cents; values are valid IDs and integer cents.', idea: 'Visit orders once and add each amount to its customer’s running total.',
    code: `def solve(orders)
  totals = {}
  i = 0
  while i < orders.length
    order = orders[i]
    customer = order["customer_id"]
    totals[customer] = 0 if totals[customer] == nil
    totals[customer] += order["amount_cents"]
    i += 1
  end
  totals
end`, tests: [[[ [{customer_id:'a',amount_cents:100},{customer_id:'b',amount_cents:80},{customer_id:'a',amount_cents:50}] ],{a:150,b:80}], [[[]],{}], [[[ {customer_id:'a',amount_cents:-10} ]],{a:-10}]], trace: 'Customer a accumulates 100+50=150; b remains 80.', complexity: 'O(n) expected time and O(k) space for k customers.', invariant: 'Each total equals the sum of processed orders for its customer.', mistake: 'Mixing decimal display currency with integer cents or overwriting previous totals.', followup: 'How would this change for one million database rows?', guidance: 'Prefer a scoped SQL GROUP BY/SUM when the rule is expressible there, or batch a required application-side computation rather than loading all models.'
  });
})();
