package com.codesnippet.course.lesson62.notification;

import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
@Service
@ConditionalOnProperty(name="feature.email.enabled",havingValue="true")
public class EmailService { public EmailService() { System.out.println("Email service initialized"); } }
