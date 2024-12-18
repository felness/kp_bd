package org.spring_boot.cp.bd.project.entity.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Table("users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class User implements UserDetails {

    @Id
    private int user_id;

   private String name;

   private String passwordHash;

   private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return name;
    }

    public User(String name, String passwordHash, Role role) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public static User createNew(int id, String name, String passwordHash, Role role) {
        return User.builder()
                .user_id(id)
                .name(name)
                .passwordHash(passwordHash)
                .role(role)
                .build();
    }


}
