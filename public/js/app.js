// Site shell: routing, sidebar, search, page rendering, exercises, challenges, quiz.
(function () {
  'use strict';
  const JT = window.JT;
  const esc = JT.esc;

  // The site is served by server.js (it needs /api/run), so URLs are always absolute paths.
  JT.url = (slug) => '/java/' + (slug === 'default' ? '' : slug);
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
    let html = '';
    for (const g of JT.nav) {
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
    // Runnable example. opts: {title, desc, stdin, noRun}
    ex(code, opts = {}) {
      code = dedent(code);
      const idx = collecting ? collecting.length : 0;
      if (collecting) collecting.push({ code, run: JT.runnable(code), offset: JT.wrapOffset(code), stdin: opts.stdin || '', title: opts.title || '' });
      const slug = JT.currentSlug;
      return '<div class="example"><h3>' + (opts.title || 'Example') + '</h3>' + (opts.desc ? '<p>' + opts.desc + '</p>' : '') +
        '<pre class="code">' + JT.highlight(code) + '</pre>' +
        (opts.noRun ? '' : '<div class="run-bar"><a class="btn" target="_blank" href="' + JT.tryitUrl(slug, idx) + '">Try it Yourself »</a>' +
        '<button class="btn ghost" data-run-ex="' + idx + '">Run here</button><span class="run-status"></span></div><div class="ex-out" hidden></div>') + '</div>';
    },
  };

  JT.pages = {};
  JT.def = (slug, page) => { JT.pages[slug] = page; };
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
    const i = JT.order.indexOf(slug);
    const prev = i > 0 ? JT.order[i - 1] : null;
    const next = i >= 0 && i < JT.order.length - 1 ? JT.order[i + 1] : null;
    return '<div class="nextprev">' + (prev ? '<a class="btn" href="' + JT.url(prev) + '">❮ Previous</a>' : '<span></span>') +
      (next ? '<a class="btn" href="' + JT.url(next) + '">Next ❯</a>' : '<span></span>') + '</div>';
  }

  function render(slug, keepScroll) {
    JT.currentRoute = slug;
    const info = JT.navInfo[slug];
    const page = JT.pages[slug];
    const main = document.getElementById('main');
    renderSidebar(slug);
    if (!info || !page) {
      main.innerHTML = '<h1>Page not found</h1><p>There is no Java lesson called <code>' + esc(slug) + '</code>.</p><p>' + link('default', 'Go to the Java tutorial home') + '</p>';
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
    out += '<hr>' + nextPrev(slug);
    main.innerHTML = out;

    main.querySelectorAll('[data-run-ex]').forEach((b) => b.addEventListener('click', async () => {
      const ex = examples[Number(b.dataset.runEx)];
      const status = b.nextElementSibling;
      const outEl = b.closest('.example').querySelector('.ex-out');
      b.disabled = true; status.textContent = 'Compiling and running…';
      const r = await JT.runJava(ex.run, ex.stdin);
      // The box shows the bare snippet, so shift line numbers back past the hidden wrapper.
      if (ex.offset && r.stderr) r.stderr = r.stderr.replace(/Main\.java:(\d+)/g, (m, n) => 'Main.java:' + (n - ex.offset));
      b.disabled = false; status.textContent = '';
      outEl.hidden = false; outEl.className = 'ex-out console';
      JT.showResult(outEl, r);
    }));
    if (page.exercise) wireExercise(main.querySelector('.exercise'), page.exercise, slug);
    if (page.challenge) wireChallenge(slug, page.challenge);
    if (page.after) page.after(main, { wireExercise, wireQuiz, renderChallenge, wireChallenge });
    if (!keepScroll) window.scrollTo(0, 0);
    document.body.classList.remove('nav-open');
  }
  JT.render = render;

  // ---- Router ----
  function slugFromLocation() {
    const m = location.pathname.match(/^\/java\/?([^/]*)/);
    let s = m ? m[1] : '';
    s = s.replace(/\.(asp|php|html)$/, '');
    return s || 'default';
  }
  function navigate(href, push) {
    const u = new URL(href, location.href);
    if (push) history.pushState({}, '', u.pathname + u.search + u.hash);
    render(slugFromLocation());
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    const u = new URL(a.getAttribute('href'), location.href);
    if (u.origin === location.origin && /^\/java(\/|$)/.test(u.pathname) && !u.hash) { e.preventDefault(); navigate(u.href, true); }
  });
  window.addEventListener('popstate', () => render(slugFromLocation(), true));

  // ---- Search ----
  function wireSearch() {
    const input = document.getElementById('search');
    const box = document.getElementById('search-results');
    let sel = 0, hits = [];
    const show = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { box.hidden = true; return; }
      const words = q.split(/\s+/);
      hits = JT.order.filter((s) => { const i = JT.navInfo[s]; const hay = (i.fullTitle + ' ' + i.title + ' ' + i.group + ' ' + s).toLowerCase(); return words.every((w) => hay.includes(w)); }).slice(0, 14);
      sel = 0;
      box.innerHTML = hits.length ? hits.map((s, i) => '<a href="' + JT.url(s) + '"' + (i === 0 ? ' class="sel"' : '') + '>' + esc(JT.navInfo[s].fullTitle) + ' <span class="grp">· ' + esc(JT.navInfo[s].group) + '</span></a>').join('') : '<div class="empty">No matching Java pages.</div>';
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
