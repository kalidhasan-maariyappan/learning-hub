'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
const shell = fs.readFileSync(path.join(root,'public/index.html'),'utf8');
const context = {window:{addEventListener(){}},document:{documentElement:{dataset:{}},addEventListener(){}},
  location:{pathname:'/spring-boot-crash-course/'},localStorage:{getItem(){return null;},setItem(){}},matchMedia:()=>({matches:false}),console};
vm.createContext(context);
for (const match of shell.matchAll(/<script src="\/([^\"]+)"/g)) {
  const file = path.join(root,'public',match[1].split('?')[0]);
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const JT = context.window.JT;
vm.runInContext(fs.readFileSync(path.join(root,'public/js/content/spring-boot-crash/transcripts.js'),'utf8'),context);
assert.equal(JT.course().home,'sbc_home');
assert.equal(JT.bootCrashCatalog.length,63);
assert.equal(JT.bootCrashTutorials.length,63,'Every transcript must have an authored teaching chapter');
assert.equal(JT.bootCrashTutorials.filter(t=>t.practice).length,58,'Practical and inspection lessons must have a complete project reference');
assert.equal(JT.bootCrashOrder.length,64);
assert.equal(new Set(JT.bootCrashOrder).size,64);
const norm = text => text.replace(/\s+/g,' ').trim();
const decode = text => text.replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
let passages = 0;
for (const lesson of JT.bootCrashTranscripts) {
  const raw = fs.readFileSync(path.join(root,'bootcamp-springboot',lesson.filename),'utf8');
  assert.equal(lesson.sha256,crypto.createHash('sha256').update(raw).digest('hex'));
  assert.equal(lesson.title,/^# Video transcript: (.+)$/m.exec(raw)[1].trim());
  assert.equal(norm(lesson.paragraphs.join(' ')),norm(raw.split(/^## Transcript\s*$/m)[1]));
  const {html} = JT.renderBody(lesson.slug);
  const entry = JT.bootCrashCatalog.find(l=>l.slug===lesson.slug);
  assert.equal(entry.sourceTitle,lesson.title);
  assert.equal(JT.pages[lesson.slug].title,entry.title);
  assert.ok(entry.title.length<90,'Use a concise teaching title');
  assert.ok(!html.includes('sbc-passage'),'Raw source passages must not be teaching content');
  assert.ok(!html.includes(lesson.paragraphs[0]),'Opening captions must not be pasted into the lesson');
  assert.ok(JT.bootCrashOrder.includes(lesson.slug));
  assert.equal(JT.url(lesson.slug),'/spring-boot-crash-course/'+lesson.slug);
  assert.ok(html.includes(lesson.url));
  assert.doesNotMatch(html, /\[object Object\]|undefined|<script/);
  passages += lesson.paragraphs.length;
  if (fs.existsSync(path.join(root,'dist/index.html'))) assert.ok(fs.existsSync(path.join(root,'dist/spring-boot-crash-course',lesson.slug,'index.html')),'Missing exported lesson '+lesson.slug);
}
for (const tutorial of JT.bootCrashTutorials) {
  const slug = 'sbc_'+String(tutorial.number).padStart(2,'0');
  const html = JT.renderBody(slug).html;
  assert.equal(tutorial.title,JT.pages[slug].title);
  assert.ok(tutorial.intro.length>80 && tutorial.sections.length>=4);
  assert.ok(tutorial.evidence && tutorial.remember.length);
  assert.equal(tutorial.hideOutline,true,'No on-this-page link menu');
  assert.equal(tutorial.compact,true,'Use the accepted compact layout');
  if(tutorial.number>1) assert.match(tutorial.intro,/we|let’s/i,'Address the learner directly');
  for (const section of tutorial.sections) assert.ok(html.includes(escText(section.heading)),'Missing authored section');
  assert.equal(html.includes('On this page'),!tutorial.hideOutline);
  assert.ok(html.includes('Remember'));
  assert.doesNotMatch(html,/awaiting its teaching rewrite|hello welcome|sit back relax|subscribe to my channel/i);
}
function escText(s) {return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
assert.ok(JT.renderBody('sbc_48').html.includes('Verified locally with Java 25'));
assert.ok(JT.renderBody('sbc_63').html.includes('spring-boot-starter-aspectj'));
for (const slug of ['default','spring_home','springboot_home','sbp_home','security_home','ruby_home','rails_home','java_ca_home']) assert.ok(JT.pages[slug],'Missing existing course '+slug);
console.log(`PASS: 63 source mappings/hashes/order and ${passages} internally preserved source paragraphs; ${JT.bootCrashTutorials.length} authored tutorials with teaching sections and no caption dumps; 64 routes, existing course registration, demo display and export paths.`);
