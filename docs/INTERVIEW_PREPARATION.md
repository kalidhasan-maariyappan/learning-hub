# Interview preparation additions

Three independent learning areas use the existing tutorial shell, with dedicated top links, grouped sidebars, scoped search, active navigation and Previous/Next ordering.

| Area | Route | Teaching pages |
|---|---|---:|
| Major Gems | `/major-gems/` | 20 guides plus home |
| Coding Interview | `/coding-interview/` | 20 arrays, 20 strings, 20 hashes, three overviews and home |
| Real-world Scenarios | `/rails-scenarios/` | 50 lessons plus home |

Total: 136 new pages. Every problem/scenario has its own direct URL.

## Teaching content

Gem guides explain purpose, installation, sample code, separate web/API usage, resource costs, troubleshooting, exercises and interview answers. Each links to official project documentation. Opening a lesson does not install gems.

Coding lessons include contracts, examples, manual solutions, traces, complexity, invariants, edge cases and follow-up answers. Arrays/strings use indexed loops. Hash pair traversal and basic type checks are allowed primitives. Algorithm shortcuts such as sort, reverse, tally, split, map and merge are excluded. Run-length count formatting is manual. JSON is used only for output formatting.

All 60 examples use the existing local Ruby runner and Try It editor. Static hosting displays the examples but needs the local server for execution. ASCII/Unicode scope and repeated-concatenation costs are explained where relevant.

Scenarios cover data volume, SQL, APIs, security, jobs, integrations, consistency, caching, incidents and architecture. The million-record answer distinguishes screens, SQL aggregation, exports and per-record processing, including memory retention and consistency tradeoffs. Answers expand for self-testing.

Rails/gem code is instructional and assumes the described models/services. It is not a complete sample application or a claim of live integration testing against every external service.

## Implementation

- `public/js/interview-catalog.js`: identifiers and titles.
- `public/js/interview-nav.js`: dedicated navigation registration.
- `public/js/content/interview-prep/teaching.js`: layouts and overviews.
- `gems.js`, `arrays.js`, `strings.js`, `hashes.js`: guides and coding cases.
- `scenarios_data.js`, `scenarios.js`: scenario content and rendering.
- Main and Try It shells load the shared navigation/content.
- Server and static exporter support the three route families.
- Top navigation scrolls horizontally on desktop and phones so the additional links stay reachable.

## Verification

```text
node scripts/build-pages.js
node scripts/verify-interview-prep.js --ruby
node scripts/verify-rails-practical.js --ruby
```

The interview verifier loads scripts from both real shells; renders pages; checks routes, links, export paths and shortcut restrictions; executes solutions and displayed demos; and syntax-checks Ruby gem/scenario fragments without executing external-service code.

Observed results:

- Static build: 749 site routes.
- 136 new pages and 305 internal links pass.
- 60 solutions pass 192 behavior/error cases, including input immutability.
- All 60 displayed demo outputs match execution.
- 66 Ruby gem/scenario fragments pass syntax checks; service-dependent code is not executed.
- Every new local HTTP lesson URL returns 200.
- Local Ruby runner produces actual evaluated output.
- Browser: new top links and dedicated sidebars work; the array solution expands and Run here produces `[3,2,1]`; the million-record model answer expands visibly.
- Existing 39-chapter Rails course checks remain passing.

Official gem documentation was consulted on 31 October 2026. Select and test dependencies against each application's exact Ruby, Rails, gem and infrastructure versions.
