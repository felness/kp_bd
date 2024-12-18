package org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.invocation;

import lombok.Getter;

@Getter
public class InvocationException extends RuntimeException {

    private final InvocationExceptionCode code;

    public InvocationException(InvocationExceptionCode code) {
        this.code = code;
    }
}
