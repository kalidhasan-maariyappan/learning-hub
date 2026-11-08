package com.example.patientapi.auth;


import com.example.patientapi.config.JwtProperties;
import com.example.patientapi.error.DuplicateEmailException;
import com.example.patientapi.user.*;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Locale;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder passwords;
    private final AuthenticationManager authenticationManager;
    private final JwtEncoder encoder;
    private final JwtProperties properties;

    public AuthService(UserRepository users, PasswordEncoder passwords, AuthenticationManager authenticationManager,
        JwtEncoder encoder, JwtProperties properties) {
        this.users = users;
        this.passwords = passwords;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.properties = properties;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String email = request.email().strip().toLowerCase(Locale.ROOT);
        if (users.existsByEmail(email)) {
            throw new DuplicateEmailException("Email is already registered");
        }
        if (request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new IllegalArgumentException("Password exceeds BCrypt's 72-byte limit");
        }
        AppUser user = new AppUser(request.name().strip(), email, passwords.encode(request.password()), Role.USER);
        return UserResponse.from(users.saveAndFlush(user));
    }

    @Transactional(readOnly = true)
    public TokenResponse login(LoginRequest request) {
        String email = request.email().strip().toLowerCase(Locale.ROOT);
        if (request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new org.springframework.security.authentication.BadCredentialsException("Invalid credentials");
        }
        authenticationManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(email, request.password()));
        AppUser user = users.findByEmail(email).orElseThrow();
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer(properties.issuer()).subject(user.getId().toString())
            .issuedAt(now).expiresAt(now.plus(properties.expiration())).claim("role", user.getRole().name()).build();
        String token = encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims)).getTokenValue();
        return new TokenResponse(token, "Bearer", properties.expiration().toSeconds());
    }
}
