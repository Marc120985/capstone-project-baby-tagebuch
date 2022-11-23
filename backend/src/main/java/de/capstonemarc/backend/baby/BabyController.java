package de.capstonemarc.backend.baby;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

}
