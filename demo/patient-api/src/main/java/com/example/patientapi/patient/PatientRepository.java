package com.example.patientapi.patient;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Page<Patient> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);
}
