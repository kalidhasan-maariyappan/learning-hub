package com.codesnippet.course.lesson62;

import com.codesnippet.course.lesson62.payment.PaymentService;
import com.codesnippet.course.lesson62.notification.NotificationService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DemoController {
    private final ObjectProvider<PaymentService> payments; private final NotificationService notifications;
    public DemoController(ObjectProvider<PaymentService> payments,NotificationService notifications) { this.payments=payments;this.notifications=notifications; }
    @GetMapping("/conditions") public Map<String,String> conditions() { PaymentService payment=payments.getIfAvailable();return Map.of("payment",payment==null?"absent":payment.pay(),"notification",notifications.send()); }
}
