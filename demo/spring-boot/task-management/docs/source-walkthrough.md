# Complete source walkthrough

Current complete application source, grouped by path. Read docs/02-implementation.md for the six-phase explanation. Each section explains why the file exists, its connections, and how to verify it. All paths are under D:/learning-hub/task-management.


## pom.xml

Exact path: `D:/learning-hub/task-management/pom.xml`

Why: Selects Java, the Boot parent, runtime/test dependencies, and executable JAR packaging.

Connections: The wrapper invokes Maven, which compiles Java and launches JUnit before Boot repackaging.

Verify: Run ./mvnw.cmd clean verify.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.2</version>
    <relativePath />
  </parent>
  <groupId>com.example</groupId>
  <artifactId>task-management</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>task-management</name>
  <description>Task Management REST API</description>
  <properties>
    <java.version>25</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-flyway</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
    </dependency>
    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
      <version>3.2.0</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```


## scripts/run-local.ps1

Exact path: `D:/learning-hub/task-management/scripts/run-local.ps1`

Why: Provides a convenient local build/start command without putting signing secrets in source or files.

Connections: Invokes the Maven wrapper and executable JAR; generates a session-scoped key only if absent.

Verify: Run ./scripts/run-local.ps1 and request /actuator/health.

```powershell
param([switch]$SkipBuild)
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
if (-not $env:JWT_SECRET) {
    $env:JWT_SECRET = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    Write-Host 'Generated a signing key for this shell session. Set JWT_SECRET yourself to keep tokens valid across sessions.'
}
if (-not $SkipBuild) {
    & .\mvnw.cmd verify
    if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
}
& java -jar target/task-management-0.0.1-SNAPSHOT.jar
exit $LASTEXITCODE
```


## src/main/java/com/example/taskmanagement/auth/AuthService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/auth/AuthService.java`

Why: Registers users with password hashing, authenticates credentials, and issues short-lived JWTs.

Connections: Uses UserRepository, AuthenticationManager, PasswordEncoder, and JwtEncoder from SecurityConfig.

Verify: Run registrationLoginAndValidation and bearerValidationAndHealth.

```java
package com.example.taskmanagement.auth;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.User;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.UserRepository;
import java.time.Instant;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private final UserRepository users;
  private final PasswordEncoder passwords;
  private final AuthenticationManager auth;
  private final JwtEncoder encoder;
  private final String issuer, audience;
  private final long ttl;

  public AuthService(
      UserRepository users,
      PasswordEncoder passwords,
      AuthenticationManager auth,
      JwtEncoder encoder,
      @Value("${app.jwt.issuer}") String issuer,
      @Value("${app.jwt.audience}") String audience,
      @Value("${app.jwt.ttl-seconds}") long ttl) {
    this.users = users;
    this.passwords = passwords;
    this.auth = auth;
    this.encoder = encoder;
    this.issuer = issuer;
    this.audience = audience;
    this.ttl = ttl;
  }

  @Transactional
  public UserView register(Register input) {
    String email = input.email().trim().toLowerCase(Locale.ROOT);
    if (input.password().getBytes(java.nio.charset.StandardCharsets.UTF_8).length > 72)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Password must be at most 72 UTF-8 bytes");
    if (users.existsByEmail(email))
      throw new ApiException(HttpStatus.CONFLICT, "Email already registered");
    User user = new User();
    user.name = input.name().trim();
    user.email = email;
    user.passwordHash = passwords.encode(input.password());
    return UserView.of(users.save(user));
  }

  public Token login(Login input) {
    String email = input.email().trim().toLowerCase(Locale.ROOT);
    auth.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(email, input.password()));
    User user = users.findByEmail(email).orElseThrow();
    Instant now = Instant.now();
    var claims =
        JwtClaimsSet.builder()
            .issuer(issuer)
            .subject(user.getId().toString())
            .audience(List.of(audience))
            .issuedAt(now)
            .expiresAt(now.plusSeconds(ttl))
            .id(UUID.randomUUID().toString())
            .build();
    String token =
        encoder
            .encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims))
            .getTokenValue();
    return new Token(token, "Bearer", ttl);
  }
}
```


## src/main/java/com/example/taskmanagement/config/AdminBootstrap.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/config/AdminBootstrap.java`

Why: Optionally creates the first administrator without embedding credentials or elevating existing users.

Connections: ApplicationRunner executes after startup, using UserRepository and the shared PasswordEncoder.

Verify: Set both bootstrap variables on a fresh H2 database; log in and list admin users.

```java
package com.example.taskmanagement.config;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

/** Explicit, opt-in first-admin creation. Existing users are never elevated. */
@Configuration
public class AdminBootstrap {
  @Bean
  ApplicationRunner bootstrapAdmin(
      UserRepository users,
      PasswordEncoder encoder,
      @Value("${app.bootstrap-admin.email:}") String email,
      @Value("${app.bootstrap-admin.password:}") String password) {
    return args -> {
      if (email.isBlank() && password.isBlank()) return;
      if (!email.matches("[^\\s@]+@[^\\s@]+\\.[^\\s@]+")
          || password.length() < 12
          || password.getBytes(java.nio.charset.StandardCharsets.UTF_8).length > 72)
        throw new IllegalArgumentException(
            "Valid bootstrap email and 12+ character password (max 72 UTF-8 bytes) required");
      String normalized = email.trim().toLowerCase(java.util.Locale.ROOT);
      if (users.existsByEmail(normalized)) return;
      User u = new User();
      u.name = "Administrator";
      u.email = normalized;
      u.passwordHash = encoder.encode(password);
      u.role = com.example.taskmanagement.entity.Role.ADMIN;
      users.save(u);
    };
  }
}
```


## src/main/java/com/example/taskmanagement/config/BackgroundConfig.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/config/BackgroundConfig.java`

Why: Enables scheduling and asynchronous method proxies and provides a bounded named executor.

Connections: NotificationWorker uses notificationExecutor; OverdueScheduler schedules scans and dispatch.

Verify: Run overdueIdempotencyAsyncFailureAndRetry and inspect notification thread names.

```java
package com.example.taskmanagement.config;

import org.springframework.context.annotation.*;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.*;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
@EnableScheduling
public class BackgroundConfig {
  @Bean("notificationExecutor")
  TaskExecutor notificationExecutor() {
    var e = new ThreadPoolTaskExecutor();
    e.setCorePoolSize(2);
    e.setMaxPoolSize(4);
    e.setQueueCapacity(100);
    e.setThreadNamePrefix("notification-");
    e.setWaitForTasksToCompleteOnShutdown(true);
    e.setAwaitTerminationSeconds(20);
    e.initialize();
    return e;
  }
}
```


## src/main/java/com/example/taskmanagement/config/OpenApiConfig.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/config/OpenApiConfig.java`

Why: Describes the API and JWT bearer authentication for Swagger UI.

Connections: Springdoc reads controllers and DTOs to generate the OpenAPI specification.

Verify: GET /v3/api-docs, then open /swagger-ui/index.html.

```java
package com.example.taskmanagement.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig {
  @Bean
  OpenAPI openAPI() {
    return new OpenAPI()
        .info(new Info().title("Task Management API").version("v1"))
        .components(
            new Components()
                .addSecuritySchemes(
                    "bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")))
        .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
  }
}
```


## src/main/java/com/example/taskmanagement/config/SecurityConfig.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/config/SecurityConfig.java`

Why: Configures stateless bearer authentication, BCrypt, user lookup, JWT validation, and filter errors.

Connections: AuthService uses the beans for login; Spring Security validates tokens before controllers execute.

Verify: Run bearerValidationAndHealth and inspect 401 versus 403 responses.

