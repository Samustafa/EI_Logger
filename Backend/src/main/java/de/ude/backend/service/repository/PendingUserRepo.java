package de.ude.backend.service.repository;

import de.ude.backend.model.PendingUser;
import org.springframework.data.repository.CrudRepository;

public interface PendingUserRepo extends CrudRepository<PendingUser, String> {
}
