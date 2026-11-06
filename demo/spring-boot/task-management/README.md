# Task Management REST API

Complete backend learning application: Java 25, Spring Boot 4.1.2, Maven,
Spring MVC, Spring Security JWT, Spring Data JPA/Hibernate, **H2**, Flyway,
Bean Validation, Swagger UI, scheduling, and bounded asynchronous processing.

H2 replaces PostgreSQL throughout, as requested. No database server, Docker,
Testcontainers, JSP, frontend, payments, Redis, or Kafka is required.

## Run on Windows

Install JDK 25 and set JAVA_HOME. The included Maven wrapper supplies Maven.

```powershell
cd D:\learning-hub\task-management
.\scripts\run-local.ps1
```

The script generates a cryptographically random JWT key in the current shell's
process environment if JWT_SECRET is absent, runs tests, builds, and starts the
JAR. It never prints or writes the key to a file. Stop with Ctrl+C.
Use `-SkipBuild` only after a successful build.

Alternatively set the key and use Maven directly:

```powershell
$env:JWT_SECRET = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
.\mvnw.cmd verify
.\mvnw.cmd spring-boot:run
# Or: java -jar target/task-management-0.0.1-SNAPSHOT.jar
```

- Health: http://localhost:8080/actuator/health
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

Swagger's **Authorize** button accepts the access token from login. Register
and login are public. All business endpoints require a bearer token.

## Database and environment

Normal runs use `jdbc:h2:file:./data/task-management;DB_CLOSE_ON_EXIT=FALSE`.
Data survives restarts; the database files are ignored by Git. Run from the
project root for a consistent relative database location. Run one application
instance against this file database. H2's browser console is not enabled.

| Variable | Default / purpose |
|---|---|
| `JWT_SECRET` | Required; Base64 encoding of at least 32 random bytes; no source-controlled default |
| `JWT_ISSUER` | `task-management` |
| `JWT_AUDIENCE` | `task-management-api` |
| `DB_URL` | File-backed H2 URL above |
| `DB_USERNAME` | `sa`, embedded local H2 user |
| `DB_PASSWORD` | Empty, local embedded database only; set when creating a protected database |
| `BOOTSTRAP_ADMIN_EMAIL` | Optional first-admin email |
| `BOOTSTRAP_ADMIN_PASSWORD` | Optional first-admin password, 12+ characters and at most 72 UTF-8 bytes |
| `SERVER_PORT` | Spring Boot standard override, default `8080` |
| `APP_JOBS_OVERDUE_DELAY_MS` | `300000` (5 minutes) |
| `APP_JOBS_DELIVERY_DELAY_MS` | `10000` |
| `APP_JOBS_INITIAL_DELAY_MS` | `30000` |

Keep JWT_SECRET stable across restarts to preserve outstanding tokens. Rotating
it invalidates tokens signed by the previous key. Access tokens last 900 seconds;
there is no refresh-token or logout/revocation endpoint. User roles and membership
are read from the database on each operation, so permission changes apply immediately.
Never commit real passwords or keys. `.env` files are ignored but are not loaded
by Spring automatically; export environment variables in your shell.

For an ephemeral H2 database:

```powershell
$env:DB_URL = 'jdbc:h2:mem:task-management;DB_CLOSE_DELAY=-1'
```

Flyway owns the schema (`V1__initial_schema.sql`). Hibernate uses
`ddl-auto: validate`, never `update`. For future schema changes, add V2/V3
migrations instead of editing an already-applied migration. The database includes
foreign keys, unique emails/memberships/event keys, enum checks, and query indexes.

## First administrator

Set both bootstrap variables before starting against a fresh database. Choose
your own credentials using a secret manager or local environment; no default
admin exists. The bootstrap creates a new account only if that email does not
exist, and never promotes an existing account. Remove the bootstrap variables
after the first successful start. Ordinary registration always creates USERs.

An admin can promote a user with:

```http
PATCH /api/admin/users/2/role
Authorization: Bearer <admin token>
Content-Type: application/json

{"role":"MANAGER"}
```

Admins cannot demote their own admin account. This project manages users through
listing and role changes; it does not delete accounts and their audit history.

## Try the API

