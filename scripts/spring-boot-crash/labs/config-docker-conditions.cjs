const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
const out=[];
{
const n=51;out.push(lab(n,'Config client',['web','actuator','org.springframework.cloud:spring-cloud-starter-config:4.3.0'],[main(n),java(n,'ConfigController.java',`import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;
@RefreshScope
@RestController
public class ConfigController {
    @Value("${'${'}app.name:Local fallback}") private String appName;
    @GetMapping("/config") public String config() { return appName; }
}`),props('spring.application.name=application\nspring.profiles.active=dev\nspring.config.import=optional:configserver:http://localhost:8888\nmanagement.endpoints.web.exposure.include=refresh'),{path:'configuration-repository/application.properties',text:'app.name=Default application\n'},{path:'configuration-repository/application-dev.properties',text:'app.name=Development application\n'}],[],{external:'Start the companion config-server project on port 8888 with CONFIG_GIT_URI pointing to your Git configuration repository. The two configuration-repository files are supplied as seed files: initialize and commit them in your own local Git repository, then use its absolute file URI or a Git remote. Start this client, request /config, change and commit app.name, POST /actuator/refresh, then request /config again.'}));
const server=lab(151,'Config server companion',['web','org.springframework.cloud:spring-cloud-config-server:4.3.0'],[main(151,'@org.springframework.cloud.config.server.EnableConfigServer'),props('server.port=8888\nspring.cloud.config.server.git.uri=${CONFIG_GIT_URI}')],[],{external:'Companion server for Lesson 51. Requires a Git repository URI in CONFIG_GIT_URI. It is a project component, not an additional course lesson.'});server.directory='config-server';server.files[0].text=server.files[0].text.replace('<artifactId>lesson-151</artifactId>','<artifactId>config-server</artifactId>');out.push(server);
}
{
const n=60;const user=pojo(n,'entity/StoredUser.java',{id:'Long',name:'String'},'@Entity','import jakarta.persistence.*;');user.text=user.text.replace('private Long id;','@Id @GeneratedValue(strategy=GenerationType.IDENTITY)\n    private Long id;');
out.push(lab(n,'Docker names and MySQL users',['web','jpa','mysql'],[main(n),user,java(n,'repository/UserRepository.java',`import ${p(n)}.entity.StoredUser;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<StoredUser,Long> {}`),java(n,'controller/UserController.java',`import ${p(n)}.entity.StoredUser;
import ${p(n)}.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class UserController {
    private final UserRepository repository;
    public UserController(UserRepository repository) { this.repository=repository; }
    @PostMapping("/users") public StoredUser add(@RequestBody StoredUser user) { return repository.save(user); }
    @GetMapping("/users") public List<StoredUser> all() { return repository.findAll(); }
}`),java(n,'controller/NameController.java',`import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.nio.file.*;
import java.util.*;
import java.io.IOException;
@RestController
public class NameController {
    private final Path file;
    public NameController(@Value("${'${'}names.file:names.txt}") String file) { this.file=Path.of(file); }
    @GetMapping("/names") public synchronized List<String> all() throws IOException { return Files.exists(file)?Files.readAllLines(file):List.of(); }
    @PostMapping("/names") public synchronized List<String> add(@RequestBody String name) throws IOException {
        if(file.getParent()!=null)Files.createDirectories(file.getParent());
        Files.writeString(file,name+System.lineSeparator(),StandardOpenOption.CREATE,StandardOpenOption.APPEND);return all();
    }
    @DeleteMapping("/names/{name}") public synchronized List<String> delete(@PathVariable("name") String name) throws IOException {
        List<String> names=new ArrayList<>(all());names.removeIf(name::equals);Files.write(file,names);return names;
    }
}`),props('spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:3306/course\nspring.datasource.username=root\nspring.datasource.password=${DB_PASSWORD:local-demo}\nspring.jpa.hibernate.ddl-auto=update\nnames.file=${NAMES_FILE:names.txt}'),{path:'Dockerfile',text:'FROM eclipse-temurin:25-jre\nWORKDIR /app\nCOPY target/lesson-60-1.0.0.jar app.jar\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]\n'},{path:'compose.yaml',text:'services:\n  mysql:\n    image: mysql:8\n    environment:\n      MYSQL_ROOT_PASSWORD: local-demo\n      MYSQL_DATABASE: course\n    ports:\n      - "3306:3306"\n    volumes:\n      - mysql-data:/var/lib/mysql\n    healthcheck:\n      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-plocal-demo"]\n      interval: 5s\n      timeout: 5s\n      retries: 20\n  app:\n    build: .\n    ports:\n      - "8080:8080"\n    environment:\n      DB_HOST: mysql\n      DB_PASSWORD: local-demo\n      NAMES_FILE: /data/names.txt\n    volumes:\n      - names-data:/data\n    depends_on:\n      mysql:\n        condition: service_healthy\nvolumes:\n  mysql-data:\n  names-data:\n'},{path:'.dockerignore',text:'.git\n*.log\nnames.txt\n'}],[],{external:'Docker Engine and the MySQL image are required. Build the JAR with Maven, then run docker compose up --build from this folder. The Java 25 base image and MySQL image must be pulled successfully. The supplied local password is a demo fixture. This stack has not been executed merely by compiling the JAR.',choices:'The source mounts /app and later encounters an old JAR masking a rebuild. This completed reconstruction puts writable names data under /data so the mount cannot conceal /app/app.jar. MySQL uses its own volume. The healthcheck orders startup; neither change adds a new application feature.'}));}
{
const n=62;const files=[main(n),java(n,'payment/PaymentService.java','public interface PaymentService { String pay(); }'),...['PayPal','Stripe'].map(type=>java(n,'payment/'+type+'PaymentService.java',`import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
@Service
@ConditionalOnProperty(name="payment.provider",havingValue="${type.toLowerCase()}"${type==='PayPal'?',matchIfMissing=true':''})
public class ${type}PaymentService implements PaymentService { public String pay() { return "${type} payment processed"; } }`)),java(n,'notification/NotificationService.java','public interface NotificationService { String send(); }'),java(n,'notification/SnsNotificationService.java',`import org.springframework.stereotype.Service;
@Service
public class SnsNotificationService implements NotificationService { public String send() { return "SNS demonstration notification"; } }`),java(n,'notification/DefaultNotificationService.java','public class DefaultNotificationService implements NotificationService { public String send() { return "Default demonstration notification"; } }'),java(n,'notification/NotificationLogger.java','public class NotificationLogger { public String state() { return "Notification logger enabled"; } }'),java(n,'config/NotificationConfig.java',`import ${p(n)}.notification.*;
import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.*;
@Configuration
public class NotificationConfig {
    @Bean @ConditionalOnMissingBean(NotificationService.class)
    public NotificationService fallback() { return new DefaultNotificationService(); }
    @Bean @ConditionalOnBean(NotificationService.class)
    public NotificationLogger notificationLogger() { return new NotificationLogger(); }
}`),java(n,'config/RedisCacheConfig.java',`import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
@Configuration
@ConditionalOnClass(name="org.springframework.data.redis.core.RedisTemplate")
public class RedisCacheConfig { @Bean public String redisClasspathMessage() { return "Redis class is available"; } }`),java(n,'condition/OnWeekendCondition.java',`import org.springframework.context.annotation.*;
import org.springframework.core.type.AnnotatedTypeMetadata;
import java.time.*;
public class OnWeekendCondition implements Condition {
    public boolean matches(ConditionContext context,AnnotatedTypeMetadata metadata) {
        DayOfWeek day=LocalDate.now().getDayOfWeek();return day==DayOfWeek.SATURDAY||day==DayOfWeek.SUNDAY;
    }
}`),java(n,'service/WeekendService.java','public class WeekendService { public WeekendService() { System.out.println("Weekend service initialized"); } }'),java(n,'config/WeekendConfig.java',`import ${p(n)}.condition.OnWeekendCondition;
import ${p(n)}.service.WeekendService;
import org.springframework.context.annotation.*;
@Configuration
public class WeekendConfig { @Bean @Conditional(OnWeekendCondition.class) public WeekendService weekendService() { return new WeekendService(); } }`),java(n,'DemoController.java',`import ${p(n)}.payment.PaymentService;
import ${p(n)}.notification.NotificationService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DemoController {
    private final ObjectProvider<PaymentService> payments; private final NotificationService notifications;
    public DemoController(ObjectProvider<PaymentService> payments,NotificationService notifications) { this.payments=payments;this.notifications=notifications; }
    @GetMapping("/conditions") public Map<String,String> conditions() { PaymentService payment=payments.getIfAvailable();return Map.of("payment",payment==null?"absent":payment.pay(),"notification",notifications.send()); }
}`),java(n,'notification/EmailService.java',`import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
@Service
@ConditionalOnProperty(name="feature.email.enabled",havingValue="true")
public class EmailService { public EmailService() { System.out.println("Email service initialized"); } }`),java(n,'config/ExpressionNotificationConfig.java',`import ${p(n)}.notification.NotificationLogger;
import org.springframework.context.annotation.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
@Configuration
@ConditionalOnExpression("${'${'}feature.expression-logger.enabled:false}")
public class ExpressionNotificationConfig {
    // Enable this as an alternative to the bean-presence logger configuration.
    @Bean public NotificationLogger expressionNotificationLogger() { return new NotificationLogger(); }
}`),props('payment.provider=paypal\nfeature.email.enabled=true\nfeature.expression-logger.enabled=false')];
out.push(lab(n,'Conditional payment and notification beans',['web'],files,[{path:'/conditions',status:200,json:{payment:'PayPal payment processed',notification:'SNS demonstration notification'}}],{logs:['Email service initialized'],choices:'SNS is a printed/string demonstration, not an AWS client. RedisTemplate is checked by class name without requiring Redis; add/remove the Redis starter to exercise that classpath condition. The expression logger is an alternative disabled by default. The weekend condition evaluates the machine date, so no fixed weekend result is claimed.'}));}
{
const n=63;const files=[main(n),java(n,'OrderService.java',`import org.springframework.stereotype.Service;
@Service
public class OrderService { public String orders() { return "Orders returned"; } }`),java(n,'OrderController.java',`import org.springframework.web.bind.annotation.*;
@RestController
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) { this.service=service; }
    @GetMapping("/orders") public String orders() { return service.orders(); }
}`),java(n,'LoggingAspect.java',`import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Aspect @Component
public class LoggingAspect {
    @Before("execution(* ${p(n)}.OrderService.orders(..))")
    public void log() { System.out.println("Before orders service"); }
}`)];const example=lab(n,'Boot 4 aspect dependency',['web','aop'],files,[{path:'/orders',status:200,contains:'Orders returned'}],{bootVersion:'4.1.1',logs:['Before orders service'],choices:'The source names Boot 4.1.1 and its AspectJ starter but omits the full pointcut and application. This minimal orders-service aspect is explicitly a supporting reconstruction so the dependency can be tested, not a recovered exact pointcut.'});example.files[0].text=example.files[0].text.replace('3.5.16','4.1.1').replace('spring-boot-starter-aop','spring-boot-starter-aspectj');out.push(example);
}
out.find(l=>l.number===60).cases=[{path:'/names',method:'POST',rawBody:'Chetan',headers:{'Content-Type':'text/plain'},status:200,contains:'Chetan'},{path:'/names',status:200,contains:'Chetan'},{path:'/users',method:'POST',body:{name:'Chetan'},status:200,json:{name:'Chetan'}},{path:'/users',status:200,contains:'Chetan'}];
module.exports=out;
