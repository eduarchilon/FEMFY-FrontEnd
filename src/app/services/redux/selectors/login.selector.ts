import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { UserResponse } from 'src/app/models/user.model';

export const selectUserLoginFeature = (state: AppState) => state.user;

export const selectUserLogin = createSelector(
  selectUserLoginFeature,
  (state: UserResponse) => state
);
