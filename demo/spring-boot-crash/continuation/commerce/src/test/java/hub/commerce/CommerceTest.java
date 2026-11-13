package hub.commerce;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.*;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.*;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(
    properties = {
      "spring.datasource.url=jdbc:h2:mem:commerce-tests;DB_CLOSE_DELAY=-1",
      "payment.key=sk_test_fixture",
      "payment.webhook-secret=whsec_fixture",
      "management.health.mail.enabled=false"
    })
@AutoConfigureMockMvc
class CommerceTest {
  @Autowired MockMvc mvc;
  @Autowired AuthService auth;
  @Autowired JdbcTemplate db;
  @Autowired Orders orders;
  @MockitoBean JavaMailSender mail;
  @MockitoBean PaymentClient payment;

  @BeforeEach
  void clean() {
    db.update("delete from payment_event");
    db.update("delete from auth_token");
    db.update("delete from account");
    orders.deleteAll();
    reset(mail, payment);
  }

  @Test
  void invalidOrderReturnsFields() throws Exception {
    mvc.perform(
            post("/api/v1/orders")
                .with(user("learner@example.test"))
                .contentType("application/json")
                .content("{\"product\":\"\",\"quantity\":0}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors").isArray());
  }

  @Test
  void ownerCannotReadAnotherOrder() throws Exception {
    var o = orders.save(new PurchaseOrder("alice", "Book", 1));
    mvc.perform(get("/api/v1/orders/" + o.id).with(user("bob"))).andExpect(status().isNotFound());
  }

  @Test
  void staleCancellationReturnsConflict() throws Exception {
    var o = orders.save(new PurchaseOrder("alice", "Book", 1));
    mvc.perform(post("/api/v1/orders/" + o.id + "/cancel?version=99").with(user("alice")))
        .andExpect(status().isConflict());
    assertEquals("PENDING", orders.findById(o.id).orElseThrow().status);
  }

  String register() {
    auth.register("learner@example.test", "very-long-password");
    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);
    verify(mail).send(c.capture());
    String text = c.getValue().getText();
    return text.substring(text.indexOf("token: ") + 7);
  }

  @Test
  void verifyRefreshLogoutAndReset() {
    String token = register();
    assertThrows(Exception.class, () -> auth.login("learner@example.test", "very-long-password"));
    auth.verify(token);
    var first = auth.login("learner@example.test", "very-long-password");
    assertEquals("learner@example.test", auth.authenticate(first.accessToken()));
    var second = auth.refresh(first.refreshToken());
    assertNull(auth.authenticate(first.accessToken()));
    assertThrows(Exception.class, () -> auth.refresh(first.refreshToken()));
    auth.logout(second.refreshToken());
    assertNull(auth.authenticate(second.accessToken()));
    reset(mail);
    auth.requestReset("learner@example.test");
    var c = ArgumentCaptor.forClass(SimpleMailMessage.class);
    verify(mail).send(c.capture());
    String body = c.getValue().getText();
    auth.reset(body.substring(body.indexOf("token: ") + 7), "another-long-password");
    assertNotNull(auth.login("learner@example.test", "another-long-password"));
  }

  @Test
  void signedWebhookIsIdempotent() throws Exception {
    var o = new PurchaseOrder("alice", "Book", 1);
    o.checkoutId = "cs_fixture";
    o = orders.save(o);
    String body =
        "{\"id\":\"evt_1\",\"type\":\"checkout.session.completed\",\"data\":{\"object\":{\"id\":\"cs_fixture\",\"payment_status\":\"paid\",\"payment_intent\":\"pi_fixture\",\"amount_total\":2500,\"currency\":\"usd\",\"metadata\":{\"orderId\":\""
            + o.id
            + "\"}}}}";
    long time = java.time.Instant.now().getEpochSecond();
    var mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec("whsec_fixture".getBytes(), "HmacSHA256"));
    String signature =
        "t="
            + time
            + ",v1="
            + HexFormat.of().formatHex(mac.doFinal((time + "." + body).getBytes()));
    for (int i = 0; i < 2; i++)
      mvc.perform(
              post("/webhooks/stripe")
                  .header("Stripe-Signature", signature)
                  .contentType("application/json")
                  .content(body))
          .andExpect(status().isOk());
    assertEquals("PAID", orders.findById(o.id).orElseThrow().status);
    assertEquals(1, db.queryForObject("select count(*) from payment_event", Integer.class));
    mvc.perform(post("/webhooks/stripe").header("Stripe-Signature", "invalid").content(body))
        .andExpect(status().isBadRequest());
  }

  @Test
  void checkoutUsesServerAmountAndReusesSession() throws Exception {
    var o = orders.save(new PurchaseOrder("alice", "Book", 2));
    when(payment.checkout(any()))
        .thenReturn(new PaymentClient.Checkout("cs_test", "https://checkout.stripe.com/test"));
    for (int i = 0; i < 2; i++)
      mvc.perform(post("/api/v1/orders/" + o.id + "/checkout").with(user("alice")))
          .andExpect(status().isOk());
    verify(payment, times(1)).checkout(any());
  }

  @Test
  void detailFetchAndRefundReconciliation() throws Exception {
    var o = new PurchaseOrder("alice", "Book", 1);
    o.status = "PAID";
    o.paymentId = "pi_fixture";
    o = orders.save(o);
    mvc.perform(get("/api/v1/orders/" + o.id + "/detail").with(user("alice")))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.lines[0].product").value("Book"));
    doReturn(Map.of("id", "re_fixture", "status", "pending"))
        .when(payment)
        .refund(o.id, "pi_fixture");
    mvc.perform(post("/api/v1/orders/" + o.id + "/refund").with(user("alice")))
        .andExpect(status().isOk());
    assertEquals("REFUND_PENDING", orders.findById(o.id).orElseThrow().status);
    doReturn(Map.of("status", "succeeded")).when(payment).refundStatus("re_fixture");
    mvc.perform(post("/api/v1/orders/" + o.id + "/reconcile").with(user("alice")))
        .andExpect(status().isOk());
    assertEquals("REFUNDED", orders.findById(o.id).orElseThrow().status);
  }

  @Test
  void pdfUploadCannotBeReadByAnotherUser() throws Exception {
    var upload =
        new org.springframework.mock.web.MockMultipartFile(
            "file", "a.pdf", "application/pdf", "%PDF-fixture".getBytes());
    String response =
        mvc.perform(multipart("/api/v1/files").file(upload).with(user("alice")))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
    String id =
        new com.fasterxml.jackson.databind.ObjectMapper().readTree(response).get("id").asText();
    mvc.perform(get("/api/v1/files/" + id).with(user("alice"))).andExpect(status().isOk());
    mvc.perform(get("/api/v1/files/" + id).with(user("bob"))).andExpect(status().isNotFound());
  }

  @Test
  void openApiAndMissingAuthentication() throws Exception {
    mvc.perform(get("/v3/api-docs"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.paths['/api/v1/orders']").exists());
    mvc.perform(get("/api/v1/orders")).andExpect(status().isUnauthorized());
  }
}
