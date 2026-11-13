package com.codesnippet.course.lesson50.config;

import org.springframework.context.annotation.*;
import org.springframework.context.event.*;
@Configuration
public class EventConfig {
    @Bean public ApplicationEventMulticaster applicationEventMulticaster() {
        SimpleApplicationEventMulticaster multicaster=new SimpleApplicationEventMulticaster();
        multicaster.setErrorHandler(error->System.out.println("Listener dispatch error: " + error.getMessage()));
        return multicaster;
    }
}
