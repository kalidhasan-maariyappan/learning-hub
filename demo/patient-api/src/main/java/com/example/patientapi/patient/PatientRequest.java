package com.example.patientapi.patient;


import jakarta.validation.constraints.*;

public record PatientRequest(
    @NotBlank(message = "Name is required") @Size(max = 100) String name,
    @NotBlank(message = "Email is required") @Email(message = "Email must be valid") @Size(max = 254) String email,
    @NotBlank(message = "Phone is required") @Pattern(regexp = "\\+?[0-9]{7,15}", message = "Phone must contain 7 to 15 digits with an optional leading +") String phone,
    @NotNull(message = "Age is required") @Min(value = 0, message = "Age must be at least 0") @Max(value = 150, message = "Age must be at most 150") Integer age,
    @NotNull(message = "Gender is required") Gender gender
) {
}
