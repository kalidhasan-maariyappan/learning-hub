package com.codesnippet.course.lesson19.controller;

import com.codesnippet.course.lesson19.entity.Book;
import com.codesnippet.course.lesson19.service.BookService;
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
}
