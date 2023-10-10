import { createReducer, on } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { setCycle } from '../actions/cycle.action';
import { setDateCalendar } from '../actions/calendar.action';
import { setIdQuestionMenstruation } from '../actions/question.action';

export const initialIdQuestionMenstruation: number | any = null;

export const questionMenstruationReducers = createReducer(
  initialIdQuestionMenstruation,
  on(setIdQuestionMenstruation, (state, { idQuestion }) => ({
    ...state,
    idQuestion,
  }))
);
