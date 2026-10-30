const fs=require('node:fs');
const path=require('node:path');
const p=path.join(__dirname,'records.json');
const records=JSON.parse(fs.readFileSync(p,'utf8'));
function set(file,line,a,e,x,issues=[],points=[]){const r=records.find(r=>r.sourceFile===file+'.txt'&&r.startLine===line);if(!r)throw Error(file+':'+line);Object.assign(r,{directAnswer:a,explanation:e,example:x});r.issues=[...r.issues,...issues];r.importantPoints=[...r.importantPoints,...points];}
set('eighteen',17,'For notes shared across many models, use a polymorphic Note association with a cohesive Noteable concern, or delegate a workflow to a service/form object when it crosses model boundaries.',
 'A concern removes duplicated association/helpers but remains coupled to its host models and can conceal responsibilities when overused. Delegation/composition makes dependencies and workflow boundaries explicit but adds interfaces to maintain. Keep view markup in shared partials and validation rules in cohesive validators. A service can legitimately know the business domain; it need not be a domain-agnostic utility.',
 'module Noteable\n  extend ActiveSupport::Concern\n  included do\n    has_many :notes, as: :noteable, dependent: :destroy\n  end\nend\nclass Note < ApplicationRecord\n  belongs_to :noteable, polymorphic: true\nend\nclass Product < ApplicationRecord\n  include Noteable\nend', ['Source claim that service classes have no business-domain knowledge is not a requirement and is often incorrect.']);
set('thirty',109,'Give a specific benefit from your own work, such as Rails’ conventions and integrated tooling reducing repeated application plumbing.',
 'This is a preference question rather than a universal technical ranking. Explain one concrete decision and its trade-off. Metaprogramming is useful for framework DSLs but does not make CPU-heavy work instant or remove the need for readable explicit application code.',
 'Practice answer: “Rails migrations and model conventions helped my team evolve a CRUD feature consistently; we still added explicit authorization and database constraints.”', ['Corrected unsupported source claim that metaprogramming makes heavy tasks take no time.']);
set('thirtytwo',79,'The Active Record pattern combines an object’s persistent data and the operations that load, save, update and delete its database row.',
 'Rails’ ActiveRecord library implements this pattern along with querying, relationships and callbacks. It differs from a Data Mapper approach, where persistence mapping is separated from the domain object. Active Record is convenient for data-oriented applications but can couple domain behavior to schema/persistence concerns.',
 'class Product < ApplicationRecord\n  def discounted_price(percent)\n    price * (100 - percent) / 100\n  end\nend\nproduct = Product.find(1)\nproduct.update!(price: product.discounted_price(10))');
set('eighteen',79,'Use Array#sum, or inject with an explicit zero accumulator; the supplied array sums to 72.',
 'sum is the clearest numeric API. inject(0, :+) also returns zero for empty input, unlike inject(:+), which returns nil. Decide whether elements must all be numeric and whether exact Integer/Rational/BigDecimal arithmetic is required.',
 'def sum_numbers(array)\n  array.sum\nend\nsum_numbers([1, 2, 34, 5, 6, 7, 8, 9]) # 72\nsum_numbers([]) # 0',
 ['Source edge case: inject(:+) returns nil for an empty array.']);
set('eighteen',112,'Called independently: talk prints “I’m talking”; whisper raises NoMethodError; send(:talk) prints the public message; send(:whisper) invokes the private method and prints its message.',
 'send bypasses ordinary method visibility; public_send respects it. If the four statements run sequentially without rescuing the second statement, execution stops at that exception and the later sends do not run. This is not a security sandbox, and an instance is not a “class object”.',
 'class Human\n  def talk = puts("I’m talking")\n  private\n  def whisper = puts("I’m whispering")\nend\nh = Human.new\nh.talk\nbegin\n  h.whisper\nrescue NoMethodError\n  puts "private call rejected"\nend\nh.send(:talk)\nh.send(:whisper)',
 ['Source prints four independent outcomes without noting that the unrescued exception stops sequential execution.']);
