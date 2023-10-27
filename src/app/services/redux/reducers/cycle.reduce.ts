import { createReducer, on } from '@ngrx/store';
import { Cycle, CyclePhaseState } from 'src/app/models/cicle.model';
import { setCycle, setCycleState } from '../actions/cycle.action';

export const initialCycleState: Cycle | any = null;
export const initialPhaseState: CyclePhaseState | any = null;

export const cycleReducers = createReducer(
  initialCycleState,
  on(setCycle, (state, { cycle }) => ({ ...state, cycle }))
);

export const cyclePhaseStateReducers = createReducer(
  initialPhaseState,
  on(setCycleState, (state, { cycleState }) => ({
    ...state,
    cycleState,
  }))
);
