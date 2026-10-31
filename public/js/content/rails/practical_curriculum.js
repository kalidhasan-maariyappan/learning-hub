(function () {
  'use strict';
  window.JT = window.JT || {};
  window.JT.railsPracticalSections = [
    { title: 'Performance Optimization', overview: 'rails_practical_path', intro: 'Measure, investigate, optimize and verify production behavior.', chapters: [
      ['rails_performance_bottlenecks', 'Finding Performance Bottlenecks'], ['rails_practical_sql', 'SQL Costs and Bounded Queries'], ['rails_practical_n_plus_one', 'N+1 Queries and Eager Loading'], ['rails_practical_indexes', 'Indexes and Execution Plans'], ['rails_practical_caching', 'Caching and Invalidation'], ['rails_practical_memory', 'Memory and Garbage Collection'], ['rails_practical_jobs', 'Background Jobs and Queue Latency'], ['rails_practical_profiling', 'Profiling, Monitoring and Case Studies']
    ] },
    { title: 'Debugging Applications', overview: 'rails_debugging_path', intro: 'Follow evidence from a reported symptom to a verified fix, across HTML applications, APIs and production jobs.', chapters: [
      ['rails_practical_debug_workflow', 'A Systematic Debugging Workflow'], ['rails_practical_logs', 'Logs and Request Correlation'], ['rails_practical_breakpoints', 'Breakpoints and the Ruby Debugger'], ['rails_practical_model_debug', 'Controllers, Models and Database Bugs'], ['rails_practical_browser', 'Browser Developer Tools'], ['rails_practical_api_debug', 'REST APIs and API Testing'], ['rails_practical_auth_debug', 'Authentication and Authorization'], ['rails_practical_job_debug', 'Debugging Background Jobs'], ['rails_practical_incidents', 'Production Incidents and Root Cause Analysis']
    ] },
    { title: 'Frontend Integration', overview: 'rails_frontend_path', intro: 'Choose and configure a frontend pipeline, then build jQuery, Bootstrap and React features separately.', chapters: [
      ['rails_practical_assets', 'Assets, Import Maps and Bundlers'], ['rails_practical_jquery', 'Install and Use jQuery'], ['rails_practical_jquery_turbo', 'jQuery, AJAX and Turbo Lifecycle'], ['rails_practical_bootstrap', 'Install and Use Bootstrap'], ['rails_practical_bootstrap_debug', 'Bootstrap Components and Troubleshooting'], ['rails_practical_react', 'Install React and Build an Island'], ['rails_practical_react_api', 'React with a Rails API'], ['rails_practical_frontend_choices', 'Rails Views vs React: Architecture and Versions']
    ] },
    { title: 'Rails 7 vs Rails 8', overview: 'rails_versions_path', intro: 'Compare Rails 7.0, 7.1 and 7.2 with Rails 8.0 and 8.1. Separate generated defaults from the configuration of an upgraded application.', chapters: [
      ['rails_practical_rails_releases', 'Release Baselines and Compatibility'], ['rails_practical_rails_auth', 'Authentication Changes'], ['rails_practical_rails_deploy', 'Deployment, Kamal and Thruster'], ['rails_practical_rails_assets', 'Asset and Configuration Changes'], ['rails_practical_rails_database', 'Database and Transaction Changes'], ['rails_practical_rails_solid', 'Caching, Jobs and the Solid Adapters'], ['rails_practical_rails_upgrade', 'Deprecations and a Safe Upgrade']
    ] },
    { title: 'Ruby 3.x vs Ruby 4.x', overview: 'rails_ruby_versions_path', intro: 'Compare exact Ruby releases, understand language and runtime changes, and prove application compatibility with a repeatable migration.', chapters: [
      ['rails_practical_ruby_releases', 'Ruby Release Baselines and Rails Support'], ['rails_practical_ruby_language', 'Language Changes and Syntax'], ['rails_practical_ruby_core', 'Core Classes and HTTP Compatibility'], ['rails_practical_ruby_jit', 'Performance, YJIT and ZJIT'], ['rails_practical_ruby_concurrency', 'Ractors and Ruby Box'], ['rails_practical_ruby_removals', 'Deprecations, Libraries and Native Gems'], ['rails_practical_ruby_upgrade', 'Ruby Migration and Production Verification']
    ] }
  ];
})();
