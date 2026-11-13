package com.codesnippet.course.lesson54;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.*;
@Component
@Scope(value="prototype",proxyMode=ScopedProxyMode.TARGET_CLASS)
public class ScopedPrototypeBean { public int identity() { return System.identityHashCode(this); } }
