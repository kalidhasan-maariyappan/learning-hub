const pkg='com.codesnippet.course.lesson03';
module.exports=[
{path:'src/main/java/'+pkg.replaceAll('.','/')+'/repository/EmployeeRepository.java',text:`package ${pkg}.repository;

import org.springframework.stereotype.Repository;

@Repository
public class EmployeeRepository {
    public String getEmployee(Integer id) {
        return "Chetan";
    }
}
`,explain:['The repository supplies a simple sample value for now. We are tracing a call, not querying a database.','Put a breakpoint on the return statement and inspect the ID received from the service.']},
{path:'src/main/java/'+pkg.replaceAll('.','/')+'/service/EmployeeService.java',text:`package ${pkg}.service;

import ${pkg}.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository;

    public String getEmployee(Integer id) {
        return repository.getEmployee(id);
    }
}
`,explain:['The service receives the same ID and delegates data access to its repository.','The returned String travels back to the controller. There is no DTO conversion in this first phase.']},
{path:'src/main/java/'+pkg.replaceAll('.','/')+'/controller/EmployeeController.java',text:`package ${pkg}.controller;

import ${pkg}.service.EmployeeService;
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
`,explain:['The path supplies the ID. The controller passes it to the service and waits for the result.','ResponseEntity.ok returns the String as the HTTP response body. This is the same endpoint that will return a DTO in the next phase.']}
];
