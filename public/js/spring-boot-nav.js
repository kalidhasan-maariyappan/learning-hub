// Spring Boot course navigation. It builds on the Spring Framework course and covers
// what Boot adds: auto-configuration, configuration, REST, JPA, testing and production.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['core', 'Spring Boot Core', [
      ['boot_vs_spring', 'Spring Boot vs Spring Framework'], ['auto_configuration', 'How auto-configuration works'],
      ['starters', 'Starters and dependency management'], ['startup', 'Startup, runners and events'],
    ]],
    ['config', 'Configuration', [
      ['configuration_properties', '@ConfigurationProperties vs @Value'], ['profiles', 'Profiles'],
      ['config_precedence', 'Externalized configuration order'],
    ]],
    ['rest', 'REST APIs', [
      ['rest_api', 'Building a REST API'], ['validation', 'Request validation'], ['dto_vs_entity', 'DTOs vs entities'],
    ]],
    ['jpa', 'Spring Data JPA', [
      ['repositories', 'Repositories and query methods'], ['n_plus_one', 'The N+1 query problem'],
      ['lazy_loading', 'Lazy loading and LazyInitializationException'], ['dirty_checking', 'Persistence context and dirty checking'],
      ['optimistic_locking', 'Optimistic locking with @Version'], ['pagination', 'Pagination and sorting'],
      ['migrations', 'Database migrations with Flyway'],
    ]],
    ['security', 'Security', [
      ['api_security', 'Securing a REST API'],
    ]],
    ['testing', 'Testing', [
      ['test_slices', '@SpringBootTest vs test slices'], ['controller_tests', 'Controller tests with MockMvc and mocks'],
    ]],
    ['production', 'Production Readiness', [
      ['actuator', 'Actuator, health checks and shutdown'], ['caching', 'Caching with @Cacheable'],
      ['scheduling', 'Scheduled jobs'], ['rest_client', 'Calling external APIs with RestClient'],
      ['resilience', 'Retries, circuit breakers and idempotency'], ['connection_pool', 'Connection and thread pools'],
    ]],
  ];
  JT.springBootGroups = groups;
  JT.springBootHomeSlug = 'springboot_home';
  JT.springBootNav = [{ title: 'Spring Boot', items: [
    { slug: JT.springBootHomeSlug, title: 'Spring Boot Home' },
    ...groups.map(([id, title, topics]) => ({ slug: 'springboot_group_' + id, title, children: [
      { slug: 'springboot_group_' + id, title: 'Section overview' },
      ...topics.map(([topic, topicTitle]) => ({ slug: 'springboot_' + topic, title: topicTitle })),
    ] })),
  ] }];
  JT.springBootOrder = []; JT.springBootInfo = {};
  for (const section of JT.springBootNav) for (const item of section.items) {
    const children = item.children || [{ slug: item.slug, title: item.title }];
    for (const child of children) {
      if (JT.springBootInfo[child.slug]) continue;
      JT.springBootInfo[child.slug] = { title: child.title, parent: item, group: item.children ? item.title : section.title, fullTitle: item.children ? item.title + ' › ' + child.title : child.title, heading: item.children && child.title !== 'Section overview' ? child.title : item.title };
      JT.springBootOrder.push(child.slug);
    }
  }
  Object.assign(JT.navInfo, JT.springBootInfo);
})();
