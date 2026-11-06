# Implementation guide

All paths are relative to `D:\learning-hub\ecommerce-payment`. Each source link opens the complete code for that file. The literal credential file is deliberately omitted.

## Phase 1 — Application setup

- **Pins the Java/Spring toolchain, WAR packaging, JSP/JSTL, persistence, security, validation, and test dependencies.** [pom.xml](../pom.xml)
- **Bootstraps embedded Tomcat and also supports deployment as a servlet WAR.** [src/main/java/com/example/ecommerce/EcommerceApplication.java](../src/main/java/com/example/ecommerce/EcommerceApplication.java)
- **Documents literal local H2, session, view, admin and Razorpay settings without copying your API credentials.** [src/main/resources/application.example.properties](../src/main/resources/application.example.properties)
- **Creates the schema, foreign keys, unique gateway identifiers, indexes and money/stock constraints.** [src/main/resources/db/migration/V1__store.sql](../src/main/resources/db/migration/V1__store.sql)
- **Builds a missing WAR and runs it from the project directory without setting environment variables.** [run.ps1](../run.ps1)

## Phase 2 — Authentication and shared page behavior

- **Configures BCrypt, form login, sessions, CSRF, admin authorization, guest-only routes, logout and cache headers.** [src/main/java/com/example/ecommerce/config/SecurityConfig.java](../src/main/java/com/example/ecommerce/config/SecurityConfig.java)
- **Validates password confirmation, normalizes email, and registers customer accounts with BCrypt hashes.** [src/main/java/com/example/ecommerce/service/AccountService.java](../src/main/java/com/example/ecommerce/service/AccountService.java)
- **Serves the JSP login/registration forms and handles registration validation.** [src/main/java/com/example/ecommerce/controller/AuthController.java](../src/main/java/com/example/ecommerce/controller/AuthController.java)
- **Adds the current user and server-calculated cart count to rendered pages.** [src/main/java/com/example/ecommerce/controller/PageAdvice.java](../src/main/java/com/example/ecommerce/controller/PageAdvice.java)
- **Renders safe error messages and non-success webhook responses without exposing gateway exception bodies.** [src/main/java/com/example/ecommerce/controller/Errors.java](../src/main/java/com/example/ecommerce/controller/Errors.java)
- **Renders servlet/security 403/404/error dispatches with the same JSP layout.** [src/main/java/com/example/ecommerce/controller/ErrorPageController.java](../src/main/java/com/example/ecommerce/controller/ErrorPageController.java)

## Phase 3 — Catalog and cart

- **Creates six original sample products and an initial local test administrator.** [src/main/java/com/example/ecommerce/config/SeedData.java](../src/main/java/com/example/ecommerce/config/SeedData.java)
- **Locks and saves admin product edits using validated fields and exact price parsing.** [src/main/java/com/example/ecommerce/service/CatalogService.java](../src/main/java/com/example/ecommerce/service/CatalogService.java)
- **Persists cart items, serializes cart changes, validates quantities and calculates totals from database prices.** [src/main/java/com/example/ecommerce/service/CartService.java](../src/main/java/com/example/ecommerce/service/CartService.java)
- **Formats integer paise and parses rupee input without floating-point rounding.** [src/main/java/com/example/ecommerce/service/Money.java](../src/main/java/com/example/ecommerce/service/Money.java)
- **Handles product search, category filters, pagination, product pages and authenticated cart mutations.** [src/main/java/com/example/ecommerce/controller/StoreController.java](../src/main/java/com/example/ecommerce/controller/StoreController.java)

## Phase 4 — Orders and Razorpay

