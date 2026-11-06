package com.example.patientmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.patientmanagement.entity.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    /** Used by DatabaseUserDetailsService during login (Phase 3). */
    Optional<AppUser> findByUsername(String username);

    boolean existsByUsername(String username);
}
