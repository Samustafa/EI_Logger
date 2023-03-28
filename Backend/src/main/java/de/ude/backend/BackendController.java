package de.ude.backend;

import de.ude.backend.service.server.UserServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logger")
public class BackendController {

    private UserServer userServer;

    @Autowired
    public void setUserServer(UserServer userServer) { this.userServer = userServer; }

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser() {
        this.userServer.addUser();
        return new ResponseEntity<>("User added", HttpStatus.OK);
    }

}
