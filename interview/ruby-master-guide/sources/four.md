# Source ledger: four.txt

SHA-256: `0122c9fe88a7cc37d77b586d0b055218175798cfe1df8c1f09202de4a64151bf`

110 physical lines; 10 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00152 | 12–19 | [A-0132](../A-ruby.md#a-0132) | What are the main features of Ruby? |
| SRC-00153 | 20–29 | [A-0228](../A-ruby.md#a-0228) | Explain the difference between proc and lambda in Ruby. |
| SRC-00154 | 30–35 | [F-0094](../F-advanced.md#f-0094) | How does Ruby's garbage collection work? |
| SRC-00155 | 36–40 | [A-0362](../A-ruby.md#a-0362) | What are symbols in Ruby, and when should you use them? |
| SRC-00156 | 41–46 | [A-0274](../A-ruby.md#a-0274) | What is a module in Ruby, and how is it different from a class? |
| SRC-00157 | 47–62 | [A-0101](../A-ruby.md#a-0101) | How do you handle exceptions in Ruby? |
| SRC-00158 | 63–81 | [A-0245](../A-ruby.md#a-0245) | Explain the concept of mixins in Ruby. |
| SRC-00159 | 82–88 | [A-0166](../A-ruby.md#a-0166) | What is self in Ruby? |
| SRC-00160 | 89–100 | [A-0319](../A-ruby.md#a-0319) | How do you define and use a singleton method in Ruby? |
| SRC-00161 | 101–110 | [E-0052](../E-scenarios.md#e-0052) | How would you optimize the performance of a Ruby application? |

## Complete original text

```text
Ruby Interview Questions - Part 1
#
ruby
#
career
#
rails
#
programming
When preparing for a Ruby test, especially in an interview setting, it's important to cover key concepts and be ready to demonstrate your knowledge through code. Here are some common questions and sample answers to help you prepare:

1. What are the main features of Ruby?
Answer:

Ruby is an object-oriented programming language, which means everything is an object.
It is dynamically typed and uses garbage collection for memory management.
Ruby supports multiple programming paradigms, including procedural, object-oriented, and functional programming.
It has a simple and easy-to-read syntax, emphasising convention over configuration.
Ruby has a rich standard library and a vibrant ecosystem, particularly around web development with frameworks like Ruby on Rails.
2. Explain the difference between proc and lambda in Ruby.
Answer:

Both proc and lambda are used to create blocks of code that can be stored in variables and passed around, but they behave differently.
Lambda:
Enforces the number of arguments passed to it. If the wrong number of arguments is provided, it raises an error.
Returns from itself, not from the method that called it.
Proc:
Does not strictly enforce the number of arguments. Missing arguments will be set to nil.
Returns from the method that is called it, which can cause the enclosing method to return early if not handled properly.
3. How does Ruby's garbage collection work?
Answer:

Ruby uses a mark-and-sweep garbage collection algorithm. Objects that are no longer referenced or accessible are "marked" for deletion.
The garbage collector then "sweeps" through and frees up memory occupied by these unreferenced objects.
Ruby 2.1 introduced a generational garbage collector, which divides objects into different generations based on their lifespan, optimizing the process by focusing more on newly created objects that are more likely to become garbage.
4. What are symbols in Ruby, and when should you use them?
Answer:

Symbols in Ruby are immutable, reusable constants represented internally by an integer value. They are often used as identifiers, keys in hashes, or for representing method names.
Unlike strings, symbols are immutable, which makes them memory-efficient for use cases where the same value is used repeatedly, such as in hash keys or constant values.
5. What is a module in Ruby, and how is it different from a class?
Answer:

A module in Ruby is a collection of methods and constants. It is similar to a class but cannot be instantiated or inherited.
Modules are often used for namespacing and as a mixin to add functionality to classes via include or extend.
The primary difference between a module and a class is that a class can be instantiated to create objects, whereas a module cannot. Modules are also used to achieve multiple inheritance by mixing in functionalities to classes.
6. How do you handle exceptions in Ruby?
Answer:

Ruby uses the begin...rescue...ensure block to handle exceptions.
begin starts the block of code where exceptions might occur.
rescue defines the code to be run if an exception occurs.
ensure is an optional block that runs regardless of whether an exception was raised, often used for cleanup activities.
Example:

 begin
   # Code that might raise an exception
 rescue StandardError => e
   puts "An error occurred: #{e.message}"
 ensure
   puts "This will run whether an exception occurred or not."
 end
7. Explain the concept of mixins in Ruby.
Answer:

Mixins are a way to share code between classes using modules. By including a module in a class, you can "mix in" the module's methods and constants into that class.
Mixins allow Ruby to support multiple inheritance since a class can include many modules.
Example:

 module Walkable
   def walk
     "I'm walking!"
   end
 end

 class Person
   include Walkable
 end

 p = Person.new
 p.walk # => "I'm walking!"
8. What is self in Ruby?
Answer:

self refers to the current object instance in Ruby. It is a special variable that points to the object that is currently being operated on.
Inside an instance method, self refers to the instance of the class.
Inside a class method, self refers to the class itself.
Understanding self is crucial for defining instance methods, class methods, and working with scope.
9. How do you define and use a singleton method in Ruby?
Answer:

A singleton method is a method that is defined for a single instance of an object, rather than for all instances of the class.
Example:

 str = "Hello"
 def str.shout
   self.upcase + "!!!"
 end

 str.shout # => "HELLO!!!"
10. How would you optimize the performance of a Ruby application?
Answer:

Use memoization to avoid recomputation.
Profile the application to identify bottlenecks using tools like ruby-prof or StackProf.
Optimize database queries by using eager loading (e.g., includes) to reduce the number of queries.
Use caching (e.g., fragment caching, page caching) to reduce the load on the server.
Optimize code algorithms and logic for efficiency, avoid unnecessary computations, and use efficient data structures.
Offload expensive tasks to background jobs (e.g., using Sidekiq).
I hope that Helps!!
```
