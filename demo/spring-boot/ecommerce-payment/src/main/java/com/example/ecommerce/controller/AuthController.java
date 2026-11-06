package com.example.ecommerce.controller;

import com.example.ecommerce.dto.RegisterForm;
import com.example.ecommerce.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    private final AccountService accounts;

    public AuthController(AccountService a) {
        accounts = a;
    }

    @GetMapping("/login")
    String login() {
        return "auth/login";
    }

    @GetMapping("/register")
    String register() {
        return "auth/register";
    }

    @PostMapping("/register")
    String register(@Valid @ModelAttribute RegisterForm form, BindingResult errors, RedirectAttributes flash) {
        if (errors.hasErrors()) {
            flash.addFlashAttribute("error", errors.getAllErrors().getFirst().getDefaultMessage());
            return "redirect:/register";
        }
        try {
            accounts.register(form);
        } catch (IllegalArgumentException e) {
            flash.addFlashAttribute("error", e.getMessage());
            return "redirect:/register";
        }
        flash.addFlashAttribute("notice", "Your account is ready. Sign in to start exploring.");
        return "redirect:/login";
    }
}
