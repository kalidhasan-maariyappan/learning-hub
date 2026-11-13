package com.codesnippet.course.lesson04.controller;

import com.codesnippet.course.lesson04.service.EmployeeService;
import com.codesnippet.course.lesson04.dto.EmployeeDto;
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
    @GetMapping("/getEmployeeById")
    public EmployeeDto query(@RequestParam("id") Integer id) {
        return employeeService.getEmployee(id);
    }
    @PostMapping("/addEmployee")
    public EmployeeDto add(@RequestBody EmployeeDto employee) { return employee; }
    @PutMapping("/updateEmployee")
    public EmployeeDto update(@RequestBody EmployeeDto employee) { return employee; }
    @DeleteMapping("/deleteEmployee/{id}")
    public String delete(@PathVariable("id") Integer id) { return "Employee " + id + " is deleted"; }
}
