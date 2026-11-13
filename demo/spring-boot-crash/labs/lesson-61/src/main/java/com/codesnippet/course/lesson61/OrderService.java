package com.codesnippet.course.lesson61;

import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class OrderService {
    private final PaymentService payments;
    public OrderService(PaymentService payments) { this.payments=payments; }
    public void processOrders(List<Order> orders) { for(Order order:orders)payments.processPayment(order); }
}
