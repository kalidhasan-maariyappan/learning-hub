package com.codesnippet.course.lesson10;

import org.springframework.stereotype.Service;

@Service
public class GooglePayService implements PaymentService { public String processPayment(double amount) { return "GooglePay: " + amount; } }
