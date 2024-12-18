package org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.business;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private final BusinessExceptionCode code;

    public BusinessException(BusinessExceptionCode code) {
        this.code = code;
    }
}
