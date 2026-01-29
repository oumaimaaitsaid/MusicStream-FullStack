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
