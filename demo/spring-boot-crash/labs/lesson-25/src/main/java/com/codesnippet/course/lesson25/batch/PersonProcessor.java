package com.codesnippet.course.lesson25.batch;

import com.codesnippet.course.lesson25.entity.Person;
import org.springframework.batch.item.ItemProcessor;
public class PersonProcessor implements ItemProcessor<Person,Person> {
    public Person process(Person person) { person.setFirstName(person.getFirstName().toUpperCase()); return person; }
}
