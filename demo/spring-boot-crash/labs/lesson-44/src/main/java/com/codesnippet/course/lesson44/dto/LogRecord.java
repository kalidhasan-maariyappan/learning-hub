package com.codesnippet.course.lesson44.dto;

public class LogRecord {
    private Integer id;
    private String performedBy;
    public LogRecord() {}
    public LogRecord(Integer id, String performedBy) {
        this.id = id;
        this.performedBy = performedBy;
    }
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
}
