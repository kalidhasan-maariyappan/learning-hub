package com.example.ecommerce.repository;

import com.example.ecommerce.entity.OrderItem;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderIdOrderById(Long orderId);
}