```java
package com.example.taskmanagement.config;

import com.example.taskmanagement.exception.ApiErrors;
import com.example.taskmanagement.repository.UserRepository;
import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  UserDetailsService userDetailsService(UserRepository users) {
    return email ->
        users
            .findByEmail(email.trim().toLowerCase(java.util.Locale.ROOT))
            .map(u ->
                org.springframework.security.core.userdetails.User.withUsername(u.email)
                    .password(u.passwordHash)
                    .roles(u.getRole().name())
                    .build())
            .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
  }

  @Bean
  AuthenticationManager authenticationManager(UserDetailsService users, PasswordEncoder encoder) {
    var provider = new DaoAuthenticationProvider(users);
    provider.setPasswordEncoder(encoder);
    return new ProviderManager(provider);
  }

  @Bean
  SecretKeySpec jwtKey(@Value("${app.jwt.secret}") String value) {
    byte[] bytes = Base64.getDecoder().decode(value);
    if (bytes.length < 32)
      throw new IllegalArgumentException(
          "JWT_SECRET must be Base64 encoding of at least 32 random bytes");
    return new SecretKeySpec(bytes, "HmacSHA256");
  }

  @Bean
  JwtEncoder jwtEncoder(SecretKeySpec key) {
    return new NimbusJwtEncoder(new com.nimbusds.jose.jwk.source.ImmutableSecret<>(key));
  }

  @Bean
  JwtDecoder jwtDecoder(
      SecretKeySpec key,
      @Value("${app.jwt.issuer}") String issuer,
      @Value("${app.jwt.audience}") String audience) {
    var decoder = NimbusJwtDecoder.withSecretKey(key).macAlgorithm(MacAlgorithm.HS256).build();
    OAuth2TokenValidator<Jwt> audienceValidator =
        jwt ->
            jwt.getExpiresAt() != null && jwt.getAudience().contains(audience)
                ? OAuth2TokenValidatorResult.success()
                : OAuth2TokenValidatorResult.failure(
                    new OAuth2Error("invalid_token", "Invalid audience", null));
    decoder.setJwtValidator(
        new DelegatingOAuth2TokenValidator<>(
            JwtValidators.createDefaultWithIssuer(issuer), audienceValidator));
    return decoder;
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http, tools.jackson.databind.ObjectMapper mapper)
      throws Exception {
    http.csrf(c -> c.disable())
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(a ->
            a.requestMatchers(
                    "/api/auth/**",
                    "/actuator/health",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html")
                .permitAll()
                .requestMatchers("/api/**")
                .authenticated()
                .anyRequest()
                .denyAll())
        .oauth2ResourceServer(o ->
            o.jwt(j -> {})
                .authenticationEntryPoint((r, s, e) -> {
                  s.setStatus(401);
                  s.setHeader("WWW-Authenticate", "Bearer");
                  s.setContentType("application/json");
                  s.getWriter()
                      .write(
                          mapper.writeValueAsString(
                              ApiErrors.body(
                                  HttpStatus.UNAUTHORIZED,
                                  "Valid bearer token required",
                                  r.getRequestURI(),
                                  java.util.List.of())));
                }))
        .exceptionHandling(e ->
            e.authenticationEntryPoint(
                    (r, s, x) -> {
                      s.setStatus(401);
                      s.setHeader("WWW-Authenticate", "Bearer");
                      s.setContentType("application/json");
                      s.getWriter()
                          .write(
                              mapper.writeValueAsString(
                                  ApiErrors.body(
                                      HttpStatus.UNAUTHORIZED,
                                      "Valid bearer token required",
                                      r.getRequestURI(),
                                      java.util.List.of())));
                    })
                .accessDeniedHandler((r, s, x) -> {
                  s.setStatus(403);
                  s.setContentType("application/json");
                  s.getWriter()
                      .write(
                          mapper.writeValueAsString(
                              ApiErrors.body(
                                  HttpStatus.FORBIDDEN,
                                  "Access denied",
                                  r.getRequestURI(),
                                  java.util.List.of())));
                }));
    return http.build();
  }
}
```


## src/main/java/com/example/taskmanagement/controller/ApiController.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/controller/ApiController.java`

Why: Exposes the REST endpoints, HTTP status codes, path/query parameters, and request validation.

Connections: JWT subjects identify actors; all domain operations are delegated to services.

Verify: Use Swagger or run ApiIntegrationTests.

```java
package com.example.taskmanagement.controller;

import com.example.taskmanagement.auth.AuthService;
import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.service.*;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.*;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final AuthService auth;
  private final UserService users;
  private final ProjectService projects;
  private final TaskService tasks;
  private final com.example.taskmanagement.notification.NotificationService notifications;

  public ApiController(
      AuthService a,
      UserService u,
      ProjectService p,
      TaskService t,
      com.example.taskmanagement.notification.NotificationService n) {
    auth = a;
    users = u;
    projects = p;
    tasks = t;
    notifications = n;
  }

  private Long actor(Jwt jwt) {
    try {
      return Long.valueOf(jwt.getSubject());
    } catch (RuntimeException e) {
      throw new com.example.taskmanagement.exception.ApiException(
          HttpStatus.UNAUTHORIZED, "Invalid token subject");
    }
  }

  @PostMapping("/auth/register")
  @ResponseStatus(HttpStatus.CREATED)
  public UserView register(@Valid @RequestBody Register input) {
    return auth.register(input);
  }

  @PostMapping("/auth/login")
  public Token login(@Valid @RequestBody Login input) {
    return auth.login(input);
  }

  @GetMapping("/users/me")
  public UserView me(@AuthenticationPrincipal Jwt jwt) {
    return users.me(actor(jwt));
  }

  @GetMapping("/admin/users")
  public PageView<UserView> users(
      @AuthenticationPrincipal Jwt jwt,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    return PageView.of(users.list(actor(jwt), page, size));
  }

  @PatchMapping("/admin/users/{id}/role")
  public UserView role(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody RoleInput input) {
    return users.role(actor(jwt), id, input);
  }

  @PostMapping("/projects")
  public ResponseEntity<ProjectView> createProject(
      @AuthenticationPrincipal Jwt jwt, @Valid @RequestBody ProjectInput input) {
    var view = projects.create(actor(jwt), input);
    return ResponseEntity.created(java.net.URI.create("/api/projects/" + view.id())).body(view);
  }

  @GetMapping("/projects")
  public List<ProjectView> projects(@AuthenticationPrincipal Jwt jwt) {
    return projects.list(actor(jwt));
  }

  @GetMapping("/projects/{id}")
  public ProjectView project(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return projects.get(actor(jwt), id);
  }

  @PutMapping("/projects/{id}")
  public ProjectView updateProject(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody ProjectInput input) {
    return projects.update(actor(jwt), id, input);
  }

  @PostMapping("/projects/{id}/members")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void member(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody MemberInput input) {
    projects.addMember(actor(jwt), id, input);
  }

  @GetMapping("/projects/{id}/members")
  public List<MemberView> members(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return projects.members(actor(jwt), id);
  }

  @DeleteMapping("/projects/{id}/members/{userId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void removeMember(
      @AuthenticationPrincipal Jwt jwt, @PathVariable Long id, @PathVariable Long userId) {
    projects.removeMember(actor(jwt), id, userId);
  }

  @PostMapping("/projects/{id}/tasks")
  public ResponseEntity<TaskView> createTask(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody TaskInput input) {
    var view = tasks.create(actor(jwt), id, input);
    return ResponseEntity.created(java.net.URI.create("/api/tasks/" + view.id())).body(view);
  }

  @GetMapping("/projects/{id}/tasks")
  public PageView<TaskView> tasks(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @RequestParam(required = false) TaskStatus status,
      @RequestParam(required = false) Priority priority,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Long assigneeId,
      @RequestParam(required = false) LocalDate dueBefore,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size,
      @RequestParam(defaultValue = "dueDate,asc") String sort) {
    return PageView.of(
        tasks.list(
            actor(jwt), id, status, priority, search, assigneeId, dueBefore, page, size, sort));
  }

  @GetMapping("/tasks/{id}")
  public TaskView task(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return tasks.get(actor(jwt), id);
  }

  @PatchMapping("/tasks/{id}")
  public TaskView updateTask(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody TaskPatch input) {
    return tasks.update(actor(jwt), id, input);
  }

  @DeleteMapping("/tasks/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTask(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    tasks.delete(actor(jwt), id);
  }

  @GetMapping("/notifications")
  public PageView<NotificationView> notifications(
      @AuthenticationPrincipal Jwt jwt,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    return PageView.of(notifications.list(actor(jwt), page, size));
  }
}
```


