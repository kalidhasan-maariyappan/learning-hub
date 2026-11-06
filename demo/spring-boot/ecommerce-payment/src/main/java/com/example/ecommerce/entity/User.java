package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false, length = 100)
    public String name;

    public String getName() {
        return name;
    }

    @Column(nullable = false, unique = true, length = 254)
    public String email;

    public String getEmail() {
        return email;
    }

    @Column(nullable = false)
    public String passwordHash;

    public String getPasswordHash() {
        return passwordHash;
    }

    @Column(nullable = false)
    public String role;

    public String getRole() {
        return role;
    }

    @Column(nullable = false)
    public java.time.Instant createdAt;

    public java.time.Instant getCreatedAt() {
        return createdAt;
    }
}
