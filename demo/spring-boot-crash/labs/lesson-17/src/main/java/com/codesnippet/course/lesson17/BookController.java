package com.codesnippet.course.lesson17;

import org.springframework.web.bind.annotation.*;
@RestController
public class BookController {
    private final BookTransactions transactions;
    public BookController(BookTransactions transactions) { this.transactions=transactions; }
    @PostMapping("/books") public long add(@RequestParam("title") String title,@RequestParam(value="fail",defaultValue="false") boolean fail,@RequestParam(value="template",defaultValue="false") boolean template) { return transactions.save(title,fail,template); }
    @GetMapping("/books/count") public long count() { return transactions.count(); }
}
