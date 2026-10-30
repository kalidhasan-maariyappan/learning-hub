const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname,'records.json');
const records = JSON.parse(fs.readFileSync(file,'utf8'));
const bank=[];
const add=(re,a,e,x,p=[],url='')=>bank.push({re,a,e,x,p,url});
const guides='https://guides.rubyonrails.org/';
add(/(?:difference.*Ruby.*Rails|Ruby.*different.*Python|Rails.*similar.*Python|Rails compare to Django)/i,
 'Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.',
 'Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.',
 'Ruby: puts "hello"\nRails: bin/rails new shop\nPython web framework comparison: Rails versus Django',
 ['A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.']);
add(/(?:^What (?:is|exactly do you know about) Ruby on Rails|^Explain what Ruby on Rails is|^(?:What are )?(?:the )?(?:benefits|advantages).*using (?:Ruby on Rails|Rails)\b|^Why Ruby on Rails\b|^What.*like.*Rails)/i,
 'Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.',
 'Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.',
 'bin/rails new shop\ncd shop\nbin/rails generate scaffold Product name:string price:decimal\nbin/rails db:migrate\nbin/rails server',[],guides+'getting_started.html');
add(/(?:MVC|Models, Views, and Controllers|three components of Rails|components of Rails)/i,
 'MVC separates domain/data behavior in models, presentation in views, and request coordination in controllers.',
 'The router dispatches a request to a controller action. The action loads or changes domain objects and renders a view or another representation, or returns a redirect. Active Record models often provide persistence, but a model need not inherit from Active Record. Views should avoid database queries, and complex workflows can live in services or other domain objects.',
 '# app/controllers/posts_controller.rb\ndef show\n  @post = Post.find(params[:id])\nend\n# app/views/posts/show.html.erb\n<h1><%= @post.title %></h1>',[],guides+'getting_started.html');
add(/(?:Object.Relationship.Model|\bORM\b|role of Active Record|^What is (?:an? |Rails )?Active ?Record\b|^Explain (?:what|the purpose of) Active ?Record|^What do you understand about Rails Active Record|what.*Active Records Rail)/i,
 'ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.',
 'ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.',
 'class User < ApplicationRecord\n  has_many :posts\nend\nUser.where(active: true).order(:id).limit(20)',
 ['ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.'],guides+'active_record_basics.html');
add(/(?:Active Record and Active Model)/i,'Active Record adds database persistence and ORM behavior; Active Model provides reusable model interfaces without requiring a database table.',
 'Use ActiveModel::Model for a form or service input object with validations and naming conventions. Use ApplicationRecord for persisted relational records. Active Model underpins parts of Active Record but does not itself provide the relational query interface.',
 'class ContactForm\n  include ActiveModel::Model\n  attr_accessor :email\n  validates :email, presence: true\nend',[],guides+'active_model_basics.html');
add(/(?:How do you define a User model|ApplicationRecord class)/i,'Define User as a subclass of ApplicationRecord; ApplicationRecord is the application’s abstract Active Record base class.',
 'The User class maps to users by convention. Shared model configuration can live in ApplicationRecord. Defining a Ruby class alone does not create a database table; use a migration. Keep application-wide callbacks in the base class rare because they affect every model.',
 'class ApplicationRecord < ActiveRecord::Base\n  primary_abstract_class\nend\nclass User < ApplicationRecord\nend');
add(/override table name/i,'Assign self.table_name in the model when a legacy table does not follow Rails naming conventions.',
 'The override changes the table used for model persistence and queries. Check primary-key and foreign-key configuration separately, and preserve conventions unless an existing schema requires a different mapping.',
 'class Product < ApplicationRecord\n  self.table_name = "legacy_products"\nend');
add(/override primary key/i,'Assign self.primary_key to the column serving as the model’s primary key.',
 'The database must enforce appropriate uniqueness and nullability. Related models may need matching primary_key/foreign_key options. Changing the model setting does not modify database constraints.',
 'class Product < ApplicationRecord\n  self.primary_key = "product_id"\nend');
add(/(?:non.primary key columns|column named id)/i,'A non-primary-key column named id conflicts with Active Record’s id abstraction; avoid that schema when possible or use id_value to access that column.',
 'The issue is specifically a column called id that is not the model’s primary key, rather than a prohibition on ordinary non-primary-key columns. Migrations create an id primary key by default; disable the generated primary key with id: false before defining a different layout.',
 'create_table :legacy_rows, id: false do |t|\n  t.string :external_key, null: false\n  t.string :id\nend', ['Check the installed Rails version when using legacy primary keys or composite keys.']);
add(/reserved column/i,'Rails recognizes columns such as created_at, updated_at, lock_version, type, polymorphic *_type columns and association counter-cache columns.',
 'created_at/updated_at support timestamps, lock_version enables optimistic locking, and type activates single-table inheritance by default. These names are conventions, not a ban on all other columns. Counter caches ordinarily use the associated table’s plural name, such as comments_count.',
 'add_column :posts, :lock_version, :integer, default: 0, null: false\nadd_column :posts, :comments_count, :integer, default: 0, null: false');
add(/(?:find and find_by|find_by.*find|dynamic finders)/i,'find retrieves by primary key and raises ActiveRecord::RecordNotFound when missing; find_by uses attribute conditions and returns one match or nil.',
 'find_by! raises when no row matches. Without ordering, “first match” does not promise a business order. Dynamic finders such as find_by_email are convenience methods, but the explicit find_by(email: value) interface is clearer and easier to compose.',
 'User.find(42)\nUser.find_by(email: "dev@example.com")\nUser.find_by!(email: "dev@example.com")',[],guides+'active_record_querying.html');
add(/find_or_create_by/i,'find_or_create_by first looks up a matching row, then attempts creation if no match exists.',
 'It can race between the read and insert. Enforce uniqueness in the database; choose find_or_create_by! when validation failure should raise. create_or_find_by is another option when a suitable database unique constraint is present, with its own insert-first trade-offs.',
 'add_index :users, :email, unique: true\n# Application code:\nUser.find_or_create_by!(email: "dev@example.com")', ['A model uniqueness validation alone does not make concurrent creation safe.']);
add(/(?:validates_uniqueness|validate uniqueness|validations.*unique)/i,'A uniqueness validation improves feedback, but a unique database index is required to prevent duplicates under concurrent requests.',
 'The validator checks existing rows before an insert/update, leaving a race between two requests. Match the index to the business scope and normalization rule. Handle ActiveRecord::RecordNotUnique at a sensible boundary. Case handling and NULL semantics depend on the database and index definition.',
 'validates :email, presence: true, uniqueness: true\n# Migration:\nadd_index :users, :email, unique: true',[],guides+'active_record_validations.html');
add(/(?:custom validation|set up a custom validation)/i,'Register a model method with validate, or implement a reusable validator, and add errors when a rule fails.',
 'Custom validators should be deterministic and focus on the model’s valid state. Handle nil and blank inputs deliberately. An email substring check is not a reliable domain check: alice@example.com.evil.test contains example.com but is a different domain.',
 'class User < ApplicationRecord\n  validate :company_email\n  private\n  def company_email\n    domain = email.to_s.split("@", 2).last\n    errors.add(:email, "must use example.com") unless domain == "example.com"\n  end\nend', ['This example checks the domain policy; combine it with appropriate address validation and verification.']);
add(/(?:validation|Validations)/i,'Model validations check whether an object meets application rules before normal persistence; database constraints enforce integrity across every writer.',
 'Use validates for presence, length, numericality and other checks. valid? populates errors without saving. save returns false for validation failure; save! raises. Bulk SQL operations such as update_all bypass validations and callbacks, so important constraints must also exist in the database.',
 'class User < ApplicationRecord\n  validates :name, presence: true\n  validates :email, presence: true, uniqueness: true\nend\nuser = User.new\nuser.valid? # false\nuser.errors.full_messages',[],guides+'active_record_validations.html');
add(/(?:save.*save!|create!.*create)/i,'The non-bang persistence method reports validation failure without raising; its bang counterpart raises an exception on failure.',
 'save returns true or false and save! raises ActiveRecord::RecordInvalid for invalid data. create returns the instantiated object, which may be unpersisted; create! raises on validation failure. Database errors may raise even for non-bang calls, and callback aborts have their own failure behavior.',
 'user = User.create(email: nil)\nuser.persisted? # false if email is required\nUser.create!(email: nil) # raises ActiveRecord::RecordInvalid');
add(/(?:difference.*save and create)/i,'save persists an existing Ruby model instance, inserting or updating as needed; create instantiates a new object and attempts to save it.',
 'Both normally run validations and callbacks. A failed save returns false; a failed create returns an invalid, unpersisted object. Use save! or create! to raise on validation failure. Distinguish creating an object with new from persisting a row.',
 'user = User.new(name: "Ada")\nuser.save\nother = User.create(name: "Grace")');
add(/(?:transaction|transactions)/i,'Wrap related writes in an Active Record transaction so they commit together or roll back together on failure.',
 'Use bang persistence methods when invalid data must abort the block; save returning false alone does not automatically roll back earlier writes. Transactions are scoped to a database connection, not an atomic unit across unrelated databases or external APIs. ActiveRecord::Rollback rolls back without escaping the block. Run external side effects after commit or through an outbox.',
 'ApplicationRecord.transaction do\n  user.save!\n  order.save!\nend', ['Nested transactions normally join the outer transaction; requires_new: true uses a savepoint where supported.'],guides+'active_record_querying.html');
add(/(?:has_many.*through.*has_and_belongs|has many.*through.*has_and_belongs)/i,'has_many :through uses an explicit join model; has_and_belongs_to_many uses a join table without a model for the relationship.',
 'Use a join model when a relationship has attributes, validations, callbacks or its own identity. A HABTM join table conventionally has no id and contains the two foreign keys. Both sides still need appropriate database indexes and constraints.',
 'class User < ApplicationRecord\n  has_many :memberships\n  has_many :groups, through: :memberships\nend\nclass Membership < ApplicationRecord\n  belongs_to :user\n  belongs_to :group\nend');
add(/(?:join table)/i,'A join table stores keys linking records from two tables for a many-to-many relationship.',
 'The conventional table name orders the plural table names lexically: groups_users, not users_groups. A HABTM join table generally disables its primary key; has_many :through uses a join model and can have extra attributes. Add indexes and foreign keys based on the access pattern.',
 'bin/rails generate migration CreateJoinTableUsersGroups users groups\n# In the generated migration:\ncreate_join_table :users, :groups do |t|\n  t.index [:user_id, :group_id], unique: true\nend');
add(/(?:polymorphic)/i,'A polymorphic belongs_to stores both the associated record’s ID and its model type so one association can point to different model classes.',
 'The owner side declares has_many or has_one with as:, and the child declares belongs_to with polymorphic: true. The child belongs to one owner at a time, rather than simultaneously belonging to every model type. A conventional single foreign key cannot enforce references to multiple owner tables, so consider data integrity and class renames carefully.',
 'class Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\nclass Post < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n# Columns: commentable_id and commentable_type',[],guides+'association_basics.html');
add(/(?:association|has_many and belongs_to)/i,'Associations describe model relationships using belongs_to, has_one, has_many, has_many :through, has_one :through, or has_and_belongs_to_many.',
 'A belongs_to normally places the foreign key on the declaring model; has_many places it on the associated rows. belongs_to alone does not imply a one-to-one relationship. Use a unique foreign-key index for a true one-to-one relationship. Migrations must create the required columns and constraints; declaring association macros alone does not alter the schema.',
 'class Author < ApplicationRecord\n  has_many :books\nend\nclass Book < ApplicationRecord\n  belongs_to :author\nend\n# books.author_id references authors.id',[],guides+'association_basics.html');
add(/(?:single.table inheritance|\bSTI\b)/i,'Single-table inheritance stores a base class and its subclasses in one table, usually using a type column to select the Ruby subclass.',
 'Use it when subclasses truly share an is-a relationship and much of their schema. Unrelated types can create sparse tables, complicated validations and accidental type coupling. It differs from polymorphic associations, which link records of different models without making those models subclasses of a shared persisted type.',
 'class Vehicle < ApplicationRecord; end\nclass Car < Vehicle; end\nclass Truck < Vehicle; end\nCar.create! # vehicles.type is "Car"');
add(/(?:optimistic.*pessimistic|locking)/i,'Optimistic locking detects stale writes with lock_version; pessimistic locking acquires a database row lock for a transaction.',
 'Optimistic locking raises ActiveRecord::StaleObjectError and is useful when conflicts are uncommon. Pessimistic locking prevents conflicting writers from proceeding concurrently but can cause lock waits or deadlocks. Keep locked transactions short and lock resources in a consistent order. A row lock outside a surrounding transaction is released too early to protect later work.',
 'account.with_lock do\n  account.update!(balance: account.balance - 10)\nend');
add(/(?:includes|joins|preload|eager_load|eager loading|N\+1)/i,'joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.',
 'N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.',
 'posts = Post.includes(:author).limit(20)\nposts.each { |post| puts post.author.name }\n# Filtering via a join without loading all comments:\nPost.joins(:comments).where(comments: { approved: true }).distinct',
 ['includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.'],guides+'active_record_querying.html');
