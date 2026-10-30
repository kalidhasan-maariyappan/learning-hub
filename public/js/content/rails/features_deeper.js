// Ruby on Rails: built-in features (authentication, jobs, mail, uploads) and Digging Deeper guides.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Rails');
  const term = (code, result) => K.rails(code, { title: 'Terminal', lang: 'text', result, label: 'Terminal' });

  page('rails_authentication', () => [
    h2('The authentication generator'),
    p('Rails 8 includes a generator that adds sign-in with email and password, sessions stored in the database and password reset by email.'),
    term('bin/rails generate authentication\nbin/rails db:migrate', 'create  app/models/user.rb\ncreate  app/models/session.rb\ncreate  app/models/current.rb\ncreate  app/controllers/sessions_controller.rb\ncreate  app/controllers/passwords_controller.rb\ncreate  app/controllers/concerns/authentication.rb\n...'),
    h2('What it creates'),
    K.rails(`
      class User < ApplicationRecord
        has_secure_password
        has_many :sessions, dependent: :destroy

        normalizes :email_address, with: ->(e) { e.strip.downcase }
      end`, { title: 'app/models/user.rb' }),
    p('<code>has_secure_password</code> stores a <b>bcrypt</b> hash in <code>password_digest</code>, never the password itself, and adds <code>authenticate</code>.'),
    h2('Protecting pages'),
    p('The generated <code>Authentication</code> concern is included in <code>ApplicationController</code>, so <b>every</b> action requires sign-in. Open up public pages explicitly:'),
    K.rails(`
      class ProductsController < ApplicationController
        allow_unauthenticated_access only: %i[index show]
      end`, { title: 'Public pages' }),
    K.rails(`
      <% if authenticated? %>
        <%= button_to "Log out", session_path, method: :delete %>
      <% else %>
        <%= link_to "Log in", new_session_path %>
      <% end %>`, { title: 'In a view', lang: 'erb' }),
    K.tip('<code>Current.user</code> gives you the signed-in user anywhere in the request. <code>Current</code> is an <code>ActiveSupport::CurrentAttributes</code> class that is reset after each request.'),
  ]);

  page('rails_active_job', () => [
    h2('Background jobs'),
    p('Slow work — sending email, calling an API, resizing images — should not make the user wait. Put it in a job, and a separate worker process runs it later. Rails 8 uses <b>Solid Queue</b>, which stores jobs in the database.'),
    term('bin/rails generate job ProcessOrder', 'create  app/jobs/process_order_job.rb'),
    K.rails(`
      class ProcessOrderJob < ApplicationJob
        queue_as :default
        retry_on Net::OpenTimeout, wait: :polynomially_longer, attempts: 5
        discard_on ActiveJob::DeserializationError

        def perform(order)
          order.charge!
          OrderMailer.receipt(order).deliver_now
        end
      end`, { title: 'app/jobs/process_order_job.rb' }),
    K.rails(`
      ProcessOrderJob.perform_later(order)
      ProcessOrderJob.set(wait: 10.minutes).perform_later(order)`, { title: 'Enqueue a job' }),
    p('In development the jobs run inside <code>bin/dev</code>; in production run <code>bin/jobs</code> or let Puma start the Solid Queue supervisor.'),
    K.remember(['Pass records (or ids), not large objects: Active Job stores a <code>GlobalID</code> and loads the record again in the worker.', 'Jobs can run more than once after a retry, so make <code>perform</code> safe to repeat (idempotent).', 'Enqueue jobs in <code>after_commit</code>, so the record exists when the worker loads it.']),
  ]);

  page('rails_action_mailer', () => [
    h2('Sending email'),
    p('A mailer works like a controller: each method prepares one email, and a view provides the body.'),
    term('bin/rails generate mailer Product in_stock', 'create  app/mailers/product_mailer.rb\ncreate  app/views/product_mailer/in_stock.html.erb\ncreate  app/views/product_mailer/in_stock.text.erb'),
    K.rails(`
      class ProductMailer < ApplicationMailer
        def in_stock
          @product = params[:product]
          mail to: params[:subscriber].email, subject: "#{@product.name} is back in stock"
        end
      end`, { title: 'app/mailers/product_mailer.rb' }),
    K.rails(`
      ProductMailer.with(product: product, subscriber: subscriber).in_stock.deliver_later`, { title: 'Send it' }),
    p('<code>deliver_later</code> sends the email through a background job; <code>deliver_now</code> sends it immediately.'),
    K.tip('Preview emails in the browser at <code>/rails/mailers</code> with a class in <code>test/mailers/previews</code>, without sending anything.'),
  ]);

  page('rails_active_storage', () => [
    h2('File uploads with Active Storage'),
    p('Active Storage attaches files to records and stores them on disk, Amazon S3, Google Cloud Storage or another service.'),
    term('bin/rails active_storage:install\nbin/rails db:migrate', 'Copied migration ..._create_active_storage_tables.active_storage.rb'),
    K.rails(`
      class Product < ApplicationRecord
        has_one_attached :featured_image
        has_many_attached :photos
      end`, { title: 'app/models/product.rb' }),
    K.rails(`
      <%= form.file_field :featured_image, accept: "image/*" %>`, { title: 'In the form', lang: 'erb' }),
    K.rails(`
      def product_params
        params.expect(product: [:name, :featured_image])
      end`, { title: 'Permit the attachment' }),
    K.rails(`
      <%= image_tag @product.featured_image if @product.featured_image.attached? %>
      <%= image_tag @product.featured_image.variant(resize_to_limit: [300, 300]) %>`, { title: 'Show the image', lang: 'erb' }),
    K.warn('Trusting the file name or content type from the browser. Validate size and type on the server, and never serve user uploads from your app’s own domain without care.'),
  ]);

  page('rails_testing', () => [
    h2('Testing in Rails'),
    p('Rails uses <b>Minitest</b> by default. Generators create test files next to the code, and every test runs in a database transaction that is rolled back afterwards.'),
    table(['Folder', 'Tests'], [['<code>test/models</code>', 'Models'], ['<code>test/controllers</code>', 'Controllers (functional tests)'], ['<code>test/integration</code>', 'Several requests through the stack'], ['<code>test/system</code>', 'A real browser'], ['<code>test/fixtures</code>', 'Sample data in YAML']]),
    h2('A model test'),
    K.rails(`
      require "test_helper"

      class ProductTest < ActiveSupport::TestCase
        test "is invalid without a name" do
          product = Product.new(price: 5)
          assert_not product.valid?
          assert_includes product.errors[:name], "can't be blank"
        end

        test "in_stock scope excludes sold-out products" do
          assert_includes Product.in_stock, products(:tshirt)
          assert_not_includes Product.in_stock, products(:sold_out_mug)
        end
      end`, { title: 'test/models/product_test.rb' }),
    h2('Fixtures'),
    K.rails(`
      tshirt:
        name: T-Shirt
        price: 20
        inventory_count: 5

      sold_out_mug:
        name: Mug
        price: 8
        inventory_count: 0`, { title: 'test/fixtures/products.yml', lang: 'text' }),
    term('bin/rails test\nbin/rails test test/models/product_test.rb:4', 'Running 2 tests in a single process\n..\nFinished in 0.05s, 2 runs, 3 assertions, 0 failures, 0 errors, 0 skips'),
    K.tip('Many teams use RSpec and FactoryBot instead of Minitest and fixtures. The ideas — isolated database, one behavior per test — are the same.'),
  ]);

  page('rails_testing_integration', () => [
    h2('Integration tests'),
    p('Integration tests send real HTTP requests through routing, controllers and views:'),
    K.rails(`
      require "test_helper"

      class ProductsFlowTest < ActionDispatch::IntegrationTest
        test "lists products" do
          get products_path
          assert_response :success
          assert_dom "h1", "Products"
        end

        test "rejects an invalid product" do
          sign_in_as users(:admin)
          post products_path, params: { product: { name: "" } }
          assert_response :unprocessable_entity
        end
      end`, { title: 'test/integration/products_flow_test.rb' }),
    h2('System tests'),
    p('System tests drive a real browser (headless Chrome through Capybara), so JavaScript and Turbo run too:'),
    K.rails(`
      require "application_system_test_case"

      class ProductsTest < ApplicationSystemTestCase
        test "creating a product" do
          visit new_product_url
          fill_in "Name", with: "Hoodie"
          click_on "Create Product"
          assert_text "Product created."
        end
      end`, { title: 'test/system/products_test.rb' }),
    term('bin/rails test:system', 'Running 1 tests in a single process\n.\n1 runs, 1 assertions, 0 failures, 0 errors, 0 skips'),
    K.remember(['Write many fast model and integration tests and a few system tests for the most important user journeys.', 'System tests are slower and more fragile because they use a browser.']),
  ]);

  page('rails_debugging', () => [
    h2('Logs'),
    p('In development every request is logged to the terminal and <code>log/development.log</code>, including the SQL it ran and how long it took:'),
    K.rails(`
      Started GET "/products" for 127.0.0.1 at 2026-10-30 10:00:00 +0000
      Processing by ProductsController#index as HTML
        Product Load (0.2ms)  SELECT "products".* FROM "products"
        Rendered products/index.html.erb within layouts/application (Duration: 3.1ms)
      Completed 200 OK in 12ms (Views: 8.0ms | ActiveRecord: 0.2ms)`, { title: 'log/development.log', lang: 'text' }),
    K.rails(`
      Rails.logger.info("Charging order #{order.id}")
      Rails.logger.debug { "Payload: #{payload.inspect}" }`, { title: 'Write to the log' }),
    h2('The debug gem'),
    p('Add <code>debugger</code> (or <code>binding.irb</code>) to stop the program at that line. The server terminal becomes an interactive console where you can inspect variables, then type <code>continue</code>:'),
    K.rails(`
      def create
        @product = Product.new(product_params)
        debugger
        @product.save
      end`, { title: 'Set a breakpoint' }),
    table(['Command', 'Does'], [['<code>info</code>', 'Show local and instance variables'], ['<code>next</code>', 'Run the next line'], ['<code>step</code>', 'Step into a method call'], ['<code>continue</code>', 'Resume the program']]),
    K.tip('The block form of <code>logger.debug { ... }</code> builds the string only when debug logging is on.'),
  ]);

  page('rails_configuration', () => [
    h2('Where configuration lives'),
    table(['File', 'Purpose'], [
      ['<code>config/application.rb</code>', 'Settings for every environment'],
      ['<code>config/environments/*.rb</code>', 'Settings for development, test and production'],
      ['<code>config/initializers/*.rb</code>', 'Code that runs once when the app boots'],
      ['<code>config/database.yml</code>', 'Database connections'],
      ['<code>config/credentials.yml.enc</code>', 'Encrypted secrets'],
    ]),
    K.rails(`
      module Store
        class Application < Rails::Application
          config.load_defaults 8.1
          config.time_zone = "Europe/London"
          config.i18n.default_locale = :en
        end
      end`, { title: 'config/application.rb' }),
    p('<code>config.load_defaults 8.1</code> turns on the default behavior of Rails 8.1. When you upgrade Rails, you raise this number step by step.'),
    h2('Credentials'),
    p('Secrets such as API keys go in encrypted credentials, never in the code or the Git repository:'),
    term('bin/rails credentials:edit', 'File encrypted and saved.'),
    K.rails(`
      Rails.application.credentials.stripe[:secret_key]
      Rails.application.credentials.dig(:aws, :access_key_id)`, { title: 'Read a secret' }),
    K.warn('Committing <code>config/master.key</code>. It decrypts every secret; keep it out of Git and pass it to production as the <code>RAILS_MASTER_KEY</code> environment variable.'),
  ]);

  page('rails_command_line', () => [
    h2('The Rails command line'),
    table(['Command', 'Does'], [
      ['<code>rails new app</code>', 'Create a new application'], ['<code>bin/rails server</code> (<code>s</code>)', 'Start the web server'],
      ['<code>bin/dev</code>', 'Start the server plus CSS/JS watchers and jobs'], ['<code>bin/rails console</code> (<code>c</code>)', 'Open a console with the app loaded'],
      ['<code>bin/rails generate</code> (<code>g</code>)', 'Generate models, controllers, migrations…'], ['<code>bin/rails destroy</code>', 'Remove what a generator created'],
      ['<code>bin/rails db:migrate</code>', 'Run pending migrations'], ['<code>bin/rails db:seed</code>', 'Load <code>db/seeds.rb</code>'],
      ['<code>bin/rails db:prepare</code>', 'Create and migrate the database if needed'], ['<code>bin/rails routes</code>', 'List all routes'],
      ['<code>bin/rails test</code>', 'Run tests'], ['<code>bin/rails runner "code"</code>', 'Run Ruby code in the app'],
    ]),
    h2('Scaffold'),
    p('A scaffold generates a model, migration, controller, views, routes and tests for a full CRUD resource:'),
    term('bin/rails generate scaffold Article title:string body:text published:boolean', 'invoke  active_record\ncreate    db/migrate/..._create_articles.rb\ncreate    app/models/article.rb\ninvoke  resource_route\n route    resources :articles\ninvoke  scaffold_controller\ncreate    app/controllers/articles_controller.rb\n...'),
    K.tip('Run <code>bin/rails --help</code> or <code>bin/rails generate model --help</code> to see every option.'),
  ]);

  page('rails_assets', () => [
    h2('Propshaft'),
    p('Rails 8 uses <b>Propshaft</b> as its asset pipeline. It does not compile or bundle; it copies files from <code>app/assets</code> to <code>public/assets</code> and adds a <b>digest</b> (a fingerprint of the content) to each file name.'),
    K.rails(`
      <%= stylesheet_link_tag :app %>
      <%= image_tag "logo.png" %>`, { title: 'In a layout', lang: 'erb', result: '<link rel="stylesheet" href="/assets/application-6c2f1a.css">\n<img src="/assets/logo-9b4e0d.png">', label: 'HTML' }),
    p('Because the file name changes whenever the content changes, browsers can cache assets forever and still get new versions after a deploy.'),
    term('bin/rails assets:precompile', 'Writing application-6c2f1a.css\nWriting logo-9b4e0d.png'),
    K.remember(['Use helpers such as <code>image_tag</code> and <code>asset_path</code>, never hard-coded <code>/assets/logo.png</code> paths.', 'For Sass or Tailwind, add <code>cssbundling-rails</code> or <code>tailwindcss-rails</code>; Propshaft then serves the built CSS.']),
  ]);

  page('rails_javascript', () => [
    h2('Import maps'),
    p('New Rails apps load JavaScript with <b>import maps</b>: the browser loads ES modules directly, so there is no Node.js build step.'),
    term('bin/importmap pin local-time', 'Pinning "local-time" to vendor/javascript/local-time.js via download from https://ga.jspm.io/...'),
    h2('Hotwire'),
    p('Hotwire builds fast, interactive pages by sending HTML instead of JSON. It has two parts:'),
    ul(['<b>Turbo</b> — follows links and submits forms without full page reloads, and updates parts of a page with Turbo Frames and Turbo Streams.', '<b>Stimulus</b> — small JavaScript controllers attached to HTML with <code>data-</code> attributes.']),
    K.rails(`
      <%= turbo_frame_tag "product_#{product.id}" do %>
        <%= link_to "Edit", edit_product_path(product) %>
      <% end %>`, { title: 'Turbo Frame: the edit form replaces only this frame', lang: 'erb' }),
    K.rails(`
      import { Controller } from "@hotwired/stimulus"

      export default class extends Controller {
        static targets = ["output"]
        greet() {
          this.outputTarget.textContent = "Hello!"
        }
      }`, { title: 'app/javascript/controllers/hello_controller.js', lang: 'text' }),
    K.rails(`
      <div data-controller="hello">
        <button data-action="click->hello#greet">Greet</button>
        <span data-hello-target="output"></span>
      </div>`, { title: 'Using the Stimulus controller', lang: 'erb' }),
    K.rails(`
      <%= button_to "Delete", product, method: :delete, data: { turbo_confirm: "Are you sure?" } %>`, { title: 'Confirm before submitting', lang: 'erb' }),
  ]);

  page('rails_i18n', () => [
    h2('Internationalization (I18n)'),
    p('Rails keeps user-facing text in locale files, so the app can be translated. <code>t</code> (translate) looks up a key for the current locale.'),
    K.rails(`
      en:
        hello: "Hello"
        products:
          index:
            title: "Our products"
            count:
              one: "%{count} product"
              other: "%{count} products"`, { title: 'config/locales/en.yml', lang: 'text' }),
    K.rails(`
      <h1><%= t(".title") %></h1>
      <p><%= t(".count", count: @products.size) %></p>`, { title: 'app/views/products/index.html.erb', lang: 'erb', result: 'Our products\n3 products', label: 'Browser' }),
    p('A key starting with a dot is “lazy”: inside <code>products/index</code>, <code>t(".title")</code> means <code>products.index.title</code>.'),
    h2('Switching locale'),
    K.rails(`
      class ApplicationController < ActionController::Base
        around_action :switch_locale

        def switch_locale(&action)
          locale = params[:locale] || I18n.default_locale
          I18n.with_locale(locale, &action)
        end
      end`, { title: 'Per request' }),
    K.warn('Setting <code>I18n.locale = ...</code> directly in a controller. In a threaded server the value can leak into another request; use <code>I18n.with_locale</code> in an <code>around_action</code>.'),
  ]);

  page('rails_autoloading', () => [
    h2('Autoloading with Zeitwerk'),
    p('In a Rails app you never write <code>require</code> for your own classes. The <b>Zeitwerk</b> loader finds a constant from its file name, as long as the names match.'),
    table(['File', 'Must define'], [
      ['<code>app/models/product.rb</code>', '<code>Product</code>'], ['<code>app/models/line_item.rb</code>', '<code>LineItem</code>'],
      ['<code>app/services/billing/invoice_creator.rb</code>', '<code>Billing::InvoiceCreator</code>'], ['<code>app/controllers/admin/products_controller.rb</code>', '<code>Admin::ProductsController</code>'],
    ]),
    p('In development, Zeitwerk reloads changed files on the next request. In production everything is loaded once at boot (<b>eager loading</b>).'),
    term('bin/rails zeitwerk:check', 'Hold on, I am eager loading the application.\nAll is good!'),
    K.warn('A file name that does not match its class (for example <code>app/models/user_profile.rb</code> defining <code>UserProfiles</code>). It works in development by accident and fails with <code>NameError</code> on eager load. Run <code>bin/rails zeitwerk:check</code> in CI.'),
  ]);

  page('rails_api_only', () => [
    h2('API-only applications'),
    p('If Rails only serves JSON to a mobile app or a JavaScript front end, create an API-only app. It leaves out views, cookies, sessions and browser middleware.'),
    term('rails new store_api --api', 'create  app/controllers/application_controller.rb\n...'),
    K.rails(`
      class ApplicationController < ActionController::API
      end

      class Api::V1::ProductsController < ApplicationController
        def index
          render json: Product.select(:id, :name, :price)
        end

        def create
          product = Product.new(params.expect(product: [:name, :price]))
          if product.save
            render json: product, status: :created
          else
            render json: { errors: product.errors }, status: :unprocessable_entity
          end
        end
      end`, { title: 'app/controllers', result: '[{"id":1,"name":"T-Shirt","price":"20.0"}]', label: 'GET /api/v1/products' }),
    K.remember(['API controllers inherit from <code>ActionController::API</code>.', 'Use token authentication (for example <code>authenticate_with_http_token</code>) instead of cookies.', 'Version the API with a namespace such as <code>/api/v1</code>, and allow cross-origin requests with the <code>rack-cors</code> gem only for trusted origins.']),
  ]);
})();
