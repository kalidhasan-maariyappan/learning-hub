// Separate topic-by-topic navigation for Java Core Advanced.
(function () {
  'use strict';
  const JT = window.JT;
  // Topics are limited to what an experienced Java developer is expected to explain in
  // interviews and use at work. Web security now lives in the separate Security course.
  const groups = [
    ['runtime_compilation', 'JVM & Runtime', [
      ['jdk_jre_jvm', 'JDK vs JRE vs JVM'], ['pass_by_value', 'Pass-by-value and references'], ['jvm_architecture', 'JVM architecture and execution engine'],
      ['class_loading', 'Class loading, linking and initialization'], ['classloader_hierarchy', 'ClassLoader hierarchy and delegation'],
      ['jit_compilation', 'JIT compilation'], ['memory_model', 'Java Memory Model and happens-before'],
    ]],
    ['object_internals', 'Object Equality & Immutability', [
      ['identity_equality', 'Object identity vs logical equality'], ['equals_hashcode', 'equals() and hashCode() contract'],
      ['mutable_hashmap_keys', 'Mutable HashMap keys'], ['shallow_deep_copy', 'Shallow copy vs deep copy'],
      ['immutability_copying', 'Immutability and defensive copying'],
    ]],
    ['hashmap_internals', 'HashMap Internals', [
      ['bucket_index', 'Hashing and bucket index'], ['hash_collisions', 'Hash collisions'],
      ['tree_bins', 'Treeified bins (Java 8+)'], ['capacity_load_factor', 'Capacity, load factor and threshold'],
      ['hashmap_resize', 'Resizing and rehashing'], ['put_get_flow', 'put() and get() internal flow'],
      ['hashmap_complexity', 'HashMap time complexity'],
    ]],
    ['advanced_collections', 'Collections Internals', [
      ['arraylist_resizing', 'ArrayList resizing'], ['arraylist_linkedlist', 'ArrayList vs LinkedList'],
      ['hashset_internals', 'HashSet internals'], ['treemap_redblack', 'TreeMap and sorted maps'],
      ['comparable_comparator', 'Comparable vs Comparator'], ['iterator_failfast', 'Fail-fast iterators'],
      ['weakly_consistent', 'Fail-safe (weakly consistent) iterators'], ['collection_complexity', 'Choosing a collection by complexity'],
    ]],
    ['generics_internals', 'Generics', [
      ['bounded_types', 'Bounded type parameters'], ['wildcards_pecs', 'Wildcards and PECS'],
      ['type_erasure', 'Type erasure'], ['generic_creation_limits', 'Why Java cannot create new T() or generic arrays'],
    ]],
    ['advanced_exceptions', 'Exception Handling', [
      ['errors_recoverable', 'Checked, unchecked and errors'], ['exception_hierarchy', 'Custom exception hierarchy design'],
      ['exception_chaining', 'Exception chaining and root cause'], ['try_resources_internals', 'try-with-resources'],
      ['suppressed_exceptions', 'Suppressed exceptions'], ['layered_exception_design', 'Exceptions in layered applications'],
    ]],
    ['threading_fundamentals', 'Multithreading Fundamentals', [
      ['thread_lifecycle', 'Thread lifecycle and states'], ['thread_runnable_callable', 'Thread vs Runnable vs Callable'],
      ['race_conditions', 'Race conditions'], ['thread_safety', 'Thread safety strategies'],
      ['visibility_atomicity', 'Visibility vs atomicity'], ['deadlock_livelock_starvation', 'Deadlock, livelock and starvation'],
      ['interruption_cancellation', 'Interruption and cancellation'],
    ]],
    ['executors_async', 'Executors & Asynchronous Java', [
      ['executor_service', 'ExecutorService'], ['execute_submit', 'execute() vs submit()'],
      ['threadpoolexecutor', 'ThreadPoolExecutor internals'], ['pool_sizing_queue', 'Pool size, queue and thread-pool sizing'],
      ['rejection_policies', 'Rejection policies'], ['completablefuture', 'CompletableFuture composition'],
      ['async_exceptions', 'Exceptions in asynchronous tasks'], ['virtual_threads', 'Virtual threads (Java 21)'],
    ]],
    ['synchronization_utilities', 'Locks & Concurrency Utilities', [
      ['synchronized_monitors', 'synchronized and monitor locks'], ['volatile_visibility', 'volatile'],
      ['atomic_cas', 'Atomic classes and compare-and-set'], ['reentrantlock', 'ReentrantLock'],
      ['readwritelock', 'ReadWriteLock'], ['countdownlatch', 'CountDownLatch'], ['semaphore', 'Semaphore'],
      ['blockingqueue', 'BlockingQueue and producer-consumer'], ['concurrenthashmap_internals', 'ConcurrentHashMap internals'],
      ['threadlocal_leaks', 'ThreadLocal and memory leaks'],
    ]],
    ['functional_programming', 'Lambdas & Streams', [
      ['functional_composition', 'Functional interfaces and composition'], ['method_references', 'Method references'],
      ['stream_pipeline', 'Stream pipeline internals'], ['stream_map_filter_flatmap', 'map(), filter() and flatMap()'],
      ['stream_reduce_collect', 'reduce() and collect()'], ['grouping_partitioning', 'groupingBy() and partitioningBy()'],
      ['lazy_shortcircuit', 'Lazy evaluation and short-circuiting'], ['parallel_streams', 'Parallel streams and their risks'],
      ['optional_design', 'Optional: correct use and misuse'],
    ]],
    ['jvm_memory_gc', 'JVM Memory & Garbage Collection', [
      ['stack_heap_frames', 'Stack vs heap'], ['gc_roots', 'GC roots and reachability'],
      ['generational_gc', 'Generational garbage collection'], ['g1_gc', 'G1 GC'], ['z_gc', 'ZGC'],
      ['reference_types', 'Strong, soft, weak and phantom references'], ['gc_memory_leaks', 'Memory leaks in Java'],
      ['outofmemoryerror', 'OutOfMemoryError types'], ['heap_dump_profiling', 'Heap dumps and memory profiling'],
    ]],
    ['modern_java', 'Modern Java (17 to 21)', [
      ['records', 'Records'], ['sealed_classes', 'Sealed classes'], ['switch_expressions', 'Switch expressions'],
      ['pattern_matching', 'Pattern matching for instanceof and switch'], ['record_patterns', 'Record patterns'],
    ]],
    ['reflection_annotations_proxies', 'Reflection, Annotations & Proxies', [
      ['class_reflection', 'Reflection basics'], ['custom_annotations', 'Custom annotations and retention'],
      ['dynamic_proxies', 'Dynamic proxies'], ['reflection_performance_security', 'Reflection cost and risks'],
    ]],
    ['datetime_networking', 'Date/Time & HTTP Client', [
      ['instant_local_zoned', 'Instant vs LocalDateTime vs ZonedDateTime'], ['timezone_dst', 'Time-zone and daylight-saving pitfalls'],
      ['httpclient_api', 'Java HTTP Client'],
    ]],
    ['advanced_io_nio', 'Files & I/O', [
      ['path_files', 'Path and Files APIs'], ['charset_bugs', 'Character encoding bugs'],
      ['large_file_processing', 'Processing large files'],
    ]],
    ['performance_engineering', 'Performance', [
      ['cpu_jvm_profiling', 'CPU and JVM profiling'], ['jfr', 'Java Flight Recorder (JFR)'],
      ['lock_contention', 'Lock contention'], ['jmh', 'JMH microbenchmarking'],
    ]],
    ['debugging_diagnostics', 'Production Diagnostics', [
      ['stack_traces', 'Reading stack traces'], ['thread_dump_analysis', 'Thread dumps'],
      ['deadlock_detection', 'Deadlock detection'], ['heap_dump_analysis', 'Heap-dump analysis'],
      ['jvm_cli_tools', 'jcmd, jstack and jmap'], ['production_incidents', 'Diagnosing production incidents'],
    ]],
    ['patterns_jdbc', 'Design Patterns & JDBC', [
      ['singleton_pitfalls', 'Singleton and its pitfalls'], ['factory_patterns', 'Factory Method and Abstract Factory'],
      ['builder_prototype', 'Builder and Prototype'], ['adapter_decorator_facade', 'Adapter, Decorator and Facade'],
      ['proxy_strategy', 'Proxy and Strategy'], ['observer_command_template', 'Observer, Command and Template Method'],
      ['chain_responsibility', 'Chain of Responsibility'], ['prepared_statement', 'PreparedStatement'],
      ['jdbc_transactions', 'JDBC transactions'], ['jdbc_batch', 'Batch processing'], ['connection_pooling', 'Connection pooling'],
    ]],
  ];

  const slug = (group, topic) => 'java_ca_' + group + '_' + topic;
  const groupSlugs = {
    runtime_compilation: 'java_ca_group_runtime_compilation', object_internals: 'java_ca_oop',
    hashmap_internals: 'java_ca_collections', generics_internals: 'java_ca_generics',
    advanced_exceptions: 'java_ca_exceptions', threading_fundamentals: 'java_ca_concurrency',
    functional_programming: 'java_ca_functional', jvm_memory_gc: 'java_ca_memory_gc',
    modern_java: 'java_ca_modern', advanced_io_nio: 'java_ca_io_nio',
    reflection_annotations_proxies: 'java_ca_reflection', datetime_networking: 'java_ca_datetime',
    performance_engineering: 'java_ca_performance',
    debugging_diagnostics: 'java_ca_diagnostics', patterns_jdbc: 'java_ca_patterns',
  };
  const topicSlug = (group, topic) => {
    if (group === 'runtime_compilation' && topic === 'jdk_jre_jvm') return 'java_ca_jdk_jre_jvm';
    if (group === 'runtime_compilation' && topic === 'pass_by_value') return 'java_ca_fundamentals';
    return slug(group, topic);
  };
  JT.coreAdvGroups = groups;
  JT.coreAdvTopicSlug = topicSlug;
  JT.coreAdvNav = [{ title: 'Java Core Advanced', items: [
    { slug: 'java_ca_home', title: 'Course Home' },
    ...groups.map(([id, title, topics]) => ({
      slug: groupSlugs[id] || 'java_ca_group_' + id,
      title,
      children: [
        { slug: groupSlugs[id] || 'java_ca_group_' + id, title: 'Section overview' },
        ...topics.map(([topicId, topicTitle]) => ({ slug: topicSlug(id, topicId), title: topicTitle })),
      ],
    })),
  ] }];

  JT.coreAdvOrder = [];
  JT.coreAdvInfo = {};
  for (const group of JT.coreAdvNav) {
    for (const item of group.items) {
      const children = item.children || [{ slug: item.slug, title: item.title }];
      for (const child of children) {
        if (JT.coreAdvInfo[child.slug]) continue;
        const nested = !!item.children;
        JT.coreAdvInfo[child.slug] = {
          title: child.title,
          parent: item,
          group: nested ? item.title : group.title,
          fullTitle: nested ? item.title + ' › ' + child.title : child.title,
          heading: nested && child.title !== 'Section overview' ? 'Java ' + child.title : item.title,
        };
        JT.coreAdvOrder.push(child.slug);
      }
    }
  }
  Object.assign(JT.navInfo, JT.coreAdvInfo);
})();
