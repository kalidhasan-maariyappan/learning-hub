package com.example.patientapi;

import com.example.patientapi.config.DevelopmentAdminBootstrap;
import com.example.patientapi.user.*;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DevelopmentAdminBootstrapTest {
    @Mock
    private UserRepository users;
    @Mock
    private PasswordEncoder passwords;

    @Test
    void bootstrapNeverPromotesExistingUser() {
        when(users.findByEmail("user@example.com")).thenReturn(Optional.of(new AppUser("User", "user@example.com", "hash", Role.USER)));
        DevelopmentAdminBootstrap bootstrap = new DevelopmentAdminBootstrap(users, passwords, "user@example.com", "StrongAdmin@123", "Admin");
        assertThatThrownBy(bootstrap::run).isInstanceOf(IllegalStateException.class).hasMessageContaining("never promoted");
        verify(users, never()).saveAndFlush(any());
        verifyNoInteractions(passwords);
    }

    @Test
    void bootstrapDoesNothingWithoutCredentials() {
        new DevelopmentAdminBootstrap(users, passwords, "", "", "Admin").run();
        verifyNoInteractions(users, passwords);
    }

    @Test
    void bootstrapRejectsIncompleteCredentials() {
        assertThatThrownBy(() -> new DevelopmentAdminBootstrap(users, passwords, "admin@example.com", "", "Admin").run())
            .isInstanceOf(IllegalStateException.class);
        verifyNoInteractions(users, passwords);
    }
}
