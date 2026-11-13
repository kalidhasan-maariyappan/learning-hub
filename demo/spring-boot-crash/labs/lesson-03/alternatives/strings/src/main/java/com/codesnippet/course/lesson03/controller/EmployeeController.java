package com.codesnippet.course.lesson03.controller;

import com.codesnippet.course.lesson03.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<String> getEmployee(@PathVariable("id") Integer id) {
        String employee=service.getEmployee(id);
        return ResponseEntity.ok(employee);
    }
}
