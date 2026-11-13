package com.codesnippet.course.lesson10;

import org.springframework.stereotype.Service;

@Service
public class CreditCardService implements PaymentService { public String processPayment(double amount) { return "CreditCard: " + amount; } }
