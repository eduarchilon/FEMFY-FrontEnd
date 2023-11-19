import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const selectNumberOvulationFeature = (state: AppState) => state.numberOvulation;

export const selectNumberOfOvulation = createSelector(
  selectNumberOvulationFeature,
  (state: Number) => state
);
