# Java Tutorial Section — Reverse-Engineering Notes

Target: `https://www.w3schools.com/java/` (Java section only).
Tooling: REA `capture_browser_scenario` (launch mode, headless Chrome 156, owned temporary profile).
Date of capture: 2026-10-27.

Every statement below is labelled **Observed** (seen directly in a REA capture), **Inferred**
(reasoned from observed data but not directly seen), or **Unknown**.

## Evidence

| Evidence ID | Scenario | Captured |
|---|---|---|
| `ev_b516e7a7…c9e743` | `/java/default.asp`, 1280×720, wait 3 s | accessibility tree, network, console |
| `ev_7c4dfa36…9ba743` | `/java/java_variables.asp`, 1280×720 | full DOM, accessibility tree |
| `ev_cc7cffa7…ba05` | `/java/tryjava.asp?filename=demo_helloworld` | full DOM, accessibility tree, network |
| `ev_02a13f56…2f4d` | `/java/java_variables.asp`, 400×800 (mobile), click exercise option, click Submit | accessibility, storage, network |
| `ev_646abde5…3f6e` | `/java/java_quiz.asp` | accessibility tree |

Raw captures are not checked in (they contain third-party ad payloads).

## 1. Page layout

**Observed** (DOM ids from `ev_7c4dfa36`):

- `#top-nav-bar` / `#pagetop`: logo, buttons *Tutorials / References / Exercises / Certificates*,
  search box, dark-mode toggle (`#toggle-darkmode-wrapper`), sign-in / upgrade links.
- `#subtopnav`: horizontally scrolling bar of language links with `#scroll_left_btn` /
  `#scroll_right_btn`. (Other languages — out of scope, not rebuilt.)
- `#sidenav.w3-sidebar.w3-collapse` → `#leftmenuinner` → `#leftmenuinnerinner`: the Java sidebar.
  Inline CSS: `@media (max-width:992px) { #leftmenuinner, #sidenav { width:260px } }`.
  `#menubtn_container` holds the mobile menu button.
- `#belowtopnav` → `#main`: lesson content. `#right`: ad skyscraper column. `#footer`.
- Lesson pages start with `<h1>` + a bookmark button, then **❮ Previous / Next ❯** buttons,
  share buttons, then content, and repeat **❮ Previous / Next ❯** at the bottom.

**Inferred:** the `w3-collapse` class hides the sidebar below the large breakpoint and the
menu button toggles it as an overlay (standard W3.CSS behaviour; the toggle handler itself
was not captured).

## 2. Sidebar navigation

**Observed** (`ev_7c4dfa36`, parsed from `#leftmenuinnerinner`):

- Group headings (`<h2 class="left">`): Java Tutorial, Java Methods, Java Classes, Java Errors,
  Java File Handling, Java I/O Streams, Java Data Structures, Java Advanced, Java Projects,
  Java Cert, Java How To's, Java Reference, Java Examples.
- Links use `target="_top"` and relative `*.asp` hrefs.
- Parent topics with sub-pages use `a.overview_header` + `span.w3s-accordion`, followed by
  `div.tut_overview.overview_body` containing child links. Only the active topic's body is
  expanded (`style="display:block"`, class `active-links-present`); the current link has
  class `active`.
- 151 links in the tutorial groups (including sub-pages) plus 34 links in the Cert/How-To/
  Reference/Examples groups.
- The first parse of the captured DOM was incomplete: it missed the group headings after the
  first, and the Cert/How-To/Reference/Examples links, which lack `target="_top"`. The tree was
  therefore rebuilt by hand in `public/js/nav.js`. [sidebar.json](sidebar.json) is now
  generated from that file, so it is the **JavaTrail** tree, including the deviations listed
  in §10, not a raw copy of the reference.
- Each topic with sub-pages ends with a *Code Challenge* sub-page
  (`java_challenges_<topic>.asp`).

