# Crash Course continuation: 17 + 20 lessons

Two independent expandable menus extend the original 63 lessons: Application Development (17) and Distributed Workflows (20). Overview routes are `/spring-boot-crash-course/sbc_application` and `/spring-boot-crash-course/sbc_distributed`. Original lesson URLs and sources remain unchanged.

The authored lessons introduce each problem, explain the relevant statements, embed complete reference files, and provide scenarios and exercises. The projects are completed reference implementations; pages introduce their features in sequence. They are new authored material, not extra transcript imports.

## Projects

`demo/spring-boot-crash/continuation/commerce` contains validation, versioned/owner-scoped APIs, ProblemDetail errors, OpenAPI, Flyway, JPA detail fetching, DTO mapping, version/row locking, tests, bounded HTTP clients, Resilience4j, account verification/recovery, opaque access and rotating refresh tokens, owned PDF storage, SMTP/async examples, Stripe test checkout, signed webhook verification, event deduplication, refunds and reconciliation, RabbitMQ receipt processing, metrics, a Dockerfile and CI.

`workflow` runs Order, Inventory and Payment as separate processes with separate file-backed databases. It persists phases and retry times, uses stable operation IDs, checks legal participant transitions, compensates post-charge failure and resumes after restart. A broker profile adds a confirmed outbox, transactional inbox handlers, durable/dead-letter queues and choreography. The optional `temporal` module includes interfaces, workflow, HTTP activities, worker and client for a local Temporal server.

## Build and verification

Use Java 25. From the continuation directory run `mvn -B package`. Normal tests replace external provider/mail boundaries and use H2. Select `mvn -Dtest=PostgresIT test` from commerce when Docker is available.

`node scripts/verify-spring-boot-crash-continuation-runtime.cjs` starts three real processes. It verifies success, decline, compensation, duplicate start, restart recovery and missing internal authentication. Evidence is in `SPRING-BOOT-CRASH-CONTINUATION-RUNTIME.json`. It does not contact Stripe or run RabbitMQ/Temporal.

`node scripts/build-spring-boot-crash-continuation.cjs` builds both catalogs and embeds complete files. `node scripts/verify-spring-boot-crash-continuation.cjs --browser` checks the 17 + 20 lessons, file/source agreement, routes, menus, copy and responsive layouts. The original course, export, PWA and cache-upgrade checks remain applicable.

Verified on 2026-11-13: all three modules packaged; 12 tests passed; the three-process HTTP recovery scenarios passed; all 37 new and 63 original lesson routes passed browser/responsive checks. Offline continuation routes, old-cache migration, Rails/interview regressions and the 5,833-route static export passed. Build input hashes and test counts are recorded in `SPRING-BOOT-CRASH-CONTINUATION-BUILD.json`. External integrations listed below remain unexecuted here.

The Python generator under `scripts/spring-boot-crash/continuation/` replaces generated project sources. Keep student edits in a separate working copy. Java is formatted using the local Google Java Format tool when available.

## Accounts and local services

No login is needed to build or run the HTTP workflow fixtures. Real checkout needs your own Stripe test account, Stripe CLI forwarding, and local `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` variables. Do not send those secrets through chat or commit them. The adapter accepts test keys only.

Docker is unavailable in this environment. PostgreSQL/Testcontainers, Mailpit, RabbitMQ and container builds require Docker or equivalent local services. Mailpit captures local email without a provider account. Temporal needs a local development server, not a cloud login. Hosting/registry credentials and a domain are only needed when you select a deployment target. No publication or external payment was performed.

## Scope boundaries

- Workflow Payment is a deterministic failure-test fixture, not a card processor. Commerce contains the real Stripe test-mode adapter. Connecting them requires durable provider-operation records and reconciliation, explained in the payment workflow lesson.
- Inventory models a reservation state per workflow, not a quantity-based warehouse ledger. Expiry is taught with its payment race; uncertain reservations are not automatically released.
- Immediate paid Checkout completion is handled. Delayed payment methods need additional event types. Refunds stay pending until reconciliation confirms success. Redirects never mark an order paid.
- The introductory payment service holds a local lock during bounded provider calls. The distributed lessons explain moving remote work outside long database transactions.
- Refresh rotation rejects replay but does not revoke every descendant session on detected replay. Add public auth rate limits before shared deployment. Existing JWT lessons remain separate from this opaque-token implementation.
- PDF header checks are not malware scanning. Async email is not durable delivery. A tracing collector/exporter is needed for full span inspection; correlation propagation is implemented separately.
- The outbox relay assumes one publisher per node. Multi-worker claiming, retention and production operational tools are further work. The Temporal example covers success/decline; exhausted activities require reconciliation rather than speculative compensation.

## Primary references

[Spring REST clients](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html), [Boot 3.5 database initialization](https://docs.spring.io/spring-boot/3.5/how-to/data-initialization.html), [Testcontainers](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html), [springdoc](https://springdoc.org/), [Resilience4j](https://resilience4j.readme.io/docs/getting-started-3), [AMQP failures](https://docs.spring.io/spring-amqp/reference/amqp/receiving-messages/async-annotation-driven/error-handling.html), [Stripe idempotency](https://docs.stripe.com/api/idempotent_requests), [webhook verification](https://docs.stripe.com/events/manage-webhook-endpoints), [Temporal Java](https://docs.temporal.io/develop/java).
