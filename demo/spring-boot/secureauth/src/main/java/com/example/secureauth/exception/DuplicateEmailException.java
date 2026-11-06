package com.example.secureauth.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException() {
        super("An account with this email already exists");
    }
}
