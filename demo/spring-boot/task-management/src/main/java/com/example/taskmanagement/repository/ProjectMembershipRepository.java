package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, Long> {
  Optional<ProjectMembership> findByProjectIdAndUserId(Long projectId, Long userId);

  boolean existsByProjectIdAndUserId(Long projectId, Long userId);

  List<ProjectMembership> findByProjectId(Long projectId);
}
