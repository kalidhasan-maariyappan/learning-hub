'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {execFileSync,spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),home=process.env.JAVA_RUNNER_HOME||process.env.JAVA_HOME;assert.ok(home,'Set JAVA_RUNNER_HOME');
const tool=name=>path.join(home,'bin',name+(process.platform==='win32'?'.exe':''));
const context={window:{JT:{}}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'public/js/content/spring-boot-crash/tutorials.js'),'utf8'),context);
const pause=ms=>new Promise(r=>setTimeout(r,ms)),reportFile=path.join(root,'docs/SPRING-BOOT-CRASH-VARIANTS-RESULTS.json'),results=fs.existsSync(reportFile)?JSON.parse(fs.readFileSync(reportFile,'utf8')):[];
const selected=process.argv.slice(2).map(Number);
(async()=>{for(const [n,heading]of [[3,'First, follow a simple string response'],[8,'InitializingBean and DisposableBean'],[9,'Singleton is the default'],[21,'Use Lombok @Slf4j as an alternative']].filter(([n])=>!selected.length||selected.includes(n))){
 const tutorial=context.window.JT.bootCrashTutorials.find(t=>t.number===n),section=tutorial.sections.find(s=>s.heading===heading),codes=section.files?section.files.map(f=>f.text):[section.code.text],code=codes.join('\n');
 const state='lesson-'+String(n).padStart(2,'0');
 const project=path.join(root,'demo/spring-boot-crash/labs',state),cache=path.join(root,'.cache','spring-boot-variants',state);
 fs.mkdirSync(cache,{recursive:true});execFileSync(tool('jar'),['-xf',path.join(project,'target',state+'-1.0.0.jar'),'BOOT-INF/lib'],{cwd:cache,windowsHide:true});
 const classes=path.join(cache,'classes');fs.cpSync(path.join(project,'target/classes'),classes,{recursive:true});
 const sources=codes.map(text=>{const name=/public class (\w+)/.exec(text)[1];const source=path.join(cache,name+'.java');fs.writeFileSync(source,text);return source;});
 const classpath=classes+path.delimiter+path.join(cache,'BOOT-INF/lib/*');
 execFileSync(tool('javac'),['--release','25','-proc:full','-cp',classpath,'-d',classes,...sources],{windowsHide:true,encoding:'utf8'});
 const args=['-cp',classpath,'com.codesnippet.course.lesson'+String(n).padStart(2,'0')+'.Application','--server.address=127.0.0.1','--server.port=0'];
 if(n===8){const output=execFileSync(tool('java'),args,{encoding:'utf8',windowsHide:true,timeout:45000});assert.ok(output.includes('ProductService initialized')&&output.includes('ProductService cleanup'));}
 else{
  const child=spawn(tool('java'),args,{windowsHide:true});let log='',ended=false;child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);child.on('exit',()=>ended=true);
  try{const deadline=Date.now()+60000;while(!/Tomcat started on port (\d+)/.test(log)&&!ended&&Date.now()<deadline)await pause(100);const port=/Tomcat started on port (\d+)/.exec(log)?.[1];assert.ok(port,log);
   if(n===3){const response=await fetch('http://127.0.0.1:'+port+'/api/getEmployee/1');assert.equal(response.status,200);assert.equal(await response.text(),'Chetan');}
   else if(n===9){const first=await(await fetch('http://127.0.0.1:'+port+'/scope')).json();const second=await(await fetch('http://127.0.0.1:'+port+'/scope')).json();assert.equal(first.controllerUser,first.employeeUser);assert.equal(first.controllerUser,second.controllerUser);}
   else{const response=await fetch('http://127.0.0.1:'+port+'/products',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:'Product'})});assert.equal(response.status,200);assert.equal((await response.json()).name,'Product');assert.ok(log.includes('Adding product in DB'));}
  }finally{if(!ended){const end=new Promise(r=>child.once('exit',r));child.kill();await end;}}
 }
 const prior=results.findIndex(r=>r.lesson===n);if(prior>=0)results.splice(prior,1);
 results.push({lesson:n,heading,status:'compiled-and-executed',sourceHash:crypto.createHash('sha256').update(code).digest('hex')});console.log('PASS alternative '+n+': '+heading);
}fs.writeFileSync(reportFile,JSON.stringify(results.sort((a,b)=>a.lesson-b.lesson),null,2)+'\n');})().catch(e=>{console.error(e);process.exitCode=1});
