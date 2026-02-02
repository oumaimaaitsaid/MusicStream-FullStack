import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { Track } from '../../core/models/track.model';
import { Store } from '@ngrx/store';
import { selectAllTracks } from '../../store/tracks/track.selectors';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './track-detail.component.html',
  styleUrl: './track-detail.component.css'
})
export class TrackDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  public player = inject(AudioPlayerService);

  track = signal<Track | null>(null);

 ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
     if (id) {
       this.store.select(selectAllTracks).subscribe(tracks => {
         const found = tracks.find(t => t.id === id);
         if (found) {
           this.track.set(found);
         }
       });
     }
   }
}
