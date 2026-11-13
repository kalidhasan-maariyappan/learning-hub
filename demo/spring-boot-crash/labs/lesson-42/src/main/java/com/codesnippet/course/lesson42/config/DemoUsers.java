package com.codesnippet.course.lesson42.config;

import com.codesnippet.course.lesson42.entity.AppUser;
import com.codesnippet.course.lesson42.repository.UserRepository;

import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
@Component
public class DemoUsers implements CommandLineRunner {
    private final UserRepository repository; private final PasswordEncoder encoder;
    public DemoUsers(UserRepository repository,PasswordEncoder encoder) { this.repository=repository;this.encoder=encoder; }
    public void run(String... args) {
        repository.save(new AppUser(null,"admin",encoder.encode("password"),"ADMIN"));
        repository.save(new AppUser(null,"user",encoder.encode("password"),"USER"));
    }
}
