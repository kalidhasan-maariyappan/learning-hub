// Compile the concise bilingual curriculum. Source rows are authored, not quota filler.
const fs = require('node:fs');
const path = require('node:path');
const root=path.join(__dirname,'..');
const dir=path.join(root,'public/content/english');
const rows=file=>fs.readFileSync(path.join(dir,file),'utf8').replace(/^\uFEFF/,'').split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#')).map(x=>x.split('|').map(v=>v.trim()));
const inventory=JSON.parse(fs.readFileSync(path.join(dir,'grammar-inventory.json'),'utf8'));
const categories=[['overview','Overview','கண்ணோட்டம்'],['grammar','Grammar','இலக்கணம்'],['conditionals','If-clauses','நிபந்தனை வாக்கியங்கள்'],['verbs','Verbs','வினைச்சொற்கள்'],['irregular-verbs','Irregular Verbs','ஒழுங்கற்ற வினைகள்'],['phrasal-verbs','Phrasal Verbs','கூட்டு வினைகள்'],['vocabulary','Vocabulary','சொற்களஞ்சியம்'],['adjectives','Adjectives','பெயரடைகள்'],['adverbs','Adverbs','வினையடைகள்'],['prepositions','Prepositions','இட முன்னுருபுகள்'],['time-expressions','Time Expressions','நேரத் தொடர்கள்'],['connectors','Connectors','இணைப்புச் சொற்கள்'],['collocations','Collocations','சொற்சேர்க்கைகள்'],['idioms','Idioms & Expressions','மரபுத்தொடர்கள்'],['sentence-patterns','Sentence Patterns','வாக்கிய அமைப்புகள்'],['questions','Questions & Negatives','கேள்விகள் மற்றும் எதிர்மறைகள்'],['conversations','Conversations','உரையாடல்கள்'],['pronunciation','Pronunciation','உச்சரிப்பு'],['listening','Listening','கேட்டல்'],['reading','Reading','வாசித்தல்'],['speaking','Speaking','பேசுதல்'],['writing','Writing','எழுதுதல்'],['exercises','Exercises & Quizzes','பயிற்சிகள்']];
const lessons=[];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function add(l){lessons.push({minutes:2,status:'published',rule:'',practice:[],prompts:[],...l});}
const grammar=rows('grammar.txt');
if(grammar.length!==90)throw Error('Expected 90 grammar units, got '+grammar.length);
const oldIDs={3:'simple-present',20:'past-regular',48:'second-conditional',84:'hedging'};
grammar.forEach((r,i)=>{if(r.length!==5)throw Error('Grammar row '+(i+1));const [ta,why,rule,en,exTa]=r;add({id:oldIDs[i]||'grammar-'+String(i+1).padStart(2,'0'),level:inventory[i].level,category:'grammar',title:inventory[i].title,ta,why,whyTa:ta,rule,examples:[[en,exTa]],inventoryNumber:i+1});});
const patterns=rows('patterns.txt');
patterns.forEach((r,i)=>{if(r.length!==6)throw Error('Pattern row '+(i+1));const [level,rule,ta,why,en,exTa]=r;add({id:'pattern-'+String(i+1).padStart(3,'0'),level,category:'sentence-patterns',title:rule,ta,why,whyTa:ta,rule,examples:[[en,exTa]]});});
const stative=new Set(['be','have','hear','see','like','love','want','need','know','understand','remember']);
rows('verbs.txt').forEach((r,i)=>{if(r.length!==8)throw Error('Verb row '+(i+1)+' fields '+r.length);const[level,f,ta,why,object,present,past,future]=r, forms=f.split(',');if(forms.length!==5)throw Error('Forms '+f);const [v1,v2,v3,v4,v5]=forms;add({id:v1,level,category:'verbs',title:v1[0].toUpperCase()+v1.slice(1),ta,why,whyTa:ta,forms,irregular:v2!==v3||!v2.endsWith('ed'),stative:stative.has(v1),rule:'',examples:[['I '+(v1==='be'?'am':v1)+' '+object+'.',present],['I '+v2+' '+object+'.',past],['I will '+v1+' '+object+'.',future]],exampleLabels:['Present · நிகழ்காலம்','Past · இறந்தகாலம்','Future · எதிர்காலம்'],practice:[['Past form of '+v1+'?','இறந்தகால வடிவம் எது?',[v1===v2?v5:v1,v2,v4],1,v2+' / '+past]]});});
for(const file of ['words.txt','skills.txt'])rows(file).forEach((r,i)=>{if(r.length!==7)throw Error(file+' row '+(i+1)+' fields '+r.length);const[level,category,title,ta,why,en,exTa]=r;add({id:title==='Meet someone new'?'introductions':title==='pick up'?'pick-up':(file==='words.txt'?category+'-':'')+slug(title),level,category,title,ta,why,whyTa:ta,examples:[[en,exTa]]});});
// Short object-placement reminders only where useful.
const separable=new Set(['turn on','turn off','put on','take off','pick up','give back','try on','fill in','give up','put off','work out','turn down','bring up','carry out','rule out','phase out','draw up','back up','set out','weigh up']);
for(const l of lessons){
 if(l.category==='phrasal-verbs'){l.separable=separable.has(l.title);l.rule=l.separable?l.title==='pick up'?'pick it up ✓ · pick up it ✗':l.title.split(' ')[0]+' + it + '+l.title.split(' ').slice(1).join(' '):['get up','wake up','sit down','stand up','come in','go out','get on','get off','come back','carry on','break down'].includes(l.title)?'':l.title+' + object';}
 if(['speaking','writing'].includes(l.category))l.prompts=[l.why+' / '+l.ta];
}
// Expanded, sourced vocabulary: one lexical headword/expression per item.
const expansion=JSON.parse(fs.readFileSync(path.join(dir,'vocabulary-expanded.json'),'utf8'));
const overrides=JSON.parse(fs.readFileSync(path.join(dir,'vocabulary-overrides.json'),'utf8'));
const shortMeanings=new Map(rows('short-meanings.txt').map(([word,ta,why])=>[word.toLowerCase(),{ta,why}]));
const expressionCorrections=new Map(rows('expression-corrections.txt').map(([word,ta,exampleTa])=>[word.toLowerCase(),{ta,exampleTa}]));
const posCategory={adj:'adjectives',adv:'adverbs',prep:'prepositions',conj:'connectors',phrv:'phrasal-verbs',phrase:'idioms',v:'verbs'};
for(const source of expansion){
 const x={...source,...(shortMeanings.get(source.title.toLowerCase())||{}),...(expressionCorrections.get(source.title.toLowerCase())||{}),...(overrides[source.id]||{})};
 const category=posCategory[x.pos]||'vocabulary';
 const f=x.inflections||{};
 const asText=v=>Array.isArray(v)?v.join(' / '):v;
 const forms=x.pos==='v'?[x.title,asText(f.past_tense),asText(f.past_participle),asText(f.present_participle),asText(f.third_person_singular)]:null;
 const hasForms=forms&&forms.every(v=>typeof v==='string'&&v.trim());
 add({id:x.id,level:x.level,category:category==='verbs'&&!hasForms?'vocabulary':category,title:x.title,ta:x.ta,why:x.why,whyTa:x.ta,
   examples:[[x.en,x.exampleTa]],...(hasForms?{forms,irregular:x.regular===false}:{}),
   lexicalKey:x.lexicalKey,partOfSpeech:x.pos,source:x.source,sourceEntry:x.sourceEntry,translationStatus:x.translationStatus});
}
const lexicalCategories=new Set(['verbs','phrasal-verbs','vocabulary','adjectives','adverbs','prepositions','connectors','collocations','idioms']);
for(const l of lessons)if(lexicalCategories.has(l.category)&&!l.lexicalKey)l.lexicalKey=l.title.toLowerCase().replaceAll('’',"'").trim();
const vocabularyLevels=['A1','A2','B1','B2'].map((level,i)=>{
 const all=lessons.filter(l=>l.lexicalKey&&['A1','A2','B1','B2'].indexOf(l.level)<=i);
 const cumulative=new Set(all.map(l=>l.lexicalKey)).size;
 const earlier=new Set(all.filter(l=>l.level!==level).map(l=>l.lexicalKey));
 const introduced=new Set(all.filter(l=>l.level===level&&!earlier.has(l.lexicalKey)).map(l=>l.lexicalKey)).size;
 const target=[500,1200,2500,4500][i];
 if(cumulative!==target)throw Error('Vocabulary count mismatch '+level+': '+cumulative+' / '+target);
 return {level,introduced,cumulative,target};
});

