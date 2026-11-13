package com.codesnippet.course.lesson37;

import org.springframework.web.bind.annotation.*;
@RestController
public class WeatherController { @GetMapping("/weather/health") public String health() { return "Weather service running"; } }
