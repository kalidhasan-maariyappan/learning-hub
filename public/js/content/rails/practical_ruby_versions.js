(function () {
  'use strict';
  const chapter = window.JT.practicalChapter;
  const news4 = ['Ruby 4.0 NEWS', 'https://docs.ruby-lang.org/en/4.0/NEWS_md.html'];
  const news34 = ['Ruby 3.4 NEWS', 'https://docs.ruby-lang.org/en/3.4/NEWS_md.html'];
  chapter('rails_practical_ruby_releases', {
    version: 'CRuby 3.0, 3.2, 3.4 and 4.0; not a claim about an unreleased Ruby 4.1.', prerequisites: 'Ruby methods, blocks, gems and Rails booting.',
    what: 'Ruby is the language/runtime underneath Rails. Major-version labels hide years of incremental language, library and performance changes.',
    why: 'An example using Data or the implicit it parameter does not run on every Ruby 3 release. A Rails minimum version is also not proof of compatibility with every newer Ruby and gem.',
    when: 'Use this baseline before selecting tutorial syntax, a deployment image or a runtime-upgrade target.',
    how: 'Record interpreter engine, exact version, Bundler, Rails and native libraries. Ruby 4.0 was released on 25 December 2025. Treat experimental features separately from ordinary supported syntax.',
    comparison: {headers: ['Release', 'Examples of changes', 'Rails implication'], rows: [
      ['3.0', 'Keyword argument separation, Ractor and Fiber Scheduler foundations', 'Older Ruby-2-style keyword forwarding can fail'],
      ['3.2', 'Data value objects; production-ready YJIT milestone', 'Useful baseline for Rails 8 minimum'],
      ['3.4', 'Implicit it block parameter; Prism default parser', 'Do not label this syntax as Ruby 4-only'],
      ['4.0', 'New language/core APIs; experimental Ruby Box and ZJIT; Ractor messaging changes', 'Test dependencies, HTTP clients, native extensions and runtime flags']
    ]},
    steps: ['Inspect runtime and engine.', 'Record Rails and Bundler versions.', 'Read the NEWS for every intervening minor.', 'Verify gems’ declared and tested support.', 'Create an old/new runtime matrix for the application.'],
    examples: [
      {title: 'Runtime identity in Ruby or Rails console', code: 'puts RUBY_DESCRIPTION\nputs RUBY_ENGINE\nputs RUBY_VERSION'},
      {title: 'Ruby 3.2+ Data example', code: 'Price = Data.define(:amount_cents, :currency)\nprice = Price.new(amount_cents: 1200, currency: "INR")\np price.amount_cents', result: '1200; Data prevents member reassignment, but nested mutable objects are not automatically deeply frozen.'}
    ],
    scenario: {title: 'A “Ruby 3” example fails in CI', before: 'A developer uses it locally on 3.4 while CI still runs 3.2.', investigate: ['Compare RUBY_DESCRIPTION in both environments.', 'Find the syntax introduction release.', 'Either raise the documented minimum or use an explicit block parameter.'], after: 'The lesson/application has an honest minimum runtime and a matching CI configuration.'},
    verify: ['Boot Rails and its worker under the target.', 'Check the lockfile and platform-specific gems.', 'Run examples on the minimum version the project promises.'],
    tips: ['CRuby-specific JIT options do not automatically apply to JRuby.', 'Historical release features are not maintenance recommendations.', 'Separate Ruby and Rails upgrades when possible.'],
    mistake: 'Comparing all Ruby 3 releases with Ruby 4 as two uniform feature sets.',
    exercises: [['Does it require Ruby 4?', 'No. The implicit block parameter arrived in Ruby 3.4.'], ['Does Rails 8 minimum Ruby 3.2 guarantee Ruby 4 support?', 'No. Test the exact Rails patch, gems, platform and application together.']],
    interview: [['What belongs in a compatibility matrix?', 'Runtime engine/version, Rails, Bundler, gems, platform and relevant native library versions.'], ['Why specify a minimum runtime?', 'It defines which syntax and APIs users can rely on.']],
    summary: 'Compare exact versions and prove the complete application stack, not just the language executable.', sources: [['Ruby 3.0 release', 'https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/'], ['Ruby 3.2 release', 'https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/'], news34, ['Ruby 4.0 release', 'https://www.ruby-lang.org/en/news/2025/12/25/ruby-4-0-0-released/'], ['Rails Ruby requirements', 'https://guides.rubyonrails.org/upgrading_ruby_on_rails.html#ruby-versions']]
  });
  chapter('rails_practical_ruby_language', {
    version: 'Examples label Ruby 3.x-compatible, 3.4+ and 4.0-only syntax.', prerequisites: 'Blocks, keyword arguments and boolean expressions.',
    what: 'Language changes affect parsing and how arguments or expressions behave. New syntax is optional unless the project deliberately raises its minimum runtime.',
    why: 'A formatter can emit syntax older CI cannot parse. Library code also needs argument forwarding that preserves keywords across supported releases.',
    when: 'Review language changes when adopting a new runtime, formatter, linter or code generator.',
    how: 'Ruby 3 keyword separation remains relevant in Ruby 4. Ruby 3.4 introduced it. Ruby 4 allows a logical binary operator at the beginning of a continuation line. Prefer explicit blocks for complex code even when shorthand is available.',
    steps: ['Choose the project minimum Ruby version.', 'Configure tooling to that target.', 'Compare new syntax with an equivalent portable form.', 'Run syntax checks on the lowest supported runtime.', 'Add argument-forwarding tests for shared service wrappers.'],
    examples: [
      {title: 'Portable blocks versus Ruby 3.4+ shorthand', code: '# All supported Ruby 3.x/4.0:\n[100, 200].map { |cents| cents * 2 }\n\n# Ruby 3.4 and 4.0:\n[100, 200].map { it * 2 }', result: '[200, 400] for both expressions on their supported versions.'},
      {title: 'Logical continuation: old portable form and Ruby 4 form', code: '# Ruby 3.x and 4.0:\nallowed = signed_in? &&\n  owns_order?\n\n# Ruby 4.0 accepts a leading operator continuation:\nallowed = signed_in?\n  && owns_order?', result: 'Fragments assume the predicate methods exist. The second form is not Ruby 3-compatible syntax.'},
      {title: 'Explicit keyword forwarding on Ruby 3 and 4', code: 'def create_order(customer_id:, total_cents:)\n  { customer_id: customer_id, total_cents: total_cents }\nend\n\ndef forward_order(**attributes)\n  create_order(**attributes)\nend\n\np forward_order(customer_id: 42, total_cents: 1200)'},
      {title: 'Make string mutability explicit on Ruby 3 and 4', code: '# frozen_string_literal: true\nlabel = "Order"\np label.frozen?\nbuffer = +"Order"\nbuffer << " #101"\nputs buffer', result: 'true\nOrder #101'}
    ],
    scenario: {title: 'A formatting change breaks older workers', before: 'New source uses leading && continuation while an old worker image still runs Ruby 3.4.', investigate: ['Read the syntax error and exact worker runtime.', 'Compare parser support, not gem versions alone.', 'Keep portable syntax until every runtime is upgraded.', 'Add syntax checks to the minimum-version CI job.'], after: 'Shared source remains parseable across the declared support window.'},
    verify: ['Run ruby -c against relevant files on both runtimes.', 'Test keyword forwarding and missing/extra keyword errors.', 'Verify formatter target version.'],
    tips: ['A method existence guard cannot hide syntax an old parser cannot read.', 'Keep complex predicates readable rather than maximizing shorthand.', 'Ruby 3.4 introduced opt-in deprecation warnings for mutation of certain string literals. Do not assume Ruby 4 makes every literal frozen; declare the intended policy and use an explicit mutable buffer.', 'Treat source-code generators as compatibility dependencies.'],
    mistake: 'Calling every modern Ruby feature Ruby 4-specific, or mixing positional hashes and keyword arguments accidentally.',
    exercises: [['Rewrite [1, 2].map { it + 1 } for Ruby 3.2.', 'Use [1, 2].map { |value| value + 1 }.'], ['Why will respond_to? not protect a Ruby 4 syntax block on Ruby 3?', 'The entire file must parse before the runtime can evaluate that guard.']],
    interview: [['What is a syntax compatibility boundary?', 'The oldest parser that must read the source; it is separate from whether a method exists at runtime.'], ['Why explicit **attributes?', 'It forwards keyword arguments intentionally instead of relying on implicit hash conversion.']],
    summary: 'Raise syntax requirements intentionally and keep tooling, CI and workers aligned.', sources: [news34, news4, ['Ruby keyword separation', 'https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/']]
  });
  chapter('rails_practical_ruby_core', {
    version: 'Ruby 3.4 versus 4.0; HTTP behavior also depends on the resolved net-http gem version.', prerequisites: 'Arrays, Set, JSON and HTTP headers.',
    what: 'Core-library changes can add convenient APIs or change observable behavior without changing ordinary Rails controller syntax.',
    why: 'An upgrade can break a snapshot that compares inspect strings or an HTTP client that depended on an implicit content type. External contracts need explicit behavior.',
    when: 'Review collection helpers, HTTP integrations and serialization tests during a runtime or bundled-library upgrade.',
    how: 'Ruby 4 adds Array#rfind for reverse searching. Set becomes a core class and its inspection display changes. The net-http version shipped with Ruby 4 stops supplying the old implicit form content type for arbitrary request bodies; send the intended header explicitly.',
    steps: ['Find core/library methods used in integration boundaries.', 'Compare behavior with a small script on both versions.', 'Replace incidental representation assertions with semantic assertions.', 'Set HTTP content types deliberately.', 'Test the actual resolved library version as well as Ruby.'],
    examples: [
      {title: 'Reverse search comparison', code: 'amounts = [100, 800, 300, 900]\n# Ruby 3.x and Ruby 4:\np amounts.reverse_each.find { |amount| amount < 500 }\n# Ruby 4.0:\np amounts.rfind { |amount| amount < 500 }', result: '300 for both searches.'},
      {title: 'Set semantics, not inspect formatting', code: 'require "set" # Keep for cross-version source.\nids = Set.new([3, 3, 7])\np ids.size\np ids.include?(7)', result: '2\ntrue'},
      {title: 'Explicit JSON request construction; no request sent', code: 'require "net/http"\nrequire "json"\nuri = URI("https://payments.example.test/charges")\nrequest = Net::HTTP::Post.new(uri)\nrequest["Content-Type"] = "application/json"\nrequest["Accept"] = "application/json"\nrequest.body = JSON.generate(amount_cents: 1200)', result: 'A request object with explicit JSON headers/body. Add provider authentication, timeouts and idempotency before a real payment integration.'}
    ],
    scenario: {title: 'An upstream service rejects requests after upgrade', before: 'The client sends a body but relied on an implicit Content-Type.', investigate: ['Capture sanitized outgoing headers/body in a controlled test.', 'Compare the resolved net-http versions.', 'Set the correct content type for JSON or use set_form_data for form submissions.', 'Verify the upstream contract.'], after: 'The request identifies its encoding explicitly and no longer relies on a library default.'},
    verify: ['Test the reverse-search result, including no match.', 'Compare Set membership rather than inspect text.', 'Assert outgoing content type and body encoding.'],
    tips: ['inspect is for diagnostics, not a stable data interchange format.', 'A newer default gem can also be installed on an older Ruby; dependency version matters.', 'Do not adopt rfind in code still promising Ruby 3 compatibility.'],
    mistake: 'Using debug strings as persisted API data or assuming a runtime change is the only way a library behavior can change.',
    exercises: [['How do you preserve a form submission contract?', 'Use request.set_form_data with the intended fields, or explicitly encode and label the body.'], ['What does rfind return if nothing matches?', 'nil unless an alternative behavior is explicitly supplied by the API; handle the missing case.']],
    interview: [['Why can an inspect snapshot fail while behavior is correct?', 'Diagnostic formatting can change independently of collection semantics.'], ['What should an HTTP integration test assert?', 'Method, URL, authentication contract, headers, encoding, relevant body and failure behavior.']],
    summary: 'Make external contracts explicit and test semantic behavior instead of incidental output formatting.', sources: [['Ruby 4 Array', 'https://docs.ruby-lang.org/en/4.0/Array.html#method-i-rfind'], ['Ruby 4 Set', 'https://docs.ruby-lang.org/en/4.0/Set.html'], news4, ['Net::HTTP official project', 'https://github.com/ruby/net-http']]
  });
  chapter('rails_practical_ruby_jit', {
    version: 'CRuby 3.2/3.4 and Ruby 4.0.0 release behavior; platform/build dependent.', prerequisites: 'Profiling, CPU versus I/O and repeatable benchmarks.',
    what: 'A just-in-time compiler translates frequently executed Ruby code into machine code. It can improve Ruby execution but does not remove SQL or network waiting.',
    why: 'A runtime upgrade can improve throughput while also changing memory and warm-up behavior. ShopDesk needs workload evidence rather than a headline speed claim.',
    when: 'Evaluate JIT after understanding application bottlenecks, using supported runtime builds and representative long-lived workloads.',
    how: 'YJIT reached a production-ready milestone in Ruby 3.2. Ruby 4.0 introduces experimental ZJIT; its release guidance does not present it as a production replacement for YJIT. Rails 7.2 can enable YJIT by default when supported. Verify actual runtime state.',
    steps: ['Record hardware, Ruby build, Rails version and worker configuration.', 'Measure interpreter/JIT state instead of assuming it.', 'Warm up representative traffic.', 'Compare latency, throughput, errors and memory under the same load.', 'Choose rollout settings based on the application’s resource budget.'],
    examples: [
      {title: 'Inspect YJIT without assuming availability', code: 'enabled = defined?(RubyVM::YJIT) && RubyVM::YJIT.enabled?\nputs "yjit_enabled=#{!!enabled}"'},
      {title: 'Controlled Ruby runtime experiments', lang: 'text', code: 'ruby --yjit workload.rb\n# Ruby 4.0 experimental comparison, when built with support:\nruby --zjit workload.rb', result: 'The same workload.rb must exist for each run. Do not enable both compiler flags for a meaningful comparison.'},
      {title: 'A small teaching workload; not a Rails capacity benchmark', code: 'require "benchmark"\nvalues = (1..10_000).to_a\n5.times do\n  elapsed = Benchmark.realtime do\n    200.times { values.sum { |value| value * 3 } }\n  end\n  puts elapsed.round(4)\nend'}
    ],
    scenario: {title: 'A faster microbenchmark does not improve checkout', before: 'The runtime test is CPU-heavy while checkout mainly waits on a payment service.', investigate: ['Inspect checkout’s trace.', 'Compare CPU time with dependency wait.', 'Benchmark real request traffic and resource use.', 'Optimize the measured dependency path separately.'], after: 'The team reports workload-specific effects rather than promising every request becomes a fixed percentage faster.'},
    verify: ['Check warm-up and steady-state behavior.', 'Compare peak memory and worker restarts.', 'Keep request mix and database state equivalent.'],
    tips: ['Short scripts may not represent long-running Rails processes.', 'Different CRuby builds expose different JIT capabilities.', 'Do not copy runtime-specific flags to another Ruby engine.'],
    mistake: 'Treating Ruby 4 or experimental ZJIT as a guaranteed application-wide speedup.',
    exercises: [['What should accompany a throughput result?', 'Latency percentiles, errors, memory, warm-up, workload, hardware and runtime flags.'], ['Why can memory offset a JIT throughput benefit?', 'More per-process memory may reduce the worker count that fits safely on the host.']],
    interview: [['Why distinguish CPU and wall time?', 'Waiting increases elapsed time without consuming equivalent Ruby CPU; compilation mainly targets execution.'], ['What does “experimental” change in a rollout?', 'It calls for controlled evaluation and compatibility checks rather than assuming the production maturity of an established option.']],
    summary: 'Verify compiler state and benchmark the real workload, including memory and warm-up.', sources: [['Ruby 3.2 YJIT milestone', 'https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/'], ['Ruby 4.0 release: JIT guidance', 'https://www.ruby-lang.org/en/news/2025/12/25/ruby-4-0-0-released/'], ['Rails 7.2 notes', 'https://guides.rubyonrails.org/7_2_release_notes.html']]
  });
  chapter('rails_practical_ruby_concurrency', {
    version: 'Ruby 3.x Ractor APIs versus Ruby 4.0 Ractor::Port; Ruby Box experimental in 4.0.', prerequisites: 'Threads, processes, object sharing and isolated Ruby scripts.',
    what: 'Ractors provide isolated parallel execution with restricted object sharing. Ruby Box separates definitions within a process. They address different problems.',
    why: 'A concurrency experiment must not assume every Rails dependency is Ractor-safe. Definition isolation also does not create a security sandbox for untrusted code.',
    when: 'Explore these features in isolated CPU-work experiments or library research. Use established job processes for routine Rails background work unless compatibility is proven.',
    how: 'Ruby 4 introduces Ractor::Port and removes older messaging methods such as take and Ractor.yield. Ports have an owning Ractor that receives messages. Ruby Box is enabled before startup with RUBY_BOX=1 and can load definitions into a separate box; its documentation lists known issues, including Active Support-related loading.',
    steps: ['Keep experiments outside the Rails request process.', 'Choose the exact Ruby version and matching messaging API.', 'Pass only appropriate shareable/copyable data.', 'Compare correct results before measuring parallel speed.', 'Treat Box and Rails integration as experimental research.'],
    examples: [
      {title: 'Ruby 3.x result transfer', code: 'worker = Ractor.new { 6 * 7 }\np worker.take', result: '42 on Ruby 3.x; take is removed in Ruby 4.0.'},
      {title: 'Ruby 4.0 port-based result transfer', code: 'port = Ractor::Port.new\nworker = Ractor.new(port) { |reply| reply.send(6 * 7) }\np port.receive\nworker.join\nport.close', result: '42; an experimental Ractor warning may also appear.'},
      {title: 'Ruby Box: isolated definition demo files', code: '# feature.rb\nFEATURE_NAME = "isolated"\n\n# box_demo.rb\nbox = Ruby::Box.new\nbox.require_relative("feature")\np box::FEATURE_NAME', result: '"isolated" when started on Ruby 4.0 with RUBY_BOX=1.'},
      {title: 'Enable before process startup', lang: 'text', code: '# POSIX\nRUBY_BOX=1 ruby box_demo.rb\n# PowerShell: set for this shell, run, then clear\n$env:RUBY_BOX = "1"\nruby box_demo.rb\nRemove-Item Env:RUBY_BOX'}
    ],
    scenario: {title: 'An old Ractor sample fails on Ruby 4', before: 'The sample calls take, which is no longer available.', investigate: ['Confirm the exact runtime and NoMethodError.', 'Review the messaging changes.', 'Move reply delivery to a Port and wait for completion.', 'Test termination and error handling, not just the returned value.'], after: 'The experiment uses the release’s actual communication model without assuming the surrounding Rails stack supports it.'},
    verify: ['Run each sample only on its labeled version.', 'Check failures and shutdown without deadlocks.', 'Do not enable RUBY_BOX globally for an existing Rails deployment.'],
    tips: ['Threads, processes, Ractors and definition boxes are not interchangeable.', 'Avoid sharing Active Record connections across concurrency boundaries.', 'A Box is not an operating-system security boundary.'],
    mistake: 'Assuming Ruby 4 removes all concurrency restrictions or makes arbitrary Rails models safe to pass between Ractors.',
    exercises: [['Who may receive from a Port?', 'The Ractor that created it, according to the Port API.'], ['Does Ruby Box make untrusted code safe?', 'No. It separates definitions, not operating-system permissions or all effects.']],
    interview: [['Why are separate processes often simpler for Rails jobs?', 'They align with established worker infrastructure and avoid assuming Ractor compatibility for the whole dependency graph.'], ['Box versus Ractor?', 'Definition separation versus isolated parallel execution/message passing.']],
    summary: 'Use exact concurrency APIs and respect experimental boundaries. Prove compatibility before integrating with Rails.', sources: [['Ruby 4 Ractor::Port', 'https://docs.ruby-lang.org/en/4.0/Ractor/Port.html'], ['Ruby Box and known issues', 'https://docs.ruby-lang.org/en/4.0/language/box_md.html'], ['Ruby 4 Ractor', 'https://docs.ruby-lang.org/en/4.0/Ractor.html'], news4]
  });
  chapter('rails_practical_ruby_removals', {
    version: 'Ruby 3.3/3.4 to 4.0; Bundler 4 behavior is separately versioned.', prerequisites: 'Gemfile, lockfiles and native extensions.',
    what: 'Deprecations announce behavior that may disappear. Removed methods and packaging changes require code, dependency or build changes.',
    why: 'An application can parse successfully but fail when an export requires an undeclared library or a native extension cannot load.',
    when: 'Audit removals before upgrading, and repeat the audit for dependency updates that change default/bundled gems.',
    how: 'Ruby 4 removes Process::Status bitwise methods; use named predicates/exitstatus. Full CGI is no longer supplied as a default gem; cgi/escape covers the retained escape helpers. SortedSet needs its own gem. Bundler 4 replaces remembered install flags with explicit configuration. These changes are separate from Rails APIs.',
    steps: ['Enable relevant warnings on the current runtime.', 'Search application code and custom gems for affected APIs.', 'Replace fragile process-status decoding with named methods.', 'Declare libraries actually required by the app.', 'Rebuild native extensions for the target interpreter/platform.', 'Review Bundler scripts and lockfile changes.'],
    examples: [
      {title: 'Portable process-status handling', code: 'require "rbconfig"\nsystem(RbConfig.ruby, "-e", "exit 3")\nstatus = $?\np status.exitstatus\np status.success?', result: '3\nfalse'},
      {title: 'A targeted escaping helper', code: 'require "cgi/escape"\nputs CGI.escapeHTML("<order>")', result: '&lt;order&gt;'},
      {title: 'Bundler 4-friendly explicit configuration', lang: 'text', code: 'bundle config set --local path vendor/bundle\nbundle config set --local without "development test"\nbundle install', result: 'Deployment example: do not exclude test dependencies in the environment where you run tests.'}
    ],
    scenario: {title: 'A fresh image fails while a developer machine works', before: 'A transitive or globally installed library hides an undeclared dependency; the target image starts clean.', investigate: ['Read the first LoadError or native extension error.', 'Inspect which gem owns the library.', 'Declare it directly if the application uses it.', 'Rebuild/install under the target Ruby and base image.'], after: 'A clean build resolves the required libraries without relying on leftovers from an older environment.'},
    verify: ['Install from a clean gem directory/container.', 'Exercise exports, mail, database adapters and cryptographic integrations.', 'Review warnings rather than globally suppressing them.'],
    tips: ['Do not copy compiled native extensions between Ruby ABIs.', 'A full CGI dependency may need gem "cgi"; escaping-only code can use cgi/escape.', 'Keep explicit bundle install in scripts and review persistent local configuration.'],
    mistake: 'Copying vendor/bundle from an older interpreter and assuming a successful file copy means binary compatibility.',
    exercises: [['Replace $? >> 8.', 'Use $?.exitstatus for a normally exited process and handle signals separately.'], ['Why test clean installs?', 'They expose undeclared dependencies and platform/binary assumptions hidden by a developer machine.']],
    interview: [['Default gem versus direct dependency?', 'Availability with a Ruby distribution is not a substitute for declaring a library the application intentionally needs.'], ['Why do native gems need special checks?', 'They depend on interpreter ABI, architecture, toolchain and system libraries.']],
    summary: 'Treat library packaging, binary extensions and dependency tooling as part of the runtime upgrade.', sources: [news4, ['Process::Status', 'https://docs.ruby-lang.org/en/4.0/Process/Status.html'], ['RubyGems/Bundler 4 migration', 'https://blog.rubygems.org/2025/12/03/upgrade-to-rubygems-bundler-4.html']]
  });
  chapter('rails_practical_ruby_upgrade', {
    version: 'A controlled Ruby 3.4 → 4.0 migration; choose current compatible patches for your application.', prerequisites: 'Passing baseline tests, CI, staging and a rollback image.',
    what: 'Runtime migration verifies language, library, binary and operational compatibility as a single application stack.',
    why: 'Booting Rails is only the first check. ShopDesk also needs working workers, HTTP clients, exports, assets and acceptable memory under real traffic.',
    when: 'Use this process for a major runtime change or when a dependency raises its minimum supported Ruby.',
    how: 'Keep the current and target runtime builds reproducible. First hold application behavior steady; then adopt optional syntax or JIT changes separately. A staged rollout compares user-facing metrics and allows recovery.',
    steps: ['Record current Ruby/Rails/Bundler and passing business flows.', 'Confirm target compatibility for every direct and native dependency.', 'Build a clean target image and install locked dependencies.', 'Run syntax, unit, request, system and worker tests on both runtimes.', 'Compare integration payloads and representative performance.', 'Deploy to staging, then a controlled production slice; retain the old image.'],
    examples: [
      {title: 'Repeat these checks in each runtime environment', lang: 'text', code: 'ruby -v\nbundle --version\nbundle install\nbundle exec rails zeitwerk:check\nbundle exec rails test\nbundle exec rails test:system', result: 'Use separate dependency/build directories for different interpreters. Record failures instead of blindly updating all gems.'},
      {title: 'Verification record', lang: 'text', code: 'Runtime and engine: exact\nRails/Bundler: resolved versions\nNative gems: rebuilt and loaded\nFlows: login, order create, API, email, export\nHTTP contracts: explicit headers/body\nJobs: enqueue, run, retry, shutdown\nPerformance: warm-up, p95, throughput, RSS, errors\nRollback: old image + schema/data/job compatibility'}
    ],
    scenario: {title: 'Tests pass but the worker fails in production', before: 'CI tests only the web process; a separate worker image still contains an old native gem build.', investigate: ['Compare web and worker image/runtime identities.', 'Rebuild the worker dependencies under the target interpreter.', 'Exercise a complete queued export in staging.', 'Add worker boot/execution verification to the pipeline.'], after: 'Both process types run the tested runtime and compatible dependencies.'},
    verify: ['Test price calculations, time zones and non-ASCII inputs.', 'Check third-party HTTP request headers and errors.', 'Compare memory, latency and failures before broad rollout.', 'Document which checks were executed and which integrations remain unverified.'],
    tips: ['Fix one compatibility problem at a time.', 'Keep language cleanup separate from runtime adoption.', 'Do not claim a percentage improvement without equivalent measurements.'],
    mistake: 'Updating Ruby, Rails, every gem, the queue backend and frontend architecture simultaneously, making failures difficult to attribute.',
    exercises: [['What is the minimum useful staging smoke test?', 'At least one authenticated end-to-end business flow including persistence, the API and a real staging worker; tailor it to critical dependencies.'], ['What might prevent an image rollback?', 'Incompatible schema/data changes, changed serialized jobs or external effects that old code cannot interpret.']],
    interview: [['Why a runtime matrix?', 'It distinguishes pre-existing failures from target-specific regressions and checks the support promise.'], ['When is migration complete?', 'Required flows and compatibility checks pass, rollout metrics are acceptable and operational processes run the intended version with a recovery path.']],
    summary: 'Migrate the whole operational stack with reproducible builds and evidence. Adopt optional features after compatibility is established.', sources: [news4, ['Rails upgrade guidance', 'https://guides.rubyonrails.org/upgrading_ruby_on_rails.html'], ['Bundler 4 upgrade', 'https://blog.rubygems.org/2025/12/03/upgrade-to-rubygems-bundler-4.html']]
  });
})();
