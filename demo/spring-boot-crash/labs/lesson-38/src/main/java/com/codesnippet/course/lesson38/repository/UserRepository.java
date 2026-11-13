package com.codesnippet.course.lesson38.repository;

import com.codesnippet.course.lesson38.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserRepository extends JpaRepository<AppUser,Long> { Optional<AppUser> findByUsername(String username); }
