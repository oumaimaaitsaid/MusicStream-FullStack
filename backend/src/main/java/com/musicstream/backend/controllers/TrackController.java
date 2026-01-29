package com.musicstream.backend.controllers;

import com.musicstream.backend.entities.Track;
import com.musicstream.backend.services.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin(origins = "http://localhost:4200")
public class TrackController {

    @Autowired
    private TrackService trackService;

    @GetMapping
    public List<Track> getAll() {
        return trackService.getAllTracks();
    }


    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Track> uploadTrack(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("duration") String duration) throws IOException {

        Track savedTrack = trackService.saveTrack(file, title, artist, category, description, duration);
        return ResponseEntity.ok(savedTrack);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable String id) {
        trackService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }
}