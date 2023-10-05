import { createReducer, on } from '@ngrx/store';
import { UserResponse, emptyUserResponse } from 'src/app/models/user.model';
import { setUserLogin } from '../actions/login.action';

export const initialLoginState: UserResponse | any = null;

export const loginReducers = createReducer(
  initialLoginState,
  on(setUserLogin, (state, { user }) => ({ ...state, user }))
);
