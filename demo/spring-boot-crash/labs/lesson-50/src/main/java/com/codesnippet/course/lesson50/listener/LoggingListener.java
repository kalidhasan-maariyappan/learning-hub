package com.codesnippet.course.lesson50.listener;

import com.codesnippet.course.lesson50.event.OrderCreatedEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
@Component
public class LoggingListener {
    @EventListener
    @Async
    @Order(1)
    public void handle(OrderCreatedEvent event) throws InterruptedException {
        Thread.sleep(1000);
        System.out.println("Logging listener: " + event.getOrderId());
    }
}
