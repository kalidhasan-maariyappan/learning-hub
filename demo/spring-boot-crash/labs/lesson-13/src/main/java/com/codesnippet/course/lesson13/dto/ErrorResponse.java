package com.codesnippet.course.lesson13.dto;

public class ErrorResponse {
    private java.time.LocalDateTime timestamp;
    private String message;
    private String details;
    public ErrorResponse() {}
    public ErrorResponse(java.time.LocalDateTime timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
    public java.time.LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(java.time.LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
