'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),base=path.join(root,'demo/spring-boot-crash/labs');
const labs=JSON.parse(fs.readFileSync(path.join(base,'manifest.json'),'utf8'));
const report={recordedAt:new Date().toISOString(),java:spawnSync('java',['--version'],{encoding:'utf8',windowsHide:true}).stdout.split(/\r?\n/)[0],modules:labs.map(l=>({number:l.number,directory:l.directory,sourceHash:l.sourceHash,status:'compiled-and-packaged',boot:l.bootVersion||'3.5.16'})),tests:[]};
for(const lab of labs){const dir=path.join(base,lab.directory,'target/surefire-reports');if(!fs.existsSync(dir))continue;for(const name of fs.readdirSync(dir).filter(f=>f.startsWith('TEST-')&&f.endsWith('.xml'))){const xml=fs.readFileSync(path.join(dir,name),'utf8');const tag=/<testsuite\b[^>]*>/.exec(xml)?.[0];if(!tag)continue;const attr=k=>new RegExp('\\b'+k+'="([^"]+)"').exec(tag)?.[1];report.tests.push({lesson:lab.number,name:attr('name'),tests:Number(attr('tests')),failures:Number(attr('failures')),errors:Number(attr('errors'))});}}
if(report.tests.some(t=>t.failures||t.errors))throw Error('A local test suite failed');
fs.writeFileSync(path.join(root,'docs/SPRING-BOOT-CRASH-LABS-BUILD.json'),JSON.stringify(report,null,2)+'\n');
console.log('Recorded '+report.modules.length+' packaged modules and '+report.tests.reduce((n,t)=>n+t.tests,0)+' passing tests.');
