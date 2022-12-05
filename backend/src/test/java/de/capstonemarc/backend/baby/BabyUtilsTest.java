package de.capstonemarc.backend.baby;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BabyUtilsTest {

    @Test
    void generateUUID() {
        //given
        BabyUtils babyUtils = new BabyUtils();
        //when
        String actual = babyUtils.generateUUID();
        //then
        assertNotNull(actual);
    }

    @Test
    void generateUUIDSubstring() {
        //given
        BabyUtils babyUtils = new BabyUtils();
        //when
        String actual = babyUtils.generateRandomString(8);
        //then
        assertNotNull(actual);
    }
}
