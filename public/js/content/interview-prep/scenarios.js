(function () {
  'use strict';
  const JT = window.JT, K = JT.kit, H = JT.h;
  const sourceLinks = {
    query: ['Active Record queries and batching', 'https://guides.rubyonrails.org/v8.0/active_record_querying.html'],
    jobs: ['Active Job', 'https://guides.rubyonrails.org/v8.0/active_job_basics.html'],
    cache: ['Rails caching', 'https://guides.rubyonrails.org/v8.0/caching_with_rails.html'],
    security: ['Rails security', 'https://guides.rubyonrails.org/v8.0/security.html'],
    testing: ['Rails testing', 'https://guides.rubyonrails.org/v8.0/testing.html'],
    debug: ['Rails debugging', 'https://guides.rubyonrails.org/v8.0/debugging_rails_applications.html'],
    transactions: ['Transactions', 'https://api.rubyonrails.org/v8.0/classes/ActiveRecord/Transactions/ClassMethods.html'],
    locking: ['Active Record locking', 'https://guides.rubyonrails.org/v8.0/active_record_querying.html#locking-records-for-update'],
    config: ['Rails configuration', 'https://guides.rubyonrails.org/v8.0/configuring.html'],
    deployment: ['Deployment performance', 'https://guides.rubyonrails.org/tuning_performance_for_deployment.html']
  };
  JT.def('scenario_home', { title: '50 Real-world Rails Interview Scenarios', body: () => [
    H.h2('Learn to reason, not memorize a slogan'),
    H.p('Each scenario is a separate teaching page. Read the question, state assumptions, then open the model answer. Answers include an investigation, a small implementation fragment, verification, a tradeoff and a follow-up exercise.'),
    K.remember(['Examples target Rails 7.2 and 8.x unless labeled. Code fragments assume the described models, authentication and services exist.', 'No production speedups are invented. Measure your own workload and state what your tools can prove.', 'Background jobs, caches and retries shift or repeat work; none automatically guarantee correctness.']),
    H.h2('A strong interview answer'), H.ol(['Clarify scale, user impact and correctness requirements.', 'Separate observations from hypotheses.', 'Choose evidence that can disprove the hypothesis.', 'Propose a focused implementation and explain its tradeoffs.', 'Verify correctness, performance and recovery behavior.']),
    ...JT.scenarioGroups.flatMap(([title, items]) => [H.h2(title), H.ol(items.map(([id, text]) => JT.link('scenario_' + id, text)))]),
    H.p(JT.link('gems_home', 'Review the tools in Major Gems') + ' or ' + JT.link('coding_home', 'practice manual coding problems') + '.')
  ].join('') });
  for (const data of JT.scenarioData) {
    const slug = 'scenario_' + data.id;
    const reference = sourceLinks[data.source];
    JT.scenarioLessons.push({ ...data, slug });
    JT.def(slug, { title: JT.navInfo[slug].title, body: () => [
      H.h2('Interview question'), H.p(data.question),
      H.h2('Clarify before answering'), H.p(data.clarify),
      '<details class="qa"><summary>Show a strong model answer</summary><div>' + H.p(data.answer) + '</div></details>',
      H.h2('Investigate step by step'), H.ol(data.steps),
      H.h2('Practical implementation'), K.rails(data.code, { title: data.codeTitle || 'Application fragment: adapt to the stated assumptions', lang: data.lang || 'ruby' }),
      H.h2('Verify the result'), H.ul(data.verify),
      H.h2('Senior developer tradeoff'), H.p(data.tradeoff), K.warn(data.mistake),
      H.h2('Hands-on follow-up'), H.p(data.exercise),
      '<details class="qa"><summary>Show follow-up guidance</summary><div>' + H.p(data.guidance) + '</div></details>',
      H.h2('Interview summary'), H.p(data.summary || data.answer),
      H.h2('Official reference'), H.p('<a href="' + reference[1] + '" target="_blank" rel="noopener noreferrer">' + reference[0] + '</a>'),
      H.p(JT.link('scenario_home', 'Return to all 50 scenarios'))
    ].join('') });
  }
})();
