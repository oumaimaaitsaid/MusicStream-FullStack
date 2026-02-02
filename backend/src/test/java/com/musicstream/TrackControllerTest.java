package com.musicstream.backend;

import com.musicstream.backend.controllers.TrackController;
import com.musicstream.backend.entities.Track;
import com.musicstream.backend.services.TrackService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TrackController.class)
public class TrackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TrackService trackService;

    @Test
    void testGetAllTracks() throws Exception {
        Mockito.when(trackService.getAllTracks()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/tracks"))
                .andExpect(status().isOk());
    }





}
