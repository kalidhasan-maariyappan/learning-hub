package com.codesnippet.course.lesson45.service;

import com.codesnippet.course.lesson45.dto.*;
import com.codesnippet.course.lesson45.entity.AppUser;
import com.codesnippet.course.lesson45.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class UserService {
    private final UserRepository repository; private final PasswordEncoder encoder;
    public UserService(UserRepository repository,PasswordEncoder encoder) { this.repository=repository;this.encoder=encoder; }
    public UserResponse registerUser(RegisterUserRequest request) {
        AppUser user=repository.save(new AppUser(null,request.getUsername(),encoder.encode(request.getPassword()),request.getRole()));
        return new UserResponse(user.getId(),user.getUsername(),user.getRole());
    }
}
