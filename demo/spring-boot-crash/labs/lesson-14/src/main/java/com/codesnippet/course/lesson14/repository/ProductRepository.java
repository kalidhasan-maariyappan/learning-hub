package com.codesnippet.course.lesson14.repository;

import com.codesnippet.course.lesson14.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product,Integer> { java.util.Optional<Product> findByName(String name); }
