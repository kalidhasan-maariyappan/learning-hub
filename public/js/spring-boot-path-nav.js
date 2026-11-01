// Spring Boot Learning Path navigation. A W3Schools-style sidebar: headed groups with one
// lesson per link, read top to bottom in the order the path recommends. The last groups
// collect every complete example project and the reference pages.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['Spring Boot Tutorial', [
      ['sbp_home', 'Spring Boot Home'], ['sbp_intro', 'Spring Boot Intro'], ['sbp_get_started', 'Get Started'],
      ['sbp_first_app', 'First Application'], ['sbp_project_structure', 'Project Structure'], ['sbp_ioc', 'IoC and Dependency Injection'],
      ['sbp_beans', 'Beans and @Configuration'], ['sbp_auto_config', 'Auto-configuration'], ['sbp_config', 'Configuration Properties'],
      ['sbp_profiles', 'Profiles'], ['sbp_logging', 'Logging'],
    ]],
    ['Spring Boot REST', [
      ['sbp_rest', 'REST Controllers'], ['sbp_request', 'Request Data'], ['sbp_response', 'Responses and Status Codes'],
      ['sbp_validation', 'Validation'], ['sbp_errors', 'Error Handling'], ['sbp_rest_client', 'Calling APIs with RestClient'],
    ]],
    ['Spring Boot Data', [
      ['sbp_jpa', 'JPA Entities'], ['sbp_repositories', 'Repositories'], ['sbp_queries', 'Query Methods and Paging'],
      ['sbp_transactions', 'Transactions'], ['sbp_jdbc', 'JDBC with JdbcClient'], ['sbp_n_plus_one', 'The N+1 Problem'],
      ['sbp_postgres', 'PostgreSQL and Flyway'],
    ]],
    ['Spring Boot Testing', [
      ['sbp_testing', 'Testing Overview'], ['sbp_unit_tests', 'Unit Tests with Mockito'], ['sbp_mockmvc', 'Web Tests with MockMvc'],
      ['sbp_testcontainers', 'Testcontainers'],
    ]],
    ['Spring Boot Security', [
      ['sbp_security', 'Security Basics'], ['sbp_security_rules', 'Authorization Rules'], ['sbp_jwt', 'OAuth2 Resource Server (JWT)'],
    ]],
    ['Spring Boot Messaging', [
      ['sbp_messaging', 'Messaging Overview'], ['sbp_events', 'Application Events'], ['sbp_kafka', 'Apache Kafka'],
      ['sbp_rabbitmq', 'RabbitMQ'], ['sbp_kafka_vs_rabbit', 'Kafka vs RabbitMQ'], ['sbp_outbox', 'Transactional Outbox'],
      ['sbp_redis_streams', 'Redis Streams'],
    ]],
    ['Spring Boot Jobs and Cache', [
      ['sbp_scheduling', 'Scheduling'], ['sbp_async', 'Async and Virtual Threads'], ['sbp_batch', 'Spring Batch'],
      ['sbp_caching', 'Caching'], ['sbp_redis', 'Redis Cache'],
    ]],
    ['Spring Boot Production', [
      ['sbp_actuator', 'Actuator'], ['sbp_metrics', 'Metrics and Observability'], ['sbp_resilience', 'Timeouts and Retries'],
      ['sbp_docker', 'Docker'], ['sbp_kubernetes', 'Kubernetes'], ['sbp_ci', 'CI Pipeline'], ['sbp_debugging', 'Production Debugging'],
    ]],
    ['Spring Boot Advanced', [
      ['sbp_microservices', 'Microservices'], ['sbp_spring_cloud', 'Spring Cloud'], ['sbp_webflux', 'WebFlux'],
      ['sbp_sse', 'Server-Sent Events'], ['sbp_websocket', 'WebSocket'], ['sbp_graphql', 'GraphQL'], ['sbp_grpc', 'gRPC'],
    ]],
    ['Spring Boot Examples', [
      ['sbp_examples', 'All Examples'], ['sbp_project_patient', 'Project: Patient API'], ['sbp_project_secure', 'Project: Secured API'],
      ['sbp_project_claims', 'Project: Claims Events'], ['sbp_project_notifications', 'Project: Notifications'],
      ['sbp_project_catalog', 'Project: Cached Catalog'], ['sbp_project_production', 'Project: Production Service'],
    ]],
    ['Spring Boot Reference', [
      ['sbp_versions', 'Versions and Compatibility'], ['sbp_modernize', 'Deprecated Patterns'], ['sbp_starters', 'Starter Reference'],
      ['sbp_annotations', 'Annotation Reference'], ['sbp_properties', 'Properties Reference'], ['sbp_interview', 'Interview Questions'],
      ['sbp_exercises', 'Exercises'], ['sbp_quiz', 'Quiz'],
    ]],
  ];
  JT.bootPathGroups = groups;
  JT.bootPathNav = groups.map(([title, items]) => ({ title, items: items.map(([slug, text]) => ({ slug, title: text })) }));
  JT.bootPathOrder = [];
  for (const g of JT.bootPathNav) for (const it of g.items) {
    JT.navInfo[it.slug] = { title: it.title, parent: it, group: g.title, fullTitle: it.title, heading: it.title };
    JT.bootPathOrder.push(it.slug);
  }
})();
