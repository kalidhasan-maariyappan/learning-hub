package com.codesnippet.course.lesson61;

import org.springframework.stereotype.Service;
@Service
public class PaymentService { public void processPayment(Order order) { System.out.println("Payment processed for order " + order.getId()); } }
