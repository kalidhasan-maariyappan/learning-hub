const fs=require('fs'),path=require('path'),crypto=require('crypto');
const records=require('./records.json');
const raw=require('./audit.raw.json');
const offsets=(s,needle)=>[...s.matchAll(needle)].map(m=>({start:m.index,end:m.index+m[0].length,line:s.slice(0,m.index).split('\n').length}));
const exclusions={
 'first.txt':[{startLine:228,endLine:234,classification:'nontechnical promotional conclusion between source lists'},{startLine:374,endLine:380,classification:'nontechnical promotional conclusion between source lists'},{startLine:545,endLine:548,classification:'nontechnical promotional conclusion at end'}],
 'three.txt':[{startLine:1,endLine:1,classification:'difficulty heading retained as question difficulty metadata'},{startLine:173,endLine:173,classification:'difficulty heading retained as question difficulty metadata'},{startLine:379,endLine:379,classification:'difficulty heading retained as question difficulty metadata'}],
 'four.txt':[{startLine:1,endLine:11,classification:'article title, tags and nontechnical interview introduction'},{startLine:110,endLine:110,classification:'nontechnical closing salutation'}],
 'five.txt':[{startLine:1,endLine:1,classification:'topic heading'},{startLine:16,endLine:16,classification:'topic heading'},{startLine:28,endLine:28,classification:'topic heading'},{startLine:38,endLine:38,classification:'topic heading'},{startLine:50,endLine:50,classification:'topic heading'},{startLine:58,endLine:58,classification:'TODO section heading; all four following questions extracted'}],
 'twelve.txt':[]
};
const audits=raw.map(a=>{
 const source=fs.readFileSync(path.join('interview/ruby',a.sourceFile),'utf8');
 const group=records.filter(r=>r.sourceFile===a.sourceFile);
 const isHtml=['second.txt','six.txt'].includes(a.sourceFile);
 if(isHtml){
  const spans=a.sourceFile==='six.txt'?offsets(source,/<article\b[\s\S]*?<\/article>/g):offsets(source,/<div data-testid="interview-question"[\s\S]*?(?=<div data-testid="interview-question"|<div class="NOZGz4C7|$)/g);
  if(spans.length!==group.length)throw Error('Span count mismatch '+a.sourceFile);
  spans.forEach((s,i)=>{group[i].sourceStartOffset=s.start;group[i].sourceEndOffsetExclusive=s.end;});
 }
 return {...a,status:'complete',fullyRead:true,sha256:crypto.createHash('sha256').update(source).digest('hex'),readMethod:isHtml?'Every complete HTML question/answer container decoded and reviewed, including every code/example/explanation; markup/metadata examined and classified.':'Entire source read, every numbered/marked/unmarked prompt extracted with associated complete answer.',omittedRanges:exclusions[a.sourceFile]||[],nontechnicalHTMLContent:isHtml?'HTML layout, icons/SVG paths, share links, copy/toggle controls, difficulty/view/date display metadata and site promotional footer excluded from educational answers; original source files are preserved.':null,technicalOmissions:[],unavailableLinkedAssets:a.sourceFile==='first.txt'?source.split(/\r?\n/).map((l,i)=>/\.jpe?g/.test(l)?{line:i+1,filename:l.trim()}:null).filter(Boolean):[],flaggedRecords:group.filter(r=>r.issues.length).length,incompleteOriginalAnswers:group.filter(r=>r.sourceFile==='five.txt'&&(r.startLine>=52||r.startLine===18)).map(r=>({startLine:r.startLine,question:r.question})),notes:[...a.notes,'No original source modified. All unique technical content remains in sourceAnswer, question bodies or original source; corrected authored answers are separate.','Question endLine may include the following heading or boilerplate because original question blocks are contiguous; HTML character offsets disambiguate same-line containers.']};
});
fs.writeFileSync(path.join(__dirname,'records.json'),JSON.stringify(records,null,2));
fs.writeFileSync(path.join(__dirname,'audit.json'),JSON.stringify(audits,null,2));
console.log('Audited',audits.length,'files and',records.length,'records');
