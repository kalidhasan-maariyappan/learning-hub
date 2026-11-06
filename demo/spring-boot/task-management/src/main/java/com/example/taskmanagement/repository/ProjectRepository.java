package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  @Query(
      "select p from Project p where p.owner.id=:userId or exists (select m.id from"
          + " ProjectMembership m where m.project=p and m.user.id=:userId)")
  List<Project> accessible(@Param("userId") Long userId);
}
