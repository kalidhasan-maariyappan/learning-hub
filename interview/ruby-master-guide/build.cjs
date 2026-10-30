// Rebuild the guide exclusively from the source files and checked review records.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = __dirname;
const sourceRoot = path.resolve(root, '../ruby');
const parts = ['core','extended','rails','root'];
const definitions = {
 A:['Ruby Interview Questions','A-ruby.md'],
 B:['Ruby on Rails Interview Questions','B-rails.md'],
 C:['Database and SQL Questions','C-database-sql.md'],
 D:['Ruby Coding Interview Problems','D-coding.md'],
 E:['Real-World Rails Scenarios','E-scenarios.md'],
 F:['Advanced Ruby, Rails and Engineering','F-advanced.md'],
};
function filesIn(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?filesIn(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const sourceFiles = filesIn(sourceRoot).filter(f=>f.toLowerCase().endsWith('.txt')).sort();
const manifest = sourceFiles.map(f=>{const buffer=fs.readFileSync(f);return {file:path.relative(sourceRoot,f).replaceAll('\\','/'),bytes:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),lines:buffer.toString('utf8').split(/\r?\n/).length};});
const byFile = new Map(manifest.map(m=>[m.file,m]));
const str = v => Array.isArray(v)?v.join('\n\n'):String(v??'');
const arr = v => !v?[]:Array.isArray(v)?v.map(str):[str(v)];
let records=[];
for(const part of parts){
 const p=path.join(root,'review',part,'records.json');
 if(!fs.existsSync(p))throw new Error('Review not finished: '+part);
 const data=JSON.parse(fs.readFileSync(p));
 if(!Array.isArray(data))throw new Error('Expected record array: '+part);
 records.push(...data.map(r=>({...r,reviewPart:part})));
}
const normalize = q => q.toLowerCase().replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/^\s*(?:q(?:uestion)?\s*)?\d+[.)：:]\s*/,'').replace(/\s+/g,' ').trim();
const term = q=>normalize(q).replace(/[`*_]/g,'').replace(/ruby\s+on\s+rails/g,'rails').replace(/active\s+record/g,'activerecord').replace(/\s*\?\s*$/,'').trim();
const isContextual = r => /(?:following|below|above|this (?:code|program|snippet)|these|scenario below|what (?:is|will be|would be) the output|what will.*equal|what happens when.*execut)/i.test(r.question) || /MCQ/i.test(str(r.sourceQuestionLabel)) || /(?:^|\n)[a-d]\)/.test(r.sourceAnswer);
// Deliberately bounded concept matching. Comparisons and compound questions stay separate.
const concepts = [
 ['ruby-definition',/^(?:what is ruby(?: programming language)?|what do you (?:mean|understand) by ruby|explain ruby|define ruby)\??$/],
 ['rails-definition',/^(?:what is rails(?: framework)?|what is rails and why is it (?:used|popular)|explain rails|define rails)(?:\?|\. explain it like.*)?$/],
 ['rails-mvc',/^(?:what is mvc(?: and how (?:it works|does it work))?|(?:explain|describe|can you describe) (?:the )?mvc (?:architecture|pattern|framework)(?: in rails| and how it(?:'s| is) used in rails)?|what (?:are the three components of rails|does mvc stand for in rails, and why is it important))\??(?: imagine.*)?$/],
 ['ruby-symbol-string',/^(?:(?:what is|explain|describe) (?:the )?difference(?:s)? between (?:a )?strings? and (?:a )?symbols?(?: in ruby| in rails)?|(?:strings? vs\.? symbols?|symbols? vs\.? strings?))\??$/],
 ['ruby-proc-lambda',/^(?:(?:what is|explain|describe) (?:the )?difference(?:s)? between (?:a )?procs? and (?:a )?lambdas?(?: in ruby)?|procs? vs\.? lambdas?)\??$/],
 ['ruby-block-proc-lambda',/^(?:(?:what are|explain|describe) (?:the )?differences? between blocks?, procs?,? and lambdas?(?: in ruby)?|(?:blocks?, procs?,? and lambdas?))\??$/],
 ['ruby-class-instance',/^(?:(?:what is|explain) (?:the )?difference between (?:a ruby |a )?class and (?:an )?instance(?: of a class)?(?: in ruby)?)\??$/],
 ['ruby-include-extend',/^(?:(?:what is|explain|describe) (?:the )?difference(?:s)? between include and extend(?: in ruby)?|include vs\.? extend)\??$/],
 ['ruby-load-require',/^(?:(?:what is|explain|describe) (?:the )?difference(?:s)? between load and require(?: in ruby)?|what is the role of load and require in ruby)\??$/],
 ['ruby-super',/^(?:(?:what is|explain) (?:the )?difference between (?:calling )?super and (?:calling )?super\(\)(?: call)?|super vs\.? super\(\))\??$/],
 ['ruby-nil-false',/^(?:(?:what is|explain|describe) (?:the )?difference between false and nil(?: in ruby| in rails)?|(?:nil vs\.? false|false vs\.? nil))\??$/],
 ['ruby-each-map',/^(?:(?:what is|explain) (?:the )?difference(?:s)? between (?:array#)?each and (?:array#)?map(?: in ruby)?|each vs\.? map)\??$/],
 ['ruby-gc',/^(?:(?:what is|explain|describe) (?:the )?garbage collection(?: mechanism)?(?: in ruby| in rails)?|how does (?:garbage collection work in ruby|ruby handle garbage collection))\??$/],
 ['ruby-hash',/^(?:what is (?:a )?hash(?: in ruby| in rails)?|what are hashes(?: in ruby)?|explain hashes(?: in ruby)?)\??$/],
 ['ruby-yield',/^(?:what is yield(?: in ruby| in rails)?|what is the (?:purpose|use) of (?:the )?yield keyword(?: in ruby)?)\??$/],
 ['ruby-closure',/^(?:what is (?:a )?(?:closure|clouser)(?: in ruby| in rails)?|what are closures(?: in ruby)?)\??$/],
 ['ruby-mixin',/^(?:what is (?:a )?mixin(?: in ruby| in rails)?|what are mixins(?: in ruby)?|explain mixins(?: in ruby)?)\??$/],
 ['ruby-accessor',/^(?:what are accessor methods(?: in ruby)?|what (?:is|are) (?:attr_accessor|attr_reader, attr_writer,? and attr_accessor)(?: in ruby)?)\??$/],
 ['rails-activerecord',/^(?:what is activerecord(?: in rails)?|explain activerecord(?: in rails)?|what is activerecord\? what does it help us do)\??$/],
 ['rails-orm',/^(?:(?:what is|explain) (?:an )?orm(?: in rails)?|what is object.relational mapping(?: in rails)?)\??$/],
 ['rails-migration',/^(?:what is (?:a )?rails migration|what are migrations(?: in rails)?|what is (?:a )?migration(?: in rails)?|explain rails migration|can you describe the purpose of a rails migration|what is a rails migration\? why would you use one)\??$/],
 ['rails-scaffolding',/^(?:what is (?:rails )?scaffolding(?: in rails)?|explain scaffolding(?: in rails)?)\??$/],
 ['rails-concern',/^(?:what (?:are concerns|do you mean by concerns)(?: in rails)?|explain (?:the concept of )?concerns(?: in rails)?(?:\. when and why would you use them)?)\??$/],
 ['rails-callback',/^(?:what is (?:a )?callback(?: in rails)?|what are callbacks(?: in rails)?|explain callbacks(?: in rails)?)\??$/],
 ['rails-callback-save-commit',/^(?:(?:what is|explain) (?:the )?difference between after_save and after_commit(?: callbacks)?(?: in rails)?)\??$/],
 ['rails-destroy-delete',/^(?:(?:what is|explain) (?:the )?difference between delete and destroy(?: in rails)?|delete vs\.? destroy)\??$/],
 ['rails-render-redirect',/^(?:(?:what is|explain|describe) (?:the )?difference between (?:using )?render and redirect_to(?: in (?:a rails controller|rails))?|what do you mean by render and redirect_to)\??$/],
 ['rails-polymorphic',/^(?:(?:what is|explain|describe) (?:a )?polymorphic association(?: in rails)?|what do you mean by polymorphic association(?: in rails)?)\??$/],
 ['rails-habtm-through',/^(?:(?:what is|explain) (?:the )?difference between has_many :through and has_and_belongs_to_many(?: and which one is better)?)\??$/],
 ['rails-job',/^(?:what is active\s?job(?: in rails)?|explain active\s?job(?: in rails)?)\??$/],
 ['rails-gemfile',/^(?:what is (?:the )?gemfile(?: in rails)?|what is the purpose of (?:the )?'?gemfile'?(?: in a rails project)?)\??$/],
 ['rails-helper',/^(?:what (?:is|are) (?:a )?(?:rails )?helpers?(?: in rails)?|explain the purpose of rails helpers)\??$/],
 ['rails-environments',/^(?:name the three default environments in rails|what are rails environments|explain what rails environments are \(development, test, production\))\??$/],
 ['rails-start-server',/^(?:how do you start (?:a )?rails server|how to start (?:a )?rails server)\??$/],
 ['rails-routes',/^(?:what (?:is|are) (?:rails )?rout(?:e|es|ing)(?: in rails)?|what is the role of the 'routes.rb' file in a rails application)\??$/],
 ['rails-rest',/^(?:what (?:is|are) restful routes(?: in rails)?|explain the concept of restful routes(?: in rails)?|what is restful routing(?: in rails)?)\??$/],
 ['rails-partial',/^(?:what is (?:a )?(?:rails )?partial(?: in rails views)?(?:,? and why would you use one|\? why would you use one)?|what are partials(?: in rails)?)\??$/],
 ['rails-controller',/^(?:what is (?:a )?rails controller(?:\? what is its main job)?|explain the purpose of (?:a )?rails controller)\??$/],
 ['rails-view',/^(?:what is a rails view(?:, and how does it relate to the controller)?|what are views in rails(?:\? what(?:'s| is) their purpose)?)\??$/],
 ['rails-flash',/^(?:what is (?:the )?flash(?: object| message)?(?: in rails)?|what is the purpose of (?:a )?'?flash'? message in rails)\??$/],
 ['rails-asset',/^(?:what is (?:an? )?asset pipeline(?: in rails)?(?:\? what problem does it solve|\? what is its purpose)?|explain (?:the )?asset pipeline(?: in rails)?)\??$/],
 ['rails-nplusone',/^(?:what is (?:the )?n\s*\+\s*1 quer(?:y|ies)(?: problem)?(?: in rails)?|explain (?:the )?n\s*\+\s*1 quer(?:y|ies) problem(?: in rails)?)\??$/],
 ['rails-scope',/^(?:what (?:is|are) (?:a )?scopes?(?: in rails)?|explain scopes(?: in rails)?)\??$/],
 ['rails-strong-parameters',/^(?:what are strong parameters(?: in rails)?|explain strong parameters(?: in rails)?)\??$/],
 ['rails-authentication-authorization',/^(?:(?:what is|explain) (?:the )?difference between authentication and authorization(?: in rails)?|authentication vs\.? authorization)\??$/],
 ['rails-session-cookie',/^(?:(?:what is|explain) (?:the )?difference between sessions? and cookies?(?: in rails)?|what are rails sessions and cookies used for)\??$/],
 ['rails-single-table-inheritance',/^(?:what is single.table inheritance(?: \(sti\))?(?: in rails)?|what is sti(?: in rails)?)\??$/],
 ['ruby-duck-typing',/^(?:what is duck typing(?: in ruby)?|explain duck typing(?: in ruby)?)\??$/],
 ['ruby-monkey-patch',/^(?:what is monkey patching(?: in ruby)?|explain monkey patching(?: in ruby)?)\??$/],
 ['ruby-metaprogramming',/^(?:what is metaprogramming(?: in ruby)?|explain metaprogramming(?: in ruby)?)\??$/],
 ['ruby-oop',/^(?:what are the (?:four |core )?principles of (?:object.oriented programming|oop)(?: in ruby)?|explain (?:the )?oop principles(?: in ruby)?)\??$/],
 ['rails-coc',/^(?:what (?:is|does) convention over configuration(?: mean)?(?: in rails)?|explain convention over configuration(?: in rails)?)\??$/],
];
function category(r){
 const c=str(r.category).charAt(0).toUpperCase();
 if(c==='B'&&/\b(?:SQL|PostgreSQL|MySQL|SQLite|MongoDB|connection pool(?:ing)?|database (?:schema|connections?|configuration)|query|queries|indexes|indexing|find_by|pluck|joins?|transactions?|locking)\b/i.test(r.question)) {
   if(/optimiz|slow|debug|bottleneck|production/i.test(r.question))return 'E';
   return 'C';
 }
 return definitions[c]?c:'F';
}
function subtopic(r){const q=term(r.question); const rules=[
 [/sql|postgres|mysql|join|index|transaction|query|database|activerecord|migration|association|scope|locking/,'Data, querying and integrity'],
 [/proc|lambda|block|yield|enumerat|iterator|map|each/,'Blocks, callables and iteration'],
 [/metaprogram|method_missing|define_method|reflection|eval|singleton|refinement|include|extend|prepend/,'Object model and metaprogramming'],
 [/class|object|inherit|module|mixin|encapsul|polymorph|access|super/,'Classes, modules and OOP'],
 [/array|hash|string|symbol|numeric|integer|variable|constant|range|nil|boolean|false/,'Values, collections and language basics'],
 [/security|authenti|authoriz|csrf|xss|injection|password|cookie|session|jwt|oauth|strong parameter/,'Authentication, authorization and security'],
 [/cache|performance|optimiz|memory|gc\b|garbage|thread|concurren|ractor|fiber|scale|scalab/,'Performance, memory and concurrency'],
 [/job|sidekiq|redis|queue|background|websocket|cable|notification/,'Background work and real-time features'],
 [/test|rspec|mock|stub|factory|fixture|tdd|bdd|debug|log|monitor/,'Testing, debugging and observability'],
 [/route|controller|view|mvc|partial|render|redirect|request|http|rest|form|helper|layout|asset/,'HTTP, MVC and presentation'],
 [/deploy|docker|kubernetes|heroku|aws|kamal|environment|gem|bundl|rake|version|upgrade/,'Dependencies, deployment and operations'],
 [/sort|search|algorithm|recurs|palindrome|fibonacci|linked|tree|graph|stack|queue|reverse|duplicate/,'Algorithms and data structures'],
 ];return (rules.find(([re])=>re.test(q))||[null,'Additional technical topics'])[1];}
let occurrenceNumber=0;
for(const r of records){
 r.sourceFile=str(r.sourceFile).replaceAll('\\','/').replace(/^.*interview\/ruby\//,'');
 if(!byFile.has(r.sourceFile))throw new Error('Unknown source '+r.sourceFile);
 for(const key of ['question','sourceAnswer','directAnswer','explanation','example'])r[key]=str(r[key]).trim();
 for(const key of ['importantPoints','issues'])r[key]=arr(r[key]);
 if(!r.question)throw new Error('Empty question '+r.sourceFile+':'+r.startLine);
 if(!(r.startLine>=1&&r.endLine>=r.startLine&&r.endLine<=byFile.get(r.sourceFile).lines))throw new Error('Invalid source span '+JSON.stringify(r));
 r.category=category(r);r.subtopic=subtopic(r);
 if(!['Beginner','Intermediate','Advanced'].includes(r.difficulty))r.difficulty='Intermediate';
 r.occurrenceId='SRC-'+String(++occurrenceNumber).padStart(5,'0');
 const q=term(r.question);
 r.exactKey=normalize(r.question)+(isContextual(r)?'|context:'+crypto.createHash('sha256').update(r.question+'\n'+r.sourceAnswer).digest('hex'):'');
 const concept=isContextual(r)?null:concepts.find(([,re])=>re.test(q));
 r.semanticKey=concept?concept[0]:null;
 r.groupKey=concept?'concept:'+concept[0]:'exact:'+r.exactKey;
}
// Optional explicitly reviewed equivalences; deictic code questions are never merged on a bare title.
const mergePath=path.join(root,'review','approved-merges.json');
const approvals=fs.existsSync(mergePath)?JSON.parse(fs.readFileSync(mergePath)):[];
const mergeAliases={'rails-active-record-definition':'rails-activerecord','rails-migration-definition':'rails-migration','rails-callback-definition':'rails-callback','rails-rest-routing':'rails-rest','rails-asset-pipeline':'rails-asset','ruby-gemfile':'rails-gemfile','rails-hash':'ruby-hash','ruby-false-nil':'ruby-nil-false'};
for(const approval of approvals){
 const key=mergeAliases[approval.key]||approval.key;
 for(const r of records){if(approval.questions.includes(r.question)&&!isContextual(r)){r.groupKey='concept:'+key;r.semanticKey=key;}}
}
const grouped=new Map();for(const r of records){if(!grouped.has(r.groupKey))grouped.set(r.groupKey,[]);grouped.get(r.groupKey).push(r);}
function quality(r){return (r.directAnswer&&r.directAnswer!==r.sourceAnswer?100:0)+(r.example?10:0)+(r.importantPoints.length*2)+Math.min(r.explanation.length/100,30)-(/missing|cannot determine|unrecoverable|not provided/i.test(r.directAnswer)?50:0);}
const groups=[...grouped.entries()].map(([key,items])=>{const representative=[...items].sort((a,b)=>quality(b)-quality(a))[0];return {key,items,representative,category:representative.category,subtopic:representative.subtopic};});
groups.sort((a,b)=>a.category.localeCompare(b.category)||a.subtopic.localeCompare(b.subtopic)||a.representative.question.localeCompare(b.representative.question));
const categoryCount={};
for(const g of groups){g.id=g.category+'-'+String(categoryCount[g.category]=(categoryCount[g.category]||0)+1).padStart(4,'0');for(const r of g.items){r.finalId=g.id;r.originalCategory=r.category;r.category=g.category;}}
function md(s){return str(s).replace(/\|/g,'\\|').replace(/\r?\n/g,' ');}
function questionTitle(s){const first=str(s).split(/\r?\n/).find(l=>l.trim())||'';return (first.length>220?first.slice(0,217)+'…':first).replace(/[\[\]]/g,'');}
function csv(row){return row.map(x=>'"'+str(x).replaceAll('"','""')+'"').join(',');}
function fence(s,lang='text'){const n=Math.max(3,...(s.match(/`+/g)||[]).map(t=>t.length+1));const ticks='`'.repeat(n);return ticks+lang+'\n'+s+'\n'+ticks;}
function exampleLanguage(r){if(r.exampleLanguage)return r.exampleLanguage;if(/^\s*<%/.test(r.example))return 'erb';if(/^\s*(?:SELECT|WITH|INSERT INTO|UPDATE \w+ SET|CREATE TABLE)\b/.test(r.example))return 'sql';if(/^(?:bin\/rails |rails |bundle |gem |RAILS_ENV=)/.test(r.example))return 'bash';if(/(?:^|\n)(?:class |module |def |require |puts |p |[a-z_]\w* = |# )/.test(r.example))return 'ruby';return 'text';}
function uniq(values){return [...new Set(values.filter(Boolean))];}
function sourceLink(r){return '['+r.sourceFile+':'+r.startLine+'–'+r.endLine+'](../ruby/'+r.sourceFile.replaceAll(' ','%20')+')';}
function questionsLink(g){return '['+g.id+']('+definitions[g.category][1]+'#'+g.id.toLowerCase()+')';}
function occurrenceQuestionLink(r){return '['+r.finalId+']('+definitions[r.category][1]+'#'+r.finalId.toLowerCase()+')';}
fs.mkdirSync(path.join(root,'sources'),{recursive:true});
for(const file of manifest){
 const fileRecords=records.filter(r=>r.sourceFile===file.file);
 const content=fs.readFileSync(path.join(sourceRoot,file.file),'utf8');
 let body='# Source ledger: '+file.file+'\n\nSHA-256: `'+file.sha256+'`\n\n'+file.lines+' physical lines; '+fileRecords.length+' extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.\n\n';
 body+='| Occurrence | Original lines | Final question | Original prompt |\n|---|---:|---|---|\n';
 for(const r of fileRecords)body+='| '+r.occurrenceId+' | '+r.startLine+'–'+r.endLine+' | ['+r.finalId+'](../'+definitions[r.category][1]+'#'+r.finalId.toLowerCase()+') | '+md(r.question)+' |\n';
 body+='\n## Complete original text\n\n'+fence(content)+'\n';
 fs.writeFileSync(path.join(root,'sources',file.file.replace(/\.txt$/i,'.md')),body);
}
for(const [cat,[title,filename]]of Object.entries(definitions)){
 const list=groups.filter(g=>g.category===cat);let body='# Part '+cat+': '+title+'\n\n[Master index](README.md) · [Coverage report](COVERAGE_REPORT.md)\n\n';
 body+=list.length+' consolidated questions. Original passages are kept in the source ledgers; corrected answers and distinct reviewed variants appear here.\n\n';
 let last='';for(const g of list){if(g.subtopic!==last){body+='\n## '+g.subtopic+'\n\n';last=g.subtopic;}body+='- ['+g.id+' — '+questionTitle(g.representative.question)+'](#'+g.id.toLowerCase()+')\n';}
 last='';
 for(const g of list){
  const r=g.representative;body+='\n---\n\n<a id="'+g.id.toLowerCase()+'"></a>\n\n### '+g.id+' — '+questionTitle(r.question)+'\n\n';
  body+='**Difficulty:** '+r.difficulty+' · **Topic:** '+g.subtopic+' · **Source occurrences:** '+g.items.length+'\n\n';
  body+='**Interview question**\n\n'+r.question+'\n\n**Direct answer**\n\n'+r.directAnswer+'\n\n**Detailed explanation**\n\n'+r.explanation+'\n\n';
  body+='**Practical example**\n\n'+(r.example?fence(r.example,exampleLanguage(r)):'The supplied prompt does not define a recoverable concrete example; see the source limitations below.')+'\n\n';
  const points=uniq(g.items.flatMap(r=>r.importantPoints));
  body+='**Important points and follow-ups**\n\n'+(points.length?points.map(p=>'- '+p).join('\n'):'- Explain the assumptions and observable behavior in the supplied example.')+'\n\n';
  const issues=uniq(g.items.flatMap(r=>r.issues));
  if(issues.length)body+='**Corrections and source limitations**\n\n'+issues.map(p=>'- '+p).join('\n')+'\n\n';
  body+='**Source references**\n\n'+g.items.map(x=>'- '+x.occurrenceId+' — '+sourceLink(x)+(x.sourceQuestionLabel?' ('+x.sourceQuestionLabel+')':'')+' · [complete source](sources/'+x.sourceFile.replace(/\.txt$/i,'.md')+')').join('\n')+'\n\n';
  const seen=new Set([r.directAnswer+'\n'+r.explanation+'\n'+r.example]);
  for(const v of g.items){const signature=v.directAnswer+'\n'+v.explanation+'\n'+v.example;if(seen.has(signature))continue;seen.add(signature);
   body+='<details>\n<summary>Distinct wording or additional reviewed detail — '+v.occurrenceId+' ('+v.sourceFile+')</summary>\n\n**Original prompt:** '+v.question+'\n\n**Answer:** '+v.directAnswer+'\n\n'+v.explanation+'\n\n'+(v.example?fence(v.example,exampleLanguage(v))+'\n\n':'')+'</details>\n\n';
  }
 }
 fs.writeFileSync(path.join(root,filename),body);
}
const matrixHeader=['occurrence_id','source_file','start_line','end_line','source_label','original_question','final_question_id','category','difficulty','merge_type','merge_rule'];
const matrix=[csv(matrixHeader)];
let exactDuplicates=0,semanticDuplicates=0;
const duplicateRows=[];
for(const g of groups){const exactSeen=new Set();for(const [i,r]of g.items.entries()){
 let type='primary';if(i){type=exactSeen.has(r.exactKey)?'exact-question-duplicate':'semantic-question-duplicate';if(type.startsWith('exact'))exactDuplicates++;else semanticDuplicates++;}
 exactSeen.add(r.exactKey);r.mergeType=type;
 matrix.push(csv([r.occurrenceId,r.sourceFile,r.startLine,r.endLine,r.sourceQuestionLabel||'',r.question,g.id,r.category,r.difficulty,type,g.key]));
 if(i)duplicateRows.push({finalId:g.id,occurrenceId:r.occurrenceId,type,rule:g.key,question:r.question});
}}
fs.writeFileSync(path.join(root,'QUESTION_COVERAGE_MATRIX.csv'),matrix.join('\n')+'\n');
fs.writeFileSync(path.join(root,'questions.json'),JSON.stringify(groups.map(g=>({id:g.id,category:g.category,topic:g.subtopic,representativeOccurrence:g.representative.occurrenceId,occurrences:g.items})),null,2));
fs.writeFileSync(path.join(root,'SOURCE_MANIFEST.json'),JSON.stringify(manifest,null,2));
fs.writeFileSync(path.join(root,'DUPLICATE_ANALYSIS.json'),JSON.stringify(duplicateRows,null,2));
const missing=records.filter(r=>r.issues.some(i=>/missing|absent|incomplete|unanswered|not (?:present|supplied|provided|included)|unrecoverable|no (?:answer|code)|truncat|screenshot|hidden/i.test(i)));
const notes=records.filter(r=>r.issues.length);
const technicalCorrections=records.filter(r=>r.issues.some(i=>!/Source explanation was expanded or corrected/.test(i)&&/incorrect|wrong|corrected|outdated|removed|deprecated|misleading|contradict|unsafe|inaccurate|typo|obsolete/i.test(i)));
const unanswerable=records.filter(r=>/cannot (?:be )?(?:determin|recover|comput|verif|establish)|unrecoverable|not determinable|not recoverable|source (?:omits|lacks)|(?:code|definitions?|class|snippet).{0,50}(?:absent|missing)|missing (?:code|snippet|question statement)/i.test(r.directAnswer));
const audits=parts.map(p=>({part:p,data:JSON.parse(fs.readFileSync(path.join(root,'review',p,'audit.json')))}));
fs.writeFileSync(path.join(root,'REVIEW_AUDITS.json'),JSON.stringify(audits,null,2));
const uncoveredFiles=manifest.filter(f=>!records.some(r=>r.sourceFile===f.file));
const reviewedFiles=new Set(audits.flatMap(a=>Array.isArray(a.data)?a.data:[]).filter(a=>a.fullyRead||a.processedCompletely||a.status==='complete').map(a=>a.sourceFile));
const stats={filesDiscovered:manifest.length,filesSuccessfullyAnalyzed:manifest.filter(m=>reviewedFiles.has(m.file)).length,filesWithExtractedRecords:manifest.length-uncoveredFiles.length,sourceBytes:manifest.reduce((s,m)=>s+m.bytes,0),sourceLines:manifest.reduce((s,m)=>s+m.lines,0),occurrencesBeforeDeduplication:records.length,exactQuestionDuplicates:exactDuplicates,semanticQuestionDuplicates:semanticDuplicates,uniqueQuestions:groups.length,questionsPerCategory:categoryCount,occurrencesWithSourceLimitations:missing.length,occurrencesWithReviewNotes:notes.length,occurrencesWithTechnicalCorrections:technicalCorrections.length,unrecoverableFromPastedStatement:unanswerable.length,inaccessibleFiles:[],filesWithoutExtractedRecords:uncoveredFiles.map(f=>f.file)};
fs.writeFileSync(path.join(root,'coverage.json'),JSON.stringify(stats,null,2));
let report='# Coverage and duplicate analysis\n\nScope: the recursively discovered `.txt` collection under `interview/ruby/`, frozen by the hashes in [SOURCE_MANIFEST.json](SOURCE_MANIFEST.json). Original files were not modified.\n\n';
report+='| Metric | Count |\n|---|---:|\n'+Object.entries(stats).filter(([,v])=>typeof v==='number').map(([k,v])=>'| '+k+' | '+v+' |').join('\n')+'\n\n';
report+='## Counting and deduplication rules\n\nCounts describe extracted question/concept occurrences, not numbers advertised by source websites. Compound prompts stay together when they share a code/scenario context; all their subparts remain in the source and reviewed explanation. Standalone technical headings are counted as concept prompts. Exact duplicates normalize case, whitespace, numbering and typographic quotes. Context-dependent/output/MCQ prompts also require matching source context. Semantic duplicates use narrowly defined equivalence rules and explicit reviewed approvals. Different comparisons and follow-ups remain separate. Unique count = occurrences − exact duplicates − semantic duplicates. Conservative non-merges are intentional when scope differs. All original occurrences map to one final ID in [QUESTION_COVERAGE_MATRIX.csv](QUESTION_COVERAGE_MATRIX.csv). Duplicate answers’ distinct reviewed explanations/examples remain under their final question.\n\n';
report+='## Questions per category\n\n| Part | Category | Unique questions |\n|---|---|---:|\n'+Object.entries(definitions).map(([c,[title,f]])=>'| '+c+' | ['+title+']('+f+') | '+(categoryCount[c]||0)+' |').join('\n')+'\n\n';
report+='## File coverage\n\n| File | Bytes | Lines | Extracted occurrences | Full source ledger |\n|---|---:|---:|---:|---|\n'+manifest.map(m=>'| '+m.file+' | '+m.bytes+' | '+m.lines+' | '+records.filter(r=>r.sourceFile===m.file).length+' | [Open](sources/'+m.file.replace(/\.txt$/i,'.md')+') |').join('\n')+'\n\n';
report+='## Incomplete or missing source material\n\nThese are limitations of the pasted collection. Some have an independently supplied answer or a clearly stated standard problem variant; a missing snippet or screenshot cannot be reconstructed. A source limitation does not imply that a known conceptual question remains unanswered.\n\n';
for(const r of missing)report+='- **'+r.occurrenceId+' → '+occurrenceQuestionLink(r)+'**, '+sourceLink(r)+': '+r.issues.filter(i=>/missing|absent|incomplete|unanswered|not (?:present|supplied|provided|included)|unrecoverable|no (?:answer|code)|truncat|screenshot|hidden/i.test(i)).join(' ')+'\n';
report+='\n## Correction and review register\n\nThis register includes technical corrections, version qualifications, expanded explanations, and source provenance notes; the count is not a claim that every entry was originally wrong. Each note links to the actual question.\n\n';
for(const r of notes)report+='- **'+r.occurrenceId+' → '+occurrenceQuestionLink(r)+'**, '+sourceLink(r)+': '+r.issues.join(' ')+'\n';
report+='\n## Verification and limits\n\nAll accessible files are represented by complete source ledgers and hashed manifests. Review records carry line spans and per-file audits in [REVIEW_AUDITS.json](REVIEW_AUDITS.json). Build validation checks source spans, IDs, one-to-one occurrence mapping, count reconciliation, links and original hashes. Technical review used official Ruby/Rails and database documentation where linked. No live Rails database, provider account or full sample application was provisioned; illustrative framework snippets are not claimed to have executed. Missing screenshots, hidden source answers and incomplete snippets remain explicitly identified. No inaccessible source files were encountered.\n';
fs.writeFileSync(path.join(root,'COVERAGE_REPORT.md'),report);
let corrections='# Technical corrections and historical behavior\n\n'+technicalCorrections.length+' source occurrences have explicit technical correction/version notes. This counts occurrences, not distinct bugs; an error repeated in two articles is listed twice for traceability. See the linked final question for detailed explanation and other source variants. General expansions and missing-source notes are listed separately in [the coverage report](COVERAGE_REPORT.md).\n\n';
for(const r of technicalCorrections){corrections+='## '+r.occurrenceId+' → '+occurrenceQuestionLink(r)+'\n\n**Question:** '+r.question+'\n\n**Source:** '+sourceLink(r)+'\n\n'+r.issues.filter(i=>!/Source explanation was expanded or corrected/.test(i)&&/incorrect|wrong|corrected|outdated|removed|deprecated|misleading|contradict|unsafe|inaccurate|typo|obsolete/i.test(i)).map(i=>'- '+i).join('\n')+'\n\n**Corrected interview answer:** '+r.directAnswer+'\n\n';}
fs.writeFileSync(path.join(root,'CORRECTIONS.md'),corrections);
let index='# Ruby & Ruby on Rails Interview Questions and Answers Master Guide\n\nPrepared from the complete local `interview/ruby/` collection for approximately three years of Rails experience, with advanced follow-ups retained.\n\n';
index+='**'+manifest.length+' files · '+records.length+' source occurrences · '+groups.length+' consolidated questions.**\n\n';
index+='## Table of contents\n\n'+Object.entries(definitions).map(([c,[title,f]])=>'- [Part '+c+' — '+title+']('+f+') ('+(categoryCount[c]||0)+' questions)').join('\n')+'\n- [Coverage and source limitations](COVERAGE_REPORT.md)\n- [Technical corrections](CORRECTIONS.md)\n- [Question Coverage Matrix](QUESTION_COVERAGE_MATRIX.csv)\n- [Complete source manifest](SOURCE_MANIFEST.json)\n- [Machine-readable questions](questions.json)\n- [Duplicate analysis](DUPLICATE_ANALYSIS.json)\n- [Review audits](REVIEW_AUDITS.json)\n\n';
index+='## How to use the guide\n\nEach question has a unique ID, difficulty, direct answer, explanation, example, important points, source references and correction notes where needed. For merged questions, expand the distinct wording/detail sections to see all reviewed variants. IDs belong to this generated edition and can change if the collection or consolidation rules change.\n\nStart with Parts A–C, practice Part D with the assumptions and edge cases stated, and use Parts E–F for project discussions. First-person stories in copied articles are examples, not your personal experience. Prefer a truthful project answer with concrete evidence.\n\nThe original collection spans several Ruby/Rails generations. Modern behavior and historical APIs are distinguished within the answers. Framework examples require a compatible application and schema. Where a source omitted code or supplied only a problem title, the guide labels the gap or states the assumptions of an independently supplied example; it does not claim to recover missing material.\n\n## Complete question index\n\n| ID | Question | Difficulty | Occurrences |\n|---|---|---|---:|\n';
for(const g of groups)index+='| '+questionsLink(g)+' | '+md(questionTitle(g.representative.question))+' | '+g.representative.difficulty+' | '+g.items.length+' |\n';
index+='\n## Rebuild\n\nRun `node interview/ruby-master-guide/build.cjs` after editing reviewed records, then run `node interview/ruby-master-guide/validate.cjs`. The build reads existing reviews; it does not perform or claim a fresh human technical review. Nothing is published by these commands.\n';
fs.writeFileSync(path.join(root,'README.md'),index);
fs.writeFileSync(path.join(root,'review','merge-review.json'),JSON.stringify(groups.filter(g=>g.items.length>1).map(g=>({id:g.id,key:g.key,questions:uniq(g.items.map(r=>r.question)),occurrences:g.items.length})),null,2));
console.log(JSON.stringify(stats,null,2));
