import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { Cycle } from 'src/app/models/cicle.model';

export const selectCycleFeature = (state: AppState) => state.cycle;

export const selectCycle = createSelector(
  selectCycleFeature,
  (state: Cycle) => state
);
