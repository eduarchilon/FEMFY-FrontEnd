import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const selectDateCalendarFeature = (state: AppState) => state.dates;

export const selectDateCalendar = createSelector(
  selectDateCalendarFeature,
  (state: Date[] | any[]) => state
);
