(function () {
  'use strict';
  const JT = window.JT;
  JT.bootCrashNav = [{title: 'Spring Boot Crash Course', items: [
    {slug: 'sbc_home', title: 'Spring Boot Crash Course'},
    ...JT.bootCrashCatalog.map(l => ({slug: l.slug, title: l.number + '. ' + l.title}))
  ]}];
  JT.bootCrashOrder = JT.bootCrashNav[0].items.map(i => i.slug);
  for (const item of JT.bootCrashNav[0].items) {
    const lesson = JT.bootCrashCatalog.find(l => l.slug === item.slug);
    const title = lesson ? lesson.title : item.title;
    JT.navInfo[item.slug] = {title, heading: title, fullTitle: title, group: 'Spring Boot Crash Course', parent: item};
  }
})();
