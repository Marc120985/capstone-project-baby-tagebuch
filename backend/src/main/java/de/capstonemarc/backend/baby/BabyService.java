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
        Baby baby = new Baby(id,
                newBaby.name(),
                newBaby.birthday(),
                newBaby.weight(),
                newBaby.height(),
                newBaby.gender());
        return babyRepository.save(baby);
    }

    public List<Baby> getAllBabies() {
        return babyRepository.findAll();
    }

    public Baby deleteBaby(String id) {
        Baby baby = babyRepository.findById(id).orElseThrow();
        babyRepository.delete(baby);
        return baby;
    }
}
