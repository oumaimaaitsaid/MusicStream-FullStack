import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.reducer';

export const selectTrackState = createFeatureSelector<TrackState>('tracks');

export const selectAllTracks = createSelector(
  selectTrackState,
  (state) => state.tracks
);

export const selectTracksLoading = createSelector(
  selectTrackState,
  (state) => state.loading
);
