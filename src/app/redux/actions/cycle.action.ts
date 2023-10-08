import { createAction, props } from '@ngrx/store';
import { Cycle } from './../../models/cicle.model';

export const setCycle = createAction(
  '[Cycle] st the user cycle to get',
  props<{ cycle: Cycle | null }>()
);
