# Form & Field — JSP e-commerce and Razorpay Test Mode

A server-rendered Spring Boot MVC learning application. The local build uses Java 25, Spring Boot **3.5.16**, JSP/JSTL, Spring Security sessions, Spring Data JPA, Flyway, **file-backed H2**, Bootstrap **5.3.8**, Bootstrap Icons **1.13.1**, and vanilla JavaScript. H2 replaces PostgreSQL at your request. There is no React, Thymeleaf, JWT, environment-variable configuration, or separate frontend build.

## Run

From `D:\learning-hub\ecommerce-payment`:

```powershell
mvn clean package
java -jar target/ecommerce-payments-0.0.1-SNAPSHOT.war
```

Open **http://127.0.0.1:8093/**. Port 8093 was selected because 8080 was already occupied. The server binds only to this computer. Stop it with Ctrl+C. Data persists in `data/store.mv.db`; tests use a separate, in-memory database.

For later runs, `./run.ps1` builds the WAR if necessary and starts the app. No script sets environment variables.

## Local accounts and configuration

- Register a customer through `/register`.
- Initial administrator: **admin@formandfield.test** / **AdminTest@2026!**.
- The administrator is seeded only if that email does not exist. Changing the configured seed password does not reset an existing user's password.
- The supplied test key ID and secret are literal values in `src/main/resources/application.properties`, as requested. This file, `secrets/`, `data/`, build output and logs are ignored by Git. The packaged WAR contains the local configuration; keep that artifact local.
- `src/main/resources/application.example.properties` documents all settings without your keys. Copy it to `application.properties` and fill the literal test credentials when setting up another checkout.
- Six original product illustrations, Bootstrap CSS/JS, fonts and icons are bundled locally. Only hosted Razorpay Checkout and its payment resources require the network.

## Walk through the application

1. Browse, search or filter the collection; open a product.
2. Register and sign in. Add products, update quantities or remove them from your bag.
3. Review checkout and enter test delivery details. Server validation also runs without JavaScript.
4. Create a test order. Its items and prices are frozen and stock is reserved. Repeated submission with the same checkout token returns the same local order.
5. Open Razorpay Checkout and use its Test Mode payment options. Never use real card information for this exercise. Official test instructions are linked below.
6. The callback verifies the signature using the stored gateway order ID. The backend separately fetches the payment and checks its order, amount, currency and status. **Only captured/refunded evidence establishes prior payment; an authorized payment remains pending.**
7. Use **Refresh payment status** to recover from closed checkout, lost callbacks, pending capture, or network failures. Existing gateway orders are reused. An uncertain order-creation result is reconciled by its receipt, never automatically repeated.
8. Open Studio admin to manage products and stock, inspect orders and payments, and issue a full or partial test refund. Unknown refund submissions reserve the amount; retry their **same request** using Razorpay's `X-Refund-Idempotency` header.

Definite gateway HTTP 4xx rejections are recorded as failed (except ambiguous/retryable 408, 409 and 429). The audit stores a bounded reason code, never a complete remote error body. Verified processed refund evidence can resolve a previously failed local submission. See [verification results](docs/VERIFICATION.md) for what was actually exercised in your Test Mode account and the remaining full-refund/webhook verification limits.

If your Razorpay test account uses manual capture, capture the authorized test payment in the Razorpay dashboard, then refresh the local order. Alternatively configure automatic capture in your test account. This application deliberately does not mark authorization as a completed payment.

## Webhooks

The endpoint is **POST `/payments/webhook`**. It receives raw bytes, checks `X-Razorpay-Signature` using a separate webhook secret, and deduplicates `X-Razorpay-Event-Id`. It fetches the current payment/refund from Razorpay before applying monotonic updates, so a stale event cannot undo capture or a processed refund. Changes and the event marker commit together. Failed processing returns non-2xx for retry.

**External webhook delivery is not configured.** Your supplied CSV contains API keys only. `razorpay.webhook-secret` is intentionally empty, and the endpoint returns 503 until configured. Checkout confirmation and manual reconciliation work without webhooks.