// Contextual comprehension, rather than matching an isolated heading.
const comprehension={
 'listen-a-time':['What time does the class start?','வகுப்பு எத்தனை மணிக்குத் தொடங்குகிறது?',['At nine','At six','At ten'],0,'ஒன்பது மணிக்கு / At nine.'],
 'listen-a-place':['Where is the bag?','பை எங்கே இருக்கிறது?',['On the chair','Under the chair','Near the door'],1,'நாற்காலியின் கீழே / Under the chair.'],
 'listen-a-platform':['Which platform?','எந்த நடைமேடை?',['One','Two','Three'],2,'மூன்றாவது நடைமேடை / Platform three.'],
 'listen-a-change-of-plan':['When will they meet?','எப்போது சந்திப்பார்கள்?',['Tuesday','Thursday','Sunday'],1,'வியாழக்கிழமை / Thursday.'],
 'listen-a-work-update':['What is still needed?','இன்னும் என்ன தேவை?',['Approval','A new report','A customer'],0,'ஒப்புதல் தேவை / Approval is needed.'],
 'listen-a-reason':['Why was the trip delayed?','பயணம் ஏன் தாமதமானது?',['A lost ticket','Heavy traffic','The bus broke down'],2,'பேருந்து பழுதானது / The bus broke down.'],
 'listen-a-condition':['What is the condition?','நிபந்தனை என்ன?',['A new office','Budget approval','A larger team'],1,'செலவுத்திட்ட ஒப்புதல் / Budget approval.'],
 'listen-a-qualified-opinion':['Is the cost reduction guaranteed?','செலவு குறையும் என்பது உறுதியா?',['Yes, always','No, it is only a possibility','The evidence is complete'],1,'உறுதியில்லை; குறையலாம் / It may reduce costs.'],
 'a-simple-morning':['What does Meena drink?','மீனா என்ன குடிக்கிறாள்?',['Tea','Coffee','Milk'],0,'தேநீர் / Tea.'],
 'my-family':['How many people?','எத்தனை பேர்?',['Two','Four','Six'],1,'நான்கு பேர் / Four people.'],
 'a-weekend-trip':['How did they travel?','எப்படிப் பயணம் செய்தார்கள்?',['By train','On foot','By bus'],2,'பேருந்தில் / By bus.'],
 'a-notice':['When does the library reopen?','நூலகம் மீண்டும் எப்போது திறக்கும்?',['Monday','Tuesday at nine','Friday at six'],1,'செவ்வாய்க்கிழமை ஒன்பது மணிக்கு / Tuesday at nine.'],
 'a-small-workplace-change':['What made meetings shorter?','கூட்டங்களைச் சுருக்க உதவியது எது?',['Updates sent beforehand','More staff','A bigger office'],0,'முன்கூட்டியே அனுப்பிய நிலவரங்கள் / Updates sent beforehand.'],
 'a-greener-neighbourhood':['Why plant trees?','மரங்களை ஏன் நட்டார்கள்?',['To make the street cooler','To sell fruit','To build a house'],0,'தெருவைக் குளிர்ச்சியாக்க / To make the street cooler.'],
 'choosing-a-policy':['Why hold a trial?','சோதனைக் காலம் ஏன்?',['To stop all travel','To gather evidence','To close the office'],1,'ஆதாரம் சேகரிக்க / To gather evidence.'],
 'evidence-and-claims':['Does it prove a company-wide effect?','நிறுவனம் முழுவதுமான விளைவை நிரூபிக்கிறதா?',['Yes','No, the sample is small','No workers improved'],1,'இல்லை; மாதிரி அளவு சிறியது / No; the sample was small.']
};
for(const l of lessons){
 if(comprehension[l.id])l.practice=[comprehension[l.id]];
 if(!l.practice.length){const others=lessons.filter(x=>x.category===l.category&&x.ta!==l.ta&&x.examples[0][1]!==l.examples[0][1]).slice(0,2);if(others.length<2)throw Error('Not enough quiz choices for '+l.id);const choices=[l.examples[0][1],...others.map(x=>x.examples[0][1])];const correct=lessons.indexOf(l)%3;const answer=choices.shift();choices.splice(correct,0,answer);l.practice=[['Choose the Tamil meaning: '+l.examples[0][0],'சரியான தமிழ் பொருளைத் தேர்ந்தெடுக்கவும்.',choices,correct,answer]];}
}
for(const l of lessons){if(l.id==='be'){l.rule='I am · you/we/they are · he/she/it is';l.forms[1]='was / were';}if(l.id==='cry')l.examples[1][0]='I cried when I was sad.';if(l.id==='read')l.rule='V1 read /riːd/ · V2/V3 read /red/';}
// Keep the original simple-present route and useful short form questions.
lessons.find(l=>l.id==='simple-present').practice=[['She ___ tea every morning.','அவள் தினமும் காலையில் தேநீர் குடிக்கிறாள்.',['drink','drinks','drinking'],1,'She drinks. / அவள் குடிக்கிறாள்.'],['___ you work here?','நீங்கள் இங்கே வேலை செய்கிறீர்களா?',['Do','Does','Are'],0,'Do you work here? / நீங்கள் இங்கே வேலை செய்கிறீர்களா?'],['He does not ___ on Sundays.','அவன் ஞாயிற்றுக்கிழமைகளில் வேலை செய்வதில்லை.',['works','working','work'],2,'does not + work / அவன் வேலை செய்வதில்லை.'],['Where ___ she live?','அவள் எங்கே வசிக்கிறாள்?',['do','does','is'],1,'Where does she live? / அவள் எங்கே வசிக்கிறாள்?'],['We ___ English daily.','நாங்கள் தினமும் ஆங்கிலம் கற்கிறோம்.',['learns','learning','learn'],2,'We learn. / நாங்கள் கற்கிறோம்.']];
// More usage from the same dictionary sense; translations remain labelled.
const additions=JSON.parse(fs.readFileSync(path.join(dir,'additional-examples.json'),'utf8'));
let appendedExamples=0;
for(const l of lessons){
 const extra=additions[l.id];if(!extra)continue;
 const seen=new Set(l.examples.map(x=>x[0].toLowerCase().replace(/[.!?]$/,'')));
 for(const pair of extra.examples){const key=pair[0].toLowerCase().replace(/[.!?]$/,'');if(seen.has(key))continue;seen.add(key);l.examples.push(pair);if(l.exampleLabels)l.exampleLabels.push('In context · பயன்பாடு');appendedExamples++;}
 l.additionalExampleSource=extra.source;l.additionalExamplesStatus=extra.translationStatus;
}
const fluencyUnits=require('./english-fluency-content')(dir);
const quizHash=require('node:crypto');
for(const unit of fluencyUnits){
 const {patch,...content}=unit;
 const existing=lessons.find(x=>x.id===unit.id);
 if(patch){if(!existing)throw Error('Unknown lesson to enrich: '+unit.id);Object.assign(existing,content);}
 else{if(existing)throw Error('Duplicate practice ID: '+unit.id);add(content);}
 const lesson=lessons.find(x=>x.id===unit.id);
 lesson.quizKey=quizHash.createHash('sha256').update(JSON.stringify(lesson.practice)).digest('hex').slice(0,12);
}
for(const unit of fluencyUnits)for(const id of unit.appliesTo)if(!lessons.some(l=>l.id===id))throw Error('Unknown practice reference '+id+' in '+unit.id);
for(const l of lessons){
 if(l.practiceOnly)continue;
 const explicit=fluencyUnits.filter(u=>u.appliesTo.includes(l.id));
 const related=fluencyUnits.filter(u=>u.category===l.category&&u.level==='B2');
 l.relatedPractice=[...new Set([...explicit,...related].map(x=>x.id))].slice(0,3);
}
const conditionalIds=lessons.filter(l=>[38,49,50,66,67].includes(l.inventoryNumber)).map(l=>l.id);
const fluencySummary={newUnits:fluencyUnits.filter(x=>!x.patch).length,enrichedUnits:fluencyUnits.filter(x=>x.patch).length,authoredExamples:fluencyUnits.reduce((n,x)=>n+x.examples.length,0),addedDictionaryExamples:appendedExamples,enrichedWordLessons:Object.keys(additions).length};

