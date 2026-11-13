package com.codesnippet.course.lesson30.controller;

import com.codesnippet.course.lesson30.entity.*;
import com.codesnippet.course.lesson30.repository.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
@RestController
public class JobController {
    private final JobRepository jobs; private final ApplicantRepository applicants;
    public JobController(JobRepository jobs,ApplicantRepository applicants) { this.jobs=jobs;this.applicants=applicants; }
    @PostMapping("/jobs") public Job create(@RequestBody Job job) { return jobs.save(job); }
    @Transactional
    @PostMapping("/jobs/{jobId}/applicants/{applicantId}") public Applicant associate(@PathVariable("jobId") Long jobId,@PathVariable("applicantId") Long applicantId) {
        Job job=jobs.findById(jobId).orElseThrow(); Applicant applicant=applicants.findById(applicantId).orElseThrow();
        if(applicant.getJobs()==null)applicant.setJobs(new ArrayList<>());
        applicant.getJobs().add(job);
        return applicants.save(applicant);
    }
}
