package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Order;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByIdDesc(Long userId);

    List<Order> findAllByOrderByIdDesc();

    Optional<Order> findByRequestToken(String requestToken);

    Optional<Order> findByGatewayOrderId(String gatewayOrderId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select o from Order o where o.id=:id")
    Optional<Order> lockById(@Param("id") Long id);
}
