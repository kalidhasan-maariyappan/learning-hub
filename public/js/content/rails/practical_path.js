// Practical Rails course: publish one complete teaching chapter at a time.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ol, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Rails');
  const plans = [
    ['Performance optimization', 'rails_practical_path', ['Finding performance bottlenecks (available now)', 'SQL costs, lazy loading and bounded queries', 'N+1 queries and eager loading', 'Indexes and execution plans', 'Caching and invalidation', 'Memory, allocations and garbage collection', 'Background jobs, retries and queue latency', 'Monitoring, profiling and production case studies']],
    ['Debugging applications', 'rails_debugging_path', ['A systematic debugging workflow', 'Rails logs and request correlation', 'Breakpoints and the Ruby debugger', 'Controllers, models and database bugs', 'Browser developer tools', 'REST API responses and API testing tools', 'Authentication, sessions and authorization', 'Background job failures', 'Production incidents, root cause analysis and prevention']],
    ['Frontend integration', 'rails_frontend_path', ['Assets, import maps and JavaScript bundling', 'jQuery installation, configuration and working examples', 'Bootstrap installation, configuration and working examples', 'React installation, project structure and working examples', 'Rails views, React islands and separate frontend applications', 'Rails 7 and Rails 8 configuration choices']],
    ['Rails 7 vs Rails 8', 'rails_versions_path', ['Exact release baselines and compatibility', 'Authentication generators and application responsibilities', 'Deployment and Kamal', 'Asset management and configuration changes', 'Database handling and adapter considerations', 'Caching and background jobs', 'Deprecations, upgrade steps and regression checks']],
    ['Ruby 3.x vs Ruby 4.x', 'rails_ruby_versions_path', ['Exact minor releases and Rails support', 'Language changes with before-and-after examples', 'Performance, JIT and runtime behavior', 'Deprecated and removed functionality', 'Gem and native extension compatibility', 'Migration workflow and production verification']],
  ];
  page('rails_practical_path', () => [
    h2('Learn practical Rails, one chapter at a time'),
    p('Build senior-level problem-solving skills using simple English and a production-style online store called ShopDesk. Each full chapter teaches what a concept is, why it matters, how it works, when to use it and how to implement it.'),
    K.tip('Chapter 1.1 is available now. The remaining entries below are a curriculum, not completed lessons. Continue chapter by chapter rather than reading an entire course at once.'),
    p(JT.link('rails_performance_bottlenecks', 'Start Chapter 1.1: Finding Performance Bottlenecks')),
    ...plans.flatMap(([title, slug, chapters], index) => [h2('Section ' + (index + 1) + ': ' + title), ol(chapters), index ? p(JT.link(slug, 'View this section plan')) : '']),
    h2('How every teaching chapter works'),
    ol(['Introduction and prerequisites', 'Concept, purpose and syntax', 'Step-by-step realistic examples', 'Before-and-after investigation', 'Senior developer tips and common mistakes', 'Hands-on exercises with answer guidance', 'Interview questions with answers', 'Summary and official documentation']),
    h2('Version policy'),
    p('Examples identify relevant Rails and Ruby versions. Comparison chapters will distinguish minor releases rather than treating all Rails 7, Rails 8 or Ruby 3 releases as identical. Verify version-sensitive behavior against official released documentation; development-edge behavior is not assumed to be released.')
  ]);
  for (const [title, slug, chapters] of plans.slice(1)) {
    page(slug, () => [h2(title + ': planned chapters'), p('This section is planned. Detailed teaching is being added one chapter at a time, beginning with performance investigation.'), ol(chapters), h2('What each chapter will include'), p('Simple explanations, version-specific syntax, installation or implementation steps, realistic scenarios, common mistakes, exercises, interview answers and official sources.'), p(JT.link('rails_performance_bottlenecks', 'Study the first available chapter')), p(JT.link('rails_practical_path', 'Return to the complete curriculum'))]);
  }
  page('rails_performance_bottlenecks', () => [
    h2('Introduction: why is the orders page slow?'),
    p('A performance bottleneck is a part of a system that limits its speed or capacity for a particular workload. ShopDesk customers say their order history takes three seconds to open. The cause could be SQL, Ruby processing, an external service, request queueing or browser rendering. First discover where time goes.'),
    K.remember(['Prerequisites: basic Ruby methods, Rails controllers, views and associations.', 'The APIs below work in Rails 7 and Rails 8; log formatting varies by release and configuration.', 'Rails snippets run in your own Rails application. The learning hub displays them; it does not execute a Rails server.', 'Example timings are illustrative, not benchmark results measured by this tutorial.']),
    h2('1. Understand the request journey'),
    K.show('Client → network/load balancer → request queue → Rails controller\n       → database / external services / Ruby work\n       → HTML or JSON → network → browser rendering', 'A simplified request journey', 'text'),
    p('A controller can finish quickly while a user still waits for JavaScript, images or a busy browser. Conversely, requests can wait for an available application worker before controller processing starts. Measurement tools cover different boundaries, and some work overlaps.'),
    h2('2. Define a measurable problem'),
    p('Replace “the application is slow” with: “For large customer accounts, GET /orders has a p95 server response time of 2.8 seconds during business hours. Our example target is below 500 ms without increasing errors.” The target belongs to this scenario; it is not a universal Rails rule.'),
    table(['Metric', 'Meaning', 'Why measure it?'], [
      ['Latency', 'Time for an operation', 'Find slow requests'], ['Throughput', 'Completed work per second', 'Understand capacity'], ['p50 / p95 / p99', 'Durations at the 50th / 95th / 99th percentile', 'Expose slow experiences hidden by averages'], ['Errors', 'Failed requests or jobs', 'A faster failing request is not an improvement'], ['Queue time', 'Waiting before execution', 'Detect saturated workers'], ['CPU / memory', 'Processing and memory consumption', 'Identify resource pressure']
    ]),
    p('Record the endpoint, affected accounts, filters, data size, time window, release, traffic rate, cache state and errors. Compare equivalent measurements before and after a change.'),
    h2('3. Reproduce representative conditions'),
    ol(['Use a development or staging environment with sanitized representative data.', 'Match the affected filters, ordering and account size.', 'Use the same application release and relevant settings.', 'Measure repeated requests; distinguish cold and warm caches.', 'If the issue occurs under load, investigate comparable concurrency in a controlled environment.']),
    K.warn('A development database with ten orders cannot establish production performance for a customer with 500,000 orders. Development code reloading also changes timings.'),
    K.show('curl.exe -s -o NUL -w "status=%{http_code} start_transfer=%{time_starttransfer}s total=%{time_total}s" http://localhost:3000/orders', 'Windows PowerShell: inspect request timing', 'text'),
    K.show('curl -s -o /dev/null -w "status=%{http_code} start_transfer=%{time_starttransfer}s total=%{time_total}s\\n" http://localhost:3000/orders', 'Linux or macOS', 'text'),
    p('Check that the response is the expected page. A redirect to a sign-in page measures a different operation. Start-transfer time includes preceding connection and request work; it is not pure controller execution time. Use an authenticated browser request when your page requires a session.'),
    h2('4. Read Rails logs'),
    K.show('Started GET "/orders"\nProcessing by OrdersController#index as HTML\nOrder Load (14.2ms) SELECT ...\nShippingAddress Load (3.1ms) SELECT ...\nShippingAddress Load (2.9ms) SELECT ...\nCompleted 200 OK in 240ms', 'Simplified illustrative log', 'text'),
    p('Read the complete request. Many individually fast SQL statements can add up. Rails may report database time, rendering time, allocations and query counts depending on the version and configuration. Do not assume every reported measurement is a separate non-overlapping slice.'),
    K.show('Get-Content log/development.log -Tail 100 -Wait', 'Watch logs in PowerShell', 'text'),
    K.show('tail -f log/development.log', 'Watch logs on Linux or macOS', 'text'),
    p('Production platforms often send logs to standard output or a central service instead of a local file.'),
    K.rails('Rails.application.configure do\n  config.active_record.verbose_query_logs = true\nend', { title: 'config/environments/development.rb' }),
    p('Verbose query logs add source locations such as app/views/orders/index.html.erb:8. This connects repeated SQL to the code that triggered it. Keep this investigation feature in development: collecting source locations adds overhead.'),
    h2('5. Measure the work, not just its setup'),
    K.rails('started_at = Process.clock_gettime(Process::CLOCK_MONOTONIC)\n\norders = current_customer.orders\n  .order(created_at: :desc, id: :desc)\n  .limit(50)\n  .to_a\n\nelapsed_ms = (Process.clock_gettime(Process::CLOCK_MONOTONIC) - started_at) * 1_000\nRails.logger.info("operation=recent_orders duration_ms=#{elapsed_ms.round(1)}")', { title: 'Temporary controller-level measurement' }),
    p('A monotonic clock measures elapsed time without depending on wall-clock adjustments. An Active Record relation is usually lazy: Order.where(status: "paid") builds a query but does not fetch the records. Calling to_a inside the measurement forces loading. Elapsed time includes waiting; it is not a CPU-only measurement.'),
    h2('6. Add reusable instrumentation'),
    K.rails('orders = ActiveSupport::Notifications.instrument("recent_orders.shopdesk") do\n  current_customer.orders\n    .order(created_at: :desc, id: :desc)\n    .limit(50)\n    .to_a\nend', { title: 'Emit an event around the operation' }),
    K.rails('ActiveSupport::Notifications.monotonic_subscribe("recent_orders.shopdesk") do |name, started, finished, _id, _payload|\n  duration_ms = (finished - started) * 1_000\n  Rails.logger.info("event=#{name} duration_ms=#{duration_ms.round(1)}")\nend', { title: 'config/initializers/performance_notifications.rb' }),
    p('Restart after adding the initializer. The instrumented block returns its normal result and emits an event. The subscriber records elapsed duration. Use this for meaningful operations such as report generation, not every tiny method. Avoid logging tokens, complete records or sensitive parameters.'),
    h2('7. Form and test a hypothesis'),
    table(['Observation', 'Hypothesis', 'Evidence to collect'], [
      ['More displayed orders means more queries', 'N+1 association loading', 'Query count at 10 and 50 rows'], ['One SQL statement dominates', 'Expensive scan, join or sort', 'Query duration and execution plan'], ['High CPU with little database time', 'Expensive Ruby work', 'CPU profile and allocations'], ['Slow only during peaks', 'Queueing or resource contention', 'Queue time, connections, CPU and memory'], ['Rails is fast but the page feels slow', 'Network or browser work', 'Browser network and performance traces']
    ]),
    K.tip('Write a hypothesis that evidence can disprove: “If association loading causes the delay, its query count should grow with rendered rows.” Change one thing, repeat comparable measurements, and keep investigating if the prediction fails.'),
    h2('8. Real-world scenario: repeated shipping-address queries'),
    p('Assume authentication already supplies current_customer. Customer has_many :orders. Order belongs_to :customer and belongs_to :shipping_address. ShippingAddress has_many :orders. The page displays the latest 50 orders for the signed-in customer.'),
    K.rails('class OrdersController < ApplicationController\n  def index\n    @orders = current_customer.orders\n      .order(created_at: :desc, id: :desc)\n      .limit(50)\n  end\nend', { title: 'Before: app/controllers/orders_controller.rb' }),
    K.rails('<% @orders.each do |order| %>\n  <p>Order #<%= order.id %> — <%= order.shipping_address.city %></p>\n<% end %>', { title: 'app/views/orders/index.html.erb', lang: 'erb' }),
    ol(['Reproduce with 50 orders using different shipping addresses.', 'Observe one order query followed by repeated address queries.', 'Hypothesize that accessing shipping_address inside the loop triggers extra loading.', 'Preload the association, then reload the same page and inspect its SQL.', 'Verify order visibility, ordering, address correctness and timings.']),
    K.rails('class OrdersController < ApplicationController\n  def index\n    @orders = current_customer.orders\n      .preload(:shipping_address)\n      .order(created_at: :desc, id: :desc)\n      .limit(50)\n  end\nend', { title: 'After: preload the required addresses' }),
    p('N+1 means one query for the parent list and up to N queries for related records. Here preload normally uses one order query and one address query. Shared addresses and Rails query caching can affect actual round trips. Authentication and other request work can add more queries.'),
    table(['Check', 'Before', 'After'], [['Order/address queries', 'Up to 51', 'Typically 2'], ['Latency', 'Record a baseline', 'Measure again; do not invent a speedup'], ['Authorization', 'Scoped to current_customer', 'Must retain the same scope'], ['Visible data', 'Latest 50 orders and addresses', 'Must remain correct']]),
    K.warn('Removing current_customer while rewriting SQL can expose another customer’s orders. An optimization must preserve authorization and business behavior.'),
    h2('9. Senior developer tips and common mistakes'),
    ul(['Do not add caching before understanding the underlying cost and freshness requirements.', 'Do not add indexes indiscriminately; match them to demonstrated queries and execution plans.', 'More application workers can increase memory pressure and database contention.', 'Bound interactive requests instead of loading entire tables.', 'Background jobs help when delayed completion fits the workflow; they also introduce queues and retries.', 'A profiler helps locate expensive Ruby methods after request measurements identify Ruby work as the likely cause.', 'Recheck errors and correctness alongside latency after deployment.']),
    h2('Hands-on exercises'),
    ol(['Rewrite “the dashboard is slow” as a measurable incident statement with endpoint, affected users, percentile, time window and target.', 'Reproduce the shipping-address example with 10 then 50 orders. Record association query counts before and after preload.', 'Time Order.where(status: "paid") and then time loading that relation. Explain which measurement includes record retrieval.', 'A browser reports three seconds while Rails reports 150 ms. List three places you would investigate before editing the controller.']),
    '<details class="qa"><summary>Show exercise guidance</summary><div>' + ol(['Example: GET /dashboard for large accounts has a p95 of 2.5 seconds over the last hour; the scenario target is 500 ms without extra errors.', 'Use distinct addresses to make repeated loads clear. Keep the same dataset, scope and cache conditions. Do not assume the full request contains exactly two queries.', 'Relation construction usually does not execute SQL. Put to_a inside the measured block when measuring retrieval.', 'Inspect queueing before Rails, network transfer, other resource requests and browser scripting/rendering. Confirm that the measurements cover the same operation.']) + '</div></details>',
    K.interview([
      ['What is a bottleneck?', 'A component that limits speed or capacity under a particular workload. It can change as traffic or data changes.'],
      ['Why inspect p95?', 'An average can hide a slow group of requests. p95 describes a threshold at or below which approximately 95% of observations fall.'],
      ['Can a 3 ms query cause a slow request?', 'Yes. Repeating it hundreds of times can create substantial total database work and network overhead.'],
      ['Why is timing a relation misleading?', 'Active Record usually defers SQL execution until the records or a database-backed result are needed.'],
      ['Why might more workers make things worse?', 'They can compete for CPU, memory and database connections rather than removing the underlying constraint.'],
      ['How do you prove an improvement?', 'Compare equivalent workloads, inspect latency and errors, verify business correctness, and monitor after release.']
    ]),
    h2('Summary'),
    K.remember(['Define the slow operation precisely.', 'Locate the expensive stage before changing code.', 'Use logs and targeted measurements to test hypotheses.', 'Preserve authorization and correctness.', 'Compare before and after under equivalent conditions.']),
    h2('Official references'),
    ul(['<a href="https://guides.rubyonrails.org/v8.0/debugging_rails_applications.html">Rails 8.0: logging and verbose query logs</a>', '<a href="https://guides.rubyonrails.org/v8.0/active_record_querying.html">Rails 8.0: query interface and eager loading</a>', '<a href="https://guides.rubyonrails.org/v8.0/active_support_instrumentation.html">Rails 8.0: Active Support instrumentation</a>', '<a href="https://guides.rubyonrails.org/tuning_performance_for_deployment.html">Rails: deployment performance tuning (select your installed version)</a>']),
    p('Next planned teaching chapter: SQL costs, lazy loading and bounded queries. ' + JT.link('rails_practical_path', 'Return to the learning path') + '.')
  ]);
})();
