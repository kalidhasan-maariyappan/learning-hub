(function () {
  'use strict';
  const JT = window.JT;
  function add(id, data) {
    JT.codingProblem('arrays', id, { ...data, summary: data.idea, exercise: data.followup,
      answer: data.guidance, edges: data.edges || ['Empty input', 'One element', 'Duplicates and negative values where allowed'],
      steps: data.steps || ['Initialize the state described below.', 'Visit elements using explicit indices and update that state.', 'Return the result after the loop finishes.'] });
  }
  add('reverse', {
    question: 'Return a new array with elements in reverse order. Keep the input unchanged.', contract: 'Any array; empty input returns [].',
    idea: 'Read from the final index toward zero and write each value to a fresh output array.',
    code: `def solve(items)
  result = []
  i = items.length - 1
  while i >= 0
    result[result.length] = items[i]
    i -= 1
  end
  result
end`,
    tests: [[[[1,2,3]],[3,2,1]], [[[]],[]], [[[4]],[4]]], trace: 'For [1,2,3], indices 2,1,0 contribute 3,2,1.',
    complexity: 'O(n) time and O(n) extra space for the new array.', invariant: 'After each step, result contains the already visited suffix in reverse order.',
    mistake: 'Writing into the original array while also reading from it can overwrite values you still need.', followup: 'How would you reverse in place with O(1) extra space?', guidance: 'Use left/right pointers, swap their elements, and move inward until they meet.'
  });
  add('sum', {
    question: 'Add all numeric values without sum or reduce.', contract: 'Finite numeric values; [] returns 0.', idea: 'Maintain an accumulator that includes each visited value exactly once.',
    code: `def solve(items)
  total = 0
  i = 0
  while i < items.length
    total += items[i]
    i += 1
  end
  total
end`, tests: [[[[3,-1,5]],7], [[[]],0], [[[0,0]],0]], trace: 'Totals for [3,-1,5] are 3,2,7.', complexity: 'O(n) time; O(1) extra space.', invariant: 'total equals the sum of indices before i.', mistake: 'Initializing the total from items[0] without handling an empty array.', followup: 'How would you sum only positive numbers?', guidance: 'Add only when items[i] > 0; keep the same traversal.'
  });
  add('maximum', {
    question: 'Find the largest number without max or sorting.', contract: 'Numeric array; return nil when empty.', idea: 'Start from the first actual value so negative-only input works.',
    code: `def solve(items)
  return nil if items.length == 0
  best = items[0]
  i = 1
  while i < items.length
    best = items[i] if items[i] > best
    i += 1
  end
  best
end`, tests: [[[[-8,-2,-9]],-2], [[[]],null], [[[5,5]],5]], trace: 'For [-8,-2,-9], best changes from -8 to -2 and stays there.', complexity: 'O(n) time; O(1) space.', invariant: 'best is the largest value in the visited prefix.', mistake: 'Starting best at zero gives a wrong answer for negative-only input.', followup: 'Return the index of the first maximum instead.', guidance: 'Track the best index and update it only for a strictly larger value.'
  });
  add('second_max', {
    question: 'Find the second largest distinct number.', contract: 'Numeric array; fewer than two distinct values returns nil.', idea: 'Keep the largest and second-largest distinct values, updating them in one pass.',
    code: `def solve(items)
  first = nil
  second = nil
  i = 0
  while i < items.length
    value = items[i]
    if first == nil || value > first
      second = first
      first = value
    elsif value != first && (second == nil || value > second)
      second = value
    end
    i += 1
  end
  second
end`, tests: [[[[9,9,7,8]],8], [[[2,2]],null], [[[-5,-1,-3]],-3]], trace: 'In [9,9,7,8], the duplicate 9 is ignored; second progresses nil → 7 → 8.', complexity: 'O(n) time; O(1) extra space.', invariant: 'first and second are the two highest distinct values seen.', mistake: 'Counting a repeated maximum as the second distinct maximum.', followup: 'How would you generalize to the third distinct maximum?', guidance: 'Maintain three ordered distinct candidates; explain each update and the missing-result policy.'
  });
  add('deduplicate', {
    question: 'Remove duplicates while keeping the first occurrence order.', contract: 'Primitive comparable values; return a fresh array.', idea: 'For each input value, scan the output to determine whether it is already present.',
    code: `def solve(items)
  result = []
  i = 0
  while i < items.length
    found = false
    j = 0
    while j < result.length
      found = true if result[j] == items[i]
      j += 1
    end
    result[result.length] = items[i] unless found
    i += 1
  end
  result
end`, tests: [[[[3,1,3,2,1]],[3,1,2]], [[[]],[]], [[[null,false,null]],[null,false]]], trace: 'For [3,1,3], output becomes [3], then [3,1]; the final 3 is found and skipped.', complexity: 'O(n²) worst-case time; O(n) output space.', invariant: 'result contains exactly the first occurrences from the visited prefix.', mistake: 'Sorting first changes the required first-occurrence order.', followup: 'Can you improve expected time to O(n)?', guidance: 'Use a hash-backed presence set if hash access is allowed; store true and preserve output order.'
  });
  add('bubble_sort', {
    question: 'Sort numbers ascending by swapping neighboring inversions.', contract: 'Numeric input; return a sorted copy.', idea: 'Each pass moves the largest remaining value to the right end.',
    code: `def solve(items)
  result = []
  i = 0
  while i < items.length
    result[i] = items[i]
    i += 1
  end
  finish = result.length - 1
  while finish > 0
    changed = false
    j = 0
    while j < finish
      if result[j] > result[j + 1]
        temp = result[j]
        result[j] = result[j + 1]
        result[j + 1] = temp
        changed = true
      end
      j += 1
    end
    break unless changed
    finish -= 1
  end
  result
end`, tests: [[[[4,1,3,2]],[1,2,3,4]], [[[]],[]], [[[2,1,2]],[1,2,2]]], trace: 'The first pass on [4,1,3,2] moves 4 to the final position.', complexity: 'O(n²) worst case; O(n) best case with early exit; O(n) space for the copy.', invariant: 'Values beyond finish are already in their final sorted positions.', mistake: 'Using >= for swaps can disturb equal elements unnecessarily.', followup: 'Is this stable?', guidance: 'Yes for this implementation: equal values never swap across one another.'
  });
  add('selection_sort', {
    question: 'Implement selection sort without sort.', contract: 'Numeric array; input remains unchanged.', idea: 'Choose the smallest remaining value and place it at the next output position in a copied array.',
    code: `def solve(items)
  result = []
  i = 0
  while i < items.length
    result[i] = items[i]
    i += 1
  end
  i = 0
  while i < result.length
    smallest = i
    j = i + 1
    while j < result.length
      smallest = j if result[j] < result[smallest]
      j += 1
    end
    temp = result[i]
    result[i] = result[smallest]
    result[smallest] = temp
    i += 1
  end
  result
end`, tests: [[[[5,-1,3]],[-1,3,5]], [[[]],[]], [[[1,1]],[1,1]]], trace: 'For [5,-1,3], select -1 first, then 3 from the remaining suffix.', complexity: 'O(n²) time even when sorted; O(n) space for a copy.', invariant: 'The prefix before i contains the smallest values in final order.', mistake: 'Assuming selection sort is stable; a distant swap can reorder equal-valued records.', followup: 'When might selection sort use fewer writes than bubble sort?', guidance: 'It does at most one final swap per outer iteration, though comparisons remain quadratic.'
  });
  add('insertion_sort', {
    question: 'Implement insertion sort manually.', contract: 'Numeric array; return a new sorted array.', idea: 'Insert each value into the already sorted output prefix by shifting larger values right.',
    code: `def solve(items)
  result = []
  i = 0
  while i < items.length
    value = items[i]
    j = i - 1
    while j >= 0 && result[j] > value
      result[j + 1] = result[j]
      j -= 1
    end
    result[j + 1] = value
    i += 1
  end
  result
end`, tests: [[[[3,2,1]],[1,2,3]], [[[]],[]], [[[1,2,2]],[1,2,2]]], trace: 'Insert 3, shift it right to insert 2, then shift both to insert 1.', complexity: 'O(n²) worst case, O(n) for already sorted input; O(n) output space.', invariant: 'The result prefix is sorted before each insertion.', mistake: 'Reading result[-1] after j becomes negative; keep the boundary condition first.', followup: 'Why does this suit nearly sorted small inputs?', guidance: 'Few values need shifting, so the work approaches a single scan.'
  });
  add('linear_search', {
    question: 'Return the first index of a target without index or find.', contract: 'Any comparable array; return -1 when absent.', idea: 'Visit indices in increasing order and return on the first match.',
    code: `def solve(items, target)
  i = 0
  while i < items.length
    return i if items[i] == target
    i += 1
  end
  -1
end`, tests: [[[[4,7,7],7],1], [[[],2],-1], [[[null],null],0]], trace: 'Searching 7 in [4,7,7] checks index 0 then returns index 1.', complexity: 'O(n) worst-case time; O(1) space.', invariant: 'No earlier index contains the target.', mistake: 'Returning the value instead of its index or continuing after the first match.', followup: 'Return all matching indices.', guidance: 'Keep a result array, append each matching i, and finish the scan.'
  });
  add('binary_search', {
    question: 'Find a target in a sorted numeric array.', contract: 'Input is already ascending; duplicates may return any matching index; absent returns -1.', idea: 'Compare with the midpoint and discard the half that cannot contain the target.',
    code: `def solve(items, target)
  left = 0
  right = items.length - 1
  while left <= right
    middle = left + (right - left) / 2
    return middle if items[middle] == target
    if items[middle] < target
      left = middle + 1
    else
      right = middle - 1
    end
  end
  -1
end`, tests: [[[[1,3,5,7],5],2], [[[],1],-1], [[[1,3],2],-1]], trace: 'Searching 5 in [1,3,5,7] first checks 3, then checks 5.', complexity: 'O(log n) time; O(1) space, assuming constant-time array access.', invariant: 'If the target exists, it lies within the current inclusive boundaries.', mistake: 'Applying binary search to unsorted input or failing to exclude the midpoint after a mismatch.', followup: 'Return the first occurrence among duplicates.', guidance: 'On a match, record the index and continue searching the left half.'
  });
  add('rotate', {
    question: 'Rotate an array left by k positions.', contract: 'Integer k; negative k rotates right; empty input returns [].', idea: 'Normalize k with modulo, then map each output index to its wrapped input index.',
    code: `def solve(items, k)
  return [] if items.length == 0
  shift = k % items.length
  result = []
  i = 0
  while i < items.length
    result[i] = items[(i + shift) % items.length]
    i += 1
  end
  result
end`, tests: [[[[1,2,3,4],2],[3,4,1,2]], [[[],5],[]], [[[1,2,3],-1],[3,1,2]]], trace: 'With shift 2, output indices 0,1,2,3 read input indices 2,3,0,1.', complexity: 'O(n) time and O(n) space.', invariant: 'result[i] comes from the normalized cyclic position i + shift.', mistake: 'Taking modulo by array length before handling an empty array.', followup: 'How would three manual reversals achieve in-place rotation?', guidance: 'Reverse the first k values, reverse the remainder, then reverse the whole array using explicit swaps.'
  });
  add('zeros', {
    question: 'Move numeric zeros to the end while preserving nonzero order.', contract: 'Numeric array; return a new array of the same length.', idea: 'Copy nonzero values first, then fill the remaining positions with zero.',
    code: `def solve(items)
  result = []
  i = 0
  while i < items.length
    result[result.length] = items[i] if items[i] != 0
    i += 1
  end
  while result.length < items.length
    result[result.length] = 0
  end
  result
end`, tests: [[[[0,3,0,1]],[3,1,0,0]], [[[]],[]], [[[0,0]],[0,0]]], trace: 'Copy 3 and 1 from [0,3,0,1], then append two zeros.', complexity: 'O(n) time; O(n) output space.', invariant: 'The collected prefix contains nonzero values in original order.', mistake: 'Swapping every zero with the final element can reorder nonzero values.', followup: 'Do this in place with a write pointer.', guidance: 'Write each nonzero to the next free index, then overwrite the rest with zeros.'
  });
  add('merge', {
    question: 'Merge two sorted arrays into one sorted array.', contract: 'Ascending numeric arrays; keep duplicates.', idea: 'Compare the current heads, append the smaller, and advance only its pointer.',
    code: `def solve(left, right)
  result = []
  i = 0
  j = 0
  while i < left.length || j < right.length
    if j == right.length || (i < left.length && left[i] <= right[j])
      result[result.length] = left[i]
      i += 1
    else
      result[result.length] = right[j]
      j += 1
    end
  end
  result
end`, tests: [[[[1,3],[2,3]],[1,2,3,3]], [[[],[2]],[2]], [[[],[]],[]]], trace: 'For [1,3] and [2,3], choose 1, then 2, then both 3s.', complexity: 'O(n + m) time and O(n + m) output space.', invariant: 'result is sorted and contains exactly the consumed prefixes.', mistake: 'Dropping the remaining tail when one input is exhausted.', followup: 'How does this relate to merge sort?', guidance: 'Merge sort recursively sorts halves and combines them with this linear merge step.'
  });
  add('intersection', {
    question: 'Return distinct values present in both arrays, preserving left-side order.', contract: 'Comparable primitive values; each output value appears once.', idea: 'For every left value, check right membership and whether it was already output.',
    code: `def solve(left, right)
  result = []
  i = 0
  while i < left.length
    in_right = false
    j = 0
    while j < right.length
      in_right = true if left[i] == right[j]
      j += 1
    end
    emitted = false
    j = 0
    while j < result.length
      emitted = true if result[j] == left[i]
      j += 1
    end
    result[result.length] = left[i] if in_right && !emitted
    i += 1
  end
  result
end`, tests: [[[[3,1,3,2],[2,3]],[3,2]], [[[],[1]],[]], [[[null,false],[false]],[false]]], trace: '3 matches and is emitted; 1 fails; the second 3 is skipped; 2 matches.', complexity: 'O(nm + n²) worst-case time; O(n) output space.', invariant: 'Output contains only distinct common values from the visited left prefix.', mistake: 'Using the array & operator hides the algorithm being tested.', followup: 'Improve expected time with hashes.', guidance: 'Build a right-side membership hash and a separate emitted hash; scan the left once.'
  });
  add('two_sum', {
    question: 'Return two distinct indices whose numeric values sum to target.', contract: 'Return the first pair found by a left-to-right scan or nil; do not reuse an index.', idea: 'Store earlier values in a hash; look up the needed complement before inserting the current value.',
    code: `def solve(items, target)
  seen = {}
  i = 0
  while i < items.length
    needed = target - items[i]
    return [seen[needed], i] if seen[needed] != nil
    seen[items[i]] = i if seen[items[i]] == nil
    i += 1
  end
  nil
end`, tests: [[[[2,7,11],9],[0,1]], [[[3,3],6],[0,1]], [[[4],8],null]], trace: 'At 2 store index 0; at 7 find complement 2 and return [0,1].', complexity: 'O(n) expected time with hash access; O(n) extra space.', invariant: 'seen contains only earlier indices, so a match cannot reuse the current element.', mistake: 'Inserting before checking can pair an element with itself.', followup: 'How would you solve it using only constant extra space?', guidance: 'Use nested index loops for O(n²) time, or discuss a sorted two-pointer approach while preserving original indices.'
  });
  add('missing', {
    question: 'Find the single missing integer from 0 through n.', contract: 'Length n; distinct integers in [0,n] with exactly one missing. Input validity is assumed.', idea: 'Subtract each observed number from the arithmetic total of the complete range.',
    code: `def solve(items)
  n = items.length
  remaining = n * (n + 1) / 2
  i = 0
  while i < n
    remaining -= items[i]
    i += 1
  end
  remaining
end`, tests: [[[[3,0,1]],2], [[[]],0], [[[0,1]],2]], trace: 'For [3,0,1], the complete total 6 minus observed total 4 leaves 2.', complexity: 'O(n) time; O(1) extra space. Ruby integers expand as needed.', invariant: 'remaining equals the complete total minus the visited values.', mistake: 'Applying the formula when duplicates or out-of-range values violate the contract.', followup: 'How would you validate the input too?', guidance: 'Track a presence hash and reject duplicates/out-of-range values; account for the added O(n) space.'
  });
  add('max_subarray', {
    question: 'Find the largest sum of a non-empty contiguous subarray.', contract: 'Numeric input; empty array returns nil.', idea: 'At each element, either extend the previous window or start a new one.',
    code: `def solve(items)
  return nil if items.length == 0
  current = items[0]
  best = current
  i = 1
  while i < items.length
    extended = current + items[i]
    current = extended > items[i] ? extended : items[i]
    best = current if current > best
    i += 1
  end
  best
end`, tests: [[[[-2,1,-3,4,-1,2,1,-5,4]],6], [[[-5,-2]],-2], [[[]],null]], trace: 'The winning window [4,-1,2,1] sums to 6. Negative-only input still chooses one real element.', complexity: 'O(n) time; O(1) space.', invariant: 'current is the best non-empty sum ending at i; best is the best seen anywhere.', mistake: 'Starting best at zero incorrectly permits an empty subarray.', followup: 'Return the window boundaries too.', guidance: 'Track a candidate start whenever you restart, and save start/end when best improves.'
  });
  add('prefix', {
    question: 'Build cumulative prefix sums without sum.', contract: 'Numeric array; prefix[i] includes indices 0 through i.', idea: 'Reuse the previous cumulative total instead of rescanning every prefix.',
    code: `def solve(items)
  result = []
  total = 0
  i = 0
  while i < items.length
    total += items[i]
    result[i] = total
    i += 1
  end
  result
end`, tests: [[[[2,-1,4]],[2,1,5]], [[[]],[]], [[[0]],[0]]], trace: 'For [2,-1,4], cumulative values are 2,1,5.', complexity: 'O(n) preprocessing time and O(n) space.', invariant: 'result[i] equals the sum through index i.', mistake: 'Recomputing every prefix with a nested loop adds unnecessary quadratic work.', followup: 'How do you get an inclusive range sum from l to r?', guidance: 'Use prefix[r] minus prefix[l-1] when l > 0; otherwise use prefix[r]. Validate bounds.'
  });
  add('flatten', {
    question: 'Flatten exactly one level of nested arrays.', contract: 'Every outer element is an array; deeper arrays remain values.', idea: 'Visit each row and copy its elements into one output.',
    code: `def solve(rows)
  result = []
  i = 0
  while i < rows.length
    j = 0
    while j < rows[i].length
      result[result.length] = rows[i][j]
      j += 1
    end
    i += 1
  end
  result
end`, tests: [[[[[1,2],[],[3]]],[1,2,3]], [[[]],[]], [[[[[1]], [2]]],[[1],2]]], trace: 'Copy row [1,2], skip the empty row, then copy [3]. A nested [1] stays an array.', complexity: 'O(r + t) time for r rows and t copied values; O(t) output space.', invariant: 'result contains exactly the completed rows and the visited portion of the current row.', mistake: 'Claiming recursive flattening when only one nesting level is handled.', followup: 'How would you handle arbitrary depth?', guidance: 'Use recursion or an explicit stack, with a type check for arrays; discuss depth limits and cycles.'
  });
  add('leaders', {
    question: 'Find values strictly greater than every value to their right.', contract: 'Numeric array; the rightmost value is a leader; output keeps original order.', idea: 'Scan right-to-left, keeping the largest suffix value, then reverse the collected leaders manually.',
    code: `def solve(items)
  found = []
  best = nil
  i = items.length - 1
  while i >= 0
    if best == nil || items[i] > best
      found[found.length] = items[i]
      best = items[i]
    end
    i -= 1
  end
  result = []
  i = found.length - 1
  while i >= 0
    result[result.length] = found[i]
    i -= 1
  end
  result
end`, tests: [[[[16,17,4,3,5,2]],[17,5,2]], [[[]],[]], [[[2,2]],[2]]], trace: 'Scanning from the right finds 2,5,17; manually reverse to return [17,5,2].', complexity: 'O(n) time; O(n) extra space.', invariant: 'best is the largest suffix value already visited.', mistake: 'Using >= when the contract requires strictly greater leaders.', followup: 'What changes if equal values are also leaders?', guidance: 'Change the comparison to >= and test repeated equal values explicitly.'
  });
})();
