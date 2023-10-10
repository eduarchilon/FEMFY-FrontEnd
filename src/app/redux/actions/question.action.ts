import { createAction, props } from '@ngrx/store';

export const setIdQuestionMenstruation = createAction(
  '[Question] create idQuestion Mnestruation to advance',
  props<{ idQuestion: number | any }>()
);
