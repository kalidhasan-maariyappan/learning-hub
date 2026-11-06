package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {
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
    public Long productId;

    public Long getProductId() {
        return productId;
    }

    public int quantity;

    public int getQuantity() {
        return quantity;
    }
}
