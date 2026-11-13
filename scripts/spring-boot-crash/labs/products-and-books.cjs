const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
function entity(n,name,fields){const f=pojo(n,'entity/'+name+'.java',{id:'Integer',...fields},'@Entity','import jakarta.persistence.*;');f.text=f.text.replace('private Integer id;','@Id\n    @GeneratedValue(strategy=GenerationType.IDENTITY)\n    private Integer id;');return f;}
function repo(n,name,extra=''){return java(n,'repository/'+name+'Repository.java',`import ${p(n)}.entity.${name};
import org.springframework.data.jpa.repository.JpaRepository;
public interface ${name}Repository extends JpaRepository<${name},Integer> { ${extra} }`);}
const db=()=>props('spring.datasource.url=jdbc:h2:mem:course\nspring.datasource.username=sa\nspring.datasource.password=\nspring.jpa.hibernate.ddl-auto=create-drop\nspring.h2.console.enabled=true');
const out=[];
for(const n of [13,14,21,22,23]){
 const files=[main(n),entity(n,'Product',{name:'String'}),repo(n,'Product','java.util.Optional<Product> findByName(String name);'),db(),java(n,'service/ProductService.java',`import ${p(n)}.entity.Product;
import ${p(n)}.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class ProductService {
    private static final Logger logger=LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository repository;
    public ProductService(ProductRepository repository) { this.repository=repository; }
    public Product addProduct(Product product) {
        if(!validateProductName(product.getName())) throw new RuntimeException("Product name must not be empty");
        logger.info("Adding product in DB"); logger.debug("Product name: {}",product.getName());
        logger.warn("Example warning"); logger.error("Example error-level message"); logger.trace("Example trace");
        return repository.save(product);
    }
    private boolean validateProductName(String name) { return name!=null && !name.isBlank(); }
    public Product getProduct(Integer id) { return repository.findById(id).orElseThrow(()->new ${n===13?p(n)+'.exception.ProductNotFoundException':'RuntimeException'}("Product " + id + " not found")); }
    public Product getByName(String name) { return repository.findByName(name).orElseThrow(()->new ${n===13?p(n)+'.exception.ProductNotFoundException':'RuntimeException'}("Product " + name + " not found")); }
    public void deleteProduct(Integer id) { repository.deleteById(id); }
}`),java(n,'controller/ProductController.java',`import ${p(n)}.entity.Product;
import ${p(n)}.service.ProductService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service=service; }
    @PostMapping public Product add(@RequestBody Product product) { return service.addProduct(product); }
    @GetMapping("/{id}") public Product get(@PathVariable("id") Integer id) { return service.getProduct(id); }
    @GetMapping("/name/{name}") public Product byName(@PathVariable("name") String name) { return service.getByName(name); }
    @DeleteMapping("/{id}") public void delete(@PathVariable("id") Integer id) { service.deleteProduct(id); }
}`)];
 if(n===13)files.push(java(n,'exception/ProductNotFoundException.java','public class ProductNotFoundException extends RuntimeException { public ProductNotFoundException(String message) { super(message); } }'),pojo(n,'dto/ErrorResponse.java',{timestamp:'java.time.LocalDateTime',message:'String',details:'String'}),java(n,'exception/GlobalExceptionHandler.java',`import ${p(n)}.dto.ErrorResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(ProductNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(LocalDateTime.now(),exception.getMessage(),"Product lookup failed"));
    }
}`));
 if(n===14)files.push(java(n,'aspect/LoggingAspect.java',`import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Aspect
@Component
public class LoggingAspect {
    @Pointcut("execution(* ${p(n)}.service.ProductService.*(..))")
    public void productOperation() {}
    @Before("productOperation()") public void before() { System.out.println("Aspect before product method"); }
    @After("productOperation()") public void after() { System.out.println("Aspect after product method"); }
    @Around("productOperation()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        System.out.println("Around: before proceed");
        Object result=point.proceed();
        System.out.println("Around: after proceed");
        return result;
    }
}`));
 if([22,23].includes(n))files.push({path:'src/test/java/'+p(n).replaceAll('.','/')+'/ProductServiceTest.java',text:`package ${p(n)};
import ${p(n)}.entity.Product;
import ${p(n)}.repository.ProductRepository;
import ${p(n)}.service.ProductService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock ProductRepository repository;
    @InjectMocks ProductService service;
    private Product product;
    @BeforeEach void prepare() { product=new Product(1,"Product"); }
${n===23?'    @BeforeAll static void beforeAll() { System.out.println("Before all tests"); }\n    @AfterEach void afterEach() { System.out.println("After each test"); }\n    @AfterAll static void afterAll() { System.out.println("After all tests"); }':''}
    @Test void addsProduct() {
        when(repository.save(product)).thenReturn(product);
        Product actual=service.addProduct(product);
        assertNotNull(actual); assertEquals(1,actual.getId());
    }
${n===23?`    @Test void deletesProduct() {
        doNothing().when(repository).deleteById(1);
        service.deleteProduct(1);
        verify(repository,times(1)).deleteById(1);
    }
    @Test void rejectsInvalidNameWithoutSaving() {
        product.setName("");
        RuntimeException error=assertThrows(RuntimeException.class,()->service.addProduct(product));
        assertEquals("Product name must not be empty",error.getMessage());
        verify(repository,never()).save(any(Product.class));
    }
    @Test void privateValidationThroughReflection() throws ReflectiveOperationException {
        var method=ProductService.class.getDeclaredMethod("validateProductName",String.class);
        method.setAccessible(true);
        assertEquals(true,method.invoke(service,"Product"));
        assertEquals(false,method.invoke(service,""));
    }`:''}
}
`});
 const cases=[{path:'/products',method:'POST',body:{name:'Product'},status:200,json:{id:1,name:'Product'}},{path:'/products/1',status:200,json:{name:'Product'}}];
 if(n===13)cases.push({path:'/products/99',status:404,json:{message:'Product 99 not found'}});
 out.push(lab(n,'Product application',['web','jpa','h2',...(n===14?['aop']:[]),...(n===21?['lombok']:[]),...([22,23].includes(n)?['test']:[])],files,cases,{purpose:'Continue the product example with the feature taught in this lesson.',choices:'Product names, package names, route spelling and the minimal two-field entity are reconstruction choices. The error response uses a runtime timestamp, not a fixed invented output. The logging state also includes Lombok and its annotation processor for the alternative @Slf4j implementation.'}));
}
for(const n of [15,16,19]){
 const files=[main(n),entity(n,'Book',{title:'String',author:'String',genre:'String',...(n===19?{price:'Double'}:{})}),repo(n,'Book','Book findBookByTitle(String title);'),db(),java(n,'service/BookService.java',`import ${p(n)}.entity.Book;
import ${p(n)}.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
@Service
public class BookService {
    @Autowired private BookRepository repository;
    ${n===16?'@Transactional':n===19?'@Transactional(isolation=Isolation.READ_COMMITTED)':''}
    public Book addBook(Book book, boolean fail) {
        Book saved=repository.saveAndFlush(book);
        if(fail)throw new RuntimeException("Simulated failure after save");
        return saved;
    }
    public Book getBookByName(String title) { return repository.findBookByTitle(title); }
    public Book updateBook(Book book) { return repository.save(book); }
    public void deleteBook(Integer id) { repository.deleteById(id); }
    public long count() { return repository.count(); }
}`),java(n,'controller/BookController.java',`import ${p(n)}.entity.Book;
import ${p(n)}.service.BookService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/book/v1")
public class BookController {
    private final BookService service;
    public BookController(BookService service) { this.service=service; }
    @PostMapping("/addBook") public Book add(@RequestBody Book book,@RequestParam(value="fail",defaultValue="false") boolean fail) { return service.addBook(book,fail); }
    @GetMapping("/getBook/{title}") public Book get(@PathVariable("title") String title) { return service.getBookByName(title); }
    @PutMapping("/updateBook") public Book update(@RequestBody Book book) { return service.updateBook(book); }
    @DeleteMapping("/deleteBook/{id}") public ResponseEntity<Void> delete(@PathVariable("id") Integer id) { service.deleteBook(id); return ResponseEntity.ok().build(); }
    @GetMapping("/count") public long count() { return service.count(); }
}`)];
 const cases=[{path:'/book/v1/addBook',method:'POST',body:{title:'Harry Potter',author:'J. K. Rowling',genre:'Fantasy'},status:200,json:{title:'Harry Potter',id:1}},{path:'/book/v1/getBook/Harry%20Potter',status:200,json:{author:'J. K. Rowling'}}];
 if(n===16)cases.push({path:'/book/v1/addBook?fail=true',method:'POST',body:{title:'Rollback',author:'Demo',genre:'Demo'},status:500},{path:'/book/v1/count',status:200,contains:'1'});
 else cases.push({path:'/book/v1/updateBook',method:'PUT',body:{id:1,title:'Changed title',author:'J. K. Rowling',genre:'Fantasy'},status:200,json:{id:1,title:'Changed title'}},{path:'/book/v1/deleteBook/1',method:'DELETE',status:200},{path:'/book/v1/count',status:200,contains:'0'});
 out.push(lab(n,'Book application',['web','jpa','h2'],files,cases,{choices:'Accessors replace Lombok boilerplate so the focus stays on the book operation. The source lesson 15 selects Lombok; its equivalent annotations remain explained. A fail parameter and count endpoint are minimal verification scaffolding for the rollback observation. Isolation settings are runnable here, but concurrency anomalies are explained separately rather than inferred from a single request.'}));
}
{
const n=17;out.push(lab(n,'Programmatic transaction boundaries',['web','jpa','h2'],[main(n),db(),java(n,'TransactionConfig.java',`import javax.sql.DataSource;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
@Configuration
public class TransactionConfig { @Bean public PlatformTransactionManager transactionManager(DataSource dataSource) { return new DataSourceTransactionManager(dataSource); } }`),java(n,'BookTransactions.java',`import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.*;
import org.springframework.transaction.support.*;
@Service
public class BookTransactions {
    private final JdbcTemplate jdbc; private final PlatformTransactionManager manager;
    public BookTransactions(JdbcTemplate jdbc,PlatformTransactionManager manager) {
        this.jdbc=jdbc; this.manager=manager;
        jdbc.execute("create table if not exists book(id integer generated by default as identity primary key, title varchar(100))");
    }
    public long save(String title, boolean fail, boolean template) {
        if(template) { new TransactionTemplate(manager).executeWithoutResult(status->write(title,fail)); }
        else {
            TransactionStatus status=manager.getTransaction(new DefaultTransactionDefinition());
            try { write(title,fail); manager.commit(status); }
            catch(RuntimeException error) { manager.rollback(status); throw error; }
        }
        return count();
    }
    private void write(String title,boolean fail) {
        jdbc.update("insert into book(title) values (?)",title);
        if(fail)throw new RuntimeException("Simulated failure");
    }
    public long count() { return jdbc.queryForObject("select count(*) from book",Long.class); }
}`),java(n,'BookController.java',`import org.springframework.web.bind.annotation.*;
@RestController
public class BookController {
    private final BookTransactions transactions;
    public BookController(BookTransactions transactions) { this.transactions=transactions; }
    @PostMapping("/books") public long add(@RequestParam("title") String title,@RequestParam(value="fail",defaultValue="false") boolean fail,@RequestParam(value="template",defaultValue="false") boolean template) { return transactions.save(title,fail,template); }
    @GetMapping("/books/count") public long count() { return transactions.count(); }
}`)],[{path:'/books?title=One',method:'POST',status:200,contains:'1'},{path:'/books?title=Two&fail=true',method:'POST',status:500},{path:'/books/count',status:200,contains:'1'},{path:'/books?title=Three&template=true',method:'POST',status:200,contains:'2'}],{choices:'The minimal SQL table and request parameters make commit/rollback observable. JDBC work uses the demonstrated DataSourceTransactionManager. This is explicit supporting code for the source’s manager/template example, not a claimed listing of its omitted database-work block.'}));}
{
const n=18;out.push(lab(n,'Propagation across bean calls',['web','jpa','h2'],[main(n),db(),java(n,'InnerService.java',`import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import java.util.Map;
@Service
public class InnerService {
    private Map<String,Boolean> state() {
        return Map.of("active",TransactionSynchronizationManager.isActualTransactionActive(),"newTransaction",TransactionAspectSupport.currentTransactionStatus().isNewTransaction());
    }
${['REQUIRED','REQUIRES_NEW','MANDATORY','NESTED','SUPPORTS','NOT_SUPPORTED','NEVER'].map(mode=>`    @Transactional(propagation=Propagation.${mode})\n    public Map<String,Boolean> ${mode.toLowerCase()}() { return state(); }`).join('\n')}
}`),java(n,'OuterService.java',`import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
@Service
public class OuterService {
    private final InnerService inner;
    public OuterService(InnerService inner) { this.inner=inner; }
    @Transactional public Map<String,Boolean> withTransaction(String mode) { return call(mode); }
    public Map<String,Boolean> call(String mode) {
        return switch(mode) {
            case "REQUIRES_NEW" -> inner.requires_new(); case "MANDATORY" -> inner.mandatory();
            case "NESTED" -> inner.nested(); case "SUPPORTS" -> inner.supports();
            case "NOT_SUPPORTED" -> inner.not_supported(); case "NEVER" -> inner.never();
            default -> inner.required();
        };
    }
}`),java(n,'ProbeController.java',`import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class ProbeController {
    private final OuterService service;
    public ProbeController(OuterService service) { this.service=service; }
    @GetMapping("/probe") public Map<String,Boolean> probe(@RequestParam(value="mode",defaultValue="REQUIRED") String mode,@RequestParam(value="outer",defaultValue="false") boolean outer) { return outer?service.withTransaction(mode):service.call(mode); }
}`)],[{path:'/probe',status:200,json:{active:true,newTransaction:true}},{path:'/probe?outer=true',status:200,json:{active:true,newTransaction:false}},{path:'/probe?outer=true&mode=REQUIRES_NEW',status:200,json:{active:true,newTransaction:true}},{path:'/probe?mode=MANDATORY',status:500},{path:'/probe?outer=true&mode=NEVER',status:500},{path:'/probe?mode=SUPPORTS',status:200,json:{active:false}},{path:'/probe?outer=true&mode=NOT_SUPPORTED',status:200,json:{active:false}}],{choices:'The probe endpoint exposes the same transaction-state values inspected in the source debugger. It adds no business transaction. NESTED with an existing JPA transaction is manager-dependent and is not claimed as a tested savepoint implementation.'}));}
{
const n=20;out.push(lab(n,'Actuator endpoint tour',['web','actuator'],[main(n),props('management.endpoints.web.exposure.include=*\nmanagement.endpoint.health.show-details=always\nmanagement.endpoint.shutdown.access=unrestricted')],[{path:'/actuator/health',status:200,json:{status:'UP'}},{path:'/actuator/metrics',status:200,contains:'jvm.memory.used'},{path:'/actuator/mappings',status:200,contains:'dispatcherServlet'},{path:'/actuator/shutdown',method:'POST',status:200,contains:'Shutting down'}],{choices:'The wildcard exposure is the source’s local endpoint-tour configuration. The Boot 3.5.16 state also sets shutdown.access=unrestricted for its endpoint access model. Endpoint availability still depends on configured application components; no production exposure policy is inferred.'}));}
module.exports=out;
