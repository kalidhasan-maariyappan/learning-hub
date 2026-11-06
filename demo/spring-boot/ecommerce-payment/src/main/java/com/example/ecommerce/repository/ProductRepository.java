package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id=:id")
    Optional<Product> lockById(@Param("id") Long id);

    @Query("select p from Product p where p.active=true and (:category='' or p.category=:category) and (lower(p.title) like lower(concat('%',:q,'%')) or lower(p.description) like lower(concat('%',:q,'%')))")
    org.springframework.data.domain.Page<Product> search(@Param("q") String q, @Param("category") String category, org.springframework.data.domain.Pageable page);

    @Query("select distinct p.category from Product p where p.active=true order by p.category")
    List<String> categories();
}
