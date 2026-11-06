package com.example.ecommerce.config;

import com.example.ecommerce.repository.UserRepository;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import jakarta.servlet.DispatcherType;

@Configuration
public class SecurityConfig {
    @Bean
    PasswordEncoder passwords() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService users(UserRepository users) {
        return email -> users.findByEmail(email.toLowerCase(java.util.Locale.ROOT).trim())
                .map(u -> User.withUsername(u.email).password(u.passwordHash).roles(u.role).build())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }

    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(a -> a.dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
                        .requestMatchers("/", "/products/**", "/assets/**", "/error").permitAll().requestMatchers("/login", "/register").anonymous()
                        .requestMatchers("/payments/webhook").permitAll().requestMatchers("/admin/**").hasRole("ADMIN").anyRequest().authenticated())
                .csrf(c -> c.ignoringRequestMatchers("/payments/webhook")).formLogin(f -> f.loginPage("/login").defaultSuccessUrl("/", true))
                .logout(l -> l.logoutSuccessUrl("/login?logout").invalidateHttpSession(true).deleteCookies("JSESSIONID"))
                .exceptionHandling(e -> e.accessDeniedHandler((req, res, ex) -> {
                    if ((req.getRequestURI().equals("/login") || req.getRequestURI().equals("/register")) && req.getUserPrincipal() != null)
                        res.sendRedirect("/");
                    else
                        res.sendError(403);
                })).build();
    }
}
