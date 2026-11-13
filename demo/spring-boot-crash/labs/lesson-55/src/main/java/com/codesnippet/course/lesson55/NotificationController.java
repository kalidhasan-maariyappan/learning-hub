package com.codesnippet.course.lesson55;

import com.codesnippet.course.lesson55.config.NotificationProperties;
import org.springframework.web.bind.annotation.*;
@RestController
public class NotificationController {
    private final NotificationService service;
    public NotificationController(NotificationService service) { this.service=service; }
    @GetMapping("/config") public NotificationProperties config() { return service.sendTestNotification(); }
}
