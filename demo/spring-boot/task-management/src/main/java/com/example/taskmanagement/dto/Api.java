package com.example.taskmanagement.dto;

import com.example.taskmanagement.entity.*;
import jakarta.validation.constraints.*;
import java.time.*;

public final class Api {
  private Api() {}

  public record PageView<T>(
      java.util.List<T> content,
      long totalElements,
      int totalPages,
      int number,
      int size,
      boolean first,
      boolean last) {
    public static <T> PageView<T> of(org.springframework.data.domain.Page<T> page) {
      return new PageView<>(
          page.getContent(),
          page.getTotalElements(),
          page.getTotalPages(),
          page.getNumber(),
          page.getSize(),
          page.isFirst(),
          page.isLast());
    }
  }

  public record Register(
      @NotBlank @Size(max = 100) String name,
      @NotBlank @Email @Size(max = 254) String email,
      @NotBlank @Size(min = 12, max = 72) String password) {}

  public record Login(@NotBlank @Email String email, @NotBlank String password) {}

  public record Token(String accessToken, String tokenType, long expiresIn) {}

  public record UserView(Long id, String name, String email, Role role, Instant createdAt) {
    public static UserView of(User u) {
      return new UserView(u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getCreatedAt());
    }
  }

  public record ProjectInput(
      @NotBlank @Size(max = 150) String name, @Size(max = 4000) String description) {}

  public record MemberInput(@NotNull Long userId, @NotNull MembershipRole membershipRole) {}

  public record MemberView(Long userId, String name, MembershipRole membershipRole) {}

  public record RoleInput(@NotNull Role role) {}

  public record ProjectView(
      Long id, String name, String description, Long ownerId, Instant createdAt) {
    public static ProjectView of(Project p) {
      return new ProjectView(
          p.getId(), p.getName(), p.getDescription(), p.getOwner().getId(), p.getCreatedAt());
    }
  }

  public record TaskInput(
      @NotBlank @Size(max = 200) String title,
      @Size(max = 4000) String description,
      @NotNull Priority priority,
      @FutureOrPresent LocalDate dueDate,
      Long assigneeId) {}

  public record TaskPatch(
      @NotNull @PositiveOrZero Long version,
      @Size(min = 1, max = 200) String title,
      @Size(max = 4000) String description,
      TaskStatus status,
      Priority priority,
      @FutureOrPresent LocalDate dueDate,
      Long assigneeId,
      Boolean clearAssignee,
      Boolean clearDueDate) {}

  public record TaskView(
      Long id,
      Long projectId,
      String title,
      String description,
      TaskStatus status,
      Priority priority,
      LocalDate dueDate,
      Long assigneeId,
      Long creatorId,
      Instant createdAt,
      Instant updatedAt,
      Long version) {
    public static TaskView of(Task t) {
      return new TaskView(
          t.getId(),
          t.project.getId(),
          t.title,
          t.description,
          t.status,
          t.priority,
          t.dueDate,
          t.assignee == null ? null : t.assignee.getId(),
          t.creator.getId(),
          t.createdAt,
          t.updatedAt,
          t.version);
    }
  }

  public record NotificationView(
      Long id,
      Long taskId,
      String message,
      NotificationStatus status,
      Instant createdAt,
      Instant deliveredAt,
      int attempts,
      String lastError) {
    public static NotificationView of(Notification n) {
      return new NotificationView(
          n.getId(),
          n.task.getId(),
          n.message,
          n.status,
          n.createdAt,
          n.deliveredAt,
          n.attempts,
          n.lastError);
    }
  }
}
