package com.codesnippet.course.lesson30.service;

import com.codesnippet.course.lesson30.entity.*;
import com.codesnippet.course.lesson30.repository.ApplicantRepository;
import org.springframework.stereotype.Service;
@Service
public class ApplicantService {
    private final ApplicantRepository repository;
    public ApplicantService(ApplicantRepository repository) { this.repository=repository; }
    public Applicant save(Applicant applicant) {
        if(applicant.getResume()!=null)applicant.getResume().setApplicant(applicant);
        if(applicant.getApplications()!=null)for(JobApplication application:applicant.getApplications())application.setApplicant(applicant);
        return repository.save(applicant);
    }
}
