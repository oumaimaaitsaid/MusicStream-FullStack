package com.musicstream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.springframework.mock.web.MockMultipartFile;


import com.musicstream.backend.entities.Track;
import com.musicstream.backend.repositories.TrackRepository;
import com.musicstream.backend.services.TrackService;


@ExtendWith(MockitoExtension.class)
public class TrackServiceTest {

    @Mock
    private TrackRepository trackRepository;

    @InjectMocks
    private TrackService trackService;

    @Test
    void testSaveTrack() throws Exception {

        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.mp3", "audio/mpeg", "test content".getBytes()
        );

        Track track = new Track();
        track.setTitle("Test Title");

        when(trackRepository.save(any(Track.class))).thenReturn(track);

        Track saved = trackService.saveTrack(
                mockFile,
                "Test Title",
                "Test Description",
                "Test Artist",
                "Test Category",
                "03:30"
        );


        assertNotNull(saved);
        assertEquals("Test Title", saved.getTitle());
    }
}