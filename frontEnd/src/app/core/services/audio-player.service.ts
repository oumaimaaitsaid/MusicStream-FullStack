import { Injectable, signal, inject } from '@angular/core';
import { Track } from '../models/track.model';
import { TrackService } from './track.service';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private trackService = inject(TrackService);
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
        // Hna khass t-koun atob 7it Spring kiy-sift Base64
        const binaryString = atob(track.audioData as any);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Fix syntaxe : nssiti l-fasila bin [bytes] o {type...}
        const blob = new Blob([bytes], { type: 'audio/mpeg' });

        // Nettoyage de l'ancienne URL pour éviter les fuites mémoire
        if (this.audio.src) URL.revokeObjectURL(this.audio.src);

        const url = URL.createObjectURL(blob);
        this.audio.src = url;
      } catch (e) {
        console.error("Erreur de conversion audio:", e);
        return;
      }
    }

    // Had l-lines khasshoum y-kounou d-dakhel l-méthode play
    this.audio.play();
    this.state.set('playing');
  }

  pause() {
    this.audio.pause();
    this.state.set('paused');
  }

  next() {
    const list = this.trackService.tracks();
    const index = list.findIndex(t => t.id === this.currentTrack()?.id);
    if (index < list.length - 1) {
      this.play(list[index + 1]);
    }
  }

  previous() {
    const list = this.trackService.tracks();
    const index = list.findIndex(t => t.id === this.currentTrack()?.id);
    if (index > 0) {
      this.play(list[index - 1]);
    }
  }

  seekTo(time: number) {
    this.audio.currentTime = time;
  }

  setVolume(v: number) {
    this.audio.volume = v;
    this.volume.set(v);
  }
}
