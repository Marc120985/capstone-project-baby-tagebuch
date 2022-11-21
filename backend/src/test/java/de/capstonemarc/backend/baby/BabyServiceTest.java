package de.capstonemarc.backend.baby;

import org.junit.jupiter.api.Test;
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
        Baby babyWithId = new Baby(id, name);
        NewBaby babyWithoutId = new NewBaby(name);
        //when
        when(babyUtils.generateUUID()).thenReturn(id);
        when(babyRepository.save(babyWithId)).thenReturn(babyWithId);
        Baby actual = babyService.addBaby(babyWithoutId);
        //then
        verify(babyUtils).generateUUID();
        verify(babyRepository).save(babyWithId);
        assertEquals(babyWithId, actual);
    }
}