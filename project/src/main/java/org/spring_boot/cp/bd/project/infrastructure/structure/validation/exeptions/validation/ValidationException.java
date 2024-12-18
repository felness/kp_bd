package org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.validation;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {
    private final ValidationExceptionCode code;

    public ValidationException(ValidationExceptionCode code) {
        this.code = code;
    }
}
