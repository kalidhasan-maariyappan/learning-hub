package com.codesnippet.course.lesson42.controller;

import org.springframework.web.bind.annotation.*;
import com.codesnippet.course.lesson42.service.WeatherService;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
@RestController
@RequestMapping("/weather")
public class WeatherController {
    private final WeatherService service;
    public WeatherController(WeatherService service) { this.service=service; }
    @GetMapping("/health") public String health() { return "Weather service running"; }
    
    @GetMapping("/{city}") public Map<String,String> get(@PathVariable("city") String city) { return service.get(city); }
    
    @PostMapping("/{city}") public Map<String,String> update(@PathVariable("city") String city,@RequestParam("forecast") String forecast) { return service.update(city,forecast); }
    
    @DeleteMapping("/{city}") public void delete(@PathVariable("city") String city) { service.delete(city); }
}
