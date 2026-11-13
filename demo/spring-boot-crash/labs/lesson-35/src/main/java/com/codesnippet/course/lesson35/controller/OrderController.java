package com.codesnippet.course.lesson35.controller;

import com.codesnippet.course.lesson35.entity.OrderRecord;
import com.codesnippet.course.lesson35.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class OrderController {
    private final OrderRepository repository;
    public OrderController(OrderRepository repository) { this.repository=repository; }
    @PostMapping("/orders") public OrderRecord create() { return repository.save(new OrderRecord(null,"PENDING")); }
    @GetMapping("/orders") public List<OrderRecord> all() { return repository.findAll(); }
}
