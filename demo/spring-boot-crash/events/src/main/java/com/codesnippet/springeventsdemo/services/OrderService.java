package com.codesnippet.springeventsdemo.services;

import com.codesnippet.springeventsdemo.events.OrderCreatedEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final ApplicationEventPublisher publisher;

    public OrderService(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }

    public void createOrder(String orderId) {
        System.out.println("Order created for order ID " + orderId);
        publisher.publishEvent(new OrderCreatedEvent(orderId));
    }
}
