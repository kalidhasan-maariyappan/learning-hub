# Core-source review

All seven assigned files have been fully processed. This is a partition report, not a claim about the entire collection.

| Source | Original question occurrences |
| --- | ---: |
| first.txt | 100 |
| second.txt | 21 |
| three.txt | 30 |
| four.txt | 10 |
| five.txt | 15 |
| six.txt | 30 |
| twelve.txt | 10 |
| Total | 216 |

`records.json` retains each original occurrence, including repeated questions. Every record has a source file and one-based line range, a full question body, unabridged cleaned source answer, corrected direct answer, explanation, separate example, important points and issue annotations. HTML questions additionally have character offsets to resolve containers sharing a source line. Examples declare their language: some are terminal commands or explicitly hypothetical architectural scenarios, not Ruby programs.

The original content in `sourceAnswer` is evidence, not an endorsed answer. Use the corrected `directAnswer`, `explanation`, `example` and `importantPoints` for study; original mistakes remain visible for traceability. No source files were changed. Site layout, sharing controls, view counts, dates, copy controls and promotional conclusions are classified as nontechnical in `audit.json`. Technical material was not discarded.

`second.txt` and `six.txt` are HTML. Their complete question bodies, code, answer paragraphs and detailed explanations were decoded before review. In particular, code-heavy/deictic prompts in `second.txt` retain the code in the question field; they must not be merged merely because they begin “Consider the following code.” `six.txt` contains code intermixed with prose, tables, escaped quotes and broken single-quoted interpolation; corrected examples are separate from this preserved source material.

`first.txt` refers to six unavailable JPEG images, affecting four question occurrences. Their filenames and source lines are reported in the audit. Replacement examples are authored, not reconstructed claims about those images. `five.txt` contains six effectively unanswered prompts and a protected-access TODO; all have explicit completions or qualified interview guidance. Speculative ecosystem/future questions are preserved and labeled as such instead of inventing an adoption claim or language roadmap.

Notable corrections include operator precedence; Proc capture of self; closures observing updated bindings; subclass overrides of private methods; shallow clone/dup semantics; singleton class versus Singleton pattern; CRuby versus CPython and native threading; lexical refinement activation; live-object GC marking; dynamic symbol GC; module state and super; class_eval/instance_eval method placement; Ruby 2.6 MJIT versus Ruby 3.1 YJIT; Rails observer/page-cache extraction; serverless provider support; and Mongoid multi-document transactions. Coding fixes include the even-length strings example, repeated-word counts and Fibonacci output/length. Word-count output in three.txt is already correct and was verified as six words.

Verification: `ruby verify.rb` passes under CRuby 4.0.1, compiling 169 Ruby examples and checking 11 concrete correction assertions. Rails-dependent snippets, external libraries, Bash/ERB examples and architectural scenarios were reviewed but not executed as an installed Rails application. Official reference URLs are attached to the relevant records. Development-version documentation is used only for behavior stable in the supported Ruby examples; the installed runtime is recorded by the verification script.

Regeneration order: `node extract.cjs`, `node enrich.cjs`, `node audit.cjs`, `ruby verify.rb` from the repository root using the full relative script paths. The extract/enrich/audit scripts perform no source edits or external publication.
