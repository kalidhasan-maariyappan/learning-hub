const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const root=__dirname;
const questions=JSON.parse(fs.readFileSync(path.join(root,'questions.json')));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'SOURCE_MANIFEST.json')));
const counts=JSON.parse(fs.readFileSync(path.join(root,'coverage.json')));
const ids=new Set(),occurrences=new Set();
const categories={};
const files={'A':'A-ruby.md','B':'B-rails.md','C':'C-database-sql.md','D':'D-coding.md','E':'E-scenarios.md','F':'F-advanced.md'};
for(const source of manifest){const bytes=fs.readFileSync(path.resolve(root,'../ruby',source.file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sha256,'Original changed: '+source.file);}
const baseline=JSON.parse(fs.readFileSync(path.join(root,'review','source-integrity-baseline.json')));
for(const file of baseline)assert.equal(manifest.find(m=>m.file===file.file)?.sha256,file.sha256,'Source differs from review baseline: '+file.file);
assert.equal(counts.filesSuccessfullyAnalyzed,manifest.length,'Some file reviews are not marked complete');
for(const q of questions){
 assert(!ids.has(q.id),'Duplicate final ID');ids.add(q.id);
 categories[q.category]=(categories[q.category]||0)+1;
 assert(q.occurrences.length>0);
 const chapter=fs.readFileSync(path.join(root,files[q.category]),'utf8');
 assert(chapter.includes('id="'+q.id.toLowerCase()+'"'),'Missing question anchor');
 for(const o of q.occurrences){
  assert(!occurrences.has(o.occurrenceId),'Duplicate occurrence ID');occurrences.add(o.occurrenceId);
  assert.equal(o.finalId,q.id);assert.equal(o.category,q.category);
  assert(o.question&&o.directAnswer&&o.explanation,'Missing required authored content: '+o.occurrenceId);
  assert(o.example||o.issues.some(i=>/missing|absent|unrecoverable|not (?:supplied|provided|available)|undefined|no .*code|source.*(?:incomplete|omits)|not enough|conceptual/i.test(i)),'Missing example without limitation: '+o.occurrenceId);
  assert(o.startLine>=1&&o.endLine>=o.startLine);
 }
}
assert.equal(ids.size,counts.uniqueQuestions);
assert.equal(occurrences.size,counts.occurrencesBeforeDeduplication);
assert.equal(counts.uniqueQuestions+counts.exactQuestionDuplicates+counts.semanticQuestionDuplicates,counts.occurrencesBeforeDeduplication);
assert.deepEqual(categories,counts.questionsPerCategory);
const markdown=fs.readdirSync(root).filter(f=>f.endsWith('.md'));
let linkCount=0;
for(const f of markdown){const text=fs.readFileSync(path.join(root,f),'utf8');for(const m of text.matchAll(/\]\(([^\s)]+)\)/g)){
 const target=m[1];if(/^(https?:|mailto:|#)/.test(target))continue;
 const file=decodeURIComponent(target.split('#')[0]);
 if(!file||/[<>]/.test(file))continue;
 assert(fs.existsSync(path.resolve(root,file)),'Broken local link '+f+' -> '+file);linkCount++;
}}
const result={status:'passed',filesHashed:manifest.length,questions:ids.size,sourceOccurrences:occurrences.size,localLinksChecked:linkCount,checks:['original SHA-256 values','source spans','required answer fields','unique final IDs','one-to-one occurrence mapping','category counts','duplicate reconciliation','chapter anchors','local Markdown link targets']};
fs.writeFileSync(path.join(root,'VALIDATION.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
