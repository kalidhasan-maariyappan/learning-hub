package com.example.taskmanagement.notification;

import com.example.taskmanagement.entity.Notification;
import org.springframework.stereotype.Component;

/** In-app delivery adapter. Replace this boundary if adding an external channel. */
@Component
public class NotificationDelivery {
  public void deliver(Notification notification) {
    org.slf4j.LoggerFactory.getLogger(getClass())
        .info(
            "Delivering in-app notification {} to user {}",
            notification.getId(),
            notification.recipient.getId());
  }
}
