package com.codesnippet.course.lesson55;

import com.codesnippet.course.lesson55.config.NotificationProperties;
import org.springframework.stereotype.Service;
@Service
public class NotificationService {
    private final NotificationProperties properties;
    public NotificationService(NotificationProperties properties) { this.properties=properties; }
    public NotificationProperties sendTestNotification() {
        System.out.println("Notification sender: " + properties.getEmail().getFromAddress());
        System.out.println("SMS enabled: " + properties.getSms().isEnabled());
        System.out.println("Retry attempts: " + properties.getRetry().getMaxAttempts());
        return properties;
    }
}
