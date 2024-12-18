package org.spring_boot.cp.bd.project.controller.auth.authEntity;


import org.spring_boot.cp.bd.project.entity.user.Role;

public record SIgnUpCredential(
        String username,
        String email,
        String password,
        Role role
) {
}
