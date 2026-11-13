package com.codesnippet.course.lesson21.service;

import com.codesnippet.course.lesson21.entity.Product;
import com.codesnippet.course.lesson21.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class ProductService {
    private static final Logger logger=LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) { this.repository=repository; }
    public Product addProduct(Product product) {
        if(!validateProductName(product.getName())) throw new RuntimeException("Product name must not be empty");
        logger.info("Adding product in DB"); logger.debug("Product name: {}",product.getName());
        logger.warn("Example warning"); logger.error("Example error-level message"); logger.trace("Example trace");
        return repository.save(product);
    }
    private boolean validateProductName(String name) { return name!=null && !name.isBlank(); }
    public Product getProduct(Integer id) { return repository.findById(id).orElseThrow(()->new RuntimeException("Product " + id + " not found")); }
    public Product getByName(String name) { return repository.findByName(name).orElseThrow(()->new RuntimeException("Product " + name + " not found")); }
    public void deleteProduct(Integer id) { repository.deleteById(id); }
}
