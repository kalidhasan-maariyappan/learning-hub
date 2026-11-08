package com.example.patientapi.config;


import com.example.patientapi.user.*;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Profile("dev")
public class DevelopmentAdminBootstrap implements CommandLineRunner {
    private final UserRepository users;
    private final PasswordEncoder passwords;
    private final String email;
    private final String password;
    private final String name;

    public DevelopmentAdminBootstrap(UserRepository users, PasswordEncoder passwords,
        @Value("${app.bootstrap.admin-email:}") String email,
        @Value("${app.bootstrap.admin-password:}") String password,
        @Value("${app.bootstrap.admin-name:Development Admin}") String name) {
        this.users = users;
        this.passwords = passwords;
        this.email = email.strip().toLowerCase(Locale.ROOT);
        this.password = password;
        this.name = name;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (email.isBlank() && password.isBlank()) {
            return;
        }
        if (email.length() > 254 || !email.matches("[^\\s@]+@[^\\s@]+\\.[^\\s@]+")
            || name.isBlank() || name.length() > 100 || password.length() < 12
            || password.getBytes(StandardCharsets.UTF_8).length > 72
            || !password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$")) {
            throw new IllegalStateException("Provide a valid ADMIN_EMAIL, ADMIN_NAME and strong ADMIN_PASSWORD (12 to 72 bytes)");
        }
        users.findByEmail(email).ifPresentOrElse(existing -> {
            if (existing.getRole() != Role.ADMIN) {
                throw new IllegalStateException("Admin bootstrap email belongs to a USER; existing users are never promoted");
            }
        }, () -> users.saveAndFlush(new AppUser(name.strip(), email, passwords.encode(password), Role.ADMIN)));
    }
}
