package com.codesnippet.course.lesson09;

import org.springframework.stereotype.Component;
@Component
public class Employee {
    private final User user;
    public Employee(User user) { this.user=user; }
    public int userIdentity() { return user.identity(); }
}
