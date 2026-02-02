import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Track } from '../models/track.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8081/api/tracks';

  loadTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this.API_URL);
  }

  updateTrack(id: string, track: Track): Observable<Track> {
    const params = new HttpParams()
      .set('title', track.title)
      .set('artist', track.artist)
      .set('category', track.category)
      .set('description', track.description || '');

    return this.http.put<Track>(`${this.API_URL}/${id}`, null, { params });
  }

  deleteTrack(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  addTrack(track: any): Observable<Track> {
    const formData = new FormData();
    formData.append('file', track.file);
    formData.append('title', track.title);
    formData.append('artist', track.artist);
    formData.append('category', track.category);
    formData.append('description', track.description || '');
    formData.append('duration', track.duration);

    return this.http.post<Track>(this.API_URL, formData);
  }
}
