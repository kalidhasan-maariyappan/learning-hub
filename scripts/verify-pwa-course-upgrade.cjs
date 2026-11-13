// Reproduce an existing installation with the pre-course router cached, then upgrade.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {execFileSync} = require('node:child_process');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname,'..'), publicRoot = path.join(root,'public');
const previous = file => execFileSync('git',['show','HEAD:public/'+file],{cwd:root,encoding:'utf8',maxBuffer:8*1024*1024});
const oldShell = previous('index.html'), oldRouter = previous('js/app.js'), oldWorker = previous('sw.js');
assert.ok(!oldRouter.includes('bootCrashNav'),'Fixture must predate the crash course');
let mode = 'old';
const server = http.createServer((req,res)=> {
  const url = new URL(req.url,'http://localhost');
  let rel = decodeURIComponent(url.pathname).replace(/^\//,'');
  if (!path.extname(rel)) rel = 'index.html';
  const file = path.resolve(publicRoot,rel);
  if (!file.startsWith(publicRoot+path.sep)) {res.writeHead(403).end();return;}
  try {
    let body = fs.readFileSync(file);
    if (rel === 'index.html' && mode === 'old') body = oldShell;
    if (rel === 'index.html' && mode === 'broken') body = body.toString().replace(/app\.js\?v=[^"']+/, 'app.js');
    if (rel === 'js/app.js' && mode === 'old') body = oldRouter;
    if (rel === 'sw.js' && mode !== 'fixed') body = oldWorker;
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png'})[path.extname(file)] || 'application/octet-stream');
    res.end(body);
  } catch {res.writeHead(404).end();}
});
(async()=> {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  try {
    const context = await browser.newContext();
    const page = await context.newPage(), errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.goto(base+'/java/');
    await page.waitForFunction(()=>navigator.serviceWorker.controller!==null,{}, {timeout:120000});
    await page.getByRole('status').filter({hasText:'Lessons ready offline'}).waitFor({timeout:120000});
    mode = 'broken';
    await page.goto(base+'/spring-boot-crash-course/');
    assert.equal(await page.locator('h1').innerText(),'Page not found','Reproduce new shell + old cached router');
    assert.match(await page.locator('#main').innerText(),/no Java lesson/);
    mode = 'fixed';
    await page.reload();
    await page.locator('.sbc-catalog').waitFor();
    assert.equal(await page.locator('.sbc-catalog li').count(),63,'Versioned router recovers under old active worker');
    await page.waitForFunction(async()=>Boolean((await navigator.serviceWorker.getRegistration()).waiting),{}, {timeout:120000});
    await Promise.all([
      page.waitForNavigation({waitUntil:'load'}),
      page.getByRole('button',{name:'Update app',exact:true}).click()
    ]);
    await page.waitForFunction(async()=>!(await navigator.serviceWorker.getRegistration()).waiting);
    await page.locator('.sbc-catalog').waitFor();
    // A stale router in the current cache must not override the online response.
    await page.evaluate(async oldRouter=> {
      const keys = await caches.keys();
      const cache = await caches.open(keys.find(k=>/^learning-hub-v\d+:/.test(k)));
      const url = document.querySelector('script[src*="/js/app.js"]').src;
      await cache.put(url,new Response(oldRouter,{headers:{'Content-Type':'text/javascript'}}));
    },oldRouter);
    await page.reload();
    await page.locator('.sbc-catalog').waitFor();
    await page.waitForFunction(async()=> {
      const cache = await caches.open((await caches.keys()).find(k=>/^learning-hub-v\d+:/.test(k)));
      const response = await cache.match(document.querySelector('script[src*="/js/app.js"]').src);
      return (await response.text()).includes('bootCrashNav');
    });
    await context.setOffline(true);
    await page.goto(base+'/spring-boot-crash-course/sbc_48');
    await page.locator('.sbc-topic').first().waitFor();
    assert.match(await page.locator('h1').innerText(),/Spring Events/);
    assert.deepEqual(errors,[]);
    console.log('PASS: reproduced cached-router failure; recovered with old worker still active; Update app activation; online asset freshness despite stale cache; versioned scripts precached for offline lessons.');
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;server.close();});
