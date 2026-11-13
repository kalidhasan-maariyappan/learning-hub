package com.codesnippet.course.lesson10;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Qualifier;
@Service
public class CheckoutService {
    private final PaymentService payments;
    public CheckoutService(@Qualifier("googlePayService") PaymentService payments) { this.payments=payments; }
    public String checkout(double amount) { return payments.processPayment(amount); }
}
