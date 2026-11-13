package com.codesnippet.course.lesson62.payment;

import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
@Service
@ConditionalOnProperty(name="payment.provider",havingValue="paypal",matchIfMissing=true)
public class PayPalPaymentService implements PaymentService { public String pay() { return "PayPal payment processed"; } }