add(/(?:count|length|size|quantity).*(?:length|size)|Explain what (?:count|length|size) does/i,'For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.',
 'These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.',
 'posts = user.posts\nposts.count   # typically SELECT COUNT(*)\nposts.length  # loads records\nposts.size    # uses loaded records now', ['The source claim that Active Record size is always an alias for length is wrong.'], 'https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html');
add(/counter_cache/i,'A counter cache stores an association count on the parent, updated as child records are created or destroyed through supported Active Record operations.',
 'Declare counter_cache on the belongs_to side and add/backfill the parent count column. size can use the counter when the association is unloaded; count generally still queries. Direct SQL and bulk updates can bypass maintenance, so plan reconciliation and concurrent backfill carefully.',
 'class Comment < ApplicationRecord\n  belongs_to :post, counter_cache: true\nend\n# posts.comments_count integer default 0, null: false\npost.comments.size');
add(/(?:find_each|large number of database records|large datasets|large data imports|data imports or exports)/i,'Process large tables in bounded batches, paginate user interfaces, and stream exports instead of building everything in memory.',
 'find_each iterates records in batches; in_batches exposes a relation per batch for bulk work. Use stable ordering/cursors, bound transaction size, and account for records changing during a run. For imports validate and stage data, use idempotent upserts with unique constraints, and record progress. CSV.generate_stream is not a Ruby standard CSV API.',
 'User.where(active: true).find_each(batch_size: 500) do |user|\n  ExportRowJob.perform_later(user.id)\nend\n# For CSV output, write each row to an IO:\nCSV.open("users.csv", "w") { |csv| User.find_each { |u| csv << [u.id, u.email] } }');
add(/(?:query optimization|optimi[sz]e.*quer|slow SQL|slow database)/i,'Measure the query and request first, then reduce unnecessary rows/work, fix N+1 access, and add indexes justified by the query plan.',
 'Use SQL logs and database EXPLAIN, or EXPLAIN ANALYZE in a suitable environment, to inspect scans, joins, estimates and sorts. Select needed columns, paginate, batch writes and avoid repeated queries. Check query count and latency before and after the change. Caching can help repeated reads but should not hide an incorrect query or stale authorization boundary.',
 'User.where(active: true).order(:id).limit(100).pluck(:id, :email)\n# Inspect the generated SQL and plan before adding an index.',[],guides+'active_record_querying.html');
add(/(?:database index|database indexing|importance of.*index)/i,'An index accelerates suitable lookups, joins and ordering at the cost of storage and write overhead.',
 'Choose column order to match real filter/sort patterns; a composite index is not interchangeable with every single-column index. Unique indexes also enforce integrity. For large PostgreSQL tables, consider concurrent creation in a separate migration that disables the surrounding DDL transaction, after checking adapter support.',
 'add_index :orders, [:user_id, :created_at]\nadd_index :users, :email, unique: true');
add(/(?:SQL injection|parameterized queries)/i,'Bind untrusted values through Active Record hash conditions or placeholders, and allowlist SQL identifiers such as sort columns.',
 'Parameter binding protects values, not arbitrary SQL structure. Avoid interpolating params into where, order, select or find_by_sql. LIKE patterns also need escaping when user percent/underscore characters should be literal. Authorization and tenant scoping remain separate requirements.',
 'User.where(email: params[:email])\nUser.where("name LIKE ?", "%#{User.sanitize_sql_like(params[:q].to_s)}%")',[],guides+'security.html');
add(/(?:custom SQL queries)/i,'Use SQL or Arel when the relational operation is clearer or unsupported by the normal query interface, while binding values safely.',
 'Keep SQL adapter-aware, select only necessary columns, and test the plan and returned types. Model.find_by_sql returns model objects; connection-level select_all returns result rows. Avoid string interpolation of request values or untrusted identifiers.',
 'User.find_by_sql(["SELECT * FROM users WHERE created_at >= ?", 1.week.ago])');
add(/(?:query interface)/i,'Active Record relations build composable SQL queries with methods such as where, joins, order, select, limit, group and having.',
 'Relations are normally lazy until materialized by iteration, to_a, first or other terminal operations. Methods such as pluck and count execute focused queries without loading full models. Use scopes to name domain-level filters and examine generated SQL when performance matters.',
 'Order.where(status: "paid").group(:user_id).having("COUNT(*) > ?", 3).count');
add(/(?:lazy loading)/i,'A relation or association is normally loaded only when its records are needed.',
 'Constructing User.where(active: true) builds a relation. Iterating it executes SQL. Once an association has loaded, later access can reuse its in-memory target. Accessing an unloaded association inside a collection loop causes N+1 queries; preload the associations you need.',
 'users = User.where(active: true) # builds a relation\nusers.to_a # executes SQL');
add(/(?:scope in Rails|Rails scopes|scopes in Rails|scope in a model)/i,'A scope is a named, composable query expressed as an Active Record relation.',
 'Use a lambda for values that change with time so they are evaluated when the scope runs, rather than at class load. Scopes should return a relation; class methods are appropriate when logic is more complex. Avoid broad default scopes that unexpectedly affect writes or administrative queries.',
 'scope :recent, -> { where("created_at >= ?", 1.week.ago) }\nPost.published.recent.order(:id)');
add(/(?:Rails router.s scope)/i,'scope groups routes with common path, controller module, helper prefix, or constraints without necessarily adding all of them.',
 'A path scope only prefixes URLs; namespace normally prefixes the path, Ruby controller module and helper names together. Check bin/rails routes to confirm the generated interface.',
 'scope path: "/admin", module: "admin", as: "admin" do\n  resources :users\nend');
add(/(?:request lifecycle|request-response|request flow|controller action lifecycle|request.response cycles|HOW Web Works)/i,'A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.',
 'The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.',
 'GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response',[],guides+'action_controller_overview.html');
add(/(?:controller classes|sub.directory app\/controllers|subdirectory app\/controllers|role of a controller|purpose of a controller|^What is a Rails Controller|Action Controller)/i,'Controllers coordinate HTTP requests and responses; Rails finds controller classes in app/controllers, while app/helpers holds view helper modules.',
 'The router selects an action. Controllers handle request-level concerns such as permitted input, resource authorization, response format and status. Model/domain objects own persistence and business invariants. Helpers are primarily for presentation; they are not a general dumping ground for model or controller logic.',
 'class PostsController < ApplicationController\n  def show\n    @post = Post.find(params[:id])\n  end\nend');
add(/(?:define.*route|routes\.rb|handle routing|\bREST\b|restful|list all routes|CRUD|following.*paths|What paths)/i,'Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.',
 'The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.',
 'resources :posts do\n  member { get :comments }\n  collection { post :bulk_upload }\nend\n# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload',[],guides+'routing.html');
add(/(?:GET, POST|HTTP methods)/i,'GET retrieves without changing server state; POST submits a new operation; PUT replaces a representation; PATCH applies changes; DELETE requests removal.',
 'GET is safe and idempotent. PUT and DELETE are idempotent in their intended state effect; their repeated HTTP responses need not be identical. POST is not guaranteed idempotent, but an application can enforce idempotency keys. A GET response can change as data changes; idempotence is not a promise of identical response bytes.',
 'GET /posts/1\nPOST /posts\nPATCH /posts/1\nDELETE /posts/1');
add(/(?:nested resources|nested resource|nested forms)/i,'Nested routes express a parent-child URL relationship; nested forms edit associated models using fields_for and accepts_nested_attributes_for.',
 'For routes, authorize the child through its parent rather than trusting unrelated IDs. Keep nesting shallow. For forms, permit the nested attribute keys explicitly and consider validation/error handling and reject_if/allow_destroy behavior.',
 'resources :posts do\n  resources :comments, shallow: true\nend\n# Controller lookup:\n@comment = current_user.posts.find(params[:post_id]).comments.find(params[:id])');
add(/(?:polymorphic routes)/i,'Polymorphic route helpers infer a named route from a model instance or an array of namespace/parent/model arguments.',
 'They use model naming and persistence state to choose new/member/collection helpers. This is separate from a polymorphic database association.',
 'polymorphic_path(@post)\npolymorphic_path([:admin, @post])\nform_with(model: [@post, @comment])');
add(/(?:render and render_to_string)/i,'render sets the controller response body, while render_to_string returns rendered output as a Ruby string.',
 'Both use the rendering system. Use render_to_string when building an email fragment, generating a document, or composing content without immediately assigning the HTTP response. Neither operation executes another controller action.',
 'html = render_to_string(partial: "receipt", locals: { order: @order })\nrender html: html');
add(/(?:render.*redirect|redirect.*render)/i,'render builds the response within the current request; redirect_to returns an HTTP redirect so the client makes another request.',
 'Rendering another template does not run that template’s controller action, so initialize its required data. Neither render nor redirect_to is a Ruby control-flow return; use return or conditional structure to avoid unintended continuation or double rendering. Use an appropriate failure status for invalid submissions.',
 'if @post.save\n  redirect_to @post, status: :see_other\nelse\n  render :new, status: :unprocessable_entity\nend');
add(/(?:link_to and button_to)/i,'link_to produces an anchor for navigation; button_to generates a form with a submit button and is suitable for state-changing actions.',
 'An ordinary anchor makes a GET request. Rails-UJS and Turbo use different data attributes to issue other methods from links. Prefer button_to for deletion when possible, preserve CSRF protection, and use a 303 redirect after destructive form actions when appropriate.',
 '<%= link_to "Read", post_path(@post) %>\n<%= button_to "Delete", post_path(@post), method: :delete %>');
add(/(?:layout|yield in Rails)/i,'A layout wraps view content, and yield inserts the current view or a named content_for section.',
 'Use partials for reusable pieces and nested layouts when pages need an additional wrapper inside a shared application layout. content_for captures named sections; a block form needs do and a matching end. A named section only appears if the selected layout yields that name.',
 '# layout\n<title><%= content_for?(:title) ? yield(:title) : "Shop" %></title>\n<main><%= yield %></main>\n# view\n<% content_for :title, "Products" %>',[],guides+'layouts_and_rendering.html');
add(/(?:partial|main parts of a Rails view)/i,'A partial is a reusable view template with an underscore-prefixed filename, rendered with locals or model-based rendering.',
 'Layouts supply shared page structure; normal templates render action-specific content; partials factor reusable pieces; helpers handle small presentation operations. Prefer explicit locals when reuse requires a clear data contract, and avoid database queries in partial loops.',
 '# app/views/posts/_post.html.erb\n<h2><%= post.title %></h2>\n# Another view:\n<%= render partial: "posts/post", locals: { post: @post } %>');
add(/(?:helpers?|logic behind the helper)/i,'Helpers contain reusable presentation logic called from views, such as formatting a date or building a small HTML fragment.',
 'Place domain rules and database access in domain/model/service code. Return safe HTML only when it is constructed or escaped correctly. Avoid marking user input html_safe. Helper modules belong in app/helpers and can be exposed to views by Rails.',
 'module ApplicationHelper\n  def display_date(date)\n    date ? l(date, format: :long) : "—"\n  end\nend');
add(/(?:flash hash|flash message|purpose of flash)/i,'flash stores temporary messages available to the current and following request; use flash.now for messages intended only for the current render.',
 'Flash is useful after redirecting following a successful update. If rendering an invalid form, flash.now avoids the message appearing again on the next request. Do not put sensitive or large data in a cookie-backed flash/session.',
 'redirect_to @post, notice: "Saved"\n# On validation failure without redirect:\nflash.now[:alert] = "Please correct the errors"\nrender :new, status: :unprocessable_entity');
add(/(?:pass data from a controller to a view)/i,'Set controller instance variables for the rendered template, or pass explicit locals when rendering.',
 'Each request normally has its own controller instance; assigning @orders does not make that variable global across users. Reusing a view with different data is not inherently a data leak. The security requirement is to scope/authorize the queried records and only display intended fields.',
 '@post = current_user.posts.find(params[:id])\n# View: <%= @post.title %>\n# Partial: render partial: "post", locals: { post: @post }');
add(/(?:params object|parameters|mass.assignment|handle parameters)/i,'Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.',
 'Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.',
 'def user_params\n  params.require(:user).permit(:name, :email)\nend\n# Rails 8+: params.expect(user: [:name, :email])\n# Ownership must still be checked: current_user.posts.find(params[:id])',
 ['Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.'],guides+'action_controller_overview.html');
add(/(?:CSRF|XSS)/i,'CSRF tricks a browser into sending an unwanted authenticated request; XSS injects script into a trusted page. Rails mitigates them through request forgery protection and output escaping.',
 'Keep state changes off GET, retain authenticity-token verification for cookie-authenticated browser requests, and use secure session cookies. ERB escapes normal string output, but raw/html_safe can undo that protection. SameSite is additional defense and CORS is not a substitute for CSRF protection. A bearer-only API has a different CSRF threat model.',
 '<%= form_with(model: @post) do |f| %>\n  <%= f.text_field :title %>\n<% end %>\n<!-- Normal escaped output: -->\n<%= @post.title %>',[],guides+'security.html');
