import { createReducer, on } from '@ngrx/store';
import { setIdQuestionMenstruation } from '../actions/question.action';

export const initialIdQuestionMenstruation: number | any = null;

export const questionMenstruationReducers = createReducer(
  initialIdQuestionMenstruation,
  on(setIdQuestionMenstruation, (state, { idQuestion }) => ({
    ...state,
    idQuestion,
  }))
);
