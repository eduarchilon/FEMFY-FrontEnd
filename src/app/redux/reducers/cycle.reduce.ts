import { createReducer, on } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { setCycle } from '../actions/cycle.action';

export const initialCycleState: Cycle | any = null;

export const cycleReducers = createReducer(
  initialCycleState,
  on(setCycle, (state, { cycle }) => ({ ...state, cycle }))
);
