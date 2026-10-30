// Web application security for Java developers: the vulnerabilities and controls
// that come up in real projects and in senior-level interviews.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['browser', 'Injection and Browser Attacks', [
      ['sql_injection', 'SQL injection'], ['xss', 'Cross-site scripting (XSS)'], ['csrf', 'Cross-site request forgery (CSRF)'],
      ['cors', 'CORS'], ['security_headers', 'Security headers and clickjacking'],
    ]],
    ['identity', 'Sessions and Authentication', [
      ['session_fixation', 'Session fixation and session ID protection'], ['password_hashing', 'Password hashing'],
      ['authn_authz', 'Authentication vs authorization in Spring Security'], ['jwt', 'JWT security'],
    ]],
    ['access', 'Access Control and Data Protection', [
      ['idor', 'Broken access control and IDOR'], ['path_traversal', 'Path traversal in file handling'],
      ['sensitive_data', 'Sensitive data in logs and errors'],
    ]],
  ];
  JT.securityGroups = groups;
  JT.securityHomeSlug = 'security_home';
  JT.securityNav = [{ title: 'JavaTrail Security', items: [
    { slug: JT.securityHomeSlug, title: 'Security Home' },
    ...groups.map(([id, title, topics]) => ({ slug: 'security_group_' + id, title, children: [
      { slug: 'security_group_' + id, title: 'Section overview' },
      ...topics.map(([topic, topicTitle]) => ({ slug: 'security_' + topic, title: topicTitle })),
    ] })),
  ] }];
  JT.securityOrder = []; JT.securityInfo = {};
  for (const section of JT.securityNav) for (const item of section.items) {
    const children = item.children || [{ slug: item.slug, title: item.title }];
    for (const child of children) {
      if (JT.securityInfo[child.slug]) continue;
      JT.securityInfo[child.slug] = { title: child.title, parent: item, group: item.children ? item.title : section.title,
        fullTitle: item.children ? item.title + ' › ' + child.title : child.title,
        heading: item.children && child.title !== 'Section overview' ? child.title : item.title };
      JT.securityOrder.push(child.slug);
    }
  }
  Object.assign(JT.navInfo, JT.securityInfo);
})();
