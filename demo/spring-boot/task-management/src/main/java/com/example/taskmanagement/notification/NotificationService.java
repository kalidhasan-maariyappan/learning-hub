package com.example.taskmanagement.notification;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.repository.*;
import com.example.taskmanagement.service.*;
import java.time.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {
  private final NotificationRepository notifications;
  private final TaskRepository tasks;
  private final AccessService access;

  public NotificationService(NotificationRepository n, TaskRepository t, AccessService a) {
    notifications = n;
    tasks = t;
    access = a;
  }

  @Transactional(readOnly = true)
  public Page<NotificationView> list(Long actor, int page, int size) {
    access.user(actor);
    return notifications
        .findByRecipientId(actor, TaskService.pageable(page, size, "createdAt,desc"))
        .map(NotificationView::of);
  }

  @Transactional
  public void createOverdue(Long taskId) {
    Task t = tasks.findById(taskId).orElse(null);
    if (t == null
        || t.dueDate == null
        || !t.dueDate.isBefore(LocalDate.now(ZoneOffset.UTC))
        || t.status == TaskStatus.DONE) return;
    User recipient = t.assignee == null ? t.creator : t.assignee;
    if (!access.isMember(t.project, recipient)) return;
    String key = t.getId() + ":" + t.dueDate + ":" + recipient.getId();
    if (notifications.existsByEventKey(key)) return;
    Notification n = new Notification();
    n.task = t;
    n.recipient = recipient;
    n.eventKey = key;
    n.message = "Task #" + t.getId() + " is overdue (due " + t.dueDate + ")";
    notifications.saveAndFlush(n);
  }
}
