const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const dest = __dirname;
const sources = path.resolve(dest, '../../../ruby');
const records = [];
const audits = [];
const clean = s => s.replace(/\u200b/g, '').trim();
function add(file, lines, start, end, label, question, questionLines = 1) {
  const answer = clean(lines.slice(start + questionLines, end).join('\n'));
  records.push({ sourceFile: file, startLine: start + 1, endLine: end,
    sourceQuestionLabel: label, question: clean(question), sourceAnswer: answer,
    directAnswer: answer.split(/\n\s*\n/)[0], explanation: answer, example: '',
    importantPoints: [], category: 'B', difficulty: 'Intermediate', issues: [] });
}
for (const file of ['twentythree.txt', 'twentyseven.txt']) {
  const lines = fs.readFileSync(path.join(sources, file), 'utf8').split(/\r?\n/);
  if (file === 'twentythree.txt') {
    const starts = []; let next = 1;
    lines.forEach((l, i) => { if (new RegExp('^' + next + '\\. ').test(l)) { starts.push(i); next++; } });
    if (starts.length !== 51) throw new Error('Expected 51 questions');
    starts.forEach((s, i) => add(file, lines, s, starts[i + 1] || 745, 'Q' + (i + 1), lines[s].replace(/^\d+\.\s*/, '')));
    audits.push({ sourceFile: file, fullyRead: true, readRanges: [[1, lines.length]],
      questionRanges: starts.map((s, i) => [s + 1, starts[i + 1] || 745]),
      nonQuestionRanges: [{startLine:1,endLine:16,reason:'Article metadata, introductory technical context; original preserved, popularity statistics unverified.'}, {startLine:746,endLine:lines.length,reason:'Comments, course/job advertisements, navigation, footer; no further interview prompts.'}],
      corrections: ['ORM expands to Object-Relational Mapping.', 'Delete/destroy callback behavior.', 'skip_callback changes class callback chains.', 'Modern asset pipeline/version context.', 'Ruby/Python comparison inaccuracies.', 'Associations and migration reversibility.', 'Broken pasted code and capitalization.'] });
  } else {
    const starts = [];
    lines.forEach((l, i) => { if (i < 872 && /^\d+\. (?:What|Explain|Can |How |Describe|Why |When |Which |Give|List|Do )/.test(l)) starts.push(i); });
    if (starts.length !== 105) throw new Error('Expected 105 open questions: ' + starts.length);
    starts.forEach((s,i) => add(file, lines, s, starts[i+1] || 872, 'Open-' + (i+1), lines[s].replace(/^\d+\.\s*/, '')));
    const mcq = [];
    lines.forEach((l,i) => { if (/^Question \d+\.$/.test(l)) mcq.push(i); });
    mcq.forEach((s,i) => add(file, lines, s, mcq[i+1] || 1177, 'MCQ-' + (i+1), lines[s+1], 2));
    for (const [s,e,label] of [[1186,1189,'Embedded-Ruby'],[1195,1198,'Embedded-request-flow'],[1204,1207,'Embedded-AR-query']]) add(file,lines,s,e,label,lines[s]);
    add(file,lines,1228,1229,'Embedded-MVC-follow-up','Can you describe a real-world scenario where you used MVC, and what challenges did you encounter?',1);
    audits.push({ sourceFile:file, fullyRead:true, readRanges:[[1,lines.length]],
      nonQuestionRanges:[{startLine:1,endLine:24,reason:'Title, metadata, marketing and contents.'},{startLine:1178,endLine:1324,reason:'Recruiting guidance, embedded technical prompts separately extracted, marketing FAQ and related posts; all original text retained in source ledger.'}],
      corrections:['Rails 8 defaults vs legacy Rails tooling.', 'HTTP semantics and TLS.', 'CookieStore default.', 'SQLAlchemy examples were not Rails.', 'Untrusted ORDER BY.', 'Sidekiq MRI concurrency.', 'Tenant isolation.', 'Asset versions.', 'Russian doll cache invalidation.', 'Migration repeatability.', 'Legacy payment example unsafe.', 'I18n locale leakage.'] });
  }
}
for (const r of records) {
  if (/Ruby|Symbol|Mixin|Hash |Accessor|super|Yield|Clouser|Inheritance|Array#|quotes|variables|Garbage Collection|Class Library|Python|Load and Require|comments/i.test(r.question) && !/Rails.*Ruby|Ruby.*Rails/.test(r.question)) r.category='A';
  if (/false and nil|String and Symbol|Mixin|variable|Accessor|super and super|Multiple Inheritance|Hash in|Array#|Yield in|Clouser|Ruby different from Python|Garbage Collection|Class Library|Load and Require|comments in Ruby|quotes for strings/.test(r.question)) r.category='A';
  if (/SQL|query|queries|database|scope|ActiveRecord|Active Record/i.test(r.question)) r.category='C';
  if (/optimize|slow|debug|production|deploy|payment|legacy|real.time|background|multi.tenan/i.test(r.question)) r.category='E';
  if (/engine|Rack|review|ecosystem|open.source|challenging Rails project|Service Object/.test(r.question)) r.category='F';
  if (/Explain it like|purpose|What is |What are |What does|How do you start|naming|common data types|CLI|command line/.test(r.question)) r.difficulty='Beginner';
  if (r.sourceFile==='twentyseven.txt' && r.startLine>=661 && r.startLine<=872) r.difficulty='Advanced';
  r.explanation = r.explanation.replace(/\nRuby on Rails (?:interview questions for (?:juniors|experienced)|intermediate interview questions|MCQ)\s*$/,'');
}
fs.writeFileSync(path.join(dest,'records.initial.json'),JSON.stringify(records,null,2));
fs.writeFileSync(path.join(dest,'audit.json'),JSON.stringify(audits,null,2));
console.log('Extracted', records.length, 'root records');
