const guide=require('./file-guides.cjs');
const hints={
5:{'Create a bean with @Component':'ProductService.java','Create beans with @Configuration and @Bean':'PaymentConfig.java'},
6:{'Field injection':'FieldUser.java','Setter injection':'SetterUser.java','Constructor injection':'ConstructorUser.java'},
8:{'@PostConstruct and @PreDestroy':'ProductService.java'},
10:{'Select a named bean with @Qualifier':'CheckoutService.java','Choose a default with @Primary':'DefaultPaymentService.java'},
11:{'Define the property condition':'NoSQLConnection.java'},
12:{'Create a bean only for a profile':'MySQLConnection.java'},
14:{'Declare the aspect':'LoggingAspect.java'},
15:{'Define Book':'entity/Book.java','Create the repository':'BookRepository.java'},
16:{'Apply @Transactional':'BookService.java'},
17:{'Call the manager directly':'BookTransactions.java'},
18:{'Set the propagation':'InnerService.java'},
19:{'Set isolation on the method':'BookService.java'},
21:{'Create the logger explicitly':'ProductService.java'},
22:{'Initialize the service and its dependency':'ProductServiceTest.java'},
25:{'Define the job':'BatchConfig.java','Process an item':'PersonProcessor.java'},
28:{'Map the Applicant entity':'entity/Applicant.java','Use JpaRepository':'ApplicantRepository.java'},
29:{'Map Resume to Applicant':'entity/Resume.java','Make the association bidirectional':'entity/Applicant.java'},
30:{'Add the collection to Applicant':'entity/Applicant.java'},
31:{'Implement HandlerInterceptor':'LoggingInterceptor.java','Register it with WebMvcConfigurer':'WebConfig.java'},
34:{'Enable scheduling':'Application.java'},
35:{'Use ThreadPoolTaskScheduler':'DynamicScheduler.java'},
36:{'Implement the logging filter':'LoggingFilter.java'},
38:{'Configure the security filter chain':'SecurityConfig.java','Create the stored user and repository':'entity/AppUser.java','Implement UserDetailsService':'DatabaseUserDetailsService.java'},
40:{'Create the request and endpoint':'LoginController.java','Build the token claims':'JwtService.java'},
41:{'Create and position the filter':'JwtRequestFilter.java','Parse the signed claims':'JwtService.java'},
44:{'Check the returned log’s owner':'LogService.java'},
45:{'Implement the shared service operation':'UserService.java','Public self-registration fixes the role':'UserController.java'},
48:{'Create the event object':'OrderCreatedEvent.java','Publish after creating the order':'OrderService.java'},
50:{'Run a listener only for high-value orders':'HighValueOrderListener.java','Configure a multicaster error handler':'EventConfig.java'},
51:{'Refresh the bean that uses the setting':'ConfigController.java'},
52:{'Choose exceptions and total attempts':'ExternalApiService.java'},
54:{'Request a bean with ObjectProvider':'ProviderService.java','Inject a scoped proxy':'ScopedPrototypeBean.java','Let Spring override a lookup method':'LookupService.java'},
55:{'Bind an email configuration object':'EmailNotificationProperties.java'},
56:{'Replace repetitive members deliberately':'model/UserDto.java','Generate a logger with @Slf4j':'service/UserService.java'},
58:{'Convert the DTO to a record':'model/UserDto.java'},
59:{'Mark the business service':'WeatherService.java'},
60:{'Write the Dockerfile':'Dockerfile','Add MySQL and connect the services':'compose.yaml'},
61:{'Expose the required dependency in the constructor':'OrderService.java'},
62:{'Check a class on the classpath':'RedisCacheConfig.java','Write a custom weekend condition':'OnWeekendCondition.java'}
};
module.exports=function align(t,lab){const shown=new Set();return t.sections.map(s=>{
  if(t.number===8&&s.heading==='InitializingBean and DisposableBean'){
    const source=lab.files.find(f=>f.path.endsWith('ProductService.java'));
    const text=source.text.replace('import jakarta.annotation.PostConstruct;','import org.springframework.beans.factory.InitializingBean;').replace('import jakarta.annotation.PreDestroy;','import org.springframework.beans.factory.DisposableBean;').replace('class ProductService {','class ProductService implements InitializingBean, DisposableBean {').replace('@PostConstruct public void initialize()','@Override public void afterPropertiesSet()').replace('@PreDestroy public void cleanup()','@Override public void destroy()');
    return {...s,code:{title:source.path+' — interface-based alternative',lang:'java',text},codeNote:'Use this version instead of the annotation-based ProductService shown next. Keep one ProductService class; both approaches implement the same initialization and cleanup stages.'};
  }
  if(t.number===9&&s.heading==='Singleton is the default'){
    const source=lab.files.find(f=>f.path.endsWith('/User.java'));
    return {...s,code:{title:source.path+' — singleton comparison',lang:'java',text:source.text.replace(/@Scope\([^\n]*\)/,'@Scope("singleton")')},codeNote:'Replace the request-scoped User with this version for the singleton comparison, then restore the request-scoped file for the later request experiment.'};
  }
  if(t.number===21&&s.heading==='Use Lombok @Slf4j as an alternative'){
    const source=lab.files.find(f=>f.path.endsWith('ProductService.java'));
    const text=source.text.replace('import org.slf4j.Logger;','import lombok.extern.slf4j.Slf4j;').replace('import org.slf4j.LoggerFactory;\n','').replace('@Service\n','@Slf4j\n@Service\n').replace(/    private static final Logger logger=.*;\n/,'').replace(/\blogger\./g,'log.');
    return {...s,code:{title:source.path+' — Lombok alternative',lang:'java',text},codeNote:'Replace the handwritten-logger version with this class, then rebuild. Keep only one ProductService class. The local POM includes Lombok and its Java 25 annotation processor for this alternative.'};
  }
  const suffix=hints[t.number]?.[s.heading];if(!suffix)return s;
  const file=lab.files.find(f=>f.path.endsWith(suffix));if(!file)return s;
  if(shown.has(file.path))return s;shown.add(file.path);
  let explain=[...guide(file),...(s.explain||[]).filter(p=>!/fragment.*(?:omit|not)|not.*compil|Lombok/i.test(p))];
  if(t.number===15&&s.heading==='Define Book')explain=['@Entity identifies the persistence entity. @Id marks its identifier; @GeneratedValue supplies the ID for a new row.','The no-argument constructor supports framework creation. The other constructor lets us create a book with values.','The handwritten accessors are equivalent to the source’s Lombok-generated members. @Data, @NoArgsConstructor, and @AllArgsConstructor are the alternative used there.'];
  return {...s,labFile:file.path,code:{title:file.path,lang:file.path.endsWith('.java')?'java':'text',text:file.text},explain,codeNote:undefined};
});};
