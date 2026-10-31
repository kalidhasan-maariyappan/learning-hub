// Export the local app as static files for GitHub Pages.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = (process.env.PAGES_BASE_PATH || '/learning-hub').replace(/\/$/, '');
if (base && !/^\/[a-zA-Z0-9_-]+$/.test(base)) throw new Error('Invalid Pages base path');
const out = path.resolve(__dirname, '../dist');
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.resolve(__dirname, '../public'), out, { recursive: true });
function transform(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) transform(file);
    else if (/\.(html|js|css)$/.test(file)) {
      let text = fs.readFileSync(file, 'utf8');
      text = text.replace(/(["'])\/(?!\/)(?=(?:java(?:-core-advanced)?|spring(?:-boot)?|security|ruby|rails|major-gems|coding-interview|rails-scenarios|tryit|css|js)(?:[\/"'?]))/g, '$1' + base + '/');
      text = text.replaceAll(base + '/tryit?page=', base + '/tryit.html?page=');
      if (entry.name === 'core.js') {
        text = text.replace('let res;', "return { error: 'Code execution is available locally. Download this repository, run node server.js, and open http://127.0.0.1:8081/java/.' };\n    let res;");
        text = text.replace('JT.runRuby = async function (code, stdin) {', "JT.runRuby = async function (code, stdin) {\n    return { error: 'Ruby execution is available locally with node server.js and Ruby installed.' };");
      }
      if (entry.name === 'app.js') text = text.replace('JT.runSpring = async (course, module, mode, code) => {', "JT.runSpring = async (course, module, mode, code) => {\n    return { error: 'Spring labs are available locally with node server.js, Java and Maven installed.' };");
      if (entry.name === 'index.html') text = text.replace('<footer class="footer">', '<footer class="footer"><p role="note">GitHub Pages edition: lessons, exercises and quizzes are available here. Code execution requires the local app (node server.js).</p>');
      fs.writeFileSync(file, text);
    }
  }
}
transform(out);
const context = { window: { JT: {} } };
vm.createContext(context);
for (const file of ['content/rails/practical_curriculum.js', 'nav.js', 'core-advanced-nav.js', 'spring-nav.js', 'spring-boot-nav.js', 'security-nav.js', 'ruby-nav.js', 'interview-catalog.js', 'interview-nav.js']) {
  vm.runInContext(fs.readFileSync(path.join(out, 'js', file), 'utf8'), context);
}
const shell = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
const routes = ['java', 'java-core-advanced', 'spring', 'spring-boot', 'security', 'ruby', 'rails', 'major-gems', 'coding-interview', 'rails-scenarios'];
const routeForSlug = s => s.startsWith('gems_') ? 'major-gems' : s.startsWith('coding_') ? 'coding-interview' : s.startsWith('scenario_') ? 'rails-scenarios' : s.startsWith('java_ca_') ? routes[1] : s.startsWith('springboot_') ? routes[3] : s.startsWith('spring_') ? routes[2] : s.startsWith('security_') ? routes[4] : s.startsWith('ruby_') ? routes[5] : s.startsWith('rails_') ? routes[6] : routes[0];
let count = 0;
function page(route) {
  const dir = path.join(out, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell);
  count++;
}
for (const route of routes) page(route);
for (const nav of Object.values(context.window.JT).filter(Array.isArray)) {
  for (const group of nav) {
    if (!group.items) continue;
    for (const item of group.items) {
      for (const child of [item, ...(item.children || [])]) {
        if (child.slug) page(routeForSlug(child.slug) + '/' + child.slug);
      }
    }
  }
}
fs.writeFileSync(path.join(out, '404.html'), shell);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Exported ${count} lesson routes to dist with base ${base || '/'}`);
