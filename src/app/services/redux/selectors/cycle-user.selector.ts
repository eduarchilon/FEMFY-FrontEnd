import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

const selecCycleUserFeature = (state: AppState) => state.cycleUser;

export const cycleUserSelector = createSelector(
  selecCycleUserFeature,
  (cycleUserState) => cycleUserState.cycleUser
);

export const cycleUser = createSelector(
  cycleUserSelector,
  (cycleUser) => cycleUser
);
