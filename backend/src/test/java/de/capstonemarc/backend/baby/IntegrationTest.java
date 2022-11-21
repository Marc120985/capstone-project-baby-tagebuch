package de.capstonemarc.backend.baby;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
        mockMvc.perform(MockMvcRequestBuilders.post("/api/baby")
                .contentType(APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new NewBaby("Baby")))
        )
                .andExpect(status().is(201));


    }

    @Test
    @DirtiesContext
    void getAllBabies() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/baby"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}
