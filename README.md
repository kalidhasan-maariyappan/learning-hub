# JavaTrail

A self-contained Java tutorial website with **real code execution**. Its structure (sidebar, lesson pages, Try It editor, exercises, quiz) is modelled on the Java section of a popular tutorial site. All text, examples, exercises and quiz questions are original.

- 167 Java Tutorial pages in 13 groups, plus a separate Java Core Advance area with 18 sections and 116 interview-focused lessons
- The advanced menu has its own route, expandable sidebar, search scope, and Previous/Next order; the basic Java Tutorial remains separate
- Spring Framework (18 lessons), Spring Boot (25 lessons) and web Security (12 lessons); Spring Maven labs are available for compatible complete programs
- A W3Schools-style Spring Boot Learning Path (72 pages in 11 sidebar groups) with 40 runnable Spring Boot 4.1 examples, six complete example projects, an All Examples index, exercises, interview questions and a quiz
- A two-row top navbar: learning areas (Java, Spring, Ruby & Rails, Interview Prep) on top, the courses of the current area below
- A Ruby course (58 pages, 112 runnable examples run by your local Ruby) and a Ruby on Rails course (61 pages following the Rails 8.1 Guides index)
- Ruby and Rails interview sections with 630 questions and answers (336 Ruby, 294 Rails), collected from the notes in `interview/ruby/` with duplicates merged
- 270 runnable examples, each with a "Run here" button and a "Try it Yourself »" editor
- 55 fill-in-the-blank exercises, 15 code challenges and 12 practice problems
- A 25-question quiz and a 30-question final exam
- Responsive layout (off-canvas sidebar below 992px), plus dark and light themes

Code is compiled and run by **your local JDK**. Nothing is simulated, and no code is sent anywhere else.

## Requirements

- **Node.js 18 or newer.** No npm packages are needed.
- **JDK 17 or newer.** Newer APIs are labeled by Java release; some require Java 21 or 25. Preview APIs are identified and are not enabled by the runner.
- **Maven 3.9 or newer** for the Spring Framework and Spring Boot Try It labs. The Java tutorial runner does not require Maven.
- **Ruby 3.2 or newer** for the Ruby course examples (on Windows, RubyInstaller with Devkit). Rails is not needed: Rails lessons show their code and results.

## Run it

```bash
node server.js
```

Then open <http://127.0.0.1:8081/java/> for the original tutorial, <http://127.0.0.1:8081/java-core-advanced/> for Java Core Advance, <http://127.0.0.1:8081/spring/> for Spring Framework, <http://127.0.0.1:8081/spring-boot/> for Spring Boot, <http://127.0.0.1:8081/security/> for Security, <http://127.0.0.1:8081/ruby/> for Ruby, <http://127.0.0.1:8081/rails/> for Ruby on Rails, or <http://127.0.0.1:8081/spring-boot-path/> for the Spring Boot Learning Path.

Spring Try It labs require Maven 3.9+ in addition to Java 17+. They build a fixed temporary Maven project through `/api/spring/run`; submitted lesson code cannot change the POM. Spring Framework uses Spring 7.0.x and Spring Boot uses Boot 4.1.2. Maven runs quietly (`-q`), so the console shows the program's output and any build errors. Maven may download dependencies on first use. The lab uses in-memory H2 when needed, never reads PostgreSQL credentials, and does not start external services. Boot web samples bind a random local port for one request and shut down.

| Environment variable | Default | Purpose |
|---|---|---|
| `PORT` | `8081` | Port to listen on |
| `JAVA_RUNNER_HOME` | newest JDK found | JDK to use for running code. Without it, the server picks the newest JDK among `JAVA_HOME` and `C:\Program Files\Java\*` |
| `RUBY_RUNNER_HOME` | newest Ruby found | Ruby to use for `/api/ruby/run`. Without it, the server picks the newest `C:\Ruby*` folder, then `ruby` on `PATH` |

Check the runner with `curl http://127.0.0.1:8081/api/health`. The response shows the JDK path and version, and the Ruby folder (`null` when Ruby is not installed).

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes a static edition on pushes to `main`. Enable GitHub Actions as the Pages source in the repository settings. Build locally with `node scripts/build-pages.js`; output is in `dist/` and defaults to the `/learning-hub` project path (`PAGES_BASE_PATH` overrides it).

The export includes direct lesson URLs, exercises, quizzes, and the code editor. Java, Ruby, and Maven execution requires the local server; GitHub Pages cannot run the backend. Run `node server.js` locally for those features.

