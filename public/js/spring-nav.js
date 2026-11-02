// Spring Framework course navigation, based on the user's Spring discussion notes.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['foundations', 'Spring Foundations', [
      ['benefits', 'Why Spring? Eight benefits explained'],
      ['pojo_beans', 'POJOs and Spring beans'],
      ['ioc_di', 'IoC and dependency injection'],
      ['enterprise_java', 'What are J2EE, Java EE and Jakarta EE?'],
      ['spring_vs_enterprise_java', 'Java, Jakarta EE and Spring'],
      ['exception_handling', 'Central exception handling'],
    ]],
    ['aop', 'Spring AOP', [
      ['aop_concepts', 'AOP concepts and advice types'],
      ['xml_aop', 'AOP with XML schema configuration'],
      ['aspectj_aop', 'AOP with @AspectJ annotations'],
    ]],
    ['jdbc', 'Spring JDBC', [
      ['jdbc_template', 'JDBC and JdbcTemplate'],
      ['jdbc_dao', 'DataSource and DAO pattern'],
      ['jdbc_operations', 'Queries and SQL operations'],
    ]],
    ['transactions', 'Transaction Management', [
      ['transaction_foundations', 'Transactions and ACID'],
      ['transaction_management', 'Spring transaction management'],
    ]],
    ['mvc', 'Spring Web MVC', [
      ['mvc_basics', 'Model–View–Controller and request flow'],
      ['mvc_xml_views', 'XML configuration and JSP views'],
    ]],
    ['logging', 'Logging with Log4j 2', [
      ['logging_basics', 'Logging concepts and levels'],
      ['log4j2_config', 'Configure Log4j 2'],
    ]],
  ];

  JT.springGroups = groups;
  JT.springHomeSlug = 'spring_home';
  JT.springNav = [{ title: 'Spring Framework', items: [
    { slug: JT.springHomeSlug, title: 'Spring Framework Home' },
    ...groups.map(([id, title, topics]) => ({
      slug: 'spring_group_' + id,
      title,
      children: [
        { slug: 'spring_group_' + id, title: 'Section overview' },
        ...topics.map(([topic, topicTitle]) => ({ slug: 'spring_' + topic, title: topicTitle })),
      ],
    })),
  ] }];
  JT.springOrder = [];
  JT.springInfo = {};
  for (const section of JT.springNav) {
    for (const item of section.items) {
      const children = item.children || [{ slug: item.slug, title: item.title }];
      for (const child of children) {
        if (JT.springInfo[child.slug]) continue;
        JT.springInfo[child.slug] = {
          title: child.title,
          parent: item,
          group: item.children ? item.title : section.title,
          fullTitle: item.children ? item.title + ' › ' + child.title : child.title,
          heading: item.children && child.title !== 'Section overview' ? 'Spring ' + child.title : item.title,
        };
        JT.springOrder.push(child.slug);
      }
    }
  }
  Object.assign(JT.navInfo, JT.springInfo);
})();
