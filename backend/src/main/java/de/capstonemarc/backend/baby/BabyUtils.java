package de.capstonemarc.backend.baby;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class BabyUtils {
    public String generateUUID() {
        UUID randomID = UUID.randomUUID();
        return randomID.toString();
    }
}
