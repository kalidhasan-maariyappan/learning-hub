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
