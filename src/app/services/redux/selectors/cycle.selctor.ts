import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { Cycle, CyclePhaseState } from 'src/app/models/cicle.model';

export const selectCycleFeature = (state: AppState) => state.cycle;
export const selectCycleStateFeature = (state: AppState) =>
  state.cyclePhaseState;

export const selectCycle = createSelector(
  selectCycleFeature,
  (state: Cycle) => state
);

export const selectCyclePhaseState = createSelector(
  selectCycleStateFeature,
  (state: CyclePhaseState) => state
);
