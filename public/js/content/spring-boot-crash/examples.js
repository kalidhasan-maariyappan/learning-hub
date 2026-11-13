(function () {
  const JT=window.JT, esc=JT.esc;
  function show(code,title,lang) {
    return JT.kit.show(code,esc(title),lang).replace('</pre>','</pre><button class="btn ghost sbc-copy" data-sbc-copy>Copy code</button>');
  }
  JT.bootCrashProject=()=>'<h2>Local event project</h2><p>Run these commands from <code>demo/spring-boot-crash/events/</code>.</p>'+
    show("mvn -B '-Dboot.version=3.5.16' package\njava -jar target/spring-events-demo-1.0.0.jar",'Build and start with the local JDK','text')+
    '<p>Send a POST request to <code>http://localhost:8080/order/1</code>. Expand a file below to study or copy the complete local reconstruction.</p>'+
    (JT.bootCrashEventSources||[]).map(f=>'<details><summary>'+esc(f.name)+'</summary>'+show(f.code,f.name,f.name.endsWith('.java')?'java':'xml')+'</details>').join('')+
    (JT.bootCrashEventResult?'<h3>Verified local output</h3><p>Captured from two real requests. Listener ordering is not asserted.</p><pre class="output">'+esc(JT.bootCrashEventResult.output.join('\n'))+'</pre>':'<p>Local execution has not been verified.</p>');
})();
