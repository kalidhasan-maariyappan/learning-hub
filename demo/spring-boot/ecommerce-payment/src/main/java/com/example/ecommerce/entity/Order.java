package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    public Long userId;

    public Long getUserId() {
        return userId;
    }

    @Column(nullable = false)
    public String status;

    public String getStatus() {
        return status;
    }

    public long totalMinorUnits;

    public long getTotalMinorUnits() {
        return totalMinorUnits;
    }

    @Column(nullable = false)
    public String currency;

    public String getCurrency() {
        return currency;
    }

    @Column(unique = true)
    public String gatewayOrderId;

    public String getGatewayOrderId() {
        return gatewayOrderId;
    }

    @Column(nullable = false, unique = true)
    public String requestToken;

    public String getRequestToken() {
        return requestToken;
    }

    @Column(nullable = false, length = 1000)
    public String address;

    public String getAddress() {
        return address;
    }

    @Column(nullable = false)
    public java.time.Instant createdAt;

    public java.time.Instant getCreatedAt() {
        return createdAt;
    }

    public String getMoney() {
        return com.example.ecommerce.service.Money.format(totalMinorUnits);
    }
}
