import { createReducer, on } from '@ngrx/store';
import { Track } from '../../core/models/track.model';
import * as TrackActions from './track.actions';

export interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: any;
}

export const initialState: TrackState = {
  tracks: [],
  loading: false,
  error: null
};

export const trackReducer = createReducer(
  initialState,

  on(TrackActions.loadTracks, state => ({ ...state, loading: true })),

  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    loading: false
  })),

 on(TrackActions.updateTrackSuccess, (state, { track }) => ({
   ...state,
   tracks: state.tracks.map(t => t.id === track.id ? track : t)
 })),

 on(TrackActions.deleteTrackSuccess, (state, { id }) => ({
   ...state,
   tracks: state.tracks.filter(t => t.id !== id)
 }))

  );
