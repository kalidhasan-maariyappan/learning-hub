(function () {
  'use strict';
  const JT = window.JT;
  JT.bootCrashNav = [{title: 'Spring Boot Crash Course', items: [
    {slug: 'sbc_home', title: 'Spring Boot Crash Course'},
    ...JT.bootCrashCatalog.map(l => ({slug: l.slug, title: l.number + '. ' + l.title}))
  ]}];
  for(const group of JT.bootCrashExtensionGroups||[])JT.bootCrashNav.push({title:group.title,items:[{slug:group.home,title:group.title+' ('+group.count+')',children:JT.bootCrashExtensionCatalog.filter(l=>l.group===group.id).map(l=>({slug:l.slug,title:l.number+'. '+l.title}))}]});
  const items=JT.bootCrashNav.flatMap(g=>g.items.flatMap(i=>[i,...(i.children||[])]));
  JT.bootCrashOrder = items.map(i => i.slug);
  for (const item of items) {
    const lesson = JT.bootCrashCatalog.find(l => l.slug === item.slug) || (JT.bootCrashExtensionCatalog||[]).find(l=>l.slug===item.slug);
    const title = lesson ? lesson.title : item.title;
    JT.navInfo[item.slug] = {title, heading: title, fullTitle: title, group: 'Spring Boot Crash Course', parent: item};
  }
})();
