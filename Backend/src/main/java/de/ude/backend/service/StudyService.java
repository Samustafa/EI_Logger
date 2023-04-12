package de.ude.backend.service;


import de.ude.backend.model.Study;
import de.ude.backend.service.repository.StudyRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudyService {
    private final StudyRepo studyRepo;

    public void createStudy(Study study) {
        studyRepo.save(study);
    }

}
