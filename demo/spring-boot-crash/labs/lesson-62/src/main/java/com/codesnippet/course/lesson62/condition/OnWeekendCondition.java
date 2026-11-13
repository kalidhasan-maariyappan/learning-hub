package com.codesnippet.course.lesson62.condition;

import org.springframework.context.annotation.*;
import org.springframework.core.type.AnnotatedTypeMetadata;
import java.time.*;
public class OnWeekendCondition implements Condition {
    public boolean matches(ConditionContext context,AnnotatedTypeMetadata metadata) {
        DayOfWeek day=LocalDate.now().getDayOfWeek();return day==DayOfWeek.SATURDAY||day==DayOfWeek.SUNDAY;
    }
}
