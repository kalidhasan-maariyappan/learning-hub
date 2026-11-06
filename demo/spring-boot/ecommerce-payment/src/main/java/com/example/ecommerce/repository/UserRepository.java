package com.example.ecommerce.repository;

import com.example.ecommerce.entity.User;
import java.util.*;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select u from User u where u.id=:id")
    Optional<User> lockById(@Param("id") Long id);
}
