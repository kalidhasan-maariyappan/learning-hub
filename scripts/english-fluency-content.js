// Concise authored B2 bridge units; source files keep every translation reviewable.
const fs=require('node:fs');
const path=require('node:path');
module.exports=function loadFluency(dir){
 const units=[];let current=null;
 const files=fs.readdirSync(dir).filter(x=>/^fluency-.*\.txt$/.test(x)).sort();
 for(const file of files){
  for(const [index,raw]of fs.readFileSync(path.join(dir,file),'utf8').replace(/^\uFEFF/,'').split(/\r?\n/).entries()){
   const line=raw.trim();if(!line||line.startsWith('#'))continue;
   const error=message=>{throw Error(file+':'+(index+1)+' '+message);};
   const values=line.slice(1).split('|').map(x=>x.trim());
   if(line.startsWith('@')){
    if(values.length!==7)error('Expected seven header fields');
    let[id,level,category,title,ta,why,rule]=values;
    const patch=id.startsWith('+');if(patch)id=id.slice(1);
    current={id,level,category,title,ta,why,whyTa:ta,rule,patch,practiceOnly:true,richContent:true,examples:[],practice:[],prompts:[],checklist:[],appliesTo:[]};units.push(current);
   }else{
    if(!current)error('Missing unit header');
    switch(line[0]){
     case '=':if(values.length!==2)error('Example needs English and Tamil');current.examples.push(values);break;
     case '?':if(values.length!==5)error('Quiz needs five fields');current.practice.push([values[0],values[1],values[2].split('~').map(x=>x.trim()),Number(values[3]),values[4]]);break;
     case '>':current.prompts.push(line.slice(1).trim());break;
     case '!':current.checklist.push(line.slice(1).trim());break;
     case '&':current.appliesTo.push(...line.slice(1).split(',').map(x=>x.trim()));break;
     case '%':current.wordTarget=values.map(Number);break;
     case '~':current.speakingSeconds=values.map(Number);break;
     default:error('Unknown line type');
    }
   }
  }
 }
 for(const unit of units){
  if(!unit.examples.length||unit.practice.length<3||!unit.prompts.length)throw Error('Incomplete practice unit: '+unit.id);
  for(const q of unit.practice)if(!Number.isInteger(q[3])||q[3]<0||q[3]>=q[2].length)throw Error('Invalid answer: '+unit.id);
 }
 return units;
};
