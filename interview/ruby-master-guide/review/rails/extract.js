const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../../ruby');
const assigned = ['eighteen','fifteen','sixteen','thirty','thirtyeight','thirtyfive','thirtyfour','thirtyone','thirtyseven','thirtysix','thirtytwo','twenty','twentyeight','twentyfive','twentynine','twentysix','twentytwo'];
const ranges = { eighteen:[17,305], fifteen:[81,249], sixteen:[19,325], thirty:[10,198], thirtyeight:[37,260], thirtyfive:[13,305], thirtyfour:[20,576], thirtyone:[19,823], thirtyseven:[12,221], thirtysix:[6,720], thirtytwo:[23,147], twenty:[22,523], twentyeight:[2,401], twentyfive:[8,727], twentynine:[16,72], twentysix:[13,111], twentytwo:[8,507] };
const explicit = {
 eighteen:[17,79,85,112,143,183,200,241,251,268,283],
 twentyeight:[2,19,49,70,81,94,112,119,151,190,202,217,239,264,295,298,301,303,306,309,316,319,322,325,329,333,340,348,355,358,361,369,378,381,388,401],
 thirtyone:[19],
};
const records = [], audits = [];
function clean(s) { return s.replace(/^\s*(?:A:|Answer:)\s*/i,'').replace(/^Code language:.*\r?\n?/gm,'').trim(); }
function classify(q) {
 if (/write (?:a |the )?(?:function|code)|output|code snippet|following code|following snippet|flatten|array.*(?:sum|odd|even)|obtain the following|input:|build an array/i.test(q)) return 'D';
 if (/SQL|indexing|database (?:transactions|index)|slow.*quer|joins|includes|find_each|eager_load|preload|count.*length|quantity.*length|optimistic|pessimistic|counter_cache/i.test(q)) return 'C';
 if (/scenario|production|deploy|traffic|scale|scalab|background|N\+1|third.party|performance|large data|multi.tenan|throttl|rate.limit|unauthorized|client wants|concurrent/i.test(q)) return 'E';
 if (/metaprogram|Symbol#to_proc|eigenclass|single.table|internals|architecture|Zeitwerk|engine|design pattern|service.oriented|microservice|Service Objects/i.test(q)) return 'F';
 if (/Ruby(?! on Rails)|symbol|string|(?:class|instance|global) variable|lambda|proc|block|loop|inheritance|module|garbage|nil|false|self|constructor|getter|setter|load and require|class libraries|class library|class and|an object|a class|unit testing|duck|rake|splat|closure|Hash|JSON|equal|each.*map|raise.*rescue/i.test(q) && !/Active|Rails|controller|migration|gemfile/i.test(q)) return 'A';
 return 'B';
}
for (const name of assigned) {
 const sourceFile=name+'.txt', lines=fs.readFileSync(path.join(root,sourceFile),'utf8').split(/\r?\n/);
 const [lo,hi]=ranges[name];
 let starts = explicit[name] ? [...explicit[name]] : [];
 if(name==='sixteen') lines.forEach((s,i)=>{ if(/^#### /.test(s)) starts.push(i+1); });
 else if(name==='fifteen') lines.forEach((s,i)=>{if(i+1>=lo&&i+1<=hi&&(/^(?:Explain|What|How).*[?\.]$/.test(s)||/^\d+\. .*\?$/.test(s)))starts.push(i+1);});
 else if(name==='thirtyeight') lines.forEach((s,i)=>{ if(i+1>=lo&&i+1<=hi&&/^(?:(?:Explain|What|How|Outline|In what|Describe|Which|Does|Give|Is Ruby|When should).*?[?.]|\d+\. .*?[?.])$/.test(s)) starts.push(i+1); });
 else if(name==='thirtyfive') lines.forEach((s,i)=>{ if(/^Question \d+:/.test(s)) starts.push(i+1); });
 else if(name==='thirtyfour') lines.forEach((s,i)=>{ if(i+1<142&&i+1>=lo&&s&&!/^Question/.test(s))starts.push(i+1);else if(/^\d+\. /.test(s))starts.push(i+1); });
 else if(name==='thirtyone') lines.forEach((s,i)=>{if(s==='Question:')starts.push(i+1);});
 else if(name==='thirtyseven') lines.forEach((s,i)=>{if(/^\d\d$/.test(s)){let n=i+1;while(!lines[n].trim())n++;starts.push(n+1);}});
 else if(name==='twentysix')lines.forEach((s,i)=>{if(/^Q\d+:/.test(s))starts.push(i+1);});
 else if(!explicit[name]&&name!=='sixteen')lines.forEach((s,i)=>{if(i+1>=lo&&i+1<=hi&&/^\s*(?:\d+[.)]|Q\d+\.)\s+/.test(s)&&!/^\d+\.\d/.test(s))starts.push(i+1);});
 if(name==='twentytwo'){for(let i=395;i<lines.length;i++)if(/^\d+\.$/.test(lines[i]))starts.push(i+2);}
 starts=[...new Set(starts)].filter(s=>s>=lo&&s<=hi).sort((a,b)=>a-b);
 const included=[];
 for(let k=0;k<starts.length;k++){
  const start=starts[k],end=Math.min(hi,(starts[k+1]||hi+1)-1);
  let block=lines.slice(start-1,end), question=block[0].replace(/^\s*(?:#{1,6}\s*|Question \d+:\s*|Q\d+[.:]\s*|\d+[.)]\s*)/,'').trim(), answerStart=1;
  if(question==='Question:'){ let a=block.findIndex(s=>/^Answer:/.test(s)); if(a<0) a=Math.min(4,block.length); question=block.slice(1,a).join('\n').trim();answerStart=a+1; }
  let sourceAnswer=clean(block.slice(answerStart).join('\n'));
  if(name==='thirtyone'&&start===19){question='Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints';sourceAnswer=block.join('\n');}
  const category=classify(question);
  const text=sourceAnswer.replace(/^#{1,6}\s*/gm,'').replace(/```[^\n]*\n[\s\S]*?```/g,'').trim();
  let directAnswer=text.split(/\n\s*\n/).find(s=>s.trim()&&!/^(?:Tip:|Answer:|image|Junior|Mid|Senior)/.test(s.trim()))||'';
  const issues=[];
  if(!sourceAnswer||/^(?:image\s*)+$/.test(sourceAnswer))issues.push('The source supplies a prompt without an answer; an independently prepared answer is required.');
  if(/(?:^|\n)image(?:\n|$)|ruby on rails (?:coding )?interview questions/i.test(sourceAnswer))issues.push('A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.');
  records.push({sourceFile,startLine:start,endLine:end,question,sourceAnswer,directAnswer,explanation:sourceAnswer,example:'',importantPoints:[],category,difficulty:category==='F'?'Advanced':category==='A'||category==='B'?'Beginner':'Intermediate',issues});
  included.push([start,end]);
 }
 const omitted=[];let n=1;for(const [a,b]of included){if(a>n)omitted.push({startLine:n,endLine:a-1,disposition:'Page introduction, section heading, or nontechnical website/hiring boilerplate; original preserved in source file.'});n=b+1;}if(n<=lines.length)omitted.push({startLine:n,endLine:lines.length,disposition:'Website footer/marketing/hiring content; original preserved in source file.'});
 audits.push({sourceFile,totalLines:lines.length,readRanges:[[1,lines.length]],processing:'Full text decoded and segmented; manual content review in progress.',includedRanges:included,omittedRanges:omitted,extractedRecords:included.length});
}
fs.writeFileSync(path.join(__dirname,'records.json'),JSON.stringify(records,null,2));
fs.writeFileSync(path.join(__dirname,'audit.json'),JSON.stringify(audits,null,2));
console.log(audits.map(a=>`${a.sourceFile}: ${a.extractedRecords}`).join('\n'));console.log('TOTAL',records.length);
