package com.example.ecommerce.controller;

import com.example.ecommerce.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class WebhookController {
    final PaymentService payments;

    public WebhookController(PaymentService p) {
        payments = p;
    }

    @PostMapping("/payments/webhook")
    Map<String, String> webhook(@RequestBody byte[] body, @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature, @RequestHeader(value = "X-Razorpay-Event-Id", required = false) String id) {
        payments.webhook(body, signature, id);
        return Map.of("status", "accepted");
    }
}
