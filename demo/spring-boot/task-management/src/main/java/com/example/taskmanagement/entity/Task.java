package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  public Project project;

  @Column(nullable = false, length = 200)
  public String title;

  @Column(length = 4000)
  public String description;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public TaskStatus status = TaskStatus.TODO;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public Priority priority;

  public LocalDate dueDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assignee_id")
  public User assignee;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "creator_id")
  public User creator;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  @Column(nullable = false)
  public Instant updatedAt = Instant.now();

  @Version public Long version;

  @PreUpdate
  void updated() {
    updatedAt = Instant.now();
  }

  public Long getId() {
    return id;
  }

  public Project getProject() {
    return project;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public TaskStatus getStatus() {
    return status;
  }

  public Priority getPriority() {
    return priority;
  }

  public LocalDate getDueDate() {
    return dueDate;
  }

  public User getAssignee() {
    return assignee;
  }

  public User getCreator() {
    return creator;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public Long getVersion() {
    return version;
  }
}
