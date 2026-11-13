package com.codesnippet.course.lesson03.controller;

import com.codesnippet.course.lesson03.service.EmployeeService;
import com.codesnippet.course.lesson03.dto.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable("id") Integer id) {
        EmployeeDto employee = employeeService.getEmployee(id);
        return ResponseEntity.ok(employee);
    }

}
