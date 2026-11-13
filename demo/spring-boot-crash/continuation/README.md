# Continuation practice

Open commerce/pom.xml or workflow/pom.xml with Java 25. Build all three modules from this directory with `mvn -B package`. Complete walkthroughs are in the website's Application Development and Distributed Workflows menus.

## Application

From commerce run `java -jar target/commerce-1.0.0.jar`. API port: 8090. Documentation: /swagger-ui/index.html. Default storage is file-backed H2.

From this directory run `docker compose up -d mailpit`. SMTP is on 1025; the inbox is at http://localhost:8025. Register with /auth/register, copy the emailed token into /auth/verify, then /auth/login. Use accessToken as Bearer authorization. Tokens are not logged.

Set local STRIPE_SECRET_KEY to a test key. Run `stripe listen --forward-to localhost:8090/webhooks/stripe` and set STRIPE_WEBHOOK_SECRET to its signing secret before starting Java. Create an order, POST /api/v1/orders/{id}/checkout and open its URL. Only the verified payment event marks it paid. POST /api/v1/orders/{id}/reconcile refreshes checkout/refund status.

Set DB_PASSWORD locally before starting the postgres Compose service. Activate the postgres profile to use it. The broker profile activates RabbitMQ receipt processing. `mvn -Dtest=PostgresIT test` needs Docker. Ordinary tests use fixtures.

## Workflow

Choose WORKFLOW_SECRET with at least sixteen characters and set the same value in three terminals. From workflow run:

```
java -jar target/workflow-1.0.0.jar --node.role=inventory --server.port=8101
java -jar target/workflow-1.0.0.jar --node.role=payment --server.port=8102
java -jar target/workflow-1.0.0.jar --node.role=order --server.port=8100
```

Send X-Workflow-Key with your local secret on business requests. POST /workflows on 8100 with a fresh UUID as id and failPayment/failConfirm booleans. GET /workflows/{id} to poll. GET /effects/{id} on participant ports to inspect results.

For choreography start RabbitMQ and add `--spring.profiles.active=broker --workflow.mode=choreography` to all three commands. Stop the previous processes first. Reuse the working directory on restart to retain each role's database. Payment is a failure-test fixture and does not contact a gateway.

The temporal README contains its local worker/client commands. Do not coordinate one workflow through two implementations. See the repository's continuation report for verified behavior, external requirements and scope boundaries. The generator replaces generated source files, so use a working copy for student edits.
