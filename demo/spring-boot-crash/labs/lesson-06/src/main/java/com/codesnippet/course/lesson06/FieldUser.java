package com.codesnippet.course.lesson06;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
@Component
public class FieldUser {
    @Autowired
    private Order order;
    public String placeOrder() { return order.place(); }
}
