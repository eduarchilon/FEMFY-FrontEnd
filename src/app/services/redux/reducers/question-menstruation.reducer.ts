import { createReducer, on } from '@ngrx/store';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { loadQuestionUserMenstruationSuccess } from '../actions/question-menstruation/question-menstruation-user-api.action';

export const QuestionUserMenstruationFeatureKey =
  'questionUserMenstruationState';

export interface QuestionUserMenstruationState {
  questionUserMenstruation: QuestionUserMenstruation[];
}

const questionUserMenstruationInitialState: QuestionUserMenstruationState = {
  questionUserMenstruation: [],
};

export const questionUserMenstruationReducer = createReducer(
  questionUserMenstruationInitialState,
  on(loadQuestionUserMenstruationSuccess, (state, action) => ({
    ...state,
    questionUserMenstruation: action.questionUserMenstruation,
  }))
);
