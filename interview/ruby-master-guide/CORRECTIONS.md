# Technical corrections and historical behavior

122 source occurrences have explicit technical correction/version notes. This counts occurrences, not distinct bugs; an error repeated in two articles is listed twice for traceability. See the linked final question for detailed explanation and other source variants. General expansions and missing-source notes are listed separately in [the coverage report](COVERAGE_REPORT.md).

## SRC-00008 → [A-0170](A-ruby.md#a-0170)

**Question:** What is the use of load and required?

**Source:** [first.txt:54–56](../ruby/first.txt)

- Source correction: The source misspells require and incorrectly ties file loading to visiting URLs. require tracks loaded features; require_relative resolves relative to its calling file; load reruns the file. Rails autoloading/reloading is a separate subsystem.

**Corrected interview answer:** require loads a feature once and tracks it in $LOADED_FEATURES. require_relative resolves from the current file; load executes a file again on each call.

## SRC-00026 → [F-0063](F-advanced.md#f-0063)

**Question:** Describe the concept of metaclasses (eigenclasses) in Ruby.

**Source:** [first.txt:189–193](../ruby/first.txt)

- Source correction: The singleton class/eigenclass holds singleton methods on supported objects. Immediate immutable values such as Integer/Symbol restrict this; it is inaccurate to say every object can receive arbitrary singleton methods.

**Corrected interview answer:** An eigenclass or singleton class stores methods specific to one object, including class methods on a Class object. It is distinct from the Singleton design pattern.

## SRC-00050 → [F-0090](F-advanced.md#f-0090)

**Question:** Discuss the global interpreter lock (GIL) and its impact on Ruby's performance.

**Source:** [first.txt:322–324](../ruby/first.txt)

- Source correction: The source incorrectly calls CPython Ruby’s implementation. CRuby/MRI uses a global VM lock, while CPython implements Python. CRuby threads overlap many I/O operations but do not generally run Ruby code in parallel within one ractor. Other Ruby runtimes and separate processes differ.

**Corrected interview answer:** CRuby uses a global VM lock that limits parallel Ruby execution within a ractor; this is not CPython. Threads still overlap I/O, and processes or other runtimes can provide CPU parallelism.

## SRC-00091 → [A-0184](A-ruby.md#a-0184)

**Question:** What is the significance of Ruby in the context of ethical hacking and cybersecurity?

**Source:** [first.txt:513–515](../ruby/first.txt)

- Source correction: Ruby is a high-level dynamic language used in security automation and tools such as Metasploit. Python is also high-level; calling it a lower-level language is incorrect. Tool choice should be based on supported APIs, constraints and team familiarity.

**Corrected interview answer:** Ruby supports automation and security tooling; Metasploit is one established Ruby ecosystem example. Python is also a high-level language, not a low-level alternative.

## SRC-00117 → [A-0230](A-ruby.md#a-0230)

**Question:** What is the value of the variable `upcased` in the below piece of code?


`upcased = ["one", "two", "three"].map {|n| puts n.upcase }`

**Source:** [second.txt:342–357](../ruby/second.txt)

- Correction/qualification: upcased is [nil, nil, nil] because every block returns puts’ nil result; the uppercase words are only printed. Use map(&:upcase) if the transformed strings are the desired return value. Source has a variable-name typo, upcase instead of upcased.

**Corrected interview answer:** upcased is [nil, nil, nil] because every block returns puts’ nil result; the uppercase words are only printed.

## SRC-00121 → [A-0363](A-ruby.md#a-0363)

**Question:** How many types of variables are used in Ruby and what are they?

**Source:** [second.txt:447–459](../ruby/second.txt)

- Correction/qualification: Ruby commonly distinguishes local, instance, class and global variables by scope/prefix; constants are a separate uppercase naming category. Parameters need no underscore prefix. The source incorrectly requires method/block arguments to begin with _. _name conventionally signals an intentionally unused parameter.

**Corrected interview answer:** Ruby commonly distinguishes local, instance, class and global variables by scope/prefix; constants are a separate uppercase naming category. Parameters need no underscore prefix.

## SRC-00129 → [D-0089](D-coding.md#d-0089)

**Question:** Write a Ruby method that takes an array of strings and returns a new array containing only the strings that are of even length.’

**Source:** [three.txt:124–140](../ruby/three.txt)

- Source correction/edge case: The source incorrectly omits orange (6) and kiwi (4). Time is linear in inputs, with encoding-dependent length cost.

**Corrected interview answer:** Select strings whose length is even, preserving original order; length counts characters under the string’s encoding rather than display grapheme clusters.

## SRC-00150 → [F-0092](F-advanced.md#f-0092)

**Question:** Explain the concept of concurrency and parallelism in Ruby, and how they are achieved.

**Source:** [three.txt:533–542](../ruby/three.txt)

- Source correction/edge case: The source incorrectly says Ruby threads are not native OS-level threads. Do not generalize CRuby’s GVL to every Ruby implementation.

**Corrected interview answer:** Concurrency overlaps progress among tasks; parallelism executes at once. CRuby uses native-thread machinery but its GVL constrains parallel Ruby execution; processes/ractors or other runtimes offer other tradeoffs.

## SRC-00151 → [D-0058](D-coding.md#d-0058)

**Question:** Write a Ruby method that takes a string as input and returns the number of occurrences of each word in the string.

**Source:** [three.txt:543–565](../ruby/three.txt)

- Source correction/edge case: Correct sentence. count is 2, not 1. Clarify whether punctuation should be removed and whether Unicode case folding is required.

**Corrected interview answer:** Split on whitespace, normalize case and count in a Hash. Under this rule, punctuation remains part of each word.

## SRC-00165 → [A-0270](A-ruby.md#a-0270)

**Question:** What are the three levels of method access control available in Ruby?

**Source:** [five.txt:18–23](../ruby/five.txt)

- Original incomplete/outdated claim corrected: public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts.

**Corrected interview answer:** public methods can be called normally; private methods are for receiver-internal calls; protected methods permit compatible receiver calls from class-family contexts.

## SRC-00166 → [A-0214](A-ruby.md#a-0214)

**Question:** What are Procs in Ruby?  How do they compare to closures in JS?

**Source:** [five.txt:24–29](../ruby/five.txt)

- Original incomplete/outdated claim corrected: A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form.

**Corrected interview answer:** A Proc is a callable closure object capturing local bindings and self. Like a JavaScript closure it retains its environment, although JavaScript this rules differ by function form.

## SRC-00169 → [A-0372](A-ruby.md#a-0372)

**Question:** What is the difference between `and`/`or` and `&&`/`||`?  What is the result of `a = nil and true`?

