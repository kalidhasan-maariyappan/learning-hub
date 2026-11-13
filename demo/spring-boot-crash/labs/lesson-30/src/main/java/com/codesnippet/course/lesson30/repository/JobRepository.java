package com.codesnippet.course.lesson30.repository;

import com.codesnippet.course.lesson30.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
public interface JobRepository extends JpaRepository<Job,Long> {}
