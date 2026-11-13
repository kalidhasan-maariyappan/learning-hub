package com.codesnippet.course.lesson06;

import org.springframework.stereotype.Component;
@Component
public class OnlineOrder implements Order { public String place() { return "Online order placed"; } }
