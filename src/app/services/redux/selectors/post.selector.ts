import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

const selectPostFeature = (state: AppState) => state.post;

export const postSelector = createSelector(
  selectPostFeature,
  (postState) => postState.post
);

export const post = createSelector(postSelector, (post) => post);
