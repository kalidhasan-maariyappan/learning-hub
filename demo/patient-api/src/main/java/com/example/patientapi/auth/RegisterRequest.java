package com.example.patientapi.auth;


import jakarta.validation.constraints.*;

public record RegisterRequest(
    @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must be at most 100 characters") String name,
    @NotBlank(message = "Email is required") @Email(message = "Email must be valid") @Size(max = 254) String email,
    @NotBlank(message = "Password is required") @Size(min = 12, max = 72, message = "Password must contain 12 to 72 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$", message = "Password must include uppercase, lowercase, number and special character") String password
) {
}
