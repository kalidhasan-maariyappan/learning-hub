package com.example.patientapi;

import com.example.patientapi.config.SecurityErrorHandler;
import com.example.patientapi.error.GlobalExceptionHandler;
import java.sql.SQLException;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class DatabaseErrorHandlingTest {
    private final GlobalExceptionHandler handler = new GlobalExceptionHandler(mock(SecurityErrorHandler.class));
    private final MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/v1/auth/register");

    @Test
    void uniqueConstraintViolationIsAConflict() {
        var response = handler.conflict(new DataIntegrityViolationException("insert failed",
            new SQLException("duplicate key", "23505")), request);
        assertThat(response.getStatusCode().value()).isEqualTo(409);
    }

    @Test
    void otherIntegrityFailuresAreNotReportedAsDuplicateRecords() {
        for (String state : new String[] {"23502", "23513", "22001"}) {
            var response = handler.conflict(new DataIntegrityViolationException("insert failed",
                new SQLException("database constraint failed", state)), request);
            assertThat(response.getStatusCode().value()).isEqualTo(500);
            assertThat(response.getBody().message()).isEqualTo("An unexpected database error occurred");
        }
    }
}
