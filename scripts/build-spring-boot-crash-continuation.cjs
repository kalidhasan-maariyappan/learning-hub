'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),base=path.join(root,'demo/spring-boot-crash/continuation');
const plans=require('./spring-boot-crash/continuation/lessons.cjs');
const all=[];
function inventory(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['target','data','uploads'].includes(e.name))continue;const f=path.join(dir,e.name);if(e.isDirectory())inventory(f);else all.push(f);}}
inventory(base);
function resolve(module,ref){let target=module,name=ref;if(ref.startsWith('../commerce/')){target='commerce';name=ref.slice(12);}else if(ref.startsWith('../temporal/')){target='temporal';name=ref.slice(12);}else if(ref.startsWith('../')){const file=path.join(base,ref.slice(3));if(fs.existsSync(file))return file;}
 const matches=all.filter(f=>f.startsWith(path.join(base,target)+path.sep)&&f.replaceAll('\\','/').endsWith('/'+name));if(matches.length!==1)throw Error('Unresolved file '+module+' '+ref);return matches[0];}
const groups=[{id:'application',prefix:'sbc_app_',title:'Application Development',home:'sbc_application',module:'commerce',count:17},{id:'distributed',prefix:'sbc_dist_',title:'Distributed Workflows',home:'sbc_distributed',module:'workflow',count:20}];
const lessons=groups.flatMap(g=>plans[g.id].map(([title,intro,sections],i)=>({slug:g.prefix+String(i+1).padStart(2,'0'),number:i+1,group:g.id,title,intro,module:g.module,sections:sections.map(s=>({...s,files:s.files?.map(ref=>{const file=resolve(g.module,ref),text=fs.readFileSync(file,'utf8');return {path:path.relative(base,file).replaceAll('\\','/'),text,sha256:crypto.createHash('sha256').update(text).digest('hex')};})}))})));
for(const g of groups)if(lessons.filter(l=>l.group===g.id).length!==g.count)throw Error('Lesson count '+g.id);
const dest=path.join(root,'public/js/content/spring-boot-crash');
fs.writeFileSync(path.join(dest,'continuation-catalog.js'),'// Generated continuation navigation; original 63 entries remain separate.\nwindow.JT.bootCrashExtensionGroups='+JSON.stringify(groups,null,2)+';\nwindow.JT.bootCrashExtensionCatalog='+JSON.stringify(lessons.map(({sections,intro,...l})=>l),null,2)+';\n');
fs.writeFileSync(path.join(dest,'continuation-data.js'),'// Authored continuation lessons with complete local source files.\nwindow.JT.bootCrashExtensionLessons='+JSON.stringify(lessons,null,2)+';\n');
fs.writeFileSync(path.join(root,'docs/SPRING-BOOT-CRASH-CONTINUATION.json'),JSON.stringify({groups,lessons:lessons.map(l=>({slug:l.slug,title:l.title,files:l.sections.flatMap(s=>s.files||[]).map(({path,sha256})=>({path,sha256}))}))},null,2)+'\n');
console.log('Built 17 application and 20 distributed workflow lessons with complete file references.');
