package com.codesnippet.course.lesson54;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.*;
@Component
@Scope(value="prototype")
public class PrototypeBean { public int identity() { return System.identityHashCode(this); } }
