package com.example.patientmanagement;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.unauthenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

/** Full application context + MockMvc through the real Spring Security filter chain. */
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = "spring.datasource.url=jdbc:h2:mem:securitytest")
class SecurityConfigTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void guestIsRedirectedToLoginForDashboard() throws Exception {
        mvc.perform(get("/dashboard"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/login"));
    }

    @Test
    void guestIsRedirectedToLoginForPatients() throws Exception {
        mvc.perform(get("/patients"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/login"));
    }

    @Test
    void loginPageIsPublic() throws Exception {
        mvc.perform(get("/login"))
                .andExpect(status().isOk())
                .andExpect(view().name("login"));
    }

    @Test
    void seededAdminCanLogIn() throws Exception {
        mvc.perform(formLogin("/login").user("admin").password("Admin@12345"))
                .andExpect(redirectedUrl("/dashboard"))
                .andExpect(authenticated().withRoles("ADMIN"));
    }

    @Test
    void seededStaffCanLogIn() throws Exception {
        mvc.perform(formLogin("/login").user("staff").password("Staff@12345"))
                .andExpect(redirectedUrl("/dashboard"))
                .andExpect(authenticated().withRoles("STAFF"));
    }

    @Test
    void wrongPasswordGivesGenericError() throws Exception {
        mvc.perform(formLogin("/login").user("admin").password("wrong"))
                .andExpect(redirectedUrl("/login?error"))
                .andExpect(unauthenticated());
    }

    @Test
    void unknownUserGivesSameGenericError() throws Exception {
        mvc.perform(formLogin("/login").user("nobody").password("whatever"))
                .andExpect(redirectedUrl("/login?error"))
                .andExpect(unauthenticated());
    }

    @Test
    void staffCanOpenDashboard() throws Exception {
        mvc.perform(get("/dashboard").with(user("staff").roles("STAFF")))
                .andExpect(status().isOk())
                .andExpect(view().name("dashboard"));
    }

    @Test
    void protectedPagesAreNotCacheable() throws Exception {
        mvc.perform(get("/dashboard").with(user("staff").roles("STAFF")))
                .andExpect(header().string("Cache-Control", containsString("no-store")))
                .andExpect(header().string("Pragma", "no-cache"));
    }

    @Test
    void staffCannotArchivePatient() throws Exception {
        mvc.perform(post("/patients/1/archive").with(csrf()).with(user("staff").roles("STAFF")))
                .andExpect(status().isForbidden())
                .andExpect(forwardedUrl("/access-denied"));
    }

    @Test
    void adminPassesArchiveAuthorization() throws Exception {
        // No archive handler exists until Phase 4, so 404 proves security let the request through.
        mvc.perform(post("/patients/1/archive").with(csrf()).with(user("admin").roles("ADMIN")))
                .andExpect(status().isNotFound());
    }

    @Test
    void postWithInvalidCsrfTokenIsForbidden() throws Exception {
        mvc.perform(post("/patients/1/archive").with(csrf().useInvalidToken()).with(user("admin").roles("ADMIN")))
                .andExpect(status().isForbidden())
                .andExpect(forwardedUrl("/access-denied"));
    }

    @Test
    void postWithMissingCsrfTokenIsNotProcessed() throws Exception {
        // No token stored for this session: Spring Security treats it like an expired session
        // and redirects to the login page. The archive request never reaches a controller.
        MockHttpSession session = loginAs("admin", "Admin@12345");
        mvc.perform(post("/patients/1/archive").session(session))
                .andExpect(redirectedUrl("/login?expired"));
    }

    private MockHttpSession loginAs(String username, String password) throws Exception {
        return (MockHttpSession) mvc.perform(formLogin("/login").user(username).password(password))
                .andExpect(authenticated())
                .andReturn().getRequest().getSession(false);
    }

    @Test
    void logoutInvalidatesSessionAndBlocksDashboard() throws Exception {
        // Real login -> real session
        MockHttpSession session = loginAs("staff", "Staff@12345");

        mvc.perform(get("/dashboard").session(session)).andExpect(status().isOk());

        mvc.perform(post("/logout").with(csrf()).session(session))
                .andExpect(redirectedUrl("/login?logout"))
                .andExpect(unauthenticated());

        assertThat(session.isInvalid()).isTrue();
        mvc.perform(get("/dashboard"))
                .andExpect(redirectedUrl("/login"));
    }

    @Test
    void logoutWithGetIsNotAllowed() throws Exception {
        // With CSRF enabled, logout only works as POST with a token.
        mvc.perform(get("/logout").with(user("staff").roles("STAFF")))
                .andExpect(status().isNotFound());
    }
}
