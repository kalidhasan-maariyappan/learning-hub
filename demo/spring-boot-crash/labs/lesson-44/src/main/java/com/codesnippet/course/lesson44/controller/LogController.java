package com.codesnippet.course.lesson44.controller;

import com.codesnippet.course.lesson44.dto.LogRecord;
import com.codesnippet.course.lesson44.service.LogService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class LogController {
    private final LogService service;
    public LogController(LogService service) { this.service=service; }
    @GetMapping("/logs/{id}") public LogRecord get(@PathVariable("id") Integer id) { return service.get(id); }
    @GetMapping("/logs") public List<LogRecord> all() { return service.all(); }
}
