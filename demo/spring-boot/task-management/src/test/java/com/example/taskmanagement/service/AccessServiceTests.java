package com.example.taskmanagement.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class AccessServiceTests {
  final UserRepository users = mock(UserRepository.class);
  final ProjectRepository projects = mock(ProjectRepository.class);
  final ProjectMembershipRepository memberships = mock(ProjectMembershipRepository.class);
  final AccessService access = new AccessService(users, projects, memberships);

  User user(long id, Role role) {
    User u = new User();
    u.id = id;
    u.role = role;
    return u;
  }

  Project project() {
    Project p = new Project();
    p.id = 1L;
    p.owner = user(1L, Role.USER);
    return p;
  }

  @Test
  void globalManagerRoleDoesNotGrantProjectAccess() {
    assertThat(access.manages(project(), user(2L, Role.MANAGER))).isFalse();
  }

  @Test
  void managerNeedsDelegationAndGlobalRole() {
    Project p = project();
    User u = user(2L, Role.MANAGER);
    ProjectMembership m = new ProjectMembership();
    m.membershipRole = MembershipRole.MANAGER;
    when(memberships.findByProjectIdAndUserId(1L, 2L)).thenReturn(Optional.of(m));
    assertThat(access.manages(p, u)).isTrue();
    u.role = Role.USER;
    assertThat(access.manages(p, u)).isFalse();
  }

  @Test
  void adminCannotBeAssignedWithoutMembership() {
    assertThatThrownBy(() -> access.assignee(project(), user(2L, Role.ADMIN)))
        .isInstanceOf(ApiException.class);
  }

  @Test
  void completedTaskMustBeReopenedBeforeWorkContinues() {
    assertThat(TaskService.transitions(TaskStatus.DONE)).containsExactly(TaskStatus.TODO);
    assertThat(TaskService.transitions(TaskStatus.TODO)).doesNotContain(TaskStatus.DONE);
  }
}
