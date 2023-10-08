import { createAction, props } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';

export const setUserLogin = createAction(
  '[Login] set the user empty or loaded',
  props<{ user: UserResponse | null }>()
);
