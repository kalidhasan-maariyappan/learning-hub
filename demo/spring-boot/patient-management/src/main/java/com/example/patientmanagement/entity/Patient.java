package com.example.patientmanagement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.patientmanagement.enums.PatientStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/**
 * A patient record (synthetic demo data only).
 * No toString() override on purpose: patient details must never end up in logs.
 */
@Entity
@Table(name = "patients", indexes = {
        @Index(name = "idx_patients_last_name", columnList = "last_name"),
        @Index(name = "idx_patients_status", columnList = "status")
})
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_code", nullable = false, unique = true, length = 20)
    private String patientCode;

    @Column(name = "first_name", nullable = false, length = 80)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 80)
    private String lastName;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(length = 20)
    private String gender;

    @Column(length = 120)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PatientStatus status = PatientStatus.ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Inverse side of the relationship: the foreign key lives in appointments.patient_id.
     * No cascade REMOVE / orphanRemoval: appointments are never deleted with a patient.
     */
    @OneToMany(mappedBy = "patient")
    @OrderBy("appointmentAt ASC")
    private List<Appointment> appointments = new ArrayList<>();

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (status == null) {
            status = PatientStatus.ACTIVE;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /** Keeps both sides of the bidirectional relationship in sync. */
    public void addAppointment(Appointment appointment) {
        appointments.add(appointment);
        appointment.setPatient(this);
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public Long getId() {
        return id;
    }

    public String getPatientCode() {
        return patientCode;
    }

    public void setPatientCode(String patientCode) {
        this.patientCode = patientCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public PatientStatus getStatus() {
        return status;
    }

    public void setStatus(PatientStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }
}
