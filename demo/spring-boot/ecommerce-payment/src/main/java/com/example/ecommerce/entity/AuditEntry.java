package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_entries")
public class AuditEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    public Long orderId;

    public Long getOrderId() {
        return orderId;
    }

    @Column(nullable = false)
    public String kind;

    public String getKind() {
        return kind;
    }

    @Column(nullable = false, length = 500)
    public String detail;

    public String getDetail() {
        return detail;
    }

    @Column(nullable = false)
    public java.time.Instant createdAt;

    public java.time.Instant getCreatedAt() {
        return createdAt;
    }
}
