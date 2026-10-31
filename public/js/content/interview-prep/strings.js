(function () {
  'use strict';
  const JT = window.JT;
  function add(id, data) { JT.codingProblem('strings', id, { ...data, summary: data.idea, exercise: data.followup, answer: data.guidance, edges: data.edges || ['Empty input', 'One character', 'Repeated characters', 'Case and whitespace under the stated contract'], steps: data.steps || ['Initialize indices and the state described below.', 'Scan characters explicitly; update only the relevant state.', 'Return the constructed value after handling boundary cases.'] }); }
  add('reverse', {
    question: 'Reverse character order without reverse.', contract: 'UTF-8 character indexing; not Unicode grapheme-cluster reversal.', idea: 'Read indices from the end and append characters to a new string.',
    code: `def solve(text)
  result = +""
  i = text.length - 1
  while i >= 0
    result += text[i]
    i -= 1
  end
  result
end`, tests: [[['rails'],'sliar'], [[''],''], [['a'],'a']], trace: 'For rails, append s,l,i,a,r in that order.', complexity: 'O(n) character steps; repeated immutable concatenation can copy O(n²) characters. O(n) result size. Character-index access costs may vary with encoding.', invariant: 'result contains the reverse of the suffix already visited.', mistake: 'Calling this an emoji-safe grapheme reverse; combining sequences can contain several characters.', followup: 'How could you reduce repeated output copying?', guidance: 'Use a mutable append buffer if permitted; explain that it is a construction primitive, not a reversal shortcut.'
  });
  add('palindrome', {
    question: 'Check whether a string reads identically from both ends.', contract: 'Exact, case-sensitive characters; spaces matter; empty string is true.', idea: 'Compare inward-moving left and right pointers, returning false at the first mismatch.',
    code: `def solve(text)
  left = 0
  right = text.length - 1
  while left < right
    return false if text[left] != text[right]
    left += 1
    right -= 1
  end
  true
end`, tests: [[['level'],true], [[''],true], [['Level'],false]], trace: 'In level, l matches l, e matches e, and the pointers meet at v.', complexity: 'O(n) character comparisons and O(1) explicit auxiliary state; variable-width character indexing may add encoding-dependent costs.', invariant: 'All character pairs outside the current boundaries match.', mistake: 'Silently ignoring punctuation or case when the question asked for exact matching.', followup: 'How would you ignore ASCII spaces and letter case?', guidance: 'Normalize characters manually or advance past permitted spaces; state the normalization rules first.'
  });
  add('vowels', {
    question: 'Count ASCII vowels without count, scan or regular expressions.', contract: 'Count a,e,i,o,u in both cases; y is not a vowel in this contract.', idea: 'Check each character against a small explicit vowel string.',
    code: `def solve(text)
  vowels = "aeiouAEIOU"
  total = 0
  i = 0
  while i < text.length
    j = 0
    while j < vowels.length
      total += 1 if text[i] == vowels[j]
      j += 1
    end
    i += 1
  end
  total
end`, tests: [[['Education'],5], [[''],0], [['rhythm'],0]], trace: 'Education contains E,u,a,i,o: five matching characters.', complexity: 'O(10n) character checks, conventionally O(n) for ASCII; O(1) state.', invariant: 'total counts vowels only in the visited prefix.', mistake: 'Counting accented vowels without defining whether the input contract includes them.', followup: 'Count consonants too for ASCII letters.', guidance: 'First determine whether the character is an ASCII letter, then classify it using the vowel check.'
  });
  add('frequency', {
    question: 'Build a character frequency hash without tally.', contract: 'Case-sensitive; every character including a space is counted.', idea: 'Use characters as keys and increment an integer counter.',
    code: `def solve(text)
  counts = {}
  i = 0
  while i < text.length
    char = text[i]
    counts[char] = 0 if counts[char] == nil
    counts[char] += 1
    i += 1
  end
  counts
end`, tests: [[['aba'],{a:2,b:1}], [[''],{}], [['A a'],{A:1,' ':1,a:1}]], trace: 'Read a:1, b:1, then increase a to 2.', complexity: 'O(n) expected hash operations and O(k) space for k distinct characters, apart from encoding-index costs.', invariant: 'Each counter equals occurrences in the scanned prefix.', mistake: 'Resetting a count to one every time the character appears.', followup: 'Return the most frequent character with first-occurrence tie-breaking.', guidance: 'Count first, then scan the original text and update a best candidate only for a strictly larger count.'
  });
  add('first_unique', {
    question: 'Return the first character appearing exactly once.', contract: 'Case-sensitive; nil if there is no such character.', idea: 'Count in one pass and find the first count of one in a second pass.',
    code: `def solve(text)
  counts = {}
  i = 0
  while i < text.length
    char = text[i]
    counts[char] = 0 if counts[char] == nil
    counts[char] += 1
    i += 1
  end
  i = 0
  while i < text.length
    return text[i] if counts[text[i]] == 1
    i += 1
  end
  nil
end`, tests: [[['swiss'],'w'], [['aabb'],null], [[''],null]], trace: 'swiss counts s three times; scanning again skips s and returns w.', complexity: 'O(n) character visits and expected hash operations; O(k) space.', invariant: 'The second scan never skips an earlier unique character.', mistake: 'Returning a unique character in hash iteration order without ensuring the required input order.', followup: 'Return its index instead.', guidance: 'Return i at the first unique count; choose and document -1 or nil for absence.'
  });
  add('deduplicate', {
    question: 'Remove repeated characters while preserving their first occurrence.', contract: 'Case-sensitive; produce a new string.', idea: 'Use a presence hash and append only unseen characters.',
    code: `def solve(text)
  seen = {}
  result = +""
  i = 0
  while i < text.length
    char = text[i]
    unless seen[char]
      result += char
      seen[char] = true
    end
    i += 1
  end
  result
end`, tests: [[['banana'],'ban'], [[''], ''], [['AaA'],'Aa']], trace: 'banana emits b,a,n and skips later a/n occurrences.', complexity: 'O(n) expected membership operations; repeated concatenation can cost O(n²) copying; O(k) set and output size.', invariant: 'result contains first occurrences of visited characters only.', mistake: 'Using a sorted set changes first-occurrence order.', followup: 'Keep the last occurrence instead.', guidance: 'Count remaining occurrences or scan from the right and manually restore order; explain the chosen output order.'
  });
  add('anagram', {
    question: 'Check whether two strings contain the same characters with the same counts.', contract: 'Case-sensitive; spaces count; empty strings are anagrams.', idea: 'Count the left characters and consume those counts with the right characters.',
    code: `def solve(left, right)
  return false if left.length != right.length
  counts = {}
  i = 0
  while i < left.length
    char = left[i]
    counts[char] = 0 if counts[char] == nil
    counts[char] += 1
    i += 1
  end
  i = 0
  while i < right.length
    char = right[i]
    return false if counts[char] == nil || counts[char] == 0
    counts[char] -= 1
    i += 1
  end
  true
end`, tests: [[['listen','silent'],true], [['aab','abb'],false], [['',''],true]], trace: 'For aab/abb, the second b cannot consume a positive b count.', complexity: 'O(n) expected hash operations and character visits; O(k) space.', invariant: 'counts represent unconsumed left-side characters.', mistake: 'Comparing only distinct characters and ignoring multiplicity.', followup: 'Ignore ASCII spaces while comparing.', guidance: 'Skip spaces in both counting and consumption; do not use raw length equality unless normalized lengths are also tracked.'
  });
  add('word_order', {
    question: 'Reverse word order without split or join.', contract: 'Words are separated by ASCII spaces; output uses one space and no edge spaces.', idea: 'Scan words manually into an array, then construct the output from the final word backward.',
    code: `def solve(text)
  words = []
  i = 0
  while i < text.length
    i += 1 while i < text.length && text[i] == " "
    word = +""
    while i < text.length && text[i] != " "
      word += text[i]
      i += 1
    end
    words[words.length] = word if word.length > 0
  end
  result = +""
  i = words.length - 1
  while i >= 0
    result += " " if result.length > 0
    result += words[i]
    i -= 1
  end
  result
end`, tests: [[['  learn rails now '],'now rails learn'], [['   '],''], [['one'],'one']], trace: 'Tokenize learn, rails, now; emit now then rails then learn.', complexity: 'O(n) scan steps; repeated string concatenation may copy O(n²) characters; O(n) stored words/output.', invariant: 'Each collected word contains exactly one non-space run.', mistake: 'Reversing letters in each word when only word order should change.', followup: 'Preserve all original spacing instead.', guidance: 'Treat spaces and words as separate runs and define how their positions should transform before coding.'
  });
  add('trim', {
    question: 'Remove leading and trailing ASCII spaces without strip.', contract: 'Only the literal space is trimmed; tabs and newlines are preserved.', idea: 'Find the first and last non-space positions, then copy the enclosed characters.',
    code: `def solve(text)
  left = 0
  right = text.length - 1
  left += 1 while left <= right && text[left] == " "
  right -= 1 while right >= left && text[right] == " "
  result = +""
  while left <= right
    result += text[left]
    left += 1
  end
  result
end`, tests: [[['  ruby rails  '],'ruby rails'], [['   '],''], [[''],'']], trace: 'Skip two outer spaces on each side; preserve the internal space.', complexity: 'O(n) visits; concatenation can incur O(n²) copying; O(n) result.', invariant: 'The selected boundaries exclude only permitted edge spaces.', mistake: 'Removing internal spaces or treating all whitespace as equivalent without a contract.', followup: 'Trim tabs as well.', guidance: 'Change the boundary predicate to accept space or tab, leaving the copying logic unchanged.'
  });
  add('spaces', {
    question: 'Collapse each run of ASCII spaces to one space.', contract: 'Keep one leading/trailing space if present; this is not trimming.', idea: 'Append a space only when the preceding input character was not a space.',
    code: `def solve(text)
  result = +""
  previous_space = false
  i = 0
  while i < text.length
    space = text[i] == " "
    result += text[i] unless space && previous_space
    previous_space = space
    i += 1
  end
  result
end`, tests: [[[' a   b  '],' a b '], [[''],''], [['   '],' ']], trace: 'The first space in each run is appended; subsequent spaces are skipped.', complexity: 'O(n) visits; concatenation can cost O(n²) copying; O(n) output.', invariant: 'Output contains at most one space for each visited input space run.', mistake: 'Accidentally combining collapse and trim requirements.', followup: 'Produce collapsed and trimmed text in one scan.', guidance: 'Avoid leading spaces and delay inserting a pending separator until the next non-space arrives.'
  });
  add('substring', {
    question: 'Find the first starting index of a substring without index or include?.', contract: 'Exact characters; empty needle returns 0; absence returns -1.', idea: 'Try every valid start and compare the needle character by character.',
    code: `def solve(text, needle)
  return 0 if needle.length == 0
  start = 0
  while start <= text.length - needle.length
    j = 0
    j += 1 while j < needle.length && text[start + j] == needle[j]
    return start if j == needle.length
    start += 1
  end
  -1
end`, tests: [[['rails tutorial','tutorial'],6], [['abc',''],0], [['abc','abcd'],-1]], trace: 'For tutorial, candidate starts fail until index 6 matches every character.', complexity: 'O(nm) character comparisons worst case, O(1) auxiliary state; indexing may add encoding costs.', invariant: 'All starts before start have been ruled out.', mistake: 'Checking only the first matching character rather than the complete needle.', followup: 'What improves worst-case matching?', guidance: 'Explain KMP’s prefix table or another string-search algorithm; do not claim this naive solution is linear.'
  });
  add('replace', {
    question: 'Replace only the first exact substring occurrence without sub or gsub.', contract: 'Non-empty needle; absent returns equal text; empty needle raises ArgumentError.', idea: 'Find the first match manually, then copy prefix, replacement and suffix.',
    code: `def solve(text, needle, replacement)
  raise ArgumentError, "empty needle" if needle.length == 0
  found = -1
  i = 0
  while i <= text.length - needle.length
    j = 0
    j += 1 while j < needle.length && text[i + j] == needle[j]
    if j == needle.length
      found = i
      break
    end
    i += 1
  end
  return text if found == -1
  result = +""
  i = 0
  while i < found
    result += text[i]
    i += 1
  end
  result += replacement
  i = found + needle.length
  while i < text.length
    result += text[i]
    i += 1
  end
  result
end`, tests: [[['red red','red','blue'],'blue red'], [['abc','z','x'],'abc'], [['aaa','a',''],'aa']], errorTests: [[['abc','','x'],'ArgumentError']], trace: 'Match the first red at 0, append blue, then copy the suffix space+red.', complexity: 'O(nm) matching comparisons plus potentially O(n²) output copying; O(n + replacement length) result.', invariant: 'Once found is set, only that occurrence is replaced.', mistake: 'Searching the newly replaced output again and replacing more than one occurrence.', followup: 'How would you replace all non-overlapping matches?', guidance: 'Scan left-to-right, emit replacement at a match and advance by the needle length.'
  });
  add('occurrences', {
    question: 'Count non-overlapping exact substring matches.', contract: 'Empty needle raises ArgumentError; matches do not overlap.', idea: 'After a full match, move forward by the needle length; otherwise move one character.',
    code: `def solve(text, needle)
  raise ArgumentError, "empty needle" if needle.length == 0
  total = 0
  i = 0
  while i <= text.length - needle.length
    j = 0
    j += 1 while j < needle.length && text[i + j] == needle[j]
    if j == needle.length
      total += 1
      i += needle.length
    else
      i += 1
    end
  end
  total
end`, tests: [[['aaaa','aa'],2], [['abc','z'],0], [['','a'],0]], errorTests: [[['abc',''],'ArgumentError']], trace: 'aaaa/aa matches at 0 and 2. It does not also count start 1.', complexity: 'O(nm) worst-case character comparisons; O(1) explicit auxiliary state.', invariant: 'The consumed prefix contains exactly total disjoint matches.', mistake: 'Advancing by one after a match changes the result to overlapping matching.', followup: 'Count overlapping matches instead.', guidance: 'Advance by one after every attempt, including successful matches; aaaa/aa then has three matches.'
  });
  add('longest_word', {
    question: 'Return the longest ASCII-space-delimited word without split or max.', contract: 'Ties choose the first word; no words returns an empty string.', idea: 'Track word boundaries and the best length, copying only the final winner.',
    code: `def solve(text)
  best_start = 0
  best_length = 0
  i = 0
  while i < text.length
    i += 1 while i < text.length && text[i] == " "
    start = i
    i += 1 while i < text.length && text[i] != " "
    length = i - start
    if length > best_length
      best_start = start
      best_length = length
    end
  end
  result = +""
  i = 0
  while i < best_length
    result += text[best_start + i]
    i += 1
  end
  result
end`, tests: [[['build reliable rails'],'reliable'], [['one two'],'one'], [['   '],'']], trace: 'Lengths are 5,8,5; the second word remains the winner.', complexity: 'O(n) scan steps plus output construction copying up to O(n²); O(n) worst-case result space.', invariant: 'best boundaries identify the first longest completed word.', mistake: 'Updating on >= changes first-tie behavior to last-tie behavior.', followup: 'Return every tied longest word.', guidance: 'Keep candidate boundaries for the current best length and reset them only when a longer word appears.'
  });
  add('uppercase', {
    question: 'Convert ASCII lowercase letters to uppercase without upcase.', contract: 'Non-ASCII and non-letter characters are unchanged.', idea: 'Use parallel lowercase/uppercase alphabets and find the matching position manually.',
    code: `def solve(text)
  lower = "abcdefghijklmnopqrstuvwxyz"
  upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  result = +""
  i = 0
  while i < text.length
    converted = text[i]
    j = 0
    while j < 26
      converted = upper[j] if text[i] == lower[j]
      j += 1
    end
    result += converted
    i += 1
  end
  result
end`, tests: [[['Rails 8!'],'RAILS 8!'], [[''],''], [['ABC'],'ABC']], trace: 'R is unchanged, a maps through position 0 to A, and subsequent letters map similarly.', complexity: '26n character checks; O(n²) possible copying with repeated concatenation; O(n) output.', invariant: 'Visited ASCII lowercase characters are mapped once; other characters are preserved.', mistake: 'Claiming complete Unicode case conversion from a 26-letter alphabet.', followup: 'Implement lowercase conversion too.', guidance: 'Swap the search and replacement alphabets; keep the explicit ASCII scope.'
  });
  add('digits', {
    question: 'Check whether a non-empty string contains only decimal ASCII digits.', contract: 'No sign, spaces, decimal point or non-ASCII digit characters.', idea: 'Reject any character outside the inclusive range 0 through 9.',
    code: `def solve(text)
  return false if text.length == 0
  i = 0
  while i < text.length
    return false if text[i] < "0" || text[i] > "9"
    i += 1
  end
  true
end`, tests: [[['1024'],true], [[''],false], [['-12'],false]], trace: '1024 passes every character range check; a minus sign fails immediately.', complexity: 'O(n) checks; O(1) state for ASCII input.', invariant: 'All previously visited characters are ASCII digits.', mistake: 'Using to_i to validate: permissive conversion can accept a numeric prefix of invalid text.', followup: 'Allow one leading plus/minus sign.', guidance: 'Skip a single sign at index 0 but still require at least one following digit.'
  });
  add('rle', {
    question: 'Encode consecutive runs as character plus run length.', contract: 'Teaching encoder; empty input gives empty output. Digit characters make this format ambiguous to decode.', idea: 'Count a run, emit it when the character changes, then emit the final run.',
    code: `def count_text(value)
  digits = "0123456789"
  result = +""
  while value > 0
    result = digits[value % 10] + result
    value /= 10
  end
  result
end

def solve(text)
  return "" if text.length == 0
  result = +""
  current = text[0]
  count = 1
  i = 1
  while i < text.length
    if text[i] == current
      count += 1
    else
      result += current + count_text(count)
      current = text[i]
      count = 1
    end
    i += 1
  end
  result + current + count_text(count)
end`, tests: [[['aaabbc'],'a3b2c1'], [[''],''], [['x'],'x1']], trace: 'The b at index 3 ends the a-run, so emit a3; later emit b2 and finally c1.', complexity: 'O(n) scan steps; concatenation can cost O(n²) copying; O(n) result. The count is formatted manually with division and remainder.', invariant: 'All completed runs are emitted and current/count describe the active run.', mistake: 'Forgetting the final run or claiming this always compresses short strings.', followup: 'Design an unambiguous encoding for digit characters.', guidance: 'Use length-delimited pairs or a structured array of [character,count] records; specify escaping if using text.'
  });
  add('brackets', {
    question: 'Check proper nesting of (), [] and {} without a stack helper.', contract: 'Ignore non-bracket characters; empty string is balanced.', idea: 'Use an array plus a top index as a manual stack of opening brackets.',
    code: `def solve(text)
  stack = []
  top = 0
  i = 0
  while i < text.length
    char = text[i]
    if char == "(" || char == "[" || char == "{"
      stack[top] = char
      top += 1
    elsif char == ")" || char == "]" || char == "}"
      return false if top == 0
      opening = stack[top - 1]
      valid = (opening == "(" && char == ")") ||
        (opening == "[" && char == "]") || (opening == "{" && char == "}")
      return false unless valid
      top -= 1
    end
    i += 1
  end
  top == 0
end`, tests: [[['a{b[c](d)}'],true], [['([)]'],false], [[''],true]], trace: '([)] fails when ) tries to close the latest unmatched [, even though counts could match.', complexity: 'O(n) character steps and O(n) maximum stack space.', invariant: 'Indices below top are exactly the unmatched opening brackets.', mistake: 'Comparing only total opening/closing counts ignores nesting order.', followup: 'Return the first error position.', guidance: 'Return i on a mismatch; for leftover openings also store their input positions.'
  });
  add('integer', {
    question: 'Parse a signed decimal integer without to_i or Integer().', contract: 'Optional one sign, then at least one ASCII digit; no whitespace. Invalid input raises ArgumentError.', idea: 'Find each digit’s value manually, then accumulate value = value * 10 + digit.',
    code: `def solve(text)
  raise ArgumentError, "empty input" if text.length == 0
  sign = 1
  i = 0
  if text[0] == "+" || text[0] == "-"
    sign = -1 if text[0] == "-"
    i = 1
  end
  raise ArgumentError, "missing digits" if i == text.length
  digits = "0123456789"
  total = 0
  while i < text.length
    value = -1
    j = 0
    while j < 10
      value = j if text[i] == digits[j]
      j += 1
    end
    raise ArgumentError, "invalid digit" if value == -1
    total = total * 10 + value
    i += 1
  end
  total * sign
end`, tests: [[['-120'],-120], [['+007'],7], [['0'],0]], errorTests: [[[''],'ArgumentError'], [['-'],'ArgumentError'], [['12x'],'ArgumentError']], trace: '-120 selects sign -1, then builds 1 → 12 → 120 and applies the sign.', complexity: 'O(n) digit checks with a constant 10-character lookup. Big-integer arithmetic costs grow with input size; O(n) bits may be needed.', invariant: 'total represents exactly the parsed digit prefix without the sign.', mistake: 'Accepting a sign with no digits or silently stopping at the first invalid character.', followup: 'Add a signed 32-bit range restriction.', guidance: 'Check the next multiplication/addition against the allowed limit before accepting it; allow the asymmetric negative minimum.'
  });
  add('unique_window', {
    question: 'Return the longest substring with no repeated characters.', contract: 'Exact characters; first longest tie wins; empty returns empty.', idea: 'A sliding window moves its left edge beyond the previous occurrence of a repeated character.',
    code: `def solve(text)
  last = {}
  left = 0
  best_start = 0
  best_length = 0
  right = 0
  while right < text.length
    char = text[right]
    if last[char] != nil && last[char] >= left
      left = last[char] + 1
    end
    last[char] = right
    length = right - left + 1
    if length > best_length
      best_start = left
      best_length = length
    end
    right += 1
  end
  result = +""
  i = 0
  while i < best_length
    result += text[best_start + i]
    i += 1
  end
  result
end`, tests: [[['abcabcbb'],'abc'], [['bbbbb'],'b'], [['abba'],'ab'], [[''],'']], trace: 'In abba the second b moves left to 2; the final a must not move left backward to 1.', complexity: 'O(n) expected window/hash steps; result concatenation may copy O(n²) characters; O(k) hash plus output space.', invariant: 'The window [left,right] has no repeated character, and left never moves backward.', mistake: 'Always setting left to last[char]+1 can move it backward for repeats outside the current window.', followup: 'Return only the length with constant output space.', guidance: 'Return best_length and omit result construction; auxiliary hash space remains O(k).'
  });
})();
