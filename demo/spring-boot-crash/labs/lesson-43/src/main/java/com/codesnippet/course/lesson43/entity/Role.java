package com.codesnippet.course.lesson43.entity;

import java.util.Set;
public enum Role {
    ADMIN(Set.of(Permission.WEATHER_READ,Permission.WEATHER_WRITE,Permission.WEATHER_DELETE)),
    USER(Set.of(Permission.WEATHER_READ));
    private final Set<Permission> permissions;
    Role(Set<Permission> permissions) { this.permissions=permissions; }
    public Set<Permission> getPermissions() { return permissions; }
}
