package com.codesnippet.course.lesson35.entity;

import jakarta.persistence.*;
@Entity
public class ScheduleConfig {
    @Id private Long id=1L;
    private String cronExpression;
    public ScheduleConfig() {}
    public ScheduleConfig(String expression) { this.cronExpression=expression; }
    public Long getId() { return id; }
    public String getCronExpression() { return cronExpression; }
}
