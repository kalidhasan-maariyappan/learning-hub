package com.codesnippet.course.lesson06;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
@Component
public class SetterUser {
    private Order order;
    @Autowired
    public void setOrder(Order order) { this.order = order; }
    public String placeOrder() { return order.place(); }
}
