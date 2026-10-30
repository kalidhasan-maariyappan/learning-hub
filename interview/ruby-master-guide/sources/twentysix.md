# Source ledger: twentysix.txt

SHA-256: `41c27e9a8a355a819b9c1c5f334d913777a9737cf18f2579facf900760dfba5b`

143 physical lines; 32 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-01314 | 13–15 | [B-0362](../B-rails.md#b-0362) | What is the Rails request lifecycle? |
| SRC-01315 | 16–18 | [F-0025](../F-advanced.md#f-0025) | How does Rails autoloading work in Zeitwerk mode? |
| SRC-01316 | 19–21 | [B-0018](../B-rails.md#b-0018) | Explain the difference between before_action, around_action, and after_action. |
| SRC-01317 | 22–26 | [B-0105](../B-rails.md#b-0105) | What are concerns and when should you use them? |
| SRC-01318 | 23–24 | [F-0067](../F-advanced.md#f-0067) | What are service objects, and when would you use them? |
| SRC-01319 | 27–29 | [B-0241](../B-rails.md#b-0241) | What are the different types of ActiveRecord associations? |
| SRC-01320 | 30–32 | [E-0032](../E-scenarios.md#e-0032) | What is the N+1 query problem and how do you avoid it? |
| SRC-01321 | 33–35 | [C-0006](../C-database-sql.md#c-0006) | Difference between includes, joins, preload, and eager_load. |
| SRC-01322 | 36–39 | [C-0038](../C-database-sql.md#c-0038) | How does counter_cache work and when would you use it? |
| SRC-01323 | 40–42 | [C-0013](../C-database-sql.md#c-0013) | How do you optimize a slow SQL query in a Rails app? |
| SRC-01324 | 43–45 | [E-0016](../E-scenarios.md#e-0016) | How would you handle background jobs in Rails? Tools? |
| SRC-01325 | 46–48 | [C-0003](../C-database-sql.md#c-0003) | When would you use find_each vs all.each? |
| SRC-01326 | 49–51 | [B-0369](../B-rails.md#b-0369) | How do you cache partials and pages in Rails? |
| SRC-01327 | 52–55 | [C-0017](../C-database-sql.md#c-0017) | How does Rails handle database connection pooling? |
| SRC-01328 | 56–58 | [B-0383](../B-rails.md#b-0383) | What are the differences between unit, functional, and integration tests in Rails? |
| SRC-01329 | 59–61 | [B-0387](../B-rails.md#b-0387) | What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)? |
| SRC-01330 | 62–64 | [B-0375](../B-rails.md#b-0375) | How do you mock external APIs in tests? |
| SRC-01331 | 65–67 | [E-0017](../E-scenarios.md#e-0017) | How do you test background jobs or mailers in Rails? |
| SRC-01332 | 68–71 | [B-0389](../B-rails.md#b-0389) | What’s your strategy for writing maintainable tests? |
| SRC-01333 | 72–74 | [C-0015](../C-database-sql.md#c-0015) | How does Rails protect against SQL injection? |
| SRC-01334 | 75–77 | [B-0190](../B-rails.md#b-0190) | What is CSRF protection and how does Rails implement it? |
| SRC-01335 | 78–80 | [B-0063](../B-rails.md#b-0063) | How do you securely handle file uploads in Rails? |
| SRC-01336 | 81–84 | [B-0089](../B-rails.md#b-0089) | What are mass-assignment vulnerabilities and how are they prevented? |
| SRC-01337 | 85–87 | [E-0051](../E-scenarios.md#e-0051) | How does Rails handle multi-tenancy? |
| SRC-01338 | 88–90 | [B-0056](../B-rails.md#b-0056) | How would you implement soft deletes in Rails? |
| SRC-01339 | 91–93 | [E-0011](../E-scenarios.md#e-0011) | What are your strategies for handling large datasets (e.g., pagination, streaming)? |
| SRC-01340 | 94–96 | [B-0198](../B-rails.md#b-0198) | Have you worked with WebSockets in Rails (e.g., ActionCable)? |
| SRC-01341 | 97–100 | [E-0053](../E-scenarios.md#e-0053) | How would you profile and debug a performance bottleneck in a Rails app? |
| SRC-01342 | 101–103 | [B-0091](../B-rails.md#b-0091) | What are some common anti-patterns you’ve seen in Rails apps? |
| SRC-01343 | 104–106 | [E-0010](../E-scenarios.md#e-0010) | How do you structure a large Rails application (e.g., modularization, boundaries)? |
| SRC-01344 | 107–109 | [B-0290](../B-rails.md#b-0290) | What gems do you consider essential in most Rails projects? |
| SRC-01345 | 110–111 | [B-0048](../B-rails.md#b-0048) | How do you ensure your code stays maintainable as a Rails app grows? |

## Complete original text

```text
Ruby on Rails Interview Questions with Answers (Experienced Level)
Vijay Kumar
Vijay Kumar

Follow
4 min read
·
May 13, 2025



Core Ruby on Rails
Q1: What is the Rails request lifecycle?
A: The Rails request lifecycle involves routing, controller actions, model interactions, and view rendering. It starts with the router parsing the request, then calling the appropriate controller action, which may interact with models, and ends with rendering a response.

Q2: How does Rails autoloading work in Zeitwerk mode?
A: Zeitwerk autoloads classes by mapping constant names to file paths based on conventions. It loads files only when a constant is accessed for the first time, improving performance and avoiding the need for manual requires.

Q3: Explain the difference between before_action, around_action, and after_action.
A: before_action runs before the controller action, around_action wraps the action (like a transaction), and after_action runs after the controller action completes.

Q4: What are concerns and when should you use them?
A: Concerns are modules used to extract reusable code from models or controllers. Use them to reduce duplication and improve code organization. Q: What are service objects, and when would you use them?
A: Service objects encapsulate business logic outside of models/controllers. Use them for actions like payments, complex validations, or third-party API calls.

ActiveRecord & Associations
Q5: What are the different types of ActiveRecord associations?
A: belongs_to, has_one, has_many, has_many :through, and has_and_belongs_to_many.

Q6: What is the N+1 query problem and how do you avoid it?
A: It occurs when each record fetches related records individually. Avoid it with eager loading: `includes`, `joins`, or `preload`.

Q7: Difference between includes, joins, preload, and eager_load.
A: `includes` performs eager loading with separate queries, `joins` is for SQL joins, `preload` is similar to includes but always separate queries, `eager_load` forces a LEFT OUTER JOIN.

Q8: How does counter_cache work and when would you use it?
A: It caches the count of associated records (e.g. comments_count on posts). Improves performance for `.count` queries.

Performance & Optimization
Q9: How do you optimize a slow SQL query in a Rails app?
A: Use indexes, analyze query plans, reduce data with pagination, and optimize ActiveRecord queries.

Q10: How would you handle background jobs in Rails? Tools?
A: Use ActiveJob with tools like Sidekiq, Resque, or DelayedJob to process jobs asynchronously.

Q11: When would you use find_each vs all.each?
A: `find_each` loads records in batches (default 1000), reducing memory. `all.each` loads all records at once.

Q12: How do you cache partials and pages in Rails?
A: Use fragment caching (`cache do`), Russian doll caching, or low-level caching with `Rails.cache`.

Q13: How does Rails handle database connection pooling?
A: Through the `pool` setting in `database.yml`. Rails maintains a pool of DB connections shared across threads.

Testing & Quality
Q14: What are the differences between unit, functional, and integration tests in Rails?
A: Unit tests check models, functional test controllers, and integration tests check end-to-end flows.

Q15: What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)?
A: RSpec for unit/spec testing, Capybara for integration/UI testing, FactoryBot for test data, Faker for fake data.

Q16: How do you mock external APIs in tests?
A: Use gems like WebMock or VCR to stub HTTP requests and simulate API responses.

Q17: How do you test background jobs or mailers in Rails?
A: Use `ActiveJob::TestHelper` and `perform_enqueued_jobs`, or tools like Sidekiq testing helpers.

Q18: What’s your strategy for writing maintainable tests?
A: Keep tests independent, use factories, name clearly, follow arrange-act-assert pattern, and aim for coverage without over-testing.

Security
Q19: How does Rails protect against SQL injection?
A: By using parameterized queries (`where(name: params[:name])`) rather than string interpolation.

Q20: What is CSRF protection and how does Rails implement it?
A: Cross-Site Request Forgery protection uses authenticity tokens to validate form submissions.

Q21: How do you securely handle file uploads in Rails?
A: Use gems like ActiveStorage or Shrine, validate file types and sizes, and store uploads outside the public folder.

Q22: What are mass-assignment vulnerabilities and how are they prevented?
A: They occur when users can set protected attributes. Rails uses `strong_parameters` to whitelist params.

Advanced Topics
Q23: How does Rails handle multi-tenancy?
A: Through scoped models, schemas, or gems like Apartment or ActsAsTenant.

Q24: How would you implement soft deletes in Rails?
A: Use a `deleted_at` column and scope queries to `where(deleted_at: nil)`, or gems like paranoia.

Q25: What are your strategies for handling large datasets (e.g., pagination, streaming)?
A: Use pagination (Kaminari/WillPaginate), batch processing, or streaming APIs like `find_each`, `Enumerator`, `CSV.generate_stream`.

Q26: Have you worked with WebSockets in Rails (e.g., ActionCable)?
A: Yes, ActionCable integrates WebSockets for real-time features like notifications or chats.

Q27: How would you profile and debug a performance bottleneck in a Rails app?
A: Use tools like rack-mini-profiler, bullet, Skylight, or NewRelic; check logs, slow queries, memory usage.

Opinion/Design-Based
Q28: What are some common anti-patterns you’ve seen in Rails apps?
A: Fat models, logic in controllers, overuse of callbacks, lack of service layers.

Q29: How do you structure a large Rails application (e.g., modularization, boundaries)?
A: Use service objects, presenters, form objects, concerns, and possibly engines or the Interactor pattern.

Q30: What gems do you consider essential in most Rails projects?
A: Pundit or CanCanCan, Devise, Kaminari, RSpec, FactoryBot, Faker, Sidekiq, dotenv-rails.

Q31: How do you ensure your code stays maintainable as a Rails app grows?
A: Consistent code style, modular design, test coverage, avoiding monolith logic in models/controllers.

Ruby On Rails

Advanced Topics

Security

Quality Testing

Performance Optimization



Vijay Kumar
Written by Vijay Kumar
3 followers
·
1 following

Follow
No responses yet
Unknown user
Write a response

What are your thoughts?

Cancel
Respond
More from Vijay Kumar
See all from Vijay Kumar
Recommended from Medium
See more recommendations
```
