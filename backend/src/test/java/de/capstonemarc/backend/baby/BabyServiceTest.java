package de.capstonemarc.backend.baby;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class BabyServiceTest {

    BabyUtils babyUtils = mock(BabyUtils.class);
    BabyRepository babyRepository = mock(BabyRepository.class);
    BabyService babyService = new BabyService(babyRepository, babyUtils);

    @Test
    void addNewBabyToDatabase() {
        //given
        String id = "123";
        String name = "Hansi";
        String birthday = "01.01.2000";
        String weight = "3.5";
        String height = "76";
        String gender = "w";
        Baby babyWithId = new Baby(id, name,birthday,weight,height,gender);
        NewBaby babyWithoutId = new NewBaby(name, birthday,weight,height,gender);
        //when
        when(babyUtils.generateUUID()).thenReturn(id);
        when(babyRepository.save(babyWithId)).thenReturn(babyWithId);
        Baby actual = babyService.addBaby(babyWithoutId);
        //then
        verify(babyUtils).generateUUID();
        verify(babyRepository).save(babyWithId);
        assertEquals(babyWithId, actual);
    }

    @Test
    void getAllBabiesFromDatabase() {
        //given
        List<Baby> testBabies = new ArrayList<>();
        //when
        List<Baby> actual = babyService.getAllBabies();
        //then
        verify(babyRepository).findAll();
        assertEquals(testBabies, actual);
    }
}
