package com.example.ecommerce;

import com.example.ecommerce.entity.*;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.repository.*;
import com.example.ecommerce.service.*;
import com.example.ecommerce.payment.RazorpayGateway;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest(properties = {"spring.datasource.url=jdbc:h2:mem:storetests;DB_CLOSE_DELAY=-1;LOCK_TIMEOUT=10000", "spring.datasource.username=sa",
        "spring.datasource.password=test", "razorpay.key-id=rzp_test_fixture", "razorpay.key-secret=test_secret", "razorpay.webhook-secret=test_webhook"})
@AutoConfigureMockMvc
class StoreIntegrationTest {
    @Autowired
    MockMvc mvc;
    @Autowired
    UserRepository users;
    @Autowired
    ProductRepository products;
    @Autowired
    CartItemRepository carts;
    @Autowired
    OrderRepository orders;
    @Autowired
    OrderItemRepository items;
    @Autowired
    PaymentRepository paymentRepo;
    @Autowired
    RefundRepository refunds;
    @Autowired
    AuditEntryRepository audits;
    @Autowired
    WebhookEventRepository events;
    @Autowired
    CartService cart;
    @Autowired
    OrderService orderService;
    @Autowired
    PaymentService service;
    @Autowired
    AccountService accounts;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    PasswordEncoder encoder;
    @MockitoBean
    RazorpayGateway gateway;
    User alice, bob;
    Product product;

    @BeforeEach
    void fixture() {
        events.deleteAll();
        refunds.deleteAll();
        paymentRepo.deleteAll();
        audits.deleteAll();
        items.deleteAll();
        orders.deleteAll();
        carts.deleteAll();
        products.deleteAll();
        users.deleteAll();
        alice = person("alice@example.test", "CUSTOMER");
        bob = person("bob@example.test", "CUSTOMER");
        person("admin@example.test", "ADMIN");
        product = new Product();
        product.sku = "TEST";
        product.title = "Test vase";
        product.description = "A test product";
        product.category = "Objects";
        product.art = "vase";
        product.priceMinorUnits = 19999;
        product.stockQuantity = 5;
        product.active = true;
        product = products.save(product);
        when(gateway.createOrder(anyLong(), anyString())).thenAnswer(call -> mapper.createObjectNode().put("id", "order_Test123")
                .put("receipt", call.getArgument(1, String.class)).put("amount", call.getArgument(0, Long.class)).put("currency", "INR"));
        when(gateway.refunds(anyString(), anyInt())).thenReturn(mapper.createObjectNode().set("items", mapper.createArrayNode()));
        when(gateway.publicKey()).thenReturn("rzp_test_fixture");
    }

    User person(String email, String role) {
        User u = new User();
        u.name = "Test person";
        u.email = email;
        u.role = role;
        u.passwordHash = encoder.encode("Testing@1234");
        u.createdAt = Instant.now();
        return users.save(u);
    }

    Order pending() {
        cart.change(alice.id, product.id, 2, true);
        return service.initiate(alice, UUID.randomUUID().toString(), "Test address, 600001");
    }

    ObjectNode evidence(Order o, String state) {
        return mapper.createObjectNode().put("id", "pay_Test123").put("order_id", o.gatewayOrderId).put("amount", o.totalMinorUnits).put("currency", "INR")
                .put("status", state);
    }

    ObjectNode refundEvidence(String token, long amount, String status) {
        return mapper.createObjectNode().put("id", "rfnd_Test123").put("payment_id", "pay_Test123").put("amount", amount).put("currency", "INR")
                .put("status", status).put("receipt", token);
    }

    @Test
    void anonymousProtectedPagesRedirectAndAdminIsForbiddenForCustomer() throws Exception {
        for (String route : List.of("/cart", "/checkout", "/orders", "/admin"))
            mvc.perform(get(route)).andExpect(status().is3xxRedirection()).andExpect(redirectedUrlPattern("**/login"));
        mvc.perform(get("/admin").with(user(alice.email).roles("CUSTOMER"))).andExpect(status().isForbidden());
        mvc.perform(post("/admin/refunds").with(user(alice.email)).with(csrf()).param("paymentId", "1").param("amount", "1").param("requestToken",
                UUID.randomUUID().toString())).andExpect(status().isForbidden());
    }

