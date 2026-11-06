package com.example.secureauth.service;

import com.example.secureauth.entity.User;
import com.example.secureauth.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public DatabaseUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmailIgnoreCase(email.trim()).orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail()).password(user.getPassword()).roles(user.getRole()).build();
    }
}
