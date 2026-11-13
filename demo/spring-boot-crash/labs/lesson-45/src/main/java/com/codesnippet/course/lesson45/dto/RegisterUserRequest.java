package com.codesnippet.course.lesson45.dto;

public class RegisterUserRequest {
    private String username;
    private String password;
    private com.codesnippet.course.lesson45.entity.Role role;
    public RegisterUserRequest() {}
    public RegisterUserRequest(String username, String password, com.codesnippet.course.lesson45.entity.Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public com.codesnippet.course.lesson45.entity.Role getRole() { return role; }
    public void setRole(com.codesnippet.course.lesson45.entity.Role role) { this.role = role; }
}
