# Integration QA

Review date: 2026-10-31. This report describes the 1,575-occurrence / 1,258-question draft inspected before final Rails repairs and the additional merge approvals. Counts and issue status must be refreshed after the final build.

## Checks completed

- Inspected all 122 groups in `review/merge-review.json`, including every group containing multiple differently worded questions. No material overmerge was identified in that snapshot. Code/output questions remain contextual and were not folded into unrelated bare output prompts.
- Checked the master index, category generation, question JSON structure, source ledgers and reviewed variant rendering. Full question bodies, code contexts and original source material remain available. Index/heading truncation does not truncate the interview question body.
- Verified every one of the core partition's 216 occurrences maps into `questions.json` with its question, full cleaned source answer, direct answer, explanation and example unchanged. No core occurrence or reviewed field was missing.
- Recomputed all 36 original source SHA-256 values and matched them to `SOURCE_MANIFEST.json`; no original source had changed.
- Core standalone checks still pass: 169 Ruby examples compile under CRuby 4.0.1 and 11 correction assertions pass. This is not an execution check for Rails-dependent examples.

## Material issues sent to the master owner

`integration-defects.json` records 22 occurrence-level content problems in the inspected review files. Twenty are in the Rails review and two are in the extended review. These were reported for targeted repair; this report does not claim those repairs were already complete at inspection time.

The principal bug was a topic classifier apparently matching the substring `sti` inside words such as `testing`, `questions` and `Elasticsearch`. It supplied a single-table-inheritance answer to unit testing, functional testing, search, database-agnostic migrations, locking, a deployment scenario and an authorization scenario. A second substring collision appears to match `proc` inside `processing`, assigning a Proc answer to background job setup. Other flagged cases include generic routing answers to the CRUD acronym and a substantial GraphQL import task, generic ORM definitions to ORM tradeoffs and `ActiveRecord::Enum`, and method-definition answers to access-control questions.

Some pure database/query/connection/schema prompts were categorized in Part B, while the user explicitly requested Part C for those topics. The master owner was advised to review these boundaries; migrations and associations can reasonably remain in the Rails part if that choice is stated consistently. Slow-query production investigations are scenario questions, not simply definitions.

The draft `validate.cjs` run failed at `SRC-00711` with “Missing example without limitation.” The master owner was notified; final validation must be repeated after the pending review updates and rebuild.

## Additional consolidation

`merge-suggestions-extra.json` proposes 73 reviewed equivalence groups covering 271 distinct exact title strings. It addresses recurring Rails definitions, concerns, callbacks, validation, routing, controllers, partials, helpers, jobs, caching, SQL operations, migrations, testing, configuration, deployment and scenarios. Suggestions preserve original variants and never remove source occurrences.

Distinct question scopes remain separate: loading two versus three facilities; two versus three callable kinds; callback stages; method visibility versus definition; concern versus plain-module comparison; `save` versus `save!` compared with `save` versus `create`; `delete`/`destroy` compared with collection deletion; routes compared with REST; API implementation compared with only route syntax; and generic MVC compared with a request-flow/personal-project scenario. MCQs, code questions and deictic contexts were excluded from automatic title equivalences.

## Verification limits

The structural checks establish preservation and traceability, not that every inherited third-party answer or generated example executes on every Ruby/Rails version. Corrected answers and source limitations remain separate. Missing original screenshots/snippets are not reconstructed as facts. The final guide should only be declared ready after the master owner applies the reported content repairs, rebuilds and obtains a passing final validator run.