Previous/Next order follows sidebar order **including sub-pages** — Observed: on
`java_variables.asp`, Previous = `java_comments.asp`, Next = `java_variables_print.asp`.
On the quiz page: Previous = `java_exercises.asp`, Next = `java_challenges.asp`.

## 3. Content structure

**Observed** (`ev_7c4dfa36`):

- `h2` section headings separated by `<hr>`.
- Inline code: `code.w3-codespan`.
- Example box: `div.w3-example` → `h3` ("Example" / "Syntax") → optional explanatory `p` →
  `pre.language-java > code.language-java` → `a` "Try it Yourself »" linking to
  `tryjava.asp?filename=demo_<name>`.
- Notes: `div.ws-note.w3-panel`.
- Some pages end with a "Video" block (YouTube link) — not rebuilt.

## 4. Syntax highlighting

**Observed:** `/lib/prism2.js` + `/lib/prism1.css` loaded; code is pre-tokenised into
`span.token.operator`, `span.token.punctuation`, etc. (Prism.js).
**Inferred:** highlighting runs client-side on page load (Prism's default auto-highlight).

## 5. Try It Yourself

**Observed** (`ev_cc7cffa7`, `submitTryit()` source in page):

- Separate page `tryjava.asp?filename=…`, opened from the lesson. Editor is CodeMirror
  (`/lib/codemirror_clike.js`, `/lib/codemirror_multi.js`) bound to `#textareaCode`.
- Buttons: **Run ❯**, orientation/theme toggles, result size readout ("Result Size: 500 x 665"),
  draggable splitter (`dragstart/dragmove/dragend`), `restack()` switches to vertical layout
  when `screen.availWidth <= 768` in portrait.
- Run: the code is copied into a hidden `<form id="codeForm">`, with `=` → `w3equalsign`,
  `+` → `w3plussign` and `script` → `w3scrw3iptag` substitutions, then POSTed to
  `https://try.w3schools.com/try_java.php?x=<random>` with `target="iframeResult"`.
  The result page is rendered in a fresh `<iframe id="iframeResult">`; a spinner
  (`#runloadercontainer`) is shown until the iframe `load` event.
- The initial page already showed output ("Hello World").

**Inferred:** compilation and execution happen server-side; the browser only displays the
returned HTML. **Unknown:** server sandbox, time/memory limits, stdin support.

## 6. Exercises

**Observed** (`ev_7c4dfa36`, `ev_02a13f56`):

- `div#exercisecontainer[src="xrcise_variables.js"]`; loader fetches
  `/java/xrcise_variables.js?m=<timestamp>`.
- Drag-and-drop fill-the-blank: `#qobj_question` prompt, `code` with `span.ddcontainer`
  blanks, `div.dragoption` choices. Both drag (mouse/touch handlers) and click work:
  clicking option `#dragoption1` placed "string" into the blank; clicking the placed answer
  removes it (`remove_drag_option`).
- **Submit Answer »** issued `POST /java/exercise.asp?x=xrcise_variables1` as a top-level
  document navigation, i.e. grading happens on a separate exercise page, server side.
- `java_exercises.asp` is the index of all exercises.

**Unknown:** the grading response format (the capture ended after navigation started).

## 7. Quiz

**Observed** (`ev_646abde5`): `java_quiz.asp` is an intro page — "25 questions", "no time
limit", "1 point for each correct answer", links to `/quiztest/quiztest.asp?qtest=JAVA`.
The quiz engine itself lives outside the `/java/` section and was not captured.

## 8. Network and client behaviour

**Observed** (`ev_b516e7a7`, 239 requests): first-party resources are CSS
(`w3css.v6.0.3.css`, `lib/w3schools/main…css`, topnav, my-learning), JS (`prism2.js`,
`topnav`, `user-session`, `my-learning`, `xrcise_output.js`), fonts (Source Sans Pro,
Source Code Pro, Roboto Mono, FontAwesome). The majority of requests are third-party ad/
tracking (googlesyndication, doubleclick, casalemedia, 3lift, openx…). Console showed only
ad-library deprecation warnings and failed tracking pixels. Cookie `w3s.theme` stores the
theme selection.

Not rebuilt: ads, tracking, accounts, bookmarks, progress tracking, Adventure app promos,
certificates purchase, other languages.

## 9. Implementation decisions (not observations)

- Original branding ("JavaTrail"), original lesson text and examples.
- Single shell page with History-API routing over the same slug scheme (`/java/<slug>`).
- Execution: local Node service runs `javac` + `java` (JDK 25) per request with timeouts and
  output caps. Grading of exercises is client-side and inline (reference grades server-side
  on a separate page). Code challenges are graded by **actually running** the code and
  comparing stdout.
- Quiz is built into the section (reference hands off to a separate quiz app).

## 10. Deviations from the reference

What JavaTrail deliberately does differently, and why.

| Area | Reference (observed) | JavaTrail | Reason |
|---|---|---|---|
| Branding and text | W3Schools logo, colours and lesson text | "JavaTrail" name, own palette, all explanations, examples, exercises and quiz questions written from scratch | Task rule: no copied text or branding |
| Other languages | `#subtopnav` bar with every language | Not present | Task rule: Java only |
| Ads, tracking, accounts | Ad columns (`#right`), trackers, sign-in, bookmarks, upgrade promos | None | Out of scope; no external requests at all |
| Sidebar items | "Java Videos" page; "Java Certificate"; "Java Server" | Videos dropped (YouTube content); renamed "Java Final Exam" and "Java Local Runner" | No third-party embeds; the exam is a self-assessment, not a certificate; the runner is local |
| URLs | `/java/<slug>.asp` per page | `/java/<slug>` in a single-page shell (History API) | Static site, no server-side templating |
| Syntax highlighting | Prism.js | Small built-in regex tokenizer (`JT.highlight`) | No CDN or third-party libraries |
| Try It editor | CodeMirror; Run POSTs to `try.w3schools.com` and the result loads in an iframe | Textarea editor with an overlay highlighter; Run calls the local `/api/run` and the result is shown as text, with a stdin box | Real execution on the user's own JDK; no remote service |
| Inline running | Lesson pages only link to Try It | Each example also has "Run here", with line numbers mapped back to the snippet | Faster feedback |
| Exercises | Submit triggers a top-level POST to `exercise.asp` (server-graded) | Graded in the browser on the same page; progress kept in `localStorage` | No server-side state needed |
| Code challenges | Challenge pages exist (not captured in detail) | The user writes a full program; it is really compiled and run, and stdout is compared with the expected output | "Do not fake execution results" |
| Quiz | Intro page linking to an external quiz app | Built in: 25-question quiz and 30-question final exam (75% pass mark), options shuffled with a fixed seed | Self-contained section |
| Locale | Unknown | User programs run with a fixed en-US locale | Same output (decimal point) on every host |

## 11. Final comparison (2026-10-28)

A fresh capture of the reference `java_variables` page (`ev_e56b9a6e…08e43`, 1280×800,
screenshot) was compared with JavaTrail's `/java/java_variables` at the same size.

**Matches:**
- A fixed top bar.
- A left sidebar (260 px) with group headings and expandable topics; only the active topic is open and the current sub-page is highlighted.
- An `h1` followed by **❮ Previous / Next ❯** buttons, repeated at the bottom.
- `h2` sections separated by rules.
- "Syntax"/"Example" boxes with highlighted code and "Try it Yourself »".
- An exercise at the end of the page.
- Below 992 px the sidebar becomes an overlay opened by a menu button.
- Prev/Next order equals sidebar order including sub-pages (verified across all 167 pages).

**Intentional differences:** see §10. The most visible are no ad columns, no language bar, no account buttons, and original colours and wording.

**Functional verification:** recorded in [PLAN.md](PLAN.md), step 9. All 270 examples, 55 exercises, 15 challenges, 12 practice problems, the quiz/exam, mobile layout, search and history were tested in a real browser.
