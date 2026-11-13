package com.codesnippet.course.lesson30.entity;

import jakarta.persistence.*;

@Entity
public class Applicant {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String status;
    @OneToOne(mappedBy="applicant",cascade=CascadeType.ALL)
    private Resume resume;
    @OneToMany(mappedBy="applicant",cascade=CascadeType.ALL)
    private java.util.List<JobApplication> applications;
    @ManyToMany
    @JoinTable(name="applicant_jobs",joinColumns=@JoinColumn(name="applicant_id"),inverseJoinColumns=@JoinColumn(name="job_id"))
    private java.util.List<Job> jobs;
    public Applicant() {}
    public Applicant(Long id, String name, String email, String phone, String status, Resume resume, java.util.List<JobApplication> applications, java.util.List<Job> jobs) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.resume = resume;
        this.applications = applications;
        this.jobs = jobs;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Resume getResume() { return resume; }
    public void setResume(Resume resume) { this.resume = resume; }
    public java.util.List<JobApplication> getApplications() { return applications; }
    public void setApplications(java.util.List<JobApplication> applications) { this.applications = applications; }
    public java.util.List<Job> getJobs() { return jobs; }
    public void setJobs(java.util.List<Job> jobs) { this.jobs = jobs; }
}
