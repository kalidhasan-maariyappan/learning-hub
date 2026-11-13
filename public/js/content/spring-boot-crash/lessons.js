(function () {
  'use strict';
  const JT = window.JT, esc = JT.esc, catalog = JT.bootCrashCatalog;
  const tutorials = new Map(JT.bootCrashTutorials.map(t=>[t.number,t]));
  const paragraph = text => '<p>'+esc(text)+'</p>';
  const list = (items,ordered=false) => '<'+(ordered?'ol':'ul')+'>'+items.map(t=>'<li>'+esc(t)+'</li>').join('')+'</'+(ordered?'ol':'ul')+'>';
  const filePanels=files=>files.map(f=>'<details class="sbc-file"><summary>'+esc(f.path)+'</summary><div class="example"><h3>'+esc(f.path)+'</h3><pre class="code">'+JT.highlightFor(f.path.endsWith('.java')?'java':f.path.endsWith('.xml')?'xml':'text')(f.text)+'</pre><button class="btn ghost sbc-copy" data-sbc-copy>Copy code</button></div><h3>Follow the code</h3>'+list(f.explain)+'</details>').join('');
  function projectFiles(files,title) {
    return '<section class="sbc-topic"><h2>'+esc(title)+'</h2><p>Create each file in the path shown. Open a file below to read its complete code and walkthrough.</p>'+filePanels(files)+'</section>';
  }
  function section(s,index) {
    let html = '<section class="sbc-topic" id="topic-'+index+'"><h2>'+esc(s.heading)+'</h2>';
    if (s.paragraphs) html += s.paragraphs.map(paragraph).join('');
    if(s.files)html+=filePanels(s.files);
    if (s.roadmap) html += '<ol class="sbc-roadmap" aria-label="Spring Boot learning path">'+s.roadmap.map((step,i)=>'<li><span class="sbc-roadmap-number" aria-hidden="true">'+(i+1)+'</span><div><h3>'+esc(step.title)+'</h3><p class="sbc-roadmap-topics">'+esc(step.topics)+'</p><p>'+esc(step.goal)+'</p></div></li>').join('')+'</ol>';
    if (s.flow) html += '<div class="sbc-flow" aria-label="Request flow">'+s.flow.map((t,i)=> (i?'<span aria-hidden="true">→</span>':'')+'<span class="sbc-flow-step">'+esc(t)+'</span>').join('')+'</div>';
    if (s.table) html += JT.h.table(s.table.head.map(esc),s.table.rows.map(r=>r.map(esc)));
    if (s.list) html += list(s.list);
    if (s.steps) html += list(s.steps,true);
    if (s.code) html += '<div class="example"><h3>'+esc(s.code.title)+'</h3><pre class="code">'+JT.highlightFor(s.code.lang||'java')(s.code.text)+'</pre><button class="btn ghost sbc-copy" data-sbc-copy>Copy code</button></div>';
    if (s.codeNote) html += '<p class="small">'+esc(s.codeNote)+'</p>';
    if (s.explain) html += '<h3>How the example works</h3>'+list(s.explain);
    if (s.result) html += '<h3>'+esc(s.resultLabel||'Expected behavior')+'</h3><pre class="output">'+esc(s.result)+'</pre>';
    if (s.paragraphsAfter) html += s.paragraphsAfter.map(paragraph).join('');
    if (s.note) html += '<div class="note">'+paragraph(s.note)+'</div>';
    html += '</section>';
    if (s.collapsed) return '<details class="sbc-later" id="topic-'+index+'"><summary>'+esc(s.heading)+'</summary>'+html.replace(' id="topic-'+index+'"','')+'</details>';
    return html;
  }
  JT.def('sbc_home',{title:'Spring Boot Crash Course',body:()=>
    '<div class="note"><p>Learn the concepts in order: set up a project, understand Spring’s managed objects, and follow the course through data access, security, and later features.</p></div>'+
    '<p>Each lesson follows one supplied video. Explanations are rewritten as tutorials, with short topic titles and examples drawn from that lesson.</p>'+
    '<p class="small">'+catalog.length+' lessons · Follow the course in order or choose a topic below. Each lesson includes its original video reference.</p>'+
    '<h2>Course lessons</h2><ol class="sbc-catalog">'+catalog.map(l=>'<li><a href="'+JT.url(l.slug)+'">'+esc(l.title)+'</a><span class="small">'+(tutorials.has(l.number)?'Tutorial':'Awaiting tutorial rewrite')+'</span></li>').join('')+'</ol>'
  });
  for (const lesson of catalog) {
    JT.def(lesson.slug,{title:lesson.title,body:()=>{
      const t = tutorials.get(lesson.number);
      let html = '<p class="sbc-position small">Lesson '+lesson.number+' of '+catalog.length+'</p>';
      if (t) {
        html += (t.compact?'<div class="sbc-compact">':'')+'<div class="sbc-intro">'+paragraph(t.intro)+'</div>';
        if(!t.hideOutline) html += '<nav class="sbc-topics" aria-label="On this page"><strong>On this page</strong><ul>'+t.sections.map((s,i)=>'<li><a href="#topic-'+i+'">'+esc(s.heading)+'</a></li>').join('')+'</ul></nav>';
        const runIndex=t.sections.findIndex(s=>s.heading==='Run and test the example');
        html += t.sections.map((s,i)=>i===runIndex?'':section(s,i)).join('');
        if(t.projectFiles?.length)html+=projectFiles(t.projectFiles,'Complete the project files');
        if(t.companionFiles?.length)html+=projectFiles(t.companionFiles,'Create the config-server companion');
        if(runIndex>=0)html+=section(t.sections[runIndex],runIndex);
        if(t.practice?.cases?.length)html+='<section class="sbc-topic"><h2>Try the requests</h2><p>With the application running, send these requests from Postman. Check the status and the fields shown.</p>'+t.practice.cases.map(c=>'<div class="example"><h3>'+esc((c.method||'GET')+' http://localhost:8080'+c.path)+'</h3>'+(c.basicAuth?'<p>In Postman, choose Basic Auth. Username: <code>'+esc(c.basicAuth.username)+'</code>; password: <code>'+esc(c.basicAuth.password)+'</code>.</p>':c.headers?'<pre class="code">'+esc(Object.entries(c.headers).map(([k,v])=>k+': '+v).join('\n'))+'</pre>':'')+(c.saveToken?'<p>Copy the value of the response’s <code>token</code> field for the next authenticated requests.</p>':'')+(c.useToken?'<p>Send Authorization: Bearer followed by the token returned by the login request.</p>':'')+(c.body?'<pre class="code">'+JT.highlightFor('text')(JSON.stringify(c.body,null,2))+'</pre>':c.rawBody!==undefined?'<pre class="code">'+esc(c.rawBody)+'</pre>':'')+'<p>Expected status: '+esc(String(c.status))+(c.json?'. Check these response fields: <code>'+esc(JSON.stringify(c.json))+'</code>':c.contains?'. Response includes: <code>'+esc(c.contains)+'</code>':'')+'</p></div>').join('')+'</section>';
        if (t.localProject) html += JT.bootCrashProject();
        if (t.remember?.length) html += '<div class="note sbc-remember"><h2>Remember</h2>'+list(t.remember)+'</div>';
        if(t.compact)html+='</div>';
      } else {
        html += '<div class="note"><p>This chapter is awaiting its teaching rewrite. The earlier caption dump has been removed; this page is not marked complete.</p></div>';
      }
      return html+'<details class="sbc-provenance"><summary>Lesson source and implementation notes</summary>'+paragraph('Video: '+lesson.sourceTitle)+paragraph('Transcript: '+lesson.filename)+(t?.implementationChoices?paragraph(t.implementationChoices):'')+'<p><a href="'+esc(lesson.url)+'" target="_blank" rel="noopener noreferrer">Source video ↗</a> · '+esc(lesson.channel)+'</p></details>';
    }});
  }
  document.addEventListener('click',event=>{
    const topicLink=event.target.closest('.sbc-topics a');
    if(!topicLink)return;
    const topic=document.getElementById(topicLink.hash.slice(1));
    if(topic?.tagName==='DETAILS'){event.preventDefault();event.stopImmediatePropagation();topic.open=true;topic.scrollIntoView();}
  },true);
  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-sbc-copy]');
    if(!button)return;
    try{await navigator.clipboard.writeText(button.closest('.example').querySelector('pre.code').textContent);button.textContent='Copied';}
    catch{button.textContent='Select the code to copy';}
  });
})();
