package de.capstonemarc.backend.baby;


import de.capstonemarc.backend.pictures.PictureModel;

public record NewBaby(
        String name,
        String birthday,
        String weight,
        String height,
        String gender

) {


}