add(/(?:session|cookies)/i,'Rails’ default CookieStore keeps encrypted and authenticated session data in the browser cookie; other session stores keep data server-side behind a session identifier.',
 'Store a small user identifier, not passwords, and rotate/reset the session after authentication to mitigate fixation. Use HTTPS and suitable Secure, HttpOnly and SameSite settings. Ordinary unsigned cookies are client-controlled and must not be trusted as proof of identity. Cookie sessions have a small size limit and different revocation trade-offs from server-side sessions.',
 'if user.authenticate(params[:password])\n  reset_session\n  session[:user_id] = user.id\nend\n# Logout:\nreset_session',[],guides+'security.html');
add(/(?:security|secure a Rails app|secure API endpoints|API authentication)/i,'Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.',
 'Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.',
 '# Scope lookup to the authenticated user, then enforce the action policy:\n@post = current_user.posts.find(params[:id])\nauthorize @post\n@post.update!(params.require(:post).permit(:title))',[],guides+'security.html');
add(/(?:unauthorized users can modify|administrators|role.based authorization|authorization.*past)/i,'Authenticate the caller, then authorize the requested action on the specific resource using a policy or equivalent explicit rule.',
 'Strong Parameters only controls writable attributes; it does not establish ownership. Scope lookups to the current user or tenant, deny by default, and test ordinary users, owners, admins and unauthenticated callers. Hiding a link in the UI does not secure the endpoint.',
 '# Assuming authentication and a configured Pundit policy:\n@user = User.find(params[:id])\nauthorize @user, :update?\n@user.update!(user_params)');
add(/(?:authentication.*authorization|user authentication|simple authentication)/i,'Authentication establishes identity; authorization checks which actions that identity may perform.',
 'Rails 8 has an authentication generator that supplies a starting point, and Devise is a commonly used alternative. has_secure_password handles password hashing/authentication when configured with bcrypt and a password_digest column. Pundit and CanCanCan are authorization libraries. They require application-specific permission rules; installing a gem does not decide business access policy.',
 'bin/rails generate authentication\n# Or in an existing password-based User model:\nhas_secure_password\n# Verify with user.authenticate(password)',[],guides+'security.html');
add(/(?:OAuth authentication)/i,'Use a maintained OAuth/OIDC integration to delegate sign-in, and validate the full protocol response rather than treating an arbitrary token as trusted.',
 'Choose an authorization-code flow with state and, where appropriate, PKCE. For OpenID Connect validate nonce, issuer, audience and signatures. Map the verified provider identity to a local account carefully and avoid linking accounts based on an unverified email address. Doorkeeper serves OAuth authorization for your own API; OmniAuth integrates external sign-in providers.',
 'Provider callback → verify state/code/token → locate account by issuer and subject → establish a new local session');
add(/(?:has_secure_password)/i,'has_secure_password adds password assignment, bcrypt hashing and authentication helpers to a model with a password_digest column.',
 'Add bcrypt and never store plaintext or reversible passwords. The standard password validation checks required data and bcrypt limits, but application policy such as breached-password checks and login throttling remains your responsibility. Treat reset tokens and session rotation as part of the complete authentication design.',
 'class User < ApplicationRecord\n  has_secure_password\nend\nuser = User.create!(password: "a sufficiently long passphrase")\nuser.authenticate("wrong") # false');
add(/(?:background jobs|Active ?Job|Solid Queue|background job queues)/i,'Active Job defines and enqueues jobs through a queue adapter; a worker backend such as Solid Queue or Sidekiq performs them outside the web request.',
 'Use jobs for email, imports and expensive independent work. Solid Queue is database-backed and is the Rails 8 default; Sidekiq uses Redis and multiple worker threads. Design jobs for retries and duplicate delivery, pass stable identifiers, bound timeouts and concurrency, and monitor queue latency/failures. Enqueue after commit when a job depends on committed data.',
 'class WelcomeJob < ApplicationJob\n  def perform(user_id)\n    UserMailer.welcome_email(User.find(user_id)).deliver_now\n  end\nend\nWelcomeJob.perform_later(user.id)',
 ['A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.'],guides+'active_job_basics.html');
add(/(?:thousands of confirmation emails)/i,'Queue email delivery with Active Job and an appropriately configured durable backend, rather than sending thousands of messages inside an HTTP request.',
 'Enqueue after the user transaction commits, monitor delivery failures and queue age, respect provider rate limits, and make the action idempotent where possible. Break bulk campaigns into manageable batches and do not assume a successful enqueue means the email was delivered.',
 'UserMailer.with(user: user).confirmation.deliver_later');
add(/(?:weekdays and weekends|schedule tasks|schedule.*Rails)/i,'A delayed job and a recurring business-calendar schedule are different requirements; a one-day delay does not automatically skip weekends or holidays.',
 'The source weekday/weekend question omits the schedule and timezone, so there is no unique exact answer. Clarify recurrence, business hours, timezone, holidays and daylight-saving rules, then configure the selected scheduler. For a one-off delay use set(wait:) or wait_until:. Solid Queue recurring schedules and cron-backed tools require explicit schedule configuration.',
 'MyJob.set(wait_until: Time.zone.parse("2026-11-02 09:00")).perform_later', ['Missing source context: the referenced schedule is not supplied.']);
add(/(?:callbacks|before_save|after_save|before_validation|before_create|callback.*default|filters|before_action|around_action|after_action)/i,'Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.',
 'Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.',
 'before_validation :normalize_name\nprivate\ndef normalize_name\n  self.name = name.to_s.strip\nend\n# External side effect after persistence:\n# after_commit :enqueue_notification, on: :create',[],guides+'active_record_callbacks.html');
add(/(?:delete|destroy)/i,'delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.',
 'destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.',
 'class Post < ApplicationRecord\n  has_many :comments, dependent: :destroy\nend\nPost.find(1).destroy\n# Direct deletion bypasses those model callbacks:\nPost.where(id: 2).delete_all');
add(/(?:observers)/i,'Callbacks attach lifecycle hooks to a model; observers were a legacy mechanism for separating reaction code into observer objects.',
 'Observers were removed from Rails core into a separate gem in Rails 4. Modern applications often use explicit services, domain events, after_commit or an outbox instead. The difference is organization and coupling, not a short versus long lifetime for callback behavior.',
 '# Explicit application service:\nApplicationRecord.transaction do\n  user.save!\nend\nWelcomeJob.perform_later(user.id)', ['The source lifetime-based explanation of observers versus callbacks is misleading.']);
add(/(?:concern|fat models|skinny controllers|reducing duplication)/i,'A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.',
 'A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.',
 'module Noteable\n  extend ActiveSupport::Concern\n  included do\n    has_many :notes, as: :noteable, dependent: :destroy\n  end\nend',[], 'https://api.rubyonrails.org/classes/ActiveSupport/Concern.html');
add(/(?:service objects|Service Objects)/i,'A service object is a Ruby object representing an application operation, such as capturing a payment or importing a file.',
 'It coordinates domain objects and explicit dependencies and gives the operation a testable boundary. Define transaction ownership, failure results, retries and idempotency deliberately. It is not a required Rails framework class. Service objects often know the business domain, contrary to the source claim that they must have no domain knowledge.',
 'class PublishPost\n  def call(post)\n    post.update!(published_at: Time.current)\n    post\n  end\nend');
add(/(?:delegat)/i,'delegate forwards selected methods to a named object, reducing repetitive forwarding code.',
 'This exposes a smaller interface without inheritance. Choose prefix: when forwarding could clash with local methods, and allow_nil: only if missing targets should return nil. Delegation does not automatically remove all domain or framework coupling.',
 'class User < ApplicationRecord\n  has_one :profile\n  delegate :full_name, to: :profile, prefix: true, allow_nil: true\nend\nuser.profile_full_name');
add(/(?:large.*codebase|structure.*large|code.*maintainable|design patterns|anti.pattern|code quality|large applications)/i,'Organize code around cohesive business responsibilities, keep request coordination small, and add explicit service, query, form or policy objects when they clarify real complexity.',
 'Avoid replacing every method with a pattern just to satisfy a slogan. Establish clear module boundaries and dependency direction, test the boundaries, monitor coupling and use automated formatting/static analysis. Engines are useful for reusable bounded components but add integration cost. State what changed in a real project and why it improved maintainability.',
 'app/services/checkout.rb\napp/queries/recent_orders.rb\napp/policies/order_policy.rb\napp/models/order.rb');
add(/(?:engine)/i,'A Rails engine packages Rails components and integrations that can be embedded in a host application.',
 'A mountable engine can isolate its namespace and own routes, controllers, models, views, migrations and assets. Define its public interface and avoid depending on arbitrary host internals. Many Rails plugins are delivered as gems containing an engine or railtie.',
 'bin/rails plugin new billing --mountable\n# Host routes:\nmount Billing::Engine, at: "/billing"',[],guides+'engines.html');
add(/(?:asset|Webpacker)/i,'Rails asset management organizes, fingerprints and serves browser assets. New Rails 8 applications use Propshaft; bundling/transpilation is a separate concern.',
 'Older Sprockets applications often combine concatenation, preprocessing and minification in the pipeline. Propshaft focuses on digesting and serving ready-to-use assets; use jsbundling-rails/cssbundling-rails or another appropriate build tool when required. importmap-rails loads browser ES modules without a Node build. Webpacker is a legacy integration, not the default recommendation for a new application.',
 'RAILS_ENV=production bin/rails assets:precompile\n# Reference a fingerprinted asset through a helper:\n<%= image_tag "logo.png" %>',
 ['Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.'],guides+'asset_pipeline.html');
add(/(?:importmap)/i,'importmap-rails maps JavaScript module names to browser-loadable module URLs, allowing ES modules without a JavaScript bundling step.',
 'Pin reviewed dependency versions and choose local/vendor or CDN distribution deliberately. It does not transpile TypeScript/JSX or resolve every Node-specific package into a browser-ready form. Use a bundler when your source requires transformation or a package is not browser-compatible.',
 'bin/importmap pin alpinejs\n# app/javascript/application.js\nimport Alpine from "alpinejs"\nwindow.Alpine = Alpine\nAlpine.start()');
add(/(?:Hotwire|Turbo|Turbolinks)/i,'Hotwire combines Turbo’s navigation, frames and stream updates with Stimulus controllers for small client-side behavior.',
 'Turbo Drive handles navigation, frames update isolated regions, and streams describe DOM changes delivered over HTTP or WebSockets. Turbolinks is the predecessor to Turbo Drive and belongs to older applications. Real-time broadcasting still needs authorization, safe stream subscriptions and reliable server operations.',
 '<%= turbo_stream_from @conversation %>\n<%= turbo_frame_tag "messages" do %>\n  <%= render @messages %>\n<% end %>');
add(/(?:Active Storage|file upload|file attachment|image and file uploads)/i,'Active Storage attaches files to models and supports local or cloud-backed storage, direct uploads, metadata and image variants.',
 'Authorize uploads/downloads, impose size and content-type policies, and do not rely only on a supplied filename or browser MIME type. Isolate uploaded content and process expensive image/video work asynchronously. Direct uploads reduce web-server bandwidth but still require access controls, lifecycle cleanup and malware/content checks appropriate to the application.',
 'class User < ApplicationRecord\n  has_one_attached :avatar\nend\nuser.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png", content_type: "image/png")',[],guides+'active_storage_overview.html');
add(/(?:file downloads)/i,'Use send_data for generated bytes or send_file for an authorized file, or serve authorized Active Storage blobs through its supported delivery paths.',
 'Check ownership before locating or sending the file and never accept a raw user-supplied filesystem path. Use a safe filename/content type and content-disposition. Large generated exports are often better created in a job and served from object storage.',
 'authorize @report, :download?\nsend_data report_csv, filename: "report.csv", type: "text/csv", disposition: "attachment"');
add(/(?:caching|Rails\.cache)/i,'Caching stores reusable results to avoid repeating database, rendering or computation work; choose keys, expiry and invalidation based on the data’s lifetime.',
 'Use fragment/collection caching for views, low-level Rails.cache.fetch for computed values, and HTTP conditional caching where suitable. Include relevant tenant/user permissions in keys when content differs by audience. Russian-doll caching nests fragment caches with dependencies. Page/action caching are historical features extracted from Rails core; they are not universal modern defaults.',
 'Rails.cache.fetch(["product", product.id, product.updated_at], expires_in: 10.minutes) do\n  expensive_summary(product)\nend\n# View:\n<% cache @product do %><%= render @product %><% end %>',[],guides+'caching_with_rails.html');
add(/(?:performance|bottleneck|dashboard.*slow|slow.*dashboard)/i,'Find the bottleneck with measurements before changing code: request timings, SQL count/plans, allocation/memory data, and external-service latency.',
 'A dashboard often introduces N+1 queries or expensive aggregation, but verify the cause. Fix association loading, bounded data retrieval and indexes first; cache suitable aggregates and offload independent work. Recheck latency and throughput under realistic load. Memory retained after GC may reflect live objects, native allocations or allocator fragmentation, not just a Ruby object leak.',
 'User.includes(orders: :payments).limit(50)\n# Capture request duration, SQL duration/count and allocation count before/after.');
