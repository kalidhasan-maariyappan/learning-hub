// Ruby and Rails interview pages. The questions live in ruby/interview_data.js and
// rails/interview_data.js; this file turns each page's sections into collapsible answers.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2 } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const LEVELS = { B: 'Beginner', I: 'Intermediate', A: 'Advanced' };

  const PAGES = [
    ['Ruby', 'ruby_interview', 'Core Ruby questions: what Ruby is, syntax, data types, strings, symbols, control flow and files.'],
    ['Ruby', 'ruby_interview_collections', 'Questions on arrays, hashes, ranges, iterators and the Enumerable module.'],
    ['Ruby', 'ruby_interview_methods', 'Questions on defining and calling methods, arguments, blocks, procs, lambdas and closures.'],
    ['Ruby', 'ruby_interview_oop', 'Questions on classes, objects, access control, inheritance, modules, mixins and equality.'],
    ['Ruby', 'ruby_interview_advanced', 'Questions on exceptions, metaprogramming, memory, concurrency, gems and design patterns.'],
    ['Ruby', 'ruby_interview_output', 'Read the code, decide what it prints, then open the answer.'],
    ['Ruby', 'ruby_interview_coding', 'Coding problems from Ruby interviews. Try to solve each one before opening the solution.'],
    ['Rails', 'rails_interview', 'Questions on what Rails is, MVC, conventions, the command line, gems, engines and versions.'],
    ['Rails', 'rails_interview_models', 'Active Record questions: models, associations, validations, callbacks and migrations.'],
    ['Rails', 'rails_interview_queries', 'Questions on querying, N+1 problems, indexes, transactions, locking and database setup.'],
    ['Rails', 'rails_interview_controllers', 'Questions on controllers, routing, sessions, views, forms, Hotwire and APIs.'],
    ['Rails', 'rails_interview_security', 'Questions on authentication, authorization and protecting a Rails app.'],
    ['Rails', 'rails_interview_jobs', 'Questions on background jobs, caching, Action Cable, mailers and file uploads.'],
    ['Rails', 'rails_interview_testing', 'Questions on testing, logging, configuration and deployment.'],
    ['Rails', 'rails_interview_scenarios', 'Production scenarios: performance, scaling, security incidents and integrations.'],
  ];

  // Plain answer text: escape it, then show `backtick` spans and code-like words as code.
  const CODE_WORD = /(^|[\s(“"'])((?:[@$:]{1,2}[A-Za-z_]\w*[?!=]?)|(?:[A-Z]\w*::[A-Z]\w*(?:::\w+)*)|(?:[a-z_]\w*_\w+[?!]?)|(?:[a-z_]\w*[?!](?=[\s,.;:)]|$))|(?:[A-Za-z_]\w*(?:\.[a-z_]\w*[?!]?)+(?:\([^)\s]*\))?))(?=[\s,.;:)”"']|$)/g;
  const NOT_CODE = /^(e\.g|i\.e|etc|vs|Node\.js|Vue\.js|Next\.js|ruby-doc\.org|rubyapi\.org)$/i;
  const text = (s) => esc(s)
    .replace(/`([^`]+)`/g, (_, c) => '<code>' + c + '</code>')
    .replace(CODE_WORD, (m, pre, word) => (NOT_CODE.test(word.replace(/[?!]$/, '')) ? m : pre + '<code>' + word + '</code>'));

  const lang = (code) => /<%|<\/?[a-z][\w-]*[\s>]/i.test(code) || /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|WITH)\b/i.test(code) ||
    /^\s*(bin\/|bundle |gem |rails |rbenv |rvm |ruby |rake |git |curl |RAILS_ENV|#\s*(GET|POST)\b)/m.test(code) ? 'text' : 'ruby';
  const codeBlock = (code) => '<pre class="code">' + JT.highlightFor(lang(code))(code) + '</pre>';

  const body = (it) => [
    '<p class="qa-answer"><strong>Answer:</strong> ' + text(it.a) + '</p>',
    it.e ? '<p>' + text(it.e) + '</p>' : '',
    (it.x || []).map(codeBlock).join(''),
    (it.n || []).map((x) => '<p class="qa-note">' + (/^(Example|Hypothetical|Rubric)/.test(x) ? '' : '<strong>Sample answer:</strong> ') + text(x) + '</p>').join(''),
    it.p ? '<div class="note"><p><strong>Remember</strong></p><ul>' + it.p.map((x) => '<li>' + text(x) + '</li>').join('') + '</ul></div>' : '',
    it.s ? '<p class="qa-also">Also asked as: ' + it.s.map((x) => '<span>' + esc(x) + '</span>').join('') + '</p>' : '',
  ].join('');

  const level = (l) => '<span class="qa-level qa-level-' + l + '">' + LEVELS[l] + '</span>';

  // Normal question: the whole answer is hidden until the question is opened.
  const question = (it, n) => '<details class="qa"><summary><span class="qa-num">' + n + '.</span> ' + esc(it.q) + level(it.l) + '</summary>' +
    '<div>' + body(it) + '</div></details>';

  // Output and multiple-choice question: the code and options stay visible, only the answer is hidden.
  const card = (it, n) => {
    const [code, ...rest] = it.x || [];
    return '<div class="qa qa-card"><p class="qa-card-q"><span class="qa-num">' + n + '.</span> ' + esc(it.q) + level(it.l) + '</p>' +
      (code ? codeBlock(code) : '') +
      (it.o ? '<ol class="qa-options" type="a">' + it.o.map((o) => '<li>' + esc(o) + '</li>').join('') + '</ol>' : '') +
      '<details class="qa-reveal"><summary>Show answer</summary>' + body({ ...it, x: rest }) + '</details></div>';
  };

  const filterBox = (count) => '<div class="qa-filter"><input type="search" placeholder="Filter ' + count + ' questions…" aria-label="Filter questions">' +
    '<select aria-label="Filter by level"><option value="">All levels</option><option value="B">Beginner</option><option value="I">Intermediate</option><option value="A">Advanced</option></select>' +
    '<button type="button" class="btn ghost" data-qa-toggle>Expand all</button><span class="qa-count" aria-live="polite"></span></div>';

  function wireFilter(main) {
    const box = main.querySelector('.qa-filter');
    if (!box) return;
    const input = box.querySelector('input');
    const select = box.querySelector('select');
    const count = box.querySelector('.qa-count');
    const toggle = box.querySelector('[data-qa-toggle]');
    const update = () => {
      const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      for (const section of main.querySelectorAll('.qa-section')) {
        let visible = 0;
        for (const q of section.querySelectorAll('.qa')) {
          const hay = q.textContent.toLowerCase();
          const ok = words.every((w) => hay.includes(w)) && (!select.value || q.dataset.level === select.value);
          q.hidden = !ok;
          if (ok) visible++;
        }
        section.hidden = visible === 0;
        shown += visible;
      }
      count.textContent = input.value || select.value ? shown + ' shown' : '';
    };
    input.addEventListener('input', update);
    select.addEventListener('change', update);
    toggle.addEventListener('click', () => {
      const open = toggle.textContent === 'Expand all';
      for (const d of main.querySelectorAll('.qa-section details.qa, .qa-section details.qa-reveal')) if (!d.closest('[hidden]')) d.open = open;
      toggle.textContent = open ? 'Collapse all' : 'Expand all';
    });
  }

  for (const [word, slug, intro] of PAGES) {
    K.pager(word)(slug, () => {
      const sections = (JT.interviewData || {})[slug] || [];
      const total = sections.reduce((s, [, list]) => s + list.length, 0);
      const cards = slug === 'ruby_interview_output';
      let n = 0;
      return [
        p(intro + ' Levels: Beginner, Intermediate and Advanced. Duplicate questions from different sources are merged; other wordings are listed under each answer.'),
        filterBox(total),
        '<nav class="qa-toc"><strong>On this page:</strong> ' + sections.map(([title, list], i) => '<a href="#qa-' + i + '">' + esc(title) + ' (' + list.length + ')</a>').join(' ') + '</nav>',
        ...sections.map(([title, list], i) => '<section class="qa-section" id="qa-' + i + '">' + h2(esc(title)) +
          list.map((it) => (cards ? card(it, ++n) : question(it, ++n)).replace(/^<(details|div) class="qa/, '<$1 data-level="' + it.l + '" class="qa')).join('') + '</section>'),
      ];
    }, { after: (main) => wireFilter(main) });
  }
})();
