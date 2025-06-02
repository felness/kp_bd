package org.spring_boot.cp.bd.project.controller.auth.authEntity;

import lombok.Data;

@Data
public class AuthToken {
    private String accessToken;
    private String refreshToken;

    public AuthToken(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
