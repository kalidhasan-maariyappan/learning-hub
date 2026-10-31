(function () {
  'use strict';
  const chapter = window.JT.practicalChapter;
  const debugging = ['Rails debugging guide', 'https://guides.rubyonrails.org/v8.0/debugging_rails_applications.html'];
  const testing = ['Rails testing guide', 'https://guides.rubyonrails.org/v8.0/testing.html'];
  chapter('rails_practical_debug_workflow', {
    version: 'Rails 7.2 and 8.x.', prerequisites: 'Basic requests, controllers and model validation.',
    what: 'Debugging finds why observed behavior differs from expected behavior. A stack trace identifies the failure path; a root cause explains why that path received the wrong state or input.',
    why: 'Changing code near an error can hide a symptom. A systematic investigation produces a small, testable fix and a regression test.',
    when: 'Use this workflow for crashes, wrong totals, missing records and behavior that fails only for some accounts or environments.',
    how: 'Separate facts from hypotheses. Reduce a failing request to the smallest input that still reproduces it. Follow data across client input, permitted parameters, model rules, database state and rendered output.',
    steps: ['Record expected and actual behavior.', 'Capture request ID, release, input shape and relevant record IDs.', 'Reproduce in a controlled environment.', 'Read the full exception and first relevant application stack frame.', 'Inspect state immediately before failure and test one hypothesis.', 'Add a regression test, make the focused fix and check adjacent behavior.'],
    examples: [
      {title: 'Before: integer division loses a discount', code: 'def discounted_total(total_cents, percent)\n  total_cents * (1 - percent / 100)\nend\nputs discounted_total(1_000, 10)', result: '1000'},
      {title: 'After: explicit cent rounding and regression assertions', code: 'def discounted_total(total_cents, percent)\n  # Teaching rule: round half up to the nearest cent.\n  (total_cents * (100 - percent) + 50).div(100)\nend\nassert_equal 900, discounted_total(1_000, 10)\nassert_equal 901, discounted_total(1_001, 10)', result: 'Validate percent bounds in the application. Put assertions in a test case.'}
    ],
    scenario: {title: 'A coupon appears to do nothing', before: 'Checkout succeeds, but a ten-percent discount leaves the total unchanged.', investigate: ['Confirm the coupon was accepted before debugging arithmetic.', 'Reproduce with total 1000 and percent 10.', 'Inspect operand types and integer division.', 'Specify rounding before choosing an implementation.'], after: 'The calculation follows an explicit cent-rounding rule, and the test catches the original failure.'},
    verify: ['Check zero and 100-percent discounts, invalid percentages and cent rounding.', 'Confirm the controller uses the corrected method.', 'Test combinations with existing adjustments.'],
    tips: ['Keep a hypothesis log: prediction, observation and conclusion.', 'Test the failing boundary, not just a happy path.', 'Check data, dependency and configuration changes too.'],
    mistake: 'Rescuing every exception and returning a default without understanding the failed invariant.',
    exercises: [['Write a useful bug report for this coupon.', 'Include inputs 1000/10, expected 900, actual 1000, release and reproduction steps.'], ['Why not convert all monetary values to Float?', 'Binary floating point can introduce rounding surprises. Choose an explicit integer-cent or decimal policy.']],
    interview: [['Symptom versus root cause?', 'The unchanged total is the symptom. Integer division is the immediate defect; missing boundary coverage explains its escape.'], ['What must a regression test demonstrate?', 'It fails for the original defect and passes for the intended business rule.']],
    summary: 'Reproduce, inspect data and types, test a hypothesis and preserve the finding in a regression test.', sources: [debugging, testing]
  });
  chapter('rails_practical_logs', {
    version: 'Rails 7.2 and 8.x.', prerequisites: 'Application logs and a reproducible request.',
    what: 'Logs record events. Correlation connects related events through request, job or business-operation identifiers.',
    why: 'Timestamps alone can mix simultaneous requests. Consistent context lets you follow one failing operation through a noisy log stream.',
    when: 'Use logs for production requests you cannot pause, and to compare client behavior with server execution.',
    how: 'Tagged logging adds context. Log levels control emitted detail. SQL comments can connect database work to an action or job. Record small, intentional fields instead of entire objects.',
    steps: ['Find the failing request in a client or error report.', 'Extract request ID and release.', 'Filter the log stream to that operation.', 'Follow controller, SQL and dependency events.', 'Add narrowly scoped context where a transition is invisible.'],
    examples: [
      {title: 'config/environments/production.rb', code: 'config.log_tags = [:request_id]'},
      {title: 'A bounded controller event', code: 'Rails.logger.info({\n  event: "order_validation_failed",\n  request_id: request.request_id,\n  fields: @order.errors.attribute_names\n}.to_json)'},
      {title: 'config/initializers/filter_parameter_logging.rb', code: 'Rails.application.config.filter_parameters += [\n  :password, :password_confirmation, :token, :authorization\n]', result: 'Custom messages still require careful handling; manual logging can bypass filtering.'}
    ],
    scenario: {title: 'Interleaved checkout attempts', before: 'A successful transaction seems connected to another customer’s validation failure.', investigate: ['Group by request ID.', 'Follow only the failing action and its SQL.', 'Find the rejected input without mixing traffic.'], after: 'The evidence describes one request instead of a misleading sequence from several requests.'},
    verify: ['Distinguish two concurrent requests.', 'Confirm secrets are filtered.', 'Review custom events for sensitive fields.'],
    tips: ['Use stable field names.', 'Prefer IDs and error codes to object dumps.', 'Pass business correlation into jobs explicitly; later jobs have their own execution identity.'],
    mistake: 'Leaving debug logging enabled indefinitely or dumping passwords/tokens into custom log messages.',
    exercises: [['What context belongs in a validation event?', 'Request ID, event name and relevant failing field names, with no secret values.'], ['Why are timestamps insufficient?', 'Concurrent requests overlap; an identifier separates their execution paths.']],
    interview: [['Are custom logs automatically filtered?', 'Not universally. A manually interpolated secret can bypass Rails parameter filtering.'], ['Which context matters during an incident?', 'Request/job ID, release, environment, time and narrowly chosen business identifiers.']],
    summary: 'Good logs reconstruct behavior with minimal noise and sensitive data.', sources: [debugging, ['Rails security', 'https://guides.rubyonrails.org/v8.0/security.html']]
  });
  chapter('rails_practical_breakpoints', {
    version: 'Rails 7.2/8.x with ruby/debug.', prerequisites: 'An interactive local Rails process and a failing action.',
    what: 'A breakpoint pauses execution to inspect variables and the stack. A debugger lets you advance through the actual program state.',
    why: 'Logs may show a missing value without showing where it disappeared. Pausing close to the transition reveals the inputs and mutations.',
    when: 'Use local development or a controlled reproduction. Investigate active production traffic through logs and traces first.',
    how: 'binding.break pauses when debug is loaded. next advances over a call; step enters it; finish leaves a frame; bt displays the stack; continue resumes. Evaluated Ruby executes real code.',
    steps: ['Ensure debug is available in development/test.', 'Run Rails in an interactive terminal.', 'Place binding.break before the suspected transition.', 'Trigger the request and inspect local values/classes.', 'Step through the relevant code and remove the breakpoint afterward.'],
    examples: [
      {title: 'Gemfile dependency and action fragment', code: '# Gemfile\ngroup :development, :test do\n  gem "debug", platforms: [:mri, :windows]\nend\n\n# Action under investigation\n@order = current_customer.orders.build(order_params)\nbinding.break\n@order.save'},
      {title: 'Debugger prompt commands', lang: 'text', code: 'p @order.attributes\np @order.valid?\np @order.errors.to_hash\nbt\nnext\ncontinue', result: 'valid? executes validations and any application validation code.'}
    ],
    scenario: {title: 'The form contains an address but the model does not', before: 'Order validation fails because shipping_address_id is nil.', investigate: ['Pause after applying order_params.', 'Compare submitted and permitted key names.', 'Correct the mismatched form/parameter shape.', 'Repeat without a breakpoint.'], after: 'The expected value reaches the model and a request test covers the original input.'},
    verify: ['Remove temporary breakpoints.', 'Run the request and relevant tests normally.', 'Check invalid inputs still show useful errors.'],
    tips: ['Break near the suspected transition.', 'Inspect types as well as values.', 'Remote debugger access permits code evaluation; keep it within a controlled environment.'],
    mistake: 'Calling save or an external service at the debugger prompt without recognizing its real effects.',
    exercises: [['Which command shows the call path?', 'bt shows the backtrace. Select the relevant application frame.'], ['How do nil and an empty string differ?', 'Inspect with p and class; they are distinct values and may take different branches.']],
    interview: [['next versus step?', 'next runs over a method call; step follows execution into it.'], ['Why inspect close to the mutation?', 'It narrows the search and exposes the before/after state.']],
    summary: 'Inspect controlled execution at the right boundary, then convert the finding into a repeatable test.', sources: [['ruby/debug documentation', 'https://github.com/ruby/debug']]
  });
  chapter('rails_practical_model_debug', {
    version: 'Rails 7.2/8.x; PostgreSQL transaction caveat is adapter-specific.', prerequisites: 'User has email; Order belongs to Customer; strong parameters.',
    what: 'Controller bugs affect inputs and response flow. Model bugs affect business rules. Database bugs affect persisted values, constraints and concurrency.',
    why: 'A failed save is not always an exception. An assigned value may never persist, and validation can pass before a concurrent insert violates uniqueness.',
    when: 'Investigate unsaved records, wrong query results, unexpected callbacks and duplicate data using these boundaries.',
    how: 'save returns false on validation failure; save! raises. errors explains rejected attributes. reload reads persisted state. Constraints enforce invariants even when validation races or is bypassed.',
    steps: ['Inspect submitted and permitted values.', 'Build the model and read valid? and errors.', 'Check save return values or exact exceptions.', 'Inspect callbacks and rollback paths.', 'Reload and inspect SQL and database constraints.'],
    examples: [
      {title: 'Handle both save outcomes', code: '@order = current_customer.orders.build(order_params)\nif @order.save\n  redirect_to @order\nelse\n  render :new, status: :unprocessable_entity\nend'},
      {title: 'Inspect a validation locally', code: 'user = User.new(email: "")\np user.valid?\np user.errors.to_hash'},
      {title: 'Constraint after resolving duplicates and defining case policy', code: 'class AddUniqueUsersEmail < ActiveRecord::Migration[7.2]\n  def change\n    add_index :users, :email, unique: true\n  end\nend'}
    ],
    scenario: {title: 'Concurrent signup creates duplicate emails', before: 'A uniqueness validation exists, but two simultaneous requests pass it.', investigate: ['Reproduce concurrent inserts.', 'Check for a unique database index.', 'Normalize and reconcile existing duplicates.', 'Add the constraint and handle the expected conflict at the request boundary.'], after: 'The database rejects conflicts and the application provides a consistent error.'},
    verify: ['Test valid and invalid saves.', 'Test the database uniqueness constraint.', 'Check external side effects happen at the correct transaction boundary.'],
    tips: ['Define case/normalization policy before indexing email.', 'Do not continue a PostgreSQL transaction after a statement error; retry the whole unit at the proper boundary.', 'Bulk APIs and update_columns bypass parts of normal validation/callback flow.'],
    mistake: 'Ignoring save returning false or treating in-memory assignment as proof of persistence.',
    exercises: [['How do you explain a false save?', 'Read record.errors, inspect validations and compare incoming attributes.'], ['Why clean duplicates before adding an index?', 'Existing conflicts prevent a valid unique index from being built.']],
    interview: [['Why validation and constraint?', 'Validation gives feedback; the database protects concurrent writes.'], ['What does reload establish?', 'The currently visible persisted state rather than only the object’s in-memory state.']],
    summary: 'Trace input through controller, model and database. Enforce critical invariants under concurrency.', sources: [['Rails validations', 'https://guides.rubyonrails.org/v8.0/active_record_validations.html'], ['Rails transactions', 'https://api.rubyonrails.org/v8.0/classes/ActiveRecord/Transactions/ClassMethods.html']]
  });
  chapter('rails_practical_browser', {
    version: 'Rails 7.2/8.x and modern browser tools.', prerequisites: 'A form-driven page with JavaScript.',
    what: 'Browser developer tools expose requests, responses, DOM state, JavaScript errors and rendering activity.',
    why: 'A broken button may send no request, receive validation errors or fail to render correct data. These require different fixes.',
    when: 'Start here for broken forms, duplicate submissions, asset failures and browser-only problems.',
    how: 'Network shows method, payload, headers, response and timing. Console shows runtime errors. Elements shows the current DOM, including changes after Turbo navigation.',
    steps: ['Open Network before reproducing.', 'Preserve history if navigation clears it.', 'Inspect the triggered request and its payload.', 'Read status, content type and body.', 'Correlate server logs, then inspect client rendering.'],
    examples: [
      {title: 'Inspect a same-origin response locally', lang: 'javascript', code: 'const response = await fetch("/orders.json", {\n  headers: { Accept: "application/json" },\n  credentials: "same-origin"\n});\nconsole.log(response.status, response.headers.get("content-type"));\nconsole.log(await response.text());', result: 'Use sanitized data. HTML from a login page is not a JSON success.'},
      {title: 'Check whether the expected DOM target exists', lang: 'javascript', code: 'document.querySelectorAll("[data-submit-order]").length'}
    ],
    scenario: {title: 'A button submits twice after navigation', before: 'Each turbo:load registers another document listener.', investigate: ['Confirm two requests in Network.', 'Trace the initiator to repeated listener registration.', 'Register once or use lifecycle-managed controllers.', 'Navigate away and back several times.'], after: 'One interaction creates one intended request; consequential operations may still need server-side idempotency.'},
    verify: ['Test reload and Turbo navigation.', 'Check expired sessions and failed responses.', 'Test keyboard submission.'],
    tips: ['Remove tokens/cookies before sharing copied curl requests.', 'Record whether browser cache was disabled.', 'CORS is browser enforcement; inspect server logs too.'],
    mistake: 'Editing the backend before confirming the actual client method, payload and response.',
    exercises: [['Where do you investigate an image 404?', 'Network URL/status, then deployed asset path and manifest.'], ['Correct response but blank UI: next step?', 'Inspect console errors, DOM selectors and rendering/lifecycle behavior.']],
    interview: [['Why inspect content type?', 'The client may receive HTML or a proxy error while expecting JSON.'], ['How do you isolate rendering time?', 'Compare browser performance traces with request and server timings for the same operation.']],
    summary: 'Establish what the client sent and received before choosing the server or browser investigation path.', sources: [['Chrome Network tools', 'https://developer.chrome.com/docs/devtools/network/'], ['Turbo events', 'https://turbo.hotwired.dev/reference/events']]
  });
  chapter('rails_practical_api_debug', {
    version: 'Rails 7.2/8.x; existing API authentication required.', prerequisites: 'JSON, routes, strong parameters and customer authentication.',
    what: 'API debugging validates the HTTP contract: method, path, credentials, request format, status, headers and response schema.',
    why: 'A client can fail because Rails returned HTML or a different error shape, even when a controller appears to work.',
    when: 'Use this workflow for 400/401/403/404/422/500 responses, missing fields and client-specific behavior.',
    how: 'Accept requests a response representation. Content-Type labels the submitted body. Malformed input, invalid data and failed authentication are different failures and deserve distinct contract tests.',
    steps: ['Save a minimal curl or Postman request.', 'Verify URL, method, headers and authentication.', 'Read the raw response before parsing it.', 'Correlate request ID with Rails logs.', 'Add integration tests for success and failures.'],
    examples: [
      {title: 'order.json: local request body', lang: 'json', code: '{"order":{"shipping_address_id":12}}'},
      {title: 'Use the authentication implemented by your API', lang: 'text', code: 'curl -i -X POST http://localhost:3000/api/orders -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer LOCAL_TEST_TOKEN" --data-binary @order.json'},
      {title: 'Controller fragment: explicit JSON outcomes', code: 'order = current_customer.orders.build(order_params)\nif order.save\n  render json: { id: order.id }, status: :created\nelse\n  render json: { errors: order.errors.to_hash },\n    status: :unprocessable_entity\nend'},
      {title: 'Request-test fragment after test authentication', code: 'post "/api/orders", params: { order: { shipping_address_id: nil } }, as: :json\nassert_response :unprocessable_entity\nassert response.parsed_body.key?("errors")'}
    ],
    scenario: {title: 'Unexpected token < while parsing JSON', before: 'An expired session redirects to an HTML login page.', investigate: ['Read redirect history and content type.', 'Compare valid and expired credentials.', 'Return a documented JSON 401 from the API authentication boundary.'], after: 'The client recognizes authentication failure and prompts for sign-in.'},
    verify: ['Test malformed JSON, missing params, invalid credentials and validation errors.', 'Ensure ownership and error messages are correct.', 'In Postman assert status, content type and fields; store local credentials in environment variables.'],
    tips: ['A bearer header does not implement a verifier.', 'Authorize nested address IDs as well as orders.', 'Keep a stable error shape instead of rescuing everything into 200.'],
    mistake: 'Checking only status or globally disabling authentication to make a request pass.',
    exercises: [['Accept versus Content-Type?', 'Desired response representation versus the format of the submitted body.'], ['What else should a create test assert?', 'Response schema, ownership, expected persistence and invalid-input behavior.']],
    interview: [['Why does an API return HTML?', 'A redirect, route mismatch, exception page or proxy can produce it.'], ['400 versus 422?', 'Malformed/structurally missing input commonly yields 400; accepted input failing validation commonly yields 422. Follow the documented contract.']],
    summary: 'Inspect the raw HTTP exchange and protect its intended behavior with integration tests.', sources: [['Rails API-only guide', 'https://guides.rubyonrails.org/v8.0/api_app.html'], testing]
  });
  chapter('rails_practical_auth_debug', {
    version: 'Rails 7.2/8.x; implementation depends on the application.', prerequisites: 'A session/token flow; Customer has_many :orders.',
    what: 'Authentication establishes identity. Authorization decides what that identity may do. Cookies and tokens do not automatically enforce resource permissions.',
    why: 'Login can fail behind a proxy or across origins. A valid login can still expose another customer’s order through an unsafe lookup.',
    when: 'Use this workflow for login loops, lost sessions, token expiry and cross-account access.',
    how: 'Inspect credential verification, identity persistence, identity restoration and permission checks separately. Cookie domain/path, Secure/SameSite attributes, secret consistency and proxy HTTPS configuration affect session behavior.',
    steps: ['Identify cookie or token authentication.', 'Confirm verification without logging secrets.', 'Inspect credentials on the next request.', 'Check expiry and identity restoration.', 'Test the resource policy independently.'],
    examples: [
      {title: 'Before and after: lookup scope', code: '# Before\norder = Order.find(params[:id])\n# After\norder = current_customer.orders.find(params[:id])'},
      {title: 'API boundary fragment', code: 'def require_api_customer\n  return if current_customer\n  render json: { error: "unauthenticated" }, status: :unauthorized\nend', result: 'Register as a before_action. current_customer must securely restore/verify identity.'}
    ],
    scenario: {title: 'Login loops after deployment', before: 'The password is accepted, but the next request is anonymous.', investigate: ['Inspect Set-Cookie and the next Cookie header.', 'Check Secure, SameSite, domain and path.', 'Verify consistent secrets across instances.', 'Compare proxy/HTTPS settings with the deployed topology.'], after: 'Identity survives the next request under appropriate cookie settings; authorization remains a separate test.'},
    verify: ['Test login, logout, expiry and invalid credentials.', 'Attempt another customer’s ID.', 'Test the real deployment origins and HTTPS path.'],
    tips: ['Keep CSRF protection for cookie-authenticated browser writes.', 'CORS is not authentication.', 'Scope nested resource IDs too; API-only cookie auth needs explicit middleware configuration.'],
    mistake: 'Treating login as permission to access every record or disabling CSRF as a general debugging fix.',
    exercises: [['Where does a login-loop investigation begin?', 'Separate verification from restoration and inspect the next request’s credentials.'], ['How do you prevent an order IDOR?', 'Scope lookup through the authenticated customer or an explicit equivalent policy.']],
    interview: [['401 versus 403?', 'Missing/invalid authentication versus denied permission. A contract can intentionally use 404 to conceal resource existence.'], ['Does CORS prevent curl access?', 'No. It is a browser policy, not an API identity check.']],
    summary: 'Trace identity restoration and authorization independently, preserving secure scopes while debugging.', sources: [['Rails security', 'https://guides.rubyonrails.org/v8.0/security.html'], ['API middleware', 'https://guides.rubyonrails.org/v8.0/api_app.html']]
  });
  chapter('rails_practical_job_debug', {
    version: 'Rails 7.2/8.x; adapter-specific inspection varies.', prerequisites: 'Active Job, a durable queue and a worker.',
    what: 'A job can fail at enqueue, waiting, deserialization, execution or after an external effect succeeded.',
    why: 'HTTP success does not prove asynchronous completion. Blind retries can repeat emails or payments.',
    when: 'Investigate stuck queues, missing records, repeated execution and worker-only failures.',
    how: 'Job IDs connect enqueue and execution. Queue subscriptions determine consumption. Passing an ID allows an explicit missing-record policy inside perform; serialized models can fail during deserialization instead.',
    steps: ['Find job and business operation IDs.', 'Confirm enqueue and adapter.', 'Check worker health and queue subscriptions.', 'Read exception and retry history.', 'Reproduce in the worker environment.', 'Check prior side effects before retrying.'],
    examples: [
      {title: 'app/jobs/refresh_order_job.rb', code: 'class RefreshOrderJob < ApplicationJob\n  queue_as :maintenance\n\n  def perform(order_id)\n    Rails.logger.info({ event: "refresh_order", job_id: job_id, order_id: order_id }.to_json)\n    order = Order.find_by(id: order_id)\n    return unless order # This task permits deleted orders.\n    order.touch\n  end\nend'},
      {title: 'Inspect enqueue routing locally', code: 'job = RefreshOrderJob.perform_later(order.id)\nputs job.job_id\nputs job.queue_name'}
    ],
    scenario: {title: 'Jobs stop after a queue rename', before: 'Jobs enqueue to maintenance while workers listen only to default.', investigate: ['Compare job queue_name with worker subscriptions.', 'Confirm the worker is alive but not consuming maintenance.', 'Update queue configuration through deployment.', 'Watch oldest-job age and completed work.'], after: 'The right workers consume the queue and queue-age alerts detect future mismatches.'},
    verify: ['Test the missing-record policy.', 'Check adapter settings in each environment.', 'Test enqueue/execution and verify deployed worker health separately.'],
    tips: ['Deleted records can be expected for cleanup but critical for billing.', 'Classify transient versus permanent failures.', 'Keep bounded timeouts and retries; avoid swallowing exceptions into false success.'],
    mistake: 'Using perform_now successfully and assuming serialization, routing and worker configuration are correct.',
    exercises: [['Why does perform_now miss some failures?', 'It bypasses enqueue, serialization, queue wait and the separate worker.'], ['What do you check before retrying an email?', 'Whether the provider accepted a previous attempt and what duplicate-prevention mechanism exists.']],
    interview: [['Healthy workers but growing queue?', 'Wrong subscriptions, paused queues or insufficient consumption capacity are possibilities.'], ['Why log a business operation ID?', 'Several executions can represent the same logical operation across retries or replacements.']],
    summary: 'Follow the job lifecycle and decide retries using evidence about business effects.', sources: [['Rails Active Job', 'https://guides.rubyonrails.org/v8.0/active_job_basics.html'], ['Solid Queue', 'https://github.com/rails/solid_queue']]
  });
  chapter('rails_practical_incidents', {
    version: 'Rails 7.2/8.x across deployment platforms.', prerequisites: 'Metrics, request correlation and deployment/rollback procedures.',
    what: 'An incident is a user-impacting failure. Root cause analysis reconstructs the causal conditions and identifies ways to prevent recurrence or reduce impact.',
    why: 'A restart may restore service without removing the cause. Evidence and a timeline turn a temporary recovery into durable improvements.',
    when: 'Use this process for elevated errors, connection exhaustion, memory restarts, dependency outages and release regressions.',
    how: 'Separate mitigation from explanation. A reversible rollback may reduce impact before the cause is certain. Correlate changes and measurements, then reproduce to establish causality.',
    steps: ['Define impact, scope and start time.', 'Check releases, infrastructure and dependencies.', 'Preserve representative request IDs and errors.', 'Choose a reversible evidence-based mitigation.', 'Reproduce the chain in staging.', 'Assign prevention, detection and recovery follow-ups.'],
    examples: [
      {title: 'Incident notebook', lang: 'text', code: 'Impact: checkout failures\nStarted: timestamp with timezone\nRelease: exact commit/image\nEvidence: request IDs and connection waits\nHypothesis: total worker pools exceed DB budget\nMitigation: restore previous concurrency\nVerification: errors and queue age recover\nFollow-up: connection budget and load scenario'},
      {title: 'Count all potential database clients', lang: 'text', code: '4 web processes × pool 5 = up to 20 connections\n2 job processes × pool 5 = up to 10 connections\nAdd consoles, migrations, monitoring and headroom.'}
    ],
    scenario: {title: 'Higher concurrency causes timeouts', before: 'A deployment doubles workers without changing database capacity.', investigate: ['Correlate timeout onset with the release.', 'Inspect application pool waits and database connections.', 'Restore previous concurrency if supported by evidence.', 'Reproduce with the same web/job mix in staging.'], after: 'Service stabilizes and capacity planning includes every process type.'},
    verify: ['Confirm user-visible recovery.', 'Check errors, latency and backlog drain.', 'Ensure the new check detects the original failure mode.'],
    tips: ['Record exact releases and timezone-aware timestamps.', 'Plan backward-compatible schema changes; rollback code may require removed columns.', 'Describe system conditions rather than blaming people.'],
    mistake: 'Declaring success after a restart without checking whether the workload recreates the failure.',
    exercises: [['Suggest three follow-ups for connection exhaustion.', 'Validate connection demand, exercise representative concurrency and alert on sustained waits.'], ['When might rollback be unsafe?', 'When schema or data changes are incompatible with the previous application version.']],
    interview: [['Mitigation versus fix?', 'Mitigation reduces immediate impact; a fix removes or controls the causal condition.'], ['What makes a review actionable?', 'A factual timeline, evidence-backed causes and concrete prevention/detection/recovery changes.']],
    summary: 'Restore behavior, preserve evidence and verify the cause. Improve detection and recovery alongside code.', sources: [['Rails deployment tuning', 'https://guides.rubyonrails.org/tuning_performance_for_deployment.html'], ['Rails configuration', 'https://guides.rubyonrails.org/v8.0/configuring.html']]
  });
})();
