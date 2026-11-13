package com.codesnippet.course.lesson10;

import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Primary;
@Primary
@Service
public class DefaultPaymentService implements PaymentService { public String processPayment(double amount) { return "DefaultPayment: " + amount; } }