## Security

**The runner is not a sandbox.** Submitted programs run with the permissions of the user who started `server.js`, and could read or modify that user's files. Several things reduce the risk:

- the server only listens on `127.0.0.1`;
- it rejects cross-origin requests;
- each run has limits: 20 s to compile, 10 s to run, 256 MB of memory, 64 KB of output, and at most 2 runs at once;
- each Java and Ruby run uses a fresh temporary folder that is deleted afterwards;
- Spring/Maven labs allow one build at a time and have a build timeout and output cap.

Do not expose this server to a network, and only run code you trust.

## Project layout

```
server.js                 Node server: static files + POST /api/run (javac + java) and /api/ruby/run (ruby)
public/
  index.html              site shell (top bar, sidebar, content)
  tryit.html              full-page "Try it Yourself" editor
  css/style.css           all styles, themes and breakpoints
  js/core.js              highlighter, editor, run client, theme
  js/nav.js               sidebar tree; also defines Previous/Next order
  js/core-advanced-nav.js separate navigation order for /java-core-advanced/
  js/spring-nav.js        Spring Framework navigation
  js/spring-boot-nav.js   Spring Boot navigation
  js/spring-boot-path-nav.js  Spring Boot Learning Path sidebar (W3Schools-style flat groups)
  js/security-nav.js      Security course navigation
  js/ruby-nav.js          Ruby and Ruby on Rails navigation (W3Schools-style flat sidebars)
  js/lesson-kit.js        lesson helpers for the Core Advanced, Spring, Boot and Security courses
  js/app.js               router, rendering, exercise/challenge/quiz engines
  js/tryit.js             Try It page logic
  js/content/*.js         lesson pages, one file per sidebar group
  js/content/core_*.js     Java Core Advance roadmap and lessons
  js/content/spring*/      Spring Framework and Spring Boot lesson registrations
  js/content/spring-boot-path/  Spring Boot Learning Path lessons, projects and reference pages
  js/content/security/    Security lesson registrations
  js/content/ruby/        Ruby lessons, interview question data and quiz
  js/content/rails/       Ruby on Rails lessons, interview question data and quiz
  js/content/interview.js Ruby and Rails interview pages built from */interview_data.js
docs/
  ANALYSIS.md             reverse-engineering findings and deviations from the reference
  PLAN.md                 build plan, content-authoring guide and test log
  sidebar.json            the sidebar tree as JSON (generated from nav.js)
```

## Adding or editing a page

1. Add the slug to the right group in `public/js/nav.js`. Its position there decides its place in the sidebar and in Previous/Next order.
2. Register the page in the matching `public/js/content/*.js` file with `JT.def(slug, { body, exercise? })`, or with `JT.challenge(topic, {...})` for a code challenge.
3. Start the server and open the page. Run its examples and check that they behave as intended.

The full authoring guide (helpers, exercise, challenge and quiz formats, and rules such as "examples must be deterministic") is in [docs/PLAN.md](docs/PLAN.md), section 3.

## Testing

`docs/PLAN.md` (step 9) records the browser test run and how each check was done. A quick check that every example still runs: open any `/java/` page and paste the snippet from `docs/PLAN.md` §8 into the browser console.
# Spring Framework learning area

The separate `/spring/` route contains a Spring Framework course with its own sidebar, search scope, direct lesson URLs, and Previous/Next order. It has 6 sections and 18 lessons built from the supplied Spring discussion and pasted notes: beginner foundations, AOP, JDBC, transaction management, Web MVC, and Log4j 2. It targets Spring Framework 7.0.x and Java 17+ and does not use Spring Boot.

The course shows Java and XML examples that fit into a plain Spring Maven project. XML/JSP examples need a compatible servlet deployment; code fragments shown in a lesson are not presented as standalone runnable programs.

# Spring Boot learning area

## Transcript-based Spring Boot Crash Course

The separate `/spring-boot-crash-course/` route contains 63 instructor-style tutorials based on the numbered Markdown sources in `bootcamp-springboot/`. The lessons teach concepts directly with compact explanations, maps, file instructions, complete examples and code walkthroughs. They retain the original example domains and sequence, with source provenance in a collapsed disclosure.

