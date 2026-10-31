(function () {
  'use strict';
  const JT = window.JT, K = JT.kit, H = JT.h;
  JT.codingProblems = [];
  JT.gemLessons = [];
  JT.scenarioLessons = [];
  const rubyLiteral = value => value === null ? 'nil' : Array.isArray(value) ? '[' + value.map(rubyLiteral).join(', ') + ']' : typeof value === 'object' ? '{' + Object.entries(value).map(([key, item]) => JSON.stringify(key) + ' => ' + rubyLiteral(item)).join(', ') + '}' : JSON.stringify(value);
  const links = items => H.ol(items.map(([slug, title]) => JT.link(slug, title)));
  JT.def('coding_home', { title: 'Coding Interview Practice', body: () => [
    H.h2('60 Ruby problems without algorithm shortcuts'),
    H.p('Practice 20 array, 20 string and 20 hash problems. Each problem has a precise contract, a plain-English approach, a manual Ruby solution, a walkthrough, complexity analysis, edge cases and follow-up questions.'),
    K.remember(['Allowed primitives: loops, conditionals, arithmetic, comparisons, length, indexing, assignment and string concatenation. Hash each_pair is allowed as basic key/value traversal; basic type checks are permitted where a contract needs them.', 'Do not use algorithm shortcuts such as sort, reverse, uniq, tally, split, join, map, select, sum, min, max, group_by, merge or invert in the solution.', 'puts and JSON formatting are used only to display results. A test harness may use library functions as an independent oracle.', 'Ruby examples target Ruby 3.2+ and 4.0. Strings are character-indexed UTF-8; ASCII-only rules are labeled. These exercises do not implement Unicode grapheme segmentation.']),
    H.h2('How to answer in an interview'), H.ol(['Clarify inputs, outputs, duplicates and empty cases.', 'Describe a straightforward correct approach.', 'Explain the loop invariant or state you maintain.', 'Write and trace the solution.', 'State time and extra-space complexity.', 'Test edge cases and discuss improvements.']),
    H.h2('Understand the analysis'), H.p('An invariant is a statement that stays true after each loop step. Time complexity describes how work grows with input size, not a measured number of milliseconds.'), H.table(['Notation', 'Meaning'], [['O(1)', 'Bounded work or storage independent of input length'], ['O(n)', 'Work proportional to input length'], ['O(log n)', 'Repeatedly shrinking the remaining search space'], ['O(n?)', 'Quadratic growth from nested comparisons'], ['Expected O(1) hash access', 'A usual average assumption, not a worst-case guarantee']]),
    ...JT.codingGroups.flatMap(([title, items]) => [H.h2(title), H.p(JT.link('coding_' + title.toLowerCase(), 'Open ' + title.toLowerCase() + ' overview')), links(items.map(([id, text]) => ['coding_' + title.toLowerCase() + '_' + id, text]))])
  ].join('') });
  for (const [title, items] of JT.codingGroups) JT.def('coding_' + title.toLowerCase(), { title: title + ': 20 Interview Problems', body: () => H.h2('Choose one problem') + H.p('Try the problem first. Open the solution only after describing your approach and edge cases. Run here uses your local Ruby; GitHub Pages shows the examples but needs the local server for execution.') + links(items.map(([id, text]) => ['coding_' + title.toLowerCase() + '_' + id, text])) });
  JT.codingProblem = function (group, id, lesson) {
    const slug = 'coding_' + group + '_' + id;
    lesson.demo = lesson.tests[0][0].map(rubyLiteral).join(', ');
    lesson.output = JSON.stringify(lesson.tests[0][1]);
    lesson.sample = lesson.demo + ' → ' + lesson.output;
    JT.codingProblems.push({ ...lesson, slug, group });
    JT.def(slug, { title: JT.navInfo[slug].title, body: () => [
      H.h2('Problem'), H.p(lesson.question), K.remember(['Input/output contract: ' + lesson.contract, 'Allowed: basic loops and data access. The solution avoids built-in algorithm shortcuts.']),
      H.h2('Example'), K.show(lesson.sample, 'Input → output', 'text'),
      H.h2('Think before coding'), H.p(lesson.idea), H.ol(lesson.steps),
      '<details class="qa"><summary>Show manual Ruby solution</summary><div>' + K.ruby(lesson.code + '\n\n# JSON is used only to display the result.\nrequire "json"\nputs JSON.generate(solve(' + lesson.demo + '))', lesson.output, 'Run the solution') + '</div></details>',
      H.h2('Walkthrough'), H.p(lesson.trace), H.h2('Complexity'), H.p(lesson.complexity),
      H.h2('Edge cases to test'), H.ul(lesson.edges), K.warn(lesson.mistake),
      H.h2('Try it yourself'), H.p(lesson.exercise),
      '<details class="qa"><summary>Exercise guidance</summary><div>' + H.p(lesson.answer) + '</div></details>',
      K.interview([['Explain the key invariant.', lesson.invariant], ['Interview follow-up', lesson.followup]]),
      H.h2('Summary'), H.p(lesson.summary), H.p(JT.link('coding_' + group, 'Return to ' + group + ' problems'))
    ].join('') });
  };
  JT.def('gems_home', { title: 'Major Gems for Rails Web and API Applications', body: () => [
    H.h2('What is a gem?'), H.p('A gem is a packaged Ruby library. Bundler resolves dependencies from your Gemfile and records exact versions in Gemfile.lock. A gem may add runtime behavior, development diagnostics or testing tools.'),
    H.h2('Choose by responsibility'), H.p('These 20 guides teach what each library does, why to use it, installation, small examples, web/API differences, resource costs and interview questions. They are not a list of dependencies every application must install.'),
    K.remember(['Examples assume Rails 7.2 or 8.x unless stated otherwise. Select gem releases compatible with your exact Ruby/Rails versions and commit the lockfile.', 'A web app commonly renders HTML and uses cookie sessions. An API returns a documented representation and needs an explicit authentication contract. A JSON response alone does not define authentication.', 'Shown Rails fragments require your own local application; the hub does not install these gems or connect to their infrastructure. Official project resources were checked on 31 October 2026.']),
    K.show('bundle add GEM_NAME\nbundle info GEM_NAME\nbundle exec COMMAND', 'Bundler workflow', 'text'),
    ...JT.gemGroups.flatMap(([title, items]) => [H.h2(title), links(items.map(([id, text]) => ['gems_' + id, text]))]),
    H.h2('Interview tip'), H.p('Explain the problem, the library’s boundary, its failure modes and the simpler alternative. Naming a gem without explaining its tradeoffs is a weak answer.')
  ].join('') });
  JT.gemLesson = function (id, lesson) {
    const slug = 'gems_' + id;
    JT.gemLessons.push({ ...lesson, slug });
    JT.def(slug, { title: JT.navInfo[slug].title + ': Web and API Guide', body: () => [
      H.h2('Introduction'), H.p(lesson.what), H.h2('Why and when to use it'), H.p(lesson.why),
      H.h2('Install and configure'), H.ol(lesson.steps), K.show(lesson.install, 'Installation in your local Rails app', 'text'),
      H.h2('Simple example'), K.rails(lesson.code, { title: lesson.file, lang: lesson.lang || 'ruby', result: lesson.result }),
      H.h2('In a web application'), H.p(lesson.web), H.h2('In an API application'), H.p(lesson.api),
      H.h2('Resources and operational details'), H.ul(lesson.resources),
      H.h2('Troubleshooting and best practices'), H.ol(lesson.debug), K.warn(lesson.mistake),
      H.h2('Practice exercise'), H.p(lesson.exercise), '<details class="qa"><summary>Show guidance</summary><div>' + H.p(lesson.answer) + '</div></details>',
      K.interview(lesson.interview), H.h2('Summary'), H.p(lesson.summary),
      H.h2('Official resources'), H.ul(lesson.sources.map(([text, url]) => '<a href="' + JT.esc(url) + '" target="_blank" rel="noopener noreferrer">' + JT.esc(text) + '</a>'))
    ].join('') });
  };
})();