- **Enforces ownership, creates immutable order snapshots, reserves stock under locks and records audit history.** [src/main/java/com/example/ecommerce/service/OrderService.java](../src/main/java/com/example/ecommerce/service/OrderService.java)
- **Verifies HMAC-SHA256 signatures against raw bytes with constant-time comparison.** [src/main/java/com/example/ecommerce/payment/SignatureVerifier.java](../src/main/java/com/example/ecommerce/payment/SignatureVerifier.java)
- **Makes authenticated Test Mode HTTP requests with bounded timeouts. Only its public key reaches a page.** [src/main/java/com/example/ecommerce/payment/RazorpayGateway.java](../src/main/java/com/example/ecommerce/payment/RazorpayGateway.java)
- **Coordinates remote calls outside transactions, trusted payment evidence, monotonic status changes, webhook deduplication and refund reconciliation.** [src/main/java/com/example/ecommerce/service/PaymentService.java](../src/main/java/com/example/ecommerce/service/PaymentService.java)
- **Validates addresses, binds checkout tokens to the session, renders order pages and verifies/reconciles customer payments.** [src/main/java/com/example/ecommerce/controller/CheckoutController.java](../src/main/java/com/example/ecommerce/controller/CheckoutController.java)
- **Passes untouched request bytes and signature/event headers into verified webhook processing.** [src/main/java/com/example/ecommerce/controller/WebhookController.java](../src/main/java/com/example/ecommerce/controller/WebhookController.java)

## Phase 5 — Administration and refunds

- **Renders KPIs, product editing, order management, payment ledger and full/partial test-refund actions behind ADMIN authorization.** [src/main/java/com/example/ecommerce/controller/AdminController.java](../src/main/java/com/example/ecommerce/controller/AdminController.java)

## Phase 6 — Verification

- **Checks an independent HMAC test vector, signature tampering, checkout construction and exact money validation.** [src/test/java/com/example/ecommerce/SignatureAndMoneyTest.java](../src/test/java/com/example/ecommerce/SignatureAndMoneyTest.java)
- **Exercises MVC security and actual JPA/Flyway persistence with H2 and a mocked gateway, including concurrent checkout and refund limits.** [src/test/java/com/example/ecommerce/StoreIntegrationTest.java](../src/test/java/com/example/ecommerce/StoreIntegrationTest.java)

## Entity and repository files

Entities map individual database records. Repositories provide typed persistence queries, unique-identifier lookups and row-lock queries. IDs refer to foreign keys enforced by Flyway; controllers never bind database entities directly.

- Records timestamped order/payment/refund state changes without sensitive payloads. [AuditEntry.java](../src/main/java/com/example/ecommerce/entity/AuditEntry.java) · [AuditEntryRepository.java](../src/main/java/com/example/ecommerce/repository/AuditEntryRepository.java)
- Stores one customer/product quantity, unique per user and product. [CartItem.java](../src/main/java/com/example/ecommerce/entity/CartItem.java) · [CartItemRepository.java](../src/main/java/com/example/ecommerce/repository/CartItemRepository.java)
- Stores owner, delivery snapshot, test gateway order, checkout token and financial status. [Order.java](../src/main/java/com/example/ecommerce/entity/Order.java) · [OrderRepository.java](../src/main/java/com/example/ecommerce/repository/OrderRepository.java)
- Preserves product name, price and quantity at checkout. [OrderItem.java](../src/main/java/com/example/ecommerce/entity/OrderItem.java) · [OrderItemRepository.java](../src/main/java/com/example/ecommerce/repository/OrderItemRepository.java)
- Records a unique Razorpay payment and its trusted current state. [Payment.java](../src/main/java/com/example/ecommerce/entity/Payment.java) · [PaymentRepository.java](../src/main/java/com/example/ecommerce/repository/PaymentRepository.java)
- Stores catalog details, integer price and available stock. [Product.java](../src/main/java/com/example/ecommerce/entity/Product.java) · [ProductRepository.java](../src/main/java/com/example/ecommerce/repository/ProductRepository.java)
- Records a unique refund/request token, amount and reserved or confirmed state. [Refund.java](../src/main/java/com/example/ecommerce/entity/Refund.java) · [RefundRepository.java](../src/main/java/com/example/ecommerce/repository/RefundRepository.java)
- Stores normalized account identity, BCrypt hash and server-assigned role. [User.java](../src/main/java/com/example/ecommerce/entity/User.java) · [UserRepository.java](../src/main/java/com/example/ecommerce/repository/UserRepository.java)
- Marks successfully processed or ignored gateway event IDs for deduplication. [WebhookEvent.java](../src/main/java/com/example/ecommerce/entity/WebhookEvent.java) · [WebhookEventRepository.java](../src/main/java/com/example/ecommerce/repository/WebhookEventRepository.java)

