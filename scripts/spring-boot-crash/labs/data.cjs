const {lab,java,main,pojo,props,packageName:p}=require('./common.cjs');
const out=[];
const db=()=>props('spring.datasource.url=jdbc:h2:mem:applicants\nspring.datasource.username=sa\nspring.datasource.password=\nspring.jpa.hibernate.ddl-auto=create-drop\nspring.h2.console.enabled=true');
function entity(n,path,fields,annotations={},imports='') {const f=pojo(n,path,fields,'@Entity','import jakarta.persistence.*;\n'+imports);for(const [field,annotation]of Object.entries(annotations))f.text=f.text.replace('private '+fields[field]+' '+field+';',annotation+'\n    private '+fields[field]+' '+field+';');return f;}
{
const n=25;const person=entity(n,'entity/Person.java',{id:'Long',firstName:'String'},{id:'@Id @GeneratedValue'});out.push(lab(n,'CSV person import',['web','jpa','h2','batch'],[main(n),person,java(n,'repository/PersonRepository.java',`import ${p(n)}.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PersonRepository extends JpaRepository<Person,Long> {}`),java(n,'batch/PersonProcessor.java',`import ${p(n)}.entity.Person;
import org.springframework.batch.item.ItemProcessor;
public class PersonProcessor implements ItemProcessor<Person,Person> {
    public Person process(Person person) { person.setFirstName(person.getFirstName().toUpperCase()); return person; }
}`),java(n,'batch/BatchConfig.java',`import ${p(n)}.entity.Person;
import ${p(n)}.repository.PersonRepository;
import org.springframework.context.annotation.*;
import org.springframework.batch.core.*;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.*;
import org.springframework.batch.item.file.*;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.data.builder.RepositoryItemWriterBuilder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;
@Configuration
public class BatchConfig {
    @Bean public FlatFileItemReader<Person> reader() {
        return new FlatFileItemReaderBuilder<Person>().name("personReader")
            .resource(new ClassPathResource("people.csv")).linesToSkip(1)
            .delimited().names("firstName").targetType(Person.class).build();
    }
    @Bean public ItemProcessor<Person,Person> processor() { return new PersonProcessor(); }
    @Bean public RepositoryItemWriter<Person> writer(PersonRepository repository) {
        return new RepositoryItemWriterBuilder<Person>().repository(repository).build();
    }
    @Bean public Step step(JobRepository jobs,PlatformTransactionManager transactions,FlatFileItemReader<Person> reader,ItemProcessor<Person,Person> processor,RepositoryItemWriter<Person> writer) {
        return new StepBuilder("csvImportStep",jobs).<Person,Person>chunk(10,transactions).reader(reader).processor(processor).writer(writer).build();
    }
    @Bean public Job job(JobRepository jobs,Step step) { return new JobBuilder("importPersons",jobs).start(step).build(); }
}`),java(n,'controller/JobController.java',`import ${p(n)}.repository.PersonRepository;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class JobController {
    private final JobLauncher launcher; private final Job job; private final PersonRepository people;
    public JobController(JobLauncher launcher,Job job,PersonRepository people) { this.launcher=launcher;this.job=job;this.people=people; }
    @PostMapping("/jobs/importData") public Map<String,Object> run() throws Exception {
        JobExecution result=launcher.run(job,new JobParametersBuilder().addLong("startTime",System.nanoTime()).toJobParameters());
        return Map.of("status",result.getStatus().name(),"people",people.findAll());
    }
}`),props('spring.datasource.url=jdbc:h2:mem:batch\nspring.jpa.hibernate.ddl-auto=create-drop\nspring.batch.jdbc.initialize-schema=always\nspring.batch.job.enabled=false\nspring.h2.console.enabled=true'),{path:'src/main/resources/people.csv',text:'firstName\nchetan\nasha\nmina\n'}],[{path:'/jobs/importData',method:'POST',status:200,json:{status:'COMPLETED'},contains:'CHETAN'}],{choices:'The original 1,000-row CSV and complete headers are not supplied. This local validation fixture has three first names and a minimal Person mapping to exercise the same uppercase transformation, chunk, writer, launch and metadata flow. It is explicitly not the original dataset. Boot 3.5.16 supplies its compatible Batch version rather than copying an older explicit Batch dependency.'}));}
{
const n=27;out.push(lab(n,'Entity lifecycle',['web','jpa','h2'],[main(n),entity(n,'entity/Applicant.java',{id:'Long',name:'String'},{id:'@Id @GeneratedValue'}),java(n,'ApplicantLifecycle.java',`import ${p(n)}.entity.Applicant;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
@Service
public class ApplicantLifecycle {
    @PersistenceContext private EntityManager manager;
    @Transactional public Map<String,Boolean> trace() {
        Map<String,Boolean> result=new LinkedHashMap<>();
        Applicant applicant=new Applicant(null,"Chetan");
        result.put("newObjectManaged",manager.contains(applicant));
        manager.persist(applicant); manager.flush();
        result.put("afterPersistManaged",manager.contains(applicant));
        manager.detach(applicant);
        result.put("afterDetachManaged",manager.contains(applicant));
        Applicant managed=manager.merge(applicant);
        result.put("mergeResultManaged",manager.contains(managed));
        manager.remove(managed); manager.flush();
        result.put("afterRemoveManaged",manager.contains(managed));
        return result;
    }
}`),java(n,'LifecycleController.java',`import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class LifecycleController {
    private final ApplicantLifecycle lifecycle;
    public LifecycleController(ApplicantLifecycle lifecycle) { this.lifecycle=lifecycle; }
    @GetMapping("/lifecycle") public Map<String,Boolean> trace() { return lifecycle.trace(); }
}`),db()],[{path:'/lifecycle',status:200,json:{newObjectManaged:false,afterPersistManaged:true,afterDetachManaged:false,mergeResultManaged:true,afterRemoveManaged:false}}],{choices:'The small endpoint makes the lifecycle operations observable on one Applicant. The flags are EntityManager.contains observations; the explanatory lifecycle states remain distinct from these Boolean values.'}));}
for(const n of [28,29,30]){
 const fields={id:'Long',name:'String',email:'String',phone:'String',status:'String',...(n>=29?{resume:'Resume'}:{}),...(n===30?{applications:'java.util.List<JobApplication>',jobs:'java.util.List<Job>'}:{})};
 const annotations={id:'@Id @GeneratedValue',...(n>=29?{resume:'@OneToOne(mappedBy="applicant",cascade=CascadeType.ALL)'}:{}),...(n===30?{applications:'@OneToMany(mappedBy="applicant",cascade=CascadeType.ALL)',jobs:'@ManyToMany\n    @JoinTable(name="applicant_jobs",joinColumns=@JoinColumn(name="applicant_id"),inverseJoinColumns=@JoinColumn(name="job_id"))'}:{})};
 const files=[main(n),entity(n,'entity/Applicant.java',fields,annotations),java(n,'repository/ApplicantRepository.java',`import ${p(n)}.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface ApplicantRepository extends JpaRepository<Applicant,Long> {
    List<Applicant> findByStatus(String status);
    List<Applicant> findByNameAndStatus(String name,String status);
    List<Applicant> findByStatusOrderByNameAsc(String status);
    @Query("select a from Applicant a where lower(a.name) like lower(concat('%', :name, '%'))")
    List<Applicant> findApplicantsByPartialName(@Param("name") String name);
}`),java(n,'service/ApplicantService.java',`import ${p(n)}.entity.*;
import ${p(n)}.repository.ApplicantRepository;
import org.springframework.stereotype.Service;
@Service
public class ApplicantService {
    private final ApplicantRepository repository;
    public ApplicantService(ApplicantRepository repository) { this.repository=repository; }
    public Applicant save(Applicant applicant) {
${n>=29?'        if(applicant.getResume()!=null)applicant.getResume().setApplicant(applicant);':''}
${n===30?'        if(applicant.getApplications()!=null)for(JobApplication application:applicant.getApplications())application.setApplicant(applicant);':''}
        return repository.save(applicant);
    }
}`),java(n,'controller/ApplicantController.java',`import ${p(n)}.entity.Applicant;
import ${p(n)}.repository.ApplicantRepository;
import ${p(n)}.service.ApplicantService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;
import java.util.List;
@RestController
@RequestMapping("/applicants")
public class ApplicantController {
    private final ApplicantRepository repository; private final ApplicantService service;
    public ApplicantController(ApplicantRepository repository,ApplicantService service) { this.repository=repository;this.service=service; }
    @PostMapping public Applicant create(@RequestBody Applicant applicant) { return service.save(applicant); }
    @GetMapping public List<Applicant> all() { return repository.findAll(); }
    @GetMapping("/page") public Page<Applicant> page(@RequestParam(defaultValue="0",name="page") int page,@RequestParam(defaultValue="2",name="size") int size) { return repository.findAll(PageRequest.of(page,size)); }
    @GetMapping("/status/{status}") public List<Applicant> status(@PathVariable("status") String status) { return repository.findByStatus(status); }
    @GetMapping("/search") public List<Applicant> search(@RequestParam("name") String name) { return repository.findApplicantsByPartialName(name); }
}`),db()];
 if(n>=29)files.push(entity(n,'entity/Resume.java',{id:'Long',content:'String',applicant:'Applicant'},{id:'@Id @GeneratedValue',applicant:'@com.fasterxml.jackson.annotation.JsonIgnore\n    @OneToOne\n    @JoinColumn(name="applicant_id",nullable=false)'}));
 if(n===30)files.push(entity(n,'entity/JobApplication.java',{id:'Long',status:'String',position:'String',applicant:'Applicant'},{id:'@Id @GeneratedValue',applicant:'@com.fasterxml.jackson.annotation.JsonIgnore\n    @ManyToOne\n    @JoinColumn(name="applicant_id",nullable=false)'}),entity(n,'entity/Job.java',{id:'Long',title:'String',description:'String',applicants:'java.util.List<Applicant>'},{id:'@Id @GeneratedValue',applicants:'@com.fasterxml.jackson.annotation.JsonIgnore\n    @ManyToMany(mappedBy="jobs")'}),java(n,'repository/JobRepository.java',`import ${p(n)}.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
public interface JobRepository extends JpaRepository<Job,Long> {}`),java(n,'controller/JobController.java',`import ${p(n)}.entity.*;
import ${p(n)}.repository.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
@RestController
public class JobController {
    private final JobRepository jobs; private final ApplicantRepository applicants;
    public JobController(JobRepository jobs,ApplicantRepository applicants) { this.jobs=jobs;this.applicants=applicants; }
    @PostMapping("/jobs") public Job create(@RequestBody Job job) { return jobs.save(job); }
    @Transactional
    @PostMapping("/jobs/{jobId}/applicants/{applicantId}") public Applicant associate(@PathVariable("jobId") Long jobId,@PathVariable("applicantId") Long applicantId) {
        Job job=jobs.findById(jobId).orElseThrow(); Applicant applicant=applicants.findById(applicantId).orElseThrow();
        if(applicant.getJobs()==null)applicant.setJobs(new ArrayList<>());
        applicant.getJobs().add(job);
        return applicants.save(applicant);
    }
}`));
 const body={name:'Chetan',email:'learner@example.test',phone:'000',status:'NEW',...(n>=29?{resume:{content:'Java developer'}}:{}),...(n===30?{applications:[{status:'SUBMITTED'}]}:{})};
 const cases=[{path:'/applicants',method:'POST',body,status:200,json:{name:'Chetan'}},{path:'/applicants/search?name=chet',status:200,contains:'Chetan'},{path:'/applicants/page?page=0&size=1',status:200,contains:'totalElements'}];
 if(n===29)cases.push({path:'/applicants',status:200,contains:'Java developer'});
 if(n===30)cases.push({path:'/jobs',method:'POST',body:{title:'Java developer',description:'Sample opening'},status:200,json:{id:1}},{path:'/jobs/1/applicants/1',method:'POST',status:200,contains:'Java developer'});
 out.push(lab(n,'Applicant application',['web','jpa','h2'],files,cases,{choices:'The Applicant fields follow the source. Contact values are synthetic local test data. Resume content and JobApplication.status are minimal supporting fields where full original listings are absent. The partial-name JPQL and association body are explicitly completed reconstruction choices, not claims of exact recovered code. JobApplication avoids a collision with the Java main Application class.'}));
}
module.exports=out;
