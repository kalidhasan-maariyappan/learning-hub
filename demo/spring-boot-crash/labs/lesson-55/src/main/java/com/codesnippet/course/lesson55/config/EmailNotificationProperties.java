package com.codesnippet.course.lesson55.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
@ConfigurationProperties(prefix="notification.email")
public class EmailNotificationProperties {
    private boolean enabled;
    private String fromAddress;
    private String supportAddress;
    private int dailyLimit;
    public EmailNotificationProperties() {}
    public EmailNotificationProperties(boolean enabled, String fromAddress, String supportAddress, int dailyLimit) {
        this.enabled = enabled;
        this.fromAddress = fromAddress;
        this.supportAddress = supportAddress;
        this.dailyLimit = dailyLimit;
    }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public String getFromAddress() { return fromAddress; }
    public void setFromAddress(String fromAddress) { this.fromAddress = fromAddress; }
    public String getSupportAddress() { return supportAddress; }
    public void setSupportAddress(String supportAddress) { this.supportAddress = supportAddress; }
    public int getDailyLimit() { return dailyLimit; }
    public void setDailyLimit(int dailyLimit) { this.dailyLimit = dailyLimit; }
}
