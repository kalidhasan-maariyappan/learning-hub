package com.codesnippet.course.lesson30.entity;

import jakarta.persistence.*;

@Entity
public class Job {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String description;
    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToMany(mappedBy="jobs")
    private java.util.List<Applicant> applicants;
    public Job() {}
    public Job(Long id, String title, String description, java.util.List<Applicant> applicants) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.applicants = applicants;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public java.util.List<Applicant> getApplicants() { return applicants; }
    public void setApplicants(java.util.List<Applicant> applicants) { this.applicants = applicants; }
}
