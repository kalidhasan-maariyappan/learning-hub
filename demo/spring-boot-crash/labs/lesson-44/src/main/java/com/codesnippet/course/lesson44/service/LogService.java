package com.codesnippet.course.lesson44.service;

import com.codesnippet.course.lesson44.dto.LogRecord;
import org.springframework.stereotype.Service;
import org.springframework.security.access.prepost.*;
import java.util.*;
@Service
public class LogService {
    @PostAuthorize("returnObject.performedBy == authentication.name")
    public LogRecord get(Integer id) { return new LogRecord(id,id==1?"admin":"user"); }
    @PostFilter("filterObject.performedBy == authentication.name")
    public List<LogRecord> all() { return new ArrayList<>(List.of(new LogRecord(1,"admin"),new LogRecord(2,"user"))); }
}
