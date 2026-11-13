package com.codesnippet.course.lesson16.repository;

import com.codesnippet.course.lesson16.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookRepository extends JpaRepository<Book,Integer> { Book findBookByTitle(String title); }
