package com.codesnippet.course.lesson31.repository;

import com.codesnippet.course.lesson31.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WeatherRepository extends JpaRepository<Weather,Long> {
    Weather findByCity(String city);
    void deleteByCity(String city);
}
