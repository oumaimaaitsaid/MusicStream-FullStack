package com.musicstream.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tracks")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String artist;
    private String category;

    @Column(length = 200)
    private String description;

    private String duration;
    private LocalDateTime addedDate;

    @Lob
    @org.hibernate.annotations.JdbcType(org.hibernate.type.descriptor.jdbc.VarbinaryJdbcType.class)
    @Column(name = "audio_data", columnDefinition = "bytea")
    private byte[] audioData;

    private String fileName;
    private String contentType;
}