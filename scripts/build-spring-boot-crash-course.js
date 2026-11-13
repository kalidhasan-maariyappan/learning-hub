// Preserve the supplied captions without using external course material.
// This importer proves textual coverage; it does not claim semantic/code review.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'bootcamp-springboot');
const teachingDir = path.join(__dirname,'spring-boot-crash');
const teachingTitles = require('./spring-boot-crash/titles.cjs');
let tutorials = fs.readdirSync(teachingDir).filter(f=>/^\d.*\.cjs$/.test(f)).sort().flatMap(f=>require(path.join(teachingDir,f))).sort((a,b)=>a.number-b.number);
const rewriteDir=path.join(teachingDir,'teaching');
const rewrites=fs.existsSync(rewriteDir)?fs.readdirSync(rewriteDir).filter(f=>f.endsWith('.cjs')).sort().flatMap(f=>require(path.join(rewriteDir,f))):[];
if(new Set(rewrites.map(t=>t.number)).size!==rewrites.length)throw Error('Duplicate teaching rewrite');
const labsPath=path.join(root,'demo/spring-boot-crash/labs/manifest.json');
const labs=fs.existsSync(labsPath)?JSON.parse(fs.readFileSync(labsPath,'utf8')):[];
const resultsPath=path.join(root,'docs/SPRING-BOOT-CRASH-LABS-RESULTS.json');
const labResults=fs.existsSync(resultsPath)?JSON.parse(fs.readFileSync(resultsPath,'utf8')):{};
const fileGuide=require('./spring-boot-crash/file-guides.cjs');
const debugging=require('./spring-boot-crash/debugging.cjs');
const alignCode=require('./spring-boot-crash/code-examples.cjs');
const practiceRefs={49:48,53:52,57:56,59:41};
function projectTree(lab){const tree={};for(const file of lab.files){let node=tree;for(const part of file.path.split('/'))node=node[part]??={};}const lines=[lab.directory+'/'];function walk(node,prefix){const entries=Object.entries(node);entries.forEach(([name,child],i)=>{const last=i===entries.length-1;let label=name;while(Object.keys(child).length===1){const [next,value]=Object.entries(child)[0];if(!Object.keys(value).length)break;label+='/'+next;child=value;}const directory=Object.keys(child).length>0;lines.push(prefix+(last?'└── ':'├── ')+label+(directory?'/':''));if(directory)walk(child,prefix+(last?'    ':'│   '));});}walk(tree,'');return lines.join('\n');}
tutorials=tutorials.map(original=>{
  const rewrite=rewrites.find(t=>t.number===original.number);
  const t={...original,...rewrite,compact:true,hideOutline:true};
  if(rewrite)t.evidence=original.evidence+' Instructor-style implementation review: '+(rewrite.evidence||'full concept introduction, source example, file steps, code walkthrough and execution.');
  const lab=labs.find(l=>l.number===(practiceRefs[t.number]||t.number));
  t.sections=t.sections.map(s=>{
    if(!s.labFile)return s;
    if(!lab)throw Error('No lab for '+t.number);
    const f=lab.files.find(f=>f.path.endsWith(s.labFile));
    if(!f)throw Error('Missing file '+t.number+': '+s.labFile);
    return {...s,code:{title:f.path,lang:f.path.endsWith('.java')?'java':f.path.endsWith('.xml')?'xml':'text',text:f.text}};
  });
  if(t.number===23)t.sections=t.sections.map(s=>s.heading==='JUnit test lifecycle'?{...s,paragraphs:['The all-test callbacks run once. In the supplied four-test class, per-test callbacks run four times. Running one selected test executes its per-test callbacks once.']}:s);
  if(t.number===20)t.sections=t.sections.map(s=>s.heading==='Expose the endpoints for the tour'?{...s,paragraphs:[...(s.paragraphs||[]),'For the local Boot 3.5.16 state, use management.endpoint.shutdown.access=unrestricted in place of the older management.endpoint.shutdown.enabled setting before trying shutdown. These two settings cannot be combined. Available diagnostic endpoints depend on the components configured in the application.']}:s);
  if(t.number===30)t.sections=t.sections.map(s=>({...s,paragraphs:s.paragraphs?.map(p=>p.replace(/\bApplication\b/g,'JobApplication')),code:s.code?.lang==='java'&&!s.labFile?{...s.code,text:s.code.text.replace(/\bApplication\b/g,'JobApplication')}:s.code}));
  if(t.number===19)t.sections=t.sections.map(s=>({...s,...({'Dirty reads':{flow:['A changes a book','A has not committed','B reads the changed value','A may roll back the change']},'Non-repeatable reads':{flow:['A reads book 1','B updates and commits book 1','A reads book 1 again','The value has changed']},'Phantom reads':{flow:['A queries price < 100','B inserts a book priced at 50','A repeats the query','A new matching row appears']}}[s.heading]||{})}));
  if(t.number===40)t.sections=t.sections.map(s=>s.heading==='Resolve the lifetime wording'?{...s,heading:'Choose the token lifetime',paragraphs:['The complete local example uses one hour: 60 × 60 × 1000 milliseconds are added to the current time before constructing the expiration Date.','Keep the configured value and its unit clear. The source description uses conflicting duration wording, so this local duration is explicit rather than claimed as an exact recovered setting.']}:{...s,paragraphs:s.paragraphs?.map(p=>p.replaceAll('AuthRequest','LoginRequest').replaceAll('/authenticate','/api/auth/login'))});
  if(t.number===47)t.sections.push({heading:'Try the provider login',steps:['Set the client ID and secret before starting the application.','Open http://localhost:8080/public to check the public endpoint.','Open http://localhost:8080/profile and follow the Google login flow.','After the provider returns to the registered callback, request /profile again and inspect the authenticated principal attributes.'],paragraphs:['The returned attributes depend on your provider account and granted scopes. There is no fixed invented user profile to paste as an expected response.']});
  if(t.number===3){const files=require('./spring-boot-crash/employee-start.cjs');t.sections.splice(2,0,{heading:'First, follow a simple string response',paragraphs:['Before adding an entity and DTO, let’s watch one value travel through the three layers. Use these string-returning versions of the repository, service, and controller first.','The starter files are also in demo/spring-boot-crash/labs/lesson-03/alternatives/strings/. Copy them over the corresponding three files in lesson-03, run the application, and request /api/getEmployee/1. Then continue below with the entity/DTO versions.'],files,code:{title:'Rebuild and start the string-response phase',lang:'text',text:'mvn -B package\njava -jar target/lesson-03-1.0.0.jar'},result:'Chetan',resultLabel:'Expected plain-text response',flow:['Request with id 1','Controller','Service','Repository returns Chetan','String returns to the browser']});for(const f of files){const dest=path.join(root,'demo/spring-boot-crash/labs/lesson-03/alternatives/strings',f.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,f.text);}}
  if(lab){
    t.localProject=false;
    t.sections=alignCode(t,lab);
    if(t.number===28)t.sections=t.sections.map(s=>s.heading==='A custom query with @Query and @Param'?{...s,code:{title:'ApplicantRepository.java — query method inside the interface',lang:'java',text:'@Query("select a from Applicant a where lower(a.name) like lower(concat(\'%\', :name, \'%\'))")\nList<Applicant> findApplicantsByPartialName(@Param("name") String name);'},codeNote:'The complete interface below supplies the imports. This JPQL completes the partial-name lookup described in the source.'}:s);
    if(t.number===7)t.sections=t.sections.map(s=>s.code?{...s,code:{...s.code,text:s.code.text.replaceAll('com.codesnippet.ecomassistant','com.codesnippet.course.assistant07').replaceAll('com.codesnippet.ecom','com.codesnippet.course.lesson07')}}:s);
    t.sections=t.sections.map(s=>s.code?{...s,code:{...s.code,text:s.code.text.replaceAll('com.codesnippet.ecom.', 'com.codesnippet.course.lesson'+String(lab.number).padStart(2,'0')+'.')}}:s);
    if(t.number===35)t.sections=t.sections.map(s=>s.code&&!s.labFile?{...s,code:{...s.code,text:s.code.text.replaceAll('scheduledTask','task').replaceAll('taskScheduler','scheduler').replaceAll('orderScheduler','orders').replaceAll('cronExpression','expression')}}:s);
    const verified=labResults[lab.number]?.sourceHash===lab.sourceHash&&labResults[lab.number]?.status==='passed';
    t.practice={directory:'demo/spring-boot-crash/labs/'+lab.directory,sourceHash:lab.sourceHash,verified,external:verified?null:lab.external||null,bootVersion:lab.bootVersion||'3.5.16',sourceLesson:lab.number};
    const inlineFiles=new Set(t.sections.filter(s=>s.labFile).map(s=>s.labFile));
    t.projectFiles=lab.files.filter(f=>![...inlineFiles].some(suffix=>f.path.endsWith(suffix))).map(f=>({...f,explain:fileGuide(f)}));
    if(t.number===51){const server=labs.find(l=>l.number===151);if(server)t.companionFiles=server.files.map(f=>({...f,path:'../config-server/'+f.path,explain:fileGuide(f)}));}
    if(t.number>4)t.sections.splice(1,0,{heading:'Prepare the example project',paragraphs:['We will use '+t.practice.directory+'. Open its pom.xml in IntelliJ IDEA, or create a project with the dependencies in that POM and copy the files into the shown packages.',practiceRefs[t.number]?'Continue with the project from Lesson '+lab.number+'. We are inspecting that existing implementation rather than starting an unrelated application.':'This folder is the lesson’s project state. You can open it separately or continue your earlier project. When continuing one project, keep its base package and adjust the imports consistently; lesson-numbered packages only separate the supplied states.'],code:{title:'Files to create in this lesson state',lang:'text',text:projectTree(lab)}});
    if(t.number===51)t.sections.push({heading:'Start the Git-backed config server',paragraphs:['For local practice, use the supplied configuration files in a local Git repository. This still uses the Git backend taught here. You can later replace the URI with your Git remote.','Run these commands from the lesson-51 folder. The commit uses a demo identity only for this local fixture; it changes no global Git settings. Leave this server terminal running, then start the client in another terminal.'],code:{title:'PowerShell — prepare the Git repository and start the companion',lang:'text',text:'Set-Location configuration-repository\ngit init -b main\ngit add application.properties application-dev.properties\ngit -c user.name="Learning Hub Demo" -c user.email="demo@example.test" commit -m "Add configuration"\n$env:CONFIG_GIT_URI = ([System.Uri]("file:///" + (Get-Location).Path.Replace([char]92, [char]47))).AbsoluteUri\nSet-Location ../../config-server\nmvn -B package\njava -jar target/config-server-1.0.0.jar'},paragraphsAfter:['Request http://localhost:8888/application/dev to inspect the server values. After starting the client, request /config. Commit a changed app.name value, POST to the client’s /actuator/refresh, then request /config again.']});
    const commands=t.number===60?'mvn -B package\ndocker compose up --build':(t.number===47?'$env:GOOGLE_CLIENT_ID = "<your-client-id>"\n$env:GOOGLE_CLIENT_SECRET = "<your-client-secret>"\n':'')+'mvn -B package\njava -jar target/'+lab.directory+'-1.0.0.jar';
    t.sections.push({heading:'Run and test the example',paragraphs:[...(lab.external?[lab.external]:[]),'Open a terminal in '+t.practice.directory+' and build the project. Then start the application. For ordinary local Java runs, you can also run Application.main from IntelliJ IDEA.','Use Java 25. This local state selects Spring Boot '+t.practice.bootVersion+' explicitly; supporting imports, accessors and configuration complete the source example.'],code:{title:'PowerShell — from the lesson folder',lang:'text',text:commands},...(verified?{result:labResults[lab.number].checks.length?labResults[lab.number].checks.join('\n'):labResults[lab.number].output.join('\n'),resultLabel:'Verified locally with Java 25'}:{})});
    t.practice.cases=lab.cases.map(c=>{if(!c.headers?.Authorization?.startsWith('Basic '))return c;const decoded=Buffer.from(c.headers.Authorization.slice(6),'base64').toString('utf8');const at=decoded.indexOf(':');return {...c,basicAuth:{username:decoded.slice(0,at),password:decoded.slice(at+1)}};});
    t.implementationChoices=lab.choices||'Package names, imports, accessor bodies and minimal application setup complete the described example. They are not claimed to be the exact original source.';
  }
  t.sourceNotes=[];
  if(debugging[t.number])t.sections.splice(t.sections.findIndex(s=>s.heading==='Run and test the example'),0,{heading:'Follow it in the debugger',steps:debugging[t.number]});
  t.sections=t.sections.map(s=>{
    const o={...s};
    if(o.note&&/caption|transcript|not.*(?:executed|complete|runnable)|fragments.*reconstruct|no.*(?:project|application).*run/i.test(o.note)){t.sourceNotes.push(o.note);delete o.note;}
    if(o.codeNote&&/caption|transcript|spoken|instructor|reconstruct|not.*(?:run|execut)/i.test(o.codeNote)){t.sourceNotes.push(o.codeNote);delete o.codeNote;}
    return o;
  });
  return t;
});
if (new Set(tutorials.map(t=>t.number)).size !== tutorials.length) throw new Error('Duplicate authored tutorial');
if (tutorials.length !== 63 || tutorials.some((t,i)=>t.number!==i+1 || t.title!==teachingTitles[i])) throw new Error('Expected 63 ordered, titled teaching chapters');
const files = fs.readdirSync(source).filter(f => /^\d+\..*\.md$/.test(f)).sort((a,b) => parseInt(a)-parseInt(b));
const lessons = files.map(filename => {
  const raw = fs.readFileSync(path.join(source, filename), 'utf8');
  const title = /^# Video transcript: (.+)$/m.exec(raw)?.[1].trim();
  const body = raw.split(/^## Transcript\s*$/m)[1]?.trim();
  const meta = key => new RegExp('^- ' + key + ': (.+)$', 'm').exec(raw)?.[1].trim();
  if (!title || !body || !/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/.test(meta('Source'))) throw new Error('Invalid transcript: ' + filename);
  const number = parseInt(filename);
  const paragraphs = body.split(/\r?\n\s*\r?\n/).map(p => p.replace(/\r?\n/g, ' ').trim()).filter(Boolean);
  return { number, slug: 'sbc_' + String(number).padStart(2,'0'), title, filename,
    url: meta('Source'), channel: meta('Channel'), uploaded: meta('Uploaded'), duration: meta('Duration'), language: meta('Language'),
    sha256: crypto.createHash('sha256').update(raw).digest('hex'), paragraphs };
});
if (lessons.length !== 63 || lessons.some((l,i) => l.number !== i+1)) throw new Error('Expected the supplied contiguous 1–63 course order');
const dest = path.join(root, 'public/js/content/spring-boot-crash');
fs.mkdirSync(dest, {recursive:true});
fs.writeFileSync(path.join(dest, 'transcripts.js'), '// Generated by scripts/build-spring-boot-crash-course.js. Source captions, unabridged.\nwindow.JT.bootCrashTranscripts = ' + JSON.stringify(lessons, null, 2) + ';\n');
const catalog = lessons.map(({paragraphs, ...lesson}) => ({...lesson, sourceTitle:lesson.title, title:teachingTitles[lesson.number-1], tutorialStatus:tutorials.some(t=>t.number===lesson.number) ? 'rewritten' : 'pending', paragraphCount: paragraphs.length}));
fs.writeFileSync(path.join(dest, 'catalog.js'), '// Teaching titles with original video titles retained as source metadata; source-owned numeric order.\nwindow.JT.bootCrashCatalog = ' + JSON.stringify(catalog, null, 2) + ';\n');
fs.writeFileSync(path.join(dest,'tutorials.js'),'// Generated from individually authored, source-based teaching chapters.\nwindow.JT.bootCrashTutorials = '+JSON.stringify(tutorials,null,2)+';\n');
const projectRoot = path.join(root,'demo/spring-boot-crash/events');
function sources(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => {
    const file = path.join(dir,e.name);
    if (e.name === 'target') return [];
    if (e.isDirectory()) return sources(file);
    return /\.java$|^pom\.xml$/.test(e.name) ? [{name:path.relative(projectRoot,file).replaceAll('\\','/'),code:fs.readFileSync(file,'utf8')}] : [];
  });
}
const resultPath = path.join(root,'docs/SPRING-BOOT-CRASH-EVENTS-RESULT.json');
fs.writeFileSync(path.join(dest,'event-project.js'), '// Generated from the local demo; never a claim of recovered video code.\nwindow.JT.bootCrashEventSources = '+JSON.stringify(sources(projectRoot),null,2)+';\nwindow.JT.bootCrashEventResult = '+(fs.existsSync(resultPath) ? fs.readFileSync(resultPath,'utf8').trim() : 'null')+';\n');
const manifest = lessons.map(({paragraphs, ...lesson}) => ({...lesson,
  sourceParagraphs: paragraphs.length, sourceWords: paragraphs.join(' ').split(/\s+/).length,
  contentStatus: 'awaiting-teaching-rewrite; source-preserved-internally',
  concepts: [], codeExamples: [], demonstrations: [], java25Changes: [],
  gaps: ['Auto-generated spoken captions are not complete source-code listings. Code and concept inventory requires individual editorial review.']
}));
const event = manifest.find(l => l.number === 48);
Object.assign(manifest.find(l=>l.number===1), {
  contentStatus:'unabridged-caption-reading; roadmap-notes-reviewed',
  concepts:['Spring Boot advantages','Project setup and layered architecture','Maven and Gradle','Annotations','Dependency injection and IoC','Configuration and profiles','Beans, lifecycle and scopes','Data and REST APIs','Security','Logging, exceptions, cache, interceptors and scheduling','JUnit and Mockito','Actuator','Deployment','Microservices and tracing','Spring Cloud Config'],
  gaps:['Roadmap references other videos; no new lessons or runnable programs are inferred from those references.']
});
Object.assign(manifest.find(l=>l.number===2), {
  contentStatus:'unabridged-caption-reading; setup-notes-reviewed',
  concepts:['Spring Initializr','Maven and Java selection','Project metadata','JAR and WAR discussion','Spring Web, JPA and H2','Import pom.xml in IntelliJ','Generated main class and default dependencies','Run application on port 8080'],
  gaps:['Numeric Spring Boot version not named; generated source files and POM are not included. Setup walkthrough retained, but exact project reproduction and Java 25 compatibility are not verified.']
});
Object.assign(event, {
  contentStatus:'unabridged-caption-reading; focused-example-reviewed',
  concepts:['Publisher/subscriber design','Loose coupling and separation of concerns','OrderCreatedEvent','ApplicationEventPublisher.publishEvent','@EventListener','Email and logging subscribers'],
  codeExamples:[{project:'demo/spring-boot-crash/events',sourcePassages:[4,5,6,7,8],status:'reconstructed-from-spoken-description',scaffolding:'Imports, package names, String ID type, controller injection and void response are implementation choices; full listings are absent from captions.'}],
  demonstrations:[{name:'POST order → order-created event → email and logging listeners',status:fs.existsSync(resultPath) ? 'locally-tested; see SPRING-BOOT-CRASH-EVENTS-RESULT.json' : 'not-yet-tested'}],
  java25Changes:['maven.compiler.release=25 instead of instructor Java 17; no new Java language features.'],
  gaps:['Instructor Boot version unnamed; boot.version must be supplied explicitly. Local verification selects cached 3.5.16, not a claimed instructor version.','Exact source listings and HTTP response body absent from captions.']
});
Object.assign(manifest.find(l=>l.number===63), {
  contentStatus:'unabridged-caption-reading; dependency-excerpts-reviewed',
  concepts:['Boot 3.5.4 versus Boot 4.1.1','spring-boot-starter-aop','spring-boot-starter-aspectj','@EnableAspectJAutoProxy','@Aspect'],
  codeExamples:[{name:'Boot 3 AOP starter dependency',sourcePassages:[3]},{name:'Boot 4 AspectJ starter dependency',sourcePassages:[4,5,6]}],
  demonstrations:[], java25Changes:[],
  gaps:['Full logging aspect, advice and pointcut source not present in captions. Dependency snippets are displayed; the video applications were not reproduced or tested.']
});
for (const tutorial of tutorials) {
  const mapped = manifest.find(l=>l.number===tutorial.number);
  if (!mapped) throw new Error('Tutorial has no corresponding transcript: '+tutorial.number);
  mapped.teachingTitle = tutorial.title;
  mapped.contentStatus = 'rewritten-teaching-chapter; source-reviewed; complete-application-tests-not-claimed';
  mapped.concepts = tutorial.sections.map(s=>s.heading);
  mapped.editorialEvidence = tutorial.evidence;
  mapped.teachingMode=tutorial.number===1?'accepted-roadmap-pilot':'guided-concept-and-implementation';
  if(tutorial.practice)mapped.practice=tutorial.practice;
  mapped.projectFiles=(tutorial.projectFiles||[]).map(f=>f.path);
  mapped.gaps = tutorial.sections.flatMap(s=>[s.codeNote,s.note].filter(Boolean));
  mapped.codeExamples = tutorial.sections.filter(s=>s.code).map(s=>({name:s.code.title,status:s.labFile?'complete-project-file; see practice verification':'teaching-excerpt-or-instructions; complete-project-status-recorded-separately'}));
  if (tutorial.localProject) mapped.codeExamples.push({project:'demo/spring-boot-crash/events',status:'locally-tested; see SPRING-BOOT-CRASH-EVENTS-RESULT.json',sourcePassages:[4,5,6,7,8]});
}
fs.writeFileSync(path.join(root,'docs/SPRING-BOOT-CRASH-MAPPING.json'), JSON.stringify(manifest,null,2)+'\n');
console.log(`Imported ${lessons.length} transcripts, ${lessons.reduce((n,l)=>n+l.paragraphs.length,0)} source paragraphs. No captions omitted.`);
