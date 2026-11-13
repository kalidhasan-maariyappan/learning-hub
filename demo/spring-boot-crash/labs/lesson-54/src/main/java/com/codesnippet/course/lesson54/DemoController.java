package com.codesnippet.course.lesson54;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class DemoController {
    private final ProviderService provider; private final ScopedService scoped; private final LookupService lookup;
    public DemoController(ProviderService provider,ScopedService scoped,LookupService lookup) { this.provider=provider;this.scoped=scoped;this.lookup=lookup; }
    @GetMapping("/instances") public Map<String,Object> instances() { return Map.of("provider",new int[]{provider.serve(),provider.serve()},"scoped",new int[]{scoped.serve(),scoped.serve()},"lookup",new int[]{lookup.serve(),lookup.serve()}); }
}
