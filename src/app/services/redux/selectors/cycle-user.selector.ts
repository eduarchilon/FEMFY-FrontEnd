import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

const selecCycleUserFeature = (state: AppState) => state.cycleUser;

export const cyclesUserSelector = createSelector(
  selecCycleUserFeature,
  (cycleUserState) => cycleUserState.cycleUser
);

export const cycleUser = createSelector(
  cyclesUserSelector,
  (cycleUser) => cycleUser
);
