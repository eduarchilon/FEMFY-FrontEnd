import { createReducer, on } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { setCycle } from '../actions/cycle.action';
import { setDateCalendar } from '../actions/calendar.action';

export const initialDateCalendar: Date[] | any[] = [];

export const dateCalendarReducers = createReducer(
  initialDateCalendar,
  on(setDateCalendar, (state, { dates }) => ({ ...state, dates }))
);
