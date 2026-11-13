package com.codesnippet.course.lesson12;

import org.springframework.stereotype.Component;
@Component
@org.springframework.context.annotation.Profile("dev")
public class MySQLConnection { public String name() { return "MySQL"; } }
