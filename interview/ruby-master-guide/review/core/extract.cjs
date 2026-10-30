const fs = require('fs'), path=require('path');
const root=path.resolve('interview/ruby');
const out=__dirname;
const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',rsquo:'’',lsquo:'‘',rdquo:'”',ldquo:'“',ndash:'–',mdash:'—',hellip:'…'};
function decode(s){return s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi,(m,k)=>k[0]==='#'?String.fromCodePoint(parseInt(k.slice(k[1]==='x'?2:1),k[1]==='x'?16:10)):(entities[k]??m));}
function html(s){return decode(s.replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/<pre[^>]*>\s*<code[^>]*>/g,'\n```ruby\n').replace(/<\/code>\s*<\/pre>/g,'\n```\n').replace(/<code[^>]*>/g,'`').replace(/<\/code>/g,'`').replace(/<br\s*\/?\s*>/g,'\n').replace(/<li[^>]*>/g,'\n- ').replace(/<\/(p|div|h[1-6]|ul|ol|table|tr)>/g,'\n').replace(/<[^>]*>/g,'').replace(/<!--.*?-->/g,'')).replace(/\n[ \t]+\n/g,'\n\n').replace(/\n{3,}/g,'\n\n').trim();}
let records=[], audits=[];
function classify(q){if(/\b(write|implement|create a Ruby (function|method|class|module)|code-related)\b/i.test(q))return 'D';if(/ActiveRecord|database|queries/i.test(q))return 'C';if(/Rails|MVC|routes|authentication|authorization|partials|layouts|migration|background jobs|caching/i.test(q))return 'B';if(/concurr|parallel|memory leaks|GC|garbage|metaprogram|method_missing|refinement|DSL|eigenclass|metaclass|singleton class|JIT|interpreter|serverless|quantum|blockchain|Wasm|WebAssembly|CI\/CD/i.test(q))return 'F';return 'A';}
function add(file,start,end,q,a,label,difficulty,explanation,example){q=q.replace(/^\d+[.)]\s*/,'').replace(/^\*\*Q:\s*/,'').replace(/\*\*$/,'').replace(/^\* /,'').trim();a=a.replace(/^\s*(Answer:|A:)\s*/,'').trim();records.push({sourceFile:file,startLine:start,endLine:end,question:q,sourceAnswer:a,directAnswer:'',explanation:explanation||a,example:example||'',importantPoints:[],category:classify(q),difficulty:difficulty||(/\b(explain|differentiate|describe)\b/i.test(q)?'Intermediate':'Beginner'),issues:[],sourceQuestionLabel:label||''});}
for(const f of ['first.txt','second.txt','three.txt','four.txt','five.txt','six.txt','twelve.txt']){
 const text=fs.readFileSync(path.join(root,f),'utf8'),lines=text.split(/\r?\n/);const before=records.length;
 if(f==='second.txt'){
  const starts=[...text.matchAll(/<div data-testid="interview-question"/g)].map(m=>m.index);
  for(let i=0;i<starts.length;i++){let end=starts[i+1]??text.indexOf('<div class="NOZGz4C7',starts[i]);if(end<0)end=text.length;let s=text.slice(starts[i],end),q=s.match(/<div class="[^\"]*_2oDgiyfo[^\"]*">([\s\S]*?)<\/div>/),a=s.match(/<div class="[^\"]*_2rYsJZuE[^\"]*">([\s\S]*)/);if(!q||!a)throw Error('HTML question not parsed '+f+' '+i);add(f,text.slice(0,starts[i]).split('\n').length,text.slice(0,end).split('\n').length,html(q[1]),html(a[1]).replace(/\nThese sample questions[\s\S]*/,''),'Q'+(i+1));}
 }else if(f==='six.txt'){
  const articles=[...text.matchAll(/<article\b[\s\S]*?<\/article>/g)];
  for(let i=0;i<articles.length;i++){let m=articles[i],s=m[0],q=s.match(/<h2 class="question-title[^>]*>([\s\S]*?)<\/h2>/)[1],a=s.match(/<div class="answer-section">[\s\S]*?<div class="answer-content">([\s\S]*?)<\/div><\/div>/)[1],e=s.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)?.[1]||'',exp=s.match(/<div class="explanation-section">[\s\S]*?<div class="answer-content">([\s\S]*?)<\/div><\/div>/)?.[1]||'';
   add(f,text.slice(0,m.index).split('\n').length,text.slice(0,m.index+s.length).split('\n').length,html(q),html(a)+'\n\nExample:\n```ruby\n'+html(e).replace(/^`|`$/g,'')+'\n```\n\nDetailed Explanation:\n'+html(exp),'Q'+(i+1),s.match(/difficulty-badge[^>]*>([^<]+)/)?.[1],html(exp),html(e).replace(/^`|`$/g,''));
  }
 }else{
  const heads=[];
  lines.forEach((s,i)=>{if((['first.txt','four.txt'].includes(f)&&/^\d+\.\s+[A-Z]/.test(s))||(f==='three.txt'&&s==='Question:')||(f==='five.txt'&&(/^(\*\*Q:|\* (What|List|How))/.test(s)))||(f==='twelve.txt'&&/\?$/.test(s)))heads.push(i);});
  for(let i=0;i<heads.length;i++){let start=heads[i],end=(heads[i+1]??lines.length)-1,qi=start,answerStart=start+1;if(f==='three.txt'){qi=start+1;while(!lines[qi]?.trim()&&qi<end)qi++;answerStart=qi+1;}
   let q=lines[qi],a=lines.slice(answerStart,end+1).join('\n');
   a=a.replace(/\n(?:Junior|Intermediate|Senior) Ruby interview questions\s*$/,'').replace(/\n(?:Beginner|Intermediate|Advanced).*Ruby.*Questions.*$/,'');
   if(f==='first.txt'&&i===heads.length-1)a=a.split('\nThese questions provide applicants')[0];
   if(f==='four.txt')a=a.replace(/\nI hope that Helps!!\s*$/,'');
   if(f==='five.txt')a=a.replace(/\n# [^\n]+\s*$/,'');
   let prior=lines.slice(0,start+1).join('\n');let diff=f==='three.txt'?/Senior Ruby interview questions/.test(prior)?'Advanced':/Intermediate Ruby interview questions/.test(prior)?'Intermediate':'Beginner':undefined;
   add(f,start+1,end+1,q,a,lines[qi].match(/^\d+/)?.[0],diff);
  }
 }
 audits.push({sourceFile:f,lineCount:lines.length,byteCount:Buffer.byteLength(text),processedRanges:[[1,lines.length]],questionCount:records.length-before,notes:[],omittedRanges:[]});
}
fs.writeFileSync(path.join(out,'records.raw.json'),JSON.stringify(records,null,2));
fs.writeFileSync(path.join(out,'audit.raw.json'),JSON.stringify(audits,null,2));
fs.writeFileSync(path.join(out,'cleaned-review.txt'),records.map((r,i)=>`\n====== ${i+1}: ${r.sourceFile}:${r.startLine}-${r.endLine} ======\nQ: ${r.question}\n${r.sourceAnswer}\n`).join('\n'));
console.log(JSON.stringify(audits.map(a=>[a.sourceFile,a.questionCount])));
