package com.codesnippet.course.lesson14.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Aspect
@Component
public class LoggingAspect {
    @Pointcut("execution(* com.codesnippet.course.lesson14.service.ProductService.*(..))")
    public void productOperation() {}
    @Before("productOperation()") public void before() { System.out.println("Aspect before product method"); }
    @After("productOperation()") public void after() { System.out.println("Aspect after product method"); }
    @Around("productOperation()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        System.out.println("Around: before proceed");
        Object result=point.proceed();
        System.out.println("Around: after proceed");
        return result;
    }
}
