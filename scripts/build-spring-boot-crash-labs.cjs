'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),dir=path.join(__dirname,'spring-boot-crash/labs');
const labs=fs.readdirSync(dir).filter(f=>f.endsWith('.cjs')&&f!=='common.cjs').sort().flatMap(f=>require(path.join(dir,f)));
for(const lab of labs)lab.sourceHash=crypto.createHash('sha256').update(JSON.stringify(lab.files)).digest('hex');
const dest=path.join(root,'demo/spring-boot-crash/labs');fs.mkdirSync(dest,{recursive:true});
for(const lab of labs){for(const file of lab.files){const target=path.join(dest,lab.directory,file.path);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,file.text);}}
fs.writeFileSync(path.join(dest,'pom.xml'),`<project xmlns="http://maven.apache.org/POM/4.0.0"><modelVersion>4.0.0</modelVersion><groupId>com.codesnippet.course</groupId><artifactId>crash-course-labs</artifactId><version>1.0.0</version><packaging>pom</packaging><modules>${labs.map(l=>'<module>'+l.directory+'</module>').join('')}</modules></project>\n`);
fs.writeFileSync(path.join(dest,'manifest.json'),JSON.stringify(labs,null,2)+'\n');
console.log('Wrote '+labs.length+' runnable lesson states.');
