package com.codesnippet.course.lesson31.config;

import com.codesnippet.course.lesson31.interceptor.LoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final LoggingInterceptor interceptor;
    public WebConfig(LoggingInterceptor interceptor) { this.interceptor=interceptor; }
    public void addInterceptors(InterceptorRegistry registry) { registry.addInterceptor(interceptor).addPathPatterns("/api/**").excludePathPatterns("/api/auth/**"); }
}
