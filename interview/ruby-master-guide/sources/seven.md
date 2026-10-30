# Source ledger: seven.txt

SHA-256: `362e9ad5afbffc9c56b67a11306f809f0ab0bee6853fc4db8b82cfb7af2f893c`

417 physical lines; 25 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00217 | 23–42 | [A-0363](../A-ruby.md#a-0363) | What are the different types of variables in Ruby? |
| SRC-00218 | 43–51 | [A-0270](../A-ruby.md#a-0270) | What are the levels of access control for Ruby methods? |
| SRC-00219 | 52–68 | [A-0380](../A-ruby.md#a-0380) | What is the difference between symbols and strings? |
| SRC-00220 | 69–81 | [A-0164](../A-ruby.md#a-0164) | What is the purpose of Ruby’s require and require_relative methods? |
| SRC-00221 | 82–88 | [A-0375](../A-ruby.md#a-0375) | What is the difference between nil and false? |
| SRC-00222 | 89–104 | [A-0202](../A-ruby.md#a-0202) | How does a block differ from a method in Ruby? |
| SRC-00223 | 105–133 | [A-0166](../A-ruby.md#a-0166) | What is the purpose of the self keyword in Ruby? |
| SRC-00224 | 134–155 | [A-0196](../A-ruby.md#a-0196) | What is the difference between a Ruby class and a module? |
| SRC-00225 | 156–172 | [A-0140](../A-ruby.md#a-0140) | What is a case statement in Ruby? |
| SRC-00226 | 173–196 | [A-0286](../A-ruby.md#a-0286) | What is the purpose of the super keyword in Ruby? |
| SRC-00227 | 197–216 | [A-0157](../A-ruby.md#a-0157) | What is the difference between == and eql? in Ruby? |
| SRC-00228 | 217–229 | [A-0219](../A-ruby.md#a-0219) | What are some commonly used iterators in Ruby? |
| SRC-00229 | 230–250 | [A-0228](../A-ruby.md#a-0228) | What is the difference between proc and lambda in Ruby? |
| SRC-00230 | 251–272 | [A-0351](../A-ruby.md#a-0351) | How does string interpolation work in Ruby? |
| SRC-00231 | 273–281 | [F-0094](../F-advanced.md#f-0094) | What is Ruby’s garbage collection mechanism, and how does it work? |
| SRC-00232 | 282–294 | [F-0056](../F-advanced.md#f-0056) | What’s the purpose of the method_missing method in Ruby? |
| SRC-00233 | 295–313 | [F-0087](../F-advanced.md#f-0087) | What are singleton methods in Ruby, and how are they implemented? |
| SRC-00234 | 314–335 | [A-0218](../A-ruby.md#a-0218) | What are Ruby’s enumerator objects, and how are they used? |
| SRC-00235 | 336–353 | [A-0326](../A-ruby.md#a-0326) | What is the difference between include and extend in Ruby? |
| SRC-00236 | 354–378 | [B-0186](../B-rails.md#b-0186) | What are common security attacks, and how Ruby addresses them? |
| SRC-00237 | 401–404 | [A-0307](../A-ruby.md#a-0307) | What are the most common Ruby interview questions? |
| SRC-00238 | 405–407 | [A-0305](../A-ruby.md#a-0305) | How do I prepare for a Ruby coding interview? |
| SRC-00239 | 408–410 | [A-0308](../A-ruby.md#a-0308) | What Ruby concepts should I focus on for technical interviews? |
| SRC-00240 | 411–413 | [A-0303](../A-ruby.md#a-0303) | How can I improve my problem-solving skills in Ruby for interviews? |
| SRC-00241 | 414–417 | [A-0306](../A-ruby.md#a-0306) | What are some advanced Ruby interview topics I should be aware of? |

## Complete original text

```text
20 essential Ruby interview questions
14 mins read
Jan 29, 2025
Did you know that Ruby on Rails powers over a million websites, including platforms like Shopify and GitHub? This robust framework, combined with Ruby’s simplicity and elegance, has made it a favorite among developers and companies. Whether you’re a fresh graduate or a seasoned programmer, excelling in Ruby interview can open doors to top-tier tech companies. Preparing for these interviews sharpens your coding skills and enhances your ability to solve complex problems efficiently.

In this blog, we will cover:

20 essential Ruby interview questions categorized into:

Basic level

Intermediate level

Advanced level

Tips to excel in Ruby interviews, including key strategies and best practices.

Resources for further preparation, with links to courses and practice materials.

Basic Ruby interview questions
These questions test your foundational knowledge of Ruby, including its basic syntax and core concepts.

1. What are the different types of variables in Ruby?
Ruby has four main types of variables:

Local variables: Declared within a function or block, accessible only within that specific scope, and typically named using lowercase letters or underscores.

Instance variables: Prefixed with @, specific to instances of a class.

Class variables: Prefixed with @@, shared across all instances of a class.

Global variables: Prefixed with $, accessible anywhere in the program.


main.rb
Ruby 3.1.2
Ace Editor
 
⋯
Types of variables in Ruby
In the code above, four types of variables are demonstrated. A global variable $global_variable is accessible throughout the entire program. A class variable @@class_variable is shared across all instances of the Example class. Inside the initialize method, an instance variable @instance_variable is unique to each object created from the class. Within the show_local_variable method, a local variable local_variable is defined and used only within the method’s scope. Each variable type has specific accessibility based on where and how it’s defined.

2. What are the levels of access control for Ruby methods?
Ruby provides three main access control levels:

Public: Methods accessible from anywhere.

Private: Methods can only be accessed within the current object.

Protected: Methods accessible within instances of the same class or subclasses.

3. What is the difference between symbols and strings?
Symbols and strings are both used to represent text in Ruby, but there are key differences:

Symbols are immutable, meaning they cannot be changed once created. They are typically used as identifiers (e.g., keys in hashes).

Strings are mutable, allowing changes to the content, and are used when the actual text needs to be modified.


main.rb
Ruby 3.1.2
Ace Editor

Run
⋯
Symbols vs. strings in Ruby
The code above demonstrates two types of keys used in hashes. The first hash uses a symbol :key as the key, which is more memory-efficient and commonly used to represent fixed identifiers. The second hash uses a string "key" as the key, which is more flexible but less efficient for performance.

4. What is the purpose of Ruby’s require and require_relative methods?
require: Loads external libraries or Ruby files from library directories (e.g., Ruby’s standard library or installed gems).

require_relative: Loads Ruby files relative to the directory of the current file. This is particularly useful for loading files within the same project structure, using the current file’s path as a reference.


main.rb
Ruby 3.1.2
Ace Editor
⋯
require vs. require_relative in Ruby
In the above code, the require 'json' method loads the JSON library from Ruby’s standard library, enabling JSON parsing and generation features. On the other hand, the require_relative 'my_file' method loads a file relative to the current file’s path, making it useful for including files within the same project or directory.

5. What is the difference between nil and false?
In Ruby, nil and false values are considered “falsy”, but represent different concepts.

nil: Represents the absence of a value and is an object of NilClass.

false: A boolean value representing a negative result, an object of FalseClass

6. How does a block differ from a method in Ruby?
A block in Ruby is a chunk of code passed to a method to perform iteration or other operations. Blocks are not objects but can be converted into Proc objects for reuse. Unlike methods, blocks do not have names.


main.rb
Ruby 3.1.2
Ace Editor
 

Run
⋯
Block vs. method in Ruby
This code defines a greet method that prints a greeting with a passed name. The greet("Alice") call outputs, “Hello, Alice!” The process_numbers method takes an array, and using a block, it doubles each number and prints the result, as seen in the output “2 4 6.”

The greet_with_block method uses yield to execute a block if provided, with block_given? checking for the block’s presence. The call greet_with_block("Bob") { |name| puts "Hello, #{name}!" } outputs, “Hello, Bob!”

7. What is the purpose of the self keyword in Ruby?
The self keyword refers to the current object or context in which the code is being executed. It can refer to objects depending on where it is used—within a class, method, or block. In short, the value of self changes depending on where it’s used.

In instance methods, self refers to the instance of the class.

In class methods, self refers to the class itself.

In blocks, self refers to the outer context defined by the block.


main.rb
Ruby 3.1.2
Ace Editor
  

Run
⋯
Different usages of the self keyword in Ruby
This code demonstrates the use of self in different contexts in Ruby:

In Example 1, self inside an instance method refers to the current object. The Person class’s show_name method accesses the instance variable @name and prints the current object using self.

In Example 2, self inside a class method points to the class itself (Car). The class method car_type outputs the class name.

In Example 3, self inside the add method refers to the calculator object because the method is being called on it. Inside the block, however, self refers to the context where the block is defined, which is the main object in this case. This is because blocks inherit the context of their definition, not the calling object.

Intermediate Ruby interview questions
These questions test a deeper understanding of Ruby’s advanced features, syntax, and functionality.

8. What is the difference between a Ruby class and a module?
In Ruby, both classes and modules are used to group methods and variables together, but they serve different purposes and have different characteristics:

Classes are blueprints for creating objects (instances). They allow for inheritance, where one class can inherit methods and properties from another.

Modules are collections of methods and constants that cannot be instantiated. They are mainly used to share functionality across different classes through mixins, but unlike classes, they cannot be inherited.


main.rb
Ruby 3.1.2
Ace Editor
  

Run
⋯
Difference between a class and module in Ruby
This code demonstrates classes and modules in Ruby. The Car class is initialized with the make and model arguments, and the info method returns a string containing them. An instance of Car is created, and its info method is called.

The Drivable module defines a drive method included in the ElectricCar class, allowing its instances to use both info and drive.

Modules cannot be instantiated, so attempting to create an instance of Drivable would cause an error.

9. What is a case statement in Ruby?
The case statement in Ruby checks multiple conditions, similar to a switch case in other languages. It simplifies complex if-else chains.


main.rb
Ruby 3.1.2
Ace Editor
⋯
The case statement in Ruby
This code demonstrates a case statement in Ruby. It checks the value of fruit:

If fruit is 'apple', it prints “An apple a day.”

If fruit is 'banana', it prints, “Bananas are rich in potassium.”

For any other value, it prints “Unknown fruit.”

10. What is the purpose of the super keyword in Ruby?
In Ruby, the super keyword is used within a child class method to call the corresponding overridden method in the parent class. This allows the child class to reuse or extend the behavior defined in the parent class. The super keyword can be used with or without arguments, and its behavior varies accordingly:

Without arguments: It passes the same arguments from the child class method to the parent class method.

With arguments: It passes only the arguments provided explicitly to super to the parent class method, overriding the default behavior of forwarding all arguments.


main.rb
Ruby 3.1.2
Ace Editor
 

Run
⋯
The super keyword
This code demonstrates method overriding and the use of super in Ruby.

The Animal class defines a speak method that takes an argument num and prints a message about the number of sounds the animal makes.

The Dog class inherits from Animal and overrides the speak method. It uses super without arguments, which calls the parent class’s speak method with the same num argument passed to the child class’s method.

The Cat class also inherits from Animal and overrides the speak method. It calls the parent class’s speak method with a modified argument (2 * num) by explicitly using super(2 * num). 

11. What is the difference between == and eql? in Ruby?
== is used to compare the values of two objects.

eql? is stricter and compares the value and the type of two objects. Ruby also uses eql? under the hood to determine whether two hash keys are equal.


main.rb
Ruby 3.1.2
Ace Editor
 

Run
⋯
Difference between "==" and "eql?"
The code above explains the following:

When the values are the same after type conversion, == returns true. Otherwise false.

The method eql? is used internally for hash keys, so different values are retrieved when keys have a different type (integer vs. float).

12. What are some commonly used iterators in Ruby?
Ruby provides several built-in iterators that enable traversal and manipulation of collections like arrays and hashes.

each: The each iterator loops through each element in a collection, such as an array or hash, and executes a code block for each element.

map: The map iterator creates a new array by transforming a code block to each element in the original collection.

select: The select iterator filters elements in a collection based on a boolean condition specified in the block, returning a new array with only the elements that meet the condition.

reduce: The reduce iterator (also known as inject) accumulates a result by combining collection elements using the logic defined in the block, returning a single value after processing all elements.

each_with_index: The each_with_index iterator is similar to each, but it also provides the index of each element, allowing you to access both the value and its position in the collection.

13. What is the difference between proc and lambda in Ruby?
Both Proc and lambda are objects representing blocks of code, but they behave differently, especially regarding argument handling and return behavior.

Lambda: A lambda is strict about the number of arguments passed. If the wrong number is provided, it raises an ArgumentError. After execution, it returns control to the caller, similar to a method.

Proc: A Proc is more lenient with arguments. If fewer arguments are passed, it assigns nil to the missing ones. However, if an explicit return is called inside a Proc, it returns control from the method where the Proc was called (not just from the Proc itself), which can exit the surrounding method prematurely. Without an explicit return, a Proc behaves similarly to a Lambda, returning control to the caller after execution.


main.rb
Ruby 3.1.2
Ace Editor

Run
⋯
Proc and Lambda in Ruby
This code demonstrates the difference between a lambda and a Proc in Ruby.

If you call my_lambda.call without an argument; it raises an ArgumentError.

On the other hand, calling my_proc.call without any arguments doesn’t raise an error and simply prints “The value is” because the missing argument is set to nil.

14. How does string interpolation work in Ruby?
String interpolation in Ruby allows you to embed expressions inside string literals using the #{} syntax. The expressions inside the curly braces are evaluated, and the result is inserted into the string. This makes it easy to directly incorporate variables, method results, or calculations into strings.

Key points:

You can use variables, method calls, or even calculations inside the curly braces.

String interpolation is more concise and readable compared to string concatenation, which requires the use of +.


main.rb
Ruby 3.1.2
Ace Editor

Run
⋯
String interpolation in Ruby
This code demonstrates string interpolation in Ruby. It creates two variables, name and age, and then uses string interpolation to embed their values into the greeting string. The result is a dynamically generated string that includes the variables’ values and is printed to the console using puts.

Advanced Ruby interview questions
These questions are for those who deeply understand Ruby’s inner workings and advanced features.

15. What is Ruby’s garbage collection mechanism, and how does it work?
Ruby uses automatic garbage collection to manage memory. It employs a mark-and-sweep algorithm, which works in two phases:

Mark phase: The garbage collector identifies and marks objects still in use by traversing references.

Sweep phase: It removes no longer referenced objects, freeing up memory.

Ruby also uses incremental and generational garbage collection to optimize performance. Incremental garbage collection reduces the impact of garbage collection by processing in small chunks, minimizing long pauses during program execution. Generational garbage collection focuses on younger objects, which are more likely to be unused, improving efficiency.

16. What’s the purpose of the method_missing method in Ruby?
Ruby provides the method_missing method, which allows objects to intercept calls to undefined methods. When a method that doesn’t exist is called on an object, method_missing is triggered, enabling dynamic method handling. This is useful in domain-specific languages (DSLs) or proxy objects, where undefined method calls are handled dynamically by overriding method_missing.


main.rb
Ruby 3.1.2
Ace Editor

Run
⋯
The method_missing method in Ruby
This code demonstrates Ruby’s method_missing feature. When a method that doesn’t exist is called on an object, the method_missing method is triggered. In this example, calling some_method on the handler object invokes method_missing, printing a message with the method name and arguments passed.

17. What are singleton methods in Ruby, and how are they implemented?
Singleton methods are defined on a single object rather than all class instances. These methods are specific to the object they are defined on and do not affect other objects of the same class.

Singleton methods are stored in the object’s hidden, unique singleton class (or eigenclass).

This mechanism allows dynamic behavior addition to individual objects.

Singleton methods are often used for creating class-level methods or for metaprogramming.


main.rb
Ruby 3.1.2
Ace Editor

Run
⋯
Singleton methods in Ruby
This code demonstrates defining a method on a specific object. The greet method is added to the str object, and calling str.greet outputs a greeting with the value of str. However, since greet is not defined for another_str, calling another_str.greet will raise a NoMethodError.

18. What are Ruby’s enumerator objects, and how are they used?
Enumerator objects in Ruby allow you to create custom iteration behavior without directly implementing an iterator method. They encapsulate iteration logic, enabling lazy evaluations and allowing collections to be iterated in a reusable manner.

Key points:

Enumerators can be created with methods like each, map when they are used without a block, or manually using Enumerator.new.

They allow chaining for lazy evaluation, which is useful for handling large collections.

Commonly used methods include next, rewind, and with_index.


main.rb
Ruby 3.1.2
Ace Editor
 

Run
⋯
Enumerator in Ruby
In the context of the custom Enumerator, y represents a Yielder object passed to the block. This object allows you to send values to the enumerator using the << operator, similar to how yield is used to send values from a block. The values passed to the enumerator can then be accessed sequentially by calling its methods. For instance, the take(5) method retrieves the first 5 values from the enumerator.

19. What is the difference between include and extend in Ruby?
In Ruby, both include and extend are used to mix modules into classes, but they differ in scope and functionality:

include: Adds the module’s methods as instance methods to the including class.

extend: Adds the module’s methods as class methods to the extending class or object.


main.rb
Ruby 3.1.2
Ace Editor
 

Run
⋯
The include and extend functions in Ruby
This code demonstrates the use of modules in Ruby. The Greetings module defines a method say_hello. In the Person class, include Greetings adds the say_hello method as an instance method, and extend Greetings adds it as a class method. As a result, both the Person class and its instances can call say_hello.

20. What are common security attacks, and how Ruby addresses them?
Ruby applications, like any web application, may face common security attacks. Fortunately, these can be mitigated using best practices and built-in Ruby on Rails features:

Cross-site scripting (XSS):
Injecting malicious scripts into web pages.

Mitigation: Ensure user input is properly escaped in views to prevent malicious characters from being rendered as executable code. Avoid using html_safe unless you are certain the content is safe. Use sanitize to clean user input, removing potentially harmful tags or scripts.

Cross-site request forgery (CSRF):
Tricking users into performing actions without their consent.

Mitigation: Rails provides built-in CSRF protection by including a unique token in forms (via protect_from_forgery), tied to the user’s session. This ensures that form submissions are intentional and secure.

SQL injection:
Injecting malicious SQL code into database queries.

Mitigation: Use ActiveRecord’s query parameterization methods (where, find_by) instead of string interpolation in queries to separate the user input from the actual SQL query.

Session hijacking and fixation:
Stealing or reusing session IDs to impersonate users.

Mitigation: To protect sessions from unauthorized access, use secure cookies, rotate session IDs upon login, and enable HTTPS.

By following these principles, Ruby developers can secure applications against the most common threats.

Next steps
Mastering Ruby interview questions is key to excelling in technical interviews and showcasing expertise. Focus on Ruby fundamentals, explore advanced features, and practice regularly to build confidence and impress potential employers.

Continue honing your skills with coding challenges, real-world projects, and deeper dives into Ruby concepts.

Explore the following resources by Educative for an in-depth understanding and practical implementation of Ruby and its framework:

Course on Ruby:

Learn Ruby from Scratch

Guide to Ruby interviews:

Decode the Coding Interview in Ruby: Real-World Examples

Standalone projects with Ruby on Rails:

Create a Bill Split Application Using Ruby on Rails

Build an E-learning Website with Ruby-on-Rails and PostgreSQL

Frequently Asked Questions
What are the most common Ruby interview questions?

Ruby interview questions focus on language fundamentals, object-oriented programming, data structures, algorithms, and common libraries. You can expect questions about Ruby syntax, blocks, modules, and performance optimization.

How do I prepare for a Ruby coding interview?


What Ruby concepts should I focus on for technical interviews?


How can I improve my problem-solving skills in Ruby for interviews?


What are some advanced Ruby interview topics I should be aware of?



```
