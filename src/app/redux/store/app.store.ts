import { ActionReducerMap } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { loginReducers } from '../reducers/login.reducer';

export interface AppState {
  user: UserResponse;
}

export const appStore: ActionReducerMap<AppState> = {
  user: loginReducers,
};
