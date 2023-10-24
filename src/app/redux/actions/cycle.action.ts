import { createAction, props } from '@ngrx/store';
import { Cycle, CyclePhaseState } from './../../models/cicle.model';

export const setCycle = createAction(
  '[Cycle] st the user cycle to get',
  props<{ cycle: Cycle | null }>()
);

export const setCycleState = createAction(
  '[Cycle] set the estate width the position of chart',
  props<{ cycleState: CyclePhaseState }>()
);
