package com.codesnippet.course.lesson58.repository;

import com.codesnippet.course.lesson58.model.UserDto;
import org.springframework.stereotype.Repository;
@Repository
public class UserRepository { public UserDto findById(Long id) { return new UserDto(id,"John","john@example.test"); } }
