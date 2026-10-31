// Load the real browser scripts and render every practical chapter without a DOM.
// Optional --ruby also checks Ruby snippets using the locally installed interpreter.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const shell = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const editorShell = fs.readFileSync(path.join(root, 'public/tryit.html'), 'utf8');
for (const html of [shell, editorShell]) {
  const curriculumAt = html.indexOf('/js/content/rails/practical_curriculum.js');
  const navAt = html.indexOf('/js/ruby-nav.js');
  assert.ok(curriculumAt >= 0 && curriculumAt < navAt, 'Curriculum must load before Ruby/Rails navigation');
}
const context = {
  window: { addEventListener() {} },
  document: { documentElement: { dataset: {} }, addEventListener() {} },
  location: { pathname: '/rails/rails_practical_path' },
  localStorage: { getItem() { return null; }, setItem() {} },
  matchMedia: () => ({ matches: false }),
  console
};
vm.createContext(context);
for (const match of shell.matchAll(/<script src="\/([^\"]+)"/g)) {
  const file = path.join(root, 'public', match[1]);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}
const JT = context.window.JT;
const sections = JT.railsPracticalSections;
assert.equal(sections.length, 5);
const chapters = sections.flatMap(section => section.chapters.map(([slug]) => slug));
assert.equal(chapters.length, 39);
assert.equal(new Set(JT.railsOrder).size, JT.railsOrder.length, 'Duplicate navigation slug');
const pages = [...new Set(['rails_practical_path', ...sections.map(s => s.overview), ...chapters])];
let links = 0, rubySnippets = 0, executedExamples = 0;
for (const slug of pages) {
  assert.ok(JT.railsOrder.includes(slug), 'Not in navigation: ' + slug);
  assert.ok(JT.pages[slug], 'Unregistered lesson: ' + slug);
  const html = JT.pages[slug].body();
  assert.equal(typeof html, 'string');
  assert.ok(html.length > 500, 'Unexpectedly empty page: ' + slug);
  assert.ok(!html.includes('[object Object]'), 'Invalid markup: ' + slug);
  assert.ok(!/planned chapters|next planned|not completed lessons|section is planned/i.test(html), 'Unfinished plan: ' + slug);
  for (const match of html.matchAll(/href="(\/rails\/[^"#?]+)"/g)) {
    const target = match[1].split('/').pop();
    assert.ok(JT.pages[target], 'Missing linked lesson ' + target + ' in ' + slug);
    assert.ok(JT.railsOrder.includes(target), 'Link outside navigation: ' + target);
    links++;
  }
  if (!chapters.includes(slug)) continue;
  for (const heading of ['Introduction', 'Hands-on exercises', 'Interview questions', 'Summary']) {
    assert.ok(html.includes(heading), slug + ' lacks ' + heading);
  }
  assert.ok((html.match(/<details/g) || []).length >= 3, 'Missing answer disclosures: ' + slug);
  assert.ok(/https:\/\//.test(html), 'Missing references: ' + slug);
  const lesson = JT.practicalChapters[slug];
  if (!lesson) continue; // First chapter has its original custom layout.
  assert.ok(lesson.steps.length >= 4 && lesson.verify.length >= 3, 'Insufficient workflow: ' + slug);
  assert.ok(lesson.exercises.length >= 2 && lesson.interview.length >= 2, 'Missing practice: ' + slug);
  assert.ok(lesson.examples.length >= 2, 'Missing examples: ' + slug);
  if (process.argv.includes('--ruby')) {
    for (const example of lesson.examples.filter(item => !item.lang || item.lang === 'ruby')) {
      const check = spawnSync('ruby', ['-c'], { input: example.code, encoding: 'utf8' });
      assert.equal(check.status, 0, slug + ' / ' + example.title + '\n' + (check.stderr || check.error));
      rubySnippets++;
    }
  }
}
if (process.argv.includes('--ruby')) {
  const cases = [
    ['rails_practical_debug_workflow', 0, '1000'],
    ['rails_practical_ruby_releases', 1, '1200'],
    ['rails_practical_ruby_core', 0, '300\n300'],
    ['rails_practical_ruby_core', 1, '2\ntrue'],
    ['rails_practical_ruby_core', 2, ''],
    ['rails_practical_ruby_concurrency', 1, '42'],
    ['rails_practical_ruby_removals', 0, '3\nfalse'],
    ['rails_practical_ruby_removals', 1, '&lt;order&gt;']
  ];
  for (const [slug, index, expected] of cases) {
    const example = JT.practicalChapters[slug].examples[index];
    const run = spawnSync('ruby', ['-'], { input: example.code, encoding: 'utf8', timeout: 10000 });
    assert.equal(run.status, 0, slug + ': ' + (run.stderr || run.error));
    assert.equal(run.stdout.replace(/\r/g, '').trim(), expected, slug + ': output mismatch');
    executedExamples++;
  }
  const fixedDiscount = JT.practicalChapters.rails_practical_debug_workflow.examples[1].code;
  const assertions = 'def assert_equal(expected, actual)\n  raise "Expected #{expected}, got #{actual}" unless expected == actual\nend\n';
  const run = spawnSync('ruby', ['-'], { input: assertions + fixedDiscount, encoding: 'utf8', timeout: 10000 });
  assert.equal(run.status, 0, run.stderr || run.error);
  executedExamples++;
}
if (fs.existsSync(path.join(root, 'dist/rails'))) {
  for (const slug of pages) {
    const exported = fs.readFileSync(path.join(root, 'dist/rails', slug, 'index.html'), 'utf8');
    assert.ok(exported.includes('practical_curriculum.js'), 'Export missing curriculum: ' + slug);
    assert.ok(exported.includes('practical_ruby_versions.js'), 'Export missing lessons: ' + slug);
  }
}
console.log(`PASS: ${chapters.length} chapters in ${sections.length} sections; ${pages.length} rendered pages; ${links} internal links; ${rubySnippets} Ruby syntax checks; ${executedExamples} executed examples.`);
