// Ruby interview questions and answers, collected from the notes in interview/ruby/
// with duplicate questions merged. Rendered by content/interview.js.
// Fields: q question, l level (B/I/A), a answer, e explanation, x code examples,
// n example notes or sample answers in prose, p points to remember, o multiple-choice options,
// s other wordings of the same question.
window.JT.interviewData = Object.assign(window.JT.interviewData || {}, {
 "ruby_interview": [
  [
   "Ruby language overview",
   [
    {
     "q": "Is Ruby front end or backend?",
     "l": "B",
     "a": "Ruby is a general-purpose language used mainly on the back end (server side): web applications with Rails or Sinatra, APIs, background jobs, scripts and tools. It does not run in the browser the way JavaScript does.",
     "e": "A Rails app can still produce the front end: it renders HTML on the server with ERB templates and adds interactivity with Hotwire (Turbo and Stimulus). Alternatively it serves JSON to a separate front end written in React, Vue or a mobile app. Ruby can also run in the browser through WebAssembly (ruby.wasm), but that is rare.",
     "x": [
      "# Back end: a Rails controller returning JSON for a React or mobile front end\nclass Api::ProductsController < ActionController::API\n  def index\n    render json: Product.select(:id, :name, :price)\n  end\nend"
     ]
    },
    {
     "q": "Is Ruby statically typed or dynamically typed?",
     "l": "B",
     "a": "Ruby is dynamically typed: variables are not statically restricted to one declared type, while objects have types and operations are checked at runtime.",
     "e": "Duck typing depends on the behavior an object supports rather than requiring a particular class. Strong/weak typing is informal terminology; Ruby does not generally coerce an integer into a string for concatenation. Use tests, contracts and optional static typing tools where they help, and profile performance rather than assuming every dynamic program is slower.",
     "x": [
      "def empty?(value)\n  value.size == 0\nend\nempty?([]) # true\nempty?(\"\") # true\n\"hello\" + 3 # raises TypeError",
      "x = \"Hello, Interviewing.io!\"  # x is a String\nx = 42  # Now x is an Integer\n# Ruby won't automatically convert a string into a number\ny = \"5\"\nz = y + 2  # This will raise an error because Ruby is strongly typed"
     ],
     "s": [
      "Explain Dynamic Typing."
     ]
    },
    {
     "q": "What extension is used to save the ruby file?",
     "l": "B",
     "a": "Ruby source files conventionally use the .rb extension.",
     "e": "The interpreter can execute a file with another name when invoked explicitly, but .rb is the conventional extension recognized by editors and tooling.",
     "x": [
      "ruby example.rb"
     ]
    },
    {
     "q": "What is Ruby, and what are its main features and advantages?",
     "l": "B",
     "a": "Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.",
     "e": "Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.",
     "x": [
      "p 7.class                 # Integer\np nil.to_s                # \"\"\np [1, 2, 3].select(&:even?) # [2]",
      "p [1.class, nil.class, String.class] # [Integer, NilClass, Class]",
      "# Rails provides this web-specific DSL; it is not Ruby core.\nRails.application.routes.draw do\n  resources :articles\nend"
     ],
     "p": [
      "Every Ruby value is an object; a block and language syntax are not independently objects.",
      "Typing and execution strategy are different concepts.",
      "Variables hold references to objects; a variable itself is not an object.",
      "Rails supplies web conventions and ORM behavior; Ruby supplies the language."
     ],
     "s": [
      "What is Ruby and what are its main features?",
      "List some features of Ruby?",
      "What are some advantages of using Ruby?",
      "What are the main features of Ruby?",
      "What are the standout features of the Ruby programming language?",
      "What is Ruby and what makes it distinctive?",
      "What is Ruby and why is it popular?",
      "What is Ruby programming language?",
      "What is Ruby, and why is it popular for web development?",
      "What is Ruby’s programming language?"
     ]
    },
    {
     "q": "How is Ruby different from Python?",
     "l": "I",
     "a": "Ruby and Python are dynamic object-oriented languages; their syntax, object models, block conventions, method lookup and ecosystems differ.",
     "e": "Ruby commonly uses end-delimited blocks, implicit method returns, symbols and mixins, with single class inheritance. Python uses indentation, explicit return, and supports multiple class inheritance. Both support functions expressed in their own language models and anonymous callables; Python also has match/case since 3.10.",
     "x": [
      "Ruby: [1, 2, 3].map { |n| n * 2 }\nPython: [n * 2 for n in [1, 2, 3]]"
     ],
     "p": [
      "Python classes can act as mixins; claiming mixins are impossible is incorrect.",
      "Ruby uses elsif, not elseif.",
      "Python yield creates a generator; Ruby yield calls the method’s supplied block."
     ]
    },
    {
     "q": "Who is the developer of Ruby?",
     "l": "I",
     "a": "Ruby was designed by Yukihiro Matsumoto, usually called Matz, and first publicly released in 1995.",
     "e": "The language was designed in Japan; historical naming anecdotes are less useful in an interview than explaining the design goals.",
     "x": [
      "p RUBY_DESCRIPTION"
     ],
     "p": [
      "Ruby’s creator and the language’s release date are separate facts."
     ]
    },
    {
     "q": "What is the primary difference in these two code snippets?",
     "l": "I",
     "a": "The Java example has declared parameter/return types, while the Ruby method accepts any object supporting the operations it calls.",
     "e": "The Ruby empty? body calls size and compares with zero, so successful execution returns a boolean despite the lack of a return-type declaration. Passing an incompatible object raises at runtime. Static typing and duck typing describe how interfaces are checked, not an absolute guarantee of safety or speed.",
     "x": [
      "def empty?(value)\n  value.size == 0\nend\nempty?([]) # true\nempty?(\"\") # true\nempty?(Object.new) # NoMethodError"
     ]
    },
    {
     "q": "Strongly or Weakly Typed Ruby?",
     "l": "A",
     "a": "Ruby is strongly typed and dynamically typed. Types are checked at run time, and Ruby does not silently convert between unrelated types.",
     "e": "“Dynamic” means a variable can refer to any type of object and type errors appear when the code runs. “Strong” means an operation on the wrong type raises an error instead of guessing: 1 + \"2\" raises TypeError, whereas a weakly typed language such as JavaScript returns \"12\". Conversions must be explicit (to_s, to_i, Integer()).",
     "x": [
      "1 + \"2\"        # TypeError: String can't be coerced into Integer\n1 + \"2\".to_i   # 3\n\"1\" + 2.to_s   # \"12\"\n\nx = 5\nx = \"five\"     # allowed: the variable is dynamically typed"
     ]
    },
    {
     "q": "Explain the concept of ‘Crystal’, a statically-typed language inspired by Ruby, and its relationship to Ruby.",
     "l": "A",
     "a": "Crystal is a separate compiled, statically typed language with Ruby-inspired syntax. Ruby code and gems are not automatically compatible.",
     "e": "Crystal draws inspiration from Ruby's syntax and aims to combine Ruby's developer-friendly approach with the performance of languages like C or C++. While Crystal shares similarities with Ruby, it's a separate language designed for high-performance applications with strong compile-time guarantees.",
     "x": [
      "# Illustrative Crystal syntax: puts \"Hello\"\n# Build a Crystal program with its own compiler, not ruby."
     ],
     "p": [
      "Syntax similarity does not imply identical object, type or concurrency semantics."
     ]
    },
    {
     "q": "What is ‘Sorbet’ and how does it enhance Ruby code with static typing?",
     "l": "A",
     "a": "Sorbet adds optional Ruby static analysis with annotations and type signatures; sorbet-runtime can check selected contracts at runtime.",
     "e": "Introduced by Stripe, Sorbet is a type checker for Ruby. It brings optional static typing to Ruby, allowing developers to specify types for variables, method arguments, and return values. This enhances code quality and helps catch type-related errors before runtime. Sorbet doesn't change Ruby's dynamic nature; it adds a layer of static analysis for better code validation.",
     "x": [
      "# typed: true\n# With sorbet-runtime installed:\n# extend T::Sig\n# sig { params(n: Integer).returns(Integer) }\n# def double(n); n * 2; end"
     ],
     "p": [
      "Static analysis is additional tooling; ordinary Ruby remains dynamically typed. RBS/Steep are different parts of the typing ecosystem."
     ]
    },
    {
     "q": "What is the difference between Ruby and Golang?",
     "l": "A",
     "a": "Go is statically typed and compiled with goroutines; Ruby is dynamically typed with class-based APIs and a different runtime model. Either can implement web services or microservices.",
     "x": [
      "# Compare representative throughput, memory, latency and development constraints for the same service."
     ]
    },
    {
     "q": "What is the difference between Ruby and Java?",
     "l": "A",
     "a": "Ruby is dynamically typed; Java is statically typed and typically compiled to JVM bytecode then interpreted/JIT-compiled. Both support server development, garbage collection and multiple deployment models.",
     "e": "Ruby implementations also compile internally and may JIT.",
     "x": [
      "# Ruby example:\nclass User\n  attr_reader :name\n  def initialize(name); @name = name; end\nend\np User.new(\"Ana\").name"
     ]
    },
    {
     "q": "What is the difference between Ruby and JavaScript?",
     "l": "A",
     "a": "Ruby is class-based and commonly used on servers; JavaScript uses prototypes and runs in browsers and server runtimes. Both support multiple paradigms and asynchronous work through their runtimes/libraries.",
     "x": [
      "puts \"Ruby\"\n# JavaScript equivalent: console.log(\"JavaScript\");"
     ]
    },
    {
     "q": "What is the difference between Ruby and Swift?",
     "l": "A",
     "a": "Swift is statically typed and compiled, commonly used for Apple platforms and also available elsewhere; Ruby is dynamically typed and commonly used for web/backend tools.",
     "e": "Framework choice and measured constraints matter more than blanket speed/use-case rankings.",
     "x": [
      "# Swift uses double-quoted strings: let name = \"John\"\n# Ruby: name = \"John\""
     ]
    },
    {
     "q": "What is the difference between Ruby and TypeScript?",
     "l": "A",
     "a": "TypeScript adds compile-time checking to JavaScript and runs after compilation in JavaScript runtimes, including browsers and servers. Ruby remains dynamically typed, with optional external type tooling.",
     "e": "TypeScript is not limited to frontend code, and its types are normally erased at runtime. Ruby is not strictly limited to servers.",
     "x": [
      "# TypeScript: const name: string = \"Ana\";\n# Ruby: name = \"Ana\""
     ]
    },
    {
     "q": "Why Ruby Is Known As A Language Of Flexibility?",
     "l": "A",
     "a": "Ruby is called flexible because almost everything can be changed or extended: classes stay open, operators are methods, parentheses and syntax are optional in many places, and metaprogramming can define methods at run time.",
     "e": "This flexibility lets Ruby express readable DSLs (Rails routes, RSpec) and lets frameworks add behavior such as has_many. The trade-off is that powerful features like monkey patching can make code harder to follow, so they should be used with care.",
     "x": [
      "class Integer\n  def minutes = self * 60   # reopening a core class\nend\n5.minutes  # 300\n\nputs [1, 2, 3].sum   # parentheses optional\n\nclass Money\n  def +(other) = Money.new(amount + other.amount)  # operator defined as a method\nend"
     ],
     "s": [
      "Why is Ruby known as a language of flexibility?",
      "Why is Ruby known as a flexible language?",
      "Is Ruby a flexible language? Why, or why not?"
     ]
    }
   ]
  ],
  [
   "Variables, constants and syntax",
   [
    {
     "q": "How can you add a comment in Ruby code?",
     "l": "B",
     "a": "Use # for line or trailing comments. Ruby also supports =begin and =end at the beginning of a line for embedded documentation.",
     "e": "Repeated # lines are a style choice, not a parser requirement.",
     "x": [
      "# Explain why this is needed.\nputs \"Hello\" # Prints a greeting",
      "# Prices are stored as integer cents.\nprice_cents = 1250",
      "puts \"ready\" # user-facing status\n=begin\nA multiline comment.\n=end"
     ],
     "p": [
      "Prefer clear code and useful reasoning over restating every line."
     ],
     "s": [
      "How do you create comments in Ruby code?",
      "How will you comment in Ruby?"
     ]
    },
    {
     "q": "What is the difference between puts, print, and p in Ruby?",
     "l": "B",
     "a": "puts prints values with line endings and returns nil; print adds no newline and returns nil; p prints inspect forms and returns its argument (or the arguments array for several).",
     "x": [
      "p [1, 2]\nresult = p(\"hello\")\np result",
      "puts \"hi\" # hi plus newline, returns nil\nprint \"hi\" # no added newline\np \"hi\" # prints quotes and returns \"hi\"",
      "print \"Hi\"\nputs \" there\"\np [1, 2]"
     ],
     "p": [
      "puts recursively prints array elements; p preserves the array representation.",
      "Printed output and the method’s return value are separate observations.",
      "puts and print normally return nil; p is different and is useful for inspecting values."
     ],
     "s": [
      "What is the difference between puts, print, and p?",
      "Describe the difference between 'puts' and 'print' statements.",
      "Explain the difference between puts and print in Ruby. Also, describe the concept of blocks and how they are used."
     ]
    },
    {
     "q": "How and when would you declare a Global Variable?",
     "l": "B",
     "a": "A Ruby global variable starts with $ and is visible across the process.",
     "e": "Global state makes dependencies and concurrent behavior difficult to reason about. Prefer configuration objects, arguments or dependency injection for application state. Ruby also has special built-in globals with documented semantics.",
     "x": [
      "$feature_enabled = true\n# Prefer an explicit settings object in application code.",
      "$example_flag = true\np $example_flag"
     ],
     "p": [
      "Global accessibility does not provide thread safety."
     ],
     "s": [
      "What is the use of global variable $ in Ruby?"
     ]
    },
    {
     "q": "What are the variable types in Ruby and how do you tell them apart?",
     "l": "B",
     "a": "Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.",
     "e": "Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.",
     "x": [
      "class User\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend\np User.new(\"Asha\").name # \"Asha\"",
      "class Counter\n  @@count = 0\n  def self.count = @@count\n  def initialize\n    @@count += 1\n  end\nend\n2.times { Counter.new }\np Counter.count # 2",
      "class Counter\n  @count = 0 # class-instance variable\n  @@shared = 0 # class variable\n  def initialize\n    @value = 0 # each Counter instance has its own\n  end\nend"
     ],
     "p": [
      "Method visibility applies to methods, not to local-variable declarations.",
      "An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.",
      "An inherited class variable is not one independent value per subclass.",
      "Prefer explicit dependencies over mutable global state.",
      "Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil."
     ],
     "s": [
      "Explain About Class Variable And Global Variable?",
      "Explain which symbols developers use to define variables, global variables, and class variables.",
      "How to define the Instance variable, Global variable, and Class variable in Ruby.",
      "Explain how you define Instance Variable, Global Variable, and Class Variable in Ruby?",
      "How to define Instance Variable, Global Variable, and Class Variable in Ruby?",
      "How are Variables defined in Ruby?",
      "What are Ruby variables?",
      "What are the different types of variables in Ruby?",
      "How many types of variables are used in Ruby and what are they?",
      "Ruby provides four types of variables. List them and provide a brief explanation for each?",
      "What are variables in Ruby?"
     ]
    },
    {
     "q": "Explain About The Command Line Options?",
     "l": "I",
     "a": "Common Ruby command-line options include -e for an expression, -r to require a library, -I to add a load path, -w for warnings, -c for syntax checking and -v for version information.",
     "e": "Use ruby --help for the exact runtime’s flags. Historical options such as taint-related -T belong to removed Ruby security mechanisms and should not be recommended in modern Ruby. ARGV contains remaining script arguments.",
     "x": [
      "ruby -v\nruby -c app.rb\nruby -rjson -e 'puts JSON.generate({ok: true})'"
     ]
    },
    {
     "q": "Explain Not Using Idiomatic Ruby.",
     "l": "I",
     "a": "Idiomatic Ruby favors clear Enumerable operations, consistent method-call syntax and explicit distinction between text keys and identifier keys.",
     "e": "Style guidelines are conventions, not correctness proofs. Ternaries and modifier conditions are appropriate only when readable. Do not add a gap between a called method name and parenthesized arguments.",
     "x": [
      "p({ \"one\" => 1 }[\"one\"]) # 1\np({ one: 1 }[\"one\"]) # nil"
     ],
     "p": [
      "Choose a project style guide, but preserve behavior when applying it."
     ]
    },
    {
     "q": "Explain Parentheses are Optional.",
     "l": "I",
     "a": "Parentheses can be omitted in many Ruby method calls, but whitespace and argument grouping can change parsing.",
     "e": "Use ordinary call syntax such as sum(1, 2), especially with several arguments or nested calls. DSLs and keyword-like methods often omit parentheses by convention. Style rules about when to use them are recommendations; valid parsing is a language constraint.",
     "x": [
      "def sum(a, b) = a + b\np sum(1, 2) # 3\n# sum (1, 2) is invalid syntax."
     ],
     "p": [
      "A space before an opening parenthesis can be significant."
     ]
    },
    {
     "q": "How do you create a Ruby script file and execute it on a command line?",
     "l": "I",
     "a": "Save code in a .rb file and execute ruby filename.rb. Read script arguments from ARGV and interactive standard input from $stdin.",
     "e": "Use ruby -v to confirm the runtime and ruby -c file.rb to check syntax. Shell background syntax depends on the operating system: & has shell-specific behavior and is not a portable Ruby backgrounding API.",
     "x": [
      "name = ARGV.first || $stdin.gets&.chomp || \"guest\"\nputs \"Hello, #{name}\"\n# ruby hello.rb Asha"
     ],
     "p": [
      "Handle EOF: gets may return nil.",
      "Keep process execution and browser launching separate from Ruby script syntax."
     ]
    },
    {
     "q": "What are the naming conventions in Ruby?",
     "l": "I",
     "a": "Ruby conventionally uses snake_case for methods/locals and CamelCase for classes/modules. Rails adds conventions such as plural snake_case tables and singular model classes.",
     "e": "Variables with @, @@ or $ prefixes follow their own scope rules, and value constants commonly use ALL_CAPS. A Rails controller such as OrdersController typically handles the plural orders resource. These are conventions with configurable exceptions, not a single universal lowercase rule.",
     "x": [
      "class OrderItem < ApplicationRecord\n  # Default table: order_items\nend\n# Controller: OrderItemsController",
      "MAX_RETRIES = 3\nuser_name = \"Asha\"\n@attempts = 0",
      "name = \"ruby\"\np name.upcase # \"RUBY\"; name is unchanged\nname.upcase!\np name # \"RUBY\""
     ],
     "p": [
      "Class and module names are constants.",
      "Reserved words and syntax constrain valid identifiers.",
      "A non-bang method such as String#concat can still mutate.",
      "The SQL table identifier is invoice_items, not invoice items. Constants conventionally use SCREAMING_SNAKE_CASE."
     ],
     "s": [
      "Explain About Ruby Names?",
      "How do comments and naming conventions work in Ruby?",
      "What are the naming conventions?"
     ]
    },
    {
     "q": "How are constants declared and what is their scope in Ruby?",
     "l": "I",
     "a": "A Ruby constant starts with an uppercase letter and is resolved through lexical and namespace rules. Reassignment is possible and usually warns; freezing its referenced value does not prevent rebinding.",
     "e": "Nested module definitions and A::B definitions have different lexical nesting. Use qualified names to make cross-namespace access explicit. ALL_CAPS is a convention for value constants; class/module names are constants too. Ruby has no ordinary language rule that makes every constant a global variable.",
     "x": [
      "module Geometry\n  RADIUS = 5.0\n  LABEL = \"circle\".freeze\nend\np Geometry::RADIUS\n# Geometry::LABEL = \"new\" reassigns the constant (with a warning)."
     ]
    }
   ]
  ],
  [
   "Data types, nil and booleans",
   [
    {
     "q": "Explain the idiom a ||= b. Where does ||= memoization go wrong?",
     "l": "B",
     "a": "a ||= b assigns b only when a is nil or false; a truthy value such as 0 is preserved.",
     "e": "It is useful for defaulting/memoization but cannot cache a legitimate false/nil result without another sentinel. With indexed or accessor assignment, the language’s evaluation/assignment behavior is more precise than simply copying a = a || b. It is not an atomic cross-thread initialization primitive.",
     "x": [
      "a = false\na ||= 2 # a becomes 2\na = 0\na ||= 2 # a stays 0",
      "def enabled?\n  return @enabled if instance_variable_defined?(:@enabled)\n  @enabled = calculate_enabled\nend"
     ],
     "p": [
      "Per-request caching and long-lived shared caches have different concurrency and lifetime concerns."
     ],
     "s": [
      "Explain this ruby idiom: a ||= b",
      "How does memoization with ||= work, and where does it bite?"
     ]
    },
    {
     "q": "What are the data types used in Ruby?",
     "l": "B",
     "a": "Common Ruby value classes include Integer, Float, Rational, Complex, String, Symbol, Array, Hash, Range, Time, TrueClass, FalseClass and NilClass. All are object types.",
     "e": "Dynamic typing means a variable can reference different classes over time; it does not mean Ruby silently accepts incompatible operations. Ruby presents no separate nonobject primitive type hierarchy to application code, even though CRuby uses efficient immediate internal representations for some values. Integers grow subject to available memory; Float uses finite precision.",
     "x": [
      "p [42, 3.5, \"hi\", :name, [], {}, nil].map(&:class)"
     ],
     "p": [
      "\"5\" + 2 raises TypeError; use an intentional conversion such as Integer(\"5\")."
     ],
     "s": [
      "Explain Ruby data types.",
      "What are the basic data types in Ruby?"
     ]
    },
    {
     "q": "What does the safe navigation operator (&.) do?",
     "l": "B",
     "a": "&. skips a method call only when its receiver is nil and then returns nil. It does not silently skip false or every missing method.",
     "e": "Repeat &. at each legitimately optional link. Overusing it can conceal an unexpected missing record that should raise. An absent method on a non-nil receiver still raises NoMethodError.",
     "x": [
      "user = nil\np user&.name # nil\n# false&.name still calls name and normally raises NoMethodError."
     ],
     "p": [
      "Safe navigation is a nil guard, not general exception suppression."
     ]
    },
    {
     "q": "Which of the following is not a valid datatype in Ruby?",
     "l": "B",
     "a": "Float and Integer are built-in Ruby numeric classes; Timedate and Binary are not built-in core class names.",
     "e": "Time is built in and Date/DateTime are library classes. Binary data is commonly stored in a String with an appropriate encoding, not a core Binary type.",
     "x": [
      "1.class # Integer\n1.0.class # Float\n\"bytes\".b.encoding # ASCII-8BIT"
     ],
     "p": [
      "Ambiguous MCQ: both Timedate and Binary are not Ruby core data-type names."
     ]
    },
    {
     "q": "What is nil, what is false, and which values are falsy in Ruby?",
     "l": "B",
     "a": "nil is the sole instance of NilClass and represents absence; false is the false Boolean value. Only nil and false are falsy in Ruby; 0, empty strings and empty collections are truthy.",
     "e": "A conditional tests truthiness rather than calling empty?. An empty? query asks whether a supported container has no elements, and nil.empty? raises. nil is a normal Ruby value: it can be assigned, returned and stored in arrays or hashes. Use nil? to distinguish absence from a valid false result.",
     "x": [
      "p [nil, false, 0, \"\", []].map { |x| !!x } # [false, false, true, true, true]\np \"\".empty? # true",
      "nil == false # false\nif 0\n  puts \"zero is truthy\"\nend",
      "def answer; 42; end\np answer # 42\np !!0 # true"
     ],
     "n": [
      "Ruby: puts \"hello\"\nRails: bin/rails new shop\nPython web framework comparison: Rails versus Django"
     ],
     "p": [
      "Do not treat a valid false setting as missing.",
      "Rails blank? and present? are Active Support extensions.",
      "Use nil? when absence must be distinguished from false.",
      "Use inclusion: { in: [true, false] } for a required boolean.",
      "puts nil prints a newline, not the literal word nil.",
      "A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.",
      "Rails blank? is a separate predicate: empty/whitespace values can be truthy while blank? is true."
     ],
     "s": [
      "What is the difference between nil and false in Ruby?",
      "Explain Truthy and Falsy Values.",
      "What does false mean?",
      "What is nil, and what counts as false in Ruby?",
      "What is the difference between false and nil in Ruby on Rails?",
      "Mention what the difference is between false and nil in Ruby?",
      "What is the difference between “false” and “nil”?",
      "What is the difference between false and nil in Ruby?",
      "What is the difference between nil and false?",
      "What is the difference between nil, false, and empty in Ruby?",
      "What is the purpose of the 'nil' value in Ruby?",
      "What does nil mean?",
      "Explain the differences between nil and false in Ruby on Rails.",
      "What values are \"falsey\" in Rails? Or, which values are \"truthy\"? What is the result of `a = 0 || 1`?"
     ]
    },
    {
     "q": "Explain About Float, Dig And Max?",
     "l": "I",
     "a": "The intended names are Float, Float::DIG and Float::MAX. Float is Ruby’s floating-point numeric class; DIG describes guaranteed decimal precision, and MAX is the largest finite representable Float.",
     "e": "Float values use a finite binary representation, so many decimal fractions are inexact. These constants describe representation limits rather than tasks called “dig” and “max”. Do not confuse Float::DIG with Hash#dig, or Float::MAX with an arbitrary-precision integer limit.",
     "x": [
      "p Float::DIG\np Float::MAX\np 0.1 + 0.2 == 0.3 # false on usual IEEE-754 runtimes"
     ],
     "p": [
      "Use BigDecimal for domain needs requiring decimal arithmetic."
     ]
    },
    {
     "q": "How Does Ruby Deal With Extremely Large Numbers?",
     "l": "I",
     "a": "Ruby Integer supports arbitrarily large integer values subject to available memory and computation cost.",
     "e": "Since Ruby 2.4, Fixnum and Bignum were unified under Integer. CRuby may still use different internal representations for small and large integers, but applications should use Integer rather than branching on the old class names. Large-number operations have growing time and memory costs.",
     "x": [
      "p (2 ** 100).class # Integer\np 2 ** 100"
     ],
     "p": [
      "“Arbitrary precision” does not mean unlimited physical resources."
     ]
    },
    {
     "q": "How to create a new time instance in Ruby?",
     "l": "I",
     "a": "Time.now or Time.new with no arguments returns the current time. Time.new(year, month, day, ...) constructs a specified calendar time.",
     "e": "When components are supplied, defaults apply to omitted fields according to the method signature. Time zones and offsets should be explicit when converting between user-facing wall times and stored instants. A year is not required for the no-argument current-time constructor.",
     "x": [
      "p Time.now\np Time.new(2026, 1, 1, 0, 0, 0, \"+05:30\")"
     ],
     "p": [
      "Time and Date serve different use cases."
     ]
    },
    {
     "q": "What is the difference between nil?, empty?, blank? and present??",
     "l": "I",
     "a": "nil? is true only for nil. empty? asks a string, array or hash whether it has no elements. blank? (Rails) is true for nil, false, empty collections and whitespace-only strings. present? is !blank?.",
     "e": "nil? and empty? are plain Ruby; blank? and present? come from Active Support and are available in Rails apps. Calling empty? on nil raises NoMethodError, which is one reason blank? is convenient. presence returns the object if present?, otherwise nil.",
     "x": [
      "nil.nil?        # true\n\"\".nil?         # false\n\"\".empty?       # true\n\"  \".empty?     # false\n\n# Rails / Active Support\n\"  \".blank?     # true\nnil.blank?      # true\n[].present?     # false\nparams[:q].presence || \"default\""
     ],
     "s": [
      "What is the difference between nil, false, and blank?",
      "Not Knowing the Difference Between nil? and empty?",
      "What is the difference between nil?, empty?, and blank? in Ruby/Rails?"
     ]
    }
   ]
  ],
  [
   "Operators",
   [
    {
     "q": "What is the difference between `and`/`or` and `&&`/`||`? What is the result of `a = nil and true`?",
     "l": "B",
     "a": "and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil.",
     "e": "Both groups short-circuit and return operands, not necessarily booleans.",
     "x": [
      "a = nil and true\np a # nil\nb = true and false\nc = true && false\np [b,c] # [true,false]",
      "result = nil or true\np result # nil\nresult = nil || true\np result # true"
     ],
     "p": [
      "Both groups short-circuit and return operands, not necessarily booleans.",
      "Verification: https://docs.ruby-lang.org/en/3.4/syntax/assignment_rdoc.html",
      "Style preferences about and/or usage are recommendations rather than language restrictions."
     ],
     "s": [
      "Explain When to Employ and / or vs. && / ||."
     ]
    },
    {
     "q": "What are the different operators used in Ruby?",
     "l": "I",
     "a": "Ruby has arithmetic, ordering/equality, logical, bitwise, range, assignment and conditional syntax, with class-specific behavior for many operators.",
     "e": "Most arithmetic and comparison operators dispatch methods, whereas assignment and short-circuit logical syntax have grammar-defined semantics. &&/|| return operand values, and and/or have lower precedence. ** is exponentiation; ^ is bitwise XOR for integers.",
     "x": [
      "p 2 ** 3 # 8\np 5 ^ 3  # 6\np nil || \"default\" # \"default\""
     ],
     "p": [
      "An operator name does not guarantee every object implements it."
     ],
     "s": [
      "Name some operators used in Ruby?"
     ]
    }
   ]
  ],
  [
   "Strings and symbols",
   [
    {
     "q": "How does string interpolation work in Ruby?",
     "l": "B",
     "a": "String interpolation evaluates #{expression} inside a double-quoted or other interpolating string and inserts the result using to_s.",
     "e": "Use interpolation for readable presentation of variables and expressions. Single-quoted strings preserve #{...} literally. Interpolation is not input escaping: embedding values directly in SQL, HTML or shell commands can introduce injection vulnerabilities, so use the appropriate parameterization or escaping mechanism for those contexts.",
     "x": [
      "name = \"Asha\"\np \"Hello, #{name}: #{2 + 3}\" # \"Hello, Asha: 5\"\np 'Hello, #{name}' # literal characters"
     ],
     "p": [
      "Interpolated nil becomes an empty string through nil.to_s."
     ],
     "s": [
      "What is interpolation in the Ruby programming language?",
      "What Is The Use Of Interpolation In Ruby?"
     ]
    },
    {
     "q": "How is Symbol different from variables?",
     "l": "B",
     "a": "A variable is a name bound to an object; a Symbol is one kind of object. A variable can hold a symbol and later be reassigned to something else.",
     "e": "Immutability describes :active, not the status variable.",
     "x": [
      "status = :active\nstatus = :paused\np status",
      "state = :draft\nstate = :published # the variable changes; :draft is not mutated"
     ],
     "p": [
      "Immutability describes :active, not the status variable."
     ],
     "s": [
      "Explain how Symbol is different from variables?",
      "How are Symbols different from variables?"
     ]
    },
    {
     "q": "What is the difference between single quotes and double quotes for strings",
     "l": "B",
     "a": "Double-quoted Ruby strings interpret interpolation and common escape sequences; single-quoted strings are mostly literal.",
     "e": "Single quotes still recognize escaped single quotes and backslashes. Both produce String objects and can be frozen. Prefer whichever clearly expresses the text; do not claim either is always faster in a meaningful application.",
     "x": [
      "name = \"Ada\"\np \"Hello #{name}\" # \"Hello Ada\"\np 'Hello #{name}' # \"Hello #{name}\""
     ]
    },
    {
     "q": "What are symbols, and how are they different from strings?",
     "l": "B",
     "a": "A String represents text and is usually mutable; a Symbol is an immutable, interned identifier.",
     "e": "Repeated creation of the same symbol returns the same Symbol object. Strings may be frozen or deduplicated depending on how they are created. Dynamically created symbols have been eligible for collection in modern Ruby; the old blanket claim that symbols are never garbage-collected is outdated. Choose symbols for identifiers and strings for user content.",
     "x": [
      "person = {name: \"John\", age: 30}\np person[:name]",
      "p :name.equal?(:name)\ntext = +\"name\"\ntext << \"!\"\np text",
      "h = { name: \"Asha\" }\np h[:name]  # \"Asha\"\np h[\"name\"] # nil\np :name.to_s # \"name\""
     ],
     "p": [
      "Modern dynamic symbols can be collected; string-key hashes are perfectly valid and common for external data.",
      "Do not assume all equal string literals allocate different objects: freezing/deduplication changes allocation. Dynamic symbols can be garbage collected.",
      "Verification: https://docs.ruby-lang.org/en/2.2.0/ChangeLog.html (dynamic symbol GC history).",
      "Converting unbounded external input to identifiers can still consume memory.",
      "Frozen string literals may share storage or identity.",
      "Do not claim every equal string always allocates separately.",
      "Do not convert unlimited untrusted input into identifiers without considering resource usage."
     ],
     "s": [
      "What is the difference between String and Symbol?",
      "Explain the concept of a symbol in Ruby and why it is useful compared to strings.",
      "What is the difference between symbols and strings in Ruby?",
      "What is the difference between symbols and strings?",
      "How Does A Symbol Differ From A String?",
      "Explain When to Use Symbols vs. Strings.",
      "What is the difference between a symbol and a string?",
      "Explain the difference between symbols and strings in Ruby.",
      "Mention what is the difference between String and Symbol?",
      "How does a symbol differ from a string?",
      "What is the difference between Symbol and String?",
      "Explain the concept of symbols in Ruby.",
      "What are symbols in Ruby, and when should you use them?",
      "Explain what a symbol is in Ruby on Rails."
     ]
    },
    {
     "q": "Which common string methods should you know?",
     "l": "B",
     "a": "Common String operations include upcase, downcase, capitalize, strip, split, gsub, include? and length.",
     "e": "Choose substitution scope deliberately: sub replaces the first match, gsub every match. String methods normally count characters rather than bytes where appropriate, but a user-perceived grapheme can contain several code points. Bang/non-bang naming communicates risk by convention.",
     "x": [
      "p \"hello\".gsub(\"l\", \"L\") # \"heLLo\"\np \" hELLO \".strip.capitalize # \"Hello\""
     ]
    },
    {
     "q": "Explain How Can We Define Ruby Regular Expressions?",
     "l": "I",
     "a": "Write Regexp patterns as /pattern/options, %r{pattern} or Regexp.new(text).",
     "e": "Use match? for a Boolean test without retaining captures, match for MatchData and scan for multiple matches. Escape literal external text with Regexp.escape when constructing a pattern. Validate input-size and complexity risks for untrusted patterns.",
     "x": [
      "pattern = /\\A[a-z]+\\z/i\np pattern.match?(\"Ruby\") # true\np \"a1 b2\".scan(/\\d/) # [\"1\", \"2\"]"
     ],
     "p": [
      "A and z anchor the entire String; ^ and $ are line anchors."
     ]
    },
    {
     "q": "Explain the difference between 'gets.chomp' and 'gets.strip'.",
     "l": "I",
     "a": "chomp removes a record separator, normally one line ending; strip removes leading and trailing whitespace. Neither is interchangeable with the other.",
     "e": "gets can return nil at EOF. chomp preserves ordinary leading and trailing spaces, whereas strip removes them; passing a separator changes chomp’s behavior. Input cleaning is a domain decision, not general security validation.",
     "x": [
      "line = \"  Asha  \\n\"\np line.chomp # \"  Asha  \"\np line.strip # \"Asha\""
     ],
     "p": [
      "Use $stdin.gets&.chomp when EOF is allowed."
     ]
    },
    {
     "q": "Given: Explain the difference between: and",
     "l": "I",
     "a": "x += y computes x + y and rebinds x; x.concat(y) mutates the existing string so other references see the change.",
     "e": "The `+=` operator re-initializes the variable with a new value, so `a += b` is equivalent to `a = a + b`. Therefore, while it may seem that `+=` is mutating the value, it’s actually creating a new object and pointing the the old variable to that new object. This is perhaps easier to understand if written as follows:\n\n\n\n```ruby\nfoo = \"foo\"\nfoo2 = foo\nfoo.concat \"bar\"\n\nputs foo\n=> \"foobar\"\nputs foo2\n=> \"foobar\"\n\nfoo += \"baz\"\nputs foo\n=> \"foobarbaz\"\nputs foo2\n=> \"foobar\"\n\n```\n\n\n(Examining the `object_id` of `foo` and `foo2` will also demonstrate that new objects are being created.)\n\n\nThe difference has implications for performance and also has different mutation behavior than one might expect.",
     "x": [
      "x = \"hello\"",
      "x = +\"hello\"; other = x\nx.concat(\" world\")\np other # \"hello world\"\nx += \"!\"\np [x, other]",
      "x = +\"hello\"\nother = x\nx += \" world\"\np other # \"hello\"\nother.concat(\"!\")\np other # \"hello!\""
     ],
     "p": [
      "concat raises on a frozen string. Assignment to x does not mutate other’s binding.",
      "Mutation and variable rebinding have different identity and aliasing behavior."
     ],
     "s": [
      "Explain the difference between:"
     ]
    },
    {
     "q": "How to access Ruby strings elements in an application?",
     "l": "I",
     "a": "Use String#[] with an index, range, substring or regular expression, and use bytes/each_char/grapheme_clusters when the unit matters.",
     "e": "Negative indices count from the end. A missing index or substring can return nil. Character slicing follows the string’s encoding rather than treating every index as an arbitrary byte offset.",
     "x": [
      "p \"Ruby\"[0]   # \"R\"\np \"Ruby\"[-1]  # \"y\"\np \"Ruby\"[1, 2] # \"ub\""
     ],
     "p": [
      "For raw bytes use getbyte or byteslice deliberately."
     ]
    },
    {
     "q": "Explain Ruby strings?",
     "l": "I",
     "a": "A String stores a byte sequence with an associated encoding and provides text and binary manipulation methods.",
     "e": "Construct strings with literals, String.new, heredocs or conversions. Distinguish length from bytesize for variable-width encodings. Ordinary strings are mutable unless frozen; operations such as + allocate a result while << mutates.",
     "x": [
      "text = \"é\"\np [text.length, text.bytesize] # [1, 2] in UTF-8\np \"ruby\".upcase # \"RUBY\"",
      "name = \"Ruby\"\n\"Hello #{name}\" # \"Hello Ruby\"\n\"é\".length # 1\n\"é\".bytesize # 2 in UTF-8"
     ],
     "p": [
      "Characters, Unicode code points and grapheme clusters are different concepts."
     ],
     "s": [
      "Explain what a string is in Ruby on Rails."
     ]
    },
    {
     "q": "In how many ways you can compare Ruby string?",
     "l": "I",
     "a": "Compare String values with == or eql?, order them with <=>, or use casecmp/casecmp? for case-insensitive comparison.",
     "e": "casecmp returns a negative integer, zero, a positive integer or nil when comparison is not possible; it does not just return zero or one. casecmp? returns a Boolean or nil in unsupported cases. Decide whether binary, encoding-aware or domain-specific normalization is required.",
     "x": [
      "p \"a\" <=> \"b\"   # -1\np \"Ruby\".casecmp(\"ruby\") # 0\np \"Ruby\".casecmp?(\"ruby\") # true"
     ],
     "p": [
      "Unicode and locale-sensitive comparison may need explicit normalization."
     ]
    },
    {
     "q": "The .upcase and .capitalize method are used for capitalizing the whole string.",
     "l": "I",
     "a": "False (option b): upcase uppercases the full string; capitalize uppercases the first character and lowercases the remainder.",
     "e": "The exact effect follows Ruby’s Unicode casing rules and options. Both methods return a new String; their bang variants mutate the receiver and may return nil when nothing changes.",
     "x": [
      "p \"hELLO wORLD\".upcase # \"HELLO WORLD\"\np \"hELLO wORLD\".capitalize # \"Hello world\""
     ],
     "p": [
      "capitalize also lowercases the rest; it does not merely preserve all following characters."
     ],
     "s": [
      "What is the use of .capitalize method?"
     ]
    },
    {
     "q": "What is concatenating string in Ruby. In how many ways you can create a concatenating string?",
     "l": "I",
     "a": "Use + for a new String, << or concat to append in place, and interpolation or join to construct text from values.",
     "e": "+= rebinds the variable to the result of +; it is not in-place String mutation. Adjacent literal strings can be concatenated by Ruby’s parser, but placing two arbitrary String variables next to each other is not a general concatenation operation.",
     "x": [
      "a = +\"hello\"\nb = a\na += \" world\"\np b # \"hello\"\nb << \"!\"\np b # \"hello!\"",
      "text = +\"Hello, \"\nother = text + \"Ruby!\"\np text # \"Hello, \"\ntext << \"Ruby!\"\np text # \"Hello, Ruby!\""
     ],
     "p": [
      "Frozen receivers reject mutating append operations.",
      "Repeated immutable concatenation can allocate more objects; measure important paths."
     ],
     "s": [
      "Explain Concatenating Strings / Strings are Mutable in Ruby."
     ]
    }
   ]
  ],
  [
   "Control flow",
   [
    {
     "q": "Explain do while loop in Ruby.",
     "l": "B",
     "a": "Ruby can express a post-test loop with begin ... end while condition, though loop with an explicit break is often clearer.",
     "e": "A post-test loop runs the body at least once. There is no C-style do { ... } while syntax. Ensure the loop has a reachable termination condition.",
     "x": [
      "n = 0\nloop do\n  n += 1\n  break if n >= 3\nend"
     ]
    },
    {
     "q": "Explain for loop in Ruby.",
     "l": "B",
     "a": "for x in collection iterates over any object that responds to each. Idiomatic Ruby usually prefers collection.each, because for does not create a new scope.",
     "e": "for is syntax sugar for each, but the loop variable (and variables assigned inside) remain visible after the loop. With each, the block parameter is local to the block.",
     "x": [
      "for i in 1..3\n  puts i\nend\nputs i   # 3: the variable still exists\n\n(1..3).each { |j| puts j }\n# puts j  # NameError: j is local to the block"
     ]
    },
    {
     "q": "Explain until loop in Ruby.",
     "l": "B",
     "a": "until repeats its body while the condition is falsey and stops once the condition is truthy.",
     "e": "Use it when the positive end condition is easier to understand than a negated while. Like while it can execute zero times when the condition is already satisfied.",
     "x": [
      "n = 0\nuntil n == 3\n  n += 1\nend"
     ]
    },
    {
     "q": "How do conditionals work, including unless and modifier form?",
     "l": "B",
     "a": "if/elsif/else and unless choose branches based on truthiness; their expressions return the selected branch’s value, or nil when no branch matches.",
     "e": "Modifier forms put a simple condition after the expression. Only nil and false are falsy. Use case/when for several pattern-based alternatives and clarify the distinction from structural case/in matching.",
     "x": [
      "score = 95\ngrade = if score >= 90\n  \"A\"\nelse\n  \"B\"\nend\np grade # \"A\"\nputs \"not ready\" unless false",
      "number = 10\nif number > 5\n  puts \"The number is greater than 5\"\nelse\n  puts \"The number is at most 5\"\nend"
     ],
     "p": [
      "Avoid complicated negative conditions in unless, particularly with else."
     ],
     "s": [
      "Explain the usage of the 'if' statement in Ruby."
     ]
    },
    {
     "q": "Explain break statement in Ruby?",
     "l": "I",
     "a": "break exits the current loop or iterator call and may supply that expression’s result.",
     "e": "Use it when the desired condition has been satisfied or continuing is no longer useful. next skips to the next iteration, redo repeats the current one, and return exits the enclosing method; these control-flow targets differ.",
     "x": [
      "result = loop do\n  break :finished\nend\np result # :finished",
      "result = [1, 2, 3].each { |n| break n if n.even? }\nresult # 2"
     ],
     "p": [
      "The behavior of nonlocal exits inside stored procs/lambdas has additional context rules."
     ]
    },
    {
     "q": "Explain redo statement in Ruby?",
     "l": "I",
     "a": "redo repeats the current loop iteration without advancing the iterator or rechecking the loop condition first.",
     "e": "This is useful only when the repeated body will change the condition that caused the redo. Otherwise it can loop forever. retry is different: modern Ruby permits it in rescue to restart a protected begin body.",
     "x": [
      "attempt = 0\n1.times do\n  attempt += 1\n  redo if attempt < 2\nend\np attempt # 2"
     ],
     "p": [
      "A redo repeats the same yielded item."
     ]
    },
    {
     "q": "Explain Some Of The Looping Structures Available In Ruby?",
     "l": "I",
     "a": "Ruby offers while, until, for, loop and iterator methods such as each, times, upto and step.",
     "e": "Choose an iterator for collection work, a bounded numeric iterator for repetition and while/until for state-driven loops. for does not create a new block-local scope the way an each block does. Use break, next and redo for distinct control-flow behavior.",
     "x": [
      "[1, 2, 3].each_with_index { |n, i| puts \"#{i}: #{n}\" }\n3.times { |i| puts i }",
      "3.times { |n| puts n }\n[1, 2].each { |n| puts n * 2 }",
      "[1, 2, 3].each { |n| puts n }\n3.times { |i| puts i }"
     ],
     "p": [
      "Do not call retry a general loop-restart statement in modern Ruby."
     ],
     "s": [
      "What are the different types of loops in Ruby?"
     ]
    },
    {
     "q": "Explain while loop in Ruby?",
     "l": "I",
     "a": "while repeats its body while a condition is truthy, checking the condition before each ordinary iteration.",
     "e": "Update the state that controls termination. The modifier form has parsing nuances, and a begin...end while form checks after the body. Ruby offers until for the opposite condition and Enumerable operations for common collection iteration.",
     "x": [
      "count = 0\nwhile count < 3\n  puts count\n  count += 1\nend"
     ],
     "p": [
      "nil and false stop the condition; zero does not."
     ]
    },
    {
     "q": "What is a case statement in Ruby?",
     "l": "I",
     "a": "case/when evaluates patterns using pattern === target and runs the first matching branch.",
     "e": "Classes use === for instance membership, ranges for interval coverage, and regular expressions for matching. A case with no target instead tests branch truthiness. case is an expression, so it can return the selected branch’s result. case/in is a separate destructuring form with additional pattern rules.",
     "x": [
      "case value\nwhen Integer then \"number\"\nwhen /\\A[a-z]+\\z/ then \"letters\"\nelse \"other\"\nend",
      "case age\nwhen 0..17 then \"minor\"\nelse \"adult\"\nend"
     ],
     "p": [
      "Branch order matters: a broad class match can make a later narrower range branch unreachable."
     ],
     "s": [
      "Explain case statement in Ruby."
     ]
    }
   ]
  ],
  [
   "Files and I/O",
   [
    {
     "q": "Discuss the role of Ruby in creating and manipulating XML and JSON data.",
     "l": "B",
     "a": "JSON serializes Ruby arrays/hashes/scalars; XML libraries parse or build XML documents. Require the relevant library explicitly and handle untrusted input safely.",
     "e": "JSON is commonly available through require \"json\". XML parsing/building uses an appropriate library such as REXML; default/bundled gem packaging depends on Ruby version. Do not treat an XML/JSON parser as automatically safe for all untrusted input.",
     "x": [
      "require \"json\"\np JSON.parse(JSON.generate({name: \"Ana\"}))"
     ],
     "p": [
      "Library packaging changes across Ruby versions. Avoid unsafe YAML deserialization and unrestricted XML entity expansion."
     ]
    },
    {
     "q": "How to check whether a directory exist or not in Ruby?",
     "l": "I",
     "a": "Use Dir.exist?(path) to check whether a path names an existing directory.",
     "e": "The old plural exists? aliases were deprecated and removed in modern Ruby. A prior existence check can race with subsequent operations, so operations that must succeed should also handle their actual filesystem errors.",
     "x": [
      "p Dir.exist?(\".\") # true"
     ]
    },
    {
     "q": "How to open a file in Ruby?",
     "l": "I",
     "a": "Prefer File.open with a block so Ruby closes the file when the block exits, including on exceptions.",
     "e": "Use r for reading, w for truncating writes and a for append, with binary/encoding options when needed. File.new returns an open object that the caller must close; a mode cannot grant permissions denied by the operating system.",
     "x": [
      "File.open(\"input.txt\", \"r\") do |file|\n  puts file.gets\nend"
     ],
     "p": [
      "w can truncate existing files, so choose modes deliberately."
     ]
    },
    {
     "q": "How to read a file in Ruby?",
     "l": "I",
     "a": "Use gets for one line, read for the remaining contents, and readlines for an array of remaining lines; File.foreach streams lines without loading the entire file.",
     "e": "The methods read from the current file position. Prefer a block-based open or File.foreach so the descriptor is closed even if an exception occurs. Whole-file reads require memory proportional to input size.",
     "x": [
      "File.open(\"input.txt\", \"r\") do |f|\n  first = f.gets\n  rest = f.read\nend\nFile.foreach(\"input.txt\") { |line| puts line }"
     ]
    },
    {
     "q": "How will you rename and delete a file in Ruby?",
     "l": "I",
     "a": "Use File.rename(old, new) to rename or move a file and File.delete(path) to remove it.",
     "e": "To rename a file, following syntax is used. Syntax:\n\nCSS\nFile.rename(\"olderName.txt\", \"newName.txt\")\nTo delete a file, following syntax is used. Syntax:\n\nCSS\nFile.delete(\"filename.txt\")",
     "x": [
      "File.rename(\"olderName.txt\", \"newName.txt\")\nFile.delete(\"filename.txt\")"
     ]
    },
    {
     "q": "What is sysread method in Ruby?",
     "l": "I",
     "a": "IO#sysread(length) performs a low-level read of up to a requested number of bytes from an already readable IO object.",
     "e": "It requires a length argument, may raise EOFError at end of input and should not be mixed carelessly with buffered read methods on the same stream. It does not open a file or make a write-only stream readable. Prefer normal buffered read for ordinary application work.",
     "x": [
      "File.open(\"input.txt\", \"rb\") do |file|\n  p file.sysread(8)\nrescue EOFError\n  puts \"empty file\"\nend"
     ],
     "p": [
      "Use binmode when processing raw bytes."
     ]
    }
   ]
  ],
  [
   "Ruby ecosystem and the future",
   [
    {
     "q": "How can developers contribute to the growth of the Ruby ecosystem?",
     "l": "B",
     "a": "Contribute reproducible bug reports, focused patches, tests, documentation, maintained gems and community support. Follow the project’s contribution process.",
     "e": "Developers can contribute to the Ruby ecosystem by:\n\nCreating gems: Building and sharing useful gems that solve specific problems. Contributing to open-source: Participating in open-source projects, improving existing libraries, and collaborating with the community. Writing documentation: Creating clear and comprehensive documentation for gems and libraries. Reporting bugs: Identifying and reporting bugs in gems, libraries, and tools to improve their quality. Attending and organizing events: Participating in Ruby meetups, conferences, and workshops to share knowledge and learn from others.",
     "x": [
      "# Useful report: Ruby version + operating system + minimal script + expected and actual output."
     ],
     "p": [
      "Do not submit credentials or private application data in public bug reports."
     ]
    },
    {
     "q": "How is Ruby adapting to modern web development demands?",
     "l": "B",
     "a": "Rails offers APIs, background jobs, real-time features and frontend integrations, while Ruby runtime work improves execution. Choose features based on product needs and supported versions.",
     "e": "Ruby is adapting to modern web development demands by enhancing frameworks like Ruby on Rails. Features such as Action Cable for real-time communication and API mode for building APIs show its responsiveness to evolving needs. Additionally, community efforts are dedicated to integrating modern JavaScript libraries and optimizing performance to ensure Ruby remains relevant in web development.",
     "x": [
      "# Example architecture: Rails JSON API + Action Cable notifications + background processing."
     ],
     "p": [
      "Framework capabilities are separate from core language guarantees."
     ]
    },
    {
     "q": "What is your favorite api resource for ruby?",
     "l": "B",
     "a": "Name the documentation you actually use: ruby-doc.org (core and standard library), rubyapi.org, api.rubyonrails.org and guides.rubyonrails.org for Rails, and rubydoc.info for gem documentation.",
     "e": "This is an open question; the interviewer wants to see that you know where to find reliable information. Mention one you use regularly and why, such as running ri in the terminal or using rubyapi.org for searchable examples.",
     "p": [
      "Avoid answering only “Stack Overflow”; mention official documentation first."
     ]
    },
    {
     "q": "What is the significance of Ruby in the context of ethical hacking and cybersecurity?",
     "l": "B",
     "a": "Ruby supports automation and security tooling; Metasploit is one established Ruby ecosystem example. Python is also a high-level language, not a low-level alternative.",
     "e": "Ruby is a high-level dynamic language used in security automation and tools such as Metasploit. Python is also high-level; calling it a lower-level language is incorrect. Tool choice should be based on supported APIs, constraints and team familiarity.",
     "x": [
      "# Safe example: parse an application log to count authentication failures."
     ],
     "p": [
      "Use authorization and validated scope for security testing. Tool popularity does not establish language-level security."
     ]
    },
    {
     "q": "Describe recent trends and advancements in the Ruby language.",
     "l": "I",
     "a": "Discuss concrete versioned changes such as JIT work, runtime/GC improvements, typing tooling and concurrency support, and verify release notes for the runtime used by the interviewer.",
     "e": "Recent trends in Ruby include:\n\nPerformance improvements: Efforts to enhance Ruby's performance including JIT compilation and optimizations. Type checking: Tools like 'Sorbet' introduce optional static typing to improve code quality. Concurrency improvements: Exploring alternative concurrency models to better utilize multi-core processors. Community growth: Increased focus on diversity and inclusion in the Ruby community. WebAssembly exploration: Investigating the potential of using WebAssembly to run Ruby in browsers.",
     "x": [
      "ruby -v\nruby --help"
     ]
    },
    {
     "q": "Explain the potential role of Ruby in the future of augmented reality (AR) and virtual reality (VR) technologies.",
     "l": "I",
     "a": "Ruby is not used to build AR/VR experiences themselves; those run on engines such as Unity (C#) and Unreal (C++). Ruby’s realistic role is on the server side: APIs, content management, user accounts and analytics for AR/VR apps.",
     "e": "This is a speculative question. A balanced answer shows you know where Ruby fits (web back ends, tooling, automation) and where it does not (real-time rendering on devices)."
    },
    {
     "q": "Discuss the growing importance of Ruby in the field of robotics and automation.",
     "l": "A",
     "a": "Ruby can automate scripts and high-level robot coordination where libraries support the devices.",
     "e": "Real-time control loops require measured timing and hardware integration guarantees.",
     "x": [
      "# Scenario: a Ruby service schedules robot tasks through a documented HTTP API."
     ],
     "p": [
      "Real-time control loops require measured timing and hardware integration guarantees."
     ]
    },
    {
     "q": "Discuss the growing influence of Rust and Elixir in the Ruby ecosystem.",
     "l": "A",
     "a": "Rust can implement native components and runtime work; Elixir can complement Ruby through separate concurrent services. Integration is a tradeoff, not a mandatory migration.",
     "e": "Boundary failures, deployment complexity and operational ownership can outweigh local performance gains.",
     "x": [
      "# Scenario: a Rails application calls a separate worker service over a versioned API."
     ],
     "p": [
      "Boundary failures, deployment complexity and operational ownership can outweigh local performance gains."
     ]
    },
    {
     "q": "Discuss the relevance of Ruby in the context of IoT (internet of things) development.",
     "l": "A",
     "a": "Ruby may help with device-facing services and prototypes when hardware/runtime constraints permit; embedded targets may need mruby or a different toolchain.",
     "e": "Measure RAM, startup, timing and supported I/O. This is a design option, not evidence of broad IoT adoption.",
     "x": [
      "# Scenario: a Ruby gateway reads sensor messages and publishes validated measurements."
     ],
     "p": [
      "Measure RAM, startup, timing and supported I/O. This is a design option, not evidence of broad IoT adoption."
     ]
    },
    {
     "q": "Explain the potential impact of WebAssembly on Ruby development.",
     "l": "A",
     "a": "Ruby can run through WebAssembly builds such as ruby.wasm. WebAssembly is a deployment target, not a promise that interpreted Ruby code will run at native-language speed.",
     "e": "Ruby WebAssembly builds exist, including ruby.wasm. WebAssembly targets a sandboxed runtime; Ruby code still pays runtime/interpreter overhead and has capability limits. Browser support is not merely a hypothetical future possibility.",
     "x": [
      "# Example use: a browser-hosted Ruby playground with a Wasm runtime and an explicit JS/Wasm bridge.",
      "# Scenario: a learning site loads ruby.wasm and runs isolated exercises in the browser."
     ],
     "p": [
      "Sandbox capabilities, browser APIs, downloads and runtime startup differ from a normal Ruby process.",
      "Verification: https://ruby.github.io/ruby.wasm/README_md.html",
      "A normal Ruby process and a browser runtime expose different filesystem/network capabilities."
     ],
     "s": [
      "Explain the concept of WebAssembly and its implications for Ruby web applications."
     ]
    },
    {
     "q": "How might quantum computing affect Ruby?",
     "l": "A",
     "a": "Quantum computing is unlikely to change the Ruby language. If it matters, Ruby would act as a classical client that sends jobs to quantum services through their APIs, like any other cloud service.",
     "e": "Quantum programs today are written with SDKs such as Qiskit (Python) and run on cloud hardware. Ruby could orchestrate such jobs or process their results, but there is no Ruby-specific quantum roadmap. Say clearly that this is speculation.",
     "s": [
      "Explain the potential impacts of quantum computing on Ruby and programming languages in general.",
      "Discuss the potential impact of Ruby in the field of quantum machine learning.",
      "Explain the potential impacts of quantum computing on the future development of the Ruby language.",
      "How might the emergence of quantum computing impact the future development of the Ruby language?",
      "Discuss the role of Ruby in the development of quantum algorithms and quantum programming."
     ]
    },
    {
     "q": "How does Ruby contribute to the field of data science and big data analytics?",
     "l": "A",
     "a": "Ruby can clean data, aggregate records and orchestrate analytics services. For large datasets, streaming and database-side aggregation matter more than language branding.",
     "e": "While Ruby is not as commonly used in data science and big data analytics as languages like Python and R, it can still be employed for certain tasks. Ruby's libraries and gems can help in data manipulation, visualization, and simple analytics. However, the lack of specialized libraries and the slower performance compared to other languages might limit its adoption in this field.",
     "x": [
      "counts = Hash.new(0)\n[\"a\", \"b\", \"a\"].each { |value| counts[value] += 1 }\np counts"
     ],
     "p": [
      "Validate specialist library support and performance rather than assuming parity with another ecosystem."
     ]
    },
    {
     "q": "How is Ruby positioned in the context of edge computing and its potential impact on distributed systems?",
     "l": "A",
     "a": "Ruby can implement edge-side services where supported, but assess runtime size, startup, networking and memory budgets first.",
     "e": "Edge placement changes failure modes and synchronization requirements; Ruby does not remove those constraints.",
     "x": [
      "# Scenario: a gateway batches local device data before forwarding it to a central API."
     ],
     "p": [
      "Edge placement changes failure modes and synchronization requirements; Ruby does not remove those constraints."
     ]
    },
    {
     "q": "How is Ruby used in artificial intelligence and machine learning?",
     "l": "A",
     "a": "Ruby can prepare data, serve models or call ML APIs, but available tooling and performance must be evaluated for the actual task.",
     "e": "Treat ecosystem rankings as contextual judgments. Check maintenance and compatible versions before choosing a library.",
     "x": [
      "# Architecture example: Rails receives a request, calls a model service, and returns validated predictions."
     ],
     "p": [
      "Treat ecosystem rankings as contextual judgments. Check maintenance and compatible versions before choosing a library."
     ]
    },
    {
     "q": "How is the Ruby language adapting to the increasing demand for serverless computing?",
     "l": "A",
     "a": "Ruby functions can run on supported managed runtimes or custom/container deployments. Provider support, cold starts and native dependencies must be verified per deployment target.",
     "e": "The provider-specific caveat from the earlier serverless question applies. Ruby is a managed Lambda language; Ruby on other FaaS platforms can require custom handlers or container deployment. Cold starts, package size and ephemeral execution remain concerns.",
     "x": [
      "def lambda_handler(event:, context:)\n  {statusCode: 200, body: \"Hello\"}\nend",
      "def lambda_handler(event:, context:)\n  {statusCode: 200, body: event.fetch(\"message\", \"Hello\")}\nend"
     ],
     "p": [
      "Keep functions idempotent, reuse safe clients and account for cold starts, timeouts and dependency packaging.",
      "Verification: https://docs.aws.amazon.com/lambda/latest/dg/lambda-ruby.html",
      "Verification: https://learn.microsoft.com/en-us/azure/azure-functions/functions-test-a-function",
      "Same core topic as the earlier serverless question; retain the transient-resource/cold-start emphasis when consolidating."
     ]
    },
    {
     "q": "What is the difference between Ruby and Elixir?",
     "l": "A",
     "a": "Elixir runs on BEAM with immutable data and lightweight isolated processes; Ruby commonly uses mutable objects with threads/fibers/processes. Phoenix and Rails are separate web ecosystems.",
     "e": "Performance depends on workload and runtime; Elixir processes are not OS processes. Single-quoted Elixir literals are charlists rather than ordinary strings.",
     "x": [
      "# Scenario: Rails handles a CRUD product; a BEAM service owns long-lived concurrent connection state when justified."
     ]
    },
    {
     "q": "Describe the role of Ruby in the evolution of natural language processing and chatbots.",
     "l": "A",
     "a": "Ruby can tokenize text, perform simple linguistic processing and call NLP services.",
     "e": "Ruby can be used to develop natural language processing (NLP) components and chatbots. Libraries like 'Lingua' and 'Stemmer' facilitate text-processing tasks. However, Python and libraries like NLTK and spaCy are more prevalent in the NLP field due to their extensive ecosystem and performance optimizations.",
     "x": [
      "text = \"Ruby makes readable programs\"\np text.downcase.scan(/[[:alpha:]]+/).tally"
     ],
     "p": [
      "Simple tokenization is not a full NLP model; Unicode and language boundaries affect behavior."
     ]
    },
    {
     "q": "Discuss Ruby's role in blockchain and cryptocurrency applications.",
     "l": "A",
     "a": "Ruby is used for blockchain-related tooling and services, such as API clients, wallets’ back-end services, exchanges’ web platforms and scripts, rather than for the core blockchain nodes, which are usually written in Go, Rust or C++.",
     "e": "Gems exist for talking to Bitcoin and Ethereum nodes (for example eth.rb). Rails is a good fit for the web application around a crypto product: accounts, KYC, dashboards and payment flows. Performance-critical consensus code is better in compiled languages."
    },
    {
     "q": "How is Ruby being utilized in the development of cross-platform mobile applications?",
     "l": "A",
     "a": "RubyMotion historically targets native app development with Ruby-inspired tooling; current platform support and code-sharing limits must be checked before choosing it.",
     "e": "Do not promise one unchanged codebase or current compatibility without project-specific verification.",
     "x": [
      "# Scenario: share backend API contracts across mobile clients while keeping platform SDK integrations explicit."
     ],
     "p": [
      "Do not promise one unchanged codebase or current compatibility without project-specific verification."
     ]
    },
    {
     "q": "How is Ruby contributing to the field of bioinformatics and computational biology?",
     "l": "A",
     "a": "Ruby can parse, transform and orchestrate biological datasets; select maintained libraries for the exact formats and algorithms needed.",
     "e": "Use specialist tooling where numerical requirements demand it.",
     "x": [
      "# Scenario: stream FASTA records rather than loading an entire large genome file into memory."
     ]
    }
   ]
  ],
  [
   "Interview preparation",
   [
    {
     "q": "How do I prepare for a Ruby coding interview?",
     "l": "I",
     "a": "Practice timed small coding problems while explaining assumptions, invariants, complexity and edge cases aloud.",
     "e": "Implement a correct baseline, verify it with examples, then optimize a measured bottleneck. Review actual Ruby return values and mutation behavior instead of only memorizing algorithm names.",
     "n": [
      "Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.",
      "Example preparation check: explain why [1, 2].map { |n| puts n } returns [nil, nil], then run it."
     ],
     "p": [
      "Preparation advice is a recommendation, not a language guarantee.",
      "Interview preparation guidance is contextual; no question bank or timeline guarantees a pass."
     ],
     "s": [
      "How can I improve my problem-solving skills in Ruby for interviews?",
      "How long does it take to prepare for a Ruby interview?"
     ]
    },
    {
     "q": "What Ruby concepts should I focus on for technical interviews?",
     "l": "I",
     "a": "Prioritize objects, local versus instance state, Enumerable, block semantics, exception handling and safe database/web interactions.",
     "e": "For a Rails role add routing, Active Record associations and SQL, authorization, jobs, tests and production debugging. Use the job description to set depth.",
     "n": [
      "Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.",
      "Example preparation check: explain why [1, 2].map { |n| puts n } returns [nil, nil], then run it."
     ],
     "p": [
      "Preparation advice is a recommendation, not a language guarantee.",
      "Interview preparation guidance is contextual; no question bank or timeline guarantees a pass."
     ],
     "s": [
      "What are some advanced Ruby interview topics I should be aware of?",
      "What are the most common Ruby interview questions?",
      "Which Ruby topics should I prioritize before a technical round?",
      "Do I need to know Ruby on Rails for a Ruby interview?"
     ]
    },
    {
     "q": "How should a Ruby developer demonstrate practical interview readiness beyond memorized language answers?",
     "l": "I",
     "a": "Combine language understanding with practical projects, concurrency reasoning, library familiarity and testing/debugging evidence.",
     "e": "Prepare a small example showing a real trade-off, practice the relevant Ruby protocol and test it. Explain synchronization and workload limits when discussing concurrency; back claims about quality or performance with measurements.",
     "n": [
      "Example: demonstrate a tested CSV-import job that batches records, has idempotent retries and reports how many rows succeeded or failed.",
      "Example preparation check: explain why [1, 2].map { |n| puts n } returns [nil, nil], then run it."
     ],
     "p": [
      "Preparation advice is a recommendation rather than a language rule.",
      "Interview preparation guidance is contextual; no question bank or timeline guarantees a pass."
     ],
     "s": [
      "Are these questions enough to pass a Ruby interview?",
      "Do interviewers ask exactly these questions?"
     ]
    }
   ]
  ]
 ],
 "ruby_interview_collections": [
  [
   "Arrays and ranges",
   [
    {
     "q": "How do you remove `nil` values in array using ruby?",
     "l": "B",
     "a": "compact returns a new array with nil removed; compact! mutates the receiver and returns nil if no change was made.",
     "e": "`Array#compact` removes `nil` values. Example:\n\n\n\n```ruby\n>> [nil,123,nil,\"test\"].compact\n=> [123, \"test\"]\n\n```",
     "x": [
      "p [nil, 0, false, \"\"].compact # [0, false, \"\"]",
      "p [nil, false, 0, \"\", 1].compact # [false, 0, \"\", 1]"
     ],
     "p": [
      "compact is not the same as Rails compact_blank."
     ]
    },
    {
     "q": "How to access Ruby array elements? How many methods are used to access Ruby elements.?",
     "l": "I",
     "a": "Access Array elements with [], at, fetch, first, last or slices; take and drop return prefix/suffix arrays.",
     "e": "[] commonly returns nil for an out-of-range single index, while fetch raises IndexError unless a default or block is supplied. Ranges and index/length pairs return slices, with behavior differing from a scalar lookup.",
     "x": [
      "a = [10, 20, 30]\np a[1] # 20\np a.fetch(5, :missing) # :missing\np a[0, 2] # [10, 20]"
     ],
     "p": [
      "Default values can hide a mistaken index; choose raising behavior when absence is a bug."
     ]
    },
    {
     "q": "Explain Ruby ranges. What are the ways to define ranges?",
     "l": "I",
     "a": "Ranges describe intervals: a..b includes b and a...b excludes b. They also support beginless or endless forms in modern Ruby.",
     "e": "Use ranges for slices, case matching and compatible iteration. A finite-looking interval is not necessarily enumerable: Float ranges, for example, do not support ordinary each in the same way as Integer ranges. cover? checks interval coverage and can differ from include?.",
     "x": [
      "p (1..3).to_a # [1, 2, 3]\np (1...3).to_a # [1, 2]\np (1..10).cover?(4) # true",
      "p (1..5).to_a # [1, 2, 3, 4, 5]\np (1...5).to_a # [1, 2, 3, 4]"
     ],
     "p": [
      "Avoid materializing a huge range unless the array is actually needed.",
      "puts an array prints one element per line; p displays array notation. Endless and beginless ranges cannot always be converted to arrays."
     ],
     "s": [
      "What are ranges and how are they used?",
      "What is a range and how is it defined in Ruby?"
     ]
    },
    {
     "q": "In how many ways items can be added in an array in Ruby?",
     "l": "I",
     "a": "Use push or << to append, unshift to prepend and insert to add at a chosen position.",
     "e": "Appending is typically amortized O(1); prepending/inserting can shift elements and take O(n). concat appends another collection’s elements, while << adds the collection as one nested element.",
     "x": [
      "a = [2]\na.unshift(1)\na << 3\na.insert(1, :middle)\np a # [1, :middle, 2, 3]"
     ],
     "p": [
      "Specify whether nested arrays should be appended or flattened one level."
     ]
    },
    {
     "q": "What are Ruby arrays and how they can be created?",
     "l": "I",
     "a": "Array is an ordered, zero-indexed collection of object references and may contain mixed types. Create it with literals or Array.new.",
     "e": "Negative indices count backward. Array.new(n, mutable_object) repeats the same object reference, so use the block form for independent mutable elements. Arrays resize as elements are added.",
     "x": [
      "a = [1, \"two\", :three]\np a[-1] # :three\nrows = Array.new(2) { [] }\nrows[0] << 1\np rows # [[1], []]",
      "values = [1, \"two\", :three]\np values[0] # 1\np Array.new(2) { [] }"
     ],
     "p": [
      "A shallow copy still shares nested element objects.",
      "Array.new(2, []) shares the same nested array; use a block for independent objects."
     ],
     "s": [
      "How do you create an array in Ruby?"
     ]
    }
   ]
  ],
  [
   "Hashes",
   [
    {
     "q": "Explain Ruby hashes?",
     "l": "I",
     "a": "Hash maps keys to values and preserves insertion order. Keys normally use hash and eql? to determine equality.",
     "e": "A missing [] lookup returns the configured default, nil by default; a Hash may instead have a custom value or default proc. fetch is appropriate when missing data should raise. Keep keys stable after insertion and avoid shared mutable default values.",
     "x": [
      "counts = Hash.new(0)\ncounts[:ruby] += 1\np counts[:missing] # 0\np({ name: \"Asha\" }.fetch(:name))",
      "items = [\"ruby\", \"rails\"]\np items[0] # \"ruby\"\nuser = { name: \"Asha\", active: true }\np user.fetch(:active) # true",
      "counts = Hash.new(0)\n%w[a b a].each { |word| counts[word] += 1 }\ncounts # {\"a\"=>2, \"b\"=>1}"
     ],
     "p": [
      "A stored nil can be distinguished from absence using key?.",
      "Mutation of a nested element can be visible through multiple collections sharing it.",
      "Hash.new([]) shares one mutable default array; use a block for independent collections."
     ],
     "s": [
      "What are arrays and hashes in Ruby?",
      "What is Hash in Ruby on Rails?",
      "What is a Hash in Ruby on Rails?"
     ]
    },
    {
     "q": "Which hash methods and patterns should you know?",
     "l": "I",
     "a": "Know fetch, dig, merge, each_with_object, transform_values, group_by and default-value patterns for Hash-based work.",
     "e": "fetch distinguishes a missing key from a stored nil or false and may raise KeyError or use a default/block. dig walks nested supported containers and can raise TypeError for an incompatible intermediate object. Hash.new(0) works for numeric counting, but shared mutable defaults such as Hash.new([]) are a common bug.",
     "x": [
      "groups = Hash.new { |h, key| h[key] = [] }\ngroups[:ruby] << \"Asha\"\np groups # {:ruby=>[\"Asha\"]}"
     ],
     "p": [
      "group_by is an Enumerable operation that returns a Hash, not only a method about an existing Hash."
     ]
    }
   ]
  ],
  [
   "Iterators and Enumerable",
   [
    {
     "q": "What is the Enumerable#inject method and how is it used?",
     "l": "B",
     "a": "inject, also called reduce, combines a sequence into one accumulator using a block or named operation. An explicit initial value handles empty inputs predictably.",
     "e": "The block receives the accumulator and current element, and its result becomes the next accumulator. Without an initial value, the first element initializes it; an empty collection then returns nil. If mutating a container accumulator, return that container or use each_with_object, whose block result is ignored.",
     "x": [
      "p [1, 2, 3].inject(0) { |sum, n| sum + n } # 6\np [].reduce(0, :+) # 0",
      "[1, 2, 3].inject(0) { |sum, n| sum + n } # 6\n[].inject(0, :+) # 0"
     ],
     "p": [
      "inject is an alias of reduce."
     ],
     "s": [
      "Inject"
     ]
    },
    {
     "q": "What are Ruby iterators and how do they work?",
     "l": "B",
     "a": "Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.",
     "e": "Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy. String is not Enumerable, so use scan for extracting matches or each_line/each_char before Enumerable operations. Use numeric times/upto/step to express repetitions. Array#each returns its receiver, collect is an alias of map, and step advances values rather than indenting output.",
     "x": [
      "text = \"Email user@example.com\"\np text.scan(/\\b[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b/)\n1.upto(5) { |n| puts \"*\" * n }",
      "p [1, 2, 3].map { |n| n * 2 } # [2, 4, 6]\np [1, 2, 3].select(&:odd?) # [1, 3]\np [1, 2, 3].reduce(0, :+) # 6"
     ],
     "p": [
      "The sample regex is illustrative, not a full email-address validator.",
      "Choose each for effects and map for returned values.",
      "Repeated traversal and intermediate arrays can dominate performance."
     ],
     "s": [
      "How do iterators like each work in Ruby?",
      "How many iterators are there in Ruby?",
      "What are Ruby iterators?",
      "What are some commonly used iterators in Ruby?"
     ]
    },
    {
     "q": "What is the difference between `Array#map` and `Array#each`? Note: `collect` is an alias of `map`",
     "l": "B",
     "a": "each yields elements and ordinarily returns the receiver; map collects block results into a new array. Either block may still mutate referenced objects.",
     "x": [
      "a = [1, 2]\np a.each { |n| n * 2 } # [1, 2]\np a.map { |n| n * 2 } # [2, 4]",
      "[1, 2].map { |n| n * 2 } # [2, 4]\n[1, 2].each { |n| puts n } # prints values, returns [1, 2]",
      "numbers = [1, 2, 3]\np numbers.map { |n| n * 2 } # [2, 4, 6]\np numbers.each { |n| n * 2 } # [1, 2, 3]"
     ],
     "p": [
      "A map block calling puts produces nil entries.",
      "Returning a new array is not deep copying the objects inside it."
     ],
     "s": [
      "Explain the difference between Array#each and Array#map",
      "What is the difference between Array#map and Array#each?",
      "Map"
     ]
    },
    {
     "q": "How do you create a custom Enumerator in Ruby?",
     "l": "I",
     "a": "An Enumerator packages an iteration so it can be chained or driven with methods such as next. Create one from a method without a block or with Enumerator.new and a yielder.",
     "e": "Enumerator.new can represent a custom or infinite producer. each drives it internally; next drives it externally and raises StopIteration when it is exhausted. Call lazy to build a demand-driven transformation pipeline; plain map on an Enumerator is generally eager. Lazy evaluation is especially useful when only a small prefix of a large or infinite source is needed.",
     "x": [
      "numbers = Enumerator.new { |y| n = 0; loop { y << n; n += 1 } }\np numbers.lazy.select(&:even?).take(3).force # [0, 2, 4]"
     ],
     "p": [
      "Enumerator::Lazy prevents eager materialization of an unbounded source."
     ],
     "s": [
      "What are Ruby’s enumerator objects, and how are they used?"
     ]
    },
    {
     "q": "What is the difference between map, select, and reduce in Ruby?",
     "l": "I",
     "a": "map transforms every element, select keeps elements whose block is truthy, and reduce accumulates a result of any type, not necessarily a scalar.",
     "e": "Without an explicit initial value reduce uses the first element; [].reduce(:+) is nil while [].reduce(0, :+) is 0.",
     "x": [
      "values = [1, 2, 3]\np values.map { |n| n * 2 }\np values.select(&:odd?)\np values.reduce(0, :+)"
     ]
    },
    {
     "q": "What is the Enumerable module and why does it matter?",
     "l": "I",
     "a": "Enumerable provides methods such as map, select, reduce, sort, group_by and min to objects that implement each.",
     "e": "An Enumerable implementation must yield its elements consistently; comparison-dependent methods also need usable comparisons. Returning an Enumerator when each has no block makes custom collections easier to chain.",
     "x": [
      "class Playlist\n  include Enumerable\n  def initialize(tracks) = @tracks = tracks\n  def each(&block)\n    return enum_for(:each) unless block\n    @tracks.each(&block)\n  end\nend\np Playlist.new([\"a\", \"b\"]).map(&:upcase)"
     ],
     "p": [
      "The iteration protocol is the foundation; some derived operations need additional semantics."
     ]
    }
   ]
  ]
 ],
 "ruby_interview_methods": [
  [
   "Methods and arguments",
   [
    {
     "q": "Are Ruby operators actually methods?",
     "l": "B",
     "a": "Many Ruby operators dispatch methods, such as a + b becoming a.+(b), but syntax such as assignment and short-circuit &&/|| cannot be redefined as ordinary operator methods.",
     "e": "Overload only operators with meaningful domain semantics. Defining + for a vector lets addition remain readable while preserving its contract. Operator precedence remains fixed by Ruby’s grammar.",
     "x": [
      "class Vector\n  attr_reader :x, :y\n  def initialize(x, y)\n    @x, @y = x, y\n  end\n  def +(other) = Vector.new(x + other.x, y + other.y)\nend\np (Vector.new(1, 2) + Vector.new(3, 4)).x # 4"
     ]
    },
    {
     "q": "Explain Assuming Rails Methods Are Built-in Ruby Methods.",
     "l": "B",
     "a": "Methods such as blank?, present? and duration helpers such as 2.days come from Rails/Active Support, not plain Ruby core.",
     "e": "A standalone Ruby script can explicitly require the relevant Active Support extension when that dependency is intended. Otherwise use native methods with the correct semantics: empty? does not test whitespace-only strings, and nil does not implement empty?.",
     "x": [
      "p \" \".empty? # false in Ruby\n# With Active Support loaded: \" \".blank? is true."
     ],
     "p": [
      "Core, standard libraries, gems and Rails extensions are different layers."
     ]
    },
    {
     "q": "How do you define a method, and how does return work?",
     "l": "B",
     "a": "Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.",
     "e": "Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.",
     "x": [
      "def greet(name, punctuation: \"!\")\n  \"Hello, #{name}#{punctuation}\"\nend\np greet(\"Asha\", punctuation: \".\") # \"Hello, Asha.\"",
      "def double(number)\n  number * 2\nend\np double(3) # 6"
     ],
     "p": [
      "A method can return nil, false, a collection or any other Ruby value."
     ],
     "s": [
      "Define Ruby methods?",
      "Explain Implicit Returns.",
      "How do you define a method in Ruby?",
      "How to use Ruby methods?"
     ]
    },
    {
     "q": "What are the different ways to invoke a method in Ruby?",
     "l": "B",
     "a": "A Ruby method call sends a message to a receiver; lookup searches the receiver’s method lookup chain and invokes method_missing if no matching method is found.",
     "e": "Methods can be invoked with normal dot syntax, public_send/send, or a Method object’s call. Respect visibility and do not pass arbitrary untrusted method names to send. A method object captures a receiver, while source code syntax alone does not.",
     "x": [
      "user.name\nuser.public_send(:name)\nuser.method(:name).call\n# send can invoke private methods, so it is not equivalent to public_send.",
      "class ABC\n  def xyz = 42\nend\np ABC.new.xyz # 42",
      "def total(*values, multiplier: 1)\n  values.sum * multiplier\nend\np total(*[2, 3], multiplier: 2) # 10"
     ],
     "p": [
      "Syntactic validity and a specific return value are separate questions.",
      "Verification: https://docs.ruby-lang.org/en/3.4/syntax/calling_methods_rdoc.html"
     ],
     "s": [
      "There are four ways to invoke a method in ruby. Can you give me at least two?",
      "There are three ways to invoke a method in ruby. Can you give me at least two?",
      "What is the return value for:",
      "Explain About Normal Method Class?",
      "For the class `ABC` the given as: What is the return value for: - `ABC::new::xyz` - `ABC::new.xyz` - `ABC.new::xyz` - `ABC.new.xyz`"
     ]
    },
    {
     "q": "Describe the 'method' method and its applications.",
     "l": "I",
     "a": "Object#method returns a bound Method object that preserves its receiver and can be inspected or called later.",
     "e": "The 'method' method in Ruby is used to retrieve a Method object associated with a particular method name of an object. This Method object allows dynamic invocation of methods, even those defined in modules or classes that the object inherits from. This is especially useful in scenarios where method names are determined at runtime or when you need to store a reference to a method to be called later. It creates more flexible and dynamic code structures.",
     "x": [
      "printer = \"hello\".method(:upcase)\np printer.call # \"HELLO\""
     ],
     "p": [
      "Use public_method or an allowlist when method selection comes from untrusted data."
     ]
    },
    {
     "q": "Explain Bang Methods.",
     "l": "I",
     "a": "A ! suffix conventionally marks a more dangerous counterpart, often mutation, but the language does not enforce a universal meaning.",
     "e": "String#reverse! mutates while reverse returns another String; Rails save! raises on failure while save reports failure differently. Non-bang methods can mutate, and some bang methods return nil when no modification is required.",
     "x": [
      "text = +\"ruby\"\np text.reverse # \"ybur\", text stays ruby\ntext.reverse!\np text # \"ybur\"",
      "name = \"ruby\"\nname.upcase # \"RUBY\", name unchanged\nname.upcase! # mutates name"
     ],
     "p": [
      "Read the method’s contract instead of inferring all semantics from punctuation."
     ],
     "s": [
      "Describe what destructive methods are."
     ]
    },
    {
     "q": "How do keyword arguments work, and how are they different from a hash?",
     "l": "I",
     "a": "Keyword parameters name arguments explicitly and may be required or defaulted. In Ruby 3, positional Hash arguments are separated from declared keyword parameters.",
     "e": "Use **kwargs to receive/forward keyword pairs and *args for positional arguments. A method taking one positional options hash can still receive keyword-looking syntax as that hash when it declares no keyword parameters. For wrappers use ... or explicit forwarding according to the interface.",
     "x": [
      "def create_user(name:, role: \"member\")\n  { name: name, role: role }\nend\np create_user(**{ name: \"Asha\" })"
     ],
     "p": [
      "Do not claim all final hashes and keywords are interchangeable."
     ]
    },
    {
     "q": "Explain what the splat operator is.",
     "l": "A",
     "a": "* gathers or expands positional arguments, while ** gathers or expands keyword arguments.",
     "e": "The meaning depends on definition versus call site. Ruby 3 separates positional hashes from keyword arguments, so forwarding often needs explicit **kwargs or ... . Splatting does not remove the need to design an understandable method interface.",
     "x": [
      "def log(*messages, **options)\n  [messages, options]\nend\nlog(\"hello\", level: :info)"
     ]
    }
   ]
  ],
  [
   "Blocks, procs and lambdas",
   [
    {
     "q": "What are blocks in Ruby, and how are they used?",
     "l": "B",
     "a": "A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.",
     "e": "Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.",
     "x": [
      "def twice\n  2.times { yield }\nend\ntwice { puts \"hello\" }",
      "3.times { puts \"Hello, World!\" }\n[1, 2, 3].each { |number| puts \"Number: #{number}\" }",
      "def surround\n  puts \"start\"\n  yield\n  puts \"end\"\nend\nsurround { puts \"middle\" }"
     ],
     "p": [
      "Calling yield without a supplied block raises LocalJumpError.",
      "Calling a required yield without a block raises LocalJumpError."
     ],
     "s": [
      "Discuss the concept of blocks and their significance.",
      "Explain About Ruby Code Blocks?",
      "Explain the concept of a block in Ruby and provide an example of its usage.",
      "How does a block differ from a method in Ruby?",
      "What are Ruby blocks and how do you use them?",
      "What is a block and how do you pass one?",
      "Explain what blocks are in Ruby on Rails."
     ]
    },
    {
     "q": "What is a Proc?",
     "l": "B",
     "a": "A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.",
     "e": "A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.",
     "x": [
      "factor = 3\ntriple = ->(n) { n * factor }\ntriple.call(4) # 12\ndef with_value\n  yield 10\nend\nwith_value { |n| n + 1 } # 11"
     ],
     "s": [
      "Explain what a proc is."
     ]
    },
    {
     "q": "Explain ampersand parameter (&block) in Ruby?",
     "l": "I",
     "a": "An &block parameter captures the block passed to a method as a Proc object, so the method can store it, pass it to another method or call it later with block.call.",
     "e": "With yield the block stays anonymous and can only be invoked. Naming it with & converts it to a Proc. At a call site, & does the reverse: it turns a Proc (or anything with to_proc) back into a block. If no block was given, the parameter is nil.",
     "x": [
      "def on_save(&callback)\n  @callbacks ||= []\n  @callbacks << callback      # stored for later\nend\n\ndef each_twice(&block)\n  [1, 2].each(&block)         # passed on as a block\n  [1, 2].each(&block)\nend\n\neach_twice { |n| print n }  # 1212"
     ],
     "p": [
      "Capturing a block allocates a Proc object; prefer yield when you only need to call it."
     ]
    },
    {
     "q": "In how many ways a block is written in Ruby?",
     "l": "I",
     "a": "Ruby blocks use { ... } or do ... end, but their binding precedence differs.",
     "e": "Braces bind more tightly than do/end in method-call parsing. Use braces conventionally for short expressions and do/end for longer blocks, but do not mechanically swap them in nested calls.",
     "x": [
      "[1, 2, 3].each { |n| puts n }\n[1, 2, 3].each do |n|\n  puts n\nend"
     ],
     "p": [
      "Parentheses can make the target method unambiguous."
     ]
    },
    {
     "q": "What are blocks, procs and lambdas, and how do they differ?",
     "l": "I",
     "a": "A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.",
     "e": "Use yield for the implicit block, &block to capture it, and call to execute a stored Proc. Both kinds close over surrounding local variables. A non-lambda proc with return can raise LocalJumpError if its defining method has already returned. A proc’s return target is where it was defined, not where it happens to be called.",
     "x": [
      "loose = proc { |x, y| [x, y] }\nstrict = ->(x, y) { [x, y] }\np loose.call(1) # [1, nil]\np strict.call(1, 2)",
      "p ->(x) { x * 2 }.call(3) # 6\np proc { |x, y| [x, y] }.call(3) # [3, nil]\np ->(x) { x }.lambda? # true",
      "factor = 3\ntriple = ->(n) { n * factor }\ntriple.call(4) # 12\ndef with_value\n  yield 10\nend\nwith_value { |n| n + 1 } # 11"
     ],
     "p": [
      "An ordinary proc with return can raise LocalJumpError if invoked after its defining method has returned.",
      "Keyword argument rules still apply; “lenient arity” is not permission to pass every invalid call.",
      "A method takes one implicit block but may receive many Proc objects as ordinary arguments."
     ],
     "s": [
      "What are Block, Proc, and Lambda in Ruby?",
      "What is the difference between blocks, procs, and lambdas in Ruby?",
      "Explain Blocks, Procs, Lambdas.",
      "What is the difference between blocks, procs, and lambdas?",
      "Blocks",
      "Lambda",
      "Lambda vs Blocks",
      "Literal way of writing Lambda & Proc",
      "Mention What Is The Difference Between Procs And Blocks?",
      "What are blocks and procs?",
      "What is the difference between proc and lambda in Ruby?",
      "Explain the concept of procs and lambdas.",
      "How do Procs and lambdas differ in Ruby?",
      "Explain the difference between proc and lambda in Ruby.",
      "What are Ruby's Proc and Lambda objects?",
      "What is the difference between a proc and a lambda?"
     ]
    },
    {
     "q": "What does &:method mean in something like map(&:upcase)?",
     "l": "I",
     "a": "At a call site, & converts an object to a block using to_proc. Symbol#to_proc produces callable behavior that invokes the named method on each supplied receiver.",
     "e": "Thus array.map(&:upcase) behaves like array.map { |item| item.upcase } for this simple transform. This shorthand is appropriate when the block is exactly one such call; use a normal block for additional logic, multiple yielded values or clearer parameter handling.",
     "x": [
      "p [\"a\", \"b\"].map(&:upcase) # [\"A\", \"B\"]\np [\"a\", \"b\"].map { |s| s.upcase }",
      "p %w[a b].map(&:upcase) # [\"A\", \"B\"]",
      "def symbol_callable(name)\n  proc { |receiver, *args, **kwargs, &block| receiver.public_send(name, *args, **kwargs, &block) }\nend\n(1..5).reduce(&symbol_callable(:*)) # 120\n%w[ruby rails].map(&symbol_callable(:upcase)) # [\"RUBY\", \"RAILS\"]"
     ],
     "p": [
      "The ampersand is block conversion here, not bitwise AND.",
      "This shorthand is clearest for a simple method call; use an explicit block for arguments or branching."
     ],
     "s": [
      "In Ruby code, you quite often see the trick of using an expression like `array.map(&:method_name)` as a shorthand form of `array.map { |element| element.method_name }`. How exactly does it work?",
      "Consider the following:"
     ]
    },
    {
     "q": "What is the difference between yield and call in Ruby?",
     "l": "I",
     "a": "yield invokes a method’s supplied block; call invokes a callable object such as a Proc, lambda or Method. Capture &block when you need to store or forward it explicitly.",
     "e": "Do not claim a universal performance difference without benchmarking the Ruby version and workload.",
     "x": [
      "def implicit; yield(2); end\ndef explicit(&block); block.call(2); end\np [implicit { |n| n*2 }, explicit { |n| n*2 }]"
     ]
    },
    {
     "q": "What does yield do, and how does block_given? work?",
     "l": "I",
     "a": "yield invokes the block passed to the current method, while block_given? reports whether that block exists. An &block parameter captures the block as a Proc, or nil when no block was supplied.",
     "e": "Yield values to parameterize a caller’s behavior, such as an iterator yielding each record. Methods that offer optional callbacks should test block_given? or a captured block. At a call site, &callable turns a Proc or another object supporting to_proc into the method’s implicit block.",
     "x": [
      "def transform(x)\n  block_given? ? yield(x) : x\nend\np transform(4) { |n| n * n } # 16\np transform(4) # 4",
      "def twice\n  yield(2) if block_given?\nend\np twice { |x| x * 2 } # 4",
      "def twice\n  return enum_for(:twice) unless block_given?\n  yield 1\n  yield 2\nend\ntwice { |n| puts n }"
     ],
     "p": [
      "The name block after & is conventional, not mandatory.",
      "A captured block can be named using &block and invoked with block.call."
     ],
     "s": [
      "What is yield statement in Ruby?",
      "How do yield and block_given? work?",
      "What is Yield in Ruby on Rails?",
      "Discuss the purpose of the 'yield' keyword in Ruby.",
      "Explain what is “Yield” in Ruby on Rails?"
     ]
    },
    {
     "q": "What is a closure in Ruby and how is it used?",
     "l": "A",
     "a": "A closure keeps access to its defining lexical environment, allowing deferred code to use and update captured local variables.",
     "e": "A closure in Ruby is a self-contained bundle of code that can be executed later, retaining the context in which it was created. It's a combination of a function and its surrounding lexical scope, which allows it to remember variables and values even after its outer function has finished executing. Closures are frequently used in scenarios like callbacks where you want to define a piece of behavior to be executed at a later time but still have access to the variables from the defining scope.",
     "x": [
      "def counter\n  count = 0\n  -> { count += 1 }\nend\nc = counter\np [c.call, c.call] # [1, 2]",
      "def outer\n  x = 10\n  reader = proc { x }\n  x = 20\n  reader.call\nend\np outer # 20",
      "def counter\n  n = 0\n  -> { n += 1 }\nend\nc = counter\np [c.call, c.call] # [1, 2]"
     ],
     "p": [
      "Captured locals are bindings, not frozen snapshots.",
      "Avoid unintended retention of a large surrounding object graph.",
      "A method defined with def does not close over surrounding local variables like a block.",
      "Binding packages execution context; never eval untrusted text in that context."
     ],
     "s": [
      "Explain the concept of closures in Ruby and how they capture their surrounding context.",
      "Describe a closure in Ruby?",
      "What is a closure in Ruby on Rails?",
      "What is Clouser in Ruby on Rails?",
      "How do closures and binding work in Ruby?"
     ]
    },
    {
     "q": "What are Procs in Ruby? How do they compare to closures in JS?",
     "l": "A",
     "a": "A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form.",
     "x": [
      "class Maker\n  def initialize; @value = 42; end\n  def callback; proc { [self, @value] }; end\nend\np Maker.new.callback.call"
     ],
     "p": [
      "Verification: https://docs.ruby-lang.org/en/master/Proc.html"
     ]
    },
    {
     "q": "What do tap and then (yield_self) do, and when are they useful?",
     "l": "A",
     "a": "tap returns its receiver after yielding it; then/yield_self returns the block’s result.",
     "e": "Use tap for diagnostics or configuration in a chain and then for a transformation. A block can still mutate the receiver in either case; the difference is the returned value. Side effects should remain clear enough to debug.",
     "x": [
      "p [1, 2].tap { |a| a << 3 } # [1, 2, 3]\np 5.then { |n| n * 2 } # 10"
     ],
     "p": [
      "Avoid long chains whose intermediate effects obscure the operation."
     ]
    }
   ]
  ]
 ],
 "ruby_interview_oop": [
  [
   "Classes and objects",
   [
    {
     "q": "What is the purpose of the initialize method in Ruby?",
     "l": "B",
     "a": "initialize is the constructor hook: Class#new allocates the object and then calls initialize with the arguments you passed, so it can set up the object’s instance variables.",
     "e": "You never call initialize directly; it is private and is invoked by new. Its return value is ignored, because new always returns the new object. A subclass that defines its own initialize must call super if the parent also needs to set up state.",
     "x": [
      "class User\n  def initialize(name, role: \"member\")\n    @name = name\n    @role = role\n  end\nend\n\nuser = User.new(\"Asha\", role: \"admin\")"
     ],
     "p": [
      "A class can have only one initialize; use default and keyword arguments, or class methods such as User.from_hash, for alternative constructors."
     ],
     "s": [
      "How do you define a class and its constructor?",
      "How to declare a constructor in a Ruby class?",
      "How would you declare and use a constructor in Ruby?"
     ]
    },
    {
     "q": "What is a class, what is an object, and how are they different?",
     "l": "B",
     "a": "A class defines shared behavior and object construction; an instance is a particular object with its own state. Classes themselves are also objects.",
     "e": "In Ruby, a class is a blueprint or a template that defines the properties (attributes) and behaviors (methods) of objects. It acts as a blueprint for creating objects with similar characteristics. An instance of a class, on the other hand, is a specific object created based on the class definition. It represents a unique occurrence of the class with its own set of attribute values. For example, consider a Car class. The class may define attributes like make, model, and year, as well as methods like start_engine and drive. An instance of the Car class would be a specific car object with its unique make, model, year, and other attribute values.",
     "x": [
      "class Car\n  attr_reader :make\n  def initialize(make); @make = make; end\nend\np Car.new(\"Toyota\").make",
      "class User\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend\nUser.new(\"Ada\").name",
      "user = Object.new\nuser.class # Object\nuser.object_id # identity, not a portable raw memory address"
     ],
     "s": [
      "Explain the difference between a Ruby class and an instance of a class.",
      "What is a class?",
      "What is an object?"
     ]
    },
    {
     "q": "How do you create and use a class in Ruby?",
     "l": "B",
     "a": "A class defines behavior for its instances. Class#new normally allocates an object and calls its initialize method; initialize sets state, while new returns the constructed object.",
     "e": "Define instance methods in a class and expose state deliberately with accessors. A subclass declaration uses < to inherit from one superclass; overridden methods can call super to extend inherited behavior. initialize is a private instance method and is more precisely an initialization hook than the allocator itself.",
     "x": [
      "class User\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend\np User.new(\"Asha\").name # \"Asha\""
     ],
     "p": [
      "The return value of initialize is not the return value of the normal Class#new call."
     ],
     "s": [
      "How to create Ruby object?"
     ]
    },
    {
     "q": "What are the core principles of object-oriented programming that are essential in Ruby development?",
     "l": "B",
     "a": "Encapsulation hides implementation behind APIs; inheritance reuses/substitutes behavior; polymorphism lets different objects satisfy one interface; abstraction exposes the necessary model.",
     "x": [
      "class Invoice\n  def total_cents; 1000; end\nend\nclass Refund\n  def total_cents; -1000; end\nend\np [Invoice.new, Refund.new].sum(&:total_cents)",
      "p [1.class, nil.class, String.class] # [Integer, NilClass, Class]",
      "p 7.class                 # Integer\np nil.to_s                # \"\"\np [1, 2, 3].select(&:even?) # [2]"
     ],
     "p": [
      "Variables hold references to objects; a variable itself is not an object.",
      "Every Ruby value is an object; a block and language syntax are not independently objects.",
      "Typing and execution strategy are different concepts."
     ],
     "s": [
      "What is Ruby and why is it considered an object-oriented language (OOP)?",
      "Explain Everything is an Object.",
      "What does it mean that everything in Ruby is an object?",
      "What does “everything is an object” mean in Ruby?",
      "Explain how (almost) everything is an object in Ruby:"
     ]
    },
    {
     "q": "What do attr_accessor, attr_reader, and attr_writer do?",
     "l": "B",
     "a": "attr_reader defines a getter, attr_writer defines a setter and attr_accessor defines both for an instance variable. They generate methods, not database columns or validations.",
     "e": "Use the least writable interface needed by callers. A reader-only attribute does not recursively freeze its returned value, and methods can be defined manually when writes need validation or normalization. Declaring both reader and writer has the same basic accessor effect as attr_accessor, so assignments succeed when both are present.",
     "x": [
      "class Person\n  attr_reader :id\n  attr_accessor :name\n  def initialize(id, name); @id, @name = id, name; end\nend\np Person.new(1,\"Ana\").name",
      "class Person\n  attr_accessor :name\n  def initialize(name) = @name = name\nend\nperson = Person.new(\"Asha\")\nperson.name = \"Ben\"\np person.name # \"Ben\"",
      "class Person\n  attr_reader :name\n  attr_accessor :age\n  def initialize(name)\n    @name = name\n  end\nend"
     ],
     "p": [
      "Do not confuse accessors with Rails persistence: an arbitrary attr_accessor is transient unless application code persists it.",
      "attr_writer alone does not define the getter."
     ],
     "s": [
      "What is the difference between attr_accessor, attr_reader, and attr_writer?",
      "What are Accessor Methods in Ruby?",
      "How Would You Create Getter And Setter Methods In Ruby?",
      "What are Ruby's accessor methods?",
      "Tell me about getters and setters in Ruby"
     ]
    },
    {
     "q": "What is Class Library in Ruby?",
     "l": "B",
     "a": "Ruby provides built-in core classes, standard libraries, default or bundled gems, and installable third-party gems.",
     "e": "Array, String, Hash and Thread are core examples. Libraries such as json and net/http provide reusable facilities and may be delivered as gems depending on Ruby release. GUI toolkits are not a universal built-in Ruby facility; choose an external library when required.",
     "x": [
      "require \"json\"\np JSON.parse('{\"ok\":true}') # {\"ok\"=>true}",
      "require \"json\"\nJSON.parse(\"{\"active\":true}\")",
      "require \"json\"\np JSON.parse('{\"name\":\"Ada\"}')[\"name\"] # \"Ada\""
     ],
     "p": [
      "Check the runtime’s installed gems and official library documentation.",
      "Check the target Ruby’s library packaging rather than assuming every historical standard library is installed."
     ],
     "s": [
      "What are class libraries in Ruby?",
      "What are the different class libraries used in Ruby?",
      "Explain what is class libraries in Ruby?",
      "What exactly class libraries in ruby have in them?",
      "What is meant by a “class library”?"
     ]
    },
    {
     "q": "What is the purpose of the self keyword in Ruby?",
     "l": "I",
     "a": "self is the current receiver. It is the instance inside an instance method, the class inside a class body or class method, and normally the defining context inside a block.",
     "e": "Use self to distinguish a writer-method call from a local assignment: self.name = value invokes name=, while name = value defines a local. instance_eval and instance_exec can intentionally change self when running a block. Defining def self.build in a class body defines a singleton method on that class object.",
     "x": [
      "class Demo\n  def receiver; self; end\n  def self.receiver; self; end\nend\np Demo.receiver # Demo\np Demo.new.receiver.class # Demo",
      "class User\n  attr_accessor :name\n  def rename(value)\n    self.name = value\n  end\nend",
      "class User\n  def self.kind = self\n  def receiver = self\nend\nUser.kind # User\nUser.new.receiver # the instance"
     ],
     "p": [
      "self is a receiver, not a reference to a statically determined class."
     ],
     "s": [
      "Describe the role of 'self' in Ruby and its contexts.",
      "What is self in Ruby?",
      "What does self refer to in Ruby?",
      "What is the role of 'self' in Ruby?",
      "What does self mean in Ruby?",
      "What does self mean?",
      "When do we use \"I\" in Ruby?"
     ]
    },
    {
     "q": "What is the difference between class variables (@@) and instance variables (@) in Ruby?",
     "l": "I",
     "a": "@@variables are shared across an inheritance hierarchy; @variables belong to the current receiver, which may itself be a class object. Neither form is automatically thread-safe.",
     "e": "Class instance variables are not instance variables of constructed objects and are not automatically copied to subclasses. Both forms need synchronization if shared mutable state is accessed concurrently.",
     "x": [
      "class Base\n  @count = 0\n  class << self; attr_accessor :count; end\nend\nclass Child < Base; end\np [Base.count, Child.count] # [0,nil]",
      "class Counter\n  @count = 0 # class-instance variable\n  @@shared = 0 # class variable\n  def initialize\n    @value = 0 # each Counter instance has its own\n  end\nend"
     ],
     "p": [
      "Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil."
     ],
     "s": [
      "Explain how class variables are different from instance variables.",
      "Describe the difference between class and instance variables? Class variables are created with the prefix ‘@@’ and are shared by all objects in a class."
     ]
    },
    {
     "q": "Differentiate between local variables and instance variables.",
     "l": "I",
     "a": "A local variable belongs to its lexical scope. An instance variable such as @name belongs to whichever object is self and can be used by that object’s methods.",
     "e": "Local variables in Ruby are variables that are defined within a method or a block. They are confined to the scope in which they are declared and are not accessible outside of it. This means that if you define a local variable inside a method, it cannot be accessed outside of that method. On the other hand, instance variables, denoted with an '@' prefix, belong to a specific instance of a class. They enable data persistence and access across different methods within that instance. This means that the value of an instance variable persists as long as the object instance exists.",
     "x": [
      "class Person\n  def initialize(name); @name = name; end\n  def name; @name; end\nend\np Person.new(\"Ana\").name",
      "class User\n  attr_reader :name\n  def initialize(name)\n    @name = name\n  end\nend\np User.new(\"Asha\").name # \"Asha\""
     ],
     "p": [
      "Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil.",
      "Method visibility applies to methods, not to local-variable declarations.",
      "An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call."
     ],
     "s": [
      "Describe the difference between local, instance, and class variables.",
      "Explain Not Using Instance Variables Correctly."
     ]
    },
    {
     "q": "What is the difference between class methods and instance methods?",
     "l": "I",
     "a": "An instance method is called on instances, while a class method is a singleton method on the class object.",
     "e": "Use instance methods for behavior dependent on one object’s state and class methods for class-level operations or factories. A class method is not a method made available automatically on every instance.",
     "x": [
      "class Article\n  def word_count = body.split.length\n  def self.named(name) = where(author: name)\nend"
     ]
    },
    {
     "q": "Consider the following scenario related to variables.",
     "l": "I",
     "a": "Inside class << self, self is Foo’s singleton class, so @foo belongs to that singleton-class object, not to an instance of Foo and not to Foo itself.",
     "e": "Read it with Foo.singleton_class.instance_variable_get(:@foo), or execute a class << Foo body. A class object has a singleton class in its method lookup path, but Foo.class is Class; describing Foo as the sole instance of its eigenclass is a misleading account of Ruby class membership.",
     "x": [
      "class Foo\n  class << self\n    @foo = 42\n  end\nend\nFoo.singleton_class.instance_variable_get(:@foo) # 42\nFoo.instance_variable_get(:@foo) # nil\nFoo.class # Class"
     ]
    },
    {
     "q": "How are class methods implemented, and what does class << self mean?",
     "l": "A",
     "a": "Class methods are singleton methods on a class object. class << self opens that singleton class so several class-level methods and their visibility can be defined together.",
     "e": "An @variable in a class method belongs to the class object, unlike an @variable in an instance method. Group private class helpers inside the singleton-class scope or use private_class_method.",
     "x": [
      "class Service\n  class << self\n    def build = new\n    private\n    def configuration = :default\n  end\nend\np Service.build.class # Service",
      "class Service\n  def self.build = new\nend\np Service.build.class # Service"
     ],
     "p": [
      "Class-instance-variable inheritance behavior differs from @@class variables.",
      "Class methods belong to the class object, not its ordinary instances."
     ],
     "s": [
      "What are Ruby's self methods and how are they used?"
     ]
    }
   ]
  ],
  [
   "Access control",
   [
    {
     "q": "Can you call a private method outside a Ruby class using its object?",
     "l": "B",
     "a": "Yes. send/__send__ can invoke private methods; public_send respects public visibility. Visibility is an API boundary rather than a security sandbox.",
     "e": "Yes, with the help of the `send` method. Given the class `Test`:\n\n\n\n```ruby\nclass Test\n   private\n       def method\n         p \"I am a private method\"\n      end\nend\n\n```\n\n\nWe can execute the private method using `send`:\n\n\n\n```ruby\n>> Test.new.send(:method)\n\"I am a private method\"\n\n```",
     "x": [
      "class Secret\n  private\n  def token; :example; end\nend\np Secret.new.__send__(:token)"
     ],
     "p": [
      "Never allow arbitrary untrusted method names to drive reflective dispatch."
     ]
    },
    {
     "q": "How can you override a private method in a subclass in Ruby?",
     "l": "B",
     "a": "A subclass can override an inherited private method normally. Mark the replacement private if that is the intended API visibility.",
     "e": "Private methods can be overridden by subclasses. A public method inherited from the parent can call the subclass’s private override through normal dynamic dispatch. The replacement’s visibility must be set deliberately.",
     "x": [
      "class Parent\n  def call; helper; end\n  private\n  def helper; :parent; end\nend\nclass Child < Parent\n  private\n  def helper; :child; end\nend\np Child.new.call # :child"
     ],
     "p": [
      "Visibility and overriding are separate concerns."
     ]
    },
    {
     "q": "What are the three levels of method access control available in Ruby?",
     "l": "B",
     "a": "public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts.",
     "e": "Modern Ruby permits a literal self receiver for private calls; arbitrary explicit receivers remain disallowed. Protected is not simply \"available to subclasses\"; explain receiver context.",
     "x": [
      "class Person\n  def initialize(age); @age = age; end\n  def older_than?(other); age > other.age; end\n  protected\n  def age; @age; end\nend\np Person.new(30).older_than?(Person.new(20))",
      "class Account\n  def check = self.secret\n  private\n  def secret = 42\nend\np Account.new.check # 42\n# Account.new.secret raises NoMethodError",
      "class Account\n  def visible = balance\n  private\n  def balance = 10\nend\nAccount.new.visible # 10\nAccount.new.public_send(:balance) # raises NoMethodError"
     ],
     "p": [
      "Modern Ruby permits a literal self receiver for private calls; arbitrary explicit receivers remain disallowed. Protected is not simply \"available to subclasses\"; explain receiver context.",
      "Verification: https://docs.ruby-lang.org/en/3.4/Module.html"
     ],
     "s": [
      "What are the levels of access control for Ruby methods?",
      "What Are The Three Levels Of Method Access Control For Classes And What Do They Signify? What Do They Imply About The Method?",
      "Name the three levels of access control for Ruby methods?",
      "What are public, private, and protected methods?",
      "Can you tell me the three levels of method access control for classes and modules? What do they imply about the method?",
      "What are the access modifiers in Ruby?",
      "What are access modifiers in Ruby?"
     ]
    },
    {
     "q": "Explain whether instance methods are private or public.",
     "l": "A",
     "a": "Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.",
     "e": "Public methods accept ordinary explicit receivers. Protected methods may be called with an explicit compatible receiver from the defining class/subclass context. Private methods normally use an implicit receiver; modern Ruby permits literal self in private calls. send bypasses visibility; public_send enforces public access. Instance methods are usually public by default, while initialize is private.",
     "x": [
      "class Account\n  def visible = balance\n  private\n  def balance = 10\nend\nAccount.new.visible # 10\nAccount.new.public_send(:balance) # raises NoMethodError"
     ]
    }
   ]
  ],
  [
   "Inheritance and polymorphism",
   [
    {
     "q": "What is method overloading and does Ruby support it?",
     "l": "B",
     "a": "Ruby dispatches by method name rather than Java-style overload signatures. A later definition replaces an earlier one; use optional/keyword/rest parameters or explicit dispatch.",
     "e": "Method overloading involves defining multiple methods with the same name but different parameters. Ruby does not support method overloading in the traditional sense, but you can achieve similar results using default parameters and variable arguments.",
     "x": [
      "def greet(name, punctuation: \"!\")\n  \"Hello, #{name}#{punctuation}\"\nend\np greet(\"Ana\")"
     ]
    },
    {
     "q": "Discuss the 'super' keyword and its usage.",
     "l": "B",
     "a": "super continues lookup for the current method. Bare super forwards current arguments; super() sends no positional/keyword arguments; both normally forward the block.",
     "e": "In Ruby, the super keyword is used to call a method of the same name in the parent class or module. It's typically used within a subclass to invoke the behavior of the overridden method in the superclass. This is useful when you want to extend or modify the functionality of the parent class's method while still leveraging its core behavior. By calling super within the subclass method, you can execute the parent method's logic and then build upon or modify it as needed.",
     "x": [
      "class Parent\n  def greet(name); \"Hi #{name}\"; end\nend\nclass Child < Parent\n  def greet(name); super + \"!\"; end\nend\np Child.new.greet(\"Ana\")",
      "class A\n  def greet(name = \"guest\") = \"Hi #{name}\"\nend\nclass B < A\n  def greet(name) = super + \"!\"\nend\np B.new.greet(\"Asha\") # \"Hi Asha!\""
     ],
     "p": [
      "It calls the next lookup-chain method, which may be in a module rather than the immediate superclass."
     ],
     "s": [
      "What is the purpose of the super keyword in Ruby?",
      "When is the “super” keyword used in Ruby?"
     ]
    },
    {
     "q": "Explain the concept of inheritance in Ruby and how it facilitates code reuse.",
     "l": "B",
     "a": "Inheritance puts a superclass in a subclass’s method lookup chain, allowing reused behavior and explicit overrides. Prefer it for genuine substitutable relationships.",
     "e": "Inheritance is a fundamental object-oriented programming concept in Ruby (and many other languages). It allows a class to inherit properties and behaviors from another class, referred to as the parent or base class. The class inheriting the properties is called the child or derived class. The child class can add new methods or override existing ones but automatically inherits all the attributes and methods from the parent class. Inheritance facilitates code reuse by allowing developers to create specialized classes based on existing ones. Instead of rewriting common functionalities in each class, developers can define them once in the parent class and have them inherited by all child classes. This leads to more maintainable and modular code.",
     "x": [
      "class Animal\n  def move; :moving; end\nend\nclass Dog < Animal; end\np Dog.new.move",
      "class Animal\n  def sound; \"sound\"; end\nend\nclass Dog < Animal\n  def sound; \"woof\"; end\nend\np Dog.new.sound",
      "class Animal\n  def speak = \"hello\"\nend\nclass Dog < Animal\n  def speak = super + \" woof\"\nend\np Dog.new.speak # \"hello woof\""
     ],
     "p": [
      "A superclass change after a class is defined is not ordinary inheritance configuration."
     ],
     "s": [
      "How do you establish inheritance in Ruby classes?",
      "How do you implement inheritance in Ruby?"
     ]
    },
    {
     "q": "What is the difference between super and super() Call?",
     "l": "B",
     "a": "Bare super forwards the current method’s arguments to the next implementation; super() sends no positional or keyword arguments.",
     "e": "The next implementation may live in a prepended or included module, not only a superclass. An incoming block is normally forwarded by both forms; use &nil when it must not be forwarded. Explicit super(value) passes only the supplied argument list.",
     "x": [
      "class Base\n  def show(*args); args; end\nend\nclass Child < Base\n  def show(x); [super, super()]; end\nend\np Child.new.show(1) # [[1], []]",
      "class A\n  def greet(name = \"guest\") = \"Hi #{name}\"\nend\nclass B < A\n  def greet(name) = super + \"!\"\nend\np B.new.greet(\"Asha\") # \"Hi Asha!\"",
      "class Parent\n  def call(*args) = args\nend\nclass Child < Parent\n  def call(value)\n    [super, super()]\n  end\nend\np Child.new.call(7) # [[7], []]"
     ],
     "p": [
      "It calls the next lookup-chain method, which may be in a module rather than the immediate superclass.",
      "Wrong arity is possible if the next method expects different arguments."
     ],
     "s": [
      "What is the difference between calling `super` and calling `super()`?",
      "What is the difference between calling super and calling super()?"
     ]
    },
    {
     "q": "What are the disadvantages of duck typing and dynamic typing in Ruby?",
     "l": "B",
     "a": "Runtime interface mistakes may appear only on an exercised path, and performance cannot be predicted solely from the language’s typing model.",
     "e": "Duck typing is flexible, but an object can lack a required method or return a surprising value. Tests and explicit contracts help. Profile the actual implementation and workload before optimizing; Ruby implementations and JIT options differ.",
     "x": [
      "empty?(Object.new) # NoMethodError when #size is absent\n# Test the intended protocol, including invalid inputs."
     ],
     "s": [
      "What are some disadvantages (real and potential)?"
     ]
    },
    {
     "q": "How can a developer address those disadvantages?",
     "l": "B",
     "a": "Use representative tests, explicit interface expectations where useful, optional static checking and profiling of actual bottlenecks.",
     "e": "Test behavior with compatible and incompatible values instead of scattering respond_to? checks without a policy. Tools such as Benchmark and an allocation/CPU profiler can identify costs. A runtime guard can improve an error message but is not a substitute for validating the method’s complete contract.",
     "x": [
      "require \"benchmark\"\nputs Benchmark.measure { 100_000.times { [1, 2, 3].size } }"
     ],
     "s": [
      "What could a developer do to address these disadvantages?"
     ]
    },
    {
     "q": "What is Duck Typing in Ruby?",
     "l": "I",
     "a": "Duck typing means code depends on an object’s supported behavior rather than requiring a particular class. Any object implementing the required protocol can collaborate.",
     "e": "For example, code accepting a writer only needs write, not a concrete File class. This makes testing easier because a StringIO or test double can satisfy the same interface. respond_to? can check availability, but shared semantics and error behavior matter as well; a matching method name alone does not prove compatibility.",
     "x": [
      "require \"stringio\"\ndef log(writer, message)\n  writer.write(message + \"\\n\")\nend\nbuffer = StringIO.new\nlog(buffer, \"ready\")\np buffer.string # \"ready\\n\"",
      "def announce(object); object.to_s; end\np announce(123)",
      "def empty?(value)\n  value.size == 0\nend\nempty?([]) # true\nempty?(\"\") # true\n\"hello\" + 3 # raises TypeError"
     ],
     "p": [
      "Prefer a small documented protocol over broad concrete-class checks.",
      "Static typing is not synonymous with explicit type annotations everywhere or a rigid class hierarchy."
     ],
     "s": [
      "Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages.",
      "What does this say about the advantages of ruby's dynamic (duck) typed system?"
     ]
    },
    {
     "q": "Does Ruby support Multiple Inheritance and Single Inheritance?",
     "l": "I",
     "a": "Ruby classes have one superclass, but can compose behavior from multiple modules using include, prepend, or extend.",
     "e": "include adds a module’s instance methods to an ancestor chain; prepend places them before the class; extend adds them to one object’s singleton class. Lookup order resolves conflicts, and super continues through that chain. A module supplies behavior and namespaces but cannot be instantiated with ModuleName.new.",
     "x": [
      "module Tagged\n  def tag; :ruby; end\nend\nclass Article; include Tagged; end\np Article.ancestors",
      "module Printable\n  def print_label = \"label\"\nend\nclass Product\n  include Printable\nend\nProduct.new.print_label",
      "module Named\n  def label = \"user\"\nend\nclass User\n  include Named\nend\np User.new.label # \"user\""
     ],
     "p": [
      "Mixin composition is not multiple class inheritance.",
      "Use ancestors and singleton_class.ancestors to explain lookup order."
     ],
     "s": [
      "Explain multiple inheritance and mixins in Ruby.",
      "Does Ruby support multiple inheritance?",
      "Does Ruby Allow Multiple Inheritance?",
      "Does Ruby Support Single Inheritance/Multiple Inheritance Or Both?",
      "Does Ruby support single inheritance?",
      "How can you achieve multiple inheritance in Ruby?"
     ]
    },
    {
     "q": "What are the different techniques to implement polymorphism in Ruby on Rails?",
     "l": "I",
     "a": "Ruby polymorphism primarily means shared behavior interfaces/duck typing. Rails polymorphic associations and STI are different persistence modeling tools with specific tradeoffs.",
     "e": "Polymorphic associations lack an ordinary single-target foreign key; STI uses one table and a type column, with shared schema/validation consequences.",
     "x": [
      "class Email\n  def deliver; :email; end\nend\nclass Sms\n  def deliver; :sms; end\nend\np [Email.new, Sms.new].map(&:deliver)"
     ],
     "p": [
      "Polymorphic associations lack an ordinary single-target foreign key; STI uses one table and a type column, with shared schema/validation consequences."
     ]
    }
   ]
  ],
  [
   "Modules and mixins",
   [
    {
     "q": "What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable?",
     "l": "B",
     "a": "Modules provide namespaces, reusable mixin behavior and module-level utility interfaces without requiring multiple class inheritance.",
     "e": "Use inheritance for a substitutable is-a relationship and mixins/composition for shared capabilities. A module can hold state and module methods, but it is not automatically equivalent to a carefully designed singleton service. Keep dependencies and method collisions visible, especially when many modules are included.",
     "x": [
      "module Graphics\n  class Canvas; end\nend\nmodule Printable\n  def print_label = \"printable\"\nend\nclass Car\n  include Printable\nend\nCar.new.print_label"
     ]
    },
    {
     "q": "What is a module in Ruby, and how do mixins work?",
     "l": "I",
     "a": "A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.",
     "e": "Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.",
     "x": [
      "module Greetable\n  def greet = \"hello\"\nend\nclass User\n  include Greetable\nend\np User.new.greet # \"hello\"",
      "module Tagged\n  def tag; :ruby; end\nend\nclass Article; include Tagged; end\np Article.ancestors",
      "module Formatting\n  def label(value); \"[#{value}]\"; end\nend\nclass Reporter; include Formatting; end\np Reporter.new.label(\"ok\")"
     ],
     "p": [
      "Modules themselves are objects: Module.new creates a module, not an instance of that module.",
      "Mixin composition is not multiple class inheritance.",
      "Use ancestors and singleton_class.ancestors to explain lookup order."
     ],
     "s": [
      "Explain Ruby module?",
      "Explain module mixins in Ruby?",
      "Explain the concept of mixins in Ruby.",
      "Explain the purpose of modules in Ruby and how they facilitate code organization and reusability.",
      "What are modules and how do mixins work?",
      "What is Mixin in Rails?",
      "What is Mixin?",
      "What is the function of modules in Ruby?"
     ]
    },
    {
     "q": "What are Ruby modules and how do they differ from classes?",
     "l": "I",
     "a": "A class can be instantiated and inherited from; a module cannot be instantiated or subclassed. Modules are used as namespaces and as mixins that add methods to classes.",
     "e": "A class has one superclass, but it can include many modules, which is how Ruby shares behavior without multiple inheritance. Use a class when you need objects with state and a lifecycle; use a module for shared behavior (Comparable, Enumerable) or to group related constants and classes under a namespace.",
     "x": [
      "module Greet\n  def greet = \"Hi, #{name}\"\nend\n\nclass Person\n  include Greet\n  attr_reader :name\n  def initialize(name) = @name = name\nend\n\nPerson.new(\"Ravi\").greet  # \"Hi, Ravi\"\nGreet.new                 # NoMethodError: undefined method `new' for module Greet"
     ],
     "p": [
      "Class is a subclass of Module, so every class is also a module with extra abilities (new, superclass)."
     ],
     "s": [
      "Explain the difference between modules and classes in Ruby and when to use each.",
      "What are modules and how are they different from classes?",
      "What is the difference between a module and class?",
      "What is the difference between class and module in Ruby?",
      "What is the difference between a Ruby class and a module?",
      "What Is The Difference Between A Class And A Module?",
      "What is a module? Can you tell me the difference between classes and modules?",
      "What is a module in Ruby, and how is it different from a class?"
     ]
    },
    {
     "q": "What is the difference between include, extend, and prepend?",
     "l": "I",
     "a": "include adds a module’s instance methods to a class’s instances; extend adds them as singleton methods on the receiver. prepend inserts a module before the receiving class in method lookup.",
     "e": "A class is also an object, so extending a class creates what are commonly called class methods. Extending an ordinary object affects just that object. With prepend, a wrapper can call super to continue into the original implementation. Examine ancestors or singleton_class.ancestors to see the actual lookup chain.",
     "x": [
      "module Greeting\n  def hello = \"hello\"\nend\nclass User\n  include Greeting\n  extend Greeting\nend\np User.hello\np User.new.hello",
      "module Greeting\n  def hello; \"hello\"; end\nend\nclass Person; include Greeting; end\np Person.new.hello",
      "module Hello\n  def hi; :hi; end\nend\nobj = Object.new; obj.extend(Hello)\np obj.hi"
     ],
     "p": [
      "extend does not inherently mean “class only”: it works on ordinary objects too.",
      "super follows the lookup chain, including mixins."
     ],
     "s": [
      "Explain Confusion between include and extend.",
      "How can you include a module in a class in Ruby?",
      "What is the difference between _extend_ and _include_?",
      "What is the difference between `extend` and `include` in ruby?",
      "What is the difference between include and extend in Ruby?"
     ]
    },
    {
     "q": "Describe the purpose of the 'prepend' method in Ruby and how it affects method lookup.",
     "l": "A",
     "a": "prepend inserts a module before the class in method lookup, allowing wrappers to run first and call super to continue into the original implementation.",
     "e": "The prepend method in Ruby is used to add a module to the inheritance chain of a class. However, it inserts the module at a higher priority than the class itself. This means that methods defined in the prepended module take precedence over methods with the same name in the class. This is useful for injecting behaviors into a class without completely overriding its existing methods. The prepended module's methods are called before those of the class during method lookup.",
     "x": [
      "module Trace\n  def call; [:before, super]; end\nend\nclass Service\n  def call; :result; end\n  prepend Trace\nend\np Service.new.call"
     ]
    }
   ]
  ],
  [
   "Object equality",
   [
    {
     "q": "How do the spaceship operator and Comparable work together?",
     "l": "I",
     "a": "<=> returns a negative, zero or positive number according to ordering, or nil for incomparable operands; Comparable derives other comparison methods from it.",
     "e": "The common built-in result values are -1, 0 and 1, but the contract is the sign. Include Comparable and implement a consistent <=>. Return nil for unsupported comparisons rather than assuming every other object has the expected fields.",
     "x": [
      "class Version\n  include Comparable\n  attr_reader :number\n  def initialize(number) = @number = number\n  def <=>(other)\n    return nil unless other.is_a?(Version)\n    number <=> other.number\n  end\nend"
     ],
     "p": [
      "Comparable does not automatically supply a Hash equality/hash contract."
     ]
    },
    {
     "q": "How does case/when actually match, and what is ===?",
     "l": "I",
     "a": "case/when calls when_value === case_value for each branch. === means “does this pattern match?”, and each class defines it: Class#=== checks is_a?, Range#=== checks inclusion, Regexp#=== checks a match and Proc#=== calls the proc.",
     "e": "Because the comparison is pattern === object (the when value on the left), the order matters: Integer === 5 is true but 5 === Integer is false. Classes you write can define === to work with case/when.",
     "x": [
      "def describe(x)\n  case x\n  when Integer       then \"integer\"   # Integer === x\n  when 1..10         then \"small\"     # never reached for Integers\n  when /\\A\\d+\\z/     then \"digits\"    # Regexp === x\n  when ->(v) { v.nil? } then \"nil\"     # Proc === x\n  else \"other\"\n  end\nend\n\ndescribe(5)     # \"integer\"\ndescribe(\"42\")  # \"digits\"\ndescribe(nil)   # \"nil\""
     ]
    },
    {
     "q": "Explain each of the following operators and how and when they should be used: ==, ===, eql?, equal?",
     "l": "I",
     "a": "== expresses class-specific value equality; equal? tests object identity; eql? together with hash determines Hash-key equality; === provides class-specific case matching.",
     "e": "Integer distinguishes 1.eql?(1.0) from 1 == 1.0, but eql? is not a universal built-in “compare value and type” algorithm: classes define their own behavior. If two objects are eql?, they must return the same hash. A case/when clause effectively asks pattern === value, so Class, Range and Regexp give different matching meanings.",
     "x": [
      "p 1 == 1.0       # true\np 1.eql?(1.0)    # false\np (1..3) === 2   # true\ns = \"a\"; p s.equal?(s) # true",
      "a = \"hi\"; b = \"hi\"\np [a == b, a.equal?(b)] # [true, false]",
      "a = \"ruby\"\nb = \"ruby\"\na == b # true\na.equal?(b) # false for these distinct strings"
     ],
     "p": [
      "Never override equal? to implement ordinary value equality.",
      "Keep key fields stable while an object is in a Hash.",
      "Ruby permits overriding equal? but its documented contract is identity; overriding it is strongly discouraged.",
      "eql? is not a universal automated \"same value and type\" check; it is class-defined. Implement eql? and hash together."
     ],
     "s": [
      "Differentiate between '==' and 'equal?' comparison operators.",
      "Explain Not Knowing the Difference Between == and eql? Operators.",
      "Explain the difference between #equal and #==.",
      "What is the difference between == and eql? in Ruby?"
     ]
    },
    {
     "q": "What is the contract between eql? and hash for custom objects used as hash keys?",
     "l": "I",
     "a": "If a.eql?(b) is true, a.hash must equal b.hash. Hash collisions are allowed, but equal keys must agree on their hash.",
     "e": "Define a stable equivalence relation and compute the hash from the same fields with compatible comparison semantics. Use eql? consistently or normalize values. Keys must not mutate in a way that changes their hash while stored.",
     "x": [
      "class Coord\n  attr_reader :x, :y\n  def initialize(x, y)\n    @x, @y = x, y\n  end\n  def eql?(other)\n    other.instance_of?(self.class) && x.eql?(other.x) && y.eql?(other.y)\n  end\n  def hash = [self.class, x, y].hash\nend"
     ],
     "p": [
      "Hash lookup involves hash buckets and then eql? matching."
     ]
    }
   ]
  ]
 ],
 "ruby_interview_advanced": [
  [
   "Exceptions",
   [
    {
     "q": "What are exceptions, and how is exception handling done in Ruby?",
     "l": "B",
     "a": "Use rescue for expected exceptions, else for success-only work and ensure for cleanup. Bare rescue handles StandardError, not all Exception descendants.",
     "e": "Exception handling in Ruby is implemented using begin, rescue, and ensure blocks. The begin block contains the code that might raise an exception. If an exception occurs within the begin block, execution immediately shifts to the rescue block. The rescue block contains the code that handles the exception. You can have multiple rescue blocks to handle different types of exceptions. If an exception is raised but not rescued, the program terminates. The ensure block contains code that will always be executed, whether an exception was raised or not. This is typically used for cleanup activities, like closing files or network connections.",
     "x": [
      "begin\n  Integer(\"abc\")\nrescue ArgumentError => error\n  warn error.message\nensure\n  # Close owned resources here.\nend",
      "begin\n  Integer(\"bad\")\nrescue ArgumentError => e\n  warn e.message\nend",
      "begin\n  1 / 0\nrescue ZeroDivisionError => error\n  puts error.message\nensure\n  puts \"cleanup\"\nend"
     ],
     "p": [
      "Do not swallow errors or retry without a bound. ensure cannot guarantee cleanup after forced process termination.",
      "Resource-management block APIs are often clearer than manual cleanup.",
      "Do not replace a real failure with a success-looking default unless that is the API contract.",
      "Use error classes to decide recovery behavior, not arbitrary message matching.",
      "A custom exception inheriting directly from Exception will not be caught by a bare rescue."
     ],
     "s": [
      "How is exception handling implemented in Ruby?",
      "How do you handle exceptions in Ruby?",
      "How do you handle exceptions in Ruby code?",
      "How does exception handling work in Ruby?",
      "Explain Ruby exceptions?",
      "Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations.",
      "How an exception is handled in Ruby?",
      "How are errors handled in Ruby?"
     ]
    },
    {
     "q": "Why is it advised to rescue from _StandardError_ rather than _Exception_?",
     "l": "B",
     "a": "Rescue StandardError or narrower application errors so process-control/system exceptions can propagate, including Interrupt and SystemExit.",
     "e": "Rescuing Exception catches fatal/control exceptions and can prevent expected shutdown.",
     "x": [
      "begin\n  raise ArgumentError, \"invalid input\"\nrescue StandardError => e\n  warn e.message\nend"
     ],
     "p": [
      "Rescuing Exception catches fatal/control exceptions and can prevent expected shutdown."
     ]
    },
    {
     "q": "Explain retry statement in Ruby?",
     "l": "I",
     "a": "In modern Ruby retry is valid in a rescue clause and restarts the corresponding begin body; it does not restart an arbitrary loop.",
     "e": "Track an attempt limit and retry only failures expected to be transient. Retrying an operation with external effects requires idempotency or a rollback strategy. Use redo to repeat the current loop iteration without rechecking the condition.",
     "x": [
      "attempts = 0\nbegin\n  attempts += 1\n  raise \"transient\" if attempts < 2\nrescue RuntimeError\n  retry if attempts < 3\n  raise\nend"
     ],
     "s": [
      "Explain the use of retry statement in Ruby?"
     ]
    },
    {
     "q": "Explain the use of ensure statement in Ruby?",
     "l": "I",
     "a": "ensure runs cleanup while leaving the protected scope, whether the normal path or an exception path is taken.",
     "e": "It runs after begin/rescue/else as control unwinds, but cannot promise execution after abrupt process death, exit!, a killed runtime or machine failure. An explicit return in ensure can override a return or suppress an exception, so avoid it. Prefer block-based resource APIs when possible.",
     "x": [
      "begin\n  puts \"work\"\nensure\n  puts \"cleanup\"\nend"
     ],
     "p": [
      "ensure does not implicitly replace the enclosing expression’s result."
     ]
    },
    {
     "q": "What is the difference between raise/rescue and throw/catch in Ruby?",
     "l": "I",
     "a": "raise/rescue handles exceptions; catch/throw performs nonlocal control flow using a matching tag.",
     "e": "throw unwinds to a corresponding catch and can carry a result value. Tags are not restricted to symbols, though symbols are common. A throw without a matching catch raises UncaughtThrowError. This is different from exception-class matching and should not substitute for errors that callers need to classify.",
     "x": [
      "result = catch(:found) do\n  [1, 2, 3].each { |n| throw :found, n if n.even? }\n  nil\nend\np result # 2",
      "result = catch(:found) do\n  [1, 2, 3].each { |n| throw(:found, n) if n.even? }\n  nil\nend # 2"
     ],
     "p": [
      "ensure cleanup can run during either kind of ordinary stack unwinding."
     ],
     "s": [
      "Explain Misunderstanding throw/catch and raise/rescue.",
      "Explain the difference between raise/rescue and throw/catch.",
      "What is the difference between throw/catch and raise/rescue?"
     ]
    },
    {
     "q": "What are some built-in Ruby class exceptions?",
     "l": "I",
     "a": "Common application exceptions include ArgumentError, TypeError, NoMethodError, KeyError and ZeroDivisionError, under StandardError. Exception also has branches such as ScriptError, SystemExit and SignalException.",
     "e": "Knowing the hierarchy prevents rescuing too broadly. LoadError and SyntaxError are ScriptError descendants, so a bare rescue does not catch them; SystemExit should normally propagate. The exact exception for a failed operation depends on the API.",
     "x": [
      "p ArgumentError < StandardError # true\np LoadError < StandardError # nil\np LoadError < Exception # true"
     ],
     "p": [
      "NoMemoryError is not an ordinary recoverable application error."
     ]
    }
   ]
  ],
  [
   "Metaprogramming and the object model",
   [
    {
     "q": "How to use Ruby's introspection capabilities to create more maintainable code?",
     "l": "B",
     "a": "Use respond_to?, method, parameters, ancestors and instance_variables to inspect capabilities and dispatch explicitly; reflection should support clear APIs rather than replace them.",
     "e": "A method_missing implementation should pair with respond_to_missing?. Treat externally supplied names as untrusted input.",
     "x": [
      "p \"hello\".respond_to?(:upcase)\np \"hello\".method(:upcase).arity\np String.ancestors"
     ],
     "p": [
      "A method_missing implementation should pair with respond_to_missing?. Treat externally supplied names as untrusted input."
     ]
    },
    {
     "q": "How does Ruby resolve a method call?",
     "l": "A",
     "a": "Ruby follows the receiver’s method lookup chain, including singleton-class ancestry, prepended modules, its class, included modules and superclasses. If resolution fails it invokes method_missing.",
     "e": "Within each ancestry segment, prepend appears before the owning class and include after it. super resumes after the currently executing implementation. Active refinements can also affect lookup. The default missing-method behavior raises NoMethodError, a NameError subclass.",
     "x": [
      "module A; def hello = \"A\"; end\nclass User; include A; end\np User.ancestors\np User.new.hello",
      "user.name\nuser.public_send(:name)\nuser.method(:name).call\n# send can invoke private methods, so it is not equivalent to public_send."
     ],
     "p": [
      "The hook is method_missing, not method_missing?."
     ],
     "s": [
      "Can you explain how Ruby looks up a method to invoke?",
      "What happens when you call a method in Ruby?"
     ]
    },
    {
     "q": "Walk through Ruby's object model: classes, metaclasses, and BasicObject.",
     "l": "A",
     "a": "Ruby values have classes, and class objects are instances of Class. Class inherits Module, then Object, with BasicObject at the root; ordinary object-specific methods live in singleton classes.",
     "e": "Class methods are singleton methods on class objects.",
     "x": [
      "p String.class # Class\np Class.superclass # Module\np Object.superclass # BasicObject\np Object.new.singleton_class"
     ]
    },
    {
     "q": "What is monkey patching (reopening a class), and what are the risks?",
     "l": "A",
     "a": "Monkey patching adds or changes behavior on a class or module owned elsewhere, often globally affecting its users.",
     "e": "Ruby’s open classes make this possible, but library collisions, load-order dependence and future upstream changes can make it fragile. Prefer a wrapper, an explicitly included module or lexical refinement where those interfaces meet the requirement.",
     "x": [
      "class String\n  def shout\n    upcase + \"!\"\n  end\nend\np \"hi\".shout # \"HI!\"",
      "class String\n  def shout\n    self.upcase + \"!\"\n  end\nend",
      "class Greeter; end\nGreeter.define_method(:hello) { \"hello\" }\np Greeter.new.hello"
     ],
     "p": [
      "The example changes String globally; it is educational, not a default application recommendation.",
      "define_method is private in some contexts; class_eval { define_method(...) } is an explicit alternative. Avoid global patches without a documented compatibility need."
     ],
     "s": [
      "What does reopening a class (monkey patching) mean, and what are the risks?",
      "What is monkey patching in Ruby?",
      "How can you modify existing classes and methods dynamically?"
     ]
    },
    {
     "q": "What is the difference between class_eval and instance_eval in Ruby?",
     "l": "A",
     "a": "class_eval/module_eval reopens the receiving class/module context; def inside defines instance methods. instance_eval changes self and def adds singleton methods to that object.",
     "x": [
      "class Person; end\nPerson.class_eval { def greet; \"instance\"; end }\nPerson.instance_eval { def kind; \"class object\"; end }\np [Person.new.greet, Person.kind]",
      "object = Object.new\nobject.instance_exec(3) { |n| @count = n }\np object.instance_variable_get(:@count) # 3"
     ],
     "p": [
      "define_method is private in some contexts; class_eval { define_method(...) } is an explicit alternative. Avoid global patches without a documented compatibility need.",
      "Prefer a normal explicit API when changing evaluation context makes the code harder to understand."
     ],
     "s": [
      "What are instance_eval, class_eval, and instance_exec used for?"
     ]
    },
    {
     "q": "Explain the concept of method hooks (method_missing, method_added, method_removed).",
     "l": "A",
     "a": "Ruby calls method_added and method_removed when instance methods are defined/removed; method_missing handles lookup failures. Hooks support DSLs and instrumentation.",
     "e": "Method hooks in Ruby are special methods that get triggered when certain events related to methods occur. method_missing is called when an undefined method is invoked. method_added is called when a new method is added to a class. method_removed is called when a method is removed from a class. These hooks provide powerful metaprogramming capabilities, allowing you to dynamically respond to or alter method-related events.",
     "x": [
      "class Tracker\n  def self.method_added(name); puts \"added #{name}\"; end\n  def example; :ok; end\nend"
     ],
     "p": [
      "A hook that defines methods can recursively trigger itself; guard against recursion. Singleton-method hooks are separate."
     ]
    },
    {
     "q": "How does define_method work and when is it better than method_missing?",
     "l": "A",
     "a": "define_method installs a real named method from a block and captures its lexical variables. Prefer it to method_missing when the possible method names are known.",
     "e": "Generated methods appear in normal lookup and introspection, avoiding the missing-method path on every call. Keep the generated interface small and documented, and beware closures retaining more surrounding objects than intended.",
     "x": [
      "class Report\n  %i[csv json].each do |format|\n    define_method(\"to_#{format}\") { \"rendering #{format}\" }\n  end\nend\np Report.new.to_csv # \"rendering csv\""
     ],
     "p": [
      "method_missing still suits a deliberately open-ended proxy with respond_to_missing?."
     ]
    },
    {
     "q": "How does method_missing work, and why must it be paired with respond_to_missing??",
     "l": "A",
     "a": "method_missing receives calls Ruby could not resolve normally. Override it only for a deliberate dynamic interface, implement respond_to_missing? consistently and delegate unhandled names to super.",
     "e": "Known method names are usually clearer as actual methods, possibly generated using define_method. A dynamic proxy must validate the method name and argument shape, forward keywords and blocks correctly, and avoid accidentally swallowing typos. Introspection and Method lookup depend on respond_to_missing? reporting the same supported interface.",
     "x": [
      "class Settings\n  def initialize(data) = @data = data\n  def method_missing(name, *args, **kwargs, &block)\n    return @data[name] if args.empty? && kwargs.empty? && !block && @data.key?(name)\n    super\n  end\n  def respond_to_missing?(name, include_private = false)\n    @data.key?(name) || super\n  end\nend",
      "class Settings\n  def method_missing(name, *args, **kwargs, &block)\n    return \"dark\" if name == :theme && args.empty? && kwargs.empty?\n    super\n  end\n  def respond_to_missing?(name, include_private = false)\n    name == :theme || super\n  end\nend\np Settings.new.theme",
      "class Dynamic\n  def method_missing(name, *args, **kwargs, &block)\n    return 42 if name == :answer && args.empty? && kwargs.empty?\n    super\n  end\n  def respond_to_missing?(name, include_private = false)\n    name == :answer || super\n  end\nend\np Dynamic.new.respond_to?(:answer)"
     ],
     "p": [
      "Never recursively send every missing name back to itself.",
      "Use an allowlist for external method names.",
      "Explicit methods or delegation are often easier to discover and debug."
     ],
     "s": [
      "How does method_missing work, and what should you pair it with?",
      "What is method_missing and how is it used in Ruby?",
      "What is the difference between method_missing and respond_to_missing?",
      "What is the function of `method_missing`? How is it used in meta-programming in Ruby?",
      "What’s the purpose of the method_missing method in Ruby?"
     ]
    },
    {
     "q": "What is a DSL, why is Ruby good for building one, and how do you create one?",
     "l": "A",
     "a": "A domain-specific language expresses a focused problem domain. Ruby’s blocks, flexible method-call syntax and objects allow readable internal DSLs.",
     "e": "Prefer constrained methods over eval of untrusted strings.",
     "x": [
      "class JobPlan\n  attr_reader :steps\n  def initialize; @steps = []; end\n  def step(name); @steps << name; end\nend\np = JobPlan.new; p.step(:import); puts p.steps",
      "class Routes\n  attr_reader :paths\n  def initialize; @paths = []; end\n  def get(path); @paths << path; end\nend\nr = Routes.new\nr.get \"/health\"\np r.paths",
      "class Plan\n  attr_reader :tasks\n  def initialize; @tasks = []; end\n  def task(name); @tasks << name; end\nend\nplan = Plan.new\nplan.task(:import)"
     ],
     "p": [
      "Prefer constrained methods over eval of untrusted strings.",
      "An explicit block receiver is often easier to understand than rebinding self with instance_eval. Never eval untrusted input.",
      "Do not execute untrusted DSL text with eval; choose clear scope and good error messages."
     ],
     "s": [
      "What is a DSL (Domain Specific Language) and why is Ruby a popular language to build DSLs in?",
      "How can you create a custom DSL (domain-specific language) in Ruby?",
      "What are the strategies to create efficient Domain-Specific Languages (DSLs) in Ruby?"
     ]
    },
    {
     "q": "Explain the concept of refinements in Ruby and their intended use.",
     "l": "A",
     "a": "Refinements change methods only for lexically activated code. using is placed at top level or inside class/module definitions and does not act as an arbitrary runtime block switch.",
     "e": "A method defined under a refinement retains that behavior when called elsewhere; unrefined call sites do not gain it.",
     "x": [
      "module Loud\n  refine String do\n    def shout; upcase; end\n  end\nend\nusing Loud\np \"hello\".shout",
      "module Labeling\n  refine Integer do\n    def label; \"n=#{self}\"; end\n  end\nend\nusing Labeling\np 3.label",
      "module Loud\n  refine String do\n    def shout; upcase + \"!!!\"; end\n  end\nend\nclass Greeter\n  using Loud\n  def greet(name); name.shout; end\nend\np Greeter.new.greet(\"Ana\")"
     ],
     "p": [
      "using is allowed at top level or in class/module definitions, not inside a method body. A method defined in the refined scope retains that lexical behavior.",
      "Verification: https://docs.ruby-lang.org/en/master/syntax/refinements_rdoc.html",
      "A method defined under a refinement retains that behavior when called elsewhere; unrefined call sites do not gain it."
     ],
     "s": [
      "What are Ruby refinements and how do they affect method behavior?",
      "Discuss the concept of refinements in Ruby.",
      "What are refinements and when do they beat monkey patching?"
     ]
    },
    {
     "q": "What are singleton methods and the singleton class (eigenclass / metaclass)?",
     "l": "A",
     "a": "Ruby’s singleton class is the per-object method container used for object-specific methods. The Singleton design pattern instead restricts how many instances a class creates.",
     "e": "A singleton class is part of per-object method lookup; the design pattern restricts object creation. Class methods are singleton methods of class objects. attr_accessor is a Module method used as a macro.",
     "x": [
      "obj = Object.new\nclass << obj\n  def answer; 42; end\nend\np obj.answer",
      "str = +\"Hello\"\ndef str.shout\n  upcase + \"!!!\"\nend\np str.shout # \"HELLO!!!\"",
      "obj = Object.new\ndef obj.greet; \"hello\"; end\np obj.singleton_class.instance_methods(false)"
     ],
     "p": [
      "attr_accessor is provided by Module; describing it as necessarily a user class’s singleton method is inaccurate.",
      "Some immutable immediate values restrict singleton methods.",
      "Immediate values such as integers and symbols have restrictions on singleton-class access and singleton methods; not every object supports attaching singleton behavior."
     ],
     "s": [
      "Explain the singleton class and its use cases.",
      "How do you define and use a singleton method in Ruby?",
      "Describe the concept of metaclasses (eigenclasses) in Ruby.",
      "Explain Singleton Methods and Metaprogramming.",
      "What are singleton methods and the singleton class?",
      "What are singleton methods in Ruby, and how are they implemented?"
     ]
    },
    {
     "q": "How does Ruby support metaprogramming?",
     "l": "A",
     "a": "Metaprogramming lets Ruby programs define or inspect behavior at runtime, using tools such as define_method, singleton methods, reflection and module composition.",
     "e": "Use define_method for a known set of generated methods, public_send with an allowlist for selected public operations, and method_missing/respond_to_missing? for a genuinely open dynamic interface. Reopening String can overwrite existing behavior globally; prefer a dedicated helper or refinement. Never eval external input. Blindly sending a cleaned missing name can recurse forever if the cleaned method is also absent. Internationalization should normally select known translations rather than evaluate dynamically constructed code.",
     "x": [
      "class MyClass\n  define_method(:dynamic_method) { |arg| \"Argument: #{arg}\" }\nend\np MyClass.new.dynamic_method(\"Hello\")",
      "class Attributes\n  [:name, :email].each { |field| attr_accessor field }\nend",
      "class Metric\n  [:count, :sum].each { |name| attr_accessor name }\nend"
     ],
     "p": [
      "Document generated interfaces, preserve introspection and test error cases.",
      "Prefer public_send/allowlists for user-selected methods; send and eval are not safe input validation.",
      "Ruby has no built-in numeric plus method; an example using plus must define it first.",
      "Keep the dynamic interface discoverable with respond_to? and tests.",
      "send bypasses private visibility; public_send is narrower but still needs an allowlist for external names.",
      "method_missing is not required to implement duck typing."
     ],
     "s": [
      "Theoretical: Explain the concept of metaprogramming in Ruby and provide an example of how it can be used.",
      "Explain the concept of metaprogramming in Ruby and how it is utilized in real-world applications.",
      "How to implement metaprogramming in Ruby to improve code flexibility?",
      "Explain the concept of metaprogramming in Ruby.",
      "What is metaprogramming in Ruby, and can you give an example of its use?",
      "What is metaprogramming?",
      "What is metaprogramming in Ruby?",
      "What are Ruby’s advanced metaprogramming techniques?"
     ]
    }
   ]
  ],
  [
   "Freezing, copying, Struct and pattern matching",
   [
    {
     "q": "What is the difference between the `Object` methods `clone` and `dup`?",
     "l": "B",
     "a": "Both dup and clone are shallow; clone retains singleton behavior and usually frozen state, while dup normally does not.",
     "e": "`Object#dup` creates a shallow copy of an object. For example, it will not copy any mixed-in module methods, whereas `Object#clone` will. This can be shown with the following code example:\n\n\n\n```ruby\nclass Klass\n  attr_accessor :str\nend\n\nmodule Foo\n  def foo; 'foo'; end\nend\n\ns1 = Klass.new #=> #\ns1.extend(Foo) #=> #\ns1.foo #=> \"foo\"\n\ns2 = s1.clone #=> #\ns2.foo #=> \"foo\"\n\ns3 = s1.dup #=> #\ns3.foo #=> NoMethodError: undefined method `foo' for #\n\n```",
     "x": [
      "original = [\"x\"].freeze\np [original.dup.frozen?, original.clone.frozen?] # [false, true]\np original.clone[0].equal?(original[0]) # true",
      "a = [\"text\"].freeze\np [a.dup.frozen?, a.clone.frozen?]",
      "obj = Object.new\ndef obj.greet = \"hi\"\nobj.freeze\np obj.clone.frozen? # true\np obj.dup.frozen?   # false\np obj.clone.respond_to?(:greet) # true"
     ],
     "p": [
      "clone is not a deep copy; nested mutable objects remain shared.",
      "Verification: https://docs.ruby-lang.org/en/3.4/Object.html",
      "Custom initialize_dup/initialize_clone hooks can change subclass behavior."
     ],
     "s": [
      "Differentiate between 'dup' and 'clone' methods."
     ]
    },
    {
     "q": "When would you use Struct or Data?",
     "l": "I",
     "a": "Struct creates lightweight mutable record classes; Data.define (Ruby 3.2+) creates value-like classes without member writers.",
     "e": "Use Data when fixed attributes communicate a value object, and Struct when field reassignment is intended. Data objects do not recursively freeze member values, so a stored Array or String can still change. “Preferred” depends on the application interface, not a universal rule.",
     "x": [
      "Event = Data.define(:tags)\nevent = Event.new(tags: [\"ruby\"])\nevent.tags << \"rails\" # nested Array remains mutable"
     ]
    },
    {
     "q": "How would you freeze an object in Ruby? Can you provide a simple example?",
     "l": "I",
     "a": "freeze prevents mutation of an object itself and returns that object. It is shallow: referenced nested objects can remain mutable, and the variable or constant can still be rebound.",
     "e": "The frozen_string_literal magic comment controls eligible string literals in its source file. Mutation attempts normally raise FrozenError. Freezing a constant’s value does not prohibit assigning that constant a new value; Ruby typically warns on reassignment. Deep immutability requires freezing or otherwise protecting nested values too.",
     "x": [
      "items = [\"a\"].freeze\n# items << \"b\" raises FrozenError\nitems.first << \"!\" # nested String remains mutable\np items # [\"a!\"]"
     ],
     "p": [
      "dup normally produces an unfrozen shallow copy; clone normally retains frozen state."
     ],
     "s": [
      "What does freeze do, and what is frozen_string_literal?"
     ]
    },
    {
     "q": "How does Ruby's pattern matching (case/in) work?",
     "l": "A",
     "a": "case/in matches and deconstructs structured data, binding matched variables; case/when mainly tests pattern === target.",
     "e": "Pattern matching arrived experimentally in Ruby 2.7 and evolved in Ruby 3.x. Array/hash patterns, guards, pinning and deconstruct/deconstruct_keys can express protocol-aware matching. An unmatched case/in without else can raise NoMatchingPatternError, so define the failure path deliberately.",
     "x": [
      "case { role: \"admin\", permissions: [\"read\", \"write\"] }\nin { role: \"admin\", permissions: [*, \"write\"] }\n  puts \"can write\"\nelse\n  puts \"other\"\nend"
     ],
     "p": [
      "Version-check newer pattern syntax rather than treating all of it as present in every Ruby 3 release."
     ]
    }
   ]
  ],
  [
   "Memory, GC and performance",
   [
    {
     "q": "How do you reduce object allocation in a hot Ruby path?",
     "l": "B",
     "a": "Profile allocation-heavy paths, remove avoidable intermediates, reuse values safely and use lazy pipelines when only part of a source is consumed.",
     "e": "Avoid unsafe shared mutable reuse and do not assume symbols always win. Frozen literals can reduce repeated allocations where semantics permit. A lazy producer plus lazy map/select avoids materializing unneeded arrays; eagerly selecting over an infinite source never finishes.",
     "x": [
      "p (1..Float::INFINITY).lazy.select(&:even?).first(3) # [2, 4, 6]"
     ]
    },
    {
     "q": "How is the Ruby community addressing concerns about the performance of web frameworks compared to other languages?",
     "l": "B",
     "a": "Use profiling, runtime/JIT improvements, efficient queries, caching and suitable implementations to improve measured workloads. There is no universal fastest web framework.",
     "e": "The Ruby community is addressing performance concerns through optimizations in Ruby's core, adopting JIT compilation, and improving the performance of popular frameworks like Ruby on Rails. Tools like 'JRuby' (Ruby on the Java Virtual Machine) and 'TruffleRuby' aim to enhance Ruby's performance, making it more competitive in web development.",
     "x": [
      "# Scenario: compare p95 latency, SQL time, CPU and allocation counts before and after a targeted change."
     ],
     "p": [
      "JRuby/TruffleRuby compatibility and startup tradeoffs should be tested; framework rankings alone are insufficient."
     ]
    },
    {
     "q": "Explain the concept of ‘JIT’ (just-in-time) compilation in Ruby.",
     "l": "I",
     "a": "JIT compiles selected code to machine instructions during execution to reduce repeated VM overhead. Ruby 2.6 introduced MJIT; Ruby 3.1 introduced YJIT.",
     "e": "MJIT arrived experimentally with Ruby 2.6, not Ruby 3.0. YJIT arrived with Ruby 3.1. Their designs and lifecycle differ; available engines and flags are release/platform-specific. Measure production-like workloads rather than promising near-C performance.",
     "x": [
      "ruby --yjit app.rb"
     ],
     "p": [
      "Availability/options depend on the installed Ruby and platform; measure warmup, memory and representative throughput. JIT does not guarantee C-like performance.",
      "Verification: https://www.ruby-lang.org/en/news/2021/12/25/ruby-3-1-0-released/"
     ]
    },
    {
     "q": "Can a Ruby process leak memory, and how would you diagnose it?",
     "l": "A",
     "a": "A Ruby process can retain memory indefinitely through reachable objects or leak native memory even though garbage collection exists.",
     "e": "Compare RSS, allocation rates and live-object counts over time; use GC.stat, ObjectSpace snapshots and appropriate sampling or allocation profilers. An unbounded cache or retained request object is an application leak, while allocator fragmentation can keep RSS high without the same live-object growth. Bound lifetime or ownership, verify the fix, and treat restarts as mitigation.",
     "x": [
      "p GC.stat.slice(:heap_live_slots, :total_allocated_objects)"
     ],
     "p": [
      "Allocator changes and worker restarts may mitigate symptoms but do not prove the retention bug is fixed."
     ]
    },
    {
     "q": "What is the Ruby ObjectSpace module and what are its uses?",
     "l": "A",
     "a": "ObjectSpace provides runtime object enumeration and diagnostic facilities. Additional heap and memory-size methods are available after requiring objspace.",
     "e": "Use it to investigate retained objects, counts and allocation behavior, often alongside GC.stat. Heap inspection can be expensive and some capabilities are CRuby-specific. Object IDs are diagnostic identities, not durable keys or a safe ownership model.",
     "x": [
      "require \"objspace\"\np ObjectSpace.count_objects\np ObjectSpace.memsize_of(\"hello\")"
     ],
     "p": [
      "ObjectSpace.dump_all is supplied by the objspace extension."
     ]
    },
    {
     "q": "Explain the concept of garbage collection in Ruby and how it helps manage memory.",
     "l": "A",
     "a": "GC reclaims objects that cannot be reached from live roots; retained reachable data and native resource leaks still need explicit lifecycle design.",
     "e": "Garbage collection is a memory management mechanism in Ruby (and many other programming languages) that automatically reclaims memory that is no longer in use or referenced by any part of the program. It helps prevent memory leaks and efficiently manages memory resources. Ruby uses a mark-and-sweep garbage collector. When the garbage collector runs, it marks all objects that are still in use by the program (reachable) and then sweeps through the memory to free up the memory occupied by objects that are not marked (unreachable). The garbage collector in Ruby is transparent to the developer, as it runs automatically at specific intervals or when the memory threshold is reached. This automatic memory management ensures that developers don’t have to explicitly deallocate memory, making Ruby more convenient and less prone to memory-related bugs.",
     "x": [
      "p GC.stat.slice(:heap_live_slots, :minor_gc_count, :major_gc_count)",
      "p GC.stat(:heap_live_slots)\nGC.start",
      "before = GC.stat(:total_allocated_objects)\n100.times { Object.new }\np GC.stat(:total_allocated_objects) - before"
     ],
     "p": [
      "In CRuby’s default collector, mark identifies reachable objects and sweep reclaims unmarked ones; do not invert those terms.",
      "Verification: https://docs.ruby-lang.org/en/3.4/GC.html",
      "“Unused” means unreachable, not merely no longer useful to the business.",
      "Ruby does not generally use CPython-style reference counting.",
      "Do not use object counts alone as a diagnosis of resident memory."
     ],
     "s": [
      "How does Ruby manage memory and garbage collection?",
      "How does Ruby's garbage collection work?",
      "What is Ruby’s garbage collection mechanism, and how does it work?",
      "Explain About Garbage Collection Feature Of Ruby?",
      "How does garbage collection work in Ruby?",
      "Mention what is the function of garbage collection in Ruby on Rails?",
      "What is Garbage collection in ruby on Rails?",
      "What does garbage collection do in Ruby on Rails?",
      "What is the Garbage Collection in Ruby on Rails?"
     ]
    }
   ]
  ],
  [
   "Concurrency",
   [
    {
     "q": "Can you explain the role of thread pooling in relation to the thread lifecycle in Ruby?",
     "l": "I",
     "a": "A thread pool reuses a bounded group of worker threads to execute queued tasks, reducing repeated thread-creation overhead.",
     "e": "A Thread starts running its block when scheduled and can be joined; Thread#value waits and returns the block result or propagates failure. A bounded pool needs queue capacity/backpressure, shutdown and error policies. In CRuby, pooling helps I/O concurrency but does not remove the GVL’s ordinary Ruby CPU limit.",
     "x": [
      "require \"thread\"\nqueue = Queue.new\n2.times { |n| queue << n }\nworkers = 2.times.map { Thread.new { queue.pop * 2 } }\np workers.map(&:value).sort # [0, 2]"
     ],
     "p": [
      "Use a maintained executor library rather than inventing production shutdown semantics from this small sketch."
     ]
    },
    {
     "q": "How do concurrency and parallelism work in Ruby, and what is the GVL (GIL)?",
     "l": "A",
     "a": "In ordinary CRuby threads, the Global VM Lock limits simultaneous execution of Ruby code, while blocking I/O can release it. Threads are useful for I/O concurrency; CPU parallelism may require processes, suitable Ractors or another runtime.",
     "e": "JRuby and TruffleRuby have different threading implementations, and native extensions may release the lock for computation. Fibers provide cooperative scheduling, optionally through a scheduler, but do not themselves imply CPU parallelism. Pick the runtime and model from measured workload and library support, and do not treat the GVL as protection for application-level invariants.",
     "x": [
      "require \"thread\"\nqueue = Queue.new\nworkers = 2.times.map { Thread.new { queue << :done } }\nworkers.each(&:join)\n2.times { p queue.pop }",
      "threads = 3.times.map { Thread.new { sleep 0.1; Thread.current.object_id } }\np threads.map(&:value)",
      "threads = 2.times.map { Thread.new { sleep 0.1; :done } }\np threads.map(&:value)"
     ],
     "p": [
      "Shared mutable state still needs synchronization; a GVL is not a business-level race-condition solution."
     ],
     "s": [
      "How does concurrency work in Ruby, and what is the GIL?",
      "Discuss Ruby's approach to multithreading and concurrency.",
      "Discuss the global interpreter lock (GIL) and its impact on Ruby's performance.",
      "Explain the concept of concurrency and parallelism in Ruby, and how they are achieved."
     ]
    },
    {
     "q": "How do you write thread-safe Ruby code?",
     "l": "A",
     "a": "Avoid shared mutable state where practical; otherwise protect the complete invariant with synchronization or use a suitable thread-safe queue/data structure.",
     "e": "The GVL does not make multi-operation business logic atomic and is not a portable synchronization guarantee across Ruby runtimes. A Mutex protects related state only when every access follows the locking policy. Database races additionally require database constraints, locks or atomic statements; Ruby-level synchronization does not coordinate separate worker processes.",
     "x": [
      "mutex = Mutex.new\ncount = 0\nthreads = 4.times.map { Thread.new { 100.times { mutex.synchronize { count += 1 } } } }\nthreads.each(&:join)\np count # 400"
     ],
     "p": [
      "Do not hold locks around slow external calls without considering contention and deadlocks."
     ]
    },
    {
     "q": "What are Ruby’s Fiber objects and how do they differ from threads?",
     "l": "A",
     "a": "Fibers are lightweight cooperative execution contexts within a thread; threads are scheduled independently by the runtime and operating system.",
     "e": "A fiber normally yields or suspends at controlled points. A Fiber scheduler can make supported blocking operations cooperative, which enables high concurrency for I/O. Fibers do not automatically provide CPU parallelism. In CRuby the global VM lock limits ordinary Ruby-thread CPU parallelism; other runtimes differ.",
     "x": [
      "fiber = Fiber.new { Fiber.yield :paused; :done }\np fiber.resume # :paused\np fiber.resume # :done",
      "fiber = Fiber.new { Fiber.yield :paused; :finished }\np fiber.resume # :paused\np fiber.resume # :finished"
     ],
     "p": [
      "Fiber.yield and puts have different return values."
     ],
     "s": [
      "Explain the concept of fibers and their use in managing lightweight concurrent tasks."
     ]
    }
   ]
  ],
  [
   "Gems, tools and versions",
   [
    {
     "q": "What are RVM, rbenv and gemsets?",
     "l": "B",
     "a": "RVM and rbenv are Ruby version managers: they let each project use its own Ruby version. A gemset is an RVM feature that keeps a separate set of installed gems per project.",
     "e": "rbenv is smaller: it switches Ruby versions with shims and a .ruby-version file, and leaves gem isolation to Bundler. RVM also changes the shell environment and offers gemsets. Today Bundler with a Gemfile.lock already isolates each project’s gem versions, so gemsets are rarely needed; newer tools such as mise or chruby are also common.",
     "x": [
      "# rbenv\nrbenv install 3.4.1\nrbenv local 3.4.1        # writes .ruby-version\n\n# RVM with a gemset\nrvm use 3.4.1@myapp --create\ngem list                 # only the gems in the myapp gemset",
      "rbenv local 3.4.0\nruby -v",
      "gem install bundler\n# In an application use its bundle:\nbundle add rspec-rails"
     ],
     "p": [
      "A gem is a package; a gemset is a named group of installed gems. Do not confuse them.",
      "With Bundler, run commands through bundle exec or binstubs (bin/rails) to use the locked versions."
     ],
     "s": [
      "What is rvm?",
      "Discuss the purpose of RVM and rbenv for managing Ruby versions.",
      "What is a gemset?",
      "Explain what is Gems and Gemset in Ruby on Rails."
     ]
    },
    {
     "q": "How do you create and publish your own Ruby Gem?",
     "l": "B",
     "a": "Create a library and gemspec, build the gem, verify its packaged contents and tests, then publish through an authorized RubyGems account.",
     "e": "To create and publish a Ruby Gem, you need to follow these steps:\n\nCreate a gemspec file describing your gem. Write your gem's code and structure it according to conventions. Use the 'gem build' command to create a gem file from your gemspec. Use 'gem push' to publish your gem to RubyGems.org, the central gem repository. This process allows you to share your code and libraries with others in the Ruby community.",
     "x": [
      "bundle gem useful_library\n# In the generated project, configure its gemspec and tests.\ngem build useful_library.gemspec\ngem push useful_library-0.1.0.gem",
      "bundle gem example_tools\ngem build example_tools.gemspec\n# Publishing, when intended: gem push example_tools-0.1.0.gem"
     ],
     "p": [
      "Do not package credentials or proprietary data. Publishing creates an external release and needs ownership/version discipline.",
      "Use semantic versioning as a compatibility policy rather than an automatic guarantee."
     ],
     "s": [
      "How do you design and implement a Ruby Gem?"
     ]
    },
    {
     "q": "What is Gemfile.lock?",
     "l": "B",
     "a": "Gemfile.lock records the resolved dependency graph and exact gem versions used by the application.",
     "e": "Commit it for applications so teammates and deployments install the same resolution. Gemfile declares requirements, not a guarantee that every machine independently resolves identical versions. Lockfile platform and Ruby/Bundler metadata also matter.",
     "x": [
      "bundle install\n# Update a chosen dependency deliberately:\nbundle update rails"
     ]
    },
    {
     "q": "What is the difference between require, require_relative, and load in Ruby?",
     "l": "I",
     "a": "require finds and loads a feature once, require_relative resolves relative to the calling file, and load executes the specified file on every invocation.",
     "e": "require is not restricted to absolute paths; load resolves according to its documented path rules. Rails autoloading is separate.",
     "x": [
      "require \"json\"\n# Project files: require_relative \"lib/user\"\n# Reload explicitly: load \"lib/user.rb\"",
      "require \"json\"\nrequire_relative \"lib/parser\"\nload \"./script.rb\" # executes again on the next load",
      "require \"json\"\nrequire_relative \"support/formatter\"\nload \"./settings.rb\""
     ],
     "p": [
      "require searches $LOAD_PATH as well as accepting explicit paths; it is not limited to absolute paths.",
      "require can raise LoadError.",
      "Do not equate “load once” with loading exactly once under every possible alias or explicit manual modification.",
      "require does not simply paste a file’s text into lexical scope."
     ],
     "s": [
      "What is the difference between load, require, and require_relative?",
      "What is the purpose of Ruby’s require and require_relative methods?",
      "What is the use of load and require in Ruby?",
      "What is the use of load and required?",
      "What are load() and require() in Ruby?",
      "What is the difference between require and load?",
      "What is the role of load and require in Ruby?",
      "Explain what load does in Ruby on Rails.",
      "Explain what require does in Ruby on Rails."
     ]
    },
    {
     "q": "Which Ruby implementations exist, and how do their runtimes differ?",
     "l": "I",
     "a": "CRuby/MRI is the reference Ruby implementation; JRuby runs on the JVM and TruffleRuby uses the GraalVM/Truffle implementation approach. Historical runtimes such as Rubinius have different status and compatibility.",
     "e": "Runtime choice affects concurrency, native-gem compatibility, startup time, memory and interoperability. Do not assume a dated list proves current project maintenance. Interview code should target the agreed runtime and version, especially when discussing GVL behavior or C extensions.",
     "x": [
      "puts RUBY_ENGINE\nputs RUBY_VERSION",
      "p [RUBY_ENGINE, RUBY_VERSION, RUBY_PLATFORM]"
     ],
     "s": [
      "Discuss the concept of ‘Matz's Ruby Interpreter’ (MRI)."
     ]
    },
    {
     "q": "What are gems, RubyGems and Bundler, and what is the Gemfile for?",
     "l": "I",
     "a": "A gem packages Ruby code and metadata. Bundler resolves dependencies declared in a Gemfile and records selected versions in Gemfile.lock; bundle exec selects that bundle when running a command.",
     "e": "Declare direct dependencies and constraints intentionally, install with bundle install and update selected dependencies with testing. Commit the application lockfile for reproducible development and CI installations. RubyGems supplies gem installation and distribution, while Bundler selects a consistent dependency set for a project; a gem need not be installed globally or published publicly.",
     "x": [
      "# Gemfile\nsource \"https://rubygems.org\"\ngem \"rack\"\n# shell: bundle install\n# shell: bundle exec ruby app.rb",
      "gem install rake\n# For a project: add the gem to Gemfile, then bundle install.",
      "gem install bundler\n# In an application use its bundle:\nbundle add rspec-rails"
     ],
     "n": [
      "In Ruby on Rails, a 'gem' is a packaged library or piece of reusable code that extends the functionality of your application. Think of it as a plugin that you can easily install and use. Gems simplify development by providing pre-built solutions for common tasks. They help avoid re-inventing the wheel and promote code reuse.\n\nFor example, the bcrypt gem is a popular choice for securely handling passwords. Instead of writing your own complex password hashing algorithms, you can use bcrypt. You would add gem 'bcrypt' to your Gemfile, run bundle install, and then use the bcrypt methods to hash and authenticate passwords."
     ],
     "p": [
      "Example version pins in old articles are historical, not current upgrade recommendations.",
      "Commit application lockfiles. A dependency solver can report incompatible constraints; Bundler cannot guarantee no future security or compatibility problems.",
      "An interview preference question has no single universally correct favorite.",
      "Review compatibility, security advisories and the resulting lockfile diff."
     ],
     "s": [
      "What are gems and how does Bundler manage them?",
      "How do you manage dependencies in Ruby projects?",
      "What is a gem in Ruby, and how is it useful in the development process?",
      "What is a Gem in Ruby?",
      "What are Gems in Ruby on Rails?",
      "What is a “gem” in Ruby on Rails?",
      "What is a 'gem' in Ruby on Rails? Give an example of a gem and what it does.",
      "Explain the role of Bundler and gems in the Ruby ecosystem.",
      "How do you install a Ruby gem?",
      "What are RubyGems? Got any favourites?",
      "What are rubygems? Any favorites not including rails? Any that you've worked on personally?",
      "What is the purpose of the Gemfile in a Rails application?",
      "How do you install gems in a Rails project?",
      "How can you add a new gem to your Rails application?",
      "What are Gems and how do you use them in a Rails project?",
      "What is a Rails gem?",
      "What is Gemfile in Ruby on Rails?",
      "What is a Gemfile in Ruby on Rails?",
      "Explain the purpose of the Gemfile in a Rails application.",
      "What is a Gemfile in a Rails application?",
      "What is Gemfile?",
      "What is the purpose of the Gemfile?",
      "What is the purpose of the 'Gemfile' in a Rails project?"
     ]
    },
    {
     "q": "What are the different types of gems in Ruby?",
     "l": "I",
     "a": "Gems are packages categorized informally by purpose, such as runtime, test, development, adapters and API clients; Bundler groups control where dependencies are used.",
     "e": "These are not formal RubyGems package types.",
     "x": [
      "source \"https://rubygems.org\"\ngem \"rake\"\ngroup :test do\n  gem \"rspec\"\nend"
     ],
     "p": [
      "Commit application lockfiles. A dependency solver can report incompatible constraints; Bundler cannot guarantee no future security or compatibility problems."
     ]
    },
    {
     "q": "Explain the use of 'require' and 'include' in Ruby.",
     "l": "I",
     "a": "require loads code; include mixes a module’s instance methods into a class or another module. These are different operations and neither replaces the other.",
     "e": "require may run wherever a library is needed and searches configured load paths; require_relative is useful for nearby files. include alters the receiver’s ancestry and works with modules, not arbitrary classes. First load the module definition if needed, then include it into the intended receiver.",
     "x": [
      "require_relative \"greetable\"\nclass User\n  include Greetable\nend"
     ],
     "p": [
      "Repeated require normally skips an already loaded feature."
     ]
    }
   ]
  ],
  [
   "Testing Ruby code",
   [
    {
     "q": "What is unit testing (in classical terms)? What is the primary technique when writing a test?",
     "l": "B",
     "a": "A unit test checks a focused behavior with assertions comparing actual and expected outcomes; a Rails suite combines unit/model, request/integration and browser/system tests.",
     "e": "Use Minitest or RSpec consistently and choose a test boundary based on the behavior. A unit need not be exactly one method, and tests should cover observable behavior rather than copy implementation details. Keep external effects controlled and scenario data explicit.",
     "x": [
      "require \"minitest/autorun\"\nclass PriceTest < Minitest::Test\n  def test_total\n    assert_equal 6, [1, 2, 3].sum\n  end\nend"
     ]
    },
    {
     "q": "What exactly are Harnesses and Fixtures in the Ruby?",
     "l": "B",
     "a": "A test harness runs tests and reports results; fixtures supply reproducible test data, commonly from YAML in Rails.",
     "e": "Fixtures and factories are alternative ways of preparing model state. Keep data small and relevant, avoid order-dependent shared state, and make important scenario setup visible. A fixture is not simply every kind of supporting test code.",
     "x": [
      "# test/fixtures/users.yml\nada:\n  name: Ada\n# In a Rails test:\nuser = users(:ada)"
     ],
     "s": [
      "Explain what harnesses are."
     ]
    }
   ]
  ],
  [
   "Design patterns and best practices",
   [
    {
     "q": "What is Dependency Injection, and how do you achieve it in Rails?",
     "l": "B",
     "a": "Dependency injection passes a collaborator into an object instead of constructing or locating it implicitly inside the operation.",
     "e": "It makes behavior easier to test and replace without global patching. In Ruby constructor parameters with sensible defaults often suffice; Rails initializers may assemble the dependencies but are not themselves the injection mechanism.",
     "x": [
      "class ReceiptSender\n  def initialize(delivery:) = @delivery = delivery\n  def call(message) = @delivery.deliver(message)\nend"
     ],
     "p": [
      "Avoid using a global service locator and calling it dependency injection."
     ]
    },
    {
     "q": "Explain the Observer Pattern and its use.",
     "l": "I",
     "a": "The Observer pattern lets subscribers react to events from a subject, reducing direct coupling between the subject and each reaction.",
     "e": "Historical Active Record observers are not a default modern Rails component. Depending on the use case, explicit domain events, ActiveSupport::Notifications for instrumentation, callbacks or durable after-commit/outbox work may be appropriate. In-process notification is not durable delivery.",
     "x": [
      "ActiveSupport::Notifications.subscribe(\"checkout.completed\") do |*args|\n  event = ActiveSupport::Notifications::Event.new(*args)\n  Rails.logger.info(event.payload[:order_id])\nend"
     ],
     "p": [
      "Distinguish monitoring notifications from reliable business-event processing."
     ]
    },
    {
     "q": "What is a Service Object, and when do you use it?",
     "l": "I",
     "a": "A service object is an application-defined object encapsulating a coherent operation, especially when it coordinates several models or external dependencies.",
     "e": "It is a design convention, not a built-in Rails superclass. Expose a small interface, make failure/transaction behavior explicit and inject external dependencies for tests. Avoid turning a service into a generic procedural dumping ground.",
     "x": [
      "class Checkout\n  def initialize(gateway:) = @gateway = gateway\n  def call(order)\n    @gateway.authorize(order.total_cents)\n  end\nend",
      "class PublishPost\n  def call(post)\n    post.update!(published_at: Time.current)\n    post\n  end\nend",
      "class PublishPost\n  def call(post)\n    post.update!(published_at: Time.current)\n  end\nend"
     ],
     "p": [
      "Separate database transaction boundaries from external network effects.",
      "Use strong parameters at the HTTP boundary.",
      "Do not mistake moving unsafe code into a service for making it atomic."
     ],
     "s": [
      "Explain the concept of Service Objects in Rails.",
      "What are service objects, and when would you use them?",
      "What are the benefits of using Service Objects in Rails applications? Explain with example."
     ]
    },
    {
     "q": "What are best practices for Ruby development?",
     "l": "A",
     "a": "Use clear interfaces, consistent style, focused tests, locked dependencies, safe input handling and measurement before optimization. Rails-specific MVC/routes are not universal requirements for every Ruby program.",
     "e": "Omitting method-call parentheses is not inherently bad Ruby style. .env is not read by Ruby/Rails automatically without configured tooling; use supported credential/configuration facilities.",
     "x": [
      "def calculate_sum(numbers)\n  numbers.sum\nend\np calculate_sum([]) # 0"
     ]
    },
    {
     "q": "Explain the concept of monads in Ruby and provide an example.",
     "l": "A",
     "a": "A monad is a type supporting a unit operation and a composition operation such as bind, subject to identity and associativity laws. Ruby libraries use such abstractions for optional values and success/failure pipelines.",
     "e": "It should require the block to return a compatible wrapper, supply constructors for presence/absence and test the monad laws before claiming a full lawful abstraction. This is a design abstraction, not a built-in Ruby language feature.",
     "x": [
      "class Maybe\n  def self.unit(value) = new(value)\n  def initialize(value) = @value = value\n  def bind\n    @value.nil? ? self : yield(@value)\n  end\nend\nresult = Maybe.unit(10).bind { |x| Maybe.unit(x * 2) }"
     ],
     "p": [
      "Distinguish a formal monad from an arbitrary chainable wrapper."
     ]
    }
   ]
  ]
 ],
 "ruby_interview_output": [
  [
   "Output questions",
   [
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints little child.",
     "e": "The range 3..6 matches age=5 using Range#===. Earlier 0..2 does not match.",
     "x": [
      "age =  5\ncase age\nwhen 0 .. 2\n    puts \"baby\"\nwhen 3 .. 6\n    puts \"little child\"\nwhen 7 .. 12\n    puts \"child\"\nwhen 13 .. 18\n    puts \"youth\"\nelse\n    puts \"adult\"\nend"
     ],
     "o": [
      "baby",
      "adult",
      "little child",
      "youth"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "SyntaxError.",
     "e": "In a case target expression, branch labels must begin with when.",
     "x": [
      "age =  4\ncase age\nputs \"baby\" when 0 .. 2\nputs \"little child\" when 3 .. 6\nputs \"child\" when 7 .. 12\nputs \"youth\" when 13 .. 18\nputs \"adult\" else\nend"
     ],
     "o": [
      "adult",
      "youth",
      "child",
      "syntax error"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints 1/baby, 2/baby, then 3/4/5 each followed by little child, on separate lines.",
     "e": "The for loop visits 1 through 5. The first two match 0..2 and the last three match 3..6.",
     "x": [
      "for counter in 1..5\ncase counter\nwhen 0 .. 2\n    puts counter\n    puts \"baby\"\nwhen 3 .. 6\n    puts counter\n    puts \"little child\"\nwhen 7 .. 12\n    puts counter\n    puts \"child\"\nelse\n    puts counter\n    puts \"adult\"\nend\nend"
     ],
     "o": [
      "adult 1..5",
      "3..6 littlechild",
      "1",
      "adult"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "The output depends on the missing standard input.",
     "e": "The when expressions assign strings \"a\", \"b\" and \"c\", and their resulting String values are compared with the original case target. Input a prints alphabet a; b prints alphabet b; c prints alphabet c; otherwise it prints some other alphabet. The assignments are legal but confusing; write when \"a\" instead.",
     "x": [
      "string = gets.chomp\ncase string\nwhen string = \"a\"\nprint \"alphabet a\"\nwhen string = \"b\"\nprint \"alphabet b\"\nwhen string = \"c\"\nprint \"alphabet c\"\nelse\n    print \"some other alphabet\"\nend"
     ],
     "o": [
      "alphabet a",
      "b",
      "alphabet c",
      "Syntax error"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "The exact output needs the input; input ruby produces length is 4, matching the scenario in option a.",
     "e": "The target length.length is evaluated before any when assignments. A four-character input matches the integer 4 assigned in the first when; a five-character input matches 5. These assignments overwrite the local variable but do not change the already evaluated target.",
     "x": [
      "length=gets.chomp\ncase length.length\nwhen length=4\nprint \"length is 4\"\nwhen length=5\nprint \"length is 5\"\nend"
     ],
     "o": [
      "ruby",
      "ruby",
      "abc",
      "syntax error"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "The exact output needs the input; input ruby produces length is 4, matching option a’s scenario.",
     "e": "String reversal preserves its character count, so the same length cases apply.",
     "x": [
      "length=gets.chomp\ncase length.reverse.length\nwhen length=4\nprint \"length is 4\"\nwhen length=5\nprint \"length is 5\"\nend"
     ],
     "o": [
      "ruby",
      "ruby",
      "abc",
      "syntax error"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "SyntaxError.",
     "e": "The print-before-when arrangement is invalid syntax for this case statement. The correct structure is when 9 then print \"ruby\".",
     "x": [
      "l=9\ncase l\nprint \"ruby\" when l==9\nprint \"language\" when l==10\nend"
     ],
     "o": [
      "l==9",
      "l==10",
      "Syntax error",
      "Ruby"
     ]
    },
    {
     "q": "The == ‘is equal to’ is known as relational operator.",
     "l": "B",
     "a": "True.",
     "e": "== is an equality (comparison) operator, often grouped with the relational operators <, >, <= and >=. In Ruby it is a method, so each class decides what equality means.",
     "x": [
      "puts 5 == 5.0      # true\nputs \"a\" == \"a\"    # true\nputs 1.==(1)       # true: == is a method call"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "SyntaxError.",
     "e": "The if statement lacks its terminating end. With end supplied, the shown statements print 1 and change counter to 2; there is no loop to print 2.",
     "x": [
      "counter=1\nif counter<=5\n    puts (counter)\n    counter=counter+1"
     ],
     "o": [
      "Syntax error",
      "1 2",
      "1",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "true, true, true, false, each printed on a new line.",
     "e": "17>16, 21<=30 and 9>=9 are true; -11>4 is false. Ruby’s Boolean spellings are lowercase.",
     "x": [
      "test_1 = 17 > 16\nputs(test_1)\ntest_2 = 21 <= 30\nputs(test_2)\ntest_3 = 9 >= 9\nputs(test_3)\ntest_4 = -11 > 4\nputs(test_4)"
     ],
     "o": [
      "True false true false",
      "True True True False",
      "False False True True",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints Not same.",
     "e": "\"string\" and \"strings\" have different String values, so == returns false.",
     "x": [
      "a=\"string\"\nb=\"strings\"\nif(a==b)\n    print (\"a and b are same\")\nelse\n    print \"Not same\"\nend"
     ],
     "o": [
      "a and b are same",
      "Not same",
      "a==b",
      "None of the mentioned"
     ]
    },
    {
     "q": "Assignment operator is also known as relational operator.",
     "l": "B",
     "a": "False.",
     "e": "Assignment and comparison are different operations. Ruby assignment expressions also return the assigned value.",
     "x": [
      "value = 9 # assignment\np value == 9 # comparison, true"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints a greater than b.",
     "e": "The integers are 10 and 9, so the greater-than comparison is true.",
     "x": [
      "a=10\nb=9\nif(a>b)\n    print (\"a greater than b\")\nelse\n    print \"Not greater\"\nend"
     ],
     "o": [
      "a greater than b",
      "Not greater",
      "Syntax error",
      "None of the mentioned"
     ]
    },
    {
     "q": "Which of the following are used for comparison?",
     "l": "B",
     "a": "All of the mentioned.",
     "e": "Equality, inequality and ordering relations are comparisons; whether an object supports an ordering operation depends on its class.",
     "x": [
      "p [2 == 2, 2 != 3, 2 < 3] # [true, true, true]"
     ],
     "o": [
      "Equal to",
      "Not equal to",
      "Less than or greater than",
      "All of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "Error when run as the standalone supplied snippet: a is undefined.",
     "e": "b=9 is assignment, not comparison, and yields the truthy integer 9. If a were initialized to 10, the condition would succeed and assign b. With no earlier definition of a in this snippet, it raises NameError. The intended complete context is missing.",
     "x": [
      "if(a==10 && b=9)\n    print \"true\"\nelse\n    print \"false\"\nend"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false.",
     "e": "The negation of the truthy left OR expression is false, so the conjunction is false.",
     "x": [
      "boolean_1 = !(3 < 4 || false) && (false || true)\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "true.",
     "e": "2**3 is 8 and 3**2 is 9; inequality is true. The trailing ||true also guarantees a truthy Boolean result here.",
     "x": [
      "boolean_1 = 2**3 != 3**2 || true\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false.",
     "e": "-10>-9 is false, so false||false returns false.",
     "x": [
      "boolean_1 = false || -10 > -9\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false.",
     "e": "700/10 is the integer 70; equality is true and negation makes it false.",
     "x": [
      "boolean_1 = !(700 / 10 == 70)\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false and false, on separate lines.",
     "e": "Both !true and !true&&!true evaluate to false.",
     "x": [
      "boolean_1 = !true\nputs boolean_1\nboolean_2 = !true && !true\nputs boolean_2"
     ],
     "o": [
      "True True",
      "False False",
      "True False",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false.",
     "e": "The leading !true is false, so && short-circuits without needing the right-hand expression.",
     "x": [
      "boolean_2 = !true && (!true || 100 != 5**2)\nputs boolean_2"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "false.",
     "e": "77<78 is true, but 77<77 is false; the conjunction returns false.",
     "x": [
      "boolean_1 = 77 < 78 && 77 < 77\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will be the output of the given code?",
     "l": "B",
     "a": "true.",
     "e": "3<4||false is true; false||true is true; their conjunction is true.",
     "x": [
      "boolean_1 = (3 < 4 || false) && (false || true)\nputs boolean_1"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "Syntax for unless conditional statement is",
     "l": "B",
     "a": "True.",
     "e": "unless condition; body; else; other; end is a valid ordinary unless form. The bracketed [then] denotes an optional keyword, not literal brackets in Ruby code.",
     "x": [
      "condition = false\nunless condition\n  puts \"condition is falsy\"\nelse\n  puts \"condition is truthy\"\nend"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints 4, 8 and length of x is less than that of y.",
     "e": "\"ruby\" has length four; \"language\" has length eight. puts x,y writes separate lines, and unless 4>8 executes the print.",
     "x": [
      "x=\"ruby\".length\ny=\"language\".length\nputs x,y\nunless x>y\nprint \"length of x is less than that of y\"\nend"
     ],
     "o": [
      "4",
      "4",
      "Syntax error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints only x is less than y+1.",
     "e": "8<10 is true, so the first unless body is skipped. 8>11 is false, so the second body runs.",
     "x": [
      "x=8\ny=10\nunless x<y\nputs \"x is less than y\"\nend\nunless x>y+1\nputs \"x is less than y+1\"\nend"
     ],
     "o": [
      "x is less than y",
      "x is less than y+1",
      "x is less than y",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints x is greater than 2.",
     "e": "x>2 is true, so the unless body is skipped and else runs. The label is descriptive text, not an assertion that all values failing the first branch are strictly greater.",
     "x": [
      "x=3\nunless x>2\nputs \"x is less than 2\"\nelse\nputs \"x is greater than 2\"\nend"
     ],
     "o": [
      "x is greater than 2",
      "x is less than 2",
      "3",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints lines 1 and 3.",
     "e": "The integer 1 is truthy, so the first if executes and the following unless does not. After var=false, the last unless executes.",
     "x": [
      "var =  1\nprint \"1 -- Value is set\\n\" if var\nprint \"2 -- Value is set\\n\" unless var\nvar = false\nprint \"3 -- Value is set\\n\" unless var"
     ],
     "o": [
      "1–Value is set",
      "2–Value is set",
      "1–Value is set",
      "1–Value is set"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints Not hungry.",
     "e": "hungry is false, so unless hungry executes its first branch.",
     "x": [
      "hungry=false\nunless hungry\n print \"Not hungry\"\nelse\n print \"Hungry\"\nend"
     ],
     "o": [
      "Not hungry",
      "Hungry",
      "Syntax error",
      "None of the mentioned"
     ]
    },
    {
     "q": "The following syntax is also used for unless conditional statement.",
     "l": "B",
     "a": "True.",
     "e": "Ruby supports the modifier form expression unless condition; it executes expression only for a falsy condition.",
     "x": [
      "code unless conditional"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints 14.",
     "e": "12 is truthy, so the else branch computes counter+2. Ruby does not treat zero or other integers as falsy.",
     "x": [
      "counter=12\nunless counter\n print counter+1\nelse\n print counter+2\nend"
     ],
     "o": [
      "13",
      "14",
      "15",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints the lowercase String false (option b is closest).",
     "e": "true && false evaluates to false, so unless executes print \"false\". The output is a String and print returns nil. The option capitalizes False, which is not the exact output.",
     "x": [
      "unless true && false\nprint \"false\"\nelse\n    print \"ruby\"\nend"
     ],
     "o": [
      "True",
      "False",
      "Nil",
      "Syntax error"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints 2 is less than 3.",
     "e": "2>3 is false, so the modifier unless allows the print call.",
     "x": [
      "print \"2 is less than 3\" unless 2>3"
     ],
     "o": [
      "2>3",
      "2 is less than 3",
      "Syntax error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "B",
     "a": "It prints both x is less than y and x is less than y+1 on separate lines.",
     "e": "Both 8>10 and 8>11 are false, so both unless bodies run.",
     "x": [
      "x=8\ny=10\nunless x>y\nputs \"x is less than y\"\nend\nunless x>y+1\nputs \"x is less than y+1\"\nend"
     ],
     "o": [
      "x is less than y",
      "x is less than y+1",
      "x is less than y",
      "None of the mentioned"
     ]
    },
    {
     "q": "Find the error in the following code and correct it.",
     "l": "B",
     "a": "The shown greet method is valid Ruby. It prints a greeting and returns nil because puts returns nil.",
     "e": "There is no syntax error to fix. If the requirement is to return the greeting for another caller to use, remove puts and leave the interpolated string as the final expression. Printing and returning are different requirements.",
     "x": [
      "def greet(name)\n  \"Hello, #{name}\"\nend\np greet(\"Alice\")"
     ],
     "p": [
      "Do not invent a bug when the input is already valid."
     ]
    },
    {
     "q": "Consider the following two methods: What will be the result of each of the following lines of code:",
     "l": "B",
     "a": "The first three calls print 10 and the next two print 3. sum (1, 2) is a syntax error because a spaced parenthesized expression is parsed as one argument.",
     "e": "The first three lines of code will all print out 10, as expected. The next two lines of code will both print out 3, as expected. However, the last line of code (i.e., `sum (1,2)`) will result in the following:\n\n\n\n```ruby\nsyntax error, unexpected ',', expecting ')'\nsum (1, 2)\n       ^\n\n```\n\n\nThe problem is the space between the method name and the open parenthesis. Because of the space, the Ruby parser thinks that `(1, 2)` is an expression that represents a single argument, but `(1, 2)` is not a valid Ruby expression, hence the error. Note that the problem does not occur with single argument methods (as shown with our `timesTwo` method above), since the single value is a valid expression (e.g., `(5)` is a valid expression which simply evaluates to 5).",
     "x": [
      "def times_two(arg1);\n  puts arg1 * 2;\nend\n\ndef sum(arg1, arg2);\n  puts arg1 + arg2;\nend",
      "def sum(a, b); a + b; end\np sum(1, 2) # 3",
      "def sum(a, b) = a + b\np sum(1, 2) # 3\n# sum (1, 2) # SyntaxError"
     ],
     "p": [
      "A syntax error prevents the whole file from executing; evaluate invalid forms separately when demonstrating earlier outputs.",
      "Method-call style recommendations are conventions, but parse errors are language behavior."
     ],
     "s": [
      "What will be the result of each of the following lines of code?"
     ]
    },
    {
     "q": "The expression specified by the when clause is evaluated as the left operand. If no when clauses match, case executes the code of the else clause.",
     "l": "B",
     "a": "True.",
     "e": "A target case tests when_expression === target in order and runs else only if none match.",
     "x": [
      "p((1..3) === 2) # true"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "What will the following code evaluate to?",
     "l": "B",
     "a": "true.",
     "e": "9 != 10 evaluates to true, and that Boolean is assigned to a.",
     "x": [
      "a=9!=10"
     ],
     "o": [
      "True",
      "False",
      "Syntax error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will the following expression evaluate to?",
     "l": "B",
     "a": "false.",
     "e": "The first operand is truthy, so the second operand false is evaluated and returned.",
     "x": [
      "true && false"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will the following expression evaluate to?",
     "l": "B",
     "a": "true.",
     "e": "The left operand is already true, so || returns it and skips evaluation of the right operand.",
     "x": [
      "true || false"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will the following expression evaluate to?",
     "l": "B",
     "a": "false.",
     "e": "true&&false is false and !true is false; false||false is false.",
     "x": [
      "(true && false) || (!true)"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "What will the following expression evaluate to?",
     "l": "B",
     "a": "false.",
     "e": "!true is false; && short-circuits immediately.",
     "x": [
      "!true && !false"
     ],
     "o": [
      "True",
      "False",
      "Error",
      "None of the mentioned"
     ]
    },
    {
     "q": "The ‘=’ is used for assigning value to variable?",
     "l": "B",
     "a": "True.",
     "e": "= assigns a value; it does not test equality. Use == for an ordinary value-equality comparison.",
     "x": [
      "value = 9\np value # 9"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "Boolean opeartors are also known as logical operators.",
     "l": "B",
     "a": "True.",
     "e": "Boolean (logical) operators are &&, ||, ! and the low-precedence and, or, not. Note that && and || return one of their operands, not necessarily true or false.",
     "x": [
      "puts true && false   # false\nputs nil || \"default\" # default\nputs !true           # false"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "Which of the following is a valid boolean operator?",
     "l": "B",
     "a": "All of the mentioned.",
     "e": "Ruby supports &&/and, ||/or and !/not, but each pair has different precedence, so the spellings are not blindly interchangeable.",
     "x": [
      "p [true && true, false || true, !false] # [true, true, true]"
     ],
     "o": [
      "and(&&)",
      "or(||)",
      "not(!)",
      "All of the mentioned"
     ]
    },
    {
     "q": "The boolean operator && only result in true when both the values are true?",
     "l": "B",
     "a": "True for inputs restricted to the Boolean objects true and false; the unrestricted Ruby claim needs qualification.",
     "e": "&& returns its first falsy operand or its last evaluated operand. For example 1 && 2 returns 2, not true. It expresses logical conjunction of truthiness without converting results into Booleans.",
     "x": [
      "p 1 && 2 # 2, not literal true"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "Given that the following code has been run: What will be the value of: - `defined? foo` - `defined? bar`",
     "l": "B",
     "a": "defined? foo returns \"local-variable\" because the parser saw its assignment; foo reads nil. defined? bar returns nil because there is no local declaration or method.",
     "e": "This is parse-time local-variable recognition, not runtime reading of the skipped branch.",
     "x": [
      "if false\n  foo = 'test'\nend",
      "if false\n  foo = \"test\"\nend\np [defined?(foo), foo, defined?(bar)]",
      "foo = 1 if false\np defined?(foo) # \"local-variable\"\np foo           # nil\np defined?(bar) # nil, if no such local/method exists"
     ],
     "p": [
      "This is parse-time local-variable recognition, not runtime reading of the skipped branch.",
      "Verification: https://docs.ruby-lang.org/en/3.4/syntax/assignment_rdoc.html",
      "Results depend on scope and available methods."
     ],
     "s": [
      "What will be the value of:"
     ]
    },
    {
     "q": "What’s wrong with the code below and why?",
     "l": "B",
     "a": "The do/end block binds to puts, so Benchmark.measure receives no block and raises LocalJumpError. Parenthesize the measured call or use braces.",
     "e": "Ruby block-binding precedence makes braces bind more tightly than do/end in this call form. Benchmark.measure yields to a supplied block; it cannot measure the loop if the block belongs to puts. A deterministic bounded operation is a better repeatable timing example than a random infinite loop.",
     "x": [
      "require \"benchmark\"\nputs(Benchmark.measure do\n  1000.times { 2 * 3 }\nend)\n# Or:\nputs Benchmark.measure { 1000.times { 2 * 3 } }"
     ]
    },
    {
     "q": "A case statement compares the expression specified by case and that specified by when using the === operator and executes the code of the when clause that matches.",
     "l": "I",
     "a": "True.",
     "e": "The direction is when_pattern === case_target. This is why a Range, Regexp or Class can act as a case pattern.",
     "x": [
      "p(Integer === 5) # true"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "The following syntax is used for the ruby case statement.",
     "l": "I",
     "a": "True as pseudocode for the ordinary case syntax.",
     "e": "Each when can list multiple comma-separated patterns and optional then. Ellipses are placeholders, not literal Ruby tokens in the shown template.",
     "x": [
      "case expression\nwhen expression , expression ... then\n   code ...\nelse\n   code\nend"
     ],
     "o": [
      "True",
      "False"
     ]
    },
    {
     "q": "Is the line of code below valid Ruby code? If so, what does it do? Explain your answer.",
     "l": "I",
     "a": "It is valid: -> constructs a lambda Proc, [] calls it, and p prints the inspected string including quotes. The returned value is the original string.",
     "x": [
      "-> (a) {p a}[\"Hello world\"]",
      "result = ->(a) { p a }[\"Hello world\"]\np result",
      "->(a) { p a }[\"Hello World\"] # prints \"Hello World\" with quotes"
     ],
     "p": [
      "All lambdas are Proc objects, but not all Proc objects have lambda behavior.",
      "p prints quotes around a String; puts normally does not."
     ],
     "s": [
      "Is the line of code below valid Ruby code? If so, what does it do? Explain your answer?",
      "Predict the output of the code below. Explain your answer?"
     ]
    },
    {
     "q": "What is the output of the given code?",
     "l": "I",
     "a": "Error. As written (print Hi puts Welcome!) it is not valid Ruby: Hi and Welcome are read as constants or methods, not strings.",
     "e": "Strings need quotes. If the code was meant to be print \"Hi\"; puts \"Welcome!\", the output is HiWelcome! followed by a newline, because print does not add a newline and puts does.",
     "x": [
      "print \"Hi\"\nputs \"Welcome!\"\n# HiWelcome!"
     ],
     "p": [
      "Options in the quiz: Error, Hi, Welcome!, Hi Welcome!"
     ]
    },
    {
     "q": "What will be the output of the following code?",
     "l": "I",
     "a": "It prints Hello Woof! followed by a newline.",
     "e": "Dog#speak calls the next speak implementation using super. Animal#speak returns \"Hello\"; concatenating \" Woof!\" produces the string printed by puts. The final puts itself returns nil.",
     "x": [
      "p Dog.new.speak # assuming the classes in the source are defined: \"Hello Woof!\""
     ],
     "p": [
      "super continues method lookup; + builds a String value."
     ]
    },
    {
     "q": "What will be the output?",
     "l": "I",
     "a": "YBUR, assuming Ruby is the string \"Ruby\". Written literally as Ruby.reverse.upcase it raises NameError, because an unquoted capitalized word is a constant.",
     "e": "reverse returns \"ybuR\", and upcase turns it into \"YBUR\". The methods run left to right, each on the result of the previous one.",
     "x": [
      "puts \"Ruby\".reverse          # ybuR\nputs \"Ruby\".reverse.upcase   # YBUR"
     ],
     "p": [
      "Options in the quiz: RUBY, ybUR, YBUR, YBur."
     ]
    },
    {
     "q": "What will be the values of var1 and var2?",
     "l": "I",
     "a": "var1 is nil and var2 is 4.",
     "e": "An if without an else returns nil when its condition is false, and a method returns the value of its last expression. A.a(0) skips the branch, so it returns nil; A.a(2) returns 2 * 2.",
     "x": [
      "class A\n  def self.a(b)\n    if b > 0\n      b * b\n    end\n  end\nend\n\nvar1 = A.a(0)\nvar2 = A.a(2)\np var1 # nil\np var2 # 4",
      "class A\n  def self.a(b); b * b if b > 0; end\nend\np [A.a(0), A.a(2)]"
     ],
     "p": [
      "if expressions without a matching branch or else return nil."
     ],
     "s": [
      "Consider the following code: What will be the values of: - `var1 = A.a(0)` - `var2 = A.a(2)`"
     ]
    },
    {
     "q": "What will val1 and val2 equal after this code runs? Explain your answer.",
     "l": "I",
     "a": "val1 is true and val2 is false.",
     "e": "and/or have lower precedence than =, while &&/|| have higher precedence. So the first line assigns true to val1 and then evaluates \"true and false\" without storing it. The second line evaluates true && false first and assigns false.",
     "x": [
      "val1 = true and false  # parsed as (val1 = true) and false\nval2 = true && false   # parsed as val2 = (true && false)\np val1 # true\np val2 # false"
     ],
     "p": [
      "Do not claim an output for absent code."
     ],
     "s": [
      "What will `val1` and `val2` equal after the code below is executed? Explain your answer."
     ]
    },
    {
     "q": "Consider the following code: What will be the value of each of the following: Explain your answer.",
     "l": "I",
     "a": "value1 finds Foo::VAL through lexical nesting; value2, defined using class Foo::Bar, does not have Foo in lexical nesting and finds the top-level VAL.",
     "e": "`Foo::Bar.new.value1` will be equal to `'Foo Local'` and `Foo::Bar.new.value2` will be equal to `'Global'`. Here’s why:\n\n\nThe `module` keyword (as well as the `class` and `def` keywords) will create a new lexical scope for all of its contents. The above module `Foo` therefore creates the scope `Foo` in which the `VAL` constant equal to `'Foo Local'` is defined. Inside `Foo`, we declare class `Bar`, which creates another new lexical scope (named `Foo::Bar`) which also has access to its parent scope (i.e., `Foo`) and all of its constants. However, when we then declare `Foo::Bar` (i.e., using `::`), we are actually creating yet another lexical scope, which is also named `Foo::Bar` (how’s that for confusing!). However, this lexical scope has no parent (i.e., it is entirely independent of the lexcial scope `Foo` created earlier) and therefore does not have any access to the contents of the ‘Foo’ scope. Therefore, inside class `Foo::Bar`, we only have access to the `VAL` constant declared at the beginning of the script (i.e., outside of any module) with the value `'Global'`.",
     "x": [
      "VAL = 'Global'\n\nmodule Foo\n  VAL = 'Foo Local'\n\n  class Bar\n    def value1\n      VAL\n    end\n  end\nend\n\nclass Foo::Bar\n  def value2\n    VAL\n  end\nend",
      "VAL = \"Global\"\nmodule Foo\n  VAL = \"Foo Local\"\n  class Bar\n    def value1; VAL; end\n  end\nend\nclass Foo::Bar\n  def value2; VAL; end\nend\np [Foo::Bar.new.value1, Foo::Bar.new.value2]"
     ],
     "p": [
      "Qualified names and nested class/module syntax produce different Module.nesting."
     ]
    },
    {
     "q": "What is the value of the variable upcased in the below piece of code?",
     "l": "I",
     "a": "upcased is [nil, nil, nil], while ONE, TWO and THREE are printed on separate lines.",
     "e": "map stores each block’s final value. Here that value comes from puts, which returns nil. If the array of uppercase strings is wanted, use map(&:upcase) without printing as the final operation.",
     "x": [
      "upcased = [\"one\", \"two\", \"three\"].map { |n| puts n.upcase }\np upcased # [nil, nil, nil]",
      "upcased = %w[one two three].map { |n| puts n.upcase }\np upcased"
     ],
     "p": [
      "Keep returned values separate from console side effects."
     ],
     "s": [
      "What is the value of the variable `upcased` in the below piece of code? `upcased = [\"one\", \"two\", \"three\"].map {|n| puts n.upcase }`"
     ]
    },
    {
     "q": "Which of the expressions listed below will result in “false”?",
     "l": "I",
     "a": "The conditions false and nil choose the String \"false\"; every other listed condition chooses the String \"true\".",
     "e": "The question’s ternaries return text Strings rather than Boolean objects. Only nil and false are falsy; the String \"false\", zero, an empty String and an empty Array are all truthy.",
     "x": [
      "p [true, false, nil, 1, 0, \"false\", \"\", []].map { |x| x ? \"true\" : \"false\" }",
      "p [false, nil, 0, \"\", []].map { |v| v ? \"true\" : \"false\" }"
     ],
     "p": [
      "Keep the value false distinct from the text \"false\"."
     ],
     "s": [
      "Which of the expressions listed below will result in `\"false\"`?"
     ]
    }
   ]
  ]
 ],
 "ruby_interview_coding": [
  [
   "String problems",
   [
    {
     "q": "Write a Ruby method that takes a string as input and returns a new string with the words reversed.",
     "l": "B",
     "a": "Split words, reverse their order and join with spaces. This normalizes whitespace and keeps punctuation attached to its word.",
     "e": "In this code, the reverse_words method splits the input string into an array of words using the split method, then reverses the order of words using the reverse method, and finally joins the reversed words back into a string using the join method. The resulting string contains the words in reverse order.",
     "x": [
      "def reverse_words(text); text.split.reverse.join(\" \"); end\np reverse_words(\"Hello, this is a sample sentence.\")"
     ]
    },
    {
     "q": "Word Cloud Data",
     "l": "I",
     "a": "Tokenize under an explicit word policy and count tokens with a Hash.",
     "e": "The example lowercases and preserves internal apostrophes while splitting on other nonword boundaries. O(total text length) scanning plus O(k) distinct-token storage is typical. Production Unicode tokenization may need normalization and language-specific segmentation.",
     "x": [
      "# 28. Chosen policy: case-insensitive Unicode letter words, internal apostrophes.\ndef word_counts(text)\n  text.downcase.scan(/[\\p{L}\\p{N}]+(?:['’][\\p{L}\\p{N}]+)*/).tally\nend\n\n# Example usage:\np word_counts(\"Ruby, ruby! It’s useful.\") # {\"ruby\"=>2, \"it’s\"=>1, \"useful\"=>1}"
     ],
     "p": [
      "A plain split treats punctuation as part of words; choose the required behavior."
     ]
    },
    {
     "q": "Permutation Palindrome",
     "l": "I",
     "a": "A string has a palindromic permutation exactly when at most one character has an odd count.",
     "e": "Toggle each character in a set or count frequencies. Two copies occupy mirrored positions; at most one odd-count character can occupy the center. O(n) time and O(k) space for k distinct characters, or fixed space for a fixed alphabet.",
     "x": [
      "# 24. Literal characters; case and whitespace matter in this variant.\ndef palindrome_permutation?(string)\n  odd = {}\n  string.each_char { |char| odd.key?(char) ? odd.delete(char) : odd[char] = true }\n  odd.size <= 1\nend\n\n# Example usage:\np palindrome_permutation?(\"civic\") # true"
     ],
     "p": [
      "Decide whether case, spaces, punctuation and Unicode normalization matter."
     ]
    },
    {
     "q": "Write a code to automatically clean and format the user input.",
     "l": "I",
     "a": "Normalize input before validation when the normalization affects validity, and avoid blindly changing human names.",
     "e": "Use a before_validation callback for model-local normalization. strip or email downcasing may be appropriate; titleize can change legitimate names or Unicode text unexpectedly. Handle nil deliberately, and define the business rule before applying transformations.",
     "x": [
      "before_validation :normalize_name\nprivate\ndef normalize_name\n  self.name = name&.strip\nend"
     ]
    },
    {
     "q": "How to write multiline string in Ruby?",
     "l": "I",
     "a": "Use a multiline quoted literal, a percent literal or a heredoc. Squiggly heredocs remove common indentation.",
     "e": "Interpolation depends on the delimiter form. A quoted heredoc marker can suppress interpolation, and <<~ supports indentation-friendly source. Choose a representation that keeps content and escaping readable.",
     "x": [
      "message = <<~TEXT\n  Hello\n  Ruby\nTEXT\nputs message"
     ],
     "p": [
      "Percent literals such as %q and %Q differ in interpolation behavior."
     ]
    },
    {
     "q": "Implement a method that reverses a given string without using built-in methods.",
     "l": "I",
     "a": "Clarify that “without built-in methods” normally forbids the convenience reverse operation, then implement the reversal with explicit traversal.",
     "e": "The example collects characters and swaps them in O(n) time with O(n) additional storage, preserving code points. For user-perceived grapheme reversal use a grapheme-aware representation; for O(1) in-place reversal state an ASCII/byte-array constraint.",
     "x": [
      "def reverse_string(text)\n  chars = text.chars\n  left, right = 0, chars.length - 1\n  while left < right\n    chars[left], chars[right] = chars[right], chars[left]\n    left += 1\n    right -= 1\n  end\n  chars.join\nend\np reverse_string(\"hello\") # \"olleh\""
     ],
     "p": [
      "Literal curly quotation marks from the article are not Ruby string delimiters."
     ]
    },
    {
     "q": "Reverse String in Place",
     "l": "I",
     "a": "For an ASCII mutable String, swap bytes from the two ends toward the center.",
     "e": "The standard O(n)-time, O(1)-extra-space two-pointer solution is straightforward for bytes or a mutable character array. UTF-8 code points and grapheme clusters use variable byte lengths, so byte reversal corrupts general text. The supplied code deliberately rejects non-ASCII rather than making a false Unicode guarantee.",
     "x": [
      "# 20. ASCII-only mutable String. Byte swapping is unsafe for UTF-8 characters.\ndef reverse_ascii_range!(string, left, right)\n  while left < right\n    a, b = string.getbyte(left), string.getbyte(right)\n    string.setbyte(left, b)\n    string.setbyte(right, a)\n    left += 1\n    right -= 1\n  end\n  string\nend\ndef reverse_ascii!(string)\n  raise ArgumentError, 'ASCII required' unless string.ascii_only?\n  reverse_ascii_range!(string, 0, string.bytesize - 1)\nend\n\n# Example usage:\ntext = +\"ruby\"\nreverse_ascii!(text)\np text # \"ybur\""
     ],
     "p": [
      "For user-visible Unicode, define the unit (code point or grapheme) and accept or design for additional storage."
     ]
    },
    {
     "q": "Validate string against dictionary",
     "l": "I",
     "a": "The title alone does not define what “validate” means. If the intended variant is word break, dynamic programming can determine whether a string can be segmented into dictionary words.",
     "e": "A standard variant marks positions reachable by valid dictionary tokens. dp[0]=true; for each end position, accept a prefix if some earlier reachable position is followed by a dictionary word.",
     "x": [
      "def word_break?(text, words)\n  dictionary = words.to_h { |word| [word, true] }\n  reachable = Array.new(text.length + 1, false)\n  reachable[0] = true\n  1.upto(text.length) do |finish|\n    reachable[finish] = (0...finish).any? { |start| reachable[start] && dictionary.key?(text[start...finish]) }\n  end\n  reachable.last\nend"
     ],
     "p": [
      "O(n²) candidate splits, with substring allocation/hash costs beyond constant-time lookup; exact constraints are missing."
     ]
    },
    {
     "q": "Write a function in Ruby to check if the string is a palindrome.",
     "l": "I",
     "a": "Compare a string with its reverse, after explicitly deciding normalization rules.",
     "e": "An exact palindrome check is case- and punctuation-sensitive. If the interview requires ignoring punctuation/case, normalize first and explain the alphabet/Unicode rules. reverse is linear in input size, and allocating a reversed copy needs linear extra space.",
     "x": [
      "def palindrome?(value)\n  value == value.reverse\nend\n# ASCII alphanumeric normalization variant:\nclean = \"A man, a plan, a canal: Panama\".downcase.gsub(/[^a-z0-9]/, \"\")\nclean == clean.reverse # true"
     ],
     "s": [
      "Write a function to check if the string is or not a palindrome in Ruby?"
     ]
    },
    {
     "q": "Write a Ruby method that takes a string as input and returns the number of words in the string.",
     "l": "I",
     "a": "For whitespace-delimited words, split and count tokens. State the tokenization rule because punctuation, Unicode and hyphenated words may need different definitions.",
     "e": "In this code, the count_words method splits the input string into an array of words using the split method, and then returns the count of elements in the array using the count method.",
     "x": [
      "def count_words(text); text.split.length; end\np count_words(\"Ruby is a powerful programming language\") # 6"
     ]
    },
    {
     "q": "Bracket Validator",
     "l": "A",
     "a": "Use a stack of opening brackets and require each closing bracket to match the latest opener.",
     "e": "Push (, [ and {. For a closer, fail if the stack is empty or its top is not the matching opener. Accept only if the stack is empty at the end. O(n) time and O(n) worst-case stack space. The code ignores non-bracket characters by explicit policy.",
     "x": [
      "# 23. Ignore non-bracket characters; match (), [] and {}.\ndef valid_brackets?(string)\n  closing = { ')' => '(', ']' => '[', '}' => '{' }\n  stack = []\n  string.each_char do |char|\n    if closing.value?(char)\n      stack << char\n    elsif closing.key?(char)\n      return false unless stack.pop == closing[char]\n    end\n  end\n  stack.empty?\nend\n\n# Example usage:\np valid_brackets?(\"{a:[()]}\") # true\np valid_brackets?(\"([)]\") # false"
     ],
     "p": [
      "A counter alone cannot check mixed bracket nesting."
     ]
    },
    {
     "q": "Implement a Ruby method that converts a given sentence to title case.",
     "l": "A",
     "a": "For a simple whitespace title transformation, capitalize each token and join. String#capitalize downcases the remaining letters, so this is not editorial title-case logic.",
     "e": "In this code, the title_case method splits the input sentence into an array of words using the split method, capitalizes each word using the map method and capitalize method, and then joins the capitalized words back into a sentence using the join method.",
     "x": [
      "def title_case(text); text.split.map(&:capitalize).join(\" \"); end\np title_case(\"rUBY on RAILS\") # \"Ruby On Rails\""
     ],
     "p": [
      "Preserving acronyms, minor words and exact whitespace requires a richer specification; O(n) time/space."
     ]
    },
    {
     "q": "Parenthesis Matching",
     "l": "A",
     "a": "Starting at the opening parenthesis, track nesting depth and return the first index where it falls back to zero.",
     "e": "Increment for ( and decrement for ); ignore other characters in this standard text variant. Reject an invalid opening index or unmatched open. O(n) scan time and O(1) extra state. Parsing a programming language with quoted strings/comments requires additional lexical rules.",
     "x": [
      "# 22. opening_index points to '('; returns matching index, raises if absent.\ndef closing_parenthesis(string, opening_index)\n  raise ArgumentError unless string[opening_index] == '('\n  depth = 0\n  opening_index.upto(string.length - 1) do |index|\n    depth += 1 if string[index] == '('\n    depth -= 1 if string[index] == ')'\n    return index if depth.zero?\n  end\n  raise ArgumentError, 'no matching closing parenthesis'\nend\n\n# Example usage:\np closing_parenthesis(\"a(b(c)d)e\", 1) # 7"
     ],
     "p": [
      "The input index must refer to an opening parenthesis."
     ]
    },
    {
     "q": "Reverse Words",
     "l": "A",
     "a": "For the ASCII space-delimited variant, reverse the whole string, then reverse each word region.",
     "e": "The first reversal flips word order and letters; reversing each nonspace region restores letter order. O(n) time and O(1) auxiliary space for a mutable ASCII String. Runs of spaces are retained but their positions follow the global reversal. A split/reverse/join solution is simpler when in-place memory is not required.",
     "x": [
      "# 21. ASCII words separated by literal spaces; preserves runs of spaces, reversed.\ndef reverse_words_ascii!(string)\n  reverse_ascii!(string)\n  start = 0\n  0.upto(string.bytesize) do |index|\n    if index == string.bytesize || string.getbyte(index) == 32\n      reverse_ascii_range!(string, start, index - 1)\n      start = index + 1\n    end\n  end\n  string\nend\n\n# Example usage:\ntext = +\"cake thief\"\nreverse_words_ascii!(text)\np text # \"thief cake\""
     ],
     "p": [
      "Clarify whitespace, punctuation and Unicode before promising exact formatting."
     ]
    },
    {
     "q": "Write a Ruby method that takes a string as input and returns the number of occurrences of each word in the string.",
     "l": "A",
     "a": "Split on whitespace, normalize case and count in a Hash. Under this rule, punctuation remains part of each word.",
     "e": "Correct sentence. count is 2, not 1. Clarify whether punctuation should be removed and whether Unicode case folding is required.",
     "x": [
      "def word_occurrences(text)\n  text.split.each_with_object(Hash.new(0)) { |word, h| h[word.downcase] += 1 }\nend\np word_occurrences(\"This is a sample sentence. This is another sample sentence.\")"
     ],
     "p": [
      "Correct sentence. count is 2, not 1. Clarify whether punctuation should be removed and whether Unicode case folding is required."
     ]
    },
    {
     "q": "Recursive String Permutations",
     "l": "A",
     "a": "Recursively choose each distinct leading character and permute the remaining characters.",
     "e": "The base case for the empty string returns one empty permutation. Using distinct choices at each depth avoids duplicate outputs for repeated characters. The output can contain n! strings, so factorial time and output space are unavoidable when all permutations are materialized.",
     "x": [
      "# 25. Unique permutations; output size is inherently factorial in the worst case.\ndef permutations(string)\n  return [''] if string.empty?\n  chars = string.chars\n  chars.uniq.flat_map do |char|\n    index = chars.index(char)\n    rest = chars[0...index] + chars[index + 1..]\n    permutations(rest.join).map { |suffix| char + suffix }\n  end\nend\n\n# Example usage:\np permutations(\"aba\").sort # [\"aab\", \"aba\", \"baa\"]"
     ]
    }
   ]
  ],
  [
   "Array and hash problems",
   [
    {
     "q": "Create a Ruby function that takes an array of numbers as input and returns a new array containing only the even numbers.",
     "l": "B",
     "a": "Use select with even? to return a new array of even integers in their original order.",
     "e": "Time O(n), result O(k). puts an array prints one value per line; use p to display brackets.",
     "x": [
      "def even_numbers(values); values.select(&:even?); end\np even_numbers([1, 2, 3, 4]) # [2, 4]"
     ],
     "p": [
      "Time O(n), result O(k). puts an array prints one value per line; use p to display brackets."
     ]
    },
    {
     "q": "Write a Ruby method that takes an array of strings and returns a new array containing only the strings that are of even length.’",
     "l": "B",
     "a": "Select strings whose length is even, preserving original order; length counts characters under the string’s encoding rather than display grapheme clusters.",
     "e": "Time is linear in inputs, with encoding-dependent length cost.",
     "x": [
      "def even_length_strings(values); values.select { |s| s.length.even? }; end\np even_length_strings(%w[apple banana orange grapes kiwi]) # [\"banana\", \"orange\", \"grapes\", \"kiwi\"]"
     ]
    },
    {
     "q": "Given this input:",
     "l": "I",
     "a": "Use flat_map(&:keys) and flat_map(&:values) to obtain all keys and values while preserving the input hashes’ order.",
     "e": "That assumes the array length and overwrites duplicate keys, potentially losing source entries. flat_map works for an arbitrary array length and retains duplicates. If a merged dictionary is specifically required, define the duplicate-key conflict rule.",
     "x": [
      "x = [{\"a\" => 10}, {\"b\" => 20}, {\"c\" => 30}]\nkeys = x.flat_map(&:keys) # [\"a\", \"b\", \"c\"]\nvalues = x.flat_map(&:values) # [10, 20, 30]"
     ]
    },
    {
     "q": "How would you flatten the following?",
     "l": "I",
     "a": "Recursively walk the nested hash and join the key path for each leaf. Preserve array-valued leaves instead of flattening them accidentally.",
     "e": "Joining paths with underscores is ambiguous if original keys contain underscores, so specify an escaping rule or keep path arrays for reversible flattening. Detect collisions rather than silently replacing values. Unflattening requires a defined conflict policy for a value at both a and a_b.",
     "x": [
      "def flatten_hash(hash, prefix = [], out = {})\n  hash.each do |key, value|\n    parts = prefix + [key.to_s]\n    if value.is_a?(Hash)\n      flatten_hash(value, parts, out)\n    else\n      joined = parts.join(\"_\").to_sym\n      raise ArgumentError, \"key collision\" if out.key?(joined)\n      out[joined] = value\n    end\n  end\n  out\nend\nflatten_hash({a: {b: {c: 42, d: \"foo\"}, d: \"bar\"}, e: \"baz\"})\n# {:a_b_c=>42, :a_b_d=>\"foo\", :a_d=>\"bar\", :e=>\"baz\"}"
     ],
     "p": [
      "For a reversible alternative, represent paths as arrays of keys rather than concatenated strings."
     ]
    },
    {
     "q": "Compute the nth Fibonacci Number",
     "l": "I",
     "a": "Carry the previous two Fibonacci numbers iteratively.",
     "e": "Define F(0)=0 and F(1)=1; reject negative or noninteger inputs. This uses O(n) arithmetic steps and O(1) live integer references, avoiding exponential recursive recomputation. Actual bit complexity and integer storage grow with n.",
     "x": [
      "# 1. F(0) = 0, F(1) = 1; n must be a nonnegative Integer.\ndef fibonacci(n)\n  raise ArgumentError unless n.is_a?(Integer) && n >= 0\n  a, b = 0, 1\n  n.times { a, b = b, a + b }\n  a\nend\n\n# Example usage:\np fibonacci(10) # 55"
     ],
     "p": [
      "A memoized recursive solution still uses O(n) stack depth; iteration avoids that stack."
     ]
    },
    {
     "q": "How can you implement memoization in Ruby to optimize recursive functions?",
     "l": "I",
     "a": "Cache results by input and reuse them before recurring. Memoization turns overlapping recursive subproblems into one calculation each, at a memory cost.",
     "e": "Memoization is a technique used to optimize recursive functions by caching their results for specific inputs. This prevents redundant calculations for the same input values. In Ruby, you can implement memoization by:\n\nCreating a hash to store computed results. Checking the hash before performing calculations. Storing calculated values for future reference. This technique is particularly effective for recursive functions with overlapping subproblems.",
     "x": [
      "def fib(n, memo = {0 => 0, 1 => 1})\n  raise ArgumentError if n < 0\n  memo[n] = fib(n-1, memo) + fib(n-2, memo) unless memo.key?(n)\n  memo[n]\nend\np fib(10) # 55"
     ],
     "p": [
      "Use key? if false/nil are valid cached results. Deep recursion can still exhaust the stack."
     ]
    },
    {
     "q": "Build an array based on the following scenario.",
     "l": "I",
     "a": "With the stated aN/bN/cN key convention, use map and dig with the position-derived keys to obtain the nested values.",
     "e": "Do not infer meaning from a hash’s last inserted key when the schema names are known. Confirm whether keys are symbols or strings and whether keys may be missing; dig returns nil for a missing path but can raise if an intermediate value does not support dig. The input guarantee matters more than a short flatten/to_a trick.",
     "x": [
      "input = [{a1: 42, b1: {c1: \"foo\"}}, {a2: 43, b2: {c2: \"bar\"}}, {a3: 44, b3: {c3: \"baz\"}}]\nvalues = input.each_with_index.map do |row, index|\n  n = index + 1\n  row.dig(\"b#{n}\".to_sym, \"c#{n}\".to_sym)\nend\nvalues # [\"foo\", \"bar\", \"baz\"]"
     ]
    },
    {
     "q": "Code-related: Implement a Ruby method that takes an array of integers as input and returns a new array containing only the unique elements, removing any duplicates.",
     "l": "I",
     "a": "Array#uniq returns a new array with duplicates removed, keeping the first occurrence of each eql?/hash-equivalent value.",
     "e": "In this code, the unique_elements method uses the uniq method to remove duplicates from the input array and return a new array containing only the unique elements.",
     "x": [
      "def unique_elements(values); values.uniq; end\np unique_elements([1, 2, 3, 2, 4])"
     ],
     "p": [
      "Typical hash-backed time O(n), space O(n). Define equality for custom values; uniq! mutates."
     ]
    },
    {
     "q": "Given an array [1,2,34,5,6,7,8,9], sum it up using a method:",
     "l": "I",
     "a": "Use Array#sum, or inject with an explicit zero accumulator; the supplied array sums to 72.",
     "e": "sum is the clearest numeric API. inject(0, :+) also returns zero for empty input, unlike inject(:+), which returns nil. Decide whether elements must all be numeric and whether exact Integer/Rational/BigDecimal arithmetic is required.",
     "x": [
      "def sum_numbers(array)\n  array.sum\nend\nsum_numbers([1, 2, 34, 5, 6, 7, 8, 9]) # 72\nsum_numbers([]) # 0"
     ]
    },
    {
     "q": "Given an array, write a method that returns an array of duplicate values.",
     "l": "I",
     "a": "Count frequencies once, then return each value whose frequency exceeds one.",
     "e": "Ruby tally expresses an expected O(n)-time, O(k)-space approach for k distinct values, preserving first-key insertion order in the resulting Hash.",
     "x": [
      "def find_duplicates(array)\n  array.tally.select { |_, count| count > 1 }.keys\nend\np find_duplicates([1, 2, 3, 1, 2, 4]) # [1, 2]"
     ],
     "p": [
      "Custom objects use hash/eql? for Hash identity."
     ]
    },
    {
     "q": "Write a function that sorts the keys in a hash by the length of the key as a string. For instance, the hash: should result in:",
     "l": "I",
     "a": "Convert each key to a string, then sort by its string length; this returns strings rather than the original key objects.",
     "e": "As is always true in programming, there are in fact multiple ways to accomplish this. The most straightforward answer would be of the form:\n\n\n\n```ruby\nhsh.keys.map(&:to_s).sort_by(&:length)\n\n```\n\n\nor:\n\n\n\n```ruby\nhsh.keys.collect(&:to_s).sort_by { |key| key.length }\n\n```\n\n\nAlternatively, Ruby’s `Enumerable` mixin provides many methods to operate on collections. The key here is to turn the hash keys into a collection, convert them all to strings, then sort the array. ```ruby\ndef key_sort hsh\n\thsh.keys.collect(&:to_s).sort { |a, b| a.length <=> b.length }\nend\n\n```\n\n\nAn equivalent call of the `collect` method is done with the usual block syntax of:\n\n\n\n```ruby\ncollect { |x| x.to_s }\n\n```",
     "x": [
      "{ abc: 'hello', 'another_key' => 123, 4567 => 'third' }",
      "h = {abc: \"hello\", \"another_key\" => 123, 4567 => \"third\"}\np h.keys.map(&:to_s).sort_by(&:length)"
     ],
     "p": [
      "If equal-length ordering matters, specify an explicit tie-breaker; sorting need not preserve every tie order."
     ]
    },
    {
     "q": "Write a single line of Ruby code that prints the Fibonacci sequence of any length as an array?",
     "l": "I",
     "a": "Build the requested number of Fibonacci values while carrying the latest pair, and print the resulting array.",
     "e": "Define F(0)=0, F(1)=1 and a nonnegative requested length. The example handles zero length correctly and runs in O(n) arithmetic steps plus O(n) output space.",
     "x": [
      "n = 20; p Array.new(n).each_with_object([0, 1]) { |_, fib| fib << fib[-1] + fib[-2] }.first(n)",
      "n = 10\np (0...n).reduce([]) { |fib, _| fib << (fib.length < 2 ? fib.length : fib[-1] + fib[-2]) }"
     ],
     "p": [
      "Integer arithmetic cost grows with very large Fibonacci values."
     ],
     "s": [
      "Write a single line of Ruby code that prints the Fibonacci sequence of any length as an array. (Hint: use `inject`/`reduce`)"
     ]
    },
    {
     "q": "Write code that splits a given array of integers into two arrays; the first containing odd numbers and second containing even numbers.",
     "l": "I",
     "a": "Use partition(&:odd?) to return the odd elements and the even elements in one traversal.",
     "e": "partition returns two arrays preserving encounter order. The first contains elements for which the block is truthy; the second contains the rest. This uses O(n) time and O(n) result storage.",
     "x": [
      "array = [1, 2, 3, 4, 5]\nodds, evens = array.partition(&:odd?)\nodds # [1, 3, 5]\nevens # [2, 4]"
     ]
    },
    {
     "q": "Implement a Ruby method that finds the most frequent element in an array.",
     "l": "A",
     "a": "Count frequencies in a Hash, then return every key tied for the greatest frequency, defining empty-input and tie behavior explicitly.",
     "e": "Empty input returns []; O(n) expected time and O(k) space.",
     "x": [
      "def most_frequent_elements(values)\n  counts = values.tally\n  max = counts.values.max\n  counts.select { |_, count| count == max }.keys\nend\np most_frequent_elements([1,2,2,3,3]) # [2,3]"
     ]
    },
    {
     "q": "Write a Ruby method that takes an array of integers as input and returns a new array containing only the prime numbers.",
     "l": "A",
     "a": "Select integers greater than one whose divisors from 2 through floor(sqrt(n)) contain no exact factor.",
     "e": "Integer.sqrt avoids floating-point bound errors for large integers. Trial division costs O(sqrt(n)) per candidate and is not suited to huge primality testing.",
     "x": [
      "def prime?(n)\n  return false unless n.is_a?(Integer) && n >= 2\n  (2..Integer.sqrt(n)).none? { |d| n % d == 0 }\nend\ndef prime_numbers(values); values.select { |n| prime?(n) }; end\np prime_numbers([1,2,3,4,5,6,7,8,9,10]) # [2,3,5,7]"
     ],
     "p": [
      "Integer.sqrt avoids floating-point bound errors for large integers. Trial division costs O(sqrt(n)) per candidate and is not suited to huge primality testing."
     ]
    }
   ]
  ],
  [
   "Classes, modules and blocks",
   [
    {
     "q": "What will be the output of the following code snippet?",
     "l": "B",
     "a": "The two lines printed are “Hello, Rails!” and “Hello, World!”.",
     "e": "Calling hello(\"Rails\") supplies the explicit argument. Calling hello without an argument uses its default parameter. The final string expression is the method’s return value and puts writes it to standard output.",
     "x": [
      "def hello(name = \"World\")\n  \"Hello, #{name}!\"\nend\nputs hello(\"Rails\")\nputs hello\n# Hello, Rails!\n# Hello, World!"
     ]
    },
    {
     "q": "Write a Ruby class representing a basic bank account. It should have methods to deposit, withdraw, and check the balance.",
     "l": "B",
     "a": "Store a balance and expose deposit, withdraw and balance operations; validate positive amounts and reject insufficient funds.",
     "e": "Use integer minor currency units. This illustrative in-memory class does not solve database concurrency or multi-currency accounting.",
     "x": [
      "class BankAccount\n  attr_reader :balance\n  def initialize; @balance = 0; end\n  def deposit(cents)\n    raise ArgumentError unless cents.is_a?(Integer) && cents > 0\n    @balance += cents\n  end\n  def withdraw(cents)\n    raise ArgumentError unless cents.is_a?(Integer) && cents > 0\n    raise \"Insufficient funds\" if cents > @balance\n    @balance -= cents\n  end\nend"
     ],
     "p": [
      "Use integer minor currency units. This illustrative in-memory class does not solve database concurrency or multi-currency accounting."
     ]
    },
    {
     "q": "Create a Ruby module called Helper with a method that calculates the square of a number. Then, implement a class Calculator that includes the Helper module and uses the square method to calculate the square of a given number.",
     "l": "B",
     "a": "Define square as a module instance method and include that module in Calculator so calculator instances can call it.",
     "x": [
      "module Helper\n  def square(n); n * n; end\nend\nclass Calculator; include Helper; end\np Calculator.new.square(5) # 25"
     ]
    },
    {
     "q": "Find and fix the bug within the code below?",
     "l": "I",
     "a": "Use self.address = a to invoke address=, or assign an intentionally normalized value to @address.",
     "e": "An unqualified address = a is parsed as local-variable assignment and does not call an accessor. Choosing @address = a bypasses any writer normalization or validation, so it is equivalent only when that is intended. The missing clean method cannot be assumed to exist.",
     "x": [
      "class User\n  attr_reader :address\n  def address=(value)\n    @address = value.strip\n  end\n  def initialize(value)\n    self.address = value\n  end\nend\np User.new(\" Asha \").address # \"Asha\""
     ]
    },
    {
     "q": "Write a code that prints the value of x, the sum of x and y and the average of x, y, and z in Ruby?",
     "l": "I",
     "a": "For x=12, y=36, z=72, the printed values are 12, 48 and 40.",
     "e": "Ruby interpolates expressions within double-quoted strings. Integer division truncates for integer operands; the given average happens to be integral. Use 3.0 or fdiv(3) when a fractional mean is required.",
     "x": [
      "x, y, z = 12, 36, 72\nputs x\nputs x + y\nputs (x + y + z).fdiv(3) # 40.0",
      "x, y, z = 12, 36, 72\nputs \"The value of x is #{x}.\"\nputs \"The sum of x and y is #{x + y}.\"\nputs \"The average was #{(x + y + z) / 3}.\""
     ],
     "s": [
      "What will be the output of the given code snippet?"
     ]
    },
    {
     "q": "How can you implement custom iterators in Ruby?",
     "l": "I",
     "a": "Define each to yield elements, return enum_for when no block is supplied, and include Enumerable to gain collection operations.",
     "e": "You can implement custom iterators in Ruby by defining a method that accepts a block and then using the yield keyword to invoke the block within the method. Typically, you would use a loop (like while, each, or for) to control the iteration and call yield to pass each item to the block. By defining the iteration logic within your method and allowing consumers to provide their behavior via a block, you create a powerful way to iterate over collections and perform custom actions.",
     "x": [
      "class Pair\n  include Enumerable\n  def each\n    return enum_for(__method__) unless block_given?\n    yield 1; yield 2\n    self\n  end\nend\np Pair.new.map { |n| n * 2 }"
     ]
    },
    {
     "q": "Create a Ruby class called Person with attributes name and age. Implement a custom setter method for the age attribute that restricts the age to be within a specific range (e.g., 0 to 120).",
     "l": "I",
     "a": "Use an age= setter to validate or clamp incoming values, and call self.age= from initialize so the setter runs.",
     "e": "In this code, the Person class has attributes name (read-only) and age (read-write). We define a custom setter method age= for the age attribute, using the clamp method to restrict the age within the range of 0 to 120.",
     "x": [
      "class Person\n  attr_reader :name, :age\n  def initialize(name, age); @name = name; self.age = age; end\n  def age=(value)\n    raise ArgumentError unless value.is_a?(Integer)\n    @age = value.clamp(0, 120)\n  end\nend\np Person.new(\"John\", 150).age # 120"
     ],
     "p": [
      "Clamping is a chosen policy; an application may prefer to reject invalid age. Validate type before clamp."
     ]
    },
    {
     "q": "Give the output of the stated class implementation:",
     "l": "I",
     "a": "Called independently: talk prints “I’m talking”; whisper raises NoMethodError; send(:talk) prints the public message; send(:whisper) invokes the private method and prints its message.",
     "e": "send bypasses ordinary method visibility; public_send respects it. If the four statements run sequentially without rescuing the second statement, execution stops at that exception and the later sends do not run. This is not a security sandbox, and an instance is not a “class object”.",
     "x": [
      "class Human\n  def talk = puts(\"I’m talking\")\n  private\n  def whisper = puts(\"I’m whispering\")\nend\nh = Human.new\nh.talk\nbegin\n  h.whisper\nrescue NoMethodError\n  puts \"private call rejected\"\nend\nh.send(:talk)\nh.send(:whisper)"
     ]
    },
    {
     "q": "Implement a Ruby class that represents a geometric shape. The class should have a method to calculate the area of the shape.",
     "l": "I",
     "a": "Define a shared area interface and implement the calculation in each shape; Ruby uses conventions rather than an abstract keyword.",
     "e": "In this code, we define an abstract GeometricShape class with a method calculate_area, which raises a NotImplementedError. This makes it an abstract method, requiring subclasses to implement it. The Rectangle and Circle classes are subclasses that inherit from GeometricShape and implement the calculate_area method accordingly.",
     "x": [
      "class Rectangle\n  def initialize(width, height); @width, @height = width, height; end\n  def area; @width * @height; end\nend\nclass Circle\n  def initialize(radius); @radius = radius; end\n  def area; Math::PI * @radius**2; end\nend\np [Rectangle.new(5,3).area, Circle.new(4).area]"
     ],
     "p": [
      "Validate dimensions and numeric types for production use. NotImplementedError is outside StandardError and is not a mandatory abstract-method convention."
     ]
    },
    {
     "q": "Create a Ruby module called MathHelper that provides methods for calculating the factorial and the square root of a number. Implement a class Calculator that includes the MathHelper module and uses its methods to perform calculations.",
     "l": "I",
     "a": "Provide factorial and square_root as module methods included by Calculator. Validate factorial’s nonnegative integer domain and avoid unnecessary recursive stack growth.",
     "e": "0! is 1. Math.sqrt of a negative real raises Math::DomainError unless you deliberately use complex arithmetic.",
     "x": [
      "module MathHelper\n  def factorial(n)\n    raise ArgumentError unless n.is_a?(Integer) && n >= 0\n    (1..n).reduce(1, :*)\n  end\n  def square_root(n); Math.sqrt(n); end\nend\nclass Calculator; include MathHelper; end\np Calculator.new.factorial(5)"
     ],
     "p": [
      "0! is 1. Math.sqrt of a negative real raises Math::DomainError unless you deliberately use complex arithmetic."
     ]
    },
    {
     "q": "Find and correct the error in the following Ruby code.",
     "l": "A",
     "a": "user.name = \"Bob\" fails because attr_reader defines only name, not name=. Add attr_writer or use attr_accessor if mutation is part of the class contract.",
     "e": "A reader method can expose state while keeping writes private to the object. If public renaming is intended, explicitly expose a writer; if the object should be immutable, remove the attempted assignment.",
     "x": [
      "class User\n  attr_accessor :name\n  def initialize(name) = @name = name\nend\nuser = User.new(\"Alice\")\nuser.name = \"Bob\""
     ],
     "p": [
      "Changing the accessor is a design decision, not merely a syntax repair."
     ]
    },
    {
     "q": "Write a Ruby method that takes a block and executes it only if the block is given.",
     "l": "A",
     "a": "Call yield only when block_given? is true; otherwise return a defined fallback.",
     "e": "In this code, the execute_block_if_given method uses the block_given? method to check if a block is provided. If a block is given, the method uses yield to execute the block.",
     "x": [
      "def execute_block_if_given\n  return \"No block given.\" unless block_given?\n  yield\nend\np execute_block_if_given { \"Block is executed!\" }"
     ]
    }
   ]
  ],
  [
   "Algorithm problems",
   [
    {
     "q": "Apple Stocks",
     "l": "I",
     "a": "Scan prices once, tracking the minimum earlier price and the best sale profit seen so far.",
     "e": "Compute a candidate sale before updating the minimum so buying and selling at the same timestamp is not used. O(n) time and O(1) extra numeric state. If one trade is mandatory, a falling series yields a negative result; if no trade is allowed, clamp the answer to zero as a separate policy.",
     "x": [
      "# 37. One buy before one sell is required, even if every return is negative.\ndef maximum_stock_profit(prices)\n  raise ArgumentError, 'at least two prices required' if prices.length < 2\n  minimum, best = prices[0], prices[1] - prices[0]\n  prices.each_with_index do |price, index|\n    next if index.zero?\n    best = [best, price - minimum].max\n    minimum = [minimum, price].min\n  end\n  best\nend\n\n# Example usage:\np maximum_stock_profit([10, 7, 5, 8, 11, 9]) # 6"
     ],
     "p": [
      "At least two time-ordered prices are required."
     ]
    },
    {
     "q": "Find in Ordered Set",
     "l": "I",
     "a": "Use binary search on a sorted array, halving the candidate interval each step.",
     "e": "Compare the midpoint with the target, discard the impossible half and stop when found or the interval is empty. O(log n) comparisons and O(1) space assume random indexed access and a sorted collection under the same comparison rule.",
     "x": [
      "# 11. Sorted ascending comparable values.\ndef binary_include?(array, target)\n  low, high = 0, array.length - 1\n  while low <= high\n    mid = (low + high) / 2\n    return true if array[mid] == target\n    array[mid] < target ? low = mid + 1 : high = mid - 1\n  end\n  false\nend\n\n# Example usage:\np binary_include?([1, 3, 5, 7], 5) # true"
     ],
     "p": [
      "A linked list does not give constant-time midpoint access."
     ]
    },
    {
     "q": "Inflight Entertainment",
     "l": "I",
     "a": "Scan movie lengths with a hash set of prior lengths, testing the complementary duration before inserting the current one.",
     "e": "Checking before insertion ensures the same movie instance is not reused. Two distinct movies of equal duration are allowed when two entries exist. Expected O(n) time and O(n) memory.",
     "x": [
      "# 13. Distinct movie indices; one movie may not be reused.\ndef movie_pair?(lengths, flight)\n  seen = {}\n  lengths.each do |length|\n    return true if seen.key?(flight - length)\n    seen[length] = true\n  end\n  false\nend\n\n# Example usage:\np movie_pair?([60, 90, 120], 180) # true"
     ],
     "p": [
      "Clarify whether durations must match exactly and whether trailers or buffers count."
     ]
    },
    {
     "q": "Making Change",
     "l": "I",
     "a": "Use dynamic programming, processing denominations outside amounts to count unordered combinations.",
     "e": "Start ways[0]=1. For each unique positive coin, add ways[amount-coin] into ways[amount] for increasing amounts. Coin-first iteration avoids counting the same combination in different orders. Complexity is O(amount × denomination_count) time and O(amount) space.",
     "x": [
      "# 3. Unordered combinations; unlimited copies of positive integer denominations.\ndef change_ways(amount, coins)\n  raise ArgumentError unless amount.is_a?(Integer) && amount >= 0\n  raise ArgumentError unless coins.all? { |c| c.is_a?(Integer) && c.positive? }\n  ways = Array.new(amount + 1, 0)\n  ways[0] = 1\n  coins.uniq.each do |coin|\n    coin.upto(amount) { |sum| ways[sum] += ways[sum - coin] }\n  end\n  ways[amount]\nend\n\n# Example usage:\np change_ways(4, [1, 2, 3]) # 4"
     ],
     "p": [
      "Zero and negative denominations are invalid; duplicate denominations must not multiply counts."
     ]
    },
    {
     "q": "Product of All Other Numbers",
     "l": "I",
     "a": "Multiply prefix products into an output array, then multiply suffix products in a reverse pass.",
     "e": "For each index the prefix omits that element and everything to its right; the suffix omits that element and everything to its left. O(n) arithmetic operations, O(n) output space and O(1) extra state. Zeros and negative values work without division or special-case arithmetic.",
     "x": [
      "# 38. Output array plus O(1) extra state; no division, handles zeros.\ndef products_except_self(numbers)\n  result = Array.new(numbers.length, 1)\n  prefix = 1\n  numbers.each_with_index { |number, i| result[i] = prefix; prefix *= number }\n  suffix = 1\n  (numbers.length - 1).downto(0) { |i| result[i] *= suffix; suffix *= numbers[i] }\n  result\nend\n\n# Example usage:\np products_except_self([1, 2, 3, 4]) # [24, 12, 8, 6]"
     ],
     "p": [
      "Clarify what an empty input and a single-element input should mean; this variant returns [] and [1]."
     ]
    },
    {
     "q": "The Stolen Breakfast Drone",
     "l": "I",
     "a": "XOR all integer IDs; pairs cancel and leave the ID that occurs once.",
     "e": "This relies on every other ID appearing exactly twice and the special ID exactly once. XOR is associative, commutative and x ^ x = 0. O(n) operations and constant extra machine-word storage for bounded IDs; arbitrary-width integer arithmetic has its own bit costs.",
     "x": [
      "# 16. Integer IDs, every other ID occurs exactly twice.\ndef unique_id(ids)\n  ids.reduce(0, :^)\nend\n\n# Example usage:\np unique_id([4, 2, 4, 7, 2]) # 7"
     ],
     "p": [
      "This does not solve arbitrary frequency anomalies without additional assumptions."
     ]
    },
    {
     "q": "Cafe Order Checker",
     "l": "A",
     "a": "Walk the served sequence while advancing the head pointer of whichever source queue matches each order.",
     "e": "With globally unique order IDs, each served order must match the next unserved takeout or dine-in order. Reject length mismatches and leftovers. O(n) time and O(1) auxiliary state. If IDs can repeat across streams, the greedy choice can become ambiguous and needs stronger identity or a different algorithm.",
     "x": [
      "# 30. Orders have distinct IDs, are partitioned into two given streams.\ndef first_come_first_served?(takeout, dinein, served)\n  return false unless served.length == takeout.length + dinein.length\n  i = j = 0\n  served.each do |order|\n    if i < takeout.length && order == takeout[i]\n      i += 1\n    elsif j < dinein.length && order == dinein[j]\n      j += 1\n    else\n      return false\n    end\n  end\n  i == takeout.length && j == dinein.length\nend\n\n# Example usage:\np first_come_first_served?([1, 3], [2, 4], [1, 2, 3, 4]) # true"
     ],
     "p": [
      "The merged sequence may interleave streams but must preserve each stream’s internal order."
     ]
    },
    {
     "q": "Find Repeat, Space Edition",
     "l": "A",
     "a": "Under the bounded-domain variant, binary-search the value range and count how many values fall in each half.",
     "e": "For n+1 values in 1..n, the pigeonhole principle guarantees a duplicate. If at most mid values can fit in the lower range but more than mid appear there, that range contains a duplicate. O(n log n) time and O(1) extra state, without modifying the input.",
     "x": [
      "# 34. n+1 values in 1..n with at least one duplicate; no mutation, O(n log n).\ndef duplicate_low_space(numbers)\n  low, high = 1, numbers.length - 1\n  while low < high\n    mid = (low + high) / 2\n    count = numbers.count { |number| number <= mid }\n    count > mid ? high = mid : low = mid + 1\n  end\n  low\nend\n\n# Example usage:\np duplicate_low_space([1, 3, 4, 2, 2]) # 2"
     ]
    },
    {
     "q": "Find Repeat, Space Edition BEAST MODE",
     "l": "A",
     "a": "Interpret the bounded-domain array as pointers and use Floyd’s cycle detection to find the duplicate entry value.",
     "e": "For n+1 elements containing values in 1..n, following indices eventually enters a cycle. One phase finds a meeting point; restarting one pointer at the path’s beginning and moving both one step finds the cycle entrance. O(n) time, O(1) space and no mutation under the stated standard assumptions.",
     "x": [
      "# 35. Same bounded-domain assumptions; Floyd's cycle algorithm, O(n), O(1).\ndef duplicate_floyd(numbers)\n  slow = fast = numbers[0]\n  loop do\n    slow = numbers[slow]\n    fast = numbers[numbers[fast]]\n    break if slow == fast\n  end\n  slow = numbers[0]\n  until slow == fast\n    slow, fast = numbers[slow], numbers[fast]\n  end\n  slow\nend\n\n# Example usage:\np duplicate_floyd([1, 3, 4, 2, 2]) # 2"
     ],
     "p": [
      "This is not a solution to an arbitrary unconstrained array duplicate problem."
     ]
    },
    {
     "q": "Find Rotation Point",
     "l": "A",
     "a": "Binary-search for the smallest element by comparing a midpoint with the right endpoint.",
     "e": "Distinct sorted values permit O(log n) time. Duplicates can make halves indistinguishable and degrade worst-case runtime to O(n). Return nil for an empty array; the shown variant returns an index of a minimum.",
     "x": [
      "# 12. Rotated sorted distinct values: O(log n). Duplicates may force O(n).\ndef rotation_index(array)\n  return nil if array.empty?\n  low, high = 0, array.length - 1\n  while low < high\n    mid = (low + high) / 2\n    if array[mid] > array[high]\n      low = mid + 1\n    elsif array[mid] < array[high]\n      high = mid\n    else\n      high -= 1\n    end\n  end\n  low\nend\n\n# Example usage:\np rotation_index([4, 5, 6, 1, 2, 3]) # 3"
     ],
     "p": [
      "When duplicate minima straddle the rotation, define whether any minimum index or a specific boundary is wanted."
     ]
    },
    {
     "q": "Highest Product of 3",
     "l": "A",
     "a": "Track the three largest numbers and the two smallest numbers, then compare the relevant products.",
     "e": "The maximum is either the product of the three largest or the largest times the two most negative. Maintaining fixed-size candidate arrays keeps O(n) time and O(1) extra space; sorting the entire input would cost O(n log n). Require at least three numbers.",
     "x": [
      "# 39. Track three largest and two smallest values; negatives can win.\ndef highest_product_three(numbers)\n  raise ArgumentError if numbers.length < 3\n  largest, smallest = [], []\n  numbers.each do |number|\n    largest = (largest + [number]).sort.last(3)\n    smallest = (smallest + [number]).sort.first(2)\n  end\n  [largest.inject(:*), largest.last * smallest.inject(:*)].max\nend\n\n# Example usage:\np highest_product_three([-10, -10, 1, 3, 2]) # 300"
     ],
     "p": [
      "Choosing only the largest positive numbers fails when two negatives produce a larger positive product."
     ]
    },
    {
     "q": "In-Place Shuffle",
     "l": "A",
     "a": "Use Fisher–Yates: for each index from the end downward, swap with a uniformly selected index from zero through that index.",
     "e": "This yields every permutation with probability 1/n! when the RNG is uniform. O(n) swaps and O(1) extra storage. Shuffling by sorting random keys or repeatedly selecting any full-array index does not give the same guarantees.",
     "x": [
      "# 29. Fisher-Yates; RNG must produce uniform integers in 0...bound.\ndef shuffle!(array, random = Random.new)\n  (array.length - 1).downto(1) do |index|\n    other = random.rand(index + 1)\n    array[index], array[other] = array[other], array[index]\n  end\n  array\nend\n\n# Example usage:\np shuffle!([1, 2, 3, 4], Random.new(123))"
     ],
     "p": [
      "Use a cryptographically appropriate random source when unpredictability is a security requirement."
     ]
    },
    {
     "q": "Merging Meeting Times",
     "l": "A",
     "a": "Sort intervals by start time, then sweep and extend the current merged interval while overlaps continue.",
     "e": "O(n log n) sorting dominates; scanning is O(n). The example merges touching intervals as well as overlapping ones and preserves the original input ranges by writing new output pairs. Decide whether meetings are half-open and whether adjacent meetings should merge.",
     "x": [
      "# 40. Half-open intervals; this variant also merges touching intervals.\ndef merge_meetings(intervals)\n  raise ArgumentError unless intervals.all? { |start, finish| start <= finish }\n  intervals.sort_by(&:first).each_with_object([]) do |(start, finish), merged|\n    if merged.empty? || start > merged.last[1]\n      merged << [start, finish]\n    else\n      merged.last[1] = [merged.last[1], finish].max\n    end\n  end\nend\n\n# Example usage:\np merge_meetings([[0, 1], [3, 5], [4, 8], [8, 9]]) # [[0, 1], [3, 9]]"
     ],
     "p": [
      "Validate start <= end and define zero-length meeting behavior."
     ]
    },
    {
     "q": "MillionGazillion",
     "l": "A",
     "a": "Choose a structure according to the query: a hash set for exact membership or a trie for prefix operations and shared-prefix storage.",
     "e": "A trie stores one edge per character, marks word endings, and supports O(L) lookup for a word of L characters. For full-text ranked search, an inverted index, tokenization, document IDs and ranking are additional requirements. Trie overhead can exceed a hash set despite prefix sharing.",
     "x": [
      "# 10. A trie is one possible exact-membership structure, not a full search engine.\ndef trie_insert(trie, word)\n  node = trie\n  word.each_char { |char| node = (node[char] ||= {}) }\n  node[:terminal] = true\nend\ndef trie_include?(trie, word)\n  node = trie\n  word.each_char do |char|\n    node = node[char]\n    return false unless node\n  end\n  node[:terminal] == true\nend\n\n# Example usage:\ntrie = {}\ntrie_insert(trie, \"ruby\")\np trie_include?(trie, \"ruby\") # true\np trie_include?(trie, \"rub\") # false"
     ],
     "p": [
      "This is an explicitly scoped membership example, not a complete search-engine architecture."
     ]
    },
    {
     "q": "Rectangular Love",
     "l": "A",
     "a": "Intersect the rectangles independently on the x and y axes and multiply the nonnegative overlap lengths.",
     "e": "Use max(left edges) and min(right edges), likewise for top/bottom. Clamp negative overlap to zero. This assumes axis-aligned rectangles and nonnegative width/height; rotated rectangles need polygon geometry. Complexity is O(1).",
     "x": [
      "# 5. Rectangles use x, y, width, height; dimensions must be nonnegative.\ndef overlap_area(a, b)\n  [a, b].each { |r| raise ArgumentError if r[:width] < 0 || r[:height] < 0 }\n  width = [[a[:x] + a[:width], b[:x] + b[:width]].min - [a[:x], b[:x]].max, 0].max\n  height = [[a[:y] + a[:height], b[:y] + b[:height]].min - [a[:y], b[:y]].max, 0].max\n  width * height\nend\n\n# Example usage:\np overlap_area({x:0,y:0,width:3,height:3}, {x:2,y:1,width:3,height:3}) # 2"
     ],
     "p": [
      "Touching edges yield zero area; decide whether an API should also return the overlap rectangle."
     ]
    },
    {
     "q": "Simulate 5-sided die",
     "l": "A",
     "a": "Roll the fair seven-sided die until a result in 1..5 appears, then return it.",
     "e": "Rejection sampling removes outcomes 6 and 7. Each accepted value has equal probability; the expected number of rolls is 7/5. Runtime has no finite worst-case roll bound, though termination occurs with probability one for independent fair rolls.",
     "x": [
      "# 31. die7.call returns a uniform integer in 1..7.\ndef five_from_seven(die7)\n  loop do\n    value = die7.call\n    return value if value <= 5\n  end\nend\n\n# Example usage:\np five_from_seven(-> { rand(1..7) })"
     ],
     "p": [
      "Taking die7 % 5 biases some outcomes."
     ]
    },
    {
     "q": "Simulate 7-sided die",
     "l": "A",
     "a": "Use two fair five-sided rolls to generate 0..24, reject 21..24 and map 0..20 modulo seven.",
     "e": "The 25 pairs are equally likely. Accepting 21 of them gives exactly three pairs per seven-sided result. Expected die rolls are 2 × 25/21 = 50/21, with unbounded worst-case retries.",
     "x": [
      "# 32. Two die5 rolls make 0..24; reject 21..24, map remaining 21 evenly.\ndef seven_from_five(die5)\n  loop do\n    value = (die5.call - 1) * 5 + die5.call - 1\n    return value % 7 + 1 if value < 21\n  end\nend\n\n# Example usage:\np seven_from_five(-> { rand(1..5) })"
     ],
     "p": [
      "A modulo operation is unbiased only after the input range is a multiple of seven."
     ]
    },
    {
     "q": "Temperature Tracker",
     "l": "A",
     "a": "Maintain min, max, count, sum and frequency counts as temperatures arrive.",
     "e": "Each insertion updates min/max, sum/count for mean, and a histogram for mode. Operations are expected O(1), with O(k) memory for k distinct temperatures; a fixed bounded integer range gives fixed-size storage. Define tie handling and empty queries.",
     "x": [
      "# 6. Arbitrary comparable numeric input; ties choose the earliest mode to lead.\nclass TemperatureTracker\n  attr_reader :min, :max, :mode\n  def initialize\n    @count, @sum, @mode_count = 0, 0, 0\n    @counts = Hash.new(0)\n  end\n  def insert(value)\n    @count += 1\n    @sum += value\n    @min = value if @min.nil? || value < @min\n    @max = value if @max.nil? || value > @max\n    @counts[value] += 1\n    if @counts[value] > @mode_count\n      @mode, @mode_count = value, @counts[value]\n    end\n    self\n  end\n  def mean\n    return nil if @count.zero?\n    @sum.fdiv(@count)\n  end\nend\n\n# Shared tree shape: nodes expose value, left and right.\n\n# Example usage:\ntracker = TemperatureTracker.new\n[10, 20, 20].each { |t| tracker.insert(t) }\np [tracker.min, tracker.max, tracker.mean, tracker.mode] # [10, 20, 16.666..., 20]"
     ],
     "p": [
      "Use a numerically stable running mean if accumulating large floating-point values; a mode may have ties."
     ]
    },
    {
     "q": "The Cake Thief",
     "l": "A",
     "a": "Use unbounded-knapsack dynamic programming over bag capacity.",
     "e": "For each capacity, try every positive-weight cake whose weight fits and reuse the best smaller-capacity value. O(capacity × cake_types) time and O(capacity) space. A zero-weight positive-value cake makes the optimum unbounded; zero-weight nonpositive cakes can be ignored.",
     "x": [
      "# 14. Cakes are [integer_weight, value]; weights >= 0, capacity integer >= 0.\ndef cake_value(cakes, capacity)\n  raise ArgumentError unless capacity.is_a?(Integer) && capacity >= 0\n  raise ArgumentError unless cakes.all? { |w, _| w.is_a?(Integer) && w >= 0 }\n  return Float::INFINITY if cakes.any? { |weight, value| weight.zero? && value.positive? }\n  useful = cakes.select { |weight, _| weight.positive? }\n  best = Array.new(capacity + 1, 0)\n  1.upto(capacity) do |space|\n    useful.each do |weight, value|\n      best[space] = [best[space], best[space - weight] + value].max if weight <= space\n    end\n  end\n  best[capacity]\nend\n\n# Example usage:\np cake_value([[3, 40], [5, 70]], 10) # 140"
     ],
     "p": [
      "Greedy value-per-weight is not generally correct for indivisible cakes."
     ]
    },
    {
     "q": "Top Scores",
     "l": "A",
     "a": "Use counting sort when each score is an integer in a known bounded range.",
     "e": "Count each score, then emit the required number in order. O(n + maximum_score) time and O(maximum_score) count memory plus output. It is inefficient when the score range is huge relative to the input.",
     "x": [
      "# 26. Integer scores in 0..maximum, returned in descending order.\ndef sort_scores(scores, maximum)\n  raise ArgumentError unless maximum.is_a?(Integer) && maximum >= 0\n  counts = Array.new(maximum + 1, 0)\n  scores.each do |score|\n    raise ArgumentError unless score.is_a?(Integer) && score.between?(0, maximum)\n    counts[score] += 1\n  end\n  maximum.downto(0).flat_map { |score| Array.new(counts[score], score) }\nend\n\n# Example usage:\np sort_scores([30, 10, 30, 20], 100) # [30, 30, 20, 10]"
     ],
     "p": [
      "Choose ascending or descending explicitly and reject out-of-range scores."
     ]
    },
    {
     "q": "Two Egg Problem",
     "l": "A",
     "a": "With two eggs and 100 floors, 14 drops suffice in the worst case.",
     "e": "Choose the smallest k satisfying k(k+1)/2 >= 100. Drop the first egg after gaps k, k-1, k-2 and so on; if it breaks, linearly test the previous gap with the second egg. The shrinking gap balances worst-case total drops. This assumes a monotonic break threshold, identical eggs, and that broken eggs cannot be reused.",
     "x": [
      "# 33. Two eggs: smallest k with k*(k+1)/2 >= floors.\ndef two_egg_worst_case(floors)\n  raise ArgumentError unless floors.is_a?(Integer) && floors >= 0\n  drops = 0\n  coverage = 0\n  while coverage < floors\n    drops += 1\n    coverage += drops\n  end\n  drops\nend\n\n# Example usage:\np two_egg_worst_case(100) # 14"
     ],
     "p": [
      "If the interview permits more eggs or different floor counts, the optimal recurrence changes."
     ]
    },
    {
     "q": "Which Appears Twice",
     "l": "A",
     "a": "For the standard 1..n plus one-extra variant, subtract the expected arithmetic-series sum from the actual sum.",
     "e": "This O(n)-time, O(1)-extra-state method is valid only when each 1..n occurs once and exactly one value occurs one additional time. A hash set works for a less constrained duplicate search at O(n) memory.",
     "x": [
      "# 27. Assumption: array contains 1..n once plus exactly one extra duplicate.\ndef one_duplicate_sum(numbers)\n  n = numbers.length - 1\n  numbers.sum - n * (n + 1) / 2\nend\n\n# Example usage:\np one_duplicate_sum([1, 2, 3, 2]) # 2"
     ],
     "p": [
      "Multiple duplicated/missing values invalidate the arithmetic trick."
     ]
    },
    {
     "q": "Find Duplicate Files",
     "l": "A",
     "a": "Group files by size, then hash only equal-sized candidates, then confirm byte equality before any removal decision.",
     "e": "Size filtering avoids hashing most unique files. Streaming hashes bound buffer memory; equal hashes are candidates, not a mathematical proof of equality. Define whether symlinks, hard links, names, modification times and concurrent writes matter. The example only detects candidates; it never deletes files or decides which is the original.",
     "x": [
      "# 36. Read-only candidate detection. Never automatically deletes files.\nrequire 'digest'\ndef duplicate_file_candidates(paths)\n  paths.select { |p| File.file?(p) && !File.symlink?(p) }\n       .group_by { |p| File.size(p) }\n       .values.select { |group| group.size > 1 }\n       .flat_map do |group|\n    group.group_by { |p| Digest::SHA256.file(p).hexdigest }.values.select { |same| same.size > 1 }\n  end\nend\n\n# Example usage:\np duplicate_file_candidates([\"a.txt\", \"b.txt\"])"
     ],
     "p": [
      "Treat disappearing/unreadable/changing files explicitly; user-selected retention is required for actual deletion."
     ]
    }
   ]
  ],
  [
   "Data structure problems",
   [
    {
     "q": "Does This Linked List Have A Cycle?",
     "l": "I",
     "a": "Use Floyd’s slow/fast pointer algorithm to detect a cycle in O(n) time and O(1) extra space.",
     "e": "Advance one pointer by one node and another by two. If they are identical a cycle exists; if the fast pointer reaches nil the list is acyclic. Compare node identity, not potentially overloaded value equality.",
     "x": [
      "# 2. Nodes respond to next. Identity comparison is deliberate.\ndef cyclic?(head)\n  slow = fast = head\n  while fast && fast.next\n    slow = slow.next\n    fast = fast.next.next\n    return true if slow.equal?(fast)\n  end\n  false\nend\n\n# Example usage:\np cyclic?(head)"
     ],
     "p": [
      "The input nodes must provide a next link; a nil head has no cycle."
     ]
    },
    {
     "q": "Minimum tree depth",
     "l": "I",
     "a": "For the standard binary-tree minimum-leaf-depth variant, breadth-first search returns the depth of the first leaf.",
     "e": "Count depth as one for the root in this illustration and zero for an empty tree. A node with just one child is not a leaf, so min(left_depth,right_depth)+1 needs special treatment for absent children.",
     "x": [
      "def minimum_depth(root)\n  return 0 unless root\n  queue = [[root, 1]]\n  index = 0\n  while index < queue.length\n    node, depth = queue[index]\n    index += 1\n    return depth unless node.left || node.right\n    queue << [node.left, depth + 1] if node.left\n    queue << [node.right, depth + 1] if node.right\n  end\nend"
     ],
     "p": [
      "O(n) time and O(n) queue storage for this straightforward implementation."
     ]
    },
    {
     "q": "Implement A Queue With Two Stacks",
     "l": "I",
     "a": "Use an incoming stack for pushes and an outgoing stack for removals, transferring only when outgoing is empty.",
     "e": "Each element moves between the stacks at most once before removal. Individual transfers can take O(n), but each queue operation is amortized O(1). An empty dequeue should have an explicitly defined result or exception.",
     "x": [
      "# 4. Amortized O(1) enqueue/dequeue; a transfer can take O(n).\nclass TwoStackQueue\n  def initialize\n    @incoming, @outgoing = [], []\n  end\n  def push(value)\n    @incoming.push(value)\n    self\n  end\n  def shift\n    if @outgoing.empty?\n      @outgoing << @incoming.pop until @incoming.empty?\n    end\n    raise IndexError, 'empty queue' if @outgoing.empty?\n    @outgoing.pop\n  end\nend\n\n# Example usage:\nqueue = TwoStackQueue.new\nqueue.push(1).push(2)\np queue.shift # 1"
     ],
     "p": [
      "Amortized constant time is not a worst-case latency guarantee."
     ]
    },
    {
     "q": "Delete Node",
     "l": "A",
     "a": "With only a non-tail node, copy its successor’s value and bypass the successor.",
     "e": "This changes the logical contents of the supplied node rather than physically deleting that exact object. A tail cannot be removed this way because its predecessor is unavailable. O(1) pointer work assumes values can be copied cheaply.",
     "x": [
      "# 17. Only a non-tail node is supplied; copies the next node's contents.\ndef delete_non_tail(node)\n  raise ArgumentError, 'tail cannot be deleted without predecessor' unless node&.next\n  node.value = node.next.value\n  node.next = node.next.next\nend\n\n# Example usage:\ndelete_non_tail(node)"
     ],
     "p": [
      "External references and node identity may make this technique inappropriate."
     ]
    },
    {
     "q": "2nd Largest Item in a Binary Search Tree",
     "l": "A",
     "a": "Walk to the rightmost node; the second largest is its parent unless that node has a left subtree, whose largest value is the answer.",
     "e": "The method assumes a valid strict BST containing at least two nodes. It follows the right spine and, when necessary, the maximum of the largest node’s left subtree. Time is O(h), constant auxiliary space.",
     "x": [
      "# 9. Strict BST with at least two nodes.\ndef second_largest(root)\n  raise ArgumentError unless root && (root.left || root.right)\n  node = root\n  loop do\n    if !node.right && node.left\n      node = node.left\n      node = node.right while node.right\n      return node.value\n    end\n    return node.value if node.right && !node.right.left && !node.right.right\n    node = node.right\n  end\nend\n\n# Example usage:\np second_largest(root)"
     ],
     "p": [
      "Distinct-value versus node-order semantics must be clarified when duplicate keys are permitted."
     ]
    },
    {
     "q": "Balanced Binary Tree",
     "l": "A",
     "a": "Under the stated standard variant, compare the minimum and maximum depths of all leaves and require a difference of at most one.",
     "e": "A DFS tracks leaf depths and exits as soon as the difference exceeds one. O(n) time and O(h) traversal stack for tree height h; it is not the same condition as local AVL height balance.",
     "x": [
      "# 7. Assumption: \"superbalanced\" means max leaf depth - min leaf depth <= 1.\ndef superbalanced?(root)\n  return true unless root\n  depths = []\n  stack = [[root, 0]]\n  until stack.empty?\n    node, depth = stack.pop\n    if !node.left && !node.right\n      depths << depth unless depths.include?(depth)\n      return false if depths.length > 2 || (depths.max - depths.min) > 1\n    else\n      stack << [node.left, depth + 1] if node.left\n      stack << [node.right, depth + 1] if node.right\n    end\n  end\n  true\nend\n\n# Example usage:\np superbalanced?(root)"
     ],
     "p": [
      "The actual interviewer must define the custom property before implementation."
     ]
    },
    {
     "q": "Binary Search Tree Checker",
     "l": "A",
     "a": "Traverse the tree with inherited lower and upper bounds, not just comparisons against immediate children.",
     "e": "A left descendant must remain below every relevant ancestor bound, and a right descendant above it. The example assumes strict ordering with no duplicate keys. O(n) time and O(h) traversal stack on a tree of height h.",
     "x": [
      "# 8. Strict BST: duplicate keys are not allowed.\ndef valid_bst?(root)\n  stack = [[root, nil, nil]]\n  until stack.empty?\n    node, lower, upper = stack.pop\n    next unless node\n    return false if lower && node.value <= lower\n    return false if upper && node.value >= upper\n    stack << [node.left, lower, node.value]\n    stack << [node.right, node.value, upper]\n  end\n  true\nend\n\n# Example usage:\np valid_bst?(root)"
     ],
     "p": [
      "Checking only each node against its children misses violations deeper in a subtree."
     ]
    },
    {
     "q": "Kth to Last Node in a Singly-Linked List",
     "l": "A",
     "a": "Keep two pointers k nodes apart and advance them together until the leading pointer reaches the end.",
     "e": "For k=1 the trailing pointer ends at the last node. Reject k<=0 and k larger than the list length. O(n) time and O(1) extra space without first counting the list.",
     "x": [
      "# 19. k=1 means the last node; reject out-of-range k.\ndef kth_last(head, k)\n  raise ArgumentError unless k.is_a?(Integer) && k.positive?\n  lead = head\n  k.times do\n    raise ArgumentError, 'k exceeds list length' unless lead\n    lead = lead.next\n  end\n  follow = head\n  while lead\n    lead, follow = lead.next, follow.next\n  end\n  follow\nend\n\n# Example usage:\np kth_last(head, 1).value"
     ],
     "p": [
      "Clarify one-based versus zero-based indexing."
     ]
    },
    {
     "q": "Largest Stack",
     "l": "A",
     "a": "Store values on one stack and current maxima on a second stack.",
     "e": "Push a maximum when the new value is at least the prior maximum, and pop the maximum when removing that same value. Using >= preserves repeated maxima. Push, pop and get_max are O(1); extra memory is O(n).",
     "x": [
      "# 15. A parallel maxima stack handles repeated maximum values.\nclass MaxStack\n  def initialize\n    @items, @maxima = [], []\n  end\n  def push(value)\n    @items << value\n    @maxima << value if @maxima.empty? || value >= @maxima.last\n    self\n  end\n  def pop\n    raise IndexError, 'empty stack' if @items.empty?\n    value = @items.pop\n    @maxima.pop if value == @maxima.last\n    value\n  end\n  def max = @maxima.last\nend\n\n# Example usage:\nstack = MaxStack.new\nstack.push(3).push(7).push(7)\nstack.pop\np stack.max # 7"
     ],
     "p": [
      "Define whether max on an empty stack returns nil or raises."
     ]
    },
    {
     "q": "Reverse A Linked List",
     "l": "A",
     "a": "Reverse each next pointer while tracking previous, current and following nodes.",
     "e": "Save the original following node before overwriting current.next, then advance. Return the last visited node as the new head. O(n) time and O(1) auxiliary references for an acyclic singly linked list.",
     "x": [
      "# 18. Nodes expose a writable next property.\ndef reverse_list(head)\n  previous = nil\n  while head\n    following = head.next\n    head.next = previous\n    previous, head = head, following\n  end\n  previous\nend\n\n# Example usage:\nhead = reverse_list(head)"
     ],
     "p": [
      "A cycle needs separate handling; traversal otherwise does not terminate."
     ]
    }
   ]
  ]
 ]
});
