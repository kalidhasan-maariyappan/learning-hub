package com.example.patientmanagement;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Used only when the WAR is deployed to an external servlet container (e.g. standalone Tomcat 11).
 * With mvn spring-boot:run or java -jar, the embedded Tomcat is used instead.
 */
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(PatientManagementApplication.class);
    }
}
