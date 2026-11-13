package com.codesnippet.course.lesson30.entity;

import jakarta.persistence.*;

@Entity
public class JobApplication {
    @Id @GeneratedValue
    private Long id;
    private String status;
    private String position;
    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToOne
    @JoinColumn(name="applicant_id",nullable=false)
    private Applicant applicant;
    public JobApplication() {}
    public JobApplication(Long id, String status, String position, Applicant applicant) {
        this.id = id;
        this.status = status;
        this.position = position;
        this.applicant = applicant;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public Applicant getApplicant() { return applicant; }
    public void setApplicant(Applicant applicant) { this.applicant = applicant; }
}
