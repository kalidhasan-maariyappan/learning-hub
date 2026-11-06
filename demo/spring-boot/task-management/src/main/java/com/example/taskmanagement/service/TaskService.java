package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskService {
  private final AccessService access;
  private final TaskRepository tasks;
  private final UserRepository users;
  private final NotificationRepository notifications;

  public TaskService(
      AccessService a, TaskRepository t, UserRepository u, NotificationRepository n) {
    access = a;
    tasks = t;
    users = u;
    notifications = n;
  }

  public TaskView create(Long actor, Long projectId, TaskInput input) {
    User u = access.user(actor);
    Project p = access.project(projectId, u);
    Task t = new Task();
    t.project = p;
    t.creator = u;
    t.title = input.title().trim();
    t.description = input.description();
    t.priority = input.priority();
    t.dueDate = input.dueDate();
    if (input.assigneeId() != null) {
      access.manager(p, u);
      t.assignee = assignee(p, input.assigneeId());
    }
    return TaskView.of(tasks.saveAndFlush(t));
  }

  @Transactional(readOnly = true)
  public TaskView get(Long actor, Long id) {
    return TaskView.of(authorized(actor, id));
  }

  private Task authorized(Long actor, Long id) {
    Task t =
        tasks
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Task not found"));
    access.project(t.project.getId(), access.user(actor));
    return t;
  }

  public TaskView update(Long actor, Long id, TaskPatch input) {
    Task t = authorized(actor, id);
    User u = access.user(actor);
    boolean manager = access.manages(t.project, u);
    AccessService.require(
        manager
            || t.creator.getId().equals(u.getId())
            || (t.assignee != null && t.assignee.getId().equals(u.getId())));
    if (!Objects.equals(input.version(), t.version))
      throw new ApiException(HttpStatus.CONFLICT, "Concurrent update; reload and retry");
    if (input.assigneeId() != null || Boolean.TRUE.equals(input.clearAssignee())) {
      access.manager(t.project, u);
      if (input.assigneeId() != null && Boolean.TRUE.equals(input.clearAssignee()))
        throw new ApiException(HttpStatus.BAD_REQUEST, "Conflicting assignee fields");
      t.assignee =
          Boolean.TRUE.equals(input.clearAssignee())
              ? null
              : assignee(t.project, input.assigneeId());
    }
    if (input.title() != null) {
      if (input.title().isBlank())
        throw new ApiException(HttpStatus.BAD_REQUEST, "Title cannot be blank");
      t.title = input.title().trim();
    }
    if (input.description() != null) t.description = input.description();
    if (input.priority() != null) t.priority = input.priority();
    if (input.dueDate() != null && Boolean.TRUE.equals(input.clearDueDate()))
      throw new ApiException(HttpStatus.BAD_REQUEST, "Conflicting due-date fields");
    if (Boolean.TRUE.equals(input.clearDueDate())) t.dueDate = null;
    else if (input.dueDate() != null) t.dueDate = input.dueDate();
    if (input.status() != null && input.status() != t.status) {
      if (!transitions(t.status).contains(input.status()))
        throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid status transition");
      t.status = input.status();
    }
    t.updatedAt = Instant.now();
    return TaskView.of(tasks.saveAndFlush(t));
  }

  static Set<TaskStatus> transitions(TaskStatus from) {
    return switch (from) {
      case TODO -> Set.of(TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED);
      case IN_PROGRESS -> Set.of(TaskStatus.BLOCKED, TaskStatus.DONE);
      case BLOCKED -> Set.of(TaskStatus.TODO, TaskStatus.IN_PROGRESS);
      case DONE -> Set.of(TaskStatus.TODO);
    };
  }

  private User assignee(Project p, Long id) {
    User u =
        users
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Assignee not found"));
    access.assignee(p, u);
    return u;
  }

  public void delete(Long actor, Long id) {
    Task t = authorized(actor, id);
    access.manager(t.project, access.user(actor));
    notifications.deleteByTaskId(id);
    tasks.delete(t);
  }

  @Transactional(readOnly = true)
  public Page<TaskView> list(
      Long actor,
      Long projectId,
      TaskStatus status,
      Priority priority,
      String search,
      Long assigneeId,
      LocalDate dueBefore,
      int page,
      int size,
      String sort) {
    access.project(projectId, access.user(actor));
    Pageable pageable = pageable(page, size, sort);
    Specification<Task> spec = (r, q, b) -> b.equal(r.get("project").get("id"), projectId);
    if (status != null) spec = spec.and((r, q, b) -> b.equal(r.get("status"), status));
    if (priority != null) spec = spec.and((r, q, b) -> b.equal(r.get("priority"), priority));
    if (assigneeId != null)
      spec = spec.and((r, q, b) -> b.equal(r.get("assignee").get("id"), assigneeId));
    if (dueBefore != null)
      spec = spec.and((r, q, b) -> b.lessThanOrEqualTo(r.get("dueDate"), dueBefore));
    if (search != null && !search.isBlank()) {
      String pattern =
          "%"
              + search
                  .toLowerCase(Locale.ROOT)
                  .replace("\\", "\\\\")
                  .replace("%", "\\%")
                  .replace("_", "\\_")
              + "%";
      spec =
          spec.and((r, q, b) ->
              b.or(
                  b.like(b.lower(r.get("title")), pattern, '\\'),
                  b.like(b.lower(r.get("description")), pattern, '\\')));
    }
    return tasks.findAll(spec, pageable).map(TaskView::of);
  }

  public static Pageable pageable(int page, int size, String sort) {
    if (page < 0 || size < 1 || size > 100)
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "page >= 0 and size between 1 and 100 required");
    String[] parts = sort.split(",", -1);
    if (parts.length != 2
        || !Set.of("id", "title", "status", "priority", "dueDate", "createdAt", "updatedAt")
            .contains(parts[0])
        || !Set.of("asc", "desc").contains(parts[1]))
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "Unsupported sort; use field,asc or field,desc");
    Sort order = Sort.by(Sort.Direction.fromString(parts[1]), parts[0]);
    if (!parts[0].equals("id")) order = order.and(Sort.by("id"));
    return PageRequest.of(page, size, order);
  }
}
