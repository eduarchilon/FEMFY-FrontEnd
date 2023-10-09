import { createAction, props } from '@ngrx/store';

export const setDateCalendar = createAction(
  '[Clendar] set the user calendar to get',
  props<{ dates: Date[] | any[] }>()
);
