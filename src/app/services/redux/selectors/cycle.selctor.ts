import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';
import {
  Cycle,
  CyclePhaseState,
  PredictionCycle,
} from 'src/app/models/cicle.model';

export const selectCycleFeature = (state: AppState) => state.cycle;
export const selectCycleStateFeature = (state: AppState) =>
  state.cyclePhaseState;
export const selectPredictionCycleFeature = (state: AppState) =>
  state.predictionCycle;

export const selectCycle = createSelector(
  selectCycleFeature,
  (state: Cycle) => state
);

export const selectCyclePhaseState = createSelector(
  selectCycleStateFeature,
  (state: CyclePhaseState) => state
);

export const selectPredictionCycle = createSelector(
  selectPredictionCycleFeature,
  (state: PredictionCycle) => state
);
