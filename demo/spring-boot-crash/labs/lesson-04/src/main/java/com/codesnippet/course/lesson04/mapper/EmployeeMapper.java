package com.codesnippet.course.lesson04.mapper;

import com.codesnippet.course.lesson04.entity.Employee;
import com.codesnippet.course.lesson04.dto.EmployeeDto;
public class EmployeeMapper {
    public static EmployeeDto toDto(Employee employee) {
        return new EmployeeDto(employee.getName(), employee.getDepartment(), employee.getAge());
    }
}