    @Test
    void csrfIsRequiredAndLogoutIsPostOnly() throws Exception {
        mvc.perform(post("/cart/items").with(user(alice.email)).param("productId", product.id.toString()).param("quantity", "1"))
                .andExpect(status().isForbidden());
        mvc.perform(post("/logout").with(user(alice.email)).with(csrf())).andExpect(status().is3xxRedirection());
    }

    @Test
    void authenticatedGuestPagesRedirectAndCacheIsDisabled() throws Exception {
        mvc.perform(get("/login").with(user(alice.email))).andExpect(redirectedUrl("/"));
        mvc.perform(get("/register").with(user(alice.email))).andExpect(redirectedUrl("/"));
        mvc.perform(get("/cart").with(user(alice.email))).andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", org.hamcrest.Matchers.containsString("no-store")));
    }

    @Test
    void registrationHashAndServerValidationWorkWithoutJavascript() throws Exception {
        mvc.perform(post("/register").with(csrf()).param("name", "New user").param("email", "NEW@example.test").param("password", "Testing@1234")
                .param("confirmPassword", "Testing@1234")).andExpect(redirectedUrl("/login"));
        User u = users.findByEmail("new@example.test").orElseThrow();
        assertThat(encoder.matches("Testing@1234", u.passwordHash)).isTrue();
        assertThat(u.role).isEqualTo("CUSTOMER");
        long before = users.count();
        mvc.perform(post("/register").with(csrf()).param("name", "Bad").param("email", "invalid").param("password", "short").param("confirmPassword", "wrong"))
                .andExpect(redirectedUrl("/register"));
        assertThat(users.count()).isEqualTo(before);
    }

    @Test
    void formLoginWorksWithStoredBcryptPassword() throws Exception {
        mvc.perform(post("/login").with(csrf()).param("username", alice.email).param("password", "Testing@1234")).andExpect(redirectedUrl("/"));
        mvc.perform(post("/login").with(csrf()).param("username", alice.email).param("password", "wrong")).andExpect(redirectedUrl("/login?error"));
    }

    @Test
    void customersCannotReadOrReconcileOtherCustomersOrders() throws Exception {
        Order o = pending();
        mvc.perform(get("/orders/" + o.id).with(user(bob.email))).andExpect(status().isNotFound());
        mvc.perform(post("/orders/" + o.id + "/reconcile").with(user(bob.email)).with(csrf())).andExpect(status().isNotFound());
        mvc.perform(get("/orders/" + o.id).with(user("admin@example.test").roles("ADMIN"))).andExpect(status().isOk());
    }

    @Test
    void cartIgnoresClientPriceAndRemoveWorksWithoutJavascript() throws Exception {
        mvc.perform(post("/cart/items").with(user(alice.email)).with(csrf()).param("productId", product.id.toString()).param("quantity", "2")
                .param("add", "true").param("price", "1")).andExpect(redirectedUrl("/cart"));
        assertThat(cart.view(alice.id).total()).isEqualTo(39998);
        mvc.perform(post("/cart/items").with(user(alice.email)).with(csrf()).param("productId", product.id.toString()).param("quantity", "2").param("remove",
                "true")).andExpect(redirectedUrl("/cart"));
        assertThat(cart.view(alice.id).count()).isZero();
    }

    @Test
    void insufficientInventoryRollsBackAllReservations() {
        cart.change(alice.id, product.id, 5, true);
        product.stockQuantity = 1;
        products.save(product);
        assertThatIllegalArgumentException().isThrownBy(() -> service.initiate(alice, UUID.randomUUID().toString(), "Address"));
        assertThat(orders.count()).isZero();
        assertThat(products.findById(product.id).orElseThrow().stockQuantity).isEqualTo(1);
        assertThat(cart.view(alice.id).count()).isEqualTo(5);
    }

    @Test
    void concurrentCheckoutTokenCreatesOneOrderAndReservesOnce() throws Exception {
        cart.change(alice.id, product.id, 2, true);
        String token = UUID.randomUUID().toString();
        try (ExecutorService pool = Executors.newFixedThreadPool(2)) {
            var calls = pool
                    .invokeAll(List.<Callable<Order>>of(() -> service.initiate(alice, token, "Address"), () -> service.initiate(alice, token, "Address")));
            assertThat(calls.get(0).get().id).isEqualTo(calls.get(1).get().id);
        }
        assertThat(orders.count()).isEqualTo(1);
        assertThat(products.findById(product.id).orElseThrow().stockQuantity).isEqualTo(3);
        verify(gateway, times(1)).createOrder(39998, "ff_" + token);
    }

