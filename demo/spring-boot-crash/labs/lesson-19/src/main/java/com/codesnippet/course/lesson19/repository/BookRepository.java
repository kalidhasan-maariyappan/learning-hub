package com.codesnippet.course.lesson19.repository;

import com.codesnippet.course.lesson19.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookRepository extends JpaRepository<Book,Integer> { Book findBookByTitle(String title); }
