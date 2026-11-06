package com.example.ecommerce.dto;

import jakarta.validation.constraints.*;

public record AddressForm(@NotBlank @Size(max = 100) String name, @Pattern(regexp = "[6-9][0-9]{9}", message = "Enter a valid 10-digit Indian mobile number") String phone, @NotBlank @Size(max = 300) String street, @NotBlank @Size(max = 100) String city, @NotBlank @Size(max = 100) String state, @Pattern(regexp = "[1-9][0-9]{5}", message = "Enter a valid six-digit PIN code") String pin) {
    public String formatted() {
        return String.join(", ", name, phone, street, city, state, pin);
    }
}
