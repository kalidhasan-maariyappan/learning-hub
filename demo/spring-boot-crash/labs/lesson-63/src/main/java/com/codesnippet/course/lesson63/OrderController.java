package com.codesnippet.course.lesson63;

import org.springframework.web.bind.annotation.*;
@RestController
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) { this.service=service; }
    @GetMapping("/orders") public String orders() { return service.orders(); }
}
