package com.codesnippet.course.lesson60.controller;

import com.codesnippet.course.lesson60.entity.StoredUser;
import com.codesnippet.course.lesson60.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class UserController {
    private final UserRepository repository;
    public UserController(UserRepository repository) { this.repository=repository; }
    @PostMapping("/users") public StoredUser add(@RequestBody StoredUser user) { return repository.save(user); }
    @GetMapping("/users") public List<StoredUser> all() { return repository.findAll(); }
}
