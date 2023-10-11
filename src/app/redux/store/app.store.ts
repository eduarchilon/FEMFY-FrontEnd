import { ActionReducerMap } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { loginReducers } from '../reducers/login.reducer';
import { Cycle } from 'src/app/models/cicle.model';
import { cycleReducers } from '../reducers/cycle.reduce';
import {
  dateCalendarReducers,
  dayInitialPeriodReducers,
} from '../reducers/calendar.reducer';
import { questionMenstruationReducers } from '../reducers/question.reducer';

export interface AppState {
  user: UserResponse;
  cycle: Cycle;
  dates: Date[] | any[];
  dayPeriod: Date | any;
  idQuestionMenstruation: number | any;
}

export const appStore: ActionReducerMap<AppState> = {
  user: loginReducers,
  cycle: cycleReducers,
  dates: dateCalendarReducers,
  idQuestionMenstruation: questionMenstruationReducers,
  dayPeriod: dayInitialPeriodReducers,
};
