package com.codesnippet.course.lesson54;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Lookup;
@Service
public class LookupService {
    public int serve() { return getPrototype().identity(); }
    @Lookup protected PrototypeBean getPrototype() { return null; }
}
