package com.codesnippet.course.lesson09;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.*;
@Component
@Scope(value="request", proxyMode=ScopedProxyMode.TARGET_CLASS)
public class User { public int identity() { return System.identityHashCode(this); } }
