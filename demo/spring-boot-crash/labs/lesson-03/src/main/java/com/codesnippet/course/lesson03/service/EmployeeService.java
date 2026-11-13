package com.codesnippet.course.lesson03.service;

import com.codesnippet.course.lesson03.repository.EmployeeRepository;
import com.codesnippet.course.lesson03.entity.Employee;
import com.codesnippet.course.lesson03.dto.EmployeeDto;
import com.codesnippet.course.lesson03.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    public EmployeeDto getEmployee(Integer id) {
        Employee employee = employeeRepository.getEmployee(id);
        return EmployeeMapper.toDto(employee);
    }
}
