package com.codesnippet.course.lesson25.batch;

import com.codesnippet.course.lesson25.entity.Person;
import com.codesnippet.course.lesson25.repository.PersonRepository;
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
}
