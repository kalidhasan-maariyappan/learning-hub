package com.example.taskmanagement.notification;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.repository.NotificationRepository;
import java.time.Instant;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationWorker {
  private final NotificationRepository notifications;
  private final NotificationDelivery delivery;

  public NotificationWorker(NotificationRepository n, NotificationDelivery d) {
    notifications = n;
    delivery = d;
  }

  @Async("notificationExecutor")
  @Transactional
  public void process(Long id) {
    var n = notifications.lock(id).orElse(null);
    Instant now = Instant.now();
    if (n == null
        || n.status == NotificationStatus.DELIVERED
        || n.attempts >= 5
        || (n.nextAttemptAt != null && n.nextAttemptAt.isAfter(now))) return;
    n.attempts++;
    try {
      delivery.deliver(n);
      n.status = NotificationStatus.DELIVERED;
      n.deliveredAt = now;
      n.lastError = null;
      n.nextAttemptAt = null;
    } catch (Exception e) {
      n.status = NotificationStatus.FAILED;
      n.lastError = e.getClass().getSimpleName();
      n.nextAttemptAt = now.plusSeconds(Math.min(3600, 30L * (1L << n.attempts)));
      org.slf4j.LoggerFactory.getLogger(getClass())
          .error("Notification {} failed on attempt {}", id, n.attempts, e);
    }
  }
}
