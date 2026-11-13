package com.codesnippet.course.lesson12;

import org.springframework.stereotype.Component;
@Component
@org.springframework.context.annotation.Profile("prod")
public class NoSQLConnection { public String name() { return "NoSQL"; } }