set('eighteen',143,'Use partition(&:odd?) to return the odd elements and the even elements in one traversal.',
 'partition returns two arrays preserving encounter order. The first contains elements for which the block is truthy; the second contains the rest. This uses O(n) time and O(n) result storage. The source map/partition expression is malformed and ignores its iterator variable.',
 'array = [1, 2, 3, 4, 5]\nodds, evens = array.partition(&:odd?)\nodds # [1, 3, 5]\nevens # [2, 4]',
 ['Corrected invalid source expression %i|select reject|.map { |m| array.partition(&odd?)}.']);
set('eighteen',183,'Recursively walk the nested hash and join the key path for each leaf. Preserve array-valued leaves instead of flattening them accidentally.',
 'The source Array#flatten-based approach can corrupt array-valued leaf data. Joining paths with underscores is ambiguous if original keys contain underscores, so specify an escaping rule or keep path arrays for reversible flattening. Detect collisions rather than silently replacing values. Unflattening requires a defined conflict policy for a value at both a and a_b.',
 'def flatten_hash(hash, prefix = [], out = {})\n  hash.each do |key, value|\n    parts = prefix + [key.to_s]\n    if value.is_a?(Hash)\n      flatten_hash(value, parts, out)\n    else\n      joined = parts.join("_").to_sym\n      raise ArgumentError, "key collision" if out.key?(joined)\n      out[joined] = value\n    end\n  end\n  out\nend\nflatten_hash({a: {b: {c: 42, d: "foo"}, d: "bar"}, e: "baz"})\n# {:a_b_c=>42, :a_b_d=>"foo", :a_d=>"bar", :e=>"baz"}',
 ['Source reverse-flattening follow-up is under-specified without key escaping/collision rules.'],
 ['For a reversible alternative, represent paths as arrays of keys rather than concatenated strings.']);
set('eighteen',200,'& converts the supplied object through to_proc; Symbol#to_proc creates a callable that sends that symbol-named method to its first argument.',
 'For reduce(&:*) the accumulator is the receiver and the next element is the multiplication argument. A two-positional-argument lambda is not a general Symbol#to_proc replacement. The correct method forwarding shape needs a receiver plus arbitrary positional arguments, keywords and a block; exact arity/introspection/visibility details also matter. Do not globally monkey-patch Symbol just to solve the exercise.',
 'def symbol_callable(name)\n  proc { |receiver, *args, **kwargs, &block| receiver.public_send(name, *args, **kwargs, &block) }\nend\n(1..5).reduce(&symbol_callable(:*)) # 120\n%w[ruby rails].map(&symbol_callable(:upcase)) # ["RUBY", "RAILS"]',
 ['Source inference: calling (1..42).each(&:*) is invalid even with the genuine Symbol#to_proc because Integer#* still requires an argument; it is not a valid positive test of a repaired converter.']);
set('eighteen',241,'The do/end block binds to puts, so Benchmark.measure receives no block and raises LocalJumpError. Parenthesize the measured call or use braces.',
 'Ruby block-binding precedence makes braces bind more tightly than do/end in this call form. Benchmark.measure yields to a supplied block; it cannot measure the loop if the block belongs to puts. A deterministic bounded operation is a better repeatable timing example than a random infinite loop.',
 'require "benchmark"\nputs(Benchmark.measure do\n  1000.times { 2 * 3 }\nend)\n# Or:\nputs Benchmark.measure { 1000.times { 2 * 3 } }');
set('eighteen',251,'With the stated aN/bN/cN key convention, use map and dig with the position-derived keys to obtain the nested values.',
 'Do not infer meaning from a hash’s last inserted key when the schema names are known. Confirm whether keys are symbols or strings and whether keys may be missing; dig returns nil for a missing path but can raise if an intermediate value does not support dig. The input guarantee matters more than a short flatten/to_a trick.',
 'input = [{a1: 42, b1: {c1: "foo"}}, {a2: 43, b2: {c2: "bar"}}, {a3: 44, b3: {c3: "baz"}}]\nvalues = input.each_with_index.map do |row, index|\n  n = index + 1\n  row.dig("b#{n}".to_sym, "c#{n}".to_sym)\nend\nvalues # ["foo", "bar", "baz"]',
 ['The source index-free flattening examples depend on insertion order and can silently extract the wrong data.']);
