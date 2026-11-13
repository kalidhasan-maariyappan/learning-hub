package com.codesnippet.course.lesson40.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
@Service
public class WeatherService {
    private final Map<String,String> weather=new ConcurrentHashMap<>();
    public Map<String,String> get(String city) { return Map.of("city",city,"forecast",weather.getOrDefault(city,"Sunny")); }
    public Map<String,String> update(String city,String forecast) { weather.put(city,forecast);return get(city); }
    public void delete(String city) { weather.remove(city); }
}
