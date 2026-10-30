# Part C: Database and SQL Questions

[Master index](README.md) · [Coverage report](COVERAGE_REPORT.md)

38 consolidated questions. Original passages are kept in the source ledgers; corrected answers and distinct reviewed variants appear here.


## Additional technical topics

- [C-0001 — What is the difference between find and find_by in Rails?](#c-0001)
- [C-0002 — What is the difference between quantity, length and size?](#c-0002)

## Blocks, callables and iteration

- [C-0003 — When would you use find_each vs all.each?](#c-0003)

## Data, querying and integrity

- [C-0004 — Describe the flow of a request in a Rails application from the browser to the database and back. Explain how the MVC components are involved.](#c-0004)
- [C-0005 — Describe your experience with different Rails ORMs (e.g., ActiveRecord, Sequel) and your preferred approach to interacting with databases.](#c-0005)
- [C-0006 — Difference between includes, joins, preload, and eager_load.](#c-0006)
- [C-0007 — Discuss the differences between eager loading and lazy loading in ActiveRecord.](#c-0007)
- [C-0008 — Explain the use of scopes in Rails models. How do they improve code readability and maintainability?](#c-0008)
- [C-0009 — Explain your approach to securing a Rails application against common web vulnerabilities like CSRF, XSS, and SQL injection.](#c-0009)
- [C-0010 — Given two models, Author and Book, where an author can have many books, how would you define the relationship in both models using Active Record? Also, write an Active Record query to find all books written by an auth…](#c-0010)
- [C-0011 — How can you connect a Rails app to a database (e.g., MySQL, PostgreSQL)?](#c-0011)
- [C-0012 — How do you handle database migrations in a Rails project, and what are some best practices for writing and running migrations?](#c-0012)
- [C-0013 — How do you optimize a slow SQL query in a Rails app?](#c-0013)
- [C-0014 — How do you perform custom SQL queries in Rails, and when is it appropriate to do so?](#c-0014)
- [C-0015 — How do you prevent SQL injection in Rails?](#c-0015)
- [C-0016 — How do you run database migrations in Rails?](#c-0016)
- [C-0017 — How does Rails handle database connection pooling?](#c-0017)
- [C-0018 — How does Rails handle database migrations, and what's the process for rolling back a migration?](#c-0018)
- [C-0019 — How does Rails handle database schema changes?](#c-0019)
- [C-0020 — How to optimize ActiveRecord queries in Rails for better performance?](#c-0020)
- [C-0021 — How would you create a new database in Rails?](#c-0021)
- [C-0022 — How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries?](#c-0022)
- [C-0023 — In Rails, what is the key difference between using where and find_by in Active Record queries?](#c-0023)
- [C-0024 — What are database transactions and how are they implemented in Rails?](#c-0024)
- [C-0025 — What are joins and includes in Rails? How are they different?](#c-0025)
- [C-0026 — What is a database schema in Rails?](#c-0026)
- [C-0027 — What is a database? What is a common database used with Rails?](#c-0027)
- [C-0028 — What is a join table in Rails and how do you create one using generator?](#c-0028)
- [C-0029 — What is Active Record in Ruby on Rails?](#c-0029)
- [C-0030 — What is the active_record query interface in Rails?](#c-0030)
- [C-0031 — What is the difference between ActiveRecord and Mongoid?](#c-0031)
- [C-0032 — What is the difference between includes, joins, and eager_load?](#c-0032)
- [C-0033 — What is the difference between optimistic and pessimistic locking in Rails?](#c-0033)
- [C-0034 — What is the importance of database indexing, and how do you implement it in Rails?](#c-0034)
- [C-0035 — When is the after_create callback in an Active Record model triggered?](#c-0035)
- [C-0036 — Which of the following best describes the primary purpose of using scopes in Rails models?](#c-0036)
- [C-0037 — Which of the following statements best describes the belongs_to association in Rails Active Record?](#c-0037)

## Performance, memory and concurrency

- [C-0038 — How does counter_cache work and when would you use it?](#c-0038)

---

<a id="c-0001"></a>

### C-0001 — What is the difference between find and find_by in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

What is the difference between find and find_by in Rails?

**Direct answer**

find retrieves by primary key and raises ActiveRecord::RecordNotFound when missing; find_by uses attribute conditions and returns one match or nil.

**Detailed explanation**

find_by! raises when no row matches. Without ordering, “first match” does not promise a business order. Dynamic finders such as find_by_email are convenience methods, but the explicit find_by(email: value) interface is clearer and easier to compose.

**Practical example**

```text
User.find(42)
User.find_by(email: "dev@example.com")
User.find_by!(email: "dev@example.com")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00835 — [thirtyfive.txt:146–151](../ruby/thirtyfive.txt) (05) · [complete source](sources/thirtyfive.md)
- SRC-00916 — [thirtyfour.txt:86–86](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01072 — [thirtytwo.txt:43–45](../ruby/thirtytwo.txt) (5) · [complete source](sources/thirtytwo.md)
- SRC-01142 — [twenty.txt:403–409](../ruby/twenty.txt) (45) · [complete source](sources/twenty.md)
- SRC-01269 — [twentyfive.txt:482–487](../ruby/twentyfive.txt) (71) · [complete source](sources/twentyfive.md)


---

<a id="c-0002"></a>

### C-0002 — What is the difference between quantity, length and size?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between quantity, length and size?

**Direct answer**

For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.

**Detailed explanation**

These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.

**Practical example**

```ruby
posts = user.posts
posts.count   # typically SELECT COUNT(*)
posts.length  # loads records
posts.size    # uses loaded records now
```

**Important points and follow-ups**

- The source claim that Active Record size is always an alias for length is wrong.
- Reference: https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html

**Corrections and source limitations**

- Active Record collection size adapts to loaded state/counter cache; it is not universally the same as length.
- Collection length may load records with a SELECT when unloaded; absence of an explicit transaction does not mean no database query.

**Source references**

- SRC-01052 — [thirtyseven.txt:218–221](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="c-0003"></a>

### C-0003 — When would you use find_each vs all.each?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

When would you use find_each vs all.each?

**Direct answer**

Process large tables in bounded batches, paginate user interfaces, and stream exports instead of building everything in memory.

**Detailed explanation**

find_each iterates records in batches; in_batches exposes a relation per batch for bulk work. Use stable ordering/cursors, bound transaction size, and account for records changing during a run. For imports validate and stage data, use idempotent upserts with unique constraints, and record progress. CSV.generate_stream is not a Ruby standard CSV API.

**Practical example**

```ruby
User.where(active: true).find_each(batch_size: 500) do |user|
  ExportRowJob.perform_later(user.id)
end
# For CSV output, write each row to an IO:
CSV.open("users.csv", "w") { |csv| User.find_each { |u| csv << [u.id, u.email] } }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01325 — [twentysix.txt:46–48](../ruby/twentysix.txt) (11) · [complete source](sources/twentysix.md)


---

<a id="c-0004"></a>

### C-0004 — Describe the flow of a request in a Rails application from the browser to the database and back. Explain how the MVC components are involved.

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Describe the flow of a request in a Rails application from the browser to the database and back. Explain how the MVC components are involved.

**Direct answer**

MVC separates domain data and rules in models, presentation in views, and HTTP coordination in controllers.

**Detailed explanation**

A request passes through Rack middleware and routing to a controller action. The controller authorizes the operation, invokes models or services, and renders a response, often using a view. Database-backed models use Active Record, while JSON APIs may render without an HTML view. Keep domain operations reusable outside controllers.

**Practical example**

```ruby
# config/routes.rb
resources :articles, only: :show
# ArticlesController#show
@article = Article.find(params[:id])
# app/views/articles/show.html.erb
# <%= @article.title %>
```

**Important points and follow-ups**

- A real project example should describe your own work; source anecdotes are illustrative only.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01575 — [twentyseven.txt:1196–1198](../ruby/twentyseven.txt) (Embedded-request-flow) · [complete source](sources/twentyseven.md)


---

<a id="c-0005"></a>

### C-0005 — Describe your experience with different Rails ORMs (e.g., ActiveRecord, Sequel) and your preferred approach to interacting with databases.

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Describe your experience with different Rails ORMs (e.g., ActiveRecord, Sequel) and your preferred approach to interacting with databases.

**Direct answer**

Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching.

**Detailed explanation**

I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching.

While ActiveRecord is my go-to, I've briefly explored Sequel for projects requiring more flexibility or a different approach to database interactions. My preferred approach generally involves leveraging ActiveRecord's strengths for common tasks, writing efficient SQL when needed and prioritizing database performance (e.g., proper indexing, avoiding N+1 queries). I also use database-specific features or functions through raw SQL when appropriate, as not everything can or should be abstracted through an ORM. I pay close attention to the queries generated to verify their efficiency.

**Practical example**

```text
I primarily use ActiveRecord, Rails' default ORM. I'm comfortable with its conventions, including migrations, model associations (e.g., has_many, belongs_to), and querying using ActiveRecord's query interface. I have experience with raw SQL when ActiveRecord's abstractions aren't sufficient, especially for performance optimization or complex queries. I've also used gems to enhance ActiveRecord functionality, such as ransack for advanced searching.

While ActiveRecord is my go-to, I've briefly explored Sequel for projects requiring more flexibility or a different approach to database interactions. My preferred approach generally involves leveraging ActiveRecord's strengths for common tasks, writing efficient SQL when needed and prioritizing database performance (e.g., proper indexing, avoiding N+1 queries). I also use database-specific features or functions through raw SQL when appropriate, as not everything can or should be abstracted through an ORM. I pay close attention to the queries generated to verify their efficiency.
```

**Important points and follow-ups**

- A truthful project answer should include what you personally did and how the result was measured.

**Corrections and source limitations**

- The source uses a first-person illustrative story. Do not present it as your own experience. Adapt the structure to a genuine project.

**Source references**

- SRC-01539 — [twentyseven.txt:777–781](../ruby/twentyseven.txt) (Open-96) · [complete source](sources/twentyseven.md)


---

<a id="c-0006"></a>

### C-0006 — Difference between includes, joins, preload, and eager_load.

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Difference between includes, joins, preload, and eager_load.

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- includes can use separate queries or a join, and joins alone does not preload an association.

**Source references**

- SRC-01321 — [twentysix.txt:33–35](../ruby/twentysix.txt) (7) · [complete source](sources/twentysix.md)


---

<a id="c-0007"></a>

### C-0007 — Discuss the differences between eager loading and lazy loading in ActiveRecord.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Discuss the differences between eager loading and lazy loading in ActiveRecord.

**Direct answer**

Lazy association loading fetches on access and can cause N+1 queries; eager strategies fetch associations for a collection in advance.

**Detailed explanation**

Eager loading and lazy loading are strategies for fetching associated records in ActiveRecord. Eager loading loads associated records in advance, minimizing the number of database queries and improving performance.

Lazy loading, on the other hand, retrieves associated records only when they're accessed. This can lead to a higher number of queries but reduces the initial load time. Eager loading is often preferred for optimizing performance, especially when dealing with complex associations.

**Practical example**

```ruby
User.preload(:posts).find_each { |user| user.posts.each { |post| puts post.title } }
```

**Important points and follow-ups**

- preload uses separate queries; eager_load uses a join; includes may select either strategy. Compare rows, memory and query plans rather than counting queries alone.

**Source references**

- SRC-00053 — [first.txt:333–337](../ruby/first.txt) (23) · [complete source](sources/first.md)


---

<a id="c-0008"></a>

### C-0008 — Explain the use of scopes in Rails models. How do they improve code readability and maintainability?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 5

**Interview question**

Explain the use of scopes in Rails models. How do they improve code readability and maintainability?

**Direct answer**

A scope names a composable Active Record relation so repeated query intent stays readable.

**Detailed explanation**

Use a lambda for parameters and time-sensitive expressions, and return a relation so callers can chain it. Avoid hiding authorization in an optional scope. A default_scope applies implicitly and needs special care because unscoped or alternative access paths can bypass it.

**Practical example**

```ruby
class Article < ApplicationRecord
  scope :published, -> { where(published: true) }
  scope :recent, -> { order(created_at: :desc) }
end
Article.published.recent.limit(20)
```

**Important points and follow-ups**

- Inspect generated SQL; a readable scope can still issue an expensive query.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00839 — [thirtyfive.txt:170–176](../ruby/thirtyfive.txt) (09) · [complete source](sources/thirtyfive.md)
- SRC-00900 — [thirtyfour.txt:70–70](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01251 — [twentyfive.txt:298–304](../ruby/twentyfive.txt) (53) · [complete source](sources/twentyfive.md)
- SRC-01291 — [twentyfive.txt:668–676](../ruby/twentyfive.txt) (93) · [complete source](sources/twentyfive.md)
- SRC-01513 — [twentyseven.txt:582–594](../ruby/twentyseven.txt) (Open-70) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00839 (thirtyfive.txt)</summary>

**Original prompt:** How do Rails scopes work?

**Answer:** A scope is a named, composable query expressed as an Active Record relation.

Use a lambda for values that change with time so they are evaluated when the scope runs, rather than at class load. Scopes should return a relation; class methods are appropriate when logic is more complex. Avoid broad default scopes that unexpectedly affect writes or administrative queries.

```text
scope :recent, -> { where("created_at >= ?", 1.week.ago) }
Post.published.recent.order(:id)
```

</details>


---

<a id="c-0009"></a>

### C-0009 — Explain your approach to securing a Rails application against common web vulnerabilities like CSRF, XSS, and SQL injection.

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Explain your approach to securing a Rails application against common web vulnerabilities like CSRF, XSS, and SQL injection.

**Direct answer**

Use CSRF protection for cookie-authenticated state changes, context-appropriate output escaping for XSS, and parameterized queries for SQL injection.

**Detailed explanation**

Rails provides helpful defaults, but application choices can bypass them. Avoid html_safe on untrusted text. Parameter binding is for values, so dynamic column names and sort directions need allowlists. Authentication does not replace object-level authorization; CORS is not CSRF protection.

**Practical example**

```ruby
User.where(email: params[:email])
# ERB escapes user text by default:
# <%= @comment.body %>
# Allowlist dynamic ordering instead of interpolating SQL.
```

**Important points and follow-ups**

- Use HTTPS and appropriate cookie flags.
- Test authorization with another user’s record ID.
- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01528 — [twentyseven.txt:696–700](../ruby/twentyseven.txt) (Open-85) · [complete source](sources/twentyseven.md)


---

<a id="c-0010"></a>

### C-0010 — Given two models, Author and Book, where an author can have many books, how would you define the relationship in both models using Active Record? Also, write an Active Record query to find all books written by an auth…

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Given two models, Author and Book, where an author can have many books, how would you define the relationship in both models using Active Record? Also, write an Active Record query to find all books written by an author with the name 'Jane Doe'.

**Direct answer**

Declare has_many :books on Author and belongs_to :author on Book; join authors when filtering books by an author’s name.

**Detailed explanation**

The books table needs author_id and normally an index and foreign key. Query from Book so the result is a relation of books. Names are not necessarily unique, so this returns books for all authors with that name unless the business schema defines uniqueness.

**Practical example**

```ruby
class Author < ApplicationRecord
  has_many :books
end
class Book < ApplicationRecord
  belongs_to :author
end
Book.joins(:author).where(authors: { name: "Jane Doe" })
```

**Important points and follow-ups**

- Use a stable author ID when the intention is one specific person.
- Reference: https://guides.rubyonrails.org/association_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01576 — [twentyseven.txt:1205–1207](../ruby/twentyseven.txt) (Embedded-AR-query) · [complete source](sources/twentyseven.md)


---

<a id="c-0011"></a>

### C-0011 — How can you connect a Rails app to a database (e.g., MySQL, PostgreSQL)?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How can you connect a Rails app to a database (e.g., MySQL, PostgreSQL)?

**Direct answer**

config/database.yml declares environment-specific database adapter, database and connection settings; keep production credentials in secure configuration.

**Detailed explanation**

Use the pg adapter for PostgreSQL or mysql2 for MySQL and run migrations against the intended environment. A DATABASE_URL may supply deployment connection details. Check SSL and least-privilege access, and never commit live database passwords.

**Practical example**

```text
production:
  adapter: postgresql
  url: <%= ENV["DATABASE_URL"] %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00886 — [thirtyfour.txt:55–55](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="c-0012"></a>

### C-0012 — How do you handle database migrations in a Rails project, and what are some best practices for writing and running migrations?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How do you handle database migrations in a Rails project, and what are some best practices for writing and running migrations?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01538 — [twentyseven.txt:758–776](../ruby/twentyseven.txt) (Open-95) · [complete source](sources/twentyseven.md)


---

<a id="c-0013"></a>

### C-0013 — How do you optimize a slow SQL query in a Rails app?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How do you optimize a slow SQL query in a Rails app?

**Direct answer**

Measure the query and request first, then reduce unnecessary rows/work, fix N+1 access, and add indexes justified by the query plan.

**Detailed explanation**

Use SQL logs and database EXPLAIN, or EXPLAIN ANALYZE in a suitable environment, to inspect scans, joins, estimates and sorts. Select needed columns, paginate, batch writes and avoid repeated queries. Check query count and latency before and after the change. Caching can help repeated reads but should not hide an incorrect query or stale authorization boundary.

**Practical example**

```ruby
User.where(active: true).order(:id).limit(100).pluck(:id, :email)
# Inspect the generated SQL and plan before adding an index.
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Source references**

- SRC-01323 — [twentysix.txt:40–42](../ruby/twentysix.txt) (9) · [complete source](sources/twentysix.md)


---

<a id="c-0014"></a>

### C-0014 — How do you perform custom SQL queries in Rails, and when is it appropriate to do so?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How do you perform custom SQL queries in Rails, and when is it appropriate to do so?

**Direct answer**

Use SQL or Arel when the relational operation is clearer or unsupported by the normal query interface, while binding values safely.

**Detailed explanation**

Keep SQL adapter-aware, select only necessary columns, and test the plan and returned types. Model.find_by_sql returns model objects; connection-level select_all returns result rows. Avoid string interpolation of request values or untrusted identifiers.

**Practical example**

```text
User.find_by_sql(["SELECT * FROM users WHERE created_at >= ?", 1.week.ago])
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00942 — [thirtyfour.txt:113–113](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="c-0015"></a>

### C-0015 — How do you prevent SQL injection in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 3

**Interview question**

How do you prevent SQL injection in Rails?

**Direct answer**

Bind untrusted values through Active Record hash conditions or placeholders, and allowlist SQL identifiers such as sort columns.

**Detailed explanation**

Parameter binding protects values, not arbitrary SQL structure. Avoid interpolating params into where, order, select or find_by_sql. LIKE patterns also need escaping when user percent/underscore characters should be literal. Authorization and tenant scoping remain separate requirements.

**Practical example**

```text
User.where(email: params[:email])
User.where("name LIKE ?", "%#{User.sanitize_sql_like(params[:q].to_s)}%")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00657 — [fifteen.txt:100–100](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00921 — [thirtyfour.txt:91–91](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01333 — [twentysix.txt:72–74](../ruby/twentysix.txt) (19) · [complete source](sources/twentysix.md)


---

<a id="c-0016"></a>

### C-0016 — How do you run database migrations in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 4

**Interview question**

How do you run database migrations in Rails?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- ruby script/generate is a historical Rails command.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html
- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- All original multiple-choice options are preserved in sourceAnswer.
- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00401 — [ten.txt:161–166](../ruby/ten.txt) (30) · [complete source](sources/ten.md)
- SRC-00885 — [thirtyfour.txt:54–54](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01383 — [twentytwo.txt:397–407](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)
- SRC-01466 — [twentyseven.txt:179–183](../ruby/twentyseven.txt) (Open-23) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00401 (ten.txt)</summary>

**Original prompt:** What is the purpose of rails db:migrate?

**Answer:** A Rails migration is a versioned Ruby description of database changes. Generate it with bin/rails generate migration and apply pending changes with bin/rails db:migrate.

Migrations evolve schema consistently across environments; reversible operations can use change, while operations that Rails cannot reverse need reversible or explicit up/down methods. Data backfills and index creation on large live tables need deployment planning; database portability is not automatic for every SQL operation or index feature.

```bash
bin/rails generate migration AddStatusToUsers status:string
bin/rails db:migrate
bin/rails db:rollback
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00885 (thirtyfour.txt)</summary>

**Original prompt:** How do you run a Rails migration?

**Answer:** Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

</details>


---

<a id="c-0017"></a>

### C-0017 — How does Rails handle database connection pooling?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How does Rails handle database connection pooling?

**Direct answer**

Rails maintains database connection pools so concurrent work can lease and return connections instead of opening a new connection per query.

**Detailed explanation**

Set each pool to match the concurrency that can simultaneously need that database and account for every web/worker process and database role. A too-small pool causes checkout waits/timeouts; a large pool per process can exceed the server’s connection limit. Release connections after work and avoid holding a connection across slow external calls.

**Practical example**

```ruby
# config/database.yml
production:
  adapter: postgresql
  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01327 — [twentysix.txt:52–55](../ruby/twentysix.txt) (13) · [complete source](sources/twentysix.md)


---

<a id="c-0018"></a>

### C-0018 — How does Rails handle database migrations, and what's the process for rolling back a migration?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How does Rails handle database migrations, and what's the process for rolling back a migration?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01497 — [twentyseven.txt:440–444](../ruby/twentyseven.txt) (Open-54) · [complete source](sources/twentyseven.md)


---

<a id="c-0019"></a>

### C-0019 — How does Rails handle database schema changes?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 2

**Interview question**

How does Rails handle database schema changes?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00860 — [thirtyfour.txt:29–29](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00979 — [thirtyfour.txt:322–339](../ruby/thirtyfour.txt) (10) · [complete source](sources/thirtyfour.md)


---

<a id="c-0020"></a>

### C-0020 — How to optimize ActiveRecord queries in Rails for better performance?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How to optimize ActiveRecord queries in Rails for better performance?

**Direct answer**

Measure SQL and rows loaded; fix N+1 with suitable preloading, use selective queries/pluck, add indexes and process large data in bounded batches.

**Detailed explanation**

Measure SQL and rows loaded; fix N+1 with suitable preloading, use selective queries/pluck, add indexes and process large data in bounded batches. includes may switch between preloading and joins; select partial models carefully and compare EXPLAIN plans. Bullet detects patterns but does not replace measurement.

**Practical example**

```ruby
User.preload(:posts).find_each { |u| u.posts.each { |p| puts p.title } }
```

**Important points and follow-ups**

- includes may switch between preloading and joins; select partial models carefully and compare EXPLAIN plans. Bullet detects patterns but does not replace measurement.

**Source references**

- SRC-00212 — [twelve.txt:16–18](../ruby/twelve.txt) · [complete source](sources/twelve.md)


---

<a id="c-0021"></a>

### C-0021 — How would you create a new database in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How would you create a new database in Rails?

**Direct answer**

To create a new database in Rails, you typically use the following command in your terminal:

**Detailed explanation**

To create a new database in Rails, you typically use the following command in your terminal:

rails db:create
This command utilizes the database configuration specified in your config/database.yml file to create the database. Ensure that your database user has the necessary permissions to create databases. The environment that is used is determined by RAILS_ENV (defaults to development).

**Practical example**

```bash
rails db:create
This command utilizes the database configuration specified in your config/database.yml file to create the database. Ensure that your database user has the necessary permissions to create databases. The environment that is used is determined by RAILS_ENV (defaults to development).
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01489 — [twentyseven.txt:372–377](../ruby/twentyseven.txt) (Open-46) · [complete source](sources/twentyseven.md)


---

<a id="c-0022"></a>

### C-0022 — How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries?

**Direct answer**

Measure the query and request first, then reduce unnecessary rows/work, fix N+1 access, and add indexes justified by the query plan.

**Detailed explanation**

Use SQL logs and database EXPLAIN, or EXPLAIN ANALYZE in a suitable environment, to inspect scans, joins, estimates and sorts. Select needed columns, paginate, batch writes and avoid repeated queries. Check query count and latency before and after the change. Caching can help repeated reads but should not hide an incorrect query or stale authorization boundary.

**Practical example**

```ruby
User.where(active: true).order(:id).limit(100).pluck(:id, :email)
# Inspect the generated SQL and plan before adding an index.
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Source references**

- SRC-00841 — [thirtyfive.txt:199–204](../ruby/thirtyfive.txt) (01) · [complete source](sources/thirtyfive.md)


---

<a id="c-0023"></a>

### C-0023 — In Rails, what is the key difference between using where and find_by in Active Record queries?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

In Rails, what is the key difference between using where and find_by in Active Record queries?

**Direct answer**

Option 2: `where` returns an Active Record relation (even if empty or containing one record), while `find_by` returns the first matching record or `nil` if no record is found.

**Detailed explanation**

The correct choice is `where` returns an Active Record relation (even if empty or containing one record), while `find_by` returns the first matching record or `nil` if no record is found. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: `where` returns an Active Record relation (even if empty or containing one record), while `find_by` returns the first matching record or `nil` if no record is found.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01561 — [twentyseven.txt:1016–1027](../ruby/twentyseven.txt) (MCQ-13) · [complete source](sources/twentyseven.md)


---

<a id="c-0024"></a>

### C-0024 — What are database transactions and how are they implemented in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 4

**Interview question**

What are database transactions and how are they implemented in Rails?

**Direct answer**

Wrap related writes in an Active Record transaction so they commit together or roll back together on failure.

**Detailed explanation**

Use bang persistence methods when invalid data must abort the block; save returning false alone does not automatically roll back earlier writes. Transactions are scoped to a database connection, not an atomic unit across unrelated databases or external APIs. ActiveRecord::Rollback rolls back without escaping the block. Run external side effects after commit or through an outbox.

**Practical example**

```text
ApplicationRecord.transaction do
  user.save!
  order.save!
end
```

**Important points and follow-ups**

- Nested transactions normally join the outer transaction; requires_new: true uses a savepoint where supported.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00651 — [fifteen.txt:92–92](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00833 — [thirtyfive.txt:125–134](../ruby/thirtyfive.txt) (03) · [complete source](sources/thirtyfive.md)
- SRC-01073 — [thirtytwo.txt:46–54](../ruby/thirtytwo.txt) (6) · [complete source](sources/thirtytwo.md)
- SRC-01125 — [twenty.txt:208–220](../ruby/twenty.txt) (27) · [complete source](sources/twenty.md)


---

<a id="c-0025"></a>

### C-0025 — What are joins and includes in Rails? How are they different?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What are joins and includes in Rails? How are they different?

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Source references**

- SRC-01256 — [twentyfive.txt:335–352](../ruby/twentyfive.txt) (58) · [complete source](sources/twentyfive.md)


---

<a id="c-0026"></a>

### C-0026 — What is a database schema in Rails?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is a database schema in Rails?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01267 — [twentyfive.txt:468–470](../ruby/twentyfive.txt) (69) · [complete source](sources/twentyfive.md)


---

<a id="c-0027"></a>

### C-0027 — What is a database? What is a common database used with Rails?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is a database? What is a common database used with Rails?

**Direct answer**

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are usually controlled by a database management system (DBMS). Data, DBMS and the associated applications are referred to as a database system.

**Detailed explanation**

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are usually controlled by a database management system (DBMS). Data, DBMS and the associated applications are referred to as a database system.

PostgreSQL is a common database used with Rails. Other popular choices include MySQL and SQLite. Rails provides excellent support, including ActiveRecord ORM, making it easy to interact with these databases.

**Practical example**

```text
A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are usually controlled by a database management system (DBMS). Data, DBMS and the associated applications are referred to as a database system.

PostgreSQL is a common database used with Rails. Other popular choices include MySQL and SQLite. Rails provides excellent support, including ActiveRecord ORM, making it easy to interact with these databases.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01486 — [twentyseven.txt:342–346](../ruby/twentyseven.txt) (Open-43) · [complete source](sources/twentyseven.md)


---

<a id="c-0028"></a>

### C-0028 — What is a join table in Rails and how do you create one using generator?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is a join table in Rails and how do you create one using generator?

**Direct answer**

A join table stores keys linking records from two tables for a many-to-many relationship.

**Detailed explanation**

The conventional table name orders the plural table names lexically: groups_users, not users_groups. A HABTM join table generally disables its primary key; has_many :through uses a join model and can have extra attributes. Add indexes and foreign keys based on the access pattern.

**Practical example**

```bash
bin/rails generate migration CreateJoinTableUsersGroups users groups
# In the generated migration:
create_join_table :users, :groups do |t|
  t.index [:user_id, :group_id], unique: true
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01071 — [thirtytwo.txt:37–42](../ruby/thirtytwo.txt) (4) · [complete source](sources/thirtytwo.md)


---

<a id="c-0029"></a>

### C-0029 — What is Active Record in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 14

**Interview question**

What is Active Record in Ruby on Rails?

**Direct answer**

Active Record is Rails’ Object-Relational Mapping layer: model classes usually represent tables, instances represent rows, and attributes represent columns.

**Detailed explanation**

It supplies query relations, persistence, type casting, associations, validations, callbacks, and migrations. It does not remove the need to understand SQL, indexes, transaction boundaries, or database constraints. Model objects can also be non-persistent Active Model objects, so not every Rails model must map to a table.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- Active Record is a Rails component, not part of Ruby core.
- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html
- ORM means Object-Relational Mapping, not Object Relationship Model.
- Application validations alone cannot enforce uniqueness under concurrency.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00375 — [ten.txt:44–46](../ruby/ten.txt) (4) · [complete source](sources/ten.md)
- SRC-00707 — [thirty.txt:97–99](../ruby/thirty.txt) (23) · [complete source](sources/thirty.md)
- SRC-00803 — [thirtyeight.txt:212–213](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00819 — [thirtyeight.txt:250–252](../ruby/thirtyeight.txt) (4) · [complete source](sources/thirtyeight.md)
- SRC-00824 — [thirtyfive.txt:37–44](../ruby/thirtyfive.txt) (04) · [complete source](sources/thirtyfive.md)
- SRC-00855 — [thirtyfour.txt:24–24](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01032 — [thirtyseven.txt:71–78](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01068 — [thirtytwo.txt:23–25](../ruby/thirtytwo.txt) (1) · [complete source](sources/thirtytwo.md)
- SRC-01103 — [twenty.txt:51–55](../ruby/twenty.txt) (5) · [complete source](sources/twenty.md)
- SRC-01202 — [twentyfive.txt:26–28](../ruby/twentyfive.txt) (4) · [complete source](sources/twentyfive.md)
- SRC-01354 — [twentytwo.txt:212–219](../ruby/twentytwo.txt) (9) · [complete source](sources/twentytwo.md)
- SRC-01399 — [twentythree.txt:47–52](../ruby/twentythree.txt) (Q7) · [complete source](sources/twentythree.md)
- SRC-01453 — [twentyseven.txt:92–101](../ruby/twentyseven.txt) (Open-10) · [complete source](sources/twentyseven.md)
- SRC-01476 — [twentyseven.txt:264–272](../ruby/twentyseven.txt) (Open-33) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00375 (ten.txt)</summary>

**Original prompt:** What is Active Record in Rails?

**Answer:** Active Record is Rails’ object-relational mapping layer, exposing database rows through Ruby objects and query relations, with associations, validations and callbacks.

A model typically maps to a table by naming convention; objects represent rows and columns become attributes. Relations compose and usually execute lazily. Model validations help user-facing correctness, but database constraints are needed for integrity under concurrent requests. Query methods still generate SQL and can be inefficient or unsafe if raw interpolated fragments are supplied.

```ruby
class User < ApplicationRecord
  has_many :posts
  validates :email, presence: true
end
User.where(active: true).order(:id).limit(20)
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00707 (thirty.txt)</summary>

**Original prompt:** What exactly is the role of Active Record in Ruby?

**Answer:** Active Record is Rails’ Object-Relational Mapping library, providing persistence, query composition, associations, validations and lifecycle callbacks.

By convention, User maps to users and each instance represents one row. It is a Rails component, not a Ruby language subsection. It generates SQL but does not remove the need for constraints, indexing or safe raw-query practices.

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
User.where(active: true).limit(20)
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00803 (thirtyeight.txt)</summary>

**Original prompt:** What is Active Record in Ruby on Rails?

**Answer:** ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

</details>


---

<a id="c-0030"></a>

### C-0030 — What is the active_record query interface in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the active_record query interface in Rails?

**Direct answer**

Active Record relations build composable SQL queries with methods such as where, joins, order, select, limit, group and having.

**Detailed explanation**

Relations are normally lazy until materialized by iteration, to_a, first or other terminal operations. Methods such as pluck and count execute focused queries without loading full models. Use scopes to name domain-level filters and examine generated SQL when performance matters.

**Practical example**

```text
Order.where(status: "paid").group(:user_id).having("COUNT(*) > ?", 3).count
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00922 — [thirtyfour.txt:92–92](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="c-0031"></a>

### C-0031 — What is the difference between ActiveRecord and Mongoid?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between ActiveRecord and Mongoid?

**Direct answer**

Active Record maps relational rows and associations; Mongoid maps MongoDB documents and supports embedding/references. Both require intentional schema, consistency and indexing design.

**Detailed explanation**

Active Record maps relational rows and associations; Mongoid maps MongoDB documents and supports embedding/references. Both require intentional schema, consistency and indexing design. MongoDB/Mongoid support multi-document ACID transactions on suitable deployments. "Mongoid means eventual consistency/no migrations" is an inaccurate absolute; document schema changes still need migration/backfill planning.

**Practical example**

```text
# Relational example:
# class Order < ApplicationRecord; belongs_to :user; end
# Document example requires Mongoid::Document and configured MongoDB.
```

**Important points and follow-ups**

- Verification: https://www.mongodb.com/docs/mongoid/current/interact-data/transaction/

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- MongoDB/Mongoid support multi-document ACID transactions on suitable deployments. "Mongoid means eventual consistency/no migrations" is an inaccurate absolute; document schema changes still need migration/backfill planning.

**Source references**

- SRC-00193 — [six.txt:1585–1669](../ruby/six.txt) (Q17) · [complete source](sources/six.md)


---

<a id="c-0032"></a>

### C-0032 — What is the difference between includes, joins, and eager_load?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between includes, joins, and eager_load?

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Source references**

- SRC-01122 — [twenty.txt:176–181](../ruby/twenty.txt) (24) · [complete source](sources/twenty.md)


---

<a id="c-0033"></a>

### C-0033 — What is the difference between optimistic and pessimistic locking in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between optimistic and pessimistic locking in Rails?

**Direct answer**

Optimistic locking detects stale writes with lock_version; pessimistic locking acquires a database row lock for a transaction.

**Detailed explanation**

Optimistic locking raises ActiveRecord::StaleObjectError and is useful when conflicts are uncommon. Pessimistic locking prevents conflicting writers from proceeding concurrently but can cause lock waits or deadlocks. Keep locked transactions short and lock resources in a consistent order. A row lock outside a surrounding transaction is released too early to protect later work.

**Practical example**

```text
account.with_lock do
  account.update!(balance: account.balance - 10)
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A row lock must be held in a transaction protecting the following operation; use with_lock or an explicit transaction.

**Source references**

- SRC-01283 — [twentyfive.txt:602–611](../ruby/twentyfive.txt) (85) · [complete source](sources/twentyfive.md)


---

<a id="c-0034"></a>

### C-0034 — What is the importance of database indexing, and how do you implement it in Rails?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 2

**Interview question**

What is the importance of database indexing, and how do you implement it in Rails?

**Direct answer**

An index accelerates suitable lookups, joins and ordering at the cost of storage and write overhead.

**Detailed explanation**

Choose column order to match real filter/sort patterns; a composite index is not interchangeable with every single-column index. Unique indexes also enforce integrity. For large PostgreSQL tables, consider concurrent creation in a separate migration that disables the surrounding DDL transaction, after checking adapter support.

**Practical example**

```text
add_index :orders, [:user_id, :created_at]
add_index :users, :email, unique: true
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00948 — [thirtyfour.txt:119–119](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01278 — [twentyfive.txt:533–539](../ruby/twentyfive.txt) (80) · [complete source](sources/twentyfive.md)


---

<a id="c-0035"></a>

### C-0035 — When is the after_create callback in an Active Record model triggered?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

When is the after_create callback in an Active Record model triggered?

**Direct answer**

Option 2: After a new record is successfully saved to the database.

**Detailed explanation**

The correct choice is After a new record is successfully saved to the database. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: After a new record is successfully saved to the database.
```

**Important points and follow-ups**

- after_create is before the surrounding transaction commits; it is not after_create_commit.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01555 — [twentyseven.txt:942–953](../ruby/twentyseven.txt) (MCQ-7) · [complete source](sources/twentyseven.md)


---

<a id="c-0036"></a>

### C-0036 — Which of the following best describes the primary purpose of using scopes in Rails models?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Which of the following best describes the primary purpose of using scopes in Rails models?

**Direct answer**

Option 2: To encapsulate common Active Record queries, making them reusable and more readable.

**Detailed explanation**

The correct choice is To encapsulate common Active Record queries, making them reusable and more readable. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To encapsulate common Active Record queries, making them reusable and more readable.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01570 — [twentyseven.txt:1128–1141](../ruby/twentyseven.txt) (MCQ-22) · [complete source](sources/twentyseven.md)


---

<a id="c-0037"></a>

### C-0037 — Which of the following statements best describes the belongs_to association in Rails Active Record?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Which of the following statements best describes the belongs_to association in Rails Active Record?

**Direct answer**

Option 2: It defines a one-to-one or one-to-many relationship where the current model has a foreign key pointing to another model, indicating that each instance of the current model belongs to one instance of the other model.

**Detailed explanation**

The correct choice is It defines a one-to-one or one-to-many relationship where the current model has a foreign key pointing to another model, indicating that each instance of the current model belongs to one instance of the other model. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: It defines a one-to-one or one-to-many relationship where the current model has a foreign key pointing to another model, indicating that each instance of the current model belongs to one instance of the other model.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01554 — [twentyseven.txt:930–941](../ruby/twentyseven.txt) (MCQ-6) · [complete source](sources/twentyseven.md)


---

<a id="c-0038"></a>

### C-0038 — How does counter_cache work and when would you use it?

**Difficulty:** Intermediate · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How does counter_cache work and when would you use it?

**Direct answer**

A counter cache stores an association count on the parent, updated as child records are created or destroyed through supported Active Record operations.

**Detailed explanation**

Declare counter_cache on the belongs_to side and add/backfill the parent count column. size can use the counter when the association is unloaded; count generally still queries. Direct SQL and bulk updates can bypass maintenance, so plan reconciliation and concurrent backfill carefully.

**Practical example**

```ruby
class Comment < ApplicationRecord
  belongs_to :post, counter_cache: true
end
# posts.comments_count integer default 0, null: false
post.comments.size
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Counter caches primarily help association size and avoid loading/count queries in supported paths; count generally still issues SQL.

**Source references**

- SRC-01322 — [twentysix.txt:36–39](../ruby/twentysix.txt) (8) · [complete source](sources/twentysix.md)

