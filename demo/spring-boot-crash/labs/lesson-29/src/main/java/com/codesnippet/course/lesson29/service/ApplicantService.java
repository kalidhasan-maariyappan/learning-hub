package com.codesnippet.course.lesson29.service;

import com.codesnippet.course.lesson29.entity.*;
import com.codesnippet.course.lesson29.repository.ApplicantRepository;
import org.springframework.stereotype.Service;
@Service
public class ApplicantService {
    private final ApplicantRepository repository;
    public ApplicantService(ApplicantRepository repository) { this.repository=repository; }
    public Applicant save(Applicant applicant) {
        if(applicant.getResume()!=null)applicant.getResume().setApplicant(applicant);

        return repository.save(applicant);
    }
}
