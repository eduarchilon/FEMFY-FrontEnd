import { createAction, props } from '@ngrx/store';
import { QuestionUserMenstruation } from 'src/app/models/question.model';

export const loadQuestionUserMenstruationSuccess = createAction(
  '[QUESTION MENSTRUATION API] load question user menstruation success',
  props<{ questionUserMenstruation: QuestionUserMenstruation[] }>()
);

export const loadQuestionUserMenstruationError = createAction(
  '[QUESTION MENSTRUATION API] load question user menstruation error',
  props<{ errorMsg: string }>()
);
