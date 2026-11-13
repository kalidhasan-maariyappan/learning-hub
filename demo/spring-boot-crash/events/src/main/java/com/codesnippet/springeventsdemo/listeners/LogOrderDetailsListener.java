package com.codesnippet.springeventsdemo.listeners;

import com.codesnippet.springeventsdemo.events.OrderCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class LogOrderDetailsListener {
    @EventListener
    public void logOrderCreated(OrderCreatedEvent event) {
        System.out.println("Order placed for order ID " + event.getOrderId());
    }
}
