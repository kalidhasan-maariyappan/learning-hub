package com.codesnippet.course.lesson21.repository;

import com.codesnippet.course.lesson21.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product,Integer> { java.util.Optional<Product> findByName(String name); }