const ids=new Set();for(const l of lessons){if(ids.has(l.id))throw Error('Duplicate lesson ID: '+l.id);ids.add(l.id);}
const data={categories,lessons,inventory,fluencySummary,conditionalIds,lexicalCategories:[...lexicalCategories],vocabulary:{unique:4500,levels:vocabularyLevels},sources:JSON.parse(fs.readFileSync(path.join(dir,'sources.json'),'utf8')),levels:['A1','A2','B1','B2'],names:['Foundation','Everyday English','Independent English','Confident English'],targets:{grammar:[20,40,65,90],vocabulary:[500,1200,2500,4500],'sentence-patterns':[15,35,65,100]}};
fs.writeFileSync(path.join(root,'public/js/english-data.js'),'// Generated by scripts/build-english-content.js from public/content/english.\nwindow.JT.englishData = '+JSON.stringify(data)+';\n');
console.log('Compiled '+lessons.length+' concise English lessons.');
console.table(categories.filter(c=>c[0]!=='overview'&&c[0]!=='exercises').map(c=>({category:c[1],...Object.fromEntries(data.levels.map(level=>[level,lessons.filter(l=>l.level===level&&(l.category===c[0]||c[0]==='irregular-verbs'&&l.category==='verbs'&&l.irregular)).length]))})));


