package de.ude.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.ude.backend.model.PendingUser;
import de.ude.backend.service.repository.PendingUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class PendingUserService {

    private final PendingUserRepo pendingUserRepo;


    /**
     * Creates a number of pending users and returns them as JSON
     *
     * @param numberOfPendingUsers to create
     * @return PendingUsers as JSON String
     * @throws JsonProcessingException
     */
    public String createPendingUsers(int numberOfPendingUsers) throws JsonProcessingException {
        ArrayList<PendingUser> pendingUsers = new ArrayList<>();
        for (int i = 0; i < numberOfPendingUsers; i++) {
            pendingUsers.add(Utils.createUniversillayUniquePendingUser());
        }
        pendingUserRepo.saveAll(pendingUsers);
        return Utils.mapPendingUserToJSON(pendingUsers);
    }

    public boolean isPendingUserIdValid(String id) {
        return pendingUserRepo.existsById(id);
    }

    public void deletePendingUser(String id) {
        pendingUserRepo.deleteById(id);
    }
}
