package com.example.patientmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.patientmanagement.entity.Patient;
import com.example.patientmanagement.enums.PatientStatus;

/**
 * Spring Data generates the implementation at startup.
 * Inherited: save, findById, findAll(Pageable), count, ...
 * Derived queries below are parsed from the method name into JPQL.
 * Search queries (name/code/email/phone) are added in Phase 5.
 */
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByPatientCode(String patientCode);

    boolean existsByPatientCode(String patientCode);

    long countByStatus(PatientStatus status);
}
