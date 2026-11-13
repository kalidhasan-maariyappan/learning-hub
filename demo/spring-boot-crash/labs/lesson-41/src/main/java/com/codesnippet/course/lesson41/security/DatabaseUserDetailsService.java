package com.codesnippet.course.lesson41.security;

import com.codesnippet.course.lesson41.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository repository;
    public DatabaseUserDetailsService(UserRepository repository) { this.repository=repository; }
    public UserDetails loadUserByUsername(String username) {
        return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
    }
}
