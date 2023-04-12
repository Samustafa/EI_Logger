package de.ude.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @NonNull
    @Id
    private String taskId;
    private String text;
    private boolean hasPreQuestioner;
    private boolean hasPostQuestioner;


}
