package com.codesnippet.springeventsdemo.listeners;

import com.codesnippet.springeventsdemo.events.OrderCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationListener {
    @EventListener
    public void handleOrderCreatedAndSendEmail(OrderCreatedEvent event) {
        System.out.println("Sending email for order " + event.getOrderId());
    }
}
