package com.codesnippet.course.lesson48.listener;

import com.codesnippet.course.lesson48.event.OrderCreatedEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
@Component
public class LoggingListener {
    @EventListener

    public void handle(OrderCreatedEvent event) {
        
        System.out.println("Logging listener: " + event.getOrderId());
    }
}
