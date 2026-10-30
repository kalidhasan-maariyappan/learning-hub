// Ruby on Rails: Going to Production, interview questions and the Rails quiz.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Rails');
  const term = (code, result) => K.rails(code, { title: 'Terminal', lang: 'text', result, label: 'Terminal' });

  page('rails_performance', () => [
    h2('Puma: processes and threads'),
    p('Rails runs on the <b>Puma</b> web server. Puma starts several worker <b>processes</b>, each with several <b>threads</b>. Because of Ruby’s Global VM Lock, only one thread per process runs Ruby code at a time, but threads overlap while waiting on the database or network.'),
    K.rails(`
      threads_count = ENV.fetch("RAILS_MAX_THREADS", 3)
      threads threads_count, threads_count
      workers ENV.fetch("WEB_CONCURRENCY", 1)`, { title: 'config/puma.rb' }),
    table(['Setting', 'Guidance'], [
      ['<code>WEB_CONCURRENCY</code> (processes)', 'About one per CPU core'],
      ['<code>RAILS_MAX_THREADS</code>', 'Rails 8 defaults to 3; more threads add latency for CPU-heavy apps'],
      ['Database pool', 'At least the number of threads per process'],
    ]),
    h2('YJIT'),
    p('YJIT is Ruby’s just-in-time compiler. Rails enables it by default when Ruby supports it, which usually makes apps noticeably faster with no code changes.'),
    h2('Where the time really goes'),
    ul(['Fix N+1 queries with <code>includes</code> — see ' + JT.link('rails_n_plus_one', 'Eager Loading') + '.', 'Add database indexes for columns used in <code>where</code>, <code>order</code> and joins.', 'Move slow work to ' + JT.link('rails_active_job', 'background jobs') + '.', 'Cache expensive views and computations — see ' + JT.link('rails_caching', 'Caching') + '.']),
    K.warn('Tuning Puma before measuring. Look at the request log, an APM tool or <code>rack-mini-profiler</code> first; most slowness is in queries, not the server.'),
  ]);

  page('rails_caching', () => [
    h2('Low-level caching'),
    p('<code>Rails.cache.fetch</code> returns the cached value, or runs the block on a miss and stores the result:'),
    K.rails(`
      def competing_price
        Rails.cache.fetch([self, "competing_price"], expires_in: 12.hours) do
          PriceComparisonApi.find_price(id)
        end
      end`, { title: 'app/models/product.rb' }),
    h2('Fragment caching'),
    p('Cache part of a view. The cache key includes the record’s <code>updated_at</code>, so the fragment is rebuilt automatically when the product changes:'),
    K.rails(`
      <% @products.each do |product| %>
        <% cache product do %>
          <%= render product %>
        <% end %>
      <% end %>`, { title: 'app/views/products/index.html.erb', lang: 'erb' }),
    h2('Russian doll caching'),
    p('Nest caches: when one product changes, only its fragment and the outer one are rebuilt; all the other inner fragments are reused. Use <code>touch: true</code> so a change to a child also updates the parent’s <code>updated_at</code>:'),
    K.rails(`
      class Review < ApplicationRecord
        belongs_to :product, touch: true
      end`, { title: 'Expire the parent' }),
    h2('Solid Cache'),
    p('Rails 8 stores the cache in the database with <b>Solid Cache</b>, so it can be much larger than an in-memory cache and needs no Redis:'),
    K.rails(`
      config.cache_store = :solid_cache_store`, { title: 'config/environments/production.rb' }),
    term('bin/rails dev:cache', 'Development mode is now being cached.'),
    K.tip('Caching is off in development by default. <code>bin/rails dev:cache</code> turns it on and off.'),
  ]);

  page('rails_security', () => [
    h2('What Rails protects by default'),
    table(['Attack', 'Rails protection', 'You must still'], [
      ['SQL injection', 'Hash conditions and placeholders are escaped', 'Never interpolate input into SQL strings'],
      ['Cross-site scripting (XSS)', '<code>&lt;%= %&gt;</code> escapes HTML', 'Avoid <code>raw</code> / <code>html_safe</code> on user content; use <code>sanitize</code>'],
      ['CSRF', 'Authenticity token on every non-GET request', 'Never change data in a GET action'],
      ['Mass assignment', 'Strong parameters', 'Permit only the fields users may set'],
      ['Session hijacking', 'Encrypted, HttpOnly session cookie', 'Force HTTPS (<code>config.force_ssl = true</code>)'],
      ['Session fixation', '—', 'Call <code>reset_session</code> when a user logs in'],
    ]),
    h2('XSS'),
    K.rails(`
      <%= @comment.body %>
      <%= raw @comment.body %>
      <%= sanitize @comment.body, tags: %w[b i a], attributes: %w[href] %>`, { title: 'Escaped, unsafe and sanitized', lang: 'erb', result: '&lt;script&gt;alert(1)&lt;/script&gt;\n<script>alert(1)</script>\nalert(1)', label: 'HTML when body is <script>alert(1)</script>' }),
    h2('Authorization'),
    p('Always scope records to the current user. Otherwise anyone can read another user’s data by changing the id in the URL (an IDOR vulnerability):'),
    K.rails(`
      # Unsafe: any order id works
      @order = Order.find(params[:id])

      # Safe: only the user's own orders
      @order = Current.user.orders.find(params[:id])`, { title: 'Scope finds to the user' }),
    h2('Security tools'),
    term('bin/brakeman\nbin/bundler-audit', 'No warnings found\nNo vulnerabilities found'),
    p('New Rails apps include <b>Brakeman</b> (static analysis for Rails security problems) and run it in the generated CI workflow.'),
    K.tip('For a deeper treatment of SQL injection, XSS, CSRF and CORS, see the ' + JT.link('security_home', 'Security course') + '.'),
  ]);

  page('rails_error_reporting', () => [
    h2('The Rails error reporter'),
    p('<code>Rails.error</code> is one interface for reporting exceptions. Error services such as Sentry, Honeybadger or AppSignal subscribe to it, so your code does not depend on a particular vendor.'),
    K.rails(`
      Rails.error.handle(context: { user_id: Current.user&.id }) do
        RecommendationService.refresh(Current.user)
      end

      result = Rails.error.handle(fallback: -> { [] }) do
        PriceApi.fetch_prices
      end

      Rails.error.record do
        PaymentGateway.charge!(order)
      end`, { title: 'handle, fallback and record' }),
    table(['Method', 'Reports the error', 'Then'], [['<code>handle</code>', 'Yes', 'Swallows it and returns nil (or the fallback)'], ['<code>record</code>', 'Yes', 'Re-raises it'], ['<code>report(error)</code>', 'Yes', 'Reports an exception you already rescued']]),
    h2('A subscriber'),
    K.rails(`
      class ErrorSubscriber
        def report(error, handled:, severity:, context:, source: nil)
          MyErrorService.notify(error, context: context, severity: severity)
        end
      end

      Rails.error.subscribe(ErrorSubscriber.new)`, { title: 'config/initializers/error_subscriber.rb' }),
    K.remember(['Unhandled exceptions in requests and jobs are reported automatically.', 'Add <code>context</code> such as the user id so errors can be investigated without guessing.']),
  ]);

  page('rails_deploy', () => [
    h2('Deploying with Kamal'),
    p('New Rails apps come ready to deploy with <b>Kamal</b>. Kamal builds a Docker image from the generated <code>Dockerfile</code> and runs it on any Linux server over SSH, with <b>kamal-proxy</b> in front for zero-downtime deploys and automatic HTTPS.'),
    K.rails(`
      service: store
      image: your-user/store

      servers:
        web:
          - 192.168.0.1

      proxy:
        ssl: true
        host: store.example.com

      registry:
        username: your-user
        password:
          - KAMAL_REGISTRY_PASSWORD

      env:
        secret:
          - RAILS_MASTER_KEY`, { title: 'config/deploy.yml', lang: 'text' }),
    term('bin/kamal setup\nbin/kamal deploy', 'Building image...\nPushing image...\nBooting app on 192.168.0.1...\nFinished all in 112.4 seconds'),
    h2('Production checklist'),
    ul([
      'Set <code>RAILS_MASTER_KEY</code> on the server and keep <code>config/master.key</code> out of Git.',
      'Use <code>config.force_ssl = true</code> (on by default in new production configs).',
      'Run migrations during deploy (the Docker entrypoint runs <code>bin/rails db:prepare</code>).',
      'Run the job worker (Solid Queue) and back up the database, including the cache and queue databases if they are separate.',
      'Send logs and errors to a monitoring service.',
    ]),
    K.tip('<code>bin/kamal console</code> opens a Rails console on the server, and <code>bin/kamal logs</code> follows the app’s logs.'),
  ]);

  const quiz = K.mixQuiz([
    { q: 'Which table does a model named LineItem use by default?', options: ['line_items', 'lineitems', 'LineItems', 'line_item'], answer: 0 },
    { q: 'Which command runs pending migrations?', options: ['bin/rails db:migrate', 'bin/rails migrate', 'bin/rails db:run', 'bundle exec migrate'], answer: 0 },
    { q: 'What does Product.find(99) do when no product has id 99?', options: ['Raises ActiveRecord::RecordNotFound', 'Returns nil', 'Returns an empty relation', 'Creates the record'], answer: 0 },
    { q: 'Which method fixes an N+1 query when listing books with their authors?', options: ['includes(:author)', 'joins(:author) only', 'pluck(:author)', 'select(:author)'], answer: 0 },
    { q: 'How many routes does resources :products create?', options: ['7', '4', '5', '8'], answer: 0 },
    { q: 'Where does the foreign key go for belongs_to :product?', options: ['product_id on the model that belongs_to', 'On the products table', 'In a join table', 'Nowhere; Rails infers it'], answer: 0 },
    { q: 'Which ERB tag prints an escaped value?', options: ['<%= %>', '<% %>', '<%# %>', '<%- %>'], answer: 0 },
    { q: 'What does params.expect(product: [:name]) do?', options: ['Requires product and permits only name', 'Permits every attribute', 'Validates the name', 'Saves the product'], answer: 0 },
    { q: 'Which Rails 8 default stores background jobs in the database?', options: ['Solid Queue', 'Sidekiq', 'Resque', 'Delayed Job'], answer: 0 },
    { q: 'Which callback is safest for enqueuing a job after a record is created?', options: ['after_create_commit', 'before_save', 'after_validation', 'before_create'], answer: 0 },
  ]);
  page('rails_quiz', () => [
    h2('Rails Quiz'),
    p('Test what you learned in the Ruby on Rails tutorial. Choose one answer for each question, then submit.'),
    JT.renderQuiz(quiz, { id: 'rails-quiz' }),
  ], { after: (main, { wireQuiz }) => wireQuiz(quiz, 70, 'rails-quiz') });
})();
