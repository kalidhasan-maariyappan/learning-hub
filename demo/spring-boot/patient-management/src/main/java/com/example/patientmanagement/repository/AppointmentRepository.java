package com.example.patientmanagement.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.patientmanagement.entity.Appointment;
import com.example.patientmanagement.enums.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /** All appointments of one patient, oldest first. */
    List<Appointment> findByPatientIdOrderByAppointmentAtAsc(Long patientId);

    /** Number of appointments with a given status after a point in time (e.g. upcoming SCHEDULED). */
    long countByStatusAndAppointmentAtAfter(AppointmentStatus status, LocalDateTime after);
}