The practice collection contains 55 packaged Maven modules, six passing JUnit tests, runtime checks for 52 module states and four executed code alternatives. Redis, Google OAuth and Docker/MySQL need external setup and are identified on their pages. See [the course report](docs/SPRING-BOOT-CRASH-COURSE.md) for build commands, evidence and execution limits, and [the practice README](demo/spring-boot-crash/labs/README.md) to run an example. Rebuild the pages with `node scripts/build-spring-boot-crash-course.js`.

The separate `/spring-boot/` route contains a Spring Boot course with 7 sections and 25 lessons: core and auto-configuration, configuration, REST APIs, Spring Data JPA, security, testing and production readiness. It teaches Spring Boot as a layer built on Spring Framework. The baseline is Spring Boot 4.1.2 and Java 17+.

Every runnable example is a complete Boot application. Web examples start on a random loopback port, call themselves, print the result and stop.

# Spring Boot Learning Path

The `/spring-boot-path/` route is a beginner-to-production Spring Boot course laid out like a W3Schools tutorial: one flat sidebar, one concept per page, read top to bottom. Its 11 groups follow the recommended order — Tutorial (first app, IoC, beans, auto-configuration, configuration, profiles, logging), REST, Data (JPA, repositories, queries, transactions, JdbcClient, N+1, PostgreSQL and Flyway), Testing, Security (basic auth, method security, OAuth2 resource server with JWT), Messaging (application events, Kafka, RabbitMQ, outbox, Redis Streams), Jobs and Cache (scheduling, `@Async` with virtual threads, Spring Batch, caching, Redis), Production (Actuator, metrics, retries, Docker, Kubernetes, CI, debugging), Advanced (microservices, Spring Cloud, WebFlux, SSE, WebSocket, GraphQL, gRPC), Examples and Reference.

Each lesson starts with what you will learn, shows a complete example with its real output, explains it step by step, and ends with points to remember, a common mistake, interview questions and often a fill-in exercise. The 40 runnable examples are Spring Boot 4.1.2 programs; their outputs were produced by running them in the lab. Kafka, RabbitMQ, PostgreSQL, Redis and Docker examples are shown with what they print, because the lab does not start external services.

The Examples group has an **All Examples** page, built from the lessons, and six projects: Patient API, Secured API (JWT roles and ownership), Claims Events (outbox, relay, idempotent consumer), Notifications (RabbitMQ), Cached Catalog and Production Service. The lab modules for this course are `core`, `web`, `validation`, `data`, `test`, `security`, `oauth2` (Boot 4 `spring-boot-starter-security-oauth2-resource-server`), `cache`, `actuator`, `batch` and `app` (web + validation + JPA/H2 + cache + Actuator).

# Security learning area

The `/security/` route contains one web-security course with 3 sections and 12 lessons: SQL injection, XSS, CSRF, CORS, security headers, session fixation and session ID protection, password hashing, authentication vs authorization, JWT, IDOR, path traversal, and sensitive data in logs and errors. Each lesson shows the vulnerable code, the fix, why it works, its limits, how to test it, and interview questions.

# Ruby learning area

The `/ruby/` route teaches Ruby in the order of a W3Schools tutorial: Ruby Tutorial (syntax, output, variables, data types, strings, symbols, operators, input), Control Flow, Collections, Methods and Blocks, Object-Oriented Ruby (classes, modules, mixins, duck typing, equality) and Ruby Advanced (exceptions, files, Struct and Data, pattern matching, frozen objects, metaprogramming, gems). It ends with a Ruby Interview section (basics, collections, methods and blocks, OOP, advanced topics, output questions and coding problems) and a quiz. Every example runs on the local Ruby (**Run here** / **Try it Yourself**), and the output shown on the page is the real output of Ruby 3.4.

# Ruby on Rails learning area

The `/rails/` route follows the Guides Index of guides.rubyonrails.org for Rails 8.1: Start Here, Models (Active Record), Views, Controllers, Rails Features (authentication generator, Solid Queue jobs, Action Mailer, Active Storage), Digging Deeper and Going to Production (Puma, caching with Solid Cache, security, error reporting, Kamal). Lessons are original text written for this site. Rails code needs a Rails application, so it is shown with the result Rails prints (console values, SQL, terminal output) rather than run here. Release notes, contributing and policy guides are not included. The course ends with a Rails Interview section (basics, models, database and queries, controllers and views, security, jobs and caching, testing and deployment, and production scenarios) and a quiz.

Each interview page groups questions by topic and labels them Beginner, Intermediate or Advanced. Questions that appeared several times in the source notes are merged into one answer, with the other wordings listed under it. A filter box searches the questions on the page.

