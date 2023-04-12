package de.ude.backend.exceptions;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.ude.backend.exceptions.custom_exceptions.RegistrationCodeNotValid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {JsonProcessingException.class})
    public ResponseEntity<Object> handleException(JsonProcessingException e) {
        ApiException apiException = new ApiException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {RegistrationCodeNotValid.class})
    public ResponseEntity<Object> handleException(RegistrationCodeNotValid e) {
        ApiException apiException = new ApiException(e.getMessage(), HttpStatus.BAD_REQUEST, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
    }
}
