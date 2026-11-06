package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
  private final AccessService access;
  private final UserRepository users;

  public UserService(AccessService a, UserRepository u) {
    access = a;
    users = u;
  }

  @Transactional(readOnly = true)
  public UserView me(Long id) {
    return UserView.of(access.user(id));
  }

  @Transactional(readOnly = true)
  public Page<UserView> list(Long actor, int page, int size) {
    access.admin(access.user(actor));
    return users.findAll(TaskService.pageable(page, size, "id,asc")).map(UserView::of);
  }

  public UserView role(Long actor, Long id, RoleInput input) {
    User admin = access.user(actor);
    access.admin(admin);
    if (actor.equals(id) && input.role() != Role.ADMIN)
      throw new ApiException(HttpStatus.BAD_REQUEST, "Cannot demote your own admin account");
    User u =
        users
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    u.role = input.role();
    return UserView.of(u);
  }
}
