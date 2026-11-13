package com.codesnippet.course.lesson25.repository;

import com.codesnippet.course.lesson25.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PersonRepository extends JpaRepository<Person,Long> {}
