package com.codesnippet.course.lesson07;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.context.annotation.ComponentScan(basePackages={"com.codesnippet.course.lesson07", "com.codesnippet.course.assistant07"}, excludeFilters=@org.springframework.context.annotation.ComponentScan.Filter(type=org.springframework.context.annotation.FilterType.ASSIGNABLE_TYPE, classes=DeprecatedUtilityService.class))

public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
