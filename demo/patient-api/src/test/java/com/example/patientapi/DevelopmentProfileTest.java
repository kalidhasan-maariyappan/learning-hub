package com.example.patientapi;

import com.example.patientapi.config.DevelopmentAdminBootstrap;
import com.example.patientapi.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:devtest;DB_CLOSE_DELAY=-1",
    "app.bootstrap.admin-email=admin@example.com",
    "app.bootstrap.admin-password=TestAdmin@12345"
})
@AutoConfigureMockMvc
@ActiveProfiles({"test", "dev"})
class DevelopmentProfileTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private DevelopmentAdminBootstrap bootstrap;
    @Autowired
    private UserRepository users;

    @Test
    void swaggerUiAndOpenApiArePublicInDev() throws Exception {
        mvc.perform(get("/swagger-ui.html")).andExpect(status().is3xxRedirection());
        mvc.perform(get("/swagger-ui/index.html")).andExpect(status().isOk());
        mvc.perform(get("/v3/api-docs")).andExpect(status().isOk())
            .andExpect(jsonPath("$.info.title").value("Patient Management API"))
            .andExpect(jsonPath("$.components.securitySchemes.bearerAuth.scheme").value("bearer"))
            .andExpect(jsonPath("$.paths['/api/v1/patients']").exists());
        mvc.perform(get("/api/v1/patients")).andExpect(status().isUnauthorized());
    }

    @Test
    void bootstrapIsIdempotent() {
        long count = users.count();
        bootstrap.run();
        bootstrap.run();
        assertThat(users.count()).isEqualTo(count);
        assertThat(users.findByEmail("admin@example.com").orElseThrow().getRole().name()).isEqualTo("ADMIN");
    }
}
