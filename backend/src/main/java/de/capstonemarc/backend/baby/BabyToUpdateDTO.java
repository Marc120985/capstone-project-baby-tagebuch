package de.capstonemarc.backend.baby;

public record BabyToUpdateDTO(
        String id,
        String name,
        String birthday,
        String weight,
        String height,
        String gender) {
    public static Baby updateBaby(String id, String name, String birthday, String weight, String height, String gender) {
        return new Baby(id, name, birthday, weight, height, gender);
    }
}