## src/main/java/com/example/taskmanagement/dto/Api.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/dto/Api.java`

Why: Defines validated request records and explicit response records, including a stable pagination envelope.

Connections: Controllers bind these records; services map managed entities to them within transactions.

Verify: Run HTTP tests for validation, profiles, filters, and pagination.

```java
package com.example.taskmanagement.dto;

import com.example.taskmanagement.entity.*;
import jakarta.validation.constraints.*;
import java.time.*;

public final class Api {
  private Api() {}

  public record PageView<T>(
      java.util.List<T> content,
      long totalElements,
      int totalPages,
      int number,
      int size,
      boolean first,
      boolean last) {
    public static <T> PageView<T> of(org.springframework.data.domain.Page<T> page) {
      return new PageView<>(
          page.getContent(),
          page.getTotalElements(),
          page.getTotalPages(),
          page.getNumber(),
          page.getSize(),
          page.isFirst(),
          page.isLast());
    }
  }

  public record Register(
      @NotBlank @Size(max = 100) String name,
      @NotBlank @Email @Size(max = 254) String email,
      @NotBlank @Size(min = 12, max = 72) String password) {}

  public record Login(@NotBlank @Email String email, @NotBlank String password) {}

  public record Token(String accessToken, String tokenType, long expiresIn) {}

  public record UserView(Long id, String name, String email, Role role, Instant createdAt) {
    public static UserView of(User u) {
      return new UserView(u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getCreatedAt());
    }
  }

  public record ProjectInput(
      @NotBlank @Size(max = 150) String name, @Size(max = 4000) String description) {}

  public record MemberInput(@NotNull Long userId, @NotNull MembershipRole membershipRole) {}

  public record MemberView(Long userId, String name, MembershipRole membershipRole) {}

  public record RoleInput(@NotNull Role role) {}

  public record ProjectView(
      Long id, String name, String description, Long ownerId, Instant createdAt) {
    public static ProjectView of(Project p) {
      return new ProjectView(
          p.getId(), p.getName(), p.getDescription(), p.getOwner().getId(), p.getCreatedAt());
    }
  }

  public record TaskInput(
      @NotBlank @Size(max = 200) String title,
      @Size(max = 4000) String description,
      @NotNull Priority priority,
      @FutureOrPresent LocalDate dueDate,
      Long assigneeId) {}

  public record TaskPatch(
      @NotNull @PositiveOrZero Long version,
      @Size(min = 1, max = 200) String title,
      @Size(max = 4000) String description,
      TaskStatus status,
      Priority priority,
      @FutureOrPresent LocalDate dueDate,
      Long assigneeId,
      Boolean clearAssignee,
      Boolean clearDueDate) {}

  public record TaskView(
      Long id,
      Long projectId,
      String title,
      String description,
      TaskStatus status,
      Priority priority,
      LocalDate dueDate,
      Long assigneeId,
      Long creatorId,
      Instant createdAt,
      Instant updatedAt,
      Long version) {
    public static TaskView of(Task t) {
      return new TaskView(
          t.getId(),
          t.project.getId(),
          t.title,
          t.description,
          t.status,
          t.priority,
          t.dueDate,
          t.assignee == null ? null : t.assignee.getId(),
          t.creator.getId(),
          t.createdAt,
          t.updatedAt,
          t.version);
    }
  }

  public record NotificationView(
      Long id,
      Long taskId,
      String message,
      NotificationStatus status,
      Instant createdAt,
      Instant deliveredAt,
      int attempts,
      String lastError) {
    public static NotificationView of(Notification n) {
      return new NotificationView(
          n.getId(),
          n.task.getId(),
          n.message,
          n.status,
          n.createdAt,
          n.deliveredAt,
          n.attempts,
          n.lastError);
    }
  }
}
```


## src/main/java/com/example/taskmanagement/entity/MembershipRole.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/MembershipRole.java`

Why: Defines the allowed MembershipRole values used by the domain and validated JSON inputs.

Connections: DTOs, services, and persistent entities share this enum; matching database CHECK constraints reject invalid stored values.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

public enum MembershipRole {
  MEMBER,
  MANAGER
}
```


## src/main/java/com/example/taskmanagement/entity/Notification.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/Notification.java`

Why: Maps Notification domain state to a database table with JPA.

Connections: The matching repository persists it, services apply business policy, and response DTOs expose selected fields. Lazy relationship getters must be used inside transactions.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "notifications")
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "recipient_id")
  public User recipient;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "task_id")
  public Task task;

  @Column(nullable = false, length = 500)
  public String message;

  @Column(nullable = false, unique = true)
  public String eventKey;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public NotificationStatus status = NotificationStatus.PENDING;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Instant deliveredAt;

  @Column(nullable = false)
  public int attempts;

  public Instant nextAttemptAt;

  @Column(length = 500)
  public String lastError;

  public Long getId() {
    return id;
  }

  public User getRecipient() {
    return recipient;
  }

  public Task getTask() {
    return task;
  }

  public String getMessage() {
    return message;
  }

  public String getEventKey() {
    return eventKey;
  }

  public NotificationStatus getStatus() {
    return status;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getDeliveredAt() {
    return deliveredAt;
  }

  public int getAttempts() {
    return attempts;
  }

  public Instant getNextAttemptAt() {
    return nextAttemptAt;
  }

  public String getLastError() {
    return lastError;
  }
}
```


## src/main/java/com/example/taskmanagement/entity/NotificationStatus.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/NotificationStatus.java`

Why: Defines the allowed NotificationStatus values used by the domain and validated JSON inputs.

Connections: DTOs, services, and persistent entities share this enum; matching database CHECK constraints reject invalid stored values.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

public enum NotificationStatus {
  PENDING,
  DELIVERED,
  FAILED
}
```


## src/main/java/com/example/taskmanagement/entity/Priority.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/Priority.java`

Why: Defines the allowed Priority values used by the domain and validated JSON inputs.

Connections: DTOs, services, and persistent entities share this enum; matching database CHECK constraints reject invalid stored values.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

public enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT
}
```


## src/main/java/com/example/taskmanagement/entity/Project.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/Project.java`

Why: Maps Project domain state to a database table with JPA.

Connections: The matching repository persists it, services apply business policy, and response DTOs expose selected fields. Lazy relationship getters must be used inside transactions.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "projects")
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 150)
  public String name;

  @Column(length = 4000)
  public String description;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "owner_id")
  public User owner;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public User getOwner() {
    return owner;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
```


## src/main/java/com/example/taskmanagement/entity/ProjectMembership.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/ProjectMembership.java`

Why: Maps ProjectMembership domain state to a database table with JPA.

Connections: The matching repository persists it, services apply business policy, and response DTOs expose selected fields. Lazy relationship getters must be used inside transactions.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(
    name = "project_memberships",
    uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "user_id"}))
