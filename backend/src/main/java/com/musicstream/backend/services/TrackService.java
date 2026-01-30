package com.musicstream.backend.services;

import com.musicstream.backend.entities.Track;
import com.musicstream.backend.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrackService {

    @Autowired
    private TrackRepository trackRepository;

    public Track saveTrack(MultipartFile file, String title, String artist,
                           String category, String description, String duration) throws IOException {

        Track track = Track.builder()
                .title(title)
                .artist(artist)
                .category(category)
                .description(description)
                .duration(duration)
                .addedDate(LocalDateTime.now())
                .audioData(file.getBytes())
                .fileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .build();

        return trackRepository.save(track);
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public Track updateTrack(String id, String title, String artist, String category, String description) {
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Track not found"));

        track.setTitle(title);
        track.setArtist(artist);
        track.setCategory(category);
        track.setDescription(description);

        return trackRepository.save(track);
    }
    public void deleteTrack(String id) {
        trackRepository.deleteById(id);
    }
}