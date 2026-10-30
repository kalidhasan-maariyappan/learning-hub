// Java Core Advanced home page. Section overview pages are defined by the topic files.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, note } = JT.h;
  const esc = JT.esc;
  const overviewSlug = (item) => item.slug;

  JT.def('java_ca_home', {
    title: 'Java Core Advanced',
    h1: 'Java <span>Core Advanced</span>',
    body: () => {
      const sections = JT.coreAdvNav[0].items.filter((item) => item.children);
      return [
        p('Java Core Advanced covers the Java topics that experienced developers use at work and are asked about in senior interviews: JVM internals, collections internals, concurrency, memory and garbage collection, modern Java, diagnostics, design patterns and JDBC.'),
        p('It assumes you know basic Java syntax, classes, collections and exceptions from the <a href="' + JT.url('default') + '">Java Tutorial</a>. Web security is taught in the separate <a href="' + JT.url('security_home') + '">Security course</a>.'),
        h2(sections.length + ' sections'),
        '<div class="card-grid">' + sections.map((item) => '<a class="card" href="' + JT.url(overviewSlug(item)) + '"><b>' + esc(item.title) + '</b><small>' +
          (item.children.length - 1) + ' lessons</small></a>').join('') + '</div>',
        h2('Suggested order'),
        ul(['<strong>Start with:</strong> Object Equality, HashMap Internals, Collections Internals, Exception Handling, Lambdas &amp; Streams.',
          '<strong>Then:</strong> Multithreading Fundamentals, Executors, Locks &amp; Concurrency Utilities, JVM Memory &amp; GC.',
          '<strong>Finally:</strong> JVM &amp; Runtime, Generics, Modern Java, Reflection &amp; Proxies, Performance, Production Diagnostics, Design Patterns &amp; JDBC.']),
        note('Each lesson has a short explanation, a runnable example with its expected output, the key points and a common mistake. Version-specific features are labelled with the Java release that introduced them.'),
      ].join('');
    },
  });
})();
