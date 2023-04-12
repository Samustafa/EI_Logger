package de.ude.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.ude.backend.exceptions.custom_exceptions.RegistrationCodeNotValid;
import de.ude.backend.service.RegistrationCodeService;
import de.ude.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/logger")
public class BackendController {

    private final UserService userService;
    private final RegistrationCodeService registrationCodeService;

    @PostMapping("/registerUser/{registrationCode}")
    public ResponseEntity<String> registerUser(@PathVariable String registrationCode) throws RegistrationCodeNotValid, JsonProcessingException {
        if (!registrationCodeService.isRegistrationCodeExist(registrationCode))
            throw new RegistrationCodeNotValid("Registration Code not valid.");


        registrationCodeService.deleteRegistrationCode(registrationCode);
        String userJson = userService.registerUser();

        log.info("registerNewUserIfRegistrationCodeIsValid(): User added: " + userJson);
        return new ResponseEntity<>(userJson, HttpStatus.OK);
    }

    @GetMapping("/createRegistrationCode/{numberOfRegistrationCode}")
    public ResponseEntity<String> createRegistrationCodes(@PathVariable int numberOfRegistrationCode) throws JsonProcessingException {
        String userJson = registrationCodeService.createRegistrationCode(numberOfRegistrationCode);
        log.info("Created {} pending users: {}.", numberOfRegistrationCode, userJson);
        return new ResponseEntity<>(userJson, HttpStatus.OK);
    }
}