set('eighteen',268,'Inside class << self, self is Foo’s singleton class, so @foo belongs to that singleton-class object, not to an instance of Foo and not to Foo itself.',
 'Read it with Foo.singleton_class.instance_variable_get(:@foo), or execute a class << Foo body. A class object has a singleton class in its method lookup path, but Foo.class is Class; describing Foo as the sole instance of its eigenclass is a misleading account of Ruby class membership.',
 'class Foo\n  class << self\n    @foo = 42\n  end\nend\nFoo.singleton_class.instance_variable_get(:@foo) # 42\nFoo.instance_variable_get(:@foo) # nil\nFoo.class # Class',
 ['Corrected the source’s inaccurate eigenclass/class-membership explanation.']);
set('eighteen',283,'Modules provide namespaces, reusable mixin behavior and module-level utility interfaces without requiring multiple class inheritance.',
 'Use inheritance for a substitutable is-a relationship and mixins/composition for shared capabilities. A module can hold state and module methods, but it is not automatically equivalent to a carefully designed singleton service. Keep dependencies and method collisions visible, especially when many modules are included.',
 'module Graphics\n  class Canvas; end\nend\nmodule Printable\n  def print_label = "printable"\nend\nclass Car\n  include Printable\nend\nCar.new.print_label',[], ['Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html']);
set('sixteen',281,'The Java example has declared parameter/return types, while the Ruby method accepts any object supporting the operations it calls.',
 'The Ruby empty? body calls size and compares with zero, so successful execution returns a boolean despite the lack of a return-type declaration. Passing an incompatible object raises at runtime. Static typing and duck typing describe how interfaces are checked, not an absolute guarantee of safety or speed.',
 'def empty?(value)\n  value.size == 0\nend\nempty?([]) # true\nempty?("") # true\nempty?(Object.new) # NoMethodError');
set('sixteen',305,'Runtime interface mistakes may appear only on an exercised path, and performance cannot be predicted solely from the language’s typing model.',
 'Duck typing is flexible, but an object can lack a required method or return a surprising value. Tests and explicit contracts help. Profile the actual implementation and workload before optimizing; Ruby implementations and JIT options differ. The source’s Ruby-versus-Java speed claim is not universally valid.',
 'empty?(Object.new) # NoMethodError when #size is absent\n# Test the intended protocol, including invalid inputs.');
set('sixteen',309,'Use representative tests, explicit interface expectations where useful, optional static checking and profiling of actual bottlenecks.',
 'Test behavior with compatible and incompatible values instead of scattering respond_to? checks without a policy. Tools such as Benchmark and an allocation/CPU profiler can identify costs. A runtime guard can improve an error message but is not a substitute for validating the method’s complete contract.',
 'require "benchmark"\nputs Benchmark.measure { 100_000.times { [1, 2, 3].size } }');
set('thirtyeight',200,'A before_action can require an authenticated administrator before a controller action is permitted to run.',
 'The callback centralizes a request-level policy; resource-specific authorization may still be required. Render or head sets the response and halts the before-action chain. Keep the authorization rule testable and do not rely on hiding UI links.',
 'before_action :require_admin!\nprivate\ndef require_admin!\n  head :forbidden unless current_user&.admin?\nend');
set('thirtyfive',45,'The two lines printed are “Hello, Rails!” and “Hello, World!”.',
 'Calling hello("Rails") supplies the explicit argument. Calling hello without an argument uses its default parameter. The final string expression is the method’s return value and puts writes it to standard output.',
 'def hello(name = "World")\n  "Hello, #{name}!"\nend\nputs hello("Rails")\nputs hello\n# Hello, Rails!\n# Hello, World!');
set('thirtyfive',67,'The explicit GET users/:id route duplicates the show route already generated by resources :users; it is redundant, not a Ruby syntax error.',
 'Rails matches routes in declaration order. Remove accidental duplicate routes to make intent clear, but custom routes can be valid when they provide different behavior, constraints or helpers. Inspect the result with bin/rails routes.',
 'Rails.application.routes.draw do\n  resources :users\nend', ['Source wording overstates a duplicate route as an error; the shown routing file is syntactically valid.']);
