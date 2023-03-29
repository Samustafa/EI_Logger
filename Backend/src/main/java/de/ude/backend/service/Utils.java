package de.ude.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.ude.backend.model.PendingUser;
import de.ude.backend.model.User;

import java.util.ArrayList;
import java.util.UUID;

public class Utils {

    public static User createUniversillayUniqueUser() {
        UUID uuid = UUID.randomUUID();
        return new User(uuid.toString());
    }

    public static String mapUserToJSON(User user) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(user);
    }

    public static PendingUser createUniversillayUniquePendingUser() {
        UUID uuid = UUID.randomUUID();
        return new PendingUser(uuid.toString());
    }

    public static String mapPendingUserToJSON(ArrayList<PendingUser> pendingUsers) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(pendingUsers);
    }
}
