package com.example.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@ControllerAdvice
public class Errors {
    @ExceptionHandler(Exception.class)
    Object handle(Exception ex, HttpServletRequest request) {
        int code = ex instanceof ResponseStatusException r
                ? r.getStatusCode().value()
                : ex instanceof org.springframework.web.ErrorResponse response
                        ? response.getStatusCode().value()
                        : ex instanceof IllegalArgumentException ? 400 : 503;
        // Never echo gateway exception bodies or credentials into pages or logs.
        String message = ex instanceof IllegalArgumentException
                ? ex.getMessage()
                : code == 404
                        ? "We couldn't find that page."
                        : code == 403
                                ? "You don't have access to this page."
                                : "We couldn't confirm this action. Your existing order is saved. Reconcile its status before trying again.";
        if (request.getRequestURI().endsWith("/payments/webhook"))
            return ResponseEntity.status(code).body(Map.of("status", "retry", "message", "Webhook was not processed."));
        ModelAndView view = new ModelAndView("error");
        view.setStatus(org.springframework.http.HttpStatus.valueOf(code));
        view.addObject("message", message);
        view.addObject("code", code);
        return view;
    }
}
