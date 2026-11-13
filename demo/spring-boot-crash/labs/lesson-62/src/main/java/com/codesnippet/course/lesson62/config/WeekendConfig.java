package com.codesnippet.course.lesson62.config;

import com.codesnippet.course.lesson62.condition.OnWeekendCondition;
import com.codesnippet.course.lesson62.service.WeekendService;
import org.springframework.context.annotation.*;
@Configuration
public class WeekendConfig { @Bean @Conditional(OnWeekendCondition.class) public WeekendService weekendService() { return new WeekendService(); } }
