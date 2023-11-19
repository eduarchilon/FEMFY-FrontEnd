import { createAction, props } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';

export const userDataInit = createAction('[USER PAGE] user data init');

export const editUserData = createAction(
  '[USER PAGE] user data edit completed',
  props<{ userData: UserResponse }>()
);
