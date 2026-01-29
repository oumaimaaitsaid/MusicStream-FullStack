import { inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType, createEffect } from '@ngrx/effects';
import { TrackService } from '../../core/services/track.service';
import * as TrackActions from './track.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  private trackService = inject(TrackService);

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() =>
        this.trackService.getTracks().pipe(
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        )
      )
    )
  );
}
