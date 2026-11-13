package com.codesnippet.course.lesson50.event;

public class OrderCreatedEvent {
    private String orderId;
    private double amount;
    public OrderCreatedEvent() {}
    public OrderCreatedEvent(String orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
    }
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}
