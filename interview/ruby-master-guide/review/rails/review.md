# Rails-source review

This review read all 17 assigned text files completely and retained 762 source occurrences. Duplicates are deliberately retained here for the master guide’s global consolidation. Every occurrence includes its filename, physical line range, complete cleaned source answer, a reviewed direct answer, explanation, practical example and difficulty/category labels.

The collection’s advertised titles are not used as extraction counts. For example, `thirtysix.txt` advertises 100 questions but contains 15 expanded numbered prompts, and `thirtyfour.txt` contains both a long unanswered question list and a partially answered section. `thirtyeight.txt` contains 71 list prompts plus 15 repeated questions with answers. `twentysix.txt` embeds a separate service-object question inside its concerns answer; that occurrence is recorded separately with an intentionally overlapping source line.

Source answers are preserved independently from reviewed answers. They can contain incorrect code, formatting artifacts and embedded marketing text; those preserved fields are provenance, not a recommendation to execute them.

## Important source defects

- `eighteen.txt`: invalid odd/even expression; flattening that corrupts array-valued leaves; underspecified reverse-flattening/key-collision rules; incomplete Symbol-to-Proc implementation and invalid positive test; hash insertion-order assumptions; inaccurate eigenclass membership description; exception flow omitted from an output exercise.
- `thirtyone.txt`: multiple questions invent defects in valid code, and some before/after “fixes” are identical. Optional `belongs_to` is a business rule rather than a universal fix; form closing syntax, strong parameters, Turbo versus Rails-UJS deletion, and N+1 performance are treated separately. Cookie sessions are not always stored server-side.
- `thirtysix.txt`: a Python-like controller example appears in a Rails answer, parameters are falsely said to be automatically type-validated, Ruby `public` is misrepresented as an authentication bypass, GET routing defaults are invented, and a destructive database-reset web action is presented as an ordinary pattern. The reviewed answer corrects these claims.
- `thirtyfive.txt`: the count-after-save answer needs an initial database state and successful persistence; a duplicate route is redundant rather than a syntax error. Modern enum declaration syntax and callback timing are clarified.
- `twentytwo.txt`: obsolete symbol-GC claims; wrong ORM expansion; string/text limit myths; obsolete foreign-key/multiple-database limitations; wrong Hash equality description; malformed symbols and historical generator commands. Several MCQs are ambiguous or missing quotes.
- `twenty.txt`: missing source screenshots prevent exact reconstruction of two code prompts. The weekday/weekend question omits its schedule. Integer arithmetic, callback normalization, authorization versus permitted input, and modern database-backed jobs are clarified.
- Several files use legacy assets, RJS, WEBrick, observers, old plugin layouts, old migration commands or retired library names. Version-specific behavior is explained rather than silently generalized.

## Verification

`verify_examples.rb` executed successfully using local Ruby 4.0.1, with 18 assertions covering the corrected arithmetic, empty input, partition, nested flattening with array leaves, Symbol-callable forwarding, nested key extraction, eigenclass state, default arguments, hash keys/values and malformed MCQ interpretation.

The Rails examples were reviewed against framework documentation and source context but were not executed against an installed Rails application. The sample GraphQL endpoint was not called; live availability or integration success is not claimed. Missing screenshots, ambiguous MCQ choices, time-dependent career claims and underspecified requirements remain explicitly identified.

## Primary documentation consulted

- [Ruby Proc](https://docs.ruby-lang.org/en/master/Proc.html)
- [Ruby modules and classes](https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html)
- [Active Record query interface](https://guides.rubyonrails.org/active_record_querying.html)
- [Active Record collection proxy](https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html)
- [Action Controller overview](https://guides.rubyonrails.org/action_controller_overview.html)
- [Rails security](https://guides.rubyonrails.org/security.html)
- [Asset pipeline](https://guides.rubyonrails.org/asset_pipeline.html)
- [Rails 8 release notes](https://guides.rubyonrails.org/8_0_release_notes.html)

Regenerate this review with `node extract.js`, `node enrich.js`, then `node finalize.js` from this directory. Regeneration reads original source files; it does not modify them.
