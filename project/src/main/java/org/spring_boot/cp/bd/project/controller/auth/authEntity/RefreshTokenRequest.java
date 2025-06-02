package org.spring_boot.cp.bd.project.controller.auth.authEntity;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}
