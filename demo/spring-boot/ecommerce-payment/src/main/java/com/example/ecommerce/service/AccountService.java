package com.example.ecommerce.service;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.dto.RegisterForm;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AccountService {
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public AccountService(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    public User current(String email) {
        return users.findByEmail(email).orElseThrow();
    }

    @Transactional
    public void register(RegisterForm f) {
        if (!f.password().equals(f.confirmPassword()))
            throw new IllegalArgumentException("Passwords do not match.");
        if (f.password().getBytes(java.nio.charset.StandardCharsets.UTF_8).length > 72)
            throw new IllegalArgumentException("Password must fit within 72 UTF-8 bytes.");
        String email = f.email().trim().toLowerCase(java.util.Locale.ROOT);
        if (users.findByEmail(email).isPresent())
            throw new IllegalArgumentException("This email is already registered.");
        User u = new User();
        u.name = f.name().trim();
        u.email = email;
        u.passwordHash = encoder.encode(f.password());
        u.role = "CUSTOMER";
        u.createdAt = java.time.Instant.now();
        users.save(u);
    }
}
