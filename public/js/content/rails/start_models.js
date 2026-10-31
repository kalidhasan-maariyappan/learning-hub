// Ruby on Rails: Start Here and Models (Active Record), following the Rails 8.1 guides.
// Rails code needs a Rails application, so it is shown with the result Rails produces.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Rails');
  const term = (code, result) => K.rails(code, { title: 'Terminal', lang: 'text', result, label: 'Terminal' });

  page('rails_home', () => [
    h2('Learn Ruby on Rails'),
    p('Ruby on Rails is a web application framework written in Ruby. It includes everything needed to build a database-backed web application: models, views, controllers, routing, background jobs, email, caching and deployment.'),
    p('This tutorial follows the order of the official <a href="https://guides.rubyonrails.org/">Rails Guides</a> for Rails 8.1 and explains each topic in short lessons with code you can copy into your own app.'),
    K.rails(`
      class ProductsController < ApplicationController
        def index
          @products = Product.order(:name)
        end
      end`, { title: 'Example' }),
    p('This controller action loads every product, sorted by name, and Rails then renders <code>app/views/products/index.html.erb</code>. That is a whole page in four lines.'),
    h2('Practical production learning path'),
    p('Learn to investigate production problems through separate chapters with examples, exercises and interview questions. Start with ' + JT.link('rails_practical_path', 'the practical Rails learning path') + '.'),
    h2('Before you start'),
    p('You should know basic Ruby: variables, methods, blocks, classes and hashes. If not, start with the ' + JT.link('ruby_home', 'Ruby tutorial') + '.'),
    h2('Learning path'),
    ul([
      '<b>Start Here</b> — install Rails, create an app and understand MVC.',
      '<b>Models</b> — Active Record, migrations, validations, callbacks, associations and queries.',
      '<b>Views</b> and <b>Controllers</b> — ERB templates, layouts, forms, parameters, sessions and routing.',
      '<b>Rails Features</b> — authentication, background jobs, email and file uploads.',
      '<b>Digging Deeper</b> — testing, debugging, configuration, assets, Hotwire, I18n and APIs.',
      '<b>Going to Production</b> — performance, caching, security, error reporting and deployment.',
    ]),
    K.tip('Rails code needs a full Rails application, so these lessons show the code and what Rails prints instead of running it here. Follow along in your own app created with <code>rails new</code>.'),
  ]);

  page('rails_intro', () => [
    h2('What is Rails?'),
    p('Rails is a <b>full-stack</b> web framework created by David Heinemeier Hansson and released in 2004. Companies such as GitHub, Shopify and Basecamp run on it.'),
    h2('The Rails philosophy'),
    p('Two principles shape how Rails code is written:'),
    ul([
      '<b>Don’t Repeat Yourself (DRY)</b> — every piece of knowledge should have one place in the system. For example, a model learns its columns from the database instead of listing them again.',
      '<b>Convention over Configuration</b> — Rails decides sensible defaults. A <code>Product</code> model uses the <code>products</code> table, and <code>ProductsController#index</code> renders <code>products/index.html.erb</code>, with no configuration.',
    ]),
    h2('What is included?'),
    table(['Part', 'Does'], [
      ['Active Record', 'Models and the database (ORM)'], ['Action Controller', 'Handles requests'],
      ['Action View', 'Renders HTML with ERB templates'], ['Action Dispatch', 'Routing'],
      ['Active Job', 'Background jobs (Solid Queue by default)'], ['Action Mailer', 'Sending email'],
      ['Active Storage', 'File uploads'], ['Action Cable', 'WebSockets (Solid Cable by default)'],
    ]),
    K.remember(['Following the conventions is what makes Rails fast to work with.', 'Rails 8 apps include a database-backed cache, queue and WebSocket adapter (Solid Cache, Solid Queue, Solid Cable), so a new app needs no Redis.']),
  ]);

  page('rails_install', () => [
    h2('Requirements'),
    p('Rails 8.1 needs <b>Ruby 3.2 or newer</b>. Check your version first:'),
    term('ruby -v', 'ruby 3.4.10 (2026-06-30 revision 2b0b7728dc) +PRISM [x64-mingw-ucrt]'),
    p('If Ruby is missing, see ' + JT.link('ruby_get_started', 'Ruby Get Started') + '. On Windows the official guide recommends WSL, but RubyInstaller with the Devkit also works. SQLite, the default database, needs no separate server.'),
    h2('Install Rails'),
    p('Rails is a gem. Install it with:'),
    term('gem install rails', 'Successfully installed rails-8.1.4'),
    term('rails --version', 'Rails 8.1.4'),
    K.tip('Use the same Ruby version on your computer and in production. Version managers such as <code>rbenv</code> or <code>mise</code> read the <code>.ruby-version</code> file that <code>rails new</code> creates.'),
  ]);

  page('rails_new_app', () => [
    h2('Create an application'),
    p('The <code>rails new</code> command creates a complete application. The official guide builds an online store, so we do the same:'),
    term('rails new store\ncd store', 'create  app/controllers/application_controller.rb\ncreate  config/routes.rb\n...\nrun  bundle install'),
    h2('Start the server'),
    term('bin/rails server', '=> Booting Puma\n=> Rails 8.1.4 application starting in development\n* Listening on http://127.0.0.1:3000'),
    p('Open <code>http://localhost:3000</code> in a browser to see the Rails welcome page. Stop the server with Ctrl+C.'),
    h2('Directory structure'),
    table(['Folder / file', 'Contains'], [
      ['<code>app/</code>', 'Models, views, controllers, jobs, mailers and helpers — most of your code'],
      ['<code>bin/</code>', 'Scripts such as <code>bin/rails</code>, <code>bin/dev</code> and <code>bin/setup</code>'],
      ['<code>config/</code>', 'Routes, database settings and environment configuration'],
      ['<code>db/</code>', 'Migrations, the schema file and seeds'],
      ['<code>test/</code>', 'Tests'],
      ['<code>Gemfile</code>', 'The gems the app depends on'],
      ['<code>.kamal/</code>, <code>config/deploy.yml</code>', 'Deployment with Kamal'],
    ]),
    K.tip('Use <code>rails new store --database=postgresql</code> to start with PostgreSQL instead of SQLite.'),
  ]);

  page('rails_mvc', () => [
    h2('Model, View, Controller'),
    p('Rails divides an application into three kinds of code:'),
    table(['Part', 'Responsibility', 'Lives in'], [
      ['<b>Model</b>', 'Data and business rules; talks to the database', '<code>app/models</code>'],
      ['<b>View</b>', 'What the user sees (HTML, JSON)', '<code>app/views</code>'],
      ['<b>Controller</b>', 'Receives a request, uses models, chooses a view', '<code>app/controllers</code>'],
    ]),
    h2('A request’s journey'),
    ol([
      'The browser sends <code>GET /products</code>.',
      'The <b>router</b> (<code>config/routes.rb</code>) maps it to <code>ProductsController#index</code>.',
      'The <b>controller</b> asks the <b>model</b> for data: <code>Product.all</code>.',
      'Active Record runs the SQL and returns Product objects.',
      'The controller renders the <b>view</b> <code>products/index.html.erb</code>.',
      'Rails sends the HTML back to the browser.',
    ]),
    K.remember(['Keep controllers thin: they coordinate, models hold the business logic.', 'Views should display data, not query the database.']),
  ]);

  page('rails_hello', () => [
    h2('Hello, Rails!'),
    p('To show a page you need three things: a <b>route</b>, a <b>controller action</b> and a <b>view</b>.'),
    h2('1. Add a route'),
    K.rails(`
      Rails.application.routes.draw do
        get "/products", to: "products#index"
        root "products#index"
      end`, { title: 'config/routes.rb' }),
    h2('2. Generate a controller'),
    term('bin/rails generate controller Products index --skip-routes', 'create  app/controllers/products_controller.rb\ncreate  app/views/products/index.html.erb'),
    K.rails(`
      class ProductsController < ApplicationController
        def index
          @greeting = "Hello, Rails!"
        end
      end`, { title: 'app/controllers/products_controller.rb' }),
    h2('3. Write the view'),
    K.rails(`
      <h1><%= @greeting %></h1>
      <p>Today is <%= Date.today %></p>`, { title: 'app/views/products/index.html.erb', lang: 'erb', result: 'Hello, Rails!\nToday is 2026-10-30', label: 'Browser' }),
    p('Instance variables set in the controller (<code>@greeting</code>) are available in the view. <code>&lt;%= %&gt;</code> prints the result of Ruby code.'),
    K.tip('In development Rails reloads changed code on every request (autoloading), so you do not need to restart the server.'),
  ]);

  page('rails_console', () => [
    h2('The Rails console'),
    p('<code>bin/rails console</code> starts irb with your whole application loaded. It is the best place to try models and queries.'),
    K.rails(`
      store(dev)> Product.count
      => 0
      store(dev)> Product.create(name: "T-Shirt")
      => #<Product id: 1, name: "T-Shirt", created_at: "2026-10-30 10:00:00", updated_at: "2026-10-30 10:00:00">
      store(dev)> Product.first.name
      => "T-Shirt"`, { title: 'bin/rails console', lang: 'text' }),
    h2('Useful console tips'),
    ul([
      '<code>reload!</code> loads code you changed without restarting the console.',
      '<code>bin/rails console --sandbox</code> rolls back every change when you exit.',
      '<code>app.get "/products"</code> makes a request; <code>helper.number_to_currency(9.5)</code> calls a view helper.',
    ]),
    K.warn('Experimenting in the production console without <code>--sandbox</code>. Changes there are real.'),
  ]);

  page('rails_ar_basics', () => [
    h2('What is Active Record?'),
    p('Active Record is the <b>M</b> in MVC. It is an ORM (object-relational mapper): each table is a Ruby class, each row is an object, and each column is an attribute.'),
    K.rails(`
      class Product < ApplicationRecord
      end`, { title: 'app/models/product.rb' }),
    p('This empty class is enough. Rails reads the <code>products</code> table and gives <code>Product</code> objects an attribute for every column.'),
    h2('Naming conventions'),
    table(['Model (singular, CamelCase)', 'Table (plural, snake_case)'], [
      ['<code>Product</code>', '<code>products</code>'], ['<code>LineItem</code>', '<code>line_items</code>'],
      ['<code>Person</code>', '<code>people</code>'], ['<code>Article</code>', '<code>articles</code>'],
    ]),
    h2('Schema conventions'),
    ul([
      '<code>id</code> is the primary key.',
      'A foreign key is named after the singular table plus <code>_id</code>, for example <code>product_id</code>.',
      '<code>created_at</code> and <code>updated_at</code> are set automatically.',
      '<code>lock_version</code> enables optimistic locking; <code>type</code> is reserved for single-table inheritance.',
    ]),
    h2('Generate a model'),
    term('bin/rails generate model Product name:string', 'invoke  active_record\ncreate    db/migrate/20261030100000_create_products.rb\ncreate    app/models/product.rb\ninvoke  test_unit\ncreate      test/models/product_test.rb\ncreate      test/fixtures/products.yml'),
    K.tip('You can override a convention, for example <code>self.table_name = "my_products"</code>, but following the conventions keeps the code short.'),
  ]);

  page('rails_ar_crud', () => [
    h2('Create'),
    K.rails(`
      product = Product.create(name: "T-Shirt")

      product = Product.new(name: "Mug")
      product.save`, { title: 'Create records', result: 'INSERT INTO "products" ("name", "created_at", "updated_at") VALUES (?, ?, ?)', label: 'SQL' }),
    p('<code>new</code> builds an object in memory; <code>save</code> writes it. <code>create</code> does both.'),
    h2('Read'),
    K.rails(`
      Product.all
      Product.first
      Product.find(1)
      Product.find_by(name: "Mug")
      Product.where(name: "Mug").order(created_at: :desc)`, { title: 'Read records', result: 'SELECT "products".* FROM "products" WHERE "products"."id" = 1 LIMIT 1', label: 'SQL for Product.find(1)' }),
    p('<code>find</code> raises <code>ActiveRecord::RecordNotFound</code> when nothing matches (a 404 page in production). <code>find_by</code> returns <code>nil</code>.'),
    h2('Update'),
    K.rails(`
      product = Product.find(1)
      product.update(name: "Blue T-Shirt")

      Product.where(name: "Mug").update_all(name: "Cup")`, { title: 'Update records' }),
    h2('Delete'),
    K.rails(`
      product.destroy
      Product.where(name: "Cup").destroy_all`, { title: 'Delete records' }),
    K.warn('Using <code>update_all</code> or <code>delete_all</code> and expecting validations or callbacks to run. They write SQL directly and skip both.'),
  ]);

  page('rails_migrations', () => [
    h2('What is a migration?'),
    p('A migration is a Ruby file that changes the database schema: creating tables, adding columns or indexes. Migrations are versioned, so every developer and server ends up with the same schema.'),
    K.rails(`
      class CreateProducts < ActiveRecord::Migration[8.1]
        def change
          create_table :products do |t|
            t.string :name
            t.text :description
            t.decimal :price, precision: 10, scale: 2
            t.timestamps
          end
        end
      end`, { title: 'db/migrate/20261030100000_create_products.rb' }),
    p('<code>t.timestamps</code> adds <code>created_at</code> and <code>updated_at</code>. The <code>id</code> column is added automatically.'),
    h2('Run migrations'),
    term('bin/rails db:migrate', '== 20261030100000 CreateProducts: migrating =================\n-- create_table(:products)\n== 20261030100000 CreateProducts: migrated (0.0012s) ========'),
    p('Rails records the version in the <code>schema_migrations</code> table and updates <code>db/schema.rb</code>.'),
    h2('Column types'),
    table(['Type', 'Use for'], [
      ['<code>string</code>', 'Short text (names, emails)'], ['<code>text</code>', 'Long text'], ['<code>integer</code>', 'Whole numbers'],
      ['<code>decimal</code>', 'Money and exact numbers'], ['<code>boolean</code>', 'True/false'], ['<code>datetime</code>', 'Date and time'],
      ['<code>references</code>', 'A foreign key to another table'], ['<code>json</code>', 'Structured data'],
    ]),
  ]);

  page('rails_migrations_change', () => [
    h2('Add a column'),
    p('A generator name of the form <code>AddXToY</code> creates the right migration for you:'),
    term('bin/rails generate migration AddInventoryCountToProducts inventory_count:integer', 'create  db/migrate/20261030110000_add_inventory_count_to_products.rb'),
    K.rails(`
      class AddInventoryCountToProducts < ActiveRecord::Migration[8.1]
        def change
          add_column :products, :inventory_count, :integer
        end
      end`, { title: 'Generated migration' }),
    h2('References and indexes'),
    K.rails(`
      class CreateReviews < ActiveRecord::Migration[8.1]
        def change
          create_table :reviews do |t|
            t.references :product, null: false, foreign_key: true
            t.integer :rating, null: false
            t.timestamps
          end
          add_index :reviews, [:product_id, :created_at]
        end
      end`, { title: 'A table with a foreign key' }),
    p('<code>t.references :product</code> adds a <code>product_id</code> column with an index; <code>foreign_key: true</code> adds a database constraint.'),
    h2('Roll back'),
    term('bin/rails db:rollback\nbin/rails db:migrate:status', ' Status   Migration ID    Migration Name\n--------------------------------------------------\n   up     20261030100000  Create products\n  down    20261030110000  Add inventory count to products'),
    p('Inside <code>change</code>, Rails knows how to reverse most operations. For changes it cannot reverse (such as changing a column type), write <code>up</code> and <code>down</code> methods, or use <code>reversible</code>.'),
    K.warn('Editing a migration that has already run on other machines. Write a new migration instead; others will not re-run the old one.'),
  ]);

  page('rails_validations', () => [
    h2('Validations'),
    p('Validations make sure only valid data is saved. They run when you call <code>save</code>, <code>create</code> or <code>update</code>.'),
    K.rails(`
      class Product < ApplicationRecord
        validates :name, presence: true, length: { maximum: 100 }
        validates :price, numericality: { greater_than: 0 }
        validates :sku, uniqueness: { case_sensitive: false }
        validates :inventory_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
      end`, { title: 'app/models/product.rb' }),
    K.rails(`
      product = Product.new(price: -5)
      product.valid?
      product.save
      product.errors.full_messages`, { title: 'bin/rails console', result: 'false\nfalse\n["Name can\'t be blank", "Price must be greater than 0"]' }),
    h2('save vs save!'),
    table(['Method', 'When invalid'], [
      ['<code>save</code>, <code>create</code>, <code>update</code>', 'Returns <code>false</code> (create returns the unsaved object)'],
      ['<code>save!</code>, <code>create!</code>, <code>update!</code>', 'Raises <code>ActiveRecord::RecordInvalid</code>'],
    ]),
    K.warn('Relying only on <code>uniqueness</code>. Two requests at the same moment can both pass the check. Add a unique index in the database as well.'),
  ]);

  page('rails_validation_errors', () => [
    h2('Custom validation methods'),
    K.rails(`
      class Discount < ApplicationRecord
        validate :ends_after_start

        private

        def ends_after_start
          return if starts_on.blank? || ends_on.blank?
          errors.add(:ends_on, "must be after the start date") if ends_on <= starts_on
        end
      end`, { title: 'app/models/discount.rb' }),
    h2('Conditional validations'),
    K.rails(`
      class Order < ApplicationRecord
        validates :card_number, presence: true, if: :paid_with_card?
        validates :email, presence: true, on: :create
      end`, { title: 'if: and on:' }),
    h2('Show errors in a form'),
    K.rails(`
      <% if @product.errors.any? %>
        <ul>
          <% @product.errors.full_messages.each do |message| %>
            <li><%= message %></li>
          <% end %>
        </ul>
      <% end %>`, { title: 'app/views/products/_form.html.erb', lang: 'erb' }),
    K.tip('Move reusable rules into a validator class: <code>class EmailValidator &lt; ActiveModel::EachValidator</code>, then <code>validates :email, email: true</code>.'),
  ]);

  page('rails_callbacks', () => [
    h2('Callbacks'),
    p('Callbacks are methods Rails calls at points in an object’s life: before validation, before or after saving, after commit, and so on.'),
    K.rails(`
      class User < ApplicationRecord
        before_validation :normalize_email
        after_create_commit :send_welcome_email

        private

        def normalize_email
          self.email = email.to_s.strip.downcase
        end

        def send_welcome_email
          UserMailer.welcome(self).deliver_later
        end
      end`, { title: 'app/models/user.rb' }),
    h2('The order of callbacks on create'),
    ol(['<code>before_validation</code>', '<code>after_validation</code>', '<code>before_save</code>', '<code>before_create</code>', '<code>after_create</code>', '<code>after_save</code>', '<code>after_commit</code> (after the transaction succeeds)']),
    h2('Why after_commit?'),
    p('<code>after_save</code> runs inside the database transaction. If you enqueue a job there and the transaction then rolls back, the job runs for a record that does not exist. <code>after_commit</code> (or <code>after_create_commit</code>) runs only after the data is really saved.'),
    K.warn('Putting complex business processes in callbacks. They run on every save, including in tests and data fixes, and make code hard to follow. Keep callbacks small and related to the model’s own data.'),
  ]);

  page('rails_associations', () => [
    h2('belongs_to and has_many'),
    p('Associations connect models. A review <b>belongs to</b> a product; a product <b>has many</b> reviews. The foreign key (<code>product_id</code>) lives on the <code>belongs_to</code> side.'),
    K.rails(`
      class Product < ApplicationRecord
        has_many :reviews, dependent: :destroy
      end

      class Review < ApplicationRecord
        belongs_to :product
      end`, { title: 'app/models' }),
    K.rails(`
      product = Product.first
      product.reviews.create(rating: 5)
      product.reviews.count
      Review.last.product.name`, { title: 'bin/rails console', result: 'SELECT COUNT(*) FROM "reviews" WHERE "reviews"."product_id" = 1', label: 'SQL for product.reviews.count' }),
    h2('The dependent option'),
    table(['Option', 'When the product is destroyed'], [
      ['<code>dependent: :destroy</code>', 'Loads and destroys each review (callbacks run)'],
      ['<code>dependent: :delete_all</code>', 'Deletes reviews with one SQL statement (no callbacks)'],
      ['<code>dependent: :nullify</code>', 'Sets <code>product_id</code> to NULL'],
      ['<code>dependent: :restrict_with_error</code>', 'Refuses to delete while reviews exist'],
    ]),
    K.remember(['<code>belongs_to</code> is required by default: a review without a product is invalid. Use <code>optional: true</code> to allow it.', 'Every association adds methods such as <code>product.reviews</code>, <code>review.product</code> and <code>product.reviews.build</code>.']),
  ]);

  page('rails_associations_more', () => [
    h2('has_one'),
    K.rails(`
      class User < ApplicationRecord
        has_one :profile
      end`, { title: 'One-to-one' }),
    h2('has_many :through'),
    p('A many-to-many relationship goes through a join model, which can hold its own data:'),
    K.rails(`
      class Doctor < ApplicationRecord
        has_many :appointments
        has_many :patients, through: :appointments
      end

      class Appointment < ApplicationRecord
        belongs_to :doctor
        belongs_to :patient
      end

      class Patient < ApplicationRecord
        has_many :appointments
        has_many :doctors, through: :appointments
      end`, { title: 'Many-to-many' }),
    p('<code>has_and_belongs_to_many</code> also exists, but it has no join model. Prefer <code>has_many :through</code>, which you can extend later with extra columns and validations.'),
    h2('Polymorphic associations'),
    p('One model can belong to several other models through a single association:'),
    K.rails(`
      class Comment < ApplicationRecord
        belongs_to :commentable, polymorphic: true
      end

      class Product < ApplicationRecord
        has_many :comments, as: :commentable
      end

      class Article < ApplicationRecord
        has_many :comments, as: :commentable
      end`, { title: 'Polymorphic' }),
    p('The <code>comments</code> table stores <code>commentable_type</code> (for example <code>"Product"</code>) and <code>commentable_id</code>. Create it with <code>t.references :commentable, polymorphic: true</code>.'),
    K.warn('Expecting a database foreign key on a polymorphic column. The database cannot enforce it, because the id may point to different tables.'),
  ]);

  page('rails_query_basics', () => [
    h2('The Query Interface'),
    p('Active Record builds SQL for you. Query methods return a <b>relation</b>, which runs only when you use the records, so you can chain conditions.'),
    K.rails(`
      Product.where(in_stock: true).order(:name).limit(10)`, { title: 'Chaining', result: 'SELECT "products".* FROM "products" WHERE "products"."in_stock" = 1 ORDER BY "products"."name" ASC LIMIT 10', label: 'SQL' }),
    h2('Finding records'),
    table(['Method', 'Returns'], [
      ['<code>find(1)</code>', 'One record, or raises RecordNotFound'], ['<code>find_by(email: x)</code>', 'One record or nil'],
      ['<code>first</code> / <code>last</code>', 'First/last by primary key'], ['<code>where(...)</code>', 'A relation of matching records'],
      ['<code>find_or_create_by(...)</code>', 'An existing record or a newly created one'],
    ]),
    h2('Selecting and calculating'),
    K.rails(`
      Product.count
      Product.where(in_stock: true).sum(:price)
      Product.average(:price)
      Product.pluck(:name)
      Product.exists?(name: "Mug")
      Product.group(:category).count`, { title: 'Calculations', result: '42\n318.5\n12.75\n["Cup", "Mug", "T-Shirt"]\ntrue\n{"clothes" => 12, "kitchen" => 30}' }),
    K.tip('<code>pluck</code> returns plain values without building model objects, which is much faster when you only need one or two columns.'),
    h2('Batches'),
    p('<code>Product.all.each</code> loads every row into memory. For large tables use <code>find_each</code>, which loads 1,000 records at a time:'),
    K.rails(`
      Product.find_each { |product| product.update(slug: product.name.parameterize) }`, { title: 'find_each' }),
  ]);

  page('rails_query_conditions', () => [
    h2('Hash conditions'),
    K.rails(`
      Book.where(out_of_print: true)
      Book.where(year: 2000..2010)
      Book.where(author_id: [1, 2, 3])
      Book.where.not(status: "draft")
      Book.where(category: "fiction").or(Book.where(featured: true))`, { title: 'Hash conditions', result: 'SELECT "books".* FROM "books" WHERE "books"."year" BETWEEN 2000 AND 2010', label: 'SQL for the range' }),
    h2('String conditions with placeholders'),
    p('For SQL that a hash cannot express, use a string with <code>?</code> or named placeholders. Rails quotes the values safely:'),
    K.rails(`
      Book.where("price < ? AND title LIKE ?", 20, "%ruby%")
      Book.where("published_on >= :from", from: 1.month.ago)`, { title: 'Placeholders' }),
    h2('SQL injection'),
    K.rails(`
      # Unsafe: the user's text becomes part of the SQL.
      Book.where("title = '#{params[:title]}'")

      # Safe: the value is sent separately.
      Book.where(title: params[:title])
      Book.where("title = ?", params[:title])`, { title: 'Never interpolate input' }),
    K.warn('Building SQL with <code>#{}</code> interpolation. Input such as <code>\' OR 1=1 --</code> changes the query. Always use a hash or placeholders. Column names in <code>order</code> must come from an allow-list.'),
  ]);

  page('rails_n_plus_one', () => [
    h2('The N+1 query problem'),
    p('This code runs one query for the books and then one more query for <b>each</b> book’s author — 11 queries for 10 books:'),
    K.rails(`
      books = Book.limit(10)
      books.each { |book| puts book.author.name }`, { title: 'N+1', result: 'SELECT "books".* FROM "books" LIMIT 10\nSELECT "authors".* FROM "authors" WHERE "authors"."id" = 1 LIMIT 1\nSELECT "authors".* FROM "authors" WHERE "authors"."id" = 2 LIMIT 1\n... 8 more', label: 'SQL' }),
    h2('Fix it with includes'),
    K.rails(`
      books = Book.includes(:author).limit(10)
      books.each { |book| puts book.author.name }`, { title: 'Eager loading', result: 'SELECT "books".* FROM "books" LIMIT 10\nSELECT "authors".* FROM "authors" WHERE "authors"."id" IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)', label: 'SQL' }),
    table(['Method', 'How it loads'], [
      ['<code>preload</code>', 'Always a separate query per association'],
      ['<code>eager_load</code>', 'One query with LEFT OUTER JOIN'],
      ['<code>includes</code>', 'Chooses: preload, or eager_load when you filter on the association'],
      ['<code>joins</code>', 'INNER JOIN for filtering only — does not load the association'],
    ]),
    h2('strict_loading'),
    p('<code>strict_loading</code> raises an error when an association is loaded lazily, so N+1 queries are caught in development and tests:'),
    K.rails(`
      class Book < ApplicationRecord
        self.strict_loading_by_default = true
      end

      Book.first.author`, { title: 'strict_loading', result: 'ActiveRecord::StrictLoadingViolationError: `Book` is marked for strict_loading. The Author association named `:author` cannot be lazily loaded.' }),
  ]);

  page('rails_scopes_enums', () => [
    h2('Scopes'),
    p('A scope gives a name to a common query. Scopes return relations, so they chain with each other and with <code>where</code>:'),
    K.rails(`
      class Product < ApplicationRecord
        scope :in_stock, -> { where("inventory_count > 0") }
        scope :cheaper_than, ->(price) { where(price: ...price) }
      end

      Product.in_stock.cheaper_than(20).order(:price)`, { title: 'app/models/product.rb' }),
    h2('Enums'),
    p('An enum maps names to integers (or strings) stored in one column, and adds query and predicate methods:'),
    K.rails(`
      class Order < ApplicationRecord
        enum :status, { pending: 0, paid: 1, shipped: 2, cancelled: 3 }
      end

      order = Order.create(status: :pending)
      order.paid!
      order.paid?
      Order.shipped.count`, { title: 'app/models/order.rb', result: 'true\nSELECT COUNT(*) FROM "orders" WHERE "orders"."status" = 2', label: 'Result and SQL' }),
    K.warn('Reordering or removing enum values after data exists. The database stores the numbers, so changing the mapping changes the meaning of saved rows. Use an explicit hash, as above.'),
  ]);

  page('rails_active_model', () => [
    h2('Active Model'),
    p('Active Model gives plain Ruby classes the model features of Active Record — validations, attributes, naming and conversion — without a database table. Use it for form objects and service inputs.'),
    K.rails(`
      class ContactForm
        include ActiveModel::Model
        include ActiveModel::Attributes

        attribute :email, :string
        attribute :message, :string
        attribute :copy_me, :boolean, default: false

        validates :email, :message, presence: true
      end

      form = ContactForm.new(email: "ada@example.com", copy_me: "1")
      form.copy_me
      form.valid?
      form.errors.full_messages`, { title: 'app/models/contact_form.rb', result: 'true\nfalse\n["Message can\'t be blank"]' }),
    p('Because it behaves like a model, <code>form_with model: @contact_form</code> works with it, and errors display the same way.'),
    K.tip('<code>ActiveModel::Attributes</code> casts values: the form string <code>"1"</code> becomes <code>true</code>.'),
  ]);
})();
