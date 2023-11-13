import { createAction, props } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';

export const loadCyclesUserSuccess = createAction(
  '[CYCLE API] load cycle user success',
  props<{ cyclesUser: Cycle[] }>()
);

export const loadCycleUserError = createAction(
  '[CYCLE API] load cycle user error',
  props<{ errorMsg: string }>()
);

export const addCycleUserSuccess = createAction(
  '[CYCLE API] add cycle user success',
  props<{ cycleUser: Cycle }>()
);

export const addCycleUserError = createAction(
  '[CYCLE API] add cycle user error',
  props<{ errorMsg: string }>()
);

// export const editCycleUserSuccess = createAction(
//   '[CYCLE API] edit cycle user success'
// );

// export const editCycleUserError = createAction(
//   '[CYCLE API] edit cycle user error',
//   props<{ cycleUser: Cycle; errorMsg: string }>()
// );
