package com.example.ecommerce.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorPageController implements ErrorController {
    @RequestMapping("/error")
    String error(HttpServletRequest request, Model model) {
        Object value = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int code = value instanceof Integer i ? i : 500;
        model.addAttribute("code", code);
        model.addAttribute("message",
                code == 403
                        ? "You don't have access to this page. Sign in with the right account."
                        : code == 404 ? "We couldn't find that page." : "We couldn't complete this action. Check your orders before trying a payment again.");
        return "error";
    }
}
