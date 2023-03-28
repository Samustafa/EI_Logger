package de.ude.backend.repository;

import de.ude.backend.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, String> {
}
