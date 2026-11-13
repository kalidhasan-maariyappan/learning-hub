package com.codesnippet.course.lesson25.entity;

import jakarta.persistence.*;

@Entity
public class Person {
    @Id @GeneratedValue
    private Long id;
    private String firstName;
    public Person() {}
    public Person(Long id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
}