public class ProjectMembership {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  public Project project;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id")
  public User user;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public MembershipRole membershipRole;

  public Long getId() {
    return id;
  }

  public Project getProject() {
    return project;
  }

  public User getUser() {
    return user;
  }

  public MembershipRole getMembershipRole() {
    return membershipRole;
  }
}
```


## src/main/java/com/example/taskmanagement/entity/Role.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/Role.java`

Why: Defines the allowed Role values used by the domain and validated JSON inputs.

Connections: DTOs, services, and persistent entities share this enum; matching database CHECK constraints reject invalid stored values.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

public enum Role {
  USER,
  MANAGER,
  ADMIN
}
```


## src/main/java/com/example/taskmanagement/entity/Task.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/Task.java`

Why: Maps Task domain state to a database table with JPA.

Connections: The matching repository persists it, services apply business policy, and response DTOs expose selected fields. Lazy relationship getters must be used inside transactions.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  public Project project;

  @Column(nullable = false, length = 200)
  public String title;

  @Column(length = 4000)
  public String description;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public TaskStatus status = TaskStatus.TODO;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public Priority priority;

  public LocalDate dueDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assignee_id")
  public User assignee;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "creator_id")
  public User creator;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  @Column(nullable = false)
  public Instant updatedAt = Instant.now();

  @Version public Long version;

  @PreUpdate
  void updated() {
    updatedAt = Instant.now();
  }

  public Long getId() {
    return id;
  }

  public Project getProject() {
    return project;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public TaskStatus getStatus() {
    return status;
  }

  public Priority getPriority() {
    return priority;
  }

  public LocalDate getDueDate() {
    return dueDate;
  }

  public User getAssignee() {
    return assignee;
  }

  public User getCreator() {
    return creator;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public Long getVersion() {
    return version;
  }
}
```


## src/main/java/com/example/taskmanagement/entity/TaskStatus.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/TaskStatus.java`

Why: Defines the allowed TaskStatus values used by the domain and validated JSON inputs.

Connections: DTOs, services, and persistent entities share this enum; matching database CHECK constraints reject invalid stored values.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

public enum TaskStatus {
  TODO,
  IN_PROGRESS,
  BLOCKED,
  DONE
}
```


## src/main/java/com/example/taskmanagement/entity/User.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/entity/User.java`

Why: Maps User domain state to a database table with JPA.

Connections: The matching repository persists it, services apply business policy, and response DTOs expose selected fields. Lazy relationship getters must be used inside transactions.

Verify: Run clean verify to exercise Flyway schema validation and repository-backed HTTP tests.

```java
package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "app_users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 100)
  public String name;

  @Column(nullable = false, unique = true, length = 254)
  public String email;

  @Column(nullable = false)
  public String passwordHash;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public Role role = Role.USER;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public Role getRole() {
    return role;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
```


## src/main/java/com/example/taskmanagement/exception/ApiErrors.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/exception/ApiErrors.java`

Why: Handles validation, authentication, authorization, database, concurrency, and framework errors consistently.

Connections: Controller advice handles request/service failures; SecurityConfig reuses the same body format in filters.

Verify: Run HTTP tests for 400, 401, 403, 404, and 409.

```java
package com.example.taskmanagement.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import org.springframework.dao.*;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiErrors {
  public record ErrorBody(
      Instant timestamp,
      int status,
      String code,
      String message,
      String path,
      List<String> details) {}

  public static ErrorBody body(
      HttpStatus status, String message, String path, List<String> details) {
    return new ErrorBody(Instant.now(), status.value(), status.name(), message, path, details);
  }

  @ExceptionHandler(ApiException.class)
  ResponseEntity<ErrorBody> api(ApiException e, HttpServletRequest r) {
    return response(e.status, e.getMessage(), r, List.of());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ErrorBody> validation(MethodArgumentNotValidException e, HttpServletRequest r) {
    return response(
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        r,
        e.getBindingResult().getFieldErrors().stream()
            .map(f -> f.getField() + ": " + f.getDefaultMessage())
            .toList());
  }

  @ExceptionHandler({
    org.springframework.http.converter.HttpMessageNotReadableException.class,
    org.springframework.web.method.annotation.MethodArgumentTypeMismatchException.class,
    IllegalArgumentException.class
  })
  ResponseEntity<ErrorBody> bad(Exception e, HttpServletRequest r) {
    return response(HttpStatus.BAD_REQUEST, "Invalid request value", r, List.of());
  }

  @ExceptionHandler(AuthenticationException.class)
  ResponseEntity<ErrorBody> auth(Exception e, HttpServletRequest r) {
    return response(HttpStatus.UNAUTHORIZED, "Invalid credentials", r, List.of());
  }

  @ExceptionHandler(AccessDeniedException.class)
  ResponseEntity<ErrorBody> denied(Exception e, HttpServletRequest r) {
    return response(HttpStatus.FORBIDDEN, "Access denied", r, List.of());
  }

  @ExceptionHandler({
    org.springframework.orm.ObjectOptimisticLockingFailureException.class,
    jakarta.persistence.OptimisticLockException.class
  })
  ResponseEntity<ErrorBody> conflict(Exception e, HttpServletRequest r) {
    return response(HttpStatus.CONFLICT, "Concurrent update; reload and retry", r, List.of());
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  ResponseEntity<ErrorBody> integrity(Exception e, HttpServletRequest r) {
    return response(HttpStatus.CONFLICT, "Record conflicts with existing data", r, List.of());
  }

  @ExceptionHandler({
    org.springframework.web.servlet.resource.NoResourceFoundException.class,
    org.springframework.web.HttpRequestMethodNotSupportedException.class,
    org.springframework.web.bind.MissingServletRequestParameterException.class,
    org.springframework.web.HttpMediaTypeNotSupportedException.class
  })
  ResponseEntity<ErrorBody> framework(Exception e, HttpServletRequest r) {
    var error = (org.springframework.web.ErrorResponse) e;
    var status = HttpStatus.valueOf(error.getStatusCode().value());
    return response(status, status.getReasonPhrase(), r, List.of());
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ErrorBody> unexpected(Exception e, HttpServletRequest r) {
    org.slf4j.LoggerFactory.getLogger(ApiErrors.class).error("Unhandled request failure", e);
    return response(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error", r, List.of());
  }

  private ResponseEntity<ErrorBody> response(
      HttpStatus s, String m, HttpServletRequest r, List<String> d) {
    return ResponseEntity.status(s).body(body(s, m, r.getRequestURI(), d));
  }
}
```


## src/main/java/com/example/taskmanagement/exception/ApiException.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/exception/ApiException.java`

Why: Carries an intentional HTTP status and safe application error message.

Connections: Services throw it; ApiErrors translates it into the common JSON error response.

Verify: Exercise forbidden project access, stale versions, or missing task IDs.

```java
package com.example.taskmanagement.exception;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {
  public final HttpStatus status;

  public ApiException(HttpStatus status, String message) {
    super(message);
    this.status = status;
  }
}
```


## src/main/java/com/example/taskmanagement/notification/NotificationDelivery.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/notification/NotificationDelivery.java`

Why: Defines the in-app delivery boundary, with logging and no external service dependency.

Connections: NotificationWorker invokes this adapter; the integration test spies on it to simulate failures.

Verify: Run the notification test and inspect the recorded delivery and retry state.

```java
package com.example.taskmanagement.notification;

import com.example.taskmanagement.entity.Notification;
import org.springframework.stereotype.Component;

/** In-app delivery adapter. Replace this boundary if adding an external channel. */
@Component
public class NotificationDelivery {
  public void deliver(Notification notification) {
    org.slf4j.LoggerFactory.getLogger(getClass())
        .info(
            "Delivering in-app notification {} to user {}",
            notification.getId(),
            notification.recipient.getId());
  }
}
```


## src/main/java/com/example/taskmanagement/notification/NotificationService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/notification/NotificationService.java`

Why: Creates durable idempotent overdue events and lists only the current user notifications.

Connections: Called by the scanner in a separate per-event transaction; maps rows into NotificationView.

Verify: Run overdueIdempotencyAsyncFailureAndRetry.

```java
package com.example.taskmanagement.notification;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.repository.*;
import com.example.taskmanagement.service.*;
import java.time.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {
  private final NotificationRepository notifications;
  private final TaskRepository tasks;
  private final AccessService access;

  public NotificationService(NotificationRepository n, TaskRepository t, AccessService a) {
    notifications = n;
    tasks = t;
    access = a;
  }

  @Transactional(readOnly = true)
  public Page<NotificationView> list(Long actor, int page, int size) {
    access.user(actor);
    return notifications
        .findByRecipientId(actor, TaskService.pageable(page, size, "createdAt,desc"))
        .map(NotificationView::of);
  }

  @Transactional
  public void createOverdue(Long taskId) {
    Task t = tasks.findById(taskId).orElse(null);
    if (t == null
        || t.dueDate == null
        || !t.dueDate.isBefore(LocalDate.now(ZoneOffset.UTC))
        || t.status == TaskStatus.DONE) return;
    User recipient = t.assignee == null ? t.creator : t.assignee;
    if (!access.isMember(t.project, recipient)) return;
    String key = t.getId() + ":" + t.dueDate + ":" + recipient.getId();
    if (notifications.existsByEventKey(key)) return;
    Notification n = new Notification();
    n.task = t;
    n.recipient = recipient;
    n.eventKey = key;
    n.message = "Task #" + t.getId() + " is overdue (due " + t.dueDate + ")";
    notifications.saveAndFlush(n);
  }
}
```


## src/main/java/com/example/taskmanagement/notification/NotificationWorker.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/notification/NotificationWorker.java`

Why: Processes notifications asynchronously with row locks, retry state, and a five-attempt cap.

Connections: Uses the named executor, NotificationRepository, and NotificationDelivery in a transaction.

Verify: Run overdueIdempotencyAsyncFailureAndRetry; repeated dispatch must not redeliver completed rows.

```java
package com.example.taskmanagement.notification;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.repository.NotificationRepository;
import java.time.Instant;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationWorker {
  private final NotificationRepository notifications;
  private final NotificationDelivery delivery;

  public NotificationWorker(NotificationRepository n, NotificationDelivery d) {
    notifications = n;
    delivery = d;
  }

  @Async("notificationExecutor")
  @Transactional
  public void process(Long id) {
    var n = notifications.lock(id).orElse(null);
    Instant now = Instant.now();
    if (n == null
        || n.status == NotificationStatus.DELIVERED
        || n.attempts >= 5
        || (n.nextAttemptAt != null && n.nextAttemptAt.isAfter(now))) return;
    n.attempts++;
    try {
      delivery.deliver(n);
      n.status = NotificationStatus.DELIVERED;
      n.deliveredAt = now;
      n.lastError = null;
      n.nextAttemptAt = null;
    } catch (Exception e) {
      n.status = NotificationStatus.FAILED;
      n.lastError = e.getClass().getSimpleName();
      n.nextAttemptAt = now.plusSeconds(Math.min(3600, 30L * (1L << n.attempts)));
      org.slf4j.LoggerFactory.getLogger(getClass())
          .error("Notification {} failed on attempt {}", id, n.attempts, e);
    }
  }
}
```


## src/main/java/com/example/taskmanagement/repository/NotificationRepository.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/repository/NotificationRepository.java`

Why: Provides typed JPA persistence and domain queries for Notification.

Connections: Spring Data creates the implementation at runtime; transactional services call it through dependency injection.

Verify: Run clean verify; integration tests use these real repositories against H2.

```java
package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  void deleteByTaskId(Long taskId);

  boolean existsByEventKey(String eventKey);

  Page<Notification> findByRecipientId(Long recipientId, Pageable pageable);

  @Query(
      "select n.id from Notification n where n.status <>"
          + " com.example.taskmanagement.entity.NotificationStatus.DELIVERED and n.attempts < 5 and"
          + " (n.nextAttemptAt is null or n.nextAttemptAt <= :now)")
  List<Long> pending(@Param("now") Instant now, Pageable pageable);

  @Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
  @Query("select n from Notification n where n.id=:id")
  Optional<Notification> lock(@Param("id") Long id);
}
```


## src/main/java/com/example/taskmanagement/repository/ProjectMembershipRepository.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/repository/ProjectMembershipRepository.java`

Why: Provides typed JPA persistence and domain queries for ProjectMembership.

Connections: Spring Data creates the implementation at runtime; transactional services call it through dependency injection.

Verify: Run clean verify; integration tests use these real repositories against H2.

```java
package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, Long> {
  Optional<ProjectMembership> findByProjectIdAndUserId(Long projectId, Long userId);

  boolean existsByProjectIdAndUserId(Long projectId, Long userId);

  List<ProjectMembership> findByProjectId(Long projectId);
}
```


## src/main/java/com/example/taskmanagement/repository/ProjectRepository.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/repository/ProjectRepository.java`

Why: Provides typed JPA persistence and domain queries for Project.

Connections: Spring Data creates the implementation at runtime; transactional services call it through dependency injection.

Verify: Run clean verify; integration tests use these real repositories against H2.

```java
package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  @Query(
      "select p from Project p where p.owner.id=:userId or exists (select m.id from"
          + " ProjectMembership m where m.project=p and m.user.id=:userId)")
  List<Project> accessible(@Param("userId") Long userId);
}
```


## src/main/java/com/example/taskmanagement/repository/TaskRepository.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/repository/TaskRepository.java`

Why: Provides typed JPA persistence and domain queries for Task.

Connections: Spring Data creates the implementation at runtime; transactional services call it through dependency injection.

Verify: Run clean verify; integration tests use these real repositories against H2.

```java
package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
  List<Task> findByProjectIdAndAssigneeId(Long projectId, Long assigneeId);

  List<Task> findByDueDateBeforeAndStatusNot(LocalDate date, TaskStatus status);
}
```


## src/main/java/com/example/taskmanagement/repository/UserRepository.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/repository/UserRepository.java`

Why: Provides typed JPA persistence and domain queries for User.

Connections: Spring Data creates the implementation at runtime; transactional services call it through dependency injection.

Verify: Run clean verify; integration tests use these real repositories against H2.

```java
package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);
}
```


## src/main/java/com/example/taskmanagement/scheduler/OverdueScheduler.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/scheduler/OverdueScheduler.java`

Why: Schedules overdue scanning and durable work dispatch on independent fixed delays.

Connections: Calls NotificationService and the proxied async worker; catches per-event and submission failures.

Verify: Run the notification test; configure APP_JOBS_* variables to adjust local intervals.

```java
package com.example.taskmanagement.scheduler;

import com.example.taskmanagement.entity.TaskStatus;
import com.example.taskmanagement.notification.*;
import com.example.taskmanagement.repository.*;
import java.time.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OverdueScheduler {
  private final TaskRepository tasks;
  private final NotificationService service;
  private final NotificationRepository notifications;
  private final NotificationWorker worker;
  private final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(getClass());

  public OverdueScheduler(
      TaskRepository t, NotificationService s, NotificationRepository n, NotificationWorker w) {
    tasks = t;
    service = s;
    notifications = n;
    worker = w;
  }

  @Scheduled(
      fixedDelayString = "${app.jobs.overdue-delay-ms:300000}",
      initialDelayString = "${app.jobs.initial-delay-ms:30000}")
  public void scan() {
    for (var task :
        tasks.findByDueDateBeforeAndStatusNot(LocalDate.now(ZoneOffset.UTC), TaskStatus.DONE)) {
      try {
        service.createOverdue(task.getId());
      } catch (org.springframework.dao.DataIntegrityViolationException duplicate) {
        log.debug("Overdue event already recorded for task {}", task.getId());
      } catch (Exception e) {
        log.error("Overdue scan failed for task {}", task.getId(), e);
      }
    }
  }

  @Scheduled(
      fixedDelayString = "${app.jobs.delivery-delay-ms:10000}",
      initialDelayString = "${app.jobs.initial-delay-ms:30000}")
  public void dispatch() {
    for (Long id : notifications.pending(Instant.now(), PageRequest.of(0, 100))) {
      try {
        worker.process(id);
      } catch (org.springframework.core.task.TaskRejectedException busy) {
        log.warn("Notification executor full; pending work will retry");
        break;
      }
    }
  }
}
```


## src/main/java/com/example/taskmanagement/service/AccessService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/service/AccessService.java`

Why: Centralizes record-level project membership, ownership, delegated management, and administrator checks.

Connections: ProjectService, TaskService, UserService, and NotificationService use this policy.

Verify: Run AccessServiceTests, projectIsolationMembershipAndTaskPermissions, and adminAndDelegatedManager.

```java
package com.example.taskmanagement.service;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AccessService {
  private final UserRepository users;
  private final ProjectRepository projects;
  private final ProjectMembershipRepository members;

  public AccessService(UserRepository u, ProjectRepository p, ProjectMembershipRepository m) {
    users = u;
    projects = p;
    members = m;
  }

  public User user(Long id) {
    return users
        .findById(id)
        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "User no longer exists"));
  }

  public void admin(User u) {
    require(u.getRole() == Role.ADMIN);
  }

  public Project project(Long id, User u) {
    Project p =
        projects
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project not found"));
    require(isMember(p, u));
    return p;
  }

  public boolean isMember(Project p, User u) {
    return u.getRole() == Role.ADMIN
        || p.getOwner().getId().equals(u.getId())
        || members.existsByProjectIdAndUserId(p.getId(), u.getId());
  }

  public boolean manages(Project p, User u) {
    return u.getRole() == Role.ADMIN
        || p.getOwner().getId().equals(u.getId())
        || (u.getRole() == Role.MANAGER
            && members
                .findByProjectIdAndUserId(p.getId(), u.getId())
                .map(m -> m.getMembershipRole() == MembershipRole.MANAGER)
                .orElse(false));
  }

  public void manager(Project p, User u) {
    require(manages(p, u));
  }

  public void assignee(Project p, User u) {
    require(
        p.getOwner().getId().equals(u.getId())
            || members.existsByProjectIdAndUserId(p.getId(), u.getId()));
  }

  public static void require(boolean allowed) {
    if (!allowed) throw new ApiException(HttpStatus.FORBIDDEN, "Access denied");
  }
}
```


## src/main/java/com/example/taskmanagement/service/ProjectService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/service/ProjectService.java`

Why: Manages projects and membership in transactions, including unassignment on member removal.

Connections: Uses AccessService and the project, membership, user, and task repositories.

Verify: Run projectIsolationMembershipAndTaskPermissions and adminAndDelegatedManager.

```java
package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {
  private final AccessService access;
  private final ProjectRepository projects;
  private final ProjectMembershipRepository members;
  private final UserRepository users;
  private final TaskRepository tasks;

  public ProjectService(
      AccessService a,
      ProjectRepository p,
      ProjectMembershipRepository m,
      UserRepository u,
      TaskRepository t) {
    access = a;
    projects = p;
    members = m;
    users = u;
    tasks = t;
  }

  public ProjectView create(Long actor, ProjectInput input) {
    User u = access.user(actor);
    Project p = new Project();
    p.name = input.name().trim();
    p.description = input.description();
    p.owner = u;
    projects.save(p);
    ProjectMembership m = new ProjectMembership();
    m.project = p;
    m.user = u;
    m.membershipRole = MembershipRole.MANAGER;
    members.save(m);
    return ProjectView.of(p);
  }

  @Transactional(readOnly = true)
  public List<ProjectView> list(Long actor) {
    User u = access.user(actor);
    return (u.getRole() == Role.ADMIN ? projects.findAll() : projects.accessible(actor))
        .stream().map(ProjectView::of).toList();
  }

  @Transactional(readOnly = true)
  public ProjectView get(Long actor, Long id) {
    return ProjectView.of(access.project(id, access.user(actor)));
  }

  public ProjectView update(Long actor, Long id, ProjectInput input) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    p.name = input.name().trim();
    p.description = input.description();
    return ProjectView.of(p);
  }

  public void addMember(Long actor, Long id, MemberInput input) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    User member =
        users
            .findById(input.userId())
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    if (input.membershipRole() == MembershipRole.MANAGER && member.getRole() == Role.USER)
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "Manager membership requires MANAGER or ADMIN user role");
    var m = members.findByProjectIdAndUserId(id, member.getId()).orElseGet(ProjectMembership::new);
    m.project = p;
    m.user = member;
    m.membershipRole = input.membershipRole();
    members.save(m);
  }

  @Transactional(readOnly = true)
  public List<MemberView> members(Long actor, Long id) {
    access.project(id, access.user(actor));
    return members.findByProjectId(id).stream()
        .map(m -> new MemberView(m.user.getId(), m.user.getName(), m.membershipRole))
        .toList();
  }

  public void removeMember(Long actor, Long id, Long memberId) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    if (p.owner.getId().equals(memberId))
      throw new ApiException(HttpStatus.BAD_REQUEST, "Cannot remove project owner");
    var m =
        members
            .findByProjectIdAndUserId(id, memberId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Membership not found"));
    for (var t : tasks.findByProjectIdAndAssigneeId(id, memberId)) {
      t.assignee = null;
    }
    members.delete(m);
  }
}
```


## src/main/java/com/example/taskmanagement/service/TaskService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/service/TaskService.java`

Why: Implements authorized task CRUD, legal status transitions, filtering, sorting, and optimistic concurrency.

Connections: Uses AccessService, JPA Specifications, entity versions, and repositories; returns TaskView DTOs.

Verify: Run filteringPaginationTransitionsAndConflict and simultaneousUpdatesHaveOneWinner.

```java
package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskService {
  private final AccessService access;
  private final TaskRepository tasks;
  private final UserRepository users;
  private final NotificationRepository notifications;

  public TaskService(
      AccessService a, TaskRepository t, UserRepository u, NotificationRepository n) {
    access = a;
    tasks = t;
    users = u;
    notifications = n;
  }

  public TaskView create(Long actor, Long projectId, TaskInput input) {
    User u = access.user(actor);
    Project p = access.project(projectId, u);
    Task t = new Task();
    t.project = p;
    t.creator = u;
    t.title = input.title().trim();
    t.description = input.description();
    t.priority = input.priority();
    t.dueDate = input.dueDate();
    if (input.assigneeId() != null) {
      access.manager(p, u);
      t.assignee = assignee(p, input.assigneeId());
    }
    return TaskView.of(tasks.saveAndFlush(t));
  }

  @Transactional(readOnly = true)
  public TaskView get(Long actor, Long id) {
    return TaskView.of(authorized(actor, id));
  }

  private Task authorized(Long actor, Long id) {
    Task t =
        tasks
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Task not found"));
    access.project(t.project.getId(), access.user(actor));
    return t;
  }

  public TaskView update(Long actor, Long id, TaskPatch input) {
    Task t = authorized(actor, id);
    User u = access.user(actor);
    boolean manager = access.manages(t.project, u);
    AccessService.require(
        manager
            || t.creator.getId().equals(u.getId())
            || (t.assignee != null && t.assignee.getId().equals(u.getId())));
    if (!Objects.equals(input.version(), t.version))
      throw new ApiException(HttpStatus.CONFLICT, "Concurrent update; reload and retry");
    if (input.assigneeId() != null || Boolean.TRUE.equals(input.clearAssignee())) {
      access.manager(t.project, u);
      if (input.assigneeId() != null && Boolean.TRUE.equals(input.clearAssignee()))
        throw new ApiException(HttpStatus.BAD_REQUEST, "Conflicting assignee fields");
      t.assignee =
          Boolean.TRUE.equals(input.clearAssignee())
              ? null
              : assignee(t.project, input.assigneeId());
    }
    if (input.title() != null) {
      if (input.title().isBlank())
        throw new ApiException(HttpStatus.BAD_REQUEST, "Title cannot be blank");
      t.title = input.title().trim();
    }
    if (input.description() != null) t.description = input.description();
    if (input.priority() != null) t.priority = input.priority();
    if (input.dueDate() != null && Boolean.TRUE.equals(input.clearDueDate()))
      throw new ApiException(HttpStatus.BAD_REQUEST, "Conflicting due-date fields");
    if (Boolean.TRUE.equals(input.clearDueDate())) t.dueDate = null;
    else if (input.dueDate() != null) t.dueDate = input.dueDate();
    if (input.status() != null && input.status() != t.status) {
      if (!transitions(t.status).contains(input.status()))
        throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid status transition");
      t.status = input.status();
    }
    t.updatedAt = Instant.now();
    return TaskView.of(tasks.saveAndFlush(t));
  }

  static Set<TaskStatus> transitions(TaskStatus from) {
    return switch (from) {
      case TODO -> Set.of(TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED);
      case IN_PROGRESS -> Set.of(TaskStatus.BLOCKED, TaskStatus.DONE);
      case BLOCKED -> Set.of(TaskStatus.TODO, TaskStatus.IN_PROGRESS);
      case DONE -> Set.of(TaskStatus.TODO);
    };
  }

  private User assignee(Project p, Long id) {
    User u =
        users
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Assignee not found"));
    access.assignee(p, u);
    return u;
  }

  public void delete(Long actor, Long id) {
    Task t = authorized(actor, id);
    access.manager(t.project, access.user(actor));
    notifications.deleteByTaskId(id);
    tasks.delete(t);
  }

  @Transactional(readOnly = true)
  public Page<TaskView> list(
      Long actor,
      Long projectId,
      TaskStatus status,
      Priority priority,
      String search,
      Long assigneeId,
      LocalDate dueBefore,
      int page,
      int size,
      String sort) {
    access.project(projectId, access.user(actor));
    Pageable pageable = pageable(page, size, sort);
    Specification<Task> spec = (r, q, b) -> b.equal(r.get("project").get("id"), projectId);
    if (status != null) spec = spec.and((r, q, b) -> b.equal(r.get("status"), status));
    if (priority != null) spec = spec.and((r, q, b) -> b.equal(r.get("priority"), priority));
    if (assigneeId != null)
      spec = spec.and((r, q, b) -> b.equal(r.get("assignee").get("id"), assigneeId));
    if (dueBefore != null)
      spec = spec.and((r, q, b) -> b.lessThanOrEqualTo(r.get("dueDate"), dueBefore));
    if (search != null && !search.isBlank()) {
      String pattern =
          "%"
              + search
                  .toLowerCase(Locale.ROOT)
                  .replace("\\", "\\\\")
                  .replace("%", "\\%")
                  .replace("_", "\\_")
              + "%";
      spec =
          spec.and((r, q, b) ->
              b.or(
                  b.like(b.lower(r.get("title")), pattern, '\\'),
                  b.like(b.lower(r.get("description")), pattern, '\\')));
    }
    return tasks.findAll(spec, pageable).map(TaskView::of);
  }

  public static Pageable pageable(int page, int size, String sort) {
    if (page < 0 || size < 1 || size > 100)
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "page >= 0 and size between 1 and 100 required");
    String[] parts = sort.split(",", -1);
    if (parts.length != 2
        || !Set.of("id", "title", "status", "priority", "dueDate", "createdAt", "updatedAt")
            .contains(parts[0])
        || !Set.of("asc", "desc").contains(parts[1]))
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "Unsupported sort; use field,asc or field,desc");
    Sort order = Sort.by(Sort.Direction.fromString(parts[1]), parts[0]);
    if (!parts[0].equals("id")) order = order.and(Sort.by("id"));
    return PageRequest.of(page, size, order);
  }
}
```


## src/main/java/com/example/taskmanagement/service/UserService.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/service/UserService.java`

Why: Provides profiles and administrator-only user listing and role changes.

Connections: Uses AccessService to enforce permissions and UserRepository to load users.

Verify: Run registrationLoginAndValidation and adminAndDelegatedManager.

```java
package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
  private final AccessService access;
  private final UserRepository users;

  public UserService(AccessService a, UserRepository u) {
    access = a;
    users = u;
  }

  @Transactional(readOnly = true)
  public UserView me(Long id) {
    return UserView.of(access.user(id));
  }

  @Transactional(readOnly = true)
  public Page<UserView> list(Long actor, int page, int size) {
    access.admin(access.user(actor));
    return users.findAll(TaskService.pageable(page, size, "id,asc")).map(UserView::of);
  }

  public UserView role(Long actor, Long id, RoleInput input) {
    User admin = access.user(actor);
    access.admin(admin);
    if (actor.equals(id) && input.role() != Role.ADMIN)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Cannot demote your own admin account");
    User u =
        users
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    u.role = input.role();
    return UserView.of(u);
  }
}
```


## src/main/java/com/example/taskmanagement/TaskManagementApplication.java

Exact path: `D:/learning-hub/task-management/src/main/java/com/example/taskmanagement/TaskManagementApplication.java`

Why: Starts Spring Boot and scans the application package.

Connections: The Maven plugin launches this main class; configuration, controllers, repositories, and services become Spring beans.

Verify: Start the JAR and request /actuator/health.

```java
package com.example.taskmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskManagementApplication {

  public static void main(String[] args) {
    SpringApplication.run(TaskManagementApplication.class, args);
  }
}
```


## src/test/java/com/example/taskmanagement/ApiIntegrationTests.java

Exact path: `D:/learning-hub/task-management/src/test/java/com/example/taskmanagement/ApiIntegrationTests.java`

Why: Tests the entire HTTP request stack against real H2, Flyway, repositories, JWT security, and async execution.

Connections: Starts a random-port server; uses HttpClient and real signed tokens, with a delivery spy only for failure injection.

Verify: Run ./mvnw.cmd -Dtest=ApiIntegrationTests test.

```java
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
```


## src/test/java/com/example/taskmanagement/service/AccessServiceTests.java

Exact path: `D:/learning-hub/task-management/src/test/java/com/example/taskmanagement/service/AccessServiceTests.java`

Why: Tests service permission boundaries and status transition policy using Mockito repository doubles.

Connections: Instantiates AccessService independently of the web/database runtime.

Verify: Run ./mvnw.cmd -Dtest=AccessServiceTests test.

```java
package com.example.taskmanagement.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class AccessServiceTests {
  final UserRepository users = mock(UserRepository.class);
  final ProjectRepository projects = mock(ProjectRepository.class);
  final ProjectMembershipRepository memberships = mock(ProjectMembershipRepository.class);
  final AccessService access = new AccessService(users, projects, memberships);

  User user(long id, Role role) {
    User u = new User();
    u.id = id;
    u.role = role;
    return u;
  }

  Project project() {
    Project p = new Project();
    p.id = 1L;
    p.owner = user(1L, Role.USER);
    return p;
  }

  @Test
  void globalManagerRoleDoesNotGrantProjectAccess() {
    assertThat(access.manages(project(), user(2L, Role.MANAGER))).isFalse();
  }

  @Test
  void managerNeedsDelegationAndGlobalRole() {
    Project p = project();
    User u = user(2L, Role.MANAGER);
    ProjectMembership m = new ProjectMembership();
    m.membershipRole = MembershipRole.MANAGER;
    when(memberships.findByProjectIdAndUserId(1L, 2L)).thenReturn(Optional.of(m));
    assertThat(access.manages(p, u)).isTrue();
    u.role = Role.USER;
    assertThat(access.manages(p, u)).isFalse();
  }

  @Test
  void adminCannotBeAssignedWithoutMembership() {
    assertThatThrownBy(() -> access.assignee(project(), user(2L, Role.ADMIN)))
        .isInstanceOf(ApiException.class);
  }

  @Test
  void completedTaskMustBeReopenedBeforeWorkContinues() {
    assertThat(TaskService.transitions(TaskStatus.DONE)).containsExactly(TaskStatus.TODO);
    assertThat(TaskService.transitions(TaskStatus.TODO)).doesNotContain(TaskStatus.DONE);
  }
}
```


## src/test/java/com/example/taskmanagement/TaskManagementApplicationTests.java

Exact path: `D:/learning-hub/task-management/src/test/java/com/example/taskmanagement/TaskManagementApplicationTests.java`

Why: Checks that the complete Spring application context can start with the test profile.

Connections: Loads the same migration, entity mappings, security, and configuration as the application.

Verify: Run ./mvnw.cmd -Dtest=TaskManagementApplicationTests test.

```java
package com.example.taskmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@org.springframework.test.context.ActiveProfiles("test")
@SpringBootTest
class TaskManagementApplicationTests {

  @Test
  void contextLoads() {}
}
```


## src/main/resources/application.yml

Exact path: `D:/learning-hub/task-management/src/main/resources/application.yml`

Why: Configures file-backed H2, Flyway, schema validation, JWT environment values, and job delays.

Connections: Spring Boot binds datasource/security/job configuration during startup.

Verify: Supply JWT_SECRET, start the app, then restart and confirm data persists.

```yaml
spring:
  application:
    name: task-management
  datasource:
    url: ${DB_URL:jdbc:h2:file:./data/task-management;DB_CLOSE_ON_EXIT=FALSE}
    username: ${DB_USERNAME:sa}
    password: ${DB_PASSWORD:}
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
    properties:
      hibernate.jdbc.time_zone: UTC
  flyway:
    enabled: true
  jackson:
    deserialization:
      fail-on-unknown-properties: true
management:
  endpoints:
    web:
      exposure:
        include: health
  endpoint:
    health:
      show-details: never
app:
  jwt:
    secret: ${JWT_SECRET}
    issuer: ${JWT_ISSUER:task-management}
    audience: ${JWT_AUDIENCE:task-management-api}
    ttl-seconds: 900
  bootstrap-admin:
    email: ${BOOTSTRAP_ADMIN_EMAIL:}
    password: ${BOOTSTRAP_ADMIN_PASSWORD:}
  jobs:
    overdue-delay-ms: 300000
    delivery-delay-ms: 10000
    initial-delay-ms: 30000
```


## src/test/resources/application-test.yml

Exact path: `D:/learning-hub/task-management/src/test/resources/application-test.yml`

Why: Isolates tests with in-memory H2 and an explicitly test-only signing key.

Connections: @ActiveProfiles("test") merges these overrides with the main configuration.

Verify: Run clean verify without setting normal database or signing-key variables.

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:task-tests;DB_CLOSE_DELAY=-1
    username: sa
    password:
app:
  jwt:
    secret: dGVzdC1vbmx5LXNlY3JldC1tdXN0LWJlLTMydGVzdGJ5dGVzISE=
  jobs:
    initial-delay-ms: 3600000
```


## src/main/resources/db/migration/V1__initial_schema.sql

Exact path: `D:/learning-hub/task-management/src/main/resources/db/migration/V1__initial_schema.sql`

Why: Creates the H2 schema, relationships, indexes, and constraints under Flyway version control.

Connections: Entity mappings must match this schema because Hibernate is configured to validate.

Verify: Start against a fresh H2 database; inspect Flyway migration logs and health.

```sql
CREATE TABLE app_users (
 id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
 name VARCHAR(100) NOT NULL, email VARCHAR(254) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL, role VARCHAR(20) NOT NULL CHECK(role IN ('USER','MANAGER','ADMIN')),
 created_at TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE TABLE projects (
 id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
 name VARCHAR(150) NOT NULL, description VARCHAR(4000), owner_id BIGINT NOT NULL REFERENCES app_users(id),
 created_at TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE TABLE project_memberships (
 id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
 project_id BIGINT NOT NULL REFERENCES projects(id), user_id BIGINT NOT NULL REFERENCES app_users(id),
 membership_role VARCHAR(20) NOT NULL CHECK(membership_role IN ('MEMBER','MANAGER')),
 CONSTRAINT uk_project_user UNIQUE(project_id,user_id)
);
CREATE TABLE tasks (
 id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
 project_id BIGINT NOT NULL REFERENCES projects(id), title VARCHAR(200) NOT NULL, description VARCHAR(4000),
 status VARCHAR(20) NOT NULL CHECK(status IN ('TODO','IN_PROGRESS','BLOCKED','DONE')),
 priority VARCHAR(20) NOT NULL CHECK(priority IN ('LOW','MEDIUM','HIGH','URGENT')),
 due_date DATE, assignee_id BIGINT REFERENCES app_users(id), creator_id BIGINT NOT NULL REFERENCES app_users(id),
 created_at TIMESTAMP WITH TIME ZONE NOT NULL, updated_at TIMESTAMP WITH TIME ZONE NOT NULL, version BIGINT NOT NULL
);
CREATE TABLE notifications (
 id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
 recipient_id BIGINT NOT NULL REFERENCES app_users(id), task_id BIGINT NOT NULL REFERENCES tasks(id),
 message VARCHAR(500) NOT NULL, event_key VARCHAR(255) NOT NULL UNIQUE,
 status VARCHAR(20) NOT NULL CHECK(status IN ('PENDING','DELIVERED','FAILED')),
 created_at TIMESTAMP WITH TIME ZONE NOT NULL, delivered_at TIMESTAMP WITH TIME ZONE,
 attempts INTEGER NOT NULL DEFAULT 0, next_attempt_at TIMESTAMP WITH TIME ZONE, last_error VARCHAR(500)
);
CREATE INDEX ix_tasks_project ON tasks(project_id);
CREATE INDEX ix_tasks_overdue ON tasks(status,due_date);
CREATE INDEX ix_notifications_recipient ON notifications(recipient_id,created_at);
CREATE INDEX ix_notifications_pending ON notifications(status,next_attempt_at);
CREATE INDEX ix_members_user ON project_memberships(user_id);
```
