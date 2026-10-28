# JavaTrail: Build Plan

This file lets any developer or AI agent pick up this project without earlier context. Read it in full before changing anything. Update the **Status** table and the **Log** at the end of every step.

---

## 1. What we are building

**JavaTrail** is a standalone, offline-capable Java tutorial website. It is modelled on the *structure and behaviour* of the W3Schools Java tutorial (https://www.w3schools.com/java/), which was reverse-engineered in Phase 1. The findings are in [ANALYSIS.md](ANALYSIS.md).

What it has:

- A fixed top bar, a left sidebar with about 180 links in 13 groups and expandable sub-topics, a content area, and Previous/Next buttons that follow sidebar order.
- Lesson pages with highlighted Java code examples.
- **Real Java execution.** Every example has a "Run here" button and a "Try it Yourself »" link to a full-page editor. Code is compiled and run by the **local JDK** through a small Node server. Results are never faked or precomputed.
- Fill-in-the-blank **exercises** on many pages, graded in the browser.
- **Code challenges.** The user writes a whole program, it really runs, and its output is compared with the expected output.
- A **quiz** with 25 questions and a longer **final exam** with a pass mark.
- A responsive layout. Below 992px the sidebar becomes an off-canvas drawer. Dark and light themes.

### Hard rules (from the original task; never break them)

1. **Java only.** Do not create pages, links or examples for any other language.
2. **Original content.** Write every explanation, example, exercise and quiz question yourself. Do not copy W3Schools lesson text, code examples, logos, the name "W3Schools", colours meant to imitate their brand, or their certificate wording. Copying the *structure* (topic order, page types, UI patterns) is fine.
3. **No fake execution.** Output shown to the user must come from `javac` + `java` on the local machine. Never hardcode an expected output as if it were a run result. A challenge's `expected` string is only a grading target.
4. **No external services.** No CDNs, analytics, ads or remote code runners. Everything is served from this folder.
5. **Plain stack.** HTML, CSS, vanilla JavaScript in the browser; Node.js (no npm dependencies) on the server.

---

## 2. Architecture

```
Browser (index.html / tryit.html)
   │  GET static files, GET /java/<slug> (SPA route)
   │  POST /api/run {code, stdin}  ──►  server.js (Node, 127.0.0.1:8080)
   │                                        │ writes Main.java in a temp dir
   │                                        │ javac (20 s limit) → java (10 s limit)
   ◄────────────── JSON result ─────────────┘ temp dir deleted
```

### 2.1 Server: `server.js`

- Run with `node server.js` (default port 8080; override with `PORT`). Binds to **127.0.0.1 only**.
- JDK selection: `JAVA_RUNNER_HOME` if set, otherwise the **newest** JDK among `JAVA_HOME` and `C:\Program Files\Java\*` (version read from each JDK's `release` file). The lessons need **Java 17 or newer** (text blocks, switch expressions, records, `var`).
- `POST /api/run`:
  - Request body: JSON `{ "code": string, "stdin"?: string }`.
  - Requirements: `Content-Type: application/json`, same-origin `Origin` header, code at most 100 KB.
  - Concurrency: at most 2 runs at a time; any more get HTTP 429.
  - Response: `{ phase: "compile"|"run", ok, stdout, stderr, exitCode, timedOut, truncated, ms, compileMs, runMs }`.
  - The public class name is detected from the code; the default is `Main`. JVM flags: `-Xmx256m -Xss8m -XX:+UseSerialGC -Dfile.encoding=UTF-8 -Duser.language=en -Duser.country=US`. Output is capped at 64 KB.
  - The fixed **en-US locale** matters: without it, `printf("%.2f")` prints `3,14` and `Scanner.nextDouble()` rejects `4.5` on machines with comma-decimal regional settings. That would make outputs and challenge grading depend on the host.
- `GET /api/health` returns `{ ok, jdk, version }`.
- Routing:
  - `/` redirects (302) to `/java/`.
  - `/java` and `/java/*` serve `public/index.html`; the client-side router picks the page.
  - `/tryit` serves `public/tryit.html`.
  - Everything else is a static file from `public/`, with a path-traversal guard.
- **Security note:** this is **not a sandbox**. User code runs with the permissions of the OS user who started the server. The localhost binding and the origin check only stop other websites from triggering runs. This must be stated in the README.

### 2.2 Front end: files and load order

```
public/
  index.html        main site shell (top bar, #sidebar, #scrim, #main, footer)
  tryit.html        full-page editor (Run, orientation toggle, stdin, console)
  css/style.css     all styles; CSS variables; [data-theme=dark]; breakpoints 992/760/420px
  js/core.js        JT.esc, JT.highlight (regex tokenizer), JT.createEditor, JT.runJava,
                    JT.showResult, JT.normalizeOutput, theme toggle
  js/nav.js         JT.nav (sidebar tree), JT.order (Prev/Next order), JT.navInfo[slug]
  js/app.js         router, sidebar rendering, search, page registry, content helpers,
                    exercise/challenge/quiz engines
  js/tryit.js       Try-it page logic (reads ?page=<slug>&ex=<index>)
  js/content/*.js   lesson pages, one file per sidebar group (see Section 4)
```

Script order in both HTML files: `core.js` → `nav.js` → `app.js` → `content/basics.js`, `control.js`, `methods.js`, `classes.js`, `errors_files.js`, `collections.js`, `advanced.js`, `reference.js`, `extras.js`. `tryit.html` then also loads `tryit.js`.

Everything hangs off a single global, `window.JT`.

### 2.3 Navigation model (`nav.js`)

- `JT.nav` is an array of groups: `{ title, items: [P(slug, title, children?)] }`.
- A parent with children links to its first child, which has the same slug.
- `C('topic')` adds a child `java_challenges_<topic>` titled "Code Challenge".
- `JT.order` is the flattened reading order used for Previous/Next; each slug appears once.
- `JT.navInfo[slug] = { title, parent, group, fullTitle, heading }`.
- **The sidebar tree is the single source of truth for which pages exist.** Every slug in `nav.js` must have a page registered in a content file, and no content file may register a slug that is not in `nav.js`.

---

## 3. How to write a page (content API)

Every content file is an IIFE:

```js
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, note, code, syn, table, ex, hr } = JT.h;   // destructure only what you use

  JT.def('java_slug', {
    body: () => [ /* HTML strings from the helpers */ ].join(''),
    exercise: { ... },        // optional
    after: (main, { wireExercise, wireQuiz }) => { ... },  // optional, runs after render
    title: '...', h1: '...',  // optional overrides; normally taken from nav.js
  });

  JT.challenge('topic', { ... });   // registers java_challenges_<topic>
})();
```

### 3.1 Helpers (`JT.h`)

| Helper | Output |
|---|---|
| `p(html)`, `h2(t)`, `h3(t)`, `hr()` | basic elements (HTML is allowed in arguments) |
| `ul([...])`, `ol([...])` | lists |
| `note(html)` | highlighted tip box |
| `code(src)` | highlighted, non-runnable code block |
| `syn(src, title='Syntax')` | syntax box, not runnable |
| `table(headArray, rowsArray)` | reference table (scrolls horizontally on mobile) |
| `ex(src, {title, desc, stdin, noRun})` | **runnable example**: highlighted code + "Try it Yourself »" + "Run here" |

Rules for `ex()`:

- Source can be a **snippet** (statements only). `JT.runnable()` then wraps it in `public class Main { public static void main(String[] args) throws Exception {...} }` with these imports: `java.util.*`, `java.util.function.*`, `java.util.stream.*`, `java.io.*`, `java.nio.file.*`, `java.time.*`, `java.time.format.*`.
- If the source contains a class/record/interface/enum **and** `static void main`, it is used as-is. Then the public class must be `Main`, or be the only public class.
- Source is dedented automatically, so indent freely inside template literals.
- Programs that read input must pass `stdin` (e.g. `{ stdin: 'Ada\n36\n' }`).
- An example meant to fail to compile must have a `desc` that says so (e.g. "This example fails to compile on purpose."). An example meant to crash at run time says "This example throws an exception on purpose." Test scripts treat any failing example whose page mentions "on purpose" as expected.
- A full program (a class plus `main`) is **not** wrapped, so it gets **no automatic imports**. Write `import java.util.*;` and similar yourself.
- Snippet line numbers: the "Run here" console maps `Main.java:N` back to the snippet's own line numbers using `JT.wrapOffset(code)`. The Try It editor shows the wrapped code, so no mapping is needed there.
- Examples must be **deterministic**: no `Random` without a seed, no printing the current time unless the lesson is about time (`java_date` may print `now()`), no network access. File examples must write to a relative path in the working directory, which the server deletes afterwards.
- Every example must finish in under 2 s on a normal laptop.

### 3.2 Exercise format

```js
exercise: {
  q: 'Instruction text (HTML allowed).',
  code: 'Java code with ___ for each blank',
  options: ['correct1', 'decoy', 'correct2', ...],   // 3–6 chips
  answer: ['correct1', 'correct2'],                  // one entry per ___, in order
  explain: 'Optional text shown when correct.',
}
```

### 3.3 Challenge format

```js
JT.challenge('topic', {
  intro: p('...'),          // optional; used for top-level challenge pages
  task: p('What to write.'),
  starter: `public class Main { ... }`,   // must compile, but must NOT already pass
  expected: 'exact stdout',              // compared after normalizeOutput (CRLF→LF, trailing spaces trimmed)
  hint: 'optional HTML',
  stdin: 'optional input',
});
```

Every challenge **must be solvable**. Before you commit one, run a reference solution through `/api/run` and check that its normalized output equals `expected`. Do not store the solution in the site.

### 3.4 Quiz format (used by `extras.js`)

```js
const questions = [{ q: 'Question', code: 'optional Java', options: ['a', 'b', 'c', 'd'], answer: 2 }];
JT.def('java_quiz', {
  body: () => p('...') + JT.renderQuiz(questions, { id: 'quiz' }),
  after: (main, { wireQuiz }) => wireQuiz(questions, null, 'quiz'),
});
```

`passMark` (a percentage) is only set for the final exam (e.g. 75).

### 3.5 Writing style

- Plain, friendly English, short paragraphs. Typical page: 1–4 `h2` sections, 1–4 runnable examples, an optional note, an optional exercise.
- Use varied, realistic data (cities, shop items, scores), never "foo/bar". Use names from many cultures.
- Explain *why*, not only *how*. Mention common mistakes.
- Use Java 17+ idioms where they help (`var`, enhanced `switch`, records, text blocks), but teach classic syntax first.

---

## 4. Page inventory by content file

The slugs come from `nav.js`. ✅ means written.

| File | Pages |
|---|---|
| `basics.js` ✅ | default, java_intro, java_getstarted, java_syntax, java_statements, java_output, java_output_numbers, java_comments, java_variables (+ _print, _multiple, _identifiers, _final, _reallife), java_data_types (+ _numbers, _boolean, _characters, _reallife, _non-prim), java_var, java_type_casting, java_operators (+ _arithmetic, _assign, _comparison, _logical, _precedence), java_strings (+ _concat, _numbers, _specchars), java_math, java_booleans, java_booleans_reallife; challenges: syntax, output, variables, data_types, operators, strings, booleans |
| `control.js` ✅ | java_conditions (+ _else, _elseif, _shorthand, _nested, _logical, _reallife), java_switch, java_while_loop (+ _do, _reallife), java_for_loop (+ _nested, _reallife), java_foreach_loop, java_break, java_arrays (+ _loop, _reallife, _multi); challenges: conditions, switch, while_loop, for_loop, arrays |
| `methods.js` ✅ | java_methods, java_methods_param, java_methods_return, java_methods_overloading, java_scope, java_recursion; challenges: methods, methods_param |
| `classes.js` ✅ | java_oop, java_classes, java_class_attributes, java_class_methods, java_constructors, java_this, java_modifiers, java_non_modifiers, java_encapsulation, java_packages, java_inheritance, java_polymorphism, java_super, java_inner_classes, java_abstract, java_interface, java_anonymous, java_enums, java_enum_constructor, java_user_input, java_date; challenge: class |
| `errors_files.js` ✅ | java_errors, java_debugging, java_try_catch, java_exceptions_multiple, java_try_catch_resources, java_files, java_files_create, java_files_write, java_files_read, java_files_delete, java_io_streams, java_fileinputstream, java_fileoutputstream, java_bufferedreader, java_bufferedwriter |
| `collections.js` ✅ | java_data_structures, java_collections, java_list, java_arraylist, java_linkedlist, java_sort_list, java_set, java_hashset, java_treeset, java_linkedhashset, java_map, java_hashmap, java_treemap, java_linkedhashmap, java_iterator, java_algorithms |
| `advanced.js` ✅ | java_wrapper_classes, java_generics, java_annotations, java_regex, java_threads, java_lambda, java_advanced_sorting, java_projects, java_howtos |
| `reference.js` ✅ | java_ref_reference, java_ref_keywords, java_ref_string, java_ref_math, java_ref_output, java_ref_arrays, java_ref_arraylist, java_ref_linkedlist, java_ref_hashmap, java_ref_scanner, java_ref_file, java_ref_fileinputstream, java_ref_fileoutputstream, java_ref_bufferedreader, java_ref_bufferedwriter, java_ref_iterators, java_ref_collections, java_ref_system, java_ref_errors |
| `extras.js` ✅ | java_examples, java_compiler, java_exercises, java_quiz, java_exam, java_challenges, java_practice, java_server, java_syllabus, java_study_plan, java_interview_questions |

---

## 5. The 10 steps

Each step ends with: run the step's checks, fix failures, update **Status** and **Log**, then **stop and explain the result to the user in simple words** before starting the next step.

### Step 1: Smoke test the existing build ✅

- Start the server and check `/api/health`, a successful run, a compile error, the 10 s timeout and cross-origin rejection.
- In the browser, run every example on every registered page and check rendering, the exercise, the challenge, Try It, and the 400px layout.
- Result: fixed the JDK selection (JAVA_HOME pointed at JDK 11). All 96 examples pass.

### Step 2: `classes.js` part 1

- Pages: java_oop, java_classes, java_class_attributes, java_class_methods, challenge `class` (java_challenges_class), java_constructors, java_this, java_modifiers, java_non_modifiers, java_encapsulation, java_packages.
- Notes:
  - Examples that need several classes put the extra classes as non-public top-level classes in the same source, or as static nested classes, so they compile as one `Main.java`.
  - The packages page explains `package` and `import`, but its runnable examples only import JDK packages, because a single file can't declare a custom package and still run as-is.
- Done when: every page renders, all examples run, and the challenge is solvable (checked with a reference solution).

### Step 3: `classes.js` part 2

- Pages: java_inheritance, java_polymorphism, java_super, java_inner_classes, java_abstract, java_interface, java_anonymous, java_enums, java_enum_constructor, java_user_input, java_date.
- Notes:
  - `java_user_input` uses `Scanner(System.in)`; its examples pass `stdin`.
  - The Try It page has a stdin box; mention it in the lesson.
- Done when: same checks as step 2.

### Step 4: `errors_files.js`

- Pages: java_errors, java_debugging, java_try_catch, java_exceptions_multiple, java_try_catch_resources, java_files, java_files_create, java_files_write, java_files_read, java_files_delete, java_io_streams, java_fileinputstream, java_fileoutputstream, java_bufferedreader, java_bufferedwriter.
- Notes:
  - Each file example creates its own file first (the temp dir starts empty).
  - Prefer `java.nio.file.Files` for new-style examples; show `java.io.File` where the lesson is about it.
  - At least one example per page deliberately throws and catches an exception, to show real stack traces or messages.
- Done when: same checks; no example leaves the program hanging.

### Step 5: `collections.js`

- Pages: the 16 Data Structures pages listed in Section 4.
- Notes:
  - `HashSet`/`HashMap` iteration order isn't guaranteed. Don't build an example whose meaning depends on it; sort or use the Linked/Tree variants for stable output.
  - `java_algorithms` covers searching, sorting, `Collections.max/min/frequency/reverse/shuffle` (shuffle with `new Random(seed)`).
- Done when: same checks.

### Step 6: `advanced.js`

- Pages: java_wrapper_classes, java_generics, java_annotations, java_regex, java_threads, java_lambda, java_advanced_sorting, java_projects, java_howtos.
- Notes:
  - Thread examples must give deterministic output (`join()` before printing, or print only the final result).
  - `java_projects` is a list of 4–6 small project ideas, each with a runnable starter skeleton.
  - `java_howtos` is a list of short recipes (reverse a string, count words, sum an array, check a prime, and so on), each as a runnable example.
- Done when: same checks.

### Step 7: `reference.js`

- Pages: the 19 `java_ref_*` pages.
- Notes:
  - Each page is mainly a `table(['Method', 'Description', 'Returns'], rows)` written in our own words, plus 1–2 runnable examples.
  - `java_ref_keywords` lists all reserved keywords plus the contextual ones (`var`, `record`, `yield`, `sealed`, `permits`).
  - `java_ref_reference` is an index linking every other ref page with `JT.link(slug)`.
- Done when: every table renders and scrolls inside its wrapper at 400px; examples run.

### Step 8: `extras.js`

| Page | Content |
|---|---|
| `java_examples` | Index of all lesson examples, grouped by sidebar group, generated from `JT.nav` + `JT.renderBody(slug).examples`, each linking to `JT.tryitUrl` |
| `java_compiler` | Full editor (`JT.createEditor`) with stdin and console, wired in `after` |
| `java_exercises` | Index of every page that has an `exercise`, generated, with done/not-done marks from `JT.store` |
| `java_quiz` | 25 original multiple-choice questions, no pass mark |
| `java_exam` | 30 questions with `passMark: 75` and a result message. Not a certificate, and no W3Schools wording |
| `java_challenges` | Index of every `java_challenges_*` page, with solved marks |
| `java_practice` | 10–15 extra practice problems, using the challenge engine (real run plus output comparison) |
| `java_server` | Explains the local runner: how to start it, the limits, and the security note |
| `java_syllabus` | Topic outline by group |
| `java_study_plan` | A suggested 4-week schedule |
| `java_interview_questions` | Q&A list, original text |

Done when: every slug in `nav.js` has a page (automated check in step 9), and there are no 404s in the browser console.

### Step 9: Full browser test and fixes

Run these with Playwright (the plugin's MCP tools) against `http://127.0.0.1:8080`:

1. **Coverage:** `JT.order.filter(s => !JT.pages[s])` is empty, and `Object.keys(JT.pages).filter(s => !JT.navInfo[s])` is empty.
2. **Every example runs:** loop over all pages and `renderBody(slug).examples`, then call `JT.runJava`. Expect `ok`, except examples whose `desc` says they fail on purpose.
3. **Every page renders:** navigate to each slug through the sidebar or by URL. Check that there are no console errors, that `h1` is present, and that the active sidebar link is correct.
4. **Prev/Next:** from `default`, click Next all the way to the end; the visited slugs must equal `JT.order`. Then go back with Previous.
5. **Exercises:** for each page with an exercise, a wrong answer gives "Not quite" and the correct answer gives "Correct!".
6. **Challenges:** each starter compiles but doesn't pass; each reference solution passes.
7. **Quiz/exam:** all correct gives 100% and a pass; all wrong gives a fail.
8. **Mobile at 400×800:** no horizontal page scroll; the drawer opens and closes (☰ button, scrim click, link click); Try It panes stack.
9. **Try It:** `?page=&ex=` loads the right code and auto-runs; stdin works; a bad `page` or `ex` shows a friendly message.
10. **Search:** `/` focuses the search box; arrow keys and Enter navigate.
11. **History:** browser back and forward re-render the right page.
12. Recheck the step 1 observation: the URL once switched to `/java/` during a long `evaluate`; find out whether any code path calls `navigate` unexpectedly.

Fix everything found, then rerun until clean.

### Step 10: Docs and wrap-up

- Regenerate `docs/sidebar.json` from `JT.nav`. The current file is incomplete: group headings and the Cert/How To/Reference/Examples links are missing.
- In `ANALYSIS.md`, add a "Deviations from reference" section:
  - Videos page dropped.
  - "Certificate" becomes "Final Exam".
  - "Java Server" becomes "Java Local Runner".
  - The quiz is built in rather than an external app.
  - Exercise and challenge grading happen on the client or through a real local run, instead of a server POST.
  - CodeMirror and Prism are replaced by a custom editor and highlighter.
- Write `README.md`: requirements (Node 18+, JDK 17+), `node server.js`, the URL, env vars (`PORT`, `JAVA_RUNNER_HOME`), the project layout, the security note, and how to add a page (link to Section 3 of this file).
- Remove the dead `FILE_MODE` code from `app.js` (the site only works through the server).
- Delete test leftovers (`.playwright-mcp/`).
- Do a final side-by-side comparison with the reference (layout, sidebar behaviour, example box, Try It flow) and record the result in ANALYSIS.md.

---

## 6. Status

| Step | Status |
|---|---|
| 1 Smoke test | ✅ done (2026-10-27) |
| 2 classes.js part 1 | ✅ done (2026-10-28) |
| 3 classes.js part 2 | ✅ done (2026-10-28) |
| 4 errors_files.js | ✅ done (2026-10-28) |
| 5 collections.js | ✅ done (2026-10-28) |
| 6 advanced.js | ✅ done (2026-10-28) |
| 7 reference.js | ✅ done (2026-10-28) |
| 8 extras.js | ✅ done (2026-10-28) |
| 9 Full test | ✅ done (2026-10-28) |
| 10 Docs and wrap-up | ✅ done (2026-10-28) |

## 7. Known issues and open items

- None open. `docs/sidebar.json` is regenerated from `nav.js`; the dead `FILE_MODE` code and unused helpers are removed.
- Accepted limitation: the runner is not a sandbox (see README, Security).

## 8. How to run the quick checks

```bash
node server.js                                  # in one terminal
curl http://127.0.0.1:8080/api/health           # expect version >= 17
for f in public/js/*.js public/js/content/*.js; do node --check "$f"; done
```

Run-all-examples snippet (paste into the browser console on any `/java/` page):

```js
(async () => { const fails = [];
  for (const s of Object.keys(JT.pages)) for (const [i, e] of JT.renderBody(s).examples.entries()) {
    const r = await JT.runJava(e.run, e.stdin);
    if (!r.ok && !/on purpose/.test(JT.renderBody(s).html)) fails.push([s, i, r.stderr.slice(0, 200)]);
  } console.table(fails); })();
```

## 9. Log

- **2026-10-27, Step 1:** Server tested (health, run, compile error, timeout, CORS). Fixed JDK choice (now picks the newest JDK; `JAVA_RUNNER_HOME` overrides). Browser: 75 pages and 96 examples OK; exercise, challenge, Try It and mobile drawer all verified.
- **2026-10-28, Step 2:** Created `public/js/content/classes.js` with 11 pages (java_oop to java_packages, plus java_challenges_class). 21 examples run (1 fails to compile on purpose, as intended). All exercises have consistent blanks/answers. Challenge checked: the starter compiles but fails, the reference solution passes. Part 2 pages are appended to the same file in step 3.
- **2026-10-28, Step 3:** Appended 11 pages to `classes.js` (java_inheritance to java_date). Found and fixed a **locale bug**: the host's regional settings made `printf` print `3,14` and `Scanner` reject `4.5`. The server now forces en-US for user programs. Try It now opens the "Program input" panel when an example has stdin. Full re-run: 97 pages and 140 examples OK; the 4 compile failures are all intentional examples. The "URL changed by itself" observation from step 1 was traced: no code path calls `pushState` during rendering or running. The cause was most likely a manual click in the visible Playwright window. The step 9 Next-walk will confirm.
- **2026-10-28, Step 4:** Created `errors_files.js` with 15 pages (Errors ×5, File Handling ×5, I/O Streams ×5). 39 examples verified: 35 OK, plus 2 intentional compile failures and 2 intentional runtime exceptions. All file examples create their own files in the run's temp directory. Fixed a UX bug: "Run here" errors showed the wrapped program's line numbers (e.g. line 11 for line 1). Errors now map back to the snippet lines (`JT.wrapOffset`).
- **2026-10-28, Step 5:** Created `collections.js` with 16 Data Structures pages. 33 examples verified (32 OK plus 1 intentional `ConcurrentModificationException`). No example depends on HashSet/HashMap iteration order: they sort, or use Linked/Tree variants, and shuffle is seeded. Fixed two things found while testing: a full-program example lacked `import java.util.*;`, and a case-sensitivity sort demo printed identical lines (its data now shows the difference).
- **2026-10-28, Step 6:** Created `advanced.js` with 9 pages: 7 Advanced lessons, plus java_projects (5 runnable starter projects with extension ideas: guessing game, tip calculator, to-do manager, word counter, bank simulator) and java_howtos (15 recipes). 40 examples verified (39 OK plus 1 intentional `@Override` compile error). The thread examples use `join()`; the race-condition demo reports lost updates honestly whatever the real count is. Fixed the guessing-game sample input so it actually reaches the secret number, and a misleading label in a regex example.
- **2026-10-28, Step 7:** Created `reference.js` with 19 pages. A small `ref(slug, intro, rows, examples)` helper builds most pages from `[method, description, returns]` rows written in our own words. Pages: an index (no broken links), keywords (50 reserved + 6 contextual), 16 method tables, and an errors and exceptions page. All 18 examples OK. Replaced one example that printed a machine-dependent hash with a deterministic `NegativeArraySizeException`. At 400px the tables scroll inside `.table-wrap`, and the page has no horizontal overflow.
- **2026-10-28, Step 8:** Created `extras.js` with 11 pages. All sidebar slugs now have pages: `JT.order` has no missing pages, and no page is registered outside the nav. Generated indexes: the examples index (270 examples linking to Try It), the exercises index (55, with done badges) and the challenges index (15, with solved badges). The compiler page has an editor, stdin, a console and code saved in localStorage. Quiz has 25 questions and the exam 30 with a 75% pass mark; options are shuffled with a fixed seed so answers spread over A–D (they were mostly "B" before). Practice has 12 problems on the challenge engine; each starter compiles and fails, and each reference solution passes. The Local Runner page shows a live `/api/health` status. Syllabus, study plan and 15 interview Q&As are included. Engine changes in `app.js`: `renderBody` is now re-entrant (it saves and restores the collecting state, so index pages can render other pages), and `after()` now also receives `renderChallenge`/`wireChallenge`. The browser console is now free of errors.
- **2026-10-28, Step 9:** Ran the full browser test (Playwright, against `http://127.0.0.1:8080`). Results by check:
  1. **Coverage:** all 167 `JT.order` slugs have pages; no orphan pages.
  2. **Examples:** 270 run; 260 OK and 10 fail on purpose (each page says so); none took over 3 s.
  3. **Every page renders:** checked during the Next walk (h1 present, correct active sidebar link, title, no JS errors).
  4. **Prev/Next:** clicking Next from `default` visits exactly `JT.order` (167 pages); Previous walks it back in reverse.
  5. **Exercises:** all 55 give "Not quite" for a wrong answer and "Correct!" for the right one.
  6. **Challenges:** all 15 starters compile and fail; all 15 reference solutions pass. **Fixed:** the `methods_param` starter did not compile (it called `max3` before it existed); it now has a stub returning 0.
  7. **Quiz/exam:** 100% gives a pass; blank gives 0% and a fail on the exam (verified in step 8).
  8. **Mobile 400×800:** no horizontal overflow on any of the 167 pages; the drawer opens with ☰ and closes on a scrim click or a link click; the top nav is hidden.
  9. **Try It:** panes stack at 400px; stdin is pre-filled and the input panel opens; `?page=nope&ex=99` shows "Example not found" plus a starter program. Unknown `/java/<slug>` shows "Page not found".
  10. **Search:** `/` focuses the box; typing filters; ArrowDown and Enter navigate and clear the box.
  11. **History:** browser Back and Forward re-render the right page, heading and sidebar state.
  12. **Step 1 URL mystery:** closed. The 167-page Next walk shows no unexpected navigation; the earlier observation came from outside the code.
  - Also verified: the theme toggle switches dark/light and persists in `localStorage` (`jt-theme`).
  - Test-harness notes: drawer timing and Back/Forward looked flaky only when measured right after a heavy synchronous loop or with too-short waits; they pass when isolated.
- **2026-10-28, Step 10:** Regenerated `docs/sidebar.json` from `nav.js` (13 groups, 167 pages). ANALYSIS.md: corrected the "full tree" claim, added §10 (deviations from the reference, with reasons) and §11 (final comparison against a fresh REA capture of the reference `java_variables` page, evidence `ev_e56b9a6e…`; layout and navigation structure match, and the differences are intentional). Wrote `README.md` (requirements, run, env vars, security, layout, how to add pages). Removed dead `FILE_MODE`/`data-href` code from `app.js` and `index.html`, and unused helpers in `control.js`. Regression check after cleanup: all pages present, top nav works, inline run and Try It links work, Next walk 167/167, no console messages. Deleted `.playwright-mcp/` test output. **Project complete.**