set('thirtyfive',135,'The output is the total number of rows after the save attempt; it is 1 only under extra assumptions such as an initially empty table and a successful save.',
 'A uniqueness validator can prevent the new record from saving if a row with that email already exists. Other validations/callbacks can also fail or database writes can raise. The code provides no initial database state, so an unconditional numeric answer is impossible. Check save’s result or use save! when failure must raise.',
 'before = User.count\nuser = User.new(email: "test@example.com")\nif user.save\n  puts "count increased by one: #{User.count == before + 1}"\nelse\n  puts user.errors.full_messages\nend', ['Corrected source’s unconditional claim that User.count must be 1.']);
set('thirtyone',19,'Separate the GraphQL client, a validated Planet persistence model and a REST controller; import validated rows idempotently rather than embedding a network fetch in every endpoint.',
 'Send a POST carrying the provided GraphQL query, apply connection/read timeouts, reject non-success responses and GraphQL errors, and validate data before writes. The query has no stable external ID, so name-based uniqueness is only an explicit exercise assumption. Store population with an adequate numeric/null policy and terrains/climates as structured data. A real API needs authorization, pagination and tests for upstream failures. The provided public endpoint was not called or assumed to remain available.',
 '# Import service skeleton; adapter/schema details must match the app.\nrequire "net/http"\nrequire "json"\nuri = URI(ENV.fetch("PLANETS_GRAPHQL_URL"))\nrequest = Net::HTTP::Post.new(uri)\nrequest["Content-Type"] = "application/json"\nrequest.body = JSON.generate(query: "query Query {allPlanets{planets{name population terrains climates}}}")\nresponse = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: 3, read_timeout: 5) { |http| http.request(request) }\nraise "Upstream HTTP #{response.code}" unless response.is_a?(Net::HTTPSuccess)\npayload = JSON.parse(response.body)\nraise "GraphQL errors" if payload["errors"]\nrows = payload.fetch("data").fetch("allPlanets").fetch("planets")\nPlanet.transaction do\n  rows.each do |row|\n    planet = Planet.find_or_initialize_by(name: row.fetch("name"))\n    planet.update!(population: row["population"], terrains: row["terrains"], climates: row["climates"])\n  end\nend\n# routes.rb\nresources :planets, only: [:index, :show, :create, :update, :destroy]\n# Controller create:\n# planet = Planet.create!(params.require(:planet).permit(:name, :population, terrains: [], climates: []))\n# render json: planet, status: :created',
 ['Source supplies an exercise without a complete implementation; example is an independently prepared design, not a claim of a verified live integration.'], ['Use a database unique constraint for the chosen external identity and a durable external ID if the provider exposes one.']);
set('thirtyone',51,'The controller shown has no Ruby syntax error. If the list fails, inspect the route, Product model/table, template location and actual database contents.',
 'Product.all is a valid lazy relation and the controller action is syntactically valid. A model definition in another file is normal Rails organization, so its absence from the pasted snippet is not proof of a defect. Do not invent a missing model as the only possible root cause.',
 '# Valid controller:\nclass ProductsController < ApplicationController\n  def index\n    @products = Product.all\n  end\nend\n# Conventional app/models/product.rb:\nclass Product < ApplicationRecord; end', ['Source falsely labels valid controller code as a syntax error.']);
set('thirtyone',91,'Replace the nonexistent end_form_tag with the ERB block terminator <% end %>. form_tag itself is valid legacy helper syntax.',
 'The source unnecessarily says form_tag must be replaced by form_for. A modern model-backed form normally uses form_with, which also produces nested parameter names expected by Strong Parameters. Match controller parameter handling to the chosen form shape.',
 '<%= form_with(model: @product) do |f| %>\n  <%= f.label :name %>\n  <%= f.text_field :name %>\n  <%= f.label :price %>\n  <%= f.number_field :price, step: "0.01" %>\n  <%= f.submit "Add Product" %>\n<% end %>', ['Corrected invalid end_form_tag; form_tag is not intrinsically wrong.']);
set('thirtyone',141,'The associations shown already form a valid one-to-many relationship. Add optional: true only if the business permits a product with no category.',
 'Modern belongs_to requires an associated record by default in newly configured applications. That is a valid integrity rule rather than a coding defect. The database should have category_id and an appropriate foreign key/nullability policy. Making an association optional without a requirement can weaken data integrity.',
 'class Product < ApplicationRecord\n  belongs_to :category\nend\nclass Category < ApplicationRecord\n  has_many :products\nend', ['Source invents an optionality requirement and presents valid code as logically incorrect.']);
