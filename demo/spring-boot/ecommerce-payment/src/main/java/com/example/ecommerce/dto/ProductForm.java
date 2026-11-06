package com.example.ecommerce.dto;

import jakarta.validation.constraints.*;

public record ProductForm(Long id, @NotBlank @Size(max = 50) String sku, @NotBlank @Size(max = 150) String title, @NotBlank @Size(max = 3000) String description, @NotBlank @Size(max = 50) String category, @NotBlank String price, @Min(0) @Max(100000) int stock, boolean active, @Pattern(regexp = "lamp|chair|vase|bag|headphones|clock") String art) {
}
