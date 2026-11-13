'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),base=path.join(root,'demo/spring-boot-crash/labs');
const javaHome=process.env.JAVA_RUNNER_HOME||process.env.JAVA_HOME;
const java=javaHome?path.join(javaHome,'bin',process.platform==='win32'?'java.exe':'java'):'java';
const labs=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));
const chosen=process.argv.slice(2).map(Number);const resultsFile=path.join(root,'docs/SPRING-BOOT-CRASH-LABS-RESULTS.json');
const results=fs.existsSync(resultsFile)?JSON.parse(fs.readFileSync(resultsFile,'utf8')):{};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function verify(lab){
 const jar=path.join(base,lab.directory,'target',lab.directory+'-1.0.0.jar');assert.ok(fs.existsSync(jar),'Build '+lab.directory+' first');
 if(lab.external){console.log('EXTERNAL '+lab.number+': '+lab.external);return;}
 const child=spawn(java,['-jar',jar,'--server.address=127.0.0.1','--server.port=0',...(lab.args||[])],{cwd:path.join(base,lab.directory),windowsHide:true});let log='',ended=false;child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);child.on('exit',()=>ended=true);
 try{
  const deadline=Date.now()+90000;while(!/Tomcat started on port (\d+)/.test(log)&&!ended&&Date.now()<deadline)await pause(100);
  if(lab.consoleOnly){while(!ended&&Date.now()<deadline)await pause(100);assert.ok(ended,'Console example did not stop');for(const s of lab.logs||[])assert.ok(log.includes(s),'Missing '+s);}
  else {const port=/Tomcat started on port (\d+)/.exec(log)?.[1];assert.ok(port,'Server did not start: '+log.slice(-6000));let token='',cookie='',lastScope=null,endedSession=false;
   await pause(lab.number>=37&&lab.number<=45?1000:200);
   for(const c of lab.cases){if(c.delay)await pause(c.delay);const headers={...(c.body?{'content-type':'application/json'}:{}),...(cookie?{Cookie:cookie}:{}),...(c.headers||{}),...(c.useToken?{Authorization:'Bearer '+token}:{})};const started=Date.now();const response=await fetch('http://127.0.0.1:'+port+c.path,{method:c.method||'GET',headers,body:c.body?JSON.stringify(c.body):undefined,signal:AbortSignal.timeout(30000)});const body=await response.text();if(c.maxDurationMs)assert.ok(Date.now()-started<c.maxDurationMs,'Async dispatch waited for listener work');const setCookie=response.headers.get('set-cookie');if(setCookie)cookie=setCookie.split(';')[0];assert.equal(response.status,c.status,lab.number+' '+c.path+' '+body);if(c.saveToken){token=JSON.parse(body).token;assert.ok(token?.split('.').length===3);}if(c.json){const json=JSON.parse(body);for(const[k,v]of Object.entries(c.json))assert.deepEqual(json[k],v,c.path+' '+k);for(const k of c.absent||[])assert.ok(!(k in json));}if(c.contains)assert.ok(body.includes(c.contains),body);if(c.bodyText!==undefined)assert.equal(body,c.bodyText);if(lab.number===9&&c.path==='/logout')endedSession=true;if(lab.number===9&&c.path==='/scope'){const value=JSON.parse(body);assert.equal(value.controllerUser,value.employeeUser,'request-scoped user shared within the request');if(lastScope){assert.notEqual(value.controllerUser,lastScope.controllerUser);if(endedSession)assert.notEqual(value.session,lastScope.session);else assert.equal(value.session,lastScope.session);}lastScope=value;endedSession=false;}if(lab.number===54)for(const pair of Object.values(JSON.parse(body)))assert.notEqual(pair[0],pair[1],'Deferred lookup must resolve different target instances');}
   for(const s of lab.logs||[])assert.ok(log.includes(s),'Missing log '+s);
   for(const s of lab.absentLogs||[])assert.ok(!log.includes(s),'Unexpected log '+s);
   for(const [s,count]of Object.entries(lab.logsCount||{}))assert.equal(log.split(s).length-1,count,'Log count for '+s);
  }
  results[lab.number]={status:'passed',sourceHash:lab.sourceHash,java:'25',boot:/:: Spring Boot ::\s+\(v([^)]+)\)/.exec(log)?.[1]||lab.bootVersion||'3.5.16',requests:lab.cases.length,checks:lab.cases.map(c=>(c.method||'GET')+' '+c.path+' → '+c.status),output:log.split(/\r?\n/).filter(l=>!(l.includes(' INFO ')||l.includes(' WARN ')||l.includes('DEBUG'))&&l.trim()).slice(-25)};
  fs.writeFileSync(resultsFile,JSON.stringify(results,null,2)+'\n');console.log('PASS lesson '+lab.number+' '+lab.name+' ('+lab.cases.length+' requests)');
 }finally{if(!ended){const exit=new Promise(r=>child.once('exit',r));child.kill();await exit;}}
}
(async()=>{for(const lab of labs.filter(l=>!chosen.length||chosen.includes(l.number)))await verify(lab);})().catch(e=>{console.error(e);process.exitCode=1});
