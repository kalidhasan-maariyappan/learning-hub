# Patient Management API

A standalone REST API for learning Spring MVC, JWT authentication, request-based role authorization, JPA, validation, migrations and backend architecture. Open this directory directly as a Maven project in IntelliJ IDEA or VS Code.

## Technology stack

- Java 25, Maven 3.9+, executable JAR
- Spring Boot 4.1.2, Spring MVC, Security, OAuth2 Resource Server
- Spring Data JPA, Hibernate, H2 file database, Flyway Core
- Jakarta Validation, BCrypt, Nimbus HS256 JWT
- Springdoc WebMVC UI 3.2.0
- JUnit 5.14.4, Mockito, MockMvc and H2 integration tests

Version references: [Spring Boot](https://spring.io/projects/spring-boot/) and [Springdoc](https://springdoc.org/). Boot 4 starters include `spring-boot-starter-webmvc`, `spring-boot-starter-security-oauth2-resource-server`, `spring-boot-starter-flyway` and `spring-boot-starter-webmvc-test`. Flyway Core includes H2 support; no extra H2 Flyway module is required.

## Project structure

```text
patient-api/
    pom.xml
    src/main/java/com/example/patientapi/
        PatientApiApplication.java
        auth/       Registration, login and token DTOs
        config/     Security, JWT, OpenAPI and development admin bootstrap
        error/      Consistent errors and global exception advice
        patient/    Entity, repository, service, controller and DTOs
        user/       Account, role and current-user API
    src/main/resources/
        application.yml
        application-dev.yml
        db/migration/V1__create_tables.sql
    src/test/java/com/example/patientapi/
    src/test/resources/application-test.yml
```

Controllers handle HTTP, services enforce business rules and transaction boundaries, and repositories handle database operations. Record DTOs define the API contract; controllers never return entities. Read services use read-only transactions and writes use regular transactions. Database constraints also protect against concurrent duplicate inserts.

## Prerequisites and environment

For local development on Windows, run `./run-dev.ps1` from PowerShell. It starts
the development profile and generates a signing secret in the Git-ignored
`data/dev-jwt-secret` file on first use, reusing it on later starts. An existing
`JWT_SECRET` environment variable takes precedence. Stop with Ctrl+C. This
local secret file is for development only.

Install JDK 25 and Maven 3.9 or newer. Set `JAVA_HOME` to your JDK and add its `bin` directory to PATH. Confirm with `java -version` and `mvn -version`. Run commands from this project's directory.

The application requires a high-entropy `JWT_SECRET`, with at least 32 UTF-8 bytes. Generate a value locally; never commit it. Keep it stable across restarts if existing tokens should continue to work.

PowerShell setup:

```powershell
cd D:\projects\learning-hub\demo\patient-api
$bytes = New-Object byte[] 48
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$rng.Dispose()
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
$env:SPRING_PROFILES_ACTIVE = "dev"
mvn spring-boot:run
```

Bash setup:

```bash
cd demo/patient-api
export JWT_SECRET="$(openssl rand -base64 48)"
export SPRING_PROFILES_ACTIVE=dev
mvn spring-boot:run
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `JWT_SECRET` | Required | High-entropy HS256 signing secret |
| `JWT_ISSUER` | `patient-api` | Issued and expected token issuer |
| `SPRING_PROFILES_ACTIVE` | None | `dev` enables Swagger, console and admin bootstrap |
| `DATABASE_URL` | `jdbc:h2:file:./data/patientdb` | File database location |
| `DATABASE_USERNAME` | `sa` | Database username |
| `DATABASE_PASSWORD` | Empty | Database password |
| `CORS_ALLOWED_ORIGINS` | Empty | Comma-separated exact browser origins |
| `ADMIN_EMAIL` | Empty | Optional development admin email |
| `ADMIN_PASSWORD` | Empty | Optional development admin password |
| `ADMIN_NAME` | `Development Admin` | Development admin display name |

Set variables in your shell or IDE run configuration. `.env` files are not loaded automatically. Secrets, database files, build output and local IDE files are ignored by Git.

To create an ADMIN, supply both `ADMIN_EMAIL` and `ADMIN_PASSWORD` before starting with `dev`. Use a valid email and a password of at least 12 characters containing uppercase, lowercase, digit and special character, with at most 72 UTF-8 bytes. No admin password is hardcoded. Bootstrap creates the account only if absent; restarting neither duplicates it nor resets its password. Startup fails if that email already belongs to a USER, preventing automatic promotion. Bootstrap is inactive outside `dev`.

## Maven commands and startup

```bash
mvn clean test
mvn clean verify
mvn spring-boot:run
```

Or run the packaged application:

```bash
java -jar target/patient-api-1.0.0.jar
```

Port: `8080`. Activate development through the environment variable above or the argument `--spring.profiles.active=dev`. The default profile disables Swagger and H2 console.

The H2 file database lives in `data/` under the process working directory and survives restarts. Start from the same directory to reuse it. Only one embedded application process should open it at a time. Flyway creates the schema; Hibernate validates mappings with `ddl-auto=validate`. Add a new versioned migration for later schema changes instead of editing an applied migration.

## Swagger and H2 console

Development profile only:

- Swagger: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- H2 console: http://localhost:8080/h2-console

In H2 console, use `jdbc:h2:file:./data/patientdb`, username `sa` and your configured database password. Remote console access is disabled. The console is a database administration tool for trusted local development. Same-origin framing and the CSRF exemption are narrowly scoped to `/h2-console/**`; API security has its own filter chain.

Swagger workflow:

1. Register using `POST /api/v1/auth/register`.
2. Log in using `POST /api/v1/auth/login`.
3. Copy `accessToken`.
4. Click **Authorize** and paste only the JWT under `bearerAuth`. Swagger adds `Bearer` automatically.
5. Call protected endpoints. For deletion, log in with the environment-created ADMIN and authorize with its token.

## Authentication and authorization

Registration always creates USER. Unknown fields, including `role`, are rejected. Emails are normalized to lowercase and unique. Passwords are BCrypt hashes and never returned. Registration passwords require 12 to 72 characters, uppercase, lowercase, number and special character, and a maximum of 72 UTF-8 bytes.

Login uses `AuthenticationManager`, `DaoAuthenticationProvider`, `UserDetailsService` and `PasswordEncoder`. `NimbusJwtEncoder` signs an HS256 JWT with the user's ID as `sub`, issuer, issued time, expiration and role. OAuth2 Resource Server uses `NimbusJwtDecoder` to validate signature, issuer and lifetime. Spring Security's standard timestamp validator permits its normal 60-second clock skew. The role converter maps USER and ADMIN to ROLE_USER and ROLE_ADMIN.

Access tokens expire after 15 minutes (900 seconds). Send `Authorization: Bearer <accessToken>`. USER and ADMIN may read, create and update patients; only ADMIN may delete. Rules are defined in `SecurityFilterChain`. There are no custom JWT filters, stored tokens, refresh tokens or HTTP sessions. CSRF, form login, HTTP Basic and default logout are disabled for the stateless Bearer API. CORS uses an empty allowlist until exact origins are configured.

Clients log out by discarding their access token. There is no server-side logout or revocation store. Previously issued JWTs remain valid until expiration, subject to clock skew. Account changes are not checked for each token-authenticated request; `/users/me` does query the current account. This is an intentional limitation of this learning project.

## Endpoints

| Method | Path | Access | Success |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | 201 user |
| POST | `/api/v1/auth/login` | Public | 200 token |
| GET | `/api/v1/users/me` | USER, ADMIN | 200 user |
| POST | `/api/v1/patients` | USER, ADMIN | 201 patient and Location |
| GET | `/api/v1/patients` | USER, ADMIN | 200 page |
| GET | `/api/v1/patients/{id}` | USER, ADMIN | 200 patient |
| PUT | `/api/v1/patients/{id}` | USER, ADMIN | 200 updated patient |
| DELETE | `/api/v1/patients/{id}` | ADMIN | 204 empty body |

Patient emails are unique independently of account emails. Gender: `MALE`, `FEMALE`, `OTHER`. Age: 0 to 150. Phone: 7 to 15 digits with an optional leading `+`. PUT requires every field.

Listing uses zero-based `page` (default 0), `size` (default 10, range 1 to 100), and `sort` (default `name,asc`). Sort fields: `id`, `name`, `email`, `phone`, `age`, `gender`; direction: `asc` or `desc`. An ID tie-breaker keeps ordering stable. Optional `search` matches name case-insensitively and uses the same pagination and sorting. Invalid parameters return 400.

## Sample requests and responses

Register:

```http
POST /api/v1/auth/register
Content-Type: application/json

{"name":"John","email":"john@example.com","password":"Password@123"}
```

201 response:

```json
{"id":1,"name":"John","email":"john@example.com","role":"USER"}
```

Login:

```http
POST /api/v1/auth/login
Content-Type: application/json

{"email":"john@example.com","password":"Password@123"}
```

200 response, with token abbreviated for documentation:

```json
{"accessToken":"<signed-jwt>","tokenType":"Bearer","expiresIn":900}
```

Create:

```http
POST /api/v1/patients
Authorization: Bearer <accessToken>
Content-Type: application/json

{"name":"David","email":"david@example.com","phone":"9876543210","age":30,"gender":"MALE"}
```

201 response, with `Location: /api/v1/patients/1`:

```json
{"id":1,"name":"David","email":"david@example.com","phone":"9876543210","age":30,"gender":"MALE"}
```

Search:

```http
GET /api/v1/patients?search=david&page=0&size=10&sort=name,asc
Authorization: Bearer <accessToken>
```

200 response:

```json
{
    "content": [{"id":1,"name":"David","email":"david@example.com","phone":"9876543210","age":30,"gender":"MALE"}],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true
}
```

`GET /api/v1/users/me` returns the safe user shape above. `GET /api/v1/patients/1` returns the patient shape above. Both require a Bearer header.

Replace:

```http
PUT /api/v1/patients/1
Authorization: Bearer <accessToken>
Content-Type: application/json

{"name":"David Jones","email":"david@example.com","phone":"9876543210","age":31,"gender":"MALE"}
```

200 returns the updated patient. `DELETE /api/v1/patients/1` with an ADMIN token returns 204 with no body.

Errors, including authentication and authorization failures, share this structure:

```json
{
    "timestamp": "2026-11-08T10:30:00Z",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "path": "/api/v1/patients",
    "fieldErrors": {"name": "Name is required"}
}
```

Other statuses include 401 invalid/missing credentials or token, 403 forbidden action, 404 missing patient and 409 duplicate email. Non-field errors have an empty `fieldErrors` object. Unexpected failures return a generic 500 response without SQL details or stack traces.

## Tests

```bash
mvn clean test
mvn clean verify
```

Tests supply their own test-only signing key and isolated in-memory H2 databases. No environment credentials are required. They exercise real filter chains, signed JWTs, BCrypt, Flyway and Hibernate validation. Coverage includes registration, duplicates, hashing, role injection rejection, login, incorrect credentials, missing/tampered/expired/wrong-issuer JWTs, identity, USER and ADMIN permissions, CRUD, missing patients, malformed JSON, validation, patient uniqueness, pagination, sorting, search, CORS and development-only documentation. Mockito checks ensure bootstrap cannot promote a USER; development tests verify Swagger and idempotent admin creation.

Reports: `target/surefire-reports/`. Executable: `target/patient-api-1.0.0.jar`.
