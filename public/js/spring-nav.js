// Spring Framework course navigation, isolated from both Java course areas.
// Topics are the framework features that a senior Java developer uses daily and
// is asked about in interviews; Spring Boot features live in the Spring Boot course.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['ioc', 'IoC and Dependency Injection', [
      ['ioc_di', 'IoC and dependency injection'], ['application_context', 'ApplicationContext vs BeanFactory'],
      ['injection_types', 'Constructor, setter and field injection'], ['qualifier_primary', 'Multiple beans: @Qualifier and @Primary'],
      ['circular_dependencies', 'Circular dependencies'],
    ]],
    ['beans', 'Beans', [
      ['bean_scopes', 'Bean scopes'], ['prototype_in_singleton', 'Prototype bean inside a singleton'],
      ['bean_lifecycle', 'Bean lifecycle callbacks'], ['bean_post_processor', 'BeanPostProcessor'],
      ['singleton_thread_safety', 'Singleton beans and thread safety'],
    ]],
    ['configuration', 'Configuration', [
      ['configuration_vs_component', '@Configuration and @Bean methods'], ['component_scanning', 'Component scanning and stereotypes'],
      ['properties_profiles', '@Value, Environment and @Profile'], ['conditional', '@Conditional'],
    ]],
    ['aop', 'AOP and Proxies', [
      ['aop_concepts', 'AOP concepts'], ['around_advice', '@Around advice'],
      ['jdk_vs_cglib', 'JDK dynamic proxy vs CGLIB'], ['self_invocation', 'The self-invocation problem'],
    ]],
    ['data', 'Data Access and Transactions', [
      ['jdbc_template', 'JdbcTemplate'], ['transactional', 'How @Transactional works'],
      ['propagation', 'Transaction propagation'], ['isolation', 'Isolation levels'],
      ['rollback_rules', 'Rollback rules'], ['transaction_pitfalls', 'Transaction pitfalls'],
    ]],
    ['mvc', 'Spring MVC', [
      ['dispatcher_servlet', 'DispatcherServlet request flow'], ['rest_controller', '@Controller vs @RestController'],
      ['exception_handling', 'Exception handling with @RestControllerAdvice'], ['filters_interceptors', 'Filters vs interceptors'],
    ]],
    ['events_async', 'Events and Async', [
      ['events', 'Application events'], ['async', '@Async'],
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
