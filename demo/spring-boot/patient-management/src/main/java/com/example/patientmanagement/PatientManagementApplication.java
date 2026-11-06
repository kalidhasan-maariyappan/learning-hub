package com.example.patientmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point. @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan.
 * Component scanning starts at this package, so every class under
 * com.example.patientmanagement.* (config, controller, service, ...) is discovered automatically.
 */
@SpringBootApplication
public class PatientManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(PatientManagementApplication.class, args);
    }
}