    @Test
    void ambiguousOrderCreationNeverCreatesAnotherGatewayOrder() {
        when(gateway.createOrder(anyLong(), anyString())).thenThrow(new RuntimeException("timeout"));
        cart.change(alice.id, product.id, 1, true);
        String token = UUID.randomUUID().toString();
        Order o = service.initiate(alice, token, "Address");
        assertThat(o.status).isEqualTo("INITIATION_UNKNOWN");
        service.initiate(alice, token, "Address");
        verify(gateway, times(1)).createOrder(anyLong(), anyString());
    }

    @Test
    void immutablePriceSnapshotsSurviveCatalogEdits() {
        Order o = pending();
        product.priceMinorUnits = 90000;
        products.save(product);
        assertThat(items.findByOrderIdOrderById(o.id).getFirst().unitPriceMinorUnits).isEqualTo(19999);
        assertThat(o.totalMinorUnits).isEqualTo(39998);
    }

    @Test
    void invalidSignatureOrMismatchedGatewayOrderIsRejectedBeforeLookup() {
        Order o = pending();
        assertThatIllegalArgumentException().isThrownBy(() -> service.verify(alice, o.id, o.gatewayOrderId, "pay_Test123", "bad"));
        when(gateway.validCheckout(anyString(), anyString(), anyString())).thenReturn(true);
        assertThatIllegalArgumentException().isThrownBy(() -> service.verify(alice, o.id, "order_Tampered", "pay_Test123", "signed"));
        verify(gateway, never()).payment(anyString());
        assertThat(paymentRepo.count()).isZero();
    }

    @Test
    void signatureAloneNeverMarksAuthorizedPaymentPaid() {
        Order o = pending();
        when(gateway.validCheckout(anyString(), anyString(), anyString())).thenReturn(true);
        when(gateway.payment("pay_Test123")).thenReturn(evidence(o, "authorized"));
        service.verify(alice, o.id, o.gatewayOrderId, "pay_Test123", "signature");
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PENDING");
    }

    @Test
    void mismatchedAmountCurrencyAndOrderAreRejected() {
        Order o = pending();
        ObjectNode n = evidence(o, "captured");
        n.put("amount", 1);
        assertThatIllegalArgumentException().isThrownBy(() -> service.applyPayment(o.id, n));
        n.put("amount", o.totalMinorUnits).put("currency", "USD");
        assertThatIllegalArgumentException().isThrownBy(() -> service.applyPayment(o.id, n));
        n.put("currency", "INR").put("order_id", "order_Tampered");
        assertThatIllegalArgumentException().isThrownBy(() -> service.applyPayment(o.id, n));
        assertThat(paymentRepo.count()).isZero();
    }

    @Test
    void capturedPaymentIsIdempotentAndCannotRegressOrConsumeStockTwice() {
        Order o = pending();
        service.applyPayment(o.id, evidence(o, "captured"));
        service.applyPayment(o.id, evidence(o, "captured"));
        service.applyPayment(o.id, evidence(o, "authorized"));
        service.applyPayment(o.id, evidence(o, "failed"));
        assertThat(paymentRepo.count()).isEqualTo(1);
        assertThat(paymentRepo.findAll().getFirst().status).isEqualTo("captured");
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PAID");
        assertThat(products.findById(product.id).orElseThrow().stockQuantity).isEqualTo(3);
    }

    @Test
    void failedPaymentNeverFulfillsOrder() {
        Order o = pending();
        service.applyPayment(o.id, evidence(o, "failed"));
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PENDING");
    }

    @Test
    void duplicateAndOutOfOrderWebhooksUseCurrentEvidenceAndDeduplicate() {
        Order o = pending();
        when(gateway.webhookConfigured()).thenReturn(true);
        when(gateway.validWebhook(any(), anyString())).thenReturn(true);
        when(gateway.payment("pay_Test123")).thenReturn(evidence(o, "captured"));
        byte[] raw = "{\"event\":\"payment.authorized\",\"payload\":{\"payment\":{\"entity\":{\"id\":\"pay_Test123\"}}}}"
                .getBytes(java.nio.charset.StandardCharsets.UTF_8);
        service.webhook(raw, "sig", "event_123");
        service.webhook(raw, "sig", "event_123");
        service.webhook(raw, "sig", "event_124");
        assertThat(events.count()).isEqualTo(2);
        assertThat(paymentRepo.count()).isEqualTo(1);
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PAID");
    }

