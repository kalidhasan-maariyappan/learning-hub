package com.example.patientapi.auth;

public record TokenResponse(String accessToken, String tokenType, long expiresIn) {
}