```powershell
$base = 'http://localhost:8080'
$registration = @{name='Learner'; email='learner@example.com'; password='replace-with-your-own-password'} | ConvertTo-Json
Invoke-RestMethod "$base/api/auth/register" -Method Post -ContentType 'application/json' -Body $registration
$credentials = @{email='learner@example.com'; password='replace-with-your-own-password'} | ConvertTo-Json
$login = Invoke-RestMethod "$base/api/auth/login" -Method Post -ContentType 'application/json' -Body $credentials
$headers = @{Authorization="Bearer $($login.accessToken)"}
Invoke-RestMethod "$base/api/users/me" -Headers $headers
$project = Invoke-RestMethod "$base/api/projects" -Method Post -Headers $headers -ContentType 'application/json' -Body '{"name":"Learn REST","description":"Practice project"}'
$task = Invoke-RestMethod "$base/api/projects/$($project.id)/tasks" -Method Post -Headers $headers -ContentType 'application/json' -Body '{"title":"Build an API","priority":"HIGH"}'
$patch = @{version=$task.version; status='IN_PROGRESS'} | ConvertTo-Json
$task = Invoke-RestMethod "$base/api/tasks/$($task.id)" -Method Patch -Headers $headers -ContentType 'application/json' -Body $patch
Invoke-RestMethod "$base/api/projects/$($project.id)/tasks?status=IN_PROGRESS&priority=HIGH&page=0&size=10&sort=dueDate,asc" -Headers $headers
```

Register another user to obtain their ID, then add and assign them:

```http
POST /api/projects/1/members
{"userId":2,"membershipRole":"MEMBER"}

PATCH /api/tasks/1
{"version":1,"assigneeId":2}
```

Include bearer and JSON headers for these requests. Use the current returned
version for every task patch. To clear nullable fields, send `clearAssignee:true`
or `clearDueDate:true`. Clear a description with an empty string. Omitted/null
patch fields otherwise leave values unchanged. Unknown JSON properties are rejected.

## Endpoints

| Method | Path | Result / access |
|---|---|---|
| POST | `/api/auth/register` | 201 profile, public |
| POST | `/api/auth/login` | 200 access token, public |
| GET | `/api/users/me` | Current profile |
| GET | `/api/admin/users` | Paginated users, ADMIN |
| PATCH | `/api/admin/users/{id}/role` | Change user role, ADMIN |
| POST | `/api/projects` | 201 project and Location header |
| GET | `/api/projects` | Accessible projects; all for ADMIN |
| GET | `/api/projects/{id}` | Project details, member/admin |
| PUT | `/api/projects/{id}` | Replace name/description, project manager |
| GET | `/api/projects/{id}/members` | List members, member/admin |
| POST | `/api/projects/{id}/members` | Add/update membership, manager; 204 |
| DELETE | `/api/projects/{id}/members/{userId}` | Remove membership, manager; 204 |
| POST | `/api/projects/{id}/tasks` | Create task, member; 201 and Location |
| GET | `/api/projects/{id}/tasks` | Filter/search/sort/page, member |
| GET | `/api/tasks/{id}` | Task details, member/admin |
| PATCH | `/api/tasks/{id}` | Permitted task update |
| DELETE | `/api/tasks/{id}` | Project manager; 204 |
| GET | `/api/notifications` | Paginated current-user notifications |

Permission rules are enforced in services, including indirect task access.
Project owners manage their projects even if their global role is USER. A
delegated manager must have global MANAGER role **and** MANAGER membership in
that project. ADMIN can manage all projects. Other members may create tasks,
but may edit only tasks they created or are assigned. Only managers may assign,
unassign, delete tasks, or change memberships. An assignee must be a project
member (even an ADMIN); removing a member unassigns their tasks. Owners cannot
be removed. Re-adding an existing member updates their membership role.

Task statuses: TODO, IN_PROGRESS, BLOCKED, DONE. Allowed transitions:

| From | To |
|---|---|
| TODO | IN_PROGRESS, BLOCKED |
| IN_PROGRESS | BLOCKED, DONE |
| BLOCKED | TODO, IN_PROGRESS |
| DONE | TODO (reopen) |

Priorities: LOW, MEDIUM, HIGH, URGENT. Supplied due dates must be today or later.
The overdue scanner uses UTC calendar dates; a task becomes overdue the day
after its due date. Existing overdue tasks can still be updated without
resubmitting their due date.

