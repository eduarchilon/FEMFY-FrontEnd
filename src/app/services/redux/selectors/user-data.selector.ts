import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

const selecUserDataFeature = (state: AppState) => state.userData;

export const userDataSelector = createSelector(
  selecUserDataFeature,
  (userDataState) => userDataState.userData
);

export const userData = createSelector(
  userDataSelector,
  (userData) => userData
);
