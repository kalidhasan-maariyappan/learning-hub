# Part A: Ruby Interview Questions

[Master index](README.md) · [Coverage report](COVERAGE_REPORT.md)

388 consolidated questions. Original passages are kept in the source ledgers; corrected answers and distinct reviewed variants appear here.


## Additional technical topics

- [A-0001 — case MCQ 1 What is the output of the given code?](#a-0001)
- [A-0002 — case MCQ 10 A case statement compares the expression specified by case and that specified by when using the === operator and executes the code of the when clause that matches.](#a-0002)
- [A-0003 — case MCQ 2 The following syntax is used for the ruby case statement.](#a-0003)
- [A-0004 — case MCQ 3 What is the output of the given code?](#a-0004)
- [A-0005 — case MCQ 4 What is the output of the given code?](#a-0005)
- [A-0006 — case MCQ 5 What is the output of the given code?](#a-0006)
- [A-0007 — case MCQ 7 What is the output of the given code?](#a-0007)
- [A-0008 — case MCQ 8 What is the output of the given code?](#a-0008)
- [A-0009 — case MCQ 9 What is the output of the given code?](#a-0009)
- [A-0010 — comparison MCQ 1 The == ‘is equal to’ is known as relational operator.](#a-0010)
- [A-0011 — comparison MCQ 10 What is the output of the given code?](#a-0011)
- [A-0012 — comparison MCQ 4 What is the output of the given code?](#a-0012)
- [A-0013 — comparison MCQ 5 What is the output of the given code?](#a-0013)
- [A-0014 — comparison MCQ 6 Assignment operator is also known as relational operator.](#a-0014)
- [A-0015 — comparison MCQ 7 What is the output of the given code?](#a-0015)
- [A-0016 — comparison MCQ 8 Which of the following are used for comparison?](#a-0016)
- [A-0017 — comparison MCQ 9 What is the output of the given code?](#a-0017)
- [A-0018 — operator MCQ 10 What will be the output of the given code?](#a-0018)
- [A-0019 — operator MCQ 11 What will be the output of the given code?](#a-0019)
- [A-0020 — operator MCQ 12 What will be the output of the given code?](#a-0020)
- [A-0021 — operator MCQ 13 What will be the output of the given code?](#a-0021)
- [A-0022 — operator MCQ 14 What will be the output of the given code?](#a-0022)
- [A-0023 — operator MCQ 15 What will be the output of the given code?](#a-0023)
- [A-0024 — operator MCQ 5 What will be the output of the given code?](#a-0024)
- [A-0025 — operator MCQ 9 What will be the output of the given code?](#a-0025)
- [A-0026 — unless MCQ 1 Syntax for unless conditional statement is](#a-0026)
- [A-0027 — unless MCQ 10 What is the output of the given code?](#a-0027)
- [A-0028 — unless MCQ 11 What is the output of the given code?](#a-0028)
- [A-0029 — unless MCQ 2 What is the output of the given code?](#a-0029)
- [A-0030 — unless MCQ 3 What is the output of the given code?](#a-0030)
- [A-0031 — unless MCQ 4 What is the output of the given code?](#a-0031)
- [A-0032 — unless MCQ 5 The following syntax is also used for unless conditional statement.](#a-0032)
- [A-0033 — unless MCQ 6 What is the output of the given code?](#a-0033)
- [A-0034 — unless MCQ 7 What is the output of the given code?](#a-0034)
- [A-0035 — unless MCQ 8 What is the output of the given code?](#a-0035)
- [A-0036 — unless MCQ 9 What is the output of the given code?](#a-0036)
- [A-0037 — Are Ruby operators actually methods?](#a-0037)
- [A-0038 — Can you explain how Ruby looks up a method to invoke?](#a-0038)
- [A-0039 — Define Ruby methods?](#a-0039)
- [A-0040 — Describe recent trends and advancements in the Ruby language.](#a-0040)
- [A-0041 — Describe the 'method' method and its applications.](#a-0041)
- [A-0042 — Describe the difference between 'puts' and 'print' statements.](#a-0042)
- [A-0043 — Differentiate between '==' and 'equal?' comparison operators.](#a-0043)
- [A-0044 — Discuss the role of Ruby in creating and manipulating XML and JSON data.](#a-0044)
- [A-0045 — Explain About Float, Dig And Max?](#a-0045)
- [A-0046 — Explain About Ruby Names?](#a-0046)
- [A-0047 — Explain About The Command Line Options?](#a-0047)
- [A-0048 — Explain Assuming Rails Methods Are Built-in Ruby Methods.](#a-0048)
- [A-0049 — Explain Bang Methods.](#a-0049)
- [A-0050 — Explain break statement in Ruby?](#a-0050)
- [A-0051 — Explain break statement in Ruby.](#a-0051)
- [A-0052 — Explain case statement in Ruby.](#a-0052)
- [A-0053 — Explain do while loop in Ruby.](#a-0053)
- [A-0054 — Explain Dynamic Typing.](#a-0054)
- [A-0055 — Explain for loop in Ruby.](#a-0055)
- [A-0056 — Explain How Can We Define Ruby Regular Expressions?](#a-0056)
- [A-0057 — Explain Implicit Returns.](#a-0057)
- [A-0058 — Explain Misunderstanding throw/catch and raise/rescue.](#a-0058)
- [A-0059 — Explain Not Knowing the Difference Between == and eql? Operators.](#a-0059)
- [A-0060 — Explain Not Using Idiomatic Ruby.](#a-0060)
- [A-0061 — Explain Parentheses are Optional.](#a-0061)
- [A-0062 — Explain redo statement in Ruby?](#a-0062)
- [A-0063 — Explain retry statement in Ruby?](#a-0063)
- [A-0064 — Explain Ruby data types.](#a-0064)
- [A-0065 — Explain Ruby exceptions?](#a-0065)
- [A-0066 — Explain Some Of The Looping Structures Available In Ruby?](#a-0066)
- [A-0067 — Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages.](#a-0067)
- [A-0068 — Explain the difference between 'gets.chomp' and 'gets.strip'.](#a-0068)
- [A-0069 — Explain the difference between #equal and #==.](#a-0069)
- [A-0070 — Explain the difference between raise/rescue and throw/catch.](#a-0070)
- [A-0071 — Explain the difference between:](#a-0071)
- [A-0072 — Explain the Observer Pattern and its use.](#a-0072)
- [A-0073 — Explain the principle of 'Convention over Configuration' in the context of Ruby.](#a-0073)
- [A-0074 — Explain the principle of DRY (Don't Repeat Yourself) in Ruby.](#a-0074)
- [A-0075 — Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations.](#a-0075)
- [A-0076 — Explain the usage of the 'if' statement in Ruby.](#a-0076)
- [A-0077 — Explain the use of ensure statement in Ruby?](#a-0077)
- [A-0078 — Explain the use of retry statement in Ruby?](#a-0078)
- [A-0079 — Explain this ruby idiom: a ||= b](#a-0079)
- [A-0080 — Explain Truthy and Falsy Values.](#a-0080)
- [A-0081 — Explain until loop in Ruby.](#a-0081)
- [A-0082 — Explain what the splat operator is.](#a-0082)
- [A-0083 — Explain When to Employ and / or vs. && / ||.](#a-0083)
- [A-0084 — Explain while loop in Ruby?](#a-0084)
- [A-0085 — Find the error in the following code and correct it.](#a-0085)
- [A-0086 — Given:](#a-0086)
- [A-0087 — How an exception is handled in Ruby?](#a-0087)
- [A-0088 — How are errors handled in Ruby?](#a-0088)
- [A-0089 — How can developers contribute to the growth of the Ruby ecosystem?](#a-0089)
- [A-0090 — How can you add a comment in Ruby code?](#a-0090)
- [A-0091 — How do comments and naming conventions work in Ruby?](#a-0091)
- [A-0092 — How do the spaceship operator and Comparable work together?](#a-0092)
- [A-0093 — How do you create a Ruby script file and execute it on a command line?](#a-0093)
- [A-0094 — How do you create comments in Ruby code?](#a-0094)
- [A-0095 — How do you define a method in Ruby?](#a-0095)
- [A-0096 — How do you define a method, and how does return work?](#a-0096)
- [A-0097 — How do you manage dependencies in Ruby projects?](#a-0097)
- [A-0098 — How does case/when actually match, and what is ===?](#a-0098)
- [A-0099 — How Does Ruby Deal With Extremely Large Numbers?](#a-0099)
- [A-0100 — How does Ruby resolve a method call?](#a-0100)
- [A-0101 — How is exception handling implemented in Ruby?](#a-0101)
- [A-0102 — How is Ruby adapting to modern web development demands?](#a-0102)
- [A-0103 — How is Ruby different from Python?](#a-0103)
- [A-0104 — How to check whether a directory exist or not in Ruby?](#a-0104)
- [A-0105 — How to create a new time instance in Ruby?](#a-0105)
- [A-0106 — How to open a file in Ruby?](#a-0106)
- [A-0107 — How to read a file in Ruby?](#a-0107)
- [A-0108 — How to use Ruby methods?](#a-0108)
- [A-0109 — How to use Ruby's introspection capabilities to create more maintainable code?](#a-0109)
- [A-0110 — How will you comment in Ruby?](#a-0110)
- [A-0111 — How will you rename and delete a file in Ruby?](#a-0111)
- [A-0112 — Is Ruby front end or backend?](#a-0112)
- [A-0113 — Is Ruby statically typed or dynamically typed?](#a-0113)
- [A-0114 — Is the line of code below valid Ruby code?  If so, what does it do?  Explain your answer.](#a-0114)
- [A-0115 — Is the line of code below valid Ruby code? If so, what does it do? Explain your answer?](#a-0115)
- [A-0116 — List some features of Ruby?](#a-0116)
- [A-0117 — Name a few Directories in ruby and explain their purpose?](#a-0117)
- [A-0118 — Name some operators used in Ruby?](#a-0118)
- [A-0119 — Predict the output of the code below. Explain your answer?](#a-0119)
- [A-0120 — Rail’s application framework is called-](#a-0120)
- [A-0121 — Strongly or Weakly Typed Ruby?](#a-0121)
- [A-0122 — The user interface of Twitter has been built using](#a-0122)
- [A-0123 — There are four ways to invoke a method in ruby.  Can you give me at least two?](#a-0123)
- [A-0124 — There are three ways to invoke a method in ruby. Can you give me at least two?](#a-0124)
- [A-0125 — What are best practices for Ruby development?](#a-0125)
- [A-0126 — What are custom validations, and how do you create them?](#a-0126)
- [A-0127 — What are some advantages of using Ruby?](#a-0127)
- [A-0128 — What are the basic conditions that a user should pay attention to while preparing an ERB document in Ruby?](#a-0128)
- [A-0129 — What are the basic data types in Ruby?](#a-0129)
- [A-0130 — What are the data types used in Ruby?](#a-0130)
- [A-0131 — What are the different operators used in Ruby?](#a-0131)
- [A-0132 — What are the main features of Ruby?](#a-0132)
- [A-0133 — What are the naming conventions in Ruby?](#a-0133)
- [A-0134 — What are the naming conventions?](#a-0134)
- [A-0135 — What are the standout features of the Ruby programming language?](#a-0135)
- [A-0136 — What does the safe navigation operator (&.) do?](#a-0136)
- [A-0137 — What does this say about the advantages of ruby's dynamic (duck) typed system?](#a-0137)
- [A-0138 — What extension is used to save the ruby file?](#a-0138)
- [A-0139 — What happens when you call a method in Ruby?](#a-0139)
- [A-0140 — What is a case statement in Ruby?](#a-0140)
- [A-0141 — What is a closure in Ruby and how is it used?](#a-0141)
- [A-0142 — What is an enum in Ruby?](#a-0142)
- [A-0143 — What is Duck Typing in Ruby?](#a-0143)
- [A-0144 — What is interpolation in the Ruby programming language?](#a-0144)
- [A-0145 — What is JSON?](#a-0145)
- [A-0146 — What is method overloading and does Ruby support it?](#a-0146)
- [A-0147 — What is monkey patching in Ruby?](#a-0147)
- [A-0148 — What is Ruby and what are its main features?](#a-0148)
- [A-0149 — What is Ruby and what makes it distinctive?](#a-0149)
- [A-0150 — What is Ruby and why is it popular?](#a-0150)
- [A-0151 — What is Ruby programming language?](#a-0151)
- [A-0152 — What is Ruby, and why is it popular for web development?](#a-0152)
- [A-0153 — What is Ruby’s programming language?](#a-0153)
- [A-0154 — What is rvm?](#a-0154)
- [A-0155 — What is sysread method in Ruby?](#a-0155)
- [A-0156 — What is the best thing which you find about Ruby on Rail so far?](#a-0156)
- [A-0157 — What is the difference between == and eql? in Ruby?](#a-0157)
- [A-0158 — What is the difference between puts, print, and p in Ruby?](#a-0158)
- [A-0159 — What is the difference between raise/rescue and throw/catch in Ruby?](#a-0159)
- [A-0160 — What is the difference between require, require_relative, and load in Ruby?](#a-0160)
- [A-0161 — What is the difference between throw/catch and raise/rescue?](#a-0161)
- [A-0162 — What is the Enumerable#inject method and how is it used?](#a-0162)
- [A-0163 — What is the output of the given code?](#a-0163)
- [A-0164 — What is the purpose of Ruby’s require and require_relative methods?](#a-0164)
- [A-0165 — What is the purpose of the initialize method in Ruby?](#a-0165)
- [A-0166 — What is the purpose of the self keyword in Ruby?](#a-0166)
- [A-0167 — What is the return value for:](#a-0167)
- [A-0168 — What is the use of .capitalize method?](#a-0168)
- [A-0169 — What Is The Use Of Interpolation In Ruby?](#a-0169)
- [A-0170 — What is the use of load and require in Ruby?](#a-0170)
- [A-0171 — What is your favorite api resource for ruby?](#a-0171)
- [A-0172 — What will be the output of the following code?](#a-0172)
- [A-0173 — What will be the output?](#a-0173)
- [A-0174 — What will be the value of:](#a-0174)
- [A-0175 — What will be the values of:](#a-0175)
- [A-0176 — What will val1 and val2 equal after the code below is executed? Explain your answer.](#a-0176)
- [A-0177 — When do we use "I" in Ruby?](#a-0177)
- [A-0178 — When would you use Struct or Data?](#a-0178)
- [A-0179 — Which of the following is not a valid datatype in Ruby?](#a-0179)
- [A-0180 — Which Ruby implementations exist, and how do their runtimes differ?](#a-0180)
- [A-0181 — Who is the developer of Ruby?](#a-0181)
- [A-0182 — Why is it advised to rescue from _StandardError_ rather than _Exception_?](#a-0182)

## Authentication, authorization and security

- [A-0183 — What is Dependency Injection, and how do you achieve it in Rails?](#a-0183)
- [A-0184 — What is the significance of Ruby in the context of ethical hacking and cybersecurity?](#a-0184)

## Blocks, callables and iteration

- [A-0185 — Blocks](#a-0185)
- [A-0186 — Can a Ruby process leak memory, and how would you diagnose it?](#a-0186)
- [A-0187 — Consider the following code:](#a-0187)
- [A-0188 — Consider the following two methods:](#a-0188)
- [A-0189 — Discuss the concept of blocks and their significance.](#a-0189)
- [A-0190 — Explain About Ruby Code Blocks?](#a-0190)
- [A-0191 — Explain ampersand parameter (&block) in Ruby?](#a-0191)
- [A-0192 — Explain each of the following operators and how and when they should be used:  `==`, `===`, `eql?`, `equal?`.](#a-0192)
- [A-0193 — Explain each of the following operators and how and when they should be used: ==, ===, eql?, equal?](#a-0193)
- [A-0194 — Explain the concept of a block in Ruby and provide an example of its usage.](#a-0194)
- [A-0195 — Explain the difference between Array#each and Array#map](#a-0195)
- [A-0196 — Explain the difference between modules and classes in Ruby and when to use each.](#a-0196)
- [A-0197 — Explain the difference between puts and print in Ruby. Also, describe the concept of blocks and how they are used.](#a-0197)
- [A-0198 — Explain what a proc is.](#a-0198)
- [A-0199 — How do iterators like each work in Ruby?](#a-0199)
- [A-0200 — How do yield and block_given? work?](#a-0200)
- [A-0201 — How do you create a custom Enumerator in Ruby?](#a-0201)
- [A-0202 — How does a block differ from a method in Ruby?](#a-0202)
- [A-0203 — How many iterators are there in Ruby?](#a-0203)
- [A-0204 — In how many ways a block is written in Ruby?](#a-0204)
- [A-0205 — In Ruby code, you quite often see the trick of using an expression like `array.map(&:method_name)` as a shorthand form of `array.map { |element| element.method_name }`.  How exactly does it work?](#a-0205)
- [A-0206 — In Ruby code, you quite often see the trick of using an expression like array.map(&:method_name) as a shorthand form of array.map { |element| element.method_name }. How exactly does it work?](#a-0206)
- [A-0207 — Lambda](#a-0207)
- [A-0208 — Lambda vs Blocks](#a-0208)
- [A-0209 — Literal way of writing Lambda & Proc](#a-0209)
- [A-0210 — Mention What Is The Difference Between Procs And Blocks?](#a-0210)
- [A-0211 — What are Block, Proc, and Lambda in Ruby?](#a-0211)
- [A-0212 — What are blocks and procs?](#a-0212)
- [A-0213 — What are blocks in Ruby, and how are they used?](#a-0213)
- [A-0214 — What are Procs in Ruby?  How do they compare to closures in JS?](#a-0214)
- [A-0215 — What are Ruby blocks and how do you use them?](#a-0215)
- [A-0216 — What are Ruby iterators and how do they work?](#a-0216)
- [A-0217 — What are Ruby iterators?](#a-0217)
- [A-0218 — What are Ruby’s enumerator objects, and how are they used?](#a-0218)
- [A-0219 — What are some commonly used iterators in Ruby?](#a-0219)
- [A-0220 — What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable?](#a-0220)
- [A-0221 — What do tap and then (yield_self) do, and when are they useful?](#a-0221)
- [A-0222 — What does &:method mean in something like map(&:upcase)?](#a-0222)
- [A-0223 — What is a block and how do you pass one?](#a-0223)
- [A-0224 — What is a gem in Ruby, and how is it useful in the development process?](#a-0224)
- [A-0225 — What is a Proc?](#a-0225)
- [A-0226 — What is the difference between `Array#map` and `Array#each`?](#a-0226)
- [A-0227 — What is the difference between map, select, and reduce in Ruby?](#a-0227)
- [A-0228 — What is the difference between proc and lambda in Ruby?](#a-0228)
- [A-0229 — What is the difference between yield and call in Ruby?](#a-0229)
- [A-0230 — What is the value of the variable `upcased` in the below piece of code?](#a-0230)
- [A-0231 — What is Yield in Ruby on Rails?](#a-0231)
- [A-0232 — What is yield statement in Ruby?](#a-0232)
- [A-0233 — What will be the result of each of the following lines of code?](#a-0233)

## Classes, modules and OOP

- [A-0234 — Can you call a private method outside a Ruby class using its object?](#a-0234)
- [A-0235 — Consider the following code:](#a-0235)
- [A-0236 — Describe the difference between local, instance, and class variables.](#a-0236)
- [A-0237 — Discuss the 'super' keyword and its usage.](#a-0237)
- [A-0238 — Does Ruby support Multiple Inheritance and Single Inheritance?](#a-0238)
- [A-0239 — Does Ruby support single inheritance?](#a-0239)
- [A-0240 — Explain About Class Variable And Global Variable?](#a-0240)
- [A-0241 — Explain About Normal Method Class?](#a-0241)
- [A-0242 — Explain module mixins in Ruby?](#a-0242)
- [A-0243 — Explain Ruby module?](#a-0243)
- [A-0244 — Explain the concept of inheritance in Ruby and how it facilitates code reuse.](#a-0244)
- [A-0245 — Explain the concept of mixins in Ruby.](#a-0245)
- [A-0246 — Explain the difference between a Ruby class and an instance of a class.](#a-0246)
- [A-0247 — Explain the purpose of modules in Ruby and how they facilitate code organization and reusability.](#a-0247)
- [A-0248 — Explain which symbols developers use to define variables, global variables, and class variables.](#a-0248)
- [A-0249 — For the class `ABC` the given as:](#a-0249)
- [A-0250 — How can you achieve multiple inheritance in Ruby?](#a-0250)
- [A-0251 — How can you modify existing classes and methods dynamically?](#a-0251)
- [A-0252 — How can you override a private method in a subclass in Ruby?](#a-0252)
- [A-0253 — How do you create and use a class in Ruby?](#a-0253)
- [A-0254 — How do you define a class and its constructor?](#a-0254)
- [A-0255 — How do you establish inheritance in Ruby classes?](#a-0255)
- [A-0256 — How do you implement inheritance in Ruby?](#a-0256)
- [A-0257 — How do you reduce object allocation in a hot Ruby path?](#a-0257)
- [A-0258 — How to access Ruby array elements? How many methods are used to access Ruby elements.?](#a-0258)
- [A-0259 — How to access Ruby strings elements in an application?](#a-0259)
- [A-0260 — How to create Ruby object?](#a-0260)
- [A-0261 — How to declare a constructor in a Ruby class?](#a-0261)
- [A-0262 — How to define the Instance variable, Global variable, and Class variable in Ruby.](#a-0262)
- [A-0263 — How would you freeze an object in Ruby? Can you provide a simple example?](#a-0263)
- [A-0264 — Walk through Ruby's object model: classes, metaclasses, and BasicObject.](#a-0264)
- [A-0265 — What are Accessor Methods in Ruby?](#a-0265)
- [A-0266 — What are modules and how do mixins work?](#a-0266)
- [A-0267 — What are Ruby modules and how do they differ from classes?](#a-0267)
- [A-0268 — What are some built-in Ruby class exceptions?](#a-0268)
- [A-0269 — What are the core principles of object-oriented programming that are essential in Ruby development?](#a-0269)
- [A-0270 — What are the three levels of method access control available in Ruby?](#a-0270)
- [A-0271 — What do attr_accessor, attr_reader, and attr_writer do?](#a-0271)
- [A-0272 — What does reopening a class (monkey patching) mean, and what are the risks?](#a-0272)
- [A-0273 — What is a class?](#a-0273)
- [A-0274 — What is a module in Ruby, and how is it different from a class?](#a-0274)
- [A-0275 — What is a Service Object, and when do you use it?](#a-0275)
- [A-0276 — What is an object?](#a-0276)
- [A-0277 — What is Class Library in Ruby?](#a-0277)
- [A-0278 — What is Mixin in Rails?](#a-0278)
- [A-0279 — What is Ruby and why is it considered an object-oriented language (OOP)?](#a-0279)
- [A-0280 — What is the contract between eql? and hash for custom objects used as hash keys?](#a-0280)
- [A-0281 — What is the difference between class variables (@@) and instance variables (@) in Ruby?](#a-0281)
- [A-0282 — What is the difference between super and super() Call?](#a-0282)
- [A-0283 — What is the difference between the `Object` methods `clone` and `dup`?](#a-0283)
- [A-0284 — What is the Enumerable module and why does it matter?](#a-0284)
- [A-0285 — What is the function of modules in Ruby?](#a-0285)
- [A-0286 — What is the purpose of the super keyword in Ruby?](#a-0286)
- [A-0287 — What is unit testing (in classical terms)?  What is the primary technique when writing a test?](#a-0287)
- [A-0288 — When is the “super” keyword used in Ruby?](#a-0288)

## Data, querying and integrity

- [A-0289 — __________ is a tool for altering the database schema of an application.](#a-0289)
- [A-0290 — How are constants declared and what is their scope in Ruby?](#a-0290)
- [A-0291 — Is it possible in Ruby to develop database-driven applications in Ruby Tell anyone the basic approach through which the same can be developed in ruby?](#a-0291)

## Dependencies, deployment and operations

- [A-0292 — Discuss the purpose of RVM and rbenv for managing Ruby versions.](#a-0292)
- [A-0293 — Explain the role of Bundler and gems in the Ruby ecosystem.](#a-0293)
- [A-0294 — How do you create and publish your own Ruby Gem?](#a-0294)
- [A-0295 — How do you install a Ruby gem?](#a-0295)
- [A-0296 — Mention What Is The Difference Between A Gem And A Plugin In Ruby?](#a-0296)
- [A-0297 — What are gems and how does Bundler manage them?](#a-0297)
- [A-0298 — What are RubyGems?  Got any favourites?](#a-0298)
- [A-0299 — What are the different types of gems in Ruby?](#a-0299)
- [A-0300 — What is a gemset?](#a-0300)
- [A-0301 — What is the purpose of the Gemfile in a Rails application?](#a-0301)

## HTTP, MVC and presentation

- [A-0302 — Create a model called User with validations for name (presence) and email (format).](#a-0302)
- [A-0303 — How can I improve my problem-solving skills in Ruby for interviews?](#a-0303)
- [A-0304 — How do conditionals work, including unless and modifier form?](#a-0304)
- [A-0305 — How do I prepare for a Ruby coding interview?](#a-0305)
- [A-0306 — What are some advanced Ruby interview topics I should be aware of?](#a-0306)
- [A-0307 — What are the most common Ruby interview questions?](#a-0307)
- [A-0308 — What Ruby concepts should I focus on for technical interviews?](#a-0308)

## Object model and metaprogramming

- [A-0309 — case MCQ 6 The expression specified by the when clause is evaluated as the left operand. If no when clauses match, case executes the code of the else clause.](#a-0309)
- [A-0310 — comparison MCQ 3 What will the following code evaluate to?](#a-0310)
- [A-0311 — operator MCQ 4 What will the following expression evaluate to?](#a-0311)
- [A-0312 — operator MCQ 6 What will the following expression evaluate to?](#a-0312)
- [A-0313 — operator MCQ 7 What will the following expression evaluate to?](#a-0313)
- [A-0314 — operator MCQ 8 What will the following expression evaluate to?](#a-0314)
- [A-0315 — Describe the purpose of the 'prepend' method in Ruby and how it affects method lookup.](#a-0315)
- [A-0316 — Explain Confusion between include and extend.](#a-0316)
- [A-0317 — Explain the use of 'require' and 'include' in Ruby.](#a-0317)
- [A-0318 — How can you include a module in a class in Ruby?](#a-0318)
- [A-0319 — How do you define and use a singleton method in Ruby?](#a-0319)
- [A-0320 — What are instance_eval, class_eval, and instance_exec used for?](#a-0320)
- [A-0321 — What are refinements and when do they beat monkey patching?](#a-0321)
- [A-0322 — What is the difference between _extend_ and _include_?](#a-0322)
- [A-0323 — What is the difference between `extend` and `include` in ruby?](#a-0323)
- [A-0324 — What is the difference between class_eval and instance_eval in Ruby?](#a-0324)
- [A-0325 — What is the difference between extend and include in ruby?](#a-0325)
- [A-0326 — What is the difference between include and extend in Ruby?](#a-0326)
- [A-0327 — What is the difference between include, extend, and prepend?](#a-0327)

## Performance, memory and concurrency

- [A-0328 — How does concurrency work in Ruby, and what is the GIL?](#a-0328)
- [A-0329 — How is the Ruby community addressing concerns about the performance of web frameworks compared to other languages?](#a-0329)

## Testing, debugging and observability

- [A-0330 — Explain the potential role of Ruby in the future of augmented reality (AR) and virtual reality (VR) technologies.](#a-0330)
- [A-0331 — What exactly are Harnesses and Fixtures in the Ruby?](#a-0331)
- [A-0332 — What is RSpec and how is it used for testing in Ruby?](#a-0332)

## Values, collections and language basics

- [A-0333 — comparison MCQ 2 The ‘=’ is used for assigning value to variable?](#a-0333)
- [A-0334 — operator MCQ 1 Boolean opeartors are also known as logical operators.](#a-0334)
- [A-0335 — operator MCQ 2 Which of the following is a valid boolean operator?](#a-0335)
- [A-0336 — operator MCQ 3 The boolean operator && only result in true when both the values are true?](#a-0336)
- [A-0337 — Differentiate between local variables and instance variables.](#a-0337)
- [A-0338 — Explain Concatenating Strings / Strings are Mutable in Ruby.](#a-0338)
- [A-0339 — Explain Not Using Instance Variables Correctly.](#a-0339)
- [A-0340 — Explain Ruby hashes?](#a-0340)
- [A-0341 — Explain Ruby ranges. What are the ways to define ranges?](#a-0341)
- [A-0342 — Explain Ruby strings?](#a-0342)
- [A-0343 — Explain the concept of symbols in Ruby.](#a-0343)
- [A-0344 — Given that the following code has been run:](#a-0344)
- [A-0345 — How and when would you declare a Global Variable?](#a-0345)
- [A-0346 — How are Variables defined in Ruby?](#a-0346)
- [A-0347 — How do keyword arguments work, and how are they different from a hash?](#a-0347)
- [A-0348 — How do you create an array in Ruby?](#a-0348)
- [A-0349 — How do you remove `nil` values in array using ruby?](#a-0349)
- [A-0350 — How do you remove nil values in array using ruby?](#a-0350)
- [A-0351 — How does string interpolation work in Ruby?](#a-0351)
- [A-0352 — How is Symbol different from variables?](#a-0352)
- [A-0353 — How would you display a variable from a controller in a Rails view?](#a-0353)
- [A-0354 — In how many ways items can be added in an array in Ruby?](#a-0354)
- [A-0355 — In how many ways you can compare Ruby string?](#a-0355)
- [A-0356 — Not Knowing the Difference Between nil? and empty?](#a-0356)
- [A-0357 — The .upcase and .capitalize method are used for capitalizing the whole string.](#a-0357)
- [A-0358 — What are arrays and hashes in Ruby?](#a-0358)
- [A-0359 — What are ranges and how are they used?](#a-0359)
- [A-0360 — What are Ruby arrays and how they can be created?](#a-0360)
- [A-0361 — What are Ruby variables?](#a-0361)
- [A-0362 — What are symbols in Ruby, and when should you use them?](#a-0362)
- [A-0363 — What are the different types of variables in Ruby?](#a-0363)
- [A-0364 — What are the variable types in Ruby and how do you tell them apart?](#a-0364)
- [A-0365 — What are variables in Ruby?](#a-0365)
- [A-0366 — What does false mean?](#a-0366)
- [A-0367 — What does freeze do, and what is frozen_string_literal?](#a-0367)
- [A-0368 — What is a range and how is it defined in Ruby?](#a-0368)
- [A-0369 — What is concatenating string in Ruby. In how many ways you can create a concatenating string?](#a-0369)
- [A-0370 — What is Hash in Ruby on Rails?](#a-0370)
- [A-0371 — What is nil, and what counts as false in Ruby?](#a-0371)
- [A-0372 — What is the difference between `and`/`or` and `&&`/`||`?  What is the result of `a = nil and true`?](#a-0372)
- [A-0373 — What is the difference between false and nil in Ruby on Rails?](#a-0373)
- [A-0374 — What is the difference between nil and false in Ruby?](#a-0374)
- [A-0375 — What is the difference between nil and false?](#a-0375)
- [A-0376 — What is the difference between nil, false, and blank?](#a-0376)
- [A-0377 — What is the difference between nil, false, and empty in Ruby?](#a-0377)
- [A-0378 — What is the difference between render and render_to_string?](#a-0378)
- [A-0379 — What is the difference between single quotes and double quotes for strings](#a-0379)
- [A-0380 — What is the difference between String and Symbol?](#a-0380)
- [A-0381 — What is the purpose of the 'nil' value in Ruby?](#a-0381)
- [A-0382 — What is the use of global variable $ in Ruby?](#a-0382)
- [A-0383 — What is the value of the variable upcased in the below piece of code?](#a-0383)
- [A-0384 — What will `val1` and `val2` equal after the code below is executed?  Explain your answer.](#a-0384)
- [A-0385 — Which common string methods should you know?](#a-0385)
- [A-0386 — Which hash methods and patterns should you know?](#a-0386)
- [A-0387 — Which of the expressions listed below will result in “false”?](#a-0387)
- [A-0388 — Which of the expressions listed below will result in `"false"`?](#a-0388)

---

<a id="a-0001"></a>

### A-0001 — case MCQ 1 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 1] What is the output of the given code?

**Direct answer**

c) It prints little child.

**Detailed explanation**

The range 3..6 matches age=5 using Range#===. Earlier 0..2 does not match.

**Practical example**

```ruby
age =  5
case age
when 0 .. 2
    puts "baby"
when 3 .. 6
    puts "little child"
when 7 .. 12
    puts "child"
when 13 .. 18
    puts "youth"
else
    puts "adult"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00580 — [twentyone.txt:157–177](../ruby/twentyone.txt) (case-1) · [complete source](sources/twentyone.md)


---

<a id="a-0002"></a>

### A-0002 — case MCQ 10 A case statement compares the expression specified by case and that specified by when using the === operator and executes the code of the when clause that matches.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 10] A case statement compares the expression specified by case and that specified by when using the === operator and executes the code of the when clause that matches.

**Direct answer**

a) True.

**Detailed explanation**

The direction is when_pattern === case_target. This is why a Range, Regexp or Class can act as a case pattern.

**Practical example**

```text
p(Integer === 5) # true
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00589 — [twentyone.txt:315–330](../ruby/twentyone.txt) (case-10) · [complete source](sources/twentyone.md)


---

<a id="a-0003"></a>

### A-0003 — case MCQ 2 The following syntax is used for the ruby case statement.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 2] The following syntax is used for the ruby case statement.

**Direct answer**

a) True as pseudocode for the ordinary case syntax.

**Detailed explanation**

Each when can list multiple comma-separated patterns and optional then. Ellipses are placeholders, not literal Ruby tokens in the shown template.

**Practical example**

```text
case expression
when expression , expression ... then
   code ...
else
   code 
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00581 — [twentyone.txt:178–191](../ruby/twentyone.txt) (case-2) · [complete source](sources/twentyone.md)


---

<a id="a-0004"></a>

### A-0004 — case MCQ 3 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 3] What is the output of the given code?

**Direct answer**

d) SyntaxError.

**Detailed explanation**

In a case target expression, branch labels must begin with when. The source puts calls before when and places else after an expression.

**Practical example**

```ruby
age =  4
case age
puts "baby" when 0 .. 2
puts "little child" when 3 .. 6
puts "child" when 7 .. 12
puts "youth" when 13 .. 18
puts "adult" else
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00582 — [twentyone.txt:192–207](../ruby/twentyone.txt) (case-3) · [complete source](sources/twentyone.md)


---

<a id="a-0005"></a>

### A-0005 — case MCQ 4 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 4] What is the output of the given code?

**Direct answer**

c) It prints 1/baby, 2/baby, then 3/4/5 each followed by little child, on separate lines.

**Detailed explanation**

The for loop visits 1 through 5. The first two match 0..2 and the last three match 3..6.

**Practical example**

```text
for counter in 1..5
case counter
when 0 .. 2
    puts counter
    puts "baby"
when 3 .. 6
    puts counter
    puts "little child"
when 7 .. 12
    puts counter
    puts "child"
else
    puts counter
    puts "adult"
end
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00583 — [twentyone.txt:208–240](../ruby/twentyone.txt) (case-4) · [complete source](sources/twentyone.md)


---

<a id="a-0006"></a>

### A-0006 — case MCQ 5 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 5] What is the output of the given code?

**Direct answer**

The output depends on the missing standard input.

**Detailed explanation**

The when expressions assign strings "a", "b" and "c", and their resulting String values are compared with the original case target. Input a prints alphabet a; b prints alphabet b; c prints alphabet c; otherwise it prints some other alphabet. The assignments are legal but confusing; write when "a" instead.

**Practical example**

```ruby
string = gets.chomp
case string
when string = "a"
print "alphabet a"
when string = "b"
print "alphabet b"
when string = "c"
print "alphabet c"
else 
    print "some other alphabet"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.
- Incomplete source: input or prior variable initialization is not supplied; conditional outcomes are stated instead of inventing it.

**Source references**

- SRC-00584 — [twentyone.txt:241–260](../ruby/twentyone.txt) (case-5) · [complete source](sources/twentyone.md)


---

<a id="a-0007"></a>

### A-0007 — case MCQ 7 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 7] What is the output of the given code?

**Direct answer**

The exact output needs the input; input ruby produces length is 4, matching the scenario in option a.

**Detailed explanation**

The target length.length is evaluated before any when assignments. A four-character input matches the integer 4 assigned in the first when; a five-character input matches 5. These assignments overwrite the local variable but do not change the already evaluated target.

**Practical example**

```text
length=gets.chomp
case length.length
when length=4
print "length is 4"
when length=5
print "length is 5"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.
- Incomplete source: input or prior variable initialization is not supplied; conditional outcomes are stated instead of inventing it.

**Source references**

- SRC-00586 — [twentyone.txt:266–283](../ruby/twentyone.txt) (case-7) · [complete source](sources/twentyone.md)


---

<a id="a-0008"></a>

### A-0008 — case MCQ 8 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 8] What is the output of the given code?

**Direct answer**

The exact output needs the input; input ruby produces length is 4, matching option a’s scenario.

**Detailed explanation**

String reversal preserves its character count, so the same length cases apply. The source never supplies a definite input, and the variable assignments are legal but misleading.

**Practical example**

```text
length=gets.chomp
case length.reverse.length
when length=4
print "length is 4"
when length=5
print "length is 5"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.
- Incomplete source: input or prior variable initialization is not supplied; conditional outcomes are stated instead of inventing it.

**Source references**

- SRC-00587 — [twentyone.txt:284–301](../ruby/twentyone.txt) (case-8) · [complete source](sources/twentyone.md)


---

<a id="a-0009"></a>

### A-0009 — case MCQ 9 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[case MCQ 9] What is the output of the given code?

**Direct answer**

c) SyntaxError.

**Detailed explanation**

The print-before-when arrangement is invalid syntax for this case statement. The correct structure is when 9 then print "ruby".

**Practical example**

```text
l=9
case l
print "ruby" when l==9
print "language" when l==10
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00588 — [twentyone.txt:302–314](../ruby/twentyone.txt) (case-9) · [complete source](sources/twentyone.md)


---

<a id="a-0010"></a>

### A-0010 — comparison MCQ 1 The == ‘is equal to’ is known as relational operator.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 1] The == ‘is equal to’ is known as relational operator.

**Direct answer**

a) True under the broad “relational/comparison operator” terminology used by the source.

**Detailed explanation**

== calls the receiver’s equality operation. Some references distinguish equality operators from ordering operators; the terminology does not alter its Ruby behavior.

**Practical example**

```ruby
p 2 == 2 # true
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00590 — [twentyone.txt:331–335](../ruby/twentyone.txt) (comparison-1) · [complete source](sources/twentyone.md)


---

<a id="a-0011"></a>

### A-0011 — comparison MCQ 10 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 10] What is the output of the given code?

**Direct answer**

a) SyntaxError.

**Detailed explanation**

The if statement lacks its terminating end. With end supplied, the shown statements print 1 and change counter to 2; there is no loop to print 2.

**Practical example**

```text
counter=1
if counter<=5
    puts (counter)
    counter=counter+1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00599 — [twentyone.txt:423–445](../ruby/twentyone.txt) (comparison-10) · [complete source](sources/twentyone.md)


---

<a id="a-0012"></a>

### A-0012 — comparison MCQ 4 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 4] What is the output of the given code?

**Direct answer**

b) true, true, true, false, each printed on a new line.

**Detailed explanation**

17>16, 21<=30 and 9>=9 are true; -11>4 is false. Ruby’s Boolean spellings are lowercase.

**Practical example**

```ruby
test_1 = 17 > 16
puts(test_1)
test_2 = 21 <= 30
puts(test_2)
test_3 = 9 >= 9
puts(test_3)
test_4 = -11 > 4
puts(test_4)
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00593 — [twentyone.txt:351–367](../ruby/twentyone.txt) (comparison-4) · [complete source](sources/twentyone.md)


---

<a id="a-0013"></a>

### A-0013 — comparison MCQ 5 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 5] What is the output of the given code?

**Direct answer**

b) It prints Not same.

**Detailed explanation**

"string" and "strings" have different String values, so == returns false.

**Practical example**

```text
a="string"
b="strings"
if(a==b)
    print ("a and b are same")
else 
    print "Not same"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00594 — [twentyone.txt:368–382](../ruby/twentyone.txt) (comparison-5) · [complete source](sources/twentyone.md)


---

<a id="a-0014"></a>

### A-0014 — comparison MCQ 6 Assignment operator is also known as relational operator.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 6] Assignment operator is also known as relational operator.

**Direct answer**

b) False.

**Detailed explanation**

Assignment and comparison are different operations. Ruby assignment expressions also return the assigned value.

**Practical example**

```ruby
value = 9 # assignment
p value == 9 # comparison, true
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00595 — [twentyone.txt:383–387](../ruby/twentyone.txt) (comparison-6) · [complete source](sources/twentyone.md)


---

<a id="a-0015"></a>

### A-0015 — comparison MCQ 7 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 7] What is the output of the given code?

**Direct answer**

a) It prints a greater than b.

**Detailed explanation**

The integers are 10 and 9, so the greater-than comparison is true.

**Practical example**

```text
a=10
b=9
if(a>b)
    print ("a greater than b")
else 
    print "Not greater"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00596 — [twentyone.txt:388–402](../ruby/twentyone.txt) (comparison-7) · [complete source](sources/twentyone.md)


---

<a id="a-0016"></a>

### A-0016 — comparison MCQ 8 Which of the following are used for comparison?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 8] Which of the following are used for comparison?

**Direct answer**

d) All of the mentioned.

**Detailed explanation**

Equality, inequality and ordering relations are comparisons; whether an object supports an ordering operation depends on its class.

**Practical example**

```ruby
p [2 == 2, 2 != 3, 2 < 3] # [true, true, true]
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00597 — [twentyone.txt:403–409](../ruby/twentyone.txt) (comparison-8) · [complete source](sources/twentyone.md)


---

<a id="a-0017"></a>

### A-0017 — comparison MCQ 9 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 9] What is the output of the given code?

**Direct answer**

c) Error when run as the standalone supplied snippet: a is undefined.

**Detailed explanation**

b=9 is assignment, not comparison, and yields the truthy integer 9. If a were initialized to 10, the condition would succeed and assign b. With no earlier definition of a in this snippet, it raises NameError. The intended complete context is missing.

**Practical example**

```text
if(a==10 && b=9)
    print "true"
else
    print "false"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.
- Incomplete source: input or prior variable initialization is not supplied; conditional outcomes are stated instead of inventing it.

**Source references**

- SRC-00598 — [twentyone.txt:410–422](../ruby/twentyone.txt) (comparison-9) · [complete source](sources/twentyone.md)


---

<a id="a-0018"></a>

### A-0018 — operator MCQ 10 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 10] What will be the output of the given code?

**Direct answer**

b) false.

**Detailed explanation**

The negation of the truthy left OR expression is false, so the conjunction is false.

**Practical example**

```ruby
boolean_1 = !(3 < 4 || false) && (false || true)
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00609 — [twentyone.txt:517–526](../ruby/twentyone.txt) (operator-10) · [complete source](sources/twentyone.md)


---

<a id="a-0019"></a>

### A-0019 — operator MCQ 11 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 11] What will be the output of the given code?

**Direct answer**

a) true.

**Detailed explanation**

2**3 is 8 and 3**2 is 9; inequality is true. The trailing ||true also guarantees a truthy Boolean result here.

**Practical example**

```ruby
boolean_1 = 2**3 != 3**2 || true
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00610 — [twentyone.txt:527–536](../ruby/twentyone.txt) (operator-11) · [complete source](sources/twentyone.md)


---

<a id="a-0020"></a>

### A-0020 — operator MCQ 12 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 12] What will be the output of the given code?

**Direct answer**

b) false.

**Detailed explanation**

-10>-9 is false, so false||false returns false.

**Practical example**

```ruby
boolean_1 = false || -10 > -9
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00611 — [twentyone.txt:537–546](../ruby/twentyone.txt) (operator-12) · [complete source](sources/twentyone.md)


---

<a id="a-0021"></a>

### A-0021 — operator MCQ 13 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 13] What will be the output of the given code?

**Direct answer**

b) false.

**Detailed explanation**

700/10 is the integer 70; equality is true and negation makes it false.

**Practical example**

```ruby
boolean_1 = !(700 / 10 == 70)
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00612 — [twentyone.txt:547–556](../ruby/twentyone.txt) (operator-13) · [complete source](sources/twentyone.md)


---

<a id="a-0022"></a>

### A-0022 — operator MCQ 14 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 14] What will be the output of the given code?

**Direct answer**

b) false and false, on separate lines.

**Detailed explanation**

Both !true and !true&&!true evaluate to false.

**Practical example**

```ruby
boolean_1 = !true
puts boolean_1  
boolean_2 = !true && !true
puts boolean_2
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00613 — [twentyone.txt:557–568](../ruby/twentyone.txt) (operator-14) · [complete source](sources/twentyone.md)


---

<a id="a-0023"></a>

### A-0023 — operator MCQ 15 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 15] What will be the output of the given code?

**Direct answer**

b) false.

**Detailed explanation**

The leading !true is false, so && short-circuits without needing the right-hand expression.

**Practical example**

```ruby
boolean_2 = !true && (!true || 100 != 5**2)
puts boolean_2
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00614 — [twentyone.txt:569–585](../ruby/twentyone.txt) (operator-15) · [complete source](sources/twentyone.md)


---

<a id="a-0024"></a>

### A-0024 — operator MCQ 5 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 5] What will be the output of the given code?

**Direct answer**

b) false.

**Detailed explanation**

77<78 is true, but 77<77 is false; the conjunction returns false.

**Practical example**

```ruby
boolean_1 = 77 < 78 && 77 < 77
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00604 — [twentyone.txt:472–482](../ruby/twentyone.txt) (operator-5) · [complete source](sources/twentyone.md)


---

<a id="a-0025"></a>

### A-0025 — operator MCQ 9 What will be the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[operator MCQ 9] What will be the output of the given code?

**Direct answer**

a) true.

**Detailed explanation**

3<4||false is true; false||true is true; their conjunction is true.

**Practical example**

```ruby
boolean_1 = (3 < 4 || false) && (false || true)
puts boolean_1
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00608 — [twentyone.txt:507–516](../ruby/twentyone.txt) (operator-9) · [complete source](sources/twentyone.md)


---

<a id="a-0026"></a>

### A-0026 — unless MCQ 1 Syntax for unless conditional statement is

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 1] Syntax for unless conditional statement is

**Direct answer**

a) True.

**Detailed explanation**

unless condition; body; else; other; end is a valid ordinary unless form. The bracketed [then] denotes an optional keyword, not literal brackets in Ruby code.

**Practical example**

```ruby
condition = false
unless condition
  puts "condition is falsy"
else
  puts "condition is truthy"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00569 — [twentyone.txt:5–16](../ruby/twentyone.txt) (unless-1) · [complete source](sources/twentyone.md)


---

<a id="a-0027"></a>

### A-0027 — unless MCQ 10 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 10] What is the output of the given code?

**Direct answer**

b) It prints 4, 8 and length of x is less than that of y.

**Detailed explanation**

"ruby" has length four; "language" has length eight. puts x,y writes separate lines, and unless 4>8 executes the print.

**Practical example**

```ruby
x="ruby".length
y="language".length
puts x,y
unless x>y 
print "length of x is less than that of y"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00578 — [twentyone.txt:121–137](../ruby/twentyone.txt) (unless-10) · [complete source](sources/twentyone.md)


---

<a id="a-0028"></a>

### A-0028 — unless MCQ 11 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 11] What is the output of the given code?

**Direct answer**

b) It prints only x is less than y+1.

**Detailed explanation**

8<10 is true, so the first unless body is skipped. 8>11 is false, so the second body runs.

**Practical example**

```ruby
x=8
y=10
unless x<y
puts "x is less than y"
end
unless x>y+1
puts "x is less than y+1"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00579 — [twentyone.txt:138–156](../ruby/twentyone.txt) (unless-11) · [complete source](sources/twentyone.md)


---

<a id="a-0029"></a>

### A-0029 — unless MCQ 2 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 2] What is the output of the given code?

**Direct answer**

a) It prints x is greater than 2.

**Detailed explanation**

x>2 is true, so the unless body is skipped and else runs. The label is descriptive text, not an assertion that all values failing the first branch are strictly greater.

**Practical example**

```ruby
x=3
unless x>2
puts "x is less than 2"
else
puts "x is greater than 2"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00570 — [twentyone.txt:17–30](../ruby/twentyone.txt) (unless-2) · [complete source](sources/twentyone.md)


---

<a id="a-0030"></a>

### A-0030 — unless MCQ 3 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 3] What is the output of the given code?

**Direct answer**

d) It prints lines 1 and 3.

**Detailed explanation**

The integer 1 is truthy, so the first if executes and the following unless does not. After var=false, the last unless executes.

**Practical example**

```ruby
var =  1
print "1 -- Value is set\n" if var
print "2 -- Value is set\n" unless var
var = false
print "3 -- Value is set\n" unless var
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00571 — [twentyone.txt:31–46](../ruby/twentyone.txt) (unless-3) · [complete source](sources/twentyone.md)


---

<a id="a-0031"></a>

### A-0031 — unless MCQ 4 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 4] What is the output of the given code?

**Direct answer**

a) It prints Not hungry.

**Detailed explanation**

hungry is false, so unless hungry executes its first branch.

**Practical example**

```text
hungry=false
unless hungry
 print "Not hungry"
else
 print "Hungry"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00572 — [twentyone.txt:47–60](../ruby/twentyone.txt) (unless-4) · [complete source](sources/twentyone.md)


---

<a id="a-0032"></a>

### A-0032 — unless MCQ 5 The following syntax is also used for unless conditional statement.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 5] The following syntax is also used for unless conditional statement.

**Direct answer**

a) True.

**Detailed explanation**

Ruby supports the modifier form expression unless condition; it executes expression only for a falsy condition.

**Practical example**

```text
code unless conditional
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00573 — [twentyone.txt:61–67](../ruby/twentyone.txt) (unless-5) · [complete source](sources/twentyone.md)


---

<a id="a-0033"></a>

### A-0033 — unless MCQ 6 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 6] What is the output of the given code?

**Direct answer**

b) It prints 14.

**Detailed explanation**

12 is truthy, so the else branch computes counter+2. Ruby does not treat zero or other integers as falsy.

**Practical example**

```text
counter=12
unless counter
 print counter+1
else
 print counter+2
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00574 — [twentyone.txt:68–81](../ruby/twentyone.txt) (unless-6) · [complete source](sources/twentyone.md)


---

<a id="a-0034"></a>

### A-0034 — unless MCQ 7 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 7] What is the output of the given code?

**Direct answer**

It prints the lowercase String false (option b is closest).

**Detailed explanation**

true && false evaluates to false, so unless executes print "false". The output is a String and print returns nil. The option capitalizes False, which is not the exact output.

**Practical example**

```text
unless true && false
print "false"
else 
    print "ruby"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00575 — [twentyone.txt:82–94](../ruby/twentyone.txt) (unless-7) · [complete source](sources/twentyone.md)


---

<a id="a-0035"></a>

### A-0035 — unless MCQ 8 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 8] What is the output of the given code?

**Direct answer**

b) It prints 2 is less than 3.

**Detailed explanation**

2>3 is false, so the modifier unless allows the print call.

**Practical example**

```text
print "2 is less than 3" unless 2>3
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00576 — [twentyone.txt:95–103](../ruby/twentyone.txt) (unless-8) · [complete source](sources/twentyone.md)


---

<a id="a-0036"></a>

### A-0036 — unless MCQ 9 What is the output of the given code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

[unless MCQ 9] What is the output of the given code?

**Direct answer**

c) It prints both x is less than y and x is less than y+1 on separate lines.

**Detailed explanation**

Both 8>10 and 8>11 are false, so both unless bodies run.

**Practical example**

```ruby
x=8
y=10
unless x>y
puts "x is less than y"
end
unless x>y+1
puts "x is less than y+1"
end
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00577 — [twentyone.txt:104–120](../ruby/twentyone.txt) (unless-9) · [complete source](sources/twentyone.md)


---

<a id="a-0037"></a>

### A-0037 — Are Ruby operators actually methods?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Are Ruby operators actually methods?

**Direct answer**

Many Ruby operators dispatch methods, such as a + b becoming a.+(b), but syntax such as assignment and short-circuit &&/|| cannot be redefined as ordinary operator methods.

**Detailed explanation**

Overload only operators with meaningful domain semantics. Defining + for a vector lets addition remain readable while preserving its contract. Operator precedence remains fixed by Ruby’s grammar.

**Practical example**

```ruby
class Vector
  attr_reader :x, :y
  def initialize(x, y)
    @x, @y = x, y
  end
  def +(other) = Vector.new(x + other.x, y + other.y)
end
p (Vector.new(1, 2) + Vector.new(3, 4)).x # 4
```

**Important points and follow-ups**

- The source’s blanket “Yes” needs the syntax exceptions.

**Corrections and source limitations**

- Qualified claim that operators are methods and replaced questionable compact multiple-assignment initializer with standard syntax.

**Source references**

- SRC-00518 — [nineteen.txt:356–370](../ruby/nineteen.txt) (17) · [complete source](sources/nineteen.md)


---

<a id="a-0038"></a>

### A-0038 — Can you explain how Ruby looks up a method to invoke?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Can you explain how Ruby looks up a method to invoke?

**Direct answer**

Ruby follows the receiver’s method lookup chain, including singleton-class ancestry, prepended modules, its class, included modules and superclasses. If resolution fails it invokes method_missing.

**Detailed explanation**

Within each ancestry segment, prepend appears before the owning class and include after it. super resumes after the currently executing implementation. Active refinements can also affect lookup. The default missing-method behavior raises NoMethodError, a NameError subclass.

**Practical example**

```ruby
module A; def hello = "A"; end
class User; include A; end
p User.ancestors
p User.new.hello
```

**Important points and follow-ups**

- The hook is method_missing, not method_missing?.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/calling_methods_rdoc.html

**Corrections and source limitations**

- Corrected nonexistent method_missing? name and oversimplified lookup order.

**Source references**

- SRC-00354 — [nine.txt:638–641](../ruby/nine.txt) (83) · [complete source](sources/nine.md)


---

<a id="a-0039"></a>

### A-0039 — Define Ruby methods?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Define Ruby methods?

**Direct answer**

Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.

**Detailed explanation**

Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.

**Practical example**

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Asha", punctuation: ".") # "Hello, Asha."
```

**Important points and follow-ups**

- A method can return nil, false, a collection or any other Ruby value.

**Source references**

- SRC-00286 — [nine.txt:106–109](../ruby/nine.txt) (15) · [complete source](sources/nine.md)


---

<a id="a-0040"></a>

### A-0040 — Describe recent trends and advancements in the Ruby language.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe recent trends and advancements in the Ruby language.

**Direct answer**

Discuss concrete versioned changes such as JIT work, runtime/GC improvements, typing tooling and concurrency support, and verify release notes for the runtime used by the interviewer.

**Detailed explanation**

Recent trends in Ruby include:

Performance improvements: Efforts to enhance Ruby's performance including JIT compilation and optimizations.
Type checking: Tools like 'Sorbet' introduce optional static typing to improve code quality.
Concurrency improvements: Exploring alternative concurrency models to better utilize multi-core processors.
Community growth: Increased focus on diversity and inclusion in the Ruby community.
WebAssembly exploration: Investigating the potential of using WebAssembly to run Ruby in browsers.

**Practical example**

```bash
ruby -v
ruby --help
```

**Important points and follow-ups**

- "Recent" is relative to a release date. The source’s trend list is qualitative and does not establish current adoption statistics.

**Source references**

- SRC-00075 — [first.txt:460–467](../ruby/first.txt) (15) · [complete source](sources/first.md)


---

<a id="a-0041"></a>

### A-0041 — Describe the 'method' method and its applications.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe the 'method' method and its applications.

**Direct answer**

Object#method returns a bound Method object that preserves its receiver and can be inspected or called later.

**Detailed explanation**

The 'method' method in Ruby is used to retrieve a Method object associated with a particular method name of an object. This Method object allows dynamic invocation of methods, even those defined in modules or classes that the object inherits from.

This is especially useful in scenarios where method names are determined at runtime or when you need to store a reference to a method to be called later. It creates more flexible and dynamic code structures.

**Practical example**

```ruby
printer = "hello".method(:upcase)
p printer.call # "HELLO"
```

**Important points and follow-ups**

- Use public_method or an allowlist when method selection comes from untrusted data.

**Source references**

- SRC-00063 — [first.txt:397–401](../ruby/first.txt) (3) · [complete source](sources/first.md)


---

<a id="a-0042"></a>

### A-0042 — Describe the difference between 'puts' and 'print' statements.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe the difference between 'puts' and 'print' statements.

**Direct answer**

puts prints values followed by line endings; print adds no newline. Both return nil. p prints inspect representations for debugging.

**Detailed explanation**

In Ruby, both puts and print are used to output data to the console, but they behave slightly differently.

puts (short for "put string") outputs the data you give it followed by a newline character (\n), which moves the cursor to the next line. This means that every call to puts will begin on a new line. It's ideal for displaying messages or data where you want each piece of output to appear on a separate line.

On the other hand, print outputs the data you give it exactly as is, without adding a newline character. This means that unless you specifically include a newline character (\n) in your output, print continues printing on the same line. This can be useful if you want to format your output more precisely or if you want to display output on the same line as input.

**Practical example**

```ruby
print "Hi"
puts " there"
p [1, 2]
```

**Important points and follow-ups**

- puts recursively prints array elements; p preserves the array representation.

**Source references**

- SRC-00009 — [first.txt:57–63](../ruby/first.txt) (9) · [complete source](sources/first.md)


---

<a id="a-0043"></a>

### A-0043 — Differentiate between '==' and 'equal?' comparison operators.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Differentiate between '==' and 'equal?' comparison operators.

**Direct answer**

== expresses class-defined value equality; equal? checks whether references identify the same object. eql? together with hash controls ordinary Hash-key equivalence.

**Detailed explanation**

== is class-defined equality and equal? conventionally tests object identity. equal? is technically redefinable in Ruby, but the identity contract should not be changed. Hash lookup uses eql? and hash, which custom value objects must implement consistently.

**Practical example**

```ruby
a = "hi"; b = "hi"
p [a == b, a.equal?(b)] # [true, false]
```

**Important points and follow-ups**

- Ruby permits overriding equal? but its documented contract is identity; overriding it is strongly discouraged.

**Corrections and source limitations**

- Source correction: == is class-defined equality and equal? conventionally tests object identity. equal? is technically redefinable in Ruby, but the identity contract should not be changed. Hash lookup uses eql? and hash, which custom value objects must implement consistently.

**Source references**

- SRC-00019 — [first.txt:155–159](../ruby/first.txt) (19) · [complete source](sources/first.md)


---

<a id="a-0044"></a>

### A-0044 — Discuss the role of Ruby in creating and manipulating XML and JSON data.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Discuss the role of Ruby in creating and manipulating XML and JSON data.

**Direct answer**

JSON serializes Ruby arrays/hashes/scalars; XML libraries parse or build XML documents. Require the relevant library explicitly and handle untrusted input safely.

**Detailed explanation**

JSON is commonly available through require "json". XML parsing/building uses an appropriate library such as REXML; default/bundled gem packaging depends on Ruby version. Do not treat an XML/JSON parser as automatically safe for all untrusted input.

**Practical example**

```ruby
require "json"
p JSON.parse(JSON.generate({name: "Ana"}))
```

**Important points and follow-ups**

- Library packaging changes across Ruby versions. Avoid unsafe YAML deserialization and unrestricted XML entity expansion.

**Corrections and source limitations**

- Source correction: JSON is commonly available through require "json". XML parsing/building uses an appropriate library such as REXML; default/bundled gem packaging depends on Ruby version. Do not treat an XML/JSON parser as automatically safe for all untrusted input.

**Source references**

- SRC-00060 — [first.txt:369–380](../ruby/first.txt) (30) · [complete source](sources/first.md)


---

<a id="a-0045"></a>

### A-0045 — Explain About Float, Dig And Max?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain About Float, Dig And Max?

**Direct answer**

The intended names are Float, Float::DIG and Float::MAX. Float is Ruby’s floating-point numeric class; DIG describes guaranteed decimal precision, and MAX is the largest finite representable Float.

**Detailed explanation**

Float values use a finite binary representation, so many decimal fractions are inexact. These constants describe representation limits rather than tasks called “dig” and “max”. Do not confuse Float::DIG with Hash#dig, or Float::MAX with an arbitrary-precision integer limit.

**Practical example**

```ruby
p Float::DIG
p Float::MAX
p 0.1 + 0.2 == 0.3 # false on usual IEEE-754 runtimes
```

**Important points and follow-ups**

- Use BigDecimal for domain needs requiring decimal arithmetic.
- Reference: https://docs.ruby-lang.org/en/3.4/Float.html

**Corrections and source limitations**

- Corrected nonsensical Float/Dig/Max descriptions and capitalization.

**Source references**

- SRC-00331 — [nine.txt:501–508](../ruby/nine.txt) (60) · [complete source](sources/nine.md)


---

<a id="a-0046"></a>

### A-0046 — Explain About Ruby Names?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain About Ruby Names?

**Direct answer**

Ruby identifiers communicate scope: locals usually begin lowercase or _, constants uppercase, instance variables @, class variables @@ and globals $.

**Detailed explanation**

Use snake_case for methods and locals and CamelCase for classes/modules. Method names may end with ?, ! or = and some operators can be method names. These conventions are more specific than the source’s ambiguous statement that any first character is acceptable.

**Practical example**

```ruby
MAX_RETRIES = 3
user_name = "Asha"
@attempts = 0
```

**Important points and follow-ups**

- Reserved words and syntax constrain valid identifiers.

**Source references**

- SRC-00338 — [nine.txt:535–538](../ruby/nine.txt) (67) · [complete source](sources/nine.md)


---

<a id="a-0047"></a>

### A-0047 — Explain About The Command Line Options?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain About The Command Line Options?

**Direct answer**

Common Ruby command-line options include -e for an expression, -r to require a library, -I to add a load path, -w for warnings, -c for syntax checking and -v for version information.

**Detailed explanation**

Use ruby --help for the exact runtime’s flags. Historical options such as taint-related -T belong to removed Ruby security mechanisms and should not be recommended in modern Ruby. ARGV contains remaining script arguments.

**Practical example**

```text
ruby -v
ruby -c app.rb
ruby -rjson -e 'puts JSON.generate({ok: true})'
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/ruby/options_md.html

**Corrections and source limitations**

- Flagged removed taint/safe-level option -T in old source.

**Source references**

- SRC-00340 — [nine.txt:543–546](../ruby/nine.txt) (69) · [complete source](sources/nine.md)


---

<a id="a-0048"></a>

### A-0048 — Explain Assuming Rails Methods Are Built-in Ruby Methods.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Assuming Rails Methods Are Built-in Ruby Methods.

**Direct answer**

Methods such as blank?, present? and duration helpers such as 2.days come from Rails/Active Support, not plain Ruby core.

**Detailed explanation**

A standalone Ruby script can explicitly require the relevant Active Support extension when that dependency is intended. Otherwise use native methods with the correct semantics: empty? does not test whitespace-only strings, and nil does not implement empty?.

**Practical example**

```ruby
p " ".empty? # false in Ruby
# With Active Support loaded: " ".blank? is true.
```

**Important points and follow-ups**

- Core, standard libraries, gems and Rails extensions are different layers.

**Source references**

- SRC-00449 — [thirteen.txt:124–132](../ruby/thirteen.txt) (concept-10) · [complete source](sources/thirteen.md)


---

<a id="a-0049"></a>

### A-0049 — Explain Bang Methods.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Bang Methods.

**Direct answer**

A ! suffix conventionally marks a more dangerous counterpart, often mutation, but the language does not enforce a universal meaning.

**Detailed explanation**

String#reverse! mutates while reverse returns another String; Rails save! raises on failure while save reports failure differently. Non-bang methods can mutate, and some bang methods return nil when no modification is required.

**Practical example**

```ruby
text = +"ruby"
p text.reverse # "ybur", text stays ruby
text.reverse!
p text # "ybur"
```

**Important points and follow-ups**

- Read the method’s contract instead of inferring all semantics from punctuation.

**Source references**

- SRC-00446 — [thirteen.txt:95–102](../ruby/thirteen.txt) (concept-7) · [complete source](sources/thirteen.md)


---

<a id="a-0050"></a>

### A-0050 — Explain break statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain break statement in Ruby?

**Direct answer**

break exits the current loop or iterator call and may supply that expression’s result.

**Detailed explanation**

Use it when the desired condition has been satisfied or continuing is no longer useful. next skips to the next iteration, redo repeats the current one, and return exits the enclosing method; these control-flow targets differ.

**Practical example**

```ruby
result = loop do
  break :finished
end
p result # :finished
```

**Important points and follow-ups**

- The behavior of nonlocal exits inside stored procs/lambdas has additional context rules.

**Source references**

- SRC-00282 — [nine.txt:88–91](../ruby/nine.txt) (11) · [complete source](sources/nine.md)


---

<a id="a-0051"></a>

### A-0051 — Explain break statement in Ruby.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain break statement in Ruby.

**Direct answer**

break exits the enclosing loop or iterator and may supply its result value.

**Detailed explanation**

next skips the remainder of one iteration; redo restarts the same iteration; return exits a method. Proc/lambda context affects nonlocal control-flow behavior, so do not treat them as interchangeable.

**Practical example**

```ruby
result = [1, 2, 3].each { |n| break n if n.even? }
result # 2
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00734 — [thirty.txt:197–198](../ruby/thirty.txt) (50) · [complete source](sources/thirty.md)


---

<a id="a-0052"></a>

### A-0052 — Explain case statement in Ruby.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain case statement in Ruby.

**Direct answer**

case/when compares candidates using the when value’s === method; pattern-matching case/in uses different matching semantics.

**Detailed explanation**

It supports classes, ranges and regexes as useful conditions. A case expression returns the selected branch value. Ruby’s equality operators are distinct and the right operator depends on intent.

**Practical example**

```text
case age
when 0..17 then "minor"
else "adult"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00730 — [thirty.txt:183–185](../ruby/thirty.txt) (46) · [complete source](sources/thirty.md)


---

<a id="a-0053"></a>

### A-0053 — Explain do while loop in Ruby.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain do while loop in Ruby.

**Direct answer**

Ruby can express a post-test loop with begin ... end while condition, though loop with an explicit break is often clearer.

**Detailed explanation**

A post-test loop runs the body at least once. There is no C-style do { ... } while syntax. Ensure the loop has a reachable termination condition.

**Practical example**

```ruby
n = 0
loop do
  n += 1
  break if n >= 3
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00732 — [thirty.txt:191–193](../ruby/thirty.txt) (48) · [complete source](sources/thirty.md)


---

<a id="a-0054"></a>

### A-0054 — Explain Dynamic Typing.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Dynamic Typing.

**Direct answer**

Ruby, similar to Python and JavaScript, is a dynamically typed language, which means that you don't have to declare the type of a variable when you define it. Ruby will figure it out for you. Variables are just names for containers that hold references to objects. The type of variable is simply the type of the object they reference.

**Detailed explanation**

Ruby, similar to Python and JavaScript, is a dynamically typed language, which means that you don't have to declare the type of a variable when you define it. Ruby will figure it out for you. Variables are just names for containers that hold references to objects. The type of variable is simply the type of the object they reference.

In addition, Ruby is strongly typed (unlike JavaScript), which enforces type-checking during runtime. While you don't have to explicitly define a variable's type, once the type is assigned, Ruby won't automatically convert one type to another without explicit instruction.

Here's an example:

Ruby
x = "Hello, Interviewing.io!"  # x is a String
x = 42  # Now x is an Integer

# Ruby won't automatically convert a string into a number
y = "5"
z = y + 2  # This will raise an error because Ruby is strongly typed

**Practical example**

```ruby
x = "Hello, Interviewing.io!"  # x is a String
x = 42  # Now x is an Integer
# Ruby won't automatically convert a string into a number
y = "5"
z = y + 2  # This will raise an error because Ruby is strongly typed
```

**Important points and follow-ups**

- The original source discussion and all examples are retained separately for traceability.

**Source references**

- SRC-00443 — [thirteen.txt:46–59](../ruby/thirteen.txt) (concept-4) · [complete source](sources/thirteen.md)


---

<a id="a-0055"></a>

### A-0055 — Explain for loop in Ruby.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain for loop in Ruby.

**Direct answer**

Ruby offers each and other iterators, for, while, until and loop; choose the form that states the traversal or condition clearly.

**Detailed explanation**

for iterates an Enumerable and does not introduce a block-local scope in the same way as each’s block. while repeats while a condition is truthy; until repeats until it is truthy. Most collection transformations are clearer with map/select/reduce.

**Practical example**

```text
[1, 2, 3].each { |n| puts n }
3.times { |i| puts i }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00731 — [thirty.txt:186–190](../ruby/thirty.txt) (47) · [complete source](sources/thirty.md)


---

<a id="a-0056"></a>

### A-0056 — Explain How Can We Define Ruby Regular Expressions?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain How Can We Define Ruby Regular Expressions?

**Direct answer**

Write Regexp patterns as /pattern/options, %r{pattern} or Regexp.new(text).

**Detailed explanation**

Use match? for a Boolean test without retaining captures, match for MatchData and scan for multiple matches. Escape literal external text with Regexp.escape when constructing a pattern. Validate input-size and complexity risks for untrusted patterns.

**Practical example**

```ruby
pattern = /\A[a-z]+\z/i
p pattern.match?("Ruby") # true
p "a1 b2".scan(/\d/) # ["1", "2"]
```

**Important points and follow-ups**

- A and z anchor the entire String; ^ and $ are line anchors.

**Source references**

- SRC-00342 — [nine.txt:556–559](../ruby/nine.txt) (71) · [complete source](sources/nine.md)


---

<a id="a-0057"></a>

### A-0057 — Explain Implicit Returns.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Implicit Returns.

**Direct answer**

Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.

**Detailed explanation**

Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.

**Practical example**

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Asha", punctuation: ".") # "Hello, Asha."
```

**Important points and follow-ups**

- A method can return nil, false, a collection or any other Ruby value.

**Source references**

- SRC-00445 — [thirteen.txt:84–94](../ruby/thirteen.txt) (concept-6) · [complete source](sources/thirteen.md)


---

<a id="a-0058"></a>

### A-0058 — Explain Misunderstanding throw/catch and raise/rescue.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Misunderstanding throw/catch and raise/rescue.

**Direct answer**

raise/rescue handles exceptions; catch/throw performs nonlocal control flow using a matching tag.

**Detailed explanation**

throw unwinds to a corresponding catch and can carry a result value. Tags are not restricted to symbols, though symbols are common. A throw without a matching catch raises UncaughtThrowError. This is different from exception-class matching and should not substitute for errors that callers need to classify.

**Practical example**

```ruby
result = catch(:found) do
  [1, 2, 3].each { |n| throw :found, n if n.even? }
  nil
end
p result # 2
```

**Important points and follow-ups**

- ensure cleanup can run during either kind of ordinary stack unwinding.

**Source references**

- SRC-00456 — [thirteen.txt:249–272](../ruby/thirteen.txt) (concept-17) · [complete source](sources/thirteen.md)


---

<a id="a-0059"></a>

### A-0059 — Explain Not Knowing the Difference Between == and eql? Operators.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Not Knowing the Difference Between == and eql? Operators.

**Direct answer**

== expresses class-specific value equality; equal? tests object identity; eql? together with hash determines Hash-key equality; === provides class-specific case matching.

**Detailed explanation**

Integer distinguishes 1.eql?(1.0) from 1 == 1.0, but eql? is not a universal built-in “compare value and type” algorithm: classes define their own behavior. If two objects are eql?, they must return the same hash. A case/when clause effectively asks pattern === value, so Class, Range and Regexp give different matching meanings.

**Practical example**

```ruby
p 1 == 1.0       # true
p 1.eql?(1.0)    # false
p (1..3) === 2   # true
s = "a"; p s.equal?(s) # true
```

**Important points and follow-ups**

- Never override equal? to implement ordinary value equality.
- Keep key fields stable while an object is in a Hash.
- Reference: https://docs.ruby-lang.org/en/3.4/Object.html

**Source references**

- SRC-00447 — [thirteen.txt:103–120](../ruby/thirteen.txt) (concept-8) · [complete source](sources/thirteen.md)


---

<a id="a-0060"></a>

### A-0060 — Explain Not Using Idiomatic Ruby.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Not Using Idiomatic Ruby.

**Direct answer**

Idiomatic Ruby favors clear Enumerable operations, consistent method-call syntax and explicit distinction between text keys and identifier keys.

**Detailed explanation**

Style guidelines are conventions, not correctness proofs. The source changes {"one"=>1} to {one:1}, which changes String keys into Symbol keys and is not a semantics-preserving rewrite. Ternaries and modifier conditions are appropriate only when readable. Do not add a gap between a called method name and parenthesized arguments.

**Practical example**

```text
p({ "one" => 1 }["one"]) # 1
p({ one: 1 }["one"]) # nil
```

**Important points and follow-ups**

- Choose a project style guide, but preserve behavior when applying it.

**Corrections and source limitations**

- Corrected supposedly equivalent String-key-to-Symbol-key style transformation.

**Source references**

- SRC-00457 — [thirteen.txt:273–283](../ruby/thirteen.txt) (concept-18) · [complete source](sources/thirteen.md)


---

<a id="a-0061"></a>

### A-0061 — Explain Parentheses are Optional.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Parentheses are Optional.

**Direct answer**

Parentheses can be omitted in many Ruby method calls, but whitespace and argument grouping can change parsing.

**Detailed explanation**

Use ordinary call syntax such as sum(1, 2), especially with several arguments or nested calls. DSLs and keyword-like methods often omit parentheses by convention. Style rules about when to use them are recommendations; valid parsing is a language constraint.

**Practical example**

```ruby
def sum(a, b) = a + b
p sum(1, 2) # 3
# sum (1, 2) is invalid syntax.
```

**Important points and follow-ups**

- A space before an opening parenthesis can be significant.

**Source references**

- SRC-00453 — [thirteen.txt:174–203](../ruby/thirteen.txt) (concept-14) · [complete source](sources/thirteen.md)


---

<a id="a-0062"></a>

### A-0062 — Explain redo statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain redo statement in Ruby?

**Direct answer**

redo repeats the current loop iteration without advancing the iterator or rechecking the loop condition first.

**Detailed explanation**

This is useful only when the repeated body will change the condition that caused the redo. Otherwise it can loop forever. retry is different: modern Ruby permits it in rescue to restart a protected begin body.

**Practical example**

```ruby
attempt = 0
1.times do
  attempt += 1
  redo if attempt < 2
end
p attempt # 2
```

**Important points and follow-ups**

- A redo repeats the same yielded item.

**Source references**

- SRC-00283 — [nine.txt:92–95](../ruby/nine.txt) (12) · [complete source](sources/nine.md)


---

<a id="a-0063"></a>

### A-0063 — Explain retry statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain retry statement in Ruby?

**Direct answer**

In modern Ruby retry is valid in a rescue clause and restarts the corresponding begin body; it does not restart an arbitrary loop.

**Detailed explanation**

Track an attempt limit and retry only failures expected to be transient. Retrying an operation with external effects requires idempotency or a rollback strategy. Use redo to repeat the current loop iteration without rechecking the condition.

**Practical example**

```ruby
attempts = 0
begin
  attempts += 1
  raise "transient" if attempts < 2
rescue RuntimeError
  retry if attempts < 3
  raise
end
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/syntax/exceptions_rdoc.html

**Corrections and source limitations**

- Corrected obsolete/wrong claim that retry restarts a whole loop.

**Source references**

- SRC-00284 — [nine.txt:96–101](../ruby/nine.txt) (13) · [complete source](sources/nine.md)


---

<a id="a-0064"></a>

### A-0064 — Explain Ruby data types.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Ruby data types.

**Direct answer**

Common Ruby value classes include Integer, Float, Rational, Complex, String, Symbol, Array, Hash, Range, Time, TrueClass, FalseClass and NilClass. All are object types.

**Detailed explanation**

Dynamic typing means a variable can reference different classes over time; it does not mean Ruby silently accepts incompatible operations. Ruby presents no separate nonobject primitive type hierarchy to application code, even though CRuby uses efficient immediate internal representations for some values. Integers grow subject to available memory; Float uses finite precision.

**Practical example**

```ruby
p [42, 3.5, "hi", :name, [], {}, nil].map(&:class)
```

**Important points and follow-ups**

- "5" + 2 raises TypeError; use an intentional conversion such as Integer("5").

**Source references**

- SRC-00279 — [nine.txt:66–77](../ruby/nine.txt) (8) · [complete source](sources/nine.md)


---

<a id="a-0065"></a>

### A-0065 — Explain Ruby exceptions?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Ruby exceptions?

**Direct answer**

An exception is an object describing an abnormal condition and transferring control to a matching rescue handler.

**Detailed explanation**

If nothing handles it, it propagates and can terminate a thread or process. Application exceptions usually inherit StandardError, which bare rescue catches; Exception also includes system-level classes that should not normally be swallowed.

**Practical example**

```text
begin
  Integer("not a number")
rescue ArgumentError => error
  warn error.message
end
```

**Important points and follow-ups**

- Use error classes to decide recovery behavior, not arbitrary message matching.

**Source references**

- SRC-00314 — [nine.txt:343–346](../ruby/nine.txt) (43) · [complete source](sources/nine.md)


---

<a id="a-0066"></a>

### A-0066 — Explain Some Of The Looping Structures Available In Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

Explain Some Of The Looping Structures Available In Ruby?

**Direct answer**

Ruby offers while, until, for, loop and iterator methods such as each, times, upto and step.

**Detailed explanation**

Choose an iterator for collection work, a bounded numeric iterator for repetition and while/until for state-driven loops. for does not create a new block-local scope the way an each block does. Use break, next and redo for distinct control-flow behavior.

**Practical example**

```text
3.times { |n| puts n }
[1, 2].each { |n| puts n * 2 }
```

**Important points and follow-ups**

- Do not call retry a general loop-restart statement in modern Ruby.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- for does not introduce a block-local scope the way each’s block does. String interpolation requires double quotes, not the source’s single-quoted examples.

**Source references**

- SRC-00199 — [six.txt:2161–2281](../ruby/six.txt) (Q23) · [complete source](sources/six.md)
- SRC-00347 — [nine.txt:586–591](../ruby/nine.txt) (76) · [complete source](sources/nine.md)
- SRC-01187 — [twentyeight.txt:329–332](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00199 (six.txt)</summary>

**Original prompt:** What are the different types of loops in Ruby?

**Answer:** Ruby supports while/until/for and iterator methods such as each, times, upto/downto and loop. break exits, next skips ahead and redo restarts the current iteration without rechecking the condition.

Ruby supports while/until/for and iterator methods such as each, times, upto/downto and loop. break exits, next skips ahead and redo restarts the current iteration without rechecking the condition. for does not introduce a block-local scope the way each’s block does. String interpolation requires double quotes, not the source’s single-quoted examples.

```ruby
[1, 2, 3].each_with_index { |n, i| puts "#{i}: #{n}" }
3.times { |i| puts i }
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01187 (twentyeight.txt)</summary>

**Original prompt:** Explain some of the looping structures available in Ruby?

**Answer:** Ruby offers each and other iterators, for, while, until and loop; choose the form that states the traversal or condition clearly.

for iterates an Enumerable and does not introduce a block-local scope in the same way as each’s block. while repeats while a condition is truthy; until repeats until it is truthy. Most collection transformations are clearer with map/select/reduce.

```text
[1, 2, 3].each { |n| puts n }
3.times { |i| puts i }
```

</details>


---

<a id="a-0067"></a>

### A-0067 — Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the concept of duck typing in Ruby and how it differs from static typing in other programming languages.

**Direct answer**

Duck typing accepts objects that provide the required behavior, without requiring a common concrete class. Static type systems can also support structural interfaces.

**Detailed explanation**

Duck typing accepts objects that provide the required behavior, without requiring a common concrete class. Static type systems can also support structural interfaces. Static typing is not synonymous with explicit type annotations everywhere or a rigid class hierarchy.

**Practical example**

```ruby
def announce(object); object.to_s; end
p announce(123)
```

**Important points and follow-ups**

- Static typing is not synonymous with explicit type annotations everywhere or a rigid class hierarchy.

**Corrections and source limitations**

- Source correction/edge case: Static typing is not synonymous with explicit type annotations everywhere or a rigid class hierarchy.

**Source references**

- SRC-00132 — [three.txt:174–183](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0068"></a>

### A-0068 — Explain the difference between 'gets.chomp' and 'gets.strip'.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between 'gets.chomp' and 'gets.strip'.

**Direct answer**

chomp removes a record separator, normally one line ending; strip removes leading and trailing whitespace. Neither is interchangeable with the other.

**Detailed explanation**

gets can return nil at EOF. chomp preserves ordinary leading and trailing spaces, whereas strip removes them; passing a separator changes chomp’s behavior. Input cleaning is a domain decision, not general security validation.

**Practical example**

```ruby
line = "  Asha  \n"
p line.chomp # "  Asha  "
p line.strip # "Asha"
```

**Important points and follow-ups**

- Use $stdin.gets&.chomp when EOF is allowed.
- Reference: https://docs.ruby-lang.org/en/3.4/String.html

**Corrections and source limitations**

- Corrected false claim that chomp removes all trailing whitespace.

**Source references**

- SRC-00626 — [twentyfour.txt:561–585](../ruby/twentyfour.txt) (12) · [complete source](sources/twentyfour.md)


---

<a id="a-0069"></a>

### A-0069 — Explain the difference between #equal and #==.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between #equal and #==.

**Direct answer**

equal? compares object identity; == compares value according to the receiver’s implementation.

**Detailed explanation**

The source’s #equal name should be equal?. eql? and hash jointly control Hash key behavior and may differ from ==, for example for numeric types. Do not use object IDs as a substitute for a documented equality contract.

**Practical example**

```ruby
a = "ruby"
b = "ruby"
a == b # true
a.equal?(b) # false for these distinct strings
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00810 — [thirtyeight.txt:226–227](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0070"></a>

### A-0070 — Explain the difference between raise/rescue and throw/catch.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between raise/rescue and throw/catch.

**Direct answer**

raise/rescue implements exception handling; throw/catch implements nonlocal control flow using a matching tag.

**Detailed explanation**

A throw does not represent an Exception to be rescued in the usual way. Unmatched throw raises UncaughtThrowError. Use exceptions for errors and throw/catch only when tagged early exit makes the control flow clearer.

**Practical example**

```ruby
result = catch(:found) do
  [1, 2, 3].each { |n| throw(:found, n) if n.even? }
  nil
end # 2
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00812 — [thirtyeight.txt:230–231](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0071"></a>

### A-0071 — Explain the difference between:

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between:

**Direct answer**

x += " world" creates a concatenated String and reassigns x; x.concat(" world") mutates the existing String object.

**Detailed explanation**

If another variable references the original String, += leaves that reference pointing to the old contents, whereas concat changes what both references see. Frozen strings reject concat, but a variable referring to a frozen string can be rebound by +=.

**Practical example**

```ruby
x = +"hello"
other = x
x += " world"
p other # "hello"
other.concat("!")
p other # "hello!"
```

**Important points and follow-ups**

- Mutation and variable rebinding have different identity and aliasing behavior.

**Source references**

- SRC-00325 — [nine.txt:445–466](../ruby/nine.txt) (54) · [complete source](sources/nine.md)


---

<a id="a-0072"></a>

### A-0072 — Explain the Observer Pattern and its use.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the Observer Pattern and its use.

**Direct answer**

The Observer pattern lets subscribers react to events from a subject, reducing direct coupling between the subject and each reaction.

**Detailed explanation**

Historical Active Record observers are not a default modern Rails component. Depending on the use case, explicit domain events, ActiveSupport::Notifications for instrumentation, callbacks or durable after-commit/outbox work may be appropriate. In-process notification is not durable delivery.

**Practical example**

```text
ActiveSupport::Notifications.subscribe("checkout.completed") do |*args|
  event = ActiveSupport::Notifications::Event.new(*args)
  Rails.logger.info(event.payload[:order_id])
end
```

**Important points and follow-ups**

- Distinguish monitoring notifications from reliable business-event processing.

**Corrections and source limitations**

- Clarified that Rails observers were extracted from the default framework; modern behavior needs an explicit mechanism.

**Source references**

- SRC-00393 — [ten.txt:125–130](../ruby/ten.txt) (22) · [complete source](sources/ten.md)


---

<a id="a-0073"></a>

### A-0073 — Explain the principle of 'Convention over Configuration' in the context of Ruby.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the principle of 'Convention over Configuration' in the context of Ruby.

**Direct answer**

Convention over configuration means Rails uses predictable defaults so ordinary applications need less explicit wiring.

**Detailed explanation**

For example User normally maps to users, a conventional controller action can render its matching view and resources generates standard routes. Defaults can be overridden for real requirements. Conventions reduce decisions but require understanding the inferred behavior when debugging.

**Practical example**

```ruby
class User < ApplicationRecord
  # Default table: users
end
# self.table_name = "legacy_people" overrides the mapping when needed.
```

**Important points and follow-ups**

- This is mainly a framework design principle, not a Ruby grammar feature.

**Source references**

- SRC-00628 — [twentyfour.txt:637–673](../ruby/twentyfour.txt) (14) · [complete source](sources/twentyfour.md)


---

<a id="a-0074"></a>

### A-0074 — Explain the principle of DRY (Don't Repeat Yourself) in Ruby.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the principle of DRY (Don't Repeat Yourself) in Ruby.

**Direct answer**

DRY means keeping each piece of knowledge in one authoritative place. Extract methods, objects or modules when duplicated behavior represents the same responsibility.

**Detailed explanation**

DRY, or "Don't Repeat Yourself", is a fundamental principle in software development that aims to reduce repetition of code. The idea is to write code once and then reuse it, rather than duplicating it. This makes the code more maintainable, more readable, and less prone to errors.

In Ruby, there are several ways to adhere to the DRY principle:

Methods: If you find yourself writing the same code in multiple places, consider moving that code into a method, which can then be called from those places.
Classes and Objects: If you have a set of methods that operate on the same data, consider creating a class. The data can be stored in instance variables, and the methods can be defined as instance methods.
Modules: If you have methods that can be used across different classes, consider defining them in a module, which can then be mixed into those classes.

**Practical example**

```ruby
def total_cents(items)
  items.sum { |item| item.fetch(:price_cents) }
end
```

**Important points and follow-ups**

- Similar-looking code with different business meanings should not be forced into one abstraction.

**Source references**

- SRC-00017 — [first.txt:138–145](../ruby/first.txt) (17) · [complete source](sources/first.md)


---

<a id="a-0075"></a>

### A-0075 — Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the purpose of exceptions in Ruby and how they help handle errors and unexpected situations.

**Direct answer**

Exceptions interrupt normal flow until a matching rescue handles them. Rescue expected classes and keep ensure for cleanup, rather than silently hiding programming errors.

**Detailed explanation**

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

**Practical example**

```ruby
begin
  10 / 0
rescue ZeroDivisionError => e
  warn e.message
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00138 — [three.txt:296–317](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0076"></a>

### A-0076 — Explain the usage of the 'if' statement in Ruby.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the usage of the 'if' statement in Ruby.

**Direct answer**

if evaluates a condition and returns the selected branch’s result. Only nil and false fail Ruby conditionals; elsif and else handle alternatives.

**Detailed explanation**

The if statement in Ruby is used for conditional branching in code. It evaluates a condition and, if the condition is true, it executes a block of code. Here's a basic example:

if in ruby.jpeg

In this example, the if statement checks whether number is greater than 5. Because number is 10, which is indeed greater than 5, the code within the if block is executed, and "The number is greater than 5" is printed to the console.

You can also use the else keyword to specify a block of code to be executed if the condition is false:

else in ruby.jpeg

**Practical example**

```ruby
number = 10
if number > 5
  puts "The number is greater than 5"
else
  puts "The number is at most 5"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source refers to image-only examples that are not present in the text collection; replacement examples are authored and do not claim to reconstruct those images.

**Source references**

- SRC-00013 — [first.txt:94–104](../ruby/first.txt) (13) · [complete source](sources/first.md)


---

<a id="a-0077"></a>

### A-0077 — Explain the use of ensure statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the use of ensure statement in Ruby?

**Direct answer**

ensure runs cleanup while leaving the protected scope, whether the normal path or an exception path is taken.

**Detailed explanation**

It runs after begin/rescue/else as control unwinds, but cannot promise execution after abrupt process death, exit!, a killed runtime or machine failure. An explicit return in ensure can override a return or suppress an exception, so avoid it. Prefer block-based resource APIs when possible.

**Practical example**

```text
begin
  puts "work"
ensure
  puts "cleanup"
end
```

**Important points and follow-ups**

- ensure does not implicitly replace the enclosing expression’s result.

**Corrections and source limitations**

- Qualified source’s absolute “always runs” claim and added return-in-ensure caveat.

**Source references**

- SRC-00318 — [nine.txt:367–374](../ruby/nine.txt) (47) · [complete source](sources/nine.md)


---

<a id="a-0078"></a>

### A-0078 — Explain the use of retry statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the use of retry statement in Ruby?

**Direct answer**

In modern Ruby retry is valid in a rescue clause and restarts the corresponding begin body; it does not restart an arbitrary loop.

**Detailed explanation**

Track an attempt limit and retry only failures expected to be transient. Retrying an operation with external effects requires idempotency or a rollback strategy. Use redo to repeat the current loop iteration without rechecking the condition.

**Practical example**

```ruby
attempts = 0
begin
  attempts += 1
  raise "transient" if attempts < 2
rescue RuntimeError
  retry if attempts < 3
  raise
end
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/syntax/exceptions_rdoc.html

**Corrections and source limitations**

- Source syntax example was missing; supplied a bounded retry illustration.

**Source references**

- SRC-00317 — [nine.txt:359–366](../ruby/nine.txt) (46) · [complete source](sources/nine.md)


---

<a id="a-0079"></a>

### A-0079 — Explain this ruby idiom: a ||= b

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain this ruby idiom: a ||= b

**Direct answer**

a ||= b assigns b only when a is nil or false; a truthy value such as 0 is preserved.

**Detailed explanation**

It is useful for defaulting/memoization but cannot cache a legitimate false/nil result without another sentinel. With indexed or accessor assignment, the language’s evaluation/assignment behavior is more precise than simply copying a = a || b. It is not an atomic cross-thread initialization primitive.

**Practical example**

```ruby
a = false
a ||= 2 # a becomes 2
a = 0
a ||= 2 # a stays 0
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00676 — [sixteen.txt:158–185](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01173 — [twentyeight.txt:202–216](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0080"></a>

### A-0080 — Explain Truthy and Falsy Values.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Truthy and Falsy Values.

**Direct answer**

nil is the sole instance of NilClass and represents absence; false is the false Boolean value. Only nil and false are falsy in Ruby; 0, empty strings and empty collections are truthy.

**Detailed explanation**

A conditional tests truthiness rather than calling empty?. An empty? query asks whether a supported container has no elements, and nil.empty? raises. nil is a normal Ruby value: it can be assigned, returned and stored in arrays or hashes. Use nil? to distinguish absence from a valid false result.

**Practical example**

```ruby
p [nil, false, 0, "", []].map { |x| !!x } # [false, false, true, true, true]
p "".empty? # true
```

**Important points and follow-ups**

- Do not treat a valid false setting as missing.
- Rails blank? and present? are Active Support extensions.

**Source references**

- SRC-00441 — [thirteen.txt:34–36](../ruby/thirteen.txt) (concept-2) · [complete source](sources/thirteen.md)


---

<a id="a-0081"></a>

### A-0081 — Explain until loop in Ruby.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain until loop in Ruby.

**Direct answer**

until repeats its body while the condition is falsey and stops once the condition is truthy.

**Detailed explanation**

Use it when the positive end condition is easier to understand than a negated while. Like while it can execute zero times when the condition is already satisfied.

**Practical example**

```ruby
n = 0
until n == 3
  n += 1
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00733 — [thirty.txt:194–196](../ruby/thirty.txt) (49) · [complete source](sources/thirty.md)


---

<a id="a-0082"></a>

### A-0082 — Explain what the splat operator is.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what the splat operator is.

**Direct answer**

* gathers or expands positional arguments, while ** gathers or expands keyword arguments.

**Detailed explanation**

The meaning depends on definition versus call site. Ruby 3 separates positional hashes from keyword arguments, so forwarding often needs explicit **kwargs or ... . Splatting does not remove the need to design an understandable method interface.

**Practical example**

```ruby
def log(*messages, **options)
  [messages, options]
end
log("hello", level: :info)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00815 — [thirtyeight.txt:236–240](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00816 — [thirtyeight.txt:241–243](../ruby/thirtyeight.txt) (1) · [complete source](sources/thirtyeight.md)


---

<a id="a-0083"></a>

### A-0083 — Explain When to Employ and / or vs. && / ||.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain When to Employ and / or vs. && / ||.

**Direct answer**

and/or and &&/|| short-circuit but have different precedence, especially relative to assignment.

**Detailed explanation**

Use parentheses where call/assignment meaning might be ambiguous. Do not use or as a file-error handler around File.open: failed open normally raises, and Ruby has no standard die method. Rescue an expected filesystem exception instead.

**Practical example**

```ruby
result = nil or true
p result # nil
result = nil || true
p result # true
```

**Important points and follow-ups**

- Style preferences about and/or usage are recommendations rather than language restrictions.

**Corrections and source limitations**

- Corrected nonworking File.open(... ) or die example.

**Source references**

- SRC-00452 — [thirteen.txt:160–173](../ruby/thirteen.txt) (concept-13) · [complete source](sources/thirteen.md)


---

<a id="a-0084"></a>

### A-0084 — Explain while loop in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain while loop in Ruby?

**Direct answer**

while repeats its body while a condition is truthy, checking the condition before each ordinary iteration.

**Detailed explanation**

Update the state that controls termination. The modifier form has parsing nuances, and a begin...end while form checks after the body. Ruby offers until for the opposite condition and Enumerable operations for common collection iteration.

**Practical example**

```ruby
count = 0
while count < 3
  puts count
  count += 1
end
```

**Important points and follow-ups**

- nil and false stop the condition; zero does not.

**Source references**

- SRC-00281 — [nine.txt:82–87](../ruby/nine.txt) (10) · [complete source](sources/nine.md)


---

<a id="a-0085"></a>

### A-0085 — Find the error in the following code and correct it.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Find the error in the following code and correct it.

**Direct answer**

The shown greet method is valid Ruby. It prints a greeting and returns nil because puts returns nil.

**Detailed explanation**

There is no syntax error to fix. If the requirement is to return the greeting for another caller to use, remove puts and leave the interpolated string as the final expression. Printing and returning are different requirements.

**Practical example**

```ruby
def greet(name)
  "Hello, #{name}"
end
p greet("Alice")
```

**Important points and follow-ups**

- Do not invent a bug when the input is already valid.

**Corrections and source limitations**

- Source answer contradicts itself about whether puts should be used. Corrected to distinguish printing from returning.

**Source references**

- SRC-00247 — [eight.txt:60–72](../ruby/eight.txt) (Junior-06) · [complete source](sources/eight.md)


---

<a id="a-0086"></a>

### A-0086 — Given:

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Given:



```ruby
x = "hello"

```


Explain the difference between:



```ruby
x += " world"

```


and



```ruby
x.concat " world"

```

**Direct answer**

x += y computes x + y and rebinds x; x.concat(y) mutates the existing string so other references see the change.

**Detailed explanation**

The `+=` operator re-initializes the variable with a new value, so `a += b` is equivalent to `a = a + b`.


Therefore, while it may seem that `+=` is mutating the value, it’s actually creating a new object and pointing the the old variable to that new object.


This is perhaps easier to understand if written as follows:



```ruby
foo = "foo"
foo2 = foo
foo.concat "bar"

puts foo
=> "foobar"
puts foo2
=> "foobar"

foo += "baz"
puts foo
=> "foobarbaz"
puts foo2
=> "foobar"

```


(Examining the `object_id` of `foo` and `foo2` will also demonstrate that new objects are being created.)


The difference has implications for performance and also has different mutation behavior than one might expect.

**Practical example**

```ruby
x = +"hello"; other = x
x.concat(" world")
p other # "hello world"
x += "!"
p [x, other]
```

**Important points and follow-ups**

- concat raises on a frozen string. Assignment to x does not mutate other’s binding.

**Source references**

- SRC-00109 — [second.txt:161–200](../ruby/second.txt) (Q9) · [complete source](sources/second.md)


---

<a id="a-0087"></a>

### A-0087 — How an exception is handled in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How an exception is handled in Ruby?

**Direct answer**

Wrap an operation in begin/rescue, rescue the expected class and perform cleanup in ensure.

**Detailed explanation**

A rescue clause matches the named class and its subclasses; clauses are considered in order. else runs when the protected body succeeds without an exception. Re-raise with bare raise when the caller must still handle the failure.

**Practical example**

```text
begin
  value = Integer("12")
rescue ArgumentError
  value = nil
else
  puts value
ensure
  puts "finished"
end
```

**Important points and follow-ups**

- Do not replace a real failure with a success-looking default unless that is the API contract.

**Source references**

- SRC-00316 — [nine.txt:355–358](../ruby/nine.txt) (45) · [complete source](sources/nine.md)


---

<a id="a-0088"></a>

### A-0088 — How are errors handled in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How are errors handled in Ruby?

**Direct answer**

Handle expected exceptions with targeted rescue clauses, clean up with ensure and raise meaningful StandardError subclasses for recoverable application failures.

**Detailed explanation**

SystemCallError is itself a subclass of StandardError; these are not two disjoint top-level categories. A bare rescue catches StandardError descendants, not every Exception subclass. at_exit can observe termination and perform cleanup but is not a substitute for local recovery. Attempt the file read and handle the actual exception rather than relying only on a prior exists? check that can race.

**Practical example**

```ruby
def read_config(path)
  File.read(path)
rescue Errno::ENOENT => error
  warn error.message
  nil
end
```

**Important points and follow-ups**

- A custom exception inheriting directly from Exception will not be caught by a bare rescue.

**Corrections and source limitations**

- Corrected exception hierarchy, claim that every custom exception is rescued automatically, and check-before-read race.

**Source references**

- SRC-00622 — [twentyfour.txt:362–415](../ruby/twentyfour.txt) (8) · [complete source](sources/twentyfour.md)


---

<a id="a-0089"></a>

### A-0089 — How can developers contribute to the growth of the Ruby ecosystem?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How can developers contribute to the growth of the Ruby ecosystem?

**Direct answer**

Contribute reproducible bug reports, focused patches, tests, documentation, maintained gems and community support. Follow the project’s contribution process.

**Detailed explanation**

Developers can contribute to the Ruby ecosystem by:

Creating gems: Building and sharing useful gems that solve specific problems.
Contributing to open-source: Participating in open-source projects, improving existing libraries, and collaborating with the community.
Writing documentation: Creating clear and comprehensive documentation for gems and libraries.
Reporting bugs: Identifying and reporting bugs in gems, libraries, and tools to improve their quality.
Attending and organizing events: Participating in Ruby meetups, conferences, and workshops to share knowledge and learn from others.

**Practical example**

```text
# Useful report: Ruby version + operating system + minimal script + expected and actual output.
```

**Important points and follow-ups**

- Do not submit credentials or private application data in public bug reports.

**Source references**

- SRC-00074 — [first.txt:452–459](../ruby/first.txt) (14) · [complete source](sources/first.md)


---

<a id="a-0090"></a>

### A-0090 — How can you add a comment in Ruby code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How can you add a comment in Ruby code?

**Direct answer**

Use # for line or trailing comments. Ruby also supports =begin and =end at the beginning of a line for embedded documentation.

**Detailed explanation**

Use # for line or trailing comments. Ruby also supports =begin and =end at the beginning of a line for embedded documentation. The source’s missing screenshot cannot be inspected. Repeated # lines are a style choice, not a parser requirement.

**Practical example**

```ruby
# Explain why this is needed.
puts "Hello" # Prints a greeting
```

**Important points and follow-ups**

- The source’s missing screenshot cannot be inspected. Repeated # lines are a style choice, not a parser requirement.

**Corrections and source limitations**

- Source refers to image-only examples that are not present in the text collection; replacement examples are authored and do not claim to reconstruct those images.

**Source references**

- SRC-00007 — [first.txt:39–53](../ruby/first.txt) (7) · [complete source](sources/first.md)


---

<a id="a-0091"></a>

### A-0091 — How do comments and naming conventions work in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do comments and naming conventions work in Ruby?

**Direct answer**

Use # for line comments and =begin/=end at line starts for block comments. Conventionally methods and locals use snake_case, classes/modules use CamelCase and value constants use ALL_CAPS.

**Detailed explanation**

? and ! suffixes express intent rather than enforce return values or mutation in the language. Predicates conventionally return truthy/falsy results; bang names usually mark a more dangerous counterpart, which can mean mutation, exception raising or another semantic risk.

**Practical example**

```ruby
name = "ruby"
p name.upcase # "RUBY"; name is unchanged
name.upcase!
p name # "RUBY"
```

**Important points and follow-ups**

- A non-bang method such as String#concat can still mutate.

**Source references**

- SRC-00520 — [nineteen.txt:377–390](../ruby/nineteen.txt) (19) · [complete source](sources/nineteen.md)


---

<a id="a-0092"></a>

### A-0092 — How do the spaceship operator and Comparable work together?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do the spaceship operator and Comparable work together?

**Direct answer**

<=> returns a negative, zero or positive number according to ordering, or nil for incomparable operands; Comparable derives other comparison methods from it.

**Detailed explanation**

The common built-in result values are -1, 0 and 1, but the contract is the sign. Include Comparable and implement a consistent <=>. Return nil for unsupported comparisons rather than assuming every other object has the expected fields.

**Practical example**

```ruby
class Version
  include Comparable
  attr_reader :number
  def initialize(number) = @number = number
  def <=>(other)
    return nil unless other.is_a?(Version)
    number <=> other.number
  end
end
```

**Important points and follow-ups**

- Comparable does not automatically supply a Hash equality/hash contract.

**Source references**

- SRC-00529 — [nineteen.txt:547–563](../ruby/nineteen.txt) (28) · [complete source](sources/nineteen.md)


---

<a id="a-0093"></a>

### A-0093 — How do you create a Ruby script file and execute it on a command line?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you create a Ruby script file and execute it on a command line?

**Direct answer**

Save code in a .rb file and execute ruby filename.rb. Read script arguments from ARGV and interactive standard input from $stdin.

**Detailed explanation**

Use ruby -v to confirm the runtime and ruby -c file.rb to check syntax. Shell background syntax depends on the operating system: & has shell-specific behavior and is not a portable Ruby backgrounding API. The source’s Shell#open URL example is not a reliable browser-launching interface.

**Practical example**

```ruby
name = ARGV.first || $stdin.gets&.chomp || "guest"
puts "Hello, #{name}"
# ruby hello.rb Asha
```

**Important points and follow-ups**

- Handle EOF: gets may return nil.
- Keep process execution and browser launching separate from Ruby script syntax.

**Corrections and source limitations**

- Corrected nonportable backgrounding advice and unsupported require "shell"/Shell#open browser example.

**Source references**

- SRC-00616 — [twentyfour.txt:40–97](../ruby/twentyfour.txt) (2) · [complete source](sources/twentyfour.md)


---

<a id="a-0094"></a>

### A-0094 — How do you create comments in Ruby code?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you create comments in Ruby code?

**Direct answer**

Use # for a Ruby line comment; =begin and =end delimit a block comment when placed at the beginning of their lines.

**Detailed explanation**

Ruby ignores comments during execution. Explain intent and constraints rather than repeating the obvious code. A shebang and magic comments can have special interpreter effects, so their positions matter.

**Practical example**

```ruby
# Prices are stored as integer cents.
price_cents = 1250
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01417 — [twentythree.txt:176–178](../ruby/twentythree.txt) (Q25) · [complete source](sources/twentythree.md)


---

<a id="a-0095"></a>

### A-0095 — How do you define a method in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How do you define a method in Ruby?

**Direct answer**

Define methods with def, parameters and end. The last evaluated expression is returned unless return exits earlier.

**Detailed explanation**

In Ruby, a method is defined using the def keyword, followed by the method name. If the method takes parameters, they are placed in parentheses after the method name. The body of the method, which contains the code to be executed when the method is called, follows next. The method definition is concluded with the end keyword.

It's important to note that in Ruby, if the last statement of a method is an expression, its value will be returned by the method. This means you don't need to use the return keyword explicitly, although you can if you want to return early from a method.

**Practical example**

```ruby
def double(number)
  number * 2
end
p double(3) # 6
```

**Important points and follow-ups**

- A method can return nil, false, a collection or any other Ruby value.

**Source references**

- SRC-00003 — [first.txt:13–17](../ruby/first.txt) (3) · [complete source](sources/first.md)
- SRC-00243 — [eight.txt:28–35](../ruby/eight.txt) (Junior-02) · [complete source](sources/eight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00243 (eight.txt)</summary>

**Original prompt:** How do you define a method in Ruby?

**Answer:** Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.

Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Asha", punctuation: ".") # "Hello, Asha."
```

</details>


---

<a id="a-0096"></a>

### A-0096 — How do you define a method, and how does return work?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you define a method, and how does return work?

**Direct answer**

Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.

**Detailed explanation**

Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.

**Practical example**

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Asha", punctuation: ".") # "Hello, Asha."
```

**Important points and follow-ups**

- A method can return nil, false, a collection or any other Ruby value.

**Source references**

- SRC-00511 — [nineteen.txt:251–264](../ruby/nineteen.txt) (10) · [complete source](sources/nineteen.md)


---

<a id="a-0097"></a>

### A-0097 — How do you manage dependencies in Ruby projects?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you manage dependencies in Ruby projects?

**Direct answer**

A gem packages Ruby code and metadata. Bundler resolves dependencies declared in a Gemfile and records selected versions in Gemfile.lock; bundle exec selects that bundle when running a command.

**Detailed explanation**

Declare direct dependencies and constraints intentionally, install with bundle install and update selected dependencies with testing. Commit the application lockfile for reproducible development and CI installations. RubyGems supplies gem installation and distribution, while Bundler selects a consistent dependency set for a project; a gem need not be installed globally or published publicly.

**Practical example**

```ruby
# Gemfile
source "https://rubygems.org"
gem "rack"
# shell: bundle install
# shell: bundle exec ruby app.rb
```

**Important points and follow-ups**

- Example version pins in old articles are historical, not current upgrade recommendations.

**Corrections and source limitations**

- Rails 6.0.3 in the source Gemfile is a historical example, not a current version recommendation.

**Source references**

- SRC-00260 — [eight.txt:210–219](../ruby/eight.txt) (Mid-09) · [complete source](sources/eight.md)


---

<a id="a-0098"></a>

### A-0098 — How does case/when actually match, and what is ===?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does case/when actually match, and what is ===?

**Direct answer**

case/when evaluates patterns using pattern === target and runs the first matching branch. If nothing matches it runs else, or returns nil when else is absent.

**Detailed explanation**

Classes use === for instance membership, ranges for interval coverage, and regular expressions for matching. A case with no target instead tests branch truthiness. case is an expression, so it can return the selected branch’s result. case/in is a separate destructuring form with additional pattern rules.

**Practical example**

```text
case value
when Integer then "number"
when /\A[a-z]+\z/ then "letters"
else "other"
end
```

**Important points and follow-ups**

- Branch order matters: a broad class match can make a later narrower range branch unreachable.

**Source references**

- SRC-00535 — [nineteen.txt:643–660](../ruby/nineteen.txt) (34) · [complete source](sources/nineteen.md)


---

<a id="a-0099"></a>

### A-0099 — How Does Ruby Deal With Extremely Large Numbers?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How Does Ruby Deal With Extremely Large Numbers?

**Direct answer**

Ruby Integer supports arbitrarily large integer values subject to available memory and computation cost.

**Detailed explanation**

Since Ruby 2.4, Fixnum and Bignum were unified under Integer. CRuby may still use different internal representations for small and large integers, but applications should use Integer rather than branching on the old class names. Large-number operations have growing time and memory costs.

**Practical example**

```ruby
p (2 ** 100).class # Integer
p 2 ** 100
```

**Important points and follow-ups**

- “Arbitrary precision” does not mean unlimited physical resources.

**Corrections and source limitations**

- Updated historical Fixnum/Bignum class explanation.

**Source references**

- SRC-00336 — [nine.txt:527–530](../ruby/nine.txt) (65) · [complete source](sources/nine.md)


---

<a id="a-0100"></a>

### A-0100 — How does Ruby resolve a method call?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does Ruby resolve a method call?

**Direct answer**

Ruby follows the receiver’s method lookup chain, including singleton-class ancestry, prepended modules, its class, included modules and superclasses. If resolution fails it invokes method_missing.

**Detailed explanation**

Within each ancestry segment, prepend appears before the owning class and include after it. super resumes after the currently executing implementation. Active refinements can also affect lookup. The default missing-method behavior raises NoMethodError, a NameError subclass.

**Practical example**

```ruby
module A; def hello = "A"; end
class User; include A; end
p User.ancestors
p User.new.hello
```

**Important points and follow-ups**

- The hook is method_missing, not method_missing?.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/calling_methods_rdoc.html

**Source references**

- SRC-00544 — [nineteen.txt:825–841](../ruby/nineteen.txt) (43) · [complete source](sources/nineteen.md)


---

<a id="a-0101"></a>

### A-0101 — How is exception handling implemented in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

How is exception handling implemented in Ruby?

**Direct answer**

Use rescue for expected exceptions, else for success-only work and ensure for cleanup. Bare rescue handles StandardError, not all Exception descendants.

**Detailed explanation**

Exception handling in Ruby is implemented using begin, rescue, and ensure blocks.

The begin block contains the code that might raise an exception. If an exception occurs within the begin block, execution immediately shifts to the rescue block.

The rescue block contains the code that handles the exception. You can have multiple rescue blocks to handle different types of exceptions. If an exception is raised but not rescued, the program terminates.

The ensure block contains code that will always be executed, whether an exception was raised or not. This is typically used for cleanup activities, like closing files or network connections.

**Practical example**

```ruby
begin
  Integer("abc")
rescue ArgumentError => error
  warn error.message
ensure
  # Close owned resources here.
end
```

**Important points and follow-ups**

- Do not swallow errors or retry without a bound. ensure cannot guarantee cleanup after forced process termination.
- Resource-management block APIs are often clearer than manual cleanup.
- Do not replace a real failure with a success-looking default unless that is the API contract.

**Source references**

- SRC-00016 — [first.txt:129–137](../ruby/first.txt) (16) · [complete source](sources/first.md)
- SRC-00157 — [four.txt:47–62](../ruby/four.txt) (6) · [complete source](sources/four.md)
- SRC-00167 — [five.txt:30–33](../ruby/five.txt) · [complete source](sources/five.md)
- SRC-00248 — [eight.txt:73–86](../ruby/eight.txt) (Junior-07) · [complete source](sources/eight.md)
- SRC-00533 — [nineteen.txt:610–627](../ruby/nineteen.txt) (32) · [complete source](sources/nineteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00167 (five.txt)</summary>

**Original prompt:** How do you handle exceptions in Ruby code?

**Answer:** Use begin/rescue for expected error types and ensure for resource cleanup. Bare rescue catches StandardError.

Use begin/rescue for expected error types and ensure for resource cleanup. Bare rescue catches StandardError.

```ruby
begin
  Integer("bad")
rescue ArgumentError => e
  warn e.message
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00248 (eight.txt)</summary>

**Original prompt:** How do you handle exceptions in Ruby?

**Answer:** Use begin/rescue to handle expected exception classes and ensure for cleanup.

Rescue only failures for which this layer has a useful response; unexpected failures should generally propagate with context. A bare rescue catches StandardError, not all Exception subclasses. Ensure runs during ordinary stack unwinding and should not return a value that suppresses an error.

```text
begin
  1 / 0
rescue ZeroDivisionError => error
  puts error.message
ensure
  puts "cleanup"
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00533 (nineteen.txt)</summary>

**Original prompt:** How does exception handling work in Ruby?

**Answer:** Wrap an operation in begin/rescue, rescue the expected class and perform cleanup in ensure.

A rescue clause matches the named class and its subclasses; clauses are considered in order. else runs when the protected body succeeds without an exception. Re-raise with bare raise when the caller must still handle the failure.

```text
begin
  value = Integer("12")
rescue ArgumentError
  value = nil
else
  puts value
ensure
  puts "finished"
end
```

</details>


---

<a id="a-0102"></a>

### A-0102 — How is Ruby adapting to modern web development demands?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How is Ruby adapting to modern web development demands?

**Direct answer**

Rails offers APIs, background jobs, real-time features and frontend integrations, while Ruby runtime work improves execution. Choose features based on product needs and supported versions.

**Detailed explanation**

Ruby is adapting to modern web development demands by enhancing frameworks like Ruby on Rails. Features such as Action Cable for real-time communication and API mode for building APIs show its responsiveness to evolving needs. Additionally, community efforts are dedicated to integrating modern JavaScript libraries and optimizing performance to ensure Ruby remains relevant in web development.

**Practical example**

```text
# Example architecture: Rails JSON API + Action Cable notifications + background processing.
```

**Important points and follow-ups**

- Framework capabilities are separate from core language guarantees.

**Source references**

- SRC-00076 — [first.txt:468–470](../ruby/first.txt) (16) · [complete source](sources/first.md)


---

<a id="a-0103"></a>

### A-0103 — How is Ruby different from Python?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How is Ruby different from Python?

**Direct answer**

Ruby and Python are dynamic object-oriented languages; their syntax, object models, block conventions, method lookup and ecosystems differ.

**Detailed explanation**

Ruby commonly uses end-delimited blocks, implicit method returns, symbols and mixins, with single class inheritance. Python uses indentation, explicit return, and supports multiple class inheritance. Both support functions expressed in their own language models and anonymous callables; Python also has match/case since 3.10. The source’s IDE, community and “not object-oriented” claims are misleading.

**Practical example**

```text
Ruby: [1, 2, 3].map { |n| n * 2 }
Python: [n * 2 for n in [1, 2, 3]]
```

**Important points and follow-ups**

- Python classes can act as mixins; claiming mixins are impossible is incorrect.
- Ruby uses elsif, not elseif.
- Python yield creates a generator; Ruby yield calls the method’s supplied block.
- Reference: https://docs.python.org/3/tutorial/classes.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected multiple Ruby/Python table claims: Python OOP, mixins, match/case, Ruby elsif, and IDE myths.

**Source references**

- SRC-01443 — [twentythree.txt:718–745](../ruby/twentythree.txt) (Q51) · [complete source](sources/twentythree.md)


---

<a id="a-0104"></a>

### A-0104 — How to check whether a directory exist or not in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to check whether a directory exist or not in Ruby?

**Direct answer**

Use Dir.exist?(path) to check whether a path names an existing directory.

**Detailed explanation**

The old plural exists? aliases were deprecated and removed in modern Ruby. A prior existence check can race with subsequent operations, so operations that must succeed should also handle their actual filesystem errors.

**Practical example**

```ruby
p Dir.exist?(".") # true
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/Dir.html

**Corrections and source limitations**

- Replaced removed Dir.exists? with Dir.exist?.

**Source references**

- SRC-00313 — [nine.txt:334–342](../ruby/nine.txt) (42) · [complete source](sources/nine.md)


---

<a id="a-0105"></a>

### A-0105 — How to create a new time instance in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to create a new time instance in Ruby?

**Direct answer**

Time.now or Time.new with no arguments returns the current time. Time.new(year, month, day, ...) constructs a specified calendar time.

**Detailed explanation**

When components are supplied, defaults apply to omitted fields according to the method signature. Time zones and offsets should be explicit when converting between user-facing wall times and stored instants. A year is not required for the no-argument current-time constructor.

**Practical example**

```ruby
p Time.now
p Time.new(2026, 1, 1, 0, 0, 0, "+05:30")
```

**Important points and follow-ups**

- Time and Date serve different use cases.

**Corrections and source limitations**

- Corrected contradictory claim that Time.new always requires a year.

**Source references**

- SRC-00305 — [nine.txt:231–236](../ruby/nine.txt) (34) · [complete source](sources/nine.md)


---

<a id="a-0106"></a>

### A-0106 — How to open a file in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to open a file in Ruby?

**Direct answer**

Prefer File.open with a block so Ruby closes the file when the block exits, including on exceptions.

**Detailed explanation**

Use r for reading, w for truncating writes and a for append, with binary/encoding options when needed. File.new returns an open object that the caller must close; a mode cannot grant permissions denied by the operating system.

**Practical example**

```text
File.open("input.txt", "r") do |file|
  puts file.gets
end
```

**Important points and follow-ups**

- w can truncate existing files, so choose modes deliberately.

**Source references**

- SRC-00309 — [nine.txt:263–283](../ruby/nine.txt) (38) · [complete source](sources/nine.md)


---

<a id="a-0107"></a>

### A-0107 — How to read a file in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to read a file in Ruby?

**Direct answer**

Use gets for one line, read for the remaining contents, and readlines for an array of remaining lines; File.foreach streams lines without loading the entire file.

**Detailed explanation**

The methods read from the current file position. Prefer a block-based open or File.foreach so the descriptor is closed even if an exception occurs. Whole-file reads require memory proportional to input size.

**Practical example**

```text
File.open("input.txt", "r") do |f|
  first = f.gets
  rest = f.read
end
File.foreach("input.txt") { |line| puts line }
```

**Important points and follow-ups**

- The source typo f.rea should be f.read.

**Corrections and source limitations**

- Corrected truncated method name and missing closure in examples.

**Source references**

- SRC-00310 — [nine.txt:284–311](../ruby/nine.txt) (39) · [complete source](sources/nine.md)


---

<a id="a-0108"></a>

### A-0108 — How to use Ruby methods?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to use Ruby methods?

**Direct answer**

Define a method with def and call it on a receiver; Ruby returns the final evaluated expression unless return exits earlier. Methods can accept positional, keyword and block arguments.

**Detailed explanation**

Use normal names such as snake_case for readability; Ruby also permits operator methods and other nonconventional names. A bare assignment creates a local variable, while a writer call needs an explicit receiver such as self.name = value. Ruby 3 separates keyword arguments from positional hashes, so wrappers should forward *args, **kwargs and &block or use ... where appropriate.

**Practical example**

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Asha", punctuation: ".") # "Hello, Asha."
```

**Important points and follow-ups**

- A method can return nil, false, a collection or any other Ruby value.

**Source references**

- SRC-00288 — [nine.txt:114–119](../ruby/nine.txt) (17) · [complete source](sources/nine.md)


---

<a id="a-0109"></a>

### A-0109 — How to use Ruby's introspection capabilities to create more maintainable code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How to use Ruby's introspection capabilities to create more maintainable code?

**Direct answer**

Use respond_to?, method, parameters, ancestors and instance_variables to inspect capabilities and dispatch explicitly; reflection should support clear APIs rather than replace them.

**Detailed explanation**

Use respond_to?, method, parameters, ancestors and instance_variables to inspect capabilities and dispatch explicitly; reflection should support clear APIs rather than replace them. A method_missing implementation should pair with respond_to_missing?. Treat externally supplied names as untrusted input.

**Practical example**

```ruby
p "hello".respond_to?(:upcase)
p "hello".method(:upcase).arity
p String.ancestors
```

**Important points and follow-ups**

- A method_missing implementation should pair with respond_to_missing?. Treat externally supplied names as untrusted input.

**Source references**

- SRC-00216 — [twelve.txt:28–29](../ruby/twelve.txt) · [complete source](sources/twelve.md)


---

<a id="a-0110"></a>

### A-0110 — How will you comment in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How will you comment in Ruby?

**Direct answer**

Use # for a line comment. A block comment can use =begin and =end at the beginning of their lines.

**Detailed explanation**

Comments explain intent and assumptions without participating in ordinary execution. Magic comments such as frozen_string_literal and encoding affect parsing or literal behavior and therefore are not merely descriptive text.

**Practical example**

```ruby
puts "ready" # user-facing status
=begin
A multiline comment.
=end
```

**Important points and follow-ups**

- Prefer clear code and useful reasoning over restating every line.

**Source references**

- SRC-00285 — [nine.txt:102–105](../ruby/nine.txt) (14) · [complete source](sources/nine.md)


---

<a id="a-0111"></a>

### A-0111 — How will you rename and delete a file in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How will you rename and delete a file in Ruby?

**Direct answer**

Ruby files are renamed using rename method and deleted using delete mehtod.

**Detailed explanation**

Ruby files are renamed using rename method and deleted using delete mehtod.

To rename a file, following syntax is used.

Syntax:

CSS
File.rename("olderName.txt", "newName.txt")  
To delete a file, following syntax is used.

Syntax:

CSS
File.delete("filename.txt")

**Practical example**

```text
File.rename("olderName.txt", "newName.txt")  
File.delete("filename.txt")
```

**Important points and follow-ups**

- The original source discussion and all examples are retained separately for traceability.

**Source references**

- SRC-00312 — [nine.txt:316–333](../ruby/nine.txt) (41) · [complete source](sources/nine.md)


---

<a id="a-0112"></a>

### A-0112 — Is Ruby front end or backend?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is Ruby front end or backend?

**Direct answer**

Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.

**Detailed explanation**

A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.

**Practical example**

```text
Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-01382 — [twentytwo.txt:392–396](../ruby/twentytwo.txt) (6) · [complete source](sources/twentytwo.md)


---

<a id="a-0113"></a>

### A-0113 — Is Ruby statically typed or dynamically typed?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is Ruby statically typed or dynamically typed?

**Direct answer**

Ruby is dynamically typed: variables are not statically restricted to one declared type, while objects have types and operations are checked at runtime.

**Detailed explanation**

Duck typing depends on the behavior an object supports rather than requiring a particular class. Strong/weak typing is informal terminology; Ruby does not generally coerce an integer into a string for concatenation. Use tests, contracts and optional static typing tools where they help, and profile performance rather than assuming every dynamic program is slower.

**Practical example**

```ruby
def empty?(value)
  value.size == 0
end
empty?([]) # true
empty?("") # true
"hello" + 3 # raises TypeError
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01026 — [thirtyseven.txt:29–35](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="a-0114"></a>

### A-0114 — Is the line of code below valid Ruby code?  If so, what does it do?  Explain your answer.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is the line of code below valid Ruby code?  If so, what does it do?  Explain your answer.



```ruby
-> (a) {p a}["Hello world"]

```

**Direct answer**

It is valid: -> constructs a lambda Proc, [] calls it, and p prints the inspected string including quotes. The returned value is the original string.

**Detailed explanation**

It is valid: -> constructs a lambda Proc, [] calls it, and p prints the inspected string including quotes. The returned value is the original string. The source’s final capitalization/quoting is imprecise: p outputs "Hello world" with quotation marks.

**Practical example**

```ruby
result = ->(a) { p a }["Hello world"]
p result
```

**Important points and follow-ups**

- The source’s final capitalization/quoting is imprecise: p outputs "Hello world" with quotation marks.

**Corrections and source limitations**

- Correction/qualification: It is valid: -> constructs a lambda Proc, [] calls it, and p prints the inspected string including quotes. The returned value is the original string. The source’s final capitalization/quoting is imprecise: p outputs "Hello world" with quotation marks.

**Source references**

- SRC-00107 — [second.txt:138–151](../ruby/second.txt) (Q7) · [complete source](sources/second.md)


---

<a id="a-0115"></a>

### A-0115 — Is the line of code below valid Ruby code? If so, what does it do? Explain your answer?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is the line of code below valid Ruby code? If so, what does it do? Explain your answer?

**Direct answer**

The exact one-liner is absent, but the explanation describes an immediately invoked lambda that prints an inspected String.

**Detailed explanation**

A stabby lambda ->(a) { p a } is a Proc with lambda semantics. It can be invoked with call or [] syntax. p writes inspect and returns its argument; it differs from puts, which returns nil. The example below is a reconstruction for explanation.

**Practical example**

```text
->(a) { p a }["Hello World"] # prints "Hello World" with quotes
```

**Important points and follow-ups**

- All lambdas are Proc objects, but not all Proc objects have lambda behavior.

**Corrections and source limitations**

- Incomplete source: referenced code line is missing; example explicitly reconstructed.

**Source references**

- SRC-00323 — [nine.txt:421–434](../ruby/nine.txt) (52) · [complete source](sources/nine.md)


---

<a id="a-0116"></a>

### A-0116 — List some features of Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

List some features of Ruby?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Source references**

- SRC-00275 — [nine.txt:29–37](../ruby/nine.txt) (4) · [complete source](sources/nine.md)


---

<a id="a-0117"></a>

### A-0117 — Name a few Directories in ruby and explain their purpose?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Name a few Directories in ruby and explain their purpose?

**Direct answer**

Start with the domain and user workflows, define the data/constraints and HTTP interface, and implement a tested, secure vertical feature in the Rails application structure.

**Detailed explanation**

app/models holds domain/persistence classes, app/controllers request coordinators, app/views templates, config configuration and db migrations/schema/seeds. PostgreSQL is one supported choice, not a mandatory database for every Rails application. Database-driven behavior comes from persistence code, not merely choosing MVC.

**Practical example**

```text
app/models/product.rb
app/controllers/products_controller.rb
app/views/products/index.html.erb
config/routes.rb
db/migrate/..._create_products.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00719 — [thirty.txt:141–145](../ruby/thirty.txt) (35) · [complete source](sources/thirty.md)


---

<a id="a-0118"></a>

### A-0118 — Name some operators used in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Name some operators used in Ruby?

**Direct answer**

Ruby has arithmetic, ordering/equality, logical, bitwise, range, assignment and conditional syntax, with class-specific behavior for many operators.

**Detailed explanation**

Most arithmetic and comparison operators dispatch methods, whereas assignment and short-circuit logical syntax have grammar-defined semantics. &&/|| return operand values, and and/or have lower precedence. ** is exponentiation; ^ is bitwise XOR for integers.

**Practical example**

```ruby
p 2 ** 3 # 8
p 5 ^ 3  # 6
p nil || "default" # "default"
```

**Important points and follow-ups**

- An operator name does not guarantee every object implements it.

**Source references**

- SRC-00276 — [nine.txt:38–46](../ruby/nine.txt) (5) · [complete source](sources/nine.md)


---

<a id="a-0119"></a>

### A-0119 — Predict the output of the code below. Explain your answer?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Predict the output of the code below. Explain your answer?

**Direct answer**

After replacing typographic quotes with Ruby string delimiters, the lambda prints the inspected String "I’m a Proc".

**Detailed explanation**

The [] call invokes the lambda. p returns the printed String, so the expression’s result is that String rather than nil. As pasted, the curly opening and closing quote characters are not valid ordinary Ruby string delimiters.

**Practical example**

```text
->(s) { p s }["I’m a Proc"]
```

**Important points and follow-ups**

- p prints quotes around a String; puts normally does not.

**Corrections and source limitations**

- Corrected pasted typographic quote delimiters and clarified inspected output.

**Source references**

- SRC-00357 — [nine.txt:668–675](../ruby/nine.txt) (86) · [complete source](sources/nine.md)


---

<a id="a-0120"></a>

### A-0120 — Rail’s application framework is called-

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Rail’s application framework is called-

**Direct answer**

The source MCQ is ambiguous or outdated; its choices do not establish a reliable modern technical answer.

**Detailed explanation**

Rails is itself an application framework, historically composed of components such as Action Pack and Active Record. An old claim about Twitter’s implementation is time-dependent and does not prove which language renders its browser UI. Do not memorize a selected option as a general Ruby/Rails fact.

**Practical example**

```text
Action Pack provides controller/view HTTP infrastructure; Active Record supplies ORM behavior.
```

**Important points and follow-ups**

- Unresolved source MCQ wording; no single technically sound option is asserted.
- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01384 — [twentytwo.txt:408–418](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0121"></a>

### A-0121 — Strongly or Weakly Typed Ruby?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Strongly or Weakly Typed Ruby?

**Direct answer**

Ruby is dynamically typed: variables are not statically restricted to one declared type, while objects have types and operations are checked at runtime.

**Detailed explanation**

Duck typing depends on the behavior an object supports rather than requiring a particular class. Strong/weak typing is informal terminology; Ruby does not generally coerce an integer into a string for concatenation. Use tests, contracts and optional static typing tools where they help, and profile performance rather than assuming every dynamic program is slower.

**Practical example**

```ruby
def empty?(value)
  value.size == 0
end
empty?([]) # true
empty?("") # true
"hello" + 3 # raises TypeError
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01044 — [thirtyseven.txt:161–167](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="a-0122"></a>

### A-0122 — The user interface of Twitter has been built using

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

The user interface of Twitter has been built using

**Direct answer**

The source MCQ is ambiguous or outdated; its choices do not establish a reliable modern technical answer.

**Detailed explanation**

Rails is itself an application framework, historically composed of components such as Action Pack and Active Record. An old claim about Twitter’s implementation is time-dependent and does not prove which language renders its browser UI. Do not memorize a selected option as a general Ruby/Rails fact.

**Practical example**

```text
Action Pack provides controller/view HTTP infrastructure; Active Record supplies ORM behavior.
```

**Important points and follow-ups**

- Unresolved source MCQ wording; no single technically sound option is asserted.
- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01385 — [twentytwo.txt:419–429](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0123"></a>

### A-0123 — There are four ways to invoke a method in ruby.  Can you give me at least two?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

There are four ways to invoke a method in ruby.  Can you give me at least two?

**Direct answer**

A Ruby method call sends a message to a receiver; lookup searches the receiver’s method lookup chain and invokes method_missing if no matching method is found.

**Detailed explanation**

Methods can be invoked with normal dot syntax, public_send/send, or a Method object’s call. Respect visibility and do not pass arbitrary untrusted method names to send. A method object captures a receiver, while source code syntax alone does not.

**Practical example**

```ruby
user.name
user.public_send(:name)
user.method(:name).call
# send can invoke private methods, so it is not equivalent to public_send.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00675 — [sixteen.txt:133–157](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)


---

<a id="a-0124"></a>

### A-0124 — There are three ways to invoke a method in ruby. Can you give me at least two?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

There are three ways to invoke a method in ruby. Can you give me at least two?

**Direct answer**

A Ruby method call sends a message to a receiver; lookup searches the receiver’s method lookup chain and invokes method_missing if no matching method is found.

**Detailed explanation**

Methods can be invoked with normal dot syntax, public_send/send, or a Method object’s call. Respect visibility and do not pass arbitrary untrusted method names to send. A method object captures a receiver, while source code syntax alone does not.

**Practical example**

```ruby
user.name
user.public_send(:name)
user.method(:name).call
# send can invoke private methods, so it is not equivalent to public_send.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01172 — [twentyeight.txt:190–201](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0125"></a>

### A-0125 — What are best practices for Ruby development?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are best practices for Ruby development?

**Direct answer**

Use clear interfaces, consistent style, focused tests, locked dependencies, safe input handling and measurement before optimization. Rails-specific MVC/routes are not universal requirements for every Ruby program.

**Detailed explanation**

Use clear interfaces, consistent style, focused tests, locked dependencies, safe input handling and measurement before optimization. Rails-specific MVC/routes are not universal requirements for every Ruby program. Omitting method-call parentheses is not inherently bad Ruby style. .env is not read by Ruby/Rails automatically without configured tooling; use supported credential/configuration facilities.

**Practical example**

```ruby
def calculate_sum(numbers)
  numbers.sum
end
p calculate_sum([]) # 0
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Omitting method-call parentheses is not inherently bad Ruby style. .env is not read by Ruby/Rails automatically without configured tooling; use supported credential/configuration facilities.

**Source references**

- SRC-00201 — [six.txt:2353–2487](../ruby/six.txt) (Q25) · [complete source](sources/six.md)


---

<a id="a-0126"></a>

### A-0126 — What are custom validations, and how do you create them?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are custom validations, and how do you create them?

**Direct answer**

Use a validate callback for a model-specific rule or a validator class for reusable validation behavior.

**Detailed explanation**

Add errors when the record violates the rule and let valid?/save expose the result. Validations normally run before persistence but are not a substitute for database constraints under concurrency and can be bypassed by selected APIs.

**Practical example**

```ruby
validate :end_after_start
def end_after_start
  if starts_at && ends_at && ends_at <= starts_at
    errors.add(:ends_at, "must follow starts_at")
  end
end
```

**Important points and follow-ups**

- Handle nil values so a separate presence validation can report them cleanly.

**Source references**

- SRC-00388 — [ten.txt:104–106](../ruby/ten.txt) (17) · [complete source](sources/ten.md)


---

<a id="a-0127"></a>

### A-0127 — What are some advantages of using Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are some advantages of using Ruby?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Source references**

- SRC-00350 — [nine.txt:605–613](../ruby/nine.txt) (79) · [complete source](sources/nine.md)


---

<a id="a-0128"></a>

### A-0128 — What are the basic conditions that a user should pay attention to while preparing an ERB document in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the basic conditions that a user should pay attention to while preparing an ERB document in Ruby?

**Direct answer**

ERB means Embedded Ruby and evaluates Ruby within a text template.

**Detailed explanation**

<% ... %> executes without inserting its result; <%= ... %> inserts the expression result. Rails escapes normal string output to reduce XSS. <%+= and >% are not the correct tag delimiters.

**Practical example**

```erb
<% if @user %>
  <p>Hello <%= @user.name %></p>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00709 — [thirty.txt:103–105](../ruby/thirty.txt) (25) · [complete source](sources/thirty.md)


---

<a id="a-0129"></a>

### A-0129 — What are the basic data types in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the basic data types in Ruby?

**Direct answer**

Common Ruby value classes include Integer, Float, Rational, Complex, String, Symbol, Array, Hash, Range, Time, TrueClass, FalseClass and NilClass. All are object types.

**Detailed explanation**

Dynamic typing means a variable can reference different classes over time; it does not mean Ruby silently accepts incompatible operations. Ruby presents no separate nonobject primitive type hierarchy to application code, even though CRuby uses efficient immediate internal representations for some values. Integers grow subject to available memory; Float uses finite precision.

**Practical example**

```ruby
p [42, 3.5, "hi", :name, [], {}, nil].map(&:class)
```

**Important points and follow-ups**

- "5" + 2 raises TypeError; use an intentional conversion such as Integer("5").

**Source references**

- SRC-00617 — [twentyfour.txt:98–124](../ruby/twentyfour.txt) (3) · [complete source](sources/twentyfour.md)


---

<a id="a-0130"></a>

### A-0130 — What are the data types used in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the data types used in Ruby?

**Direct answer**

Common Ruby value classes include Integer, Float, Rational, Complex, String, Symbol, Array, Hash, Range, Time, TrueClass, FalseClass and NilClass. All are object types.

**Detailed explanation**

Dynamic typing means a variable can reference different classes over time; it does not mean Ruby silently accepts incompatible operations. Ruby presents no separate nonobject primitive type hierarchy to application code, even though CRuby uses efficient immediate internal representations for some values. Integers grow subject to available memory; Float uses finite precision.

**Practical example**

```ruby
p [42, 3.5, "hi", :name, [], {}, nil].map(&:class)
```

**Important points and follow-ups**

- "5" + 2 raises TypeError; use an intentional conversion such as Integer("5").

**Source references**

- SRC-00429 — [eleven.txt:95–112](../ruby/eleven.txt) (6) · [complete source](sources/eleven.md)


---

<a id="a-0131"></a>

### A-0131 — What are the different operators used in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the different operators used in Ruby?

**Direct answer**

Ruby has arithmetic, ordering/equality, logical, bitwise, range, assignment and conditional syntax, with class-specific behavior for many operators.

**Detailed explanation**

Most arithmetic and comparison operators dispatch methods, whereas assignment and short-circuit logical syntax have grammar-defined semantics. &&/|| return operand values, and and/or have lower precedence. ** is exponentiation; ^ is bitwise XOR for integers.

**Practical example**

```ruby
p 2 ** 3 # 8
p 5 ^ 3  # 6
p nil || "default" # "default"
```

**Important points and follow-ups**

- An operator name does not guarantee every object implements it.

**Corrections and source limitations**

- “Conversion operators” is not a standard Ruby operator category; conversions are typically methods such as Integer(), to_i and to_s.
- Conversions such as to_i/Integer() are methods, not a distinct built-in conversion-operator family.

**Source references**

- SRC-00427 — [eleven.txt:66–85](../ruby/eleven.txt) (4) · [complete source](sources/eleven.md)


---

<a id="a-0132"></a>

### A-0132 — What are the main features of Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the main features of Ruby?

**Direct answer**

Ruby is dynamically typed and object oriented: values, including numbers, nil, classes and modules, are objects. Methods and blocks support expressive reusable APIs.

**Detailed explanation**

Ruby is a dynamic, high-level programming language known for its simplicity and elegance. Ruby is considered an object-oriented programming (OOP) language because everything in Ruby is treated as an object. Each value in Ruby, be it a number, a string, an array, or a hash, is an object with its own methods and attributes. This object-oriented nature allows developers to model real-world entities and interactions more naturally through classes and objects.

In Ruby, even classes and modules are objects, which is a characteristic not found in all OOP languages. This means you can dynamically alter classes and modules at runtime, providing a high degree of flexibility.

The object-oriented nature of Ruby also promotes encapsulation, inheritance, and polymorphism, which are key principles of OOP. These principles make it easier to manage and manipulate data, enhance code reusability, and provide a structure that makes code easier to maintain and understand.

**Practical example**

```ruby
p [1.class, nil.class, String.class] # [Integer, NilClass, Class]
```

**Important points and follow-ups**

- Variables hold references to objects; a variable itself is not an object.

**Corrections and source limitations**

- Convention over configuration is chiefly a Rails framework philosophy, not a core Ruby grammar rule.

**Source references**

- SRC-00152 — [four.txt:12–19](../ruby/four.txt) (1) · [complete source](sources/four.md)


---

<a id="a-0133"></a>

### A-0133 — What are the naming conventions in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the naming conventions in Ruby?

**Direct answer**

Ruby conventionally uses snake_case for methods/locals and CamelCase for classes/modules. Rails adds conventions such as plural snake_case tables and singular model classes.

**Detailed explanation**

Variables with @, @@ or $ prefixes follow their own scope rules, and value constants commonly use ALL_CAPS. A Rails controller such as OrdersController typically handles the plural orders resource. These are conventions with configurable exceptions, not a single universal lowercase rule.

**Practical example**

```ruby
class OrderItem < ApplicationRecord
  # Default table: order_items
end
# Controller: OrderItemsController
```

**Important points and follow-ups**

- Class and module names are constants.

**Corrections and source limitations**

- Separated Rails database/model/controller naming conventions from Ruby language rules.
- Corrected conflation of Ruby syntax rules with Rails naming conventions.

**Source references**

- SRC-00436 — [eleven.txt:182–190](../ruby/eleven.txt) (13) · [complete source](sources/eleven.md)


---

<a id="a-0134"></a>

### A-0134 — What are the naming conventions?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the naming conventions?

**Direct answer**

Use snake_case for Ruby methods/locals and CamelCase for classes/modules. Rails conventionally maps singular models to plural snake_case tables and uses plural controller names.

**Detailed explanation**

Use snake_case for Ruby methods/locals and CamelCase for classes/modules. Rails conventionally maps singular models to plural snake_case tables and uses plural controller names. The SQL table identifier is invoice_items, not invoice items. Constants conventionally use SCREAMING_SNAKE_CASE.

**Practical example**

```ruby
# app/models/invoice_item.rb
class InvoiceItem < ApplicationRecord
end
# Conventional table: invoice_items
```

**Important points and follow-ups**

- The SQL table identifier is invoice_items, not invoice items. Constants conventionally use SCREAMING_SNAKE_CASE.

**Source references**

- SRC-00011 — [first.txt:69–76](../ruby/first.txt) (11) · [complete source](sources/first.md)


---

<a id="a-0135"></a>

### A-0135 — What are the standout features of the Ruby programming language?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the standout features of the Ruby programming language?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Source references**

- SRC-00424 — [eleven.txt:26–33](../ruby/eleven.txt) (1) · [complete source](sources/eleven.md)


---

<a id="a-0136"></a>

### A-0136 — What does the safe navigation operator (&.) do?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What does the safe navigation operator (&.) do?

**Direct answer**

&. skips a method call only when its receiver is nil and then returns nil. It does not silently skip false or every missing method.

**Detailed explanation**

Repeat &. at each legitimately optional link. Overusing it can conceal an unexpected missing record that should raise. An absent method on a non-nil receiver still raises NoMethodError.

**Practical example**

```ruby
user = nil
p user&.name # nil
# false&.name still calls name and normally raises NoMethodError.
```

**Important points and follow-ups**

- Safe navigation is a nil guard, not general exception suppression.

**Source references**

- SRC-00521 — [nineteen.txt:391–409](../ruby/nineteen.txt) (20) · [complete source](sources/nineteen.md)


---

<a id="a-0137"></a>

### A-0137 — What does this say about the advantages of ruby's dynamic (duck) typed system?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What does this say about the advantages of ruby's dynamic (duck) typed system?

**Direct answer**

Ruby is dynamically typed: variables are not statically restricted to one declared type, while objects have types and operations are checked at runtime.

**Detailed explanation**

Duck typing depends on the behavior an object supports rather than requiring a particular class. Strong/weak typing is informal terminology; Ruby does not generally coerce an integer into a string for concatenation. Use tests, contracts and optional static typing tools where they help, and profile performance rather than assuming every dynamic program is slower.

**Practical example**

```ruby
def empty?(value)
  value.size == 0
end
empty?([]) # true
empty?("") # true
"hello" + 3 # raises TypeError
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00681 — [sixteen.txt:301–304](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01177 — [twentyeight.txt:295–297](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0138"></a>

### A-0138 — What extension is used to save the ruby file?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What extension is used to save the ruby file?

**Direct answer**

Ruby source files conventionally use the .rb extension.

**Detailed explanation**

The interpreter can execute a file with another name when invoked explicitly, but .rb is the conventional extension recognized by editors and tooling.

**Practical example**

```text
ruby example.rb
```

**Important points and follow-ups**

- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01386 — [twentytwo.txt:430–440](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0139"></a>

### A-0139 — What happens when you call a method in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What happens when you call a method in Ruby?

**Direct answer**

A Ruby method call sends a message to a receiver; lookup searches the receiver’s method lookup chain and invokes method_missing if no matching method is found.

**Detailed explanation**

Methods can be invoked with normal dot syntax, public_send/send, or a Method object’s call. Respect visibility and do not pass arbitrary untrusted method names to send. A method object captures a receiver, while source code syntax alone does not.

**Practical example**

```ruby
user.name
user.public_send(:name)
user.method(:name).call
# send can invoke private methods, so it is not equivalent to public_send.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01028 — [thirtyseven.txt:45–51](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="a-0140"></a>

### A-0140 — What is a case statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is a case statement in Ruby?

**Direct answer**

case/when evaluates patterns using pattern === target and runs the first matching branch. If nothing matches it runs else, or returns nil when else is absent.

**Detailed explanation**

Classes use === for instance membership, ranges for interval coverage, and regular expressions for matching. A case with no target instead tests branch truthiness. case is an expression, so it can return the selected branch’s result. case/in is a separate destructuring form with additional pattern rules.

**Practical example**

```text
case value
when Integer then "number"
when /\A[a-z]+\z/ then "letters"
else "other"
end
```

**Important points and follow-ups**

- Branch order matters: a broad class match can make a later narrower range branch unreachable.

**Source references**

- SRC-00225 — [seven.txt:156–172](../ruby/seven.txt) (9) · [complete source](sources/seven.md)


---

<a id="a-0141"></a>

### A-0141 — What is a closure in Ruby and how is it used?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

What is a closure in Ruby and how is it used?

**Direct answer**

A closure keeps access to its defining lexical environment, allowing deferred code to use and update captured local variables.

**Detailed explanation**

A closure in Ruby is a self-contained bundle of code that can be executed later, retaining the context in which it was created. It's a combination of a function and its surrounding lexical scope, which allows it to remember variables and values even after its outer function has finished executing.

Closures are frequently used in scenarios like callbacks where you want to define a piece of behavior to be executed at a later time but still have access to the variables from the defining scope.

**Practical example**

```ruby
def counter
  count = 0
  -> { count += 1 }
end
c = counter
p [c.call, c.call] # [1, 2]
```

**Important points and follow-ups**

- Captured locals are bindings, not frozen snapshots.
- The source explanation says 10 while its output 20 is correct. Captured x is shared and observes the update.
- Avoid unintended retention of a large surrounding object graph.
- Reference: https://docs.ruby-lang.org/en/master/Proc.html
- A method defined with def does not close over surrounding local variables like a block.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source correction/edge case: The source explanation says 10 while its output 20 is correct. Captured x is shared and observes the update.
- Corrected suggestion that #binding simply alters a closure’s binding.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected closure terminology and explained binding capture rather than value snapshots.

**Source references**

- SRC-00031 — [first.txt:235–239](../ruby/first.txt) (1) · [complete source](sources/first.md)
- SRC-00140 — [three.txt:344–364](../ruby/three.txt) · [complete source](sources/three.md)
- SRC-00369 — [nine.txt:796–804](../ruby/nine.txt) (98) · [complete source](sources/nine.md)
- SRC-00809 — [thirtyeight.txt:224–225](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01442 — [twentythree.txt:687–717](../ruby/twentythree.txt) (Q50) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00140 (three.txt)</summary>

**Original prompt:** Explain the concept of closures in Ruby and how they capture their surrounding context.

**Answer:** A closure captures the lexical environment’s variable bindings and self, not immutable copies of each variable’s initial value.

A closure captures the lexical environment’s variable bindings and self, not immutable copies of each variable’s initial value. The source explanation says 10 while its output 20 is correct. Captured x is shared and observes the update.

```ruby
def outer
  x = 10
  reader = proc { x }
  x = 20
  reader.call
end
p outer # 20
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00369 (nine.txt)</summary>

**Original prompt:** Describe a closure in Ruby?

**Answer:** A closure is executable code together with access to the local environment in which it was created. Ruby blocks, procs and lambdas capture surrounding locals and can outlive the defining call.

Captured variables remain shared references, so changing a captured local is visible to the closure and can keep associated objects alive. Proc#binding exposes its execution context but does not arbitrarily replace the closure’s environment. Use closures for callbacks, stateful generators and small configurable behavior.

```ruby
def counter
  n = 0
  -> { n += 1 }
end
c = counter
p [c.call, c.call] # [1, 2]
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00809 (thirtyeight.txt)</summary>

**Original prompt:** What is a closure in Ruby on Rails?

**Answer:** A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01442 (twentythree.txt)</summary>

**Original prompt:** What is Clouser in Ruby on Rails?

**Answer:** A closure is executable code that retains access to the lexical bindings from where it was defined; Ruby blocks, Procs, and lambdas provide this behavior.

The closure captures bindings, not a frozen copy of each variable value. A retained binding can keep objects alive. Lambdas and non-lambda Procs differ in return behavior and argument checking even though both are Proc objects.

```ruby
def counter
  n = 0
  -> { n += 1 }
end
c = counter
p [c.call, c.call] # [1, 2]
```

</details>


---

<a id="a-0142"></a>

### A-0142 — What is an enum in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is an enum in Ruby?

**Direct answer**

Rails enum maps an attribute to named states backed by explicit integer or string values.

**Detailed explanation**

Use explicit mappings so adding or reordering names does not reinterpret existing database values. Modern Rails uses positional name/value arguments. Ruby itself has no general enum keyword corresponding to this Rails macro.

**Practical example**

```text
enum :status, { draft: 0, published: 1 }
post.published?
post.published!
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01308 — [twentynine.txt:48–50](../ruby/twentynine.txt) (10) · [complete source](sources/twentynine.md)


---

<a id="a-0143"></a>

### A-0143 — What is Duck Typing in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is Duck Typing in Ruby?

**Direct answer**

Duck typing means code depends on an object’s supported behavior rather than requiring a particular class. Any object implementing the required protocol can collaborate.

**Detailed explanation**

For example, code accepting a writer only needs write, not a concrete File class. This makes testing easier because a StringIO or test double can satisfy the same interface. respond_to? can check availability, but shared semantics and error behavior matter as well; a matching method name alone does not prove compatibility.

**Practical example**

```ruby
require "stringio"
def log(writer, message)
  writer.write(message + "\n")
end
buffer = StringIO.new
log(buffer, "ready")
p buffer.string # "ready\n"
```

**Important points and follow-ups**

- Prefer a small documented protocol over broad concrete-class checks.

**Source references**

- SRC-00392 — [ten.txt:122–124](../ruby/ten.txt) (21) · [complete source](sources/ten.md)
- SRC-00526 — [nineteen.txt:495–509](../ruby/nineteen.txt) (25) · [complete source](sources/nineteen.md)


---

<a id="a-0144"></a>

### A-0144 — What is interpolation in the Ruby programming language?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is interpolation in the Ruby programming language?

**Direct answer**

String interpolation evaluates #{expression} inside a double-quoted or other interpolating string and inserts the result using to_s.

**Detailed explanation**

Use interpolation for readable presentation of variables and expressions. Single-quoted strings preserve #{...} literally. Interpolation is not input escaping: embedding values directly in SQL, HTML or shell commands can introduce injection vulnerabilities, so use the appropriate parameterization or escaping mechanism for those contexts.

**Practical example**

```ruby
name = "Asha"
p "Hello, #{name}: #{2 + 3}" # "Hello, Asha: 5"
p 'Hello, #{name}' # literal characters
```

**Important points and follow-ups**

- Interpolated nil becomes an empty string through nil.to_s.

**Source references**

- SRC-00432 — [eleven.txt:145–150](../ruby/eleven.txt) (9) · [complete source](sources/eleven.md)


---

<a id="a-0145"></a>

### A-0145 — What is JSON?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is JSON?

**Direct answer**

JSON is a data interchange format; Rails can render structured JSON directly or use a chosen serializer/template layer.

**Detailed explanation**

Expose an explicit public representation so sensitive database fields do not leak. ActiveModel::Serializer is supplied by a separate library, not a mandatory Rails built-in serializer. Include appropriate status codes, pagination and version/error contracts for APIs.

**Practical example**

```text
render json: { id: @user.id, name: @user.name }, status: :ok
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00814 — [thirtyeight.txt:234–235](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0146"></a>

### A-0146 — What is method overloading and does Ruby support it?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is method overloading and does Ruby support it?

**Direct answer**

Ruby dispatches by method name rather than Java-style overload signatures. A later definition replaces an earlier one; use optional/keyword/rest parameters or explicit dispatch.

**Detailed explanation**

Method overloading involves defining multiple methods with the same name but different parameters. Ruby does not support method overloading in the traditional sense, but you can achieve similar results using default parameters and variable arguments.

**Practical example**

```ruby
def greet(name, punctuation: "!")
  "Hello, #{name}#{punctuation}"
end
p greet("Ana")
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00024 — [first.txt:183–185](../ruby/first.txt) (24) · [complete source](sources/first.md)


---

<a id="a-0147"></a>

### A-0147 — What is monkey patching in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is monkey patching in Ruby?

**Direct answer**

Monkey patching is a technique to add or modify methods of existing classes or modules at runtime. While powerful, it can lead to conflicts and unexpected behavior if not used carefully. For example:

**Detailed explanation**

You may also come across Ruby programming interview questions like this one. 

Monkey patching is a technique to add or modify methods of existing classes or modules at runtime. While powerful, it can lead to conflicts and unexpected behavior if not used carefully. For example:

class String

  def shout

    self.upcase + "!"

  end

end
This adds a shout method to the String class.

Ruby on Rails Interview Exercises
Here are some Ruby programs for interview to help you prepare and land your dream job.

**Practical example**

```ruby
class String
  def shout
    self.upcase + "!"
  end
end
```

**Important points and follow-ups**

- The original source discussion and all examples are retained separately for traceability.

**Source references**

- SRC-00414 — [ten.txt:258–276](../ruby/ten.txt) (43) · [complete source](sources/ten.md)


---

<a id="a-0148"></a>

### A-0148 — What is Ruby and what are its main features?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby and what are its main features?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Corrections and source limitations**

- Qualified absolute identity/performance claims: frozen strings may be shared; dynamic symbols can be collected; symbols are not universally faster.

**Source references**

- SRC-00242 — [eight.txt:19–27](../ruby/eight.txt) (Junior-01) · [complete source](sources/eight.md)


---

<a id="a-0149"></a>

### A-0149 — What is Ruby and what makes it distinctive?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby and what makes it distinctive?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Source references**

- SRC-00502 — [nineteen.txt:112–124](../ruby/nineteen.txt) (1) · [complete source](sources/nineteen.md)


---

<a id="a-0150"></a>

### A-0150 — What is Ruby and why is it popular?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby and why is it popular?

**Direct answer**

Ruby is dynamically typed and object oriented: values, including numbers, nil, classes and modules, are objects. Methods and blocks support expressive reusable APIs.

**Detailed explanation**

Ruby is a dynamic, high-level programming language known for its simplicity and elegance. Ruby is considered an object-oriented programming (OOP) language because everything in Ruby is treated as an object. Each value in Ruby, be it a number, a string, an array, or a hash, is an object with its own methods and attributes. This object-oriented nature allows developers to model real-world entities and interactions more naturally through classes and objects.

In Ruby, even classes and modules are objects, which is a characteristic not found in all OOP languages. This means you can dynamically alter classes and modules at runtime, providing a high degree of flexibility.

The object-oriented nature of Ruby also promotes encapsulation, inheritance, and polymorphism, which are key principles of OOP. These principles make it easier to manage and manipulate data, enhance code reusability, and provide a structure that makes code easier to maintain and understand.

**Practical example**

```ruby
p [1.class, nil.class, String.class] # [Integer, NilClass, Class]
```

**Important points and follow-ups**

- Variables hold references to objects; a variable itself is not an object.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Source references**

- SRC-00177 — [six.txt:2–68](../ruby/six.txt) (Q1) · [complete source](sources/six.md)


---

<a id="a-0151"></a>

### A-0151 — What is Ruby programming language?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby programming language?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

**Important points and follow-ups**

- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Source references**

- SRC-00272 — [nine.txt:8–14](../ruby/nine.txt) (1) · [complete source](sources/nine.md)


---

<a id="a-0152"></a>

### A-0152 — What is Ruby, and why is it popular for web development?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby, and why is it popular for web development?

**Direct answer**

Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

**Detailed explanation**

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

**Practical example**

```ruby
# Rails provides this web-specific DSL; it is not Ruby core.
Rails.application.routes.draw do
  resources :articles
end
```

**Important points and follow-ups**

- Rails supplies web conventions and ORM behavior; Ruby supplies the language.

**Corrections and source limitations**

- Removed unsupported claims about “Mediterranean quality”, code rearrangement, and Rails introducing many-to-many relationships.

**Source references**

- SRC-00615 — [twentyfour.txt:7–39](../ruby/twentyfour.txt) (1) · [complete source](sources/twentyfour.md)


---

<a id="a-0153"></a>

### A-0153 — What is Ruby’s programming language?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Ruby’s programming language?

**Direct answer**

Ruby is a dynamic, general-purpose, object-oriented language designed by Yukihiro Matsumoto.

**Detailed explanation**

It emphasizes readable expressions, objects and message dispatch, closures/blocks, mixins and runtime flexibility. Ruby is not itself the Rails framework, and its execution strategy can include bytecode/JIT depending on implementation/version.

**Practical example**

```text
[1, 2, 3].map { |n| n * 2 } # [2, 4, 6]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00726 — [thirty.txt:164–166](../ruby/thirty.txt) (42) · [complete source](sources/thirty.md)


---

<a id="a-0154"></a>

### A-0154 — What is rvm?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is rvm?

**Direct answer**

RVM means Ruby Version Manager; its gemsets isolate groups of installed gems for a chosen Ruby installation.

**Detailed explanation**

A gemset is not itself a package of application source code and RVM is not a source-control system. Bundler still resolves per-application dependency versions with Gemfile.lock. Distinguish Ruby runtime management from gem dependency resolution.

**Practical example**

```text
rvm use ruby-version@project --create
bundle install
```

**Important points and follow-ups**

- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01388 — [twentytwo.txt:452–462](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0155"></a>

### A-0155 — What is sysread method in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is sysread method in Ruby?

**Direct answer**

IO#sysread(length) performs a low-level read of up to a requested number of bytes from an already readable IO object.

**Detailed explanation**

It requires a length argument, may raise EOFError at end of input and should not be mixed carelessly with buffered read methods on the same stream. It does not open a file or make a write-only stream readable. Prefer normal buffered read for ordinary application work.

**Practical example**

```text
File.open("input.txt", "rb") do |file|
  p file.sysread(8)
rescue EOFError
  puts "empty file"
end
```

**Important points and follow-ups**

- Use binmode when processing raw bytes.

**Corrections and source limitations**

- Corrected claim that sysread opens a file in any mode.

**Source references**

- SRC-00311 — [nine.txt:312–315](../ruby/nine.txt) (40) · [complete source](sources/nine.md)


---

<a id="a-0156"></a>

### A-0156 — What is the best thing which you find about Ruby on Rail so far?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the best thing which you find about Ruby on Rail so far?

**Direct answer**

Give a specific benefit from your own work, such as Rails’ conventions and integrated tooling reducing repeated application plumbing.

**Detailed explanation**

This is a preference question rather than a universal technical ranking. Explain one concrete decision and its trade-off. Metaprogramming is useful for framework DSLs but does not make CPU-heavy work instant or remove the need for readable explicit application code.

**Practical example**

```text
Practice answer: “Rails migrations and model conventions helped my team evolve a CRUD feature consistently; we still added explicit authorization and database constraints.”
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Corrected unsupported source claim that metaprogramming makes heavy tasks take no time.

**Source references**

- SRC-00711 — [thirty.txt:109–111](../ruby/thirty.txt) (27) · [complete source](sources/thirty.md)


---

<a id="a-0157"></a>

### A-0157 — What is the difference between == and eql? in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between == and eql? in Ruby?

**Direct answer**

== expresses class-specific value equality; equal? tests object identity; eql? together with hash determines Hash-key equality; === provides class-specific case matching.

**Detailed explanation**

Integer distinguishes 1.eql?(1.0) from 1 == 1.0, but eql? is not a universal built-in “compare value and type” algorithm: classes define their own behavior. If two objects are eql?, they must return the same hash. A case/when clause effectively asks pattern === value, so Class, Range and Regexp give different matching meanings.

**Practical example**

```ruby
p 1 == 1.0       # true
p 1.eql?(1.0)    # false
p (1..3) === 2   # true
s = "a"; p s.equal?(s) # true
```

**Important points and follow-ups**

- Never override equal? to implement ordinary value equality.
- Keep key fields stable while an object is in a Hash.
- Reference: https://docs.ruby-lang.org/en/3.4/Object.html

**Source references**

- SRC-00227 — [seven.txt:197–216](../ruby/seven.txt) (11) · [complete source](sources/seven.md)


---

<a id="a-0158"></a>

### A-0158 — What is the difference between puts, print, and p in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the difference between puts, print, and p in Ruby?

**Direct answer**

puts prints values with line endings and returns nil; print adds no newline and returns nil; p prints inspect forms and returns its argument (or the arguments array for several).

**Detailed explanation**

puts prints values with line endings and returns nil; print adds no newline and returns nil; p prints inspect forms and returns its argument (or the arguments array for several). The original phrase "p returns inspect output" is misleading: it prints inspect output but returns the object.

**Practical example**

```ruby
p [1, 2]
result = p("hello")
p result
```

**Important points and follow-ups**

- puts recursively prints array elements; p preserves the array representation.
- Printed output and the method’s return value are separate observations.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- The original phrase "p returns inspect output" is misleading: it prints inspect output but returns the object.

**Source references**

- SRC-00178 — [six.txt:69–143](../ruby/six.txt) (Q2) · [complete source](sources/six.md)
- SRC-00514 — [nineteen.txt:303–314](../ruby/nineteen.txt) (13) · [complete source](sources/nineteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00514 (nineteen.txt)</summary>

**Original prompt:** What is the difference between puts, print, and p?

**Answer:** puts writes human-oriented output with line endings, print writes without adding its own newline, and p writes inspect output and returns its argument.

puts and print return nil. puts treats arrays specially by printing their elements recursively; it does not simply emit Array#to_s. With several arguments p returns an array of them. Use p for diagnostic structure and explicit formatting for user output.

```ruby
puts "hi" # hi plus newline, returns nil
print "hi" # no added newline
p "hi" # prints quotes and returns "hi"
```

</details>


---

<a id="a-0159"></a>

### A-0159 — What is the difference between raise/rescue and throw/catch in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between raise/rescue and throw/catch in Ruby?

**Direct answer**

raise/rescue handles exceptions; catch/throw performs nonlocal control flow using a matching tag.

**Detailed explanation**

throw unwinds to a corresponding catch and can carry a result value. Tags are not restricted to symbols, though symbols are common. A throw without a matching catch raises UncaughtThrowError. This is different from exception-class matching and should not substitute for errors that callers need to classify.

**Practical example**

```ruby
result = catch(:found) do
  [1, 2, 3].each { |n| throw :found, n if n.even? }
  nil
end
p result # 2
```

**Important points and follow-ups**

- ensure cleanup can run during either kind of ordinary stack unwinding.

**Source references**

- SRC-00425 — [eleven.txt:34–51](../ruby/eleven.txt) (2) · [complete source](sources/eleven.md)


---

<a id="a-0160"></a>

### A-0160 — What is the difference between require, require_relative, and load in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the difference between require, require_relative, and load in Ruby?

**Direct answer**

require finds and loads a feature once, require_relative resolves relative to the calling file, and load executes the specified file on every invocation.

**Detailed explanation**

require finds and loads a feature once, require_relative resolves relative to the calling file, and load executes the specified file on every invocation. require is not restricted to absolute paths; load resolves according to its documented path rules. Rails autoloading is separate.

**Practical example**

```ruby
require "json"
# Project files: require_relative "lib/user"
# Reload explicitly: load "lib/user.rb"
```

**Important points and follow-ups**

- require searches $LOAD_PATH as well as accepting explicit paths; it is not limited to absolute paths.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- require is not restricted to absolute paths; load resolves according to its documented path rules. Rails autoloading is separate.

**Source references**

- SRC-00196 — [six.txt:1859–1956](../ruby/six.txt) (Q20) · [complete source](sources/six.md)
- SRC-00665 — [fifteen.txt:110–235](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00665 (fifteen.txt)</summary>

**Original prompt:** What is the difference between load, require, and require_relative?

**Answer:** load executes a Ruby file each time; require loads a feature once and tracks it; require_relative resolves relative to the calling file.

require can search configured load paths and load supported native extensions. require returns false when the feature is already loaded. load is useful for deliberate repeated execution but is not a substitute for Rails’ Zeitwerk reloader. Never load a path controlled by untrusted input.

```ruby
require "json"
require_relative "lib/parser"
load "./script.rb" # executes again on the next load
```

</details>


---

<a id="a-0161"></a>

### A-0161 — What is the difference between throw/catch and raise/rescue?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between throw/catch and raise/rescue?

**Direct answer**

raise/rescue handles exceptions; catch/throw performs nonlocal control flow using a matching tag.

**Detailed explanation**

throw unwinds to a corresponding catch and can carry a result value. Tags are not restricted to symbols, though symbols are common. A throw without a matching catch raises UncaughtThrowError. This is different from exception-class matching and should not substitute for errors that callers need to classify.

**Practical example**

```ruby
result = catch(:found) do
  [1, 2, 3].each { |n| throw :found, n if n.even? }
  nil
end
p result # 2
```

**Important points and follow-ups**

- ensure cleanup can run during either kind of ordinary stack unwinding.

**Source references**

- SRC-00371 — [nine.txt:814–818](../ruby/nine.txt) (100) · [complete source](sources/nine.md)


---

<a id="a-0162"></a>

### A-0162 — What is the Enumerable#inject method and how is it used?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the Enumerable#inject method and how is it used?

**Direct answer**

inject, also called reduce, combines a sequence into one accumulator using a block or named operation. An explicit initial value handles empty inputs predictably.

**Detailed explanation**

The block receives the accumulator and current element, and its result becomes the next accumulator. Without an initial value, the first element initializes it; an empty collection then returns nil. If mutating a container accumulator, return that container or use each_with_object, whose block result is ignored.

**Practical example**

```ruby
p [1, 2, 3].inject(0) { |sum, n| sum + n } # 6
p [].reduce(0, :+) # 0
```

**Important points and follow-ups**

- inject is an alias of reduce.

**Source references**

- SRC-00259 — [eight.txt:203–209](../ruby/eight.txt) (Mid-08) · [complete source](sources/eight.md)


---

<a id="a-0163"></a>

### A-0163 — What is the output of the given code?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the output of the given code?

**Direct answer**

As pasted, print Hi puts Welcome! is not a valid way to print those two strings; the MCQ’s “Error” choice is the appropriate general response.

**Detailed explanation**

The code omits quotes and separators and mixes method/constant-looking tokens. If the original screenshot had different punctuation it cannot be reconstructed. Show valid string output explicitly; print does not add a newline and puts does.

**Practical example**

```ruby
print "Hi "
puts "Welcome!"
# Hi Welcome!
```

**Important points and follow-ups**

- All original multiple-choice options are preserved in sourceAnswer.

**Corrections and source limitations**

- Source code is malformed; no hidden intended quotes are assumed.

**Source references**

- SRC-01389 — [twentytwo.txt:463–474](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0164"></a>

### A-0164 — What is the purpose of Ruby’s require and require_relative methods?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the purpose of Ruby’s require and require_relative methods?

**Direct answer**

require loads a feature once and records it in $LOADED_FEATURES; load executes a file each time. require_relative resolves its path relative to the file containing the call.

**Detailed explanation**

Use require for libraries and installed gems, and require_relative for a related project file when not using an autoloader. A successful new require returns true; a previously loaded feature normally returns false. load is deliberate re-execution, not the Rails autoloader. Prefer Rails’ configured autoloading conventions inside Rails applications.

**Practical example**

```ruby
require "json"
require_relative "support/formatter"
load "./settings.rb"
```

**Important points and follow-ups**

- require can raise LoadError.
- Do not equate “load once” with loading exactly once under every possible alias or explicit manual modification.

**Source references**

- SRC-00220 — [seven.txt:69–81](../ruby/seven.txt) (4) · [complete source](sources/seven.md)


---

<a id="a-0165"></a>

### A-0165 — What is the purpose of the initialize method in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the purpose of the initialize method in Ruby?

**Direct answer**

A class defines behavior for its instances. Class#new normally allocates an object and calls its initialize method; initialize sets state, while new returns the constructed object.

**Detailed explanation**

Define instance methods in a class and expose state deliberately with accessors. A subclass declaration uses < to inherit from one superclass; overridden methods can call super to extend inherited behavior. initialize is a private instance method and is more precisely an initialization hook than the allocator itself.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- The return value of initialize is not the return value of the normal Class#new call.

**Source references**

- SRC-00249 — [eight.txt:87–96](../ruby/eight.txt) (Junior-08) · [complete source](sources/eight.md)


---

<a id="a-0166"></a>

### A-0166 — What is the purpose of the self keyword in Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 8

**Interview question**

What is the purpose of the self keyword in Ruby?

**Direct answer**

self is the current receiver. It is the instance inside an instance method, the class inside a class body or class method, and normally the defining context inside a block.

**Detailed explanation**

Use self to distinguish a writer-method call from a local assignment: self.name = value invokes name=, while name = value defines a local. instance_eval and instance_exec can intentionally change self when running a block. Defining def self.build in a class body defines a singleton method on that class object.

**Practical example**

```ruby
class User
  attr_accessor :name
  def rename(value)
    self.name = value
  end
end
```

**Important points and follow-ups**

- self is a receiver, not a reference to a statically determined class.

**Corrections and source limitations**

- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00040 — [first.txt:276–280](../ruby/first.txt) (10) · [complete source](sources/first.md)
- SRC-00159 — [four.txt:82–88](../ruby/four.txt) (8) · [complete source](sources/four.md)
- SRC-00223 — [seven.txt:105–133](../ruby/seven.txt) (7) · [complete source](sources/seven.md)
- SRC-00527 — [nineteen.txt:510–529](../ruby/nineteen.txt) (26) · [complete source](sources/nineteen.md)
- SRC-00627 — [twentyfour.txt:586–636](../ruby/twentyfour.txt) (13) · [complete source](sources/twentyfour.md)
- SRC-00649 — [fifteen.txt:89–90](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00677 — [sixteen.txt:186–212](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01174 — [twentyeight.txt:217–238](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00040 (first.txt)</summary>

**Original prompt:** Describe the role of 'self' in Ruby and its contexts.

**Answer:** self is the current receiver: an instance within instance methods, the class within its class body/class methods, or another object after explicit rebinding.

In Ruby, the self is a special variable that refers to the current object or instance. Its role can change depending on the context in which it's used. Inside an instance method, the self refers to the object on which the method is being called.

In a class method, the self refers to the class itself. Understanding and manipulating the self is crucial for accessing instance variables, calling other methods within the same object, and defining class-level behavior.

```ruby
class Demo
  def receiver; self; end
  def self.receiver; self; end
end
p Demo.receiver # Demo
p Demo.new.receiver.class # Demo
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00649 (fifteen.txt)</summary>

**Original prompt:** What does self mean in Ruby?

**Answer:** self is the current receiver; it changes with execution context.

Inside an instance method self is that instance. In a class body or class method it is the class object. self is often used when assigning through a setter, or defining a singleton/class method. Calling another class method from a class method does not always require an explicit self receiver.

```ruby
class User
  def self.kind = self
  def receiver = self
end
User.kind # User
User.new.receiver # the instance
```

</details>


---

<a id="a-0167"></a>

### A-0167 — What is the return value for:

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the return value for:

**Direct answer**

All four forms can invoke xyz on a newly constructed ABC instance, assuming ABC.new and xyz exist. Their return value depends on xyz.

**Detailed explanation**

Ruby permits :: for a method receiver in these forms as well as for namespaces, but . is the conventional method-call syntax and avoids ambiguity. The source omits ABC’s definition, so no concrete return value can be asserted.

**Practical example**

```ruby
class ABC
  def xyz = 42
end
p ABC.new.xyz # 42
```

**Important points and follow-ups**

- Syntactic validity and a specific return value are separate questions.

**Corrections and source limitations**

- Incomplete source: ABC/xyz implementation is missing.

**Source references**

- SRC-00363 — [nine.txt:726–737](../ruby/nine.txt) (92) · [complete source](sources/nine.md)


---

<a id="a-0168"></a>

### A-0168 — What is the use of .capitalize method?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the use of .capitalize method?

**Direct answer**

Option b is closest, with an important qualification: upcase uppercases the full string; capitalize uppercases the first character and lowercases the remainder.

**Detailed explanation**

The exact effect follows Ruby’s Unicode casing rules and options. Both methods return a new String; their bang variants mutate the receiver and may return nil when nothing changes.

**Practical example**

```ruby
p "hELLO wORLD".upcase # "HELLO WORLD"
p "hELLO wORLD".capitalize # "Hello world"
```

**Important points and follow-ups**

- capitalize also lowercases the rest; it does not merely preserve all following characters.

**Corrections and source limitations**

- Source simplification omitted lowercasing the remaining characters.

**Source references**

- SRC-00359 — [nine.txt:683–691](../ruby/nine.txt) (88) · [complete source](sources/nine.md)


---

<a id="a-0169"></a>

### A-0169 — What Is The Use Of Interpolation In Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What Is The Use Of Interpolation In Ruby?

**Direct answer**

String interpolation evaluates #{expression} inside a double-quoted or other interpolating string and inserts the result using to_s.

**Detailed explanation**

Use interpolation for readable presentation of variables and expressions. Single-quoted strings preserve #{...} literally. Interpolation is not input escaping: embedding values directly in SQL, HTML or shell commands can introduce injection vulnerabilities, so use the appropriate parameterization or escaping mechanism for those contexts.

**Practical example**

```ruby
name = "Asha"
p "Hello, #{name}: #{2 + 3}" # "Hello, Asha: 5"
p 'Hello, #{name}' # literal characters
```

**Important points and follow-ups**

- Interpolated nil becomes an empty string through nil.to_s.

**Source references**

- SRC-00332 — [nine.txt:509–512](../ruby/nine.txt) (61) · [complete source](sources/nine.md)


---

<a id="a-0170"></a>

### A-0170 — What is the use of load and require in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 8

**Interview question**

What is the use of load and require in Ruby?

**Direct answer**

require loads a feature once and records it in $LOADED_FEATURES; load executes a file each time. require_relative resolves its path relative to the file containing the call.

**Detailed explanation**

Use require for libraries and installed gems, and require_relative for a related project file when not using an autoloader. A successful new require returns true; a previously loaded feature normally returns false. load is deliberate re-execution, not the Rails autoloader. Prefer Rails’ configured autoloading conventions inside Rails applications.

**Practical example**

```ruby
require "json"
require_relative "support/formatter"
load "./settings.rb"
```

**Important points and follow-ups**

- require searches $LOAD_PATH as well as accepting explicit paths; it is not limited to absolute paths.
- require can raise LoadError.
- Do not equate “load once” with loading exactly once under every possible alias or explicit manual modification.
- require does not simply paste a file’s text into lexical scope.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source correction: The source misspells require and incorrectly ties file loading to visiting URLs. require tracks loaded features; require_relative resolves relative to its calling file; load reruns the file. Rails autoloading/reloading is a separate subsystem.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected load versus require: both execute code; require caches loaded features.

**Source references**

- SRC-00008 — [first.txt:54–56](../ruby/first.txt) (8) · [complete source](sources/first.md)
- SRC-00280 — [nine.txt:78–81](../ruby/nine.txt) (9) · [complete source](sources/nine.md)
- SRC-00333 — [nine.txt:513–516](../ruby/nine.txt) (62) · [complete source](sources/nine.md)
- SRC-00438 — [eleven.txt:197–210](../ruby/eleven.txt) (15) · [complete source](sources/eleven.md)
- SRC-00519 — [nineteen.txt:371–376](../ruby/nineteen.txt) (18) · [complete source](sources/nineteen.md)
- SRC-00729 — [thirty.txt:178–182](../ruby/thirty.txt) (45) · [complete source](sources/thirty.md)
- SRC-01361 — [twentytwo.txt:253–255](../ruby/twentytwo.txt) (16) · [complete source](sources/twentytwo.md)
- SRC-01415 — [twentythree.txt:162–164](../ruby/twentythree.txt) (Q23) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00008 (first.txt)</summary>

**Original prompt:** What is the use of load and required?

**Answer:** require loads a feature once and tracks it in $LOADED_FEATURES. require_relative resolves from the current file; load executes a file again on each call.

The source misspells require and incorrectly ties file loading to visiting URLs. require tracks loaded features; require_relative resolves relative to its calling file; load reruns the file. Rails autoloading/reloading is a separate subsystem.

```ruby
require "json"
require "json" # returns false if already loaded
# In a project file:
# require_relative "lib/user"
# load "lib/user.rb"
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00729 (thirty.txt)</summary>

**Original prompt:** What is the use of load and require in Ruby?

**Answer:** load executes a Ruby file each time; require loads a feature once and tracks it; require_relative resolves relative to the calling file.

require can search configured load paths and load supported native extensions. require returns false when the feature is already loaded. load is useful for deliberate repeated execution but is not a substitute for Rails’ Zeitwerk reloader. Never load a path controlled by untrusted input.

```ruby
require "json"
require_relative "lib/parser"
load "./script.rb" # executes again on the next load
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01415 (twentythree.txt)</summary>

**Original prompt:** What is the Role of Load and Require in Ruby?

**Answer:** load executes a Ruby file every time; require loads a feature only when it has not already been required.

require resolves features using the load path and records them in $LOADED_FEATURES. require_relative resolves relative to the current file. load accepts a path and can execute within an anonymous module when wrapping is requested. Repeated load can redefine methods and rerun side effects.

```ruby
require "json"           # true first time, false thereafter
require_relative "rules" # rules.rb beside this source file
load "./config_task.rb"  # executed each time
```

</details>


---

<a id="a-0171"></a>

### A-0171 — What is your favorite api resource for ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is your favorite api resource for ruby?

**Direct answer**

Choose tools based on the requirement and explain one you have actually used, including an alternative and its trade-off.

**Detailed explanation**

For example, Minitest versus RSpec concerns test style/tooling; Active Storage versus an upload gem concerns storage/workflow needs. Paperclip is a legacy attachment library and FactoryGirl is now FactoryBot. No list of gems is essential for every Rails app. Consult the API documentation matching the installed Ruby/Rails version.

**Practical example**

```text
Example interview response: “I used Active Storage for direct S3 uploads; I considered Shrine when custom processing pipelines were the main requirement.”
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00685 — [sixteen.txt:323–325](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)


---

<a id="a-0172"></a>

### A-0172 — What will be the output of the following code?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What will be the output of the following code?

**Direct answer**

It prints Hello Woof! followed by a newline.

**Detailed explanation**

Dog#speak calls the next speak implementation using super. Animal#speak returns "Hello"; concatenating " Woof!" produces the string printed by puts. The final puts itself returns nil.

**Practical example**

```ruby
p Dog.new.speak # assuming the classes in the source are defined: "Hello Woof!"
```

**Important points and follow-ups**

- super continues method lookup; + builds a String value.

**Source references**

- SRC-00254 — [eight.txt:145–163](../ruby/eight.txt) (Mid-03) · [complete source](sources/eight.md)


---

<a id="a-0173"></a>

### A-0173 — What will be the output?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What will be the output?

**Direct answer**

As pasted, Ruby.reverse.upcase raises NameError unless a Ruby constant is defined; with the intended string "Ruby", the result is "YBUR".

**Detailed explanation**

Capitalized Ruby is parsed as a constant, not a quoted String. The MCQ’s choices imply that quotes were lost or omitted. Distinguish the literal pasted program from the likely intended expression rather than silently correcting the prompt.

**Practical example**

```ruby
"Ruby".reverse.upcase # "YBUR"
# Ruby.reverse.upcase # NameError in a normal fresh Ruby process
```

**Important points and follow-ups**

- All original multiple-choice options are preserved in sourceAnswer.

**Corrections and source limitations**

- Incomplete/malformed source prompt: the expected string quotes are absent.

**Source references**

- SRC-01390 — [twentytwo.txt:475–486](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0174"></a>

### A-0174 — What will be the value of:

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What will be the value of:

**Direct answer**

The preceding definitions of foo and bar are missing, so the exact defined? results cannot be determined.

**Detailed explanation**

defined? examines whether an expression is recognized without ordinarily evaluating it and returns a descriptive String or nil. Merely reading an unknown identifier does not universally initialize a local to nil; parser-visible assignment can establish a local even when the assignment branch is not executed.

**Practical example**

```ruby
foo = 1 if false
p defined?(foo) # "local-variable"
p foo           # nil
p defined?(bar) # nil, if no such local/method exists
```

**Important points and follow-ups**

- Results depend on scope and available methods.

**Corrections and source limitations**

- Incomplete source and inaccurate explanation: missing prior code; reading alone does not define a local.

**Source references**

- SRC-00365 — [nine.txt:762–770](../ruby/nine.txt) (94) · [complete source](sources/nine.md)


---

<a id="a-0175"></a>

### A-0175 — What will be the values of:

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What will be the values of:

**Direct answer**

The class A and method a are absent, so the stated nil and 4 outputs cannot be established from the source alone.

**Detailed explanation**

A plausible teaching example is a method whose final expression is an if without else, returning the square for a positive input and nil otherwise. But many other implementations are possible; do not present that reconstruction as the supplied original.

**Practical example**

```ruby
class A
  def self.a(x)
    x * x if x > 0
  end
end
p [A.a(0), A.a(2)] # [nil, 4], for this reconstruction only
```

**Important points and follow-ups**

- if expressions without a matching branch or else return nil.

**Corrections and source limitations**

- Incomplete source: defining class/method is missing.

**Source references**

- SRC-00360 — [nine.txt:692–706](../ruby/nine.txt) (89) · [complete source](sources/nine.md)


---

<a id="a-0176"></a>

### A-0176 — What will val1 and val2 equal after the code below is executed? Explain your answer.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What will val1 and val2 equal after the code below is executed? Explain your answer.

**Direct answer**

The source omits the code that defines val1 and val2, so their exact values cannot be verified from this file alone.

**Detailed explanation**

The included explanation is about operator precedence: and/or bind less tightly than assignment, whereas &&/|| bind more tightly. The following is an illustrative reconstruction, not recovered source code.

**Practical example**

```ruby
val1 = true and false
val2 = true && false
p [val1, val2] # [true, false]
```

**Important points and follow-ups**

- Do not claim an output for absent code.

**Corrections and source limitations**

- Incomplete source: referenced val1/val2 code is absent.

**Source references**

- SRC-00320 — [nine.txt:381–388](../ruby/nine.txt) (49) · [complete source](sources/nine.md)


---

<a id="a-0177"></a>

### A-0177 — When do we use "I" in Ruby?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

When do we use "I" in Ruby?

**Direct answer**

self is the current receiver; it changes with execution context.

**Detailed explanation**

Inside an instance method self is that instance. In a class body or class method it is the class object. self is often used when assigning through a setter, or defining a singleton/class method. Calling another class method from a class method does not always require an explicit self receiver.

**Practical example**

```ruby
class User
  def self.kind = self
  def receiver = self
end
User.kind # User
User.new.receiver # the instance
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01048 — [thirtyseven.txt:186–194](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="a-0178"></a>

### A-0178 — When would you use Struct or Data?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

When would you use Struct or Data?

**Direct answer**

Struct creates lightweight mutable record classes; Data.define (Ruby 3.2+) creates value-like classes without member writers.

**Detailed explanation**

Use Data when fixed attributes communicate a value object, and Struct when field reassignment is intended. Data objects do not recursively freeze member values, so a stored Array or String can still change. “Preferred” depends on the application interface, not a universal rule.

**Practical example**

```ruby
Event = Data.define(:tags)
event = Event.new(tags: ["ruby"])
event.tags << "rails" # nested Array remains mutable
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/Data.html

**Corrections and source limitations**

- Qualified “immutable” as shallow member protection; preserved nested mutability.

**Source references**

- SRC-00537 — [nineteen.txt:675–687](../ruby/nineteen.txt) (36) · [complete source](sources/nineteen.md)


---

<a id="a-0179"></a>

### A-0179 — Which of the following is not a valid datatype in Ruby?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Which of the following is not a valid datatype in Ruby?

**Direct answer**

Float and Integer are built-in Ruby numeric classes; Timedate and Binary are not built-in core class names.

**Detailed explanation**

The source MCQ is ambiguous because it expects one choice while offering at least two non-core names. Time is built in and Date/DateTime are library classes. Binary data is commonly stored in a String with an appropriate encoding, not a core Binary type.

**Practical example**

```text
1.class # Integer
1.0.class # Float
"bytes".b.encoding # ASCII-8BIT
```

**Important points and follow-ups**

- Ambiguous MCQ: both Timedate and Binary are not Ruby core data-type names.
- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01391 — [twentytwo.txt:487–497](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0180"></a>

### A-0180 — Which Ruby implementations exist, and how do their runtimes differ?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Which Ruby implementations exist, and how do their runtimes differ?

**Direct answer**

CRuby/MRI is the reference Ruby implementation; JRuby runs on the JVM and TruffleRuby uses the GraalVM/Truffle implementation approach. Historical runtimes such as Rubinius have different status and compatibility.

**Detailed explanation**

Runtime choice affects concurrency, native-gem compatibility, startup time, memory and interoperability. Do not assume a dated list proves current project maintenance. Interview code should target the agreed runtime and version, especially when discussing GVL behavior or C extensions.

**Practical example**

```ruby
puts RUBY_ENGINE
puts RUBY_VERSION
```

**Important points and follow-ups**

- Reference: https://www.ruby-lang.org/en/documentation/ruby-from-other-languages/

**Corrections and source limitations**

- The source’s 2022/2023 popularity and salary statistics are historical context, not current evidence.

**Source references**

- SRC-00439 — [thirteen.txt:16–22](../ruby/thirteen.txt) (runtime) · [complete source](sources/thirteen.md)


---

<a id="a-0181"></a>

### A-0181 — Who is the developer of Ruby?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Who is the developer of Ruby?

**Direct answer**

Ruby was designed by Yukihiro Matsumoto, usually called Matz, and first publicly released in 1995.

**Detailed explanation**

The source misspells his nickname as “Martz”. The language was designed in Japan; historical naming anecdotes are less useful in an interview than explaining the design goals.

**Practical example**

```ruby
p RUBY_DESCRIPTION
```

**Important points and follow-ups**

- Ruby’s creator and the language’s release date are separate facts.

**Corrections and source limitations**

- Corrected creator nickname from Martz to Matz.

**Source references**

- SRC-00273 — [nine.txt:15–19](../ruby/nine.txt) (2) · [complete source](sources/nine.md)


---

<a id="a-0182"></a>

### A-0182 — Why is it advised to rescue from _StandardError_ rather than _Exception_?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Why is it advised to rescue from _StandardError_ rather than _Exception_?

**Direct answer**

Rescue StandardError or narrower application errors so process-control/system exceptions can propagate, including Interrupt and SystemExit.

**Detailed explanation**

Rescue StandardError or narrower application errors so process-control/system exceptions can propagate, including Interrupt and SystemExit. Rescuing Exception catches fatal/control exceptions and can prevent expected shutdown.

**Practical example**

```ruby
begin
  raise ArgumentError, "invalid input"
rescue StandardError => e
  warn e.message
end
```

**Important points and follow-ups**

- Rescuing Exception catches fatal/control exceptions and can prevent expected shutdown.

**Source references**

- SRC-00168 — [five.txt:34–39](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="a-0183"></a>

### A-0183 — What is Dependency Injection, and how do you achieve it in Rails?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is Dependency Injection, and how do you achieve it in Rails?

**Direct answer**

Dependency injection passes a collaborator into an object instead of constructing or locating it implicitly inside the operation.

**Detailed explanation**

It makes behavior easier to test and replace without global patching. In Ruby constructor parameters with sensible defaults often suffice; Rails initializers may assemble the dependencies but are not themselves the injection mechanism.

**Practical example**

```ruby
class ReceiptSender
  def initialize(delivery:) = @delivery = delivery
  def call(message) = @delivery.deliver(message)
end
```

**Important points and follow-ups**

- Avoid using a global service locator and calling it dependency injection.

**Source references**

- SRC-00398 — [ten.txt:147–152](../ruby/ten.txt) (27) · [complete source](sources/ten.md)


---

<a id="a-0184"></a>

### A-0184 — What is the significance of Ruby in the context of ethical hacking and cybersecurity?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is the significance of Ruby in the context of ethical hacking and cybersecurity?

**Direct answer**

Ruby supports automation and security tooling; Metasploit is one established Ruby ecosystem example. Python is also a high-level language, not a low-level alternative.

**Detailed explanation**

Ruby is a high-level dynamic language used in security automation and tools such as Metasploit. Python is also high-level; calling it a lower-level language is incorrect. Tool choice should be based on supported APIs, constraints and team familiarity.

**Practical example**

```text
# Safe example: parse an application log to count authentication failures.
```

**Important points and follow-ups**

- Use authorization and validated scope for security testing. Tool popularity does not establish language-level security.

**Corrections and source limitations**

- Source correction: Ruby is a high-level dynamic language used in security automation and tools such as Metasploit. Python is also high-level; calling it a lower-level language is incorrect. Tool choice should be based on supported APIs, constraints and team familiarity.

**Source references**

- SRC-00091 — [first.txt:513–515](../ruby/first.txt) (31) · [complete source](sources/first.md)


---

<a id="a-0185"></a>

### A-0185 — Blocks

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Blocks

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Source references**

- SRC-01164 — [twentyeight.txt:19–48](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0186"></a>

### A-0186 — Can a Ruby process leak memory, and how would you diagnose it?

**Difficulty:** Advanced · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Can a Ruby process leak memory, and how would you diagnose it?

**Direct answer**

A Ruby process can retain memory indefinitely through reachable objects or leak native memory even though garbage collection exists.

**Detailed explanation**

Compare RSS, allocation rates and live-object counts over time; use GC.stat, ObjectSpace snapshots and appropriate sampling or allocation profilers. An unbounded cache or retained request object is an application leak, while allocator fragmentation can keep RSS high without the same live-object growth. Bound lifetime or ownership, verify the fix, and treat restarts as mitigation.

**Practical example**

```ruby
p GC.stat.slice(:heap_live_slots, :total_allocated_objects)
```

**Important points and follow-ups**

- Allocator changes and worker restarts may mitigate symptoms but do not prove the retention bug is fixed.

**Source references**

- SRC-00551 — [nineteen.txt:921–926](../ruby/nineteen.txt) (50) · [complete source](sources/nineteen.md)


---

<a id="a-0187"></a>

### A-0187 — Consider the following code:

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Consider the following code:



```ruby
VAL = 'Global'
 
module Foo
  VAL = 'Foo Local'
 
  class Bar
    def value1
      VAL
    end
  end
end
 
class Foo::Bar
  def value2
    VAL
  end
end

```


What will be the value of each of the following:



```ruby
Foo::Bar.new.value1
Foo::Bar.new.value2

```


Explain your answer.

**Direct answer**

value1 finds Foo::VAL through lexical nesting; value2, defined using class Foo::Bar, does not have Foo in lexical nesting and finds the top-level VAL.

**Detailed explanation**

`Foo::Bar.new.value1` will be equal to `'Foo Local'` and `Foo::Bar.new.value2` will be equal to `'Global'`.


Here’s why:


The `module` keyword (as well as the `class` and `def` keywords) will create a new lexical scope for all of its contents.  The above module `Foo` therefore creates the scope `Foo` in which the `VAL` constant equal to `'Foo Local'` is defined.  Inside `Foo`, we declare class `Bar`, which creates another new lexical scope (named `Foo::Bar`) which also has access to its parent scope (i.e., `Foo`) and all of its constants.


However, when we then declare `Foo::Bar` (i.e., using `::`), we are actually creating yet another lexical scope, which is also named `Foo::Bar` (how’s that for confusing!).  However, this lexical scope has no parent (i.e., it is entirely independent of the lexcial scope `Foo` created earlier) and therefore does not have any access to the contents of the ‘Foo’ scope.  Therefore, inside class `Foo::Bar`, we only have access to the `VAL` constant declared at the beginning of the script (i.e., outside of any module) with the value `'Global'`.

**Practical example**

```ruby
VAL = "Global"
module Foo
  VAL = "Foo Local"
  class Bar
    def value1; VAL; end
  end
end
class Foo::Bar
  def value2; VAL; end
end
p [Foo::Bar.new.value1, Foo::Bar.new.value2]
```

**Important points and follow-ups**

- Qualified names and nested class/module syntax produce different Module.nesting.

**Source references**

- SRC-00106 — [second.txt:103–138](../ruby/second.txt) (Q6) · [complete source](sources/second.md)


---

<a id="a-0188"></a>

### A-0188 — Consider the following two methods:

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Consider the following two methods:



```ruby
def times_two(arg1);
  puts arg1 * 2;
end

def sum(arg1, arg2);
  puts arg1 + arg2;
end

```


What will be the result of each of the following lines of code:



```ruby
times_two 5
times_two(5)
times_two (5)
sum 1, 2
sum(1, 2)
sum (1, 2)

```

**Direct answer**

The first three calls print 10 and the next two print 3. sum (1, 2) is a syntax error because a spaced parenthesized expression is parsed as one argument.

**Detailed explanation**

The first three lines of code will all print out 10, as expected.


The next two lines of code will both print out 3, as expected.


However, the last line of code (i.e., `sum (1,2)`) will result in the following:



```ruby
syntax error, unexpected ',', expecting ')'
sum (1, 2)
       ^

```


The problem is the space between the method name and the open parenthesis.  Because of the space, the Ruby parser thinks that `(1, 2)` is an expression that represents a single argument, but `(1, 2)` is not a valid Ruby expression, hence the error.


Note that the problem does not occur with single argument methods (as shown with our `timesTwo` method above), since the single value is a valid expression (e.g., `(5)` is a valid expression which simply evaluates to 5).

**Practical example**

```ruby
def sum(a, b); a + b; end
p sum(1, 2) # 3
```

**Important points and follow-ups**

- A syntax error prevents the whole file from executing; evaluate invalid forms separately when demonstrating earlier outputs.

**Source references**

- SRC-00105 — [second.txt:69–103](../ruby/second.txt) (Q5) · [complete source](sources/second.md)


---

<a id="a-0189"></a>

### A-0189 — Discuss the concept of blocks and their significance.

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Discuss the concept of blocks and their significance.

**Direct answer**

A block is an executable closure supplied to a method using braces or do/end. Methods invoke it with yield or capture it as a Proc using &block.

**Detailed explanation**

Blocks in Ruby are chunks of code enclosed between do..end or curly braces {..}. They can accept input and are used throughout Ruby, particularly with methods and iterators, as a way to pass around chunks of code. Blocks can be invoked from a function using the yield keyword.

Here's an example:

hello world ruby.jpeg

In this example, 3.times is a method call and everything between do and end is a block. The times method uses the block by calling it a certain number of times (in this case, three times), which results in "Hello, World!" being output to the console three times.

Blocks in Ruby can also take parameters. The parameters are defined between pipe characters (|) at the beginning of the block. For example:

blocks in ruby.jpeg

In this example, the each method is called on an array and passes each element of the array to the block one at a time. The block takes one parameter, number, and outputs it to the console. This results in "Number: 1", "Number: 2", and "Number: 3" being output to the console.

**Practical example**

```ruby
3.times { puts "Hello, World!" }
[1, 2, 3].each { |number| puts "Number: #{number}" }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source refers to image-only examples that are not present in the text collection; replacement examples are authored and do not claim to reconstruct those images.

**Source references**

- SRC-00030 — [first.txt:213–234](../ruby/first.txt) (30) · [complete source](sources/first.md)


---

<a id="a-0190"></a>

### A-0190 — Explain About Ruby Code Blocks?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain About Ruby Code Blocks?

**Direct answer**

A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.

**Detailed explanation**

Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.

**Practical example**

```ruby
def twice
  2.times { yield }
end
twice { puts "hello" }
```

**Important points and follow-ups**

- Calling yield without a supplied block raises LocalJumpError.

**Source references**

- SRC-00334 — [nine.txt:517–522](../ruby/nine.txt) (63) · [complete source](sources/nine.md)


---

<a id="a-0191"></a>

### A-0191 — Explain ampersand parameter (&block) in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain ampersand parameter (&block) in Ruby?

**Direct answer**

yield invokes the block passed to the current method, while block_given? reports whether that block exists. An &block parameter captures the block as a Proc, or nil when no block was supplied.

**Detailed explanation**

Yield values to parameterize a caller’s behavior, such as an iterator yielding each record. Methods that offer optional callbacks should test block_given? or a captured block. At a call site, &callable turns a Proc or another object supporting to_proc into the method’s implicit block.

**Practical example**

```ruby
def transform(x)
  block_given? ? yield(x) : x
end
p transform(4) { |n| n * n } # 16
p transform(4) # 4
```

**Important points and follow-ups**

- The name block after & is conventional, not mandatory.

**Source references**

- SRC-00293 — [nine.txt:144–149](../ruby/nine.txt) (22) · [complete source](sources/nine.md)


---

<a id="a-0192"></a>

### A-0192 — Explain each of the following operators and how and when they should be used:  `==`, `===`, `eql?`, `equal?`.

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain each of the following operators and how and when they should be used:  `==`, `===`, `eql?`, `equal?`.

**Direct answer**

== is value equality, === is case-style matching, eql? with hash defines hash-key equivalence, and equal? is identity. Each class controls its equality/matching semantics.

**Detailed explanation**

== is value equality, === is case-style matching, eql? with hash defines hash-key equivalence, and equal? is identity. Each class controls its equality/matching semantics. eql? is not a universal automated "same value and type" check; it is class-defined. Implement eql? and hash together.

**Practical example**

```ruby
p [1 == 1.0, 1.eql?(1.0), (1..5) === 3, String === "hi"]
```

**Important points and follow-ups**

- eql? is not a universal automated "same value and type" check; it is class-defined. Implement eql? and hash together.

**Corrections and source limitations**

- Correction/qualification: == is value equality, === is case-style matching, eql? with hash defines hash-key equivalence, and equal? is identity. Each class controls its equality/matching semantics. eql? is not a universal automated "same value and type" check; it is class-defined. Implement eql? and hash together.

**Source references**

- SRC-00108 — [second.txt:151–161](../ruby/second.txt) (Q8) · [complete source](sources/second.md)


---

<a id="a-0193"></a>

### A-0193 — Explain each of the following operators and how and when they should be used: ==, ===, eql?, equal?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain each of the following operators and how and when they should be used: ==, ===, eql?, equal?

**Direct answer**

== expresses class-specific value equality; equal? tests object identity; eql? together with hash determines Hash-key equality; === provides class-specific case matching.

**Detailed explanation**

Integer distinguishes 1.eql?(1.0) from 1 == 1.0, but eql? is not a universal built-in “compare value and type” algorithm: classes define their own behavior. If two objects are eql?, they must return the same hash. A case/when clause effectively asks pattern === value, so Class, Range and Regexp give different matching meanings.

**Practical example**

```ruby
p 1 == 1.0       # true
p 1.eql?(1.0)    # false
p (1..3) === 2   # true
s = "a"; p s.equal?(s) # true
```

**Important points and follow-ups**

- Never override equal? to implement ordinary value equality.
- Keep key fields stable while an object is in a Hash.
- Reference: https://docs.ruby-lang.org/en/3.4/Object.html

**Source references**

- SRC-00324 — [nine.txt:435–444](../ruby/nine.txt) (53) · [complete source](sources/nine.md)


---

<a id="a-0194"></a>

### A-0194 — Explain the concept of a block in Ruby and provide an example of its usage.

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain the concept of a block in Ruby and provide an example of its usage.

**Direct answer**

A block groups deferred behavior for a method call. yield executes the caller-supplied block, optionally passing arguments.

**Detailed explanation**

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

**Practical example**

```ruby
def surround
  puts "start"
  yield
  puts "end"
end
surround { puts "middle" }
```

**Important points and follow-ups**

- Calling a required yield without a block raises LocalJumpError.

**Source references**

- SRC-00128 — [three.txt:99–123](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0195"></a>

### A-0195 — Explain the difference between Array#each and Array#map

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 3

**Interview question**

Explain the difference between Array#each and Array#map

**Direct answer**

each executes a block for each element and normally returns its receiver; map collects block results into a new array.

**Detailed explanation**

Use each for side effects and map for transformations. Neither method itself replaces receiver elements, but the block can mutate referenced objects or the receiver. Without a block, these methods return an Enumerator. map! replaces elements in place.

**Practical example**

```ruby
numbers = [1, 2, 3]
p numbers.map { |n| n * 2 } # [2, 4, 6]
p numbers.each { |n| n * 2 } # [1, 2, 3]
```

**Important points and follow-ups**

- A map block calling puts produces nil entries.
- Returning a new array is not deep copying the objects inside it.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Qualified source’s claim that each/map leave the original unaffected regardless of block behavior.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Qualified the claim that each cannot mutate data: its block can mutate objects.

**Source references**

- SRC-00361 — [nine.txt:707–715](../ruby/nine.txt) (90) · [complete source](sources/nine.md)
- SRC-00811 — [thirtyeight.txt:228–229](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01439 — [twentythree.txt:610–630](../ruby/twentythree.txt) (Q47) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00361 (nine.txt)</summary>

**Original prompt:** What is the difference between Array#map and Array#each?

**Answer:** Array#each yields elements and normally returns the original array; Array#map returns a new array containing each block result. collect is an alias of map.

Neither method intrinsically guarantees the source’s contents remain unchanged: the block can mutate elements or shared state. map! replaces array elements in place. Use each for effects and map when its resulting collection is needed.

```ruby
a = [1, 2]
p a.each { |n| n * 2 } # [1, 2]
p a.map { |n| n * 2 } # [2, 4]
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00811 (thirtyeight.txt)</summary>

**Original prompt:** Explain the difference between Array#each and Array#map.

**Answer:** each performs an operation for every element and normally returns the original collection; map returns an array of block results.

Use each for side effects and map for transformation. Without a block they normally return an Enumerator. map! mutates a compatible receiver in place and has a different contract.

```text
[1, 2].map { |n| n * 2 } # [2, 4]
[1, 2].each { |n| puts n } # prints values, returns [1, 2]
```

</details>


---

<a id="a-0196"></a>

### A-0196 — Explain the difference between modules and classes in Ruby and when to use each.

**Difficulty:** Advanced · **Topic:** Blocks, callables and iteration · **Source occurrences:** 9

**Interview question**

Explain the difference between modules and classes in Ruby and when to use each.

**Direct answer**

Use a class for objects with state and lifecycle; use a module for namespaces and reusable mixed-in behavior. A Class itself is a subclass of Module.

**Detailed explanation**

In Ruby, both modules and classes serve as containers for methods and constants, but they serve different purposes:

Classes: Classes define objects with attributes (instance variables) and behaviors (methods). They support inheritance, encapsulation, and object instantiation. Classes are used when you want to create objects with specific attributes and behaviors and group related functionality.
Modules: Modules are similar to classes, but they cannot be instantiated or serve as a blueprint for objects. Instead, they act as containers for methods and constants that can be included in classes or other modules using the include or extend keyword. Modules are used when you want to share functionality across multiple classes without creating a full-blown class hierarchy.
Use classes when you want to create objects and define their behavior. Use modules when you want to share methods and constants across multiple classes or define mixins that can be included in various classes.

**Practical example**

```ruby
module Named
  def label; @name; end
end
class Person
  include Named
  def initialize(name); @name = name; end
end
p Person.new("Ana").label
```

**Important points and follow-ups**

- Module objects can have instance variables, and mixed-in methods can use the receiving object’s state.
- Module objects can maintain state; methods mixed into receivers can access receiver instance variables.
- Modules themselves are objects: Module.new creates a module, not an instance of that module.
- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Source falsely says modules have no state (except class variables) and cannot use super.

**Source references**

- SRC-00022 — [first.txt:175–179](../ruby/first.txt) (22) · [complete source](sources/first.md)
- SRC-00144 — [three.txt:413–422](../ruby/three.txt) · [complete source](sources/three.md)
- SRC-00163 — [five.txt:7–10](../ruby/five.txt) · [complete source](sources/five.md)
- SRC-00180 — [six.txt:254–373](../ruby/six.txt) (Q4) · [complete source](sources/six.md)
- SRC-00224 — [seven.txt:134–155](../ruby/seven.txt) (8) · [complete source](sources/seven.md)
- SRC-00348 — [nine.txt:592–597](../ruby/nine.txt) (77) · [complete source](sources/nine.md)
- SRC-00673 — [sixteen.txt:51–89](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01170 — [twentyeight.txt:119–150](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01180 — [twentyeight.txt:303–305](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00022 (first.txt)</summary>

**Original prompt:** What are modules and how are they different from classes?

**Answer:** Classes create instances and have one superclass. Modules provide namespaces and reusable methods through include/prepend/extend; they cannot be directly instantiated as domain objects.

Classes create instances and have one superclass. Modules provide namespaces and reusable methods through include/prepend/extend; they cannot be directly instantiated as domain objects. Module objects can have instance variables, and mixed-in methods can use the receiving object’s state.

```ruby
module Greetable
  def greet; "hello"; end
end
class User; include Greetable; end
p User.new.greet
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00163 (five.txt)</summary>

**Original prompt:** What is the difference between a module and class?

**Answer:** A class can construct instances and inherit one superclass; a module supplies namespaces/mixins and is not directly instantiated as a domain object.

A class can construct instances and inherit one superclass; a module supplies namespaces/mixins and is not directly instantiated as a domain object. Module objects can maintain state; methods mixed into receivers can access receiver instance variables.

```ruby
p Class < Module # true
module Labels; end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00180 (six.txt)</summary>

**Original prompt:** What is the difference between class and module in Ruby?

**Answer:** Classes create instances and support a superclass; modules provide namespaces and mixed-in methods. A module object can have instance variables, and module methods can call super in an ancestor chain.

Classes create instances and support a superclass; modules provide namespaces and mixed-in methods. A module object can have instance variables, and module methods can call super in an ancestor chain. Source falsely says modules have no state (except class variables) and cannot use super.

```ruby
module Named
  @label = "namespace state"
  def label; @label; end
end
class Person
  include Named
  def initialize; @label = "person state"; end
end
p Person.new.label
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00224 (seven.txt)</summary>

**Original prompt:** What is the difference between a Ruby class and a module?

**Answer:** A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.

Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.

```ruby
module Greetable
  def greet = "hello"
end
class User
  include Greetable
end
p User.new.greet # "hello"
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00673 (sixteen.txt)</summary>

**Original prompt:** What is a module?  Can you tell me the difference between classes and modules?

**Answer:** Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.

include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.

```ruby
module Printable
  def print_label = "label"
end
class Product
  include Printable
end
Product.new.print_label
```

</details>


---

<a id="a-0197"></a>

### A-0197 — Explain the difference between puts and print in Ruby. Also, describe the concept of blocks and how they are used.

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain the difference between puts and print in Ruby. Also, describe the concept of blocks and how they are used.

**Direct answer**

puts prints values with line endings, while print writes values without automatically appending a newline. Ruby blocks are closures passed to methods for caller-defined behavior.

**Detailed explanation**

puts handles arrays by printing their elements recursively and avoids adding a second newline when a string already ends with one. print uses object string representations. Methods such as each and map invoke the supplied block, and a custom method can use yield.

**Practical example**

```ruby
print "A"
print "B"
puts "C" # the line becomes ABC followed by a newline
p [1, 2].map { |n| n * 2 } # [2, 4]
```

**Important points and follow-ups**

- puts and print normally return nil; p is different and is useful for inspecting values.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01574 — [twentyseven.txt:1187–1189](../ruby/twentyseven.txt) (Embedded-Ruby) · [complete source](sources/twentyseven.md)


---

<a id="a-0198"></a>

### A-0198 — Explain what a proc is.

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain what a proc is.

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00776 — [thirtyeight.txt:146–147](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0199"></a>

### A-0199 — How do iterators like each work in Ruby?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How do iterators like each work in Ruby?

**Direct answer**

Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

**Detailed explanation**

Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy.

**Practical example**

```ruby
p [1, 2, 3].map { |n| n * 2 } # [2, 4, 6]
p [1, 2, 3].select(&:odd?) # [1, 3]
p [1, 2, 3].reduce(0, :+) # 6
```

**Important points and follow-ups**

- Choose each for effects and map for returned values.
- Repeated traversal and intermediate arrays can dominate performance.

**Source references**

- SRC-00509 — [nineteen.txt:218–232](../ruby/nineteen.txt) (8) · [complete source](sources/nineteen.md)


---

<a id="a-0200"></a>

### A-0200 — How do yield and block_given? work?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How do yield and block_given? work?

**Direct answer**

yield invokes the block passed to the current method, while block_given? reports whether that block exists. An &block parameter captures the block as a Proc, or nil when no block was supplied.

**Detailed explanation**

Yield values to parameterize a caller’s behavior, such as an iterator yielding each record. Methods that offer optional callbacks should test block_given? or a captured block. At a call site, &callable turns a Proc or another object supporting to_proc into the method’s implicit block.

**Practical example**

```ruby
def transform(x)
  block_given? ? yield(x) : x
end
p transform(4) { |n| n * n } # 16
p transform(4) # 4
```

**Important points and follow-ups**

- The name block after & is conventional, not mandatory.

**Source references**

- SRC-00523 — [nineteen.txt:436–449](../ruby/nineteen.txt) (22) · [complete source](sources/nineteen.md)


---

<a id="a-0201"></a>

### A-0201 — How do you create a custom Enumerator in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How do you create a custom Enumerator in Ruby?

**Direct answer**

An Enumerator packages an iteration so it can be chained or driven with methods such as next. Create one from a method without a block or with Enumerator.new and a yielder.

**Detailed explanation**

Enumerator.new can represent a custom or infinite producer. each drives it internally; next drives it externally and raises StopIteration when it is exhausted. Call lazy to build a demand-driven transformation pipeline; plain map on an Enumerator is generally eager. Lazy evaluation is especially useful when only a small prefix of a large or infinite source is needed.

**Practical example**

```ruby
numbers = Enumerator.new { |y| n = 0; loop { y << n; n += 1 } }
p numbers.lazy.select(&:even?).take(3).force # [0, 2, 4]
```

**Important points and follow-ups**

- Enumerator::Lazy prevents eager materialization of an unbounded source.

**Source references**

- SRC-00256 — [eight.txt:173–184](../ruby/eight.txt) (Mid-05) · [complete source](sources/eight.md)


---

<a id="a-0202"></a>

### A-0202 — How does a block differ from a method in Ruby?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How does a block differ from a method in Ruby?

**Direct answer**

A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.

**Detailed explanation**

Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.

**Practical example**

```ruby
def twice
  2.times { yield }
end
twice { puts "hello" }
```

**Important points and follow-ups**

- Calling yield without a supplied block raises LocalJumpError.

**Source references**

- SRC-00222 — [seven.txt:89–104](../ruby/seven.txt) (6) · [complete source](sources/seven.md)


---

<a id="a-0203"></a>

### A-0203 — How many iterators are there in Ruby?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How many iterators are there in Ruby?

**Direct answer**

Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

**Detailed explanation**

Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy.

**Practical example**

```ruby
p [1, 2, 3].map { |n| n * 2 } # [2, 4, 6]
p [1, 2, 3].select(&:odd?) # [1, 3]
p [1, 2, 3].reduce(0, :+) # 6
```

**Important points and follow-ups**

- Choose each for effects and map for returned values.
- Repeated traversal and intermediate arrays can dominate performance.

**Source references**

- SRC-00308 — [nine.txt:254–262](../ruby/nine.txt) (37) · [complete source](sources/nine.md)


---

<a id="a-0204"></a>

### A-0204 — In how many ways a block is written in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

In how many ways a block is written in Ruby?

**Direct answer**

Ruby blocks use { ... } or do ... end, but their binding precedence differs.

**Detailed explanation**

Braces bind more tightly than do/end in method-call parsing. Use braces conventionally for short expressions and do/end for longer blocks, but do not mechanically swap them in nested calls.

**Practical example**

```text
[1, 2, 3].each { |n| puts n }
[1, 2, 3].each do |n|
  puts n
end
```

**Important points and follow-ups**

- Parentheses can make the target method unambiguous.

**Corrections and source limitations**

- Corrected claim that both syntaxes always have identical functionality.

**Source references**

- SRC-00289 — [nine.txt:120–127](../ruby/nine.txt) (18) · [complete source](sources/nine.md)


---

<a id="a-0205"></a>

### A-0205 — In Ruby code, you quite often see the trick of using an expression like `array.map(&:method_name)` as a shorthand form of `array.map { |element| element.method_name }`.  How exactly does it work?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

In Ruby code, you quite often see the trick of using an expression like `array.map(&:method_name)` as a shorthand form of `array.map { |element| element.method_name }`.  How exactly does it work?

**Direct answer**

& converts an argument to a block using to_proc; Symbol#to_proc calls that named method on the yielded receiver.

**Detailed explanation**

When a parameter is passed with `&` in front of it (indicating that is it to be used as a block), Ruby will call `to_proc` on it in an attempt to make it usable as a block. `Symbol#to_proc` quite handily returns a `Proc` that will invoke the method of the corresponding name on whatever is passed to it, thus enabling our little shorthand trick to work.

**Practical example**

```ruby
p %w[a b].map(&:upcase) # ["A", "B"]
```

**Important points and follow-ups**

- This shorthand is clearest for a simple method call; use an explicit block for arguments or branching.

**Source references**

- SRC-00110 — [second.txt:200–202](../ruby/second.txt) (Q10) · [complete source](sources/second.md)


---

<a id="a-0206"></a>

### A-0206 — In Ruby code, you quite often see the trick of using an expression like array.map(&:method_name) as a shorthand form of array.map { |element| element.method_name }. How exactly does it work?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

In Ruby code, you quite often see the trick of using an expression like array.map(&:method_name) as a shorthand form of array.map { |element| element.method_name }. How exactly does it work?

**Direct answer**

At a call site, & converts an object to a block using to_proc. Symbol#to_proc produces callable behavior that invokes the named method on each supplied receiver.

**Detailed explanation**

Thus array.map(&:upcase) behaves like array.map { |item| item.upcase } for this simple transform. This shorthand is appropriate when the block is exactly one such call; use a normal block for additional logic, multiple yielded values or clearer parameter handling.

**Practical example**

```ruby
p ["a", "b"].map(&:upcase) # ["A", "B"]
p ["a", "b"].map { |s| s.upcase }
```

**Important points and follow-ups**

- The ampersand is block conversion here, not bitwise AND.

**Source references**

- SRC-00326 — [nine.txt:467–470](../ruby/nine.txt) (55) · [complete source](sources/nine.md)


---

<a id="a-0207"></a>

### A-0207 — Lambda

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Lambda

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Source references**

- SRC-01163 — [twentyeight.txt:2–18](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0208"></a>

### A-0208 — Lambda vs Blocks

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Lambda vs Blocks

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- Proc and lambda behavior matters in modern Ruby; raw blocks are not standalone objects and yield invokes a supplied block rather than creating a Proc.

**Source references**

- SRC-01165 — [twentyeight.txt:49–69](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0209"></a>

### A-0209 — Literal way of writing Lambda & Proc

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Literal way of writing Lambda & Proc

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Source references**

- SRC-01166 — [twentyeight.txt:70–80](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0210"></a>

### A-0210 — Mention What Is The Difference Between Procs And Blocks?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Mention What Is The Difference Between Procs And Blocks?

**Direct answer**

A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.

**Detailed explanation**

Use yield for the implicit block, &block to capture it, and call to execute a stored Proc. Both kinds close over surrounding local variables. A non-lambda proc with return can raise LocalJumpError if its defining method has already returned. A proc’s return target is where it was defined, not where it happens to be called.

**Practical example**

```ruby
p ->(x) { x * 2 }.call(3) # 6
p proc { |x, y| [x, y] }.call(3) # [3, nil]
p ->(x) { x }.lambda? # true
```

**Important points and follow-ups**

- Keyword argument rules still apply; “lenient arity” is not permission to pass every invalid call.
- A method takes one implicit block but may receive many Proc objects as ordinary arguments.

**Source references**

- SRC-00341 — [nine.txt:547–555](../ruby/nine.txt) (70) · [complete source](sources/nine.md)


---

<a id="a-0211"></a>

### A-0211 — What are Block, Proc, and Lambda in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 4

**Interview question**

What are Block, Proc, and Lambda in Ruby?

**Direct answer**

A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.

**Detailed explanation**

Use yield for the implicit block, &block to capture it, and call to execute a stored Proc. Both kinds close over surrounding local variables. A non-lambda proc with return can raise LocalJumpError if its defining method has already returned. A proc’s return target is where it was defined, not where it happens to be called.

**Practical example**

```ruby
p ->(x) { x * 2 }.call(3) # 6
p proc { |x, y| [x, y] }.call(3) # [3, nil]
p ->(x) { x }.lambda? # true
```

**Important points and follow-ups**

- An ordinary proc with return can raise LocalJumpError if invoked after its defining method has returned.
- Keyword argument rules still apply; “lenient arity” is not permission to pass every invalid call.
- A method takes one implicit block but may receive many Proc objects as ordinary arguments.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Source references**

- SRC-00179 — [six.txt:144–253](../ruby/six.txt) (Q3) · [complete source](sources/six.md)
- SRC-00431 — [eleven.txt:119–144](../ruby/eleven.txt) (8) · [complete source](sources/eleven.md)
- SRC-00442 — [thirteen.txt:37–45](../ruby/thirteen.txt) (concept-3) · [complete source](sources/thirteen.md)
- SRC-00522 — [nineteen.txt:410–435](../ruby/nineteen.txt) (21) · [complete source](sources/nineteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00179 (six.txt)</summary>

**Original prompt:** What is the difference between blocks, procs, and lambdas in Ruby?

**Answer:** Both lambdas and ordinary procs are Proc objects. Lambdas enforce method-like arity and local return; ordinary proc return targets the defining method.

Both lambdas and ordinary procs are Proc objects. Lambdas enforce method-like arity and local return; ordinary proc return targets the defining method. An ordinary proc with return can raise LocalJumpError if invoked after its defining method has returned.

```ruby
loose = proc { |x, y| [x, y] }
strict = ->(x, y) { [x, y] }
p loose.call(1) # [1, nil]
p strict.call(1, 2)
```

</details>


---

<a id="a-0212"></a>

### A-0212 — What are blocks and procs?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are blocks and procs?

**Direct answer**

A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.

**Detailed explanation**

Use yield for the implicit block, &block to capture it, and call to execute a stored Proc. Both kinds close over surrounding local variables. A non-lambda proc with return can raise LocalJumpError if its defining method has already returned. A proc’s return target is where it was defined, not where it happens to be called.

**Practical example**

```ruby
p ->(x) { x * 2 }.call(3) # 6
p proc { |x, y| [x, y] }.call(3) # [3, nil]
p ->(x) { x }.lambda? # true
```

**Important points and follow-ups**

- Keyword argument rules still apply; “lenient arity” is not permission to pass every invalid call.
- A method takes one implicit block but may receive many Proc objects as ordinary arguments.

**Source references**

- SRC-00356 — [nine.txt:660–667](../ruby/nine.txt) (85) · [complete source](sources/nine.md)


---

<a id="a-0213"></a>

### A-0213 — What are blocks in Ruby, and how are they used?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are blocks in Ruby, and how are they used?

**Direct answer**

A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.

**Detailed explanation**

Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.

**Practical example**

```ruby
def twice
  2.times { yield }
end
twice { puts "hello" }
```

**Important points and follow-ups**

- Calling yield without a supplied block raises LocalJumpError.

**Source references**

- SRC-00412 — [ten.txt:243–245](../ruby/ten.txt) (41) · [complete source](sources/ten.md)


---

<a id="a-0214"></a>

### A-0214 — What are Procs in Ruby?  How do they compare to closures in JS?

**Difficulty:** Advanced · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are Procs in Ruby?  How do they compare to closures in JS?

**Direct answer**

A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form.

**Detailed explanation**

A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form. Source incorrectly says Ruby procs do not capture self. instance_exec can deliberately change execution self.

**Practical example**

```ruby
class Maker
  def initialize; @value = 42; end
  def callback; proc { [self, @value] }; end
end
p Maker.new.callback.call
```

**Important points and follow-ups**

- Source incorrectly says Ruby procs do not capture self. instance_exec can deliberately change execution self.
- Verification: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- Original incomplete/outdated claim corrected: A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form.

**Source references**

- SRC-00166 — [five.txt:24–29](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="a-0215"></a>

### A-0215 — What are Ruby blocks and how do you use them?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are Ruby blocks and how do you use them?

**Direct answer**

A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.

**Detailed explanation**

Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.

**Practical example**

```ruby
def twice
  2.times { yield }
end
twice { puts "hello" }
```

**Important points and follow-ups**

- Calling yield without a supplied block raises LocalJumpError.

**Source references**

- SRC-00244 — [eight.txt:36–43](../ruby/eight.txt) (Junior-03) · [complete source](sources/eight.md)


---

<a id="a-0216"></a>

### A-0216 — What are Ruby iterators and how do they work?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are Ruby iterators and how do they work?

**Direct answer**

Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

**Detailed explanation**

Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy. String is not Enumerable, so use scan for extracting matches or each_line/each_char before Enumerable operations. Use numeric times/upto/step to express repetitions. Array#each returns its receiver, collect is an alias of map, and step advances values rather than indenting output.

**Practical example**

```ruby
text = "Email user@example.com"
p text.scan(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/)
1.upto(5) { |n| puts "*" * n }
```

**Important points and follow-ups**

- The sample regex is illustrative, not a full email-address validator.

**Corrections and source limitations**

- Corrected String#grep misuse, each return-value claim, collect distinction, String#upto star output and “step indents” claim.

**Source references**

- SRC-00621 — [twentyfour.txt:236–361](../ruby/twentyfour.txt) (7) · [complete source](sources/twentyfour.md)


---

<a id="a-0217"></a>

### A-0217 — What are Ruby iterators?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are Ruby iterators?

**Direct answer**

Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

**Detailed explanation**

Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy.

**Practical example**

```ruby
p [1, 2, 3].map { |n| n * 2 } # [2, 4, 6]
p [1, 2, 3].select(&:odd?) # [1, 3]
p [1, 2, 3].reduce(0, :+) # 6
```

**Important points and follow-ups**

- Choose each for effects and map for returned values.
- Repeated traversal and intermediate arrays can dominate performance.

**Source references**

- SRC-00307 — [nine.txt:248–253](../ruby/nine.txt) (36) · [complete source](sources/nine.md)


---

<a id="a-0218"></a>

### A-0218 — What are Ruby’s enumerator objects, and how are they used?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are Ruby’s enumerator objects, and how are they used?

**Direct answer**

An Enumerator packages an iteration so it can be chained or driven with methods such as next. Create one from a method without a block or with Enumerator.new and a yielder.

**Detailed explanation**

Enumerator.new can represent a custom or infinite producer. each drives it internally; next drives it externally and raises StopIteration when it is exhausted. Call lazy to build a demand-driven transformation pipeline; plain map on an Enumerator is generally eager. Lazy evaluation is especially useful when only a small prefix of a large or infinite source is needed.

**Practical example**

```ruby
numbers = Enumerator.new { |y| n = 0; loop { y << n; n += 1 } }
p numbers.lazy.select(&:even?).take(3).force # [0, 2, 4]
```

**Important points and follow-ups**

- Enumerator::Lazy prevents eager materialization of an unbounded source.

**Corrections and source limitations**

- Clarified that plain Enumerator transformations are not inherently lazy; use Enumerator::Lazy.

**Source references**

- SRC-00234 — [seven.txt:314–335](../ruby/seven.txt) (18) · [complete source](sources/seven.md)


---

<a id="a-0219"></a>

### A-0219 — What are some commonly used iterators in Ruby?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are some commonly used iterators in Ruby?

**Direct answer**

Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

**Detailed explanation**

Array#each normally returns the original array, while map returns a new array of block results. Enumerable methods supply common operations for classes defining each; sorting also needs a meaningful comparison. A missing block often returns an Enumerator, which can drive iteration externally with next. Lazy pipelines require Enumerator::Lazy rather than assuming every chained Enumerator operation is lazy.

**Practical example**

```ruby
p [1, 2, 3].map { |n| n * 2 } # [2, 4, 6]
p [1, 2, 3].select(&:odd?) # [1, 3]
p [1, 2, 3].reduce(0, :+) # 6
```

**Important points and follow-ups**

- Choose each for effects and map for returned values.
- Repeated traversal and intermediate arrays can dominate performance.

**Source references**

- SRC-00228 — [seven.txt:217–229](../ruby/seven.txt) (12) · [complete source](sources/seven.md)


---

<a id="a-0220"></a>

### A-0220 — What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are the different uses of Ruby modules? Could you provide an example of each and explain why it is valuable?

**Direct answer**

Modules provide namespaces, reusable mixin behavior and module-level utility interfaces without requiring multiple class inheritance.

**Detailed explanation**

Use inheritance for a substitutable is-a relationship and mixins/composition for shared capabilities. A module can hold state and module methods, but it is not automatically equivalent to a carefully designed singleton service. Keep dependencies and method collisions visible, especially when many modules are included.

**Practical example**

```ruby
module Graphics
  class Canvas; end
end
module Printable
  def print_label = "printable"
end
class Car
  include Printable
end
Car.new.print_label
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html

**Source references**

- SRC-00641 — [eighteen.txt:283–305](../ruby/eighteen.txt) (11) · [complete source](sources/eighteen.md)


---

<a id="a-0221"></a>

### A-0221 — What do tap and then (yield_self) do, and when are they useful?

**Difficulty:** Advanced · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What do tap and then (yield_self) do, and when are they useful?

**Direct answer**

tap returns its receiver after yielding it; then/yield_self returns the block’s result.

**Detailed explanation**

Use tap for diagnostics or configuration in a chain and then for a transformation. A block can still mutate the receiver in either case; the difference is the returned value. Side effects should remain clear enough to debug.

**Practical example**

```ruby
p [1, 2].tap { |a| a << 3 } # [1, 2, 3]
p 5.then { |n| n * 2 } # 10
```

**Important points and follow-ups**

- Avoid long chains whose intermediate effects obscure the operation.

**Source references**

- SRC-00559 — [nineteen.txt:1035–1048](../ruby/nineteen.txt) (58) · [complete source](sources/nineteen.md)


---

<a id="a-0222"></a>

### A-0222 — What does &:method mean in something like map(&:upcase)?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What does &:method mean in something like map(&:upcase)?

**Direct answer**

At a call site, & converts an object to a block using to_proc. Symbol#to_proc produces callable behavior that invokes the named method on each supplied receiver.

**Detailed explanation**

Thus array.map(&:upcase) behaves like array.map { |item| item.upcase } for this simple transform. This shorthand is appropriate when the block is exactly one such call; use a normal block for additional logic, multiple yielded values or clearer parameter handling.

**Practical example**

```ruby
p ["a", "b"].map(&:upcase) # ["A", "B"]
p ["a", "b"].map { |s| s.upcase }
```

**Important points and follow-ups**

- The ampersand is block conversion here, not bitwise AND.

**Source references**

- SRC-00531 — [nineteen.txt:583–595](../ruby/nineteen.txt) (30) · [complete source](sources/nineteen.md)


---

<a id="a-0223"></a>

### A-0223 — What is a block and how do you pass one?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is a block and how do you pass one?

**Direct answer**

A block is an anonymous piece of code attached to a method call, written with braces or do/end. The method decides whether and when to run it, usually with yield.

**Detailed explanation**

Blocks capture surrounding local variables and normally retain their defining self. They support iteration, callbacks and resource handling without defining a named method. Braces and do/end have different binding precedence; they are not always interchangeable in nested calls. Capture a block as a Proc with &block when you need to store or forward it.

**Practical example**

```ruby
def twice
  2.times { yield }
end
twice { puts "hello" }
```

**Important points and follow-ups**

- Calling yield without a supplied block raises LocalJumpError.

**Source references**

- SRC-00510 — [nineteen.txt:233–250](../ruby/nineteen.txt) (9) · [complete source](sources/nineteen.md)


---

<a id="a-0224"></a>

### A-0224 — What is a gem in Ruby, and how is it useful in the development process?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 7

**Interview question**

What is a gem in Ruby, and how is it useful in the development process?

**Direct answer**

A gem is a versioned Ruby package that distributes reusable code and metadata. RubyGems installs packages; Bundler resolves a project’s dependency set.

**Detailed explanation**

In Ruby, a gem is a packaged library or extension that contains reusable code or functionalities. Gems allow developers to distribute and share their code with others, making it easier to incorporate pre-built solutions into Ruby applications. Gems can range from simple utility libraries to complex frameworks and tools.

Gems are useful in the development process because they provide a modular and efficient way to manage dependencies and reuse code. By using gems, developers can avoid reinventing the wheel and focus on higher-level application logic. Gems can be installed and managed using the gem command-line tool, and popular gems are hosted on the RubyGems website.

**Practical example**

```bash
gem install rake
# For a project: add the gem to Gemfile, then bundle install.
```

**Important points and follow-ups**

- Example version pins in old articles are historical, not current upgrade recommendations.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00124 — [three.txt:27–34](../ruby/three.txt) · [complete source](sources/three.md)
- SRC-00245 — [eight.txt:44–49](../ruby/eight.txt) (Junior-04) · [complete source](sources/eight.md)
- SRC-00374 — [ten.txt:41–43](../ruby/ten.txt) (3) · [complete source](sources/ten.md)
- SRC-00752 — [thirtyeight.txt:74–75](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00762 — [thirtyeight.txt:99–101](../ruby/thirtyeight.txt) (3) · [complete source](sources/thirtyeight.md)
- SRC-01101 — [twenty.txt:35–39](../ruby/twenty.txt) (3) · [complete source](sources/twenty.md)
- SRC-01481 — [twentyseven.txt:308–312](../ruby/twentyseven.txt) (Open-38) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00245 (eight.txt)</summary>

**Original prompt:** What is a Gem in Ruby?

**Answer:** A gem packages Ruby code and metadata. Bundler resolves dependencies declared in a Gemfile and records selected versions in Gemfile.lock; bundle exec selects that bundle when running a command.

Declare direct dependencies and constraints intentionally, install with bundle install and update selected dependencies with testing. Commit the application lockfile for reproducible development and CI installations. RubyGems supplies gem installation and distribution, while Bundler selects a consistent dependency set for a project; a gem need not be installed globally or published publicly.

```ruby
# Gemfile
source "https://rubygems.org"
gem "rack"
# shell: bundle install
# shell: bundle exec ruby app.rb
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00752 (thirtyeight.txt)</summary>

**Original prompt:** What is a “gem” in Ruby on Rails?

**Answer:** A gem packages Ruby code and metadata so it can be distributed, versioned and installed with RubyGems/Bundler.

Rails itself is composed of gems. Evaluate maintenance, licensing, compatibility and necessity before adding a dependency. No gem is essential for every project, and personal-favorite questions should be answered from actual experience.

```bash
gem install bundler
# In an application use its bundle:
bundle add rspec-rails
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01481 (twentyseven.txt)</summary>

**Original prompt:** What is a 'gem' in Ruby on Rails? Give an example of a gem and what it does.

**Answer:** In Ruby on Rails, a 'gem' is a packaged library or piece of reusable code that extends the functionality of your application. Think of it as a plugin that you can easily install and use. Gems simplify development by providing pre-built solutions for common tasks. They help avoid re-inventing the wheel and promote code reuse.

In Ruby on Rails, a 'gem' is a packaged library or piece of reusable code that extends the functionality of your application. Think of it as a plugin that you can easily install and use. Gems simplify development by providing pre-built solutions for common tasks. They help avoid re-inventing the wheel and promote code reuse.

For example, the bcrypt gem is a popular choice for securely handling passwords. Instead of writing your own complex password hashing algorithms, you can use bcrypt. You would add gem 'bcrypt' to your Gemfile, run bundle install, and then use the bcrypt methods to hash and authenticate passwords.

```text
In Ruby on Rails, a 'gem' is a packaged library or piece of reusable code that extends the functionality of your application. Think of it as a plugin that you can easily install and use. Gems simplify development by providing pre-built solutions for common tasks. They help avoid re-inventing the wheel and promote code reuse.

For example, the bcrypt gem is a popular choice for securely handling passwords. Instead of writing your own complex password hashing algorithms, you can use bcrypt. You would add gem 'bcrypt' to your Gemfile, run bundle install, and then use the bcrypt methods to hash and authenticate passwords.
```

</details>


---

<a id="a-0225"></a>

### A-0225 — What is a Proc?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 2

**Interview question**

What is a Proc?

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- Proc and lambda behavior matters in modern Ruby; raw blocks are not standalone objects and yield invokes a supplied block rather than creating a Proc.

**Source references**

- SRC-00678 — [sixteen.txt:213–241](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01175 — [twentyeight.txt:239–263](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0226"></a>

### A-0226 — What is the difference between `Array#map` and `Array#each`?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is the difference between `Array#map` and `Array#each`?


Note: `collect` is an alias of `map`

**Direct answer**

each yields elements and ordinarily returns the receiver; map collects block results into a new array. Either block may still mutate referenced objects.

**Detailed explanation**

each yields elements and ordinarily returns the receiver; map collects block results into a new array. Either block may still mutate referenced objects. The source’s "unaffected" wording is conditional: block side effects can mutate the receiver or its elements.

**Practical example**

```ruby
a = [1, 2]
p a.each { |n| n * 2 } # [1, 2]
p a.map { |n| n * 2 } # [2, 4]
```

**Important points and follow-ups**

- The source’s "unaffected" wording is conditional: block side effects can mutate the receiver or its elements.

**Corrections and source limitations**

- Correction/qualification: each yields elements and ordinarily returns the receiver; map collects block results into a new array. Either block may still mutate referenced objects. The source’s "unaffected" wording is conditional: block side effects can mutate the receiver or its elements.

**Source references**

- SRC-00114 — [second.txt:269–301](../ruby/second.txt) (Q14) · [complete source](sources/second.md)


---

<a id="a-0227"></a>

### A-0227 — What is the difference between map, select, and reduce in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is the difference between map, select, and reduce in Ruby?

**Direct answer**

map transforms every element, select keeps elements whose block is truthy, and reduce accumulates a result of any type, not necessarily a scalar.

**Detailed explanation**

map transforms every element, select keeps elements whose block is truthy, and reduce accumulates a result of any type, not necessarily a scalar. Without an explicit initial value reduce uses the first element; [].reduce(:+) is nil while [].reduce(0, :+) is 0.

**Practical example**

```ruby
values = [1, 2, 3]
p values.map { |n| n * 2 }
p values.select(&:odd?)
p values.reduce(0, :+)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Without an explicit initial value reduce uses the first element; [].reduce(:+) is nil while [].reduce(0, :+) is 0.

**Source references**

- SRC-00183 — [six.txt:585–685](../ruby/six.txt) (Q7) · [complete source](sources/six.md)


---

<a id="a-0228"></a>

### A-0228 — What is the difference between proc and lambda in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 6

**Interview question**

What is the difference between proc and lambda in Ruby?

**Direct answer**

A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.

**Detailed explanation**

Use yield for the implicit block, &block to capture it, and call to execute a stored Proc. Both kinds close over surrounding local variables. A non-lambda proc with return can raise LocalJumpError if its defining method has already returned. A proc’s return target is where it was defined, not where it happens to be called.

**Practical example**

```ruby
p ->(x) { x * 2 }.call(3) # 6
p proc { |x, y| [x, y] }.call(3) # [3, nil]
p ->(x) { x }.lambda? # true
```

**Important points and follow-ups**

- An ordinary proc with return can raise LocalJumpError if invoked after its defining method has returned.
- Keyword argument rules still apply; “lenient arity” is not permission to pass every invalid call.
- A method takes one implicit block but may receive many Proc objects as ordinary arguments.
- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- Corrected non-lambda Proc return target: defining method, not calling method.

**Source references**

- SRC-00032 — [first.txt:240–244](../ruby/first.txt) (2) · [complete source](sources/first.md)
- SRC-00062 — [first.txt:386–396](../ruby/first.txt) (2) · [complete source](sources/first.md)
- SRC-00153 — [four.txt:20–29](../ruby/four.txt) (2) · [complete source](sources/four.md)
- SRC-00229 — [seven.txt:230–250](../ruby/seven.txt) (13) · [complete source](sources/seven.md)
- SRC-00255 — [eight.txt:164–172](../ruby/eight.txt) (Mid-04) · [complete source](sources/eight.md)
- SRC-01050 — [thirtyseven.txt:200–210](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00032 (first.txt)</summary>

**Original prompt:** Explain the concept of procs and lambdas.

**Answer:** Both lambdas and ordinary procs are Proc objects. Lambdas enforce method-like arity and local return; ordinary proc return targets the defining method.

Both lambdas and ordinary procs are Proc objects. Lambdas enforce method-like arity and local return; ordinary proc return targets the defining method. An ordinary proc with return can raise LocalJumpError if invoked after its defining method has returned.

```ruby
loose = proc { |x, y| [x, y] }
strict = ->(x, y) { [x, y] }
p loose.call(1) # [1, nil]
p strict.call(1, 2)
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00062 (first.txt)</summary>

**Original prompt:** How do Procs and lambdas differ in Ruby?

**Answer:** Lambdas are Proc objects with strict argument handling and local return; non-lambda procs accept looser positional arguments and can return from the defining method.

Procs and lambdas in Ruby differ in two key aspects:

Argument Handling:

Lambdas strictly checks the number of arguments passed, raising an error if it doesn't match the expected count.
Procs are more lenient, allowing extra arguments without complaint.
Return Behavior:

Lambdas treat the return statement as if it were in a regular method, exiting the lambda and returning the value to the calling code.
Procs consider return as if it were in the outer method, potentially exiting the enclosing method.

```ruby
p proc { |x, y| [x, y] }.call(1)
p ->(x) { x * 2 }.call(3)
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01050 (thirtyseven.txt)</summary>

**Original prompt:** What is the difference between a proc and a lambda?

**Answer:** A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

</details>


---

<a id="a-0229"></a>

### A-0229 — What is the difference between yield and call in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is the difference between yield and call in Ruby?

**Direct answer**

yield invokes a method’s supplied block; call invokes a callable object such as a Proc, lambda or Method. Capture &block when you need to store or forward it explicitly.

**Detailed explanation**

yield invokes a method’s supplied block; call invokes a callable object such as a Proc, lambda or Method. Capture &block when you need to store or forward it explicitly. Do not claim a universal performance difference without benchmarking the Ruby version and workload.

**Practical example**

```ruby
def implicit; yield(2); end
def explicit(&block); block.call(2); end
p [implicit { |n| n*2 }, explicit { |n| n*2 }]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Do not claim a universal performance difference without benchmarking the Ruby version and workload.

**Source references**

- SRC-00194 — [six.txt:1670–1764](../ruby/six.txt) (Q18) · [complete source](sources/six.md)


---

<a id="a-0230"></a>

### A-0230 — What is the value of the variable `upcased` in the below piece of code?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is the value of the variable `upcased` in the below piece of code?


`upcased = ["one", "two", "three"].map {|n| puts n.upcase }`

**Direct answer**

upcased is [nil, nil, nil] because every block returns puts’ nil result; the uppercase words are only printed.

**Detailed explanation**

upcased is [nil, nil, nil] because every block returns puts’ nil result; the uppercase words are only printed. Use map(&:upcase) if the transformed strings are the desired return value. Source has a variable-name typo, upcase instead of upcased.

**Practical example**

```ruby
upcased = %w[one two three].map { |n| puts n.upcase }
p upcased
```

**Important points and follow-ups**

- Use map(&:upcase) if the transformed strings are the desired return value. Source has a variable-name typo, upcase instead of upcased.

**Corrections and source limitations**

- Correction/qualification: upcased is [nil, nil, nil] because every block returns puts’ nil result; the uppercase words are only printed. Use map(&:upcase) if the transformed strings are the desired return value. Source has a variable-name typo, upcase instead of upcased.

**Source references**

- SRC-00117 — [second.txt:342–357](../ruby/second.txt) (Q17) · [complete source](sources/second.md)


---

<a id="a-0231"></a>

### A-0231 — What is Yield in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 3

**Interview question**

What is Yield in Ruby on Rails?

**Direct answer**

yield invokes the block passed to the current Ruby method and supplies any arguments written after yield.

**Detailed explanation**

It is Ruby syntax, not a Rails-only method. Calling yield without a supplied block raises LocalJumpError unless guarded with block_given?. The block retains its lexical local-variable environment. Rails layouts also use yield to insert view content.

**Practical example**

```ruby
def twice
  yield 1
  yield 2
end
twice { |n| puts n * 10 } # prints 10, then 20
```

**Important points and follow-ups**

- A captured block can be named using &block and invoked with block.call.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00037 — [first.txt:265–267](../ruby/first.txt) (7) · [complete source](sources/first.md)
- SRC-00688 — [thirty.txt:18–20](../ruby/thirty.txt) (4) · [complete source](sources/thirty.md)
- SRC-01441 — [twentythree.txt:659–686](../ruby/twentythree.txt) (Q49) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00037 (first.txt)</summary>

**Original prompt:** Discuss the purpose of the 'yield' keyword in Ruby.

**Answer:** yield invokes the block passed to the currently executing method and returns the block result. Check block_given? when the block is optional.

The yield keyword in Ruby is used within methods to define a placeholder for executing a block of code that's provided when the method is called. It enables you to create methods with flexible behavior. Part of the logic is defined within the method and part is provided from the outside as a block. This is commonly used to implement iterators, callbacks, and custom control structures.

```ruby
def twice
  yield(2) if block_given?
end
p twice { |x| x * 2 } # 4
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00688 (thirty.txt)</summary>

**Original prompt:** Explain what is “Yield” in Ruby on Rails?

**Answer:** Ruby yield invokes the block supplied to the current method, passing any given arguments.

yield without a block raises LocalJumpError unless guarded by block_given?. In Rails layouts, yield is also used by the rendering machinery to insert view or named content. The Ruby keyword is lowercase, not Yield.

```ruby
def twice
  return enum_for(:twice) unless block_given?
  yield 1
  yield 2
end
twice { |n| puts n }
```

</details>


---

<a id="a-0232"></a>

### A-0232 — What is yield statement in Ruby?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What is yield statement in Ruby?

**Direct answer**

yield invokes the block passed to the current method, while block_given? reports whether that block exists. An &block parameter captures the block as a Proc, or nil when no block was supplied.

**Detailed explanation**

Yield values to parameterize a caller’s behavior, such as an iterator yielding each record. Methods that offer optional callbacks should test block_given? or a captured block. At a call site, &callable turns a Proc or another object supporting to_proc into the method’s implicit block.

**Practical example**

```ruby
def transform(x)
  block_given? ? yield(x) : x
end
p transform(4) { |n| n * n } # 16
p transform(4) # 4
```

**Important points and follow-ups**

- The name block after & is conventional, not mandatory.

**Source references**

- SRC-00290 — [nine.txt:128–131](../ruby/nine.txt) (19) · [complete source](sources/nine.md)


---

<a id="a-0233"></a>

### A-0233 — What will be the result of each of the following lines of code?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What will be the result of each of the following lines of code?

**Direct answer**

The referenced method definitions and call list are missing, so the full output cannot be determined.

**Detailed explanation**

The retained explanation identifies a real parsing trap: sum(1, 2) passes two arguments, whereas a space before parentheses may make Ruby parse one parenthesized expression. The comma expression in sum (1, 2) is invalid. The claimed 10/3 outputs need the missing method definitions to be independently checked.

**Practical example**

```ruby
def sum(a, b) = a + b
p sum(1, 2) # 3
# sum (1, 2) # SyntaxError
```

**Important points and follow-ups**

- Method-call style recommendations are conventions, but parse errors are language behavior.

**Corrections and source limitations**

- Incomplete source: missing definitions and original call list.

**Source references**

- SRC-00322 — [nine.txt:405–420](../ruby/nine.txt) (51) · [complete source](sources/nine.md)


---

<a id="a-0234"></a>

### A-0234 — Can you call a private method outside a Ruby class using its object?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Can you call a private method outside a Ruby class using its object?

**Direct answer**

Yes. send/__send__ can invoke private methods; public_send respects public visibility. Visibility is an API boundary rather than a security sandbox.

**Detailed explanation**

Yes, with the help of the `send` method.


Given the class `Test`:



```ruby
class Test
   private
       def method
         p "I am a private method"
      end
end

```


We can execute the private method using `send`:



```ruby
>> Test.new.send(:method)
"I am a private method"

```

**Practical example**

```ruby
class Secret
  private
  def token; :example; end
end
p Secret.new.__send__(:token)
```

**Important points and follow-ups**

- Never allow arbitrary untrusted method names to drive reflective dispatch.

**Source references**

- SRC-00112 — [second.txt:213–231](../ruby/second.txt) (Q12) · [complete source](sources/second.md)


---

<a id="a-0235"></a>

### A-0235 — Consider the following code:

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Consider the following code:



```ruby
class A
  def self.a(b)
    if b > 0
      b * b
    end
  end
end

```


What will be the values of:




- `var1 = A.a(0)`

- `var2 = A.a(2)`

**Direct answer**

A.a(0) returns nil because the if has no selected branch; A.a(2) returns 4, the final expression of the selected branch.

**Detailed explanation**

- var1 will be equal to `nil`


- var2 will be equal to `4`




Understand:
* A conditional statement in Ruby is an expression that returns `nil` if the conditional is `false`.
* Ruby methods return the last expression in the method body.


In this example:




- 
`A.a(0)` returns `nil` for unsuccessful conditional

- 
`A.a(2)` returns the square of `2`, i.e `4`

**Practical example**

```ruby
class A
  def self.a(b); b * b if b > 0; end
end
p [A.a(0), A.a(2)]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00113 — [second.txt:231–269](../ruby/second.txt) (Q13) · [complete source](sources/second.md)


---

<a id="a-0236"></a>

### A-0236 — Describe the difference between local, instance, and class variables.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Describe the difference between local, instance, and class variables.

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Corrections and source limitations**

- Corrected invalid naming regex, variable access-control claim, local lifetime claim (closures retain locals) and instance-variable external visibility.

**Source references**

- SRC-00623 — [twentyfour.txt:416–494](../ruby/twentyfour.txt) (9) · [complete source](sources/twentyfour.md)


---

<a id="a-0237"></a>

### A-0237 — Discuss the 'super' keyword and its usage.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Discuss the 'super' keyword and its usage.

**Direct answer**

super continues lookup for the current method. Bare super forwards current arguments; super() sends no positional/keyword arguments; both normally forward the block.

**Detailed explanation**

In Ruby, the super keyword is used to call a method of the same name in the parent class or module. It's typically used within a subclass to invoke the behavior of the overridden method in the superclass.

This is useful when you want to extend or modify the functionality of the parent class's method while still leveraging its core behavior. By calling super within the subclass method, you can execute the parent method's logic and then build upon or modify it as needed.

**Practical example**

```ruby
class Parent
  def greet(name); "Hi #{name}"; end
end
class Child < Parent
  def greet(name); super + "!"; end
end
p Child.new.greet("Ana")
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00034 — [first.txt:250–254](../ruby/first.txt) (4) · [complete source](sources/first.md)


---

<a id="a-0238"></a>

### A-0238 — Does Ruby support Multiple Inheritance and Single Inheritance?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 5

**Interview question**

Does Ruby support Multiple Inheritance and Single Inheritance?

**Direct answer**

Ruby classes have one superclass, but can compose behavior from multiple modules using include, prepend, or extend.

**Detailed explanation**

include adds a module’s instance methods to an ancestor chain; prepend places them before the class; extend adds them to one object’s singleton class. Lookup order resolves conflicts, and super continues through that chain. A module supplies behavior and namespaces but cannot be instantiated with ModuleName.new.

**Practical example**

```ruby
module Named
  def label = "user"
end
class User
  include Named
end
p User.new.label # "user"
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html
- Mixin composition is not multiple class inheritance.
- Use ancestors and singleton_class.ancestors to explain lookup order.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00036 — [first.txt:260–264](../ruby/first.txt) (6) · [complete source](sources/first.md)
- SRC-00795 — [thirtyeight.txt:196–197](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01043 — [thirtyseven.txt:156–160](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01369 — [twentytwo.txt:284–286](../ruby/twentytwo.txt) (6) · [complete source](sources/twentytwo.md)
- SRC-01437 — [twentythree.txt:565–596](../ruby/twentythree.txt) (Q45) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00036 (first.txt)</summary>

**Original prompt:** Explain multiple inheritance and mixins in Ruby.

**Answer:** Ruby has single superclass inheritance. Multiple modules may be mixed into the ancestor chain to compose behavior, with deterministic method lookup and super chaining.

Multiple inheritance in Ruby refers to a scenario where a class inherits from more than one parent class. However, Ruby doesn't support multiple-class inheritance directly. Instead, it uses mixins to achieve similar functionality.

Mixins are modules that contain reusable code and can be included in classes. By including a module, a class gains access to its methods and behaviors. This effectively allows a form of multiple inheritance without the complexities and ambiguities associated with traditional multiple inheritance.

```ruby
module Tagged
  def tag; :ruby; end
end
class Article; include Tagged; end
p Article.ancestors
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00795 (thirtyeight.txt)</summary>

**Original prompt:** Does Ruby support multiple inheritance?

**Answer:** Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.

include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.

```ruby
module Printable
  def print_label = "label"
end
class Product
  include Printable
end
Product.new.print_label
```

</details>


---

<a id="a-0239"></a>

### A-0239 — Does Ruby support single inheritance?

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Does Ruby support single inheritance?

**Direct answer**

Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.

**Detailed explanation**

include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.

**Practical example**

```ruby
module Printable
  def print_label = "label"
end
class Product
  include Printable
end
Product.new.print_label
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00796 — [thirtyeight.txt:198–199](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0240"></a>

### A-0240 — Explain About Class Variable And Global Variable?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain About Class Variable And Global Variable?

**Direct answer**

@@name is a class variable shared through a class hierarchy, while $name is a process-wide global variable.

**Detailed explanation**

Class variables can couple a superclass and its descendants unexpectedly. A class instance variable such as @name on a class object is separate from both of these and is often a clearer choice for per-class state. Globals make dependencies implicit and require explicit concurrency discipline.

**Practical example**

```ruby
class Counter
  @@count = 0
  def self.count = @@count
  def initialize
    @@count += 1
  end
end
2.times { Counter.new }
p Counter.count # 2
```

**Important points and follow-ups**

- An inherited class variable is not one independent value per subclass.

**Source references**

- SRC-00337 — [nine.txt:531–534](../ruby/nine.txt) (66) · [complete source](sources/nine.md)


---

<a id="a-0241"></a>

### A-0241 — Explain About Normal Method Class?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain About Normal Method Class?

**Direct answer**

The prompt “Normal Method Class” is ambiguous; the source appears to discuss Ruby method invocation and argument forwarding.

**Detailed explanation**

A regular method call may receive positional arguments, keyword arguments and a block. At the call site * expands a positional array, ** expands keyword pairs and & passes a block. Modern Ruby separates a trailing positional hash from keywords when the callee declares keyword parameters. :: can call methods, but . is the normal readable form.

**Practical example**

```ruby
def total(*values, multiplier: 1)
  values.sum * multiplier
end
p total(*[2, 3], multiplier: 2) # 10
```

**Important points and follow-ups**

- The source does not define a formal concept named “normal method class”.

**Corrections and source limitations**

- Incomplete/ambiguous question wording retained; explained only the identifiable method-call content.

**Source references**

- SRC-00339 — [nine.txt:539–542](../ruby/nine.txt) (68) · [complete source](sources/nine.md)


---

<a id="a-0242"></a>

### A-0242 — Explain module mixins in Ruby?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain module mixins in Ruby?

**Direct answer**

A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.

**Detailed explanation**

Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.

**Practical example**

```ruby
module Greetable
  def greet = "hello"
end
class User
  include Greetable
end
p User.new.greet # "hello"
```

**Important points and follow-ups**

- Modules themselves are objects: Module.new creates a module, not an instance of that module.

**Source references**

- SRC-00292 — [nine.txt:140–143](../ruby/nine.txt) (21) · [complete source](sources/nine.md)


---

<a id="a-0243"></a>

### A-0243 — Explain Ruby module?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain Ruby module?

**Direct answer**

A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.

**Detailed explanation**

Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.

**Practical example**

```ruby
module Greetable
  def greet = "hello"
end
class User
  include Greetable
end
p User.new.greet # "hello"
```

**Important points and follow-ups**

- Modules themselves are objects: Module.new creates a module, not an instance of that module.

**Source references**

- SRC-00291 — [nine.txt:132–139](../ruby/nine.txt) (20) · [complete source](sources/nine.md)


---

<a id="a-0244"></a>

### A-0244 — Explain the concept of inheritance in Ruby and how it facilitates code reuse.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain the concept of inheritance in Ruby and how it facilitates code reuse.

**Direct answer**

Inheritance puts a superclass in a subclass’s method lookup chain, allowing reused behavior and explicit overrides. Prefer it for genuine substitutable relationships.

**Detailed explanation**

Inheritance is a fundamental object-oriented programming concept in Ruby (and many other languages). It allows a class to inherit properties and behaviors from another class, referred to as the parent or base class. The class inheriting the properties is called the child or derived class. The child class can add new methods or override existing ones but automatically inherits all the attributes and methods from the parent class.

Inheritance facilitates code reuse by allowing developers to create specialized classes based on existing ones. Instead of rewriting common functionalities in each class, developers can define them once in the parent class and have them inherited by all child classes. This leads to more maintainable and modular code.

**Practical example**

```ruby
class Animal
  def move; :moving; end
end
class Dog < Animal; end
p Dog.new.move
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00126 — [three.txt:71–78](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0245"></a>

### A-0245 — Explain the concept of mixins in Ruby.

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain the concept of mixins in Ruby.

**Direct answer**

Ruby has single superclass inheritance. Multiple modules may be mixed into the ancestor chain to compose behavior, with deterministic method lookup and super chaining.

**Detailed explanation**

Multiple inheritance in Ruby refers to a scenario where a class inherits from more than one parent class. However, Ruby doesn't support multiple-class inheritance directly. Instead, it uses mixins to achieve similar functionality.

Mixins are modules that contain reusable code and can be included in classes. By including a module, a class gains access to its methods and behaviors. This effectively allows a form of multiple inheritance without the complexities and ambiguities associated with traditional multiple inheritance.

**Practical example**

```ruby
module Tagged
  def tag; :ruby; end
end
class Article; include Tagged; end
p Article.ancestors
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Mixins compose module behavior; Ruby still has one superclass per class.

**Source references**

- SRC-00158 — [four.txt:63–81](../ruby/four.txt) (7) · [complete source](sources/four.md)


---

<a id="a-0246"></a>

### A-0246 — Explain the difference between a Ruby class and an instance of a class.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain the difference between a Ruby class and an instance of a class.

**Direct answer**

A class defines shared behavior and object construction; an instance is a particular object with its own state. Classes themselves are also objects.

**Detailed explanation**

In Ruby, a class is a blueprint or a template that defines the properties (attributes) and behaviors (methods) of objects. It acts as a blueprint for creating objects with similar characteristics. An instance of a class, on the other hand, is a specific object created based on the class definition. It represents a unique occurrence of the class with its own set of attribute values.

For example, consider a Car class. The class may define attributes like make, model, and year, as well as methods like start_engine and drive. An instance of the Car class would be a specific car object with its unique make, model, year, and other attribute values.

**Practical example**

```ruby
class Car
  attr_reader :make
  def initialize(make); @make = make; end
end
p Car.new("Toyota").make
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00122 — [three.txt:2–9](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0247"></a>

### A-0247 — Explain the purpose of modules in Ruby and how they facilitate code organization and reusability.

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain the purpose of modules in Ruby and how they facilitate code organization and reusability.

**Direct answer**

Modules group constants/classes in namespaces and share instance behavior across unrelated classes through mixins.

**Detailed explanation**

In Ruby, modules are containers for methods, constants, and other module or class definitions. They serve two main purposes: code organization and code reusability.

Code Organization: Modules help organize related methods and constants into cohesive units, allowing developers to group functionality based on common themes or responsibilities. This improves code readability, maintainability, and scalability. For example, modules can be used to group utility methods, mathematical functions, or file manipulation functions.
Code Reusability: Modules enable code reusability by acting as a mixin. A module’s methods can be included in multiple classes, allowing those classes to inherit the module’s functionality without being part of the same inheritance hierarchy. This allows developers to share functionality across different classes without duplicating code.

**Practical example**

```ruby
module Formatting
  def label(value); "[#{value}]"; end
end
class Reporter; include Formatting; end
p Reporter.new.label("ok")
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00134 — [three.txt:225–232](../ruby/three.txt) · [complete source](sources/three.md)


---

<a id="a-0248"></a>

### A-0248 — Explain which symbols developers use to define variables, global variables, and class variables.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain which symbols developers use to define variables, global variables, and class variables.

**Direct answer**

Local variables use plain names, instance variables start with @, class variables start with @@, and globals start with $.

**Detailed explanation**

An instance variable belongs to the current object, including a class object. A class-instance variable is different from a class variable: it is not implicitly shared across the class hierarchy. Class variables can be shared through inheritance and cause surprising coupling. Prefer explicit object state and avoid mutable globals.

**Practical example**

```ruby
class Counter
  @count = 0 # class-instance variable
  @@shared = 0 # class variable
  def initialize
    @value = 0 # each Counter instance has its own
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00750 — [thirtyeight.txt:70–71](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0249"></a>

### A-0249 — For the class `ABC` the given as:

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

For the class `ABC` the given as:



```ruby
class ABC
  def xyz
    puts "xyz in ABC"
  end
end

```

What is the return value for:




- `ABC::new::xyz`

- `ABC::new.xyz`

- `ABC.new::xyz`

- `ABC.new.xyz`

**Direct answer**

All four invocation forms call xyz, print the message and return nil because xyz ends with puts. Prefer dots to :: for normal method calls.

**Detailed explanation**

All the statements for the invocation of the xyz method through the object are valid.


When run through `IRB`:



```ruby
irb(main):001:0> ABC::new::xyz
xyz in ABC
=> nil
irb(main):002:0> ABC::new.xyz
xyz in ABC
=> nil
irb(main):003:0> ABC.new::xyz
xyz in ABC
=> nil
irb(main):004:0> ABC.new.xyz
xyz in ABC
=> nil

```

**Practical example**

```ruby
class ABC
  def xyz; puts "xyz in ABC"; end
end
p ABC::new::xyz
p ABC.new.xyz
```

**Important points and follow-ups**

- Verification: https://docs.ruby-lang.org/en/3.4/syntax/calling_methods_rdoc.html

**Source references**

- SRC-00116 — [second.txt:309–342](../ruby/second.txt) (Q16) · [complete source](sources/second.md)


---

<a id="a-0250"></a>

### A-0250 — How can you achieve multiple inheritance in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How can you achieve multiple inheritance in Ruby?

**Direct answer**

Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.

**Detailed explanation**

include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.

**Practical example**

```ruby
module Printable
  def print_label = "label"
end
class Product
  include Printable
end
Product.new.print_label
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00647 — [fifteen.txt:87–87](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)


---

<a id="a-0251"></a>

### A-0251 — How can you modify existing classes and methods dynamically?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How can you modify existing classes and methods dynamically?

**Direct answer**

Open classes and Module APIs can define, alias, wrap or remove methods at runtime. Prefer narrow scopes and explicit modules so changes remain understandable.

**Detailed explanation**

Ruby provides powerful metaprogramming capabilities that allow developers to modify existing classes and methods on the fly. Techniques like 'alias_method', 'define_method', and 'class_eval' enable adding, altering, or removing methods at runtime.

Note: While metaprogramming offers flexibility, it should be used judiciously as it can make code harder to understand and maintain.

**Practical example**

```ruby
class Greeter; end
Greeter.define_method(:hello) { "hello" }
p Greeter.new.hello
```

**Important points and follow-ups**

- define_method is private in some contexts; class_eval { define_method(...) } is an explicit alternative. Avoid global patches without a documented compatibility need.

**Source references**

- SRC-00064 — [first.txt:402–406](../ruby/first.txt) (4) · [complete source](sources/first.md)


---

<a id="a-0252"></a>

### A-0252 — How can you override a private method in a subclass in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How can you override a private method in a subclass in Ruby?

**Direct answer**

A subclass can override an inherited private method normally. Mark the replacement private if that is the intended API visibility.

**Detailed explanation**

Private methods can be overridden by subclasses. A public method inherited from the parent can call the subclass’s private override through normal dynamic dispatch. The replacement’s visibility must be set deliberately.

**Practical example**

```ruby
class Parent
  def call; helper; end
  private
  def helper; :parent; end
end
class Child < Parent
  private
  def helper; :child; end
end
p Child.new.call # :child
```

**Important points and follow-ups**

- Source claim that private methods cannot be overridden is incorrect. Visibility and overriding are separate concerns.

**Corrections and source limitations**

- Source correction: Private methods can be overridden by subclasses. A public method inherited from the parent can call the subclass’s private override through normal dynamic dispatch. The replacement’s visibility must be set deliberately.

**Source references**

- SRC-00052 — [first.txt:330–332](../ruby/first.txt) (22) · [complete source](sources/first.md)


---

<a id="a-0253"></a>

### A-0253 — How do you create and use a class in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How do you create and use a class in Ruby?

**Direct answer**

A class defines behavior for its instances. Class#new normally allocates an object and calls its initialize method; initialize sets state, while new returns the constructed object.

**Detailed explanation**

Define instance methods in a class and expose state deliberately with accessors. A subclass declaration uses < to inherit from one superclass; overridden methods can call super to extend inherited behavior. initialize is a private instance method and is more precisely an initialization hook than the allocator itself.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- The return value of initialize is not the return value of the normal Class#new call.

**Source references**

- SRC-00246 — [eight.txt:50–59](../ruby/eight.txt) (Junior-05) · [complete source](sources/eight.md)


---

<a id="a-0254"></a>

### A-0254 — How do you define a class and its constructor?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How do you define a class and its constructor?

**Direct answer**

A class defines behavior for its instances. Class#new normally allocates an object and calls its initialize method; initialize sets state, while new returns the constructed object.

**Detailed explanation**

Define instance methods in a class and expose state deliberately with accessors. A subclass declaration uses < to inherit from one superclass; overridden methods can call super to extend inherited behavior. initialize is a private instance method and is more precisely an initialization hook than the allocator itself.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- The return value of initialize is not the return value of the normal Class#new call.

**Source references**

- SRC-00512 — [nineteen.txt:265–285](../ruby/nineteen.txt) (11) · [complete source](sources/nineteen.md)


---

<a id="a-0255"></a>

### A-0255 — How do you establish inheritance in Ruby classes?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How do you establish inheritance in Ruby classes?

**Direct answer**

Use class Child < Parent. The child inherits method lookup behavior and can override methods or call super to extend inherited behavior.

**Detailed explanation**

In Ruby, inheritance is a relation between two classes where one class, the child (or subclass), inherits the attributes and behaviors of another class, the parent (or superclass). This allows you to create a general class first and then create more specialized classes later. Inheritance is established using the < symbol after the child class name, followed by the parent class name.

**Practical example**

```ruby
class Animal
  def sound; "sound"; end
end
class Dog < Animal
  def sound; "woof"; end
end
p Dog.new.sound
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00023 — [first.txt:180–182](../ruby/first.txt) (23) · [complete source](sources/first.md)


---

<a id="a-0256"></a>

### A-0256 — How do you implement inheritance in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How do you implement inheritance in Ruby?

**Direct answer**

Declare class Child < Parent to inherit instance behavior, then override methods when needed and use super to continue inherited lookup.

**Detailed explanation**

Ruby supports one superclass per class. Modules can compose additional behavior without multiple class inheritance. Instance variables belong to each instance; inheriting a method does not make every object share the same state.

**Practical example**

```ruby
class Animal
  def speak = "hello"
end
class Dog < Animal
  def speak = super + " woof"
end
p Dog.new.speak # "hello woof"
```

**Important points and follow-ups**

- A superclass change after a class is defined is not ordinary inheritance configuration.

**Source references**

- SRC-00250 — [eight.txt:97–109](../ruby/eight.txt) (Junior-09) · [complete source](sources/eight.md)


---

<a id="a-0257"></a>

### A-0257 — How do you reduce object allocation in a hot Ruby path?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How do you reduce object allocation in a hot Ruby path?

**Direct answer**

Profile allocation-heavy paths, remove avoidable intermediates, reuse values safely and use lazy pipelines when only part of a source is consumed.

**Detailed explanation**

Avoid unsafe shared mutable reuse and do not assume symbols always win. Frozen literals can reduce repeated allocations where semantics permit. A lazy producer plus lazy map/select avoids materializing unneeded arrays; eagerly selecting over an infinite source never finishes.

**Practical example**

```ruby
p (1..Float::INFINITY).lazy.select(&:even?).first(3) # [2, 4, 6]
```

**Important points and follow-ups**

- Measure retained memory and CPU as well as allocation counts.

**Source references**

- SRC-00552 — [nineteen.txt:927–939](../ruby/nineteen.txt) (51) · [complete source](sources/nineteen.md)


---

<a id="a-0258"></a>

### A-0258 — How to access Ruby array elements? How many methods are used to access Ruby elements.?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How to access Ruby array elements? How many methods are used to access Ruby elements.?

**Direct answer**

Access Array elements with [], at, fetch, first, last or slices; take and drop return prefix/suffix arrays.

**Detailed explanation**

[] commonly returns nil for an out-of-range single index, while fetch raises IndexError unless a default or block is supplied. Ranges and index/length pairs return slices, with behavior differing from a scalar lookup.

**Practical example**

```ruby
a = [10, 20, 30]
p a[1] # 20
p a.fetch(5, :missing) # :missing
p a[0, 2] # [10, 20]
```

**Important points and follow-ups**

- Default values can hide a mistaken index; choose raising behavior when absence is a bug.

**Source references**

- SRC-00303 — [nine.txt:213–224](../ruby/nine.txt) (32) · [complete source](sources/nine.md)


---

<a id="a-0259"></a>

### A-0259 — How to access Ruby strings elements in an application?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How to access Ruby strings elements in an application?

**Direct answer**

Use String#[] with an index, range, substring or regular expression, and use bytes/each_char/grapheme_clusters when the unit matters.

**Detailed explanation**

Negative indices count from the end. A missing index or substring can return nil. Character slicing follows the string’s encoding rather than treating every index as an arbitrary byte offset.

**Practical example**

```ruby
p "Ruby"[0]   # "R"
p "Ruby"[-1]  # "y"
p "Ruby"[1, 2] # "ub"
```

**Important points and follow-ups**

- For raw bytes use getbyte or byteslice deliberately.

**Source references**

- SRC-00295 — [nine.txt:154–157](../ruby/nine.txt) (24) · [complete source](sources/nine.md)


---

<a id="a-0260"></a>

### A-0260 — How to create Ruby object?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How to create Ruby object?

**Direct answer**

A class defines behavior for its instances. Class#new normally allocates an object and calls its initialize method; initialize sets state, while new returns the constructed object.

**Detailed explanation**

Define instance methods in a class and expose state deliberately with accessors. A subclass declaration uses < to inherit from one superclass; overridden methods can call super to extend inherited behavior. initialize is a private instance method and is more precisely an initialization hook than the allocator itself.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- The return value of initialize is not the return value of the normal Class#new call.

**Source references**

- SRC-00287 — [nine.txt:110–113](../ruby/nine.txt) (16) · [complete source](sources/nine.md)


---

<a id="a-0261"></a>

### A-0261 — How to declare a constructor in a Ruby class?

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

How to declare a constructor in a Ruby class?

**Direct answer**

Class#new allocates an object and calls its initialize instance method to set up initial state.

**Detailed explanation**

initialize is normally private and should accept the inputs required to establish a valid object. The value returned by initialize is ignored by the ordinary new construction path; new returns the new instance.

**Practical example**

```ruby
class Order
  attr_reader :total
  def initialize(total)
    @total = total
  end
end
Order.new(100).total
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-01046 — [thirtyseven.txt:174–178](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01182 — [twentyeight.txt:309–315](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0262"></a>

### A-0262 — How to define the Instance variable, Global variable, and Class variable in Ruby.

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 3

**Interview question**

How to define the Instance variable, Global variable, and Class variable in Ruby.

**Direct answer**

Instance variables use @name, class variables use @@name, and global variables use $name. Ordinary local variables have no prefix.

**Detailed explanation**

Instance variables belong to a particular object, including class objects. Class variables are shared within a class hierarchy and can lead to surprising coupling. A class instance variable belongs to the class object and is distinct from a class variable. Local-variable scopes are lexical; blocks can capture surrounding local bindings.

**Practical example**

```ruby
class Counter
  @total = 0 # class instance variable
  def initialize
    @value = 0 # each Counter instance owns this
  end
end
```

**Important points and follow-ups**

- Prefer explicit dependencies over mutable global state.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00699 — [thirty.txt:61–66](../ruby/thirty.txt) (15) · [complete source](sources/thirty.md)
- SRC-01360 — [twentytwo.txt:249–252](../ruby/twentytwo.txt) (15) · [complete source](sources/twentytwo.md)
- SRC-01403 — [twentythree.txt:68–71](../ruby/twentythree.txt) (Q11) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00699 (thirty.txt)</summary>

**Original prompt:** Explain how you define Instance Variable, Global Variable, and Class Variable in Ruby?

**Answer:** Local variables use plain names, instance variables start with @, class variables start with @@, and globals start with $.

An instance variable belongs to the current object, including a class object. A class-instance variable is different from a class variable: it is not implicitly shared across the class hierarchy. Class variables can be shared through inheritance and cause surprising coupling. Prefer explicit object state and avoid mutable globals.

```ruby
class Counter
  @count = 0 # class-instance variable
  @@shared = 0 # class variable
  def initialize
    @value = 0 # each Counter instance has its own
  end
end
```

</details>


---

<a id="a-0263"></a>

### A-0263 — How would you freeze an object in Ruby? Can you provide a simple example?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

How would you freeze an object in Ruby? Can you provide a simple example?

**Direct answer**

freeze prevents mutation of an object itself and returns that object. It is shallow: referenced nested objects can remain mutable, and the variable or constant can still be rebound.

**Detailed explanation**

The frozen_string_literal magic comment controls eligible string literals in its source file. Mutation attempts normally raise FrozenError. Freezing a constant’s value does not prohibit assigning that constant a new value; Ruby typically warns on reassignment. Deep immutability requires freezing or otherwise protecting nested values too.

**Practical example**

```ruby
items = ["a"].freeze
# items << "b" raises FrozenError
items.first << "!" # nested String remains mutable
p items # ["a!"]
```

**Important points and follow-ups**

- dup normally produces an unfrozen shallow copy; clone normally retains frozen state.

**Source references**

- SRC-00351 — [nine.txt:614–624](../ruby/nine.txt) (80) · [complete source](sources/nine.md)


---

<a id="a-0264"></a>

### A-0264 — Walk through Ruby's object model: classes, metaclasses, and BasicObject.

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Walk through Ruby's object model: classes, metaclasses, and BasicObject.

**Direct answer**

Ruby values have classes, and class objects are instances of Class. Class inherits Module, then Object, with BasicObject at the root; ordinary object-specific methods live in singleton classes.

**Detailed explanation**

Class methods are singleton methods on class objects. The source’s 5.singleton_class example raises TypeError in CRuby rather than returning a hidden eigenclass: Integer, Float and Symbol do not expose arbitrary singleton classes. nil, true and false have special singleton_class behavior.

**Practical example**

```ruby
p String.class # Class
p Class.superclass # Module
p Object.superclass # BasicObject
p Object.new.singleton_class
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/Object.html#method-i-singleton_class

**Corrections and source limitations**

- Corrected invalid 5.singleton_class example and “each object has its own singleton class” overstatement.

**Source references**

- SRC-00546 — [nineteen.txt:854–866](../ruby/nineteen.txt) (45) · [complete source](sources/nineteen.md)


---

<a id="a-0265"></a>

### A-0265 — What are Accessor Methods in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 5

**Interview question**

What are Accessor Methods in Ruby?

**Direct answer**

attr_reader defines a getter, attr_writer a setter, and attr_accessor both for an instance variable.

**Detailed explanation**

These Ruby methods generate ordinary methods and do not themselves persist values. Active Record derives its own database attribute accessors; casually overriding them with attr_accessor can hide persistence behavior. A reader alone does not make the returned object immutable.

**Practical example**

```ruby
class Person
  attr_accessor :name
  def initialize(name) = @name = name
end
person = Person.new("Ada")
person.name = "Grace"
p person.name
```

**Important points and follow-ups**

- Do not confuse accessors with Rails persistence: an arbitrary attr_accessor is transient unless application code persists it.
- attr_writer alone does not define the getter.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source declares both attr_reader and attr_writer, so name=/age= assignments succeed; the comments claiming errors are wrong.
- attr_accessor defines methods; it does not create database columns and may shadow Active Record attributes when names collide.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Accessors are Ruby methods; Active Record column attributes are a separate mechanism.

**Source references**

- SRC-00344 — [nine.txt:566–571](../ruby/nine.txt) (73) · [complete source](sources/nine.md)
- SRC-00624 — [twentyfour.txt:495–523](../ruby/twentyfour.txt) (10) · [complete source](sources/twentyfour.md)
- SRC-01027 — [thirtyseven.txt:36–44](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01185 — [twentyeight.txt:322–324](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01431 — [twentythree.txt:337–398](../ruby/twentythree.txt) (Q39) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00344 (nine.txt)</summary>

**Original prompt:** How Would You Create Getter And Setter Methods In Ruby?

**Answer:** attr_reader defines a getter, attr_writer defines a setter and attr_accessor defines both for an instance variable. They generate methods, not database columns or validations.

Use the least writable interface needed by callers. A reader-only attribute does not recursively freeze its returned value, and methods can be defined manually when writes need validation or normalization. Declaring both reader and writer has the same basic accessor effect as attr_accessor, so assignments succeed when both are present.

```ruby
class Person
  attr_accessor :name
  def initialize(name) = @name = name
end
person = Person.new("Asha")
person.name = "Ben"
p person.name # "Ben"
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01027 (thirtyseven.txt)</summary>

**Original prompt:** Tell me about getters and setters in Ruby

**Answer:** attr_reader creates a getter, attr_writer creates a setter, and attr_accessor creates both for a named instance variable.

These methods do not automatically create database columns. Active Record already generates persistence attribute methods from its schema; defining attr_accessor for the same name can shadow that behavior. Custom setters are useful for normalization or enforcing domain rules when used carefully.

```ruby
class Person
  attr_reader :name
  attr_accessor :age
  def initialize(name)
    @name = name
  end
end
```

</details>


---

<a id="a-0266"></a>

### A-0266 — What are modules and how do mixins work?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What are modules and how do mixins work?

**Direct answer**

A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.

**Detailed explanation**

Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.

**Practical example**

```ruby
module Greetable
  def greet = "hello"
end
class User
  include Greetable
end
p User.new.greet # "hello"
```

**Important points and follow-ups**

- Modules themselves are objects: Module.new creates a module, not an instance of that module.

**Source references**

- SRC-00524 — [nineteen.txt:450–472](../ruby/nineteen.txt) (23) · [complete source](sources/nineteen.md)


---

<a id="a-0267"></a>

### A-0267 — What are Ruby modules and how do they differ from classes?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What are Ruby modules and how do they differ from classes?

**Direct answer**

A class creates instances and may inherit from one superclass. A module groups constants and methods, provides a namespace and shares behavior through mixins; it cannot be instantiated as an ordinary instance or subclassed.

**Detailed explanation**

Classes are themselves instances of Class, and Class inherits from Module. include places module instance methods in the receiving class’s ancestry, prepend places them before that class, and extend adds them to an object’s singleton class. Module composition supplies reusable behavior without multiple class inheritance.

**Practical example**

```ruby
module Greetable
  def greet = "hello"
end
class User
  include Greetable
end
p User.new.greet # "hello"
```

**Important points and follow-ups**

- Modules themselves are objects: Module.new creates a module, not an instance of that module.

**Source references**

- SRC-00251 — [eight.txt:110–120](../ruby/eight.txt) (Junior-10) · [complete source](sources/eight.md)


---

<a id="a-0268"></a>

### A-0268 — What are some built-in Ruby class exceptions?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What are some built-in Ruby class exceptions?

**Direct answer**

Common application exceptions include ArgumentError, TypeError, NoMethodError, KeyError and ZeroDivisionError, under StandardError. Exception also has branches such as ScriptError, SystemExit and SignalException.

**Detailed explanation**

Knowing the hierarchy prevents rescuing too broadly. LoadError and SyntaxError are ScriptError descendants, so a bare rescue does not catch them; SystemExit should normally propagate. The exact exception for a failed operation depends on the API.

**Practical example**

```ruby
p ArgumentError < StandardError # true
p LoadError < StandardError # nil
p LoadError < Exception # true
```

**Important points and follow-ups**

- NoMemoryError is not an ordinary recoverable application error.

**Source references**

- SRC-00315 — [nine.txt:347–354](../ruby/nine.txt) (44) · [complete source](sources/nine.md)


---

<a id="a-0269"></a>

### A-0269 — What are the core principles of object-oriented programming that are essential in Ruby development?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What are the core principles of object-oriented programming that are essential in Ruby development?

**Direct answer**

Encapsulation hides implementation behind APIs; inheritance reuses/substitutes behavior; polymorphism lets different objects satisfy one interface; abstraction exposes the necessary model.

**Detailed explanation**

Encapsulation hides implementation behind APIs; inheritance reuses/substitutes behavior; polymorphism lets different objects satisfy one interface; abstraction exposes the necessary model.

**Practical example**

```ruby
class Invoice
  def total_cents; 1000; end
end
class Refund
  def total_cents; -1000; end
end
p [Invoice.new, Refund.new].sum(&:total_cents)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00207 — [twelve.txt:1–3](../ruby/twelve.txt) · [complete source](sources/twelve.md)


---

<a id="a-0270"></a>

### A-0270 — What are the three levels of method access control available in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 9

**Interview question**

What are the three levels of method access control available in Ruby?

**Direct answer**

public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts.

**Detailed explanation**

public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts. Modern Ruby permits a literal self receiver for private calls; arbitrary explicit receivers remain disallowed. Protected is not simply "available to subclasses"; explain receiver context.

**Practical example**

```ruby
class Person
  def initialize(age); @age = age; end
  def older_than?(other); age > other.age; end
  protected
  def age; @age; end
end
p Person.new(30).older_than?(Person.new(20))
```

**Important points and follow-ups**

- Modern Ruby permits a literal self receiver for private calls; arbitrary explicit receivers remain disallowed. Protected is not simply "available to subclasses"; explain receiver context.
- Verification: https://docs.ruby-lang.org/en/3.4/Module.html
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/modules_and_classes_rdoc.html

**Corrections and source limitations**

- Original incomplete/outdated claim corrected: public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts.
- Updated private-method receiver rule: literal self is permitted in Ruby 2.7+; older blanket prohibition is outdated.
- Visibility and class-variable sharing require precise Ruby context/inheritance rules; see corrected answer rather than the source’s simplified class-only statement.

**Source references**

- SRC-00165 — [five.txt:18–23](../ruby/five.txt) · [complete source](sources/five.md)
- SRC-00218 — [seven.txt:43–51](../ruby/seven.txt) (2) · [complete source](sources/seven.md)
- SRC-00346 — [nine.txt:578–585](../ruby/nine.txt) (75) · [complete source](sources/nine.md)
- SRC-00349 — [nine.txt:598–604](../ruby/nine.txt) (78) · [complete source](sources/nine.md)
- SRC-00528 — [nineteen.txt:530–546](../ruby/nineteen.txt) (27) · [complete source](sources/nineteen.md)
- SRC-00674 — [sixteen.txt:90–132](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01107 — [twenty.txt:73–75](../ruby/twenty.txt) (9) · [complete source](sources/twenty.md)
- SRC-01171 — [twentyeight.txt:151–189](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01362 — [twentytwo.txt:256–259](../ruby/twentytwo.txt) (17) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00218 (seven.txt)</summary>

**Original prompt:** What are the levels of access control for Ruby methods?

**Answer:** Ruby methods have public, protected and private visibility. Public calls are unrestricted; protected calls require a compatible object context; private calls use an implicit receiver or literal self in Ruby 2.7+.

Use private for internal implementation methods and protected for cooperation between compatible instances. A variable that happens to refer to self does not gain the literal-self exception. Visibility controls ordinary calls rather than preventing all reflection or privileged dispatch.

```ruby
class Account
  def check = self.secret
  private
  def secret = 42
end
p Account.new.check # 42
# Account.new.secret raises NoMethodError
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00674 (sixteen.txt)</summary>

**Original prompt:** Can you tell me the three levels of method access control for classes and modules?  What do they imply about the method?

**Answer:** Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.

Public methods accept ordinary explicit receivers. Protected methods may be called with an explicit compatible receiver from the defining class/subclass context. Private methods normally use an implicit receiver; modern Ruby permits literal self in private calls. send bypasses visibility; public_send enforces public access. Instance methods are usually public by default, while initialize is private.

```ruby
class Account
  def visible = balance
  private
  def balance = 10
end
Account.new.visible # 10
Account.new.public_send(:balance) # raises NoMethodError
```

</details>


---

<a id="a-0271"></a>

### A-0271 — What do attr_accessor, attr_reader, and attr_writer do?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

What do attr_accessor, attr_reader, and attr_writer do?

**Direct answer**

attr_reader defines a getter, attr_writer defines a setter and attr_accessor defines both for an instance variable. They generate methods, not database columns or validations.

**Detailed explanation**

Use the least writable interface needed by callers. A reader-only attribute does not recursively freeze its returned value, and methods can be defined manually when writes need validation or normalization. Declaring both reader and writer has the same basic accessor effect as attr_accessor, so assignments succeed when both are present.

**Practical example**

```ruby
class Person
  attr_accessor :name
  def initialize(name) = @name = name
end
person = Person.new("Asha")
person.name = "Ben"
p person.name # "Ben"
```

**Important points and follow-ups**

- Do not confuse accessors with Rails persistence: an arbitrary attr_accessor is transient unless application code persists it.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Accessors do not validate type or freeze returned objects; they expose behavior rather than public instance-variable access.

**Source references**

- SRC-00185 — [six.txt:789–911](../ruby/six.txt) (Q9) · [complete source](sources/six.md)
- SRC-00513 — [nineteen.txt:286–302](../ruby/nineteen.txt) (12) · [complete source](sources/nineteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00185 (six.txt)</summary>

**Original prompt:** What is the difference between attr_accessor, attr_reader, and attr_writer?

**Answer:** attr_reader defines a getter, attr_writer defines a setter, and attr_accessor defines both methods backed by an instance variable.

attr_reader defines a getter, attr_writer defines a setter, and attr_accessor defines both methods backed by an instance variable. Accessors do not validate type or freeze returned objects; they expose behavior rather than public instance-variable access.

```ruby
class Person
  attr_reader :id
  attr_accessor :name
  def initialize(id, name); @id, @name = id, name; end
end
p Person.new(1,"Ana").name
```

</details>


---

<a id="a-0272"></a>

### A-0272 — What does reopening a class (monkey patching) mean, and what are the risks?

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What does reopening a class (monkey patching) mean, and what are the risks?

**Direct answer**

Monkey patching adds or changes behavior on a class or module owned elsewhere, often globally affecting its users.

**Detailed explanation**

Ruby’s open classes make this possible, but library collisions, load-order dependence and future upstream changes can make it fragile. Prefer a wrapper, an explicitly included module or lexical refinement where those interfaces meet the requirement.

**Practical example**

```ruby
class String
  def shout
    upcase + "!"
  end
end
p "hi".shout # "HI!"
```

**Important points and follow-ups**

- The example changes String globally; it is educational, not a default application recommendation.

**Source references**

- SRC-00547 — [nineteen.txt:867–882](../ruby/nineteen.txt) (46) · [complete source](sources/nineteen.md)


---

<a id="a-0273"></a>

### A-0273 — What is a class?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

What is a class?

**Direct answer**

A class is an object defining the behavior and construction of its instances.

**Detailed explanation**

Instance methods define behavior for each instance; each object has its own instance-variable state. Classes can themselves have singleton methods and instance variables. Class.new constructs new anonymous classes; SomeClass.new allocates an instance and invokes initialize.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
User.new("Ada").name
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00671 — [sixteen.txt:19–42](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01168 — [twentyeight.txt:94–111](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0274"></a>

### A-0274 — What is a module in Ruby, and how is it different from a class?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is a module in Ruby, and how is it different from a class?

**Direct answer**

Classes create instances and have one superclass. Modules provide namespaces and reusable methods through include/prepend/extend; they cannot be directly instantiated as domain objects.

**Detailed explanation**

Classes create instances and have one superclass. Modules provide namespaces and reusable methods through include/prepend/extend; they cannot be directly instantiated as domain objects. Module objects can have instance variables, and mixed-in methods can use the receiving object’s state.

**Practical example**

```ruby
module Greetable
  def greet; "hello"; end
end
class User; include Greetable; end
p User.new.greet
```

**Important points and follow-ups**

- Module objects can have instance variables, and mixed-in methods can use the receiving object’s state.

**Source references**

- SRC-00156 — [four.txt:41–46](../ruby/four.txt) (5) · [complete source](sources/four.md)


---

<a id="a-0275"></a>

### A-0275 — What is a Service Object, and when do you use it?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is a Service Object, and when do you use it?

**Direct answer**

A service object is an application-defined object encapsulating a coherent operation, especially when it coordinates several models or external dependencies.

**Detailed explanation**

It is a design convention, not a built-in Rails superclass. Expose a small interface, make failure/transaction behavior explicit and inject external dependencies for tests. Avoid turning a service into a generic procedural dumping ground.

**Practical example**

```ruby
class Checkout
  def initialize(gateway:) = @gateway = gateway
  def call(order)
    @gateway.authorize(order.total_cents)
  end
end
```

**Important points and follow-ups**

- Separate database transaction boundaries from external network effects.

**Source references**

- SRC-00386 — [ten.txt:95–97](../ruby/ten.txt) (15) · [complete source](sources/ten.md)


---

<a id="a-0276"></a>

### A-0276 — What is an object?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 3

**Interview question**

What is an object?

**Direct answer**

An object is a value with identity, class membership and behavior; it can also hold state in instance variables.

**Detailed explanation**

Object is a particular class, not the general definition of an object. In modern Ruby, BasicObject is the minimal root, while most ordinary objects inherit from Object. Classes and modules are also objects.

**Practical example**

```ruby
user = Object.new
user.class # Object
user.object_id # identity, not a portable raw memory address
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Modern Ruby has BasicObject as the minimal root; Object is the usual root for ordinary application objects.

**Source references**

- SRC-00672 — [sixteen.txt:43–50](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01169 — [twentyeight.txt:112–118](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01181 — [twentyeight.txt:306–308](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0277"></a>

### A-0277 — What is Class Library in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 8

**Interview question**

What is Class Library in Ruby?

**Direct answer**

Ruby provides built-in core classes, standard libraries, default or bundled gems, and installable third-party gems.

**Detailed explanation**

Array, String, Hash and Thread are core examples. Libraries such as json and net/http provide reusable facilities and may be delivered as gems depending on Ruby release. GUI toolkits are not a universal built-in Ruby facility; choose an external library when required.

**Practical example**

```ruby
require "json"
p JSON.parse('{"name":"Ada"}')["name"] # "Ada"
```

**Important points and follow-ups**

- Check the runtime’s installed gems and official library documentation.
- Check the target Ruby’s library packaging rather than assuming every historical standard library is installed.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00274 — [nine.txt:20–28](../ruby/nine.txt) (3) · [complete source](sources/nine.md)
- SRC-00301 — [nine.txt:197–205](../ruby/nine.txt) (30) · [complete source](sources/nine.md)
- SRC-00428 — [eleven.txt:86–94](../ruby/eleven.txt) (5) · [complete source](sources/eleven.md)
- SRC-00687 — [thirty.txt:15–17](../ruby/thirty.txt) (2) · [complete source](sources/thirty.md)
- SRC-00722 — [thirty.txt:152–154](../ruby/thirty.txt) (38) · [complete source](sources/thirty.md)
- SRC-00728 — [thirty.txt:170–177](../ruby/thirty.txt) (44) · [complete source](sources/thirty.md)
- SRC-01302 — [twentynine.txt:30–32](../ruby/twentynine.txt) (4) · [complete source](sources/twentynine.md)
- SRC-01411 — [twentythree.txt:134–140](../ruby/twentythree.txt) (Q19) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00274 (nine.txt)</summary>

**Original prompt:** What are class libraries in Ruby?

**Answer:** Ruby’s core and standard/bundled libraries cover collections, text, files, concurrency, networking, data formats and more; third-party gems extend those domains.

A library is code organized around a reusable API, often classes and modules. The source’s CGI/GUI/XML list is illustrative, not an exhaustive inventory or a guarantee that every component ships as Ruby core. Standard and bundled gem packaging can change between Ruby releases.

```ruby
require "json"
p JSON.parse('{"ok":true}') # {"ok"=>true}
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00687 (thirty.txt)</summary>

**Original prompt:** Explain what is class libraries in Ruby?

**Answer:** A class library is reusable code organized into classes/modules; Ruby’s standard and gem libraries cover many domains.

Examples include JSON for structured data, Net::HTTP for network requests, CSV for tabular data, and threading/synchronization APIs. Library distribution changes by Ruby release: some are built-in/default/bundled gems and others must be added explicitly. A class library is not a special Rails subsystem or a fixed set of domains.

```ruby
require "json"
JSON.parse("{"active":true}")
```

</details>


---

<a id="a-0278"></a>

### A-0278 — What is Mixin in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

What is Mixin in Rails?

**Direct answer**

Ruby classes have one superclass, but can compose behavior from multiple modules using include, prepend, or extend.

**Detailed explanation**

include adds a module’s instance methods to an ancestor chain; prepend places them before the class; extend adds them to one object’s singleton class. Lookup order resolves conflicts, and super continues through that chain. A module supplies behavior and namespaces but cannot be instantiated with ModuleName.new.

**Practical example**

```ruby
module Named
  def label = "user"
end
class User
  include Named
end
p User.new.label # "user"
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html
- Mixin composition is not multiple class inheritance.
- Use ancestors and singleton_class.ancestors to explain lookup order.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01312 — [twentynine.txt:64–66](../ruby/twentynine.txt) (14) · [complete source](sources/twentynine.md)
- SRC-01402 — [twentythree.txt:65–67](../ruby/twentythree.txt) (Q10) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01312 (twentynine.txt)</summary>

**Original prompt:** What is Mixin?

**Answer:** Ruby classes have one superclass; modules provide namespaces and reusable mixin behavior through include, prepend or extend.

include adds module methods to an instance lookup chain, prepend places them before the class, and extend adds them to a particular object’s singleton class. A plain module cannot be instantiated with new. Mixins reuse behavior but are not multiple class inheritance.

```ruby
module Printable
  def print_label = "label"
end
class Product
  include Printable
end
Product.new.print_label
```

</details>


---

<a id="a-0279"></a>

### A-0279 — What is Ruby and why is it considered an object-oriented language (OOP)?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 5

**Interview question**

What is Ruby and why is it considered an object-oriented language (OOP)?

**Direct answer**

Ruby is dynamically typed and object oriented: values, including numbers, nil, classes and modules, are objects. Methods and blocks support expressive reusable APIs.

**Detailed explanation**

Ruby is a dynamic, high-level programming language known for its simplicity and elegance. Ruby is considered an object-oriented programming (OOP) language because everything in Ruby is treated as an object. Each value in Ruby, be it a number, a string, an array, or a hash, is an object with its own methods and attributes. This object-oriented nature allows developers to model real-world entities and interactions more naturally through classes and objects.

In Ruby, even classes and modules are objects, which is a characteristic not found in all OOP languages. This means you can dynamically alter classes and modules at runtime, providing a high degree of flexibility.

The object-oriented nature of Ruby also promotes encapsulation, inheritance, and polymorphism, which are key principles of OOP. These principles make it easier to manage and manipulate data, enhance code reusability, and provide a structure that makes code easier to maintain and understand.

**Practical example**

```ruby
p [1.class, nil.class, String.class] # [Integer, NilClass, Class]
```

**Important points and follow-ups**

- Variables hold references to objects; a variable itself is not an object.
- Every Ruby value is an object; a block and language syntax are not independently objects.
- Typing and execution strategy are different concepts.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00001 — [first.txt:1–7](../ruby/first.txt) (1) · [complete source](sources/first.md)
- SRC-00440 — [thirteen.txt:23–33](../ruby/thirteen.txt) (concept-1) · [complete source](sources/thirteen.md)
- SRC-00503 — [nineteen.txt:125–138](../ruby/nineteen.txt) (2) · [complete source](sources/nineteen.md)
- SRC-00643 — [fifteen.txt:82–82](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-01178 — [twentyeight.txt:298–300](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00440 (thirteen.txt)</summary>

**Original prompt:** Explain Everything is an Object.

**Answer:** Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

Variables refer to objects and can later refer to objects of other classes; operations are checked at runtime. Classes are themselves objects, so Ruby can define behavior dynamically. CRuby normally compiles source to VM instructions before executing it; “interpreted” does not mean source is executed without any compilation. Rails is a separate web framework built with Ruby.

```ruby
p 7.class                 # Integer
p nil.to_s                # ""
p [1, 2, 3].select(&:even?) # [2]
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00643 (fifteen.txt)</summary>

**Original prompt:** What does “everything is an object” mean in Ruby?

**Answer:** Ruby values such as numbers, nil, booleans, classes and modules are objects; syntax constructs such as if and def are not themselves ordinary value objects.

Every object has a class and identity and receives method calls. Class is itself a class, classes are objects, and BasicObject is the minimal root of the normal hierarchy. A block is syntax that can be captured in a Proc; do not claim every language keyword or raw block is an object.

```text
1.class # Integer
nil.class # NilClass
String.class # Class
Class.superclass # Module
```

</details>


---

<a id="a-0280"></a>

### A-0280 — What is the contract between eql? and hash for custom objects used as hash keys?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the contract between eql? and hash for custom objects used as hash keys?

**Direct answer**

If a.eql?(b) is true, a.hash must equal b.hash. Hash collisions are allowed, but equal keys must agree on their hash.

**Detailed explanation**

Define a stable equivalence relation and compute the hash from the same fields with compatible comparison semantics. The source compares coordinates with ==, which makes numeric values such as 1 and 1.0 compare equal while their component hash/eql? behavior can differ. Use eql? consistently or normalize values. Keys must not mutate in a way that changes their hash while stored.

**Practical example**

```ruby
class Coord
  attr_reader :x, :y
  def initialize(x, y)
    @x, @y = x, y
  end
  def eql?(other)
    other.instance_of?(self.class) && x.eql?(other.x) && y.eql?(other.y)
  end
  def hash = [self.class, x, y].hash
end
```

**Important points and follow-ups**

- Hash lookup involves hash buckets and then eql? matching.

**Corrections and source limitations**

- Corrected potential eql?/hash contract mismatch in source’s numeric-coordinate example.

**Source references**

- SRC-00560 — [nineteen.txt:1049–1069](../ruby/nineteen.txt) (59) · [complete source](sources/nineteen.md)


---

<a id="a-0281"></a>

### A-0281 — What is the difference between class variables (@@) and instance variables (@) in Ruby?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 3

**Interview question**

What is the difference between class variables (@@) and instance variables (@) in Ruby?

**Direct answer**

@@variables are shared across an inheritance hierarchy; @variables belong to the current receiver, which may itself be a class object. Neither form is automatically thread-safe.

**Detailed explanation**

@@variables are shared across an inheritance hierarchy; @variables belong to the current receiver, which may itself be a class object. Neither form is automatically thread-safe. Class instance variables are not instance variables of constructed objects and are not automatically copied to subclasses. Both forms need synchronization if shared mutable state is accessed concurrently.

**Practical example**

```ruby
class Base
  @count = 0
  class << self; attr_accessor :count; end
end
class Child < Base; end
p [Base.count, Child.count] # [0,nil]
```

**Important points and follow-ups**

- Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Class instance variables are not instance variables of constructed objects and are not automatically copied to subclasses. Both forms need synchronization if shared mutable state is accessed concurrently.
- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00187 — [six.txt:1004–1138](../ruby/six.txt) (Q11) · [complete source](sources/six.md)
- SRC-00808 — [thirtyeight.txt:222–223](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01186 — [twentyeight.txt:325–328](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00808 (thirtyeight.txt)</summary>

**Original prompt:** Explain how class variables are different from instance variables.

**Answer:** Local variables use plain names, instance variables start with @, class variables start with @@, and globals start with $.

An instance variable belongs to the current object, including a class object. A class-instance variable is different from a class variable: it is not implicitly shared across the class hierarchy. Class variables can be shared through inheritance and cause surprising coupling. Prefer explicit object state and avoid mutable globals.

```ruby
class Counter
  @count = 0 # class-instance variable
  @@shared = 0 # class variable
  def initialize
    @value = 0 # each Counter instance has its own
  end
end
```

</details>


---

<a id="a-0282"></a>

### A-0282 — What is the difference between super and super() Call?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 3

**Interview question**

What is the difference between super and super() Call?

**Direct answer**

Bare super forwards the current method’s arguments to the next implementation; super() sends no positional or keyword arguments.

**Detailed explanation**

The next implementation may live in a prepended or included module, not only a superclass. An incoming block is normally forwarded by both forms; use &nil when it must not be forwarded. Explicit super(value) passes only the supplied argument list.

**Practical example**

```ruby
class Parent
  def call(*args) = args
end
class Child < Parent
  def call(value)
    [super, super()]
  end
end
p Child.new.call(7) # [[7], []]
```

**Important points and follow-ups**

- It calls the next lookup-chain method, which may be in a module rather than the immediate superclass.
- Wrong arity is possible if the next method expects different arguments.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected superclass-only wording: super follows the method ancestor chain.

**Source references**

- SRC-00101 — [second.txt:1–7](../ruby/second.txt) (Q1) · [complete source](sources/second.md)
- SRC-00319 — [nine.txt:375–380](../ruby/nine.txt) (48) · [complete source](sources/nine.md)
- SRC-01432 — [twentythree.txt:399–459](../ruby/twentythree.txt) (Q40) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00101 (second.txt)</summary>

**Original prompt:** What is the difference between calling `super` and calling `super()`?

**Answer:** Bare super forwards current arguments; super() passes none. Both normally forward the current block unless explicitly suppressed.

A call to `super` invokes the parent method with the same arguments that were passed to the child method.  An error will therefore occur if the arguments passed to the child method don’t match what the parent is expecting.


A call to `super()` invokes the parent method without any arguments, as presumably expected.  As always, being explicit in your code is a good thing.


(Thanks to Ruby Gotchas for this question.)

```ruby
class Base
  def show(*args); args; end
end
class Child < Base
  def show(x); [super, super()]; end
end
p Child.new.show(1) # [[1], []]
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00319 (nine.txt)</summary>

**Original prompt:** What is the difference between calling super and calling super()?

**Answer:** super calls the next implementation of the current method in Ruby’s method lookup chain. Bare super forwards the current arguments; super() passes no positional or keyword arguments; super(args) passes the explicitly supplied arguments.

This lets an override extend behavior supplied by a superclass or mixin instead of replacing it entirely. The next method must accept the forwarded arguments. Blocks are normally forwarded too; use &nil when you deliberately want to suppress the block. Ruby 3 separates positional hashes and keyword arguments, so forward both correctly when writing wrappers.

```ruby
class A
  def greet(name = "guest") = "Hi #{name}"
end
class B < A
  def greet(name) = super + "!"
end
p B.new.greet("Asha") # "Hi Asha!"
```

</details>


---

<a id="a-0283"></a>

### A-0283 — What is the difference between the `Object` methods `clone` and `dup`?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 3

**Interview question**

What is the difference between the `Object` methods `clone` and `dup`?

**Direct answer**

Both dup and clone are shallow; clone retains singleton behavior and usually frozen state, while dup normally does not.

**Detailed explanation**

`Object#dup` creates a shallow copy of an object. For example, it will not copy any mixed-in module methods, whereas `Object#clone` will. This can be shown with the following code example:



```ruby
class Klass
  attr_accessor :str
end

module Foo
  def foo; 'foo'; end
end

s1 = Klass.new #=> #
s1.extend(Foo) #=> #
s1.foo #=> "foo"

s2 = s1.clone #=> #
s2.foo #=> "foo"

s3 = s1.dup #=> #
s3.foo #=> NoMethodError: undefined method `foo' for #

```

**Practical example**

```ruby
a = ["text"].freeze
p [a.dup.frozen?, a.clone.frozen?]
```

**Important points and follow-ups**

- clone is not a deep copy; nested mutable objects remain shared.
- Verification: https://docs.ruby-lang.org/en/3.4/Object.html
- Custom initialize_dup/initialize_clone hooks can change subclass behavior.
- Reference: https://docs.ruby-lang.org/en/3.4/Object.html

**Corrections and source limitations**

- Source correction: dup and clone are both shallow copies. clone normally retains frozen state and singleton-class behavior; dup normally drops them. Referenced nested objects remain shared in either copy unless explicitly duplicated.
- Clarified instance-level extensions versus modules mixed into the ordinary class.

**Source references**

- SRC-00038 — [first.txt:268–272](../ruby/first.txt) (8) · [complete source](sources/first.md)
- SRC-00119 — [second.txt:377–398](../ruby/second.txt) (Q19) · [complete source](sources/second.md)
- SRC-00366 — [nine.txt:771–774](../ruby/nine.txt) (95) · [complete source](sources/nine.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00038 (first.txt)</summary>

**Original prompt:** Differentiate between 'dup' and 'clone' methods.

**Answer:** dup and clone both make shallow copies. clone also copies singleton-class behavior and normally frozen state; dup normally omits those.

dup and clone are both shallow copies. clone normally retains frozen state and singleton-class behavior; dup normally drops them. Referenced nested objects remain shared in either copy unless explicitly duplicated.

```ruby
original = ["x"].freeze
p [original.dup.frozen?, original.clone.frozen?] # [false, true]
p original.clone[0].equal?(original[0]) # true
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00366 (nine.txt)</summary>

**Original prompt:** What is the difference between the Object methods clone and dup?

**Answer:** dup and clone both make shallow copies; clone normally preserves singleton-class behavior and frozen state, while dup normally does not copy singleton methods and returns an unfrozen copy.

Nested references are shared unless application code deep-copies them. Included modules on the ordinary class remain available to both copies because their class still has them; the relevant distinction is per-object singleton-class behavior, such as object.extend(module). Some immutable immediate values cannot be copied into a distinct mutable object.

```ruby
obj = Object.new
def obj.greet = "hi"
obj.freeze
p obj.clone.frozen? # true
p obj.dup.frozen?   # false
p obj.clone.respond_to?(:greet) # true
```

</details>


---

<a id="a-0284"></a>

### A-0284 — What is the Enumerable module and why does it matter?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the Enumerable module and why does it matter?

**Direct answer**

Enumerable provides methods such as map, select, reduce, sort, group_by and min to objects that implement each.

**Detailed explanation**

An Enumerable implementation must yield its elements consistently; comparison-dependent methods also need usable comparisons. Returning an Enumerator when each has no block makes custom collections easier to chain.

**Practical example**

```ruby
class Playlist
  include Enumerable
  def initialize(tracks) = @tracks = tracks
  def each(&block)
    return enum_for(:each) unless block
    @tracks.each(&block)
  end
end
p Playlist.new(["a", "b"]).map(&:upcase)
```

**Important points and follow-ups**

- The iteration protocol is the foundation; some derived operations need additional semantics.

**Source references**

- SRC-00530 — [nineteen.txt:564–582](../ruby/nineteen.txt) (29) · [complete source](sources/nineteen.md)


---

<a id="a-0285"></a>

### A-0285 — What is the function of modules in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the function of modules in Ruby?

**Direct answer**

Modules provide namespaces and reusable mixed-in behavior. Ruby has single superclass inheritance even when multiple module methods are composed.

**Detailed explanation**

Modules provide namespaces and reusable mixed-in behavior. Ruby has single superclass inheritance even when multiple module methods are composed. Source calls mixins "multiple inheritance"; qualify that this is not multiple superclasses.

**Practical example**

```ruby
module Logging
  def log(message); puts message; end
end
class Service; include Logging; end
```

**Important points and follow-ups**

- Source calls mixins "multiple inheritance"; qualify that this is not multiple superclasses.

**Source references**

- SRC-00162 — [five.txt:3–6](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="a-0286"></a>

### A-0286 — What is the purpose of the super keyword in Ruby?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the purpose of the super keyword in Ruby?

**Direct answer**

super calls the next implementation of the current method in Ruby’s method lookup chain. Bare super forwards the current arguments; super() passes no positional or keyword arguments; super(args) passes the explicitly supplied arguments.

**Detailed explanation**

This lets an override extend behavior supplied by a superclass or mixin instead of replacing it entirely. The next method must accept the forwarded arguments. Blocks are normally forwarded too; use &nil when you deliberately want to suppress the block. Ruby 3 separates positional hashes and keyword arguments, so forward both correctly when writing wrappers.

**Practical example**

```ruby
class A
  def greet(name = "guest") = "Hi #{name}"
end
class B < A
  def greet(name) = super + "!"
end
p B.new.greet("Asha") # "Hi Asha!"
```

**Important points and follow-ups**

- It calls the next lookup-chain method, which may be in a module rather than the immediate superclass.

**Source references**

- SRC-00226 — [seven.txt:173–196](../ruby/seven.txt) (10) · [complete source](sources/seven.md)


---

<a id="a-0287"></a>

### A-0287 — What is unit testing (in classical terms)?  What is the primary technique when writing a test?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

What is unit testing (in classical terms)?  What is the primary technique when writing a test?

**Direct answer**

A unit test checks a focused behavior with assertions comparing actual and expected outcomes; a Rails suite combines unit/model, request/integration and browser/system tests.

**Detailed explanation**

Use Minitest or RSpec consistently and choose a test boundary based on the behavior. A unit need not be exactly one method, and tests should cover observable behavior rather than copy implementation details. Keep external effects controlled and scenario data explicit.

**Practical example**

```ruby
require "minitest/autorun"
class PriceTest < Minitest::Test
  def test_total
    assert_equal 6, [1, 2, 3].sum
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00679 — [sixteen.txt:242–280](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)
- SRC-01176 — [twentyeight.txt:264–294](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0288"></a>

### A-0288 — When is the “super” keyword used in Ruby?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

When is the “super” keyword used in Ruby?

**Direct answer**

super calls the next implementation of the current method in Ruby’s method lookup chain. Bare super forwards the current arguments; super() passes no positional or keyword arguments; super(args) passes the explicitly supplied arguments.

**Detailed explanation**

This lets an override extend behavior supplied by a superclass or mixin instead of replacing it entirely. The next method must accept the forwarded arguments. Blocks are normally forwarded too; use &nil when you deliberately want to suppress the block. Ruby 3 separates positional hashes and keyword arguments, so forward both correctly when writing wrappers.

**Practical example**

```ruby
class A
  def greet(name = "guest") = "Hi #{name}"
end
class B < A
  def greet(name) = super + "!"
end
p B.new.greet("Asha") # "Hi Asha!"
```

**Important points and follow-ups**

- It calls the next lookup-chain method, which may be in a module rather than the immediate superclass.

**Source references**

- SRC-00430 — [eleven.txt:113–118](../ruby/eleven.txt) (7) · [complete source](sources/eleven.md)


---

<a id="a-0289"></a>

### A-0289 — __________ is a tool for altering the database schema of an application.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

__________ is a tool for altering the database schema of an application.

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html
- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01392 — [twentytwo.txt:498–507](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0290"></a>

### A-0290 — How are constants declared and what is their scope in Ruby?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How are constants declared and what is their scope in Ruby?

**Direct answer**

A Ruby constant starts with an uppercase letter and is resolved through lexical and namespace rules. Reassignment is possible and usually warns; freezing its referenced value does not prevent rebinding.

**Detailed explanation**

Nested module definitions and A::B definitions have different lexical nesting. Use qualified names to make cross-namespace access explicit. ALL_CAPS is a convention for value constants; class/module names are constants too. Ruby has no ordinary language rule that makes every constant a global variable. Call warn or Warning.warn for messages; the source’s warning method is not a standard replacement.

**Practical example**

```ruby
module Geometry
  RADIUS = 5.0
  LABEL = "circle".freeze
end
p Geometry::RADIUS
# Geometry::LABEL = "new" reassigns the constant (with a warning).
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/syntax/modules_and_classes_rdoc.html

**Corrections and source limitations**

- Corrected global-scope claim, unsupported warning invocation and claim that freeze prohibits constant reassignment.

**Source references**

- SRC-00619 — [twentyfour.txt:152–202](../ruby/twentyfour.txt) (5) · [complete source](sources/twentyfour.md)


---

<a id="a-0291"></a>

### A-0291 — Is it possible in Ruby to develop database-driven applications in Ruby Tell anyone the basic approach through which the same can be developed in ruby?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Is it possible in Ruby to develop database-driven applications in Ruby Tell anyone the basic approach through which the same can be developed in ruby?

**Direct answer**

Start with the domain and user workflows, define the data/constraints and HTTP interface, and implement a tested, secure vertical feature in the Rails application structure.

**Detailed explanation**

app/models holds domain/persistence classes, app/controllers request coordinators, app/views templates, config configuration and db migrations/schema/seeds. PostgreSQL is one supported choice, not a mandatory database for every Rails application. Database-driven behavior comes from persistence code, not merely choosing MVC.

**Practical example**

```text
app/models/product.rb
app/controllers/products_controller.rb
app/views/products/index.html.erb
config/routes.rb
db/migrate/..._create_products.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00710 — [thirty.txt:106–108](../ruby/thirty.txt) (26) · [complete source](sources/thirty.md)


---

<a id="a-0292"></a>

### A-0292 — Discuss the purpose of RVM and rbenv for managing Ruby versions.

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Discuss the purpose of RVM and rbenv for managing Ruby versions.

**Direct answer**

RVM and rbenv select project Ruby versions. RVM also offers gemsets; rbenv uses shims and can pair with ruby-build to install interpreters.

**Detailed explanation**

RVM (Ruby Version Manager) and rbenv are tools used to manage multiple Ruby versions on a single system. They enable developers to switch between different Ruby versions easily, helping to ensure compatibility with different projects.

RVM provides isolated gemsets for each Ruby version while rbenv employs a lightweight approach by manipulating the PATH variable. These tools are essential for maintaining a clean development environment.

**Practical example**

```bash
rbenv local 3.4.0
ruby -v
```

**Important points and follow-ups**

- Example version is illustrative, not a recommendation to use an old patch. Bundler handles application dependency isolation.

**Source references**

- SRC-00068 — [first.txt:426–430](../ruby/first.txt) (8) · [complete source](sources/first.md)


---

<a id="a-0293"></a>

### A-0293 — Explain the role of Bundler and gems in the Ruby ecosystem.

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Explain the role of Bundler and gems in the Ruby ecosystem.

**Direct answer**

RubyGems packages reusable libraries; Bundler resolves a project’s Gemfile and Gemfile.lock so installs use a compatible dependency set.

**Detailed explanation**

Bundler is a tool used in the Ruby ecosystem to manage gem dependencies for projects. It maintains a 'Gemfile' which lists required gems along with their versions. It ensures that the correct versions of gems are installed and that there are no version conflicts, providing a consistent environment for applications across different machines.

Gems, on the other hand, are packages that encapsulate reusable code and libraries, simplifying the process of incorporating functionality into Ruby projects.

**Practical example**

```bash
bundle install
bundle exec ruby app.rb
```

**Important points and follow-ups**

- Commit application lockfiles. A dependency solver can report incompatible constraints; Bundler cannot guarantee no future security or compatibility problems.

**Source references**

- SRC-00066 — [first.txt:412–416](../ruby/first.txt) (6) · [complete source](sources/first.md)


---

<a id="a-0294"></a>

### A-0294 — How do you create and publish your own Ruby Gem?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

How do you create and publish your own Ruby Gem?

**Direct answer**

Create a library and gemspec, build the gem, verify its packaged contents and tests, then publish through an authorized RubyGems account.

**Detailed explanation**

To create and publish a Ruby Gem, you need to follow these steps:

Create a gemspec file describing your gem.
Write your gem's code and structure it according to conventions.
Use the 'gem build' command to create a gem file from your gemspec.
Use 'gem push' to publish your gem to RubyGems.org, the central gem repository.
This process allows you to share your code and libraries with others in the Ruby community.

**Practical example**

```bash
bundle gem useful_library
# In the generated project, configure its gemspec and tests.
gem build useful_library.gemspec
gem push useful_library-0.1.0.gem
```

**Important points and follow-ups**

- Do not package credentials or proprietary data. Publishing creates an external release and needs ownership/version discipline.

**Source references**

- SRC-00067 — [first.txt:417–425](../ruby/first.txt) (7) · [complete source](sources/first.md)


---

<a id="a-0295"></a>

### A-0295 — How do you install a Ruby gem?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

How do you install a Ruby gem?

**Direct answer**

Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.

**Detailed explanation**

Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.

**Practical example**

```bash
bundle add pagy
bundle install
# Gemfile:
gem "pg", "~> 1.5"
```

**Important points and follow-ups**

- Reference: https://bundler.io/guides/using_bundler_in_applications.html

**Source references**

- SRC-01057 — [thirtysix.txt:159–196](../ruby/thirtysix.txt) (5) · [complete source](sources/thirtysix.md)


---

<a id="a-0296"></a>

### A-0296 — Mention What Is The Difference Between A Gem And A Plugin In Ruby?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Mention What Is The Difference Between A Gem And A Plugin In Ruby?

**Direct answer**

A gem is a Ruby package. A plugin is an extension role or integration mechanism; modern Rails plugins are commonly packaged as gems, often with a Railtie or engine.

**Detailed explanation**

The source describes an older distinction between machine-installed gems and application-local vendor/plugins. Modern Bundler can install gems per project, and plugins can be distributed as gems, so installation location does not define the difference.

**Practical example**

```bash
bin/rails plugin new audit_tools
# Include the resulting package in an application through its Gemfile.
```

**Important points and follow-ups**

- Distinguish historical Rails plugin layout from current packaging.

**Corrections and source limitations**

- Corrected outdated gem-versus-plugin location rule.

**Source references**

- SRC-00329 — [nine.txt:489–494](../ruby/nine.txt) (58) · [complete source](sources/nine.md)


---

<a id="a-0297"></a>

### A-0297 — What are gems and how does Bundler manage them?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What are gems and how does Bundler manage them?

**Direct answer**

A gem packages Ruby code and metadata. Bundler resolves dependencies declared in a Gemfile and records selected versions in Gemfile.lock; bundle exec selects that bundle when running a command.

**Detailed explanation**

Declare direct dependencies and constraints intentionally, install with bundle install and update selected dependencies with testing. Commit the application lockfile for reproducible development and CI installations. RubyGems supplies gem installation and distribution, while Bundler selects a consistent dependency set for a project; a gem need not be installed globally or published publicly.

**Practical example**

```ruby
# Gemfile
source "https://rubygems.org"
gem "rack"
# shell: bundle install
# shell: bundle exec ruby app.rb
```

**Important points and follow-ups**

- Example version pins in old articles are historical, not current upgrade recommendations.

**Source references**

- SRC-00539 — [nineteen.txt:707–721](../ruby/nineteen.txt) (38) · [complete source](sources/nineteen.md)


---

<a id="a-0298"></a>

### A-0298 — What are RubyGems?  Got any favourites?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 2

**Interview question**

What are RubyGems?  Got any favourites?

**Direct answer**

RubyGems distributes Ruby libraries/tools as versioned packages. Choose gems by maintenance, API fit, security and compatibility; a favorite should be explained with a real project example.

**Detailed explanation**

RubyGems distributes Ruby libraries/tools as versioned packages. Choose gems by maintenance, API fit, security and compatibility; a favorite should be explained with a real project example. An interview preference question has no single universally correct favorite.

**Practical example**

```bash
gem list
# In Gemfile: gem "rake"
# Then: bundle install
```

**Important points and follow-ups**

- An interview preference question has no single universally correct favorite.

**Corrections and source limitations**

- Original answer is absent or incomplete; the answer below is an authored completion.
- Original incomplete/outdated claim corrected: RubyGems distributes Ruby libraries/tools as versioned packages. Choose gems by maintenance, API fit, security and compatibility; a favorite should be explained with a real project example.

**Source references**

- SRC-00173 — [five.txt:60–60](../ruby/five.txt) · [complete source](sources/five.md)
- SRC-00684 — [sixteen.txt:319–322](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00684 (sixteen.txt)</summary>

**Original prompt:** What are rubygems?  Any favorites not including rails?  Any that you've worked on personally?

**Answer:** A gem packages Ruby code and metadata so it can be distributed, versioned and installed with RubyGems/Bundler.

Rails itself is composed of gems. Evaluate maintenance, licensing, compatibility and necessity before adding a dependency. No gem is essential for every project, and personal-favorite questions should be answered from actual experience.

```bash
gem install bundler
# In an application use its bundle:
bundle add rspec-rails
```

</details>


---

<a id="a-0299"></a>

### A-0299 — What are the different types of gems in Ruby?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What are the different types of gems in Ruby?

**Direct answer**

Gems are packages categorized informally by purpose, such as runtime, test, development, adapters and API clients; Bundler groups control where dependencies are used.

**Detailed explanation**

Gems are packages categorized informally by purpose, such as runtime, test, development, adapters and API clients; Bundler groups control where dependencies are used. These are not formal RubyGems package types. Source version pins illustrate syntax and are not a supported-version recommendation. active_support is a require path; the package is activesupport.

**Practical example**

```ruby
source "https://rubygems.org"
gem "rake"
group :test do
  gem "rspec"
end
```

**Important points and follow-ups**

- Commit application lockfiles. A dependency solver can report incompatible constraints; Bundler cannot guarantee no future security or compatibility problems.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- These are not formal RubyGems package types. Source version pins illustrate syntax and are not a supported-version recommendation. active_support is a require path; the package is activesupport.

**Source references**

- SRC-00205 — [six.txt:2737–2828](../ruby/six.txt) (Q29) · [complete source](sources/six.md)


---

<a id="a-0300"></a>

### A-0300 — What is a gemset?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is a gemset?

**Direct answer**

A gem packages Ruby code and metadata so it can be distributed, versioned and installed with RubyGems/Bundler.

**Detailed explanation**

Rails itself is composed of gems. Evaluate maintenance, licensing, compatibility and necessity before adding a dependency. No gem is essential for every project, and personal-favorite questions should be answered from actual experience.

**Practical example**

```bash
gem install bundler
# In an application use its bundle:
bundle add rspec-rails
```

**Important points and follow-ups**

- All original multiple-choice options are preserved in sourceAnswer.

**Source references**

- SRC-01387 — [twentytwo.txt:441–451](../ruby/twentytwo.txt) · [complete source](sources/twentytwo.md)


---

<a id="a-0301"></a>

### A-0301 — What is the purpose of the Gemfile in a Rails application?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 2

**Interview question**

What is the purpose of the Gemfile in a Rails application?

**Direct answer**

A gem packages Ruby code and metadata. Bundler resolves dependencies declared in a Gemfile and records selected versions in Gemfile.lock; bundle exec selects that bundle when running a command.

**Detailed explanation**

Declare direct dependencies and constraints intentionally, install with bundle install and update selected dependencies with testing. Commit the application lockfile for reproducible development and CI installations. RubyGems supplies gem installation and distribution, while Bundler selects a consistent dependency set for a project; a gem need not be installed globally or published publicly.

**Practical example**

```ruby
# Gemfile
source "https://rubygems.org"
gem "rack"
# shell: bundle install
# shell: bundle exec ruby app.rb
```

**Important points and follow-ups**

- Example version pins in old articles are historical, not current upgrade recommendations.
- Reference: https://bundler.io/guides/using_bundler_in_applications.html

**Source references**

- SRC-00402 — [ten.txt:167–169](../ruby/ten.txt) (31) · [complete source](sources/ten.md)
- SRC-01056 — [thirtysix.txt:131–158](../ruby/thirtysix.txt) (4) · [complete source](sources/thirtysix.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01056 (thirtysix.txt)</summary>

**Original prompt:** What is the purpose of the Gemfile in a Rails application?

**Answer:** Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.

Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.

```bash
bundle add pagy
bundle install
# Gemfile:
gem "pg", "~> 1.5"
```

</details>


---

<a id="a-0302"></a>

### A-0302 — Create a model called User with validations for name (presence) and email (format).

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Create a model called User with validations for name (presence) and email (format).

**Direct answer**

Add presence validation for name and format validation for email using a chosen application-appropriate format rule.

**Detailed explanation**

URI::MailTo::EMAIL_REGEXP is a useful basic format check but does not prove ownership, deliverability or full international address support. If email is required add presence too; a database uniqueness constraint and account-normalization policy are separate requirements.

**Practical example**

```ruby
require "uri"
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
```

**Important points and follow-ups**

- Confirm addresses through an ownership-verification flow when required.

**Source references**

- SRC-00416 — [ten.txt:287–294](../ruby/ten.txt) (45) · [complete source](sources/ten.md)


---

<a id="a-0303"></a>

### A-0303 — How can I improve my problem-solving skills in Ruby for interviews?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How can I improve my problem-solving skills in Ruby for interviews?

**Direct answer**

Solve varied problems, trace your code manually, test failure cases and compare alternative implementations after finishing.

**Detailed explanation**

Keep a mistake log and revisit problems with a changed constraint. Explain time and space costs in terms of actual Ruby operations, including substring/array allocations.

**Practical example**

```text
Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.
```

**Important points and follow-ups**

- Preparation advice is a recommendation, not a language guarantee.

**Corrections and source limitations**

- Incomplete source: this FAQ prompt has no captured answer; an original study recommendation is supplied.

**Source references**

- SRC-00240 — [seven.txt:411–413](../ruby/seven.txt) (FAQ4) · [complete source](sources/seven.md)


---

<a id="a-0304"></a>

### A-0304 — How do conditionals work, including unless and modifier form?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do conditionals work, including unless and modifier form?

**Direct answer**

if/elsif/else and unless choose branches based on truthiness; their expressions return the selected branch’s value, or nil when no branch matches.

**Detailed explanation**

Modifier forms put a simple condition after the expression. Only nil and false are falsy. Use case/when for several pattern-based alternatives and clarify the distinction from structural case/in matching.

**Practical example**

```ruby
score = 95
grade = if score >= 90
  "A"
else
  "B"
end
p grade # "A"
puts "not ready" unless false
```

**Important points and follow-ups**

- Avoid complicated negative conditions in unless, particularly with else.

**Source references**

- SRC-00515 — [nineteen.txt:315–331](../ruby/nineteen.txt) (14) · [complete source](sources/nineteen.md)


---

<a id="a-0305"></a>

### A-0305 — How do I prepare for a Ruby coding interview?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do I prepare for a Ruby coding interview?

**Direct answer**

Practice timed small coding problems while explaining assumptions, invariants, complexity and edge cases aloud.

**Detailed explanation**

Implement a correct baseline, verify it with examples, then optimize a measured bottleneck. Review actual Ruby return values and mutation behavior instead of only memorizing algorithm names.

**Practical example**

```text
Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.
```

**Important points and follow-ups**

- Preparation advice is a recommendation, not a language guarantee.

**Corrections and source limitations**

- Incomplete source: this FAQ prompt has no captured answer; an original study recommendation is supplied.

**Source references**

- SRC-00238 — [seven.txt:405–407](../ruby/seven.txt) (FAQ2) · [complete source](sources/seven.md)


---

<a id="a-0306"></a>

### A-0306 — What are some advanced Ruby interview topics I should be aware of?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What are some advanced Ruby interview topics I should be aware of?

**Direct answer**

Advanced preparation includes lookup order, singleton classes, metaprogramming, GC/allocation behavior, concurrency and production performance.

**Detailed explanation**

Connect internals to real debugging or design decisions rather than reciting implementation trivia. Ruby runtime and Rails version affect available tools.

**Practical example**

```text
Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.
```

**Important points and follow-ups**

- Preparation advice is a recommendation, not a language guarantee.

**Corrections and source limitations**

- Incomplete source: this FAQ prompt has no captured answer; an original study recommendation is supplied.

**Source references**

- SRC-00241 — [seven.txt:414–417](../ruby/seven.txt) (FAQ5) · [complete source](sources/seven.md)


---

<a id="a-0307"></a>

### A-0307 — What are the most common Ruby interview questions?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What are the most common Ruby interview questions?

**Direct answer**

Focus on Ruby’s object model, truthiness, collections, methods, blocks/procs/lambdas, modules, exceptions and practical Rails/database behavior.

**Detailed explanation**

Practice each concept with a small executable example and a follow-up edge case. Interview frequency depends on the role; no list guarantees coverage.

**Practical example**

```text
Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.
```

**Important points and follow-ups**

- Preparation advice is a recommendation, not a language guarantee.

**Source references**

- SRC-00237 — [seven.txt:401–404](../ruby/seven.txt) (FAQ1) · [complete source](sources/seven.md)


---

<a id="a-0308"></a>

### A-0308 — What Ruby concepts should I focus on for technical interviews?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What Ruby concepts should I focus on for technical interviews?

**Direct answer**

Prioritize objects, local versus instance state, Enumerable, block semantics, exception handling and safe database/web interactions.

**Detailed explanation**

For a Rails role add routing, Active Record associations and SQL, authorization, jobs, tests and production debugging. Use the job description to set depth.

**Practical example**

```text
Example exercise: predict and verify the result of [1, 2].map { |n| puts n }.
```

**Important points and follow-ups**

- Preparation advice is a recommendation, not a language guarantee.

**Corrections and source limitations**

- Incomplete source: this FAQ prompt has no captured answer; an original study recommendation is supplied.

**Source references**

- SRC-00239 — [seven.txt:408–410](../ruby/seven.txt) (FAQ3) · [complete source](sources/seven.md)


---

<a id="a-0309"></a>

### A-0309 — case MCQ 6 The expression specified by the when clause is evaluated as the left operand. If no when clauses match, case executes the code of the else clause.

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[case MCQ 6] The expression specified by the when clause is evaluated as the left operand. If no when clauses match, case executes the code of the else clause.

**Direct answer**

a) True.

**Detailed explanation**

A target case tests when_expression === target in order and runs else only if none match.

**Practical example**

```text
p((1..3) === 2) # true
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00585 — [twentyone.txt:261–265](../ruby/twentyone.txt) (case-6) · [complete source](sources/twentyone.md)


---

<a id="a-0310"></a>

### A-0310 — comparison MCQ 3 What will the following code evaluate to?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[comparison MCQ 3] What will the following code evaluate to?

**Direct answer**

a) true.

**Detailed explanation**

9 != 10 evaluates to true, and that Boolean is assigned to a.

**Practical example**

```text
a=9!=10
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00592 — [twentyone.txt:341–350](../ruby/twentyone.txt) (comparison-3) · [complete source](sources/twentyone.md)


---

<a id="a-0311"></a>

### A-0311 — operator MCQ 4 What will the following expression evaluate to?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[operator MCQ 4] What will the following expression evaluate to?

**Direct answer**

b) false.

**Detailed explanation**

The first operand is truthy, so the second operand false is evaluated and returned.

**Practical example**

```text
true && false
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00603 — [twentyone.txt:464–471](../ruby/twentyone.txt) (operator-4) · [complete source](sources/twentyone.md)


---

<a id="a-0312"></a>

### A-0312 — operator MCQ 6 What will the following expression evaluate to?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[operator MCQ 6] What will the following expression evaluate to?

**Direct answer**

a) true.

**Detailed explanation**

The left operand is already true, so || returns it and skips evaluation of the right operand.

**Practical example**

```text
true || false
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00605 — [twentyone.txt:483–490](../ruby/twentyone.txt) (operator-6) · [complete source](sources/twentyone.md)


---

<a id="a-0313"></a>

### A-0313 — operator MCQ 7 What will the following expression evaluate to?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[operator MCQ 7] What will the following expression evaluate to?

**Direct answer**

b) false.

**Detailed explanation**

true&&false is false and !true is false; false||false is false.

**Practical example**

```text
(true && false) || (!true)
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00606 — [twentyone.txt:491–498](../ruby/twentyone.txt) (operator-7) · [complete source](sources/twentyone.md)


---

<a id="a-0314"></a>

### A-0314 — operator MCQ 8 What will the following expression evaluate to?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

[operator MCQ 8] What will the following expression evaluate to?

**Direct answer**

b) false.

**Detailed explanation**

!true is false; && short-circuits immediately.

**Practical example**

```text
!true && !false
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00607 — [twentyone.txt:499–506](../ruby/twentyone.txt) (operator-8) · [complete source](sources/twentyone.md)


---

<a id="a-0315"></a>

### A-0315 — Describe the purpose of the 'prepend' method in Ruby and how it affects method lookup.

**Difficulty:** Advanced · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

Describe the purpose of the 'prepend' method in Ruby and how it affects method lookup.

**Direct answer**

prepend inserts a module before the class in method lookup, allowing wrappers to run first and call super to continue into the original implementation.

**Detailed explanation**

The prepend method in Ruby is used to add a module to the inheritance chain of a class. However, it inserts the module at a higher priority than the class itself. This means that methods defined in the prepended module take precedence over methods with the same name in the class.

This is useful for injecting behaviors into a class without completely overriding its existing methods. The prepended module's methods are called before those of the class during method lookup.

**Practical example**

```ruby
module Trace
  def call; [:before, super]; end
end
class Service
  def call; :result; end
  prepend Trace
end
p Service.new.call
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00056 — [first.txt:351–355](../ruby/first.txt) (26) · [complete source](sources/first.md)


---

<a id="a-0316"></a>

### A-0316 — Explain Confusion between include and extend.

**Difficulty:** Intermediate · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

Explain Confusion between include and extend.

**Direct answer**

include adds a module’s instance methods to a class’s instances; extend adds them as singleton methods on the receiver. prepend inserts a module before the receiving class in method lookup.

**Detailed explanation**

A class is also an object, so extending a class creates what are commonly called class methods. Extending an ordinary object affects just that object. With prepend, a wrapper can call super to continue into the original implementation. Examine ancestors or singleton_class.ancestors to see the actual lookup chain.

**Practical example**

```ruby
module Greeting
  def hello = "hello"
end
class User
  include Greeting
  extend Greeting
end
p User.hello
p User.new.hello
```

**Important points and follow-ups**

- extend does not inherently mean “class only”: it works on ordinary objects too.
- super follows the lookup chain, including mixins.

**Source references**

- SRC-00455 — [thirteen.txt:222–248](../ruby/thirteen.txt) (concept-16) · [complete source](sources/thirteen.md)


---

<a id="a-0317"></a>

### A-0317 — Explain the use of 'require' and 'include' in Ruby.

**Difficulty:** Intermediate · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

Explain the use of 'require' and 'include' in Ruby.

**Direct answer**

require loads code; include mixes a module’s instance methods into a class or another module. These are different operations and neither replaces the other.

**Detailed explanation**

require may run wherever a library is needed and searches configured load paths; require_relative is useful for nearby files. include alters the receiver’s ancestry and works with modules, not arbitrary classes. First load the module definition if needed, then include it into the intended receiver.

**Practical example**

```ruby
require_relative "greetable"
class User
  include Greetable
end
```

**Important points and follow-ups**

- Repeated require normally skips an already loaded feature.

**Source references**

- SRC-00620 — [twentyfour.txt:203–235](../ruby/twentyfour.txt) (6) · [complete source](sources/twentyfour.md)


---

<a id="a-0318"></a>

### A-0318 — How can you include a module in a class in Ruby?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

How can you include a module in a class in Ruby?

**Direct answer**

include places module instance methods in the receiving class’s instance-method lookup chain. extend makes module instance methods singleton methods of the receiver.

**Detailed explanation**

In Ruby, you can include a module in a class using the include keyword followed by the module name. This is known as a mixin. When a module is included in a class, the methods, constants, and other definitions from the module are mixed into that class.

When a module is included in a class, the module's methods are added as instance methods in the class. If you want to add the module's methods as class methods, you can use the extend keyword instead of include.

Including modules in classes is a way to share behavior among multiple classes without using inheritance. This is particularly useful in Ruby, which only supports single inheritance (a class can only inherit from one superclass).

**Practical example**

```ruby
module Greeting
  def hello; "hello"; end
end
class Person; include Greeting; end
p Person.new.hello
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00028 — [first.txt:199–205](../ruby/first.txt) (28) · [complete source](sources/first.md)


---

<a id="a-0319"></a>

### A-0319 — How do you define and use a singleton method in Ruby?

**Difficulty:** Advanced · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

How do you define and use a singleton method in Ruby?

**Direct answer**

A singleton method belongs to one object instead of all instances of its class. Define it with def object.method or define_singleton_method.

**Detailed explanation**

A singleton method belongs to one object instead of all instances of its class. Define it with def object.method or define_singleton_method.

**Practical example**

```ruby
str = +"Hello"
def str.shout
  upcase + "!!!"
end
p str.shout # "HELLO!!!"
```

**Important points and follow-ups**

- attr_accessor is provided by Module; describing it as necessarily a user class’s singleton method is inaccurate.
- Some immutable immediate values restrict singleton methods.

**Source references**

- SRC-00160 — [four.txt:89–100](../ruby/four.txt) (9) · [complete source](sources/four.md)


---

<a id="a-0320"></a>

### A-0320 — What are instance_eval, class_eval, and instance_exec used for?

**Difficulty:** Advanced · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What are instance_eval, class_eval, and instance_exec used for?

**Direct answer**

instance_eval runs with an object as self; class_eval/module_eval target a class/module context; instance_exec also supplies arguments to the block.

**Detailed explanation**

These support small DSLs and dynamic method definitions. Block forms retain lexical constant lookup, while string evaluation has additional parsing/context behavior and is unsafe with untrusted text. instance_eval does not mean that every def inside it adds ordinary instance methods to the object’s class.

**Practical example**

```ruby
object = Object.new
object.instance_exec(3) { |n| @count = n }
p object.instance_variable_get(:@count) # 3
```

**Important points and follow-ups**

- Prefer a normal explicit API when changing evaluation context makes the code harder to understand.

**Source references**

- SRC-00549 — [nineteen.txt:899–914](../ruby/nineteen.txt) (48) · [complete source](sources/nineteen.md)


---

<a id="a-0321"></a>

### A-0321 — What are refinements and when do they beat monkey patching?

**Difficulty:** Advanced · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What are refinements and when do they beat monkey patching?

**Direct answer**

Refinements provide lexical method changes activated with using, limiting the reach of a patch compared with reopening a global core class.

**Detailed explanation**

Define refine inside a module, then activate it in an allowed lexical scope. Activation affects code defined in that scope rather than being a dynamic switch on every call stack. This can avoid global collisions, but lookup nuances and library interoperability should be understood.

**Practical example**

```ruby
module Shouting
  refine String do
    def shout = upcase + "!"
  end
end
using Shouting
p "hi".shout # "HI!"
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/syntax/refinements_rdoc.html

**Source references**

- SRC-00548 — [nineteen.txt:883–898](../ruby/nineteen.txt) (47) · [complete source](sources/nineteen.md)


---

<a id="a-0322"></a>

### A-0322 — What is the difference between _extend_ and _include_?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between _extend_ and _include_?

**Direct answer**

include adds module methods to a class’s instance lookup chain; extend adds them to one object’s singleton class, which is how it can create class methods.

**Detailed explanation**

include adds module methods to a class’s instance lookup chain; extend adds them to one object’s singleton class, which is how it can create class methods.

**Practical example**

```ruby
module Hello
  def hi; :hi; end
end
obj = Object.new; obj.extend(Hello)
p obj.hi
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00164 — [five.txt:11–17](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="a-0323"></a>

### A-0323 — What is the difference between `extend` and `include` in ruby?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between `extend` and `include` in ruby?

**Direct answer**

include supplies instance methods to a class/module’s descendants; extend adds module methods to one receiver’s singleton class. A class is simply one possible receiver.

**Detailed explanation**

- 
`include` mixes in specified module methods as instance methods in the target class

- 
`extend` mixes in specified module methods as class methods in the target class



Given the following class definitions:



```ruby
module ReusableModule
  def module_method
    puts "Module Method: Hi there! I'm a module method"
  end
end

class ClassThatIncludes
  include ReusableModule
end
class ClassThatExtends
  extend ReusableModule
end

```


Here’s how `ClassThatIncludes` behaves:



```ruby
# A class method does not exist
>> ClassThatIncludes.module_method
NoMethodError: undefined method `module_method' for ClassThatIncludes:Class

# A valid instance method exists
>> ClassThatIncludes.new.module_method
Module Method: Hi there! I'm a module method
=> nil

```


Here’s how `ClassThatExtends` behaves:



```ruby
# A valid class method exists
>> ClassThatExtends.module_method
Module Method: Hi there! I'm a module method
=> nil

# An instance method does not exist
ClassThatExtends.new.module_method
NoMethodError: undefined method `module_method' for #<ClassThatExtends:0x007ffa1e0317e8>

```


We should mention that `object.extend ExampleModule` makes `ExampleModule` methods available as singleton methods in the object.

**Practical example**

```ruby
module Hello
  def hi; :hi; end
end
obj = Object.new
obj.extend(Hello)
p obj.hi
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00120 — [second.txt:398–447](../ruby/second.txt) (Q20) · [complete source](sources/second.md)


---

<a id="a-0324"></a>

### A-0324 — What is the difference between class_eval and instance_eval in Ruby?

**Difficulty:** Advanced · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between class_eval and instance_eval in Ruby?

**Direct answer**

class_eval/module_eval reopens the receiving class/module context; def inside defines instance methods. instance_eval changes self and def adds singleton methods to that object.

**Detailed explanation**

class_eval/module_eval reopens the receiving class/module context; def inside defines instance methods. instance_eval changes self and def adds singleton methods to that object. The source reverses the usual method-definition distinction and wrongly calls Person.new.instance_method after defining it on Person’s singleton class.

**Practical example**

```ruby
class Person; end
Person.class_eval { def greet; "instance"; end }
Person.instance_eval { def kind; "class object"; end }
p [Person.new.greet, Person.kind]
```

**Important points and follow-ups**

- define_method is private in some contexts; class_eval { define_method(...) } is an explicit alternative. Avoid global patches without a documented compatibility need.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- The source reverses the usual method-definition distinction and wrongly calls Person.new.instance_method after defining it on Person’s singleton class.

**Source references**

- SRC-00203 — [six.txt:2557–2667](../ruby/six.txt) (Q27) · [complete source](sources/six.md)


---

<a id="a-0325"></a>

### A-0325 — What is the difference between extend and include in ruby?

**Difficulty:** Intermediate · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between extend and include in ruby?

**Direct answer**

include adds a module’s instance methods to a class’s instances; extend adds them as singleton methods on the receiver. prepend inserts a module before the receiving class in method lookup.

**Detailed explanation**

A class is also an object, so extending a class creates what are commonly called class methods. Extending an ordinary object affects just that object. With prepend, a wrapper can call super to continue into the original implementation. Examine ancestors or singleton_class.ancestors to see the actual lookup chain.

**Practical example**

```ruby
module Greeting
  def hello = "hello"
end
class User
  include Greeting
  extend Greeting
end
p User.hello
p User.new.hello
```

**Important points and follow-ups**

- extend does not inherently mean “class only”: it works on ordinary objects too.
- super follows the lookup chain, including mixins.

**Source references**

- SRC-00367 — [nine.txt:775–786](../ruby/nine.txt) (96) · [complete source](sources/nine.md)


---

<a id="a-0326"></a>

### A-0326 — What is the difference between include and extend in Ruby?

**Difficulty:** Intermediate · **Topic:** Object model and metaprogramming · **Source occurrences:** 3

**Interview question**

What is the difference between include and extend in Ruby?

**Direct answer**

include adds a module’s instance methods to a class’s instances; extend adds them as singleton methods on the receiver. prepend inserts a module before the receiving class in method lookup.

**Detailed explanation**

A class is also an object, so extending a class creates what are commonly called class methods. Extending an ordinary object affects just that object. With prepend, a wrapper can call super to continue into the original implementation. Examine ancestors or singleton_class.ancestors to see the actual lookup chain.

**Practical example**

```ruby
module Greeting
  def hello = "hello"
end
class User
  include Greeting
  extend Greeting
end
p User.hello
p User.new.hello
```

**Important points and follow-ups**

- extend does not inherently mean “class only”: it works on ordinary objects too.
- super follows the lookup chain, including mixins.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Source references**

- SRC-00181 — [six.txt:374–490](../ruby/six.txt) (Q5) · [complete source](sources/six.md)
- SRC-00235 — [seven.txt:336–353](../ruby/seven.txt) (19) · [complete source](sources/seven.md)
- SRC-00253 — [eight.txt:128–144](../ruby/eight.txt) (Mid-02) · [complete source](sources/eight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00181 (six.txt)</summary>

**Original prompt:** What is the difference between include and extend in Ruby?

**Answer:** include places module instance methods in the receiving class’s instance-method lookup chain. extend makes module instance methods singleton methods of the receiver.

In Ruby, you can include a module in a class using the include keyword followed by the module name. This is known as a mixin. When a module is included in a class, the methods, constants, and other definitions from the module are mixed into that class.

When a module is included in a class, the module's methods are added as instance methods in the class. If you want to add the module's methods as class methods, you can use the extend keyword instead of include.

Including modules in classes is a way to share behavior among multiple classes without using inheritance. This is particularly useful in Ruby, which only supports single inheritance (a class can only inherit from one superclass).

```ruby
module Greeting
  def hello; "hello"; end
end
class Person; include Greeting; end
p Person.new.hello
```

</details>


---

<a id="a-0327"></a>

### A-0327 — What is the difference between include, extend, and prepend?

**Difficulty:** Intermediate · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between include, extend, and prepend?

**Direct answer**

include adds a module’s instance methods to a class’s instances; extend adds them as singleton methods on the receiver. prepend inserts a module before the receiving class in method lookup.

**Detailed explanation**

A class is also an object, so extending a class creates what are commonly called class methods. Extending an ordinary object affects just that object. With prepend, a wrapper can call super to continue into the original implementation. Examine ancestors or singleton_class.ancestors to see the actual lookup chain.

**Practical example**

```ruby
module Greeting
  def hello = "hello"
end
class User
  include Greeting
  extend Greeting
end
p User.hello
p User.new.hello
```

**Important points and follow-ups**

- extend does not inherently mean “class only”: it works on ordinary objects too.
- super follows the lookup chain, including mixins.

**Source references**

- SRC-00525 — [nineteen.txt:473–494](../ruby/nineteen.txt) (24) · [complete source](sources/nineteen.md)


---

<a id="a-0328"></a>

### A-0328 — How does concurrency work in Ruby, and what is the GIL?

**Difficulty:** Advanced · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How does concurrency work in Ruby, and what is the GIL?

**Direct answer**

In ordinary CRuby threads, the Global VM Lock limits simultaneous execution of Ruby code, while blocking I/O can release it. Threads are useful for I/O concurrency; CPU parallelism may require processes, suitable Ractors or another runtime.

**Detailed explanation**

JRuby and TruffleRuby have different threading implementations, and native extensions may release the lock for computation. Fibers provide cooperative scheduling, optionally through a scheduler, but do not themselves imply CPU parallelism. Pick the runtime and model from measured workload and library support, and do not treat the GVL as protection for application-level invariants.

**Practical example**

```ruby
require "thread"
queue = Queue.new
workers = 2.times.map { Thread.new { queue << :done } }
workers.each(&:join)
2.times { p queue.pop }
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/3.4/Thread.html

**Source references**

- SRC-00545 — [nineteen.txt:842–853](../ruby/nineteen.txt) (44) · [complete source](sources/nineteen.md)


---

<a id="a-0329"></a>

### A-0329 — How is the Ruby community addressing concerns about the performance of web frameworks compared to other languages?

**Difficulty:** Beginner · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How is the Ruby community addressing concerns about the performance of web frameworks compared to other languages?

**Direct answer**

Use profiling, runtime/JIT improvements, efficient queries, caching and suitable implementations to improve measured workloads. There is no universal fastest web framework.

**Detailed explanation**

The Ruby community is addressing performance concerns through optimizations in Ruby's core, adopting JIT compilation, and improving the performance of popular frameworks like Ruby on Rails. Tools like 'JRuby' (Ruby on the Java Virtual Machine) and 'TruffleRuby' aim to enhance Ruby's performance, making it more competitive in web development.

**Practical example**

```text
# Scenario: compare p95 latency, SQL time, CPU and allocation counts before and after a targeted change.
```

**Important points and follow-ups**

- JRuby/TruffleRuby compatibility and startup tradeoffs should be tested; framework rankings alone are insufficient.

**Source references**

- SRC-00085 — [first.txt:495–497](../ruby/first.txt) (25) · [complete source](sources/first.md)


---

<a id="a-0330"></a>

### A-0330 — Explain the potential role of Ruby in the future of augmented reality (AR) and virtual reality (VR) technologies.

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

Explain the potential role of Ruby in the future of augmented reality (AR) and virtual reality (VR) technologies.

**Direct answer**

Ruby may provide backend/content services for AR/VR, but the source gives no verified engine support or future adoption evidence.

**Detailed explanation**

Ruby may provide backend/content services for AR/VR, but the source gives no verified engine support or future adoption evidence. Rendering loops and device SDK support require separate platform-specific evaluation.

**Practical example**

```text
# Scenario: Rails manages user accounts and content metadata for a client built with an AR engine.
```

**Important points and follow-ups**

- Rendering loops and device SDK support require separate platform-specific evaluation.

**Corrections and source limitations**

- The source provides qualitative/speculative ecosystem claims without evidence. The answer distinguishes possible use from established language behavior.

**Source references**

- SRC-00087 — [first.txt:501–503](../ruby/first.txt) (27) · [complete source](sources/first.md)


---

<a id="a-0331"></a>

### A-0331 — What exactly are Harnesses and Fixtures in the Ruby?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What exactly are Harnesses and Fixtures in the Ruby?

**Direct answer**

A test harness runs tests and reports results; fixtures supply reproducible test data, commonly from YAML in Rails.

**Detailed explanation**

Fixtures and factories are alternative ways of preparing model state. Keep data small and relevant, avoid order-dependent shared state, and make important scenario setup visible. A fixture is not simply every kind of supporting test code.

**Practical example**

```ruby
# test/fixtures/users.yml
ada:
  name: Ada
# In a Rails test:
user = users(:ada)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00714 — [thirty.txt:118–120](../ruby/thirty.txt) (30) · [complete source](sources/thirty.md)


---

<a id="a-0332"></a>

### A-0332 — What is RSpec and how is it used for testing in Ruby?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What is RSpec and how is it used for testing in Ruby?

**Direct answer**

RSpec provides examples, expectations, matchers and hooks to describe Ruby behavior; rspec-rails supplies Rails integrations.

**Detailed explanation**

RSpec is a widely used testing framework in the Ruby ecosystem. It provides a domain-specific language (DSL) for writing human-readable tests in a behavior-driven development (BDD) style. RSpec enables developers to define expectations about how code should behave and allows for clear documentation of desired functionality. Its powerful matches and hooks simplify the process of testing Ruby code and ensure more robust and maintainable applications.

**Practical example**

```ruby
RSpec.describe "multiplication" do
  it("doubles") { expect(3 * 2).to eq(6) }
end
```

**Important points and follow-ups**

- Prefer observable behavior and realistic failure cases; avoid brittle implementation-detail mocks.

**Source references**

- SRC-00069 — [first.txt:431–433](../ruby/first.txt) (9) · [complete source](sources/first.md)


---

<a id="a-0333"></a>

### A-0333 — comparison MCQ 2 The ‘=’ is used for assigning value to variable?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

[comparison MCQ 2] The ‘=’ is used for assigning value to variable?

**Direct answer**

a) True.

**Detailed explanation**

= assigns a value; it does not test equality. Use == for an ordinary value-equality comparison.

**Practical example**

```ruby
value = 9
p value # 9
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00591 — [twentyone.txt:336–340](../ruby/twentyone.txt) (comparison-2) · [complete source](sources/twentyone.md)


---

<a id="a-0334"></a>

### A-0334 — operator MCQ 1 Boolean opeartors are also known as logical operators.

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

[operator MCQ 1] Boolean opeartors are also known as logical operators.

**Direct answer**

a) True in the source’s terminology.

**Detailed explanation**

Logical operators combine or negate truthiness; Ruby’s && and || return selected operand values rather than necessarily Booleans.

**Practical example**

```ruby
p true && false # false
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00600 — [twentyone.txt:446–450](../ruby/twentyone.txt) (operator-1) · [complete source](sources/twentyone.md)


---

<a id="a-0335"></a>

### A-0335 — operator MCQ 2 Which of the following is a valid boolean operator?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

[operator MCQ 2] Which of the following is a valid boolean operator?

**Direct answer**

d) All of the mentioned.

**Detailed explanation**

Ruby supports &&/and, ||/or and !/not, but each pair has different precedence, so the spellings are not blindly interchangeable.

**Practical example**

```ruby
p [true && true, false || true, !false] # [true, true, true]
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00601 — [twentyone.txt:451–457](../ruby/twentyone.txt) (operator-2) · [complete source](sources/twentyone.md)


---

<a id="a-0336"></a>

### A-0336 — operator MCQ 3 The boolean operator && only result in true when both the values are true?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

[operator MCQ 3] The boolean operator && only result in true when both the values are true?

**Direct answer**

a) True for inputs restricted to the Boolean objects true and false; the unrestricted Ruby claim needs qualification.

**Detailed explanation**

&& returns its first falsy operand or its last evaluated operand. For example 1 && 2 returns 2, not true. It expresses logical conjunction of truthiness without converting results into Booleans.

**Practical example**

```ruby
p 1 && 2 # 2, not literal true
```

**Important points and follow-ups**

- All original answer options are retained in sourceAnswer.
- This answer is independently derived; the source only says “View Answer” and includes no visible key.
- Reference: https://docs.ruby-lang.org/en/3.4/syntax/control_expressions_rdoc.html

**Corrections and source limitations**

- Incomplete source: hidden answer key/rationale was not captured; a derived answer is supplied.

**Source references**

- SRC-00602 — [twentyone.txt:458–463](../ruby/twentyone.txt) (operator-3) · [complete source](sources/twentyone.md)


---

<a id="a-0337"></a>

### A-0337 — Differentiate between local variables and instance variables.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Differentiate between local variables and instance variables.

**Direct answer**

A local variable belongs to its lexical scope. An instance variable such as @name belongs to whichever object is self and can be used by that object’s methods.

**Detailed explanation**

Local variables in Ruby are variables that are defined within a method or a block. They are confined to the scope in which they are declared and are not accessible outside of it. This means that if you define a local variable inside a method, it cannot be accessed outside of that method.

On the other hand, instance variables, denoted with an '@' prefix, belong to a specific instance of a class. They enable data persistence and access across different methods within that instance. This means that the value of an instance variable persists as long as the object instance exists.

**Practical example**

```ruby
class Person
  def initialize(name); @name = name; end
  def name; @name; end
end
p Person.new("Ana").name
```

**Important points and follow-ups**

- Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil.

**Source references**

- SRC-00002 — [first.txt:8–12](../ruby/first.txt) (2) · [complete source](sources/first.md)


---

<a id="a-0338"></a>

### A-0338 — Explain Concatenating Strings / Strings are Mutable in Ruby.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain Concatenating Strings / Strings are Mutable in Ruby.

**Direct answer**

Use + for a new String, << or concat to append in place, and interpolation or join to construct text from values.

**Detailed explanation**

+= rebinds the variable to the result of +; it is not in-place String mutation. Adjacent literal strings can be concatenated by Ruby’s parser, but placing two arbitrary String variables next to each other is not a general concatenation operation.

**Practical example**

```ruby
text = +"Hello, "
other = text + "Ruby!"
p text # "Hello, "
text << "Ruby!"
p text # "Hello, Ruby!"
```

**Important points and follow-ups**

- Repeated immutable concatenation can allocate more objects; measure important paths.

**Source references**

- SRC-00454 — [thirteen.txt:204–221](../ruby/thirteen.txt) (concept-15) · [complete source](sources/thirteen.md)


---

<a id="a-0339"></a>

### A-0339 — Explain Not Using Instance Variables Correctly.

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain Not Using Instance Variables Correctly.

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Source references**

- SRC-00451 — [thirteen.txt:140–159](../ruby/thirteen.txt) (concept-12) · [complete source](sources/thirteen.md)


---

<a id="a-0340"></a>

### A-0340 — Explain Ruby hashes?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain Ruby hashes?

**Direct answer**

Hash maps keys to values and preserves insertion order. Keys normally use hash and eql? to determine equality.

**Detailed explanation**

A missing [] lookup returns the configured default, nil by default; a Hash may instead have a custom value or default proc. fetch is appropriate when missing data should raise. Keep keys stable after insertion and avoid shared mutable default values.

**Practical example**

```ruby
counts = Hash.new(0)
counts[:ruby] += 1
p counts[:missing] # 0
p({ name: "Asha" }.fetch(:name))
```

**Important points and follow-ups**

- A stored nil can be distinguished from absence using key?.

**Source references**

- SRC-00304 — [nine.txt:225–230](../ruby/nine.txt) (33) · [complete source](sources/nine.md)


---

<a id="a-0341"></a>

### A-0341 — Explain Ruby ranges. What are the ways to define ranges?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain Ruby ranges. What are the ways to define ranges?

**Direct answer**

Ranges describe intervals: a..b includes b and a...b excludes b. They also support beginless or endless forms in modern Ruby.

**Detailed explanation**

Use ranges for slices, case matching and compatible iteration. A finite-looking interval is not necessarily enumerable: Float ranges, for example, do not support ordinary each in the same way as Integer ranges. cover? checks interval coverage and can differ from include?.

**Practical example**

```ruby
p (1..3).to_a # [1, 2, 3]
p (1...3).to_a # [1, 2]
p (1..10).cover?(4) # true
```

**Important points and follow-ups**

- Avoid materializing a huge range unless the array is actually needed.

**Source references**

- SRC-00306 — [nine.txt:237–247](../ruby/nine.txt) (35) · [complete source](sources/nine.md)


---

<a id="a-0342"></a>

### A-0342 — Explain Ruby strings?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain Ruby strings?

**Direct answer**

A String stores a byte sequence with an associated encoding and provides text and binary manipulation methods.

**Detailed explanation**

Construct strings with literals, String.new, heredocs or conversions. Distinguish length from bytesize for variable-width encodings. Ordinary strings are mutable unless frozen; operations such as + allocate a result while << mutates.

**Practical example**

```ruby
text = "é"
p [text.length, text.bytesize] # [1, 2] in UTF-8
p "ruby".upcase # "RUBY"
```

**Important points and follow-ups**

- Characters, Unicode code points and grapheme clusters are different concepts.

**Source references**

- SRC-00294 — [nine.txt:150–153](../ruby/nine.txt) (23) · [complete source](sources/nine.md)


---

<a id="a-0343"></a>

### A-0343 — Explain the concept of symbols in Ruby.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain the concept of symbols in Ruby.

**Direct answer**

A Symbol is an immutable interned identifier, often used for method names or hash keys; String represents text and is usually mutable.

**Detailed explanation**

Symbols are immutable identifiers. Equal symbol names identify the same interned symbol, while equal strings may be distinct or deduplicated/frozen. Dynamic symbols are eligible for GC. Use symbols for identifiers and strings for text, not an unconditional speed rule.

**Practical example**

```ruby
p :name.equal?(:name) # true
p({name: "Ana"}[:name])
```

**Important points and follow-ups**

- Do not assume all equal string literals allocate different objects: freezing/deduplication changes allocation. Dynamic symbols can be garbage collected.

**Corrections and source limitations**

- Source correction: Symbols are immutable identifiers. Equal symbol names identify the same interned symbol, while equal strings may be distinct or deduplicated/frozen. Dynamic symbols are eligible for GC. Use symbols for identifiers and strings for text, not an unconditional speed rule.

**Source references**

- SRC-00004 — [first.txt:18–24](../ruby/first.txt) (4) · [complete source](sources/first.md)


---

<a id="a-0344"></a>

### A-0344 — Given that the following code has been run:

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Given that the following code has been run:



```ruby
if false
  foo = 'test'
end

```


What will be the value of:




- `defined? foo`

- `defined? bar`

**Direct answer**

defined? foo returns "local-variable" because the parser saw its assignment; foo reads nil. defined? bar returns nil because there is no local declaration or method.

**Detailed explanation**

defined? foo returns "local-variable" because the parser saw its assignment; foo reads nil. defined? bar returns nil because there is no local declaration or method. This is parse-time local-variable recognition, not runtime reading of the skipped branch.

**Practical example**

```ruby
if false
  foo = "test"
end
p [defined?(foo), foo, defined?(bar)]
```

**Important points and follow-ups**

- This is parse-time local-variable recognition, not runtime reading of the skipped branch.
- Verification: https://docs.ruby-lang.org/en/3.4/syntax/assignment_rdoc.html

**Corrections and source limitations**

- Correction/qualification: defined? foo returns "local-variable" because the parser saw its assignment; foo reads nil. defined? bar returns nil because there is no local declaration or method. This is parse-time local-variable recognition, not runtime reading of the skipped branch.

**Source references**

- SRC-00118 — [second.txt:357–377](../ruby/second.txt) (Q18) · [complete source](sources/second.md)


---

<a id="a-0345"></a>

### A-0345 — How and when would you declare a Global Variable?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How and when would you declare a Global Variable?

**Direct answer**

A Ruby global variable starts with $ and is visible across the process.

**Detailed explanation**

Global state makes dependencies and concurrent behavior difficult to reason about. Prefer configuration objects, arguments or dependency injection for application state. Ruby also has special built-in globals with documented semantics.

**Practical example**

```ruby
$feature_enabled = true
# Prefer an explicit settings object in application code.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01184 — [twentyeight.txt:319–321](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="a-0346"></a>

### A-0346 — How are Variables defined in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How are Variables defined in Ruby?

**Direct answer**

Local variables use plain names, instance variables start with @, class variables start with @@, and globals start with $.

**Detailed explanation**

An instance variable belongs to the current object, including a class object. A class-instance variable is different from a class variable: it is not implicitly shared across the class hierarchy. Class variables can be shared through inheritance and cause surprising coupling. Prefer explicit object state and avoid mutable globals.

**Practical example**

```ruby
class Counter
  @count = 0 # class-instance variable
  @@shared = 0 # class variable
  def initialize
    @value = 0 # each Counter instance has its own
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01313 — [twentynine.txt:67–72](../ruby/twentynine.txt) (15) · [complete source](sources/twentynine.md)


---

<a id="a-0347"></a>

### A-0347 — How do keyword arguments work, and how are they different from a hash?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How do keyword arguments work, and how are they different from a hash?

**Direct answer**

Keyword parameters name arguments explicitly and may be required or defaulted. In Ruby 3, positional Hash arguments are separated from declared keyword parameters.

**Detailed explanation**

Use **kwargs to receive/forward keyword pairs and *args for positional arguments. A method taking one positional options hash can still receive keyword-looking syntax as that hash when it declares no keyword parameters. For wrappers use ... or explicit forwarding according to the interface.

**Practical example**

```ruby
def create_user(name:, role: "member")
  { name: name, role: role }
end
p create_user(**{ name: "Asha" })
```

**Important points and follow-ups**

- Do not claim all final hashes and keywords are interchangeable.

**Source references**

- SRC-00536 — [nineteen.txt:661–674](../ruby/nineteen.txt) (35) · [complete source](sources/nineteen.md)


---

<a id="a-0348"></a>

### A-0348 — How do you create an array in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How do you create an array in Ruby?

**Direct answer**

Create an Array using [] or Array.new. Arrays are zero-indexed ordered collections and may hold mixed types.

**Detailed explanation**

In Ruby, an array is an ordered collection of elements. You can create an array by enclosing a comma-separated list of elements in square brackets ([]). For example:

my_array = [1, 2, 3]

In this example, my_array is an array containing three elements: 1, 2, and 3.

Arrays in Ruby are indexed starting from 0, which means the first element is at index 0, the second element is at index 1, and so on. You can access elements in an array by their index:

arrays in ruby.jpeg

In Ruby, arrays can contain elements of different types. This means you can have an array that contains a mix of numbers, strings, and other objects:

mixed_array = [1, "two", :three]

In this example, mixed_array is an array containing a number, a string, and a symbol.

**Practical example**

```ruby
values = [1, "two", :three]
p values[0] # 1
p Array.new(2) { [] }
```

**Important points and follow-ups**

- Array.new(2, []) shares the same nested array; use a block for independent objects.

**Corrections and source limitations**

- Source refers to image-only examples that are not present in the text collection; replacement examples are authored and do not claim to reconstruct those images.

**Source references**

- SRC-00012 — [first.txt:77–93](../ruby/first.txt) (12) · [complete source](sources/first.md)


---

<a id="a-0349"></a>

### A-0349 — How do you remove `nil` values in array using ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How do you remove `nil` values in array using ruby?

**Direct answer**

compact returns a new array with nil removed; compact! mutates the receiver and returns nil if no change was made.

**Detailed explanation**

`Array#compact` removes `nil` values.


Example:



```ruby
>> [nil,123,nil,"test"].compact
=> [123, "test"]

```

**Practical example**

```ruby
p [nil, 0, false, ""].compact # [0, false, ""]
```

**Important points and follow-ups**

- false is retained; compact is not Rails compact_blank.

**Source references**

- SRC-00115 — [second.txt:301–309](../ruby/second.txt) (Q15) · [complete source](sources/second.md)


---

<a id="a-0350"></a>

### A-0350 — How do you remove nil values in array using ruby?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How do you remove nil values in array using ruby?

**Direct answer**

Array#compact returns a new array without nil values; compact! mutates and returns nil if no change was needed.

**Detailed explanation**

It keeps false, zero and empty strings because they are not nil. Use a predicate-based filter when the requirement is broader than removing nil.

**Practical example**

```ruby
p [nil, false, 0, "", 1].compact # [false, 0, "", 1]
```

**Important points and follow-ups**

- compact is not the same as Rails compact_blank.

**Source references**

- SRC-00362 — [nine.txt:716–725](../ruby/nine.txt) (91) · [complete source](sources/nine.md)


---

<a id="a-0351"></a>

### A-0351 — How does string interpolation work in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 2

**Interview question**

How does string interpolation work in Ruby?

**Direct answer**

String interpolation evaluates #{expression} inside a double-quoted or other interpolating string and inserts the result using to_s.

**Detailed explanation**

Use interpolation for readable presentation of variables and expressions. Single-quoted strings preserve #{...} literally. Interpolation is not input escaping: embedding values directly in SQL, HTML or shell commands can introduce injection vulnerabilities, so use the appropriate parameterization or escaping mechanism for those contexts.

**Practical example**

```ruby
name = "Asha"
p "Hello, #{name}: #{2 + 3}" # "Hello, Asha: 5"
p 'Hello, #{name}' # literal characters
```

**Important points and follow-ups**

- Interpolated nil becomes an empty string through nil.to_s.

**Source references**

- SRC-00230 — [seven.txt:251–272](../ruby/seven.txt) (14) · [complete source](sources/seven.md)
- SRC-00507 — [nineteen.txt:191–202](../ruby/nineteen.txt) (6) · [complete source](sources/nineteen.md)


---

<a id="a-0352"></a>

### A-0352 — How is Symbol different from variables?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 3

**Interview question**

How is Symbol different from variables?

**Direct answer**

A variable is a name bound to an object; a Symbol is one kind of object. A variable can hold a symbol and later be reassigned to something else.

**Detailed explanation**

A variable is a name bound to an object; a Symbol is one kind of object. A variable can hold a symbol and later be reassigned to something else. Immutability describes :active, not the status variable.

**Practical example**

```ruby
status = :active
status = :paused
p status
```

**Important points and follow-ups**

- Immutability describes :active, not the status variable.

**Source references**

- SRC-00015 — [first.txt:122–128](../ruby/first.txt) (15) · [complete source](sources/first.md)
- SRC-00693 — [thirty.txt:35–43](../ruby/thirty.txt) (9) · [complete source](sources/thirty.md)
- SRC-01307 — [twentynine.txt:45–47](../ruby/twentynine.txt) (9) · [complete source](sources/twentynine.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00693 (thirty.txt)</summary>

**Original prompt:** Explain how Symbol is different from variables?

**Answer:** A Symbol is a value; a variable is a name bound to a value and can refer to a Symbol, String or any other object.

Reassigning a variable changes its binding without mutating the previously referenced symbol. Symbol immutability does not mean a variable holding a symbol becomes immutable. Avoid describing this as a fixed physical address or claiming dynamically created symbols can never be collected.

```ruby
state = :draft
state = :published # the variable changes; :draft is not mutated
```

</details>


---

<a id="a-0353"></a>

### A-0353 — How would you display a variable from a controller in a Rails view?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

How would you display a variable from a controller in a Rails view?

**Direct answer**

A view turns data prepared for a response into a presentation, commonly HTML using ERB templates.

**Detailed explanation**

Controllers expose instance variables to their view context. ERB <%= ... %> outputs a value and <% ... %> executes Ruby without directly outputting its result. Presentation belongs here; permission decisions and domain invariants still need server-side enforcement.

**Practical example**

```erb
<%# app/views/articles/show.html.erb %>
<h1><%= @article.title %></h1>
```

**Important points and follow-ups**

- Normal ERB output is HTML-escaped; avoid html_safe for untrusted content.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01492 — [twentyseven.txt:401–405](../ruby/twentyseven.txt) (Open-49) · [complete source](sources/twentyseven.md)


---

<a id="a-0354"></a>

### A-0354 — In how many ways items can be added in an array in Ruby?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

In how many ways items can be added in an array in Ruby?

**Direct answer**

Use push or << to append, unshift to prepend and insert to add at a chosen position.

**Detailed explanation**

Appending is typically amortized O(1); prepending/inserting can shift elements and take O(n). concat appends another collection’s elements, while << adds the collection as one nested element.

**Practical example**

```ruby
a = [2]
a.unshift(1)
a << 3
a.insert(1, :middle)
p a # [1, :middle, 2, 3]
```

**Important points and follow-ups**

- Specify whether nested arrays should be appended or flattened one level.

**Source references**

- SRC-00302 — [nine.txt:206–212](../ruby/nine.txt) (31) · [complete source](sources/nine.md)


---

<a id="a-0355"></a>

### A-0355 — In how many ways you can compare Ruby string?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

In how many ways you can compare Ruby string?

**Direct answer**

Compare String values with == or eql?, order them with <=>, or use casecmp/casecmp? for case-insensitive comparison.

**Detailed explanation**

casecmp returns a negative integer, zero, a positive integer or nil when comparison is not possible; it does not just return zero or one. casecmp? returns a Boolean or nil in unsupported cases. Decide whether binary, encoding-aware or domain-specific normalization is required.

**Practical example**

```ruby
p "a" <=> "b"   # -1
p "Ruby".casecmp("ruby") # 0
p "Ruby".casecmp?("ruby") # true
```

**Important points and follow-ups**

- Unicode and locale-sensitive comparison may need explicit normalization.

**Corrections and source limitations**

- Corrected casecmp return-value claim.

**Source references**

- SRC-00299 — [nine.txt:180–186](../ruby/nine.txt) (28) · [complete source](sources/nine.md)


---

<a id="a-0356"></a>

### A-0356 — Not Knowing the Difference Between nil? and empty?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Not Knowing the Difference Between nil? and empty?

**Direct answer**

nil? asks whether the receiver is nil; empty? asks a supported container whether it has no elements.

**Detailed explanation**

An empty Array is not nil, and nil does not implement empty?. nil? does not safely test an arbitrary local that was never defined: evaluating an unknown local/method can raise first. Rails blank? also treats whitespace-only strings and false as blank, with separate Active Support semantics.

**Practical example**

```ruby
p [].nil? # false
p [].empty? # true
p nil.nil? # true
```

**Important points and follow-ups**

- An empty string is still truthy in an if condition.

**Source references**

- SRC-00448 — [thirteen.txt:121–123](../ruby/thirteen.txt) (concept-9) · [complete source](sources/thirteen.md)


---

<a id="a-0357"></a>

### A-0357 — The .upcase and .capitalize method are used for capitalizing the whole string.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

The .upcase and .capitalize method are used for capitalizing the whole string.

**Direct answer**

False (option b): upcase uppercases the full string; capitalize uppercases the first character and lowercases the remainder.

**Detailed explanation**

The exact effect follows Ruby’s Unicode casing rules and options. Both methods return a new String; their bang variants mutate the receiver and may return nil when nothing changes.

**Practical example**

```ruby
p "hELLO wORLD".upcase # "HELLO WORLD"
p "hELLO wORLD".capitalize # "Hello world"
```

**Important points and follow-ups**

- capitalize also lowercases the rest; it does not merely preserve all following characters.

**Corrections and source limitations**

- Added missing lowercase-rest behavior.

**Source references**

- SRC-00358 — [nine.txt:676–682](../ruby/nine.txt) (87) · [complete source](sources/nine.md)


---

<a id="a-0358"></a>

### A-0358 — What are arrays and hashes in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are arrays and hashes in Ruby?

**Direct answer**

Array is an ordered integer-indexed collection; Hash maps keys to values and preserves insertion order.

**Detailed explanation**

Both store references to arbitrary Ruby objects. Hash uses hash/eql? for ordinary key matching, and a missing key has a configurable default. Array indices are positional; a negative index counts from the end. Choose a structure according to whether the operation naturally addresses a position or an identifier.

**Practical example**

```ruby
items = ["ruby", "rails"]
p items[0] # "ruby"
user = { name: "Asha", active: true }
p user.fetch(:active) # true
```

**Important points and follow-ups**

- Mutation of a nested element can be visible through multiple collections sharing it.

**Source references**

- SRC-00508 — [nineteen.txt:203–217](../ruby/nineteen.txt) (7) · [complete source](sources/nineteen.md)


---

<a id="a-0359"></a>

### A-0359 — What are ranges and how are they used?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are ranges and how are they used?

**Direct answer**

Ranges describe intervals: a..b includes b and a...b excludes b. They also support beginless or endless forms in modern Ruby.

**Detailed explanation**

Use ranges for slices, case matching and compatible iteration. A finite-looking interval is not necessarily enumerable: Float ranges, for example, do not support ordinary each in the same way as Integer ranges. cover? checks interval coverage and can differ from include?.

**Practical example**

```ruby
p (1..3).to_a # [1, 2, 3]
p (1...3).to_a # [1, 2]
p (1..10).cover?(4) # true
```

**Important points and follow-ups**

- Avoid materializing a huge range unless the array is actually needed.

**Source references**

- SRC-00516 — [nineteen.txt:332–343](../ruby/nineteen.txt) (15) · [complete source](sources/nineteen.md)


---

<a id="a-0360"></a>

### A-0360 — What are Ruby arrays and how they can be created?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are Ruby arrays and how they can be created?

**Direct answer**

Array is an ordered, zero-indexed collection of object references and may contain mixed types. Create it with literals or Array.new.

**Detailed explanation**

Negative indices count backward. Array.new(n, mutable_object) repeats the same object reference, so use the block form for independent mutable elements. Arrays resize as elements are added.

**Practical example**

```ruby
a = [1, "two", :three]
p a[-1] # :three
rows = Array.new(2) { [] }
rows[0] << 1
p rows # [[1], []]
```

**Important points and follow-ups**

- A shallow copy still shares nested element objects.

**Source references**

- SRC-00300 — [nine.txt:187–196](../ruby/nine.txt) (29) · [complete source](sources/nine.md)


---

<a id="a-0361"></a>

### A-0361 — What are Ruby variables?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are Ruby variables?

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Source references**

- SRC-00277 — [nine.txt:47–56](../ruby/nine.txt) (6) · [complete source](sources/nine.md)


---

<a id="a-0362"></a>

### A-0362 — What are symbols in Ruby, and when should you use them?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are symbols in Ruby, and when should you use them?

**Direct answer**

A Symbol is an immutable interned identifier, often used for method names or hash keys; String represents text and is usually mutable.

**Detailed explanation**

Symbols are immutable identifiers. Equal symbol names identify the same interned symbol, while equal strings may be distinct or deduplicated/frozen. Dynamic symbols are eligible for GC. Use symbols for identifiers and strings for text, not an unconditional speed rule.

**Practical example**

```ruby
p :name.equal?(:name) # true
p({name: "Ana"}[:name])
```

**Important points and follow-ups**

- Do not assume all equal string literals allocate different objects: freezing/deduplication changes allocation. Dynamic symbols can be garbage collected.

**Source references**

- SRC-00155 — [four.txt:36–40](../ruby/four.txt) (4) · [complete source](sources/four.md)


---

<a id="a-0363"></a>

### A-0363 — What are the different types of variables in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 5

**Interview question**

What are the different types of variables in Ruby?

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- The source incorrectly requires method/block arguments to begin with _. _name conventionally signals an intentionally unused parameter.
- Blocks capture outer locals; a def body introduces a separate local scope. Uninitialized instance variables read as nil.
- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Corrections and source limitations**

- Correction/qualification: Ruby commonly distinguishes local, instance, class and global variables by scope/prefix; constants are a separate uppercase naming category. Parameters need no underscore prefix. The source incorrectly requires method/block arguments to begin with _. _name conventionally signals an intentionally unused parameter.
- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Constants can reference mutable objects and be reassigned with a warning; they are not automatically immutable or universally public across namespaces.

**Source references**

- SRC-00121 — [second.txt:447–459](../ruby/second.txt) (Q21) · [complete source](sources/second.md)
- SRC-00197 — [six.txt:1961–2074](../ruby/six.txt) (Q21) · [complete source](sources/six.md)
- SRC-00217 — [seven.txt:23–42](../ruby/seven.txt) (1) · [complete source](sources/seven.md)
- SRC-00352 — [nine.txt:625–633](../ruby/nine.txt) (81) · [complete source](sources/nine.md)
- SRC-00368 — [nine.txt:787–795](../ruby/nine.txt) (97) · [complete source](sources/nine.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00121 (second.txt)</summary>

**Original prompt:** How many types of variables are used in Ruby and what are they?

**Answer:** Ruby commonly distinguishes local, instance, class and global variables by scope/prefix; constants are a separate uppercase naming category. Parameters need no underscore prefix.

Ruby commonly distinguishes local, instance, class and global variables by scope/prefix; constants are a separate uppercase naming category. Parameters need no underscore prefix. The source incorrectly requires method/block arguments to begin with _. _name conventionally signals an intentionally unused parameter.

```ruby
name = "local"
@name = "instance"
# @@count in a class; $stdout is a global; VALUE is a constant.
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00197 (six.txt)</summary>

**Original prompt:** What are the different types of variables in Ruby?

**Answer:** Local, instance (@), class (@@) and global ($) variables differ in ownership/scope; constants begin uppercase. Class-instance variables are ordinary @variables on class objects.

Local, instance (@), class (@@) and global ($) variables differ in ownership/scope; constants begin uppercase. Class-instance variables are ordinary @variables on class objects. Constants can reference mutable objects and be reassigned with a warning; they are not automatically immutable or universally public across namespaces.

```ruby
local = 1
@instance = 2
VALUE = 3
p [local, @instance, VALUE]
```

</details>


---

<a id="a-0364"></a>

### A-0364 — What are the variable types in Ruby and how do you tell them apart?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are the variable types in Ruby and how do you tell them apart?

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Source references**

- SRC-00506 — [nineteen.txt:178–190](../ruby/nineteen.txt) (5) · [complete source](sources/nineteen.md)


---

<a id="a-0365"></a>

### A-0365 — What are variables in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are variables in Ruby?

**Direct answer**

Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

**Detailed explanation**

Locals belong to a lexical scope; blocks capture surrounding locals, while methods introduce their own local scope. Instance variables belong to the current object, including a class object when self is a class. Class variables are shared through a class hierarchy and can create surprising coupling; class instance variables often model per-class state more clearly. Globals are visible process-wide and should be used sparingly.

**Practical example**

```ruby
class User
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
p User.new("Asha").name # "Asha"
```

**Important points and follow-ups**

- Method visibility applies to methods, not to local-variable declarations.
- An uninitialized instance variable reads as nil; an unknown local name can be parsed as a method call.

**Source references**

- SRC-00426 — [eleven.txt:52–65](../ruby/eleven.txt) (3) · [complete source](sources/eleven.md)


---

<a id="a-0366"></a>

### A-0366 — What does false mean?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What does false mean?

**Direct answer**

nil represents the absence of a value and is the sole NilClass instance; false is the FalseClass boolean value.

**Detailed explanation**

Both are falsey in conditionals, and every other Ruby value, including 0, an empty string and an empty array, is truthy. They are distinct values with different meanings and methods. Do not rely on a hard-coded object_id for nil; object IDs are implementation details.

**Practical example**

```text
nil == false # false
if 0
  puts "zero is truthy"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00756 — [thirtyeight.txt:82–83](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="a-0367"></a>

### A-0367 — What does freeze do, and what is frozen_string_literal?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What does freeze do, and what is frozen_string_literal?

**Direct answer**

freeze prevents mutation of an object itself and returns that object. It is shallow: referenced nested objects can remain mutable, and the variable or constant can still be rebound.

**Detailed explanation**

The frozen_string_literal magic comment controls eligible string literals in its source file. Mutation attempts normally raise FrozenError. Freezing a constant’s value does not prohibit assigning that constant a new value; Ruby typically warns on reassignment. Deep immutability requires freezing or otherwise protecting nested values too.

**Practical example**

```ruby
items = ["a"].freeze
# items << "b" raises FrozenError
items.first << "!" # nested String remains mutable
p items # ["a!"]
```

**Important points and follow-ups**

- dup normally produces an unfrozen shallow copy; clone normally retains frozen state.

**Corrections and source limitations**

- Clarified freeze is shallow and does not prevent variable/constant reassignment.

**Source references**

- SRC-00534 — [nineteen.txt:628–642](../ruby/nineteen.txt) (33) · [complete source](sources/nineteen.md)


---

<a id="a-0368"></a>

### A-0368 — What is a range and how is it defined in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is a range and how is it defined in Ruby?

**Direct answer**

a..b includes b; a...b excludes b. Ranges express bounds and can iterate when their values support stepping.

**Detailed explanation**

A range in Ruby represents a sequence of values, typically numeric or alphabetic. Ranges can be used in case statements, for loop iteration, or to create an array of sequential elements.

Ranges can be defined in two ways:

Inclusive ranges, denoted by two dots (..), include the end value in the range. For example, 1..5 represents the numbers 1 through 5, inclusive.
inclusive_range = 1..5

puts inclusive_range.to_a # Outputs: [1, 2, 3, 4, 5]

Exclusive ranges, denoted by three dots (...), exclude the end value from the range. For example, 1...5 represents the numbers 1 through 4.
exclusive_range = 1...5

puts exclusive_range.to_a # Outputs: [1, 2, 3, 4]

In these examples, to_a is a method that converts the range to an array, and puts outputs the array to the console.

**Practical example**

```ruby
p (1..5).to_a # [1, 2, 3, 4, 5]
p (1...5).to_a # [1, 2, 3, 4]
```

**Important points and follow-ups**

- puts an array prints one element per line; p displays array notation. Endless and beginless ranges cannot always be converted to arrays.

**Source references**

- SRC-00014 — [first.txt:105–121](../ruby/first.txt) (14) · [complete source](sources/first.md)


---

<a id="a-0369"></a>

### A-0369 — What is concatenating string in Ruby. In how many ways you can create a concatenating string?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is concatenating string in Ruby. In how many ways you can create a concatenating string?

**Direct answer**

Use + for a new String, << or concat to append in place, and interpolation or join to construct text from values.

**Detailed explanation**

+= rebinds the variable to the result of +; it is not in-place String mutation. Adjacent literal strings can be concatenated by Ruby’s parser, but placing two arbitrary String variables next to each other is not a general concatenation operation.

**Practical example**

```ruby
a = +"hello"
b = a
a += " world"
p b # "hello"
b << "!"
p b # "hello!"
```

**Important points and follow-ups**

- Frozen receivers reject mutating append operations.

**Corrections and source limitations**

- Qualified “single space concatenation” as adjacent literals, not arbitrary variables.

**Source references**

- SRC-00297 — [nine.txt:166–175](../ruby/nine.txt) (26) · [complete source](sources/nine.md)


---

<a id="a-0370"></a>

### A-0370 — What is Hash in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 3

**Interview question**

What is Hash in Ruby on Rails?

**Direct answer**

A Ruby Hash stores key/value associations and preserves insertion order.

**Detailed explanation**

Hash keys are compared using hash and eql?, so keys need stable behavior while stored. Values can be any object. A missing key normally returns nil unless a default or default proc is configured; fetch can distinguish a missing key from a present nil.

**Practical example**

```ruby
counts = Hash.new(0)
%w[ruby rails ruby].each { |word| counts[word] += 1 }
p counts # {"ruby"=>2, "rails"=>1}
```

**Important points and follow-ups**

- Hash.new([]) shares one mutable default array; use a block for independent collections.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00813 — [thirtyeight.txt:232–233](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00818 — [thirtyeight.txt:247–249](../ruby/thirtyeight.txt) (3) · [complete source](sources/thirtyeight.md)
- SRC-01438 — [twentythree.txt:597–609](../ruby/twentythree.txt) (Q46) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00813 (thirtyeight.txt)</summary>

**Original prompt:** What is a Hash in Ruby on Rails?

**Answer:** A Hash maps keys to values and preserves insertion order.

Hash uses hash/eql? semantics for key identity; duplicate equivalent keys overwrite earlier values. Defaults can be shared objects unless a default block creates one per key. Strings and symbols are different normal Hash keys.

```ruby
counts = Hash.new(0)
%w[a b a].each { |word| counts[word] += 1 }
counts # {"a"=>2, "b"=>1}
```

</details>


---

<a id="a-0371"></a>

### A-0371 — What is nil, and what counts as false in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is nil, and what counts as false in Ruby?

**Direct answer**

nil represents absence; only nil and false are falsy, while 0, "" and [] are truthy.

**Detailed explanation**

An empty method returns nil, but a nonempty method implicitly returns its last evaluated expression even without an explicit return keyword. nil remains a normal assignable object, and a false Boolean can be a valid result.

**Practical example**

```ruby
def answer; 42; end
p answer # 42
p !!0 # true
```

**Important points and follow-ups**

- Use nil? when absence must be distinguished from false.

**Corrections and source limitations**

- Corrected inference that absence of explicit return commonly implies nil: a nonempty method returns its final expression.
- Source’s statement about methods without explicit return often returning nil needed correction.

**Source references**

- SRC-00505 — [nineteen.txt:163–177](../ruby/nineteen.txt) (4) · [complete source](sources/nineteen.md)


---

<a id="a-0372"></a>

### A-0372 — What is the difference between `and`/`or` and `&&`/`||`?  What is the result of `a = nil and true`?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between `and`/`or` and `&&`/`||`?  What is the result of `a = nil and true`?

**Direct answer**

and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil.

**Detailed explanation**

and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil. Source reverses the relative precedence of both operator groups. Both groups short-circuit and return operands, not necessarily booleans.

**Practical example**

```ruby
a = nil and true
p a # nil
b = true and false
c = true && false
p [b,c] # [true,false]
```

**Important points and follow-ups**

- Source reverses the relative precedence of both operator groups. Both groups short-circuit and return operands, not necessarily booleans.
- Verification: https://docs.ruby-lang.org/en/3.4/syntax/assignment_rdoc.html

**Corrections and source limitations**

- Original incomplete/outdated claim corrected: and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil.

**Source references**

- SRC-00169 — [five.txt:40–44](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="a-0373"></a>

### A-0373 — What is the difference between false and nil in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 4

**Interview question**

What is the difference between false and nil in Ruby on Rails?

**Direct answer**

false is the sole instance of FalseClass and represents a false boolean value; nil is the sole instance of NilClass and normally represents absence. Both are falsey.

**Detailed explanation**

Only false and nil are falsey in Ruby. Zero, an empty string, and an empty array are truthy. Distinguish an absent value from an explicit false setting, especially when applying defaults. In Rails, false.blank? is true, so a presence validation is unsuitable for requiring a boolean to be either true or false.

**Practical example**

```ruby
p [false.class, nil.class] # [FalseClass, NilClass]
p !!0                     # true
value = false
p value.nil? ? :missing : value # false
```

**Important points and follow-ups**

- Use inclusion: { in: [true, false] } for a required boolean.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Use Ruby literals nil, true and false with their actual classes; do not rely on fixed object_id values or capitalize the literals.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00690 — [thirty.txt:24–26](../ruby/thirty.txt) (6) · [complete source](sources/thirty.md)
- SRC-01304 — [twentynine.txt:36–38](../ruby/twentynine.txt) (6) · [complete source](sources/twentynine.md)
- SRC-01349 — [twentytwo.txt:31–33](../ruby/twentytwo.txt) (4) · [complete source](sources/twentytwo.md)
- SRC-01396 — [twentythree.txt:32–37](../ruby/twentythree.txt) (Q4) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00690 (thirty.txt)</summary>

**Original prompt:** Mention what the difference is between false and nil in Ruby?

**Answer:** nil represents the absence of a value and is the sole NilClass instance; false is the FalseClass boolean value.

Both are falsey in conditionals, and every other Ruby value, including 0, an empty string and an empty array, is truthy. They are distinct values with different meanings and methods. Do not rely on a hard-coded object_id for nil; object IDs are implementation details.

```text
nil == false # false
if 0
  puts "zero is truthy"
end
```

</details>


---

<a id="a-0374"></a>

### A-0374 — What is the difference between nil and false in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between nil and false in Ruby?

**Direct answer**

nil is the sole instance of NilClass and represents absence; false is the false Boolean value. Only nil and false are falsy in Ruby; 0, empty strings and empty collections are truthy.

**Detailed explanation**

A conditional tests truthiness rather than calling empty?. An empty? query asks whether a supported container has no elements, and nil.empty? raises. nil is a normal Ruby value: it can be assigned, returned and stored in arrays or hashes. Use nil? to distinguish absence from a valid false result.

**Practical example**

```ruby
p [nil, false, 0, "", []].map { |x| !!x } # [false, false, true, true, true]
p "".empty? # true
```

**Important points and follow-ups**

- Do not treat a valid false setting as missing.
- Rails blank? and present? are Active Support extensions.

**Source references**

- SRC-00278 — [nine.txt:57–65](../ruby/nine.txt) (7) · [complete source](sources/nine.md)


---

<a id="a-0375"></a>

### A-0375 — What is the difference between nil and false?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between nil and false?

**Direct answer**

nil is the sole instance of NilClass and represents absence; false is the false Boolean value. Only nil and false are falsy in Ruby; 0, empty strings and empty collections are truthy.

**Detailed explanation**

A conditional tests truthiness rather than calling empty?. An empty? query asks whether a supported container has no elements, and nil.empty? raises. nil is a normal Ruby value: it can be assigned, returned and stored in arrays or hashes. Use nil? to distinguish absence from a valid false result.

**Practical example**

```ruby
p [nil, false, 0, "", []].map { |x| !!x } # [false, false, true, true, true]
p "".empty? # true
```

**Important points and follow-ups**

- Do not treat a valid false setting as missing.
- Rails blank? and present? are Active Support extensions.

**Source references**

- SRC-00221 — [seven.txt:82–88](../ruby/seven.txt) (5) · [complete source](sources/seven.md)


---

<a id="a-0376"></a>

### A-0376 — What is the difference between nil, false, and blank?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between nil, false, and blank?

**Direct answer**

nil means no value; false is a boolean false value. blank? is an Active Support predicate for nil/false/empty/whitespace and does not change Ruby truthiness.

**Detailed explanation**

nil means no value; false is a boolean false value. blank? is an Active Support predicate for nil/false/empty/whitespace and does not change Ruby truthiness. blank? is available outside Rails when the relevant Active Support extension is loaded.

**Practical example**

```ruby
require "active_support/core_ext/object/blank"
p [nil.blank?, false.blank?, " ".blank?, 0.blank?] # [true,true,true,false]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- blank? is available outside Rails when the relevant Active Support extension is loaded.

**Source references**

- SRC-00184 — [six.txt:686–788](../ruby/six.txt) (Q8) · [complete source](sources/six.md)


---

<a id="a-0377"></a>

### A-0377 — What is the difference between nil, false, and empty in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between nil, false, and empty in Ruby?

**Direct answer**

nil is the sole instance of NilClass and represents absence; false is the false Boolean value. Only nil and false are falsy in Ruby; 0, empty strings and empty collections are truthy.

**Detailed explanation**

A conditional tests truthiness rather than calling empty?. An empty? query asks whether a supported container has no elements, and nil.empty? raises. nil is a normal Ruby value: it can be assigned, returned and stored in arrays or hashes. Use nil? to distinguish absence from a valid false result.

**Practical example**

```ruby
p [nil, false, 0, "", []].map { |x| !!x } # [false, false, true, true, true]
p "".empty? # true
```

**Important points and follow-ups**

- Do not treat a valid false setting as missing.
- Rails blank? and present? are Active Support extensions.

**Source references**

- SRC-00377 — [ten.txt:53–55](../ruby/ten.txt) (6) · [complete source](sources/ten.md)


---

<a id="a-0378"></a>

### A-0378 — What is the difference between render and render_to_string?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between render and render_to_string?

**Direct answer**

render sets the controller response body, while render_to_string returns rendered output as a Ruby string.

**Detailed explanation**

Both use the rendering system. Use render_to_string when building an email fragment, generating a document, or composing content without immediately assigning the HTTP response. Neither operation executes another controller action.

**Practical example**

```ruby
html = render_to_string(partial: "receipt", locals: { order: @order })
render html: html
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00919 — [thirtyfour.txt:89–89](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="a-0379"></a>

### A-0379 — What is the difference between single quotes and double quotes for strings

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between single quotes and double quotes for strings

**Direct answer**

Double-quoted Ruby strings interpret interpolation and common escape sequences; single-quoted strings are mostly literal.

**Detailed explanation**

Single quotes still recognize escaped single quotes and backslashes. Both produce String objects and can be frozen. Prefer whichever clearly expresses the text; do not claim either is always faster in a meaningful application.

**Practical example**

```ruby
name = "Ada"
p "Hello #{name}" # "Hello Ada"
p 'Hello #{name}' # "Hello #{name}"
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01418 — [twentythree.txt:179–182](../ruby/twentythree.txt) (Q26) · [complete source](sources/twentythree.md)


---

<a id="a-0380"></a>

### A-0380 — What is the difference between String and Symbol?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 13

**Interview question**

What is the difference between String and Symbol?

**Direct answer**

A String represents text and is usually mutable; a Symbol is an immutable, interned identifier.

**Detailed explanation**

Repeated creation of the same symbol returns the same Symbol object. Strings may be frozen or deduplicated depending on how they are created. Dynamically created symbols have been eligible for collection in modern Ruby; the old blanket claim that symbols are never garbage-collected is outdated. Choose symbols for identifiers and strings for user content.

**Practical example**

```ruby
p :status.equal?(:status) # true
s = "open"
s << "!"
p s # "open!"
```

**Important points and follow-ups**

- Modern dynamic symbols can be collected; string-key hashes are perfectly valid and common for external data.
- Do not assume all equal string literals allocate different objects: freezing/deduplication changes allocation. Dynamic symbols can be garbage collected.
- Verification: https://docs.ruby-lang.org/en/2.2.0/ChangeLog.html (dynamic symbol GC history).
- Converting unbounded external input to identifiers can still consume memory.
- Frozen string literals may share storage or identity.
- Do not claim every equal string always allocates separately.
- Do not convert unlimited untrusted input into identifiers without considering resource usage.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source correction/edge case: Modern dynamic symbols can be collected; string-key hashes are perfectly valid and common for external data.
- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Dynamic symbols have been garbage-collectable since Ruby 2.2; source table claiming Symbol GC is always No is outdated. Avoiding all string-key hashes is not a valid general rule.
- Qualified absolute identity/performance claims: frozen strings may be shared; dynamic symbols can be collected; symbols are not universally faster.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00130 — [three.txt:141–154](../ruby/three.txt) · [complete source](sources/three.md)
- SRC-00182 — [six.txt:491–584](../ruby/six.txt) (Q6) · [complete source](sources/six.md)
- SRC-00219 — [seven.txt:52–68](../ruby/seven.txt) (3) · [complete source](sources/seven.md)
- SRC-00345 — [nine.txt:572–577](../ruby/nine.txt) (74) · [complete source](sources/nine.md)
- SRC-00450 — [thirteen.txt:133–139](../ruby/thirteen.txt) (concept-11) · [complete source](sources/thirteen.md)
- SRC-00504 — [nineteen.txt:139–162](../ruby/nineteen.txt) (3) · [complete source](sources/nineteen.md)
- SRC-00618 — [twentyfour.txt:125–151](../ruby/twentyfour.txt) (4) · [complete source](sources/twentyfour.md)
- SRC-00648 — [fifteen.txt:88–88](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00692 — [thirty.txt:32–34](../ruby/thirty.txt) (8) · [complete source](sources/thirty.md)
- SRC-01183 — [twentyeight.txt:316–318](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01306 — [twentynine.txt:42–44](../ruby/twentynine.txt) (8) · [complete source](sources/twentynine.md)
- SRC-01350 — [twentytwo.txt:34–189](../ruby/twentytwo.txt) (5) · [complete source](sources/twentytwo.md)
- SRC-01397 — [twentythree.txt:38–43](../ruby/twentythree.txt) (Q5) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00130 (three.txt)</summary>

**Original prompt:** Explain the concept of a symbol in Ruby and why it is useful compared to strings.

**Answer:** Symbols are immutable identifiers, whereas strings are text. Use symbols for stable labels, but do not claim universal speed/allocation superiority.

Symbols are immutable identifiers, whereas strings are text. Use symbols for stable labels, but do not claim universal speed/allocation superiority. Modern dynamic symbols can be collected; string-key hashes are perfectly valid and common for external data.

```ruby
person = {name: "John", age: 30}
p person[:name]
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00182 (six.txt)</summary>

**Original prompt:** What is the difference between symbols and strings in Ruby?

**Answer:** Symbols are immutable identifiers; strings are text and may be mutable or frozen. Interning, frozen literals and runtime options make allocation/performance claims context-specific.

Symbols are immutable identifiers; strings are text and may be mutable or frozen. Interning, frozen literals and runtime options make allocation/performance claims context-specific. Dynamic symbols have been garbage-collectable since Ruby 2.2; source table claiming Symbol GC is always No is outdated. Avoiding all string-key hashes is not a valid general rule.

```ruby
p :name.equal?(:name)
text = +"name"
text << "!"
p text
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00219 (seven.txt)</summary>

**Original prompt:** What is the difference between symbols and strings?

**Answer:** Strings represent text and are normally mutable; symbols represent immutable names or identifiers. A symbol and a string with the same spelling remain different hash keys.

Repeated occurrences of the same symbol refer to the same symbol object. String identity depends on allocation, freezing and runtime optimizations, so do not assume every literal always creates a different object. Dynamic symbols can be garbage-collected in modern CRuby. Prefer symbols for fixed API names and strings for external text; measure performance instead of claiming symbols are universally faster.

```ruby
h = { name: "Asha" }
p h[:name]  # "Asha"
p h["name"] # nil
p :name.to_s # "name"
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00648 (fifteen.txt)</summary>

**Original prompt:** What is the difference between symbols and strings?

**Answer:** A Symbol is an immutable identifier value; a String is a text value that is normally mutable unless frozen.

Symbols with the same name refer to the same symbol object within the runtime. String identity depends on creation, interning and freezing, so object IDs are not a general type definition. Since Ruby 2.2 many dynamically created symbols can be garbage collected; symbols are not universally permanent memory leaks. Use strings for user content and symbols for a bounded vocabulary of names.

```text
:name == :name # true
"name" == :name # false
"name".to_sym # :name
:name.to_s # "name"
```

</details>


---

<a id="a-0381"></a>

### A-0381 — What is the purpose of the 'nil' value in Ruby?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 2

**Interview question**

What is the purpose of the 'nil' value in Ruby?

**Direct answer**

nil is the single NilClass object representing no value. It is falsey, unlike an empty string or zero.

**Detailed explanation**

nil is the singleton NilClass value and is falsey. A missing hash key returns its configured default (nil by default). puts nil prints a blank line; p nil prints nil.

**Practical example**

```ruby
user = {name: "Ana"}
p user[:age] # nil
puts user[:age] # blank line
```

**Important points and follow-ups**

- puts nil prints a newline, not the literal word nil.

**Corrections and source limitations**

- Source correction: nil is the singleton NilClass value and is falsey. A missing hash key returns its configured default (nil by default). puts nil prints a blank line; p nil prints nil.
- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00006 — [first.txt:28–38](../ruby/first.txt) (6) · [complete source](sources/first.md)
- SRC-00755 — [thirtyeight.txt:80–81](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00755 (thirtyeight.txt)</summary>

**Original prompt:** What does nil mean?

**Answer:** nil represents the absence of a value and is the sole NilClass instance; false is the FalseClass boolean value.

Both are falsey in conditionals, and every other Ruby value, including 0, an empty string and an empty array, is truthy. They are distinct values with different meanings and methods. Do not rely on a hard-coded object_id for nil; object IDs are implementation details.

```text
nil == false # false
if 0
  puts "zero is truthy"
end
```

</details>


---

<a id="a-0382"></a>

### A-0382 — What is the use of global variable $ in Ruby?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the use of global variable $ in Ruby?

**Direct answer**

A name prefixed by $ refers to a global variable visible throughout the Ruby process.

**Detailed explanation**

Globals are convenient for runtime-provided streams and status values but create implicit dependencies when used for application state. Prefer an object, explicit dependency or well-scoped configuration for testability and concurrency.

**Practical example**

```ruby
$example_flag = true
p $example_flag
```

**Important points and follow-ups**

- Global accessibility does not provide thread safety.

**Source references**

- SRC-00298 — [nine.txt:176–179](../ruby/nine.txt) (27) · [complete source](sources/nine.md)


---

<a id="a-0383"></a>

### A-0383 — What is the value of the variable upcased in the below piece of code?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the value of the variable upcased in the below piece of code?

**Direct answer**

upcased is [nil, nil, nil], while ONE, TWO and THREE are printed on separate lines.

**Detailed explanation**

map stores each block’s final value. Here that value comes from puts, which returns nil. If the array of uppercase strings is wanted, use map(&:upcase) without printing as the final operation.

**Practical example**

```ruby
upcased = ["one", "two", "three"].map { |n| puts n.upcase }
p upcased # [nil, nil, nil]
```

**Important points and follow-ups**

- Keep returned values separate from console side effects.

**Source references**

- SRC-00364 — [nine.txt:738–761](../ruby/nine.txt) (93) · [complete source](sources/nine.md)


---

<a id="a-0384"></a>

### A-0384 — What will `val1` and `val2` equal after the code below is executed?  Explain your answer.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What will `val1` and `val2` equal after the code below is executed?  Explain your answer.



```ruby
val1 = true and false  # hint: output of this statement in IRB is NOT value of val1!
val2 = true && false

```

**Direct answer**

val1 is true and val2 is false because assignment binds more tightly than and, while && binds more tightly than assignment.

**Detailed explanation**

Although these two statements might appear to be equivalent, they are not, due to the order of operations.  Specifically, the `and` and `or` operators have lower precedence than the `=` operator, whereas the `&&` and `||` operators have higher precedence than the `=` operator, based on order of operations.


To help clarify this, here’s the same code, but employing parentheses to clarify the default order of operations:



```ruby
(val1 = true) and false    # results in val1 being equal to true
val2 = (true && false)     # results in val2 being equal to false

```


This is, incidentally, a great example of why using parentheses to clearly specify your intent is generally a good practice, in any language.  But whether or not you use parentheses, it’s important to be aware of these order of operations rules and to thereby ensure that you are properly determining when to employ `and` / `or` vs. `&&` / `||`.

**Practical example**

```ruby
val1 = true and false
val2 = true && false
p [val1, val2] # [true, false]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00102 — [second.txt:7–21](../ruby/second.txt) (Q2) · [complete source](sources/second.md)


---

<a id="a-0385"></a>

### A-0385 — Which common string methods should you know?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Which common string methods should you know?

**Direct answer**

Common String operations include upcase, downcase, capitalize, strip, split, gsub, include? and length.

**Detailed explanation**

Choose substitution scope deliberately: sub replaces the first match, gsub every match. String methods normally count characters rather than bytes where appropriate, but a user-perceived grapheme can contain several code points. Bang/non-bang naming communicates risk by convention.

**Practical example**

```ruby
p "hello".gsub("l", "L") # "heLLo"
p " hELLO ".strip.capitalize # "Hello"
```

**Important points and follow-ups**

- The original gsub output comment is incorrect.

**Source references**

- SRC-00517 — [nineteen.txt:344–355](../ruby/nineteen.txt) (16) · [complete source](sources/nineteen.md)


---

<a id="a-0386"></a>

### A-0386 — Which hash methods and patterns should you know?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Which hash methods and patterns should you know?

**Direct answer**

Know fetch, dig, merge, each_with_object, transform_values, group_by and default-value patterns for Hash-based work.

**Detailed explanation**

fetch distinguishes a missing key from a stored nil or false and may raise KeyError or use a default/block. dig walks nested supported containers and can raise TypeError for an incompatible intermediate object. Hash.new(0) works for numeric counting, but shared mutable defaults such as Hash.new([]) are a common bug.

**Practical example**

```ruby
groups = Hash.new { |h, key| h[key] = [] }
groups[:ruby] << "Asha"
p groups # {:ruby=>["Asha"]}
```

**Important points and follow-ups**

- group_by is an Enumerable operation that returns a Hash, not only a method about an existing Hash.

**Source references**

- SRC-00532 — [nineteen.txt:596–609](../ruby/nineteen.txt) (31) · [complete source](sources/nineteen.md)


---

<a id="a-0387"></a>

### A-0387 — Which of the expressions listed below will result in “false”?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Which of the expressions listed below will result in “false”?

**Direct answer**

The conditions false and nil choose the String "false"; every other listed condition chooses the String "true".

**Detailed explanation**

The question’s ternaries return text Strings rather than Boolean objects. Only nil and false are falsy; the String "false", zero, an empty String and an empty Array are all truthy.

**Practical example**

```ruby
p [true, false, nil, 1, 0, "false", "", []].map { |x| x ? "true" : "false" }
```

**Important points and follow-ups**

- Keep the value false distinct from the text "false".

**Source references**

- SRC-00321 — [nine.txt:389–404](../ruby/nine.txt) (50) · [complete source](sources/nine.md)


---

<a id="a-0388"></a>

### A-0388 — Which of the expressions listed below will result in `"false"`?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Which of the expressions listed below will result in `"false"`?



```ruby
true    ? "true" : "false"
false   ? "true" : "false"
nil     ? "true" : "false"
1       ? "true" : "false"
0       ? "true" : "false"
"false" ? "true" : "false"
""      ? "true" : "false"
[]      ? "true" : "false"

```

**Direct answer**

Only the expressions whose conditions are false or nil return the string "false". Zero, empty strings and empty arrays are truthy.

**Detailed explanation**

In Ruby, the only values that evaluate to false are `false` and `nil`.  Everything else – even zero (0) and an empty array ([]) – evaluates to true.


This comes as a real surprise to programmers who have previously been working in other languages like JavaScript.


(Thanks to Ruby Gotchas for this question.)

**Practical example**

```ruby
p [false, nil, 0, "", []].map { |v| v ? "true" : "false" }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00103 — [second.txt:21–37](../ruby/second.txt) (Q3) · [complete source](sources/second.md)

