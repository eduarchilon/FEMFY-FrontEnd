import { createReducer, on } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { loadUserDataSuccess } from '../actions/user/user-data-api.action';

export const userDataFeatureKey = 'userDataState';

export interface UserDataState {
  userData: UserResponse;
}

const userDataInitialState: UserDataState = {
  userData: {},
};

export const userDataReducer = createReducer(
  userDataInitialState,
  on(loadUserDataSuccess, (state, action) => ({
    ...state,
    userData: action.userData,
  }))
);
