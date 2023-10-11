import { createSelector } from '@ngrx/store';
import { AppState } from '../store/app.store';

export const selectDateCalendarFeature = (state: AppState) => state.dates;
export const selectDateInitialPeriod = (state: AppState) => state.dayPeriod;

export const selectDateCalendar = createSelector(
  selectDateCalendarFeature,
  (state: Date[] | any[]) => state
);

export const selectDayInitialPeriod = createSelector(
  selectDateInitialPeriod,
  (state: Date | any) => state
);