# Lesson format

Spring, Spring Boot and Security lessons use the helpers in `public/js/lesson-kit.js`: `JT.kit.java` (plain Java example plus output), `JT.kit.spring` (Maven-lab program plus output), `JT.kit.show` (code that is displayed only) and `JT.kit.interview` (collapsible interview questions). Java Core Advanced lessons use `JT.kit.coreLesson`, which lays a lesson out like a W3Schools page: a short definition, the example with its output inside the example box, "How it works", a Remember box and a Common mistake box. Ruby and Rails pages use `JT.kit.pager` to register a page from its navigation title, `JT.kit.ruby` for runnable Ruby (optional `stdin`), `JT.kit.rails` for shown Rails code with a labelled result, and `JT.kit.remember`, `JT.kit.tip` and `JT.kit.warn` for the note boxes. Every runnable example records its expected output in `JT.lessonExamples`, so a script can run each example and compare the real output with the lesson.

## Practical Rails learning path

Open `/rails/rails_practical_path` for a complete five-section curriculum with 39 separate teaching chapters:

- Performance optimization: 8 chapters covering measurement, SQL, N+1, indexes, caching, memory, jobs and profiling.
- Debugging: 9 chapters covering systematic investigation, logs, breakpoints, models, browser tools, REST APIs, authentication, jobs and incidents.
- Frontend integration: 8 chapters covering assets, jQuery, Bootstrap, React, Turbo lifecycle and architecture choices.
- Rails 7 versus Rails 8: 7 chapters distinguishing minor releases, authentication, deployment, assets, databases, Solid adapters and upgrades.
- Ruby 3.x versus Ruby 4.x: 7 chapters covering exact release baselines, syntax, core libraries, JIT, concurrency, removals and migration.

Each chapter includes explanations, version scope, implementation steps, code, a production scenario, verification guidance, senior tips, common mistakes, exercises with expandable answers, interview questions and official references. Navigation and Previous/Next keep teaching chapter by chapter. Rails examples are copyable teaching code for a local application; the hub does not execute a Rails application.

Validate with `node scripts/build-pages.js` and `node scripts/verify-rails-practical.js`. Add `--ruby` to the verification command for Ruby syntax checks and selected standalone example execution using the installed Ruby. Ruby 4.0 is required to syntax-check the examples specifically labeled Ruby 4.0.


## Interview preparation areas

Three top navigation entries open independent learning areas with their own grouped sidebars, scoped search and Previous/Next order:

- `/major-gems/`: 20 gem guides with installation, examples, separate web/API guidance, operational resource costs, troubleshooting, exercises, interview answers and official links.
- `/coding-interview/`: 60 individually routed Ruby problems: 20 arrays, 20 strings and 20 hashes. Solutions use loops and primitive access rather than algorithm shortcuts. Each includes a contract, walkthrough, complexity, edge cases, runnable local example and follow-up answers.
- `/rails-scenarios/`: 50 individually routed interview scenarios, including one million records, pagination, exports, indexing, APIs, authorization, jobs, retries, payments, caches, concurrency and deployments. Each separates assumptions, model answer, investigation, implementation, verification and tradeoffs.

The local Try It editor loads the coding lessons. GitHub Pages exports all routes and displays the examples; executing Ruby requires the local server and installed Ruby. No tutorial gem is installed and no external service is called merely by opening its lesson.

Validate with `node scripts/build-pages.js`, `node scripts/verify-interview-prep.js --ruby`, and the existing `node scripts/verify-rails-practical.js --ruby`. The interview verifier checks both shells, navigation, content structure, export paths and algorithm-shortcut restrictions, then executes every solution and displayed demo with behavioral and error cases. Rails/gem snippets are instructional fragments, not a claim of live integration testing against every library/service.

## English Learning

Open <http://127.0.0.1:8081/english-learning/> for the separate Tamil–English learning area. Lessons use a short format: Tamil meaning, English meaning, formula where useful, and bilingual examples. Verb entries show V1–V5 and present/past/future examples. Practice and writing are expandable, keeping the main lesson brief.

The catalog contains **4,823 lessons**, including **4,500 unique vocabulary items**. Cumulative vocabulary coverage is **A1: 500, A2: 1,200, B1: 2,500, B2: 4,500**. Vocabulary includes words, phrasal verbs and fixed expressions; spelling variants and repeated senses are counted once. The Vocabulary view includes earlier levels, with search and numbered pagination.

