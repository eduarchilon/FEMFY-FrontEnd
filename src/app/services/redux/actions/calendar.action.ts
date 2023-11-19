import { createAction, props } from '@ngrx/store';

export const setDayOfOvulation = createAction(
  '[Calendar] set day in calendar of ovulation',
  props<{ numberOvulation: any }>()
);