    @Test
    void webhookIsCsrfExemptButBadSignatureIsRejected() throws Exception {
        when(gateway.webhookConfigured()).thenReturn(true);
        mvc.perform(post("/payments/webhook").header("X-Razorpay-Signature", "bad").header("X-Razorpay-Event-Id", "event_123").contentType("application/json")
                .content("{}")).andExpect(status().isBadRequest());
        assertThat(events.count()).isZero();
    }

    @Test
    void refundRetriesReuseSameIdAndOverRefundIsRejected() {
        Order o = pending();
        Payment p = service.applyPayment(o.id, evidence(o, "captured"));
        when(gateway.payment(p.gatewayPaymentId)).thenReturn(evidence(o, "captured"));
        String token = UUID.randomUUID().toString();
        when(gateway.refund(p.gatewayPaymentId, 10000, token)).thenReturn(refundEvidence(token, 10000, "processed"));
        service.requestRefund(p.id, 10000, token);
        service.requestRefund(p.id, 10000, token);
        assertThat(refunds.count()).isEqualTo(1);
        verify(gateway, times(1)).refund(p.gatewayPaymentId, 10000, token);
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PARTIALLY_REFUNDED");
        assertThatIllegalArgumentException().isThrownBy(() -> service.requestRefund(p.id, 30000, UUID.randomUUID().toString()));
        service.applyRefund(refundEvidence(token, 10000, "pending"));
        assertThat(refunds.findAll().getFirst().status).isEqualTo("processed");
    }

    @Test
    void unknownRefundReservesBalanceAndSameRequestCanSafelyRetry() {
        Order o = pending();
        Payment p = service.applyPayment(o.id, evidence(o, "captured"));
        when(gateway.payment(p.gatewayPaymentId)).thenReturn(evidence(o, "captured"));
        String token = UUID.randomUUID().toString();
        when(gateway.refund(p.gatewayPaymentId, 30000, token)).thenThrow(new RuntimeException("timeout"));
        assertThat(service.requestRefund(p.id, 30000, token).status).isEqualTo("unknown");
        assertThatIllegalArgumentException().isThrownBy(() -> service.requestRefund(p.id, 10000, UUID.randomUUID().toString()));
        doReturn(refundEvidence(token, 30000, "processed")).when(gateway).refund(p.gatewayPaymentId, 30000, token);
        assertThat(service.requestRefund(p.id, 30000, token).status).isEqualTo("processed");
        assertThat(refunds.count()).isEqualTo(1);
    }

    @Test
    void invalidAddressDoesNotCreateOrder() throws Exception {
        cart.change(alice.id, product.id, 1, true);
        MockHttpSession session = new MockHttpSession();
        String token = UUID.randomUUID().toString();
        session.setAttribute("checkoutToken", token);
        mvc.perform(post("/checkout/create-order").session(session).with(user(alice.email)).with(csrf()).param("name", "Alice").param("phone", "123")
                .param("street", "Test").param("city", "City").param("state", "State").param("pin", "bad").param("requestToken", token))
                .andExpect(redirectedUrl("/checkout"));
        assertThat(orders.count()).isZero();
    }

    @Test
    void fullRefundAndRepeatedEvidenceLeaveOneRefundAndNoRestock() {
        Order o = pending();
        Payment p = service.applyPayment(o.id, evidence(o, "captured"));
        when(gateway.payment(p.gatewayPaymentId)).thenReturn(evidence(o, "captured"));
        String token = UUID.randomUUID().toString();
        when(gateway.refund(p.gatewayPaymentId, o.totalMinorUnits, token)).thenReturn(refundEvidence(token, o.totalMinorUnits, "processed"));
        service.requestRefund(p.id, o.totalMinorUnits, token);
        service.applyRefund(refundEvidence(token, o.totalMinorUnits, "processed"));
        service.applyPayment(o.id, evidence(o, "authorized"));
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("REFUNDED");
        assertThat(refunds.count()).isEqualTo(1);
        assertThat(products.findById(product.id).orElseThrow().stockQuantity).isEqualTo(3);
        assertThatIllegalArgumentException().isThrownBy(() -> service.requestRefund(p.id, 100, UUID.randomUUID().toString()));
    }

