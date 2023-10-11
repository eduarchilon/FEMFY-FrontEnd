import { createAction, props } from '@ngrx/store';

export const setDateCalendar = createAction(
  '[Clendar] set the user calendar to get',
  props<{ dates: Date[] | any[] }>()
);

export const setDayPeriod = createAction(
  '[Clendar] set the initial perid',
  props<{ initialDate: Date | any[] }>()
);
