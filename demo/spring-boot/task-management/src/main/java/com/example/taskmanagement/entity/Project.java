package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "projects")
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 150)
  public String name;

  @Column(length = 4000)
  public String description;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "owner_id")
  public User owner;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public User getOwner() {
    return owner;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