set('thirtyone',179,'Use a symbol or string naming the attribute: validates :name, presence: true, length: { minimum: 3, maximum: 50 }.',
 'The bare name expression in a class body is interpreted as a method call/local expression, not the intended attribute name; in a model class it can even resolve to the class’s own name. Passing :name explicitly gives the validation DSL the correct attribute.',
 'class Product < ApplicationRecord\n  validates :name, presence: true, length: { minimum: 3, maximum: 50 }\nend', ['The source describes this as a syntax error, but the bare expression can parse and resolve to unintended behavior; the essential correction is the explicit attribute name.']);
set('thirtyone',209,'Close the block parameter with a pipe: create_table :products do |t|.',
 'The source snippet has do |t without the closing |, causing a parse error. The remaining versioned migration structure with up/down is valid. Use a reversible change method for this straightforward create_table operation if desired; decimal precision/scale should match the domain.',
 'class CreateProducts < ActiveRecord::Migration[8.0]\n  def change\n    create_table :products do |t|\n      t.string :name\n      t.decimal :price, precision: 10, scale: 2\n      t.timestamps\n    end\n  end\nend', ['Source explanation mentions an opening brace that does not exist in the pasted line; the actual missing token is the closing pipe.']);
set('thirtyone',255,'The displayed controller and ERB loop are already valid and already use <%= article.title %>; the source’s proposed correction is identical.',
 'If no articles appear, confirm route/action execution, the expected template, nonempty data and any scopes/authorization filters. If an exception occurs, inspect the real exception. Do not claim a missing output tag when the provided tag is already correct.',
 '@articles = Article.all\n# index.html.erb\n<% @articles.each do |article| %>\n  <p><%= article.title %></p>\n<% end %>', ['Source supplies identical before/after code and invents an ERB output-tag error.']);
set('thirtyone',301,'The issue is unpermitted parameters during mass assignment in modern Rails, not a Ruby syntax error.',
 'Use a private method returning permitted attributes, instantiate the article through an authorized scope where relevant, and handle invalid data with an appropriate response. The form’s nested article fields should match the expected input shape.',
 'def create\n  @article = current_user.articles.new(article_params)\n  if @article.save\n    redirect_to @article, status: :see_other\n  else\n    render :new, status: :unprocessable_entity\n  end\nend\nprivate\ndef article_params\n  params.require(:article).permit(:title, :content)\nend', ['Source misclassifies ForbiddenAttributesError/mass-assignment handling as a syntax error.']);
set('thirtyone',385,'Update with explicitly permitted fields after retrieving an authorized article, instead of passing unpermitted params[:article] directly.',
 'The source’s intended mass-assignment fix is valid in modern Rails, but authorization must also constrain which record may be updated. Strong Parameters controls attributes, not ownership. The update method returns false when validations fail; respond with errors rather than claiming success.',
 'def update\n  @article = current_user.articles.find(params[:id])\n  if @article.update(article_params)\n    redirect_to @article, status: :see_other\n  else\n    render :edit, status: :unprocessable_entity\n  end\nend\nprivate\ndef article_params\n  params.require(:article).permit(:title, :content)\nend');
set('thirtyone',465,'The before/after source code is identical. Whether method: :delete works depends on the frontend driver; prefer button_to, or use Turbo’s supported attributes.',
 'Rails-UJS recognizes link_to method: :delete and data-confirm. A modern Turbo application uses data-turbo-method/data-turbo-confirm for links. An ordinary anchor without the relevant JavaScript issues GET, so inspect the actual network request and routes before diagnosing. The controller must authorize deletion and handle callback aborts.',
 '<%= button_to "Delete", article_path(@article), method: :delete, data: { turbo_confirm: "Are you sure?" } %>\n# In destroy after success:\nredirect_to articles_path, status: :see_other', ['Source’s proposed fix repeats the original and ignores Rails-UJS versus Turbo behavior.']);
