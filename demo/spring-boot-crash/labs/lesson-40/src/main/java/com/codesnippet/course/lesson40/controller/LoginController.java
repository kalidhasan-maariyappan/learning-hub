package com.codesnippet.course.lesson40.controller;

import com.codesnippet.course.lesson40.dto.LoginRequest;
import com.codesnippet.course.lesson40.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
public class LoginController {
    private final AuthenticationManager manager; private final JwtService jwt;
    public LoginController(AuthenticationManager manager,JwtService jwt) { this.manager=manager;this.jwt=jwt; }
    @PostMapping("/login") public Map<String,String> login(@RequestBody LoginRequest request) {
        manager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
        return Map.of("token",jwt.generate(request.getUsername()));
    }
}
