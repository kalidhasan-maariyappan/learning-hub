// Ruby on Rails interview questions and answers, collected from the notes in interview/ruby/
// with duplicate questions merged. Rendered by content/interview.js.
// Fields: q question, l level (B/I/A), a answer, e explanation, x code examples,
// n example notes or sample answers in prose, p points to remember, o multiple-choice options,
// s other wordings of the same question.
window.JT.interviewData = Object.assign(window.JT.interviewData || {}, {
 "rails_interview": [
  [
   "Rails overview",
   [
    {
     "q": "Rail’s application framework is called-",
     "l": "B",
     "a": "Action Pack.",
     "e": "Action Pack is the Rails framework for handling and responding to web requests: it contains Action Controller (controllers) and Action Dispatch (routing, middleware). Active Record is the model/ORM layer, not the application framework. Note that Action View was split out of Action Pack in Rails 4.1."
    },
    {
     "q": "The user interface of Twitter has been built using",
     "l": "B",
     "a": "Ruby: Twitter’s first version was a Ruby on Rails application.",
     "e": "This is a trivia question from an old quiz. Twitter launched on Rails in 2006 and later moved most of its backend to the JVM (Scala and Java) for scale, so the answer describes its early history."
    },
    {
     "q": "How does Ruby on Rails structure an application, and where does Ruby's design help?",
     "l": "B",
     "a": "Rails is a Ruby web framework following Model–View–Controller and convention over configuration. Models represent domain behavior, controllers handle HTTP requests, and views present responses.",
     "e": "Active Record supplies database mapping for models that use it; domain models need not all inherit from Active Record. Routing selects a controller action based on both path and HTTP method. Controllers coordinate work and render HTML, JSON or other responses, while keeping substantial business rules in reusable model or application-service code.",
     "x": [
      "# config/routes.rb\nresources :articles, only: [:index, :show]\n# GET /articles/5 routes to ArticlesController#show"
     ],
     "p": [
      "MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class."
     ]
    },
    {
     "q": "What are the advanced features of the Ruby on Rails framework?",
     "l": "B",
     "a": "Rails offers jobs, real-time channels, engines, rich persistence, caching and other facilities. Service objects are an application design pattern, not a built-in Rails subsystem.",
     "e": "Framework/version and deployment backend determine actual behavior; avoid calling every application pattern a framework feature.",
     "x": [
      "# Example app structure: ApplicationJob subclasses for jobs, ApplicationCable channels for real-time messaging."
     ],
     "p": [
      "Framework/version and deployment backend determine actual behavior; avoid calling every application pattern a framework feature."
     ]
    },
    {
     "q": "What are the benefits of Ruby on Rails, and why is it popular with startups?",
     "l": "B",
     "a": "Rails lets a small team build and change a full web application quickly: conventions remove boilerplate, generators and scaffolds create working code, and it includes everything from ORM to jobs, mail and caching.",
     "e": "That speed is why startups such as GitHub, Shopify, Airbnb and Basecamp started on Rails. Other benefits are a mature gem ecosystem, built-in security defaults (CSRF, SQL escaping), integrated testing, and the Rails 8 “one-person framework” defaults that need no Redis or separate front-end build.",
     "p": [
      "Give one concrete example from your own work, such as delivering a feature in days thanks to conventions."
     ],
     "s": [
      "What are the benefits of using Ruby on Rails?",
      "What are the advantages of using Ruby on Rails?",
      "What are some of the advantages of Ruby on Rails?",
      "What is the best thing which you find about Ruby on Rail so far?",
      "What is something you like about working with Rails?",
      "Why is Ruby on Rails popular for startups?"
     ]
    },
    {
     "q": "What is Rails good at? What is it not so good at?",
     "l": "B",
     "a": "Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation.",
     "e": "This is an architectural recommendation with tradeoffs, not a guarantee that Rails cannot handle a particular scale.",
     "x": [
      "# Scenario: Rails owns an order API; specialized CPU-intensive processing runs in a measured worker component.",
      "add_foreign_key :orders, :users\n# Multiple database configurations are supported through database.yml and connects_to."
     ],
     "p": [
      "This is an architectural recommendation with tradeoffs, not a guarantee that Rails cannot handle a particular scale."
     ],
     "s": [
      "In what ways is Ruby on Rails limited?",
      "What are the limits of Ruby on Rails?"
     ]
    },
    {
     "q": "What is Ruby on Rails, and what are its main features?",
     "l": "B",
     "a": "Rails is a Ruby web application framework with conventions for routing, MVC, database access, views, jobs and other common application needs.",
     "e": "Convention over configuration provides sensible defaults; DRY encourages shared rules. These can speed development when the application fits the framework. Performance, security and scalability depend on implementation and operations, so the framework does not guarantee them. Domain models may use Active Record or ordinary Ruby objects.",
     "x": [
      "# config/routes.rb\nresources :articles, only: [:index, :show]\n# GET /articles/5 routes to ArticlesController#show",
      "rails new shop\ncd shop\nbin/rails db:prepare\nbin/rails server",
      "bin/rails new shop\ncd shop\nbin/rails generate scaffold Product name:string price:decimal\nbin/rails db:migrate\nbin/rails server"
     ],
     "p": [
      "MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class.",
      "Benchmark real workloads and understand generated code.",
      "Default environments are development, test and production. Framework conventions reduce configuration but do not remove it."
     ],
     "s": [
      "What is Ruby on Rails?",
      "What Is Rails?",
      "Explain what is Ruby on Rails?",
      "What exactly do you know about Ruby on Rails and how well it can be defined?",
      "What is Ruby on Rails, and why is it popular for web development?",
      "What is Ruby on Rails, and why use it?",
      "Explain what Ruby on Rails is.",
      "What are the features of Rails?",
      "What is Rails? Explain it like I'm five.",
      "What is Rails? Explain it like you're talking to a friend who knows nothing about web development.",
      "Why Ruby on Rails"
     ]
    },
    {
     "q": "What is the difference between Ruby and Ruby on Rails?",
     "l": "B",
     "a": "Ruby is a programming language. Ruby on Rails is a web application framework written in Ruby.",
     "e": "You can write any kind of program in Ruby, such as scripts and command-line tools, without Rails. Rails adds structure and libraries for web apps: MVC, routing, Active Record, migrations, mailers and jobs. Methods like blank? and 2.days come from Rails (Active Support), not core Ruby.",
     "x": [
      "# Plain Ruby\nputs [3, 1, 2].sort.inspect\n\n# Rails (inside an app)\nUser.where(active: true).count\n1.day.ago"
     ],
     "s": [
      "What is the difference between Ruby and Rails?"
     ]
    },
    {
     "q": "What is Rails' \"DRY\" principle, and how is it implemented?",
     "l": "I",
     "a": "DRY means keeping one authoritative representation of each piece of knowledge so changes do not require synchronizing multiple copies.",
     "e": "In Rails this can mean a model validation, a helper for repeated presentation, a shared partial, or a service for a repeated operation. Similar-looking code with different reasons to change should not be coupled prematurely.",
     "x": [
      "# Shared presentation:\n<%= render \"users/form\", user: @user %>\n# Shared domain rule:\nvalidates :email, presence: true",
      "def total_cents(items)\n  items.sum { |item| item.fetch(:price_cents) }\nend",
      "def total_with_tax(net, rate:)\n  net * (1 + rate)\nend"
     ],
     "p": [
      "Similar-looking code with different business meanings should not be forced into one abstraction.",
      "Avoid premature abstractions that require many boolean options."
     ],
     "s": [
      "Explain the principle of DRY (Don't Repeat Yourself) in Ruby.",
      "What is your understanding of the DRY code?"
     ]
    },
    {
     "q": "What are Ruby’s trade-offs compared with Python, PHP and Node.js?",
     "l": "I",
     "a": "Compare languages against the workload, ecosystem, team and runtime rather than declaring a universal winner. Ruby often fits Rails web work and expressive scripting.",
     "e": "Python supports multiple runtimes and newer optional free-threaded builds, so “Python always has a GIL” is not a universal rule. Node.js has an event-loop model plus worker/process options, and Ruby runtime threading differs. A framework’s conventions, dependency compatibility, operational tooling and measured performance matter more than unqualified raw-speed claims.",
     "x": [
      "# Rails API sketch: render json: Product.limit(20).pluck(:id, :name)"
     ],
     "n": [
      "Example evaluation: prototype the same representative endpoint, measure response distributions and memory, and compare library/operations support before making a team-level choice."
     ],
     "p": [
      "Recommendations and implementation constraints must be separated from language guarantees."
     ],
     "s": [
      "What is the difference between Ruby and PHP for web development?"
     ]
    },
    {
     "q": "How does Ruby on Rails compare with Python and Django?",
     "l": "A",
     "a": "Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.",
     "e": "Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.",
     "x": [
      "# Scenario: compare Rails and Django for the same CRUD API with identical database indexes, tests and deployment targets."
     ],
     "n": [
      "Ruby: puts \"hello\"\nRails: bin/rails new shop\nPython web framework comparison: Rails versus Django"
     ],
     "p": [
      "A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect."
     ],
     "s": [
      "How is Ruby on Rails different from Python?",
      "How does Rails compare to Django?",
      "How is Ruby on Rails similar to Python?",
      "What is the difference between Ruby and Python for web development?"
     ]
    },
    {
     "q": "What is the difference between Ruby on Rails and Sinatra?",
     "l": "A",
     "a": "Rails supplies integrated full-stack conventions; Sinatra supplies a smaller Rack-oriented routing DSL. Either can serve APIs, and application size alone is not a strict rule.",
     "e": "Its User examples require explicit models, persistence and input validation.",
     "x": [
      "require \"sinatra\"\nget(\"/health\") { \"ok\" }"
     ]
    }
   ]
  ],
  [
   "MVC and the request cycle",
   [
    {
     "q": "What is the Rails request lifecycle? How does a request flow through a Rails app?",
     "l": "B",
     "a": "A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.",
     "e": "The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.",
     "x": [
      "GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response",
      "# config/routes.rb\nresources :articles, only: :show\n# ArticlesController#show\n@article = Article.find(params[:id])\n# app/views/articles/show.html.erb\n# <%= @article.title %>"
     ],
     "s": [
      "HOW Web Works",
      "How does Rails handle request-response cycles?",
      "How does Rails handle routing and request flow?",
      "What is the Rails request lifecycle?",
      "Describe the flow of a request in a Rails application from the browser to the database and back. Explain how the MVC components are involved."
     ]
    },
    {
     "q": "What are the three main components of Rails (MVC)?",
     "l": "B",
     "a": "MVC separates domain data and rules in models, presentation in views, and HTTP coordination in controllers.",
     "e": "A request passes through Rack middleware and routing to a controller action. The controller authorizes the operation, invokes models or services, and renders a response, often using a view. Database-backed models use Active Record, while JSON APIs may render without an HTML view. Keep domain operations reusable outside controllers.",
     "x": [
      "# Request: GET /products/1 -> ProductsController#show\n# Model: Product.find(1) -> View: products/show.html.erb",
      "# config/routes.rb\nresources :articles, only: [:index, :show]\n# GET /articles/5 routes to ArticlesController#show",
      "# app/controllers/posts_controller.rb\ndef show\n  @post = Post.find(params[:id])\nend\n# app/views/posts/show.html.erb\n<h1><%= @post.title %></h1>"
     ],
     "p": [
      "MVC does not require every business operation to live in a single large model.",
      "MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class."
     ],
     "s": [
      "What are the three components of Ruby on Rails?",
      "Explain the model-view-controller (MVC) architecture in Ruby on Rails.",
      "How does Ruby on Rails use the Model View Controller (MVC) framework?",
      "What is MVC in Ruby on Rails?",
      "Explain MVC architecture in Ruby on Rails with an example.",
      "What is the MVC principle stands for in Ruby and what are the subsystems in which it divides the work of an application?",
      "What does MVC mean?",
      "How does MVC work?",
      "Explain the MVC architecture in Rails.",
      "Explain the MVC (Model-View-Controller) design pattern in the context of Rails.",
      "Explain the Model-View-Controller (MVC) architectural pattern in the context of Ruby on Rails.",
      "Explain the concept of MVC architecture in the context of Ruby on Rails.",
      "Explain the Model-View-Controller (MVC) architectural pattern used in Ruby on Rails. How does it contribute to the development of web applications?",
      "What is MVC?",
      "Describe the MVC architecture in Rails.",
      "What is the MVC pattern in Rails?",
      "Define MVC",
      "What is MVC and how does it work?",
      "What is MVC and How it Works?",
      "What does MVC stand for in Rails, and why is it important?",
      "Can you describe the MVC pattern and how it's used in Rails? Imagine you're explaining it to a kid with building blocks.",
      "Outline three components of Rails.",
      "What are the components of Rails?",
      "What are Models, Views, and Controllers in Rails?"
     ]
    },
    {
     "q": "What is Rails middleware, and how does it work?",
     "l": "B",
     "a": "Rails uses a Rack middleware stack, where each layer can inspect a request, call the next application and modify the response.",
     "e": "A Rack-compatible application normally responds to call(env) with status, headers and body. Middleware can implement request IDs, logging, sessions or policy checks, and order determines which behavior wraps which. Use bin/rails middleware to inspect the deployed stack; not every concern belongs in middleware.",
     "x": [
      "class RequestTimer\n  def initialize(app) = @app = app\n  def call(env)\n    started = Process.clock_gettime(Process::CLOCK_MONOTONIC)\n    @app.call(env)\n  ensure\n    elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - started\n    warn \"request seconds=#{elapsed}\"\n  end\nend"
     ],
     "p": [
      "Preserve the body contract and close behavior when wrapping streaming responses."
     ]
    },
    {
     "q": "What is a rack?",
     "l": "A",
     "a": "Rack defines the Ruby interface between web servers and web applications/middleware.",
     "e": "A Rack application responds to call(env) with a status, headers and body. Middleware wraps another Rack application to process requests/responses. Rails is a Rack application, and Puma is a server able to host Rack applications. Rack is an interface and ecosystem, not a transparent interchange of arbitrary servers at runtime.",
     "x": [
      "app = ->(env) { [200, {\"content-type\" => \"text/plain\"}, [\"Hello\"]] }",
      "app = ->(_env) { [200, { \"content-type\" => \"text/plain\" }, [\"Hello\"]] }"
     ],
     "p": [
      "Rack is an interface/library, not the database layer."
     ],
     "s": [
      "What is the purpose of `Rack` in the context of a Rails application?"
     ]
    }
   ]
  ],
  [
   "Conventions and project structure",
   [
    {
     "q": "Name the main directories of a Rails application and explain their purpose.",
     "l": "B",
     "a": "app holds the application code (models, views, controllers, helpers, jobs, mailers); config holds routes, environments and initializers; db holds migrations, schema and seeds; lib holds extra libraries and tasks; public holds static files; test or spec holds tests; log, tmp and storage hold runtime files; bin holds executables such as bin/rails.",
     "e": "The structure is a Rails convention, not a Ruby one. Knowing where things live lets any Rails developer navigate a new project quickly, and Zeitwerk autoloads constants from the app subdirectories based on file names.",
     "x": [
      "app/\n  controllers/  models/  views/  helpers/  jobs/  mailers/  channels/\nbin/            # rails, setup, dev\nconfig/         # routes.rb, database.yml, environments/, initializers/\ndb/             # migrate/, schema.rb, seeds.rb\nlib/            # tasks/ and shared code\nlog/  public/  storage/  test/  tmp/  vendor/\nGemfile  Gemfile.lock  config.ru  Rakefile"
     ],
     "p": [
      "Code in app/ is autoloaded and reloaded in development; code in lib/ is autoloaded only if configured (config.autoload_lib in Rails 7.1+)."
     ],
     "s": [
      "Name a few Directories in ruby and explain their purpose?"
     ]
    },
    {
     "q": "What are the two guiding principles of the Rails framework?",
     "l": "B",
     "a": "Convention over configuration supplies predictable defaults; DRY avoids duplicating the same knowledge across the application.",
     "e": "For example, User maps to users and UsersController conventionally renders views under users. Configure exceptions explicitly. DRY is about keeping one authoritative rule, not forcing unrelated code into a shared abstraction solely because two lines look alike.",
     "x": [
      "class User < ApplicationRecord\n  # Convention: users table, id primary key\nend\n# Exception:\nclass LegacyUser < ApplicationRecord\n  self.table_name = \"people_archive\"\nend",
      "class User < ApplicationRecord\n  # Default table: users\nend\n# self.table_name = \"legacy_people\" overrides the mapping when needed."
     ],
     "p": [
      "This is mainly a framework design principle, not a Ruby grammar feature."
     ],
     "s": [
      "Explain the principle of 'Convention over Configuration' in the context of Ruby.",
      "What is the Rails convention over configuration principle?",
      "Explain the purpose of the Rails convention over configuration principle.",
      "What is the Rails convention over configuration (CoC) principle?",
      "What is the convention over configuration principle?",
      "How Convention over Configuration works in Active Record?"
     ]
    },
    {
     "q": "What exactly are the pre-software requirements for developing a project with Ruby on Rails?",
     "l": "B",
     "a": "Install compatible Ruby/Rails and generate the application with rails new, then prepare the database and start the development server.",
     "e": "Select the database with -d and inspect rails new --help for options supported by the installed version. Modern default servers use Puma; WEBrick is historical. JavaScript options change by Rails version; --dev is not a web-server selector. An API-only or --skip-active-record application has different defaults.",
     "x": [
      "rails new shop -d postgresql\ncd shop\nbin/rails db:prepare\nbin/rails server -p 3000",
      "app/models/product.rb\napp/controllers/products_controller.rb\napp/views/products/index.html.erb\nconfig/routes.rb\ndb/migrate/..._create_products.rb"
     ],
     "s": [
      "Is it possible in Ruby to develop database-driven applications in Ruby Tell anyone the basic approach through which the same can be developed in ruby?",
      "Tell anyone basic factor which is necessary to be followed when it comes to creating the rails application?",
      "While writing the Rails Application, what are the tasks to which you need to pay attention?"
     ]
    },
    {
     "q": "What is the naming convention in Ruby on Rails?",
     "l": "B",
     "a": "Rails conventionally maps a singular CamelCase model such as BookClub to a plural snake_case table such as book_clubs; controller classes usually use plural CamelCase names.",
     "e": "Methods, variables, and filenames use snake_case. Constants and class/module names begin with an uppercase letter. These are conventions, not universal restrictions: irregular inflections and explicit table names are supported. Zeitwerk expects the file path to match the constant it defines.",
     "x": [
      "app/models/blog_post.rb → BlogPost → blog_posts\napp/controllers/blog_posts_controller.rb → BlogPostsController",
      "class BookClub < ApplicationRecord\nend\n# app/models/book_club.rb; table: book_clubs\n# BookClubsController: app/controllers/book_clubs_controller.rb"
     ],
     "p": [
      "The correct paths are app/controllers and app/helpers.",
      "Keep the model/table convention separate from association naming."
     ],
     "s": [
      "Explain what naming conventions are in Rails.",
      "What is the naming convention used in Ruby on Rails?",
      "Explain the naming convention in Rails."
     ]
    },
    {
     "q": "Explain the difference between ActiveSupport’s \"HashWithIndifferentAccess\" and Ruby’s \"Hash\"?",
     "l": "B",
     "a": "Active Support is Rails’ collection of utility classes, extensions and support APIs such as time helpers, notifications, inflections and concerns.",
     "e": "Some extensions can be required selectively outside Rails. Know the semantics rather than relying only on convenient names: blank? and present? differ from nil? and empty?, and time/calendar operations carry timezone assumptions.",
     "x": [
      "{ name: \"Ada\" }[\"name\"] # nil\n{ name: \"Ada\" }.with_indifferent_access[\"name\"] # \"Ada\"",
      "require \"active_support/core_ext/object/blank\"\n\"   \".blank? # true\nfalse.blank? # true"
     ],
     "s": [
      "Mention what is the difference between Active support’s “HashWithIndifferent” and Ruby’s “Hash”?"
     ]
    },
    {
     "q": "Where one should look for the controller classes for handling the web request in Ruby?",
     "l": "B",
     "a": "Controllers coordinate HTTP requests and responses; Rails finds controller classes in app/controllers, while app/helpers holds view helper modules.",
     "e": "The router selects an action. Controllers handle request-level concerns such as permitted input, resource authorization, response format and status. Model/domain objects own persistence and business invariants. Helpers are primarily for presentation; they are not a general dumping ground for model or controller logic.",
     "x": [
      "class PostsController < ApplicationController\n  def show\n    @post = Post.find(params[:id])\n  end\nend",
      "module PricesHelper\n  def display_price(cents)\n    number_to_currency(cents / 100.0)\n  end\nend",
      "module UsersHelper\n  def display_name(user)\n    user.name.presence || \"Anonymous\"\n  end\nend"
     ],
     "p": [
      "Both directory names are plural.",
      "Keep database-heavy business logic out of view helpers."
     ],
     "s": [
      "What does the subdirectory app/controllers do?",
      "Explain the role of the sub-directory app/controller and app/helper.",
      "Explain the role of sub-directory app/controllers and app/helpers.",
      "Explain what is the role of sub-directory app/controllers and app/helpers?",
      "What do subdirectory app/controllers and app/helpers do?"
     ]
    },
    {
     "q": "Explain how you can run Rails application without creating databases?",
     "l": "B",
     "a": "Generate an application with --skip-active-record when no relational persistence is needed.",
     "e": "Alternatively remove Active Record railties and configuration carefully in an existing app. A Rails application can serve requests without a database, but components such as database-backed jobs or authentication persistence may still need one. config.frameworks in environment.rb is obsolete.",
     "x": [
      "rails new brochure --skip-active-record"
     ]
    },
    {
     "q": "How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)",
     "l": "B",
     "a": "Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby.",
     "e": "Hash#slice exists in Ruby 2.5+ without Rails; do not claim it is always Rails-only.",
     "x": [
      "require \"active_support/all\"\np 3.seconds\np({a: 1, b: 2}.slice(:a))",
      "require \"active_support/core_ext/object/blank\"\n\"   \".blank? # true\nfalse.blank? # true"
     ],
     "p": [
      "Hash#slice exists in Ruby 2.5+ without Rails; do not claim it is always Rails-only."
     ],
     "s": [
      "What is the role of ActiveSupport?",
      "What is ActiveSupport?"
     ]
    },
    {
     "q": "Discuss the Rails delegate method.",
     "l": "A",
     "a": "delegate forwards selected methods to a named object, reducing repetitive forwarding code.",
     "e": "This exposes a smaller interface without inheritance. Choose prefix: when forwarding could clash with local methods, and allow_nil: only if missing targets should return nil. Delegation does not automatically remove all domain or framework coupling.",
     "x": [
      "class User < ApplicationRecord\n  has_one :profile\n  delegate :full_name, to: :profile, prefix: true, allow_nil: true\nend\nuser.profile_full_name"
     ]
    },
    {
     "q": "What is PORO?",
     "l": "A",
     "a": "PORO means Plain Old Ruby Object: a regular Ruby object without a framework-specific inheritance requirement.",
     "e": "Use it for value objects, services or domain behavior that does not need Active Record persistence. PORO is a design description, not a Ruby keyword, and such an object can still collaborate with Rails when its dependencies are explicit.",
     "x": [
      "class Price\n  attr_reader :cents\n  def initialize(cents) = @cents = Integer(cents)\nend"
     ],
     "s": [
      "What is a PORO in Rails?"
     ]
    },
    {
     "q": "How does Rails autoloading work in Zeitwerk mode?",
     "l": "A",
     "a": "Zeitwerk maps constants to matching file paths and loads their definitions when referenced, with reloading in development and eager loading where configured.",
     "e": "A file such as app/services/payments/capture.rb should define Payments::Capture. Follow directory namespaces and inflection rules; do not manually require application autoloadable files to work around mismatches. Code executed once at boot must not hold stale references to reloadable constants.",
     "x": [
      "# app/services/payments/capture.rb\nmodule Payments\n  class Capture\n  end\nend\n# Check naming compliance:\nbin/rails zeitwerk:check"
     ]
    }
   ]
  ],
  [
   "Command line, rake and generators",
   [
    {
     "q": "Explain the difference between dynamic and static scaffolding.",
     "l": "B",
     "a": "Scaffolding generates starter model, migration, controller, view and test code for a resource’s CRUD behavior.",
     "e": "Modern Rails generates files that you review and customize. Historical dynamic scaffolding generated behavior at runtime and is not a current standard feature. Add authorization, valid input rules, suitable constraints and intentional UI behavior before relying on generated code in production.",
     "x": [
      "bin/rails generate scaffold Product name:string price:decimal\nbin/rails db:migrate"
     ]
    },
    {
     "q": "How do you create a custom generator in Rails?",
     "l": "B",
     "a": "Create a generator under lib/generators using Rails::Generators::Base and supported file/template actions.",
     "e": "A generator creates or modifies application files from arguments and options. Define a source_root for templates, make names predictable and test generation in a temporary destination. The generated artifact still needs application-specific review.",
     "x": [
      "class GreetingGenerator < Rails::Generators::Base\n  argument :name, type: :string\n  def create_file\n    create_file \"app/services/#{name.underscore}.rb\", \"class #{name.camelize}; end\\n\"\n  end\nend"
     ]
    },
    {
     "q": "How do you create a new Rails application?",
     "l": "B",
     "a": "Install/select a compatible Ruby and Rails version, then run rails new with an application name and any required options.",
     "e": "To create a new Rails application, you can use the Rails new command followed by the desired application name. For example, rails new MyAwesomeApp. This command generates a new Rails application with a basic directory structure, configuration files, and initial files for setting up the app's environment. You can also include various options to customize the application's setup, like specifying the database to use or skipping unnecessary files.",
     "x": [
      "rails new shop --database=postgresql\ncd shop\nbin/rails db:create\nbin/rails server",
      "rails new shop -d postgresql\ncd shop\nbin/rails db:prepare\nbin/rails server -p 3000"
     ],
     "p": [
      "These are terminal commands. Choose an application-specific supported version rather than blindly upgrading dependencies."
     ],
     "s": [
      "How do you create a new Rails project?",
      "Explain how to generate a new Rails application."
     ]
    },
    {
     "q": "How do you create a User model with name and email attributes using generator?",
     "l": "B",
     "a": "Use Rails generators to create the relevant model or controller files, then inspect the generated code and routes.",
     "e": "Generators provide a starting point, not business-complete application behavior. A model generator creates a migration; a controller generator only creates the requested actions/views/routes rather than a complete database resource.",
     "x": [
      "bin/rails generate model User name:string email:string\nbin/rails generate controller Subjects index show\nbin/rails db:migrate"
     ]
    },
    {
     "q": "How do you start a Rails server?",
     "l": "B",
     "a": "Run bin/rails server (or bin/rails s) in the application directory; modern generated applications normally use Puma.",
     "e": "The development default port is usually 3000; override it with -p. bin/rails uses the application’s bundled Rails version. Production requires appropriate process supervision, networking, secrets and database configuration.",
     "x": [
      "bin/rails server -p 4000\nbin/rails server -e production",
      "bin/rails server -p 4000\n# Open http://localhost:4000"
     ],
     "p": [
      "WEBrick as the default is historical, not a general statement about current Rails."
     ],
     "s": [
      "What is the purpose of the rail's server command?",
      "What is the purpose of the rails server command?"
     ]
    },
    {
     "q": "What is Rails Scaffolding?",
     "l": "B",
     "a": "A Rails scaffold generator creates an initial model, migration, controller, views, routes, and tests for resource CRUD.",
     "e": "It accelerates an application’s first implementation, but generated code still needs authorization, domain validation, accessible views, security review, and meaningful tests. The generated files vary with Rails version and installed generators.",
     "x": [
      "bin/rails generate scaffold Article title:string body:text",
      "bin/rails generate scaffold Product name:string price:decimal\nbin/rails db:migrate",
      "bin/rails generate scaffold Article title:string body:text\nbin/rails db:migrate"
     ],
     "p": [
      "Review generated migrations and routes before applying them.",
      "Inspect generated routes and permitted parameters before exposing CRUD."
     ],
     "s": [
      "What are Scaffolds in Rails?",
      "Explain what “scaffolding” is.",
      "What are the advantages of scaffolding in Ruby on Rails?",
      "What is a \"scaffold\" in Rails?"
     ]
    },
    {
     "q": "What is the purpose of the 'rails console'?",
     "l": "B",
     "a": "bin/rails console loads an interactive Ruby session with the application environment, so you can query models and inspect behavior.",
     "e": "The normal console can persist database changes. The --sandbox option wraps database work in a transaction that rolls back on exit, but it does not undo emails, file writes or external calls. Use explicit limits when exploring large datasets.",
     "x": [
      "bin/rails console\n# In console: User.where(active: true).limit(5).pluck(:id)",
      "Rails.logger.info(event: \"order_created\", order_id: order.id, request_id: request.request_id)\n# config.filter_parameters += [:password, :token]",
      "bin/rails console --sandbox\nUser.where(active: true).limit(5).pluck(:id, :email)"
     ],
     "p": [
      "Prefer read-only queries when investigating production behavior.",
      "A regular console is not an isolated security sandbox."
     ],
     "s": [
      "What does the rails console do?",
      "What is the rails console, and how is it useful for debugging?"
     ]
    },
    {
     "q": "How do you check the current version of Rails?",
     "l": "B",
     "a": "Run bin/rails --version inside the application to report the Rails version selected by that application’s bundle.",
     "e": "A global rails --version may describe a different installation. Gemfile.lock gives the resolved dependency versions and bundle exec constrains commands to that bundle.",
     "x": [
      "bin/rails --version\nbundle exec rails --version\nruby -v"
     ]
    },
    {
     "q": "What is Rake?",
     "l": "B",
     "a": "Rake is a Ruby task automation tool. Rakefiles define tasks and dependencies; Rails exposes many application tasks through bin/rails.",
     "e": "Rake is a Ruby Make; it is a Ruby utility that replaces the Unix utility 'make' and builds a list of tasks using a 'Rakefile' and '.rake files'. Rake is used in Rails for routine administration activities such as database migration via scripts, schema loading into the database, and so on.",
     "x": [
      "# Rakefile\nrequire \"rake\"\ntask :hello do\n  puts \"Hello\"\nend",
      "# lib/tasks/reports.rake\nnamespace :reports do\n  task daily: :environment do\n    puts Order.where(created_at: Time.current.all_day).count\n  end\nend\n# bin/rails reports:daily",
      "# lib/tasks/reports.rake\nnamespace :reports do\n  desc \"Show the report count\"\n  task count: :environment do\n    puts Report.count\n  end\nend\n# bin/rails reports:count"
     ],
     "p": [
      "A non-Rails Rakefile can define standalone tasks without :environment.",
      "Do not confuse db:reset with a safe incremental migration; it recreates the database."
     ],
     "s": [
      "Explain what “rake” means in Ruby on Rails.",
      "What is the purpose of the rake command in Rails?",
      "What is the purpose of the rakefile available in the demo directory in Ruby?",
      "Explain what is rake in Rails?",
      "What is a 'rake' task in Rails, and give an example?",
      "What is a rake task and how do you create one?",
      "How do you create a custom rake task in Rails?",
      "How do you write custom Rake tasks in Rails?",
      "What is a 'rake' task? Can you describe a common rake task?"
     ]
    },
    {
     "q": "How do you create a new controller in Rails using the command line?",
     "l": "B",
     "a": "Run bin/rails generate controller followed by a controller name and optional actions.",
     "e": "The generator creates controller-related files and action routes according to its templates. Use plural resource controller names conventionally, and explicitly configure resources when building RESTful CRUD routes; a list of generated actions alone does not imply correct HTTP verb handling.",
     "x": [
      "bin/rails generate controller Books index show\n# config/routes.rb:\n# resources :books, only: [:index, :show]",
      "bin/rails generate model User name:string email:string\nbin/rails generate controller Subjects index show\nbin/rails db:migrate"
     ],
     "p": [
      "Do not expose create/update/destroy as GET routes."
     ],
     "s": [
      "How can you create a controller in Rails?",
      "What command can you use to create a controller for the subject?"
     ]
    },
    {
     "q": "Explain what Spring is.",
     "l": "I",
     "a": "Spring is an optional development application preloader that can speed repeated commands by keeping an application process available.",
     "e": "It is not the Spring Java framework and not a guarantee that every server or configuration change reloads automatically. Commands and framework boot can use the preloader when installed/configured; restart it when stale process state causes problems.",
     "x": [
      "bin/spring status\nbin/spring stop"
     ],
     "s": [
      "What is Spring in Rails?"
     ]
    },
    {
     "q": "What's the difference between 'rails new' and 'rails generate'?",
     "l": "I",
     "a": "rails new creates an application; rails generate creates a component within an existing application.",
     "e": "The application generator establishes the project and dependency setup. Component generators create models, migrations, controllers, jobs, channels or scaffolds. Inspect generated code rather than treating it as finished business behavior.",
     "x": [
      "rails new bookstore\ncd bookstore\nbin/rails generate model Book title:string\nbin/rails generate controller Books index show"
     ],
     "p": [
      "Use bin/rails inside a project to use its bundled Rails."
     ]
    }
   ]
  ],
  [
   "Gems, plugins and engines",
   [
    {
     "q": "What are some of your favorite gems? What are their alternatives?",
     "l": "B",
     "a": "Choose tools based on the requirement and explain one you have actually used, including an alternative and its trade-off.",
     "e": "For example, Minitest versus RSpec concerns test style/tooling; Active Storage versus an upload gem concerns storage/workflow needs. Paperclip is a legacy attachment library and FactoryGirl is now FactoryBot. No list of gems is essential for every Rails app. Consult the API documentation matching the installed Ruby/Rails version.",
     "n": [
      "Example interview response: “I used Active Storage for direct S3 uploads; I considered Shrine when custom processing pipelines were the main requirement.”"
     ],
     "s": [
      "What gems do you consider essential in most Rails projects?"
     ]
    },
    {
     "q": "What is the difference between a plugin and a gem?",
     "l": "B",
     "a": "A gem is a Ruby package; a Rails plugin adds Rails-specific behavior and is commonly distributed as a gem with a railtie or engine.",
     "e": "The historical distinction between vendor/plugins and globally installed gems does not describe modern Bundler-based Rails projects. Dependency versions and load paths are selected per application bundle, even when installed gems share disk storage.",
     "x": [
      "Gemfile → gem dependency → optional Railtie/Engine hooks into the Rails application",
      "bin/rails plugin new audit_tools\n# Include the resulting package in an application through its Gemfile."
     ],
     "n": [
      "Ruby: puts \"hello\"\nRails: bin/rails new shop\nPython web framework comparison: Rails versus Django"
     ],
     "p": [
      "Distinguish historical Rails plugin layout from current packaging.",
      "A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect."
     ],
     "s": [
      "Mention What Is The Difference Between A Gem And A Plugin In Ruby?",
      "What is a plugin in Ruby on Rails?",
      "Explain the differences between gems and plugins in Ruby on Rails."
     ]
    },
    {
     "q": "What are Rails engines, and when would you use one?",
     "l": "A",
     "a": "A Rails engine packages Rails components and integrations that can be embedded in a host application.",
     "e": "A mountable engine can isolate its namespace and own routes, controllers, models, views, migrations and assets. Define its public interface and avoid depending on arbitrary host internals. Many Rails plugins are delivered as gems containing an engine or railtie.",
     "x": [
      "bin/rails plugin new billing --mountable\n# Host routes:\nmount Billing::Engine, at: \"/billing\"",
      "module Billing\n  class Engine < ::Rails::Engine\n    isolate_namespace Billing\n  end\nend\n# Host routes:\nmount Billing::Engine, at: \"/billing\""
     ],
     "n": [
      "I've worked with Rails engines in several projects to modularize functionality and promote code reuse. My experience includes using engines for creating reusable components like authentication systems, admin panels, and e-commerce platforms. A key example is using Devise, a popular authentication engine, to quickly integrate user authentication into a Rails application. I've also created custom engines for internal tools and shared libraries.\n\nI would use an engine when I want to isolate a specific set of features, making them independent and reusable across different parts of an application or even in multiple applications. This is particularly useful for complex functionalities that don't directly depend on the core application logic. For example, creating a blogging engine that can be easily plugged into different websites, or packaging a set of common utility functions and helpers as an engine for internal projects to avoid code duplication. Using engines enforces a cleaner separation of concerns and improves maintainability."
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ],
     "s": [
      "What are Rails engines?",
      "Which of the following best describes the primary purpose of a Rails Engine?",
      "Describe your experience with different Rails engines and when you would use an engine in a Rails project.",
      "Explain what a Rails engine is.",
      "How do you create and manage custom Rails engines for reusable code?",
      "What are Rails engines, and how can they help structure reusable components across multiple applications?",
      "What are the benefits of using Rails engines?",
      "What is a Rails engine?"
     ]
    }
   ]
  ],
  [
   "Rails features",
   [
    {
     "q": "How do you handle time zones in Rails?",
     "l": "B",
     "a": "Use Rails time-zone-aware APIs for application/user time and store timestamps consistently, typically in UTC.",
     "e": "Configure config.time_zone, use Time.current/Time.zone.now, and convert to the user’s zone for display. Scope per-request user zones with Time.use_zone. Calendar days are not always 24 hours around daylight-saving changes, so distinguish wall-clock schedules from elapsed durations.",
     "x": [
      "Time.use_zone(user.time_zone) { Time.current }"
     ]
    },
    {
     "q": "What are the different ways to handle internationalization (i18n) in a Rails application?",
     "l": "B",
     "a": "Use locale files and I18n.t for translations, and localization helpers for dates and numbers.",
     "e": "Choose a locale from an explicit allowlist and scope it to the request using I18n.with_locale. Setting thread-local locale without restoring it can leak state to another request on the same worker. Keep translation of interface strings separate from translation of stored user content.",
     "x": [
      "# config/locales/en.yml\nen:\n  hello: \"Hello\"\n# Ruby:\nI18n.with_locale(:en) { I18n.t(:hello) }",
      "around_action :with_locale\nprivate\ndef with_locale(&action)\n  locale = params[:locale].to_s.in?(%w[en fr]) ? params[:locale] : :en\n  I18n.with_locale(locale, &action)\nend"
     ],
     "p": [
      "pluralize is not a complete translation strategy; use locale-specific pluralization keys."
     ],
     "s": [
      "How does Rails support internationalization (i18n) and what is an example of using locale files for translations?",
      "How would you implement multi-language (i18n) support in Rails?",
      "How do you handle internationalization (i18n)?",
      "How do you configure internationalization (i18n) in Rails?",
      "Explain how you would handle internationalization (i18n) and localization (l10n) in a Rails application."
     ]
    },
    {
     "q": "What does CRUD mean?",
     "l": "B",
     "a": "CRUD stands for Create, Read, Update and Delete, the basic operations on persisted data.",
     "e": "Active Record supplies create/new+save, find/where, update and destroy/delete. HTTP routes often map POST, GET, PATCH/PUT and DELETE to these operations; form-display actions new/edit are separate from the actual writes.",
     "x": [
      "post = Post.create!(title: \"Draft\")\nPost.find(post.id)\npost.update!(title: \"Published\")\npost.destroy!",
      "user = User.create!(name: \"Ada\", email: \"ada@example.test\")\nuser = User.find(user.id)\nuser.update!(name: \"Grace\")\nuser.destroy!",
      "resources :posts\n# POST /posts -> create\n# PATCH /posts/:id -> update\n# DELETE /posts/:id -> destroy"
     ],
     "p": [
      "Database delete and Rails destroy have different callback behavior."
     ],
     "s": [
      "What does CRUD stand for? Give examples of how CRUD actions relate to a 'User' model.",
      "What is CRUD in the context of Rails?",
      "What is CRUD, and how is it implemented in Rails?",
      "How can you perform CRUD (Create, Read, Update, Delete) operations in Rails?"
     ]
    }
   ]
  ],
  [
   "Rails versions",
   [
    {
     "q": "Mention what is the purpose of RJs in Rails?",
     "l": "B",
     "a": "RJS was a historical Rails template mechanism for generating JavaScript responses, associated with the Prototype-era Rails stack.",
     "e": "Treat it as legacy knowledge. Modern Rails commonly uses Turbo Streams/Frames, standard JavaScript modules and JSON responses rather than returning strings for eval. Evaluate the existing application’s Rails and frontend version before migrating it.",
     "x": [
      "# Modern replacement example:\nrender turbo_stream: turbo_stream.replace(@post, partial: \"posts/post\", locals: { post: @post })"
     ]
    },
    {
     "q": "What are the key differences between Rails 4 and Rails 5?",
     "l": "B",
     "a": "Rails 5 introduced major additions including Action Cable, API-only application generation, and ApplicationRecord as the application’s model base class.",
     "e": "Rails 5 also made belongs_to required by default for new applications, subject to configuration. Explain this as historical version knowledge; both lines are old, so a production upgrade needs current maintenance/security review rather than stopping at Rails 5.",
     "x": [
      "# Rails 5+ application-level base model:\nclass User < ApplicationRecord\nend"
     ]
    },
    {
     "q": "What are the major improvements introduced in Rails 8?",
     "l": "B",
     "a": "Rails 8 introduced modern defaults including Propshaft, Solid Queue, Solid Cache, Solid Cable, Kamal 2/Thruster deployment support and an authentication generator.",
     "e": "Differentiate a framework release’s features from a particular app’s settings: upgrading does not require every application to replace its existing adapters immediately. Solid Queue is database-backed and can use SQLite, PostgreSQL or MySQL. Confirm Ruby and database requirements against the chosen Rails minor version.",
     "x": [
      "bin/rails generate authentication\n# New applications can use the database-backed Solid adapters without Redis."
     ]
    },
    {
     "q": "How would you migrate a Rails application from an old version (e.g., Rails 4 to Rails 6)?",
     "l": "A",
     "a": "Upgrade one minor version at a time (4.2 → 5.0 → 5.1 → 5.2 → 6.0), with a good test suite. At each step fix deprecation warnings, update gems, run bin/rails app:update and gradually switch to the new framework defaults.",
     "e": "Also upgrade Ruby to a supported version, read each release’s upgrade guide, and use new_framework_defaults_*.rb to enable new behavior one setting at a time. Big changes on the way to Rails 6 include ApplicationRecord, belongs_to required by default, strong parameters as objects, Zeitwerk autoloading and Webpacker. Deploy each step separately.",
     "p": [
      "Mention the dual-boot technique (next_rails gem) for running tests on both versions during the upgrade."
     ]
    }
   ]
  ],
  [
   "Experience and best practices",
   [
    {
     "q": "Describe a challenging bug you resolved in Rails.",
     "l": "B",
     "a": "Describe a real bug using the symptom, evidence, root cause, fix, verification and prevention; do not invent an experience.",
     "e": "A useful answer explains what you measured and why the final change addressed the cause. If practicing without a real example, label the scenario as hypothetical. Include a regression test or operational alert that would catch recurrence.",
     "n": [
      "Hypothetical practice: a page emits 101 SQL queries for 100 posts; logs show repeated author lookups; preload authors and verify both correctness and the reduced query count.",
      "In one instance, we experienced intermittent failures in processing payments through our Rails application. The symptoms were inconsistent; some payments went through, others failed without clear error messages in the logs. My debugging process involved several steps. First, I examined the logs at various levels: Rails logs, background job logs (Sidekiq), and the payment gateway's logs, correlating timestamps across systems. This revealed a pattern where failures often coincided with peak traffic. Second, I used pry and debugging gems like byebug to step through the payment processing code, specifically the interaction with the payment gateway API. This helped to narrow down the issue to a race condition where concurrent requests were attempting to update the same payment record in the database.\n\nTo resolve this, I implemented a pessimistic locking mechanism using with_lock in the Rails model to ensure only one process could update the payment record at a time. Additionally, I implemented idempotency keys in the payment requests to the gateway to prevent duplicate charges in case of retries. Finally, I added more robust error handling and logging around the payment gateway integration. We also tweaked the sidekiq concurrency settings. After deploying these changes and monitoring for several days, the intermittent failures were resolved."
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ],
     "s": [
      "Describe a time you had to debug a complex issue in a Rails application. What steps did you take to identify and resolve the problem?"
     ]
    },
    {
     "q": "How do you ensure code quality in large applications?",
     "l": "B",
     "a": "Organize code around cohesive business responsibilities, keep request coordination small, and add explicit service, query, form or policy objects when they clarify real complexity.",
     "e": "Avoid replacing every method with a pattern just to satisfy a slogan. Establish clear module boundaries and dependency direction, test the boundaries, monitor coupling and use automated formatting/static analysis. Engines are useful for reusable bounded components but add integration cost. State what changed in a real project and why it improved maintainability.",
     "x": [
      "app/services/checkout.rb\napp/queries/recent_orders.rb\napp/policies/order_policy.rb\napp/models/order.rb"
     ],
     "s": [
      "How do you ensure your code stays maintainable as a Rails app grows?"
     ]
    },
    {
     "q": "List some things you would change about Rails",
     "l": "B",
     "a": "Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails.",
     "e": "Distinguish personal preference from language/framework facts.",
     "x": [
      "# Example interview discussion: replace a callback-heavy purchase workflow with an explicit transactional service and reliable event delivery."
     ],
     "p": [
      "Distinguish personal preference from language/framework facts."
     ]
    },
    {
     "q": "What are some common anti-patterns you’ve seen in Rails apps?",
     "l": "B",
     "a": "Common anti-patterns are fat controllers, god models with thousands of lines, callback chains that hide business logic, N+1 queries, business logic in views, default_scope, rescuing every exception, and missing database constraints and indexes.",
     "e": "For each one, mention the fix: move logic into models or service objects, extract concerns or POROs from god models, prefer explicit service calls over complex callbacks, use includes and strict_loading, use presenters or helpers for view logic, and back validations with database constraints."
    },
    {
     "q": "Can you describe a project where you implemented Ruby on Rails to solve a business problem?",
     "l": "I",
     "a": "Describe a real project with the STAR structure: the business problem, your responsibility, what you built in Rails (models, key features, integrations) and the measurable result.",
     "e": "Example structure: “Our support team handled refunds by email. I built a Rails refund module with a Refund model and state machine, an admin interface, a Stripe integration in a background job and tests. Refund time went from two days to a few hours.” Use your own work and only numbers you can support."
    },
    {
     "q": "Can you describe a real-world scenario where you used MVC, and what challenges did you encounter?",
     "l": "I",
     "a": "Answer from your own experience: describe a feature, what lived in the model, controller and view, and a problem you solved, such as a controller that grew too large or a slow view.",
     "e": "A good structure: the context (for example an order checkout), how MVC split the work (Order model with validations and totals, OrdersController for the flow, views/partials for the form), the challenge (business logic leaking into the controller, N+1 queries in the view), and what you did (moved logic to a model or service object, added includes).",
     "p": [
      "Keep it truthful and specific; interviewers ask follow-up questions on the details."
     ]
    },
    {
     "q": "What Rails design patterns have you used?",
     "l": "I",
     "a": "Common patterns in Rails apps: service objects, form objects, query objects, presenters or decorators, policy objects (Pundit), concerns, value objects, and the Active Record and observer (callbacks/notifications) patterns built into Rails.",
     "e": "Describe one you used and why. Example: a service object for checkout that coordinates order creation, payment and email; a query object for a complex report; a form object for a multi-model sign-up form.",
     "x": [
      "class Orders::Checkout\n  def initialize(cart, payment_method)\n    @cart, @payment_method = cart, payment_method\n  end\n\n  def call\n    Order.transaction do\n      order = Order.create_from_cart!(@cart)\n      PaymentGateway.charge!(order, @payment_method)\n      order\n    end\n  end\nend"
     ]
    },
    {
     "q": "What are best practices for Rails development?",
     "l": "A",
     "a": "Follow Rails conventions while keeping domain workflows explicit, input/authorization checks correct, database constraints authoritative and side effects reliable. Profile queries, paginate and test failure paths.",
     "e": "Uniqueness validation needs a database unique constraint for races; callbacks/jobs are not exactly-once delivery. Use authorization-aware cache keys, avoid caching unbounded User.all objects, sanitize LIKE wildcards when needed and protect secrets.",
     "x": [
      "# Application model sketch:\nclass Order < ApplicationRecord\n  after_create_commit :enqueue_receipt\n  private\n  def enqueue_receipt; ReceiptJob.perform_later(id); end\nend"
     ]
    },
    {
     "q": "Describe your experience with different Rails code analysis tools (e.g., RuboCop, Brakeman) and how they help improve code quality.",
     "l": "A",
     "a": "Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. Rake tasks automate named operations; Rails exposes many built-in tasks through bin/rails.",
     "e": "Custom tasks belong in lib/tasks/*.rake. Depend on :environment when the task needs the application models. Make maintenance tasks resumable and safe for the selected environment. Modern route inspection uses bin/rails routes rather than assuming rake routes exists.",
     "x": [
      "namespace :reports do\n  task refresh: :environment do\n    Report.find_each { |report| RefreshJob.perform_later(report.id) }\n  end\nend\n# bin/rails reports:refresh"
     ],
     "p": [
      "Do not confuse db:reset with a safe incremental migration; it recreates the database.",
      "A truthful project answer should include what you personally did and how the result was measured."
     ]
    },
    {
     "q": "Describe your experience with different Rails ORMs (e.g., ActiveRecord, Sequel) and your preferred approach to interacting with databases.",
     "l": "A",
     "a": "Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching.",
     "e": "I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching. While ActiveRecord is my go-to, I've briefly explored Sequel for projects requiring more flexibility or a different approach to database interactions. My preferred approach generally involves leveraging ActiveRecord's strengths for common tasks, writing efficient SQL when needed and prioritizing database performance (e.g., proper indexing, avoiding N+1 queries). I also use database-specific features or functions through raw SQL when appropriate, as not everything can or should be abstracted through an ORM. I pay close attention to the queries generated to verify their efficiency.",
     "n": [
      "I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching.\n\nWhile ActiveRecord is my go-to, I've briefly explored Sequel for projects requiring more flexibility or a different approach to database interactions. My preferred approach generally involves leveraging ActiveRecord's strengths for common tasks, writing efficient SQL when needed and prioritizing database performance (e.g., proper indexing, avoiding N+1 queries). I also use database-specific features or functions through raw SQL when appropriate, as not everything can or should be abstracted through an ORM. I pay close attention to the queries generated to verify their efficiency."
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ]
    },
    {
     "q": "Describe a challenging Rails project you worked on and the lessons you learned from it.",
     "l": "A",
     "a": "Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. One challenging Rails project involved building a complex inventory management system for a retail chain. The biggest hurdle was integrating with multiple existing legacy systems for order processing, shipping, and payment. This required writing custom API connectors and dealing with inconsistent data formats across different systems. We also faced performance issues as the inventory grew, which we addressed by implementing database indexing, caching, and background jobs for asynchronous tasks.",
     "e": "One challenging Rails project involved building a complex inventory management system for a retail chain. The biggest hurdle was integrating with multiple existing legacy systems for order processing, shipping, and payment. This required writing custom API connectors and dealing with inconsistent data formats across different systems. We also faced performance issues as the inventory grew, which we addressed by implementing database indexing, caching, and background jobs for asynchronous tasks. The key lessons learned were the importance of thorough upfront planning and documentation when dealing with legacy systems, the necessity of robust error handling and monitoring, and the benefits of using background processing to improve performance. Specifically, we used Redis for caching and Sidekiq for asynchronous tasks, greatly improving response times. Also, testing integrations with legacy systems proved critical in identifying and addressing compatibility issues early on.",
     "n": [
      "One challenging Rails project involved building a complex inventory management system for a retail chain. The biggest hurdle was integrating with multiple existing legacy systems for order processing, shipping, and payment. This required writing custom API connectors and dealing with inconsistent data formats across different systems. We also faced performance issues as the inventory grew, which we addressed by implementing database indexing, caching, and background jobs for asynchronous tasks.\n\nThe key lessons learned were the importance of thorough upfront planning and documentation when dealing with legacy systems, the necessity of robust error handling and monitoring, and the benefits of using background processing to improve performance. Specifically, we used Redis for caching and Sidekiq for asynchronous tasks, greatly improving response times. Also, testing integrations with legacy systems proved critical in identifying and addressing compatibility issues early on."
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ]
    },
    {
     "q": "Describe your experience contributing to open-source Rails projects or developing your own Rails gems.",
     "l": "A",
     "a": "Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. While I haven't directly contributed to major open-source Rails projects or published widely-used gems, I have actively used and extended existing gems within my projects. I've submitted bug reports and feature requests, and also created internal Rails engines to encapsulate reusable functionality across multiple applications, effectively creating mini-gems for internal use. For example, I built an internal engine to handle user authentication and authorization using JWT, which significantly reduced code duplication. I've also explored contributing to gems by studying their code and documentation.",
     "e": "While I haven't directly contributed to major open-source Rails projects or published widely-used gems, I have actively used and extended existing gems within my projects. I've submitted bug reports and feature requests, and also created internal Rails engines to encapsulate reusable functionality across multiple applications, effectively creating mini-gems for internal use. For example, I built an internal engine to handle user authentication and authorization using JWT, which significantly reduced code duplication. I've also explored contributing to gems by studying their code and documentation. To better prepare for contributing, I am actively working on a small Rails gem that provides a streamlined interface for interacting with a specific third-party API. This involves:\n\nStructuring the gem using best practices. Writing comprehensive tests with RSpec. Documenting the API using YARD. Setting up continuous integration using GitHub Actions\nThis project is helping me gain a deeper understanding of gem development and the open-source contribution workflow, so that I can contribute more actively to Rails projects in the future. Ruby on Rails MCQ\nQuestion 1. In a Ruby on Rails application, which file is primarily responsible for configuring settings specific to the 'production' environment?",
     "n": [
      "While I haven't directly contributed to major open-source Rails projects or published widely-used gems, I have actively used and extended existing gems within my projects. I've submitted bug reports and feature requests, and also created internal Rails engines to encapsulate reusable functionality across multiple applications, effectively creating mini-gems for internal use. For example, I built an internal engine to handle user authentication and authorization using JWT, which significantly reduced code duplication. I've also explored contributing to gems by studying their code and documentation.\n\nTo better prepare for contributing, I am actively working on a small Rails gem that provides a streamlined interface for interacting with a specific third-party API. This involves:\n\nStructuring the gem using best practices.\nWriting comprehensive tests with RSpec.\nDocumenting the API using YARD.\nSetting up continuous integration using GitHub Actions\nThis project is helping me gain a deeper understanding of gem development and the open-source contribution workflow, so that I can contribute more actively to Rails projects in the future.\n\nRuby on Rails MCQ\nQuestion 1.\nIn a Ruby on Rails application, which file is primarily responsible for configuring settings specific to the 'production' environment?"
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ]
    },
    {
     "q": "How do you approach code reviews in a Rails project, and what are the key things you look for in a code review?",
     "l": "A",
     "a": "Review behavior, security, performance and maintainability; use static tools to support human review.",
     "e": "Check requirements, authorization boundaries, failure handling, database constraints, query counts and tests. RuboCop flags style and selected code smells; Brakeman detects classes of Rails security problems. Neither proves correctness or reliably finds every insecure direct object reference or design violation.",
     "x": [
      "bundle exec rubocop\nbundle exec brakeman\nbin/rails test"
     ],
     "p": [
      "Prioritize defects and explain the impact of a review suggestion."
     ]
    },
    {
     "q": "How do you stay up-to-date with the latest trends and best practices in the Rails ecosystem?",
     "l": "A",
     "a": "Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. I stay current with the Rails ecosystem through a combination of active learning and community engagement. I regularly read Rails-related blogs like Ruby Weekly and Rails Weekly to keep abreast of new features, security updates, and performance improvements. I also follow prominent Rails developers and thought leaders on platforms like Twitter and Mastodon.",
     "e": "I stay current with the Rails ecosystem through a combination of active learning and community engagement. I regularly read Rails-related blogs like Ruby Weekly and Rails Weekly to keep abreast of new features, security updates, and performance improvements. I also follow prominent Rails developers and thought leaders on platforms like Twitter and Mastodon. I actively participate in online communities, such as the Rails subreddit and Stack Overflow, to learn from others' experiences and contribute my own knowledge. Exploring open-source Rails projects on GitHub, attending online conferences or meetups, and experimenting with new gems are also crucial for hands-on learning. Reading documentation for new gems is also helpful. Finally, using tools like bundle outdated and running upgrade tools is useful to stay abreast of changes and plan updates.",
     "n": [
      "I stay current with the Rails ecosystem through a combination of active learning and community engagement. I regularly read Rails-related blogs like Ruby Weekly and Rails Weekly to keep abreast of new features, security updates, and performance improvements. I also follow prominent Rails developers and thought leaders on platforms like Twitter and Mastodon.\n\nI actively participate in online communities, such as the Rails subreddit and Stack Overflow, to learn from others' experiences and contribute my own knowledge. Exploring open-source Rails projects on GitHub, attending online conferences or meetups, and experimenting with new gems are also crucial for hands-on learning. Reading documentation for new gems is also helpful. Finally, using tools like bundle outdated and running upgrade tools is useful to stay abreast of changes and plan updates."
     ],
     "p": [
      "A truthful project answer should include what you personally did and how the result was measured."
     ]
    }
   ]
  ],
  [
   "Career questions",
   [
    {
     "q": "How can recruiters reduce time-to-hire for Rails developers?",
     "l": "B",
     "a": "Evaluate demonstrated technical judgment, project responsibility, communication and practical problem-solving rather than treating years of experience as a fixed skill score.",
     "e": "Use a consistent job-relevant rubric, realistic coding/debugging exercises and discussion of previous work. Keep interviews accessible and avoid unnecessary repeated assessments.",
     "n": [
      "Rubric example: identify the root cause of an N+1 endpoint, implement a fix, verify query behavior and explain the chosen trade-offs."
     ],
     "s": [
      "Why is skill-based hiring important for Rails roles?"
     ]
    },
    {
     "q": "How do you assess Ruby on Rails developer skills?",
     "l": "B",
     "a": "Strong Ruby fundamentals; Rails MVC and conventions; Active Record and SQL; REST APIs; testing (RSpec or Minitest); security basics; Git; some front-end (HTML, CSS, JavaScript, Hotwire); and debugging and performance skills.",
     "e": "Interviewers assess these with concept questions, a live coding task, a code review or debugging exercise, and questions about your past projects. Soft skills (communication, problem decomposition, attention to detail) are assessed throughout.",
     "s": [
      "Which skills do developers need to use Ruby on Rails?",
      "What skills are needed for a Rails developer job?"
     ]
    },
    {
     "q": "How much does a Ruby on Rails developer make?",
     "l": "B",
     "a": "Salaries vary widely by country, city and experience, and change every year, so check current data from sources such as Glassdoor, Levels.fyi or local job boards rather than a fixed number.",
     "e": "In an interview, this usually comes up as an expected-salary question. Research the market rate for your location and experience level beforehand, and give a range based on that research."
    },
    {
     "q": "Is Ruby on rails good for freelancing?",
     "l": "B",
     "a": "Yes. Rails is well suited to freelancing because one developer can build and maintain a complete product, and many startups and existing Rails apps need maintenance, upgrades and new features.",
     "e": "Typical freelance work: MVPs for startups, upgrading old Rails versions, performance fixes and adding features to existing apps. A portfolio of shipped projects matters more than certificates."
    },
    {
     "q": "Is Ruby on Rails in demand?",
     "l": "B",
     "a": "Yes. Rails is no longer the newest framework, but it is mature and still widely used by companies such as Shopify, GitHub, GitLab, Basecamp and many startups, so there is steady demand, especially for experienced developers.",
     "e": "Many companies run large Rails codebases that need developers for features, upgrades and performance work. Rails 7 and 8 (Hotwire, Solid Queue, Kamal) keep it competitive for new projects. Demand varies by region, so check local job boards."
    },
    {
     "q": "What does a Ruby on Rails developer do?",
     "l": "B",
     "a": "A Rails developer builds and maintains web applications and APIs: designing models and database schemas, writing controllers, views and background jobs, integrating third-party services, writing tests and keeping the app secure and fast.",
     "e": "Day to day this includes code reviews, fixing bugs found in production, writing migrations, optimizing queries, upgrading Rails and gems, and working with product and front-end teams. Senior developers also own architecture decisions and mentor others."
    },
    {
     "q": "What experience is required for a senior Rails developer?",
     "l": "B",
     "a": "Usually 4–5 or more years of building and running production Rails applications, plus the ability to design systems, make trade-offs and lead others, not just write features.",
     "e": "Interviewers expect a senior developer to understand Ruby deeply, design data models and APIs, find performance and scaling problems, handle security, plan Rails upgrades, review code, mentor juniors and communicate with non-technical stakeholders. Years matter less than the scope of what you have owned."
    }
   ]
  ],
  [
   "Interview preparation",
   [
    {
     "q": "How do I prepare for a Rails interview?",
     "l": "B",
     "a": "Revise Ruby fundamentals and Rails core topics (MVC, Active Record, associations, migrations, routing, security, testing, background jobs), practice live coding in Ruby, and prepare clear stories about your own projects.",
     "e": "Build or review a small Rails app end to end, practice explaining N+1 queries, callbacks and transactions, solve a few coding problems aloud with a timer, and prepare questions for the interviewer. Be ready to discuss trade-offs and things that went wrong in your projects.",
     "s": [
      "What are the most common Ruby on Rails interview questions?",
      "What are the most important Ruby on Rails interview questions?"
     ]
    }
   ]
  ]
 ],
 "rails_interview_models": [
  [
   "Active Record basics",
   [
    {
     "q": "What are the advantages and disadvantages of using an ORM?",
     "l": "B",
     "a": "ORM reduces repetitive persistence code, provides composable queries and associations, and improves developer productivity through a consistent object interface.",
     "e": "Parameter binding can reduce injection risk and adapters offer partial portability, but raw interpolation can still be unsafe. Evaluate maintainability and SQL behavior rather than assuming an ORM guarantees security or the fastest query.",
     "x": [
      "User.where(active: true).order(:id).limit(20)\n# Instead of hand-writing repetitive row-to-object mapping.",
      "posts = Post.all\nposts.each { |post| puts post.author.name } # potential N+1\n# Use preload/includes when those associations are needed."
     ],
     "s": [
      "What are the advantages of using ORM?",
      "What are disadvantages of using ORM?"
     ]
    },
    {
     "q": "What is a Rails model, and what does it do?",
     "l": "B",
     "a": "A Rails model is a Ruby object representing domain data and behavior; a database-backed model normally inherits from ApplicationRecord.",
     "e": "Migrations define database columns and Rails exposes typed attribute methods from the schema. Models can declare validations, associations, scopes and domain operations. Non-persistent models can use Active Model, so the term model is broader than a database table.",
     "x": [
      "bin/rails generate model User name:string email:string\nbin/rails db:migrate",
      "class Product < ApplicationRecord\n  validates :name, presence: true\n  validates :price, numericality: { greater_than: 0 }\nend\n# products table: name:string, price:decimal",
      "class ApplicationRecord < ActiveRecord::Base\n  primary_abstract_class\nend\nclass User < ApplicationRecord\nend"
     ],
     "p": [
      "On live large tables, assess locking and data-backfill behavior separately.",
      "Use a decimal or integer minor units for money rather than a binary float."
     ],
     "s": [
      "How would you create a simple model in Rails?",
      "How do you define a model with attributes in Rails?",
      "How would you define a model in Rails? Can you give a simple example?",
      "How do you define a User model in Rails?"
     ]
    },
    {
     "q": "What is the purpose of the ApplicationRecord class in Rails?",
     "l": "B",
     "a": "Define User as a subclass of ApplicationRecord; ApplicationRecord is the application’s abstract Active Record base class.",
     "e": "The User class maps to users by convention. Shared model configuration can live in ApplicationRecord. Defining a Ruby class alone does not create a database table; use a migration. Keep application-wide callbacks in the base class rare because they affect every model.",
     "x": [
      "class ApplicationRecord < ActiveRecord::Base\n  primary_abstract_class\nend\nclass User < ApplicationRecord\nend"
     ]
    },
    {
     "q": "How to override table name in Active Record?",
     "l": "B",
     "a": "Assign self.table_name in the model when a legacy table does not follow Rails naming conventions.",
     "e": "The override changes the table used for model persistence and queries. Check primary-key and foreign-key configuration separately, and preserve conventions unless an existing schema requires a different mapping.",
     "x": [
      "class Product < ApplicationRecord\n  self.table_name = \"legacy_products\"\nend"
     ]
    },
    {
     "q": "What are the optional reserved column names you can use in Active Record?",
     "l": "B",
     "a": "Rails recognizes columns such as created_at, updated_at, lock_version, type, polymorphic *_type columns and association counter-cache columns.",
     "e": "created_at/updated_at support timestamps, lock_version enables optimistic locking, and type activates single-table inheritance by default. These names are conventions, not a ban on all other columns. Counter caches ordinarily use the associated table’s plural name, such as comments_count.",
     "n": [
      "add_column :posts, :lock_version, :integer, default: 0, null: false\nadd_column :posts, :comments_count, :integer, default: 0, null: false"
     ]
    },
    {
     "q": "What is the difference between Active Record and Active Model?",
     "l": "B",
     "a": "Active Record adds database persistence and ORM behavior; Active Model provides reusable model interfaces without requiring a database table.",
     "e": "Use ActiveModel::Model for a form or service input object with validations and naming conventions. Use ApplicationRecord for persisted relational records. Active Model underpins parts of Active Record but does not itself provide the relational query interface.",
     "x": [
      "class ContactForm\n  include ActiveModel::Model\n  attr_accessor :email\n  validates :email, presence: true\nend"
     ]
    },
    {
     "q": "What is Active Record in Rails, and how does it relate to ORM?",
     "l": "B",
     "a": "Active Record is Rails’ Object-Relational Mapping layer: model classes usually represent tables, instances represent rows, and attributes represent columns.",
     "e": "It supplies query relations, persistence, type casting, associations, validations, callbacks, and migrations. It does not remove the need to understand SQL, indexes, transaction boundaries, or database constraints. Model objects can also be non-persistent Active Model objects, so not every Rails model must map to a table.",
     "x": [
      "class User < ApplicationRecord\n  has_many :posts\n  validates :email, presence: true\nend\nUser.where(active: true).order(:id).limit(20)",
      "class User < ApplicationRecord\n  validates :email, presence: true\nend\nUser.where(active: true).limit(20)",
      "class User < ApplicationRecord\n  has_many :posts\nend\nUser.where(active: true).order(:id).limit(20)"
     ],
     "p": [
      "Active Record is a Rails component, not part of Ruby core.",
      "ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.",
      "ORM means Object-Relational Mapping, not Object Relationship Model.",
      "Application validations alone cannot enforce uniqueness under concurrency."
     ],
     "s": [
      "What is Active Record in Ruby on Rails?",
      "What is Active Record in Rails?",
      "What exactly is the role of Active Record in Ruby?",
      "What is ActiveRecord in Rails?",
      "What is ActiveRecord?",
      "What is Active Record?",
      "What is Rails Active Record in Ruby on Rails?",
      "What is ActiveRecord? What does it help us do?",
      "Explain ORM in Ruby on Rails?",
      "What is the object relationship model in Ruby on Rails?",
      "What is ORM in Rails?",
      "What is ORM?",
      "Explain what ORM means in Ruby on Rails.",
      "Explain what is ORM (Object-Relationship-Model) in Rails?",
      "What is ORM(Object-Relationship-Model).",
      "What is the Object Relationship Model (ORM) in Rails?",
      "Explain Ruby’s ActiveRecord and how it is used in Rails applications.",
      "Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions.",
      "Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions.",
      "What do you understand about Rails Active Record in ROR?",
      "What exactly do you know about the Active Records Rail?",
      "What is an Active Record in Rails?",
      "What is the difference between Active Record and ORM?"
     ]
    },
    {
     "q": "Describe how Rails implements single-table inheritance (STI).",
     "l": "I",
     "a": "Single-table inheritance stores a base class and its subclasses in one table, usually using a type column to select the Ruby subclass.",
     "e": "Use it when subclasses truly share an is-a relationship and much of their schema. Unrelated types can create sparse tables, complicated validations and accidental type coupling. It differs from polymorphic associations, which link records of different models without making those models subclasses of a shared persisted type.",
     "x": [
      "class Vehicle < ApplicationRecord; end\nclass Car < Vehicle; end\nclass Truck < Vehicle; end\nCar.create! # vehicles.type is \"Car\""
     ]
    },
    {
     "q": "What is the difference between ActiveRecord and Mongoid?",
     "l": "A",
     "a": "Active Record maps relational rows and associations; Mongoid maps MongoDB documents and supports embedding/references. Both require intentional schema, consistency and indexing design.",
     "e": "MongoDB/Mongoid support multi-document ACID transactions on suitable deployments. \"Mongoid means eventual consistency/no migrations\" is an inaccurate absolute; document schema changes still need migration/backfill planning.",
     "x": [
      "# Relational example:\n# class Order < ApplicationRecord; belongs_to :user; end\n# Document example requires Mongoid::Document and configured MongoDB."
     ],
     "p": [
      "Verification: https://www.mongodb.com/docs/mongoid/current/interact-data/transaction/"
     ]
    },
    {
     "q": "What is the Active Record architecture pattern?",
     "l": "A",
     "a": "The Active Record pattern combines an object’s persistent data and the operations that load, save, update and delete its database row.",
     "e": "Rails’ ActiveRecord library implements this pattern along with querying, relationships and callbacks. It differs from a Data Mapper approach, where persistence mapping is separated from the domain object. Active Record is convenient for data-oriented applications but can couple domain behavior to schema/persistence concerns.",
     "x": [
      "class Product < ApplicationRecord\n  def discounted_price(percent)\n    price * (100 - percent) / 100\n  end\nend\nproduct = Product.find(1)\nproduct.update!(price: product.discounted_price(10))"
     ]
    }
   ]
  ],
  [
   "Associations",
   [
    {
     "q": "What is the difference between dependent: :destroy and :delete?",
     "l": "B",
     "a": "dependent: :destroy loads each child and calls destroy on it, so the children’s callbacks and their own dependent options run. dependent: :delete_all deletes the children with one SQL statement and skips callbacks.",
     "e": "Use :destroy when children have callbacks or further dependents (attachments, nested records); it is slower because it instantiates every row. Use :delete_all for many simple rows. Other options: :nullify sets the foreign key to NULL, :restrict_with_error and :restrict_with_exception block deleting a parent that still has children.",
     "x": [
      "class Author < ApplicationRecord\n  has_many :books, dependent: :destroy        # runs Book callbacks\n  has_many :page_views, dependent: :delete_all # one DELETE query\n  has_many :drafts, dependent: :nullify\nend"
     ],
     "p": [
      "On has_one and belongs_to the option is :delete, not :delete_all.",
      "A foreign key with on_delete: :cascade in the database is an even faster alternative but skips Rails entirely."
     ]
    },
    {
     "q": "What is the difference between has_many :through and has_and_belongs_to_many and which one is better?",
     "l": "B",
     "a": "Use has_and_belongs_to_many for a simple many-to-many join table; use has_many :through when the relationship needs its own model, behavior, validations, or extra data.",
     "e": "Both need a database join structure. HABTM does not automatically create the table from model declarations; use a migration. With a join model, treat membership itself as an entity, such as Enrollment holding joined_at or status. A uniqueness index can prevent duplicate memberships.",
     "x": [
      "class User < ApplicationRecord\n  has_many :memberships\n  has_many :groups, through: :memberships\nend\nclass Membership < ApplicationRecord\n  belongs_to :user\n  belongs_to :group\nend",
      "class Enrollment < ApplicationRecord\n  belongs_to :student\n  belongs_to :course\nend\nclass Student < ApplicationRecord\n  has_many :enrollments\n  has_many :courses, through: :enrollments\nend"
     ],
     "p": [
      "Neither association is universally better."
     ],
     "s": [
      "What is the difference between has many: through and has_and_belongs_to_many associations?",
      "What is the difference between has_many :through and has_and_belongs_to_many?"
     ]
    },
    {
     "q": "What is the difference between has_many and belongs_to?",
     "l": "B",
     "a": "belongs_to goes on the model whose table has the foreign key (books.author_id); has_many goes on the other side and returns a collection.",
     "e": "belongs_to :author adds book.author and, since Rails 5, requires the author to exist unless optional: true. has_many :books adds author.books, author.books.create and so on. They are usually defined as a pair.",
     "x": [
      "class Author < ApplicationRecord\n  has_many :books\nend\n\nclass Book < ApplicationRecord\n  belongs_to :author   # books table has author_id\nend\n\nauthor.books.create!(title: \"Ruby\")\nbook.author.name"
     ],
     "s": [
      "Which of the following statements best describes the belongs_to association in Rails Active Record?"
     ]
    },
    {
     "q": "How does the has_many :through association work?",
     "l": "B",
     "a": "has_many :through connects two models through a third join model, so you can read across it (doctor.patients) while the join model (Appointment) holds its own data and validations.",
     "e": "Rails builds the query with a JOIN on the join table. Because the join model is a real model, it can have attributes such as scheduled_at, callbacks and validations, which has_and_belongs_to_many cannot.",
     "x": [
      "class Doctor < ApplicationRecord\n  has_many :appointments\n  has_many :patients, through: :appointments\nend\n\nclass Appointment < ApplicationRecord\n  belongs_to :doctor\n  belongs_to :patient\nend\n\nclass Patient < ApplicationRecord\n  has_many :appointments\n  has_many :doctors, through: :appointments\nend\n\ndoctor.patients  # SELECT patients.* FROM patients INNER JOIN appointments ..."
     ]
    },
    {
     "q": "What is a join table in Rails and how do you create one using generator?",
     "l": "B",
     "a": "A join table stores keys linking records from two tables for a many-to-many relationship.",
     "e": "The conventional table name orders the plural table names lexically: groups_users, not users_groups. A HABTM join table generally disables its primary key; has_many :through uses a join model and can have extra attributes. Add indexes and foreign keys based on the access pattern.",
     "x": [
      "bin/rails generate migration CreateJoinTableUsersGroups users groups\n# In the generated migration:\ncreate_join_table :users, :groups do |t|\n  t.index [:user_id, :group_id], unique: true\nend"
     ]
    },
    {
     "q": "How many types of Association relationships does a Model have?",
     "l": "I",
     "a": "Rails associations describe object relationships: belongs_to, has_one, has_many, has_many :through, has_one :through, and has_and_belongs_to_many.",
     "e": "belongs_to declares the foreign-key-owning side; it does not on its own make the database relationship one-to-one. Pair it with has_many for many children per parent, or has_one plus a unique foreign-key index for one-to-one. Ordinary foreign keys and uniqueness constraints enforce integrity independently of Rails validations.",
     "x": [
      "class User < ApplicationRecord\n  has_many :posts\nend\nclass Post < ApplicationRecord\n  belongs_to :user\nend",
      "class Author < ApplicationRecord\n  has_many :books\nend\nclass Book < ApplicationRecord\n  belongs_to :author\nend\n# books.author_id references authors.id",
      "class Author < ApplicationRecord\n  has_many :books\nend\nclass Book < ApplicationRecord\n  belongs_to :author\nend\nBook.joins(:author).where(authors: { name: \"Jane Doe\" })"
     ],
     "p": [
      "Foreign keys/indexes enforce integrity and efficiency; association declarations alone do not.",
      "Deleting a parent does not automatically delete children unless dependent behavior or database constraints require it.",
      "Decide on nullability, foreign keys, indexes and dependent behavior explicitly."
     ],
     "s": [
      "Explain the concept of associations in ActiveRecord.",
      "How do Active Record associations work?",
      "Outline the types of associations models can have in Ruby on Rails.",
      "How do you define associations between models in Rails (e.g., has_many, belongs_to)?",
      "What are Association in Active Record?",
      "What are the different types of ActiveRecord associations?",
      "What are the different types of Association in Rails?",
      "What is an 'association' in Rails? Give an example like 'has_many'.",
      "What are the different types of Rails associations (e.g., `has_many`, `belongs_to`), and how do you choose the right one?"
     ]
    },
    {
     "q": "What do you mean by Polymorphic Association in Rails?",
     "l": "I",
     "a": "A polymorphic belongs_to lets one association refer to different model types using a type column and an ID column.",
     "e": "For example, comments can belong to articles or photos. The pair identifies one target for each comment, not multiple simultaneous parents. A conventional foreign key cannot reference several target tables, so integrity and rename/migration behavior need special care.",
     "x": [
      "class Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\nclass Post < ApplicationRecord\n  has_many :comments, as: :commentable\nend",
      "class Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\nclass Post < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n# Columns: commentable_id and commentable_type",
      "class Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\nclass Article < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n# comments: commentable_type, commentable_id; index both together"
     ],
     "p": [
      "Add the appropriate compound index and explicit authorization on the selected target.",
      "Never trust arbitrary client-supplied model names for constant lookup."
     ],
     "s": [
      "What is a Polymorphic Association?",
      "How does Rails handle polymorphic associations?",
      "What are polymorphic associations in Rails?",
      "What is a polymorphic association?",
      "Explain a polymorphic association:",
      "Describe your understanding of polymorphic associations in Rails. Give a practical use case.",
      "What is a polymorphic has_many association, and how does it differ from a regular has_many?"
     ]
    },
    {
     "q": "Given two models, Author and Book, where an author can have many books, how would you define the relationship in both models using Active Record? Also, write an Active Record query to find all books written by an author with the name 'Jane Doe'.",
     "l": "I",
     "a": "Declare has_many :books on Author and belongs_to :author on Book; join authors when filtering books by an author’s name.",
     "e": "The books table needs author_id and normally an index and foreign key. Query from Book so the result is a relation of books. Names are not necessarily unique, so this returns books for all authors with that name unless the business schema defines uniqueness.",
     "x": [
      "class Author < ApplicationRecord\n  has_many :books\nend\nclass Book < ApplicationRecord\n  belongs_to :author\nend\nBook.joins(:author).where(authors: { name: \"Jane Doe\" })"
     ],
     "p": [
      "Use a stable author ID when the intention is one specific person."
     ]
    },
    {
     "q": "Write a method in a Rails model that returns the number of comments for a post. Assume the Post model has a has_many :comments association.",
     "l": "I",
     "a": "Use comments.count when the requirement is the persisted count of a post’s comments.",
     "e": "count normally issues an aggregate SQL query. size can use a loaded association or counter cache, while length loads all records. Repeating count for many posts can create an aggregate N+1, so consider grouped counts, an appropriately maintained counter cache or preloading according to the exact semantics.",
     "x": [
      "class Post < ApplicationRecord\n  has_many :comments\n  def comment_count\n    comments.count\n  end\nend"
     ],
     "p": [
      "Decide whether unsaved in-memory comments should count."
     ]
    },
    {
     "q": "Consider the scenario below and answer the following questions:",
     "l": "I",
     "a": "For notes shared across many models, use a polymorphic Note association with a cohesive Noteable concern, or delegate a workflow to a service/form object when it crosses model boundaries.",
     "e": "A concern removes duplicated association/helpers but remains coupled to its host models and can conceal responsibilities when overused. Delegation/composition makes dependencies and workflow boundaries explicit but adds interfaces to maintain. Keep view markup in shared partials and validation rules in cohesive validators. A service can legitimately know the business domain; it need not be a domain-agnostic utility.",
     "x": [
      "module Noteable\n  extend ActiveSupport::Concern\n  included do\n    has_many :notes, as: :noteable, dependent: :destroy\n  end\nend\nclass Note < ApplicationRecord\n  belongs_to :noteable, polymorphic: true\nend\nclass Product < ApplicationRecord\n  include Noteable\nend"
     ]
    },
    {
     "q": "What is the difference between polymorphic and single table inheritance (STI) in Rails?",
     "l": "A",
     "a": "Polymorphic associations reference different owner model types through type/ID columns; STI stores subclasses of one model hierarchy in the same table.",
     "e": "They solve different problems: a Comment may belong to a Post or Photo, while Car and Truck may both be subclasses stored in vehicles with a type discriminator. Shared association targets do not imply inheritance.",
     "x": [
      "# Polymorphic: comments.commentable_type + commentable_id\n# STI: vehicles.type selects Car or Truck\nclass Car < Vehicle; end"
     ]
    }
   ]
  ],
  [
   "Validations",
   [
    {
     "q": "Create a model called User with validations for name (presence) and email (format).",
     "l": "I",
     "a": "Add presence validation for name and format validation for email using a chosen application-appropriate format rule.",
     "e": "URI::MailTo::EMAIL_REGEXP is a useful basic format check but does not prove ownership, deliverability or full international address support. If email is required add presence too; a database uniqueness constraint and account-normalization policy are separate requirements.",
     "x": [
      "require \"uri\"\nclass User < ApplicationRecord\n  validates :name, presence: true\n  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }\nend"
     ],
     "p": [
      "Confirm addresses through an ownership-verification flow when required."
     ]
    },
    {
     "q": "Describe how you would implement a custom validator in Rails. Provide an example.",
     "l": "I",
     "a": "A custom validator adds validation errors according to a domain rule, using a model method, ActiveModel::EachValidator or ActiveModel::Validator.",
     "e": "Choose EachValidator for an attribute-oriented rule and Validator for a rule involving the record. Treat missing values explicitly. Rails applications should use Date.current for the configured application time zone rather than assuming the system date is correct.",
     "x": [
      "class User < ApplicationRecord\n  validate :company_email\n  private\n  def company_email\n    domain = email.to_s.split(\"@\", 2).last\n    errors.add(:email, \"must use example.com\") unless domain == \"example.com\"\n  end\nend",
      "class FutureDateValidator < ActiveModel::EachValidator\n  def validate_each(record, attribute, value)\n    if value.nil? || value <= Date.current\n      record.errors.add(attribute, \"must be in the future\")\n    end\n  end\nend\n# validates :expires_on, future_date: true",
      "validate :end_after_start\ndef end_after_start\n  if starts_at && ends_at && ends_at <= starts_at\n    errors.add(:ends_at, \"must follow starts_at\")\n  end\nend"
     ],
     "p": [
      "This example checks the domain policy; combine it with appropriate address validation and verification.",
      "Combine a presence validator or explicit nil behavior with the business rule.",
      "Handle nil values so a separate presence validation can report them cleanly."
     ],
     "s": [
      "How do you implement a custom validation in Rails?",
      "How do you set up a custom validation in Rails?",
      "How do you create a custom validation in Rails?",
      "What are custom validations, and how do you create them?"
     ]
    },
    {
     "q": "What are Rails validations, and why are they important?",
     "l": "I",
     "a": "Model validations check whether an object meets application rules before normal persistence; database constraints enforce integrity across every writer.",
     "e": "Use validates for presence, length, numericality and other checks. valid? populates errors without saving. save returns false for validation failure; save! raises. Bulk SQL operations such as update_all bypass validations and callbacks, so important constraints must also exist in the database.",
     "x": [
      "class User < ApplicationRecord\n  validates :name, presence: true\n  validates :email, presence: true, uniqueness: true\nend\nuser = User.new\nuser.valid? # false\nuser.errors.full_messages",
      "class Post < ApplicationRecord\n  validates :title, presence: true\nend"
     ],
     "p": [
      "Validation messages and database constraints solve related but different problems."
     ],
     "s": [
      "How can you define validations in a Rails model?",
      "What are Validations in Active Record?",
      "How do you handle validations in Rails?",
      "How do you use Rails validations?",
      "How do you validate a model’s presence in Rails?",
      "Which of the following validators in a Rails model ensures that a specified attribute is not empty, meaning it is neither nil nor a blank string?"
     ]
    },
    {
     "q": "What is the purpose of validates_uniqueness_of in Rails models?",
     "l": "I",
     "a": "A uniqueness validation improves feedback, but a unique database index is required to prevent duplicates under concurrent requests.",
     "e": "The validator checks existing rows before an insert/update, leaving a race between two requests. Match the index to the business scope and normalization rule. Handle ActiveRecord::RecordNotUnique at a sensible boundary. Case handling and NULL semantics depend on the database and index definition.",
     "x": [
      "validates :email, presence: true, uniqueness: true\n# Migration:\nadd_index :users, :email, unique: true"
     ],
     "s": [
      "How do you validate uniqueness in Rails models?"
     ]
    },
    {
     "q": "What will be the output of the following code?",
     "l": "I",
     "a": "The output is the total number of rows after the save attempt; it is 1 only under extra assumptions such as an initially empty table and a successful save.",
     "e": "A uniqueness validator can prevent the new record from saving if a row with that email already exists. Other validations/callbacks can also fail or database writes can raise. The code provides no initial database state, so an unconditional numeric answer is impossible. Check save’s result or use save! when failure must raise.",
     "x": [
      "before = User.count\nuser = User.new(email: \"test@example.com\")\nif user.save\n  puts \"count increased by one: #{User.count == before + 1}\"\nelse\n  puts user.errors.full_messages\nend"
     ]
    }
   ]
  ],
  [
   "Callbacks",
   [
    {
     "q": "What are callbacks in Rails, and how are they different from controller filters?",
     "l": "B",
     "a": "Active Record callbacks hook into validation, saving, creation, updating, destruction and loading; transaction callbacks run after commit or rollback.",
     "e": "Create and update save flows validate, run before/around save callbacks, then operation-specific callbacks, followed by after_save. Destroy has its own callback chain. around callbacks wrap their operation and must yield. after_find and after_initialize cover loading/instantiation. Bulk APIs can bypass callback chains.",
     "x": [
      "before_validation :normalize_name\nprivate\ndef normalize_name\n  self.name = name.to_s.strip\nend\n# External side effect after persistence:\n# after_commit :enqueue_notification, on: :create",
      "before_validation :normalize_email\nprivate\ndef normalize_email\n  self.email = email&.strip&.downcase\nend",
      "class Post < ApplicationRecord\n  before_validation :normalize_title\n  after_create_commit :announce\n  private\n  def normalize_title = self.title = title.to_s.strip\n  def announce = AnnouncementJob.perform_later(id)\nend"
     ],
     "p": [
      "Use throw :abort to halt a before callback intentionally.",
      "Avoid hiding large multi-step workflows in callbacks."
     ],
     "s": [
      "What is Callback in Ruby on Rails?",
      "Explain what callbacks are in Ruby on Rails.",
      "Explain the concept of ActiveRecord callbacks in Ruby on Rails.",
      "Explain the concept of Rails callbacks and provide examples of where they can be used in real-world applications.",
      "What are callbacks?",
      "What is a callback in Rails and how do to use it?",
      "What are Callbacks in Active Record?",
      "What are Rails callbacks?",
      "How do you use ActiveRecord callbacks?",
      "Explain types of Callbacks in Ruby on Rails.",
      "What are callbacks and filters in Rails?"
     ]
    },
    {
     "q": "What is the difference between After_save and After_commit?",
     "l": "B",
     "a": "after_save runs after a create/update save within its surrounding transaction; after_commit runs only when that transaction has committed, including configured destroy events.",
     "e": "The distinction is transaction timing, not just which operations trigger them. Work in after_save can still be rolled back by a later error. after_commit observes committed data, but its own failure cannot undo the commit. External side effects need retries or an outbox if delivery must be reliable.",
     "x": [
      "class Order < ApplicationRecord\n  after_create_commit :enqueue_receipt\n  def enqueue_receipt\n    ReceiptJob.perform_later(id)\n  end\nend"
     ],
     "p": [
      "after_commit does not make an external API and database update atomic."
     ]
    },
    {
     "q": "What is the difference between the Observers and Callbacks?",
     "l": "B",
     "a": "Callbacks run at defined model lifecycle points; observers separate reactions into another object. They are about responsibility placement, not a guaranteed difference in lifespan.",
     "e": "A callback is a lifecycle hook, while an observer is a separate object reacting to events. Neither is defined by being short-lived or long-lived. Rails 4 extracted Active Record observers from the framework into a separate gem. Prefer clearly owned transactional work and explicit events/jobs for cross-cutting side effects.",
     "x": [
      "# Modern Rails lifecycle hook:\nclass Order < ApplicationRecord\n  after_commit :publish_event, on: :create\n  def publish_event; OrderCreatedJob.perform_later(id); end\nend",
      "# Explicit application service:\nApplicationRecord.transaction do\n  user.save!\nend\nWelcomeJob.perform_later(user.id)"
     ],
     "n": [
      "Ruby: puts \"hello\"\nRails: bin/rails new shop\nPython web framework comparison: Rails versus Django"
     ],
     "p": [
      "Rails observers were extracted from core; check the rails-observers gem for legacy applications. after_commit avoids publishing before commit, but reliable delivery still needs an outbox or equivalent.",
      "Verification: https://guides.rubyonrails.org/v4.0.0/4_0_release_notes.html",
      "A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect."
     ],
     "s": [
      "What is the difference between observers and callbacks in Ruby on rails?",
      "Explain what observers are in Ruby on Rails."
     ]
    },
    {
     "q": "What is the difference between before_validation and before_save callbacks?",
     "l": "B",
     "a": "before_validation runs before validations, so it is the place to normalize input that validations should check. before_save runs after validations have passed, just before the row is written.",
     "e": "Order of callbacks on save: before_validation, validate, after_validation, before_save, before_create/update, the SQL write, after_create/update, after_save, after_commit. If validation fails, before_save never runs. Rails 7.1 also offers normalizes for simple input cleanup.",
     "x": [
      "class User < ApplicationRecord\n  before_validation { self.email = email&.strip&.downcase }\n  validates :email, presence: true, uniqueness: true\n  before_save { self.slug = name.parameterize }\n\n  # Rails 7.1+\n  normalizes :email, with: ->(e) { e.strip.downcase }\nend"
     ]
    },
    {
     "q": "Explain the importance of before_save and after_save callbacks in Rails.",
     "l": "I",
     "a": "before_save runs before every insert or update (after validation), so it is used to normalize or derive data. after_save runs after the row is written but inside the same transaction.",
     "e": "Typical before_save work: downcasing an email, computing a slug or total. after_save is for work that needs the saved ID, such as updating a related record. Because after_save is still inside the transaction, side effects that leave the database (emails, jobs, API calls) belong in after_commit.",
     "x": [
      "class User < ApplicationRecord\n  before_save { self.email = email.downcase.strip }\n  after_save  :update_search_index, if: :saved_change_to_name?\n  after_commit :send_welcome_email, on: :create\nend"
     ],
     "s": [
      "When would you use the before_save or after_save callback?"
     ]
    },
    {
     "q": "Explain with the help of an example Skip Callback in Rails.",
     "l": "I",
     "a": "skip_callback changes a class’s registered callback chain; it is not a temporary switch for one record.",
     "e": "Changing callbacks during a request affects other instances and can race with concurrent requests. For an exceptional per-record path, define an explicit condition or a service operation instead. Bulk update/delete APIs bypass callbacks but also skip associated model safeguards.",
     "x": [
      "class User < ApplicationRecord\n  attr_accessor :skip_notification\n  after_save :notify, unless: :skip_notification\n  def notify\n    NotificationJob.perform_later(id)\n  end\nend\nuser.skip_notification = true\nuser.save!"
     ],
     "p": [
      "Do not mutate a shared callback registry to control one request."
     ]
    },
    {
     "q": "When is the after_create callback in an Active Record model triggered?",
     "l": "I",
     "a": "Option 2: After a new record is successfully saved to the database.",
     "e": "The correct choice is After a new record is successfully saved to the database. The other choices describe different Rails components or reverse the behavior being asked about.",
     "p": [
      "after_create is before the surrounding transaction commits; it is not after_create_commit."
     ]
    },
    {
     "q": "How to design and implement callbacks safely in Rails models?",
     "l": "I",
     "a": "Keep callbacks small and deterministic; use after_commit for actions that depend on a committed row, and explicit services for multi-step business workflows.",
     "e": "after_commit does not guarantee external enqueue delivery; critical workflows may need a transactional outbox and idempotent consumer. Callback ordering/version differences should be tested.",
     "x": [
      "class Order < ApplicationRecord\n  after_create_commit :enqueue_receipt\n  private\n  def enqueue_receipt; ReceiptJob.perform_later(id); end\nend"
     ],
     "p": [
      "after_commit does not guarantee external enqueue delivery; critical workflows may need a transactional outbox and idempotent consumer. Callback ordering/version differences should be tested."
     ]
    },
    {
     "q": "Describe how to implement a Rails callback for setting a default value before creating a record.",
     "l": "A",
     "a": "Use a before_validation or before_create callback that sets the attribute only when it is blank. For static defaults, a database column default or the attribute API is often simpler.",
     "e": "Setting the default before validation lets presence validations pass. Use ||= so an explicit value is not overwritten. A database default (default: \"draft\" in the migration) also protects rows inserted outside Rails.",
     "x": [
      "class Order < ApplicationRecord\n  before_validation :set_defaults, on: :create\n\n  private\n\n  def set_defaults\n    self.status ||= \"pending\"\n    self.number ||= SecureRandom.hex(4).upcase\n  end\nend\n\n# Alternatives\nattribute :status, :string, default: \"pending\"\nadd_column :orders, :status, :string, default: \"pending\", null: false"
     ]
    }
   ]
  ],
  [
   "Creating, saving and deleting",
   [
    {
     "q": "What is the difference between save and save!, or create and create!?",
     "l": "B",
     "a": "The non-bang persistence method reports validation failure without raising; its bang counterpart raises an exception on failure.",
     "e": "save returns true or false and save! raises ActiveRecord::RecordInvalid for invalid data. create returns the instantiated object, which may be unpersisted; create! raises on validation failure. Database errors may raise even for non-bang calls, and callback aborts have their own failure behavior.",
     "x": [
      "user = User.create(email: nil)\nuser.persisted? # false if email is required\nUser.create!(email: nil) # raises ActiveRecord::RecordInvalid"
     ],
     "s": [
      "What is the difference between save and save!?",
      "What is the difference between save and save! in Rails?",
      "What are the differences between create! and create in ActiveRecord?"
     ]
    },
    {
     "q": "What is the difference between save and create in ActiveRecord?",
     "l": "B",
     "a": "save persists an existing Ruby model instance, inserting or updating as needed; create instantiates a new object and attempts to save it.",
     "e": "Both normally run validations and callbacks. A failed save returns false; a failed create returns an invalid, unpersisted object. Use save! or create! to raise on validation failure. Distinguish creating an object with new from persisting a row.",
     "x": [
      "user = User.new(name: \"Ada\")\nuser.save\nother = User.create(name: \"Grace\")"
     ]
    },
    {
     "q": "How do you implement \"soft deletes\" in Rails?",
     "l": "I",
     "a": "Instead of removing the row, mark it as deleted with a deleted_at (or discarded_at) timestamp and exclude marked rows from normal queries. Gems such as discard or paranoia implement this.",
     "e": "Soft deletes keep history and allow undo or auditing. Add a scope (kept) rather than a default_scope, because default scopes surprise people in joins and unscoped queries. Remember unique indexes and associations: a soft-deleted user may still own records, and a new user may need the same email.",
     "x": [
      "class AddDiscardedAtToPosts < ActiveRecord::Migration[8.0]\n  def change\n    add_column :posts, :discarded_at, :datetime\n    add_index  :posts, :discarded_at\n  end\nend\n\nclass Post < ApplicationRecord\n  scope :kept, -> { where(discarded_at: nil) }\n  def discard = update(discarded_at: Time.current)\nend\n\nPost.kept.order(:created_at)"
     ],
     "s": [
      "How would you implement soft deletes in Rails?"
     ]
    },
    {
     "q": "What is the difference between delete and destroy (and delete_all and destroy_all)?",
     "l": "I",
     "a": "delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.",
     "e": "destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.",
     "x": [
      "class Post < ApplicationRecord\n  has_many :comments, dependent: :destroy\nend\nPost.find(1).destroy\n# Direct deletion bypasses those model callbacks:\nPost.where(id: 2).delete_all",
      "user = User.find(1)\nuser.delete\nUser.where(inactive: true).delete_all",
      "class User < ApplicationRecord\n  has_many :posts, dependent: :destroy\n  before_destroy { throw :abort if admin? }\nend\nuser.destroy!"
     ],
     "p": [
      "destroy runs destruction callbacks, not normal model validations.",
      "A transaction can roll back a database deletion before it commits.",
      "Normal save validations are not the protection used during destroy.",
      "Database deletion inside a transaction is reversible until commit."
     ],
     "s": [
      "What is the difference between deleting and destroying?",
      "What is the difference between delete and destroy in Rails?",
      "Explain what Delete does in Ruby on Rails.",
      "Explain what Destroy does in Ruby on Rails.",
      "What is the difference between delete and destroy_all?"
     ]
    },
    {
     "q": "What is the purpose of the find_or_create_by method in Rails?",
     "l": "I",
     "a": "find_or_create_by first looks up a matching row, then attempts creation if no match exists.",
     "e": "It can race between the read and insert. Enforce uniqueness in the database; choose find_or_create_by! when validation failure should raise. create_or_find_by is another option when a suitable database unique constraint is present, with its own insert-first trade-offs.",
     "x": [
      "add_index :users, :email, unique: true\n# Application code:\nUser.find_or_create_by!(email: \"dev@example.com\")"
     ],
     "p": [
      "A model uniqueness validation alone does not make concurrent creation safe."
     ]
    }
   ]
  ],
  [
   "Migrations and schema",
   [
    {
     "q": "What is the significance of the db/seeds.rb file?",
     "l": "B",
     "a": "bin/rails db:seed loads db/seeds.rb to populate baseline application data.",
     "e": "Make seeds safe to rerun and distinguish reference data from test fixtures and production data backfills. Seeds are not automatically a safe migration mechanism for large changing datasets.",
     "x": [
      "Role.find_or_create_by!(name: \"admin\")\n# Run:\nbin/rails db:seed"
     ],
     "s": [
      "What is the purpose of the rails db:seed task?"
     ]
    },
    {
     "q": "When do you use self.down and self.up in Ruby on Rails?",
     "l": "B",
     "a": "Legacy migration up methods applied changes and down methods reversed them; modern versioned migrations normally use instance methods or a reversible change method.",
     "e": "Use change when Rails can infer the reverse operation. Use explicit up/down or reversible when a data/schema change needs custom logic. Reversing a schema change does not magically recover deleted data.",
     "x": [
      "class AddCodeToProducts < ActiveRecord::Migration[8.0]\n  def up\n    add_column :products, :code, :string\n  end\n  def down\n    remove_column :products, :code\n  end\nend",
      "class AddEmailIndex < ActiveRecord::Migration[8.0]\n  def change\n    add_index :users, :email, unique: true\n  end\nend\n# bin/rails db:migrate\n# bin/rails db:rollback STEP=1"
     ],
     "p": [
      "Use the migration compatibility version generated for the application.",
      "A references column and an actual foreign key constraint are different; request foreign_key: true.",
      "For large changes use expand/backfill/contract and database-appropriate locking precautions.",
      "Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax."
     ],
     "s": [
      "Explain when self.up and self.down method is used?"
     ]
    },
    {
     "q": "Mention what is the command to create a migration?",
     "l": "B",
     "a": "bin/rails generate migration NameOfChange, for example bin/rails generate migration AddEmailToUsers email:string:index.",
     "e": "Rails creates a timestamped file in db/migrate. Names following AddXToY or RemoveXFromY with column arguments get the add_column/remove_column code filled in automatically; CreateProducts generates a create_table. bin/rails generate model also creates a migration.",
     "x": [
      "bin/rails generate migration AddEmailToUsers email:string:index\n\n# db/migrate/20260101120000_add_email_to_users.rb\nclass AddEmailToUsers < ActiveRecord::Migration[8.0]\n  def change\n    add_column :users, :email, :string\n    add_index  :users, :email\n  end\nend"
     ],
     "s": [
      "How is the migration command created in Ruby?",
      "How do you generate a migration in Rails?",
      "What command is used to create a migration?"
     ]
    },
    {
     "q": "What is Rails Migration?",
     "l": "B",
     "a": "Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.",
     "e": "Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.",
     "x": [
      "bin/rails generate migration AddActiveToUsers active:boolean\nbin/rails db:migrate",
      "bin/rails generate migration AddStatusToUsers status:string\nbin/rails db:migrate\nbin/rails db:rollback",
      "bin/rails generate migration AddAgeToUsers age:integer\n# Generated class version matches the app:\ndef change\n  add_column :users, :age, :integer\nend\nbin/rails db:migrate"
     ],
     "p": [
      "The migration version API should match the application. Data backfills need separate operational planning for large datasets.",
      "ruby script/generate is a historical Rails command.",
      "ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.",
      "Use the migration compatibility version generated for the application.",
      "A references column and an actual foreign key constraint are different; request foreign_key: true.",
      "For large changes use expand/backfill/contract and database-appropriate locking precautions.",
      "Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.",
      "Not every migration is automatically reversible. Large-table changes need lock and rollout planning."
     ],
     "s": [
      "What is a migration in Ruby on Rails?",
      "What is the purpose of migrations in Rails?",
      "Mention what is Rails Migration?",
      "What is meant by “Rails migration”?",
      "What is meant by Rails migration?",
      "What are migrations in Rails?",
      "What are migrations in Rails, and why are they important?",
      "Explain the concept of migrations in Ruby on Rails and why they are essential for database management.",
      "What are Migrations in Active Record?",
      "What are Rails migrations?",
      "What is referred to by Rails Migration?",
      "Explain Rails Migration.",
      "Can you describe the purpose of a Rails migration?",
      "What is a Rails migration? Why would you use one?",
      "__________ is a tool for altering the database schema of an application.",
      "How does Rails handle database migrations, and why is it important for the development process?",
      "How does Rails manage database state?",
      "List out what can Rails Migration do.",
      "What do you mean by the term Rail Migration?",
      "How do you run database migrations in Rails?",
      "What is the purpose of rails db:migrate?",
      "How do you run a Rails migration?",
      "How to run a migration?",
      "How does Rails handle database migrations, and what's the process for rolling back a migration?",
      "How does Rails handle database schema changes?"
     ]
    },
    {
     "q": "What are some common data types you might use in a Rails model (e.g., string, integer)?",
     "l": "B",
     "a": "Common column types are string, text, integer, bigint, float, decimal, boolean, date, datetime, time, binary, json/jsonb and references.",
     "e": "Use decimal (not float) for money, datetime for timestamps, text for long content, and references (which creates a bigint foreign key column with an index) for associations. PostgreSQL adds types such as jsonb, uuid and arrays.",
     "x": [
      "create_table :products do |t|\n  t.string     :name, null: false\n  t.text       :description\n  t.decimal    :price, precision: 10, scale: 2\n  t.integer    :stock, default: 0\n  t.boolean    :active, default: true\n  t.references :category, foreign_key: true\n  t.timestamps\nend"
     ],
     "s": [
      "What are the common data types in Rails migrations?"
     ]
    },
    {
     "q": "What is the difference between string and text in Rails?",
     "l": "B",
     "a": "string and text are schema types that normally map to a length-limited character column and a larger text column; exact storage/limits depend on the database and migration options.",
     "e": "The Ruby value of either is usually a String. A typical Rails string default uses a length such as 255, but text has no universal 30,000-character limit. Check database adapter behavior, indexes and business-level length validation instead of assuming a cross-database maximum.",
     "x": [
      "t.string :title, limit: 200\nt.text :body\n# Model policy:\nvalidates :title, length: { maximum: 200 }"
     ]
    },
    {
     "q": "What are migrations, and how do you roll back a migration in Rails?",
     "l": "I",
     "a": "Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.",
     "e": "Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.",
     "x": [
      "bin/rails generate migration AddAgeToUsers age:integer\n# Generated class version matches the app:\ndef change\n  add_column :users, :age, :integer\nend\nbin/rails db:migrate"
     ],
     "p": [
      "ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods."
     ],
     "s": [
      "How to run and rollback Active Record migration?",
      "What is a migration rollback? How do you use it?"
     ]
    },
    {
     "q": "Which of the following Rails migration commands is the most efficient and conventional way to add an index to an existing column named email on a table named users?",
     "l": "I",
     "a": "Option 3: `add_index :users, :email`",
     "e": "Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.",
     "x": [
      "class AddEmailIndex < ActiveRecord::Migration[8.0]\n  def change\n    add_index :users, :email, unique: true\n  end\nend\n# bin/rails db:migrate\n# bin/rails db:rollback STEP=1"
     ],
     "p": [
      "Use the migration compatibility version generated for the application.",
      "A references column and an actual foreign key constraint are different; request foreign_key: true.",
      "For large changes use expand/backfill/contract and database-appropriate locking precautions.",
      "Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax."
     ]
    },
    {
     "q": "How do you handle database migrations in a Rails project, and what are some best practices for writing and running migrations?",
     "l": "A",
     "a": "Keep migrations small and reversible, never edit a migration that has already run in another environment, add indexes and constraints, and avoid using application models inside migrations.",
     "e": "Other good practices: commit schema.rb with the migration; separate schema changes from slow data backfills (run those in a job or task, in batches); add columns as nullable, backfill, then add NOT NULL; use algorithm: :concurrently for indexes on large PostgreSQL tables; and test rollback with db:rollback.",
     "x": [
      "class AddStatusToOrders < ActiveRecord::Migration[8.0]\n  disable_ddl_transaction!\n\n  def change\n    add_column :orders, :status, :string\n    add_index  :orders, :status, algorithm: :concurrently\n  end\nend"
     ],
     "p": [
      "The strong_migrations gem catches unsafe migrations before they reach production."
     ]
    }
   ]
  ],
  [
   "Enums, concerns and model design",
   [
    {
     "q": "What are concerns in Rails, and how is a concern different from a plain module?",
     "l": "I",
     "a": "A Rails concern is a module used to share a cohesive behavior; ActiveSupport::Concern adds inclusion hooks and class-method support.",
     "e": "Place model or controller concerns in their conventional directories. Use included for declarations needed on the including class, class_methods for class-level behavior, and instance methods for record/controller behavior. Concerns can reduce duplication, but a module that depends on many hidden methods can increase coupling.",
     "x": [
      "module Archivable\n  extend ActiveSupport::Concern\n  included do\n    scope :archived, -> { where(archived: true) }\n  end\nend",
      "module Noteable\n  extend ActiveSupport::Concern\n  included do\n    has_many :notes, as: :noteable, dependent: :destroy\n  end\nend",
      "module Publishable\n  extend ActiveSupport::Concern\n  included do\n    scope :published, -> { where(published: true) }\n  end\n  def publish!\n    update!(published: true)\n  end\nend\n# class Article < ApplicationRecord; include Publishable; end"
     ],
     "p": [
      "Prefer a meaningful responsibility over an arbitrary “miscellaneous” module."
     ],
     "s": [
      "What do you mean by Concerns in Rails?",
      "What is a concern in Rails?",
      "What are concerns in Rails, and how do you use them?",
      "What is the purpose of the ActiveSupport::Concern module in Rails?",
      "What is a Rails Concern? How do you use it?",
      "What is a Concern in Rails?",
      "What are concerns in Rails, and when do you use them?",
      "What is Rails’ ActiveSupport::Concern?",
      "What are concerns and when should you use them?",
      "Explain the concept of concerns in Rails. When and why would you use them?",
      "What is a Rails concern vs. a module?",
      "What is the concern gem in Rails, and how does it differ from standard modules?"
     ]
    },
    {
     "q": "What does “fat models, skinny controllers” mean?",
     "l": "I",
     "a": "Keep controllers thin: they only read params, call the model and choose a response. Business rules live in the model layer, where they can be reused and unit tested.",
     "e": "“Fat model, skinny controller” is the classic Rails guideline. A controller action that calculates prices or sends emails duplicates logic and is hard to test. Moving that logic into models keeps controllers simple. Taken too far, though, models become huge “god objects”, which is why the follow-up question asks about skinny models too.",
     "x": [
      "# Skinny controller\nclass OrdersController < ApplicationController\n  def create\n    @order = current_user.orders.build(order_params)\n    if @order.place\n      redirect_to @order\n    else\n      render :new, status: :unprocessable_entity\n    end\n  end\nend\n\n# The model owns the rule\nclass Order < ApplicationRecord\n  def place\n    self.total = line_items.sum(&:price)\n    save\n  end\nend"
     ],
     "p": [
      "Follow-up: where would you put logic that touches several models? In a service object, form object or a concern, not in the controller."
     ]
    },
    {
     "q": "What does “skinny controllers, skinny models” mean?",
     "l": "I",
     "a": "It means neither layer should be bloated: controllers stay thin, and models also stay focused by moving extra responsibilities into service objects, form objects, query objects, concerns and POROs.",
     "e": "It is the modern correction to “fat model, skinny controller”. A User model with payment, notification and reporting code violates single responsibility. Extract each workflow into a small class with one public method, keep persistence and validations in the model, and test each piece in isolation.",
     "x": [
      "class RegisterUser\n  def initialize(params) = @params = params\n\n  def call\n    user = User.new(@params)\n    return user unless user.save\n    WelcomeMailer.with(user: user).welcome.deliver_later\n    user\n  end\nend\n\n# controller\n@user = RegisterUser.new(user_params).call"
     ],
     "p": [
      "Do not create service objects for trivial one-line actions; extract when a workflow coordinates several models or external systems."
     ]
    },
    {
     "q": "What is ActiveRecord::Enum in Rails?",
     "l": "A",
     "a": "Rails enum maps an attribute to named states backed by explicit integer or string values.",
     "e": "Use explicit mappings so adding or reordering names does not reinterpret existing database values. Modern Rails uses positional name/value arguments. Ruby itself has no general enum keyword corresponding to this Rails macro.",
     "x": [
      "enum :status, { draft: 0, published: 1 }\npost.published?\npost.published!"
     ],
     "s": [
      "What is an enum in Ruby?",
      "What is the enum feature in Rails, and how do you use it?"
     ]
    }
   ]
  ]
 ],
 "rails_interview_queries": [
  [
   "Active Record queries",
   [
    {
     "q": "Explain how you would implement a search functionality in a Rails application. What are some performance considerations?",
     "l": "B",
     "a": "Build search with an authorized base relation, explicit filter and sort allowlists, bounded pagination, and indexes aligned with the search strategy.",
     "e": "Simple structured filters fit Active Record. PostgreSQL full-text search or an external search service may be suitable for ranked text search. Inspect query plans and deep-pagination behavior. Never pass arbitrary client input as an ORDER BY expression; advanced search libraries also need attribute and association allowlists.",
     "x": [
      "sorts = { \"newest\" => { created_at: :desc }, \"name\" => { name: :asc } }\nrecords = current_user.tenant.products.where(active: true)\nrecords = records.order(sorts.fetch(params[:sort], sorts[\"newest\"]))\nrecords = records.limit(25)",
      "Post.where(\"search_vector @@ plainto_tsquery(?)\", params[:q].to_s)"
     ],
     "p": [
      "Keyset pagination can avoid expensive large offsets.",
      "Escape LIKE wildcard characters when they should be literal."
     ],
     "s": [
      "Explain how you would implement a complex search functionality with filtering, sorting, and pagination in a Rails application.",
      "How do you implement a search functionality in Rails (e.g., using Elasticsearch or pg_search)?"
     ]
    },
    {
     "q": "How do you implement pagination in Rails?",
     "l": "I",
     "a": "Pagination returns a bounded page of records rather than loading an entire relation.",
     "e": "Offset pagination is simple but gets expensive at large offsets and can shift under concurrent writes. Keyset pagination uses an indexed stable sort key and cursor for scalable sequential access. Always apply a deterministic order and cap page size.",
     "x": [
      "Post.order(id: :desc).where(\"id < ?\", cursor).limit(25)\n# With a pagination library: Post.order(:id).page(params[:page]).per(25)"
     ]
    },
    {
     "q": "What is the difference between find, find_by and where?",
     "l": "I",
     "a": "find retrieves by primary key and raises ActiveRecord::RecordNotFound when missing; find_by uses attribute conditions and returns one match or nil.",
     "e": "find_by! raises when no row matches. Without ordering, “first match” does not promise a business order. Dynamic finders such as find_by_email are convenience methods, but the explicit find_by(email: value) interface is clearer and easier to compose.",
     "x": [
      "User.find(42)\nUser.find_by(email: \"dev@example.com\")\nUser.find_by!(email: \"dev@example.com\")"
     ],
     "s": [
      "What is the difference between find and find_by in Rails?",
      "What is the difference between find and find_by in ActiveRecord?",
      "What is the difference between find and find_by?",
      "In Rails, what is the key difference between using where and find_by in Active Record queries?"
     ]
    },
    {
     "q": "Explain the use of scopes in Rails models. How do they improve code readability and maintainability?",
     "l": "I",
     "a": "A scope names a composable Active Record relation so repeated query intent stays readable.",
     "e": "Use a lambda for parameters and time-sensitive expressions, and return a relation so callers can chain it. Avoid hiding authorization in an optional scope. A default_scope applies implicitly and needs special care because unscoped or alternative access paths can bypass it.",
     "x": [
      "scope :recent, -> { where(\"created_at >= ?\", 1.week.ago) }\nPost.published.recent.order(:id)",
      "class Article < ApplicationRecord\n  scope :published, -> { where(published: true) }\n  scope :recent, -> { order(created_at: :desc) }\nend\nArticle.published.recent.limit(20)"
     ],
     "p": [
      "Inspect generated SQL; a readable scope can still issue an expensive query."
     ],
     "s": [
      "How do Rails scopes work?",
      "What is a scope in Rails, and how do you define it?",
      "What is a scope in Rails?",
      "What are scopes in Rails?",
      "Which of the following best describes the primary purpose of using scopes in Rails models?"
     ]
    },
    {
     "q": "What is the active_record query interface in Rails?",
     "l": "I",
     "a": "Active Record relations build composable SQL queries with methods such as where, joins, order, select, limit, group and having.",
     "e": "Relations are normally lazy until materialized by iteration, to_a, first or other terminal operations. Methods such as pluck and count execute focused queries without loading full models. Use scopes to name domain-level filters and examine generated SQL when performance matters.",
     "x": [
      "Order.where(status: \"paid\").group(:user_id).having(\"COUNT(*) > ?\", 3).count"
     ]
    },
    {
     "q": "Explain what dynamic finders are.",
     "l": "A",
     "a": "Dynamic finders such as User.find_by_email(value) infer a lookup from the method name; explicit find_by(email: value) is usually clearer.",
     "e": "A supported find_by_* method builds attribute conditions and returns a match or nil. Older find_all_by_* and find_or_create_by_* forms belong to historical APIs and should not be assumed present. Prefer explicit relation composition when queries grow complex.",
     "x": [
      "User.find_by_email(\"dev@example.com\")\nUser.find_by(email: \"dev@example.com\")"
     ]
    },
    {
     "q": "What is the difference between count, length and size in Active Record?",
     "l": "A",
     "a": "For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.",
     "e": "These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.",
     "x": [
      "posts = user.posts\nposts.count   # typically SELECT COUNT(*)\nposts.length  # loads records\nposts.size    # uses loaded records now"
     ],
     "s": [
      "What is the difference between quantity, length and size?",
      "Explain what count does in Ruby on Rails.",
      "Explain what length does in Ruby on Rails.",
      "Explain what size does in Ruby on Rails."
     ]
    },
    {
     "q": "How do you perform custom SQL queries in Rails, and when is it appropriate to do so?",
     "l": "A",
     "a": "Use SQL or Arel when the relational operation is clearer or unsupported by the normal query interface, while binding values safely.",
     "e": "Keep SQL adapter-aware, select only necessary columns, and test the plan and returned types. Model.find_by_sql returns model objects; connection-level select_all returns result rows. Avoid string interpolation of request values or untrusted identifiers.",
     "x": [
      "User.find_by_sql([\"SELECT * FROM users WHERE created_at >= ?\", 1.week.ago])"
     ]
    }
   ]
  ],
  [
   "Eager loading and N+1",
   [
    {
     "q": "The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify the error and fix the code. # Models class Article < ApplicationRecord belongs_to :author end class Author < ApplicationRecord has_many :articles end # Controller class ArticlesController < ApplicationController def index @articles = Article.all end end # View (index.html.erb) <% @articles.each do |article| %> <p><%= article.title %> - <%= article.author.name %></p> <% end %> Code language: CSS (css)",
     "l": "B",
     "a": "The association access can display correctly; the observed problem in the snippet is N+1 query behavior, not an inherently incorrect author name.",
     "e": "Use includes(:author) or preload(:author) when rendering authors for a collection. If the author is optional and nil, handle that domain case separately; eager loading does not create a missing author. This normally reduces many per-row queries to a bounded query set.",
     "x": [
      "@articles = Article.includes(:author).limit(50)\n# View:\n<% @articles.each do |article| %>\n  <p><%= article.title %> — <%= article.author&.name || \"Unknown author\" %></p>\n<% end %>"
     ]
    },
    {
     "q": "What is the N+1 query problem, and how do eager loading and lazy loading relate to it?",
     "l": "B",
     "a": "Lazy association loading fetches on access and can cause N+1 queries; eager strategies fetch associations for a collection in advance.",
     "e": "Eager loading and lazy loading are strategies for fetching associated records in ActiveRecord. Eager loading loads associated records in advance, minimizing the number of database queries and improving performance. Lazy loading, on the other hand, retrieves associated records only when they're accessed. This can lead to a higher number of queries but reduces the initial load time. Eager loading is often preferred for optimizing performance, especially when dealing with complex associations.",
     "x": [
      "User.preload(:posts).find_each { |user| user.posts.each { |post| puts post.title } }",
      "posts = Post.includes(:author).limit(20)\nposts.each { |post| puts post.author.name }\n# Filtering via a join without loading all comments:\nPost.joins(:comments).where(comments: { approved: true }).distinct",
      "authors = Author.preload(:books).limit(20)\nauthors.each { |author| puts author.books.size }"
     ],
     "p": [
      "preload uses separate queries; eager_load uses a join; includes may select either strategy. Compare rows, memory and query plans rather than counting queries alone.",
      "includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.",
      "“Eager loading always means one query” is incorrect.",
      "A query count improvement can increase transferred rows or object allocations; measure both."
     ],
     "s": [
      "Discuss the differences between eager loading and lazy loading in ActiveRecord.",
      "Explain eager loading and lazy loading in Rails.",
      "Explain the concept of eager loading in Rails. Why is it important and how does it work?",
      "Explain the concept of eager loading in Ruby on Rails and why it is beneficial.",
      "How does Rails implement lazy loading?",
      "How do you perform eager loading in Rails?",
      "What is eager loading in Rails?",
      "What is an N+1 query problem in Rails?",
      "What is the N+1 query problem and how do you fix it in Rails?",
      "What is the N+1 query problem and how do you avoid it?"
     ]
    },
    {
     "q": "What is the difference between includes, joins, preload and eager_load?",
     "l": "I",
     "a": "joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.",
     "e": "N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.",
     "x": [
      "posts = Post.includes(:author).limit(20)\nposts.each { |post| puts post.author.name }\n# Filtering via a join without loading all comments:\nPost.joins(:comments).where(comments: { approved: true }).distinct"
     ],
     "p": [
      "includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations."
     ],
     "s": [
      "Difference between includes, joins, preload, and eager_load.",
      "What are joins and includes in Rails? How are they different?",
      "What is the difference between includes, joins, and eager_load?"
     ]
    },
    {
     "q": "What is the issue in the following controller action? Make it correct.",
     "l": "I",
     "a": "The action loads all posts, then all comments, then each comment’s author (an N+1 query problem), and filters in Ruby. Let the database filter with a join instead.",
     "e": "posts.map(&:comments) runs one query per post and comment.author runs one query per comment, so the number of queries grows with the data, and every row is loaded into memory. Comment.joins(:author).where(users: { username: ... }) produces a single SQL query that returns only the matching comments. This assumes Comment belongs_to :author, class_name: \"User\". Add includes(:post) or includes(:author) if the view then reads those associations.",
     "x": [
      "# Original: loads every post, every comment and every author into Ruby\nclass CommentsController < ApplicationController\n  def users_comments\n    posts = Post.all\n    comments = posts.map(&:comments).flatten\n    @user_comments = comments.select do |comment|\n      comment.author.username == params[:username]\n    end\n  end\nend",
      "# Fixed: one SQL query that filters in the database\nclass CommentsController < ApplicationController\n  def users_comments\n    @user_comments = Comment.joins(:author)\n                            .where(users: { username: params[:username] })\n  end\nend"
     ],
     "p": [
      "Add an index on users.username so the lookup stays fast."
     ]
    }
   ]
  ],
  [
   "Query performance and indexes",
   [
    {
     "q": "How do you optimize a slow SQL query in a Rails app?",
     "l": "I",
     "a": "Measure the query and request first, then reduce unnecessary rows/work, fix N+1 access, and add indexes justified by the query plan.",
     "e": "Use SQL logs and database EXPLAIN, or EXPLAIN ANALYZE in a suitable environment, to inspect scans, joins, estimates and sorts. Select needed columns, paginate, batch writes and avoid repeated queries. Check query count and latency before and after the change. Caching can help repeated reads but should not hide an incorrect query or stale authorization boundary.",
     "x": [
      "User.where(active: true).order(:id).limit(100).pluck(:id, :email)\n# Inspect the generated SQL and plan before adding an index.",
      "User.preload(:posts).find_each { |u| u.posts.each { |p| puts p.title } }",
      "User.where(active: true).order(:id).limit(100).pluck(:id, :email)"
     ],
     "p": [
      "includes may switch between preloading and joins; select partial models carefully and compare EXPLAIN plans. Bullet detects patterns but does not replace measurement.",
      "Custom SQL can help express a query but is not automatically faster than an equivalent relation."
     ],
     "s": [
      "How to optimize ActiveRecord queries in Rails for better performance?",
      "How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries?",
      "How do you optimize database queries in Rails applications?",
      "How can you optimize database queries in a Rails application?",
      "How would you optimize database queries in a large Rails application?",
      "How do you optimize database queries in Rails?"
     ]
    },
    {
     "q": "How would you handle a large number of database records in Rails (e.g., pagination, batch processing)?",
     "l": "A",
     "a": "Process large tables in bounded batches, paginate user interfaces, and stream exports instead of building everything in memory.",
     "e": "find_each iterates records in batches; in_batches exposes a relation per batch for bulk work. Use stable ordering/cursors, bound transaction size, and account for records changing during a run. For imports validate and stage data, use idempotent upserts with unique constraints, and record progress. CSV.generate_stream is not a Ruby standard CSV API.",
     "x": [
      "User.where(active: true).find_each(batch_size: 500) do |user|\n  ExportRowJob.perform_later(user.id)\nend\n# For CSV output, write each row to an IO:\nCSV.open(\"users.csv\", \"w\") { |csv| User.find_each { |u| csv << [u.id, u.email] } }"
     ],
     "s": [
      "When would you use find_each vs all.each?",
      "What are your strategies for handling large datasets (e.g., pagination, streaming)?"
     ]
    },
    {
     "q": "What is the importance of database indexing, and how do you implement it in Rails?",
     "l": "A",
     "a": "An index accelerates suitable lookups, joins and ordering at the cost of storage and write overhead.",
     "e": "Choose column order to match real filter/sort patterns; a composite index is not interchangeable with every single-column index. Unique indexes also enforce integrity. For large PostgreSQL tables, consider concurrent creation in a separate migration that disables the surrounding DDL transaction, after checking adapter support.",
     "x": [
      "add_index :orders, [:user_id, :created_at]\nadd_index :users, :email, unique: true"
     ],
     "s": [
      "How do you perform database indexing in Rails?"
     ]
    }
   ]
  ],
  [
   "Transactions and locking",
   [
    {
     "q": "What are database transactions and how are they implemented in Rails?",
     "l": "I",
     "a": "Wrap related writes in an Active Record transaction so they commit together or roll back together on failure.",
     "e": "Use bang persistence methods when invalid data must abort the block; save returning false alone does not automatically roll back earlier writes. Transactions are scoped to a database connection, not an atomic unit across unrelated databases or external APIs. ActiveRecord::Rollback rolls back without escaping the block. Run external side effects after commit or through an outbox.",
     "x": [
      "ApplicationRecord.transaction do\n  user.save!\n  order.save!\nend"
     ],
     "p": [
      "Nested transactions normally join the outer transaction; requires_new: true uses a savepoint where supported."
     ],
     "s": [
      "How does Rails handle database transactions?",
      "How do you manage database transactions in Rails?",
      "How do you handle database transactions?"
     ]
    },
    {
     "q": "What is the difference between optimistic and pessimistic locking in Rails?",
     "l": "I",
     "a": "Optimistic locking detects stale writes with lock_version; pessimistic locking acquires a database row lock for a transaction.",
     "e": "Optimistic locking raises ActiveRecord::StaleObjectError and is useful when conflicts are uncommon. Pessimistic locking prevents conflicting writers from proceeding concurrently but can cause lock waits or deadlocks. Keep locked transactions short and lock resources in a consistent order. A row lock outside a surrounding transaction is released too early to protect later work.",
     "x": [
      "account.with_lock do\n  account.update!(balance: account.balance - 10)\nend"
     ]
    }
   ]
  ],
  [
   "Database setup",
   [
    {
     "q": "How to override primary key in Active Record?",
     "l": "B",
     "a": "Assign self.primary_key to the column serving as the model’s primary key.",
     "e": "The database must enforce appropriate uniqueness and nullability. Related models may need matching primary_key/foreign_key options. Changing the model setting does not modify database constraints.",
     "x": [
      "class Product < ApplicationRecord\n  self.primary_key = \"product_id\"\nend"
     ]
    },
    {
     "q": "What does it mean that Active Record migrations are database-agnostic?",
     "l": "B",
     "a": "You write migrations with Ruby methods such as create_table and add_column, and Rails translates them into the SQL dialect of the configured adapter (PostgreSQL, MySQL, SQLite).",
     "e": "The same migration can therefore run on different databases. The abstraction ends where database-specific features begin: jsonb, partial indexes or raw execute SQL tie the migration to one database.",
     "x": [
      "add_column :users, :age, :integer\n# PostgreSQL: ALTER TABLE \"users\" ADD \"age\" integer\n# MySQL:      ALTER TABLE `users` ADD `age` int"
     ]
    },
    {
     "q": "Where Rails keeps track of which migrations have been committed?",
     "l": "B",
     "a": "In the schema_migrations table in the database. It stores the version timestamp of every migration that has run.",
     "e": "bin/rails db:migrate compares the files in db/migrate with that table and runs the missing ones. bin/rails db:migrate:status shows which are up and down. Another table, ar_internal_metadata, stores the environment name.",
     "x": [
      "bin/rails db:migrate:status\n\n#  Status   Migration ID    Migration Name\n#    up     20260101120000  Create users\n#   down    20260105093000  Add email to users"
     ]
    },
    {
     "q": "Why it’s not recommended to use non-primary key columns in Active Record?",
     "l": "B",
     "a": "A non-primary-key column named id conflicts with Active Record’s id abstraction; avoid that schema when possible or use id_value to access that column.",
     "e": "The issue is specifically a column called id that is not the model’s primary key, rather than a prohibition on ordinary non-primary-key columns. Migrations create an id primary key by default; disable the generated primary key with id: false before defining a different layout.",
     "x": [
      "create_table :legacy_rows, id: false do |t|\n  t.string :external_key, null: false\n  t.string :id\nend"
     ],
     "p": [
      "Check the installed Rails version when using legacy primary keys or composite keys."
     ],
     "s": [
      "What happen if you try to create a column named id which is not the primary key?"
     ]
    },
    {
     "q": "How can you connect a Rails app to a database (e.g., MySQL, PostgreSQL)?",
     "l": "B",
     "a": "config/database.yml declares environment-specific database adapter, database and connection settings; keep production credentials in secure configuration.",
     "e": "Use the pg adapter for PostgreSQL or mysql2 for MySQL and run migrations against the intended environment. A DATABASE_URL may supply deployment connection details. Check SSL and least-privilege access, and never commit live database passwords.",
     "x": [
      "production:\n  adapter: postgresql\n  url: <%= ENV[\"DATABASE_URL\"] %>\n  pool: <%= ENV.fetch(\"RAILS_MAX_THREADS\", 5) %>",
      "rails db:create\nThis command utilizes the database configuration specified in your config/database.yml file to create the database. Ensure that your database user has the necessary permissions to create databases. The environment that is used is determined by RAILS_ENV (defaults to development)."
     ],
     "s": [
      "What is the purpose of the config/database.yml file?",
      "How would you create a new database in Rails?"
     ]
    },
    {
     "q": "What is a database schema in Rails?",
     "l": "B",
     "a": "The schema is the structure of the database: tables, columns, types, indexes and foreign keys. Rails writes it to db/schema.rb (or db/structure.sql) after migrations run.",
     "e": "schema.rb is the authoritative snapshot: bin/rails db:schema:load or db:prepare builds a fresh database from it much faster than replaying every migration. Commit it to version control. Use structure.sql when you rely on database features schema.rb cannot express, such as triggers or views.",
     "x": [
      "# db/schema.rb\nActiveRecord::Schema[8.0].define(version: 2026_01_05_093000) do\n  create_table \"users\", force: :cascade do |t|\n    t.string \"email\", null: false\n    t.timestamps\n    t.index [\"email\"], unique: true\n  end\nend"
     ]
    },
    {
     "q": "What is a database? What is a common database used with Rails?",
     "l": "B",
     "a": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are usually controlled by a database management system (DBMS). Data, DBMS and the associated applications are referred to as a database system.",
     "e": "PostgreSQL is a common database used with Rails. Other popular choices include MySQL and SQLite. Rails provides excellent support, including ActiveRecord ORM, making it easy to interact with these databases.",
     "n": [
      "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are usually controlled by a database management system (DBMS). Data, DBMS and the associated applications are referred to as a database system.\n\nPostgreSQL is a common database used with Rails. Other popular choices include MySQL and SQLite. Rails provides excellent support, including ActiveRecord ORM, making it easy to interact with these databases."
     ]
    }
   ]
  ],
  [
   "Database scaling",
   [
    {
     "q": "How do you integrate multiple databases in a Rails application?",
     "l": "B",
     "a": "Rails supports multiple database configurations, role switching for writing/reading, and horizontal sharding where configured.",
     "e": "Declare connections on appropriate abstract model classes and configure database.yml with separate databases/roles. Plan migrations and connection pool capacity per database. Transactions are not automatically atomic across databases, and reading from replicas must account for lag.",
     "x": [
      "class AnimalsRecord < ApplicationRecord\n  self.abstract_class = true\n  connects_to database: { writing: :animals, reading: :animals_replica }\nend"
     ],
     "s": [
      "How would you use two databases for one application?"
     ]
    },
    {
     "q": "How does Rails handle database connection pooling?",
     "l": "B",
     "a": "Rails maintains database connection pools so concurrent work can lease and return connections instead of opening a new connection per query.",
     "e": "Set each pool to match the concurrency that can simultaneously need that database and account for every web/worker process and database role. A too-small pool causes checkout waits/timeouts; a large pool per process can exceed the server’s connection limit. Release connections after work and avoid holding a connection across slow external calls.",
     "x": [
      "# config/database.yml\nproduction:\n  adapter: postgresql\n  pool: <%= ENV.fetch(\"RAILS_MAX_THREADS\", 5) %>"
     ]
    },
    {
     "q": "What is Sharding, and how can it be implemented in Rails?",
     "l": "I",
     "a": "Sharding splits data across independently addressed databases, usually by a routing key such as tenant. Rails supports multiple-database and horizontal-shard connection configuration.",
     "e": "Define shard connections and use connects_to/connected_to for the supported Rails version. The application must choose the correct shard consistently, handle migrations and operations on all shards and plan cross-shard reads. Transactions and foreign keys do not automatically span independent shards.",
     "x": [
      "class ApplicationRecord < ActiveRecord::Base\n  self.abstract_class = true\n  connects_to shards: { default: { writing: :primary }, shard_one: { writing: :primary_shard_one } }\nend"
     ],
     "p": [
      "Replication/read-role switching is related but is not the same as partitioning data."
     ]
    }
   ]
  ]
 ],
 "rails_interview_controllers": [
  [
   "Controllers",
   [
    {
     "q": "Explain the difference between before_action, around_action, and after_action.",
     "l": "B",
     "a": "before_action runs before the action, after_action runs after it, and around_action wraps the action and must call yield to run it.",
     "e": "before_action is used for authentication, loading records and authorization; if it renders or redirects, the action does not run. after_action can inspect or modify the response. around_action is useful for timing, wrapping in a transaction or setting a temporary context such as a time zone.",
     "x": [
      "class OrdersController < ApplicationController\n  before_action :authenticate_user!\n  before_action :set_order, only: %i[show update]\n  after_action  :track_view, only: :show\n  around_action :with_user_time_zone\n\n  private\n\n  def with_user_time_zone(&block)\n    Time.use_zone(current_user.time_zone, &block)\n  end\nend"
     ],
     "p": [
      "skip_before_action removes an inherited filter for specific actions."
     ]
    },
    {
     "q": "What are controller filters such as before_action?",
     "l": "B",
     "a": "A controller filter (callback) is a method that runs automatically before, after or around controller actions. before_action is the most common: it runs shared setup such as authentication or loading a record.",
     "e": "Filters keep actions short and avoid repeating the same lines in every action. Use only: and except: to limit them. If a before_action renders or redirects, the request stops there. Older Rails versions called these before_filter, which was removed in Rails 5.1.",
     "x": [
      "class ArticlesController < ApplicationController\n  before_action :require_login\n  before_action :set_article, only: %i[show edit update destroy]\n\n  private\n\n  def set_article\n    @article = Article.find(params[:id])\n  end\n\n  def require_login\n    redirect_to login_path, alert: \"Please sign in\" unless current_user\n  end\nend"
     ],
     "s": [
      "What is the purpose of the before_action callback in Rails?",
      "What is before_action in Rails?",
      "What are Filters?",
      "What are filters in Rails?",
      "What is a filter in Ruby on Rails?",
      "Give an example of a filter in Ruby on Rails.",
      "What filters are available in Rails controllers and how do you use them?",
      "What are filters in Rails controllers?",
      "In a Rails controller, what is the primary purpose of a before_action filter?"
     ]
    },
    {
     "q": "What is the params object in Rails?",
     "l": "B",
     "a": "params is a hash-like ActionController::Parameters object holding all request input: route segments such as :id, the query string and the request body (form or JSON fields).",
     "e": "Keys can be read with strings or symbols. Values arrive as strings (or nested hashes/arrays), so convert types yourself. Before passing params to a model for mass assignment, filter them with strong parameters (require/permit, or expect in Rails 8).",
     "x": [
      "# GET /articles/5?page=2\nparams[:id]    # \"5\"\nparams[:page]  # \"2\"\n\ndef article_params\n  params.require(:article).permit(:title, :body)\n  # Rails 8: params.expect(article: [:title, :body])\nend"
     ],
     "s": [
      "How do you handle parameters in a controller action?"
     ]
    },
    {
     "q": "Create a Rails controller action to find a User by their email address and render their profile. If the user is not found, render a 404 error.",
     "l": "B",
     "a": "Find the authorized User by email and render explicit profile fields; if no user exists, return a defined 404 JSON response.",
     "e": "The example assumes the caller is already authorized to perform this lookup. Scope to a current tenant/user where required, normalize email according to the application’s account rules and avoid exposing password digests or arbitrary internal columns. Rendering only status can attempt template lookup; supply json or use head explicitly.",
     "x": [
      "class UsersController < ApplicationController\n  def show_by_email\n    user = User.find_by(email: params[:email])\n    if user\n      render json: { id: user.id, name: user.name }\n    else\n      render json: { error: \"not found\" }, status: :not_found\n    end\n  end\nend"
     ],
     "p": [
      "Do not expose a public account-enumeration endpoint accidentally."
     ]
    },
    {
     "q": "Explain the purpose of a Rails controller.",
     "l": "B",
     "a": "A controller coordinates an HTTP request: it reads parameters, enforces authentication/authorization, invokes application behavior and selects the response.",
     "e": "Routes dispatch requests to actions. A controller can render HTML, JSON or another representation, or redirect. Keep domain workflows in models/services where they can be reused and tested independently; a controller should not be the only location enforcing an invariant.",
     "x": [
      "class ProductsController < ApplicationController\n  def show\n    @product = Product.find(params[:id])\n  end\nend",
      "class PostsController < ApplicationController\n  def show\n    post = current_user.posts.find(params[:id])\n    render json: { id: post.id, title: post.title }\n  end\nend",
      "class PostsController < ApplicationController\n  def show\n    @post = Post.find(params[:id])\n  end\nend"
     ],
     "p": [
      "Keep authorization explicit; merely rendering a record or maintaining a session does not authorize access.",
      "A serializer or explicit field list prevents unintended data exposure.",
      "Handle missing resources and object-level access according to the API/UI contract."
     ],
     "s": [
      "Define the role of Rails Controller.",
      "What is a Rails controller?",
      "What is a Rails Controller?",
      "Tell something about Action Controller in Ruby on Rails?",
      "What is the role of a controller in a Rails application?",
      "What is the purpose of a controller in Rails?",
      "What is a Rails controller? What is its main job?"
     ]
    },
    {
     "q": "Explain the Rails controller action lifecycle.",
     "l": "B",
     "a": "For one action, Rails creates a new controller instance, runs the before and around callbacks, runs the action, then renders a template (implicitly or explicitly), runs after callbacks and sends the response.",
     "e": "If the action does not call render or redirect_to, Rails renders the template matching the controller and action name, such as app/views/articles/show.html.erb. Instance variables set in the action are copied into the view. A new controller object is created for every request, so instance variables do not leak between requests.",
     "x": [
      "# Request: GET /articles/1\n# 1. Router -> ArticlesController#show\n# 2. ArticlesController.new\n# 3. before_action :set_article\n# 4. show (no explicit render)\n# 5. render \"articles/show\" with @article\n# 6. after_action callbacks\n# 7. response returned through middleware"
     ]
    },
    {
     "q": "What are the key differences between GET, POST, PUT, and DELETE HTTP methods?",
     "l": "B",
     "a": "GET retrieves without changing server state; POST submits a new operation; PUT replaces a representation; PATCH applies changes; DELETE requests removal.",
     "e": "GET is safe and idempotent. PUT and DELETE are idempotent in their intended state effect; their repeated HTTP responses need not be identical. POST is not guaranteed idempotent, but an application can enforce idempotency keys. A GET response can change as data changes; idempotence is not a promise of identical response bytes.",
     "x": [
      "GET /articles?page=2\nPOST /articles\nContent-Type: application/json\n\n{\"title\":\"Ruby\"}"
     ],
     "n": [
      "GET /posts/1\nPOST /posts\nPATCH /posts/1\nDELETE /posts/1"
     ],
     "p": [
      "Do not implement state-changing actions with GET.",
      "Never claim POST has no data-size limit or provides secrecy on its own."
     ],
     "s": [
      "Describe the difference between 'GET' and 'POST' HTTP methods.",
      "Explain the difference between 'GET' and 'POST' requests."
     ]
    },
    {
     "q": "What is request.xhr?",
     "l": "B",
     "a": "request.xhr? checks whether the request carries the conventional X-Requested-With: XMLHttpRequest header.",
     "e": "It is a convenience hint, not proof of browser origin, authentication or safety. Modern fetch and Turbo requests may not set the same header, so use explicit formats/contracts rather than using xhr? as an authorization boundary.",
     "x": [
      "if request.xhr?\n  render partial: \"results\"\nelse\n  render :index\nend"
     ]
    }
   ]
  ],
  [
   "Routing",
   [
    {
     "q": "What are polymorphic routes in Rails?",
     "l": "B",
     "a": "Polymorphic routes let Rails build a URL from a model object instead of a named helper: link_to \"Show\", @article or redirect_to [@article, @comment] become article_path(@article) and article_comment_path(@article, @comment).",
     "e": "Rails reads each object’s model_name to choose the route helper (polymorphic_url / polymorphic_path). This is what makes form_with(model: @article) and redirect_to @record work, and it is handy with polymorphic associations, where the parent can be different models.",
     "x": [
      "redirect_to @article                 # article_url(@article)\nlink_to \"Edit\", [:edit, @article]    # edit_article_path(@article)\nform_with model: [@post, Comment.new] # post_comments_path(@post)\npolymorphic_path(@commentable)       # photo_path or article_path"
     ]
    },
    {
     "q": "What is the Rails router's scope?",
     "l": "B",
     "a": "scope groups routes with common path, controller module, helper prefix, or constraints without necessarily adding all of them.",
     "e": "A path scope only prefixes URLs; namespace normally prefixes the path, Ruby controller module and helper names together. Check bin/rails routes to confirm the generated interface.",
     "x": [
      "scope path: \"/admin\", module: \"admin\", as: \"admin\" do\n  resources :users\nend"
     ]
    },
    {
     "q": "Explain how you can list all routes for an application?",
     "l": "B",
     "a": "Run bin/rails routes in the terminal. It prints every route’s helper name, HTTP verb, URL pattern and controller#action.",
     "e": "You can filter with -c for a controller or -g for a pattern, and --expanded for a vertical layout. In development, visiting /rails/info/routes shows the same table in the browser.",
     "x": [
      "bin/rails routes\nbin/rails routes -c articles\nbin/rails routes -g comments\n\n#      Prefix Verb URI Pattern             Controller#Action\n#    articles GET  /articles(.:format)     articles#index\n#     article GET  /articles/:id(.:format) articles#show"
     ]
    },
    {
     "q": "How do you define a route in config/routes.rb for a controller action?",
     "l": "B",
     "a": "Map an HTTP verb and path to controller#action in config/routes.rb, for example get \"about\", to: \"pages#about\". For standard CRUD, use resources.",
     "e": "Use as: to name the helper and only:/except: to limit generated resource routes. Custom actions on a resource go in member (needs an ID) or collection (no ID) blocks.",
     "x": [
      "Rails.application.routes.draw do\n  root \"home#index\"\n  get \"about\", to: \"pages#about\", as: :about\n  resources :articles do\n    member     { post :publish }  # POST /articles/:id/publish\n    collection { get :drafts }    # GET  /articles/drafts\n  end\nend"
     ],
     "s": [
      "How do you define a route in Rails?",
      "How do you define routes in Rails?",
      "How do you define a custom route in Rails?"
     ]
    },
    {
     "q": "In Ruby on Rails, what is the primary purpose of the url_for helper method?",
     "l": "B",
     "a": "Option 3: To generate URLs based on the application's routes.",
     "e": "The correct choice is To generate URLs based on the application's routes. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "What is REST, and how do you build RESTful resources and APIs in Rails?",
     "l": "B",
     "a": "Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.",
     "e": "The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.",
     "x": [
      "resources :posts do\n  member { get :comments }\n  collection { post :bulk_upload }\nend\n# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload",
      "resources :articles, only: [:index, :show, :create]\n# GET /articles -> index\n# GET /articles/:id -> show\n# POST /articles -> create"
     ],
     "p": [
      "RESTful route conventions do not themselves make operations authorized or idempotent."
     ],
     "s": [
      "What is REST in Rails?",
      "Explain the concept of RESTful routes in Rails.",
      "Explain the concept of RESTful routes in Ruby on Rails and why they are considered best practices for web applications.",
      "Explain the concept of RESTful routing in Ruby on Rails.",
      "Explain the concept of RESTful routing in Ruby on Rails. How does it help in building web applications?",
      "How do you implement RESTful APIs in Rails?",
      "What is restful in rails"
     ]
    },
    {
     "q": "What is the role of the 'routes.rb' file in a Rails application?",
     "l": "B",
     "a": "config/routes.rb maps HTTP methods and URL patterns to endpoint handlers and creates URL/path helpers.",
     "e": "Routes are matched in declaration order. Use resources for a conventional collection, resource for a singular resource, and namespaces for organization. Routing selects an endpoint; it does not replace authentication or authorization.",
     "x": [
      "# config/routes.rb\nresources :products, only: [:index, :show]\n# GET /products/:id -> products#show",
      "Rails.application.routes.draw do\n  resources :posts, only: [:index, :show]\nend",
      "resources :posts do\n  member { get :comments }\n  collection { post :bulk_upload }\nend\n# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload"
     ],
     "p": [
      "Use bin/rails routes to inspect generated routes."
     ],
     "s": [
      "Describe the purpose of routes in a Rails application.",
      "Explain the role of routing in Rails.",
      "Describe the role of routes.rb in a Rails application.",
      "How does Rails handle routing?",
      "What is the purpose of the config/routes.rb file?",
      "What is the role of the config/routes.rb file?",
      "What are Rails routes? Can you give an example of a simple route?"
     ]
    },
    {
     "q": "How do you implement nested resources in Rails?",
     "l": "I",
     "a": "Nest one resources call inside another so child URLs include the parent ID, for example /articles/1/comments. The controller then loads the parent and builds children through it.",
     "e": "Nesting expresses ownership in the URL and gives helpers such as article_comments_path(@article). Keep nesting to one level; use shallow: true so member routes (show, edit, destroy) do not need the parent ID.",
     "x": [
      "# config/routes.rb\nresources :articles do\n  resources :comments, only: %i[index create destroy], shallow: true\nend\n\n# CommentsController\ndef create\n  @article = Article.find(params[:article_id])\n  @comment = @article.comments.build(comment_params)\n  @comment.save\nend"
     ],
     "s": [
      "What is a nested resource in Rails?"
     ]
    },
    {
     "q": "In Rails routing, what is the key difference between using resources :articles and resource :account?",
     "l": "I",
     "a": "Option 2: `resources :articles` creates routes for working with multiple articles, while `resource :account` creates routes for a single account.",
     "e": "The correct choice is `resources :articles` creates routes for working with multiple articles, while `resource :account` creates routes for a single account. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "In Ruby on Rails, what is the fundamental difference between using a _path helper and a _url helper when generating URLs?",
     "l": "I",
     "a": "Option 2: `_path` generates a relative URL, while `_url` generates an absolute URL including the protocol and host.",
     "e": "The correct choice is `_path` generates a relative URL, while `_url` generates an absolute URL including the protocol and host. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "What paths (HTTP verb and URL) will be defined by the following snippet in config/routes.rb?",
     "l": "I",
     "a": "resources :posts generates seven routes: GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH/PUT /posts/:id (update) and DELETE /posts/:id (destroy).",
     "e": "Each route also gets a path/URL helper: posts_path, new_post_path, post_path(post) and edit_post_path(post). If the snippet uses only: or except:, only the listed actions are generated. Note that PATCH and PUT both map to update.",
     "x": [
      "resources :posts\n\n# GET    /posts           posts#index\n# GET    /posts/new       posts#new\n# POST   /posts           posts#create\n# GET    /posts/:id       posts#show\n# GET    /posts/:id/edit  posts#edit\n# PATCH  /posts/:id       posts#update\n# PUT    /posts/:id       posts#update\n# DELETE /posts/:id       posts#destroy"
     ],
     "s": [
      "What paths does the following code snip set define?"
     ]
    }
   ]
  ],
  [
   "Sessions, cookies and flash",
   [
    {
     "q": "What is the purpose of a 'flash' message in Rails?",
     "l": "B",
     "a": "flash carries temporary values across the current and next request, commonly for a one-time notice after a redirect.",
     "e": "Use flash.now when rendering in the current request so the message does not linger into a following request; use flash.keep to preserve it for another request. Rendering does not itself perform the same request-cycle transition as redirecting.",
     "x": [
      "redirect_to @post, notice: \"Saved\"\n# On validation failure without redirect:\nflash.now[:alert] = \"Please correct the errors\"\nrender :new, status: :unprocessable_entity",
      "redirect_to articles_path, notice: \"Saved\"\n# On validation failure with a render:\nflash.now[:alert] = \"Please fix the errors\""
     ],
     "p": [
      "Flash lifetime follows requests, not the number of view templates rendered.",
      "flash is normally available for the current and next request; use flash.now for a current render and flash.keep when preserving it further."
     ],
     "s": [
      "What is the flash hash in Rails?",
      "What is a flash message in Rails, and how do you use it?",
      "What is the purpose of flash in Rails?",
      "In a Rails application, what is the primary purpose of the flash object?"
     ]
    },
    {
     "q": "What are Rails sessions and cookies used for?",
     "l": "B",
     "a": "Cookies store browser data; Rails sessions expose per-client state through a configurable store. Rails’ default CookieStore keeps encrypted and authenticated session data in the cookie.",
     "e": "Server-backed session stores usually keep only a lookup identifier in the browser. CookieStore does not require sticky sessions or a shared session database, but all app instances need compatible secrets. Keep sessions small, rotate them when authentication changes, and understand expiry and revocation requirements.",
     "x": [
      "session[:user_id] = user.id\ncookies.encrypted[:preference] = { value: \"dark\", httponly: true }\nreset_session # for an authentication boundary",
      "if user.authenticate(params[:password])\n  reset_session\n  session[:user_id] = user.id\nend\n# Logout:\nreset_session"
     ],
     "p": [
      "Do not claim Rails sessions are server-side by default."
     ],
     "s": [
      "What is a session in Rails, and how is it managed?"
     ]
    }
   ]
  ],
  [
   "Views, layouts and helpers",
   [
    {
     "q": "Explain how rail implements Ajax?",
     "l": "B",
     "a": "Rails can respond to asynchronous browser requests using HTML fragments, JSON or Turbo Stream representations; the client decides how to update the page.",
     "e": "Modern applications often use fetch or Turbo rather than old automatically generated Prototype/RJS JavaScript. Explicitly define the response contract, retain authorization and CSRF defenses for browser-authenticated mutations, and handle request errors on the client.",
     "x": [
      "fetch(\"/posts/1.json\", { headers: { Accept: \"application/json\" } })\n  .then(response => response.json())\n  .then(post => console.log(post.title))"
     ]
    },
    {
     "q": "What do you understand with the ERB in Ruby on Rails?",
     "l": "B",
     "a": "ERB means Embedded Ruby and evaluates Ruby within a text template.",
     "e": "<% ... %> executes without inserting its result; <%= ... %> inserts the expression result. Rails escapes normal string output to reduce XSS. <%+= and >% are not the correct tag delimiters.",
     "x": [
      "<% if @user %>\n  <p>Hello <%= @user.name %></p>\n<% end %>"
     ],
     "s": [
      "What are the basic conditions that a user should pay attention to while preparing an ERB document in Ruby?"
     ]
    },
    {
     "q": "What is the difference between link_to and button_to in Rails?",
     "l": "B",
     "a": "link_to produces an anchor for navigation; button_to generates a form with a submit button and is suitable for state-changing actions.",
     "e": "An ordinary anchor makes a GET request. Rails-UJS and Turbo use different data attributes to issue other methods from links. Prefer button_to for deletion when possible, preserve CSRF protection, and use a 303 redirect after destructive form actions when appropriate.",
     "x": [
      "<%= link_to \"Read\", post_path(@post) %>\n<%= button_to \"Delete\", post_path(@post), method: :delete %>"
     ]
    },
    {
     "q": "What are the benefits of using the importmap-rails gem introduced in Rails 7 for managing JavaScript dependencies?",
     "l": "B",
     "a": "importmap-rails maps JavaScript module names to browser-loadable module URLs, allowing ES modules without a JavaScript bundling step.",
     "e": "Pin reviewed dependency versions and choose local/vendor or CDN distribution deliberately. It does not transpile TypeScript/JSX or resolve every Node-specific package into a browser-ready form. Use a bundler when your source requires transformation or a package is not browser-compatible.",
     "x": [
      "bin/importmap pin alpinejs\n# app/javascript/application.js\nimport Alpine from \"alpinejs\"\nwindow.Alpine = Alpine\nAlpine.start()"
     ]
    },
    {
     "q": "What does the term “Yield” refer to in the context of Ruby on Rails?",
     "l": "B",
     "a": "In a layout, yield marks where the current view’s content is inserted. yield :name inserts a named section that a view provided with content_for :name.",
     "e": "This is different from Ruby’s yield in a method, although the idea is the same: the layout wraps content supplied by the view. It lets one layout serve every page while each view fills in the body, title or sidebar.",
     "x": [
      "<!-- app/views/layouts/application.html.erb -->\n<head><title><%= yield(:title).presence || \"My App\" %></title></head>\n<body>\n  <%= yield %>\n</body>\n\n<!-- app/views/articles/show.html.erb -->\n<% content_for :title, @article.title %>\n<h1><%= @article.title %></h1>"
     ],
     "s": [
      "Explain the use of yield in Rails layouts."
     ]
    },
    {
     "q": "In Ruby on Rails, what is the primary purpose of the content_tag helper method?",
     "l": "B",
     "a": "Option 2: To generate HTML tags programmatically within your views.",
     "e": "The correct choice is To generate HTML tags programmatically within your views. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "What are Helpers and How do use Helpers in Ruby on Rails?",
     "l": "B",
     "a": "Controllers in app/controllers coordinate HTTP requests; helper modules in app/helpers provide reusable presentation methods for views.",
     "e": "A controller action loads or changes application state, enforces authorization, and chooses a response. Helpers format or construct view content. They are not a substitute for domain services or authorization policies; controller access to helpers is not automatic in every calling context.",
     "x": [
      "module ApplicationHelper\n  def display_date(date)\n    date ? l(date, format: :long) : \"—\"\n  end\nend",
      "module UsersHelper\n  def display_name(user)\n    user.name.presence || \"Anonymous\"\n  end\nend"
     ],
     "p": [
      "Both directory names are plural.",
      "Keep database-heavy business logic out of view helpers."
     ],
     "s": [
      "What is a helper in Ruby on Rails?",
      "How do you use helpers in Ruby on Rails?",
      "What is the role of a helper in Rails?",
      "What is a view helper in Rails?",
      "What is a Rails helper?",
      "What are helpers in Rails?",
      "How do you use Rails helpers?",
      "Explain the purpose of Rails helpers.",
      "What is the logic behind the helper?"
     ]
    },
    {
     "q": "What are the main parts of a Rails view?",
     "l": "B",
     "a": "A Rails view usually combines a layout (the shared page frame), the action’s template, partials for reusable pieces, and helpers for formatting logic.",
     "e": "Templates are ERB files under app/views/<controller>/ named after the action and format (show.html.erb, index.json.jbuilder). The layout yields to the template, the template renders partials, and helpers keep Ruby logic out of the markup.",
     "x": [
      "app/views/\n  layouts/application.html.erb   # frame with <%= yield %>\n  articles/index.html.erb        # action template\n  articles/_article.html.erb     # partial\napp/helpers/articles_helper.rb   # helper methods"
     ]
    },
    {
     "q": "What is a partial in Rails views? Why would you use one?",
     "l": "B",
     "a": "A partial is a reusable view fragment stored in a file starting with an underscore, such as _form.html.erb, and rendered with render. It removes duplicated markup, for example the same form in new and edit.",
     "e": "Pass data with locals instead of relying on instance variables. Rendering a collection with render @articles renders _article.html.erb once per record, which is shorter and faster than a manual loop.",
     "x": [
      "<!-- new.html.erb and edit.html.erb -->\n<%= render \"form\", article: @article %>\n\n<!-- index.html.erb: renders articles/_article.html.erb for each record -->\n<%= render @articles %>\n\n<!-- _article.html.erb -->\n<li><%= link_to article.title, article %></li>"
     ],
     "s": [
      "What is a partial in Rails, and why would you use it?",
      "Explain the concept of partials in Ruby on Rails views and their benefits in web development.",
      "What is a partial in Rails?",
      "What are partials in Rails?",
      "What is a Rails partial, and why would you use one?",
      "Discuss the use of partials and layouts in Rails views.",
      "In Rails, what is the primary purpose of using render partial?"
     ]
    },
    {
     "q": "What is a Rails view, and how does it relate to the controller?",
     "l": "B",
     "a": "A view turns the data prepared by the controller into the response, usually HTML from an ERB template. The controller sets instance variables, and Rails renders the matching template with access to them.",
     "e": "By convention ArticlesController#index renders app/views/articles/index.html.erb. Instance variables such as @articles are copied into the view. Keep views for presentation; put formatting in helpers and business rules in models. You can also pass explicit locals with render.",
     "x": [
      "# controller\ndef index\n  @articles = Article.published.order(created_at: :desc)\nend\n\n<!-- app/views/articles/index.html.erb -->\n<% @articles.each do |article| %>\n  <h2><%= article.title %></h2>\n<% end %>"
     ],
     "s": [
      "What are views in Rails? What's their purpose?",
      "How would you display a variable from a controller in a Rails view?",
      "How do you pass data from a controller to a view?"
     ]
    },
    {
     "q": "What is the asset pipeline, and how do you add CSS and JavaScript to a Rails app?",
     "l": "B",
     "a": "An asset pipeline manages static asset discovery and fingerprinted URLs; exact bundling and preprocessing behavior depends on the configured tools and Rails version.",
     "e": "Rails 8 uses Propshaft by default. Propshaft does not itself perform general-purpose JavaScript/CSS bundling or minification; specialized tools can be added. Sprockets and Webpacker descriptions in older answers must be read in their historical context.",
     "x": [
      "bin/rails assets:precompile\n# Inspect configured Propshaft/Sprockets and JS/CSS build tools for this app.",
      "RAILS_ENV=production bin/rails assets:precompile\n# Reference a fingerprinted asset through a helper:\n<%= image_tag \"logo.png\" %>",
      "<%= stylesheet_link_tag \"application\", \"data-turbo-track\": \"reload\" %>\n<%= javascript_importmap_tags %>\n# bin/rails assets:precompile"
     ],
     "p": [
      "Fingerprinting enables long-lived cache headers while content changes get new URLs.",
      "Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.",
      "Webpacker is not the universal modern Rails default.",
      "Do not assume every application concatenates all assets into exactly two files."
     ],
     "s": [
      "What is an Asset Pipeline in Rails?",
      "What is the asset pipeline in Rails?",
      "Explain what an asset pipeline is.",
      "Explain the concept of asset pipeline in Ruby on Rails and its significance in web development.",
      "Explain the concept of asset pipeline in Ruby on Rails and how it optimizes the delivery of assets in web applications.",
      "What is the asset pipeline?",
      "What is the Rails Asset Pipeline?",
      "What is Rails’ asset pipeline?",
      "What is an asset pipeline in Rails? What problem does it solve?",
      "What is the asset pipeline in Rails? What is its purpose?",
      "How do you add CSS and JavaScript to your Rails application?",
      "What is the purpose of the assets folder in Rails?",
      "Which of the following statements best describes the primary function of the Rails asset pipeline?"
     ]
    },
    {
     "q": "What is Nested Layout in Ruby on Rails?",
     "l": "B",
     "a": "Nested layouts let a section-specific layout supply content inside the application layout.",
     "e": "Use content_for and a layout render to share the global shell while customizing an admin area or similar section. Layouts are composed templates; an ERB layout does not inherit like a Ruby class.",
     "x": [
      "<%# layouts/admin.html.erb %>\n<% content_for :content do %>\n  <aside>Admin</aside><%= yield %>\n<% end %>\n<%= render template: \"layouts/application\" %>\n<%# application: yield(:content).presence || yield %>",
      "# layout\n<title><%= content_for?(:title) ? yield(:title) : \"Shop\" %></title>\n<main><%= yield %></main>\n# view\n<% content_for :title, \"Products\" %>"
     ],
     "p": [
      "Avoid naming a content block ambiguously or recursively rendering the same layout."
     ],
     "s": [
      "How do you use nested layouts?"
     ]
    },
    {
     "q": "What is the primary purpose of the content_for helper in Rails?",
     "l": "B",
     "a": "Option 1: To define a block of content in a view that can be rendered in a different view, typically a layout.",
     "e": "The correct choice is To define a block of content in a view that can be rendered in a different view, typically a layout. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "What is the purpose of Rails layouts?",
     "l": "B",
     "a": "A layout wraps view content, and yield inserts the current view or a named content_for section.",
     "e": "Use partials for reusable pieces and nested layouts when pages need an additional wrapper inside a shared application layout. content_for captures named sections; a block form needs do and a matching end. A named section only appears if the selected layout yields that name.",
     "x": [
      "# layout\n<title><%= content_for?(:title) ? yield(:title) : \"Shop\" %></title>\n<main><%= yield %></main>\n# view\n<% content_for :title, \"Products\" %>"
     ],
     "s": [
      "In a Rails application, what is the primary purpose of a layout?"
     ]
    },
    {
     "q": "How do you optimize asset loading in Rails?",
     "l": "B",
     "a": "Precompile and fingerprint assets, serve them from a CDN with long cache headers, compress them (gzip/brotli), load JavaScript with defer or as modules, and avoid shipping unused CSS and JavaScript.",
     "e": "Fingerprinted names (app-3f2a.css) let browsers cache files forever while still getting new versions after a deploy. Use image variants or responsive images and lazy loading for large images. Measure with browser dev tools or Lighthouse before and after.",
     "x": [
      "# config/environments/production.rb\nconfig.asset_host = \"https://cdn.example.com\"\nconfig.public_file_server.headers = { \"Cache-Control\" => \"public, max-age=31536000\" }\n\n<%= javascript_importmap_tags %>\n<%= image_tag \"hero.jpg\", loading: \"lazy\" %>"
     ]
    },
    {
     "q": "What is the difference between render and render_to_string?",
     "l": "I",
     "a": "render sets the controller response body, while render_to_string returns rendered output as a Ruby string.",
     "e": "Both use the rendering system. Use render_to_string when building an email fragment, generating a document, or composing content without immediately assigning the HTTP response. Neither operation executes another controller action.",
     "x": [
      "html = render_to_string(partial: \"receipt\", locals: { order: @order })\nrender html: html"
     ]
    },
    {
     "q": "What is the difference between render and redirect_to?",
     "l": "I",
     "a": "render creates a response within the current request; redirect_to sends a redirect so the client makes a new request.",
     "e": "Rendering a template does not execute the other action or initialize its instance variables. Redirecting does not transfer local state except through mechanisms such as flash or parameters. Neither method is a Ruby return statement. After a successful modifying form submission, a 303 redirect is often appropriate.",
     "x": [
      "if @post.save\n  redirect_to @post, status: :see_other\nelse\n  render :new, status: :unprocessable_entity\nend",
      "if @article.update(article_params)\n  redirect_to @article, status: :see_other\nelse\n  render :edit, status: :unprocessable_entity\nend"
     ],
     "p": [
      "Do not render twice or continue into another response."
     ],
     "s": [
      "What do you mean by Render and Redirect_to?",
      "What is the difference between render and redirect_to in controllers?",
      "What is the difference between render and redirect_to in Rails?",
      "Explain the difference between `render` and `redirect_to` in a Rails controller.",
      "In a Rails controller, what is the key difference between using redirect_to and render?",
      "In a Rails controller, what is the primary purpose of the render method?"
     ]
    },
    {
     "q": "Explain the Rails asset pipeline, and what are the advantages of using Webpacker over the asset pipeline?",
     "l": "A",
     "a": "The asset pipeline (Sprockets, and Propshaft in Rails 8) serves CSS, JavaScript and images with fingerprinted file names for caching. Webpacker wrapped webpack to bundle modern JavaScript; it is now retired and replaced by importmap-rails, jsbundling-rails or cssbundling-rails.",
     "e": "Sprockets also concatenated and compiled assets. Webpacker (Rails 5.1–6) added npm packages, ES modules and React/Vue support, which Sprockets handled poorly. In Rails 7+, importmap loads ES modules directly in the browser with no build step, and jsbundling uses esbuild, rollup or webpack when a build step is needed.",
     "p": [
      "Mention the version you worked with; Webpacker answers are historical."
     ]
    },
    {
     "q": "How do you handle server-side rendering (SSR) in Rails?",
     "l": "A",
     "a": "Rails normally renders HTML on the server through Action View templates and layouts.",
     "e": "The server prepares the data and HTML; the browser displays it and can add Turbo/Stimulus interactions. If the question means server-rendering a JavaScript UI framework, that requires a separate integration and runtime/build plan rather than a generic Rails setting.",
     "x": [
      "def show\n  @post = Post.find(params[:id])\nend\n# show.html.erb\n<h1><%= @post.title %></h1>"
     ]
    }
   ]
  ],
  [
   "Forms",
   [
    {
     "q": "How do you build nested forms with accepts_nested_attributes_for?",
     "l": "B",
     "a": "Nested routes express a parent-child URL relationship; nested forms edit associated models using fields_for and accepts_nested_attributes_for.",
     "e": "For routes, authorize the child through its parent rather than trusting unrelated IDs. Keep nesting shallow. For forms, permit the nested attribute keys explicitly and consider validation/error handling and reject_if/allow_destroy behavior.",
     "x": [
      "resources :posts do\n  resources :comments, shallow: true\nend\n# Controller lookup:\n@comment = current_user.posts.find(params[:post_id]).comments.find(params[:id])",
      "<%= form_with model: @user do |form| %>\n  <%= form.text_field :name %>\n  <%= form.fields_for :posts do |post| %>\n    <%= post.text_field :title %>\n  <% end %>\n<% end %>\n# params.require(:user).permit(:name, posts_attributes: [:id, :title])"
     ],
     "p": [
      "Strong parameters filter mass assignment; they do not replace authorization or validation."
     ],
     "s": [
      "How do you implement nested forms in Rails?",
      "In Rails, what is the primary purpose of accepts_nested_attributes_for?",
      "How do you handle form submissions with nested attributes in Rails?"
     ]
    },
    {
     "q": "What is a Rails form, how do you create one and handle its submission?",
     "l": "B",
     "a": "Rails form helpers generate HTML tied to a URL or model; nested forms use fields_for with accepts_nested_attributes_for when updating associated records through a parent.",
     "e": "Use form_with for model binding and built-in form conventions. For nested updates, permit a deliberate attribute list and authorize the child records being changed. allow_destroy controls nested deletion through _destroy; include an ID when modifying an existing child.",
     "x": [
      "<%= form_with model: @user do |form| %>\n  <%= form.text_field :name %>\n  <%= form.fields_for :posts do |post| %>\n    <%= post.text_field :title %>\n  <% end %>\n<% end %>\n# params.require(:user).permit(:name, posts_attributes: [:id, :title])",
      "def create\n  @post = current_user.posts.new(post_params)\n  if @post.save\n    redirect_to @post, status: :see_other\n  else\n    render :new, status: :unprocessable_entity\n  end\nend"
     ],
     "p": [
      "Strong parameters filter mass assignment; they do not replace authorization or validation."
     ],
     "s": [
      "What is a Rails form, and how do you create one?",
      "How do you handle form submissions in Rails?",
      "What is a 'form' in HTML, and how does it relate to a Rails application?"
     ]
    },
    {
     "q": "What is the difference between form_for and form_with?",
     "l": "B",
     "a": "form_for is the older model-bound form builder; form_with supports model-bound and URL/scoped forms through one interface.",
     "e": "Use form_with for new application code. Default remote/local behavior changed across Rails versions, and Turbo affects submission behavior independently. A model-bound form derives URL/method and parameter nesting from the object and routes.",
     "x": [
      "<%= form_with(model: @post) do |f| %>\n  <%= f.text_field :title %>\n  <%= f.submit %>\n<% end %>"
     ],
     "s": [
      "In Ruby on Rails, what is the primary purpose of the form_with helper?"
     ]
    }
   ]
  ],
  [
   "Hotwire and Turbo",
   [
    {
     "q": "How does the Hotwire integration in Rails 7 improve real-time functionality in web applications?",
     "l": "B",
     "a": "Hotwire combines Turbo’s navigation, frames and stream updates with Stimulus controllers for small client-side behavior.",
     "e": "Turbo Drive handles navigation, frames update isolated regions, and streams describe DOM changes delivered over HTTP or WebSockets. Turbolinks is the predecessor to Turbo Drive and belongs to older applications. Real-time broadcasting still needs authorization, safe stream subscriptions and reliable server operations.",
     "x": [
      "<%= turbo_stream_from @conversation %>\n<%= turbo_frame_tag \"messages\" do %>\n  <%= render @messages %>\n<% end %>"
     ]
    },
    {
     "q": "What is Turbolinks in Rails?",
     "l": "B",
     "a": "Turbolinks made page navigation faster by fetching the next page with JavaScript and replacing only the <body>, instead of a full browser reload. In Rails 7 it was replaced by Turbo Drive, part of Hotwire.",
     "e": "Because the JavaScript and CSS in <head> stayed loaded, navigation felt like a single-page app without writing a front-end framework. A common pitfall was code that ran on DOMContentLoaded and therefore did not run again after a Turbolinks visit; you had to listen for turbolinks:load (turbo:load with Turbo).",
     "p": [
      "Turbolinks is historical; mention Turbo Drive, Frames and Streams for current apps."
     ]
    }
   ]
  ],
  [
   "APIs",
   [
    {
     "q": "How do you generate JSON responses in Rails?",
     "l": "B",
     "a": "JSON is a data interchange format; Rails can render structured JSON directly or use a chosen serializer/template layer.",
     "e": "Expose an explicit public representation so sensitive database fields do not leak. ActiveModel::Serializer is supplied by a separate library, not a mandatory Rails built-in serializer. Include appropriate status codes, pagination and version/error contracts for APIs.",
     "x": [
      "render json: { id: @user.id, name: @user.name }, status: :ok"
     ],
     "s": [
      "What is JSON?"
     ]
    },
    {
     "q": "What is a serializer in Rails?",
     "l": "B",
     "a": "A serializer is a class that decides how a model is converted to JSON for an API: which attributes and associations are included and how they are formatted.",
     "e": "Serializers keep API output out of models and controllers, prevent leaking fields such as password_digest, and make the response format consistent. Common options are ActiveModel::Serializers, jsonapi-serializer, Blueprinter, Alba and Jbuilder templates.",
     "x": [
      "class UserSerializer < ActiveModel::Serializer\n  attributes :id, :name, :email\n  has_many :posts\nend\n\nrender json: @user   # uses UserSerializer when AMS is installed"
     ],
     "s": [
      "Describe the use of `ActiveModel::Serializers` in Rails. When should you use it?"
     ]
    },
    {
     "q": "Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints",
     "l": "B",
     "a": "Separate the GraphQL client, a validated Planet persistence model and a REST controller; import validated rows idempotently rather than embedding a network fetch in every endpoint.",
     "e": "Send a POST carrying the provided GraphQL query, apply connection/read timeouts, reject non-success responses and GraphQL errors, and validate data before writes. The query has no stable external ID, so name-based uniqueness is only an explicit exercise assumption. Store population with an adequate numeric/null policy and terrains/climates as structured data. A real API needs authorization, pagination and tests for upstream failures. The provided public endpoint was not called or assumed to remain available.",
     "x": [
      "# Import service skeleton; adapter/schema details must match the app.\nrequire \"net/http\"\nrequire \"json\"\nuri = URI(ENV.fetch(\"PLANETS_GRAPHQL_URL\"))\nrequest = Net::HTTP::Post.new(uri)\nrequest[\"Content-Type\"] = \"application/json\"\nrequest.body = JSON.generate(query: \"query Query {allPlanets{planets{name population terrains climates}}}\")\nresponse = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == \"https\", open_timeout: 3, read_timeout: 5) { |http| http.request(request) }\nraise \"Upstream HTTP #{response.code}\" unless response.is_a?(Net::HTTPSuccess)\npayload = JSON.parse(response.body)\nraise \"GraphQL errors\" if payload[\"errors\"]\nrows = payload.fetch(\"data\").fetch(\"allPlanets\").fetch(\"planets\")\nPlanet.transaction do\n  rows.each do |row|\n    planet = Planet.find_or_initialize_by(name: row.fetch(\"name\"))\n    planet.update!(population: row[\"population\"], terrains: row[\"terrains\"], climates: row[\"climates\"])\n  end\nend\n# routes.rb\nresources :planets, only: [:index, :show, :create, :update, :destroy]\n# Controller create:\n# planet = Planet.create!(params.require(:planet).permit(:name, :population, terrains: [], climates: []))\n# render json: planet, status: :created"
     ],
     "p": [
      "Use a database unique constraint for the chosen external identity and a durable external ID if the provider exposes one."
     ]
    },
    {
     "q": "Describe how you would implement API versioning in a Rails application.",
     "l": "I",
     "a": "I would implement API versioning in a Rails application using a few different strategies. One common approach is to use URL-based versioning, where the version number is included in the URL itself (e.g., /api/v1/resources, /api/v2/resources). This is straightforward to implement and makes it very clear which version of the API a client is using. Rails' routing constraints can be leveraged to route requests based on the version in the URL.",
     "e": "Alternatively, I might use header-based versioning. In this case, the client specifies the desired API version in a custom request header (e.g., Accept: application/vnd.myapi.v1+json). This approach keeps the URLs cleaner but requires clients to manage the request header correctly. For either approach, I'd create separate controllers or namespaces to handle different versions, allowing for distinct logic and data transformations for each version. For example, placing code under app/controllers/api/v1/ or app/controllers/api/v2/",
     "x": [
      "namespace :api do\n  namespace :v1 do\n    resources :users, only: :show\n  end\nend"
     ],
     "n": [
      "I would implement API versioning in a Rails application using a few different strategies. One common approach is to use URL-based versioning, where the version number is included in the URL itself (e.g., /api/v1/resources, /api/v2/resources). This is straightforward to implement and makes it very clear which version of the API a client is using. Rails' routing constraints can be leveraged to route requests based on the version in the URL.\n\nAlternatively, I might use header-based versioning. In this case, the client specifies the desired API version in a custom request header (e.g., Accept: application/vnd.myapi.v1+json). This approach keeps the URLs cleaner but requires clients to manage the request header correctly. For either approach, I'd create separate controllers or namespaces to handle different versions, allowing for distinct logic and data transformations for each version. For example, placing code under app/controllers/api/v1/ or app/controllers/api/v2/"
     ],
     "p": [
      "Avoid duplicating the whole business layer solely because transport versions differ."
     ],
     "s": [
      "How do you handle API versioning in Rails?"
     ]
    },
    {
     "q": "Explain the use of respond_to in controllers.",
     "l": "I",
     "a": "Controller respond_to selects the representation for the requested format using registered MIME types.",
     "e": "Define HTML, JSON or other branches intentionally and handle unsupported formats. This controller API differs from Ruby’s respond_to?, which asks whether an object exposes a method.",
     "x": [
      "respond_to do |format|\n  format.html\n  format.json { render json: { id: @post.id, title: @post.title } }\nend"
     ]
    },
    {
     "q": "What is the role of an API-only application in Rails, and when would you use it?",
     "l": "A",
     "a": "An API-only Rails application uses ActionController::API and a smaller middleware/view stack focused on serving data rather than full browser pages.",
     "e": "It retains models, routing and other Rails components. Add session/cookie/CSRF or other middleware deliberately if the API uses browser cookie authentication. Authentication, authorization, error handling and a stable response contract are still application responsibilities.",
     "x": [
      "rails new service --api\n# Controller:\nrender json: { status: \"ok\" }"
     ]
    },
    {
     "q": "Explain how you would implement a RESTful API in Rails, including versioning, authentication, and documentation.",
     "l": "A",
     "a": "To implement a RESTful API in Rails, I would start by using rails new my_api --api to create an API-only application. For versioning, I'd use namespace-based versioning (e.g., api/v1/) or custom media types in the Accept header. Controllers would inherit from ApplicationController, rendering JSON responses using render json: @object. Authentication can be achieved using token-based authentication like JWT (using gems like jwt and bcrypt) or OAuth with gems such as omniauth. Clients would send tokens in the Authorization header.",
     "e": "For documentation, I'd use a tool like rswag or apipie-rails to generate Swagger/OpenAPI specifications from code comments or dedicated DSLs. This allows automated documentation and interactive API exploration. Error handling would involve rescue blocks in the ApplicationController to return standardized JSON error responses with appropriate HTTP status codes. I would also implement request validations in the controller using strong parameters or form objects.",
     "n": [
      "To implement a RESTful API in Rails, I would start by using rails new my_api --api to create an API-only application. For versioning, I'd use namespace-based versioning (e.g., api/v1/) or custom media types in the Accept header. Controllers would inherit from ApplicationController, rendering JSON responses using render json: @object. Authentication can be achieved using token-based authentication like JWT (using gems like jwt and bcrypt) or OAuth with gems such as omniauth. Clients would send tokens in the Authorization header.\n\nFor documentation, I'd use a tool like rswag or apipie-rails to generate Swagger/OpenAPI specifications from code comments or dedicated DSLs. This allows automated documentation and interactive API exploration. Error handling would involve rescue blocks in the ApplicationController to return standardized JSON error responses with appropriate HTTP status codes. I would also implement request validations in the controller using strong parameters or form objects."
     ]
    }
   ]
  ],
  [
   "Error handling",
   [
    {
     "q": "How do you handle errors and exceptions in a Rails application?",
     "l": "B",
     "a": "Handle expected failures explicitly and map known exceptions to appropriate responses, while letting unexpected failures reach centralized reporting.",
     "e": "rescue_from can map a specific controller-level exception to a response. Avoid blanket rescue of StandardError that hides bugs or returns success for failures. Keep detailed traces in protected logs and return safe error messages with meaningful status codes.",
     "x": [
      "rescue_from ActiveRecord::RecordNotFound do\n  render json: { error: \"Not found\" }, status: :not_found\nend",
      "rescue_from ActiveRecord::RecordNotFound do\n  render json: { error: \"not found\" }, status: :not_found\nend",
      "begin\n  Integer(\"invalid\")\nrescue ArgumentError => e\n  warn e.message\nend"
     ],
     "p": [
      "Do not broadly rescue Exception or ignore failures just to keep a request apparently successful.",
      "Avoid Exception-wide rescue, unbounded retries and logging secrets or personal data unnecessarily."
     ],
     "s": [
      "How do you handle errors in Rails?",
      "How do you handle exceptions and errors in Rails?",
      "How do you handle exceptions in Rails?",
      "What are the common methods for error handling in Ruby and Rails?"
     ]
    }
   ]
  ],
  [
   "Find the bug",
   [
    {
     "q": "The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code. class Product < ApplicationRecord validates name, presence: true, length: { minimum: 3, maximum: 50 } end Code language: CSS (css)",
     "l": "B",
     "a": "Use a symbol or string naming the attribute: validates :name, presence: true, length: { minimum: 3, maximum: 50 }.",
     "e": "The bare name expression in a class body is interpreted as a method call/local expression, not the intended attribute name; in a model class it can even resolve to the class’s own name. Passing :name explicitly gives the validation DSL the correct attribute.",
     "x": [
      "class Product < ApplicationRecord\n  validates :name, presence: true, length: { minimum: 3, maximum: 50 }\nend"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code. <%= form_tag products_path do %> <%= label_tag :name, \"Product Name\" %> <%= text_field_tag :name %> <%= label_tag :price, \"Price\" %> <%= text_field_tag :price %> <%= submit_tag \"Add Product\" %> <%= end_form_tag %> Code language: HTML, XML (xml)",
     "l": "B",
     "a": "Replace the nonexistent end_form_tag with the ERB block terminator <% end %>. form_tag itself is valid legacy helper syntax.",
     "e": "A modern model-backed form normally uses form_with, which also produces nested parameter names expected by Strong Parameters. Match controller parameter handling to the chosen form shape.",
     "x": [
      "<%= form_with(model: @product) do |f| %>\n  <%= f.label :name %>\n  <%= f.text_field :name %>\n  <%= f.label :price %>\n  <%= f.number_field :price, step: \"0.01\" %>\n  <%= f.submit \"Add Product\" %>\n<% end %>"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to create a new article record and save it to the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code. # Controller class ArticlesController < ApplicationController def create @article = Article.new(params[:article]) if @article.save redirect_to articles_path else render 'new' end end end # View (new.html.erb) <%= form_for @article do |f| %> <%= f.label :title %> <%= f.text_field :title %> <%= f.label :content %> <%= f.text_area :content %> <%= f.submit 'Create Article' %> <% end %> Code language: CSS (css)",
     "l": "B",
     "a": "The issue is unpermitted parameters during mass assignment in modern Rails, not a Ruby syntax error.",
     "e": "Use a private method returning permitted attributes, instantiate the article through an authorized scope where relevant, and handle invalid data with an appropriate response. The form’s nested article fields should match the expected input shape.",
     "x": [
      "def create\n  @article = current_user.articles.new(article_params)\n  if @article.save\n    redirect_to @article, status: :see_other\n  else\n    render :new, status: :unprocessable_entity\n  end\nend\nprivate\ndef article_params\n  params.require(:article).permit(:title, :content)\nend"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code. class Product < ApplicationRecord belongs_to :category end class Category < ApplicationRecord has_many :products end Code language: CSS (css)",
     "l": "B",
     "a": "The associations shown already form a valid one-to-many relationship. Add optional: true only if the business permits a product with no category.",
     "e": "Modern belongs_to requires an associated record by default in newly configured applications. That is a valid integrity rule rather than a coding defect. The database should have category_id and an appropriate foreign key/nullability policy. Making an association optional without a requirement can weaken data integrity.",
     "x": [
      "class Product < ApplicationRecord\n  belongs_to :category\nend\nclass Category < ApplicationRecord\n  has_many :products\nend"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code. class ProductsController < ApplicationController def index @products = Product.all end end Code language: JavaScript (javascript)",
     "l": "B",
     "a": "The controller shown has no Ruby syntax error. If the list fails, inspect the route, Product model/table, template location and actual database contents.",
     "e": "Product.all is a valid lazy relation and the controller action is syntactically valid. Do not invent a missing model as the only possible root cause.",
     "x": [
      "# Valid controller:\nclass ProductsController < ApplicationController\n  def index\n    @products = Product.all\n  end\nend\n# Conventional app/models/product.rb:\nclass Product < ApplicationRecord; end"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to delete an article record from the database when the user clicks the “Delete” link. However, it contains a logical error and doesn’t delete the article. Identify the error and fix the code. # Controller class ArticlesController < ApplicationController def destroy @article = Article.find(params[:id]) if @article.destroy redirect_to articles_path else flash[:error] = 'Failed to delete the article.' redirect_to article_path(@article) end end end # View (show.html.erb) <%= link_to 'Delete', article_path(@article), method: :delete, data: { confirm: 'Are you sure?' } %>",
     "l": "B",
     "a": "The before/after source code is identical. Whether method: :delete works depends on the frontend driver; prefer button_to, or use Turbo’s supported attributes.",
     "e": "Rails-UJS recognizes link_to method: :delete and data-confirm. A modern Turbo application uses data-turbo-method/data-turbo-confirm for links. An ordinary anchor without the relevant JavaScript issues GET, so inspect the actual network request and routes before diagnosing. The controller must authorize deletion and handle callback aborts.",
     "x": [
      "<%= button_to \"Delete\", article_path(@article), method: :delete, data: { turbo_confirm: \"Are you sure?\" } %>\n# In destroy after success:\nredirect_to articles_path, status: :see_other"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to fetch a list of articles from the database and display their titles. However, it contains a logical error and doesn’t display any articles. Identify the error and fix the code. # Controller class ArticlesController < ApplicationController def index @articles = Article.all end end # View (index.html.erb) <% @articles.each do |article| %> <p><%= article.title %></p> <% end %> Code language: CSS (css)",
     "l": "B",
     "a": "The code shown is already correct: the controller loads @articles and the view prints each title with <%= %>. If nothing is displayed, the cause is elsewhere.",
     "e": "Check that the route points to ArticlesController#index, the template is app/views/articles/index.html.erb, the articles table actually has rows, and no scope or authorization filter removes them. A real bug would be using <% %> instead of <%= %>, which runs the code but prints nothing.",
     "x": [
      "<!-- Bug version: prints nothing -->\n<% @articles.each do |article| %>\n  <p><% article.title %></p>\n<% end %>\n\n<!-- Fixed -->\n<p><%= article.title %></p>"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to update an existing article’s title and content in the database. However, it contains a logical error and doesn’t update the article as expected. Identify the error and fix the code. # Controller class ArticlesController < ApplicationController def update @article = Article.find(params[:id]) if @article.update(params[:article]) redirect_to article_path(@article) else render 'edit' end end end # View (edit.html.erb) <%= form_for @article do |f| %> <%= f.label :title %> <%= f.text_field :title %> <%= f.label :content %> <%= f.text_area :content %> <%= f.submit 'Update Article' %> <% end %> Code language: CSS (css)",
     "l": "B",
     "a": "Update with explicitly permitted fields after retrieving an authorized article, instead of passing unpermitted params[:article] directly.",
     "e": "Strong Parameters controls attributes, not ownership. The update method returns false when validations fail; respond with errors rather than claiming success.",
     "x": [
      "def update\n  @article = current_user.articles.find(params[:id])\n  if @article.update(article_params)\n    redirect_to @article, status: :see_other\n  else\n    render :edit, status: :unprocessable_entity\n  end\nend\nprivate\ndef article_params\n  params.require(:article).permit(:title, :content)\nend"
     ]
    },
    {
     "q": "What is the error in this Rails route configuration?",
     "l": "B",
     "a": "The explicit GET users/:id route duplicates the show route already generated by resources :users; it is redundant, not a Ruby syntax error.",
     "e": "Rails matches routes in declaration order. Remove accidental duplicate routes to make intent clear, but custom routes can be valid when they provide different behavior, constraints or helpers. Inspect the result with bin/rails routes.",
     "x": [
      "Rails.application.routes.draw do\n  resources :users\nend"
     ]
    },
    {
     "q": "What is the problem with the following controller code? How would you fix it?",
     "l": "B",
     "a": "Filter the allowed parameter keys directly instead of converting every untrusted key to a symbol; in a controller, use permit when these values will be mass-assigned.",
     "e": "Avoid building arbitrary dynamic dispatch or symbol vocabularies from attacker-controlled keys.",
     "x": [
      "allowed = %w[first_option second_option third_option]\noptions = params.permit(*allowed).to_h\n# For a plain Ruby Hash instead:\n# options = input.slice(*allowed)"
     ]
    },
    {
     "q": "The following Ruby on Rails code is intended to define a migration to create a products table with attributes name and price. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code. class CreateProducts < ActiveRecord::Migration[6.1] def up create_table :products do |t t.string :name t.decimal :price, precision: 10, scale: 2 t.timestamps end end def down drop_table :products end end",
     "l": "I",
     "a": "Close the block parameter with a pipe: create_table :products do |t|.",
     "e": "The remaining versioned migration structure with up/down is valid. Use a reversible change method for this straightforward create_table operation if desired; decimal precision/scale should match the domain.",
     "x": [
      "class CreateProducts < ActiveRecord::Migration[8.0]\n  def change\n    create_table :products do |t|\n      t.string :name\n      t.decimal :price, precision: 10, scale: 2\n      t.timestamps\n    end\n  end\nend"
     ],
     "p": [
      "ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods."
     ]
    }
   ]
  ]
 ],
 "rails_interview_security": [
  [
   "Authentication and authorization",
   [
    {
     "q": "How do you handle API authentication?",
     "l": "B",
     "a": "For APIs, use token-based authentication: each request sends a token in the Authorization header, and the server verifies it. Options include Rails’ authenticate_with_http_token with stored tokens, JWT, or OAuth2 (Doorkeeper).",
     "e": "Store only a hash of API tokens, give them expiry and scopes, send them over HTTPS only, and allow revocation. JWTs avoid a database lookup but are hard to revoke, so keep them short-lived. Session cookies also work for a same-site browser front end.",
     "x": [
      "class Api::BaseController < ActionController::API\n  include ActionController::HttpAuthentication::Token::ControllerMethods\n  before_action :authenticate\n\n  private\n\n  def authenticate\n    authenticate_or_request_with_http_token do |token, _options|\n      @current_user = ApiToken.find_by(digest: Digest::SHA256.hexdigest(token))&.user\n    end\n  end\nend"
     ],
     "s": [
      "How do you secure API endpoints in a Rails application?"
     ]
    },
    {
     "q": "How do you implement simple authentication in Rails?",
     "l": "B",
     "a": "Add a password_digest column, call has_secure_password in the model, check the password in a SessionsController and store the user ID in the session. Rails 8 includes bin/rails generate authentication, which builds this for you.",
     "e": "has_secure_password hashes passwords with bcrypt and adds authenticate. After login, reset the session to prevent session fixation, then store session[:user_id]. A current_user helper and a before_action protect pages.",
     "x": [
      "class User < ApplicationRecord\n  has_secure_password\nend\n\nclass SessionsController < ApplicationController\n  def create\n    user = User.find_by(email: params[:email])\n    if user&.authenticate(params[:password])\n      reset_session\n      session[:user_id] = user.id\n      redirect_to root_path\n    else\n      flash.now[:alert] = \"Invalid email or password\"\n      render :new, status: :unprocessable_entity\n    end\n  end\nend"
     ]
    },
    {
     "q": "How do you secure session management?",
     "l": "B",
     "a": "Rails’ default CookieStore keeps encrypted and authenticated session data in the browser cookie; other session stores keep data server-side behind a session identifier.",
     "e": "Store a small user identifier, not passwords, and rotate/reset the session after authentication to mitigate fixation. Use HTTPS and suitable Secure, HttpOnly and SameSite settings. Ordinary unsigned cookies are client-controlled and must not be trusted as proof of identity. Cookie sessions have a small size limit and different revocation trade-offs from server-side sessions.",
     "x": [
      "if user.authenticate(params[:password])\n  reset_session\n  session[:user_id] = user.id\nend\n# Logout:\nreset_session"
     ],
     "s": [
      "Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication?"
     ]
    },
    {
     "q": "What is the has_secure_password method in Rails?",
     "l": "B",
     "a": "has_secure_password adds password assignment, bcrypt hashing and authentication helpers to a model with a password_digest column.",
     "e": "Add bcrypt and never store plaintext or reversible passwords. The standard password validation checks required data and bcrypt limits, but application policy such as breached-password checks and login throttling remains your responsibility. Treat reset tokens and session rotation as part of the complete authentication design.",
     "x": [
      "class User < ApplicationRecord\n  has_secure_password\nend\nuser = User.create!(password: \"a sufficiently long passphrase\")\nuser.authenticate(\"wrong\") # false"
     ]
    },
    {
     "q": "What is the purpose of using gems like `Pundit` or `CanCanCan` in Rails? How do they help with authorization?",
     "l": "B",
     "a": "Gems like Pundit and CanCanCan in Rails provide authorization functionality, controlling what users are allowed to do within an application. They offer a structured and centralized approach to defining and enforcing permissions, preventing unauthorized access to resources and actions.",
     "e": "These gems help by:\n\nCentralizing authorization logic: Instead of scattering authorization checks throughout the code, they provide a single place to define permissions. Defining roles and abilities: They allow developers to define user roles (e.g., admin, editor, user) and the abilities associated with each role (e.g., create, read, update, delete). Enforcing permissions in controllers and views: They offer methods to check permissions within controllers before executing actions and in views to conditionally display content. For example with Pundit in a controller authorize @article will check whether current user can perform an action on the @article object. With CanCanCan you might use authorize! :read, @article. In views you can conditionally display content with @article.accessible_by?(current_ability, :update) or can? :update, @article.",
     "x": [
      "Gems like Pundit and CanCanCan in Rails provide authorization functionality, controlling what users are allowed to do within an application. They offer a structured and centralized approach to defining and enforcing permissions, preventing unauthorized access to resources and actions.\n\nThese gems help by:\n\nCentralizing authorization logic: Instead of scattering authorization checks throughout the code, they provide a single place to define permissions.\nDefining roles and abilities: They allow developers to define user roles (e.g., admin, editor, user) and the abilities associated with each role (e.g., create, read, update, delete).\nEnforcing permissions in controllers and views: They offer methods to check permissions within controllers before executing actions and in views to conditionally display content. For example with Pundit in a controller authorize @article will check whether current user can perform an action on the @article object. With CanCanCan you might use authorize! :read, @article. In views you can conditionally display content with @article.accessible_by?(current_ability, :update) or can? :update, @article."
     ]
    },
    {
     "q": "How can you implement authentication and authorization in a Rails application? What gems or techniques would you consider?",
     "l": "I",
     "a": "Authentication identifies the caller; authorization decides whether that caller may perform a specific operation on a specific resource.",
     "e": "Rails 8 has an authentication generator as a starting point; Devise is another established option with a different feature set. Use policies or abilities for authorization, scope queries to accessible records, and test cross-user access. A token format such as JWT is not a complete security design.",
     "x": [
      "bin/rails generate authentication\n# Or in an existing password-based User model:\nhas_secure_password\n# Verify with user.authenticate(password)",
      "article = current_user.articles.find(params[:id])\n# With a policy library, authorize the requested action explicitly.\n# bin/rails generate authentication # Rails 8 starting point",
      "# Controller policy example (assuming a policy library):\n# @post = Post.find(params[:id])\n# authorize @post, :update?"
     ],
     "p": [
      "UI visibility is not server-side access control.",
      "Keep password hashing, session rotation and object access checks separate concerns.",
      "Devise is an authentication gem, not \"device\"; authorization still requires independent checks. Rails versions differ in generated authentication support."
     ],
     "s": [
      "How do you implement authentication and authorization in Rails?",
      "How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities.",
      "How can you implement authentication and authorization in a Rails app?"
     ]
    },
    {
     "q": "How do you implement user authentication using Devise in Rails?",
     "l": "I",
     "a": "Add the devise gem, run its installer, generate Devise for the User model and migrate. Devise then provides sign-up, login, logout, password reset and helpers such as authenticate_user! and current_user.",
     "e": "Devise is configured with modules: database_authenticatable, registerable, recoverable, rememberable, validatable, plus confirmable, lockable and trackable if needed. Customize views with rails g devise:views and permit extra sign-up fields with configure_permitted_parameters.",
     "x": [
      "bundle add devise\nbin/rails generate devise:install\nbin/rails generate devise User\nbin/rails db:migrate\n\nclass User < ApplicationRecord\n  devise :database_authenticatable, :registerable,\n         :recoverable, :rememberable, :validatable\nend\n\nclass ApplicationController < ActionController::Base\n  before_action :authenticate_user!\nend"
     ]
    },
    {
     "q": "How do you implement OAuth authentication in Rails?",
     "l": "A",
     "a": "Use a maintained OAuth/OIDC integration to delegate sign-in, and validate the full protocol response rather than treating an arbitrary token as trusted.",
     "e": "Choose an authorization-code flow with state and, where appropriate, PKCE. For OpenID Connect validate nonce, issuer, audience and signatures. Map the verified provider identity to a local account carefully and avoid linking accounts based on an unverified email address. Doorkeeper serves OAuth authorization for your own API; OmniAuth integrates external sign-in providers.",
     "x": [
      "Provider callback → verify state/code/token → locate account by issuer and subject → establish a new local session"
     ]
    },
    {
     "q": "Explain how you would implement a role-based access control (RBAC) system in a Rails application.",
     "l": "A",
     "a": "Give each user a role (or several roles through a join table), and check permissions for each action with a policy layer such as Pundit or CanCanCan, enforced on the server.",
     "e": "Start simple: an enum role on User (member, editor, admin). Put the rules in one place, such as a Pundit policy per model, call authorize in every controller action, and scope queries with policy_scope so users only see their own records. Hide UI buttons too, but never rely on hiding alone.",
     "x": [
      "class User < ApplicationRecord\n  enum :role, { member: 0, editor: 1, admin: 2 }\nend\n\nclass ArticlePolicy < ApplicationPolicy\n  def update? = user.admin? || record.author_id == user.id\n  def destroy? = user.admin?\nend\n\ndef update\n  @article = Article.find(params[:id])\n  authorize @article\n  @article.update!(article_params)\nend"
     ],
     "s": [
      "How can you implement role-based authorization in Rails?",
      "How have you implemented authorization in the past?"
     ]
    }
   ]
  ],
  [
   "Web security",
   [
    {
     "q": "How do you secure sensitive data in a Rails application?",
     "l": "B",
     "a": "Keep credentials outside source code, use supported encrypted credentials or a secret manager, restrict access and filter secrets from logs.",
     "e": "Environment variables are a delivery mechanism, not intrinsically encrypted storage. Encryption at rest, access control, redaction, rotation and safe error messages address different risks. Strong Parameters prevents unwanted assignment but does not encrypt data.",
     "x": [
      "bin/rails credentials:edit\n# config.filter_parameters += [:password, :access_token]"
     ]
    },
    {
     "q": "What is CSRF and how does Rails protect against it?",
     "l": "B",
     "a": "CSRF (cross-site request forgery) tricks a logged-in user’s browser into sending a request to your site from another site. Rails prevents it by embedding an authenticity token in forms and the page head and rejecting non-GET requests without a valid token.",
     "e": "protect_from_forgery is enabled by default in ActionController::Base. form_with adds a hidden authenticity_token field, and csrf_meta_tags exposes it for JavaScript requests. Keep GET requests free of side effects, because GET is not checked. API-only controllers that use token auth instead of cookies do not need CSRF tokens.",
     "x": [
      "<%= csrf_meta_tags %>\n\nclass ApplicationController < ActionController::Base\n  protect_from_forgery with: :exception\nend"
     ],
     "s": [
      "Explain what is Cross-Site Request Forgery (CSRF) and how Rails is protected against it?",
      "What is CSRF protection in Rails?",
      "What is CSRF protection and how does Rails implement it?",
      "Explain Cross-Site Request Forgery (CSRF). How is Rails protected against it?",
      "What is CSRF, and how does Rails prevent it?",
      "What is the primary purpose of a CSRF token in a Rails application?"
     ]
    },
    {
     "q": "How do you secure a Rails application? What are the security best practices?",
     "l": "I",
     "a": "Use layered Rails defenses: authenticate users, authorize every resource access, permit mass-assignment fields, bind SQL parameters, escape output, protect cookie-authenticated requests from CSRF and keep dependencies patched.",
     "e": "Strong parameters limit assignment but do not grant authorization. Parameterized Active Record conditions separate SQL structure from values; input validation alone is not SQL-injection protection. Rails escapes ordinary rendered text, but raw/html_safe and unsafe HTML contexts can reintroduce XSS. Use HTTPS and secure cookie settings, reset sessions appropriately at authentication boundaries, filter secrets from logs, and make password storage an established hashing implementation.",
     "x": [
      "user = current_account.users.find(params[:id])\nallowed = params.require(:user).permit(:name)\nuser.update!(allowed)\n# Binding values, not SQL interpolation:\nUser.where(email: params[:email])",
      "# Scope lookup to the authenticated user, then enforce the action policy:\n@post = current_user.posts.find(params[:id])\nauthorize @post\n@post.update!(params.require(:post).permit(:title))"
     ],
     "p": [
      "CSRF tokens protect applicable cookie-authenticated workflows; they do not prove consent or prevent XSS."
     ],
     "s": [
      "What are some security best practices for Ruby on Rails applications?",
      "How do you secure a Rails app?",
      "How do you implement security measures in a Ruby on Rails application?",
      "How does Rails handle security vulnerabilities?",
      "How does Rails handle security, and what are some best practices for securing a Rails application?",
      "What are common security attacks, and how Ruby addresses them?"
     ]
    },
    {
     "q": "What is STS (Strict Transport Security) in Rails?",
     "l": "I",
     "a": "HTTP Strict Transport Security tells supporting browsers to use HTTPS for a host for a declared period. Rails force_ssl can redirect HTTP and configure secure cookies and HSTS.",
     "e": "HSTS is delivered in an HTTPS response header; an initial insecure visit is still relevant unless the browser already knows the policy or uses a preload list. Reverse-proxy TLS termination and forwarded-protocol trust must be configured correctly. Enabling includeSubDomains or preloading requires planning for every affected hostname.",
     "x": [
      "config.force_ssl = true\n# Inspect the actual Strict-Transport-Security response header in deployment."
     ],
     "p": [
      "HSTS does not itself issue or renew a TLS certificate."
     ]
    },
    {
     "q": "How do you prevent SQL injection in Rails?",
     "l": "I",
     "a": "Bind untrusted values through Active Record hash conditions or placeholders, and allowlist SQL identifiers such as sort columns.",
     "e": "Parameter binding protects values, not arbitrary SQL structure. Avoid interpolating params into where, order, select or find_by_sql. LIKE patterns also need escaping when user percent/underscore characters should be literal. Authorization and tenant scoping remain separate requirements.",
     "x": [
      "User.where(email: params[:email])\nUser.where(\"name LIKE ?\", \"%#{User.sanitize_sql_like(params[:q].to_s)}%\")"
     ],
     "s": [
      "How does Rails implement parameterized queries to prevent SQL injection?",
      "How does Rails protect against SQL injection?"
     ]
    },
    {
     "q": "What are strong parameters, and how do they prevent mass-assignment vulnerabilities?",
     "l": "A",
     "a": "Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.",
     "e": "Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.",
     "x": [
      "allowed = params.require(:user).permit(:name, :timezone)\ncurrent_user.update!(allowed)",
      "def user_params\n  params.require(:user).permit(:name, :email)\nend\n# Rails 8+: params.expect(user: [:name, :email])\n# Ownership must still be checked: current_user.posts.find(params[:id])"
     ],
     "p": [
      "Parameter permission is distinct from SQL binding and output escaping.",
      "Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport."
     ],
     "s": [
      "Explain what Strong Parameters are.",
      "What are Strong Parameters?",
      "How does Rails implement strong parameters, and why is it important?",
      "How do you use Strong Parameters?",
      "What are strong parameters? Explain in brief.",
      "What are mass-assignment vulnerabilities and how are they prevented?",
      "What is the primary purpose of strong parameters in Rails?",
      "What is the role of the strong_parameters gem in Rails?"
     ]
    },
    {
     "q": "How do you handle security issues such as XSS (Cross-site Scripting) and CSRF (Cross-site Request Forgery) in Rails?",
     "l": "A",
     "a": "CSRF tricks a browser into sending an unwanted authenticated request; XSS injects script into a trusted page. Rails mitigates them through request forgery protection and output escaping.",
     "e": "Keep state changes off GET, retain authenticity-token verification for cookie-authenticated browser requests, and use secure session cookies. ERB escapes normal string output, but raw/html_safe can undo that protection. SameSite is additional defense and CORS is not a substitute for CSRF protection. A bearer-only API has a different CSRF threat model.",
     "x": [
      "<%= form_with(model: @post) do |f| %>\n  <%= f.text_field :title %>\n<% end %>\n<!-- Normal escaped output: -->\n<%= @post.title %>",
      "User.where(email: params[:email])\n# ERB escapes user text by default:\n# <%= @comment.body %>\n# Allowlist dynamic ordering instead of interpolating SQL."
     ],
     "p": [
      "Use HTTPS and appropriate cookie flags.",
      "Test authorization with another user’s record ID."
     ],
     "s": [
      "Explain your approach to securing a Rails application against common web vulnerabilities like CSRF, XSS, and SQL injection."
     ]
    }
   ]
  ]
 ],
 "rails_interview_jobs": [
  [
   "Background jobs",
   [
    {
     "q": "How do you schedule tasks and recurring jobs in Rails?",
     "l": "B",
     "a": "A delayed job and a recurring business-calendar schedule are different requirements; a one-day delay does not automatically skip weekends or holidays.",
     "e": "Clarify recurrence, business hours, timezone, holidays and daylight-saving rules, then configure the selected scheduler. For a one-off delay use set(wait:) or wait_until:. Solid Queue recurring schedules and cron-backed tools require explicit schedule configuration.",
     "x": [
      "MyJob.set(wait_until: Time.zone.parse(\"2026-11-02 09:00\")).perform_later"
     ],
     "s": [
      "How do you schedule tasks in Rails?",
      "How do weekdays and weekends affect this schedule?"
     ]
    },
    {
     "q": "What is Active Job, and how does it work with different queue backends?",
     "l": "B",
     "a": "Active Job defines jobs and delegates execution to a queue adapter; Sidekiq is one backend, while current Rails also supports database-backed Solid Queue.",
     "e": "Enqueue durable work with perform_later and run workers for the chosen backend. Assume retries and possible repeated delivery: make effects idempotent. MRI threads help concurrent I/O; they do not guarantee parallel execution of CPU-bound Ruby code because of the GVL. Process-based workers can use multiple cores at additional memory cost.",
     "x": [
      "class WelcomeJob < ApplicationJob\n  def perform(user_id)\n    UserMailer.welcome_email(User.find(user_id)).deliver_now\n  end\nend\nWelcomeJob.perform_later(user.id)",
      "class ReportJob < ApplicationJob\n  def perform(report_id)\n    report = Report.find(report_id)\n    return if report.completed?\n    # Generate report; guard durable effects against duplicate execution.\n  end\nend\nReportJob.perform_later(report.id)"
     ],
     "p": [
      "A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.",
      "A queue does not guarantee exactly-once processing.",
      "Enqueue relative to transaction commit and handle deleted/deserialized records deliberately."
     ],
     "s": [
      "What is Active Job?",
      "Explain what ActiveJob is.",
      "When should you use ActiveJob?",
      "What is an Active Job?",
      "What is the purpose of ActiveJob in Rails?",
      "What are the benefits of using `ActiveJob` in Rails, and how does it work with different queueing backends?",
      "What is the ActiveJob framework, and how does it work?"
     ]
    },
    {
     "q": "What is Solid Queue in Rails?",
     "l": "B",
     "a": "Solid Queue is the default Active Job backend in Rails 8. It stores jobs in a database table instead of Redis and runs them with its own worker and dispatcher processes.",
     "e": "It supports queues, priorities, delays, recurring jobs (config/recurring.yml), concurrency limits and retries through Active Job. Using the database removes Redis from the stack, which suits small and medium apps. Very high-throughput systems may still prefer Sidekiq with Redis.",
     "x": [
      "# config/environments/production.rb\nconfig.active_job.queue_adapter = :solid_queue\n\n# config/recurring.yml\nproduction:\n  cleanup:\n    class: CleanupJob\n    schedule: every day at 3am\n\nbin/jobs   # starts the Solid Queue supervisor"
     ]
    },
    {
     "q": "How do you handle background jobs in Rails? Compare Sidekiq, Solid Queue, Resque and Delayed Job.",
     "l": "I",
     "a": "Background jobs move work outside the request-response cycle. Use Rails Active Job with an appropriate backend, or a backend-specific interface such as Sidekiq when its features are needed.",
     "e": "Jobs need idempotent behavior because retries or redelivery may repeat work. Pass durable identifiers, set retry policies and timeouts, monitor queue lag and failures, and coordinate enqueueing with database commit. Sidekiq uses Redis and threads; Solid Queue is a database-backed Rails option. Choose according to workload and operational needs rather than assuming one default for every Rails version.",
     "x": [
      "class ReportJob < ApplicationJob\n  def perform(report_id)\n    report = Report.find(report_id)\n    report.generate_once!\n  end\nend\nReportJob.perform_later(report.id)",
      "class WelcomeJob < ApplicationJob\n  def perform(user_id)\n    UserMailer.welcome_email(User.find(user_id)).deliver_now\n  end\nend\nWelcomeJob.perform_later(user.id)",
      "class ReportJob < ApplicationJob\n  def perform(report_id)\n    report = Report.find(report_id)\n    return if report.completed?\n    # Generate report; guard durable effects against duplicate execution.\n  end\nend\nReportJob.perform_later(report.id)"
     ],
     "p": [
      "A queue does not by itself provide exactly-once business effects.",
      "A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.",
      "A queue does not guarantee exactly-once processing.",
      "Enqueue relative to transaction commit and handle deleted/deserialized records deliberately."
     ],
     "s": [
      "How do you handle background jobs in Ruby applications?",
      "Describe some frameworks developers use for background jobs.",
      "How do you handle background jobs in Rails?",
      "How do you handle background jobs in Rails (e.g., using Sidekiq or ActiveJob)?",
      "How do you manage background jobs in Rails?",
      "How would you handle background jobs in Rails? Tools?",
      "How would you handle background tasks in a Rails application? What are some options, and what are the trade-offs?",
      "What frameworks have you used for background jobs?",
      "How do you handle background jobs in Rails, and what are the pros and cons of different background processing libraries (e.g., Sidekiq, Resque)?"
     ]
    },
    {
     "q": "Explain the role of background jobs and queues in enhancing Ruby application performance.",
     "l": "I",
     "a": "Queues move work outside the request cycle and let workers retry and scale independently. They improve request latency but do not automatically reduce the total work.",
     "e": "Background jobs and queues are used to offload time-consuming or non-essential tasks from the main application process. This enhances user experience by reducing response times. By using gems like Sidekiq or Resque, you can move tasks like sending emails, processing uploaded files, and performing complex calculations to background workers. This allows your application to remain responsive and scalable even when dealing with resource-intensive tasks.",
     "x": [
      "ReceiptJob.perform_later(order.id)"
     ],
     "p": [
      "Jobs must tolerate retries/duplicates; persist intent reliably when losing an enqueue would break business guarantees."
     ]
    },
    {
     "q": "How do you configure background job processing in Rails?",
     "l": "I",
     "a": "Choose an Active Job adapter in the configuration, define jobs with ApplicationJob, and run a separate worker process (bin/jobs for Solid Queue, sidekiq for Sidekiq) alongside the web server.",
     "e": "Set config.active_job.queue_adapter per environment, configure queues and concurrency in the backend’s config file, and run the worker in production through Procfile, systemd, Kamal or your platform. In development, :async runs jobs in-process; in tests, the :test adapter records jobs.",
     "x": [
      "# config/application.rb\nconfig.active_job.queue_adapter = :sidekiq\n\n# Procfile\nweb:    bundle exec puma -C config/puma.rb\nworker: bundle exec sidekiq -C config/sidekiq.yml\n\nclass WelcomeEmailJob < ApplicationJob\n  queue_as :mailers\n  def perform(user_id) = UserMailer.welcome(User.find(user_id)).deliver_now\nend"
     ]
    },
    {
     "q": "How do you handle asynchronous processing in Rails beyond just background jobs?",
     "l": "A",
     "a": "Besides background jobs: run work in threads or with load_async for parallel queries, stream responses, push updates with Action Cable or Turbo Streams, use webhooks and message brokers (Kafka, RabbitMQ, SQS) between services, and use event subscribers.",
     "e": "Choose by need. load_async (Rails 7) runs independent database queries in parallel within one request. Concurrent::Promises or threads can call several slow APIs at once. Message queues decouple services, and ActiveSupport::Notifications lets parts of the app react to events without direct calls.",
     "x": [
      "# Rails 7+: run two queries in parallel\n@posts = Post.recent.load_async\n@stats = Stat.summary.load_async\n\n# Call two APIs concurrently\nrequire \"concurrent\"\nweather = Concurrent::Promises.future { WeatherApi.fetch(city) }\nnews    = Concurrent::Promises.future { NewsApi.fetch(city) }\nrender json: { weather: weather.value!, news: news.value! }"
     ]
    },
    {
     "q": "Explain the concept of background job queues in Rails and how to optimize them.",
     "l": "A",
     "a": "A queue holds jobs until worker processes pick them up. Optimize by using separate queues with priorities, keeping jobs small and idempotent, passing IDs instead of objects, tuning worker concurrency to database connections, and monitoring queue latency.",
     "e": "Put urgent work (password emails) in a high-priority queue so slow work (reports) cannot block it. Split big jobs into batches. Make jobs safe to retry, because failed jobs are retried. Concurrency must not exceed the database pool size. Watch queue size and wait time, and add workers when latency grows.",
     "x": [
      "class ReportJob < ApplicationJob\n  queue_as :low\n  retry_on Net::ReadTimeout, wait: :polynomially_longer, attempts: 5\n\n  def perform(account_id)\n    account = Account.find(account_id)\n    account.orders.find_each { |order| ReportRow.create_from(order) }\n  end\nend\n\n# sidekiq.yml\n:concurrency: 10\n:queues: [critical, default, low]"
     ]
    }
   ]
  ],
  [
   "Caching",
   [
    {
     "q": "How do you cache partials and pages in Rails?",
     "l": "B",
     "a": "Wrap view fragments in cache blocks keyed by the record (fragment caching), nest them for Russian doll caching, and use collection caching with render partial: …, cached: true. Whole-page caching was removed from core Rails.",
     "e": "The cache key includes the record’s id and updated_at, so editing a record creates a new key automatically. With touch: true on belongs_to, updating a child also invalidates the parent’s fragment. Page and action caching now live in separate gems; for full pages, prefer HTTP caching (fresh_when, stale?) or a CDN.",
     "x": [
      "<% cache @article do %>\n  <h1><%= @article.title %></h1>\n  <%= render partial: \"comments/comment\", collection: @article.comments, cached: true %>\n<% end %>\n\nclass Comment < ApplicationRecord\n  belongs_to :article, touch: true\nend"
     ]
    },
    {
     "q": "What caching strategies does Rails offer, and how do you implement caching?",
     "l": "I",
     "a": "Choose cache boundaries from measured expensive work, and define invalidation, key scope, expiry and failure behavior before adding a cache.",
     "e": "Fragment caching stores portions of rendered views; Russian doll caching nests fragments. Parent cache versions must change when relevant children change, often through touch: true. Low-level caching stores application data; HTTP caching uses validators or response headers. Page/action caching are historical extracted features, not simply built-in equivalents of all current caching.",
     "x": [
      "Rails.cache.fetch([\"product\", product.id, product.updated_at], expires_in: 10.minutes) do\n  expensive_summary(product)\nend\n# View:\n<% cache @product do %><%= render @product %><% end %>",
      "<% cache [current_user.role, @product] do %>\n  <%= render @product %>\n<% end %>\n# class Comment < ApplicationRecord\n#   belongs_to :article, touch: true\n# end",
      "Rails.cache.fetch([\"product-summary\", product.cache_key_with_version], expires_in: 5.minutes) do\n  product.summary\nend"
     ],
     "p": [
      "Include tenant/permission dimensions when results differ between users.",
      "Avoid caching live Active Record instances; cache stable values or IDs where practical.",
      "A truthful project answer should include what you personally did and how the result was measured.",
      "Cache storage is not necessarily memory-only. Do not mix personalized/authorized results under a global shared key.",
      "Verification: https://guides.rubyonrails.org/v4.0.0/4_0_release_notes.html"
     ],
     "s": [
      "Explain how you would implement caching in a Rails application. What different caching strategies are available?",
      "What techniques do you use for caching in Rails?",
      "What is caching in Rails, and how do you implement it?",
      "How do you use caching in Rails?",
      "How do you implement caching in Rails?",
      "Describe your experience with different Rails caching techniques (e.g., fragment caching, Russian doll caching) and when you would use each one.",
      "What is caching and how can you implement it in Rails?",
      "Explain the concept of caching in Ruby on Rails. How can caching improve the performance of web applications?"
     ]
    },
    {
     "q": "How does counter_cache work and when would you use it?",
     "l": "I",
     "a": "A counter cache stores an association count on the parent, updated as child records are created or destroyed through supported Active Record operations.",
     "e": "Declare counter_cache on the belongs_to side and add/backfill the parent count column. size can use the counter when the association is unloaded; count generally still queries. Direct SQL and bulk updates can bypass maintenance, so plan reconciliation and concurrent backfill carefully.",
     "x": [
      "class Comment < ApplicationRecord\n  belongs_to :post, counter_cache: true\nend\n# posts.comments_count integer default 0, null: false\npost.comments.size"
     ]
    },
    {
     "q": "What is the Rails.cache object, and how do you use it for caching data?",
     "l": "A",
     "a": "Caching stores reusable results to avoid repeating database, rendering or computation work; choose keys, expiry and invalidation based on the data’s lifetime.",
     "e": "Use fragment/collection caching for views, low-level Rails.cache.fetch for computed values, and HTTP conditional caching where suitable. Include relevant tenant/user permissions in keys when content differs by audience. Russian-doll caching nests fragment caches with dependencies. Page/action caching are historical features extracted from Rails core; they are not universal modern defaults.",
     "x": [
      "Rails.cache.fetch([\"product\", product.id, product.updated_at], expires_in: 10.minutes) do\n  expensive_summary(product)\nend\n# View:\n<% cache @product do %><%= render @product %><% end %>"
     ]
    }
   ]
  ],
  [
   "Action Cable, mailers and files",
   [
    {
     "q": "What are Action Mailers in Rails?",
     "l": "B",
     "a": "Action Mailer builds and delivers email messages using mailer classes and templates; deliver_later integrates delivery with Active Job.",
     "e": "Configure a delivery method/provider, sender identity and URL host, test content and recipient selection, and monitor delivery failures. Modern inbound email processing is handled by Action Mailbox; saying Action Mailer is the complete modern inbound system is misleading.",
     "x": [
      "class UserMailer < ApplicationMailer\n  def welcome_email(user)\n    @user = user\n    mail(to: user.email, subject: \"Welcome\")\n  end\nend\nUserMailer.welcome_email(user).deliver_later"
     ]
    },
    {
     "q": "What is Action Cable, and how do WebSockets work in Rails?",
     "l": "B",
     "a": "Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.",
     "e": "Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.",
     "x": [
      "class OrdersChannel < ApplicationCable::Channel\n  def subscribed\n    stream_for current_user\n  end\nend\nOrdersChannel.broadcast_to(user, { status: \"updated\" })",
      "class NotificationsChannel < ApplicationCable::Channel\n  def subscribed\n    stream_for current_user\n  end\nend\nNotificationsChannel.broadcast_to(user, message: \"Ready\")"
     ],
     "p": [
      "A broadcast is not a durable job queue or a guarantee that every disconnected client receives it."
     ],
     "s": [
      "Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications.",
      "Explain Action Cable in Rails.",
      "What is an Action Cable?",
      "Have you worked with WebSockets in Rails (e.g., ActionCable)?",
      "How do you use WebSockets or ActionCable in Rails to build real-time features?",
      "What are ActionCable and WebSockets in Rails?"
     ]
    },
    {
     "q": "How do you handle file downloads in Rails?",
     "l": "I",
     "a": "Use send_data for generated bytes or send_file for an authorized file, or serve authorized Active Storage blobs through its supported delivery paths.",
     "e": "Check ownership before locating or sending the file and never accept a raw user-supplied filesystem path. Use a safe filename/content type and content-disposition. Large generated exports are often better created in a job and served from object storage.",
     "x": [
      "authorize @report, :download?\nsend_data report_csv, filename: \"report.csv\", type: \"text/csv\", disposition: \"attachment\""
     ]
    },
    {
     "q": "How do you handle file uploads in Rails (Active Storage, CarrierWave) securely?",
     "l": "A",
     "a": "Active Storage attaches files to Active Record models and delegates storage to a configured service, such as local disk or S3.",
     "e": "Install its tables, configure the storage service, declare has_one_attached or has_many_attached, and authorize upload/download operations. Image variants use an image processor such as libvips. Validate size and actual content, and use safe serving/scanning policies. Rails 8.1 removed the built-in Azure service; older lists of supported services need version context.",
     "x": [
      "bin/rails active_storage:install\nbin/rails db:migrate\n# In User: has_one_attached :avatar\nuser.avatar.attach(io: File.open(\"avatar.png\"), filename: \"avatar.png\")\nuser.avatar.variant(resize_to_limit: [100, 100])",
      "class User < ApplicationRecord\n  has_one_attached :avatar\nend\nuser.avatar.attach(io: File.open(\"avatar.png\"), filename: \"avatar.png\", content_type: \"image/png\")"
     ],
     "p": [
      "Signed blob URLs are not a complete application authorization policy.",
      "Direct uploads still require server-side validation and cleanup of unattached blobs."
     ],
     "s": [
      "How do you handle file uploads and storage in a Rails application, and what are some considerations for security and scalability?",
      "Do you know about Activestorage in Ruby on Rails and How can you use this?",
      "Explain the purpose and use of Rails' Active Storage service.",
      "How do you handle file uploads in Rails (e.g., using ActiveStorage or CarrierWave)?",
      "How do you handle file uploads in Rails?",
      "How do you handle file attachments in Rails?",
      "How do you securely handle file uploads in Rails?",
      "How do you handle file uploads in Rails? What gems or techniques would you use for image processing?"
     ]
    }
   ]
  ]
 ],
 "rails_interview_testing": [
  [
   "Testing",
   [
    {
     "q": "What are RSpec and Minitest, and how does Rails support testing?",
     "l": "B",
     "a": "RSpec provides examples, expectations, matchers and hooks to describe Ruby behavior; rspec-rails supplies Rails integrations.",
     "e": "RSpec is a widely used testing framework in the Ruby ecosystem. It provides a domain-specific language (DSL) for writing human-readable tests in a behavior-driven development (BDD) style. RSpec enables developers to define expectations about how code should behave and allows for clear documentation of desired functionality. Its powerful matches and hooks simplify the process of testing Ruby code and ensure more robust and maintainable applications.",
     "x": [
      "RSpec.describe \"multiplication\" do\n  it(\"doubles\") { expect(3 * 2).to eq(6) }\nend",
      "RSpec.describe \"integer addition\" do\n  it \"adds values\" do\n    expect(2 + 3).to eq(5)\n  end\nend",
      "test \"rejects a blank title\" do\n  post = Post.new(title: \"\")\n  assert_not post.valid?\n  assert_includes post.errors[:title], \"can’t be blank\"\nend"
     ],
     "p": [
      "Prefer observable behavior and realistic failure cases; avoid brittle implementation-detail mocks.",
      "RSpec is not a built-in part of Rails.",
      "Distribution of Minitest as a bundled gem depends on Ruby version; declare test dependencies explicitly."
     ],
     "s": [
      "What is RSpec and how is it used for testing in Ruby?",
      "How do you write tests in Ruby with RSpec or Minitest?",
      "How does Rails support testing, and what testing frameworks are commonly used?",
      "How do you write tests in Rails applications?",
      "How do you test a Rails app?",
      "What is the RSpec framework and how do you use it for testing?"
     ]
    },
    {
     "q": "How do you mock external APIs in tests?",
     "l": "B",
     "a": "Do not call the real API in tests. Stub HTTP requests with WebMock, record and replay real responses with VCR, or inject a fake client object into the code under test.",
     "e": "WebMock blocks real network calls and lets you define canned responses, including errors and timeouts, so you can test failure handling. VCR saves real responses to cassette files. Wrapping the API in your own client class makes it easy to replace with a double in unit tests.",
     "x": [
      "# spec/services/weather_spec.rb (RSpec + WebMock)\nstub_request(:get, \"https://api.weather.test/today?city=Pune\")\n  .to_return(status: 200, body: { temp: 31 }.to_json, headers: { \"Content-Type\" => \"application/json\" })\n\nexpect(WeatherService.new.today(\"Pune\")).to eq(31)\n\nstub_request(:get, /api.weather.test/).to_timeout\nexpect { WeatherService.new.today(\"Pune\") }.to raise_error(WeatherService::Unavailable)"
     ]
    },
    {
     "q": "What are some best practices for writing Rails tests?",
     "l": "B",
     "a": "Test behavior, not implementation; keep each test focused and independent; use realistic but minimal data; test failure paths; avoid real external calls; and keep the suite fast so it is run often.",
     "e": "Follow arrange-act-assert. Name tests by the behavior they check. Prefer many fast model and request tests and a few system tests for critical flows. Do not share state between tests, avoid sleep in browser tests, and fix or delete flaky tests quickly. Run the suite in CI on every pull request.",
     "p": [
      "A maintainable suite is one that fails only when behavior breaks and explains why."
     ],
     "s": [
      "What’s your strategy for writing maintainable tests?"
     ]
    },
    {
     "q": "What are the differences between unit, functional, and integration tests in Rails?",
     "l": "B",
     "a": "Unit tests check one class or method in isolation (model tests). Functional tests check one controller’s actions. Integration tests check a flow across several controllers, routing and the full stack.",
     "e": "In modern Rails, controller (functional) tests are largely replaced by request tests (ActionDispatch::IntegrationTest / RSpec request specs), which go through routing and middleware. System tests add a real browser through Capybara to test JavaScript and the UI.",
     "x": [
      "# unit (model)\nassert_not User.new.valid?\n\n# request / integration\npost articles_path, params: { article: { title: \"Hi\" } }\nassert_redirected_to article_path(Article.last)\n\n# system (browser)\nvisit new_article_path\nfill_in \"Title\", with: \"Hi\"\nclick_on \"Create Article\"\nassert_text \"Article was successfully created\""
     ],
     "s": [
      "Explain what functional testing is:"
     ]
    },
    {
     "q": "What is testing in the context of Ruby on Rails? Why is it important?",
     "l": "B",
     "a": "Rails includes Minitest support; RSpec is an alternative test framework. Choose tests that check meaningful behavior at suitable boundaries.",
     "e": "Use fast unit tests for business rules, request tests for HTTP contracts and authorization, integration tests for collaboration, and a smaller set of system tests for critical browser workflows. Request tests do not by themselves drive a browser. Isolate external services using controlled substitutes and test failure paths.",
     "x": [
      "test \"rejects a missing title\" do\n  article = Article.new(title: nil)\n  assert_not article.valid?\n  assert_includes article.errors[:title], \"can't be blank\"\nend"
     ],
     "p": [
      "Use your own experience when answering a behavioral interview prompt."
     ]
    },
    {
     "q": "What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)?",
     "l": "B",
     "a": "Commonly: RSpec or Minitest as the framework, FactoryBot for test data, Capybara for browser tests, shoulda-matchers for one-line model checks, WebMock or VCR for HTTP stubbing, SimpleCov for coverage and Faker for sample data.",
     "e": "Say which ones you actually used and why. For example: RSpec with FactoryBot for readable specs, Capybara with Selenium or Cuprite for system tests, and WebMock to keep tests offline. Older stacks used Cucumber for plain-language acceptance tests and FactoryGirl, which was renamed FactoryBot in 2017.",
     "s": [
      "Describe your experience with different Rails testing frameworks (e.g., RSpec, Minitest) and your preferred testing strategies.",
      "What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber."
     ]
    },
    {
     "q": "How do you test models in Rails?",
     "l": "I",
     "a": "Test the model’s own behavior: validations, scopes, custom methods and callbacks, using a real test database. Rails uses ActiveSupport::TestCase (Minitest) or RSpec model specs.",
     "e": "Build records with fixtures or FactoryBot, then assert the outcome: invalid records have the right errors, scopes return the right rows, methods compute correct values. Avoid testing Rails itself (that belongs_to works); test your rules.",
     "x": [
      "class UserTest < ActiveSupport::TestCase\n  test \"requires an email\" do\n    user = User.new(email: \"\")\n    assert_not user.valid?\n    assert_includes user.errors[:email], \"can't be blank\"\n  end\n\n  test \"active scope\" do\n    assert_includes User.active, users(:asha)\n    assert_not_includes User.active, users(:banned)\n  end\nend"
     ]
    },
    {
     "q": "What are fixtures in Ruby on Rails?",
     "l": "I",
     "a": "Fixtures are YAML files in test/fixtures that define sample records. Rails loads them into the test database before each test, and you access them by name, such as users(:asha).",
     "e": "They are fast because they are inserted once and wrapped in a transaction per test. Fixtures can reference each other by label for associations. The alternative is FactoryBot, which builds records in code per test and is more flexible but slower.",
     "x": [
      "# test/fixtures/users.yml\nasha:\n  name: Asha\n  email: asha@example.com\n\nbanned:\n  name: Ravi\n  email: ravi@example.com\n  banned: true\n\n# in a test\nassert users(:asha).active?"
     ]
    },
    {
     "q": "How do you test background jobs or mailers in Rails?",
     "l": "I",
     "a": "Use the :test queue adapter with ActiveJob::TestHelper to assert that jobs were enqueued (assert_enqueued_with / have_enqueued_job), and perform_enqueued_jobs to run them. For mailers, assert on ActionMailer::Base.deliveries or use assert_emails.",
     "e": "Test the job’s perform method directly as a unit, and separately test that the controller or model enqueues it with the right arguments. Mailer tests check the subject, recipient and body of the generated mail.",
     "x": [
      "class SignupTest < ActionDispatch::IntegrationTest\n  include ActiveJob::TestHelper\n\n  test \"sends welcome email\" do\n    assert_enqueued_with(job: ActionMailer::MailDeliveryJob) do\n      post users_path, params: { user: { email: \"a@b.com\", password: \"secret123\" } }\n    end\n\n    perform_enqueued_jobs\n    assert_equal [\"a@b.com\"], ActionMailer::Base.deliveries.last.to\n  end\nend"
     ]
    },
    {
     "q": "How do you test a Rails application with integration tests, and what tools would you use?",
     "l": "A",
     "a": "Integration (request) tests send real HTTP requests through routing, middleware and controllers and check the response; system tests drive a browser through Capybara. Use ActionDispatch::IntegrationTest / ApplicationSystemTestCase, or RSpec request and system specs.",
     "e": "Request tests are fast and good for APIs and redirects. System tests are slower but test JavaScript, forms and the full user flow, so keep them for critical paths such as sign-up and checkout.",
     "x": [
      "class CheckoutTest < ApplicationSystemTestCase\n  test \"user buys a product\" do\n    sign_in users(:asha)\n    visit product_path(products(:book))\n    click_on \"Add to cart\"\n    click_on \"Checkout\"\n    assert_text \"Thank you for your order\"\n  end\nend"
     ]
    }
   ]
  ],
  [
   "Debugging, logging and monitoring",
   [
    {
     "q": "How do you debug a Rails application?",
     "l": "I",
     "a": "Reproduce the issue, inspect the backtrace and logs, and use a debugger to verify the state at the failing operation.",
     "e": "Modern generated CRuby Rails applications include the debug gem in development/test; binding.break or debugger enters it. Older sources may use byebug or pry. Correlate request IDs and external-service events, write a regression test, and keep interactive breakpoints out of live production traffic.",
     "x": [
      "Rails.logger.info(event: \"order_created\", order_id: order.id, request_id: request.request_id)\n# config.filter_parameters += [:password, :token]",
      "def show\n  @article = Article.find(params[:id])\n  binding.break # development debugging with debug loaded\nend"
     ],
     "p": [
      "Never log secrets or full sensitive request bodies."
     ],
     "s": [
      "What tools do you use for debugging Rails applications?",
      "How do you debug a Rails app?",
      "Describe how you would debug a Rails application. What tools and techniques do you find most helpful?"
     ]
    },
    {
     "q": "How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event?",
     "l": "A",
     "a": "ActiveSupport::Notifications is Rails’ instrumentation API: code publishes named events with a payload and duration, and subscribers receive them. Rails itself publishes events such as sql.active_record and process_action.action_controller.",
     "e": "Monitoring tools (New Relic, Skylight, lograge) are built on it. You can subscribe to log slow queries, send metrics, or instrument your own code. Keep subscribers fast, because they run in the request thread.",
     "x": [
      "ActiveSupport::Notifications.subscribe(\"sql.active_record\") do |event|\n  if event.duration > 100\n    Rails.logger.warn(\"Slow SQL (#{event.duration.round}ms): #{event.payload[:sql]}\")\n  end\nend\n\nActiveSupport::Notifications.instrument(\"payment.charge\", order_id: order.id) do\n  gateway.charge(order)\nend"
     ]
    },
    {
     "q": "How do you handle performance monitoring and alerting in a Rails application, and what tools do you use for this purpose?",
     "l": "A",
     "a": "Use an APM tool (New Relic, Datadog, Scout, Skylight or AppSignal) to track response times, slow endpoints, slow queries and error rates, and set alerts on thresholds such as p95 latency, error rate and job queue latency.",
     "e": "Track the four golden signals: latency, traffic, errors and saturation (CPU, memory, database connections). Add uptime checks and a health endpoint (/up in Rails 7.1+). Alerts should go to the on-call channel and be actionable, not noisy.",
     "s": [
      "How do you ensure a Rails application is production-ready, with proper monitoring, error handling, and performance tuning"
     ]
    },
    {
     "q": "Explain how Rails handles logging.",
     "l": "A",
     "a": "Rails logs through Rails.logger to log/<environment>.log (and stdout in containers). Each request logs its controller, parameters, SQL queries, rendering time and status. Log level, format and tagging are configurable.",
     "e": "Development logs at :debug, showing every SQL query. Production usually logs at :info, with filter_parameters hiding passwords and tokens. Use log tags (request_id) to follow one request, structured JSON logs (lograge) for log tools, and Rails.logger.info in your own code.",
     "x": [
      "# config/environments/production.rb\nconfig.log_level = :info\nconfig.log_tags = [:request_id]\n\nRails.logger.info(\"Payment captured order=#{order.id}\")\n\n# Started GET \"/articles/1\" for 127.0.0.1\n# Processing by ArticlesController#show as HTML\n#   Article Load (0.3ms) SELECT ...\n# Completed 200 OK in 12ms"
     ],
     "s": [
      "Mention the log that has to be seen to report errors in Ruby Rails?"
     ]
    },
    {
     "q": "How do you handle error handling and logging in production-level Rails applications?",
     "l": "A",
     "a": "Rescue expected errors where you can respond to them (rescue_from for RecordNotFound, validation failures), let unexpected errors reach an error tracker such as Sentry, Honeybadger or Rails.error, and keep structured, filtered production logs with a request ID.",
     "e": "Show users friendly error pages or JSON error bodies, never stack traces. Report exceptions with context (user, params without secrets). Use log levels properly, aggregate logs centrally (ELK, Datadog), set alerts on error rate, and add a regression test for every production bug you fix.",
     "x": [
      "class ApplicationController < ActionController::Base\n  rescue_from ActiveRecord::RecordNotFound, with: :not_found\n\n  private\n\n  def not_found = render file: Rails.public_path.join(\"404.html\"), status: :not_found\nend\n\n# Rails 7+ error reporter\nRails.error.handle(context: { order_id: order.id }) do\n  PaymentGateway.capture(order)\nend"
     ],
     "s": [
      "How do you monitor and log a Rails application in production?"
     ]
    }
   ]
  ],
  [
   "Configuration",
   [
    {
     "q": "What is the primary purpose of config.autoload_paths in a Rails application's config/application.rb file?",
     "l": "B",
     "a": "Option 1: To specify directories that Rails should automatically load classes and modules from.",
     "e": "The correct choice is To specify directories that Rails should automatically load classes and modules from. The other choices describe different Rails components or reverse the behavior being asked about."
    },
    {
     "q": "What is the purpose of the application.rb file?",
     "l": "B",
     "a": "config/application.rb defines the application class and the settings shared by every environment, such as time zone, default locale, autoload paths, generators and the Rails defaults version.",
     "e": "It loads Rails and the gems from the Gemfile (Bundler.require). Environment-specific settings go in config/environments/*.rb, which override application.rb. environment.rb then initializes the app (Rails.application.initialize!).",
     "x": [
      "module Shop\n  class Application < Rails::Application\n    config.load_defaults 8.0\n    config.time_zone = \"Asia/Kolkata\"\n    config.i18n.default_locale = :en\n    config.autoload_lib(ignore: %w[assets tasks])\n  end\nend"
     ],
     "s": [
      "What is the purpose of application.rb?",
      "What is the purpose of environment.rb in Rails?"
     ]
    },
    {
     "q": "Explain what initializers are in Ruby on Rails.",
     "l": "I",
     "a": "Initializers are Ruby files in config/initializers that run once when the application boots, after the framework and gems load. They configure gems and set application-wide options.",
     "e": "Typical contents: configuring Sidekiq, setting up an API client, CORS, inflections or filter_parameters. They run in alphabetical order. Changes need a server restart, because they only run at boot.",
     "x": [
      "# config/initializers/stripe.rb\nStripe.api_key = Rails.application.credentials.dig(:stripe, :secret_key)\n\n# config/initializers/filter_parameter_logging.rb\nRails.application.config.filter_parameters += [:password, :token]"
     ],
     "s": [
      "What are initializers in Rails?",
      "What is a Rails initializer?",
      "Explain the Rails initialization process."
     ]
    },
    {
     "q": "What are the Rails environments, and how do you manage configuration across them?",
     "l": "I",
     "a": "Rails normally has development, test, and production environments, selected by RAILS_ENV and configured under config/environments.",
     "e": "Separate database configuration, credentials and external service endpoints per environment. Development favors reloading and useful diagnostics; test runs controlled automated checks; production favors efficient stable serving. Isolation and backups are operational choices, not automatic guarantees simply because an environment is named production.",
     "x": [
      "RAILS_ENV=test bin/rails runner 'puts Rails.env'",
      "RAILS_ENV=production bin/rails runner \"puts Rails.env\"",
      "RAILS_ENV=production bin/rails runner 'puts Rails.env'\n# config/environments/production.rb\n# config/database.yml"
     ],
     "p": [
      "The shown shell assignment syntax is POSIX; use the host shell’s equivalent on Windows.",
      "Do not run destructive maintenance against the wrong environment."
     ],
     "s": [
      "Name the three default environments in Rails.",
      "What are Rails Environments, and how do they work?",
      "What are Rails Environments?",
      "Explain what Rails environments are (development, test, production).",
      "What are the different ways to manage configuration settings across environments in Rails?",
      "What is the difference between development and production environments?",
      "How do you handle different environments (e.g., development, test, production) in a Rails application?",
      "How do you manage multiple environments (development, test, production) in Rails?"
     ]
    },
    {
     "q": "In a Ruby on Rails application, which file is primarily responsible for configuring settings specific to the 'production' environment?",
     "l": "A",
     "a": "Option 2: config/environments/production.rb",
     "e": "The correct choice is config/environments/production.rb The other choices describe different Rails components or reverse the behavior being asked about."
    }
   ]
  ],
  [
   "Deployment",
   [
    {
     "q": "Describe the process of deploying a Rails application to a production environment.",
     "l": "I",
     "a": "Deploy a tested artifact with configured secrets, database access, asset handling, web/job processes, health checks and a rollback plan.",
     "e": "A release should apply compatible schema changes, start the correct processes, and verify readiness before sending traffic. Tools such as containers, Kamal or Capistrano automate different approaches. Zero-downtime changes need old and new application versions to tolerate the schema throughout rollout.",
     "x": [
      "1. Add a nullable replacement column.\n2. Deploy code compatible with both schemas.\n3. Backfill in batches and verify.\n4. Enforce constraints, switch reads, and remove the old column in a later release.",
      "RAILS_ENV=production bin/rails assets:precompile\nRAILS_ENV=production bin/rails db:migrate\n# Start the configured Puma and worker processes via the deployment platform."
     ],
     "p": [
      "Precompile and migration placement vary by platform.",
      "Rollback code cannot necessarily undo a destructive data migration.",
      "A truthful project answer should include what you personally did and how the result was measured."
     ],
     "s": [
      "How do you deploy a Rails app?",
      "How do you deploy a Rails application?",
      "Describe your experience with different deployment strategies for Rails applications (e.g., Capistrano, Docker, Kubernetes)."
     ]
    },
    {
     "q": "How do you run database migrations safely on a busy production app?",
     "l": "I",
     "a": "Make every change backward compatible with the code that is still running: add before you remove, deploy in steps, backfill data in batches, and avoid long table locks.",
     "e": "Typical sequence to rename a column: add the new column, write to both, backfill in batches, switch reads, then drop the old column in a later deploy (marking it ignored_columns first). Create indexes concurrently on PostgreSQL, add NOT NULL only after the backfill, and use the strong_migrations gem to catch dangerous operations.",
     "x": [
      "class AddIndexToOrdersStatus < ActiveRecord::Migration[8.0]\n  disable_ddl_transaction!\n  def change\n    add_index :orders, :status, algorithm: :concurrently\n  end\nend\n\nclass User < ApplicationRecord\n  self.ignored_columns += [\"old_name\"]  # before dropping the column\nend"
     ],
     "s": [
      "During deployment, a new feature requires database changes without affecting existing production data. How would you handle this?",
      "What are the different ways to handle database migrations in a high-traffic Rails application?"
     ]
    },
    {
     "q": "How do you configure asset precompilation in production?",
     "l": "I",
     "a": "Run bin/rails assets:precompile during the build or deploy. It compiles assets into public/assets with fingerprinted names, which a web server or CDN then serves with long cache headers.",
     "e": "Kamal, Capistrano, Heroku and the Rails Dockerfile run it automatically. Set config.asset_host for a CDN and make sure RAILS_ENV=production. With jsbundling or cssbundling, precompile also runs the JavaScript/CSS build first.",
     "x": [
      "RAILS_ENV=production SECRET_KEY_BASE_DUMMY=1 bin/rails assets:precompile\n\n# config/environments/production.rb\nconfig.asset_host = ENV[\"CDN_HOST\"]\nconfig.public_file_server.enabled = true  # when no nginx serves files"
     ]
    },
    {
     "q": "Explain the concept of continuous integration and continuous deployment (CI/CD).",
     "l": "I",
     "a": "CI checks integrated changes automatically. Continuous delivery keeps releases deployable with an approval step; continuous deployment releases passing changes automatically.",
     "e": "Continuous integration runs automated validation on integrated changes. Continuous delivery keeps tested releases ready for an explicit release decision; continuous deployment releases automatically.",
     "x": [
      "# Example pipeline: install locked dependencies -> unit tests -> integration tests -> build -> deploy"
     ],
     "p": [
      "Use backward-compatible migrations and a rollback plan. Delivery and deployment are distinct meanings of CD."
     ]
    }
   ]
  ]
 ],
 "rails_interview_scenarios": [
  [
   "Performance",
   [
    {
     "q": "Your Rails application becomes slow after adding a dashboard that displays users, their orders, and payment history. How would you identify and fix the issue?",
     "l": "B",
     "a": "Measure first with the logs, rack-mini-profiler or an APM, then fix what you find: usually N+1 queries (add includes), missing indexes, loading too many rows (paginate, select fewer columns) and repeated calculations (counter caches, caching).",
     "e": "A dashboard listing users, orders and products typically triggers one query per user and per order. Eager load the associations, compute totals with SQL (sum, group, count) instead of Ruby loops, add indexes on foreign keys, paginate, and cache expensive fragments. Confirm with the query count and response time before and after.",
     "x": [
      "# Before: N+1\n@users = User.all\n# view: user.orders.each { |o| o.product.name }\n\n# After\n@users = User.includes(orders: :product).order(:name).page(params[:page])\n@totals = Order.group(:user_id).sum(:amount)"
     ]
    },
    {
     "q": "How do you find and fix performance problems in a slow Rails application?",
     "l": "I",
     "a": "Measure the bottleneck before changing the application: inspect latency distributions, traces, slow queries, allocation and queue metrics.",
     "e": "For database work, inspect actual SQL and query plans, fix N+1 patterns, and add indexes justified by query predicates and order. Consider bounded batches, less selected data, caching or background jobs only after understanding the workload. Re-measure the original case and watch regressions under representative concurrency.",
     "x": [
      "users = User.preload(:posts).where(active: true).limit(100)\n# Inspect generated SQL and query plans for the database in use.\n# Compare p95 latency, query count and allocated bytes before/after.",
      "<% cache [current_user.role, @product] do %>\n  <%= render @product %>\n<% end %>\n# class Comment < ApplicationRecord\n#   belongs_to :article, touch: true\n# end",
      "User.includes(orders: :payments).limit(50)\n# Capture request duration, SQL duration/count and allocation count before/after."
     ],
     "p": [
      "An index adds write/storage cost and is not guaranteed to improve every query.",
      "Choose alert thresholds from service objectives and avoid logging secrets.",
      "Include tenant/permission dimensions when results differ between users.",
      "Avoid caching live Active Record instances; cache stable values or IDs where practical.",
      "RSS growth can be fragmentation, allocator behavior or native memory, not only unreachable Ruby objects. GC cannot free still-reachable objects.",
      "Memoization needs bounded keys and invalidation; page caching is not a modern Rails core feature. Background jobs shift latency and require retry-safe behavior."
     ],
     "s": [
      "Explain how you would optimize a slow-performing Rails application. What tools and techniques would you use?",
      "How would you optimize a slow Rails application, focusing on database query optimization and caching strategies?",
      "How do you analyze performance issues in a Rails application?",
      "How do you optimize Rails app performance?",
      "How would you optimize the performance of a Ruby application?",
      "How would you profile and debug a performance bottleneck in a Rails app?"
     ]
    },
    {
     "q": "How does Rails handle Concurrent Requests, and what challenges does it face?",
     "l": "I",
     "a": "Servers such as Puma can use threads and processes to handle concurrent requests. The application must protect shared memory and database invariants explicitly.",
     "e": "Set database pools and external-client pools to match realistic worker/thread concurrency. Avoid mutable class/global request state, guard shared in-memory structures and use database constraints/atomic updates for cross-process races. CPU-bound Ruby threads in CRuby are limited by the GVL, while I/O can overlap.",
     "n": [
      "Example: decrement inventory with a conditional UPDATE or lock the inventory row inside a transaction; a Ruby Mutex in one worker does not protect other worker processes."
     ],
     "p": [
      "Measure queueing, connection waits, CPU, memory and tail latency rather than simply increasing thread count."
     ]
    },
    {
     "q": "A Ruby service is slow or misbehaving in production. Walk through your approach.",
     "l": "A",
     "a": "Start with the user-visible symptom and evidence, isolate whether time or failure comes from database, external I/O, CPU, allocation/GC or contention, then verify a focused fix.",
     "e": "Compare recent deploy/configuration changes, request traces, error rates and latency distributions. Use a sampling profiler on representative work; inspect query plans and timeouts before guessing. Reproduce a controlled case, protect sensitive diagnostics, fix the narrow cause and confirm correctness plus the original metric under comparable conditions.",
     "n": [
      "Example: trace a slow endpoint, observe 201 SQL queries for 100 rows, introduce bounded eager loading, and compare query count, p95 latency and memory before/after."
     ],
     "p": [
      "Worker restarts may stabilize an incident while investigation continues, but do not establish root cause."
     ]
    },
    {
     "q": "How do you manage large data imports or exports in Rails?",
     "l": "A",
     "a": "Process data in batches and stream it: read CSV files row by row, insert with insert_all/upsert_all in chunks, export with find_each and a streamed response, and run large jobs in the background with progress tracking.",
     "e": "Never load a whole file or table into memory. Validate rows and collect errors instead of failing the whole import, make the import idempotent (upsert on a unique key), and wrap each batch in a transaction. For exports, stream CSV with an Enumerator or generate the file in a job and email a download link.",
     "x": [
      "require \"csv\"\n\nCSV.foreach(path, headers: true).each_slice(1_000) do |rows|\n  Product.upsert_all(\n    rows.map { |r| { sku: r[\"sku\"], name: r[\"name\"], price: r[\"price\"] } },\n    unique_by: :sku\n  )\nend"
     ]
    },
    {
     "q": "How do you deal with memory management and performance issues in Rails?",
     "l": "A",
     "a": "Find what allocates or retains memory (memory_profiler, derailed_benchmarks, APM memory graphs), then reduce it: process records in batches, avoid loading large collections, use pluck/select, and free large objects. Tune the server and allocator if needed.",
     "e": "Common causes of memory growth in Rails: Model.all.each on large tables, caching unbounded data in class variables or constants, large JSON payloads and gems that leak. Use find_each, stream exports, set Puma workers/threads to fit RAM, use jemalloc or MALLOC_ARENA_MAX=2, and restart workers that exceed a limit (puma_worker_killer) as a safety net.",
     "x": [
      "# Bad: loads every row into memory\nUser.all.each { |u| u.update!(score: u.compute_score) }\n\n# Better\nUser.find_each(batch_size: 1_000) { |u| u.update!(score: u.compute_score) }\nUser.where(active: true).pluck(:email)  # strings, not objects"
     ],
     "s": [
      "How do you identify and resolve memory leaks in a Ruby application?"
     ]
    },
    {
     "q": "Explain how you would implement a search engine optimization (SEO) strategy in a Rails application.",
     "l": "A",
     "a": "Implementing an SEO strategy in a Rails application involves several key steps. First, optimize your routes to be SEO-friendly (e.g., /products/:id/:name instead of /products/:id). Utilize gems like friendly_id for creating slugs from model attributes. Ensure your Rails views include relevant meta tags (title, description, keywords) that accurately reflect the page content. Consider using a gem like meta-tags to easily manage these.",
     "e": "Second, focus on creating high-quality, relevant content. Use semantic HTML5 tags (e.g., <article>, <section>) and ensure your site is mobile-responsive. Implement proper heading structures (H1-H6) and use alt text for images. Generate a sitemap.xml and submit it to search engines. You can use a gem like sitemap_generator. Finally, monitor your website's performance using tools like Google Analytics and Google Search Console to identify areas for improvement. Regularly analyze keyword rankings and traffic to refine your strategy.",
     "n": [
      "Implementing an SEO strategy in a Rails application involves several key steps. First, optimize your routes to be SEO-friendly (e.g., /products/:id/:name instead of /products/:id). Utilize gems like friendly_id for creating slugs from model attributes. Ensure your Rails views include relevant meta tags (title, description, keywords) that accurately reflect the page content. Consider using a gem like meta-tags to easily manage these.\n\nSecond, focus on creating high-quality, relevant content. Use semantic HTML5 tags (e.g., <article>, <section>) and ensure your site is mobile-responsive. Implement proper heading structures (H1-H6) and use alt text for images. Generate a sitemap.xml and submit it to search engines. You can use a gem like sitemap_generator. Finally, monitor your website's performance using tools like Google Analytics and Google Search Console to identify areas for improvement. Regularly analyze keyword rankings and traffic to refine your strategy."
     ]
    }
   ]
  ],
  [
   "Scalability and architecture",
   [
    {
     "q": "What are the best practices for structuring a large Rails application?",
     "l": "B",
     "a": "Organize a large Rails application around cohesive responsibilities and stable boundaries; use services/presenters/engines only when they solve a concrete complexity problem.",
     "e": "Service objects and engines are recommendations, not mandatory layers; excessive abstraction can increase navigation and coupling.",
     "x": [
      "# Workflow: controller -> explicit checkout service -> models/transaction -> reliable job/event delivery.",
      "app/services/checkout.rb\napp/queries/recent_orders.rb\napp/policies/order_policy.rb\napp/models/order.rb"
     ],
     "p": [
      "Service objects and engines are recommendations, not mandatory layers; excessive abstraction can increase navigation and coupling."
     ],
     "s": [
      "How would you structure a large Rails codebase with many models, controllers, and views?",
      "How do you structure a large Rails application (e.g., modularization, boundaries)?"
     ]
    },
    {
     "q": "How do you approach working with legacy Rails codebases, and what are some strategies for refactoring and modernizing them?",
     "l": "A",
     "a": "Stabilize a legacy application with tests and observability, then make small reversible upgrades and refactorings.",
     "e": "Identify business-critical paths and operational dependencies first. Add characterization tests, address security exposure, upgrade Ruby/Rails in supported steps, and remove deprecated APIs before crossing versions. Use feature flags or incremental replacement where a large rewrite would increase risk.",
     "x": [
      "# Typical loop:\n# reproduce -> characterization test -> small change -> full relevant checks\n# review deprecations -> deploy -> observe -> continue"
     ],
     "p": [
      "Version upgrades need a tested compatibility plan, not just changing a Gemfile number."
     ]
    },
    {
     "q": "Ticket Sales Site",
     "l": "A",
     "a": "Model events, performances, seats, inventory holds, orders and payments; enforce seat ownership atomically in the database.",
     "e": "Scope requirements first: reserved seats versus general admission, purchase limits, resale, payment-provider behavior and peak sale traffic. For reserved seats use a unique inventory identity such as (performance_id, seat_id), transactional conditional updates or row locks, expiring holds, and an order state machine. Use idempotency keys for checkout and payment callbacks. A durable outbox/job processes follow-up work after commit; signed webhooks reconcile external payment state without pretending the database and provider share one transaction. Rate limits, a waiting room, caching of read-only event data and load shedding protect scarce inventory. Measure hold contention, queue lag, payment failure and reconciliation, and test simultaneous attempts for the final seat.",
     "x": [
      "# 41. Ticket Sales Site is a design problem; see the detailed record, not a\n# misleading standalone implementation with no real transaction/lock backend.\n\n# Example usage:\nInventory.transaction do\n  seat = Inventory.lock.find_by!(performance_id: performance.id, seat_id: seat_id)\n  raise SoldOut unless seat.available?\n  seat.update!(status: \"held\", hold_token: token, held_until: 5.minutes.from_now)\nend\n# Schematic Rails code; add a real state machine, constraints and payment workflow."
     ],
     "p": [
      "Do not hold a database transaction open while calling a payment API; use durable states and reconciliation."
     ]
    },
    {
     "q": "How do you design and scale a Rails application for high traffic?",
     "l": "A",
     "a": "Scale a Rails application by measuring bottlenecks, keeping request workers stateless, optimizing database access and moving appropriate work to reliable background processing.",
     "e": "Use representative load tests and latency/error/queue metrics first. Index and paginate queries, prevent N+1s, cache stable data with invalidation rules and bound external calls. Scale application workers within database-connection and memory budgets; partition storage or services only when measured limits justify the complexity.",
     "x": [
      "Load balancer → multiple Puma processes → database/shared cache\nBackground queues → separate worker processes\nUploads → shared object storage"
     ],
     "n": [
      "Example: replace 101 queries for 100 posts/authors with a bounded page using Post.includes(:author), then compare p95 latency, SQL time and allocated objects."
     ],
     "p": [
      "Kubernetes or microservices is not a prerequisite for a scalable Rails application."
     ],
     "s": [
      "How do you design a scalable Ruby on Rails application?",
      "How would you design a Rails application for high traffic?",
      "How do you ensure scalability in Rails applications?",
      "How do you scale a Rails application across multiple servers?",
      "How do you scale a Rails application to handle increased traffic?"
     ]
    },
    {
     "q": "How would you implement a multi-tenancy architecture in a Rails application, and what are the considerations for data isolation and scalability?",
     "l": "A",
     "a": "Multi-tenancy can isolate customers by database, schema, or tenant-scoped rows; choose based on isolation, cost, operations and scale.",
     "e": "In a shared database, resolve the tenant from trusted authentication or host context, scope every access, include tenant IDs in relevant unique constraints, and test cross-tenant access. Background jobs and caches also need tenant context. A conditional default_scope that disappears when tenant context is missing fails open.",
     "x": [
      "@project = current_tenant.projects.find(params[:id])\n# Pass a tenant ID into a job, then re-establish and validate tenant context there.",
      "tenant = current_user.tenant\norder = tenant.orders.find(params[:id])\n# Composite uniqueness: add_index :orders, [:tenant_id, :number], unique: true"
     ],
     "p": [
      "Do not put a tenant_id default scope on every ApplicationRecord table.",
      "Consider database row-level security where appropriate, with correct connection/session handling."
     ],
     "s": [
      "How do you handle multi-tenancy in a Rails application?",
      "How does Rails handle multi-tenancy?"
     ]
    },
    {
     "q": "How would you build microservices or a service-oriented architecture with Rails?",
     "l": "A",
     "a": "A monolith deploys the application as one unit; microservices split capabilities into independently deployed services communicating across explicit network interfaces.",
     "e": "Rails supports either model. A modular monolith often gives clear boundaries with lower operational cost; services can help independent scaling or ownership but add partial failures, distributed tracing, schema/version evolution and data consistency concerns. Split along business boundaries after identifying a concrete need, not just because traffic grows.",
     "x": [
      "Checkout service → payment provider\nOrder state + transactional outbox → event worker → fulfillment service",
      "# Scenario: extract a billing service only when independent ownership/scaling justifies the network boundary."
     ],
     "n": [
      "Example: a billing Rails service owns invoices and exposes a versioned HTTP API; it consumes an order-created event idempotently rather than sharing arbitrary database tables with every service."
     ],
     "p": [
      "Remote calls need timeouts, bounded retries and clear ownership of side effects.",
      "Distributed retries, partial failure and data consistency are the main follow-ups; Docker/Kubernetes alone do not solve them."
     ],
     "s": [
      "How do you implement a microservice architecture using Ruby on Rails?",
      "Explain Microservices and how Rails can be part of it.",
      "Explain the difference between monolithic and microservices architecture, and how can Rails fit in either model?",
      "How is Ruby addressing the challenges posed by the rise of microservices architecture?",
      "What is service-oriented architecture (SOA), and how can you implement it in Rails?"
     ]
    }
   ]
  ],
  [
   "Security scenarios",
   [
    {
     "q": "A customer reports that unauthorized users can modify another user's profile by changing the request parameters. How would you investigate and resolve this issue?",
     "l": "I",
     "a": "Enforce server-side authorization for the target record and action; Strong Parameters alone does not prevent one user editing another user’s record.",
     "e": "Scope lookups to the current user/tenant or apply an explicit policy. For an admin-only action, check the authenticated user’s role before the action. Test unauthenticated, owner, non-owner and administrator cases and permit only the intended editable fields.",
     "x": [
      "@post = current_user.posts.find(params[:id])\n@post.update!(params.require(:post).permit(:title))\n# With a policy library: authorize @post, :update?"
     ]
    },
    {
     "q": "Your client wants only administrators to access the user management page. How would you implement this in Rails?",
     "l": "I",
     "a": "Add authorization on the server: a role or admin flag on users and a before_action (or Pundit policy) on the user management controller that rejects non-admins. Hiding the link in the menu is not enough.",
     "e": "Every action in the controller must be protected, including JSON endpoints. Return 403 Forbidden or redirect for non-admins, and cover it with a request test that logs in as a normal user and expects to be denied.",
     "x": [
      "class Admin::UsersController < ApplicationController\n  before_action :require_admin\n\n  private\n\n  def require_admin\n    head :forbidden unless current_user&.admin?\n  end\nend\n\n# test\nsign_in users(:member)\nget admin_users_path\nassert_response :forbidden"
     ]
    },
    {
     "q": "How do you implement rate-limiting and throttling in Rails?",
     "l": "A",
     "a": "Rate limiting caps requests per identity or resource over a defined window, using a shared store when multiple app processes serve traffic.",
     "e": "Choose the key carefully: user/account/API token is often better than IP alone. Use trusted proxy handling before reading client IP, expire counters atomically, and return 429 with a suitable Retry-After policy. Distinguish abuse limits from business quotas. Rails 8 supports controller rate limiting; Rack::Attack is another option.",
     "x": [
      "rate_limit to: 10, within: 3.minutes, only: :create\n# Apply an application-specific key and response policy as needed."
     ]
    }
   ]
  ],
  [
   "Integrations and real-time features",
   [
    {
     "q": "Your application needs to send thousands of confirmation emails after users register. How would you prevent slow response times?",
     "l": "B",
     "a": "Queue email delivery with Active Job and an appropriately configured durable backend, rather than sending thousands of messages inside an HTTP request.",
     "e": "Enqueue after the user transaction commits, monitor delivery failures and queue age, respect provider rate limits, and make the action idempotent where possible. Break bulk campaigns into manageable batches and do not assume a successful enqueue means the email was delivered.",
     "x": [
      "UserMailer.with(user: user).confirmation.deliver_later"
     ]
    },
    {
     "q": "How do you integrate a third-party API in Rails?",
     "l": "I",
     "a": "Call an external API through a clearly defined client with explicit timeouts, response/error handling and safe credential management.",
     "e": "Use Net::HTTP or an appropriate library, inspect status/content type, validate response shape and handle pagination/rate limits. Retry only suitable transient failures with bounded backoff, using idempotency keys for operations that could be duplicated. Avoid holding a database transaction/lock while making a slow network request.",
     "x": [
      "uri = URI(\"https://api.example.com/resource\")\nresponse = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 3, read_timeout: 5) do |http|\n  http.get(uri.request_uri)\nend\nraise \"Upstream failed: #{response.code}\" unless response.is_a?(Net::HTTPSuccess)"
     ]
    },
    {
     "q": "How do you handle real-time data processing in a Ruby on Rails application?",
     "l": "I",
     "a": "Separate ingestion/processing from client delivery: jobs or stream consumers process data, while Action Cable can deliver selected updates to connected clients.",
     "e": "Choose durability, ordering and replay requirements before selecting a broker. Jobs should be idempotent and bounded; client updates should be authorized and have a resynchronization path after disconnection. A WebSocket connection alone does not make business processing durable.",
     "n": [
      "Example: persist an order update and an outbox event in one transaction; an outbox worker publishes a safe status message to the user’s authorized Action Cable stream."
     ],
     "p": [
      "Monitor lag, retries and dropped/reconnected clients."
     ]
    },
    {
     "q": "Explain how you would implement a payment gateway integration in a Rails application.",
     "l": "A",
     "a": "Treat payment processing as a distributed workflow: the database and provider do not share one atomic transaction.",
     "e": "Compute amount and currency from a trusted server-side order, use the provider’s supported payment flow and idempotency mechanism, record state transitions, and verify webhook authenticity. Deduplicate webhook event IDs and tolerate out-of-order delivery. Do not hold a database lock across a slow network request when a state machine and idempotency can coordinate the workflow.",
     "x": [
      "Order.transaction do\n  order.lock!\n  order.update!(payment_state: \"pending\")\n  # Persist a uniquely identified payment attempt / outbox event.\nend\n# A worker calls the provider using the persisted idempotency key.\n# A verified webhook applies an idempotent state transition."
     ],
     "p": [
      "This is a conceptual workflow; provider-specific requests require its current documentation."
     ]
    },
    {
     "q": "Explain how you would implement a real-time feature in a Rails application (e.g., using Action Cable or WebSockets).",
     "l": "A",
     "a": "Action Cable supplies Rails-integrated WebSocket connections and channels for server-to-client real-time events.",
     "e": "Authenticate the connection and authorize each subscription. Broadcast only data allowed for the specific stream audience. Multi-process deployments need a shared pub/sub adapter; configure the adapter for the application’s Rails version and infrastructure. Browser reconnection requires a plan for catching up missed events.",
     "x": [
      "class NotificationsChannel < ApplicationCable::Channel\n  def subscribed\n    stream_for current_user\n  end\nend\nNotificationsChannel.broadcast_to(user, { message: \"Report ready\" })",
      "class NotificationsChannel < ApplicationCable::Channel\n  def subscribed\n    stream_for current_user\n  end\nend\nNotificationsChannel.broadcast_to(user, message: \"Ready\")"
     ],
     "p": [
      "Do not let a client select an arbitrary private user stream."
     ],
     "s": [
      "How do you implement real-time notifications using Rails?",
      "How would you implement real-time features (e.g., chat, notifications) in a Rails application?"
     ]
    },
    {
     "q": "How do you optimize image and file uploads for performance in Rails?",
     "l": "A",
     "a": "Active Storage attaches files to models and supports local or cloud-backed storage, direct uploads, metadata and image variants.",
     "e": "Authorize uploads/downloads, impose size and content-type policies, and do not rely only on a supplied filename or browser MIME type. Isolate uploaded content and process expensive image/video work asynchronously. Direct uploads reduce web-server bandwidth but still require access controls, lifecycle cleanup and malware/content checks appropriate to the application.",
     "x": [
      "class User < ApplicationRecord\n  has_one_attached :avatar\nend\nuser.avatar.attach(io: File.open(\"avatar.png\"), filename: \"avatar.png\", content_type: \"image/png\")"
     ]
    }
   ]
  ],
  [
   "Design patterns in Rails",
   [
    {
     "q": "Explain the Decorator Pattern in Rails.",
     "l": "I",
     "a": "A decorator wraps an object to add a focused layer of behavior while delegating the underlying interface.",
     "e": "In Rails, decorators are often used for presentation formatting that does not belong in persistence rules. This can be implemented with plain composition or a library; Rails does not mandate a universal decorator base class.",
     "x": [
      "require \"delegate\"\nclass UserPresenter < SimpleDelegator\n  def display_name = name.to_s.strip\nend"
     ],
     "p": [
      "Do not hide important business mutations in a presentation wrapper."
     ]
    }
   ]
  ]
 ]
});
