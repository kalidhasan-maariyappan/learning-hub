package com.example.secureauth.controller;

import com.example.secureauth.entity.User;
import com.example.secureauth.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.Locale;
import java.util.stream.Collectors;

@Controller
public class DashboardController {
    private final UserService userService;

    public DashboardController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication, HttpSession session, Model model) {
        User user = userService.findByEmail(authentication.getName());
        model.addAttribute("username", user.getName());
        model.addAttribute("email", user.getEmail());
        model.addAttribute("role", user.getRole());
        model.addAttribute("initials", initials(user.getName()));
        model.addAttribute("sessionTimeoutSeconds", session.getMaxInactiveInterval());
        return "dashboard";
    }

    private String initials(String name) {
        return Arrays.stream(name.trim().split("\\s+")).limit(2).map(part -> part.substring(0, 1).toUpperCase(Locale.ROOT)).collect(Collectors.joining());
    }
}
