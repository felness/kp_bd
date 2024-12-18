package org.spring_boot.cp.bd.project.services.auth;


import lombok.RequiredArgsConstructor;
import org.spring_boot.cp.bd.project.config.provider.JwtTokenProvider;
import org.spring_boot.cp.bd.project.controller.auth.authEntity.AuthCredentials;
import org.spring_boot.cp.bd.project.controller.auth.authEntity.JwtTokenResponse;
import org.spring_boot.cp.bd.project.controller.auth.authEntity.SIgnUpCredential;
import org.spring_boot.cp.bd.project.entity.customer.Customer;
import org.spring_boot.cp.bd.project.entity.user.Role;
import org.spring_boot.cp.bd.project.entity.user.User;
import org.spring_boot.cp.bd.project.infrastructure.aspects.Log;
import org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.business.BusinessException;
import org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.business.BusinessExceptionCode;
import org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.validation.ValidationException;
import org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.validation.ValidationExceptionCode;
import org.spring_boot.cp.bd.project.repository.customer.CustomerRepository;
import org.spring_boot.cp.bd.project.repository.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.Console;

@Service
@RequiredArgsConstructor
@Log
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final CustomerRepository customerRepository;

    public JwtTokenResponse register(SIgnUpCredential sIgnUpCredential) {
        if (userRepository.findByUsername(sIgnUpCredential.username()).isPresent()) {
            throw new BusinessException(BusinessExceptionCode.USER_ALREADY_EXIST);
        }

      Integer id =  userRepository.save(
                User.builder()
                        .name(sIgnUpCredential.username())
                        .passwordHash(passwordEncoder.encode(sIgnUpCredential.password()))
                        .role(sIgnUpCredential.role())
                        .build()
        );


        if(sIgnUpCredential.role().equals(Role.USER)) {

            customerRepository.save(new Customer(id, sIgnUpCredential.email()));
        }

        String token = jwtTokenProvider.generateToken(sIgnUpCredential.username());

        return new JwtTokenResponse(token);


    }

    public JwtTokenResponse auth(AuthCredentials authCredentials) {
        User user = userRepository.findByUsername(authCredentials.username())
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.USER_NOT_FOUND));


        if (!passwordEncoder.matches(authCredentials.password(), user.getPassword())) {
            throw new ValidationException(ValidationExceptionCode.ACCESS_DENIED);
        }

        String token = jwtTokenProvider.generateToken(user.getUsername());

        return new JwtTokenResponse(token);
    }

}
