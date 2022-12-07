package de.capstonemarc.backend.baby;

import de.capstonemarc.backend.pictures.PictureModel;
import de.capstonemarc.backend.pictures.PictureModelGallery;
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
        PictureModel profilePicture = new PictureModel("baby_placeholder.jpeg", "/api/pictures/files/baby_placeholder.jpeg");
        List<PictureModelGallery> pictureModelGallery = List.of(new PictureModelGallery("baby_placeholder.jpeg", "/api/pictures/files/baby_placeholder.jpeg"));
        Baby baby = new Baby(id,
                newBaby.name(),
                newBaby.birthday(),
                newBaby.weight(),
                newBaby.height(),
                newBaby.gender(),
                profilePicture,
                pictureModelGallery);
        return babyRepository.save(baby);
    }

    public List<Baby> getAllBabies() {
        return babyRepository.findAll();
    }

    public Baby deleteBaby(String id) {
        Baby baby = babyRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Baby with id " + id + " not found"));
        babyRepository.delete(baby);
        return baby;
    }

    public Baby updateBaby(BabyToUpdateDTO baby) {
        Baby babyToUpdate = babyRepository.findById(baby.id()).orElseThrow(
                () -> new IllegalArgumentException("Baby with id " + baby.id() + " not found"));
        Baby updatedBaby = BabyToUpdateDTO.updateBaby(
                babyToUpdate.id(),
                baby.name(),
                baby.birthday(),
                baby.weight(),
                baby.height(),
                baby.gender(),
                baby.profilePicture(),
                baby.pictureGallery());
        return babyRepository.save(updatedBaby);
    }
}
