package com.codesnippet.springeventsdemo.controllers;

import com.codesnippet.springeventsdemo.services.OrderService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order/{orderId}")
    public void createOrder(@PathVariable("orderId") String orderId) {
        orderService.createOrder(orderId);
    }
}
