package com.example.patientmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/** Phase 3: protected landing page. Summary cards and widgets are added in Phases 6 and 7. */
@Controller
public class DashboardController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
}
