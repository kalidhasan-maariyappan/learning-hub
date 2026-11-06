package com.example.taskmanagement.scheduler;

import com.example.taskmanagement.entity.TaskStatus;
import com.example.taskmanagement.notification.*;
import com.example.taskmanagement.repository.*;
import java.time.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OverdueScheduler {
  private final TaskRepository tasks;
  private final NotificationService service;
  private final NotificationRepository notifications;
  private final NotificationWorker worker;
  private final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(getClass());

  public OverdueScheduler(
      TaskRepository t, NotificationService s, NotificationRepository n, NotificationWorker w) {
    tasks = t;
    service = s;
    notifications = n;
    worker = w;
  }

  @Scheduled(
      fixedDelayString = "${app.jobs.overdue-delay-ms:300000}",
      initialDelayString = "${app.jobs.initial-delay-ms:30000}")
  public void scan() {
    for (var task :
        tasks.findByDueDateBeforeAndStatusNot(LocalDate.now(ZoneOffset.UTC), TaskStatus.DONE)) {
      try {
        service.createOverdue(task.getId());
      } catch (org.springframework.dao.DataIntegrityViolationException duplicate) {
        log.debug("Overdue event already recorded for task {}", task.getId());
      } catch (Exception e) {
        log.error("Overdue scan failed for task {}", task.getId(), e);
      }
    }
  }

  @Scheduled(
      fixedDelayString = "${app.jobs.delivery-delay-ms:10000}",
      initialDelayString = "${app.jobs.initial-delay-ms:30000}")
  public void dispatch() {
    for (Long id : notifications.pending(Instant.now(), PageRequest.of(0, 100))) {
      try {
        worker.process(id);
      } catch (org.springframework.core.task.TaskRejectedException busy) {
        log.warn("Notification executor full; pending work will retry");
        break;
      }
    }
  }
}
