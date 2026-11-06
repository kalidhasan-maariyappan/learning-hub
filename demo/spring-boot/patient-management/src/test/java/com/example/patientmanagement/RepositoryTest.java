package com.example.patientmanagement;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;
import org.springframework.dao.DataIntegrityViolationException;

import com.example.patientmanagement.entity.AppUser;
import com.example.patientmanagement.entity.Appointment;
import com.example.patientmanagement.entity.Patient;
import com.example.patientmanagement.enums.AppointmentStatus;
import com.example.patientmanagement.enums.PatientStatus;
import com.example.patientmanagement.enums.Role;
import com.example.patientmanagement.repository.AppUserRepository;
import com.example.patientmanagement.repository.AppointmentRepository;
import com.example.patientmanagement.repository.PatientRepository;

/**
 * @DataJpaTest starts only JPA (entities, repositories, an in-memory H2) and rolls back
 * after each test, so the ./data file database is never touched.
 */
@DataJpaTest
class RepositoryTest {

    @Autowired
    private PatientRepository patients;

    @Autowired
    private AppointmentRepository appointments;

    @Autowired
    private AppUserRepository users;

    @Autowired
    private TestEntityManager em;

    private Patient newPatient(String code) {
        Patient p = new Patient();
        p.setPatientCode(code);
        p.setFirstName("Test");
        p.setLastName("Patient");
        p.setDateOfBirth(LocalDate.of(1990, 5, 17));
        p.setPhone("+15550100");
        return p;
    }

    @Test
    void savesAndReadsPatientWithDefaults() {
        Patient saved = patients.save(newPatient("P-0001"));
        em.flush();
        em.clear(); // force the next read to hit the database

        Patient loaded = patients.findByPatientCode("P-0001").orElseThrow();
        assertThat(loaded.getId()).isEqualTo(saved.getId());
        assertThat(loaded.getStatus()).isEqualTo(PatientStatus.ACTIVE);
        assertThat(loaded.getCreatedAt()).isNotNull();
        assertThat(loaded.getUpdatedAt()).isNotNull();
        assertThat(patients.countByStatus(PatientStatus.ACTIVE)).isEqualTo(1);
    }

    @Test
    void patientCodeIsUnique() {
        patients.saveAndFlush(newPatient("P-0002"));
        assertThatThrownBy(() -> patients.saveAndFlush(newPatient("P-0002")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void appointmentsLinkToPatient() {
        Patient patient = patients.save(newPatient("P-0003"));

        Appointment later = new Appointment();
        later.setAppointmentAt(LocalDateTime.now().plusDays(7));
        later.setReason("Follow-up");
        patient.addAppointment(later);

        Appointment sooner = new Appointment();
        sooner.setAppointmentAt(LocalDateTime.now().plusDays(1));
        patient.addAppointment(sooner);

        appointments.save(later);
        appointments.save(sooner);
        em.flush();
        em.clear();

        var list = appointments.findByPatientIdOrderByAppointmentAtAsc(patient.getId());
        assertThat(list).hasSize(2);
        assertThat(list.get(0).getAppointmentAt()).isBefore(list.get(1).getAppointmentAt());
        assertThat(list).allMatch(a -> a.getStatus() == AppointmentStatus.SCHEDULED);
        assertThat(appointments.countByStatusAndAppointmentAtAfter(
                AppointmentStatus.SCHEDULED, LocalDateTime.now())).isEqualTo(2);

        // Navigate the other way: patient -> appointments (lazy, inside the test transaction)
        Patient reloaded = patients.findById(patient.getId()).orElseThrow();
        assertThat(reloaded.getAppointments()).hasSize(2);
    }

    @Test
    void savesAndFindsUser() {
        users.save(new AppUser("demo", "{bcrypt}not-a-real-hash", Role.STAFF));
        em.flush();
        em.clear();

        AppUser loaded = users.findByUsername("demo").orElseThrow();
        assertThat(loaded.getRole()).isEqualTo(Role.STAFF);
        assertThat(loaded.isEnabled()).isTrue();
        assertThat(users.existsByUsername("nobody")).isFalse();
    }
}
