import { createAction, props } from '@ngrx/store';
import { Cycle, CyclePhaseState, PredictionCycle } from '../../../models/cicle.model';

export const setCycle = createAction(
  '[Cycle] st the user cycle to get',
  props<{ cycle: Cycle | null }>()
);

export const setCycleState = createAction(
  '[Cycle] set the estate width the position of chart',
  props<{ cycleState: CyclePhaseState }>()
);

export const loadCycles = createAction('[Cycle] get cycle of user');

export const loadedCycles = createAction(
  '[Cycle] get cycle of user success',
  props<{ cycleState: Cycle[] | any }>()
);

export const loadedPredictionNextCycle = createAction(
  '[Prediction] get the next period',
  props<{ prediction: PredictionCycle | any }>()
);
