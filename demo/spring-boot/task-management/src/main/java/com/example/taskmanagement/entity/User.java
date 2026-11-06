package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "app_users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 100)
  public String name;

  @Column(nullable = false, unique = true, length = 254)
  public String email;

  @Column(nullable = false)
  public String passwordHash;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public Role role = Role.USER;

  @Column(nullable = false)
  public Instant createdAt = Instant.now();

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public Role getRole() {
    return role;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