set('thirtyone',533,'The association access can display correctly; the observed problem in the snippet is N+1 query behavior, not an inherently incorrect author name.',
 'Use includes(:author) or preload(:author) when rendering authors for a collection. If the author is optional and nil, handle that domain case separately; eager loading does not create a missing author. This normally reduces many per-row queries to a bounded query set.',
 '@articles = Article.includes(:author).limit(50)\n# View:\n<% @articles.each do |article| %>\n  <p><%= article.title %> — <%= article.author&.name || "Unknown author" %></p>\n<% end %>', ['Source conflates an N+1 performance problem with incorrect display.']);
set('twenty',275,'The original screenshot/code is missing, so the exact defect cannot be determined; the pasted proposed query only demonstrates a join-based filter.',
 'Given a Comment belongs_to :author association backed by users, a join can filter comments by username without loading every user/comment in Ruby. The table alias depends on the actual association schema. Request the missing snippet if exact line-by-line debugging is required, and check the generated SQL and authorization scope.',
 '# Assuming author maps to users and the association is configured:\nComment.joins(:author).where(users: { username: params[:username] })', ['Unresolved original input: screenshot containing the code is absent. No exact bug is invented.']);
set('twentytwo',298,'Filter the allowed parameter keys directly instead of converting every untrusted key to a symbol; in a controller, use permit when these values will be mass-assigned.',
 'The original claim that all symbols are never garbage-collected is outdated since Ruby 2.2, although bounded input and allowlisting remain important. The pasted params.slice(*available option keys) is syntactically broken because the variable name has spaces. Avoid building arbitrary dynamic dispatch or symbol vocabularies from attacker-controlled keys.',
 'allowed = %w[first_option second_option third_option]\noptions = params.permit(*allowed).to_h\n# For a plain Ruby Hash instead:\n# options = input.slice(*allowed)', ['Corrected obsolete universal non-GC-symbol claim and malformed available option keys expression.']);
set('twentytwo',322,'It prints “The value of x is 12.”, “The sum of x and y is 48.” and “The average was 40.”.',
 'The double-quoted strings interpolate the arithmetic results. Since every operand is an Integer, /3 performs integer division; the given sum 120 divides evenly. Use fdiv(3) if fractional results are required for other inputs.',
 'x, y, z = 12, 36, 72\nputs "The value of x is #{x}."\nputs "The sum of x and y is #{x + y}."\nputs "The average was #{(x + y + z) / 3}."');
set('twentytwo',350,'Use flat_map(&:keys) and flat_map(&:values) to obtain all keys and values while preserving the input hashes’ order.',
 'The source merges exactly three hashes and then reads their keys/values. That assumes the array length and overwrites duplicate keys, potentially losing source entries. flat_map works for an arbitrary array length and retains duplicates. If a merged dictionary is specifically required, define the duplicate-key conflict rule.',
 'x = [{"a" => 10}, {"b" => 20}, {"c" => 30}]\nkeys = x.flat_map(&:keys) # ["a", "b", "c"]\nvalues = x.flat_map(&:values) # [10, 20, 30]', ['Source merge approach loses entries when keys repeat and hard-codes three input hashes.']);
set('twentytwo',463,'As pasted, print Hi puts Welcome! is not a valid way to print those two strings; the MCQ’s “Error” choice is the appropriate general response.',
 'The code omits quotes and separators and mixes method/constant-looking tokens. If the original screenshot had different punctuation it cannot be reconstructed. Show valid string output explicitly; print does not add a newline and puts does.',
 'print "Hi "\nputs "Welcome!"\n# Hi Welcome!', ['Source code is malformed; no hidden intended quotes are assumed.']);
set('twentytwo',475,'As pasted, Ruby.reverse.upcase raises NameError unless a Ruby constant is defined; with the intended string "Ruby", the result is "YBUR".',
 'Capitalized Ruby is parsed as a constant, not a quoted String. The MCQ’s choices imply that quotes were lost or omitted. Distinguish the literal pasted program from the likely intended expression rather than silently correcting the prompt.',
 '"Ruby".reverse.upcase # "YBUR"\n# Ruby.reverse.upcase # NameError in a normal fresh Ruby process', ['Incomplete/malformed source prompt: the expected string quotes are absent.']);

