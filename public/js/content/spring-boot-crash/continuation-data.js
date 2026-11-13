// Authored continuation lessons with complete local source files.
window.JT.bootCrashExtensionLessons=[
  {
    "slug": "sbc_app_01",
    "number": 1,
    "group": "application",
    "title": "Request Validation",
    "intro": "Now we are going to stop invalid requests before they reach the order service. A quantity of zero is valid JSON, but it is not a valid order.",
    "module": "commerce",
    "sections": [
      {
        "heading": "What does validation check?",
        "paragraphs": [
          "JSON parsing checks whether a request can be read. Bean Validation checks whether its values satisfy our rules. We will require a product name and allow between 1 and 20 items."
        ]
      },
      {
        "heading": "Create the request record",
        "paragraphs": [
          "Open OrderController.java. CreateOrder is a request DTO: it describes the input contract without exposing the persistence entity. @NotBlank rejects missing or whitespace-only names; @Min and @Max bound the quantity. @Valid on the controller parameter triggers these checks before create executes."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/OrderController.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.validation.Valid;\r\nimport jakarta.validation.constraints.*;\r\nimport java.net.URI;\r\nimport java.security.Principal;\r\nimport org.springframework.data.domain.*;\r\nimport org.springframework.http.*;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestController\r\n@RequestMapping(\"/api/v1/orders\")\r\npublic class OrderController {\r\n  public record CreateOrder(\r\n      @NotBlank @Size(max = 100) String product, @Min(1) @Max(20) int quantity) {}\r\n\r\n  private final OrderService service;\r\n  private final Orders orders;\r\n\r\n  public OrderController(OrderService service, Orders orders) {\r\n    this.service = service;\r\n    this.orders = orders;\r\n  }\r\n\r\n  @PostMapping\r\n  public ResponseEntity<PurchaseOrder> create(\r\n      @Valid @RequestBody CreateOrder request, Principal principal) {\r\n    var o = service.create(principal.getName(), request);\r\n    return ResponseEntity.created(URI.create(\"/api/v1/orders/\" + o.id)).body(o);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public PurchaseOrder get(@PathVariable Long id, Principal p) {\r\n    return service.owned(id, p.getName());\r\n  }\r\n\r\n  @GetMapping\r\n  public Page<PurchaseOrder> list(\r\n      Principal p,\r\n      @RequestParam(defaultValue = \"0\") @Min(0) int page,\r\n      @RequestParam(defaultValue = \"10\") @Min(1) @Max(100) int size) {\r\n    return orders.findByOwner(p.getName(), PageRequest.of(page, size, Sort.by(\"id\").descending()));\r\n  }\r\n\r\n  @PostMapping(\"/{id}/cancel\")\r\n  public PurchaseOrder cancel(@PathVariable Long id, @RequestParam long version, Principal p) {\r\n    return service.cancel(id, p.getName(), version);\r\n  }\r\n}\r\n",
            "sha256": "ed5a7cb06fbbaab0d25927fa3364f1d7d450c088d6e3faa3c596545e67c36ea4"
          }
        ]
      },
      {
        "heading": "Return useful field errors",
        "paragraphs": [
          "Open ApiErrors.java. Spring raises MethodArgumentNotValidException for a failed request body. The advice collects each field and message into a ProblemDetail response with HTTP 400. The client can display the errors next to its form fields."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/ApiErrors.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.http.*;\r\nimport org.springframework.orm.ObjectOptimisticLockingFailureException;\r\nimport org.springframework.web.bind.MethodArgumentNotValidException;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestControllerAdvice\r\npublic class ApiErrors {\r\n  @ExceptionHandler(MethodArgumentNotValidException.class)\r\n  @ResponseStatus(HttpStatus.BAD_REQUEST)\r\n  public ProblemDetail invalid(MethodArgumentNotValidException e) {\r\n    var p = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, \"Correct the request fields\");\r\n    p.setProperty(\r\n        \"errors\",\r\n        e.getBindingResult().getFieldErrors().stream()\r\n            .map(f -> Map.of(\"field\", f.getField(), \"message\", f.getDefaultMessage()))\r\n            .toList());\r\n    return p;\r\n  }\r\n\r\n  @ExceptionHandler(ObjectOptimisticLockingFailureException.class)\r\n  @ResponseStatus(HttpStatus.CONFLICT)\r\n  public ProblemDetail conflict() {\r\n    return ProblemDetail.forStatusAndDetail(\r\n        HttpStatus.CONFLICT, \"Another request updated this order. Reload it.\");\r\n  }\r\n}\r\n",
            "sha256": "4a331f28ef9f9186dfd158a87f2d203bd2d5b5aa1ced5b51287ed4c5b42233c6"
          }
        ]
      },
      {
        "heading": "Try valid and invalid input",
        "paragraphs": [
          "Send the example request, then change quantity to 0. The valid request returns 201; the invalid request returns 400 and an errors array. Confirm that the invalid request did not create an order."
        ],
        "request": [
          "POST",
          "/api/v1/orders",
          {
            "product": "Spring Boot Book",
            "quantity": 2
          }
        ],
        "exercise": "Add @Size(max=100) to a customer note field. Test both the boundary and one character beyond it."
      }
    ]
  },
  {
    "slug": "sbc_app_02",
    "number": 2,
    "group": "application",
    "title": "REST API Design",
    "intro": "Now we will make the order API predictable for its callers. The URL, HTTP status, and response body are all part of the contract.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Choose a resource and version",
        "paragraphs": [
          "An order is a resource, so the collection is /api/v1/orders and one order is /api/v1/orders/{id}. The v1 prefix leaves a clear place for an incompatible future contract. Do not create a new version for every internal refactoring."
        ]
      },
      {
        "heading": "Use status codes deliberately",
        "paragraphs": [
          "POST returns 201 Created with a Location header. GET returns 200. A missing or inaccessible order returns 404. Invalid fields return 400; a stale cancellation returns 409. These distinctions let callers choose the right response."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/OrderController.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.validation.Valid;\r\nimport jakarta.validation.constraints.*;\r\nimport java.net.URI;\r\nimport java.security.Principal;\r\nimport org.springframework.data.domain.*;\r\nimport org.springframework.http.*;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestController\r\n@RequestMapping(\"/api/v1/orders\")\r\npublic class OrderController {\r\n  public record CreateOrder(\r\n      @NotBlank @Size(max = 100) String product, @Min(1) @Max(20) int quantity) {}\r\n\r\n  private final OrderService service;\r\n  private final Orders orders;\r\n\r\n  public OrderController(OrderService service, Orders orders) {\r\n    this.service = service;\r\n    this.orders = orders;\r\n  }\r\n\r\n  @PostMapping\r\n  public ResponseEntity<PurchaseOrder> create(\r\n      @Valid @RequestBody CreateOrder request, Principal principal) {\r\n    var o = service.create(principal.getName(), request);\r\n    return ResponseEntity.created(URI.create(\"/api/v1/orders/\" + o.id)).body(o);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public PurchaseOrder get(@PathVariable Long id, Principal p) {\r\n    return service.owned(id, p.getName());\r\n  }\r\n\r\n  @GetMapping\r\n  public Page<PurchaseOrder> list(\r\n      Principal p,\r\n      @RequestParam(defaultValue = \"0\") @Min(0) int page,\r\n      @RequestParam(defaultValue = \"10\") @Min(1) @Max(100) int size) {\r\n    return orders.findByOwner(p.getName(), PageRequest.of(page, size, Sort.by(\"id\").descending()));\r\n  }\r\n\r\n  @PostMapping(\"/{id}/cancel\")\r\n  public PurchaseOrder cancel(@PathVariable Long id, @RequestParam long version, Principal p) {\r\n    return service.cancel(id, p.getName(), version);\r\n  }\r\n}\r\n",
            "sha256": "ed5a7cb06fbbaab0d25927fa3364f1d7d450c088d6e3faa3c596545e67c36ea4"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/ApiErrors.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.http.*;\r\nimport org.springframework.orm.ObjectOptimisticLockingFailureException;\r\nimport org.springframework.web.bind.MethodArgumentNotValidException;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestControllerAdvice\r\npublic class ApiErrors {\r\n  @ExceptionHandler(MethodArgumentNotValidException.class)\r\n  @ResponseStatus(HttpStatus.BAD_REQUEST)\r\n  public ProblemDetail invalid(MethodArgumentNotValidException e) {\r\n    var p = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, \"Correct the request fields\");\r\n    p.setProperty(\r\n        \"errors\",\r\n        e.getBindingResult().getFieldErrors().stream()\r\n            .map(f -> Map.of(\"field\", f.getField(), \"message\", f.getDefaultMessage()))\r\n            .toList());\r\n    return p;\r\n  }\r\n\r\n  @ExceptionHandler(ObjectOptimisticLockingFailureException.class)\r\n  @ResponseStatus(HttpStatus.CONFLICT)\r\n  public ProblemDetail conflict() {\r\n    return ProblemDetail.forStatusAndDetail(\r\n        HttpStatus.CONFLICT, \"Another request updated this order. Reload it.\");\r\n  }\r\n}\r\n",
            "sha256": "4a331f28ef9f9186dfd158a87f2d203bd2d5b5aa1ced5b51287ed4c5b42233c6"
          }
        ]
      },
      {
        "heading": "Keep ownership at the service boundary",
        "paragraphs": [
          "OrderService.owned checks the authenticated owner before returning an order. We return 404 for another user’s order so the endpoint does not confirm that their ID exists. Never trust an owner field supplied in JSON."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/OrderService.java",
            "text": "package hub.commerce;\r\n\r\nimport io.micrometer.core.instrument.MeterRegistry;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class OrderService {\r\n  private final Orders orders;\r\n  private final MeterRegistry metrics;\r\n\r\n  public OrderService(Orders orders, MeterRegistry metrics) {\r\n    this.orders = orders;\r\n    this.metrics = metrics;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder create(String owner, OrderController.CreateOrder request) {\r\n    var order = orders.save(new PurchaseOrder(owner, request.product(), request.quantity()));\r\n    metrics.counter(\"commerce.orders.created\").increment();\r\n    return order;\r\n  }\r\n\r\n  public PurchaseOrder owned(Long id, String owner) {\r\n    var o =\r\n        orders\r\n            .findById(id)\r\n            .orElseThrow(\r\n                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\"));\r\n    if (!o.owner.equals(owner))\r\n      throw new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\");\r\n    return o;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder cancel(Long id, String owner, long expectedVersion) {\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (!o.owner.equals(owner)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);\r\n    if (o.version != expectedVersion || !o.status.equals(\"PENDING\"))\r\n      throw new ResponseStatusException(HttpStatus.CONFLICT, \"Reload the order before cancelling\");\r\n    o.status = \"CANCELLED\";\r\n    return o;\r\n  }\r\n}\r\n",
            "sha256": "8686ae57b9a53b40f80b1d361fc0d8d87829c5c00d3e41d3d7e9f00a05fd8602"
          }
        ]
      },
      {
        "heading": "Paginate the collection",
        "paragraphs": [
          "page starts at zero. size is bounded to prevent one request loading the entire table. The server fixes the sort to descending ID in this example; clients cannot inject arbitrary sort expressions."
        ],
        "request": [
          "GET",
          "/api/v1/orders?page=0&size=5"
        ],
        "exercise": "Create six orders, request two pages of size five, and check that the final page contains one order."
      }
    ]
  },
  {
    "slug": "sbc_app_03",
    "number": 3,
    "group": "application",
    "title": "OpenAPI and Swagger UI",
    "intro": "Now we are going to make our API discoverable. Instead of asking another developer to guess the request fields, we will publish a machine-readable contract.",
    "module": "commerce",
    "sections": [
      {
        "heading": "What is OpenAPI?",
        "paragraphs": [
          "OpenAPI describes paths, parameters, schemas and responses. Swagger UI displays that document as an interactive page. The document describes the API; it does not enforce authorization or validation."
        ]
      },
      {
        "heading": "Add the compatible dependency",
        "paragraphs": [
          "The continuation uses Boot 3.5.16 and springdoc 2.8.17. Open pom.xml and locate springdoc-openapi-starter-webmvc-ui. Reload Maven, start the application, and open /v3/api-docs and /swagger-ui/index.html."
        ],
        "files": [
          {
            "path": "commerce/pom.xml",
            "text": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"><modelVersion>4.0.0</modelVersion>\r\n<parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>3.5.16</version><relativePath/></parent>\r\n<groupId>hub</groupId><artifactId>commerce</artifactId><version>1.0.0</version><properties><java.version>25</java.version></properties>\r\n<dependencies><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-data-jpa</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-validation</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-security</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-actuator</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-aop</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-mail</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-amqp</artifactId></dependency>\r\n<dependency><groupId>com.h2database</groupId><artifactId>h2</artifactId></dependency>\r\n<dependency><groupId>org.postgresql</groupId><artifactId>postgresql</artifactId></dependency>\r\n<dependency><groupId>org.flywaydb</groupId><artifactId>flyway-core</artifactId></dependency>\r\n<dependency><groupId>org.flywaydb</groupId><artifactId>flyway-database-postgresql</artifactId></dependency>\r\n<dependency><groupId>org.springdoc</groupId><artifactId>springdoc-openapi-starter-webmvc-ui</artifactId><version>2.8.17</version></dependency>\r\n<dependency><groupId>io.github.resilience4j</groupId><artifactId>resilience4j-spring-boot3</artifactId><version>2.3.0</version></dependency>\r\n<dependency><groupId>io.micrometer</groupId><artifactId>micrometer-registry-prometheus</artifactId></dependency>\r\n<dependency><groupId>io.micrometer</groupId><artifactId>micrometer-tracing-bridge-otel</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.springframework.security</groupId><artifactId>spring-security-test</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.testcontainers</groupId><artifactId>postgresql</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.testcontainers</groupId><artifactId>junit-jupiter</artifactId><scope>test</scope></dependency>\r\n</dependencies><build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build></project>\r\n",
            "sha256": "4f30b21b00fd647531f6c0e9746faacc4b026f8756c2518e2b07f715323a637c"
          }
        ]
      },
      {
        "heading": "Read the generated contract",
        "paragraphs": [
          "Find POST /api/v1/orders. Compare the request schema with CreateOrder, including its required fields and numeric limits. The current UI exposes documentation publicly for local learning; restrict it when deploying private APIs."
        ]
      },
      {
        "heading": "Verify the document",
        "paragraphs": [
          "CommerceTest checks that the generated document includes the order collection. A document that loads but omits an endpoint is still an incomplete contract."
        ],
        "files": [
          {
            "path": "commerce/src/test/java/hub/commerce/CommerceTest.java",
            "text": "package hub.commerce;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\nimport static org.mockito.Mockito.*;\r\nimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;\r\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;\r\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;\r\n\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.junit.jupiter.api.*;\r\nimport org.mockito.ArgumentCaptor;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.test.context.bean.override.mockito.MockitoBean;\r\nimport org.springframework.test.web.servlet.MockMvc;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"spring.datasource.url=jdbc:h2:mem:commerce-tests;DB_CLOSE_DELAY=-1\",\r\n      \"payment.key=sk_test_fixture\",\r\n      \"payment.webhook-secret=whsec_fixture\",\r\n      \"management.health.mail.enabled=false\"\r\n    })\r\n@AutoConfigureMockMvc\r\nclass CommerceTest {\r\n  @Autowired MockMvc mvc;\r\n  @Autowired AuthService auth;\r\n  @Autowired JdbcTemplate db;\r\n  @Autowired Orders orders;\r\n  @MockitoBean JavaMailSender mail;\r\n  @MockitoBean PaymentClient payment;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from payment_event\");\r\n    db.update(\"delete from auth_token\");\r\n    db.update(\"delete from account\");\r\n    orders.deleteAll();\r\n    reset(mail, payment);\r\n  }\r\n\r\n  @Test\r\n  void invalidOrderReturnsFields() throws Exception {\r\n    mvc.perform(\r\n            post(\"/api/v1/orders\")\r\n                .with(user(\"learner@example.test\"))\r\n                .contentType(\"application/json\")\r\n                .content(\"{\\\"product\\\":\\\"\\\",\\\"quantity\\\":0}\"))\r\n        .andExpect(status().isBadRequest())\r\n        .andExpect(jsonPath(\"$.errors\").isArray());\r\n  }\r\n\r\n  @Test\r\n  void ownerCannotReadAnotherOrder() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void staleCancellationReturnsConflict() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/cancel?version=99\").with(user(\"alice\")))\r\n        .andExpect(status().isConflict());\r\n    assertEquals(\"PENDING\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  String register() {\r\n    auth.register(\"learner@example.test\", \"very-long-password\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String text = c.getValue().getText();\r\n    return text.substring(text.indexOf(\"token: \") + 7);\r\n  }\r\n\r\n  @Test\r\n  void verifyRefreshLogoutAndReset() {\r\n    String token = register();\r\n    assertThrows(Exception.class, () -> auth.login(\"learner@example.test\", \"very-long-password\"));\r\n    auth.verify(token);\r\n    var first = auth.login(\"learner@example.test\", \"very-long-password\");\r\n    assertEquals(\"learner@example.test\", auth.authenticate(first.accessToken()));\r\n    var second = auth.refresh(first.refreshToken());\r\n    assertNull(auth.authenticate(first.accessToken()));\r\n    assertThrows(Exception.class, () -> auth.refresh(first.refreshToken()));\r\n    auth.logout(second.refreshToken());\r\n    assertNull(auth.authenticate(second.accessToken()));\r\n    reset(mail);\r\n    auth.requestReset(\"learner@example.test\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String body = c.getValue().getText();\r\n    auth.reset(body.substring(body.indexOf(\"token: \") + 7), \"another-long-password\");\r\n    assertNotNull(auth.login(\"learner@example.test\", \"another-long-password\"));\r\n  }\r\n\r\n  @Test\r\n  void signedWebhookIsIdempotent() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.checkoutId = \"cs_fixture\";\r\n    o = orders.save(o);\r\n    String body =\r\n        \"{\\\"id\\\":\\\"evt_1\\\",\\\"type\\\":\\\"checkout.session.completed\\\",\\\"data\\\":{\\\"object\\\":{\\\"id\\\":\\\"cs_fixture\\\",\\\"payment_status\\\":\\\"paid\\\",\\\"payment_intent\\\":\\\"pi_fixture\\\",\\\"amount_total\\\":2500,\\\"currency\\\":\\\"usd\\\",\\\"metadata\\\":{\\\"orderId\\\":\\\"\"\r\n            + o.id\r\n            + \"\\\"}}}}\";\r\n    long time = java.time.Instant.now().getEpochSecond();\r\n    var mac = Mac.getInstance(\"HmacSHA256\");\r\n    mac.init(new SecretKeySpec(\"whsec_fixture\".getBytes(), \"HmacSHA256\"));\r\n    String signature =\r\n        \"t=\"\r\n            + time\r\n            + \",v1=\"\r\n            + HexFormat.of().formatHex(mac.doFinal((time + \".\" + body).getBytes()));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(\r\n              post(\"/webhooks/stripe\")\r\n                  .header(\"Stripe-Signature\", signature)\r\n                  .contentType(\"application/json\")\r\n                  .content(body))\r\n          .andExpect(status().isOk());\r\n    assertEquals(\"PAID\", orders.findById(o.id).orElseThrow().status);\r\n    assertEquals(1, db.queryForObject(\"select count(*) from payment_event\", Integer.class));\r\n    mvc.perform(post(\"/webhooks/stripe\").header(\"Stripe-Signature\", \"invalid\").content(body))\r\n        .andExpect(status().isBadRequest());\r\n  }\r\n\r\n  @Test\r\n  void checkoutUsesServerAmountAndReusesSession() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 2));\r\n    when(payment.checkout(any()))\r\n        .thenReturn(new PaymentClient.Checkout(\"cs_test\", \"https://checkout.stripe.com/test\"));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/checkout\").with(user(\"alice\")))\r\n          .andExpect(status().isOk());\r\n    verify(payment, times(1)).checkout(any());\r\n  }\r\n\r\n  @Test\r\n  void detailFetchAndRefundReconciliation() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.status = \"PAID\";\r\n    o.paymentId = \"pi_fixture\";\r\n    o = orders.save(o);\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id + \"/detail\").with(user(\"alice\")))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.lines[0].product\").value(\"Book\"));\r\n    doReturn(Map.of(\"id\", \"re_fixture\", \"status\", \"pending\"))\r\n        .when(payment)\r\n        .refund(o.id, \"pi_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/refund\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUND_PENDING\", orders.findById(o.id).orElseThrow().status);\r\n    doReturn(Map.of(\"status\", \"succeeded\")).when(payment).refundStatus(\"re_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/reconcile\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUNDED\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  @Test\r\n  void pdfUploadCannotBeReadByAnotherUser() throws Exception {\r\n    var upload =\r\n        new org.springframework.mock.web.MockMultipartFile(\r\n            \"file\", \"a.pdf\", \"application/pdf\", \"%PDF-fixture\".getBytes());\r\n    String response =\r\n        mvc.perform(multipart(\"/api/v1/files\").file(upload).with(user(\"alice\")))\r\n            .andExpect(status().isOk())\r\n            .andReturn()\r\n            .getResponse()\r\n            .getContentAsString();\r\n    String id =\r\n        new com.fasterxml.jackson.databind.ObjectMapper().readTree(response).get(\"id\").asText();\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"alice\"))).andExpect(status().isOk());\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void openApiAndMissingAuthentication() throws Exception {\r\n    mvc.perform(get(\"/v3/api-docs\"))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.paths['/api/v1/orders']\").exists());\r\n    mvc.perform(get(\"/api/v1/orders\")).andExpect(status().isUnauthorized());\r\n  }\r\n}\r\n",
            "sha256": "78434dc716cdb9970827f61365db92f6c802090e2ec11ffe8cc07f4a1ba604f3"
          }
        ],
        "exercise": "Add a description and documented 409 response to cancellation, then inspect the generated JSON."
      }
    ]
  },
  {
    "slug": "sbc_app_04",
    "number": 4,
    "group": "application",
    "title": "Database Migrations with Flyway",
    "intro": "Now we will give the database a version history. Application deployment should not depend on somebody remembering which SQL commands to run.",
    "module": "commerce",
    "sections": [
      {
        "heading": "What is a migration?",
        "paragraphs": [
          "A migration is an ordered schema change. Flyway records completed versions and applies new ones. V1__commerce.sql creates the first tables; a later change belongs in V2, rather than editing a migration already applied to a shared database."
        ]
      },
      {
        "heading": "Create the first schema",
        "paragraphs": [
          "Place the SQL file in src/main/resources/db/migration. The order table includes a version for concurrency control and a timestamp for creation. Token hashes are stored separately from account passwords."
        ],
        "files": [
          {
            "path": "commerce/src/main/resources/db/migration/V1__commerce.sql",
            "text": "create table purchase_order (id bigint generated by default as identity primary key, version bigint not null, owner varchar(255) not null, product varchar(255) not null, quantity integer not null, total_cents bigint not null, status varchar(255) not null, created_at timestamp with time zone not null, payment_id varchar(255), checkout_id varchar(255), refund_id varchar(255), checkout_url varchar(2048));\r\ncreate table account (email varchar(255) primary key, password varchar(255) not null, verified boolean not null);\r\ncreate table auth_token (hash varchar(64) primary key, email varchar(255) not null, kind varchar(32) not null, family varchar(255) not null, expires_at timestamp with time zone not null, consumed boolean not null);\r\ncreate table payment_event (id varchar(255) primary key);\r\ncreate table attachment (id varchar(255) primary key, owner varchar(255) not null, filename varchar(255) not null);\r\n",
            "sha256": "179b9958d2bf8046c738e171e810287cf6c05f28429dd38af6a144c6f0eff458"
          }
        ]
      },
      {
        "heading": "Let Hibernate validate",
        "paragraphs": [
          "Set spring.jpa.hibernate.ddl-auto=validate. Flyway owns schema changes; Hibernate checks that mappings agree with them. Avoid combining automatic update with migrations and hoping the two mechanisms stay consistent."
        ],
        "files": [
          {
            "path": "commerce/src/main/resources/application.properties",
            "text": "server.port=${PORT:8090}\r\nspring.datasource.url=${DB_URL:jdbc:h2:file:./data/commerce;DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=${DB_USER:sa}\r\nspring.datasource.password=${DB_PASSWORD:}\r\nspring.jpa.hibernate.ddl-auto=validate\r\nspring.jpa.open-in-view=false\r\nspring.jpa.properties.hibernate.jdbc.time_zone=UTC\r\nmanagement.health.rabbit.enabled=false\r\nmanagement.health.mail.enabled=false\r\nspring.mail.host=${MAIL_HOST:localhost}\r\nspring.mail.port=${MAIL_PORT:1025}\r\nspring.servlet.multipart.max-file-size=1MB\r\nspring.servlet.multipart.max-request-size=1MB\r\nmanagement.endpoints.web.exposure.include=health,info,prometheus\r\nmanagement.endpoint.health.probes.enabled=true\r\nmanagement.tracing.sampling.probability=1.0\r\npayment.base-url=${PAYMENT_BASE_URL:https://api.stripe.com}\r\npayment.key=${STRIPE_SECRET_KEY:}\r\npayment.webhook-secret=${STRIPE_WEBHOOK_SECRET:}\r\napp.public-url=${PUBLIC_URL:http://localhost:8090}\r\napp.mail-from=${MAIL_FROM:learning@example.test}\r\napp.upload-directory=${UPLOAD_DIRECTORY:./uploads}\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "85d8dc80a44f69f9dcec50b68c16676e29cf59bae2fcf8ad272c71ca770da513"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/PurchaseOrder.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.persistence.*;\r\nimport java.time.Instant;\r\n\r\n@Entity\r\npublic class PurchaseOrder {\r\n  @Id\r\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n  public Long id;\r\n\r\n  @Version public long version;\r\n  public String owner, product, status;\r\n  public int quantity;\r\n  public long totalCents;\r\n  public Instant createdAt;\r\n  public String paymentId, checkoutId, refundId;\r\n\r\n  @OneToMany(mappedBy = \"order\", cascade = CascadeType.ALL)\r\n  @com.fasterxml.jackson.annotation.JsonIgnore\r\n  public java.util.List<OrderLine> lines = new java.util.ArrayList<>();\r\n\r\n  @Column(length = 2048)\r\n  public String checkoutUrl;\r\n\r\n  protected PurchaseOrder() {}\r\n\r\n  public PurchaseOrder(String owner, String product, int quantity) {\r\n    this.lines.add(new OrderLine(this, product, quantity));\r\n    this.owner = owner;\r\n    this.product = product;\r\n    this.quantity = quantity;\r\n    this.totalCents = Math.multiplyExact(quantity, 2500L);\r\n    this.status = \"PENDING\";\r\n    this.createdAt = Instant.now();\r\n  }\r\n}\r\n",
            "sha256": "98ca4e7db3ca4016dd012cc94177b556f04b6537ec7be007a852ed09c5a80fc8"
          }
        ]
      },
      {
        "heading": "Use PostgreSQL",
        "paragraphs": [
          "Start the postgres Compose service and activate the postgres profile. Set DB_PASSWORD locally first. The default file-backed H2 database remains useful for learning without Docker."
        ],
        "files": [
          {
            "path": "commerce/src/main/resources/application-postgres.properties",
            "text": "spring.datasource.url=jdbc:postgresql://localhost:5432/commerce\r\nspring.datasource.username=commerce\r\nspring.datasource.password=${DB_PASSWORD}\r\n",
            "sha256": "717a828ff959a7c15738da41df026aadfa64c74a8012eefb04b86e4cfd7426b0"
          },
          {
            "path": "compose.yaml",
            "text": "services:\r\n  postgres:\r\n    image: postgres:17\r\n    environment:\r\n      POSTGRES_DB: commerce\r\n      POSTGRES_USER: commerce\r\n      POSTGRES_PASSWORD: ${DB_PASSWORD:-local-development-only}\r\n    ports: [\"127.0.0.1:5432:5432\"]\r\n    volumes: [\"commerce-db:/var/lib/postgresql/data\"]\r\n    healthcheck:\r\n      test: [\"CMD-SHELL\", \"pg_isready -U commerce\"]\r\n      interval: 5s\r\n      retries: 10\r\n  mailpit:\r\n    image: axllent/mailpit:v1.27\r\n    ports: [\"127.0.0.1:1025:1025\", \"127.0.0.1:8025:8025\"]\r\n  rabbit:\r\n    image: rabbitmq:4-management\r\n    ports: [\"127.0.0.1:5672:5672\", \"127.0.0.1:15672:15672\"]\r\nvolumes:\r\n  commerce-db:\r\n",
            "sha256": "6274a84a93c5c2b0d2d4bfffb8b65f22302a440fd30a98b7c05cf6e8b2610462"
          }
        ],
        "exercise": "Add a nullable note column in V2__order_note.sql, map it on the entity, and restart twice. Verify that V2 runs once."
      }
    ]
  },
  {
    "slug": "sbc_app_05",
    "number": 5,
    "group": "application",
    "title": "Advanced JPA and Fetch Planning",
    "intro": "Now we will separate database work from response serialization. A query that looks small in Java can still execute many SQL statements.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Understand the N+1 problem",
        "paragraphs": [
          "Suppose a page contains ten applicants and each applicant’s resume is loaded separately. One collection query plus ten association queries makes eleven queries. Use the Applicant relationships from the original course to reproduce this with SQL logging."
        ]
      },
      {
        "heading": "Load what the use case needs",
        "paragraphs": [
          "For a single applicant detail, an @EntityGraph can load the requested association with the entity. For list screens, prefer DTO projections containing only the fields displayed. Avoid collection fetch joins combined blindly with pagination; page parent IDs first, then fetch details."
        ],
        "code": {
          "title": "Add to the ApplicantRepository from the relationship lessons",
          "text": "@EntityGraph(attributePaths = \"resume\")\n@Query(\"select a from Applicant a where a.id = :id\")\nOptional<Applicant> findDetail(@Param(\"id\") Long id);",
          "lang": "java"
        }
      },
      {
        "heading": "Close the persistence boundary",
        "paragraphs": [
          "The commerce project disables open-in-view. Do not rely on serialization to fetch lazy associations after the service returns. Map entities to response DTOs inside a read-only service transaction when associations are needed."
        ],
        "files": [
          {
            "path": "commerce/src/main/resources/application.properties",
            "text": "server.port=${PORT:8090}\r\nspring.datasource.url=${DB_URL:jdbc:h2:file:./data/commerce;DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=${DB_USER:sa}\r\nspring.datasource.password=${DB_PASSWORD:}\r\nspring.jpa.hibernate.ddl-auto=validate\r\nspring.jpa.open-in-view=false\r\nspring.jpa.properties.hibernate.jdbc.time_zone=UTC\r\nmanagement.health.rabbit.enabled=false\r\nmanagement.health.mail.enabled=false\r\nspring.mail.host=${MAIL_HOST:localhost}\r\nspring.mail.port=${MAIL_PORT:1025}\r\nspring.servlet.multipart.max-file-size=1MB\r\nspring.servlet.multipart.max-request-size=1MB\r\nmanagement.endpoints.web.exposure.include=health,info,prometheus\r\nmanagement.endpoint.health.probes.enabled=true\r\nmanagement.tracing.sampling.probability=1.0\r\npayment.base-url=${PAYMENT_BASE_URL:https://api.stripe.com}\r\npayment.key=${STRIPE_SECRET_KEY:}\r\npayment.webhook-secret=${STRIPE_WEBHOOK_SECRET:}\r\napp.public-url=${PUBLIC_URL:http://localhost:8090}\r\napp.mail-from=${MAIL_FROM:learning@example.test}\r\napp.upload-directory=${UPLOAD_DIRECTORY:./uploads}\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "85d8dc80a44f69f9dcec50b68c16676e29cf59bae2fcf8ad272c71ca770da513"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/Orders.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.persistence.LockModeType;\r\nimport java.util.Optional;\r\nimport org.springframework.data.domain.*;\r\nimport org.springframework.data.jpa.repository.*;\r\nimport org.springframework.data.repository.query.Param;\r\n\r\npublic interface Orders extends JpaRepository<PurchaseOrder, Long> {\r\n  @EntityGraph(attributePaths = \"lines\")\r\n  @Query(\"select o from PurchaseOrder o where o.id=:id\")\r\n  Optional<PurchaseOrder> detail(@Param(\"id\") Long id);\r\n\r\n  Page<PurchaseOrder> findByOwner(String owner, Pageable pageable);\r\n\r\n  @Lock(LockModeType.PESSIMISTIC_WRITE)\r\n  @Query(\"select o from PurchaseOrder o where o.id=:id\")\r\n  Optional<PurchaseOrder> lock(@Param(\"id\") Long id);\r\n}\r\n",
            "sha256": "db8d79886b5a580c58324cb21e7c55e58a18ba20cc105bf56c8c3d7b11a1c19e"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/OrderLine.java",
            "text": "package hub.commerce;\r\n\r\nimport com.fasterxml.jackson.annotation.JsonIgnore;\r\nimport jakarta.persistence.*;\r\n\r\n@Entity\r\npublic class OrderLine {\r\n  @Id\r\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n  public Long id;\r\n\r\n  @ManyToOne(fetch = FetchType.LAZY)\r\n  @JoinColumn(name = \"order_id\", nullable = false)\r\n  @JsonIgnore\r\n  public PurchaseOrder order;\r\n\r\n  public String product;\r\n  public int quantity;\r\n\r\n  protected OrderLine() {}\r\n\r\n  public OrderLine(PurchaseOrder order, String product, int quantity) {\r\n    this.order = order;\r\n    this.product = product;\r\n    this.quantity = quantity;\r\n  }\r\n}\r\n",
            "sha256": "7efda1bd3188b50899b1d073911e1d32c589956c35cfa7aab7914c223076344a"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/OrderDetail.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.List;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestController\r\npublic class OrderDetail {\r\n  private final DetailService details;\r\n\r\n  public OrderDetail(DetailService details) {\r\n    this.details = details;\r\n  }\r\n\r\n  public record Line(String product, int quantity) {}\r\n\r\n  public record View(Long id, String status, List<Line> lines) {}\r\n\r\n  @GetMapping(\"/api/v1/orders/{id}/detail\")\r\n  public View detail(@PathVariable Long id, java.security.Principal user) {\r\n    return details.read(id, user.getName());\r\n  }\r\n\r\n  @Service\r\n  public static class DetailService {\r\n    private final Orders orders;\r\n    private final OrderService owner;\r\n\r\n    public DetailService(Orders orders, OrderService owner) {\r\n      this.orders = orders;\r\n      this.owner = owner;\r\n    }\r\n\r\n    @Transactional(readOnly = true)\r\n    public View read(Long id, String username) {\r\n      owner.owned(id, username);\r\n      var o = orders.detail(id).orElseThrow();\r\n      return new View(\r\n          o.id, o.status, o.lines.stream().map(l -> new Line(l.product, l.quantity)).toList());\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "461688631b4351e6d60523c9415c8491937004e26f15baf48fbd8e75135e9929"
          }
        ]
      },
      {
        "heading": "Audit deliberately",
        "paragraphs": [
          "PurchaseOrder records createdAt when it is created. OrderDetail maps the fetched lines to a response DTO inside a read-only transaction, so serialization never fetches them lazily. A wider audit can use @CreatedDate, @LastModifiedDate and an auditor provider for the current user. Decide which changes need a business audit trail; a timestamp alone cannot explain who changed what."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/PurchaseOrder.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.persistence.*;\r\nimport java.time.Instant;\r\n\r\n@Entity\r\npublic class PurchaseOrder {\r\n  @Id\r\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n  public Long id;\r\n\r\n  @Version public long version;\r\n  public String owner, product, status;\r\n  public int quantity;\r\n  public long totalCents;\r\n  public Instant createdAt;\r\n  public String paymentId, checkoutId, refundId;\r\n\r\n  @OneToMany(mappedBy = \"order\", cascade = CascadeType.ALL)\r\n  @com.fasterxml.jackson.annotation.JsonIgnore\r\n  public java.util.List<OrderLine> lines = new java.util.ArrayList<>();\r\n\r\n  @Column(length = 2048)\r\n  public String checkoutUrl;\r\n\r\n  protected PurchaseOrder() {}\r\n\r\n  public PurchaseOrder(String owner, String product, int quantity) {\r\n    this.lines.add(new OrderLine(this, product, quantity));\r\n    this.owner = owner;\r\n    this.product = product;\r\n    this.quantity = quantity;\r\n    this.totalCents = Math.multiplyExact(quantity, 2500L);\r\n    this.status = \"PENDING\";\r\n    this.createdAt = Instant.now();\r\n  }\r\n}\r\n",
            "sha256": "98ca4e7db3ca4016dd012cc94177b556f04b6537ec7be007a852ed09c5a80fc8"
          }
        ],
        "exercise": "Measure SQL counts before and after adding the Applicant detail fetch plan. Keep a test that detects the extra queries."
      }
    ]
  },
  {
    "slug": "sbc_app_06",
    "number": 6,
    "group": "application",
    "title": "Concurrency and Locking",
    "intro": "Now imagine two browser tabs changing the same order. We need to detect stale decisions rather than silently overwrite one change.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Optimistic locking",
        "paragraphs": [
          "@Version adds a revision to the entity. Hibernate includes the old revision when updating and rejects an update if another transaction has already changed it. Return 409 and ask the client to reload rather than blindly retrying a business decision."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/PurchaseOrder.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.persistence.*;\r\nimport java.time.Instant;\r\n\r\n@Entity\r\npublic class PurchaseOrder {\r\n  @Id\r\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n  public Long id;\r\n\r\n  @Version public long version;\r\n  public String owner, product, status;\r\n  public int quantity;\r\n  public long totalCents;\r\n  public Instant createdAt;\r\n  public String paymentId, checkoutId, refundId;\r\n\r\n  @OneToMany(mappedBy = \"order\", cascade = CascadeType.ALL)\r\n  @com.fasterxml.jackson.annotation.JsonIgnore\r\n  public java.util.List<OrderLine> lines = new java.util.ArrayList<>();\r\n\r\n  @Column(length = 2048)\r\n  public String checkoutUrl;\r\n\r\n  protected PurchaseOrder() {}\r\n\r\n  public PurchaseOrder(String owner, String product, int quantity) {\r\n    this.lines.add(new OrderLine(this, product, quantity));\r\n    this.owner = owner;\r\n    this.product = product;\r\n    this.quantity = quantity;\r\n    this.totalCents = Math.multiplyExact(quantity, 2500L);\r\n    this.status = \"PENDING\";\r\n    this.createdAt = Instant.now();\r\n  }\r\n}\r\n",
            "sha256": "98ca4e7db3ca4016dd012cc94177b556f04b6537ec7be007a852ed09c5a80fc8"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/ApiErrors.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.http.*;\r\nimport org.springframework.orm.ObjectOptimisticLockingFailureException;\r\nimport org.springframework.web.bind.MethodArgumentNotValidException;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestControllerAdvice\r\npublic class ApiErrors {\r\n  @ExceptionHandler(MethodArgumentNotValidException.class)\r\n  @ResponseStatus(HttpStatus.BAD_REQUEST)\r\n  public ProblemDetail invalid(MethodArgumentNotValidException e) {\r\n    var p = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, \"Correct the request fields\");\r\n    p.setProperty(\r\n        \"errors\",\r\n        e.getBindingResult().getFieldErrors().stream()\r\n            .map(f -> Map.of(\"field\", f.getField(), \"message\", f.getDefaultMessage()))\r\n            .toList());\r\n    return p;\r\n  }\r\n\r\n  @ExceptionHandler(ObjectOptimisticLockingFailureException.class)\r\n  @ResponseStatus(HttpStatus.CONFLICT)\r\n  public ProblemDetail conflict() {\r\n    return ProblemDetail.forStatusAndDetail(\r\n        HttpStatus.CONFLICT, \"Another request updated this order. Reload it.\");\r\n  }\r\n}\r\n",
            "sha256": "4a331f28ef9f9186dfd158a87f2d203bd2d5b5aa1ced5b51287ed4c5b42233c6"
          }
        ]
      },
      {
        "heading": "Pessimistic locking",
        "paragraphs": [
          "Orders.lock requests PESSIMISTIC_WRITE. Call it inside a transaction: the row stays locked until that transaction completes. OrderService.cancel also checks the client’s expected revision and the legal source state."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/Orders.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.persistence.LockModeType;\r\nimport java.util.Optional;\r\nimport org.springframework.data.domain.*;\r\nimport org.springframework.data.jpa.repository.*;\r\nimport org.springframework.data.repository.query.Param;\r\n\r\npublic interface Orders extends JpaRepository<PurchaseOrder, Long> {\r\n  @EntityGraph(attributePaths = \"lines\")\r\n  @Query(\"select o from PurchaseOrder o where o.id=:id\")\r\n  Optional<PurchaseOrder> detail(@Param(\"id\") Long id);\r\n\r\n  Page<PurchaseOrder> findByOwner(String owner, Pageable pageable);\r\n\r\n  @Lock(LockModeType.PESSIMISTIC_WRITE)\r\n  @Query(\"select o from PurchaseOrder o where o.id=:id\")\r\n  Optional<PurchaseOrder> lock(@Param(\"id\") Long id);\r\n}\r\n",
            "sha256": "db8d79886b5a580c58324cb21e7c55e58a18ba20cc105bf56c8c3d7b11a1c19e"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/OrderService.java",
            "text": "package hub.commerce;\r\n\r\nimport io.micrometer.core.instrument.MeterRegistry;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class OrderService {\r\n  private final Orders orders;\r\n  private final MeterRegistry metrics;\r\n\r\n  public OrderService(Orders orders, MeterRegistry metrics) {\r\n    this.orders = orders;\r\n    this.metrics = metrics;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder create(String owner, OrderController.CreateOrder request) {\r\n    var order = orders.save(new PurchaseOrder(owner, request.product(), request.quantity()));\r\n    metrics.counter(\"commerce.orders.created\").increment();\r\n    return order;\r\n  }\r\n\r\n  public PurchaseOrder owned(Long id, String owner) {\r\n    var o =\r\n        orders\r\n            .findById(id)\r\n            .orElseThrow(\r\n                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\"));\r\n    if (!o.owner.equals(owner))\r\n      throw new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\");\r\n    return o;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder cancel(Long id, String owner, long expectedVersion) {\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (!o.owner.equals(owner)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);\r\n    if (o.version != expectedVersion || !o.status.equals(\"PENDING\"))\r\n      throw new ResponseStatusException(HttpStatus.CONFLICT, \"Reload the order before cancelling\");\r\n    o.status = \"CANCELLED\";\r\n    return o;\r\n  }\r\n}\r\n",
            "sha256": "8686ae57b9a53b40f80b1d361fc0d8d87829c5c00d3e41d3d7e9f00a05fd8602"
          }
        ]
      },
      {
        "heading": "Keep locks short",
        "paragraphs": [
          "PaymentService currently holds the order lock during the gateway call to make the first local example easy to trace. The client has bounded timeouts, but slow calls still occupy the transaction. The distributed section replaces this with durable states and independent transactions."
        ]
      },
      {
        "heading": "Try a stale cancellation",
        "paragraphs": [
          "Create an order, read its version, then request cancellation with a different version. Expect 409 and an unchanged PENDING state. A network retry and a stale business update are different problems."
        ],
        "request": [
          "POST",
          "/api/v1/orders/1/cancel?version=99"
        ],
        "exercise": "Run two transactions that both load the same version. Commit the first, then assert that the second cannot overwrite it."
      }
    ]
  },
  {
    "slug": "sbc_app_07",
    "number": 7,
    "group": "application",
    "title": "Integration Testing and Testcontainers",
    "intro": "Now we will test the boundaries that a mocked repository cannot check: request validation, security, SQL mappings, and migrations.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Choose the test boundary",
        "paragraphs": [
          "A unit test isolates one class. @SpringBootTest starts the application context. MockMvc runs requests through Spring MVC and the security chain without opening a public server port."
        ],
        "files": [
          {
            "path": "commerce/src/test/java/hub/commerce/CommerceTest.java",
            "text": "package hub.commerce;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\nimport static org.mockito.Mockito.*;\r\nimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;\r\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;\r\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;\r\n\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.junit.jupiter.api.*;\r\nimport org.mockito.ArgumentCaptor;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.test.context.bean.override.mockito.MockitoBean;\r\nimport org.springframework.test.web.servlet.MockMvc;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"spring.datasource.url=jdbc:h2:mem:commerce-tests;DB_CLOSE_DELAY=-1\",\r\n      \"payment.key=sk_test_fixture\",\r\n      \"payment.webhook-secret=whsec_fixture\",\r\n      \"management.health.mail.enabled=false\"\r\n    })\r\n@AutoConfigureMockMvc\r\nclass CommerceTest {\r\n  @Autowired MockMvc mvc;\r\n  @Autowired AuthService auth;\r\n  @Autowired JdbcTemplate db;\r\n  @Autowired Orders orders;\r\n  @MockitoBean JavaMailSender mail;\r\n  @MockitoBean PaymentClient payment;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from payment_event\");\r\n    db.update(\"delete from auth_token\");\r\n    db.update(\"delete from account\");\r\n    orders.deleteAll();\r\n    reset(mail, payment);\r\n  }\r\n\r\n  @Test\r\n  void invalidOrderReturnsFields() throws Exception {\r\n    mvc.perform(\r\n            post(\"/api/v1/orders\")\r\n                .with(user(\"learner@example.test\"))\r\n                .contentType(\"application/json\")\r\n                .content(\"{\\\"product\\\":\\\"\\\",\\\"quantity\\\":0}\"))\r\n        .andExpect(status().isBadRequest())\r\n        .andExpect(jsonPath(\"$.errors\").isArray());\r\n  }\r\n\r\n  @Test\r\n  void ownerCannotReadAnotherOrder() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void staleCancellationReturnsConflict() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/cancel?version=99\").with(user(\"alice\")))\r\n        .andExpect(status().isConflict());\r\n    assertEquals(\"PENDING\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  String register() {\r\n    auth.register(\"learner@example.test\", \"very-long-password\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String text = c.getValue().getText();\r\n    return text.substring(text.indexOf(\"token: \") + 7);\r\n  }\r\n\r\n  @Test\r\n  void verifyRefreshLogoutAndReset() {\r\n    String token = register();\r\n    assertThrows(Exception.class, () -> auth.login(\"learner@example.test\", \"very-long-password\"));\r\n    auth.verify(token);\r\n    var first = auth.login(\"learner@example.test\", \"very-long-password\");\r\n    assertEquals(\"learner@example.test\", auth.authenticate(first.accessToken()));\r\n    var second = auth.refresh(first.refreshToken());\r\n    assertNull(auth.authenticate(first.accessToken()));\r\n    assertThrows(Exception.class, () -> auth.refresh(first.refreshToken()));\r\n    auth.logout(second.refreshToken());\r\n    assertNull(auth.authenticate(second.accessToken()));\r\n    reset(mail);\r\n    auth.requestReset(\"learner@example.test\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String body = c.getValue().getText();\r\n    auth.reset(body.substring(body.indexOf(\"token: \") + 7), \"another-long-password\");\r\n    assertNotNull(auth.login(\"learner@example.test\", \"another-long-password\"));\r\n  }\r\n\r\n  @Test\r\n  void signedWebhookIsIdempotent() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.checkoutId = \"cs_fixture\";\r\n    o = orders.save(o);\r\n    String body =\r\n        \"{\\\"id\\\":\\\"evt_1\\\",\\\"type\\\":\\\"checkout.session.completed\\\",\\\"data\\\":{\\\"object\\\":{\\\"id\\\":\\\"cs_fixture\\\",\\\"payment_status\\\":\\\"paid\\\",\\\"payment_intent\\\":\\\"pi_fixture\\\",\\\"amount_total\\\":2500,\\\"currency\\\":\\\"usd\\\",\\\"metadata\\\":{\\\"orderId\\\":\\\"\"\r\n            + o.id\r\n            + \"\\\"}}}}\";\r\n    long time = java.time.Instant.now().getEpochSecond();\r\n    var mac = Mac.getInstance(\"HmacSHA256\");\r\n    mac.init(new SecretKeySpec(\"whsec_fixture\".getBytes(), \"HmacSHA256\"));\r\n    String signature =\r\n        \"t=\"\r\n            + time\r\n            + \",v1=\"\r\n            + HexFormat.of().formatHex(mac.doFinal((time + \".\" + body).getBytes()));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(\r\n              post(\"/webhooks/stripe\")\r\n                  .header(\"Stripe-Signature\", signature)\r\n                  .contentType(\"application/json\")\r\n                  .content(body))\r\n          .andExpect(status().isOk());\r\n    assertEquals(\"PAID\", orders.findById(o.id).orElseThrow().status);\r\n    assertEquals(1, db.queryForObject(\"select count(*) from payment_event\", Integer.class));\r\n    mvc.perform(post(\"/webhooks/stripe\").header(\"Stripe-Signature\", \"invalid\").content(body))\r\n        .andExpect(status().isBadRequest());\r\n  }\r\n\r\n  @Test\r\n  void checkoutUsesServerAmountAndReusesSession() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 2));\r\n    when(payment.checkout(any()))\r\n        .thenReturn(new PaymentClient.Checkout(\"cs_test\", \"https://checkout.stripe.com/test\"));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/checkout\").with(user(\"alice\")))\r\n          .andExpect(status().isOk());\r\n    verify(payment, times(1)).checkout(any());\r\n  }\r\n\r\n  @Test\r\n  void detailFetchAndRefundReconciliation() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.status = \"PAID\";\r\n    o.paymentId = \"pi_fixture\";\r\n    o = orders.save(o);\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id + \"/detail\").with(user(\"alice\")))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.lines[0].product\").value(\"Book\"));\r\n    doReturn(Map.of(\"id\", \"re_fixture\", \"status\", \"pending\"))\r\n        .when(payment)\r\n        .refund(o.id, \"pi_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/refund\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUND_PENDING\", orders.findById(o.id).orElseThrow().status);\r\n    doReturn(Map.of(\"status\", \"succeeded\")).when(payment).refundStatus(\"re_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/reconcile\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUNDED\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  @Test\r\n  void pdfUploadCannotBeReadByAnotherUser() throws Exception {\r\n    var upload =\r\n        new org.springframework.mock.web.MockMultipartFile(\r\n            \"file\", \"a.pdf\", \"application/pdf\", \"%PDF-fixture\".getBytes());\r\n    String response =\r\n        mvc.perform(multipart(\"/api/v1/files\").file(upload).with(user(\"alice\")))\r\n            .andExpect(status().isOk())\r\n            .andReturn()\r\n            .getResponse()\r\n            .getContentAsString();\r\n    String id =\r\n        new com.fasterxml.jackson.databind.ObjectMapper().readTree(response).get(\"id\").asText();\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"alice\"))).andExpect(status().isOk());\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void openApiAndMissingAuthentication() throws Exception {\r\n    mvc.perform(get(\"/v3/api-docs\"))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.paths['/api/v1/orders']\").exists());\r\n    mvc.perform(get(\"/api/v1/orders\")).andExpect(status().isUnauthorized());\r\n  }\r\n}\r\n",
            "sha256": "78434dc716cdb9970827f61365db92f6c802090e2ec11ffe8cc07f4a1ba604f3"
          }
        ]
      },
      {
        "heading": "Replace only the external boundary",
        "paragraphs": [
          "CommerceTest replaces the mail sender and payment client. The real controllers, authentication service, migrations and database participate. A signed fixture webhook proves our handler behavior; it does not prove a real Stripe account is configured."
        ]
      },
      {
        "heading": "Run against PostgreSQL",
        "paragraphs": [
          "PostgresIT starts a disposable PostgreSQL container and registers its JDBC settings. Run mvn -Dtest=PostgresIT test when Docker is running. This test is opt-in because this environment has no Docker executable."
        ],
        "files": [
          {
            "path": "commerce/src/test/java/hub/commerce/PostgresIT.java",
            "text": "package hub.commerce;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\n\r\nimport org.junit.jupiter.api.Test;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.test.context.DynamicPropertyRegistry;\r\nimport org.springframework.test.context.DynamicPropertySource;\r\nimport org.testcontainers.containers.PostgreSQLContainer;\r\nimport org.testcontainers.junit.jupiter.*;\r\n\r\n@SpringBootTest\r\n@Testcontainers\r\nclass PostgresIT {\r\n  @Container static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(\"postgres:17\");\r\n\r\n  @DynamicPropertySource\r\n  static void database(DynamicPropertyRegistry r) {\r\n    r.add(\"spring.datasource.url\", postgres::getJdbcUrl);\r\n    r.add(\"spring.datasource.username\", postgres::getUsername);\r\n    r.add(\"spring.datasource.password\", postgres::getPassword);\r\n  }\r\n\r\n  @Autowired Orders orders;\r\n\r\n  @Test\r\n  void migrationsAndEntityAgree() {\r\n    var o = orders.save(new PurchaseOrder(\"learner\", \"Book\", 1));\r\n    assertEquals(2500, orders.findById(o.id).orElseThrow().totalCents);\r\n  }\r\n}\r\n",
            "sha256": "f895c8b9028d6003d974d28d4b05c1ddf3d34ac836fdd319eaf7986d16616817"
          }
        ]
      },
      {
        "heading": "Test failures as well as success",
        "paragraphs": [
          "The suite checks ownership, invalid input, stale updates, token rotation and duplicate webhooks. Each test protects an observable behavior rather than simply repeating implementation details."
        ],
        "exercise": "Add a test proving a refund request for an unpaid order returns 409 and never calls the payment client."
      }
    ]
  },
  {
    "slug": "sbc_app_08",
    "number": 8,
    "group": "application",
    "title": "Calling External APIs",
    "intro": "Now the application needs data from another server. An HTTP call can fail before a response, after a response, or while the remote operation is still running.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Build a bounded client",
        "paragraphs": [
          "PaymentClient creates a RestClient with connect and read timeouts. A connect timeout limits establishing the connection; a read timeout bounds waiting for response data. Neither guarantees that the remote operation did not execute."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/PaymentClient.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.http.MediaType;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.stereotype.Component;\r\nimport org.springframework.util.LinkedMultiValueMap;\r\nimport org.springframework.web.client.RestClient;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Component\r\npublic class PaymentClient {\r\n  private final RestClient client;\r\n  private final String key, url;\r\n\r\n  public Map<?, ?> session(String id) {\r\n    return client\r\n        .get()\r\n        .uri(\"/v1/checkout/sessions/{id}\", id)\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n\r\n  public Map<?, ?> refundStatus(String id) {\r\n    return client\r\n        .get()\r\n        .uri(\"/v1/refunds/{id}\", id)\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n\r\n  public PaymentClient(\r\n      @Value(\"${payment.base-url}\") String base,\r\n      @Value(\"${payment.key}\") String key,\r\n      @Value(\"${app.public-url}\") String url) {\r\n    var factory = new SimpleClientHttpRequestFactory();\r\n    factory.setConnectTimeout(2000);\r\n    factory.setReadTimeout(5000);\r\n    this.client = RestClient.builder().baseUrl(base).requestFactory(factory).build();\r\n    this.key = key;\r\n    this.url = url;\r\n  }\r\n\r\n  public record Checkout(String id, String url) {}\r\n\r\n  public Checkout checkout(PurchaseOrder order) {\r\n    if (!key.startsWith(\"sk_test_\"))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.SERVICE_UNAVAILABLE, \"Set a Stripe test-mode key first\");\r\n    var form = new LinkedMultiValueMap<String, String>();\r\n    form.add(\"mode\", \"payment\");\r\n    form.add(\"success_url\", url + \"/swagger-ui/index.html\");\r\n    form.add(\"cancel_url\", url + \"/swagger-ui/index.html\");\r\n    form.add(\"client_reference_id\", order.id.toString());\r\n    form.add(\"metadata[orderId]\", order.id.toString());\r\n    form.add(\"line_items[0][price_data][currency]\", \"usd\");\r\n    form.add(\"line_items[0][price_data][product_data][name]\", order.product);\r\n    form.add(\"line_items[0][price_data][unit_amount]\", \"2500\");\r\n    form.add(\"line_items[0][quantity]\", String.valueOf(order.quantity));\r\n    Map<?, ?> result =\r\n        client\r\n            .post()\r\n            .uri(\"/v1/checkout/sessions\")\r\n            .headers(h -> h.setBasicAuth(key, \"\"))\r\n            .header(\"Idempotency-Key\", \"checkout-\" + order.id)\r\n            .contentType(MediaType.APPLICATION_FORM_URLENCODED)\r\n            .body(form)\r\n            .retrieve()\r\n            .body(Map.class);\r\n    return new Checkout((String) result.get(\"id\"), (String) result.get(\"url\"));\r\n  }\r\n\r\n  public Map<?, ?> refund(Long orderId, String intent) {\r\n    return client\r\n        .post()\r\n        .uri(\"/v1/refunds\")\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .header(\"Idempotency-Key\", \"refund-\" + orderId)\r\n        .contentType(MediaType.APPLICATION_FORM_URLENCODED)\r\n        .body(\"payment_intent=\" + intent)\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n}\r\n",
            "sha256": "3c02cb38ba0da154d61d8d96641280e6887235d41e84586e43d750a5fde70ec7"
          }
        ]
      },
      {
        "heading": "Keep provider details behind an adapter",
        "paragraphs": [
          "The service calls checkout(order), not a URL assembled in the controller. The adapter creates the form fields and reads the provider response. Tests can replace this one boundary without mocking the whole application."
        ]
      },
      {
        "heading": "Send a stable operation key",
        "paragraphs": [
          "The checkout idempotency key is derived from the stored order ID. Repeating the same business operation should reuse that key. A new random key on every HTTP retry would allow duplicate remote work."
        ]
      },
      {
        "heading": "Inspect the local test",
        "paragraphs": [
          "The checkout test verifies that two requests reuse the saved session. For an HTTP contract test, point payment.base-url at a local stub and assert the form body and Idempotency-Key header."
        ],
        "exercise": "Return a 503 and then a success from a stub server. Decide which operations are safe to retry and explain why."
      }
    ]
  },
  {
    "slug": "sbc_app_09",
    "number": 9,
    "group": "application",
    "title": "Circuit Breakers and Rate Limits",
    "intro": "Now we will stop a failing shipping service from consuming unlimited application capacity. Returning a made-up shipping price would be misleading, so the fallback reports unavailability.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Three separate protections",
        "paragraphs": [
          "Timeouts bound an individual call. A circuit breaker temporarily refuses calls after enough failures. A rate limiter limits how frequently callers obtain permission. Retries create additional attempts and must have their own budget."
        ]
      },
      {
        "heading": "Put protection on a Spring bean",
        "paragraphs": [
          "ShippingClient.quote has the circuit breaker and rate limiter annotations. ShippingController calls that bean through Spring’s proxy. Calling the annotated method from another method on the same object would bypass that proxy."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/ShippingClient.java",
            "text": "package hub.commerce;\r\n\r\nimport io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;\r\nimport io.github.resilience4j.ratelimiter.annotation.RateLimiter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class ShippingClient {\r\n  private final RestClient client;\r\n\r\n  public ShippingClient(@Value(\"${shipping.url:http://localhost:9999}\") String url) {\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(1000);\r\n    f.setReadTimeout(1000);\r\n    client = RestClient.builder().baseUrl(url).requestFactory(f).build();\r\n  }\r\n\r\n  @CircuitBreaker(name = \"shipping\", fallbackMethod = \"unavailable\")\r\n  @RateLimiter(name = \"shipping\")\r\n  public String quote() {\r\n    return client.get().uri(\"/quote\").retrieve().body(String.class);\r\n  }\r\n\r\n  public String unavailable(Throwable error) {\r\n    return \"Shipping quote unavailable; try later\";\r\n  }\r\n}\r\n",
            "sha256": "8173c94080a3c952cfa330ba3671eb728b4cfcd144383e0131e2ac1e48ddd45d"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/ShippingController.java",
            "text": "package hub.commerce;\r\n\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestController\r\npublic class ShippingController {\r\n  private final ShippingClient client;\r\n\r\n  public ShippingController(ShippingClient client) {\r\n    this.client = client;\r\n  }\r\n\r\n  @GetMapping(\"/api/v1/shipping\")\r\n  public String quote() {\r\n    return client.quote();\r\n  }\r\n}\r\n",
            "sha256": "c64a81b219e4e4759318f1463f4e2636946c6e0c057eb9e75ebc10f3d92cebbe"
          }
        ]
      },
      {
        "heading": "Read the fallback",
        "paragraphs": [
          "unavailable accepts the failure and returns an explicit temporary-unavailability message. There is no blanket payment retry annotation: uncertain payment outcomes need the stable key and status reconciliation taught later."
        ]
      },
      {
        "heading": "Observe the failure",
        "paragraphs": [
          "With nothing listening on port 9999, request /api/v1/shipping. Observe the bounded failure and fallback. In a follow-up exercise, configure a small sliding window and inspect when the circuit opens."
        ],
        "request": [
          "GET",
          "/api/v1/shipping"
        ],
        "exercise": "Set a low per-second rate limit, send a burst, and distinguish rate-limit rejection from an open circuit."
      }
    ]
  },
  {
    "slug": "sbc_app_10",
    "number": 10,
    "group": "application",
    "title": "Refresh Tokens and Account Recovery",
    "intro": "Now we will complete the login lifecycle. Signing in once is only part of the work: sessions expire, users log out, and passwords get forgotten.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Access tokens and refresh tokens",
        "paragraphs": [
          "This continuation deliberately uses random opaque bearer tokens stored as hashes. Access tokens last ten minutes; refresh tokens last seven days. This complements the JWT lessons: an opaque token requires a database lookup but makes server-side revocation straightforward."
        ]
      },
      {
        "heading": "Register and verify",
        "paragraphs": [
          "POST /auth/register, then open Mailpit at localhost:8025. Copy the verification token from the message into POST /auth/verify. Verification proves access to the email inbox; it is not another password."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/AuthController.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.validation.Valid;\r\nimport jakarta.validation.constraints.*;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@RestController\r\n@RequestMapping(\"/auth\")\r\npublic class AuthController {\r\n  public record Credentials(\r\n      @Email @NotBlank String email, @NotBlank @Size(min = 12, max = 72) String password) {}\r\n\r\n  public record Token(@NotBlank String token) {}\r\n\r\n  public record EmailAddress(@Email @NotBlank String email) {}\r\n\r\n  public record Reset(\r\n      @NotBlank String token, @NotBlank @Size(min = 12, max = 72) String password) {}\r\n\r\n  private final AuthService auth;\r\n\r\n  public AuthController(AuthService auth) {\r\n    this.auth = auth;\r\n  }\r\n\r\n  @PostMapping(\"/register\")\r\n  @ResponseStatus(HttpStatus.ACCEPTED)\r\n  public void register(@Valid @RequestBody Credentials r) {\r\n    auth.register(r.email(), r.password());\r\n  }\r\n\r\n  @PostMapping(\"/verify\")\r\n  public void verify(@Valid @RequestBody Token r) {\r\n    auth.verify(r.token());\r\n  }\r\n\r\n  @PostMapping(\"/login\")\r\n  public AuthService.Session login(@Valid @RequestBody Credentials r) {\r\n    return auth.login(r.email(), r.password());\r\n  }\r\n\r\n  @PostMapping(\"/refresh\")\r\n  public AuthService.Session refresh(@Valid @RequestBody Token r) {\r\n    return auth.refresh(r.token());\r\n  }\r\n\r\n  @PostMapping(\"/logout\")\r\n  public void logout(@Valid @RequestBody Token r) {\r\n    auth.logout(r.token());\r\n  }\r\n\r\n  @PostMapping(\"/forgot\")\r\n  @ResponseStatus(HttpStatus.ACCEPTED)\r\n  public void forgot(@Valid @RequestBody EmailAddress r) {\r\n    auth.requestReset(r.email());\r\n  }\r\n\r\n  @PostMapping(\"/reset\")\r\n  public void reset(@Valid @RequestBody Reset r) {\r\n    auth.reset(r.token(), r.password());\r\n  }\r\n}\r\n",
            "sha256": "9f146dc52316127e0f03509f450ef775e7e0475bc15bf00cdf38d5335099a96f"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/MailService.java",
            "text": "package hub.commerce;\r\n\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.stereotype.Service;\r\n\r\n@Service\r\npublic class MailService {\r\n  private final JavaMailSender sender;\r\n  private final String from;\r\n\r\n  public MailService(JavaMailSender sender, @Value(\"${app.mail-from}\") String from) {\r\n    this.sender = sender;\r\n    this.from = from;\r\n  }\r\n\r\n  public void send(String to, String subject, String text) {\r\n    var message = new SimpleMailMessage();\r\n    message.setFrom(from);\r\n    message.setTo(to);\r\n    message.setSubject(subject);\r\n    message.setText(text);\r\n    sender.send(message);\r\n  }\r\n}\r\n",
            "sha256": "c28b9468dc6f514736d8aca99ae6f58afae20dab86e47b66a80729d6a8aa0e19"
          }
        ]
      },
      {
        "heading": "Rotate and revoke",
        "paragraphs": [
          "AuthService consumes a refresh token under a row lock, deletes its family’s previous access token, and issues a replacement pair. Reusing the consumed refresh token is rejected. Logout deletes the family. This teaching implementation rejects replay but does not yet revoke every descendant on replay detection."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/AuthService.java",
            "text": "package hub.commerce;\r\n\r\nimport java.nio.charset.StandardCharsets;\r\nimport java.security.*;\r\nimport java.time.*;\r\nimport java.util.*;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class AuthService {\r\n  private final JdbcTemplate db;\r\n  private final MailService mail;\r\n  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();\r\n\r\n  public AuthService(JdbcTemplate db, MailService mail) {\r\n    this.db = db;\r\n    this.mail = mail;\r\n  }\r\n\r\n  static String hash(String raw) {\r\n    try {\r\n      return HexFormat.of()\r\n          .formatHex(\r\n              MessageDigest.getInstance(\"SHA-256\").digest(raw.getBytes(StandardCharsets.UTF_8)));\r\n    } catch (Exception e) {\r\n      throw new IllegalStateException(e);\r\n    }\r\n  }\r\n\r\n  private String token(String email, String kind, String family, Duration lifetime) {\r\n    byte[] bytes = new byte[32];\r\n    new SecureRandom().nextBytes(bytes);\r\n    String raw = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);\r\n    db.update(\r\n        \"insert into auth_token values (?,?,?,?,?,false)\",\r\n        hash(raw),\r\n        email,\r\n        kind,\r\n        family,\r\n        java.sql.Timestamp.from(Instant.now().plus(lifetime)));\r\n    return raw;\r\n  }\r\n\r\n  @Transactional\r\n  public void register(String email, String password) {\r\n    db.update(\"insert into account values (?,?,false)\", email, encoder.encode(password));\r\n    mail.send(\r\n        email,\r\n        \"Verify account\",\r\n        \"POST /auth/verify with token: \"\r\n            + token(email, \"VERIFY\", UUID.randomUUID().toString(), Duration.ofHours(1)));\r\n  }\r\n\r\n  @Transactional\r\n  public void verify(String raw) {\r\n    String email = consume(raw, \"VERIFY\").email();\r\n    db.update(\"update account set verified=true where email=?\", email);\r\n  }\r\n\r\n  record Stored(String email, String family) {}\r\n\r\n  private Stored consume(String raw, String kind) {\r\n    var rows =\r\n        db.query(\r\n            \"select email,family from auth_token where hash=? and kind=? and consumed=false and\"\r\n                + \" expires_at>CURRENT_TIMESTAMP for update\",\r\n            (r, n) -> new Stored(r.getString(1), r.getString(2)),\r\n            hash(raw),\r\n            kind);\r\n    if (rows.isEmpty())\r\n      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, \"Invalid or expired token\");\r\n    db.update(\"update auth_token set consumed=true where hash=?\", hash(raw));\r\n    return rows.getFirst();\r\n  }\r\n\r\n  public record Session(String accessToken, String refreshToken) {}\r\n\r\n  private Session session(String email, String family) {\r\n    return new Session(\r\n        token(email, \"ACCESS\", family, Duration.ofMinutes(10)),\r\n        token(email, \"REFRESH\", family, Duration.ofDays(7)));\r\n  }\r\n\r\n  @Transactional\r\n  public Session login(String email, String password) {\r\n    var rows =\r\n        db.query(\r\n            \"select password,verified from account where email=?\",\r\n            (r, n) -> Map.entry(r.getString(1), r.getBoolean(2)),\r\n            email);\r\n    if (rows.isEmpty()\r\n        || !rows.getFirst().getValue()\r\n        || !encoder.matches(password, rows.getFirst().getKey()))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.UNAUTHORIZED, \"Invalid credentials or unverified email\");\r\n    return session(email, UUID.randomUUID().toString());\r\n  }\r\n\r\n  @Transactional\r\n  public Session refresh(String raw) {\r\n    var stored = consume(raw, \"REFRESH\");\r\n    db.update(\"delete from auth_token where family=? and kind='ACCESS'\", stored.family());\r\n    return session(stored.email(), stored.family());\r\n  }\r\n\r\n  @Transactional\r\n  public void logout(String raw) {\r\n    var stored = consume(raw, \"REFRESH\");\r\n    db.update(\"delete from auth_token where family=?\", stored.family());\r\n  }\r\n\r\n  public String authenticate(String raw) {\r\n    var names =\r\n        db.queryForList(\r\n            \"select email from auth_token where hash=? and kind='ACCESS' and consumed=false and\"\r\n                + \" expires_at>CURRENT_TIMESTAMP\",\r\n            String.class,\r\n            hash(raw));\r\n    return names.isEmpty() ? null : names.getFirst();\r\n  }\r\n\r\n  @Transactional\r\n  public void requestReset(String email) {\r\n    if (!db.queryForList(\"select email from account where email=?\", String.class, email).isEmpty())\r\n      mail.send(\r\n          email,\r\n          \"Reset password\",\r\n          \"POST /auth/reset with token: \"\r\n              + token(email, \"RESET\", UUID.randomUUID().toString(), Duration.ofMinutes(15)));\r\n  }\r\n\r\n  @Transactional\r\n  public void reset(String raw, String password) {\r\n    String email = consume(raw, \"RESET\").email();\r\n    db.update(\"update account set password=? where email=?\", encoder.encode(password), email);\r\n    db.update(\"delete from auth_token where email=?\", email);\r\n  }\r\n}\r\n",
            "sha256": "56563495894d5076da0b093db5c21a30825b3dba1c7610c89435f21f6bc8adae"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/Security.java",
            "text": "package hub.commerce;\r\n\r\nimport jakarta.servlet.*;\r\nimport jakarta.servlet.http.*;\r\nimport java.io.IOException;\r\nimport java.util.List;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.security.authentication.UsernamePasswordAuthenticationToken;\r\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\r\nimport org.springframework.security.config.http.SessionCreationPolicy;\r\nimport org.springframework.security.core.context.SecurityContextHolder;\r\nimport org.springframework.security.web.SecurityFilterChain;\r\nimport org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;\r\nimport org.springframework.web.filter.OncePerRequestFilter;\r\n\r\n@Configuration\r\npublic class Security {\r\n  @Bean\r\n  SecurityFilterChain chain(HttpSecurity http, AuthService auth) throws Exception {\r\n    var filter =\r\n        new OncePerRequestFilter() {\r\n          protected void doFilterInternal(\r\n              HttpServletRequest req, HttpServletResponse res, FilterChain next)\r\n              throws ServletException, IOException {\r\n            String header = req.getHeader(\"Authorization\");\r\n            if (header != null && header.startsWith(\"Bearer \")) {\r\n              String email = auth.authenticate(header.substring(7));\r\n              if (email != null)\r\n                SecurityContextHolder.getContext()\r\n                    .setAuthentication(\r\n                        new UsernamePasswordAuthenticationToken(email, null, List.of()));\r\n            }\r\n            next.doFilter(req, res);\r\n          }\r\n        };\r\n    return http.csrf(c -> c.disable())\r\n        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\r\n        .authorizeHttpRequests(\r\n            a ->\r\n                a.requestMatchers(\r\n                        \"/auth/**\",\r\n                        \"/webhooks/stripe\",\r\n                        \"/actuator/health/**\",\r\n                        \"/v3/api-docs/**\",\r\n                        \"/swagger-ui/**\",\r\n                        \"/swagger-ui.html\")\r\n                    .permitAll()\r\n                    .anyRequest()\r\n                    .authenticated())\r\n        .exceptionHandling(e -> e.authenticationEntryPoint((q, r, x) -> r.sendError(401)))\r\n        .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)\r\n        .build();\r\n  }\r\n}\r\n",
            "sha256": "c3a7f637f1b8c5518a4c7951a4e71337fad1c787a9aa6cbea14e4e2508b4b4d1"
          }
        ]
      },
      {
        "heading": "Reset a password",
        "paragraphs": [
          "/auth/forgot always returns 202 so its status does not reveal whether an email exists. A reset token expires after fifteen minutes and can be consumed once. Successful reset replaces the BCrypt password and revokes all existing tokens for that account."
        ],
        "exercise": "Log in twice, reset the password, and prove that both old access tokens stop working."
      }
    ]
  },
  {
    "slug": "sbc_app_11",
    "number": 11,
    "group": "application",
    "title": "File Uploads and Downloads",
    "intro": "Now we will let an authenticated user attach a PDF. The filename supplied by a browser is input, so it must not choose a path on our server.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Choose the storage identifier",
        "paragraphs": [
          "Files generates a UUID and stores bytes under that identifier. The original filename is not appended to the storage root. The download path is parsed as UUID and ownership is checked in the database."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/Files.java",
            "text": "package hub.commerce;\r\n\r\nimport java.io.IOException;\r\nimport java.nio.file.*;\r\nimport java.security.Principal;\r\nimport java.util.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.core.io.*;\r\nimport org.springframework.http.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.multipart.MultipartFile;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\n@RequestMapping(\"/api/v1/files\")\r\npublic class Files {\r\n  private final Path root;\r\n  private final JdbcTemplate db;\r\n\r\n  public Files(@Value(\"${app.upload-directory}\") String directory, JdbcTemplate db)\r\n      throws IOException {\r\n    root = Path.of(directory).toAbsolutePath().normalize();\r\n    java.nio.file.Files.createDirectories(root);\r\n    this.db = db;\r\n  }\r\n\r\n  @PostMapping\r\n  public Map<String, String> upload(@RequestParam MultipartFile file, Principal p)\r\n      throws IOException {\r\n    if (file.isEmpty() || file.getSize() > 1048576)\r\n      throw new ResponseStatusException(\r\n          HttpStatus.BAD_REQUEST, \"File must contain 1–1048576 bytes\");\r\n    byte[] bytes = file.getBytes();\r\n    if (bytes.length < 5\r\n        || !new String(bytes, 0, 5, java.nio.charset.StandardCharsets.US_ASCII).equals(\"%PDF-\"))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.BAD_REQUEST, \"This example accepts PDF headers only\");\r\n    String id = UUID.randomUUID().toString();\r\n    java.nio.file.Files.write(root.resolve(id), bytes, StandardOpenOption.CREATE_NEW);\r\n    db.update(\"insert into attachment values (?,?,?)\", id, p.getName(), \"document.pdf\");\r\n    return Map.of(\"id\", id);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public ResponseEntity<Resource> download(@PathVariable UUID id, Principal p) {\r\n    if (db.queryForList(\r\n            \"select id from attachment where id=? and owner=?\",\r\n            String.class,\r\n            id.toString(),\r\n            p.getName())\r\n        .isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND);\r\n    return ResponseEntity.ok()\r\n        .header(\"Content-Disposition\", \"attachment; filename=\\\"document.pdf\\\"\")\r\n        .header(\"X-Content-Type-Options\", \"nosniff\")\r\n        .contentType(MediaType.APPLICATION_PDF)\r\n        .body(new FileSystemResource(root.resolve(id.toString())));\r\n  }\r\n}\r\n",
            "sha256": "c177e3719e2dae71b6fd8130747d978d95ec2703d663b09d96a5e83b13c16d0f"
          }
        ]
      },
      {
        "heading": "Validate the upload",
        "paragraphs": [
          "The server limits multipart size and checks a PDF header. Header checking is only a teaching baseline: a PDF can still contain harmful content. A public deployment needs malware scanning, quarantine and a deliberate retention policy."
        ]
      },
      {
        "heading": "Return a safe download",
        "paragraphs": [
          "The endpoint uses attachment disposition, a fixed display filename and nosniff. A different owner gets 404. Binary bytes are returned as a Resource instead of being embedded into JSON."
        ]
      },
      {
        "heading": "Try the round trip",
        "paragraphs": [
          "In Postman, POST multipart/form-data to /api/v1/files using a file field named file. Copy the returned id and GET /api/v1/files/{id} with the same bearer token."
        ],
        "exercise": "Use another account’s token for the download, then try a text file renamed to .pdf. Both should fail."
      }
    ]
  },
  {
    "slug": "sbc_app_12",
    "number": 12,
    "group": "application",
    "title": "Email Templates and Async Delivery",
    "intro": "Now we will send account messages through SMTP and move receipt work outside the request thread. Local Mailpit captures messages without sending to real inboxes.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Start local email",
        "paragraphs": [
          "Run docker compose up -d mailpit from the continuation folder. SMTP listens on 1025; the inbox UI is at 8025. MAIL_HOST, MAIL_PORT and MAIL_FROM can later point at a real provider. No provider password is committed."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/MailService.java",
            "text": "package hub.commerce;\r\n\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.stereotype.Service;\r\n\r\n@Service\r\npublic class MailService {\r\n  private final JavaMailSender sender;\r\n  private final String from;\r\n\r\n  public MailService(JavaMailSender sender, @Value(\"${app.mail-from}\") String from) {\r\n    this.sender = sender;\r\n    this.from = from;\r\n  }\r\n\r\n  public void send(String to, String subject, String text) {\r\n    var message = new SimpleMailMessage();\r\n    message.setFrom(from);\r\n    message.setTo(to);\r\n    message.setSubject(subject);\r\n    message.setText(text);\r\n    sender.send(message);\r\n  }\r\n}\r\n",
            "sha256": "c28b9468dc6f514736d8aca99ae6f58afae20dab86e47b66a80729d6a8aa0e19"
          },
          {
            "path": "compose.yaml",
            "text": "services:\r\n  postgres:\r\n    image: postgres:17\r\n    environment:\r\n      POSTGRES_DB: commerce\r\n      POSTGRES_USER: commerce\r\n      POSTGRES_PASSWORD: ${DB_PASSWORD:-local-development-only}\r\n    ports: [\"127.0.0.1:5432:5432\"]\r\n    volumes: [\"commerce-db:/var/lib/postgresql/data\"]\r\n    healthcheck:\r\n      test: [\"CMD-SHELL\", \"pg_isready -U commerce\"]\r\n      interval: 5s\r\n      retries: 10\r\n  mailpit:\r\n    image: axllent/mailpit:v1.27\r\n    ports: [\"127.0.0.1:1025:1025\", \"127.0.0.1:8025:8025\"]\r\n  rabbit:\r\n    image: rabbitmq:4-management\r\n    ports: [\"127.0.0.1:5672:5672\", \"127.0.0.1:15672:15672\"]\r\nvolumes:\r\n  commerce-db:\r\n",
            "sha256": "6274a84a93c5c2b0d2d4bfffb8b65f22302a440fd30a98b7c05cf6e8b2610462"
          }
        ]
      },
      {
        "heading": "Separate content from transport",
        "paragraphs": [
          "MailService builds a plain-text message and hands it to JavaMailSender. Put reusable subject/body generation in template functions rather than repeating strings in controllers. Never write access or recovery tokens to application logs."
        ]
      },
      {
        "heading": "Call async work through another bean",
        "paragraphs": [
          "ReceiptService.receipt is @Async and must be called from a different Spring bean. The return does not mean the email was delivered. The class is a focused optional example; payment state changes do not depend on SMTP success."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/ReceiptService.java",
            "text": "package hub.commerce;\r\n\r\nimport org.springframework.scheduling.annotation.Async;\r\nimport org.springframework.stereotype.Service;\r\n\r\n@Service\r\npublic class ReceiptService {\r\n  private final MailService mail;\r\n\r\n  public ReceiptService(MailService mail) {\r\n    this.mail = mail;\r\n  }\r\n\r\n  @Async\r\n  public void receipt(String email, Long orderId) {\r\n    mail.send(email, \"Order receipt\", \"Your order \" + orderId + \" has been paid.\");\r\n  }\r\n}\r\n",
            "sha256": "78571d9f789906a85162b00c85e5e8052b1595cb42231fa302764560faac3baf"
          }
        ]
      },
      {
        "heading": "Understand the durability limit",
        "paragraphs": [
          "An in-memory async task can disappear if the process crashes. For receipts that must eventually be sent, store an outbox record and let a worker deliver it with retry and deduplication. We implement that pattern in the distributed group."
        ],
        "exercise": "Replace the plain-text receipt with an HTML template, escape the product name, and test the rendered body before sending."
      }
    ]
  },
  {
    "slug": "sbc_app_13",
    "number": 13,
    "group": "application",
    "title": "Stripe Payment Integration",
    "intro": "Now we will turn an order into a real test-mode checkout. The payment provider collects card details; our application stores the order and verifies the payment result.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Prepare your test account",
        "paragraphs": [
          "Create a Stripe test account. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in your local environment. The client deliberately accepts sk_test_ keys only. Do not paste keys into the site, source code, or chat."
        ]
      },
      {
        "heading": "Create checkout from server data",
        "paragraphs": [
          "POST /api/v1/orders/{id}/checkout. PaymentClient sends the stored quantity and a server-defined unit price of 2500 minor USD units. The caller cannot select an arbitrary payable amount. Open the returned URL in your browser."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/PaymentClient.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.http.MediaType;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.stereotype.Component;\r\nimport org.springframework.util.LinkedMultiValueMap;\r\nimport org.springframework.web.client.RestClient;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Component\r\npublic class PaymentClient {\r\n  private final RestClient client;\r\n  private final String key, url;\r\n\r\n  public Map<?, ?> session(String id) {\r\n    return client\r\n        .get()\r\n        .uri(\"/v1/checkout/sessions/{id}\", id)\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n\r\n  public Map<?, ?> refundStatus(String id) {\r\n    return client\r\n        .get()\r\n        .uri(\"/v1/refunds/{id}\", id)\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n\r\n  public PaymentClient(\r\n      @Value(\"${payment.base-url}\") String base,\r\n      @Value(\"${payment.key}\") String key,\r\n      @Value(\"${app.public-url}\") String url) {\r\n    var factory = new SimpleClientHttpRequestFactory();\r\n    factory.setConnectTimeout(2000);\r\n    factory.setReadTimeout(5000);\r\n    this.client = RestClient.builder().baseUrl(base).requestFactory(factory).build();\r\n    this.key = key;\r\n    this.url = url;\r\n  }\r\n\r\n  public record Checkout(String id, String url) {}\r\n\r\n  public Checkout checkout(PurchaseOrder order) {\r\n    if (!key.startsWith(\"sk_test_\"))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.SERVICE_UNAVAILABLE, \"Set a Stripe test-mode key first\");\r\n    var form = new LinkedMultiValueMap<String, String>();\r\n    form.add(\"mode\", \"payment\");\r\n    form.add(\"success_url\", url + \"/swagger-ui/index.html\");\r\n    form.add(\"cancel_url\", url + \"/swagger-ui/index.html\");\r\n    form.add(\"client_reference_id\", order.id.toString());\r\n    form.add(\"metadata[orderId]\", order.id.toString());\r\n    form.add(\"line_items[0][price_data][currency]\", \"usd\");\r\n    form.add(\"line_items[0][price_data][product_data][name]\", order.product);\r\n    form.add(\"line_items[0][price_data][unit_amount]\", \"2500\");\r\n    form.add(\"line_items[0][quantity]\", String.valueOf(order.quantity));\r\n    Map<?, ?> result =\r\n        client\r\n            .post()\r\n            .uri(\"/v1/checkout/sessions\")\r\n            .headers(h -> h.setBasicAuth(key, \"\"))\r\n            .header(\"Idempotency-Key\", \"checkout-\" + order.id)\r\n            .contentType(MediaType.APPLICATION_FORM_URLENCODED)\r\n            .body(form)\r\n            .retrieve()\r\n            .body(Map.class);\r\n    return new Checkout((String) result.get(\"id\"), (String) result.get(\"url\"));\r\n  }\r\n\r\n  public Map<?, ?> refund(Long orderId, String intent) {\r\n    return client\r\n        .post()\r\n        .uri(\"/v1/refunds\")\r\n        .headers(h -> h.setBasicAuth(key, \"\"))\r\n        .header(\"Idempotency-Key\", \"refund-\" + orderId)\r\n        .contentType(MediaType.APPLICATION_FORM_URLENCODED)\r\n        .body(\"payment_intent=\" + intent)\r\n        .retrieve()\r\n        .body(Map.class);\r\n  }\r\n}\r\n",
            "sha256": "3c02cb38ba0da154d61d8d96641280e6887235d41e84586e43d750a5fde70ec7"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/PaymentService.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class PaymentService {\r\n  private final Orders orders;\r\n  private final OrderService ownership;\r\n  private final PaymentClient client;\r\n  private final JdbcTemplate db;\r\n\r\n  public PaymentService(\r\n      Orders orders, OrderService ownership, PaymentClient client, JdbcTemplate db) {\r\n    this.orders = orders;\r\n    this.ownership = ownership;\r\n    this.client = client;\r\n    this.db = db;\r\n  }\r\n\r\n  @Transactional\r\n  public PaymentClient.Checkout checkout(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var order = orders.lock(id).orElseThrow();\r\n    if (!order.status.equals(\"PENDING\")) throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n    if (order.checkoutUrl != null)\r\n      return new PaymentClient.Checkout(order.checkoutId, order.checkoutUrl);\r\n    var checkout = client.checkout(order);\r\n    order.checkoutId = checkout.id();\r\n    order.checkoutUrl = checkout.url();\r\n    return checkout;\r\n  }\r\n\r\n  @Transactional\r\n  public void paid(\r\n      String eventId, Long id, String session, String intent, long amount, String currency) {\r\n    var order = orders.lock(id).orElseThrow();\r\n    if (!db.queryForList(\"select id from payment_event where id=?\", String.class, eventId)\r\n        .isEmpty()) return;\r\n    if (!session.equals(order.checkoutId) || amount != order.totalCents || !currency.equals(\"usd\"))\r\n      throw new ResponseStatusException(HttpStatus.CONFLICT, \"Payment details do not match order\");\r\n    if (!order.status.equals(\"PENDING\") && !order.status.equals(\"PAID\"))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.CONFLICT, \"Reconcile payment for cancelled order\");\r\n    db.update(\"insert into payment_event values (?)\", eventId);\r\n    order.paymentId = intent;\r\n    order.status = \"PAID\";\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder reconcile(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (o.status.equals(\"PENDING\") && o.checkoutId != null) {\r\n      var r = client.session(o.checkoutId);\r\n      if (\"paid\".equals(r.get(\"payment_status\")))\r\n        paid(\r\n            \"reconcile-\" + o.checkoutId,\r\n            id,\r\n            o.checkoutId,\r\n            String.valueOf(r.get(\"payment_intent\")),\r\n            ((Number) r.get(\"amount_total\")).longValue(),\r\n            String.valueOf(r.get(\"currency\")));\r\n    } else if (o.status.equals(\"REFUND_PENDING\")) {\r\n      var r = client.refundStatus(o.refundId);\r\n      if (\"succeeded\".equals(r.get(\"status\"))) o.status = \"REFUNDED\";\r\n    }\r\n    return o;\r\n  }\r\n\r\n  @Transactional\r\n  public Map<?, ?> refund(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (!o.status.equals(\"PAID\")) throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n    var result = client.refund(id, o.paymentId);\r\n    o.refundId = String.valueOf(result.get(\"id\"));\r\n    o.status = \"REFUND_PENDING\";\r\n    return result;\r\n  }\r\n}\r\n",
            "sha256": "e04c49e4ee23b1a588b81f8b8cd5d290f9a09aeb0d66b93760e297e8e909122b"
          }
        ],
        "request": [
          "POST",
          "/api/v1/orders/1/checkout"
        ]
      },
      {
        "heading": "Verify the webhook",
        "paragraphs": [
          "Run stripe listen --forward-to localhost:8090/webhooks/stripe and use its signing secret. Payments checks the timestamp and HMAC against the unmodified request body. A browser redirect never marks an order paid. The signed checkout.session.completed event must also report payment_status=paid and match the session, currency and total."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/Payments.java",
            "text": "package hub.commerce;\r\n\r\nimport com.fasterxml.jackson.databind.ObjectMapper;\r\nimport java.nio.charset.StandardCharsets;\r\nimport java.security.*;\r\nimport java.time.Instant;\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\npublic class Payments {\r\n  private final PaymentService service;\r\n  private final ObjectMapper json;\r\n  private final String secret;\r\n\r\n  public Payments(\r\n      PaymentService service,\r\n      ObjectMapper json,\r\n      @Value(\"${payment.webhook-secret}\") String secret) {\r\n    this.service = service;\r\n    this.json = json;\r\n    this.secret = secret;\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/checkout\")\r\n  public PaymentClient.Checkout checkout(@PathVariable Long id, java.security.Principal p) {\r\n    return service.checkout(id, p.getName());\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/reconcile\")\r\n  public PurchaseOrder reconcile(@PathVariable Long id, java.security.Principal p) {\r\n    return service.reconcile(id, p.getName());\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/refund\")\r\n  public Map<?, ?> refund(@PathVariable Long id, java.security.Principal p) {\r\n    return service.refund(id, p.getName());\r\n  }\r\n\r\n  static boolean valid(String raw, String header, String secret, long now) {\r\n    try {\r\n      String timestamp = null;\r\n      List<String> signatures = new ArrayList<>();\r\n      for (String part : header.split(\",\")) {\r\n        String[] pair = part.split(\"=\", 2);\r\n        if (pair[0].equals(\"t\")) timestamp = pair[1];\r\n        if (pair[0].equals(\"v1\")) signatures.add(pair[1]);\r\n      }\r\n      if (timestamp == null || Math.abs(now - Long.parseLong(timestamp)) > 300 || secret.isBlank())\r\n        return false;\r\n      Mac mac = Mac.getInstance(\"HmacSHA256\");\r\n      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), \"HmacSHA256\"));\r\n      byte[] expected = mac.doFinal((timestamp + \".\" + raw).getBytes(StandardCharsets.UTF_8));\r\n      for (String signature : signatures)\r\n        if (MessageDigest.isEqual(expected, HexFormat.of().parseHex(signature))) return true;\r\n      return false;\r\n    } catch (Exception e) {\r\n      return false;\r\n    }\r\n  }\r\n\r\n  @PostMapping(\"/webhooks/stripe\")\r\n  public void webhook(@RequestBody String raw, @RequestHeader(\"Stripe-Signature\") String signature)\r\n      throws Exception {\r\n    if (!valid(raw, signature, secret, Instant.now().getEpochSecond()))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Invalid webhook signature\");\r\n    var event = json.readTree(raw);\r\n    if (event.path(\"type\").asText().equals(\"checkout.session.completed\")) {\r\n      var o = event.path(\"data\").path(\"object\");\r\n      if (o.path(\"payment_status\").asText().equals(\"paid\"))\r\n        service.paid(\r\n            event.path(\"id\").asText(),\r\n            Long.valueOf(o.path(\"metadata\").path(\"orderId\").asText()),\r\n            o.path(\"id\").asText(),\r\n            o.path(\"payment_intent\").asText(),\r\n            o.path(\"amount_total\").asLong(),\r\n            o.path(\"currency\").asText());\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "abdf4d38f82afbbc99a4f454247be18919c9f8b0a985681c8870084c72ecd531"
          }
        ]
      },
      {
        "heading": "Make delivery repeatable",
        "paragraphs": [
          "The payment_event table records processed event IDs in the same transaction as the PAID change. Duplicate delivery returns successfully without applying the transition again. The test signs a fixture event and sends it twice."
        ]
      },
      {
        "heading": "Request a refund",
        "paragraphs": [
          "POST /api/v1/orders/{id}/refund for a paid order. The adapter uses a stable refund key. The local state becomes REFUND_PENDING: do not call it refunded until a provider event or reconciliation confirms the final result. This first integration supports immediate checkout completion; delayed payment methods and refund settlement are exercises in the workflow section."
        ],
        "exercise": "Complete a Stripe test checkout, verify the signed event changed your order, then request a test refund and inspect its status in the dashboard."
      }
    ]
  },
  {
    "slug": "sbc_app_14",
    "number": 14,
    "group": "application",
    "title": "RabbitMQ Messaging",
    "intro": "Now we will move work between producers and consumers. An application event in one JVM does not survive that JVM or reach another service automatically.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Start the broker",
        "paragraphs": [
          "Run docker compose up -d rabbit. Activate the broker profile to create durable receipt and dead-letter queues. Local Compose exposes the broker only on loopback. Replace default credentials before any shared deployment."
        ]
      },
      {
        "heading": "Follow acknowledgement and retry",
        "paragraphs": [
          "A listener returning normally allows acknowledgement. A thrown exception causes the configured bounded retry; after exhaustion, rejection routes the message to the dead-letter queue. Durable queues alone do not guarantee that a publisher successfully sent a message."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/OrderMessages.java",
            "text": "package hub.commerce;\r\n\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class OrderMessages {\r\n  @Bean\r\n  Queue receipts() {\r\n    return QueueBuilder.durable(\"commerce.receipts\")\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"commerce.receipts.dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue deadReceipts() {\r\n    return QueueBuilder.durable(\"commerce.receipts.dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Consumer consumer(JdbcTemplate db) {\r\n    return new Consumer(db);\r\n  }\r\n\r\n  public static class Consumer {\r\n    private final JdbcTemplate db;\r\n\r\n    Consumer(JdbcTemplate db) {\r\n      this.db = db;\r\n    }\r\n\r\n    @RabbitListener(queues = \"commerce.receipts\")\r\n    @Transactional\r\n    public void receive(String eventId) {\r\n      if (db.queryForList(\r\n              \"select id from payment_event where id=?\", String.class, \"receipt-\" + eventId)\r\n          .isEmpty()) {\r\n        db.update(\"insert into payment_event values (?)\", \"receipt-\" + eventId);\r\n        System.out.println(\"Receipt work recorded: \" + eventId);\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "28d8da2a5b5b76629d2480e18855fbc0d7b24ac26e506c08216518f689929964"
          },
          {
            "path": "commerce/src/main/resources/application-broker.properties",
            "text": "spring.rabbitmq.host=${RABBIT_HOST:localhost}\r\nspring.rabbitmq.listener.simple.retry.enabled=true\r\nspring.rabbitmq.listener.simple.retry.max-attempts=3\r\nspring.rabbitmq.listener.simple.default-requeue-rejected=false\r\n",
            "sha256": "d2286769a0ffe54246aedcab25c3e318c4a0e199969d8ca241cf352001157127"
          }
        ]
      },
      {
        "heading": "Handle duplicate delivery",
        "paragraphs": [
          "Consumer records receipt event IDs and its database effect in one transaction. For this small example the effect is a persisted work marker. Real email needs its own delivery record because a database transaction cannot undo a message already accepted by SMTP."
        ]
      },
      {
        "heading": "Publish a sample",
        "paragraphs": [
          "In the RabbitMQ management UI at localhost:15672, publish a text message to the default exchange with routing key commerce.receipts. Use the same event ID twice and check that one work marker is stored. The distributed section adds a confirmed outbox publisher."
        ],
        "exercise": "Force the consumer to throw for one event ID. Observe retries and its final arrival in commerce.receipts.dead."
      }
    ]
  },
  {
    "slug": "sbc_app_15",
    "number": 15,
    "group": "application",
    "title": "Metrics, Logs and Traces",
    "intro": "Now we will answer operational questions: how many orders were created, which request failed, and where did its time go?",
    "module": "commerce",
    "sections": [
      {
        "heading": "Record a business metric",
        "paragraphs": [
          "OrderService increments commerce.orders.created after saving an order. Metrics aggregate counts; do not use order IDs as metric tags because every ID creates another time series. A rolled-back transaction can make an in-transaction counter overcount; a production business counter should be emitted after commit or derived from durable events."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/OrderService.java",
            "text": "package hub.commerce;\r\n\r\nimport io.micrometer.core.instrument.MeterRegistry;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class OrderService {\r\n  private final Orders orders;\r\n  private final MeterRegistry metrics;\r\n\r\n  public OrderService(Orders orders, MeterRegistry metrics) {\r\n    this.orders = orders;\r\n    this.metrics = metrics;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder create(String owner, OrderController.CreateOrder request) {\r\n    var order = orders.save(new PurchaseOrder(owner, request.product(), request.quantity()));\r\n    metrics.counter(\"commerce.orders.created\").increment();\r\n    return order;\r\n  }\r\n\r\n  public PurchaseOrder owned(Long id, String owner) {\r\n    var o =\r\n        orders\r\n            .findById(id)\r\n            .orElseThrow(\r\n                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\"));\r\n    if (!o.owner.equals(owner))\r\n      throw new ResponseStatusException(HttpStatus.NOT_FOUND, \"Order not found\");\r\n    return o;\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder cancel(Long id, String owner, long expectedVersion) {\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (!o.owner.equals(owner)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);\r\n    if (o.version != expectedVersion || !o.status.equals(\"PENDING\"))\r\n      throw new ResponseStatusException(HttpStatus.CONFLICT, \"Reload the order before cancelling\");\r\n    o.status = \"CANCELLED\";\r\n    return o;\r\n  }\r\n}\r\n",
            "sha256": "8686ae57b9a53b40f80b1d361fc0d8d87829c5c00d3e41d3d7e9f00a05fd8602"
          }
        ]
      },
      {
        "heading": "Expose operational endpoints",
        "paragraphs": [
          "The project includes Prometheus and tracing bridges. /actuator/health is public; other actuator endpoints require authentication. Fetch /actuator/prometheus with your token and find the order counter."
        ],
        "files": [
          {
            "path": "commerce/src/main/resources/application.properties",
            "text": "server.port=${PORT:8090}\r\nspring.datasource.url=${DB_URL:jdbc:h2:file:./data/commerce;DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=${DB_USER:sa}\r\nspring.datasource.password=${DB_PASSWORD:}\r\nspring.jpa.hibernate.ddl-auto=validate\r\nspring.jpa.open-in-view=false\r\nspring.jpa.properties.hibernate.jdbc.time_zone=UTC\r\nmanagement.health.rabbit.enabled=false\r\nmanagement.health.mail.enabled=false\r\nspring.mail.host=${MAIL_HOST:localhost}\r\nspring.mail.port=${MAIL_PORT:1025}\r\nspring.servlet.multipart.max-file-size=1MB\r\nspring.servlet.multipart.max-request-size=1MB\r\nmanagement.endpoints.web.exposure.include=health,info,prometheus\r\nmanagement.endpoint.health.probes.enabled=true\r\nmanagement.tracing.sampling.probability=1.0\r\npayment.base-url=${PAYMENT_BASE_URL:https://api.stripe.com}\r\npayment.key=${STRIPE_SECRET_KEY:}\r\npayment.webhook-secret=${STRIPE_WEBHOOK_SECRET:}\r\napp.public-url=${PUBLIC_URL:http://localhost:8090}\r\napp.mail-from=${MAIL_FROM:learning@example.test}\r\napp.upload-directory=${UPLOAD_DIRECTORY:./uploads}\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "85d8dc80a44f69f9dcec50b68c16676e29cf59bae2fcf8ad272c71ca770da513"
          },
          {
            "path": "commerce/pom.xml",
            "text": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"><modelVersion>4.0.0</modelVersion>\r\n<parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>3.5.16</version><relativePath/></parent>\r\n<groupId>hub</groupId><artifactId>commerce</artifactId><version>1.0.0</version><properties><java.version>25</java.version></properties>\r\n<dependencies><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-data-jpa</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-validation</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-security</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-actuator</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-aop</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-mail</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-amqp</artifactId></dependency>\r\n<dependency><groupId>com.h2database</groupId><artifactId>h2</artifactId></dependency>\r\n<dependency><groupId>org.postgresql</groupId><artifactId>postgresql</artifactId></dependency>\r\n<dependency><groupId>org.flywaydb</groupId><artifactId>flyway-core</artifactId></dependency>\r\n<dependency><groupId>org.flywaydb</groupId><artifactId>flyway-database-postgresql</artifactId></dependency>\r\n<dependency><groupId>org.springdoc</groupId><artifactId>springdoc-openapi-starter-webmvc-ui</artifactId><version>2.8.17</version></dependency>\r\n<dependency><groupId>io.github.resilience4j</groupId><artifactId>resilience4j-spring-boot3</artifactId><version>2.3.0</version></dependency>\r\n<dependency><groupId>io.micrometer</groupId><artifactId>micrometer-registry-prometheus</artifactId></dependency>\r\n<dependency><groupId>io.micrometer</groupId><artifactId>micrometer-tracing-bridge-otel</artifactId></dependency>\r\n<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.springframework.security</groupId><artifactId>spring-security-test</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.testcontainers</groupId><artifactId>postgresql</artifactId><scope>test</scope></dependency>\r\n<dependency><groupId>org.testcontainers</groupId><artifactId>junit-jupiter</artifactId><scope>test</scope></dependency>\r\n</dependencies><build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build></project>\r\n",
            "sha256": "4f30b21b00fd647531f6c0e9746faacc4b026f8756c2518e2b07f715323a637c"
          }
        ]
      },
      {
        "heading": "Distinguish a trace from a log",
        "paragraphs": [
          "A trace links timed spans across services; a correlation ID makes related log lines searchable. Passing an ID does not automatically create a distributed trace. The workflow project explicitly propagates a correlation header; later we add collector/exporter configuration as a deployment choice."
        ]
      },
      {
        "heading": "Investigate one failure",
        "paragraphs": [
          "Send a failing shipping request, inspect its logs, then compare latency and failure metrics. Keep passwords, bearer tokens, card information and recovery codes out of logs."
        ],
        "exercise": "Configure an OpenTelemetry collector in your environment and inspect one HTTP request’s spans across two services."
      }
    ]
  },
  {
    "slug": "sbc_app_16",
    "number": 16,
    "group": "application",
    "title": "CI/CD and Deployment",
    "intro": "Now we will make building and releasing repeatable. A successful local launch is not yet a deployment process.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Build once, deploy the artifact",
        "paragraphs": [
          "The pipeline runs Maven verification, packages the application and builds a container. Use an immutable commit-based image tag when publishing. Do not rebuild a different binary manually on the server."
        ],
        "files": [
          {
            "path": "ci.yml",
            "text": "name: Continuation verification\r\non: [push, pull_request]\r\njobs:\r\n  test:\r\n    runs-on: ubuntu-latest\r\n    steps:\r\n      - uses: actions/checkout@v4\r\n      - uses: actions/setup-java@v4\r\n        with:\r\n          distribution: temurin\r\n          java-version: '25'\r\n          cache: maven\r\n      - run: mvn -B -f demo/spring-boot-crash/continuation/pom.xml verify\r\n      - run: mvn -B -f demo/spring-boot-crash/continuation/commerce/pom.xml -Dtest=PostgresIT test\r\n      - run: docker build -t commerce:${{ github.sha }} demo/spring-boot-crash/continuation/commerce\r\n",
            "sha256": "291d6c4e269450f73f5f9e1c25ffc9c2504345b4699c84017326d664c497b07a"
          },
          {
            "path": "commerce/Dockerfile",
            "text": "FROM eclipse-temurin:25-jre\r\nWORKDIR /app\r\nCOPY target/commerce-1.0.0.jar app.jar\r\nRUN mkdir -p /app/data /app/uploads && chown -R 10001:10001 /app\r\nUSER 10001\r\nENTRYPOINT [\"java\",\"-jar\",\"app.jar\"]\r\n",
            "sha256": "cd1d5b2fc1bf9e054bae058771c86c7cd9c10390a26c613c818ec6198016fb87"
          }
        ]
      },
      {
        "heading": "Move configuration outside the image",
        "paragraphs": [
          "Set database, mail and provider configuration through environment variables or your deployment platform’s secret store. The image contains no payment keys. Public deployments need HTTPS and private access between services."
        ]
      },
      {
        "heading": "Deploy with a rollback plan",
        "paragraphs": [
          "Run migrations as part of the release process, check readiness, then direct traffic to the new version. Favor schema changes compatible with both old and new application versions during a rolling release. Rolling back Java does not automatically undo migrated data."
        ]
      },
      {
        "heading": "Choose hosting when ready",
        "paragraphs": [
          "No cloud login is required for the local project. To deploy it, we will need your preferred platform, registry, domain and a way for you to configure secrets there. The included pipeline builds and tests locally; it does not publish to an account without your choice."
        ],
        "exercise": "Build the Docker image, run it with external database settings, and verify health/readiness before testing checkout."
      }
    ]
  },
  {
    "slug": "sbc_app_17",
    "number": 17,
    "group": "application",
    "title": "Complete Order Application",
    "intro": "Now we will connect the features into one user journey. We are going to register, place an order, pay, and inspect the result without bypassing the application’s rules.",
    "module": "commerce",
    "sections": [
      {
        "heading": "Prepare the application",
        "paragraphs": [
          "Start PostgreSQL and Mailpit if Docker is available. Otherwise the application uses file-backed H2; authentication email still needs an SMTP server. Build commerce with Maven and start its JAR. Swagger UI provides the endpoint reference."
        ]
      },
      {
        "heading": "Follow the complete journey",
        "paragraphs": [
          "Register → verify email in Mailpit → log in → create an order → start Stripe test checkout → receive a signed webhook → read the paid order. Keep the bearer token in Postman authorization rather than adding an owner to the request body."
        ],
        "flow": [
          "Account verified",
          "Order PENDING",
          "Checkout created",
          "Signed payment event",
          "Order PAID"
        ]
      },
      {
        "heading": "Exercise the boundaries",
        "paragraphs": [
          "Try invalid quantities, another user’s order ID, a stale version, an unsigned webhook, and a repeated signed event. Then rotate tokens and confirm the old access token no longer works."
        ],
        "files": [
          {
            "path": "commerce/src/test/java/hub/commerce/CommerceTest.java",
            "text": "package hub.commerce;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\nimport static org.mockito.Mockito.*;\r\nimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;\r\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;\r\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;\r\n\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.junit.jupiter.api.*;\r\nimport org.mockito.ArgumentCaptor;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.test.context.bean.override.mockito.MockitoBean;\r\nimport org.springframework.test.web.servlet.MockMvc;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"spring.datasource.url=jdbc:h2:mem:commerce-tests;DB_CLOSE_DELAY=-1\",\r\n      \"payment.key=sk_test_fixture\",\r\n      \"payment.webhook-secret=whsec_fixture\",\r\n      \"management.health.mail.enabled=false\"\r\n    })\r\n@AutoConfigureMockMvc\r\nclass CommerceTest {\r\n  @Autowired MockMvc mvc;\r\n  @Autowired AuthService auth;\r\n  @Autowired JdbcTemplate db;\r\n  @Autowired Orders orders;\r\n  @MockitoBean JavaMailSender mail;\r\n  @MockitoBean PaymentClient payment;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from payment_event\");\r\n    db.update(\"delete from auth_token\");\r\n    db.update(\"delete from account\");\r\n    orders.deleteAll();\r\n    reset(mail, payment);\r\n  }\r\n\r\n  @Test\r\n  void invalidOrderReturnsFields() throws Exception {\r\n    mvc.perform(\r\n            post(\"/api/v1/orders\")\r\n                .with(user(\"learner@example.test\"))\r\n                .contentType(\"application/json\")\r\n                .content(\"{\\\"product\\\":\\\"\\\",\\\"quantity\\\":0}\"))\r\n        .andExpect(status().isBadRequest())\r\n        .andExpect(jsonPath(\"$.errors\").isArray());\r\n  }\r\n\r\n  @Test\r\n  void ownerCannotReadAnotherOrder() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void staleCancellationReturnsConflict() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/cancel?version=99\").with(user(\"alice\")))\r\n        .andExpect(status().isConflict());\r\n    assertEquals(\"PENDING\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  String register() {\r\n    auth.register(\"learner@example.test\", \"very-long-password\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String text = c.getValue().getText();\r\n    return text.substring(text.indexOf(\"token: \") + 7);\r\n  }\r\n\r\n  @Test\r\n  void verifyRefreshLogoutAndReset() {\r\n    String token = register();\r\n    assertThrows(Exception.class, () -> auth.login(\"learner@example.test\", \"very-long-password\"));\r\n    auth.verify(token);\r\n    var first = auth.login(\"learner@example.test\", \"very-long-password\");\r\n    assertEquals(\"learner@example.test\", auth.authenticate(first.accessToken()));\r\n    var second = auth.refresh(first.refreshToken());\r\n    assertNull(auth.authenticate(first.accessToken()));\r\n    assertThrows(Exception.class, () -> auth.refresh(first.refreshToken()));\r\n    auth.logout(second.refreshToken());\r\n    assertNull(auth.authenticate(second.accessToken()));\r\n    reset(mail);\r\n    auth.requestReset(\"learner@example.test\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String body = c.getValue().getText();\r\n    auth.reset(body.substring(body.indexOf(\"token: \") + 7), \"another-long-password\");\r\n    assertNotNull(auth.login(\"learner@example.test\", \"another-long-password\"));\r\n  }\r\n\r\n  @Test\r\n  void signedWebhookIsIdempotent() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.checkoutId = \"cs_fixture\";\r\n    o = orders.save(o);\r\n    String body =\r\n        \"{\\\"id\\\":\\\"evt_1\\\",\\\"type\\\":\\\"checkout.session.completed\\\",\\\"data\\\":{\\\"object\\\":{\\\"id\\\":\\\"cs_fixture\\\",\\\"payment_status\\\":\\\"paid\\\",\\\"payment_intent\\\":\\\"pi_fixture\\\",\\\"amount_total\\\":2500,\\\"currency\\\":\\\"usd\\\",\\\"metadata\\\":{\\\"orderId\\\":\\\"\"\r\n            + o.id\r\n            + \"\\\"}}}}\";\r\n    long time = java.time.Instant.now().getEpochSecond();\r\n    var mac = Mac.getInstance(\"HmacSHA256\");\r\n    mac.init(new SecretKeySpec(\"whsec_fixture\".getBytes(), \"HmacSHA256\"));\r\n    String signature =\r\n        \"t=\"\r\n            + time\r\n            + \",v1=\"\r\n            + HexFormat.of().formatHex(mac.doFinal((time + \".\" + body).getBytes()));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(\r\n              post(\"/webhooks/stripe\")\r\n                  .header(\"Stripe-Signature\", signature)\r\n                  .contentType(\"application/json\")\r\n                  .content(body))\r\n          .andExpect(status().isOk());\r\n    assertEquals(\"PAID\", orders.findById(o.id).orElseThrow().status);\r\n    assertEquals(1, db.queryForObject(\"select count(*) from payment_event\", Integer.class));\r\n    mvc.perform(post(\"/webhooks/stripe\").header(\"Stripe-Signature\", \"invalid\").content(body))\r\n        .andExpect(status().isBadRequest());\r\n  }\r\n\r\n  @Test\r\n  void checkoutUsesServerAmountAndReusesSession() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 2));\r\n    when(payment.checkout(any()))\r\n        .thenReturn(new PaymentClient.Checkout(\"cs_test\", \"https://checkout.stripe.com/test\"));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/checkout\").with(user(\"alice\")))\r\n          .andExpect(status().isOk());\r\n    verify(payment, times(1)).checkout(any());\r\n  }\r\n\r\n  @Test\r\n  void detailFetchAndRefundReconciliation() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.status = \"PAID\";\r\n    o.paymentId = \"pi_fixture\";\r\n    o = orders.save(o);\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id + \"/detail\").with(user(\"alice\")))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.lines[0].product\").value(\"Book\"));\r\n    doReturn(Map.of(\"id\", \"re_fixture\", \"status\", \"pending\"))\r\n        .when(payment)\r\n        .refund(o.id, \"pi_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/refund\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUND_PENDING\", orders.findById(o.id).orElseThrow().status);\r\n    doReturn(Map.of(\"status\", \"succeeded\")).when(payment).refundStatus(\"re_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/reconcile\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUNDED\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  @Test\r\n  void pdfUploadCannotBeReadByAnotherUser() throws Exception {\r\n    var upload =\r\n        new org.springframework.mock.web.MockMultipartFile(\r\n            \"file\", \"a.pdf\", \"application/pdf\", \"%PDF-fixture\".getBytes());\r\n    String response =\r\n        mvc.perform(multipart(\"/api/v1/files\").file(upload).with(user(\"alice\")))\r\n            .andExpect(status().isOk())\r\n            .andReturn()\r\n            .getResponse()\r\n            .getContentAsString();\r\n    String id =\r\n        new com.fasterxml.jackson.databind.ObjectMapper().readTree(response).get(\"id\").asText();\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"alice\"))).andExpect(status().isOk());\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void openApiAndMissingAuthentication() throws Exception {\r\n    mvc.perform(get(\"/v3/api-docs\"))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.paths['/api/v1/orders']\").exists());\r\n    mvc.perform(get(\"/api/v1/orders\")).andExpect(status().isUnauthorized());\r\n  }\r\n}\r\n",
            "sha256": "78434dc716cdb9970827f61365db92f6c802090e2ec11ffe8cc07f4a1ba604f3"
          }
        ]
      },
      {
        "heading": "Continue into distributed workflows",
        "paragraphs": [
          "The application currently owns its order database and calls a provider. Next, we split Order, Inventory and Payment into independent processes with separate stores. This changes how we recover; adding @Transactional to the calling method will not cover the other services."
        ],
        "exercise": "Write down the order’s local state and the provider’s state when the HTTP response is lost after a successful charge. Carry that scenario into the next group."
      }
    ]
  },
  {
    "slug": "sbc_dist_01",
    "number": 1,
    "group": "distributed",
    "title": "Distributed Workflow Basics",
    "intro": "Now we are going to split checkout across independent services. Each service can commit its own data while another service fails.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Draw the boundaries",
        "paragraphs": [
          "Order stores workflow progress. Inventory owns reservation state. Payment owns charge state. We run one workflow JAR three times with different roles, ports and database files. This keeps the code small while preserving real process and database boundaries."
        ],
        "flow": [
          "Order :8100",
          "Inventory :8101",
          "Payment :8102"
        ]
      },
      {
        "heading": "Why one transaction is insufficient",
        "paragraphs": [
          "A local database rollback cannot undo a request already committed by another process. The caller can also lose the response after the remote commit. A distributed workflow needs durable progress and a recovery policy."
        ]
      },
      {
        "heading": "Start the participants",
        "paragraphs": [
          "Set WORKFLOW_SECRET to the same locally chosen value of at least sixteen characters in all three terminals. Start inventory on 8101 and payment on 8102, then order on 8100. Use the role-specific commands shown below. Each request must carry X-Workflow-Key."
        ],
        "files": [
          {
            "path": "workflow/src/main/resources/application.properties",
            "text": "server.port=${PORT:8100}\r\nnode.role=${NODE_ROLE:order}\r\nspring.datasource.url=${WORKFLOW_DB:jdbc:h2:file:./data/${node.role};DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=sa\r\nspring.datasource.password=\r\nspring.sql.init.mode=always\r\ninventory.url=${INVENTORY_URL:http://localhost:8101}\r\npayment.url=${PAYMENT_URL:http://localhost:8102}\r\nworkflow.mode=${WORKFLOW_MODE:orchestration}\r\nworkflow.secret=${WORKFLOW_SECRET:}\r\nspring.rabbitmq.publisher-confirm-type=correlated\r\nspring.rabbitmq.publisher-returns=true\r\nspring.rabbitmq.template.mandatory=true\r\nspring.rabbitmq.listener.simple.retry.enabled=true\r\nspring.rabbitmq.listener.simple.retry.max-attempts=3\r\nspring.rabbitmq.listener.simple.default-requeue-rejected=false\r\nmanagement.endpoints.web.exposure.include=health,info\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "f1ba230c220d61693761ac91a696934da2aadbe44529b3805fe2709df762d899"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/NodeSecurity.java",
            "text": "package hub.workflow;\r\n\r\nimport jakarta.servlet.*;\r\nimport jakarta.servlet.http.*;\r\nimport java.io.IOException;\r\nimport java.nio.charset.StandardCharsets;\r\nimport java.security.MessageDigest;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.stereotype.Component;\r\nimport org.springframework.web.filter.OncePerRequestFilter;\r\n\r\n@Component\r\npublic class NodeSecurity extends OncePerRequestFilter {\r\n  private final String secret;\r\n\r\n  public NodeSecurity(@Value(\"${workflow.secret}\") String secret) {\r\n    if (secret.length() < 16)\r\n      throw new IllegalArgumentException(\"Set WORKFLOW_SECRET to at least 16 characters\");\r\n    this.secret = secret;\r\n  }\r\n\r\n  protected void doFilterInternal(HttpServletRequest q, HttpServletResponse r, FilterChain chain)\r\n      throws ServletException, IOException {\r\n    if (q.getRequestURI().startsWith(\"/actuator/health\")) {\r\n      chain.doFilter(q, r);\r\n      return;\r\n    }\r\n    String candidate = q.getHeader(\"X-Workflow-Key\");\r\n    if (candidate == null\r\n        || !MessageDigest.isEqual(\r\n            candidate.getBytes(StandardCharsets.UTF_8), secret.getBytes(StandardCharsets.UTF_8))) {\r\n      r.sendError(401);\r\n      return;\r\n    }\r\n    chain.doFilter(q, r);\r\n  }\r\n}\r\n",
            "sha256": "0373380a81b0a08bff29a3473d9e19c46ed5e900c4b215eebc00cb4071f70ba7"
          }
        ]
      },
      {
        "heading": "Keep the payment boundary explicit",
        "paragraphs": [
          "The workflow Payment participant is a deterministic local gateway fixture for failure exercises. It does not charge cards. The previous group’s Stripe adapter is the real test-mode provider integration; replacing the participant requires the same idempotency and reconciliation contract."
        ],
        "exercise": "Stop Payment and check that Order can still answer its health endpoint. Explain which boundary failed."
      }
    ]
  },
  {
    "slug": "sbc_dist_02",
    "number": 2,
    "group": "distributed",
    "title": "HTTP Calls versus Messages",
    "intro": "Now we will compare waiting for an immediate HTTP result with delivering a message for another service to process later.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Synchronous communication",
        "paragraphs": [
          "Orchestrator.effect makes a bounded HTTP call. A response can tell us the participant’s current state, but an exception does not tell us that the operation never happened."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ]
      },
      {
        "heading": "Asynchronous communication",
        "paragraphs": [
          "With the broker profile and choreography mode, BrokerFlow publishes durable events. The producer can commit before the consumer runs. That introduces delayed outcomes, duplicate delivery and event schema responsibilities."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Choose by the use case",
        "paragraphs": [
          "Use HTTP when the caller needs a bounded immediate response. Use messaging when work should remain pending while a consumer is unavailable. Neither choice removes the need for idempotency or durable state."
        ]
      },
      {
        "heading": "Compare both versions",
        "paragraphs": [
          "First run the default HTTP orchestration. Later start RabbitMQ and switch all nodes to broker/choreography. Reuse the same success and failure scenarios so the communication difference is visible."
        ],
        "exercise": "Record what the caller sees when Payment is down in each version. Distinguish accepted work from completed work."
      }
    ]
  },
  {
    "slug": "sbc_dist_03",
    "number": 3,
    "group": "distributed",
    "title": "Order and Payment State Machines",
    "intro": "Now we will name the intermediate states. A single success flag cannot describe reserved stock, an uncertain charge, and a pending refund.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Write legal transitions",
        "paragraphs": [
          "The order path is NEW → RESERVED → CHARGED → COMPLETED. A declined payment moves to RELEASING → CANCELLED. A later failure moves through REFUNDING before release. MANUAL_REVIEW means automatic recovery stopped; it does not mean the payment failed."
        ],
        "flow": [
          "NEW",
          "RESERVED",
          "CHARGED",
          "COMPLETED"
        ]
      },
      {
        "heading": "Keep participant states separate",
        "paragraphs": [
          "Inventory uses RESERVED, COMMITTED and RELEASED. Payment uses CHARGED, DECLINED and REFUNDED. A participant result is not automatically the order’s final result."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Participant.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\n@RequestMapping(\"/effects\")\r\npublic class Participant {\r\n  private final JdbcTemplate db;\r\n  private final String role;\r\n\r\n  public Participant(JdbcTemplate db, @Value(\"${node.role}\") String role) {\r\n    this.db = db;\r\n    this.role = role;\r\n  }\r\n\r\n  public record Command(String id, String action, boolean fail, long expectedVersion) {}\r\n\r\n  @PostMapping\r\n  @Transactional\r\n  public Map<String, Object> apply(@RequestBody Command c) {\r\n    if (!Set.of(\"inventory\", \"payment\").contains(role))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Run a participant role\");\r\n    String key = role + \":\" + c.id();\r\n    var existing = db.queryForList(\"select * from effect where id=? for update\", key);\r\n    String target =\r\n        switch (c.action()) {\r\n          case \"reserve\" -> \"RESERVED\";\r\n          case \"commit\" -> \"COMMITTED\";\r\n          case \"release\" -> \"RELEASED\";\r\n          case \"charge\" -> \"CHARGED\";\r\n          case \"refund\" -> \"REFUNDED\";\r\n          default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n        };\r\n    if (role.equals(\"inventory\") && !Set.of(\"reserve\", \"commit\", \"release\").contains(c.action())\r\n        || role.equals(\"payment\") && !Set.of(\"charge\", \"refund\").contains(c.action()))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n    if (existing.isEmpty()) {\r\n      if (!Set.of(\"reserve\", \"charge\").contains(c.action()))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n      db.update(\r\n          \"insert into effect values (?,?,0,?)\",\r\n          key,\r\n          c.fail() ? \"DECLINED\" : target,\r\n          System.currentTimeMillis() + 60000);\r\n    } else {\r\n      String state = (String) existing.getFirst().get(\"STATE\");\r\n      long version = ((Number) existing.getFirst().get(\"VERSION\")).longValue();\r\n      if (state.equals(target)) return Map.of(\"state\", state, \"version\", version);\r\n      if (state.equals(\"DECLINED\")) return Map.of(\"state\", state, \"version\", version);\r\n      if (c.expectedVersion() >= 0 && version != c.expectedVersion())\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Stale version\");\r\n      if (!(state.equals(\"RESERVED\") && Set.of(\"commit\", \"release\").contains(c.action())\r\n          || state.equals(\"CHARGED\") && c.action().equals(\"refund\")))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Illegal or stale transition\");\r\n      db.update(\"update effect set state=?,version=version+1 where id=?\", target, key);\r\n    }\r\n    return db.queryForMap(\"select state,version from effect where id=?\", key);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public List<Map<String, Object>> status(@PathVariable String id) {\r\n    return db.queryForList(\"select * from effect where id=?\", role + \":\" + id);\r\n  }\r\n}\r\n",
            "sha256": "3dd834d8eb2a93dac072f861e80ccda0e8063559d743241e23b5e82caad9450b"
          }
        ]
      },
      {
        "heading": "Persist before continuing",
        "paragraphs": [
          "WorkflowStore stores progress and appends the state-change event in one local transaction. Orchestrator advances only from the expected phase so a stale update cannot overwrite a newer state."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/WorkflowStore.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Service\r\npublic class WorkflowStore {\r\n  private final JdbcTemplate db;\r\n\r\n  public WorkflowStore(JdbcTemplate db) {\r\n    this.db = db;\r\n  }\r\n\r\n  @Transactional\r\n  public String create(String id, boolean failPayment, boolean failConfirm, String correlation) {\r\n    if (db.queryForList(\"select id from workflow where id=?\", String.class, id).isEmpty()) {\r\n      db.update(\r\n          \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n          id,\r\n          failPayment,\r\n          failConfirm,\r\n          correlation);\r\n      event(id, \"OrderCreated\", correlation);\r\n    }\r\n    return id;\r\n  }\r\n\r\n  public void event(String id, String kind, String correlation) {\r\n    db.update(\r\n        \"insert into outbox values (?,?,?,false,?)\",\r\n        UUID.randomUUID().toString(),\r\n        id,\r\n        kind,\r\n        correlation);\r\n  }\r\n\r\n  @Transactional\r\n  public void transition(String id, String expected, String next, String correlation) {\r\n    if (db.update(\r\n            \"update workflow set phase=?,attempts=0,next_attempt=0 where id=? and phase=?\",\r\n            next,\r\n            id,\r\n            expected)\r\n        == 1) event(id, next, correlation);\r\n  }\r\n\r\n  public Map<String, Object> get(String id) {\r\n    return db.queryForMap(\"select * from workflow where id=?\", id);\r\n  }\r\n}\r\n",
            "sha256": "da9701bcfd9eaca0795f5a5e388753fbde509cb8ff4f2db1a1ccf7b052f42466"
          }
        ]
      },
      {
        "heading": "Inspect the workflow",
        "paragraphs": [
          "GET /workflows/{id} returns PHASE, ATTEMPTS and NEXT_ATTEMPT. Read these together when diagnosing a pending workflow."
        ],
        "exercise": "Add a transition table to your notes. For each arrow, identify its trigger and the recovery action if its response is lost."
      }
    ]
  },
  {
    "slug": "sbc_dist_04",
    "number": 4,
    "group": "distributed",
    "title": "Reliable Message Delivery",
    "intro": "Now we will follow a message from the producer’s database to the consumer’s committed effect. There are several failure boundaries along that path.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Confirm publication",
        "paragraphs": [
          "A broker publisher confirm reports broker acceptance. An unroutable return means the message did not reach a queue. Neither proves that a consumer finished the business work. Relay checks both before marking an outbox record sent."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Acknowledge consumption",
        "paragraphs": [
          "The listener’s database transaction must complete successfully before its work is considered processed. If acknowledgement is lost after commit, the broker may redeliver. That is why the inbox check is necessary."
        ]
      },
      {
        "heading": "Use durable queues and a dead-letter route",
        "paragraphs": [
          "Each role has a durable queue and a separate dead queue. The broker profile configures bounded listener retry and rejection. A message in the dead queue requires investigation; silently deleting it loses business work."
        ]
      },
      {
        "heading": "Plan for at-least-once delivery",
        "paragraphs": [
          "The supplied relay may publish the same outbox record again after a crash between confirm and the sent update. This is intentional at-least-once behavior, not exactly-once delivery."
        ],
        "exercise": "Pause the consumer, publish an event, and restart the consumer. Then redeliver the event and verify one database effect."
      }
    ]
  },
  {
    "slug": "sbc_dist_05",
    "number": 5,
    "group": "distributed",
    "title": "Idempotent Business Operations",
    "intro": "Now we will make repeated requests safe. A retry should repeat our attempt to learn the outcome, not create another charge.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Choose a business key",
        "paragraphs": [
          "Each workflow has a UUID supplied once by the caller. Participant uses role + workflow ID as its effect key. A repeated reserve or charge returns the existing result instead of inserting a second effect."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Participant.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\n@RequestMapping(\"/effects\")\r\npublic class Participant {\r\n  private final JdbcTemplate db;\r\n  private final String role;\r\n\r\n  public Participant(JdbcTemplate db, @Value(\"${node.role}\") String role) {\r\n    this.db = db;\r\n    this.role = role;\r\n  }\r\n\r\n  public record Command(String id, String action, boolean fail, long expectedVersion) {}\r\n\r\n  @PostMapping\r\n  @Transactional\r\n  public Map<String, Object> apply(@RequestBody Command c) {\r\n    if (!Set.of(\"inventory\", \"payment\").contains(role))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Run a participant role\");\r\n    String key = role + \":\" + c.id();\r\n    var existing = db.queryForList(\"select * from effect where id=? for update\", key);\r\n    String target =\r\n        switch (c.action()) {\r\n          case \"reserve\" -> \"RESERVED\";\r\n          case \"commit\" -> \"COMMITTED\";\r\n          case \"release\" -> \"RELEASED\";\r\n          case \"charge\" -> \"CHARGED\";\r\n          case \"refund\" -> \"REFUNDED\";\r\n          default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n        };\r\n    if (role.equals(\"inventory\") && !Set.of(\"reserve\", \"commit\", \"release\").contains(c.action())\r\n        || role.equals(\"payment\") && !Set.of(\"charge\", \"refund\").contains(c.action()))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n    if (existing.isEmpty()) {\r\n      if (!Set.of(\"reserve\", \"charge\").contains(c.action()))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n      db.update(\r\n          \"insert into effect values (?,?,0,?)\",\r\n          key,\r\n          c.fail() ? \"DECLINED\" : target,\r\n          System.currentTimeMillis() + 60000);\r\n    } else {\r\n      String state = (String) existing.getFirst().get(\"STATE\");\r\n      long version = ((Number) existing.getFirst().get(\"VERSION\")).longValue();\r\n      if (state.equals(target)) return Map.of(\"state\", state, \"version\", version);\r\n      if (state.equals(\"DECLINED\")) return Map.of(\"state\", state, \"version\", version);\r\n      if (c.expectedVersion() >= 0 && version != c.expectedVersion())\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Stale version\");\r\n      if (!(state.equals(\"RESERVED\") && Set.of(\"commit\", \"release\").contains(c.action())\r\n          || state.equals(\"CHARGED\") && c.action().equals(\"refund\")))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Illegal or stale transition\");\r\n      db.update(\"update effect set state=?,version=version+1 where id=?\", target, key);\r\n    }\r\n    return db.queryForMap(\"select state,version from effect where id=?\", key);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public List<Map<String, Object>> status(@PathVariable String id) {\r\n    return db.queryForList(\"select * from effect where id=?\", role + \":\" + id);\r\n  }\r\n}\r\n",
            "sha256": "3dd834d8eb2a93dac072f861e80ccda0e8063559d743241e23b5e82caad9450b"
          }
        ]
      },
      {
        "heading": "Check the same operation",
        "paragraphs": [
          "Reusing an idempotency key for a different amount or product should be rejected. The small workflow fixture has one fixed reservation per workflow; a real adapter must persist and compare the request fingerprint alongside its key."
        ]
      },
      {
        "heading": "Do not replay obsolete transitions",
        "paragraphs": [
          "After release, a delayed reserve cannot recreate the reservation. Participant validates legal source states and can reject an expected-version mismatch. Same-result retries and stale transitions are different cases."
        ]
      },
      {
        "heading": "Test the repetition",
        "paragraphs": [
          "WorkflowTest repeats reserve and checks that only one row exists. It also proves that reserve cannot undo release."
        ],
        "files": [
          {
            "path": "workflow/src/test/java/hub/workflow/WorkflowTest.java",
            "text": "package hub.workflow;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\n\r\nimport org.junit.jupiter.api.*;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"workflow.secret=test-only-long-secret\",\r\n      \"spring.datasource.url=jdbc:h2:mem:workflow;DB_CLOSE_DELAY=-1\",\r\n      \"node.role=inventory\"\r\n    })\r\nclass WorkflowTest {\r\n  @Autowired Participant participant;\r\n  @Autowired JdbcTemplate db;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from effect\");\r\n  }\r\n\r\n  @Test\r\n  void duplicateReserveDoesNotCreateAnotherEffect() {\r\n    for (int i = 0; i < 2; i++)\r\n      participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertEquals(1, db.queryForObject(\"select count(*) from effect\", Integer.class));\r\n  }\r\n\r\n  @Test\r\n  void staleCommandCannotReverseRelease() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    participant.apply(new Participant.Command(\"a\", \"release\", false, -1));\r\n    assertThrows(\r\n        Exception.class,\r\n        () -> participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1)));\r\n  }\r\n\r\n  @Test\r\n  void versionRejectsConcurrentChange() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertThrows(\r\n        Exception.class, () -> participant.apply(new Participant.Command(\"a\", \"commit\", false, 2)));\r\n  }\r\n}\r\n",
            "sha256": "ea5baa37c99bc1feec1636239e34591f87ea6c7003e442bafcbf8d866d4bfba3"
          }
        ],
        "exercise": "Send the same charge twice with the same workflow ID, then query Payment and verify one stored effect."
      }
    ]
  },
  {
    "slug": "sbc_dist_06",
    "number": 6,
    "group": "distributed",
    "title": "Transactional Outbox",
    "intro": "Now we will close the gap between committing an order and publishing its event. Sending before or after a database commit leaves a failure window.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Commit intent with the business change",
        "paragraphs": [
          "WorkflowStore creates the workflow and its OrderCreated outbox row in one database transaction. If that transaction rolls back, neither row exists. The relay sends only committed rows."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/WorkflowStore.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Service\r\npublic class WorkflowStore {\r\n  private final JdbcTemplate db;\r\n\r\n  public WorkflowStore(JdbcTemplate db) {\r\n    this.db = db;\r\n  }\r\n\r\n  @Transactional\r\n  public String create(String id, boolean failPayment, boolean failConfirm, String correlation) {\r\n    if (db.queryForList(\"select id from workflow where id=?\", String.class, id).isEmpty()) {\r\n      db.update(\r\n          \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n          id,\r\n          failPayment,\r\n          failConfirm,\r\n          correlation);\r\n      event(id, \"OrderCreated\", correlation);\r\n    }\r\n    return id;\r\n  }\r\n\r\n  public void event(String id, String kind, String correlation) {\r\n    db.update(\r\n        \"insert into outbox values (?,?,?,false,?)\",\r\n        UUID.randomUUID().toString(),\r\n        id,\r\n        kind,\r\n        correlation);\r\n  }\r\n\r\n  @Transactional\r\n  public void transition(String id, String expected, String next, String correlation) {\r\n    if (db.update(\r\n            \"update workflow set phase=?,attempts=0,next_attempt=0 where id=? and phase=?\",\r\n            next,\r\n            id,\r\n            expected)\r\n        == 1) event(id, next, correlation);\r\n  }\r\n\r\n  public Map<String, Object> get(String id) {\r\n    return db.queryForMap(\"select * from workflow where id=?\", id);\r\n  }\r\n}\r\n",
            "sha256": "da9701bcfd9eaca0795f5a5e388753fbde509cb8ff4f2db1a1ccf7b052f42466"
          },
          {
            "path": "workflow/src/main/resources/schema.sql",
            "text": "create table if not exists workflow (id varchar(255) primary key, phase varchar(64) not null, attempts integer not null, next_attempt bigint not null, fail_payment boolean not null, fail_confirm boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists outbox (id varchar(255) primary key, order_id varchar(255) not null, kind varchar(64) not null, sent boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists inbox (id varchar(255) primary key);\r\ncreate table if not exists effect (id varchar(255) primary key, state varchar(64) not null, version bigint not null, expires_at bigint not null);\r\n",
            "sha256": "1854a1047c1ef118d9fe242d75ed4d7827720f02b396d7eaa9611fc59a8e7eec"
          }
        ]
      },
      {
        "heading": "Publish independently",
        "paragraphs": [
          "Relay reads unsent rows and sends their stored event ID. It waits for publisher confirmation and checks returns before setting sent=true. When the broker is down, the row remains pending for the next pass."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Expect the duplicate window",
        "paragraphs": [
          "If the broker accepted the event and the process crashed before updating sent, the row is sent again. Do not attempt to solve this by inventing one transaction spanning JDBC and RabbitMQ; use an idempotent consumer."
        ]
      },
      {
        "heading": "Operate the relay",
        "paragraphs": [
          "GET /workflows/{id}/events shows the local outbox. A production relay needs batching, retention, queue-depth metrics and safe multi-worker claiming. This teaching relay runs one publisher per node."
        ],
        "exercise": "Start an order with RabbitMQ stopped, inspect its unsent row, then start RabbitMQ and watch it become sent."
      }
    ]
  },
  {
    "slug": "sbc_dist_07",
    "number": 7,
    "group": "distributed",
    "title": "Inbox and Idempotent Consumers",
    "intro": "Now we will make a repeated delivery harmless at the receiver, even if the sender behaves correctly but its acknowledgement is lost.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Store processed event IDs",
        "paragraphs": [
          "The inbox table has a primary key on event ID. Handler checks it inside the same transaction as the local effect and the next outbox event. A failure rolls back all three."
        ],
        "files": [
          {
            "path": "workflow/src/main/resources/schema.sql",
            "text": "create table if not exists workflow (id varchar(255) primary key, phase varchar(64) not null, attempts integer not null, next_attempt bigint not null, fail_payment boolean not null, fail_confirm boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists outbox (id varchar(255) primary key, order_id varchar(255) not null, kind varchar(64) not null, sent boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists inbox (id varchar(255) primary key);\r\ncreate table if not exists effect (id varchar(255) primary key, state varchar(64) not null, version bigint not null, expires_at bigint not null);\r\n",
            "sha256": "1854a1047c1ef118d9fe242d75ed4d7827720f02b396d7eaa9611fc59a8e7eec"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Scope deduplication correctly",
        "paragraphs": [
          "An inbox belongs to one consumer’s database. Inventory and Payment may both process the same event independently. They must not share one global processed-event flag that prevents the second service from acting."
        ]
      },
      {
        "heading": "Consider concurrent delivery",
        "paragraphs": [
          "The unique constraint is the final protection if two deliveries race past the initial lookup. The losing transaction fails and can retry; its later attempt sees the committed inbox row and exits."
        ]
      },
      {
        "heading": "Keep external effects outside the illusion",
        "paragraphs": [
          "A database inbox cannot roll back an already-sent email or charge. That external operation needs its own stable idempotency key and a durable outcome record."
        ],
        "exercise": "Inject an exception after the local effect but before listener return. Verify that rollback leaves no partial effect or inbox marker."
      }
    ]
  },
  {
    "slug": "sbc_dist_08",
    "number": 8,
    "group": "distributed",
    "title": "Saga Fundamentals",
    "intro": "Now we will join local transactions into a business workflow without pretending they are one ACID transaction.",
    "module": "workflow",
    "sections": [
      {
        "heading": "What is a Saga?",
        "paragraphs": [
          "A Saga is a sequence of local transactions with recovery actions for completed steps. Other requests may observe intermediate states, so the domain must define what pending reservations and payments mean."
        ]
      },
      {
        "heading": "Write compensation beside each step",
        "paragraphs": [
          "Reserve stock → release stock. Charge payment → request refund. Create pending order → cancel order. A refund is a new business operation; it does not erase the original charge."
        ],
        "table": {
          "head": [
            "Forward step",
            "Compensation"
          ],
          "rows": [
            [
              "Reserve inventory",
              "Release reservation"
            ],
            [
              "Charge payment",
              "Request and confirm refund"
            ],
            [
              "Create pending order",
              "Mark cancelled"
            ]
          ]
        }
      },
      {
        "heading": "Find the irreversible boundary",
        "paragraphs": [
          "A completed shipment cannot be undone with a database rollback. Before an irreversible action, define how the business will handle failures: return shipment, customer support or another explicit process."
        ]
      },
      {
        "heading": "Read the implementation",
        "paragraphs": [
          "Orchestrator persists one phase at a time and repeats an uncertain participant call with the same workflow ID. It attempts compensation only after the forward effect is known."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ],
        "exercise": "Draw a failure after each step and identify which already-completed steps need compensation."
      }
    ]
  },
  {
    "slug": "sbc_dist_09",
    "number": 9,
    "group": "distributed",
    "title": "Choreography-Based Saga",
    "intro": "Now we will let services react to events instead of receiving each instruction from a central coordinator.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Follow the success chain",
        "paragraphs": [
          "OrderCreated → StockReserved → PaymentCharged → CommitRequested → StockCommitted. Inventory and Payment own their reactions. Order records the final business outcome."
        ],
        "flow": [
          "OrderCreated",
          "StockReserved",
          "PaymentCharged",
          "StockCommitted",
          "COMPLETED"
        ]
      },
      {
        "heading": "Run the event version",
        "paragraphs": [
          "Start RabbitMQ. For every process add --spring.profiles.active=broker --workflow.mode=choreography. The HTTP orchestrator stops advancing phases in this mode; BrokerFlow handlers and their outboxes carry the workflow."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Follow a payment decline",
        "paragraphs": [
          "Payment emits PaymentDeclined, Inventory releases its reservation and emits StockReleased, then Order marks the workflow CANCELLED. Each handler transaction records its inbox entry and outgoing intent."
        ]
      },
      {
        "heading": "Recognize the tradeoff",
        "paragraphs": [
          "Individual handlers are small, but the overall flow is spread across services. Changing a contract can affect several consumers. Keep the event flow diagram and schema ownership clear."
        ],
        "exercise": "Run failPayment=true and inspect each service’s database/logs to explain how cancellation emerged without an HTTP coordinator."
      }
    ]
  },
  {
    "slug": "sbc_dist_10",
    "number": 10,
    "group": "distributed",
    "title": "Orchestration-Based Saga",
    "intro": "Now we will make the coordination explicit. One durable coordinator decides the next command, while participants still own their local data.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Follow one coordinator tick",
        "paragraphs": [
          "tick selects nonterminal workflows whose next attempt is due. advance reads the stored phase, calls one participant and persists the next phase. Each tick performs one forward or recovery step."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ]
      },
      {
        "heading": "Keep participant calls idempotent",
        "paragraphs": [
          "A crash can happen after Participant commits but before Order saves its next phase. On restart, the coordinator calls the same operation again. Participant returns the previous result for that stable workflow ID."
        ]
      },
      {
        "heading": "Compare with choreography",
        "paragraphs": [
          "The coordinator makes progress visible in one place and simplifies a sequential flow. It also owns retry policy, versioning and operational recovery. The services remain independent transactions."
        ]
      },
      {
        "heading": "Run the command version",
        "paragraphs": [
          "Use the default orchestration mode without the broker profile. Submit one workflow and poll its phase until COMPLETED. Then compare the same scenario with the event version."
        ],
        "exercise": "Explain which process decides to refund after failConfirm=true in each version."
      }
    ]
  },
  {
    "slug": "sbc_dist_11",
    "number": 11,
    "group": "distributed",
    "title": "Compensation and Refunds",
    "intro": "Now the charge succeeded but the order cannot be confirmed. We must recover what has already happened rather than simply throw an exception.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Compensate in reverse business order",
        "paragraphs": [
          "The fixture enters REFUNDING, confirms the payment participant’s refund result, then releases inventory and cancels the order. If refund fails or its result is unknown, the workflow remains pending; it must not announce cancellation as fully recovered."
        ],
        "flow": [
          "CHARGED",
          "REFUNDING",
          "RELEASING",
          "CANCELLED"
        ]
      },
      {
        "heading": "A real refund may be asynchronous",
        "paragraphs": [
          "Stripe may return a pending refund. The commerce application records REFUND_PENDING. A production participant must return final refund success only after a signed event or reconciliation confirms it; an accepted request is insufficient."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ]
      },
      {
        "heading": "Retain evidence",
        "paragraphs": [
          "Keep the original charge, refund reference and workflow history. Do not delete a payment row to simulate undoing a charge. Compensation may also fail and require staff intervention."
        ]
      },
      {
        "heading": "Try post-charge failure",
        "paragraphs": [
          "Submit a workflow with failConfirm=true. Expect Payment REFUNDED, Inventory RELEASED and Order CANCELLED. The local fixture makes these states deterministic for practice."
        ],
        "exercise": "Stop Payment while REFUNDING is pending, then restart it. Verify that the workflow does not release and finish before the refund result is known."
      }
    ]
  },
  {
    "slug": "sbc_dist_12",
    "number": 12,
    "group": "distributed",
    "title": "Timeouts and Unknown Outcomes",
    "intro": "Now the payment call timed out. Did the provider decline it, or did it charge successfully before the response was lost?",
    "module": "workflow",
    "sections": [
      {
        "heading": "Unknown is not failed",
        "paragraphs": [
          "A timeout describes what the caller observed. It does not prove that the participant rolled back. Starting a new charge with a new key could double-charge the customer."
        ]
      },
      {
        "heading": "Repeat or reconcile",
        "paragraphs": [
          "The fixture repeats the same operation key; the participant returns its stored effect. A real payment adapter should use the gateway’s idempotency mechanism and query the stored provider reference when needed."
        ]
      },
      {
        "heading": "Read the retry state",
        "paragraphs": [
          "On an HTTP exception, advance keeps the same phase, increments ATTEMPTS and sets NEXT_ATTEMPT. It does not automatically release stock as though the charge certainly failed."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ]
      },
      {
        "heading": "Exercise the lost response",
        "paragraphs": [
          "Add a fixture delay after saving CHARGED, longer than the caller timeout. The caller retries with the same ID. Verify that Payment still has only one charge effect."
        ],
        "exercise": "Describe how an operator resolves MANUAL_REVIEW when the payment provider is unavailable for hours."
      }
    ]
  },
  {
    "slug": "sbc_dist_13",
    "number": 13,
    "group": "distributed",
    "title": "Retries, Dead Letters and Recovery",
    "intro": "Now we will put a limit on automatic recovery. Infinite rapid retries can overload the service we are trying to recover.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Use a retry budget",
        "paragraphs": [
          "The HTTP coordinator uses exponential delay capped at thirty seconds and stops automatic attempts after five failures. These numbers are teaching defaults, not universal payment policies. Business rejection such as DECLINED follows a separate transition."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          }
        ]
      },
      {
        "heading": "Inspect manual review",
        "paragraphs": [
          "MANUAL_REVIEW means inspect participant state, reconcile the gateway, then choose an audited next action. Do not reset attempts and hope an unknown charge disappears. This project deliberately has no unaudited public force-state endpoint."
        ]
      },
      {
        "heading": "Inspect the dead-letter queue",
        "paragraphs": [
          "The broker version retries listener failures three times before dead-letter routing. Fix the cause, inspect the event and current state, then replay with the original event ID. A duplicate must remain safe."
        ],
        "files": [
          {
            "path": "workflow/src/main/resources/application.properties",
            "text": "server.port=${PORT:8100}\r\nnode.role=${NODE_ROLE:order}\r\nspring.datasource.url=${WORKFLOW_DB:jdbc:h2:file:./data/${node.role};DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=sa\r\nspring.datasource.password=\r\nspring.sql.init.mode=always\r\ninventory.url=${INVENTORY_URL:http://localhost:8101}\r\npayment.url=${PAYMENT_URL:http://localhost:8102}\r\nworkflow.mode=${WORKFLOW_MODE:orchestration}\r\nworkflow.secret=${WORKFLOW_SECRET:}\r\nspring.rabbitmq.publisher-confirm-type=correlated\r\nspring.rabbitmq.publisher-returns=true\r\nspring.rabbitmq.template.mandatory=true\r\nspring.rabbitmq.listener.simple.retry.enabled=true\r\nspring.rabbitmq.listener.simple.retry.max-attempts=3\r\nspring.rabbitmq.listener.simple.default-requeue-rejected=false\r\nmanagement.endpoints.web.exposure.include=health,info\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "f1ba230c220d61693761ac91a696934da2aadbe44529b3805fe2709df762d899"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Recover without losing intent",
        "paragraphs": [
          "Keep outbox rows pending until confirmed. A retry policy is incomplete without alerting and a way to inspect stuck work."
        ],
        "exercise": "Make an invalid transition fail repeatedly, locate its dead letter, and explain what must be checked before replay."
      }
    ]
  },
  {
    "slug": "sbc_dist_14",
    "number": 14,
    "group": "distributed",
    "title": "Durable Workflow State and Restarts",
    "intro": "Now we will restart the coordinator halfway through checkout. Progress must survive outside the process heap.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Persist the state",
        "paragraphs": [
          "The default workflow database is a file under data/{role}. Restart the same role from the same working directory to reuse it. Give each service its own database in a shared deployment."
        ],
        "files": [
          {
            "path": "workflow/src/main/resources/schema.sql",
            "text": "create table if not exists workflow (id varchar(255) primary key, phase varchar(64) not null, attempts integer not null, next_attempt bigint not null, fail_payment boolean not null, fail_confirm boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists outbox (id varchar(255) primary key, order_id varchar(255) not null, kind varchar(64) not null, sent boolean not null, correlation varchar(255) not null);\r\ncreate table if not exists inbox (id varchar(255) primary key);\r\ncreate table if not exists effect (id varchar(255) primary key, state varchar(64) not null, version bigint not null, expires_at bigint not null);\r\n",
            "sha256": "1854a1047c1ef118d9fe242d75ed4d7827720f02b396d7eaa9611fc59a8e7eec"
          },
          {
            "path": "workflow/src/main/resources/application.properties",
            "text": "server.port=${PORT:8100}\r\nnode.role=${NODE_ROLE:order}\r\nspring.datasource.url=${WORKFLOW_DB:jdbc:h2:file:./data/${node.role};DB_CLOSE_ON_EXIT=FALSE}\r\nspring.datasource.username=sa\r\nspring.datasource.password=\r\nspring.sql.init.mode=always\r\ninventory.url=${INVENTORY_URL:http://localhost:8101}\r\npayment.url=${PAYMENT_URL:http://localhost:8102}\r\nworkflow.mode=${WORKFLOW_MODE:orchestration}\r\nworkflow.secret=${WORKFLOW_SECRET:}\r\nspring.rabbitmq.publisher-confirm-type=correlated\r\nspring.rabbitmq.publisher-returns=true\r\nspring.rabbitmq.template.mandatory=true\r\nspring.rabbitmq.listener.simple.retry.enabled=true\r\nspring.rabbitmq.listener.simple.retry.max-attempts=3\r\nspring.rabbitmq.listener.simple.default-requeue-rejected=false\r\nmanagement.endpoints.web.exposure.include=health,info\r\n\r\nlogging.level.root=INFO\r\nmanagement.health.rabbit.enabled=false\r\n",
            "sha256": "f1ba230c220d61693761ac91a696934da2aadbe44529b3805fe2709df762d899"
          }
        ]
      },
      {
        "heading": "Resume from committed progress",
        "paragraphs": [
          "A coordinator tick selects persisted nonterminal rows. If the previous process stopped before a transition commit, it repeats the same idempotent command. If it stopped after commit, it continues from the new phase."
        ]
      },
      {
        "heading": "Version the workflow",
        "paragraphs": [
          "Adding a new phase can break older in-flight rows. A production workflow should record a definition version and retain compatible handlers or migrate pending work explicitly. The small project runs one definition version at a time."
        ]
      },
      {
        "heading": "Test an actual restart",
        "paragraphs": [
          "Submit an order while Payment is stopped, wait for RESERVED, stop Order, start Payment, then restart Order with its original database path. Verify completion with one participant effect."
        ],
        "exercise": "Repeat the restart during compensation and inspect the retained outbox rows."
      }
    ]
  },
  {
    "slug": "sbc_dist_15",
    "number": 15,
    "group": "distributed",
    "title": "Payment Webhooks and Reconciliation",
    "intro": "Now we will connect asynchronous provider evidence to our local payment record. Webhooks can be delayed, repeated or arrive after the caller has disconnected.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Verify before trusting",
        "paragraphs": [
          "The commerce webhook verifies the raw body, signature timestamp and HMAC. It also validates the session, currency and amount against the stored order before changing state. Authentication of the event and correctness of the business transition are separate checks."
        ],
        "files": [
          {
            "path": "commerce/src/main/java/hub/commerce/Payments.java",
            "text": "package hub.commerce;\r\n\r\nimport com.fasterxml.jackson.databind.ObjectMapper;\r\nimport java.nio.charset.StandardCharsets;\r\nimport java.security.*;\r\nimport java.time.Instant;\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\npublic class Payments {\r\n  private final PaymentService service;\r\n  private final ObjectMapper json;\r\n  private final String secret;\r\n\r\n  public Payments(\r\n      PaymentService service,\r\n      ObjectMapper json,\r\n      @Value(\"${payment.webhook-secret}\") String secret) {\r\n    this.service = service;\r\n    this.json = json;\r\n    this.secret = secret;\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/checkout\")\r\n  public PaymentClient.Checkout checkout(@PathVariable Long id, java.security.Principal p) {\r\n    return service.checkout(id, p.getName());\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/reconcile\")\r\n  public PurchaseOrder reconcile(@PathVariable Long id, java.security.Principal p) {\r\n    return service.reconcile(id, p.getName());\r\n  }\r\n\r\n  @PostMapping(\"/api/v1/orders/{id}/refund\")\r\n  public Map<?, ?> refund(@PathVariable Long id, java.security.Principal p) {\r\n    return service.refund(id, p.getName());\r\n  }\r\n\r\n  static boolean valid(String raw, String header, String secret, long now) {\r\n    try {\r\n      String timestamp = null;\r\n      List<String> signatures = new ArrayList<>();\r\n      for (String part : header.split(\",\")) {\r\n        String[] pair = part.split(\"=\", 2);\r\n        if (pair[0].equals(\"t\")) timestamp = pair[1];\r\n        if (pair[0].equals(\"v1\")) signatures.add(pair[1]);\r\n      }\r\n      if (timestamp == null || Math.abs(now - Long.parseLong(timestamp)) > 300 || secret.isBlank())\r\n        return false;\r\n      Mac mac = Mac.getInstance(\"HmacSHA256\");\r\n      mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), \"HmacSHA256\"));\r\n      byte[] expected = mac.doFinal((timestamp + \".\" + raw).getBytes(StandardCharsets.UTF_8));\r\n      for (String signature : signatures)\r\n        if (MessageDigest.isEqual(expected, HexFormat.of().parseHex(signature))) return true;\r\n      return false;\r\n    } catch (Exception e) {\r\n      return false;\r\n    }\r\n  }\r\n\r\n  @PostMapping(\"/webhooks/stripe\")\r\n  public void webhook(@RequestBody String raw, @RequestHeader(\"Stripe-Signature\") String signature)\r\n      throws Exception {\r\n    if (!valid(raw, signature, secret, Instant.now().getEpochSecond()))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Invalid webhook signature\");\r\n    var event = json.readTree(raw);\r\n    if (event.path(\"type\").asText().equals(\"checkout.session.completed\")) {\r\n      var o = event.path(\"data\").path(\"object\");\r\n      if (o.path(\"payment_status\").asText().equals(\"paid\"))\r\n        service.paid(\r\n            event.path(\"id\").asText(),\r\n            Long.valueOf(o.path(\"metadata\").path(\"orderId\").asText()),\r\n            o.path(\"id\").asText(),\r\n            o.path(\"payment_intent\").asText(),\r\n            o.path(\"amount_total\").asLong(),\r\n            o.path(\"currency\").asText());\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "abdf4d38f82afbbc99a4f454247be18919c9f8b0a985681c8870084c72ecd531"
          },
          {
            "path": "commerce/src/main/java/hub/commerce/PaymentService.java",
            "text": "package hub.commerce;\r\n\r\nimport java.util.Map;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@Service\r\npublic class PaymentService {\r\n  private final Orders orders;\r\n  private final OrderService ownership;\r\n  private final PaymentClient client;\r\n  private final JdbcTemplate db;\r\n\r\n  public PaymentService(\r\n      Orders orders, OrderService ownership, PaymentClient client, JdbcTemplate db) {\r\n    this.orders = orders;\r\n    this.ownership = ownership;\r\n    this.client = client;\r\n    this.db = db;\r\n  }\r\n\r\n  @Transactional\r\n  public PaymentClient.Checkout checkout(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var order = orders.lock(id).orElseThrow();\r\n    if (!order.status.equals(\"PENDING\")) throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n    if (order.checkoutUrl != null)\r\n      return new PaymentClient.Checkout(order.checkoutId, order.checkoutUrl);\r\n    var checkout = client.checkout(order);\r\n    order.checkoutId = checkout.id();\r\n    order.checkoutUrl = checkout.url();\r\n    return checkout;\r\n  }\r\n\r\n  @Transactional\r\n  public void paid(\r\n      String eventId, Long id, String session, String intent, long amount, String currency) {\r\n    var order = orders.lock(id).orElseThrow();\r\n    if (!db.queryForList(\"select id from payment_event where id=?\", String.class, eventId)\r\n        .isEmpty()) return;\r\n    if (!session.equals(order.checkoutId) || amount != order.totalCents || !currency.equals(\"usd\"))\r\n      throw new ResponseStatusException(HttpStatus.CONFLICT, \"Payment details do not match order\");\r\n    if (!order.status.equals(\"PENDING\") && !order.status.equals(\"PAID\"))\r\n      throw new ResponseStatusException(\r\n          HttpStatus.CONFLICT, \"Reconcile payment for cancelled order\");\r\n    db.update(\"insert into payment_event values (?)\", eventId);\r\n    order.paymentId = intent;\r\n    order.status = \"PAID\";\r\n  }\r\n\r\n  @Transactional\r\n  public PurchaseOrder reconcile(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (o.status.equals(\"PENDING\") && o.checkoutId != null) {\r\n      var r = client.session(o.checkoutId);\r\n      if (\"paid\".equals(r.get(\"payment_status\")))\r\n        paid(\r\n            \"reconcile-\" + o.checkoutId,\r\n            id,\r\n            o.checkoutId,\r\n            String.valueOf(r.get(\"payment_intent\")),\r\n            ((Number) r.get(\"amount_total\")).longValue(),\r\n            String.valueOf(r.get(\"currency\")));\r\n    } else if (o.status.equals(\"REFUND_PENDING\")) {\r\n      var r = client.refundStatus(o.refundId);\r\n      if (\"succeeded\".equals(r.get(\"status\"))) o.status = \"REFUNDED\";\r\n    }\r\n    return o;\r\n  }\r\n\r\n  @Transactional\r\n  public Map<?, ?> refund(Long id, String owner) {\r\n    ownership.owned(id, owner);\r\n    var o = orders.lock(id).orElseThrow();\r\n    if (!o.status.equals(\"PAID\")) throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n    var result = client.refund(id, o.paymentId);\r\n    o.refundId = String.valueOf(result.get(\"id\"));\r\n    o.status = \"REFUND_PENDING\";\r\n    return result;\r\n  }\r\n}\r\n",
            "sha256": "e04c49e4ee23b1a588b81f8b8cd5d290f9a09aeb0d66b93760e297e8e909122b"
          }
        ]
      },
      {
        "heading": "Reconcile missing notifications",
        "paragraphs": [
          "Persist the provider object ID when creating checkout or charge. POST /api/v1/orders/{id}/reconcile queries the stored Checkout Session or pending refund. It applies the same amount/currency/session checks for a paid session and confirms REFUNDED only when the refund status is succeeded. Schedule this operation through a bounded worker for automated reconciliation. Do not search by amount alone."
        ]
      },
      {
        "heading": "Adapt the participant contract",
        "paragraphs": [
          "Replace the fixture charge/refund operations with a durable provider-operation record: operation key, request fingerprint, provider reference, pending/final state and last checked time. Return unknown while settlement is pending. Keep provider HTTP outside a long database transaction."
        ]
      },
      {
        "heading": "Test delayed evidence",
        "paragraphs": [
          "Use Stripe CLI test forwarding to deliver a completion twice, then restart the consumer. Inspect one PAID transition. The supplied commerce integration handles immediate checkout completion; adding delayed payment event types must preserve these checks."
        ],
        "exercise": "Test the supplied reconciliation endpoint with a local HTTP stub reporting a paid session, then a pending and succeeded refund. Verify that an amount mismatch is rejected."
      }
    ]
  },
  {
    "slug": "sbc_dist_16",
    "number": 16,
    "group": "distributed",
    "title": "Concurrency, Ordering and Reservation Expiry",
    "intro": "Now an old event arrives after a reservation was released. We must reject stale work instead of recreating stock ownership.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Check state and version",
        "paragraphs": [
          "Participant locks its effect row and checks legal transitions. An optional expectedVersion rejects commands based on an older revision. A repeated request for the same state is idempotent; a request reversing a terminal transition is rejected."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Participant.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.transaction.annotation.Transactional;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\n@RequestMapping(\"/effects\")\r\npublic class Participant {\r\n  private final JdbcTemplate db;\r\n  private final String role;\r\n\r\n  public Participant(JdbcTemplate db, @Value(\"${node.role}\") String role) {\r\n    this.db = db;\r\n    this.role = role;\r\n  }\r\n\r\n  public record Command(String id, String action, boolean fail, long expectedVersion) {}\r\n\r\n  @PostMapping\r\n  @Transactional\r\n  public Map<String, Object> apply(@RequestBody Command c) {\r\n    if (!Set.of(\"inventory\", \"payment\").contains(role))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Run a participant role\");\r\n    String key = role + \":\" + c.id();\r\n    var existing = db.queryForList(\"select * from effect where id=? for update\", key);\r\n    String target =\r\n        switch (c.action()) {\r\n          case \"reserve\" -> \"RESERVED\";\r\n          case \"commit\" -> \"COMMITTED\";\r\n          case \"release\" -> \"RELEASED\";\r\n          case \"charge\" -> \"CHARGED\";\r\n          case \"refund\" -> \"REFUNDED\";\r\n          default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n        };\r\n    if (role.equals(\"inventory\") && !Set.of(\"reserve\", \"commit\", \"release\").contains(c.action())\r\n        || role.equals(\"payment\") && !Set.of(\"charge\", \"refund\").contains(c.action()))\r\n      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n    if (existing.isEmpty()) {\r\n      if (!Set.of(\"reserve\", \"charge\").contains(c.action()))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT);\r\n      db.update(\r\n          \"insert into effect values (?,?,0,?)\",\r\n          key,\r\n          c.fail() ? \"DECLINED\" : target,\r\n          System.currentTimeMillis() + 60000);\r\n    } else {\r\n      String state = (String) existing.getFirst().get(\"STATE\");\r\n      long version = ((Number) existing.getFirst().get(\"VERSION\")).longValue();\r\n      if (state.equals(target)) return Map.of(\"state\", state, \"version\", version);\r\n      if (state.equals(\"DECLINED\")) return Map.of(\"state\", state, \"version\", version);\r\n      if (c.expectedVersion() >= 0 && version != c.expectedVersion())\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Stale version\");\r\n      if (!(state.equals(\"RESERVED\") && Set.of(\"commit\", \"release\").contains(c.action())\r\n          || state.equals(\"CHARGED\") && c.action().equals(\"refund\")))\r\n        throw new ResponseStatusException(HttpStatus.CONFLICT, \"Illegal or stale transition\");\r\n      db.update(\"update effect set state=?,version=version+1 where id=?\", target, key);\r\n    }\r\n    return db.queryForMap(\"select state,version from effect where id=?\", key);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public List<Map<String, Object>> status(@PathVariable String id) {\r\n    return db.queryForList(\"select * from effect where id=?\", role + \":\" + id);\r\n  }\r\n}\r\n",
            "sha256": "3dd834d8eb2a93dac072f861e80ccda0e8063559d743241e23b5e82caad9450b"
          },
          {
            "path": "workflow/src/test/java/hub/workflow/WorkflowTest.java",
            "text": "package hub.workflow;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\n\r\nimport org.junit.jupiter.api.*;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"workflow.secret=test-only-long-secret\",\r\n      \"spring.datasource.url=jdbc:h2:mem:workflow;DB_CLOSE_DELAY=-1\",\r\n      \"node.role=inventory\"\r\n    })\r\nclass WorkflowTest {\r\n  @Autowired Participant participant;\r\n  @Autowired JdbcTemplate db;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from effect\");\r\n  }\r\n\r\n  @Test\r\n  void duplicateReserveDoesNotCreateAnotherEffect() {\r\n    for (int i = 0; i < 2; i++)\r\n      participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertEquals(1, db.queryForObject(\"select count(*) from effect\", Integer.class));\r\n  }\r\n\r\n  @Test\r\n  void staleCommandCannotReverseRelease() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    participant.apply(new Participant.Command(\"a\", \"release\", false, -1));\r\n    assertThrows(\r\n        Exception.class,\r\n        () -> participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1)));\r\n  }\r\n\r\n  @Test\r\n  void versionRejectsConcurrentChange() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertThrows(\r\n        Exception.class, () -> participant.apply(new Participant.Command(\"a\", \"commit\", false, 2)));\r\n  }\r\n}\r\n",
            "sha256": "ea5baa37c99bc1feec1636239e34591f87ea6c7003e442bafcbf8d866d4bfba3"
          }
        ]
      },
      {
        "heading": "Track event meaning",
        "paragraphs": [
          "Event IDs deduplicate delivery. Aggregate revisions detect stale updates. Timestamps alone do not reliably order events across machines. The fixture uses legal-state checks; a larger multi-update aggregate should carry explicit revisions."
        ]
      },
      {
        "heading": "Handle reservation expiry carefully",
        "paragraphs": [
          "The fixture stores expires_at as a teaching field. It does not automatically release reservations while payment may have succeeded. A real expiry worker must coordinate with workflow/payment state, use a compare-and-set transition and reconcile late payment evidence."
        ]
      },
      {
        "heading": "Do not oversell the inventory fixture",
        "paragraphs": [
          "The participant models one reservation record per workflow. It is not a complete stock ledger. For quantity-based stock, add an atomic availability decrement, a unique reservation key and a matching release operation."
        ],
        "exercise": "Deliver reserve after release and assert rejection. Then design an expiry race test involving a payment success arriving at the deadline."
      }
    ]
  },
  {
    "slug": "sbc_dist_17",
    "number": 17,
    "group": "distributed",
    "title": "Tracing a Distributed Workflow",
    "intro": "Now we will follow one order across all three processes. A stack trace in Order cannot explain work already running in Payment.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Propagate a correlation ID",
        "paragraphs": [
          "WorkflowController accepts or creates an ID and stores it with the workflow. Orchestrator passes it in X-Correlation-ID, and BrokerFlow carries it in event payloads. Logs include order, phase and attempt."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/WorkflowController.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.web.bind.annotation.*;\r\nimport org.springframework.web.server.ResponseStatusException;\r\n\r\n@RestController\r\n@RequestMapping(\"/workflows\")\r\npublic class WorkflowController {\r\n  private final WorkflowStore store;\r\n  private final JdbcTemplate db;\r\n  private final String role;\r\n\r\n  public WorkflowController(\r\n      WorkflowStore store, JdbcTemplate db, @Value(\"${node.role}\") String role) {\r\n    this.store = store;\r\n    this.db = db;\r\n    this.role = role;\r\n  }\r\n\r\n  public record Start(String id, boolean failPayment, boolean failConfirm) {}\r\n\r\n  @PostMapping\r\n  public Map<String, Object> start(\r\n      @RequestBody Start r,\r\n      @RequestHeader(value = \"X-Correlation-ID\", required = false) String correlation) {\r\n    if (!role.equals(\"order\")) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);\r\n    String id = UUID.fromString(r.id()).toString();\r\n    store.create(\r\n        id,\r\n        r.failPayment(),\r\n        r.failConfirm(),\r\n        correlation == null ? UUID.randomUUID().toString() : correlation);\r\n    return store.get(id);\r\n  }\r\n\r\n  @GetMapping(\"/{id}\")\r\n  public Map<String, Object> status(@PathVariable String id) {\r\n    return store.get(id);\r\n  }\r\n\r\n  @GetMapping(\"/{id}/events\")\r\n  public List<Map<String, Object>> events(@PathVariable String id) {\r\n    return db.queryForList(\"select * from outbox where order_id=?\", id);\r\n  }\r\n}\r\n",
            "sha256": "7f90bb3a20d6c32c193e26c27da2d1372fc89bc7f0adb7e444d1170761b9cef3"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/BrokerFlow.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.concurrent.TimeUnit;\r\nimport org.springframework.amqp.core.*;\r\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\r\nimport org.springframework.amqp.rabbit.connection.CorrelationData;\r\nimport org.springframework.amqp.rabbit.core.RabbitTemplate;\r\nimport org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.context.annotation.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Configuration\r\n@Profile(\"broker\")\r\npublic class BrokerFlow {\r\n  @Bean\r\n  TopicExchange exchange() {\r\n    return new TopicExchange(\"checkout.events\", true, false);\r\n  }\r\n\r\n  @Bean\r\n  Queue incoming(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role)\r\n        .deadLetterExchange(\"\")\r\n        .deadLetterRoutingKey(\"checkout.\" + role + \".dead\")\r\n        .build();\r\n  }\r\n\r\n  @Bean\r\n  Queue dead(@Value(\"${node.role}\") String role) {\r\n    return QueueBuilder.durable(\"checkout.\" + role + \".dead\").build();\r\n  }\r\n\r\n  @Bean\r\n  Binding binding(Queue incoming, TopicExchange exchange) {\r\n    return BindingBuilder.bind(incoming).to(exchange).with(\"#\");\r\n  }\r\n\r\n  @Bean\r\n  Jackson2JsonMessageConverter json() {\r\n    return new Jackson2JsonMessageConverter();\r\n  }\r\n\r\n  @Bean\r\n  Relay relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n    return new Relay(db, rabbit);\r\n  }\r\n\r\n  @Bean\r\n  Handler handler(\r\n      JdbcTemplate db,\r\n      Participant participant,\r\n      WorkflowStore store,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode) {\r\n    return new Handler(db, participant, store, role, mode);\r\n  }\r\n\r\n  public record Event(\r\n      String id,\r\n      String orderId,\r\n      String kind,\r\n      String correlation,\r\n      boolean failPayment,\r\n      boolean failConfirm) {}\r\n\r\n  public static class Relay {\r\n    private final JdbcTemplate db;\r\n    private final RabbitTemplate rabbit;\r\n\r\n    Relay(JdbcTemplate db, RabbitTemplate rabbit) {\r\n      this.db = db;\r\n      this.rabbit = rabbit;\r\n    }\r\n\r\n    @Scheduled(fixedDelay = 1000)\r\n    public void publish() {\r\n      for (var row : db.queryForList(\"select * from outbox where sent=false\")) {\r\n        String id = (String) row.get(\"ID\"), order = (String) row.get(\"ORDER_ID\");\r\n        var flow = db.queryForList(\"select * from workflow where id=?\", order);\r\n        boolean fp = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_PAYMENT\"),\r\n            fc = !flow.isEmpty() && (Boolean) flow.getFirst().get(\"FAIL_CONFIRM\");\r\n        var correlation = new CorrelationData(id);\r\n        try {\r\n          rabbit.convertAndSend(\r\n              \"checkout.events\",\r\n              (String) row.get(\"KIND\"),\r\n              new Event(\r\n                  id, order, (String) row.get(\"KIND\"), (String) row.get(\"CORRELATION\"), fp, fc),\r\n              correlation);\r\n          var confirm = correlation.getFuture().get(3, TimeUnit.SECONDS);\r\n          if (confirm.isAck() && correlation.getReturned() == null)\r\n            db.update(\"update outbox set sent=true where id=?\", id);\r\n        } catch (Exception retryLater) {\r\n          System.err.println(\"Outbox pending: \" + id);\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  public static class Handler {\r\n    private final JdbcTemplate db;\r\n    private final Participant participant;\r\n    private final WorkflowStore store;\r\n    private final String role, mode;\r\n\r\n    Handler(\r\n        JdbcTemplate db, Participant participant, WorkflowStore store, String role, String mode) {\r\n      this.db = db;\r\n      this.participant = participant;\r\n      this.store = store;\r\n      this.role = role;\r\n      this.mode = mode;\r\n    }\r\n\r\n    @RabbitListener(queues = \"#{incoming.name}\")\r\n    @Transactional\r\n    public void receive(Event e) {\r\n      if (!mode.equals(\"choreography\")) return;\r\n      if (!db.queryForList(\"select id from inbox where id=?\", String.class, e.id()).isEmpty())\r\n        return;\r\n      db.update(\"insert into inbox values (?)\", e.id());\r\n      String next = null;\r\n      if (role.equals(\"inventory\")) {\r\n        switch (e.kind()) {\r\n          case \"OrderCreated\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"reserve\", false, -1));\r\n            next = \"StockReserved\";\r\n          }\r\n          case \"PaymentDeclined\", \"PaymentRefunded\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"release\", false, -1));\r\n            next = \"StockReleased\";\r\n          }\r\n          case \"CommitRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"commit\", false, -1));\r\n            next = \"StockCommitted\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"payment\")) {\r\n        switch (e.kind()) {\r\n          case \"StockReserved\" -> {\r\n            var result =\r\n                participant.apply(\r\n                    new Participant.Command(e.orderId(), \"charge\", e.failPayment(), -1));\r\n            Object state = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n            next = \"DECLINED\".equals(state) ? \"PaymentDeclined\" : \"PaymentCharged\";\r\n          }\r\n          case \"RefundRequested\" -> {\r\n            participant.apply(new Participant.Command(e.orderId(), \"refund\", false, -1));\r\n            next = \"PaymentRefunded\";\r\n          }\r\n        }\r\n      }\r\n      if (role.equals(\"order\")) {\r\n        String phase = (String) store.get(e.orderId()).get(\"PHASE\");\r\n        if (phase.equals(\"COMPLETED\") || phase.equals(\"CANCELLED\")) return;\r\n        switch (e.kind()) {\r\n          case \"PaymentCharged\" -> {\r\n            store.transition(\r\n                e.orderId(), phase, e.failConfirm() ? \"REFUNDING\" : \"CHARGED\", e.correlation());\r\n            next = e.failConfirm() ? \"RefundRequested\" : \"CommitRequested\";\r\n          }\r\n          case \"StockCommitted\" ->\r\n              store.transition(e.orderId(), phase, \"COMPLETED\", e.correlation());\r\n          case \"StockReleased\" ->\r\n              store.transition(e.orderId(), phase, \"CANCELLED\", e.correlation());\r\n        }\r\n      }\r\n      if (next != null) {\r\n        if (!role.equals(\"order\")\r\n            && db.queryForList(\"select id from workflow where id=?\", String.class, e.orderId())\r\n                .isEmpty())\r\n          db.update(\r\n              \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n              e.orderId(),\r\n              e.failPayment(),\r\n              e.failConfirm(),\r\n              e.correlation());\r\n        store.event(e.orderId(), next, e.correlation());\r\n      }\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "fae5da9307d849f60fc75628106b3cbcba61d80e905b7d632bf923b1bf68f340"
          }
        ]
      },
      {
        "heading": "Add spans to the correlation",
        "paragraphs": [
          "The explicit ID is searchable context, not a full trace. Add Micrometer tracing and a collector/exporter, use instrumented client builders and propagate trace headers across HTTP and message boundaries. Keep business workflow IDs separate from span IDs."
        ]
      },
      {
        "heading": "Watch stuck work",
        "paragraphs": [
          "Track age of pending workflows, outbox backlog, retry counts, manual-review count and refund delay. Do not attach each order ID as a metric label. Use logs or traces to investigate one order."
        ]
      },
      {
        "heading": "Investigate a real scenario",
        "paragraphs": [
          "Submit a workflow with X-Correlation-ID: checkout-demo-1, stop Payment, then search coordinator logs for that ID. Explain the phase and the next retry time."
        ],
        "exercise": "Add a collector and capture the reserve and charge calls under one trace. Include trace context in the event envelope when using RabbitMQ."
      }
    ]
  },
  {
    "slug": "sbc_dist_18",
    "number": 18,
    "group": "distributed",
    "title": "Testing Distributed Failures",
    "intro": "Now we will deliberately break checkout. A workflow that only passes the happy path has not demonstrated recovery.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Test the participant rules",
        "paragraphs": [
          "WorkflowTest covers repeated reserve, stale reverse transitions and version conflicts. CommerceTest covers signed duplicate payment events and ownership. These tests protect local invariants."
        ],
        "files": [
          {
            "path": "workflow/src/test/java/hub/workflow/WorkflowTest.java",
            "text": "package hub.workflow;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\n\r\nimport org.junit.jupiter.api.*;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"workflow.secret=test-only-long-secret\",\r\n      \"spring.datasource.url=jdbc:h2:mem:workflow;DB_CLOSE_DELAY=-1\",\r\n      \"node.role=inventory\"\r\n    })\r\nclass WorkflowTest {\r\n  @Autowired Participant participant;\r\n  @Autowired JdbcTemplate db;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from effect\");\r\n  }\r\n\r\n  @Test\r\n  void duplicateReserveDoesNotCreateAnotherEffect() {\r\n    for (int i = 0; i < 2; i++)\r\n      participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertEquals(1, db.queryForObject(\"select count(*) from effect\", Integer.class));\r\n  }\r\n\r\n  @Test\r\n  void staleCommandCannotReverseRelease() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    participant.apply(new Participant.Command(\"a\", \"release\", false, -1));\r\n    assertThrows(\r\n        Exception.class,\r\n        () -> participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1)));\r\n  }\r\n\r\n  @Test\r\n  void versionRejectsConcurrentChange() {\r\n    participant.apply(new Participant.Command(\"a\", \"reserve\", false, -1));\r\n    assertThrows(\r\n        Exception.class, () -> participant.apply(new Participant.Command(\"a\", \"commit\", false, 2)));\r\n  }\r\n}\r\n",
            "sha256": "ea5baa37c99bc1feec1636239e34591f87ea6c7003e442bafcbf8d866d4bfba3"
          },
          {
            "path": "commerce/src/test/java/hub/commerce/CommerceTest.java",
            "text": "package hub.commerce;\r\n\r\nimport static org.junit.jupiter.api.Assertions.*;\r\nimport static org.mockito.Mockito.*;\r\nimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;\r\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;\r\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;\r\n\r\nimport java.util.*;\r\nimport javax.crypto.Mac;\r\nimport javax.crypto.spec.SecretKeySpec;\r\nimport org.junit.jupiter.api.*;\r\nimport org.mockito.ArgumentCaptor;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\r\nimport org.springframework.boot.test.context.SpringBootTest;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.mail.SimpleMailMessage;\r\nimport org.springframework.mail.javamail.JavaMailSender;\r\nimport org.springframework.test.context.bean.override.mockito.MockitoBean;\r\nimport org.springframework.test.web.servlet.MockMvc;\r\n\r\n@SpringBootTest(\r\n    properties = {\r\n      \"spring.datasource.url=jdbc:h2:mem:commerce-tests;DB_CLOSE_DELAY=-1\",\r\n      \"payment.key=sk_test_fixture\",\r\n      \"payment.webhook-secret=whsec_fixture\",\r\n      \"management.health.mail.enabled=false\"\r\n    })\r\n@AutoConfigureMockMvc\r\nclass CommerceTest {\r\n  @Autowired MockMvc mvc;\r\n  @Autowired AuthService auth;\r\n  @Autowired JdbcTemplate db;\r\n  @Autowired Orders orders;\r\n  @MockitoBean JavaMailSender mail;\r\n  @MockitoBean PaymentClient payment;\r\n\r\n  @BeforeEach\r\n  void clean() {\r\n    db.update(\"delete from payment_event\");\r\n    db.update(\"delete from auth_token\");\r\n    db.update(\"delete from account\");\r\n    orders.deleteAll();\r\n    reset(mail, payment);\r\n  }\r\n\r\n  @Test\r\n  void invalidOrderReturnsFields() throws Exception {\r\n    mvc.perform(\r\n            post(\"/api/v1/orders\")\r\n                .with(user(\"learner@example.test\"))\r\n                .contentType(\"application/json\")\r\n                .content(\"{\\\"product\\\":\\\"\\\",\\\"quantity\\\":0}\"))\r\n        .andExpect(status().isBadRequest())\r\n        .andExpect(jsonPath(\"$.errors\").isArray());\r\n  }\r\n\r\n  @Test\r\n  void ownerCannotReadAnotherOrder() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void staleCancellationReturnsConflict() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 1));\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/cancel?version=99\").with(user(\"alice\")))\r\n        .andExpect(status().isConflict());\r\n    assertEquals(\"PENDING\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  String register() {\r\n    auth.register(\"learner@example.test\", \"very-long-password\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String text = c.getValue().getText();\r\n    return text.substring(text.indexOf(\"token: \") + 7);\r\n  }\r\n\r\n  @Test\r\n  void verifyRefreshLogoutAndReset() {\r\n    String token = register();\r\n    assertThrows(Exception.class, () -> auth.login(\"learner@example.test\", \"very-long-password\"));\r\n    auth.verify(token);\r\n    var first = auth.login(\"learner@example.test\", \"very-long-password\");\r\n    assertEquals(\"learner@example.test\", auth.authenticate(first.accessToken()));\r\n    var second = auth.refresh(first.refreshToken());\r\n    assertNull(auth.authenticate(first.accessToken()));\r\n    assertThrows(Exception.class, () -> auth.refresh(first.refreshToken()));\r\n    auth.logout(second.refreshToken());\r\n    assertNull(auth.authenticate(second.accessToken()));\r\n    reset(mail);\r\n    auth.requestReset(\"learner@example.test\");\r\n    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);\r\n    verify(mail).send(c.capture());\r\n    String body = c.getValue().getText();\r\n    auth.reset(body.substring(body.indexOf(\"token: \") + 7), \"another-long-password\");\r\n    assertNotNull(auth.login(\"learner@example.test\", \"another-long-password\"));\r\n  }\r\n\r\n  @Test\r\n  void signedWebhookIsIdempotent() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.checkoutId = \"cs_fixture\";\r\n    o = orders.save(o);\r\n    String body =\r\n        \"{\\\"id\\\":\\\"evt_1\\\",\\\"type\\\":\\\"checkout.session.completed\\\",\\\"data\\\":{\\\"object\\\":{\\\"id\\\":\\\"cs_fixture\\\",\\\"payment_status\\\":\\\"paid\\\",\\\"payment_intent\\\":\\\"pi_fixture\\\",\\\"amount_total\\\":2500,\\\"currency\\\":\\\"usd\\\",\\\"metadata\\\":{\\\"orderId\\\":\\\"\"\r\n            + o.id\r\n            + \"\\\"}}}}\";\r\n    long time = java.time.Instant.now().getEpochSecond();\r\n    var mac = Mac.getInstance(\"HmacSHA256\");\r\n    mac.init(new SecretKeySpec(\"whsec_fixture\".getBytes(), \"HmacSHA256\"));\r\n    String signature =\r\n        \"t=\"\r\n            + time\r\n            + \",v1=\"\r\n            + HexFormat.of().formatHex(mac.doFinal((time + \".\" + body).getBytes()));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(\r\n              post(\"/webhooks/stripe\")\r\n                  .header(\"Stripe-Signature\", signature)\r\n                  .contentType(\"application/json\")\r\n                  .content(body))\r\n          .andExpect(status().isOk());\r\n    assertEquals(\"PAID\", orders.findById(o.id).orElseThrow().status);\r\n    assertEquals(1, db.queryForObject(\"select count(*) from payment_event\", Integer.class));\r\n    mvc.perform(post(\"/webhooks/stripe\").header(\"Stripe-Signature\", \"invalid\").content(body))\r\n        .andExpect(status().isBadRequest());\r\n  }\r\n\r\n  @Test\r\n  void checkoutUsesServerAmountAndReusesSession() throws Exception {\r\n    var o = orders.save(new PurchaseOrder(\"alice\", \"Book\", 2));\r\n    when(payment.checkout(any()))\r\n        .thenReturn(new PaymentClient.Checkout(\"cs_test\", \"https://checkout.stripe.com/test\"));\r\n    for (int i = 0; i < 2; i++)\r\n      mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/checkout\").with(user(\"alice\")))\r\n          .andExpect(status().isOk());\r\n    verify(payment, times(1)).checkout(any());\r\n  }\r\n\r\n  @Test\r\n  void detailFetchAndRefundReconciliation() throws Exception {\r\n    var o = new PurchaseOrder(\"alice\", \"Book\", 1);\r\n    o.status = \"PAID\";\r\n    o.paymentId = \"pi_fixture\";\r\n    o = orders.save(o);\r\n    mvc.perform(get(\"/api/v1/orders/\" + o.id + \"/detail\").with(user(\"alice\")))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.lines[0].product\").value(\"Book\"));\r\n    doReturn(Map.of(\"id\", \"re_fixture\", \"status\", \"pending\"))\r\n        .when(payment)\r\n        .refund(o.id, \"pi_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/refund\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUND_PENDING\", orders.findById(o.id).orElseThrow().status);\r\n    doReturn(Map.of(\"status\", \"succeeded\")).when(payment).refundStatus(\"re_fixture\");\r\n    mvc.perform(post(\"/api/v1/orders/\" + o.id + \"/reconcile\").with(user(\"alice\")))\r\n        .andExpect(status().isOk());\r\n    assertEquals(\"REFUNDED\", orders.findById(o.id).orElseThrow().status);\r\n  }\r\n\r\n  @Test\r\n  void pdfUploadCannotBeReadByAnotherUser() throws Exception {\r\n    var upload =\r\n        new org.springframework.mock.web.MockMultipartFile(\r\n            \"file\", \"a.pdf\", \"application/pdf\", \"%PDF-fixture\".getBytes());\r\n    String response =\r\n        mvc.perform(multipart(\"/api/v1/files\").file(upload).with(user(\"alice\")))\r\n            .andExpect(status().isOk())\r\n            .andReturn()\r\n            .getResponse()\r\n            .getContentAsString();\r\n    String id =\r\n        new com.fasterxml.jackson.databind.ObjectMapper().readTree(response).get(\"id\").asText();\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"alice\"))).andExpect(status().isOk());\r\n    mvc.perform(get(\"/api/v1/files/\" + id).with(user(\"bob\"))).andExpect(status().isNotFound());\r\n  }\r\n\r\n  @Test\r\n  void openApiAndMissingAuthentication() throws Exception {\r\n    mvc.perform(get(\"/v3/api-docs\"))\r\n        .andExpect(status().isOk())\r\n        .andExpect(jsonPath(\"$.paths['/api/v1/orders']\").exists());\r\n    mvc.perform(get(\"/api/v1/orders\")).andExpect(status().isUnauthorized());\r\n  }\r\n}\r\n",
            "sha256": "78434dc716cdb9970827f61365db92f6c802090e2ec11ffe8cc07f4a1ba604f3"
          }
        ]
      },
      {
        "heading": "Test real processes",
        "paragraphs": [
          "The continuation verifier starts three Java processes with separate database paths. It checks success, decline and compensation, and restarts the coordinator during pending work. This exercises HTTP boundaries without claiming RabbitMQ or Stripe was available."
        ]
      },
      {
        "heading": "Build a failure matrix",
        "paragraphs": [
          "Test a crash before local commit, after local commit but before response, after broker confirm but before sent marking, and after consumer commit but before acknowledgement. Write the invariant expected in each case."
        ]
      },
      {
        "heading": "Add external integration tests",
        "paragraphs": [
          "Docker is required to run RabbitMQ and PostgreSQL/Testcontainers here. Stripe sandbox tests need your own test account. Keep those results separate from fixture-based tests."
        ],
        "exercise": "Add an automated lost-response-after-charge test and assert exactly one stored charge effect."
      }
    ]
  },
  {
    "slug": "sbc_dist_19",
    "number": 19,
    "group": "distributed",
    "title": "Durable Workflow Engines",
    "intro": "Now we will compare our custom database-driven coordinator with a dedicated workflow engine. The business rules stay; the infrastructure responsibilities change.",
    "module": "workflow",
    "sections": [
      {
        "heading": "What does an engine provide?",
        "paragraphs": [
          "A durable engine records workflow history and schedules retries/timers across worker restarts. Activities still need idempotency because an activity can complete remotely before its acknowledgement reaches the engine."
        ]
      },
      {
        "heading": "Read the Temporal example",
        "paragraphs": [
          "The optional temporal module defines a workflow interface, activity interface, implementation and worker. Each activity delegates to the same HTTP participant contract. A stable workflow ID becomes the operation key."
        ],
        "files": [
          {
            "path": "temporal/src/main/java/hub/temporal/CheckoutWorkflow.java",
            "text": "package hub.temporal;\r\n\r\nimport io.temporal.workflow.*;\r\n\r\n@WorkflowInterface\r\npublic interface CheckoutWorkflow {\r\n  @WorkflowMethod\r\n  String checkout(String orderId, boolean decline);\r\n}\r\n",
            "sha256": "edc181b61d50c68bfa9fd323fd0b4e88d2791db6b359826ddd50650a393b456a"
          },
          {
            "path": "temporal/src/main/java/hub/temporal/CheckoutActivities.java",
            "text": "package hub.temporal;\r\n\r\nimport io.temporal.activity.*;\r\n\r\n@ActivityInterface\r\npublic interface CheckoutActivities {\r\n  void reserve(String id);\r\n\r\n  String charge(String id, boolean decline);\r\n\r\n  void release(String id);\r\n\r\n  void commit(String id);\r\n}\r\n",
            "sha256": "fc312e16d2835a1f2a3d1020f01220e1c5c820c31c7ac447e8e68355891e8efb"
          },
          {
            "path": "temporal/src/main/java/hub/temporal/CheckoutWorkflowImpl.java",
            "text": "package hub.temporal;\r\n\r\nimport io.temporal.activity.ActivityOptions;\r\nimport io.temporal.common.RetryOptions;\r\nimport io.temporal.workflow.Workflow;\r\nimport java.time.Duration;\r\n\r\npublic class CheckoutWorkflowImpl implements CheckoutWorkflow {\r\n  private final CheckoutActivities activities =\r\n      Workflow.newActivityStub(\r\n          CheckoutActivities.class,\r\n          ActivityOptions.newBuilder()\r\n              .setStartToCloseTimeout(Duration.ofSeconds(5))\r\n              .setRetryOptions(RetryOptions.newBuilder().setMaximumAttempts(5).build())\r\n              .build());\r\n\r\n  public String checkout(String id, boolean decline) {\r\n    activities.reserve(id);\r\n    String result = activities.charge(id, decline);\r\n    if (result.equals(\"DECLINED\")) {\r\n      activities.release(id);\r\n      return \"CANCELLED\";\r\n    }\r\n    activities.commit(id);\r\n    return \"COMPLETED\";\r\n  }\r\n}\r\n",
            "sha256": "a6d67c3b003969cc984f0a72dc09055472f46638bbda240c412a63dda1f85860"
          },
          {
            "path": "temporal/src/main/java/hub/temporal/WorkerMain.java",
            "text": "package hub.temporal;\r\n\r\nimport io.temporal.client.WorkflowClient;\r\nimport io.temporal.serviceclient.WorkflowServiceStubs;\r\nimport io.temporal.worker.WorkerFactory;\r\n\r\npublic class WorkerMain {\r\n  public static void main(String[] args) {\r\n    String secret = System.getenv(\"WORKFLOW_SECRET\");\r\n    if (secret == null || secret.length() < 16)\r\n      throw new IllegalArgumentException(\"Set WORKFLOW_SECRET first\");\r\n    var service = WorkflowServiceStubs.newLocalServiceStubs();\r\n    var client = WorkflowClient.newInstance(service);\r\n    var factory = WorkerFactory.newInstance(client);\r\n    var worker = factory.newWorker(\"checkout\");\r\n    worker.registerWorkflowImplementationTypes(CheckoutWorkflowImpl.class);\r\n    worker.registerActivitiesImplementations(\r\n        new ParticipantActivities(secret, \"http://localhost:8101\", \"http://localhost:8102\"));\r\n    factory.start();\r\n  }\r\n}\r\n",
            "sha256": "8230f0c9447bd9926a751d16dc8e9219551ab41c8a884179f3a433ab8fa04ac9"
          }
        ]
      },
      {
        "heading": "Keep workflow code deterministic",
        "paragraphs": [
          "Use workflow APIs for time and timers. Put HTTP, random external state and database work in activities. Version code changes for running histories rather than deploying incompatible workflow logic."
        ]
      },
      {
        "heading": "Run locally when ready",
        "paragraphs": [
          "Start a local Temporal development server on 7233, start WorkerMain, then start a workflow with the supplied ClientMain. This needs a local Temporal server, not a cloud login. The custom HTTP coordinator should be disabled for the same workflow ID."
        ],
        "exercise": "Restart the worker after reserve. Observe replay and verify that retrying charge uses the same operation key."
      }
    ]
  },
  {
    "slug": "sbc_dist_20",
    "number": 20,
    "group": "distributed",
    "title": "Complete Distributed Checkout",
    "intro": "Now we will demonstrate the whole workflow and explain its outcome from durable records, rather than relying on the final HTTP response alone.",
    "module": "workflow",
    "sections": [
      {
        "heading": "Run the success scenario",
        "paragraphs": [
          "Start Inventory, Payment and Order with one shared local workflow key. POST a fresh workflow UUID with both failure flags false. Poll until COMPLETED. Inventory must be COMMITTED and Payment CHARGED."
        ]
      },
      {
        "heading": "Run the decline scenario",
        "paragraphs": [
          "Submit a new UUID with failPayment=true. Expect Payment DECLINED, Inventory RELEASED and Order CANCELLED. Repeating the start request must not create a second workflow."
        ]
      },
      {
        "heading": "Run compensation and restart",
        "paragraphs": [
          "Submit failConfirm=true and inspect REFUNDED and RELEASED participant states. Then stop Payment, start another order, restart Order, restore Payment and verify recovery with its original database."
        ],
        "files": [
          {
            "path": "workflow/src/main/java/hub/workflow/Orchestrator.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.slf4j.*;\r\nimport org.springframework.beans.factory.annotation.Value;\r\nimport org.springframework.http.client.SimpleClientHttpRequestFactory;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.scheduling.annotation.Scheduled;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.web.client.RestClient;\r\n\r\n@Service\r\npublic class Orchestrator {\r\n  private final JdbcTemplate db;\r\n  private final WorkflowStore store;\r\n  private final RestClient http;\r\n  private final String inventory, payment, role, mode;\r\n  private final Logger log = LoggerFactory.getLogger(getClass());\r\n\r\n  public Orchestrator(\r\n      JdbcTemplate db,\r\n      WorkflowStore store,\r\n      @Value(\"${inventory.url}\") String inventory,\r\n      @Value(\"${payment.url}\") String payment,\r\n      @Value(\"${node.role}\") String role,\r\n      @Value(\"${workflow.mode}\") String mode,\r\n      @Value(\"${workflow.secret}\") String secret) {\r\n    this.db = db;\r\n    this.store = store;\r\n    this.inventory = inventory;\r\n    this.payment = payment;\r\n    this.role = role;\r\n    this.mode = mode;\r\n    var f = new SimpleClientHttpRequestFactory();\r\n    f.setConnectTimeout(500);\r\n    f.setReadTimeout(1000);\r\n    http = RestClient.builder().requestFactory(f).defaultHeader(\"X-Workflow-Key\", secret).build();\r\n  }\r\n\r\n  public String effect(String url, String id, String action, boolean fail, String correlation) {\r\n    Map<?, ?> result =\r\n        http.post()\r\n            .uri(url + \"/effects\")\r\n            .header(\"X-Correlation-ID\", correlation)\r\n            .body(new Participant.Command(id, action, fail, -1))\r\n            .retrieve()\r\n            .body(Map.class);\r\n    Object value = result.containsKey(\"STATE\") ? result.get(\"STATE\") : result.get(\"state\");\r\n    return String.valueOf(value);\r\n  }\r\n\r\n  @Scheduled(fixedDelay = 500)\r\n  public void tick() {\r\n    if (!role.equals(\"order\") || !mode.equals(\"orchestration\")) return;\r\n    for (var row :\r\n        db.queryForList(\r\n            \"select * from workflow where phase not in ('COMPLETED','CANCELLED','MANUAL_REVIEW')\"\r\n                + \" and next_attempt<=?\",\r\n            System.currentTimeMillis())) advance(row);\r\n  }\r\n\r\n  public void advance(Map<String, Object> row) {\r\n    String id = (String) row.get(\"ID\"),\r\n        phase = (String) row.get(\"PHASE\"),\r\n        correlation = (String) row.get(\"CORRELATION\");\r\n    String next = phase;\r\n    try {\r\n      switch (phase) {\r\n        case \"NEW\" -> {\r\n          effect(inventory, id, \"reserve\", false, correlation);\r\n          next = \"RESERVED\";\r\n        }\r\n        case \"RESERVED\" -> {\r\n          String state =\r\n              effect(payment, id, \"charge\", (Boolean) row.get(\"FAIL_PAYMENT\"), correlation);\r\n          next = state.equals(\"DECLINED\") ? \"RELEASING\" : \"CHARGED\";\r\n        }\r\n        case \"CHARGED\" -> {\r\n          if ((Boolean) row.get(\"FAIL_CONFIRM\")) next = \"REFUNDING\";\r\n          else {\r\n            effect(inventory, id, \"commit\", false, correlation);\r\n            next = \"COMPLETED\";\r\n          }\r\n        }\r\n        case \"REFUNDING\" -> {\r\n          effect(payment, id, \"refund\", false, correlation);\r\n          next = \"RELEASING\";\r\n        }\r\n        case \"RELEASING\" -> {\r\n          effect(inventory, id, \"release\", false, correlation);\r\n          next = \"CANCELLED\";\r\n        }\r\n        default -> throw new IllegalStateException(phase);\r\n      }\r\n      store.transition(id, phase, next, correlation);\r\n      log.info(\"correlation={} order={} {} -> {}\", correlation, id, phase, next);\r\n    } catch (Exception failure) {\r\n      int attempts = ((Number) row.get(\"ATTEMPTS\")).intValue() + 1;\r\n      long delay = Math.min(30000, 500L * (1L << Math.min(attempts, 6)));\r\n      db.update(\r\n          \"update workflow set attempts=?,next_attempt=?,phase=? where id=? and phase=?\",\r\n          attempts,\r\n          System.currentTimeMillis() + delay,\r\n          attempts >= 5 ? \"MANUAL_REVIEW\" : phase,\r\n          id,\r\n          phase);\r\n      log.warn(\r\n          \"correlation={} order={} phase={} attempt={} outcome=unknown\",\r\n          correlation,\r\n          id,\r\n          phase,\r\n          attempts);\r\n    }\r\n  }\r\n}\r\n",
            "sha256": "c5d20cc556da6f699b143e1f2b45978889b476c5ec0b19626ea641d4153c6b11"
          },
          {
            "path": "workflow/src/main/java/hub/workflow/WorkflowStore.java",
            "text": "package hub.workflow;\r\n\r\nimport java.util.*;\r\nimport org.springframework.jdbc.core.JdbcTemplate;\r\nimport org.springframework.stereotype.Service;\r\nimport org.springframework.transaction.annotation.Transactional;\r\n\r\n@Service\r\npublic class WorkflowStore {\r\n  private final JdbcTemplate db;\r\n\r\n  public WorkflowStore(JdbcTemplate db) {\r\n    this.db = db;\r\n  }\r\n\r\n  @Transactional\r\n  public String create(String id, boolean failPayment, boolean failConfirm, String correlation) {\r\n    if (db.queryForList(\"select id from workflow where id=?\", String.class, id).isEmpty()) {\r\n      db.update(\r\n          \"insert into workflow values (?,'NEW',0,0,?,?,?)\",\r\n          id,\r\n          failPayment,\r\n          failConfirm,\r\n          correlation);\r\n      event(id, \"OrderCreated\", correlation);\r\n    }\r\n    return id;\r\n  }\r\n\r\n  public void event(String id, String kind, String correlation) {\r\n    db.update(\r\n        \"insert into outbox values (?,?,?,false,?)\",\r\n        UUID.randomUUID().toString(),\r\n        id,\r\n        kind,\r\n        correlation);\r\n  }\r\n\r\n  @Transactional\r\n  public void transition(String id, String expected, String next, String correlation) {\r\n    if (db.update(\r\n            \"update workflow set phase=?,attempts=0,next_attempt=0 where id=? and phase=?\",\r\n            next,\r\n            id,\r\n            expected)\r\n        == 1) event(id, next, correlation);\r\n  }\r\n\r\n  public Map<String, Object> get(String id) {\r\n    return db.queryForMap(\"select * from workflow where id=?\", id);\r\n  }\r\n}\r\n",
            "sha256": "da9701bcfd9eaca0795f5a5e388753fbde509cb8ff4f2db1a1ccf7b052f42466"
          }
        ]
      },
      {
        "heading": "Compare both architectures",
        "paragraphs": [
          "Repeat the scenarios using broker/choreography mode with RabbitMQ. Compare where decisions live, how pending work is inspected, and what must be replayed after failure. Do not run two coordination modes against the same active workflow."
        ],
        "flow": [
          "Create order",
          "Reserve",
          "Charge",
          "Commit or compensate",
          "Inspect durable result"
        ],
        "exercise": "Present one success and one failed workflow. Explain every local transaction, message or HTTP call, duplicate defense, compensation and remaining unknown outcome."
      }
    ]
  }
];
