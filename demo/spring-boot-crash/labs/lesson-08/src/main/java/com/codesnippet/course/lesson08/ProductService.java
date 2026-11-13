package com.codesnippet.course.lesson08;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
@Service
public class ProductService {
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) {
        this.repository=repository; System.out.println("ProductService constructed");
    }
    @PostConstruct public void initialize() { System.out.println("ProductService initialized"); }
    @PreDestroy public void cleanup() { System.out.println("ProductService cleanup"); }
}