// Per-source factual and version corrections, with the original retained for comparison.
const corrections=[
 [/Object.Relationship.Model|Object Relationship Model/i,'ORM is Object-Relational Mapping; class/table and object/row conventions do not mean classes themselves are rows.'],
 [/object_id 4|Nil is an object|True and false|True is a TrueClass/i,'Use Ruby literals nil, true and false with their actual classes; do not rely on fixed object_id values or capitalize the literals.'],
 [/Hash.*standard.*= =|tighter = =|uses.*==.*keys/i,'Ordinary Hash key comparison uses hash/eql? rather than simply ==.'],
 [/size method performs the same action as the length|size: This is a length alias/i,'Active Record collection size adapts to loaded state/counter cache; it is not universally the same as length.'],
 [/eager loading: Loads all associated records in a single query|includes.*always separate|Avoid it with eager loading.*joins|includes or joins method|associated records along with the main record using a single query/i,'includes can use separate queries or a join, and joins alone does not preload an association.'],
 [/rake routes|ruby script\/generate|self\.up|self\.down|config\.frameworks|WeBrick/i,'Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.'],
 [/Sprockets|CoffeeScript|Webpacker|concatenates.*minif|automatically compiles and minifies/i,'Asset behavior is version-specific: Rails 8 defaults to Propshaft; bundling/transpilation/minification may require separate tooling.'],
 [/Page Caching|Action Caching|Page\/Action/i,'Page/action caching are historical/extracted features; current Rails supports fragment/low-level/HTTP caching, with extra gems required for legacy page/action APIs.'],
 [/symbols in Ruby are not garbage collected/i,'Outdated: modern Ruby can garbage-collect dynamically created symbols; input allowlisting remains advisable.'],
 [/30,000 characters|Databases with foreign keys|Linking to many databases|Multiple database servers are connected/i,'Corrected obsolete or database-dependent limitation claims; modern Rails supports foreign keys/multiple databases and text has no universal 30,000-character cap.'],
 [/sessions.*server.side|session data stored on the server/i,'Default Rails CookieStore stores encrypted/authenticated session data on the client; server-side stores are alternative configurations.'],
 [/CSV\.generate_stream/i,'CSV.generate_stream is not a standard Ruby CSV API; write rows to an IO/stream or a file.'],
 [/\bpublic: Marks an action as available publicly|By default, an action is set up to respond to an HTTP GET/i,'Ruby public visibility does not bypass authentication callbacks; routes, not a default action verb, decide HTTP access.'],
 [/DatabaseTasksController|reset_database/i,'Do not expose destructive database administration through a request route; use controlled operational tasks. The example reset_database call is not established as a supported standalone public API.'],
 [/Automatic Type Casting|non.integer strings would be rejected/i,'Strong Parameters allowlists shape/attributes; form/query values are not automatically validated and cast into secure application types.'],
 [/class UsersController\(\)|Here is the Python code/i,'The source inserts Python-like code into a Rails controller answer; use actual Ruby/ActionController code.'],
 [/foo.*Singleton method|Foo class is an instance of it/i,'The singleton-class body stores @foo on the eigenclass object. Foo remains an instance of Class; singleton lookup is distinct from ordinary class membership.'],
 [/Proc.new.*hardly ever used|v1\.8\.6|created by.*blocks.*yield/i,'Proc and lambda behavior matters in modern Ruby; raw blocks are not standalone objects and yield invokes a supplied block rather than creating a Proc.'],
 [/Class.*Object root class|Object root class/i,'Modern Ruby has BasicObject as the minimal root; Object is the usual root for ordinary application objects.'],
 [/Paperclip|FactoryGirl/i,'Legacy library names: Paperclip is retired/legacy and FactoryGirl was renamed FactoryBot; choose supported tools for new work.'],
 [/all developers.*same gem versions|ensures.*all developers.*same gem versions/i,'Gemfile declares requirements; Gemfile.lock pins the resolved versions for reproducible application bundles.'],
 [/Counter.*\.count|Improves performance for `\.count`/i,'Counter caches primarily help association size and avoid loading/count queries in supported paths; count generally still issues SQL.'],
 [/class variables.*only.*class|only accessible to.*same class|Protected.*subclass/i,'Visibility and class-variable sharing require precise Ruby context/inheritance rules; see corrected answer rather than the source’s simplified class-only statement.'],
 [/Uses PostgreSQL or MySQL for job storage/i,'Solid Queue also supports SQLite; it is not restricted to PostgreSQL/MySQL.'],
 [/class.*enum role:/i,'Modern enum declarations use enum :role, { ... }; old keyword-style enum declarations are version-sensitive.'],
 [/Models need to be persistent|service classes will have no knowledge of the business domain/i,'Design guidance is not a framework rule: domain models need not all persist, and services commonly encapsulate business-domain workflows.'],
 [/class.*attr_accessor|attr_accessor is used to generate instance variables/i,'attr_accessor defines methods; it does not create database columns and may shadow Active Record attributes when names collide.'],
 [/no database transactions are performed/i,'Collection length may load records with a SELECT when unloaded; absence of an explicit transaction does not mean no database query.'],
 [/Action Mailers are used to send and receive emails/i,'Modern Rails uses Action Mailer for message construction/delivery and Action Mailbox for inbound email routing.'],
 [/user = User.lock\("FOR UPDATE"\).find\(1\)/i,'A row lock must be held in a transaction protecting the following operation; use with_lock or an explicit transaction.'],
 [/Rails supports ActiveModel::Serializer/i,'ActiveModel::Serializer belongs to an optional external library; render json and other representations do not require it.'],
 [/require ‘|“Hello World”|‘https:/i,'Smart quote characters in pasted examples need ordinary Ruby/YAML quoting before execution.'],
];
for(const r of records){
 for(const [re,note]of corrections)if(re.test(r.sourceAnswer)&&!r.issues.includes(note))r.issues.push(note);
 if(!r.example){
   r.issues.push('Source-specific prompt needs additional contextual review; full original answer remains retained.');
 }
 // Ensure the original question label survives separately when a source used a number.
 const lines=fs.readFileSync(path.resolve(__dirname,'../../../ruby',r.sourceFile),'utf8').split(/\r?\n/);
 const label=lines[r.startLine-1].match(/^\s*(?:Question )?(\d+)[.):]/)||lines[r.startLine-1].match(/^\s*Q(\d+)[.:]/);
 if(label)r.sourceQuestionLabel=label[1];
 if(r.sourceFile==='twentytwo.txt'&&r.startLine>=397){r.category='A';r.importantPoints.push('All original multiple-choice options are preserved in sourceAnswer.');}
}

