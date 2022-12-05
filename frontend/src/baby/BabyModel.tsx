import {ProfilPictureModel} from "./ProfilPictureModel";

export type BabyModel = {
    id: string,
    name: string,
    birthday: string,
    weight: string,
    height: string,
    gender: string,
    profilePicture: ProfilPictureModel,
}
