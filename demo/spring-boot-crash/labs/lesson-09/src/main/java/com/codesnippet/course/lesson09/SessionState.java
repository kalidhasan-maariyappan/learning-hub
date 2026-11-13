package com.codesnippet.course.lesson09;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
@Component
@SessionScope
public class SessionState { public int identity() { return System.identityHashCode(this); } }
