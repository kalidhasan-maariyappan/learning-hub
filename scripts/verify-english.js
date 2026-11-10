const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ctx = {window:{JT:{}}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('public/js/english-data.js','utf8'),ctx);
const d = ctx.window.JT.englishData;
assert.equal(d.inventory.length,90);
assert.equal(d.categories.length,23);
assert.equal(d.lessons.filter(l=>l.category==='grammar').length,90);
assert.equal(d.lessons.filter(l=>l.category==='sentence-patterns').length,100);
const ids = new Set();
const isTamil = text => /[\u0B80-\u0BFF]/.test(text);
for (const l of d.lessons) {
  assert(!ids.has(l.id), 'Duplicate ID '+l.id); ids.add(l.id);
  assert(d.levels.includes(l.level));
  assert(d.categories.some(c=>c[0]===l.category));
  assert.equal(l.status,'published');
  for(const k of ['id','title','ta','why','rule']) assert.equal(typeof l[k],'string',l.id+' '+k);
  assert(isTamil(l.ta),l.id+' missing Tamil meaning');
  assert(l.why.split(/\s+/).length<=35,l.id+' explanation is too long');
  assert(l.examples.length>=1,l.id+' no example');
  assert(l.practice.length>=1,l.id+' no practice');
  for(const ex of l.examples){assert.equal(ex.length,2);assert(isTamil(ex[1]));assert(ex[0]&&!/undefined|\[object Object\]/.test(ex[0]));}
  for(const q of l.practice){assert.equal(q.length,5);assert(q[3]>=0&&q[3]<q[2].length);assert.equal(new Set(q[2]).size,q[2].length,l.id+' ambiguous duplicate options');assert(isTamil(q[1]));assert(isTamil(q[4]),l.id+' missing Tamil feedback');}
  if(l.category==='verbs'&&!l.practiceOnly){assert.equal(l.forms.length,5);assert(l.forms.every(f=>typeof f==='string'&&f.length>0));if(!l.source){assert(l.examples.length>=3);assert.equal(l.exampleLabels.length,l.examples.length);assert(l.examples[2][0].startsWith('I will '));}assert(!l.examples[0][0].startsWith('I be '));}
  if(l.source){assert(d.sources[l.source]);assert.equal(l.translationStatus,'machine-assisted');assert(l.lexicalKey);assert(!/^\d{5}\./.test(l.ta));assert(!/^\d{5}\./.test(l.examples[0][1]));}
  if(['grammar','sentence-patterns'].includes(l.category))assert(l.rule);
}
for(const [i,level] of d.levels.entries()){
  const lessons=d.lessons.filter(l=>l.level===level);
  assert.equal(lessons.filter(l=>l.category==='grammar').length,[20,20,25,25][i]);
  assert.equal(lessons.filter(l=>l.category==='sentence-patterns').length,[15,20,30,35][i]);
  for(const [cat] of d.categories)assert(lessons.some(l=>cat==='overview'||cat==='exercises'||l.category===cat||cat==='irregular-verbs'&&l.category==='verbs'&&l.irregular),level+' empty '+cat);
}
const lexical=d.lessons.filter(l=>l.lexicalKey);
assert.equal(new Set(lexical.map(l=>l.lexicalKey)).size,4500);
assert.equal(d.vocabulary.unique,4500);
for(const [i,level] of d.levels.entries()){
 const set=new Set(lexical.filter(l=>d.levels.indexOf(l.level)<=i).map(l=>l.lexicalKey));
 assert.equal(set.size,[500,1200,2500,4500][i],level+' cumulative vocabulary');
 assert.equal(d.vocabulary.levels[i].cumulative,set.size);
}
const expansion=JSON.parse(fs.readFileSync('public/content/english/vocabulary-expanded.json','utf8'));
const corrections=fs.readFileSync('public/content/english/expression-corrections.txt','utf8').split(/\r?\n/).filter(x=>x&&!x.startsWith('#')).map(x=>x.split('|')[0].toLowerCase());
for(const l of expansion.filter(x=>['phrase','phrv'].includes(x.pos)))assert(corrections.includes(l.title.toLowerCase()),'Unreviewed expression: '+l.title);
assert.equal(expansion.length,4175);
assert.equal(d.lessons.filter(l=>l.source).length,4175);
for(const variants of [['color','colour'],['gray','grey'],['analyze','analyse'],['realize','realise']])assert(new Set(lexical.filter(l=>variants.includes(l.title.toLowerCase())).map(l=>l.lexicalKey)).size<=1,'Counted spelling variants twice');
if(fs.existsSync('dist/english-learning')){
  for(const l of d.lessons)assert(fs.existsSync('dist/english-learning/'+l.level+'/'+l.category+'/'+l.id+'/index.html'),'Missing static lesson '+l.id);
}
console.log('PASS: '+d.lessons.length+' lessons; exactly 4,500 unique vocabulary items (500/1,200/2,500/4,500); all 90 grammar units and 100 patterns; all level/category combinations; bilingual meanings/examples/feedback; verb forms and tense labels; unique IDs and quiz choices; static routes.');
