package com.example.ecommerce.repository;

import com.example.ecommerce.entity.WebhookEvent;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface WebhookEventRepository extends JpaRepository<WebhookEvent, Long> {
    boolean existsByGatewayEventId(String gatewayEventId);
}
