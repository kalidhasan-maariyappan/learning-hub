package com.example.patientapi;

import com.example.patientapi.user.*;
import com.example.patientapi.patient.PatientRepository;
import java.time.Instant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PatientApiIntegrationTest {
    private static final String REGISTER = """
        {"name":"John","email":"john@example.com","password":"Password@123"}
        """;
    private static final String LOGIN = """
        {"email":"john@example.com","password":"Password@123"}
        """;
    private static final String PATIENT = """
        {"name":"David","email":"david@example.com","phone":"9876543210","age":30,"gender":"MALE"}
        """;

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private UserRepository users;
    @Autowired
    private PatientRepository patients;
    @Autowired
    private PasswordEncoder passwords;
    @Autowired
    private JwtEncoder encoder;
    @Autowired
    private JwtDecoder decoder;

    @BeforeEach
    void clearDatabase() {
        patients.deleteAll();
        users.deleteAll();
    }

    @Test
    void registrationCreatesUserAndHashesPassword() throws Exception {
        mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).content(REGISTER))
            .andExpect(status().isCreated()).andExpect(jsonPath("$.role").value("USER"))
            .andExpect(jsonPath("$.password").doesNotExist()).andExpect(header().string("Location", "/api/v1/users/me"));
        AppUser user = users.findByEmail("john@example.com").orElseThrow();
        assertThat(user.getPassword()).isNotEqualTo("Password@123");
        assertThat(passwords.matches("Password@123", user.getPassword())).isTrue();
    }

    @Test
    void duplicateEmailIsCaseInsensitive() throws Exception {
        register();
        mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
            .content(REGISTER.replace("john@example.com", "JOHN@example.com")))
            .andExpect(status().isConflict()).andExpect(jsonPath("$.status").value(409))
            .andExpect(jsonPath("$.message").value("Email is already registered"))
            .andExpect(jsonPath("$.fieldErrors.email").value("Email is already registered"));
    }

    @Test
    void registrationCannotChooseRole() throws Exception {
        mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
            .content(REGISTER.replace("\"name\":", "\"role\":\"ADMIN\",\"name\":")))
            .andExpect(status().isBadRequest());
        assertThat(users.count()).isZero();
    }

    @Test
    void loginReturnsSignedTokenWithUserIdIssuerRoleAndExpiration() throws Exception {
        String token = userToken();
        Jwt jwt = decoder.decode(token);
        assertThat(jwt.getSubject()).isEqualTo(users.findByEmail("john@example.com").orElseThrow().getId().toString());
        assertThat(jwt.getClaimAsString("role")).isEqualTo("USER");
        assertThat(jwt.getClaimAsString("iss")).isEqualTo("patient-api-test");
        assertThat(jwt.getExpiresAt().getEpochSecond() - jwt.getIssuedAt().getEpochSecond()).isEqualTo(900);
        mvc.perform(get("/api/v1/users/me").header("Authorization", "Bearer " + token))
            .andExpect(status().isOk()).andExpect(jsonPath("$.email").value("john@example.com"))
            .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void invalidCredentialsReturn401() throws Exception {
        register();
        mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(LOGIN.replace("Password@123", "Wrong@Password1")))
            .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.status").value(401));
        mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(LOGIN.replace("john@example.com", "missing@example.com"))).andExpect(status().isUnauthorized());
    }

    @Test
    void missingAndInvalidTokensReturn401() throws Exception {
        mvc.perform(get("/api/v1/patients")).andExpect(status().isUnauthorized()).andExpect(jsonPath("$.path").value("/api/v1/patients"));
        mvc.perform(get("/api/v1/patients").header("Authorization", "Bearer invalid"))
            .andExpect(status().isUnauthorized()).andExpect(header().string("WWW-Authenticate", "Bearer"));
        String valid = userToken();
        String tampered = valid.substring(0, valid.lastIndexOf('.') + 1) + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
        mvc.perform(get("/api/v1/patients").header("Authorization", "Bearer " + tampered)).andExpect(status().isUnauthorized());
    }

    @Test
    void expiredAndWrongIssuerTokensReturn401() throws Exception {
        mvc.perform(get("/api/v1/patients").header("Authorization", "Bearer " + token("USER", "patient-api-test", Instant.now().minusSeconds(120))))
            .andExpect(status().isUnauthorized());
        mvc.perform(get("/api/v1/patients").header("Authorization", "Bearer " + token("USER", "wrong-issuer", Instant.now().plusSeconds(900))))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void userCanCreateRetrieveAndUpdateButCannotDelete() throws Exception {
        String authorization = "Bearer " + userToken();
        long id = createPatient(authorization, PATIENT);
        mvc.perform(get("/api/v1/patients/" + id).header("Authorization", authorization))
            .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("David"));
        mvc.perform(put("/api/v1/patients/" + id).header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON)
            .content(PATIENT.replace("David", "Daniel").replace("30", "31")))
            .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Daniel")).andExpect(jsonPath("$.age").value(31));
        mvc.perform(delete("/api/v1/patients/" + id).header("Authorization", authorization))
            .andExpect(status().isForbidden()).andExpect(jsonPath("$.status").value(403));
        assertThat(patients.existsById(id)).isTrue();
    }

    @Test
    void adminLoginCanAccessAndDeletePatients() throws Exception {
        users.saveAndFlush(new AppUser("Admin", "admin@example.com", passwords.encode("Password@123"), Role.ADMIN));
        String body = mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(LOGIN.replace("john@example.com", "admin@example.com"))).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        String authorization = "Bearer " + mapper.readTree(body).get("accessToken").asString();
        long id = createPatient(authorization, PATIENT);
        mvc.perform(get("/api/v1/patients").header("Authorization", authorization)).andExpect(status().isOk());
        mvc.perform(delete("/api/v1/patients/" + id).header("Authorization", authorization)).andExpect(status().isNoContent()).andExpect(content().string(""));
        assertThat(patients.existsById(id)).isFalse();
        mvc.perform(delete("/api/v1/patients/" + id).header("Authorization", authorization)).andExpect(status().isNotFound());
    }

    @Test
    void missingPatientsReturn404() throws Exception {
        String authorization = "Bearer " + userToken();
        mvc.perform(get("/api/v1/patients/99999").header("Authorization", authorization)).andExpect(status().isNotFound());
        mvc.perform(put("/api/v1/patients/99999").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(PATIENT))
            .andExpect(status().isNotFound());
    }

    @Test
    void validatesRequestsAndMalformedJson() throws Exception {
        mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).content("{}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.fieldErrors.name").value("Name is required"));
        mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content("{}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.fieldErrors.email").exists());
        String authorization = "Bearer " + userToken();
        mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content("{}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.fieldErrors.name").value("Name is required"))
            .andExpect(jsonPath("$.fieldErrors.age").exists()).andExpect(jsonPath("$.fieldErrors.gender").exists());
        mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON)
            .content(PATIENT.replace("30", "151").replace("9876543210", "bad").replace("david@example.com", "invalid")))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.fieldErrors.age").exists())
            .andExpect(jsonPath("$.fieldErrors.phone").exists()).andExpect(jsonPath("$.fieldErrors.email").exists());
        mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content("{"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.message").value("Malformed JSON or invalid field value"));
        mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(PATIENT.replace("MALE", "INVALID")))
            .andExpect(status().isBadRequest());
        mvc.perform(put("/api/v1/patients/1").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content("{}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void paginatesSortsAndSearchesCaseInsensitively() throws Exception {
        String authorization = "Bearer " + userToken();
        createPatient(authorization, PATIENT);
        createPatient(authorization, PATIENT.replace("David", "Alice").replace("david@example.com", "alice@example.com"));
        mvc.perform(get("/api/v1/patients").header("Authorization", authorization))
            .andExpect(status().isOk()).andExpect(jsonPath("$.size").value(10)).andExpect(jsonPath("$.totalElements").value(2))
            .andExpect(jsonPath("$.content[0].name").value("Alice"));
        mvc.perform(get("/api/v1/patients?page=1&size=1&sort=name,desc").header("Authorization", authorization))
            .andExpect(status().isOk()).andExpect(jsonPath("$.page").value(1)).andExpect(jsonPath("$.totalPages").value(2))
            .andExpect(jsonPath("$.content[0].name").value("Alice"));
        mvc.perform(get("/api/v1/patients?search=DaV&page=0&size=1&sort=name,asc").header("Authorization", authorization))
            .andExpect(status().isOk()).andExpect(jsonPath("$.totalElements").value(1)).andExpect(jsonPath("$.content[0].name").value("David"));
    }

    @Test
    void rejectsInvalidPaginationAndIds() throws Exception {
        String authorization = "Bearer " + userToken();
        for (String query : new String[] {"page=-1", "size=0", "size=101", "page=abc", "sort=password,asc", "sort=name,wrong", "sort=name", "sort=name,asc,extra"}) {
            mvc.perform(get("/api/v1/patients?" + query).header("Authorization", authorization)).andExpect(status().isBadRequest());
        }
        mvc.perform(get("/api/v1/patients/abc").header("Authorization", authorization)).andExpect(status().isBadRequest());
        mvc.perform(get("/api/v1/patients/0").header("Authorization", authorization)).andExpect(status().isBadRequest());
    }

    @Test
    void patientEmailMustBeUnique() throws Exception {
        String authorization = "Bearer " + userToken();
        createPatient(authorization, PATIENT);
        mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(PATIENT))
            .andExpect(status().isConflict());
        long other = createPatient(authorization, PATIENT.replace("david@example.com", "other@example.com"));
        mvc.perform(put("/api/v1/patients/" + other).header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(PATIENT))
            .andExpect(status().isConflict());
    }

    @Test
    void developmentToolsAreBlockedOutsideDevAndCorsUsesExplicitOrigins() throws Exception {
        mvc.perform(get("/v3/api-docs")).andExpect(status().isUnauthorized());
        mvc.perform(get("/h2-console/")).andExpect(status().isUnauthorized());
        mvc.perform(options("/api/v1/patients").header("Origin", "https://untrusted.example").header("Access-Control-Request-Method", "GET"))
            .andExpect(status().isForbidden());
    }

    private void register() throws Exception {
        mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).content(REGISTER)).andExpect(status().isCreated());
    }

    private String userToken() throws Exception {
        register();
        String body = mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(LOGIN))
            .andExpect(status().isOk()).andExpect(jsonPath("$.tokenType").value("Bearer")).andExpect(jsonPath("$.expiresIn").value(900))
            .andReturn().getResponse().getContentAsString();
        return mapper.readTree(body).get("accessToken").asString();
    }

    private long createPatient(String authorization, String body) throws Exception {
        String response = mvc.perform(post("/api/v1/patients").header("Authorization", authorization).contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        return mapper.readTree(response).get("id").longValue();
    }

    private String token(String role, String issuer, Instant expiration) {
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer(issuer).subject("1").issuedAt(Instant.now().minusSeconds(1000))
            .expiresAt(expiration).claim("role", role).build();
        return encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims)).getTokenValue();
    }
}
