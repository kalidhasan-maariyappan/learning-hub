package com.codesnippet.course.lesson48.controller;

import com.codesnippet.course.lesson48.service.OrderService;
import org.springframework.web.bind.annotation.*;
@RestController
public class OrderController {
    private final OrderService orders;
    public OrderController(OrderService orders) { this.orders=orders; }
    @PostMapping("/order/{id}") public String create(@PathVariable("id") String id) {
        orders.createOrder(id);return "Order created";
    }
}
