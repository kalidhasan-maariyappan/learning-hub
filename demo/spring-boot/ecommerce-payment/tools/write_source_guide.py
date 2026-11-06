from pathlib import Path

root = Path(__file__).resolve().parents[1]
groups = {
    "Phase 1 — Application setup": {
        "pom.xml": "Pins the Java/Spring toolchain, WAR packaging, JSP/JSTL, persistence, security, validation, and test dependencies.",
        "src/main/java/com/example/ecommerce/EcommerceApplication.java": "Bootstraps embedded Tomcat and also supports deployment as a servlet WAR.",
        "src/main/resources/application.example.properties": "Documents literal local H2, session, view, admin and Razorpay settings without copying your API credentials.",
        "src/main/resources/db/migration/V1__store.sql": "Creates the schema, foreign keys, unique gateway identifiers, indexes and money/stock constraints.",
        "run.ps1": "Builds a missing WAR and runs it from the project directory without setting environment variables.",
    },
    "Phase 2 — Authentication and shared page behavior": {
        "src/main/java/com/example/ecommerce/config/SecurityConfig.java": "Configures BCrypt, form login, sessions, CSRF, admin authorization, guest-only routes, logout and cache headers.",
        "src/main/java/com/example/ecommerce/service/AccountService.java": "Validates password confirmation, normalizes email, and registers customer accounts with BCrypt hashes.",
        "src/main/java/com/example/ecommerce/controller/AuthController.java": "Serves the JSP login/registration forms and handles registration validation.",
        "src/main/java/com/example/ecommerce/controller/PageAdvice.java": "Adds the current user and server-calculated cart count to rendered pages.",
        "src/main/java/com/example/ecommerce/controller/Errors.java": "Renders safe error messages and non-success webhook responses without exposing gateway exception bodies.",
        "src/main/java/com/example/ecommerce/controller/ErrorPageController.java": "Renders servlet/security 403/404/error dispatches with the same JSP layout.",
    },
    "Phase 3 — Catalog and cart": {
        "src/main/java/com/example/ecommerce/config/SeedData.java": "Creates six original sample products and an initial local test administrator.",
        "src/main/java/com/example/ecommerce/service/CatalogService.java": "Locks and saves admin product edits using validated fields and exact price parsing.",
        "src/main/java/com/example/ecommerce/service/CartService.java": "Persists cart items, serializes cart changes, validates quantities and calculates totals from database prices.",
        "src/main/java/com/example/ecommerce/service/Money.java": "Formats integer paise and parses rupee input without floating-point rounding.",
        "src/main/java/com/example/ecommerce/controller/StoreController.java": "Handles product search, category filters, pagination, product pages and authenticated cart mutations.",
    },
    "Phase 4 — Orders and Razorpay": {
        "src/main/java/com/example/ecommerce/service/OrderService.java": "Enforces ownership, creates immutable order snapshots, reserves stock under locks and records audit history.",
        "src/main/java/com/example/ecommerce/payment/SignatureVerifier.java": "Verifies HMAC-SHA256 signatures against raw bytes with constant-time comparison.",
        "src/main/java/com/example/ecommerce/payment/RazorpayGateway.java": "Makes authenticated Test Mode HTTP requests with bounded timeouts. Only its public key reaches a page.",
        "src/main/java/com/example/ecommerce/service/PaymentService.java": "Coordinates remote calls outside transactions, trusted payment evidence, monotonic status changes, webhook deduplication and refund reconciliation.",
        "src/main/java/com/example/ecommerce/controller/CheckoutController.java": "Validates addresses, binds checkout tokens to the session, renders order pages and verifies/reconciles customer payments.",
        "src/main/java/com/example/ecommerce/controller/WebhookController.java": "Passes untouched request bytes and signature/event headers into verified webhook processing.",
    },
    "Phase 5 — Administration and refunds": {
        "src/main/java/com/example/ecommerce/controller/AdminController.java": "Renders KPIs, product editing, order management, payment ledger and full/partial test-refund actions behind ADMIN authorization.",
    },
    "Phase 6 — Verification": {
        "src/test/java/com/example/ecommerce/SignatureAndMoneyTest.java": "Checks an independent HMAC test vector, signature tampering, checkout construction and exact money validation.",
        "src/test/java/com/example/ecommerce/StoreIntegrationTest.java": "Exercises MVC security and actual JPA/Flyway persistence with H2 and a mocked gateway, including concurrent checkout and refund limits.",
    },
}
lines = [
    "# Implementation guide",
    "",
    "All paths are relative to `D:\\learning-hub\\ecommerce-payment`. Each source link opens the complete code for that file. The literal credential file is deliberately omitted.",
    "",
]
for group, files in groups.items():
    lines += ["## " + group, ""]
    for file, why in files.items():
        lines += [f"- **{why}** [{file}](../{file})"]
    lines += [""]
