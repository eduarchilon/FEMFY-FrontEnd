import { createAction, props } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';

export const loadUserDataSuccess = createAction(
  '[USER API] load user data success',
  props<{ userData: UserResponse }>()
);

export const loadUserDataError = createAction(
  '[USER API] load user data error',
  props<{ errorMsg: string }>()
);

export const editUserDataSuccess = createAction(
  '[USER API] edit user data success'
);

export const editUserDataError = createAction(
  '[USER API] edit user data error',
  props<{ userData: UserResponse; errorMsg: string }>()
);
