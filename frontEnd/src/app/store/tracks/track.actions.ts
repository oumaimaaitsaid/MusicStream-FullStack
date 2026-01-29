import { createAction, props } from '@ngrx/store';
import { Track } from '../../core/models/track.model';

export const loadTracks = createAction('[Track] Load Tracks');
