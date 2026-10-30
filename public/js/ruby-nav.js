// Ruby and Ruby on Rails navigation. Like a W3Schools sidebar, each course is a list of
// headed groups with one lesson per link, read top to bottom.
(function () {
  'use strict';
  const JT = window.JT;

  // groups: [heading, [[slug, title], ...]]. Registers JT[key + 'Nav'], JT[key + 'Order'].
  function course(key, groups) {
    JT[key + 'Nav'] = groups.map(([title, items]) => ({ title, items: items.map(([slug, t]) => ({ slug, title: t })) }));
    const order = [];
    for (const g of JT[key + 'Nav']) for (const it of g.items) {
      JT.navInfo[it.slug] = { title: it.title, parent: it, group: g.title, fullTitle: it.title, heading: it.title };
      order.push(it.slug);
    }
    JT[key + 'Order'] = order;
  }

  course('ruby', [
    ['Ruby Tutorial', [
      ['ruby_home', 'Ruby Home'], ['ruby_intro', 'Ruby Intro'], ['ruby_get_started', 'Ruby Get Started'],
      ['ruby_syntax', 'Ruby Syntax'], ['ruby_output', 'Ruby Output'], ['ruby_comments', 'Ruby Comments'],
      ['ruby_variables', 'Ruby Variables'], ['ruby_data_types', 'Ruby Data Types'], ['ruby_numbers', 'Ruby Numbers'],
      ['ruby_strings', 'Ruby Strings'], ['ruby_string_methods', 'Ruby String Methods'], ['ruby_symbols', 'Ruby Symbols'],
      ['ruby_booleans', 'Ruby Booleans and nil'], ['ruby_operators', 'Ruby Operators'], ['ruby_conversion', 'Ruby Type Conversion'],
      ['ruby_input', 'Ruby User Input'],
    ]],
    ['Control Flow', [
      ['ruby_if', 'Ruby If...Else'], ['ruby_unless', 'Ruby unless and Modifiers'], ['ruby_case', 'Ruby case...when'],
      ['ruby_loops', 'Ruby while and until'], ['ruby_iterators', 'Ruby Iterators'], ['ruby_break_next', 'Ruby break and next'],
    ]],
    ['Collections', [
      ['ruby_arrays', 'Ruby Arrays'], ['ruby_array_methods', 'Ruby Array Methods'], ['ruby_hashes', 'Ruby Hashes'],
      ['ruby_hash_methods', 'Ruby Hash Methods'], ['ruby_ranges', 'Ruby Ranges'], ['ruby_enumerable', 'Ruby Enumerable'],
    ]],
    ['Methods and Blocks', [
      ['ruby_methods', 'Ruby Methods'], ['ruby_arguments', 'Ruby Method Arguments'], ['ruby_blocks', 'Ruby Blocks and yield'],
      ['ruby_procs_lambdas', 'Ruby Procs and Lambdas'],
    ]],
    ['Object-Oriented Ruby', [
      ['ruby_classes', 'Ruby Classes and Objects'], ['ruby_attributes', 'Ruby Attributes'], ['ruby_class_methods', 'Ruby Class Methods'],
      ['ruby_inheritance', 'Ruby Inheritance'], ['ruby_visibility', 'Ruby private and protected'], ['ruby_modules', 'Ruby Modules'],
      ['ruby_mixins', 'Ruby Mixins'], ['ruby_duck_typing', 'Ruby Duck Typing'], ['ruby_equality', 'Ruby Object Equality'],
    ]],
    ['Ruby Advanced', [
      ['ruby_exceptions', 'Ruby Exceptions'], ['ruby_custom_exceptions', 'Ruby Custom Exceptions'], ['ruby_files', 'Ruby File Handling'],
      ['ruby_struct_data', 'Ruby Struct and Data'], ['ruby_pattern_matching', 'Ruby Pattern Matching'], ['ruby_frozen', 'Ruby Frozen Objects'],
      ['ruby_metaprogramming', 'Ruby Metaprogramming'], ['ruby_method_missing', 'Ruby method_missing'], ['ruby_gems', 'Ruby Gems and Bundler'],
    ]],
    ['Ruby Interview', [['ruby_interview', 'Ruby Interview Questions'], ['ruby_quiz', 'Ruby Quiz']]],
  ]);

  // Follows the order of the Guides Index on guides.rubyonrails.org (Rails 8.1).
  course('rails', [
    ['Start Here', [
      ['rails_home', 'Rails Home'], ['rails_intro', 'Rails Intro'], ['rails_install', 'Install Rails'],
      ['rails_new_app', 'Create a Rails App'], ['rails_mvc', 'Rails MVC'], ['rails_hello', 'Hello, Rails!'],
      ['rails_console', 'Rails Console'],
    ]],
    ['Models', [
      ['rails_ar_basics', 'Active Record Basics'], ['rails_ar_crud', 'Active Record CRUD'], ['rails_migrations', 'Migrations'],
      ['rails_migrations_change', 'Changing Tables'], ['rails_validations', 'Validations'], ['rails_validation_errors', 'Custom Validations and Errors'],
      ['rails_callbacks', 'Callbacks'], ['rails_associations', 'Associations'], ['rails_associations_more', 'More Associations'],
      ['rails_query_basics', 'Query Interface'], ['rails_query_conditions', 'Query Conditions'], ['rails_n_plus_one', 'Eager Loading and N+1'],
      ['rails_scopes_enums', 'Scopes and Enums'], ['rails_active_model', 'Active Model Basics'],
    ]],
    ['Views', [
      ['rails_action_view', 'Action View and ERB'], ['rails_layouts_rendering', 'Layouts and Rendering'], ['rails_partials', 'Partials'],
      ['rails_view_helpers', 'View Helpers'], ['rails_form_helpers', 'Form Helpers'],
    ]],
    ['Controllers', [
      ['rails_controllers', 'Action Controller'], ['rails_strong_params', 'Strong Parameters'], ['rails_sessions_flash', 'Sessions, Cookies and Flash'],
      ['rails_controller_callbacks', 'Controller Callbacks'], ['rails_routing', 'Routing'], ['rails_routing_more', 'Nested and Namespaced Routes'],
      ['rails_controller_advanced', 'Controller Advanced Topics'],
    ]],
    ['Rails Features', [
      ['rails_authentication', 'Authentication'], ['rails_active_job', 'Background Jobs'], ['rails_action_mailer', 'Sending Email'],
      ['rails_active_storage', 'File Uploads'],
    ]],
    ['Digging Deeper', [
      ['rails_testing', 'Testing Models'], ['rails_testing_integration', 'Integration and System Tests'], ['rails_debugging', 'Debugging'],
      ['rails_configuration', 'Configuration'], ['rails_command_line', 'The Rails Command Line'], ['rails_assets', 'The Asset Pipeline'],
      ['rails_javascript', 'JavaScript and Hotwire'], ['rails_i18n', 'Internationalization'], ['rails_autoloading', 'Autoloading'],
      ['rails_api_only', 'API-only Applications'],
    ]],
    ['Going to Production', [
      ['rails_performance', 'Performance Tuning'], ['rails_caching', 'Caching'], ['rails_security', 'Security'],
      ['rails_error_reporting', 'Error Reporting'], ['rails_deploy', 'Deploying with Kamal'],
    ]],
    ['Rails Interview', [['rails_interview', 'Rails Interview Questions'], ['rails_quiz', 'Rails Quiz']]],
  ]);
})();
