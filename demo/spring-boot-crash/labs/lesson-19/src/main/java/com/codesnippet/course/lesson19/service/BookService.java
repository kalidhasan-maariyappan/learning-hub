package com.codesnippet.course.lesson19.service;

import com.codesnippet.course.lesson19.entity.Book;
import com.codesnippet.course.lesson19.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
@Service
public class BookService {
    @Autowired private BookRepository repository;
    @Transactional(isolation=Isolation.READ_COMMITTED)
    public Book addBook(Book book, boolean fail) {
        Book saved=repository.saveAndFlush(book);
        if(fail)throw new RuntimeException("Simulated failure after save");
        return saved;
    }
    public Book getBookByName(String title) { return repository.findBookByTitle(title); }
    public Book updateBook(Book book) { return repository.save(book); }
    public void deleteBook(Integer id) { repository.deleteById(id); }
    public long count() { return repository.count(); }
}
