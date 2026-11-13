package com.codesnippet.course.lesson11;

import org.springframework.stereotype.Component;
@Component
@org.springframework.boot.autoconfigure.condition.ConditionalOnProperty(prefix="nosqlconnection", name="enabled", havingValue="true")
public class NoSQLConnection { public String name() { return "NoSQL"; } }
