package com.codesnippet.course.lesson45.controller;

import com.codesnippet.course.lesson45.dto.*;
import com.codesnippet.course.lesson45.service.UserService;
import com.codesnippet.course.lesson45.entity.Role;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service=service; }
    @PostMapping("/register") public UserResponse register(@RequestBody RegisterUserRequest request) { request.setRole(Role.USER);return service.registerUser(request); }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin-create") public UserResponse create(@RequestBody RegisterUserRequest request) { return service.registerUser(request); }
}