// Coverage is based on unique authored units, with cumulative counts per level.
const targetRows=[['Vocabulary items',l=>!!l.lexicalKey,[500,1200,2500,4500],true],['Single-word verbs',l=>!l.practiceOnly&&l.category==='verbs',[80,180,350,550]],['Phrasal verbs',l=>!l.practiceOnly&&l.category==='phrasal-verbs',[10,40,100,200]],['Irregular verbs',l=>!l.practiceOnly&&l.category==='verbs'&&l.irregular,[20,50,90,130]],['Adjectives',l=>!l.practiceOnly&&l.category==='adjectives',[60,140,280,450]],['Adverbs',l=>!l.practiceOnly&&l.category==='adverbs',[20,60,130,230]],['Connectors',l=>!l.practiceOnly&&l.category==='connectors',[10,25,55,100]],['Collocations',l=>!l.practiceOnly&&l.category==='collocations',[20,80,220,450]],['Idioms / fixed expressions',l=>!l.practiceOnly&&l.category==='idioms',[5,20,60,130]],['Grammar units',l=>l.category==='grammar',[20,40,65,90]],['Sentence formulas',l=>l.category==='sentence-patterns',[15,35,65,100]],['Dialogues',l=>l.category==='conversations',[20,50,100,170]],['Speaking topics',l=>l.category==='speaking',[10,25,50,85]],['Writing tasks',l=>l.category==='writing',[10,30,65,110]],['Listening tasks (browser voice)',l=>l.category==='listening',[25,65,125,205]],['Reading passages',l=>l.category==='reading',[20,55,110,180]],['Pronunciation topics',l=>l.category==='pronunciation',[8,15,23,30]]];
const count=(filter,i,unique)=>{const set=lessons.filter(l=>data.levels.indexOf(l.level)<=i&&filter(l));return unique?new Set(set.map(l=>l.lexicalKey)).size:set.length;};
const audit=['# English curriculum coverage','','Format: short Tamil meaning, English meaning, formula where useful, bilingual example. Core authored verbs have present/past/future examples; expanded entries use concise sourced examples. Practice and writing are optional expandable sections.','',lessons.length+' unique lessons; 4,500 unique vocabulary items. All 90 grammar units and 100 sentence formulas are authored. Vocabulary reaches the cumulative 500 / 1,200 / 2,500 / 4,500 targets. Other numerical skill/category targets are reported separately below.','','The following cells show **authored cumulative count / original cumulative target**. Vocabulary counts include lexical categories and deduplicate identical headwords across categories. A word with several senses counts once. Irregular verbs reuse verb records.','','| Category | A1 | A2 | B1 | B2 |','|---|---:|---:|---:|---:|',...targetRows.map(([name,filter,targets,unique])=>'| '+name+' | '+data.levels.map((_,i)=>count(filter,i,unique)+' / '+targets[i]).join(' | ')+' |'),'','Original learner-production targets (300–3,800 written sentences and 100–1,100 formed questions) are not supplied content counts. Writing drafts are saved for self-review, but a submitted draft is not automatically treated as a verified original sentence.','','## Verification','','- Content validation: unique IDs, exact grammar/pattern allocations, all level/category combinations, short explanations, bilingual examples, verb forms and tense labels, valid quiz choices, static route coverage.','- Browser checks: every lesson renders, quiz feedback and review, saved drafts/answers/completion, search/filter/pagination, mobile layout/navigation, Java route regression.','- Language QA: original rows are authored; expanded English definitions/examples are adapted from the CC0 TKG learner dictionary and Princeton WordNet 3.0, with their license notices retained. New Tamil translations are machine-assisted, with sample review and explicit corrections. Automated checks do not establish linguistic accuracy. See public/content/english/SOURCES.md.','- Listening: browser speech synthesis when an English voice is available; transcript fallback otherwise. There are no prerecorded audio files.','','## Remaining numerical targets','','The vocabulary target is complete at 4,500 unique lexical items, including words, phrasal verbs and fixed expressions. Entries have real definitions and bilingual examples; spelling variants and repeated senses are not extra items. Other skill/category quotas remain below target where shown. Completion percentages measure this catalog, not certified CEFR attainment. Level allocation is a custom learning order informed by frequency/profile evidence; it is not an official CEFR word classification.',''];
fs.writeFileSync(path.join(root,'docs/ENGLISH-COVERAGE.md'),audit.join('\n'));

