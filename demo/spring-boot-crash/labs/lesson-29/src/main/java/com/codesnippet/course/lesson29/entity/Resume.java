package com.codesnippet.course.lesson29.entity;

import jakarta.persistence.*;

@Entity
public class Resume {
    @Id @GeneratedValue
    private Long id;
    private String content;
    @com.fasterxml.jackson.annotation.JsonIgnore
    @OneToOne
    @JoinColumn(name="applicant_id",nullable=false)
    private Applicant applicant;
    public Resume() {}
    public Resume(Long id, String content, Applicant applicant) {
        this.id = id;
        this.content = content;
        this.applicant = applicant;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Applicant getApplicant() { return applicant; }
    public void setApplicant(Applicant applicant) { this.applicant = applicant; }
}
