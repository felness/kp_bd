package org.spring_boot.cp.bd.project.services.redis.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

@Data
public class RefreshToken implements Serializable {
    private String token;
    private String username;
    private Instant expiryDate;
}