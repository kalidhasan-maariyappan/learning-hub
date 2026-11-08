package com.example.patientapi.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class OpenApiConfig {
    @Bean
    public OpenAPI patientOpenApi() {
        return new OpenAPI().info(new Info().title("Patient Management API").version("1.0.0")
            .description("Learning REST API with registration, JWT authentication and patient management. Register, log in, then enter the access token in Authorize. Clients log out by discarding tokens; issued tokens remain valid until expiration."))
            .components(new Components().addSecuritySchemes("bearerAuth", new SecurityScheme()
                .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}
