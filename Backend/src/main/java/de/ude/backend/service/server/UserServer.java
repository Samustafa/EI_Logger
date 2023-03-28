package de.ude.backend.service.server;

import de.ude.backend.service.UserService;
import de.ude.backend.model.User;
import de.ude.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServer implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public void addUser() {
        userRepo.save(new User(10));
    }



}

