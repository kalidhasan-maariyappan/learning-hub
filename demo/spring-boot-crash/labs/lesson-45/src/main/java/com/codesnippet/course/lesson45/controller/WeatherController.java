package com.codesnippet.course.lesson45.controller;

import org.springframework.web.bind.annotation.*;
import com.codesnippet.course.lesson45.service.WeatherService;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
@RestController
@RequestMapping("/weather")
public class WeatherController {
    private final WeatherService service;
    public WeatherController(WeatherService service) { this.service=service; }
    @GetMapping("/health") public String health() { return "Weather service running"; }
    @PreAuthorize("hasAuthority('WEATHER_READ')")
    @GetMapping("/{city}") public Map<String,String> get(@PathVariable("city") String city) { return service.get(city); }
    @PreAuthorize("hasAuthority('WEATHER_WRITE')")
    @PostMapping("/{city}") public Map<String,String> update(@PathVariable("city") String city,@RequestParam("forecast") String forecast) { return service.update(city,forecast); }
    @PreAuthorize("hasAuthority('WEATHER_DELETE')")
    @DeleteMapping("/{city}") public void delete(@PathVariable("city") String city) { service.delete(city); }
}
