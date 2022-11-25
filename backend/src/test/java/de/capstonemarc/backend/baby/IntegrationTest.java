package de.capstonemarc.backend.baby;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void addBaby() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/babies")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new NewBaby("Baby", "01.01.2000", "3.5", "76", "w"))))
                .andExpect(status().is(201));
    }

    @Test
    @DirtiesContext
    void getAllBabies() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/babies"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void deleteBaby() throws Exception {
        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/babies")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Baby",
                                "birthday": "01.01.2000",
                                "weight": "3.5",
                                "height": "76",
                                "gender": "w"
                                }"""))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        Baby baby = objectMapper.readValue(content, Baby.class);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/babies/" + baby.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                "id": "<id>",
                                "name": "Baby",
                                "birthday": "01.01.2000",
                                "weight": "3.5",
                                "height": "76",
                                "gender": "w"
                                }
                                """.replace("<id>", baby.id())));
    }

    @DirtiesContext
    @Test
    void updatebabyWithBeforePostBabyAndChangedWeight() throws Exception {
        //given
        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/babies")

                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Rabbit",
                                    "birthday": "01.01.2000",
                                    "weight": "3500",
                                    "height": "76",
                                    "gender": "w"
                                }
                                """))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();
        Baby baby = objectMapper.readValue(content, Baby.class);
        //then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/babies/"))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        [{
                            "id": "<id>",
                            "name": "Rabbit",
                            "birthday": "01.01.2000",
                            "weight": "3500",
                            "height": "76",
                            "gender": "w"
                        }]
                        """.replace("<id>", baby.id())));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/babies/" + baby.id())

                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "<id>",
                                    "name": "Rabbit",
                                    "birthday": "01.01.2000",
                                    "weight": "8000",
                                    "height": "76",
                                    "gender": "w"
                                }
                                """.replace("<id>", baby.id())))
                .andExpect(status().is(200))
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/babies/"))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        [{
                            "id": "<id>",
                            "name": "Rabbit",
                            "birthday": "01.01.2000",
                            "weight": "8000",
                            "height": "76",
                            "gender": "w"
                        }]
                        """.replace("<id>", baby.id())));
    }

    @DirtiesContext
    @Test
    void updatebabyWithBeforePostBabyAndChangedWeightFail() throws Exception {
        //given
        String content = mockMvc.perform(MockMvcRequestBuilders.post("/api/babies")

                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Rabbit",
                                    "birthday": "01.01.2000",
                                    "weight": "3500",
                                    "height": "76",
                                    "gender": "w"
                                }
                                """))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();
        Baby baby = objectMapper.readValue(content, Baby.class);
        //then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/babies/"))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        [{
                            "id": "<id>",
                            "name": "Rabbit",
                            "birthday": "01.01.2000",
                            "weight": "3500",
                            "height": "76",
                            "gender": "w"
                        }]
                        """.replace("<id>", baby.id())));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/babies/" + baby.id())

                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "<id>",
                                    "name": "Rabbit",
                                    "birthday": "01.01.2000",
                                    "weight": "8000",
                                    "height": "76",
                                    "gender": "w"
                                }
                                """.replace("<id>", baby.id())))
                .andExpect(status().is(200))
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/babies/"))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        [{
                            "id": "<id>",
                            "name": "Rabbit",
                            "birthday": "01.01.2000",
                            "weight": "8000",
                            "height": "76",
                            "gender": "w"
                        }]
                        """.replace("<id>", baby.id())));
    }

    @Test
    @DirtiesContext
    void updateBabyWithNotExistingIDAndReturn400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/babies/1"))
                .andExpect(status().is(400));
    }
}
