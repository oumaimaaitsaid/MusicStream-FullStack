import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { Track } from '../models/track.model';

describe('TrackService', () => {
  let service: TrackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService]
    });
    service = TestBed.inject(TrackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch all tracks using loadTracks()', () => {
    const mockTracks: Track[] = [
      { id: '1', title: 'Song 1', artist: 'Artist 1', category: 'Pop', description: 'Desc 1', duration: '3:00' } as any,
      { id: '2', title: 'Song 2', artist: 'Artist 2', category: 'Rock', description: 'Desc 2', duration: '4:00' } as any
    ];

    service.loadTracks().subscribe((tracks) => {
      expect(tracks.length).toBe(2);
      expect(tracks).toEqual(mockTracks);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/tracks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTracks);
  });

  it('should delete a track', () => {
    const trackId = '123';

    service.deleteTrack(trackId).subscribe();

    const req = httpMock.expectOne(`http://localhost:8081/api/tracks/${trackId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