add(/(?:scale|scalab|high traffic|increased traffic)/i,'Scale stateless application workers behind a load balancer while measuring the database, cache, queue and external dependencies that actually limit throughput.',
 'Bound worker/thread counts and database connections; separate background work; use shared durable storage and caches where needed. Add indexes, caching and replicas only for demonstrated read patterns. Replicas introduce lag, and sharding adds operational complexity. Load-test the whole request path and plan deployment, monitoring and recovery capacity.',
 'Load balancer → multiple Puma processes → database/shared cache\nBackground queues → separate worker processes\nUploads → shared object storage');
add(/(?:multiple databases|two databases|many databases)/i,'Rails supports multiple database configurations, role switching for writing/reading, and horizontal sharding where configured.',
 'Declare connections on appropriate abstract model classes and configure database.yml with separate databases/roles. Plan migrations and connection pool capacity per database. Transactions are not automatically atomic across databases, and reading from replicas must account for lag.',
 'class AnimalsRecord < ApplicationRecord\n  self.abstract_class = true\n  connects_to database: { writing: :animals, reading: :animals_replica }\nend',[],guides+'active_record_multiple_databases.html');
add(/(?:connection pool)/i,'Rails maintains database connection pools so concurrent work can lease and return connections instead of opening a new connection per query.',
 'Set each pool to match the concurrency that can simultaneously need that database and account for every web/worker process and database role. A too-small pool causes checkout waits/timeouts; a large pool per process can exceed the server’s connection limit. Release connections after work and avoid holding a connection across slow external calls.',
 '# config/database.yml\nproduction:\n  adapter: postgresql\n  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>');
add(/(?:database\.yml|connect.*database)/i,'config/database.yml declares environment-specific database adapter, database and connection settings; keep production credentials in secure configuration.',
 'Use the pg adapter for PostgreSQL or mysql2 for MySQL and run migrations against the intended environment. A DATABASE_URL may supply deployment connection details. Check SSL and least-privilege access, and never commit live database passwords.',
 'production:\n  adapter: postgresql\n  url: <%= ENV["DATABASE_URL"] %>\n  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>');
add(/(?:multi.tenan)/i,'Multi-tenancy isolates data for different customers through scoped rows, separate schemas, or separate databases.',
 'Choose isolation based on operational cost, regulatory needs and scale. Row-based tenancy must scope every query, association, job, cache key and file path; database row-level security can add defense. Derive tenant identity from authenticated context, not merely a client parameter, and test cross-tenant access explicitly.',
 '@project = current_tenant.projects.find(params[:id])\n# Pass a tenant ID into a job, then re-establish and validate tenant context there.');
add(/(?:soft delete)/i,'A soft delete marks a row, commonly with deleted_at, instead of removing it.',
 'Decide how ordinary queries exclude deleted data, how administrators restore it, and how associations, unique indexes, audits and retention rules behave. Default scopes can hide records unexpectedly. Consider whether legal deletion requirements call for actual erasure rather than a soft flag.',
 'scope :kept, -> { where(deleted_at: nil) }\nrecord.update!(deleted_at: Time.current)');
add(/(?:pagination)/i,'Pagination returns a bounded page of records rather than loading an entire relation.',
 'Offset pagination is simple but gets expensive at large offsets and can shift under concurrent writes. Keyset pagination uses an indexed stable sort key and cursor for scalable sequential access. Always apply a deterministic order and cap page size.',
 'Post.order(id: :desc).where("id < ?", cursor).limit(25)\n# With a pagination library: Post.order(:id).page(params[:page]).per(25)');
add(/(?:search functionality)/i,'Use a search approach matched to requirements: indexed database queries/full-text search for simpler cases, or a separate search engine for richer ranking and scale.',
 'For PostgreSQL, tsvector/full-text search or pg_search can provide stemming and ranking. Elasticsearch adds an external index, requiring asynchronous indexing, retries, reindexing and consistency planning. Enforce tenant/authorization filtering in both indexing and result retrieval.',
 'Post.where("search_vector @@ plainto_tsquery(?)", params[:q].to_s)');
add(/(?:rate.limit|throttl)/i,'Rate limiting caps requests per identity or resource over a defined window, using a shared store when multiple app processes serve traffic.',
 'Choose the key carefully: user/account/API token is often better than IP alone. Use trusted proxy handling before reading client IP, expire counters atomically, and return 429 with a suitable Retry-After policy. Distinguish abuse limits from business quotas. Rails 8 supports controller rate limiting; Rack::Attack is another option.',
 'rate_limit to: 10, within: 3.minutes, only: :create\n# Apply an application-specific key and response policy as needed.');
add(/(?:monolithic|microservice|service.oriented)/i,'A monolith deploys the application as one unit; microservices split capabilities into independently deployed services communicating across explicit network interfaces.',
 'Rails supports either model. A modular monolith often gives clear boundaries with lower operational cost; services can help independent scaling or ownership but add partial failures, distributed tracing, schema/version evolution and data consistency concerns. Split along business boundaries after identifying a concrete need, not just because traffic grows.',
 'Checkout service → payment provider\nOrder state + transactional outbox → event worker → fulfillment service');
add(/(?:asynchronous processing.*beyond)/i,'Beyond durable jobs, Rails can support streaming responses, Action Cable/WebSockets and carefully bounded concurrent I/O.',
 'Choose the concurrency mechanism based on latency, durability and resource requirements. Threads or fibers can overlap I/O, but CPU-heavy parallelism depends on the Ruby implementation and often needs separate processes. Do not launch untracked request threads for work that must survive a process restart.',
 'Request → enqueue durable job → worker updates record → authorized Action Cable stream notifies the client');
add(/(?:Action ?Cable|WebSocket|real.time notifications)/i,'Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.',
 'Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.',
 'class NotificationsChannel < ApplicationCable::Channel\n  def subscribed\n    stream_for current_user\n  end\nend\nNotificationsChannel.broadcast_to(user, message: "Ready")',[],guides+'action_cable_overview.html');
add(/(?:internationalization|i18n|multi.language)/i,'Rails uses the I18n library and locale data to translate messages and localize dates, numbers and other presentation.',
 'Keep translations in config/locales, use t/l helpers, and select a permitted locale per request with I18n.with_locale so it does not leak between requests. Handle pluralization and missing translations, and keep timezone selection separate from language selection.',
 '# config/locales/en.yml\nen:\n  hello: "Hello"\n# Ruby:\nI18n.with_locale(:en) { I18n.t(:hello) }');
add(/(?:time zones)/i,'Use Rails time-zone-aware APIs for application/user time and store timestamps consistently, typically in UTC.',
 'Configure config.time_zone, use Time.current/Time.zone.now, and convert to the user’s zone for display. Scope per-request user zones with Time.use_zone. Calendar days are not always 24 hours around daylight-saving changes, so distinguish wall-clock schedules from elapsed durations.',
 'Time.use_zone(user.time_zone) { Time.current }');
add(/(?:testing|tests|test models|functional testing)/i,'Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.',
 'Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.',
 'test "rejects a blank title" do\n  post = Post.new(title: "")\n  assert_not post.valid?\n  assert_includes post.errors[:title], "can’t be blank"\nend',[],guides+'testing.html');
add(/(?:mock external APIs)/i,'Stub HTTP at the external boundary with a tool such as WebMock, or use reviewed VCR recordings for repeatable provider responses.',
 'Keep credentials and personal data out of recordings, match important request attributes, and test timeouts, rate limits and malformed responses. A stub validates your application’s behavior under the simulated contract; it does not prove the live provider still matches that contract.',
 'stub_request(:get, "https://api.example.test/status").to_return(status: 200, body: "{\"ok\":true}", headers: {"Content-Type" => "application/json"})');
add(/(?:debug|logs|logging|monitor|production.ready|errors in Ruby Rails)/i,'Use structured request/error context, logs, traces, metrics and focused debugging to identify the failing operation, then add a regression check.',
 'Log to the configured destination, often stdout in containers or log/<environment>.log locally. Filter secrets and personal data. Track latency, error rate, queue age, database saturation and resource usage. Use the debug gem or a local console for interactive inspection; do not expose development error consoles publicly. Apache logs live wherever the web server is configured, not at a universal Rails path.',
 'Rails.logger.info(event: "order_created", order_id: order.id, request_id: request.request_id)\n# config.filter_parameters += [:password, :token]',[],guides+'debugging_rails_applications.html');
add(/(?:exceptions|handle errors)/i,'Handle expected failures explicitly and map known exceptions to appropriate responses, while letting unexpected failures reach centralized reporting.',
 'rescue_from can map a specific controller-level exception to a response. Avoid blanket rescue of StandardError that hides bugs or returns success for failures. Keep detailed traces in protected logs and return safe error messages with meaningful status codes.',
 'rescue_from ActiveRecord::RecordNotFound do\n  render json: { error: "Not found" }, status: :not_found\nend');
add(/(?:ActiveSupport::Notifications)/i,'ActiveSupport::Notifications instruments named events and lets subscribers observe timing and payloads without tightly coupling producers to observers.',
 'Use built-in events such as sql.active_record or process_action.action_controller, or instrument a domain event. Keep subscribers cheap, filter sensitive payload data and avoid duplicate subscriptions during development reloads.',
 'ActiveSupport::Notifications.subscribe("process_action.action_controller") do |name, start, finish, id, payload|\n  Rails.logger.info(duration_ms: (finish - start) * 1000, controller: payload[:controller])\nend');
add(/(?:deploy|deployment|migrations in a high.traffic|database changes.*production|old version.*Rails|migrate.*old version)/i,'Deploy a tested build with explicit configuration, assets, secrets and compatible schema changes, plus monitoring and a rollback/recovery plan.',
 'For schema changes under live traffic, use expand-and-contract: add backward-compatible schema, deploy compatible code, backfill in bounded resumable batches, then enforce constraints/remove old columns later. Avoid long locks and assume rolling deployments run old/new code simultaneously. Upgrade legacy Rails stepwise through supported intermediate versions and review each version’s upgrade notes.',
 '1. Add a nullable replacement column.\n2. Deploy code compatible with both schemas.\n3. Backfill in batches and verify.\n4. Enforce constraints, switch reads, and remove the old column in a later release.');
add(/(?:environments|development.*production|configuration settings across)/i,'Rails has development, test and production environments with shared configuration and per-environment overrides.',
 'Use config/application.rb for shared settings, config/environments/<name>.rb for environment behavior, and credentials/environment variables for deployment-specific secrets. Development favors reload/debugging, production favors eager loading/caching and controlled error pages. RAILS_ENV selects the environment; testing is not the default environment name.',
 'RAILS_ENV=production bin/rails runner "puts Rails.env"');
add(/(?:application\.rb|initializers|initializer|environment\.rb|initialization process)/i,'config/application.rb defines application-wide settings; environment configuration specializes them, and initializers run during application boot.',
 'config/environment.rb loads the application and initializes it. Initializers configure libraries or integrations and normally require a restart after changes. Reloadable constants should not be permanently captured during boot; use supported reload hooks such as to_prepare when needed. Keep boot work fast and free of avoidable external dependencies.',
 '# config/application.rb\nconfig.time_zone = "UTC"\n# config/initializers/filter_parameter_logging.rb\nRails.application.config.filter_parameters += [:password]');
add(/(?:Zeitwerk|autoload)/i,'Zeitwerk maps constants to matching file paths and loads their definitions when referenced, with reloading in development and eager loading where configured.',
 'A file such as app/services/payments/capture.rb should define Payments::Capture. Follow directory namespaces and inflection rules; do not manually require application autoloadable files to work around mismatches. Code executed once at boot must not hold stale references to reloadable constants.',
 '# app/services/payments/capture.rb\nmodule Payments\n  class Capture\n  end\nend\n# Check naming compliance:\nbin/rails zeitwerk:check',[],guides+'autoloading_and_reloading_constants.html');
add(/(?:new Rails (?:project|application)|create a new Rails|generate a new Rails|pre.software requirements)/i,'Install compatible Ruby/Rails and generate the application with rails new, then prepare the database and start the development server.',
 'Select the database with -d and inspect rails new --help for options supported by the installed version. Modern default servers use Puma; WEBrick is historical. JavaScript options change by Rails version; --dev is not a web-server selector. An API-only or --skip-active-record application has different defaults.',
 'rails new shop -d postgresql\ncd shop\nbin/rails db:prepare\nbin/rails server -p 3000');
add(/(?:server command)/i,'bin/rails server starts the application’s web server, ordinarily Puma in a modern generated application.',
 'It listens on port 3000 by default; -p chooses a different port and -e selects an environment. Bind addresses, TLS/reverse proxy configuration and production worker sizing are separate deployment decisions.',
 'bin/rails server -p 4000\nbin/rails server -e production');
add(/(?:version of Rails)/i,'Run bin/rails --version inside the application to report the Rails version selected by that application’s bundle.',
 'A global rails --version may describe a different installation. Gemfile.lock gives the resolved dependency versions and bundle exec constrains commands to that bundle.',
 'bin/rails --version\nbundle exec rails --version\nruby -v');
