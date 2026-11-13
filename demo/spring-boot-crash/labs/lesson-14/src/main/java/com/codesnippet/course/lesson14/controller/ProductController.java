package com.codesnippet.course.lesson14.controller;

import com.codesnippet.course.lesson14.entity.Product;
import com.codesnippet.course.lesson14.service.ProductService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service=service; }
    @PostMapping public Product add(@RequestBody Product product) { return service.addProduct(product); }
    @GetMapping("/{id}") public Product get(@PathVariable("id") Integer id) { return service.getProduct(id); }
    @GetMapping("/name/{name}") public Product byName(@PathVariable("name") String name) { return service.getByName(name); }
    @DeleteMapping("/{id}") public void delete(@PathVariable("id") Integer id) { service.deleteProduct(id); }
}
