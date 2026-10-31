// Site shell: routing, sidebar, search, page rendering, exercises, challenges, quiz.
(function () {
  'use strict';
  const JT = window.JT;
  const esc = JT.esc;

  // Each course has its own URL base, slug prefix, navigation and Previous/Next order.
  // The Java Tutorial is last because it is the fallback for every other slug.
  const COURSES = [
    { base: '/major-gems', home: 'gems_home', prefix: 'gems_', name: 'Major Gems', nav: 'gemsNav', order: 'gemsOrder', css: 'gems-route', search: 'gem guides' },
    { base: '/coding-interview', home: 'coding_home', prefix: 'coding_', name: 'Coding Interview', nav: 'codingNav', order: 'codingOrder', css: 'coding-route', search: 'coding problems' },
    { base: '/rails-scenarios', home: 'scenario_home', prefix: 'scenario_', name: 'Real-world Scenarios', nav: 'scenarioNav', order: 'scenarioOrder', css: 'scenarios-route', search: 'scenario questions' },
    { base: '/security', home: 'security_home', prefix: 'security_', name: 'Security', nav: 'securityNav', order: 'securityOrder', css: 'security-route', search: 'security lessons' },
    { base: '/spring-boot', home: 'springboot_home', prefix: 'springboot_', name: 'Spring Boot', nav: 'springBootNav', order: 'springBootOrder', css: 'springboot-route', search: 'Spring Boot lessons' },
    { base: '/spring', home: 'spring_home', prefix: 'spring_', name: 'Spring Framework', nav: 'springNav', order: 'springOrder', css: 'spring-route', search: 'Spring lessons' },
    { base: '/java-core-advanced', home: 'java_ca_home', prefix: 'java_ca_', name: 'Java Core Advance', nav: 'coreAdvNav', order: 'coreAdvOrder', css: 'core-advanced-route', search: 'Core Advanced lessons' },
    { base: '/ruby', home: 'ruby_home', prefix: 'ruby_', name: 'Ruby', nav: 'rubyNav', order: 'rubyOrder', css: 'ruby-route', search: 'Ruby lessons' },
    { base: '/rails', home: 'rails_home', prefix: 'rails_', name: 'Ruby on Rails', nav: 'railsNav', order: 'railsOrder', css: 'rails-route', search: 'Rails lessons' },
    { base: '/java', home: 'default', prefix: '', name: 'Java', nav: 'nav', order: 'order', css: 'java-route', search: 'Java pages' },
  ];
  const courseForSlug = (slug) => COURSES.find((c) => slug === c.home || slug.startsWith(c.prefix));
  const courseForPath = (p) => COURSES.find((c) => p === c.base || p.startsWith(c.base + '/'));
  const course = () => courseForPath(location.pathname) || COURSES[COURSES.length - 1];
  JT.course = course;

  // The site is served by server.js (it needs /api/run), so URLs are always absolute paths.
  JT.url = (slug) => {
    const c = courseForSlug(slug);
    return c.base + '/' + (slug === c.home ? '' : slug);
  };
  JT.tryitUrl = (slug, i) => '/tryit?page=' + encodeURIComponent(slug) + '&ex=' + i;
  const link = (slug, text) => '<a href="' + JT.url(slug) + '">' + (text || esc((JT.navInfo[slug] || {}).fullTitle || slug)) + '</a>';
  JT.link = link;

  // ---- Progress (per-browser convenience only) ----
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem('jt-' + k)) || {}; } catch { return {}; } },
    mark(k, id) { const o = store.get(k); o[id] = Date.now(); try { localStorage.setItem('jt-' + k, JSON.stringify(o)); } catch { /* storage blocked */ } },
  };
  JT.store = store;

  // ---- Sidebar ----
  function renderSidebar(current) {
    const side = document.getElementById('sidebar');
    const nav = JT[course().nav];
    side.setAttribute('aria-label', course().name + ' navigation');
    const menuButton = document.getElementById('menu-btn');
    if (menuButton) menuButton.setAttribute('aria-label', 'Toggle the ' + course().name + ' menu');
    let html = '';
    for (const g of nav) {
      const words = g.title.split(' ');
      html += '<h2><span>' + esc(words[0]) + '</span> ' + esc(words.slice(1).join(' ')) + '</h2>';
      for (const it of g.items) {
        if (!it.children) { html += '<a href="' + JT.url(it.slug) + '"' + (it.slug === current ? ' class="active"' : '') + '>' + esc(it.title) + '</a>'; continue; }
        const inside = it.children.some((c) => c.slug === current);
        html += '<div class="side-parent' + (inside ? ' active-parent' : '') + '"><a href="' + JT.url(it.slug) + '">' + esc(it.title) + '</a>' +
          '<button class="side-toggle" aria-label="Show ' + esc(it.title) + ' sub-topics" aria-expanded="' + inside + '">' + (inside ? '▲' : '▼') + '</button></div>' +
          '<div class="side-children' + (inside ? ' open' : '') + '">' +
          it.children.map((c) => '<a href="' + JT.url(c.slug) + '"' + (c.slug === current ? ' class="active"' : '') + '>' + esc(c.title) + '</a>').join('') + '</div>';
      }
    }
    side.innerHTML = html;
    const act = side.querySelector('a.active');
    if (act) {
      const r = act.getBoundingClientRect(), sr = side.getBoundingClientRect();
      if (r.top < sr.top || r.bottom > sr.bottom) side.scrollTop += r.top - sr.top - sr.height / 3;
    }
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.side-toggle');
    if (!t) return;
    const kids = t.parentElement.nextElementSibling;
    const open = kids.classList.toggle('open');
    t.setAttribute('aria-expanded', open);
    t.textContent = open ? '▲' : '▼';
  });

  // ---- Content helpers used by content files ----
  let collecting = null;
  const WRAP_IMPORTS = 'import java.util.*;\nimport java.util.function.*;\nimport java.util.stream.*;\nimport java.io.*;\nimport java.nio.file.*;\nimport java.time.*;\nimport java.time.format.*;\n\n';
  const WRAP_HEAD = WRAP_IMPORTS + 'public class Main {\n    public static void main(String[] args) throws Exception {\n';
  JT.runnable = function (code) {
    if (/\b(class|interface|record|enum)\s+[A-Z]\w*[^;]*\{/.test(code) && /static\s+void\s+main/.test(code)) return code;
    const body = code.split('\n').map((l) => '        ' + l).join('\n');
    return WRAP_HEAD + body + '\n    }\n}\n';
  };
  // Lines the wrapper adds before a snippet; used to map compiler/stack-trace line numbers back to the snippet.
  JT.wrapOffset = (code) => (JT.runnable(code) === code ? 0 : WRAP_HEAD.split('\n').length - 1);
  const dedent = (s) => {
    s = s.replace(/^\n+|\s+$/g, '');
    const ind = Math.min(...s.split('\n').filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return s.split('\n').map((l) => l.slice(ind)).join('\n');
  };
  JT.dedent = dedent;
  JT.h = {
    p: (html) => '<p>' + html + '</p>',
    h2: (t) => '<h2>' + t + '</h2>',
    h3: (t) => '<h3>' + t + '</h3>',
    hr: () => '<hr>',
    ul: (items) => '<ul>' + items.map((i) => '<li>' + i + '</li>').join('') + '</ul>',
    ol: (items) => '<ol>' + items.map((i) => '<li>' + i + '</li>').join('') + '</ol>',
    note: (html) => '<div class="note"><p>' + html + '</p></div>',
    code: (c) => '<pre class="code">' + JT.highlight(dedent(c)) + '</pre>',
    syn: (c, title) => '<div class="example"><h3>' + (title || 'Syntax') + '</h3><pre class="code">' + JT.highlight(dedent(c)) + '</pre></div>',
    table: (head, rows) => '<div class="table-wrap"><table class="ref"><thead><tr>' + head.map((h) => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
      rows.map((r) => '<tr>' + r.map((c) => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>',
    // Runnable example. opts: {title, desc, stdin, noRun, lang: 'ruby'}
    ex(code, opts = {}) {
      code = dedent(code);
      const idx = collecting ? collecting.length : 0;
      // Ruby runs as written; Java snippets are wrapped in a Main class.
      const ruby = opts.lang === 'ruby';
      if (collecting) collecting.push({ code, lang: ruby ? 'ruby' : 'java', run: ruby ? code : JT.runnable(code), offset: ruby ? 0 : JT.wrapOffset(code), stdin: opts.stdin || '', title: opts.title || '' });
      const slug = JT.currentSlug;
      return '<div class="example"><h3>' + (opts.title || 'Example') + '</h3>' + (opts.desc ? '<p>' + opts.desc + '</p>' : '') +
        '<pre class="code">' + (ruby ? JT.highlightRuby(code) : JT.highlight(code)) + '</pre>' +
        (opts.noRun ? '' : '<div class="run-bar"><a class="btn" target="_blank" href="' + JT.tryitUrl(slug, idx) + '">Try it Yourself »</a>' +
        '<button class="btn ghost" data-run-ex="' + idx + '">Run here</button><span class="run-status"></span></div><div class="ex-out" hidden></div>') + '</div>';
    },
  };

  JT.pages = {};
  JT.def = (slug, page) => { JT.pages[slug] = page; };
  JT.springLabMarkup = (course, module, mode, code) => '<section class="spring-project-lab" data-course="' + esc(course) + '" data-module="' + esc(module || 'core') + '" data-mode="' + esc(mode || 'program') + '"><h2>Try it Yourself</h2>' +
    '<p>Edit the lesson example and run it in a temporary Maven project. Lesson snippets are wrapped in a small application context; complete programs run as written. Some database labs use in-memory H2. The lab never uses your PostgreSQL credentials.</p>' +
    '<div class="spring-lab-editor"><textarea class="spring-lab-seed" hidden>' + esc(code) + '</textarea><div class="spring-lab-code"></div></div>' +
    '<div class="run-bar"><button class="btn" data-spring-run>Run with Maven</button><button class="btn ghost" data-spring-reset>Reset example</button><span class="run-status" data-spring-status></span></div>' +
    '<div class="console spring-lab-console" data-spring-console aria-live="polite">Edit the example, then choose Run with Maven. The first run may download dependencies.</div>' +
    '<p class="small">The local lab runs user code with the permissions of JavaTrail. Keep JavaTrail on localhost. Boot web samples use a random loopback port for one request and then stop. PostgreSQL, Redis, Kafka and other external services are not started automatically.</p></section>';
  JT.runSpring = async (course, module, mode, code) => {
    try {
      const res = await fetch('/api/spring/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ course, module, mode, code }) });
      const data = await res.json();
      if (!res.ok && !data.error) data.error = 'Spring lab request failed (HTTP ' + res.status + ').';
      return data;
    } catch { return { error: 'Cannot reach the Spring Maven lab. Start JavaTrail with node server.js and open it from http://127.0.0.1:8081/.' }; }
  };
  JT.challenge = (topic, c) => {
    const slug = 'java_challenges_' + topic;
    const info = JT.navInfo[slug];
    const title = !info ? 'Java Code Challenge' : info.parent.children ? info.parent.title + ' Challenge' : info.title;
    JT.pages[slug] = { title, challenge: c, body: () => c.intro || '' };
  };

  // Execute a page body and collect its examples.
  JT.renderBody = function (slug) {
    const page = JT.pages[slug];
    if (!page) return { html: '', examples: [] };
    // Save and restore state so index pages can call renderBody for other pages from their own body.
    const prev = JT.currentSlug, prevCollecting = collecting;
    JT.currentSlug = slug;
    collecting = [];
    const html = typeof page.body === 'function' ? page.body() : page.body || '';
    const examples = collecting;
    collecting = prevCollecting;
    JT.currentSlug = prev;
    return { html, examples };
  };

  // ---- Exercises ----
  JT.renderExercise = function (ex, id) {
    let n = 0;
    const codeHtml = esc(dedent(ex.code)).replace(/___/g, () => '<span class="blank" tabindex="0" data-blank="' + n++ + '" role="button" aria-label="Answer slot ' + n + '"></span>');
    const opts = ex.options.map((o, i) => '<span class="ex-option" draggable="true" tabindex="0" role="button" data-opt="' + i + '">' + esc(o) + '</span>').join('');
    return '<div class="exercise" data-exercise="' + esc(id) + '"><h2>Exercise</h2><p class="ex-q">' + ex.q + '</p>' +
      '<div class="ex-code">' + codeHtml + '</div>' +
      '<p class="run-status">Click an option (or drag it) into a slot. Click a filled slot to clear it.</p>' +
      '<div class="ex-options">' + opts + '</div>' +
      '<button class="btn" data-check>Submit Answer »</button> <button class="btn ghost" data-reset>Reset</button><div class="feedback" hidden></div></div>';
  };
  function wireExercise(root, ex, id) {
    const blanks = [...root.querySelectorAll('.blank')];
    const options = [...root.querySelectorAll('.ex-option')];
    const fb = root.querySelector('.feedback');
    const place = (blank, opt) => {
      if (blank.dataset.opt != null) options[blank.dataset.opt].classList.remove('used');
      blank.textContent = opt.textContent; blank.dataset.opt = opt.dataset.opt;
      blank.classList.add('filled'); blank.classList.remove('right', 'wrong'); opt.classList.add('used'); fb.hidden = true;
    };
    const clear = (blank) => {
      if (blank.dataset.opt == null) return;
      options[blank.dataset.opt].classList.remove('used');
      delete blank.dataset.opt; blank.textContent = ''; blank.classList.remove('filled', 'right', 'wrong'); fb.hidden = true;
    };
    options.forEach((o) => {
      const pick = () => { const b = blanks.find((x) => x.dataset.opt == null); if (b) place(b, o); };
      o.addEventListener('click', pick);
      o.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      o.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', o.dataset.opt));
    });
    blanks.forEach((b) => {
      b.addEventListener('click', () => clear(b));
      b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Backspace') { e.preventDefault(); clear(b); } });
      b.addEventListener('dragover', (e) => { e.preventDefault(); b.classList.add('drag-over'); });
      b.addEventListener('dragleave', () => b.classList.remove('drag-over'));
      b.addEventListener('drop', (e) => { e.preventDefault(); b.classList.remove('drag-over'); const o = options[e.dataTransfer.getData('text/plain')]; if (o) place(b, o); });
    });
    root.querySelector('[data-reset]').addEventListener('click', () => blanks.forEach(clear));
    root.querySelector('[data-check]').addEventListener('click', () => {
      if (blanks.some((b) => b.dataset.opt == null)) { fb.hidden = false; fb.className = 'feedback bad'; fb.textContent = 'Fill every slot before submitting.'; return; }
      let right = 0;
      blanks.forEach((b, i) => { const ok = b.textContent === ex.answer[i]; b.classList.add(ok ? 'right' : 'wrong'); if (ok) right++; });
      fb.hidden = false;
      if (right === blanks.length) {
        fb.className = 'feedback ok'; fb.innerHTML = '<strong>Correct!</strong> ' + (ex.explain || 'Well done.');
        store.mark('exercises', id);
      } else {
        fb.className = 'feedback bad'; fb.innerHTML = '<strong>Not quite.</strong> ' + right + ' of ' + blanks.length + ' slots are correct. Click a red slot to clear it and try again.';
      }
    });
  }

  // ---- Challenges: run the user's code and compare stdout ----
  function renderChallenge(c) {
    return '<div class="challenge-task"><h2>Task</h2>' + c.task + '</div>' +
      '<h3>Expected output</h3><div class="expected">' + esc(c.expected) + '</div>' +
      '<h3>Your code</h3><div id="ch-editor"></div>' +
      (c.stdin != null ? '<details class="stdin" open><summary>Program input (stdin)</summary><textarea class="stdin-box" id="ch-stdin">' + esc(c.stdin) + '</textarea></details>' : '') +
      '<div class="run-bar"><button class="btn" id="ch-run">Run &amp; Check ❯</button><button class="btn ghost" id="ch-reset">Reset code</button>' +
      (c.hint ? '<button class="btn ghost" id="ch-hint-btn">Show hint</button>' : '') + '<span class="run-status" id="ch-status">Ctrl+Enter runs the code.</span></div>' +
      (c.hint ? '<div class="note" id="ch-hint" hidden><p>' + c.hint + '</p></div>' : '') +
      '<div class="feedback" id="ch-fb" hidden></div><h3>Console</h3><div class="console" id="ch-console"><span class="sys">Run your code to see its output.</span></div>';
  }
  function wireChallenge(slug, c) {
    const starter = dedent(c.starter);
    const ed = JT.createEditor(document.getElementById('ch-editor'), starter, { onRun: go, minHeight: '260px' });
    const btn = document.getElementById('ch-run');
    const status = document.getElementById('ch-status');
    const fb = document.getElementById('ch-fb');
    async function go() {
      btn.disabled = true; status.textContent = 'Compiling and running…'; fb.hidden = true;
      const stdinEl = document.getElementById('ch-stdin');
      const r = await JT.runJava(ed.value, stdinEl ? stdinEl.value : '');
      btn.disabled = false; status.textContent = '';
      JT.showResult(document.getElementById('ch-console'), r);
      fb.hidden = false;
      if (r.error || r.phase === 'compile') { fb.className = 'feedback bad'; fb.textContent = r.error ? 'Could not run the code.' : 'Your code does not compile yet — see the console.'; return; }
      if (r.exitCode === 0 && JT.normalizeOutput(r.stdout) === JT.normalizeOutput(c.expected)) {
        fb.className = 'feedback ok'; fb.innerHTML = '<strong>Challenge solved!</strong> Your program printed exactly the expected output.';
        store.mark('challenges', slug);
      } else {
        fb.className = 'feedback bad'; fb.innerHTML = '<strong>Output does not match yet.</strong> Compare the console with the expected output (trailing spaces are ignored).';
      }
    }
    btn.addEventListener('click', go);
    document.getElementById('ch-reset').addEventListener('click', () => { ed.value = starter; });
    const hb = document.getElementById('ch-hint-btn');
    if (hb) hb.addEventListener('click', () => { document.getElementById('ch-hint').hidden = false; hb.remove(); });
  }

  // ---- Quiz ----
  JT.renderQuiz = function (questions, { id, passMark }) {
    return '<form id="quiz" data-quiz="' + id + '">' + questions.map((q, i) =>
      '<div class="quiz-q" data-q="' + i + '"><div class="num">Question ' + (i + 1) + ' of ' + questions.length + '</div><p><strong>' + q.q + '</strong></p>' +
      (q.code ? '<pre class="code">' + JT.highlight(dedent(q.code)) + '</pre>' : '') +
      q.options.map((o, j) => '<label><input type="radio" name="q' + i + '" value="' + j + '">' + esc(o) + '</label>').join('') + '</div>').join('') +
      '<div class="run-bar"><button class="btn" type="submit">Submit answers</button><button class="btn ghost" type="button" data-retry hidden>Try again</button></div>' +
      '<div class="feedback" id="quiz-result" hidden></div></form>';
  };
  function wireQuiz(questions, passMark, id) {
    const form = document.getElementById('quiz');
    const out = document.getElementById('quiz-result');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let score = 0;
      questions.forEach((q, i) => {
        const box = form.querySelector('[data-q="' + i + '"]');
        const chosen = form.querySelector('input[name="q' + i + '"]:checked');
        box.querySelectorAll('label').forEach((l, j) => {
          l.classList.toggle('right', j === q.answer);
          l.classList.toggle('wrong', chosen && Number(chosen.value) === j && j !== q.answer);
        });
        if (chosen && Number(chosen.value) === q.answer) score++;
      });
      const pct = Math.round((score / questions.length) * 100);
      out.hidden = false;
      const pass = !passMark || pct >= passMark;
      out.className = 'feedback ' + (pass ? 'ok' : 'bad');
      out.innerHTML = '<div class="quiz-score">You scored ' + score + ' of ' + questions.length + ' (' + pct + '%)</div>' +
        (passMark ? (pass ? 'Passed — the pass mark is ' + passMark + '%.' : 'Not passed — the pass mark is ' + passMark + '%. Review the highlighted answers.') : 'Correct answers are highlighted in green.');
      if (pass) store.mark('quiz', id);
      form.querySelectorAll('input').forEach((i) => (i.disabled = true));
      form.querySelector('[type=submit]').hidden = true;
      form.querySelector('[data-retry]').hidden = false;
      out.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    form.querySelector('[data-retry]').addEventListener('click', () => render(JT.currentRoute, true));
  }

  // ---- Page rendering ----
  function nextPrev(slug) {
    const order = JT[course().order];
    const i = order.indexOf(slug);
    const prev = i > 0 ? order[i - 1] : null;
    const next = i >= 0 && i < order.length - 1 ? order[i + 1] : null;
    return '<div class="nextprev">' + (prev ? '<a class="btn" href="' + JT.url(prev) + '">❮ Previous</a>' : '<span></span>') +
      (next ? '<a class="btn" href="' + JT.url(next) + '">Next ❯</a>' : '<span></span>') + '</div>';
  }

  function render(slug, keepScroll) {
    JT.currentRoute = slug;
    for (const c of COURSES) document.body.classList.toggle(c.css, c === course());
    const search = document.getElementById('search');
    if (search) { search.placeholder = 'Search ' + course().search + '… ( / )'; search.setAttribute('aria-label', 'Search ' + course().search); }
    document.querySelectorAll('.topnav a.course-link').forEach((a) => a.classList.toggle('current', a.getAttribute('href') === course().base + '/'));
    // On phones the course links scroll sideways; bring the current one into view.
    const current = document.querySelector('.topnav a.current');
    if (current) current.parentElement.scrollLeft = current.offsetLeft - current.parentElement.offsetLeft - 8;
    const info = JT.navInfo[slug];
    const page = JT.pages[slug];
    const main = document.getElementById('main');
    renderSidebar(slug);
    if (!info || !page) {
      main.innerHTML = '<h1>Page not found</h1><p>There is no ' + esc(course().name) + ' lesson called <code>' + esc(slug) + '</code>.</p><p>' + link(course().home, 'Go to the ' + esc(course().name) + ' home page') + '</p>';
      document.title = 'Not found · JavaTrail';
      return;
    }
    const title = page.title || info.heading;
    document.title = (page.title || info.fullTitle) + ' · JavaTrail';
    const { html, examples } = JT.renderBody(slug);
    const h1 = page.h1 || (/^Java /.test(title) ? 'Java <span>' + esc(title.slice(5)) + '</span>' : esc(title));
    let out = '<h1>' + h1 + '</h1>' + nextPrev(slug) + '<hr>' + html;
    if (page.challenge) out += renderChallenge(page.challenge);
    if (page.exercise) out += '<hr>' + JT.renderExercise(page.exercise, slug);
    if (page.springLab) out += JT.springLabMarkup(page.springLab.course, page.springLab.module, page.springLab.mode, page.springLab.code);
    out += '<hr>' + nextPrev(slug);
    main.innerHTML = out;

    main.querySelectorAll('[data-run-ex]').forEach((b) => b.addEventListener('click', async () => {
      const ex = examples[Number(b.dataset.runEx)];
      const status = b.nextElementSibling;
      const outEl = b.closest('.example').querySelector('.ex-out');
      b.disabled = true; status.textContent = 'Compiling and running…';
      const r = await JT.runCode(ex.lang, ex.run, ex.stdin);
      // The box shows the bare snippet, so shift line numbers back past the hidden wrapper.
      if (ex.offset && r.stderr) r.stderr = r.stderr.replace(/Main\.java:(\d+)/g, (m, n) => 'Main.java:' + (n - ex.offset));
      b.disabled = false; status.textContent = '';
      outEl.hidden = false; outEl.className = 'ex-out console';
      JT.showResult(outEl, r);
    }));
    main.querySelectorAll('.spring-project-lab').forEach((lab) => {
      const seed = lab.querySelector('.spring-lab-seed');
      const initial = seed.value;
      seed.remove();
      const editor = JT.createEditor(lab.querySelector('.spring-lab-code'), initial, { minHeight: 260 });
      const runButton = lab.querySelector('[data-spring-run]');
      const resetButton = lab.querySelector('[data-spring-reset]');
      const status = lab.querySelector('[data-spring-status]');
      const consoleEl = lab.querySelector('[data-spring-console]');
      runButton.addEventListener('click', async () => {
        runButton.disabled = true;
        status.textContent = 'Building the fixed Maven project; the first run may take a few minutes…';
        consoleEl.textContent = '';
        const labCourse = lab.dataset.course || (isSpringBootRoute() ? 'springboot' : 'spring');
        const result = await JT.runSpring(labCourse, lab.dataset.module || 'core', lab.dataset.mode || 'program', editor.value);
        runButton.disabled = false;
        status.textContent = result.ms ? 'Completed in ' + result.ms + ' ms' : '';
        JT.showResult(consoleEl, result);
      });
      resetButton.addEventListener('click', () => { editor.value = initial; status.textContent = ''; consoleEl.textContent = 'Example reset.'; });
    });
    if (page.exercise) wireExercise(main.querySelector('.exercise'), page.exercise, slug);
    if (page.challenge) wireChallenge(slug, page.challenge);
    if (page.after) page.after(main, { wireExercise, wireQuiz, renderChallenge, wireChallenge });
    if (!keepScroll) window.scrollTo(0, 0);
    document.body.classList.remove('nav-open');
  }
  JT.render = render;

  // ---- Router ----
  function slugFromLocation() {
    const c = course();
    const s = location.pathname.slice(c.base.length).replace(/^\//, '').split('/')[0].replace(/\.(asp|php|html)$/, '');
    return s || c.home;
  }
  function isSpringBootRoute() { return course().base === '/spring-boot'; }
  function navigate(href, push) {
    const u = new URL(href, location.href);
    if (push) history.pushState({}, '', u.pathname + u.search + u.hash);
    render(slugFromLocation());
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    const u = new URL(a.getAttribute('href'), location.href);
    if (u.origin === location.origin && courseForPath(u.pathname) && !u.hash) { e.preventDefault(); navigate(u.href, true); }
  });
  window.addEventListener('popstate', () => render(slugFromLocation(), true));

  // ---- Search ----
  function wireSearch() {
    const input = document.getElementById('search');
    const box = document.getElementById('search-results');
    let sel = 0, hits = [];
    const show = () => {
      input.placeholder = 'Search ' + course().search + '… ( / )';
      input.setAttribute('aria-label', 'Search ' + course().search);
      const q = input.value.trim().toLowerCase();
      if (!q) { box.hidden = true; return; }
      const words = q.split(/\s+/);
      const order = JT[course().order];
      hits = order.filter((s) => { const i = JT.navInfo[s]; const hay = (i.fullTitle + ' ' + i.title + ' ' + i.group + ' ' + s).toLowerCase(); return words.every((w) => hay.includes(w)); }).slice(0, 14);
      sel = 0;
      box.innerHTML = hits.length ? hits.map((s, i) => '<a href="' + JT.url(s) + '"' + (i === 0 ? ' class="sel"' : '') + '>' + esc(JT.navInfo[s].fullTitle) + ' <span class="grp">· ' + esc(JT.navInfo[s].group) + '</span></a>').join('') : '<div class="empty">No matching ' + course().search + '.</div>';
      box.hidden = false;
    };
    input.addEventListener('input', show);
    input.addEventListener('focus', show);
    input.addEventListener('keydown', (e) => {
      const as = [...box.querySelectorAll('a')];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!as.length) return;
        sel = (sel + (e.key === 'ArrowDown' ? 1 : as.length - 1)) % as.length;
        as.forEach((a, i) => a.classList.toggle('sel', i === sel));
      } else if (e.key === 'Enter' && as[sel]) { e.preventDefault(); as[sel].click(); input.blur(); box.hidden = true; input.value = ''; }
      else if (e.key === 'Escape') { box.hidden = true; input.blur(); }
    });
    box.addEventListener('click', () => { box.hidden = true; input.value = ''; });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) box.hidden = true; });
    document.addEventListener('keydown', (e) => { if (e.key === '/' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); input.focus(); } });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('main')) return; // try-it page reuses the helpers only
    document.getElementById('menu-btn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
    document.getElementById('scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));
    document.getElementById('theme-btn').addEventListener('click', JT.toggleTheme);
    wireSearch();
    render(slugFromLocation(), true);
  });
})();
