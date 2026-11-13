package com.codesnippet.course.lesson60.repository;

import com.codesnippet.course.lesson60.entity.StoredUser;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<StoredUser,Long> {}
