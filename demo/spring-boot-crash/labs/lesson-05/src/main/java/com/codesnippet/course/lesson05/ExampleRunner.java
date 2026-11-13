package com.codesnippet.course.lesson05;

import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
@Component
public class ExampleRunner implements CommandLineRunner {
    private final ApplicationContext context;
    public ExampleRunner(ApplicationContext context) { this.context = context; }
    public void run(String... args) {
        System.out.println("Product bean: " + context.getBean("productService").getClass().getSimpleName());
        System.out.println(((PaymentService) context.getBean("creditCardPaymentService")).processPayment());
        System.out.println(((PaymentService) context.getBean("googlePayPaymentService")).processPayment());
    }
}
