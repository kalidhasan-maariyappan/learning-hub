'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,execFileSync}=require('node:child_process');const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),base=path.join(root,'demo/spring-boot-crash/labs');
const manifest=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));
const javaHome=process.env.JAVA_RUNNER_HOME||process.env.JAVA_HOME;
assert.ok(javaHome,'Set JAVA_RUNNER_HOME to the installed Java 25 home');
const java=path.join(javaHome,'bin',process.platform==='win32'?'java.exe':'java');
const pause=ms=>new Promise(r=>setTimeout(r,ms));const children=[];
async function start(directory,args){
 const child=spawn(java,['-jar',path.join(base,directory,'target',directory+'-1.0.0.jar'),'--server.address=127.0.0.1','--server.port=0',...args],{cwd:path.join(base,directory),windowsHide:true});
 const state={child,log:'',ended:false};children.push(state);child.stdout.on('data',d=>state.log+=d);child.stderr.on('data',d=>state.log+=d);child.on('exit',()=>state.ended=true);
 const deadline=Date.now()+90000;while(!/Tomcat started on port (\d+)/.test(state.log)&&!state.ended&&Date.now()<deadline)await pause(100);
 const port=/Tomcat started on port (\d+)/.exec(state.log)?.[1];assert.ok(port,state.log.slice(-7000));return 'http://127.0.0.1:'+port;
}
(async()=>{try{
 const fixture=path.join(root,'.cache','spring-boot-config-'+Date.now());fs.mkdirSync(fixture,{recursive:true});
 const git=args=>execFileSync('git',['-C',fixture,...args],{encoding:'utf8',windowsHide:true});
 git(['init','-b','main']);fs.writeFileSync(path.join(fixture,'application.properties'),'app.name=Common value\n');fs.writeFileSync(path.join(fixture,'application-dev.properties'),'app.name=Before refresh\n');
 const commit=()=>{git(['add','application.properties','application-dev.properties']);git(['-c','user.name=Learning Hub Demo','-c','user.email=demo@example.test','commit','-m','Local configuration fixture']);};commit();
 const server=await start('config-server',['--spring.cloud.config.server.git.uri='+pathToFileURL(fixture).href]);
 const serverResponse=await fetch(server+'/application/dev',{signal:AbortSignal.timeout(30000)});assert.equal(serverResponse.status,200);assert.ok((await serverResponse.text()).includes('Before refresh'));
 const client=await start('lesson-51',['--spring.config.import=configserver:'+server]);
 const read=async()=>{const response=await fetch(client+'/config',{signal:AbortSignal.timeout(30000)});assert.equal(response.status,200);return response.text();};
 assert.equal(await read(),'Before refresh');
 fs.writeFileSync(path.join(fixture,'application-dev.properties'),'app.name=After refresh\n');commit();
 assert.equal(await read(),'Before refresh','existing bean should remain stale before refresh');
 const refresh=await fetch(client+'/actuator/refresh',{method:'POST',signal:AbortSignal.timeout(30000)});assert.equal(refresh.status,200);assert.equal(await read(),'After refresh');
 const resultPath=path.join(root,'docs/SPRING-BOOT-CRASH-LABS-RESULTS.json');const results=JSON.parse(fs.readFileSync(resultPath,'utf8'));
 for(const n of [51,151])results[n]={status:'passed',sourceHash:manifest.find(l=>l.number===n).sourceHash,java:'25',boot:'3.5.16',requests:n===51?4:1,checks:n===51?['GET /config loads development value','GET /config stays unchanged before refresh','POST /actuator/refresh returns 200','GET /config returns updated value']:['GET /application/dev reads committed Git configuration'],output:['Before refresh','After refresh']};
 fs.writeFileSync(resultPath,JSON.stringify(results,null,2)+'\n');console.log('PASS: real Git-backed config server/client, initial profile, stale bean before refresh, actuator refresh and updated bean.');
 }finally{for(const state of children.reverse())if(!state.ended){const end=new Promise(r=>state.child.once('exit',r));state.child.kill();await end;}}
})().catch(e=>{console.error(e);process.exitCode=1});
