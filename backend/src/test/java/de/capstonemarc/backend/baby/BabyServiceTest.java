package de.capstonemarc.backend.baby;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Baby babyWithId = new Baby(id, name, birthday, weight, height, gender);
        NewBaby babyWithoutId = new NewBaby(name, birthday, weight, height, gender);
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

    @Test
    void deleteBabyFromDatabase() {
        //given
        String testToDeleteString = "UUIDFromController";
        Baby testBaby = new Baby(testToDeleteString, "Hasi", "12.13.2055", "3500", "76", "w");
        //when
        when(babyRepository.findById(testToDeleteString)).thenReturn(java.util.Optional.of(testBaby));
        Baby actual = babyService.deleteBaby(testToDeleteString);
        //then
        verify(babyRepository).findById(testToDeleteString);
        verify(babyRepository).delete(testBaby);
        assertEquals(testBaby, actual);
    }

    @Test
    void deleteBabyFromDatabaseFail() {
        //given
        String testToDeleteString = "UUIDFromController";
        //when
        when(babyRepository.findById(testToDeleteString)).thenReturn(Optional.empty());
        //then
        String message2 = null;
        try {
            babyService.deleteBaby(testToDeleteString);
        } catch (IllegalArgumentException e) {
            message2 = e.getMessage();
        }

        assertEquals(message2, "Baby with id " + testToDeleteString + " not found");
    }

    @Test
    void updateBabyInDatabase() {
        //given
        String id = "123";
        BabyToUpdateDTO babyToUpdate = new BabyToUpdateDTO(id, "Hansi", "01.01.2000", "3500", "76", "w");
        Baby updatetBaby = new Baby(id, "Hansi", "01.01.2000", "3500", "76", "w");
        Baby currentBaby = new Baby(id, "Klaus", "01.01.2000", "3500", "76", "w");
        //when
        when(babyRepository.findById(id)).thenReturn(Optional.of(currentBaby));
        when(babyRepository.save(updatetBaby)).thenReturn(updatetBaby);
        Baby actual = babyService.updateBaby(babyToUpdate);
        //then
        verify(babyRepository).findById(id);
        verify(babyRepository).save(updatetBaby);
        assertEquals(updatetBaby, actual);
    }

    @Test
    void updateBabyInDatabaseWithoutId() {
        //given
        String id = "345";
        BabyToUpdateDTO babyToUpdate = new BabyToUpdateDTO(id, "Hansi", "01.01.2000", "3500", "76", "w");
        //when
        when(babyRepository.findById(id)).thenReturn(Optional.empty());
        //then
        String message2 = null;
        try {
            babyService.updateBaby(babyToUpdate);
        } catch (IllegalArgumentException e) {
            message2 = e.getMessage();
        }
        assertEquals(message2, "Baby with id " + id + " not found");
    }
    
}
