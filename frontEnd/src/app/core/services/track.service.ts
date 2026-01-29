import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/tracks';

  tracks = signal<Track[]>([]);
  status = signal<'loading' | 'error' | 'success'>('success');

  loadTracks() {
    this.http.get<Track[]>(this.API_URL).subscribe(data => this.tracks.set(data));
  }

  addTrack(track: Track) {
    const formData = new FormData();
    formData.append('file', track.blob);
    formData.append('title', track.title);
    formData.append('artist', track.artist);
    formData.append('category', track.category);
    formData.append('description', track.description || '');
    formData.append('duration', String(track.duration)); // Fix TS2769

    this.http.post<Track>(this.API_URL, formData).subscribe(newTrack => {
      this.tracks.update(prev => [...prev, newTrack]);
    });
  }

  deleteTrack(id: string) {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.tracks.update(prev => prev.filter(t => t.id !== id));
    });
  }

  updateTrack(track: Track) {
    console.log('Update logic to be implemented');
  }
}
