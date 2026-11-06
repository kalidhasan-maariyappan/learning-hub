package com.example.taskmanagement.service;

import com.example.taskmanagement.entity.*;
import com.example.taskmanagement.exception.ApiException;
import com.example.taskmanagement.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AccessService {
  private final UserRepository users;
  private final ProjectRepository projects;
  private final ProjectMembershipRepository members;

  public AccessService(UserRepository u, ProjectRepository p, ProjectMembershipRepository m) {
    users = u;
    projects = p;
    members = m;
  }

  public User user(Long id) {
    return users
        .findById(id)
        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "User no longer exists"));
  }

  public void admin(User u) {
    require(u.getRole() == Role.ADMIN);
  }

  public Project project(Long id, User u) {
    Project p =
        projects
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Project not found"));
    require(isMember(p, u));
    return p;
  }

  public boolean isMember(Project p, User u) {
    return u.getRole() == Role.ADMIN
        || p.getOwner().getId().equals(u.getId())
        || members.existsByProjectIdAndUserId(p.getId(), u.getId());
  }

  public boolean manages(Project p, User u) {
    return u.getRole() == Role.ADMIN
        || p.getOwner().getId().equals(u.getId())
        || (u.getRole() == Role.MANAGER
            && members
                .findByProjectIdAndUserId(p.getId(), u.getId())
                .map(m -> m.getMembershipRole() == MembershipRole.MANAGER)
                .orElse(false));
  }

  public void manager(Project p, User u) {
    require(manages(p, u));
  }

  public void assignee(Project p, User u) {
    require(
        p.getOwner().getId().equals(u.getId())
            || members.existsByProjectIdAndUserId(p.getId(), u.getId()));
  }

  public static void require(boolean allowed) {
    if (!allowed) throw new ApiException(HttpStatus.FORBIDDEN, "Access denied");
  }
}