add(/(?:Rails 4 and Rails 5)/i,'Rails 5 introduced major additions including Action Cable, API-only application generation, and ApplicationRecord as the application’s model base class.',
 'Rails 5 also made belongs_to required by default for new applications, subject to configuration. Explain this as historical version knowledge; both lines are old, so a production upgrade needs current maintenance/security review rather than stopping at Rails 5.',
 '# Rails 5+ application-level base model:\nclass User < ApplicationRecord\nend',[],guides+'5_0_release_notes.html');
add(/(?:improvements introduced in Rails 8)/i,'Rails 8 introduced modern defaults including Propshaft, Solid Queue, Solid Cache, Solid Cable, Kamal 2/Thruster deployment support and an authentication generator.',
 'Differentiate a framework release’s features from a particular app’s settings: upgrading does not require every application to replace its existing adapters immediately. Solid Queue is database-backed and can use SQLite, PostgreSQL or MySQL. Confirm Ruby and database requirements against the chosen Rails minor version.',
 'bin/rails generate authentication\n# New applications can use the database-backed Solid adapters without Redis.',[],guides+'8_0_release_notes.html');
add(/(?:migration|migrations|database state|database schema|schema changes)/i,'Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.',
 'Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.',
 'bin/rails generate migration AddAgeToUsers age:integer\n# Generated class version matches the app:\ndef change\n  add_column :users, :age, :integer\nend\nbin/rails db:migrate',
 ['ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.'],guides+'active_record_migrations.html');
add(/(?:db\/seeds|db:seed)/i,'bin/rails db:seed loads db/seeds.rb to populate baseline application data.',
 'Make seeds safe to rerun and distinguish reference data from test fixtures and production data backfills. Seeds are not automatically a safe migration mechanism for large changing datasets.',
 'Role.find_or_create_by!(name: "admin")\n# Run:\nbin/rails db:seed');
add(/(?:create a User model.*generator|controller for the subject|create a controller)/i,'Use Rails generators to create the relevant model or controller files, then inspect the generated code and routes.',
 'Generators provide a starting point, not business-complete application behavior. A model generator creates a migration; a controller generator only creates the requested actions/views/routes rather than a complete database resource.',
 'bin/rails generate model User name:string email:string\nbin/rails generate controller Subjects index show\nbin/rails db:migrate');
add(/(?:scaffold|scaffolding)/i,'Scaffolding generates starter model, migration, controller, view and test code for a resource’s CRUD behavior.',
 'Modern Rails generates files that you review and customize. Historical dynamic scaffolding generated behavior at runtime and is not a current standard feature. Add authorization, valid input rules, suitable constraints and intentional UI behavior before relying on generated code in production.',
 'bin/rails generate scaffold Product name:string price:decimal\nbin/rails db:migrate');
add(/(?:without creating databases)/i,'Generate an application with --skip-active-record when no relational persistence is needed.',
 'Alternatively remove Active Record railties and configuration carefully in an existing app. A Rails application can serve requests without a database, but components such as database-backed jobs or authentication persistence may still need one. config.frameworks in environment.rb is obsolete.',
 'rails new brochure --skip-active-record');
add(/(?:naming convention)/i,'Ruby classes/modules use CamelCase constants, methods/variables use snake_case, model names are singular and conventional table/controller names are plural.',
 'For example, BlogPost maps to blog_posts and BlogPostsController. File paths follow underscored constant names for autoloading. Custom names are possible through explicit configuration; conventions reduce that configuration.',
 'app/models/blog_post.rb → BlogPost → blog_posts\napp/controllers/blog_posts_controller.rb → BlogPostsController');
add(/(?:Gemfile\.lock)/i,'Gemfile.lock records the resolved dependency graph and exact gem versions used by the application.',
 'Commit it for applications so teammates and deployments install the same resolution. Gemfile declares requirements, not a guarantee that every machine independently resolves identical versions. Lockfile platform and Ruby/Bundler metadata also matter.',
 'bundle install\n# Update a chosen dependency deliberately:\nbundle update rails');
add(/(?:Gemfile|add a new gem|install a Ruby gem|Gems and how)/i,'Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.',
 'Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.',
 'bundle add pagy\nbundle install\n# Gemfile:\ngem "pg", "~> 1.5"',[], 'https://bundler.io/guides/using_bundler_in_applications.html');
add(/(?:plugin and a gem|gems and plugins|What is a plugin)/i,'A gem is a Ruby package; a Rails plugin adds Rails-specific behavior and is commonly distributed as a gem with a railtie or engine.',
 'The historical distinction between vendor/plugins and globally installed gems does not describe modern Bundler-based Rails projects. Dependency versions and load paths are selected per application bundle, even when installed gems share disk storage.',
 'Gemfile → gem dependency → optional Railtie/Engine hooks into the Rails application');
add(/(?:gem in Ruby|Rails gem|“gem”|What is a gem|rubygems)/i,'A gem packages Ruby code and metadata so it can be distributed, versioned and installed with RubyGems/Bundler.',
 'Rails itself is composed of gems. Evaluate maintenance, licensing, compatibility and necessity before adding a dependency. No gem is essential for every project, and personal-favorite questions should be answered from actual experience.',
 'gem install bundler\n# In an application use its bundle:\nbundle add rspec-rails');
add(/(?:Rake|rake|rakefile)/i,'Rake is a Ruby task/build tool that defines dependencies and tasks in Rakefile or .rake files.',
 'Rails exposes common tasks through bin/rails, including db:migrate and db:seed; custom tasks usually live in lib/tasks. Load :environment when the task needs models. Do not expose arbitrary administrative or destructive Rake tasks as unauthenticated web actions.',
 '# lib/tasks/reports.rake\nnamespace :reports do\n  task daily: :environment do\n    puts Order.where(created_at: Time.current.all_day).count\n  end\nend\n# bin/rails reports:daily');
add(/(?:JSON|serializer|generate JSON responses)/i,'JSON is a data interchange format; Rails can render structured JSON directly or use a chosen serializer/template layer.',
 'Expose an explicit public representation so sensitive database fields do not leak. ActiveModel::Serializer is supplied by a separate library, not a mandatory Rails built-in serializer. Include appropriate status codes, pagination and version/error contracts for APIs.',
 'render json: { id: @user.id, name: @user.name }, status: :ok');
add(/(?:Action Mailer|Action Mailers)/i,'Action Mailer builds and delivers email messages using mailer classes and templates; deliver_later integrates delivery with Active Job.',
 'Configure a delivery method/provider, sender identity and URL host, test content and recipient selection, and monitor delivery failures. Modern inbound email processing is handled by Action Mailbox; saying Action Mailer is the complete modern inbound system is misleading.',
 'class UserMailer < ApplicationMailer\n  def welcome_email(user)\n    @user = user\n    mail(to: user.email, subject: "Welcome")\n  end\nend\nUserMailer.welcome_email(user).deliver_later');
add(/(?:Spring is|Spring in Rails)/i,'Spring is an optional development application preloader that can speed repeated commands by keeping an application process available.',
 'It is not the Spring Java framework and not a guarantee that every server or configuration change reloads automatically. Commands and framework boot can use the preloader when installed/configured; restart it when stale process state causes problems.',
 'bin/spring status\nbin/spring stop');
add(/(?:ActiveSupport\b)/i,'Active Support is Rails’ collection of utility classes, extensions and support APIs such as time helpers, notifications, inflections and concerns.',
 'Some extensions can be required selectively outside Rails. Know the semantics rather than relying only on convenient names: blank? and present? differ from nil? and empty?, and time/calendar operations carry timezone assumptions.',
 'require "active_support/core_ext/object/blank"\n"   ".blank? # true\nfalse.blank? # true');
add(/(?:API.only)/i,'An API-only Rails application uses ActionController::API and a smaller middleware/view stack focused on serving data rather than full browser pages.',
 'It retains models, routing and other Rails components. Add session/cookie/CSRF or other middleware deliberately if the API uses browser cookie authentication. Authentication, authorization, error handling and a stable response contract are still application responsibilities.',
 'rails new service --api\n# Controller:\nrender json: { status: "ok" }');
add(/(?:server.side rendering|SSR)/i,'Rails normally renders HTML on the server through Action View templates and layouts.',
 'The server prepares the data and HTML; the browser displays it and can add Turbo/Stimulus interactions. If the question means server-rendering a JavaScript UI framework, that requires a separate integration and runtime/build plan rather than a generic Rails setting.',
 'def show\n  @post = Post.find(params[:id])\nend\n# show.html.erb\n<h1><%= @post.title %></h1>');
add(/(?:respond_to)/i,'Controller respond_to selects the representation for the requested format using registered MIME types.',
 'Define HTML, JSON or other branches intentionally and handle unsupported formats. This controller API differs from Ruby’s respond_to?, which asks whether an object exposes a method.',
 'respond_to do |format|\n  format.html\n  format.json { render json: { id: @post.id, title: @post.title } }\nend');
add(/(?:request\.xhr)/i,'request.xhr? checks whether the request carries the conventional X-Requested-With: XMLHttpRequest header.',
 'It is a convenience hint, not proof of browser origin, authentication or safety. Modern fetch and Turbo requests may not set the same header, so use explicit formats/contracts rather than using xhr? as an authorization boundary.',
 'if request.xhr?\n  render partial: "results"\nelse\n  render :index\nend');
add(/(?:Rails.*limited|limits of Ruby on Rails)/i,'Rails is an opinionated web framework with trade-offs in runtime resources, conventions and coupling; it is not limited by a blanket inability to use foreign keys or multiple databases.',
 'Modern Rails supports foreign keys, multiple databases and API applications. Specialized real-time, CPU-heavy or unusual deployment requirements may call for other components, but evaluate actual requirements rather than treating old limitations as current facts.',
 'add_foreign_key :orders, :users\n# Multiple database configurations are supported through database.yml and connects_to.', ['The source claims about no foreign-key support and no multiple-database support are outdated or false.']);
add(/(?:sensitive data)/i,'Keep credentials outside source code, use supported encrypted credentials or a secret manager, restrict access and filter secrets from logs.',
 'Environment variables are a delivery mechanism, not intrinsically encrypted storage. Encryption at rest, access control, redaction, rotation and safe error messages address different risks. Strong Parameters prevents unwanted assignment but does not encrypt data.',
 'bin/rails credentials:edit\n# config.filter_parameters += [:password, :access_token]');
// Ruby language topics present inside Rails-oriented source collections.
add(/(?:everything is an object|almost.*everything)/i,'Ruby values such as numbers, nil, booleans, classes and modules are objects; syntax constructs such as if and def are not themselves ordinary value objects.',
 'Every object has a class and identity and receives method calls. Class is itself a class, classes are objects, and BasicObject is the minimal root of the normal hierarchy. A block is syntax that can be captured in a Proc; do not claim every language keyword or raw block is an object.',
 '1.class # Integer\nnil.class # NilClass\nString.class # Class\nClass.superclass # Module');
add(/(?:metaprogramming)/i,'Metaprogramming means defining or adapting program behavior using code, often at runtime in Ruby.',
 'define_method creates methods, class_eval/module_eval evaluates in a class/module context, and method_missing can handle unknown calls. Prefer explicit generated methods when the set is known; pair method_missing with respond_to_missing?. Avoid evaluating user input or exposing arbitrary method dispatch.',
 '%w[admin editor].each do |role_name|\n  define_method("#{role_name}?") { role == role_name }\nend');
add(/(?:single inheritance|multiple inheritance|mixin|difference between a class and a module|difference between classes and modules|What is a module)/i,'Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.',
 'include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.',
 'module Printable\n  def print_label = "label"\nend\nclass Product\n  include Printable\nend\nProduct.new.print_label',[], 'https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html');
add(/(?:What is a class)/i,'A class is an object defining the behavior and construction of its instances.',
 'Instance methods define behavior for each instance; each object has its own instance-variable state. Classes can themselves have singleton methods and instance variables. Class.new constructs new anonymous classes; SomeClass.new allocates an instance and invokes initialize.',
 'class User\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend\nUser.new("Ada").name');
add(/(?:What is an object)/i,'An object is a value with identity, class membership and behavior; it can also hold state in instance variables.',
 'Object is a particular class, not the general definition of an object. In modern Ruby, BasicObject is the minimal root, while most ordinary objects inherit from Object. Classes and modules are also objects.',
 'user = Object.new\nuser.class # Object\nuser.object_id # identity, not a portable raw memory address');
add(/(?:constructor|initialize)/i,'Class#new allocates an object and calls its initialize instance method to set up initial state.',
 'initialize is normally private and should accept the inputs required to establish a valid object. The value returned by initialize is ignored by the ordinary new construction path; new returns the new instance.',
 'class Order\n  attr_reader :total\n  def initialize(total)\n    @total = total\n  end\nend\nOrder.new(100).total');
add(/(?:getter|setter|attr_accessor)/i,'attr_reader creates a getter, attr_writer creates a setter, and attr_accessor creates both for a named instance variable.',
 'These methods do not automatically create database columns. Active Record already generates persistence attribute methods from its schema; defining attr_accessor for the same name can shadow that behavior. Custom setters are useful for normalization or enforcing domain rules when used carefully.',
 'class Person\n  attr_reader :name\n  attr_accessor :age\n  def initialize(name)\n    @name = name\n  end\nend');
