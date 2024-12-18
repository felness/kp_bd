package org.spring_boot.cp.bd.project.infrastructure.structure.validation.exeptions.business;

public enum BusinessExceptionCode {
    USER_NOT_FOUND("Пользователь не найден"),
    USER_ALREADY_EXIST("Пользователь уже существует"),
    ROLE_NOT_FOUND("Роль не найдена"),
    BOOKING_ERROR("Ошибка при аренды автомобиля"),
    ;


     final String value;

    BusinessExceptionCode(String value) {
        this.value = value;
    }
}
