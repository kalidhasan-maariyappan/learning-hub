const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
 const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(!url.pathname.startsWith('/learning-hub/')){res.writeHead(404).end();return;}
  let file=path.resolve('dist',decodeURIComponent(url.pathname.slice('/learning-hub/'.length)));
  if(!file.startsWith(path.resolve('dist')+path.sep)&&file!==path.resolve('dist')){res.writeHead(403).end();return;}
  try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');const data=fs.readFileSync(file);res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404).end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const root=`http://127.0.0.1:${server.address().port}/learning-hub/`;
 await page.goto(root+'english-learning/');
 await page.waitForFunction(()=>navigator.serviceWorker.controller!==null,{},{timeout:120000});
 await page.getByRole('status').filter({hasText:'Lessons ready offline'}).waitFor({timeout:120000});
 const manifest=await page.evaluate(async()=>{const link=document.querySelector('link[rel=manifest]');return {url:link.href,data:await(await fetch(link.href)).json()};});
 assert.equal(manifest.url,root+'manifest.webmanifest');assert.equal(manifest.data.display,'standalone');
 assert.equal(await page.evaluate(async()=>{const c=await caches.open((await caches.keys())[0]);return (await c.keys()).length>50;}),true);
 await context.setOffline(true);
 await page.goto(root+'english-learning/B2/reading');await page.locator('#en-topics-items').waitFor();
 await page.reload();await page.locator('#en-topics-items').waitFor();
 await page.goto(root+'spring-boot-crash-course/sbc_63');await page.locator('.sbc-topic').first().waitFor();
 assert.match(await page.locator('h1').innerText(),/AOP Dependencies in Spring Boot 4/);
 assert.match(await page.locator('#main').innerText(),/spring-boot-starter-aspectj/);
 await page.goto(root+'spring-boot-crash-course/sbc_48');await page.locator('.sbc-topic').first().waitFor();
 assert.match(await page.locator('#main').innerText(),/Verified locally with Java 25/);
 await page.goto(root+'java/');await page.locator('#main').waitFor();
 const api=await page.evaluate(async()=>{const r=await fetch('../api/run',{method:'POST',body:'{}'});return {status:r.status,body:await r.json()};});assert.equal(api.status,503);assert.match(api.body.error,/offline/);
 await page.goto(root+'tryit.html?page=java_intro');assert.equal(await page.locator('#run-btn').count(),1);
 assert.deepEqual(errors,[]);
 console.log('PASS: manifest, scoped worker, full lesson cache, offline unseen routes/reload including Spring Boot Crash Course, editor shell, offline API response, no browser errors (GitHub Pages subpath).');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
