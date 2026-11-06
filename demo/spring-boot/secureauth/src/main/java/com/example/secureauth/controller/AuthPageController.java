package com.example.secureauth.controller;

import com.example.secureauth.dto.RegistrationForm;
import com.example.secureauth.exception.DuplicateEmailException;
import com.example.secureauth.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthPageController {
    private final UserService userService;

    public AuthPageController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home(Authentication authentication) {
        return isLoggedIn(authentication) ? "redirect:/dashboard" : "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage(Authentication authentication) {
        return isLoggedIn(authentication) ? "redirect:/dashboard" : "login";
    }

    @GetMapping("/register")
    public String registerPage(Authentication authentication, Model model) {
        if (isLoggedIn(authentication)) {
            return "redirect:/dashboard";
        }
        model.addAttribute("registrationForm", new RegistrationForm());
        return "register";
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("registrationForm") RegistrationForm form, BindingResult result, Authentication authentication) {
        if (isLoggedIn(authentication)) {
            return "redirect:/dashboard";
        }
        if (form.getPassword() != null && !form.getPassword().equals(form.getConfirmPassword())) {
            result.rejectValue("confirmPassword", "mismatch", "Passwords do not match");
        }
        if (result.hasErrors()) {
            clearPasswords(form);
            return "register";
        }
        try {
            userService.register(form);
        } catch (DuplicateEmailException e) {
            result.rejectValue("email", "duplicate", e.getMessage());
            clearPasswords(form);
            return "register";
        }
        return "redirect:/login?registered";
    }

    private void clearPasswords(RegistrationForm form) {
        form.setPassword(null);
        form.setConfirmPassword(null);
    }

    private boolean isLoggedIn(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken);
    }
}
