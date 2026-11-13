const {lab,java,main,props,packageName:p}=require('./common.cjs');
const component=(n,name,body='',imports='')=>java(n,name+'.java',`import org.springframework.stereotype.Component;\n${imports}\n@Component\npublic class ${name} {\n${body}\n}`);
const runner=(n,body)=>component(n,'ExampleRunner',`    public void run(String... args) {\n${body}\n    }`,'import org.springframework.boot.CommandLineRunner;').text.replace('class ExampleRunner {','class ExampleRunner implements CommandLineRunner {');
const asRunner=(n,body)=>({...java(n,'ExampleRunner.java',''),text:runner(n,body)});
const out=[];
{
const n=5;out.push(lab(n,'Managed beans and payment configuration',['web','actuator'],[main(n),component(n,'ProductService'),java(n,'PaymentService.java','public interface PaymentService { String processPayment(); }'),...['CreditCard','GooglePay'].map(name=>java(n,name+'Service.java',`public class ${name}Service implements PaymentService { public String processPayment() { return "${name} payment"; } }`)),java(n,'PaymentConfig.java',`import org.springframework.context.annotation.*;
@Configuration
public class PaymentConfig {
    @Bean public PaymentService creditCardPaymentService() { return new CreditCardService(); }
    @Bean public PaymentService googlePayPaymentService() { return new GooglePayService(); }
}`),java(n,'ExampleRunner.java',`import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
@Component
public class ExampleRunner implements CommandLineRunner {
    private final ApplicationContext context;
    public ExampleRunner(ApplicationContext context) { this.context = context; }
    public void run(String... args) {
        System.out.println("Product bean: " + context.getBean("productService").getClass().getSimpleName());
        System.out.println(((PaymentService) context.getBean("creditCardPaymentService")).processPayment());
        System.out.println(((PaymentService) context.getBean("googlePayPaymentService")).processPayment());
    }
}`),props('management.endpoints.web.exposure.include=beans,health')],[{path:'/actuator/beans',status:200,contains:'creditCardPaymentService'}],{logs:['Product bean: ProductService','CreditCard payment','GooglePay payment']}));}
{
const n=6;out.push(lab(n,'User and Order injection',['web'],[main(n),java(n,'Order.java','public interface Order { String place(); }'),java(n,'OnlineOrder.java',`import org.springframework.stereotype.Component;
@Component
public class OnlineOrder implements Order { public String place() { return "Online order placed"; } }`),...['Field','Setter','Constructor'].map(type=>java(n,type+'User.java',`import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
@Component
public class ${type}User {
${type==='Field'?'    @Autowired\n    private Order order;':type==='Setter'?'    private Order order;\n    @Autowired\n    public void setOrder(Order order) { this.order = order; }':'    private final Order order;\n    public ConstructorUser(Order order) { this.order = order; }'}
    public String placeOrder() { return order.place(); }
}`)),java(n,'UserController.java',`import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class UserController {
    private final FieldUser field; private final SetterUser setter; private final ConstructorUser constructor;
    public UserController(FieldUser field, SetterUser setter, ConstructorUser constructor) {
        this.field=field; this.setter=setter; this.constructor=constructor;
    }
    @GetMapping("/orders")
    public Map<String,String> orders() {
        return Map.of("field",field.placeOrder(),"setter",setter.placeOrder(),"constructor",constructor.placeOrder());
    }
}`)],[{path:'/orders',status:200,json:{field:'Online order placed',setter:'Online order placed',constructor:'Online order placed'}}],{choices:'Three named User classes let you compare the injection alternatives in one running example. They use the source User/Order domain. The comparison endpoint is a minimal trigger, not an additional business feature.'}));}
{
const n=7;const app=main(n).text.replace('@SpringBootApplication','@SpringBootApplication\n@org.springframework.context.annotation.ComponentScan(basePackages={"'+p(n)+'", "com.codesnippet.course.assistant07"}, excludeFilters=@org.springframework.context.annotation.ComponentScan.Filter(type=org.springframework.context.annotation.FilterType.ASSIGNABLE_TYPE, classes=DeprecatedUtilityService.class))');out.push(lab(n,'Component scan packages',['web','actuator'],[{...main(n),text:app},component(n,'ProductService'),component(n,'DeprecatedUtilityService'),{path:'src/main/java/com/codesnippet/course/assistant07/EcomUtilityService.java',text:'package com.codesnippet.course.assistant07;\nimport org.springframework.stereotype.Service;\n@Service\npublic class EcomUtilityService {}\n'},props('management.endpoints.web.exposure.include=beans')],[{path:'/actuator/beans',status:200,contains:'ecomUtilityService'}]));}
{
const n=8;const app=main(n).text.replace('SpringApplication.run(Application.class, args);','var context = SpringApplication.run(Application.class, args);\n        context.close();');out.push(lab(n,'Product bean lifecycle',['web'],[{...main(n),text:app},component(n,'ProductRepository'),java(n,'ProductService.java',`import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
@Service
public class ProductService {
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) {
        this.repository=repository; System.out.println("ProductService constructed");
    }
    @PostConstruct public void initialize() { System.out.println("ProductService initialized"); }
    @PreDestroy public void cleanup() { System.out.println("ProductService cleanup"); }
}`),props('spring.main.web-application-type=none')],[],{consoleOnly:true,logs:['ProductService constructed','ProductService initialized','ProductService cleanup']}));}
{
const n=9;out.push(lab(n,'Scope and request identity',['web'],[main(n),java(n,'User.java',`import org.springframework.stereotype.Component;
import org.springframework.context.annotation.*;
@Component
@Scope(value="request", proxyMode=ScopedProxyMode.TARGET_CLASS)
public class User { public int identity() { return System.identityHashCode(this); } }`),java(n,'Employee.java',`import org.springframework.stereotype.Component;
@Component
public class Employee {
    private final User user;
    public Employee(User user) { this.user=user; }
    public int userIdentity() { return user.identity(); }
}`),java(n,'SessionState.java',`import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
@Component
@SessionScope
public class SessionState { public int identity() { return System.identityHashCode(this); } }`),java(n,'EmployeeController.java',`import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
@RestController
public class EmployeeController {
    private final User user; private final Employee employee; private final SessionState session;
    public EmployeeController(User user, Employee employee, SessionState session) { this.user=user; this.employee=employee; this.session=session; }
    @GetMapping("/scope") public Map<String,Integer> scope() { return Map.of("controllerUser",user.identity(),"employeeUser",employee.userIdentity(),"session",session.identity()); }
    @PostMapping("/logout") public String logout(HttpServletRequest request) { request.getSession().invalidate(); return "Session ended"; }
}`)],[{path:'/scope',status:200},{path:'/scope',status:200},{path:'/logout',method:'POST',status:200},{path:'/scope',status:200}],{choices:'Identity values are generated at runtime, so compare equality rather than memorizing a number. This final runnable state uses a request-scoped User with the demonstrated scoped proxy and a session-scoped supporting object. Earlier singleton/prototype variations are edits explained in the lesson.'}));}
{
const n=10;out.push(lab(n,'Payment selection',['web'],[main(n),java(n,'PaymentService.java','public interface PaymentService { String processPayment(double amount); }'),...['GooglePay','CreditCard','DefaultPayment'].map(name=>java(n,name+'Service.java',`import org.springframework.stereotype.Service;
${name==='DefaultPayment'?'import org.springframework.context.annotation.Primary;\n@Primary':''}
@Service
public class ${name}Service implements PaymentService { public String processPayment(double amount) { return "${name}: " + amount; } }`)),java(n,'CheckoutService.java',`import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Qualifier;
@Service
public class CheckoutService {
    private final PaymentService payments;
    public CheckoutService(@Qualifier("googlePayService") PaymentService payments) { this.payments=payments; }
    public String checkout(double amount) { return payments.processPayment(amount); }
}`),java(n,'CheckoutController.java',`import org.springframework.web.bind.annotation.*;
@RestController
public class CheckoutController {
    private final CheckoutService checkout;
    public CheckoutController(CheckoutService checkout) { this.checkout=checkout; }
    @GetMapping("/pay") public String pay(@RequestParam("amount") double amount) { return checkout.checkout(amount); }
}`)],[{path:'/pay?amount=10',status:200,contains:'GooglePay: 10.0'}],{choices:'Payment methods return messages; they do not charge a real payment provider. Removing the qualifier demonstrates the primary default; the checked state retains the explicit Google Pay choice.'}));}
for(const n of [11,12]){
 const condition=type=>n===11?`@org.springframework.boot.autoconfigure.condition.ConditionalOnProperty(prefix="${type==='MySQL'?'sqlconnection':'nosqlconnection'}", name="enabled", havingValue="true")`:`@org.springframework.context.annotation.Profile("${type==='MySQL'?'dev':'prod'}")`;
 const files=[main(n),...['MySQL','NoSQL'].map(type=>java(n,type+'Connection.java',`import org.springframework.stereotype.Component;
@Component
${condition(type)}
public class ${type}Connection { public String name() { return "${type}"; } }`)),java(n,'DBConnection.java',`import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DBConnection {
    @Autowired(required=false) private MySQLConnection mysql;
    @Autowired(required=false) private NoSQLConnection nosql;
${n===12?'    @Value("${db.username}") private String username;\n    @Value("${db.password}") private String password;\n    @jakarta.annotation.PostConstruct public void ready() { System.out.println("Profile username: " + username); }':''}
    @GetMapping("/connections") public Map<String,String> connections() {
        return Map.of("sql",mysql==null?"absent":mysql.name(),"nosql",nosql==null?"absent":nosql.name()${n===12?',"username",username':''});
    }
}`),props(n===11?'sqlconnection.enabled=true\nnosqlconnection.enabled=false':'spring.profiles.active=dev\ndb.username=common-demo\ndb.password=local-demo-only')];
 if(n===12)for(const profile of ['dev','qa','prod'])files.push({path:'src/main/resources/application-'+profile+'.properties',text:'db.username='+profile+'-demo\ndb.password='+profile+'-local-only\n'});
 const example=lab(n,n===11?'Conditional connection components':'Profile-specific connections',['web'],files,[{path:'/connections',status:200,json:{sql:'MySQL',nosql:'absent',...(n===12?{username:'dev-demo'}:{})}}],{choices:'Connection classes expose their names to demonstrate which beans exist. They do not open MySQL or NoSQL network connections. The username values are synthetic non-secret labels used to distinguish profiles.'});
 if(n===12)example.files[0].text=example.files[0].text.replace('</project>','<profiles><profile><id>production</id><properties><spring-boot.run.profiles>prod</spring-boot.run.profiles></properties></profile></profiles>\n</project>');
 out.push(example);
}
module.exports=out;
