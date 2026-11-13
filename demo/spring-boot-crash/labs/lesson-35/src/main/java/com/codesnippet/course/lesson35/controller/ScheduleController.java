package com.codesnippet.course.lesson35.controller;

import com.codesnippet.course.lesson35.service.DynamicScheduler;
import org.springframework.web.bind.annotation.*;
@RestController
public class ScheduleController {
    private final DynamicScheduler scheduler;
    public ScheduleController(DynamicScheduler scheduler) { this.scheduler=scheduler; }
    @PostMapping("/schedule") public String update(@RequestParam("cron") String expression) { scheduler.update(expression);return "Schedule updated"; }
}