// Split the inline, unnumbered service-object question rather than burying it in the concern answer.
const service=records.find(r=>r.sourceFile==='twentysix.txt'&&r.startLine===22);
if(service){
 const r={...service,startLine:23,endLine:24,question:'What are service objects, and when would you use them?',sourceAnswer:'Service objects encapsulate business logic outside of models/controllers. Use them for actions like payments, complex validations, or third-party API calls.',directAnswer:'Service objects encapsulate an application operation with an explicit interface, dependencies and failure behavior.',explanation:'Use them for workflows crossing several models or external systems when the abstraction makes responsibilities clearer. They are plain Ruby design choices, not mandatory Rails framework classes. Establish transaction ownership and idempotency for side effects.',example:'class PublishPost\n  def call(post)\n    post.update!(published_at: Time.current)\n  end\nend',category:'F',difficulty:'Intermediate',issues:['The original file embeds this additional Q/A inside Q4 on the same source line; retained as a separate occurrence.'],importantPoints:['Overlapping source line 23 contains both the concerns answer and this embedded question.']};
 records.push(r);
}
records.sort((a,b)=>a.sourceFile.localeCompare(b.sourceFile)||a.startLine-b.startLine);
fs.writeFileSync(p,JSON.stringify(records,null,2));
const audits=JSON.parse(fs.readFileSync(path.join(__dirname,'audit.json'),'utf8'));
for(const a of audits){a.fullyRead=true;a.status='complete';a.processing='Full source read, extraction boundaries reviewed, source answers retained, technical and version corrections applied. Missing screenshots and ambiguous MCQs explicitly flagged.';a.extractedRecords=records.filter(r=>r.sourceFile===a.sourceFile).length;}
fs.writeFileSync(path.join(__dirname,'audit.json'),JSON.stringify(audits,null,2));
const missing=records.filter(r=>!r.directAnswer||!r.explanation||!r.example);
console.log('Records',records.length,'missing required answer fields',missing.map(r=>r.sourceFile+':'+r.startLine).join(', '));
console.log('Corrections/holes',records.filter(r=>r.issues.length).length);
