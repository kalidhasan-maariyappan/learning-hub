package com.codesnippet.course.lesson61;

import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) { this.service=service; }
    @PostMapping("/order/process") public String process() { service.processOrders(List.of(new Order(1)));return "Orders processed"; }
}
