package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
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
    public Long productId;

    public Long getProductId() {
        return productId;
    }

    @Column(nullable = false)
    public String productNameSnapshot;

    public String getProductNameSnapshot() {
        return productNameSnapshot;
    }

    public long unitPriceMinorUnits;

    public long getUnitPriceMinorUnits() {
        return unitPriceMinorUnits;
    }

    public int quantity;

    public int getQuantity() {
        return quantity;
    }

    public String getMoney() {
        return com.example.ecommerce.service.Money.format(Math.multiplyExact(unitPriceMinorUnits, quantity));
    }
}
