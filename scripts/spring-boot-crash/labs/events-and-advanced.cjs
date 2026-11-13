const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
const out=[];
for(const n of [48,50]){
 const event=pojo(n,'event/OrderCreatedEvent.java',{orderId:'String',...(n===50?{amount:'double'}:{})});
 const files=[main(n,n===50?'@org.springframework.scheduling.annotation.EnableAsync':''),event,java(n,'service/OrderService.java',`import ${p(n)}.event.OrderCreatedEvent;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationEventPublisher;
@Service
public class OrderService {
    private final ApplicationEventPublisher publisher;
    public OrderService(ApplicationEventPublisher publisher) { this.publisher=publisher; }
    public void createOrder(String orderId${n===50?',double amount':''}) {
        System.out.println("Order created: " + orderId);
        publisher.publishEvent(new OrderCreatedEvent(orderId${n===50?',amount':''}));
    }
}`),java(n,'controller/OrderController.java',`import ${p(n)}.service.OrderService;
import org.springframework.web.bind.annotation.*;
@RestController
public class OrderController {
    private final OrderService orders;
    public OrderController(OrderService orders) { this.orders=orders; }
    @PostMapping("/order/{id}") public String create(@PathVariable("id") String id${n===50?',@RequestParam("amount") double amount':''}) {
        orders.createOrder(id${n===50?',amount':''});return "Order created";
    }
}`),...['Email','Logging'].map((type,i)=>java(n,'listener/'+type+'Listener.java',`import ${p(n)}.event.OrderCreatedEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
@Component
public class ${type}Listener {
    @EventListener
${n===50?'    @Async\n    @Order('+(type==='Logging'?1:2)+')':''}
    public void handle(OrderCreatedEvent event) ${n===50?'throws InterruptedException ':''}{
        ${n===50?'Thread.sleep('+(type==='Email'?3000:1000)+');':''}
        System.out.println("${type} listener: " + event.getOrderId());
    }
}`))];
 if(n===50)files.push(java(n,'listener/HighValueOrderListener.java',`import ${p(n)}.event.OrderCreatedEvent;
import org.springframework.stereotype.Component;
import org.springframework.context.event.EventListener;
@Component
public class HighValueOrderListener {
    @EventListener(condition="#event.amount > 1000")
    public void handle(OrderCreatedEvent event) { System.out.println("High-value order: " + event.getOrderId()); }
}`),java(n,'config/EventConfig.java',`import org.springframework.context.annotation.*;
import org.springframework.context.event.*;
@Configuration
public class EventConfig {
    @Bean public ApplicationEventMulticaster applicationEventMulticaster() {
        SimpleApplicationEventMulticaster multicaster=new SimpleApplicationEventMulticaster();
        multicaster.setErrorHandler(error->System.out.println("Listener dispatch error: " + error.getMessage()));
        return multicaster;
    }
}`));
 out.push(lab(n,'Order events',['web'],files,[{path:'/order/1'+(n===50?'?amount=1100':''),method:'POST',status:200,...(n===50?{maxDurationMs:2000}:{})},{path:'/order/2'+(n===50?'?amount=10':''),method:'POST',status:200,delay:n===50?3500:0}],{logs:['Order created: 1',...(n===48?['Email listener: 1','Logging listener: 1']:['High-value order: 1','Email listener: 1','Logging listener: 1'])],...(n===50?{absentLogs:['High-value order: 2']}:{}),choices:'Listener messages stand in for sending real email, as in the source. The advanced state enables asynchronous methods and a high-value condition. The multicaster error handler covers its dispatch path; it is not claimed to catch all failures inside async methods.'}));
}
{
const n=52;out.push(lab(n,'Retry and recovery',['web','retry','aspects'],[main(n,'@org.springframework.retry.annotation.EnableRetry'),java(n,'ExternalApiService.java',`import org.springframework.stereotype.Service;
import org.springframework.retry.annotation.*;
@Service
public class ExternalApiService {
    @Retryable(retryFor=RuntimeException.class,maxAttempts=4,backoff=@Backoff(delay=2000,multiplier=2))
    public String callExternalApi() {
        System.out.println("Attempting external API");
        throw new RuntimeException("API is down");
    }
    @Recover public String recover(RuntimeException error) { return "Recovered after all attempts failed"; }
}`),java(n,'RetryController.java',`import org.springframework.web.bind.annotation.*;
@RestController
public class RetryController {
    private final ExternalApiService service;
    public RetryController(ExternalApiService service) { this.service=service; }
    @GetMapping("/retry/test") public String test() { return service.callExternalApi(); }
}`)],[{path:'/retry/test',status:200,contains:'Recovered after all attempts failed'}],{logs:['Attempting external API'],logsCount:{'Attempting external API':4},choices:'The method deliberately throws instead of making a network call. Four attempts include the initial call; the 2/4/8-second waits are actual synchronous waits in this local example.'}));}
{
const n=54;const files=[main(n),...['PrototypeBean','ScopedPrototypeBean'].map(name=>java(n,name+'.java',`import org.springframework.stereotype.Component;
import org.springframework.context.annotation.*;
@Component
@Scope(value="prototype"${name==='ScopedPrototypeBean'?',proxyMode=ScopedProxyMode.TARGET_CLASS':''})
public class ${name} { public int identity() { return System.identityHashCode(this); } }`)),java(n,'ProviderService.java',`import org.springframework.stereotype.Service;
import org.springframework.beans.factory.ObjectProvider;
@Service
public class ProviderService {
    private final ObjectProvider<PrototypeBean> provider;
    public ProviderService(ObjectProvider<PrototypeBean> provider) { this.provider=provider; }
    public int serve() { return provider.getObject().identity(); }
}`),java(n,'ScopedService.java',`import org.springframework.stereotype.Service;
@Service
public class ScopedService {
    private final ScopedPrototypeBean prototype;
    public ScopedService(ScopedPrototypeBean prototype) { this.prototype=prototype; }
    public int serve() { return prototype.identity(); }
}`),java(n,'LookupService.java',`import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Lookup;
@Service
public class LookupService {
    public int serve() { return getPrototype().identity(); }
    @Lookup protected PrototypeBean getPrototype() { return null; }
}`),java(n,'DemoController.java',`import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DemoController {
    private final ProviderService provider; private final ScopedService scoped; private final LookupService lookup;
    public DemoController(ProviderService provider,ScopedService scoped,LookupService lookup) { this.provider=provider;this.scoped=scoped;this.lookup=lookup; }
    @GetMapping("/instances") public Map<String,Object> instances() { return Map.of("provider",new int[]{provider.serve(),provider.serve()},"scoped",new int[]{scoped.serve(),scoped.serve()},"lookup",new int[]{lookup.serve(),lookup.serve()}); }
}`)];out.push(lab(n,'Deferred prototype lookup',['web'],files,[{path:'/instances',status:200,contains:'provider'}],{choices:'Two prototype classes let the ordinary-prototype and scoped-proxy alternatives coexist without one annotation change altering the other comparison. Compare the returned pairs of target identity values; the numbers are not fixed output.'}));}
{
const n=55;out.push(lab(n,'Notification configuration binding',['web','validation'],[main(n,'@org.springframework.boot.context.properties.ConfigurationPropertiesScan'),java(n,'config/NotificationProperties.java',`import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.*;
@Validated
@ConfigurationProperties(prefix="notification")
public class NotificationProperties {
    @Min(1) private int timeoutSeconds;
    @Min(1) private int connectionPoolSize;
    public int getConnectionPoolSize() { return connectionPoolSize; }
    public void setConnectionPoolSize(int value) { connectionPoolSize=value; }
    @Valid private Email email=new Email();
    private Sms sms=new Sms(); private Retry retry=new Retry();
    private Map<String,String> templates=new LinkedHashMap<>();
    public int getTimeoutSeconds() { return timeoutSeconds; }
    public void setTimeoutSeconds(int value) { timeoutSeconds=value; }
    public Email getEmail() { return email; } public void setEmail(Email value) { email=value; }
    public Sms getSms() { return sms; } public void setSms(Sms value) { sms=value; }
    public Retry getRetry() { return retry; } public void setRetry(Retry value) { retry=value; }
    public Map<String,String> getTemplates() { return templates; } public void setTemplates(Map<String,String> value) { templates=value; }
    public static class Email {
        private boolean enabled; @NotBlank private String fromAddress; private String supportAddress; private int dailyLimit;
        private List<String> defaultRecipients=new ArrayList<>();
        public boolean isEnabled() { return enabled; } public void setEnabled(boolean value) { enabled=value; }
        public String getFromAddress() { return fromAddress; } public void setFromAddress(String value) { fromAddress=value; }
        public String getSupportAddress() { return supportAddress; } public void setSupportAddress(String value) { supportAddress=value; }
        public int getDailyLimit() { return dailyLimit; } public void setDailyLimit(int value) { dailyLimit=value; }
        public List<String> getDefaultRecipients() { return defaultRecipients; } public void setDefaultRecipients(List<String> value) { defaultRecipients=value; }
    }
    public static class Sms {
        private boolean enabled; private String senderId; private int dailyLimit;
        public boolean isEnabled() { return enabled; } public void setEnabled(boolean value) { enabled=value; }
        public String getSenderId() { return senderId; } public void setSenderId(String value) { senderId=value; }
        public int getDailyLimit() { return dailyLimit; } public void setDailyLimit(int value) { dailyLimit=value; }
    }
    public static class Retry {
        private int maxAttempts; private long backoffMillis;
        public int getMaxAttempts() { return maxAttempts; } public void setMaxAttempts(int value) { maxAttempts=value; }
        public long getBackoffMillis() { return backoffMillis; } public void setBackoffMillis(long value) { backoffMillis=value; }
    }
}`),(()=>{const f=pojo(n,'config/EmailNotificationProperties.java',{enabled:'boolean',fromAddress:'String',supportAddress:'String',dailyLimit:'int'},'@ConfigurationProperties(prefix="notification.email")','import org.springframework.boot.context.properties.ConfigurationProperties;');f.text=f.text.replace('boolean getEnabled()','boolean isEnabled()');return f;})(),java(n,'NotificationService.java',`import ${p(n)}.config.NotificationProperties;
import org.springframework.stereotype.Service;
@Service
public class NotificationService {
    private final NotificationProperties properties;
    public NotificationService(NotificationProperties properties) { this.properties=properties; }
    public NotificationProperties sendTestNotification() {
        System.out.println("Notification sender: " + properties.getEmail().getFromAddress());
        System.out.println("SMS enabled: " + properties.getSms().isEnabled());
        System.out.println("Retry attempts: " + properties.getRetry().getMaxAttempts());
        return properties;
    }
}`),java(n,'NotificationController.java',`import ${p(n)}.config.NotificationProperties;
import org.springframework.web.bind.annotation.*;
@RestController
public class NotificationController {
    private final NotificationService service;
    public NotificationController(NotificationService service) { this.service=service; }
    @GetMapping("/config") public NotificationProperties config() { return service.sendTestNotification(); }
}`),props('notification.connection-pool-size=2\nnotification.timeout-seconds=5\nnotification.email.enabled=true\nnotification.email.from-address=demo@example.test\nnotification.email.support-address=support@example.test\nnotification.email.daily-limit=10\nnotification.email.default-recipients[0]=learner@example.test\nnotification.sms.enabled=false\nnotification.sms.sender-id=DEMO\nnotification.sms.daily-limit=5\nnotification.retry.max-attempts=4\nnotification.retry.backoff-millis=2000\nnotification.templates.welcome=Welcome')],[{path:'/config',status:200,json:{timeoutSeconds:5,connectionPoolSize:2},contains:'learner@example.test'}],{choices:'All addresses and template values are synthetic binding fixtures. They exercise the same nested objects/list/map and constraints without claiming to recover the omitted original YAML values.'}));}
for(const n of [56,58]){
 const files=[main(n),n===58?java(n,'model/UserDto.java','public record UserDto(Long id,String name,String email) {}'):java(n,'model/UserDto.java',`import lombok.*;
@Data @NoArgsConstructor @AllArgsConstructor
public class UserDto { private Long id; private String name; private String email; }`),java(n,'model/Product.java',`import lombok.*;
@Getter @Builder
public class Product { private String name; private double price; }`),java(n,'model/ImmutableConfig.java',`import lombok.Value;
@Value
public class ImmutableConfig { String name; int limit; }`),java(n,'repository/UserRepository.java',`import ${p(n)}.model.UserDto;
import org.springframework.stereotype.Repository;
@Repository
public class UserRepository { public UserDto findById(Long id) { return new UserDto(id,"John","john@example.test"); } }`),java(n,'service/UserService.java',`import ${p(n)}.model.*;
import ${p(n)}.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service @AllArgsConstructor @Slf4j
public class UserService {
    private final UserRepository repository;
    public UserDto getUser(Long id) {
        UserDto user=repository.findById(id);
        log.info("User id: {}",user.${n===58?'id':'getId'}());
        Product product=Product.builder().name("Product A").price(1).build();
        log.info("Product: {}",product.getName());
        return user;
    }
}`),java(n,'controller/UserController.java',`import ${p(n)}.model.UserDto;
import ${p(n)}.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
@RestController @AllArgsConstructor
public class UserController {
    private final UserService service;
    @GetMapping("/users/{id}") public UserDto get(@PathVariable("id") Long id) { return service.getUser(id); }
}`)];out.push(lab(n,n===56?'Lombok user DTO':'Record user DTO',['web','lombok'],files,[{path:'/users/1',status:200,json:{id:1,name:'John'}}],{choices:'The repository returns a locally constructed DTO, as in the source; it is not a JPA repository. ImmutableConfig and Product let you inspect @Value and @Builder generation. The record state changes the accessor to id() while keeping the same response shape.'}));
}
{
const n=61;out.push(lab(n,'Explicit order dependencies',['web','test'],[main(n),pojo(n,'Order.java',{id:'Integer'}),java(n,'PaymentService.java',`import org.springframework.stereotype.Service;
@Service
public class PaymentService { public void processPayment(Order order) { System.out.println("Payment processed for order " + order.getId()); } }`),java(n,'OrderService.java',`import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class OrderService {
    private final PaymentService payments;
    public OrderService(PaymentService payments) { this.payments=payments; }
    public void processOrders(List<Order> orders) { for(Order order:orders)payments.processPayment(order); }
}`),java(n,'OrderController.java',`import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) { this.service=service; }
    @PostMapping("/order/process") public String process() { service.processOrders(List.of(new Order(1)));return "Orders processed"; }
}`),{path:'src/test/java/'+p(n).replaceAll('.','/')+'/OrderServiceTest.java',text:`package ${p(n)};
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
class OrderServiceTest {
    @Test void constructsWithRequiredDependency() { OrderService service=new OrderService(new PaymentService());assertDoesNotThrow(()->service.processOrders(List.of(new Order(1)))); }
}
`}],[{path:'/order/process',method:'POST',status:200,contains:'Orders processed'}],{logs:['Payment processed for order 1'],choices:'This is the corrected constructor-injection state. The earlier invalid field-injected new OrderService() is explained as a failing alternative, rather than shipped as the default running application.'}));}
module.exports=out;
