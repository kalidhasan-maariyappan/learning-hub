package com.example.patientapi.patient;


import com.example.patientapi.error.DuplicateEmailException;
import com.example.patientapi.error.ResourceNotFoundException;
import java.util.Locale;
import java.util.Set;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatientService {
    private static final Set<String> SORT_FIELDS = Set.of("id", "name", "email", "phone", "age", "gender");
    private final PatientRepository patients;

    public PatientService(PatientRepository patients) {
        this.patients = patients;
    }

    @Transactional
    public PatientResponse create(PatientRequest request) {
        String email = normalizeEmail(request.email());
        if (patients.existsByEmail(email)) {
            throw new DuplicateEmailException("Patient email is already in use");
        }
        return PatientResponse.from(patients.saveAndFlush(new Patient(request.name().strip(), email, request.phone(), request.age(), request.gender())));
    }

    @Transactional(readOnly = true)
    public PageResponse<PatientResponse> list(String search, int page, int size, String sort) {
        String[] parts = sort.split(",", -1);
        if (page < 0 || size < 1 || size > 100 || parts.length != 2 || !SORT_FIELDS.contains(parts[0])
            || !(parts[1].equalsIgnoreCase("asc") || parts[1].equalsIgnoreCase("desc"))) {
            throw new IllegalArgumentException("Invalid pagination or sorting parameters");
        }
        Sort ordering = Sort.by(Sort.Direction.fromString(parts[1]), parts[0]);
        if (!parts[0].equals("id")) {
            ordering = ordering.and(Sort.by("id"));
        }
        PageRequest pageable = PageRequest.of(page, size, ordering);
        return PageResponse.from(patients.findByNameContainingIgnoreCase(search.strip(), pageable).map(PatientResponse::from));
    }

    @Transactional(readOnly = true)
    public PatientResponse get(Long id) {
        return PatientResponse.from(find(id));
    }

    @Transactional
    public PatientResponse update(Long id, PatientRequest request) {
        Patient patient = find(id);
        String email = normalizeEmail(request.email());
        if (patients.existsByEmailAndIdNot(email, id)) {
            throw new DuplicateEmailException("Patient email is already in use");
        }
        patient.update(request.name().strip(), email, request.phone(), request.age(), request.gender());
        return PatientResponse.from(patients.saveAndFlush(patient));
    }

    @Transactional
    public void delete(Long id) {
        patients.delete(find(id));
    }

    private Patient find(Long id) {
        return patients.findById(id).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }

    private String normalizeEmail(String email) {
        return email.strip().toLowerCase(Locale.ROOT);
    }
}