// Keep provenance hashes and correction counts current when source rows are edited.
const crypto=require('node:crypto');
const manifestPath=path.join(dir,'vocabulary-manifest.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
manifest.entriesSHA256=crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,'vocabulary-expanded.json'))).digest('hex');
manifest.newItems=expansion.length;
manifest.sources=Object.fromEntries([...new Set(expansion.map(x=>x.source))].map(source=>[source,expansion.filter(x=>x.source===source).length]));
manifest.sampleCorrections={shortBeginnerMeanings:shortMeanings.size,sourcedFixedExpressions:expansion.filter(x=>x.pos==='phrase'&&expressionCorrections.has(x.title.toLowerCase())).length,sourcedPhrasalVerbs:expansion.filter(x=>x.pos==='phrv'&&expressionCorrections.has(x.title.toLowerCase())).length};
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');

console.log('Fluency enrichment:',JSON.stringify(fluencySummary));
fs.appendFileSync(path.join(root,'docs/ENGLISH-COVERAGE.md'),'\n## B2 familiarity practice\n\n'+fluencySummary.newUnits+' new practice units and '+fluencySummary.enrichedUnits+' expanded existing units, with '+fluencySummary.authoredExamples+' authored bilingual examples/passages/turns. '+fluencySummary.addedDictionaryExamples+' extra same-sense dictionary examples enrich '+fluencySummary.enrichedWordLessons+' word lessons. Practice units are not added to the 4,500-item lexical count. Additional sourced Tamil examples are machine-assisted; authored practice sets are maintained separately.\n');
