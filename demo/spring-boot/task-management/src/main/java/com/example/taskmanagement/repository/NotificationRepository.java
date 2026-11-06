package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  void deleteByTaskId(Long taskId);

  boolean existsByEventKey(String eventKey);

  Page<Notification> findByRecipientId(Long recipientId, Pageable pageable);

  @Query(
      "select n.id from Notification n where n.status <>"
          + " com.example.taskmanagement.entity.NotificationStatus.DELIVERED and n.attempts < 5 and"
          + " (n.nextAttemptAt is null or n.nextAttemptAt <= :now)")
  List<Long> pending(@Param("now") Instant now, Pageable pageable);

  @Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
  @Query("select n from Notification n where n.id=:id")
  Optional<Notification> lock(@Param("id") Long id);
}
