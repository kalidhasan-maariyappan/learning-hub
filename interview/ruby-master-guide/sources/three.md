# Source ledger: three.txt

SHA-256: `674079d501f66a32aca15bc69d1193bd49ad3ffa106b88490fef6ade0774dfcd`

565 physical lines; 30 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00122 | 2–9 | [A-0246](../A-ruby.md#a-0246) | Explain the difference between a Ruby class and an instance of a class. |
| SRC-00123 | 10–26 | [D-0074](../D-coding.md#d-0074) | Create a Ruby function that takes an array of numbers as input and returns a new array containing only the even numbers. |
| SRC-00124 | 27–34 | [A-0224](../A-ruby.md#a-0224) | What is a gem in Ruby, and how is it useful in the development process? |
| SRC-00125 | 35–70 | [D-0063](../D-coding.md#d-0063) | Write a Ruby class representing a basic bank account. It should have methods to deposit, withdraw, and check the balance. |
| SRC-00126 | 71–78 | [A-0244](../A-ruby.md#a-0244) | Explain the concept of inheritance in Ruby and how it facilitates code reuse. |
| SRC-00127 | 79–98 | [D-0068](../D-coding.md#d-0068) | Create a Ruby module called Helper with a method that calculates the square of a number. Then, implement a class Calculator that includes the Helper module and uses the square method to calculate the square of a given number. |
| SRC-00128 | 99–123 | [A-0194](../A-ruby.md#a-0194) | Explain the concept of a block in Ruby and provide an example of its usage. |
| SRC-00129 | 124–140 | [D-0089](../D-coding.md#d-0089) | Write a Ruby method that takes an array of strings and returns a new array containing only the strings that are of even length.’ |
| SRC-00130 | 141–154 | [A-0380](../A-ruby.md#a-0380) | Explain the concept of a symbol in Ruby and why it is useful compared to strings. |
| SRC-00131 | 155–173 | [D-0086](../D-coding.md#d-0086) | Write a Ruby method that takes a string as input and returns a new string with the words reversed. |
| SRC-00132 | 174–183 | [A-0067](../A-ruby.md#a-0067) | Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages. |
| SRC-00133 | 184–224 | [D-0061](../D-coding.md#d-0061) | Implement a Ruby class that represents a geometric shape. The class should have a method to calculate the area of the shape. |
| SRC-00134 | 225–232 | [A-0247](../A-ruby.md#a-0247) | Explain the purpose of modules in Ruby and how they facilitate code organization and reusability. |
| SRC-00135 | 233–258 | [D-0069](../D-coding.md#d-0069) | Create a Ruby module called MathHelper that provides methods for calculating the factorial and the square root of a number. Implement a class Calculator that includes the MathHelper module and uses its methods to perform calculations. |
| SRC-00136 | 259–277 | [F-0084](../F-advanced.md#f-0084) | Theoretical: Explain the concept of metaprogramming in Ruby and provide an example of how it can be used. |
| SRC-00137 | 278–295 | [D-0087](../D-coding.md#d-0087) | Write a Ruby method that takes a string as input and returns the number of words in the string. |
| SRC-00138 | 296–317 | [A-0075](../A-ruby.md#a-0075) | Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations. |
| SRC-00139 | 318–343 | [D-0059](../D-coding.md#d-0059) | Create a Ruby class called Person with attributes name and age. Implement a custom setter method for the age attribute that restricts the age to be within a specific range (e.g., 0 to 120). |
| SRC-00140 | 344–364 | [A-0141](../A-ruby.md#a-0141) | Explain the concept of closures in Ruby and how they capture their surrounding context. |
| SRC-00141 | 365–379 | [D-0073](../D-coding.md#d-0073) | Code-related: Implement a Ruby method that takes an array of integers as input and returns a new array containing only the unique elements, removing any duplicates. |
| SRC-00142 | 380–390 | [F-0084](../F-advanced.md#f-0084) | Explain the concept of metaprogramming in Ruby and how it is utilized in real-world applications. |
| SRC-00143 | 391–412 | [D-0057](../D-coding.md#d-0057) | Write a Ruby method that takes a block and executes it only if the block is given. |
| SRC-00144 | 413–422 | [A-0196](../A-ruby.md#a-0196) | Explain the difference between modules and classes in Ruby and when to use each. |
| SRC-00145 | 423–447 | [D-0079](../D-coding.md#d-0079) | Implement a Ruby method that finds the most frequent element in an array. |
| SRC-00146 | 448–479 | [F-0082](../F-advanced.md#f-0082) | Explain the concept of refinements in Ruby and their intended use. |
| SRC-00147 | 480–502 | [D-0088](../D-coding.md#d-0088) | Write a Ruby method that takes an array of integers as input and returns a new array containing only the prime numbers. |
| SRC-00148 | 503–512 | [F-0094](../F-advanced.md#f-0094) | Explain the concept of garbage collection in Ruby and how it helps manage memory. |
| SRC-00149 | 513–532 | [D-0015](../D-coding.md#d-0015) | Implement a Ruby method that converts a given sentence to title case. |
| SRC-00150 | 533–542 | [F-0092](../F-advanced.md#f-0092) | Explain the concept of concurrency and parallelism in Ruby, and how they are achieved. |
| SRC-00151 | 543–565 | [D-0058](../D-coding.md#d-0058) | Write a Ruby method that takes a string as input and returns the number of occurrences of each word in the string. |

## Complete original text

```text
Junior Ruby interview questions
Question:
Explain the difference between a Ruby class and an instance of a class.

Answer:
In Ruby, a class is a blueprint or a template that defines the properties (attributes) and behaviors (methods) of objects. It acts as a blueprint for creating objects with similar characteristics. An instance of a class, on the other hand, is a specific object created based on the class definition. It represents a unique occurrence of the class with its own set of attribute values.

For example, consider a Car class. The class may define attributes like make, model, and year, as well as methods like start_engine and drive. An instance of the Car class would be a specific car object with its unique make, model, year, and other attribute values.

Question:
Create a Ruby function that takes an array of numbers as input and returns a new array containing only the even numbers.

Answer:

def even_numbers(input_array)
  input_array.select { |num| num.even? }
end

# Example usage:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = even_numbers(numbers)
puts result
# Output: [2, 4, 6, 8, 10]
Code language: PHP (php)
In this code, the even_numbers function uses the select method to filter the array and only keep elements for which the block (num.even?) returns true, i.e., even numbers.

Question:
What is a gem in Ruby, and how is it useful in the development process?

Answer:
In Ruby, a gem is a packaged library or extension that contains reusable code or functionalities. Gems allow developers to distribute and share their code with others, making it easier to incorporate pre-built solutions into Ruby applications. Gems can range from simple utility libraries to complex frameworks and tools.

Gems are useful in the development process because they provide a modular and efficient way to manage dependencies and reuse code. By using gems, developers can avoid reinventing the wheel and focus on higher-level application logic. Gems can be installed and managed using the gem command-line tool, and popular gems are hosted on the RubyGems website.

Question:
Write a Ruby class representing a basic bank account. It should have methods to deposit, withdraw, and check the balance.

Answer:

class BankAccount
  def initialize
    @balance = 0
  end

  def deposit(amount)
    @balance += amount
  end

  def withdraw(amount)
    if amount <= @balance
      @balance -= amount
    else
      puts "Insufficient balance."
    end
  end

  def balance
    @balance
  end
end

# Example usage:
account = BankAccount.new
account.deposit(1000)
account.withdraw(300)
puts account.balance
# Output: 700
Code language: CSS (css)
In this code, we define a BankAccount class with an initialize method to set the initial balance to 0. The deposit method increases the balance by the specified amount, the withdraw method deducts the amount from the balance if sufficient funds are available, and the balance method returns the current balance.

Question:
Explain the concept of inheritance in Ruby and how it facilitates code reuse.

Answer:
Inheritance is a fundamental object-oriented programming concept in Ruby (and many other languages). It allows a class to inherit properties and behaviors from another class, referred to as the parent or base class. The class inheriting the properties is called the child or derived class. The child class can add new methods or override existing ones but automatically inherits all the attributes and methods from the parent class.

Inheritance facilitates code reuse by allowing developers to create specialized classes based on existing ones. Instead of rewriting common functionalities in each class, developers can define them once in the parent class and have them inherited by all child classes. This leads to more maintainable and modular code.

Question:
Create a Ruby module called Helper with a method that calculates the square of a number. Then, implement a class Calculator that includes the Helper module and uses the square method to calculate the square of a given number.

module Helper
  def square(num)
    num * num
  end
end

class Calculator
  include Helper
end

# Example usage:
calculator = Calculator.new
result = calculator.square(5)
puts result
# Output: 25
In this code, we define a Helper module with a square method that calculates the square of a number. The Calculator class includes the Helper module, which allows instances of the Calculator class to use the square method to perform calculations.

Question:
Explain the concept of a block in Ruby and provide an example of its usage.

Answer:
In Ruby, a block is a chunk of code enclosed in either curly braces {} or do...end. Blocks are used to group statements together and pass them as an argument to a method. They provide a way to execute a set of statements within the context of a method call.

Here’s an example of using a block in Ruby:

def do_something
  puts "Start of method"
  yield
  puts "End of method"
end

do_something do
  puts "Inside the block"
end

# Output:
# Start of method
# Inside the block
# End of method
Code language: PHP (php)
In this example, the do_something method yields control to the block enclosed by do...end. The statements inside the block are executed, and then control returns to the method to continue execution.

Question:
Write a Ruby method that takes an array of strings and returns a new array containing only the strings that are of even length.’

Answer:

def even_length_strings(input_array)
  input_array.select { |str| str.length.even? }
end

# Example usage:
strings = ["apple", "banana", "orange", "grapes", "kiwi"]
result = even_length_strings(strings)
puts result
# Output: ["banana", "grapes"]
Code language: PHP (php)
In this code, the even_length_strings method uses the select method to filter the array and only keep elements for which the block (str.length.even?) returns true, i.e., strings with even lengths.

Question:
Explain the concept of a symbol in Ruby and why it is useful compared to strings.

Answer:
In Ruby, a symbol is a lightweight and immutable data type represented by a name preceded by a colon (:). Symbols are used to identify names or labels within a Ruby program. Unlike strings, symbols are stored in memory only once, making them more memory-efficient. This feature makes symbols particularly useful when we need a unique identifier or label for an object, method, or key in a hash.

For example, when using symbols as keys in a hash, the retrieval is faster because Ruby doesn’t have to create new objects to represent each key.

person = {

 name: "John", age: 30, occupation: "Engineer" }
Code language: JavaScript (javascript)
In this example, the keys :name, :age, and :occupation are symbols. Using symbols as keys is more efficient than using strings because symbols have the same object id throughout the program’s execution, while strings create different objects each time they are used.

Question:
Write a Ruby method that takes a string as input and returns a new string with the words reversed.

def reverse_words(input_string)
  words = input_string.split(" ")
  reversed_words = words.reverse
  reversed_string = reversed_words.join(" ")
  reversed_string
end

# Example usage:
sentence = "Hello, this is a sample sentence."
result = reverse_words(sentence)
puts result
# Output: "sentence. sample a is this Hello,"
Code language: PHP (php)
In this code, the reverse_words method splits the input string into an array of words using the split method, then reverses the order of words using the reverse method, and finally joins the reversed words back into a string using the join method. The resulting string contains the words in reverse order.

Intermediate Ruby interview questions
Question:
Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages.

Answer:
In Ruby, duck typing is a concept that determines the type or class of an object based on its behavior (methods and properties) rather than its explicit type. The phrase “If it walks like a duck and quacks like a duck, then it must be a duck” captures the essence of duck typing.

When using duck typing, Ruby objects are allowed to respond to methods they understand, regardless of their class or inheritance hierarchy. This flexibility enables polymorphism, as different objects can respond to the same method calls in a way that makes sense for each object.

In contrast, static typing in other programming languages requires explicit declaration of variable types, and objects must belong to specific classes to perform certain operations. This leads to a more rigid and verbose code structure compared to the dynamic and flexible nature of duck typing in Ruby.

Question:
Implement a Ruby class that represents a geometric shape. The class should have a method to calculate the area of the shape.

Answer:

class GeometricShape
  def calculate_area
    raise NotImplementedError, "Subclasses must implement calculate_area method."
  end
end

class Rectangle < GeometricShape
  def initialize(length, width)
    @length = length
    @width = width
  end

  def calculate_area
    @length * @width
  end
end

class Circle < GeometricShape
  def initialize(radius)
    @radius = radius
  end

  def calculate_area
    Math::PI * @radius**2
  end
end

# Example usage:
rectangle = Rectangle.new(5, 3)
circle = Circle.new(4)

puts rectangle.calculate_area
puts circle.calculate_area
Code language: CSS (css)
In this code, we define an abstract GeometricShape class with a method calculate_area, which raises a NotImplementedError. This makes it an abstract method, requiring subclasses to implement it. The Rectangle and Circle classes are subclasses that inherit from GeometricShape and implement the calculate_area method accordingly.

Question:
Explain the purpose of modules in Ruby and how they facilitate code organization and reusability.

Answer:
In Ruby, modules are containers for methods, constants, and other module or class definitions. They serve two main purposes: code organization and code reusability.

Code Organization: Modules help organize related methods and constants into cohesive units, allowing developers to group functionality based on common themes or responsibilities. This improves code readability, maintainability, and scalability. For example, modules can be used to group utility methods, mathematical functions, or file manipulation functions.
Code Reusability: Modules enable code reusability by acting as a mixin. A module’s methods can be included in multiple classes, allowing those classes to inherit the module’s functionality without being part of the same inheritance hierarchy. This allows developers to share functionality across different classes without duplicating code.
Question:
Create a Ruby module called MathHelper that provides methods for calculating the factorial and the square root of a number. Implement a class Calculator that includes the MathHelper module and uses its methods to perform calculations.

Answer:

module MathHelper
  def factorial(n)
    n <= 1 ? 1 : n * factorial(n - 1)
  end

  def square_root(x)
    Math.sqrt(x)
  end
end

class Calculator
  include MathHelper
end

# Example usage:
calculator = Calculator.new
puts calculator.factorial(5)    # Output: 120
puts calculator.square_root(25) # Output: 5.0
Code language: HTML, XML (xml)
In this code, we define a MathHelper module with methods factorial and square_root. The Calculator class includes the MathHelper module, gaining access to these methods for performing calculations.

Question:
Theoretical: Explain the concept of metaprogramming in Ruby and provide an example of how it can be used.

Answer:
Metaprogramming in Ruby refers to the ability of a program to modify or generate code at runtime. It allows developers to write code that writes code. Ruby’s dynamic nature, including features like introspection and open classes, makes metaprogramming powerful and flexible.

An example of metaprogramming in Ruby is using the define_method method to dynamically create methods in a class:

class MyClass
  define_method(:dynamic_method) do |arg|
    "Dynamic method called with argument: #{arg}"
  end
end

# Example usage:
obj = MyClass.new
puts obj.dynamic_method("Hello!") # Output: "Dynamic method called with argument: Hello!"
In this example, the define_method method is used to create a method named dynamic_method in the MyClass class at runtime. This allows us to create methods dynamically based on certain conditions or input.

Question:

Write a Ruby method that takes a string as input and returns the number of words in the string.

Answer:

def count_words(input_string)
  words = input_string.split(" ")
  words.count
end

# Example usage:
sentence = "Ruby is a powerful programming language"
result = count_words(sentence)
puts result # Output: 6
Code language: PHP (php)
In this code, the count_words method splits the input string into an array of words using the split method, and then returns the count of elements in the array using the count method.

Question:

Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations.

Answer:
Exceptions in Ruby are a way to handle errors and unexpected situations gracefully. When an error or exceptional condition occurs during program execution, Ruby raises an exception, which disrupts the normal flow of the program and jumps to the nearest exception handler.

Exceptions allow developers to identify and handle errors explicitly, preventing the program from crashing or producing incorrect results. By catching exceptions using rescue blocks, developers can take appropriate actions, such as logging the error, retrying the operation, or providing a fallback value.

For example:

begin
  # Code that may raise an exception
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
end

# Output: Error: divided by 0
Code language: PHP (php)
In this example, a ZeroDivisionError exception is raised when trying to divide by zero. The rescue block catches the exception, and the program continues to execute without terminating abruptly.

Question:

Create a Ruby class called Person with attributes name and age. Implement a custom setter method for the age attribute that restricts the age to be within a specific range (e.g., 0 to 120).

class Person
  attr_reader :name
  attr_accessor :age

  def initialize(name, age)
    @name = name
    self.age = age
  end

  def age=(new_age)
    @age = new_age.clamp(0, 120)
  end
end

# Example usage:
person = Person.new("John", 150)


puts person.age # Output: 120 (Age is restricted to the range 0 to 120)
Code language: CSS (css)
In this code, the Person class has attributes name (read-only) and age (read-write). We define a custom setter method age= for the age attribute, using the clamp method to restrict the age within the range of 0 to 120.

Question:
Explain the concept of closures in Ruby and how they capture their surrounding context.

Answer:
In Ruby, a closure is a block of code (lambda, proc, or block) that captures its surrounding context, including local variables, bindings, and methods. Closures allow developers to create functions that remember the environment in which they were created, even if they are executed in a different context later.

When a closure is defined, it captures the variables and methods available at the time of its definition. The closure can then access and manipulate these variables and methods when it is executed, even if they are no longer in scope.

Here’s an example of a closure using a block:

def outer_method
  x = 10
  inner_closure = proc { x }
  x = 20
  inner_closure.call
end

puts outer_method # Output: 20
Code language: PHP (php)
In this example, the inner_closure proc captures the variable x from its surrounding context when it is defined. Even though x is modified to 20 later in the outer_method, the closure retains the original value of x (10) when it is called.

Question:
Code-related: Implement a Ruby method that takes an array of integers as input and returns a new array containing only the unique elements, removing any duplicates.

def unique_elements(input_array)
  input_array.uniq
end

# Example usage:
numbers = [1, 2, 3, 4, 3, 2, 5]
result = unique_elements(numbers)
puts result # Output: [1, 2, 3, 4, 5]
Code language: PHP (php)
In this code, the unique_elements method uses the uniq method to remove duplicates from the input array and return a new array containing only the unique elements.

Senior Ruby interview questions
Question:

Explain the concept of metaprogramming in Ruby and how it is utilized in real-world applications.

Answer:
Metaprogramming is a powerful concept in Ruby that allows programs to treat code as data and manipulate it during runtime. Ruby provides several metaprogramming features, such as dynamic method definitions, opening classes at runtime, and using reflection to access methods and modify behavior.

In real-world applications, metaprogramming is extensively used in frameworks, libraries, and DSLs (Domain-Specific Languages). For example, Rails, a popular web framework, uses metaprogramming to generate accessor methods, define relationships between models, and provide database abstractions. Metaprogramming allows Rails to offer a user-friendly syntax and simplify repetitive tasks for developers.

DSLs, such as Rake and Capistrano, are built using metaprogramming to define domain-specific tasks and configurations concisely. This enables developers to express complex tasks with simple and readable code.

Question:
Write a Ruby method that takes a block and executes it only if the block is given.

Answer:

def execute_block_if_given
  if block_given?
    yield
  else
    puts "No block given."
  end
end

# Example usage:
execute_block_if_given { puts "Block is executed!" }
# Output: "Block is executed!"

execute_block_if_given
# Output: "No block given."
Code language: PHP (php)
In this code, the execute_block_if_given method uses the block_given? method to check if a block is provided. If a block is given, the method uses yield to execute the block.

Question:
Explain the difference between modules and classes in Ruby and when to use each.

Answer:
In Ruby, both modules and classes serve as containers for methods and constants, but they serve different purposes:

Classes: Classes define objects with attributes (instance variables) and behaviors (methods). They support inheritance, encapsulation, and object instantiation. Classes are used when you want to create objects with specific attributes and behaviors and group related functionality.
Modules: Modules are similar to classes, but they cannot be instantiated or serve as a blueprint for objects. Instead, they act as containers for methods and constants that can be included in classes or other modules using the include or extend keyword. Modules are used when you want to share functionality across multiple classes without creating a full-blown class hierarchy.
Use classes when you want to create objects and define their behavior. Use modules when you want to share methods and constants across multiple classes or define mixins that can be included in various classes.

Question:
Implement a Ruby method that finds the most frequent element in an array.

Answer:

def most_frequent_element(array)
  frequency = Hash.new(0)

  array.each do |element|
    frequency[element] += 1
  end

  max_frequency = frequency.values.max
  most_frequent_elements = frequency.select { |_element, freq| freq == max_frequency }.keys
  most_frequent_elements
end

# Example usage:
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
result = most_frequent_element(numbers)
puts result
# Output: [4]
Code language: PHP (php)
In this code, we use a hash to store the frequency of each element in the array. The most_frequent_element method iterates through the array and updates the frequency count for each element. After that, it finds the maximum frequency and selects the elements with that frequency to return as the most frequent elements.

Question:
Explain the concept of refinements in Ruby and their intended use.

Answer:
Refinements in Ruby allow developers to modify the behavior of classes or methods locally within a specific scope. Unlike monkey-patching, which modifies the behavior globally, refinements are only active within the block in which they are used. Refinements are primarily intended to address issues related to monkey-patching, where unintended side effects can occur when modifying core classes or methods.

Refinements are defined using the refine keyword and applied to a specific class or module using the using keyword within a block. When the block exits, the modifications from the refinement are no longer in effect.

Here’s an example of using refinements:

module MyRefinement
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

class MyClass
  using MyRefinement

  def greet(name)
    "Hello, #{name.shout}"
  end
end

# Example usage:
obj = MyClass.new
puts obj.greet("Alice") # Output: "Hello, ALICE!!!"
puts "Hi, Ruby".shout   # Output: NoMethodError (undefined method `shout' for "Hi, Ruby":String)
In this example, the MyRefinement module defines a refinement for the String class, adding a shout method. The refinement is applied to the String class within the MyClass using block. Inside the block, the shout method is available, but outside the block, it is not, preventing unintended side effects.

Question:
Write a Ruby method that takes an array of integers as input and returns a new array containing only the prime numbers.

Answer:

def prime_numbers(input_array)
  input_array.select { |num| is_prime?(num) }
end

def is_prime?(num)
  return false if num <= 1

  (2..Math.sqrt(num)).none? { |i| num % i == 0 }
end

# Example usage:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = prime_numbers(numbers)
puts result
# Output: [2, 3, 5, 7]
Code language: PHP (php)
In this code, we define the prime_numbers method, which uses the select method to filter the array and only keep elements for which the is_prime? method returns true. The is_prime? method checks whether a number is prime using a simple primality test.

Question:
Explain the concept of garbage collection in Ruby and how it helps manage memory.

Answer:
Garbage collection is a memory management mechanism in Ruby (and many other programming languages) that automatically reclaims memory that is no longer in use or referenced by any part of the program. It helps prevent memory leaks and efficiently manages memory resources.

Ruby uses a mark-and-sweep garbage collector. When the garbage collector runs, it marks all objects that are still in use by the program (reachable) and then sweeps through the memory to free up the memory occupied by objects that are not marked (unreachable).

The garbage collector in Ruby is transparent to the developer, as it runs automatically at specific intervals or when the memory threshold is reached. This automatic memory management ensures that developers don’t have to explicitly deallocate memory, making Ruby more convenient and less prone to memory-related bugs.

Question:
Implement a Ruby method that converts a given sentence to title case.

Answer:

def title_case(sentence)
  words = sentence.split(" ")
  capitalized_words = words.map(&:capitalize)
  capitalized_sentence = capitalized_words.join(" ")
  capitalized_sentence
end

# Example usage:
text = "this is a sample sentence in title case."
result = title_case(text)
puts result
# Output: "This Is A Sample Sentence In Title Case."
Code language: PHP (php)
In this code, the title_case method splits the input sentence into an array of words using the split method, capitalizes each word using the map method and capitalize method, and then joins the capitalized words back into a sentence using the join method.

Question:
Explain the concept of concurrency and parallelism in Ruby, and how they are achieved.

Answer:
Concurrency and parallelism are related but distinct concepts in Ruby (and other languages):

Concurrency: Concurrency is the ability of a program to handle multiple tasks at the same time, making progress on each of them. In Ruby, concurrency is typically achieved using threads. Ruby’s threads allow the program to switch between tasks (context switching) so that it appears that multiple tasks are being executed simultaneously.
Parallelism: Parallelism is the actual simultaneous execution of multiple tasks on multiple cores or processors. In Ruby, parallelism can be achieved using multiple processes or threads. Ruby threads are not true OS-level threads, so parallelism on multiple cores is generally limited. However, parallelism can be achieved using the Process class to create multiple processes, which can run in parallel on multicore systems.
It’s essential to note that Ruby’s Global Interpreter Lock (GIL) restricts true parallelism with threads, but concurrency can still be effectively achieved for I/O-bound tasks.

Question:
Write a Ruby method that takes a string as input and returns the number of occurrences of each word in the string.

Answer:

def word_occurrences(input_string)
  words = input_string.split(" ")
  frequency = Hash.new(0)

  words.each do |word|
    frequency[word.downcase] += 1
  end

  frequency
end

# Example usage:
sentence = "This is a sample sentence. This is another sample sentence."
result = word_occurrences(sentence)
puts result
# Output: {"this"=>2, "is"=>2, "a"=>1, "sample"=>2, "sentence."=>1, "another"=>1}
Code language: PHP (php)
In this code, the word_occurrences method uses the split method to split the input string into an array of words, and then it iterates through the array, counting the occurrences of each word using a hash. The downcase method is used to ensure case-insensitive counting of word occurrences. The resulting hash contains each word as a key and its frequency as the value.
```
