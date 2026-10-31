(function () {
  'use strict';
  const JT = window.JT;
  function add(id, data) { JT.gemLesson(id, { ...data, steps: data.steps || ['Check gem requirements against your exact Ruby/Rails versions.', 'Add the dependency in the stated Gemfile group and install.', 'Apply the fragment in the stated file and restart if needed.', 'Exercise success and failure paths before deployment.'], summary: data.what, interview: data.interview || [['What problem does this gem solve?', data.what], ['What production tradeoff matters?', data.resources[0]]], sources: [['Official documentation', data.source]] }); }
  add('devise', {
    what: 'Devise provides authentication modules using Warden, including password login and optional account workflows.', why: 'Use it for a configurable authentication system. Rails 8’s authentication generator is another starting point; avoid competing login systems.',
    install: 'bundle add devise\nbin/rails generate devise:install\nbin/rails generate devise User\nbin/rails db:migrate', file: 'An authenticated orders controller',
    code: 'class OrdersController < ApplicationController\n  before_action :authenticate_user!\n  def index\n    @orders = current_user.orders.order(id: :desc).limit(50)\n  end\nend',
    web: 'Use sessions, CSRF protection and secure cookies. Configure mailer delivery/host for reset or confirmation modules you enable.',
    api: 'Decide between session authentication and a separate token architecture. Review API-only middleware and JSON failure responses. Returning JSON does not make Devise issue JWTs.',
    resources: ['Password verification consumes CPU; account/session data lives in configured persistence.', 'Email workflows need mail infrastructure and consistent secrets across instances.'],
    debug: ['Check selected modules and generated routes.', 'Separate verification from session restoration.', 'Test API 401 behavior instead of browser redirects.'], mistake: 'Confusing authentication with permission to access every record.',
    exercise: 'Protect an order page from cross-user access.', answer: 'Authenticate, then scope through current_user.orders or a tested permission policy.', source: 'https://github.com/heartcombo/devise'
  });
  add('bcrypt', {
    what: 'bcrypt hashes passwords with a salted, deliberately expensive algorithm. It does not encrypt recoverable passwords.', why: 'Use it through has_secure_password or an authentication library when that password design fits.',
    install: 'bundle add bcrypt\n# Add password_digest:string to users before using the model.', file: 'User model and local console',
    code: 'class User < ApplicationRecord\n  has_secure_password\nend\n\nuser = User.create!(email: "learner@example.test", password: "long-local-example-password")\np !!user.authenticate("long-local-example-password")', result: 'true for the correct password.',
    web: 'A session controller verifies the password and establishes identity; secure cookies and CSRF remain necessary.',
    api: 'Password verification can precede an API credential exchange. Never expose password digests in JSON.',
    resources: ['Hashing intentionally consumes CPU; benchmark cost settings under login traffic.', 'bcrypt inputs have a 72-byte limit; use framework validation and an explicit policy.'],
    debug: ['Verify password_digest exists.', 'Inspect length/confirmation validation.', 'Never log the submitted password.'], mistake: 'Using a fast checksum alone for password storage.',
    exercise: 'Test correct and incorrect passwords.', answer: 'Assert authenticate returns the user for a valid password and false otherwise; keep hashes out of responses.', source: 'https://github.com/bcrypt-ruby/bcrypt-ruby'
  });
  add('pundit', {
    what: 'Pundit expresses authorization in ordinary policy classes and policy scopes.', why: 'Use it when permissions should be explicit and independently testable.',
    install: 'bundle add pundit\nbin/rails generate pundit:install', file: 'Controller integration and an OrderPolicy',
    code: '# ApplicationController:\ninclude Pundit::Authorization\n\nclass OrderPolicy < ApplicationPolicy\n  def show?\n    user != nil && record.user_id == user.id\n  end\nend\n\n# Authenticated action:\n# @order = current_user.orders.find(params[:id])\n# authorize @order',
    web: 'Authorize before rendering. Hiding an unauthorized button improves usability but does not enforce permission.',
    api: 'Apply the same policies and a documented denial response. Scope list endpoints as well as individual records.',
    resources: ['Policies may query associations; inspect hidden query costs.', 'No separate policy service is required, but rules need tests.'],
    debug: ['Verify user and selected policy.', 'Test owner/non-owner/anonymous.', 'Check collection scopes and writes.'], mistake: 'Authorizing show but forgetting update, destroy or index scope.',
    exercise: 'Add owner-only update permission.', answer: 'Implement update?, call authorize for the write, and verify non-owner HTTP requests cannot update.', source: 'https://github.com/varvet/pundit'
  });
  add('jwt', {
    what: 'jwt encodes and verifies JSON Web Tokens. Signed payloads have integrity protection, not secret encryption.', why: 'Use it when the authentication architecture needs signed claims; also design expiry, issuer, audience, key rotation and revocation.',
    install: 'bundle add jwt\n# Supply a strong server-side JWT_SECRET through secret management.', file: 'A scoped HS256 verification example',
    code: 'require "jwt"\nsecret = ENV.fetch("JWT_SECRET")\nclaims = { sub: "42", iss: "shopdesk", aud: "orders-api", exp: Time.now.to_i + 300 }\ntoken = JWT.encode(claims, secret, "HS256")\npayload, _header = JWT.decode(token, secret, true, {\n  algorithm: "HS256", verify_expiration: true,\n  required_claims: ["exp", "iss", "aud", "sub"],\n  iss: "shopdesk", verify_iss: true,\n  aud: "orders-api", verify_aud: true\n})',
    web: 'Cookie sessions may be simpler for conventional Rails pages. Browser token storage needs deliberate XSS/CSRF decisions.',
    api: 'Verify bearer credentials before trusting sub. Load identity, authorize resources and handle expiry/decode errors as authentication failures.',
    resources: ['Verification uses CPU; signing keys need secure distribution and rotation.', 'Stateless verification does not itself implement immediate revocation/logout.'],
    debug: ['Check key and fixed algorithm.', 'Check audience, issuer and expiry.', 'Do not log full tokens.'], mistake: 'Disabling verification and trusting a decoded user ID.',
    exercise: 'Reject expired and wrong-audience tokens.', answer: 'Keep signature/claim checks enabled and test each failure separately.', source: 'https://github.com/jwt/ruby-jwt'
  });
  add('pg', {
    what: 'pg is the Ruby PostgreSQL client used by the Rails PostgreSQL adapter.', why: 'Use it for PostgreSQL persistence. The gem does not automatically optimize your queries.',
    install: 'bundle add pg\n# New app alternative: rails new shopdesk --database=postgresql', file: 'config/database.yml fragment', lang: 'text',
    code: 'default: &default\n  adapter: postgresql\n  encoding: unicode\n  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>\nproduction:\n  <<: *default\n  url: <%= ENV.fetch("DATABASE_URL") %>',
    web: 'Use scoped Active Record, migrations and indexes; budget connections across all processes.',
    api: 'Bound queries and JSON output; do not expose raw database errors or credentials.',
    resources: ['Requires a PostgreSQL server, storage and connection capacity.', 'Native platform/client libraries and TLS configuration matter.'],
    debug: ['Separate connectivity from SQL latency.', 'Check permissions and URLs without printing secrets.', 'Inspect web and job connection demand.'], mistake: 'Increasing all pools beyond database capacity.',
    exercise: 'Four web processes plus two workers each have pool five. What is the demand?', answer: 'Up to 30 configured connections, plus consoles, migrations and headroom.', source: 'https://github.com/ged/ruby-pg'
  });
  add('kaminari', {
    what: 'Kaminari adds pagination scopes and optional view helpers.', why: 'Use bounded pages for lists; deep offset work and total counts still need measurement.',
    install: 'bundle add kaminari', file: 'Controller and view fragments',
    code: '@orders = current_user.orders.order(id: :desc).page(params[:page]).per(25)\n# ERB: <%= paginate @orders %>\n# API alternative:\n# render json: { orders: @orders.as_json(only: [:id]), next_page: @orders.next_page }',
    web: 'Render links and preserve filters; use deterministic ordering.',
    api: 'Document page limits and metadata. Consider keyset cursors for deep/changing data.',
    resources: ['LIMIT/OFFSET bounds returned rows but deep offsets can remain costly.', 'Total-page metadata may issue a COUNT query.'],
    debug: ['Inspect SQL and ordering.', 'Verify filter persistence.', 'Measure count and deep pages.'], mistake: 'Assuming a small page size makes a huge offset cheap.',
    exercise: 'Prevent unlimited page sizes.', answer: 'Use fixed size or validate/clamp a documented maximum.', source: 'https://github.com/kaminari/kaminari'
  });
  add('sidekiq', {
    what: 'Sidekiq executes jobs with concurrent workers and a supported Redis-compatible backend for the chosen release.', why: 'Use it for deferred work when its infrastructure model fits; compare separately with Solid Queue.',
    install: 'bundle add sidekiq\n# Configure the supported backend and REDIS_URL.\nbundle exec sidekiq', file: 'Active Job setup',
    code: '# production environment:\nconfig.active_job.queue_adapter = :sidekiq\n\nclass ExportJob < ApplicationJob\n  queue_as :default\n  def perform(export_id)\n    Export.find(export_id).touch\n    # Replace with bounded, retry-safe export work.\n  end\nend\n# After committed creation: ExportJob.perform_later(export.id)',
    web: 'Return a status page while a worker performs an export.',
    api: 'Use 202 plus an authorized status resource for asynchronous processing, not a false completion claim.',
    resources: ['Needs backend storage and running workers; concurrency uses connections/memory.', 'Retries may repeat execution; side effects need idempotency.'],
    debug: ['Check backend and queue routing.', 'Compare queue age with duration.', 'Inspect prior side effects before retrying.'], mistake: 'Passing model objects to native perform_async instead of JSON-safe identifiers.',
    exercise: 'Explain a payment retry after a crash.', answer: 'Check whether the provider accepted the original operation and use its idempotency contract.', source: 'https://github.com/sidekiq/sidekiq'
  });
  add('solid_queue', {
    what: 'Solid Queue is a database-backed Active Job backend generated in new Rails 8 apps.', why: 'Use it when database-backed queuing fits; an upgrade does not require replacing a healthy backend.',
    install: '# Skip setup if already generated.\nbundle add solid_queue\nbin/rails solid_queue:install\nbin/rails db:prepare\nbin/jobs', file: 'Configuration after installing schemas',
    code: 'config.active_job.queue_adapter = :solid_queue\n# Application code keeps Active Job:\n# ExportJob.perform_later(export.id)',
    web: 'Expose a progress/status page and explicit completion/failure.',
    api: 'Keep status resources authenticated and scoped; a job ID is not authorization.',
    resources: ['Requires adapter tables and managed workers/supervisor.', 'Consumes database disk, connections and I/O.'],
    debug: ['Verify database/schema roles.', 'Check bin/jobs and queue subscriptions.', 'Monitor backlog/storage growth.'], mistake: 'Setting the adapter without creating tables or running workers.',
    exercise: 'Avoid stranding jobs during backend migration.', answer: 'Plan old-queue drain, scheduled jobs, payload compatibility and cutover.', source: 'https://github.com/rails/solid_queue'
  });
  add('redis', {
    what: 'redis is a Ruby client; a Redis server is a separate service.', why: 'Use it for supported Redis operations or adapters, with explicit cache/queue/consistency requirements.',
    install: 'bundle add redis\n# Provision a supported Redis service; configure REDIS_URL.', file: 'A small expiring-value example',
    code: 'require "redis"\nclient = Redis.new(url: ENV.fetch("REDIS_URL"))\nbegin\n  client.set("shopdesk:demo:status", "ready", ex: 60)\n  puts client.get("shopdesk:demo:status")\nensure\n  client.close\nend',
    web: 'Prefer configured Rails.cache for normal caching rather than ad hoc infrastructure.',
    api: 'Shared throttles/caches need correct key dimensions and a failure policy.',
    resources: ['Server memory, eviction and persistence settings affect behavior.', 'Concurrent deployments need appropriate connection lifecycle/pooling.'],
    debug: ['Inspect connectivity and timeout behavior.', 'Check key namespace and TTL.', 'Check eviction/failure assumptions.'], mistake: 'Treating an expiring cache key as durable business storage or a complete distributed lock.',
    exercise: 'Why could cached API data cross tenants?', answer: 'The key may omit tenant identity; define who can safely share a value.', source: 'https://github.com/redis/redis-rb'
  });
  add('solid_cache', {
    what: 'Solid Cache implements Rails caching with database storage.', why: 'Use it when database-backed caching fits capacity and infrastructure; it is not authoritative account/financial storage.',
    install: '# Skip if already generated/configured.\nbundle add solid_cache\nbin/rails solid_cache:install\nbin/rails db:prepare', file: 'Configuration and application fragment',
    code: 'config.cache_store = :solid_cache_store\n# In application code:\n# Rails.cache.fetch(["product-count-v1", account.id], expires_in: 5.minutes) do\n#   account.products.count\n# end',
    web: 'Supports fragment/low-level caches with explicit freshness and locale/account dimensions.',
    api: 'Use tenant-safe keys and a documented stale-data policy.',
    resources: ['Database disk, connections and expiry/eviction work remain costs.', 'Separate cache workload where isolation is needed.'],
    debug: ['Confirm the active store.', 'Test hit, miss and invalidation.', 'Inspect DB/storage load.'], mistake: 'Assuming a Rails upgrade migrates entries from an old cache automatically.',
    exercise: 'Choose an account product-count key.', answer: 'Include account and key version, then choose TTL/invalidation for acceptable staleness.', source: 'https://github.com/rails/solid_cache'
  });
  add('rack_attack', {
    what: 'Rack::Attack is Rack middleware for request blocking and throttling.', why: 'Use it for rate policies and abusive load; it complements authentication.',
    install: 'bundle add rack-attack\n# Ensure middleware is installed once for your integration.', file: 'config/initializers/rack_attack.rb',
    code: 'Rack::Attack.throttle("login/ip", limit: 10, period: 60) do |request|\n  request.ip if request.path == "/session" && request.post?\nend',
    web: 'Account for shared networks and show meaningful retry messages.',
    api: 'Publish a 429/retry contract; choose identity, tenant, route or IP limits intentionally.',
    resources: ['Multi-process global limits need an appropriate shared counter store.', 'Client-IP interpretation depends on trusted-proxy configuration.'],
    debug: ['Check real route/method.', 'Inspect store and middleware.', 'Test threshold and reset behavior.'], mistake: 'Trusting arbitrary client-IP headers.',
    exercise: 'Why do two servers enforce inconsistent limits?', answer: 'They may use independent counters; verify shared storage and discriminator.', source: 'https://github.com/rack/rack-attack'
  });
  add('rack_cors', {
    what: 'Rack CORS implements Cross-Origin Resource Sharing middleware.', why: 'Use it for an intended browser client on another origin; same-origin forms usually need no CORS.',
    install: 'bundle add rack-cors', file: 'config/initializers/cors.rb',
    code: 'Rails.application.config.middleware.insert_before 0, Rack::Cors do\n  allow do\n    origins "https://frontend.example.test"\n    resource "/api/*", headers: :any, methods: [:get, :post, :options]\n  end\nend',
    web: 'A Rails-rendered same-origin site does not need wildcard origins for forms.',
    api: 'Allow specific origins/methods. This example does not enable credentialed cookies; design them with explicit origins and CSRF protection.',
    resources: ['Browser preflights can add OPTIONS traffic.', 'CORS does not authenticate callers or restrict curl.'],
    debug: ['Inspect Origin/preflight.', 'Check actual response headers.', 'Check proxy and middleware ordering.'], mistake: 'Using wildcard origins as a universal browser-error fix.',
    exercise: 'curl succeeds but fetch fails. Why?', answer: 'The browser enforces CORS. Inspect preflight/origin headers and authentication separately.', source: 'https://github.com/cyu/rack-cors'
  });
  add('blueprinter', {
    what: 'Blueprinter defines explicit object-to-JSON representations.', why: 'Use it for consistent reviewed response fields; small APIs can also select as_json fields explicitly.',
    install: 'bundle add blueprinter', file: 'app/blueprints/order_blueprint.rb and API fragment',
    code: 'class OrderBlueprint < Blueprinter::Base\n  identifier :id\n  fields :status, :total_cents\nend\n# API action:\n# orders = current_user.orders.order(id: :desc).limit(25)\n# render json: OrderBlueprint.render_as_hash(orders)',
    web: 'Useful for JSON feeding a widget; it does not replace ERB rendering.',
    api: 'Whitelist fields, test shape and preload associations the blueprint reads.',
    resources: ['Serialization uses CPU/memory proportional to fields and records.', 'Association fields can cause hidden N+1 queries.'],
    debug: ['Inspect raw body and content type.', 'Check selected fields/views.', 'Measure serialization SQL too.'], mistake: 'Assuming a serializer authorizes records or prevents extra queries.',
    exercise: 'Exclude internal_note from a public response.', answer: 'Do not declare it publicly; assert its absence in a response test.', source: 'https://github.com/procore-oss/blueprinter'
  });
  add('faraday', {
    what: 'Faraday is an HTTP client with adapters and middleware.', why: 'Use it to centralize outgoing headers, connection settings and integration behavior.',
    install: 'bundle add faraday', file: 'A configured connection; request is not executed here',
    code: 'connection = Faraday.new(url: "https://inventory.example.test") do |client|\n  client.options.open_timeout = 2\n  client.options.timeout = 5\n  client.request :json\n  client.response :json\n  client.adapter Faraday.default_adapter\nend\n# response = connection.get("/availability", product_id: 42)\n# Check status and schema before using response.body.',
    web: 'Optional integrations should not block a page indefinitely; consider cached or deferred results.',
    api: 'Translate downstream failures into your documented API contract without exposing secrets.',
    resources: ['Consumes sockets and elapsed dependency wait; timeouts bound failure paths.', 'Retries add traffic and may duplicate effects.'],
    debug: ['Separate connect/read failures.', 'Inspect sanitized status/correlation.', 'Check body schema as well as status.'], mistake: 'Blindly retrying payment writes without idempotency.',
    exercise: 'What should happen when stock lookup times out?', answer: 'Choose explicit unavailability or a product-safe fallback; never invent available stock.', source: 'https://github.com/lostisland/faraday'
  });
  add('rspec', {
    what: 'rspec-rails integrates RSpec examples and matchers with Rails.', why: 'Use it when the project chooses RSpec style; Rails Minitest is also valid.',
    install: '# Add gem "rspec-rails" in development/test groups.\nbundle install\nbin/rails generate rspec:install\nbundle exec rspec', file: 'spec/requests/health_spec.rb; assumes GET /health',
    code: 'require "rails_helper"\nRSpec.describe "Health", type: :request do\n  it "returns the healthy contract" do\n    get "/health", headers: { "Accept" => "application/json" }\n    expect(response).to have_http_status(:ok)\n    expect(JSON.parse(response.body)).to include("status" => "ok")\n  end\nend',
    web: 'Use requests for routing/auth and system specs for meaningful browser workflows.',
    api: 'Test schema, authorization, errors and persistence, not only status 200.',
    resources: ['Test DB setup and external stubs affect isolation/speed.', 'System specs need a driver; request specs need no browser.'],
    debug: ['Read the first failed expectation.', 'Inspect fixture state and body.', 'Reproduce order failures using the seed.'], mistake: 'Mocking away the behavior the test claims to verify.',
    exercise: 'Add an unauthenticated order-list test.', answer: 'Assert documented rejection and no leaked order data.', source: 'https://github.com/rspec/rspec-rails'
  });
  add('factory_bot', {
    what: 'factory_bot_rails integrates reusable test-record factories.', why: 'Use it for minimal realistic setup and intentional traits.',
    install: '# Add gem "factory_bot_rails" in development/test groups.\nbundle install', file: 'spec/factories/users.rb',
    code: 'FactoryBot.define do\n  factory :user do\n    sequence(:email) { |n| "learner#{n}@example.test" }\n    password { "long-test-only-password" }\n  end\nend\n# Tests:\n# FactoryBot.build(:user)  # unsaved\n# FactoryBot.create(:user) # persisted in test DB',
    web: 'Create only the data required for a page/policy workflow.',
    api: 'Prepare owner/non-owner identities and invalid cases deliberately.',
    resources: ['create writes to the DB and triggers callbacks; deep factories can become expensive.', 'build_stubbed is not equivalent to testing real persistence.'],
    debug: ['Compare build/create.', 'Inspect implicit associations.', 'Prevent test callbacks reaching live providers.'], mistake: 'Creating a large object graph for a one-field unit test.',
    exercise: 'When is build enough?', answer: 'For behavior requiring no saved row; use persistence when that behavior is part of the test.', source: 'https://github.com/thoughtbot/factory_bot_rails'
  });
  add('capybara', {
    what: 'Capybara expresses acceptance interactions through rendered pages.', why: 'Use it to verify important user journeys, including JavaScript when configured.',
    install: '# Often included for Rails system tests.\n# If absent, add capybara in test group and configure a compatible driver.\nbundle install\nbin/rails test:system', file: 'System-test fragment with an existing login form',
    code: 'visit "/session/new"\nfill_in "Email", with: "learner@example.test"\nfill_in "Password", with: "long-test-only-password"\nclick_button "Sign in"\nassert_text "Your orders"',
    web: 'A JavaScript-capable driver is required to exercise actual Turbo/React behavior.',
    api: 'Use request tests for API contracts; browser tests cover the client consuming them.',
    resources: ['Real browsers cost more CPU/memory than request tests.', 'Use waiting assertions rather than arbitrary sleeps.'],
    debug: ['Inspect screenshot and URL.', 'Use meaningful accessible selectors.', 'Inspect browser/server errors.'], mistake: 'Assuming a non-JS driver tested JavaScript behavior.',
    exercise: 'Test invalid login feedback.', answer: 'Submit bad credentials and assert visible rejection and no protected content.', source: 'https://github.com/teamcapybara/capybara'
  });
  add('bullet', {
    what: 'Bullet detects potential N+1 patterns, unused eager loading and counter-cache opportunities on exercised paths.', why: 'Use it in development or controlled tests to reveal repeated association work.',
    install: '# Add gem "bullet" in development group.\nbundle install', file: 'config/environments/development.rb',
    code: 'config.after_initialize do\n  Bullet.enable = true\n  Bullet.rails_logger = true\nend',
    web: 'Exercise real templates/partials with realistic data.',
    api: 'Exercise serializers: JSON association reads can hide N+1 work.',
    resources: ['Adds instrumentation overhead and observes only exercised paths.', 'Diagnostic query/account data must not be exposed publicly.'],
    debug: ['Reproduce the warned path.', 'Inspect association and source.', 'Choose bounded preloading and remeasure.'], mistake: 'Fixing warnings by loading every association everywhere.',
    exercise: 'A serializer reads product for each line item. What next?', answer: 'Measure serialization and preload its required bounded graph.', source: 'https://github.com/flyerhzm/bullet'
  });
  add('mini_profiler', {
    what: 'rack-mini-profiler adds request-oriented performance diagnostics to Rack apps.', why: 'Use it to locate measurable cost before speculative rewrites.',
    install: '# Add gem "rack-mini-profiler" in development group.\nbundle install\n# Restart; review integration instructions for your version.', file: 'A custom timing block',
    code: 'Rack::MiniProfiler.step("Build report") do\n  ReportBuilder.new(customer_id: 42).call\nend',
    web: 'Include the actual template, not a simplified route omitting expensive rendering.',
    api: 'Include serialization and use the profiler’s supported access mechanisms; API requests do not necessarily display a browser badge.',
    resources: ['Instrumentation affects cost; also compare unprofiled results.', 'Production profiler access needs documented authorization controls.'],
    debug: ['Match data/cache conditions.', 'Inspect self and child work.', 'Separate SQL, Ruby and network waits.'], mistake: 'Comparing profiled and unprofiled requests as equivalent benchmarks.',
    exercise: 'External HTTP dominates the trace. What next?', answer: 'Investigate integration timeouts/design before changing SQL indexes.', source: 'https://github.com/MiniProfiler/rack-mini-profiler'
  });
  add('brakeman', {
    what: 'Brakeman statically analyzes Rails source for potential security issues without executing the app.', why: 'Use it in review/CI alongside tests, dependency audit and human analysis.',
    install: '# Often generated already; otherwise add gem "brakeman", require: false in development.\nbundle install\nbundle exec brakeman', file: 'A safer SQL value binding',
    code: '# Do not interpolate request values into SQL strings.\n# Keep the authorization scope and bind the value:\ncurrent_user.orders.where(reference: params[:reference])',
    web: 'Review SQL construction, escaping and redirect findings in HTML flows.',
    api: 'JSON-only apps still have injection, authorization and mass-assignment risks.',
    resources: ['Runs in development/CI rather than instrumenting production requests.', 'Static analysis may miss bugs or report false positives; review context.'],
    debug: ['Read source/data flow.', 'Use controlled reproduction where useful.', 'Document narrow ignores instead of broad suppression.'], mistake: 'Treating a clean scan as proof of complete security.',
    exercise: 'What checks known vulnerable dependency versions?', answer: 'A maintained dependency-audit process; source analysis and dependency audits answer different questions.', source: 'https://brakemanscanner.org/docs/running/'
  });
})();
