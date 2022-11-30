package de.capstonemarc.backend.baby;

import de.capstonemarc.backend.pictures.PictureModel;

public record BabyToUpdateDTO(
        String id,
        String name,
        String birthday,
        String weight,
        String height,
        String gender,
        PictureModel profilePicture
) {
    public static Baby updateBaby(String id, String name, String birthday, String weight, String height, String gender, PictureModel profilePicture) {
        return new Baby(id, name, birthday, weight, height, gender, profilePicture);
    }
}
