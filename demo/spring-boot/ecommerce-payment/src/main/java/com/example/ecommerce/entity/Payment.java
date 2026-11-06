package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {
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

    @Column(nullable = false, unique = true)
    public String gatewayPaymentId;

    public String getGatewayPaymentId() {
        return gatewayPaymentId;
    }

    @Column(nullable = false)
    public String gatewayOrderId;

    public String getGatewayOrderId() {
        return gatewayOrderId;
    }

    public long amountMinorUnits;

    public long getAmountMinorUnits() {
        return amountMinorUnits;
    }

    @Column(nullable = false)
    public String currency;

    public String getCurrency() {
        return currency;
    }

    @Column(nullable = false)
    public String status;

    public String getStatus() {
        return status;
    }

    @Column(nullable = false)
    public java.time.Instant createdAt;

    public java.time.Instant getCreatedAt() {
        return createdAt;
    }

    public String getMoney() {
        return com.example.ecommerce.service.Money.format(amountMinorUnits);
    }
}
