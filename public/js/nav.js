// Sidebar tree. Order follows the observed reference sidebar; it also defines Previous/Next order.
// A parent with children links to its first child (same slug), as observed.
(function () {
  'use strict';
  const JT = (window.JT = window.JT || {});
  const P = (slug, title, children) => ({ slug, title, children: children && children.map(([s, t]) => ({ slug: s, title: t })) });
  const C = (topic) => ['java_challenges_' + topic, 'Code Challenge'];

  JT.nav = [
    { title: 'Java Tutorial', items: [
      P('default', 'Java HOME'),
      P('java_intro', 'Java Intro'),
      P('java_getstarted', 'Java Get Started'),
      P('java_syntax', 'Java Syntax', [['java_syntax', 'Syntax'], ['java_statements', 'Statements'], C('syntax')]),
      P('java_output', 'Java Output', [['java_output', 'Print Text'], ['java_output_numbers', 'Print Numbers'], C('output')]),
      P('java_comments', 'Java Comments'),
      P('java_variables', 'Java Variables', [['java_variables', 'Variables'], ['java_variables_print', 'Print Variables'], ['java_variables_multiple', 'Multiple Variables'], ['java_variables_identifiers', 'Identifiers'], ['java_variables_final', 'Constants (Final)'], ['java_variables_reallife', 'Real-Life Examples'], C('variables')]),
      P('java_data_types', 'Java Data Types', [['java_data_types', 'Data Types'], ['java_data_types_numbers', 'Numbers'], ['java_data_types_boolean', 'Booleans'], ['java_data_types_characters', 'Characters'], ['java_data_types_reallife', 'Real-Life Example'], ['java_data_types_non-prim', 'Non-primitive Types'], ['java_var', 'The var Keyword'], C('data_types')]),
      P('java_type_casting', 'Java Type Casting'),
      P('java_operators', 'Java Operators', [['java_operators', 'Operators'], ['java_operators_arithmetic', 'Arithmetic'], ['java_operators_assign', 'Assignment'], ['java_operators_comparison', 'Comparison'], ['java_operators_logical', 'Logical'], ['java_operators_precedence', 'Precedence'], C('operators')]),
      P('java_strings', 'Java Strings', [['java_strings', 'Strings'], ['java_strings_concat', 'Concatenation'], ['java_strings_numbers', 'Numbers and Strings'], ['java_strings_specchars', 'Special Characters'], C('strings')]),
      P('java_math', 'Java Math'),
      P('java_booleans', 'Java Booleans', [['java_booleans', 'Booleans'], ['java_booleans_reallife', 'Real-Life Example'], C('booleans')]),
      P('java_conditions', 'Java If...Else', [['java_conditions', 'if'], ['java_conditions_else', 'else'], ['java_conditions_elseif', 'else if'], ['java_conditions_shorthand', 'Short Hand If...Else'], ['java_conditions_nested', 'Nested If'], ['java_conditions_logical', 'Logical Operators'], ['java_conditions_reallife', 'Real-Life Examples'], C('conditions')]),
      P('java_switch', 'Java Switch', [['java_switch', 'Switch'], C('switch')]),
      P('java_while_loop', 'Java While Loop', [['java_while_loop', 'While Loop'], ['java_while_loop_do', 'Do/While Loop'], ['java_while_loop_reallife', 'Real-Life Examples'], C('while_loop')]),
      P('java_for_loop', 'Java For Loop', [['java_for_loop', 'For Loop'], ['java_for_loop_nested', 'Nested Loops'], ['java_foreach_loop', 'For-Each Loop'], ['java_for_loop_reallife', 'Real-Life Examples'], C('for_loop')]),
      P('java_break', 'Java Break/Continue'),
      P('java_arrays', 'Java Arrays', [['java_arrays', 'Arrays'], ['java_arrays_loop', 'Loop Through an Array'], ['java_arrays_reallife', 'Real-Life Examples'], ['java_arrays_multi', 'Multidimensional Arrays'], C('arrays')]),
    ] },
    { title: 'Java Methods', items: [
      P('java_methods', 'Java Methods'),
      P('java_challenges_methods', 'Java Method Challenge'),
      P('java_methods_param', 'Java Method Parameters', [['java_methods_param', 'Parameters'], ['java_methods_return', 'Return Values'], C('methods_param')]),
      P('java_methods_overloading', 'Java Method Overloading'),
      P('java_scope', 'Java Scope'),
      P('java_recursion', 'Java Recursion'),
    ] },
    { title: 'Java Classes', items: [
      P('java_oop', 'Java OOP'),
      P('java_classes', 'Java Classes/Objects'),
      P('java_class_attributes', 'Java Class Attributes'),
      P('java_class_methods', 'Java Class Methods'),
      P('java_challenges_class', 'Java Class Challenge'),
      P('java_constructors', 'Java Constructors'),
      P('java_this', 'Java this Keyword'),
      P('java_modifiers', 'Java Modifiers', [['java_modifiers', 'Access Modifiers'], ['java_non_modifiers', 'Non-Access Modifiers']]),
      P('java_encapsulation', 'Java Encapsulation'),
      P('java_packages', 'Java Packages / API'),
      P('java_inheritance', 'Java Inheritance'),
      P('java_polymorphism', 'Java Polymorphism'),
      P('java_super', 'Java super Keyword'),
      P('java_inner_classes', 'Java Inner Classes'),
      P('java_abstract', 'Java Abstraction'),
      P('java_interface', 'Java Interface'),
      P('java_anonymous', 'Java Anonymous'),
      P('java_enums', 'Java Enum', [['java_enums', 'Enums'], ['java_enum_constructor', 'Enum Constructor']]),
      P('java_user_input', 'Java User Input'),
      P('java_date', 'Java Date'),
    ] },
    { title: 'Java Errors', items: [
      P('java_errors', 'Java Errors'),
      P('java_debugging', 'Java Debugging'),
      P('java_try_catch', 'Java Exceptions'),
      P('java_exceptions_multiple', 'Java Multiple Exceptions'),
      P('java_try_catch_resources', 'Java try-with-resources'),
    ] },
    { title: 'Java File Handling', items: [
      P('java_files', 'Java Files'),
      P('java_files_create', 'Java Create Files'),
      P('java_files_write', 'Java Write Files'),
      P('java_files_read', 'Java Read Files'),
      P('java_files_delete', 'Java Delete Files'),
    ] },
    { title: 'Java I/O Streams', items: [
      P('java_io_streams', 'Java I/O Streams'),
      P('java_fileinputstream', 'Java FileInputStream'),
      P('java_fileoutputstream', 'Java FileOutputStream'),
      P('java_bufferedreader', 'Java BufferedReader'),
      P('java_bufferedwriter', 'Java BufferedWriter'),
    ] },
    { title: 'Java Data Structures', items: [
      P('java_data_structures', 'Java Data Structures'),
      P('java_collections', 'Java Collections'),
      P('java_list', 'Java List'),
      P('java_arraylist', 'Java ArrayList'),
      P('java_linkedlist', 'Java LinkedList'),
      P('java_sort_list', 'Java List Sorting'),
      P('java_set', 'Java Set'),
      P('java_hashset', 'Java HashSet'),
      P('java_treeset', 'Java TreeSet'),
      P('java_linkedhashset', 'Java LinkedHashSet'),
      P('java_map', 'Java Map'),
      P('java_hashmap', 'Java HashMap'),
      P('java_treemap', 'Java TreeMap'),
      P('java_linkedhashmap', 'Java LinkedHashMap'),
      P('java_iterator', 'Java Iterator'),
      P('java_algorithms', 'Java Algorithms'),
    ] },
    { title: 'Java Advanced', items: [
      P('java_wrapper_classes', 'Java Wrapper Classes'),
      P('java_generics', 'Java Generics'),
      P('java_annotations', 'Java Annotations'),
      P('java_regex', 'Java RegEx'),
      P('java_threads', 'Java Threads'),
      P('java_lambda', 'Java Lambda'),
      P('java_advanced_sorting', 'Java Advanced Sorting'),
    ] },
    { title: 'Java Projects', items: [P('java_projects', 'Java Projects')] },
    { title: 'Java Cert', items: [P('java_exam', 'Java Final Exam')] },
    { title: "Java How To's", items: [P('java_howtos', 'Java How Tos')] },
    { title: 'Java Reference', items: [
      P('java_ref_reference', 'Java Reference'),
      P('java_ref_keywords', 'Java Keywords'),
      P('java_ref_string', 'Java String Methods'),
      P('java_ref_math', 'Java Math Methods'),
      P('java_ref_output', 'Java Output Methods'),
      P('java_ref_arrays', 'Java Arrays Methods'),
      P('java_ref_arraylist', 'Java ArrayList Methods'),
      P('java_ref_linkedlist', 'Java LinkedList Methods'),
      P('java_ref_hashmap', 'Java HashMap Methods'),
      P('java_ref_scanner', 'Java Scanner Methods'),
      P('java_ref_file', 'Java File Methods'),
      P('java_ref_fileinputstream', 'Java FileInputStream'),
      P('java_ref_fileoutputstream', 'Java FileOutputStream'),
      P('java_ref_bufferedreader', 'Java BufferedReader'),
      P('java_ref_bufferedwriter', 'Java BufferedWriter'),
      P('java_ref_iterators', 'Java Iterator Methods'),
      P('java_ref_collections', 'Java Collections Methods'),
      P('java_ref_system', 'Java System Methods'),
      P('java_ref_errors', 'Java Errors & Exceptions'),
    ] },
    { title: 'Java Examples', items: [
      P('java_examples', 'Java Examples'),
      P('java_compiler', 'Java Compiler'),
      P('java_exercises', 'Java Exercises'),
      P('java_quiz', 'Java Quiz'),
      P('java_challenges', 'Java Code Challenges'),
      P('java_practice', 'Java Practice Problems'),
      P('java_server', 'Java Local Runner'),
      P('java_syllabus', 'Java Syllabus'),
      P('java_study_plan', 'Java Study Plan'),
      P('java_interview_questions', 'Java Interview Q&A'),
    ] },
  ];

  // Flattened reading order (parents collapse into their first child) used for Previous/Next.
  JT.order = [];
  JT.navInfo = {};
  for (const g of JT.nav) {
    for (const it of g.items) {
      const kids = it.children || [{ slug: it.slug, title: it.title }];
      for (const k of kids) {
        if (JT.navInfo[k.slug]) continue;
        const child = it.children && k.slug !== it.slug;
        JT.navInfo[k.slug] = {
          title: k.title, parent: it, group: g.title,
          fullTitle: child ? it.title + ' › ' + k.title : it.title,
          heading: child ? 'Java ' + k.title.charAt(0).toUpperCase() + k.title.slice(1) : it.title,
        };
        JT.order.push(k.slug);
      }
    }
  }
})();
