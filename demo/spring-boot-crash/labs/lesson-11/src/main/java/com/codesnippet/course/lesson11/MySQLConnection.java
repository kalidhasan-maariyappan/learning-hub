package com.codesnippet.course.lesson11;

import org.springframework.stereotype.Component;
@Component
@org.springframework.boot.autoconfigure.condition.ConditionalOnProperty(prefix="sqlconnection", name="enabled", havingValue="true")
public class MySQLConnection { public String name() { return "MySQL"; } }
