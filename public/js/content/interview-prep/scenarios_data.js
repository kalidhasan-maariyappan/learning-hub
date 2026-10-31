(function () {
  'use strict';
  const data = [];
  window.JT.scenarioData = data;
  data.push(
    {
      id: 'million', question: 'An interviewer asks: “Would you load 1,000,000 orders at once? If not, how would you handle them?”',
      clarify: 'Ask whether the user wants a screen, a total, a downloadable file or a per-record business operation. Also ask about freshness, memory budget and tenant scope.',
      answer: 'I would not instantiate a million models for a normal request. For a screen I would paginate a scoped stable query. For totals I would use SQL aggregation. For a full export or per-record work I would use a background job with bounded batches and incremental output. Batching only helps if I do not retain every processed record.',
      steps: ['Measure the current query, allocations, peak memory and response size.', 'Choose the smallest result matching the business need.', 'For all-row work, use bounded input and output, progress reporting and restart strategy.', 'Test concurrent data changes and access control.'],
      code: '# Screen:\nrecent = current_user.orders.order(id: :desc).limit(50)\n# Aggregate:\ntotal = current_user.orders.where(status: "paid").sum(:total_cents)\n# Per-record processing, in a job:\ncurrent_user.orders.find_each(batch_size: 500) do |order|\n  # Write one row or perform a retry-safe bounded operation.\nend',
      verify: ['Compare record counts/totals on known data.', 'Measure peak memory and end-to-end duration as dataset size grows.', 'Check cancellation/restart and customer isolation.'],
      tradeoff: 'A batched scan is not automatically a point-in-time snapshot; concurrent changes and batch ordering require a consistency policy.',
      mistake: 'Calling find_each and appending every model to a global results array.',
      exercise: 'Choose an approach for “show the latest 50”, “sum all paid orders” and “export all orders”.',
      guidance: 'Use a scoped limited query, SQL SUM and a bounded asynchronous export respectively. Explain freshness and output contracts.', source: 'query'
    },
    {
      id: 'pagination', question: 'Page 1 is fast but page 40,000 is slow. Why?',
      clarify: 'Ask about offset size, sort stability, indexes and whether users need random page jumps.',
      answer: 'A small LIMIT does not remove the work of skipping a large OFFSET. I would inspect the plan and consider keyset pagination when sequential navigation fits, while retaining an appropriate ordering index.',
      steps: ['Capture SQL for shallow/deep pages.', 'Compare skipped rows and sort work.', 'Use a stable indexed cursor and preserve filters.'],
      code: '# Descending ID cursor for an immutable primary key:\norders = current_user.orders\norders = orders.where("id < ?", cursor_id) if cursor_id\norders.order(id: :desc).limit(50)',
      verify: ['Check no duplicates across consecutive pages on stable data.', 'Test filter/cursor validation and deep-page latency.'],
      tradeoff: 'Keyset pagination does not naturally provide arbitrary numbered page jumps or an exact total.',
      mistake: 'Using an unstable timestamp-only cursor when timestamps can tie.', exercise: 'Design a cursor for created_at plus id.', guidance: 'Carry both values and use a lexicographic predicate matching the descending sort; validate and scope the cursor.', source: 'query'
    },
    {
      id: 'n_plus_one', question: 'An orders page runs 501 queries for 500 rows. What do you inspect?',
      clarify: 'Ask which associations templates or serializers access and whether all 500 rows need display.',
      answer: 'I would correlate repeated SQL with association accesses, bound the parent list, preload only the required graph and measure the full rendering path.',
      steps: ['Read repeated query shapes and source locations.', 'Inspect view/serializer methods.', 'Add focused eager loading and compare query growth.'],
      code: '@orders = current_user.orders\n  .preload(line_items: :product)\n  .order(id: :desc).limit(50)',
      verify: ['Render 10 then 50 rows and compare association query count.', 'Check data correctness and memory.'],
      tradeoff: 'Loading every association can waste more memory than the original page.',
      mistake: 'Measuring only controller relation construction, omitting serialization.', exercise: 'Why might association.count still query?', guidance: 'count requests a database count; understand size versus count and the loaded association state.', source: 'query'
    },
    {
      id: 'index', question: 'A frequently used customer-order filter scans a large table.',
      clarify: 'Ask for the exact WHERE, ORDER BY, cardinality, table size and existing indexes.',
      answer: 'I would inspect the actual plan, then design an index for the demonstrated filter/order. I would verify read improvement and write/storage costs instead of indexing every column.',
      steps: ['Capture representative values and EXPLAIN.', 'Check estimates, scans and sort.', 'Test a candidate and plan a safe rollout.'],
      code: '# PostgreSQL migration fragment; outside a DDL transaction:\nadd_index :orders, [:customer_id, :created_at, :id],\n  algorithm: :concurrently,\n  name: "index_orders_on_customer_history"',
      verify: ['Compare plans for small/large customers.', 'Measure inserts and inspect index validity after a failed build.'],
      tradeoff: 'Indexes improve selected reads but add storage and write maintenance.',
      mistake: 'Running EXPLAIN ANALYZE carelessly; it executes the statement.', exercise: 'Why might an index not be used?', guidance: 'A sequential scan may be cheaper, estimates may be wrong, or the expression/order may not fit.', source: 'query'
    },
    {
      id: 'export', question: 'An order CSV export exhausts worker memory.',
      clarify: 'Ask whether input models, associations or one large output string dominate memory.',
      answer: 'I would bound both reads and output construction: process batches in a worker and write rows incrementally to a per-export destination.',
      steps: ['Measure peak memory during representative exports.', 'Remove full-table materialization and giant buffers.', 'Track progress and manage cleanup/access to generated files.'],
      code: 'require "csv"\n# Use a unique destination for each export.\nCSV.open(destination, "wb") do |csv|\n  csv << ["id", "total_cents"]\n  scoped_orders.find_each(batch_size: 500) do |order|\n    csv << [order.id, order.total_cents]\n  end\nend',
      verify: ['Compare output row count/totals.', 'Test concurrent exports and peak memory.'],
      tradeoff: 'Long exports need a policy for data changing during the scan.',
      mistake: 'Batching input while still constructing the entire file in memory.', exercise: 'How does a user download the result securely?', guidance: 'Authorize the export resource and use a bounded-lifetime download mechanism; do not expose arbitrary file paths.', source: 'query'
    },
    {
      id: 'backfill', question: 'How do you backfill a new field across millions of rows?',
      clarify: 'Ask whether the transformation is expressible in SQL, whether callbacks matter and whether writes continue.',
      answer: 'I would add a compatible nullable field first, deploy compatible code, backfill in bounded restartable units and only later enforce the final invariant.',
      steps: ['Measure batch cost on representative data.', 'Make updates idempotent and track progress.', 'Throttle work and observe locks/replication.'],
      code: 'Order.where(processed_flag: nil).in_batches(of: 1_000) do |batch|\n  batch.update_all(processed_flag: false)\nend\n# update_all skips normal validations/callbacks; use only if correct.',
      verify: ['Count remaining unfilled rows.', 'Test restart and concurrent inserts.'],
      tradeoff: 'Large one-shot transactions can hold locks and generate substantial write/replication load.',
      mistake: 'Hiding an unbounded data rewrite inside a routine deploy migration.', exercise: 'When is update_all inappropriate?', guidance: 'When required business callbacks, validation or per-record transformation would be bypassed.', source: 'query'
    },
    {
      id: 'count', question: 'A dashboard spends most of its time counting orders.',
      clarify: 'Ask about scope, count accuracy, freshness and grouping dimensions.',
      answer: 'I would verify which counts are required, combine suitable grouping in SQL and consider a maintained summary or cache if bounded staleness is acceptable.',
      steps: ['Capture count query plans.', 'Remove unnecessary record instantiation.', 'Compare exact aggregation with summary freshness requirements.'],
      code: 'counts = current_user.orders.group(:status).count\n# One result keyed by status, rather than loading every Order.',
      verify: ['Compare totals with known fixtures.', 'Measure counts on production-scale staging data.'],
      tradeoff: 'Cached or denormalized counts require invalidation/reconciliation and may be stale.',
      mistake: 'Using .to_a.length to count a large relation.', exercise: 'When would a counter cache fit?', guidance: 'For a well-defined association count whose writes can maintain it reliably; filtered arbitrary counts need additional design.', source: 'query'
    },
    {
      id: 'search', question: 'Product search becomes slow as the catalog grows.',
      clarify: 'Ask whether the requirement is exact match, prefix search, substring matching or ranked text search.',
      answer: 'I would inspect the real search shape and execution plan. I would choose a matching database search/index strategy before adding a search service solely because the table is large.',
      steps: ['Capture search terms and query shape without leaking sensitive data.', 'Inspect selectivity and sorting.', 'Choose exact/prefix/full-text behavior and bound results.'],
      code: '# Exact SKU lookup; enforce an appropriate index/uniqueness policy.\nproduct = current_account.products.find_by(sku: params[:sku])',
      verify: ['Test common and rare terms.', 'Check relevance, permissions and latency.'],
      tradeoff: 'A dedicated search index adds synchronization, operational cost and possible lag.',
      mistake: 'Assuming a normal B-tree index fixes every leading-wildcard search.', exercise: 'What would you ask before adding Elasticsearch?', guidance: 'Clarify search semantics, ranking, scale, freshness, team operations and whether database-native search suffices.', source: 'query'
    },
    {
      id: 'replica', question: 'A newly created order is missing when immediately read.',
      clarify: 'Ask whether the read uses a replica and what read-after-write guarantees the product needs.',
      answer: 'I would compare primary and replica visibility, measure lag and route read-after-write paths appropriately. A successful primary commit need not be visible instantly on a replica.',
      steps: ['Correlate write/read DB roles.', 'Check replication lag and errors.', 'Keep critical immediate reads on the writer or use the documented selector policy.'],
      code: '# In an application configured with writer/reader roles:\nActiveRecord::Base.connected_to(role: :writing) do\n  Order.find(order_id)\nend',
      verify: ['Test immediate reads after commit.', 'Test behavior during replica lag/failure.'],
      tradeoff: 'Writer reads improve freshness but reduce the amount of read offloading.',
      mistake: 'Treating replica lag as proof the write was lost.', exercise: 'What metadata helps debugging?', guidance: 'Request IDs, commit/read timing, database role and measured replication health.', source: 'config'
    },
    {
      id: 'pool', question: 'Requests time out waiting for database connections.',
      clarify: 'Ask about process counts, thread counts, job workers, pool size and database limits.',
      answer: 'I would separate application pool waits from server capacity. I would inspect total connection demand and long-held connections before increasing pools.',
      steps: ['Measure pool checkout waits and DB sessions.', 'Count demand from all process types.', 'Fix slow/held work or adjust concurrency within the total budget.'],
      code: '# database.yml fragment:\n# pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>\n# Four web pools of 5 + two job pools of 5 = up to 30,\n# before operational clients and headroom.',
      verify: ['Compare checkout wait, errors and throughput.', 'Check queue age after concurrency changes.'],
      tradeoff: 'More connections can increase database contention instead of throughput.',
      mistake: 'Budgeting only one Puma process and forgetting all workers.', exercise: 'What if SQL is fast but connections stay checked out?', guidance: 'Inspect transactions, external calls inside DB work and connection lifecycle rather than only query duration.', source: 'deployment'
    },
    {
      id: 'retries', question: 'A mobile client retries order creation after losing the response.',
      clarify: 'Ask whether the first operation committed and whether the client can supply an idempotency key.',
      answer: 'I would make retries identify the same logical operation, scope keys to the caller and atomically prevent duplicate operations with database constraints. Repeating a POST is not automatically safe.',
      steps: ['Define key scope and payload fingerprint.', 'Persist an operation/result with a unique scoped key.', 'Handle concurrent retries and return the recorded result.'],
      code: '# Database constraint for an application-designed operation table:\nadd_index :api_operations, [:user_id, :idempotency_key], unique: true\n# Also define payload mismatch, in-progress and expiry behavior.',
      verify: ['Send simultaneous retries and assert one order.', 'Reuse a key with a different payload and expect the documented conflict.'],
      tradeoff: 'Idempotency needs retention and failure-state policy; a memory-only key can disappear.',
      mistake: 'Implementing check-then-create without a uniqueness constraint.', exercise: 'How do payment-provider retries differ?', guidance: 'Use the provider’s own idempotency mechanism in addition to local operation tracking.', source: 'transactions'
    },
    {
      id: 'authorization', question: 'Changing /orders/42 to /orders/43 reveals another user’s order.',
      clarify: 'Ask which authenticated identity and ownership/policy should govern access.',
      answer: 'I would treat this as an authorization defect, scope lookups or enforce a tested policy and review related read/write/list paths.',
      steps: ['Reproduce with two isolated test accounts.', 'Inspect global find calls and nested IDs.', 'Fix the boundary and add regression coverage.'],
      code: '# Unsafe: Order.find(params[:id])\n@order = current_user.orders.find(params[:id])',
      verify: ['Test owner and non-owner reads/writes.', 'Check list serialization and nested resources.'],
      tradeoff: 'The contract may intentionally use 404 rather than reveal that a forbidden record exists.',
      mistake: 'Fixing the visible link while leaving the endpoint accessible.', exercise: 'What about shipping_address_id in create?', guidance: 'Authorize that referenced address too; a scoped parent does not validate every nested identifier.', source: 'security'
    },
    {
      id: 'cors', question: 'An API works in curl but fails from a frontend browser.',
      clarify: 'Ask for exact origins, credentials, preflight request and response headers.',
      answer: 'I would inspect browser CORS enforcement separately from authentication and server execution. The solution is an explicit origin policy, not a blanket wildcard.',
      steps: ['Inspect OPTIONS and Origin.', 'Check proxy and Rack middleware headers.', 'Use same-origin delivery or narrowly configured cross-origin access.'],
      code: '# Rack CORS allow block fragment:\norigins "https://frontend.example.test"\nresource "/api/*", headers: :any, methods: [:get, :post, :options]',
      verify: ['Test allowed and disallowed origins.', 'Test the intended credentials model.'],
      tradeoff: 'Credentialed cookies add SameSite and CSRF considerations beyond CORS.',
      mistake: 'Assuming CORS authenticates users or blocks curl.', exercise: 'Why might an action run despite a browser CORS error?', guidance: 'The browser can block reading a response after the server received/executed a request; inspect server logs.', source: 'security'
    },
    {
      id: 'csrf', question: 'A JavaScript form write fails CSRF validation.',
      clarify: 'Ask whether the app authenticates using cookies and whether the token/session changed.',
      answer: 'I would verify the current session and token transport. I would preserve CSRF protection for cookie-authenticated browser writes rather than disabling it globally.',
      steps: ['Inspect layout meta tags and request header.', 'Compare token with the current session after login/navigation.', 'Check origin/proxy configuration and the response body.'],
      code: 'const csrf = document.querySelector("meta[name=csrf-token]")?.content;\nfetch("/orders", {\n  method: "POST", credentials: "same-origin",\n  headers: { "X-CSRF-Token": csrf, "Content-Type": "application/json" },\n  body: JSON.stringify({ order: { shipping_address_id: 12 } })\n});', lang: 'javascript',
      verify: ['Test valid and missing token.', 'Test expiry and navigation with the intended session.'],
      tradeoff: 'A bearer-only API has a different credential threat model; do not copy session assumptions blindly.',
      mistake: 'Skipping verification everywhere just to make AJAX work.', exercise: 'Is every 422 a CSRF failure?', guidance: 'No. Read the response/logs; validation can also return 422.', source: 'security'
    },
    {
      id: 'tokens', question: 'An expired API credential produces an HTML login page with status 200.',
      clarify: 'Ask about redirects and whether the client follows them automatically.',
      answer: 'I would make the API authentication boundary return a documented JSON 401, then ensure the client checks status before parsing success data.',
      steps: ['Inspect raw redirect history/content type.', 'Separate browser callbacks from API failure handling.', 'Test invalid, expired and valid credentials.'],
      code: 'def require_api_identity\n  return if current_user\n  render json: { error: "unauthenticated" }, status: :unauthorized\nend\n# Register as a before_action; current_user must verify credentials.',
      verify: ['Expect JSON 401 for expired credentials.', 'Ensure no protected data is included.'],
      tradeoff: 'Authentication errors should be helpful without leaking sensitive account details.',
      mistake: 'Returning 200 with an error field and leaving clients to guess success.', exercise: 'What else besides exp matters for JWT?', guidance: 'Signature, fixed algorithm, issuer/audience, required claims, key rotation and application identity/permission checks.', source: 'security'
    },
    {
      id: 'mass_assignment', question: 'A client submits admin=true or changes the order price.',
      clarify: 'Ask which values clients may control and which are authoritative server decisions.',
      answer: 'I would allowlist input fields and calculate protected values on the server. Authorization and nested resource validation remain required.',
      steps: ['Inspect parameter permitting and bulk update paths.', 'Remove protected fields from writable inputs.', 'Test malicious additional keys and server-side pricing.'],
      code: 'def order_params\n  params.require(:order).permit(:shipping_address_id)\nend\n# Calculate total_cents from authorized catalog/pricing rules.',
      verify: ['Submit admin/price fields and confirm no protected change.', 'Test authorized address and invalid ownership.'],
      tradeoff: 'Different endpoints may need different permitted fields; avoid one universal permissive helper.',
      mistake: 'Using permit! or trusting hidden form fields.', exercise: 'Why is a React price preview insufficient?', guidance: 'Clients can alter requests; server pricing must be authoritative.', source: 'security'
    },
    {
      id: 'rate_limit', question: 'Login attempts spike and legitimate users slow down.',
      clarify: 'Ask about attack shape, shared networks, identities and current hashing cost.',
      answer: 'I would measure the traffic and apply a layered throttle with shared counters and meaningful retry behavior. I would avoid locking out broad legitimate populations.',
      steps: ['Inspect route/IP/account patterns safely.', 'Configure bounded shared throttling.', 'Monitor rejected attempts and false positives.'],
      code: 'Rack::Attack.throttle("login/ip", limit: 10, period: 60) do |request|\n  request.ip if request.path == "/session" && request.post?\nend',
      verify: ['Test thresholds across two app instances.', 'Confirm recovery after the window and expected 429 behavior.'],
      tradeoff: 'IP-only limits can penalize shared networks and do not stop every distributed attack.',
      mistake: 'Keeping counters only in each process and calling the policy global.', exercise: 'What makes a client IP trustworthy?', guidance: 'Correct trusted-proxy handling; do not trust arbitrary forwarded headers.', source: 'security'
    },
    {
      id: 'serialization', question: 'An API unexpectedly exposes internal fields.',
      clarify: 'Ask which representation is public and whether the fields were explicitly selected.',
      answer: 'I would define an allowlisted response boundary and test forbidden fields. Loading an authorized record does not mean every column is safe to publish.',
      steps: ['Inspect raw JSON and serializer configuration.', 'Replace broad serialization with intended fields.', 'Review associations and error payloads too.'],
      code: 'render json: {\n  orders: current_user.orders.order(id: :desc).limit(25)\n    .as_json(only: [:id, :status, :total_cents])\n}',
      verify: ['Assert required fields and absence of internal notes/digests.', 'Test both list/detail and error responses.'],
      tradeoff: 'Explicit contracts require intentional evolution, but prevent accidental column exposure.',
      mistake: 'Returning model attributes wholesale after a schema change.', exercise: 'Can a serializer prevent an IDOR alone?', guidance: 'No. Scope/authorize records before serialization.', source: 'security'
    },
    {
      id: 'versioning', question: 'A response field rename breaks older mobile clients.',
      clarify: 'Ask how long old clients remain active and what compatibility promise exists.',
      answer: 'I would preserve a documented compatible representation or introduce an intentional version boundary. Clients and servers need contract tests for the supported window.',
      steps: ['Identify affected deployed clients.', 'Add compatible fields before removing old ones.', 'Track usage and deprecate with a defined timeline.'],
      code: '# Transitional representation when the contract allows both:\nrender json: { id: order.id, total_cents: order.total_cents,\n  amount_cents: order.total_cents }',
      verify: ['Run old and new client contract fixtures.', 'Check units, types and error compatibility.'],
      tradeoff: 'Supporting two representations costs maintenance; version only when compatibility needs justify it.',
      mistake: 'Changing a field’s units while keeping the same name/type.', exercise: 'Why is adding a field not always harmless?', guidance: 'Strict consumers may reject unknown fields; define and test the client tolerance policy.', source: 'testing'
    },
    {
      id: 'uploads', question: 'A file-upload endpoint consumes excessive resources.',
      clarify: 'Ask about permitted sizes/types, storage path, processing and user authorization.',
      answer: 'I would bound accepted work, verify authorization and move expensive processing to appropriate workers. Client-side limits alone are insufficient.',
      steps: ['Measure request size and processing cost.', 'Enforce size/type policy at appropriate layers.', 'Authorize direct uploads/downloads and clean abandoned files.'],
      code: '# Boundary illustration after receiving an upload:\nif params[:file].size > 10.megabytes\n  return render json: { error: "file_too_large" }, status: :payload_too_large\nend\n# Also configure proxy/request limits and verified content handling.',
      verify: ['Test oversized and unexpected-type input.', 'Test cleanup, download authorization and worker limits.'],
      tradeoff: 'This application check happens after input reaches Rails; infrastructure limits and direct-upload design may be needed.',
      mistake: 'Trusting a filename extension or browser-reported MIME type as complete validation.', exercise: 'Why process images outside a request?', guidance: 'CPU/memory work can exceed request budgets; use bounded processing with observable completion/failure.', source: 'security'
    },
    {
      id: 'email', question: 'Checkout waits several seconds for receipt email.',
      clarify: 'Ask whether checkout success depends on immediate email delivery.',
      answer: 'If delayed mail fits the product, I would commit the order then enqueue delivery through a durable worker, monitoring both request latency and receipt delay.',
      steps: ['Measure mail provider time.', 'Move allowed deferred delivery after commit.', 'Monitor queue age and delivery failures.'],
      code: 'class Order < ApplicationRecord\n  after_create_commit do\n    OrderMailer.receipt(self).deliver_later\n  end\nend',
      verify: ['Rollback should not enqueue an unintended receipt.', 'A running worker must deliver mail and surface failures.'],
      tradeoff: 'Commit and enqueue may still have a handoff gap depending on adapter design.',
      mistake: 'Calling enqueue success proof that mail was delivered.', exercise: 'What should you alert on besides exceptions?', guidance: 'Oldest mail-job age, backlog and delivery completion/failure metrics.', source: 'jobs'
    },
    {
      id: 'queue', question: 'Jobs enqueue successfully but never start.',
      clarify: 'Ask which adapter, queue names and worker roles are configured.',
      answer: 'I would trace a job ID from enqueue to storage to queue consumption. A live worker can still listen to the wrong queue.',
      steps: ['Inspect job queue_name and adapter.', 'Check worker health/subscriptions.', 'Correct configuration and watch backlog drain.'],
      code: 'job = ExportJob.set(queue: :exports).perform_later(export.id)\nputs job.job_id\nputs job.queue_name\n# Ensure a managed worker consumes exports.',
      verify: ['Run an actual enqueued job, not only perform_now.', 'Check queue age decreases and output is correct.'],
      tradeoff: 'Increasing worker concurrency can overload the database.',
      mistake: 'Testing perform_now and assuming the queue/serialization path works.', exercise: 'What changed if jobs stopped after a rename?', guidance: 'Compare producer queue names with deployed consumer subscriptions.', source: 'jobs'
    },
    {
      id: 'duplicates', question: 'A worker sends the same email twice after a retry.',
      clarify: 'Ask whether the provider accepted the first send before the worker lost its response.',
      answer: 'I would design for repeated execution and use an external idempotency/deduplication contract where available. A local sent flag alone cannot close every crash window.',
      steps: ['Correlate business operation and provider request IDs.', 'Inspect retry timing and side effects.', 'Choose a duplicate policy and test the failure window.'],
      code: '# Persist a stable logical operation key:\noperation_key = "receipt:#{order.id}:v1"\n# Pass it through the provider’s documented deduplication API,\n# if supported; a random new key per retry defeats deduplication.',
      verify: ['Simulate success followed by a lost response.', 'Execute the same logical operation twice and inspect effects.'],
      tradeoff: 'If a provider lacks deduplication, explicitly choose whether occasional duplicates or missed sends are preferable.',
      mistake: 'Claiming a database boolean guarantees exactly-once external delivery.', exercise: 'Where is the crash window?', guidance: 'After the provider accepts the send but before local completion state is committed.', source: 'jobs'
    },
    {
      id: 'commit', question: 'A worker reports “record not found” for an order just created.',
      clarify: 'Ask whether the enqueue happens inside an open transaction and whether reads use a replica.',
      answer: 'I would check transaction visibility and enqueue after commit using documented version/adapter behavior or an explicit callback.',
      steps: ['Compare enqueue, worker start and commit times.', 'Check DB role and row visibility.', 'Test commit and rollback paths.'],
      code: 'Order.transaction do |transaction|\n  order = current_user.orders.create!(status: "pending")\n  transaction.after_commit { ReceiptJob.perform_later(order.id) }\nend\n# Per-transaction callback API: Rails 7.2+.',
      verify: ['Worker sees the committed row.', 'Rollback does not schedule the unintended effect.'],
      tradeoff: 'An external enqueue can fail after commit; reliable handoff needs further design.',
      mistake: 'Adding arbitrary sleep to hide the race.', exercise: 'What if a replica is still behind?', guidance: 'Read critical fresh state from the writer or use an explicit read-after-write policy.', source: 'transactions'
    },
    {
      id: 'poison', question: 'One permanently invalid job retries forever.',
      clarify: 'Ask which failures are transient versus invalid data and how retries are configured.',
      answer: 'I would classify failures, bound retries and preserve evidence for rejected work. Repeating unchanged invalid input does not make it valid.',
      steps: ['Inspect exception and retry history.', 'Fix or quarantine invalid business input.', 'Alert on exhausted work and document replay conditions.'],
      code: 'class RefreshJob < ApplicationJob\n  retry_on Net::ReadTimeout, wait: 5.seconds, attempts: 3\n  # Load required net/http support and implement perform.\n  # Define a separate policy for permanently invalid inputs.\nend',
      verify: ['Test retry count for transient failure.', 'Test permanent failure is visible and not falsely successful.'],
      tradeoff: 'Discarding can be appropriate for expected deletion but dangerous for billing work.',
      mistake: 'Rescuing every exception and marking the job successful.', exercise: 'How do you safely replay repaired jobs?', guidance: 'Confirm the cause is fixed and prior effects are understood; preserve operation identity.', source: 'jobs'
    },
    {
      id: 'timeout', question: 'A payment call times out. Should you immediately charge again?',
      clarify: 'Ask whether the timeout means the request never arrived or only that the response was lost.',
      answer: 'A timeout does not establish payment failure. I would preserve the logical payment ID, reconcile with the provider and retry only through its documented idempotency contract.',
      steps: ['Record operation/provider correlation safely.', 'Check provider status or reconciliation events.', 'Keep the order in an explicit pending/unknown state until resolved.'],
      code: '# Stable logical operation identity:\npayment_key = "order:#{order.id}:payment:v1"\n# Use the provider’s documented idempotency/status API.\n# Do not create a fresh key merely because a response timed out.',
      verify: ['Simulate accepted charge plus lost response.', 'Confirm a retry cannot create an unintended second charge.'],
      tradeoff: 'An honest pending state is more complex than a false success/failure boolean.',
      mistake: 'Treating every timeout as proof that no external effect occurred.', exercise: 'Which state should the UI show?', guidance: 'An explicit pending/verification state with a status path, rather than encouraging repeated independent payments.', source: 'transactions'
    },
    {
      id: 'webhook', question: 'An integration webhook arrives twice and out of order.',
      clarify: 'Ask about signature verification, provider event IDs and ordering guarantees.',
      answer: 'I would verify the signature using the provider protocol, persist a uniquely identified event and make processing retry-safe and order-aware. A duplicate delivery is normal in many systems.',
      steps: ['Verify raw-body signature before trusting content.', 'Atomically record provider/event identity.', 'Process with explicit state-transition rules and bounded retries.'],
      code: 'add_index :received_events, [:provider, :external_id], unique: true\n# Also define verified payload storage, processing state and\n# reconciliation rules. Uniqueness alone is not the whole handler.',
      verify: ['Replay the same signed event concurrently.', 'Deliver older events after newer ones and check state correctness.'],
      tradeoff: 'Returning success before durable acceptance can lose events; doing all work synchronously may exceed provider timeouts.',
      mistake: 'Trusting parsed JSON without verifying the provider’s signature.', exercise: 'Can a timestamp alone identify duplicates?', guidance: 'No. Use documented event identity and retain it for the required replay window.', source: 'security'
    },
    {
      id: 'outbox', question: 'An order commits, but queue enqueue fails. How do you prevent lost work?',
      clarify: 'Ask whether order persistence and queue insertion share a real transaction boundary.',
      answer: 'For critical handoff I would evaluate a transactional outbox: write the order and a pending event in the same database transaction, then dispatch events with retry-safe delivery and duplicate handling.',
      steps: ['Identify the commit-to-enqueue gap.', 'Persist the intended work atomically with business data.', 'Run a dispatcher that retries and records delivery progress.'],
      code: 'Order.transaction do\n  order = current_user.orders.create!(status: "pending")\n  OutboxEvent.create!(event_type: "order_created", aggregate_id: order.id)\nend\n# A managed dispatcher later publishes pending events.',
      verify: ['Crash after commit before dispatch and confirm recovery.', 'Crash after publish before marking sent and verify duplicate safety.'],
      tradeoff: 'The outbox adds storage, cleanup and dispatcher operations; consumers still need idempotency.',
      mistake: 'Claiming after_commit makes an external queue operation atomic.', exercise: 'Why can an outbox still publish twice?', guidance: 'A crash after publish but before local acknowledgment creates a replay window.', source: 'transactions'
    },
    {
      id: 'outage', question: 'A recommendation service is down. Should the whole product page fail?',
      clarify: 'Ask whether recommendations are optional or essential to the operation.',
      answer: 'I would define the dependency’s criticality, bound its timeout and choose a product-safe fallback for optional content. I would keep failures observable rather than silently treating every error as normal.',
      steps: ['Measure dependency wait and failure rate.', 'Set bounded timeouts and retry budgets.', 'Choose cached/empty optional content or explicit failure for required data.'],
      code: 'begin\n  recommendations = RecommendationClient.fetch(product.id)\nrescue RecommendationClient::Unavailable\n  recommendations = []\n  Rails.logger.warn(event: "recommendations_unavailable")\nend\n# Application-defined client must enforce timeouts/classify errors.',
      verify: ['Test timeout, malformed body and valid response.', 'Confirm fallback does not hide checkout-critical failure.'],
      tradeoff: 'Fallbacks can improve availability but may hide prolonged degradation without alerts.',
      mistake: 'Using rescue StandardError around the entire page to return an empty success.', exercise: 'Would cached inventory be an equally safe fallback?', guidance: 'Not automatically. Stale stock can violate a business guarantee; choose by domain requirements.', source: 'debug'
    },
    {
      id: 'shutdown', question: 'A deploy interrupts a 20-minute background job.',
      clarify: 'Ask about shutdown grace, retry semantics, checkpoints and side effects.',
      answer: 'I would design bounded resumable work units or checkpoints and make repetition safe. On Rails 8.1, continuations may help, but external effects still need correctness rules.',
      steps: ['Understand worker shutdown and redelivery.', 'Persist progress at safe boundaries.', 'Test interruption and restart with real job infrastructure.'],
      code: '# A checkpointed application design fragment:\nBatchJob.perform_later(export.id, last_completed_id)\n# Persist progress only after a bounded unit is safely complete.\n# Validate cursor ordering and duplicate-output policy.',
      verify: ['Interrupt after partial progress and resume.', 'Check no missing/duplicate logical output.'],
      tradeoff: 'Checkpoint frequency balances replay cost against storage/write overhead.',
      mistake: 'Assuming a larger shutdown timeout guarantees eventual completion.', exercise: 'What belongs in a checkpoint?', guidance: 'Stable operation identity and enough durable progress to resume safely; not a live in-memory model object.', source: 'jobs'
    },
    {
      id: 'inventory', question: 'Two customers try to buy the last unit simultaneously.',
      clarify: 'Ask which database owns stock and when reservation/payment occur.',
      answer: 'I would enforce the stock transition atomically in the authoritative database, using a short lock or conditional update. Application checks outside a transaction can race.',
      steps: ['Reproduce with concurrent requests.', 'Keep the stock check/update in one atomic unit.', 'Separate external payment coordination from long-held database locks.'],
      code: 'product.with_lock do\n  raise SoldOut if product.stock <= 0\n  product.update!(stock: product.stock - 1)\n  # Create the related reservation in this transaction.\nend\n# SoldOut is an application-defined domain exception.',
      verify: ['Run two concurrent purchases with stock one.', 'Assert one reservation and no negative stock.'],
      tradeoff: 'Locks serialize contending writes; keep transactions short and define reservation expiry.',
      mistake: 'Checking stock, calling a slow provider, then decrementing without concurrency control.', exercise: 'How could a conditional update work?', guidance: 'Update only where stock > 0 and check affected rows, while preserving related transactional invariants.', source: 'locking'
    },
    {
      id: 'uniqueness', question: 'Two signups with the same email both pass validation.',
      clarify: 'Ask about normalization/collation and the database uniqueness constraint.',
      answer: 'I would keep friendly validation but enforce uniqueness in the database. Concurrent pre-insert checks alone cannot guarantee uniqueness.',
      steps: ['Define exact email normalization policy.', 'Reconcile existing duplicates.', 'Add a unique index and handle expected conflicts.'],
      code: 'add_index :users, :email, unique: true\n# This plain index uses stored values/collation.\n# Model validation is additional feedback, not the race barrier.',
      verify: ['Attempt simultaneous conflicting inserts.', 'Test the chosen case/normalization policy.'],
      tradeoff: 'Case-insensitive uniqueness may require normalization or an adapter-specific index strategy.',
      mistake: 'Assuming uniqueness validation locks out concurrent inserts.', exercise: 'Why not rescue a PostgreSQL constraint error and continue the same transaction?', guidance: 'The transaction can be aborted; handle/retry the whole unit at the appropriate boundary.', source: 'transactions'
    },
    {
      id: 'deadlock', question: 'Concurrent transfers sometimes deadlock.',
      clarify: 'Ask which rows are locked, in what order, and whether retries can safely repeat the full transaction.',
      answer: 'I would inspect lock order, make it consistent and keep transactions short. A bounded retry of the whole safe transaction may handle remaining transient deadlocks.',
      steps: ['Capture database deadlock evidence.', 'Compare resource acquisition order.', 'Apply consistent ordering and test concurrency.'],
      code: '# Lock relevant rows in a consistent order:\nAccount.transaction do\n  accounts = Account.where(id: [from_id, to_id]).order(:id).lock.to_a\n  # Validate and perform both updates atomically.\nend',
      verify: ['Run opposing concurrent operations.', 'Assert money/state conservation under retries.'],
      tradeoff: 'Retrying only the last statement may break the intended transaction semantics.',
      mistake: 'Adding unlimited retries without correcting lock-order patterns.', exercise: 'Why avoid network calls while holding locks?', guidance: 'External latency prolongs contention and increases timeout/deadlock risk.', source: 'locking'
    },
    {
      id: 'stale_cache', question: 'A product price stays stale after an update.',
      clarify: 'Ask about cache keys, versions, TTL and whether related data affects the price.',
      answer: 'I would inspect the actual cache key and invalidation rule. I would version keys by the relevant record/dependencies or use an explicit acceptable-staleness policy.',
      steps: ['Reproduce a hit, update and read.', 'Check whether the key changes.', 'Model dependencies and test invalidation.'],
      code: 'Rails.cache.fetch([product, "display-price-v1", currency], expires_in: 10.minutes) do\n  PricePresenter.new(product, currency: currency).call\nend\n# Product versioning does not automatically capture unrelated exchange-rate changes.',
      verify: ['Change price and verify freshness.', 'Test currency and dependency changes.'],
      tradeoff: 'A shorter TTL reduces staleness but increases misses; it is not immediate consistency.',
      mistake: 'Deleting one key manually and calling invalidation solved.', exercise: 'What if exchange rates change independently?', guidance: 'Include their version or use a designed TTL/invalidation mechanism for that dependency.', source: 'cache'
    },
    {
      id: 'tenant_cache', question: 'One tenant sees another tenant’s cached dashboard.',
      clarify: 'Ask which identity, permissions and locale dimensions affect the value.',
      answer: 'I would treat this as an isolation defect: correct the sharing boundary, invalidate unsafe entries and test distinct tenants with distinct data.',
      steps: ['Inspect key composition.', 'Reproduce with two tenants.', 'Add all required dimensions and a key version.'],
      code: 'key = ["dashboard-v2", current_account.id, I18n.locale]\nRails.cache.fetch(key, expires_in: 1.minute) do\n  DashboardSummary.new(current_account).call\nend',
      verify: ['Two accounts must receive isolated values.', 'Permission-sensitive variants must not share unsafe cached output.'],
      tradeoff: 'Per-user keys improve isolation but reduce reuse; cache only truly shareable data.',
      mistake: 'Using one global dashboard key for account-specific results.', exercise: 'Should roles be in every key?', guidance: 'Only if role changes the output; define the precise sharing boundary rather than blindly appending fields.', source: 'cache'
    },
    {
      id: 'stampede', question: 'A popular cache key expires and floods the database.',
      clarify: 'Ask about request concurrency, computation cost and whether serving slightly stale data is allowed.',
      answer: 'I would measure concurrent misses, consider controlled stale serving or coordinated recomputation and spread expiry where appropriate. Cache misses need capacity planning.',
      steps: ['Correlate database spikes with expiry.', 'Choose an acceptable stale-data strategy.', 'Test the cache store’s actual behavior under concurrency.'],
      code: 'Rails.cache.fetch("public-catalog-summary-v1",\n  expires_in: 5.minutes, race_condition_ttl: 10.seconds) do\n  PublicCatalogSummary.build\nend\n# Verify support/semantics for the selected store.',
      verify: ['Run concurrent requests around expiry.', 'Test cold-cache behavior and failure of the recomputation.'],
      tradeoff: 'Race-condition TTL can allow stale data and does not eliminate every cold-miss storm.',
      mistake: 'Assuming cache.fetch guarantees one global computation across all processes.', exercise: 'What if stale prices are unacceptable?', guidance: 'Do not apply stale serving blindly; separate authoritative pricing from optional summaries.', source: 'cache'
    },
    {
      id: 'locking', question: 'Two staff members overwrite each other’s order edits.',
      clarify: 'Ask whether the product should reject stale edits or merge changes.',
      answer: 'I would use a defined concurrency policy. Optimistic locking can reject stale saves so the user can reload/resolve conflicts instead of silently losing changes.',
      steps: ['Add the supported version column.', 'Carry the version in edit submissions.', 'Handle the stale-object exception with a useful conflict flow.'],
      code: 'add_column :orders, :lock_version, :integer, default: 0, null: false\n# On conflicting save Rails can raise ActiveRecord::StaleObjectError.\n# Permit and carry lock_version in the controlled edit flow.',
      verify: ['Load two copies, save each and observe the conflict.', 'Check no intended data is silently overwritten.'],
      tradeoff: 'Optimistic locking detects conflicts but does not decide how to merge them.',
      mistake: 'Rescuing the stale error and blindly retrying with a fresh version.', exercise: 'When would pessimistic locking fit better?', guidance: 'For a short coordinated server-side transition where waiting/serialization is preferable.', source: 'locking'
    },
    {
      id: 'money', question: 'Web and API checkout totals differ by one cent.',
      clarify: 'Ask about units, tax/discount order, rounding policy and authoritative calculation.',
      answer: 'I would trace one known order through the same server-side pricing policy, using integer cents or explicit decimal arithmetic and documented rounding boundaries.',
      steps: ['Capture inputs and calculation order.', 'Compare integer/decimal/float paths.', 'Centralize authoritative pricing and test rounding edges.'],
      code: '# Example rule: integer cents, integer percentage, half-up rounding.\ndiscounted_cents = (total_cents * (100 - percent) + 50).div(100)\n# Validate the allowed percent range first.',
      verify: ['Test boundary cents and compound tax/discount rules.', 'Assert the API and rendered checkout use the same authoritative result.'],
      tradeoff: 'Rounding each line versus the final total can intentionally differ; the business rule must choose.',
      mistake: 'Changing to Float everywhere without specifying monetary behavior.', exercise: 'What if prices need fractions of a cent internally?', guidance: 'Choose an explicit precision/decimal representation and define when conversion to payable cents occurs.', source: 'testing'
    },
    {
      id: 'timezone', question: 'A daily order report misses records around midnight.',
      clarify: 'Ask whose calendar day matters, storage timezone and daylight-saving transitions.',
      answer: 'I would calculate the intended local day boundaries, convert/query correctly and use an exclusive end boundary. A fixed 24-hour assumption can fail across clock changes.',
      steps: ['Inspect timestamps and configured zone.', 'Reproduce at both day boundaries.', 'Compute the next local day boundary and test DST where relevant.'],
      code: 'Time.use_zone("America/New_York") do\n  day = Date.new(2026, 11, 1)\n  start_at = day.in_time_zone\n  end_at = day.next_day.in_time_zone\n  orders = current_user.orders.where(created_at: start_at...end_at)\nend',
      verify: ['Test just before/at start and end.', 'Test a DST transition for the chosen zone.'],
      tradeoff: 'Business-local calendar ranges differ from UTC dates and from fixed durations.',
      mistake: 'Filtering by server-local date without establishing the reporting timezone.', exercise: 'Why use an exclusive end?', guidance: 'Adjacent reports do not both include the exact next-day boundary.', source: 'config'
    },
    {
      id: 'deletion', question: 'Deleting an account leaves broken order references.',
      clarify: 'Ask about retention, legal/business requirements and child-record ownership.',
      answer: 'I would define deletion semantics before selecting callbacks: restrict deletion, retain/anonymize history or cascade selected records with database integrity constraints.',
      steps: ['Inventory references and retention requirements.', 'Choose an explicit association/database policy.', 'Test direct deletes, application deletes and background cleanup.'],
      code: 'class Customer < ApplicationRecord\n  has_many :orders, dependent: :restrict_with_error\nend\n# Add an appropriate foreign key in the database as well.',
      verify: ['Reject an invalid parent deletion.', 'Check no orphan references and correct user feedback.'],
      tradeoff: 'Deleting large child graphs synchronously can be expensive; a staged process may be needed.',
      mistake: 'Assuming an application callback protects against every direct SQL path.', exercise: 'Why might order history be retained?', guidance: 'Reporting, reconciliation and domain retention rules may require it; deletion is not merely a callback choice.', source: 'transactions'
    },
    {
      id: 'memory', question: 'Worker memory grows every hour until restart.',
      clarify: 'Ask whether this is peak allocation, retained Ruby objects, native memory or process fragmentation.',
      answer: 'I would compare repeated workloads and retained memory, inspect long-lived collections and measure process RSS alongside Ruby counters. A restart is mitigation, not an explanation.',
      steps: ['Correlate growth with jobs/requests.', 'Capture controlled allocation/retention evidence.', 'Remove unintended retention and rerun the same workload.'],
      code: 'before = GC.stat(:total_allocated_objects)\n# Run a representative bounded operation here.\nafter = GC.stat(:total_allocated_objects)\nputs "allocated=#{after - before}"\n# Allocation counts alone do not prove a leak.',
      verify: ['Repeat the workload and inspect settled memory.', 'Measure RSS and job correctness.'],
      tradeoff: 'Some high-water memory is reusable rather than leaked; native libraries can require separate tools.',
      mistake: 'Calling GC.start constantly to fix an array that retains every record.', exercise: 'What long-lived objects would you inspect?', guidance: 'Global caches, class-level arrays, memoized request state and subscriptions retaining closures.', source: 'deployment'
    },
    {
      id: 'cpu', question: 'CPU is high while database time is small.',
      clarify: 'Ask about request mix, serialization, parsing, allocations and traffic growth.',
      answer: 'I would profile a representative operation to identify expensive Ruby work, then compare self/total cost and validate a focused change with unprofiled traffic.',
      steps: ['Confirm CPU rather than external wait is dominant.', 'Capture a controlled profile.', 'Remove demonstrated repeated work and compare output/metrics.'],
      code: 'require "stackprof"\nStackProf.run(mode: :cpu, out: "tmp/cpu.dump") do\n  ReportBuilder.new(customer_id: 42).call\nend',
      verify: ['Compare correctness, CPU, latency and memory.', 'Keep workload, warm-up and profiling conditions equivalent.'],
      tradeoff: 'A JIT or worker change may help but cannot substitute for identifying the expensive path.',
      mistake: 'Adding indexes when evidence points to Ruby processing.', exercise: 'High total time but low self time means what?', guidance: 'The method mostly calls expensive children; inspect those callees.', source: 'deployment'
    },
    {
      id: 'migration', question: 'A deployment migration blocks production writes.',
      clarify: 'Ask about adapter/version, DDL lock behavior, table size and long transactions.',
      answer: 'I would inspect locks, mitigate safely and plan the schema change in compatible stages. Database-specific online operations still have prerequisites and failure modes.',
      steps: ['Identify blocking/waiting sessions.', 'Choose an evidence-based mitigation.', 'Separate schema expansion, backfill and later constraint/removal work.'],
      code: '# PostgreSQL migration example:\nclass AddOrderCustomerIndex < ActiveRecord::Migration[7.2]\n  disable_ddl_transaction!\n  def change\n    add_index :orders, :customer_id, algorithm: :concurrently\n  end\nend',
      verify: ['Test on representative staging data.', 'Inspect completion, index validity and application compatibility.'],
      tradeoff: 'Concurrent creation reduces certain blocking but can fail and is not a universal zero-lock promise.',
      mistake: 'Applying PostgreSQL-specific options to SQLite or another unsupported adapter.', exercise: 'What is expand/contract?', guidance: 'Add compatible structures, deploy compatible code/backfill, then remove old structures after rollback needs pass.', source: 'query'
    },
    {
      id: 'deploy', question: 'JavaScript and styles work locally but disappear after deploy.',
      clarify: 'Ask about asset pipeline, build scripts and what enters the final image.',
      answer: 'I would reproduce a clean production asset build and inspect manifest/URLs. Development watchers can hide missing compilation steps.',
      steps: ['Inspect browser 404s and actual HTML includes.', 'Run clean dependency/JS/CSS builds.', 'Ensure precompiled output is copied into the deployment artifact.'],
      code: '# In the project’s build environment:\n# yarn build\n# yarn build:css (if configured)\n# RAILS_ENV=production bin/rails assets:precompile\n# PowerShell: set $env:RAILS_ENV before running Rails.', lang: 'text',
      verify: ['Boot a clean final image.', 'Check asset URLs and full-load/navigation behavior.'],
      tradeoff: 'Propshaft publishes assets but does not itself compile JSX or Sass.',
      mistake: 'Editing generated local bundles and omitting their source/build process.', exercise: 'What if both import-map and bundle tags load application code?', guidance: 'Choose one intended entry-point strategy and remove duplicate initialization.', source: 'config'
    },
    {
      id: 'secrets', question: 'Login works on one instance but loops on another.',
      clarify: 'Ask about secret consistency, cookie attributes, host and proxy HTTPS settings.',
      answer: 'I would trace verification and the next request’s session restoration across instances. Shared secret configuration and correct cookie topology must be consistent.',
      steps: ['Correlate requests with instance/release IDs.', 'Inspect Set-Cookie and subsequent Cookie transport.', 'Compare secret references and deployment settings without logging values.'],
      code: '# Log safe routing context, not cookies/secrets:\nRails.logger.info({ event: "session_check",\n  request_id: request.request_id,\n  instance: ENV.fetch("INSTANCE_ID", "unknown") }.to_json)',
      verify: ['Alternate requests across instances.', 'Test logout/expiry and real HTTPS origin.'],
      tradeoff: 'Secret rotation may invalidate sessions; plan compatibility and recovery.',
      mistake: 'Solving the symptom by weakening Secure/SameSite settings without understanding topology.', exercise: 'What proves password verification is not the failure?', guidance: 'A successful verification event followed by missing identity on the next request localizes the failure to persistence/restoration.', source: 'security'
    },
    {
      id: 'observability', question: 'Only a small fraction of production requests fail.',
      clarify: 'Ask which accounts, data sizes, release/instance and dependencies correlate with failure.',
      answer: 'I would segment the evidence and follow representative request IDs instead of relying on averages. The failing cohort often reveals a boundary condition or partial deployment.',
      steps: ['Capture exact error and correlation IDs.', 'Group by release, endpoint and safe account characteristics.', 'Reproduce a representative failing case.'],
      code: 'Rails.logger.info({ event: "orders_request",\n  request_id: request.request_id,\n  release: ENV.fetch("RELEASE_ID", "unknown"),\n  format: request.format.to_s }.to_json)',
      verify: ['Confirm the identified cohort reproduces.', 'After fixing, inspect both cohort and overall error rate.'],
      tradeoff: 'More telemetry costs storage and can expose sensitive data; collect intentional fields.',
      mistake: 'Declaring health from an average while a high-percentile cohort fails.', exercise: 'Which data should not be logged?', guidance: 'Tokens, passwords, full sensitive bodies and unnecessary personal data; identifiers need appropriate access/retention too.', source: 'debug'
    },
    {
      id: 'tests', question: 'All tests pass but production fails.',
      clarify: 'Ask which behavior the tests actually exercise and which environments differ.',
      answer: 'I would compare runtimes, configuration, database/adapter, data volume and external boundaries. A passing suite proves only its exercised conditions.',
      steps: ['Identify the missing production condition.', 'Reproduce it in a controlled environment.', 'Add a regression at the right integration boundary.'],
      code: '# Example request contract check after authentication setup:\nget "/api/orders", headers: { "Accept" => "application/json" }\nassert_response :success\nassert response.parsed_body.fetch("orders").is_a?(Array)',
      verify: ['Make the new regression fail on the old behavior.', 'Run the relevant real worker/asset/configuration smoke path.'],
      tradeoff: 'Not every dependency needs a live test on every commit; choose focused contract and staging checks.',
      mistake: 'Adding an assertion that duplicates implementation but never exercises the failing boundary.', exercise: 'Why can perform_now-only tests miss a job outage?', guidance: 'They bypass enqueue, serialization, routing, queue wait and the separate worker environment.', source: 'testing'
    },
    {
      id: 'frontend', question: 'Turbo navigation makes one click send multiple requests.',
      clarify: 'Ask where listeners are registered and whether widgets clean up before caching/removal.',
      answer: 'I would trace listener lifecycle, register stable delegated handlers once or use an owned Stimulus controller, and test repeated navigation.',
      steps: ['Confirm duplicate requests in Network.', 'Find repeated document listener registration.', 'Pair widget initialization with cleanup.'],
      code: 'import { Controller } from "@hotwired/stimulus";\nexport default class extends Controller {\n  connect() {\n    this.onClick = () => { /* one owned interaction */ };\n    this.element.addEventListener("click", this.onClick);\n  }\n  disconnect() {\n    this.element.removeEventListener("click", this.onClick);\n  }\n}', lang: 'javascript',
      verify: ['Navigate away/back several times.', 'Assert one intended request per click and no stale widget state.'],
      tradeoff: 'React, jQuery and Turbo need explicit DOM ownership when combined.',
      mistake: 'Adding another listener inside every turbo:load without cleanup.', exercise: 'What if a stateful plugin changes DOM before Turbo caches it?', guidance: 'Reset/dispose according to its API before caching so the snapshot can initialize correctly.', source: 'debug'
    },
    {
      id: 'rollout', question: 'A new feature causes a production regression.',
      clarify: 'Ask about impact, start time, release, feature flag and schema compatibility.',
      answer: 'I would reduce impact through an appropriate reversible mitigation, preserve evidence and validate the causal chain afterward. Rollback is not automatically safe after incompatible schema changes.',
      steps: ['Define affected user behavior and correlate the release.', 'Disable the feature or roll back when evidence and compatibility permit.', 'Reproduce and add prevention/detection checks.'],
      code: 'if Features.enabled?(:new_order_summary, current_account)\n  NewOrderSummary.call(current_account)\nelse\n  ExistingOrderSummary.call(current_account)\nend\n# Features is an application-defined, monitored flag mechanism.',
      verify: ['Confirm user-visible recovery.', 'Check errors, latency and job backlog after mitigation.'],
      tradeoff: 'Feature flags add paths and cleanup responsibility; test both states.',
      mistake: 'Restoring the old image without checking database/job-payload compatibility.', exercise: 'What should a post-incident review produce?', guidance: 'A factual timeline, evidence-backed causes and concrete prevention/detection/recovery improvements.', source: 'deployment'
    },
    {
      id: 'architecture', question: 'Should a growing Rails app become separate services and a React frontend?',
      clarify: 'Ask what problem the split solves: team ownership, client state, independent scaling or deployment boundaries.',
      answer: 'I would identify a concrete constraint and validate one vertical slice before splitting. Rails views, islands, a separate frontend and services each add different ownership and operational costs.',
      steps: ['Measure the actual bottleneck or coordination problem.', 'Compare a modular monolith/island with a split design.', 'Define API, authentication, failure and deployment contracts.'],
      code: '# A service boundary can start as an internal interface:\nsummary = OrderSummary.call(account: current_account)\n# First make behavior and tests explicit; a network boundary\n# additionally requires timeouts, contracts and observability.',
      verify: ['Exercise end-to-end behavior and failures.', 'Compare operational/development cost with the original constraint.'],
      tradeoff: 'A network split adds latency, partial failures, data coordination and compatibility maintenance.',
      mistake: 'Assuming microservices or React automatically fix database bottlenecks.', exercise: 'What is a vertical slice here?', guidance: 'One complete feature across UI, API/data, authentication, error handling and deployment that validates the proposed boundary.', source: 'deployment'
    }
  );
})();
