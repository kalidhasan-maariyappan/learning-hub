(function () {
  'use strict';
  const JT = window.JT;
  function register(key, groups) {
    JT[key + 'Nav'] = groups.map(([title, items]) => ({ title, items: items.map(([slug, text]) => ({ slug, title: text })) }));
    JT[key + 'Order'] = [];
    for (const group of JT[key + 'Nav']) for (const item of group.items) {
      JT.navInfo[item.slug] = { title: item.title, fullTitle: item.title, heading: item.title, parent: item, group: group.title };
      JT[key + 'Order'].push(item.slug);
    }
  }
  register('gems', [['Major Gems', [['gems_home', 'Major Gems Home']]], ...JT.gemGroups.map(([title, items]) => [title, items.map(([id, text]) => ['gems_' + id, text])])]);
  register('coding', [['Coding Interview', [['coding_home', 'Practice Home and Rules']]], ...JT.codingGroups.map(([title, items]) => [title + ': 20 Problems', [['coding_' + title.toLowerCase(), title + ' Overview'], ...items.map(([id, text], i) => ['coding_' + title.toLowerCase() + '_' + id, (i + 1) + '. ' + text])]])]);
  register('scenario', [['Scenario Interview', [['scenario_home', '50 Scenarios: Start Here']]], ...JT.scenarioGroups.map(([title, items], group) => [title, items.map(([id, text], i) => ['scenario_' + id, (group * 10 + i + 1) + '. ' + text])])]);
})();
