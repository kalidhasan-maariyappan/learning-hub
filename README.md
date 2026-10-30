# JavaTrail

A self-contained Java tutorial website with **real code execution**. Its structure (sidebar, lesson pages, Try It editor, exercises, quiz) is modelled on the Java section of a popular tutorial site. All text, examples, exercises and quiz questions are original.

- 167 Java Tutorial pages in 13 groups, plus a separate Java Core Advance area with 18 sections and 116 interview-focused lessons
- The advanced menu has its own route, expandable sidebar, search scope, and Previous/Next order; the basic Java Tutorial remains separate
- Spring Framework (30 lessons), Spring Boot (25 lessons) and web Security (12 lessons) courses whose examples run in a local Maven lab
- A Ruby course (52 pages, 112 runnable examples run by your local Ruby) and a Ruby on Rails course (54 pages following the Rails 8.1 Guides index)
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

Then open <http://127.0.0.1:8081/java/> for the original tutorial, <http://127.0.0.1:8081/java-core-advanced/> for Java Core Advance, <http://127.0.0.1:8081/spring/> for Spring Framework, <http://127.0.0.1:8081/spring-boot/> for Spring Boot, <http://127.0.0.1:8081/security/> for Security, <http://127.0.0.1:8081/ruby/> for Ruby, or <http://127.0.0.1:8081/rails/> for Ruby on Rails.

Spring Try It labs require Maven 3.9+ in addition to Java 17+. They build a fixed temporary Maven project through `/api/spring/run`; submitted lesson code cannot change the POM. Spring Framework uses Spring 7.0.x and Spring Boot uses Boot 4.1.x. Maven may download dependencies on first use. The lab uses in-memory H2 when needed, never reads PostgreSQL credentials, and does not start external services. Boot web samples bind a random local port for one request and shut down.

| Environment variable | Default | Purpose |
|---|---|---|
| `PORT` | `8081` | Port to listen on |
| `JAVA_RUNNER_HOME` | newest JDK found | JDK to use for running code. Without it, the server picks the newest JDK among `JAVA_HOME` and `C:\Program Files\Java\*` |
| `RUBY_RUNNER_HOME` | newest Ruby found | Ruby to use for `/api/ruby/run`. Without it, the server picks the newest `C:\Ruby*` folder, then `ruby` on `PATH` |

Check the runner with `curl http://127.0.0.1:8081/api/health`. The response shows the JDK path and version, and the Ruby folder (`null` when Ruby is not installed).

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
  js/security-nav.js      Security course navigation
  js/ruby-nav.js          Ruby and Ruby on Rails navigation (W3Schools-style flat sidebars)
  js/lesson-kit.js        lesson helpers for the Core Advanced, Spring, Boot and Security courses
  js/app.js               router, rendering, exercise/challenge/quiz engines
  js/tryit.js             Try It page logic
  js/content/*.js         lesson pages, one file per sidebar group
  js/content/core_*.js     Java Core Advance roadmap and lessons
  js/content/spring*/      Spring Framework and Spring Boot lesson registrations
  js/content/security/    Security lesson registrations
  js/content/ruby/        Ruby lessons, interview questions and quiz
  js/content/rails/       Ruby on Rails lessons, interview questions and quiz
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

The separate `/spring/` route contains a Spring Framework course with its own sidebar, search scope, direct lesson URLs, and Previous/Next order. It has 7 sections and 30 lessons covering the container, beans, configuration, AOP and proxies, JdbcTemplate and transactions, Spring MVC, events and `@Async`. It targets Spring Framework 7.0.x and Java 17+ and does not use Spring Boot.

Every lesson example is a complete program that runs in the Maven lab (**Run with Maven**). MVC examples use MockMvc, so no web server is started. Database examples use in-memory H2.

# Spring Boot learning area

The separate `/spring-boot/` route contains a Spring Boot course with 7 sections and 25 lessons: core and auto-configuration, configuration, REST APIs, Spring Data JPA, security, testing and production readiness. It teaches Spring Boot as a layer built on Spring Framework. The baseline is Spring Boot 4.1.1 and Java 17+.

Every runnable example is a complete Boot application. Web examples start on a random loopback port, call themselves, print the result and stop.

# Security learning area

The `/security/` route contains one web-security course with 3 sections and 12 lessons: SQL injection, XSS, CSRF, CORS, security headers, session fixation and session ID protection, password hashing, authentication vs authorization, JWT, IDOR, path traversal, and sensitive data in logs and errors. Each lesson shows the vulnerable code, the fix, why it works, its limits, how to test it, and interview questions.

# Ruby learning area

The `/ruby/` route teaches Ruby in the order of a W3Schools tutorial: Ruby Tutorial (syntax, output, variables, data types, strings, symbols, operators, input), Control Flow, Collections, Methods and Blocks, Object-Oriented Ruby (classes, modules, mixins, duck typing, equality) and Ruby Advanced (exceptions, files, Struct and Data, pattern matching, frozen objects, metaprogramming, gems). It ends with interview questions and a quiz. Every example runs on the local Ruby (**Run here** / **Try it Yourself**), and the output shown on the page is the real output of Ruby 3.4.

# Ruby on Rails learning area

The `/rails/` route follows the Guides Index of guides.rubyonrails.org for Rails 8.1: Start Here, Models (Active Record), Views, Controllers, Rails Features (authentication generator, Solid Queue jobs, Action Mailer, Active Storage), Digging Deeper and Going to Production (Puma, caching with Solid Cache, security, error reporting, Kamal). Lessons are original text written for this site. Rails code needs a Rails application, so it is shown with the result Rails prints (console values, SQL, terminal output) rather than run here. Release notes, contributing and policy guides are not included.

# Lesson format

Spring, Spring Boot and Security lessons use the helpers in `public/js/lesson-kit.js`: `JT.kit.java` (plain Java example plus output), `JT.kit.spring` (Maven-lab program plus output), `JT.kit.show` (code that is displayed only) and `JT.kit.interview` (collapsible interview questions). Java Core Advanced lessons use `JT.kit.coreLesson`, which lays a lesson out like a W3Schools page: a short definition, the example with its output inside the example box, "How it works", a Remember box and a Common mistake box. Ruby and Rails pages use `JT.kit.pager` to register a page from its navigation title, `JT.kit.ruby` for runnable Ruby (optional `stdin`), `JT.kit.rails` for shown Rails code with a labelled result, and `JT.kit.remember`, `JT.kit.tip` and `JT.kit.warn` for the note boxes. Every runnable example records its expected output in `JT.lessonExamples`, so a script can run each example and compare the real output with the lesson.
