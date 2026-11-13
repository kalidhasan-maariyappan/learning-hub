package com.codesnippet.course.lesson45.dto;

public class UserResponse {
    private Long id;
    private String username;
    private com.codesnippet.course.lesson45.entity.Role role;
    public UserResponse() {}
    public UserResponse(Long id, String username, com.codesnippet.course.lesson45.entity.Role role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public com.codesnippet.course.lesson45.entity.Role getRole() { return role; }
    public void setRole(com.codesnippet.course.lesson45.entity.Role role) { this.role = role; }
}
