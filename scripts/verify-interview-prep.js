const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
function loadShell(file, excludeEditor = false) {
  const context = {
    window: { addEventListener() {} },
    document: { documentElement: { dataset: {} }, addEventListener() {} },
    location: { pathname: '/coding-interview/', search: '' },
    localStorage: { getItem() { return null; }, setItem() {} },
    matchMedia: () => ({ matches: false }), console
  };
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'public', file), 'utf8');
  for (const match of html.matchAll(/<script src="\/([^"]+)"/g)) {
    if (excludeEditor && match[1] === 'js/tryit.js') continue;
    vm.runInContext(fs.readFileSync(path.join(root, 'public', match[1]), 'utf8'), context, { filename: match[1] });
  }
  return context.window.JT;
}
const JT = loadShell('index.html');
const editor = loadShell('tryit.html', true);
assert.equal(JT.gemLessons.length, 20);
assert.equal(JT.codingProblems.length, 60);
assert.equal(JT.scenarioLessons.length, 50);
for (const group of ['arrays', 'strings', 'hashes']) assert.equal(JT.codingProblems.filter(p => p.group === group).length, 20);
const courseMappings = [['gems', '/major-gems/'], ['coding', '/coding-interview/'], ['scenario', '/rails-scenarios/']];
let pages = 0, links = 0;
for (const [key, base] of courseMappings) {
  const order = JT[key + 'Order'];
  assert.equal(order.length, new Set(order).size);
  for (const slug of order) {
    assert.ok(JT.pages[slug] && editor.pages[slug], 'Missing page/editor registration: ' + slug);
    assert.ok(JT.url(slug).startsWith(base), 'Wrong route: ' + slug);
    const html = JT.pages[slug].body();
    assert.ok(html.length > 500 && !html.includes('[object Object]'), 'Invalid page: ' + slug);
    for (const match of html.matchAll(/href="(\/(?:major-gems|coding-interview|rails-scenarios)\/[^"?#]*)"/g)) {
      assert.ok(Object.keys(JT.pages).some(target => JT.url(target) === match[1]), 'Broken link: ' + match[1]);
      links++;
    }
    if (fs.existsSync(path.join(root, 'dist'))) {
      const file = path.join(root, 'dist', base, slug, 'index.html');
      assert.ok(fs.existsSync(file), 'Missing export: ' + slug);
      const exported = fs.readFileSync(file, 'utf8');
      assert.ok(exported.includes('/learning-hub/js/interview-nav.js'));
      assert.ok(exported.includes('/learning-hub/major-gems/'), 'Unrewritten top navigation');
    }
    pages++;
  }
}
for (const item of JT.codingProblems) {
  assert.ok(item.tests.length >= 3, 'Insufficient cases: ' + item.slug);
  const algorithm = item.code.replace(/#[^\n]*/g, '');
  assert.ok(!/\.(?:sort!?|reverse!?|uniq!?|tally|split|join|map!?|select!?|reduce|inject|sum|min|max|group_by|merge!?|invert!?|flatten!?|include\?|index|dig|keys|values|delete|reject|count|scan|gsub!?|sub!?|upcase!?|downcase!?|to_i)\b/.test(algorithm), 'Shortcut in ' + item.slug);
  const rendered = JT.renderBody(item.slug);
  assert.equal(rendered.examples.length, 1, 'Missing runnable example: ' + item.slug);
  assert.equal(rendered.examples[0].lang, 'ruby');
  assert.equal(editor.renderBody(item.slug).examples[0].run, rendered.examples[0].run, 'Editor example differs');
}
for (const gem of JT.gemLessons) {
  for (const field of ['what', 'why', 'install', 'file', 'code', 'web', 'api', 'mistake', 'exercise', 'answer']) assert.ok(gem[field], 'Missing gem field: ' + gem.slug + '/' + field);
  assert.ok(gem.resources.length >= 2 && gem.debug.length >= 3);
}
for (const scenario of JT.scenarioLessons) {
  assert.ok(scenario.steps.length >= 3 && scenario.verify.length >= 2);
  for (const field of ['question', 'clarify', 'answer', 'code', 'tradeoff', 'mistake', 'exercise', 'guidance', 'source']) assert.ok(scenario[field], 'Incomplete scenario: ' + scenario.slug + '/' + field);
}
if (process.argv.includes('--ruby')) {
  const payload = JT.codingProblems.map(p => ({ slug: p.slug, code: p.code, tests: p.tests, errors: p.errorTests || [], demo: JT.renderBody(p.slug).examples[0].run, output: p.output }));
  const result = spawnSync('ruby', [path.join(__dirname, 'verify-interview-solutions.rb')], { input: JSON.stringify(payload), encoding: 'utf8', timeout: 30000, maxBuffer: 2 * 1024 * 1024 });
  assert.equal(result.status, 0, result.stderr || result.error);
  process.stdout.write(result.stdout);
  let syntaxChecks = 0;
  for (const lesson of [...JT.gemLessons, ...JT.scenarioLessons]) {
    if (lesson.lang && lesson.lang !== 'ruby') continue;
    const check = spawnSync('ruby', ['-c'], { input: lesson.code, encoding: 'utf8', timeout: 10000 });
    assert.equal(check.status, 0, lesson.slug + ': ' + (check.stderr || check.error));
    syntaxChecks++;
  }
  console.log('PASS: ' + syntaxChecks + ' Ruby gem/scenario fragments passed syntax checks.');
}
console.log('PASS: 20 gems, 20 array + 20 string + 20 hash problems, 50 scenarios; ' + pages + ' pages and ' + links + ' internal links, including editor/static export.');
