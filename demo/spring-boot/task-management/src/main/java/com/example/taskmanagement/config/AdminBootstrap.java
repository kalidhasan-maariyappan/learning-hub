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
