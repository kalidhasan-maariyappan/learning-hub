# Source ledger: thirtyseven.txt

SHA-256: `59b554ea3974d32e999f2c374406ce217d8cc8287a598e1ab05d5edc2493fedf`

279 physical lines; 30 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-01023 | 12–16 | [B-0014](../B-rails.md#b-0014) | What is ORM in Rails? |
| SRC-01024 | 17–21 | [B-0282](../B-rails.md#b-0282) | Explain what is rake in Rails? |
| SRC-01025 | 22–28 | [B-0128](../B-rails.md#b-0128) | Explain what is Ruby on Rails? |
| SRC-01026 | 29–35 | [A-0113](../A-ruby.md#a-0113) | Is Ruby statically typed or dynamically typed? |
| SRC-01027 | 36–44 | [A-0265](../A-ruby.md#a-0265) | Tell me about getters and setters in Ruby |
| SRC-01028 | 45–51 | [A-0139](../A-ruby.md#a-0139) | What happens when you call a method in Ruby? |
| SRC-01029 | 52–56 | [B-0294](../B-rails.md#b-0294) | What is Gemfile? |
| SRC-01030 | 57–63 | [B-0295](../B-rails.md#b-0295) | What is Gemfile.lock? |
| SRC-01031 | 64–70 | [B-0102](../B-rails.md#b-0102) | What is MVC? |
| SRC-01032 | 71–78 | [C-0029](../C-database-sql.md#c-0029) | What is ActiveRecord? |
| SRC-01033 | 79–85 | [B-0185](../B-rails.md#b-0185) | How have you implemented authorization in the past? |
| SRC-01034 | 86–94 | [B-0117](../B-rails.md#b-0117) | What are callbacks? |
| SRC-01035 | 95–101 | [B-0020](../B-rails.md#b-0020) | When would you use the before_save or after_save callback? |
| SRC-01036 | 102–106 | [B-0027](../B-rails.md#b-0027) | What are initializers in Rails? |
| SRC-01037 | 107–113 | [B-0133](../B-rails.md#b-0133) | What is the difference between deleting and destroying? |
| SRC-01038 | 114–122 | [B-0345](../B-rails.md#b-0345) | What does “fat models, skinny controllers” mean? |
| SRC-01039 | 123–129 | [B-0346](../B-rails.md#b-0346) | What does "skinny controllers, skinny models" mean? |
| SRC-01040 | 130–138 | [B-0226](../B-rails.md#b-0226) | What is the difference between class methods and instance methods? |
| SRC-01041 | 139–147 | [B-0239](../B-rails.md#b-0239) | How does Rails manage database state? |
| SRC-01042 | 148–155 | [F-0055](../F-advanced.md#f-0055) | What Rails design patterns have you used? |
| SRC-01043 | 156–160 | [A-0238](../A-ruby.md#a-0238) | Does Ruby Allow Multiple Inheritance? |
| SRC-01044 | 161–167 | [A-0121](../A-ruby.md#a-0121) | Strongly or Weakly Typed Ruby? |
| SRC-01045 | 168–173 | [E-0020](../E-scenarios.md#e-0020) | What frameworks have you used for background jobs? |
| SRC-01046 | 174–178 | [A-0261](../A-ruby.md#a-0261) | How to declare a constructor in a Ruby class? |
| SRC-01047 | 179–185 | [B-0385](../B-rails.md#b-0385) | What is the logic behind the helper? |
| SRC-01048 | 186–194 | [A-0177](../A-ruby.md#a-0177) | When do we use "I" in Ruby? |
| SRC-01049 | 195–199 | [B-0114](../B-rails.md#b-0114) | What is a rack? |
| SRC-01050 | 200–210 | [A-0228](../A-ruby.md#a-0228) | What is the difference between a proc and a lambda? |
| SRC-01051 | 211–217 | [B-0120](../B-rails.md#b-0120) | What is PORO? |
| SRC-01052 | 218–221 | [C-0002](../C-database-sql.md#c-0002) | What is the difference between quantity, length and size? |

## Complete original text

```text
Questions And Answers
Jump to:
Junior Ruby on Rails interview questions

Middle Ruby on Rails interview questions

Senior Ruby on Rails interview questions

Junior Ruby on Rails Developer Interview Questions
01

What is ORM in Rails?
ORM tends towards an Object Relationship Model where classes map to a table in a database and objects map directly to rows in a table.

02

Explain what is rake in Rails?
Rake is Rubin's brand; it is a Ruby utility that replaces the Unix "make" utility and uses the "Rakefile" and ".rake" files to create a task list. In Rails, Rake is used for common administrative tasks such as migrating a database using scripts, loading a schema into a database, and so on.

03

Explain what is Ruby on Rails?
Ruby: It is an object-oriented programming language inspired by PERL and Python.

Rails: This is a framework used to build web applications.

04

Is Ruby statically typed or dynamically typed?
Ruby is dynamically typed. This is why you can change the type of a variable on the fly.

In Ruby, the following lines of code, executed one after the other, will not cause errors.

05

Tell me about getters and setters in Ruby
Getter allows you to access an instance variable. A setter allows you to set an instance variable.

You can manually define the getter and setter methods.

But Ruby provides three accessors that do the same and cleaner ones: attr_reader (getter), attr_writer (setter), and attr_accessor (setter and getter).

06

What happens when you call a method in Ruby?
A message containing the name of the method is sent to the object. If this method exists for an object, the object calls it.

This will become more obvious when you consider the send method in Ruby.

07

What is Gemfile?
In the Gemfile, we specify the dependencies for the Ruby application. It is located in the root directory of the project.

08

What is Gemfile.lock?
It contains records of the exact versions of the gemstones installed. This is so that the same versions can be installed if another computer clones the project.

In contrast, specifying the gem in the Gemfile without being tied to a specific version will simply install the latest version of the gem.

09

What is MVC?
MVC (Model-View-Controller) is the software design pattern that Rails is built on top of. He divides information processing into three parts.

The model manages data and logic. The view displays information. The controller takes input and prepares the data for the model or view.

10

What is ActiveRecord?
Active Record is an ORM (Object Relational Mapping) that maps models to database tables. This makes it easier to customize the application as we no longer need to write SQL directly to load, save, or delete objects.

It also provides some protection against SQL injection.

Mid Ruby on Rails Developer Interview Questions
01

How have you implemented authorization in the past?
Authorization (not to be confused with authentication) refers to allowing different types of users to have different levels of access in an application. This is useful when there are many types of users with different access levels.

Several gems like Pundit and CanCanCan implement authorization.

02

What are callbacks?
Callback is a misleading term. They are hooks in the lifecycle of an object on which you can execute methods.

There are a number of callbacks for creating, updating and destroying an object, such as before_validation, after_save, and after_destroy.

They are useful for conditional logic such as creating a linked contact record when creating a user record.

03

When would you use the before_save or after_save callback?
Updating an object after it has been saved requires an additional database transaction to save the update. So, if you are updating an attribute of an object, the before_save callback is more efficient.

But sometimes information about an object exists until it is stored (for example, id). So, if an id is required to create a linked post, that should be done in the after_save callback.

04

What are initializers in Rails?
Initializers contain configuration logic and are only run when the application is loaded. This means that the Rails server needs to be restarted if the initializers are changed. They are located in the / config / initializers directory.

05

What is the difference between deleting and destroying?
delete: deletes an entry.
destroy: removes the entry and performs callbacks.
The most common destruction callback in Rails applications is specified in associations in model files. For example, the example below removes related comments when the article is destroyed.

06

What does “fat models, skinny controllers” mean?
Business logic must exist in models, not controllers. This makes it easier to unit test your logic and makes it more reusable.

Controllers are just hands passing information between views and models.

This is usually given as advice to new Rails developers. This is actually not recommended, especially in large applications.

07

What does "skinny controllers, skinny models" mean?
As the codebase grows, fat models get out of hand, do too many things, and become unmanageable. Models need to be persistent without being overloaded with logic.

Models can be thinned by keeping the Single Responsibility Principle in mind and moving the logic out of the models to other design patterns such as utility objects.

08

What is the difference between class methods and instance methods?
Class methods are available in classes, and instance methods are available in instances (of course). They are usually used for different purposes.

For the Article class, the instance method can count the number of words in the body of a particular article. Although the class method can count the number of articles by a particular author in all articles (notice the difference in volume?).

Class methods are denoted by def self.method_name.

09

How does Rails manage database state?
The developer manually creates and adds instructions to the migration files.

They tell ActiveRecord how to change the existing state of the database. For this reason, deleting or modifying previous migrations can degrade the database and is not recommended.

Creating migration files manually differs from other frameworks like Django, where you specify the final state of the database and then migrations are automatically generated to make the necessary changes.

10

What Rails design patterns have you used?
There are a number of design patterns in Rails, including utility objects, value objects, form objects, request objects, view objects, policy objects, and decorators.

A detailed description of each is the topic of an entire post, but here's a great tutorial with examples.

Senior Ruby on Rails Developer Interview Questions
01

Does Ruby Allow Multiple Inheritance?
Ruby does not allow you to inherit from more than one parent class, but it does allow include and extend module mixins.

02

Strongly or Weakly Typed Ruby?
Ruby is strongly typed. If you try to evaluate "hello" + 3, an error will be thrown.

Basically, JavaScript is loosely typed and will just evaluate the same calculation as "hello3".

03

What frameworks have you used for background jobs?
Delayed::Job: Easy to set up and use. Queues are stored in a database table. If the same database is used for Delayed :: Job and production, then a large number of jobs can bottleneck the database.
Sidekiq: Uses Redis to enqueue jobs. Redis is an in-memory data store, so it is very fast. Sidekiq complicates the infrastructure because Redis needs to be added.
Sucker Punch: Runs as a Ruby process and saves all jobs in memory. If the process fails, the jobs are lost. Not recommended for critical applications.
04

How to declare a constructor in a Ruby class?
A constructor is defined using an initialization method that is called when a new instance of the class is initialized. No definition of this method is required. It is often used to provide attribute values ​​in new instances.

05

What is the logic behind the helper?
Helper logic should only support views.

A good candidate for a helper is date formatting logic, which is required in several different representations.

06

When do we use "I" in Ruby?
Use self when defining and calling class methods.

In a class, self refers to the current class, so it is required when a class method calls another class method.

self.class.method is required when an instance calls a class method.

07

What is a rack?
Rack is an API that sits between the web server and Rails. It allows you to connect and exchange frameworks like Rails with Sinatra, or web servers like Unicorn with Puma.

08

What is the difference between a proc and a lambda?
Both procs and lambda expressions are stored blocks, but the syntax and behavior are slightly different.

The lambda returns from itself, but the procedure returns from the method it is in.

 

Note that method_proc returns 1 because the call to the procedure ends execution inside the method.

09

What is PORO?
PORO stands for Plain Old Ruby Object.

While almost everything in Ruby is an object, ActiveRecord tends to use many complex objects. Thus, the term PORO usually means a small, simple object used to support business logic.

10

What is the difference between quantity, length and size?
count: Executes an SQL query to count the number of records. This is useful if the number of records may have changed in the database compared to memory.
length: Returns the number of elements in the collection in memory. It is easier than number because no database transactions are performed. It can also be used to count characters in a string.
size: This is a length alias that does the same.
hire_an_expert_01
Hiring Ruby on Rails developers? We have the people you are looking for!
Looking for vetted Ruby on Rails developers to join your team?
There are hundreds of battle-proven software development experts in our Talent Network.

Are you a Ruby on Rails developer looking for amazing projects? Join as a Talent

funds
funds
Business registry data:

IDEAMOTIVE Sp. z o.o.
Zlota 61/101, 00-819 Warsaw
Poland, European Union
NIP/VAT-ID: PL5272722655
KRS: 0000529079
hello@ideamotive.co

Company

About Us
Newsletter
Privacy Policy
Terms of Service
Contact
Services

Out of the box services
Find talent
Resources
Blog
Most desired experts

AI Developers
Machine Learning Engineers
Front-End Developers
Backend Developers
React developers
Ruby on Rails developers
Python developers
JavaScript developers
Angular Developers
Node.js Developers
Go/Golang Developers
IT Project Managers
UX/UI Designers
Product teams
Resources

Implementing Artificial Intelligence In Your Business
Python: The Definitive Business Guide
JavaScript: The Definitive Guide For Entrepreneurs and Product Owners
Node.js Development Business Guide
The State of Central & East Europe IT Outsourcing and Offshoring Report
Choosing React Native For Your Mobile Tech Stack
funds funds
funds
Rated 4.9 / 5.0 by 25 clien
```
