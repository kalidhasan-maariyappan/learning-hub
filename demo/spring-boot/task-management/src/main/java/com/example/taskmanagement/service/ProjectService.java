package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.Api.*;
import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {
  private final AccessService access;
  private final ProjectRepository projects;
  private final ProjectMembershipRepository members;
  private final UserRepository users;
  private final TaskRepository tasks;

  public ProjectService(
      AccessService a,
      ProjectRepository p,
      ProjectMembershipRepository m,
      UserRepository u,
      TaskRepository t) {
    access = a;
    projects = p;
    members = m;
    users = u;
    tasks = t;
  }

  public ProjectView create(Long actor, ProjectInput input) {
    User u = access.user(actor);
    Project p = new Project();
    p.name = input.name().trim();
    p.description = input.description();
    p.owner = u;
    projects.save(p);
    ProjectMembership m = new ProjectMembership();
    m.project = p;
    m.user = u;
    m.membershipRole = MembershipRole.MANAGER;
    members.save(m);
    return ProjectView.of(p);
  }

  @Transactional(readOnly = true)
  public List<ProjectView> list(Long actor) {
    User u = access.user(actor);
    return (u.getRole() == Role.ADMIN ? projects.findAll() : projects.accessible(actor))
        .stream().map(ProjectView::of).toList();
  }

  @Transactional(readOnly = true)
  public ProjectView get(Long actor, Long id) {
    return ProjectView.of(access.project(id, access.user(actor)));
  }

  public ProjectView update(Long actor, Long id, ProjectInput input) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    p.name = input.name().trim();
    p.description = input.description();
    return ProjectView.of(p);
  }

  public void addMember(Long actor, Long id, MemberInput input) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    User member =
        users
            .findById(input.userId())
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    if (input.membershipRole() == MembershipRole.MANAGER && member.getRole() == Role.USER)
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "Manager membership requires MANAGER or ADMIN user role");
    var m = members.findByProjectIdAndUserId(id, member.getId()).orElseGet(ProjectMembership::new);
    m.project = p;
    m.user = member;
    m.membershipRole = input.membershipRole();
    members.save(m);
  }

  @Transactional(readOnly = true)
  public List<MemberView> members(Long actor, Long id) {
    access.project(id, access.user(actor));
    return members.findByProjectId(id).stream()
        .map(m -> new MemberView(m.user.getId(), m.user.getName(), m.membershipRole))
        .toList();
  }

  public void removeMember(Long actor, Long id, Long memberId) {
    User u = access.user(actor);
    Project p = access.project(id, u);
    access.manager(p, u);
    if (p.owner.getId().equals(memberId))
      throw new ApiException(HttpStatus.BAD_REQUEST, "Cannot remove project owner");
    var m =
        members
            .findByProjectIdAndUserId(id, memberId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Membership not found"));
    for (var t : tasks.findByProjectIdAndAssigneeId(id, memberId)) {
      t.assignee = null;
    }
    members.delete(m);
  }
}
