package com.codesnippet.course.lesson58.controller;

import com.codesnippet.course.lesson58.model.UserDto;
import com.codesnippet.course.lesson58.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
@RestController @AllArgsConstructor
public class UserController {
    private final UserService service;
    @GetMapping("/users/{id}") public UserDto get(@PathVariable("id") Long id) { return service.getUser(id); }
}
