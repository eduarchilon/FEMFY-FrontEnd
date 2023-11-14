import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

const selectQuestionUserMenstruationFeature = (state: AppState) =>
  state.questionUserMenstruation;

export const questionUserMenstruationSelector = createSelector(
  selectQuestionUserMenstruationFeature,
  (questionUserMenstruationState) =>
    questionUserMenstruationState.questionUserMenstruation
);

export const questionUserMenstruation = createSelector(
  questionUserMenstruationSelector,
  (questionUserMenstruation) => questionUserMenstruation
);
