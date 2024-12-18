package org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.validation;

public enum ValidationExceptionCode {
    ACCESS_DENIED("Доступ запрещен"),
    ;
    final String value;

    ValidationExceptionCode(String value) {
        this.value = value;
    }
}
