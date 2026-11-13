package com.codesnippet.course.lesson13.exception;

import com.codesnippet.course.lesson13.dto.ErrorResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(ProductNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(LocalDateTime.now(),exception.getMessage(),"Product lookup failed"));
    }
}