**Source:** [five.txt:40–44](../ruby/five.txt)

- Original incomplete/outdated claim corrected: and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil.

**Corrected interview answer:** and/or have lower precedence than assignment; &&/|| have higher precedence. a = nil and true assigns nil, and the expression evaluates to nil.

## SRC-00171 → [F-0053](F-advanced.md#f-0053)

**Question:** What is the function of `method_missing`?  How is it used in meta-programming in Ruby?

**Source:** [five.txt:52–55](../ruby/five.txt)

- Original incomplete/outdated claim corrected: method_missing intercepts failed method lookup; implement respond_to_missing? consistently and delegate unknown methods to super.

**Corrected interview answer:** method_missing intercepts failed method lookup; implement respond_to_missing? consistently and delegate unknown methods to super.

## SRC-00172 → [F-0040](F-advanced.md#f-0040)

**Question:** What is a DSL (Domain Specific Language) and why is Ruby a popular language to build DSLs in?

**Source:** [five.txt:56–59](../ruby/five.txt)

- Original incomplete/outdated claim corrected: A domain-specific language expresses a focused problem domain. Ruby’s blocks, flexible method-call syntax and objects allow readable internal DSLs.

**Corrected interview answer:** A domain-specific language expresses a focused problem domain. Ruby’s blocks, flexible method-call syntax and objects allow readable internal DSLs.

## SRC-00173 → [A-0298](A-ruby.md#a-0298)

**Question:** What are RubyGems?  Got any favourites?

**Source:** [five.txt:60–60](../ruby/five.txt)

- Original incomplete/outdated claim corrected: RubyGems distributes Ruby libraries/tools as versioned packages. Choose gems by maintenance, API fit, security and compatibility; a favorite should be explained with a real project example.

**Corrected interview answer:** RubyGems distributes Ruby libraries/tools as versioned packages. Choose gems by maintenance, API fit, security and compatibility; a favorite should be explained with a real project example.

## SRC-00174 → [B-0121](B-rails.md#b-0121)

**Question:** What is Rails good at?  What is it not so good at?

**Source:** [five.txt:61–61](../ruby/five.txt)

- Original incomplete/outdated claim corrected: Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation.

**Corrected interview answer:** Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation.

## SRC-00175 → [B-0080](B-rails.md#b-0080)

**Question:** List some things you would change about Rails

**Source:** [five.txt:62–62](../ruby/five.txt)

- Original incomplete/outdated claim corrected: Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails.

**Corrected interview answer:** Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails.

## SRC-00176 → [B-0365](B-rails.md#b-0365)

**Question:** How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)

**Source:** [five.txt:63–63](../ruby/five.txt)

- Original incomplete/outdated claim corrected: Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby.

**Corrected interview answer:** Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby.

## SRC-00177 → [A-0150](A-ruby.md#a-0150)

**Question:** What is Ruby and why is it popular?

