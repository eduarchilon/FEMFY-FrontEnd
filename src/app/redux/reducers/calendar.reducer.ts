import { createReducer, on } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { setCycle } from '../actions/cycle.action';
import { setDateCalendar, setDayPeriod } from '../actions/calendar.action';

export const initialDateCalendar: Date[] | any[] = [];
export const dayInitialPeriod: Date | any = '';

export const dateCalendarReducers = createReducer(
  initialDateCalendar,
  on(setDateCalendar, (state, { dates }) => ({ ...state, dates })),
  on(setDayPeriod, (state, { initialDate }) => ({ ...state, initialDate }))
);

export const dayInitialPeriodReducers = createReducer(
  dayInitialPeriod,
  on(setDayPeriod, (state, { initialDate }) => ({ ...state, initialDate }))
);
