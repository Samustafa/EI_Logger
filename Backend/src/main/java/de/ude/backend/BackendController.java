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

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser() {
        this.userServer.addUser();
        return new ResponseEntity<>("User added", HttpStatus.OK);
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

}
