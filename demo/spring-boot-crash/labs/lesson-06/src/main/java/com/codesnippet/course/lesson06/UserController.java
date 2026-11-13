package com.codesnippet.course.lesson06;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
public class UserController {
    private final FieldUser field; private final SetterUser setter; private final ConstructorUser constructor;
    public UserController(FieldUser field, SetterUser setter, ConstructorUser constructor) {
        this.field=field; this.setter=setter; this.constructor=constructor;
    }
    @GetMapping("/orders")
    public Map<String,String> orders() {
        return Map.of("field",field.placeOrder(),"setter",setter.placeOrder(),"constructor",constructor.placeOrder());
    }
}
