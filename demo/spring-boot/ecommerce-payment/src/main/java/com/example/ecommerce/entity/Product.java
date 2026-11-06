package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false, unique = true, length = 50)
    public String sku;

    public String getSku() {
        return sku;
    }

    @Column(nullable = false, length = 150)
    public String title;

    public String getTitle() {
        return title;
    }

    @Column(nullable = false, length = 3000)
    public String description;

    public String getDescription() {
        return description;
    }

    @Column(nullable = false, length = 50)
    public String category;

    public String getCategory() {
        return category;
    }

    @Column(nullable = false)
    public String art;

    public String getArt() {
        return art;
    }

    public long priceMinorUnits;

    public long getPriceMinorUnits() {
        return priceMinorUnits;
    }

    public int stockQuantity;

    public int getStockQuantity() {
        return stockQuantity;
    }

    public boolean active;

    public boolean getActive() {
        return active;
    }

    public String getMoney() {
        return com.example.ecommerce.service.Money.format(priceMinorUnits);
    }
}
