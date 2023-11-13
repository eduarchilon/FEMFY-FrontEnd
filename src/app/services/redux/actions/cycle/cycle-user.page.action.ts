import { createAction, props } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';

export const cycleUserInit = createAction('[CYCLE PAGE] cycle user init');

export const addCycleUser = createAction(
  '[CYCLE PAGE] add cycle user',
  props<{ cycleUser: Cycle }>()
);

// export const editUserData = createAction(
//   '[CYCLE PAGE] cycle user edit completed',
//   props<{ cycleUser: Cycle }>()
// );
