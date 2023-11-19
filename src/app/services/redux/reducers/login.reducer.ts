import { createReducer, on } from '@ngrx/store';
import { UserResponse} from 'src/app/models/user.model';
import { setUserLogin } from '../actions/login.action';

const userResponse = localStorage.getItem('userSession');

export const initialLoginState: UserResponse | any = userResponse
  ? JSON.parse(userResponse || '')
  : null;

export const loginReducers = createReducer(
  initialLoginState,
  on(setUserLogin, (state, { user }) => ({ ...state, user }))
);
