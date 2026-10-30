# Source ledger: thirteen.txt

SHA-256: `1be0ec1bdc50a523716b91672c99970dc134d1a4e9f8f2b5e505d7d0a2c8eaf7`

311 physical lines; 22 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00439 | 16–22 | [A-0180](../A-ruby.md#a-0180) | Which Ruby implementations exist, and how do their runtimes differ? |
| SRC-00440 | 23–33 | [A-0279](../A-ruby.md#a-0279) | Explain Everything is an Object. |
| SRC-00441 | 34–36 | [A-0080](../A-ruby.md#a-0080) | Explain Truthy and Falsy Values. |
| SRC-00442 | 37–45 | [A-0211](../A-ruby.md#a-0211) | Explain Blocks, Procs, Lambdas. |
| SRC-00443 | 46–59 | [A-0054](../A-ruby.md#a-0054) | Explain Dynamic Typing. |
| SRC-00444 | 60–83 | [F-0081](../F-advanced.md#f-0081) | Explain Singleton Methods and Metaprogramming. |
| SRC-00445 | 84–94 | [A-0057](../A-ruby.md#a-0057) | Explain Implicit Returns. |
| SRC-00446 | 95–102 | [A-0049](../A-ruby.md#a-0049) | Explain Bang Methods. |
| SRC-00447 | 103–120 | [A-0059](../A-ruby.md#a-0059) | Explain Not Knowing the Difference Between == and eql? Operators. |
| SRC-00448 | 121–123 | [A-0356](../A-ruby.md#a-0356) | Not Knowing the Difference Between nil? and empty? |
| SRC-00449 | 124–132 | [A-0048](../A-ruby.md#a-0048) | Explain Assuming Rails Methods Are Built-in Ruby Methods. |
| SRC-00450 | 133–139 | [A-0380](../A-ruby.md#a-0380) | Explain When to Use Symbols vs. Strings. |
| SRC-00451 | 140–159 | [A-0339](../A-ruby.md#a-0339) | Explain Not Using Instance Variables Correctly. |
| SRC-00452 | 160–173 | [A-0083](../A-ruby.md#a-0083) | Explain When to Employ and / or vs. && / \|\|. |
| SRC-00453 | 174–203 | [A-0061](../A-ruby.md#a-0061) | Explain Parentheses are Optional. |
| SRC-00454 | 204–221 | [A-0338](../A-ruby.md#a-0338) | Explain Concatenating Strings / Strings are Mutable in Ruby. |
| SRC-00455 | 222–248 | [A-0316](../A-ruby.md#a-0316) | Explain Confusion between include and extend. |
| SRC-00456 | 249–272 | [A-0058](../A-ruby.md#a-0058) | Explain Misunderstanding throw/catch and raise/rescue. |
| SRC-00457 | 273–283 | [A-0060](../A-ruby.md#a-0060) | Explain Not Using Idiomatic Ruby. |
| SRC-00458 | 287–290 | [D-0082](../D-coding.md#d-0082) | Validate string against dictionary |
| SRC-00459 | 291–294 | [D-0050](../D-coding.md#d-0050) | Minimum tree depth |
| SRC-00460 | 295–298 | [D-0021](../D-coding.md#d-0021) | Move Stones Over Grid |

## Complete original text

```text
How is Ruby Used in Technical Interviews?
By Jai Pandya | Last updated: July 26, 2023
Ruby Interview Stats
We've hosted over 100k interviews on our platform. Ruby was the language of choice in those interviews 2% of the time, and engineers who interviewed in Ruby passed their interviews 47% of the time.

Below is a distribution of programming languages and their popularity in technical interviews as well as success rates in interviews, by language.

Programming languages distribution in interviewing.io interviews. Ruby gets used in interviews 2% of the time.

Interview success rates, by programming language, on interviewing.io. Engineers who code in Ruby pass interviews 47% of the time.

According to Stack Overflow's 2023 Developer Survey, Ruby comes in the four highest-paid languages with a median income of 98.5k USD. GitHub's Octoverse 2022 report ranks Ruby in the top ten used programming languages globally.

What does this mean for you as a candidate? If Ruby is your strongest language, there's no reason to avoid using it in technical interviews. While less common, Ruby is still a viable and respected choice among interviewers.

Ruby Idioms & Idiosyncrasies
As a language, Ruby is favored by several leading companies, such as Airbnb, GitHub, Shopify, and 37Signals, due to its readable syntax and the powerful Rails framework. While originally designed and developed by Yukihiro "Matz" Matsumoto, today there are several implementations available, such as MRI (Matz's Ruby Interpreter), JRuby (which runs on the JVM), and Rubinius, each with their unique features and performance characteristics.

Among these, MRI is the reference implementation of Ruby and is most commonly used. It is also the assumed default in most coding interviews unless specified otherwise, given its status as the original and most widespread version of Ruby. JRuby allows for integration with Java, leveraging the power and ecosystem of the JVM, and Rubinius emphasizes concurrency, using a bytecode virtual machine much like the JVM or .NET CLR.

When preparing for a Ruby interview, understanding the idioms and idiosyncrasies of the language is essential. Here are the key ones to remember.

Everything is an Object
In many programming languages, primitives like integers and booleans are not objects. However, Ruby is a pure object-oriented language, meaning everything in Ruby is an object, even literals like numbers, booleans, and nil. This means that every piece of data has methods and instance variables, which can be very powerful.

For instance, you're given an array of integers and asked to return an array of even numbers. Because everything is an object, you can call the select method directly on the array object and pass it a block of code to execute for each element:

Ruby
numbers = [1, 2, 3, 4, 5]
evens = numbers.select(&:even?)
puts evens  # Outputs: [2, 4]
In this example, select is a built-in method provided by the Array class, and even? is a built-in method provided by the Integer class. The &: syntax is a shorthand that converts :even? to a Proc object, which is then passed to select.

Truthy and Falsy Values
In Ruby, only two things are falsy — false and nil. Everything else is considered to be truthy, including 0, 0.0, "" (empty string), and [] (empty array). This differs from other languages where 0, "", or [] could be considered falsy.

Blocks, Procs, Lambdas
Ruby is known for its blocks, procs, and lambdas, which are chunks of code that can be passed around like objects. They are similar to Python's lambda functions, Java's lambda expressions, and JavaScript's first-class functions and arrow functions. However, they offer greater flexibility and power that defines Ruby's flavor of functional programming.

Ruby
words = ["apple", "fig", "cherry", "banana", "grape"]
sorted_by_length = words.sort { |a, b| a.length <=> b.length }
# sorted_by_length is now ["fig", "apple", "grape", "cherry", "banana"]
In this example, a block is passed to the sort method to define custom sorting logic. The spaceship operator <=> is used to compare the lengths of the strings.

Dynamic Typing
Ruby, similar to Python and JavaScript, is a dynamically typed language, which means that you don't have to declare the type of a variable when you define it. Ruby will figure it out for you. Variables are just names for containers that hold references to objects. The type of variable is simply the type of the object they reference.

In addition, Ruby is strongly typed (unlike JavaScript), which enforces type-checking during runtime. While you don't have to explicitly define a variable's type, once the type is assigned, Ruby won't automatically convert one type to another without explicit instruction.

Here's an example:

Ruby
x = "Hello, Interviewing.io!"  # x is a String
x = 42  # Now x is an Integer

# Ruby won't automatically convert a string into a number
y = "5"
z = y + 2  # This will raise an error because Ruby is strongly typed
Singleton Methods and Metaprogramming
Metaprogramming in Ruby is a technique where a program can treat its code as data and manipulate it accordingly, generating and defining new methods dynamically at runtime. Singleton methods are part of this toolkit, allowing for specific methods to be defined for individual objects.

Metaprogramming is commonly used in Ruby libraries and frameworks such as Ruby on Rails. One of the most well-known examples is how Rails adds methods to ActiveRecord models based on the column names in the associated database table.

Suppose you have a User model with first_name and last_name attributes. When you retrieve a User from the database, Rails dynamically adds methods to that instance for getting and setting these attributes.

Ruby
user = User.find(1)  # Retrieves a User from the database.

# Rails uses metaprogramming to define singleton methods on the user instance:
def user.first_name
  self[:first_name]
end

def user.first_name=(value)
  self[:first_name] = value
end

# You can now use these dynamically generated methods:
user.first_name = 'Brian'
puts user.first_name  # Outputs: "Brian"
Rails internally uses a technique called method_missing to achieve this. When you call a method that does not exist, method_missing is invoked, and Rails defines these attribute methods on-the-fly.

Implicit Returns
Methods implicitly return the value of the last statement executed in Ruby, which differs from many languages that require an explicit return statement. This can make your code more concise and help in coding interviews where you want to write shorter, cleaner methods.

Ruby
def array_sum(array)
  # no explicit return statement used
  array.reduce(0, :+)
end

numbers = [1, 2, 3, 4, 5]
puts array_sum(numbers)  # Outputs: 15
Bang Methods
In Ruby, methods ending with an exclamation mark, often called "bang" methods, usually indicate that the method will modify the object it's called on directly rather than returning a new object. This is a convention, not a rule, and it's up to the developer to adhere to this convention when defining their methods.

For example, for reversing a string, Ruby has reverse and reverse! methods. reverse returns a new string that is the reverse of the original, whereas reverse! modifies the original string in place.

While using built-in methods or creating your own, it's essential to be aware of this convention and to use it consistently.

Common Ruby Interview Mistakes
Not Knowing the Difference Between == and eql? Operators
In Ruby, both == and eql? check for equality, but they are used for different types of comparisons. == checks if two objects have the same value. It returns true even if numbers of different types (integer and float) have the same numerical value Conversely, eql? checks both the value and the type of objects. It returns true only if both match, hence being more restrictive.

Ruby
# Array with mixed integer and float
nums = [1, 2.0, 3, 2]

# '==' counts both integer 2 and float 2.0
puts nums.count { |num| num == 2 } 
# Output: 2

# 'eql?' counts only integer 2
puts nums.count { |num| num.eql? 2 }
# Output: 1
Ruby
arr = []
puts arr.nil?   # Output: false
puts arr.empty? # Output: true
Not Knowing the Difference Between nil? and empty?
nil? is a method available on all objects and returns true if the object it's called on is the special nil object. nil? is particularly useful when you want to check if a variable has been initialized or not. On the other hand, empty? is a method that isn't universally available to all objects but is primarily used with collections such as Arrays, Hashes, or Strings. This method checks whether the collection contains any elements (for arrays or hashes) or characters (for strings).

Assuming Rails Methods Are Built-in Ruby Methods
Rails extends Ruby with several helpful methods. Mistaking these for built-in Ruby methods can lead to unexpected NoMethodError exceptions. For instance, the methods blank? and present? are commonly used in Rails applications to check if an object is empty, a whitespace string, or nil. These methods are convenient, but they're not available in a non-Rails Ruby script.

Ruby
# This code will work in Rails, but not in plain Ruby
puts " ".blank?  # In Rails, Output: true

# Use built-in Ruby methods instead
puts " ".empty?  # Output: false
When to Use Symbols vs. Strings
Symbols and strings may look similar, but they are very different and serve different purposes. Symbols are immutable and often used as Hash keys, while strings are mutable and used when the content matters. A common mistake in Ruby is confusing the two, especially when accessing Hash values.

Ruby
hash = { a: 1, b: 2, c: 3 }
puts hash[:a]   # Correct, Output: 1
puts hash['a']  # Incorrect, Output: nil
Not Using Instance Variables Correctly
In Ruby, a variable's scope is denoted by its prefix. Instance variables are declared with an @ symbol. Without it, Ruby treats the declaration as a local variable, limiting its scope, which won't have the desired effect.

Ruby
class Person
  def name=(new_name)
    # Creates a local variable instead of an instance variable
    name = new_name
  end
end


class Person
  def name=(new_name)
    # Creates an instance variable
    @name = new_name
  end
end
Forgetting @ changes a variable's scope from instance-wide to method-specific, causing potential issues in your program.

When to Employ and / or vs. && / ||
Ruby has two sets of logical operators: and / or and && / ||. Both sets perform logical operations but have different operator precedences, which can lead to different results if not used carefully. && and || have higher precedence than and and or. Moreover, and and or have lower precedence than the assignment operator =. This can lead to unexpected outcomes if and or or are used with assignments.

Ruby
result = nil or true
puts result # Output: nil
To avoid such issues, use && and || for logical operations and reserve and / or for control flow, where the right-hand side is only evaluated if needed.

Ruby
# Control flow using 'or'
file = File.open('exists.txt') or die "Can't open file"

# Logical operations using '||'
is_tall = is_adult || is_over_six_feet
Parentheses are Optional
In Ruby, parentheses are optional for method calls. However, leaving them out is more nuanced than it may seem and can lead to unexpected behavior if not used carefully. It is recommended to use a community-accepted style guide such as RuboCop to avoid such issues.

Use parentheses for method invocations, except for DSL methods, methods with "keyword" status, and attribute access methods.
Always use parentheses in expressions involving && or || operators.
Avoid parentheses for methods without arguments.
Ruby
# Rails migration method, an example of an internal DSL
add_column :users, :email, :string

# Ruby keyword-like methods
puts "Hello, world!"    # Output method
gets                    # Input method

class Person
  attr_accessor :name, :age   # Defines getter and setter methods for name and age
end

person = Person.new
person.name = "John"   # Setter method for name
person.age = 30        # Setter method for age

# Method invocation when the first argument begins with an open parenthesis
x = Math.sin(y)

# Always use parentheses in expressions involving logical operators
result = (a && b) || c

# Avoid parentheses when the method doesn't accept any arguments
array.empty?   # No argument method
Concatenating Strings / Strings are Mutable in Ruby
Ruby strings are mutable objects, meaning they can be changed after creation. The << and concat methods take advantage of this by appending to the existing string, resulting in fewer objects and better performance.

On the other hand, the + operator creates a new string object that combines the original strings, which can result in more memory usage and slower performance when concatenating large strings or performing the operation many times.

Ruby
str1 = "Hello, "
str2 = "Ruby!"

# This creates a new string
puts str1 + str2 # Output: "Hello, Ruby!"

# These modify the original string
str1 << str2
puts str1 # Output: "Hello, Ruby!"

str1.concat(str2)
puts str1 # Output: "Hello, Ruby!Ruby!"
Confusion between include and extend
The include method mixes the module methods into an instance of a class, meaning the methods become instance methods. On the other hand, the extend method mixes the module methods into the class directly, making them class methods.

A common mistake is to use include when you meant to use extend, or vice versa, which will not provide the expected functionality.

Ruby
module Greeting
  def hello
    "Hello, Ruby!"
  end
end

class Person
  include Greeting
end

class Robot
  extend Greeting
end

person = Person.new
puts person.hello  # Correct, Output: "Hello, Ruby!"

puts Robot.hello   # Correct, Output: "Hello, Ruby!"

robot = Robot.new
puts robot.hello   # Incorrect, will raise a NoMethodError
Misunderstanding throw/catch and raise/rescue
Ruby error handling is often done with raise and rescue, which are used to throw and handle exceptions, respectively. throw and catch are used for control flow and are not directly related to exception handling.

A common mistake is confusing throw with raise and catch with rescue. While their names suggest similar functionality, they serve different purposes in Ruby.

Ruby
def faulty_method
  begin
    raise "An error occurred!"
  rescue => e
    puts "Rescued from error: #{e}"
  end
end

faulty_method  # Output: "Rescued from error: An error occurred!"


catch :done do
  10.times do |i|
    throw :done if i > 5
    puts i
  end
end
# Output: 0 1 2 3 4 5
Not Using Idiomatic Ruby
Ruby is renowned for its elegance and expressiveness, which are rooted in the language's idioms. The Ruby community largely follows the guidelines put forth by the Ruby Style Guide, which is enforced by linting tools like RuboCop. Here are some common mistakes made when not utilizing idiomatic Ruby, along with their corrections and guidelines.

Mistake	Correction	Guideline
def sum(a, b) (a + b) end	def sum(a, b) a + b end	Omit parentheses for the returned expression.
{'one' => 1, 'two' => 2}	{one: 1, two: 2}	Use the Ruby hash syntax.
if some_condition then do_something end	do_something if some_condition	Avoid the use of `then` for single-line `if/unless`.
result = if some_condition then something else something_else end	result = some_condition ? something : something_else	Favor the ternary operator(`?:`) over `if/then/else/end` constructs.
some_method (some_arg)	some_method(some_arg)	Use `def` with parentheses when there are parameters.
"This string contains #{'interpolation'}"	'This string contains interpolation'	Prefer single-quoted strings when you don't need string interpolation or special symbols.
my_array.map do |x| x * 2 end.sum	my_array.map { |x| x * 2 }.sum	Prefer `{...}` over `do...end` for single-line blocks. Avoid `do...end` when chaining.
Ruby Interview Replays
Below you can find replays of mock interviews conducted on our platform in Ruby. The questions asked in these interviews tend to be language-agnostic (rather than asking about language-specific details and idiosyncrasies), but in these cases, the interviewee chose Ruby as the language they would work in.

Validate string against dictionary
Shopify Interviewer
Validate string against dictionary
Captain Hamburger, a Shopify engineer, interviewed Dystopian Corgi in Ruby
Minimum tree depth
Amazon Interviewer
Minimum tree depth
Hot Gyro, an Amazon engineer, interviewed Wily Sandwich in Ruby
Move Stones Over Grid
Microsoft Interviewer
Move Stones Over Grid
The Legendary Avenger, a Microsoft engineer, interviewed Gustatory Pumpkin in Ruby
See more like this
About interviewing.io
interviewing.io is a mock interview practice platform. We've hosted over 100K mock interviews, conducted by senior engineers from FAANG & other top companies. We've drawn on data from these interviews to bring you the best interview prep resource on the web.

Sign up for a mock interview
Interview Problems
We know exactly what to do and say to get the company, title, and salary you want.
Interview prep and job hunting are chaos and pain. We can help. Really.


Google Icon
Get started for free

```
