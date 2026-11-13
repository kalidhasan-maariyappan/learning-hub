package com.codesnippet.course.lesson06;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
@Component
public class ConstructorUser {
    private final Order order;
    public ConstructorUser(Order order) { this.order = order; }
    public String placeOrder() { return order.place(); }
}
