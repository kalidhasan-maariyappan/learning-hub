package com.codesnippet.course.lesson10;

import org.springframework.web.bind.annotation.*;
@RestController
public class CheckoutController {
    private final CheckoutService checkout;
    public CheckoutController(CheckoutService checkout) { this.checkout=checkout; }
    @GetMapping("/pay") public String pay(@RequestParam("amount") double amount) { return checkout.checkout(amount); }
}
