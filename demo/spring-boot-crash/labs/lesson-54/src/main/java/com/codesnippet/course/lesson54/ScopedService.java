package com.codesnippet.course.lesson54;

import org.springframework.stereotype.Service;
@Service
public class ScopedService {
    private final ScopedPrototypeBean prototype;
    public ScopedService(ScopedPrototypeBean prototype) { this.prototype=prototype; }
    public int serve() { return prototype.identity(); }
}
