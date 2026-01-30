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
        this.trackService.loadTracks().pipe( // Khass t-koun loadTracks()
          map((tracks: Track[]) => TrackActions.loadTracksSuccess({ tracks })), // Zid : Track[]
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        )
      )
    )
  );
}
