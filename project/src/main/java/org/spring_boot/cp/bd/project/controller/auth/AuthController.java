package org.spring_boot.cp.bd.project.controller.auth;

import org.spring_boot.cp.bd.project.controller.auth.authEntity.*;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.services.auth.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Log
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public AuthToken auth(@RequestBody AuthCredentials authCredentials) {
        return authService.auth(authCredentials);
    }

    @PostMapping("/sign-up")
    public AuthToken register(@RequestBody SIgnUpCredential sIgnUpCredential) {
        return authService.register(sIgnUpCredential);
    }

    @PostMapping("/refresh")
    public AuthToken refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refresh(refreshTokenRequest);
    }


}
