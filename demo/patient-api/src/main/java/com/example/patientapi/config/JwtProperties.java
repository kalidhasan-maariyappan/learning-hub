package com.example.patientapi.config;


import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.jwt")
public record JwtProperties(String secret, String issuer, Duration expiration) {
    public JwtProperties {
        if (secret == null || secret.getBytes(java.nio.charset.StandardCharsets.UTF_8).length < 32) {
            throw new IllegalArgumentException("JWT_SECRET must contain at least 32 bytes of high-entropy secret material");
        }
        if (issuer == null || issuer.isBlank() || expiration == null || expiration.isNegative() || expiration.isZero()) {
            throw new IllegalArgumentException("JWT issuer and positive expiration are required");
        }
    }
}
