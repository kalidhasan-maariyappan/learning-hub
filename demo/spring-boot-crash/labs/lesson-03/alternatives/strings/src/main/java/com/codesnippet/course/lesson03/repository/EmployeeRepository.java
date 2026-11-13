package com.codesnippet.course.lesson03.repository;

import org.springframework.stereotype.Repository;

@Repository
public class EmployeeRepository {
    public String getEmployee(Integer id) {
        return "Chetan";
    }
}
