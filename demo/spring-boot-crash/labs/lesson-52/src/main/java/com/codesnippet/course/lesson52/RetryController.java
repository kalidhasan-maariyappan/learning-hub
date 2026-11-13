package com.codesnippet.course.lesson52;

import org.springframework.web.bind.annotation.*;
@RestController
public class RetryController {
    private final ExternalApiService service;
    public RetryController(ExternalApiService service) { this.service=service; }
    @GetMapping("/retry/test") public String test() { return service.callExternalApi(); }
}
