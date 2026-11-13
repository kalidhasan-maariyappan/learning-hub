package com.codesnippet.course.lesson36.service;

import com.codesnippet.course.lesson36.entity.Weather;
import com.codesnippet.course.lesson36.repository.WeatherRepository;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.*;
import org.springframework.transaction.annotation.Transactional;
@Service
public class WeatherService {
    private final WeatherRepository repository;
    public WeatherService(WeatherRepository repository) { this.repository=repository; }
    
    public Weather getWeatherByCity(String city) {
        System.out.println("Database weather lookup: " + city);
        return repository.findByCity(city);
    }
    
    public Weather updateWeather(String city,String forecast) {
        Weather weather=repository.findByCity(city);
        if(weather==null)weather=new Weather(null,city,forecast);else weather.setWeatherForecast(forecast);
        return repository.save(weather);
    }
    @Transactional
    
    public void deleteWeather(String city) { repository.deleteByCity(city); }
}
