package com.codesnippet.course.lesson04.repository;

import com.codesnippet.course.lesson04.entity.Employee;
import org.springframework.stereotype.Repository;
@Repository
public class EmployeeRepository {
    public Employee getEmployee(Integer id) {
        return new Employee(id, "Chetan", "IT", 27);
    }
}
