package com.codesnippet.course.lesson27;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class LifecycleController {
    private final ApplicantLifecycle lifecycle;
    public LifecycleController(ApplicantLifecycle lifecycle) { this.lifecycle=lifecycle; }
    @GetMapping("/lifecycle") public Map<String,Boolean> trace() { return lifecycle.trace(); }
}
