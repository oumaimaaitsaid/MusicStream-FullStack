import { Injectable, signal, inject } from '@angular/core';
import { Track } from '../models/track.model';
import { Store } from '@ngrx/store';
import { selectAllTracks } from '../../store/tracks/track.selectors';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private store = inject(Store);
  private audio = new Audio();

  state = signal<'playing' | 'paused' | 'stopped' | 'buffering'>('stopped');
  currentTrack = signal<Track | null>(null);
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.5);

  constructor() {
    this.audio.ontimeupdate = () => this.currentTime.set(this.audio.currentTime);
    this.audio.onloadedmetadata = () => this.duration.set(this.audio.duration);
    this.audio.onplay = () => this.state.set('playing');
    this.audio.onpause = () => this.state.set('paused');
    this.audio.onended = () => this.next();
  }

  play(track: Track) {
    if (this.currentTrack()?.id !== track.id) {
      this.currentTrack.set(track);

      try {
        const binaryString = atob(track.audioData as any);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'audio/mpeg' });

        if (this.audio.src) URL.revokeObjectURL(this.audio.src);

        const url = URL.createObjectURL(blob);
        this.audio.src = url;
      } catch (e) {
        console.error("Erreur de conversion audio:", e);
        return;
      }
    }

    this.audio.play();
    this.state.set('playing');
  }

  pause() {
    this.audio.pause();
    this.state.set('paused');
  }

 next() {
     this.store.select(selectAllTracks).pipe(take(1)).subscribe(list => {
       const index = list.findIndex(t => t.id === this.currentTrack()?.id);
       if (index !== -1 && index < list.length - 1) {
         this.play(list[index + 1]);
       }
     });
   }

  previous() {
      this.store.select(selectAllTracks).pipe(take(1)).subscribe(list => {
        const index = list.findIndex(t => t.id === this.currentTrack()?.id);
        if (index > 0) {
          this.play(list[index - 1]);
        }
      });
    }

  seekTo(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(v: number) {
    this.audio.volume = v;
    this.volume.set(v);
  }
}
