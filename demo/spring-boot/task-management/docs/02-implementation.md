# Implementation and learning guide

The original six phases are implemented with H2 replacing PostgreSQL. The
application is a REST API: controllers return JSON, and clients carry bearer
tokens. There are no server-rendered pages or login sessions.

## Phase 1: database foundation

`pom.xml` selects Java 25 and Boot 4.1.2. The Boot parent manages compatible
Spring, Hibernate, H2, Flyway, and test-library versions. Springdoc is pinned to
3.2.0 using its Boot 4.1.x compatibility matrix.

`src/main/resources/application.yml` uses file-backed H2 and disables Open Session
in View. `db/migration/V1__initial_schema.sql` creates the five domain tables and
constraints. Boot runs Flyway before creating the JPA EntityManagerFactory;
Hibernate then validates mappings against the existing schema. There is no
`ddl-auto=update` and no schema silently created by Hibernate.

The request-to-database stack is:

1. A REST controller binds and validates a request DTO.
2. A service starts a `@Transactional` unit of work and checks permissions.
3. A Spring Data `JpaRepository` loads/persists entities.
4. JPA is the persistence API; Hibernate implements it and translates entity work
   into SQL. Hibernate's persistence context tracks changed managed fields.
5. JDBC sends SQL through the H2 driver to the embedded H2 database. HikariCP
   supplies pooled database connections.
6. The service maps entities into DTOs while its transaction is still open.

`@Entity` makes a class persistent. `@Id` identifies its primary key;
`@GeneratedValue(IDENTITY)` lets H2 allocate numeric IDs. `@ManyToOne` models
foreign-key references: many tasks belong to one project, for example. Unneeded
bidirectional collections are omitted, avoiding recursive serialization and
large object graphs. Relationships are lazy; getters safely initialize Hibernate
proxies inside service transactions. The compact entities use JPA field access
for mapped state, plus getters for proxy-safe reads. Do not read a lazy proxy's
public fields directly. DTOs expose IDs rather than entity graphs or passwords.

`ProjectMembership` is its own entity because the link carries a membership role.
The database's `(project_id,user_id)` unique key prevents duplicate membership.
`@Version` causes Hibernate to include the task version in updates; a stale
version cannot silently overwrite a newer edit.

Verify: run `./mvnw.cmd clean verify`, then start the JAR with a JWT key. Startup
logs must show Flyway migration/validation and Hibernate initialization. Health
must return UP. In a fresh database, Flyway creates all five domain tables plus
its schema-history table. A restart validates the existing migration instead of
creating the tables again. File-backed H2 keeps application data across restarts.

## Phase 2: authentication and JWT

`dto/Api.java` uses Java records for request/response shapes. `@NotBlank`, `@Email`,
`@Size`, `@FutureOrPresent`, and `@Valid` reject invalid requests before business
logic. Registration cannot accept a role or password hash. Unknown JSON fields
are rejected. Passwords are limited to 72 UTF-8 bytes because of BCrypt's input
limit, and stored hashes are never returned by profile DTOs.

`AuthService` normalizes email addresses, registers with BCrypt, and invokes
Spring Security's `AuthenticationManager` on login. `DaoAuthenticationProvider`
uses the configured `UserDetailsService` to look up the user and compare the
password through `PasswordEncoder`. Incorrect credentials return 401.

`SecurityConfig` configures Spring Security's resource-server JWT support.
Nimbus signs HS256 tokens and validates incoming signatures. The configured
validator checks issuer, audience, and timestamps; expiry must be present.
A secret must be supplied from the environment and decode to at least 32 bytes.
Tokens expire after 15 minutes, subject to the framework's clock-skew allowance.

A JWT proves identity; it does not prove project access. The token subject is the
user ID. Services reload the user and its role, so role changes affect existing
tokens immediately. Bearer requests are stateless, and CSRF is disabled because
authentication is supplied through an explicit header rather than a session
cookie. There are no refresh tokens or logout endpoint in this scope.

Verify: register, log in, call `/api/users/me`. Omit the token or supply an
invalid, expired, wrong-issuer, or wrong-audience token and expect 401. A regular
user calling the admin API gets 403. The HTTP integration tests exercise these
cases using real signed tokens and the complete security filter chain.

## Phase 3: projects and membership

`AccessService` is the central authorization policy. `ProjectService` creates
owner membership in the same transaction as the project. Accessible project
queries include owned/member projects, with ADMIN access to all projects.

