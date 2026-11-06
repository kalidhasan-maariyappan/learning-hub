package com.example.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "webhook_events")
public class WebhookEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long getId() {
        return id;
    }

    @Column(nullable = false, unique = true)
    public String gatewayEventId;

    public String getGatewayEventId() {
        return gatewayEventId;
    }

    @Column(nullable = false)
    public String eventType;

    public String getEventType() {
        return eventType;
    }

    @Column(nullable = false)
    public java.time.Instant processedAt;

    public java.time.Instant getProcessedAt() {
        return processedAt;
    }

    @Column(nullable = false)
    public String status;

    public String getStatus() {
        return status;
    }
}
