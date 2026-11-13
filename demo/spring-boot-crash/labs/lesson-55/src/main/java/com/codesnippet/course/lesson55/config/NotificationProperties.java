package com.codesnippet.course.lesson55.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.*;
@Validated
@ConfigurationProperties(prefix="notification")
public class NotificationProperties {
    @Min(1) private int timeoutSeconds;
    @Min(1) private int connectionPoolSize;
    public int getConnectionPoolSize() { return connectionPoolSize; }
    public void setConnectionPoolSize(int value) { connectionPoolSize=value; }
    @Valid private Email email=new Email();
    private Sms sms=new Sms(); private Retry retry=new Retry();
    private Map<String,String> templates=new LinkedHashMap<>();
    public int getTimeoutSeconds() { return timeoutSeconds; }
    public void setTimeoutSeconds(int value) { timeoutSeconds=value; }
    public Email getEmail() { return email; } public void setEmail(Email value) { email=value; }
    public Sms getSms() { return sms; } public void setSms(Sms value) { sms=value; }
    public Retry getRetry() { return retry; } public void setRetry(Retry value) { retry=value; }
    public Map<String,String> getTemplates() { return templates; } public void setTemplates(Map<String,String> value) { templates=value; }
    public static class Email {
        private boolean enabled; @NotBlank private String fromAddress; private String supportAddress; private int dailyLimit;
        private List<String> defaultRecipients=new ArrayList<>();
        public boolean isEnabled() { return enabled; } public void setEnabled(boolean value) { enabled=value; }
        public String getFromAddress() { return fromAddress; } public void setFromAddress(String value) { fromAddress=value; }
        public String getSupportAddress() { return supportAddress; } public void setSupportAddress(String value) { supportAddress=value; }
        public int getDailyLimit() { return dailyLimit; } public void setDailyLimit(int value) { dailyLimit=value; }
        public List<String> getDefaultRecipients() { return defaultRecipients; } public void setDefaultRecipients(List<String> value) { defaultRecipients=value; }
    }
    public static class Sms {
        private boolean enabled; private String senderId; private int dailyLimit;
        public boolean isEnabled() { return enabled; } public void setEnabled(boolean value) { enabled=value; }
        public String getSenderId() { return senderId; } public void setSenderId(String value) { senderId=value; }
        public int getDailyLimit() { return dailyLimit; } public void setDailyLimit(int value) { dailyLimit=value; }
    }
    public static class Retry {
        private int maxAttempts; private long backoffMillis;
        public int getMaxAttempts() { return maxAttempts; } public void setMaxAttempts(int value) { maxAttempts=value; }
        public long getBackoffMillis() { return backoffMillis; } public void setBackoffMillis(long value) { backoffMillis=value; }
    }
}
