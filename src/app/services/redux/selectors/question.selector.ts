import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const selectIdQuestionMenstruationFeature = (state: AppState) =>
  state.idQuestionMenstruation;

export const selectIdQuestionMenstruation = createSelector(
  selectIdQuestionMenstruationFeature,
  (state: number | any) => state
);
