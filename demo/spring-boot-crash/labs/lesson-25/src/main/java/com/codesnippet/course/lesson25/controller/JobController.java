package com.codesnippet.course.lesson25.controller;

import com.codesnippet.course.lesson25.repository.PersonRepository;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class JobController {
    private final JobLauncher launcher; private final Job job; private final PersonRepository people;
    public JobController(JobLauncher launcher,Job job,PersonRepository people) { this.launcher=launcher;this.job=job;this.people=people; }
    @PostMapping("/jobs/importData") public Map<String,Object> run() throws Exception {
        JobExecution result=launcher.run(job,new JobParametersBuilder().addLong("startTime",System.nanoTime()).toJobParameters());
        return Map.of("status",result.getStatus().name(),"people",people.findAll());
    }
}
