import { createReducer, on } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import {
  editUserDataError,
  loadUserDataSuccess,
} from '../actions/user/user-data-api.action';
import { editUserData } from '../actions/user/user-data-page.action';

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
  })),
  on(editUserData, editUserDataError, (state, action) => ({
    ...state,
    userData: { ...state.userData, ...action.userData },
  }))
);
