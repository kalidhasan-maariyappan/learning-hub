# Source ledger: twelve.txt

SHA-256: `1dcafd5175869a1b6c7607a94f870df7e82ff78d72aa5828f76e68bde1bd8e70`

29 physical lines; 10 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00207 | 1–3 | [A-0269](../A-ruby.md#a-0269) | What are the core principles of object-oriented programming that are essential in Ruby development? |
| SRC-00208 | 4–6 | [F-0084](../F-advanced.md#f-0084) | How to implement metaprogramming in Ruby to improve code flexibility? |
| SRC-00209 | 7–9 | [B-0093](../B-rails.md#b-0093) | What are the advanced features of the Ruby on Rails framework? |
| SRC-00210 | 10–12 | [F-0038](../F-advanced.md#f-0038) | What are the strategies to create efficient Domain-Specific Languages (DSLs) in Ruby? |
| SRC-00211 | 13–15 | [E-0010](../E-scenarios.md#e-0010) | What are the best practices for structuring a large Rails application? |
| SRC-00212 | 16–18 | [C-0020](../C-database-sql.md#c-0020) | How to optimize ActiveRecord queries in Rails for better performance? |
| SRC-00213 | 19–21 | [D-0062](../D-coding.md#d-0062) | What are the different techniques to implement polymorphism in Ruby on Rails? |
| SRC-00214 | 22–24 | [D-0013](../D-coding.md#d-0013) | How to design and implement callbacks safely in Rails models? |
| SRC-00215 | 25–27 | [B-0096](../B-rails.md#b-0096) | What are the common methods for error handling in Ruby and Rails? |
| SRC-00216 | 28–29 | [A-0109](../A-ruby.md#a-0109) | How to use Ruby's introspection capabilities to create more maintainable code? |

## Complete original text

```text
What are the core principles of object-oriented programming that are essential in Ruby development?
The core principles of object-oriented programming essential in Ruby development are encapsulation, inheritance, polymorphism, and abstraction. These principles enable Ruby developers to structure code into reusable and maintainable classes and modules, making applications easier to extend and manage.

How to implement metaprogramming in Ruby to improve code flexibility?
Metaprogramming in Ruby can be implemented using methods like define_method, method_missing, send, and class_eval. These techniques allow developers to dynamically define methods, intercept method calls, and modify classes at runtime, thus improving code flexibility and reducing duplication.

What are the advanced features of the Ruby on Rails framework?
Advanced features of the Ruby on Rails framework include ActiveJob for background processing, ActionCable for real-time WebSockets, concerns for shared behavior, service objects for business logic, and engines for modularization. These features help in building scalable and maintainable web applications.

What are the strategies to create efficient Domain-Specific Languages (DSLs) in Ruby?
Efficient DSLs in Ruby are created by leveraging Ruby’s flexible syntax, blocks, open classes, and method_missing. Key strategies involve designing intuitive APIs, minimizing boilerplate code, and utilizing instance_eval or class_eval to execute blocks within relevant contexts. Careful documentation and clear naming conventions also contribute to DSL usability.

What are the best practices for structuring a large Rails application?
Best practices for structuring a large Rails application include using service and presenter objects to organize business logic, separating concerns with modules and concerns, employing Rails Engines for modular features, and following the SOLID principles. Properly organizing the directory structure and maintaining clear API boundaries are also essential.

How to optimize ActiveRecord queries in Rails for better performance?
ActiveRecord queries in Rails can be optimized by using eager loading (includes), selecting only necessary fields (select), batching queries (find_in_batches), applying appropriate indexing at the database level, and avoiding N+1 query problems. Profiling queries with tools like Bullet and leveraging database-level caching strategies are common techniques.

What are the different techniques to implement polymorphism in Ruby on Rails?
Polymorphism in Ruby on Rails can be implemented using polymorphic associations, single table inheritance (STI), and duck typing. Polymorphic associations allow a model to belong to more than one other model using a single association, while STI stores different types of related objects in the same database table.

How to design and implement callbacks safely in Rails models?
Callbacks in Rails models are implemented using before, after, and around hooks. To use them safely, logic in callbacks should be minimal, idempotent, and thoroughly tested. It’s recommended to avoid business-critical logic in callbacks, encapsulate callback logic in services when possible, and be aware of callback ordering and side effects.

What are the common methods for error handling in Ruby and Rails?
Error handling in Ruby and Rails is typically managed using begin-rescue-end blocks, custom exception classes, and Rails’ built-in rescue_from in controllers. Logging errors, notifying monitoring services (like Sentry), and providing user-friendly error messages are standard practices for robust error management.

How to use Ruby's introspection capabilities to create more maintainable code?
Ruby’s introspection capabilities, such as respond_to?, method, instance_variables, and ancestors, can be used to inspect objects and classes at runtime. Utilizing these features allows developers to write generic, maintainable code that adapts to change and supports dynamic features, such as plugins or extensible frameworks.
```
