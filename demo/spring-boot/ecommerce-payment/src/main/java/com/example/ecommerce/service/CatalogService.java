package com.example.ecommerce.service;

import com.example.ecommerce.dto.ProductForm;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CatalogService {
    final ProductRepository products;

    public CatalogService(ProductRepository p) {
        products = p;
    }

    @Transactional
    public void save(ProductForm f) {
        Product p = f.id() == null ? new Product() : products.lockById(f.id()).orElseThrow(() -> new IllegalArgumentException("Product not found."));
        p.sku = f.sku().trim();
        p.title = f.title().trim();
        p.description = f.description().trim();
        p.category = f.category().trim();
        p.priceMinorUnits = Money.parse(f.price());
        p.stockQuantity = f.stock();
        p.active = f.active();
        p.art = f.art();
        products.saveAndFlush(p);
    }
}
