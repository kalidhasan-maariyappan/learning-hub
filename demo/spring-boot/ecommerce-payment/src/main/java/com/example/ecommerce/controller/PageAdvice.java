package com.example.ecommerce.controller;

import com.example.ecommerce.service.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import java.security.Principal;

@ControllerAdvice
public class PageAdvice {
    final AccountService accounts;
    final CartService carts;

    public PageAdvice(AccountService a, CartService c) {
        accounts = a;
        carts = c;
    }

    @ModelAttribute
    void common(Principal p, Model m) {
        if (p != null) {
            var u = accounts.current(p.getName());
            m.addAttribute("viewer", u);
            m.addAttribute("bagCount", carts.view(u.id).count());
        } else
            m.addAttribute("bagCount", 0);
    }
}
