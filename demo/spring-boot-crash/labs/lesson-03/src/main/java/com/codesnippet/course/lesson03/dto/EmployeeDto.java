package com.codesnippet.course.lesson03.dto;

public class EmployeeDto {
    private String name;
    private String department;
    private Integer age;
    public EmployeeDto() {}
    public EmployeeDto(String name, String department, Integer age) {
        this.name = name;
        this.department = department;
        this.age = age;
    }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}
