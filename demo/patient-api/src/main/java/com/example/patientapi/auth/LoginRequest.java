package com.example.patientapi.auth;


import jakarta.validation.constraints.*;

public record LoginRequest(
    @NotBlank(message = "Email is required") @Email(message = "Email must be valid") @Size(max = 254) String email,
    @NotBlank(message = "Password is required") @Size(max = 72) String password
) {
}
