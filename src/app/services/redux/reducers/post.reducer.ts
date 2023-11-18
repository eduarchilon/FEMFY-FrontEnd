import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { loadPostSuccess } from '../actions/post/post.api.action';

export const postyFeatureKey = 'postState';

export interface PostState {
  post: Post[];
}

const postInitialState: PostState = {
  post: [],
};

export const postReducer = createReducer(
  postInitialState,
  on(loadPostSuccess, (state, action) => ({
    ...state,
    post: action.replay,
  }))
);
