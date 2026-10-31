(function () {
  'use strict';
  const JT = window.JT;
  JT.gemGroups = [
    ['Identity and permissions', [['devise', 'Devise'], ['bcrypt', 'bcrypt'], ['pundit', 'Pundit'], ['jwt', 'JWT']]],
    ['Data and background work', [['pg', 'pg / PostgreSQL'], ['kaminari', 'Kaminari'], ['sidekiq', 'Sidekiq'], ['solid_queue', 'Solid Queue'], ['redis', 'redis'], ['solid_cache', 'Solid Cache']]],
    ['APIs and request boundaries', [['rack_attack', 'Rack::Attack'], ['rack_cors', 'Rack CORS'], ['blueprinter', 'Blueprinter'], ['faraday', 'Faraday']]],
    ['Testing and diagnostics', [['rspec', 'RSpec Rails'], ['factory_bot', 'Factory Bot Rails'], ['capybara', 'Capybara'], ['bullet', 'Bullet'], ['mini_profiler', 'Rack Mini Profiler'], ['brakeman', 'Brakeman']]]
  ];
  JT.codingGroups = [
    ['Arrays', [
      ['reverse', 'Reverse an Array'], ['sum', 'Sum Array Values'], ['maximum', 'Find the Maximum'], ['second_max', 'Second Distinct Maximum'], ['deduplicate', 'Remove Duplicates'], ['bubble_sort', 'Bubble Sort'], ['selection_sort', 'Selection Sort'], ['insertion_sort', 'Insertion Sort'], ['linear_search', 'Linear Search'], ['binary_search', 'Binary Search'], ['rotate', 'Rotate Left by K'], ['zeros', 'Move Zeros to the End'], ['merge', 'Merge Sorted Arrays'], ['intersection', 'Distinct Intersection'], ['two_sum', 'Two Sum Indices'], ['missing', 'Find a Missing Number'], ['max_subarray', 'Maximum Subarray Sum'], ['prefix', 'Build Prefix Sums'], ['flatten', 'Flatten One Level'], ['leaders', 'Find Array Leaders']
    ]],
    ['Strings', [
      ['reverse', 'Reverse a String'], ['palindrome', 'Check a Palindrome'], ['vowels', 'Count Vowels'], ['frequency', 'Character Frequencies'], ['first_unique', 'First Non-repeating Character'], ['deduplicate', 'Remove Duplicate Characters'], ['anagram', 'Check Anagrams'], ['word_order', 'Reverse Word Order'], ['trim', 'Trim ASCII Spaces'], ['spaces', 'Collapse Repeated Spaces'], ['substring', 'Find a Substring'], ['replace', 'Replace the First Match'], ['occurrences', 'Count Non-overlapping Matches'], ['longest_word', 'Find the Longest Word'], ['uppercase', 'ASCII Uppercase Conversion'], ['digits', 'Check Decimal Digits'], ['rle', 'Run-length Encoding'], ['brackets', 'Balanced Brackets'], ['integer', 'Parse a Signed Integer'], ['unique_window', 'Longest Unique Substring']
    ]],
    ['Hashes', [
      ['frequency', 'Array Frequency Table'], ['words', 'Word Frequency Table'], ['merge', 'Merge with Right-side Priority'], ['sum', 'Merge and Sum Values'], ['invert', 'Invert Unique Values'], ['group', 'Group by First Character'], ['highest', 'Find the Highest-value Pair'], ['filter', 'Filter by a Threshold'], ['contains', 'Check Key Presence'], ['remove', 'Remove a Key'], ['keys', 'Build a Keys Array'], ['values', 'Build a Values Array'], ['equal', 'Compare Hashes'], ['common', 'Find Common Keys'], ['difference', 'Find Left-only Keys'], ['rename', 'Rename a Key Safely'], ['normalize', 'Normalize ASCII String Keys'], ['nested', 'Look Up a Nested Path'], ['index', 'Index Records by ID'], ['aggregate', 'Aggregate Orders by Customer']
    ]]
  ];
  JT.scenarioGroups = [
    ['Large data and SQL', [
      ['million', 'Load One Million Records at Once?'], ['pagination', 'Deep Pagination Gets Slower'], ['n_plus_one', 'An Orders Page Runs 501 Queries'], ['index', 'A Filter Scans the Whole Table'], ['export', 'A CSV Export Runs Out of Memory'], ['backfill', 'Backfill Millions of Rows Safely'], ['count', 'Dashboard Counts Are Expensive'], ['search', 'Search Becomes Slow as Data Grows'], ['replica', 'A New Order Is Missing on a Replica'], ['pool', 'Database Connections Are Exhausted']
    ]],
    ['APIs and security', [
      ['retries', 'A Client Retries an Order POST'], ['authorization', 'A User Can Read Another User’s Order'], ['cors', 'curl Works but the Browser Fails'], ['csrf', 'A Browser Write Fails CSRF Checks'], ['tokens', 'An Expired Token Looks Like Success'], ['mass_assignment', 'A Client Changes a Protected Field'], ['rate_limit', 'Login Traffic Spikes Suddenly'], ['serialization', 'An API Leaks Extra Fields'], ['versioning', 'A Response Change Breaks Mobile Clients'], ['uploads', 'An Upload Endpoint Exhausts Resources']
    ]],
    ['Background jobs and integrations', [
      ['email', 'Checkout Waits for Email'], ['queue', 'Jobs Are Enqueued but Never Run'], ['duplicates', 'A Job Sends the Same Email Twice'], ['commit', 'A Worker Cannot Find a New Record'], ['poison', 'One Job Retries Forever'], ['timeout', 'A Payment Request Times Out'], ['webhook', 'A Webhook Arrives Twice'], ['outbox', 'A Commit Succeeds but Enqueue Fails'], ['outage', 'An External Service Is Down'], ['shutdown', 'A Deploy Interrupts a Long Job']
    ]],
    ['Consistency and caching', [
      ['inventory', 'Two Customers Buy the Last Item'], ['uniqueness', 'Duplicate Emails Pass Validation'], ['deadlock', 'Transactions Deadlock Under Load'], ['stale_cache', 'A Product Price Stays Stale'], ['tenant_cache', 'One Tenant Sees Another Tenant’s Cache'], ['stampede', 'A Popular Cache Key Expires'], ['locking', 'Two Staff Members Overwrite an Edit'], ['money', 'Discount Totals Differ by a Cent'], ['timezone', 'A Daily Report Misses Orders'], ['deletion', 'A Parent Delete Leaves Broken References']
    ]],
    ['Production and architecture', [
      ['memory', 'Worker Memory Grows Every Hour'], ['cpu', 'CPU Is High but SQL Is Fast'], ['migration', 'A Migration Blocks Production Writes'], ['deploy', 'Assets Disappear After Deployment'], ['secrets', 'Login Loops Across App Instances'], ['observability', 'Only Some Requests Fail'], ['tests', 'Tests Pass but Production Fails'], ['frontend', 'Turbo Navigation Duplicates Handlers'], ['rollout', 'A New Feature Causes a Regression'], ['architecture', 'Monolith or Separate Frontend and Services?']
    ]]
  ];
})();
