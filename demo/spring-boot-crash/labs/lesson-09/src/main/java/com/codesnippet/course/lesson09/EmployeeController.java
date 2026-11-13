package com.codesnippet.course.lesson09;

import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
@RestController
public class EmployeeController {
    private final User user; private final Employee employee; private final SessionState session;
    public EmployeeController(User user, Employee employee, SessionState session) { this.user=user; this.employee=employee; this.session=session; }
    @GetMapping("/scope") public Map<String,Integer> scope() { return Map.of("controllerUser",user.identity(),"employeeUser",employee.userIdentity(),"session",session.identity()); }
    @PostMapping("/logout") public String logout(HttpServletRequest request) { request.getSession().invalidate(); return "Session ended"; }
}
