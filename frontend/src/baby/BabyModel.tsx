import {ProfilPictureModel} from "./ProfilPictureModel";
import {GalleryPictureModel} from "./GalleryPictureModel";

export type BabyModel = {
    id: string,
    name: string,
    birthday: string,
    weight: string,
    height: string,
    gender: string,
    profilePicture: ProfilPictureModel,
    pictureGallery: GalleryPictureModel[],
}
