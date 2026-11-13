'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {spawn, spawnSync} = require('node:child_process');
const root = path.resolve(__dirname,'..');
const javaHome = process.env.JAVA_RUNNER_HOME || process.env.JAVA_HOME;
const java = javaHome ? path.join(javaHome,'bin',process.platform === 'win32' ? 'java.exe' : 'java') : 'java';
const version = spawnSync(java,['--version'],{encoding:'utf8',windowsHide:true});
assert.match(version.stdout,/\b25\./,'This course verification requires the installed Java 25');
const jar = path.join(root,'demo/spring-boot-crash/events/target/spring-events-demo-1.0.0.jar');
assert.ok(fs.existsSync(jar),'Package the event project first; see its README');
const child = spawn(java,['-jar',jar,'--server.address=127.0.0.1','--server.port=0'],{windowsHide:true,stdio:['ignore','pipe','pipe']});
let logs = '', exited = false;
child.stdout.on('data',data => { logs += data; });
child.stderr.on('data',data => { logs += data; });
child.on('exit',()=> { exited = true; });
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
async function until(check, message) {
  const deadline = Date.now()+45000;
  while (Date.now()<deadline) {
    if (check()) return;
    if (exited) throw new Error('Application exited before ' + message + '\n' + logs);
    await delay(100);
  }
  throw new Error('Timed out: ' + message + '\n' + logs);
}
(async () => {
  try {
    await until(()=> /Tomcat started on port (\d+)/.test(logs),'HTTP startup');
    const port = /Tomcat started on port (\d+)/.exec(logs)[1];
    for (const id of ['1','2']) {
      const response = await fetch(`http://127.0.0.1:${port}/order/${id}`,{method:'POST',signal:AbortSignal.timeout(10000)});
      assert.equal(response.status,200);
      await until(()=> ['Order created for order ID ','Sending email for order ','Order placed for order ID '].every(s=>logs.includes(s+id)), 'publisher and both listeners for order '+id);
    }
    assert.doesNotMatch(logs,/APPLICATION FAILED TO START|Exception in thread/);
    const result = {jdk:version.stdout.split(/\r?\n/)[0], bootVersion:/:: Spring Boot ::\s+\(v([^)]+)\)/.exec(logs)?.[1] || 'not captured',
      requests:2, status:'passed', assertions:['POST /order/1 returns 200','POST /order/2 returns 200','Order service publishes both IDs','Email listener receives both IDs','Logging listener receives both IDs'],
      output: logs.split(/\r?\n/).filter(l=> /^(Order created for|Sending email for|Order placed for)/.test(l))};
    fs.writeFileSync(path.join(root,'docs/SPRING-BOOT-CRASH-EVENTS-RESULT.json'),JSON.stringify(result,null,2)+'\n');
    console.log(JSON.stringify(result,null,2));
  } finally {
    if (!exited) {
      const stopped = new Promise(resolve => child.once('exit',resolve));
      child.kill();
      await stopped;
    }
  }
})().catch(error => {console.error(error);process.exitCode=1;});
