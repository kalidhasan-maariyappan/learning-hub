package com.example.patientmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/** Verifies the Spring context starts. Uses in-memory H2 so tests never touch ./data. */
@SpringBootTest
@TestPropertySource(properties = "spring.datasource.url=jdbc:h2:mem:testdb")
class PatientManagementApplicationTests {

    @Test
    void contextLoads() {
    }
}
