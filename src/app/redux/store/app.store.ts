import { ActionReducerMap } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { loginReducers } from '../reducers/login.reducer';
import { Cycle } from 'src/app/models/cicle.model';
import { cycleReducers } from '../reducers/cycle.reduce';

export interface AppState {
  user: UserResponse;
  cycle: Cycle;
}

export const appStore: ActionReducerMap<AppState> = {
  user: loginReducers,
  cycle: cycleReducers,
};
