# Verification — 6 November 2026

## Build and automated checks

- `mvn -B -ntp package`: **BUILD SUCCESS**, Java 25, Spring Boot 3.5.16.
- **30 tests passed**, zero failures/errors/skips. Mockito/Byte Buddy ran without experimental Java compatibility flags.
- Executable JSP WAR: `target/ecommerce-payments-0.0.1-SNAPSHOT.war`.
- `python tools/smoke_test.py`: **32 checks passed** against the actual running WAR, covering JSP rendering, bundled assets, live admin login/logout, CSRF rejection, cache headers, missing-resource handling and blocked secret/config URLs.
- `python tools/check_secrets.py`: no supplied API secret in source/docs/logs outside the ignored local configuration. The supplied CSV and packaged artifacts are excluded from the scan by design.

## Browser checks

- Desktop storefront, product details, bag, checkout, login, admin overview, catalogue management, refund page and receipt rendered successfully.
- Mobile layout checked at 390 × 844: storefront, session login, admin navigation/KPIs, and receipt. An admin grid overflow issue was found and fixed. Final admin and receipt document widths fit the viewport; tables/navigation scroll within their containers.
- JSP source files explicitly use UTF-8. Currency, arrows and punctuation render correctly.
- Sign-in and sign-out worked in the browser. Restarting invalidated the session while retaining H2 records.
- Final browser viewport override was reset, and the account was signed out.

## Actual Razorpay Test Mode checks

These calls used the supplied test credentials, not live-mode keys. No real money moved.

1. Authenticated the Orders API successfully (HTTP 200).
2. Created a gateway order through the local checkout for order **FF–1**, total **₹1,499**.
3. Hosted Checkout opened in **Test Mode**.
4. A cancelled netbanking attempt and a rejected test-card attempt remained failed, without fulfilment.
5. A domestic sandbox card payment succeeded. The local callback verified the signature, fetched the payment independently and recorded **CAPTURED / PAID**.
6. An administrator requested a **₹1 partial refund**. Razorpay initially returned pending; subsequent API reconciliation confirmed **processed**, and the order became **PARTIALLY_REFUNDED**.
7. The remaining **₹1,498** test refund was rejected by Razorpay with HTTP 400: `BAD_REQUEST_ERROR`, reason `NA`, description `invalid request sent`. A retry reused the original idempotency key. The local refund is **failed**, not processed, and the order retains its confirmed partial-refund status. No replacement request was made. The complete-refund business rules and status transitions pass automated tests with a mocked gateway, but a full refund was not completed in this account's sandbox session.

The sample order, gateway attempts, partial refund, failed remaining-balance request and audit trail are retained in H2 for inspection. Product inventory correctly remains reduced by one, because a refund is not a physical return.

## Remaining external setup

**Webhook delivery was not configured or end-to-end tested.** The supplied material has no webhook secret or public HTTPS callback address. The implemented endpoint rejects unconfigured delivery (503), validates raw bytes when configured, and passes automated signature/deduplication/out-of-order/retry tests. Use the README setup instructions to configure a public endpoint later.

No PostgreSQL, environment variables, public deployment, tunnel, live-mode account changes or real-payment credentials were used. The owned local preview server was stopped after verification. Start the saved application using `./run.ps1`.
