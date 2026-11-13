package com.codesnippet.course.lesson08;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class Application {
    public static void main(String[] args) {
        var context = SpringApplication.run(Application.class, args);
        context.close();
    }

}
