package com.codesnippet.course.lesson03.service;

import com.codesnippet.course.lesson03.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    public String getEmployee(Integer id) {
        return repository.getEmployee(id);
    }
}
