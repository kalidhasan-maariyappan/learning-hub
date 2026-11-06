package com.example.taskmanagement.config;

import org.springframework.context.annotation.*;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.*;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
@EnableScheduling
public class BackgroundConfig {
  @Bean("notificationExecutor")
  TaskExecutor notificationExecutor() {
    var e = new ThreadPoolTaskExecutor();
    e.setCorePoolSize(2);
    e.setMaxPoolSize(4);
    e.setQueueCapacity(100);
    e.setThreadNamePrefix("notification-");
    e.setWaitForTasksToCompleteOnShutdown(true);
    e.setAwaitTerminationSeconds(20);
    e.initialize();
    return e;
  }
}