    @Test
    void rejectedWebhookEvidenceLeavesNoEventMarkerOrPayment() {
        Order o = pending();
        when(gateway.webhookConfigured()).thenReturn(true);
        when(gateway.validWebhook(any(), anyString())).thenReturn(true);
        when(gateway.payment("pay_Test123")).thenReturn(evidence(o, "captured").put("amount", 1));
        byte[] raw = "{\"event\":\"payment.captured\",\"payload\":{\"payment\":{\"entity\":{\"id\":\"pay_Test123\"}}}}"
                .getBytes(java.nio.charset.StandardCharsets.UTF_8);
        assertThatIllegalArgumentException().isThrownBy(() -> service.webhook(raw, "sig", "event_rejected"));
        assertThat(events.count()).isZero();
        assertThat(paymentRepo.count()).isZero();
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PENDING");
    }

    @Test
    void webhookGatewayFailureIsRetryableWithoutMarkingEventProcessed() throws Exception {
        Order o = pending();
        when(gateway.webhookConfigured()).thenReturn(true);
        when(gateway.validWebhook(any(), anyString())).thenReturn(true);
        when(gateway.payment("pay_Test123")).thenThrow(new RuntimeException("offline"));
        mvc.perform(post("/payments/webhook").header("X-Razorpay-Signature", "sig").header("X-Razorpay-Event-Id", "event_offline")
                .contentType("application/json").content("{\"event\":\"payment.captured\",\"payload\":{\"payment\":{\"entity\":{\"id\":\"pay_Test123\"}}}}"))
                .andExpect(status().isServiceUnavailable());
        assertThat(events.count()).isZero();
        assertThat(orders.findById(o.id).orElseThrow().status).isEqualTo("PENDING");
    }

    @Test
    void adminCanSaveCatalogAndCustomersCannot() throws Exception {
        mvc.perform(post("/admin/products").with(user(alice.email)).with(csrf())).andExpect(status().isForbidden());
        mvc.perform(post("/admin/products").with(user("admin@example.test").roles("ADMIN")).with(csrf()).param("sku", "NEW-SKU").param("title", "New product")
                .param("description", "Description").param("category", "Living").param("price", "123.45").param("stock", "10").param("active", "true")
                .param("art", "lamp")).andExpect(redirectedUrl("/admin/products"));
        assertThat(products.findAll().stream().filter(p -> p.sku.equals("NEW-SKU")).findFirst().orElseThrow().priceMinorUnits).isEqualTo(12345);
    }

    @Test
    void definitiveGatewayRefundRejectionReleasesReservationAndAuditsOnlySafeReason() {
        Order o = pending();
        Payment p = service.applyPayment(o.id, evidence(o, "captured"));
        when(gateway.payment(p.gatewayPaymentId)).thenReturn(evidence(o, "captured"));
        String token = UUID.randomUUID().toString();
        var rejection = org.springframework.web.client.HttpClientErrorException.create(org.springframework.http.HttpStatus.BAD_REQUEST, "Bad Request",
                org.springframework.http.HttpHeaders.EMPTY, "{\"error\":{\"reason\":\"payment_not_captured\",\"description\":\"Private remote payload\"}}"
                        .getBytes(java.nio.charset.StandardCharsets.UTF_8),
                java.nio.charset.StandardCharsets.UTF_8);
        when(gateway.refund(p.gatewayPaymentId, 30000, token)).thenThrow(rejection);
        assertThat(service.requestRefund(p.id, 30000, token).status).isEqualTo("failed");
        assertThat(audits.findByOrderIdOrderByIdDesc(o.id).getFirst().detail).contains("payment_not_captured").doesNotContain("Private remote payload");
        String next = UUID.randomUUID().toString();
        when(gateway.refund(p.gatewayPaymentId, 30000, next)).thenReturn(refundEvidence(next, 30000, "processed"));
        assertThat(service.requestRefund(p.id, 30000, next).status).isEqualTo("processed");
    }

    @Test
    void missingStaticResourceIs404RatherThanAServiceFailure() throws Exception {
        mvc.perform(get("/application.properties").with(user(alice.email))).andExpect(status().isNotFound());
    }
}