**Source:** [six.txt:2–68](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Ruby is dynamically typed and object oriented: values, including numbers, nil, classes and modules, are objects. Methods and blocks support expressive reusable APIs.

## SRC-00178 → [A-0158](A-ruby.md#a-0158)

**Question:** What is the difference between puts, print, and p in Ruby?

**Source:** [six.txt:69–143](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- The original phrase "p returns inspect output" is misleading: it prints inspect output but returns the object.

**Corrected interview answer:** puts prints values with line endings and returns nil; print adds no newline and returns nil; p prints inspect forms and returns its argument (or the arguments array for several).

## SRC-00179 → [A-0211](A-ruby.md#a-0211)

**Question:** What is the difference between blocks, procs, and lambdas in Ruby?

**Source:** [six.txt:144–253](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Both lambdas and ordinary procs are Proc objects. Lambdas enforce method-like arity and local return; ordinary proc return targets the defining method.

## SRC-00180 → [A-0196](A-ruby.md#a-0196)

**Question:** What is the difference between class and module in Ruby?

**Source:** [six.txt:254–373](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Classes create instances and support a superclass; modules provide namespaces and mixed-in methods. A module object can have instance variables, and module methods can call super in an ancestor chain.

## SRC-00181 → [A-0326](A-ruby.md#a-0326)

**Question:** What is the difference between include and extend in Ruby?

**Source:** [six.txt:374–490](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** include places module instance methods in the receiving class’s instance-method lookup chain. extend makes module instance methods singleton methods of the receiver.

## SRC-00182 → [A-0380](A-ruby.md#a-0380)

**Question:** What is the difference between symbols and strings in Ruby?

**Source:** [six.txt:491–584](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Dynamic symbols have been garbage-collectable since Ruby 2.2; source table claiming Symbol GC is always No is outdated. Avoiding all string-key hashes is not a valid general rule.

**Corrected interview answer:** Symbols are immutable identifiers; strings are text and may be mutable or frozen. Interning, frozen literals and runtime options make allocation/performance claims context-specific.

## SRC-00183 → [A-0227](A-ruby.md#a-0227)

**Question:** What is the difference between map, select, and reduce in Ruby?

**Source:** [six.txt:585–685](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** map transforms every element, select keeps elements whose block is truthy, and reduce accumulates a result of any type, not necessarily a scalar.

## SRC-00184 → [A-0376](A-ruby.md#a-0376)

**Question:** What is the difference between nil, false, and blank?

**Source:** [six.txt:686–788](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** nil means no value; false is a boolean false value. blank? is an Active Support predicate for nil/false/empty/whitespace and does not change Ruby truthiness.

## SRC-00185 → [A-0271](A-ruby.md#a-0271)

**Question:** What is the difference between attr_accessor, attr_reader, and attr_writer?

**Source:** [six.txt:789–911](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** attr_reader defines a getter, attr_writer defines a setter, and attr_accessor defines both methods backed by an instance variable.

## SRC-00186 → [F-0050](F-advanced.md#f-0050)

**Question:** What is the difference between Ruby and Python for web development?

**Source:** [six.txt:912–999](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Both Ruby and Python can build full-stack or small web applications. Compare Rails/Sinatra with Django/Flask by conventions, integrations, team skills and project constraints.

## SRC-00187 → [A-0281](A-ruby.md#a-0281)

**Question:** What is the difference between class variables (@@) and instance variables (@) in Ruby?

**Source:** [six.txt:1004–1138](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** @@variables are shared across an inheritance hierarchy; @variables belong to the current receiver, which may itself be a class object. Neither form is automatically thread-safe.

## SRC-00188 → [B-0139](B-rails.md#b-0139)

**Question:** What is the difference between Ruby on Rails and Sinatra?

**Source:** [six.txt:1139–1224](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Rails supplies integrated full-stack conventions; Sinatra supplies a smaller Rack-oriented routing DSL. Either can serve APIs, and application size alone is not a strict rule.

## SRC-00189 → [B-0394](B-rails.md#b-0394)

**Question:** What is the difference between nil?, empty?, and blank? in Ruby/Rails?

**Source:** [six.txt:1225–1315](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** nil? checks identity with nil, empty? is defined by collection-like types, and Active Support blank? combines false/nil, emptiness and whitespace semantics.

## SRC-00190 → [F-0048](F-advanced.md#f-0048)

**Question:** What is the difference between Ruby and JavaScript?

**Source:** [six.txt:1316–1394](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Ruby is class-based and commonly used on servers; JavaScript uses prototypes and runs in browsers and server runtimes. Both support multiple paradigms and asynchronous work through their runtimes/libraries.

## SRC-00191 → [F-0044](F-advanced.md#f-0044)

**Question:** What is the difference between method_missing and respond_to_missing?

**Source:** [six.txt:1395–1505](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** method_missing handles failed dispatch; respond_to_missing? declares corresponding dynamic capabilities to introspection. Unsupported names must fall through to super.

## SRC-00192 → [F-0049](F-advanced.md#f-0049)

**Question:** What is the difference between Ruby and PHP for web development?

**Source:** [six.txt:1506–1584](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Ruby and PHP can both build web services; Rails, Laravel and WordPress are ecosystems with different goals and conventions. Choose based on requirements and maintainable integration, not subjective syntax rankings.

## SRC-00193 → [C-0031](C-database-sql.md#c-0031)

**Question:** What is the difference between ActiveRecord and Mongoid?

**Source:** [six.txt:1585–1669](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- MongoDB/Mongoid support multi-document ACID transactions on suitable deployments. "Mongoid means eventual consistency/no migrations" is an inaccurate absolute; document schema changes still need migration/backfill planning.

**Corrected interview answer:** Active Record maps relational rows and associations; Mongoid maps MongoDB documents and supports embedding/references. Both require intentional schema, consistency and indexing design.

## SRC-00194 → [A-0229](A-ruby.md#a-0229)

**Question:** What is the difference between yield and call in Ruby?

**Source:** [six.txt:1670–1764](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** yield invokes a method’s supplied block; call invokes a callable object such as a Proc, lambda or Method. Capture &block when you need to store or forward it explicitly.

## SRC-00195 → [F-0047](F-advanced.md#f-0047)

**Question:** What is the difference between Ruby and Java?

**Source:** [six.txt:1765–1858](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Ruby is dynamically typed; Java is statically typed and typically compiled to JVM bytecode then interpreted/JIT-compiled. Both support server development, garbage collection and multiple deployment models.

## SRC-00196 → [A-0160](A-ruby.md#a-0160)

**Question:** What is the difference between require, require_relative, and load in Ruby?

**Source:** [six.txt:1859–1956](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** require finds and loads a feature once, require_relative resolves relative to the calling file, and load executes the specified file on every invocation.

## SRC-00197 → [A-0363](A-ruby.md#a-0363)

**Question:** What are the different types of variables in Ruby?

**Source:** [six.txt:1961–2074](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Local, instance (@), class (@@) and global ($) variables differ in ownership/scope; constants begin uppercase. Class-instance variables are ordinary @variables on class objects.

## SRC-00198 → [F-0046](F-advanced.md#f-0046)

**Question:** What is the difference between Ruby and Golang?

**Source:** [six.txt:2075–2160](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Go is statically typed and compiled with goroutines; Ruby is dynamically typed with class-based APIs and a different runtime model. Either can implement web services or microservices.

## SRC-00199 → [A-0066](A-ruby.md#a-0066)

**Question:** What are the different types of loops in Ruby?

**Source:** [six.txt:2161–2281](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Ruby supports while/until/for and iterator methods such as each, times, upto/downto and loop. break exits, next skips ahead and redo restarts the current iteration without rechecking the condition.

## SRC-00200 → [F-0051](F-advanced.md#f-0051)

**Question:** What is the difference between Ruby and Swift?

**Source:** [six.txt:2282–2352](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Swift is statically typed and compiled, commonly used for Apple platforms and also available elsewhere; Ruby is dynamically typed and commonly used for web/backend tools.

## SRC-00201 → [A-0125](A-ruby.md#a-0125)

**Question:** What are best practices for Ruby development?

**Source:** [six.txt:2353–2487](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Use clear interfaces, consistent style, focused tests, locked dependencies, safe input handling and measurement before optimization. Rails-specific MVC/routes are not universal requirements for every Ruby program.

## SRC-00202 → [F-0052](F-advanced.md#f-0052)

**Question:** What is the difference between Ruby and TypeScript?

**Source:** [six.txt:2488–2556](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** TypeScript adds compile-time checking to JavaScript and runs after compilation in JavaScript runtimes, including browsers and servers. Ruby remains dynamically typed, with optional external type tooling.

## SRC-00203 → [A-0324](A-ruby.md#a-0324)

**Question:** What is the difference between class_eval and instance_eval in Ruby?

**Source:** [six.txt:2557–2667](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- The source reverses the usual method-definition distinction and wrongly calls Person.new.instance_method after defining it on Person’s singleton class.

**Corrected interview answer:** class_eval/module_eval reopens the receiving class/module context; def inside defines instance methods. instance_eval changes self and def adds singleton methods to that object.

## SRC-00204 → [F-0045](F-advanced.md#f-0045)

**Question:** What is the difference between Ruby and Elixir?

**Source:** [six.txt:2668–2736](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Elixir runs on BEAM with immutable data and lightweight isolated processes; Ruby commonly uses mutable objects with threads/fibers/processes. Phoenix and Rails are separate web ecosystems.

## SRC-00205 → [A-0299](A-ruby.md#a-0299)

**Question:** What are the different types of gems in Ruby?

**Source:** [six.txt:2737–2828](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Gems are packages categorized informally by purpose, such as runtime, test, development, adapters and API clients; Bundler groups control where dependencies are used.

## SRC-00206 → [B-0085](B-rails.md#b-0085)

**Question:** What are best practices for Rails development?

**Source:** [six.txt:2829–2982](../ruby/six.txt)

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.

**Corrected interview answer:** Follow Rails conventions while keeping domain workflows explicit, input/authorization checks correct, database constraints authoritative and side effects reliable. Profile queries, paginate and test failure paths.

## SRC-00218 → [A-0270](A-ruby.md#a-0270)

**Question:** What are the levels of access control for Ruby methods?

**Source:** [seven.txt:43–51](../ruby/seven.txt)

- Updated private-method receiver rule: literal self is permitted in Ruby 2.7+; older blanket prohibition is outdated.

**Corrected interview answer:** Ruby methods have public, protected and private visibility. Public calls are unrestricted; protected calls require a compatible object context; private calls use an implicit receiver or literal self in Ruby 2.7+.

## SRC-00229 → [A-0228](A-ruby.md#a-0228)

**Question:** What is the difference between proc and lambda in Ruby?

**Source:** [seven.txt:230–250](../ruby/seven.txt)

- Corrected non-lambda Proc return target: defining method, not calling method.

**Corrected interview answer:** A block is code attached to a method call; a Proc object stores callable code. A lambda is a Proc with method-like argument checking and local return behavior, while an ordinary proc is lenient about positional arity and return exits its defining method.

## SRC-00247 → [A-0085](A-ruby.md#a-0085)

**Question:** Find the error in the following code and correct it.

**Source:** [eight.txt:60–72](../ruby/eight.txt)

- Source answer contradicts itself about whether puts should be used. Corrected to distinguish printing from returning.

**Corrected interview answer:** The shown greet method is valid Ruby. It prints a greeting and returns nil because puts returns nil.

## SRC-00273 → [A-0181](A-ruby.md#a-0181)

**Question:** Who is the developer of Ruby?

**Source:** [nine.txt:15–19](../ruby/nine.txt)

- Corrected creator nickname from Martz to Matz.

**Corrected interview answer:** Ruby was designed by Yukihiro Matsumoto, usually called Matz, and first publicly released in 1995.

## SRC-00284 → [A-0063](A-ruby.md#a-0063)

**Question:** Explain retry statement in Ruby?

**Source:** [nine.txt:96–101](../ruby/nine.txt)

- Corrected obsolete/wrong claim that retry restarts a whole loop.

**Corrected interview answer:** In modern Ruby retry is valid in a rescue clause and restarts the corresponding begin body; it does not restart an arbitrary loop.

## SRC-00289 → [A-0204](A-ruby.md#a-0204)

**Question:** In how many ways a block is written in Ruby?

**Source:** [nine.txt:120–127](../ruby/nine.txt)

- Corrected claim that both syntaxes always have identical functionality.

**Corrected interview answer:** Ruby blocks use { ... } or do ... end, but their binding precedence differs.

## SRC-00299 → [A-0355](A-ruby.md#a-0355)

**Question:** In how many ways you can compare Ruby string?

**Source:** [nine.txt:180–186](../ruby/nine.txt)

- Corrected casecmp return-value claim.

**Corrected interview answer:** Compare String values with == or eql?, order them with <=>, or use casecmp/casecmp? for case-insensitive comparison.

## SRC-00305 → [A-0105](A-ruby.md#a-0105)

**Question:** How to create a new time instance in Ruby?

**Source:** [nine.txt:231–236](../ruby/nine.txt)

- Corrected contradictory claim that Time.new always requires a year.

**Corrected interview answer:** Time.now or Time.new with no arguments returns the current time. Time.new(year, month, day, ...) constructs a specified calendar time.

## SRC-00310 → [A-0107](A-ruby.md#a-0107)

**Question:** How to read a file in Ruby?

**Source:** [nine.txt:284–311](../ruby/nine.txt)

- Corrected truncated method name and missing closure in examples.

**Corrected interview answer:** Use gets for one line, read for the remaining contents, and readlines for an array of remaining lines; File.foreach streams lines without loading the entire file.

## SRC-00311 → [A-0155](A-ruby.md#a-0155)

**Question:** What is sysread method in Ruby?

**Source:** [nine.txt:312–315](../ruby/nine.txt)

- Corrected claim that sysread opens a file in any mode.

**Corrected interview answer:** IO#sysread(length) performs a low-level read of up to a requested number of bytes from an already readable IO object.

## SRC-00313 → [A-0104](A-ruby.md#a-0104)

**Question:** How to check whether a directory exist or not in Ruby?

**Source:** [nine.txt:334–342](../ruby/nine.txt)

- Replaced removed Dir.exists? with Dir.exist?.

**Corrected interview answer:** Use Dir.exist?(path) to check whether a path names an existing directory.

## SRC-00329 → [A-0296](A-ruby.md#a-0296)

**Question:** Mention What Is The Difference Between A Gem And A Plugin In Ruby?

**Source:** [nine.txt:489–494](../ruby/nine.txt)

- Corrected outdated gem-versus-plugin location rule.

**Corrected interview answer:** A gem is a Ruby package. A plugin is an extension role or integration mechanism; modern Rails plugins are commonly packaged as gems, often with a Railtie or engine.

## SRC-00331 → [A-0045](A-ruby.md#a-0045)

**Question:** Explain About Float, Dig And Max?

**Source:** [nine.txt:501–508](../ruby/nine.txt)

- Corrected nonsensical Float/Dig/Max descriptions and capitalization.

**Corrected interview answer:** The intended names are Float, Float::DIG and Float::MAX. Float is Ruby’s floating-point numeric class; DIG describes guaranteed decimal precision, and MAX is the largest finite representable Float.

## SRC-00340 → [A-0047](A-ruby.md#a-0047)

**Question:** Explain About The Command Line Options?

**Source:** [nine.txt:543–546](../ruby/nine.txt)

- Flagged removed taint/safe-level option -T in old source.

**Corrected interview answer:** Common Ruby command-line options include -e for an expression, -r to require a library, -I to add a load path, -w for warnings, -c for syntax checking and -v for version information.

## SRC-00346 → [A-0270](A-ruby.md#a-0270)

**Question:** What Are The Three Levels Of Method Access Control For Classes And What Do They Signify? What Do They Imply About The Method?

**Source:** [nine.txt:578–585](../ruby/nine.txt)

- Updated private-method receiver rule: literal self is permitted in Ruby 2.7+; older blanket prohibition is outdated.

**Corrected interview answer:** Ruby methods have public, protected and private visibility. Public calls are unrestricted; protected calls require a compatible object context; private calls use an implicit receiver or literal self in Ruby 2.7+.

## SRC-00349 → [A-0270](A-ruby.md#a-0270)

**Question:** Name the three levels of access control for Ruby methods?

**Source:** [nine.txt:598–604](../ruby/nine.txt)

- Updated private-method receiver rule: literal self is permitted in Ruby 2.7+; older blanket prohibition is outdated.

**Corrected interview answer:** Ruby methods have public, protected and private visibility. Public calls are unrestricted; protected calls require a compatible object context; private calls use an implicit receiver or literal self in Ruby 2.7+.

## SRC-00354 → [A-0038](A-ruby.md#a-0038)

**Question:** Can you explain how Ruby looks up a method to invoke?

**Source:** [nine.txt:638–641](../ruby/nine.txt)

- Corrected nonexistent method_missing? name and oversimplified lookup order.

**Corrected interview answer:** Ruby follows the receiver’s method lookup chain, including singleton-class ancestry, prepended modules, its class, included modules and superclasses. If resolution fails it invokes method_missing.

## SRC-00357 → [A-0119](A-ruby.md#a-0119)

**Question:** Predict the output of the code below. Explain your answer?

**Source:** [nine.txt:668–675](../ruby/nine.txt)

- Corrected pasted typographic quote delimiters and clarified inspected output.

**Corrected interview answer:** After replacing typographic quotes with Ruby string delimiters, the lambda prints the inspected String "I’m a Proc".

## SRC-00365 → [A-0174](A-ruby.md#a-0174)

**Question:** What will be the value of:

**Source:** [nine.txt:762–770](../ruby/nine.txt)

- Incomplete source and inaccurate explanation: missing prior code; reading alone does not define a local.

**Corrected interview answer:** The preceding definitions of foo and bar are missing, so the exact defined? results cannot be determined.

## SRC-00369 → [A-0141](A-ruby.md#a-0141)

**Question:** Describe a closure in Ruby?

**Source:** [nine.txt:796–804](../ruby/nine.txt)

- Corrected suggestion that #binding simply alters a closure’s binding.

**Corrected interview answer:** A closure is executable code together with access to the local environment in which it was created. Ruby blocks, procs and lambdas capture surrounding locals and can outlive the defining call.

## SRC-00395 → [B-0278](B-rails.md#b-0278)

**Question:** How do you handle API versioning in Rails?

**Source:** [ten.txt:134–140](../ruby/ten.txt)

- Corrected claim that controller namespaces guarantee compatibility.

**Corrected interview answer:** Version APIs through an explicit strategy such as URL namespaces or media-type negotiation, and preserve the contract promised to existing consumers.

## SRC-00410 → [B-0301](B-rails.md#b-0301)

**Question:** Create a Rails controller action to find a User by their email address and render their profile. If the user is not found, render a 404 error.

**Source:** [ten.txt:206–227](../ruby/ten.txt)

- Corrected ambiguous render status: :not_found and unrestricted full-model serialization.

**Corrected interview answer:** Find the authorized User by email and render explicit profile fields; if no user exists, return a defined 404 JSON response.

## SRC-00417 → [D-0078](D-coding.md#d-0078)

**Question:** Implement a method that reverses a given string without using built-in methods.

**Source:** [ten.txt:295–311](../ruby/ten.txt)

- Corrected typographic quote syntax, quadratic construction and ambiguous built-in restriction.

**Corrected interview answer:** Clarify that “without built-in methods” normally forbids the convenience reverse operation, then implement the reversal with explicit traversal.

## SRC-00433 → [F-0058](F-advanced.md#f-0058)

**Question:** Why is Ruby known as a flexible language?

**Source:** [eleven.txt:151–156](../ruby/eleven.txt)

- Corrected unsupported implication that Numeric has a built-in plus method.

**Corrected interview answer:** Metaprogramming lets Ruby programs define or inspect behavior at runtime, using tools such as define_method, singleton methods, reflection and module composition.

## SRC-00436 → [A-0133](A-ruby.md#a-0133)

**Question:** What are the naming conventions in Ruby?

**Source:** [eleven.txt:182–190](../ruby/eleven.txt)

- Corrected conflation of Ruby syntax rules with Rails naming conventions.

**Corrected interview answer:** Ruby conventionally uses snake_case for methods/locals and CamelCase for classes/modules. Rails adds conventions such as plural snake_case tables and singular model classes.

## SRC-00444 → [F-0081](F-advanced.md#f-0081)

**Question:** Explain Singleton Methods and Metaprogramming.

**Source:** [thirteen.txt:60–83](../ruby/thirteen.txt)

- Corrected source’s misleading claim about Rails generating per-instance singleton attribute methods.

**Corrected interview answer:** Singleton methods are per-object behavior; Rails attribute methods use metaprogramming, but ordinary Active Record attributes are not generally implemented by hand-defining singleton methods on every retrieved record.

## SRC-00452 → [A-0083](A-ruby.md#a-0083)

**Question:** Explain When to Employ and / or vs. && / ||.

**Source:** [thirteen.txt:160–173](../ruby/thirteen.txt)

- Corrected nonworking File.open(... ) or die example.

**Corrected interview answer:** and/or and &&/|| short-circuit but have different precedence, especially relative to assignment.

## SRC-00457 → [A-0060](A-ruby.md#a-0060)

**Question:** Explain Not Using Idiomatic Ruby.

**Source:** [thirteen.txt:273–283](../ruby/thirteen.txt)

- Corrected supposedly equivalent String-key-to-Symbol-key style transformation.

**Corrected interview answer:** Idiomatic Ruby favors clear Enumerable operations, consistent method-call syntax and explicit distinction between text keys and identifier keys.

## SRC-00505 → [A-0371](A-ruby.md#a-0371)

**Question:** What is nil, and what counts as false in Ruby?

**Source:** [nineteen.txt:163–177](../ruby/nineteen.txt)

- Corrected inference that absence of explicit return commonly implies nil: a nonempty method returns its final expression.

**Corrected interview answer:** nil represents absence; only nil and false are falsy, while 0, "" and [] are truthy.

## SRC-00528 → [A-0270](A-ruby.md#a-0270)

**Question:** What are public, private, and protected methods?

**Source:** [nineteen.txt:530–546](../ruby/nineteen.txt)

- Updated private-method receiver rule: literal self is permitted in Ruby 2.7+; older blanket prohibition is outdated.

**Corrected interview answer:** Ruby methods have public, protected and private visibility. Public calls are unrestricted; protected calls require a compatible object context; private calls use an implicit receiver or literal self in Ruby 2.7+.

## SRC-00546 → [A-0264](A-ruby.md#a-0264)

**Question:** Walk through Ruby's object model: classes, metaclasses, and BasicObject.

**Source:** [nineteen.txt:854–866](../ruby/nineteen.txt)

- Corrected invalid 5.singleton_class example and “each object has its own singleton class” overstatement.

**Corrected interview answer:** Ruby values have classes, and class objects are instances of Class. Class inherits Module, then Object, with BasicObject at the root; ordinary object-specific methods live in singleton classes.

## SRC-00560 → [A-0280](A-ruby.md#a-0280)

**Question:** What is the contract between eql? and hash for custom objects used as hash keys?

**Source:** [nineteen.txt:1049–1069](../ruby/nineteen.txt)

- Corrected potential eql?/hash contract mismatch in source’s numeric-coordinate example.

**Corrected interview answer:** If a.eql?(b) is true, a.hash must equal b.hash. Hash collisions are allowed, but equal keys must agree on their hash.

## SRC-00615 → [A-0152](A-ruby.md#a-0152)

**Question:** What is Ruby, and why is it popular for web development?

**Source:** [twentyfour.txt:7–39](../ruby/twentyfour.txt)

- Removed unsupported claims about “Mediterranean quality”, code rearrangement, and Rails introducing many-to-many relationships.

**Corrected interview answer:** Ruby is a dynamically typed, object-oriented language designed by Yukihiro Matsumoto. Its values are objects, and blocks, modules, open classes and readable syntax support expressive programs.

## SRC-00616 → [A-0093](A-ruby.md#a-0093)

**Question:** How do you create a Ruby script file and execute it on a command line?

**Source:** [twentyfour.txt:40–97](../ruby/twentyfour.txt)

- Corrected nonportable backgrounding advice and unsupported require "shell"/Shell#open browser example.

**Corrected interview answer:** Save code in a .rb file and execute ruby filename.rb. Read script arguments from ARGV and interactive standard input from $stdin.

## SRC-00619 → [A-0290](A-ruby.md#a-0290)

**Question:** How are constants declared and what is their scope in Ruby?

**Source:** [twentyfour.txt:152–202](../ruby/twentyfour.txt)

- Corrected global-scope claim, unsupported warning invocation and claim that freeze prohibits constant reassignment.

**Corrected interview answer:** A Ruby constant starts with an uppercase letter and is resolved through lexical and namespace rules. Reassignment is possible and usually warns; freezing its referenced value does not prevent rebinding.

## SRC-00621 → [A-0216](A-ruby.md#a-0216)

**Question:** What are Ruby iterators and how do they work?

**Source:** [twentyfour.txt:236–361](../ruby/twentyfour.txt)

- Corrected String#grep misuse, each return-value claim, collect distinction, String#upto star output and “step indents” claim.

**Corrected interview answer:** Ruby iterators call a block repeatedly. each performs side effects, map/collect builds transformed results, select/reject filters, reduce/inject accumulates and each_with_index supplies positions.

## SRC-00622 → [A-0088](A-ruby.md#a-0088)

**Question:** How are errors handled in Ruby?

**Source:** [twentyfour.txt:362–415](../ruby/twentyfour.txt)

- Corrected exception hierarchy, claim that every custom exception is rescued automatically, and check-before-read race.

**Corrected interview answer:** Handle expected exceptions with targeted rescue clauses, clean up with ensure and raise meaningful StandardError subclasses for recoverable application failures.

## SRC-00623 → [A-0236](A-ruby.md#a-0236)

**Question:** Describe the difference between local, instance, and class variables.

**Source:** [twentyfour.txt:416–494](../ruby/twentyfour.txt)

- Corrected invalid naming regex, variable access-control claim, local lifetime claim (closures retain locals) and instance-variable external visibility.

**Corrected interview answer:** Ruby has local variables (name), instance variables (@name), class variables (@@name) and globals ($name). Constants begin with a capital letter and follow separate lookup rules.

## SRC-00624 → [A-0265](A-ruby.md#a-0265)

**Question:** What are Ruby's accessor methods?

**Source:** [twentyfour.txt:495–523](../ruby/twentyfour.txt)

- Source declares both attr_reader and attr_writer, so name=/age= assignments succeed; the comments claiming errors are wrong.

**Corrected interview answer:** attr_reader defines a getter, attr_writer defines a setter and attr_accessor defines both for an instance variable. They generate methods, not database columns or validations.

## SRC-00625 → [F-0094](F-advanced.md#f-0094)

**Question:** How does garbage collection work in Ruby?

**Source:** [twentyfour.txt:524–560](../ruby/twentyfour.txt)

- Removed unsupported Ruby 2.6 “trashcan” and context-dependent reference-counting/hybrid claims; count_objects[:FREE] is not a collector-enabling API.

**Corrected interview answer:** Ruby automatically reclaims unreachable objects. Modern CRuby uses a generational, incremental mark-and-sweep collector and supports compaction; this is an implementation detail rather than a guarantee for every Ruby runtime.

## SRC-00626 → [A-0068](A-ruby.md#a-0068)

**Question:** Explain the difference between 'gets.chomp' and 'gets.strip'.

**Source:** [twentyfour.txt:561–585](../ruby/twentyfour.txt)

- Corrected false claim that chomp removes all trailing whitespace.

**Corrected interview answer:** chomp removes a record separator, normally one line ending; strip removes leading and trailing whitespace. Neither is interchangeable with the other.

## SRC-00629 → [F-0084](F-advanced.md#f-0084)

**Question:** How does Ruby support metaprogramming?

**Source:** [twentyfour.txt:674–756](../ruby/twentyfour.txt)

- Corrected nonworking visibility example, recursive method_missing risk, unsafe eval localization recommendation and overstatement that method_missing is the heart of duck typing.

**Corrected interview answer:** Metaprogramming lets Ruby programs define or inspect behavior at runtime, using tools such as define_method, singleton methods, reflection and module composition.

## SRC-00631 → [E-0002](E-scenarios.md#e-0002)

**Question:** Consider the scenario below and answer the following questions:

**Source:** [eighteen.txt:17–78](../ruby/eighteen.txt)

- Source claim that service classes have no business-domain knowledge is not a requirement and is often incorrect.

**Corrected interview answer:** For notes shared across many models, use a polymorphic Note association with a cohesive Noteable concern, or delegate a workflow to a service/form object when it crosses model boundaries.

## SRC-00635 → [D-0092](D-coding.md#d-0092)

**Question:** Write code that splits a given array of integers into two arrays; the first containing odd numbers and second containing even numbers.

**Source:** [eighteen.txt:143–182](../ruby/eighteen.txt)

- Corrected invalid source expression %i|select reject|.map { |m| array.partition(&odd?)}.

**Corrected interview answer:** Use partition(&:odd?) to return the odd elements and the even elements in one traversal.

## SRC-00639 → [D-0072](D-coding.md#d-0072)

**Question:** Build an array based on the following scenario.

**Source:** [eighteen.txt:251–267](../ruby/eighteen.txt)

- The source index-free flattening examples depend on insertion order and can silently extract the wrong data.

**Corrected interview answer:** With the stated aN/bN/cN key convention, use map and dig with the position-derived keys to obtain the nested values.

## SRC-00640 → [E-0059](E-scenarios.md#e-0059)

**Question:** Consider the following scenario related to variables.

**Source:** [eighteen.txt:268–282](../ruby/eighteen.txt)

- Corrected the source’s inaccurate eigenclass/class-membership explanation.

**Corrected interview answer:** Inside class << self, self is Foo’s singleton class, so @foo belongs to that singleton-class object, not to an instance of Foo and not to Foo itself.

## SRC-00674 → [A-0270](A-ruby.md#a-0270)

**Question:** Can you tell me the three levels of method access control for classes and modules?  What do they imply about the method?

**Source:** [sixteen.txt:90–132](../ruby/sixteen.txt)

- Visibility and class-variable sharing require precise Ruby context/inheritance rules; see corrected answer rather than the source’s simplified class-only statement.

**Corrected interview answer:** Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.

## SRC-00711 → [A-0156](A-ruby.md#a-0156)

**Question:** What is the best thing which you find about Ruby on Rail so far?

**Source:** [thirty.txt:109–111](../ruby/thirty.txt)

- Corrected unsupported source claim that metaprogramming makes heavy tasks take no time.

**Corrected interview answer:** Give a specific benefit from your own work, such as Rails’ conventions and integrated tooling reducing repeated application plumbing.

## SRC-00834 → [D-0037](D-coding.md#d-0037)

**Question:** What will be the output of the following code?

**Source:** [thirtyfive.txt:135–145](../ruby/thirtyfive.txt)

- Corrected source’s unconditional claim that User.count must be 1.

**Corrected interview answer:** The output is the total number of rows after the save attempt; it is 1 only under extra assumptions such as an initially empty table and a successful save.

## SRC-00996 → [B-0248](B-rails.md#b-0248)

**Question:** The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.

<%= form_tag products_path do %>
  <%= label_tag :name, "Product Name" %>
  <%= text_field_tag :name %>

  <%= label_tag :price, "Price" %>
  <%= text_field_tag :price %>

  <%= submit_tag "Add Product" %>
<%= end_form_tag %>
Code language: HTML, XML (xml)

**Source:** [thirtyone.txt:91–118](../ruby/thirtyone.txt)

- Corrected invalid end_form_tag; form_tag is not intrinsically wrong.

**Corrected interview answer:** Replace the nonexistent end_form_tag with the ERB block terminator <% end %>. form_tag itself is valid legacy helper syntax.

## SRC-00998 → [B-0250](B-rails.md#b-0250)

**Question:** The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

class Product < ApplicationRecord
  belongs_to :category
end

class Category < ApplicationRecord
  has_many :products
end
Code language: CSS (css)

**Source:** [thirtyone.txt:141–164](../ruby/thirtyone.txt)

- Source invents an optionality requirement and presents valid code as logically incorrect.

**Corrected interview answer:** The associations shown already form a valid one-to-many relationship. Add optional: true only if the business permits a product with no category.

## SRC-01012 → [B-0253](B-rails.md#b-0253)

**Question:** The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify the error

and fix the code.

# Models
class Article < ApplicationRecord
  belongs_to :author
end

class Author < ApplicationRecord
  has_many :articles
end

# Controller
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
end

# View (index.html.erb)
<% @articles.each do |article| %>
  <p><%= article.title %> - <%= article.author.name %></p>
<% end %>
Code language: CSS (css)

**Source:** [thirtyone.txt:533–585](../ruby/thirtyone.txt)

- Source conflates an N+1 performance problem with incorrect display.

**Corrected interview answer:** The association access can display correctly; the observed problem in the snippet is N+1 query behavior, not an inherently incorrect author name.

## SRC-01171 → [A-0270](A-ruby.md#a-0270)

**Question:** Can you tell me the three levels of method access control for classes and modules? What do they imply about the method?

**Source:** [twentyeight.txt:151–189](../ruby/twentyeight.txt)

- Visibility and class-variable sharing require precise Ruby context/inheritance rules; see corrected answer rather than the source’s simplified class-only statement.

**Corrected interview answer:** Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.

## SRC-01362 → [A-0270](A-ruby.md#a-0270)

**Question:** What are access modifiers in Ruby?

**Source:** [twentytwo.txt:256–259](../ruby/twentytwo.txt)

- Visibility and class-variable sharing require precise Ruby context/inheritance rules; see corrected answer rather than the source’s simplified class-only statement.

**Corrected interview answer:** Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.

## SRC-01366 → [B-0395](B-rails.md#b-0395)

**Question:** What is the difference between string and text in Rails?

**Source:** [twentytwo.txt:273–275](../ruby/twentytwo.txt)

- Corrected obsolete or database-dependent limitation claims; modern Rails supports foreign keys/multiple databases and text has no universal 30,000-character cap.

**Corrected interview answer:** string and text are schema types that normally map to a length-limited character column and a larger text column; exact storage/limits depend on the database and migration options.

## SRC-01370 → [B-0076](B-rails.md#b-0076)

**Question:** What are the limits of Ruby on Rails?

**Source:** [twentytwo.txt:287–293](../ruby/twentytwo.txt)

- Corrected obsolete or database-dependent limitation claims; modern Rails supports foreign keys/multiple databases and text has no universal 30,000-character cap.

**Corrected interview answer:** Rails is an opinionated web framework with trade-offs in runtime resources, conventions and coupling; it is not limited by a blanket inability to use foreign keys or multiple databases.

## SRC-01372 → [B-0359](B-rails.md#b-0359)

**Question:** What is the problem with the following controller code? How would you fix it?

**Source:** [twentytwo.txt:298–317](../ruby/twentytwo.txt)

- Corrected obsolete universal non-GC-symbol claim and malformed available option keys expression.
- Outdated: modern Ruby can garbage-collect dynamically created symbols; input allowlisting remains advisable.

**Corrected interview answer:** Filter the allowed parameter keys directly instead of converting every untrusted key to a symbol; in a controller, use permit when these values will be mass-assigned.

## SRC-01395 → [B-0014](B-rails.md#b-0014)

**Question:** Explain ORM in Ruby on Rails?

**Source:** [twentythree.txt:29–31](../ruby/twentythree.txt)

- The original expands ORM incorrectly; it means Object-Relational Mapping.

**Corrected interview answer:** Active Record is Rails’ Object-Relational Mapping layer: model classes usually represent tables, instances represent rows, and attributes represent columns.

## SRC-01398 → [B-0309](B-rails.md#b-0309)

**Question:** Explain the role of the sub-directory app/controller and app/helper.

**Source:** [twentythree.txt:44–46](../ruby/twentythree.txt)

- Corrected singular directory names to app/controllers and app/helpers.

**Corrected interview answer:** Controllers in app/controllers coordinate HTTP requests; helper modules in app/helpers provide reusable presentation methods for views.

## SRC-01415 → [A-0170](A-ruby.md#a-0170)

**Question:** What is the Role of Load and Require in Ruby?

**Source:** [twentythree.txt:162–164](../ruby/twentythree.txt)

- Corrected load versus require: both execute code; require caches loaded features.

**Corrected interview answer:** load executes a Ruby file every time; require loads a feature only when it has not already been required.

## SRC-01416 → [B-0023](B-rails.md#b-0023)

**Question:** Explain what Delete does in Ruby on Rails.

**Source:** [twentythree.txt:165–175](../ruby/twentythree.txt)

- Corrected the claim that destroy invokes normal validations; it invokes destruction callbacks.

**Corrected interview answer:** delete removes an Active Record row directly without model destruction callbacks; delete_all performs a relation-level bulk DELETE.

## SRC-01422 → [B-0344](B-rails.md#b-0344)

**Question:** What do you mean by Render and Redirect_to?

**Source:** [twentythree.txt:204–242](../ruby/twentythree.txt)

- Corrected malformed pasted Ruby and added a validation-failure status in the example.

**Corrected interview answer:** render creates a response within the current request; redirect_to sends a redirect so the client makes a new request.

## SRC-01424 → [B-0131](B-rails.md#b-0131)

**Question:** What is the difference between After_save and After_commit?

**Source:** [twentythree.txt:256–258](../ruby/twentythree.txt)

- Corrected the missing transaction-timing distinction between after_save and after_commit.

**Corrected interview answer:** after_save runs after a create/update save within its surrounding transaction; after_commit runs only when that transaction has committed, including configured destroy events.

## SRC-01425 → [B-0351](B-rails.md#b-0351)

**Question:** What is an Asset Pipeline in Rails?

**Source:** [twentythree.txt:259–268](../ruby/twentythree.txt)

- Corrected Sprockets-era pipeline behavior for the Rails 8 Propshaft default.

**Corrected interview answer:** An asset pipeline manages static asset discovery and fingerprinted URLs; exact bundling and preprocessing behavior depends on the configured tools and Rails version.

## SRC-01429 → [B-0135](B-rails.md#b-0135)

**Question:** What is the difference between has_many :through and has_and_belongs_to_many and which one is better?

**Source:** [twentythree.txt:308–325](../ruby/twentythree.txt)

- Corrected the implication that declaring HABTM automatically creates its join table.

**Corrected interview answer:** Use has_and_belongs_to_many for a simple many-to-many join table; use has_many :through when the relationship needs its own model, behavior, validations, or extra data.

## SRC-01430 → [B-0009](B-rails.md#b-0009)

**Question:** Do you know about Activestorage in Ruby on Rails and How can you use this?

**Source:** [twentythree.txt:326–336](../ruby/twentythree.txt)

- Qualified Azure storage support: the built-in service was removed in Rails 8.1.

**Corrected interview answer:** Active Storage attaches files to Active Record models and delegates storage to a configured service, such as local disk or S3.

## SRC-01432 → [A-0282](A-ruby.md#a-0282)

**Question:** What is the difference between super and super() Call?

**Source:** [twentythree.txt:399–459](../ruby/twentythree.txt)

- Corrected superclass-only wording: super follows the method ancestor chain.

**Corrected interview answer:** Bare super forwards the current method’s arguments to the next implementation; super() sends no positional or keyword arguments.

## SRC-01433 → [B-0241](B-rails.md#b-0241)

**Question:** What are the different types of Association in Rails?

**Source:** [twentythree.txt:460–468](../ruby/twentythree.txt)

- Corrected belongs_to as not inherently enforcing a one-to-one database relationship.

**Corrected interview answer:** Rails associations describe object relationships: belongs_to, has_one, has_many, has_many :through, has_one :through, and has_and_belongs_to_many.

## SRC-01434 → [B-0038](B-rails.md#b-0038)

**Question:** Explain with the help of an example Skip Callback in Rails.

**Source:** [twentythree.txt:469–500](../ruby/twentythree.txt)

- Corrected skip_callback as class-wide registration mutation, not an instance-only temporary switch.

**Corrected interview answer:** skip_callback changes a class’s registered callback chain; it is not a temporary switch for one record.

## SRC-01435 → [B-0105](B-rails.md#b-0105)

**Question:** What do you mean by Concerns in Rails?

**Source:** [twentythree.txt:501–545](../ruby/twentythree.txt)

- Corrected uppercase End and broken pasted code in the concern example.

**Corrected interview answer:** A Rails concern is a module used to share a cohesive behavior; ActiveSupport::Concern adds inclusion hooks and class-method support.

## SRC-01436 → [B-0024](B-rails.md#b-0024)

**Question:** Explain what Destroy does in Ruby on Rails.

**Source:** [twentythree.txt:546–564](../ruby/twentythree.txt)

- Corrected unconditional cascading deletion, validations, and transaction irreversibility claims.

**Corrected interview answer:** destroy runs destruction callbacks and deletes a persisted record if the callbacks allow it; dependent association behavior follows its configuration.

## SRC-01442 → [A-0141](A-ruby.md#a-0141)

**Question:** What is Clouser in Ruby on Rails?

**Source:** [twentythree.txt:687–717](../ruby/twentythree.txt)

- Corrected closure terminology and explained binding capture rather than value snapshots.

**Corrected interview answer:** A closure is executable code that retains access to the lexical bindings from where it was defined; Ruby blocks, Procs, and lambdas provide this behavior.

## SRC-01443 → [A-0103](A-ruby.md#a-0103)

**Question:** How is Ruby different from Python?

**Source:** [twentythree.txt:718–745](../ruby/twentythree.txt)

- Corrected multiple Ruby/Python table claims: Python OOP, mixins, match/case, Ruby elsif, and IDE myths.

**Corrected interview answer:** Ruby and Python are dynamic object-oriented languages; their syntax, object models, block conventions, method lookup and ecosystems differ.

## SRC-01550 → [B-0364](B-rails.md#b-0364)

**Question:** Which of the following statements best describes the primary function of the Rails asset pipeline?

**Source:** [twentyseven.txt:882–893](../ruby/twentyseven.txt)

- Version-qualified MCQ: its asset-pipeline option is outdated for default Propshaft applications.

**Corrected interview answer:** Option 2: To compile, minify, and concatenate static assets like CSS, JavaScript, and images for improved performance.