## Validated forms

DTOs define the allowed browser input and server validation. No client can submit role, payment status, or a customer-controlled order amount.

- [AddressForm.java](../src/main/java/com/example/ecommerce/dto/AddressForm.java)
- [ProductForm.java](../src/main/java/com/example/ecommerce/dto/ProductForm.java)
- [RegisterForm.java](../src/main/java/com/example/ecommerce/dto/RegisterForm.java)

## JSP pages and shared assets

JSP files render the server model with escaped dynamic text. CSRF fields appear in every mutation form. Shared fragments keep header, footer and admin navigation consistent. UTF-8 source encoding preserves currency and punctuation.

- [admin/dashboard.jsp](../src/main/webapp/WEB-INF/views/admin/dashboard.jsp)
- [admin/orders.jsp](../src/main/webapp/WEB-INF/views/admin/orders.jsp)
- [admin/payments.jsp](../src/main/webapp/WEB-INF/views/admin/payments.jsp)
- [admin/products.jsp](../src/main/webapp/WEB-INF/views/admin/products.jsp)
- [admin/refunds.jsp](../src/main/webapp/WEB-INF/views/admin/refunds.jsp)
- [auth/login.jsp](../src/main/webapp/WEB-INF/views/auth/login.jsp)
- [auth/register.jsp](../src/main/webapp/WEB-INF/views/auth/register.jsp)
- [checkout/checkout.jsp](../src/main/webapp/WEB-INF/views/checkout/checkout.jsp)
- [error.jsp](../src/main/webapp/WEB-INF/views/error.jsp)
- [fragments/admin.jspf](../src/main/webapp/WEB-INF/views/fragments/admin.jspf)
- [fragments/csrf.jspf](../src/main/webapp/WEB-INF/views/fragments/csrf.jspf)
- [fragments/footer.jspf](../src/main/webapp/WEB-INF/views/fragments/footer.jspf)
- [fragments/head.jspf](../src/main/webapp/WEB-INF/views/fragments/head.jspf)
- [fragments/order-table.jspf](../src/main/webapp/WEB-INF/views/fragments/order-table.jspf)
- [orders/detail.jsp](../src/main/webapp/WEB-INF/views/orders/detail.jsp)
- [orders/history.jsp](../src/main/webapp/WEB-INF/views/orders/history.jsp)
- [shop/cart.jsp](../src/main/webapp/WEB-INF/views/shop/cart.jsp)
- [shop/product.jsp](../src/main/webapp/WEB-INF/views/shop/product.jsp)
- [shop/products.jsp](../src/main/webapp/WEB-INF/views/shop/products.jsp)

- [store.css](../src/main/webapp/assets/css/store.css) defines the responsive cream/forest visual system, mobile layouts, keyboard focus and print receipt.
- [store.js](../src/main/webapp/assets/js/store.js) adds native constraint validation, password confirmation, loading guards, table filtering and hosted Checkout callbacks.
- `src/main/webapp/assets/images/` contains six original SVG product illustrations and the brand mark.
- `src/main/webapp/assets/vendor/` contains pinned local Bootstrap, icons and typefaces.

## Payment transaction boundary

1. Lock the user and product rows; validate current stock and calculate exact prices.
2. Save the local order/snapshots, decrement available stock once, clear the cart, and commit.
3. Call Razorpay without holding a database transaction open.
4. Lock the local order to attach the gateway ID or record an uncertain outcome.
5. Verify callback signature; fetch authoritative payment data outside a transaction.
6. Lock the local order and apply an idempotent, monotonic state change plus audit records.
7. For refunds, reconcile existing gateway refunds, reserve the remaining balance under a lock, submit with the same idempotency key, and reconcile the result.

See [README](../README.md) for runtime instructions, account details, webhook setup and explicit local-demo limits.
