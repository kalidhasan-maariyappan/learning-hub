package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "notifications")
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "recipient_id")
  public User recipient;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "task_id")
  public Task task;

  @Column(nullable = false, length = 500)
  public String message;

  @Column(nullable = false, unique = true)
  public String eventKey;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public NotificationStatus status = NotificationStatus.PENDING;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Instant deliveredAt;

  @Column(nullable = false)
  public int attempts;

  public Instant nextAttemptAt;

  @Column(length = 500)
  public String lastError;

  public Long getId() {
    return id;
  }

  public User getRecipient() {
    return recipient;
  }

  public Task getTask() {
    return task;
  }

  public String getMessage() {
    return message;
  }

  public String getEventKey() {
    return eventKey;
  }

  public NotificationStatus getStatus() {
    return status;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getDeliveredAt() {
    return deliveredAt;
  }

  public int getAttempts() {
    return attempts;
  }

  public Instant getNextAttemptAt() {
    return nextAttemptAt;
  }

  public String getLastError() {
    return lastError;
  }
}
