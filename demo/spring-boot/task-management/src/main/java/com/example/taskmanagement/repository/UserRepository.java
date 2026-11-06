package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);
}
