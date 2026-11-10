// Optional: npm install --no-save playwright, or set PLAYWRIGHT_MODULE.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:8081/english-learning/');
    await page.waitForSelector('.en-card');
    assert.equal(await page.locator('[data-family="interview"]').count(),0);
    assert.equal(await page.locator('.en-category-grid a').count(),21);
    const total = await page.evaluate(()=>JT.englishData.lessons.length);
    assert.equal(total,4823);
    await page.selectOption('#en-level','B2');
    assert.equal(await page.locator('#en-result-count').innerText(),'2113 lessons');
    await page.reload();
    assert.equal(await page.locator('#en-level').inputValue(),'B2');
    for(const [level,target] of [['A1',500],['A2',1200],['B1',2500],['B2',4500]]) {
      await page.goto('http://127.0.0.1:8081/english-learning/'+level+'/vocabulary');
      assert.equal(await page.locator('#en-result-count').innerText(),target+' lessons');
      assert.equal(await page.locator('.en-vocab-summary strong').allTextContents().then(v=>v.join(',')),'500,1,200,2,500,4,500');
    }
    await page.selectOption('#en-category','idioms');
    assert.equal(await page.locator('.en-card').count(),36);
    await page.locator('#en-search').fill('புரிந்துகொள்');
    assert((await page.locator('.en-card').count())>=1);
    await page.getByRole('heading',{name:'read between the lines',exact:true}).click();
    assert.match(await page.locator('h1').innerText(),/read between the lines/);
    await page.goto('http://127.0.0.1:8081/english-learning/A1/verbs/go');
    assert((await page.locator('.en-examples article').count())>=3);
    assert.equal(await page.locator('.en-forms strong').allTextContents().then(x=>x.join(',')),'go,went,gone,going,goes');
    assert.equal(await page.locator('.en-meaning').innerText().then(x=>x.includes('Move to another place.')),true);
    await page.screenshot({path:'.playwright-mcp/english-short-go-desktop.png',fullPage:true});
    await page.goto('http://127.0.0.1:8081/english-learning/A1/grammar/simple-present');
    await page.locator('#practice summary').click();
    for(const [i,value] of [1,0,2,1,2].entries())await page.locator('input[name=q'+i+'][value="'+value+'"]').check();
    await page.getByRole('button',{name:'Check answers'}).click();
    assert.equal(await page.locator('#en-score').innerText(),'5 / 5 correct');
    await page.getByText('Write your own / எழுதிப் பாருங்கள்',{exact:true}).click();
    await page.locator('#en-notes').fill('I learn English every day.');
    await page.locator('#en-complete').click();
    await page.reload();
    assert.equal(await page.locator('#en-notes').inputValue(),'I learn English every day.');
    assert.match(await page.locator('#en-complete').innerText(),/Completed/);
    await page.locator('#practice summary').click();
    assert.equal(await page.locator('input[name=q0][value="1"]').isChecked(),true);
    await page.locator('input[name=q0][value="0"]').check();
    await page.getByRole('button',{name:'Check answers'}).click();
    await page.goto('http://127.0.0.1:8081/english-learning/progress');
    assert.equal(await page.locator('.en-card').filter({hasText:'Simple present positive'}).count(),1);
    // Render every actual lesson through the real shell, catching missing data and bindings.
    const audit=[];
    for(let offset=0;offset<total;offset+=150){
      const failures=await page.evaluate(({offset})=>{
        const failures=[];
        for(const l of JT.englishData.lessons.slice(offset,offset+150)){
          history.replaceState({},'',JT.url('english_'+l.id));
          try{JT.render('english_'+l.id,true);if(document.querySelector('h1')?.textContent!==l.title)failures.push(l.id+': title');if(!document.querySelector('#en-quiz')||!document.querySelector('#en-complete'))failures.push(l.id+': controls');if(document.querySelector('#main').textContent.includes('undefined'))failures.push(l.id+': undefined');}
          catch(e){failures.push(l.id+': '+e.message);}
        }
        return failures;
      },{offset});
      audit.push(...failures);
      if(offset%750===0)console.log('Rendered '+Math.min(offset+150,total)+' / '+total+' lessons');
    }
    assert.deepEqual(audit,[]);
    await page.goto('http://127.0.0.1:8081/english-learning/A1/vocabulary');
    await page.locator('#en-search').fill('apple');
    await page.locator('.en-card').filter({hasText:'apple'}).first().click();
    assert.match(await page.locator('.en-meaning').innerText(),/ஆப்பிள்/);
    assert.match(await page.locator('.en-source').innerText(),/machine-assisted/);
    await page.reload();
    assert.equal(await page.locator('h1').innerText(),'apple');
    await page.goto('http://127.0.0.1:8081/english-learning/A1/sentence-patterns');
    assert.equal(await page.locator('.en-card').count(),15);
    await page.goto('http://127.0.0.1:8081/english-learning/A1/');
    assert.equal(await page.locator('.en-card').count(),36);
    const firstTitle=await page.locator('.en-card h3').first().innerText();
    await page.getByRole('button',{name:'Next page',exact:true}).click();
    assert.equal(await page.locator('.en-card').count(),36);
    assert.notEqual(await page.locator('.en-card h3').first().innerText(),firstTitle);
    assert.match(page.url(),/page=2/);
    await page.locator('#en-search').fill('zzzz');
    assert.equal(await page.locator('.en-card').count(),0);
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:8081/english-learning/A1/verbs/go');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:'.playwright-mcp/english-short-go-mobile.png',fullPage:true});
    await page.locator('#menu-btn').click();
    assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('nav-open')),true);
    await page.selectOption('#en-level','A2');
    assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('nav-open')),false);
    await page.goto('http://127.0.0.1:8081/english-learning/A1/listening/listen-a-time');
    await page.waitForTimeout(300);
    const voice=await page.locator('#en-listen').innerText();
    assert(/Listen|unavailable/i.test(voice));
    if(voice.includes('Listen'))await page.locator('#en-listen').click();
    await page.goto('http://127.0.0.1:8081/java/');
    assert.match(await page.locator('h1').innerText(),/Java/);
    assert.deepEqual(errors,[]);
    console.log('PASS: '+total+' lessons render; concise verb examples; category counts/search/pagination; quiz grading/review; drafts/completion survive refresh; mobile layout/navigation; voice fallback; Java regression; no browser errors.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});