The 90 grammar units and 100 sentence formulas remain complete. Every category has material at every level. Other skill/category quotas are tracked separately in `docs/ENGLISH-COVERAGE.md`; reaching the vocabulary target does not mean every original numerical quota is complete.

The expansion uses English definitions/examples from the CC0 TKG learner dictionary and Princeton WordNet 3.0. New Tamil translations are machine-assisted. All new A1 items have reviewed short meanings, and all retained sourced expressions/phrasal verbs have contextual Tamil corrections. This is not a claim of professional review of every translation. See `public/content/english/SOURCES.md`, `sources.json` and the bundled license notices.

Category/level selection, Tamil/English search, pagination, explicit completion, quiz feedback, review queues and writing drafts work locally. Progress is stored only in this browser; there is no account sync. Listening and pronunciation can use an available English browser speech voice; unavailable voices show an honest fallback and a transcript. No microphone, automatic writing evaluation or official CEFR certification is provided.

Content sources are readable pipe-separated files and `vocabulary-expanded.json` in `public/content/english/`. Run `node scripts/build-english-content.js` after editing them; it rebuilds `public/js/english-data.js`. Rendering is in `public/js/english.js`, with scoped styles in `public/css/english.css`.

Validation:

```bash
node scripts/build-english-content.js
node scripts/build-pages.js
node scripts/verify-english.js
node scripts/verify-interview-prep.js
```

The optional browser integration check requires Playwright and Microsoft Edge: `node scripts/verify-english-browser.cjs` (set `PLAYWRIGHT_MODULE` to an installed Playwright module path if necessary). It opens all 4,823 lessons, checks the short layout, grading, review, persistence, category/search/pagination, mobile navigation/overflow and the existing Java route. The static export includes all English level/category/lesson routes.

English lesson lists and the review queue use numbered pagination with Previous/Next, a direct page selector, and 12/24/36/60 items per page. Page, search and page size are stored in the URL for refresh and browser Back. Search and category changes reset the page; small lists hide unnecessary page controls. Run `node scripts/verify-english-pagination.cjs` with Playwright and Edge for the dedicated pagination checks.


B2 familiarity expansion: 68 new practice units and 11 expanded existing lessons, with 422 authored bilingual sentence pairs, dialogue turns and passage paragraphs. Another 3,712 sourced usage examples enrich 1,414 existing word lessons. If-clauses and Time Expressions have dedicated sections. Practice sets appear first in each relevant category, with links from word lessons into contextual practice. The 4,500-item vocabulary count is unchanged; practice units are counted separately.

Rich reading and listening passages have comprehension questions and optional Tamil translations. Conversations have eight turns. Speaking has model answers, follow-up prompts, time guidance and self-checks; writing has 100–150-word B2 models, saved drafts, live word counts and checklists. Listening/pronunciation use available browser voices with speed/replay/stop controls; there is no automatic speaking or writing assessment. New quiz versions invalidate stale answers only on changed practice sets.

Run `node scripts/verify-english-fluency.js` and the optional `node scripts/verify-english-fluency-browser.cjs` for these checks. Authored units are maintained in `public/content/english/fluency-*.txt` and loaded by `scripts/english-fluency-content.js`. Additional sourced examples are in `additional-examples.json`; their Tamil text is machine-assisted and retains source attribution.

The Learning Hub is installable as a PWA on HTTPS or localhost. Open it online once and wait for “Lessons ready offline”; lesson content, exercises and quizzes then work offline, including unopened lesson routes. Use “Install app” when your browser offers it, or the browser's Install/Add to Home Screen menu (Safari on iPhone: Share → Add to Home Screen). Learning progress remains in this browser's local storage. Code execution needs the running local server; browser voices depend on the device.

PWA files: `public/manifest.webmanifest`, `public/sw.js`, `public/js/pwa.js`, `public/css/pwa.css`, and `public/icons/`. Static exports automatically fingerprint assets and offer an “Update app” button after a new deployment. For local releases, bump `VERSION` in `public/sw.js` when assets change. The previous version stays active until the learner chooses to update. Offline availability requires browser storage; clearing site data removes the download and saved progress.

Verify with `node scripts/build-pages.js` then `node scripts/verify-pwa.cjs` (Playwright and Edge required; optionally set `PLAYWRIGHT_MODULE` to the installed module path). This checks the manifest, scoped worker, offline unseen routes and refreshes, editor shell, and honest offline API errors under the GitHub Pages subpath.
