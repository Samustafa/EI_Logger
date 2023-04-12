package de.ude.backend.exceptions.custom_exceptions;

public class RegistrationCodeNotValid extends RuntimeException {
    public RegistrationCodeNotValid(String message) {
        super(message);
    }

    public RegistrationCodeNotValid(String message, Throwable cause) {
        super(message, cause);
    }
}
