import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { Track } from '../../core/models/track.model';

@Component({
  standalone: true,
  imports: [CommonModule, FilterPipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  public trackService = inject(TrackService);
  public player = inject(AudioPlayerService);

  ngOnInit() {
    this.trackService.loadTracks();
  }
onEdit(track: Track) {
  const newTitle = prompt("Nouveau titre :", track.title);
  if (newTitle) {
    const updatedTrack = { ...track, title: newTitle };
    this.trackService.updateTrack(updatedTrack);
  }
}
}
