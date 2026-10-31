(function () {
  'use strict';
  const chapter = window.JT.practicalChapter;
  const upgrade = ['Rails upgrade guide', 'https://guides.rubyonrails.org/upgrading_ruby_on_rails.html'];
  const rails8 = ['Rails 8.0 release notes', 'https://guides.rubyonrails.org/8_0_release_notes.html'];
  chapter('rails_practical_rails_releases', {
    version: 'Rails 7.0, 7.1, 7.2, 8.0 and 8.1; release baselines, not a latest-patch recommendation.', prerequisites: 'An existing Rails app and basic Bundler commands.',
    what: 'A major-version comparison is a map of changes across several minor releases. Rails 7.0 is not identical to Rails 7.2, and Rails 8.1 adds features beyond Rails 8.0.',
    why: 'Attributing every improvement to Rails 8 leads to unnecessary rewrites and incorrect upgrade assumptions. Know when a feature arrived and whether it is a framework API or a new-project default.',
    when: 'Use this map before planning an upgrade, adopting a tutorial or evaluating a dependency’s Rails support.',
    how: 'The installed gem version, Ruby interpreter and load_defaults setting are independent facts. An upgraded application can run a new Rails version while retaining older defaults until each change is verified.',
    comparison: {headers: ['Release', 'Selected changes', 'Minimum Ruby'], rows: [
      ['7.0', 'Import maps/Hotwire direction; Active Record encryption', '2.7'],
      ['7.1', 'Generated Dockerfile; composite primary keys; more async query APIs', '2.7'],
      ['7.2', 'YJIT enabled by default when supported; per-transaction callbacks', '3.1'],
      ['8.0', 'Authentication generator; Propshaft and Solid defaults; Kamal 2/Thruster', '3.2'],
      ['8.1', 'Job continuations; structured events; local CI; further deployment improvements', '3.2']
    ]},
    steps: ['Record ruby -v and bin/rails about.', 'Read Gemfile.lock and config.load_defaults.', 'Inventory adapters, plugins and custom framework patches.', 'Read every intervening minor-version upgrade section.', 'Choose exact compatible patch releases and test them.'],
    examples: [
      {title: 'Inspect the actual runtime', lang: 'text', code: 'ruby -v\nbundle exec rails --version\nbin/rails about\nbundle platform --ruby'},
      {title: 'A Rails 8 process can temporarily retain old defaults', code: '# Gemfile: resolved Rails version may be 8.0.x\n# config/application.rb, during a staged upgrade:\nconfig.load_defaults 7.2\n\n# Only after adopting and testing the new defaults:\n# config.load_defaults 8.0'}
    ],
    scenario: {title: 'An upgrade unexpectedly changes application behavior', before: 'The team updates Rails and load_defaults together, making regressions hard to isolate.', investigate: ['Compare installed version separately from defaults.', 'Review generated new_framework_defaults initializers.', 'Enable changes incrementally and test each behavior.'], after: 'Runtime upgrade and configuration adoption become observable steps instead of one unexplained jump.'},
    verify: ['Boot web and worker processes.', 'Run framework integration and asset builds.', 'Check supported dependency combinations; minimum Ruby does not prove Ruby 4 compatibility.'],
    tips: ['Use released versioned guides for exact behavior.', 'Check the maintenance policy before choosing a long-term target.', 'Historical comparisons do not imply older branches still receive fixes.'],
    mistake: 'Assuming every Rails 8 app has identical generated infrastructure, or that changing a Gemfile rewrites existing configuration.',
    exercises: [['Can Rails 8.0 run on Ruby 3.1?', 'No: its documented minimum is Ruby 3.2.'], ['What three version facts should an upgrade report contain?', 'The Ruby runtime, resolved Rails version and framework load_defaults baseline.']],
    interview: [['Why upgrade minor versions in order?', 'It exposes deprecations and smaller compatibility changes before the next release removes behavior.'], ['Does a new default replace existing configuration?', 'Not automatically. Existing settings and generated files must be reviewed and adopted deliberately.']],
    summary: 'Compare exact releases and separate runtime, defaults and generated files before making architecture decisions.', sources: [upgrade, ['Rails 7.0 notes', 'https://guides.rubyonrails.org/7_0_release_notes.html'], ['Rails 7.1 notes', 'https://guides.rubyonrails.org/7_1_release_notes.html'], ['Rails 7.2 notes', 'https://guides.rubyonrails.org/7_2_release_notes.html'], rails8, ['Rails 8.1 notes', 'https://guides.rubyonrails.org/8_1_release_notes.html']]
  });
  chapter('rails_practical_rails_auth', {
    version: 'Rails 7.x compared with the Rails 8.0 authentication generator.', prerequisites: 'Models, migrations, password hashing and session concepts.',
    what: 'Rails 8 adds a generator for a session-based authentication starting point, including password-reset support. It generates application code that your team owns.',
    why: 'Rails 7 applications commonly assembled authentication with a library or custom code. A generator can reduce initial wiring, but it does not decide every account or permission policy.',
    when: 'Evaluate it for a new Rails 8 application or a deliberate authentication redesign. Existing applications can retain a supported authentication library.',
    how: 'The generator creates models, controllers, views, routes and authentication helpers. Inspect the diff before migrating. Registration, MFA, authorization and product-specific account policies remain separate concerns.',
    steps: ['Start on a clean branch in a disposable Rails 8 app.', 'Generate authentication and inspect every new file.', 'Run migrations and configure mail delivery for password resets.', 'Create a local user and test sign-in/reset flows.', 'Add resource-level authorization tests.'],
    examples: [
      {title: 'Rails 8 terminal workflow', lang: 'text', code: 'bin/rails generate authentication\nbin/rails db:migrate\nbin/rails routes'},
      {title: 'Create a local test user in the Rails console', code: 'User.create!(email_address: "learner@example.test",\n  password: "a-long-local-practice-password",\n  password_confirmation: "a-long-local-practice-password")', result: 'Use the generated model’s actual fields. This is local setup, not a public registration implementation.'},
      {title: 'Authorization remains application code', code: '# Assumes your application adds User has_many :orders.\n# Generated authentication establishes Current.user.\n@order = Current.user.orders.find(params[:id])'}
    ],
    scenario: {title: 'An upgrade duplicates existing login routes', before: 'The generator is run directly in an app already using another authentication system.', investigate: ['Compare generated routes and user/session models with existing ones.', 'Choose whether to keep the current system or migrate intentionally.', 'Plan password/session compatibility and account recovery before cutover.'], after: 'One coherent authentication boundary exists instead of competing callbacks and sessions.'},
    verify: ['Test valid/invalid sign-in, logout and reset token behavior.', 'Verify email delivery and host configuration.', 'Attempt cross-account resource access.'],
    tips: ['Generated authentication is not automatic public signup.', 'Keep generated code under review like other application code.', 'Do not reset production passwords or discard sessions casually during migration.'],
    mistake: 'Assuming a generator provides a complete authorization policy, MFA or a drop-in migration from every authentication library.',
    exercises: [['Which file changes should you review after generation?', 'Routes, models, migrations, controllers, concerns, views and mail/reset configuration.'], ['What permission test remains essential?', 'A signed-in user cannot access another user’s order.']],
    interview: [['Generator versus authentication service?', 'The generator creates code in your application; it is not an external identity provider.'], ['Does Rails 8 force migration from Devise?', 'No. Evaluate support and requirements; the generator is an option, not a universal replacement.']],
    summary: 'Rails 8 offers a useful starting point. Own its generated code and design account/authorization policy explicitly.', sources: [rails8, ['Authentication generator security guide', 'https://guides.rubyonrails.org/v8.0/security.html#authentication']]
  });
  chapter('rails_practical_rails_deploy', {
    version: 'Rails 7.1/7.2 Docker generation; Rails 8.0 Kamal 2 and Thruster; Rails 8.1 refinements.', prerequisites: 'Containers, environment configuration and a disposable deployment target.',
    what: 'Deployment turns source into a running service. Rails 8’s generated path includes Kamal orchestration and a container setup using Thruster in front of Puma.',
    why: 'A generated deployment path reduces initial wiring, but production still needs secrets, data persistence, health checks, jobs and recovery procedures.',
    when: 'Use Kamal when its container/SSH deployment model fits your hosting environment. Managed platforms and existing deployment systems remain valid options.',
    how: 'Kamal builds and distributes images and manages containers on hosts. Thruster handles HTTP acceleration features; it is not the Rails application worker. Rails 8.1 adds registry-free deployment support, which is distinct from Rails 8.0’s baseline.',
    steps: ['Build the image with the application’s production asset process.', 'Inspect generated Dockerfile and config/deploy.yml.', 'Configure hosts, registry strategy and secret references.', 'Provide persistent database/upload storage and backups.', 'Deploy first to staging and exercise health, workers and rollback.'],
    examples: [
      {title: 'Minimal Kamal 2 configuration fragment', lang: 'text', code: 'service: shopdesk\nimage: registry-user/shopdesk\nservers:\n  web:\n    - 192.0.2.10\nregistry:\n  username: registry-user\n  password:\n    - KAMAL_REGISTRY_PASSWORD\nenv:\n  secret:\n    - RAILS_MASTER_KEY', result: '192.0.2.10 is a documentation address. Replace with a staging host and configure secrets through Kamal’s supported mechanism.'},
      {title: 'Deployment commands after complete staging configuration', lang: 'text', code: 'bin/kamal setup\n# Later releases:\nbin/kamal deploy', result: 'These commands change remote infrastructure. They are teaching commands, not executed by the learning hub.'}
    ],
    scenario: {title: 'The web app is healthy but receipts stop', before: 'Deployment starts web containers but omits background workers.', investigate: ['Check HTTP health separately from queue age.', 'Inspect process roles and worker commands.', 'Deploy the required job role with matching release/configuration.', 'Verify one complete order-to-receipt workflow.'], after: 'Deployment verification covers asynchronous behavior as well as the home page.'},
    verify: ['Boot an image from a clean build.', 'Check secrets, migrations, persistent files and backups.', 'Test graceful shutdown and recovery during an active job.'],
    tips: ['Kamal Proxy and Thruster have distinct responsibilities.', 'Container replacement must not discard persistent SQLite files or uploads.', 'A schema rollback path requires backward-compatible database changes.'],
    mistake: 'Treating successful container startup as proof that database, job, mail and storage dependencies work.',
    exercises: [['Name three things a web health check does not prove.', 'Job consumption, email delivery and backup recovery are examples.'], ['Why test shutdown with a running job?', 'A deploy can interrupt work; retries or continuations must preserve intended effects.']],
    interview: [['Is Thruster a replacement for Puma?', 'No. It sits in the HTTP serving path while Puma runs the Rails application.'], ['What does an image rollback fail to restore?', 'It does not automatically reverse incompatible schema/data changes or external side effects.']],
    summary: 'Use generated deployment tools as a starting point and verify the full application lifecycle, persistence and recovery.', sources: [['Kamal installation/configuration', 'https://kamal-deploy.org/docs/installation/'], ['Thruster', 'https://github.com/basecamp/thruster'], rails8, ['Rails 8.1 notes', 'https://guides.rubyonrails.org/8_1_release_notes.html']]
  });
  chapter('rails_practical_rails_assets', {
    version: 'Rails 7.x Sprockets-era defaults versus Rails 8.0 Propshaft default; Rails 8 parameter API.', prerequisites: 'Asset entry points, Gemfile and controller parameters.',
    what: 'Rails 8 changes new-app asset defaults and adds newer APIs. Existing applications need explicit configuration review rather than copying a new project wholesale.',
    why: 'Sprockets could perform processing that Propshaft deliberately leaves to build tools. An unreviewed switch can publish raw source instead of compiled CSS or JavaScript.',
    when: 'Use this chapter during asset migration or when adopting Rails 8 controller syntax while retaining older application defaults.',
    how: 'Propshaft publishes and fingerprints assets; external tools compile Sass/JSX as needed. Import maps remain a module-delivery choice. Rails 8 params.expect expresses an expected permitted parameter shape; Rails 7-compatible require/permit code remains useful for shared examples.',
    steps: ['Inventory Sprockets directives, Sass processing and manifests.', 'Map each transformation to an explicit build step.', 'Migrate layout includes and asset references deliberately.', 'Build production assets and compare URLs/content.', 'Adopt new controller APIs with invalid-shape tests.'],
    examples: [
      {title: 'Rails 7-compatible parameter handling', code: 'def product_params\n  params.require(:product).permit(:name, :price_cents)\nend'},
      {title: 'Rails 8 expected parameter shape', code: 'def product_params\n  params.expect(product: [:name, :price_cents])\nend'},
      {title: 'Asset pipeline inspection', lang: 'text', code: 'Gemfile                         # sprockets-rails or propshaft\napp/assets/config/manifest.js   # existing Sprockets setup, if used\napp/assets/stylesheets/         # source CSS/Sass\napp/assets/builds/              # compiled output\nconfig/importmap.rb             # only if import maps are chosen'}
    ],
    scenario: {title: 'Sass variables appear in a served stylesheet', before: 'The team removed Sprockets processing but did not add a Sass build.', investigate: ['Inspect the actual response body for the stylesheet.', 'Find the old implicit compiler dependency.', 'Add an explicit supported CSS build and publish its output.', 'Compare screenshots and generated URLs.'], after: 'The browser receives CSS, and compilation is visible in the build process.'},
    verify: ['Test production asset compilation from a clean checkout.', 'Test missing, scalar and nested controller inputs.', 'Check cache-busting digests and duplicate entry-point tags.'],
    tips: ['Upgrade the Rails framework separately from an optional pipeline migration.', 'Keep existing defaults until reviewed.', 'Treat script/style load order as a behavior to verify.'],
    mistake: 'Assuming Propshaft compiles Sass or JSX, or copying params.expect into a Rails 7 application.',
    exercises: [['How do you keep a lesson runnable on Rails 7 and 8?', 'Use the supported common require/permit API, or clearly label an expect example as Rails 8-only.'], ['Where do Sprockets directive dependencies go?', 'Into explicit source imports and build configuration appropriate to the chosen pipeline.']],
    interview: [['Does Propshaft require React?', 'No. Asset publication and UI-library selection are independent.'], ['Why test malformed parameter shapes?', 'Clients can submit a scalar where a nested object is expected; validation must fail predictably rather than cause an accidental server error.']],
    summary: 'Make previously implicit processing explicit, and label newer APIs by release.', sources: [['Propshaft migration guide', 'https://guides.rubyonrails.org/v8.0/asset_pipeline.html'], ['Rails 8 parameters API', 'https://api.rubyonrails.org/v8.0/classes/ActionController/Parameters.html#method-i-expect'], rails8]
  });
  chapter('rails_practical_rails_database', {
    version: 'Rails 7.1 composite keys; Rails 7.2 transaction callback APIs; Rails 8.0/8.1 changes.', prerequisites: 'Transactions, migrations and PostgreSQL or SQLite basics.',
    what: 'Database evolution includes model capabilities, transaction boundaries, adapter defaults and schema tooling. These are separate from choosing a database engine.',
    why: 'An upgrade can affect when jobs are enqueued or how a fresh schema is prepared. ShopDesk must preserve order/payment consistency through these changes.',
    when: 'Review database behavior when upgrading, changing adapters, adding multiple databases or linking jobs to committed records.',
    how: 'Rails 7.1 adds native composite primary key support. Rails 7.2 adds per-transaction callback facilities and automatic enqueue-after-transaction behavior subject to adapter/configuration. Rails 8.0 changes fresh db:migrate behavior to load schema before pending migrations. Rails 8.1 sorts schema.rb columns alphabetically.',
    steps: ['Record adapter and database versions.', 'Test transaction success and rollback paths.', 'Review job enqueue timing rather than assuming atomic handoff.', 'Prepare a new disposable database and compare with upgrading an existing one.', 'Review schema diffs for behavior versus formatting changes.'],
    examples: [
      {title: 'Rails 7.2+: an explicit per-transaction callback', code: 'Order.transaction do |transaction|\n  order = current_customer.orders.create!(status: "pending")\n  transaction.after_commit do\n    ReceiptJob.perform_later(order.id)\n  end\nend', result: 'The callback runs after successful commit. It does not by itself guarantee atomic delivery into an external queue.'},
      {title: 'Rails 7.1+: composite-key model example', code: 'class Inventory < ApplicationRecord\n  self.primary_key = [:warehouse_id, :product_id]\nend\n\nInventory.find([3, 42])', result: 'Requires a table and constraints designed for this composite identity.'},
      {title: 'Prepare and inspect a disposable environment', lang: 'text', code: 'bin/rails db:prepare\nbin/rails db:migrate:status', result: 'Confirm the selected environment/database before running schema tasks.'}
    ],
    scenario: {title: 'A worker cannot find a newly created order', before: 'A job is dispatched while its order transaction is still uncommitted.', investigate: ['Compare worker execution with transaction commit timing.', 'Check the actual Rails version, adapter and enqueue configuration.', 'Use an explicit commit boundary or a documented adapter feature.', 'Test rollback and enqueue failure independently.'], after: 'Workers see committed inputs; critical guaranteed handoff may additionally require an outbox or a suitable transactional adapter design.'},
    verify: ['Test fresh-schema preparation and existing-database migrations.', 'Confirm rollback does not send an unintended job.', 'Check connection budgets for web, jobs and additional database roles.'],
    tips: ['SQLite can support production workloads when topology and write concurrency fit; it is not a universal replacement for PostgreSQL.', 'Database-backed cache/queue roles still consume connections and I/O.', 'Alphabetical schema diffs do not necessarily mean columns were physically reordered.'],
    mistake: 'Using destructive reset tasks on a valuable database to imitate old migration behavior.',
    exercises: [['Does after_commit make an external queue enqueue atomic?', 'No. The commit can succeed and enqueue can fail afterward; a reliable handoff design must address that gap.'], ['Why compare a fresh database with an existing one?', 'Schema loading and historical migrations can take different paths. Both must produce a working schema.']],
    interview: [['What is transaction visibility?', 'Other transactions may not see uncommitted rows, so an early worker can observe missing input.'], ['Why separate cache/queue workloads?', 'Isolation can protect primary request workloads, but also adds capacity and configuration responsibilities.']],
    summary: 'Verify transaction timing and schema paths explicitly. New framework behavior does not eliminate database consistency design.', sources: [['Rails 7.1 notes', 'https://guides.rubyonrails.org/7_1_release_notes.html'], ['Rails 7.2 notes', 'https://guides.rubyonrails.org/7_2_release_notes.html'], rails8, ['Rails 8.1 notes', 'https://guides.rubyonrails.org/8_1_release_notes.html']]
  });
  chapter('rails_practical_rails_solid', {
    version: 'Rails 8.0 generated Solid adapters; Rails 8.1 job continuations.', prerequisites: 'Caching, Active Job, database roles and workers.',
    what: 'Solid Cache stores cache entries in a database. Solid Queue runs database-backed jobs. Solid Cable provides database-backed Action Cable messaging. They serve different interfaces.',
    why: 'They can reduce the need for separate infrastructure in a new app. The work still consumes storage, database capacity and worker processes.',
    when: 'Evaluate them for a new app or an intentional adapter migration. A healthy Redis/Sidekiq deployment need not be replaced merely because Rails was upgraded.',
    how: 'Application code can keep Rails.cache and Active Job interfaces while configuration selects implementations. Adapter installation includes schemas and environment wiring; setting one symbol alone is insufficient. Rails 8.1 continuations support resumable job steps, which still need safe business effects.',
    steps: ['Inventory current adapters and operational requirements.', 'Install/configure chosen gems using their versioned documentation.', 'Prepare their database schemas and connection roles.', 'Run the queue supervisor/worker and exercise end-to-end behavior.', 'Plan draining old jobs and handling old cache entries before cutover.'],
    examples: [
      {title: 'Environment configuration after proper installation', code: 'config.cache_store = :solid_cache_store\nconfig.active_job.queue_adapter = :solid_queue', result: 'Requires installed gems, database configuration and adapter tables. Keep generated configuration as the starting point.'},
      {title: 'Rails 8 generated worker entry point', lang: 'text', code: 'bin/jobs', result: 'Run as a managed process and verify configured queues are consumed.'},
      {title: 'Application interfaces can stay familiar', code: 'Rails.cache.fetch(["product-count-v1", account.id], expires_in: 5.minutes) do\n  account.products.count\nend\nReceiptJob.perform_later(order.id)'}
    ],
    scenario: {title: 'Adapter cutover strands old jobs', before: 'New releases enqueue to Solid Queue while old jobs remain in the previous backend.', investigate: ['Count pending/scheduled jobs in each backend.', 'Keep old workers running under a deliberate drain plan.', 'Prevent incompatible code changes while draining.', 'Verify new job processing and final old-queue state.'], after: 'The migration accounts for work already stored rather than only future jobs.'},
    verify: ['Test queue latency, retries and worker restarts.', 'Check cache hit/miss/failure behavior.', 'Observe primary database impact and adapter storage growth.'],
    tips: ['Choose dedicated database roles where appropriate.', 'Continuation checkpoints do not automatically make external side effects exactly-once.', 'Measure workload fit instead of declaring one backend universally faster.'],
    mistake: 'Assuming upgrading Rails automatically migrates Redis data, queued jobs or cache entries into database-backed adapters.',
    exercises: [['Which interface changes for a basic Active Job when changing adapters?', 'Often none in the job class, but configuration, schemas, workers and operational behavior change.'], ['What must be monitored besides job errors?', 'Oldest-job age, backlog, throughput, database load and storage growth.']],
    interview: [['Does database-backed mean process-free?', 'No. Jobs still need running consumers; adapter tables are not execution processes.'], ['Why keep a drain plan?', 'Jobs stored in an old backend do not magically appear in the new one.']],
    summary: 'Solid adapters are infrastructure choices behind familiar Rails interfaces. Migrate data and operations as deliberately as code.', sources: [['Solid Cache', 'https://github.com/rails/solid_cache'], ['Solid Queue', 'https://github.com/rails/solid_queue'], ['Solid Cable', 'https://github.com/rails/solid_cable'], ['Rails 8.1 continuations', 'https://guides.rubyonrails.org/8_1_release_notes.html']]
  });
  chapter('rails_practical_rails_upgrade', {
    version: 'Rails 7.0 → 7.1 → 7.2 → 8.0 → 8.1; adopt exact tested patches.', prerequisites: 'A clean branch, test suite, staging and backup/recovery procedure.',
    what: 'An upgrade is a controlled compatibility change across framework code, dependencies, defaults and generated configuration.',
    why: 'Removing warnings before crossing a version boundary makes failures easier to explain. Updating everything at once hides which layer introduced a regression.',
    when: 'Use this workflow for planned framework upgrades and maintenance work. Check branch support rather than assuming every historical minor remains maintained.',
    how: 'Resolve a compatible Rails version, run app:update and merge generated differences. Adopt new defaults gradually. Rails 8 removes older enum keyword syntax and other previously deprecated behavior; review release notes for the full removal list.',
    steps: ['Establish a passing baseline and record current runtime/defaults.', 'Upgrade to a tested patch in the next minor line.', 'Fix deprecation warnings and incompatible gems.', 'Run app:update and review each merge instead of overwriting custom configuration.', 'Verify defaults one at a time, then change load_defaults.', 'Run web, job, asset and migration checks in staging before rollout.'],
    examples: [
      {title: 'Enum syntax across the boundary', code: '# Older form, removed in Rails 8:\n# enum status: { pending: 0, paid: 1 }\n\n# Supported positional form:\nenum :status, { pending: 0, paid: 1 }'},
      {title: 'Upgrade commands after editing Gemfile for the chosen target', lang: 'text', code: 'bundle update rails\nbin/rails app:update\nbin/rails zeitwerk:check\nbin/rails test\nbin/rails test:system', result: 'Review Gemfile.lock and merge prompts. These commands are not proof that external services or production data paths work.'},
      {title: 'A small upgrade record', lang: 'text', code: 'Runtime: Ruby exact version\nFramework: resolved Rails patch\nDefaults: retained → adopted\nDependencies changed: list\nBehavior checks: login, checkout, jobs, assets\nRollback constraints: schema/cache/queued payload compatibility'}
    ],
    scenario: {title: 'Boot fails after jumping directly to Rails 8', before: 'The application still uses deprecated enum definitions hidden in a model concern.', investigate: ['Read the first relevant application stack frame.', 'Search enum declarations and concern code.', 'Apply the supported positional form and add enum behavior tests.', 'Repeat the intervening deprecation review instead of patching only one startup error.'], after: 'The app boots with explicitly supported syntax and the wider upgrade risk is reviewed.'},
    verify: ['Check sign-in, checkout, mail, jobs and asset builds.', 'Test production configuration and a sanitized database copy.', 'Verify rollback compatibility with schemas and serialized jobs.'],
    tips: ['Upgrade Ruby and Rails as separate changes when practical.', 'App-update conflicts are review work, not permission to discard custom settings.', 'A green unit suite does not replace integration smoke tests.'],
    mistake: 'Changing framework version, Ruby runtime, frontend pipeline and queue backend in one unexplained release.',
    exercises: [['Why retain old defaults temporarily?', 'It separates runtime compatibility from changed behavior, allowing incremental verification.'], ['What should you review in Gemfile.lock?', 'Framework components, transitive dependency changes, Ruby/platform details and Bundler compatibility.']],
    interview: [['Why fix deprecations first?', 'They identify behavior that a later release may remove.'], ['What is a safe schema strategy?', 'Expand compatible structures, deploy compatible code, migrate/backfill, and only later contract old structures after rollback needs pass.']],
    summary: 'Upgrade in observable steps, review generated changes and prove business behavior in the deployed topology.', sources: [upgrade, rails8, ['Rails maintenance policy', 'https://guides.rubyonrails.org/maintenance_policy.html']]
  });
})();
