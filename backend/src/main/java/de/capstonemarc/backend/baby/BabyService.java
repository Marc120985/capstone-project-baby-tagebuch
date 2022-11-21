package de.capstonemarc.backend.baby;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BabyService {

    private final BabyRepository babyRepository;
    private final BabyUtils babyUtils;

    public Baby addBaby(NewBaby newBaby) {
        String id = babyUtils.generateUUID();
        Baby baby = new Baby(id, newBaby.name());
        return babyRepository.save(baby);
    }

    public List<Baby> getAllBabies() {
        return babyRepository.findAll();
    }
}
