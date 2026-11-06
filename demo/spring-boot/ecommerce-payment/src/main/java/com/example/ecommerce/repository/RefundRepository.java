package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Refund;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface RefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByPaymentIdOrderByIdDesc(Long paymentId);

    List<Refund> findAllByOrderByIdDesc();

    Optional<Refund> findByGatewayRefundId(String gatewayRefundId);

    Optional<Refund> findByRequestToken(String requestToken);
}
