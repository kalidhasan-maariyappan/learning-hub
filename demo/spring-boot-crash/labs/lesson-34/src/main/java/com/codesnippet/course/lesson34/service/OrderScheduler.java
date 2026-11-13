package com.codesnippet.course.lesson34.service;

import com.codesnippet.course.lesson34.repository.OrderRepository;
import com.codesnippet.course.lesson34.entity.OrderRecord;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
@Service
public class OrderScheduler {
    private final OrderRepository repository;
    public OrderScheduler(OrderRepository repository) { this.repository=repository; }
    @Scheduled(fixedRate=5000)
    public void processPendingOrders() {
        for(OrderRecord order:repository.findByStatus("PENDING")) { order.setStatus("COMPLETED");repository.save(order); }
        System.out.println("Pending orders processed");
    }
}
