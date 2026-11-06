package com.example.taskmanagement;

import static org.assertj.core.api.Assertions.*;
import static org.awaitility.Awaitility.await;
import static org.mockito.Mockito.*;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.notification.*;
import com.example.taskmanagement.repository.*;
import com.example.taskmanagement.scheduler.OverdueScheduler;
import java.net.*;
import java.net.http.*;
import java.time.*;
import java.util.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import tools.jackson.databind.*;

@org.springframework.test.context.ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApiIntegrationTests {
  @Value("${local.server.port}")
  int port;

  @Autowired ObjectMapper json;
  @Autowired UserRepository users;
  @Autowired TaskRepository tasks;
  @Autowired NotificationRepository notifications;
  @Autowired OverdueScheduler scheduler;
  @Autowired NotificationWorker worker;
  @Autowired JwtEncoder encoder;
  @MockitoSpyBean NotificationDelivery delivery;
  final HttpClient client = HttpClient.newHttpClient();

  record Response(int status, JsonNode body) {}

  Response request(String method, String path, String token, Object body) throws Exception {
    var builder =
        HttpRequest.newBuilder(URI.create("http://localhost:" + port + path))
            .header("Content-Type", "application/json");
    if (token != null) builder.header("Authorization", "Bearer " + token);
    builder.method(
        method,
        body == null
            ? HttpRequest.BodyPublishers.noBody()
            : HttpRequest.BodyPublishers.ofString(json.writeValueAsString(body)));
    var response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    return new Response(
        response.statusCode(),
        response.body().isBlank() ? json.createObjectNode() : json.readTree(response.body()));
  }

  String email() {
    return UUID.randomUUID() + "@example.com";
  }

  final String password = "learning-password-123";

  Response register(String email) throws Exception {
    return request(
        "POST",
        "/api/auth/register",
        null,
        Map.of("name", "Learner", "email", email, "password", password));
  }

  String login(String email) throws Exception {
    Response r =
        request("POST", "/api/auth/login", null, Map.of("email", email, "password", password));
    assertThat(r.status).isEqualTo(200);
    return r.body.get("accessToken").asText();
  }

  String account() throws Exception {
    String email = email();
    assertThat(register(email).status).isEqualTo(201);
    return login(email);
  }

  long me(String token) throws Exception {
    return request("GET", "/api/users/me", token, null).body.get("id").asLong();
  }

  long project(String token) throws Exception {
    var r =
        request("POST", "/api/projects", token, Map.of("name", "Learning", "description", "API"));
    assertThat(r.status).isEqualTo(201);
    return r.body.get("id").asLong();
  }

  Response task(String token, long project, String title) throws Exception {
    return request(
        "POST",
        "/api/projects/" + project + "/tasks",
        token,
        Map.of(
            "title", title, "priority", "HIGH", "dueDate", LocalDate.now().plusDays(1).toString()));
  }

  @Test
  void registrationLoginAndValidation() throws Exception {
    String email = email();
    assertThat(register(email).status).isEqualTo(201);
    assertThat(register(email.toUpperCase(Locale.ROOT)).status).isEqualTo(409);
    assertThat(
            request(
                    "POST",
                    "/api/auth/register",
                    null,
                    Map.of("name", " ", "email", "bad", "password", "short"))
                .status)
        .isEqualTo(400);
    assertThat(
            request("POST", "/api/auth/login", null, Map.of("email", email, "password", "wrong"))
                .status)
        .isEqualTo(401);
    String token = login(email);
    var profile = request("GET", "/api/users/me", token, null);
    assertThat(profile.status).isEqualTo(200);
    assertThat(profile.body.has("passwordHash")).isFalse();
    assertThat(users.findByEmail(email).orElseThrow().passwordHash).startsWith("$2");
    assertThat(request("GET", "/api/admin/users", token, null).status).isEqualTo(403);
  }

  String signed(String issuer, String audience, Instant expires) {
    return encoder
        .encode(
            JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(),
                JwtClaimsSet.builder()
                    .issuer(issuer)
                    .audience(List.of(audience))
                    .subject("1")
                    .issuedAt(expires.minusSeconds(900))
                    .expiresAt(expires)
                    .build()))
        .getTokenValue();
  }

  @Test
  void bearerValidationAndHealth() throws Exception {
    assertThat(request("GET", "/api/users/me", null, null).status).isEqualTo(401);
    var invalid = request("GET", "/api/users/me", "invalid", null);
    assertThat(invalid.status).isEqualTo(401);
    assertThat(invalid.body.get("code").asText()).isEqualTo("UNAUTHORIZED");
    for (String token :
        List.of(
            signed("task-management", "task-management-api", Instant.now().minusSeconds(180)),
            signed("wrong", "task-management-api", Instant.now().plusSeconds(300)),
            signed("task-management", "wrong", Instant.now().plusSeconds(300))))
      assertThat(request("GET", "/api/users/me", token, null).status).isEqualTo(401);
    assertThat(request("GET", "/actuator/health", null, null).status).isEqualTo(200);
    assertThat(request("GET", "/actuator/env", account(), null).status).isEqualTo(403);
    assertThat(request("GET", "/v3/api-docs", null, null).status).isEqualTo(200);
  }

  @Test
  void projectIsolationMembershipAndTaskPermissions() throws Exception {
    String owner = account(), member = account(), stranger = account();
    long p = project(owner), memberId = me(member);
    assertThat(request("GET", "/api/projects/" + p, stranger, null).status).isEqualTo(403);
    assertThat(
            request(
                    "POST",
                    "/api/projects/" + p + "/members",
                    owner,
                    Map.of("userId", memberId, "membershipRole", "MEMBER"))
                .status)
        .isEqualTo(204);
    var created = task(owner, p, "Owned task");
    assertThat(created.status).isEqualTo(201);
    long id = created.body.get("id").asLong();
    assertThat(request("GET", "/api/tasks/" + id, stranger, null).status).isEqualTo(403);
    assertThat(
            request("PATCH", "/api/tasks/" + id, stranger, Map.of("version", 0, "title", "Hijack"))
                .status)
        .isEqualTo(403);
    assertThat(
            request(
                    "PATCH",
                    "/api/tasks/" + id,
                    member,
                    Map.of("version", 0, "title", "Unauthorized edit"))
                .status)
        .isEqualTo(403);
    assertThat(
            request(
                    "PATCH",
                    "/api/tasks/" + id,
                    owner,
                    Map.of("version", 0, "assigneeId", me(stranger)))
                .status)
        .isEqualTo(403);
    var assigned =
        request("PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "assigneeId", memberId));
    assertThat(assigned.status).isEqualTo(200);
    var updated =
        request(
            "PATCH",
            "/api/tasks/" + id,
            member,
            Map.of("version", assigned.body.get("version").asLong(), "status", "IN_PROGRESS"));
    assertThat(updated.status).isEqualTo(200);
    assertThat(request("DELETE", "/api/tasks/" + id, member, null).status).isEqualTo(403);
    assertThat(request("DELETE", "/api/projects/" + p + "/members/" + memberId, owner, null).status)
        .isEqualTo(204);
    assertThat(request("GET", "/api/tasks/" + id, member, null).status).isEqualTo(403);
    assertThat(request("DELETE", "/api/tasks/" + id, owner, null).status).isEqualTo(204);
  }

  @Test
  void filteringPaginationTransitionsAndConflict() throws Exception {
    String owner = account();
    long p = project(owner);
    var first = task(owner, p, "Alpha");
    task(owner, p, "Beta");
    long id = first.body.get("id").asLong();
    var list =
        request(
            "GET",
            "/api/projects/"
                + p
                + "/tasks?status=TODO&priority=HIGH&search=alpha&size=1&sort=title,asc",
            owner,
            null);
    assertThat(list.status).isEqualTo(200);
    assertThat(list.body.get("totalElements").asInt()).isEqualTo(1);
    assertThat(list.body.get("content").get(0).get("title").asText()).isEqualTo("Alpha");
    assertThat(request("GET", "/api/projects/" + p + "/tasks?size=101", owner, null).status)
        .isEqualTo(400);
    assertThat(
            request("GET", "/api/projects/" + p + "/tasks?sort=passwordHash,asc", owner, null)
                .status)
        .isEqualTo(400);
    assertThat(
            request("PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "status", "DONE"))
                .status)
        .isEqualTo(400);
    assertThat(
            request("PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "status", "INVALID"))
                .status)
        .isEqualTo(400);
    assertThat(
            request(
                    "POST",
                    "/api/projects/" + p + "/tasks",
                    owner,
                    Map.of("title", "Bad", "priority", "WRONG"))
                .status)
        .isEqualTo(400);
    assertThat(
            request("PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "title", "Renamed"))
                .status)
        .isEqualTo(200);
    assertThat(
            request("PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "title", "Stale"))
                .status)
        .isEqualTo(409);
  }

  @Test
  void adminAndDelegatedManager() throws Exception {
    String admin = account(), manager = account(), outsider = account();
    long adminId = me(admin), managerId = me(manager);
    var u = users.findById(adminId).orElseThrow();
    u.role = Role.ADMIN;
    users.save(u);
    assertThat(request("GET", "/api/admin/users", admin, null).status).isEqualTo(200);
    assertThat(
            request(
                    "PATCH",
                    "/api/admin/users/" + managerId + "/role",
                    admin,
                    Map.of("role", "MANAGER"))
                .status)
        .isEqualTo(200);
    long p = project(outsider);
    assertThat(request("PUT", "/api/projects/" + p, manager, Map.of("name", "No access")).status)
        .isEqualTo(403);
    assertThat(
            request(
                    "POST",
                    "/api/projects/" + p + "/members",
                    outsider,
                    Map.of("userId", managerId, "membershipRole", "MANAGER"))
                .status)
        .isEqualTo(204);
    assertThat(request("PUT", "/api/projects/" + p, manager, Map.of("name", "Managed")).status)
        .isEqualTo(200);
    assertThat(request("GET", "/api/projects/" + p, admin, null).status).isEqualTo(200);
  }

  @Test
  void overdueIdempotencyAsyncFailureAndRetry() throws Exception {
    String owner = account();
    long p = project(owner);
    long id = task(owner, p, "Overdue").body.get("id").asLong();
    Task t = tasks.findById(id).orElseThrow();
    t.dueDate = LocalDate.now(ZoneOffset.UTC).minusDays(1);
    tasks.save(t);
    scheduler.scan();
    scheduler.scan();
    var page = request("GET", "/api/notifications", owner, null);
    assertThat(page.body.get("totalElements").asInt()).isEqualTo(1);
    long nId = page.body.get("content").get(0).get("id").asLong();
    doThrow(new IllegalStateException("Simulated delivery failure")).when(delivery).deliver(any());
    worker.process(nId);
    await()
        .atMost(Duration.ofSeconds(5))
        .untilAsserted(() ->
            assertThat(notifications.findById(nId).orElseThrow().status)
                .isEqualTo(NotificationStatus.FAILED));
    var failed = notifications.findById(nId).orElseThrow();
    assertThat(failed.attempts).isEqualTo(1);
    assertThat(failed.lastError).isNotBlank();
    assertThat(failed.nextAttemptAt).isAfter(Instant.now());
    doCallRealMethod().when(delivery).deliver(any());
    failed.nextAttemptAt = Instant.now().minusSeconds(1);
    notifications.save(failed);
    scheduler.dispatch();
    await()
        .atMost(Duration.ofSeconds(5))
        .untilAsserted(() ->
            assertThat(notifications.findById(nId).orElseThrow().status)
                .isEqualTo(NotificationStatus.DELIVERED));
    worker.process(nId);
    await()
        .during(Duration.ofMillis(200))
        .atMost(Duration.ofSeconds(2))
        .untilAsserted(
            () -> assertThat(notifications.findById(nId).orElseThrow().attempts).isEqualTo(2));
    assertThat(
            request("GET", "/api/notifications", account(), null).body.get("totalElements").asInt())
        .isZero();
  }

  @Test
  void simultaneousUpdatesHaveOneWinner() throws Exception {
    String owner = account();
    long p = project(owner);
    long id = task(owner, p, "Race").body.get("id").asLong();
    try (var pool = java.util.concurrent.Executors.newFixedThreadPool(2)) {
      var gate = new java.util.concurrent.CountDownLatch(1);
      var a =
          pool.submit(() -> {
            gate.await();
            return request(
                    "PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "title", "First"))
                .status;
          });
      var b =
          pool.submit(() -> {
            gate.await();
            return request(
                    "PATCH", "/api/tasks/" + id, owner, Map.of("version", 0, "title", "Second"))
                .status;
          });
      gate.countDown();
      assertThat(List.of(a.get(), b.get())).containsExactlyInAnyOrder(200, 409);
    }
  }

  @Test
  void invalidDatesUnknownFieldsAndMissingRecords() throws Exception {
    String owner = account();
    long p = project(owner);
    assertThat(
            request(
                    "POST",
                    "/api/projects/" + p + "/tasks",
                    owner,
                    Map.of(
                        "title",
                        "Past",
                        "priority",
                        "HIGH",
                        "dueDate",
                        LocalDate.now().minusDays(1).toString()))
                .status)
        .isEqualTo(400);
    assertThat(
            request("POST", "/api/projects", owner, Map.of("name", "Project", "role", "ADMIN"))
                .status)
        .isEqualTo(400);
    assertThat(request("GET", "/api/tasks/999999", owner, null).status).isEqualTo(404);
    assertThat(request("GET", "/api/nonexistent", owner, null).status).isEqualTo(404);
  }
}
