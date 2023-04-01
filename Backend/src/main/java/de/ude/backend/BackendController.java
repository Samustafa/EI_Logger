package de.ude.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.ude.backend.service.PendingUserService;
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
    private final PendingUserService pendingUserService;

    @PostMapping("/addUser/{pendingUserId}")
    public ResponseEntity<String> addUser(@PathVariable String pendingUserId) {
        try {
            return registerNewUserIfPendingUserIdIsValid(pendingUserId);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException", e);
            return new ResponseEntity<>("Internal Server Error: JsonProcessingException", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/createPendingUsers/{numberOfPendingUsers}")
    public ResponseEntity<String> createPendingUsers(@PathVariable int numberOfPendingUsers) {
        try {
            String userJson = this.pendingUserService.createPendingUsers(numberOfPendingUsers);
            log.info("Created {} pending users: {}.", numberOfPendingUsers, userJson);
            return new ResponseEntity<>(userJson, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException", e);
            return new ResponseEntity<>("Could not create Pending Users.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<String> registerNewUserIfPendingUserIdIsValid(String pendingUserId) throws JsonProcessingException {
        if (!this.pendingUserService.isPendingUserIdExist(pendingUserId)) {
            log.warn("addUser(): Pending User Id not valid.");
            return new ResponseEntity<>("Pending UserId doesn't exist.", HttpStatus.BAD_REQUEST);
        }

        this.pendingUserService.deletePendingUser(pendingUserId);
        String userJson = this.userService.registerUser();
        log.info("registerNewUserIfPendingUserIdIsValid(): User added: " + userJson);
        return new ResponseEntity<>(userJson, HttpStatus.OK);
    }
}
