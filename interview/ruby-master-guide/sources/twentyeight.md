# Source ledger: twentyeight.txt

SHA-256: `ce2599349cf85ceaa317b446e743799b0d6e3cc437045c64797041fee8b2dc20`

401 physical lines; 36 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-01163 | 2–18 | [A-0207](../A-ruby.md#a-0207) | Lambda |
| SRC-01164 | 19–48 | [A-0185](../A-ruby.md#a-0185) | Blocks |
| SRC-01165 | 49–69 | [A-0208](../A-ruby.md#a-0208) | Lambda vs Blocks |
| SRC-01166 | 70–80 | [A-0209](../A-ruby.md#a-0209) | Literal way of writing Lambda & Proc |
| SRC-01167 | 81–93 | [B-0288](../B-rails.md#b-0288) | What are some of your favorite gems? What are their alternatives? |
| SRC-01168 | 94–111 | [A-0273](../A-ruby.md#a-0273) | What is a class? |
| SRC-01169 | 112–118 | [A-0276](../A-ruby.md#a-0276) | What is an object? |
| SRC-01170 | 119–150 | [A-0196](../A-ruby.md#a-0196) | What is a module? Can you tell me the difference between classes and modules? |
| SRC-01171 | 151–189 | [A-0270](../A-ruby.md#a-0270) | Can you tell me the three levels of method access control for classes and modules? What do they imply about the method? |
| SRC-01172 | 190–201 | [A-0124](../A-ruby.md#a-0124) | There are three ways to invoke a method in ruby. Can you give me at least two? |
| SRC-01173 | 202–216 | [A-0079](../A-ruby.md#a-0079) | Explain this ruby idiom: a \|\|= b |
| SRC-01174 | 217–238 | [A-0166](../A-ruby.md#a-0166) | What does self mean? |
| SRC-01175 | 239–263 | [A-0225](../A-ruby.md#a-0225) | What is a Proc? |
| SRC-01176 | 264–294 | [A-0287](../A-ruby.md#a-0287) | What is unit testing (in classical terms)? What is the primary technique when writing a test? |
| SRC-01177 | 295–297 | [A-0137](../A-ruby.md#a-0137) | What does this say about the advantages of ruby's dynamic (duck) typed system? |
| SRC-01178 | 298–300 | [A-0279](../A-ruby.md#a-0279) | Explain how (almost) everything is an object in Ruby: |
| SRC-01179 | 301–302 | [B-0388](../B-rails.md#b-0388) | What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber. |
| SRC-01180 | 303–305 | [A-0196](../A-ruby.md#a-0196) | What is the difference between a class and a module? |
| SRC-01181 | 306–308 | [A-0276](../A-ruby.md#a-0276) | What is an object? |
| SRC-01182 | 309–315 | [A-0261](../A-ruby.md#a-0261) | How would you declare and use a constructor in Ruby? |
| SRC-01183 | 316–318 | [A-0380](../A-ruby.md#a-0380) | How does a symbol differ from a string? |
| SRC-01184 | 319–321 | [A-0345](../A-ruby.md#a-0345) | How and when would you declare a Global Variable? |
| SRC-01185 | 322–324 | [A-0265](../A-ruby.md#a-0265) | How would you create getter and setter methods in Ruby? |
| SRC-01186 | 325–328 | [A-0281](../A-ruby.md#a-0281) | Describe the difference between class and instance variables? Class variables are created with the prefix ‘@@’ and are shared by all objects in a class. |
| SRC-01187 | 329–332 | [A-0066](../A-ruby.md#a-0066) | Explain some of the looping structures available in Ruby? |
| SRC-01188 | 333–339 | [B-0260](../B-rails.md#b-0260) | Explain a polymorphic association: |
| SRC-01189 | 340–347 | [B-0374](../B-rails.md#b-0374) | Explain what functional testing is: |
| SRC-01190 | 348–354 | [B-0077](../B-rails.md#b-0077) | Inject |
| SRC-01191 | 355–357 | [B-0214](../B-rails.md#b-0214) | Map |
| SRC-01192 | 358–360 | [B-0073](../B-rails.md#b-0073) | HOW Web Works |
| SRC-01193 | 361–368 | [B-0165](../B-rails.md#b-0165) | Why Ruby on Rails |
| SRC-01194 | 369–377 | [B-0102](../B-rails.md#b-0102) | Define MVC |
| SRC-01195 | 378–380 | [B-0014](../B-rails.md#b-0014) | What is ORM in Rails? |
| SRC-01196 | 381–387 | [B-0297](../B-rails.md#b-0297) | What is the difference between a plugin and a gem? |
| SRC-01197 | 388–400 | [B-0355](../B-rails.md#b-0355) | What is restful in rails |
| SRC-01198 | 401–401 | [B-0353](../B-rails.md#b-0353) | What is request.xhr? |

## Complete original text

```text
Ruby on Rails Technical Interview Questions:
Lambda
Despite the fancy name, a lambda is just a function... peculiarly... without a name. They're anonymous, little functional spies sneaking into the rest of your code.

Lambdas in Ruby are also objects, just like everything else! The last expression of a lambda is its return value, just like regular functions. As boring and familiar as that all sounds, it gives us a lot of power.

As objects, lambdas have methods and can be assigned to variables. Let's try it!

l = lambda { "Do or do not" }
puts l.call
l = lambda do |string|
  if string == "try"
    return "There's no such thing" 
  else
    return "Do or do not."
  end
end
puts l.call("try") # Feel free to experiment with this
Blocks
A simpler way to describe blocks is “A block is code that you can store in a variable like any other object and run on demand.”

addition = lambda {|a, b| return a + b }
puts addition.call(5, 6)
The lambda keyword is what is most commonly used to create a block in Ruby. There are other ways to do it, but lets keep things simple for now.

empty_block = lambda { }
puts empty_block.object_id
puts empty_block.class
puts empty_block.class.superclass
gives us

23659940
Proc
Object
Another example

class Calculator
  def add(a, b)
    return a + b
  end
end

addition_method = Calculator.new.method("add")
addition =  addition_method.to_proc

puts addition.call(5, 6)
And there you have it - a regular, old fashioned method converted to a fancy-pants block!

Lambda vs Blocks
puts lambda {}
puts Proc.new {}
As you can see, both approaches produce an instance of a Proc, though the one created using lambda is clearly distinguished with the word lambda in parentheses - an unusual deviation from the norm.

Here’s an example that uses lambdas - the return within the block hands control back to the method.

def a_method
 lambda { return "we just returned from the block" }.call
 return "we just returned from the calling method"
end
we just returned from the calling method
Here’s one that uses Proc.new - the return within the block exits not just the block itself, but also the surrounding method.

def a_method
 Proc.new { return "we just returned from the block" }.call
 return "we just returned from the calling method"
end
we just returned from the block
As a consequence, Proc.new is something that’s hardly ever used to explicitly create blocks because of these surprising return semantics. It is recommended that you avoid using this form unless absolutely necessary

Literal way of writing Lambda & Proc
short = ->(a, b) { a + b }
puts short.call(2, 3)

long = lambda { |a, b| a + b }
puts long.call(2, 3)
short = proc { |a, b| a + b }
puts short.call(2, 3)

long = Proc.new { |a, b| a + b }
puts long.call(2, 3)
###What are some of your favorite gems? What are their alternatives?

Devise (Authentication)
Paperclip (File Attachments)
Rails Admin
HIRB
Awesome Print
PRY
Bootstrap-sass
Faker
Puma
Rspec
Nokogiri
What is a class?
In reality: classes hold data, have methods that interact with that data, and are used to instantiate objects.

Like this.

class WhatAreClasses
  def initialize
    @data = "I'm instance data of this object. Hello."
  end

  def method
    puts @data.gsub("instance", "altered")
  end
end

object = WhatAreClasses.new
object.method
 #=> I'm altered data of this object. Hello.
What is an object?
An instance of a class.

To some, it's also the root class in ruby (Object).

Classes themselves descend from the Object root class.

What is a module? Can you tell me the difference between classes and modules?
Modules serve as a mechanism for namespaces.

module ANamespace
  class AClass
    def initialize
      puts "Another object, coming right up!"
    end
  end
end

ANamespace::AClass.new
 #=> Another object, coming right up!
Also, modules provide as a mechanism for multiple inheritance via mix-ins and cannot be instantiated like classes can.

module AMixIn
  def who_am_i?
    puts "An existentialist, that's who."
  end
end

# String is already the parent class
class DeepString < String
  # extend adds instance methods from AMixIn as class methods
  extend AMixIn
end

DeepString.who_am_i?
 #=> An existentialist, that's who.

AMixIn.new
 #=> NoMethodError: undefined method ‘new’ for AMixIn:Module
Can you tell me the three levels of method access control for classes and modules? What do they imply about the method?
All methods, no matter the access control, can be accessed within the class. But what about outside callers?

Public methods enforce no access control -- they can be called in any scope.

Protected methods are only accessible to other objects of the same class.

Private methods are only accessible within the context of the current object.

class AccessLevel
  def something_interesting
    another = AccessLevel.new
    another.public_method
    another.protected_method
    another.private_method
  end

  def public_method
    puts "Public method. Nice to meet you."
  end

  protected

  def protected_method
    puts "Protected method. Sweet!"
  end

  private 

  def private_method
    puts "Incoming exception!"
  end
end

AccessLevel.new.something_interesting
 #=> Public method.  Nice to meet you.
 #=> Protected method.  Sweet!
 #=> NoMethodError: private method ‘private_method’ called for
 #=>  #<AccessLevel:0x898c8>
There are three ways to invoke a method in ruby. Can you give me at least two?
Here, I'm looking for the dot operator (or period operator), the Object#send method, or method(:foo).call

object = Object.new
puts object.object_id
 #=> 282660

puts object.send(:object_id)
 #=> 282660

puts object.method(:object_id).call # (Kudos to Ezra)
 #=> 282660
Explain this ruby idiom: a ||= b
A common idiom that strong ruby developers use all the time.

# a = b when a == false
# otherwise a remains unchanged
a || a = b # (Kudos to Markus Prinz)
a = 1
b = 2
a ||= b #=> a = 1
a = nil
b = 2
a ||= b #=> a = 2
a = false
b = 2
a ||= b #=> a = 2
What does self mean?
self always refers to the current object. But this question is more difficult than it seems because Classes are also objects in ruby. (Kudos to Stephen)

class WhatIsSelf
  def test
    puts "At the instance level, self is #{self}"
  end

  def self.test
    puts "At the class level, self is #{self}"
  end
end

WhatIsSelf.test 
 #=> At the class level, self is WhatIsSelf

WhatIsSelf.new.test 
 #=> At the instance level, self is #<WhatIsSelf:0x28190>
This short snippet indicates two things:

at the class level, self is the class, in this case WhatIsSelf.
at the instance level, self is the instance in context, in this case the instance of WhatIsSelf at memory location 0x28190.
What is a Proc?
Everyone usually confuses procs with blocks, but the strongest rubyist can grok the true meaning of the question.

Essentially, Procs are anonymous methods (or nameless functions) containing code. They can be placed inside a variable and passed around like any other object or scalar value. They are created by Proc.new, lambda, and blocks (invoked by the yield keyword).

Note: Procs and lambdas do have subtle, but important, differences in ruby v1.8.6. However, I wouldn't expect a candidate talk about these nitty-gritty details during an interview. (Kudos to Noah Thorp)

# wants a proc, a lambda, AND a block
def three_ways(proc, lambda, &block)
  proc.call
  lambda.call
  yield # like block.call
  puts "#{proc.inspect} #{lambda.inspect} #{block.inspect}"
end

anonymous = Proc.new { puts "I'm a Proc for sure." }
nameless  = lambda { puts "But what about me?" }

three_ways(anonymous, nameless) do
  puts "I'm a block, but could it be???"
end
 #=> I'm a Proc for sure.
 #=> But what about me?
 #=> I'm a block, but could it be???
 #=> #<Proc:0x00089d64> #<Proc:0x00089c74> #<Proc:0x00089b34>
What is unit testing (in classical terms)? What is the primary technique when writing a test?
The strongest candidates should be quite comfortable with test or behavior driven development.

Unit testing, simply put, is testing methods -- the smallest unit in object-oriented programming. Strong candidates will argue that it allows a developer to flesh out their API before it's consumed by other systems in the application.

The primary way to achieve this is to assert that the actual result of the method matches an expected result.

require "test/unit"

class Brokened
  def uh_oh
    "I needs fixing"
  end
end

class BrokenedTest < Test::Unit::TestCase
  def test_uh_oh
    actual = Brokened.new
    assert_equal("I'm all better!", actual.uh_oh)
  end
end
 #=> Started
 #=> F
 #=> Finished in 0.663831 seconds.
 #=> 
 #=>   1) Failure:
 #=> test_uh_oh:11
 #=> <"I'm all better!"> expected but was
 #=> <"I needs fixing">.
 #=> 
 #=> 1 tests, 1 assertions, 1 failures, 0 errors
What does this say about the advantages of ruby's dynamic (duck) typed system?
That ruby program use less code and are more flexible.

Explain how (almost) everything is an object in Ruby:
You can have an in depth conversation on class hierarchies, inheritance, methods, encapsulation, polymorphism, and more.

###What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber.

What is the difference between a class and a module?
A module cannot be subclassed or instantiated, and modules can implement mixins.

What is an object?
Textbook answer here is that an object is an instance of a class and has state, behavior, and identity. In a plain text example, you can say that a truck and a car are both objects of the class Vehicle, or that apple and pear are both objects of the class Fruit.

How would you declare and use a constructor in Ruby?
Constructors are declared via the initialize method and get called when you call on a new object to be created.

Using the code snippet below, calling Order.new acts as a constructor for an object of the class Order.

image

How does a symbol differ from a string?
Short answer: symbols are immutable and reusable, retaining the same object_id.

How and when would you declare a Global Variable?
Global variables are declared with the ‘$’ symbol and can be declared and used anywhere within your program. You should use them sparingly to never.

How would you create getter and setter methods in Ruby?
Setter and getter methods in Ruby are generated with the attr_accessor method. attr_accessor is used to generate instance variables for data that’s not stored in your database column.

###Describe the difference between class and instance variables? Class variables are created with the prefix ‘@@’ and are shared by all objects in a class.

Instance variables are created with the prefix ‘@’ and belong to a single object within a class.

###Explain some of the looping structures available in Ruby?

For loop, While loop, Until Loop.

Explain a polymorphic association:
Polymorphic associations allow a model to belong to more than one other model through a single association.

image

image

###Explain what functional testing is:

Functional testing in Rails allows you to test the response of various actions contained in a controller. Using the Rails default test library, mini test, functional tests use a collection of assert statements that will tell your testing library to expect a certain response based on a control request passed in (either a get, post, patch, put, head, delete request).

The two example tests below show functional tests for making sure the post and delete requests in our UsersController properly create and destroy users. The functional tests do this by making sure the requests result in a change in the User.count and that they then redirect to the desired pages.

image

Inject
Combines all elements of enum by applying a binary operation, specified by a block or a symbol that names a method or operator.

>> (1..3).inject { |sum,  n| sum+ n }
6
>> (1..3).inject { |sum,  n| sum *  n }
6
Map
(1..4).map { |i| i*i }      #=> [1, 4, 9, 16]
(1..4).collect { "cat"  }   #=> ["cat", "cat", "cat", "cat"]
HOW Web Works
image

Why Ruby on Rails
There are lot of advantages of using Ruby on Rails(ROR)

DRY Principal
Convention over Configuration
Gems and Plugins
Scaffolding
Pure OOP Concept
Define MVC
image

for Example your url is something like this:

http://localhost:3000/users/new

here users is your controller and new is your method, there must be a file in your views/users folder named new.html.erb, so once the submit button is pressed, User model or whatever defined in the rhtml form_for syntax, will be called and values will be stored into the database.

What is ORM in Rails?
ORM tends for Object-Relationship-Model, it means that your Classes are mapped to table in the database, and Objects are directly mapped to the rows in the table.

What is the difference between a plugin and a gem?
A gem is just ruby code. It is installed on a machine and it’s available for all ruby applications running on that machine. Rails, rake, json, rspec — are all examples of gems. Plugin is also ruby code but it is installed in the application folder and only available for that specific application.

Sitemap-generator, etc.

In general, since Rails works well with gems you will find that you would be mostly integrating with gem files and not plugins in general. Most developers release their libraries as gems.

What is restful in rails
Stands for REpresentational State Transfer

operation SQL REST

create insert POST

read select GET

update update PUT

delete delete DELETE

What is request.xhr?
```
