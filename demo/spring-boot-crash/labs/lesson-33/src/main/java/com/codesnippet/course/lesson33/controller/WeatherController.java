package com.codesnippet.course.lesson33.controller;

import com.codesnippet.course.lesson33.entity.Weather;
import com.codesnippet.course.lesson33.service.WeatherService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    private final WeatherService service;
    public WeatherController(WeatherService service) { this.service=service; }
    @GetMapping("/{city}") public Weather get(@PathVariable("city") String city) { return service.getWeatherByCity(city); }
    @PutMapping("/{city}") public Weather put(@PathVariable("city") String city,@RequestParam("forecast") String forecast) { return service.updateWeather(city,forecast); }
    @DeleteMapping("/{city}") public void delete(@PathVariable("city") String city) { service.deleteWeather(city); }
}
