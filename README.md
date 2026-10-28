# JavaTrail

A self-contained Java tutorial website with **real code execution**. Its structure (sidebar, lesson pages, Try It editor, exercises, quiz) is modelled on the Java section of a popular tutorial site. All text, examples, exercises and quiz questions are original.

- 167 pages in 13 groups, with sidebar, Previous/Next and search
- 270 runnable examples, each with a "Run here" button and a "Try it Yourself »" editor
- 55 fill-in-the-blank exercises, 15 code challenges and 12 practice problems
- A 25-question quiz and a 30-question final exam
- Responsive layout (off-canvas sidebar below 992px), plus dark and light themes

Code is compiled and run by **your local JDK**. Nothing is simulated, and no code is sent anywhere else.

## Requirements

- **Node.js 18 or newer.** No npm packages are needed.
- **JDK 17 or newer.** The lessons use text blocks, switch expressions and records.

## Run it

```bash
node server.js
```

Then open <http://127.0.0.1:8080/java/>.

| Environment variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Port to listen on |
| `JAVA_RUNNER_HOME` | newest JDK found | JDK to use for running code. Without it, the server picks the newest JDK among `JAVA_HOME` and `C:\Program Files\Java\*` |

Check the runner with `curl http://127.0.0.1:8080/api/health`. The response shows the JDK path and version.

## Security

**The runner is not a sandbox.** Submitted programs run with the permissions of the user who started `server.js`, and could read or modify that user's files. Several things reduce the risk:

- the server only listens on `127.0.0.1`;
- it rejects cross-origin requests;
- each run has limits: 20 s to compile, 10 s to run, 256 MB of memory, 64 KB of output, and at most 2 runs at once;
- each run uses a fresh temporary folder that is deleted afterwards.

Do not expose this server to a network, and only run code you trust.

## Project layout

```
server.js                 Node server: static files + POST /api/run (javac + java)
public/
  index.html              site shell (top bar, sidebar, content)
  tryit.html              full-page "Try it Yourself" editor
  css/style.css           all styles, themes and breakpoints
  js/core.js              highlighter, editor, run client, theme
  js/nav.js               sidebar tree; also defines Previous/Next order
  js/app.js               router, rendering, exercise/challenge/quiz engines
  js/tryit.js             Try It page logic
  js/content/*.js         lesson pages, one file per sidebar group
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
