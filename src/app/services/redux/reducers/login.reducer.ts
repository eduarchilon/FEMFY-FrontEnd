import { createReducer, on } from '@ngrx/store';
import { UserResponse, emptyUserResponse } from 'src/app/models/user.model';
import { setUserLogin } from '../actions/login.action';
import { constants } from 'src/app/constans/constants';

const userResponse = localStorage.getItem('userSession');

export const initialLoginState: UserResponse | any = userResponse
  ? JSON.parse(userResponse || '')
  : null;

export const loginReducers = createReducer(
  initialLoginState,
  on(setUserLogin, (state, { user }) => ({ ...state, user }))
);
