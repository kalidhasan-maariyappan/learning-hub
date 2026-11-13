package com.codesnippet.course.lesson47;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
@Configuration
public class SecurityConfig {
    @Bean public SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth->auth.requestMatchers("/public").permitAll().anyRequest().authenticated()).oauth2Login(Customizer.withDefaults()).build();
    }
}