Ownership grants management within that project. Delegation requires global
MANAGER role and project MANAGER membership. A global role never grants access
to unrelated projects. Managers can add/update/remove membership; removing a
member clears that user's assignments. Owners cannot be removed. Assignees must
be actual project members, even when their global role is ADMIN.

Verify: create two accounts and a project under only one account. The other
account must receive 403 for that project and its tasks. Add membership, confirm
read access, then remove it and confirm access is revoked. The tests also verify
a manager cannot manage an unrelated project until explicitly delegated.

## Phase 4: tasks

`TaskService` checks project membership for every task operation. Members create
tasks; creators/assignees may edit their tasks; project managers control
assignment and deletion. A member cannot edit an arbitrary task simply because
they can view it. Status changes follow the transition table in README.

Updates require `version`. The service rejects already-stale versions early,
and JPA optimistic locking handles requests racing after both have read the same
version. Both failure paths return 409. Returning the flushed entity supplies
the newly incremented version to the next client update.

Search and filters build a JPA `Specification`, which composes SQL predicates
rather than filtering after loading all tasks. Search escapes SQL wildcard
characters so a literal `%` or `_` stays literal. Pagination bounds size to 100;
sorting uses an allowlist and an ID tie-breaker. Response records keep the JSON
pagination format independent of Spring's PageImpl internals.

Verify: create tasks with different priorities/statuses, query with search,
filters, pagination, and sorting, then patch with a fresh and stale version.
The concurrent HTTP test sends two edits with version zero and asserts exactly
one 200 and one 409. Invalid enum values, due dates, transitions, unknown fields,
and sorting return 400.

## Phase 5: scheduled and asynchronous work

`@Scheduled` invokes the overdue scanner and delivery dispatcher on fixed delays.
`@Async` hands delivery to a bounded executor so request threads do not perform
notification delivery. The worker is a separate Spring bean: cross-bean calls
pass through Spring's async/transaction proxies; self-invocation would not.

The scanner stores a PENDING notification in a transaction before any async work
is submitted. The event key combines task, due date, and recipient. The database
unique constraint is the final deduplication safeguard when scans race. A
constraint failure rolls back just that event's transaction; scanning can proceed.

The dispatcher reads eligible IDs. Each worker locks its notification row within
a transaction, skips delivered or not-yet-due events, then records completion or
failure. In-app delivery means making a user notification available through the
API and recording processing, rather than sending email. Failure injection in
tests demonstrates retries without needing an external provider.

The executor has 2 core threads, maximum 4, and a queue of 100. Rejected
submission leaves the row eligible for a future pass. Retry state is stored in
H2, with capped exponential delays and at most five attempts. Failed rows expose
safe diagnostics and remain inspectable after retries are exhausted.

A process crash loses Java threads and queued work; durable database rows enable
recovery on the next start. A future external provider could send successfully
before a transaction fails, so use the event key with that provider to make
retries idempotent. This application does not claim exactly-once external delivery.

Verify: `overdueIdempotencyAsyncFailureAndRetry` creates an overdue task directly
in the test database, scans twice, asserts one notification, injects delivery
failure, verifies recorded retry state, then retries successfully. API-created
due dates must be today or later, so moving an existing task into the past is a
test fixture rather than a public API capability.

## Phase 6: errors, tests, operations

`ApiErrors` makes validation, authentication, authorization, conflict, and database
errors consistent. Spring Security's filter-level handlers emit the same error
shape. Unexpected exceptions are logged but do not reveal stack traces to clients.
`OpenApiConfig` describes bearer authentication for Swagger. `AdminBootstrap`
optionally creates the first admin using environment-provided credentials.

Only Actuator health is exposed. File data, logs, local environment files, and
credentials are excluded from source control. JUnit/Mockito tests cover service
permissions, and HTTP integration tests cover the full runtime with H2, migrations,
repositories, JWT filters, service transactions, async work, and optimistic locking.

Run `./mvnw.cmd clean verify`. An ERROR log for the deliberately injected
notification failure is expected in that test; the test then verifies recovery.
The Boot-managed Flyway version currently emits a tested-version warning for
H2 2.4; migrations and Hibernate schema validation are exercised successfully by
the suite. Java may also print Mockito dynamic-agent warnings; these are not test
failures.

For all exact source paths and complete code, use the source walkthrough. Source
files remain the executable source of truth. Commands and environment variables
are collected in README so a new developer can run this without a database server.
