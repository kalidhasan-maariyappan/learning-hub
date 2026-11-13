package com.codesnippet.course.lesson56.service;

import com.codesnippet.course.lesson56.model.*;
import com.codesnippet.course.lesson56.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service @AllArgsConstructor @Slf4j
public class UserService {
    private final UserRepository repository;
    public UserDto getUser(Long id) {
        UserDto user=repository.findById(id);
        log.info("User id: {}",user.getId());
        Product product=Product.builder().name("Product A").price(1).build();
        log.info("Product: {}",product.getName());
        return user;
    }
}
