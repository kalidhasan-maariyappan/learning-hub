package com.codesnippet.course.lesson62.notification;

import org.springframework.stereotype.Service;
@Service
public class SnsNotificationService implements NotificationService { public String send() { return "SNS demonstration notification"; } }
