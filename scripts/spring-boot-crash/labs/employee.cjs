const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
function employee(n){
 const entity=pojo(n,'entity/Employee.java',{id:'Integer',name:'String',department:'String',age:'Integer'},'@Entity','import jakarta.persistence.Entity;\nimport jakarta.persistence.Id;');entity.text=entity.text.replace('private Integer id;','@Id\n    private Integer id;');
 return [entity,pojo(n,'dto/EmployeeDto.java',{name:'String',department:'String',age:'Integer'}),
 java(n,'repository/EmployeeRepository.java',`import ${p(n)}.entity.Employee;
import org.springframework.stereotype.Repository;
@Repository
public class EmployeeRepository {
    public Employee getEmployee(Integer id) {
        return new Employee(id, "Chetan", "IT", 27);
    }
}`),java(n,'mapper/EmployeeMapper.java',`import ${p(n)}.entity.Employee;
import ${p(n)}.dto.EmployeeDto;
public class EmployeeMapper {
    public static EmployeeDto toDto(Employee employee) {
        return new EmployeeDto(employee.getName(), employee.getDepartment(), employee.getAge());
    }
}`),java(n,'service/EmployeeService.java',`import ${p(n)}.repository.EmployeeRepository;
import ${p(n)}.entity.Employee;
import ${p(n)}.dto.EmployeeDto;
import ${p(n)}.mapper.EmployeeMapper;
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
}`),java(n,'controller/EmployeeController.java',`import ${p(n)}.service.EmployeeService;
import ${p(n)}.dto.EmployeeDto;
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
${n===4?`    @GetMapping("/getEmployeeById")
    public EmployeeDto query(@RequestParam("id") Integer id) {
        return employeeService.getEmployee(id);
    }
    @PostMapping("/addEmployee")
    public EmployeeDto add(@RequestBody EmployeeDto employee) { return employee; }
    @PutMapping("/updateEmployee")
    public EmployeeDto update(@RequestBody EmployeeDto employee) { return employee; }
    @DeleteMapping("/deleteEmployee/{id}")
    public String delete(@PathVariable("id") Integer id) { return "Employee " + id + " is deleted"; }`:''}
}`)];
}
module.exports=[lab(2,'First project',['web','jpa','h2'],[main(2),props('spring.application.name=employee-demo')],[{path:'/',status:404}],{purpose:'Start the generated application before adding a controller.'}),
...[3,4].map(n=>lab(n,'Employee application',['web','jpa','h2'],[main(n),...employee(n),props('spring.application.name=employee-demo')],[{path:'/api/getEmployee/1',status:200,json:{name:'Chetan',department:'IT',age:27},absent:['id']},...(n===4?[{path:'/api/getEmployeeById?id=2',status:200},{path:'/api/addEmployee',method:'POST',body:{name:'Asha',department:'IT',age:25},status:200,json:{name:'Asha'}},{path:'/api/deleteEmployee/1',method:'DELETE',status:200,contains:'deleted'}]:[])],{purpose:'Follow employee data through controller, service, repository, mapper and DTO.',choices:'Package names, the readable IT department value, imports and accessor bodies are reconstruction scaffolding. The repository supplies an employee directly as in the lesson; it does not execute a database query. Lesson 4 adds request-binding methods without claiming persistence.'}))];
