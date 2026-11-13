package com.codesnippet.course.lesson44;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
