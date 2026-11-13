package com.codesnippet.course.lesson48.event;

public class OrderCreatedEvent {
    private String orderId;
    public OrderCreatedEvent() {}
    public OrderCreatedEvent(String orderId) {
        this.orderId = orderId;
    }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
}
