package com.example.secureauth.config;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.HeaderWriterFilter;
import org.springframework.security.config.ObjectPostProcessor;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico", "/error").permitAll()
                .dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
                .requestMatchers(HttpMethod.GET, "/", "/login", "/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/register").permitAll()
                .anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error")
                .permitAll())
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID"))
            .sessionManagement(session -> session
                .sessionFixation(fixation -> fixation.changeSessionId())
                .invalidSessionUrl("/login?expired"))
            .headers(headers -> headers.addObjectPostProcessor(new ObjectPostProcessor<HeaderWriterFilter>() {
                @Override
                public <O extends HeaderWriterFilter> O postProcess(O filter) {
                    filter.setShouldWriteHeadersEagerly(true);
                    return filter;
                }
            }));
        return http.build();
    }
}
