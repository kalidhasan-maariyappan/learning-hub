package com.codesnippet.course.lesson60.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.nio.file.*;
import java.util.*;
import java.io.IOException;
@RestController
public class NameController {
    private final Path file;
    public NameController(@Value("${names.file:names.txt}") String file) { this.file=Path.of(file); }
    @GetMapping("/names") public synchronized List<String> all() throws IOException { return Files.exists(file)?Files.readAllLines(file):List.of(); }
    @PostMapping("/names") public synchronized List<String> add(@RequestBody String name) throws IOException {
        if(file.getParent()!=null)Files.createDirectories(file.getParent());
        Files.writeString(file,name+System.lineSeparator(),StandardOpenOption.CREATE,StandardOpenOption.APPEND);return all();
    }
    @DeleteMapping("/names/{name}") public synchronized List<String> delete(@PathVariable("name") String name) throws IOException {
        List<String> names=new ArrayList<>(all());names.removeIf(name::equals);Files.write(file,names);return names;
    }
}
