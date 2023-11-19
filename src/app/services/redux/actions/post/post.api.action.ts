import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';

export const loadPostSuccess = createAction(
  '[POST API] load post success',
  props<{ replay: Post[] }>()
);

export const loadPostError = createAction(
  '[POST API] load post error',
  props<{ errorMsg: string }>()
);
