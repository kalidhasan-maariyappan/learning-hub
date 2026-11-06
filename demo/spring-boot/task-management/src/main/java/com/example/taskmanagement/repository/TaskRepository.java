package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.*;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
  List<Task> findByProjectIdAndAssigneeId(Long projectId, Long assigneeId);

  List<Task> findByDueDateBeforeAndStatusNot(LocalDate date, TaskStatus status);
}
