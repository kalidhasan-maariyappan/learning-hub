package com.codesnippet.course.lesson05;

import org.springframework.context.annotation.*;
@Configuration
public class PaymentConfig {
    @Bean public PaymentService creditCardPaymentService() { return new CreditCardService(); }
    @Bean public PaymentService googlePayPaymentService() { return new GooglePayService(); }
}
