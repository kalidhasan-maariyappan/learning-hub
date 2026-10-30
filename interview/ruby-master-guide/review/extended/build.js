const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const here = __dirname;
const source = path.resolve(here, '../../../ruby');
const files = ['seven','eight','nine','ten','eleven','thirteen','fourteen','nineteen','twentyone','twentyfour'];
const records = [];
const audits = [];
const trim = s => s.replace(/<\/?strong>/g,'').replace(/\uFEFF/g,'').trim();
const slug = q => q.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function collect(file, starts, end, lines) {
  for(let i=0;i<starts.length;i++) {
    const start = starts[i], stop = i+1<starts.length ? starts[i+1].i : end;
    let answer = trim(lines.slice(start.i+1,stop).join('\n'));
    // Section headings and embedded editor widgets carry no technical information.
    const cleaned=answer.split('\n').filter(l=>!/^\s*(?:main\.rb|Ruby 3\.1\.2|Ace Editor|Run|⋯|Copy|ruby|View Answer|advertisement|Code language:.*|Here is the Ruby code:)\s*$/.test(l)).join('\n').replace(/\n{3,}/g,'\n\n').trim();
    records.push({sourceFile:file+'.txt', startLine:start.i+1, endLine:stop, question:start.q, sourceQuestionLabel:start.label||'', sourceAnswer:cleaned, directAnswer:'', explanation:'',example:'',importantPoints:[],category:'A',difficulty:'Intermediate',issues:[],_key:file+':'+(start.label||start.i+1)});
  }
}
for(const file of files){
  const raw=fs.readFileSync(path.join(source,file+'.txt'),'utf8');
  const lines=raw.split(/\r?\n/);let starts=[],end=lines.length;
  if(file==='seven'){
    end=lines.findIndex(l=>l==='Next steps');
    lines.forEach((l,i)=>{const m=l.match(/^(\d+)\. (.+)$/);if(m&&i<end)starts.push({i,q:m[2],label:m[1]});});
    // The five preparation FAQ prompts are retained, including empty answers.
    lines.forEach((l,i)=>{if(i>end&&/^(What are the most common Ruby interview questions|How do I prepare for a Ruby coding interview|What Ruby concepts should I focus on for technical interviews|How can I improve my problem-solving skills in Ruby for interviews|What are some advanced Ruby interview topics)/.test(l))starts.push({i,q:l,label:'FAQ'+(starts.filter(x=>x.i>end).length+1)});});
    const main=starts.filter(s=>s.i<end),faq=starts.filter(s=>s.i>end);collect(file,main,end,lines);collect(file,faq,lines.length,lines);
  } else if(file==='eight'){
    end=lines.findIndex(l=>l.startsWith('Ace Your Ruby Interview:'));
    let tier='Junior';lines.forEach((l,i)=>{if(l==='Mid-Level Ruby Interview Questions'&&i>50)tier='Mid';if(l==='Expert-Level Ruby Interview Questions'&&i>50)tier='Expert';const m=l.match(/^Question (\d+):\s*(.+)$/);if(m&&i<end)starts.push({i,q:m[2],label:tier+'-'+m[1]});});collect(file,starts,end,lines);
  } else if(file==='nine'){
    end=lines.findIndex((l,i)=>i>700&&l==='Rajesh Kumar');
    lines.forEach((l,i)=>{const m=l.replace(/<\/?strong>/g,'').match(/^(\d+)\)\s*(.+)$/);if(m&&i<end)starts.push({i,q:m[2],label:m[1]});});collect(file,starts,end,lines);
  } else if(file==='ten'){
    end=lines.findIndex(l=>l==='Wrapping Up'&&lines.indexOf(l)>100); if(end<100)end=lines.findIndex((l,i)=>i>200&&l==='Wrapping Up');
    const prompt=l=>/^(?:What |How |Explain |Can you describe |Create a Rails controller|Write a method in a Rails|Given an array, write |Create a model called|Implement a method that)/.test(l);
    lines.forEach((l,i)=>{if(i>28&&i<end&&prompt(l))starts.push({i,q:l,label:String(starts.length+1)});});collect(file,starts,end,lines);
  } else if(file==='eleven'){
    end=lines.findIndex(l=>l.trim()==='Start Your Ruby Career');
    lines.forEach((l,i)=>{const m=l.match(/^(\d+)\. (.+)$/);if(m&&i<end)starts.push({i,q:m[2],label:m[1]});});collect(file,starts,end,lines);
  } else if(file==='thirteen'){
    const headings=['Everything is an Object','Truthy and Falsy Values','Blocks, Procs, Lambdas','Dynamic Typing','Singleton Methods and Metaprogramming','Implicit Returns','Bang Methods','Not Knowing the Difference Between == and eql? Operators','Not Knowing the Difference Between nil? and empty?','Assuming Rails Methods Are Built-in Ruby Methods','When to Use Symbols vs. Strings','Not Using Instance Variables Correctly','When to Employ and / or vs. && / ||','Parentheses are Optional','Concatenating Strings / Strings are Mutable in Ruby','Confusion between include and extend','Misunderstanding throw/catch and raise/rescue','Not Using Idiomatic Ruby'];
    end=lines.findIndex(l=>l==='Ruby Interview Replays');
    starts=[{i:lines.findIndex(l=>l==='Ruby Idioms & Idiosyncrasies'),q:'Which Ruby implementations exist, and how do their runtimes differ?',label:'runtime'}];
    for(const h of headings){const i=lines.indexOf(h);starts.push({i,q:h.endsWith('?')?h:'Explain '+h+'.',label:'concept-'+(starts.length)});}
    collect(file,starts,end,lines);
    for(const title of ['Validate string against dictionary','Minimum tree depth','Move Stones Over Grid']){
      const i=lines.indexOf(title,end);records.push({sourceFile:file+'.txt',startLine:i+1,endLine:i+4,question:title,sourceQuestionLabel:'replay-'+title,sourceAnswer:lines.slice(i+1,i+4).join('\n'),directAnswer:'',explanation:'',example:'',importantPoints:[],category:'D',difficulty:'Intermediate',issues:['Incomplete source: only an interview-replay title is supplied; the full problem statement and constraints are absent.'],_key:file+':replay-'+title});
    }
  } else if(file==='fourteen'){
    lines.forEach((l,i)=>{if(l.trim().endsWith('»')&&!/keep reading/.test(l))starts.push({i,q:l.trim().replace(/ »$/,''),label:String(starts.length+1)});});collect(file,starts,end,lines);
  } else if(file==='nineteen'){
    end=lines.findIndex(l=>l==='Why Ruby? Ruby vs Python, PHP, and Node.js');
    lines.forEach((l,i)=>{const m=l.match(/^Q(\d+)\. (.+)$/);if(m&&i<end)starts.push({i,q:m[2],label:m[1]});});collect(file,starts,end,lines);
    const compare=end, prepare=lines.findIndex(l=>l==='How to Prepare for a Ruby Interview');
    records.push({sourceFile:file+'.txt',startLine:compare+1,endLine:prepare,question:'What are Ruby’s trade-offs compared with Python, PHP and Node.js?',sourceQuestionLabel:'comparison',sourceAnswer:lines.slice(compare+1,prepare).join('\n').trim(),directAnswer:'',explanation:'',example:'',importantPoints:[],category:'F',difficulty:'Intermediate',issues:[],_key:file+':comparison'});
    const faqStart=lines.findIndex(l=>l==='Frequently  Asked  Questions'),faqEnd=lines.findIndex(l=>l==='From the team that builds coding interviews');
    let faq=[];lines.forEach((l,i)=>{if(i>faqStart&&i<faqEnd&&l.endsWith('?'))faq.push({i,q:l,label:'FAQ'+(faq.length+1)});});collect(file,faq,faqEnd,lines);
  } else if(file==='twentyone'){
    let section='unless';lines.forEach((l,i)=>{if(l.includes('focuses on “The Case'))section='case';if(l.includes('focuses on “Comparisons'))section='comparison';if(l.includes('focuses on “Operators'))section='operator';const m=l.match(/^(\d+)\. (.+)$/);if(m)starts.push({i,q:`[${section} MCQ ${m[1]}] ${m[2]}`,label:section+'-'+m[1]});});collect(file,starts,end,lines);
  } else if(file==='twentyfour'){
    end=lines.findIndex((l,i)=>i>700&&l.startsWith('Explore all 100 answers'));if(end<0)end=lines.length;
    let expected=1;lines.forEach((l,i)=>{const m=l.match(/^(\d+)\. (.+)$/);if(m&&i<end&&Number(m[1])===expected){starts.push({i,q:m[2],label:m[1]});expected++;}});collect(file,starts,end,lines);
  }
  const own=records.filter(r=>r.sourceFile===file+'.txt');
  audits.push({sourceFile:file+'.txt',bytes:Buffer.byteLength(raw),sha256:crypto.createHash('sha256').update(raw).digest('hex'),totalLines:lines.length,readRanges:[[1,lines.length]],processedCompletely:true,extractedCount:own.length,recordRanges:own.map(r=>[r.startLine,r.endLine]),excludedContent:'Publisher metadata, marketing, navigation/table-of-contents repeats, editor widget labels and unrelated footer links. Full originals remain unchanged.',notes:[]});
}
fs.writeFileSync(path.join(here,'raw-records.json'),JSON.stringify(records,null,2));
fs.writeFileSync(path.join(here,'audit.json'),JSON.stringify(audits,null,2));
console.log(audits.map(a=>`${a.sourceFile}: ${a.extractedCount}`).join('\n'));
console.log(records.map(r=>`${r._key} | ${r.startLine}-${r.endLine} | ${r.question}`).join('\n'));
