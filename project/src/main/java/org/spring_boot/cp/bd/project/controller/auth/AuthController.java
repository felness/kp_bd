package org.spring_boot.cp.bd.project.controller.auth;

import org.spring_boot.cp.bd.project.controller.auth.authEntity.AuthCredentials;
import org.spring_boot.cp.bd.project.controller.auth.authEntity.JwtTokenResponse;
import org.spring_boot.cp.bd.project.controller.auth.authEntity.SIgnUpCredential;
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
    public JwtTokenResponse auth(@RequestBody AuthCredentials authCredentials) {
        return authService.auth(authCredentials);
    }

    @PostMapping("/sign-up")
    public JwtTokenResponse resister (@RequestBody SIgnUpCredential sIgnUpCredential) {
        return authService.register(sIgnUpCredential);
    }


}
