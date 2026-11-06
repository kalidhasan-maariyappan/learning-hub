package com.example.patientmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.HeaderWriterFilter;

import jakarta.servlet.DispatcherType;

/**
 * Server-side security rules. Every request passes through this filter chain
 * BEFORE it reaches a controller, so hiding a button in the UI is never the only protection.
 */
@Configuration
public class SecurityConfig {

    /**
     * DelegatingPasswordEncoder: hashes new passwords with BCrypt and stores them as "{bcrypt}$2a$...".
     * The prefix lets the algorithm be upgraded later without breaking existing hashes.
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // JSP rendering is an internal FORWARD to /WEB-INF/views/...; error pages use ERROR dispatch.
                .dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
                .requestMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico", "/error").permitAll()
                .requestMatchers("/login").permitAll()
                // Most specific rule first: only ADMIN may archive patients.
                .requestMatchers(HttpMethod.POST, "/patients/*/archive").hasRole("ADMIN")
                .requestMatchers("/", "/dashboard", "/patients/**", "/appointments/**").hasAnyRole("STAFF", "ADMIN")
                .requestMatchers("/access-denied").authenticated()
                // Deny-by-default for anything not listed above.
                .anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login")                 // our JSP, GET handled by LoginController
                .loginProcessingUrl("/login")        // POST handled by Spring Security itself
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error")          // one generic message: no user enumeration
                .permitAll())
            .logout(logout -> logout
                .logoutUrl("/logout")                // POST only while CSRF is enabled
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID"))
            .sessionManagement(session -> session
                // New session id after login: defeats session fixation attacks.
                .sessionFixation(fixation -> fixation.changeSessionId())
                .invalidSessionUrl("/login?expired"))
            .exceptionHandling(ex -> ex.accessDeniedPage("/access-denied"))
            .headers(headers -> headers
                // Defaults: Cache-Control: no-cache, no-store, max-age=0, must-revalidate; Pragma; Expires: 0;
                // X-Content-Type-Options; X-Frame-Options. Prevents Back-button views of protected pages after logout.
                .cacheControl(cache -> { })
                // Write headers before the JSP commits the response, otherwise they can be skipped.
                .addObjectPostProcessor(new ObjectPostProcessor<HeaderWriterFilter>() {
                    @Override
                    public <O extends HeaderWriterFilter> O postProcess(O filter) {
                        filter.setShouldWriteHeadersEagerly(true);
                        return filter;
                    }
                }));
        // CSRF protection is ON (Spring Security default) - never disabled here.
        return http.build();
    }
}
