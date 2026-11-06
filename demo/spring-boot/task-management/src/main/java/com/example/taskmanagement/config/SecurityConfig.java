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
