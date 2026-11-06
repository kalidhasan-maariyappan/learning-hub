package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "refunds")
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    public Long paymentId;

    public Long getPaymentId() {
        return paymentId;
    }

    @Column(unique = true)
    public String gatewayRefundId;

    public String getGatewayRefundId() {
        return gatewayRefundId;
    }

    @Column(nullable = false, unique = true)
    public String requestToken;

    public String getRequestToken() {
        return requestToken;
    }

    public long amountMinorUnits;

    public long getAmountMinorUnits() {
        return amountMinorUnits;
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
