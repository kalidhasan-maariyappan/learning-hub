package com.example.ecommerce.repository;

import com.example.ecommerce.entity.AuditEntry;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface AuditEntryRepository extends JpaRepository<AuditEntry, Long> {
    List<AuditEntry> findByOrderIdOrderByIdDesc(Long orderId);
}
