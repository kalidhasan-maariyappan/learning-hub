package com.example.patientmanagement.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.patientmanagement.entity.AppUser;
import com.example.patientmanagement.repository.AppUserRepository;

/**
 * Spring Security calls this during form login. It returns the stored hash; Spring Security
 * itself compares it with the submitted password via the PasswordEncoder.
 */
@Service
public class DatabaseUserDetailsService implements UserDetailsService {

    private final AppUserRepository userRepository;

    public DatabaseUserDetailsService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalized = username == null ? "" : username.trim().toLowerCase();
        AppUser user = userRepository.findByUsername(normalized)
                // Generic message; the login page never says whether the username exists.
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

        return User.withUsername(user.getUsername())
                .password(user.getPasswordHash())
                .roles(user.getRole().name())   // becomes authority ROLE_ADMIN / ROLE_STAFF
                .disabled(!user.isEnabled())
                .build();
    }
}
