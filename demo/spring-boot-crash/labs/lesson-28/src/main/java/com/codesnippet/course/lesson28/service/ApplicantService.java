package com.codesnippet.course.lesson28.service;

import com.codesnippet.course.lesson28.entity.*;
import com.codesnippet.course.lesson28.repository.ApplicantRepository;
import org.springframework.stereotype.Service;
@Service
public class ApplicantService {
    private final ApplicantRepository repository;
    public ApplicantService(ApplicantRepository repository) { this.repository=repository; }
    public Applicant save(Applicant applicant) {


        return repository.save(applicant);
    }
}
