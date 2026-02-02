import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; // Safi juj merrat la
import { TrackService } from '../../core/services/track.service';
import * as TrackActions from './track.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Track } from '../../core/models/track.model';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  private trackService = inject(TrackService);

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() =>
        this.trackService.loadTracks().pipe(
          map((tracks: Track[]) => TrackActions.loadTracksSuccess({ tracks })), // Zid : Track[]
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        )
      )
    )
  );
addTrack$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrackActions.addTrack),
    mergeMap(action =>
      this.trackService.addTrack(action.track).pipe(
        map(track => TrackActions.addTrackSuccess({ track })),
        catchError(error => of(TrackActions.loadTracksFailure({ error })))
      )
    )
  )
);
updateTrack$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrackActions.updateTrack),
    mergeMap(action =>
      this.trackService.updateTrack(action.id, action.trackData as Track).pipe(
        map((track: Track) =>
          TrackActions.updateTrackSuccess({ track })
        ),
        catchError(error =>
          of(TrackActions.loadTracksFailure({ error }))
        )
      )
    )
  )
);

deleteTrack$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrackActions.deleteTrack),
    mergeMap(action =>
      this.trackService.deleteTrack(action.id).pipe(
        map(() =>
          TrackActions.deleteTrackSuccess({ id: action.id })
        ),
        catchError(error =>
          of(TrackActions.loadTracksFailure({ error }))
        )
      )
    )
  )
);

}
