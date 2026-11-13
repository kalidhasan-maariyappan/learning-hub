package com.codesnippet.course.lesson35.service;

import com.codesnippet.course.lesson35.entity.ScheduleConfig;
import com.codesnippet.course.lesson35.repository.ScheduleConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import java.util.concurrent.ScheduledFuture;
import jakarta.annotation.PreDestroy;
@Service
public class DynamicScheduler {
    private final ThreadPoolTaskScheduler scheduler=new ThreadPoolTaskScheduler();
    private final OrderScheduler orders; private final ScheduleConfigRepository repository;
    private ScheduledFuture<?> task;
    public DynamicScheduler(OrderScheduler orders,ScheduleConfigRepository repository) { this.orders=orders;this.repository=repository;scheduler.initialize(); }
    public synchronized void update(String expression) {
        CronTrigger trigger=new CronTrigger(expression);
        repository.save(new ScheduleConfig(expression));
        if(task!=null)task.cancel(false);
        task=scheduler.schedule(orders::processPendingOrders,trigger);
    }
    @PreDestroy public void close() { scheduler.shutdown(); }
}
