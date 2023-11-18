import { createReducer, on } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { loadCyclesUserSuccess } from '../actions/cycle/cycle-user-api.action';

export const cycleUserFeatureKey = 'cycleUserState';

export interface CycleUserState {
  cyclesUser: Cycle[];
}

const cycleUserInitialState: CycleUserState = {
  cyclesUser: [],
};

export const cycleUserReducer = createReducer(
  cycleUserInitialState,
  on(loadCyclesUserSuccess, (state, action) => ({
    ...state,
    cycleUser: action.cyclesUser,
  })),
);
