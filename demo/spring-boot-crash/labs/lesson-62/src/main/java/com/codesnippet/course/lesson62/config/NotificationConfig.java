package com.codesnippet.course.lesson62.config;

import com.codesnippet.course.lesson62.notification.*;
import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.*;
@Configuration
public class NotificationConfig {
    @Bean @ConditionalOnMissingBean(NotificationService.class)
    public NotificationService fallback() { return new DefaultNotificationService(); }
    @Bean @ConditionalOnBean(NotificationService.class)
    public NotificationLogger notificationLogger() { return new NotificationLogger(); }
}