add(/(?:class variables.*instance|class and instance variables|Instance Variable.*Global Variable|define variables|Variables defined in Ruby)/i,'Local variables use plain names, instance variables start with @, class variables start with @@, and globals start with $.',
 'An instance variable belongs to the current object, including a class object. A class-instance variable is different from a class variable: it is not implicitly shared across the class hierarchy. Class variables can be shared through inheritance and cause surprising coupling. Prefer explicit object state and avoid mutable globals.',
 'class Counter\n  @count = 0 # class-instance variable\n  @@shared = 0 # class variable\n  def initialize\n    @value = 0 # each Counter instance has its own\n  end\nend');
add(/(?:Global Variable)/i,'A Ruby global variable starts with $ and is visible across the process.',
 'Global state makes dependencies and concurrent behavior difficult to reason about. Prefer configuration objects, arguments or dependency injection for application state. Ruby also has special built-in globals with documented semantics.',
 '$feature_enabled = true\n# Prefer an explicit settings object in application code.');
add(/(?:self mean|use "I" in Ruby)/i,'self is the current receiver; it changes with execution context.',
 'Inside an instance method self is that instance. In a class body or class method it is the class object. self is often used when assigning through a setter, or defining a singleton/class method. Calling another class method from a class method does not always require an explicit self receiver.',
 'class User\n  def self.kind = self\n  def receiver = self\nend\nUser.kind # User\nUser.new.receiver # the instance');
add(/(?:method access|access modifiers|private or public|Private|Public.*Protected)/i,'Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.',
 'Public methods accept ordinary explicit receivers. Protected methods may be called with an explicit compatible receiver from the defining class/subclass context. Private methods normally use an implicit receiver; modern Ruby permits literal self in private calls. send bypasses visibility; public_send enforces public access. Instance methods are usually public by default, while initialize is private.',
 'class Account\n  def visible = balance\n  private\n  def balance = 10\nend\nAccount.new.visible # 10\nAccount.new.public_send(:balance) # raises NoMethodError');
add(/(?:class methods and instance methods)/i,'An instance method is called on instances, while a class method is a singleton method on the class object.',
 'Use instance methods for behavior dependent on one object’s state and class methods for class-level operations or factories. A class method is not a method made available automatically on every instance.',
 'class Article\n  def word_count = body.split.length\n  def self.named(name) = where(author: name)\nend');
add(/(?:ways to invoke a method|call a method|calling a method|happens when you call a method)/i,'A Ruby method call sends a message to a receiver; lookup searches the receiver’s method lookup chain and invokes method_missing if no matching method is found.',
 'Methods can be invoked with normal dot syntax, public_send/send, or a Method object’s call. Respect visibility and do not pass arbitrary untrusted method names to send. A method object captures a receiver, while source code syntax alone does not.',
 'user.name\nuser.public_send(:name)\nuser.method(:name).call\n# send can invoke private methods, so it is not equivalent to public_send.');
add(/(?:a \|\|= b)/i,'a ||= b assigns b only when a is nil or false; a truthy value such as 0 is preserved.',
 'It is useful for defaulting/memoization but cannot cache a legitimate false/nil result without another sentinel. With indexed or accessor assignment, the language’s evaluation/assignment behavior is more precise than simply copying a = a || b. It is not an atomic cross-thread initialization primitive.',
 'a = false\na ||= 2 # a becomes 2\na = 0\na ||= 2 # a stays 0');
add(/(?:symbol.*string|string.*symbol|symbol is|symbol differ)/i,'A Symbol is an immutable identifier value; a String is a text value that is normally mutable unless frozen.',
 'Symbols with the same name refer to the same symbol object within the runtime. String identity depends on creation, interning and freezing, so object IDs are not a general type definition. Since Ruby 2.2 many dynamically created symbols can be garbage collected; symbols are not universally permanent memory leaks. Use strings for user content and symbols for a bounded vocabulary of names.',
 ':name == :name # true\n"name" == :name # false\n"name".to_sym # :name\n:name.to_s # "name"');
add(/(?:Symbol is different from variables|Symbols different from variables)/i,'A symbol is a value; a variable is a name bound to a value.',
 'A variable can refer to a symbol, string or any other Ruby object and can be rebound. Symbol immutability concerns the symbol object, not whether a local variable can later refer to another value. Avoid describing symbols as physical fixed memory locations.',
 'status = :draft\nstatus = :published # rebinds the variable; does not mutate :draft');
add(/(?:false.*nil|nil.*false|What does nil|What does false)/i,'nil represents the absence of a value and is the sole NilClass instance; false is the FalseClass boolean value.',
 'Both are falsey in conditionals, and every other Ruby value, including 0, an empty string and an empty array, is truthy. They are distinct values with different meanings and methods. Do not rely on a hard-coded object_id for nil; object IDs are implementation details.',
 'nil == false # false\nif 0\n  puts "zero is truthy"\nend');
add(/(?:\bProc\b|\bLambda\b|closure|\bblocks\b)/i,'A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.',
 'A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.',
 'factor = 3\ntriple = ->(n) { n * factor }\ntriple.call(4) # 12\ndef with_value\n  yield 10\nend\nwith_value { |n| n + 1 } # 11',[], 'https://docs.ruby-lang.org/en/master/Proc.html');
add(/(?:Yield|yield)/i,'Ruby yield invokes the block supplied to the current method, passing any given arguments.',
 'yield without a block raises LocalJumpError unless guarded by block_given?. In Rails layouts, yield is also used by the rendering machinery to insert view or named content. The Ruby keyword is lowercase, not Yield.',
 'def twice\n  return enum_for(:twice) unless block_given?\n  yield 1\n  yield 2\nend\ntwice { |n| puts n }');
add(/(?:load.*require|require.*load|what load does|what require does)/i,'load executes a Ruby file each time; require loads a feature once and tracks it; require_relative resolves relative to the calling file.',
 'require can search configured load paths and load supported native extensions. require returns false when the feature is already loaded. load is useful for deliberate repeated execution but is not a substitute for Rails’ Zeitwerk reloader. Never load a path controlled by untrusted input.',
 'require "json"\nrequire_relative "lib/parser"\nload "./script.rb" # executes again on the next load');
add(/(?:HashWithIndifferent)/i,'HashWithIndifferentAccess treats string and symbol keys equivalently; a normal Ruby Hash distinguishes them.',
 'Ordinary Hash compares keys through hash/eql? semantics, not simply ==. The Active Support variant normalizes symbol keys, making request-like data convenient but not performing validation or deep business normalization.',
 '{ name: "Ada" }["name"] # nil\n{ name: "Ada" }.with_indifferent_access["name"] # "Ada"');
add(/(?:Hash in Ruby)/i,'A Hash maps keys to values and preserves insertion order.',
 'Hash uses hash/eql? semantics for key identity; duplicate equivalent keys overwrite earlier values. Defaults can be shared objects unless a default block creates one per key. Strings and symbols are different normal Hash keys.',
 'counts = Hash.new(0)\n%w[a b a].each { |word| counts[word] += 1 }\ncounts # {"a"=>2, "b"=>1}');
