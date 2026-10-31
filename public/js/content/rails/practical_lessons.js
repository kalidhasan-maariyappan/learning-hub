// A consistent teaching structure, with topic-specific content supplied by each chapter.
(function () {
  'use strict';
  const JT = window.JT, K = JT.kit, H = JT.h;
  JT.practicalChapters = {};
  JT.practicalChapter = function (slug, lesson) {
    JT.practicalChapters[slug] = lesson;
    K.pager('Rails')(slug, () => [
      H.h2('Introduction'), H.p(lesson.what),
      K.remember(['Version scope: ' + lesson.version, 'Before you start: ' + lesson.prerequisites]),
      H.h2('Why it is needed'), H.p(lesson.why),
      H.h2('When to use it'), H.p(lesson.when),
      H.h2('How it works'), H.p(lesson.how),
      ...(lesson.comparison ? [H.table(lesson.comparison.headers, lesson.comparison.rows)] : []),
      H.h2('Step-by-step implementation'), H.ol(lesson.steps),
      H.h2('Syntax and practical examples'),
      ...lesson.examples.map(example => K.rails(example.code, { title: example.title, lang: example.lang || 'ruby', result: example.result, label: example.label || 'Expected behavior' })),
      H.h2('Production scenario: ' + lesson.scenario.title), H.p(lesson.scenario.before),
      H.ol(lesson.scenario.investigate), H.p('<strong>After:</strong> ' + lesson.scenario.after),
      H.h2('Verify the result'), H.ul(lesson.verify),
      H.h2('Senior developer tips'), H.ul(lesson.tips),
      K.warn(lesson.mistake),
      H.h2('Hands-on exercises'), H.ol(lesson.exercises.map(item => item[0])),
      '<details class="qa"><summary>Show exercise answers and guidance</summary><div>' + H.ol(lesson.exercises.map(item => item[1])) + '</div></details>',
      K.interview(lesson.interview),
      H.h2('Summary'), H.p(lesson.summary),
      H.h2('Official documentation'), H.ul(lesson.sources.map(([title, url]) => '<a href="' + JT.esc(url) + '" target="_blank" rel="noopener noreferrer">' + JT.esc(title) + '</a>')),
      H.p(JT.link('rails_practical_path', 'Return to the practical Rails learning path'))
    ]);
  };
})();
