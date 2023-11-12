import { createAction, props } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';

export const loadUserDataSuccess = createAction(
  '[USER API] load user data success',
  props<{ userData: UserResponse }>()
);
