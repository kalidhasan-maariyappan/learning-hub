package com.codesnippet.course.lesson38.security;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {
    @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean public AuthenticationManager authenticationManager(UserDetailsService users,PasswordEncoder encoder) {
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(users); provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }
    @Bean public SecurityFilterChain security(HttpSecurity http) throws Exception {
        http.csrf(csrf->csrf.disable()).headers(headers->headers.frameOptions(frame->frame.sameOrigin()));
        http.authorizeHttpRequests(auth->auth.requestMatchers("/api/auth/login","/api/auth/register","/h2-console/**").permitAll()

            .anyRequest().authenticated());
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
