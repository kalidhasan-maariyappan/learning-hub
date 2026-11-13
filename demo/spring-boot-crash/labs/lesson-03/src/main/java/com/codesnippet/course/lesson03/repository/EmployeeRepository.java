package com.codesnippet.course.lesson03.repository;

import com.codesnippet.course.lesson03.entity.Employee;
import org.springframework.stereotype.Repository;
@Repository
public class EmployeeRepository {
    public Employee getEmployee(Integer id) {
        return new Employee(id, "Chetan", "IT", 27);
    }
}