lines += [
    "## Entity and repository files",
    "",
    "Entities map individual database records. Repositories provide typed persistence queries, unique-identifier lookups and row-lock queries. IDs refer to foreign keys enforced by Flyway; controllers never bind database entities directly.",
    "",
]
for p in sorted((root / "src/main/java/com/example/ecommerce/entity").glob("*.java")):
    name = p.stem
    reasons = {
        "User": "Stores normalized account identity, BCrypt hash and server-assigned role.",
        "Product": "Stores catalog details, integer price and available stock.",
        "CartItem": "Stores one customer/product quantity, unique per user and product.",
        "Order": "Stores owner, delivery snapshot, test gateway order, checkout token and financial status.",
        "OrderItem": "Preserves product name, price and quantity at checkout.",
        "Payment": "Records a unique Razorpay payment and its trusted current state.",
        "Refund": "Records a unique refund/request token, amount and reserved or confirmed state.",
        "WebhookEvent": "Marks successfully processed or ignored gateway event IDs for deduplication.",
        "AuditEntry": "Records timestamped order/payment/refund state changes without sensitive payloads.",
    }
    path = p.relative_to(root).as_posix()
    repo = f"src/main/java/com/example/ecommerce/repository/{name}Repository.java"
    lines += [f"- {reasons[name]} [{name}.java](../{path}) · [{name}Repository.java](../{repo})"]
lines += [
    "",
    "## Validated forms",
    "",
    "DTOs define the allowed browser input and server validation. No client can submit role, payment status, or a customer-controlled order amount.",
    "",
]
for p in sorted((root / "src/main/java/com/example/ecommerce/dto").glob("*.java")):
    lines += [f"- [{p.name}](../{p.relative_to(root).as_posix()})"]
lines += [
    "",
    "## JSP pages and shared assets",
    "",
    "JSP files render the server model with escaped dynamic text. CSRF fields appear in every mutation form. Shared fragments keep header, footer and admin navigation consistent. UTF-8 source encoding preserves currency and punctuation.",
    "",
]
for p in sorted((root / "src/main/webapp/WEB-INF/views").rglob("*")):
    if p.is_file():
        lines += [f'- [{p.relative_to(root/"src/main/webapp/WEB-INF/views").as_posix()}](../{p.relative_to(root).as_posix()})']
lines += [
    "",
    "- [store.css](../src/main/webapp/assets/css/store.css) defines the responsive cream/forest visual system, mobile layouts, keyboard focus and print receipt.",
    "- [store.js](../src/main/webapp/assets/js/store.js) adds native constraint validation, password confirmation, loading guards, table filtering and hosted Checkout callbacks.",
    "- `src/main/webapp/assets/images/` contains six original SVG product illustrations and the brand mark.",
    "- `src/main/webapp/assets/vendor/` contains pinned local Bootstrap, icons and typefaces.",
    "",
    "## Payment transaction boundary",
    "",
    "1. Lock the user and product rows; validate current stock and calculate exact prices.",
    "2. Save the local order/snapshots, decrement available stock once, clear the cart, and commit.",
    "3. Call Razorpay without holding a database transaction open.",
    "4. Lock the local order to attach the gateway ID or record an uncertain outcome.",
    "5. Verify callback signature; fetch authoritative payment data outside a transaction.",
    "6. Lock the local order and apply an idempotent, monotonic state change plus audit records.",
    "7. For refunds, reconcile existing gateway refunds, reserve the remaining balance under a lock, submit with the same idempotency key, and reconcile the result.",
    "",
    "See [README](../README.md) for runtime instructions, account details, webhook setup and explicit local-demo limits.",
]
(root / "docs").mkdir(exist_ok=True)
(root / "docs/IMPLEMENTATION.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("Source guide generated without credentials.")
