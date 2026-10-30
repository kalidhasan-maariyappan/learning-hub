# Source ledger: eighteen.txt

SHA-256: `14b922811c4b00bf4f2bccbaf586ab7111f376d11cd4939252b98b5daf411ceb`

311 physical lines; 11 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00631 | 17–78 | [E-0002](../E-scenarios.md#e-0002) | Consider the scenario below and answer the following questions: |
| SRC-00632 | 79–84 | [D-0075](../D-coding.md#d-0075) | Given an array [1,2,34,5,6,7,8,9], sum it up using a method: |
| SRC-00633 | 85–111 | [F-0084](../F-advanced.md#f-0084) | What is metaprogramming? |
| SRC-00634 | 112–142 | [D-0060](../D-coding.md#d-0060) | Give the output of the stated class implementation: |
| SRC-00635 | 143–182 | [D-0092](../D-coding.md#d-0092) | Write code that splits a given array of integers into two arrays; the first containing odd numbers and second containing even numbers. |
| SRC-00636 | 183–199 | [D-0014](../D-coding.md#d-0014) | How would you flatten the following? |
| SRC-00637 | 200–240 | [B-0002](../B-rails.md#b-0002) | Consider the following: |
| SRC-00638 | 241–250 | [B-0158](../B-rails.md#b-0158) | What’s wrong with the code below and why? |
| SRC-00639 | 251–267 | [D-0072](../D-coding.md#d-0072) | Build an array based on the following scenario. |
| SRC-00640 | 268–282 | [E-0059](../E-scenarios.md#e-0059) | Consider the following scenario related to variables. |
| SRC-00641 | 283–305 | [A-0220](../A-ruby.md#a-0220) | What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable? |

## Complete original text

```text
Have an upcoming technical interview? Here’s a comprehensive list of important Ruby on Rails interview questions to know how to answer.

Looking to hire a Ruby on Rails (RoR) developer? You’ll want to start by putting together an interview guide that can thoroughly test your candidate’s technical knowledge.

Experienced senior developers at Arc collaborated on this list of Ruby on Rails interview questions to help set the stage for your successful RoR technical interviews.

Let’s get started! 

Looking to hire the best remote developers? Arc can help you:

⚡️ Get instant candidate matches without searching
⚡️ Identify top applicants from our network of 350,000+
⚡️ Hire 4x faster with vetted candidates (qualified and interview-ready)

Try Arc to hire top developers now →

1. Consider the scenario below and answer the following questions:
The product team has a great new feature they want to add to your Ruby on Rails application: they want every model in the system to be able to retain special user notes. You realize that there will be a collection of forms and model code that will be duplicated in the dozen ActiveRecord models already in your application.

What are some strategies you can employ for reducing duplication and bloated Active Record models? What are the pros/cons of each strategy?

Because Ruby on Rails is an MVC framework, it can become tempting to try and fit everything into the Model or the Controller. Ruby on Rails is a powerful framework that provides many different mechanisms for describing our application and keeping our models and controllers nice and tidy.

Below are two ways of reducing fat models. They illustrate different levels of shared understanding between the extracted functionality and the model in question.

1. Use ActiveSupport::Concern
If the code really belongs in the model (because it relies on ActiveRecord helpers), but there is a coherent grouping of methods, a concern might be worth implementing. For example, many models in a system could enable a user to create a note on a number of models:

require 'active_support/concern'

module Concerns::Noteable
  extend ActiveSupport::Concern

  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end

  def has_simple_notes?
    notes.not_reminders_or_todos.any?
  end

  def has_to_do_notes?
    notes.to_dos.any?
  end

  def has_reminder_notes?
    notes.reminders.any?
  end
  ...
end
The Concern can then be applied like so:

class Language < ActiveRecord::Base
  include TryFind
  include Concerns::Noteable
end
Pros:
This is a great way of testing a cohesive piece of functionality and making it clear to other developers that these methods belong together. Unit tests can also operate on a test double or a stub, which will keep functionality as decoupled from the remaining model implementation as possible.

Cons:
ActiveSupport::Concerns can be a bit controversial. When they are over-used, the model becomes peppered in multiple files and it’s possible for multiple concerns to have clashing implementations. A concern is still fundamentally coupled to Rails.

2. Delegate
Depending on the source of the bloat, sometimes it makes better sense to delegate to a service class. 10 lines of validation code can be wrapped up in a custom validator and tucked away in app/validators. Transformation of form parameters can be placed in a custom form under app/forms. If you have custom business logic, it may be prudent to keep it in a lib/ folder until it’s well defined.

The beauty of delegation is that the service classes will have no knowledge of the business domain and can be safely refactored and tested without any knowledge of the models.

Pros:
This approach is elegant and builds a custom library on top of what Ruby on Rails provides out of the box.

Cons:
If the underlying APIs change, your code will likely need to be updated to match. Instead of coupling to your model layer, you’ve now coupled yourself to either Ruby on Rails or a third-party library.

Conclusion :
This question helps demonstrate two critical skills every Ruby developer needs to develop: how to handle complexity from emerging requirements and how to decide the most appropriate refactoring.

By working through different refactoring strategies, you can explore a candidate’s problem-solving skills, their overall familiarity with Ruby on Rails, and their knowledge of MVC. Knowing what code is specific to the application and what can be generalized into a completely decoupled piece of functionality is important.

2. Given an array [1,2,34,5,6,7,8,9], sum it up using a method:
def sum(array)
  return array.inject(:+)
end
The summation of an array is one of the most fundamental concepts in programming, and there are a lot of methods to achieve it, such as iterating the array and summing the numbers. In Ruby, it’s neat to know there is a method called inject, because it’s so powerful yet simple.

3. What is metaprogramming?
Ruby developers should know what metaprogramming is because it is widely used, especially in popular frameworks such as Rails, Sinatra, and Padrino. By using metaprogramming, you can reduce duplicate code. However, the downside is that it increases the complexity of the code in the long run.

Here’s an example of metaprogramming in Ruby:

A user can have a lot of roles, and you want to check the authorization.

Normal scenario:

def admin?
     role ==  'admin'
end

def marketer?
    role == 'marketer'
end

def sales?
   role == 'sales'
end
Metaprogramming:

['admin', 'marketer', 'sales'].each do |user_role|
    define_method "#{user_role}?" do
        role == user_role
    end
end
4. Give the output of the stated class implementation:
Given this Human class implementation:

class Human

    def talk
        puts "I’m talking"
    end

     private

     def whisper
          puts "I’m whispering"
     end
end
What’s the output of:

Human.new.talk
Human.new.whisper
Human.new.send(:talk)
Human.new.send(:whisper)
I’m talking
NoMethodError: private method ‘whisper’ called for #<Human:0x007fd97b292d48>
I’m talking
I’m whispering
To explain, the class object Human.new.talk is calling an instance method, so it works perfectly. The talk method is a public method and can be called by everyone.

The class object Human.new.whisper is trying to access a private method, which it is not allowed to. Private and Protected methods are not accessible from outside. They are only used internally. This is an object-oriented design and can be used to structure the code, which the implementation is not supposed to expose to consumer object.

Finally, Human.new.send(:talk) sends a bypass control check to the method so it can be called without raising an error. Same goes to Human.new.send(:whisper).

5. Write code that splits a given array of integers into two arrays; the first containing odd numbers and second containing even numbers.
%i|select reject|.map { |m| array.partition(&odd?)}
or

array.each_with_object({odd:[], even:[]}) do |elem, memo|
  memo[elem.odd? ? :odd : :even] << elem
end # inject for ruby < 2.0 is fine as well
The straightforward approach would be to call array.select to store odds and then array.reject to store evens. There is nothing wrong with this, except it violates DRY principle:

odds = array.select &:odd?
evens = array.reject &:odd?
Future modification of this code might accidentally change the only one line from the above pair, breaking consistency. It is not likely the case for this particular example, but DRY usually works for future use.

One might notice that the latter example does one iteration through an array, while the former is still iterating the array twice, once for each method. In most cases, the performance penalty is not significant, but it should be taken into consideration when dealing with huge arrays.

Struggling with interview prep? Meet senior developers from Amazon, Microsoft, and Google now on Codementor. They’ll help you tackle coding challenges, practice interviews, and sharpen your skills in live 1:1 sessions.

Book a session with our interview prep tutors today! Your first 15 minutes are free.

Explore our other software development interview questions and answers to prep for your next remote job.

JavaScript Interview Questions
Machine Learning Interview Questions
MongoDB Interview Questions
TypeScript Interview Questions
Selenium Interview Questions
Spring Interview Questions
Data Engineer Interview Questions
React Interview Questions
Data Analyst Interview Questions
Vue Interview Questions
SQL Interview Questions
DevOps Interview Questions
Engineering Manager Interview Questions
Java Interview Questions
PHP Interview Questions
Ruby on Rails Interview Questions
Angular Interview Questions
Android Interview Questions
Data Warehouse Interview Questions
6. How would you flatten the following?
hash = { a: { b: { c: 42, d: 'foo' }, d: 'bar' }, e: 'baz' }
to

{ :a_b_c=>42, :a_b_d=>"foo", :a_d=>"bar", :e=>"baz" }
λ = ->(h, key = nil) do
  h.map do |k, v|
    _k = key ? "#{key}_#{k}" : k.to_s
    v.is_a?(Hash) ? λ.call(v, _k) : [_k.to_sym, v]
  end.flatten #⇒ note flatten 
end
Hash[*λ.call(hash)]
#⇒ {:a_b_c=>42, :a_b_d=>"foo", :a_d=>"bar", :e=>"baz"}
Understanding recursion is important. While all these Fibonacci numbers and factorials are repeated over and over again, the real-world tasks are less academic. Walking through the hash in the described manner is often a must.

The exercise might be stated as the exact opposite: given the “flattened” form of the hash, rebuild its nested representation.

7. Consider the following:
Given the following syntactic sugar:

(1..42).reduce &:*
#⇒ 1405006117752879898543142606244511569936384000000000
What makes this notation to be an equivalent of:

(1..42).reduce { |memo, elem| memo * elem }
Does the Ruby parser handle this particular case, or could this be implemented in plain Ruby?

The candidate can monkeypatch to the Symbol class with their own implementation of the aforementioned syntactic sugar.

E.g.

class Symbol
def to_proc
  # this implementation in incomplete
  # — more sophisticated question: why?
  # — even more hard: re-implement it properly
lambda { |memo, recv| memo.public_send(self, recv)  }
end
end
(1..42).reduce &:*
#⇒ 1405006117752879898543142606244511569936384000000000
There is not much magic in this example. An ampersand converts an argument, that is apparently a Symbol instance here, to Proc object, simply calling to_proc method on it. The implementation is Symbol#to_proc in done in C for performance reasons, but the candidate can write their own implementation in Ruby to make sure everything works as expected.

Answers to additional questions in the code: — the code above fails when the callee expects to receive one parameter only

(e.g. a try to use this implementation with Enumerator#each)

will fail with an arity error:

(1..42).each &:*
ArgumentError: wrong number of arguments (given 1, expected 2)
To fix this, the candidate should use the splat argument to lambda and analyze the amount of actual argument passed:

lambda do |*args|
  case args.size
  when 1 then # each-like
when 2 then # with accumulator
...
8. What’s wrong with the code below and why?
require 'benchmark'
puts Benchmark.measure do  
    break if Random.rand(100) === 1 while true
end
Operator precedence matters! The code will return

LocalJumpError: no block given (yield)
As do-end is weaker than attracting arguments to the function, that’s why one either needs to surround the whole call to Benchmark.measure with parentheses, or to use curly brackets instead of do-end.

9. Build an array based on the following scenario.
Provided we have a hash of a fixed structure (e. g. we receive this hash from a third-party data provider, that guarantees the structure):

input = [	{a1: 42, b1: { c1: 'foo' }}, 
{a2: 43, b2: { c2: 'bar' }}, 
{a3: 44, b3: { c3: 'baz' }},
… ]
How can one build an array of cN values (['foo', bar', baz'])?

Some examples would be:

input.map { |v| v.to_a.last.last.to_a.last.last }
or

input.map { |v| v.flatten.last.flatten.last }
Here one iterates through the array, collecting nested hashes and using an index to build the requested key name, but there is more straightforward approach. Hash is an Enumerable, which gives the developer an ability to query it almost as what has been done with an array.

10. Consider the following scenario related to variables.
Given the code below, how one might access the @foo variable from outside? Is it an instance variable, or class variable? What object this variable is defined on?

class Foo
  class << self
    @foo = 42
  end
end
You can access the variable with

(class << Foo ; @foo ; end)
It’s an instance variable and defined on Foo’s Singleton method, or more specifically, the eigenclass of Foo.

Each class in Ruby has its own “eigenclass.” This eigenclass is derived from Class class. Foo class is an instance of it’s eigenclass. This eigenclass has the only instance Foo; it as well has instance methods, defined as class methods on Foo, and it might have instance variables, e. g. @foo variable in this particular example.

11. What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable?
Traits/Mixins:
Examples: Mappable, Renderable, Movable
Traits/Mixins is a useful alternative to class inheritance when there is a need to acquire behavior that describes a trait (e.g. Renderable) instead of an is-a relationship (e.g. Vehicle), especially when there is a need for multiple traits since a class can only inherit once.
Namespace:
Examples: Graphics, Devise, Finance
Namespace Ruby classes and modules to avoid naming clashes with similarly-named classes/modules from libraries
Singleton class alternative:
Examples: Application, Universe, Game
Modules cannot be instantiated, therefore they can be used as an easy alternative to singleton classes to represent only one instance of a domain model via module methods (equivalent of class methods)
Bag of stateless helper methods:
Examples: Helpers, Math, Physics
Stateless helper methods receive their data via arguments without needing a class to be instantiated nor keep any state (e.g. calculate_interest(amount, rate_per_year, period)), so a module is used instead for holding a bag of stateless helper methods.
In addition to knowing the 4 different functions of modules in Ruby cited above, it’s important that your candidate knows when to use a module v.s. a superclass when doing object-oriented domain modeling. This can greatly impact the maintenance of the code a few months down the road in a software project.

For another practical example, a car-race-betting game allows players to bet on cars rendered on the screen as moving at different speeds. Players can print a sheet of game results representing each car’s details and status to claim their prize at a casino when the game is over.

If the candidate were to implement all of these details in a car object, and later introduce differences between a Jaguar, Mercedez, and Porche, the candidate would rely on a car superclass shared among three subclasses via inheritance.

However, if in the future, trucks and horses are thrown into the mix as well, the candidate would have to split the ability of an object to move, the ability to render object on screen, and the ability to print object details into separate modules (Movable, Renderable, and Printable respectively), and mix them into each of Car, Truck, and Horse.

Next, the three classes can each serve as a superclass for multiple subtypes as needed by the game (e.g. JaguarCar, FireTruck, ThoroughbredHorse). This will offer maximum separation of concerns and improved maintainability of the code.

Conclusion
Hope these Ruby on Rails interview questions help you find and vet a Ruby developer’s technical skill.

What’s more important is to also review a candidate’s past projects, how the candidate solves issues previously faced, and other soft skills. This is not an exhaustive list of interview questions, but these are some good ones to help you get started.

Let us know below if you know any other Ruby on Rails interview questions!  
```
