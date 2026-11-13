package com.codesnippet.course.lesson18;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
@Service
public class OuterService {
    private final InnerService inner;
    public OuterService(InnerService inner) { this.inner=inner; }
    @Transactional public Map<String,Boolean> withTransaction(String mode) { return call(mode); }
    public Map<String,Boolean> call(String mode) {
        return switch(mode) {
            case "REQUIRES_NEW" -> inner.requires_new(); case "MANDATORY" -> inner.mandatory();
            case "NESTED" -> inner.nested(); case "SUPPORTS" -> inner.supports();
            case "NOT_SUPPORTED" -> inner.not_supported(); case "NEVER" -> inner.never();
            default -> inner.required();
        };
    }
}
