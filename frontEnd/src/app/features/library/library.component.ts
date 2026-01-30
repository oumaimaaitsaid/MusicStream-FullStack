import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { Track } from '../../core/models/track.model';
import * as TrackActions from '../../store/tracks/track.actions';
import { selectAllTracks } from '../../store/tracks/track.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, FilterPipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  public store = inject(Store);
  public player = inject(AudioPlayerService);


   public tracks$ =this.store.select(selectAllTracks);
  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
  }
   onEdit(track: Track) {
  const newTitle = prompt("Nouveau titre :", track.title);
  if (newTitle) {
    const updatedTrack = { ...track, title: newTitle };

  }
}
onDelete(id :string){

  }
}
