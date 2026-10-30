# Source ledger: five.txt

SHA-256: `a2c56d7d6727d3fe6699d4a901475e75912d3e9170eed31ab14b1dd2c0d46794`

63 physical lines; 15 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00162 | 3–6 | [A-0285](../A-ruby.md#a-0285) | What is the function of modules in Ruby? |
| SRC-00163 | 7–10 | [A-0196](../A-ruby.md#a-0196) | What is the difference between a module and class? |
| SRC-00164 | 11–17 | [A-0322](../A-ruby.md#a-0322) | What is the difference between _extend_ and _include_? |
| SRC-00165 | 18–23 | [A-0270](../A-ruby.md#a-0270) | What are the three levels of method access control available in Ruby? |
| SRC-00166 | 24–29 | [A-0214](../A-ruby.md#a-0214) | What are Procs in Ruby?  How do they compare to closures in JS? |
| SRC-00167 | 30–33 | [A-0101](../A-ruby.md#a-0101) | How do you handle exceptions in Ruby code? |
| SRC-00168 | 34–39 | [A-0182](../A-ruby.md#a-0182) | Why is it advised to rescue from _StandardError_ rather than _Exception_? |
| SRC-00169 | 40–44 | [A-0372](../A-ruby.md#a-0372) | What is the difference between `and`/`or` and `&&`/`\|\|`?  What is the result of `a = nil and true`? |
| SRC-00170 | 45–51 | [B-0396](../B-rails.md#b-0396) | What values are "falsey" in Rails?  Or, which values are "truthy"?  What is the result of `a = 0 \|\| 1`? |
| SRC-00171 | 52–55 | [F-0053](../F-advanced.md#f-0053) | What is the function of `method_missing`?  How is it used in meta-programming in Ruby? |
| SRC-00172 | 56–59 | [F-0040](../F-advanced.md#f-0040) | What is a DSL (Domain Specific Language) and why is Ruby a popular language to build DSLs in? |
| SRC-00173 | 60–60 | [A-0298](../A-ruby.md#a-0298) | What are RubyGems?  Got any favourites? |
| SRC-00174 | 61–61 | [B-0121](../B-rails.md#b-0121) | What is Rails good at?  What is it not so good at? |
| SRC-00175 | 62–62 | [B-0080](../B-rails.md#b-0080) | List some things you would change about Rails |
| SRC-00176 | 63–63 | [B-0365](../B-rails.md#b-0365) | How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...) |

## Complete original text

```text
# Modules

**Q: What is the function of modules in Ruby?**

A: To provide namespaces.  To provide a mechanism for multiple inheritance.  To facilitate code reuse.

**Q: What is the difference between a module and class?**

A: A module cannot be instantiated.

**Q: What is the difference between _extend_ and _include_?**

A: _extend_ adds the instance methods of a module to a class as class methods.
   _include_ adds the instance methods of a module to a class as instance methods.

# Methods & blocks

**Q: What are the three levels of method access control available in Ruby?**

A: _private_: These methods are not accessible on instances of the class.  They are only accessible internally when the receiver is _self_.
   _protected_: These methods are accessible internally to the class and within subclasses of the class. (TODO: expand answer)
   _public_: These methods are accessible everywhere, including on the instance.
   
**Q: What are Procs in Ruby?  How do they compare to closures in JS?**

A: A Proc is essentially an anonymous function encapsulated as an object which can be passed around as a variable.  Procs have access to the local variables from the context in which they were defined.  Unlike in JS they do not have access to the _self_ (analygous to _this_) of the context.

# Exception handling

**Q: How do you handle exceptions in Ruby code?**

A: Using _begin_ and _rescue_

**Q: Why is it advised to rescue from _StandardError_ rather than _Exception_?**

A: `StandardError` is a subclass of `Exception`.  Rescuing `Exception` rescues program signalling exceptions which are needed to signal, for example when a program should shut down.

# Operators / Truthiness

**Q: What is the difference between `and`/`or` and `&&`/`||`?  What is the result of `a = nil and true`?**

A: `and` and `or` have higher precedence than the assignment operator (`=`) whereas `&&` and `||` have lower precedence.
   The result is that `a` is assigned the value `nil` and the result of the expression is `nil`.
   
**Q: What values are "falsey" in Rails?  Or, which values are "truthy"?  What is the result of `a = 0 || 1`?**

A: Only `false` and `nil` evaluate to false.  Everything else is "truthy".
   The result is that `a` is assigned the value `0` and the result of the expression is `0`.
   
# Metaprogramming

**Q: What is the function of `method_missing`?  How is it used in meta-programming in Ruby?

Poor performance.

**Q: What is a DSL (Domain Specific Language) and why is Ruby a popular language to build DSLs in?

# TODO Other Questions

* What are RubyGems?  Got any favourites?
* What is Rails good at?  What is it not so good at?
* List some things you would change about Rails
* How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)
```
