package de.capstonemarc.backend.baby;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/baby")
@RequiredArgsConstructor
public class BabyController {

    private final BabyService babyService;

    @PostMapping
    Baby addBaby(@RequestBody NewBaby newBaby) {
        return babyService.addBaby(newBaby);
    }




}