Task queries accept `status`, `priority`, `search` (literal case-insensitive
substring in title/description), `assigneeId`, and `dueBefore` (inclusive ISO date).
Pagination uses zero-based `page` and `size` 1–100. Sort is one `field,asc|desc`;
allowed fields: id, title, status, priority, dueDate, createdAt, updatedAt.
An ID tie-breaker makes ordering deterministic. Enum sorting uses stored strings.
Paginated responses contain `content`, `totalElements`, `totalPages`, `number`,
`size`, `first`, and `last`.

## Errors and security

Errors share `timestamp`, `status`, `code`, `message`, `path`, and `details`.
Validation details identify field errors without echoing passwords or values.
400 = invalid input/transition; 401 = invalid credentials or bearer token;
403 = valid identity without permission; 404 = missing record;
409 = duplicate data or stale/concurrent task update. Unexpected failures log
a stack trace server-side and return a generic 500 message.

Passwords use BCrypt; JWT signatures use Spring Security/Nimbus HS256 with a
32-byte minimum secret. Validation checks signature, issuer, audience, and expiry
(with Spring's default clock-skew allowance). Security is stateless; there are no
HTTP login sessions. CSRF is disabled for this bearer-header API. No public
registration request can select a role. All Actuator endpoints except health
are denied. Swagger is public for this learning application.

## Scheduled and asynchronous notifications

Every 5 minutes the scanner finds non-DONE tasks with a due date before today
in UTC. It creates one event per `(task, due date, recipient)`: the current
assignee, or creator when unassigned, provided that recipient still has access.
A unique database key prevents repeated/concurrent scans creating duplicates.
Changing due date or recipient creates a distinct intended event. Reopening a
task with the same due date and recipient does not create another event.

A separate dispatcher selects 100 eligible pending/failed rows every 10 seconds.
`@Async("notificationExecutor")` uses 2 core threads, max 4, queue capacity 100.
The worker locks each row, skips completed/ineligible work, processes an in-app
delivery adapter, and commits DELIVERED with deliveredAt. Repeated dispatches
cannot process a delivered row twice. Notifications are readable through the API
while pending or failed, so failure remains visible.

Failures log the notification ID/attempt and stack trace, store a safe error
class name, and retry after 60, 120, 240, and 480 seconds, stopping after five
total attempts. Exhausted rows remain FAILED for inspection; automatic retries
stop. Executor rejection leaves persisted work for the next dispatcher pass.
Pending/retry rows survive restart in file-backed H2. In-flight Java tasks do
not survive restart; the database transaction rolls back so they can be retried.
This is not an exactly-once guarantee for a future external email provider:
external delivery can succeed before a database commit fails. Such a provider
must honor the persisted event key as an idempotency key.

To observe overdue delivery locally, create a task due today and wait until the
next UTC day, or use a disposable H2 database and move a test task's due_date to
yesterday with SQL. The integration test already performs this setup and verifies
deduplication, an injected delivery failure, retry, and eventual delivery.

## Tests and learning material

```powershell
.\mvnw.cmd clean verify
```

Verified: **13 tests passed**, with zero failures or errors. A separate packaged-JAR
smoke check verified file-backed H2 persistence, first-admin creation, and valid
JWT access after restart.

Tests use a separate `test` profile and in-memory H2 with real Flyway migrations
and Hibernate schema validation. HTTP tests use a real random-port server and
signed JWTs; Mockito tests cover service permissions and status rules. The
committed signing secret is isolated to test resources and never used by the
normal application. H2 is the actual requested database, so no PostgreSQL or
Testcontainers setup is needed.

Read [implementation guide](docs/02-implementation.md) for the concepts and
verification steps, and [complete source walkthrough](docs/source-walkthrough.md)
for each file's purpose, exact path, connections, and complete code. The original
[bootstrap guide](docs/01-bootstrap.md) is a historical Step 1 checkpoint; use this
README for current commands.

Version references: [Spring Initializr](https://start.spring.io/metadata/client),
[Spring Boot Flyway initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html),
[Springdoc compatibility matrix](https://springdoc.org/#what-is-the-compatibility-matrix-of-springdoc-openapi-with-spring-boot).
Springdoc 3.2.0 supports Boot 4.1.x. Keep the dependency versions managed by Boot
except the explicitly pinned Springdoc library.
