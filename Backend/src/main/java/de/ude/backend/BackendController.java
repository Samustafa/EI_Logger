package de.ude.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
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
    public ResponseEntity<String> registerUser(@PathVariable String registrationCode) {
        try {
            return registerNewUserIfRegistrationCodeIsValid(registrationCode);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException", e);
            return new ResponseEntity<>("Internal Server Error: JsonProcessingException", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/createRegistrationCode/{numberOfRegistrationCode}")
    public ResponseEntity<String> createRegistrationCodes(@PathVariable int numberOfRegistrationCode) {
        try {
            String userJson = this.registrationCodeService.createRegistrationCode(numberOfRegistrationCode);
            log.info("Created {} pending users: {}.", numberOfRegistrationCode, userJson);
            return new ResponseEntity<>(userJson, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException", e);
            return new ResponseEntity<>("Could not create Pending Users.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<String> registerNewUserIfRegistrationCodeIsValid(String registrationCode) throws JsonProcessingException {
        if (!this.registrationCodeService.isRegistrationCodeExist(registrationCode)) {
            log.warn("registerNewUserIfRegistrationCodeIsValid(): Registration Code not valid.");
            return new ResponseEntity<>("Registration Code not valid.", HttpStatus.BAD_REQUEST);
        }

        this.registrationCodeService.deleteRegistrationCode(registrationCode);
        String userJson = this.userService.registerUser();
        log.info("registerNewUserIfRegistrationCodeIsValid(): User added: " + userJson);
        return new ResponseEntity<>(userJson, HttpStatus.OK);
    }
}
