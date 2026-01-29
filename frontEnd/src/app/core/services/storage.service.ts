import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dbName = 'MusicStreamDB';


  public async openDB(): Promise<IDBDatabase> {
    return new Promise((res) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('tracks')) {
          request.result.createObjectStore('tracks', { keyPath: 'id' });
        }
      };
      request.onsuccess = () => res(request.result);
    });
  }

  async saveTrack(track: Track): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction('tracks', 'readwrite');
    tx.objectStore('tracks').put(track);
    return new Promise((res) => (tx.oncomplete = () => res()));
  }

  async getAllTracks(): Promise<Track[]> {
    const db = await this.openDB();
    return new Promise((res) => {
      const request = db.transaction('tracks').objectStore('tracks').getAll();
      request.onsuccess = () => res(request.result);
    });
  }
}
