package com.codesnippet.course.lesson11;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DBConnection {
    @Autowired(required=false) private MySQLConnection mysql;
    @Autowired(required=false) private NoSQLConnection nosql;

    @GetMapping("/connections") public Map<String,String> connections() {
        return Map.of("sql",mysql==null?"absent":mysql.name(),"nosql",nosql==null?"absent":nosql.name());
    }
}
