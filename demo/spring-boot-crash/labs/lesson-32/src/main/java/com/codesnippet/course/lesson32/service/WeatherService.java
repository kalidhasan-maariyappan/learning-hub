package com.codesnippet.course.lesson32.service;

import com.codesnippet.course.lesson32.entity.Weather;
import com.codesnippet.course.lesson32.repository.WeatherRepository;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.*;
import org.springframework.transaction.annotation.Transactional;
@Service
public class WeatherService {
    private final WeatherRepository repository;
    public WeatherService(WeatherRepository repository) { this.repository=repository; }
    @Cacheable(value="weather",key="#city")
    public Weather getWeatherByCity(String city) {
        System.out.println("Database weather lookup: " + city);
        return repository.findByCity(city);
    }
    @CachePut(value="weather",key="#city")
    public Weather updateWeather(String city,String forecast) {
        Weather weather=repository.findByCity(city);
        if(weather==null)weather=new Weather(null,city,forecast);else weather.setWeatherForecast(forecast);
        return repository.save(weather);
    }
    @Transactional
    @CacheEvict(value="weather",key="#city")
    public void deleteWeather(String city) { repository.deleteByCity(city); }
}
