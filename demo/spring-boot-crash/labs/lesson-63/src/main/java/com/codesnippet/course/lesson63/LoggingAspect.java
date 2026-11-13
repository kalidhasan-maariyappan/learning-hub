package com.codesnippet.course.lesson63;

import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Aspect @Component
public class LoggingAspect {
    @Before("execution(* com.codesnippet.course.lesson63.OrderService.orders(..))")
    public void log() { System.out.println("Before orders service"); }
}