To enable delivery later:

1. Provide a supported public HTTPS endpoint for this app. A direct localhost URL cannot receive Razorpay callbacks. The app currently binds to loopback only; no tunnel or public deployment was created.
2. Add the same chosen literal secret to `razorpay.webhook-secret` and your Razorpay **Test Mode** webhook configuration.
3. Subscribe to `payment.authorized`, `payment.captured`, `payment.failed`, `order.paid`, `refund.created`, `refund.processed` and `refund.failed`.
4. Rebuild/restart and test delivery/retries in the dashboard.

Do not reuse the API key secret as the webhook secret. The admin dashboard distinguishes a configured local secret from a verified external delivery setup.

## Money, retries and inventory

Amounts are integer paise. Browser-supplied prices are ignored. Database locks serialize cart/checkout changes and inventory reservation. Gateway calls happen outside database transactions. Unique identifiers, checkout tokens, refund tokens, raw-body signatures, owner checks, CSRF and audit records protect the payment flow.

An abandoned order remains pending, with stock reserved. There is no automatic stock-expiry job: releasing stock while an old gateway order is still payable could oversell. This local learning app also does not implement tax invoicing, shipping fulfilment, email delivery or production deployment. The printable order page is explicitly a receipt, not a tax invoice.

Refunds never restore inventory automatically; a financial refund is not evidence of returned merchandise. An administrator can deliberately adjust available stock after a return. Dashboard totals are gross confirmed test payments and processed refunds, shown separately.

## Tests

```powershell
mvn test
mvn clean package
```

Tests cover exact pricing, HMAC tampering, registration/BCrypt, login, guest redirects, logout, CSRF, authorization and ownership, stock rollback, concurrent checkout idempotency, immutable price snapshots, uncertain gateway submission, captured/authorized/failed states, mismatched gateway evidence, duplicate/out-of-order webhooks, and refund retry/remaining-balance behavior. They mock the remote gateway and never charge a real payment.

`python tools/smoke_test.py` checks a running packaged WAR, including the retained sample order FF–1. `python tools/check_secrets.py` checks for accidental copies of the supplied secret. The recorded verification run passed 30 automated tests and 32 packaged-WAR HTTP checks.

## Source guide

See `docs/IMPLEMENTATION.md` for the file-by-file guide and how each phase fits together. Complete code is in the linked source files rather than repeated in this document. Secrets are excluded from the guide.

## Code formatting

Java uses four-space indentation, annotations above declarations, separate statements and expanded method bodies. Method and constructor parameters stay together on the declaration line; they are not automatically split into one argument per line. VS Code can use the saved `Readable Java` formatter profile in `tools/formatting/java.xml`.

To reapply the same formatting:

```powershell
./tools/formatting/format-code.ps1
```

The helper formats Java, JSP, authored CSS/JavaScript/SVG, Maven XML and Python scripts. Formatting tools are installed inside this project; no environment variables or global packages are required. Vendor bundles, credentials and the already-applied Flyway migration are excluded. Keeping the migration unchanged preserves the existing database's Flyway checksum.

## Verified official references

- [Spring Boot 3.5.16 / Java 25 compatibility](https://docs.spring.io/spring-boot/3.5/system-requirements.html)
- [Spring Security reference](https://docs.spring.io/spring-security/reference/)
- [Razorpay Standard Checkout and server verification](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [Webhook signatures, retry delivery and ordering](https://razorpay.com/docs/webhooks/validate-test/)
- [Normal refund idempotency — official Razorpay source](https://github.com/razorpay/markdown-docs/blob/master/api/refunds/normal-refunds-idempotent.md)
- [Bootstrap 5.3.8](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

The application uses Spring's synchronous `RestClient` against Razorpay's documented HTTP endpoints instead of an SDK. This avoids an extra SDK dependency; compatibility is verified through Java compilation, service tests and the Test Mode API. No unsupported SDK method signatures are assumed.
