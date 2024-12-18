package org.spring_boot.cp.bd.project.entity.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum Role implements GrantedAuthority {
    USER("user"),
    ADMIN("admin"),
    REDACTOR("redactor");

    String role;


    @Override
    public String getAuthority() {
        return role;
    }
}
