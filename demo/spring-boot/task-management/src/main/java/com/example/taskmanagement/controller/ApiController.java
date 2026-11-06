package com.example.taskmanagement.controller;

import com.example.taskmanagement.auth.AuthService;
import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.service.*;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.*;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final AuthService auth;
  private final UserService users;
  private final ProjectService projects;
  private final TaskService tasks;
  private final com.example.taskmanagement.notification.NotificationService notifications;

  public ApiController(
      AuthService a,
      UserService u,
      ProjectService p,
      TaskService t,
      com.example.taskmanagement.notification.NotificationService n) {
    auth = a;
    users = u;
    projects = p;
    tasks = t;
    notifications = n;
  }

  private Long actor(Jwt jwt) {
    try {
      return Long.valueOf(jwt.getSubject());
    } catch (RuntimeException e) {
      throw new com.example.taskmanagement.exception.ApiException(
          HttpStatus.UNAUTHORIZED, "Invalid token subject");
    }
  }

  @PostMapping("/auth/register")
  @ResponseStatus(HttpStatus.CREATED)
  public UserView register(@Valid @RequestBody Register input) {
    return auth.register(input);
  }

  @PostMapping("/auth/login")
  public Token login(@Valid @RequestBody Login input) {
    return auth.login(input);
  }

  @GetMapping("/users/me")
  public UserView me(@AuthenticationPrincipal Jwt jwt) {
    return users.me(actor(jwt));
  }

  @GetMapping("/admin/users")
  public PageView<UserView> users(
      @AuthenticationPrincipal Jwt jwt,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    return PageView.of(users.list(actor(jwt), page, size));
  }

  @PatchMapping("/admin/users/{id}/role")
  public UserView role(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody RoleInput input) {
    return users.role(actor(jwt), id, input);
  }

  @PostMapping("/projects")
  public ResponseEntity<ProjectView> createProject(
      @AuthenticationPrincipal Jwt jwt, @Valid @RequestBody ProjectInput input) {
    var view = projects.create(actor(jwt), input);
    return ResponseEntity.created(java.net.URI.create("/api/projects/" + view.id())).body(view);
  }

  @GetMapping("/projects")
  public List<ProjectView> projects(@AuthenticationPrincipal Jwt jwt) {
    return projects.list(actor(jwt));
  }

  @GetMapping("/projects/{id}")
  public ProjectView project(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return projects.get(actor(jwt), id);
  }

  @PutMapping("/projects/{id}")
  public ProjectView updateProject(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody ProjectInput input) {
    return projects.update(actor(jwt), id, input);
  }

  @PostMapping("/projects/{id}/members")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void member(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody MemberInput input) {
    projects.addMember(actor(jwt), id, input);
  }

  @GetMapping("/projects/{id}/members")
  public List<MemberView> members(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return projects.members(actor(jwt), id);
  }

  @DeleteMapping("/projects/{id}/members/{userId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void removeMember(
      @AuthenticationPrincipal Jwt jwt, @PathVariable Long id, @PathVariable Long userId) {
    projects.removeMember(actor(jwt), id, userId);
  }

  @PostMapping("/projects/{id}/tasks")
  public ResponseEntity<TaskView> createTask(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody TaskInput input) {
    var view = tasks.create(actor(jwt), id, input);
    return ResponseEntity.created(java.net.URI.create("/api/tasks/" + view.id())).body(view);
  }

  @GetMapping("/projects/{id}/tasks")
  public PageView<TaskView> tasks(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @RequestParam(required = false) TaskStatus status,
      @RequestParam(required = false) Priority priority,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Long assigneeId,
      @RequestParam(required = false) LocalDate dueBefore,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size,
      @RequestParam(defaultValue = "dueDate,asc") String sort) {
    return PageView.of(
        tasks.list(
            actor(jwt), id, status, priority, search, assigneeId, dueBefore, page, size, sort));
  }

  @GetMapping("/tasks/{id}")
  public TaskView task(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    return tasks.get(actor(jwt), id);
  }

  @PatchMapping("/tasks/{id}")
  public TaskView updateTask(
      @AuthenticationPrincipal Jwt jwt,
      @PathVariable Long id,
      @Valid @RequestBody TaskPatch input) {
    return tasks.update(actor(jwt), id, input);
  }

  @DeleteMapping("/tasks/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTask(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
    tasks.delete(actor(jwt), id);
  }

  @GetMapping("/notifications")
  public PageView<NotificationView> notifications(
      @AuthenticationPrincipal Jwt jwt,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    return PageView.of(notifications.list(actor(jwt), page, size));
  }
}
