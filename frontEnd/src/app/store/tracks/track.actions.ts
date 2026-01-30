import { createAction, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';

export const loadTracks = createAction('[Track] Load Tracks');

export const loadTracksSuccess = createAction(
  '[Track] Load Tracks Success',
  props<{ tracks: Track[] }>()
);

export const loadTracksFailure = createAction(
  '[Track] Load Tracks Failure',
  props<{ error: any }>()
);


export const updateTrack = createAction('[Track] Update Track', props<{ id: string; trackData: any }>());
export const updateTrackSuccess = createAction('[Track] Update Track Success', props<{ track: Track }>());


export const deleteTrack = createAction('[Track] Delete Track', props<{ id: string }>());
export const deleteTrackSuccess = createAction('[Track] Delete Track Success', props<{ id: string }>());
