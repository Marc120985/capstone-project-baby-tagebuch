package de.capstonemarc.backend.baby;


import de.capstonemarc.backend.pictures.PictureModelGallery;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/babies")
@RequiredArgsConstructor
public class BabyController {

    private final BabyService babyService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    Baby addBaby(@RequestBody NewBaby newBaby) {
        return babyService.addBaby(newBaby);
    }

    @GetMapping
    public List<Baby> getAllBabies() {
        return babyService.getAllBabies();
    }

    @DeleteMapping("/{id}")
    public Baby deleteBaby(@PathVariable String id) {
        return babyService.deleteBaby(id);
    }

    @PutMapping(path = {"/{id}"})
    public Baby updateBaby(@PathVariable String id, @RequestBody BabyToUpdateDTO baby) {
        if (!baby.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return babyService.updateBaby(baby);
    }

    @PutMapping(path = {"/picturegallery/{id}"})
    public List<PictureModelGallery> updateBabyPictureGallery(@PathVariable String id, @RequestBody PictureModelGallery pictureGallery) {
        try {
            return babyService.updateBabyPictureGallery(id, pictureGallery);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(path = {"/picturegallery/{id}"})
    public List<PictureModelGallery> getBabyPictureGallery(@PathVariable String id) {
        return babyService.getBabyPictureGallery(id);
    }

    @DeleteMapping(path = {"/picturegallery/{id}"})
    public List<PictureModelGallery> deleteBabyPictureGallery(@PathVariable String id, @RequestBody PictureModelGallery pictureGallery) {
        try {
            return babyService.deleteBabyPictureGallery(id, pictureGallery);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

}
