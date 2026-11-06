package com.example.ecommerce.repository;

import com.example.ecommerce.entity.CartItem;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserIdOrderByProductId(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserId(Long userId);
}
