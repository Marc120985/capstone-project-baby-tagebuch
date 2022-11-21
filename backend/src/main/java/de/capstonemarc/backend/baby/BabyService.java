package de.capstonemarc.backend.baby;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
