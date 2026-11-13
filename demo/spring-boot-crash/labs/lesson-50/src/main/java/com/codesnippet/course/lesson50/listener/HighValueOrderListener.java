package com.codesnippet.course.lesson50.listener;

import com.codesnippet.course.lesson50.event.OrderCreatedEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
@Component
public class HighValueOrderListener {
    @EventListener(condition="#event.amount > 1000")
    public void handle(OrderCreatedEvent event) { System.out.println("High-value order: " + event.getOrderId()); }
}
