package com.codesnippet.course.lesson51;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;
@RefreshScope
@RestController
public class ConfigController {
    @Value("${app.name:Local fallback}") private String appName;
    @GetMapping("/config") public String config() { return appName; }
}
