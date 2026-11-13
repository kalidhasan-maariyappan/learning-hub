const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
const out=[];
for(const n of [31,32,33,36]){
 const weather=pojo(n,'entity/Weather.java',{id:'Long',city:'String',weatherForecast:'String'},'@Entity','import jakarta.persistence.*;');weather.text=weather.text.replace('class Weather {','class Weather implements java.io.Serializable {').replace('private Long id;','@Id @GeneratedValue\n    private Long id;');
 const cache=[32,33].includes(n);const files=[main(n,cache?'@org.springframework.cache.annotation.EnableCaching':''),weather,java(n,'repository/WeatherRepository.java',`import ${p(n)}.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WeatherRepository extends JpaRepository<Weather,Long> {
    Weather findByCity(String city);
    void deleteByCity(String city);
}`),java(n,'service/WeatherService.java',`import ${p(n)}.entity.Weather;
import ${p(n)}.repository.WeatherRepository;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.*;
import org.springframework.transaction.annotation.Transactional;
@Service
public class WeatherService {
    private final WeatherRepository repository;
    public WeatherService(WeatherRepository repository) { this.repository=repository; }
    ${cache?'@Cacheable(value="weather",key="#city")':''}
    public Weather getWeatherByCity(String city) {
        System.out.println("Database weather lookup: " + city);
        return repository.findByCity(city);
    }
    ${cache?'@CachePut(value="weather",key="#city")':''}
    public Weather updateWeather(String city,String forecast) {
        Weather weather=repository.findByCity(city);
        if(weather==null)weather=new Weather(null,city,forecast);else weather.setWeatherForecast(forecast);
        return repository.save(weather);
    }
    @Transactional
    ${cache?'@CacheEvict(value="weather",key="#city")':''}
    public void deleteWeather(String city) { repository.deleteByCity(city); }
}`),java(n,'controller/WeatherController.java',`import ${p(n)}.entity.Weather;
import ${p(n)}.service.WeatherService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    private final WeatherService service;
    public WeatherController(WeatherService service) { this.service=service; }
    @GetMapping("/{city}") public Weather get(@PathVariable("city") String city) { return service.getWeatherByCity(city); }
    @PutMapping("/{city}") public Weather put(@PathVariable("city") String city,@RequestParam("forecast") String forecast) { return service.updateWeather(city,forecast); }
    @DeleteMapping("/{city}") public void delete(@PathVariable("city") String city) { service.deleteWeather(city); }
}`),props('spring.datasource.url=jdbc:h2:mem:weather\nspring.jpa.hibernate.ddl-auto=create-drop'+(n===33?'\nspring.cache.type=redis\nspring.data.redis.host=localhost\nspring.data.redis.port=6379\nspring.cache.cache-names=weather':''))];
 if(n===31)files.push(java(n,'interceptor/LoggingInterceptor.java',`import org.springframework.stereotype.Component;
import org.springframework.web.servlet.*;
import jakarta.servlet.http.*;
@Component
public class LoggingInterceptor implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response,Object handler) { System.out.println("Pre-handle: " + request.getRequestURI());return true; }
    public void postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView model) { System.out.println("Post-handle"); }
    public void afterCompletion(HttpServletRequest request,HttpServletResponse response,Object handler,Exception error) { System.out.println("After-completion"); }
}`),java(n,'config/WebConfig.java',`import ${p(n)}.interceptor.LoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final LoggingInterceptor interceptor;
    public WebConfig(LoggingInterceptor interceptor) { this.interceptor=interceptor; }
    public void addInterceptors(InterceptorRegistry registry) { registry.addInterceptor(interceptor).addPathPatterns("/api/**").excludePathPatterns("/api/auth/**"); }
}`));
 if(n===36)files.push(java(n,'filter/LoggingFilter.java',`import org.springframework.stereotype.Component;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
@Component
public class LoggingFilter implements Filter {
    public void doFilter(ServletRequest request,ServletResponse response,FilterChain chain) throws IOException,ServletException {
        System.out.println("Filter before: " + ((HttpServletRequest)request).getRequestURI());
        chain.doFilter(request,response);
        System.out.println("Filter after");
    }
}`));
 out.push(lab(n,'Weather application',['web','jpa','h2',...(cache?['cache']:[]),...(n===33?['redis']:[])],files,[{path:'/api/weather/Delhi?forecast=Sunny',method:'PUT',status:200,json:{city:'Delhi',weatherForecast:'Sunny'}},{path:'/api/weather/Delhi',status:200,json:{weatherForecast:'Sunny'}},{path:'/api/weather/Delhi',status:200,json:{weatherForecast:'Sunny'}},{path:'/api/weather/Delhi?forecast=Rain',method:'PUT',status:200,json:{weatherForecast:'Rain'}},{path:'/api/weather/Delhi',status:200,json:{weatherForecast:'Rain'}}],{...(n===33?{external:'Start Redis on localhost:6379 before using the weather requests. For example, use the Redis Docker command taught in this lesson. Compilation does not verify a Redis server connection.'}:{}),...(n===31?{logs:['Pre-handle: /api/weather/Delhi','Post-handle','After-completion']}:n===36?{logs:['Filter before: /api/weather/Delhi','Filter after']}:{}),choices:'Weather and city values are local input fixtures. The Redis entity implements Serializable for the demonstrated object cache representation. Endpoint spelling is normalized; GET/PUT/DELETE all use the same city key.'}));
}
for(const n of [34,35]){
 const order=pojo(n,'entity/OrderRecord.java',{id:'Long',status:'String'},'@Entity\n@Table(name="orders")','import jakarta.persistence.*;');order.text=order.text.replace('private Long id;','@Id @GeneratedValue\n    private Long id;');
 const files=[main(n,n===34?'@org.springframework.scheduling.annotation.EnableScheduling':''),order,java(n,'repository/OrderRepository.java',`import ${p(n)}.entity.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrderRepository extends JpaRepository<OrderRecord,Long> { List<OrderRecord> findByStatus(String status); }`),java(n,'service/OrderScheduler.java',`import ${p(n)}.repository.OrderRepository;
import ${p(n)}.entity.OrderRecord;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
@Service
public class OrderScheduler {
    private final OrderRepository repository;
    public OrderScheduler(OrderRepository repository) { this.repository=repository; }
    ${n===34?'@Scheduled(fixedRate=5000)':''}
    public void processPendingOrders() {
        for(OrderRecord order:repository.findByStatus("PENDING")) { order.setStatus("COMPLETED");repository.save(order); }
        System.out.println("Pending orders processed");
    }
}`),java(n,'controller/OrderController.java',`import ${p(n)}.entity.OrderRecord;
import ${p(n)}.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class OrderController {
    private final OrderRepository repository;
    public OrderController(OrderRepository repository) { this.repository=repository; }
    @PostMapping("/orders") public OrderRecord create() { return repository.save(new OrderRecord(null,"PENDING")); }
    @GetMapping("/orders") public List<OrderRecord> all() { return repository.findAll(); }
}`),props('spring.datasource.url=jdbc:h2:mem:orders\nspring.jpa.hibernate.ddl-auto=create-drop')];
 if(n===35)files.push(java(n,'entity/ScheduleConfig.java',`import jakarta.persistence.*;
@Entity
public class ScheduleConfig {
    @Id private Long id=1L;
    private String cronExpression;
    public ScheduleConfig() {}
    public ScheduleConfig(String expression) { this.cronExpression=expression; }
    public Long getId() { return id; }
    public String getCronExpression() { return cronExpression; }
}`),java(n,'repository/ScheduleConfigRepository.java',`import ${p(n)}.entity.ScheduleConfig;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ScheduleConfigRepository extends JpaRepository<ScheduleConfig,Long> {}`),java(n,'service/DynamicScheduler.java',`import ${p(n)}.entity.ScheduleConfig;
import ${p(n)}.repository.ScheduleConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import java.util.concurrent.ScheduledFuture;
import jakarta.annotation.PreDestroy;
@Service
public class DynamicScheduler {
    private final ThreadPoolTaskScheduler scheduler=new ThreadPoolTaskScheduler();
    private final OrderScheduler orders; private final ScheduleConfigRepository repository;
    private ScheduledFuture<?> task;
    public DynamicScheduler(OrderScheduler orders,ScheduleConfigRepository repository) { this.orders=orders;this.repository=repository;scheduler.initialize(); }
    public synchronized void update(String expression) {
        CronTrigger trigger=new CronTrigger(expression);
        repository.save(new ScheduleConfig(expression));
        if(task!=null)task.cancel(false);
        task=scheduler.schedule(orders::processPendingOrders,trigger);
    }
    @PreDestroy public void close() { scheduler.shutdown(); }
}`),java(n,'controller/ScheduleController.java',`import ${p(n)}.service.DynamicScheduler;
import org.springframework.web.bind.annotation.*;
@RestController
public class ScheduleController {
    private final DynamicScheduler scheduler;
    public ScheduleController(DynamicScheduler scheduler) { this.scheduler=scheduler; }
    @PostMapping("/schedule") public String update(@RequestParam("cron") String expression) { scheduler.update(expression);return "Schedule updated"; }
}`));
 out.push(lab(n,'Scheduled order processing',['web','jpa','h2'],files,[{path:'/orders',method:'POST',status:200,json:{status:'PENDING'}},...(n===35?[{path:'/schedule?cron=*%20*%20*%20*%20*%20*',method:'POST',status:200}]:[]),{path:'/orders',status:200,delay:n===34?5500:1500,contains:'COMPLETED'}],{choices:'OrderRecord is the minimal ID/status data needed to reproduce pending-to-completed processing. The class name avoids a collision with other Order examples. The scheduling alternatives are edits to the same task, not separate simultaneous schedules.'}));
}
const cached=out.find(l=>l.number===32);
cached.cases.push({path:'/api/weather/Delhi',method:'DELETE',status:200},{path:'/api/weather/Delhi',status:200,bodyText:''});
cached.logsCount={'Database weather lookup: Delhi':1};
module.exports=out;
