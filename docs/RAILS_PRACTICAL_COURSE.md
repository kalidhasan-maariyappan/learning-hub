# Practical Rails course

The course begins at `/rails/rails_practical_path`. It contains 39 independently routed teaching chapters and four section overview pages, in addition to the main curriculum page. All sections are complete; there are no planned-chapter placeholder pages.

| Section | Chapters | Coverage |
|---|---:|---|
| Performance | 8 | Bottlenecks, SQL, N+1, indexes, caching, memory, jobs, profiling and monitoring |
| Debugging | 9 | Investigation workflow, logs, breakpoints, models/database, browser tools, APIs, authentication, jobs, incidents |
| Frontend | 8 | Assets, import maps/bundlers, jQuery setup and lifecycle, Bootstrap setup and components, React islands/API integration, architecture |
| Rails versions | 7 | Exact minor releases, authentication, deployment, assets/configuration, databases/transactions, Solid adapters, deprecations/upgrades |
| Ruby versions | 7 | Release baselines, language, core libraries/HTTP, JIT, Ractors/Box, removals/native dependencies, migration |

Chapters follow the requested introduction/explanation/syntax/examples/exercises/summary structure. Each also contains prerequisites, version scope, when/why/how guidance, implementation steps, a production scenario, verification steps, senior tips, mistakes, expandable exercise answers, interview answers and official documentation links. The existing first chapter retains its longer custom layout.

## Navigation and loading

`public/js/content/rails/practical_curriculum.js` defines the section and chapter order. It loads before `ruby-nav.js` in both the main site and Try It shell, and before navigation during static export. The navigation integrates with the existing search and Previous/Next behavior.

`practical_lessons.js` supplies the common teaching layout. Five content files register topic-specific chapters; `practical_path.js` registers the curriculum, section overviews and the original first chapter. Existing Rails lessons remain available.

## Version and source boundaries

Version-sensitive material was checked against official released Ruby/Rails documentation on 31 October 2026. Rails 7.0, 7.1, 7.2, 8.0 and 8.1 are distinguished. Ruby examples distinguish 3.0, 3.2, 3.4 and 4.0. Ruby 4.1 development expectations are not presented as released features. Experimental Ruby Box, ZJIT and Ractor integration are explicitly identified.

New-project defaults are distinguished from upgraded application settings. PostgreSQL-only index options are labeled. Runtime minimums are not presented as a guarantee that all gems support every newer Ruby.

Examples are original teaching code and scenarios. Performance figures are illustrative; no production speedup is claimed. Rails snippets assume the models/services and prerequisites described on each page. They are displayed for use in a local Rails application, consistent with the existing course; they are not executed as live Rails requests in this hub.

## Verification

Run:

```text
node scripts/build-pages.js
node scripts/verify-rails-practical.js --ruby
```

The verifier loads the real site scripts from the HTML shell. It checks registration, unique navigation, chapter structure, expandable answers, internal links, required script load order in both shells and exported routes. `--ruby` requires a locally installed Ruby 4.0-compatible runtime for version-specific examples.

Verified on Node 24.18.1 and Ruby 4.0.1:

- Static export: 610 site routes.
- Course: 39 chapters, 44 rendered course pages, 114 internal links.
- Ruby: 58 snippets passed syntax checks; 9 standalone examples executed with checked results, including discount arithmetic, reverse search, sets, Ractor ports and process status.
- HTTP: all 44 local course routes returned 200 and loaded the new lesson scripts.
- Browser: curriculum and numbered navigation displayed; a chapter link opened the SQL lesson; exercise answer disclosure expanded correctly at a narrow desktop width.
- Whitespace validation: `git diff --check` passed.

These checks do not claim full Rails integration tests for every teaching fragment, real payment/email delivery, a production deployment, or execution under each historical Ruby/Rails version. Those application-specific verification steps are taught on the relevant pages.
