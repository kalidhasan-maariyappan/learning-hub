package com.example.patientmanagement.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Only renders pages. POST /login and POST /logout are processed by Spring Security filters,
 * so there are deliberately no handler methods for them here.
 */
@Controller
public class LoginController {

    @GetMapping("/login")
    public String login(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            return "redirect:/dashboard"; // already signed in
        }
        return "login";
    }

    @GetMapping("/")
    public String root() {
        return "redirect:/dashboard";
    }

    /**
     * No HTTP method restriction: Spring Security forwards here from whatever request was denied
     * (often a POST), and a GET-only mapping would turn that into a 405.
     */
    @RequestMapping("/access-denied")
    public String accessDenied() {
        return "errors/403";
    }
}
