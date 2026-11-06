package com.example.taskmanagement.exception;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import org.springframework.dao.*;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiErrors {
  public record ErrorBody(
      Instant timestamp,
      int status,
      String code,
      String message,
      String path,
      List<String> details) {}

  public static ErrorBody body(
      HttpStatus status, String message, String path, List<String> details) {
    return new ErrorBody(Instant.now(), status.value(), status.name(), message, path, details);
  }

  @ExceptionHandler(ApiException.class)
  ResponseEntity<ErrorBody> api(ApiException e, HttpServletRequest r) {
    return response(e.status, e.getMessage(), r, List.of());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ErrorBody> validation(MethodArgumentNotValidException e, HttpServletRequest r) {
    return response(
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        r,
        e.getBindingResult().getFieldErrors().stream()
            .map(f -> f.getField() + ": " + f.getDefaultMessage())
            .toList());
  }

  @ExceptionHandler({
    org.springframework.http.converter.HttpMessageNotReadableException.class,
    org.springframework.web.method.annotation.MethodArgumentTypeMismatchException.class,
    IllegalArgumentException.class
  })
  ResponseEntity<ErrorBody> bad(Exception e, HttpServletRequest r) {
    return response(HttpStatus.BAD_REQUEST, "Invalid request value", r, List.of());
  }

  @ExceptionHandler(AuthenticationException.class)
  ResponseEntity<ErrorBody> auth(Exception e, HttpServletRequest r) {
    return response(HttpStatus.UNAUTHORIZED, "Invalid credentials", r, List.of());
  }

  @ExceptionHandler(AccessDeniedException.class)
  ResponseEntity<ErrorBody> denied(Exception e, HttpServletRequest r) {
    return response(HttpStatus.FORBIDDEN, "Access denied", r, List.of());
  }

  @ExceptionHandler({
    org.springframework.orm.ObjectOptimisticLockingFailureException.class,
    jakarta.persistence.OptimisticLockException.class
  })
  ResponseEntity<ErrorBody> conflict(Exception e, HttpServletRequest r) {
    return response(HttpStatus.CONFLICT, "Concurrent update; reload and retry", r, List.of());
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  ResponseEntity<ErrorBody> integrity(Exception e, HttpServletRequest r) {
    return response(HttpStatus.CONFLICT, "Record conflicts with existing data", r, List.of());
  }

  @ExceptionHandler({
    org.springframework.web.servlet.resource.NoResourceFoundException.class,
    org.springframework.web.HttpRequestMethodNotSupportedException.class,
    org.springframework.web.bind.MissingServletRequestParameterException.class,
    org.springframework.web.HttpMediaTypeNotSupportedException.class
  })
  ResponseEntity<ErrorBody> framework(Exception e, HttpServletRequest r) {
    var error = (org.springframework.web.ErrorResponse) e;
    var status = HttpStatus.valueOf(error.getStatusCode().value());
    return response(status, status.getReasonPhrase(), r, List.of());
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ErrorBody> unexpected(Exception e, HttpServletRequest r) {
    org.slf4j.LoggerFactory.getLogger(ApiErrors.class).error("Unhandled request failure", e);
    return response(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error", r, List.of());
  }

  private ResponseEntity<ErrorBody> response(
      HttpStatus s, String m, HttpServletRequest r, List<String> d) {
    return ResponseEntity.status(s).body(body(s, m, r.getRequestURI(), d));
  }
}
