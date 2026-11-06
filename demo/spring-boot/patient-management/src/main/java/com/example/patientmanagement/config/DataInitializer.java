package com.example.patientmanagement.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.patientmanagement.entity.AppUser;
import com.example.patientmanagement.enums.Role;
import com.example.patientmanagement.repository.AppUserRepository;

/**
 * Seeds one ADMIN and one STAFF demo account on startup if they do not exist yet.
 * Passwords are hashed before saving; plain passwords are never stored or logged.
 */
@Component
public class DataInitializer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminPassword;
    private final String staffPassword;

    public DataInitializer(AppUserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           @Value("${app.demo.admin-password}") String adminPassword,
                           @Value("${app.demo.staff-password}") String staffPassword) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminPassword = adminPassword;
        this.staffPassword = staffPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedUser("admin", adminPassword, Role.ADMIN);
        seedUser("staff", staffPassword, Role.STAFF);
    }

    private void seedUser(String username, String rawPassword, Role role) {
        if (userRepository.existsByUsername(username)) {
            return;
        }
        userRepository.save(new AppUser(username, passwordEncoder.encode(rawPassword), role));
        log.info("Seeded demo account '{}' with role {}", username, role); // no password in logs
    }
}
