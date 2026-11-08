package com.example.patientapi.patient;


public record PatientResponse(Long id, String name, String email, String phone, Integer age, Gender gender) {
    public static PatientResponse from(Patient patient) {
        return new PatientResponse(patient.getId(), patient.getName(), patient.getEmail(), patient.getPhone(), patient.getAge(), patient.getGender());
    }
}
