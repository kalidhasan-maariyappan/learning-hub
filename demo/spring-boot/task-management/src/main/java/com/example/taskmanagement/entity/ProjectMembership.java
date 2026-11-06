package com.example.taskmanagement.entity;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(
    name = "project_memberships",
    uniqueConstraints = @UniqueConstraint(columnNames = {"project_id", "user_id"}))
public class ProjectMembership {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "project_id")
  public Project project;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id")
  public User user;

  @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.VARCHAR)
  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  public MembershipRole membershipRole;

  public Long getId() {
    return id;
  }

  public Project getProject() {
    return project;
  }

  public User getUser() {
    return user;
  }

  public MembershipRole getMembershipRole() {
    return membershipRole;
  }
}
