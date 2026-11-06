package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Payment;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByOrderIdOrderByIdDesc(Long orderId);

    List<Payment> findAllByOrderByIdDesc();

    Optional<Payment> findByGatewayPaymentId(String gatewayPaymentId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Payment p where p.id=:id")
    Optional<Payment> lockById(@Param("id") Long id);
}
