package com.codesnippet.course.lesson33.entity;

import jakarta.persistence.*;
@Entity
public class Weather implements java.io.Serializable {
    @Id @GeneratedValue
    private Long id;
    private String city;
    private String weatherForecast;
    public Weather() {}
    public Weather(Long id, String city, String weatherForecast) {
        this.id = id;
        this.city = city;
        this.weatherForecast = weatherForecast;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getWeatherForecast() { return weatherForecast; }
    public void setWeatherForecast(String weatherForecast) { this.weatherForecast = weatherForecast; }
}