add(/(?:#equal|#==|equal\?)/i,'equal? compares object identity; == compares value according to the receiver’s implementation.',
 'The source’s #equal name should be equal?. eql? and hash jointly control Hash key behavior and may differ from ==, for example for numeric types. Do not use object IDs as a substitute for a documented equality contract.',
 'a = "ruby"\nb = "ruby"\na == b # true\na.equal?(b) # false for these distinct strings');
add(/(?:Array#each.*Array#map|each and map)/i,'each performs an operation for every element and normally returns the original collection; map returns an array of block results.',
 'Use each for side effects and map for transformation. Without a block they normally return an Enumerator. map! mutates a compatible receiver in place and has a different contract.',
 '[1, 2].map { |n| n * 2 } # [2, 4]\n[1, 2].each { |n| puts n } # prints values, returns [1, 2]');
add(/(?:raise\/rescue|throw\/catch)/i,'raise/rescue implements exception handling; throw/catch implements nonlocal control flow using a matching tag.',
 'A throw does not represent an Exception to be rescued in the usual way. Unmatched throw raises UncaughtThrowError. Use exceptions for errors and throw/catch only when tagged early exit makes the control flow clearer.',
 'result = catch(:found) do\n  [1, 2, 3].each { |n| throw(:found, n) if n.even? }\n  nil\nend # 2');
add(/(?:splat operator)/i,'* gathers or expands positional arguments, while ** gathers or expands keyword arguments.',
 'The meaning depends on definition versus call site. Ruby 3 separates positional hashes from keyword arguments, so forwarding often needs explicit **kwargs or ... . Splatting does not remove the need to design an understandable method interface.',
 'def log(*messages, **options)\n  [messages, options]\nend\nlog("hello", level: :info)');
add(/(?:garbage collection|memory management)/i,'Ruby automatically reclaims unreachable managed objects through its garbage collector; a reachable object cannot be collected merely because the application no longer wants it.',
 'MRI uses tracing, generational and incremental collection, with implementation/version-specific compaction behavior. GC operates during the process lifetime, not only when a program ends. Retained references, native allocations and allocator fragmentation can all cause high memory use. Use allocation profiles and GC.stat before tuning.',
 'before = GC.stat(:total_allocated_objects)\n1000.times { Object.new }\nafter = GC.stat(:total_allocated_objects)\nputs after - before');
add(/(?:destructive methods)/i,'A destructive method mutates its receiver; Ruby often uses a ! suffix when a more surprising or dangerous variant exists.',
 'The suffix is a convention, not a universal guarantee of mutation or a requirement that every mutating method end in !. For example Array#push mutates without a bang. Some bang methods return nil when no change occurred.',
 'name = "ruby"\nname.upcase # "RUBY", name unchanged\nname.upcase! # mutates name');
add(/(?:enum in Ruby|enum feature|ActiveRecord::Enum)/i,'ActiveRecord::Enum maps a model attribute to a finite set of named values, commonly backed by an integer or string column.',
 'This is a Rails model feature, not a general Ruby enum keyword. Use explicit integer mappings to avoid accidental reinterpretation when list order changes. Modern Rails uses positional enum name/value arguments; old keyword-style declarations are legacy.',
 'class User < ApplicationRecord\n  enum :role, { guest: 0, member: 1, admin: 2 }\nend\nuser.admin?\nuser.member!');
add(/(?:case statement)/i,'case/when compares candidates using the when value’s === method; pattern-matching case/in uses different matching semantics.',
 'It supports classes, ranges and regexes as useful conditions. A case expression returns the selected branch value. Ruby’s equality operators are distinct and the right operator depends on intent.',
 'case age\nwhen 0..17 then "minor"\nelse "adult"\nend');
add(/(?:for loop|looping structures)/i,'Ruby offers each and other iterators, for, while, until and loop; choose the form that states the traversal or condition clearly.',
 'for iterates an Enumerable and does not introduce a block-local scope in the same way as each’s block. while repeats while a condition is truthy; until repeats until it is truthy. Most collection transformations are clearer with map/select/reduce.',
 '[1, 2, 3].each { |n| puts n }\n3.times { |i| puts i }');
add(/(?:do while)/i,'Ruby can express a post-test loop with begin ... end while condition, though loop with an explicit break is often clearer.',
 'A post-test loop runs the body at least once. There is no C-style do { ... } while syntax. Ensure the loop has a reachable termination condition.',
 'n = 0\nloop do\n  n += 1\n  break if n >= 3\nend');
add(/(?:until loop)/i,'until repeats its body while the condition is falsey and stops once the condition is truthy.',
 'Use it when the positive end condition is easier to understand than a negated while. Like while it can execute zero times when the condition is already satisfied.',
 'n = 0\nuntil n == 3\n  n += 1\nend');
add(/(?:break statement)/i,'break exits the enclosing loop or iterator and may supply its result value.',
 'next skips the remainder of one iteration; redo restarts the same iteration; return exits a method. Proc/lambda context affects nonlocal control-flow behavior, so do not treat them as interchangeable.',
 'result = [1, 2, 3].each { |n| break n if n.even? }\nresult # 2');
add(/(?:Inject)/i,'inject/reduce folds a sequence using an accumulator and returns the final accumulator.',
 'Supply an initial value when empty-input behavior matters. Without an initial value an empty reduction returns nil. Enumerable#sum is often the clearest numeric summation API.',
 '[1, 2, 3].inject(0) { |sum, n| sum + n } # 6\n[].inject(0, :+) # 0');
add(/^Map$/,'map creates an array containing the result of applying a block to every element.',
 'map is also called collect. It expresses a transformation, while each expresses iteration for side effects. For very large or unbounded streams, use a lazy enumerator when appropriate.',
 '(1..4).map { |n| n * n } # [1, 4, 9, 16]');
add(/(?:dynamic.*typed|strongly.*weakly|typing|duck)/i,'Ruby is dynamically typed: variables are not statically restricted to one declared type, while objects have types and operations are checked at runtime.',
 'Duck typing depends on the behavior an object supports rather than requiring a particular class. Strong/weak typing is informal terminology; Ruby does not generally coerce an integer into a string for concatenation. Use tests, contracts and optional static typing tools where they help, and profile performance rather than assuming every dynamic program is slower.',
 'def empty?(value)\n  value.size == 0\nend\nempty?([]) # true\nempty?("") # true\n"hello" + 3 # raises TypeError');
add(/(?:flexible language|language of flexibility)/i,'Ruby permits classes/modules to be reopened and behavior to be defined dynamically, providing flexible extension points.',
 'Operators such as + are methods, but Ruby does not have a built-in plus keyword equivalent; you would need to define a method yourself. Reopening global core classes risks conflicts, so prefer your own types, explicit composition or refinements for scoped changes.',
 'class Money\n  def initialize(cents) = @cents = cents\n  def +(other) = Money.new(@cents + other.cents)\n  protected\n  attr_reader :cents\nend');
add(/(?:class librar)/i,'A class library is reusable code organized into classes/modules; Ruby’s standard and gem libraries cover many domains.',
 'Examples include JSON for structured data, Net::HTTP for network requests, CSV for tabular data, and threading/synchronization APIs. Library distribution changes by Ruby release: some are built-in/default/bundled gems and others must be added explicitly. A class library is not a special Rails subsystem or a fixed set of domains.',
 'require "json"\nJSON.parse("{\"active\":true}")');
add(/(?:harness|fixtures)/i,'A test harness runs tests and reports results; fixtures supply reproducible test data, commonly from YAML in Rails.',
 'Fixtures and factories are alternative ways of preparing model state. Keep data small and relevant, avoid order-dependent shared state, and make important scenario setup visible. A fixture is not simply every kind of supporting test code.',
 '# test/fixtures/users.yml\nada:\n  name: Ada\n# In a Rails test:\nuser = users(:ada)');
add(/(?:PORO)/i,'PORO means Plain Old Ruby Object: a regular Ruby object without a framework-specific inheritance requirement.',
 'Use it for value objects, services or domain behavior that does not need Active Record persistence. PORO is a design description, not a Ruby keyword, and such an object can still collaborate with Rails when its dependencies are explicit.',
 'class Price\n  attr_reader :cents\n  def initialize(cents) = @cents = Integer(cents)\nend');
add(/(?:rack)/i,'Rack defines the Ruby interface between web servers and web applications/middleware.',
 'A Rack application responds to call(env) with a status, headers and body. Middleware wraps another Rack application to process requests/responses. Rails is a Rack application, and Puma is a server able to host Rack applications. Rack is an interface and ecosystem, not a transparent interchange of arbitrary servers at runtime.',
 'app = ->(env) { [200, {"content-type" => "text/plain"}, ["Hello"]] }');
add(/(?:string and text in Rails)/i,'string and text are schema types that normally map to a length-limited character column and a larger text column; exact storage/limits depend on the database and migration options.',
 'The Ruby value of either is usually a String. A typical Rails string default uses a length such as 255, but text has no universal 30,000-character limit. Check database adapter behavior, indexes and business-level length validation instead of assuming a cross-database maximum.',
 't.string :title, limit: 200\nt.text :body\n# Model policy:\nvalidates :title, length: { maximum: 200 }');
add(/(?:ERB|basic conditions.*ERB)/i,'ERB means Embedded Ruby and evaluates Ruby within a text template.',
 '<% ... %> executes without inserting its result; <%= ... %> inserts the expression result. Rails escapes normal string output to reduce XSS. <%+= and >% are not the correct tag delimiters.',
 '<% if @user %>\n  <p>Hello <%= @user.name %></p>\n<% end %>');
add(/(?:RJs)/i,'RJS was a historical Rails template mechanism for generating JavaScript responses, associated with the Prototype-era Rails stack.',
 'Treat it as legacy knowledge. Modern Rails commonly uses Turbo Streams/Frames, standard JavaScript modules and JSON responses rather than returning strings for eval. Evaluate the existing application’s Rails and frontend version before migrating it.',
 '# Modern replacement example:\nrender turbo_stream: turbo_stream.replace(@post, partial: "posts/post", locals: { post: @post })', ['Outdated source topic: RJS is not a modern Rails default.']);
add(/(?:function.*palindrome)/i,'Compare a string with its reverse, after explicitly deciding normalization rules.',
 'An exact palindrome check is case- and punctuation-sensitive. If the interview requires ignoring punctuation/case, normalize first and explain the alphabet/Unicode rules. reverse is linear in input size, and allocating a reversed copy needs linear extra space.',
 'def palindrome?(value)\n  value == value.reverse\nend\n# ASCII alphanumeric normalization variant:\nclean = "A man, a plan, a canal: Panama".downcase.gsub(/[^a-z0-9]/, "")\nclean == clean.reverse # true');
add(/(?:automatically clean and format)/i,'Normalize input before validation when the normalization affects validity, and avoid blindly changing human names.',
 'Use a before_validation callback for model-local normalization. strip or email downcasing may be appropriate; titleize can change legitimate names or Unicode text unexpectedly. Handle nil deliberately, and define the business rule before applying transformations.',
 'before_validation :normalize_name\nprivate\ndef normalize_name\n  self.name = name&.strip\nend');
add(/(?:sum of x and y|prints the value of x)/i,'For x=12, y=36, z=72, the printed values are 12, 48 and 40.',
 'Ruby interpolates expressions within double-quoted strings. Integer division truncates for integer operands; the given average happens to be integral. Use 3.0 or fdiv(3) when a fractional mean is required.',
 'x, y, z = 12, 36, 72\nputs x\nputs x + y\nputs (x + y + z).fdiv(3) # 40.0');
add(/(?:What is rvm|gemset)/i,'RVM means Ruby Version Manager; its gemsets isolate groups of installed gems for a chosen Ruby installation.',
 'A gemset is not itself a package of application source code and RVM is not a source-control system. Bundler still resolves per-application dependency versions with Gemfile.lock. Distinguish Ruby runtime management from gem dependency resolution.',
 'rvm use ruby-version@project --create\nbundle install');
add(/(?:extension.*ruby file)/i,'Ruby source files conventionally use the .rb extension.',
 'The interpreter can execute a file with another name when invoked explicitly, but .rb is the conventional extension recognized by editors and tooling.',
 'ruby example.rb');
add(/(?:which.*not.*datatype)/i,'Float and Integer are built-in Ruby numeric classes; Timedate and Binary are not built-in core class names.',
 'The source MCQ is ambiguous because it expects one choice while offering at least two non-core names. Time is built in and Date/DateTime are library classes. Binary data is commonly stored in a String with an appropriate encoding, not a core Binary type.',
 '1.class # Integer\n1.0.class # Float\n"bytes".b.encoding # ASCII-8BIT', ['Ambiguous MCQ: both Timedate and Binary are not Ruby core data-type names.']);
add(/(?:Twitter|Rail.s application framework is called)/i,'The source MCQ is ambiguous or outdated; its choices do not establish a reliable modern technical answer.',
 'Rails is itself an application framework, historically composed of components such as Action Pack and Active Record. An old claim about Twitter’s implementation is time-dependent and does not prove which language renders its browser UI. Do not memorize a selected option as a general Ruby/Rails fact.',
 'Action Pack provides controller/view HTTP infrastructure; Active Record supplies ORM behavior.', ['Unresolved source MCQ wording; no single technically sound option is asserted.']);
add(/(?:convention over configuration|two guiding principles)/i,'Convention over configuration supplies predictable defaults; DRY avoids duplicating the same knowledge across the application.',
 'For example, User maps to users and UsersController conventionally renders views under users. Configure exceptions explicitly. DRY is about keeping one authoritative rule, not forcing unrelated code into a shared abstraction solely because two lines look alike.',
 'class User < ApplicationRecord\n  # Convention: users table, id primary key\nend\n# Exception:\nclass LegacyUser < ApplicationRecord\n  self.table_name = "people_archive"\nend');
add(/(?:DRY.*principle)/i,'DRY means keeping one authoritative representation of each piece of knowledge so changes do not require synchronizing multiple copies.',
 'In Rails this can mean a model validation, a helper for repeated presentation, a shared partial, or a service for a repeated operation. Similar-looking code with different reasons to change should not be coupled prematurely.',
 '# Shared presentation:\n<%= render "users/form", user: @user %>\n# Shared domain rule:\nvalidates :email, presence: true');
add(/(?:a string is|What is a string)/i,'String is Ruby’s text/byte-sequence class, with an associated encoding and normally mutable contents.',
 'Single-quoted strings mostly take literal content, while double-quoted strings support interpolation and escapes. Use frozen strings when mutation is not wanted. Length in characters, bytes and user-perceived graphemes can differ for Unicode text.',
 'name = "Ruby"\n"Hello #{name}" # "Hello Ruby"\n"é".length # 1\n"é".bytesize # 2 in UTF-8');
add(/(?:a filter|filter in Ruby)/i,'A controller filter is now called a controller callback, such as before_action, after_action or around_action.',
 'before_action is useful for authentication or loading an authorized resource. around_action wraps the action and must yield. after_action observes a successfully processed action and should not be mistaken for guaranteed cleanup after exceptions. Old before_filter naming is legacy.',
 'before_action :require_admin!\nprivate\ndef require_admin!\n  head :forbidden unless current_user&.admin?\nend');
add(/(?:form submissions)/i,'Build a form using Rails helpers, receive it through a route/controller action, permit expected attributes, authorize the operation and handle validation results.',
 'Use form_with for modern model-backed forms. On success redirect using post/redirect/get; on failure render the form with the invalid object and a suitable status. CSRF protection, server-side validation and authorization are separate requirements.',
 'def create\n  @post = current_user.posts.new(post_params)\n  if @post.save\n    redirect_to @post, status: :see_other\n  else\n    render :new, status: :unprocessable_entity\n  end\nend');
add(/(?:developer skills|skills do developers need|skills are needed|prepare for a Rails interview)/i,'Prepare Ruby semantics, Rails request/data flow, SQL, testing, security, debugging and clear explanations of actual project decisions.',
 'For around three years’ experience, practice implementing an endpoint, diagnosing N+1 queries, writing a migration with constraints, testing authorization, and explaining a production issue. Support answers with a real example rather than claiming tools or incidents you have not used.',
 'Practice: build POST /orders with permitted input, a transaction, inventory checks, an authorization policy and request tests for success and failure.');
add(/(?:favorite gems|gems.*essential|favorite testing tool|favorite api resource)/i,'Choose tools based on the requirement and explain one you have actually used, including an alternative and its trade-off.',
 'For example, Minitest versus RSpec concerns test style/tooling; Active Storage versus an upload gem concerns storage/workflow needs. Paperclip is a legacy attachment library and FactoryGirl is now FactoryBot. No list of gems is essential for every Rails app. Consult the API documentation matching the installed Ruby/Rails version.',
 'Example interview response: “I used Active Storage for direct S3 uploads; I considered Shrine when custom processing pipelines were the main requirement.”');
add(/(?:assess.*skills|senior Rails developer|skill.based hiring|reduce time.to.hire)/i,'Evaluate demonstrated technical judgment, project responsibility, communication and practical problem-solving rather than treating years of experience as a fixed skill score.',
 'Use a consistent job-relevant rubric, realistic coding/debugging exercises and discussion of previous work. Seniority varies by organization; a source estimate such as four to seven years is not a technical requirement or universal hiring rule. Keep interviews accessible and avoid unnecessary repeated assessments.',
 'Rubric example: identify the root cause of an N+1 endpoint, implement a fix, verify query behavior and explain the chosen trade-offs.');
add(/(?:Ruby.s programming language)/i,'Ruby is a dynamic, general-purpose, object-oriented language designed by Yukihiro Matsumoto.',
 'It emphasizes readable expressions, objects and message dispatch, closures/blocks, mixins and runtime flexibility. Ruby is not itself the Rails framework, and its execution strategy can include bytecode/JIT depending on implementation/version.',
 '[1, 2, 3].map { |n| n * 2 } # [2, 4, 6]');
add(/(?:self\.up.*self\.down|self\.down.*self\.up)/i,'Legacy migration up methods applied changes and down methods reversed them; modern versioned migrations normally use instance methods or a reversible change method.',
 'Use change when Rails can infer the reverse operation. Use explicit up/down or reversible when a data/schema change needs custom logic. Reversing a schema change does not magically recover deleted data.',
 'class AddCodeToProducts < ActiveRecord::Migration[8.0]\n  def up\n    add_column :products, :code, :string\n  end\n  def down\n    remove_column :products, :code\n  end\nend');
add(/(?:few Directories|tasks.*attention|basic factor.*rails application|database.driven applications)/i,'Start with the domain and user workflows, define the data/constraints and HTTP interface, and implement a tested, secure vertical feature in the Rails application structure.',
 'app/models holds domain/persistence classes, app/controllers request coordinators, app/views templates, config configuration and db migrations/schema/seeds. PostgreSQL is one supported choice, not a mandatory database for every Rails application. Database-driven behavior comes from persistence code, not merely choosing MVC.',
 'app/models/product.rb\napp/controllers/products_controller.rb\napp/views/products/index.html.erb\nconfig/routes.rb\ndb/migrate/..._create_products.rb');
add(/(?:third.party API)/i,'Call an external API through a clearly defined client with explicit timeouts, response/error handling and safe credential management.',
 'Use Net::HTTP or an appropriate library, inspect status/content type, validate response shape and handle pagination/rate limits. Retry only suitable transient failures with bounded backoff, using idempotency keys for operations that could be duplicated. Avoid holding a database transaction/lock while making a slow network request.',
 'uri = URI("https://api.example.com/resource")\nresponse = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 3, read_timeout: 5) do |http|\n  http.get(uri.request_uri)\nend\nraise "Upstream failed: #{response.code}" unless response.is_a?(Net::HTTPSuccess)');
add(/(?:custom generator)/i,'Create a generator under lib/generators using Rails::Generators::Base and supported file/template actions.',
 'A generator creates or modifies application files from arguments and options. Define a source_root for templates, make names predictable and test generation in a temporary destination. The generated artifact still needs application-specific review.',
 'class GreetingGenerator < Rails::Generators::Base\n  argument :name, type: :string\n  def create_file\n    create_file "app/services/#{name.underscore}.rb", "class #{name.camelize}; end\\n"\n  end\nend');
add(/(?:implements Ajax)/i,'Rails can respond to asynchronous browser requests using HTML fragments, JSON or Turbo Stream representations; the client decides how to update the page.',
 'Modern applications often use fetch or Turbo rather than old automatically generated Prototype/RJS JavaScript. Explicitly define the response contract, retain authorization and CSRF defenses for browser-authenticated mutations, and handle request errors on the client.',
 'fetch("/posts/1.json", { headers: { Accept: "application/json" } })\n  .then(response => response.json())\n  .then(post => console.log(post.title))');
add(/(?:challenging bug)/i,'Describe a real bug using the symptom, evidence, root cause, fix, verification and prevention; do not invent an experience.',
 'A useful answer explains what you measured and why the final change addressed the cause. If practicing without a real example, label the scenario as hypothetical. Include a regression test or operational alert that would catch recurrence.',
 'Hypothetical practice: a page emits 101 SQL queries for 100 posts; logs show repeated author lookups; preload authors and verify both correctness and the reduced query count.');
add(/(?:developer do|front end or backend|good for freelancing|in demand|developer make)/i,'Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.',
 'A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.',
 'Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.', ['Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.']);

// These narrow prompts must precede broader conceptual rules.
const priority=(re,a,e,x,p=[],url='')=>bank.unshift({re,a,e,x,p,url});
priority(/(?:Rails Active Record|Active Records Rail|role of Active Record)/i,
 'Active Record is Rails’ Object-Relational Mapping library, providing persistence, query composition, associations, validations and lifecycle callbacks.',
 'By convention, User maps to users and each instance represents one row. It is a Rails component, not a Ruby language subsection. It generates SQL but does not remove the need for constraints, indexing or safe raw-query practices.',
 'class User < ApplicationRecord\n  validates :email, presence: true\nend\nUser.where(active: true).limit(20)');
priority(/(?:ActiveRecord::Enum|enum feature|enum in Ruby)/i,
 'Rails enum maps an attribute to named states backed by explicit integer or string values.',
 'Use explicit mappings so adding or reordering names does not reinterpret existing database values. Modern Rails uses positional name/value arguments. Ruby itself has no general enum keyword corresponding to this Rails macro.',
 'enum :status, { draft: 0, published: 1 }\npost.published?\npost.published!');
priority(/(?:advantages of using ORM)/i,
 'ORM reduces repetitive persistence code, provides composable queries and associations, and improves developer productivity through a consistent object interface.',
 'Parameter binding can reduce injection risk and adapters offer partial portability, but raw interpolation can still be unsafe. Evaluate maintainability and SQL behavior rather than assuming an ORM guarantees security or the fastest query.',
 'User.where(active: true).order(:id).limit(20)\n# Instead of hand-writing repetitive row-to-object mapping.');
priority(/(?:disadvantages of using ORM)/i,
 'ORM can hide expensive queries, add allocation/translation overhead, and make complex database-specific operations less obvious.',
 'Developers must learn both SQL and the ORM, inspect N+1 queries and plans, and sometimes use carefully bound SQL for specialized queries. ORM is not always slower than handwritten SQL; the generated query and workload decide.',
 'posts = Post.all\nposts.each { |post| puts post.author.name } # potential N+1\n# Use preload/includes when those associations are needed.');
priority(/(?:What does CRUD mean|What is CRUD)/i,
 'CRUD stands for Create, Read, Update and Delete, the basic operations on persisted data.',
 'Active Record supplies create/new+save, find/where, update and destroy/delete. HTTP routes often map POST, GET, PATCH/PUT and DELETE to these operations; form-display actions new/edit are separate from the actual writes.',
 'post = Post.create!(title: "Draft")\nPost.find(post.id)\npost.update!(title: "Published")\npost.destroy!');
priority(/(?:benefits.*engines|engine.*benefit)/i,
 'Rails engines package a reusable bounded feature with its own controllers, routes, models, views and integration hooks for one or more host applications.',
 'A mountable engine can isolate_namespace to prevent constant and route-helper collisions. It helps reuse and modular boundaries but requires a maintained public interface and deliberate dependencies on the host.',
 'module Billing\n  class Engine < ::Rails::Engine\n    isolate_namespace Billing\n  end\nend\n# Host routes:\nmount Billing::Engine, at: "/billing"');
priority(/(?:background job processing|configure background|test background jobs|test.*mailers)/i,
 'Configure an Active Job queue adapter and run its worker process; tests use a test adapter and helpers to inspect or perform enqueued jobs without sending real external effects.',
 'Production Solid Queue/Sidekiq configuration differs from the test adapter. Set queue names, concurrency, retries, timeouts and database/Redis connection capacity deliberately. To test behavior, assert enqueue arguments and exercise perform logic with controlled dependencies.',
 '# Production config example:\nconfig.active_job.queue_adapter = :solid_queue\n# Test example:\nassert_enqueued_with(job: WelcomeJob, args: [user.id]) do\n  WelcomeJob.perform_later(user.id)\nend');
priority(/(?:What is a callback|What are callbacks|callbacks and filters)/i,
 'A model callback hooks into persistence/validation lifecycle events; controller callbacks run before, after or around a request action.',
 'Use normalization before validation, keep callbacks local/cohesive, and use after_commit/outbox for external side effects. Callback APIs differ between model and controller contexts and are not interchangeable.',
 'before_validation :normalize_email\nprivate\ndef normalize_email\n  self.email = email&.strip&.downcase\nend');
priority(/(?:form_for and form_with)/i,
 'form_for is the older model-bound form builder; form_with supports model-bound and URL/scoped forms through one interface.',
 'Use form_with for new application code. Default remote/local behavior changed across Rails versions, and Turbo affects submission behavior independently. A model-bound form derives URL/method and parameter nesting from the object and routes.',
 '<%= form_with(model: @post) do |f| %>\n  <%= f.text_field :title %>\n  <%= f.submit %>\n<% end %>');
priority(/(?:test a Rails app|unit testing.*classical)/i,
 'A unit test checks a focused behavior with assertions comparing actual and expected outcomes; a Rails suite combines unit/model, request/integration and browser/system tests.',
 'Use Minitest or RSpec consistently and choose a test boundary based on the behavior. A unit need not be exactly one method, and tests should cover observable behavior rather than copy implementation details. Keep external effects controlled and scenario data explicit.',
 'require "minitest/autorun"\nclass PriceTest < Minitest::Test\n  def test_total\n    assert_equal 6, [1, 2, 3].sum\n  end\nend');
priority(/(?:most important.*interview questions|most common.*interview questions)/i,
 'Practice Ruby object/method/block semantics, Rails MVC/request flow, Active Record/SQL, security, testing, jobs and production debugging.',
 'Use the full collection for coverage rather than a fixed short list. For each topic, state the direct answer, show a concrete example, and explain the failure mode and trade-off you would verify in a real project.',
 'Practice prompt: diagnose a slow authorized endpoint, show the SQL change, and write a test for the intended response.');
priority(/(?:popular for startups|advantages of Ruby on Rails)/i,
 'Rails’ integrated conventions and tools can reduce initial feature-development and integration work for a team comfortable with Ruby.',
 'Scaffolding, Active Record, migrations, routing and testing support help deliver a web application quickly. Productivity is contextual: consider the team, workload and operational needs rather than assuming a framework guarantees business success or scalability.',
 'Build an initial CRUD feature with routes, a model migration and request tests, then replace generated defaults with the required authorization and domain behavior.');
priority(/(?:What exactly do you know about Ruby on Rails|Explain what is Ruby on Rails)/i,
 'Ruby on Rails is a web application framework written in Ruby, with integrated MVC structure, routing, persistence, rendering, testing and jobs.',
 'It follows convention over configuration and DRY. Rails is not a mixture of programming languages and is not itself a programming language. Describe productivity and operational trade-offs for the actual application.',
 'rails new shop\ncd shop\nbin/rails db:prepare\nbin/rails server');
priority(/(?:Symbol.*different from variables|Symbols different from variables)/i,
 'A Symbol is a value; a variable is a name bound to a value and can refer to a Symbol, String or any other object.',
 'Reassigning a variable changes its binding without mutating the previously referenced symbol. Symbol immutability does not mean a variable holding a symbol becomes immutable. Avoid describing this as a fixed physical address or claiming dynamically created symbols can never be collected.',
 'state = :draft\nstate = :published # the variable changes; :draft is not mutated');
priority(/(?:dynamic finders)/i,
 'Dynamic finders such as User.find_by_email(value) infer a lookup from the method name; explicit find_by(email: value) is usually clearer.',
 'A supported find_by_* method builds attribute conditions and returns a match or nil. Older find_all_by_* and find_or_create_by_* forms belong to historical APIs and should not be assumed present. Prefer explicit relation composition when queries grow complex.',
 'User.find_by_email("dev@example.com")\nUser.find_by(email: "dev@example.com")');
priority(/(?:polymorphic.*single table inheritance|polymorphic.*STI)/i,
 'Polymorphic associations reference different owner model types through type/ID columns; STI stores subclasses of one model hierarchy in the same table.',
 'They solve different problems: a Comment may belong to a Post or Photo, while Car and Truck may both be subclasses stored in vehicles with a type discriminator. Shared association targets do not imply inheritance.',
 '# Polymorphic: comments.commentable_type + commentable_id\n# STI: vehicles.type selects Car or Truck\nclass Car < Vehicle; end');
priority(/(?:unauthorized users can modify|only administrators|role.based authorization)/i,
 'Enforce server-side authorization for the target record and action; Strong Parameters alone does not prevent one user editing another user’s record.',
 'Scope lookups to the current user/tenant or apply an explicit policy. For an admin-only action, check the authenticated user’s role before the action. Test unauthenticated, owner, non-owner and administrator cases and permit only the intended editable fields.',
 '@post = current_user.posts.find(params[:id])\n@post.update!(params.require(:post).permit(:title))\n# With a policy library: authorize @post, :update?');

// Apply specific answers, retain every source answer as an independent provenance field.
for (const r of records) {
 const bare=r.question.replace(/^[#]+/,'').split(/\n\s*\n/)[0];
 const match=bank.find(b=>b.re.test(bare));
 const actualAnswer=r.sourceAnswer.replace(/(?:5 key (?:beginner|intermediate|advanced)[\s\S]*|Question for (?:Intermediate|Experienced)[\s\S]*|Beginners Question with Answer[\s\S]*)$/,'').trim();
 const sourceMissing=!actualAnswer||/^(?:Database and Active Record|Performance and Scalability|Security|Testing and Debugging|Advanced and Scenario-Based Questions)$/.test(actualAnswer);
 if (sourceMissing && !r.issues.some(x=>/without an answer/.test(x))) r.issues.push('The source supplies a prompt without an answer; answer prepared independently.');
 if(match){
  r.directAnswer=match.a;r.explanation=match.e;r.example=match.x;
  r.importantPoints=[...match.p,...(match.url?['Reference: '+match.url]:[])];
 } else {
  r.explanation=actualAnswer;
  if(!r.directAnswer && sourceMissing) r.directAnswer='';
 }
 if(r.sourceFile==='thirtyfour.txt'&&r.startLine<142)r.difficulty=r.startLine<60?'Beginner':r.startLine<102?'Intermediate':'Advanced';
 if(r.sourceFile==='thirtyeight.txt')r.difficulty=r.startLine<120?'Beginner':r.startLine<184?'Intermediate':'Advanced';
 if(r.sourceFile==='thirtyfive.txt')r.difficulty=r.startLine<110?'Beginner':r.startLine<199?'Intermediate':'Advanced';
 if(r.sourceFile==='thirtyseven.txt')r.difficulty=r.startLine<79?'Beginner':r.startLine<152?'Intermediate':'Advanced';
}
fs.writeFileSync(file,JSON.stringify(records,null,2));
console.log('Answered from topic-specific reviewed bank:',records.filter(r=>bank.some(b=>b.re.test(r.question))).length);
console.log('Missing independent answers:',records.filter(r=>!r.directAnswer||r.issues.some(x=>/without an answer/.test(x))&&!bank.some(b=>b.re.test(r.question))).map(r=>`${r.sourceFile}:${r.startLine} ${r.question.split('\n')[0]}`).join('\n'));
