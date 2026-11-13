'use strict';
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage(), errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    const base = process.env.COURSE_TEST_BASE || 'http://127.0.0.1:8081';
    await page.goto(base+'/spring-boot-crash-course/');
    await page.waitForSelector('.sbc-catalog');
    assert.equal(await page.locator('.sbc-catalog li').count(),63);
    assert.equal(await page.locator('#sidebar a').count(),64);
    assert.match(await page.locator('h1').innerText(),/Spring Boot Crash Course/);
    const titles = await page.evaluate(()=>JT.bootCrashCatalog.map(l=>[l.slug,l.title]));
    // Visit every real direct URL, not just the data registrations.
    for (const [slug,title] of titles) {
      await page.goto(base+'/spring-boot-crash-course/'+slug);
      await page.waitForSelector('.sbc-provenance');
      assert.equal(await page.locator('h1').innerText(),title.replace(/\s+/g,' '));
      assert.ok(await page.locator('.sbc-topic').count()>=4,'Missing teaching sections in '+slug);
      assert.equal(await page.locator('.sbc-topics').count(),0,'Unwanted outline links');
      assert.equal(await page.locator('.sbc-compact').count(),1,'Missing compact lesson layout');
      assert.doesNotMatch(await page.locator('#main').innerText(),/awaiting its teaching rewrite/);
      assert.equal(await page.locator('#sidebar a.active').count(),1);
    }
    await page.goto(base+'/spring-boot-crash-course/sbc_48');
    const section = page.locator('.nextprev').first();
    assert.match(await section.locator('a').first().getAttribute('href'),/sbc_47$/);
    assert.match(await section.locator('a').last().getAttribute('href'),/sbc_49$/);
    const eventCopy=page.locator('.example').filter({has:page.locator('h3', {hasText:'src/main/java/com/codesnippet/course/lesson48/event/OrderCreatedEvent.java'})}).locator('[data-sbc-copy]');
    await eventCopy.click();
    await page.waitForFunction(()=>[...document.querySelectorAll('[data-sbc-copy]')].some(b=>b.textContent==='Copied'));
    assert.equal(await eventCopy.innerText(),'Copied');
    assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/OrderCreatedEvent/);
    await page.locator('#search').fill('Lombok');
    await page.waitForSelector('#search-results a');
    const results = await page.locator('#search-results a').evaluateAll(links=>links.map(a=>a.pathname));
    assert.ok(results.length>0 && results.every(p=>p.includes('/spring-boot-crash-course/')));
    await page.locator('#search').fill('');
    fs.mkdirSync('.playwright-mcp',{recursive:true});
    await page.goto(base+'/spring-boot-crash-course/sbc_03');
    await page.screenshot({path:'.playwright-mcp/spring-boot-crash-desktop.png'});
    for (const width of [768,390]) {
      await page.setViewportSize({width,height:844});
      for (const [slug] of titles) {
        await page.goto(base+'/spring-boot-crash-course/'+slug);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Horizontal overflow at '+width+'/'+slug);
      }
    }
    await page.locator('#menu-btn').click();
    await page.waitForFunction(()=>document.querySelector('#sidebar').getBoundingClientRect().left>=-1);
    assert.equal(await page.locator('#sidebar a.active').isVisible(),true);
    await page.screenshot({path:'.playwright-mcp/spring-boot-crash-mobile.png'});
    for (const route of ['/java/','/spring/','/spring-boot/','/spring-boot-path/','/rails/']) {
      await page.goto(base+route);
      await page.waitForSelector('h1');
      assert.doesNotMatch(await page.locator('h1').innerText(),/Page not found/);
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: 63 direct lesson URLs with teaching sections, catalog/sidebar, teaching titles, previous/next, scoped search, copy code, all lessons at tablet/mobile widths, mobile menu, existing course smoke checks; no browser errors.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
