package de.ude.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
public class User {

    public User(int userId) {
        this.userId = userId;
    }

    @Id
    private int userId;
}
