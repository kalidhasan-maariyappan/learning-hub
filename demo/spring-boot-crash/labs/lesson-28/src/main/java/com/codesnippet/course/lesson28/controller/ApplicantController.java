package com.codesnippet.course.lesson28.controller;

import com.codesnippet.course.lesson28.entity.Applicant;
import com.codesnippet.course.lesson28.repository.ApplicantRepository;
import com.codesnippet.course.lesson28.service.ApplicantService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;
import java.util.List;
@RestController
@RequestMapping("/applicants")
public class ApplicantController {
    private final ApplicantRepository repository; private final ApplicantService service;
    public ApplicantController(ApplicantRepository repository,ApplicantService service) { this.repository=repository;this.service=service; }
    @PostMapping public Applicant create(@RequestBody Applicant applicant) { return service.save(applicant); }
    @GetMapping public List<Applicant> all() { return repository.findAll(); }
    @GetMapping("/page") public Page<Applicant> page(@RequestParam(defaultValue="0",name="page") int page,@RequestParam(defaultValue="2",name="size") int size) { return repository.findAll(PageRequest.of(page,size)); }
    @GetMapping("/status/{status}") public List<Applicant> status(@PathVariable("status") String status) { return repository.findByStatus(status); }
    @GetMapping("/search") public List<Applicant> search(@RequestParam("name") String name) { return repository.findApplicantsByPartialName(name); }
}
