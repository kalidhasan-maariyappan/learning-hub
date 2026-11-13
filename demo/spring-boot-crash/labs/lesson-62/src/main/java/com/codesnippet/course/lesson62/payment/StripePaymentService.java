package com.codesnippet.course.lesson62.payment;

import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
@Service
@ConditionalOnProperty(name="payment.provider",havingValue="stripe")
public class StripePaymentService implements PaymentService { public String pay() { return "Stripe payment processed"; } }
