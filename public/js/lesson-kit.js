// Small helpers shared by the Spring, Spring Boot and Security lessons.
// Each lesson follows the same order: what, why, example, output, how it works,
// when to use it, important points, and interview questions.
(function () {
  'use strict';
  const JT = window.JT;
  const { h2, h3, ul, ol, ex } = JT.h;
  const esc = JT.esc;

  // Every runnable example is recorded here while a page renders, so a script can
  // run them and compare the real output with the output shown in the lesson.
  JT.lessonExamples = [];
  const record = (kind, course, module, code, output, stdin = '') =>
    JT.lessonExamples.push({ slug: JT.currentSlug, kind, course, module, code: JT.dedent(code), output, stdin });

  // The output goes inside the example box, under the code, as on W3Schools.
  const output = (text) => text == null ? '' : '<pre class="output">' + esc(text) + '</pre>';
  const withOutput = (html, text) => html.replace(/<\/div>$/, output(text) + '</div>');

  const K = {
    // Plain Java example: runs with the local JDK through the normal runner.
    java(code, out, title) {
      record('java', 'java', '', code, out);
      return withOutput(ex(code, { title: title || 'Example' }), out);
    },
    // Spring Framework or Spring Boot program: runs in the temporary Maven lab.
    spring(code, out, opts = {}) {
      const course = opts.course || 'spring';
      const module = opts.module || 'core';
      record('spring', course, module, code, out);
      return '<div class="example"><h3>' + (opts.title || 'Example') + '</h3>' +
        '<section class="spring-project-lab inline-lab" data-course="' + course + '" data-module="' + module + '" data-mode="program">' +
        '<div class="spring-lab-editor"><textarea class="spring-lab-seed" hidden>' + esc(JT.dedent(code)) + '</textarea><div class="spring-lab-code"></div></div>' +
        '<div class="run-bar"><button class="btn" data-spring-run>Run with Maven</button><button class="btn ghost" data-spring-reset>Reset</button><span class="run-status" data-spring-status></span></div>' +
        '<div class="console spring-lab-console" data-spring-console aria-live="polite">' +
        (course === 'springboot' ? 'Runs as a Spring Boot 4.1 application in a temporary Maven project.' : 'Runs with Spring Framework 7.0 in a temporary Maven project.') +
        ' The first run may download dependencies.</div></section>' + output(out) + '</div>';
    },
    // Code that is shown but not run: configuration files, SQL, HTML or a fragment.
    show(code, title, lang) {
      const body = JT.highlightFor(lang || 'text')(JT.dedent(code));
      return '<div class="example"><h3>' + (title || 'Example') + '</h3><pre class="code">' + body + '</pre></div>';
    },
    // Ruby example that runs on the local Ruby, with its output inside the box.
    // opts.stdin is sent to the program as standard input.
    ruby(code, out, title, opts = {}) {
      record('ruby', 'ruby', '', code, out, opts.stdin);
      const html = ex(code, { title: title || 'Example', lang: 'ruby', stdin: opts.stdin });
      return out == null ? html : withOutput(html, out);
    },
    // Rails code that needs a Rails application, so it is shown rather than run.
    // result is what Rails prints or returns, labelled e.g. "Result", "SQL" or "Terminal".
    rails(code, { title, lang = 'ruby', result, label = 'Result' } = {}) {
      const res = result == null ? '' : '<pre class="output" data-label="' + esc(label) + '">' + esc(JT.dedent(result)) + '</pre>';
      return '<div class="example"><h3>' + (title || 'Example') + '</h3><pre class="code">' + JT.highlightFor(lang)(JT.dedent(code)) + '</pre>' + res + '</div>';
    },
    // Returns a function that registers a page titled from its navigation entry, for
    // example word "Ruby" and title "Ruby Arrays" give the heading "Ruby <span>Arrays</span>".
    pager(word) {
      return (slug, body, extra = {}) => {
        const title = JT.navInfo[slug] ? JT.navInfo[slug].title : slug;
        const rest = title.startsWith(word + ' ') ? title.slice(word.length + 1) : title;
        JT.def(slug, Object.assign({ title, h1: esc(word) + ' <span>' + esc(rest) + '</span>', body: () => body().join('') }, extra));
      };
    },
    // Quiz data is written with the correct option first; rotate each question's options
    // by a different amount so the right answer is not always in the same place.
    mixQuiz(questions) {
      return questions.map((q, i) => {
        const shift = (i * 3 + 1) % q.options.length;
        const options = q.options.map((_, j) => q.options[(j + shift) % q.options.length]);
        return { ...q, options, answer: (q.answer - shift + q.options.length) % q.options.length };
      });
    },
    remember: (items) => '<div class="note"><p><strong>Remember</strong></p>' + ul(items) + '</div>',
    tip: (html) => '<div class="note"><p><strong>Tip:</strong> ' + html + '</p></div>',
    warn: (html) => '<div class="note warn"><p><strong>Common mistake:</strong> ' + html + '</p></div>',
    // A Java Core Advanced lesson in the same order as a W3Schools page: a short
    // definition, the example with its output, how it works, then two boxes for
    // the points to remember and the common mistake.
    coreLesson({ title, what, why, how, steps, code, output, points, mistake, extra, diagram }) {
      const example = code ? ex(code).replace(/<\/div>$/, '<pre class="output">' + output + '</pre></div>') : '';
      return [
        h2(title), '<p>' + what + '</p>', why ? '<p>' + why + '</p>' : '',
        example,
        h2('How it works'), how ? '<p>' + how + '</p>' : '', steps ? ol(steps) : '', diagram || '', extra || '',
        points ? '<div class="note"><p><strong>Remember</strong></p>' + ul(points) + '</div>' : '',
        mistake ? '<div class="note warn"><p><strong>Common mistake:</strong> ' + mistake + '</p></div>' : '',
      ].join('');
    },
    interview(items) {
      return h2('Interview questions') + '<div class="qa-list">' + items.map(([q, a]) =>
        '<details class="qa"><summary>' + q + '</summary><div>' + a + '</div></details>').join('') + '</div>';
    },
    // Register a lesson. body is a function so examples are collected at render time.
    lesson(slug, title, h1, body) {
      JT.def(slug, { title, h1, body: () => body().join('') });
    },
    // A section overview page that links to its lessons.
    overview(slug, title, h1, intro, lessons) {
      JT.def(slug, { title, h1, body: () => [
        ...intro,
        h2('Lessons in this section'),
        '<ul class="topic-link-list">' + lessons.map(([s, t]) => '<li><a href="' + JT.url(s) + '">' + esc(t) + ' →</a></li>').join('') + '</ul>',
      ].join('') });
    },
  };
  JT.kit = K;
})();
