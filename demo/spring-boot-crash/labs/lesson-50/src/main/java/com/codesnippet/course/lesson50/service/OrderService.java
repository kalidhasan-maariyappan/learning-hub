package com.codesnippet.course.lesson50.service;

import com.codesnippet.course.lesson50.event.OrderCreatedEvent;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationEventPublisher;
@Service
public class OrderService {
    private final ApplicationEventPublisher publisher;
    public OrderService(ApplicationEventPublisher publisher) { this.publisher=publisher; }
    public void createOrder(String orderId,double amount) {
        System.out.println("Order created: " + orderId);
        publisher.publishEvent(new OrderCreatedEvent(orderId,amount));
    }
}
