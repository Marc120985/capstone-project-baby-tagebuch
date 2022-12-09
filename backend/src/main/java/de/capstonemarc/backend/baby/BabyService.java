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
        List<PictureModelGallery> pictureModelGallery = List.of(new PictureModelGallery("gallery_placeholder.jpeg", "/api/pictures/files/gallery_placeholder.jpeg"));
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
                babyToUpdate.pictureGallery());
        return babyRepository.save(updatedBaby);
    }


    public List<PictureModelGallery> updateBabyPictureGallery(String id, PictureModelGallery pictureModel) {
        Baby babyToUpdate = babyRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Baby with id " + id + " not found"));
        List<PictureModelGallery> pictureModelGallery = babyToUpdate.pictureGallery();
        pictureModelGallery.add(new PictureModelGallery(pictureModel.name(), pictureModel.url()));
        BabyToUpdateDTO.updateBaby(
                babyToUpdate.id(),
                babyToUpdate.name(),
                babyToUpdate.birthday(),
                babyToUpdate.weight(),
                babyToUpdate.height(),
                babyToUpdate.gender(),
                babyToUpdate.profilePicture(),
                pictureModelGallery);
        if (pictureModelGallery.size() > 1 && pictureModelGallery.get(0).name().equals("gallery_placeholder.jpeg")) {
            pictureModelGallery.remove(0);
            babyRepository.save(babyToUpdate);
        }

        return pictureModelGallery;
    }

    public List<PictureModelGallery> getBabyPictureGallery(String id) {
        Baby baby = babyRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Baby with id " + id + " not found"));
        return baby.pictureGallery();
    }
}
