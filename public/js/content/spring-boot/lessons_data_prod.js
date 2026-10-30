// Spring Boot lessons, part 2: Spring Data JPA and production readiness.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, ol, table, note } = JT.h;
  const K = JT.kit;
  const esc = JT.esc;
  const L = (id, title, body) => K.lesson('springboot_' + id, title, 'Spring Boot <span>' + esc(title) + '</span>', body);
  const boot = (code, out, module, title) => K.spring(code, out, { course: 'springboot', module, title });
  const topics = (id) => JT.springBootGroups.find((g) => g[0] === id)[2].map(([t, tt]) => ['springboot_' + t, tt]);
  const { bootMain, webStart } = JT.bootLesson;

  K.overview('springboot_group_jpa', 'Spring Data JPA', 'Spring Boot <span>Spring Data JPA</span>', [
    p('Spring Data JPA generates repository implementations, and Hibernate maps entities to tables. Most JPA performance and correctness problems in real projects come from a few topics: N+1 queries, lazy loading, the persistence context, locking and pagination.'),
    note('The examples count SQL statements with Hibernate statistics (<code>hibernate.generate_statistics=true</code>). In your own project, turn on <code>logging.level.org.hibernate.SQL=debug</code> to see each statement.'),
  ], topics('jpa'));
  K.overview('springboot_group_production', 'Production Readiness', 'Spring Boot <span>Production Readiness</span>', [
    p('What a service needs once real users depend on it: health checks, caching, safe scheduled jobs, robust calls to other services, and correctly sized pools.'),
  ], topics('production'));

  // Entities shared by several JPA examples.
  const authorBook = `@Entity
class Author {
    @Id @GeneratedValue Long id;
    String name;

    @OneToMany(mappedBy = "author")   // LAZY by default
    List<Book> books = new ArrayList<>();

    protected Author() { }
    Author(String name) { this.name = name; }
}

@Entity
class Book {
    @Id @GeneratedValue Long id;
    String title;

    @ManyToOne(fetch = FetchType.LAZY)
    Author author;

    protected Book() { }
    Book(String title, Author author) { this.title = title; this.author = author; }
}`;
  const jpaImports = `import jakarta.persistence.*;
import java.util.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;`;

  // ---------------------------------------------------------------- Repositories
  L('repositories', 'Repositories and query methods', () => [
    h2('What is a Spring Data repository?'),
    p('A repository is an interface. You extend <code>JpaRepository&lt;Entity, Id&gt;</code> and Spring Data creates the implementation at startup: <code>save</code>, <code>findById</code>, <code>findAll</code>, <code>delete</code> and more. You add queries by naming methods or with <code>@Query</code>.'),
    h2('Example'),
    boot(`import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Entity
class Product {
    @Id @GeneratedValue Long id;
    String name;
    String category;
    int price;

    protected Product() { }   // JPA needs a no-argument constructor
    Product(String name, String category, int price) { this.name = name; this.category = category; this.price = price; }

    @Override public String toString() { return name + " (" + price + ")"; }
}

interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryOrderByPriceAsc(String category);    // derived from the name

    long countByPriceGreaterThan(int price);

    @Query("select p from Product p where lower(p.name) like lower(concat('%', :text, '%'))")
    List<Product> search(@Param("text") String text);                // JPQL
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            ProductRepository products = context.getBean(ProductRepository.class);
            products.saveAll(List.of(
                new Product("Keyboard", "office", 40), new Product("Mouse", "office", 20),
                new Product("Monitor", "screens", 200), new Product("Desk lamp", "office", 35)));

            System.out.println("Office by price: " + products.findByCategoryOrderByPriceAsc("office"));
            System.out.println("Over 30: " + products.countByPriceGreaterThan(30));
            System.out.println("Search 'mo': " + products.search("mo"));
        }
    }
}`, `Office by price: [Mouse (20), Desk lamp (35), Keyboard (40)]
Over 30: 3
Search 'mo': [Mouse (20), Monitor (200)]`, 'data', 'Derived queries and @Query'),
    h2('How does it work?'),
    ul(['Boot sees H2 and the JPA starter, creates a <code>DataSource</code>, an <code>EntityManagerFactory</code>, and generates tables from the entities (<code>ddl-auto=create-drop</code> for embedded databases).',
      'Spring Data parses <code>findByCategoryOrderByPriceAsc</code> into <code>where category = ? order by price asc</code>. A typo in the name fails at startup.',
      '<code>@Query</code> uses JPQL: it queries entities and fields, not tables and columns. Named parameters are bound safely.',
      'Repository methods are transactional: reads use <code>readOnly = true</code>, <code>save</code> and <code>delete</code> use a normal transaction.']),
    h2('Important points'),
    ul(['Use derived names for simple queries; switch to <code>@Query</code> when the name gets long.',
      'Return DTO projections (an interface or record with only the needed fields) for read-only screens; they load less data.',
      '<code>save()</code> on a new entity calls <code>persist</code>; on an entity with an id it calls <code>merge</code>, which may first run a SELECT.',
      'For bulk changes, use <code>@Modifying @Query("update ...")</code>; it bypasses the persistence context, so loaded entities become stale.']),
    K.interview([
      ['How does Spring Data JPA create repository implementations?', 'At startup it creates a proxy for each repository interface, backed by <code>SimpleJpaRepository</code>. Query methods are parsed from method names or taken from <code>@Query</code>, and validated at startup.'],
      ['CrudRepository vs JpaRepository?', '<code>JpaRepository</code> extends <code>ListCrudRepository</code> and <code>ListPagingAndSortingRepository</code> and adds JPA-specific methods such as <code>flush</code>, <code>saveAndFlush</code> and batch deletes.'],
      ['JPQL vs native query?', 'JPQL works on entities and is portable. Native SQL (<code>nativeQuery = true</code>) uses database-specific features but ties you to the schema and dialect.'],
    ]),
  ]);

  // ---------------------------------------------------------------- N+1
  L('n_plus_one', 'The N+1 query problem', () => [
    h2('What is the N+1 problem?'),
    p('You load a list of N entities with one query, then access a lazy relation on each one. Hibernate runs one more query per entity: 1 + N queries in total. With 500 orders, that is 501 database round trips for one page.'),
    h2('Example'),
    boot(jpaImports + `
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.transaction.support.TransactionTemplate;

` + authorBook + `

interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("select a from Author a join fetch a.books")
    List<Author> findAllWithBooks();

    @EntityGraph(attributePaths = "books")
    List<Author> findAllBy();
}

interface BookRepository extends JpaRepository<Book, Long> { }

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn",
                            "spring.jpa.properties.hibernate.generate_statistics=true")
                .run()) {
            AuthorRepository authors = context.getBean(AuthorRepository.class);
            BookRepository books = context.getBean(BookRepository.class);
            for (String name : List.of("Ann", "Ben", "Cid")) {
                Author author = authors.save(new Author(name));
                books.save(new Book(name + "'s first book", author));
                books.save(new Book(name + "'s second book", author));
            }

            Statistics stats = context.getBean(EntityManagerFactory.class).unwrap(SessionFactory.class).getStatistics();
            TransactionTemplate tx = context.getBean(TransactionTemplate.class);

            stats.clear();
            tx.executeWithoutResult(s -> authors.findAll().forEach(a -> a.books.size()));
            System.out.println("findAll + books:  " + stats.getPrepareStatementCount() + " queries");

            stats.clear();
            tx.executeWithoutResult(s -> authors.findAllWithBooks().forEach(a -> a.books.size()));
            System.out.println("join fetch:       " + stats.getPrepareStatementCount() + " query");

            stats.clear();
            tx.executeWithoutResult(s -> authors.findAllBy().forEach(a -> a.books.size()));
            System.out.println("@EntityGraph:     " + stats.getPrepareStatementCount() + " query");
        }
    }
}`, `findAll + books:  4 queries
join fetch:       1 query
@EntityGraph:     1 query`, 'data', 'Counting the queries'),
    h2('How does it work?'),
    ul(['<code>findAll()</code> runs one query for the 3 authors. Each <code>a.books.size()</code> initializes a lazy collection with another query: 1 + 3 = 4.',
      '<code>join fetch</code> loads authors and their books in one SQL join.',
      '<code>@EntityGraph(attributePaths = "books")</code> tells Spring Data to fetch the relation in the same query, without writing JPQL.',
      'The work runs inside <code>TransactionTemplate</code> because lazy collections can only be loaded while the persistence context is open.']),
    h2('Other fixes and their trade-offs'),
    table(['Fix', 'When to use', 'Watch out'], [
      ['<code>join fetch</code> / <code>@EntityGraph</code>', 'You need the relation for every row', 'Fetching a collection together with pagination makes Hibernate paginate in memory; do not fetch two collections at once'],
      ['<code>hibernate.default_batch_fetch_size=50</code> or <code>@BatchSize</code>', 'Lazy relations accessed in loops', 'Turns N queries into N/50 queries, not one'],
      ['DTO projection query', 'Read-only lists for an API', 'Not managed entities: no lazy loading, no dirty checking'],
    ]),
    h2('How to find it'),
    p('Log SQL in development (<code>logging.level.org.hibernate.SQL=debug</code>), count statements in tests with Hibernate statistics, and look for the same SELECT repeated with different ids. Changing the relation to <code>EAGER</code> is not a fix: it usually causes the same extra queries everywhere.'),
    K.interview([
      ['What is the N+1 problem and how do you fix it?', 'One query loads N parents and each lazy relation access triggers another query. Fix it with a fetch join or <code>@EntityGraph</code> for the use case, batch fetching, or a DTO projection.'],
      ['Why not make the relation EAGER?', 'Eager fetching applies to every query of that entity, often still runs as separate selects, loads data you do not need, and cannot be turned off per query. Keep relations LAZY and fetch per use case.'],
      ['How do you detect N+1 queries?', 'SQL logging, Hibernate statistics or tools like datasource-proxy in tests to assert the query count, and APM traces in production showing repeated statements.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Lazy loading
  L('lazy_loading', 'Lazy loading and LazyInitializationException', () => [
    h2('What is lazy loading?'),
    p('A lazy relation is not loaded with its entity. Hibernate puts a proxy or an empty collection wrapper there and loads the data the first time you use it. This needs an open persistence context (normally, an open transaction).'),
    table(['Relation', 'Default fetch type', 'Recommendation'], [
      ['<code>@OneToMany</code>, <code>@ManyToMany</code>', 'LAZY', 'Keep LAZY'],
      ['<code>@ManyToOne</code>, <code>@OneToOne</code>', 'EAGER', 'Set <code>fetch = FetchType.LAZY</code>'],
    ]),
    h2('What is LazyInitializationException?'),
    p('It is thrown when you touch a lazy relation after the transaction has ended, so Hibernate can no longer run the query.'),
    h2('Example'),
    boot(jpaImports + `

` + authorBook + `

interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("select a from Author a join fetch a.books where a.id = :id")
    Optional<Author> findWithBooks(Long id);
}

interface BookRepository extends JpaRepository<Book, Long> { }

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            AuthorRepository authors = context.getBean(AuthorRepository.class);
            BookRepository books = context.getBean(BookRepository.class);
            Author ann = authors.save(new Author("Ann"));
            books.save(new Book("First", ann));
            books.save(new Book("Second", ann));

            Author loaded = authors.findById(ann.id).orElseThrow();   // transaction ends here
            try {
                System.out.println(loaded.books.size());
            } catch (org.hibernate.LazyInitializationException e) {
                System.out.println("Outside a transaction: LazyInitializationException");
            }

            Author withBooks = authors.findWithBooks(ann.id).orElseThrow();
            System.out.println("With join fetch: " + withBooks.books.size() + " books");
        }
    }
}`, `Outside a transaction: LazyInitializationException
With join fetch: 2 books`, 'data', 'Accessing a lazy collection too late'),
    h2('How does it work?'),
    ul(['<code>findById</code> runs in its own short transaction. When it returns, the persistence context is closed and <code>loaded</code> is detached.',
      'Touching <code>loaded.books</code> needs a query, but there is no session to run it.',
      'The fetch-join query loads the books together with the author, so nothing lazy is left to load.']),
    h2('Fixes'),
    ul(['Fetch what the use case needs in the query (<code>join fetch</code>, <code>@EntityGraph</code>) or query a DTO.',
      'Do the work inside a <code>@Transactional</code> service method and return DTOs, not entities.',
      'Do <strong>not</strong> “fix” it with <code>FetchType.EAGER</code> or <code>hibernate.enable_lazy_load_no_trans</code>; both hide N+1 problems.']),
    h2('Open Session in View'),
    p('Spring Boot enables <code>spring.jpa.open-in-view=true</code> by default (and logs a warning). It keeps the persistence context open until the HTTP response is written, so lazy loading works in controllers and during JSON serialization. The cost: database queries happen outside the service layer, a connection can be held for the whole request, and N+1 problems are hidden. Many teams set it to <code>false</code> and fetch explicitly.'),
    K.interview([
      ['What causes LazyInitializationException?', 'Accessing an uninitialized lazy proxy or collection after its persistence context (session) is closed, usually after the transaction ended or in the web layer with OSIV disabled.'],
      ['What is Open Session in View and should you use it?', 'It keeps the Hibernate session open for the whole web request. It avoids LazyInitializationException but hides query problems and holds connections longer; many teams disable it and use fetch joins or DTOs.'],
      ['What are the default fetch types?', 'To-many relations are LAZY; to-one relations (<code>@ManyToOne</code>, <code>@OneToOne</code>) are EAGER, and should usually be set to LAZY.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Dirty checking
  L('dirty_checking', 'Persistence context and dirty checking', () => [
    h2('What is the persistence context?'),
    p('The persistence context is Hibernate’s working memory for one transaction (one <code>EntityManager</code>). Every entity you load is kept there, at most once per id. This is also called the first-level cache.'),
    h2('What is dirty checking?'),
    p('At commit, Hibernate compares each managed entity with the state it had when it was loaded. If something changed, it writes an UPDATE automatically. You do not need to call <code>save()</code> for a managed entity.'),
    h2('Example'),
    boot(`import jakarta.persistence.*;
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Entity
class Product {
    @Id @GeneratedValue Long id;
    String name;
    int price;
    protected Product() { }
    Product(String name, int price) { this.name = name; this.price = price; }
}

interface ProductRepository extends JpaRepository<Product, Long> { }

@Service
class PriceService {
    private final ProductRepository products;
    PriceService(ProductRepository products) { this.products = products; }

    @Transactional
    public void raisePrice(long id, int amount) {
        Product product = products.findById(id).orElseThrow();
        product.price += amount;           // no save() call
    }

    @Transactional(readOnly = true)
    public boolean loadTwice(long id) {
        Product first = products.findById(id).orElseThrow();
        Product second = products.findById(id).orElseThrow();
        return first == second;
    }
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn",
                            "spring.jpa.properties.hibernate.generate_statistics=true")
                .run()) {
            ProductRepository products = context.getBean(ProductRepository.class);
            PriceService service = context.getBean(PriceService.class);
            long id = products.save(new Product("Keyboard", 40)).id;

            service.raisePrice(id, 10);
            System.out.println("Price after raisePrice (no save): " + products.findById(id).orElseThrow().price);

            Statistics stats = context.getBean(EntityManagerFactory.class).unwrap(SessionFactory.class).getStatistics();
            stats.clear();
            System.out.println("Same object in one transaction: " + service.loadTwice(id));
            System.out.println("SELECTs for two findById calls: " + stats.getPrepareStatementCount());
        }
    }
}`, `Price after raisePrice (no save): 50
Same object in one transaction: true
SELECTs for two findById calls: 1`, 'data', 'Automatic UPDATE and the first-level cache'),
    h2('How does it work?'),
    ul(['Inside <code>raisePrice</code>, the product is a <strong>managed</strong> entity. Changing its field marks it dirty; at commit Hibernate flushes an UPDATE.',
      'In <code>loadTwice</code>, the second <code>findById</code> finds the entity already in the persistence context, so no second SELECT is needed and the same object is returned.',
      '<code>readOnly = true</code> lets Hibernate skip dirty checking for that transaction, which saves memory and CPU for large reads.']),
    h2('Entity states'),
    table(['State', 'Meaning'], [
      ['Transient', 'Created with <code>new</code>, not known to Hibernate'],
      ['Managed', 'Loaded or persisted in the current persistence context; changes are tracked'],
      ['Detached', 'Was managed, but the context closed; changes are not tracked (use <code>merge</code>)'],
      ['Removed', 'Scheduled for deletion at flush'],
    ]),
    h2('Important points'),
    ul(['A flush also happens before a JPQL query that touches changed tables, so the query sees your changes.',
      'Unexpected UPDATEs at commit often come from setters called “just for display” on managed entities.',
      'Loading thousands of entities in one transaction fills the persistence context. Process large data in batches and call <code>clear()</code>, or use projections.']),
    K.interview([
      ['What is dirty checking?', 'At flush, Hibernate compares managed entities with their loaded snapshot and issues UPDATE statements for changed ones. Explicit <code>save</code> calls are not needed for managed entities.'],
      ['What is the first-level cache?', 'The persistence context: within one EntityManager, each entity id maps to one object, so repeated lookups by id return the same instance without another query.'],
      ['persist vs merge?', '<code>persist</code> makes a new (transient) entity managed. <code>merge</code> copies the state of a detached entity onto a managed one (loading it if necessary) and returns the managed copy.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Optimistic locking
  L('optimistic_locking', 'Optimistic locking with @Version', () => [
    h2('What problem does it solve?'),
    p('Two users open the same product. User A changes the price and saves. User B, still looking at the old data, changes the description and saves. Without protection, B’s save overwrites A’s change: a <strong>lost update</strong>.'),
    h2('What is optimistic locking?'),
    p('Add a <code>@Version</code> field. Every UPDATE checks and increments it: <code>update product set ..., version = 1 where id = ? and version = 0</code>. If another transaction already changed the row, no row matches and Spring throws <code>ObjectOptimisticLockingFailureException</code>.'),
    h2('Example'),
    boot(`import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.orm.ObjectOptimisticLockingFailureException;

@Entity
class Product {
    @Id @GeneratedValue Long id;
    String name;
    int price;

    @Version
    Long version;

    protected Product() { }
    Product(String name, int price) { this.name = name; this.price = price; }
}

interface ProductRepository extends JpaRepository<Product, Long> { }

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            ProductRepository products = context.getBean(ProductRepository.class);
            long id = products.save(new Product("Keyboard", 40)).id;

            Product userA = products.findById(id).orElseThrow();
            Product userB = products.findById(id).orElseThrow();
            System.out.println("Both users loaded version " + userA.version);

            userA.price = 45;
            products.save(userA);
            System.out.println("User A saved; version is now " + products.findById(id).orElseThrow().version);

            userB.name = "Mechanical keyboard";
            try {
                products.save(userB);
            } catch (ObjectOptimisticLockingFailureException e) {
                System.out.println("User B rejected: " + e.getClass().getSimpleName());
            }
        }
    }
}`, `Both users loaded version 0
User A saved; version is now 1
User B rejected: ObjectOptimisticLockingFailureException`, 'data', 'Detecting a lost update'),
    h2('How does it work?'),
    ul(['Each <code>findById</code> runs in its own transaction, so <code>userA</code> and <code>userB</code> are two detached copies, like two browser tabs.',
      'User A’s save updates the row from version 0 to 1.',
      'User B’s copy still says version 0. Hibernate detects the stale version and Spring translates the error.']),
    h2('Handling the conflict'),
    ul(['In an API, return <strong>409 Conflict</strong> and let the client reload; or send the version to clients and back (or use an <code>ETag</code> / <code>If-Match</code> header).',
      'For automatic background updates, retry the whole transaction (re-read, re-apply, save).',
      'Pessimistic locking (<code>@Lock(LockModeType.PESSIMISTIC_WRITE)</code>, <code>SELECT ... FOR UPDATE</code>) blocks other writers instead. Use it for short, high-contention updates such as reserving stock.']),
    K.interview([
      ['Optimistic vs pessimistic locking?', 'Optimistic locking assumes conflicts are rare: no locks are held, and a version check detects conflicts at write time. Pessimistic locking takes a database lock when reading so others wait. Optimistic scales better; pessimistic suits hot rows with frequent conflicts.'],
      ['How does @Version work?', 'Hibernate adds <code>where version = ?</code> to UPDATE and DELETE statements and increments the version. Zero affected rows means someone else changed the row, so it throws an optimistic lock exception.'],
      ['How do you prevent lost updates in a REST API?', 'Include the version (or an ETag) in the GET response and require it on PUT/PATCH; reject stale updates with 409 or 412.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Pagination
  L('pagination', 'Pagination and sorting', () => [
    h2('What is pagination?'),
    p('Pagination returns a large result in pages: page 0 with 20 items, page 1 with the next 20, and so on. In Spring Data you pass a <code>Pageable</code> to a repository method.'),
    h2('Example'),
    boot(`import jakarta.persistence.*;
import java.util.List;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

@Entity
class Product {
    @Id @GeneratedValue Long id;
    String name;
    int price;
    protected Product() { }
    Product(String name, int price) { this.name = name; this.price = price; }
    @Override public String toString() { return name; }
}

interface ProductRepository extends JpaRepository<Product, Long> {
    Slice<Product> findByPriceLessThan(int price, Pageable pageable);
}

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            ProductRepository products = context.getBean(ProductRepository.class);
            products.saveAll(List.of(new Product("A", 10), new Product("B", 20), new Product("C", 30),
                new Product("D", 40), new Product("E", 50), new Product("F", 60), new Product("G", 70)));

            Page<Product> page = products.findAll(PageRequest.of(1, 3, Sort.by("price").descending()));
            System.out.println("Page " + (page.getNumber() + 1) + " of " + page.getTotalPages()
                + ": " + page.getContent() + " (total " + page.getTotalElements() + ")");

            Slice<Product> slice = products.findByPriceLessThan(45, PageRequest.of(0, 2, Sort.by("price")));
            System.out.println("Slice: " + slice.getContent() + ", has next: " + slice.hasNext());
        }
    }
}`, `Page 2 of 3: [D, C, B] (total 7)
Slice: [A, B], has next: true`, 'data', 'Page vs Slice'),
    h2('How does it work?'),
    ul(['<code>PageRequest.of(1, 3, ...)</code> means the second page (pages start at 0), 3 items per page.',
      'A <code>Page</code> runs two queries: the rows (<code>limit 3 offset 3</code>) and a <code>count(*)</code> for the total.',
      'A <code>Slice</code> skips the count. It fetches one extra row to know whether a next page exists. Use it for “load more” lists over big tables.',
      'In a controller, add a <code>Pageable</code> parameter and Spring reads <code>?page=1&amp;size=3&amp;sort=price,desc</code>. Limit the maximum page size.']),
    h2('Deep pages are slow'),
    p('<code>OFFSET 100000</code> makes the database read and discard 100,000 rows. For large or infinite lists, use <strong>keyset (cursor) pagination</strong>: remember the last value and ask for the next ones.'),
    K.show(`// First page: ... order by id limit 20
// Next page:  ... where id > :lastSeenId order by id limit 20
List<Product> findTop20ByIdGreaterThanOrderByIdAsc(Long lastSeenId);`, 'Keyset pagination', 'java'),
    h2('Important points'),
    ul(['Always sort by a unique column (or add the id as a tie-breaker); otherwise rows can repeat or disappear between pages.',
      'Return your own response DTO (content plus page metadata) rather than serializing Spring’s <code>PageImpl</code>, whose JSON structure is not a stable API.',
      'Do not combine collection fetch joins with pagination; Hibernate then paginates in memory.']),
    K.interview([
      ['Page vs Slice?', '<code>Page</code> knows the total count (an extra count query). <code>Slice</code> only knows whether there is a next slice, which is cheaper on large tables.'],
      ['Why is offset pagination slow for deep pages and what is the alternative?', 'The database must scan and skip all earlier rows. Keyset pagination filters by the last seen sort key (<code>where id &gt; ?</code>) and uses an index, so every page costs the same.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Flyway
  L('migrations', 'Database migrations with Flyway', () => [
    h2('What is a database migration?'),
    p('A migration is a versioned SQL script that changes the schema: create a table, add a column, add an index. A tool such as Flyway or Liquibase runs the scripts that have not run yet and records them in a history table.'),
    h2('Why is it used?'),
    p('Every environment — your laptop, CI, staging, production — gets the same schema in the same order, and every change is reviewed in Git. <code>spring.jpa.hibernate.ddl-auto=update</code> is not safe for production: it cannot rename, migrate data or drop safely, and you cannot review what it does.'),
    h2('Setup'),
    K.show(`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-postgresql</artifactId>
</dependency>`, 'pom.xml'),
    K.show(`src/main/resources/db/migration/
    V1__create_product.sql
    V2__add_product_category.sql
    V3__index_product_category.sql`, 'Migration files'),
    K.show(`-- V2__add_product_category.sql
ALTER TABLE product ADD COLUMN category VARCHAR(50);
UPDATE product SET category = 'general' WHERE category IS NULL;
ALTER TABLE product ALTER COLUMN category SET NOT NULL;`, 'A migration that also fixes existing data'),
    K.show(`spring.jpa.hibernate.ddl-auto=validate   # Hibernate only checks that entities match the schema`, 'application.properties'),
    h2('How does it work?'),
    ol(['At startup, Boot runs Flyway before JPA starts.',
      'Flyway reads the <code>flyway_schema_history</code> table and runs each newer <code>V&lt;n&gt;__name.sql</code> file in version order, each in a transaction where the database supports it.',
      'It stores a checksum per script. Editing a script that already ran makes startup fail, so never change applied migrations; add a new one.']),
    h2('Zero-downtime changes'),
    p('During a rolling deployment, old and new application versions run at the same time against the same schema. Make changes in compatible steps (expand and contract): add the new column, deploy code that writes both, migrate data, deploy code that reads the new column, then drop the old column in a later release.'),
    K.interview([
      ['Why use Flyway or Liquibase instead of ddl-auto?', 'Migrations are versioned, reviewed, repeatable and can transform data. <code>ddl-auto=update</code> is unpredictable and cannot handle renames or data changes; use <code>validate</code> or <code>none</code> in production.'],
      ['How do you rename a column without downtime?', 'Expand and contract: add the new column, write to both, backfill, switch reads, then remove the old column in a later migration.'],
      ['What happens if you edit a migration that already ran?', 'Flyway detects the checksum mismatch and fails at startup. Applied migrations are immutable; create a new migration instead.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Actuator
  L('actuator', 'Actuator, health checks and shutdown', () => [
    h2('What is Actuator?'),
    p('Spring Boot Actuator adds production endpoints to your application: <code>/actuator/health</code> for load balancers and Kubernetes, <code>/actuator/metrics</code> and <code>/actuator/prometheus</code> for monitoring, and others such as <code>info</code>, <code>loggers</code> and <code>env</code>.'),
    h2('Example: a custom health indicator'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
class PaymentProviderHealth implements HealthIndicator {
    static volatile boolean reachable = true;   // a real check would call the provider

    @Override
    public Health health() {
        return reachable ? Health.up().build()
                         : Health.down().withDetail("error", "connection refused").build();
    }
}

` + bootMain(['"server.port=0"'], webStart + `
            System.out.println(check(http));
            PaymentProviderHealth.reachable = false;
            System.out.println(check(http));`, `
    static String check(RestClient http) {
        return http.get().uri("/actuator/health").exchange((req, res) ->
            res.getStatusCode().value() + " " + new String(res.getBody().readAllBytes()));
    }
`), `200 {"groups":["liveness","readiness"],"status":"UP"}
503 {"groups":["liveness","readiness"],"status":"DOWN"}`, 'actuator', 'Health goes DOWN with a dependency'),
    h2('How does it work?'),
    ul(['Every <code>HealthIndicator</code> bean contributes to the overall status. Boot adds indicators for the database, disk space, Redis and so on automatically.',
      'If any indicator is DOWN, the overall status is DOWN and the HTTP status is 503, so a load balancer stops sending traffic.',
      'Details are hidden by default. <code>management.endpoint.health.show-details=when-authorized</code> shows them to authorized users.',
      'In Spring Boot 4, health classes are in <code>org.springframework.boot.health.contributor</code>.']),
    h2('Liveness and readiness'),
    table(['Probe', 'Question', 'If it fails'], [
      ['<code>/actuator/health/liveness</code>', 'Is the process healthy, or stuck and in need of a restart?', 'Kubernetes restarts the container'],
      ['<code>/actuator/health/readiness</code>', 'Can it serve traffic right now?', 'Kubernetes stops routing requests to it'],
    ]),
    p('Do not put external dependencies into the liveness probe: if the database is down, restarting every instance does not help and makes things worse.'),
    h2('Graceful shutdown'),
    p('Spring Boot shuts down gracefully by default (<code>server.shutdown=graceful</code>): on SIGTERM it stops accepting new requests, readiness turns to “refusing traffic”, in-flight requests may finish within <code>spring.lifecycle.timeout-per-shutdown-phase</code> (30s by default), then beans are destroyed.'),
    h2('Important points'),
    ul(['Over HTTP only <code>health</code> is exposed by default. Expose more with <code>management.endpoints.web.exposure.include=health,info,prometheus</code>.',
      'Never expose <code>env</code>, <code>heapdump</code>, <code>threaddump</code> or <code>loggers</code> publicly. Put management endpoints on a separate port (<code>management.server.port</code>) or secure them.',
      'Metrics use Micrometer: <code>http.server.requests</code>, JVM memory, connection pool usage and your own counters and timers.']),
    K.interview([
      ['Liveness vs readiness probe?', 'Liveness says whether the process should be restarted. Readiness says whether it should receive traffic. Dependencies may affect readiness but should not affect liveness.'],
      ['How do you add a custom health check?', 'Implement <code>HealthIndicator</code> as a bean and return <code>Health.up()</code> or <code>Health.down()</code> with details. Optionally include it in a health group such as readiness.'],
      ['How does graceful shutdown work in Spring Boot?', 'On shutdown the web server stops accepting requests and waits for active ones up to the configured timeout, the application reports not-ready, and then the context closes beans in order.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Caching
  L('caching', 'Caching with @Cacheable', () => [
    h2('What is @Cacheable?'),
    p('<code>@Cacheable("rates")</code> stores a method’s result in a cache, keyed by its arguments. The next call with the same arguments returns the cached value without running the method.'),
    h2('Example'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
class ExchangeRateService {
    @Cacheable("rates")
    public double rate(String currency) {
        System.out.println("  loading " + currency + " from the rate provider...");
        return currency.equals("EUR") ? 1.08 : 1.27;
    }

    @CacheEvict(value = "rates", key = "#currency")
    public void refresh(String currency) { }
}

@SpringBootApplication
@EnableCaching
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            ExchangeRateService rates = context.getBean(ExchangeRateService.class);
            System.out.println("EUR " + rates.rate("EUR"));
            System.out.println("EUR " + rates.rate("EUR"));
            System.out.println("GBP " + rates.rate("GBP"));
            rates.refresh("EUR");
            System.out.println("EUR " + rates.rate("EUR"));
        }
    }
}`, `  loading EUR from the rate provider...
EUR 1.08
EUR 1.08
  loading GBP from the rate provider...
GBP 1.27
  loading EUR from the rate provider...
EUR 1.08`, 'cache', 'Cache hits, misses and eviction'),
    h2('How does it work?'),
    ul(['<code>@EnableCaching</code> wraps the bean in a proxy. The proxy checks the cache before calling the method.',
      'The first EUR call is a miss: the method runs and the result is stored. The second is a hit: the method does not run.',
      '<code>@CacheEvict</code> removes the EUR entry, so the next call loads it again. <code>@CachePut</code> always runs the method and updates the cache.',
      'Without a cache library, Boot uses a simple in-memory <code>ConcurrentHashMap</code> cache. Add Caffeine for size limits and expiry, or Redis for a cache shared by all instances.']),
    h2('Common pitfalls'),
    ul(['<strong>Self-invocation</strong>: calling a <code>@Cacheable</code> method through <code>this</code> skips the cache.',
      '<strong>No expiry</strong>: the default cache grows forever and never refreshes. Configure TTL and maximum size (Caffeine: <code>spring.cache.caffeine.spec=maximumSize=1000,expireAfterWrite=10m</code>).',
      '<strong>Stale data across instances</strong>: each instance has its own local cache, and an eviction on one does not reach the others. Use a shared cache or short TTLs.',
      '<strong>Mutable cached objects</strong>: callers that change a returned object change the cached copy. Cache immutable values.',
      '<strong>Cache stampede</strong>: many requests miss at once and all hit the database. <code>@Cacheable(sync = true)</code> lets one caller load the value.']),
    K.interview([
      ['How does @Cacheable work?', 'A proxy intercepts the call, builds a key from the arguments (or a SpEL <code>key</code>), returns the cached value if present, otherwise invokes the method and stores the result.'],
      ['How do you keep a cache consistent with the database?', 'Evict or update entries when data changes (<code>@CacheEvict</code>/<code>@CachePut</code>, ideally after commit), set a TTL as a safety net, and use a shared cache when several instances must agree.'],
      ['Local cache vs Redis?', 'A local cache (Caffeine) is fastest but per instance. Redis is shared and survives restarts but adds a network hop, serialization and another system to run.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Scheduling
  L('scheduling', 'Scheduled jobs', () => [
    h2('What is @Scheduled?'),
    p('<code>@Scheduled</code> runs a method repeatedly: at a fixed rate, with a fixed delay between runs, or on a cron schedule. Enable it with <code>@EnableScheduling</code>.'),
    table(['Option', 'Meaning'], [
      ['<code>fixedRate = 60000</code>', 'Start every 60 s, measured from the previous start'],
      ['<code>fixedDelay = 60000</code>', 'Wait 60 s after the previous run finishes'],
      ['<code>cron = "0 0 2 * * *", zone = "Europe/London"</code>', 'Every day at 02:00 London time (seconds field first)'],
    ]),
    h2('Example'),
    boot(`import java.util.concurrent.CountDownLatch;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

@Component
class CleanupJob {
    static final CountDownLatch threeRuns = new CountDownLatch(3);
    private int runs = 0;

    @Scheduled(fixedDelay = 100)
    void removeExpiredSessions() {
        if (threeRuns.getCount() == 0) return;
        System.out.println("Run " + (++runs) + " on " + Thread.currentThread().getName());
        threeRuns.countDown();
    }
}

@SpringBootApplication
@EnableScheduling
public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            CleanupJob.threeRuns.await();
        }
    }
}`, `Run 1 on scheduling-1
Run 2 on scheduling-1
Run 3 on scheduling-1`, 'core', 'A job that runs every 100 ms'),
    h2('How does it work?'),
    ul(['Boot creates a <code>ThreadPoolTaskScheduler</code> with <strong>one</strong> thread named <code>scheduling-1</code> by default. A slow job delays every other job.',
      'Increase it with <code>spring.task.scheduling.pool.size=4</code> if you have several independent jobs.',
      'An exception in a run is logged and the next run still happens.']),
    h2('The multi-instance problem'),
    p('If your service runs on three instances, each instance runs the job: the nightly report is sent three times. Solutions:'),
    ul(['A distributed lock such as <strong>ShedLock</strong> (<code>@SchedulerLock</code>), which uses a database table so only one instance runs each job.',
      'Run the job outside the service: a Kubernetes CronJob, or a dedicated worker instance.',
      'Make jobs idempotent and process records with <code>SELECT ... FOR UPDATE SKIP LOCKED</code> so instances share the work safely.']),
    K.interview([
      ['fixedRate vs fixedDelay?', '<code>fixedRate</code> schedules starts at a constant interval; <code>fixedDelay</code> waits the given time after each run finishes, so runs never overlap and slow runs push the schedule back.'],
      ['How do you make sure a scheduled job runs on only one instance?', 'Use a distributed lock (ShedLock with a database table, or a Redis lock), an external scheduler such as a Kubernetes CronJob, or row-level locking so instances split the work.'],
      ['Why did one slow scheduled job block the others?', 'Boot’s default scheduler pool has one thread. Increase <code>spring.task.scheduling.pool.size</code> or move long work to an executor.'],
    ]),
  ]);

  // ---------------------------------------------------------------- RestClient
  L('rest_client', 'Calling external APIs with RestClient', () => [
    h2('What is RestClient?'),
    p('<code>RestClient</code> is Spring’s modern synchronous HTTP client (Spring Framework 6.1+) with a fluent API. It replaces <code>RestTemplate</code> for new code. <code>WebClient</code> is the reactive alternative.'),
    h2('Example: timeouts and error handling'),
    p('The application calls its own endpoints here, so the example needs no external service.'),
    boot(`import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.http.*;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.*;

record Rate(String currency, double value) { }

class RateNotFoundException extends RuntimeException {
    RateNotFoundException(String message) { super(message); }
}

@RestController
class FakeRateProvider {   // stands in for a remote service
    @GetMapping("/rates/{currency}")
    ResponseEntity<Rate> rate(@PathVariable String currency) {
        return currency.equals("EUR") ? ResponseEntity.ok(new Rate("EUR", 1.08)) : ResponseEntity.notFound().build();
    }

    @GetMapping("/slow")
    String slow() throws InterruptedException {
        Thread.sleep(2500);
        return "too late";
    }
}

` + bootMain(['"server.port=0"'], `            String port = context.getEnvironment().getProperty("local.server.port");

            JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build());
            factory.setReadTimeout(Duration.ofSeconds(1));

            RestClient rates = RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .requestFactory(factory)
                .defaultStatusHandler(HttpStatusCode::is4xxClientError, (request, response) -> {
                    throw new RateNotFoundException("Provider returned " + response.getStatusCode().value());
                })
                .build();

            Rate eur = rates.get().uri("/rates/{c}", "EUR").retrieve().body(Rate.class);
            System.out.println("EUR: " + eur.value());

            try {
                rates.get().uri("/rates/{c}", "XYZ").retrieve().body(Rate.class);
            } catch (RateNotFoundException e) {
                System.out.println("XYZ: " + e.getMessage());
            }

            try {
                rates.get().uri("/slow").retrieve().body(String.class);
            } catch (ResourceAccessException e) {
                System.out.println("Slow call failed after the read timeout: " + e.getClass().getSimpleName());
            }`), `EUR: 1.08
XYZ: Provider returned 404
Slow call failed after the read timeout: ResourceAccessException`, 'web', 'A client with timeouts and error mapping'),
    h2('How does it work?'),
    ul(['The request factory sets a <strong>connect timeout</strong> (how long to wait for a connection) and a <strong>read timeout</strong> (how long to wait for the response). Without them a hanging remote service can block your request threads indefinitely.',
      '<code>.retrieve().body(Rate.class)</code> converts the JSON response into a record.',
      '<code>defaultStatusHandler</code> turns 4xx responses into your own exception. Without it, RestClient throws <code>HttpClientErrorException</code> for 4xx and <code>HttpServerErrorException</code> for 5xx.',
      'A timeout or connection failure throws <code>ResourceAccessException</code>.']),
    h2('Important points'),
    ul(['Create one configured client per remote service and reuse it; do not build a new client per request.',
      'In Spring Boot 4, <code>spring-boot-starter-restclient</code> provides an auto-configured <code>RestClient.Builder</code> bean that you can customize centrally.',
      'Declarative clients: an interface annotated with <code>@GetExchange</code> and an <code>HttpServiceProxyFactory</code> (or Boot’s HTTP service client support) remove the boilerplate.',
      'Add retries only for idempotent requests, and log the remote status and a correlation id, not the full response body.']),
    K.interview([
      ['RestTemplate vs RestClient vs WebClient?', '<code>RestTemplate</code> is the older synchronous template API (in maintenance). <code>RestClient</code> is the modern fluent synchronous client. <code>WebClient</code> is non-blocking and reactive, useful with WebFlux or for many concurrent calls.'],
      ['Why are timeouts essential?', 'Without them, a slow dependency ties up request threads and connections until your own service stops responding — a cascading failure.'],
      ['Connect timeout vs read timeout?', 'Connect timeout limits establishing the TCP/TLS connection. Read (response) timeout limits waiting for data after the request is sent.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Resilience
  L('resilience', 'Retries, circuit breakers and idempotency', () => [
    h2('Why is resilience needed?'),
    p('Remote calls fail: timeouts, restarts, overloaded services. A resilient service retries short glitches, stops calling a dependency that is clearly down, and makes sure retried requests do not do the same work twice.'),
    h2('Retries with Spring Framework 7'),
    p('Spring Framework 7 includes <code>@Retryable</code> in <code>spring-context</code>; enable it with <code>@EnableResilientMethods</code>.'),
    boot(`import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.resilience.annotation.EnableResilientMethods;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
class InventoryClient {
    private int calls = 0;

    @Retryable(maxRetries = 2, delay = 100)   // up to 2 retries, 100 ms apart
    public String stock(String sku) {
        calls++;
        System.out.println("Call " + calls);
        if (calls < 3) throw new IllegalStateException("503 from inventory service");
        return sku + ": 7 in stock";
    }
}

@SpringBootApplication
@EnableResilientMethods
public class Main {
    public static void main(String[] args) {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn")
                .run()) {
            System.out.println(context.getBean(InventoryClient.class).stock("A1"));
        }
    }
}`, `Call 1
Call 2
Call 3
A1: 7 in stock`, 'core', 'Retrying a failing call'),
    h2('Retry rules'),
    ul(['Retry only <strong>transient</strong> errors (timeouts, 503) — not 400 or 404.',
      'Use exponential backoff with jitter (<code>multiplier</code>, <code>jitter</code>), so many clients do not retry at the same moment.',
      'Retry only idempotent operations, or make the operation idempotent first (see below).',
      'Limit the total time: retries inside retries (client, gateway, service) multiply the load.']),
    h2('Circuit breaker'),
    p('A circuit breaker counts failures. When the failure rate is too high it <strong>opens</strong> and fails calls immediately (or returns a fallback) instead of waiting for timeouts. After a wait it goes <strong>half-open</strong> and lets a few test calls through; if they succeed it <strong>closes</strong> again. Resilience4j is the common library:'),
    K.show(`@CircuitBreaker(name = "inventory", fallbackMethod = "stockUnknown")
public String stock(String sku) {
    return inventoryClient.get().uri("/stock/{sku}", sku).retrieve().body(String.class);
}

private String stockUnknown(String sku, Throwable error) {
    return sku + ": availability unknown";   // degrade instead of failing the whole page
}`, 'Resilience4j circuit breaker (resilience4j-spring-boot3 / Spring Cloud CircuitBreaker)', 'java'),
    h2('Idempotency keys'),
    p('If a client retries a payment because the response timed out, the server might charge twice. With an idempotency key, the client sends the same unique key with each retry, and the server returns the stored result instead of doing the work again.'),
    K.java(`import java.util.*;

public class Main {
    static final Map<String, String> processed = new HashMap<>();
    static int charges = 0;

    static String pay(String idempotencyKey, int amount) {
        return processed.computeIfAbsent(idempotencyKey, key -> {
            charges++;
            return "payment-" + charges + " for " + amount;
        });
    }

    public static void main(String[] args) {
        System.out.println(pay("7f3a-order-42", 500));
        System.out.println(pay("7f3a-order-42", 500));   // client retry after a timeout
        System.out.println("Cards charged: " + charges);
    }
}`, `payment-1 for 500
payment-1 for 500
Cards charged: 1`, 'The same key returns the same result'),
    p('In production, store keys in the database with a unique constraint, in the same transaction as the business change, and expire them after a while. Message consumers use the same idea: store processed message IDs so a redelivered message is ignored.'),
    K.interview([
      ['How does a circuit breaker work?', 'It tracks recent call results. Above a failure threshold it opens and rejects calls immediately (often returning a fallback), after a wait it half-opens to test the dependency, and it closes when calls succeed again.'],
      ['When should you not retry?', 'For non-transient errors (4xx), for non-idempotent operations without an idempotency key, and when the caller’s own timeout would already be exceeded.'],
      ['How do you make a POST idempotent?', 'Require a client-generated idempotency key, store it with the result under a unique constraint, and return the stored result for repeats.'],
    ]),
  ]);

  // ---------------------------------------------------------------- Pools
  L('connection_pool', 'Connection and thread pools', () => [
    h2('What is a connection pool?'),
    p('Opening a database connection is slow (TCP, TLS, authentication). A connection pool keeps a set of open connections and lends one to each transaction. Spring Boot uses <strong>HikariCP</strong> by default.'),
    h2('Example: what happens when the pool is exhausted'),
    boot(`import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Main {
    public static void main(String[] args) throws Exception {
        try (var context = new SpringApplicationBuilder(Main.class)
                .properties("spring.main.banner-mode=off", "logging.level.root=warn",
                            "spring.datasource.hikari.pool-name=shop-pool",
                            "spring.datasource.hikari.maximum-pool-size=2",
                            "spring.datasource.hikari.connection-timeout=500")
                .run()) {
            HikariDataSource pool = (HikariDataSource) context.getBean(DataSource.class);
            System.out.println(pool.getPoolName() + ": maximum " + pool.getMaximumPoolSize() + " connections");

            try (Connection first = pool.getConnection(); Connection second = pool.getConnection()) {
                try (Connection third = pool.getConnection()) {
                    System.out.println("Got a third connection");
                } catch (SQLException e) {
                    System.out.println("Third request after 500 ms: " + e.getClass().getSimpleName());
                }
            }
        }
    }
}`, `shop-pool: maximum 2 connections
Third request after 500 ms: SQLTransientConnectionException`, 'data', 'Waiting for a free connection'),
    h2('How does it work?'),
    ul(['Two connections are borrowed and not returned, so the pool is empty.',
      'The third request waits up to <code>connection-timeout</code> (default 30 s) for a connection to be returned, then fails.',
      'In production, this error usually means connections are held too long: slow queries, long transactions, remote calls inside a transaction, or a leak.']),
    h2('Sizing'),
    ul(['Bigger is not better. The database can only run a limited number of queries in parallel; a common starting point is about <code>2 × CPU cores</code> of the database server, then measure.',
      'All instances share the database: 10 instances × 20 connections = 200 connections.',
      'Tomcat has 200 request threads by default (<code>server.tomcat.threads.max</code>). If requests need a connection and the pool has 10, the rest wait. That is fine when transactions are short.',
      'Monitor <code>hikaricp.connections.active</code> and <code>hikaricp.connections.pending</code> through Actuator metrics. Set <code>leak-detection-threshold</code> to find connections that are not returned.']),
    h2('Virtual threads'),
    p('On Java 21+, <code>spring.threads.virtual.enabled=true</code> makes Tomcat, <code>@Async</code> and scheduling use virtual threads. Blocking I/O becomes cheap, so you no longer size request thread pools. The connection pool is still the limit: thousands of virtual threads still share the same few database connections.'),
    K.interview([
      ['What happens when the connection pool is exhausted?', 'New requests wait up to the connection timeout and then fail with <code>SQLTransientConnectionException</code>. Requests pile up and latency grows, so find what holds connections: slow queries, long transactions or leaks.'],
      ['How do you size a HikariCP pool?', 'Start small (roughly twice the database cores), consider the total across all instances, and adjust from metrics such as pending connections and query latency. More connections often make a database slower.'],
      ['Do virtual threads remove the need for connection pools?', 'No. They make waiting cheap for the application, but the database still handles a limited number of connections and concurrent queries.'],
    ]),
  ]);
})();
