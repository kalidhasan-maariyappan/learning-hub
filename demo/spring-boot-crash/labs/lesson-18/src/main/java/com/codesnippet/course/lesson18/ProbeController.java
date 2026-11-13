package com.codesnippet.course.lesson18;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class ProbeController {
    private final OuterService service;
    public ProbeController(OuterService service) { this.service=service; }
    @GetMapping("/probe") public Map<String,Boolean> probe(@RequestParam(value="mode",defaultValue="REQUIRED") String mode,@RequestParam(value="outer",defaultValue="false") boolean outer) { return outer?service.withTransaction(mode):service.call(mode); }
}
