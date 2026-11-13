package com.codesnippet.course.lesson62.config;

import com.codesnippet.course.lesson62.notification.NotificationLogger;
import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
@Configuration
@ConditionalOnExpression("${feature.expression-logger.enabled:false}")
public class ExpressionNotificationConfig {
    // Enable this as an alternative to the bean-presence logger configuration.
    @Bean public NotificationLogger expressionNotificationLogger() { return new NotificationLogger(); }
}
