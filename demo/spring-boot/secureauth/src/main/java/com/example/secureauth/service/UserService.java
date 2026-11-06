package com.example.secureauth.service;

import com.example.secureauth.dto.RegistrationForm;
import com.example.secureauth.entity.User;
import com.example.secureauth.exception.DuplicateEmailException;
import com.example.secureauth.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void register(RegistrationForm form) {
        String email = form.getEmail().trim().toLowerCase(Locale.ROOT);
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateEmailException();
        }
        User user = new User();
        user.setName(form.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setRole("USER");
        try {
            userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException();
        }
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new IllegalStateException("Signed-in user no longer exists"));
    }
}
